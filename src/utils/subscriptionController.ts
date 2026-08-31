import { UserProfile, SubscriptionTier, FeatureKey, PaymentReceiptItem, AdminSubscriptionConfig } from '../types';

export interface PlanFeatureItem {
  id: string;
  name: string;
  category: 'core' | 'litigation' | 'enterprise' | 'billing';
  free: boolean | string;
  pro: boolean | string;
  enterprise: boolean | string;
  description: string;
}

export const DEFAULT_ADMIN_CONFIG: AdminSubscriptionConfig = {
  bankName: '',
  accountTitle: '',
  ibanNumber: '',
  walletNumber: '',
  walletProvider: 'JazzCash / EasyPaisa',
  proMonthlyPKR: 2500,
  proAnnualPKR: 25000,
  ultimateMonthlyPKR: 4000,
  ultimateAnnualPKR: 40000,
  transferInstructions: 'Transfer the exact fee to our official bank account or mobile wallet and submit the transaction ID (TRX). Verification takes 5-15 minutes.',
  updatedAt: new Date().toISOString(),
  updatedBy: 'Admin',
};

const ADMIN_CONFIG_KEY = 'saqibtax_admin_sub_config_v1';
export const ADMIN_CONFIG_EVENT = 'saqibtax_admin_config_updated';

export function getAdminSubscriptionConfig(): AdminSubscriptionConfig {
  try {
    const raw = localStorage.getItem(ADMIN_CONFIG_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      // Clean legacy dummy placeholder values if present
      if (parsed.ibanNumber === 'PK00MEZN00012345678901') parsed.ibanNumber = '';
      if (parsed.walletNumber === '0300-1234567' || parsed.walletNumber === '03001234567') parsed.walletNumber = '';
      if (parsed.accountTitle === 'SaqibTax Legal AI') parsed.accountTitle = '';
      if (parsed.bankName === 'Meezan Bank / HBL') parsed.bankName = '';
      return { ...DEFAULT_ADMIN_CONFIG, ...parsed };
    }
  } catch (err) {
    console.error('Error reading admin subscription config from localStorage:', err);
  }
  return DEFAULT_ADMIN_CONFIG;
}

export function saveAdminSubscriptionConfig(config: Partial<AdminSubscriptionConfig>): AdminSubscriptionConfig {
  const current = getAdminSubscriptionConfig();
  const updated: AdminSubscriptionConfig = {
    ...current,
    ...config,
    updatedAt: new Date().toISOString(),
    updatedBy: config.updatedBy || 'Admin Panel',
  };
  try {
    localStorage.setItem(ADMIN_CONFIG_KEY, JSON.stringify(updated));
    // Dispatch event across tabs/components
    window.dispatchEvent(new CustomEvent(ADMIN_CONFIG_EVENT, { detail: updated }));
    // Also broadcast to server
    fetch('/api/admin/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated),
    }).catch(e => console.warn('Failed to sync settings with server:', e));
  } catch (err) {
    console.error('Error saving admin subscription config:', err);
  }
  return updated;
}

export function subscribeToAdminConfig(callback: (config: AdminSubscriptionConfig) => void): () => void {
  const handler = (e: Event) => {
    const customEvent = e as CustomEvent<AdminSubscriptionConfig>;
    if (customEvent.detail) {
      callback(customEvent.detail);
    } else {
      callback(getAdminSubscriptionConfig());
    }
  };
  window.addEventListener(ADMIN_CONFIG_EVENT, handler);
  window.addEventListener('storage', (e) => {
    if (e.key === ADMIN_CONFIG_KEY) {
      callback(getAdminSubscriptionConfig());
    }
  });

  // Attempt initial background sync from server
  fetch('/api/admin/settings')
    .then(r => r.ok ? r.json() : null)
    .then(serverCfg => {
      if (serverCfg && serverCfg.bankName) {
        localStorage.setItem(ADMIN_CONFIG_KEY, JSON.stringify(serverCfg));
        callback(serverCfg);
      }
    })
    .catch(() => {});

  return () => {
    window.removeEventListener(ADMIN_CONFIG_EVENT, handler);
  };
}

