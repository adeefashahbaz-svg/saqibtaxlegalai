import uuid
from datetime import datetime
from sqlalchemy import Column, String, Integer, Boolean, DateTime, ForeignKey, Text, Enum
from sqlalchemy.orm import relationship
from backend.database import Base
import enum

class UserRole(str, enum.Enum):
    TAXPAYER = "taxpayer"
    CORPORATE_CLIENT = "corporate_client"
    TAX_CONSULTANT = "tax_consultant"
    ADMIN = "admin"

class SubscriptionTier(str, enum.Enum):
    FREE = "free"
    PRO = "pro"
    ENTERPRISE = "enterprise"

class PlanType(str, enum.Enum):
    MONTHLY = "Monthly"
    YEARLY = "Yearly"

class PaymentStatus(str, enum.Enum):
    PENDING = "Pending"
    APPROVED = "Approved"
    REJECTED = "Rejected"

class SubscriptionStatus(str, enum.Enum):
    PENDING = "Pending"
    ACTIVE = "Active"
    REJECTED = "Rejected"
    EXPIRED = "Expired"

class User(Base):
    __tablename__ = "users"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    email = Column(String(255), unique=True, index=True, nullable=False)
    full_name = Column(String(255), nullable=False)
    hashed_password = Column(String(255), nullable=False)
    role = Column(Enum(UserRole), default=UserRole.TAXPAYER, nullable=False)
    is_admin = Column(Boolean, default=False, nullable=False)
    subscription_tier = Column(Enum(SubscriptionTier), default=SubscriptionTier.FREE, nullable=False)
    ntn_number = Column(String(50), nullable=True)
    organization = Column(String(255), nullable=True)
    queries_used_today = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    sessions = relationship("ChatSession", back_populates="user", cascade="all, delete-orphan")
    subscriptions = relationship("Subscription", back_populates="user", cascade="all, delete-orphan")
    payment_receipts = relationship("PaymentReceipt", back_populates="user", cascade="all, delete-orphan")

class Subscription(Base):
    __tablename__ = "subscriptions"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String(36), ForeignKey("users.id"), nullable=False)
    plan_type = Column(String(50), default="Monthly", nullable=False) # 'Monthly' or 'Yearly'
    plan_tier = Column(Enum(SubscriptionTier), default=SubscriptionTier.PRO, nullable=False)
    amount_pkr = Column(Integer, default=2500)
    status = Column(String(50), default="Pending") # 'Pending', 'Active', 'Rejected', 'Expired'
    created_at = Column(DateTime, default=datetime.utcnow)
    expires_at = Column(DateTime, nullable=True)
    
    # Optional metadata fields
    trx_id = Column(String(100), nullable=True, index=True)
    account_holder_name = Column(String(255), nullable=True)
    payment_method = Column(String(100), default="Meezan Bank")
    start_date = Column(DateTime, default=datetime.utcnow)
    end_date = Column(DateTime, nullable=True)
    approved_at = Column(DateTime, nullable=True)
    approved_by = Column(String(255), nullable=True)

    user = relationship("User", back_populates="subscriptions")

class PaymentReceipt(Base):
    __tablename__ = "payment_receipts"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String(36), ForeignKey("users.id"), nullable=False)
    amount = Column(Integer, nullable=False)
    transaction_id = Column(String(100), unique=False, index=True, nullable=False)
    sender_name = Column(String(255), nullable=False)
    receipt_image_url = Column(Text, nullable=True) # URL or Base64 data string of uploaded screenshot
    plan_type = Column(String(50), default="Monthly", nullable=False) # 'Monthly' or 'Yearly'
    plan_tier = Column(String(50), default="pro", nullable=False) # 'pro' or 'enterprise'
    payment_method = Column(String(100), default="Meezan Bank") # 'Meezan Bank', 'HBL', 'JazzCash', 'EasyPaisa'
    status = Column(String(50), default="Pending", index=True) # 'Pending', 'Approved', 'Rejected'
    notes = Column(Text, nullable=True)
    submitted_at = Column(DateTime, default=datetime.utcnow)
    verified_at = Column(DateTime, nullable=True)
    verified_by = Column(String(255), nullable=True)
    rejection_reason = Column(Text, nullable=True)

    user = relationship("User", back_populates="payment_receipts")


