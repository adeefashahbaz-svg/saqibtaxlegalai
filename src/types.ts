export type UserRole = 'taxpayer' | 'corporate_client' | 'tax_consultant' | 'admin';

export type SubscriptionTier = 'free' | 'pro' | 'enterprise';

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  subscriptionTier: SubscriptionTier;
  queriesUsedToday: number;
  maxDailyQueries: number;
  tokenBalance: number;
  ntnNumber?: string;
  organization?: string;
  createdAt: string;
}

export interface ChatSession {
  id: string;
  userId: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  messageCount: number;
}

export interface ChatMessage {
  id: string;
  sessionId: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  citations?: string[];
  suggestedActions?: string[];
  category?: 'income_tax' | 'sales_tax' | 'corporate' | 'fbr_notice' | 'general';
}

export interface TaxAllowances {
  educationalExpenses: number; // Section 60D
  zakatAllowance: number; // Section 60
  providentFundContribution: number; // Statutory/Recognized Provident Fund Sec 60
  homeLoanInterest: number; // Deductible Allowance on Profit on Debt / Home Loan Sec 60C
  charitableDonations: number; // Section 61 Tax Credit / Deductible
  pensionFundInvestment: number; // Section 63
}

export interface TaxCalculationResult {
  taxYear: string;
  taxpayerType: 'salaried' | 'non_salaried' | 'aop' | 'company';
  grossAnnualIncome: number;
  taxableIncome: number;
  applicableSlab: string;
  fixedTax: number;
  rateOnExcess: number;
  excessAmount: number;
  grossTax: number;
  taxCredits: number;
  netAnnualTax: number;
  monthlyWithholding: number;
  effectiveTaxRate: number;
  takeHomeAnnual: number;
  takeHomeMonthly: number;
  detailedBreakdown: string[];
  allowancesBreakdown?: TaxAllowances;
  totalDeductions?: number;
  taxSaved?: number;
}

export interface NoticeDraftInput {
  noticeType: string;
  sectionCode: string;
  taxYear: string;
  taxpayerName: string;
  ntnOrCnic: string;
  jurisdiction: string;
  officerDesignation: string;
  keyIssues: string;
  supportingDocuments: string;
}

export interface SalesTaxItem {
  id: string;
  heading: string;
  description: string;
  schedule: '6th_schedule_exempt' | '8th_schedule_reduced' | '3rd_schedule_retail' | 'general';
  standardRate: string;
  applicableRate: string;
  conditions: string;
}

export interface ATLRateItem {
  section: string;
  natureOfTransaction: string;
  filerRate: string;
  nonFilerRate: string;
  notes: string;
}

export interface StatuteSection {
  id: string;
  act_type: string;
  chapter: string;
  section: string;
  title: string;
  description: string;
  sub_sections?: string[];
  practical_notes: string;
  cross_references?: string[];
  key_amendments?: string;
  part_division?: string;
  statutory_rates_or_penalties?: string;
  fbr_precedents_and_circulars?: string;
}

export interface TaxSectionItem {
  id: string;
  act_type: string;
  chapter?: string;
  part_division?: string;
  section_code: string;
  title: string;
  description: string;
  sub_sections?: string | string[];
  statutory_rates_or_penalties?: string;
  practical_notes?: string;
  cross_references?: string | string[];
  fbr_precedents_and_circulars?: string;
}

export interface TaxRuleItem {
  id: string;
  rule_book: string;
  chapter?: string;
  rule_number: string;
  title: string;
  description: string;
  sub_rules?: string | string[];
  valuation_methodology?: string;
  compliance_steps?: string;
  practical_notes?: string;
  cross_references?: string | string[];
}

export interface CaseLawItem {
  id: string;
  citation: string;
  title: string;
  court: string;
  year: number;
  summary: string;
  key_holding: string;
  appellant?: string;
  respondent?: string;
  relevant_sections: string;
  keywords: string[];
}

export interface SROItem {
  id: string;
  number: string;
  title: string;
  year: number;
  category: 'SRO' | 'STGO' | 'Circular' | 'Clarification';
  description: string;
  effective_date?: string;
  status: 'In Force' | 'Superseded' | 'Amended';
  issuing_authority: string;
  pdf_reference?: string;
}

