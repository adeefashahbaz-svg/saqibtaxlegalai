// Super Tax Engine under Section 4C of the Income Tax Ordinance, 2001
// Read with Division IIB of Part I of the First Schedule

export type SuperTaxEntityType = 'individual' | 'aop' | 'company' | 'banking_company' | 'specified_industry';

export type SpecifiedIndustryType = 
  | 'none'
  | 'banking'
  | 'airlines'
  | 'automobiles'
  | 'beverages'
  | 'cement'
  | 'chemicals'
  | 'cigarettes_tobacco'
  | 'fertilizer'
  | 'iron_steel'
  | 'lng_terminal'
  | 'oil_gas_exploration'
  | 'sugar'
  | 'textile';

export interface SuperTaxBand {
  min: number;
  max: number | null;
  rateGeneral: number; // Percentage
  rateSpecified: number; // Percentage for high margin/specified industries
  description: string;
}

export const SUPER_TAX_BANDS: SuperTaxBand[] = [
  {
    min: 0,
    max: 150000000,
    rateGeneral: 0,
    rateSpecified: 0,
    description: 'Income up to PKR 150 Million: Exempt from Super Tax (0%)'
  },
  {
    min: 150000001,
    max: 200000000,
    rateGeneral: 1,
    rateSpecified: 1,
    description: 'Income between PKR 150M and PKR 200M: 1% Super Tax'
  },
  {
    min: 200000001,
    max: 250000000,
    rateGeneral: 2,
    rateSpecified: 2,
    description: 'Income between PKR 200M and PKR 250M: 2% Super Tax'
  },
  {
    min: 250000001,
    max: 300000000,
    rateGeneral: 3,
    rateSpecified: 3,
    description: 'Income between PKR 250M and PKR 300M: 3% Super Tax'
  },
  {
    min: 300000001,
    max: 350000000,
    rateGeneral: 4,
    rateSpecified: 10,
    description: 'Income between PKR 300M and PKR 350M: 4% (General) / 10% (Specified Sectors)'
  },
  {
    min: 350000001,
    max: 400000000,
    rateGeneral: 6,
    rateSpecified: 10,
    description: 'Income between PKR 350M and PKR 400M: 6% (General) / 10% (Specified Sectors)'
  },
  {
    min: 400000001,
    max: 500000000,
    rateGeneral: 8,
    rateSpecified: 10,
    description: 'Income between PKR 400M and PKR 500M: 8% (General) / 10% (Specified Sectors)'
  },
  {
    min: 500000001,
    max: null,
    rateGeneral: 10,
    rateSpecified: 10,
    description: 'Income exceeding PKR 500 Million: Flat 10% Super Tax'
  }
];

export interface SuperTaxCalculationInput {
  taxYear: string; // '2024', '2025', '2026'
  highNetIncome: number;
  entityType: SuperTaxEntityType;
  specifiedIndustry: SpecifiedIndustryType;
  includeWWF: boolean; // Workers Welfare Fund 2%
  includeWPPF: boolean; // Workers Profit Participation Fund 5%
  isSmallCompany: boolean; // Small company rate 20% vs 29%
}

export interface SuperTaxCalculationOutput {
  taxYear: string;
  highNetIncome: number;
  entityType: SuperTaxEntityType;
  isExempt: boolean;
  thresholdAmount: number;
  superTaxRate: number;
  superTaxAmount: number;
  applicableBandDescription: string;
  
  // Normal Corporate / Income Tax
  normalTaxRate: number;
  normalTaxAmount: number;
  
  // Levies
  wwfAmount: number;
  wppfAmount: number;
  
  // Aggregated Totals
  totalTaxBurden: number;
  effectiveTaxRateCombined: number;
  effectiveSuperTaxRate: number;
  
  // Statutory Notes & Legal Authority
  statutoryCitations: string[];
  complianceDeadlines: string[];
  legalNotes: string;
}

