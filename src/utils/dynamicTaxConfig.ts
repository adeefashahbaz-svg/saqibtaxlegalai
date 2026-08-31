/**
 * SaqibTax - Dynamic Tax Slab & Rate Config System
 * 
 * Separates hardcoded statutory tax matrices into a configurable, versioned JSON schema.
 * Supports Salaried, Non-Salaried/Business, Corporate, Section 4C Super Tax, 
 * Section 7E Immovable Property, Provincial Sales Taxes (PRA, SRB, KPRA, BRA), and WHT Matrix.
 */

import {
  DynamicTaxConfigSchema,
  DynamicTaxSlab,
  DynamicWHTRate,
  DynamicSalesTaxRate,
  DynamicSuperTaxSlab
} from '../types';
import { getSecureItem, setSecureItem } from './cryptoStorage';

const DYNAMIC_TAX_CONFIG_KEY = 'saqibtax_dynamic_tax_config_v1';

export const STATUTORY_DEFAULT_TAX_CONFIG: DynamicTaxConfigSchema = {
  version: '2026.2.0',
  statutoryTaxYear: '2026-2027',
  financeActName: 'Finance Act 2026 (Act No. VIII of 2026) & Income Tax Ordinance 2001',
  effectiveDate: '2026-07-01',
  lastUpdated: '2026-08-15',
  isCustomOverrideActive: false,
  authorNote: 'Official statutory slabs enacted by National Assembly of Pakistan under Finance Act 2026.',
  
  incomeTax: {
    salariedSlabs: [
      {
        id: 'sal-slab-1',
        slabIndex: 1,
        minIncome: 0,
        maxIncome: 600000,
        fixedTax: 0,
        ratePercentage: 0,
        slabDescription: 'Up to PKR 600,000 (0% Tax / Exempt)',
        legalProvisionRef: 'First Schedule, Part I, Division I, Clause (1)'
      },
      {
        id: 'sal-slab-2',
        slabIndex: 2,
        minIncome: 600000,
        maxIncome: 1200000,
        fixedTax: 0,
        ratePercentage: 5,
        slabDescription: 'PKR 600,001 to 1,200,000 (5% on excess over PKR 600,000)',
        legalProvisionRef: 'First Schedule, Part I, Division I, Clause (2)'
      },
      {
        id: 'sal-slab-3',
        slabIndex: 3,
        minIncome: 1200000,
        maxIncome: 2200000,
        fixedTax: 30000,
        ratePercentage: 15,
        slabDescription: 'PKR 1,200,001 to 2,200,000 (PKR 30,000 + 15% on excess over PKR 1,200,000)',
        legalProvisionRef: 'First Schedule, Part I, Division I, Clause (3)'
      },
      {
        id: 'sal-slab-4',
        slabIndex: 4,
        minIncome: 2200000,
        maxIncome: 3200000,
        fixedTax: 180000,
        ratePercentage: 25,
        slabDescription: 'PKR 2,200,001 to 3,200,000 (PKR 180,000 + 25% on excess over PKR 2,200,000)',
        legalProvisionRef: 'First Schedule, Part I, Division I, Clause (4)'
      },
      {
        id: 'sal-slab-5',
        slabIndex: 5,
        minIncome: 3200000,
        maxIncome: 4100000,
        fixedTax: 430000,
        ratePercentage: 30,
        slabDescription: 'PKR 3,200,001 to 4,100,000 (PKR 430,000 + 30% on excess over PKR 3,200,000)',
        legalProvisionRef: 'First Schedule, Part I, Division I, Clause (5)'
      },
      {
        id: 'sal-slab-6',
        slabIndex: 6,
        minIncome: 4100000,
        maxIncome: 1000000000, // 1 Billion upper bound
        fixedTax: 700000,
        ratePercentage: 35,
        slabDescription: 'Above PKR 4,100,000 (PKR 700,000 + 35% on excess over PKR 4,100,000)',
        legalProvisionRef: 'First Schedule, Part I, Division I, Clause (6)'
      }
    ],

    nonSalariedSlabs: [
      {
        id: 'biz-slab-1',
        slabIndex: 1,
        minIncome: 0,
        maxIncome: 600000,
        fixedTax: 0,
        ratePercentage: 0,
        slabDescription: 'Up to PKR 600,000 (0% Tax / Exempt)',
        legalProvisionRef: 'First Schedule, Part I, Division I, Clause (1)'
      },
      {
        id: 'biz-slab-2',
        slabIndex: 2,
        minIncome: 600000,
        maxIncome: 1200000,
        fixedTax: 0,
        ratePercentage: 15,
        slabDescription: 'PKR 600,001 to 1,200,000 (15% on excess over PKR 600,000)',
        legalProvisionRef: 'First Schedule, Part I, Division I, Clause (2)'
      },
      {
        id: 'biz-slab-3',
        slabIndex: 3,
        minIncome: 1200000,
        maxIncome: 1600000,
        fixedTax: 90000,
        ratePercentage: 20,
        slabDescription: 'PKR 1,200,001 to 1,600,000 (PKR 90,000 + 20% on excess over PKR 1,200,000)',
        legalProvisionRef: 'First Schedule, Part I, Division I, Clause (3)'
      },
      {
        id: 'biz-slab-4',
        slabIndex: 4,
        minIncome: 1600000,
        maxIncome: 3200000,
        fixedTax: 170000,
        ratePercentage: 30,
        slabDescription: 'PKR 1,600,001 to 3,200,000 (PKR 170,000 + 30% on excess over PKR 1,600,000)',
        legalProvisionRef: 'First Schedule, Part I, Division I, Clause (4)'
      },
      {
        id: 'biz-slab-5',
        slabIndex: 5,
        minIncome: 3200000,
        maxIncome: 5600000,
        fixedTax: 650000,
        ratePercentage: 40,
        slabDescription: 'PKR 3,200,001 to 5,600,000 (PKR 650,000 + 40% on excess over PKR 3,200,000)',
        legalProvisionRef: 'First Schedule, Part I, Division I, Clause (5)'
      },
      {
        id: 'biz-slab-6',
        slabIndex: 6,
        minIncome: 5600000,
        maxIncome: 1000000000,
        fixedTax: 1610000,
        ratePercentage: 45,
        slabDescription: 'Above PKR 5,600,000 (PKR 1,610,000 + 45% on excess over PKR 5,600,000)',
        legalProvisionRef: 'First Schedule, Part I, Division I, Clause (6)'
      }
    ],

    aopSlabs: [
      {
        id: 'aop-slab-1',
        slabIndex: 1,
        minIncome: 0,
        maxIncome: 600000,
        fixedTax: 0,
        ratePercentage: 0,
        slabDescription: 'Up to PKR 600,000 (0% Tax)',
        legalProvisionRef: 'First Schedule, Part I, Division I (AOPs)'
      },
      {
        id: 'aop-slab-2',
        slabIndex: 2,
        minIncome: 600000,
        maxIncome: 1200000,
        fixedTax: 0,
        ratePercentage: 15,
        slabDescription: 'PKR 600,001 to 1,200,000 (15%)',
        legalProvisionRef: 'First Schedule, Part I, Division I'
      },
      {
        id: 'aop-slab-3',
        slabIndex: 3,
        minIncome: 1200000,
        maxIncome: 1600000,
        fixedTax: 90000,
        ratePercentage: 20,
        slabDescription: 'PKR 1,200,001 to 1,600,000 (PKR 90k + 20%)',
        legalProvisionRef: 'First Schedule, Part I, Division I'
      },
      {
        id: 'aop-slab-4',
        slabIndex: 4,
        minIncome: 1600000,
        maxIncome: 3200000,
        fixedTax: 170000,
        ratePercentage: 30,
        slabDescription: 'PKR 1,600,001 to 3,200,000 (PKR 170k + 30%)',
        legalProvisionRef: 'First Schedule, Part I, Division I'
      },
      {
        id: 'aop-slab-5',
        slabIndex: 5,
        minIncome: 3200000,
        maxIncome: 5600000,
        fixedTax: 650000,
        ratePercentage: 40,
        slabDescription: 'PKR 3,200,001 to 5,600,000 (PKR 650k + 40%)',
        legalProvisionRef: 'First Schedule, Part I, Division I'
      },
      {
        id: 'aop-slab-6',
        slabIndex: 6,
        minIncome: 5600000,
        maxIncome: 1000000000,
        fixedTax: 1610000,
        ratePercentage: 45,
        slabDescription: 'Above PKR 5,600,000 (PKR 1.61M + 45%)',
        legalProvisionRef: 'First Schedule, Part I, Division I'
      }
    ],

    corporateStandardRate: 29, // 29% for standard companies
    smallCompanyRate: 20, // 20% for Small & Medium Enterprises (SMEs) / Small Companies

    superTaxSlabs: [
      {
        id: 'st-slab-1',
        minIncome: 0,
        maxIncome: 150000000,
        ratePercentage: 0,
        specifiedSectorsRatePercentage: 0,
        legalClause: 'Division IIB, First Schedule: Income up to PKR 150 Million (0% Super Tax)'
      },
      {
        id: 'st-slab-2',
        minIncome: 150000000,
        maxIncome: 200000000,
        ratePercentage: 1,
        specifiedSectorsRatePercentage: 10,
        legalClause: 'Division IIB: PKR 150M to 200M (1% General / 10% Specified Sectors)'
      },
      {
        id: 'st-slab-3',
        minIncome: 200000000,
        maxIncome: 250000000,
        ratePercentage: 2,
        specifiedSectorsRatePercentage: 10,
        legalClause: 'Division IIB: PKR 200M to 250M (2% General / 10% Specified Sectors)'
      },
      {
        id: 'st-slab-4',
        minIncome: 250000000,
        maxIncome: 300000000,
        ratePercentage: 3,
        specifiedSectorsRatePercentage: 10,
        legalClause: 'Division IIB: PKR 250M to 300M (3% General / 10% Specified Sectors)'
      },
      {
        id: 'st-slab-5',
        minIncome: 300000000,
        maxIncome: 350000000,
        ratePercentage: 4,
        specifiedSectorsRatePercentage: 10,
        legalClause: 'Division IIB: PKR 300M to 350M (4% General / 10% Specified Sectors)'
      },
      {
        id: 'st-slab-6',
        minIncome: 350000000,
        maxIncome: 400000000,
        ratePercentage: 6,
        specifiedSectorsRatePercentage: 10,
        legalClause: 'Division IIB: PKR 350M to 400M (6% General / 10% Specified Sectors)'
      },
      {
        id: 'st-slab-7',
        minIncome: 400000000,
        maxIncome: 500000000,
        ratePercentage: 8,
        specifiedSectorsRatePercentage: 10,
        legalClause: 'Division IIB: PKR 400M to 500M (8% General / 10% Specified Sectors)'
      },
      {
        id: 'st-slab-8',
        minIncome: 500000000,
        maxIncome: 10000000000,
        ratePercentage: 10,
        specifiedSectorsRatePercentage: 10,
        legalClause: 'Division IIB: Exceeding PKR 500M (10% General / 10% Specified Sectors)'
      }
    ]
  },

  section7E: {
    deemedRentRatePercentage: 5, // 5% of Fair Market Value
    taxRateOnDeemedRent: 20, // 20% on deemed rental income (= 1% of FMV)
    exemptionThresholdFairMarketValue: 25000000, // PKR 25M exemption for 1 self-owned property
    filerExemptionAvailable: true
  },

  salesTax: [
    {
      id: 'st-fbr',
      jurisdiction: 'FBR',
      jurisdictionName: 'Federal Board of Revenue (Goods & Federal Services)',
      standardRate: 18,
      reducedRates: [
        { category: 'Eighth Schedule Specified Goods', rate: 12, condition: 'Subject to condition prescribed under Table 1' },
        { category: 'Pharmaceutical & Active Ingredients', rate: 1, condition: 'Without input tax credit refund' },
        { category: 'Retailers on POS Integration', rate: 15, condition: 'Tier-1 integrated merchants' }
      ],
      withholdingRateStandard: 2, // 2% WHT on gross
      isWholesaleRetailApplicable: true,
      legalActRef: 'Sales Tax Act, 1990 (Section 3 & Third Schedule)'
    },
    {
      id: 'st-pra',
      jurisdiction: 'PRA',
      jurisdictionName: 'Punjab Revenue Authority (PST on Services)',
      standardRate: 16,
      reducedRates: [
        { category: 'Information Technology & Software Services', rate: 5, condition: 'Without input tax adjustment' },
        { category: 'Construction Services', rate: 5, condition: 'Without input tax adjustment' },
        { category: 'Hotel & Hospitality Services', rate: 16, condition: 'Standard rate' }
      ],
      withholdingRateStandard: 16, // Whole of tax or prescribed rate
      isWholesaleRetailApplicable: false,
      legalActRef: 'Punjab Sales Tax on Services Act, 2012 (Second Schedule)'
    },
    {
      id: 'st-srb',
      jurisdiction: 'SRB',
      jurisdictionName: 'Sindh Revenue Board (PST on Services)',
      standardRate: 15,
      reducedRates: [
        { category: 'IT-Enabled & Telecommunication Services', rate: 3, condition: 'Specified SRO regime' },
        { category: 'Legal & Accounting Professional Services', rate: 15, condition: 'Full rate with input credit' },
        { category: 'Security & Manpower Services', rate: 10, condition: 'Reduced without input tax credit' }
      ],
      withholdingRateStandard: 15,
      isWholesaleRetailApplicable: false,
      legalActRef: 'Sindh Sales Tax on Services Act, 2011'
    },
    {
      id: 'st-kpra',
      jurisdiction: 'KPRA',
      jurisdictionName: 'Khyber Pakhtunkhwa Revenue Authority',
      standardRate: 15,
      reducedRates: [
        { category: 'Catering & Event Management', rate: 8, condition: 'Special schedule' },
        { category: 'Mining & Extraction Allied Services', rate: 15, condition: 'Standard rate' }
      ],
      withholdingRateStandard: 15,
      isWholesaleRetailApplicable: false,
      legalActRef: 'KP Finance Act, 2013'
    },
    {
      id: 'st-bra',
      jurisdiction: 'BRA',
      jurisdictionName: 'Balochistan Revenue Authority',
      standardRate: 15,
      reducedRates: [
        { category: 'Transportation & Logistics', rate: 15, condition: 'Standard' }
      ],
      withholdingRateStandard: 15,
      isWholesaleRetailApplicable: false,
      legalActRef: 'Balochistan Sales Tax on Services Act, 2015'
    }
  ],

  withholdingTaxMatrix: [
    {
      id: 'wht-153-goods-corp',
      sectionCode: '153(1)(a) [Company]',
      title: 'Sale of Goods to / by Companies',
      category: 'goods',
      filerRate: 5.5,
      nonFilerRate: 11.0,
      thresholdAmount: 125000,
      description: 'Withholding on supply of commercial and industrial goods to corporate withholding agents.',
      isAdjustable: false
    },
    {
      id: 'wht-153-goods-ind',
      sectionCode: '153(1)(a) [Individual/AOP]',
      title: 'Sale of Goods by Individuals / AOPs',
      category: 'goods',
      filerRate: 6.0,
      nonFilerRate: 12.0,
      thresholdAmount: 125000,
      description: 'Withholding on supply of goods by non-corporate suppliers.',
      isAdjustable: false
    },
    {
      id: 'wht-153-services-corp',
      sectionCode: '153(1)(b) [Company]',
      title: 'Rendering of Services to Companies',
      category: 'services',
      filerRate: 9.0,
      nonFilerRate: 18.0,
      thresholdAmount: 60000,
      description: 'Withholding on professional, consultancy, and technical services rendered to corporate clients.',
      isAdjustable: false
    },
    {
      id: 'wht-153-services-ind',
      sectionCode: '153(1)(b) [Individual/AOP]',
      title: 'Rendering of Services by Individuals',
      category: 'services',
      filerRate: 11.0,
      nonFilerRate: 22.0,
      thresholdAmount: 60000,
      description: 'Withholding on contractual and professional services provided by individuals and firms.',
      isAdjustable: false
    },
    {
      id: 'wht-153-contracts',
      sectionCode: '153(1)(c)',
      title: 'Execution of Construction & Supply Contracts',
      category: 'contracts',
      filerRate: 8.0,
      nonFilerRate: 16.0,
      thresholdAmount: 100000,
      description: 'Execution of a contract or sub-contract including civil works and installations.',
      isAdjustable: false
    },
    {
      id: 'wht-236c-property-seller',
      sectionCode: '236C',
      title: 'Advance Tax on Sale/Transfer of Immovable Property',
      category: 'property',
      filerRate: 3.0,
      nonFilerRate: 10.5,
      lateFilerRate: 6.0,
      thresholdAmount: 0,
      description: 'Adjustable advance tax collected from property sellers by transferring authorities (Sub-Registrar/Societies).',
      isAdjustable: true
    },
    {
      id: 'wht-236k-property-buyer',
      sectionCode: '236K',
      title: 'Advance Tax on Purchase/Allotment of Immovable Property',
      category: 'property',
      filerRate: 3.0,
      nonFilerRate: 12.0,
      lateFilerRate: 7.0,
      thresholdAmount: 0,
      description: 'Adjustable advance tax collected from property purchasers on fair market value under Section 68.',
      isAdjustable: true
    },
    {
      id: 'wht-151-profit-on-debt',
      sectionCode: '151',
      title: 'Profit on Bank Debt & Fixed Deposits',
      category: 'banking',
      filerRate: 15.0,
      nonFilerRate: 30.0,
      thresholdAmount: 0,
      description: 'Withholding on savings accounts, National Savings Certificates, and bank profits.',
      isAdjustable: false
    },
    {
      id: 'wht-150-dividends',
      sectionCode: '150',
      title: 'Dividend Income from Public & Private Companies',
      category: 'dividends',
      filerRate: 15.0,
      nonFilerRate: 30.0,
      thresholdAmount: 0,
      description: 'Withholding tax deducted on distribution of dividends by companies (Independent Power Producers @ 7.5%).',
      isAdjustable: false
    }
  ]
};

