import { SalesTaxCategory, BuyerStatus, SalesTaxCalculationResult } from '../types';

export interface SalesTaxRateMeta {
  id: SalesTaxCategory;
  name: string;
  shortLabel: string;
  rate: number; // in percent
  authority: string;
  statute: string;
  description: string;
  defaultExempt90Cap?: boolean;
}

export const SALES_TAX_CATEGORIES: Record<SalesTaxCategory, SalesTaxRateMeta> = {
  goods_standard_18: {
    id: 'goods_standard_18',
    name: 'Standard Taxable Goods (Sec 3(1))',
    shortLabel: 'Goods 18%',
    rate: 18,
    authority: 'FBR (Federal Board of Revenue)',
    statute: 'Section 3(1) of Sales Tax Act, 1990',
    description: 'Standard ad-valorem sales tax on supply of taxable goods manufactured or imported into Pakistan.'
  },
  services_pra_16: {
    id: 'services_pra_16',
    name: 'PRA - Punjab Sales Tax on Services',
    shortLabel: 'Punjab PRA 16%',
    rate: 16,
    authority: 'Punjab Revenue Authority (PRA)',
    statute: 'Punjab Sales Tax on Services Act, 2012 (Second Schedule)',
    description: 'Standard rate on taxable services provided or rendered in the Province of Punjab.'
  },
  services_srb_15: {
    id: 'services_srb_15',
    name: 'SRB - Sindh Sales Tax on Services',
    shortLabel: 'Sindh SRB 15%',
    rate: 15,
    authority: 'Sindh Revenue Board (SRB)',
    statute: 'Sindh Sales Tax on Services Act, 2011 (Second Schedule)',
    description: 'Standard statutory rate on services provided within the Province of Sindh.'
  },
  services_kpra_15: {
    id: 'services_kpra_15',
    name: 'KPRA - Khyber Pakhtunkhwa Sales Tax',
    shortLabel: 'KPK KPRA 15%',
    rate: 15,
    authority: 'KP Revenue Authority (KPRA)',
    statute: 'Khyber Pakhtunkhwa Finance Act, 2013',
    description: 'Provincial sales tax on taxable services rendered in Khyber Pakhtunkhwa.'
  },
  services_bra_15: {
    id: 'services_bra_15',
    name: 'BRA - Balochistan Sales Tax on Services',
    shortLabel: 'Balochistan BRA 15%',
    rate: 15,
    authority: 'Balochistan Revenue Authority (BRA)',
    statute: 'Balochistan Sales Tax on Services Act, 2015',
    description: 'Provincial sales tax on taxable service heads in Balochistan.'
  },
  services_ict_15: {
    id: 'services_ict_15',
    name: 'ICT - Islamabad Capital Territory Services',
    shortLabel: 'Islamabad ICT 15%',
    rate: 15,
    authority: 'FBR / ICT Administration',
    statute: 'ICT (Tax on Services) Ordinance, 2001 (Table 1)',
    description: 'Federal sales tax on services rendered in Islamabad Capital Territory.'
  },
  tier1_retail_pos: {
    id: 'tier1_retail_pos',
    name: 'Tier-1 Retailer (Integrated POS Invoicing)',
    shortLabel: 'Tier-1 POS 18%',
    rate: 18,
    authority: 'FBR Sales Tax Rules (Chapter XIV-AA)',
    statute: 'Section 2(43A) & Section 3(9A) / SRO 1006(I)/2021',
    description: 'Integrated Real-time Point of Sale (POS) invoicing by Tier-1 retailers.'
  },
  third_schedule_retail: {
    id: 'third_schedule_retail',
    name: 'Third Schedule Goods (Printed Retail Price)',
    shortLabel: 'Third Schedule 18%',
    rate: 18,
    authority: 'FBR (Section 3(2)(a))',
    statute: 'Third Schedule to the Sales Tax Act, 1990',
    description: 'Tax charged on the printed Maximum Retail Price (MRP) rather than transaction value (e.g. FMCG, soap, beverages).'
  },
  export_zero_rated_5th: {
    id: 'export_zero_rated_5th',
    name: 'Export / Zero-Rated Supplies (Fifth Schedule)',
    shortLabel: 'Zero-Rated 0%',
    rate: 0,
    authority: 'FBR (Section 4)',
    statute: 'Section 4 & Fifth Schedule, Sales Tax Act, 1990',
    description: '0% sales tax on export of goods, duty-free supplies, and specified zero-rated supply chains.'
  },
  exempt_goods_6th: {
    id: 'exempt_goods_6th',
    name: 'Exempt Goods / Supplies (Sixth Schedule)',
    shortLabel: 'Exempt 0%',
    rate: 0,
    authority: 'FBR (Section 13)',
    statute: 'Section 13 & Sixth Schedule, Sales Tax Act, 1990',
    description: 'Unprocessed agricultural produce, basic medicines, and items exempt from charge of sales tax.'
  }
};

