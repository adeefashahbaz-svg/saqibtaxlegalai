import {
  FirmBrandingSettings,
  ClientLedgerProfile,
  ClientWealthReconciliation,
  SavedClientCalculation,
  ProfessionalBillingInvoice,
  BillingServiceItem,
  LawFirmTeamMember,
  CaseAssignment,
  AdvocateStampSettings
} from '../types';

export const DEFAULT_ADVOCATE_STAMP: AdvocateStampSettings = {
  enabled: true,
  practitionerName: 'ADVOCATE MUHAMMAD SAQIB',
  advocateDesignation: 'ADVOCATE HIGH COURT & FCA',
  courtOrBar: 'LAHORE HIGH COURT BAR ASSOCIATION',
  enrolmentNumber: 'HC/LHR/28491/2012',
  sealShape: 'round',
  sealColor: '#0f3c28', // Emerald Green
  includeDateStamp: true,
  customSealText: 'SAQIB & PARTNERS TAX LAW CHAMBERS • LAHORE'
};

export const DEFAULT_FIRM_BRANDING: FirmBrandingSettings = {
  firmName: 'Saqib & Partners Tax & Legal Consultants',
  practitionerName: 'Advocate Muhammad Saqib, FCA',
  designation: 'Advocate High Court & Fellow Chartered Accountant (ICAP)',
  licenseNumber: 'LHC-HC-28491 / ICAP-Reg-7892',
  barOrBody: 'Lahore High Court Bar Association | Institute of Chartered Accountants of Pakistan (ICAP)',
  email: 'tax@saqibtaxassociates.com.pk',
  phone: '+92 (42) 3578-9040 / +92 300 8472910',
  address: 'Suite 604-608, Executive Heights, Gulberg III, Lahore, Pakistan',
  taxRegistrationNTN: '4829104-7 (Active Filer Category: Legal & Tax Consultancy)',
  tagline: 'Premier Tax Advisory, Appellate Defense & Corporate Statutory Compliance',
  headerColor: '#0f3c28', // Emerald Green
  footerDisclaimer: 'Confidential & Attorney-Client Privileged Legal & Tax Advisory Document. Prepared under the provisions of the Income Tax Ordinance, 2001 and Allied Tax Laws of Pakistan.',
  advocateStamp: DEFAULT_ADVOCATE_STAMP
};

export const DEFAULT_TEAM_MEMBERS: LawFirmTeamMember[] = [
  {
    id: 'team-001',
    name: 'Adv. Muhammad Saqib, FCA',
    email: 'saqib@saqibtaxassociates.com.pk',
    phone: '+92 300 8472910',
    role: 'managing_partner',
    designation: 'Managing Partner & Senior Advocate High Court',
    barOrRegNumber: 'LHC/28491/2012 | ICAP-7892',
    specialization: ['Appellate Litigation (ATIR/High Court)', 'Super Tax Section 4C', 'Corporate Restructuring'],
    assignedClientsCount: 4,
    hourlyRatePKR: 45000,
    isActive: true,
    joinedDate: '2015-01-10',
    avatarColor: '#0f3c28'
  },
  {
    id: 'team-002',
    name: 'Barrister Hamza Tariq',
    email: 'hamza.tariq@saqibtaxassociates.com.pk',
    phone: '+92 321 4481029',
    role: 'senior_partner',
    designation: 'Partner (Direct Tax & Corporate Compliance)',
    barOrRegNumber: 'LHC/34910/2016 | Lincoln’s Inn',
    specialization: ['Corporate Income Tax (Sec 114/122)', 'Section 111 Audit Defense', 'Transfer Pricing'],
    assignedClientsCount: 3,
    hourlyRatePKR: 35000,
    isActive: true,
    joinedDate: '2018-04-15',
    avatarColor: '#1e3a8a'
  },
  {
    id: 'team-003',
    name: 'Advocate Fatima Zahra, ACA',
    email: 'fatima.zahra@saqibtaxassociates.com.pk',
    phone: '+92 333 8192039',
    role: 'senior_associate',
    designation: 'Senior Associate (Indirect Tax & PST)',
    barOrRegNumber: 'LHC/41029/2019 | ICAP-11048',
    specialization: ['Punjab Sales Tax (PRA)', 'Sindh Sales Tax (SRB)', 'Federal Sales Tax Audit (Sec 25/38)'],
    assignedClientsCount: 5,
    hourlyRatePKR: 20000,
    isActive: true,
    joinedDate: '2020-08-01',
    avatarColor: '#7c2d12'
  },
  {
    id: 'team-004',
    name: 'Bilal Ahmed Khan, LL.B',
    email: 'bilal.khan@saqibtaxassociates.com.pk',
    phone: '+92 304 9182301',
    role: 'junior_associate',
    designation: 'Junior Tax Associate',
    barOrRegNumber: 'LBA/59102/2022',
    specialization: ['Salaried Returns & Wealth Statements (Sec 116)', 'Section 7E Exemptions', 'WHT Certificates'],
    assignedClientsCount: 4,
    hourlyRatePKR: 12000,
    isActive: true,
    joinedDate: '2022-11-15',
    avatarColor: '#312e81'
  },
  {
    id: 'team-005',
    name: 'Zainab Qureshi',
    email: 'zainab.q@saqibtaxassociates.com.pk',
    phone: '+92 312 9948102',
    role: 'tax_trainee',
    designation: 'Chartered Accountant Trainee (ICAP Articled)',
    barOrRegNumber: 'ICAP-CR-94821',
    specialization: ['Iris e-Filing Verification', 'Bank Statement Inflow/Outflow Tagging', 'Tax Challan CPR Generation'],
    assignedClientsCount: 2,
    hourlyRatePKR: 6000,
    isActive: true,
    joinedDate: '2024-03-01',
    avatarColor: '#134e4a'
  }
];

