import React, { useState, useEffect } from 'react';
import { 
  Calculator, 
  Download, 
  FileCheck, 
  Info, 
  Building2, 
  User, 
  Users, 
  Briefcase, 
  TrendingDown, 
  DollarSign, 
  ArrowRight,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  GraduationCap,
  HeartHandshake,
  ShieldCheck,
  PiggyBank,
  Car,
  Landmark,
  Home,
  AlertTriangle,
  Scale,
  Percent
} from 'lucide-react';
import { TaxCalculationResult, UserProfile, TaxAllowances } from '../types';
import { calculatePakistaniTax, SALARIED_SLABS_2026, NON_SALARIED_SLABS_2026, ATL_RATES_DATABASE } from '../utils/taxEngine';
import { generateTaxCalculationPDF } from '../utils/pdfGenerator';

interface TaxCalculatorViewProps {
  user: UserProfile | null;
  onOpenTierModal: () => void;
}

export const TaxCalculatorView: React.FC<TaxCalculatorViewProps> = ({ user, onOpenTierModal }) => {
  const [taxpayerType, setTaxpayerType] = useState<'salaried' | 'non_salaried' | 'aop' | 'company'>('salaried');
  const [periodType, setPeriodType] = useState<'annual' | 'monthly'>('annual');
  const [incomeInput, setIncomeInput] = useState<number>(2400000); // 2.4M PKR default (200k/mo)
  
  // Itemized Tax Saving & Deductible Allowances
  const [educationalExpenses, setEducationalExpenses] = useState<number>(0); // Sec 60D
  const [zakatAllowance, setZakatAllowance] = useState<number>(0); // Sec 60
  const [providentFundContribution, setProvidentFundContribution] = useState<number>(0); // PF Sec 60
  const [homeLoanInterest, setHomeLoanInterest] = useState<number>(0); // Home loan interest Sec 60C
  const [charitableDonations, setCharitableDonations] = useState<number>(0); // Sec 61
  const [pensionFundInvestment, setPensionFundInvestment] = useState<number>(0); // Sec 63

  // Filer vs Non-Filer Comparison state
  const [cashWithdrawalAmount, setCashWithdrawalAmount] = useState<number>(100000);
  const [bankProfitAmount, setBankProfitAmount] = useState<number>(500000); // Sec 151
  const [vehicleCC, setVehicleCC] = useState<'1000cc' | '1300cc' | '1800cc' | '2000cc_plus'>('1300cc');
  const [propertyValue, setPropertyValue] = useState<number>(20000000); // 20 Million PKR

  const [result, setResult] = useState<TaxCalculationResult | null>(null);

  // Recalculate on any state change
  useEffect(() => {
    const grossAnnual = periodType === 'monthly' ? incomeInput * 12 : incomeInput;
    
    const allowances: TaxAllowances = {
      educationalExpenses,
      zakatAllowance,
      providentFundContribution,
      homeLoanInterest,
      charitableDonations,
      pensionFundInvestment
    };

    const calc = calculatePakistaniTax(
      grossAnnual,
      taxpayerType,
      0,
      0,
      allowances
    );
    setResult(calc);
  }, [
    incomeInput,
    periodType,
    taxpayerType,
    educationalExpenses,
    zakatAllowance,
    providentFundContribution,
    homeLoanInterest,
    charitableDonations,
    pensionFundInvestment
  ]);

  const handleDownloadPDF = () => {
    if (!result) return;
    generateTaxCalculationPDF(result, user);
  };

  // Filer vs Non-Filer Calculations
  // Cash Withdrawal (Sec 231A: 0% vs 0.8% for withdrawals above 50k)
  const isCashAbove50k = cashWithdrawalAmount > 50000;
  const filerCashTax = 0; // 0% for active filers
  const nonFilerCashTax = isCashAbove50k ? Math.round(cashWithdrawalAmount * 0.008) : 0; // 0.8% for non-filers
  const cashSavings = nonFilerCashTax - filerCashTax;

  // Bank Profit (Sec 151: 15% for filers vs 30% for non-filers)
  const filerBankProfitTax = Math.round(bankProfitAmount * 0.15); // 15%
  const nonFilerBankProfitTax = Math.round(bankProfitAmount * 0.30); // 30%
  const bankProfitSavings = nonFilerBankProfitTax - filerBankProfitTax;

  // Property Purchase (Sec 236K: 1.25% - 3% vs 10.5% - 12%)
  const filerPropertyTax = Math.round(propertyValue * 0.0125); // 1.25% base rate
  const nonFilerPropertyTax = Math.round(propertyValue * 0.105); // 10.5% penal rate
  const propertySavings = nonFilerPropertyTax - filerPropertyTax;

  const vehicleRates: Record<string, { label: string; filer: number; nonFiler: number }> = {
    '1000cc': { label: 'Up to 1000cc', filer: 20000, nonFiler: 60000 },
    '1300cc': { label: '1001cc to 1300cc', filer: 50000, nonFiler: 150000 },
    '1800cc': { label: '1301cc to 1800cc', filer: 150000, nonFiler: 450000 },
    '2000cc_plus': { label: 'Above 2000cc / Luxury', filer: 300000, nonFiler: 1200000 }
  };
  const selectedVehicle = vehicleRates[vehicleCC];
  const vehicleSavings = selectedVehicle.nonFiler - selectedVehicle.filer;

  const totalFilerSavings = cashSavings + bankProfitSavings + propertySavings + vehicleSavings;

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
      
      {/* Title Header */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 rounded-2xl p-6 text-white shadow-lg border border-emerald-900/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Tax Year 2025 - 2026 (Finance Act)
            </span>
            <span className="text-xs text-slate-400">First Schedule & Tenth Schedule, ITO 2001</span>
          </div>
          <h1 className="text-2xl font-black tracking-tight flex items-center gap-2.5">
            <Calculator className="w-6 h-6 text-emerald-400" />
            <span>Pakistani FBR Income Tax & Allowance Suite</span>
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Deterministic progressive slab engine with deductible allowances, Filer vs Non-Filer WHT matrix, and official PDF Dossier generation.
          </p>
        </div>

        <button
          id="btn-download-pdf"
          onClick={handleDownloadPDF}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-black text-xs shadow-md shadow-emerald-950/40 transition active:scale-98 cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>Export Official PDF Dossier</span>
        </button>
      </div>

      {/* Main Grid: Inputs vs Results */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: Input Form & Allowances (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          
          {/* Main Income Configuration Card */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            
            {/* Taxpayer Category Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-900 mb-2">
                1. Taxpayer Category
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setTaxpayerType('salaried')}
                  className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition ${
                    taxpayerType === 'salaried'
                      ? 'bg-emerald-50/80 border-emerald-500 text-emerald-950 ring-1 ring-emerald-500'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <User className={`w-4 h-4 mt-0.5 ${taxpayerType === 'salaried' ? 'text-emerald-600' : 'text-slate-400'}`} />
                  <div>
                    <div className="text-xs font-bold">Salaried Individual</div>
                    <div className="text-[10px] text-slate-500">Salary &gt; 75% of income</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setTaxpayerType('non_salaried')}
                  className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition ${
                    taxpayerType === 'non_salaried'
                      ? 'bg-emerald-50/80 border-emerald-500 text-emerald-950 ring-1 ring-emerald-500'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <Briefcase className={`w-4 h-4 mt-0.5 ${taxpayerType === 'non_salaried' ? 'text-emerald-600' : 'text-slate-400'}`} />
                  <div>
                    <div className="text-xs font-bold">Business Individual</div>
                    <div className="text-[10px] text-slate-500">Sole proprietor / Freelancer</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setTaxpayerType('aop')}
                  className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition ${
                    taxpayerType === 'aop'
                      ? 'bg-emerald-50/80 border-emerald-500 text-emerald-950 ring-1 ring-emerald-500'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <Users className={`w-4 h-4 mt-0.5 ${taxpayerType === 'aop' ? 'text-emerald-600' : 'text-slate-400'}`} />
                  <div>
                    <div className="text-xs font-bold">AOP (Partnership)</div>
                    <div className="text-[10px] text-slate-500">Firm / Joint venture</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setTaxpayerType('company')}
                  className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition ${
                    taxpayerType === 'company'
                      ? 'bg-emerald-50/80 border-emerald-500 text-emerald-950 ring-1 ring-emerald-500'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <Building2 className={`w-4 h-4 mt-0.5 ${taxpayerType === 'company' ? 'text-emerald-600' : 'text-slate-400'}`} />
                  <div>
                    <div className="text-xs font-bold">Corporate (Company)</div>
                    <div className="text-[10px] text-slate-500">29% Flat + Super Tax</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Income Input Period Toggle */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-900">
                  2. Gross Total Income
                </label>
                <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-[11px]">
                  <button
                    type="button"
                    onClick={() => setPeriodType('monthly')}
                    className={`px-2.5 py-1 rounded-md font-semibold transition ${
                      periodType === 'monthly' ? 'bg-white text-slate-950 shadow-xs' : 'text-slate-600'
                    }`}
                  >
                    Monthly Salary
                  </button>
                  <button
                    type="button"
                    onClick={() => setPeriodType('annual')}
                    className={`px-2.5 py-1 rounded-md font-semibold transition ${
                      periodType === 'annual' ? 'bg-white text-slate-950 shadow-xs' : 'text-slate-600'
                    }`}
                  >
                    Annual Income
                  </button>
                </div>
              </div>

              <div className="relative">
                <span className="absolute left-3.5 top-3 text-xs font-bold text-slate-500">PKR</span>
                <input
                  type="number"
                  id="input-gross-income"
                  value={incomeInput || ''}
                  onChange={(e) => setIncomeInput(Number(e.target.value))}
                  placeholder="e.g. 2400000"
                  className="w-full pl-14 pr-4 py-2.5 text-sm font-bold text-slate-900 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none"
                />
              </div>

              {/* Quick Income Presets */}
              <div className="flex flex-wrap gap-1.5 mt-2">
                {[
                  { label: '50k/mo', val: periodType === 'monthly' ? 50000 : 600000 },
                  { label: '100k/mo', val: periodType === 'monthly' ? 100000 : 1200000 },
                  { label: '200k/mo', val: periodType === 'monthly' ? 200000 : 2400000 },
                  { label: '350k/mo', val: periodType === 'monthly' ? 350000 : 4200000 },
                  { label: '500k/mo', val: periodType === 'monthly' ? 500000 : 6000000 },
                  { label: '1M/mo', val: periodType === 'monthly' ? 1000000 : 12000000 },
                ].map((p, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setIncomeInput(p.val)}
                    className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 border border-slate-200 transition"
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Module 1: Tax Saving & Deductible Allowances Module */}
          <div className="bg-white p-5 rounded-2xl border border-emerald-200 shadow-xs space-y-4 relative overflow-hidden">
            <div className="flex items-center justify-between pb-2 border-b border-emerald-100">
              <div className="flex items-center gap-2">
                <PiggyBank className="w-4 h-4 text-emerald-600" />
                <h3 className="text-xs font-bold text-slate-900">Tax Saving & Allowance Engine</h3>
              </div>
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                Direct Net Deduction
              </span>
            </div>

            <p className="text-[11px] text-slate-600">
              These deductible allowances are subtracted directly from your Gross Salary to determine your <strong>Taxable Net Income</strong> prior to applying the progressive tax slabs:
            </p>

            {/* Educational Expenses (Section 60D) */}
            <div>
              <label className="block text-xs font-semibold text-slate-800 mb-1 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-indigo-600" />
                  Educational Expenses (Section 60D)
                </span>
                <span className="text-[10px] text-slate-500 font-normal">Max 5% of tuition fees</span>
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-2.5 text-xs font-bold text-slate-500">PKR</span>
                <input
                  type="number"
                  value={educationalExpenses || ''}
                  onChange={(e) => setEducationalExpenses(Number(e.target.value))}
                  placeholder="0"
                  className="w-full pl-14 pr-4 py-2 text-xs font-medium text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none"
                />
              </div>
            </div>

            {/* Zakat Deductions (Section 60) */}
            <div>
              <label className="block text-xs font-semibold text-slate-800 mb-1 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Zakat Paid under Ordinance (Section 60)
                </span>
                <span className="text-[10px] text-slate-500 font-normal">Zakat & Ushr Ord 1980</span>
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-2.5 text-xs font-bold text-slate-500">PKR</span>
                <input
                  type="number"
                  value={zakatAllowance || ''}
                  onChange={(e) => setZakatAllowance(Number(e.target.value))}
                  placeholder="0"
                  className="w-full pl-14 pr-4 py-2 text-xs font-medium text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none"
                />
              </div>
            </div>

            {/* Provident Fund Contribution */}
            <div>
              <label className="block text-xs font-semibold text-slate-800 mb-1 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <PiggyBank className="w-3.5 h-3.5 text-amber-600" />
                  Provident Fund Contribution
                </span>
                <span className="text-[10px] text-slate-500 font-normal">Statutory / Recognized PF</span>
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-2.5 text-xs font-bold text-slate-500">PKR</span>
                <input
                  type="number"
                  value={providentFundContribution || ''}
                  onChange={(e) => setProvidentFundContribution(Number(e.target.value))}
                  placeholder="0"
                  className="w-full pl-14 pr-4 py-2 text-xs font-medium text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none"
                />
              </div>
            </div>

            {/* Home Loan Interest (Section 60C) */}
            <div>
              <label className="block text-xs font-semibold text-slate-800 mb-1 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Home className="w-3.5 h-3.5 text-emerald-600" />
                  Home Loan Interest / Markup (Section 60C)
                </span>
                <span className="text-[10px] text-slate-500 font-normal">Profit on Debt Allowance</span>
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-2.5 text-xs font-bold text-slate-500">PKR</span>
                <input
                  type="number"
                  value={homeLoanInterest || ''}
                  onChange={(e) => setHomeLoanInterest(Number(e.target.value))}
                  placeholder="0"
                  className="w-full pl-14 pr-4 py-2 text-xs font-medium text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none"
                />
              </div>
            </div>

            {/* Charitable Donations (Sec 61) & Pension Fund (Sec 63) */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1 flex items-center gap-1">
                  <HeartHandshake className="w-3 h-3 text-rose-500" />
                  Donations (Sec 61)
                </label>
                <input
                  type="number"
                  value={charitableDonations || ''}
                  onChange={(e) => setCharitableDonations(Number(e.target.value))}
                  placeholder="PKR 0"
                  className="w-full px-3 py-1.5 text-xs text-slate-900 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1 flex items-center gap-1">
                  <Percent className="w-3 h-3 text-cyan-600" />
                  Pension (Sec 63)
                </label>
                <input
                  type="number"
                  value={pensionFundInvestment || ''}
                  onChange={(e) => setPensionFundInvestment(Number(e.target.value))}
                  placeholder="PKR 0"
                  className="w-full px-3 py-1.5 text-xs text-slate-900 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>
            </div>

            {result && result.taxSaved && result.taxSaved > 0 ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-900">Total Tax Saved via Planning:</span>
                <span className="text-xs font-black text-emerald-700">PKR {result.taxSaved.toLocaleString()}</span>
              </div>
            ) : null}

          </div>

        </div>

        {/* RIGHT COLUMN: Outputs & Filer vs Non-Filer Comparison (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          
          {/* Key Metric Highlights */}
          {result && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              
              {/* Monthly Tax Card */}
              <div className="bg-gradient-to-br from-emerald-900 to-slate-900 rounded-2xl p-4.5 text-white shadow-sm border border-emerald-800/40">
                <div className="text-[11px] font-semibold text-emerald-300 uppercase tracking-wider">
                  Monthly Tax Withholding
                </div>
                <div className="text-2xl font-black mt-1 text-white tracking-tight">
                  PKR {result.monthlyWithholding.toLocaleString()}
                </div>
                <div className="text-[10px] text-slate-300 mt-1">
                  Deducted at source under Sec 149
                </div>
              </div>

              {/* Annual Tax Card */}
              <div className="bg-white rounded-2xl p-4.5 border border-slate-200 shadow-xs">
                <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  Total Annual Tax
                </div>
                <div className="text-2xl font-black mt-1 text-slate-900 tracking-tight">
                  PKR {result.netAnnualTax.toLocaleString()}
                </div>
                <div className="text-[10px] font-semibold text-emerald-700 mt-1">
                  Effective Rate: {result.effectiveTaxRate}%
                </div>
              </div>

              {/* Monthly Take-Home */}
              <div className="bg-white rounded-2xl p-4.5 border border-slate-200 shadow-xs">
                <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  Net Monthly Take-Home
                </div>
                <div className="text-2xl font-black mt-1 text-slate-900 tracking-tight">
                  PKR {result.takeHomeMonthly.toLocaleString()}
                </div>
                <div className="text-[10px] text-slate-500 mt-1">
                  Annual: PKR {result.takeHomeAnnual.toLocaleString()}
                </div>
              </div>

            </div>
          )}

          {/* Detailed Computation Ledger */}
          {result && (
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-xs font-bold text-slate-900 flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-emerald-600" />
                  <span>Itemized Tax Computation Breakdown</span>
                </h3>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {result.applicableSlab}
                </span>
              </div>

              <div className="divide-y divide-slate-100 text-xs mt-2">
                <div className="py-2 flex justify-between">
                  <span className="text-slate-600">Gross Total Income:</span>
                  <span className="font-bold text-slate-900">PKR {result.grossAnnualIncome.toLocaleString()}</span>
                </div>
                <div className="py-2 flex justify-between text-emerald-800">
                  <span>Deductible Allowances (Sec 60, 60D, PF):</span>
                  <span className="font-bold">- PKR {(result.totalDeductions || (result.grossAnnualIncome - result.taxableIncome)).toLocaleString()}</span>
                </div>
                <div className="py-2 flex justify-between bg-slate-50 px-2.5 rounded-lg my-1">
                  <span className="font-bold text-slate-800">Taxable Net Income (Progressive Base):</span>
                  <span className="font-black text-slate-950">PKR {result.taxableIncome.toLocaleString()}</span>
                </div>
                {result.fixedTax > 0 && (
                  <div className="py-2 flex justify-between">
                    <span className="text-slate-600">Base Slab Fixed Tax:</span>
                    <span className="font-bold text-slate-900">PKR {result.fixedTax.toLocaleString()}</span>
                  </div>
                )}
                {result.rateOnExcess > 0 && (
                  <div className="py-2 flex justify-between">
                    <span className="text-slate-600">Tax on excess ({result.excessAmount.toLocaleString()} @ {result.rateOnExcess}%):</span>
                    <span className="font-bold text-slate-900">PKR {Math.round(result.excessAmount * (result.rateOnExcess / 100)).toLocaleString()}</span>
                  </div>
                )}
                {result.taxCredits > 0 && (
                  <div className="py-2 flex justify-between text-emerald-700 font-semibold">
                    <span>Tax Credits / Rebates Applied (Sec 61, 63):</span>
                    <span>- PKR {result.taxCredits.toLocaleString()}</span>
                  </div>
                )}
                <div className="py-2.5 flex justify-between text-sm font-black text-emerald-950 bg-emerald-50/80 px-3 rounded-lg mt-1 border border-emerald-200">
                  <span>Net Annual Tax Payable:</span>
                  <span>PKR {result.netAnnualTax.toLocaleString()}</span>
                </div>
              </div>
            </div>
          )}

          {/* Module 2: Filer vs Non-Filer Comparison Widget */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Scale className="w-4 h-4 text-emerald-600" />
                <h3 className="text-xs font-bold text-slate-900">Filer vs Non-Filer Withholding Comparison Widget</h3>
              </div>
              <span className="text-[10px] font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded border border-amber-300">
                Tenth Schedule Penal Withholding
              </span>
            </div>

            {/* Comparison Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              
              {/* Cash Withdrawal */}
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1.5">
                <label className="text-[11px] font-bold text-slate-800 flex items-center gap-1">
                  <Landmark className="w-3 h-3 text-emerald-600" />
                  a) Cash Withdrawal (Sec 231A)
                </label>
                <input
                  type="number"
                  value={cashWithdrawalAmount}
                  onChange={(e) => setCashWithdrawalAmount(Number(e.target.value))}
                  placeholder="100000"
                  className="w-full px-2.5 py-1.5 text-xs font-bold bg-white border border-slate-200 rounded-lg outline-none"
                />
                <span className="text-[10px] text-slate-500 block">&gt;50k/day (0% vs 0.8%)</span>
              </div>

              {/* Bank Profit on Debt */}
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1.5">
                <label className="text-[11px] font-bold text-slate-800 flex items-center gap-1">
                  <Percent className="w-3 h-3 text-indigo-600" />
                  b) Bank Profit (Sec 151)
                </label>
                <input
                  type="number"
                  value={bankProfitAmount}
                  onChange={(e) => setBankProfitAmount(Number(e.target.value))}
                  placeholder="500000"
                  className="w-full px-2.5 py-1.5 text-xs font-bold bg-white border border-slate-200 rounded-lg outline-none"
                />
                <span className="text-[10px] text-slate-500 block">Savings yield (15% vs 30%)</span>
              </div>

              {/* Property Transfer */}
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1.5">
                <label className="text-[11px] font-bold text-slate-800 flex items-center gap-1">
                  <Home className="w-3 h-3 text-amber-600" />
                  c) Property Value (Sec 236K)
                </label>
                <input
                  type="number"
                  value={propertyValue}
                  onChange={(e) => setPropertyValue(Number(e.target.value))}
                  placeholder="20000000"
                  className="w-full px-2.5 py-1.5 text-xs font-bold bg-white border border-slate-200 rounded-lg outline-none"
                />
                <span className="text-[10px] text-slate-500 block">Purchase (1.25% vs 10.5%+)</span>
              </div>

            </div>

            {/* Side-by-Side Comparison Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                    <th className="py-2.5 px-3">Transaction Scope</th>
                    <th className="py-2.5 px-3 text-emerald-700">Active Filer Tax</th>
                    <th className="py-2.5 px-3 text-rose-700">Non-Filer Penal Tax</th>
                    <th className="py-2.5 px-3 text-right">Filer Savings</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 font-medium">
                      Cash Withdrawal &gt; 50k (PKR {cashWithdrawalAmount.toLocaleString()})
                    </td>
                    <td className="py-2.5 px-3 font-bold text-emerald-700">
                      PKR 0 <span className="text-[10px] font-normal text-slate-500">(0% Exempt)</span>
                    </td>
                    <td className="py-2.5 px-3 font-bold text-rose-700">
                      PKR {nonFilerCashTax.toLocaleString()} <span className="text-[10px] font-normal text-slate-500">(0.8%)</span>
                    </td>
                    <td className="py-2.5 px-3 text-right font-black text-emerald-600">
                      + PKR {cashSavings.toLocaleString()}
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 font-medium">
                      Bank Profit / Savings Yield (PKR {bankProfitAmount.toLocaleString()})
                    </td>
                    <td className="py-2.5 px-3 font-bold text-emerald-700">
                      PKR {filerBankProfitTax.toLocaleString()} <span className="text-[10px] font-normal text-slate-500">(15%)</span>
                    </td>
                    <td className="py-2.5 px-3 font-bold text-rose-700">
                      PKR {nonFilerBankProfitTax.toLocaleString()} <span className="text-[10px] font-normal text-slate-500">(30%)</span>
                    </td>
                    <td className="py-2.5 px-3 text-right font-black text-emerald-600">
                      + PKR {bankProfitSavings.toLocaleString()}
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 font-medium">
                      Property Purchase Sec 236K (PKR {propertyValue.toLocaleString()})
                    </td>
                    <td className="py-2.5 px-3 font-bold text-emerald-700">
                      PKR {filerPropertyTax.toLocaleString()} <span className="text-[10px] font-normal text-slate-500">(1.25%)</span>
                    </td>
                    <td className="py-2.5 px-3 font-bold text-rose-700">
                      PKR {nonFilerPropertyTax.toLocaleString()} <span className="text-[10px] font-normal text-slate-500">(10.5%)</span>
                    </td>
                    <td className="py-2.5 px-3 text-right font-black text-emerald-600">
                      + PKR {propertySavings.toLocaleString()}
                    </td>
                  </tr>

                  <tr className="bg-emerald-50/70 font-black text-xs text-slate-900">
                    <td className="py-3 px-3">Total Estimated Withholding Differential</td>
                    <td className="py-3 px-3 text-emerald-800">PKR {(filerCashTax + filerBankProfitTax + filerPropertyTax).toLocaleString()}</td>
                    <td className="py-3 px-3 text-rose-800">PKR {(nonFilerCashTax + nonFilerBankProfitTax + nonFilerPropertyTax).toLocaleString()}</td>
                    <td className="py-3 px-3 text-right text-emerald-700 text-sm">
                      Saved PKR {(cashSavings + bankProfitSavings + propertySavings).toLocaleString()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

          </div>

          {/* Reference Slab Table */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
            <h3 className="text-xs font-bold text-slate-900 mb-3 flex items-center justify-between">
              <span>Progressive Tax Slabs Reference (Tax Year 2025-2026)</span>
              <span className="text-[10px] font-normal text-slate-500">
                {taxpayerType === 'salaried' ? 'Salaried Slabs (Div I)' : 'Non-Salaried Slabs (Div I)'}
              </span>
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                    <th className="py-2 px-3">Taxable Income Bracket (PKR)</th>
                    <th className="py-2 px-3">Fixed Tax</th>
                    <th className="py-2 px-3">Rate on Excess</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {(taxpayerType === 'salaried' ? SALARIED_SLABS_2026 : NON_SALARIED_SLABS_2026).map((slab, i) => {
                    const isCurrent = result && result.taxableIncome > slab.min && result.taxableIncome <= slab.max;
                    return (
                      <tr 
                        key={i} 
                        className={`transition ${isCurrent ? 'bg-emerald-50/90 font-bold text-emerald-950' : 'hover:bg-slate-50'}`}
                      >
                        <td className="py-2 px-3">
                          {slab.min === 0 ? `Up to ${slab.max.toLocaleString()}` : slab.max === Infinity ? `Exceeding ${slab.min.toLocaleString()}` : `${(slab.min + 1).toLocaleString()} - ${slab.max.toLocaleString()}`}
                          {isCurrent && <span className="ml-2 text-[10px] text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded font-bold">Your Slab</span>}
                        </td>
                        <td className="py-2 px-3">PKR {slab.fixedTax.toLocaleString()}</td>
                        <td className="py-2 px-3">{slab.rate}%</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