export interface SubscriptionPlanDetails {
  tier: SubscriptionTier;
  name: string;
  subTitle: string;
  badge: string;
  monthlyPricePKR: number;
  annualPricePKR: number;
  annualSavingsPKR: number;
  highlight: boolean;
  accentColor: string;
  buttonText: string;
  targetAudience: string;
  features: string[];
  limitations: string[];
}

export const SUBSCRIPTION_PLANS: Record<SubscriptionTier, SubscriptionPlanDetails> = {
  free: {
    tier: 'free',
    name: 'Free Starter',
    subTitle: 'For Individual Salaried Taxpayers',
    badge: 'Standard Access',
    monthlyPricePKR: 0,
    annualPricePKR: 0,
    annualSavingsPKR: 0,
    highlight: false,
    accentColor: 'slate',
    buttonText: 'Current Plan',
    targetAudience: 'Individual filers checking salary withholding and tax brackets',
    features: [
      '5 AI Legal & FBR queries per day',
      'Income Tax Slab Calculator (Salaried/Business)',
      'Active Taxpayer List (ATL) 100BA Status Lookup',
      'Basic Sales Tax Rate Directory',
      'Access to FBR SRO & Circular Summary Database',
    ],
    limitations: [
      'No custom firm branding or advocate seal',
      'No multi-client ledger CRM',
      'No downloadable branded PDF Dossiers',
      'No team delegation & case dispatch board',
    ],
  },
  pro: {
    tier: 'pro',
    name: 'Pro Consultant',
    subTitle: 'For Individual Tax Consultants & Accountants',
    badge: 'Most Popular',
    monthlyPricePKR: 2500,
    annualPricePKR: 25000,
    annualSavingsPKR: 5000,
    highlight: true,
    accentColor: 'emerald',
    buttonText: 'Upgrade to Pro',
    targetAudience: 'Solo tax practitioners, corporate accountants, and CFOs',
    features: [
      'Unlimited AI Legal & FBR queries (GPT-4o & Claude 3.5 class)',
      'Complete FBR Notice Reply Drafter (Sec 122/111/177/214C)',
      'Full Contract & Clause Tax Risk Inspector',
      'Super Tax (Sec 4C) & WHT Multi-Rate Matrix Engine',
      'Provincial Services Tax (PRA, SRB, KPRA, BRA) Calculator',
      'Section 7E Deemed Rental Tax & 236K/236C Real Estate Suite',
      'Downloadable Standard Tax Dossiers & Audit Trails',
      'Save up to 5 Client profiles locally',
    ],
    limitations: [
      'No multi-user firm team delegation',
      'No custom advocate rubber stamp & seal embedding',
      'No dynamic tax slab SRO code customization sandbox',
    ],
  },
  enterprise: {
    tier: 'enterprise',
    name: 'Ultimate / Corporate',
    subTitle: 'For Law Chambers, CAs & Corporate Tax Teams',
    badge: 'Full Suite Corporate',
    monthlyPricePKR: 4000,
    annualPricePKR: 40000,
    annualSavingsPKR: 8000,
    highlight: false,
    accentColor: 'amber',
    buttonText: 'Upgrade to Ultimate / Corporate',
    targetAudience: 'Law chambers, chartered accountancy firms, and corporate tax teams',
    features: [
      'Everything in Pro Consultant Tier included',
      'Firm Letterhead & Advocate High Court Stamp Customizer',
      'Digital Signature Canvas & Embedded Seal in PDF Dossiers',
      'Unlimited Client Ledger CRM with Section 116 Wealth Recon',
      'Law Firm Team Directory & Case Dispatch Matrix',
      'Dynamic Tax Slab & SRO Override Configuration Engine',
      'Professional Legal Fee Notes & Billing Invoicing Suite',
      'Client-Side AES-256 Data Masking & Secure Local Vault',
      'Direct WhatsApp Senior Counsel & Appellate Escalation Desk',
      'Priority Dedicated Low-Latency AI Reasoning Channel',
    ],
    limitations: [],
  },
};

