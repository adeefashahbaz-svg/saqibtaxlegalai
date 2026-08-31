import { TaxSectionItem, TaxRuleItem } from '../types';

export interface AlliedTaxLawItem {
  id: string;
  act_type: string;
  category: 'Allied Act' | 'Tribunal Rules' | 'Amnesty & Declarations' | 'CRS Guidance' | 'Welfare & Rewards' | 'Wealth & Asset Sharing';
  chapter?: string;
  part_division?: string;
  section_or_rule: string;
  title: string;
  description: string;
  sub_provisions: string[];
  statutory_rates_or_penalties?: string;
  compliance_steps?: string;
  practical_notes: string;
  cross_references: string[];
  page_reference?: string;
}

export const ALLIED_TAX_LAWS_DATA: AlliedTaxLawItem[] = [
  // =========================================================================
  // 1. APPELLATE TRIBUNAL INLAND REVENUE (APPOINTMENTS, TERMS & CONDITIONS) RULES, 2024
  // =========================================================================
  {
    id: 'atir-apt-rule-1-2',
    act_type: 'ATIR (Appointments, Terms and Conditions of Service) Rules, 2024',
    category: 'Tribunal Rules',
    chapter: 'Part I: Preliminary',
    section_or_rule: 'Rules 1 - 2',
    title: 'Title, Extent, Commencement & Regulatory Definitions',
    description: 'Enacts the standardized framework for competitive appointments, tenure, and merit criteria for Judicial and Accountant Members of the Appellate Tribunal Inland Revenue under Section 130 of the Income Tax Ordinance, 2001.',
    sub_provisions: [
      'Rule 1: Extends across Pakistan and took immediate effect upon official gazette notification in 2024.',
      'Rule 2: Defines "Chairperson", "Judicial Member", "Accountant Member", "Search & Selection Committee", and "Ministry of Law & Justice".'
    ],
    compliance_steps: 'Sets statutory eligibility parameters for high court advocates, senior chartered accountants, and senior FBR officers.',
    practical_notes: 'Replaces previous ad-hoc appointment practices to ensure tribunal judicial independence as mandated by superior courts.',
    cross_references: ['Section 130 of ITO 2001', 'Section 131', 'Article 175 of the Constitution'],
    page_reference: 'Pages 1055-1056'
  },
  {
    id: 'atir-apt-rule-3-5',
    act_type: 'ATIR (Appointments, Terms and Conditions of Service) Rules, 2024',
    category: 'Tribunal Rules',
    chapter: 'Part II: Appointment Mechanism & Selection Committee',
    section_or_rule: 'Rules 3 - 5',
    title: 'Manner, Method of Appointment & Independent Selection Committee',
    description: 'Establishes a high-powered Selection Committee chaired by a retired Supreme Court or High Court judge along with Law Secretary and FBR Chairman to conduct transparent public recruitment.',
    sub_provisions: [
      'Rule 3: Appointment of Judicial Members from among qualified District Judges or High Court advocates with 15+ years active tax litigation experience.',
      'Rule 4: Appointment of Accountant Members from among Fellow Chartered Accountants (FCA) / FCMA with 15+ years corporate practice or Inland Revenue Officers (BS-21/BS-22).',
      'Rule 5: Composition, evaluation scoring rubric, and shortlisting procedure of the Selection Committee.'
    ],
    compliance_steps: 'Mandatory competitive evaluation, public advertisement, integrity vetting, and performance metrics.',
    practical_notes: 'Guarantees specialized fiscal expertise on benches hearing high-value corporate tax appeals.',
    cross_references: ['Section 130', 'Rule 3 ATIR Functions Rules 2023'],
    page_reference: 'Pages 1056-1057'
  },
  {
    id: 'atir-apt-rule-6-10',
    act_type: 'ATIR (Appointments, Terms and Conditions of Service) Rules, 2024',
    category: 'Tribunal Rules',
    chapter: 'Part III: Privileges, Tenure, Discipline & Repeal',
    section_or_rule: 'Rules 6 - 10',
    title: 'Deputation, Pay Scales, Judicial Privileges, Disciplinary Removal & Repeal',
    description: 'Fixes pay packages equivalent to High Court judges / MP-I scale, establishes code of judicial conduct, sets five-year fixed tenure (or age 65), and outlines transparent inquiry removal mechanisms.',
    sub_provisions: [
      'Rule 6: Deputation terms for serving judicial officers and civil servants.',
      'Rule 7: Salary, perks, official transport, medical benefits, and official accommodation.',
      'Rule 8: Grounds for removal (misconduct, mental/physical incapacity) through formal inquiry by a Judicial Performance Committee.',
      'Rule 9-10: Confidential service records maintenance and repeal of outdated earlier appointment notifications.'
    ],
    compliance_steps: 'Formal gazette appointment notification issued by Federal Government upon Prime Minister approval.',
    practical_notes: 'Strengthens tribunal authority to operate as an impartial, final fact-finding appellate court.',
    cross_references: ['Section 130', 'Civil Servants Act, 1973'],
    page_reference: 'Pages 1057-1063'
  },

  // =========================================================================
  // 2. ASSETS DECLARATION ACT, 2019 (AMNESTY & REGULARIZATION)
  // =========================================================================
  {
    id: 'ada-2019-sec-1-3',
    act_type: 'Assets Declaration Act, 2019',
    category: 'Amnesty & Declarations',
    chapter: 'Scope & Declarations',
    section_or_rule: 'Sections 1 - 3',
    title: 'Short Title, Scope & Declaration of Undisclosed Assets, Sales & Expenses',
    description: 'Allowed resident and non-resident Pakistani citizens to document previously undisclosed domestic and offshore assets, unrecorded business turnover, and unexplained expenditures without tax penalties.',
    sub_provisions: [
      'Sec 1: Commenced on 14th May, 2019 across all Pakistan territories.',
      'Sec 2: Defined "undisclosed asset", "unrecorded sales", "offshore asset", and "market value".',
      'Sec 3: Permitted declaration of undisclosed immovable properties, cash, bank accounts, jewellery, and unrecorded sales on the IRIS portal.'
    ],
    compliance_steps: 'Filing of online declaration form and electronic payment of statutory tax before 30th June, 2019 (extended to 3rd July, 2019).',
    practical_notes: 'Declarations regularized historical tax evasions and provided immunity against prosecution under ITO 2001 and Sales Tax Act 1990.',
    cross_references: ['Section 111 of ITO 2001', 'Rule 3 ADA Rules 2019'],
    page_reference: 'Pages 1063-1064'
  },
  {
    id: 'ada-2019-sec-4-6',
    act_type: 'Assets Declaration Act, 2019',
    category: 'Amnesty & Declarations',
    chapter: 'Tax Rates & Valuation',
    section_or_rule: 'Sections 4 - 6',
    title: 'Charge of Tax, Default Surcharges & Statutory Asset Valuation Rules',
    description: 'Prescribed concessional tax rates (1.5% to 4%) on immovable properties, liquid foreign assets repatriated to Pakistan (4%), and non-repatriated foreign assets (6%).',
    sub_provisions: [
      'Sec 4: Prescribed fixed tax schedules (1.5% on real estate, 4% on domestic cash/assets, 4% on repatriated foreign funds, 6% on foreign real estate).',
      'Sec 5: Immovable property valued at 150% of FBR notified values or 150% of provincial DC rates (whichever is higher).',
      'Sec 6: Mandatory tax payment timelines and 10% to 40% default surcharges for delayed tax remittance.'
    ],
    statutory_rates_or_penalties: '1.5% for local real estate, 4% for domestic liquid assets, 4% repatriated foreign assets, 6% foreign assets retained abroad.',
    compliance_steps: 'Generate Computerized Payment Receipt (CPR) under PSID code "ADA-2019".',
    practical_notes: 'Valuation formula (150% of FBR table) was legally protected against departmental challenge.',
    cross_references: ['FBR Property Valuation Tables', 'Section 68 of ITO 2001'],
    page_reference: 'Pages 1064-1065'
  },
  {
    id: 'ada-2019-sec-7-19',
    act_type: 'Assets Declaration Act, 2019',
    category: 'Amnesty & Declarations',
    chapter: 'Legal Effects & Immunities',
    section_or_rule: 'Sections 7 - 19',
    title: 'Incorporation in Books, Absolute Evidentiary Immunity, Exclusions & Non-Refundability',
    description: 'Conferred statutory protection ensuring declared assets can be credited into tax wealth statements and accounting balance sheets with complete confidentiality and immunity from NAB, FIA, and customs investigations.',
    sub_provisions: [
      'Sec 7: Full entitlement to incorporate declared values in wealth statement and accounting books.',
      'Sec 8 & 11: Ineligibility for holders of public office (politicians, civil servants), proceeds of money laundering, narcotics, and terror financing.',
      'Sec 12: Declaration strictly inadmissible as evidence in any court or inquiry against the declarant.',
      'Sec 14: Strict criminal confidentiality punishable by 1 year imprisonment for tax officers leaking data.',
      'Sec 16: Overriding effect over all conflicting provisions in any other statute.'
    ],
    compliance_steps: 'Incorporate declared asset figure as an inflow in IRIS Wealth Reconciliation (Section 116) under "Inflows from ADA 2019".',
    practical_notes: 'Officers cannot issue Section 111 notices on assets successfully regularized under ADA 2019.',
    cross_references: ['Section 111', 'Section 116', 'Section 216 of ITO 2001', 'Anti-Money Laundering Act, 2010'],
    page_reference: 'Pages 1066-1068'
  },

  // =========================================================================
  // 3. ASSETS DECLARATION (PROCEDURE AND CONDITIONS) RULES, 2019
  // =========================================================================
  {
    id: 'ada-rules-2019-1-15',
    act_type: 'Assets Declaration (Procedure and Conditions) Rules, 2019',
    category: 'Amnesty & Declarations',
    chapter: 'Procedural Execution Rules',
    section_or_rule: 'Rules 1 - 15',
    title: 'Declaration Workflow, Revision Mechanism, Foreign Remittances & CRS Interplay',
    description: 'Detailed operating regulations governing electronic declaration verification, State Bank of Pakistan foreign currency repatriation channels, CRS data resolution, and beneficial ownership documentation.',
    sub_provisions: [
      'Rule 3-4: Electronic submission workflow on IRIS portal and mandatory CPR tagging.',
      'Rule 7: Permitted revision of declarations to correct clerical errors or increase asset values.',
      'Rule 9-10: Treatment of offshore bank data received under Common Reporting Standard (CRS) and protection for pre-notified accounts.',
      'Rule 11-12: Beneficial ownership verification rules and public office holder exclusion tests.',
      'Rule 15: Restricting departmental access to declaration records to prevent unauthorized harassment.'
    ],
    compliance_steps: 'Submit foreign bank repatriation certificate (PRC) issued by State Bank authorized dealers.',
    practical_notes: 'Filing under these rules neutralized offshore tax evasion notices triggered by automatic OECD data swaps.',
    cross_references: ['Assets Declaration Act 2019', 'State Bank of Pakistan FE Circulars'],
    page_reference: 'Pages 1073-1078'
  },

  // =========================================================================
  // 4. VOLUNTARY DECLARATION OF DOMESTIC ASSETS ACT, 2018
  // =========================================================================
  {
    id: 'vdda-2018-sec-1-15',
    act_type: 'Voluntary Declaration of Domestic Assets Act, 2018',
    category: 'Amnesty & Declarations',
    chapter: 'Domestic Asset Regularization',
    section_or_rule: 'Sections 1 - 15 & Schedule',
    title: 'Domestic Asset Regularization, 2%–5% Tax Rates, Book Incorporation & Safe Harbors',
    description: 'First major statutory scheme introduced in 2018 to declare undocumented domestic gold, real estate, cash, and undisclosed bank balances across Pakistan.',
    sub_provisions: [
      'Sec 1-4: Applied to all resident individuals, AOPs, and corporate entities for assets generated prior to April 2018.',
      'Sec 5-6: Declaration window operative from 10th April, 2018 to 30th June, 2018 (extended to 31st July, 2018).',
      'Sec 7: Concessional tax charges: 2% on foreign currency converted to PKR, 5% on domestic liquid assets, and 3% on immovable property.',
      'Sec 9-10: Balance sheet incorporation and statutory valuation formulas based on FBR/DC rates.',
      'Sec 11-12: Absolute legal immunity from income tax audit and confidentiality protection.'
    ],
    statutory_rates_or_penalties: '2% on domestic foreign currency accounts; 3% on local real estate; 5% on undeclared cash and securities.',
    compliance_steps: 'Declare in IRIS 2018 tax return and retain certificate of payment.',
    practical_notes: 'Assets declared under VDDA 2018 permanently establish legal opening wealth for all subsequent tax years.',
    cross_references: ['Section 111 of ITO 2001', 'Foreign Assets Act 2018'],
    page_reference: 'Pages 1079-1087'
  },

  // =========================================================================
  // 5. FOREIGN ASSETS (DECLARATION AND REPATRIATION) ACT, 2018
  // =========================================================================
  {
    id: 'fara-2018-sec-1-17',
    act_type: 'Foreign Assets (Declaration and Repatriation) Act, 2018',
    category: 'Amnesty & Declarations',
    chapter: 'Offshore Wealth & Repatriation',
    section_or_rule: 'Sections 1 - 17 & Schedule',
    title: 'Offshore Asset Declaration, US Dollar US$ Bond Repatriation, 2%–5% Tax Rates & Immunities',
    description: 'Enacted to regularize foreign liquid accounts, offshore companies, and foreign properties held by Pakistani citizens abroad prior to the implementation of OECD CRS automatic data exchanges.',
    sub_provisions: [
      'Sec 1-4: Applicable to resident individual citizens owning offshore investments, bank deposits, and shares.',
      'Sec 5-6: Declaration window in mid-2018.',
      'Sec 7: Tax Rates: 2% on liquid foreign funds repatriated and invested in Government USD Sovereign Bonds (3-5 years maturity); 3% on liquid funds repatriated in cash; 5% on offshore real estate and assets retained abroad.',
      'Sec 9: Currency conversion at State Bank official interbank exchange rate on payment date.',
      'Sec 11-14: Complete immunity from Foreign Exchange Regulation Act (FERA 1947), NAB, and Income Tax proceedings.'
    ],
    statutory_rates_or_penalties: '2% with USD Bond lock-in; 3% for cash repatriation; 5% for non-repatriated offshore properties.',
    compliance_steps: 'Obtain SBP Repatriation Certificate (PRC) and file Form on FBR offshore portal.',
    practical_notes: 'Foreign assets regularized under this Act are permanently immune from Section 111(1)(b) additions.',
    cross_references: ['Section 116A of ITO 2001', 'FERA 1947', 'Common Reporting Standard'],
    page_reference: 'Pages 1087-1095'
  },

  // =========================================================================
  // 6. GUIDANCE NOTE ON COMMON REPORTING STANDARD (CRS) - AEOI
  // =========================================================================
  {
    id: 'crs-guidance-sec-1-2',
    act_type: 'Guidance Note on Common Reporting Standard (CRS)',
    category: 'CRS Guidance',
    chapter: 'Part 1 & 2: Institutional Scope & Classification',
    section_or_rule: 'Sections 1.1 - 2.16',
    title: 'Financial Institution Classification: Custodial, Depository, Investment Entities & NBFCs',
    description: 'Comprehensive OECD-aligned technical blueprint guiding Pakistani financial entities on determining whether they qualify as Reporting Financial Institutions (RFIs) or Non-Reporting Entities.',
    sub_provisions: [
      'Sec 2.2-2.3: The 4 core Financial Institution categories: (1) Depository Institutions (Commercial & Microfinance Banks); (2) Custodial Institutions (CDC, NCCPL, Execution Brokers); (3) Investment Entities (Mutual Funds, REITs, Private Equity); (4) Specified Insurance Companies (Cash-value life policies & annuities).',
      'Sec 2.6-2.8: Status of Lending NBFCs, Microfinance Companies, and REIT Management Companies.',
      'Sec 2.9-2.11: Specific treatment of Central Depository Company (CDC) and National Clearing Company (NCCPL) as custodial intermediaries.',
      'Sec 2.14-2.15: Classification of Exchange Companies (ECs) and Family/Discretionary Trusts.'
    ],
    compliance_steps: 'Financial institutions must complete formal annual entity classification reviews.',
    practical_notes: 'Non-reporting institutions (such as governmental entities or central banks) are exempt from client reporting burdens.',
    cross_references: ['Section 165B of ITO 2001', 'Rules 78A-78O of Income Tax Rules 2002', 'OECD CRS Standard'],
    page_reference: 'Pages 1101-1116'
  },
  {
    id: 'crs-guidance-sec-3-4',
    act_type: 'Guidance Note on Common Reporting Standard (CRS)',
    category: 'CRS Guidance',
    chapter: 'Part 3 & 4: Account Categorization & Reportable Persons',
    section_or_rule: 'Sections 3.1 - 4.3',
    title: 'Financial Accounts, Cash Value Insurance, Excluded Accounts & Reportable Nexus',
    description: 'Defines reportable depository accounts, custodial holdings, equity/debt interests, cash-value insurance contracts, and lists specific statutorily excluded accounts (retirement funds, escrow, estate accounts).',
    sub_provisions: [
      'Sec 3.2-3.6: Depository accounts, securities custody accounts, mutual fund equity units, and life insurance policies with cash surrender value.',
      'Sec 3.7: Excluded Accounts: Approved provident/gratuity funds, pension accounts, court-mandated escrow deposits, and deceased estate accounts.',
      'Sec 4.1-4.3: Determining reportable accounts based on tax residency of account holder or controlling persons (Beneficial Owners) of Passive Non-Financial Entities (NFEs).'
    ],
    compliance_steps: 'Filter out excluded pension and court escrow accounts from CRS reporting extract.',
    practical_notes: 'Active NFEs (operating manufacturing/trading companies) are not looked-through to controlling persons; only Passive NFEs trigger controlling person reporting.',
    cross_references: ['Rule 78C', 'Rule 78D', 'FATF 25% Beneficial Ownership Rule'],
    page_reference: 'Pages 1116-1125'
  },
  {
    id: 'crs-guidance-sec-5',
    act_type: 'Guidance Note on Common Reporting Standard (CRS)',
    category: 'CRS Guidance',
    chapter: 'Part 5: Due Diligence Procedures',
    section_or_rule: 'Sections 5.1 - 5.11',
    title: 'Due Diligence: Pre-Existing vs New Accounts, High-Value Indicia Search & Self-Certifications',
    description: 'Sets out mandatory AML/KYC due diligence procedures, electronic searches, paper file reviews for high-value accounts (>US$ 1,000,000), relationship manager enquiries, and self-certification validity.',
    sub_provisions: [
      'Sec 5.3-5.5: Pre-existing Lower Value Accounts (<$1M) – Current residential address test and electronic search for foreign indicia (foreign passport, telephone, power of attorney).',
      'Sec 5.6: Pre-existing High Value Accounts (>$1M) – Mandatory electronic search, physical paper file inspection, and relationship manager inquiry.',
      'Sec 5.7: Due diligence for Pre-existing Entity Accounts (Threshold >$250,000 for entity review).',
      'Sec 5.8-5.9: New Individual & Entity Accounts – Mandatory signed CRS Self-Certification form with Tax Identification Number (TIN) at account opening.',
      'Sec 5.10: Change in circumstances rule: 90-day curing period to obtain updated documentary proof upon foreign address or citizenship change.'
    ],
    compliance_steps: 'Obtain CRS self-certification on initial bank account opening; verify TIN on OECD portal.',
    practical_notes: 'Failure by a bank to obtain valid self-certifications can lead to regulatory fines from State Bank and FBR under Section 182.',
    cross_references: ['Rule 78E-78I', 'Section 165B', 'SBP AML/CFT Regulations'],
    page_reference: 'Pages 1126-1144'
  },
  {
    id: 'crs-guidance-sec-6',
    act_type: 'Guidance Note on Common Reporting Standard (CRS)',
    category: 'CRS Guidance',
    chapter: 'Part 6: Information Reporting Protocols',
    section_or_rule: 'Sections 6.1 - 6.7',
    title: 'Annual CRS Reporting Payload: Account Balances, Gross Interest, Dividends & XML Transmission',
    description: 'Specifies the data schema, account balance valuation at calendar year end (31st December), gross proceeds reporting, multi-currency conversion, joint account allocation, and annual 31st May submission.',
    sub_provisions: [
      'Sec 6.2: Core reporting payload: Full Legal Name, Residential Address, Tax Jurisdiction, Foreign TIN, Date of Birth, Account Number, and Year-End Balance.',
      'Sec 6.2.9: Joint Accounts – Full account balance reported for EACH reportable joint holder (no 50% split in reporting).',
      'Sec 6.3: Closed Accounts – Report account closure and balance immediately prior to closure.',
      'Sec 6.5: Custodial accounts report total gross interest, dividends, and gross redemption sales proceeds during the year.',
      'Sec 6.6-6.7: Base currency USD conversion rules and historical account exceptions.'
    ],
    compliance_steps: 'Generate and validate OECD CRS XML Schema file and transmit via FBR AEOI secure portal by 31st May annually.',
    practical_notes: 'FBR packages all Pakistani bank CRS payloads and securely swaps them with foreign revenue agencies worldwide.',
    cross_references: ['Section 165B of ITO 2001', 'Rule 78L', 'OECD XML Schema v2.0'],
    page_reference: 'Pages 1145-1154'
  },

  // =========================================================================
  // 7. THE INLAND REVENUE REWARD RULES, 2021
  // =========================================================================
  {
    id: 'ir-reward-rules-2021',
    act_type: 'The Inland Revenue Reward Rules, 2021',
    category: 'Welfare & Rewards',
    chapter: 'Informer & Officer Rewards',
    section_or_rule: 'Rules 1 - 10',
    title: 'Financial Rewards for Whistleblowers, Tax Informers & Officers for Tax Evasion Detection',
    description: 'Prescribes statutory percentages and disbursement criteria for financial rewards paid to whistleblowers, public informers, and Inland Revenue officers who detect concealed income, unrecorded sales, or fraudulent refund claims under Section 227B.',
    sub_provisions: [
      'Rewards for Informers/Whistleblowers: Up to 20% of the additional tax actually recovered into the Federal Treasury.',
      'Rewards for IR Officers & Staff: Up to 10% to 15% of the recovered tax pool for meritorious assessment and recovery work.',
      'Condition Precedent: Reward is only sanctioned after appellate finality (once appeal before Tribunal or High Court is decided in favour of the department) and actual monetary realization.',
      'Confidentiality & Protection: Whistleblower identity is kept classified under official state secrecy provisions.'
    ],
    statutory_rates_or_penalties: 'Up to 20% of net tax recovered for whistleblowers; 10%-15% for meritorious audit teams.',
    compliance_steps: 'Submit whistleblowing dossier with documentary evidence to FBR Member Inland Revenue (Operations).',
    practical_notes: 'Frivolous or malicious claims are rejected and can lead to perjury proceedings.',
    cross_references: ['Section 227B of ITO 2001', 'Section 72D of Sales Tax Act 1990'],
    page_reference: 'Pages 1155-1164'
  },

  // =========================================================================
  // 8. INLAND REVENUE WELFARE FUND RULES, 2016
  // =========================================================================
  {
    id: 'ir-welfare-rules-2016',
    act_type: 'Inland Revenue Welfare Fund Rules, 2016',
    category: 'Welfare & Rewards',
    chapter: 'Welfare Funds & Governance',
    section_or_rule: 'Rules 1 - 11',
    title: 'Central & Regional IR Welfare Fund Boards, Grants, Healthcare & Educational Support',
    description: 'Establishes the governance structure, fund accumulation, and welfare disbursement mechanisms for supporting serving and retired Inland Revenue employees and their families.',
    sub_provisions: [
      'Rule 3-4: Constitution of Central Welfare Board (chaired by Chairman FBR) and Regional Welfare Boards across Regional Tax Offices (RTOs/LTOs).',
      'Rule 5-6: Functions: Educational scholarships for children of employees, emergency medical relief grants, funeral assistance, and widow pensions.',
      'Rule 7-8: Income of the fund generated from 5% deduction of departmental reward pool, voluntary contributions, and treasury investments.',
      'Rule 9-11: Rigorous annual financial audit and statutory accounting oversight.'
    ],
    compliance_steps: 'Applications for hardship grants processed through Regional Welfare Committees.',
    practical_notes: 'Ensures dedicated social security coverage for lower-tier departmental staff.',
    cross_references: ['Federal Employees Benevolent Fund & Group Insurance Act, 1969'],
    page_reference: 'Pages 1165-1169'
  },

  // =========================================================================
  // 9. CAPITAL VALUE TAX (CVT), 2022 & CVT RULES, 2022
  // =========================================================================
  {
    id: 'cvt-act-rules-2022',
    act_type: 'Capital Value Tax (CVT), 2022 & CVT Rules, 2022',
    category: 'Allied Act',
    chapter: 'Capital Value Tax Framework',
    section_or_rule: 'Sections 1 - 10 & Rules 1 - 8',
    title: 'Capital Value Tax on Luxury Motor Vehicles, High-Value Foreign Assets & Immovable Property',
    description: 'Levies Capital Value Tax (CVT) under the Finance Act, 2022 on high-capacity luxury motor vehicles, foreign assets held by resident individuals, and specified high-value immovable properties.',
    sub_provisions: [
      'CVT on Foreign Assets: 1% of the total value of foreign immovable property and liquid foreign assets where aggregate foreign wealth exceeds PKR 100 million.',
      'CVT on Motor Vehicles: 1% on engine capacity 1300cc to 1600cc; 2% on 1600cc to 1800cc; 2% on 1800cc+; 1% on electric vehicles with battery capacity 50kwh+.',
      'CVT on Capital Assets in Islamabad Capital Territory (ICT): 1% on sale/purchase of commercial and residential plots.',
      'Rules 2022: Prescribes electronic collection by motor vehicle registration authorities and annual self-assessment filing in IRIS.'
    ],
    statutory_rates_or_penalties: '1% on offshore assets (>PKR 100M); 1%–2% on luxury motor vehicles; 1% on ICT property transactions.',
    compliance_steps: 'Resident individuals with foreign wealth exceeding PKR 100M must calculate 1% CVT in IRIS return and pay via CPR.',
    practical_notes: 'CVT is an adjustable/separate tax liability and cannot be offset against regular income tax reductions.',
    cross_references: ['Section 8 of Finance Act 2022', 'Section 116A of ITO 2001'],
    page_reference: 'Pages 1171-1180'
  },

  // =========================================================================
  // 10. SHARING OF DECLARATION OF ASSETS OF CIVIL SERVANTS RULES, 2023
  // =========================================================================
  {
    id: 'civil-servants-assets-rules-2023',
    act_type: 'Sharing of Declaration of Assets of Civil Servants Rules, 2023',
    category: 'Wealth & Asset Sharing',
    chapter: 'Civil Servants Transparency Rules',
    section_or_rule: 'Rules 1 - 8',
    title: 'Inter-Agency Asset Sharing of BS-17 to BS-22 Civil Servants with Commercial Banks',
    description: 'Mandates automated, electronic inter-agency sharing of asset declaration records of civil servants (BPS-17 to BPS-22) between the Federal Government (Establishment Division/FBR) and commercial banks for high-risk Politically Exposed Persons (PEPs) screening under FATF requirements.',
    sub_provisions: [
      'Rule 3: Establishes a secure digital data exchange API between State Bank, Establishment Division, FBR, and authorized commercial banks.',
      'Rule 4: Banks authorized to request and cross-check declared asset profiles of civil servants opening accounts or seeking credit facilities.',
      'Rule 5: Stringent data privacy safeguards restricting use strictly to Anti-Money Laundering (AML) / PEP compliance.',
      'Rule 7: Penalties and legal liability for unauthorized disclosure or misuse of civil servant asset declarations.'
    ],
    compliance_steps: 'Commercial banks submit electronic query with civil servant CNIC through SBP secure gateway.',
    practical_notes: 'Designed to eliminate undocumented shell assets and satisfy FATF recommendation on domestic Politically Exposed Persons (PEPs).',
    cross_references: ['Anti-Money Laundering Act, 2010', 'Civil Servants (Conduct) Rules, 1964'],
    page_reference: 'Pages 1203-1206'
  },

  // =========================================================================
  // 11. APPELLATE TRIBUNAL INLAND REVENUE (FUNCTIONS) RULES, 2023
  // =========================================================================
  {
    id: 'atir-fn-rules-1-10',
    act_type: 'ATIR (Functions) Rules, 2023',
    category: 'Tribunal Rules',
    chapter: 'Part I: Constitution of Benches & Filing Protocol',
    section_or_rule: 'Rules 1 - 10',
    title: 'Bench Constitution, Registry Hours, Electronic Filing & Necessary Respondents',
    description: 'Governs the composition of Division and Single Benches of the Appellate Tribunal Inland Revenue, Registry operational hours, appeal registration, and naming proper respondents (Commissioner Inland Revenue).',
    sub_provisions: [
      'Rule 3: Constitution of Division Benches (consisting of 1 Judicial Member and 1 Accountant Member) and Single Benches (for tax demands up to statutory monetary limits).',
      'Rule 4: Sittings of Benches at Islamabad, Lahore, Karachi, Peshawar, and Multan.',
      'Rule 8-9: Procedure for presenting memorandum of appeal to the Registrar in quadruplicate within 60 days of CIR(A) order.',
      'Rule 10: The concerned Commissioner Inland Revenue (or Commissioner Appeals) must be joined as respondent.'
    ],
    compliance_steps: 'File memorandum of appeal in 4 sets with certified copies of assessment and CIR(A) orders along with court fee.',
    practical_notes: 'A Single Bench can only decide appeals where the disputed tax or tax loss does not exceed PKR 5 million.',
    cross_references: ['Section 130 of ITO 2001', 'Section 131', 'Section 132'],
    page_reference: 'Pages 1207-1208'
  },
  {
    id: 'atir-fn-rules-11-20',
    act_type: 'ATIR (Functions) Rules, 2023',
    category: 'Tribunal Rules',
    chapter: 'Part II: Memorandum of Appeal, Affidavits, Condonation & Cause Lists',
    section_or_rule: 'Rules 11 - 20',
    title: 'Grounds of Appeal, Affidavits, Limitation Delay Condonation & Cause List Rosters',
    description: 'Sets precise drafting standards for appeal memorandums (concise, numbered grounds without arguments), Vakalatnama authorization, limitation delay explanations under Section 5 of Limitation Act, and weekly cause list rosters.',
    sub_provisions: [
      'Rule 11-12: Grounds of appeal must be concise, distinct, and without narrative argument; accompanied by index of documents.',
      'Rule 14: Mandatory affidavit in support of any disputed question of fact not borne on lower record.',
      'Rule 16-17: Procedure for curing defective appeals and filing formal condonation application for appeals filed after 60 days.',
      'Rule 18: Power of Attorney (Vakalatnama) bearing prescribed stamp by Advocate or FCA.',
      'Rule 20: Preparation and public posting of weekly cause lists on notice board and website.'
    ],
    compliance_steps: 'Draft grounds of appeal under separate legal headings; attach certified treasury fee receipt of PKR 5,000 (corporate) or PKR 2,000 (individual).',
    practical_notes: 'New grounds not raised before CIR(A) can only be argued with prior leave of the Tribunal under Rule 15.',
    cross_references: ['Section 131', 'Section 5 of Limitation Act, 1908', 'Form A'],
    page_reference: 'Pages 1209-1210'
  },
  {
    id: 'atir-fn-rules-21-33',
    act_type: 'ATIR (Functions) Rules, 2023',
    category: 'Tribunal Rules',
    chapter: 'Part III: Hearings, Additional Evidence, Ex-Parte Recall, Remand & Stay Applications',
    section_or_rule: 'Rules 21 - 33',
    title: 'Oral Arguments, Additional Evidence Admissibility, Remand Protocols & Miscellaneous Stay Applications',
    description: 'Comprehensive trial procedures for oral arguments, producing fresh evidence under Rule 25, setting aside ex-parte dismissal orders, remand instructions, and hearing urgent stay applications.',
    sub_provisions: [
      'Rule 21: Full hearing of appellant and departmental representative (DR); bench may adjourn for reasonable cause.',
      'Rule 22: Ex-parte dismissal for non-appearance and restoration application within 30 days upon showing sufficient cause.',
      'Rule 25-26: Production of additional evidence strictly permitted only where lower authorities refused admission without justification.',
      'Rule 28: Remand of case with specific legal directions to Commissioner or CIR(A).',
      'Rule 29: Final order must be in writing, signed, and dated by all bench members; dissenting opinion triggers larger bench reference.',
      'Rule 32-33: Miscellaneous Applications (MA) for stay of tax demand or rectification under Section 221 heard by the same original bench.'
    ],
    compliance_steps: 'For urgent stay of demand under Section 131(5), file Miscellaneous Application supported by stay affidavit and tax payment challans.',
    practical_notes: 'ATIR stay of recovery is statutorily capped at a maximum aggregate period of 180 days.',
    cross_references: ['Section 131(5)', 'Section 132', 'Section 221 of ITO 2001'],
    page_reference: 'Pages 1211-1212'
  },
  {
    id: 'atir-fn-rules-34-46',
    act_type: 'ATIR (Functions) Rules, 2023',
    category: 'Tribunal Rules',
    chapter: 'Part IV: Certified Copies, Archives, Automation, Schedules & Prescribed Forms',
    section_or_rule: 'Rules 34 - 46 & Schedules I-IV, Forms A-C',
    title: 'Certified Copies Fee, Record Preservation/Destruction, E-Tribunal Portal & Prescribed Forms',
    description: 'Regulates certified copy fees, digitization of judicial archives, electronic case filing, and prescribes statutory appeal templates (Form A for appeals, Form B for stay, Form C for reference).',
    sub_provisions: [
      'Rule 34-35: Copying and inspection fees schedule and treasury deposit reconciliation.',
      'Rule 36-42: Classification of judicial records into Part A (permanent preservation) and Part B (destruction after 5 years).',
      'Rule 45: Computerization, e-filing portal, electronic SMS/email notice generation, and online certified order downloads.',
      'Schedule-I to IV: Fee schedules, registry powers, and administrative registers.',
      'FORM A: Prescribed Memorandum of Appeal to ATIR.',
      'FORM B: Prescribed Stay Application format.',
      'FORM C: Prescribed Application for Rectification of Mistake.'
    ],
    compliance_steps: 'Download certified order copy via e-Tribunal portal using unique barcode citation.',
    practical_notes: 'Certified copy of ATIR order is mandatory for filing Income Tax Reference Application (ITRA) before the High Court within 90 days under Section 133.',
    cross_references: ['Section 133 (High Court Reference)', 'Rule 78 of Income Tax Rules 2002'],
    page_reference: 'Pages 1212-1221'
  },

  // =========================================================================
  // 12. WORKERS WELFARE FUND (WWF) ORDINANCE, 1971 (COMPLETE SECTION-BY-SECTION)
  // =========================================================================
  {
    id: 'wwf-sec-1-2',
    act_type: 'Workers Welfare Fund Ordinance, 1971',
    category: 'Allied Act',
    chapter: 'Part I: Preliminary & Core Definitions',
    section_or_rule: 'Sections 1 - 2',
    title: 'Short Title, Territorial Extent, Commencement & Statutory Definitions',
    description: 'Extends the Workers Welfare Fund across Pakistan to establish a national capital welfare fund for industrial and commercial workers, defining "Act", "employer", "industrial establishment", "Secretary", and "worker".',
    sub_provisions: [
      'Sec 1: Extends to the whole of Pakistan and came into force on 9th December, 1971.',
      'Sec 2(a)-(c): Defines "Act" as Income Tax Ordinance, 2001; "employer" as owner or manager of an industrial establishment.',
      'Sec 2(f): Broad definition of "industrial establishment" covering factories under Factories Act 1934, mines, commercial establishments, trans-provincial establishments, and enterprises with 10+ employees.',
      'Sec 2(j): Defines "worker" as any person employed in an establishment directly or through contractors for manual, clerical, technical or administrative labor.'
    ],
    compliance_steps: 'Verify whether corporate entity or manufacturing plant meets the threshold definition of "industrial establishment".',
    practical_notes: 'Applies to trans-provincial corporate groups and federal territory establishments under the post-18th amendment legal framework.',
    cross_references: ['Factories Act, 1934', 'Mines Act, 1923', 'Industrial Relations Act, 2012'],
    page_reference: 'Pages 1229-1230'
  },
  {
    id: 'wwf-sec-3-4',
    act_type: 'Workers Welfare Fund Ordinance, 1971',
    category: 'Allied Act',
    chapter: 'Part II: Fund Constitution, 2% Levy & Assessment Machinery',
    section_or_rule: 'Sections 3 - 4',
    title: 'Constitution of Workers Welfare Fund & Mode of 2% Payment and Recovery',
    description: 'Constitutes the Federal Workers Welfare Fund and imposes a mandatory 2% statutory contribution on the total assessable income or accounting profit (whichever is higher) of every industrial establishment having income exceeding PKR 500,000.',
    sub_provisions: [
      'Sec 3: Initial government grant of Rs. 100 million plus statutory 2% levies, investments, loans, and voluntary donations.',
      'Sec 4(1): Mode of Payment: Every industrial establishment whose total income in any year is not less than PKR 500,000 shall pay 2% of such income to the Fund.',
      'Sec 4(2): Assessed and collected by the Commissioner Inland Revenue in like manner as income tax is assessed and recovered under the Income Tax Ordinance, 2001.',
      'Sec 4(3): Due date corresponds to the filing date of the annual income tax return under Section 114.'
    ],
    statutory_rates_or_penalties: '2% of assessable income / accounting profit (whichever is higher).',
    compliance_steps: 'Compute 2% WWF liability on taxable income or accounting profit before tax; generate Computerized Payment Receipt (CPR) under WWF Head.',
    practical_notes: 'Commissioner can issue show-cause notices for WWF short-payments under Section 4 with regular appellate remedies before CIR(A) and ATIR.',
    cross_references: ['Section 114 of ITO 2001', 'Section 120', 'Section 137', 'Section 205'],
    page_reference: 'Pages 1230-1231'
  },
  {
    id: 'wwf-sec-4a-5',
    act_type: 'Workers Welfare Fund Ordinance, 1971',
    category: 'Allied Act',
    chapter: 'Part III: Additional Levies & Successor Liability',
    section_or_rule: 'Sections 4A - 5',
    title: 'Payment of Further Amount on Assessment Revision & Discharge of Liability by Successors',
    description: 'Regulates additional WWF payments upon finalization of amended income tax assessments and imposes personal joint liability on liquidators, legal representatives, and transferees of industrial establishments.',
    sub_provisions: [
      'Sec 4A: Where total income is increased pursuant to an assessment order under Section 122 or appellate order under Section 129/132, the establishment shall pay an additional 2% on the incremental income.',
      'Sec 5: Liability to be discharged by executors, administrators, liquidators of companies in winding up, and transferees of business assets.',
      'Sec 5(2): Bar on distributing company assets during liquidation until WWF liabilities are fully certified as settled.'
    ],
    compliance_steps: 'Recalculate 2% WWF upon receipt of any amended assessment order under Section 122.',
    practical_notes: 'Liquidators must obtain a formal WWF No-Objection Certificate (NOC) from FBR prior to distributing liquidation proceeds.',
    cross_references: ['Section 122 of ITO 2001', 'Companies Act 2017 (Winding-up Provisions)'],
    page_reference: 'Pages 1231-1232'
  },
  {
    id: 'wwf-sec-6-7',
    act_type: 'Workers Welfare Fund Ordinance, 1971',
    category: 'Allied Act',
    chapter: 'Part IV: Application of Fund & Tripartite Governing Body',
    section_or_rule: 'Sections 6 - 7',
    title: 'Permissible Fund Expenditures & Constitution of Tripartite Governing Body',
    description: 'Restricts the deployment of Fund capital exclusively to worker housing schemes, education, and medical facilities, and establishes a representative Governing Body comprising Federal Government, Provincial Governments, Employers, and Workers.',
    sub_provisions: [
      'Sec 6: Moneys in the Fund shall be applied solely for: (a) financing housing projects for industrial workers; (b) educational scholarships and institutions for workers children; (c) medical grants and marriage support; (d) administrative expenditure.',
      'Sec 7(1)-(2): Tripartite Governing Body chaired by Secretary, Ministry of Overseas Pakistanis & Human Resource Development.',
      'Sec 7(3): Equal tripartite representation of employers (trade associations) and workers (registered trade unions).'
    ],
    compliance_steps: 'Industrial workers submit housing and scholarship applications through certified employer endorsements.',
    practical_notes: 'Monies cannot be diverted into general federal budgetary revenues; funds remain ring-fenced for labor welfare.',
    cross_references: ['Workers Children (Education) Ordinance, 1972', 'Provincial Employees Social Security Ordinance, 1965'],
    page_reference: 'Pages 1232-1233'
  },
  {
    id: 'wwf-sec-8-10a',
    act_type: 'Workers Welfare Fund Ordinance, 1971',
    category: 'Allied Act',
    chapter: 'Part V: Administration, Secretariat & Fund Vesting',
    section_or_rule: 'Sections 8 - 10A',
    title: 'Secretary & Staff Appointments, Operational Guidelines, Functions & Capital Vesting',
    description: 'Defines the executive powers of the Secretary of the Fund, procedural rules for meetings and quorum, statutory sanctioning of housing colonies, and irrevocable vesting of allocated funds into provincial labor boards.',
    sub_provisions: [
      'Sec 8: Appointment of Secretary and key administrative staff of the Governing Body.',
      'Sec 9: Procedure for convening meetings, quorum rules, and minute recordings.',
      'Sec 10: Functions: Approving annual labor welfare schemes, monitoring construction projects, investing surplus funds, and auditing project accounts.',
      'Sec 10A: Vesting of money allocated from the Fund into Provincial Workers Welfare Boards as non-lapsable dedicated trust capital.'
    ],
    compliance_steps: 'Annual budget submission and audit review by the Auditor General of Pakistan.',
    practical_notes: 'Vested funds cannot be recalled into the Federal Consolidated Fund once allocated for approved labor projects.',
    cross_references: ['Auditor General Ordinance, 2001', 'Public Finance Management Act, 2019'],
    page_reference: 'Pages 1233-1234'
  },
  {
    id: 'wwf-sec-11-11c',
    act_type: 'Workers Welfare Fund Ordinance, 1971',
    category: 'Allied Act',
    chapter: 'Part VI: Accounts, Provincial Welfare Boards & Corporate Powers',
    section_or_rule: 'Sections 11 - 11C',
    title: 'Maintenance of Books of Account, Constitution of Workers Welfare Boards & Corporate Powers',
    description: 'Mandates strict commercial double-entry bookkeeping, creates provincial and regional Workers Welfare Boards as statutory bodies corporate with perpetual succession, and outlines their powers to acquire and manage real estate.',
    sub_provisions: [
      'Sec 11: Annual preparation of balance sheets, revenue accounts, and independent statutory audits.',
      'Sec 11A: Constitution of Workers Welfare Boards for each Province and Islamabad Capital Territory.',
      'Sec 11B: Every Board shall be a body corporate having perpetual succession and a common seal, with power to acquire, hold and transfer property.',
      'Sec 11C: Powers of the Board to execute housing colonies, schools, hospitals, and technical training centers.'
    ],
    compliance_steps: 'Provincial Boards submit quarterly progress reports to the Federal Governing Body.',
    practical_notes: 'Empowers provincial boards to directly contract civil infrastructure works for worker residential complexes.',
    cross_references: ['Companies Act, 2017', 'Specific Relief Act, 1877'],
    page_reference: 'Pages 1234-1235'
  },
  {
    id: 'wwf-sec-11d-11f',
    act_type: 'Workers Welfare Fund Ordinance, 1971',
    category: 'Allied Act',
    chapter: 'Part VII: Estate Management, Rent Recovery & Summary Eviction',
    section_or_rule: 'Sections 11D - 11F',
    title: 'Recovery of Rent as Land Revenue, Summary Eviction of Unauthorized Occupants & Order Finality',
    description: 'Equips Welfare Boards with summary magisterial and revenue recovery powers to collect unpaid residential rent as arrears of land revenue and summarily evict unauthorized occupants or retired employees.',
    sub_provisions: [
      'Sec 11D: Unpaid rent or maintenance dues recoverable as arrears of land revenue through District Revenue Collectors.',
      'Sec 11E: Summary Eviction: Board may issue 14-day notice to evict any person who ceases to be a worker, sublets, or defaults on rent.',
      'Sec 11F: Finality of Order: Orders passed by the authorized officer under Sec 11D or 11E are final and cannot be called into question before civil courts.'
    ],
    compliance_steps: 'Occupants must maintain active worker employment status and remit monthly maintenance rentals.',
    practical_notes: 'Civil court jurisdiction is explicitly ousted under Section 11F regarding welfare colony tenancy evictions.',
    cross_references: ['Land Revenue Act, 1967', 'Code of Civil Procedure, 1908 (Section 9 Bar)'],
    page_reference: 'Pages 1235-1236'
  },
  {
    id: 'wwf-sec-12-16',
    act_type: 'Workers Welfare Fund Ordinance, 1971',
    category: 'Allied Act',
    chapter: 'Part VIII: Delegation, Remissions, Indemnity, Rules & Complete Tax Exemption',
    section_or_rule: 'Sections 12 - 16',
    title: 'Delegation of Powers, Remission Authority, Good Faith Indemnity, Rule-Making & Total Tax Exemption',
    description: 'Empowers the Federal Government and Governing Body to delegate administrative duties, remit penalties for hardship cases, grant indemnity for official acts, enact executive rules, and confers total exemption from income and wealth taxes on the Fund.',
    sub_provisions: [
      'Sec 12: Delegation of Governing Body powers to the Secretary, Board, or sub-committees.',
      'Sec 13: Federal Government power to remit, waive or reduce any amount due from an establishment under extraordinary hardship.',
      'Sec 14: Protection of action taken in good faith (indemnity against civil and criminal suits for officers).',
      'Sec 15: Power of Federal Government to make rules for the implementation of the Ordinance.',
      'Sec 16: Exemption from Taxes: The Fund and all income, capital gains, and properties held by the Fund are completely exempt from income tax, sales tax, property tax, and all other federal and provincial taxes.'
    ],
    compliance_steps: 'In case of natural calamity or closure of industrial unit, petition the Federal Government under Section 13 for remission.',
    practical_notes: 'Confirms that investments and interest generated by the Workers Welfare Fund cannot be taxed under ITO 2001.',
    cross_references: ['Clause 66 Part I Second Schedule of ITO 2001', 'General Clauses Act, 1897'],
    page_reference: 'Pages 1236-1238'
  },

  // =========================================================================
  // 13. DIGITAL PRESENCE PROCEEDS TAX ACT, 2025 [REPEALED / CONSOLIDATED]
  // =========================================================================
  {
    id: 'dppt-act-2025-repealed',
    act_type: 'Digital Presence Proceeds Tax Act, 2025 [Repealed]',
    category: 'Allied Act',
    chapter: 'Digital Economy Taxation',
    section_or_rule: 'Sections 1 - 12 [Repealed]',
    title: 'Taxation of Non-Resident Digital Platforms, Significant Economic Presence & Subsequent Legislative Consolidation',
    description: 'Enacted to tax foreign technology enterprises, digital advertising networks, social media platforms, cloud hosting providers, and e-commerce aggregators having significant economic digital presence in Pakistan, subsequently repealed and consolidated into the Income Tax Ordinance, 2001 (Sections 101, 102 & 109A).',
    sub_provisions: [
      'Scope & Nexus: Imposed a 5% digital equalization levy on gross digital payments made to non-resident entities lacking physical permanent establishments (PEs).',
      'Covered Digital Services: Online search engines, cloud computing, digital streaming, digital marketplaces, ride-hailing app platform fees, and social media advertisement revenue.',
      'Withholding Mechanism: Authorized banks and payment gateways (1-Link, Master/Visa/PayPak) to deduct tax at source upon international outward card/wire remittance.',
      'Repeal & Consolidation: Formally repealed to prevent double taxation conflicts and aligned with the OECD/G20 Inclusive Framework (Two-Pillar Solution / Pillar One) and integrated directly under Section 102 (Offshore Digital Services) of the Income Tax Ordinance, 2001.'
    ],
    statutory_rates_or_penalties: 'Historical 5% gross digital levy; currently superseded by standard 10%–15% gross withholding under Section 152(1C)/(1D) of ITO 2001.',
    compliance_steps: 'Cross-border digital services are now governed under Section 152 of ITO 2001 and Provincial Sales Tax on Telecommunication/IT Services.',
    practical_notes: 'Important for tax practitioners analyzing historical digital tax assessments and ongoing OECD Pillar One global minimum tax transitions.',
    cross_references: ['Section 101(3) of ITO 2001', 'Section 102', 'Section 109A', 'Section 152', 'OECD Pillar One Amount A Blueprint'],
    page_reference: 'Pages 1239-1245'
  },

  // =========================================================================
  // 14. SUPREME COURT (PRACTICE AND PROCEDURE) ACT, 2023
  // =========================================================================
  {
    id: 'sc-practice-procedure-act-2023',
    act_type: 'Supreme Court (Practice and Procedure) Act, 2023',
    category: 'Tribunal Rules',
    chapter: 'Constitutional Appellate Architecture',
    section_or_rule: 'Sections 1 - 8',
    title: 'Constitution of Benches, Original Jurisdiction (Article 184(3)), Right of Appeal & Tax Constitutional Review',
    description: 'Statutory landmark regulating the exercise of the Supreme Court of Pakistan original jurisdiction, bench formations through a 3-member committee of senior judges, guaranteed right of intra-court appeal against suo motu orders, urgent hearing fixation, and counsel of choice representation in tax and constitutional disputes.',
    sub_provisions: [
      'Sec 2: Constitution of Benches: Every cause, appeal or matter before the Supreme Court shall be heard and disposed of by a Bench constituted by the Committee consisting of the Chief Justice of Pakistan and the two next most senior Judges.',
      'Sec 3: Exercise of Original Jurisdiction (Article 184(3)): Any matter invoking fundamental rights of public importance shall be first placed before the Committee for decision on bench constitution consisting of not less than 3 judges.',
      'Sec 4: Interpretation of Constitutional Provisions: Any case involving substantial questions of law regarding constitutional interpretation shall be heard by a Bench of not less than 5 Judges.',
      'Sec 5: Mandatory Right of Appeal: An appeal shall lie within 30 days to a larger Bench of the Supreme Court against any order passed by a Bench exercising original jurisdiction under Article 184(3).',
      'Sec 6: Right to Appoint Counsel of Choice: The party filing an appeal under Section 5 or review application under Article 188 shall have the absolute right to appoint any Advocate on Record (AOR) or Senior Advocate of the Supreme Court of their choice.',
      'Sec 7: Urgent Fixation: Urgent stay or constitutional applications must be fixed for hearing within 14 days of filing.'
    ],
    compliance_steps: 'In federal tax constitutional petitions (e.g. challenging retrospective super tax or CVT), file appeals under Section 5 within 30 days of any adverse 184(3) judgment.',
    practical_notes: 'Landmark full court judgment (PLD 2023 SC 705) upheld the constitutionality of this Act, cementing democratic transparency and ending unilateral master-of-roster powers.',
    cross_references: ['Article 184(3) of the Constitution', 'Article 185 (Appellate Jurisdiction)', 'Article 188 (Review)', 'Section 133 of ITO 2001', 'PLD 2023 SC 705'],
    page_reference: 'Pages 1246-1254'
  }
];
