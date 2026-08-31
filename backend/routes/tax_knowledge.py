import os
import json
import uuid
from typing import List, Optional, Any
from fastapi import APIRouter, Depends, HTTPException, Query
from pydantic import BaseModel
from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession
from backend.database import get_db
from backend.models import (
    TaxStatute, 
    CaseLaw, 
    SRO, 
    TaxProblem, 
    User, 
    SalesTaxPhase,
    TaxSection,
    TaxRule
)
from backend.auth import get_current_user

router = APIRouter(prefix="/api/tax", tags=["Tax Knowledge & Legal Engine"])

# Pydantic Schemas
class StatuteSectionResponse(BaseModel):
    id: str
    act_type: str
    chapter: Optional[str] = None
    section: str
    title: str
    description: str
    sub_sections: Optional[str] = None
    practical_notes: Optional[str] = None
    cross_references: Optional[str] = None

class CaseLawResponse(BaseModel):
    id: str
    citation: str
    title: str
    court: str
    year: int
    summary: str
    key_holding: str
    appellant: Optional[str] = None
    respondent: Optional[str] = None
    relevant_sections: Optional[str] = None
    keywords: Optional[str] = None

class SROResponse(BaseModel):
    id: str
    number: str
    title: str
    year: int
    category: str
    description: str
    effective_date: Optional[str] = None
    status: str
    issuing_authority: str

class TaxProblemResponse(BaseModel):
    id: str
    section_id: str
    topic: str
    scenario: str
    calculation_steps: str
    solution: str
    statutory_ref: str
    difficulty_level: str
    practical_takeaways: Optional[str] = None

class CaseLawSearchRequest(BaseModel):
    query: Optional[str] = None
    court: Optional[str] = None
    year: Optional[int] = None
    section: Optional[str] = None

class NoticeDraftRequest(BaseModel):
    notice_type: str # e.g. "Section 11(2) - Best Judgment Assessment", "Section 8(1)(ca) - Disallowance of Input Tax"
    section_code: str
    tax_period: str
    taxpayer_name: str
    ntn_strn: str
    officer_designation: str
    allegations_summary: str
    defense_grounds: str
    attached_documents: List[str]

# ==========================================
# 1. Sales Tax Act, 1990 Statute Sections
# ==========================================
@router.get("/sales-tax/sections")
async def get_sales_tax_sections(
    search: Optional[str] = Query(None, description="Search keyword in title or section"),
    chapter: Optional[str] = Query(None, description="Filter by Chapter"),
    section: Optional[str] = Query(None, description="Filter by Section e.g. Section 3, Section 8B"),
    act_type: Optional[str] = Query("Sales Tax Act, 1990"),
    db: AsyncSession = Depends(get_db)
):
    """
    Search and interpret core sections of The Sales Tax Act, 1990 and The Sales Tax Rules, 2006.
    """
    stmt = select(TaxStatute)
    if act_type:
        stmt = stmt.where(TaxStatute.act_type.ilike(f"%{act_type}%"))
    if section:
        stmt = stmt.where(TaxStatute.section.ilike(f"%{section}%"))
    if chapter:
        stmt = stmt.where(TaxStatute.chapter.ilike(f"%{chapter}%"))
    if search:
        search_filter = f"%{search}%"
        stmt = stmt.where(
            (TaxStatute.title.ilike(search_filter)) |
            (TaxStatute.description.ilike(search_filter)) |
            (TaxStatute.section.ilike(search_filter)) |
            (TaxStatute.practical_notes.ilike(search_filter))
        )

    result = await db.execute(stmt)
    records = result.scalars().all()
    return records

# ==========================================
# 1B. Income Tax Ordinance, 2001 Sections Search
# ==========================================
@router.get("/income-tax/sections")
async def get_income_tax_sections(
    search: Optional[str] = Query(None, description="Search keyword in title, section or notes"),
    section: Optional[str] = Query(None, description="Section code e.g. Section 114, Section 122, Section 236K"),
    chapter: Optional[str] = Query(None, description="Chapter filter"),
    part_division: Optional[str] = Query(None, description="Part / Division filter"),
    db: AsyncSession = Depends(get_db)
):
    """
    Search and interpret sections and schedules of the Income Tax Ordinance, 2001.
    """
    stmt = select(TaxSection)
    if section:
        stmt = stmt.where(TaxSection.section_code.ilike(f"%{section}%"))
    if chapter:
        stmt = stmt.where(TaxSection.chapter.ilike(f"%{chapter}%"))
    if part_division:
        stmt = stmt.where(TaxSection.part_division.ilike(f"%{part_division}%"))
    if search:
        s_filter = f"%{search}%"
        stmt = stmt.where(
            (TaxSection.section_code.ilike(s_filter)) |
            (TaxSection.title.ilike(s_filter)) |
            (TaxSection.description.ilike(s_filter)) |
            (TaxSection.practical_notes.ilike(s_filter)) |
            (TaxSection.statutory_rates_or_penalties.ilike(s_filter))
        )
    result = await db.execute(stmt)
    return result.scalars().all()

