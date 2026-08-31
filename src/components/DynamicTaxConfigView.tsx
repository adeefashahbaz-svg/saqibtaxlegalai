import React, { useState } from 'react';
import {
  DynamicTaxConfigSchema,
  DynamicTaxSlab,
  DynamicWHTRate,
  DynamicSalesTaxRate,
  DynamicSuperTaxSlab,
  FirmBrandingSettings
} from '../types';
import {
  getDynamicTaxConfig,
  saveDynamicTaxConfig,
  resetDynamicTaxConfig,
  calculateDynamicIncomeTax,
  calculateDynamicSuperTax,
  calculateDynamic7ETax,
  calculateDynamicSalesTax,
  exportTaxConfigJSON,
  importTaxConfigJSON,
  STATUTORY_DEFAULT_TAX_CONFIG
} from '../utils/dynamicTaxConfig';
import { generateDynamicTaxRatesPDF } from '../utils/pdfGenerator';
import {
  Sliders,
  FileJson,
  Download,
  Upload,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Calculator,
  Percent,
  Building,
  Shield,
  Layers,
  ArrowRight,
  Plus,
  Trash2,
  Edit3,
  Save,
  X
} from 'lucide-react';

interface DynamicTaxConfigViewProps {
  firmBranding?: FirmBrandingSettings;
}

