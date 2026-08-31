import { TaxCalculationResult, SalesTaxItem, ATLRateItem, TaxAllowances } from '../types';

export interface TaxSlab {
  min: number;
  max: number;
  fixedTax: number;
  rate: number; // Percentage e.g. 5 for 5%, 15 for 15%
  slabLabel: string;
}

/**
 * FBR Salaried Slabs (Tax Year 2025-2026 / First Schedule Part I Div I)
 * 1. Up to 600,000 PKR: 0%
 * 2. Exceeding 600,000 to 1,200,000 PKR: 5% of amount exceeding 600,000 PKR
 * 3. Exceeding 1,200,000 to 2,200,000 PKR: 30,000 PKR + 15% of amount exceeding 1,200,000 PKR
 * 4. Exceeding 2,200,000 to 3,200,000 PKR: 180,000 PKR + 25% of amount exceeding 2,200,000 PKR
 * 5. Exceeding 3,200,000 to 4,100,000 PKR: 430,000 PKR + 30% of amount exceeding 3,200,000 PKR
 * 6. Above 4,100,000 PKR: 700,000 PKR + 35% of amount exceeding 4,100,000 PKR
 */
export const SALARIED_SLABS_2026: TaxSlab[] = [
  { min: 0, max: 600000, fixedTax: 0, rate: 0, slabLabel: "Up to PKR 600,000 (0% Tax)" },
  { min: 600000, max: 1200000, fixedTax: 0, rate: 5, slabLabel: "PKR 600,001 to 1,200,000 (5% on excess over PKR 600,000)" },
  { min: 1200000, max: 2200000, fixedTax: 30000, rate: 15, slabLabel: "PKR 1,200,001 to 2,200,000 (PKR 30,000 + 15% on excess over PKR 1,200,000)" },
  { min: 2200000, max: 3200000, fixedTax: 180000, rate: 25, slabLabel: "PKR 2,200,001 to 3,200,000 (PKR 180,000 + 25% on excess over PKR 2,200,000)" },
  { min: 3200000, max: 4100000, fixedTax: 430000, rate: 30, slabLabel: "PKR 3,200,001 to 4,100,000 (PKR 430,000 + 30% on excess over PKR 3,200,000)" },
  { min: 4100000, max: Infinity, fixedTax: 700000, rate: 35, slabLabel: "Above PKR 4,100,000 (PKR 700,000 + 35% on excess over PKR 4,100,000)" },
];

/**
 * FBR Non-Salaried / Business Slabs (Tax Year 2025-2026 / First Schedule Part I Div I)
 * 1. Up to 600,000 PKR: 0%
 * 2. Exceeding 600,000 to 1,200,000 PKR: 15% of amount exceeding 600,000 PKR
 * 3. Exceeding 1,200,000 to 1,600,000 PKR: 90,000 PKR + 20% of amount exceeding 1,200,000 PKR
 * 4. Exceeding 1,600,000 to 3,200,000 PKR: 170,000 PKR + 30% of amount exceeding 1,600,000 PKR
 * 5. Exceeding 3,200,000 to 5,600,000 PKR: 650,000 PKR + 40% of amount exceeding 3,200,000 PKR
 * 6. Above 5,600,000 PKR: 1,610,000 PKR + 45% of amount exceeding 5,600,000 PKR
 */
export const NON_SALARIED_SLABS_2026: TaxSlab[] = [
  { min: 0, max: 600000, fixedTax: 0, rate: 0, slabLabel: "Up to PKR 600,000 (0% Tax)" },
  { min: 600000, max: 1200000, fixedTax: 0, rate: 15, slabLabel: "PKR 600,001 to 1,200,000 (15% on excess over PKR 600,000)" },
  { min: 1200000, max: 1600000, fixedTax: 90000, rate: 20, slabLabel: "PKR 1,200,001 to 1,600,000 (PKR 90,000 + 20% on excess over PKR 1,200,000)" },
  { min: 1600000, max: 3200000, fixedTax: 170000, rate: 30, slabLabel: "PKR 1,600,001 to 3,200,000 (PKR 170,000 + 30% on excess over PKR 1,600,000)" },
  { min: 3200000, max: 5600000, fixedTax: 650000, rate: 40, slabLabel: "PKR 3,200,001 to 5,600,000 (PKR 650,000 + 40% on excess over PKR 3,200,000)" },
  { min: 5600000, max: Infinity, fixedTax: 1610000, rate: 45, slabLabel: "Above PKR 5,600,000 (PKR 1,610,000 + 45% on excess over PKR 5,600,000)" },
];