export const DEFAULT_CASE_ASSIGNMENTS: CaseAssignment[] = [
  {
    id: 'case-001',
    clientId: 'cli-001',
    clientName: 'Tariq Textiles Mills (Pvt) Ltd',
    associateId: 'team-003',
    associateName: 'Advocate Fatima Zahra, ACA',
    assignedByPartnerId: 'team-001',
    assignedByPartnerName: 'Adv. Muhammad Saqib, FCA',
    assignedDate: '2026-02-01',
    deadlineDate: '2026-03-15',
    taskScope: 'Section 4C Super Tax Assessment & Monthly PRA Sales Tax Withholding Reconciliation',
    status: 'in_review',
    priority: 'high',
    internalNotes: 'Ensure 90% input tax restriction under Section 8B is accounted for before submission to Corporate Zone I.',
    estimatedHours: 24
  },
  {
    id: 'case-002',
    clientId: 'cli-002',
    clientName: 'Dr. Ayesha Siddiqui',
    associateId: 'team-004',
    associateName: 'Bilal Ahmed Khan, LL.B',
    assignedByPartnerId: 'team-001',
    assignedByPartnerName: 'Adv. Muhammad Saqib, FCA',
    assignedDate: '2026-02-10',
    deadlineDate: '2026-03-05',
    taskScope: 'Salaried Individual Annual Return, Section 7E Exemption Audit & Foreign Inflow Reconciliation',
    status: 'partner_approved',
    priority: 'normal',
    internalNotes: 'PRC certificates verified for foreign remittances. Section 7E primary residence exemption marked in Iris.',
    estimatedHours: 8
  },
  {
    id: 'case-003',
    clientId: 'cli-003',
    clientName: 'Malik Naveed Real Estate & Builders',
    associateId: 'team-002',
    associateName: 'Barrister Hamza Tariq',
    assignedByPartnerId: 'team-001',
    assignedByPartnerName: 'Adv. Muhammad Saqib, FCA',
    assignedDate: '2026-02-15',
    deadlineDate: '2026-02-28',
    taskScope: 'Section 111(1)(b) Unexplained Wealth Notice Defense & Reply to Additional Commissioner',
    status: 'assigned',
    priority: 'urgent',
    internalNotes: 'Draft comprehensive reply citing registered property allotment deeds and commercial banking trail.',
    estimatedHours: 35
  }
];