export const DynamicTaxConfigView: React.FC<DynamicTaxConfigViewProps> = ({ firmBranding }) => {
  const [config, setConfig] = useState<DynamicTaxConfigSchema>(() => getDynamicTaxConfig());
  const [activeConfigTab, setActiveConfigTab] = useState<
    'income_tax' | 'super_tax' | 'section_7e' | 'sales_tax' | 'wht_matrix' | 'sandbox' | 'json_schema'
  >('income_tax');

  // Notification feedback
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: 'success' | 'error' | 'info' } | null>(null);

  // JSON Import State
  const [jsonInput, setJsonInput] = useState<string>('');

  // Interactive Live Sandbox State
  const [sandboxIncome, setSandboxIncome] = useState<number>(3500000);
  const [sandboxCategory, setSandboxCategory] = useState<'salaried' | 'business' | 'aop' | 'company'>('salaried');
  const [sandboxFMV, setSandboxFMV] = useState<number>(65000000);
  const [sandboxIsFiler, setSandboxIsFiler] = useState<boolean>(true);
  const [sandboxSalesAmount, setSandboxSalesAmount] = useState<number>(5000000);
  const [sandboxJurisdiction, setSandboxJurisdiction] = useState<'FBR' | 'PRA' | 'SRB' | 'KPRA' | 'BRA'>('PRA');

  // Edit Slab Modal State
  const [editingSlab, setEditingSlab] = useState<{
    type: 'salaried' | 'business' | 'aop';
    slab: DynamicTaxSlab;
    index: number;
  } | null>(null);

  const showStatus = (text: string, type: 'success' | 'error' | 'info' = 'success') => {
    setStatusMessage({ text, type });
    setTimeout(() => setStatusMessage(null), 4500);
  };

  const handleSaveConfig = (updated: DynamicTaxConfigSchema) => {
    saveDynamicTaxConfig(updated);
    setConfig({ ...updated, isCustomOverrideActive: true });
    showStatus('Dynamic Tax Configuration successfully saved and activated across the platform.', 'success');
  };

  const handleResetToDefault = () => {
    if (window.confirm('Reset all tax slabs and rates to official Finance Act 2026 statutory defaults?')) {
      const def = resetDynamicTaxConfig();
      setConfig(def);
      showStatus('Tax configuration reset to official Finance Act 2026 statutory defaults.', 'info');
    }
  };

  const handleExportJSON = () => {
    const jsonStr = exportTaxConfigJSON(config);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SaqibTax_Tax_Config_Schema_TY${config.statutoryTaxYear.replace(/[^a-zA-Z0-9]/g, '_')}_v${config.version}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showStatus('Tax Configuration Schema JSON exported successfully.', 'success');
  };

  const handleImportJSON = () => {
    if (!jsonInput.trim()) {
      showStatus('Please paste a valid JSON schema string.', 'error');
      return;
    }
    const res = importTaxConfigJSON(jsonInput);
    if (res.success && res.config) {
      setConfig(res.config);
      showStatus(res.message, 'success');
      setJsonInput('');
    } else {
      showStatus(res.message, 'error');
    }
  };

  const handleDownloadPDF = () => {
    generateDynamicTaxRatesPDF(config, firmBranding);
    showStatus('Official Tax Rate Matrix PDF generated and downloaded.', 'success');
  };

  // Live calculation results
  const incomeTaxCalc = calculateDynamicIncomeTax(sandboxIncome, sandboxCategory, config);
  const superTaxCalc = calculateDynamicSuperTax(sandboxIncome, false, config);
  const deemed7ECalc = calculateDynamic7ETax(sandboxFMV, true, sandboxIsFiler, config);
  const salesTaxCalc = calculateDynamicSalesTax(sandboxSalesAmount, sandboxJurisdiction, config);

  return (
    <div className="space-y-6">
      {/* Top Banner & Control Bar */}
      <div className="bg-slate-800/90 border border-slate-700/80 rounded-xl p-5 shadow-lg backdrop-blur-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-emerald-950/80 border border-emerald-600/50 rounded-lg text-emerald-400">
                <Sliders className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2.5">
                  <h2 className="text-xl font-bold text-slate-100">Dynamic Tax Slab & Rate Configurator</h2>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                    config.isCustomOverrideActive
                      ? 'bg-amber-950/80 border-amber-500/80 text-amber-300'
                      : 'bg-emerald-950/80 border-emerald-500/80 text-emerald-300'
                  }`}>
                    {config.isCustomOverrideActive ? 'Custom SRO Override Active' : 'Official Statutory Enactment'}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  {config.financeActName} • Tax Year {config.statutoryTaxYear} • Schema v{config.version} (Effective: {config.effectiveDate})
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              id="btn-export-rates-pdf"
              onClick={handleDownloadPDF}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-200 transition shadow-sm"
              title="Download official PDF rate schedule"
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" />
              <span>Export PDF Matrix</span>
            </button>

            <button
              id="btn-export-rates-json"
              onClick={handleExportJSON}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-200 transition shadow-sm"
              title="Export JSON schema"
            >
              <FileJson className="w-3.5 h-3.5 text-blue-400" />
              <span>Export JSON</span>
            </button>

            <button
              id="btn-reset-rates-default"
              onClick={handleResetToDefault}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-rose-950/60 border border-slate-600 hover:border-rose-700/60 text-slate-300 hover:text-rose-300 transition shadow-sm"
              title="Reset to official statutory defaults"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>
          </div>
        </div>

        {/* Status Toast */}
        {statusMessage && (
          <div className={`mt-4 p-3 rounded-lg text-xs font-medium flex items-center gap-2 border ${
            statusMessage.type === 'success' ? 'bg-emerald-950/80 border-emerald-600 text-emerald-300' :
            statusMessage.type === 'error' ? 'bg-rose-950/80 border-rose-600 text-rose-300' :
            'bg-blue-950/80 border-blue-600 text-blue-300'
          }`}>
            {statusMessage.type === 'success' ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <AlertTriangle className="w-4 h-4 text-amber-400" />}
            <span>{statusMessage.text}</span>
          </div>
        )}
      </div>

      {/* Sub-Tabs */}
      <div className="flex border-b border-slate-800 overflow-x-auto gap-2 pb-1 scrollbar-thin">
        {[
          { id: 'income_tax', label: 'Income Tax Slabs (Salaried & Business)', icon: Percent },
          { id: 'super_tax', label: 'Super Tax (Sec 4C)', icon: Layers },
          { id: 'section_7e', label: 'Deemed Property Rent (Sec 7E)', icon: Building },
          { id: 'sales_tax', label: 'Sales Tax & PST (PRA/SRB)', icon: FileText },
          { id: 'wht_matrix', label: 'Withholding Matrix (WHT)', icon: Shield },
          { id: 'sandbox', label: 'Live Formula Sandbox', icon: Calculator },
          { id: 'json_schema', label: 'JSON Schema Import/Export', icon: FileJson },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeConfigTab === tab.id;
          return (
            <button
              key={tab.id}
              id={`tab-config-${tab.id}`}
              onClick={() => setActiveConfigTab(tab.id as any)}
              className={`flex items-center gap-2 px-3.5 py-2.5 text-xs font-semibold rounded-lg whitespace-nowrap transition ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: Income Tax Slabs */}
      {activeConfigTab === 'income_tax' && (
        <div className="space-y-6">
          {/* Salaried Slabs */}
          <div className="bg-slate-850 border border-slate-700/80 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                  Salaried Individual Slabs (First Schedule, Part I, Division I)
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Applies when taxable salary constitutes more than 75% of total income under Section 149.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto rounded-lg border border-slate-800">
              <table className="w-full text-xs text-left text-slate-300">
                <thead className="bg-slate-800/90 text-slate-400 font-semibold border-b border-slate-700">
                  <tr>
                    <th className="py-2.5 px-3">Slab #</th>
                    <th className="py-2.5 px-3">Taxable Range (PKR)</th>
                    <th className="py-2.5 px-3">Base Fixed Tax</th>
                    <th className="py-2.5 px-3">Rate on Excess</th>
                    <th className="py-2.5 px-3">Statutory Legal Citation</th>
                    <th className="py-2.5 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono">
                  {config.incomeTax.salariedSlabs.map((slab, idx) => (
                    <tr key={slab.id} className="hover:bg-slate-800/40">
                      <td className="py-2.5 px-3 font-semibold text-slate-200">{slab.slabIndex}</td>
                      <td className="py-2.5 px-3 font-sans">
                        {slab.maxIncome > 500000000
                          ? `Exceeding PKR ${slab.minIncome.toLocaleString()}`
                          : `PKR ${slab.minIncome.toLocaleString()} to ${slab.maxIncome.toLocaleString()}`}
                      </td>
                      <td className="py-2.5 px-3 text-emerald-400 font-semibold">
                        PKR {slab.fixedTax.toLocaleString()}
                      </td>
                      <td className="py-2.5 px-3">
                        <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold">
                          {slab.ratePercentage}%
                        </span>
                      </td>
                      <td className="py-2.5 px-3 font-sans text-slate-400 text-[11px]">
                        {slab.legalProvisionRef}
                      </td>
                      <td className="py-2.5 px-3 text-right">
                        <button
                          onClick={() => setEditingSlab({ type: 'salaried', slab: { ...slab }, index: idx })}
                          className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-sans flex items-center gap-1 ml-auto"
                        >
                          <Edit3 className="w-3 h-3 text-emerald-400" />
                          <span>Edit</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Non-Salaried / Business Slabs */}
          <div className="bg-slate-850 border border-slate-700/80 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block" />
                  Non-Salaried & Business Individual Slabs (First Schedule, Part I, Division I)
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Applies to Sole Proprietors, Business Individuals, and Freelancers under Section 114.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto rounded-lg border border-slate-800">
              <table className="w-full text-xs text-left text-slate-300">
                <thead className="bg-slate-800/90 text-slate-400 font-semibold border-b border-slate-700">
                  <tr>
                    <th className="py-2.5 px-3">Slab #</th>
                    <th className="py-2.5 px-3">Taxable Range (PKR)</th>
                    <th className="py-2.5 px-3">Base Fixed Tax</th>
                    <th className="py-2.5 px-3">Rate on Excess</th>
                    <th className="py-2.5 px-3">Statutory Legal Citation</th>
                    <th className="py-2.5 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono">
                  {config.incomeTax.nonSalariedSlabs.map((slab, idx) => (
                    <tr key={slab.id} className="hover:bg-slate-800/40">
                      <td className="py-2.5 px-3 font-semibold text-slate-200">{slab.slabIndex}</td>
                      <td className="py-2.5 px-3 font-sans">
                        {slab.maxIncome > 500000000
                          ? `Exceeding PKR ${slab.minIncome.toLocaleString()}`
                          : `PKR ${slab.minIncome.toLocaleString()} to ${slab.maxIncome.toLocaleString()}`}
                      </td>
                      <td className="py-2.5 px-3 text-blue-400 font-semibold">
                        PKR {slab.fixedTax.toLocaleString()}
                      </td>
                      <td className="py-2.5 px-3">
                        <span className="px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800 font-bold">
                          {slab.ratePercentage}%
                        </span>
                      </td>
                      <td className="py-2.5 px-3 font-sans text-slate-400 text-[11px]">
                        {slab.legalProvisionRef}
                      </td>
                      <td className="py-2.5 px-3 text-right">
                        <button
                          onClick={() => setEditingSlab({ type: 'business', slab: { ...slab }, index: idx })}
                          className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-sans flex items-center gap-1 ml-auto"
                        >
                          <Edit3 className="w-3 h-3 text-blue-400" />
                          <span>Edit</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Corporate Tax Rate Setting */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-850 border border-slate-700/80 rounded-xl p-4">
              <h4 className="text-sm font-bold text-slate-200">Standard Corporate Tax Rate</h4>
              <p className="text-xs text-slate-400 mt-1">First Schedule, Part I, Division II (Companies)</p>
              <div className="mt-3 flex items-center gap-3">
                <input
                  type="number"
                  value={config.incomeTax.corporateStandardRate}
                  onChange={(e) => {
                    const updated = {
                      ...config,
                      incomeTax: { ...config.incomeTax, corporateStandardRate: Number(e.target.value) }
                    };
                    handleSaveConfig(updated);
                  }}
                  className="w-24 px-3 py-1.5 rounded bg-slate-900 border border-slate-700 text-slate-100 text-sm font-mono font-bold"
                />
                <span className="text-sm font-semibold text-slate-300">% Flat Rate on Net Profits</span>
              </div>
            </div>

            <div className="bg-slate-850 border border-slate-700/80 rounded-xl p-4">
              <h4 className="text-sm font-bold text-slate-200">Small Company / SME Rate</h4>
              <p className="text-xs text-slate-400 mt-1">Fourteenth Schedule / Section 2(59A) Turnover Concessions</p>
              <div className="mt-3 flex items-center gap-3">
                <input
                  type="number"
                  value={config.incomeTax.smallCompanyRate}
                  onChange={(e) => {
                    const updated = {
                      ...config,
                      incomeTax: { ...config.incomeTax, smallCompanyRate: Number(e.target.value) }
                    };
                    handleSaveConfig(updated);
                  }}
                  className="w-24 px-3 py-1.5 rounded bg-slate-900 border border-slate-700 text-slate-100 text-sm font-mono font-bold"
                />
                <span className="text-sm font-semibold text-slate-300">% Concessional Rate</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Super Tax Slabs */}
      {activeConfigTab === 'super_tax' && (
        <div className="bg-slate-850 border border-slate-700/80 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-100">
                Section 4C Super Tax on High Earning Persons (Division IIB, First Schedule)
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Levied on income exceeding PKR 150 Million. Specified sectors (Banking, Fertilizers, Steel, Sugar) pay up to 10%.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto rounded-lg border border-slate-800">
            <table className="w-full text-xs text-left text-slate-300">
              <thead className="bg-slate-800/90 text-slate-400 font-semibold border-b border-slate-700">
                <tr>
                  <th className="py-2.5 px-3">Income Range (PKR)</th>
                  <th className="py-2.5 px-3">General Sector Rate</th>
                  <th className="py-2.5 px-3">Specified Sectors Rate</th>
                  <th className="py-2.5 px-3">Statutory Legal Clause</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                {config.incomeTax.superTaxSlabs.map((st) => (
                  <tr key={st.id} className="hover:bg-slate-800/40">
                    <td className="py-2.5 px-3 font-sans">
                      {st.maxIncome > 5000000000
                        ? `Exceeding PKR ${(st.minIncome / 1000000).toFixed(0)} Million`
                        : `PKR ${(st.minIncome / 1000000).toFixed(0)}M to ${(st.maxIncome / 1000000).toFixed(0)}M`}
                    </td>
                    <td className="py-2.5 px-3">
                      <span className="px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800 font-bold">
                        {st.ratePercentage}%
                      </span>
                    </td>
                    <td className="py-2.5 px-3">
                      <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800 font-bold">
                        {st.specifiedSectorsRatePercentage || 10}%
                      </span>
                    </td>
                    <td className="py-2.5 px-3 font-sans text-slate-400 text-[11px]">
                      {st.legalClause}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: Section 7E Rules */}
      {activeConfigTab === 'section_7e' && (
        <div className="bg-slate-850 border border-slate-700/80 rounded-xl p-5 space-y-5">
          <div>
            <h3 className="text-base font-bold text-slate-100">Section 7E Immovable Property Deemed Rental Income</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Deems rental income equal to 5% of Fair Market Value of capital assets situated in Pakistan, taxed at 20%.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-900/80 border border-slate-800 rounded-lg p-4">
              <label className="text-xs font-semibold text-slate-400">Deemed Rent Formula Rate</label>
              <div className="mt-2 flex items-center gap-2">
                <input
                  type="number"
                  value={config.section7E.deemedRentRatePercentage}
                  onChange={(e) => {
                    const updated = {
                      ...config,
                      section7E: { ...config.section7E, deemedRentRatePercentage: Number(e.target.value) }
                    };
                    handleSaveConfig(updated);
                  }}
                  className="w-20 px-2.5 py-1.5 rounded bg-slate-800 border border-slate-700 text-slate-100 text-sm font-mono font-bold"
                />
                <span className="text-xs font-medium text-slate-300">% of FMV (Sec 7E(1))</span>
              </div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-lg p-4">
              <label className="text-xs font-semibold text-slate-400">Tax Rate on Deemed Rent</label>
              <div className="mt-2 flex items-center gap-2">
                <input
                  type="number"
                  value={config.section7E.taxRateOnDeemedRent}
                  onChange={(e) => {
                    const updated = {
                      ...config,
                      section7E: { ...config.section7E, taxRateOnDeemedRent: Number(e.target.value) }
                    };
                    handleSaveConfig(updated);
                  }}
                  className="w-20 px-2.5 py-1.5 rounded bg-slate-800 border border-slate-700 text-slate-100 text-sm font-mono font-bold"
                />
                <span className="text-xs font-medium text-slate-300">% (Effective 1% of FMV)</span>
              </div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-lg p-4">
              <label className="text-xs font-semibold text-slate-400">Primary Residence Exemption Threshold</label>
              <div className="mt-2 flex items-center gap-2">
                <input
                  type="number"
                  value={config.section7E.exemptionThresholdFairMarketValue}
                  onChange={(e) => {
                    const updated = {
                      ...config,
                      section7E: { ...config.section7E, exemptionThresholdFairMarketValue: Number(e.target.value) }
                    };
                    handleSaveConfig(updated);
                  }}
                  className="w-36 px-2.5 py-1.5 rounded bg-slate-800 border border-slate-700 text-slate-100 text-sm font-mono font-bold"
                />
                <span className="text-xs font-medium text-slate-300">PKR</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: Sales Tax & Provincial Rates */}
      {activeConfigTab === 'sales_tax' && (
        <div className="bg-slate-850 border border-slate-700/80 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-100">
                Federal & Provincial Sales Tax on Services (PST) Matrix
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Configures standard and withholding rates for FBR (Goods) and Provincial Authorities (PRA, SRB, KPRA, BRA).
              </p>
            </div>
          </div>

          <div className="overflow-x-auto rounded-lg border border-slate-800">
            <table className="w-full text-xs text-left text-slate-300">
              <thead className="bg-slate-800/90 text-slate-400 font-semibold border-b border-slate-700">
                <tr>
                  <th className="py-2.5 px-3">Authority</th>
                  <th className="py-2.5 px-3">Jurisdiction Name</th>
                  <th className="py-2.5 px-3">Standard Rate</th>
                  <th className="py-2.5 px-3">Withholding Standard</th>
                  <th className="py-2.5 px-3">Governing Legal Enactment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                {config.salesTax.map((st) => (
                  <tr key={st.id} className="hover:bg-slate-800/40">
                    <td className="py-2.5 px-3 font-semibold text-emerald-400">{st.jurisdiction}</td>
                    <td className="py-2.5 px-3 font-sans">{st.jurisdictionName}</td>
                    <td className="py-2.5 px-3">
                      <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold">
                        {st.standardRate}%
                      </span>
                    </td>
                    <td className="py-2.5 px-3">
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-200 border border-slate-700 font-medium">
                        {st.withholdingRateStandard}%
                      </span>
                    </td>
                    <td className="py-2.5 px-3 font-sans text-slate-400 text-[11px]">
                      {st.legalActRef}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 5: Withholding Tax Matrix */}
      {activeConfigTab === 'wht_matrix' && (
        <div className="bg-slate-850 border border-slate-700/80 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-100">
                Withholding Tax (WHT) Rates Schedule (Part III, First Schedule)
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Active Filer vs. Non-Filer rate differentials under 10th Schedule to the Income Tax Ordinance, 2001.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto rounded-lg border border-slate-800">
            <table className="w-full text-xs text-left text-slate-300">
              <thead className="bg-slate-800/90 text-slate-400 font-semibold border-b border-slate-700">
                <tr>
                  <th className="py-2.5 px-3">Section</th>
                  <th className="py-2.5 px-3">Transaction Description</th>
                  <th className="py-2.5 px-3">Category</th>
                  <th className="py-2.5 px-3">Active Filer Rate</th>
                  <th className="py-2.5 px-3">Non-Filer Rate</th>
                  <th className="py-2.5 px-3">Threshold</th>
                  <th className="py-2.5 px-3">Regime</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                {config.withholdingTaxMatrix.map((wht) => (
                  <tr key={wht.id} className="hover:bg-slate-800/40">
                    <td className="py-2.5 px-3 font-semibold text-amber-300">{wht.sectionCode}</td>
                    <td className="py-2.5 px-3 font-sans font-medium text-slate-200">{wht.title}</td>
                    <td className="py-2.5 px-3 capitalize font-sans text-slate-400">{wht.category}</td>
                    <td className="py-2.5 px-3">
                      <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold">
                        {wht.filerRate}%
                      </span>
                    </td>
                    <td className="py-2.5 px-3">
                      <span className="px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800 font-bold">
                        {wht.nonFilerRate}%
                      </span>
                    </td>
                    <td className="py-2.5 px-3 font-sans">
                      {wht.thresholdAmount > 0 ? `PKR ${wht.thresholdAmount.toLocaleString()}` : 'No Threshold'}
                    </td>
                    <td className="py-2.5 px-3 font-sans text-[11px]">
                      {wht.isAdjustable ? (
                        <span className="text-blue-400">Adjustable (Advance)</span>
                      ) : (
                        <span className="text-amber-400">Final / Minimum Tax</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 6: Live Formula Sandbox */}
      {activeConfigTab === 'sandbox' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 bg-slate-850 border border-slate-700/80 rounded-xl p-5 space-y-4">
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <Calculator className="w-4 h-4 text-emerald-400" />
              Interactive Simulation Inputs
            </h3>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Annual Taxable Income (PKR)</label>
              <input
                type="number"
                value={sandboxIncome}
                onChange={(e) => setSandboxIncome(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 text-sm font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Taxpayer Category</label>
              <select
                value={sandboxCategory}
                onChange={(e) => setSandboxCategory(e.target.value as any)}
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 text-xs"
              >
                <option value="salaried">Salaried Individual (Sec 149)</option>
                <option value="business">Non-Salaried / Business Individual</option>
                <option value="aop">Association of Persons (AOP / Firm)</option>
                <option value="company">Corporate Entity (Standard Company)</option>
              </select>
            </div>

            <div className="pt-2 border-t border-slate-800">
              <label className="block text-xs font-semibold text-slate-300 mb-1">Property Fair Market Value (Section 7E)</label>
              <input
                type="number"
                value={sandboxFMV}
                onChange={(e) => setSandboxFMV(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 text-sm font-mono"
              />
              <div className="mt-2 flex items-center gap-2">
                <input
                  type="checkbox"
                  id="chk-sandbox-filer"
                  checked={sandboxIsFiler}
                  onChange={(e) => setSandboxIsFiler(e.target.checked)}
                  className="rounded border-slate-700 text-emerald-600 focus:ring-emerald-500"
                />
                <label htmlFor="chk-sandbox-filer" className="text-xs text-slate-300">Active Filer Status</label>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800">
              <label className="block text-xs font-semibold text-slate-300 mb-1">Sales Tax Supplies Value (PKR)</label>
              <input
                type="number"
                value={sandboxSalesAmount}
                onChange={(e) => setSandboxSalesAmount(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 text-sm font-mono"
              />
              <div className="mt-2">
                <label className="block text-xs font-semibold text-slate-400 mb-1">PST Jurisdiction</label>
                <select
                  value={sandboxJurisdiction}
                  onChange={(e) => setSandboxJurisdiction(e.target.value as any)}
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 text-xs"
                >
                  <option value="FBR">FBR - Federal Goods (18%)</option>
                  <option value="PRA">PRA - Punjab Services (16%)</option>
                  <option value="SRB">SRB - Sindh Services (15%)</option>
                  <option value="KPRA">KPRA - KP Services (15%)</option>
                  <option value="BRA">BRA - Balochistan Services (15%)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-4">
            {/* Income Tax Result Card */}
            <div className="bg-slate-850 border border-slate-700/80 rounded-xl p-5">
              <h4 className="text-sm font-bold text-slate-100 mb-3 flex items-center justify-between">
                <span>Deterministic Income Tax Assessment</span>
                <span className="text-xs font-mono text-emerald-400 font-semibold">
                  Effective Rate: {incomeTaxCalc.effectiveRate}%
                </span>
              </h4>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
                <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800">
                  <div className="text-[11px] font-sans text-slate-400">Total Tax Liability</div>
                  <div className="text-base font-bold text-emerald-400 mt-1">
                    PKR {incomeTaxCalc.totalIncomeTax.toLocaleString()}
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800">
                  <div className="text-[11px] font-sans text-slate-400">Monthly Deduction</div>
                  <div className="text-base font-bold text-slate-200 mt-1">
                    PKR {incomeTaxCalc.monthlyTaxDeduction.toLocaleString()}
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800">
                  <div className="text-[11px] font-sans text-slate-400">Base Fixed Tax</div>
                  <div className="text-base font-bold text-slate-200 mt-1">
                    PKR {incomeTaxCalc.fixedTax.toLocaleString()}
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800">
                  <div className="text-[11px] font-sans text-slate-400">Marginal Rate</div>
                  <div className="text-base font-bold text-amber-400 mt-1">
                    {incomeTaxCalc.ratePercentage}%
                  </div>
                </div>
              </div>

              <div className="mt-3 p-2.5 rounded bg-slate-900/60 border border-slate-800/80 text-xs text-slate-300">
                <span className="font-semibold text-emerald-400">Matched Slab:</span> {incomeTaxCalc.slabDescription} ({incomeTaxCalc.legalProvisionRef})
              </div>
            </div>

            {/* Section 4C Super Tax & 7E */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-850 border border-slate-700/80 rounded-xl p-4">
                <h5 className="text-xs font-bold text-slate-200">Section 4C Super Tax</h5>
                <div className="mt-2 text-lg font-bold font-mono text-purple-400">
                  PKR {superTaxCalc.superTaxAmount.toLocaleString()}
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  Applicable Rate: <span className="font-bold text-purple-300">{superTaxCalc.applicableRate}%</span>
                </div>
                <div className="text-[11px] text-slate-500 mt-1">{superTaxCalc.legalClause}</div>
              </div>

              <div className="bg-slate-850 border border-slate-700/80 rounded-xl p-4">
                <h5 className="text-xs font-bold text-slate-200">Section 7E Deemed Property Tax</h5>
                <div className="mt-2 text-lg font-bold font-mono text-amber-400">
                  PKR {deemed7ECalc.taxAmount.toLocaleString()}
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  Deemed Rent: PKR {deemed7ECalc.deemedRent.toLocaleString()} (1% of FMV)
                </div>
                <div className="text-[11px] text-slate-500 mt-1">{deemed7ECalc.statusNotes}</div>
              </div>
            </div>

            {/* Sales Tax Result Card */}
            <div className="bg-slate-850 border border-slate-700/80 rounded-xl p-4">
              <h5 className="text-xs font-bold text-slate-200 flex items-center justify-between">
                <span>{salesTaxCalc.jurisdiction}</span>
                <span className="text-emerald-400 font-mono font-bold">{salesTaxCalc.standardRate}% PST Rate</span>
              </h5>
              <div className="grid grid-cols-3 gap-3 mt-3 font-mono">
                <div className="p-2 rounded bg-slate-900 border border-slate-800">
                  <div className="text-[10px] font-sans text-slate-400">Sales Tax Amount</div>
                  <div className="text-sm font-bold text-emerald-400">PKR {salesTaxCalc.salesTaxAmount.toLocaleString()}</div>
                </div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800">
                  <div className="text-[10px] font-sans text-slate-400">Total Invoice</div>
                  <div className="text-sm font-bold text-slate-200">PKR {salesTaxCalc.totalWithTax.toLocaleString()}</div>
                </div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800">
                  <div className="text-[10px] font-sans text-slate-400">Withholding Tax</div>
                  <div className="text-sm font-bold text-amber-300">PKR {salesTaxCalc.withholdingAmount.toLocaleString()}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 7: JSON Schema Import / Export */}
      {activeConfigTab === 'json_schema' && (
        <div className="bg-slate-850 border border-slate-700/80 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-100">Tax Configuration JSON Schema</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Export current rate matrix or inject updated SRO amendments directly into the runtime engine.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleExportJSON}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Schema JSON</span>
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-xs font-semibold text-slate-300">
              Paste Custom Schema JSON to Inject / Override:
            </label>
            <textarea
              rows={10}
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              placeholder='Paste JSON schema here (e.g. {"version": "2026.3.0", "incomeTax": { ... }})'
              className="w-full p-3 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 font-mono text-xs focus:ring-1 focus:ring-emerald-500 outline-none"
            />
            <div className="flex items-center justify-between">
              <button
                onClick={() => setJsonInput(exportTaxConfigJSON(config))}
                className="text-xs text-slate-400 hover:text-slate-200 underline"
              >
                Load Current Active Schema into Textarea
              </button>
              <button
                onClick={handleImportJSON}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Validate & Activate Schema</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Slab Modal */}
      {editingSlab && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 w-full max-w-lg shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-emerald-400" />
                Edit Tax Slab #{editingSlab.slab.slabIndex} ({editingSlab.type.toUpperCase()})
              </h3>
              <button
                onClick={() => setEditingSlab(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Minimum Income (PKR)</label>
                  <input
                    type="number"
                    value={editingSlab.slab.minIncome}
                    onChange={(e) =>
                      setEditingSlab({
                        ...editingSlab,
                        slab: { ...editingSlab.slab, minIncome: Number(e.target.value) }
                      })
                    }
                    className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700 text-slate-100 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Maximum Income (PKR)</label>
                  <input
                    type="number"
                    value={editingSlab.slab.maxIncome}
                    onChange={(e) =>
                      setEditingSlab({
                        ...editingSlab,
                        slab: { ...editingSlab.slab, maxIncome: Number(e.target.value) }
                      })
                    }
                    className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700 text-slate-100 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Base Fixed Tax (PKR)</label>
                  <input
                    type="number"
                    value={editingSlab.slab.fixedTax}
                    onChange={(e) =>
                      setEditingSlab({
                        ...editingSlab,
                        slab: { ...editingSlab.slab, fixedTax: Number(e.target.value) }
                      })
                    }
                    className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700 text-slate-100 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Rate on Excess (%)</label>
                  <input
                    type="number"
                    value={editingSlab.slab.ratePercentage}
                    onChange={(e) =>
                      setEditingSlab({
                        ...editingSlab,
                        slab: { ...editingSlab.slab, ratePercentage: Number(e.target.value) }
                      })
                    }
                    className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700 text-slate-100 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Slab Description</label>
                <input
                  type="text"
                  value={editingSlab.slab.slabDescription}
                  onChange={(e) =>
                    setEditingSlab({
                      ...editingSlab,
                      slab: { ...editingSlab.slab, slabDescription: e.target.value }
                    })
                  }
                  className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700 text-slate-100"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Legal Provision Reference</label>
                <input
                  type="text"
                  value={editingSlab.slab.legalProvisionRef}
                  onChange={(e) =>
                    setEditingSlab({
                      ...editingSlab,
                      slab: { ...editingSlab.slab, legalProvisionRef: e.target.value }
                    })
                  }
                  className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700 text-slate-100"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
              <button
                onClick={() => setEditingSlab(null)}
                className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const updatedSlabs = [
                    ...(editingSlab.type === 'salaried'
                      ? config.incomeTax.salariedSlabs
                      : config.incomeTax.nonSalariedSlabs)
                  ];
                  updatedSlabs[editingSlab.index] = editingSlab.slab;

                  const updatedConfig: DynamicTaxConfigSchema = {
                    ...config,
                    incomeTax: {
                      ...config.incomeTax,
                      ...(editingSlab.type === 'salaried'
                        ? { salariedSlabs: updatedSlabs }
                        : { nonSalariedSlabs: updatedSlabs })
                    }
                  };
                  handleSaveConfig(updatedConfig);
                  setEditingSlab(null);
                }}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Slab Changes</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
