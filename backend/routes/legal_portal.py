import os
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from pydantic import BaseModel
from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession
from backend.database import get_db
from backend.models import (
    TaxStatute, 
    CaseLaw, 
    SRO, 
    LegalTerm, 
    CustomTariff, 
    TaxNews, 
    FinanceActDocument
)

router = APIRouter(prefix="/api/portal", tags=["Legal Portal & Utilities"])

# ==========================================
# 1. Statutes Search & Interpretation
# GET /api/portal/statutes
# ==========================================
@router.get("/statutes")
async def get_portal_statutes(
    act_type: Optional[str] = Query(None, description="Income Tax Ordinance 2001, Sales Tax Act 1990, Provincial Acts"),
    chapter: Optional[str] = Query(None, description="Chapter filter"),
    section: Optional[str] = Query(None, description="Section code e.g. Section 113, Section 8B"),
    search: Optional[str] = Query(None, description="Keyword search in title, text or notes"),
    db: AsyncSession = Depends(get_db)
):
    """
    Search and fetch tax statutes for Income Tax Ordinance 2001, Sales Tax Act 1990,
    Federal Excise Act 2005, and Provincial Sales Tax on Services Acts (PRA, SRB, KPRA, BRA).
    """
    stmt = select(TaxStatute)
    if act_type:
        stmt = stmt.where(TaxStatute.act_type.ilike(f"%{act_type}%"))
    if chapter:
        stmt = stmt.where(TaxStatute.chapter.ilike(f"%{chapter}%"))
    if section:
        stmt = stmt.where(TaxStatute.section.ilike(f"%{section}%"))
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

    # If DB is empty, return rich seed statutory entries
    if not records:
        return [
            {
                "id": "stat-ito-sec113",
                "act_type": "Income Tax Ordinance, 2001",
                "chapter": "Chapter IX: Minimum Tax & General Provisions",
                "section": "Section 113",
                "title": "Minimum Tax on the Income of Certain Persons (Turnover Tax)",
                "description": "Every resident company, an individual having turnover of PKR 100 million or above, and an AOP having turnover of PKR 100 million or above where no tax is payable or tax payable is less than the specified percentage of turnover, shall pay minimum tax under this section.",
                "sub_sections": "(1) Applicability on Companies & AOPs; (2) Normal rate 1.25% of gross turnover; (3) Tier-1 Retailers 0.5%; (4) Carry forward of excess tax up to 5 tax years.",
                "practical_notes": "Essential for corporate annual filings. Note that Section 113 minimum tax cannot be adjusted against final tax regime (FTR) liabilities.",
                "cross_references": "Section 113C (Alternative Corporate Tax), Section 153 (WHT on turnover)"
            },
            {
                "id": "stat-sta-sec8b",
                "act_type": "Sales Tax Act, 1990",
                "chapter": "Chapter II: Scope and Payment of Tax",
                "section": "Section 8B",
                "title": "Adjustable Input Tax (90% Restriction)",
                "description": "A registered person shall not be allowed to adjust input tax in excess of ninety per cent of the output tax for that tax period: Provided that the restriction shall not apply to public limited companies listed on the Pakistan Stock Exchange or tier-1 manufacturers complying with digital invoicing.",
                "sub_sections": "(1) General cap of 90%; (2) Exemption list under SRO 1190(I)/2019; (3) Year-end adjustment in annual return.",
                "practical_notes": "Frequently litigated before High Courts. Registered entities carrying excess input can apply for refund under Section 10 after year-end audit.",
                "cross_references": "Section 8, Section 10, SRO 1190(I)/2019"
            },
            {
                "id": "stat-pra-sec14",
                "act_type": "Punjab Sales Tax on Services Act, 2012 (PRA)",
                "chapter": "Chapter III: Scope of Tax on Services",
                "section": "Section 14",
                "title": "Withholding and Deduction of Tax on Services",
                "description": "Any recipient of taxable services designated as a withholding agent shall deduct sales tax on services at the rates specified in the Punjab Sales Tax on Services Withholding Rules.",
                "sub_sections": "(1) Mandatory deduction by corporate recipients; (2) Responsibility for deposit by 15th of following month.",
                "practical_notes": "PRA service tax standard rate is 16%, with reduced rates (5% without input adjustment) applicable on IT and telecom services.",
                "cross_references": "Second Schedule to PSTSA 2012"
            },
            {
                "id": "stat-srb-sec3",
                "act_type": "Sindh Sales Tax on Services Act, 2011 (SRB)",
                "chapter": "Chapter II: Scope of Tax",
                "section": "Section 3",
                "title": "Taxable Services and Jurisdictional Nexus",
                "description": "A taxable service is a service provided, rendered, initiated, or received in the Province of Sindh. The standard rate is 15% (or 13% for specific sectors) as defined in the Second Schedule.",
                "sub_sections": "(1) Economic nexus rule; (2) Reverse charge mechanism for cross-border/cross-provincial services.",
                "practical_notes": "Crucial for inter-provincial disputes between SRB and FBR regarding franchise fees, software development, and construction contracts.",
                "cross_references": "SRB Circular No. 02 of 2024"
            }
        ]

    return records