export const STANDARD_LEGAL_SERVICES: {
  code: string;
  category: 'filing' | 'audit_defense' | 'advisory' | 'litigation' | 'retainer' | '7e_clearance';
  description: string;
  defaultFee: number;
}[] = [
  {
    code: 'RET-SAL-01',
    category: 'filing',
    description: 'Salaried Individual Annual Income Tax Return & Wealth Statement (Sec 114 & 116)',
    defaultFee: 15000
  },
  {
    code: 'RET-BIZ-02',
    category: 'filing',
    description: 'Sole Proprietor / Business Individual Annual Return with Books Reconciliation',
    defaultFee: 35000
  },
  {
    code: 'RET-AOP-03',
    category: 'filing',
    description: 'Association of Persons (AOP / Firm) Annual Tax Filing & Form C Reconciliation',
    defaultFee: 65000
  },
  {
    code: 'RET-CORP-04',
    category: 'filing',
    description: 'Private Limited Company Annual Corporate Return (Sec 114 & Audited Accounts)',
    defaultFee: 120000
  },
  {
    code: 'SEC-7E-05',
    category: '7e_clearance',
    description: 'Section 7E Immovable Property Deemed Rent Exemption Audit & Iris Certificate',
    defaultFee: 25000
  },
  {
    code: 'SEC-4C-06',
    category: 'advisory',
    description: 'Section 4C Super Tax Assessment & Quarterly Advance Installment Filing (Sec 147)',
    defaultFee: 50000
  },
  {
    code: 'AUD-111-07',
    category: 'audit_defense',
    description: 'Section 111 (Unexplained Income/Assets) Notice Reply & Complete Legal Representation',
    defaultFee: 85000
  },
  {
    code: 'AUD-122-08',
    category: 'audit_defense',
    description: 'Section 122(5A) Amendment of Assessment Defense & Commissioner Appeal Submission',
    defaultFee: 95000
  },
  {
    code: 'LIT-ATIR-09',
    category: 'litigation',
    description: 'Appellate Tribunal Inland Revenue (ATIR) Memo of Appeal & Hearing Appearance',
    defaultFee: 150000
  },
  {
    code: 'RET-MONTH-10',
    category: 'retainer',
    description: 'Monthly FBR & PRA/SRB Sales Tax Withholding Retainer Compliance & e-Filing',
    defaultFee: 40000
  }
];