export interface TaxProblemItem {
  id: string;
  section_id: string;
  topic: string;
  scenario: string;
  calculation_steps: {
    step: number;
    title: string;
    computation: string;
    statutory_reason: string;
  }[];
  solution: string;
  statutory_ref: string;
  difficulty_level: 'Basic' | 'Intermediate' | 'Advanced / Corporate';
  practical_takeaways: string[];
}

export interface ManualPaymentSubmission {
  plan_tier: 'pro' | 'enterprise';
  amount_pkr: number;
  trx_id: string;
  account_holder_name: string;
  payment_date: string;
  payment_method: 'Meezan Bank' | 'HBL' | 'JazzCash' | 'EasyPaisa' | string;
  notes?: string;
  receipt_image_url?: string;
  plan_type?: 'Monthly' | 'Yearly';
}

export interface PaymentReceiptItem {
  id: string;
  user_id: string;
  user_email?: string;
  user_name?: string;
  user_organization?: string;
  amount: number;
  transaction_id: string;
  sender_name: string;
  receipt_image_url?: string;
  plan_type: 'Monthly' | 'Yearly';
  plan_tier: 'pro' | 'enterprise';
  payment_method: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  notes?: string;
  rejection_reason?: string;
  submitted_at: string;
  verified_at?: string;
  verified_by?: string;
}

export interface SubscriptionItem {
  id: string;
  plan_type?: 'Monthly' | 'Yearly';
  plan_tier: 'pro' | 'enterprise';
  amount_pkr: number;
  trx_id?: string;
  account_holder_name?: string;
  payment_date?: string;
  payment_method?: string;
  status: 'Pending' | 'Active' | 'Approved' | 'Rejected' | 'PENDING' | 'APPROVED' | 'REJECTED' | 'active';
  created_at?: string;
  start_date?: string;
  expires_at?: string;
  approved_at?: string;
}

export interface SubscriptionStatusData {
  user_id: string;
  email: string;
  full_name?: string;
  current_tier: SubscriptionTier;
  is_admin?: boolean;
  queries_used_today: number;
  max_daily_queries: number;
  has_pending_payment: boolean;
  expires_at?: string | null;
  pending_payment?: PaymentReceiptItem | null;
  pending_subscription?: SubscriptionItem | null;
  recent_receipts?: PaymentReceiptItem[];
  recent_subscriptions?: SubscriptionItem[];
}

export interface VerifyPaymentPayload {
  payment_id: string;
  action: 'Approve' | 'Reject';
  rejection_reason?: string;
}

export interface AdminSubscriptionConfig {
  bankName: string;
  accountTitle: string;
  ibanNumber: string;
  walletNumber: string;
  walletProvider: string;
  proMonthlyPKR: number;
  proAnnualPKR: number;
  ultimateMonthlyPKR: number;
  ultimateAnnualPKR: number;
  transferInstructions?: string;
  updatedAt?: string;
  updatedBy?: string;
}

export interface SalesTaxPhaseSubsection {
  id: string;
  topic: string;
  sections: string;
  summary: string;
  key_provisions: string[];
  practical_notes?: string;
  applicable_rules_or_sros?: string[];
}

export interface SalesTaxPhaseItem {
  id: string;
  phase_number: number;
  title: string;
  sections_range: string;
  description: string;
  subsections: SalesTaxPhaseSubsection[];
  icon?: string;
  color_theme?: string;
}

export type SalesTaxCategory =
  | 'goods_standard_18'
  | 'services_pra_16'
  | 'services_srb_15'
  | 'services_kpra_15'
  | 'services_bra_15'
  | 'services_ict_15'
  | 'tier1_retail_pos'
  | 'third_schedule_retail'
  | 'export_zero_rated_5th'
  | 'exempt_goods_6th';

export type BuyerStatus = 'registered' | 'unregistered';