# ==========================================
# 2. Legal Dictionary Search
# GET /api/portal/dictionary?search={term}
# ==========================================
@router.get("/dictionary")
async def search_legal_dictionary(
    search: Optional[str] = Query(None, description="Search term, keyword or legal concept"),
    category: Optional[str] = Query(None, description="Taxation, Corporate, Litigation, Customs"),
    db: AsyncSession = Depends(get_db)
):
    """
    Search Pakistani tax, corporate, and commercial legal definitions, statutory concepts, and court interpretations.
    """
    stmt = select(LegalTerm)
    if category:
        stmt = stmt.where(LegalTerm.category.ilike(f"%{category}%"))
    if search:
        search_filter = f"%{search}%"
        stmt = stmt.where(
            (LegalTerm.term.ilike(search_filter)) |
            (LegalTerm.definition.ilike(search_filter)) |
            (LegalTerm.urdu_title.ilike(search_filter)) |
            (LegalTerm.statutory_reference.ilike(search_filter))
        )
    
    result = await db.execute(stmt)
    records = result.scalars().all()

    if not records:
        # Fallback comprehensive Pakistani tax dictionary dataset
        dictionary_data = [
            {
                "id": "dict-1",
                "term": "Active Taxpayer List (ATL)",
                "urdu_title": "ایکٹو ٹیکس پیئر لسٹ",
                "category": "Taxation",
                "definition": "The active taxpayer list published by the FBR on its official web portal under Section 181A of the Income Tax Ordinance, 2001. Filers on ATL enjoy 50% lower withholding tax rates on banking, property, vehicle registrations, and contracts.",
                "statutory_reference": "Section 181A & Tenth Schedule, Income Tax Ordinance 2001",
                "practical_example": "A person buying a car on ATL pays 1% advance tax, whereas a non-ATL person pays up to 3% to 4%.",
                "related_terms": "Late Filer, 10th Schedule Surcharge, Surcharge for Non-Filer"
            },
            {
                "id": "dict-2",
                "term": "Withholding Agent",
                "urdu_title": "ودہولڈنگ ایجنٹ",
                "category": "Taxation",
                "definition": "Any person or entity statutorily obligated under Division II, III, or IV of Part V of Chapter X to deduct or collect advance income tax at source from payments made to suppliers, service providers, landlords, or employees and deposit it with the State Bank / FBR.",
                "statutory_reference": "Section 153, 149, 155, 161, Income Tax Ordinance 2001",
                "practical_example": "A corporate entity paying a vendor invoice of PKR 500,000 must deduct 5.5% (goods) or 11% (services) before remitting the balance.",
                "related_terms": "Section 161 Assessment, e-Payment CPR, Monthly WHT Statement"
            },
            {
                "id": "dict-3",
                "term": "Best Judgment Assessment",
                "urdu_title": "بہترین فیصلے کا ٹیکس تخمینہ",
                "category": "Litigation",
                "definition": "An assessment framed by a Commissioner Inland Revenue when a taxpayer fails to file a return, comply with a statutory notice under Section 114/116, or furnish books of accounts under Section 177. The officer estimates taxable income based on available evidence and market nexus.",
                "statutory_reference": "Section 121, Income Tax Ordinance 2001 & Section 11(2), Sales Tax Act 1990",
                "practical_example": "If an importer fails to explain declared sales, the CIR assesses tax based on industry gross margin averages.",
                "related_terms": "Section 122 Amendment of Assessment, Show Cause Notice, ATIR Precedent"
            },
            {
                "id": "dict-4",
                "term": "Normal Tax Regime (NTR) vs Final Tax Regime (FTR)",
                "urdu_title": "نارمل بمقابلہ فائنل ٹیکس رجیم",
                "category": "Taxation",
                "definition": "Under NTR, tax is computed on net taxable income (gross revenue minus allowable business deductions). Under FTR (or Minimum Tax Regime MTR), the tax deducted at source is treated as full and final discharge of tax liability with zero expense deductions allowed.",
                "statutory_reference": "Section 4, 153, 154 (Exports), 169, Income Tax Ordinance 2001",
                "practical_example": "Commercial export proceeds are taxed at 1% under FTR, whereas manufacturing exports are governed under NTR with full profit and loss filing.",
                "related_terms": "Section 113, Minimum Tax, Tax Credit Sec 65"
            },
            {
                "id": "dict-5",
                "term": "Blacklisting & Suspension of STRN",
                "urdu_title": "سیلز ٹیکس رجسٹریشن معطلی و بلیک لسٹنگ",
                "category": "Customs",
                "definition": "An administrative order issued under Section 21 of the Sales Tax Act, 1990 read with Rule 12 of Sales Tax Rules, 2006 where a registered person is suspected of issuing flying invoices or fraudulent input tax claims.",
                "statutory_reference": "Section 21, Sales Tax Act 1990 & Rule 12, Sales Tax Rules 2006",
                "practical_example": "Once an entity is suspended, buyers cannot adjust input tax against invoices issued by such entity on Iris portal.",
                "related_terms": "Fake Invoices, Flying Invoices, Post-Registration Audit"
            },
            {
                "id": "dict-6",
                "term": "Alternative Corporate Tax (ACT)",
                "urdu_title": "متبادل کارپوریٹ ٹیکس",
                "category": "Corporate",
                "definition": "Tax computed at 17% on the accounting profit of a company adjusted for exempt income and certain statutory credits under Section 113C. Payable if ACT exceeds corporate tax payable under normal provisions.",
                "statutory_reference": "Section 113C, Income Tax Ordinance 2001",
                "practical_example": "A company claiming accelerated depreciation resulting in nil normal tax must still pay 17% ACT on its audited accounting profit.",
                "related_terms": "Section 113 Turnover Tax, Corporate Tax Slabs, Deferred Tax"
            }
        ]

        if search:
            q = search.lower()
            dictionary_data = [
                d for d in dictionary_data 
                if q in d["term"].lower() or q in d["definition"].lower() or q in d["urdu_title"].lower() or q in d["statutory_reference"].lower()
            ]

        return dictionary_data

    return records