export const INITIAL_CLIENT_LEDGER: ClientLedgerProfile[] = [
  {
    id: 'cli-001',
    clientName: 'Tariq Textiles Mills (Pvt) Ltd',
    cnic: '35202-8491029-1',
    ntn: '4928103-9',
    category: 'private_limited',
    taxYear: '2025',
    status: 'active',
    phone: '+92 42 3587-1234',
    email: 'finance@tariqtextiles.com.pk',
    address: 'Plot 45-B, Quaid-e-Azam Industrial Estate, Kot Lakhpat, Lahore',
    fbrJurisdiction: 'Large Taxpayers Office (LTO) Lahore - Corporate Zone I',
    notes: 'Textile manufacturing unit subject to Section 4C Super Tax (exceeding PKR 350M turnover) and monthly PRA sales tax returns.',
    totalIncomeDeclared: 385000000,
    wealthNetAssets: 620000000,
    totalBilledAmount: 245000,
    totalPaidAmount: 245000,
    lastAuditDate: '2025-11-15',
    savedCalculations: [
      {
        id: 'calc-001',
        clientId: 'cli-001',
        date: '2026-01-20',
        engineType: 'super_tax',
        title: 'Section 4C Super Tax Assessment (Tax Year 2025)',
        summary: 'Taxable Income PKR 385M evaluated under Division IIB First Proviso @ 10% Super Tax (PKR 38.5M liability).',
        taxAmount: 38500000,
        taxYear: '2025'
      },
      {
        id: 'calc-002',
        clientId: 'cli-001',
        date: '2026-02-10',
        engineType: 'sales_tax',
        title: 'FBR & PRA Sales Tax Withholding Reconciliation',
        summary: 'Gross taxable supplies PKR 52M with input tax adjustment under Section 8B (90% limit).',
        taxAmount: 8840000,
        taxYear: '2025'
      }
    ],
    wealthReconciliation: {
      taxYear: '2025',
      openingNetWealth: 510000000,
      netInflowIncome: 185000000,
      exemptInflowRemittance: 0,
      capitalGainsInflow: 15000000,
      personalHouseholdExpenses: 35000000,
      otherOutflowsGifts: 55000000,
      closingNetWealthCalculated: 620000000,
      declaredClosingWealthIris: 620000000,
      unreconciledDifference: 0,
      isReconciled: true,
      reconciliationNotes: 'Fully balanced and reconciled against audited balance sheet reserves.'
    },
    createdAt: '2025-06-10',
    updatedAt: '2026-02-15'
  },
  {
    id: 'cli-002',
    clientName: 'Dr. Ayesha Siddiqui',
    cnic: '35201-1948201-4',
    ntn: '7182940-2',
    category: 'salaried',
    taxYear: '2025',
    status: 'return_drafted',
    phone: '+92 300 4829104',
    email: 'dr.ayesha@shaukatkhanum.org.pk',
    address: 'House 112, Sector Y, Phase 3, DHA, Lahore',
    fbrJurisdiction: 'Regional Tax Office (RTO) Lahore - Zone IV (Salaried)',
    notes: 'Senior Consultant Physician. Has salary income from hospital plus foreign remittance and real estate holdings in DHA & Gwadar.',
    totalIncomeDeclared: 14500000,
    wealthNetAssets: 85000000,
    totalBilledAmount: 35000,
    totalPaidAmount: 35000,
    lastAuditDate: '2025-09-10',
    savedCalculations: [
      {
        id: 'calc-003',
        clientId: 'cli-002',
        date: '2026-01-15',
        engineType: 'income_tax',
        title: 'Annual Salaried Return & Deductible Allowances',
        summary: 'Gross salary PKR 14.5M. Tax calculated with Sec 60D education allowances and approved pension credit.',
        taxAmount: 3950000,
        taxYear: '2025'
      },
      {
        id: 'calc-004',
        clientId: 'cli-002',
        date: '2026-01-18',
        engineType: 'property_tax',
        title: 'Section 7E Immovable Property Exemption Assessment',
        summary: 'Primary DHA residential residence exempted under Sec 7E(2)(a). Gwadar plot under Rs. 25M threshold.',
        taxAmount: 0,
        taxYear: '2025'
      }
    ],
    wealthReconciliation: {
      taxYear: '2025',
      openingNetWealth: 76000000,
      netInflowIncome: 10550000,
      exemptInflowRemittance: 3200000,
      capitalGainsInflow: 0,
      personalHouseholdExpenses: 4750000,
      otherOutflowsGifts: 0,
      closingNetWealthCalculated: 85000000,
      declaredClosingWealthIris: 85000000,
      unreconciledDifference: 0,
      isReconciled: true,
      reconciliationNotes: 'Reconciled with foreign remittance proceeds encashment certificates (PRCs).'
    },
    createdAt: '2025-07-22',
    updatedAt: '2026-01-18'
  },
  {
    id: 'cli-003',
    clientName: 'Malik Naveed Real Estate & Builders',
    cnic: '35202-9381023-5',
    ntn: '3819204-1',
    category: 'business_individual',
    taxYear: '2025',
    status: 'audit_notice',
    phone: '+92 321 8492019',
    email: 'naveed@malikbuilders.com',
    address: 'Plaza 14, Commercial Broadway, Phase 8, DHA, Lahore',
    fbrJurisdiction: 'RTO-II Lahore - Real Estate & Construction Enforcement Zone',
    notes: 'Active developer. Received Section 111(1)(b) notice regarding unexplained property investments in Gulberg III.',
    totalIncomeDeclared: 48000000,
    wealthNetAssets: 210000000,
    totalBilledAmount: 110000,
    totalPaidAmount: 50000,
    lastAuditDate: '2026-02-01',
    savedCalculations: [
      {
        id: 'calc-005',
        clientId: 'cli-003',
        date: '2026-02-05',
        engineType: 'property_tax',
        title: 'Advance Tax on Transfer (236C & 236K) & Capital Gains',
        summary: 'Commercial plot transfer at PKR 85M with holding period 2-3 years @ 10% CGT rate.',
        taxAmount: 8500000,
        taxYear: '2025'
      }
    ],
    wealthReconciliation: {
      taxYear: '2025',
      openingNetWealth: 175000000,
      netInflowIncome: 48000000,
      exemptInflowRemittance: 0,
      capitalGainsInflow: 12000000,
      personalHouseholdExpenses: 15000000,
      otherOutflowsGifts: 10000000,
      closingNetWealthCalculated: 210000000,
      declaredClosingWealthIris: 210000000,
      unreconciledDifference: 0,
      isReconciled: true,
      reconciliationNotes: 'Reconciliation tied with bank statement credits and registered sale deeds.'
    },
    createdAt: '2025-08-14',
    updatedAt: '2026-02-05'
  },
  {
    id: 'cli-004',
    clientName: 'Al-Rehman Pharma Trading AOP',
    cnic: '35200-4829103-7',
    ntn: '8392019-4',
    category: 'aop_firm',
    taxYear: '2025',
    status: 'filed_iris',
    phone: '+92 42 3728-4910',
    email: 'info@alrehmanpharma.pk',
    address: 'Circular Road, Near Mayo Hospital, Lahore',
    fbrJurisdiction: 'RTO Lahore - Wholesale & Distribution Zone',
    notes: 'Wholesale distributor of pharmaceutical supplies. Minimum tax under Section 113 and Sec 153(1)(a) WHT adjustments.',
    totalIncomeDeclared: 28000000,
    wealthNetAssets: 95000000,
    totalBilledAmount: 65000,
    totalPaidAmount: 65000,
    lastAuditDate: '2025-10-30',
    savedCalculations: [],
    createdAt: '2025-09-01',
    updatedAt: '2025-12-10'
  },
  {
    id: 'cli-005',
    clientName: 'Engr. Hamza Aslam (High Net-Worth)',
    cnic: '37405-1849201-9',
    ntn: '9182049-8',
    category: 'high_net_worth',
    taxYear: '2025',
    status: 'retainer_active',
    phone: '+92 333 5829103',
    email: 'hamza.aslam@techventures.pk',
    address: 'House 88, Street 12, F-7/2, Islamabad',
    fbrJurisdiction: 'Large Taxpayers Office (LTO) Islamabad',
    notes: 'Tech venture founder with multiple international shareholdings, crypto asset declaration, and local real estate portfolio.',
    totalIncomeDeclared: 165000000,
    wealthNetAssets: 480000000,
    totalBilledAmount: 200000,
    totalPaidAmount: 200000,
    lastAuditDate: '2025-12-05',
    savedCalculations: [],
    createdAt: '2025-05-12',
    updatedAt: '2026-02-01'
  }
];