/**
 * FBR Salaried Slabs for Pakistan Tax Year 2026-2027 (Finance Act 2026 / First Schedule Part I)
 * - Up to Rs. 600,000: 0%
 * - Exceeding 600,000 to 1,200,000: 1% of amount exceeding 600,000
 * - Exceeding 1,200,000 to 2,200,000: Rs. 6,000 + 11% of amount exceeding 1,200,000
 * - Exceeding 2,200,000 to 3,200,000: Rs. 116,000 + 20% of amount exceeding 2,200,000
 * - Exceeding 3,200,000 to 4,100,000: Rs. 316,000 + 25% of amount exceeding 3,200,000
 * - Exceeding 4,100,000 to 5,600,000: Rs. 541,000 + 29% of amount exceeding 4,100,000
 * - Exceeding 5,600,000 to 7,000,000: Rs. 976,000 + 32% of amount exceeding 5,600,000
 * - Above Rs. 7,000,000: Rs. 1,424,000 + 35% of amount exceeding 7,000,000
 */
export const SALARIED_SLABS_2027: TaxSlab[] = [
  { min: 0, max: 600000, fixedTax: 0, rate: 0, slabLabel: "Up to PKR 600,000 (0% Tax / Exempt)" },
  { min: 600000, max: 1200000, fixedTax: 0, rate: 1, slabLabel: "PKR 600,001 to 1,200,000 (1% on excess over PKR 600,000)" },
  { min: 1200000, max: 2200000, fixedTax: 6000, rate: 11, slabLabel: "PKR 1,200,001 to 2,200,000 (PKR 6,000 + 11% on excess over PKR 1,200,000)" },
  { min: 2200000, max: 3200000, fixedTax: 116000, rate: 20, slabLabel: "PKR 2,200,001 to 3,200,000 (PKR 116,000 + 20% on excess over PKR 2,200,000)" },
  { min: 3200000, max: 4100000, fixedTax: 316000, rate: 25, slabLabel: "PKR 3,200,001 to 4,100,000 (PKR 316,000 + 25% on excess over PKR 3,200,000)" },
  { min: 4100000, max: 5600000, fixedTax: 541000, rate: 29, slabLabel: "PKR 4,100,001 to 5,600,000 (PKR 541,000 + 29% on excess over PKR 4,100,000)" },
  { min: 5600000, max: 7000000, fixedTax: 976000, rate: 32, slabLabel: "PKR 5,600,001 to 7,000,000 (PKR 976,000 + 32% on excess over PKR 5,600,000)" },
  { min: 7000000, max: Infinity, fixedTax: 1424000, rate: 35, slabLabel: "Above PKR 7,000,000 (PKR 1,424,000 + 35% on excess over PKR 7,000,000)" },
];

/**
 * Deterministic Tax Calculation Function for Salaried Individuals (Tax Year 2026-2027)
 * Formula: Annual Salary = Monthly Gross Salary * 12
 * Outputs: Annual Income Tax (PKR), Monthly Income Tax Deduction (PKR), Net Monthly Take-Home Salary (PKR)
 */