# ==========================================
# 3. Custom Tariff & HS Codes Lookup
# GET /api/portal/custom-tariff?hscode={code}
# ==========================================
@router.get("/custom-tariff")
async def get_custom_tariff(
    hscode: Optional[str] = Query(None, description="HS Code e.g. 8517.13.00, 8471.30.10, 8703.22.90"),
    chapter: Optional[int] = Query(None, description="Custom Tariff Chapter number (1-99)"),
    search: Optional[str] = Query(None, description="Product description keyword e.g. laptop, mobile, textile, solar"),
    db: AsyncSession = Depends(get_db)
):
    """
    Pakistan Customs Tariff (First Schedule to Customs Act, 1969) HS Code search engine.
    Calculates Custom Duty (CD), Regulatory Duty (RD), Additional Custom Duty (ACD), Sales Tax (ST), and Advance WHT.
    """
    stmt = select(CustomTariff)
    if hscode:
        stmt = stmt.where(CustomTariff.hs_code.ilike(f"%{hscode}%"))
    if chapter:
        stmt = stmt.where(CustomTariff.chapter_number == chapter)
    if search:
        search_filter = f"%{search}%"
        stmt = stmt.where(
            (CustomTariff.description.ilike(search_filter)) |
            (CustomTariff.hs_code.ilike(search_filter))
        )
    
    result = await db.execute(stmt)
    records = result.scalars().all()

    if not records:
        # Fallback rich Pakistan Customs Tariff Matrix
        tariffs = [
            {
                "id": "tariff-8517-13",
                "hs_code": "8517.13.00",
                "chapter_number": 85,
                "description": "Smartphones and cellular telecommunications handsets (CKD / CBU)",
                "custom_duty_rate": "PKR 5,000 / unit fixed + 11% ad valorem",
                "regulatory_duty": "PKR 3,000 - 15,000 based on C&F Tier",
                "additional_custom_duty": "2%",
                "sales_tax_rate": "18% (Tier-1) or 25% on luxury handsets > $500",
                "advance_income_tax_wht": "5.5% (Filer) / 11% (Non-Filer) under Sec 148",
                "import_restriction": "PTA Type Approval & COC Required"
            },
            {
                "id": "tariff-8471-30",
                "hs_code": "8471.30.10",
                "chapter_number": 84,
                "description": "Portable automatic data processing machines (Laptops, Notebooks & Tablets)",
                "custom_duty_rate": "0% (Concessionary)",
                "regulatory_duty": "0%",
                "additional_custom_duty": "2%",
                "sales_tax_rate": "18%",
                "advance_income_tax_wht": "1% (Filer) / 2% (Non-Filer) for capital IT goods",
                "import_restriction": "Free / Commercial Import Permitted"
            },
            {
                "id": "tariff-8541-43",
                "hs_code": "8541.43.00",
                "chapter_number": 85,
                "description": "Photovoltaic solar cells, assembled in modules or made up into panels",
                "custom_duty_rate": "0% (Fifth Schedule Concession)",
                "regulatory_duty": "0%",
                "additional_custom_duty": "0%",
                "sales_tax_rate": "0% / Exempt under Sixth Schedule Table-1",
                "advance_income_tax_wht": "0% under Section 148 exemption clause",
                "import_restriction": "Certified under IEC/TUV standards"
            },
            {
                "id": "tariff-8703-22",
                "hs_code": "8703.22.90",
                "chapter_number": 87,
                "description": "Motor cars and other motor vehicles principally designed for the transport of persons (>1000cc up to 1300cc)",
                "custom_duty_rate": "50%",
                "regulatory_duty": "15%",
                "additional_custom_duty": "4%",
                "sales_tax_rate": "18%",
                "advance_income_tax_wht": "6% (Filer) / 12% (Non-Filer) under Section 148",
                "import_restriction": "Import Policy Order Baggage / Gift / Transfer of Residence Scheme"
            },
            {
                "id": "tariff-3004-90",
                "hs_code": "3004.90.99",
                "chapter_number": 30,
                "description": "Medicaments consisting of mixed or unmixed products for therapeutic uses (Finished Pharma)",
                "custom_duty_rate": "11%",
                "regulatory_duty": "0%",
                "additional_custom_duty": "2%",
                "sales_tax_rate": "1% (Reduced rate under Eighth Schedule)",
                "advance_income_tax_wht": "2% (Filer) / 4% (Non-Filer)",
                "import_restriction": "DRAP Registration / Enlistment Required"
            }
        ]

        if hscode:
            tariffs = [t for t in tariffs if hscode in t["hs_code"]]
        if search:
            q = search.lower()
            tariffs = [t for t in tariffs if q in t["description"].lower() or q in t["hs_code"].lower()]
        
        return tariffs

    return records