# ==========================================
# 1C. Income Tax Rules, 2002 Search
# ==========================================
@router.get("/income-tax/rules")
async def get_income_tax_rules(
    search: Optional[str] = Query(None, description="Search keyword in title, rule or notes"),
    rule_number: Optional[str] = Query(None, description="Rule number e.g. Rule 3, Rule 23, Rule 27"),
    chapter: Optional[str] = Query(None, description="Chapter filter"),
    db: AsyncSession = Depends(get_db)
):
    """
    Search and interpret rules of the Income Tax Rules, 2002.
    """
    stmt = select(TaxRule)
    if rule_number:
        stmt = stmt.where(TaxRule.rule_number.ilike(f"%{rule_number}%"))
    if chapter:
        stmt = stmt.where(TaxRule.chapter.ilike(f"%{chapter}%"))
    if search:
        s_filter = f"%{search}%"
        stmt = stmt.where(
            (TaxRule.rule_number.ilike(s_filter)) |
            (TaxRule.title.ilike(s_filter)) |
            (TaxRule.description.ilike(s_filter)) |
            (TaxRule.valuation_methodology.ilike(s_filter)) |
            (TaxRule.practical_notes.ilike(s_filter))
        )
    result = await db.execute(stmt)
    return result.scalars().all()

# ==========================================
# 2. Case Laws & Citations Search
# ==========================================
@router.get("/case-laws/search")
async def search_case_laws(
    q: Optional[str] = Query(None, description="Search citations, parties, principles or keywords"),
    court: Optional[str] = Query(None, description="Supreme Court, High Court, ATIR"),
    year: Optional[int] = Query(None, description="Year of judgment"),
    section: Optional[str] = Query(None, description="Section code e.g. Section 8, Section 73"),
    db: AsyncSession = Depends(get_db)
):
    """
    Search relevant court decisions, legal citations, and precedent cases for tax appeals.
    """
    stmt = select(CaseLaw)
    if court:
        stmt = stmt.where(CaseLaw.court.ilike(f"%{court}%"))
    if year:
        stmt = stmt.where(CaseLaw.year == year)
    if section:
        stmt = stmt.where(CaseLaw.relevant_sections.ilike(f"%{section}%"))
    if q:
        q_filter = f"%{q}%"
        stmt = stmt.where(
            (CaseLaw.citation.ilike(q_filter)) |
            (CaseLaw.title.ilike(q_filter)) |
            (CaseLaw.summary.ilike(q_filter)) |
            (CaseLaw.key_holding.ilike(q_filter)) |
            (CaseLaw.keywords.ilike(q_filter))
        )

    stmt = stmt.order_by(CaseLaw.year.desc())
    result = await db.execute(stmt)
    return result.scalars().all()

# ==========================================
# 3. SROs, STGOs & Circulars Repository
# ==========================================
@router.get("/sro-lookup")
async def lookup_sros(
    category: Optional[str] = Query(None, description="SRO, STGO, Circular, Clarification"),
    year: Optional[int] = Query(None, description="Year of issuance"),
    search: Optional[str] = Query(None, description="Search SRO number or title/keyword"),
    status: Optional[str] = Query(None, description="In Force, Superseded, Amended"),
    db: AsyncSession = Depends(get_db)
):
    """
    Database and UI filter for Statutory Regulatory Orders (SROs), Sales Tax General Orders (STGOs), official circulars, and FBR clarifications.
    """
    stmt = select(SRO)
    if category:
        stmt = stmt.where(SRO.category.ilike(f"%{category}%"))
    if year:
        stmt = stmt.where(SRO.year == year)
    if status:
        stmt = stmt.where(SRO.status.ilike(f"%{status}%"))
    if search:
        s_filter = f"%{search}%"
        stmt = stmt.where(
            (SRO.number.ilike(s_filter)) |
            (SRO.title.ilike(s_filter)) |
            (SRO.description.ilike(s_filter))
        )

    stmt = stmt.order_by(SRO.year.desc())
    result = await db.execute(stmt)
    return result.scalars().all()

# ==========================================
# 4. Solved Problems & Practical Q&A Engine
# ==========================================
@router.get("/solved-problems")
async def get_solved_problems(
    section_id: Optional[str] = Query(None, description="Filter by section e.g. Section 8, Section 8B, Section 73"),
    difficulty: Optional[str] = Query(None, description="Basic, Intermediate, Advanced / Corporate"),
    search: Optional[str] = Query(None, description="Search topic or scenario text"),
    db: AsyncSession = Depends(get_db)
):
    """
    Section-wise breakdown of practical tax problems, practical calculations, and step-by-step solutions for tax advisors and consultants.
    """
    stmt = select(TaxProblem)
    if section_id:
        stmt = stmt.where(TaxProblem.section_id.ilike(f"%{section_id}%"))
    if difficulty:
        stmt = stmt.where(TaxProblem.difficulty_level.ilike(f"%{difficulty}%"))
    if search:
        s_filter = f"%{search}%"
        stmt = stmt.where(
            (TaxProblem.topic.ilike(s_filter)) |
            (TaxProblem.scenario.ilike(s_filter)) |
            (TaxProblem.solution.ilike(s_filter))
        )

    result = await db.execute(stmt)
    return result.scalars().all()

