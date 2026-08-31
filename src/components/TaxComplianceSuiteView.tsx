import React, { useState } from 'react';
import {
  Scale,
  Calendar,
  Clock,
  AlertCircle,
  Building2,
  Landmark,
  FileText,
  DollarSign,
  TrendingDown,
  CheckCircle2,
  PiggyBank,
  HeartHandshake,
  Home,
  GraduationCap,
  Percent,
  Download,
  Info,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import { TaxCalculationResult, UserProfile, TaxAllowances } from '../types';
import { calculatePakistaniTax } from '../utils/taxEngine';
import { generateTaxCalculationPDF } from '../utils/pdfGenerator';

interface ComplianceEvent {
  id: string;
  title: string;
  category: 'annual_return' | 'advance_tax' | 'withholding_statement' | 'sales_tax';
  dueDate: string;
  targetGroup: string;
  legalSection: string;
  status: 'upcoming' | 'urgent' | 'periodic';
  penaltyClause: string;
  description: string;
}

const FBR_COMPLIANCE_DEADLINES: ComplianceEvent[] = [
  {
    id: 'fbr-salaried-annual',
    title: 'Salaried Individual Annual Income Tax Return Filing',
    category: 'annual_return',
    dueDate: 'September 30, 2026',
    targetGroup: 'Salaried Individuals & Non-Resident Pakistanis',
    legalSection: 'Section 114 & Section 118(1) of ITO 2001',
    status: 'urgent',
    penaltyClause: '0.1% per day of tax due (min PKR 1,000 to max 25% penalty under Sec 182)',
    description: 'Statutory deadline to submit electronic return of income & wealth statement via FBR Iris 2.0 portal for Tax Year 2026.'
  },
  {
    id: 'fbr-adv-tax-q1',
    title: 'Q1 Advance Tax Installment (Quarter 1)',
    category: 'advance_tax',
    dueDate: 'September 25, 2026',
    targetGroup: 'Companies & AOPs with turnover > threshold, Individuals with business turnover',
    legalSection: 'Section 147 of ITO 2001',
    status: 'upcoming',
    penaltyClause: 'Default surcharge @ 12% per annum under Section 205 for non-payment or short payment',
    description: 'First quarterly installment of advance tax computed based on estimated or prior year taxable turnover/income.'
  },
  {
    id: 'fbr-adv-tax-q2',
    title: 'Q2 Advance Tax Installment (Quarter 2)',
    category: 'advance_tax',
    dueDate: 'December 25, 2026',
    targetGroup: 'Companies, AOPs & Business Individuals',
    legalSection: 'Section 147 of ITO 2001',
    status: 'periodic',
    penaltyClause: 'Section 205 Default Surcharge on unremitted installments',
    description: 'Second quarterly statutory advance tax deposit via e-payment PSID challan.'
  },
  {
    id: 'fbr-monthly-wht',
    title: 'Monthly Withholding Tax Statement (e-Payment)',
    category: 'withholding_statement',
    dueDate: '15th of Every Month',
    targetGroup: 'All Prescribed Withholding Agents, Employers & Companies',
    legalSection: 'Section 165 of ITO 2001',
    status: 'periodic',
    penaltyClause: 'Penalty of PKR 2,500 per default plus PKR 500 per day under Section 182(1)',
    description: 'Mandatory electronic reconciliation of all tax withheld at source under Sections 149 (Salary), 153 (Goods/Services), 151 (Profit), and 236K (Property).'
  },
  {
    id: 'fbr-corporate-return',
    title: 'Corporate & Business Annual Return Filing',
    category: 'annual_return',
    dueDate: 'December 31, 2026',
    targetGroup: 'Companies with financial year ending on or before June 30',
    legalSection: 'Section 114 & Section 118(2) of ITO 2001',
    status: 'upcoming',
    penaltyClause: 'Strict ATL suspension, penal WHT rates (Tenth Schedule) & Sec 182 fines',
    description: 'Filing of audited financial statements, tax computation schedules, and company income tax return.'
  },
  {
    id: 'fbr-monthly-sales-tax',
    title: 'Monthly Sales Tax Return (Annexure-C & CPR)',
    category: 'sales_tax',
    dueDate: '18th of Every Month (Payment by 15th)',
    targetGroup: 'Registered Manufacturers, Importers, Wholesalers & Exporters',
    legalSection: 'Section 26 of Sales Tax Act, 1990',
    status: 'periodic',
    penaltyClause: 'PKR 10,000 minimum penalty plus input tax adjustment blockage',
    description: 'Monthly submission of sales invoice data (Annex-C) and payment of provincial / federal sales tax liability.'
  }
];

interface TaxComplianceSuiteViewProps {
  user: UserProfile | null;
  onOpenPricing?: () => void;
  onNavigateToChat?: (initialPrompt: string) => void;
}

export const TaxComplianceSuiteView: React.FC<TaxComplianceSuiteViewProps> = ({
  user,
  onOpenPricing,
  onNavigateToChat
}) => {
  // --- MODULE 1: Filer vs Non-Filer Comparison Interactive State ---
  const [propertyPrice, setPropertyPrice] = useState<number>(25000000); // 25M PKR
  const [bankProfitAnnual, setBankProfitAnnual] = useState<number>(500000); // 500k PKR
  const [cashWithdrawalSingle, setCashWithdrawalSingle] = useState<number>(100000); // 100k PKR

  // Statutory Rates
  // 1. Property Purchase 236K: 1.25% - 3% for Filers vs 10.5% - 12% for Non-Filers
  const filerPropertyTax = Math.round(propertyPrice * 0.0125); // 1.25% (or 3% depending on value bracket, standardized at 1.25% base)
  const nonFilerPropertyTax = Math.round(propertyPrice * 0.105); // 10.5% penal rate under Tenth Schedule
  const propertyDiff = nonFilerPropertyTax - filerPropertyTax;

  // 2. Bank Profit on Debt Sec 151: 15% for Filers vs 30% for Non-Filers
  const filerBankProfitTax = Math.round(bankProfitAnnual * 0.15); // 15%
  const nonFilerBankProfitTax = Math.round(bankProfitAnnual * 0.30); // 30%
  const bankProfitDiff = nonFilerBankProfitTax - filerBankProfitTax;

  // 3. Cash Withdrawal above 50k Sec 231A: 0% for Filers vs 0.8% - 0.9% for Non-Filers
  const isCashAbove50k = cashWithdrawalSingle > 50000;
  const filerCashTax = 0; // 0%
  const nonFilerCashTax = isCashAbove50k ? Math.round(cashWithdrawalSingle * 0.008) : 0; // 0.8%
  const cashDiff = nonFilerCashTax - filerCashTax;

  const totalFilerAdvantage = propertyDiff + bankProfitDiff + cashDiff;

  // --- MODULE 2: Tax Savings & Deductible Allowances Engine ---
  const [grossAnnualSalary, setGrossAnnualSalary] = useState<number>(3600000); // 3.6M PKR
  const [charityDonations, setCharityDonations] = useState<number>(150000); // Sec 61
  const [pfContribution, setPfContribution] = useState<number>(200000); // PF
  const [homeLoanInterest, setHomeLoanInterest] = useState<number>(180000); // Home loan interest Sec 60C
  const [zakatPaid, setZakatPaid] = useState<number>(50000); // Sec 60
  const [educationExpenses, setEducationExpenses] = useState<number>(100000); // Sec 60D

  // Calculate Net Taxable Income dynamically
  const allowancesObj: TaxAllowances = {
    educationalExpenses: educationExpenses,
    zakatAllowance: zakatPaid,
    providentFundContribution: pfContribution,
    homeLoanInterest: homeLoanInterest,
    charitableDonations: charityDonations,
    pensionFundInvestment: 0
  };

  const calculationResult: TaxCalculationResult = calculatePakistaniTax(
    grossAnnualSalary,
    'salaried',
    0,
    0,
    allowancesObj
  );

  // Baseline without allowances
  const baselineResult: TaxCalculationResult = calculatePakistaniTax(
    grossAnnualSalary,
    'salaried',
    0,
    0,
    undefined
  );

  const totalTaxSaved = Math.max(0, baselineResult.netAnnualTax - calculationResult.netAnnualTax);

  // --- MODULE 3: Calendar Filter ---
  const [deadlineFilter, setDeadlineFilter] = useState<'all' | 'annual_return' | 'advance_tax' | 'withholding_statement' | 'sales_tax'>('all');

  const filteredDeadlines = FBR_COMPLIANCE_DEADLINES.filter((item) => {
    if (deadlineFilter === 'all') return true;
    return item.category === deadlineFilter;
  });

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
      
      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-emerald-900/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1.5">
              <Scale className="w-3.5 h-3.5" />
              Tax Year 2025 - 2026 Compliance Master Suite
            </span>
            <span className="text-xs text-slate-400 font-medium">Income Tax Ordinance, 2001 (as amended)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-3">
            <span>FBR Compliance, Allowance Optimization & WHT Matrix</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
            Deterministic statutory tax savings engine under Section 60/61, multi-asset Active Filer vs Non-Filer WHT comparison matrix, and real-time FBR filing calendar.
          </p>
        </div>

        <button
          onClick={() => generateTaxCalculationPDF(calculationResult, user)}
          className="flex items-center gap-2.5 px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-black text-xs shadow-lg shadow-emerald-950/40 transition active:scale-98 cursor-pointer shrink-0"
        >
          <Download className="w-4 h-4" />
          <span>Export Statutory Tax Dossier</span>
        </button>
      </div>

      {/* Grid: Feature Modules */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* ========================================================================= */}
        {/* MODULE 1: Filer vs Non-Filer Comparison Matrix (12 cols full width or 6 cols) */}
        {/* ========================================================================= */}
        <div className="lg:col-span-12 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-100 gap-3">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-800 font-black text-sm">
                  1
                </div>
                <h2 className="text-lg font-black text-slate-950">
                  Filer vs Non-Filer Withholding Tax Comparison Matrix
                </h2>
              </div>
              <p className="text-xs text-slate-600 mt-1">
                Statutory withholding rates under the First & Tenth Schedules of the Income Tax Ordinance, 2001.
              </p>
            </div>

            <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 rounded-xl">
              <ShieldAlert className="w-4 h-4 text-emerald-700" />
              <span className="text-xs font-bold text-emerald-900">
                Total Cumulative Filer Savings: <span className="text-emerald-700 font-black">PKR {totalFilerAdvantage.toLocaleString()}</span>
              </span>
            </div>
          </div>

          {/* Interactive Simulation Controls */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            
            {/* Control 1: Property Purchase (236K) */}
            <div className="bg-slate-50 p-4.5 rounded-2xl border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                  <Home className="w-4 h-4 text-emerald-600" />
                  Property Purchase Value (Sec 236K)
                </label>
                <span className="text-[10px] font-bold text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                  1.25% vs 10.5%+
                </span>
              </div>
              <div className="relative">
                <span className="absolute left-3.5 top-2.5 text-xs font-bold text-slate-500">PKR</span>
                <input
                  type="number"
                  value={propertyPrice || ''}
                  onChange={(e) => setPropertyPrice(Number(e.target.value))}
                  placeholder="25000000"
                  className="w-full pl-14 pr-3 py-2 text-xs font-bold text-slate-950 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>
              <div className="flex justify-between text-[11px] text-slate-500 pt-1">
                <span>Filer Tax: <strong className="text-emerald-700">PKR {filerPropertyTax.toLocaleString()}</strong></span>
                <span>Non-Filer: <strong className="text-rose-700">PKR {nonFilerPropertyTax.toLocaleString()}</strong></span>
              </div>
            </div>

            {/* Control 2: Bank Profit on Debt (Sec 151) */}
            <div className="bg-slate-50 p-4.5 rounded-2xl border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                  <Landmark className="w-4 h-4 text-indigo-600" />
                  Annual Bank Profit / Yield (Sec 151)
                </label>
                <span className="text-[10px] font-bold text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                  15% vs 30%
                </span>
              </div>
              <div className="relative">
                <span className="absolute left-3.5 top-2.5 text-xs font-bold text-slate-500">PKR</span>
                <input
                  type="number"
                  value={bankProfitAnnual || ''}
                  onChange={(e) => setBankProfitAnnual(Number(e.target.value))}
                  placeholder="500000"
                  className="w-full pl-14 pr-3 py-2 text-xs font-bold text-slate-950 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>
              <div className="flex justify-between text-[11px] text-slate-500 pt-1">
                <span>Filer Tax (15%): <strong className="text-emerald-700">PKR {filerBankProfitTax.toLocaleString()}</strong></span>
                <span>Non-Filer (30%): <strong className="text-rose-700">PKR {nonFilerBankProfitTax.toLocaleString()}</strong></span>
              </div>
            </div>

            {/* Control 3: Cash Withdrawals above 50k (Sec 231A) */}
            <div className="bg-slate-50 p-4.5 rounded-2xl border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                  <DollarSign className="w-4 h-4 text-amber-600" />
                  Single Day Cash Withdrawal (Sec 231A)
                </label>
                <span className="text-[10px] font-bold text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                  0% vs 0.8%
                </span>
              </div>
              <div className="relative">
                <span className="absolute left-3.5 top-2.5 text-xs font-bold text-slate-500">PKR</span>
                <input
                  type="number"
                  value={cashWithdrawalSingle || ''}
                  onChange={(e) => setCashWithdrawalSingle(Number(e.target.value))}
                  placeholder="100000"
                  className="w-full pl-14 pr-3 py-2 text-xs font-bold text-slate-950 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>
              <div className="flex justify-between text-[11px] text-slate-500 pt-1">
                <span>Filer Tax: <strong className="text-emerald-700">PKR 0 (0% Exempt)</strong></span>
                <span>Non-Filer (0.8%): <strong className="text-rose-700">PKR {nonFilerCashTax.toLocaleString()}</strong></span>
              </div>
            </div>

          </div>

          {/* Side-by-Side Detailed Matrix Table */}
          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white font-bold">
                  <th className="py-3 px-4">Statutory Transaction Head</th>
                  <th className="py-3 px-4">Relevant Section</th>
                  <th className="py-3 px-4 text-emerald-400">Active Filer Rate</th>
                  <th className="py-3 px-4 text-rose-400">Non-Filer Penal Rate</th>
                  <th className="py-3 px-4 text-right">Computed Filer Savings</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white text-slate-800">
                {/* Row 1: Property 236K */}
                <tr className="hover:bg-slate-50/80 transition">
                  <td className="py-3.5 px-4 font-bold text-slate-950">
                    <div>Property Purchase / Transfer</div>
                    <div className="text-[11px] font-normal text-slate-500">Valued at PKR {propertyPrice.toLocaleString()}</div>
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-700">Section 236K</td>
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-emerald-700">1.25% – 3%</span>
                    <div className="text-[11px] text-slate-600">PKR {filerPropertyTax.toLocaleString()}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-rose-700">10.5% – 12%</span>
                    <div className="text-[11px] text-slate-600">PKR {nonFilerPropertyTax.toLocaleString()}</div>
                  </td>
                  <td className="py-3.5 px-4 text-right font-black text-emerald-600 text-sm">
                    + PKR {propertyDiff.toLocaleString()}
                  </td>
                </tr>

                {/* Row 2: Bank Profit 151 */}
                <tr className="hover:bg-slate-50/80 transition">
                  <td className="py-3.5 px-4 font-bold text-slate-950">
                    <div>Profit on Debt / Bank Savings Yield</div>
                    <div className="text-[11px] font-normal text-slate-500">Yield amount: PKR {bankProfitAnnual.toLocaleString()}</div>
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-700">Section 151</td>
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-emerald-700">15% Standard</span>
                    <div className="text-[11px] text-slate-600">PKR {filerBankProfitTax.toLocaleString()}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-rose-700">30% Penal (100% Surcharge)</span>
                    <div className="text-[11px] text-slate-600">PKR {nonFilerBankProfitTax.toLocaleString()}</div>
                  </td>
                  <td className="py-3.5 px-4 text-right font-black text-emerald-600 text-sm">
                    + PKR {bankProfitDiff.toLocaleString()}
                  </td>
                </tr>

                {/* Row 3: Cash Withdrawal 231A */}
                <tr className="hover:bg-slate-50/80 transition">
                  <td className="py-3.5 px-4 font-bold text-slate-950">
                    <div>Cash Withdrawals &gt; PKR 50,000 / Day</div>
                    <div className="text-[11px] font-normal text-slate-500">Withdrawal: PKR {cashWithdrawalSingle.toLocaleString()}</div>
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-700">Section 231A</td>
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-emerald-700">0% (Completely Exempt)</span>
                    <div className="text-[11px] text-slate-600">PKR 0</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-rose-700">0.8% – 0.9% Withholding</span>
                    <div className="text-[11px] text-slate-600">PKR {nonFilerCashTax.toLocaleString()}</div>
                  </td>
                  <td className="py-3.5 px-4 text-right font-black text-emerald-600 text-sm">
                    + PKR {cashDiff.toLocaleString()}
                  </td>
                </tr>

                {/* Total Summary Row */}
                <tr className="bg-emerald-50/90 font-black text-xs text-slate-950 border-t-2 border-emerald-300">
                  <td colSpan={2} className="py-4 px-4 text-sm font-black text-emerald-950">
                    Total Combined Withholding Differential
                  </td>
                  <td className="py-4 px-4 text-emerald-800 text-sm">
                    PKR {(filerPropertyTax + filerBankProfitTax + filerCashTax).toLocaleString()}
                  </td>
                  <td className="py-4 px-4 text-rose-800 text-sm">
                    PKR {(nonFilerPropertyTax + nonFilerBankProfitTax + nonFilerCashTax).toLocaleString()}
                  </td>
                  <td className="py-4 px-4 text-right text-emerald-700 text-base">
                    Saved PKR {totalFilerAdvantage.toLocaleString()}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* MODULE 2: Tax Savings & Deductible Allowances Component (6 cols or split) */}
        {/* ========================================================================= */}
        <div className="lg:col-span-6 bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-800 font-black text-sm">
                2
              </div>
              <div>
                <h2 className="text-base font-black text-slate-950">
                  Tax Savings & Deductible Allowances Component
                </h2>
                <p className="text-[11px] text-slate-500">
                  Direct subtraction under Sections 60, 60C, 60D, 61 & PF before progressive slab calculation.
                </p>
              </div>
            </div>
          </div>

          {/* Gross Salary Input */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1.5">
            <label className="text-xs font-black text-slate-900 flex items-center justify-between">
              <span>Gross Annual Salary (Base)</span>
              <span className="text-[10px] text-slate-500 font-normal">Monthly: PKR {Math.round(grossAnnualSalary / 12).toLocaleString()}</span>
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-2.5 text-xs font-bold text-slate-500">PKR</span>
              <input
                type="number"
                value={grossAnnualSalary || ''}
                onChange={(e) => setGrossAnnualSalary(Number(e.target.value))}
                placeholder="3600000"
                className="w-full pl-14 pr-4 py-2.5 text-sm font-black text-slate-900 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
          </div>

          {/* Deductible Inputs Grid */}
          <div className="space-y-3.5">
            
            {/* 1. Charity Donations under Sec 61 */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <HeartHandshake className="w-3.5 h-3.5 text-rose-500" />
                  Charitable Donations (Section 61 Tax Credit / Relief)
                </span>
                <span className="text-[10px] text-slate-500 font-normal">Approved NPOs</span>
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-2 text-xs font-bold text-slate-500">PKR</span>
                <input
                  type="number"
                  value={charityDonations || ''}
                  onChange={(e) => setCharityDonations(Number(e.target.value))}
                  placeholder="0"
                  className="w-full pl-14 pr-3 py-2 text-xs font-semibold text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>
            </div>

            {/* 2. Provident Fund Contribution */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <PiggyBank className="w-3.5 h-3.5 text-emerald-600" />
                  Provident Fund Contribution (Statutory / Recognized PF)
                </span>
                <span className="text-[10px] text-slate-500 font-normal">Deductible Allowance</span>
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-2 text-xs font-bold text-slate-500">PKR</span>
                <input
                  type="number"
                  value={pfContribution || ''}
                  onChange={(e) => setPfContribution(Number(e.target.value))}
                  placeholder="0"
                  className="w-full pl-14 pr-3 py-2 text-xs font-semibold text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>
            </div>

            {/* 3. Home Loan Interest (Section 60C - Deductible Allowance on Profit on Debt) */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Home className="w-3.5 h-3.5 text-amber-600" />
                  Home Loan Markup / Interest (Section 60C Profit on Debt)
                </span>
                <span className="text-[10px] text-slate-500 font-normal">Deductible Allowance</span>
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-2 text-xs font-bold text-slate-500">PKR</span>
                <input
                  type="number"
                  value={homeLoanInterest || ''}
                  onChange={(e) => setHomeLoanInterest(Number(e.target.value))}
                  placeholder="0"
                  className="w-full pl-14 pr-3 py-2 text-xs font-semibold text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>
            </div>

            {/* Secondary Allowances (Zakat Sec 60 & Education Sec 60D) */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Zakat (Sec 60)
                </label>
                <input
                  type="number"
                  value={zakatPaid || ''}
                  onChange={(e) => setZakatPaid(Number(e.target.value))}
                  placeholder="PKR 0"
                  className="w-full px-3 py-1.5 text-xs text-slate-900 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Education (Sec 60D)
                </label>
                <input
                  type="number"
                  value={educationExpenses || ''}
                  onChange={(e) => setEducationExpenses(Number(e.target.value))}
                  placeholder="PKR 0"
                  className="w-full px-3 py-1.5 text-xs text-slate-900 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

          </div>

          {/* Dynamic Computation Summary Box */}
          <div className="bg-emerald-950 text-white rounded-2xl p-4.5 space-y-2.5 border border-emerald-800/60 shadow-md">
            <div className="flex justify-between text-xs pb-2 border-b border-emerald-800">
              <span className="text-slate-300">Gross Total Salary:</span>
              <span className="font-bold">PKR {grossAnnualSalary.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-xs text-emerald-300">
              <span>Total Allowances Subtracted:</span>
              <span className="font-bold">- PKR {(calculationResult.totalDeductions || 0).toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-xs text-amber-300">
              <span>Taxable Net Income (Progressive Base):</span>
              <span className="font-black text-white">PKR {calculationResult.taxableIncome.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm font-black pt-2 border-t border-emerald-800 text-emerald-400">
              <span>Optimized Annual Tax Liability:</span>
              <span>PKR {calculationResult.netAnnualTax.toLocaleString()}</span>
            </div>
            <div className="bg-emerald-900/60 border border-emerald-600/40 rounded-xl p-2.5 flex items-center justify-between text-xs">
              <span className="text-emerald-200 font-bold">Total Annual Tax Saved:</span>
              <span className="text-emerald-300 font-black text-sm">PKR {totalTaxSaved.toLocaleString()}</span>
            </div>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* MODULE 3: Tax Compliance & Calendar Card (6 cols) */}
        {/* ========================================================================= */}
        <div className="lg:col-span-6 bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-800 font-black text-sm">
                  3
                </div>
                <div>
                  <h2 className="text-base font-black text-slate-950">
                    Tax Compliance & Statutory Calendar Card
                  </h2>
                  <p className="text-[11px] text-slate-500">
                    Mandatory FBR deadlines, penalty clauses, and statutory filing obligations.
                  </p>
                </div>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-1.5 text-xs">
              {[
                { key: 'all', label: 'All Deadlines' },
                { key: 'annual_return', label: 'Annual Returns' },
                { key: 'advance_tax', label: 'Advance Tax (Sec 147)' },
                { key: 'withholding_statement', label: 'WHT Statements (Sec 165)' },
                { key: 'sales_tax', label: 'Sales Tax (STA 1990)' },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setDeadlineFilter(tab.key as any)}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition cursor-pointer ${
                    deadlineFilter === tab.key
                      ? 'bg-emerald-900 text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Deadline List */}
            <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
              {filteredDeadlines.map((dl) => (
                <div
                  key={dl.id}
                  className="bg-slate-50 hover:bg-emerald-50/40 p-4 rounded-2xl border border-slate-200 transition space-y-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-0.5">
                      <h4 className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        {dl.title}
                      </h4>
                      <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded inline-block">
                        {dl.legalSection}
                      </span>
                    </div>

                    <span
                      className={`text-[10px] font-black px-2.5 py-1 rounded-full shrink-0 ${
                        dl.status === 'urgent'
                          ? 'bg-rose-100 text-rose-800 border border-rose-300'
                          : dl.status === 'upcoming'
                          ? 'bg-amber-100 text-amber-800 border border-amber-300'
                          : 'bg-blue-100 text-blue-800 border border-blue-300'
                      }`}
                    >
                      Due: {dl.dueDate}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    {dl.description}
                  </p>

                  <div className="pt-2 border-t border-slate-200/60 flex items-start gap-1.5 text-[10px] text-rose-800 font-medium">
                    <AlertCircle className="w-3 h-3 text-rose-600 shrink-0 mt-0.5" />
                    <span><strong>Statutory Default Penalty:</strong> {dl.penaltyClause}</span>
                  </div>
                </div>
              ))}
            </div>

          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Official statutory schedule updated under Finance Act.</span>
            {onNavigateToChat && (
              <button
                onClick={() => onNavigateToChat('Draft an extension request letter to the Commissioner Inland Revenue under Section 119 for Income Tax Return filing deadline.')}
                className="text-emerald-700 font-bold hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Draft Extension Notice</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};
