from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from pydantic import BaseModel, EmailStr
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import Optional

from backend.database import get_db
from backend.models import User, UserRole, SubscriptionTier, ChatSession, ChatMessage
from backend.auth import get_password_hash, verify_password, create_access_token, get_current_user

router = APIRouter(prefix="/api/auth", tags=["Authentication"])

class UserRegisterRequest(BaseModel):
    email: EmailStr
    full_name: str
    password: str
    role: Optional[UserRole] = UserRole.TAXPAYER
    ntn_number: Optional[str] = None
    organization: Optional[str] = None

class UserResponse(BaseModel):
    id: str
    email: str
    full_name: str
    role: str
    subscription_tier: str
    ntn_number: Optional[str]
    organization: Optional[str]
    queries_used_today: int

class TokenResponse(BaseModel):
    access_token: str
    token_type: str
    user: UserResponse

@router.post("/register", response_model=TokenResponse)
async def register(req: UserRegisterRequest, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).where(User.email == req.email.lower()))
    if result.scalar_one_or_none():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="A user with this email address is already registered."
        )

    new_user = User(
        email=req.email.lower(),
        full_name=req.full_name,
        hashed_password=get_password_hash(req.password),
        role=req.role or UserRole.TAXPAYER,
        subscription_tier=SubscriptionTier.FREE,
        ntn_number=req.ntn_number,
        organization=req.organization,
        queries_used_today=0
    )
    db.add(new_user)
    await db.flush()

    # Create default welcome session
    welcome_session = ChatSession(
        user_id=new_user.id,
        title="Getting Started with SaqibTax AI"
    )
    db.add(welcome_session)
    await db.flush()

    welcome_msg = ChatMessage(
        session_id=welcome_session.id,
        role="assistant",
        content=f"Assalamu Alaikum **{new_user.full_name}**! Welcome to **SaqibTax Legal AI**.\n\nI am ready to assist with Pakistani tax calculations, FBR notices, ATL queries, and legal compliance.",
        citations="ITO 2001, Sales Tax Act 1990"
    )
    db.add(welcome_msg)
    await db.commit()
    await db.refresh(new_user)

    token = create_access_token({"sub": new_user.id, "email": new_user.email, "role": new_user.role.value})
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": new_user.id,
            "email": new_user.email,
            "full_name": new_user.full_name,
            "role": new_user.role.value,
            "subscription_tier": new_user.subscription_tier.value,
            "ntn_number": new_user.ntn_number,
            "organization": new_user.organization,
            "queries_used_today": new_user.queries_used_today
        }
    }

@router.post("/token", response_model=TokenResponse)
async def login_for_access_token(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(select(User).where(User.email == form_data.username.lower()))
    user = result.scalar_one_or_none()

    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    token = create_access_token({"sub": user.id, "email": user.email, "role": user.role.value})
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "email": user.email,
            "full_name": user.full_name,
            "role": user.role.value,
            "subscription_tier": user.subscription_tier.value,
            "ntn_number": user.ntn_number,
            "organization": user.organization,
            "queries_used_today": user.queries_used_today
        }
    }

@router.get("/me", response_model=UserResponse)
async def get_current_user_profile(user: User = Depends(get_current_user)):
    return {
        "id": user.id,
        "email": user.email,
        "full_name": user.full_name,
        "role": user.role.value,
        "subscription_tier": user.subscription_tier.value,
        "ntn_number": user.ntn_number,
        "organization": user.organization,
        "queries_used_today": user.queries_used_today
    }

class UpgradeTierRequest(BaseModel):
    tier: SubscriptionTier

@router.post("/upgrade")
async def upgrade_subscription(
    req: UpgradeTierRequest,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    user.subscription_tier = req.tier
    await db.commit()
    return {"message": f"Successfully upgraded to {req.tier.value}", "subscription_tier": user.subscription_tier.value}