# ==========================================
# 4. Tax Rates & Slabs Matrices
# GET /api/portal/tax-rates
# ==========================================
@router.get("/tax-rates")
async def get_tax_rates_matrix(
    tax_year: str = Query("2025-2026", description="Tax Year e.g. 2024-2025, 2025-2026")
):
    """
    Get official Pakistani tax slab tables for Salary, Business/AOP, Corporate Tax,
    Withholding Tax (WHT) rates under Section 153/236, and Sales Tax schedules.
    """
    return {
        "tax_year": tax_year,
        "enacted_by": "Finance Act 2025 & Presidential Ordinances",
        "salaried_slabs": [
            {
                "slab_no": 1,
                "taxable_income_range": "Up to PKR 600,000",
                "min_income": 0,
                "max_income": 600000,
                "rate": "0%",
                "fixed_amount": 0,
                "tax_formula": "Nil"
            },
            {
                "slab_no": 2,
                "taxable_income_range": "PKR 600,001 to PKR 1,200,000",
                "min_income": 600001,
                "max_income": 1200000,
                "rate": "5%",
                "fixed_amount": 0,
                "tax_formula": "5% of the amount exceeding PKR 600,000"
            },
            {
                "slab_no": 3,
                "taxable_income_range": "PKR 1,200,001 to PKR 2,200,000",
                "min_income": 1200001,
                "max_income": 2200000,
                "rate": "15%",
                "fixed_amount": 30000,
                "tax_formula": "PKR 30,000 + 15% of the amount exceeding PKR 1,200,000"
            },
            {
                "slab_no": 4,
                "taxable_income_range": "PKR 2,200,001 to PKR 3,200,000",
                "min_income": 2200001,
                "max_income": 3200000,
                "rate": "25%",
                "fixed_amount": 180000,
                "tax_formula": "PKR 180,000 + 25% of the amount exceeding PKR 2,200,000"
            },
            {
                "slab_no": 5,
                "taxable_income_range": "PKR 3,200,001 to PKR 4,100,000",
                "min_income": 3200001,
                "max_income": 4100000,
                "rate": "30%",
                "fixed_amount": 430000,
                "tax_formula": "PKR 430,000 + 30% of the amount exceeding PKR 3,200,000"
            },
            {
                "slab_no": 6,
                "taxable_income_range": "Exceeding PKR 4,100,000",
                "min_income": 4100001,
                "max_income": 999999999,
                "rate": "35%",
                "fixed_amount": 700000,
                "tax_formula": "PKR 700,000 + 35% of the amount exceeding PKR 4,100,000 + 10% Surcharge on High Earners (>PKR 10M)"
            }
        ],
        "business_aop_slabs": [
            {
                "slab_no": 1,
                "range": "Up to PKR 600,000",
                "rate": "0%",
                "tax_formula": "Nil"
            },
            {
                "slab_no": 2,
                "range": "PKR 600,001 to PKR 800,000",
                "rate": "15%",
                "tax_formula": "15% of the amount exceeding PKR 600,000"
            },
            {
                "slab_no": 3,
                "range": "PKR 800,001 to PKR 1,200,000",
                "rate": "20%",
                "tax_formula": "PKR 30,000 + 20% of amount exceeding PKR 800,000"
            },
            {
                "slab_no": 4,
                "range": "PKR 1,200,001 to PKR 2,400,000",
                "rate": "30%",
                "tax_formula": "PKR 110,000 + 30% of amount exceeding PKR 1,200,000"
            },
            {
                "slab_no": 5,
                "range": "PKR 2,400,001 to PKR 3,000,000",
                "rate": "40%",
                "tax_formula": "PKR 470,000 + 40% of amount exceeding PKR 2,400,000"
            },
            {
                "slab_no": 6,
                "range": "Exceeding PKR 3,000,000",
                "rate": "45%",
                "tax_formula": "PKR 710,000 + 45% of amount exceeding PKR 3,000,000"
            }
        ],
        "corporate_rates": {
            "standard_company": "29%",
            "small_company": "20%",
            "banking_company": "39%",
            "super_tax_sec4c": "1% to 10% based on high profitability brackets (> PKR 150 Million)",
            "minimum_tax_turnover_sec113": "1.25% (0.5% for listed dealers / Tier-1)"
        },
        "withholding_tax_key_sections": [
            {
                "section": "Section 153(1)(a) - Supply of Goods",
                "filer_rate": "5.5% (Company) / 6.0% (Individual/AOP)",
                "non_filer_rate": "11% (Company) / 12% (Individual/AOP)",
                "nature": "Minimum Tax / Adjustable"
            },
            {
                "section": "Section 153(1)(b) - Provision of Services",
                "filer_rate": "9.0% (Company) / 11.0% (Individual/AOP)",
                "non_filer_rate": "18% (Company) / 22% (Individual/AOP)",
                "nature": "Minimum Tax"
            },
            {
                "section": "Section 153(1)(c) - Execution of Contracts",
                "filer_rate": "8.0% (Company) / 8.5% (Individual/AOP)",
                "non_filer_rate": "16% (Company) / 17% (Individual/AOP)",
                "nature": "Minimum Tax"
            },
            {
                "section": "Section 151 - Profit on Debt (Bank Interest)",
                "filer_rate": "15%",
                "non_filer_rate": "30%",
                "nature": "Final Tax Regime (FTR)"
            },
            {
                "section": "Section 236C - Advance Tax on Sale/Transfer of Immovable Property",
                "filer_rate": "3%",
                "non_filer_rate": "10.5% to 15% (Tiered)",
                "nature": "Adjustable against capital gains"
            },
            {
                "section": "Section 236K - Advance Tax on Purchase of Immovable Property",
                "filer_rate": "3%",
                "non_filer_rate": "12% to 20% (Late filer surcharge)",
                "nature": "Adjustable"
            }
        ],
        "sales_tax_schedules": {
            "standard_rate": "18%",
            "luxury_goods_rate": "25%",
            "third_schedule_printed_retail_price": "Tax levied on MRP basis (e.g. beverages, detergents, juices)",
            "fifth_schedule_zero_rated": "0% on local supplies to diplomats, Gwadar Free Zone, and designated exporters",
            "sixth_schedule_exempt": "Table 1 (Import) & Table 2 (Local) basic foodstuffs, unprocessed agriculture & medicines",
            "eighth_schedule_reduced_rates": "1% to 10% on fertilizer, seeds, and specialized industrial machinery"
        }
    }