export interface ProvincialComparisonItem {
  code: string;
  name: string;
  authority: string;
  statute: string;
  standardRate: string;
  itSoftwareRate: string;
  withholdingRule: string;
  portalUrl: string;
  notes: string;
}

export const PROVINCIAL_TAX_PROFILES: ProvincialComparisonItem[] = [
  {
    code: 'PRA',
    name: 'Punjab',
    authority: 'Punjab Revenue Authority (PRA)',
    statute: 'Punjab Sales Tax on Services Act, 2012',
    standardRate: '16%',
    itSoftwareRate: '0% (Exempt) or 5% without input tax',
    withholdingRule: 'Punjab Sales Tax on Services (Withholding) Rules, 2015',
    portalUrl: 'https://pra.punjab.gov.pk',
    notes: 'Mandatory e-invoicing for hospitality, telecom, freight forwarding, and corporate consultants.'
  },
  {
    code: 'SRB',
    name: 'Sindh',
    authority: 'Sindh Revenue Board (SRB)',
    statute: 'Sindh Sales Tax on Services Act, 2011',
    standardRate: '15%',
    itSoftwareRate: '3% / 13% for specific IT export corridors',
    withholdingRule: 'Sindh Sales Tax Special Procedure (Withholding) Rules, 2014',
    portalUrl: 'https://srb.gos.pk',
    notes: 'POS integration enforced on restaurants (reduced to 8% for digital/card payments).'
  },
  {
    code: 'KPRA',
    name: 'Khyber Pakhtunkhwa',
    authority: 'KP Revenue Authority (KPRA)',
    statute: 'Khyber Pakhtunkhwa Finance Act, 2013',
    standardRate: '15%',
    itSoftwareRate: '2% for software development / IT consultancy',
    withholdingRule: 'KPRA Sales Tax Withholding Regulations',
    portalUrl: 'https://kpra.kp.gov.pk',
    notes: 'Tiered incentive rates for tourism, telecommunications, and developmental construction.'
  },
  {
    code: 'BRA',
    name: 'Balochistan',
    authority: 'Balochistan Revenue Authority (BRA)',
    statute: 'Balochistan Sales Tax on Services Act, 2015',
    standardRate: '15%',
    itSoftwareRate: 'Standard 15% with designated exemptions',
    withholdingRule: 'BRA Sales Tax on Services (Withholding) Rules, 2017',
    portalUrl: 'https://bra.gob.pk',
    notes: 'Special emphasis on mining, coastal transport, logistics, and port handling services.'
  },
  {
    code: 'ICT',
    name: 'Islamabad Capital Territory',
    authority: 'Federal Board of Revenue (FBR)',
    statute: 'ICT (Tax on Services) Ordinance, 2001',
    standardRate: '15%',
    itSoftwareRate: '0% for export of computer services, 5% for local IT',
    withholdingRule: 'Sales Tax Special Procedure (Withholding) Rules, 2007',
    portalUrl: 'https://fbr.gov.pk',
    notes: 'Administered under FBR Iris portal for federal territory jurisdictions.'
  }
];

export interface StatuteRepoItem {
  id: string;
  title: string;
  category: 'primary' | 'rules' | 'fed' | 'pos_einvoice';
  badge: string;
  year: string;
  sectionsCount: string;
  keyHighlights: string[];
  summary: string;
  fullReference: string;
}

