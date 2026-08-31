import { StatuteSection, CaseLawItem, SROItem, TaxProblemItem } from '../types';

export const STATUTE_SECTIONS: StatuteSection[] = [
  {
    id: 'sta-sec-3',
    act_type: 'Sales Tax Act, 1990',
    chapter: 'Chapter II: Scope and Payment of Tax',
    section: 'Section 3',
    title: 'Scope of Tax',
    description: 'Subject to the provisions of this Act, there shall be charged, levied and paid a tax known as sales tax at the rate of eighteen per cent of the value of: (a) taxable supplies made by a registered person in the course or furtherance of any taxable activity carried on by him; and (b) goods imported into Pakistan, irrespective of whether the importer is a registered person or not.',
    sub_sections: [
      'Section 3(1): Standard rate of 18% ad valorem on taxable supplies and imports.',
      'Section 3(1A): Further tax at the rate of 4% on taxable supplies made to a person who has not obtained sales tax registration number (Unregistered person).',
      'Section 3(2): Tax on goods specified in the Third Schedule (Retail Price items) charged on retail price rather than wholesale transaction value.',
      'Section 3(7): Withholding of sales tax at source by withholding agents under Sales Tax Special Procedure Withholding Rules.',
      'Section 3(9): Sales tax collection from Tier-1 Retailers integrated with FBR computerized system (POS integration) vs standard turnover tax on non-integrated retailers via electricity bills.'
    ],
    practical_notes: 'Section 3 is the core charging section of the Sales Tax Act, 1990. Practitioners must note that under sub-section (1A), further tax of 4% cannot be passed on as adjustable input tax by the unregistered buyer. For Third Schedule items (such as tea, soaps, detergents, aerated waters), the tax invoice must print the Retail Price inclusive of sales tax.',
    cross_references: ['Third Schedule (Retail Price)', 'Fifth Schedule (Zero-Rating)', 'Sixth Schedule (Exemptions)', 'S.R.O. 297(I)/2023'],
    key_amendments: 'Amended by Finance Act 2023 raising standard rate from 17% to 18%; further tax rate increased to 4%.'
  },
  {
    id: 'sta-sec-7',
    act_type: 'Sales Tax Act, 1990',
    chapter: 'Chapter II: Scope and Payment of Tax',
    section: 'Section 7',
    title: 'Determination of Tax Liability & Credit Mechanism',
    description: 'For the purpose of determining his tax liability in respect of taxable supplies made during a tax period, a registered person shall be entitled to deduct input tax paid or payable during the tax period for the purpose of taxable supplies made or to be made by him from the output tax that is due from him in respect of that tax period and to have an adjustment or refund of input tax.',
    sub_sections: [
      'Section 7(1): Core input tax adjustment entitlement against output tax on taxable supplies.',
      'Section 7(2): Conditions for claiming input credit (valid tax invoice, goods declaration, CPR, supplier active status).',
      'Section 7(3): Apportionment of input tax where goods are used for both taxable and exempt supplies.',
      'Section 7(4): Disallowance of input credit where sales tax invoice is not verifiable on FBR IRIS computerized portal.'
    ],
    practical_notes: 'Input tax credit is allowable only if supported by a valid tax invoice bearing the supplier\'s NTN/STRN, description, value, and tax amount. Furthermore, the supplier must have declared the invoice in Annexure-C of their monthly return and remitted the output tax under SRO 350(I)/2024.',
    cross_references: ['Section 8 (Inadmissibility)', 'Section 73 (Banking Channel)', 'Rule 25 (Apportionment Formula)'],
    key_amendments: 'Coupled with S.R.O. 350(I)/2024 to introduce real-time supply chain ledger validation.'
  },
  {
    id: 'sta-sec-8',
    act_type: 'Sales Tax Act, 1990',
    chapter: 'Chapter II: Scope and Payment of Tax',
    section: 'Section 8',
    title: 'Tax Inadmissibility / Inadmissible Input Tax',
    description: 'Notwithstanding anything contained in this Act, a registered person shall not be entitled to recover or deduct input tax paid on: (a) goods or services not used for the manufacture or production of taxable goods; (b) extra-commercial considerations; (c) fake or flying invoices; (ca) goods or services in respect of which sales tax has not been deposited in the government treasury by the supplier; (d) vehicles, office equipment, foods, beverages; (m) transactions where payment is not made via banking channel as prescribed under Section 73.',
    sub_sections: [
      'Section 8(1)(a): Non-business or non-taxable supply usage.',
      'Section 8(1)(ca): Purchases from suppliers who defaulted on output tax deposit (subject to landmark Supreme Court 2023 PTD 1450 relief).',
      'Section 8(1)(f): Building materials, cement, tiles used in civil works unless specified.',
      'Section 8(1)(h): Goods and services declared non-deductible by FBR through official SRO notifications.',
      'Section 8(1)(m): Purchases paid via cash exceeding PKR 50,000 in violation of Section 73.'
    ],
    practical_notes: 'This is the most heavily litigated section in FBR audit notices. When replying to Section 8(1)(ca) notices, cite 2023 PTD 1450 (SC) to establish bona fide purchaser rights where genuine banking instrument proof and stock physical receipt exist.',
    cross_references: ['Section 8B', 'Section 73', 'S.R.O. 490(I)/2004', '2023 PTD 1450'],
    key_amendments: 'Section 8(1)(ca) continuously scrutinized by High Courts regarding prospective vs retrospective supplier suspension.'
  },
  {
    id: 'sta-sec-8b',
    act_type: 'Sales Tax Act, 1990',
    chapter: 'Chapter II: Scope and Payment of Tax',
    section: 'Section 8B',
    title: 'Adjustable Input Tax (90% Cap Rule)',
    description: 'Notwithstanding anything contained in this Act, a registered person shall not be allowed to adjust input tax in respect of a tax period in excess of ninety per cent of the output tax for that tax period. Provided that the restriction shall not apply to persons excluded by the Federal Board of Revenue by notification in the official Gazette.',
    sub_sections: [
      'Section 8B(1): 90% cap on total output tax adjustment in a single monthly tax period.',
      'Section 8B(2): 10% minimum tax liability must be deposited in cash/treasury even if excess input credit exists.',
      'Section 8B(3): Excess unadjusted input tax (10% or more) carried forward to the subsequent tax period.',
      'Section 8B(4): Yearly reconciliation and refund mechanism for accumulated carried-forward input tax.'
    ],
    practical_notes: 'Exempted sectors under SRO 1190(I)/2019 include Tier-1 Retailers integrated with FBR POS, exporters, manufacturers of fertilizer, oil marketing companies, and companies whose input tax exceeds output due to fixed zero-rated export ratios.',
    cross_references: ['S.R.O. 1190(I)/2019', 'Section 10 (Refunds)', '2022 SCMR 891'],
    key_amendments: 'SRO 1190(I)/2019 updated periodically to include corporate manufacturers with verified export ledgers.'
  },
  {
    id: 'sta-sec-10',
    act_type: 'Sales Tax Act, 1990',
    chapter: 'Chapter II: Scope and Payment of Tax',
    section: 'Section 10',
    title: 'Refund of Input Tax & FASTER Processing',
    description: 'If the input tax paid by a registered person on purchases made during a tax period exceeds the output tax due, or where input tax is related to zero-rated supplies made under Section 4 or the Fifth Schedule, the amount of input tax shall be refunded to the registered person within forty-five days of the filing of refund claim.',
    sub_sections: [
      'Section 10(1): Right to refund for zero-rated export supplies and carried-forward unadjusted input tax.',
      'Section 10(2): FASTER (Fully Automated Sales Tax e-Refund) electronic processing without human intervention within 72 hours for exporters.',
      'Section 10(3): Limitation period: Claim must be lodged within 120 days from filing of return.',
      'Section 10(5): Post-refund audit and recovery of inadmissible refund amounts with default surcharge under Section 34.'
    ],
    practical_notes: 'Refund processing for exporters is automated via FASTER. Any discrepancy in Annexure-H (Raw material consumption summary) will automatically transfer the claim from the green channel to the red channel (Audit Officer scrutiny).',
    cross_references: ['Sales Tax Rules 2006 Chapter V (Refunds)', 'Fifth Schedule', 'Section 34 (Default Surcharge)'],
    key_amendments: 'FASTER system upgraded with risk-based profiling under S.R.O. 888(I)/2020.'
  },
  {
    id: 'sta-sec-11',
    act_type: 'Sales Tax Act, 1990',
    chapter: 'Chapter III: Assessment and Recovery',
    section: 'Section 11',
    title: 'Assessment of Tax & Show Cause Notice',
    description: 'Where a person who is required to file a tax return fails to file the return, or where a return filed is incorrect or incomplete, or where tax has not been paid, short-paid, or erroneously refunded, an officer of Inland Revenue shall make an assessment of tax and determine the tax liability after issuing a Show Cause Notice specifying the grounds and affording reasonable opportunity of being heard.',
    sub_sections: [
      'Section 11(1): Best judgment assessment for non-filing of monthly sales tax returns.',
      'Section 11(2): Assessment for short-payment, non-payment, or input tax discrepancy found upon audit.',
      'Section 11(3): Erroneous refund recovery through statutory show cause notice.',
      'Section 11(5): Limitation period: Show cause notice must be issued within five years from the end of the financial year in which the relevant tax period falls.',
      'Section 11(6): Mandatory time frame of 120 days to pass an assessment order after notice issuance.'
    ],
    practical_notes: 'A Section 11 notice issued without confronting the taxpayer with specific documentary evidence or without conducting an audit under Section 25 is legally defective. Always verify if the 5-year limitation period has expired.',
    cross_references: ['Section 25 (Audit)', 'Section 45B (Appeals)', '2024 PTD (Trib.) 412'],
    key_amendments: 'Finance Act 2022 mandated 120 days outer timeline for finalizing orders to curb arbitrary delays.'
  },
  {
    id: 'sta-sec-13',
    act_type: 'Sales Tax Act, 1990',
    chapter: 'Chapter II: Scope and Payment of Tax',
    section: 'Section 13',
    title: 'Exemption of Goods (Sixth Schedule)',
    description: 'Notwithstanding anything contained in this Act, supply of goods or import of goods specified in the Sixth Schedule shall be exempt from sales tax subject to such conditions as the Federal Government may specify. No input tax adjustment shall be admissible on purchases related to exempt supplies.',
    sub_sections: [
      'Section 13(1): Statutory exemption for goods listed in the Sixth Schedule Table-1 (Imports and Local Supplies) and Table-2 (Local Supplies only).',
      'Section 13(2): Federal Government emergency exemption powers for humanitarian, disaster, or national defense grounds.',
      'Section 13(3): Complete prohibition on claiming input tax credit against exempt supplies (requires Rule 25 Apportionment).'
    ],
    practical_notes: 'Exemption (0% without input credit) is fundamentally different from Zero-Rating under Section 4 / 5th Schedule (0% with full input refund). If an enterprise makes both exempt and taxable supplies, apportionment under Rule 25 is mandatory.',
    cross_references: ['Sixth Schedule Tables 1 & 2', 'Fifth Schedule (Zero-Rating)', 'Rule 25 (Sales Tax Rules 2006)'],
    key_amendments: 'Multiple items removed from 6th Schedule and shifted to 18% standard rate under IMF structural reform bills.'
  },
  {
    id: 'sta-sec-21',
    act_type: 'Sales Tax Act, 1990',
    chapter: 'Chapter IV: Registration and De-registration',
    section: 'Section 21',
    title: 'De-registration, Blacklisting and Suspension of Registration',
    description: 'The Commissioner may, after making such inquiry as he may deem fit, suspend the registration of a registered person or blacklist him who is suspected of issuing fake invoices or non-payment of tax, or who refuses to grant access to premises or records.',
    sub_sections: [
      'Section 21(1): Suspension of STRN during ongoing inquiry with immediate freezing of input tax credit on IRIS portal.',
      'Section 21(2): Blacklisting after providing notice in writing and hearing opportunity.',
      'Section 21(3): Legal bar on downstream buyers claiming input credit from blacklisted/suspended supplier from date of suspension order.'
    ],
    practical_notes: 'Suspension orders passed ex-parte without prior show cause notice violate natural justice and Section 24A of the General Clauses Act. High Courts have repeatedly set aside unilateral blacklisting (2021 PTD 1883).',
    cross_references: ['Sales Tax Rules 2006 Rule 12', 'Section 8(1)(ca)', '2023 PTD 1450'],
    key_amendments: 'FBR automated real-time risk engines now trigger temporary suspension upon non-filing for two consecutive months.'
  },
  {
    id: 'sta-sec-26',
    act_type: 'Sales Tax Act, 1990',
    chapter: 'Chapter V: Returns',
    section: 'Section 26',
    title: 'Monthly Return Filing (Annexure A, C, F)',
    description: 'Every registered person shall furnish not later than the 15th day of each month a true, correct and properly verified return in the prescribed form to a designated bank or electronically on FBR IRIS portal.',
    sub_sections: [
      'Section 26(1): Payment of tax due by 15th of the month and electronic return submission by 18th of the month.',
      'Section 26(3): Filing of Revised Return with Commissioner approval or within 120 days for depositing short-paid tax.',
      'Section 26(5): Special return requirements for withholding agents and non-resident digital services.'
    ],
    practical_notes: 'Taxpayers must ensure their sales invoices (Annexure-C) are uploaded prior to the 10th of the month so that buyers can verify and claim input tax (Annexure-A) by the 18th under S.R.O. 350(I)/2024.',
    cross_references: ['Sales Tax Rules 2006 Rule 14', 'Section 33(1) Penalty', 'S.R.O. 350(I)/2024'],
    key_amendments: 'Annexure-H raw material reconciliation made prerequisite for export refund generation.'
  },
  {
    id: 'sta-sec-73',
    act_type: 'Sales Tax Act, 1990',
    chapter: 'Chapter X: Miscellaneous',
    section: 'Section 73',
    title: 'Restriction on Certain Transactions (Banking Channel Mandate)',
    description: 'Notwithstanding anything contained in this Act, payment for transactions involving all supplies exceeding fifty thousand rupees (PKR 50,000) shall be made by a crossed banking instrument drawn on the buyer’s specified business bank account to the seller’s specified business bank account.',
    sub_sections: [
      'Section 73(1): Payment via crossed cheque, pay order, demand draft or digital bank transfer.',
      'Section 73(2): Disallowance of input tax credit to the buyer if payment is made in cash or from un-notified personal bank account.',
      'Section 73(3): 180-day limitation: If payment is not cleared through banking channel within 180 days of invoice date, input tax must be reversed and surrendered to government.'
    ],
    practical_notes: 'Both buyer and seller bank accounts must be declared on FBR IRIS profile. Payment from a director\'s personal account for a company purchase is non-compliant and triggers Section 8(1)(m) disallowance.',
    cross_references: ['Section 8(1)(m)', '2023 CLD 1104 LHC', 'Income Tax Ordinance 2001 Sec 21(l)'],
    key_amendments: 'Digital online banking transfers officially integrated under State Bank of Pakistan RAAST mechanism.'
  }
];

