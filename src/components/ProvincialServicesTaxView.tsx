import React, { useState } from 'react';
import {
  Landmark,
  Calculator,
  Download,
  FileCheck,
  Building2,
  Users,
  ShieldCheck,
  AlertTriangle,
  Scale,
  Percent,
  FileText,
  Info,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Receipt,
  Layers,
  HelpCircle,
  Clock,
  ExternalLink,
  BookOpen,
  FolderOpen,
  ChevronRight,
  AlertCircle,
  Globe,
  Sparkles
} from 'lucide-react';
import {
  PSTProvinceCode,
  PSTSectorRate,
  PSTCalculationResult,
  UserProfile
} from '../types';
import {
  calculatePST,
  PST_PROVINCES_DATA,
  PSTProvinceProfile
} from '../utils/pstEngine';

interface ProvincialServicesTaxViewProps {
  user?: UserProfile | null;
  onOpenPricing?: () => void;
  onNavigateToChat?: (initialPrompt: string) => void;
}

export const ProvincialServicesTaxView: React.FC<ProvincialServicesTaxViewProps> = ({
  user,
  onOpenPricing,
  onNavigateToChat
}) => {
  // --- States ---
  const [selectedProvince, setSelectedProvince] = useState<PSTProvinceCode>('PRA');
  const [selectedSectorId, setSelectedSectorId] = useState<string>('pra_it_software');
  const [serviceValue, setServiceValue] = useState<number>(3000000); // 3M PKR default
  const [inputTaxClaimed, setInputTaxClaimed] = useState<number>(120000); // 120k PKR input tax
  const [useConcessionRate, setUseConcessionRate] = useState<boolean>(false);
  const [withholdingDeductedPercent, setWithholdingDeductedPercent] = useState<number>(0); // 0 to 100%

  // Navigation Tab
  const [activeTab, setActiveTab] = useState<'calculator' | 'comparison_matrix' | 'withholding_guide' | 'compliance_calendar'>('calculator');

  const currentProvince: PSTProvinceProfile = PST_PROVINCES_DATA[selectedProvince] || PST_PROVINCES_DATA.PRA;

  // Handle province change and reset default sector
  const handleProvinceChange = (prov: PSTProvinceCode) => {
    setSelectedProvince(prov);
    const firstSector = PST_PROVINCES_DATA[prov]?.sectors[0];
    if (firstSector) {
      setSelectedSectorId(firstSector.id);
    }
  };

  // Run calculation
  const result: PSTCalculationResult = calculatePST(
    selectedProvince,
    selectedSectorId,
    serviceValue,
    inputTaxClaimed,
    useConcessionRate,
    withholdingDeductedPercent
  );

  const currentSector: PSTSectorRate = currentProvince.sectors.find(s => s.id === selectedSectorId) || currentProvince.sectors[0];

  // Quick value presets
  const presets = [
    { label: '500K', val: 500000 },
    { label: '1 Million', val: 1000000 },
    { label: '3 Million', val: 3000000 },
    { label: '5 Million', val: 5000000 },
    { label: '10 Million', val: 10000000 },
  ];

  // Export Dossier
  const handleExportDossier = () => {
    const textContent = `
========================================================================
     PROVINCIAL SALES TAX ON SERVICES (PST) STATUTORY DOSSIER
========================================================================
Jurisdiction:                ${result.provinceName} (${result.province})
Revenue Authority:           ${result.authorityName}
Statute:                     ${result.statuteTitle}
Generated on:                ${new Date().toLocaleString()}

[1] SERVICE TRANSACTION DETAILS
------------------------------------------------------------------------
Service Sector / Head:       ${result.serviceSector}
Taxable Service Value:       PKR ${result.serviceValue.toLocaleString()}
Applicable Provincial Rate:  ${result.pstRate}%
Tariff Reference:            ${currentSector.statutoryRef}

[2] OUTPUT TAX LIABILITIES
------------------------------------------------------------------------
GROSS PROVINCIAL OUTPUT PST: PKR ${result.baseOutputPst.toLocaleString()}
Input Tax Paid on Purchases: PKR ${result.inputTaxPaidOnPurchases.toLocaleString()}
Admissible Input Tax Credit: PKR ${result.admissibleInputTax.toLocaleString()}
WHT Deducted at Source:      PKR ${result.withholdingDeductedByClient.toLocaleString()}

[3] PROVINCIAL SETTLEMENT & NET PAYABLE
------------------------------------------------------------------------
NET PST PAYABLE TO TREASURY: PKR ${result.netPstPayableToProvince.toLocaleString()}
TOTAL TAX INVOICE VALUE:     PKR ${result.totalInvoiceAmount.toLocaleString()}

[4] STATUTORY COMPLIANCE DEADLINES
------------------------------------------------------------------------
e-Payment Challan Deadline:  ${result.withholdingDeadline}
Monthly Return Submission:   ${result.returnFilingDeadline}

[5] LEGAL REFERENCES
------------------------------------------------------------------------
${result.statutoryCitations.map((c, i) => `${i + 1}. ${c}`).join('\n')}
========================================================================
`;
    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${result.province}_PST_Return_Dossier_${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
      
      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-indigo-900/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-black bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 flex items-center gap-1.5">
              <Landmark className="w-3.5 h-3.5" />
              Provincial Sales Tax on Services (PST) Suite
            </span>
            <span className="text-xs text-slate-400 font-medium">PRA (16%) • SRB (15%) • KPRA (15%) • BRA (15%) • ICT (15%)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-3">
            <Globe className="w-7 h-7 text-indigo-400" />
            <span>Provincial Sales Tax on Services (PST) Engine</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
            Dynamic statutory service tax computation for Punjab, Sindh, KPK, Balochistan, and Islamabad. Full support for IT concessions, hospitality card discounts, withholding agent mandates, and provincial e-returns.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleExportDossier}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-400 hover:to-indigo-500 text-slate-950 font-black text-xs shadow-lg shadow-indigo-950/40 transition active:scale-98 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Export PST Dossier</span>
          </button>
        </div>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-slate-200 text-xs font-bold">
        {[
          { key: 'calculator', label: 'Provincial PST Calculator', icon: Calculator },
          { key: 'comparison_matrix', label: 'Cross-Provincial Rate Matrix', icon: Layers },
          { key: 'withholding_guide', label: 'Withholding Agent Rules', icon: ShieldCheck },
          { key: 'compliance_calendar', label: 'Provincial Return Deadlines', icon: Clock },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition cursor-pointer whitespace-nowrap ${
                isActive
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-slate-400'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* 4 LIVE KPI RESULT CARDS */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* KPI 1: GROSS OUTPUT PST */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-5 text-white shadow-md border border-slate-700">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">
              Gross Output PST ({result.province})
            </span>
            <span className="text-[10px] font-black bg-indigo-500/30 text-indigo-300 px-2 py-0.5 rounded border border-indigo-500/40">
              {result.pstRate}% Rate
            </span>
          </div>
          <div className="text-2xl font-black mt-2 text-white tracking-tight">
            PKR {result.baseOutputPst.toLocaleString()}
          </div>
          <div className="text-[10px] text-slate-300 mt-1 truncate">
            {result.authorityName}
          </div>
        </div>

        {/* KPI 2: ADMISSIBLE INPUT TAX CREDIT */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Admissible Input Tax
            </span>
            <span className="text-[10px] font-black bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
              {currentSector.inputTaxAdjustable && !useConcessionRate ? 'Adjustable' : 'Inadmissible'}
            </span>
          </div>
          <div className="text-2xl font-black mt-2 text-emerald-700 tracking-tight">
            PKR {result.admissibleInputTax.toLocaleString()}
          </div>
          <div className="text-[10px] text-slate-500 mt-1">
            Claimed: PKR {result.inputTaxPaidOnPurchases.toLocaleString()}
          </div>
        </div>

        {/* KPI 3: CLIENT WITHHOLDING AT SOURCE */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              WHT Deducted at Source
            </span>
            <span className="text-[10px] font-black bg-amber-100 text-amber-900 px-2 py-0.5 rounded">
              {withholdingDeductedPercent}% WHT
            </span>
          </div>
          <div className="text-2xl font-black mt-2 text-slate-950 tracking-tight">
            PKR {result.withholdingDeductedByClient.toLocaleString()}
          </div>
          <div className="text-[10px] text-slate-500 mt-1">
            Deducted by withholding agent client
          </div>
        </div>

        {/* KPI 4: NET PST PAYABLE TO PROVINCIAL TREASURY */}
        <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-900 rounded-2xl p-5 text-white shadow-md border border-indigo-700/60">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-indigo-300 uppercase tracking-wider">
              Net PST Payable
            </span>
            <span className="text-[10px] font-black bg-indigo-500 text-slate-950 px-2 py-0.5 rounded">
              e-Challan
            </span>
          </div>
          <div className="text-2xl font-black mt-2 text-indigo-300 tracking-tight">
            PKR {result.netPstPayableToProvince.toLocaleString()}
          </div>
          <div className="text-[10px] text-slate-300 mt-1 flex justify-between">
            <span>Invoice: PKR {result.totalInvoiceAmount.toLocaleString()}</span>
            <span className="text-indigo-400 font-bold">Due 15th</span>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* MAIN VIEW CONTENTS */}
      {/* ========================================================================= */}

      {activeTab === 'calculator' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* LEFT COLUMN: Input Configuration (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* 1. Province Selector Pills */}
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <label className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                  <Landmark className="w-4 h-4 text-indigo-600" />
                  <span>1. Select Revenue Jurisdiction</span>
                </label>
                <span className="text-[10px] font-bold text-slate-500">Provincial Board</span>
              </div>

              <div className="grid grid-cols-5 gap-1.5">
                {(['PRA', 'SRB', 'KPRA', 'BRA', 'ICT'] as PSTProvinceCode[]).map((provKey) => {
                  const isSelected = selectedProvince === provKey;
                  return (
                    <button
                      key={provKey}
                      type="button"
                      onClick={() => handleProvinceChange(provKey)}
                      className={`py-2.5 px-1 rounded-2xl border text-center transition flex flex-col items-center justify-center cursor-pointer ${
                        isSelected
                          ? 'bg-slate-900 text-white border-slate-900 ring-2 ring-indigo-500 shadow-sm'
                          : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <span className="text-xs font-black">{provKey}</span>
                      <span className={`text-[9px] ${isSelected ? 'text-indigo-300' : 'text-slate-400'}`}>
                        {provKey === 'PRA' ? '16%' : '15%'}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                <div className="font-bold text-slate-900">{currentProvince.name} - {currentProvince.authority}</div>
                <div className="text-[10px] text-slate-500 mt-0.5">{currentProvince.statute}</div>
              </div>
            </div>

            {/* 2. Service Sector Selector */}
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <label className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-indigo-600" />
                  <span>2. Select Service Category / Tariff Head</span>
                </label>
                <span className="text-[10px] font-bold text-slate-500">Second Schedule</span>
              </div>

              <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                {currentProvince.sectors.map((sector) => {
                  const isSelected = selectedSectorId === sector.id;
                  return (
                    <button
                      key={sector.id}
                      type="button"
                      onClick={() => {
                        setSelectedSectorId(sector.id);
                        setUseConcessionRate(false);
                      }}
                      className={`w-full p-3 rounded-2xl border text-left transition flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? 'bg-indigo-50 border-indigo-500 ring-1 ring-indigo-500 text-slate-950'
                          : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <div className="space-y-0.5">
                        <div className="text-xs font-bold">{sector.sectorName}</div>
                        <div className="text-[10px] text-slate-500">{sector.category}</div>
                      </div>
                      <span className={`text-xs font-black px-2.5 py-1 rounded-xl shrink-0 ${
                        isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-800'
                      }`}>
                        {sector.standardRate}%
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Taxable Service Value Input */}
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <label className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                  <Calculator className="w-4 h-4 text-indigo-600" />
                  <span>3. Taxable Service Value (Excl. PST)</span>
                </label>
              </div>

              <div className="relative">
                <span className="absolute left-3.5 top-3 text-xs font-bold text-slate-500">PKR</span>
                <input
                  type="number"
                  value={serviceValue || ''}
                  onChange={(e) => setServiceValue(Number(e.target.value))}
                  placeholder="3000000"
                  className="w-full pl-14 pr-4 py-2.5 text-sm font-black text-slate-950 bg-slate-50 border border-slate-300 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none"
                />
              </div>

              <div className="flex flex-wrap gap-1.5">
                {presets.map((p) => (
                  <button
                    key={p.val}
                    type="button"
                    onClick={() => setServiceValue(p.val)}
                    className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-slate-100 hover:bg-indigo-50 text-slate-700 hover:text-indigo-800 border border-slate-200 transition cursor-pointer"
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Concession & Input Tax Adjustment Controls */}
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <label className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                  <Percent className="w-4 h-4 text-emerald-600" />
                  <span>4. Concession & Input Tax Options</span>
                </label>
              </div>

              {/* Concession Rate Toggle (if available) */}
              {currentSector.concessionRate !== undefined && (
                <div className="p-3 rounded-2xl border border-indigo-200 bg-indigo-50/60 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-indigo-950">
                      Apply Concessionary Rate ({currentSector.concessionRate}%)
                    </span>
                    <p className="text-[10px] text-indigo-700">Fixed rate option without input tax credit adjustment</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={useConcessionRate}
                    onChange={(e) => setUseConcessionRate(e.target.checked)}
                    className="w-4 h-4 accent-indigo-600 rounded cursor-pointer"
                  />
                </div>
              )}

              {/* Input Tax Paid */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-slate-700">Input Tax Paid on Purchases (PKR):</span>
                  <span className="text-[10px] text-slate-500 font-semibold">
                    {currentSector.inputTaxAdjustable && !useConcessionRate ? 'Eligible' : 'Not Allowed with Concession'}
                  </span>
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-xs font-bold text-slate-500">PKR</span>
                  <input
                    type="number"
                    disabled={!currentSector.inputTaxAdjustable || useConcessionRate}
                    value={inputTaxClaimed || ''}
                    onChange={(e) => setInputTaxClaimed(Number(e.target.value))}
                    placeholder="120000"
                    className="w-full pl-12 pr-3 py-1.5 text-xs font-bold text-slate-900 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none disabled:opacity-50 disabled:bg-slate-100"
                  />
                </div>
              </div>

              {/* Client Withholding Deduction */}
              <div className="space-y-1 pt-2 border-t border-slate-100">
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-slate-700">Client Withholding Tax Deducted:</span>
                  <span className="font-bold text-indigo-700">{withholdingDeductedPercent}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="10"
                  value={withholdingDeductedPercent}
                  onChange={(e) => setWithholdingDeductedPercent(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Itemized Provincial Tax Breakdown (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-800 font-black text-sm">
                    <FileCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-slate-950">
                      Provincial Sales Tax (PST) Audit Ledger
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      {currentProvince.name} • {currentProvince.authority}
                    </p>
                  </div>
                </div>

                <span className="text-[10px] font-black text-indigo-900 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-200">
                  {currentProvince.code} Second Schedule
                </span>
              </div>

              {/* Ledger Breakdown */}
              <div className="divide-y divide-slate-100 text-xs">
                
                {/* 1. Taxable Service Turnover */}
                <div className="py-3 flex justify-between items-center">
                  <div className="space-y-0.5">
                    <span className="font-bold text-slate-900">1. Taxable Value of Service Rendered:</span>
                    <div className="text-[10px] text-slate-500">{result.serviceSector}</div>
                  </div>
                  <span className="font-mono font-bold text-slate-900 text-sm">
                    PKR {result.serviceValue.toLocaleString()}
                  </span>
                </div>

                {/* 2. Base Output PST */}
                <div className="py-3 flex justify-between items-center">
                  <div className="space-y-0.5">
                    <span className="font-bold text-slate-900 flex items-center gap-1.5">
                      <span>2. Gross Output PST ({result.pstRate}%):</span>
                      {useConcessionRate && (
                        <span className="text-[10px] bg-indigo-100 text-indigo-800 px-1.5 py-0.2 rounded font-bold">
                          Concessionary Option
                        </span>
                      )}
                    </span>
                    <div className="text-[10px] text-slate-500">{currentSector.statutoryRef}</div>
                  </div>
                  <span className="font-mono font-bold text-indigo-950 text-sm">
                    PKR {result.baseOutputPst.toLocaleString()}
                  </span>
                </div>

                {/* 3. Admissible Input Tax */}
                <div className="py-3 flex justify-between items-center text-emerald-800">
                  <div className="space-y-0.5">
                    <span className="font-bold">3. Admissible Provincial Input Tax Credit:</span>
                    <div className="text-[10px] text-slate-500">
                      {currentSector.inputTaxAdjustable && !useConcessionRate
                        ? `Allowed up to 90% cap (Claimed: PKR ${result.inputTaxPaidOnPurchases.toLocaleString()})`
                        : 'Not eligible under concessionary/fixed rate rules'}
                    </div>
                  </div>
                  <span className="font-mono font-bold text-emerald-700 text-sm">
                    - PKR {result.admissibleInputTax.toLocaleString()}
                  </span>
                </div>

                {/* 4. Client Withholding at Source */}
                {result.withholdingDeductedByClient > 0 && (
                  <div className="py-3 flex justify-between items-center text-amber-900">
                    <div className="space-y-0.5">
                      <span className="font-bold">4. Client Withholding Deducted at Source:</span>
                      <div className="text-[10px] text-amber-700">Deducted under {currentProvince.withholdingStatute}</div>
                    </div>
                    <span className="font-mono font-bold text-sm">
                      - PKR {result.withholdingDeductedByClient.toLocaleString()}
                    </span>
                  </div>
                )}

                {/* 5. Net Payable Box */}
                <div className="py-4 flex justify-between items-center bg-gradient-to-r from-slate-900 to-indigo-950 text-white px-4 rounded-2xl my-2">
                  <div className="space-y-0.5">
                    <span className="text-sm font-black text-indigo-300">
                      NET PST PAYABLE (TREASURY E-CHALLAN):
                    </span>
                    <div className="text-[11px] text-slate-300">
                      Deposit in {currentProvince.authority} account by {currentProvince.paymentDeadline}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono font-black text-xl text-indigo-300">
                      PKR {result.netPstPayableToProvince.toLocaleString()}
                    </div>
                    <div className="text-[10px] text-slate-400 font-medium">e-Payment PSID</div>
                  </div>
                </div>

                {/* 6. Total Customer Invoice */}
                <div className="py-3 flex justify-between items-center text-slate-800">
                  <div className="space-y-0.5">
                    <span className="font-bold">Total Customer Invoice Amount:</span>
                    <div className="text-[10px] text-slate-500">Service Value + Gross Output PST</div>
                  </div>
                  <span className="font-mono font-black text-slate-950 text-base">
                    PKR {result.totalInvoiceAmount.toLocaleString()}
                  </span>
                </div>

              </div>

              {/* Citations Footer */}
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 space-y-1.5">
                <div className="text-[11px] font-bold text-slate-800 flex items-center gap-1.5">
                  <Scale className="w-3.5 h-3.5 text-indigo-700" />
                  <span>Statutory Citations & Compliance Timelines:</span>
                </div>
                <ul className="space-y-1 text-[10px] text-slate-600 list-disc list-inside">
                  {result.statutoryCitations.map((c, i) => (
                    <li key={i} className="leading-relaxed">{c}</li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Portal Link Card */}
            <div className="bg-slate-900 rounded-3xl p-5 text-white border border-slate-800 shadow-xs flex items-center justify-between gap-4">
              <div className="space-y-0.5">
                <h4 className="text-xs font-black text-white">{currentProvince.authority} Official Portal</h4>
                <p className="text-[11px] text-slate-400">
                  Direct submission of monthly sales tax on services electronic return.
                </p>
              </div>
              <a
                href={currentProvince.portalUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 shrink-0 transition"
              >
                <span>Open {currentProvince.code} Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

        </div>
      )}

      {/* TAB 2: CROSS-PROVINCIAL RATE MATRIX */}
      {activeTab === 'comparison_matrix' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div>
            <h3 className="text-base font-black text-slate-950 flex items-center gap-2">
              <Layers className="w-5 h-5 text-indigo-600" />
              <span>Cross-Provincial Sales Tax on Services Comparative Rate Matrix</span>
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Harmonization overview across PRA (Punjab), SRB (Sindh), KPRA (KPK), BRA (Balochistan), and ICT (Islamabad).
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white font-bold">
                  <th className="py-3 px-3">Sector / Activity</th>
                  <th className="py-3 px-3 text-center">PRA (Punjab)</th>
                  <th className="py-3 px-3 text-center">SRB (Sindh)</th>
                  <th className="py-3 px-3 text-center">KPRA (KPK)</th>
                  <th className="py-3 px-3 text-center">BRA (Balochistan)</th>
                  <th className="py-3 px-3 text-center">ICT (Federal)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800">
                {[
                  { sector: 'Standard Rate on General Services', pra: '16%', srb: '15%', kpra: '15%', bra: '15%', ict: '15%' },
                  { sector: 'IT, Software & SaaS Exports', pra: '0% (Exempt)', srb: '3% / 13%', kpra: '2%', bra: '5%', ict: '0% (Exempt)' },
                  { sector: 'Telecommunications & Data', pra: '19.5%', srb: '19.5%', kpra: '19.5%', bra: '19.5%', ict: '19.5%' },
                  { sector: 'Construction & Civil Works', pra: '16% / 5%', srb: '15% / 8%', kpra: '15% / 5%', bra: '15% / 6%', ict: '15% / 5%' },
                  { sector: 'Hotels & Restaurants (Card/POS)', pra: '5% (Card)', srb: '8% (Card)', kpra: '8% / 5%', bra: '15%', ict: '5% (Card)' },
                  { sector: 'Management & Legal Consultancy', pra: '16%', srb: '15%', kpra: '15%', bra: '15%', ict: '15%' },
                  { sector: 'Freight Forwarding & Cargo', pra: '4% / 16%', srb: '15%', kpra: '15%', bra: '15%', ict: '15%' },
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="py-3 px-3 font-semibold text-slate-900">{row.sector}</td>
                    <td className="py-3 px-3 text-center font-mono font-bold text-indigo-700">{row.pra}</td>
                    <td className="py-3 px-3 text-center font-mono font-bold text-slate-800">{row.srb}</td>
                    <td className="py-3 px-3 text-center font-mono font-bold text-emerald-700">{row.kpra}</td>
                    <td className="py-3 px-3 text-center font-mono font-bold text-slate-800">{row.bra}</td>
                    <td className="py-3 px-3 text-center font-mono font-bold text-indigo-700">{row.ict}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: WITHHOLDING AGENT RULES */}
      {activeTab === 'withholding_guide' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div>
            <h3 className="text-base font-black text-slate-950 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-indigo-600" />
              <span>Provincial Withholding Agent Responsibilities & Rules</span>
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Statutory obligations for designated withholding agents under PRA 2015, SRB 2014, and KPRA regulations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
            <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-2">
              <span className="font-black text-slate-950 block">Who is a Provincial Withholding Agent?</span>
              <ul className="space-y-1.5 text-slate-600 list-disc list-inside">
                <li>Federal and Provincial Government Departments and Local Authorities</li>
                <li>Autonomous Bodies, Corporations, State-Owned Enterprises</li>
                <li>Companies registered under the Companies Act, 2017</li>
                <li>FBR Active Taxpayers registered for Federal Sales Tax on goods</li>
                <li>Recipients of advertising, freight forwarding and franchise services</li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl border border-indigo-200 bg-indigo-50/60 space-y-2">
              <span className="font-black text-indigo-950 block">Deduction & Deposit Obligations:</span>
              <ul className="space-y-1.5 text-indigo-900 list-disc list-inside">
                <li>Deduct PST at prescribed statutory rates at time of making payment to service provider</li>
                <li>Deposit withheld amount in Provincial Treasury by 15th of following month</li>
                <li>Issue Withholding Tax Deduction Certificate to service provider within 10 days</li>
                <li>Submit monthly Withholding Statement electronically via provincial portal</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: COMPLIANCE CALENDAR */}
      {activeTab === 'compliance_calendar' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div>
            <h3 className="text-base font-black text-slate-950 flex items-center gap-2">
              <Clock className="w-5 h-5 text-indigo-600" />
              <span>Provincial Monthly Return Statutory Filing Deadlines</span>
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Prescribed statutory timelines for tax deposit and electronic return submission.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="p-5 rounded-2xl border border-amber-200 bg-amber-50/60 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-amber-950">1. e-Payment Deposit (Challan)</span>
                <span className="text-xs font-mono font-bold bg-amber-200/60 text-amber-900 px-2 py-0.5 rounded">
                  15th of Month
                </span>
              </div>
              <p className="text-xs text-amber-900 leading-relaxed">
                Gross or net PST liability must be paid into the respective provincial treasury via 1Link PSID or National Bank of Pakistan (NBP) on or before the <strong>15th day of the succeeding month</strong>.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-emerald-200 bg-emerald-50/60 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-emerald-950">2. Electronic Return (Annexure Submission)</span>
                <span className="text-xs font-mono font-bold bg-emerald-200/60 text-emerald-900 px-2 py-0.5 rounded">
                  18th of Month
                </span>
              </div>
              <p className="text-xs text-emerald-900 leading-relaxed">
                The final electronic sales tax on services return along with Annexure-A (Purchases) and Annexure-C (Sales) must be e-filed on or before the <strong>18th day of the succeeding month</strong>.
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