# ==========================================
# 5. Sales Tax Act 1990 - 6 Structured Phases
# ==========================================
SALES_TAX_PHASES_KNOWLEDGE = [
    {
        "phase_number": 1,
        "title": "Foundations and Tax Application",
        "sections_range": "Sections 1 to 13",
        "description": "Establishes the fundamental scope of the Sales Tax Act 1990, statutory definitions, charging mechanism, special utility regimes, zero-rated exports, input/output adjustment mechanics, and exemption powers.",
        "icon": "Scale",
        "color_theme": "emerald",
        "subsections": [
            {
                "id": "phase-1-sub-1",
                "topic": "Title and Definitions",
                "sections": "Sections 1–2",
                "summary": "Establishes the formal name, territorial jurisdiction, and the comprehensive legal dictionary for all concepts including 'goods', 'manufacturer', 'taxable supply', 'input tax', 'output tax', and 'value of supply'.",
                "key_provisions": [
                    "Section 1: Short title, extent across Pakistan, and commencement dates.",
                    "Section 2(14) - Input Tax: Tax levied under this Act on supply of goods to the person or on goods imported by him.",
                    "Section 2(20) - Output Tax: Sales tax charged on taxable supplies made by the registered person.",
                    "Section 2(33) - Supply: Sale or other transfer of the right to dispose of goods for consideration.",
                    "Section 2(46) - Value of Supply: Price inclusive of all federal duties/taxes but excluding the sales tax amount."
                ],
                "practical_notes": "Understanding Section 2 definitions is foundational. In FBR audits, disputes over whether an activity is a 'manufacture' (Sec 2(16)) or a mere trading distribution dictate whether Tier-1 manufacturer status applies.",
                "applicable_rules_or_sros": ["Sales Tax Rules 2006 Chapter I", "Valuation Rulings under Section 2(46)"]
            },
            {
                "id": "phase-1-sub-2",
                "topic": "The Core Charging Provision",
                "sections": "Section 3",
                "summary": "Commands sales tax levy at 18% standard ad valorem rate on locally manufactured or imported goods, further tax on unregistered buyers, Third Schedule retail price taxation, and Tier-1 POS integration.",
                "key_provisions": [
                    "Section 3(1): Standard sales tax rate of 18% ad valorem on taxable supplies and imports.",
                    "Section 3(1A): Further tax of 4% on supplies made to persons who have not obtained sales tax registration (Non-STRN buyers).",
                    "Section 3(2)(a): Third Schedule items taxed on printed Retail Price (MRP) rather than wholesale invoice value.",
                    "Section 3(7): Withholding of sales tax at source by prescribed withholding agents.",
                    "Section 3(9): Sales tax collection from Tier-1 Retailers integrated with FBR real-time computerized systems."
                ],
                "practical_notes": "Further tax under Section 3(1A) cannot be claimed as adjustable input tax by the unregistered buyer. For Third Schedule consumer goods, retail price inclusive of sales tax must be legibly embossed on packaging.",
                "applicable_rules_or_sros": ["Third Schedule to STA 1990", "Sales Tax Withholding Rules", "SRO 297(I)/2023"]
            },
            {
                "id": "phase-1-sub-3",
                "topic": "Special Regimes and Utilities",
                "sections": "Sections 3A–3C",
                "summary": "Special collection mechanisms for natural gas, electricity tariffs, and telecommunication sectors with customized withholding percentages.",
                "key_provisions": [
                    "Section 3A: Collection of sales tax on natural gas and power generation distribution.",
                    "Section 3B: Rates for special industrial utility consumers and CNG stations.",
                    "Section 3C: Telecommunication withholding models and digital services integration."
                ],
                "practical_notes": "Electricity bills of commercial and industrial connections charge extra sales tax under Section 3(9A) if the consumer NTN/STRN is not linked with the DISCO billing portal.",
                "applicable_rules_or_sros": ["SRO 647(I)/2007", "DISCO Energy Tax Regulations"]
            },
            {
                "id": "phase-1-sub-4",
                "topic": "Exports and Zero-Rating",
                "sections": "Section 4",
                "summary": "Zero percent (0%) tax rate applied on exports of goods, supplies to diplomatic missions, and items listed in the Fifth Schedule, entitling full refund of input taxes incurred.",
                "key_provisions": [
                    "Section 4(a): Goods exported out of Pakistan charged at 0% sales tax.",
                    "Section 4(b): Supply of stores and provisions for conveyance proceeding to a destination outside Pakistan.",
                    "Section 4(c): Supplies specified in the Fifth Schedule (Zero-Rating Schedule).",
                    "Section 4(d): Duty and Tax Remission for Exports (DTRE) scheme alignment."
                ],
                "practical_notes": "Zero-rated suppliers do not charge output tax on export invoices but are legally entitled to refund of 100% of verifiable input tax paid on raw materials via the FASTER system under Section 10.",
                "applicable_rules_or_sros": ["Fifth Schedule to STA 1990", "DTRE Rules 2001", "FASTER SRO 888(I)/2020"]
            },
            {
                "id": "phase-1-sub-5",
                "topic": "Procedural Mechanics",
                "sections": "Sections 5–10",
                "summary": "Change in tax rates, tax maturity timelines, credit and debit notes adjustments, core input tax deduction mechanism (Output - Input), 90% cap (Section 8B), and automated FASTER refunds (Section 10).",
                "key_provisions": [
                    "Section 5: Change in rate of tax applicable at the time of supply or clearance.",
                    "Section 6: Time and manner of payment of sales tax upon delivery or invoice.",
                    "Section 7: Core determination of tax liability — deduction of input tax from output tax.",
                    "Section 8: Inadmissible input tax (fake invoices, non-business use, cash transactions under Sec 73).",
                    "Section 8B: 90% restriction on adjustable input tax in a single monthly return period.",
                    "Section 9: Debit and credit notes adjustments for returns, price changes, or cancellations.",
                    "Section 10: FASTER e-Refund mechanism within 45 days (or 72 hours for verified export sectors)."
                ],
                "practical_notes": "Section 8(1)(ca) is the primary subject of departmental show-cause notices. Supreme Court precedent (2023 PTD 1450) protects bona fide buyers against retrospective supplier blacklisting if banking proofs exist under Section 73.",
                "applicable_rules_or_sros": ["Sales Tax Rules Chapter III (Debit/Credit Notes)", "SRO 1190(I)/2019 (8B Exemptions)", "SRO 350(I)/2024"]
            },
            {
                "id": "phase-1-sub-6",
                "topic": "Exemptions and Special Sectors",
                "sections": "Sections 11–13",
                "summary": "Power of the Federal Government and Board to notify statutory sales tax exemptions on essential food items, health equipment, agricultural inputs, and specific economic zones under the Sixth Schedule and SROs.",
                "key_provisions": [
                    "Section 13(1): Exemption from sales tax for goods specified in the Sixth Schedule (Table-1 Imports, Table-2 Local Supplies).",
                    "Section 13(2): Power of the Federal Government to grant exemptions during national emergency or economic necessity through SROs.",
                    "Section 13(3): Direct humanitarian and disaster relief exemption notifications."
                ],
                "practical_notes": "Exempt supplies under Section 13 differ drastically from Zero-Rated supplies under Section 4: Input tax on exempt supplies is NOT refundable or adjustable; it must be capitalized or apportioned under Rule 25.",
                "applicable_rules_or_sros": ["Sixth Schedule to STA 1990 (Tables 1, 2, 3)", "Rule 25 (Apportionment of Input Tax)"]
            }
        ]
    },
    {
        "phase_number": 2,
        "title": "Registration Framework",
        "sections_range": "Sections 14 to 21",
        "description": "Encompasses mandatory enrollment requirements, voluntary registrations, branch registrations, e-portal profile management, and stringent penal provisions for suspension and blacklisting.",
        "icon": "Building",
        "color_theme": "blue",
        "subsections": [
            {
                "id": "phase-2-sub-1",
                "topic": "Mandatory Enrollment",
                "sections": "Section 14",
                "summary": "Mandatory requirement to obtain Sales Tax Registration Number (STRN) for all manufacturing concerns, importers, commercial exporters, distributors, wholesalers, and Tier-1 retailers.",
                "key_provisions": [
                    "Section 14(1): Compulsory registration of persons engaged in taxable supplies in Pakistan.",
                    "Section 14(2): Mandatory category thresholds (Tier-1 Retailers, industrial power connections).",
                    "Section 14(3): Centralized electronic registration on FBR Iris biometric authentication portal."
                ],
                "practical_notes": "Operating a taxable manufacturing or wholesale business without STRN triggers compulsory registration under Section 14(3), freezing of bank accounts, and penalty under Section 33.",
                "applicable_rules_or_sros": ["Sales Tax Rules 2006 Chapter I (Registration)", "Biometric Verisys Mandate"]
            },
            {
                "id": "phase-2-sub-2",
                "topic": "Voluntary and Specialized Registration",
                "sections": "Sections 15–20",
                "summary": "Voluntary registration procedures, multi-branch and sub-unit structures, transfer of registration between Regional Tax Offices (RTOs), and deregistration protocols.",
                "key_provisions": [
                    "Section 15: Voluntary registration for persons not strictly mandated to enroll.",
                    "Section 16: Temporary registration for seasonal and contractual businesses.",
                    "Section 17: Registration of separate branches and manufacturing units under single NTN.",
                    "Section 18: Transfer of jurisdiction across Chief Commissioners and RTOs.",
                    "Section 20: Deregistration process upon cessation of taxable business and audit clearance."
                ],
                "practical_notes": "Before deregistration is granted under Section 20, the taxpayer must undergo a final closure audit to reconcile all unutilized input tax, stock in hand, and outstanding assessment orders.",
                "applicable_rules_or_sros": ["Sales Tax Rules 2006 Chapter II (Deregistration)", "STGO 01/2022"]
            },
            {
                "id": "phase-2-sub-3",
                "topic": "Penal Status: Blacklisting and Suspension",
                "sections": "Section 21",
                "summary": "Freezing, suspension, and blacklisting of sales tax registrations where fraudulent invoices, non-existent business premises, or systematic tax evasion are identified.",
                "key_provisions": [
                    "Section 21(1): Power of Commissioner to suspend STRN of a non-compliant or missing taxpayer.",
                    "Section 21(2): Mandatory 7-day hearing notice prior to formal blacklisting order.",
                    "Section 21(3): Complete blocking of sales tax input credit across the entire supply chain upon blacklisting.",
                    "Section 21(4): Restoration procedure upon payment of assessed liabilities and physical premises verification."
                ],
                "practical_notes": "Suspension under Section 21 immediately freezes the taxpayer's ability to issue sales tax invoices on Iris. Under SRO 350(I)/2024, buyers cannot adjust invoices issued by suspended suppliers.",
                "applicable_rules_or_sros": ["Sales Tax Rules 2006 Rule 12 (Blacklisting Procedure)", "SRO 350(I)/2024"]
            }
        ]
    },
    {
        "phase_number": 3,
        "title": "Bookkeeping, Invoicing, and Audits",
        "sections_range": "Sections 22 to 30",
        "description": "Specifies mandatory statutory accounts retention, sales tax invoicing standards, electronic fiscal devices/POS integration, official audit scrutiny, and monthly Iris return compliance.",
        "icon": "FileText",
        "color_theme": "purple",
        "subsections": [
            {
                "id": "phase-3-sub-1",
                "topic": "Record Retention",
                "sections": "Section 22",
                "summary": "Statutory obligation to maintain comprehensive physical and digital accounts, purchase/sales ledgers, stock registers, and goods inward/outward gate passes for six years.",
                "key_provisions": [
                    "Section 22(1): Mandatory maintenance of records of supplies made, goods purchased, and stock registers.",
                    "Section 22(1A): Retention of electronic Point of Sale (POS) transaction logs.",
                    "Section 22(2): Six (6) years statutory retention period from the end of the tax year.",
                    "Section 22(3): Requirement to maintain records at the principal place of business registered on Iris."
                ],
                "practical_notes": "Failure to produce purchase records during audit under Section 25 empowers the tax officer to reject input tax claims and proceed with Best Judgment Assessment under Section 11.",
                "applicable_rules_or_sros": ["Sales Tax Rules 2006 Chapter IV", "Electronic Record Retention Rules"]
            },
            {
                "id": "phase-3-sub-2",
                "topic": "Invoicing Standards",
                "sections": "Section 23",
                "summary": "Strict statutory requirements for issuing valid sales tax invoices, serial numbering, STRN/NTN disclosures, buyer CNIC thresholds, and digital QR-code integration.",
                "key_provisions": [
                    "Section 23(1): Mandatory items on invoice: Serial number, date, supplier name/STRN, recipient name/STRN, description, value, tax rate, and tax amount.",
                    "Section 23(1)(b): Requirement of buyer CNIC/NTN for supplies to non-registered persons exceeding PKR 100,000.",
                    "Section 23(2): Requirement for Tier-1 Retailers to issue FBR-system verified invoice with scannable QR code.",
                    "Section 23(4): E-invoicing and digital invoice integration on FBR central server under SRO 1525(I)/2023."
                ],
                "practical_notes": "Invoices missing statutory elements (like buyer NTN/STRN or separate tax breakdown) are legally invalid for claiming input tax credit under Section 7 and 8.",
                "applicable_rules_or_sros": ["SRO 1525(I)/2023 (Digital Invoicing)", "SRO 1006(I)/2021 (POS QR Code Rules)"]
            },
            {
                "id": "phase-3-sub-3",
                "topic": "Official Audits and Scrutiny",
                "sections": "Sections 25–25A",
                "summary": "Officer powers to conduct annual sales tax audits, call for records, inspect business premises, and appoint independent Chartered Accountant firms for forensic special audits.",
                "key_provisions": [
                    "Section 25(1): Officer of Inland Revenue access to business premises, stocks, and electronic accounting systems.",
                    "Section 25(2): Notice for production of records and explanation of ledger discrepancies.",
                    "Section 25(3): Annual limitation on conducting desk/field audit once in three years unless specific evasion detected.",
                    "Section 25A: Special Audit conducted by panels of Chartered Accountants or Cost and Management Accountants."
                ],
                "practical_notes": "Audit observations must culminate in a formal Audit Report. The department cannot issue a Section 11 demand notice without first sharing the audit observations and seeking explanation.",
                "applicable_rules_or_sros": ["National Tax Audit Framework", "FBR Parametric Computerized Balloting"]
            },
            {
                "id": "phase-3-sub-4",
                "topic": "Returns and Compliance Tracking",
                "sections": "Sections 26–30",
                "summary": "Monthly electronic return filing on Iris portal by the 15th/18th of each month, Annexure-C/Annexure-A matching, annual returns, and electronic video surveillance.",
                "key_provisions": [
                    "Section 26: Monthly return filing by 15th of the month following the tax period (payment by 15th, e-filing by 18th).",
                    "Section 26(3): Revision of sales tax return with prior Commissioner approval or within 120 days.",
                    "Section 27: Special returns called by Commissioner for specific transactions or interim periods.",
                    "Section 28: Final annual sales tax return reconciliation.",
                    "Section 30: Electronic surveillance, CCTV monitoring of production lines for sugar, cement, tobacco, and beverages."
                ],
                "practical_notes": "Under SRO 350(I)/2024, if a supplier fails to submit Annexure-C by the 18th, the buyer's return in Iris will block the input credit until the supplier files and pays the liability.",
                "applicable_rules_or_sros": ["Iris E-Filing Guidelines", "SRO 350(I)/2024", "Track & Trace Rules"]
            }
        ]
    },
    {
        "phase_number": 4,
        "title": "Administrative Hierarchy and Enforcement Powers",
        "sections_range": "Sections 30A to 44",
        "description": "Defines the statutory hierarchy of Inland Revenue authorities, adjudication jurisdictions, statutory penalties under Section 33, default surcharges under Section 34, and coercive enforcement powers.",
        "icon": "ShieldCheck",
        "color_theme": "amber",
        "subsections": [
            {
                "id": "phase-4-sub-1",
                "topic": "Officer Classifications",
                "sections": "Sections 30A–30B",
                "summary": "Statutory hierarchy of Inland Revenue officers from Chief Commissioners, Commissioners, Additional/Deputy/Assistant Commissioners down to Directorate General of Intelligence & Investigation (I&I).",
                "key_provisions": [
                    "Section 30: Designation and administrative authority of Inland Revenue officers.",
                    "Section 30A: Directorate General of Intelligence and Investigation (Inland Revenue).",
                    "Section 30B: Directorate General of Internal Audit and Risk Assessment.",
                    "Section 30DD: Directorate General of Digital Invoicing and Electronic Surveillance."
                ],
                "practical_notes": "Inland Revenue officers must exercise statutory powers within their notified territorial and pecuniary jurisdiction under Section 30 and FBR official notifications.",
                "applicable_rules_or_sros": ["FBR Jurisdiction Notifications", "Delegation of Powers SROs"]
            },
            {
                "id": "phase-4-sub-2",
                "topic": "Adjudication and Assessments",
                "sections": "Sections 31–32",
                "summary": "Pecuniary adjudication limits, show-cause notice timelines, and departmental determination of tax evasion and unpaid duties.",
                "key_provisions": [
                    "Section 31: Adjudication powers distributed according to tax demand amounts (Commissioners vs Deputy Commissioners).",
                    "Section 32: Recovery of tax not levied or short-levied by reason of inadvertence, error, or willful evasion."
                ],
                "practical_notes": "An assessment order passed without issuing a statutory show-cause notice under Section 11/32 is void ab initio and illegal as per Supreme Court jurisprudence.",
                "applicable_rules_or_sros": ["Adjudication Rules", "Statutory Limitation Guidelines"]
            },
            {
                "id": "phase-4-sub-3",
                "topic": "Penalties and Default Surcharges",
                "sections": "Sections 33–34",
                "summary": "Comprehensive table of 26 statutory penalty serials under Section 33 for non-filing, invoice suppression, and default surcharge (KIBOR + 3% per annum) under Section 34.",
                "key_provisions": [
                    "Section 33 Serial 1: Penalty for non-filing of monthly return within due date (PKR 10,000 minimum).",
                    "Section 33 Serial 11: Penalty for tax evasion and fraudulent input credit (100% of evaded tax amount).",
                    "Section 33 Serial 16: Penalty for cash payments exceeding Section 73 limits (5% of tax or PKR 10,000).",
                    "Section 34: Mandatory default surcharge at 12% per annum or KIBOR+3% on overdue sales tax payments."
                ],
                "practical_notes": "Default surcharge under Section 34 is compensatory in nature and accrues automatically from the statutory due date until the actual date of realization.",
                "applicable_rules_or_sros": ["Section 33 Offence Matrix", "KIBOR Benchmark Notifications"]
            },
            {
                "id": "phase-4-sub-4",
                "topic": "Coercive Actions: Seizures, Arrests, and Prosecution",
                "sections": "Sections 37–44",
                "summary": "Drastic coercive powers including search warrants, premises sealing, stock impounding, bank account attachment, asset freezes, arrests, and criminal prosecution.",
                "key_provisions": [
                    "Section 37: Power to enter and search business premises under Magistrate or Commissioner warrant.",
                    "Section 37A: Power to arrest and prosecute persons involved in deliberate tax fraud exceeding statutory thresholds.",
                    "Section 38: Authorization of officers to access business premises, stock, and computers.",
                    "Section 40: Special audit and seizure of fake invoice records.",
                    "Section 40B: Posting of Inland Revenue officers at business premises for live production/sales monitoring."
                ],
                "practical_notes": "Officer posting under Section 40B requires prior written approval from the Chief Commissioner and can only be sustained during designated operational shifts.",
                "applicable_rules_or_sros": ["Criminal Procedure Code (CrPC) Application", "Section 37A Arrest Guidelines"]
            }
        ]
    },
    {
        "phase_number": 5,
        "title": "Appeals and Dispute Resolution",
        "sections_range": "Sections 45 to 48",
        "description": "Hierarchical appellate framework from Commissioner (Appeals) and Appellate Tribunal Inland Revenue (ATIR) to High Court References, Alternate Dispute Resolution (ADR), and arrear recovery.",
        "icon": "Gavel",
        "color_theme": "indigo",
        "subsections": [
            {
                "id": "phase-5-sub-1",
                "topic": "Appellate Tiers",
                "sections": "Sections 45A–46",
                "summary": "First appeal before Commissioner (Appeals) within 30 days of assessment order and second judicial appeal before Appellate Tribunal Inland Revenue (ATIR).",
                "key_provisions": [
                    "Section 45A: Powers of Board and Commissioner to call for records and exercise revisional jurisdiction.",
                    "Section 45B: First appeal to Commissioner Inland Revenue (Appeals) within 30 days of service of order.",
                    "Section 45B(1A): Mandatory payment of 10% of disputed tax demand prior to lodging first appeal.",
                    "Section 46: Second appeal to Appellate Tribunal Inland Revenue (ATIR) on questions of fact and law.",
                    "Section 46(2): Stay of recovery granted by ATIR for maximum period of 180 days."
                ],
                "practical_notes": "Commissioner (Appeals) must decide the appeal within 120 days. ATIR is the final judicial forum for questions of fact; decisions of ATIR on factual points are final and binding.",
                "applicable_rules_or_sros": ["ATIR Rules 2010", "Appeals Electronic Filing Module"]
            },
            {
                "id": "phase-5-sub-2",
                "topic": "Judicial References and Alternative Resolution",
                "sections": "Sections 47–47A",
                "summary": "Reference applications to the High Court on pure questions of law arising from ATIR orders, and Alternate Dispute Resolution (ADR) committee mechanisms.",
                "key_provisions": [
                    "Section 47: Reference to High Court within 90 days of receipt of ATIR order on substantial questions of law.",
                    "Section 47(5): High Court reference must be heard by a bench of not less than two Judges (Division Bench).",
                    "Section 47A: Alternate Dispute Resolution (ADR) committee comprising a retired Judge/CA and Chief Commissioner for out-of-court settlements."
                ],
                "practical_notes": "High Court references under Section 47 cannot re-examine factual findings of ATIR unless shown to be completely perverse or unsupported by evidence.",
                "applicable_rules_or_sros": ["High Court Rules & Orders", "ADRC Notifications under Sec 47A"]
            },
            {
                "id": "phase-5-sub-3",
                "topic": "Arrear Recovery",
                "sections": "Section 48",
                "summary": "Coercive recovery of crystallized tax arrears through bank account attachments under Section 48(1)(ca), property attachment, and public auction.",
                "key_provisions": [
                    "Section 48(1)(a): Deduction from any money owing to the taxpayer by FBR or Customs.",
                    "Section 48(1)(ca): Direct notice to banks for immediate debit and transfer of funds from taxpayer bank accounts.",
                    "Section 48(1)(d): Attachment and sale of movable and immovable property by auction.",
                    "Section 48(1)(f): Appointment of receiver for management of debtor business assets."
                ],
                "practical_notes": "Departmental recovery under Section 48 cannot be initiated until 30 days have elapsed from the assessment order or while an active stay order from CIR(A) or ATIR is in force.",
                "applicable_rules_or_sros": ["Sales Tax Rules 2006 Chapter XI (Recovery)", "Bank Garnishee Notices"]
            }
        ]
    },
    {
        "phase_number": 6,
        "title": "Miscellaneous and Legal Overarching Rules",
        "sections_range": "Sections 49 to 76",
        "description": "Covers Board rule-making powers, SRO issuance, the mandatory Section 73 crossed banking channel restriction, condonation of statutory limitation delays under Section 74, and concluding provisions.",
        "icon": "Layers",
        "color_theme": "rose",
        "subsections": [
            {
                "id": "phase-6-sub-1",
                "topic": "Rule-Making and Exemptions",
                "sections": "Sections 50–60",
                "summary": "Power of the Board to frame statutory rules, forms, computer procedures, service of notices, and special procedure rules.",
                "key_provisions": [
                    "Section 50: General power of FBR to make rules through official Gazette notifications.",
                    "Section 50A: Computerized system regulations and digital audit standards.",
                    "Section 56: Service of statutory notices, orders, and electronic delivery into Iris taxpayer inbox.",
                    "Section 60: Power of Federal Government to enter into avoidance of double taxation agreements."
                ],
                "practical_notes": "Notices delivered electronically to the taxpayer's registered Iris web portal are legally deemed served under Section 56(1)(d).",
                "applicable_rules_or_sros": ["Sales Tax Rules, 2006 (SRO 555(I)/2006)", "General Clauses Act 1897"]
            },
            {
                "id": "phase-6-sub-2",
                "topic": "Banking Channels and Restrictions",
                "sections": "Section 73",
                "summary": "Mandatory statutory restriction requiring all commercial transactions exceeding PKR 50,000 to be paid exclusively through crossed banking instruments or authorized electronic bank transfers.",
                "key_provisions": [
                    "Section 73(1): Payment for business transactions exceeding PKR 50,000 must be made via crossed cheque, pay order, or direct bank transfer from business account to business account.",
                    "Section 73(2): Disallowance of input tax credit on all purchases where payment is made in cash.",
                    "Section 73(3): Requirement that both buyer and seller declared bank accounts must be updated on Iris portal.",
                    "Section 73(4): 180-day limitation: Payment must be cleared within 180 days of invoice date to retain input admissibility."
                ],
                "practical_notes": "Section 73 is strictly interpreted by Courts. Even genuine supplies will lose 100% input credit under Section 8(1)(m) if payment is made via cash or bearer cheque.",
                "applicable_rules_or_sros": ["Section 8(1)(m)", "2023 PTD 1450 SC", "Section 33 Serial 16"]
            },
            {
                "id": "phase-6-sub-3",
                "topic": "Condonation of Time Limits",
                "sections": "Section 74",
                "summary": "Power of the Federal Board of Revenue or Chief Commissioners to condone delays in filing returns, claiming refunds, lodging appeals, or performing statutory acts.",
                "key_provisions": [
                    "Section 74: Power of FBR to condone the time limit specified in any provision of the Act or Rules upon sufficient cause shown.",
                    "Section 74A: Delegation of condonation powers to Chief Commissioners Inland Revenue."
                ],
                "practical_notes": "If a taxpayer missed the 120-day deadline for refund or return revision, a formal application under Section 74 citing technical portal downtime or medical urgency must be filed.",
                "applicable_rules_or_sros": ["FBR Condonation Policy Guidelines", "Section 74 Electronic Applications"]
            },
            {
                "id": "phase-6-sub-4",
                "topic": "Closing Provisions",
                "sections": "Sections 75–76",
                "summary": "Bar on legal suits against officers acting in good faith, removal of legislative difficulties, and repeal/savings provisions.",
                "key_provisions": [
                    "Section 75: Indemnity / Bar of suits against government officers for acts done in good faith under the Act.",
                    "Section 76: Removal of statutory difficulties during transition of tax laws.",
                    "Section 77: Repeal and savings of earlier sales tax enactments."
                ],
                "practical_notes": "Indemnity under Section 75 protects officers acting within statutory authority, but does not shield arbitrary or malicious assessments from High Court constitutional review under Article 199.",
                "applicable_rules_or_sros": ["Constitution of Pakistan Article 199", "General Clauses Act 1897"]
            }
        ]
    }
]

