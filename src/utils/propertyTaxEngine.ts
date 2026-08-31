import {
  PropertyType,
  TaxpayerATLStatus,
  PropertyTaxCalculationResult
} from '../types';

export interface PropertyTaxInputParams {
  propertyValuation: number; // PKR
  propertyType: PropertyType;
  holdingPeriodYears: number;
  buyerStatus: TaxpayerATLStatus;
  sellerStatus: TaxpayerATLStatus;
  estimatedCapitalGainProfit?: number;
  isSelfOwnedPrimaryResidence?: boolean;
  isAgriculturalLand?: boolean;
  hasActiveCourtStayOrLitigation?: boolean;
  isFirstYearConstruction?: boolean;
}

export interface PropertyTypeMeta {
  id: PropertyType;
  label: string;
  description: string;
  cgtHoldingTable: { years: number; rateFiler: number; rateNonFiler: number }[];
}

export const PROPERTY_TYPES_CONFIG: Record<PropertyType, PropertyTypeMeta> = {
  open_plot: {
    id: 'open_plot',
    label: 'Open Plot / Unconstructed Land',
    description: 'Vacant plot of land, commercial/residential allotment or files.',
    cgtHoldingTable: [
      { years: 1, rateFiler: 15, rateNonFiler: 30 },
      { years: 2, rateFiler: 12.5, rateNonFiler: 25 },
      { years: 3, rateFiler: 10, rateNonFiler: 20 },
      { years: 4, rateFiler: 7.5, rateNonFiler: 15 },
      { years: 5, rateFiler: 5, rateNonFiler: 10 },
      { years: 6, rateFiler: 2.5, rateNonFiler: 5 },
      { years: 99, rateFiler: 0, rateNonFiler: 0 }
    ]
  },
  constructed_residential: {
    id: 'constructed_residential',
    label: 'Constructed Residential House / Villa',
    description: 'Built residential house, duplex, bungalow or residential unit.',
    cgtHoldingTable: [
      { years: 1, rateFiler: 15, rateNonFiler: 30 },
      { years: 2, rateFiler: 10, rateNonFiler: 20 },
      { years: 3, rateFiler: 7.5, rateNonFiler: 15 },
      { years: 4, rateFiler: 5, rateNonFiler: 10 },
      { years: 99, rateFiler: 0, rateNonFiler: 0 }
    ]
  },
  constructed_commercial: {
    id: 'constructed_commercial',
    label: 'Constructed Commercial Building / Flat / Plaza',
    description: 'Retail shop, office unit, multi-story commercial building or flat.',
    cgtHoldingTable: [
      { years: 1, rateFiler: 15, rateNonFiler: 30 },
      { years: 2, rateFiler: 10, rateNonFiler: 20 },
      { years: 3, rateFiler: 7.5, rateNonFiler: 15 },
      { years: 4, rateFiler: 5, rateNonFiler: 10 },
      { years: 99, rateFiler: 0, rateNonFiler: 0 }
    ]
  },
  agricultural_land: {
    id: 'agricultural_land',
    label: 'Agricultural Land (Rural/Farming)',
    description: 'Cultivable farm land, orchards, and rural agricultural parcels.',
    cgtHoldingTable: [
      { years: 1, rateFiler: 5, rateNonFiler: 10 },
      { years: 2, rateFiler: 2.5, rateNonFiler: 5 },
      { years: 99, rateFiler: 0, rateNonFiler: 0 }
    ]
  }
};

/**
 * Section 236K: Advance Tax on Purchase of Immovable Property
 */
export function calculateSection236K(
  valuation: number,
  buyerStatus: TaxpayerATLStatus
): { rate: number; amount: number; description: string } {
  let rate = 3;
  let description = 'Section 236K standard 3% for active filers';

  if (buyerStatus === 'active_filer') {
    if (valuation > 100000000) {
      rate = 4;
      description = 'Section 236K: 4% for active filers on property valuation exceeding PKR 100 Million';
    } else if (valuation > 50000000) {
      rate = 3.5;
      description = 'Section 236K: 3.5% for active filers on property valuation PKR 50M - 100M';
    } else {
      rate = 3;
      description = 'Section 236K: Standard 3% for active taxpayers on ATL';
    }
  } else if (buyerStatus === 'late_filer') {
    if (valuation > 100000000) {
      rate = 8;
      description = 'Section 236K (Late Filer / Rule 1 Tenth Sched): 8% rate on > PKR 100M';
    } else if (valuation > 50000000) {
      rate = 7;
      description = 'Section 236K (Late Filer): 7% rate on PKR 50M - 100M';
    } else {
      rate = 6;
      description = 'Section 236K (Late Filer): 6% advance tax on purchase';
    }
  } else {
    // Non-filer penal rates (Tenth Schedule)
    if (valuation > 100000000) {
      rate = 15;
      description = 'Section 236K (Non-Filer Tenth Schedule): 15% punitive withholding on > PKR 100M';
    } else if (valuation > 50000000) {
      rate = 12;
      description = 'Section 236K (Non-Filer): 12% punitive withholding on PKR 50M - 100M';
    } else {
      rate = 10.5;
      description = 'Section 236K (Non-Filer): 10.5% punitive withholding on property purchase';
    }
  }

  const amount = Math.round((valuation * rate) / 100);
  return { rate, amount, description };
}