class ChatSession(Base):
    __tablename__ = "chat_sessions"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String(36), ForeignKey("users.id"), nullable=False)
    title = Column(String(255), default="New Legal Consultation")
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = relationship("User", back_populates="sessions")
    messages = relationship("ChatMessage", back_populates="session", cascade="all, delete-orphan", order_by="ChatMessage.created_at")

class ChatMessage(Base):
    __tablename__ = "chat_messages"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    session_id = Column(String(36), ForeignKey("chat_sessions.id"), nullable=False)
    role = Column(String(20), nullable=False) # 'user' or 'assistant' or 'system'
    content = Column(Text, nullable=False)
    citations = Column(Text, nullable=True) # JSON or comma-separated citations
    created_at = Column(DateTime, default=datetime.utcnow)

    session = relationship("ChatSession", back_populates="messages")

class TaxStatute(Base):
    __tablename__ = "tax_statutes"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    act_type = Column(String(100), default="Sales Tax Act, 1990", index=True) # e.g. 'Sales Tax Act, 1990', 'Sales Tax Rules, 2006'
    chapter = Column(String(100), nullable=True) # e.g. 'Chapter II: Scope and Payment of Tax'
    section = Column(String(50), nullable=False, index=True) # e.g. 'Section 3', 'Section 8B'
    title = Column(String(255), nullable=False) # e.g. 'Scope of tax', 'Adjustable input tax'
    description = Column(Text, nullable=False) # Full statutory verbatim / text
    sub_sections = Column(Text, nullable=True) # JSON list or itemized text of sub-sections
    practical_notes = Column(Text, nullable=True) # Senior advocate commentary, FBR practice notes
    cross_references = Column(String(255), nullable=True) # Linked SROs, ITO 2001 sections
    created_at = Column(DateTime, default=datetime.utcnow)

class CaseLaw(Base):
    __tablename__ = "case_laws"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    citation = Column(String(100), unique=True, index=True, nullable=False) # e.g. '2023 PTD 1450 SC'
    title = Column(String(255), nullable=False) # e.g. 'Messrs ABC Ltd vs Commissioner Inland Revenue'
    court = Column(String(100), nullable=False, index=True) # 'Supreme Court of Pakistan', 'Sindh High Court', 'Lahore High Court', 'ATIR'
    year = Column(Integer, nullable=False, index=True)
    summary = Column(Text, nullable=False) # Case facts and ratio decidendi
    key_holding = Column(Text, nullable=False) # Principle of law established
    appellant = Column(String(255), nullable=True)
    respondent = Column(String(255), nullable=True)
    relevant_sections = Column(String(255), nullable=True) # 'Section 8(1)(ca), Section 73'
    keywords = Column(String(255), nullable=True) # 'input tax disallowance, third schedule, banking channel'
    created_at = Column(DateTime, default=datetime.utcnow)