export const SALES_TAX_STATUTES_REPO: StatuteRepoItem[] = [
  {
    id: 'sta-1990',
    title: 'Sales Tax Act, 1990',
    category: 'primary',
    badge: 'Primary Statute',
    year: '1990 (Amended 2025/26)',
    sectionsCount: '75+ Sections & 14 Schedules',
    keyHighlights: [
      'Section 3: Charge and levy of sales tax at standard 18% rate',
      'Section 3(1A): 3% Further Tax on supplies to unregistered persons',
      'Section 7 & 8: Determination of tax liability and input tax credit restrictions',
      'Section 8B: 90% statutory cap on monthly input tax adjustment against output tax',
      'Section 26: Mandatory monthly electronic sales tax returns (Annexure-C)',
      'Section 40C: Digital monitoring and real-time electronic invoicing'
    ],
    summary: 'The principal federal law governing the imposition, collection, and administration of value-added sales tax on the supply and import of goods throughout Pakistan.',
    fullReference: 'Act No. VII of 1990 as amended by Finance Acts up to Tax Year 2026.'
  },
  {
    id: 'str-2006',
    title: 'Sales Tax Rules, 2006',
    category: 'rules',
    badge: 'Operational Rules',
    year: '2006 (Consolidated)',
    sectionsCount: '15+ Comprehensive Chapters',
    keyHighlights: [
      'Chapter I: Registration, Biometric Verification & De-registration procedures',
      'Chapter II: Tax Invoicing & Credit/Debit Note issuance specifications',
      'Chapter III: Electronic return filing & Annexure-A/C purchase-sale matching',
      'Chapter IV: Statutory refund processing & FASTER automated system',
      'Chapter XIV-AA: Integrated electronic Point of Sale (POS) technical standards'
    ],
    summary: 'Detailed statutory regulations providing operational frameworks for invoicing, STRN registration, debit notes, monthly reconciliation, and automated refunds.',
    fullReference: 'S.R.O. 558(I)/2006 dated June 5, 2006 as amended.'
  },
  {
    id: 'fed-2005',
    title: 'Federal Excise Act, 2005 & Rules',
    category: 'fed',
    badge: 'Excise Duty',
    year: '2005 (Amended 2025/26)',
    sectionsCount: '49 Sections & 2 Schedules',
    keyHighlights: [
      'Section 3: Levy and collection of Federal Excise Duty on specified goods & services',
      'First Schedule: Excisable goods (Aerated water, cement, tobacco, petroleum, luxury vehicles)',
      'Second Schedule: Excisable services provided in federal areas & airline tickets',
      'Track and Trace System (Stamp/Sticker authentication for tobacco and sugar)',
      'Section 7: Input tax adjustment on excisable raw materials'
    ],
    summary: 'Federal statute imposing specific and ad-valorem excise duties on manufactured goods, import items, and services in specified industries.',
    fullReference: 'Act No. VII of 2005 as amended up to Finance Act, 2025.'
  },
  {
    id: 'pos-einvoice',
    title: 'Electronic Invoicing & POS Integration Rules',
    category: 'pos_einvoice',
    badge: 'Digital Invoicing',
    year: 'SRO 1006 / SRO 252 (2024-2026)',
    sectionsCount: 'Special Procedure Rules',
    keyHighlights: [
      'Tier-1 Retailer criteria: Area > 1000 sq ft or electricity bill > threshold',
      'Real-time API integration with FBR Fiscalization Central Engine',
      'QR Code printing on sales invoices with FBR Invoice Number verification',
      'Section 33 Table 1 Penalty: PKR 500,000 for non-integrated POS systems & shop sealing',
      'Cashback and prize lottery schemes for verified consumer receipts'
    ],
    summary: 'Modern digital compliance directives mandating real-time electronic transmission of sales invoices directly to FBR database prior to customer receipt issuance.',
    fullReference: 'SRO 1006(I)/2021 & SRO 252(I)/2024 published under Section 40C of STA 1990.'
  }
];

/**
 * Deterministic Sales Tax & FED Computation Engine
 */