/**
 * Retrieve active dynamic tax configuration from secure local storage
 */
export function getDynamicTaxConfig(): DynamicTaxConfigSchema {
  try {
    const saved = getSecureItem<DynamicTaxConfigSchema>(DYNAMIC_TAX_CONFIG_KEY, STATUTORY_DEFAULT_TAX_CONFIG);
    if (saved && saved.incomeTax && Array.isArray(saved.incomeTax.salariedSlabs)) {
      return saved;
    }
  } catch (err) {
    console.error('Failed to parse dynamic tax config, reverting to statutory default:', err);
  }
  return STATUTORY_DEFAULT_TAX_CONFIG;
}

/**
 * Save custom or updated tax configuration schema to secure local storage
 */
export function saveDynamicTaxConfig(config: DynamicTaxConfigSchema): void {
  try {
    const updated = {
      ...config,
      lastUpdated: new Date().toISOString().slice(0, 10),
      isCustomOverrideActive: true
    };
    setSecureItem(DYNAMIC_TAX_CONFIG_KEY, updated);
  } catch (err) {
    console.error('Failed to save dynamic tax config:', err);
  }
}

/**
 * Reset tax configuration back to official Finance Act 2026 defaults
 */
export function resetDynamicTaxConfig(): DynamicTaxConfigSchema {
  setSecureItem(DYNAMIC_TAX_CONFIG_KEY, STATUTORY_DEFAULT_TAX_CONFIG);
  return STATUTORY_DEFAULT_TAX_CONFIG;
}