export function getDynamicSubscriptionPlans(customConfig?: AdminSubscriptionConfig): Record<SubscriptionTier, SubscriptionPlanDetails> {
  const cfg = customConfig || getAdminSubscriptionConfig();
  return {
    ...SUBSCRIPTION_PLANS,
    pro: {
      ...SUBSCRIPTION_PLANS.pro,
      monthlyPricePKR: cfg.proMonthlyPKR,
      annualPricePKR: cfg.proAnnualPKR,
      annualSavingsPKR: Math.max(0, (cfg.proMonthlyPKR * 12) - cfg.proAnnualPKR),
    },
    enterprise: {
      ...SUBSCRIPTION_PLANS.enterprise,
      name: 'Ultimate / Corporate',
      monthlyPricePKR: cfg.ultimateMonthlyPKR,
      annualPricePKR: cfg.ultimateAnnualPKR,
      annualSavingsPKR: Math.max(0, (cfg.ultimateMonthlyPKR * 12) - cfg.ultimateAnnualPKR),
    },
  };
}

export const COMPARISON_FEATURES: PlanFeatureItem[] = [
  {
    id: 'ai_queries',
    name: 'AI Legal Reasoning Queries',
    category: 'core',
    free: '5 queries / day',
    pro: 'Unlimited Queries',
    enterprise: 'Unlimited + Priority Channel',
    description: 'Instant grounded answers from Income Tax Ord. 2001, STA 1990, & PRA/SRB Acts',
  },
  {
    id: 'tax_calculators',
    name: 'All Tax Calculation Engines',
    category: 'core',
    free: 'Basic Salary Only',
    pro: true,
    enterprise: true,
    description: 'Income Tax, Super Tax (4C), Sec 7E, Sec 236K/C, Sales Tax 18% & Provincial Services',
  },
  {
    id: 'notice_drafter',
    name: 'FBR Notice Reply Drafter',
    category: 'litigation',
    free: 'Summary Only',
    pro: true,
    enterprise: true,
    description: 'Comprehensive statutory replies with High Court & ATIR precedent citations',
  },
  {
    id: 'contract_analyzer',
    name: 'Contract Tax Risk Analyzer',
    category: 'litigation',
    free: false,
    pro: true,
    enterprise: true,
    description: 'Upload PDF/Doc agreements to check withholding risk, WHT obligations, and PE risk',
  },
  {
    id: 'pdf_exports',
    name: 'Downloadable PDF Audit Dossiers',
    category: 'core',
    free: false,
    pro: 'Standard Format',
    enterprise: 'Custom Stamped & Branded',
    description: 'Official calculation reports suitable for client submission and tax authority audits',
  },
  {
    id: 'client_ledger',
    name: 'Multi-Client Ledger CRM',
    category: 'enterprise',
    free: false,
    pro: 'Up to 5 Clients',
    enterprise: 'Unlimited Clients',
    description: 'Track client CNIC, NTN, compliance status, saved computations, and wealth history',
  },
  {
    id: 'wealth_recon',
    name: 'Section 116 Wealth Reconciliation',
    category: 'enterprise',
    free: false,
    pro: 'Basic Formula',
    enterprise: 'Full Audit Recon + PDF',
    description: 'Formulas reconciling Opening Net Wealth + Inflows - Expenses = Declared Wealth',
  },
  {
    id: 'firm_branding',
    name: 'Firm Letterhead & Advocate Stamp',
    category: 'enterprise',
    free: false,
    pro: false,
    enterprise: true,
    description: 'Brand all generated documents with your chamber name, High Court seal, and digital signature',
  },
  {
    id: 'team_dispatch',
    name: 'Law Firm Team & Case Dispatch',
    category: 'enterprise',
    free: false,
    pro: false,
    enterprise: true,
    description: 'Delegate cases to Partners, Associates, and Trainees with deadlines and stage tracking',
  },
  {
    id: 'dynamic_sro',
    name: 'Dynamic SRO & Tax Config Sandbox',
    category: 'enterprise',
    free: false,
    pro: false,
    enterprise: true,
    description: 'Live formula sandbox to test custom withholding rates and Finance Act modifications',
  },
  {
    id: 'billing_invoicing',
    name: 'Professional Legal Fee Invoicing',
    category: 'billing',
    free: false,
    pro: 'Basic Calculator',
    enterprise: 'Full Invoices + PST Breakdown',
    description: 'Generate itemized fee notes with PRA/SRB tax computations and bank wire instructions',
  },
];

