import React, { useState } from 'react';
import {
  Zap,
  Calculator,
  Search,
  Download,
  Filter,
  ShieldCheck,
  Building,
  Building2,
  TrendingUp,
  Percent,
  Layers,
  Scale,
  Landmark,
  FileCheck,
  Receipt,
  FileSpreadsheet,
  AlertCircle,
  Copy,
  Check,
  Sparkles,
  ArrowRight,
  Info,
  ChevronRight,
  HelpCircle,
  Eye,
  Sliders,
  DollarSign,
  Car,
  CreditCard,
  Briefcase,
  Globe
} from 'lucide-react';
import { UserProfile } from '../types';
import {
  calculateSuperTax,
  SUPER_TAX_BANDS,
  SuperTaxEntityType,
  SpecifiedIndustryType,
  SuperTaxCalculationInput,
  SuperTaxCalculationOutput
} from '../utils/superTaxEngine';
import {
  WHT_DIRECTORY_DATA,
  WHTProvision,
  WHTCategory,
  calculateWHTQuick,
  WHTQuickCalculationResult
} from '../utils/whtDatabase';

interface SuperTaxEngineViewProps {
  user?: UserProfile | null;
  onOpenPricing?: () => void;
  onNavigateToChat?: (initialPrompt: string) => void;
}

