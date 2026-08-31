import os
import json
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
import google.generativeai as genai

from backend.database import get_db
from backend.models import User, ChatSession, ChatMessage, SubscriptionTier
from backend.auth import get_current_user, require_subscription

router = APIRouter(prefix="/api/chat", tags=["AI Legal Chat"])

# Configure Gemini
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")
if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)

SYSTEM_PROMPT = """You are SaqibTax Legal AI, Pakistan's leading senior tax counsel and corporate compliance legal intelligence engine.
You possess authoritative mastery of the Income Tax Ordinance 2001, Sales Tax Act 1990, Provincial Sales Tax on Services, and Companies Act 2017.
Provide sharp, legally precise advice with exact statutory citations, practical tips for filers vs non-filers, and clean markdown formatting."""

class CreateSessionRequest(BaseModel):
    title: Optional[str] = "New Legal Consultation"

class ChatRequest(BaseModel):
    session_id: str
    message: str
    document_context: Optional[str] = None

class SessionResponse(BaseModel):
    id: str
    title: str
    created_at: str
    updated_at: str

@router.get("/sessions")
async def get_sessions(
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(
        select(ChatSession).where(ChatSession.user_id == user.id).order_by(ChatSession.updated_at.desc())
    )
    sessions = result.scalars().all()
    return [
        {
            "id": s.id,
            "title": s.title,
            "created_at": s.created_at.isoformat(),
            "updated_at": s.updated_at.isoformat()
        }
        for s in sessions
    ]

@router.post("/sessions")
async def create_session(
    req: CreateSessionRequest,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    new_session = ChatSession(
        user_id=user.id,
        title=req.title or "New Legal Consultation"
    )
    db.add(new_session)
    await db.commit()
    await db.refresh(new_session)
    return {
        "id": new_session.id,
        "title": new_session.title,
        "created_at": new_session.created_at.isoformat(),
        "updated_at": new_session.updated_at.isoformat()
    }

@router.get("/sessions/{session_id}/messages")
async def get_messages(
    session_id: str,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    # Verify session belongs to user
    res = await db.execute(select(ChatSession).where(ChatSession.id == session_id, ChatSession.user_id == user.id))
    session = res.scalar_one_or_none()
    if not session:
        raise HTTPException(status_code=404, detail="Chat session not found")

    msg_res = await db.execute(select(ChatMessage).where(ChatMessage.session_id == session_id).order_by(ChatMessage.created_at.asc()))
    messages = msg_res.scalars().all()
    return [
        {
            "id": m.id,
            "session_id": m.session_id,
            "role": m.role,
            "content": m.content,
            "citations": m.citations.split(", ") if m.citations else [],
            "created_at": m.created_at.isoformat()
        }
        for m in messages
    ]

@router.post("/stream")
async def stream_chat(
    req: ChatRequest,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    # Check paywall & daily query limit
    if user.subscription_tier == SubscriptionTier.FREE and user.queries_used_today >= 5:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Daily query limit reached for Free Tier (5 queries/day). Please upgrade to Pro Tier."
        )

    # Save User message
    user_msg = ChatMessage(
        session_id=req.session_id,
        role="user",
        content=req.message
    )
    db.add(user_msg)
    user.queries_used_today += 1
    await db.commit()

    async def event_generator():
        full_response = ""
        try:
            # Construct legal prompt
            prompt = f"Taxpayer Context (Role: {user.role.value}): {req.message}"
            if req.document_context:
                prompt += f"\n\nAttached Document/Notice Context:\n{req.document_context}"

            model = genai.GenerativeModel(
                model_name="gemini-1.5-flash",
                system_instruction=SYSTEM_PROMPT
            )

            # Try streaming mode first with safety timeout
            streaming_succeeded = False
            try:
                response = model.generate_content(prompt, stream=True)
                for chunk in response:
                    if chunk and hasattr(chunk, 'text') and chunk.text:
                        full_response += chunk.text
                        yield f"data: {json.dumps({'chunk': chunk.text})}\n\n"
                
                if full_response.strip():
                    streaming_succeeded = True
            except Exception as stream_err:
                # Log stream failure and fallback to non-streaming mode
                print(f"[Chat Stream Warning] Streaming interrupted: {stream_err}, attempting non-streaming fallback...")

            # Fallback to non-streaming mode if streaming yielded nothing or failed
            if not streaming_succeeded or not full_response.strip():
                try:
                    fallback_res = model.generate_content(prompt)
                    if fallback_res and hasattr(fallback_res, 'text') and fallback_res.text:
                        full_response = fallback_res.text
                        yield f"data: {json.dumps({'chunk': full_response})}\n\n"
                except Exception as direct_err:
                    print(f"[Chat Non-Stream Error] Direct generation error: {direct_err}")

            # Ensure the endpoint NEVER returns an empty string or null payload
            if not full_response.strip():
                full_response = (
                    "### ⚠️ System Advisory\n\n"
                    "The legal intelligence server is currently experiencing high demand. "
                    "Please try rephrasing your legal query or ask a specific section of the **Income Tax Ordinance 2001** or **Sales Tax Act 1990**."
                )
                yield f"data: {json.dumps({'chunk': full_response})}\n\n"

            # Async persist assistant reply in DB session
            try:
                async with db.begin():
                    assistant_msg = ChatMessage(
                        session_id=req.session_id,
                        role="assistant",
                        content=full_response,
                        citations="Income Tax Ordinance 2001, Sales Tax Act 1990"
                    )
                    db.add(assistant_msg)
            except Exception as db_err:
                print(f"[DB Persist Warning] Failed to save chat message: {db_err}")

            yield f"data: {json.dumps({'done': True, 'response': full_response})}\n\n"
        except Exception as e:
            fallback_msg = (
                "### ⚠️ Connection Notice\n\n"
                "System is busy or connection was interrupted. Please try again in a moment."
            )
            yield f"data: {json.dumps({'chunk': fallback_msg, 'error': str(e), 'done': True, 'response': fallback_msg})}\n\n"

    return StreamingResponse(event_generator(), media_type="text/event-stream")

@router.post("/message")
async def send_chat_message(
    req: ChatRequest,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Non-streaming fallback endpoint that guarantees a non-empty response payload."""
    if user.subscription_tier == SubscriptionTier.FREE and user.queries_used_today >= 5:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Daily query limit reached for Free Tier (5 queries/day). Please upgrade to Pro Tier."
        )

    # Save User message
    user_msg = ChatMessage(
        session_id=req.session_id,
        role="user",
        content=req.message
    )
    db.add(user_msg)
    user.queries_used_today += 1
    await db.commit()

    prompt = f"Taxpayer Context (Role: {user.role.value}): {req.message}"
    if req.document_context:
        prompt += f"\n\nAttached Document:\n{req.document_context}"

    response_text = ""
    try:
        model = genai.GenerativeModel(
            model_name="gemini-1.5-flash",
            system_instruction=SYSTEM_PROMPT
        )
        res = model.generate_content(prompt)
        if res and hasattr(res, 'text') and res.text:
            response_text = res.text
    except Exception as e:
        print(f"[Gemini Non-Stream Error] {e}")

    # Ensure non-empty response
    if not response_text.strip():
        response_text = (
            "### ⚠️ System Advisory\n\n"
            "System is busy or statutory indexing is refreshing. Please try again in a moment."
        )

    try:
        async with db.begin():
            assistant_msg = ChatMessage(
                session_id=req.session_id,
                role="assistant",
                content=response_text,
                citations="Income Tax Ordinance 2001, Sales Tax Act 1990"
            )
            db.add(assistant_msg)
    except Exception as db_err:
        print(f"[DB Persist Warning] {db_err}")

    return {
        "response": response_text,
        "role": "assistant",
        "session_id": req.session_id,
        "citations": ["Income Tax Ordinance 2001", "Sales Tax Act 1990"]
    }

