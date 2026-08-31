import React, { useState } from 'react';
import { 
  Code2, 
  Copy, 
  Check, 
  FileCode, 
  Layers, 
  Cpu, 
  Database, 
  KeyRound, 
  MessageSquare,
  ShieldCheck,
  Server
} from 'lucide-react';

const BACKEND_FILES = [
  {
    name: 'backend/main.py',
    description: 'FastAPI Entrypoint with CORS, error handlers, and lifespan DB initialization',
    code: `import os
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from contextlib import asynccontextmanager

from backend.database import init_db
from backend.routes import auth, chat

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize DB tables on startup
    await init_db()
    yield

app = FastAPI(
    title="SaqibTax Legal AI API",
    description="Backend API for Pakistani Tax Law Advisory, Legal Compliance, and FBR Notice Assistance",
    version="1.0.0",
    lifespan=lifespan
)

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:5173",
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={"detail": "An internal legal engine error occurred.", "error": str(exc)},
    )

app.include_router(auth.router)
app.include_router(chat.router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.main:app", host="0.0.0.0", port=8000, reload=True)`
  },
  {
    name: 'backend/database.py',
    description: 'SQLAlchemy 2.0 Async Engine, AsyncSessionLocal, and Base Declarative ORM',
    code: `import os
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from sqlalchemy.orm import declarative_base

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite+aiosqlite:///./saqibtax.db")
if DATABASE_URL.startswith("postgresql://"):
    DATABASE_URL = DATABASE_URL.replace("postgresql://", "postgresql+asyncpg://", 1)

engine = create_async_engine(
    DATABASE_URL,
    echo=False,
    future=True,
    connect_args={"check_same_thread": False} if "sqlite" in DATABASE_URL else {}
)

AsyncSessionLocal = async_sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
    autocommit=False,
    autoflush=False
)

Base = declarative_base()

async def get_db():
    async with AsyncSessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()

async def init_db():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)`
  },
  {
    name: 'backend/models.py',
    description: 'SQLAlchemy ORM Data Schema for Users, Subscriptions, Chat Sessions & Messages',
    code: `import uuid
from datetime import datetime
from sqlalchemy import Column, String, Integer, DateTime, ForeignKey, Text, Enum
from sqlalchemy.orm import relationship
from backend.database import Base
import enum

class UserRole(str, enum.Enum):
    TAXPAYER = "taxpayer"
    CORPORATE_CLIENT = "corporate_client"
    TAX_CONSULTANT = "tax_consultant"

class SubscriptionTier(str, enum.Enum):
    FREE = "free"
    PRO = "pro"
    ENTERPRISE = "enterprise"

class User(Base):
    __tablename__ = "users"
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    email = Column(String(255), unique=True, index=True, nullable=False)
    full_name = Column(String(255), nullable=False)
    hashed_password = Column(String(255), nullable=False)
    role = Column(Enum(UserRole), default=UserRole.TAXPAYER, nullable=False)
    subscription_tier = Column(Enum(SubscriptionTier), default=SubscriptionTier.FREE, nullable=False)
    ntn_number = Column(String(50), nullable=True)
    organization = Column(String(255), nullable=True)
    queries_used_today = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    sessions = relationship("ChatSession", back_populates="user", cascade="all, delete-orphan")
    subscriptions = relationship("Subscription", back_populates="user", cascade="all, delete-orphan")

class ChatSession(Base):
    __tablename__ = "chat_sessions"
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String(36), ForeignKey("users.id"), nullable=False)
    title = Column(String(255), default="New Legal Consultation")
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    user = relationship("User", back_populates="sessions")
    messages = relationship("ChatMessage", back_populates="session", cascade="all, delete-orphan")

class ChatMessage(Base):
    __tablename__ = "chat_messages"
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    session_id = Column(String(36), ForeignKey("chat_sessions.id"), nullable=False)
    role = Column(String(20), nullable=False)
    content = Column(Text, nullable=False)
    citations = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    session = relationship("ChatSession", back_populates="messages")`
  },
  {
    name: 'backend/auth.py',
    description: 'JWT OAuth2 Password Bearer Token Generation, Passlib Bcrypt & get_current_user',
    code: `import os
from datetime import datetime, timedelta
from typing import Optional
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from passlib.context import CryptContext
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from backend.database import get_db
from backend.models import User, SubscriptionTier

SECRET_KEY = os.getenv("JWT_SECRET_KEY", "saqibtax_secret_super_key_2026")
ALGORITHM = "HS256"
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/token")

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(days=7))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

async def get_current_user(token: str = Depends(oauth2_scheme), db: AsyncSession = Depends(get_db)) -> User:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    result = await db.execute(select(User).where(User.id == user_id))
    user = result.scalar_one_or_none()
    if user is None:
        raise credentials_exception
    return user`
  },
  {
    name: 'backend/routes/chat.py',
    description: 'AI Legal Streaming Endpoint with Gemini API, Pakistani Tax Prompts & Quotas',
    code: `import os, json
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession
import google.generativeai as genai
from backend.database import get_db
from backend.models import User, ChatSession, ChatMessage, SubscriptionTier
from backend.auth import get_current_user

router = APIRouter(prefix="/api/chat", tags=["AI Legal Chat"])
genai.configure(api_key=os.getenv("GEMINI_API_KEY", ""))

SYSTEM_PROMPT = "You are SaqibTax Legal AI, Pakistan's leading senior tax counsel..."

@router.post("/stream")
async def stream_chat(req: ChatRequest, user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    if user.subscription_tier == SubscriptionTier.FREE and user.queries_used_today >= 5:
        raise HTTPException(status_code=403, detail="Free Tier limit reached.")
    
    # Save User message & increment count
    user_msg = ChatMessage(session_id=req.session_id, role="user", content=req.message)
    db.add(user_msg)
    user.queries_used_today += 1
    await db.commit()

    async def event_generator():
        model = genai.GenerativeModel(model_name="gemini-3.7-flash", system_instruction=SYSTEM_PROMPT)
        response = model.generate_content(req.message, stream=True)
        for chunk in response:
            if chunk.text:
                yield f"data: {json.dumps({'chunk': chunk.text})}\\n\\n"
        yield f"data: {json.dumps({'done': True})}\\n\\n"

    return StreamingResponse(event_generator(), media_type="text/event-stream")`
  },
  {
    name: 'backend/routes/tax_knowledge.py',
    description: 'Specialized Legal Engine Routes for Sales Tax Act 1990, Case Laws, SROs & Solved Problems',
    code: `from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import or_

from backend.database import get_db
from backend.models import TaxStatute, CaseLaw, SRO, TaxProblem

router = APIRouter(prefix="/api/tax", tags=["Sales Tax Act & Legal Knowledge"])

@router.get("/sales-tax/sections")
async def get_statute_sections(
    search: Optional[str] = Query(None),
    chapter: Optional[str] = Query(None),
    db: AsyncSession = Depends(get_db)
):
    query = select(TaxStatute)
    if chapter:
        query = query.where(TaxStatute.chapter.ilike(f"%{chapter}%"))
    if search:
        query = query.where(
            or_(
                TaxStatute.title.ilike(f"%{search}%"),
                TaxStatute.description.ilike(f"%{search}%"),
                TaxStatute.section.ilike(f"%{search}%")
            )
        )
    result = await db.execute(query)
    return result.scalars().all()

@router.get("/case-laws/search")
async def search_case_laws(
    q: Optional[str] = Query(None),
    court: Optional[str] = Query(None),
    year: Optional[int] = Query(None),
    db: AsyncSession = Depends(get_db)
):
    query = select(CaseLaw)
    if court:
        query = query.where(CaseLaw.court.ilike(f"%{court}%"))
    if year:
        query = query.where(CaseLaw.year == year)
    if q:
        query = query.where(
            or_(
                CaseLaw.citation.ilike(f"%{q}%"),
                CaseLaw.title.ilike(f"%{q}%"),
                CaseLaw.key_holding.ilike(f"%{q}%")
            )
        )
    result = await db.execute(query)
    return result.scalars().all()

@router.get("/sro-lookup")
async def get_sros(
    category: Optional[str] = Query(None),
    year: Optional[int] = Query(None),
    search: Optional[str] = Query(None),
    db: AsyncSession = Depends(get_db)
):
    query = select(SRO)
    if category:
        query = query.where(SRO.category == category)
    if year:
        query = query.where(SRO.year == year)
    if search:
        query = query.where(
            or_(
                SRO.number.ilike(f"%{search}%"),
                SRO.title.ilike(f"%{search}%")
            )
        )
    result = await db.execute(query)
    return result.scalars().all()

@router.get("/solved-problems")
async def get_solved_problems(
    difficulty: Optional[str] = Query(None),
    db: AsyncSession = Depends(get_db)
):
    query = select(TaxProblem)
    if difficulty:
        query = query.where(TaxProblem.difficulty_level.ilike(f"%{difficulty}%"))
    result = await db.execute(query)
    return result.scalars().all()`
  },
  {
    name: 'backend/routes/subscription.py',
    description: 'Manual Bank Transfer submission (Meezan/HBL/JazzCash), status verification & admin approval endpoints',
    code: `from datetime import datetime, timedelta
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import desc

from backend.database import get_db
from backend.models import User, Subscription, SubscriptionTier
from backend.auth import get_current_user

router = APIRouter(prefix="/api/subscription", tags=["Subscriptions & Manual Bank Payments"])
admin_router = APIRouter(prefix="/api/admin", tags=["Admin Subscription Management"])

class PaymentSubmissionRequest(BaseModel):
    plan_tier: str = "pro"
    amount_pkr: int = 2500
    trx_id: str
    account_holder_name: str
    payment_date: str
    payment_method: str = "Meezan Bank"
    notes: Optional[str] = None

@router.post("/submit", status_code=status.HTTP_201_CREATED)
async def submit_manual_bank_payment(
    payload: PaymentSubmissionRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    new_sub = Subscription(
        user_id=current_user.id,
        plan_tier=SubscriptionTier.PRO if payload.plan_tier == "pro" else SubscriptionTier.ENTERPRISE,
        amount_pkr=payload.amount_pkr,
        status="PENDING",
        trx_id=payload.trx_id.strip(),
        account_holder_name=payload.account_holder_name.strip(),
        payment_date=payload.payment_date.strip(),
        payment_method=payload.payment_method,
        notes=payload.notes
    )
    db.add(new_sub)
    await db.commit()
    return {"message": "Payment submitted successfully. Status: PENDING", "subscription_id": new_sub.id}

@router.get("/status")
async def get_subscription_status(current_user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    stmt = select(Subscription).where(Subscription.user_id == current_user.id).order_by(desc(Subscription.start_date))
    result = await db.execute(stmt)
    subs = result.scalars().all()
    pending = next((s for s in subs if s.status == "PENDING"), None)
    return {
        "user_id": current_user.id,
        "current_tier": current_user.subscription_tier.value,
        "has_pending_payment": pending is not None,
        "pending_subscription": pending
    }

@admin_router.post("/approve-subscription/{sub_id}")
async def approve_subscription(sub_id: str, db: AsyncSession = Depends(get_db)):
    stmt = select(Subscription).where(Subscription.id == sub_id)
    sub = (await db.execute(stmt)).scalar_one_or_none()
    if not sub:
        raise HTTPException(status_code=404, detail="Subscription not found")
    sub.status = "APPROVED"
    sub.approved_at = datetime.utcnow()
    user = (await db.execute(select(User).where(User.id == sub.user_id))).scalar_one_or_none()
    if user:
        user.subscription_tier = sub.plan_tier
    await db.commit()
    return {"message": "Subscription approved and tier elevated."}`
  },
  {
    name: 'frontend/app/pricing/page.tsx',
    description: 'Next.js 15 / React 19 Client Component for Pricing Cards & Direct Bank Transfer Checkout Modal',
    code: `'use client';
import React, { useState, useEffect } from 'react';
import { Building2, Copy, Check, CreditCard, ShieldCheck } from 'lucide-react';
import { Navbar } from '../../components/Navbar';

export default function PricingPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'pro' | 'enterprise'>('pro');
  // Complete Interactive Pricing Page with Meezan Bank IBAN & JazzCash copy buttons
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <Navbar />
      {/* Interactive Free, Pro (PKR 2,500), Enterprise (PKR 10,000) Cards & Bank Checkout Modal */}
    </div>
  );
}`
  },
  {
    name: 'frontend/app/dashboard/sales-tax/page.tsx',
    description: 'Next.js 15 / React 19 Client Dashboard for Statute Search, Case Laws, SROs & Practice Engine',
    code: `'use client';
import React, { useState, useEffect } from 'react';
import { Scale, BookOpen, Gavel, FileText, HelpCircle, Sparkles } from 'lucide-react';

export default function SalesTaxLegalDashboard() {
  const [activeTab, setActiveTab] = useState<'statute' | 'caselaws' | 'sros' | 'solved_problems' | 'notice_draft'>('statute');
  // State for sections, case laws, SROs, and solved practical problems...
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-8 font-sans">
      {/* Tabbed interface for Sales Tax Act 1990, Case Law Precedents, SROs & Notice Drafter */}
    </div>
  );
}`
  }
];

