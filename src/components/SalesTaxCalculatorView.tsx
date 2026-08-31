import React, { useState } from 'react';
import {
  Calculator,
  Download,
  FileCheck,
  Building2,
  Users,
  ShieldCheck,
  AlertTriangle,
  Scale,
  Percent,
  Landmark,
  FileText,
  Info,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Receipt,
  QrCode,
  Layers,
  HelpCircle,
  ExternalLink,
  BookOpen,
  FolderOpen,
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import {
  SalesTaxCategory,
  BuyerStatus,
  SalesTaxCalculationResult,
  UserProfile
} from '../types';
import {
  calculateSalesTax,
  SALES_TAX_CATEGORIES,
  PROVINCIAL_TAX_PROFILES,
  SALES_TAX_STATUTES_REPO,
  StatuteRepoItem
} from '../utils/salesTaxEngine';

interface SalesTaxCalculatorViewProps {
  user?: UserProfile | null;
  onOpenPricing?: () => void;
  onNavigateToChat?: (initialPrompt: string) => void;
}

export const SalesTaxCalculatorView: React.FC<SalesTaxCalculatorViewProps> = ({
  user,
  onOpenPricing,
  onNavigateToChat
}) => {
  // --- Calculator States ---
  const [taxableValue, setTaxableValue] = useState<number>(5000000); // 5M PKR default
  const [category, setCategory] = useState<SalesTaxCategory>('goods_standard_18');
  const [buyerStatus, setBuyerStatus] = useState<BuyerStatus>('registered');
  const [inputTaxClaimed, setInputTaxClaimed] = useState<number>(450000); // 450k input tax
  const [includeFed, setIncludeFed] = useState<boolean>(false);
  const [fedRatePercent, setFedRatePercent] = useState<number>(10); // 10% default FED

  // --- Active Tab / Sub-Navigation ---
  const [activeSubTab, setActiveSubTab] = useState<'calculator' | 'provincial_matrix' | 'statute_repo' | 'annexure_c'>('calculator');

  // --- Selected Statute for Law Directory Preview Modal / Pane ---
  const [selectedStatute, setSelectedStatute] = useState<StatuteRepoItem | null>(SALES_TAX_STATUTES_REPO[0]);
  const [selectedProvinceCode, setSelectedProvinceCode] = useState<string>('PRA');

  // Calculation Execution
  const result: SalesTaxCalculationResult = calculateSalesTax(
    taxableValue,
    category,
    buyerStatus,
    inputTaxClaimed,
    includeFed,
    fedRatePercent
  );

  // Quick preset taxable amounts
  const valuePresets = [
    { label: '500K', val: 500000 },
    { label: '1 Million', val: 1000000 },
    { label: '2.5 Million', val: 2500000 },
    { label: '5 Million', val: 5000000 },
    { label: '10 Million', val: 10000000 },
    { label: '25 Million', val: 25000000 }
  ];

  // Quick export handler
  const handleExportSummary = () => {
    const textContent = `
========================================================================
     GOVERNMENT OF PAKISTAN - FEDERAL BOARD OF REVENUE (FBR)
     SALES TAX & FEDERAL EXCISE DUTY STATUTORY COMPUTATION DOSSIER
========================================================================
Generated on: ${new Date().toLocaleString()}
Statute: Sales Tax Act, 1990 & Relevant Provincial Acts
Compliance Period: Current Tax Period (Annexure-C Reconciliation)

[1] TRANSACTION PARAMETERS
------------------------------------------------------------------------
Taxable Value of Supply:     PKR ${result.taxableValue.toLocaleString()}
Category:                    ${result.categoryLabel}
Applicable Rate:             ${result.statutoryRate}%
Buyer Registration Status:   ${result.buyerStatus === 'registered' ? 'Registered with FBR (STRN Active)' : 'UNREGISTERED (Section 3(1A) 3% Surcharge)'}

[2] OUTPUT TAX LIABILITIES
------------------------------------------------------------------------
Base Output Tax:             PKR ${result.baseOutputTax.toLocaleString()}
Section 3(1A) Further Tax:   PKR ${result.furtherTaxAmount.toLocaleString()} (${result.furtherTaxRate}%)
Federal Excise Duty (FED):   PKR ${result.fedAmount.toLocaleString()}
TOTAL OUTPUT TAX LIABILITY:  PKR ${result.totalOutputTax.toLocaleString()}

[3] INPUT TAX ADJUSTMENT AUDIT (SECTION 7 & SECTION 8B)
------------------------------------------------------------------------
Input Tax Claimed (Purchases): PKR ${result.inputTaxClaimed.toLocaleString()}
Section 8B (90% Cap Limit):    PKR ${result.maxAdmissibleInputLimit.toLocaleString()} (90% of Base Output Tax)
Admissible Input Tax Credit:   PKR ${result.admissibleInputTaxCredit.toLocaleString()}
Carried-Forward to Next Month: PKR ${result.inadmissibleOrCarriedForwardInput.toLocaleString()}

[4] NET SETTLEMENT SUMMARY
------------------------------------------------------------------------
NET SALES TAX PAYABLE TO FBR:  PKR ${result.netSalesTaxPayable.toLocaleString()}
TOTAL TAX INVOICE AMOUNT:      PKR ${result.totalTaxInvoiceAmount.toLocaleString()}

[5] STATUTORY CITATIONS
------------------------------------------------------------------------
${result.statutoryCitations.map((c, i) => `${i + 1}. ${c}`).join('\n')}
========================================================================
`;
    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `FBR_Sales_Tax_Computation_${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
      
      {/* Top Banner Header - Matching Income Tax Dark Theme */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-emerald-900/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1.5">
              <Receipt className="w-3.5 h-3.5" />
              Sales Tax Act, 1990 & FED Act, 2005
            </span>
            <span className="text-xs text-slate-400 font-medium">Federal & Provincial (PRA, SRB, KPRA, BRA)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-3">
            <Scale className="w-7 h-7 text-emerald-400" />
            <span>Sales Tax & Federal Excise Duty (FED) Portal</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
            Deterministic statutory computation engine with Section 3(1A) 3% Further Tax rule, Section 8B 90% input tax capping limitation, provincial PST switcher, and codified law directory.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleExportSummary}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-black text-xs shadow-lg shadow-emerald-950/40 transition active:scale-98 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Export Annex-C Dossier</span>
          </button>
        </div>
      </div>

      {/* Top Navigation Bar / Sub-Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-slate-200 text-xs font-bold">
        {[
          { key: 'calculator', label: 'Sales Tax & FED Calculator', icon: Calculator },
          { key: 'provincial_matrix', label: 'Provincial PST Switcher (PRA / SRB / KPRA)', icon: Landmark },
          { key: 'annexure_c', label: 'Annexure-C Return Preview', icon: FileText },
          { key: 'statute_repo', label: 'Sales Tax & FED Laws Directory', icon: BookOpen },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveSubTab(tab.key as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition cursor-pointer whitespace-nowrap ${
                isActive
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* 2. LIVE KPI RESULT CARDS (Matching UI Style) */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        {/* KPI 1: TOTAL OUTPUT TAX */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-5 text-white shadow-md border border-slate-700">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">
              Total Output Tax
            </span>
            <span className="text-[10px] font-bold bg-slate-700/80 px-2 py-0.5 rounded text-emerald-300">
              {result.statutoryRate}% {result.furtherTaxRate > 0 ? `+ ${result.furtherTaxRate}% F.Tax` : ''}
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-black mt-2 text-white tracking-tight">
            PKR {result.totalOutputTax.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-300 mt-1 flex items-center gap-1.5">
            <span>Base Tax: PKR {result.baseOutputTax.toLocaleString()}</span>
            {result.furtherTaxAmount > 0 && (
              <span className="text-amber-400 font-bold">| +3% Further Tax: PKR {result.furtherTaxAmount.toLocaleString()}</span>
            )}
          </div>
        </div>

        {/* KPI 2: ADMISSIBLE INPUT TAX CREDIT */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Admissible Input Tax Credit
            </span>
            {result.is90PercentCapped ? (
              <span className="text-[10px] font-black bg-amber-100 text-amber-800 border border-amber-300 px-2 py-0.5 rounded-full flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" />
                Sec 8B 90% Cap Applied
              </span>
            ) : (
              <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                100% Adjusted (Sec 7)
              </span>
            )}
          </div>
          <div className="text-2xl sm:text-3xl font-black mt-2 text-emerald-700 tracking-tight">
            PKR {result.admissibleInputTaxCredit.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Claimed: PKR {result.inputTaxClaimed.toLocaleString()}
            {result.inadmissibleOrCarriedForwardInput > 0 && (
              <span className="text-rose-600 font-semibold ml-1">
                (Carry-fwd: PKR {result.inadmissibleOrCarriedForwardInput.toLocaleString()})
              </span>
            )}
          </div>
        </div>

        {/* KPI 3: NET SALES TAX PAYABLE TO FBR */}
        <div className="bg-gradient-to-br from-emerald-950 via-emerald-900 to-slate-900 rounded-2xl p-5 text-white shadow-md border border-emerald-700/60">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-emerald-300 uppercase tracking-wider">
              Net Sales Tax Payable to FBR
            </span>
            <span className="text-[10px] font-black bg-emerald-500 text-slate-950 px-2 py-0.5 rounded">
              Challan / CPR
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-black mt-2 text-emerald-300 tracking-tight">
            PKR {result.netSalesTaxPayable.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-300 mt-1 flex items-center justify-between">
            <span>Invoice Total: PKR {result.totalTaxInvoiceAmount.toLocaleString()}</span>
            <span className="text-emerald-400 font-semibold">e-Payment Due by 15th</span>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* MAIN VIEW CONTENTS: Split layout based on active tab */}
      {/* ========================================================================= */}

      {activeSubTab === 'calculator' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* LEFT COLUMN: Input Form & Configuration (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* 1. Category Selector Card */}
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <label className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-emerald-600" />
                  <span>1. Select Supply Category & Rate</span>
                </label>
                <span className="text-[10px] font-bold text-slate-500">Statutory Head</span>
              </div>

              <div className="space-y-2">
                {[
                  { id: 'goods_standard_18', label: 'Standard Taxable Goods', rate: '18%', desc: 'Sec 3(1) STA 1990 Federal standard rate' },
                  { id: 'services_pra_16', label: 'PRA - Punjab Services', rate: '16%', desc: 'Punjab Sales Tax on Services Act 2012' },
                  { id: 'services_srb_15', label: 'SRB - Sindh Services', rate: '15%', desc: 'Sindh Sales Tax on Services Act 2011' },
                  { id: 'services_kpra_15', label: 'KPRA - KPK Services', rate: '15%', desc: 'KP Finance Act 2013' },
                  { id: 'services_bra_15', label: 'BRA - Balochistan Services', rate: '15%', desc: 'Balochistan Sales Tax Act 2015' },
                  { id: 'services_ict_15', label: 'ICT - Islamabad Services', rate: '15%', desc: 'ICT Tax on Services Ordinance 2001' },
                  { id: 'tier1_retail_pos', label: 'Tier-1 Retailer (POS Integrated)', rate: '18%', desc: 'Real-time FBR POS fiscalized invoice' },
                  { id: 'third_schedule_retail', label: 'Third Schedule Goods (MRP)', rate: '18%', desc: 'Tax on printed Maximum Retail Price' },
                  { id: 'export_zero_rated_5th', label: 'Export / Zero-Rated (Fifth Sched)', rate: '0%', desc: 'Sec 4 & Fifth Schedule STA 1990' },
                  { id: 'exempt_goods_6th', label: 'Exempt Goods (Sixth Sched)', rate: '0%', desc: 'Sec 13 & Sixth Schedule STA 1990' },
                ].map((item) => {
                  const isSelected = category === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setCategory(item.id as SalesTaxCategory)}
                      className={`w-full p-3 rounded-2xl border text-left transition flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? 'bg-emerald-50/90 border-emerald-500 ring-1 ring-emerald-500 text-slate-950'
                          : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <div className="space-y-0.5">
                        <div className="text-xs font-bold flex items-center gap-1.5">
                          <span>{item.label}</span>
                        </div>
                        <div className="text-[10px] text-slate-500">{item.desc}</div>
                      </div>
                      <span className={`text-xs font-black px-2.5 py-1 rounded-xl shrink-0 ${
                        isSelected ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-800'
                      }`}>
                        {item.rate}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Taxable Value of Goods / Services Input */}
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <label className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                  <Calculator className="w-4 h-4 text-emerald-600" />
                  <span>2. Taxable Value of Supplies (Excl. Tax)</span>
                </label>
              </div>

              <div className="relative">
                <span className="absolute left-3.5 top-3 text-xs font-bold text-slate-500">PKR</span>
                <input
                  type="number"
                  value={taxableValue || ''}
                  onChange={(e) => setTaxableValue(Number(e.target.value))}
                  placeholder="5000000"
                  className="w-full pl-14 pr-4 py-2.5 text-sm font-black text-slate-950 bg-slate-50 border border-slate-300 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none"
                />
              </div>

              {/* Presets */}
              <div className="flex flex-wrap gap-1.5">
                {valuePresets.map((p) => (
                  <button
                    key={p.val}
                    type="button"
                    onClick={() => setTaxableValue(p.val)}
                    className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 border border-slate-200 transition cursor-pointer"
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Buyer Status Toggle (Section 3(1A) 3% Further Tax) */}
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-indigo-600" />
                  <span>3. Buyer Registration Status</span>
                </label>
                <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                  Sec 3(1A) STA 1990
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => setBuyerStatus('registered')}
                  className={`p-3 rounded-2xl border text-left transition flex flex-col gap-1 cursor-pointer ${
                    buyerStatus === 'registered'
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-950 ring-1 ring-emerald-500'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold">Registered Buyer</span>
                    <CheckCircle2 className={`w-3.5 h-3.5 ${buyerStatus === 'registered' ? 'text-emerald-600' : 'text-slate-300'}`} />
                  </div>
                  <div className="text-[10px] text-slate-500">STRN Active (0% Further Tax)</div>
                </button>

                <button
                  type="button"
                  onClick={() => setBuyerStatus('unregistered')}
                  className={`p-3 rounded-2xl border text-left transition flex flex-col gap-1 cursor-pointer ${
                    buyerStatus === 'unregistered'
                      ? 'bg-rose-50 border-rose-500 text-rose-950 ring-1 ring-rose-500'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-rose-900">Unregistered Buyer</span>
                    <AlertTriangle className={`w-3.5 h-3.5 ${buyerStatus === 'unregistered' ? 'text-rose-600' : 'text-slate-300'}`} />
                  </div>
                  <div className="text-[10px] text-rose-700 font-semibold">+3% Further Tax Penal Surcharge</div>
                </button>
              </div>
            </div>

            {/* 4. Input Tax Credit Input (Section 7 & Section 8B) */}
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                  <Receipt className="w-4 h-4 text-emerald-600" />
                  <span>4. Input Tax Paid on Purchases (Sec 7)</span>
                </label>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  90% Cap Rule (Sec 8B)
                </span>
              </div>

              <div className="relative">
                <span className="absolute left-3.5 top-2.5 text-xs font-bold text-slate-500">PKR</span>
                <input
                  type="number"
                  value={inputTaxClaimed || ''}
                  onChange={(e) => setInputTaxClaimed(Number(e.target.value))}
                  placeholder="450000"
                  className="w-full pl-14 pr-4 py-2 text-xs font-bold text-slate-950 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none"
                />
              </div>

              <div className="text-[10px] text-slate-500 flex items-start gap-1 leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-200/80">
                <Info className="w-3.5 h-3.5 text-slate-600 shrink-0 mt-0.5" />
                <span>
                  Under <strong>Section 8B of Sales Tax Act 1990</strong>, maximum allowable input tax credit is capped at <strong>90% of base output tax</strong>. Any excess credit is carried forward to subsequent tax periods.
                </span>
              </div>
            </div>

            {/* 5. Optional Federal Excise Duty (FED) */}
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-amber-600" />
                  <span>Federal Excise Duty (FED Act, 2005)</span>
                </label>
                <button
                  type="button"
                  onClick={() => setIncludeFed(!includeFed)}
                  className={`text-xs font-bold px-3 py-1 rounded-full transition cursor-pointer ${
                    includeFed
                      ? 'bg-amber-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {includeFed ? 'FED Enabled' : 'Enable FED'}
                </button>
              </div>

              {includeFed && (
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-600 font-semibold">Excisable Rate (%):</span>
                    <input
                      type="number"
                      value={fedRatePercent}
                      onChange={(e) => setFedRatePercent(Number(e.target.value))}
                      className="w-20 px-2 py-1 text-xs font-bold text-right bg-slate-50 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <div className="text-[11px] text-amber-800 bg-amber-50 p-2 rounded-xl border border-amber-200 flex justify-between">
                    <span>Computed FED Amount:</span>
                    <strong className="font-bold">PKR {result.fedAmount.toLocaleString()}</strong>
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* RIGHT COLUMN: Itemized Tax Computation & Ledger (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            
            {/* 3. ITEMIZED TAX COMPUTATION BREAKDOWN */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-800 font-black text-sm">
                    <FileCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-slate-950">
                      Itemized Sales Tax & FED Computation Breakdown
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      Statutory audit trail adhering to Sections 3, 3(1A), 7 & 8B of Sales Tax Act, 1990.
                    </p>
                  </div>
                </div>

                <span className="text-[10px] font-black text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  {result.categoryLabel}
                </span>
              </div>

              {/* Breakdown Ledger Table */}
              <div className="divide-y divide-slate-100 text-xs">
                
                {/* Row 1: Taxable Supply Value */}
                <div className="py-3 flex justify-between items-center">
                  <div className="space-y-0.5">
                    <span className="font-bold text-slate-900">1. Taxable Value of Supplies / Turnover:</span>
                    <div className="text-[10px] text-slate-500">Gross supply value before tax</div>
                  </div>
                  <span className="font-mono font-bold text-slate-900 text-sm">
                    PKR {result.taxableValue.toLocaleString()}
                  </span>
                </div>

                {/* Row 2: Standard Base Output Tax */}
                <div className="py-3 flex justify-between items-center">
                  <div className="space-y-0.5">
                    <span className="font-bold text-slate-900 flex items-center gap-1.5">
                      <span>2. Base Output Tax ({result.statutoryRate}%):</span>
                    </span>
                    <div className="text-[10px] text-slate-500">Under {SALES_TAX_CATEGORIES[category]?.statute}</div>
                  </div>
                  <span className="font-mono font-bold text-slate-900 text-sm">
                    PKR {result.baseOutputTax.toLocaleString()}
                  </span>
                </div>

                {/* Row 3: Section 3(1A) 3% Further Tax */}
                <div className="py-3 flex justify-between items-center">
                  <div className="space-y-0.5">
                    <span className={`font-bold flex items-center gap-1.5 ${result.furtherTaxAmount > 0 ? 'text-rose-700' : 'text-slate-700'}`}>
                      <span>3. Section 3(1A) Further Tax (3%):</span>
                      {result.furtherTaxAmount > 0 && (
                        <span className="text-[10px] bg-rose-100 text-rose-800 px-1.5 py-0.2 rounded font-black">
                          Unregistered Penalty
                        </span>
                      )}
                    </span>
                    <div className="text-[10px] text-slate-500">
                      {result.furtherTaxAmount > 0
                        ? 'Mandatory 3% surcharge on supplies to unregistered persons'
                        : '0% (Exempt - Buyer is Active Registered STRN)'}
                    </div>
                  </div>
                  <span className={`font-mono font-bold text-sm ${result.furtherTaxAmount > 0 ? 'text-rose-700' : 'text-slate-600'}`}>
                    + PKR {result.furtherTaxAmount.toLocaleString()}
                  </span>
                </div>

                {/* Row 4: Federal Excise Duty (if enabled) */}
                {result.fedAmount > 0 && (
                  <div className="py-3 flex justify-between items-center text-amber-900">
                    <div className="space-y-0.5">
                      <span className="font-bold">4. Federal Excise Duty ({result.fedRate}% FED):</span>
                      <div className="text-[10px] text-amber-700">Federal Excise Act, 2005 (First Schedule)</div>
                    </div>
                    <span className="font-mono font-bold text-sm">
                      + PKR {result.fedAmount.toLocaleString()}
                    </span>
                  </div>
                )}

                {/* Row 5: Gross Output Tax Summary */}
                <div className="py-3 flex justify-between items-center bg-slate-50/80 px-3 rounded-xl my-1">
                  <div className="space-y-0.5">
                    <span className="font-black text-slate-900">Gross Output Tax Liability:</span>
                    <div className="text-[10px] text-slate-500">Base Output Tax + Further Tax + FED</div>
                  </div>
                  <span className="font-mono font-black text-slate-950 text-base">
                    PKR {(result.totalOutputTax + result.fedAmount).toLocaleString()}
                  </span>
                </div>

                {/* Row 6: Section 7 & 8B Input Tax Credit */}
                <div className="py-3 flex justify-between items-center text-emerald-800">
                  <div className="space-y-0.5">
                    <span className="font-bold flex items-center gap-1.5">
                      <span>5. Admissible Input Tax Credit:</span>
                      {result.is90PercentCapped && (
                        <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded font-bold border border-amber-300">
                          Sec 8B Capped @ 90%
                        </span>
                      )}
                    </span>
                    <div className="text-[10px] text-slate-500">
                      Input Claimed: PKR {result.inputTaxClaimed.toLocaleString()} | Cap Limit: PKR {result.maxAdmissibleInputLimit.toLocaleString()}
                    </div>
                  </div>
                  <span className="font-mono font-black text-emerald-700 text-sm">
                    - PKR {result.admissibleInputTaxCredit.toLocaleString()}
                  </span>
                </div>

                {/* Row 7: Carry Forward Credit (if capped) */}
                {result.inadmissibleOrCarriedForwardInput > 0 && (
                  <div className="py-2.5 flex justify-between items-center text-slate-600 bg-amber-50/60 px-3 rounded-xl">
                    <div className="space-y-0.5">
                      <span className="font-bold text-amber-900 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 text-amber-700" />
                        Inadmissible / Carried Forward Input (Sec 8B):
                      </span>
                      <div className="text-[10px] text-amber-700">Eligible for adjustment in subsequent monthly returns</div>
                    </div>
                    <span className="font-mono font-bold text-amber-900">
                      PKR {result.inadmissibleOrCarriedForwardInput.toLocaleString()}
                    </span>
                  </div>
                )}

                {/* Row 8: Net Payable Box */}
                <div className="py-4 flex justify-between items-center bg-gradient-to-r from-emerald-950 to-slate-900 text-white px-4 rounded-2xl my-2">
                  <div className="space-y-0.5">
                    <span className="text-sm font-black text-emerald-300">
                      NET SALES TAX PAYABLE (FBR CHALLAN):
                    </span>
                    <div className="text-[11px] text-slate-300">
                      To be deposited via FBR e-Payment PSID by 15th
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono font-black text-xl text-emerald-300">
                      PKR {result.netSalesTaxPayable.toLocaleString()}
                    </div>
                    <div className="text-[10px] text-slate-400 font-medium">Annexure-C CPR Match</div>
                  </div>
                </div>

                {/* Row 9: Total Tax Invoice Value */}
                <div className="py-3 flex justify-between items-center text-slate-800">
                  <div className="space-y-0.5">
                    <span className="font-bold">Total Customer Tax Invoice Amount:</span>
                    <div className="text-[10px] text-slate-500">Taxable Value + Total Tax Charged</div>
                  </div>
                  <span className="font-mono font-black text-slate-950 text-base">
                    PKR {result.totalTaxInvoiceAmount.toLocaleString()}
                  </span>
                </div>

              </div>

              {/* Statutory Citations Footer */}
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 space-y-1.5">
                <div className="text-[11px] font-bold text-slate-800 flex items-center gap-1.5">
                  <Scale className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Statutory Legal Citations Enforced:</span>
                </div>
                <ul className="space-y-1 text-[10px] text-slate-600 list-disc list-inside">
                  {result.statutoryCitations.map((c, i) => (
                    <li key={i} className="leading-relaxed">{c}</li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Tier-1 POS Integration Banner */}
            <div className="bg-gradient-to-r from-slate-900 to-indigo-950 rounded-3xl p-5 text-white border border-indigo-900/60 shadow-xs flex items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center shrink-0">
                  <QrCode className="w-5 h-5 text-indigo-300" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-xs font-black text-white">Tier-1 Retailer Real-Time POS Verification</h4>
                  <p className="text-[11px] text-slate-300">
                    Mandatory fiscal QR-code printing & central FBR invoicing engine synchronization under Section 40C.
                  </p>
                </div>
              </div>
              {onNavigateToChat && (
                <button
                  onClick={() => onNavigateToChat('Provide the complete Tier-1 Retailer POS Integration technical checklist, SRO 1006(I)/2021 compliance, and Section 33 penalty structure for unregistered retail businesses.')}
                  className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs shrink-0 transition cursor-pointer"
                >
                  Consult POS Law
                </button>
              )}
            </div>

          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: PROVINCIAL SALES TAX (PST) SWITCHER */}
      {/* ========================================================================= */}
      {activeSubTab === 'provincial_matrix' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
              <div>
                <h3 className="text-base font-black text-slate-950 flex items-center gap-2">
                  <Landmark className="w-5 h-5 text-emerald-600" />
                  <span>Provincial Sales Tax (PST) Harmonization & Cross-Jurisdiction Matrix</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Comparative rates, withholding agent mandates, and IT/software export concessions across all 5 revenue jurisdictions.
                </p>
              </div>

              {/* Province Selector Pills */}
              <div className="flex flex-wrap gap-1.5">
                {PROVINCIAL_TAX_PROFILES.map((p) => (
                  <button
                    key={p.code}
                    onClick={() => setSelectedProvinceCode(p.code)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-black transition cursor-pointer ${
                      selectedProvinceCode === p.code
                        ? 'bg-emerald-950 text-emerald-300 ring-2 ring-emerald-500 shadow-sm'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    {p.code} ({p.name})
                  </button>
                ))}
              </div>
            </div>

            {/* Detailed Cards for all Provinces */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {PROVINCIAL_TAX_PROFILES.map((p) => {
                const isSelected = selectedProvinceCode === p.code;
                return (
                  <div
                    key={p.code}
                    className={`p-5 rounded-3xl border transition space-y-4 flex flex-col justify-between ${
                      isSelected
                        ? 'bg-emerald-50/60 border-emerald-500 shadow-md ring-1 ring-emerald-500'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-xs font-black px-2.5 py-0.5 rounded-md bg-slate-900 text-white">
                            {p.code}
                          </span>
                          <h4 className="text-sm font-black text-slate-950 mt-1.5">{p.name}</h4>
                          <div className="text-[11px] text-slate-500 font-semibold">{p.authority}</div>
                        </div>
                        <span className="text-lg font-black text-emerald-700 bg-white px-3 py-1 rounded-2xl border border-emerald-200 shadow-xs">
                          {p.standardRate}
                        </span>
                      </div>

                      <div className="text-xs space-y-2 pt-2 border-t border-slate-200/60">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-slate-400 block">Governing Statute:</span>
                          <span className="text-slate-800 font-semibold text-[11px]">{p.statute}</span>
                        </div>
                        <div>
                          <span className="text-[10px] uppercase font-bold text-slate-400 block">IT / Software Services Rate:</span>
                          <span className="text-emerald-800 font-bold text-[11px]">{p.itSoftwareRate}</span>
                        </div>
                        <div>
                          <span className="text-[10px] uppercase font-bold text-slate-400 block">Withholding Rules:</span>
                          <span className="text-slate-700 text-[11px]">{p.withholdingRule}</span>
                        </div>
                      </div>

                      <p className="text-[11px] text-slate-600 bg-white/80 p-2.5 rounded-xl border border-slate-200 leading-relaxed">
                        {p.notes}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        const targetCat =
                          p.code === 'PRA' ? 'services_pra_16' :
                          p.code === 'SRB' ? 'services_srb_15' :
                          p.code === 'KPRA' ? 'services_kpra_15' :
                          p.code === 'BRA' ? 'services_bra_15' : 'services_ict_15';
                        setCategory(targetCat as SalesTaxCategory);
                        setActiveSubTab('calculator');
                      }}
                      className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-emerald-950 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
                    >
                      <span>Load into Calculator</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: ANNEXURE-C RETURN PREVIEW */}
      {/* ========================================================================= */}
      {activeSubTab === 'annexure_c' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-xs font-black">
                  FBR Iris 2.0 Template
                </span>
                <h3 className="text-base font-black text-slate-950">
                  Electronic Sales Tax Return Annexure-C (Domestic Sales Invoice Data)
                </h3>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Prescribed format for Section 26 monthly electronic submission and CPR challan reconciliation.
              </p>
            </div>

            <button
              onClick={handleExportSummary}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-emerald-900 text-white font-bold text-xs transition cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download Text Format</span>
            </button>
          </div>

          {/* Simulated Annexure-C Table */}
          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white font-bold">
                  <th className="py-3 px-3">Sr.</th>
                  <th className="py-3 px-3">Buyer NTN / CNIC</th>
                  <th className="py-3 px-3">Buyer Name</th>
                  <th className="py-3 px-3">Document Type</th>
                  <th className="py-3 px-3">HS Code / Head</th>
                  <th className="py-3 px-3 text-right">Taxable Value</th>
                  <th className="py-3 px-3 text-right">Sales Tax</th>
                  <th className="py-3 px-3 text-right">Further Tax</th>
                  <th className="py-3 px-3 text-right">Total Invoice</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white text-slate-800">
                <tr className="hover:bg-slate-50">
                  <td className="py-3 px-3 font-mono">01</td>
                  <td className="py-3 px-3 font-mono font-bold text-emerald-800">
                    {buyerStatus === 'registered' ? '7492810-4' : '35201-9876543-1 (Unregistered)'}
                  </td>
                  <td className="py-3 px-3 font-medium">
                    {buyerStatus === 'registered' ? 'Al-Meezan Trading Corp (Pvt) Ltd' : 'Direct Cash Consumer'}
                  </td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold">Sales Invoice</span>
                  </td>
                  <td className="py-3 px-3 font-mono text-[11px]">{category}</td>
                  <td className="py-3 px-3 text-right font-mono font-bold">
                    PKR {result.taxableValue.toLocaleString()}
                  </td>
                  <td className="py-3 px-3 text-right font-mono text-emerald-700 font-bold">
                    PKR {result.baseOutputTax.toLocaleString()}
                  </td>
                  <td className="py-3 px-3 text-right font-mono text-rose-700 font-bold">
                    PKR {result.furtherTaxAmount.toLocaleString()}
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-black text-slate-950">
                    PKR {result.totalTaxInvoiceAmount.toLocaleString()}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1.5 text-xs">
              <span className="font-bold text-slate-900 block">Input Tax Verification Note:</span>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                Annexure-A purchase matching is automatically cross-referenced against seller CPR challans in the FASTER system to prevent fraudulent claims.
              </p>
            </div>
            <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200 space-y-1.5 text-xs text-emerald-950">
              <span className="font-bold block">FBR Filing Schedule Reminder:</span>
              <p className="text-emerald-800 text-[11px] leading-relaxed">
                Sales Tax liability must be deposited by the <strong>15th of each month</strong>, and the final electronic return (Annex-C) must be submitted by the <strong>18th</strong>.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: INTEGRATED SALES TAX & FED LAWS DIRECTORY */}
      {/* ========================================================================= */}
      {activeSubTab === 'statute_repo' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left List of Statutes (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            <div className="text-xs font-black text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <FolderOpen className="w-4 h-4 text-emerald-600" />
              <span>Codified Sales Tax & FED Statutes</span>
            </div>

            {SALES_TAX_STATUTES_REPO.map((statute) => {
              const isSelected = selectedStatute?.id === statute.id;
              return (
                <button
                  key={statute.id}
                  onClick={() => setSelectedStatute(statute)}
                  className={`w-full p-4.5 rounded-3xl border text-left transition cursor-pointer space-y-2 ${
                    isSelected
                      ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-emerald-500'
                      : 'bg-white border-slate-200 hover:border-slate-300 text-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full ${
                      isSelected ? 'bg-emerald-500 text-slate-950' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {statute.badge}
                    </span>
                    <span className={`text-[11px] font-mono ${isSelected ? 'text-slate-400' : 'text-slate-500'}`}>
                      {statute.year}
                    </span>
                  </div>

                  <h4 className={`text-sm font-black ${isSelected ? 'text-white' : 'text-slate-950'}`}>
                    {statute.title}
                  </h4>

                  <p className={`text-[11px] line-clamp-2 leading-relaxed ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                    {statute.summary}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100/20 text-[11px]">
                    <span className={isSelected ? 'text-emerald-400' : 'text-slate-600'}>
                      {statute.sectionsCount}
                    </span>
                    <ChevronRight className={`w-4 h-4 ${isSelected ? 'text-emerald-400' : 'text-slate-400'}`} />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Selected Statute Reader (7 cols) */}
          <div className="lg:col-span-7">
            {selectedStatute ? (
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-5">
                
                <div className="flex items-start justify-between border-b border-slate-100 pb-4">
                  <div className="space-y-1">
                    <span className="text-xs font-black px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 inline-block">
                      {selectedStatute.badge}
                    </span>
                    <h3 className="text-xl font-black text-slate-950 mt-1">
                      {selectedStatute.title}
                    </h3>
                    <div className="text-xs font-medium text-slate-500 font-mono">
                      {selectedStatute.fullReference}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                    Executive Statutory Overview
                  </h4>
                  <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200">
                    {selectedStatute.summary}
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Key Sections & Operational Directives</span>
                  </h4>
                  
                  <div className="space-y-2">
                    {selectedStatute.keyHighlights.map((hl, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-white border border-slate-200/80 hover:border-emerald-300 hover:bg-emerald-50/30 transition text-xs font-medium text-slate-800 flex items-start gap-2"
                      >
                        <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-black text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span className="leading-relaxed">{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {onNavigateToChat && (
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-500">Need specific legal drafting or interpretation?</span>
                    <button
                      onClick={() => onNavigateToChat(`Provide full statutory interpretation and case law precedents for ${selectedStatute.title}.`)}
                      className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-emerald-950 text-white font-bold text-xs flex items-center gap-1.5 transition cursor-pointer"
                    >
                      <span>Ask AI Tax Counsel</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

              </div>
            ) : (
              <div className="bg-slate-50 rounded-3xl border border-dashed border-slate-300 p-12 text-center text-slate-400">
                Select a statute from the directory to inspect provisions.
              </div>
            )}
          </div>

        </div>
      )}

    </div>
  );
};