export interface SalesTaxCalculationResult {
  taxableValue: number;
  category: SalesTaxCategory;
  categoryLabel: string;
  statutoryRate: number; // in percentage e.g. 18, 16, 15, 0
  baseOutputTax: number;
  buyerStatus: BuyerStatus;
  furtherTaxRate: number; // 3% if unregistered under Sec 3(1A), 0% if registered
  furtherTaxAmount: number;
  totalOutputTax: number;
  inputTaxClaimed: number;
  is90PercentCapped: boolean;
  maxAdmissibleInputLimit: number; // 90% of base output tax under Sec 8B
  admissibleInputTaxCredit: number;
  inadmissibleOrCarriedForwardInput: number;
  fedRate: number;
  fedAmount: number;
  netSalesTaxPayable: number;
  totalTaxInvoiceAmount: number;
  statutoryCitations: string[];
}

export type PropertyType = 'open_plot' | 'constructed_residential' | 'constructed_commercial' | 'agricultural_land';
export type PropertyTransactionRole = 'purchase' | 'sale' | 'holding_7e';
export type TaxpayerATLStatus = 'active_filer' | 'late_filer' | 'non_filer';

export interface PropertyTaxCalculationResult {
  propertyValuation: number; // FBR or DC rate (PKR)
  propertyType: PropertyType;
  holdingPeriodYears: number;
  buyerStatus: TaxpayerATLStatus;
  sellerStatus: TaxpayerATLStatus;
  
  // Section 236K (Advance Tax on Purchase)
  sec236kRate: number; // percentage
  sec236kAmount: number; // PKR
  sec236kRuleDescription: string;
  
  // Section 236C (Advance Tax on Sale/Transfer)
  sec236cRate: number; // percentage
  sec236cAmount: number; // PKR
  sec236cRuleDescription: string;
  
  // Section 37 / 37(1A) (Capital Gains Tax on Immovable Property)
  capitalGainEstimatedProfit: number;
  cgtRate: number; // percentage based on holding period
  cgtAmount: number; // PKR
  cgtHoldingRuleDescription: string;
  
  // Section 7E (Tax on Deemed Income from Immovable Property)
  is7EExempt: boolean;
  exemptionReason7E?: string;
  deemedRentalIncome: number; // 5% of Fair Market Value
  sec7eTaxRate: number; // 20% on deemed rental income (1% effective on FMV)
  sec7eTaxAmount: number; // PKR
  
  // Totals
  totalBuyerTaxPayable: number;
  totalSellerTaxPayable: number;
  statutoryCitations: string[];
}

export type PSTProvinceCode = 'PRA' | 'SRB' | 'KPRA' | 'BRA' | 'ICT';

export interface PSTSectorRate {
  id: string;
  sectorName: string;
  category: string;
  standardRate: number; // percentage
  concessionRate?: number;
  withholdingRate: number; // percentage WHT under provincial rules
  withholdingAgentRule: string;
  statutoryRef: string;
  inputTaxAdjustable: boolean;
  notes: string;
}

export interface PSTCalculationResult {
  province: PSTProvinceCode;
  provinceName: string;
  authorityName: string;
  statuteTitle: string;
  serviceSector: string;
  serviceValue: number; // PKR
  pstRate: number; // percentage
  baseOutputPst: number; // PKR
  withholdingDeductedByClient: number; // PKR WHT deducted at source
  inputTaxPaidOnPurchases: number; // PKR
  admissibleInputTax: number; // PKR
  netPstPayableToProvince: number; // PKR
  totalInvoiceAmount: number; // PKR
  returnFilingDeadline: string;
  withholdingDeadline: string;
  statutoryCitations: string[];
}

// ==========================================
// ENTERPRISE B2B FOR LAW FIRMS & CAS
// ==========================================

export type ClientCategory = 
  | 'salaried'
  | 'business_individual'
  | 'aop_firm'
  | 'private_limited'
  | 'public_listed'
  | 'high_net_worth';

export type ClientComplianceStatus = 
  | 'active'
  | 'return_pending'
  | 'return_drafted'
  | 'filed_iris'
  | 'audit_notice'
  | 'retainer_active';