export interface FeatureRequirement {
  minTier: SubscriptionTier;
  name: string;
  description: string;
  benefits: string[];
}

export const FEATURE_REQUIREMENTS: Record<FeatureKey, FeatureRequirement> = {
  branded_pdf_exports: {
    minTier: 'enterprise',
    name: 'Branded Firm PDF Dossiers & Letterheads',
    description: 'Export professional tax computation dossiers and wealth statements stamped with your Law Chamber logo, High Court Advocate seal, and digital signature.',
    benefits: [
      'Automatic High Court Advocate Circular Stamp Seal rendering',
      'Embed Firm Logo, NTN, Bar Council Roll Number & Office Address',
      'Digital Signature embedding on client-facing advisory dossiers',
      'Watermarked, attorney-client privileged official layout',
    ],
  },
  multi_client_ledger: {
    minTier: 'enterprise',
    name: 'Multi-Client Ledger & Practice CRM',
    description: 'Manage your entire client portfolio with individual compliance profiles, saved calculations, and Section 116 wealth reconciliations.',
    benefits: [
      'Unlimited client profiles with CNIC/NTN tracking',
      'Client-side AES encrypted confidential local storage',
      'Instant tax computation history attached per client',
      'Export itemized client tax summaries in single click',
    ],
  },
  case_dispatch_team: {
    minTier: 'enterprise',
    name: 'Law Firm Team & Case Dispatch Matrix',
    description: 'Manage legal team members (Partners, Associates, Trainees) and assign statutory cases with priorities, deadlines, and internal memo generation.',
    benefits: [
      'Track associate workload, hourly rates, and active assignments',
      'Case dispatch board with Iris filing stage tracking',
      'Automated Internal Partner Delegation Memos',
      'High Court Bar enrollment number verification logs',
    ],
  },
  dynamic_tax_config: {
    minTier: 'enterprise',
    name: 'Dynamic Tax Slabs & SRO Configuration Sandbox',
    description: 'Customize statutory tax matrices, adjust withholding percentages, and test new SRO rules in real-time formula sandboxes.',
    benefits: [
      'Live override of First Schedule Division I & II tax brackets',
      'Modify WHT rates under Sections 153, 236C, 236K, and 151',
      'JSON export & import for multi-branch firm consistency',
      'Live sandbox testing with sample taxpayer scenarios',
    ],
  },
  wealth_reconciliation_audit: {
    minTier: 'enterprise',
    name: 'Section 116 Wealth Reconciliation Engine',
    description: 'Perform rigorous mathematical reconciliation of net wealth accretion against declared taxable income and personal expenses.',
    benefits: [
      'Automated reconciliation difference calculation',
      'Foreign remittance & capital gains inflow adjustments',
      'Iris statement mismatch audit warnings',
      'Branded Reconciliation Certificate PDF export',
    ],
  },
  unlimited_ai_queries: {
    minTier: 'pro',
    name: 'Unlimited AI Legal & FBR Intelligence',
    description: 'Remove the 5 queries/day restriction and access high-capacity AI statutory analysis with zero wait times.',
    benefits: [
      'Unlimited queries across all Pakistani tax statutes',
      'In-depth legal precedents from Lahore, Sindh & Islamabad High Courts',
      'Context-aware multi-step tax consultation dialogues',
    ],
  },
  fbr_notice_drafter: {
    minTier: 'pro',
    name: 'Statutory Notice Reply Generator',
    description: 'Draft comprehensive legal replies to FBR audit and assessment notices under Section 122, 111, 177, and 214C.',
    benefits: [
      'Grounded statutory defense based on Income Tax Ordinance 2001',
      'Custom ground-by-ground factual defense formatting',
      'ATIR and Superior Court citation integrations',
    ],
  },
  custom_branding_seal: {
    minTier: 'enterprise',
    name: 'Advocate Seal & Signature Customizer',
    description: 'Configure official digital stamps and draw or upload legal signatures for inclusion on generated certifications.',
    benefits: [
      'Circular High Court Bar and rectangular chamber stamp customizer',
      'Interactive canvas signature pad with touch and stylus support',
      'Embed verifiable credentials on all legal memos and fee notes',
    ],
  },
  priority_counsel_escalation: {
    minTier: 'enterprise',
    name: 'Priority WhatsApp Counsel Desk',
    description: 'Direct priority channel to practicing High Court Tax Advocates for complex appellate matters and Supreme Court references.',
    benefits: [
      'Direct WhatsApp helpline with senior tax counsel',
      'Assistance with ATIR and High Court reference drafting',
      'Same-day emergency response for statutory audit notices',
    ],
  },
};