export const CASE_LAWS: CaseLawItem[] = [
  {
    id: 'case-2023-ptd-1450',
    citation: '2023 PTD 1450 SC',
    title: 'Messrs Premier Industrial Chemicals Ltd vs Commissioner Inland Revenue',
    court: 'Supreme Court of Pakistan',
    year: 2023,
    summary: 'The taxpayer purchased raw chemicals from a registered supplier who was active on FBR ATL at the time of transaction. Two years later, FBR blacklisted the supplier retrospectively and issued show-cause notice to the taxpayer to recover input tax under Section 8(1)(ca).',
    key_holding: 'The Supreme Court held that a bona fide buyer who acted with due diligence, possessed genuine sales tax invoices, verified the supplier\'s active status on date of supply, and made payment through banking channels under Section 73 cannot be penalized for subsequent retrospective default or fraud committed by the supplier.',
    appellant: 'Messrs Premier Industrial Chemicals Ltd',
    respondent: 'Commissioner Inland Revenue (Appeals), Lahore',
    relevant_sections: 'Section 8(1)(ca), Section 7, Section 73',
    keywords: ['Input tax disallowance', 'Retrospective blacklisting', 'Bona fide purchaser', 'Section 73 banking channel', 'Due diligence']
  },
  {
    id: 'case-2022-scmr-891',
    citation: '2022 SCMR 891 SC',
    title: 'Commissioner Inland Revenue (LTU) vs Messrs Orient Textile Mills Ltd',
    court: 'Supreme Court of Pakistan',
    year: 2022,
    summary: 'Litigation concerning whether composite industrial units engaged in both local supplies and 5th Schedule zero-rated export supplies are subject to the 90% input tax adjustment ceiling under Section 8B.',
    key_holding: 'The Supreme Court held that the 90% restriction in Section 8B does not apply to the portion of input tax attributable to zero-rated exports. Imposing Section 8B on export input tax frustrates the core legislative intent of zero-rating under Section 4 and international trade competitiveness.',
    appellant: 'Commissioner Inland Revenue, Large Taxpayers Unit',
    respondent: 'Messrs Orient Textile Mills Ltd',
    relevant_sections: 'Section 8B, Section 4, Section 10, SRO 1190(I)/2019',
    keywords: ['Section 8B 90% limit', 'Zero-rated exports', 'Carried forward input', 'Textile export processing', 'Fifth Schedule']
  },
  {
    id: 'case-2021-ptd-2012',
    citation: '2021 PTD 2012 SHC',
    title: 'Lucky Cement Limited & Others vs Federation of Pakistan',
    court: 'Sindh High Court',
    year: 2021,
    summary: 'Constitutional challenge against the levy of 3% (now 4%) Further Tax under Section 3(1A) of the Sales Tax Act, 1990 on supplies made to unregistered persons.',
    key_holding: 'The High Court upheld the constitutional vires of Section 3(1A), holding that Further Tax is a legitimate statutory incentive mechanism enacted by Parliament to document the national economy and discourage unregistered wholesale distribution channels.',
    appellant: 'Lucky Cement Limited & Others',
    respondent: 'Federation of Pakistan through Secretary Revenue Division',
    relevant_sections: 'Section 3(1A), Section 3(1), Constitution of Pakistan Article 18',
    keywords: ['Further tax 4%', 'Unregistered persons', 'Documentation of economy', 'Equal protection of law', 'Cement manufacturing']
  },
  {
    id: 'case-2023-cld-1104',
    citation: '2023 CLD 1104 LHC',
    title: 'Packages Limited vs Deputy Commissioner Inland Revenue',
    court: 'Lahore High Court',
    year: 2023,
    summary: 'Tax department disallowed input tax credit on purchases where electronic RTGS / online fund transfer was used instead of physical paper crossed cheque under Section 73.',
    key_holding: 'The High Court held that electronic funds transfer through SBP-authorized clearing mechanisms (RTGS / Inter-bank transfer) fulfills the substantial legal mandate of Section 73 as it leaves an unalterable audit trail in banking channels.',
    appellant: 'Packages Limited',
    respondent: 'Deputy Commissioner Inland Revenue (Audit), Lahore',
    relevant_sections: 'Section 73, Section 8(1)(m), Section 22',
    keywords: ['Section 73 banking channel', 'RTGS digital transfer', 'Input tax admissibility', 'Substantial compliance', 'Audit trail']
  },
  {
    id: 'case-2024-ptd-412',
    citation: '2024 PTD (Trib.) 412 ATIR',
    title: 'Al-Karam Textile Mills vs Assistant Commissioner Inland Revenue',
    court: 'Appellate Tribunal Inland Revenue (ATIR)',
    year: 2024,
    summary: 'Assessing Officer initiated assessment under Section 11 without conducting an audit under Section 25 or pointing out any specific suppressed sales in monthly returns.',
    key_holding: 'The Appellate Tribunal held that Section 11 cannot be invoked on mere whims or generalized assumptions. Confronting the taxpayer with specific tangible incriminating evidence gathered during statutory audit under Section 25 is a condition precedent for raising demand.',
    appellant: 'Al-Karam Textile Mills Ltd',
    respondent: 'ACIR Audit-02, Corporate Zone Karachi',
    relevant_sections: 'Section 11, Section 25, Section 45B, Section 46',
    keywords: ['Section 11 assessment', 'Section 25 audit requirement', 'Tangible evidence', 'Vague show cause notice', 'ATIR precedent']
  },
  {
    id: 'case-2024-scmr-305',
    citation: '2024 SCMR 305 SC',
    title: 'Federal Board of Revenue vs Tariq Glass Industries Limited',
    court: 'Supreme Court of Pakistan',
    year: 2024,
    summary: 'Dispute over input tax adjustment on structural steel, cement, and electrical transformers installed inside an industrial factory premises.',
    key_holding: 'The Supreme Court held that while building materials for general civil structures are disallowed under Section 8(1)(f), dedicated plant equipment, furnaces, and transformers directly integral to manufacturing process qualify as \'plant and machinery\' eligible for input tax credit.',
    appellant: 'Federal Board of Revenue',
    respondent: 'Tariq Glass Industries Limited',
    relevant_sections: 'Section 8(1)(a), Section 8(1)(f), Section 2(44)',
    keywords: ['Plant and machinery', 'Building materials disallowance', 'Industrial furnace', 'Input tax credit', 'Manufacturing integration']
  }
];