/**
 * Core Deterministic Calculation Engine Using Dynamic Config
 */
export interface DynamicIncomeTaxResult {
  taxableIncome: number;
  category: 'salaried' | 'business' | 'aop' | 'company';
  slabIndex: number;
  slabDescription: string;
  legalProvisionRef: string;
  fixedTax: number;
  ratePercentage: number;
  excessAmount: number;
  basicTaxLiability: number;
  surchargeAmount: number;
  totalIncomeTax: number;
  monthlyTaxDeduction: number;
  effectiveRate: number;
}

export function calculateDynamicIncomeTax(
  taxableIncome: number,
  category: 'salaried' | 'business' | 'aop' | 'company' = 'salaried',
  config: DynamicTaxConfigSchema = getDynamicTaxConfig()
): DynamicIncomeTaxResult {
  const safeIncome = Math.max(0, taxableIncome);

  if (category === 'company') {
    const rate = config.incomeTax.corporateStandardRate;
    const tax = Math.round(safeIncome * (rate / 100));
    return {
      taxableIncome: safeIncome,
      category: 'company',
      slabIndex: 1,
      slabDescription: `Corporate Standard Rate (${rate}%)`,
      legalProvisionRef: 'First Schedule, Part I, Division II (Companies)',
      fixedTax: 0,
      ratePercentage: rate,
      excessAmount: safeIncome,
      basicTaxLiability: tax,
      surchargeAmount: 0,
      totalIncomeTax: tax,
      monthlyTaxDeduction: Math.round(tax / 12),
      effectiveRate: safeIncome > 0 ? Number(((tax / safeIncome) * 100).toFixed(2)) : 0
    };
  }

  const slabList: DynamicTaxSlab[] =
    category === 'salaried'
      ? config.incomeTax.salariedSlabs
      : category === 'aop'
      ? config.incomeTax.aopSlabs
      : config.incomeTax.nonSalariedSlabs;

  let matchedSlab: DynamicTaxSlab = slabList[0];
  let fixedTax = 0;
  let ratePercentage = 0;
  let excessAmount = 0;
  let basicTax = 0;

  for (let i = 0; i < slabList.length; i++) {
    const slab = slabList[i];
    if (safeIncome > slab.minIncome && (safeIncome <= slab.maxIncome || i === slabList.length - 1)) {
      matchedSlab = slab;
      fixedTax = slab.fixedTax;
      ratePercentage = slab.ratePercentage;
      excessAmount = Math.max(0, safeIncome - slab.minIncome);
      basicTax = fixedTax + (excessAmount * (ratePercentage / 100));
      break;
    }
  }

  // Finance Act 2026: 10% Surcharge on High Earners Exceeding PKR 10,000,000
  let surcharge = 0;
  if (safeIncome > 10000000 && basicTax > 0) {
    surcharge = Math.round(basicTax * 0.10);
  }

  const roundedBasicTax = Math.round(basicTax);
  const totalTax = roundedBasicTax + surcharge;
  const monthlyDeduction = Math.round(totalTax / 12);
  const effectiveRate = safeIncome > 0 ? Number(((totalTax / safeIncome) * 100).toFixed(2)) : 0;

  return {
    taxableIncome: safeIncome,
    category,
    slabIndex: matchedSlab.slabIndex,
    slabDescription: matchedSlab.slabDescription,
    legalProvisionRef: matchedSlab.legalProvisionRef,
    fixedTax,
    ratePercentage,
    excessAmount: Math.round(excessAmount),
    basicTaxLiability: roundedBasicTax,
    surchargeAmount: surcharge,
    totalIncomeTax: totalTax,
    monthlyTaxDeduction: monthlyDeduction,
    effectiveRate
  };
}

