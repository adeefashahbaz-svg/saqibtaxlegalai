import React, { useState } from 'react';
import {
  Building,
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
  Layers,
  HelpCircle,
  Clock,
  Home,
  MapPin,
  FileSpreadsheet,
  AlertCircle,
  Check,
  Copy,
  ChevronRight,
  Sparkles,
  BookOpen,
  Gavel,
  BadgeAlert,
  Search,
  ExternalLink
} from 'lucide-react';
import {
  PropertyType,
  TaxpayerATLStatus,
  PropertyTaxCalculationResult,
  UserProfile
} from '../types';
import {
  calculatePropertyTax,
  PROPERTY_TYPES_CONFIG,
  PropertyTaxInputParams
} from '../utils/propertyTaxEngine';
import {
  PROPERTY_STATUTE_DIRECTORY,
  SECTION_7E_EXEMPTION_CHECKLIST,
  PropertyStatuteItem
} from '../utils/propertyLegalData';

interface RealEstatePropertyTaxViewProps {
  user?: UserProfile | null;
  onOpenPricing?: () => void;
  onNavigateToChat?: (initialPrompt: string) => void;
}

export const RealEstatePropertyTaxView: React.FC<RealEstatePropertyTaxViewProps> = ({
  user,
  onOpenPricing,
  onNavigateToChat
}) => {
  // --- Form States ---
  const [propertyValuation, setPropertyValuation] = useState<number>(35000000); // 35M PKR default
  const [propertyType, setPropertyType] = useState<PropertyType>('constructed_residential');
  const [transactionType, setTransactionType] = useState<'purchase' | 'sale' | 'holding' | 'all_in_one'>('all_in_one');
  const [holdingPeriodYears, setHoldingPeriodYears] = useState<number>(2); // 2 years default
  const [holdingSlabChoice, setHoldingSlabChoice] = useState<'less_1_yr' | '1_to_2_yrs' | '2_to_3_yrs' | '3_to_6_yrs' | 'above_6_yrs'>('1_to_2_yrs');
  const [buyerStatus, setBuyerStatus] = useState<TaxpayerATLStatus>('active_filer');
  const [sellerStatus, setSellerStatus] = useState<TaxpayerATLStatus>('active_filer');
  const [estimatedGain, setEstimatedGain] = useState<number>(8000000); // 8M PKR profit

  // Section 7E Exemption Toggles
  const [isSelfOwnedPrimaryResidence, setIsSelfOwnedPrimaryResidence] = useState<boolean>(true);
  const [isAgriculturalLand, setIsAgriculturalLand] = useState<boolean>(false);
  const [hasActiveCourtStayOrLitigation, setHasActiveCourtStayOrLitigation] = useState<boolean>(false);
  const [isFirstYearConstruction, setIsFirstYearConstruction] = useState<boolean>(false);

  // Active View Tab
  const [activeTab, setActiveTab] = useState<'calculator' | 'statute_directory' | 'section7e_guide' | 'holding_matrix' | 'provincial_charges'>('calculator');

  // Statutory Sidebar Directory State
  const [selectedStatute, setSelectedStatute] = useState<PropertyStatuteItem>(PROPERTY_STATUTE_DIRECTORY[0]);
  const [statuteSearchQuery, setStatuteSearchQuery] = useState<string>('');
  const [statuteCategoryFilter, setStatuteCategoryFilter] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Sync holding years from slab choice
  const handleHoldingSlabChange = (slab: 'less_1_yr' | '1_to_2_yrs' | '2_to_3_yrs' | '3_to_6_yrs' | 'above_6_yrs') => {
    setHoldingSlabChoice(slab);
    switch (slab) {
      case 'less_1_yr':
        setHoldingPeriodYears(0.5);
        break;
      case '1_to_2_yrs':
        setHoldingPeriodYears(1.5);
        break;
      case '2_to_3_yrs':
        setHoldingPeriodYears(2.5);
        break;
      case '3_to_6_yrs':
        setHoldingPeriodYears(4.5);
        break;
      case 'above_6_yrs':
        setHoldingPeriodYears(7);
        break;
    }
  };

  // Compute Master Property Tax
  const params: PropertyTaxInputParams = {
    propertyValuation,
    propertyType,
    holdingPeriodYears,
    buyerStatus,
    sellerStatus,
    estimatedCapitalGainProfit: estimatedGain,
    isSelfOwnedPrimaryResidence,
    isAgriculturalLand,
    hasActiveCourtStayOrLitigation,
    isFirstYearConstruction
  };

  const result: PropertyTaxCalculationResult = calculatePropertyTax(params);

  // Provincial Registration & Stamp Duty Estimates
  const stampDutyRate = 2.0; // 2% average e-Stamp
  const stampDutyAmount = Math.round((propertyValuation * stampDutyRate) / 100);
  const townTaxRate = 1.0; // 1% TMA
  const townTaxAmount = Math.round((propertyValuation * townTaxRate) / 100);
  const regFeeAmount = Math.min(100000, Math.max(5000, Math.round(propertyValuation * 0.005)));
  const cvtAmount = propertyValuation > 100000000 ? Math.round(propertyValuation * 0.01) : 0; // 1% CVT for high-value
  const totalProvincialRegistrationCost = stampDutyAmount + townTaxAmount + regFeeAmount + cvtAmount;

  // Quick preset valuation buttons
  const valuationPresets = [
    { label: '10M', val: 10000000 },
    { label: '25M (7E Threshold)', val: 25000000 },
    { label: '35M', val: 35000000 },
    { label: '50M (Slab 2)', val: 50000000 },
    { label: '100M (Slab 3)', val: 100000000 },
    { label: '200M (High Net-Worth)', val: 200000000 }
  ];

  // Copy handler
  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Export dossier
  const handleExportDossier = () => {
    const textContent = `
========================================================================
     GOVERNMENT OF PAKISTAN - FEDERAL BOARD OF REVENUE (FBR)
     SAQIBTAX LEGAL AI - REAL ESTATE & IMMOVABLE PROPERTY TAX DOSSIER
========================================================================
Generated At: ${new Date().toLocaleString()}
Statutory Basis: Income Tax Ordinance, 2001 (as amended by Finance Act)

PROPERTY SPECIFICATIONS:
------------------------------------------------------------------------
- Declared Valuation / FBR Table: PKR ${propertyValuation.toLocaleString()}
- Asset Classification: ${PROPERTY_TYPES_CONFIG[propertyType]?.label}
- Holding Period: ${holdingPeriodYears} Years (${holdingSlabChoice})
- Buyer ATL Status: ${buyerStatus.toUpperCase()}
- Seller ATL Status: ${sellerStatus.toUpperCase()}
- Declared Capital Gain / Profit: PKR ${estimatedGain.toLocaleString()}

1. SECTION 236K (ADVANCE TAX ON PURCHASE / BUYER WITHHOLDING):
------------------------------------------------------------------------
- Applicable Rate: ${result.sec236kRate}%
- Advance Tax Payable: PKR ${result.sec236kAmount.toLocaleString()}
- Legal Rule: ${result.sec236kRuleDescription}

2. SECTION 236C (ADVANCE TAX ON SALE OR TRANSFER / SELLER WITHHOLDING):
------------------------------------------------------------------------
- Applicable Rate: ${result.sec236cRate}%
- Advance Tax Payable: PKR ${result.sec236cAmount.toLocaleString()}
- Legal Rule: ${result.sec236cRuleDescription}

3. SECTION 37(1A) (CAPITAL GAINS TAX ON IMMOVABLE PROPERTY):
------------------------------------------------------------------------
- Realized Gain Base: PKR ${result.capitalGainEstimatedProfit.toLocaleString()}
- CGT Rate: ${result.cgtRate}%
- CGT Amount Payable: PKR ${result.cgtAmount.toLocaleString()}
- Holding Rule: ${result.cgtHoldingRuleDescription}

4. SECTION 7E (TAX ON DEEMED INCOME FROM IMMOVABLE PROPERTY):
------------------------------------------------------------------------
- Exemption Status: ${result.is7EExempt ? 'STRICTLY EXEMPT' : 'TAXABLE / PAYABLE'}
- Exemption Reason: ${result.exemptionReason7E || 'None - Asset exceeds Rs. 25M and no statutory exemption claimed'}
- Imputed Deemed Rental Income (5% of FMV): PKR ${result.deemedRentalIncome.toLocaleString()}
- Effective Tax Rate (20% on Deemed Income = 1% on FMV): ${result.sec7eTaxRate}%
- Section 7E Tax Payable: PKR ${result.sec7eTaxAmount.toLocaleString()}

5. PROVINCIAL STAMP DUTY, CVT & REGISTRATION EXPENSES (ESTIMATED):
------------------------------------------------------------------------
- Provincial Stamp Duty (e-Stamp ~ 2%): PKR ${stampDutyAmount.toLocaleString()}
- TMA Town Municipal Tax (~ 1%): PKR ${townTaxAmount.toLocaleString()}
- Sub-Registrar Fee (~ 0.5% capped): PKR ${regFeeAmount.toLocaleString()}
- Capital Value Tax (CVT 2022 on high-value asset): PKR ${cvtAmount.toLocaleString()}
- Total Provincial Conveyance Expenses: PKR ${totalProvincialRegistrationCost.toLocaleString()}

SUMMARY OF TAX OBLIGATIONS:
------------------------------------------------------------------------
- TOTAL BUYER WITHHOLDING & CONVEYANCE TAX: PKR ${(result.totalBuyerTaxPayable + totalProvincialRegistrationCost).toLocaleString()}
- TOTAL SELLER FEDERAL LIABILITIES (236C + CGT): PKR ${result.totalSellerTaxPayable.toLocaleString()}
- ANNUAL SECTION 7E HOLDING LIABILITY: PKR ${result.sec7eTaxAmount.toLocaleString()}

STATUTORY CITATIONS:
------------------------------------------------------------------------
${result.statutoryCitations.map((c, i) => `${i + 1}. ${c}`).join('\n')}

========================================================================
Document generated automatically by SaqibTax Legal AI Engine.
========================================================================`;

    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `SaqibTax_Property_Tax_Audit_${propertyValuation}_PKR.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Filtered statutes for left directory sidebar
  const filteredStatutes = PROPERTY_STATUTE_DIRECTORY.filter((item) => {
    const matchesSearch =
      item.section_code.toLowerCase().includes(statuteSearchQuery.toLowerCase()) ||
      item.title.toLowerCase().includes(statuteSearchQuery.toLowerCase()) ||
      item.statutory_purpose.toLowerCase().includes(statuteSearchQuery.toLowerCase());
    const matchesCat = statuteCategoryFilter === 'all' || item.category === statuteCategoryFilter;
    return matchesSearch && matchesCat;
  });

  return (
    <div id="real-estate-property-tax-suite" className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Header Banner */}
      <div className="bg-slate-900/90 border-b border-slate-800/80 px-6 py-5 sticky top-0 z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-950/80 border border-emerald-500/30 rounded-xl text-emerald-400 shadow-sm shadow-emerald-950">
              <Building className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-xl font-bold text-white tracking-tight">
                  Real Estate & Property Tax Suite
                </h1>
                <span className="px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider rounded-md bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                  Sec 7E • 236C • 236K • 37(1A) • CVT
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Statutory computation engine under the Income Tax Ordinance 2001, Capital Value Tax Act 2022 & Provincial Stamp Laws
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              id="btn-export-property-dossier"
              onClick={handleExportDossier}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold rounded-lg transition-all shadow-sm"
              title="Download FBR Property Tax Audit Dossier"
            >
              <Download className="w-4 h-4 text-emerald-400" />
              <span>Export FBR Dossier</span>
            </button>

            {onNavigateToChat && (
              <button
                id="btn-ai-property-counsel"
                onClick={() =>
                  onNavigateToChat(
                    `I need legal assistance regarding Pakistani property tax on a property valued at PKR ${propertyValuation.toLocaleString()} under Section 7E, 236C, 236K, and Capital Gains Tax. Please advise on tax minimization and exemption procedures.`
                  )
                }
                className="flex items-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg shadow-sm transition-all"
              >
                <Sparkles className="w-4 h-4" />
                <span>Ask AI Legal Counsel</span>
              </button>
            )}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="max-w-7xl mx-auto mt-5 flex items-center gap-2 border-b border-slate-800 -mb-5 overflow-x-auto pb-0">
          <button
            id="tab-btn-calculator"
            onClick={() => setActiveTab('calculator')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'calculator'
                ? 'border-emerald-500 text-emerald-400 bg-emerald-950/20'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            <Calculator className="w-4 h-4" />
            <span>Property Tax Calculator Engine</span>
          </button>

          <button
            id="tab-btn-statute-directory"
            onClick={() => setActiveTab('statute_directory')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'statute_directory'
                ? 'border-emerald-500 text-emerald-400 bg-emerald-950/20'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Integrated Property Laws Directory</span>
          </button>

          <button
            id="tab-btn-section7e-guide"
            onClick={() => setActiveTab('section7e_guide')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'section7e_guide'
                ? 'border-emerald-500 text-emerald-400 bg-emerald-950/20'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Section 7E Iris 2.0 Exemption Matrix</span>
          </button>

          <button
            id="tab-btn-holding-matrix"
            onClick={() => setActiveTab('holding_matrix')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'holding_matrix'
                ? 'border-emerald-500 text-emerald-400 bg-emerald-950/20'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Statutory Holding & CGT Slabs</span>
          </button>

          <button
            id="tab-btn-provincial-charges"
            onClick={() => setActiveTab('provincial_charges')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'provincial_charges'
                ? 'border-emerald-500 text-emerald-400 bg-emerald-950/20'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            <Landmark className="w-4 h-4" />
            <span>Provincial Stamp Duty & CVT 2022</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto w-full px-6 py-6 flex-1">
        {/* ========================================================= */}
        {/* TAB 1: PROPERTY TAX CALCULATOR ENGINE */}
        {/* ========================================================= */}
        {activeTab === 'calculator' && (
          <div className="space-y-6">
            {/* Live KPI Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* KPI 1: Total Advance Tax Payable */}
              <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl relative overflow-hidden shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Total Advance Tax Payable
                  </span>
                  <div className="p-1.5 bg-emerald-500/10 text-emerald-400 rounded-lg">
                    <Receipt className="w-4 h-4" />
                  </div>
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-2xl font-black text-white tracking-tight">
                    PKR {(transactionType === 'purchase'
                      ? result.sec236kAmount
                      : transactionType === 'sale'
                      ? result.sec236cAmount
                      : result.sec236kAmount + result.sec236cAmount
                    ).toLocaleString()}
                  </span>
                </div>
                <div className="mt-2 text-[11px] text-slate-400 flex items-center gap-1.5">
                  <span className="font-semibold text-emerald-400">
                    {transactionType === 'purchase'
                      ? `Buyer 236K: ${result.sec236kRate}%`
                      : transactionType === 'sale'
                      ? `Seller 236C: ${result.sec236cRate}%`
                      : `236K (${result.sec236kRate}%) + 236C (${result.sec236cRate}%)`}
                  </span>
                  <span>• Adjustable WHT</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-500" />
              </div>

              {/* KPI 2: Section 7E Deemed Tax / Exemption Status */}
              <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl relative overflow-hidden shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Section 7E Deemed Tax
                  </span>
                  <div
                    className={`p-1.5 rounded-lg ${
                      result.is7EExempt
                        ? 'bg-blue-500/10 text-blue-400'
                        : 'bg-amber-500/10 text-amber-400'
                    }`}
                  >
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                  <span
                    className={`text-2xl font-black tracking-tight ${
                      result.is7EExempt ? 'text-emerald-400' : 'text-amber-400'
                    }`}
                  >
                    {result.is7EExempt ? 'EXEMPT (PKR 0)' : `PKR ${result.sec7eTaxAmount.toLocaleString()}`}
                  </span>
                </div>
                <div className="mt-2 text-[11px] text-slate-400 line-clamp-1" title={result.exemptionReason7E || '1% effective tax on Fair Market Value'}>
                  {result.is7EExempt
                    ? result.exemptionReason7E
                    : `Deemed Rent: PKR ${result.deemedRentalIncome.toLocaleString()} @ 20%`}
                </div>
                <div
                  className={`absolute bottom-0 left-0 right-0 h-1 ${
                    result.is7EExempt ? 'bg-emerald-500' : 'bg-amber-500'
                  }`}
                />
              </div>

              {/* KPI 3: Capital Gains Tax (CGT 37(1A)) */}
              <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl relative overflow-hidden shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Capital Gains Tax (CGT)
                  </span>
                  <div className="p-1.5 bg-indigo-500/10 text-indigo-400 rounded-lg">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-2xl font-black text-white tracking-tight">
                    PKR {result.cgtAmount.toLocaleString()}
                  </span>
                  <span className="text-xs font-semibold text-indigo-400">
                    ({result.cgtRate}%)
                  </span>
                </div>
                <div className="mt-2 text-[11px] text-slate-400">
                  On Gain of PKR {result.capitalGainEstimatedProfit.toLocaleString()} ({holdingPeriodYears} Yrs)
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-indigo-500" />
              </div>

              {/* KPI 4: Provincial Conveyance & CVT 2022 */}
              <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl relative overflow-hidden shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Provincial Conveyance & CVT
                  </span>
                  <div className="p-1.5 bg-purple-500/10 text-purple-400 rounded-lg">
                    <Landmark className="w-4 h-4" />
                  </div>
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-2xl font-black text-white tracking-tight">
                    PKR {totalProvincialRegistrationCost.toLocaleString()}
                  </span>
                </div>
                <div className="mt-2 text-[11px] text-slate-400">
                  e-Stamp ({stampDutyRate}%) + TMA (1%) + Reg Fee
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-purple-500" />
              </div>
            </div>

            {/* Main Interactive Calculation Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Interactive Parameters Panel (7 Cols) */}
              <div className="lg:col-span-7 space-y-5">
                {/* 1. Transaction Type Selector */}
                <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-xl space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                      <Scale className="w-4 h-4 text-emerald-400" />
                      <span>1. Transaction & Audit Scope</span>
                    </label>
                    <span className="text-[11px] text-slate-400">Select transaction party perspective</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'purchase', label: 'Purchase', desc: 'Buyer Focus (236K)' },
                      { id: 'sale', label: 'Sale / Transfer', desc: 'Seller (236C + CGT)' },
                      { id: 'holding', label: 'Holding (Sec 7E)', desc: 'Annual Asset Deemed' },
                      { id: 'all_in_one', label: '360° Transaction', desc: 'Full Comprehensive' }
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setTransactionType(item.id as any)}
                        className={`p-3 rounded-lg text-left border transition-all ${
                          transactionType === item.id
                            ? 'bg-emerald-950/60 border-emerald-500 text-white ring-1 ring-emerald-500/40'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                        }`}
                      >
                        <div className="text-xs font-bold text-slate-200">{item.label}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">{item.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Property Valuation Input & Quick Presets */}
                <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-xl space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                      <Landmark className="w-4 h-4 text-emerald-400" />
                      <span>2. Property Value (FBR Valuation / DC Rate / Agreed Consideration)</span>
                    </label>
                    <span className="text-xs font-bold text-emerald-400">
                      PKR {propertyValuation.toLocaleString()}
                    </span>
                  </div>

                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-400">
                      PKR
                    </span>
                    <input
                      type="number"
                      id="input-property-valuation"
                      min={0}
                      step={500000}
                      value={propertyValuation}
                      onChange={(e) => setPropertyValuation(Number(e.target.value) || 0)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-14 pr-4 py-2.5 text-sm font-bold text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                      placeholder="e.g. 35,000,000"
                    />
                  </div>

                  {/* Valuation Presets */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <span className="text-[11px] text-slate-400 mr-1">Quick Presets:</span>
                    {valuationPresets.map((preset) => (
                      <button
                        key={preset.val}
                        type="button"
                        onClick={() => setPropertyValuation(preset.val)}
                        className={`px-2.5 py-1 text-[11px] font-semibold rounded-md border transition-all ${
                          propertyValuation === preset.val
                            ? 'bg-emerald-600 text-white border-emerald-500'
                            : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Asset Classification & Holding Period */}
                <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-xl space-y-4">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                    <Building2 className="w-4 h-4 text-emerald-400" />
                    <span>3. Asset Classification & Holding Duration</span>
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-400 mb-1.5">
                        Property Category
                      </label>
                      <select
                        id="select-property-type"
                        value={propertyType}
                        onChange={(e) => setPropertyType(e.target.value as PropertyType)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs font-semibold text-white focus:outline-none focus:border-emerald-500"
                      >
                        {Object.values(PROPERTY_TYPES_CONFIG).map((type) => (
                          <option key={type.id} value={type.id}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-400 mb-1.5">
                        Holding Period Slab (Sec 37(1A))
                      </label>
                      <select
                        id="select-holding-slab"
                        value={holdingSlabChoice}
                        onChange={(e) => handleHoldingSlabChange(e.target.value as any)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs font-semibold text-white focus:outline-none focus:border-emerald-500"
                      >
                        <option value="less_1_yr">Less than 1 Year (Max CGT: 15%)</option>
                        <option value="1_to_2_yrs">1 - 2 Years (CGT: 10% - 12.5%)</option>
                        <option value="2_to_3_yrs">2 - 3 Years (CGT: 7.5% - 10%)</option>
                        <option value="3_to_6_yrs">3 - 6 Years (CGT: 2.5% - 5%)</option>
                        <option value="above_6_yrs">Above 6 Years (0% Fully Exempt)</option>
                      </select>
                    </div>
                  </div>

                  {/* Realized Capital Gain Amount */}
                  <div className="pt-2">
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
                        <span>Realized Capital Gain / Profit (PKR)</span>
                        <span className="text-slate-400">(Disposal Price minus Cost & Improvement)</span>
                      </label>
                      <span className="text-xs font-bold text-indigo-400">
                        PKR {estimatedGain.toLocaleString()}
                      </span>
                    </div>
                    <input
                      type="number"
                      id="input-capital-gain"
                      min={0}
                      step={200000}
                      value={estimatedGain}
                      onChange={(e) => setEstimatedGain(Number(e.target.value) || 0)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs font-bold text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                {/* 4. Buyer & Seller ATL Status Toggles */}
                <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-xl space-y-4">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-emerald-400" />
                    <span>4. Taxpayer ATL Status Toggles (Active Filer vs Late Filer vs Non-Filer)</span>
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Buyer Status */}
                    <div className="bg-slate-950 border border-slate-800/80 p-3.5 rounded-lg space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-200">Buyer Status (236K)</span>
                        <span className="text-[10px] text-emerald-400 font-semibold uppercase">
                          {buyerStatus.replace('_', ' ')}
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-1.5">
                        {(['active_filer', 'late_filer', 'non_filer'] as TaxpayerATLStatus[]).map((status) => (
                          <button
                            key={status}
                            type="button"
                            onClick={() => setBuyerStatus(status)}
                            className={`py-1.5 px-2 text-[10px] font-bold rounded capitalize border transition-all ${
                              buyerStatus === status
                                ? status === 'active_filer'
                                  ? 'bg-emerald-600 text-white border-emerald-500'
                                  : status === 'late_filer'
                                  ? 'bg-amber-600 text-white border-amber-500'
                                  : 'bg-red-600 text-white border-red-500'
                                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                            }`}
                          >
                            {status === 'active_filer' ? 'Filer (3%)' : status === 'late_filer' ? 'Late Filer' : 'Non-Filer'}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Seller Status */}
                    <div className="bg-slate-950 border border-slate-800/80 p-3.5 rounded-lg space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-200">Seller Status (236C & CGT)</span>
                        <span className="text-[10px] text-emerald-400 font-semibold uppercase">
                          {sellerStatus.replace('_', ' ')}
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-1.5">
                        {(['active_filer', 'late_filer', 'non_filer'] as TaxpayerATLStatus[]).map((status) => (
                          <button
                            key={status}
                            type="button"
                            onClick={() => setSellerStatus(status)}
                            className={`py-1.5 px-2 text-[10px] font-bold rounded capitalize border transition-all ${
                              sellerStatus === status
                                ? status === 'active_filer'
                                  ? 'bg-emerald-600 text-white border-emerald-500'
                                  : status === 'late_filer'
                                  ? 'bg-amber-600 text-white border-amber-500'
                                  : 'bg-red-600 text-white border-red-500'
                                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                            }`}
                          >
                            {status === 'active_filer' ? 'Filer (3%)' : status === 'late_filer' ? 'Late Filer' : 'Non-Filer'}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 5. Section 7E Exemption Engine Toggles */}
                <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-xl space-y-3.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>5. Section 7E Statutory Exemption Checklist (FBR Form 7E)</span>
                    </label>
                    <span className="text-[11px] text-slate-400">Sec 7E(2) clauses</span>
                  </div>

                  <div className="space-y-2.5">
                    {/* Exemption 1: One Self-owned primary residence */}
                    <label className="flex items-start gap-3 p-2.5 bg-slate-950 border border-slate-800 rounded-lg cursor-pointer hover:border-slate-700 transition-all">
                      <input
                        type="checkbox"
                        id="chk-self-residence"
                        checked={isSelfOwnedPrimaryResidence}
                        onChange={(e) => setIsSelfOwnedPrimaryResidence(e.target.checked)}
                        className="mt-0.5 w-4 h-4 rounded text-emerald-600 bg-slate-900 border-slate-700 focus:ring-emerald-500"
                      />
                      <div className="text-xs">
                        <div className="font-semibold text-slate-200">
                          One Self-Owned Primary Residence <span className="text-emerald-400 font-mono text-[11px]">Sec 7E(2)(a)</span>
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5">
                          Single residential house or flat owned and occupied as primary dwelling. Fully exempt.
                        </div>
                      </div>
                    </label>

                    {/* Exemption 2: Agricultural land */}
                    <label className="flex items-start gap-3 p-2.5 bg-slate-950 border border-slate-800 rounded-lg cursor-pointer hover:border-slate-700 transition-all">
                      <input
                        type="checkbox"
                        id="chk-agri-land"
                        checked={isAgriculturalLand}
                        onChange={(e) => setIsAgriculturalLand(e.target.checked)}
                        className="mt-0.5 w-4 h-4 rounded text-emerald-600 bg-slate-900 border-slate-700 focus:ring-emerald-500"
                      />
                      <div className="text-xs">
                        <div className="font-semibold text-slate-200">
                          Self-Cultivated Agricultural Land <span className="text-emerald-400 font-mono text-[11px]">Sec 7E(2)(c)</span>
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5">
                          Agricultural farm parcels under active farming (excluding luxury farmhouses).
                        </div>
                      </div>
                    </label>

                    {/* Exemption 3: Certified First Year Construction */}
                    <label className="flex items-start gap-3 p-2.5 bg-slate-950 border border-slate-800 rounded-lg cursor-pointer hover:border-slate-700 transition-all">
                      <input
                        type="checkbox"
                        id="chk-first-year-const"
                        checked={isFirstYearConstruction}
                        onChange={(e) => setIsFirstYearConstruction(e.target.checked)}
                        className="mt-0.5 w-4 h-4 rounded text-emerald-600 bg-slate-900 border-slate-700 focus:ring-emerald-500"
                      />
                      <div className="text-xs">
                        <div className="font-semibold text-slate-200">
                          First Year Certified Construction in Progress <span className="text-emerald-400 font-mono text-[11px]">Sec 7E(2)(e)</span>
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5">
                          Land with certified active structure commencement verified by authority.
                        </div>
                      </div>
                    </label>

                    {/* Exemption 4: Court Stay Order */}
                    <label className="flex items-start gap-3 p-2.5 bg-slate-950 border border-slate-800 rounded-lg cursor-pointer hover:border-slate-700 transition-all">
                      <input
                        type="checkbox"
                        id="chk-court-stay"
                        checked={hasActiveCourtStayOrLitigation}
                        onChange={(e) => setHasActiveCourtStayOrLitigation(e.target.checked)}
                        className="mt-0.5 w-4 h-4 rounded text-emerald-600 bg-slate-900 border-slate-700 focus:ring-emerald-500"
                      />
                      <div className="text-xs">
                        <div className="font-semibold text-slate-200">
                          Active Court Injunction / Stay Order <span className="text-emerald-400 font-mono text-[11px]">Sec 7E(2)(f)</span>
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5">
                          Property where transfer or alienation is temporarily barred by court injunction.
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Right Column: Detailed Statutory Audit Ledger (5 Cols) */}
              <div className="lg:col-span-5 space-y-5">
                {/* Statutory Calculation Ledger Card */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg sticky top-24">
                  <div className="bg-slate-850 px-5 py-4 border-b border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileCheck className="w-5 h-5 text-emerald-400" />
                      <h3 className="text-sm font-bold text-white">
                        FBR Property Tax Audit Breakdown
                      </h3>
                    </div>
                    <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                      Tax Year 2024-25
                    </span>
                  </div>

                  <div className="p-5 space-y-4">
                    {/* Itemized Calculation List */}
                    <div className="space-y-3 text-xs">
                      {/* 1. Buyer Withholding (236K) */}
                      <div className="p-3 bg-slate-950/80 border border-slate-800/80 rounded-lg space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-200">
                            Sec 236K Advance Tax on Purchase (Buyer)
                          </span>
                          <span className="font-mono font-bold text-emerald-400">
                            PKR {result.sec236kAmount.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-[11px] text-slate-400">
                          <span>Rate: {result.sec236kRate}% ({buyerStatus.replace('_', ' ')})</span>
                          <span>Adjustable in Form 114</span>
                        </div>
                      </div>

                      {/* 2. Seller Advance Tax (236C) */}
                      <div className="p-3 bg-slate-950/80 border border-slate-800/80 rounded-lg space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-200">
                            Sec 236C Advance Tax on Sale (Seller)
                          </span>
                          <span className="font-mono font-bold text-emerald-400">
                            PKR {result.sec236cAmount.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-[11px] text-slate-400">
                          <span>Rate: {result.sec236cRate}% ({sellerStatus.replace('_', ' ')})</span>
                          <span>Adjustable / Minimum</span>
                        </div>
                      </div>

                      {/* 3. Capital Gains Tax 37(1A) */}
                      <div className="p-3 bg-slate-950/80 border border-slate-800/80 rounded-lg space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-200">
                            Sec 37(1A) Capital Gains Tax (CGT)
                          </span>
                          <span className="font-mono font-bold text-indigo-400">
                            PKR {result.cgtAmount.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-[11px] text-slate-400">
                          <span>Rate: {result.cgtRate}% (Holding: {holdingPeriodYears} Yrs)</span>
                          <span>On Gain: PKR {result.capitalGainEstimatedProfit.toLocaleString()}</span>
                        </div>
                      </div>

                      {/* 4. Section 7E Deemed Income */}
                      <div className="p-3 bg-slate-950/80 border border-slate-800/80 rounded-lg space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-200">
                            Sec 7E Deemed Rental Income Tax
                          </span>
                          <span
                            className={`font-mono font-bold ${
                              result.is7EExempt ? 'text-emerald-400' : 'text-amber-400'
                            }`}
                          >
                            {result.is7EExempt ? 'EXEMPT (PKR 0)' : `PKR ${result.sec7eTaxAmount.toLocaleString()}`}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {result.is7EExempt
                            ? result.exemptionReason7E
                            : `Deemed Rent (5%): PKR ${result.deemedRentalIncome.toLocaleString()} @ 20% tax`}
                        </div>
                      </div>

                      {/* 5. Provincial Conveyance Expenses */}
                      <div className="p-3 bg-slate-950/80 border border-slate-800/80 rounded-lg space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-200">
                            Provincial Stamp Duty & Reg Fees
                          </span>
                          <span className="font-mono font-bold text-purple-400">
                            PKR {totalProvincialRegistrationCost.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-[11px] text-slate-400">
                          <span>e-Stamp (2%) + TMA (1%) + Reg Fee</span>
                          <span>Provincial Board of Rev</span>
                        </div>
                      </div>
                    </div>

                    {/* Total Grand Summary Box */}
                    <div className="pt-3 border-t border-slate-800 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-400">Total Buyer Conveyance Tax (236K + Stamp):</span>
                        <span className="font-bold text-white font-mono">
                          PKR {(result.totalBuyerTaxPayable + totalProvincialRegistrationCost).toLocaleString()}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-400">Total Seller Federal Tax (236C + CGT):</span>
                        <span className="font-bold text-white font-mono">
                          PKR {result.totalSellerTaxPayable.toLocaleString()}
                        </span>
                      </div>

                      <div className="p-3.5 bg-gradient-to-br from-emerald-950/60 to-slate-900 border border-emerald-500/30 rounded-xl mt-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold uppercase text-emerald-300">
                            Grand Transaction Tax Burden
                          </span>
                          <span className="text-lg font-black text-white font-mono">
                            PKR {(result.totalBuyerTaxPayable + result.totalSellerTaxPayable + totalProvincialRegistrationCost).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-[10px] text-slate-400 mt-1">
                          Calculated on declared consideration of PKR {propertyValuation.toLocaleString()}
                        </div>
                      </div>
                    </div>

                    {/* Quick Statutory Citations Checklist */}
                    <div className="pt-2 space-y-1.5">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                        Statutory Governing Citations:
                      </span>
                      {result.statutoryCitations.map((citation, idx) => (
                        <div key={idx} className="flex items-start gap-1.5 text-[11px] text-slate-400">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                          <span>{citation}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: INTEGRATED PROPERTY LAWS DIRECTORY */}
        {/* ========================================================= */}
        {activeTab === 'statute_directory' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[600px]">
            {/* Left Column: Repository Directory List (4 Cols) */}
            <div className="lg:col-span-4 bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-emerald-400" />
                  <span>Property Statutes Directory</span>
                </h3>
                <span className="text-[11px] text-slate-400">{filteredStatutes.length} Sections</span>
              </div>

              {/* Search & Filter */}
              <div className="space-y-2">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={statuteSearchQuery}
                    onChange={(e) => setStatuteSearchQuery(e.target.value)}
                    placeholder="Search Sec 236C, 236K, 7E, CVT..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <select
                  value={statuteCategoryFilter}
                  onChange={(e) => setStatuteCategoryFilter(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-emerald-500"
                >
                  <option value="all">All Statutory Categories</option>
                  <option value="Income Tax Ordinance 2001">Income Tax Ordinance 2001</option>
                  <option value="Capital Value Tax (CVT) 2022">Capital Value Tax (CVT) 2022</option>
                  <option value="Stamp Act & Registration Laws">Stamp Act & Registration Laws</option>
                </select>
              </div>

              {/* Scrollable Statute Items List */}
              <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
                {filteredStatutes.map((statute) => (
                  <button
                    key={statute.id}
                    onClick={() => setSelectedStatute(statute)}
                    className={`w-full text-left p-3 rounded-lg border transition-all flex flex-col gap-1.5 ${
                      selectedStatute.id === statute.id
                        ? 'bg-emerald-950/60 border-emerald-500 text-white ring-1 ring-emerald-500/40'
                        : 'bg-slate-950 border-slate-800/80 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-emerald-400 font-mono">
                        {statute.section_code}
                      </span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                        {statute.category.split(' ')[0]}
                      </span>
                    </div>
                    <div className="text-xs font-semibold text-slate-200 line-clamp-1">
                      {statute.title}
                    </div>
                    <div className="text-[10px] text-slate-400 line-clamp-2">
                      {statute.effective_rate_summary}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column: Interactive Statutory Reader & Case Laws (8 Cols) */}
            <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6">
              {/* Header Title Bar */}
              <div className="border-b border-slate-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-mono font-bold text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30">
                      {selectedStatute.section_code}
                    </span>
                    <span className="text-xs text-slate-400">{selectedStatute.act_name}</span>
                  </div>
                  <h2 className="text-lg font-bold text-white mt-1">{selectedStatute.title}</h2>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopy(selectedStatute.id, `${selectedStatute.section_code}: ${selectedStatute.title}\n${selectedStatute.sub_sections.map(s => `${s.clause}: ${s.text}`).join('\n')}`)}
                    className="flex items-center gap-1 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700 transition-all"
                  >
                    {copiedId === selectedStatute.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedId === selectedStatute.id ? 'Copied' : 'Copy Text'}</span>
                  </button>

                  {onNavigateToChat && (
                    <button
                      onClick={() =>
                        onNavigateToChat(
                          `Please explain the practical legal implications and court precedents for ${selectedStatute.section_code} (${selectedStatute.title}) under Pakistani tax law.`
                        )
                      }
                      className="flex items-center gap-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg transition-all"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Ask AI Interpretation</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Effective Rates & Summary Banner */}
              <div className="p-3.5 bg-emerald-950/40 border border-emerald-500/30 rounded-lg">
                <div className="text-xs font-bold text-emerald-300">Effective Statutory Rates:</div>
                <div className="text-xs text-slate-200 mt-0.5">{selectedStatute.effective_rate_summary}</div>
              </div>

              {/* Sub-Sections Text */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-emerald-400" />
                  <span>Statutory Language & Sub-Sections</span>
                </h4>
                <div className="space-y-2.5">
                  {selectedStatute.sub_sections.map((sub, idx) => (
                    <div key={idx} className="p-3 bg-slate-950 border border-slate-800 rounded-lg">
                      <span className="font-mono font-bold text-xs text-emerald-400 mr-2">
                        {sub.clause}
                      </span>
                      <span className="text-xs text-slate-300 leading-relaxed">{sub.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Statutory Purpose & Practical Notes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-lg space-y-1.5">
                  <h5 className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                    <Info className="w-4 h-4 text-blue-400" />
                    <span>Statutory Purpose</span>
                  </h5>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {selectedStatute.statutory_purpose}
                  </p>
                </div>

                <div className="p-4 bg-slate-950 border border-slate-800 rounded-lg space-y-1.5">
                  <h5 className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 text-amber-400" />
                    <span>Withholding Agent & Registrar Duty</span>
                  </h5>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {selectedStatute.withholding_agent_duty}
                  </p>
                </div>
              </div>

              {/* Landmark Court Judgments */}
              {selectedStatute.landmark_judgments && selectedStatute.landmark_judgments.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                    <Gavel className="w-4 h-4 text-indigo-400" />
                    <span>Landmark High Court & Supreme Court Precedents</span>
                  </h4>
                  <div className="space-y-2">
                    {selectedStatute.landmark_judgments.map((judgment, idx) => (
                      <div key={idx} className="p-3.5 bg-slate-950 border border-indigo-900/40 rounded-lg space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-mono font-bold text-xs text-indigo-400">
                            {judgment.citation} ({judgment.court})
                          </span>
                          <span className="text-[10px] text-slate-400 font-semibold">
                            Year {judgment.year}
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">{judgment.summary}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: SECTION 7E IRIS 2.0 EXEMPTION MATRIX */}
        {/* ========================================================= */}
        {activeTab === 'section7e_guide' && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-400" />
                    <span>Section 7E Exemption Rules & Iris 2.0 Compliance Workflow</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Complete procedural checklist for securing Section 7E Exemption Certificates under Rule 83AA of Income Tax Rules 2002
                  </p>
                </div>
                <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-lg text-xs font-bold">
                  Rule 83AA • Form 7E
                </span>
              </div>

              {/* Step by Step Exemption Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                {SECTION_7E_EXEMPTION_CHECKLIST.map((item) => (
                  <div key={item.id} className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold text-emerald-400 px-2 py-0.5 bg-emerald-950/80 rounded border border-emerald-500/30">
                          {item.ruleCode}
                        </span>
                        <span className="text-[10px] text-slate-400">Statutory Exemption</span>
                      </div>
                      <h4 className="text-sm font-bold text-white">{item.title}</h4>
                      <p className="text-xs text-slate-400">{item.description}</p>
                    </div>

                    <div className="pt-3 border-t border-slate-800/80 space-y-1.5">
                      <div className="text-[10px] font-bold uppercase text-slate-400">Required Documentary Evidence:</div>
                      <div className="text-xs text-slate-300 bg-slate-900 p-2 rounded border border-slate-800">
                        {item.requiredEvidence}
                      </div>
                      <div className="text-[10px] text-emerald-400 font-mono mt-1">
                        {item.irisFormCode}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Procedural Instructions for Sub-Registrars */}
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  <span>Mandatory Sub-Registrar / Housing Authority Verification Directive</span>
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Under FBR Circular No. 01 of 2023-24 read with Section 236C(4), no registering authority or private housing developer (e.g. DHA, Bahria, CDA, LDA) can execute property transfer without a digitally verified System-Generated CPR (under code 7E) or Commissioner Inland Revenue Digital Exemption Certificate issued via Iris 2.0.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 4: STATUTORY HOLDING & CGT SLABS */}
        {/* ========================================================= */}
        {activeTab === 'holding_matrix' && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-5">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Layers className="w-5 h-5 text-indigo-400" />
                  <span>Section 37(1A) Capital Gains Holding Period Reduction Matrix</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Statutory tax rates applicable on capital gains from open plots vs constructed residential & commercial immovable properties
                </p>
              </div>

              {/* Table Comparison */}
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-950 text-slate-300 border-b border-slate-800">
                      <th className="py-3 px-4 font-bold">Holding Period Duration</th>
                      <th className="py-3 px-4 font-bold">Open Plots (Filer)</th>
                      <th className="py-3 px-4 font-bold">Constructed Residential (Filer)</th>
                      <th className="py-3 px-4 font-bold">Constructed Commercial (Filer)</th>
                      <th className="py-3 px-4 font-bold text-red-400">Non-Filer Rate (Tenth Schedule)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    <tr className="hover:bg-slate-850/50">
                      <td className="py-3 px-4 font-semibold text-white">Up to 1 Year (Holding &lt; 1 Yr)</td>
                      <td className="py-3 px-4 font-mono font-bold text-emerald-400">15.0%</td>
                      <td className="py-3 px-4 font-mono font-bold text-emerald-400">15.0%</td>
                      <td className="py-3 px-4 font-mono font-bold text-emerald-400">15.0%</td>
                      <td className="py-3 px-4 font-mono font-bold text-red-400">30.0% (2x)</td>
                    </tr>
                    <tr className="hover:bg-slate-850/50">
                      <td className="py-3 px-4 font-semibold text-white">1 Year to 2 Years</td>
                      <td className="py-3 px-4 font-mono font-bold text-emerald-400">12.5%</td>
                      <td className="py-3 px-4 font-mono font-bold text-emerald-400">10.0%</td>
                      <td className="py-3 px-4 font-mono font-bold text-emerald-400">10.0%</td>
                      <td className="py-3 px-4 font-mono font-bold text-red-400">20.0% - 25.0%</td>
                    </tr>
                    <tr className="hover:bg-slate-850/50">
                      <td className="py-3 px-4 font-semibold text-white">2 Years to 3 Years</td>
                      <td className="py-3 px-4 font-mono font-bold text-emerald-400">10.0%</td>
                      <td className="py-3 px-4 font-mono font-bold text-emerald-400">7.5%</td>
                      <td className="py-3 px-4 font-mono font-bold text-emerald-400">7.5%</td>
                      <td className="py-3 px-4 font-mono font-bold text-red-400">15.0% - 20.0%</td>
                    </tr>
                    <tr className="hover:bg-slate-850/50">
                      <td className="py-3 px-4 font-semibold text-white">3 Years to 4 Years</td>
                      <td className="py-3 px-4 font-mono font-bold text-emerald-400">7.5%</td>
                      <td className="py-3 px-4 font-mono font-bold text-emerald-400">5.0%</td>
                      <td className="py-3 px-4 font-mono font-bold text-emerald-400">5.0%</td>
                      <td className="py-3 px-4 font-mono font-bold text-red-400">10.0% - 15.0%</td>
                    </tr>
                    <tr className="hover:bg-slate-850/50">
                      <td className="py-3 px-4 font-semibold text-white">4 Years to 5 Years</td>
                      <td className="py-3 px-4 font-mono font-bold text-emerald-400">5.0%</td>
                      <td className="py-3 px-4 font-mono font-bold text-blue-400">0% (EXEMPT)</td>
                      <td className="py-3 px-4 font-mono font-bold text-blue-400">0% (EXEMPT)</td>
                      <td className="py-3 px-4 font-mono font-bold text-red-400">10.0% / 0%</td>
                    </tr>
                    <tr className="hover:bg-slate-850/50">
                      <td className="py-3 px-4 font-semibold text-white">5 Years to 6 Years</td>
                      <td className="py-3 px-4 font-mono font-bold text-emerald-400">2.5%</td>
                      <td className="py-3 px-4 font-mono font-bold text-blue-400">0% (EXEMPT)</td>
                      <td className="py-3 px-4 font-mono font-bold text-blue-400">0% (EXEMPT)</td>
                      <td className="py-3 px-4 font-mono font-bold text-red-400">5.0%</td>
                    </tr>
                    <tr className="hover:bg-slate-850/50 bg-emerald-950/20">
                      <td className="py-3 px-4 font-bold text-emerald-300">Exceeding 6 Years</td>
                      <td className="py-3 px-4 font-mono font-bold text-emerald-300">0% (EXEMPT)</td>
                      <td className="py-3 px-4 font-mono font-bold text-emerald-300">0% (EXEMPT)</td>
                      <td className="py-3 px-4 font-mono font-bold text-emerald-300">0% (EXEMPT)</td>
                      <td className="py-3 px-4 font-mono font-bold text-emerald-300">0% (EXEMPT)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 5: PROVINCIAL STAMP DUTY & CVT 2022 */}
        {/* ========================================================= */}
        {activeTab === 'provincial_charges' && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Landmark className="w-5 h-5 text-purple-400" />
                  <span>Provincial Stamp Duty, TMA Tax & Capital Value Tax (CVT 2022)</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Applicable provincial conveyance taxes collected via e-Stamp portals across Punjab, Sindh, KPK, Balochistan & ICT
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Landmark className="w-4 h-4 text-emerald-400" />
                    <span>Provincial Conveyance Rates</span>
                  </h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between p-2 bg-slate-900 rounded border border-slate-800">
                      <span className="text-slate-300">Provincial Stamp Duty (e-Stamp):</span>
                      <span className="font-bold text-white font-mono">1% - 3% on DC Rate</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-slate-900 rounded border border-slate-800">
                      <span className="text-slate-300">Town Municipal Authority (TMA) Tax:</span>
                      <span className="font-bold text-white font-mono">1% of consideration</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-slate-900 rounded border border-slate-800">
                      <span className="text-slate-300">Sub-Registrar Registration Fee:</span>
                      <span className="font-bold text-white font-mono">PKR 500 to 1% (capped)</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-slate-900 rounded border border-slate-800">
                      <span className="text-slate-300">Mutation (Inteqal) Fee:</span>
                      <span className="font-bold text-white font-mono">PKR 1,000 / parcel</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-purple-400" />
                    <span>Capital Value Tax (CVT Act 2022)</span>
                  </h4>
                  <div className="space-y-2 text-xs text-slate-300">
                    <p className="leading-relaxed">
                      Levied under Section 8 of the Finance Act 2022 at <strong className="text-purple-400">1%</strong> on high-value immovable property in Islamabad Capital Territory (ICT) and foreign immovable assets owned by Pakistani tax residents exceeding PKR 100 Million.
                    </p>
                    <div className="p-2.5 bg-slate-900 rounded border border-slate-800 text-[11px] text-slate-400">
                      Note: CVT is an independent federal tax distinct from Income Tax Ordinance withholding, collected prior to attestation.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