export function calculateSalariedTax2027(monthlyGrossSalary: number) {
  const safeMonthly = Math.max(0, monthlyGrossSalary);
  const annualSalary = safeMonthly * 12;

  let fixedTax = 0;
  let rateOnExcess = 0;
  let excessAmount = 0;
  let slabDescription = "";
  let annualTax = 0;

  for (let i = 0; i < SALARIED_SLABS_2027.length; i++) {
    const slab = SALARIED_SLABS_2027[i];
    if (annualSalary > slab.min && annualSalary <= slab.max) {
      fixedTax = slab.fixedTax;
      rateOnExcess = slab.rate;
      excessAmount = annualSalary - slab.min;
      slabDescription = slab.slabLabel;
      annualTax = fixedTax + (excessAmount * (rateOnExcess / 100));
      break;
    }
  }

  if (annualSalary === 0) {
    slabDescription = "Up to PKR 600,000 (0% Tax / Exempt)";
  }

  const roundedAnnualTax = Math.round(annualTax);
  const monthlyTaxDeduction = Math.round(roundedAnnualTax / 12);
  const netMonthlyTakeHome = Math.round(safeMonthly - monthlyTaxDeduction);
  const netAnnualTakeHome = Math.round(annualSalary - roundedAnnualTax);
  const effectiveTaxRate = annualSalary > 0 ? Number(((roundedAnnualTax / annualSalary) * 100).toFixed(2)) : 0;

  return {
    monthlyGrossSalary: Math.round(safeMonthly),
    annualSalary: Math.round(annualSalary),
    slabDescription,
    fixedTax: Math.round(fixedTax),
    rateOnExcess,
    excessAmount: Math.round(excessAmount),
    annualTax: roundedAnnualTax,
    monthlyTaxDeduction,
    netMonthlyTakeHome,
    netAnnualTakeHome,
    effectiveTaxRate
  };
}

/**
 * Deterministic Mathematical Tax Calculation Function
 * Computes Annual Tax, Monthly Tax Deduction, and Monthly Take-Home with exact rounding.
 * Supports itemized deductible allowances (Sec 60, Sec 60D, Provident Fund) and tax credits (Sec 61, 63).
 */