/**
 * Calculate Dynamic Super Tax under Section 4C
 */
export function calculateDynamicSuperTax(
  income: number,
  isSpecialSector: boolean = false,
  config: DynamicTaxConfigSchema = getDynamicTaxConfig()
): {
  income: number;
  applicableRate: number;
  superTaxAmount: number;
  legalClause: string;
} {
  const safeIncome = Math.max(0, income);
  const slabs = config.incomeTax.superTaxSlabs;

  let rate = 0;
  let legalClause = 'Income below Section 4C Threshold of PKR 150 Million (0% Super Tax)';

  for (let i = 0; i < slabs.length; i++) {
    const s = slabs[i];
    if (safeIncome > s.minIncome && safeIncome <= s.maxIncome) {
      rate = isSpecialSector && s.specifiedSectorsRatePercentage !== undefined 
        ? s.specifiedSectorsRatePercentage 
        : s.ratePercentage;
      legalClause = s.legalClause;
      break;
    }
  }

  const amount = Math.round(safeIncome * (rate / 100));

  return {
    income: safeIncome,
    applicableRate: rate,
    superTaxAmount: amount,
    legalClause
  };
}

/**
 * Calculate Dynamic Section 7E Immovable Property Deemed Rent Tax
 */
export function calculateDynamic7ETax(
  fairMarketValue: number,
  isFirstPropertyExempt: boolean = true,
  isFiler: boolean = true,
  config: DynamicTaxConfigSchema = getDynamicTaxConfig()
): {
  fairMarketValue: number;
  exemptValue: number;
  taxableValue: number;
  deemedRent: number;
  taxAmount: number;
  effectivePercentageOfFMV: number;
  statusNotes: string;
} {
  const cfg = config.section7E;
  const exemptValue = isFirstPropertyExempt ? cfg.exemptionThresholdFairMarketValue : 0;
  const taxableValue = Math.max(0, fairMarketValue - exemptValue);

  if (taxableValue <= 0) {
    return {
      fairMarketValue,
      exemptValue: Math.min(fairMarketValue, exemptValue),
      taxableValue: 0,
      deemedRent: 0,
      taxAmount: 0,
      effectivePercentageOfFMV: 0,
      statusNotes: `Exempt under Section 7E (Within self-owned threshold of PKR ${(cfg.exemptionThresholdFairMarketValue / 1000000).toFixed(0)}M)`
    };
  }

  const deemedRent = Math.round(taxableValue * (cfg.deemedRentRatePercentage / 100));
  const multiplier = !isFiler ? 2 : 1; // Non-filers pay double rate or penalty
  const taxAmount = Math.round(deemedRent * (cfg.taxRateOnDeemedRent / 100) * multiplier);
  const effectivePct = Number(((taxAmount / fairMarketValue) * 100).toFixed(2));

  return {
    fairMarketValue,
    exemptValue,
    taxableValue,
    deemedRent,
    taxAmount,
    effectivePercentageOfFMV: effectivePct,
    statusNotes: isFiler 
      ? `Taxable @ 20% on 5% Deemed Rental Income (Effective 1.0% on excess value)` 
      : `Non-Filer Penalty Rate Applied`
  };
}