export interface SavedClientCalculation {
  id: string;
  clientId: string;
  date: string;
  engineType: 'income_tax' | 'super_tax' | 'property_tax' | 'sales_tax' | 'pst_services';
  title: string;
  summary: string;
  taxAmount: number;
  taxYear: string;
  payload?: any;
}

export interface ClientWealthReconciliation {
  taxYear: string;
  openingNetWealth: number; // Net assets of previous year
  netInflowIncome: number; // Total declared net income
  exemptInflowRemittance: number; // Foreign remittance or exempt gains
  capitalGainsInflow: number; // Realized capital gains
  personalHouseholdExpenses: number; // Personal expenses (Section 116(2))
  otherOutflowsGifts: number; // Outflows, gifts given, asset dispositions
  closingNetWealthCalculated: number; // Formula calculated net wealth
  declaredClosingWealthIris: number; // Declared wealth in Iris wealth statement
  unreconciledDifference: number; // Iris vs Calculated difference
  isReconciled: boolean;
  reconciliationNotes: string;
}

export interface AdvocateStampSettings {
  enabled: boolean;
  practitionerName: string;
  advocateDesignation: string; // e.g. "Advocate High Court", "Advocate Supreme Court"
  courtOrBar: string; // e.g. "Lahore High Court Bar Association"
  enrolmentNumber: string; // e.g. "HC/LHR/28491/2012"
  sealShape: 'round' | 'rectangle' | 'oval';
  sealColor: string; // e.g. "#1e3a8a", "#0f3c28", "#111827"
  includeDateStamp: boolean;
  customSealText: string;
}

export interface LawFirmTeamMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'managing_partner' | 'senior_partner' | 'senior_associate' | 'junior_associate' | 'tax_trainee' | 'paralegal';
  designation: string;
  barOrRegNumber: string;
  specialization: string[]; // e.g. ["Corporate Income Tax", "Appellate Litigation", "Sales Tax"]
  assignedClientsCount: number;
  hourlyRatePKR: number;
  isActive: boolean;
  joinedDate: string;
  avatarColor?: string;
}

export interface CaseAssignment {
  id: string;
  clientId: string;
  clientName: string;
  associateId: string;
  associateName: string;
  assignedByPartnerId: string;
  assignedByPartnerName: string;
  assignedDate: string;
  deadlineDate: string;
  taskScope: string; // e.g. "Sec 114 Return + Sec 116 Wealth Recon Draft"
  status: 'assigned' | 'in_review' | 'partner_approved' | 'filed_iris' | 'delayed';
  priority: 'normal' | 'high' | 'urgent';
  internalNotes: string;
  estimatedHours: number;
}

export interface DynamicTaxSlab {
  id: string;
  slabIndex: number;
  minIncome: number;
  maxIncome: number; // Infinity represented as null or high number
  fixedTax: number;
  ratePercentage: number;
  slabDescription: string;
  legalProvisionRef: string; // e.g. "First Schedule, Part I, Division I, Clause (2)"
}

export interface DynamicWHTRate {
  id: string;
  sectionCode: string; // e.g. "153(1)(a)", "236C", "151"
  title: string;
  category: 'goods' | 'services' | 'contracts' | 'property' | 'banking' | 'imports' | 'dividends' | 'salaries';
  filerRate: number; // Percentage
  nonFilerRate: number; // Percentage
  lateFilerRate?: number;
  thresholdAmount: number;
  description: string;
  isAdjustable: boolean;
}

export interface DynamicSalesTaxRate {
  id: string;
  jurisdiction: 'FBR' | 'PRA' | 'SRB' | 'KPRA' | 'BRA';
  jurisdictionName: string;
  standardRate: number;
  reducedRates: { category: string; rate: number; condition: string }[];
  withholdingRateStandard: number;
  isWholesaleRetailApplicable: boolean;
  legalActRef: string;
}

export interface DynamicSuperTaxSlab {
  id: string;
  minIncome: number;
  maxIncome: number;
  ratePercentage: number;
  specifiedSectorsRatePercentage?: number; // E.g., Banking/Sugar/Steel at higher rates
  legalClause: string;
}