# ==========================================
# 5. Tax News & FBR Notifications Feed
# GET /api/portal/news
# ==========================================
@router.get("/news")
async def get_tax_news(
    category: Optional[str] = Query(None, description="FBR Policy, High Court, Circular, Finance Act"),
    limit: int = Query(20, ge=1, le=100),
    db: AsyncSession = Depends(get_db)
):
    """
    Retrieve real-time and archived Pakistani tax news, FBR notifications, SRO updates, and appellate legal alerts.
    """
    stmt = select(TaxNews).order_by(TaxNews.published_date.desc()).limit(limit)
    if category:
        stmt = stmt.where(TaxNews.category.ilike(f"%{category}%"))
    
    result = await db.execute(stmt)
    records = result.scalars().all()

    if not records:
        return [
            {
                "id": "news-1",
                "title": "FBR Mandates Digital Invoicing System (SWAPS & S.R.O. 350) for Fast-Moving Consumer Goods",
                "category": "FBR Policy",
                "summary": "Federal Board of Revenue enforces nationwide integration of electronic sales tax invoicing. Registered tier-1 distributors must validate supplier filing status before claiming input tax.",
                "source": "FBR Headquarters, Islamabad",
                "published_date": "2026-08-20",
                "is_breaking": 1,
                "pdf_url": "https://fbr.gov.pk/notifications/sro350-update.pdf"
            },
            {
                "id": "news-2",
                "title": "Supreme Court Upholds Super Tax under Section 4C for Tax Years 2022-2025",
                "category": "High Court Ruling",
                "summary": "The Supreme Court of Pakistan delivers landmark verdict confirming the constitutional validity of Section 4C Super Tax on high-earning corporate entities with retrospective effect.",
                "source": "Supreme Court of Pakistan, Appellate Bench",
                "published_date": "2026-08-15",
                "is_breaking": 0,
                "pdf_url": "https://supremecourt.gov.pk/judgments/2026/super-tax-full-bench.pdf"
            },
            {
                "id": "news-3",
                "title": "Sales Tax Return Filing Deadline for Tax Period July 2026 Extended to 28th August",
                "category": "Circular",
                "summary": "In exercise of powers under Section 74 of Sales Tax Act, FBR extends date for Annexure-C and payment challan generation to facilitate trade bodies and tax bars.",
                "source": "FBR Inland Revenue Operations",
                "published_date": "2026-08-12",
                "is_breaking": 1,
                "pdf_url": "https://fbr.gov.pk/circulars/extension-july-2026.pdf"
            },
            {
                "id": "news-4",
                "title": "Federal Government Clarifies Cross-Border IT Export Tax Exemptions under Section 65F / PSEB Registration",
                "category": "Finance Bill",
                "summary": "100% tax credit on export of software, IT-enabled services (ITeS), and freelance remittances reaffirmed provided 80% proceeds are repatriated via State Bank banking channels.",
                "source": "Ministry of Finance & Revenue",
                "published_date": "2026-08-05",
                "is_breaking": 0,
                "pdf_url": "https://finance.gov.pk/it-export-tax-policy-2026.pdf"
            }
        ]

    return records