export function calculatePakistaniTax(
  grossIncome: number,
  type: 'salaried' | 'non_salaried' | 'aop' | 'company',
  deductions: number = 0,
  taxCredits: number = 0,
  allowancesBreakdown?: TaxAllowances
): TaxCalculationResult {
  const safeGross = Math.max(0, grossIncome);
  
  // Calculate total deductible allowances if breakdown provided or use direct deductions
  let totalDeductions = Math.max(0, deductions);
  if (allowancesBreakdown) {
    const computedDeductions = 
      Math.max(0, allowancesBreakdown.educationalExpenses || 0) +
      Math.max(0, allowancesBreakdown.zakatAllowance || 0) +
      Math.max(0, allowancesBreakdown.providentFundContribution || 0) +
      Math.max(0, allowancesBreakdown.homeLoanInterest || 0);
    if (computedDeductions > 0) {
      totalDeductions = computedDeductions;
    }
  }

  let totalTaxCredits = Math.max(0, taxCredits);
  if (allowancesBreakdown) {
    const computedCredits =
      Math.max(0, allowancesBreakdown.charitableDonations || 0) +
      Math.max(0, allowancesBreakdown.pensionFundInvestment || 0);
    if (computedCredits > 0) {
      totalTaxCredits = computedCredits;
    }
  }

  // Deductions are subtracted directly from Gross Income to determine "Taxable Net Income"
  const taxableIncome = Math.max(0, safeGross - totalDeductions);
  const breakdown: string[] = [];

  let fixedTax = 0;
  let rateOnExcess = 0;
  let excessAmount = 0;
  let applicableSlab = "";
  let grossTax = 0;

  if (type === 'company') {
    // Corporate Tax (29% under First Schedule Div II)
    applicableSlab = "Corporate Tax Rate (29% under First Schedule Div II)";
    grossTax = taxableIncome * 0.29;
    breakdown.push(`Corporate Gross Income: PKR ${Math.round(safeGross).toLocaleString()}`);
    if (totalDeductions > 0) {
      breakdown.push(`Allowable Deductions: -PKR ${Math.round(totalDeductions).toLocaleString()}`);
    }
    breakdown.push(`Corporate Taxable Income: PKR ${Math.round(taxableIncome).toLocaleString()}`);
    breakdown.push(`Standard Corporate Tax Rate: 29%`);
    breakdown.push(`Base Corporate Tax Computed: PKR ${Math.round(grossTax).toLocaleString()}`);
    if (taxableIncome >= 150000000) {
      const superTaxRate = taxableIncome >= 500000000 ? 0.10 : taxableIncome >= 300000000 ? 0.06 : 0.04;
      const superTax = taxableIncome * superTaxRate;
      grossTax += superTax;
      breakdown.push(`Super Tax (Section 4C) @ ${(superTaxRate * 100).toFixed(0)}%: PKR ${Math.round(superTax).toLocaleString()}`);
    }
  } else {
    const isSalaried = type === 'salaried';
    const slabs = isSalaried ? SALARIED_SLABS_2026 : NON_SALARIED_SLABS_2026;

    for (let i = 0; i < slabs.length; i++) {
      const slab = slabs[i];
      if (taxableIncome > slab.min && taxableIncome <= slab.max) {
        fixedTax = slab.fixedTax;
        rateOnExcess = slab.rate;
        excessAmount = taxableIncome - slab.min;
        applicableSlab = slab.slabLabel;
        grossTax = fixedTax + (excessAmount * (rateOnExcess / 100));

        breakdown.push(`Gross Income: PKR ${Math.round(safeGross).toLocaleString()}`);
        if (totalDeductions > 0) {
          breakdown.push(`Deductible Allowances (Sec 60, 60D, PF): -PKR ${Math.round(totalDeductions).toLocaleString()}`);
        }
        breakdown.push(`Taxable Net Income: PKR ${Math.round(taxableIncome).toLocaleString()}`);
        breakdown.push(`Applicable Category: ${isSalaried ? 'Salaried Individual' : 'Non-Salaried / Business Individual'}`);
        breakdown.push(`Applicable Bracket: ${slab.slabLabel}`);
        if (fixedTax > 0) {
          breakdown.push(`Fixed Base Tax: PKR ${Math.round(fixedTax).toLocaleString()}`);
        }
        if (rateOnExcess > 0) {
          const variableTax = excessAmount * (rateOnExcess / 100);
          breakdown.push(`Tax on excess over PKR ${slab.min.toLocaleString()} (${Math.round(excessAmount).toLocaleString()} @ ${rateOnExcess}%): PKR ${Math.round(variableTax).toLocaleString()}`);
        }
        break;
      }
    }

    // Edge case if 0 income
    if (taxableIncome === 0) {
      applicableSlab = "Up to PKR 600,000 (0% Tax)";
      fixedTax = 0;
      rateOnExcess = 0;
      excessAmount = 0;
      grossTax = 0;
      breakdown.push(`Taxable Income: PKR 0 (0% Tax)`);
    }
  }

  // Surcharge for ultra-high income earners exceeding PKR 10 million (Finance Act)
  if (taxableIncome > 10000000 && type !== 'company') {
    const surcharge = grossTax * 0.10;
    grossTax += surcharge;
    breakdown.push(`High Net Worth Surcharge (10% on tax for income > 10M): PKR ${Math.round(surcharge).toLocaleString()}`);
  }

  // Deduct tax credits and apply explicit mathematical rounding
  const netAnnualTax = Math.max(0, Math.round(grossTax - totalTaxCredits));
  const monthlyWithholding = Math.round(netAnnualTax / 12);
  const effectiveTaxRate = safeGross > 0 ? Number(((netAnnualTax / safeGross) * 100).toFixed(2)) : 0;
  const takeHomeAnnual = Math.max(0, Math.round(safeGross - netAnnualTax));
  const takeHomeMonthly = Math.round(takeHomeAnnual / 12);

  // Compute how much tax was saved by allowances & credits compared to baseline gross tax
  let baselineGrossTax = 0;
  if (type === 'company') {
    baselineGrossTax = safeGross * 0.29;
  } else {
    const isSalaried = type === 'salaried';
    const slabs = isSalaried ? SALARIED_SLABS_2026 : NON_SALARIED_SLABS_2026;
    for (let i = 0; i < slabs.length; i++) {
      const slab = slabs[i];
      if (safeGross > slab.min && safeGross <= slab.max) {
        baselineGrossTax = slab.fixedTax + ((safeGross - slab.min) * (slab.rate / 100));
        break;
      }
    }
    if (safeGross > 10000000) {
      baselineGrossTax += baselineGrossTax * 0.10;
    }
  }
  const taxSaved = Math.max(0, Math.round(baselineGrossTax - netAnnualTax));

  if (totalTaxCredits > 0) {
    breakdown.push(`Tax Credits / Rebates Applied (Sec 61, 63): -PKR ${Math.round(totalTaxCredits).toLocaleString()}`);
  }
  if (taxSaved > 0) {
    breakdown.push(`Total Tax Saved Through Allowances/Credits: PKR ${taxSaved.toLocaleString()}`);
  }
  breakdown.push(`Total Annual Tax Payable: PKR ${netAnnualTax.toLocaleString()}`);
  breakdown.push(`Monthly Tax Deduction: PKR ${monthlyWithholding.toLocaleString()}`);
  breakdown.push(`Net Monthly Take-Home: PKR ${takeHomeMonthly.toLocaleString()}`);

  return {
    taxYear: "2025-2026",
    taxpayerType: type,
    grossAnnualIncome: Math.round(safeGross),
    taxableIncome: Math.round(taxableIncome),
    applicableSlab,
    fixedTax: Math.round(fixedTax),
    rateOnExcess,
    excessAmount: Math.round(excessAmount),
    grossTax: Math.round(grossTax),
    taxCredits: Math.round(totalTaxCredits),
    netAnnualTax,
    monthlyWithholding,
    effectiveTaxRate,
    takeHomeAnnual,
    takeHomeMonthly,
    detailedBreakdown: breakdown,
    allowancesBreakdown,
    totalDeductions: Math.round(totalDeductions),
    taxSaved
  };
}