export interface DynamicTaxConfigSchema {
  version: string;
  statutoryTaxYear: string;
  financeActName: string; // e.g. "Finance Act 2026 (Act No. VIII of 2026)"
  effectiveDate: string;
  lastUpdated: string;
  isCustomOverrideActive: boolean;
  authorNote: string;
  incomeTax: {
    salariedSlabs: DynamicTaxSlab[];
    nonSalariedSlabs: DynamicTaxSlab[];
    aopSlabs: DynamicTaxSlab[];
    corporateStandardRate: number; // 29%
    smallCompanyRate: number; // 20%
    superTaxSlabs: DynamicSuperTaxSlab[];
  };
  section7E: {
    deemedRentRatePercentage: number; // 5%
    taxRateOnDeemedRent: number; // 20% (Effective 1% of FMV)
    exemptionThresholdFairMarketValue: number; // 25,000,000 PKR
    filerExemptionAvailable: boolean;
  };
  salesTax: DynamicSalesTaxRate[];
  withholdingTaxMatrix: DynamicWHTRate[];
}

export interface ClientLedgerProfile {
  id: string;
  clientName: string;
  cnic: string;
  ntn: string;
  category: ClientCategory;
  taxYear: string;
  status: ClientComplianceStatus;
  phone: string;
  email: string;
  address: string;
  fbrJurisdiction: string; // e.g. RTO Lahore - Zone 3 / LTO Karachi
  notes: string;
  totalIncomeDeclared: number;
  wealthNetAssets: number;
  totalBilledAmount: number;
  totalPaidAmount: number;
  lastAuditDate?: string;
  savedCalculations: SavedClientCalculation[];
  wealthReconciliation?: ClientWealthReconciliation;
  assignedAssociateId?: string;
  assignedAssociateName?: string;
  priority?: 'normal' | 'high' | 'urgent';
  caseDeadline?: string;
  createdAt: string;
  updatedAt: string;
}

export interface FirmBrandingSettings {
  firmName: string;
  practitionerName: string;
  designation: string;
  licenseNumber: string; // High Court Advocate License Number / Bar Reg #
  barOrBody: string;
  email: string;
  phone: string;
  address: string; // Office Address
  taxRegistrationNTN: string;
  tagline: string;
  logoUrl?: string;
  logoBase64?: string; // Upload Firm Logo
  digitalSignatureUrl?: string; // Digital Signature Image URL
  digitalSignatureBase64?: string; // Digital Signature Base64 Image
  headerColor: string; // Emerald, Navy, Slate, Amber
  footerDisclaimer: string;
  advocateStamp?: AdvocateStampSettings;
}

export type FeatureKey =
  | 'branded_pdf_exports'
  | 'multi_client_ledger'
  | 'case_dispatch_team'
  | 'dynamic_tax_config'
  | 'wealth_reconciliation_audit'
  | 'unlimited_ai_queries'
  | 'fbr_notice_drafter'
  | 'custom_branding_seal'
  | 'priority_counsel_escalation';

export type PaymentGatewayType = 'jazzcash' | 'easypaisa' | 'card' | 'bank_transfer';

export interface BillingServiceItem {
  id: string;
  serviceCode: string;
  description: string;
  category: 'filing' | 'audit_defense' | 'advisory' | 'litigation' | 'retainer' | '7e_clearance';
  quantity: number;
  unitPrice: number;
  amount: number;
}

export interface ProfessionalBillingInvoice {
  id: string;
  invoiceNumber: string;
  clientId: string;
  clientName: string;
  clientNTN: string;
  clientCNIC: string;
  clientAddress: string;
  dateIssued: string;
  dueDate: string;
  taxYear: string;
  services: BillingServiceItem[];
  subtotal: number;
  discount: number;
  applyProvincialTax: boolean;
  provincialTaxRate: number; // e.g. 16% PRA, 13% SRB
  provincialTaxAmount: number;
  grandTotal: number;
  paymentStatus: 'unpaid' | 'partial' | 'paid';
  amountPaid: number;
  balanceDue: number;
  bankAccountDetails: string;
  notes: string;
}



