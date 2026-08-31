import { TaxRuleItem } from '../types';

export const INCOME_TAX_RULES_DATA: TaxRuleItem[] = [
  // =========================================================================
  // CHAPTER I – PRELIMINARY
  // =========================================================================
  {
    id: 'itr-rule-1',
    rule_book: 'Income Tax Rules, 2002',
    chapter: 'Chapter I: Preliminary',
    rule_number: 'Rule 1',
    title: 'Short Title and Commencement',
    description: 'Establishes the formal title of the rules as the Income Tax Rules, 2002, and sets their nationwide commencement date as 1st July, 2002.',
    sub_rules: [
      '(1) These rules may be called the Income Tax Rules, 2002.',
      '(2) They shall come into force on the first day of July, 2002 across all provinces and federally administered areas.'
    ],
    compliance_steps: 'Serves as the foundational regulatory instrument enacted under Section 237 of the Income Tax Ordinance, 2001.',
    practical_notes: 'Where any conflict arises between the Ordinance and these Rules, the substantive provisions of the Income Tax Ordinance, 2001 take legal precedence.',
    cross_references: ['Section 237 (Power to Make Rules)', 'Article 77 of the Constitution']
  },
  {
    id: 'itr-rule-2',
    rule_book: 'Income Tax Rules, 2002',
    chapter: 'Chapter I: Preliminary',
    rule_number: 'Rule 2',
    title: 'Definitions & Interpretation of Key Regulatory Terms',
    description: 'Provides standardized definitions for specialized regulatory terms used throughout the subordinate rules, including digital tokens, electronic portals, and authorized entities.',
    sub_rules: [
      'Defines "Ordinance" as the Income Tax Ordinance, 2001 (XLIX of 2001).',
      'Defines "Form" as any official form or statement prescribed in the First Schedule to these rules.',
      'Defines "Electronic Verification Code" (EVC) and "Electronic Return Intermediary" (ERI) for IRIS web portal authentication.'
    ],
    compliance_steps: 'Refer to Rule 2 whenever interpreting specialized procedural terms not directly defined in Section 2 of the Ordinance.',
    practical_notes: 'All terms not explicitly defined in Rule 2 carry the statutory meanings assigned to them under Section 2 of the Income Tax Ordinance, 2001.',
    cross_references: ['Section 2 (Definitions)', 'Rule 73 (Electronic Filing)']
  },

  // =========================================================================
  // CHAPTER II – DETERMINATION OF INCOME – HEADS OF INCOME
  // PART-1: SALARY (RULES 3 TO 7)
  // =========================================================================
  {
    id: 'itr-rule-3',
    rule_book: 'Income Tax Rules, 2002',
    chapter: 'Chapter II: Heads of Income – Part 1: Salary',
    rule_number: 'Rule 3',
    title: 'Valuation of Perquisites, Allowances and Employee Benefits',
    description: 'Prescribes statutory benchmark formulas to determine the taxable money value of non-cash employee perquisites, domestic staff, utilities, concessionary loans, and employee share schemes.',
    sub_rules: [
      'Rule 3(1): Domestic services (housekeeper, driver, gardener) – Valued at total salary paid by employer less any employee contribution.',
      'Rule 3(2): Utilities (gas, water, electricity) – Valued at actual expense paid by employer less employee reimbursement.',
      'Rule 3(7): Concessionary Loans – Difference between official benchmark interest rate (10% p.a.) and interest actually paid by employee added to salary if principal loan exceeds PKR 1,500,000.',
      'Rule 3(8): Waiver of loan – Total waived principal amount treated as taxable salary in the year of waiver.'
    ],
    valuation_methodology: 'Benchmark formula: Concessionary loan perk = Principal * (10% - Actual Interest Rate).',
    compliance_steps: 'Employers must compute these values monthly and withhold tax under Section 149 accordingly.',
    practical_notes: 'Interest-free loans below PKR 1,500,000 do not trigger any taxable perquisite addition.',
    cross_references: ['Section 12 (Salary)', 'Section 13 (Value of Perquisites)', 'Section 149 (WHT on Salary)']
  },
  {
    id: 'itr-rule-4',
    rule_book: 'Income Tax Rules, 2002',
    chapter: 'Chapter II: Heads of Income – Part 1: Salary',
    rule_number: 'Rule 4',
    title: 'Valuation of Employer-Provided Residential Accommodation',
    description: 'Governs the taxable value of rent-free or subsidized accommodation provided by an employer to an executive or employee.',
    sub_rules: [
      'The value of accommodation shall be the amount that would have been paid by the employer if the accommodation were taken on rent.',
      'Statutory minimum threshold: In no case shall the taxable value be less than 45% of the Minimum Time Scale (MTS) of the basic salary (or basic salary if no MTS is specified).',
      'For subsidized accommodation, subtract the actual rent paid by the employee from the higher of market rent or 45% of basic salary.'
    ],
    valuation_methodology: 'Higher of: Fair Market Rental Value OR 45% of Basic Salary (or Minimum Time Scale).',
    compliance_steps: 'In IRIS salary module, declare accommodation value under Section 13(1) perquisite head.',
    practical_notes: 'If basic salary is PKR 200,000/month, the minimum taxable perquisite for housing is PKR 90,000/month (45%), regardless of lower actual lease cost.',
    cross_references: ['Section 12', 'Section 13(1)']
  },
  {
    id: 'itr-rule-5',
    rule_book: 'Income Tax Rules, 2002',
    chapter: 'Chapter II: Heads of Income – Part 1: Salary',
    rule_number: 'Rule 5',
    title: 'Valuation of Conveyance and Motor Vehicles Provided by Employer',
    description: 'Prescribes the exact percentage addition to taxable salary when an employer provides a company-owned or leased vehicle for official and personal usage.',
    sub_rules: [
      'Rule 5(1): Vehicle used partly for business and partly for personal use – 5% of the vehicle cost (or fair market value if leased) added to annual taxable salary.',
      'Rule 5(2): Vehicle used exclusively for personal/private use – 10% of the vehicle cost (or fair market value if leased) added to taxable salary.',
      'If vehicle is transferred to employee at end of tenure, difference between FMV and employee payment is taxable.'
    ],
    valuation_methodology: '5% of Cost/Lease Value for dual business-personal use; 10% of Cost for exclusive personal use.',
    compliance_steps: 'Include 5% of vehicle capital value in employee taxable salary computations for monthly Section 149 withholding.',
    practical_notes: 'Running fuel and maintenance costs incurred by the employer are already subsumed inside the 5% formula and cannot be separately added.',
    cross_references: ['Section 12', 'Section 13(3)', 'Section 149']
  },
  {
    id: 'itr-rule-6-7',
    rule_book: 'Income Tax Rules, 2002',
    chapter: 'Chapter II: Heads of Income – Part 1: Salary',
    rule_number: 'Rule 6 - 7',
    title: 'Special Provisions Regarding Medical and Supplementary Employee Perquisites',
    description: 'Addresses the tax treatment of supplementary employment benefits, group insurance, and medical expense reimbursements.',
    sub_rules: [
      'Reimbursement of medical expenses is fully exempt if provided pursuant to terms of employment and verified by hospital bills.',
      'Medical allowance is exempt up to 10% of basic salary where free medical treatment or hospitalization coverage is not provided.'
    ],
    compliance_steps: 'Retain written medical policy documentation and NTN-compliant diagnostic receipts in HR records.',
    practical_notes: 'An employee cannot claim both 10% medical allowance exemption and actual hospitalization reimbursement in the same tax year.',
    cross_references: ['Clause 139 of Part I of Second Schedule', 'Section 12']
  },

  // =========================================================================
  // CHAPTER II – PART-2: INCOME FROM BUSINESS (RULES 10 TO 13)
  // =========================================================================
  {
    id: 'itr-rule-10',
    rule_book: 'Income Tax Rules, 2002',
    chapter: 'Chapter II: Heads of Income – Part 2: Income from Business',
    rule_number: 'Rule 10',
    title: 'Entertainment Expenditure Allowability and Statutory Limits',
    description: 'Prescribes the specific business circumstances and ceiling under which corporate entertainment expenditures are tax-deductible under Section 21(d).',
    sub_rules: [
      '(a) Entertainment incurred outside Pakistan in connection with business transactions.',
      '(b) Entertainment allocated to foreign customers and business delegations visiting Pakistan.',
      '(c) Entertainment at business premises of the taxpayer for clients, customers, and partners.',
      '(d) Entertainment at opening of branches, launches, or annual general meetings of shareholders.'
    ],
    valuation_methodology: 'Actual verifiable expenditure backed by valid sales tax invoices and electronic payment proof.',
    compliance_steps: 'Maintain itemized hospitality logs, attendee lists, and digital payment receipts.',
    practical_notes: 'General lavish or personal entertainment is strictly inadmissible under Section 21(d) unless it falls within these four specific gateways.',
    cross_references: ['Section 21(d) of ITO 2001', 'Section 174 (Books of Accounts)']
  },
  {
    id: 'itr-rule-11',
    rule_book: 'Income Tax Rules, 2002',
    chapter: 'Chapter II: Heads of Income – Part 2: Income from Business',
    rule_number: 'Rule 11',
    title: 'Valuation of Agricultural Produce Used as Raw Materials',
    description: 'Sets out the accounting mechanism for valuing self-grown agricultural produce consumed as raw material in an agro-industrial processing business (such as sugar mills, textile ginning, or flour mills).',
    sub_rules: [
      'The market value of agricultural produce at the time of transfer to the processing business shall be treated as an allowable cost of raw materials in computing business profits.',
      'Agricultural income portion remains exempt under Section 41, while the industrial processing profit is charged under Section 18.'
    ],
    valuation_methodology: 'Prevailing wholesale market rate at local mandi/procurement center on date of delivery.',
    compliance_steps: 'Obtain notified market committee rates to substantiate raw material transfer pricing.',
    practical_notes: 'Separation of farm profit from industrial profit protects the agricultural exemption under Section 41.',
    cross_references: ['Section 18 (Business Income)', 'Section 41 (Agricultural Income)']
  },
  {
    id: 'itr-rule-12',
    rule_book: 'Income Tax Rules, 2002',
    chapter: 'Chapter II: Heads of Income – Part 2: Income from Business',
    rule_number: 'Rule 12',
    title: 'Particulars for Claiming Depreciation, Initial Allowance & Amortization',
    description: 'Prescribes the mandatory asset-wise documentation and schedule formats required to claim normal depreciation, initial allowance, and intangibles amortization under Sections 22, 23, and 24.',
    sub_rules: [
      'Asset description, historical cost, acquisition date, and installation/commissioning date.',
      'Written down value (WDV) at start of year, additions during year, disposals/sales, and salvage proceeds.',
      'Depreciation rate applied and calculation of business use proportion where asset is used partly for non-business purposes.'
    ],
    compliance_steps: 'Attach certified Fixed Assets and Depreciation Schedule in IRIS return Annexure.',
    practical_notes: 'Assets acquired without banking channel payment exceeding statutory limits are inadmissible for depreciation deduction.',
    cross_references: ['Section 22 (Depreciation)', 'Section 23 (Initial Allowance)', 'Section 24 (Amortization)', 'Third Schedule']
  },
  {
    id: 'itr-rule-12a',
    rule_book: 'Income Tax Rules, 2002',
    chapter: 'Chapter II: Heads of Income – Part 2: Income from Business',
    rule_number: 'Rule 12A',
    title: 'Decommissioning Cost Certificate for Petroleum Exploration',
    description: 'Specifies the verification procedure and expert certification required for upstream oil and gas exploration entities claiming decommissioning and site restoration deductions.',
    sub_rules: [
      'Mandatory submission of technical decommissioning cost audit certificate from an approved international reservoir engineering firm.',
      'Annual deposit into an approved escrow abandonment fund.'
    ],
    compliance_steps: 'Submit certified escrow proof with annual corporate return to Large Taxpayers Office (LTO).',
    practical_notes: 'Applies exclusively to petroleum concessions operating under Fifth Schedule Part I.',
    cross_references: ['Fifth Schedule Part I', 'Section 43']
  },
  {
    id: 'itr-rule-13',
    rule_book: 'Income Tax Rules, 2002',
    chapter: 'Chapter II: Heads of Income – Part 2: Income from Business',
    rule_number: 'Rule 13',
    title: 'Apportionment of Expenditures, Deductions and Allowances',
    description: 'Establishes clear apportionment formulas for common administrative, selling, and financial expenses incurred across multiple heads of income or between taxable, exempt, and final tax regimes.',
    sub_rules: [
      'Directly attributable expenses are allocated 100% to the respective income stream.',
      'Common indirect expenses are apportioned based on gross turnover ratio: Allocated Expense = Common Expense * (Stream Turnover / Total Turnover).',
      'Financial costs are apportioned according to asset capital allocation.'
    ],
    valuation_methodology: 'Pro-rata turnover ratio formula.',
    compliance_steps: 'Incorporate detailed expense reconciliation matrix in corporate annual tax return.',
    practical_notes: 'FBR audit officers disallow expenses where taxpayers fail to apply Rule 13 / Section 67 formulas to FTR or exempt exports.',
    cross_references: ['Section 67 (Apportionment)', 'Section 169 (Final Tax)', 'Rule 23']
  },

  // =========================================================================
  // CHAPTER II – PART-3: CAPITAL GAINS ON SECURITIES U/S 37A (RULES 13A TO 13P)
  // =========================================================================
  {
    id: 'itr-rule-13a-13d',
    rule_book: 'Income Tax Rules, 2002',
    chapter: 'Chapter II: Heads of Income – Part 3: Capital Gains on Securities (Sec 37A)',
    rule_number: 'Rule 13A - 13D',
    title: 'Acquisition, Disposal, Holding Period & Computation of Capital Gains on Securities',
    description: 'Governs the automated computation of capital gains and losses on disposal of listed shares, mutual fund units, and debt securities through the Central Depository Company (CDC) and NCCPL system.',
    sub_rules: [
      'Rule 13A: Acquisition cost includes purchase consideration plus brokerage commissions, CDC fees, and stamp duties.',
      'Rule 13B: Disposal deemed on settlement date at net sale value.',
      'Rule 13C: Holding period calculated on FIFO (First-In, First-Out) basis per security symbol.',
      'Rule 13D: Net capital gain is disposal consideration minus acquisition cost and direct transaction expenses.'
    ],
    valuation_methodology: 'NCCPL automated trade matching system under Section 37A.',
    compliance_steps: 'Download NCCPL annual capital gain certificate and reconcile with IRIS Capital Gain Schedule.',
    practical_notes: 'Holding period determines the applicable slab rate under Division VII of Part I of First Schedule.',
    cross_references: ['Section 37A', 'First Schedule Part I Division VII', 'Eighth Schedule']
  },
  {
    id: 'itr-rule-13e-13k',
    rule_book: 'Income Tax Rules, 2002',
    chapter: 'Chapter II: Heads of Income – Part 3: Capital Gains on Securities (Sec 37A)',
    rule_number: 'Rule 13E - 13K',
    title: 'Derivatives, Loss Adjustments, Exemptions, Payment & Broker Liabilities',
    description: 'Details the treatment of future contracts, derivatives, loss carry-forwards, and the statutory obligations of stockbrokers to withhold and deposit capital gains tax.',
    sub_rules: [
      'Rule 13E: Gain/loss on deliverable and cash-settled futures calculated upon contract maturity or square-off.',
      'Rule 13F: Capital losses on securities can only be adjusted against capital gains under Section 37A and carried forward up to 3 consecutive tax years.',
      'Rule 13H: NCCPL collects tax monthly from clearing members and deposits into the Federal Treasury by 10th of following month.',
      'Rule 13J-13K: Stockbrokers liable for default surcharges and penalties in case of failure to deduct or deposit margin tax.'
    ],
    compliance_steps: 'Maintain NCCPL ledger statements for 6 years.',
    practical_notes: 'Capital loss under Section 37A cannot be set off against business income, salary, or property income.',
    cross_references: ['Section 37A', 'Section 59 (Losses)', 'Eighth Schedule']
  },
  {
    id: 'itr-rule-13l-13p',
    rule_book: 'Income Tax Rules, 2002',
    chapter: 'Chapter II: Heads of Income – Part 3: Capital Gains on Securities (Sec 37A)',
    rule_number: 'Rule 13L - 13P',
    title: 'Definitions, Statements, Forms & Special NCCPL Procedures',
    description: 'Provides regulatory definitions for clearing systems and mandates quarterly and annual electronic capital gain reporting by NCCPL and asset management companies.',
    sub_rules: [
      'Rule 13M: NCCPL submits quarterly electronic statement of capital gains and tax collected to FBR.',
      'Rule 13N: Prescribes special clearing procedures for non-resident investors opening Roshan Digital Accounts (RDA).',
      'Rule 13O: Prescribes forms for annual NCCPL reconciliation.'
    ],
    compliance_steps: 'Automated electronic submission by NCCPL directly into FBR data warehouse.',
    practical_notes: 'Non-resident RDA holders investing in PSX enjoy full final tax withholding through NCCPL without needing to file complex local returns.',
    cross_references: ['Section 37A', 'Section 100G', 'Eighth Schedule']
  },

  // =========================================================================
  // CHAPTER II – PART-4: BUILDERS AND DEVELOPERS U/S 7C & 7D (RULES 13Q TO 13S)
  // =========================================================================
  {
    id: 'itr-rule-13q-13s',
    rule_book: 'Income Tax Rules, 2002',
    chapter: 'Chapter II: Heads of Income – Part 4: Builders & Developers (Sec 7C & 7D)',
    rule_number: 'Rule 13Q - 13S',
    title: 'Computation and Advance Tax Procedures on Builders and Land Developers',
    description: 'Prescribes the project registration, square-foot/square-yard fixed tax rates, and quarterly advance tax installments for commercial builders and residential land development projects under Sections 7C, 7D, and the Eleventh Schedule.',
    sub_rules: [
      'Rule 13Q: Application to all commercial, residential, and industrial construction/development projects.',
      'Rule 13R: Defines "covered area", "gross saleable area", and "project life cycle".',
      'Rule 13S: Advance tax payable in 4 equal quarterly installments based on prescribed project size and regional rates.'
    ],
    valuation_methodology: 'Fixed rate per square foot (for builders) or square yard (for developers) per project location.',
    compliance_steps: 'Register each real estate project on IRIS e-portal and deposit quarterly installments using dedicated CPRs.',
    practical_notes: 'Builders complying with Eleventh Schedule fixed tax are exempt from Section 111 unexplained investment probes for purchasers.',
    cross_references: ['Section 7C', 'Section 7D', 'Eleventh Schedule', 'Section 111']
  },

  // =========================================================================
  // CHAPTER VIA – DOCUMENTATION AND CbC REPORTING (RULES 27A TO 27Q)
  // =========================================================================
  {
    id: 'itr-rule-27a',
    rule_book: 'Income Tax Rules, 2002',
    chapter: 'Chapter VIA: Documentation & Country-by-Country (CbC) Reporting',
    rule_number: 'Rule 27A',
    title: 'Application and Scope of Transfer Pricing & CbC Chapter',
    description: 'Establishes the broad legal framework governing multinational enterprise (MNE) group reporting, transfer pricing documentation, and anti-base erosion measures in Pakistan pursuant to OECD BEPS Action 13.',
    sub_rules: [
      'Applies to all resident entities belonging to an MNE Group with cross-border related-party transactions.',
      'Mandates compliance with international standards of transparency and economic substance.'
    ],
    compliance_steps: 'Identify group ultimate parent entity and assess reporting thresholds.',
    practical_notes: 'Failure to comply triggers heavy penalties and transfer pricing re-assessment under Section 108.',
    cross_references: ['Section 108', 'Section 107', 'BEPS Action 13']
  },
  {
    id: 'itr-rule-27b-27j',
    rule_book: 'Income Tax Rules, 2002',
    chapter: 'Chapter VIA: Part-II: Country-by-Country Reporting Requirements',
    rule_number: 'Rule 27B - 27J',
    title: 'Country-by-Country (CbC) Reporting, Notification & Filing Protocols',
    description: 'Prescribes statutory thresholds, electronic schemas, and bilateral exchange rules for Country-by-Country Reports for multinational groups with consolidated annual group revenue exceeding EUR 750 million (or PKR equivalent).',
    sub_rules: [
      'Rule 27B-27D: Ultimate Parent Entity (UPE) or Surrogate Parent Entity resident in Pakistan must file CbC Report within 12 months of fiscal year end.',
      'Rule 27E-27G: Resident constituent entities must notify FBR of the identity and tax residence of the reporting entity by return due date.',
      'Rule 27H-27J: Breakdown of global revenues, profit before tax, income tax paid/accrued, stated capital, accumulated earnings, employee headcounts, and tangible assets by tax jurisdiction.'
    ],
    valuation_methodology: 'Jurisdiction-by-jurisdiction financial breakdown table (OECD CbC XML Schema).',
    compliance_steps: 'File electronic CbCR and CbC Notification on FBR International Taxes Portal.',
    practical_notes: 'FBR automatically exchanges CbC reports with foreign tax authorities under the Multilateral Competent Authority Agreement (MCAA).',
    cross_references: ['Section 108', 'Section 107', 'Rule 27A', 'OECD BEPS Action 13']
  },
  {
    id: 'itr-rule-27k-27q',
    rule_book: 'Income Tax Rules, 2002',
    chapter: 'Chapter VIA: Part-III: Documentation Requirements (Master & Local File)',
    rule_number: 'Rule 27K - 27Q',
    title: 'Transfer Pricing Documentation – Master File, Local File & Economic Benchmarking',
    description: 'Mandates every corporate taxpayer engaging in intercompany transactions exceeding PKR 50 million with foreign associates to maintain and provide Transfer Pricing Local and Master Files.',
    sub_rules: [
      'Rule 27K: Local File containing detailed functional, asset, and risk (FAR) analysis, intercompany contract copies, and economic benchmarking studies.',
      'Rule 27L: Master File detailing global organizational structure, intangible assets (IP ownership), and group financing arrangements for groups with global revenue exceeding PKR 100 million.',
      'Rule 27M-27Q: Obligation to furnish files to Commissioner within 30 days of notice and retain records for minimum 6 years.'
    ],
    valuation_methodology: 'Arm\'s length pricing methods (CUP, Resale Price, Cost Plus, TNMM, Profit Split).',
    compliance_steps: 'Maintain updated contemporaneous Local File and Master File before filing annual income tax return.',
    practical_notes: 'TNMM (Transactional Net Margin Method) using external benchmarking databases is the standard methodology accepted by FBR.',
    cross_references: ['Section 108', 'Rule 25', 'Section 177 (Audit)']
  },

  // =========================================================================
  // CHAPTER VII – RECORDS AND BOOKS OF ACCOUNTS (RULES 28 TO 33)
  // =========================================================================
  {
    id: 'itr-rule-28-31',
    rule_book: 'Income Tax Rules, 2002',
    chapter: 'Chapter VII: Records & Books of Accounts – Parts I & II',
    rule_number: 'Rule 28 - 31',
    title: 'Prescribed Books of Accounts, Invoices, Ledgers & Electronic Registers',
    description: 'Prescribes the mandatory statutory books of account, serial invoices, day-books, cash ledgers, inventory records, and electronic tax registers required for business, professional, and salaried taxpayers.',
    sub_rules: [
      'Rule 29: Mandatory records for companies and AOPs: Cash book, sales ledger, purchase ledger, general ledger, stock register, and bank statements.',
      'Rule 30: Prescribed books for professionals (doctors, lawyers, accountants): Daily register of patients/clients and receipt counterfoils.',
      'Rule 30A: Installation and continuous transmission of Electronic Tax Registers / POS fiscal cash registers.',
      'Rule 31: Minimum records for individuals deriving salary, property, or capital gains: Rent agreements, utility receipts, and bank statements.'
    ],
    compliance_steps: 'Maintain books in chronological sequence and issue consecutively numbered receipts with buyer NTN/CNIC.',
    practical_notes: 'Failure to maintain prescribed books under Rule 29 empowers the department to reject accounts and make Best Judgement Assessment under Section 121.',
    cross_references: ['Section 174 (Records)', 'Section 121 (Best Judgement)', 'Section 182 (Penalties)']
  },
  {
    id: 'itr-rule-32-33',
    rule_book: 'Income Tax Rules, 2002',
    chapter: 'Chapter VII: Records & Books of Accounts – Part III',
    rule_number: 'Rule 32 - 33',
    title: 'Form of Accounts, Preservation Period & Specified Place of Keeping Records',
    description: 'Requires taxpayers to maintain records on double-entry accrual basis (for corporate entities) and preserve all ledgers, invoices, vouchers, and contracts at the declared principal place of business for a minimum of 6 years.',
    sub_rules: [
      'Rule 32: Electronic or physical records must be verifiable, legible, and supported by documentary vouchers.',
      'Rule 33: Records must be kept at the registered office or principal place of business stated on the NTN certificate.',
      'Preservation requirement: Minimum 6 years from end of tax year (or until final appellate disposal if proceedings pending).'
    ],
    compliance_steps: 'Ensure backup of accounting ERP databases and archive original purchase invoices.',
    practical_notes: 'In audit under Section 177, officers inspect records at the business premises specified under Rule 33.',
    cross_references: ['Section 174', 'Section 177', 'Section 175']
  },

  // =========================================================================
  // CHAPTER VIIA – ONLINE INTEGRATION OF BUSINESSES (RULES 33A TO 33T)
  // =========================================================================
  {
    id: 'itr-rule-33a-33g',
    rule_book: 'Income Tax Rules, 2002',
    chapter: 'Chapter VIIA: Online Integration of Businesses – Part I: Preliminary',
    rule_number: 'Rule 33A - 33G',
    title: 'POS Systems Integration, Electronic Invoicing & Real-Time Data Transmission',
    description: 'Mandates all Tier-1 Retailers, chain stores, restaurants, private hospitals, and large service providers to integrate their Point-of-Sale (POS) billing systems in real time with FBR central servers.',
    sub_rules: [
      'Rule 33B: Every integrated enterprise must issue system-generated sales tax/income tax invoices bearing FBR QR code and invoice number.',
      'Rule 33C: POS software must be certified and licensed by FBR licensing committee.',
      'Rule 33D: Officers authorized to access POS logs, transaction memory, and inspect cash counters.',
      'Rule 33F-33G: Penalties, disallowance of 8% input tax, and sealing of premises for failure to transmit live billing data.'
    ],
    valuation_methodology: 'Real-time telemetry and API handshake.',
    compliance_steps: 'Install FBR POS fiscal middleware and print FBR invoice number and verifiable QR code on every cash receipt.',
    practical_notes: 'Customers can verify receipts on the "Asaan Tax" app to participate in the FBR prize draw scheme.',
    cross_references: ['Section 237A', 'Sales Tax Rule 150ZEA', 'Section 182 (POS Penalties)']
  },
  {
    id: 'itr-rule-33h-33t',
    rule_book: 'Income Tax Rules, 2002',
    chapter: 'Chapter VIIA: Online Integration of Businesses – Part II: Licensing of Integrators',
    rule_number: 'Rule 33H - 33T',
    title: 'Licensing of POS Integrators, Technical Architecture & Committee Functions',
    description: 'Regulates IT vendors and software companies licensing POS integration software, data encryption standards, security certifications, periodic audits, and fee structures.',
    sub_rules: [
      'Rule 33H-33K: Application, vetting, bank guarantee, and grant of license by FBR Licensing Committee.',
      'Rule 33N: 24/7 technical support and cloud uptime service level agreements (SLAs).',
      'Rule 33P: Suspension and revocation of vendor license for facilitating sales suppression or tamper.',
      'Rule 33Q: Independent forensic IT audit of licensed integrators.'
    ],
    compliance_steps: 'Software vendors must obtain formal FBR license before selling POS billing software to retailers.',
    practical_notes: 'Using unlicensed or tampered POS software is treated as tax evasion leading to criminal prosecution.',
    cross_references: ['Section 237A', 'Section 191', 'Section 192A']
  },

  // =========================================================================
  // CHAPTER VIII – RETURNS, WEALTH & PROFILES (RULES 34 TO 39)
  // =========================================================================
  {
    id: 'itr-rule-34-36a',
    rule_book: 'Income Tax Rules, 2002',
    chapter: 'Chapter VIII: Returns, Wealth Statements & Taxpayer Profiles',
    rule_number: 'Rule 34 - 36A',
    title: 'Prescribed Returns of Income, Wealth Statements & Foreign Assets Statements',
    description: 'Prescribes the official electronic return formats, Taxpayer Profile updates (Section 114A), Wealth Statement reconciliations (Section 116), and Foreign Income and Assets Statements (Section 116A).',
    sub_rules: [
      'Rule 34: Electronic filing of annual income tax return on IRIS portal along with audited financial statements.',
      'Rule 34B: Mandatory Taxpayer Profile containing bank accounts, utility connections, business premises, and GPS coordinates.',
      'Rule 36: Wealth Statement (Form A) detailing local assets, personal liabilities, household expenses, and asset accretions.',
      'Rule 36A: Foreign Income and Assets Statement (Form B) for resident individuals holding foreign bank accounts, properties, or shares.'
    ],
    compliance_steps: 'Reconcile net wealth changes: Net Wealth Increase + Personal Expenses = Inflows/Income.',
    practical_notes: 'Unexplained differences in Wealth Reconciliation trigger notices under Section 111 (Unexplained Income/Assets).',
    cross_references: ['Section 114 (Returns)', 'Section 114A (Profile)', 'Section 116 (Wealth)', 'Section 116A (Foreign Assets)']
  },
  {
    id: 'itr-rule-37-38a',
    rule_book: 'Income Tax Rules, 2002',
    chapter: 'Chapter VIII: Returns, Wealth Statements & Special Statements',
    rule_number: 'Rule 37 - 38A',
    title: 'Non-Resident Shipping, Aircraft Operations & Online Marketplace Statements',
    description: 'Prescribes specialized return procedures for non-resident shipping operators (Section 143), foreign aircraft charterers (Section 144), and quarterly statements required from Online Marketplaces and E-commerce platforms.',
    sub_rules: [
      'Rule 37: Master of ship or shipping agent must furnish voyage return and pay tax before departure.',
      'Rule 38: Non-resident aircraft operators submit specified turnover return within 30 days of accounting period.',
      'Rule 38A: Online marketplaces (e-commerce platforms) must submit quarterly statements of sellers, turnover, and commission fees.'
    ],
    compliance_steps: 'E-commerce platforms must capture vendor CNIC/NTN and furnish electronic statements under Rule 38A.',
    practical_notes: 'Customs port authorities will not grant port clearance to foreign vessels without tax payment certificate under Rule 37.',
    cross_references: ['Section 143 (Shipping)', 'Section 144 (Aircraft)', 'Section 165 (Statements)']
  },

  // =========================================================================
  // CHAPTER VIIIA – BANKING REPORTING REQUIREMENTS (RULES 39A TO 39D)
  // =========================================================================
  {
    id: 'itr-rule-39a-39d',
    rule_book: 'Income Tax Rules, 2002',
    chapter: 'Chapter VIIIA: Banking Companies Reporting Requirements',
    rule_number: 'Rule 39A - 39D',
    title: 'Banking Companies Information Reporting on High-Value Cash & Transactions',
    description: 'Mandates commercial banks, microfinance institutions, and payment service providers to furnish monthly electronic reports to FBR regarding high-value transactions, cash withdrawals, credit card settlements, and profit on debt under Section 165A.',
    sub_rules: [
      'Rule 39B(1): List of persons making cash withdrawals exceeding PKR 50,000 in a single day or aggregate PKR 1 million in a month.',
      'Rule 39B(2): List of persons making credit card payments exceeding PKR 200,000 per month.',
      'Rule 39B(3): Monthly list of bank deposits aggregating PKR 10 million or more in a calendar month.',
      'Rule 39C-39D: Designated authorized compliance officers and secure SFTP file transmission schedules.'
    ],
    compliance_steps: 'Automated centralized reporting by bank head offices via secure encrypted data tunnel.',
    practical_notes: 'FBR utilizes Rule 39 data in the "Maloomat" database to detect non-filers and issue Section 114(4) notices.',
    cross_references: ['Section 165A', 'Section 231A', 'Section 236P', 'Section 114']
  },

  // =========================================================================
  // CHAPTER IX – CERTIFICATES & ADVANCE TAX (RULES 40 TO 53)
  // =========================================================================
  {
    id: 'itr-rule-40-40fa',
    rule_book: 'Income Tax Rules, 2002',
    chapter: 'Chapter IX: Certificates & Advance Tax – Part I: Exemption Certificates',
    rule_number: 'Rule 40 - 40FA',
    title: 'Exemption and Reduced Rate Certificates under Sections 159 and 152',
    description: 'Governs electronic applications, Commissioner evaluation, statutory 15-day issuance timelines, and monitoring of Section 159 withholding exemption or concessionary rate certificates.',
    sub_rules: [
      'Rule 40: Application on IRIS with advance tax calculation, withholding analysis, and return compliance history.',
      'Rule 40A-40F: Committee on Imported Goods, raw material verification, and import exemption certificates under Section 148.',
      'Rule 40FA: Reduced rate/exemption certificates for foreign companies, royalty, and technical fee payments under Section 152.'
    ],
    compliance_steps: 'Submit electronic application on IRIS; Commissioner must pass order within 15 days, failing which system auto-generates certificate.',
    practical_notes: 'Valid exemption certificate protects withholding agents from default surcharge under Section 161.',
    cross_references: ['Section 159', 'Section 148', 'Section 152', 'Section 153']
  },
  {
    id: 'itr-rule-42-45',
    rule_book: 'Income Tax Rules, 2002',
    chapter: 'Chapter IX: Certificates & Advance Tax – Part II: WHT Deduction & Statements',
    rule_number: 'Rule 42 - 45',
    title: 'Tax Deduction Certificates, Treasury Deposit Schedules & Monthly WHT Statements',
    description: 'Regulates statutory tax deduction certificates issued to payees, mandatory deposit timelines into the Federal Treasury (within 7 days), and electronic monthly withholding statements.',
    sub_rules: [
      'Rule 42: Prescribed annual and transactional withholding certificate (Rule 42 / Section 164).',
      'Rule 43: Tax deducted must be deposited via Computerized Payment Receipt (CPR) within 7 days of deduction.',
      'Rule 43A-43B: Advance tax on air tickets (Section 236L) and payment mechanisms.',
      'Rule 44: Mandatory electronic monthly statement of tax collected/deducted by 15th of following month on IRIS.'
    ],
    compliance_steps: 'Withholding agents must issue signed/digital certificates under Rule 42 to payees for tax credit claims.',
    practical_notes: 'Failing to file monthly Rule 44 statements triggers an automatic PKR 2,500/day penalty under Section 182.',
    cross_references: ['Section 160 (Time of Payment)', 'Section 164 (Certificate)', 'Section 165 (Statements)']
  },
  {
    id: 'itr-rule-46-53',
    rule_book: 'Income Tax Rules, 2002',
    chapter: 'Chapter IX: Certificates & Advance Tax – Part IV: SWAPS Rules',
    rule_number: 'Rule 46 - 53',
    title: 'Synchronized Withholding Administration and Payment System (SWAPS)',
    description: 'Comprehensive operational framework for automated, real-time withholding tax execution, digital API integration with banking gateways, and SWAPS Payment Receipts (SPR) under Section 164A.',
    sub_rules: [
      'Rule 46-48: Registration and onboarding of companies and entities as notified SWAPS Agents.',
      'Rule 49-50: SWAPS Payment Receipt (SPR) generated in real time upon bank fund transfer, eliminating manual CPRs.',
      'Rule 51: Auto-generated Certificate of Tax Payment accessible to payee immediately upon invoice clearance.',
      'Rule 53: Heavy fines and loss of tax concessions for failing to execute payments through the SWAPS engine.'
    ],
    valuation_methodology: 'Direct automated real-time transaction clearing.',
    compliance_steps: 'Integrate corporate ERP system with FBR SWAPS API gateway for real-time B2B vendor payments.',
    practical_notes: 'Transactions executed via SWAPS eliminate vendor withholding audit disputes and provide instant ATL credit.',
    cross_references: ['Section 164A (SWAPS)', 'Section 161', 'Section 182']
  },

  // =========================================================================
  // CHAPTER X – PRESCRIBED FORMS (RULES 67 TO 72)
  // =========================================================================
  {
    id: 'itr-rule-67-72',
    rule_book: 'Income Tax Rules, 2002',
    chapter: 'Chapter X: Prescribed Forms',
    rule_number: 'Rule 67 - 72',
    title: 'Statutory Assessment Notices, Third-Party Freezing & Departure Certificates',
    description: 'Prescribes the official statutory templates for amended assessment notices, third-party bank account attachment notices, tax clearance certificates for persons leaving Pakistan, and search authorizations.',
    sub_rules: [
      'Rule 68: Form of notice for amendment of assessment under Section 122(9).',
      'Rule 69: Form of statutory notice under Section 140 for recovery of tax from debtors and bank accounts.',
      'Rule 70: Form of tax clearance certificate under Section 145 for persons leaving Pakistan permanently.',
      'Rule 71: Form of refund application under Section 170.',
      'Rule 72: Form of warrant of authorization under Section 175 (Entry & Search).'
    ],
    compliance_steps: 'Officers must use strictly prescribed forms; notices not matching prescribed templates are legally vulnerable.',
    practical_notes: 'A Section 140 bank notice issued without valid Rule 69 format can be challenged before High Court as without jurisdiction.',
    cross_references: ['Section 122', 'Section 140', 'Section 145', 'Section 170', 'Section 175']
  },

  // =========================================================================
  // CHAPTER XI – FURNISHING OF DOCUMENTS & NOTICES (RULES 73 TO 75)
  // =========================================================================
  {
    id: 'itr-rule-73-75',
    rule_book: 'Income Tax Rules, 2002',
    chapter: 'Chapter XI: Furnishing & Service of Documents, Electronic Notices',
    rule_number: 'Rule 73 - 75',
    title: 'Electronic Service of Documents, IRIS Inbox Delivery & Legal Notices',
    description: 'Establishes the evidentiary rules governing the transmission and service of notices, summons, assessment orders, and returns over the IRIS web portal, email, and registered courier under Section 218.',
    sub_rules: [
      'Rule 73: Electronic transmission of documents, statements, and replies through registered IRIS accounts.',
      'Rule 74: Legal presumption of service: Delivery of notice into the taxpayer\'s IRIS e-folder constitutes valid service under law.',
      'Rule 75: Format and validity of electronic barcodes, QR codes, and digital signatures.'
    ],
    compliance_steps: 'Regularly monitor official IRIS inbox and registered email address to avoid default orders.',
    practical_notes: 'Under Section 218 and Rule 74, claiming non-receipt of a postal notice is not a valid defense if the notice was dispatched to the IRIS inbox.',
    cross_references: ['Section 218 (Service of Notices)', 'Section 227A', 'Electronic Transactions Ordinance, 2002']
  },

  // =========================================================================
  // CHAPTER XII – APPEALS & DISPUTE RESOLUTION (RULES 76 TO 78)
  // =========================================================================
  {
    id: 'itr-rule-76-76o',
    rule_book: 'Income Tax Rules, 2002',
    chapter: 'Chapter XII: Appeals – CIR (Appeals) Web Portal & Stay Procedures',
    rule_number: 'Rule 76 - 76O',
    title: 'Electronic Filing of Appeals to Commissioner (Appeals), Stay Applications & Orders',
    description: 'Comprehensive digital procedural code governing the e-filing of appeals to the Commissioner Inland Revenue (Appeals), grounds of appeal, stay applications against bank recovery, rejoinders, and electronic appellate orders.',
    sub_rules: [
      'Rule 76-76B: Mandatory e-filing of appeal memo, statement of facts, and assessment order within 30 days of notice of demand.',
      'Rule 76D: Filing of affidavits regarding disputed facts.',
      'Rule 76G: Urgent stay application procedure: Mandatory early hearing and protection against premature Section 140 bank attachment.',
      'Rule 76H-76J: Video link hearings and electronic issuance of hearing notices.',
      'Rule 76N: Mandatory uploading of reasoned electronic appellate orders on the portal.'
    ],
    compliance_steps: 'Deposit statutory appeal fee (PKR 5,000 for companies / PKR 1,000 for others) and file memo on IRIS within 30 days.',
    practical_notes: 'Filing an appeal does not automatically stay demand; an explicit stay application under Rule 76G must be filed and argued.',
    cross_references: ['Section 127 (Appeals to CIR-A)', 'Section 128', 'Section 129', 'Section 138 (Stay of Demand)']
  },
  {
    id: 'itr-rule-77-78',
    rule_book: 'Income Tax Rules, 2002',
    chapter: 'Chapter XII: Appeals – Appellate Tribunal & High Court Reference',
    rule_number: 'Rule 77 - 78',
    title: 'Prescribed Forms for Appeal to Appellate Tribunal & High Court Reference',
    description: 'Prescribes the formal statutory memorandum of appeal to the Appellate Tribunal Inland Revenue (ATIR) under Section 131 and Income Tax Reference Application (ITRA) to the High Court under Section 133.',
    sub_rules: [
      'Rule 77: Form of appeal to Appellate Tribunal, grounds of appeal in quadruplicate, and prescribed court fee receipts.',
      'Rule 78: Prescribed form and questions of law formulation for reference to High Court under Section 133.'
    ],
    compliance_steps: 'Ensure questions of law are framed with precision; High Court only entertains substantial questions of law.',
    practical_notes: 'Appellate Tribunal is the final fact-finding authority; High Court reference cannot re-evaluate factual findings unless perverse.',
    cross_references: ['Section 131 (Tribunal)', 'Section 132', 'Section 133 (High Court Reference)']
  },

  // =========================================================================
  // CHAPTER XIIIA / XHA – COMMON REPORTING STANDARD (RULES 78A TO 78O)
  // =========================================================================
  {
    id: 'itr-rule-78a-78o',
    rule_book: 'Income Tax Rules, 2002',
    chapter: 'Chapter XIIIA: Common Reporting Standard (CRS) – Due Diligence',
    rule_number: 'Rule 78A - 78O',
    title: 'Common Reporting Standard (CRS) for Automatic Exchange of Financial Information',
    description: 'Prescribes mandatory due diligence, tax residency self-certification, and reporting procedures for Pakistani financial institutions (banks, mutual funds, insurance companies) under the OECD Common Reporting Standard.',
    sub_rules: [
      'Rule 78C-78D: Annual reporting of financial accounts held by non-resident foreign tax residents to FBR for international automatic exchange.',
      'Rule 78E-78F: Due diligence procedures for Pre-existing and New Individual Accounts (indicia search, passport, foreign address).',
      'Rule 78G-78H: Due diligence for Entity Accounts and Controlling Persons (Beneficial Owners of Passive NFE).',
      'Rule 78K-78L: Record retention for 5 years and annual filing deadline by 31st May.'
    ],
    valuation_methodology: 'Account balance, gross interest, dividends, and gross redemption proceeds.',
    compliance_steps: 'Financial institutions must obtain valid CRS self-certification forms on account opening.',
    practical_notes: 'Pakistan exchanges CRS data with over 100 OECD partner countries to detect offshore undeclared assets.',
    cross_references: ['Section 107', 'Section 165B', 'Section 216', 'OECD CRS Standard']
  },

  // =========================================================================
  // CHAPTER XIII – NATIONAL TAX NUMBER & ATL (RULES 79 TO 83)
  // =========================================================================
  {
    id: 'itr-rule-79-83',
    rule_book: 'Income Tax Rules, 2002',
    chapter: 'Chapter XIII: National Tax Number Card & Active Taxpayers List',
    rule_number: 'Rule 79 - 83',
    title: 'NTN Registration, Online E-Enrolment, Active Taxpayers List (ATL) & Display',
    description: 'Governs taxpayer registration, issuance of 7-digit National Tax Numbers (NTN), CNIC-based registration, real-time Active Taxpayers List (ATL) updates, and mandatory display of NTN certificates at commercial premises.',
    sub_rules: [
      'Rule 80-80B: Online e-enrolment on IRIS using CNIC and biometric verification through NADRA.',
      'Rule 81A: Compulsory registration by Commissioner based on third-party intelligence or business surveys.',
      'Rule 81B: Active Taxpayers List (ATL) daily publication rules and 100th Schedule surcharge.',
      'Rule 83: Mandatory display of NTN Certificate at prominent place in every business premises.'
    ],
    compliance_steps: 'Register online via IRIS; update ATL status by filing current year return on or before due date.',
    practical_notes: 'Non-ATL status results in 100% higher withholding tax deductions across all commercial and banking transactions.',
    cross_references: ['Section 181 (Registration)', 'Section 181A (ATL)', 'Tenth Schedule', 'Section 181C']
  },

  // =========================================================================
  // CHAPTER XIIIA – RECORD OF BENEFICIAL OWNERS (RULES 83A TO 83E)
  // =========================================================================
  {
    id: 'itr-rule-83a-83e',
    rule_book: 'Income Tax Rules, 2002',
    chapter: 'Chapter XIIIA: Record of Beneficial Owners (FATF Compliance)',
    rule_number: 'Rule 83A - 83E',
    title: 'Beneficial Ownership Records, The Cascading Process & Retention Protocols',
    description: 'Mandates companies, LLPs, and trusts to maintain, update, and furnish records of ultimate natural persons who own or control 25% or more voting rights or exercise effective control, strictly compliant with FATF standards.',
    sub_rules: [
      'Rule 83C: Mandatory maintenance of beneficial ownership register (Name, CNIC/Passport, residential address, percentage shareholding).',
      'Rule 83D: The Cascading Identification Process: Step 1 (Shareholding threshold) -> Step 2 (Control through other means) -> Step 3 (Senior Managing Official).',
      'Rule 83E: Mandatory retention of beneficial ownership records for at least 10 years after liquidation or change.'
    ],
    compliance_steps: 'File beneficial ownership declaration form along with annual corporate return in IRIS.',
    practical_notes: 'Failure to provide ultimate beneficial ownership details attracts severe penalties under Section 182 and FATF non-compliance flags.',
    cross_references: ['Section 181D', 'Section 114', 'FATF Recommendation 24', 'Companies Act, 2017 Sec 123A']
  },

  // =========================================================================
  // CHAPTER XIV – INCOME TAX PRACTITIONERS (RULES 84 TO 90)
  // =========================================================================
  {
    id: 'itr-rule-84-90',
    rule_book: 'Income Tax Rules, 2002',
    chapter: 'Chapter XIV: Registration of Income Tax Practitioners (ITP)',
    rule_number: 'Rule 84 - 90',
    title: 'Registration, Qualifications, Professional Ethics & Licensing of ITPs',
    description: 'Sets out the prescribed academic qualifications (Law degree or Commerce degree), registration process, ethical obligations, licensing renewal, and disciplinary actions for Income Tax Practitioners (ITPs).',
    sub_rules: [
      'Rule 85-86: Prescribed qualifications: Degree in Law (LL.B.) or Master in Commerce/Accounting from recognized university with minimum internship.',
      'Rule 87: Grant of registration certificate and entry into National ITP Register.',
      'Rule 89: Disqualification and cancellation of license for professional misconduct, fraud, or conviction.',
      'Rule 90: Appeal to the Federal Board of Revenue against refusal or cancellation of ITP registration.'
    ],
    compliance_steps: 'Apply to Chief Commissioner with educational credentials, character certificates, and prescribed fee.',
    practical_notes: 'Only enrolled ITPs, qualified Advocates, and Chartered Accountants are authorized to represent taxpayers under Section 223.',
    cross_references: ['Section 223 (Authorized Representatives)', 'Rule 78']
  },

  // =========================================================================
  // CHAPTER XV – RETIREMENT & BENEFIT FUNDS (RULES 91 TO 121)
  // =========================================================================
  {
    id: 'itr-rule-91-107',
    rule_book: 'Income Tax Rules, 2002',
    chapter: 'Chapter XV: Retirement Funds – Part I: Recognised Provident Funds',
    rule_number: 'Rule 91 - 107',
    title: 'Recognised Provident Funds (RPF) – Recognition, Investments & Withdrawals',
    description: 'Regulates the approval, statutory trust deeds, investment ceilings, employer contribution limits, and tax-exempt withdrawal conditions for recognized employee provident funds under the Sixth Schedule.',
    sub_rules: [
      'Rule 91-92: Application to Commissioner with Trust Deed and fund rules for formal recognition.',
      'Rule 97-98: Limits on employer contribution (exempt up to lesser of 10% of salary or PKR 150,000) and interest credit (exempt up to one-third of salary or 16% rate).',
      'Rule 102: Mandatory investment in government securities (PIBs, T-Bills, National Savings) and approved listed equities.',
      'Rule 103-106: Permitted withdrawals for house construction, medical treatment, or marriage, and repayment terms.'
    ],
    valuation_methodology: 'Statutory interest benchmark and contribution cap limits.',
    compliance_steps: 'Submit annual audited financial statements of the Provident Fund Trust to the Commissioner.',
    practical_notes: 'Accumulated balances received from a Recognised Provident Fund upon retirement or completion of 5 years service are 100% tax-free.',
    cross_references: ['Sixth Schedule Part I', 'Section 12', 'Clause 25 Part I Second Schedule']
  },
  {
    id: 'itr-rule-108-121',
    rule_book: 'Income Tax Rules, 2002',
    chapter: 'Chapter XV: Retirement Funds – Parts II & III: Superannuation & Gratuity Funds',
    rule_number: 'Rule 108 - 121',
    title: 'Approved Superannuation Funds and Approved Gratuity Funds Rules',
    description: 'Governs the formal approval, trust constitutions, permissible investments, contribution caps, and taxation of employer funding into approved pension/superannuation and gratuity trusts under Sixth Schedule Parts II & III.',
    sub_rules: [
      'Rule 108-111: Superannuation fund approval, contribution limits, and government securities investment quotas.',
      'Rule 114: Right of appeal to FBR against refusal of Commissioner to approve fund.',
      'Rule 115-118: Gratuity fund approval, actuarial valuation requirements, and tax deductibility of employer contributions under Section 21(e).',
      'Rule 120-121: Conditions under which approval can be withdrawn.'
    ],
    compliance_steps: 'Execute irrevocable trust deed and submit annual actuarial report for gratuity fund.',
    practical_notes: 'Employer contributions to an unapproved gratuity or pension fund are totally disallowed as business expenditure under Section 21(e).',
    cross_references: ['Sixth Schedule Parts II & III', 'Section 21(e)', 'Section 20']
  },

  // =========================================================================
  // CHAPTER XVI – INCOME TAX RECOVERY RULES (RULES 122 TO 210)
  // =========================================================================
  {
    id: 'itr-rule-122-135',
    rule_book: 'Income Tax Rules, 2002',
    chapter: 'Chapter XVI: Income Tax Recovery Rules – Part I: General',
    rule_number: 'Rule 122 - 135',
    title: 'Tax Recovery Proceedings – Notices, Exemption from Attachment & Police Assistance',
    description: 'General procedural code empowering the Commissioner and Tax Recovery Officer (TRO) to execute recovery certificates, determine third-party ownership disputes, exempt subsistence assets, and requisition police assistance under Section 138.',
    sub_rules: [
      'Rule 123-124: Formal recovery notice and mode of service upon tax defaulter.',
      'Rule 128: Absolute exemption from attachment: Necessary wearing apparel, cooking utensils, tools of artisans, and subsistence bedding.',
      'Rule 130: Immediate removal of attachment upon full payment or appellate cancellation of assessment.',
      'Rule 135: Mandatory police assistance to tax recovery officers upon written requisition.'
    ],
    compliance_steps: 'Recovery officer must issue statutory demand notice giving at least 15 days before attachment.',
    practical_notes: 'Tools of trade and personal clothing of the defaulter cannot be attached under any circumstances under Rule 128.',
    cross_references: ['Section 138 (Recovery of Tax)', 'Section 139', 'Code of Civil Procedure, 1908']
  },
  {
    id: 'itr-rule-136-157',
    rule_book: 'Income Tax Rules, 2002',
    chapter: 'Chapter XVI: Income Tax Recovery Rules – Part II: Movable Property',
    rule_number: 'Rule 136 - 157',
    title: 'Attachment and Sale of Movable Property, Vehicles, Shares & Public Auctions',
    description: 'Prescribes the step-by-step procedure for seizing, inventorying, safeguarding, and auctioning movable assets, factory machinery, vehicles, inventory stock, and company shares belonging to a tax defaulter.',
    sub_rules: [
      'Rule 138-140: Warrant of attachment, seizure of movable property, and attachment of debts/shares.',
      'Rule 145-147: Preparation of detailed inventory and restriction: Seizure strictly between sunrise and sunset.',
      'Rule 149-154: Public auction proclamation: Notice of at least 15 days, publication in newspapers, and highest bidder acceptance.',
      'Rule 157: Direct order for payment of attached coins/currency to the Commissioner.'
    ],
    valuation_methodology: 'Public auction reserve price determined by approved valuer.',
    compliance_steps: 'Issue public auction notice with minimum 15 days clear notice before sale.',
    practical_notes: 'Entry into residential premises for movable property attachment cannot be made after sunset or before sunrise.',
    cross_references: ['Section 138', 'Rule 148', 'Section 140']
  },
  {
    id: 'itr-rule-158-178',
    rule_book: 'Income Tax Rules, 2002',
    chapter: 'Chapter XVI: Income Tax Recovery Rules – Part III: Immovable Property',
    rule_number: 'Rule 158 - 178',
    title: 'Attachment and Public Auction of Immovable Commercial & Residential Property',
    description: 'Detailed statutory legal procedure for attaching real estate land, factory premises, and buildings, issuing public sale proclamations, receiving 25% purchaser deposits, setting aside irregular sales, and issuing official Sale Certificates.',
    sub_rules: [
      'Rule 158-160: Proclamation of attachment prohibiting transfer or encumbrance of immovable property.',
      'Rule 161-165: Sale proclamation and public auction with minimum 30 days notice.',
      'Rule 166-167: Successful bidder must deposit 25% purchase money immediately and balance 75% within 15 days.',
      'Rule 170-172: Application by defaulter to set aside sale upon depositing total tax liability plus 5% penalty within 30 days.',
      'Rule 175: Issuance of official Sale Certificate granting unencumbered title to auction purchaser.'
    ],
    compliance_steps: 'Register attachment order with District Land Revenue Authority (Patwari / Sub-Registrar).',
    practical_notes: 'Any private sale or mortgage executed by the defaulter after Rule 158 attachment is void ab initio.',
    cross_references: ['Section 138', 'Section 146', 'Transfer of Property Act, 1882']
  },
  {
    id: 'itr-rule-179-191',
    rule_book: 'Income Tax Rules, 2002',
    chapter: 'Chapter XVI: Income Tax Recovery Rules – Parts IV & V: Receiver & Arrest',
    rule_number: 'Rule 179 - 191',
    title: 'Appointment of Receiver, Civil Arrest & Detention of Willful Defaulters',
    description: 'Regulates the appointment of court/tax receivers to manage a defaulter\'s business and the strict legal due process for civil arrest and detention in prison of willful tax defaulters under Section 138(2).',
    sub_rules: [
      'Rule 179-182: Appointment of independent receiver to manage business profits and collect rents for tax liquidation.',
      'Rule 183-184: Mandatory Show Cause Notice and personal hearing before issuing civil arrest warrant.',
      'Rule 186-187: Maximum civil prison detention period: Up to 6 months for liabilities exceeding PKR 100,000.',
      'Rule 190-191: Absolute legal prohibition: No woman or minor can be arrested or detained for tax recovery.'
    ],
    compliance_steps: 'Civil arrest can only be executed if willful concealment or fraudulent asset transfer is proven.',
    practical_notes: 'Women and minors are legally exempt from civil arrest for income tax defaults under Rule 191.',
    cross_references: ['Section 138(2)', 'Section 191', 'Section 192']
  },
  {
    id: 'itr-rule-192-210',
    rule_book: 'Income Tax Rules, 2002',
    chapter: 'Chapter XVI: Income Tax Recovery Rules – Part VI: Miscellaneous',
    rule_number: 'Rule 192 - 210',
    title: 'Recovery on Defaulter Death, Appeals, Third-Party Claims & Possession Delivery',
    description: 'Addresses legal proceedings following the death of a defaulter (limited to value of estate inherited), adjudication of third-party ownership claims, and physical delivery of possession to auction buyers.',
    sub_rules: [
      'Rule 193: Recovery against legal heirs is strictly limited to the value of assets inherited from deceased defaulter.',
      'Rule 194: Right of appeal against Recovery Officer orders to the Chief Commissioner.',
      'Rule 204-206: Protection and restoration of possession to bona fide third-party occupants not bound by certificate.'
    ],
    compliance_steps: 'Legal heirs must furnish inventory of inherited estate under Section 87.',
    practical_notes: 'Legal heirs cannot be personally jailed or subjected to liability beyond the net assets inherited.',
    cross_references: ['Section 87 (Deceased Persons)', 'Section 138', 'Rule 127']
  },

  // =========================================================================
  // CHAPTER XVIA – THIRD PARTY RECOVERY (RULES 210A TO 210I)
  // =========================================================================
  {
    id: 'itr-rule-210a-210i',
    rule_book: 'Income Tax Rules, 2002',
    chapter: 'Chapter XVIA: Recovery of Tax from Persons Holding Money (Sec 140)',
    rule_number: 'Rule 210A - 210I',
    title: 'Garnishee Notices & Direct Recovery from Banks & Debtors u/s 140',
    description: 'Detailed procedural framework for issuing Section 140 notices to commercial banks, financial institutions, and business debtors holding funds on behalf of a taxpayer to recover outstanding arrears.',
    sub_rules: [
      'Rule 210B: Service of formal Notice of Recovery on bank branch manager specifying exact arrears.',
      'Rule 210C: Immediate compliance: Bank must remit available funds via pay-order to the Commissioner without delay.',
      'Rule 210F: Official receipt issued by Commissioner operates as a full discharge of bank\'s liability to the account holder.',
      'Rule 210H: Failure by bank to remit funds makes the bank itself personally liable as a taxpayer in default.'
    ],
    compliance_steps: 'Banks must verify customer NTN/CNIC and remit funds directly to the government treasury within 24 hours.',
    practical_notes: 'High Courts have ruled that banks cannot freeze accounts without serving simultaneous notice copy on taxpayer.',
    cross_references: ['Section 140 (Recovery from Persons Holding Money)', 'Rule 69', 'Section 161']
  },

  // =========================================================================
  // CHAPTER XVIIB – REFUND / CITRO (RULES 210IA TO 210IC)
  // =========================================================================
  {
    id: 'itr-rule-210ia-210ic',
    rule_book: 'Income Tax Rules, 2002',
    chapter: 'Chapter XVIIB: Centralized Income Tax Refund Office (CITRO)',
    rule_number: 'Rule 210IA - 210IC',
    title: 'Automated Electronic Refund Processing & Direct IBAN Payment via CITRO',
    description: 'Establishes the paperless Centralized Income Tax Refund Office (CITRO) system for direct electronic processing, automated verification of CPRs, and electronic credit of tax refunds directly into taxpayer bank IBANs under Section 170.',
    sub_rules: [
      'Rule 210IA: Electronic submission of refund application through IRIS web portal.',
      'Rule 210IB: Centralized validation: System automatically verifies advance taxes, WHT CPRs, and excess payments.',
      'Rule 210IC: Electronic issuance of Refund Payment Order (RPO) and automated State Bank direct IBAN transfer.'
    ],
    valuation_methodology: 'Electronic automated ledger cross-matching.',
    compliance_steps: 'Ensure updated IBAN is declared in taxpayer profile under Rule 34B.',
    practical_notes: 'Refunds verified through CITRO bypass manual field office checks and eliminate physical refund voucher delays.',
    cross_references: ['Section 170 (Refunds)', 'Section 171 (Compensation)', 'Rule 71']
  },

  // =========================================================================
  // CHAPTER XVII – NON-PROFIT ORGANISATIONS (RULES 211 TO 220B)
  // =========================================================================
  {
    id: 'itr-rule-211-220b',
    rule_book: 'Income Tax Rules, 2002',
    chapter: 'Chapter XVII: Non-Profit Organisations (NPO Approval & Tax Credits)',
    rule_number: 'Rule 211 - 220B',
    title: 'Procedure for Approval, Evaluation, Validity & Certification of NPOs u/s 2(36)',
    description: 'Prescribes the statutory eligibility conditions, administrative overhead ceilings (max 20%), audited accounts submission, tenure validity (up to 3 years), and PCP certification required for Non-Profit Organisations to claim 100% tax credit under Section 100C.',
    sub_rules: [
      'Rule 211-212: Formal application to Commissioner with constitution/trust deed, 3 years audited accounts, and activity reports.',
      'Rule 213-214: Approval valid for up to 3 years, renewable upon continued compliance with welfare objectives.',
      'Rule 217: Power of Commissioner to withdraw NPO approval for misapplication of funds or commercial profiteering.',
      'Rule 220B: Appointment of Pakistan Council of Philanthropy (PCP) as approved certification agency.'
    ],
    compliance_steps: 'Ensure administrative expenses do not exceed 20% of total receipts and file annual Section 100C returns.',
    practical_notes: 'Approval under Rule 211 / Section 2(36) is mandatory for donors to claim Section 61 charitable tax deductions.',
    cross_references: ['Section 2(36) (NPO Definition)', 'Section 100C (NPO Tax Credit)', 'Section 61 (Charitable Donations)']
  },

  // =========================================================================
  // CHAPTER XVIIA – GREENFIELD INDUSTRIAL UNDERTAKINGS (RULES 220C TO 220H)
  // =========================================================================
  {
    id: 'itr-rule-220c-220h',
    rule_book: 'Income Tax Rules, 2002',
    chapter: 'Chapter XVIIA: Greenfield Industrial Undertakings',
    rule_number: 'Rule 220C - 220H',
    title: 'Approval, Inspection, Certification & Concessions for Greenfield Industries',
    description: 'Governs the application, technical committee inspection, approval, and appellate remedies for newly established greenfield manufacturing units utilizing modern technology.',
    sub_rules: [
      'Rule 220C: Filing of application with Engineering Development Board (EDB) project approval and import contracts.',
      'Rule 220D-220E: Physical site inspection by Commissioner and issuance of greenfield status certificate.',
      'Rule 220H: Appeal to the Federal Board of Revenue against rejection of greenfield status.'
    ],
    compliance_steps: 'Maintain separate accounts for greenfield manufacturing and obtain prior EDB certification.',
    practical_notes: 'Greenfield status grants tax holidays and minimum tax concessions under the Second Schedule.',
    cross_references: ['Section 2(27A)', 'Clause 126N Part I Second Schedule', 'Section 113']
  },

  // =========================================================================
  // CHAPTER XVIIB – TAX CLEARANCE CERTIFICATES (RULES 221 TO 223)
  // =========================================================================
  {
    id: 'itr-rule-221-223',
    rule_book: 'Income Tax Rules, 2002',
    chapter: 'Chapter XVIIB: Tax Clearance & Exemption Certificates',
    rule_number: 'Rule 221 - 223',
    title: 'Tax Clearance Certificate for Permanent Departure u/s 145 & Exemption Forms',
    description: 'Prescribes the procedure and statutory forms for issuing Tax Clearance Certificates under Section 145 to individuals leaving Pakistan permanently with no intention of returning.',
    sub_rules: [
      'Rule 221: Submission of application along with summary of all Pakistan-source assets and tax payment receipts.',
      'Rule 222: Form of Tax Clearance Certificate issued to immigration/airport authorities.',
      'Rule 223: Form of Tax Exemption Certificate.'
    ],
    compliance_steps: 'Furnish accelerated return of income up to date of departure and clear all assessed taxes.',
    practical_notes: 'Immigration authorities can restrict departure of individuals without Section 145 clearance upon FBR notification.',
    cross_references: ['Section 145 (Departure from Pakistan)', 'Rule 70', 'First Schedule Part IV']
  },

  // =========================================================================
  // CHAPTER XVIII – MISCELLANEOUS (RULES 224 TO 232)
  // =========================================================================
  {
    id: 'itr-rule-224-228',
    rule_book: 'Income Tax Rules, 2002',
    chapter: 'Chapter XVIII: Miscellaneous – Valuers & Asset Valuation',
    rule_number: 'Rule 224 - 228',
    title: 'Approved Valuers, Scale of Remuneration & Asset Valuation Standards',
    description: 'Regulates the enlistment of State Bank approved valuers and certified engineers, scale of valuation fees, and scientific valuation of real estate, machinery, and business assets under Section 222.',
    sub_rules: [
      'Rule 226: Appointment of independent certified valuers registered with Pakistan Banks\' Association (PBA).',
      'Rule 227: Prescribed slab-based scale of remuneration and travel allowances for approved valuers.',
      'Rule 228: Scientific valuation methodology based on physical inspection, depreciated replacement cost, and market comps.'
    ],
    valuation_methodology: 'Certified appraisal by PBA approved Category-A valuer.',
    compliance_steps: 'Department must provide copy of valuer report to taxpayer before making additions under Section 111.',
    practical_notes: 'Valuations carried out by unapproved private individuals have no evidentiary value before appellate authorities.',
    cross_references: ['Section 222 (Valuers)', 'Section 111', 'Section 68 (Fair Market Value)']
  },
  {
    id: 'itr-rule-229-231h',
    rule_book: 'Income Tax Rules, 2002',
    chapter: 'Chapter XVIII: Miscellaneous – E-Audits, ADR, Group Taxation & Special Panels',
    rule_number: 'Rule 229 - 231H',
    title: 'E-Audit Procedures, Special Audit Panels, ADR, Group Relief & Shariah Rates',
    description: 'Prescribes specialized operational codes for faceless E-Audits (Rule 231FA), Alternative Dispute Resolution Committees (Rule 231C), Group Relief taxation under Section 59AA (Rule 231D), and Shariah-compliant tax concessions.',
    sub_rules: [
      'Rule 231A-231B: Procedure for Advance Rulings under Section 206A for non-residents.',
      'Rule 231C: Alternative Dispute Resolution (ADR) committee appointments, 45-day disposal timeline, and binding decisions.',
      'Rule 231D: Group taxation computation for 100% owned conglomerate holding companies under Section 59AA.',
      'Rule 231E-231FA: Selection criteria and faceless electronic audit protocols for Special Audit Panels (SAP) consisting of Chartered Accountants.',
      'Rule 231H: 2% tax rebate for Shariah-compliant listed companies.'
    ],
    compliance_steps: 'Submit ADR application to FBR Board along with initial tax deposit.',
    practical_notes: 'Under faceless E-Audit (Rule 231FA), no physical taxpayer attendance is permitted; all questions and replies are conducted through IRIS video link.',
    cross_references: ['Section 177 (Audit)', 'Section 134A (ADR)', 'Section 59AA (Group Relief)', 'Section 206A']
  },
  {
    id: 'itr-rule-231i-232',
    rule_book: 'Income Tax Rules, 2002',
    chapter: 'Chapter XVIII: Miscellaneous – Minerals & Repeal',
    rule_number: 'Rule 231I - 232',
    title: 'Mineral Values for Advance Tax u/s 236V & Repeal of 1982 Rules',
    description: 'Prescribes notified values of extracted minerals, coal, marble, and gemstones for advance tax collection under Section 236V, and formal repeal of the Income Tax Rules, 1982.',
    sub_rules: [
      'Rule 231I: Prescribed schedule of market values per metric ton of coal, gypsum, silica sand, and marble for Section 236V withholding.',
      'Rule 232: Formal repeal of previous Income Tax Rules, 1982, with standard savings for past closed transactions.'
    ],
    compliance_steps: 'Provincial Mines and Minerals departments must collect advance tax at the time of issuing transport lease passes.',
    practical_notes: 'Mineral withholding is adjustable against final corporate tax return liability.',
    cross_references: ['Section 236V', 'Section 237']
  },

  // =========================================================================
  // FIRST SCHEDULE TO THE INCOME TAX RULES, 2002 (FORMS & NOTICES)
  // =========================================================================
  {
    id: 'itr-sched1-part1-ftc',
    rule_book: 'Income Tax Rules, 2002',
    chapter: 'First Schedule: Prescribed Statutory Forms & Notices',
    rule_number: 'First Schedule – Part I (Form FTC)',
    title: 'Application for Foreign Tax Credit (FTC) under Section 103',
    description: 'Official prescribed form for resident individuals and companies claiming foreign tax credits on doubly taxed foreign-source employment, dividend, royalty, or business income under Section 103.',
    sub_rules: [
      'Section A: Particulars of foreign tax jurisdiction, tax residency status, and nature of foreign income.',
      'Section B: Computation of gross foreign income, foreign tax withheld/paid, and exchange rate conversions.',
      'Section C: Calculation of Pakistan tax limitation: Lesser of foreign tax paid or Pakistan tax attributable to that foreign income.',
      'Mandatory attachments: Official tax receipts, withholding certificates, and assessment orders issued by foreign tax authorities (e.g. IRS, HMRC).'
    ],
    compliance_steps: 'Complete Form FTC in IRIS and attach certified English translations of foreign revenue certificates.',
    practical_notes: 'Excess foreign tax credit cannot be carried forward or refunded against Pakistan-source income.',
    cross_references: ['Section 103 (Foreign Tax Credit)', 'Rule 28', 'Double Taxation Treaties']
  },
  {
    id: 'itr-sched1-part1-sec122',
    rule_book: 'Income Tax Rules, 2002',
    chapter: 'First Schedule: Prescribed Statutory Forms & Notices',
    rule_number: 'First Schedule – Part I (Rule 68)',
    title: 'Notice Letter for Amendment of Assessment under Section 122',
    description: 'Prescribed statutory show-cause notice format issued by the Commissioner under Section 122(9) proposing to amend an assessment order on grounds of escaped turnover, under-assessed income, or miscalculated deductions.',
    sub_rules: [
      'Specification of original assessment order and tax year under scrutiny.',
      'Detailed itemization of proposed additions, disallowances under Section 21, or unexplained assets under Section 111.',
      'Specific statutory grounds and documentary discrepancies forming the basis of show cause.',
      'Affording minimum 15 days clear time for taxpayer written reply and option for personal hearing.'
    ],
    compliance_steps: 'Taxpayer must submit para-wise written response with financial ledgers and bank statements on IRIS.',
    practical_notes: 'An amendment order passed without serving this mandatory show-cause notice under Rule 68 violates Section 122(9) and is void ab initio.',
    cross_references: ['Section 122(5)/(5A)/(9)', 'Rule 68', 'Section 120']
  },
  {
    id: 'itr-sched1-part2-3-sec140',
    rule_book: 'Income Tax Rules, 2002',
    chapter: 'First Schedule: Prescribed Statutory Forms & Notices',
    rule_number: 'First Schedule – Parts II & III (Rule 69)',
    title: 'Statutory Notice for Recovery of Tax from Banks & Debtors u/s 140',
    description: 'Prescribed legal notice served upon commercial bank branch managers, government treasuries, and commercial debtors commanding immediate payment of funds held on behalf of a defaulting taxpayer to satisfy tax demand.',
    sub_rules: [
      'Part II: Notice under Section 140(1) to general debtors, tenants, and employers holding money for defaulter.',
      'Part III: Notice under Section 140 read with Rule 69 served specifically upon banking company branch managers.',
      'Specifies exact CNIC/NTN, bank account numbers, outstanding tax demand, and National Bank treasury head of account.',
      'Statutory caution: Failure to deposit funds creates direct personal liability on the recipient entity.'
    ],
    compliance_steps: 'Bank manager must immediately freeze and remit available credit balance to the Commissioner.',
    practical_notes: 'If tax demand has been stayed by an Appellate Tribunal or High Court order, bank attachment under this notice is illegal and liable to contempt.',
    cross_references: ['Section 140', 'Rule 69', 'Rule 210B', 'Section 138']
  },
  {
    id: 'itr-sched1-part4-sec145',
    rule_book: 'Income Tax Rules, 2002',
    chapter: 'First Schedule: Prescribed Statutory Forms & Notices',
    rule_number: 'First Schedule – Part IV (Rule 70)',
    title: 'Notice & Tax Clearance Certificate for Person Departing Pakistan Permanently',
    description: 'Prescribed statutory notice issued to individuals leaving Pakistan permanently under Section 145, directing submission of accelerated tax return and issuance of official Tax Clearance Certificate.',
    sub_rules: [
      'Demands immediate filing of return of income for the broken period up to date of departure.',
      'Verification of local asset disposals and settlement of all outstanding income tax and sales tax demands.',
      'Issuance of formal Tax Clearance Certificate forwarded to Federal Investigation Agency (FIA) Immigration.'
    ],
    compliance_steps: 'Furnish bank statements, exit visa, and tax payment proof to receive departure clearance.',
    practical_notes: 'Expatriates terminating employment contracts in Pakistan must obtain this certificate before final repatriation of gratuity funds.',
    cross_references: ['Section 145', 'Rule 70', 'Rule 221', 'Rule 222']
  },
  {
    id: 'itr-sched1-part5-sec170',
    rule_book: 'Income Tax Rules, 2002',
    chapter: 'First Schedule: Prescribed Statutory Forms & Notices',
    rule_number: 'First Schedule – Part V (Rule 71)',
    title: 'Application for Refund of Tax under Section 170',
    description: 'Prescribed statutory application form used by taxpayers to claim refund of advance tax, excess withholding deductions, or appellate relief refunds from the Commissioner.',
    sub_rules: [
      'Section A: Taxpayer particulars, NTN, tax year, and total tax paid via CPRs.',
      'Section B: Tax liability assessed in return versus actual advance tax collected at source.',
      'Section C: Computation of net refundable surplus and bank IBAN details for direct electronic credit.',
      'Mandatory attachments: CPR copies, Section 164 tax deduction certificates, and electricity/telecom bills.'
    ],
    compliance_steps: 'Submit within 3 years from the end of the relevant tax year or appellate order date.',
    practical_notes: 'Under Section 170(4), the Commissioner must pass an order within 60 days of receiving this application.',
    cross_references: ['Section 170 (Refunds)', 'Section 171 (Compensation on Delayed Refund)', 'Rule 71']
  },
  {
    id: 'itr-sched1-part6-7a-sec159',
    rule_book: 'Income Tax Rules, 2002',
    chapter: 'First Schedule: Prescribed Statutory Forms & Notices',
    rule_number: 'First Schedule – Parts VI, VII & VII(a)',
    title: 'Applications for Exemption or Reduced Rate Certificates u/s 159 & 152',
    description: 'Prescribed official application forms for seeking Commissioner exemption or reduced rate certificates from withholding on supply of goods, services, contracts, imports, and foreign technical/royalty payments.',
    sub_rules: [
      'Part VI: Application for exemption from withholding on supply of goods (Sec 153(1)(a)) and execution of contracts (Sec 153(1)(c)).',
      'Part VII: Application for concessionary 0% or reduced withholding rate on service providers, listed companies, and raw material imports.',
      'Part VII(a): Application for reduced rate / treaty exemption on payments to non-residents under Section 152.',
      'Mandatory attachments: Advance tax calculation under Section 147, previous 3 years tax assessments, and turnover reconciliations.'
    ],
    compliance_steps: 'Submit electronically on IRIS; system mandates 15-day statutory disposal timeline.',
    practical_notes: 'Once issued, withholding agents can verify exemption certificate validity live on the FBR online portal before releasing gross invoice payments.',
    cross_references: ['Section 159', 'Section 152', 'Section 153', 'Rule 40', 'Rule 40FA']
  }
];
