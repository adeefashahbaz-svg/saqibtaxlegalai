export interface IncomeTaxSection {
  id: string;
  sectionCode: string; // e.g. "Section 18", "Section 37(1A)", "Section 147"
  title: string;
  chapterPartId: string;
  headOfIncome?: "Business" | "Capital Gains" | "Other Sources" | "Exemptions" | "Losses" | "Allowances & Credits" | "Procedural" | "Withholding";
  summary: string;
  keyProvisions: string[];
  statutoryRatesOrLimits?: string;
  fbrPracticeAndDefense: string;
  penaltiesOrConsequences?: string;
  crossReferences: string[];
  fbrCircularOrPrecedent?: string;
  isWithholdingSection?: boolean;
  withholdingRates?: {
    filerRate: string;
    nonFilerRate: string;
    description: string;
  };
}

export interface IncomeTaxChapterPart {
  id: string;
  partNumber: string;
  title: string;
  sectionsRange: string;
  badge: string;
  badgeColor: string;
  accentColor: string;
  description: string;
  keyHighlights: string[];
  sections: IncomeTaxSection[];
}

export const INCOME_TAX_CHAPTERS_PARTS: IncomeTaxChapterPart[] = [
  // =========================================================================
  // 1. PART IV: INCOME FROM BUSINESS (SECTIONS 18 - 36)
  // =========================================================================
  {
    id: "part-iv-business",
    partNumber: "Part IV",
    title: "Income from Business",
    sectionsRange: "Sections 18 - 36",
    badge: "Sec 18 - 36",
    badgeColor: "bg-emerald-950/90 text-emerald-300 border border-emerald-600",
    accentColor: "emerald",
    description: "Core business charging principles, allowable deductions, inadmissibility rules (cash expense & salary caps), depreciation slabs under the Third Schedule, initial allowances, and accounting methods.",
    keyHighlights: [
      "Sec 18: Charging mechanism for trade, commerce, manufacturing, and profession",
      "Sec 20: General deduction rule ('wholly and exclusively for business purposes')",
      "Sec 21: Inadmissible deductions — cash salary > Rs 32k/mo, cash expenses > Rs 250k, non-WHT payments",
      "Sec 22: Depreciation — Third Schedule rates (Building 10%, Plant 15%, Computer 30%) with Rs 7.5M passenger vehicle limit",
      "Sec 23: Initial Allowance (25% first-year tax deduction on eligible plant & machinery)",
      "Sec 32-36: Method of Accounting (Cash vs Accrual), Stock-in-trade valuation (lower of cost or NRV), & Long-term contracts"
    ],
    sections: [
      {
        id: "sec-18",
        sectionCode: "Section 18",
        title: "Income from Business (Scope & Charging Mechanism)",
        chapterPartId: "part-iv-business",
        headOfIncome: "Business",
        summary: "Defines taxable business income including profits from any business carried on during the tax year, income from hire of tangible assets, fair market value of any benefit or perquisite derived from past, present, or prospective business relationships, and management fees.",
        keyProvisions: [
          "18(1)(a): Profits and gains of any business carried on by a person at any time in the year.",
          "18(1)(b): Any income derived by any trade, professional or similar association from services rendered to members.",
          "18(1)(c): Income from hire or lease of tangible movable assets (machinery, vehicles, plant).",
          "18(1)(d): Fair market value of any benefit or perquisite derived from business relationships.",
          "18(2): Speculation business to be treated as a distinct and separate business from any other business (Sec 19)."
        ],
        statutoryRatesOrLimits: "Normal Corporate Tax: 29% | Non-Corporate / AOP: Progressive slabs 0% to 35% | Super Tax: 1% to 10% under Sec 4C.",
        fbrPracticeAndDefense: "Revenue officers often attempt to reclassify business receipts as 'Other Sources' under Section 39 to disallow legitimate business deductions. Substantiate active commercial enterprise by demonstrating physical operations, employees, and trade contracts.",
        penaltiesOrConsequences: "Suppression of gross receipts attracts Section 111 addition and Section 182(1) Entry 11 100% concealment penalty.",
        crossReferences: ["Section 19 (Speculation Business)", "Section 20 (Deductions)", "Section 21 (Inadmissible)", "Section 4C (Super Tax)"],
        fbrCircularOrPrecedent: "2022 PTD 1420 (Supreme Court: Continuity and commercial nexus define business income vs passive investments)."
      },
      {
        id: "sec-20",
        sectionCode: "Section 20",
        title: "Deductions in Computing Income from Business",
        chapterPartId: "part-iv-business",
        headOfIncome: "Business",
        summary: "The foundational deduction provision allowing any expenditure incurred by the person in the tax year to the extent that it is incurred wholly and exclusively for the purposes of business.",
        keyProvisions: [
          "20(1): General test: Expenditure must be incurred wholly and exclusively for business purposes.",
          "20(2): Specific deductions: Rent, repairs, insurance, employee compensation, traveling, utility expenses, legal and audit fees.",
          "20(3): Apportionment rule: Expenditure incurred for multiple purposes (e.g. dual personal & commercial car/premises) apportioned pro-rata.",
          "20(4): Animal and livestock mortality and replacement costs incurred in commercial farming."
        ],
        statutoryRatesOrLimits: "100% deduction permitted against gross business revenue if supported by verifiable invoices and banking channels.",
        fbrPracticeAndDefense: "Ensure all business vouchers maintain complete vendor NTN, description, and crossed banking instrument evidence. In audits under Section 177, officers frequently issue ad-hoc 5%-10% disallowances for 'unverifiable vouchers'; maintain strict third-party audit trails to rebut arbitrary disallowances.",
        penaltiesOrConsequences: "Disallowed expenses are added back directly to net taxable profit, increasing tax demand under Section 122.",
        crossReferences: ["Section 21 (Restrictions on Deductions)", "Section 174 (Records)", "Rule 25 (Expense Apportionment)"],
        fbrCircularOrPrecedent: "2021 SCMR 980 (Supreme Court: Revenue officer cannot sit in the armchair of the businessman to determine business necessity of expenditure)."
      },
      {
        id: "sec-21",
        sectionCode: "Section 21",
        title: "Deductions Not Allowed (Statutory Inadmissibility Table)",
        chapterPartId: "part-iv-business",
        headOfIncome: "Business",
        summary: "Comprehensive catalogue of expenses explicitly disallowed in computing taxable business profits, including non-withheld payments, cash salary exceeding Rs 32,000/month, single cash transactions exceeding Rs 250,000, and non-SWAPS payments.",
        keyProvisions: [
          "21(c): Payment from which withholding tax was deductible but not deducted or not deposited in treasury.",
          "21(l): Any single transaction exceeding PKR 250,000 paid in cash (must be paid via crossed cheque, banking instrument, or online digital channel).",
          "21(m): Salary exceeding PKR 32,000 per month paid in cash (must be transferred directly to employee's bank account).",
          "21(n): Commission or brokerage paid to a person not appearing in the Active Taxpayers List (ATL).",
          "21(p): Payment of utility bills exceeding notified thresholds paid via cash instead of direct banking channels.",
          "21(q): Any payment made by a notified SWAPS agent outside the Synchronized Withholding Administration System."
        ],
        statutoryRatesOrLimits: "Disallowance is 100% of the expenditure incurred, added directly back to taxable business profits.",
        fbrPracticeAndDefense: "Crucial compliance check before tax return submission: Run a payroll audit to ensure zero cash salaries above Rs 32,000 and obtain withholding tax CPR copies for all Section 153 supplier payments to prevent catastrophic Section 21(c) add-backs.",
        penaltiesOrConsequences: "Complete disallowance of legitimate purchases, turning a real-world accounting loss into a massive taxable profit.",
        crossReferences: ["Section 153 (WHT on Goods/Services)", "Section 161 (Default)", "Section 164A (SWAPS)", "Section 174"],
        fbrCircularOrPrecedent: "2023 PTD 1650 (Lahore High Court: Proof of actual tax payment by recipient vendor mitigates Section 21(c) disallowance)."
      },
      {
        id: "sec-22",
        sectionCode: "Section 22",
        title: "Depreciation of Tangible Business Assets & Third Schedule Slabs",
        chapterPartId: "part-iv-business",
        headOfIncome: "Business",
        summary: "Provides statutory depreciation deduction on depreciable assets (buildings, machinery, furniture, vehicles, computers) owned and used by the person in business, computed on Written Down Value (WDV) at rates specified in Part I of the Third Schedule.",
        keyProvisions: [
          "22(1): Depreciation allowed on depreciable assets used in business during the tax year.",
          "22(5): Written Down Value (WDV) method: Cost of asset less cumulative tax depreciation allowed in previous years.",
          "22(8): Passenger transport vehicle (not plying for hire): Depreciable cost ceiling capped at PKR 7,500,000 (excess cost ignored for tax).",
          "22(13): Disposal of depreciable asset: Consideration received exceeding WDV treated as business income under Sec 22(8C); shortfall allowed as tax deduction."
        ],
        statutoryRatesOrLimits: "Third Schedule Rates: Buildings (10%), Furniture & Fittings (15%), Plant & Machinery (15%), Motor Vehicles (15%), Computer Hardware & IT Peripherals (30%), Technical Software (30%).",
        fbrPracticeAndDefense: "Accounting depreciation under IFRS/IAS is disallowed under Section 21 and replaced with Third Schedule tax depreciation in the tax return reconciliation. Maintain a dedicated Tax Fixed Asset Register.",
        penaltiesOrConsequences: "Incorrect depreciation calculation leads to assessment amendment under Section 122 and default surcharge under Section 205.",
        crossReferences: ["Section 23 (Initial Allowance)", "Section 24 (Amortization)", "Third Schedule Part I", "Rule 29"],
        fbrCircularOrPrecedent: "Income Tax Rules 2002 Rule 29 & Third Schedule Valuation Guidelines."
      },
      {
        id: "sec-23",
        sectionCode: "Section 23",
        title: "Initial Allowance on Eligible Plant & Machinery (25%)",
        chapterPartId: "part-iv-business",
        headOfIncome: "Business",
        summary: "Accelerated first-year tax incentive granting a 25% initial deduction on the cost of eligible plant and machinery placed in service in Pakistan for the first time in the tax year.",
        keyProvisions: [
          "23(1): 25% initial allowance deductible in the tax year in which eligible asset is first put to commercial use.",
          "23(5): Eligible depreciable asset excludes: Buildings, furniture, secondhand machinery previously used in Pakistan, and road transport vehicles (unless plying for hire).",
          "23(4): Initial allowance reduces the tax cost basis before applying normal Section 22 depreciation."
        ],
        statutoryRatesOrLimits: "25% of the total acquisition and installation cost of new industrial plant & equipment.",
        fbrPracticeAndDefense: "Keep import GDs (Goods Declarations), bill of lading, and installation commissioning certificates ready. Used plant imported from abroad qualifies if not previously operated inside Pakistan.",
        penaltiesOrConsequences: "Denial of initial allowance increases immediate first-year tax liability.",
        crossReferences: ["Section 22 (Normal Depreciation)", "Section 23A (Accelerated Depreciation)", "Third Schedule Part II"],
        fbrCircularOrPrecedent: "FBR Industrial Investment Incentive Circular 02/2021."
      },
      {
        id: "sec-24",
        sectionCode: "Section 24",
        title: "Intangibles & Amortization Rules (10-Year Straight Line)",
        chapterPartId: "part-iv-business",
        headOfIncome: "Business",
        summary: "Deduction for amortization of intangible assets (patents, copyrights, trademarks, software licenses, franchises) having a normal useful life exceeding one year, amortized on a straight-line basis.",
        keyProvisions: [
          "24(1): Amortization deduction on intangibles wholly or partly used in deriving business income.",
          "24(2): Straight-line formula: Cost of intangible divided by useful life in years.",
          "24(4): Deemed useful life: If intangible has no ascertainable useful life, useful life is statutorily treated as 10 years (10% per annum).",
          "24(7): Self-generated goodwill or internal trade secrets do not qualify for amortization."
        ],
        statutoryRatesOrLimits: "Straight line over actual contractual life, or 10% per annum for undefined useful life intangibles.",
        fbrPracticeAndDefense: "Document franchise agreements, software license terms, and purchase consideration allocation in M&A transactions to substantiate intangible tax amortizations.",
        penaltiesOrConsequences: "Excessive amortization claims disallowed under Section 122.",
        crossReferences: ["Section 20 (Deductions)", "Section 22 (Depreciation)"],
        fbrCircularOrPrecedent: "2020 PTD 1100 (ATIR: Enterprise software license customization costs qualify as intangible under Sec 24)."
      },
      {
        id: "sec-28",
        sectionCode: "Section 28",
        title: "Bad Debts & Write-off Conditions",
        chapterPartId: "part-iv-business",
        headOfIncome: "Business",
        summary: "Permits deduction for bad debts in business provided the amount was previously included in taxable business income, was written off in the accounts, and reasonable legal steps have been taken to pursue recovery.",
        keyProvisions: [
          "28(1)(a): Amount must have been previously included in the person's taxable business income.",
          "28(1)(b): Debt must be written off in the accounts of the person in the tax year.",
          "28(1)(c): There must be reasonable grounds for believing the debt is irrecoverable.",
          "28(2): Subsequent recovery of previously allowed bad debt treated as taxable business income in the year of recovery."
        ],
        statutoryRatesOrLimits: "100% of written off uncollectible receivables.",
        fbrPracticeAndDefense: "FBR audit officers routinely reject bad debt claims demanding court decrees; establish reasonable grounds via legal notices served, bounced cheque notices under 489F, or debtor bankruptcy filings.",
        penaltiesOrConsequences: "Disallowance of write-off results in artificial profit inflation.",
        crossReferences: ["Section 20", "Section 70 (Recovery of Tax)"],
        fbrCircularOrPrecedent: "2021 SCMR 1150 (Supreme Court: Exhausting all recovery procedures without formal decree suffices for Section 28 write-off)."
      },
      {
        id: "sec-32-36",
        sectionCode: "Sections 32 - 36",
        title: "Tax Accounting, Trading Stock (NRV) & Long-Term Contracts",
        chapterPartId: "part-iv-business",
        headOfIncome: "Business",
        summary: "Mandates accounting methods (cash basis for individuals/professionals; accrual basis for companies), valuation of trading stock at lower of cost or Net Realizable Value (NRV), and percentage-of-completion accounting for long-term construction contracts.",
        keyProvisions: [
          "Sec 32: Accounting method: Companies MUST account on accrual basis; individuals may choose cash or accrual.",
          "Sec 34: Accrual-basis accounting: Income earned when right to receive arises; expense incurred when obligation to pay is established.",
          "Sec 35: Trading Stock: Valued at lower of cost or net realizable value (NRV) using FIFO or weighted average cost method (LIFO prohibited).",
          "Sec 36: Long-Term Contracts: Taxable profit computed using Percentage of Completion method based on certified architect/engineer milestones."
        ],
        statutoryRatesOrLimits: "Mandatory statutory accounting standards; changes in accounting method require prior Commissioner approval under Sec 32(3).",
        fbrPracticeAndDefense: "Construction contractors and software solution firms must align project billing milestones with audited percentage of completion to prevent distortion in taxable income across assessment years.",
        penaltiesOrConsequences: "Arbitrary valuation of closing stock leads to gross profit margin enhancements in audits under Section 122.",
        crossReferences: ["Section 18", "Section 20", "Section 174", "IAS 2 (Inventories)", "IFRS 15 (Revenue)"],
        fbrCircularOrPrecedent: "FBR Standard Tax Accounting Order 01/2020 on Long-Term Contract Margin Computation."
      }
    ]
  },

  // =========================================================================
  // 2. PART V: CAPITAL GAINS (SECTIONS 37 - 38)
  // =========================================================================
  {
    id: "part-v-capital-gains",
    partNumber: "Part V",
    title: "Capital Gains",
    sectionsRange: "Sections 37 - 38",
    badge: "Sec 37 - 38",
    badgeColor: "bg-blue-950/90 text-blue-300 border border-blue-600",
    accentColor: "blue",
    description: "Taxation of capital gains on disposal of capital assets, immovable property holding period slabs under Section 37(1A), listed securities taxation under Section 37A (NCCPL), and capital loss set-off rules.",
    keyHighlights: [
      "Sec 37: Computation of capital gain (Consideration received less cost of acquisition & incidental disposal expenses)",
      "Sec 37(1A): Immovable property tax slabs (Open plots vs constructed properties vs flats) with holding period scaling",
      "Sec 37A: Capital gains on listed securities, mutual funds & REIT units collected by NCCPL (15% flat for filers)",
      "Sec 38: Capital loss deduction restricted exclusively against capital gains (cannot be set off against salary or business)"
    ],
    sections: [
      {
        id: "sec-37",
        sectionCode: "Section 37",
        title: "Capital Assets & General Capital Gains Computation",
        chapterPartId: "part-v-capital-gains",
        headOfIncome: "Capital Gains",
        summary: "Defines capital assets (any property held by a person whether or not connected with business, excluding stock-in-trade and personal movable effects) and establishes the formula for computing capital gains.",
        keyProvisions: [
          "37(1): Capital gain arises on disposal of a capital asset during the tax year.",
          "37(2): Formula: Consideration received on disposal minus Cost of the asset minus Incidental expenditure incurred.",
          "37(3): Capital asset excludes: Stock-in-trade, depreciable assets (Sec 22), and personal effects (clothes, furniture, personal car) EXCEPT jewelry, rare manuscripts, antiques, paintings, sculptures, and coins.",
          "37(4A): Disposals by gift, inheritance, or liquidation: Cost treated as fair market value on date of acquisition."
        ],
        statutoryRatesOrLimits: "Normal progressive slabs for unlisted capital assets, or 15% flat under recent Finance Act amendments.",
        fbrPracticeAndDefense: "Personal movable effects (like private family cars) are exempt from capital gains; however, selling paintings, jewelry, or collector coins attracts full capital gains tax under Section 37(3).",
        penaltiesOrConsequences: "Concealment of property sale proceeds triggers Section 111 unexplained investment additions.",
        crossReferences: ["Section 37(1A)", "Section 37A", "Section 38", "Section 236C (Seller WHT)"],
        fbrCircularOrPrecedent: "2021 PTD 800 (High Court: Distinction between personal movable effects and taxable capital assets)."
      },
      {
        id: "sec-37-1a",
        sectionCode: "Section 37(1A)",
        title: "Disposal of Immovable Property (Plots, Buildings & Flats)",
        chapterPartId: "part-v-capital-gains",
        headOfIncome: "Capital Gains",
        summary: "Specialized capital gains regime for immovable property disposals. Distinguishes between open plots, constructed residential/commercial buildings, and flats, applying tiered holding period tax rates.",
        keyProvisions: [
          "37(1A)(a): Open plots: Higher tax rates and longer holding period (taxable up to 6 years of holding).",
          "37(1A)(b): Constructed buildings: Reduced tax slabs (taxable up to 4 years of holding).",
          "37(1A)(c): Flats / Apartments: Shortest holding period (taxable up to 2 years of holding).",
          "37(1A)(d): Post-July 2024 Acquisitions: Flat 15% rate for ATL Filers (progressive scaling for late/non-filers)."
        ],
        statutoryRatesOrLimits: "Acquired prior to 01-July-2024: Tiered rates 15% down to 0% after 6 years | Acquired after 01-July-2024: 15% flat for filers / up to 45% progressive for non-filers.",
        fbrPracticeAndDefense: "Advance tax paid at the time of transfer under Section 236C (3% for filers) is fully adjustable against the final Section 37(1A) capital gains tax calculated in the annual return.",
        penaltiesOrConsequences: "Failure to declare property disposals leads to IRIS automatic notice under Section 114(4) and Section 122.",
        crossReferences: ["Section 236C (Seller WHT)", "Section 236K (Buyer WHT)", "First Schedule Part I Division VIII"],
        fbrCircularOrPrecedent: "FBR Property Taxation SRO 2024 & Property Valuation Gazettes across Pakistan."
      },
      {
        id: "sec-37a",
        sectionCode: "Section 37A",
        title: "Capital Gains on Listed Securities, Mutual Funds & NCCPL",
        chapterPartId: "part-v-capital-gains",
        headOfIncome: "Capital Gains",
        summary: "Codified tax structure for capital gains arising on disposal of listed shares on the Pakistan Stock Exchange (PSX), mutual fund units, and REIT units, deducted at source through the National Clearing Company of Pakistan Limited (NCCPL).",
        keyProvisions: [
          "37A(1): Disposal of listed securities, voucher of PTC, modaraba certificates, and mutual fund units.",
          "37A(3): NCCPL automated withholding and reporting mechanism under the Eighth Schedule.",
          "37A(5): Loss on disposal of securities can be set off only against capital gains on other securities and carried forward for up to 3 consecutive tax years."
        ],
        statutoryRatesOrLimits: "Acquired after 01-July-2024: 15% flat for ATL Filers (30% for Non-Filers) | Mutual funds: 15% fixed.",
        fbrPracticeAndDefense: "Download the annual NCCPL Capital Gains Tax Certificate from the NCCPL portal and attach it to your IRIS return under the Capital Gains Section 37A tab for automatic credit matching.",
        penaltiesOrConsequences: "Non-filers suffer 100% higher NCCPL tax deductions (30% vs 15%).",
        crossReferences: ["Eighth Schedule", "First Schedule Part I Division VII", "Section 150 (Dividends)"],
        fbrCircularOrPrecedent: "NCCPL Regulatory Circular on CGT Computation Automation 2024."
      },
      {
        id: "sec-38",
        sectionCode: "Section 38",
        title: "Deduction of Capital Losses & Non-Recognition Rules",
        chapterPartId: "part-v-capital-gains",
        headOfIncome: "Capital Gains",
        summary: "Governs the deduction and recognition of capital losses, strictly prohibiting the deduction of capital losses against any other head of income (Salary, Property, Business, Other Sources).",
        keyProvisions: [
          "38(1): Capital loss computed as excess of cost over consideration received.",
          "38(2): No loss recognized on disposal of non-taxable personal effects or jewelry/antiques (Sec 38(5)).",
          "38(3): Ring-fencing: Capital loss can be set off ONLY against capital gains in the same tax year, or carried forward under Sec 59."
        ],
        statutoryRatesOrLimits: "Set-off restricted 100% to capital gains head.",
        fbrPracticeAndDefense: "Ensure capital losses from unlisted share transfers or property sales are properly declared in the return to preserve the right to carry forward under Section 59 for up to 6 years.",
        penaltiesOrConsequences: "Illegal deduction of capital loss against business profits leads to immediate Section 122 addition.",
        crossReferences: ["Section 37", "Section 56 (Set-off)", "Section 59 (Carry-forward of Capital Loss)"],
        fbrCircularOrPrecedent: "2020 SCMR 450 (Supreme Court: Capital loss ring-fencing principles under ITO 2001)."
      }
    ]
  },

  // =========================================================================
  // 3. PART VI: INCOME FROM OTHER SOURCES (SECTIONS 39 - 40)
  // =========================================================================
  {
    id: "part-vi-other-sources",
    partNumber: "Part VI",
    title: "Income from Other Sources",
    sectionsRange: "Sections 39 - 40",
    badge: "Sec 39 - 40",
    badgeColor: "bg-purple-950/90 text-purple-300 border border-purple-600",
    accentColor: "purple",
    description: "Residual head of income capturing dividends, royalties, profit on debt, ground rent, lottery/prize bond winnings, loans/gifts received via non-banking channels under Section 39(3), and allowable expense deductions.",
    keyHighlights: [
      "Sec 39: Scope of residual income (Dividends, profit on debt, royalties, technical fees, annuities)",
      "Sec 39(3): Deemed income on cash loans, advances, or gifts received without crossed banking instrument / banking channel",
      "Sec 40: Allowable deductions — expenditures incurred wholly and exclusively to derive other income",
      "Sec 40(6): Prohibition of personal expenses or non-documented deductions against other source income"
    ],
    sections: [
      {
        id: "sec-39",
        sectionCode: "Section 39",
        title: "Income from Other Sources & Deemed Gift Taxation",
        chapterPartId: "part-vi-other-sources",
        headOfIncome: "Other Sources",
        summary: "The catch-all residual head of income for any income derived by a person that is not chargeable under Salary, Property, Business, or Capital Gains, including dividends, profit on debt, royalties, ground rent, and non-banking cash gifts/loans.",
        keyProvisions: [
          "39(1)(a)-(l): Dividends, royalties, profit on debt, ground rent, sub-lease rent, prize bonds, winning from raffle or lottery, and pension.",
          "39(3): Mandatory Banking Channel: Any loan, advance, deposit or gift received by a person in cash exceeding PKR 250,000 (otherwise than by crossed cheque or banking channel) treated as taxable income under Other Sources.",
          "39(4): Deemed fair market value of any asset received as a gift from a non-relative (other than grandparents, parents, spouse, brother, sister, son, or daughter)."
        ],
        statutoryRatesOrLimits: "Normal progressive slabs (or separate withholding final tax rates for Dividends at 15% and Bank Profit at 15%).",
        fbrPracticeAndDefense: "Major audit risk in Section 116 wealth reconciliations: Any gift received from relatives must be accompanied by a registered Gift Deed, donor's tax return copy, and crossed banking transfer voucher to avoid deemed income addition under Section 39(3).",
        penaltiesOrConsequences: "Unexplained cash gifts/loans treated as concealed income under Section 111 with 100% penalty.",
        crossReferences: ["Section 111 (Unexplained Wealth)", "Section 116 (Wealth Reconciliation)", "Section 150 (Dividends)", "Section 151 (Profit on Debt)"],
        fbrCircularOrPrecedent: "2022 SCMR 1890 (Supreme Court: Gift from third party without verifiable banking trail is taxable under Sec 39)."
      },
      {
        id: "sec-40",
        sectionCode: "Section 40",
        title: "Deductions in Computing Income from Other Sources",
        chapterPartId: "part-vi-other-sources",
        headOfIncome: "Other Sources",
        summary: "Allows deduction of any expenditure paid by the person in the tax year to the extent that it is incurred solely to earn income chargeable under the head 'Income from Other Sources'.",
        keyProvisions: [
          "40(1): Expenditure incurred wholly and exclusively for the purpose of deriving income from other sources.",
          "40(2): Depreciation allowance under Section 22 permitted for machinery or plant leased out under Section 39(1)(e).",
          "40(6): Explicit disallowance: No deduction allowed for personal or domestic expenses or any expenditure not verifiable."
        ],
        statutoryRatesOrLimits: "Deduction allowed against gross other source receipts up to the total income earned.",
        fbrPracticeAndDefense: "When earning income from hire of building along with plant/machinery, claim allowable depreciation on machinery under Section 40(2) to significantly reduce net other source liability.",
        penaltiesOrConsequences: "Disallowed expenses added to taxable income under Section 122.",
        crossReferences: ["Section 20 (Business Deductions)", "Section 22 (Depreciation)", "Section 39"],
        fbrCircularOrPrecedent: "2021 PTD 600 (ATIR: Bank locker and financial management charges deductible against profit on debt)."
      }
    ]
  },

  // =========================================================================
  // 4. PART VII: STATUTORY EXEMPTIONS (SECTIONS 41 - 55)
  // =========================================================================
  {
    id: "part-vii-exemptions",
    partNumber: "Part VII",
    title: "Statutory Exemptions",
    sectionsRange: "Sections 41 - 55",
    badge: "Sec 41 - 55",
    badgeColor: "bg-teal-950/90 text-teal-300 border border-teal-600",
    accentColor: "teal",
    description: "Constitutional and statutory tax exemptions, agricultural income rules, diplomatic protections, international double taxation agreements, and Second Schedule catalogues.",
    keyHighlights: [
      "Sec 41: Agricultural income exemption under Federal Ordinance (subject to Provincial Agricultural Income Tax)",
      "Sec 42: Diplomatic and United Nations personnel tax immunity under Vienna Convention",
      "Sec 44: Foreign government officials and Bilateral Double Tax Avoidance Treaties (DTT/DTAA)",
      "Sec 53: Comprehensive statutory exemptions codified in the Second Schedule (Part I to IV)",
      "Sec 54-55: Limitation of exemptions & approved Non-Profit Organizations (NPO) certification under Sec 100C"
    ],
    sections: [
      {
        id: "sec-41",
        sectionCode: "Section 41",
        title: "Agricultural Income Exemption & Provincial Mandate",
        chapterPartId: "part-vii-exemptions",
        headOfIncome: "Exemptions",
        summary: "Constitutional exemption of agricultural income from federal income tax under the Income Tax Ordinance, 2001, subject to provincial agricultural income tax legislation.",
        keyProvisions: [
          "41(1): Agricultural income derived by a person is exempt from federal income tax.",
          "41(2): Definition: Rent or revenue derived from land situated in Pakistan and used for agricultural purposes, income derived from agriculture/cultivation, and farm building income.",
          "41(3): Strict evidentiary test: Agricultural land must be situated in Pakistan and the taxpayer must produce provincial land revenue records (Khasra/Girdawari) and provincial agricultural tax payment receipts."
        ],
        statutoryRatesOrLimits: "0% Federal Tax (Provincial Agricultural Income Tax applies at provincial slab rates).",
        fbrPracticeAndDefense: "Revenue officers aggressively scrutinize agricultural income declared in wealth reconciliation. Always pay provincial agricultural tax (e.g. Punjab/Sindh Agricultural Income Tax) and attach Form-VII / Khasra Girdawari to prevent Section 111 addition.",
        penaltiesOrConsequences: "Unsubstantiated agricultural claims are recharacterized as unexplained income under Section 111 with 100% penalty.",
        crossReferences: ["Section 111(1)(b)", "Section 116 (Wealth Statement)", "Constitution of Pakistan Article 142"],
        fbrCircularOrPrecedent: "2023 SCMR 1400 (Supreme Court: Mere ownership of land without proof of crop sale proceeds cannot justify agricultural income exemption)."
      },
      {
        id: "sec-42-44",
        sectionCode: "Sections 42 - 44",
        title: "Diplomatic, UN & Bilateral Treaty (DTAA) Exemptions",
        chapterPartId: "part-vii-exemptions",
        headOfIncome: "Exemptions",
        summary: "Exempts diplomatic representatives, consular staff, United Nations agencies, and foreign government officials from Pakistan income tax under international conventions and Double Taxation Treaties (DTAA).",
        keyProvisions: [
          "Sec 42: Complete tax immunity for foreign diplomatic staff and consular personnel in Pakistan.",
          "Sec 43: Foreign government officials exempt on reciprocal basis.",
          "Sec 44: International agreements: Provisions of Double Taxation Agreements (DTT/DTAA) override domestic Ordinance to the extent of beneficial tax treatment.",
          "Sec 107: Power of Federal Government to execute bilateral tax treaties with foreign states."
        ],
        statutoryRatesOrLimits: "100% exemption or concessional treaty withholding rates (typically 10% on royalties / technical fees).",
        fbrPracticeAndDefense: "Non-resident corporate entities operating in Pakistan can claim Double Tax Avoidance Treaty benefits by submitting a valid Tax Residency Certificate (TRC) from their home jurisdiction.",
        penaltiesOrConsequences: "Denial of treaty relief triggers standard 15% Section 152 non-resident withholding tax.",
        crossReferences: ["Section 107 (Agreements for Avoidance of Double Taxation)", "Section 152"],
        fbrCircularOrPrecedent: "FBR International Taxes Guidelines on Tax Residency Certificate (TRC) Validation 2023."
      },
      {
        id: "sec-53",
        sectionCode: "Section 53",
        title: "Exemptions and Tax Concessions under the Second Schedule",
        chapterPartId: "part-vii-exemptions",
        headOfIncome: "Exemptions",
        summary: "Empowers the Second Schedule to grant total income exemptions (Part I), reduced tax rates (Part II), reduction in tax liability (Part III), and exemption from withholding taxes (Part IV).",
        keyProvisions: [
          "53(1): Total exemption for classes of income listed in Part I of the Second Schedule (Pensions, armed forces welfare, charities).",
          "53(2): Reduced tax rates for specified industrial sectors in Part II.",
          "53(3): Direct tax liability rebates (e.g. teachers/researchers 25% tax reduction) in Part III.",
          "53(4): Specific exemptions from withholding tax deduction in Part IV."
        ],
        statutoryRatesOrLimits: "Specific statutory rates and exemptions detailed in Second Schedule Clauses 1 to 150+.",
        fbrPracticeAndDefense: "Always cite the exact Second Schedule Part and Clause number in the annual return to substantiate exempt income and prevent computerized IRIS audit notices.",
        penaltiesOrConsequences: "Misquoting exemption clauses results in automated rectification demands under Section 120(2A).",
        crossReferences: ["Second Schedule (Parts I, II, III, IV)", "Section 100C", "Section 159"],
        fbrCircularOrPrecedent: "FBR Consolidated Second Schedule Master Manual 2025/2026."
      }
    ]
  },

  // =========================================================================
  // 5. PART VIII: LOSSES (SECTIONS 56 - 59BB)
  // =========================================================================
  {
    id: "part-viii-losses",
    partNumber: "Part VIII",
    title: "Losses & Group Relief",
    sectionsRange: "Sections 56 - 59BB",
    badge: "Sec 56 - 59BB",
    badgeColor: "bg-amber-950/90 text-amber-300 border border-amber-600",
    accentColor: "amber",
    description: "Statutory rules for set-off of losses across heads of income, 6-year carry-forward of business and capital losses, indefinite carry-forward of unabsorbed depreciation, and group relief regimes.",
    keyHighlights: [
      "Sec 56: Set-off of losses across heads in the same tax year (Exceptions: Speculation losses, Capital losses)",
      "Sec 57: Carry-forward of business losses for up to 6 consecutive tax years",
      "Sec 57(4): Indefinite carry-forward of unabsorbed tax depreciation until fully set off",
      "Sec 58: Speculation loss ring-fencing (set off only against speculation gains)",
      "Sec 59: Capital loss carry-forward for up to 6 tax years against capital gains",
      "Sec 59A - 59BB: Group Relief & Group Taxation (Parent & 100% subsidiaries loss surrender)"
    ],
    sections: [
      {
        id: "sec-56",
        sectionCode: "Section 56",
        title: "Set-off of Losses in the Same Tax Year (Inter-Head Adjustment)",
        chapterPartId: "part-viii-losses",
        headOfIncome: "Losses",
        summary: "Allows a taxpayer sustaining a loss under any head of income (except Speculation Business and Capital Gains) to set off that loss against taxable income derived under any other head of income in the same tax year.",
        keyProvisions: [
          "56(1): General inter-head set-off allowed in the same tax year (e.g. Business loss set off against Property or Other Sources).",
          "56(2): Strict prohibitions: No loss can be set off against Salary income; speculation losses cannot be set off against non-speculation income; capital losses cannot be set off against any other head."
        ],
        statutoryRatesOrLimits: "100% set-off permitted against eligible heads in the same tax year.",
        fbrPracticeAndDefense: "Ensure business loss is computed strictly after applying Section 20 and Section 21 adjustments in the return so the net allowable loss offsets other taxable heads seamlessly.",
        penaltiesOrConsequences: "Illegal set-off against salary income is automatically adjusted by IRIS algorithm under Section 120(2A).",
        crossReferences: ["Section 57 (Carry-forward)", "Section 58", "Section 59", "Section 120(2A)"],
        fbrCircularOrPrecedent: "2021 PTD 450 (ATIR: Loss under Income from Property can be set off against business profits under Sec 56)."
      },
      {
        id: "sec-57",
        sectionCode: "Section 57",
        title: "Carry-Forward of Business Losses & Unabsorbed Depreciation",
        chapterPartId: "part-viii-losses",
        headOfIncome: "Losses",
        summary: "Permits unabsorbed business losses to be carried forward for up to six consecutive tax years and set off against taxable business profits; unabsorbed depreciation under Section 57(4) may be carried forward indefinitely.",
        keyProvisions: [
          "57(1): Business loss carried forward to the following tax year and set off against income under the head 'Income from Business'.",
          "57(2): Six-year limitation: Business loss can be carried forward for a maximum of six consecutive tax years immediately following the year of loss.",
          "57(4): Indefinite carry-forward: Unabsorbed depreciation allowance under Section 22 can be carried forward indefinitely until fully absorbed against future business profits."
        ],
        statutoryRatesOrLimits: "6-Year limit for normal business losses | Indefinite for unabsorbed tax depreciation.",
        fbrPracticeAndDefense: "Maintain a clear multi-year Loss Carry-Forward Ledger separating operational business loss from unabsorbed depreciation (Sec 57(4)) to prevent field officers from expiring unabsorbed depreciation after 6 years.",
        penaltiesOrConsequences: "Failure to file return on time preserves loss carry-forward provided return was furnished within statutory limits.",
        crossReferences: ["Section 22 (Depreciation)", "Section 56", "Section 59A"],
        fbrCircularOrPrecedent: "2022 SCMR 1120 (Supreme Court: Unabsorbed depreciation has priority and can be carried forward indefinitely without 6-year expiry)."
      },
      {
        id: "sec-58-59",
        sectionCode: "Sections 58 - 59",
        title: "Carry-Forward of Speculation & Capital Losses (6-Year Rule)",
        chapterPartId: "part-viii-losses",
        headOfIncome: "Losses",
        summary: "Ring-fences speculation business losses and capital asset losses, allowing them to be carried forward for up to six consecutive tax years and set off strictly against speculation profits and capital gains respectively.",
        keyProvisions: [
          "Sec 58: Speculation loss carried forward for 6 tax years, deductible ONLY against speculation business profits.",
          "Sec 59: Capital loss carried forward for 6 tax years, deductible ONLY against capital gains.",
          "Sec 37A(5): Listed securities capital loss carried forward for up to 3 years through NCCPL."
        ],
        statutoryRatesOrLimits: "6-Year carry forward strictly ring-fenced to identical income classifications.",
        fbrPracticeAndDefense: "Commodity trading, currency derivatives, and unlisted securities losses must be tracked in distinct asset classes in the electronic return.",
        penaltiesOrConsequences: "Attempting to offset carried forward capital loss against business profit triggers immediate demand under Section 122.",
        crossReferences: ["Section 19", "Section 37", "Section 37A", "Section 38"],
        fbrCircularOrPrecedent: "2020 PTD 950 (ATIR: Strict ring-fencing of speculative derivative losses)."
      },
      {
        id: "sec-59a-59bb",
        sectionCode: "Sections 59A - 59BB",
        title: "Group Relief & Group Taxation for Corporate Conglomerates",
        chapterPartId: "part-viii-losses",
        headOfIncome: "Losses",
        summary: "Enables corporate holding companies and their 100% or 55%-75% owned subsidiaries to surrender assessed business losses for tax relief or elect for unified group taxation under the Companies Act.",
        keyProvisions: [
          "Sec 59A: Direct group loss surrender between parent company and 100% owned locally incorporated subsidiary.",
          "Sec 59AA: Group relief for holding companies owning not less than 55% shareholding (subject to SECP designation).",
          "Sec 59B: Group Taxation: Holding company and subsidiaries assessed as one single economic fiscal unit."
        ],
        statutoryRatesOrLimits: "100% loss surrender allowed across designated group entities.",
        fbrPracticeAndDefense: "Obtain SECP Group Registration Certificate and ensure all group companies maintain uniform accounting year (July-June) before claiming Section 59B group relief on IRIS.",
        penaltiesOrConsequences: "Invalid group elections result in reciprocal assessment amendments across all group entities.",
        crossReferences: ["Companies Act 2017 Sec 285", "Section 122", "Group Relief Rules 2021"],
        fbrCircularOrPrecedent: "FBR SRO 890(I)/2021 (Group Relief & Group Taxation Regulations)."
      }
    ]
  },

  // =========================================================================
  // 6. PART IX & X: DEDUCTIBLE ALLOWANCES & TAX CREDITS (SECTIONS 60 - 65E)
  // =========================================================================
  {
    id: "part-ix-x-credits",
    partNumber: "Parts IX & X",
    title: "Deductible Allowances & Tax Credits",
    sectionsRange: "Sections 60 - 65E",
    badge: "Sec 60 - 65E",
    badgeColor: "bg-indigo-950/90 text-indigo-300 border border-indigo-600",
    accentColor: "indigo",
    description: "Statutory deductible allowances (Zakat, WWF, WPPF, Educational expenses) deducted from Total Income, and direct tax credits (Charitable donations, VPS pension schemes, POS integration, SEZ 100% credits).",
    keyHighlights: [
      "Sec 60: Zakat paid under Zakat & Ushr Ordinance 1980 deducted directly from Total Income",
      "Sec 60A & 60B: Deductible allowances for Workers' Welfare Fund (WWF 2%) and WPPF (5%)",
      "Sec 60C & 60D: Educational expenses and home loan profit-on-debt allowances",
      "Sec 61: Tax credit for charitable donations to approved Non-Profit Organizations (30% individual / 20% corporate limit)",
      "Sec 63: Tax credit for contributions to Approved Voluntary Pension Schemes (VPS) under VPS Rules 2005",
      "Sec 64D & 65: POS retail digitization credits & cashback incentives",
      "Sec 65E - 65G: Special Economic Zones (SEZ) & Industrial expansion 100% tax credit regimes"
    ],
    sections: [
      {
        id: "sec-60",
        sectionCode: "Section 60",
        title: "Deductible Allowance for Zakat (Zakat & Ushr Ordinance 1980)",
        chapterPartId: "part-ix-x-credits",
        headOfIncome: "Allowances & Credits",
        summary: "Allows full deduction of any Zakat paid by a person in the tax year under the Zakat and Ushr Ordinance, 1980 directly from the person's Total Income, reducing the net Taxable Income.",
        keyProvisions: [
          "60(1): Direct deduction of compulsory Zakat deducted at source by banks on 1st Ramadan, or voluntary Zakat paid to Central/Provincial Zakat Funds.",
          "60(2): Allowance cannot create a loss (deductible only up to the amount of Total Income)."
        ],
        statutoryRatesOrLimits: "100% deduction of Zakat paid under the 1980 Ordinance.",
        fbrPracticeAndDefense: "Attach the official bank Zakat deduction certificate (issued by commercial banks on 1st Ramadan deductions on savings accounts) to your IRIS return.",
        penaltiesOrConsequences: "Private charity or non-statutory Zakat cannot be claimed under Section 60 (must be claimed as donation under Section 61).",
        crossReferences: ["Section 60A (WWF)", "Section 61 (Donations)", "Zakat and Ushr Ordinance 1980"],
        fbrCircularOrPrecedent: "2021 PTD 350 (ATIR: Distinction between Section 60 compulsory Zakat vs Section 61 charitable donations)."
      },
      {
        id: "sec-60a-60b",
        sectionCode: "Sections 60A & 60B",
        title: "Deductible Allowances for WWF (2%) & WPPF (5%)",
        chapterPartId: "part-ix-x-credits",
        headOfIncome: "Allowances & Credits",
        summary: "Permits corporate and industrial establishments to deduct statutory payments made to the Workers' Welfare Fund (WWF 2%) and Workers' Profit Participation Fund (WPPF 5%) directly from Total Income.",
        keyProvisions: [
          "Sec 60A: WWF paid under Workers' Welfare Fund Ordinance 1971 allowed as deductible allowance.",
          "Sec 60B: WPPF paid under Companies Profits (Workers' Participation) Act 1968 allowed as deductible allowance.",
          "Payments must be deposited in the prescribed government treasury or audited trust bank account."
        ],
        statutoryRatesOrLimits: "WWF: 2% of assessable profit | WPPF: 5% of accounting profit before tax.",
        fbrPracticeAndDefense: "Crucial corporate tax calculation step: Ensure WWF and WPPF are claimed as deductible allowances after computing gross total income rather than standard business expenses to maintain audited IRIS matching.",
        penaltiesOrConsequences: "Unpaid or disputed WWF/WPPF cannot be deducted until actual discharge/payment.",
        crossReferences: ["WWF Ordinance 1971", "Companies Profits Act 1968", "Section 60"],
        fbrCircularOrPrecedent: "2022 SCMR 1280 (Supreme Court: Trans-provincial WWF deductibility under Section 60A)."
      },
      {
        id: "sec-61",
        sectionCode: "Section 61",
        title: "Tax Credit for Charitable Donations to Approved NPOs",
        chapterPartId: "part-ix-x-credits",
        headOfIncome: "Allowances & Credits",
        summary: "Grants a direct tax credit for donations paid to approved non-profit organizations, educational boards, public universities, and relief funds established by the Federal or Provincial Governments.",
        keyProvisions: [
          "61(1): Direct tax credit computed as: (A / B) * C (where A is tax before credit, B is taxable income, and C is donation amount).",
          "61(2): Monetary ceiling on donation C: Cannot exceed 30% of taxable income for individuals/AOPs, or 20% of taxable income for companies.",
          "61(4): Mandatory condition: Donation must be paid via crossed banking instrument / cheque to the verified bank account of the approved NPO."
        ],
        statutoryRatesOrLimits: "Average tax rebate up to 30% of taxable income for individuals / 20% for companies.",
        fbrPracticeAndDefense: "Always verify that the charitable institution possesses an active Section 100C / Section 2(36) FBR approval certificate (e.g. Shaukat Khanum, Indus Hospital, Edhi Foundation, SIUT) and obtain an official stamped donation receipt.",
        penaltiesOrConsequences: "Cash donations are completely disqualified under Section 61(4).",
        crossReferences: ["Section 100C (NPO Approvals)", "Section 2(36)", "Thirteenth Schedule"],
        fbrCircularOrPrecedent: "FBR Active Approved Non-Profit Organizations Gazette 2024."
      },
      {
        id: "sec-63",
        sectionCode: "Section 63",
        title: "Tax Credit for Voluntary Pension Schemes (VPS)",
        chapterPartId: "part-ix-x-credits",
        headOfIncome: "Allowances & Credits",
        summary: "Incentivizes retirement savings by providing a direct tax credit on contributions made by an individual to an Approved Voluntary Pension Scheme (VPS) managed by a licensed Pension Fund Manager under the Voluntary Pension System Rules, 2005.",
        keyProvisions: [
          "63(1): Tax credit allowed to resident individuals deriving salary or business income contributing to approved VPS.",
          "63(2): Maximum contribution ceiling: Up to 20% of taxable income for the tax year.",
          "63(3): Catch-up allowance for older individuals: For persons joining VPS after age 40, contribution limit increases by 2% for each year above age 40, up to a maximum cap of 50% of taxable income."
        ],
        statutoryRatesOrLimits: "Average tax rate rebate on up to 20% (or up to 50% for senior citizens) of taxable income.",
        fbrPracticeAndDefense: "One of the most effective legal tax planning tools for high-salaried professionals in Pakistan: Contributing to VPS (Al Meezan, UBL Funds, MCB Funds) can reduce personal tax by up to 20%-35% of the contributed sum.",
        penaltiesOrConsequences: "Premature withdrawal before retirement (age 60) attracts withholding tax under Section 156B.",
        crossReferences: ["Section 12 (Salary)", "Section 156B (VPS Withholding)", "VPS Rules 2005"],
        fbrCircularOrPrecedent: "SECP & FBR Joint VPS Regulatory Framework Guidelines 2023."
      },
      {
        id: "sec-65e-65g",
        sectionCode: "Sections 65E - 65G",
        title: "Tax Credits for Industrial Undertakings & SEZ Units (100%)",
        chapterPartId: "part-ix-x-credits",
        headOfIncome: "Allowances & Credits",
        summary: "100% tax credit regimes for industrial expansion, modernization, greenfield investments, and enterprises operating within Special Economic Zones (SEZs) under the Special Economic Zones Act, 2012.",
        keyProvisions: [
          "Sec 65E: Tax credit for industrial expansion and modernization (BMR) funded through new equity.",
          "Sec 65F: 100% tax credit on IT and IT-enabled services export earnings (subject to 80% banking proceeds repatriation).",
          "Sec 65G: 10-year 100% tax holiday credit for zone enterprises set up in certified Special Economic Zones."
        ],
        statutoryRatesOrLimits: "100% tax credit (effectively 0% net income tax liability).",
        fbrPracticeAndDefense: "Maintain Special Economic Zone Authority (SEZA) development agreement and State Bank inward remittance certificates (PRCs) to defend 100% tax credits during IRIS audits.",
        penaltiesOrConsequences: "Failure to repatriate 80% export proceeds through banking channels forfeits Section 65F IT export tax credit.",
        crossReferences: ["Special Economic Zones Act 2012", "Section 154A", "Clause 126E Second Schedule"],
        fbrCircularOrPrecedent: "FBR SRO 1020(I)/2022 (Special Economic Zone Enterprise Tax Credit Rules)."
      }
    ]
  },

  // =========================================================================
  // 7. CHAPTER X: PROCEDURAL MACHINERY & CHAPTERS IV, V, VI (SECTIONS 81 - 153+)
  // =========================================================================
  {
    id: "part-procedural-machinery",
    partNumber: "Procedural Chapters",
    title: "Procedural Machinery & Anti-Avoidance",
    sectionsRange: "Chapters IV, V, VI & Chapter X (Sec 114 - 153)",
    badge: "Procedural & WHT",
    badgeColor: "bg-rose-950/90 text-rose-300 border border-rose-600",
    accentColor: "rose",
    description: "Assessment workflows, deemed orders under Section 120, amendment powers under Section 122, Section 114 return mandates, wealth reconciliations, Section 147 advance tax, Section 140 third-party recovery, and comprehensive Withholding Tax directory (Sec 148 - 153).",
    keyHighlights: [
      "Sec 114 & 116: Mandatory return filing criteria, wealth statements & foreign asset declarations (Sec 116A)",
      "Sec 120 & 122: Self-assessment deemed orders and 5-year amendment powers upon definite information",
      "Sec 140: Third-party garnishee orders (recovery from bank accounts with mandatory 24-hour notice rule)",
      "Sec 147: Quarterly advance tax payments for companies, AOPs, and high-turnover individuals",
      "Sec 148 - 153 Withholding Directory: Imports (148), Salary (149), Dividends (150), Bank Profit (151), Non-Residents (152), Goods/Services (153)",
      "Chapters IV, V, VI: Tax Years (Sec 74), Anti-Avoidance Transfer Pricing (Sec 108), & Unexplained Wealth (Sec 111)"
    ],
    sections: [
      {
        id: "sec-114-116",
        sectionCode: "Sections 114 & 116",
        title: "Return of Income, Wealth Statement & Reconciliation",
        chapterPartId: "part-procedural-machinery",
        headOfIncome: "Procedural",
        summary: "Mandates annual return of income filing for all companies, NTN holders, commercial electricity consumers > Rs 500k, and owners of 500 sq yd plots / 1000cc cars, along with comprehensive net wealth reconciliation.",
        keyProvisions: [
          "114(1): Mandatory classes of persons required to furnish returns on IRIS portal.",
          "114(3): Due dates: 30th September for individuals and AOPs; 31st December for corporate entities.",
          "116(1): Mandatory Wealth Statement showing all personal assets, liabilities, and family expenses.",
          "116(4): Wealth Reconciliation: Opening Wealth + Inflows (Declared Income + Exempt Receipts) - Outflows (Expenses + Gifts) = Closing Wealth.",
          "116A: Foreign Income and Assets Statement for offshore assets > $100k or foreign income > $10k."
        ],
        statutoryRatesOrLimits: "Late filing results in ATL exclusion and 100% higher Tenth Schedule withholding rates.",
        fbrPracticeAndDefense: "Ensure mathematical zero discrepancy in wealth reconciliation before electronic submission on IRIS. Any unexplained gap between asset growth and declared income triggers immediate Section 111(1)(b) concealed income additions.",
        penaltiesOrConsequences: "Penalty under Section 182: 0.1% per day (Min PKR 1,000, Max 50%) + PKR 20,000 for wealth statement.",
        crossReferences: ["Section 111 (Unexplained Wealth)", "Section 116A", "Section 120", "Section 181A (ATL)"],
        fbrCircularOrPrecedent: "2021 PTD 1620 (High Court: Evidentiary burden and reconciliation formulas in wealth statements)."
      },
      {
        id: "sec-120-122",
        sectionCode: "Sections 120 & 122",
        title: "Deemed Assessment & Amendment Powers (Definite Information)",
        chapterPartId: "part-procedural-machinery",
        headOfIncome: "Procedural",
        summary: "Section 120 establishes the self-assessment scheme where a complete return is deemed an assessment order. Section 122 empowers the Commissioner to amend the assessment within 5 years based on audit or definite information.",
        keyProvisions: [
          "120(1): Return validly filed on IRIS treated as deemed assessment order issued on the filing date.",
          "122(1): Power to amend assessment order to assess under-assessed income or low tax rates.",
          "122(2): Five-year limitation period from the end of financial year in which return was filed.",
          "122(5): Mandatory condition: Amendment requires audit under Section 177 or definite information acquired.",
          "122(5A): Suo motu revision of assessment erroneous and prejudicial to the interest of revenue.",
          "122(9): Mandatory Show Cause Notice specifying definite reasons and reasonable opportunity of hearing."
        ],
        statutoryRatesOrLimits: "Short-assessed tax recovered along with 12% default surcharge under Section 205.",
        fbrPracticeAndDefense: "The primary battleground in FBR litigation: Challenge jurisdiction if the Section 122 notice lacks specific tangible material ('definite information') or if issued after the 5-year limitation period. Change of opinion is not definite information.",
        penaltiesOrConsequences: "Ad-hoc assessment additions and coercive tax demand notices under Section 137.",
        crossReferences: ["Section 120", "Section 121 (Best Judgment)", "Section 177 (Audit)", "Section 205"],
        fbrCircularOrPrecedent: "2023 SCMR 1210 (Supreme Court: Reopening deemed assessment under Sec 122 requires tangible new evidence, not mere change of opinion)."
      },
      {
        id: "sec-140",
        sectionCode: "Section 140",
        title: "Third-Party Garnishee Orders & Bank Account Freezing",
        chapterPartId: "part-procedural-machinery",
        headOfIncome: "Procedural",
        summary: "Authorizes the Commissioner to issue garnishee notices requiring any commercial bank, debtor, or employer holding funds for the taxpayer to remit money directly to the Federal Treasury to recover outstanding tax arrears.",
        keyProvisions: [
          "140(1): Garnishee notice served on commercial banks or debtors.",
          "140(2): Commercial bank must debit funds up to tax demand and deposit into government CPR.",
          "140(5): Personal liability of bank branch manager for failing to execute Section 140 notice."
        ],
        statutoryRatesOrLimits: "Immediate debit up to the full outstanding statutory tax demand.",
        fbrPracticeAndDefense: "High Courts and FTO have firmly established that FBR cannot freeze bank accounts without serving a prior 24-hour statutory notice to the taxpayer and waiting for the 30-day Section 137 payment grace period to expire. File urgent High Court writ under Article 199 or seek stay under Section 128(1AA).",
        penaltiesOrConsequences: "Immediate operational disruption of corporate working capital.",
        crossReferences: ["Section 137 (Demand Notice)", "Section 128(1AA) (Appellate Stay)", "Article 199 Constitution"],
        fbrCircularOrPrecedent: "2023 PTD 800 (Lahore High Court: Deprecating unilateral bank account freeze without prior intimation)."
      },
      {
        id: "sec-147",
        sectionCode: "Section 147",
        title: "Quarterly Advance Tax Payments & Computation Formulas",
        chapterPartId: "part-procedural-machinery",
        headOfIncome: "Procedural",
        summary: "Mandatory quarterly advance income tax payable by corporate entities, Associations of Persons (AOPs), and individual taxpayers deriving business turnover exceeding PKR 100 million in four statutory installments.",
        keyProvisions: [
          "147(1): Advance tax payable in 4 installments: 15th October, 15th December, 15th March, and 15th June.",
          "147(4): Companies & AOPs formula: Based on turnover for the quarter multiplied by effective tax rate of latest completed year (or turnover tax rate).",
          "147(6): Taxpayer option to file estimated lower tax liability estimate with Commissioner before installment due date.",
          "147(7): 90% accuracy rule: If estimated advance tax paid is less than 90% of actual annual tax liability, default surcharge applies under Section 205(1B)."
        ],
        statutoryRatesOrLimits: "Quarterly payment based on pro-rata formula | Adjustable against final tax under Sec 168.",
        fbrPracticeAndDefense: "If business revenues decline during the year, always submit a formal revised estimate under Section 147(6) on IRIS prior to the installment due date to legally reduce advance tax outlay and avoid Section 205 default surcharge.",
        penaltiesOrConsequences: "Default surcharge at 12% per annum under Section 205(1B) on advance tax shortfall.",
        crossReferences: ["Section 168 (Tax Credit)", "Section 205(1B) (Default Surcharge)", "First Schedule"],
        fbrCircularOrPrecedent: "FBR Quarterly Advance Tax SRO 2024 (IRIS Automated Advance Tax Generation)."
      },
      {
        id: "sec-148-153-wht",
        sectionCode: "Sections 148 - 153",
        title: "Comprehensive Withholding Tax Directory (WHT Matrix)",
        chapterPartId: "part-procedural-machinery",
        headOfIncome: "Withholding",
        isWithholdingSection: true,
        summary: "The operational heart of Pakistani direct tax revenue collection, establishing source withholding on Imports (148), Salaries (149), Dividends (150), Bank Interest (151), Non-Residents (152), and Supplies, Services & Contracts (153).",
        keyProvisions: [
          "Sec 148 (Imports): Advance tax collected by Customs (1% to 12% based on raw materials, capital goods, or commercial consumer items).",
          "Sec 149 (Salary): Employer monthly payroll withholding based on progressive salaried slabs.",
          "Sec 150 (Dividends): 15% general rate, 25% for mutual funds, 50% punitive rate for non-filers.",
          "Sec 151 (Profit on Debt): 15% for ATL filers, 30% for non-filers on bank deposits and debt securities.",
          "Sec 152 (Payments to Non-Residents): 15% on royalties and technical fees; 10% on contracts.",
          "Sec 153 (Supplies & Services): Goods (5.5% company, 6% individual), Services (8% company, 11% individual), Contracts (7.5% company, 8% individual) — 100% doubled for Non-Filers under Tenth Schedule."
        ],
        statutoryRatesOrLimits: "Withholding rates range from 1% to 50% depending on transaction nature and ATL status.",
        withholdingRates: {
          filerRate: "Goods: 5.5% | Services: 8%-11% | Dividends: 15% | Profit on Debt: 15%",
          nonFilerRate: "Goods: 11% | Services: 16%-22% | Dividends: 50% | Profit on Debt: 30%",
          description: "Tenth Schedule automatically doubles all standard rates for non-ATL persons."
        },
        fbrPracticeAndDefense: "Withholding agents must furnish monthly and annual electronic withholding statements on IRIS under Section 165 and issue automated digital CPR certificates to vendors under Section 164.",
        penaltiesOrConsequences: "Personal default liability under Section 161 + 12% default surcharge under Section 205 + 10% penalty under Section 182.",
        crossReferences: ["Section 154/154A (Exports)", "Section 161 (Default)", "Section 165 (Statements)", "Tenth Schedule (Non-Filers)"],
        fbrCircularOrPrecedent: "FBR National Withholding Tax Guidelines 2025/2026 Master Table."
      },
      {
        id: "sec-108-111-anti-avoidance",
        sectionCode: "Chapters V & VI (Sec 108 & 111)",
        title: "Anti-Avoidance, Transfer Pricing & Unexplained Wealth",
        chapterPartId: "part-procedural-machinery",
        headOfIncome: "Procedural",
        summary: "Statutory anti-avoidance machinery encompassing Section 108 Transfer Pricing (Arm's length principle for cross-border associate transactions) and Section 111 (Addition of unexplained income, bank credits, or concealed assets).",
        keyProvisions: [
          "Sec 108: Transfer pricing rules, Country-by-Country (CbC) reporting, Master File & Local File maintenance.",
          "Sec 109: Recharacterization of tax avoidance arrangements lacking commercial economic substance.",
          "Sec 111(1): Addition of unexplained sum, investment, expensive asset, or suppressed expenditure as deemed taxable income.",
          "Sec 111(4): Foreign remittance safe-harbor exemption: Inward foreign remittances through banking channels up to statutory limit exempt from source inquiry."
        ],
        statutoryRatesOrLimits: "Added 100% to taxable income + 100% concealment penalty under Section 182.",
        fbrPracticeAndDefense: "When defending Section 111 notices, furnish bank statements showing the exact remittance SWIFT MT103 and Foreign Encashment Certificate (PRC) from the receiving bank to trigger statutory protection under Section 111(4).",
        penaltiesOrConsequences: "Criminal prosecution under Section 192A for deliberate wealth concealment.",
        crossReferences: ["Section 111(4)", "Section 116", "Section 192A", "OECD Transfer Pricing Guidelines"],
        fbrCircularOrPrecedent: "2023 SCMR 1600 (Supreme Court: Strict compliance with Section 111(4) banking channels excludes FBR source probe)."
      }
    ]
  }
];