# ==========================================
# 6. Finance Acts Archive
# GET /api/portal/finance-acts
# ==========================================
@router.get("/finance-acts")
async def get_finance_acts_archive(
    year: Optional[str] = Query(None, description="2024, 2025, 2026")
):
    """
    Year-wise documentation of Pakistan Finance Acts, enactments, and substantive amendments.
    """
    acts = [
        {
            "fiscal_year": "2025-2026",
            "act_name": "Finance Act, 2025",
            "enactment_date": "30th June 2025",
            "key_amendments_summary": "Comprehensive overhaul of salary tax slabs, introduction of digital invoicing under SRO 350(I)/2024, enhanced WHT rates on non-filers for banking transactions and real estate transfers.",
            "income_tax_changes": "1. Top salaried slab restored at 35% + 10% surcharge on annual income exceeding PKR 10M.\n2. WHT on sale of property under Section 236C escalated to 15% for late/non-filers.\n3. Mandatory balance sheet disclosure for all individuals having business turnover > PKR 50M.",
            "sales_tax_changes": "1. Standard sales tax rate retained at 18%, luxury item levy at 25%.\n2. Expansion of Section 8(1)(m) disallowing input tax on non-compliant e-invoicing.\n3. Real-time integration required for all petroleum and FMCG distribution chains.",
            "customs_changes": "1. Zero-duty incentives sustained for solar PV and renewable energy generation equipment.\n2. Rationalization of Additional Custom Duty (ACD) on raw materials under Chapter 84 and 85."
        },
        {
            "fiscal_year": "2024-2025",
            "act_name": "Finance Act, 2024",
            "enactment_date": "30th June 2024",
            "key_amendments_summary": "Introduction of Section 4C Super Tax tiers up to 10%, progressive capital gains tax on securities and immoveable properties, integration of Point of Sale (POS) tier-1 retailers.",
            "income_tax_changes": "1. Introduction of 15% flat CGT on immovable property acquired after July 1, 2024.\n2. Strict disallowance under Section 21(l) for cash payments exceeding PKR 250,000.\n3. Increased penalty under Section 182 for failure to file wealth statement.",
            "sales_tax_changes": "1. Increase of standard sales tax rate from 17% to 18%.\n2. Streamlined refund processing under FASTER system within 72 hours for textile exports.",
            "customs_changes": "1. Regulatory duty imposition on luxury CBU vehicles up to 100%.\n2. Tariff rationalization on steel and iron imports under Chapter 72."
        }
    ]

    if year:
        acts = [a for a in acts if year in a["fiscal_year"] or year in a["act_name"]]
    
    return acts