/**
 * Check if a user has access to a specific gated feature
 */
export function hasFeatureAccess(user: UserProfile | null, featureKey: FeatureKey): boolean {
  if (!user) return false;
  const userTier = user.subscriptionTier || 'free';
  const req = FEATURE_REQUIREMENTS[featureKey];
  if (!req) return true;

  if (req.minTier === 'pro') {
    return userTier === 'pro' || userTier === 'enterprise';
  }

  if (req.minTier === 'enterprise') {
    return userTier === 'enterprise';
  }

  return true;
}

/**
 * Get Feature Requirement Info
 */
export function getFeatureRequirement(featureKey: FeatureKey): FeatureRequirement {
  return FEATURE_REQUIREMENTS[featureKey] || {
    minTier: 'enterprise',
    name: 'Enterprise Feature',
    description: 'This feature is restricted to Pro or Enterprise subscribers.',
    benefits: ['Unlock advanced functionality', 'Unlimited usage'],
  };
}

/**
 * Record a simulated payment transaction in local storage and create a receipt
 */
export function recordLocalPaymentReceipt(
  user: UserProfile | null,
  method: 'JazzCash' | 'EasyPaisa' | 'Card' | 'Meezan Bank' | 'HBL',
  planTier: 'pro' | 'enterprise',
  billingCycle: 'Monthly' | 'Yearly',
  trxId: string,
  senderName: string,
  extraNotes?: string
): PaymentReceiptItem {
  const plan = SUBSCRIPTION_PLANS[planTier];
  const amount = billingCycle === 'Yearly' ? plan.annualPricePKR : plan.monthlyPricePKR;

  const receipt: PaymentReceiptItem = {
    id: `rcpt-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
    user_id: user?.id || 'demo-user',
    user_email: user?.email || 'user@saqibtax.pk',
    user_name: senderName || user?.fullName || 'Valued Subscriber',
    user_organization: user?.organization || 'SaqibTax Client',
    amount,
    transaction_id: trxId || `TX-${Math.floor(100000000 + Math.random() * 900000000)}`,
    sender_name: senderName || user?.fullName || 'Tax Practitioner',
    plan_type: billingCycle,
    plan_tier: planTier,
    payment_method: method,
    status: 'Approved', // Auto-approved in interactive client mode
    notes: extraNotes || 'Instant digital gateway activation',
    submitted_at: new Date().toISOString(),
    verified_at: new Date().toISOString(),
    verified_by: 'SaqibTax Automated Digital Gateway',
  };

  try {
    const existingRaw = localStorage.getItem('saqibtax_receipts');
    const existing: PaymentReceiptItem[] = existingRaw ? JSON.parse(existingRaw) : [];
    localStorage.setItem('saqibtax_receipts', JSON.stringify([receipt, ...existing]));
  } catch (err) {
    console.error('Failed to store receipt locally:', err);
  }

  return receipt;
}