export const INITIAL_INVOICES: ProfessionalBillingInvoice[] = [
  {
    id: 'inv-001',
    invoiceNumber: 'INV-2026-0101',
    clientId: 'cli-001',
    clientName: 'Tariq Textiles Mills (Pvt) Ltd',
    clientNTN: '4928103-9',
    clientCNIC: '35202-8491029-1',
    clientAddress: 'Plot 45-B, Quaid-e-Azam Industrial Estate, Kot Lakhpat, Lahore',
    dateIssued: '2026-01-25',
    dueDate: '2026-02-15',
    taxYear: '2025',
    services: [
      {
        id: 'srv-001',
        serviceCode: 'RET-CORP-04',
        description: 'Private Limited Company Annual Corporate Return (Sec 114 & Audited Accounts)',
        category: 'filing',
        quantity: 1,
        unitPrice: 120000,
        amount: 120000
      },
      {
        id: 'srv-002',
        serviceCode: 'SEC-4C-06',
        description: 'Section 4C Super Tax Assessment & Quarterly Advance Installment Filing (Sec 147)',
        category: 'advisory',
        quantity: 1,
        unitPrice: 50000,
        amount: 50000
      },
      {
        id: 'srv-003',
        serviceCode: 'RET-MONTH-10',
        description: 'Monthly FBR & PRA Sales Tax Retainer Compliance & e-Filing (Quarter 1)',
        category: 'retainer',
        quantity: 1,
        unitPrice: 40000,
        amount: 40000
      }
    ],
    subtotal: 210000,
    discount: 0,
    applyProvincialTax: true,
    provincialTaxRate: 16, // 16% PRA on legal/tax consultancy
    provincialTaxAmount: 33600,
    grandTotal: 243600,
    paymentStatus: 'paid',
    amountPaid: 243600,
    balanceDue: 0,
    bankAccountDetails: 'Habib Bank Limited (HBL) - A/C: 0148-79281048201 / IBAN: PK36HABB0001487928104820',
    notes: 'Payment received in full via cross cheque. Thank you for partnering with Saqib & Partners.'
  },
  {
    id: 'inv-002',
    invoiceNumber: 'INV-2026-0102',
    clientId: 'cli-003',
    clientName: 'Malik Naveed Real Estate & Builders',
    clientNTN: '3819204-1',
    clientCNIC: '35202-9381023-5',
    clientAddress: 'Plaza 14, Commercial Broadway, Phase 8, DHA, Lahore',
    dateIssued: '2026-02-05',
    dueDate: '2026-02-25',
    taxYear: '2025',
    services: [
      {
        id: 'srv-004',
        serviceCode: 'AUD-111-07',
        description: 'Section 111 (Unexplained Income/Assets) Notice Reply & Complete Legal Representation',
        category: 'audit_defense',
        quantity: 1,
        unitPrice: 85000,
        amount: 85000
      },
      {
        id: 'srv-005',
        serviceCode: 'SEC-7E-05',
        description: 'Section 7E Immovable Property Deemed Rent Exemption Audit & Iris Certificate',
        category: '7e_clearance',
        quantity: 1,
        unitPrice: 25000,
        amount: 25000
      }
    ],
    subtotal: 110000,
    discount: 10000,
    applyProvincialTax: true,
    provincialTaxRate: 16,
    provincialTaxAmount: 16000,
    grandTotal: 116000,
    paymentStatus: 'partial',
    amountPaid: 50000,
    balanceDue: 66000,
    bankAccountDetails: 'Meezan Bank Ltd - Islamic Banking A/C: 0284-0104829103 / IBAN: PK55MEZN0002840104829103',
    notes: 'Advance retainer of PKR 50,000 received. Balance payable upon submission of Commissioner reply.'
  }
];