@router.get("/sales-tax/phases")
async def get_sales_tax_phases(
    phase_number: Optional[int] = Query(None, description="Filter by Phase number (1 to 6)"),
    search: Optional[str] = Query(None, description="Search keyword in phase title, description or subsections"),
    db: AsyncSession = Depends(get_db)
):
    """
    Returns the 6 structured statutory phases of the Sales Tax Act, 1990 with complete subsections,
    statutory sections range, practical guidance, and enforcement powers.
    """
    try:
        stmt = select(SalesTaxPhase).order_by(SalesTaxPhase.phase_number.asc())
        result = await db.execute(stmt)
        records = result.scalars().all()

        # Seed if empty in database
        if not records:
            for item in SALES_TAX_PHASES_KNOWLEDGE:
                phase_db = SalesTaxPhase(
                    id=str(uuid.uuid4()),
                    phase_number=item["phase_number"],
                    title=item["title"],
                    sections_range=item["sections_range"],
                    description=item["description"],
                    subsections=json.dumps(item["subsections"]),
                    icon=item.get("icon", "Scale"),
                    color_theme=item.get("color_theme", "emerald")
                )
                db.add(phase_db)
            await db.commit()

            stmt = select(SalesTaxPhase).order_by(SalesTaxPhase.phase_number.asc())
            result = await db.execute(stmt)
            records = result.scalars().all()

        formatted_results = []
        for r in records:
            subsections_data = []
            if r.subsections:
                try:
                    subsections_data = json.loads(r.subsections) if isinstance(r.subsections, str) else r.subsections
                except Exception:
                    subsections_data = []

            # Apply filters
            if phase_number and r.phase_number != phase_number:
                continue

            if search:
                s_lower = search.lower()
                title_match = s_lower in r.title.lower()
                desc_match = s_lower in r.description.lower()
                range_match = s_lower in r.sections_range.lower()
                sub_match = any(
                    s_lower in sub.get("topic", "").lower() or
                    s_lower in sub.get("sections", "").lower() or
                    s_lower in sub.get("summary", "").lower() or
                    any(s_lower in p.lower() for p in sub.get("key_provisions", []))
                    for sub in subsections_data
                )
                if not (title_match or desc_match or range_match or sub_match):
                    continue

            formatted_results.append({
                "id": r.id,
                "phase_number": r.phase_number,
                "title": r.title,
                "sections_range": r.sections_range,
                "description": r.description,
                "subsections": subsections_data,
                "icon": r.icon,
                "color_theme": r.color_theme
            })

        return formatted_results
    except Exception:
        # Fallback to in-memory dataset
        filtered = SALES_TAX_PHASES_KNOWLEDGE
        if phase_number:
            filtered = [p for p in filtered if p["phase_number"] == phase_number]
        if search:
            s_lower = search.lower()
            filtered = [
                p for p in filtered if (
                    s_lower in p["title"].lower() or
                    s_lower in p["description"].lower() or
                    s_lower in p["sections_range"].lower() or
                    any(
                        s_lower in sub.get("topic", "").lower() or
                        s_lower in sub.get("sections", "").lower() or
                        s_lower in sub.get("summary", "").lower()
                        for sub in p.get("subsections", [])
                    )
                )
            ]
        return filtered