export function calculateSuperTax(input: SuperTaxCalculationInput): SuperTaxCalculationOutput {
  const { highNetIncome, entityType, specifiedIndustry, includeWWF, includeWPPF, isSmallCompany, taxYear } = input;
  
  const thresholdAmount = 150000000;
  const isExempt = highNetIncome <= thresholdAmount;
  
  const isSpecified = specifiedIndustry !== 'none' || entityType === 'banking_company' || entityType === 'specified_industry';
  
  let superTaxRate = 0;
  let bandDesc = 'Income does not exceed Rs. 150 Million statutory threshold (Section 4C(1)). Super Tax is NIL.';
  
  if (!isExempt) {
    for (const band of SUPER_TAX_BANDS) {
      if (band.max === null) {
        if (highNetIncome > band.min) {
          superTaxRate = isSpecified ? band.rateSpecified : band.rateGeneral;
          bandDesc = band.description;
          break;
        }
      } else {
        if (highNetIncome >= band.min && highNetIncome <= band.max) {
          superTaxRate = isSpecified ? band.rateSpecified : band.rateGeneral;
          bandDesc = band.description;
          break;
        }
      }
    }
  }
  
  const superTaxAmount = isExempt ? 0 : Math.round((highNetIncome * superTaxRate) / 100);
  
  // Determine Normal Tax Rate
  let normalTaxRate = 29; // Standard corporate 29%
  if (entityType === 'banking_company') {
    normalTaxRate = 39; // Banking company rate
  } else if (entityType === 'company' && isSmallCompany) {
    normalTaxRate = 20; // Small company rate
  } else if (entityType === 'individual' || entityType === 'aop') {
    normalTaxRate = 35; // Maximum business slab rate
  }
  
  const normalTaxAmount = Math.round((highNetIncome * normalTaxRate) / 100);
  
  // Levies
  const wwfAmount = includeWWF ? Math.round((highNetIncome * 2) / 100) : 0;
  const wppfAmount = includeWPPF ? Math.round((highNetIncome * 5) / 100) : 0;
  
  const totalTaxBurden = superTaxAmount + normalTaxAmount + wwfAmount + wppfAmount;
  const effectiveTaxRateCombined = highNetIncome > 0 ? Number(((totalTaxBurden / highNetIncome) * 100).toFixed(2)) : 0;
  const effectiveSuperTaxRate = superTaxRate;
  
  const citations = [
    'Section 4C of the Income Tax Ordinance, 2001 (Super Tax on High-Earning Persons)',
    'Division IIB, Part I of the First Schedule to the Income Tax Ordinance, 2001',
    'Finance Act 2022, 2023, 2024 & 2025 amendments',
    'Workers Welfare Fund Ordinance, 1971 (Section 4)',
    'Companies Profits (Workers Participation) Act, 1968'
  ];
  
  const complianceDeadlines = [
    'Quarterly advance payment under Section 147 along with normal advance tax installments (25th Sept, 25th Dec, 25th Mar, 15th Jun)',
    'Annual reconciliation and deposit with Return of Income (Form 114) by 31st December for corporate tax year',
    'Electronic PSID payment head: "Super Tax under Section 4C"'
  ];
  
  const legalNotes = isSpecified
    ? 'Classified as Specified High-Margin / Banking Sector under First Proviso to Division IIB: A 10% flat Super Tax rate applies once taxable income surpasses PKR 300 Million.'
    : 'Standard progressive Super Tax scale applied under Division IIB: Slabs range smoothly from 1% (Rs. 150M-200M) up to 10% (exceeding Rs. 500M).';

  return {
    taxYear,
    highNetIncome,
    entityType,
    isExempt,
    thresholdAmount,
    superTaxRate,
    superTaxAmount,
    applicableBandDescription: bandDesc,
    normalTaxRate,
    normalTaxAmount,
    wwfAmount,
    wppfAmount,
    totalTaxBurden,
    effectiveTaxRateCombined,
    effectiveSuperTaxRate,
    statutoryCitations: citations,
    complianceDeadlines,
    legalNotes
  };
}