export const SRO_COLLECTION: SROItem[] = [
  {
    id: 'sro-350-2024',
    number: 'S.R.O. 350(I)/2024',
    title: 'Electronic Invoicing Integration, Balance Sheet Filings & Input Tax Validation Rules',
    year: 2024,
    category: 'SRO',
    description: 'Introduces rigorous conditions for monthly sales tax return filing. Mandates that registered persons cannot file Annexure-C (Sales) unless suppliers have declared supplies, sets ratio thresholds linked with declared business capital/balance sheets, and requires biometric and digital sales invoicing verification.',
    effective_date: '2024-03-07',
    status: 'In Force',
    issuing_authority: 'Federal Board of Revenue (FBR)',
    pdf_reference: 'FBR SRO 350(I)/2024 Notification'
  },
  {
    id: 'sro-297-2023',
    number: 'S.R.O. 297(I)/2023',
    title: 'Sales Tax Withholding Rules & Deduction at Source Rates',
    year: 2023,
    category: 'SRO',
    description: 'Consolidated withholding tax rules governing deduction of sales tax by withholding agents (Federal/Provincial Government departments, autonomous bodies, public sector entities, companies, and large exporters). Prescribes 1/5th withholding on standard supplies, whole amount on unregistered suppliers, and 5% on advertisement services.',
    effective_date: '2023-03-08',
    status: 'In Force',
    issuing_authority: 'Federal Board of Revenue (FBR)',
    pdf_reference: 'Sales Tax Special Procedure (Withholding) Rules'
  },
  {
    id: 'sro-1190-2019',
    number: 'S.R.O. 1190(I)/2019',
    title: 'Exclusion of Specified Sectors from Section 8B (90% Input Tax Limitation)',
    year: 2019,
    category: 'SRO',
    description: 'Provides relief from Section 8B 90% restriction to designated corporate sectors including Tier-1 retailers integrated with FBR POS, registered oil marketing companies, fertilizer manufacturers, LNG importers, and corporate entities whose export ratio exceeds 50% of total turnover.',
    effective_date: '2019-10-02',
    status: 'In Force',
    issuing_authority: 'Federal Board of Revenue (FBR)',
    pdf_reference: 'Section 8B Relief Schedule'
  },
  {
    id: 'stgo-01-2024',
    number: 'STGO 01/2024',
    title: 'Standard Operating Procedures for Point of Sale (POS) Integration & Tier-1 Retail Audit',
    year: 2024,
    category: 'STGO',
    description: 'Operational guidelines for Regional Tax Offices (RTOs) to inspect, monitor, and enforce real-time electronic invoice generation for all shopping malls, retail chains, bakeries, and restaurants categorized under Tier-1 Retailers.',
    effective_date: '2024-01-15',
    status: 'In Force',
    issuing_authority: 'Member Inland Revenue (Operations), FBR',
    pdf_reference: 'POS Monitoring Manual'
  },
  {
    id: 'stgo-07-2023',
    number: 'STGO 07/2023',
    title: 'Disconnection of Electricity & Gas Connections of Unregistered Tier-1 Retailers',
    year: 2023,
    category: 'STGO',
    description: 'Directives to DISCOs (IESCO, LESCO, K-Electric) and Gas Utilities (SNGPL, SSGC) to immediately disconnect utility meters of commercial entities who fail to obtain Sales Tax Registration or integrate with FBR POS system after statutory notice.',
    effective_date: '2023-08-20',
    status: 'In Force',
    issuing_authority: 'Federal Board of Revenue (FBR)',
    pdf_reference: 'Utility Disconnection Orders'
  },
  {
    id: 'circular-04-2024',
    number: 'Circular No. 04 of 2024',
    title: 'Clarification on Input Tax Credit against Provincial Sales Tax on Services (Single Portal)',
    year: 2024,
    category: 'Circular',
    description: 'Clarifies the cross-input tax adjustment mechanism between Federal Sales Tax on Goods (FBR) and Provincial Sales Tax on Services (PRA Punjab, SRB Sindh, KPRA, BRA) under the Single National Sales Tax Return portal.',
    effective_date: '2024-04-12',
    status: 'In Force',
    issuing_authority: 'FBR Legal & Inland Revenue Policy Wing',
    pdf_reference: 'National Single Return Clarification'
  },
  {
    id: 'circular-01-2023',
    number: 'Circular No. 01 of 2023',
    title: 'Guidelines on Statutory Show Cause Notices under Section 11 & Right of Personal Hearing',
    year: 2023,
    category: 'Circular',
    description: 'Mandates all Commissioners of Inland Revenue to ensure that show cause notices clearly articulate the specific statutory contraventions, disclose all relied-upon third-party documents, and offer at least 15 days for written response with a fixed personal hearing schedule.',
    effective_date: '2023-01-10',
    status: 'In Force',
    issuing_authority: 'Federal Board of Revenue (FBR)',
    pdf_reference: 'Natural Justice Compliance Directives'
  }
];