# ==========================================
# 7. Tax Returns Assistant (Iris Guide)
# GET /api/portal/returns-guide
# ==========================================
@router.get("/returns-guide")
async def get_returns_filing_guide():
    """
    Step-by-step assistant for preparing and filing annual income tax returns on FBR Iris 2.0 portal.
    """
    return {
        "portal_name": "FBR Iris 2.0 (iris.fbr.gov.pk)",
        "applicable_forms": [
            "Form 114(1) - Annual Return of Income for Salaried Individual",
            "Form 114(1) - Annual Return of Income for Business / AOP / Company",
            "Form 116 - Wealth Statement & Reconciliation of Net Wealth",
            "Annexure-C - Monthly Sales Tax Return on Domestic Supplies"
        ],
        "step_by_step_workflow": [
            {
                "step": 1,
                "title": "Log in to Iris 2.0 & Create Draft Return",
                "description": "Log in using your CNIC/NTN and password. Click 'Declaration' > 'Salary / Business Return' > Select current Tax Year.",
                "tips": "Ensure your Active Taxpayer List (ATL) status is verified beforehand."
            },
            {
                "step": 2,
                "title": "Enter Income from Salary / Business",
                "description": "Populate gross salary received, medical allowance exemptions under Clause 139 Part I of Second Schedule, and provident fund interest.",
                "tips": "Obtain annual tax deduction certificate (Section 149) from employer."
            },
            {
                "step": 3,
                "title": "Populate Adjustable & Final Withholding Taxes",
                "description": "Go to 'Adjustable Tax' tab. Enter advance tax deducted on Electricity Bills (Sec 235), Motor Vehicles (Sec 231B), Cash/Banking, Property, and Mobile phone cards.",
                "tips": "Download tax certificates directly from your cellular telecom app (Jazz/Telenor/Zong) and bank statements."
            },
            {
                "step": 4,
                "title": "Complete Wealth Statement (Section 116)",
                "description": "List all domestic assets (agricultural land, residential plots, bank accounts, motor vehicles, gold, cash in hand) at cost. Declare personal household expenses.",
                "tips": "Wealth reconciliation must equal zero. Unreconciled amount = Current Year Wealth minus Previous Year Wealth minus Inflows plus Outflows."
            },
            {
                "step": 5,
                "title": "Calculate, Verify & Submit with 4-Digit Iris PIN",
                "description": "Click 'Calculate' twice to ensure all credits and taxes reconcile. Review final tax payable or refund claimable. Enter your 4-digit secret Iris PIN and click 'Submit'.",
                "tips": "Download e-Acknowledgement CPR receipt immediately after submission."
            }
        ]
    }