import { getSecureItem, setSecureItem } from './cryptoStorage';

// Storage Keys
const FIRM_BRANDING_KEY = 'saqibtax_firm_branding_v1';
const CLIENT_LEDGER_KEY = 'saqibtax_client_ledger_v1';
const INVOICES_KEY = 'saqibtax_invoices_v1';
const TEAM_MEMBERS_KEY = 'saqibtax_team_members_v1';
const CASE_ASSIGNMENTS_KEY = 'saqibtax_case_assignments_v1';

export function getStoredFirmBranding(): FirmBrandingSettings {
  try {
    const data = getSecureItem<FirmBrandingSettings>(FIRM_BRANDING_KEY, DEFAULT_FIRM_BRANDING);
    return { 
      ...DEFAULT_FIRM_BRANDING, 
      ...data,
      advocateStamp: {
        ...DEFAULT_ADVOCATE_STAMP,
        ...(data?.advocateStamp || {})
      }
    };
  } catch (e) {
    console.error('Failed to parse firm branding:', e);
    return DEFAULT_FIRM_BRANDING;
  }
}

export function saveStoredFirmBranding(settings: FirmBrandingSettings): void {
  try {
    setSecureItem(FIRM_BRANDING_KEY, settings);
  } catch (e) {
    console.error('Failed to save firm branding:', e);
  }
}

export function getStoredTeamMembers(): LawFirmTeamMember[] {
  try {
    const parsed = getSecureItem<LawFirmTeamMember[]>(TEAM_MEMBERS_KEY, DEFAULT_TEAM_MEMBERS);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  } catch (e) {
    console.error('Failed to parse team members:', e);
  }
  return DEFAULT_TEAM_MEMBERS;
}

export function saveStoredTeamMembers(members: LawFirmTeamMember[]): void {
  try {
    setSecureItem(TEAM_MEMBERS_KEY, members);
  } catch (e) {
    console.error('Failed to save team members:', e);
  }
}

export function getStoredCaseAssignments(): CaseAssignment[] {
  try {
    const parsed = getSecureItem<CaseAssignment[]>(CASE_ASSIGNMENTS_KEY, DEFAULT_CASE_ASSIGNMENTS);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  } catch (e) {
    console.error('Failed to parse case assignments:', e);
  }
  return DEFAULT_CASE_ASSIGNMENTS;
}

export function saveStoredCaseAssignments(assignments: CaseAssignment[]): void {
  try {
    setSecureItem(CASE_ASSIGNMENTS_KEY, assignments);
  } catch (e) {
    console.error('Failed to save case assignments:', e);
  }
}

export function getStoredClientLedger(): ClientLedgerProfile[] {
  try {
    const parsed = getSecureItem<ClientLedgerProfile[]>(CLIENT_LEDGER_KEY, INITIAL_CLIENT_LEDGER);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  } catch (e) {
    console.error('Failed to parse client ledger:', e);
  }
  return INITIAL_CLIENT_LEDGER;
}

export function saveStoredClientLedger(clients: ClientLedgerProfile[]): void {
  try {
    setSecureItem(CLIENT_LEDGER_KEY, clients);
  } catch (e) {
    console.error('Failed to save client ledger:', e);
  }
}

export function getStoredInvoices(): ProfessionalBillingInvoice[] {
  try {
    const parsed = getSecureItem<ProfessionalBillingInvoice[]>(INVOICES_KEY, INITIAL_INVOICES);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  } catch (e) {
    console.error('Failed to parse invoices:', e);
  }
  return INITIAL_INVOICES;
}

export function saveStoredInvoices(invoices: ProfessionalBillingInvoice[]): void {
  try {
    setSecureItem(INVOICES_KEY, invoices);
  } catch (e) {
    console.error('Failed to save invoices:', e);
  }
}