export const SALES_TAX_SCHEDULE_DATABASE: SalesTaxItem[] = [
  {
    id: "st-1",
    heading: "Basic Food & Agricultural Produce",
    description: "Unprocessed fresh fruits, vegetables, pulses, wheat, rice, unprocessed meat and poultry.",
    schedule: "6th_schedule_exempt",
    standardRate: "18%",
    applicableRate: "0% (Exempt)",
    conditions: "Exempt under Table-1, Serial 1-12 of 6th Schedule to Sales Tax Act 1990 (not sold in retail branding)."
  },
  {
    id: "st-2",
    heading: "Medicines & Active Pharmaceutical Ingredients (APIs)",
    description: "Substances registered as drugs under Drugs Act 1976 and diagnostic test kits.",
    schedule: "6th_schedule_exempt",
    standardRate: "18%",
    applicableRate: "0% (Exempt)",
    conditions: "Subject to DRAP registration and import certificates."
  },
  {
    id: "st-3",
    heading: "Educational Books & Newspapers",
    description: "Printed books, journals, periodicals, holy books, maps, and atlases.",
    schedule: "6th_schedule_exempt",
    standardRate: "18%",
    applicableRate: "0% (Exempt)",
    conditions: "Under 6th Schedule Table-1 Entry 23."
  },
  {
    id: "st-4",
    heading: "IT & Software Export Services",
    description: "Computer software export, IT-enabled services, call centers, and BPO.",
    schedule: "6th_schedule_exempt",
    standardRate: "18%",
    applicableRate: "0% (Zero-Rated / Exempt)",
    conditions: "Subject to PSEB registration and PRC (Proceed Realization Certificate) from authorized dealers."
  },
  {
    id: "st-5",
    heading: "Locally Manufactured Plant & Machinery",
    description: "Machinery, apparatus, and capital equipment for setting up industrial units.",
    schedule: "8th_schedule_reduced",
    standardRate: "18%",
    applicableRate: "10% / 12%",
    conditions: "Subject to conditions under Eighth Schedule Table-1."
  },
  {
    id: "st-6",
    heading: "Fertilizers (Urea, DAP, Potash)",
    description: "Agricultural chemical fertilizers manufactured locally or imported.",
    schedule: "8th_schedule_reduced",
    standardRate: "18%",
    applicableRate: "5% (Special)",
    conditions: "Special relief rate to support agricultural sector inputs."
  },
  {
    id: "st-7",
    heading: "Fast-Moving Consumer Goods (FMCG Retail)",
    description: "Packaged tea, soaps, beverages, cosmetics, confectionery.",
    schedule: "3rd_schedule_retail",
    standardRate: "18%",
    applicableRate: "18% on Retail Price",
    conditions: "Tax levied on Maximum Retail Price (MRP) printed on packaging under Section 3(2)(a)."
  },
  {
    id: "st-8",
    heading: "Solar Panels & Renewable Equipment",
    description: "Photovoltaic cells, solar inverters, and tubular batteries.",
    schedule: "general",
    standardRate: "18%",
    applicableRate: "Standard 18%",
    conditions: "Concessions rationalized in recent Finance Act; raw materials subject to customs duty exemptions."
  }
];