/**
 * Section 236C: Advance Tax on Sale or Transfer of Immovable Property
 */
export function calculateSection236C(
  valuation: number,
  sellerStatus: TaxpayerATLStatus
): { rate: number; amount: number; description: string } {
  let rate = 3;
  let description = 'Section 236C standard 3% for active filers';

  if (sellerStatus === 'active_filer') {
    if (valuation > 100000000) {
      rate = 4;
      description = 'Section 236C: 4% for active filers on property value exceeding PKR 100M';
    } else if (valuation > 50000000) {
      rate = 3.5;
      description = 'Section 236C: 3.5% for active filers on property value PKR 50M - 100M';
    } else {
      rate = 3;
      description = 'Section 236C: Standard 3% for active taxpayers on ATL';
    }
  } else if (sellerStatus === 'late_filer') {
    if (valuation > 100000000) {
      rate = 8;
      description = 'Section 236C (Late Filer): 8% advance tax on sale > PKR 100M';
    } else if (valuation > 50000000) {
      rate = 7;
      description = 'Section 236C (Late Filer): 7% advance tax on sale PKR 50M - 100M';
    } else {
      rate = 6;
      description = 'Section 236C (Late Filer): 6% advance tax on sale';
    }
  } else {
    // Non-filer penal rates
    if (valuation > 100000000) {
      rate = 12;
      description = 'Section 236C (Non-Filer): 12% punitive withholding on sale > PKR 100M';
    } else if (valuation > 50000000) {
      rate = 10.5;
      description = 'Section 236C (Non-Filer): 10.5% punitive withholding on sale PKR 50M - 100M';
    } else {
      rate = 10;
      description = 'Section 236C (Non-Filer): 10% punitive withholding on transfer of property';
    }
  }

  const amount = Math.round((valuation * rate) / 100);
  return { rate, amount, description };
}

/**
 * Section 37 / 37(1A): Capital Gains Tax on Immovable Property
 */
export function calculateCapitalGainsTax(
  propertyType: PropertyType,
  holdingPeriodYears: number,
  sellerStatus: TaxpayerATLStatus,
  estimatedCapitalGainProfit: number
): { rate: number; amount: number; description: string } {
  const safeProfit = Math.max(0, estimatedCapitalGainProfit || 0);
  const typeConfig = PROPERTY_TYPES_CONFIG[propertyType];
  const table = typeConfig.cgtHoldingTable;

  let applicableRate = 0;
  for (const row of table) {
    if (holdingPeriodYears <= row.years) {
      applicableRate = sellerStatus === 'non_filer' ? row.rateNonFiler : row.rateFiler;
      break;
    }
  }

  const amount = Math.round((safeProfit * applicableRate) / 100);
  const description = applicableRate === 0
    ? `Section 37(1A): 0% CGT exempt due to holding period (${holdingPeriodYears} years exceeding statutory threshold).`
    : `Section 37(1A): ${applicableRate}% CGT applied on realized capital gain of PKR ${safeProfit.toLocaleString()} (${holdingPeriodYears} year holding).`;

  return { rate: applicableRate, amount, description };
}

/**
 * Section 7E: Tax on Deemed Income from Immovable Property
 * Deemed Income = 5% of Fair Market Value
 * Tax Rate = 20% of Deemed Income (= 1% of FMV)
 */