/**
 * Calculate Dynamic Sales Tax
 */
export function calculateDynamicSalesTax(
  amount: number,
  jurisdiction: 'FBR' | 'PRA' | 'SRB' | 'KPRA' | 'BRA' = 'FBR',
  config: DynamicTaxConfigSchema = getDynamicTaxConfig()
): {
  baseAmount: number;
  jurisdiction: string;
  standardRate: number;
  salesTaxAmount: number;
  totalWithTax: number;
  withholdingAmount: number;
  legalActRef: string;
} {
  const safeAmount = Math.max(0, amount);
  const rateConfig = config.salesTax.find(r => r.jurisdiction === jurisdiction) || config.salesTax[0];
  
  const taxAmount = Math.round(safeAmount * (rateConfig.standardRate / 100));
  const withholdingAmount = Math.round(safeAmount * (rateConfig.withholdingRateStandard / 100));

  return {
    baseAmount: safeAmount,
    jurisdiction: rateConfig.jurisdictionName,
    standardRate: rateConfig.standardRate,
    salesTaxAmount: taxAmount,
    totalWithTax: safeAmount + taxAmount,
    withholdingAmount: withholdingAmount,
    legalActRef: rateConfig.legalActRef
  };
}

/**
 * JSON Import / Export & Schema Validation
 */
export function exportTaxConfigJSON(config: DynamicTaxConfigSchema = getDynamicTaxConfig()): string {
  return JSON.stringify(config, null, 2);
}

export function importTaxConfigJSON(jsonString: string): { success: boolean; message: string; config?: DynamicTaxConfigSchema } {
  try {
    const parsed = JSON.parse(jsonString) as DynamicTaxConfigSchema;
    if (!parsed || !parsed.incomeTax || !Array.isArray(parsed.incomeTax.salariedSlabs)) {
      return { success: false, message: 'Invalid JSON schema: Missing required incomeTax salariedSlabs definitions.' };
    }
    saveDynamicTaxConfig(parsed);
    return {
      success: true,
      message: `Tax Schema "${parsed.financeActName}" (v${parsed.version}) imported and activated successfully.`,
      config: parsed
    };
  } catch (err) {
    return { success: false, message: `Failed to parse tax config JSON: ${(err as Error).message}` };
  }
}