export const TAX_PROBLEMS: TaxProblemItem[] = [
  {
    id: 'prob-rule-25-apportionment',
    section_id: 'Section 8 read with Rule 25',
    topic: 'Apportionment of Residual Input Tax between Taxable, Zero-Rated and Exempt Supplies',
    difficulty_level: 'Advanced / Corporate',
    statutory_ref: 'Sales Tax Act 1990 Sec 8(2) read with Sales Tax Rules 2006 Rule 25',
    scenario: `Indus Manufacturing Ltd during the tax period July 2024 incurred residual (common) input tax of PKR 1,800,000 on electricity, gas, general maintenance, and warehouse logistics.
Their turnover breakdown for the month is:
1. Local Taxable Supplies (Standard 18%): PKR 20,000,000
2. Zero-Rated Export Supplies (5th Schedule): PKR 10,000,000
3. Exempt Local Supplies (6th Schedule): PKR 5,000,000
Total Combined Turnover: PKR 35,000,000.

Determine the admissible input tax deductible against local output tax, the input tax refundable against exports, and the inadmissible input tax to be charged to the Profit & Loss statement.`,
    calculation_steps: [
      {
        step: 1,
        title: 'Calculate Input Tax Attributable to Local Taxable Supplies',
        computation: 'Formula: (Local Taxable Turnover / Total Turnover) × Residual Input Tax\n= (PKR 20,000,000 / PKR 35,000,000) × PKR 1,800,000 = PKR 1,028,571',
        statutory_reason: 'Admissible as adjustable input tax under Section 7 against monthly output tax.'
      },
      {
        step: 2,
        title: 'Calculate Input Tax Attributable to Zero-Rated Export Supplies',
        computation: 'Formula: (Zero-Rated Export Turnover / Total Turnover) × Residual Input Tax\n= (PKR 10,000,000 / PKR 35,000,000) × PKR 1,800,000 = PKR 514,286',
        statutory_reason: 'Admissible for cash refund under Section 10 through FASTER computerized system.'
      },
      {
        step: 3,
        title: 'Calculate Inadmissible Input Tax on Exempt Supplies',
        computation: 'Formula: (Exempt Turnover / Total Turnover) × Residual Input Tax\n= (PKR 5,000,000 / PKR 35,000,000) × PKR 1,800,000 = PKR 257,143',
        statutory_reason: 'Inadmissible under Section 8(1)(a) & Section 13; must be added back and expensed out in accounts.'
      }
    ],
    solution: `Summary of Apportionment for Tax Period:
- Output Tax on Local Supplies (18% of 20M): PKR 3,600,000
- Less: Admissible Input Tax (Apportioned): (PKR 1,028,571)
- Net Sales Tax Payable with Return: PKR 2,571,429
- Sales Tax Refund Claimable on Exports (Annex-H): PKR 514,286
- Inadmissible Input (P&L Expense): PKR 257,143`,
    practical_takeaways: [
      'Residual input tax must be apportioned monthly on IRIS Annexure-B.',
      'Exempt supplies under Sixth Schedule strictly disallow input tax recovery.',
      'Zero-rated exports entitle the taxpayer to 100% refund of the apportioned input share.'
    ]
  },
  {
    id: 'prob-sec-8b-calculation',
    section_id: 'Section 8B',
    topic: 'Section 8B 90% Input Tax Ceiling vs Minimum 10% Cash Deposit',
    difficulty_level: 'Intermediate',
    statutory_ref: 'Sales Tax Act 1990 Section 8B(1) & (2)',
    scenario: `Apex Engineering (Pvt) Ltd (not covered under SRO 1190(I)/2019 exemption) has the following figures for October 2024:
- Output Tax on Taxable Supplies: PKR 4,000,000
- Total verified input tax available for the month: PKR 3,800,000.

Calculate the maximum allowable input tax adjustment, the net sales tax payable in cash with the return, and the amount of input credit carried forward to the next month.`,
    calculation_steps: [
      {
        step: 1,
        title: 'Determine 90% Output Tax Ceiling under Section 8B',
        computation: '90% of Output Tax = 0.90 × PKR 4,000,000 = PKR 3,600,000',
        statutory_reason: 'Section 8B(1) restricts maximum adjustment to 90% of output tax in any given month.'
      },
      {
        step: 2,
        title: 'Compute Net Sales Tax Payable in Cash (10% Minimum)',
        computation: 'Output Tax (PKR 4,000,000) - Maximum Allowable Input (PKR 3,600,000) = PKR 400,000',
        statutory_reason: 'Taxpayer must deposit at least 10% of output tax (PKR 400,000) into National Bank via CPR.'
      },
      {
        step: 3,
        title: 'Calculate Carried Forward Unadjusted Input Credit',
        computation: 'Total Available Input (PKR 3,800,000) - Utilized Input (PKR 3,600,000) = PKR 200,000',
        statutory_reason: 'Section 8B(3) permits carrying forward the unadjusted PKR 200,000 to the subsequent tax period.'
      }
    ],
    solution: `Tax Computation:
- Gross Output Tax: PKR 4,000,000
- Allowable Input Adjustment (capped at 90%): PKR 3,600,000
- Net Tax Payable with Monthly Return (CPR): PKR 400,000
- Carried Forward Input Credit to November: PKR 200,000`,
    practical_takeaways: [
      'Even if a business has huge accumulated input credits, 10% cash payment is mandatory unless exempted under SRO 1190(I)/2019.',
      'Carried forward amounts are tracked in the electronic ledger on IRIS.'
    ]
  },
  {
    id: 'prob-further-tax-unregistered',
    section_id: 'Section 3(1A)',
    topic: 'Further Tax (4%) on Unregistered Buyers & Sales Tax Withholding',
    difficulty_level: 'Basic',
    statutory_ref: 'Sales Tax Act 1990 Sec 3(1A) & S.R.O. 297(I)/2023',
    scenario: `Shahbaz Steel Mills (Registered Manufacturer) sells steel bars valuing PKR 1,500,000 to an unregistered commercial trader in Rawalpindi.
Calculate:
1. Standard Sales Tax @ 18%
2. Further Tax @ 4% under Section 3(1A)
3. Sales Tax Withholding to be deducted by the company under S.R.O. 297(I)/2023
4. Total invoice value payable by the buyer.`,
    calculation_steps: [
      {
        step: 1,
        title: 'Calculate Standard Sales Tax (18%)',
        computation: 'PKR 1,500,000 × 18% = PKR 270,000',
        statutory_reason: 'Charged under Section 3(1) of Sales Tax Act 1990.'
      },
      {
        step: 2,
        title: 'Calculate Further Tax (4%) on Unregistered Person',
        computation: 'PKR 1,500,000 × 4% = PKR 60,000',
        statutory_reason: 'Charged under Section 3(1A) on supplies to non-registered persons.'
      },
      {
        step: 3,
        title: 'Total Gross Sales Tax & Invoice Value',
        computation: 'Base Value: PKR 1,500,000 + Standard ST: PKR 270,000 + Further Tax: PKR 60,000 = PKR 1,830,000',
        statutory_reason: 'Full amount must be collected and deposited in treasury.'
      }
    ],
    solution: `Invoice Structure:
- Value of Goods: PKR 1,500,000
- Sales Tax @ 18%: PKR 270,000
- Further Tax @ 4%: PKR 60,000
- Total Invoice Billing Amount: PKR 1,830,000
- Note: The unregistered buyer cannot claim any input tax credit for either the 18% or the 4% further tax.`,
    practical_takeaways: [
      'Further Tax is charged only on taxable supplies made to unregistered buyers.',
      'Further tax does not apply on retail goods specified in Third Schedule or zero-rated goods in Fifth Schedule.'
    ]
  },
  {
    id: 'prob-sec-73-banking-violation',
    section_id: 'Section 73',
    topic: 'Section 73 Banking Channel Non-Compliance & Section 33 Penalties',
    difficulty_level: 'Intermediate',
    statutory_ref: 'Sales Tax Act 1990 Sec 73 read with Sec 8(1)(m) and Sec 33(16)',
    scenario: `A registered yarn dealer purchased raw polyester yarn valuing PKR 800,000 with sales tax of PKR 144,000 (18%).
The accountant paid the vendor PKR 944,000 in cash in two installments of PKR 472,000 on the same date.
During FBR desk audit, the Assessing Officer issued a notice under Section 11 to disallow the input credit and impose penalty.
Analyze the statutory implications and calculate the tax demand.`,
    calculation_steps: [
      {
        step: 1,
        title: 'Test Compliance with Section 73 Threshold',
        computation: 'The aggregate supply value is PKR 800,000, which exceeds the PKR 50,000 statutory limit for single transaction/supply.',
        statutory_reason: 'Splitting payment into cash installments does not circumvent Section 73 banking channel mandate.'
      },
      {
        step: 2,
        title: 'Disallowance of Input Tax Credit under Section 8(1)(m)',
        computation: 'Input Tax to be recovered = PKR 144,000',
        statutory_reason: 'Under Section 8(1)(m), input tax paid via cash for transactions over PKR 50,000 is strictly inadmissible.'
      },
      {
        step: 3,
        title: 'Penalty Calculation under Section 33 Serial 16',
        computation: 'Penalty = Higher of PKR 10,000 or 5% of the tax amount.\n5% of PKR 144,000 = PKR 7,200. Higher amount = PKR 10,000.',
        statutory_reason: 'Section 33 Serial 16 prescribes minimum penalty for Section 73 violations.'
      }
    ],
    solution: `Statutory Determination:
- Inadmissible Input Tax to be deposited back: PKR 144,000
- Default Surcharge under Section 34 (calculated from return date to deposit date)
- Penalty under Section 33(16): PKR 10,000
- Total Principal Recovery: PKR 154,000 (+ Default Surcharge)`,
    practical_takeaways: [
      'All commercial transactions exceeding PKR 50,000 must be paid strictly via crossed banking instrument or authorized digital transfer.',
      'Bank accounts must be explicitly registered on IRIS profiles of both entities.'
    ]
  }
];