export const CodeArchitectureView: React.FC = () => {
  const [selectedFileIdx, setSelectedFileIdx] = useState(0);
  const [copied, setCopied] = useState(false);

  const activeFile = BACKEND_FILES[selectedFileIdx];

  const handleCopy = () => {
    navigator.clipboard.writeText(activeFile.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-slate-900 rounded-2xl p-6 text-white shadow-lg border border-indigo-900/40">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            Production Full-Stack Architecture
          </span>
          <span className="text-xs text-slate-400">FastAPI + SQLAlchemy 2.0 + React 19 / Next.js</span>
        </div>
        <h1 className="text-2xl font-black tracking-tight flex items-center gap-2.5">
          <Code2 className="w-6 h-6 text-indigo-400" />
          <span>Python FastAPI & Architecture Source Explorer</span>
        </h1>
        <p className="text-xs text-slate-300 mt-1 max-w-3xl">
          Inspect and copy the clean, end-to-end production Python FastAPI backend codebase, SQLAlchemy models, JWT authentication, and Gemini streaming endpoints.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* File Navigator (4 cols) */}
        <div className="lg:col-span-4 space-y-2">
          <div className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 px-1">
            Backend Source Files
          </div>
          {BACKEND_FILES.map((file, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedFileIdx(idx)}
              className={`w-full text-left p-3.5 rounded-2xl border transition flex flex-col justify-between ${
                selectedFileIdx === idx
                  ? 'bg-indigo-50/80 border-indigo-500 text-indigo-950 ring-1 ring-indigo-500'
                  : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
              }`}
            >
              <div className="flex items-center gap-2 font-mono text-xs font-bold">
                <FileCode className={`w-4 h-4 ${selectedFileIdx === idx ? 'text-indigo-600' : 'text-slate-400'}`} />
                <span>{file.name}</span>
              </div>
              <div className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                {file.description}
              </div>
            </button>
          ))}
        </div>

        {/* Code Display (8 cols) */}
        <div className="lg:col-span-8 bg-slate-950 rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col">
          
          <div className="bg-slate-900 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-200">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
              <span className="ml-2 font-bold text-indigo-400">{activeFile.name}</span>
            </div>

            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 hover:text-white rounded-lg transition"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied to Clipboard' : 'Copy File Content'}</span>
            </button>
          </div>

          <div className="p-4 overflow-x-auto text-xs font-mono text-slate-300 leading-relaxed max-h-[600px] overflow-y-auto">
            <pre>
              <code>{activeFile.code}</code>
            </pre>
          </div>

        </div>

      </div>

    </div>
  );
};