export function calculateSection7E(
  valuation: number,
  propertyType: PropertyType,
  params: {
    isSelfOwnedPrimaryResidence?: boolean;
    isAgriculturalLand?: boolean;
    hasActiveCourtStayOrLitigation?: boolean;
    isFirstYearConstruction?: boolean;
  }
): {
  isExempt: boolean;
  exemptionReason?: string;
  deemedRentalIncome: number;
  rate: number;
  amount: number;
} {
  // Check statutory exemptions under Section 7E(2)
  if (params.isSelfOwnedPrimaryResidence) {
    return {
      isExempt: true,
      exemptionReason: 'Section 7E(2)(a): One self-owned residential property is completely exempt.',
      deemedRentalIncome: 0,
      rate: 0,
      amount: 0
    };
  }

  if (params.isAgriculturalLand || propertyType === 'agricultural_land') {
    return {
      isExempt: true,
      exemptionReason: 'Section 7E(2)(c): Self-cultivated agricultural land is statutory exempt.',
      deemedRentalIncome: 0,
      rate: 0,
      amount: 0
    };
  }

  if (valuation < 25000000) {
    return {
      isExempt: true,
      exemptionReason: 'Section 7E(2)(d): Immovable property having fair market value below PKR 25 Million is exempt.',
      deemedRentalIncome: 0,
      rate: 0,
      amount: 0
    };
  }

  if (params.hasActiveCourtStayOrLitigation) {
    return {
      isExempt: true,
      exemptionReason: 'Section 7E(2)(f): Property subject to court stay order or active litigation where transfer is barred.',
      deemedRentalIncome: 0,
      rate: 0,
      amount: 0
    };
  }

  if (params.isFirstYearConstruction) {
    return {
      isExempt: true,
      exemptionReason: 'Section 7E(2)(e): Land under active construction certified by local development authority during first tax year.',
      deemedRentalIncome: 0,
      rate: 0,
      amount: 0
    };
  }

  // Active Section 7E Tax calculation
  const deemedRentalIncome = Math.round(valuation * 0.05); // 5% of FMV
  const taxAmount = Math.round(deemedRentalIncome * 0.20); // 20% of Deemed Income = 1% of FMV

  return {
    isExempt: false,
    deemedRentalIncome,
    rate: 20, // 20% on deemed income
    amount: taxAmount
  };
}

/**
 * Master Real Estate Property Tax Computation
 */
export function calculatePropertyTax(params: PropertyTaxInputParams): PropertyTaxCalculationResult {
  const safeValuation = Math.max(0, params.propertyValuation || 0);
  const safeHolding = Math.max(0, params.holdingPeriodYears || 0);

  // 1. Advance Tax on Purchase (Sec 236K)
  const sec236k = calculateSection236K(safeValuation, params.buyerStatus);

  // 2. Advance Tax on Sale (Sec 236C)
  const sec236c = calculateSection236C(safeValuation, params.sellerStatus);

  // 3. Capital Gains Tax (Sec 37/37A)
  // Default estimated gain to 25% of property value if not explicitly given
  const gain = params.estimatedCapitalGainProfit ?? Math.round(safeValuation * 0.25);
  const cgt = calculateCapitalGainsTax(params.propertyType, safeHolding, params.sellerStatus, gain);

  // 4. Section 7E Deemed Income Tax
  const sec7e = calculateSection7E(safeValuation, params.propertyType, {
    isSelfOwnedPrimaryResidence: params.isSelfOwnedPrimaryResidence,
    isAgriculturalLand: params.isAgriculturalLand,
    hasActiveCourtStayOrLitigation: params.hasActiveCourtStayOrLitigation,
    isFirstYearConstruction: params.isFirstYearConstruction
  });

  const totalBuyer = sec236k.amount;
  const totalSeller = sec236c.amount + cgt.amount;

  const citations: string[] = [
    'Section 236K Income Tax Ordinance, 2001 (Advance Tax on Purchase of Immovable Property)',
    'Section 236C Income Tax Ordinance, 2001 (Advance Tax on Sale or Transfer of Immovable Property)',
    'Section 37(1A) Income Tax Ordinance, 2001 (Capital Gains on Disposal of Immovable Property)',
    'Section 7E Income Tax Ordinance, 2001 (Tax on Deemed Income from Immovable Property)',
    'Tenth Schedule to ITO 2001 (Enhanced Rules for Persons not appearing on Active Taxpayers List)'
  ];

  return {
    propertyValuation: safeValuation,
    propertyType: params.propertyType,
    holdingPeriodYears: safeHolding,
    buyerStatus: params.buyerStatus,
    sellerStatus: params.sellerStatus,
    
    sec236kRate: sec236k.rate,
    sec236kAmount: sec236k.amount,
    sec236kRuleDescription: sec236k.description,

    sec236cRate: sec236c.rate,
    sec236cAmount: sec236c.amount,
    sec236cRuleDescription: sec236c.description,

    capitalGainEstimatedProfit: gain,
    cgtRate: cgt.rate,
    cgtAmount: cgt.amount,
    cgtHoldingRuleDescription: cgt.description,

    is7EExempt: sec7e.isExempt,
    exemptionReason7E: sec7e.exemptionReason,
    deemedRentalIncome: sec7e.deemedRentalIncome,
    sec7eTaxRate: sec7e.rate,
    sec7eTaxAmount: sec7e.amount,

    totalBuyerTaxPayable: totalBuyer,
    totalSellerTaxPayable: totalSeller,
    statutoryCitations: citations
  };
}