export const SALES_TAX_PHASES = [
  {
    id: 'phase-1',
    phase_number: 1,
    title: 'Foundations and Tax Application',
    sections_range: 'Sections 1 to 13',
    description: 'Establishes the fundamental scope of the Sales Tax Act 1990, statutory definitions, charging mechanism, special utility regimes, zero-rated exports, input/output adjustment mechanics, and exemption powers.',
    icon: 'Scale',
    color_theme: 'emerald',
    subsections: [
      {
        id: 'phase-1-sub-1',
        topic: 'Title and Definitions',
        sections: 'Sections 1–2',
        summary: 'Establishes the formal name, territorial jurisdiction, and the comprehensive legal dictionary for all concepts including "goods", "manufacturer", "taxable supply", "input tax", "output tax", and "value of supply".',
        key_provisions: [
          'Section 1: Short title, extent across Pakistan, and commencement dates.',
          'Section 2(14) - Input Tax: Tax levied under this Act on supply of goods to the person or on goods imported by him.',
          'Section 2(20) - Output Tax: Sales tax charged on taxable supplies made by the registered person.',
          'Section 2(33) - Supply: Sale or other transfer of the right to dispose of goods for consideration.',
          'Section 2(46) - Value of Supply: Price inclusive of all federal duties/taxes but excluding the sales tax amount.'
        ],
        practical_notes: 'Understanding Section 2 definitions is foundational. In FBR audits, disputes over whether an activity is a "manufacture" (Sec 2(16)) or a mere trading distribution dictate whether Tier-1 manufacturer status applies.',
        applicable_rules_or_sros: ['Sales Tax Rules 2006 Chapter I', 'Valuation Rulings under Section 2(46)']
      },
      {
        id: 'phase-1-sub-2',
        topic: 'The Core Charging Provision',
        sections: 'Section 3',
        summary: 'Commands sales tax levy at 18% standard ad valorem rate on locally manufactured or imported goods, further tax on unregistered buyers, Third Schedule retail price taxation, and Tier-1 POS integration.',
        key_provisions: [
          'Section 3(1): Standard sales tax rate of 18% ad valorem on taxable supplies and imports.',
          'Section 3(1A): Further tax of 4% on supplies made to persons who have not obtained sales tax registration (Non-STRN buyers).',
          'Section 3(2)(a): Third Schedule items taxed on printed Retail Price (MRP) rather than wholesale invoice value.',
          'Section 3(7): Withholding of sales tax at source by prescribed withholding agents.',
          'Section 3(9): Sales tax collection from Tier-1 Retailers integrated with FBR real-time computerized systems.'
        ],
        practical_notes: 'Further tax under Section 3(1A) cannot be claimed as adjustable input tax by the unregistered buyer. For Third Schedule consumer goods, retail price inclusive of sales tax must be legibly embossed on packaging.',
        applicable_rules_or_sros: ['Third Schedule to STA 1990', 'Sales Tax Withholding Rules', 'SRO 297(I)/2023']
      },
      {
        id: 'phase-1-sub-3',
        topic: 'Special Regimes and Utilities',
        sections: 'Sections 3A–3C',
        summary: 'Special collection mechanisms for natural gas, electricity tariffs, and telecommunication sectors with customized withholding percentages.',
        key_provisions: [
          'Section 3A: Collection of sales tax on natural gas and power generation distribution.',
          'Section 3B: Rates for special industrial utility consumers and CNG stations.',
          'Section 3C: Telecommunication withholding models and digital services integration.'
        ],
        practical_notes: 'Electricity bills of commercial and industrial connections charge extra sales tax under Section 3(9A) if the consumer NTN/STRN is not linked with the DISCO billing portal.',
        applicable_rules_or_sros: ['SRO 647(I)/2007', 'DISCO Energy Tax Regulations']
      },
      {
        id: 'phase-1-sub-4',
        topic: 'Exports and Zero-Rating',
        sections: 'Section 4',
        summary: 'Zero percent (0%) tax rate applied on exports of goods, supplies to diplomatic missions, and items listed in the Fifth Schedule, entitling full refund of input taxes incurred.',
        key_provisions: [
          'Section 4(a): Goods exported out of Pakistan charged at 0% sales tax.',
          'Section 4(b): Supply of stores and provisions for conveyance proceeding to a destination outside Pakistan.',
          'Section 4(c): Supplies specified in the Fifth Schedule (Zero-Rating Schedule).',
          'Section 4(d): Duty and Tax Remission for Exports (DTRE) scheme alignment.'
        ],
        practical_notes: 'Zero-rated suppliers do not charge output tax on export invoices but are legally entitled to refund of 100% of verifiable input tax paid on raw materials via the FASTER system under Section 10.',
        applicable_rules_or_sros: ['Fifth Schedule to STA 1990', 'DTRE Rules 2001', 'FASTER SRO 888(I)/2020']
      },
      {
        id: 'phase-1-sub-5',
        topic: 'Procedural Mechanics',
        sections: 'Sections 5–10',
        summary: 'Change in tax rates, tax maturity timelines, credit and debit notes adjustments, core input tax deduction mechanism (Output - Input), 90% cap (Section 8B), and automated FASTER refunds (Section 10).',
        key_provisions: [
          'Section 5: Change in rate of tax applicable at the time of supply or clearance.',
          'Section 6: Time and manner of payment of sales tax upon delivery or invoice.',
          'Section 7: Core determination of tax liability — deduction of input tax from output tax.',
          'Section 8: Inadmissible input tax (fake invoices, non-business use, cash transactions under Sec 73).',
          'Section 8B: 90% restriction on adjustable input tax in a single monthly return period.',
          'Section 9: Debit and credit notes adjustments for returns, price changes, or cancellations.',
          'Section 10: FASTER e-Refund mechanism within 45 days (or 72 hours for verified export sectors).'
        ],
        practical_notes: 'Section 8(1)(ca) is the primary subject of departmental show-cause notices. Supreme Court precedent (2023 PTD 1450) protects bona fide buyers against retrospective supplier blacklisting if banking proofs exist under Section 73.',
        applicable_rules_or_sros: ['Sales Tax Rules Chapter III (Debit/Credit Notes)', 'SRO 1190(I)/2019 (8B Exemptions)', 'SRO 350(I)/2024']
      },
      {
        id: 'phase-1-sub-6',
        topic: 'Exemptions and Special Sectors',
        sections: 'Sections 11–13',
        summary: 'Power of the Federal Government and Board to notify statutory sales tax exemptions on essential food items, health equipment, agricultural inputs, and specific economic zones under the Sixth Schedule and SROs.',
        key_provisions: [
          'Section 13(1): Exemption from sales tax for goods specified in the Sixth Schedule (Table-1 Imports, Table-2 Local Supplies).',
          'Section 13(2): Power of the Federal Government to grant exemptions during national emergency or economic necessity through SROs.',
          'Section 13(3): Direct humanitarian and disaster relief exemption notifications.'
        ],
        practical_notes: 'Exempt supplies under Section 13 differ drastically from Zero-Rated supplies under Section 4: Input tax on exempt supplies is NOT refundable or adjustable; it must be capitalized or apportioned under Rule 25.',
        applicable_rules_or_sros: ['Sixth Schedule to STA 1990 (Tables 1, 2, 3)', 'Rule 25 (Apportionment of Input Tax)']
      }
    ]
  },
  {
    id: 'phase-2',
    phase_number: 2,
    title: 'Registration Framework',
    sections_range: 'Sections 14 to 21',
    description: 'Encompasses mandatory enrollment requirements, voluntary registrations, branch registrations, e-portal profile management, and stringent penal provisions for suspension and blacklisting.',
    icon: 'Building',
    color_theme: 'blue',
    subsections: [
      {
        id: 'phase-2-sub-1',
        topic: 'Mandatory Enrollment',
        sections: 'Section 14',
        summary: 'Mandatory requirement to obtain Sales Tax Registration Number (STRN) for all manufacturing concerns, importers, commercial exporters, distributors, wholesalers, and Tier-1 retailers.',
        key_provisions: [
          'Section 14(1): Compulsory registration of persons engaged in taxable supplies in Pakistan.',
          'Section 14(2): Mandatory category thresholds (Tier-1 Retailers, industrial power connections).',
          'Section 14(3): Centralized electronic registration on FBR Iris biometric authentication portal.'
        ],
        practical_notes: 'Operating a taxable manufacturing or wholesale business without STRN triggers compulsory registration under Section 14(3), freezing of bank accounts, and penalty under Section 33.',
        applicable_rules_or_sros: ['Sales Tax Rules 2006 Chapter I (Registration)', 'Biometric Verisys Mandate']
      },
      {
        id: 'phase-2-sub-2',
        topic: 'Voluntary and Specialized Registration',
        sections: 'Sections 15–20',
        summary: 'Voluntary registration procedures, multi-branch and sub-unit structures, transfer of registration between Regional Tax Offices (RTOs), and deregistration protocols.',
        key_provisions: [
          'Section 15: Voluntary registration for persons not strictly mandated to enroll.',
          'Section 16: Temporary registration for seasonal and contractual businesses.',
          'Section 17: Registration of separate branches and manufacturing units under single NTN.',
          'Section 18: Transfer of jurisdiction across Chief Commissioners and RTOs.',
          'Section 20: Deregistration process upon cessation of taxable business and audit clearance.'
        ],
        practical_notes: 'Before deregistration is granted under Section 20, the taxpayer must undergo a final closure audit to reconcile all unutilized input tax, stock in hand, and outstanding assessment orders.',
        applicable_rules_or_sros: ['Sales Tax Rules 2006 Chapter II (Deregistration)', 'STGO 01/2022']
      },
      {
        id: 'phase-2-sub-3',
        topic: 'Penal Status: Blacklisting and Suspension',
        sections: 'Section 21',
        summary: 'Freezing, suspension, and blacklisting of sales tax registrations where fraudulent invoices, non-existent business premises, or systematic tax evasion are identified.',
        key_provisions: [
          'Section 21(1): Power of Commissioner to suspend STRN of a non-compliant or missing taxpayer.',
          'Section 21(2): Mandatory 7-day hearing notice prior to formal blacklisting order.',
          'Section 21(3): Complete blocking of sales tax input credit across the entire supply chain upon blacklisting.',
          'Section 21(4): Restoration procedure upon payment of assessed liabilities and physical premises verification.'
        ],
        practical_notes: 'Suspension under Section 21 immediately freezes the taxpayer\'s ability to issue sales tax invoices on Iris. Under SRO 350(I)/2024, buyers cannot adjust invoices issued by suspended suppliers.',
        applicable_rules_or_sros: ['Sales Tax Rules 2006 Rule 12 (Blacklisting Procedure)', 'SRO 350(I)/2024']
      }
    ]
  },
  {
    id: 'phase-3',
    phase_number: 3,
    title: 'Bookkeeping, Invoicing, and Audits',
    sections_range: 'Sections 22 to 30',
    description: 'Specifies mandatory statutory accounts retention, sales tax invoicing standards, electronic fiscal devices/POS integration, official audit scrutiny, and monthly Iris return compliance.',
    icon: 'FileText',
    color_theme: 'purple',
    subsections: [
      {
        id: 'phase-3-sub-1',
        topic: 'Record Retention',
        sections: 'Section 22',
        summary: 'Statutory obligation to maintain comprehensive physical and digital accounts, purchase/sales ledgers, stock registers, and goods inward/outward gate passes for six years.',
        key_provisions: [
          'Section 22(1): Mandatory maintenance of records of supplies made, goods purchased, and stock registers.',
          'Section 22(1A): Retention of electronic Point of Sale (POS) transaction logs.',
          'Section 22(2): Six (6) years statutory retention period from the end of the tax year.',
          'Section 22(3): Requirement to maintain records at the principal place of business registered on Iris.'
        ],
        practical_notes: 'Failure to produce purchase records during audit under Section 25 empowers the tax officer to reject input tax claims and proceed with Best Judgment Assessment under Section 11.',
        applicable_rules_or_sros: ['Sales Tax Rules 2006 Chapter IV', 'Electronic Record Retention Rules']
      },
      {
        id: 'phase-3-sub-2',
        topic: 'Invoicing Standards',
        sections: 'Section 23',
        summary: 'Strict statutory requirements for issuing valid sales tax invoices, serial numbering, STRN/NTN disclosures, buyer CNIC thresholds, and digital QR-code integration.',
        key_provisions: [
          'Section 23(1): Mandatory items on invoice: Serial number, date, supplier name/STRN, recipient name/STRN, description, value, tax rate, and tax amount.',
          'Section 23(1)(b): Requirement of buyer CNIC/NTN for supplies to non-registered persons exceeding PKR 100,000.',
          'Section 23(2): Requirement for Tier-1 Retailers to issue FBR-system verified invoice with scannable QR code.',
          'Section 23(4): E-invoicing and digital invoice integration on FBR central server under SRO 1525(I)/2023.'
        ],
        practical_notes: 'Invoices missing statutory elements (like buyer NTN/STRN or separate tax breakdown) are legally invalid for claiming input tax credit under Section 7 and 8.',
        applicable_rules_or_sros: ['SRO 1525(I)/2023 (Digital Invoicing)', 'SRO 1006(I)/2021 (POS QR Code Rules)']
      },
      {
        id: 'phase-3-sub-3',
        topic: 'Official Audits and Scrutiny',
        sections: 'Sections 25–25A',
        summary: 'Officer powers to conduct annual sales tax audits, call for records, inspect business premises, and appoint independent Chartered Accountant firms for forensic special audits.',
        key_provisions: [
          'Section 25(1): Officer of Inland Revenue access to business premises, stocks, and electronic accounting systems.',
          'Section 25(2): Notice for production of records and explanation of ledger discrepancies.',
          'Section 25(3): Annual limitation on conducting desk/field audit once in three years unless specific evasion detected.',
          'Section 25A: Special Audit conducted by panels of Chartered Accountants or Cost and Management Accountants.'
        ],
        practical_notes: 'Audit observations must culminate in a formal Audit Report. The department cannot issue a Section 11 demand notice without first sharing the audit observations and seeking explanation.',
        applicable_rules_or_sros: ['National Tax Audit Framework', 'FBR Parametric Computerized Balloting']
      },
      {
        id: 'phase-3-sub-4',
        topic: 'Returns and Compliance Tracking',
        sections: 'Sections 26–30',
        summary: 'Monthly electronic return filing on Iris portal by the 15th/18th of each month, Annexure-C/Annexure-A matching, annual returns, and electronic video surveillance.',
        key_provisions: [
          'Section 26: Monthly return filing by 15th of the month following the tax period (payment by 15th, e-filing by 18th).',
          'Section 26(3): Revision of sales tax return with prior Commissioner approval or within 120 days.',
          'Section 27: Special returns called by Commissioner for specific transactions or interim periods.',
          'Section 28: Final annual sales tax return reconciliation.',
          'Section 30: Electronic surveillance, CCTV monitoring of production lines for sugar, cement, tobacco, and beverages.'
        ],
        practical_notes: 'Under SRO 350(I)/2024, if a supplier fails to submit Annexure-C by the 18th, the buyer\'s return in Iris will block the input credit until the supplier files and pays the liability.',
        applicable_rules_or_sros: ['Iris E-Filing Guidelines', 'SRO 350(I)/2024', 'Track & Trace Rules']
      }
    ]
  },
  {
    id: 'phase-4',
    phase_number: 4,
    title: 'Administrative Hierarchy and Enforcement Powers',
    sections_range: 'Sections 30A to 44',
    description: 'Defines the statutory hierarchy of Inland Revenue authorities, adjudication jurisdictions, statutory penalties under Section 33, default surcharges under Section 34, and coercive enforcement powers.',
    icon: 'ShieldCheck',
    color_theme: 'amber',
    subsections: [
      {
        id: 'phase-4-sub-1',
        topic: 'Officer Classifications',
        sections: 'Sections 30A–30B',
        summary: 'Statutory hierarchy of Inland Revenue officers from Chief Commissioners, Commissioners, Additional/Deputy/Assistant Commissioners down to Directorate General of Intelligence & Investigation (I&I).',
        key_provisions: [
          'Section 30: Designation and administrative authority of Inland Revenue officers.',
          'Section 30A: Directorate General of Intelligence and Investigation (Inland Revenue).',
          'Section 30B: Directorate General of Internal Audit and Risk Assessment.',
          'Section 30DD: Directorate General of Digital Invoicing and Electronic Surveillance.'
        ],
        practical_notes: 'Inland Revenue officers must exercise statutory powers within their notified territorial and pecuniary jurisdiction under Section 30 and FBR official notifications.',
        applicable_rules_or_sros: ['FBR Jurisdiction Notifications', 'Delegation of Powers SROs']
      },
      {
        id: 'phase-4-sub-2',
        topic: 'Adjudication and Assessments',
        sections: 'Sections 31–32',
        summary: 'Pecuniary adjudication limits, show-cause notice timelines, and departmental determination of tax evasion and unpaid duties.',
        key_provisions: [
          'Section 31: Adjudication powers distributed according to tax demand amounts (Commissioners vs Deputy Commissioners).',
          'Section 32: Recovery of tax not levied or short-levied by reason of inadvertence, error, or willful evasion.'
        ],
        practical_notes: 'An assessment order passed without issuing a statutory show-cause notice under Section 11/32 is void ab initio and illegal as per Supreme Court jurisprudence.',
        applicable_rules_or_sros: ['Adjudication Rules', 'Statutory Limitation Guidelines']
      },
      {
        id: 'phase-4-sub-3',
        topic: 'Penalties and Default Surcharges',
        sections: 'Sections 33–34',
        summary: 'Comprehensive table of 26 statutory penalty serials under Section 33 for non-filing, invoice suppression, and default surcharge (KIBOR + 3% per annum) under Section 34.',
        key_provisions: [
          'Section 33 Serial 1: Penalty for non-filing of monthly return within due date (PKR 10,000 minimum).',
          'Section 33 Serial 11: Penalty for tax evasion and fraudulent input credit (100% of evaded tax amount).',
          'Section 33 Serial 16: Penalty for cash payments exceeding Section 73 limits (5% of tax or PKR 10,000).',
          'Section 34: Mandatory default surcharge at 12% per annum or KIBOR+3% on overdue sales tax payments.'
        ],
        practical_notes: 'Default surcharge under Section 34 is compensatory in nature and accrues automatically from the statutory due date until the actual date of realization.',
        applicable_rules_or_sros: ['Section 33 Offence Matrix', 'KIBOR Benchmark Notifications']
      },
      {
        id: 'phase-4-sub-4',
        topic: 'Coercive Actions: Seizures, Arrests, and Prosecution',
        sections: 'Sections 37–44',
        summary: 'Drastic coercive powers including search warrants, premises sealing, stock impounding, bank account attachment, asset freezes, arrests, and criminal prosecution.',
        key_provisions: [
          'Section 37: Power to enter and search business premises under Magistrate or Commissioner warrant.',
          'Section 37A: Power to arrest and prosecute persons involved in deliberate tax fraud exceeding statutory thresholds.',
          'Section 38: Authorization of officers to access business premises, stock, and computers.',
          'Section 40: Special audit and seizure of fake invoice records.',
          'Section 40B: Posting of Inland Revenue officers at business premises for live production/sales monitoring.'
        ],
        practical_notes: 'Officer posting under Section 40B requires prior written approval from the Chief Commissioner and can only be sustained during designated operational shifts.',
        applicable_rules_or_sros: ['Criminal Procedure Code (CrPC) Application', 'Section 37A Arrest Guidelines']
      }
    ]
  },
  {
    id: 'phase-5',
    phase_number: 5,
    title: 'Appeals and Dispute Resolution',
    sections_range: 'Sections 45 to 48',
    description: 'Hierarchical appellate framework from Commissioner (Appeals) and Appellate Tribunal Inland Revenue (ATIR) to High Court References, Alternate Dispute Resolution (ADR), and arrear recovery.',
    icon: 'Gavel',
    color_theme: 'indigo',
    subsections: [
      {
        id: 'phase-5-sub-1',
        topic: 'Appellate Tiers',
        sections: 'Sections 45A–46',
        summary: 'First appeal before Commissioner (Appeals) within 30 days of assessment order and second judicial appeal before Appellate Tribunal Inland Revenue (ATIR).',
        key_provisions: [
          'Section 45A: Powers of Board and Commissioner to call for records and exercise revisional jurisdiction.',
          'Section 45B: First appeal to Commissioner Inland Revenue (Appeals) within 30 days of service of order.',
          'Section 45B(1A): Mandatory payment of 10% of disputed tax demand prior to lodging first appeal.',
          'Section 46: Second appeal to Appellate Tribunal Inland Revenue (ATIR) on questions of fact and law.',
          'Section 46(2): Stay of recovery granted by ATIR for maximum period of 180 days.'
        ],
        practical_notes: 'Commissioner (Appeals) must decide the appeal within 120 days. ATIR is the final judicial forum for questions of fact; decisions of ATIR on factual points are final and binding.',
        applicable_rules_or_sros: ['ATIR Rules 2010', 'Appeals Electronic Filing Module']
      },
      {
        id: 'phase-5-sub-2',
        topic: 'Judicial References and Alternative Resolution',
        sections: 'Sections 47–47A',
        summary: 'Reference applications to the High Court on pure questions of law arising from ATIR orders, and Alternate Dispute Resolution (ADR) committee mechanisms.',
        key_provisions: [
          'Section 47: Reference to High Court within 90 days of receipt of ATIR order on substantial questions of law.',
          'Section 47(5): High Court reference must be heard by a bench of not less than two Judges (Division Bench).',
          'Section 47A: Alternate Dispute Resolution (ADR) committee comprising a retired Judge/CA and Chief Commissioner for out-of-court settlements.'
        ],
        practical_notes: 'High Court references under Section 47 cannot re-examine factual findings of ATIR unless shown to be completely perverse or unsupported by evidence.',
        applicable_rules_or_sros: ['High Court Rules & Orders', 'ADRC Notifications under Sec 47A']
      },
      {
        id: 'phase-5-sub-3',
        topic: 'Arrear Recovery',
        sections: 'Section 48',
        summary: 'Coercive recovery of crystallized tax arrears through bank account attachments under Section 48(1)(ca), property attachment, and public auction.',
        key_provisions: [
          'Section 48(1)(a): Deduction from any money owing to the taxpayer by FBR or Customs.',
          'Section 48(1)(ca): Direct notice to banks for immediate debit and transfer of funds from taxpayer bank accounts.',
          'Section 48(1)(d): Attachment and sale of movable and immovable property by auction.',
          'Section 48(1)(f): Appointment of receiver for management of debtor business assets.'
        ],
        practical_notes: 'Departmental recovery under Section 48 cannot be initiated until 30 days have elapsed from the assessment order or while an active stay order from CIR(A) or ATIR is in force.',
        applicable_rules_or_sros: ['Sales Tax Rules 2006 Chapter XI (Recovery)', 'Bank Garnishee Notices']
      }
    ]
  },
  {
    id: 'phase-6',
    phase_number: 6,
    title: 'Miscellaneous and Legal Overarching Rules',
    sections_range: 'Sections 49 to 76',
    description: 'Covers Board rule-making powers, SRO issuance, the mandatory Section 73 crossed banking channel restriction, condonation of statutory limitation delays under Section 74, and concluding provisions.',
    icon: 'Layers',
    color_theme: 'rose',
    subsections: [
      {
        id: 'phase-6-sub-1',
        topic: 'Rule-Making and Exemptions',
        sections: 'Sections 50–60',
        summary: 'Power of the Board to frame statutory rules, forms, computer procedures, service of notices, and special procedure rules.',
        key_provisions: [
          'Section 50: General power of FBR to make rules through official Gazette notifications.',
          'Section 50A: Computerized system regulations and digital audit standards.',
          'Section 56: Service of statutory notices, orders, and electronic delivery into Iris taxpayer inbox.',
          'Section 60: Power of Federal Government to enter into avoidance of double taxation agreements.'
        ],
        practical_notes: 'Notices delivered electronically to the taxpayer\'s registered Iris web portal are legally deemed served under Section 56(1)(d).',
        applicable_rules_or_sros: ['Sales Tax Rules, 2006 (SRO 555(I)/2006)', 'General Clauses Act 1897']
      },
      {
        id: 'phase-6-sub-2',
        topic: 'Banking Channels and Restrictions',
        sections: 'Section 73',
        summary: 'Mandatory statutory restriction requiring all commercial transactions exceeding PKR 50,000 to be paid exclusively through crossed banking instruments or authorized electronic bank transfers.',
        key_provisions: [
          'Section 73(1): Payment for business transactions exceeding PKR 50,000 must be made via crossed cheque, pay order, or direct bank transfer from business account to business account.',
          'Section 73(2): Disallowance of input tax credit on all purchases where payment is made in cash.',
          'Section 73(3): Requirement that both buyer and seller declared bank accounts must be updated on Iris portal.',
          'Section 73(4): 180-day limitation: Payment must be cleared within 180 days of invoice date to retain input admissibility.'
        ],
        practical_notes: 'Section 73 is strictly interpreted by Courts. Even genuine supplies will lose 100% input credit under Section 8(1)(m) if payment is made via cash or bearer cheque.',
        applicable_rules_or_sros: ['Section 8(1)(m)', '2023 PTD 1450 SC', 'Section 33 Serial 16']
      },
      {
        id: 'phase-6-sub-3',
        topic: 'Condonation of Time Limits',
        sections: 'Section 74',
        summary: 'Power of the Federal Board of Revenue or Chief Commissioners to condone delays in filing returns, claiming refunds, lodging appeals, or performing statutory acts.',
        key_provisions: [
          'Section 74: Power of FBR to condone the time limit specified in any provision of the Act or Rules upon sufficient cause shown.',
          'Section 74A: Delegation of condonation powers to Chief Commissioners Inland Revenue.'
        ],
        practical_notes: 'If a taxpayer missed the 120-day deadline for refund or return revision, a formal application under Section 74 citing technical portal downtime or medical urgency must be filed.',
        applicable_rules_or_sros: ['FBR Condonation Policy Guidelines', 'Section 74 Electronic Applications']
      },
      {
        id: 'phase-6-sub-4',
        topic: 'Closing Provisions',
        sections: 'Sections 75–76',
        summary: 'Bar on legal suits against officers acting in good faith, removal of legislative difficulties, and repeal/savings provisions.',
        key_provisions: [
          'Section 75: Indemnity / Bar of suits against government officers for acts done in good faith under the Act.',
          'Section 76: Removal of statutory difficulties during transition of tax laws.',
          'Section 77: Repeal and savings of earlier sales tax enactments.'
        ],
        practical_notes: 'Indemnity under Section 75 protects officers acting within statutory authority, but does not shield arbitrary or malicious assessments from High Court constitutional review under Article 199.',
        applicable_rules_or_sros: ['Constitution of Pakistan Article 199', 'General Clauses Act 1897']
      }
    ]
  }
];