export const ATL_RATES_DATABASE: ATLRateItem[] = [
  {
    section: "Sec 236K / 236C",
    natureOfTransaction: "Purchase & Sale of Immovable Property",
    filerRate: "3% (Purchase) / 3% (Sale)",
    nonFilerRate: "12% - 15% (Purchase) / 10% (Sale)",
    notes: "Non-filer penal rate is 4x to 5x higher; late filers face 10.5% advance tax."
  },
  {
    section: "Sec 231A / 231AA",
    natureOfTransaction: "Banking Cash Withdrawal (exceeding PKR 50,000/day)",
    filerRate: "0% (Exempt for Filers)",
    nonFilerRate: "0.9% (Non-Filers on total withdrawal)",
    notes: "Applies on aggregate daily cash withdrawals across branch counters."
  },
  {
    section: "Sec 150",
    natureOfTransaction: "Dividend Income from Companies",
    filerRate: "15% (Mutual funds / Listed) / 25%",
    nonFilerRate: "30% (Mutual funds) / 50% (IPPs / Corporates)",
    notes: "100% penal rate increase for non-active taxpayers under Tenth Schedule."
  },
  {
    section: "Sec 151",
    natureOfTransaction: "Profit on Debt / Bank Savings Accounts",
    filerRate: "15%",
    nonFilerRate: "30%",
    notes: "Tenth Schedule doubles the withholding deduction at source."
  },
  {
    section: "Sec 231B",
    natureOfTransaction: "Motor Vehicle Purchase / Registration",
    filerRate: "PKR 10,000 - 200,000 (Engine CC dependent)",
    nonFilerRate: "3x to 4x Filer Rate (Up to PKR 1,200,000 for >2000cc)",
    notes: "Heavily taxed for non-filers during registration or transfer."
  },
  {
    section: "Sec 153(1)(a)",
    natureOfTransaction: "Sale of Goods (Withholding on corporate supplier)",
    filerRate: "5% (Companies) / 5.5% (Individuals)",
    nonFilerRate: "10% (Companies) / 11% (Individuals)",
    notes: "100% surcharge applicable if NTN not active on ATL on transaction date."
  },
  {
    section: "Sec 153(1)(b)",
    natureOfTransaction: "Rendering of Services (Consultancy, IT, Transport)",
    filerRate: "4% - 9% (Specified / General services)",
    nonFilerRate: "8% - 18% (Double withholding)",
    notes: "Adjustable advance tax for filers; minimum tax for non-filers."
  },
  {
    section: "Sec 236A",
    natureOfTransaction: "Sale by Auction / Tender",
    filerRate: "10%",
    nonFilerRate: "20%",
    notes: "Withheld by auctioneer prior to transfer of property/goods."
  }
];

export const FBR_NOTICE_TYPES = [
  {
    code: "114(4)",
    title: "Section 114(4) - Notice to Furnish Return of Income",
    description: "Issued to persons who failed to file annual tax return by due date."
  },
  {
    code: "177",
    title: "Section 177 - Audit of Income Tax Affairs",
    description: "Commissioner audit notice calling for books of accounts, bank statements & ledgers."
  },
  {
    code: "122(5A)",
    title: "Section 122(5A) - Amendment of Assessment",
    description: "Show cause notice where assessment is deemed erroneous and prejudicial to interest of revenue."
  },
  {
    code: "161/205",
    title: "Section 161 & 205 - Monitoring of Withholding Taxes",
    description: "Inquiry into tax deduction at source on salaries, supplies, contracts, and default surcharge."
  },
  {
    code: "140",
    title: "Section 140 - Recovery of Tax from Bank Accounts",
    description: "Notice of attachment sent to banks for direct deduction of outstanding tax demand."
  },
  {
    code: "111",
    title: "Section 111 - Unexplained Income or Assets",
    description: "Inquiry into unexplained cash deposits, property acquisitions, or foreign assets."
  }
];
