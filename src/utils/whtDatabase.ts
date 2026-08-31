// Withholding Tax (WHT) Directory & Rate Engine
// Income Tax Ordinance, 2001 (as amended by the Finance Act)

export type WHTCategory = 
  | 'banking_cash'
  | 'real_estate'
  | 'vehicles'
  | 'profit_on_debt'
  | 'goods_services'
  | 'salary_dividend'
  | 'foreign_remittance'
  | 'distribution_retail'
  | 'miscellaneous';

export type WHTNature = 'adjustable' | 'minimum' | 'final';

export interface WHTProvision {
  id: string;
  sectionCode: string;
  title: string;
  category: WHTCategory;
  nature: WHTNature;
  thresholdNote: string;
  filerRate: string;
  lateFilerRate: string;
  nonFilerRate: string;
  filerRateNumeric: number; // For interactive calculator percentage
  nonFilerRateNumeric: number;
  withholdingAgent: string;
  statutoryBasis: string;
  practicalApplication: string;
  exemptionConditions: string;
  depositDeadline: string;
  fbrReportingForm: string;
}

export const WHT_DIRECTORY_DATA: WHTProvision[] = [
  {
    id: 'sec-231ab',
    sectionCode: 'Section 231AB',
    title: 'Advance Tax on Cash Withdrawals from Banks',
    category: 'banking_cash',
    nature: 'adjustable',
    thresholdNote: 'Aggregate cash withdrawals exceeding PKR 50,000 in a single day',
    filerRate: '0% (Nil / Exempt)',
    lateFilerRate: '0.6% on sum',
    nonFilerRate: '0.6% to 0.9% on aggregate cash drawn',
    filerRateNumeric: 0,
    nonFilerRateNumeric: 0.9,
    withholdingAgent: 'Scheduled Banks & Commercial Banking Institutions',
    statutoryBasis: 'Section 231AB read with Division VI, Part IV of the First Schedule & Rule 1 Tenth Schedule',
    practicalApplication: 'Collected by the bank at the time of cash withdrawal from ATM, cheque clearing, or over-the-counter counter withdrawal when non-filer draws over Rs. 50,000 in a single day.',
    exemptionConditions: 'Active taxpayers appearing on FBR Active Taxpayers List (ATL), Federal/Provincial Governments, Foreign Diplomats, and Non-Resident Roshan Digital Account holders.',
    depositDeadline: 'Within 7 days of collection via Bank e-CPR',
    fbrReportingForm: 'Monthly Withholding Statement under Section 165 (Iris Code: 231AB)'
  },
  {
    id: 'sec-236c',
    sectionCode: 'Section 236C',
    title: 'Advance Tax on Sale or Transfer of Immovable Property',
    category: 'real_estate',
    nature: 'adjustable',
    thresholdNote: 'On gross consideration or FBR Valuation Table whichever is higher',
    filerRate: '3% (≤50M), 3.5% (50M-100M), 4% (>100M)',
    lateFilerRate: '6% to 8%',
    nonFilerRate: '10% to 12% (Tenth Schedule enhanced)',
    filerRateNumeric: 3.0,
    nonFilerRateNumeric: 10.0,
    withholdingAgent: 'Sub-Registrar, Housing Authorities (DHA, Bahria, CDA, LDA), Cooperative Societies',
    statutoryBasis: 'Section 236C read with Division X, Part IV of the First Schedule',
    practicalApplication: 'Deducted from the seller/transferor before executing the registered conveyance deed or issuing the society transfer letter.',
    exemptionConditions: 'Exempt for non-resident RDA overseas account holders under SRO 389(I)/2022.',
    depositDeadline: 'At the time of registration / prior to transfer attestation',
    fbrReportingForm: 'Iris 2.0 CPR Challan Form 236C'
  },
  {
    id: 'sec-236k',
    sectionCode: 'Section 236K',
    title: 'Advance Tax on Purchase of Immovable Property',
    category: 'real_estate',
    nature: 'adjustable',
    thresholdNote: 'On gross purchase consideration or FBR Valuation Table',
    filerRate: '3% (≤50M), 3.5% (50M-100M), 4% (>100M)',
    lateFilerRate: '6% to 8%',
    nonFilerRate: '10.5% to 15% (Tenth Schedule penal rate)',
    filerRateNumeric: 3.0,
    nonFilerRateNumeric: 10.5,
    withholdingAgent: 'Sub-Registrars, Land Revenue Officers, Private Real Estate Developers',
    statutoryBasis: 'Section 236K read with Division XVIII, Part IV of the First Schedule',
    practicalApplication: 'Paid by the purchaser at the time of acquiring property or with each periodic development installment.',
    exemptionConditions: 'Exemption allowed for certified overseas Pakistanis remitting via formal banking channels into RDA accounts.',
    depositDeadline: 'At the time of purchase attestation',
    fbrReportingForm: 'Iris 2.0 Form 236K'
  },
  {
    id: 'sec-231b',
    sectionCode: 'Section 231B',
    title: 'Advance Tax on Motor Vehicle Purchase, Registration & Transfer',
    category: 'vehicles',
    nature: 'adjustable',
    thresholdNote: 'Based on Engine Capacity (CC) or Invoice Value for imported / luxury vehicles',
    filerRate: 'PKR 10,000 (850cc) to PKR 500,000+ (3000cc+) / 3% - 6% of value',
    lateFilerRate: 'Double of Filer Rates',
    nonFilerRate: '300% to 500% of Filer Rate (Punitive non-filer bands)',
    filerRateNumeric: 3.0,
    nonFilerRateNumeric: 12.0,
    withholdingAgent: 'Excise & Taxation Department, Car Manufacturers (Indus, Pak Suzuki, Honda, Hyundai)',
    statutoryBasis: 'Section 231B read with Division VII, Part IV of First Schedule',
    practicalApplication: 'Collected by the manufacturer at invoice generation or by the Excise & Taxation Officer before vehicle number allocation or ownership transfer.',
    exemptionConditions: 'Electric vehicles enjoy concessional custom & WHT schedules as per EV Policy.',
    depositDeadline: 'Before vehicle registration or delivery',
    fbrReportingForm: 'Section 165 Withholding Statement (Iris Code: 231B)'
  },
  {
    id: 'sec-151',
    sectionCode: 'Section 151',
    title: 'Tax on Profit on Debt (Bank Savings & Term Deposits)',
    category: 'profit_on_debt',
    nature: 'final',
    thresholdNote: 'All interest / profit credited to bank accounts, Behbood/National Savings exceeding limits',
    filerRate: '15% on gross profit',
    lateFilerRate: '30% on gross profit',
    nonFilerRate: '30% (Double withholding under 10th Schedule)',
    filerRateNumeric: 15.0,
    nonFilerRateNumeric: 30.0,
    withholdingAgent: 'Scheduled Banks, Microfinance Banks, Central Directorate of National Savings (CDNS)',
    statutoryBasis: 'Section 151 read with Division I, Part III of First Schedule',
    practicalApplication: 'Deducted by the bank at source upon periodic quarterly/annual interest credit into the customer savings account.',
    exemptionConditions: 'Exemption for Behbood Savings Certificates, Pensioner Benefit Accounts up to prescribed statutory ceiling (Clause 36A Part I 2nd Sched).',
    depositDeadline: 'Within 7 days of profit credit',
    fbrReportingForm: 'Annual Withholding Statement under Sec 165'
  },
  {
    id: 'sec-153-1a',
    sectionCode: 'Section 153(1)(a)',
    title: 'Withholding on Supply of Goods',
    category: 'goods_services',
    nature: 'minimum',
    thresholdNote: 'Transactions exceeding PKR 75,000 in aggregate per financial year',
    filerRate: '5.5% (Companies) / 6% (Individuals/AOPs) / 0.25% - 1% for Fast Moving / Cigarettes',
    lateFilerRate: '11% - 12%',
    nonFilerRate: '11% (Companies) / 12% (Individuals/AOPs) (100% surcharge)',
    filerRateNumeric: 5.5,
    nonFilerRateNumeric: 11.0,
    withholdingAgent: 'All Prescribed Persons, Listed Companies, Companies, AOPs turnover > 100M',
    statutoryBasis: 'Section 153(1)(a) read with Division III, Part III of First Schedule',
    practicalApplication: 'Deducted from vendor invoice payments prior to releasing payment cheques.',
    exemptionConditions: 'Exemption Certificate under Section 159 issued by Commissioner Inland Revenue.',
    depositDeadline: '15th of the following calendar month',
    fbrReportingForm: 'Monthly Sec 165 Statement'
  },
  {
    id: 'sec-153-1b',
    sectionCode: 'Section 153(1)(b)',
    title: 'Withholding on Rendering of Services',
    category: 'goods_services',
    nature: 'minimum',
    thresholdNote: 'Transactions exceeding PKR 30,000 in aggregate per financial year',
    filerRate: '9% (Companies) / 11% (Others) | 4% for Specified Services (IT, Freight, Transport)',
    lateFilerRate: '18% - 22%',
    nonFilerRate: '18% (Companies) / 22% (Others) (100% penal increase)',
    filerRateNumeric: 9.0,
    nonFilerRateNumeric: 18.0,
    withholdingAgent: 'Corporate Withholding Agents, Exporters, Government Departments',
    statutoryBasis: 'Section 153(1)(b) read with Division III, Part III of First Schedule',
    practicalApplication: 'Deducted from contractor, consultant, and service provider bills.',
    exemptionConditions: 'Companies holding valid 100% Exemption Certificate under Section 159.',
    depositDeadline: '15th of the following month',
    fbrReportingForm: 'Monthly Sec 165 Statement (Iris 153-1b)'
  },
  {
    id: 'sec-153-1c',
    sectionCode: 'Section 153(1)(c)',
    title: 'Withholding on Execution of Contracts',
    category: 'goods_services',
    nature: 'minimum',
    thresholdNote: 'EPC contracts, turnkey infrastructure, and construction jobs',
    filerRate: '7.5% (Companies) / 8% (Individuals/AOPs)',
    lateFilerRate: '15% - 16%',
    nonFilerRate: '15% (Companies) / 16% (Individuals/AOPs)',
    filerRateNumeric: 7.5,
    nonFilerRateNumeric: 15.0,
    withholdingAgent: 'Government agencies, EPC contractors, corporate employers',
    statutoryBasis: 'Section 153(1)(c) read with Division III, Part III of First Schedule',
    practicalApplication: 'Deducted from progressive milestone invoices on construction contracts.',
    exemptionConditions: 'Exemption under Sec 159 for specialized projects or approved joint ventures.',
    depositDeadline: '15th of the following month',
    fbrReportingForm: 'Monthly Sec 165 Statement'
  },
  {
    id: 'sec-149',
    sectionCode: 'Section 149',
    title: 'Withholding on Salary Income (Employers)',
    category: 'salary_dividend',
    nature: 'adjustable',
    thresholdNote: 'Annual salary exceeding PKR 600,000 (Rs. 50,000/month)',
    filerRate: 'Progressive slabs (0% to 35% + 10% Surcharge on upper slabs)',
    lateFilerRate: 'Progressive slabs + Surcharge',
    nonFilerRate: 'Standard salary slab rates apply (employer must report CNIC)',
    filerRateNumeric: 15.0,
    nonFilerRateNumeric: 15.0,
    withholdingAgent: 'Every Employer paying salary to an employee',
    statutoryBasis: 'Section 149 read with Division I, Part I of First Schedule',
    practicalApplication: 'Deducted monthly from payroll and deposited via e-challan CPR.',
    exemptionConditions: 'Employees earning below PKR 600,000 per annum are subject to 0% tax.',
    depositDeadline: 'Within 7 days of payroll disbursement',
    fbrReportingForm: 'Annual Salary Statement under Sec 165 & Monthly CPR'
  },
  {
    id: 'sec-150',
    sectionCode: 'Section 150',
    title: 'Withholding Tax on Dividend Income',
    category: 'salary_dividend',
    nature: 'final',
    thresholdNote: 'On gross dividend distributed by companies',
    filerRate: '15% (General) / 7.5% (IPPs & Power companies) / 25% (Mutual Funds/REITs)',
    lateFilerRate: '30%',
    nonFilerRate: '30% (Double rate for non-filers under 10th Sched)',
    filerRateNumeric: 15.0,
    nonFilerRateNumeric: 30.0,
    withholdingAgent: 'Public & Private Companies declaring dividends, CDC, Asset Management Companies',
    statutoryBasis: 'Section 150 read with Division III, Part I of First Schedule',
    practicalApplication: 'Deducted at source before warrant disbursement or bank credit.',
    exemptionConditions: 'Dividends received by corporate entities eligible for group taxation.',
    depositDeadline: 'Within 7 days of dividend warrant date',
    fbrReportingForm: 'Iris 2.0 Dividend WHT Statement'
  },
  {
    id: 'sec-236y',
    sectionCode: 'Section 236Y',
    title: 'Advance Tax on Remittance through Credit / Debit Cards Abroad',
    category: 'foreign_remittance',
    nature: 'adjustable',
    thresholdNote: 'All international debit/credit/prepaid card settlements outside Pakistan',
    filerRate: '5% of gross transacted amount',
    lateFilerRate: '10%',
    nonFilerRate: '10% (100% penal rate)',
    filerRateNumeric: 5.0,
    nonFilerRateNumeric: 10.0,
    withholdingAgent: 'Issuing Banks, Visa/Mastercard/PayPak settlement gateways',
    statutoryBasis: 'Section 236Y read with Division XXVII, Part IV of First Schedule',
    practicalApplication: 'Deducted by the issuing bank on online international merchant payments (e.g. AWS, Google, Netflix, travel spending abroad).',
    exemptionConditions: 'Local PKR domestic card transactions.',
    depositDeadline: 'Settlement date with international clearing house',
    fbrReportingForm: 'Monthly Sec 165 Statement'
  },
  {
    id: 'sec-236g',
    sectionCode: 'Section 236G',
    title: 'Advance Tax on Sales to Distributors, Dealers & Wholesalers',
    category: 'distribution_retail',
    nature: 'adjustable',
    thresholdNote: 'On gross sale value of manufactured/imported products',
    filerRate: '0.1% (Fertilizer) / 0.5% (General products) / 1% (Electronics/Pharma)',
    lateFilerRate: '1% - 2%',
    nonFilerRate: '2% to 4% (Tenth Schedule)',
    filerRateNumeric: 0.5,
    nonFilerRateNumeric: 2.0,
    withholdingAgent: 'Manufacturers, Commercial Importers',
    statutoryBasis: 'Section 236G read with Division XIV, Part IV of First Schedule',
    practicalApplication: 'Added onto the sale invoice to distributors and deposited via FBR CPR.',
    exemptionConditions: 'Active taxpayers registered under Sales Tax Act.',
    depositDeadline: '15th of the following month',
    fbrReportingForm: 'Monthly Sec 165 Statement'
  },
  {
    id: 'sec-236h',
    sectionCode: 'Section 236H',
    title: 'Advance Tax on Sales to Retailers',
    category: 'distribution_retail',
    nature: 'adjustable',
    thresholdNote: 'On gross sale value to retail outlets and shopkeepers',
    filerRate: '0.5% to 1.0%',
    lateFilerRate: '2.5%',
    nonFilerRate: '2.5% to 5.0%',
    filerRateNumeric: 1.0,
    nonFilerRateNumeric: 5.0,
    withholdingAgent: 'Manufacturers, Distributors, Wholesalers',
    statutoryBasis: 'Section 236H read with Division XV, Part IV of First Schedule',
    practicalApplication: 'Collected by distributors from retailers at the time of delivery or invoicing.',
    exemptionConditions: 'Integrated Tier-1 POS retailers.',
    depositDeadline: '15th of the following month',
    fbrReportingForm: 'Monthly Sec 165 Statement'
  }
];

export interface WHTQuickCalculationResult {
  provision: WHTProvision;
  grossAmount: number;
  filerWithholding: number;
  nonFilerWithholding: number;
  penaltyDifferential: number;
  isExemptForFiler: boolean;
}

export function calculateWHTQuick(provision: WHTProvision, grossAmount: number): WHTQuickCalculationResult {
  const filerWithholding = Math.round((grossAmount * provision.filerRateNumeric) / 100);
  const nonFilerWithholding = Math.round((grossAmount * provision.nonFilerRateNumeric) / 100);
  const penaltyDifferential = nonFilerWithholding - filerWithholding;
  const isExemptForFiler = provision.filerRateNumeric === 0;

  return {
    provision,
    grossAmount,
    filerWithholding,
    nonFilerWithholding,
    penaltyDifferential,
    isExemptForFiler
  };
}