export const SuperTaxEngineView: React.FC<SuperTaxEngineViewProps> = ({
  user,
  onOpenPricing,
  onNavigateToChat
}) => {
  // Main Module Active View
  const [activeModuleTab, setActiveModuleTab] = useState<'super_tax_engine' | 'wht_rate_finder' | 'statute_matrix'>('super_tax_engine');

  // --- Section 4C Super Tax States ---
  const [highNetIncome, setHighNetIncome] = useState<number>(350000000); // PKR 350 Million default
  const [entityType, setEntityType] = useState<SuperTaxEntityType>('company');
  const [specifiedIndustry, setSpecifiedIndustry] = useState<SpecifiedIndustryType>('none');
  const [taxYear, setTaxYear] = useState<string>('2025');
  const [includeWWF, setIncludeWWF] = useState<boolean>(true); // Workers Welfare Fund 2%
  const [includeWPPF, setIncludeWPPF] = useState<boolean>(true); // Workers Profit Participation 5%
  const [isSmallCompany, setIsSmallCompany] = useState<boolean>(false);

  // --- WHT Rate Finder States ---
  const [whtSearchQuery, setWhtSearchQuery] = useState<string>('');
  const [whtCategoryFilter, setWhtCategoryFilter] = useState<string>('all');
  const [whtNatureFilter, setWhtNatureFilter] = useState<string>('all');
  const [selectedWhtItem, setSelectedWhtItem] = useState<WHTProvision>(WHT_DIRECTORY_DATA[0]);
  const [simulatedGrossAmount, setSimulatedGrossAmount] = useState<number>(2500000); // PKR 2.5M
  const [comparisonMode, setComparisonMode] = useState<'side_by_side' | 'filer_focus' | 'non_filer_focus'>('side_by_side');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Super Tax Calculation
  const superTaxInput: SuperTaxCalculationInput = {
    taxYear,
    highNetIncome,
    entityType,
    specifiedIndustry,
    includeWWF,
    includeWPPF,
    isSmallCompany
  };
  const superTaxResult: SuperTaxCalculationOutput = calculateSuperTax(superTaxInput);

  // Quick WHT Simulator Calculation
  const whtCalcResult: WHTQuickCalculationResult = calculateWHTQuick(selectedWhtItem, simulatedGrossAmount);

  // Super Tax Income Presets
  const superTaxPresets = [
    { label: '120M (Exempt <150M)', val: 120000000 },
    { label: '180M (Band 1 - 1%)', val: 180000000 },
    { label: '230M (Band 2 - 2%)', val: 230000000 },
    { label: '280M (Band 3 - 3%)', val: 280000000 },
    { label: '350M (Band 4 - 4%)', val: 350000000 },
    { label: '450M (Band 6 - 8%)', val: 450000000 },
    { label: '750M (Max Band - 10%)', val: 750000000 }
  ];

  // Filtered WHT items
  const filteredWHTList = WHT_DIRECTORY_DATA.filter((item) => {
    const matchesSearch =
      item.sectionCode.toLowerCase().includes(whtSearchQuery.toLowerCase()) ||
      item.title.toLowerCase().includes(whtSearchQuery.toLowerCase()) ||
      item.statutoryBasis.toLowerCase().includes(whtSearchQuery.toLowerCase()) ||
      item.withholdingAgent.toLowerCase().includes(whtSearchQuery.toLowerCase());

    const matchesCat = whtCategoryFilter === 'all' || item.category === whtCategoryFilter;
    const matchesNature = whtNatureFilter === 'all' || item.nature === whtNatureFilter;

    return matchesSearch && matchesCat && matchesNature;
  });

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Export Super Tax & WHT Dossier
  const handleExportSuperTaxReport = () => {
    const textContent = `
========================================================================
     GOVERNMENT OF PAKISTAN - FEDERAL BOARD OF REVENUE (FBR)
     SAQIBTAX LEGAL AI - SECTION 4C SUPER TAX & WHT AUDIT DOSSIER
========================================================================
Generated At: ${new Date().toLocaleString()}
Statutory Authority: Section 4C & Division IIB, Part I, First Schedule

1. SECTION 4C SUPER TAX ASSESSMENT:
------------------------------------------------------------------------
- Tax Year: ${taxYear}
- Declared High-Net Income: PKR ${highNetIncome.toLocaleString()}
- Entity Classification: ${entityType.toUpperCase()} ${specifiedIndustry !== 'none' ? `(${specifiedIndustry.toUpperCase()})` : ''}
- Statutory Exemption Threshold: PKR 150,000,000 (Section 4C(1))
- Exemption Status: ${superTaxResult.isExempt ? 'EXEMPT (Income <= 150M)' : 'CHARGEABLE / TAXABLE'}
- Applicable Super Tax Rate: ${superTaxResult.superTaxRate}%
- Super Tax Payable: PKR ${superTaxResult.superTaxAmount.toLocaleString()}
- Applicable Statutory Slab: ${superTaxResult.applicableBandDescription}

2. NORMAL CORPORATE / BUSINESS INCOME TAX:
------------------------------------------------------------------------
- Normal Tax Rate: ${superTaxResult.normalTaxRate}%
- Normal Tax Liability: PKR ${superTaxResult.normalTaxAmount.toLocaleString()}

3. STATUTORY LEVIES & SURCHARGES:
------------------------------------------------------------------------
- Workers Welfare Fund (WWF 2% under WWF Ord 1971): PKR ${superTaxResult.wwfAmount.toLocaleString()}
- Workers Profit Participation (WPPF 5% under WPPF Act 1968): PKR ${superTaxResult.wppfAmount.toLocaleString()}

4. COMBINED TOTAL CORPORATE / BUSINESS TAX BURDEN:
------------------------------------------------------------------------
- GRAND TOTAL TAX & LEVIES PAYABLE: PKR ${superTaxResult.totalTaxBurden.toLocaleString()}
- EFFECTIVE COMBINED TAX RATE: ${superTaxResult.effectiveTaxRateCombined}%

5. STATUTORY COMPLIANCE DEADLINES:
------------------------------------------------------------------------
${superTaxResult.complianceDeadlines.map((d, i) => `${i + 1}. ${d}`).join('\n')}

========================================================================
Document generated automatically by SaqibTax Legal AI Engine.
========================================================================`;

    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `SaqibTax_SuperTax_Audit_${highNetIncome}_PKR.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div id="super-tax-wht-suite" className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Header Banner */}
      <div className="bg-slate-900/90 border-b border-slate-800/80 px-6 py-5 sticky top-0 z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-950/80 border border-amber-500/30 rounded-xl text-amber-400 shadow-sm shadow-amber-950">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-xl font-bold text-white tracking-tight">
                  Super Tax (Sec 4C) & WHT Rate Finder
                </h1>
                <span className="px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/30">
                  Section 4C • Division IIB • Section 236/150 WHT
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Dynamic high-net income super tax calculator (1% to 10%) and comprehensive Withholding Tax rate directory with Filer vs Non-Filer comparisons
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              id="btn-export-supertax-dossier"
              onClick={handleExportSuperTaxReport}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold rounded-lg transition-all shadow-sm"
              title="Export Super Tax & WHT Legal Dossier"
            >
              <Download className="w-4 h-4 text-amber-400" />
              <span>Export Tax Dossier</span>
            </button>

            {onNavigateToChat && (
              <button
                id="btn-ai-supertax-counsel"
                onClick={() =>
                  onNavigateToChat(
                    `I need senior legal counsel regarding Section 4C Super Tax calculation for an entity with taxable income of PKR ${highNetIncome.toLocaleString()} under Division IIB of the Income Tax Ordinance 2001. Please provide statutory guidance on advance tax installments, sector exemptions, and withholding tax reconciliation.`
                  )
                }
                className="flex items-center gap-1.5 px-3.5 py-2 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold text-xs rounded-lg shadow-sm transition-all"
              >
                <Sparkles className="w-4 h-4" />
                <span>Ask AI Tax Counsel</span>
              </button>
            )}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="max-w-7xl mx-auto mt-5 flex items-center gap-2 border-b border-slate-800 -mb-5 overflow-x-auto pb-0">
          <button
            id="tab-btn-supertax"
            onClick={() => setActiveModuleTab('super_tax_engine')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border-b-2 transition-all whitespace-nowrap ${
              activeModuleTab === 'super_tax_engine'
                ? 'border-amber-500 text-amber-400 bg-amber-950/20'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>Section 4C Super Tax Engine</span>
          </button>

          <button
            id="tab-btn-wht-finder"
            onClick={() => setActiveModuleTab('wht_rate_finder')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border-b-2 transition-all whitespace-nowrap ${
              activeModuleTab === 'wht_rate_finder'
                ? 'border-amber-500 text-amber-400 bg-amber-950/20'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            <Search className="w-4 h-4" />
            <span>Interactive WHT Rate Finder & Simulator</span>
          </button>

          <button
            id="tab-btn-statute-matrix"
            onClick={() => setActiveModuleTab('statute_matrix')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border-b-2 transition-all whitespace-nowrap ${
              activeModuleTab === 'statute_matrix'
                ? 'border-amber-500 text-amber-400 bg-amber-950/20'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Statutory Super Tax Slabs & Provisos</span>
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto w-full px-6 py-6 flex-1">
        {/* ========================================================= */}
        {/* VIEW 1: SUPER TAX ENGINE (SECTION 4C) */}
        {/* ========================================================= */}
        {activeModuleTab === 'super_tax_engine' && (
          <div className="space-y-6">
            {/* Live KPI Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* KPI 1: Super Tax Liability */}
              <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl relative overflow-hidden shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Super Tax Liability (Sec 4C)
                  </span>
                  <div className="p-1.5 bg-amber-500/10 text-amber-400 rounded-lg">
                    <Zap className="w-4 h-4" />
                  </div>
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-2xl font-black text-amber-400 tracking-tight">
                    {superTaxResult.isExempt ? 'NIL (EXEMPT)' : `PKR ${superTaxResult.superTaxAmount.toLocaleString()}`}
                  </span>
                </div>
                <div className="mt-2 text-[11px] text-slate-400 flex items-center gap-1.5">
                  <span className="font-bold text-amber-400">
                    Rate: {superTaxResult.superTaxRate}%
                  </span>
                  <span>• {superTaxResult.isExempt ? 'Income ≤ 150M' : 'Division IIB Slabs'}</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-amber-500" />
              </div>

              {/* KPI 2: Normal Income / Corporate Tax */}
              <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl relative overflow-hidden shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Normal Corporate Tax
                  </span>
                  <div className="p-1.5 bg-blue-500/10 text-blue-400 rounded-lg">
                    <Building2 className="w-4 h-4" />
                  </div>
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-2xl font-black text-white tracking-tight">
                    PKR {superTaxResult.normalTaxAmount.toLocaleString()}
                  </span>
                </div>
                <div className="mt-2 text-[11px] text-slate-400">
                  Rate: {superTaxResult.normalTaxRate}% ({entityType.toUpperCase()})
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500" />
              </div>

              {/* KPI 3: Combined Tax & Statutory Levies */}
              <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl relative overflow-hidden shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Total Tax & Levies
                  </span>
                  <div className="p-1.5 bg-emerald-500/10 text-emerald-400 rounded-lg">
                    <Receipt className="w-4 h-4" />
                  </div>
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-2xl font-black text-white tracking-tight">
                    PKR {superTaxResult.totalTaxBurden.toLocaleString()}
                  </span>
                </div>
                <div className="mt-2 text-[11px] text-slate-400">
                  Includes WWF (2%) & WPPF (5%) levies
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-500" />
              </div>

              {/* KPI 4: Effective Combined Tax Rate */}
              <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl relative overflow-hidden shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Effective Combined Tax Rate
                  </span>
                  <div className="p-1.5 bg-purple-500/10 text-purple-400 rounded-lg">
                    <Percent className="w-4 h-4" />
                  </div>
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-2xl font-black text-purple-400 tracking-tight">
                    {superTaxResult.effectiveTaxRateCombined}%
                  </span>
                </div>
                <div className="mt-2 text-[11px] text-slate-400">
                  Normal ({superTaxResult.normalTaxRate}%) + Super ({superTaxResult.superTaxRate}%) + Levies
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-purple-500" />
              </div>
            </div>

            {/* Main Interactive Calculation Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Form Inputs (7 Cols) */}
              <div className="lg:col-span-7 space-y-5">
                {/* 1. High-Net Income Input & Presets */}
                <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-xl space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                      <DollarSign className="w-4 h-4 text-amber-400" />
                      <span>1. Taxable High-Net Income (Section 4C Base)</span>
                    </label>
                    <span className="text-xs font-black text-amber-400 font-mono">
                      PKR {highNetIncome.toLocaleString()}
                    </span>
                  </div>

                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-400">
                      PKR
                    </span>
                    <input
                      type="number"
                      id="input-high-net-income"
                      min={0}
                      step={5000000}
                      value={highNetIncome}
                      onChange={(e) => setHighNetIncome(Number(e.target.value) || 0)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-14 pr-4 py-2.5 text-sm font-bold text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                      placeholder="e.g. 350,000,000"
                    />
                  </div>

                  {/* Income Presets */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <span className="text-[11px] text-slate-400 mr-1">Quick Slabs:</span>
                    {superTaxPresets.map((preset) => (
                      <button
                        key={preset.val}
                        type="button"
                        onClick={() => setHighNetIncome(preset.val)}
                        className={`px-2.5 py-1 text-[11px] font-semibold rounded-md border transition-all ${
                          highNetIncome === preset.val
                            ? 'bg-amber-600 text-slate-950 font-bold border-amber-500'
                            : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Business Entity Type & Tax Year */}
                <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-xl space-y-4">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                    <Building className="w-4 h-4 text-amber-400" />
                    <span>2. Business Entity Classification & Assessment Year</span>
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-400 mb-1.5">
                        Entity Structure
                      </label>
                      <select
                        id="select-entity-type"
                        value={entityType}
                        onChange={(e) => setEntityType(e.target.value as SuperTaxEntityType)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs font-semibold text-white focus:outline-none focus:border-amber-500"
                      >
                        <option value="company">Corporate / Private / Public Company (29%)</option>
                        <option value="banking_company">Banking Company (39% Corporate + 10% Super Tax)</option>
                        <option value="aop">Association of Persons (AOP / Partnership)</option>
                        <option value="individual">Sole Proprietor / Individual High Earner</option>
                        <option value="specified_industry">Specified High-Margin Sector (First Proviso)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-400 mb-1.5">
                        Tax Assessment Year
                      </label>
                      <select
                        id="select-tax-year"
                        value={taxYear}
                        onChange={(e) => setTaxYear(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs font-semibold text-white focus:outline-none focus:border-amber-500"
                      >
                        <option value="2026">Tax Year 2026 (Current Finance Act)</option>
                        <option value="2025">Tax Year 2025 (Progressive 1% - 10%)</option>
                        <option value="2024">Tax Year 2024 (Section 4C Enacted)</option>
                        <option value="2023">Tax Year 2023 (Initial Rollout)</option>
                      </select>
                    </div>
                  </div>

                  {/* Specified Industry Selector */}
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 mb-1.5">
                      Specified Industry Classification (First Proviso to Division IIB)
                    </label>
                    <select
                      id="select-specified-industry"
                      value={specifiedIndustry}
                      onChange={(e) => setSpecifiedIndustry(e.target.value as SpecifiedIndustryType)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs font-semibold text-white focus:outline-none focus:border-amber-500"
                    >
                      <option value="none">General Sector (Standard Slabs: 1% to 10% progressive)</option>
                      <option value="banking">Banking Companies (10% flat above 300M)</option>
                      <option value="cement">Cement Manufacturing (10% above 300M)</option>
                      <option value="fertilizer">Fertilizer Sector (10% above 300M)</option>
                      <option value="sugar">Sugar Mills (10% above 300M)</option>
                      <option value="oil_gas_exploration">Oil & Gas Exploration / Refineries (10% above 300M)</option>
                      <option value="textile">Textile Sector (10% above 300M)</option>
                      <option value="iron_steel">Iron & Steel Mills (10% above 300M)</option>
                      <option value="beverages">Beverages & Aerated Water (10% above 300M)</option>
                      <option value="cigarettes_tobacco">Cigarettes & Tobacco (10% above 300M)</option>
                      <option value="automobiles">Automobiles Assembly (10% above 300M)</option>
                      <option value="airlines">Airlines & Aviation (10% above 300M)</option>
                      <option value="lng_terminal">LNG Terminal Operators (10% above 300M)</option>
                    </select>
                  </div>
                </div>

                {/* 3. Statutory Levies & Small Company Toggles */}
                <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-xl space-y-3">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                    <Sliders className="w-4 h-4 text-amber-400" />
                    <span>3. Additional Statutory Levies & Concessions</span>
                  </label>

                  <div className="space-y-2">
                    <label className="flex items-center justify-between p-3 bg-slate-950 border border-slate-800 rounded-lg cursor-pointer hover:border-slate-700 transition-all">
                      <div className="text-xs">
                        <div className="font-semibold text-slate-200">
                          Workers Welfare Fund (WWF @ 2%)
                        </div>
                        <div className="text-[11px] text-slate-400">
                          Section 4 of the Workers Welfare Fund Ordinance, 1971 on accounting profit.
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={includeWWF}
                        onChange={(e) => setIncludeWWF(e.target.checked)}
                        className="w-4 h-4 text-amber-600 rounded bg-slate-900 border-slate-700 focus:ring-amber-500"
                      />
                    </label>

                    <label className="flex items-center justify-between p-3 bg-slate-950 border border-slate-800 rounded-lg cursor-pointer hover:border-slate-700 transition-all">
                      <div className="text-xs">
                        <div className="font-semibold text-slate-200">
                          Workers Profit Participation Fund (WPPF @ 5%)
                        </div>
                        <div className="text-[11px] text-slate-400">
                          Under the Companies Profits (Workers' Participation) Act, 1968.
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={includeWPPF}
                        onChange={(e) => setIncludeWPPF(e.target.checked)}
                        className="w-4 h-4 text-amber-600 rounded bg-slate-900 border-slate-700 focus:ring-amber-500"
                      />
                    </label>

                    <label className="flex items-center justify-between p-3 bg-slate-950 border border-slate-800 rounded-lg cursor-pointer hover:border-slate-700 transition-all">
                      <div className="text-xs">
                        <div className="font-semibold text-slate-200">
                          Small Company Concession (20% Corporate Rate)
                        </div>
                        <div className="text-[11px] text-slate-400">
                          Defined under Section 2(59A) of ITO 2001 (Capital &lt; 50M, Turnover &lt; 250M).
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={isSmallCompany}
                        onChange={(e) => setIsSmallCompany(e.target.checked)}
                        className="w-4 h-4 text-amber-600 rounded bg-slate-900 border-slate-700 focus:ring-amber-500"
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Right Column: Detailed Statutory Audit Ledger (5 Cols) */}
              <div className="lg:col-span-5 space-y-5">
                <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg sticky top-24">
                  <div className="bg-slate-850 px-5 py-4 border-b border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileCheck className="w-5 h-5 text-amber-400" />
                      <h3 className="text-sm font-bold text-white">
                        Section 4C Super Tax Computation Breakdown
                      </h3>
                    </div>
                    <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
                      Tax Year {taxYear}
                    </span>
                  </div>

                  <div className="p-5 space-y-4">
                    {/* Itemized Calculation List */}
                    <div className="space-y-3 text-xs">
                      {/* 1. Base Income */}
                      <div className="p-3 bg-slate-950/80 border border-slate-800/80 rounded-lg space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-200">
                            High-Net Taxable Income Base
                          </span>
                          <span className="font-mono font-bold text-white">
                            PKR {highNetIncome.toLocaleString()}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-400">
                          Exemption Threshold: PKR 150 Million (Section 4C(1))
                        </div>
                      </div>

                      {/* 2. Super Tax (Section 4C) */}
                      <div className="p-3 bg-amber-950/20 border border-amber-500/30 rounded-lg space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-amber-300">
                            Super Tax Liability (Sec 4C)
                          </span>
                          <span className="font-mono font-bold text-amber-400">
                            {superTaxResult.isExempt ? 'PKR 0 (EXEMPT)' : `PKR ${superTaxResult.superTaxAmount.toLocaleString()}`}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-[11px] text-slate-400">
                          <span>Applicable Rate: {superTaxResult.superTaxRate}%</span>
                          <span className="font-mono">{superTaxResult.applicableBandDescription}</span>
                        </div>
                      </div>

                      {/* 3. Normal Corporate Tax */}
                      <div className="p-3 bg-slate-950/80 border border-slate-800/80 rounded-lg space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-200">
                            Normal Corporate / Business Income Tax
                          </span>
                          <span className="font-mono font-bold text-blue-400">
                            PKR {superTaxResult.normalTaxAmount.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-[11px] text-slate-400">
                          <span>Statutory Rate: {superTaxResult.normalTaxRate}%</span>
                          <span>Adjustable Advance Tax</span>
                        </div>
                      </div>

                      {/* 4. WWF & WPPF Levies */}
                      {(includeWWF || includeWPPF) && (
                        <div className="p-3 bg-slate-950/80 border border-slate-800/80 rounded-lg space-y-1.5">
                          <div className="font-bold text-slate-200">Statutory Welfare Levies</div>
                          {includeWWF && (
                            <div className="flex items-center justify-between text-[11px] text-slate-300">
                              <span>Workers Welfare Fund (WWF @ 2%):</span>
                              <span className="font-mono font-semibold">PKR {superTaxResult.wwfAmount.toLocaleString()}</span>
                            </div>
                          )}
                          {includeWPPF && (
                            <div className="flex items-center justify-between text-[11px] text-slate-300">
                              <span>Workers Profit Participation (WPPF @ 5%):</span>
                              <span className="font-mono font-semibold">PKR {superTaxResult.wppfAmount.toLocaleString()}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Total Grand Summary Box */}
                    <div className="p-4 bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-950 border border-amber-500/40 rounded-xl space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase text-amber-300">
                          Grand Total Corporate Tax Burden
                        </span>
                        <span className="text-xl font-black text-white font-mono">
                          PKR {superTaxResult.totalTaxBurden.toLocaleString()}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-800">
                        <span className="text-slate-400">Effective Combined Tax Rate:</span>
                        <span className="font-bold text-amber-400 font-mono">
                          {superTaxResult.effectiveTaxRateCombined}%
                        </span>
                      </div>
                    </div>

                    {/* Statutory Citations & Deadlines */}
                    <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-lg space-y-2 text-xs">
                      <div className="flex items-center gap-1.5 font-bold text-slate-300">
                        <Scale className="w-3.5 h-3.5 text-amber-400" />
                        <span>Statutory Authority & Precedents</span>
                      </div>
                      <div className="space-y-1 text-[11px] text-slate-400">
                        <div>• Section 4C read with Division IIB, Part I, First Schedule</div>
                        <div>• Supreme Court interim order on Section 4C deposit condition (50% rule)</div>
                        <div>• Advance installments under Section 147 due quarterly</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* VIEW 2: INTERACTIVE WITHHOLDING TAX (WHT) RATE FINDER */}
        {/* ========================================================= */}
        {activeModuleTab === 'wht_rate_finder' && (
          <div className="space-y-6">
            {/* Top Filter & Search Bar */}
            <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-xl space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    id="input-wht-search"
                    value={whtSearchQuery}
                    onChange={(e) => setWhtSearchQuery(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    placeholder="Search by Section (e.g. 231AB, 236C, 231B, 151, 153), keyword, or Withholding Agent..."
                  />
                </div>

                {/* Comparison Mode Toggle */}
                <div className="flex items-center gap-1 bg-slate-950 p-1 border border-slate-800 rounded-lg">
                  <button
                    type="button"
                    onClick={() => setComparisonMode('side_by_side')}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                      comparisonMode === 'side_by_side'
                        ? 'bg-amber-600 text-slate-950 font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Filer vs Non-Filer
                  </button>
                  <button
                    type="button"
                    onClick={() => setComparisonMode('filer_focus')}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                      comparisonMode === 'filer_focus'
                        ? 'bg-emerald-600 text-white font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Active Filer Only
                  </button>
                  <button
                    type="button"
                    onClick={() => setComparisonMode('non_filer_focus')}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                      comparisonMode === 'non_filer_focus'
                        ? 'bg-red-600 text-white font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Non-Filer (10th Sched)
                  </button>
                </div>
              </div>

              {/* Category Chips */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[11px] font-bold text-slate-400 mr-1 flex items-center gap-1">
                  <Filter className="w-3.5 h-3.5 text-amber-400" />
                  Categories:
                </span>
                {[
                  { id: 'all', label: 'All Provisions' },
                  { id: 'banking_cash', label: 'Banking & Cash (231AB)' },
                  { id: 'real_estate', label: 'Real Estate (236C/236K)' },
                  { id: 'vehicles', label: 'Vehicles & Transport (231B)' },
                  { id: 'profit_on_debt', label: 'Profit on Debt (151)' },
                  { id: 'goods_services', label: 'Goods & Services (153)' },
                  { id: 'salary_dividend', label: 'Salary & Dividend (149/150)' },
                  { id: 'foreign_remittance', label: 'Foreign Cards (236Y)' },
                  { id: 'distribution_retail', label: 'Distribution (236G/H)' }
                ].map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setWhtCategoryFilter(cat.id)}
                    className={`px-2.5 py-1 text-[11px] font-semibold rounded-md border transition-all ${
                      whtCategoryFilter === cat.id
                        ? 'bg-amber-600 text-slate-950 font-bold border-amber-500'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Split Screen Layout: Directory Table (7 Cols) + Interactive Simulator (5 Cols) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Filterable WHT Table */}
              <div className="lg:col-span-7 space-y-3">
                <div className="flex items-center justify-between px-1">
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Statutory Provisions ({filteredWHTList.length} Found)
                  </span>
                  <span className="text-[11px] text-slate-400">Click any card to load simulator</span>
                </div>

                <div className="space-y-3 max-h-[750px] overflow-y-auto pr-1">
                  {filteredWHTList.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => setSelectedWhtItem(item)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer ${
                        selectedWhtItem.id === item.id
                          ? 'bg-slate-900 border-amber-500 ring-1 ring-amber-500/40 shadow-md'
                          : 'bg-slate-900/70 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 text-xs font-black font-mono rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
                              {item.sectionCode}
                            </span>
                            <span
                              className={`px-2 py-0.5 text-[10px] font-bold rounded uppercase ${
                                item.nature === 'adjustable'
                                  ? 'bg-blue-500/10 text-blue-300 border border-blue-500/30'
                                  : item.nature === 'minimum'
                                  ? 'bg-purple-500/10 text-purple-300 border border-purple-500/30'
                                  : 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30'
                              }`}
                            >
                              {item.nature} Tax
                            </span>
                          </div>
                          <h4 className="text-sm font-bold text-white mt-1.5">
                            {item.title}
                          </h4>
                        </div>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCopy(item.id, `${item.sectionCode} - ${item.title}: Filer: ${item.filerRate} | Non-Filer: ${item.nonFilerRate}`);
                          }}
                          className="p-1.5 text-slate-400 hover:text-white bg-slate-950 border border-slate-800 rounded-lg"
                          title="Copy provision"
                        >
                          {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>

                      <p className="text-xs text-slate-400 mt-2 line-clamp-2">
                        {item.practicalApplication}
                      </p>

                      {/* Rates Row */}
                      <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-slate-800/80">
                        <div className="p-2 bg-slate-950 rounded-lg border border-slate-800/60">
                          <div className="text-[10px] font-bold uppercase text-emerald-400">
                            Active Filer Rate
                          </div>
                          <div className="text-xs font-bold text-slate-200 mt-0.5">
                            {item.filerRate}
                          </div>
                        </div>

                        <div className="p-2 bg-slate-950 rounded-lg border border-slate-800/60">
                          <div className="text-[10px] font-bold uppercase text-red-400">
                            Non-Filer Rate (10th Sched)
                          </div>
                          <div className="text-xs font-bold text-slate-200 mt-0.5">
                            {item.nonFilerRate}
                          </div>
                        </div>
                      </div>

                      <div className="mt-2.5 flex items-center justify-between text-[10px] text-slate-400">
                        <span>Agent: {item.withholdingAgent}</span>
                        <span className="font-mono text-amber-400">{item.depositDeadline}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Live Interactive WHT Calculator & Legal Dossier */}
              <div className="lg:col-span-5 space-y-5">
                <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg sticky top-24">
                  <div className="bg-slate-850 px-5 py-4 border-b border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calculator className="w-5 h-5 text-amber-400" />
                      <h3 className="text-sm font-bold text-white">
                        Live WHT Deduction Simulator
                      </h3>
                    </div>
                    <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
                      {selectedWhtItem.sectionCode}
                    </span>
                  </div>

                  <div className="p-5 space-y-4">
                    {/* Selected Title */}
                    <div>
                      <div className="text-xs font-black text-amber-400 font-mono">
                        {selectedWhtItem.sectionCode}
                      </div>
                      <h4 className="text-sm font-bold text-white">
                        {selectedWhtItem.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 mt-1">
                        {selectedWhtItem.thresholdNote}
                      </p>
                    </div>

                    {/* Gross Transaction Amount Input */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label className="text-[11px] font-bold uppercase text-slate-300">
                          Gross Transaction Value (PKR)
                        </label>
                        <span className="text-xs font-bold text-amber-400 font-mono">
                          PKR {simulatedGrossAmount.toLocaleString()}
                        </span>
                      </div>
                      <input
                        type="number"
                        id="input-simulated-gross-amount"
                        min={0}
                        step={100000}
                        value={simulatedGrossAmount}
                        onChange={(e) => setSimulatedGrossAmount(Number(e.target.value) || 0)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs font-bold text-white focus:outline-none focus:border-amber-500"
                        placeholder="Enter transaction amount"
                      />
                    </div>

                    {/* Quick Amount Buttons */}
                    <div className="flex flex-wrap gap-1">
                      {[
                        { label: '50K', val: 50000 },
                        { label: '250K', val: 250000 },
                        { label: '1M', val: 1000000 },
                        { label: '2.5M', val: 2500000 },
                        { label: '10M', val: 10000000 },
                        { label: '50M', val: 50000000 }
                      ].map((preset) => (
                        <button
                          key={preset.val}
                          type="button"
                          onClick={() => setSimulatedGrossAmount(preset.val)}
                          className={`px-2 py-0.5 text-[10px] font-semibold rounded border ${
                            simulatedGrossAmount === preset.val
                              ? 'bg-amber-600 text-slate-950 font-bold border-amber-500'
                              : 'bg-slate-950 border-slate-800 text-slate-300 hover:text-white'
                          }`}
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>

                    {/* Simulation Comparison Result */}
                    <div className="space-y-2.5 pt-2">
                      {/* Active Filer Deduction */}
                      <div className="p-3.5 bg-emerald-950/30 border border-emerald-500/40 rounded-xl space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-emerald-300">
                            Active Filer Deduction
                          </span>
                          <span className="text-sm font-black text-white font-mono">
                            PKR {whtCalcResult.filerWithholding.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-[11px] text-slate-400">
                          <span>Rate: {selectedWhtItem.filerRate}</span>
                          <span className="text-emerald-400 font-semibold">Standard Rate</span>
                        </div>
                      </div>

                      {/* Non-Filer Deduction */}
                      <div className="p-3.5 bg-red-950/30 border border-red-500/40 rounded-xl space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-red-300">
                            Non-Filer Withholding (10th Sched)
                          </span>
                          <span className="text-sm font-black text-red-400 font-mono">
                            PKR {whtCalcResult.nonFilerWithholding.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-[11px] text-slate-400">
                          <span>Rate: {selectedWhtItem.nonFilerRate}</span>
                          <span className="text-red-400 font-semibold">Tenth Schedule Punitive</span>
                        </div>
                      </div>

                      {/* Extra Penalty Differential */}
                      <div className="p-3 bg-amber-950/40 border border-amber-500/30 rounded-xl flex items-center justify-between text-xs">
                        <span className="text-amber-300 font-bold">
                          Non-Filer Extra Tax Penalty:
                        </span>
                        <span className="text-amber-400 font-black font-mono">
                          + PKR {whtCalcResult.penaltyDifferential.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* Detailed Legal Parameters */}
                    <div className="space-y-2 pt-2 border-t border-slate-800 text-xs">
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-slate-400 font-semibold">Withholding Agent:</span>
                        <span className="text-slate-200 text-right font-medium">
                          {selectedWhtItem.withholdingAgent}
                        </span>
                      </div>

                      <div className="flex items-start justify-between gap-2">
                        <span className="text-slate-400 font-semibold">Deposit Deadline:</span>
                        <span className="text-amber-400 text-right font-mono">
                          {selectedWhtItem.depositDeadline}
                        </span>
                      </div>

                      <div className="flex items-start justify-between gap-2">
                        <span className="text-slate-400 font-semibold">Iris Reporting Form:</span>
                        <span className="text-slate-200 text-right font-mono">
                          {selectedWhtItem.fbrReportingForm}
                        </span>
                      </div>

                      <div className="pt-2">
                        <div className="text-slate-400 font-semibold mb-1">Exemption Conditions:</div>
                        <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-[11px] text-slate-300 leading-relaxed">
                          {selectedWhtItem.exemptionConditions}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* VIEW 3: STATUTORY SUPER TAX SLABS & PROVISOS */}
        {/* ========================================================= */}
        {activeModuleTab === 'statute_matrix' && (
          <div className="space-y-6">
            <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-xl space-y-4">
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-white">
                  Section 4C Super Tax Statutory Slabs (Division IIB, Part I, First Schedule)
                </h3>
              </div>
              <p className="text-xs text-slate-400">
                Super Tax is levied on high-earning persons (Individuals, AOPs, and Companies) having taxable income exceeding PKR 150 Million.
              </p>

              {/* Slabs Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-950 border-b border-slate-800 text-slate-400">
                      <th className="py-3 px-4 font-bold">Slab Band</th>
                      <th className="py-3 px-4 font-bold">Taxable Income Range (PKR)</th>
                      <th className="py-3 px-4 font-bold">General Sector Rate</th>
                      <th className="py-3 px-4 font-bold">Specified High-Margin Sectors</th>
                      <th className="py-3 px-4 font-bold">Statutory Note</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 text-slate-300">
                    {SUPER_TAX_BANDS.map((band, idx) => (
                      <tr key={idx} className="hover:bg-slate-850/50 transition-colors">
                        <td className="py-3 px-4 font-mono font-bold text-amber-400">
                          Band {idx + 1}
                        </td>
                        <td className="py-3 px-4 font-mono">
                          {band.min === 0
                            ? 'Up to 150 Million'
                            : band.max === null
                            ? 'Exceeding 500 Million'
                            : `${(band.min / 1000000).toFixed(0)}M - ${(band.max / 1000000).toFixed(0)}M`}
                        </td>
                        <td className="py-3 px-4 font-bold text-emerald-400">
                          {band.rateGeneral}%
                        </td>
                        <td className="py-3 px-4 font-bold text-amber-400">
                          {band.rateSpecified}%
                        </td>
                        <td className="py-3 px-4 text-slate-400 text-[11px]">
                          {band.description}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