export function calculateSalesTax(
  taxableValue: number,
  category: SalesTaxCategory,
  buyerStatus: BuyerStatus,
  inputTaxClaimed: number = 0,
  includeFed: boolean = false,
  fedRatePercent: number = 0
): SalesTaxCalculationResult {
  const safeTaxableValue = Math.max(0, taxableValue || 0);
  const categoryMeta = SALES_TAX_CATEGORIES[category] || SALES_TAX_CATEGORIES.goods_standard_18;
  const statutoryRate = categoryMeta.rate;

  // 1. Base Output Tax
  const baseOutputTax = Math.round((safeTaxableValue * statutoryRate) / 100);

  // 2. Further Tax under Section 3(1A)
  // 3% Further Tax on supplies to unregistered persons (only applies if buyer is unregistered and rate > 0)
  let furtherTaxRate = 0;
  let furtherTaxAmount = 0;
  if (buyerStatus === 'unregistered' && statutoryRate > 0) {
    furtherTaxRate = 3;
    furtherTaxAmount = Math.round((safeTaxableValue * 3) / 100);
  }

  // 3. Total Output Tax
  const totalOutputTax = baseOutputTax + furtherTaxAmount;

  // 4. Section 8B 90% Input Tax Limitation Cap Rule
  // A registered person shall not adjust input tax in excess of 90% of output tax for that period
  const safeInputClaimed = Math.max(0, inputTaxClaimed || 0);
  const maxAdmissibleLimit = Math.round(baseOutputTax * 0.90);
  
  let admissibleInputTaxCredit = 0;
  let is90PercentCapped = false;

  if (safeInputClaimed > 0) {
    if (safeInputClaimed > maxAdmissibleLimit) {
      admissibleInputTaxCredit = maxAdmissibleLimit;
      is90PercentCapped = true;
    } else {
      admissibleInputTaxCredit = safeInputClaimed;
      is90PercentCapped = false;
    }
  }

  const inadmissibleOrCarriedForwardInput = Math.max(0, safeInputClaimed - admissibleInputTaxCredit);

  // 5. Optional Federal Excise Duty (FED)
  let fedAmount = 0;
  if (includeFed && fedRatePercent > 0) {
    fedAmount = Math.round((safeTaxableValue * fedRatePercent) / 100);
  }

  // 6. Net Sales Tax Payable to FBR / Provincial Treasury
  // Formula: (Base Output Tax + Further Tax) - Admissible Input Tax + FED
  const netSalesTaxPayable = Math.max(0, (baseOutputTax + furtherTaxAmount + fedAmount) - admissibleInputTaxCredit);

  // 7. Total Invoice Amount charged to customer
  const totalTaxInvoiceAmount = safeTaxableValue + baseOutputTax + furtherTaxAmount + fedAmount;

  // 8. Statutory Citations
  const citations: string[] = [
    categoryMeta.statute,
    ...(furtherTaxAmount > 0 ? ['Section 3(1A) Sales Tax Act, 1990 (3% Further Tax on supplies to Unregistered Persons)'] : []),
    ...(safeInputClaimed > 0 ? ['Section 7 Sales Tax Act, 1990 (Determination of Tax Liability & Input Tax Adjustment)'] : []),
    ...(is90PercentCapped ? ['Section 8B Sales Tax Act, 1990 (90% Output Tax Adjustment Limitation Cap)'] : []),
    ...(fedAmount > 0 ? ['Section 3 Federal Excise Act, 2005 (Levy and Collection of FED)'] : [])
  ];

  return {
    taxableValue: safeTaxableValue,
    category,
    categoryLabel: categoryMeta.name,
    statutoryRate,
    baseOutputTax,
    buyerStatus,
    furtherTaxRate,
    furtherTaxAmount,
    totalOutputTax,
    inputTaxClaimed: safeInputClaimed,
    is90PercentCapped,
    maxAdmissibleInputLimit: maxAdmissibleLimit,
    admissibleInputTaxCredit,
    inadmissibleOrCarriedForwardInput,
    fedRate: fedRatePercent,
    fedAmount,
    netSalesTaxPayable,
    totalTaxInvoiceAmount,
    statutoryCitations: citations
  };
}