class SRO(Base):
    __tablename__ = "sros"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    number = Column(String(100), unique=True, index=True, nullable=False) # e.g. 'S.R.O. 350(I)/2024'
    title = Column(String(255), nullable=False) # e.g. 'Amendments in Sales Tax Rules regarding electronic invoicing and return filing'
    year = Column(Integer, nullable=False, index=True)
    category = Column(String(50), default="SRO", index=True) # 'SRO', 'STGO', 'Circular', 'Clarification'
    description = Column(Text, nullable=False) # Full description and statutory impact
    effective_date = Column(String(50), nullable=True)
    status = Column(String(50), default="In Force") # 'In Force', 'Superseded', 'Amended'
    issuing_authority = Column(String(100), default="Federal Board of Revenue (FBR)")
    pdf_reference = Column(String(255), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class TaxProblem(Base):
    __tablename__ = "tax_problems"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    section_id = Column(String(50), nullable=False, index=True) # 'Section 8', 'Section 8B', 'Section 73'
    topic = Column(String(255), nullable=False) # e.g. 'Apportionment of Input Tax between Taxable & Exempt Supplies'
    scenario = Column(Text, nullable=False) # Factual scenario presented to tax advisor
    calculation_steps = Column(Text, nullable=False) # JSON or markdown steps with numbers
    solution = Column(Text, nullable=False) # Comprehensive legal resolution & tax return computation
    statutory_ref = Column(String(255), nullable=False) # 'Sales Tax Act 1990 Sec 8 read with Rule 25'
    difficulty_level = Column(String(50), default="Intermediate") # 'Basic', 'Intermediate', 'Advanced / Corporate'
    practical_takeaways = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class LegalTerm(Base):
    __tablename__ = "legal_terms"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    term = Column(String(150), unique=True, index=True, nullable=False)
    urdu_title = Column(String(150), nullable=True)
    category = Column(String(100), default="Taxation", index=True) # 'Taxation', 'Corporate', 'Litigation', 'Customs'
    definition = Column(Text, nullable=False)
    statutory_reference = Column(String(255), nullable=True) # e.g. 'Section 2(1) of ITO 2001'
    practical_example = Column(Text, nullable=True)
    related_terms = Column(String(255), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class CustomTariff(Base):
    __tablename__ = "custom_tariffs"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    hs_code = Column(String(20), index=True, nullable=False) # e.g. '8517.13.00'
    description = Column(Text, nullable=False)
    chapter_number = Column(Integer, index=True, nullable=False) # e.g. 85
    custom_duty_rate = Column(String(50), nullable=False) # e.g. '11%' or '20%'
    regulatory_duty = Column(String(50), default="0%") # e.g. '5%'
    additional_custom_duty = Column(String(50), default="2%") # e.g. '2%' or '4%'
    sales_tax_rate = Column(String(50), default="18%") # e.g. '18%' or '25%'
    advance_income_tax_wht = Column(String(50), default="5.5%") # e.g. '5.5% (Filer) / 11% (Non-Filer)'
    import_restriction = Column(String(100), default="Free") # 'Free', 'Prohibited', 'Condition Apply - Appendix B'
    created_at = Column(DateTime, default=datetime.utcnow)

class TaxNews(Base):
    __tablename__ = "tax_news"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    title = Column(String(255), nullable=False)
    category = Column(String(100), default="FBR Policy", index=True) # 'FBR Policy', 'High Court Ruling', 'Finance Bill', 'Circular'
    summary = Column(Text, nullable=False)
    content = Column(Text, nullable=False)
    source = Column(String(150), default="Federal Board of Revenue")
    published_date = Column(String(50), nullable=False)
    is_breaking = Column(Integer, default=0)
    pdf_url = Column(String(255), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class FinanceActDocument(Base):
    __tablename__ = "finance_act_documents"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    fiscal_year = Column(String(20), index=True, nullable=False) # '2024-25', '2025-26', '2026-27'
    title = Column(String(255), nullable=False)
    act_name = Column(String(150), nullable=False) # e.g. 'Finance Act 2025'
    enactment_date = Column(String(50), nullable=False)
    key_amendments_summary = Column(Text, nullable=False)
    income_tax_changes = Column(Text, nullable=False)
    sales_tax_changes = Column(Text, nullable=False)
    customs_changes = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

class SalesTaxPhase(Base):
    __tablename__ = "sales_tax_phases"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    phase_number = Column(Integer, unique=True, index=True, nullable=False) # 1 to 6
    title = Column(String(255), nullable=False)
    sections_range = Column(String(100), nullable=False) # e.g. 'Sections 1 to 13'
    description = Column(Text, nullable=False)
    subsections = Column(Text, nullable=False) # JSON encoded list of subtopics & section ranges
    icon = Column(String(50), default="Scale")
    color_theme = Column(String(50), default="emerald")
    created_at = Column(DateTime, default=datetime.utcnow)

class TaxSection(Base):
    __tablename__ = "tax_sections"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    act_type = Column(String(100), default="Income Tax Ordinance, 2001", index=True)
    chapter = Column(String(150), nullable=True, index=True)
    part_division = Column(String(150), nullable=True, index=True)
    section_code = Column(String(100), nullable=False, index=True) # e.g. 'Section 122', 'Section 236K', 'First Schedule Division VII'
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    sub_sections = Column(Text, nullable=True)
    statutory_rates_or_penalties = Column(Text, nullable=True)
    practical_notes = Column(Text, nullable=True)
    cross_references = Column(String(255), nullable=True)
    fbr_precedents_and_circulars = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class TaxRule(Base):
    __tablename__ = "tax_rules"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    rule_book = Column(String(100), default="Income Tax Rules, 2002", index=True)
    chapter = Column(String(150), nullable=True, index=True)
    rule_number = Column(String(50), nullable=False, index=True) # e.g. 'Rule 3', 'Rule 14', 'Rule 23', 'Rule 27A', 'Rule 44'
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    sub_rules = Column(Text, nullable=True)
    valuation_methodology = Column(Text, nullable=True)
    compliance_steps = Column(Text, nullable=True)
    practical_notes = Column(Text, nullable=True)
    cross_references = Column(String(255), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

