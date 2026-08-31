import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  CreditCard, 
  Save, 
  RotateCcw, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  Copy, 
  Check, 
  Smartphone, 
  ShieldCheck, 
  Zap, 
  Crown,
  Eye,
  Info
} from 'lucide-react';
import { AdminSubscriptionConfig } from '../types';
import { 
  getAdminSubscriptionConfig, 
  saveAdminSubscriptionConfig, 
  DEFAULT_ADMIN_CONFIG,
  subscribeToAdminConfig 
} from '../utils/subscriptionController';

interface AdminSettingsSectionProps {
  onSettingsSaved?: (config: AdminSubscriptionConfig) => void;
}

export const AdminSettingsSection: React.FC<AdminSettingsSectionProps> = ({
  onSettingsSaved,
}) => {
  const [config, setConfig] = useState<AdminSubscriptionConfig>(() => getAdminSubscriptionConfig());
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [previewCycle, setPreviewCycle] = useState<'Monthly' | 'Yearly'>('Yearly');
  const [previewPlan, setPreviewPlan] = useState<'pro' | 'enterprise'>('pro');

  useEffect(() => {
    const unsubscribe = subscribeToAdminConfig((newCfg) => {
      setConfig(newCfg);
    });
    return unsubscribe;
  }, []);

  const handleInputChange = (field: keyof AdminSubscriptionConfig, value: string | number) => {
    setConfig((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSaving(true);
    setSaveSuccessMsg(null);

    try {
      const updated = saveAdminSubscriptionConfig(config);
      setConfig(updated);
      setSaveSuccessMsg('Bank credentials and pricing tiers saved and published live across all screens!');
      if (onSettingsSaved) onSettingsSaved(updated);

      setTimeout(() => {
        setSaveSuccessMsg(null);
      }, 5000);
    } catch (err) {
      console.error('Failed to save settings:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    if (window.confirm('Reset all bank details and pricing tiers to system defaults (Pro: PKR 25,000/yr, Ultimate/Corporate: PKR 40,000/yr)?')) {
      const resetConfig = saveAdminSubscriptionConfig(DEFAULT_ADMIN_CONFIG);
      setConfig(resetConfig);
      setSaveSuccessMsg('Reset to official default settings successfully.');
      setTimeout(() => setSaveSuccessMsg(null), 4000);
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const calculatedProAnnualSavings = Math.max(0, (Number(config.proMonthlyPKR || 0) * 12) - Number(config.proAnnualPKR || 0));
  const calculatedUltimateAnnualSavings = Math.max(0, (Number(config.ultimateMonthlyPKR || 0) * 12) - Number(config.ultimateAnnualPKR || 0));

  return (
    <div id="admin-bank-pricing-settings-view" className="space-y-8 animate-fade-in">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-amber-950 border border-amber-500/30 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-400/40 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" /> Admin Dynamic Configuration Desk
            </span>
            <span className="text-xs text-slate-400">
              Last Updated: {config.updatedAt ? new Date(config.updatedAt).toLocaleString() : 'System Default'}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Bank Account Details & Subscription Pricing Manager
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Update bank account titles, IBAN numbers, mobile merchant wallets, and Pro / Corporate subscription pricing tiers in real-time. Changes instantly reflect on the checkout payment modal and subscription portal for all users.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            id="admin-reset-settings-btn"
            onClick={handleReset}
            className="px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs font-bold transition flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" /> Reset Defaults
          </button>

          <button
            type="button"
            id="admin-save-settings-btn"
            onClick={() => handleSave()}
            disabled={isSaving}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white text-xs font-black shadow-lg shadow-emerald-950/40 transition flex items-center gap-2 disabled:opacity-50"
          >
            {isSaving ? (
              <>
                <Save className="w-4 h-4 animate-spin" /> Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" /> Save & Publish Live
              </>
            )}
          </button>
        </div>
      </div>

      {saveSuccessMsg && (
        <div className="p-4 bg-emerald-950/90 border border-emerald-500 text-emerald-200 text-xs sm:text-sm font-bold rounded-2xl flex items-center gap-3 shadow-lg animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{saveSuccessMsg}</span>
        </div>
      )}

      {/* Main Grid: Form Inputs (Left) & Live Checkout Preview (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Form Settings (7 cols) */}
        <form onSubmit={handleSave} className="lg:col-span-7 space-y-6">
          
          {/* Section 1: Official Bank Credentials */}
          <div className="bg-slate-800/90 border border-slate-700/80 rounded-3xl p-6 space-y-5 shadow-sm">
            <div className="flex items-center gap-3 border-b border-slate-700 pb-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-950/80 border border-emerald-600 flex items-center justify-center">
                <Building2 className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">1. Official Bank Credentials</h3>
                <p className="text-[11px] text-slate-400">These details are shown on the payment screen for Direct IBAN wire transfers</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Account Title / Beneficiary Name</label>
                <input
                  id="admin-input-account-title"
                  type="text"
                  value={config.accountTitle}
                  onChange={(e) => handleInputChange('accountTitle', e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 font-medium"
                  placeholder="e.g. Account Title Name"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Bank Name(s)</label>
                <input
                  id="admin-input-bank-name"
                  type="text"
                  value={config.bankName}
                  onChange={(e) => handleInputChange('bankName', e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 font-medium"
                  placeholder="e.g. Bank Name"
                />
              </div>

              <div className="sm:col-span-2 space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Official IBAN / Account Number (24 Digits)</label>
                <input
                  id="admin-input-iban"
                  type="text"
                  value={config.ibanNumber}
                  onChange={(e) => handleInputChange('ibanNumber', e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono text-emerald-300 placeholder-slate-500 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 font-bold tracking-wide"
                  placeholder="e.g. PK00..."
                />
                <p className="text-[10px] text-slate-400">Subscribers can 1-click copy this exact IBAN on checkout.</p>
              </div>
            </div>
          </div>

          {/* Section 2: Mobile Merchant Wallets */}
          <div className="bg-slate-800/90 border border-slate-700/80 rounded-3xl p-6 space-y-5 shadow-sm">
            <div className="flex items-center gap-3 border-b border-slate-700 pb-3">
              <div className="w-9 h-9 rounded-xl bg-amber-950/80 border border-amber-600 flex items-center justify-center">
                <Smartphone className="w-4 h-4 text-amber-400" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">2. Mobile Wallet & Microfinance</h3>
                <p className="text-[11px] text-slate-400">Mobile payment options (JazzCash, EasyPaisa, Nayapay, SadaPay)</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Mobile Wallet Provider Name</label>
                <input
                  id="admin-input-wallet-provider"
                  type="text"
                  value={config.walletProvider}
                  onChange={(e) => handleInputChange('walletProvider', e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 font-medium"
                  placeholder="e.g. JazzCash / EasyPaisa"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Wallet Account Number / Mobile No</label>
                <input
                  id="admin-input-wallet-number"
                  type="text"
                  value={config.walletNumber}
                  onChange={(e) => handleInputChange('walletNumber', e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono text-amber-300 placeholder-slate-500 focus:outline-hidden focus:ring-2 focus:ring-amber-500 font-bold"
                  placeholder="e.g. 0300-XXXXXXX"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Subscription Pricing Tiers */}
          <div className="bg-slate-800/90 border border-slate-700/80 rounded-3xl p-6 space-y-5 shadow-sm">
            <div className="flex items-center gap-3 border-b border-slate-700 pb-3">
              <div className="w-9 h-9 rounded-xl bg-purple-950/80 border border-purple-600 flex items-center justify-center">
                <CreditCard className="w-4 h-4 text-purple-400" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">3. Subscription Pricing Tiers (PKR)</h3>
                <p className="text-[11px] text-slate-400">Configure exact pricing for Pro and Ultimate / Corporate tiers</p>
              </div>
            </div>

            {/* Pro Plan Pricing */}
            <div className="p-4 bg-slate-900/80 rounded-2xl border border-emerald-900/60 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5" /> Pro Consultant Plan Pricing
                </span>
                <span className="text-[11px] text-slate-400">
                  Annual Savings: <strong className="text-emerald-300">PKR {calculatedProAnnualSavings.toLocaleString()}</strong>
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-slate-300">Monthly Price (PKR)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-xs text-slate-500 font-bold">PKR</span>
                    <input
                      id="admin-input-pro-monthly"
                      type="number"
                      value={config.proMonthlyPKR}
                      onChange={(e) => handleInputChange('proMonthlyPKR', Number(e.target.value))}
                      className="w-full pl-12 pr-3.5 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs font-mono font-bold text-white focus:ring-2 focus:ring-emerald-500"
                      min={0}
                      step={100}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-slate-300">Annual Price (PKR / Year)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-xs text-emerald-500 font-bold">PKR</span>
                    <input
                      id="admin-input-pro-annual"
                      type="number"
                      value={config.proAnnualPKR}
                      onChange={(e) => handleInputChange('proAnnualPKR', Number(e.target.value))}
                      className="w-full pl-12 pr-3.5 py-2 bg-slate-950 border border-emerald-700 rounded-xl text-xs font-mono font-black text-emerald-300 focus:ring-2 focus:ring-emerald-500"
                      min={0}
                      step={500}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Ultimate / Corporate Plan Pricing */}
            <div className="p-4 bg-slate-900/80 rounded-2xl border border-amber-900/60 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                  <Crown className="w-3.5 h-3.5" /> Ultimate / Corporate Plan Pricing
                </span>
                <span className="text-[11px] text-slate-400">
                  Annual Savings: <strong className="text-amber-300">PKR {calculatedUltimateAnnualSavings.toLocaleString()}</strong>
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-slate-300">Monthly Price (PKR)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-xs text-slate-500 font-bold">PKR</span>
                    <input
                      id="admin-input-ultimate-monthly"
                      type="number"
                      value={config.ultimateMonthlyPKR}
                      onChange={(e) => handleInputChange('ultimateMonthlyPKR', Number(e.target.value))}
                      className="w-full pl-12 pr-3.5 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs font-mono font-bold text-white focus:ring-2 focus:ring-amber-500"
                      min={0}
                      step={100}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-slate-300">Annual Price (PKR / Year)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-xs text-amber-500 font-bold">PKR</span>
                    <input
                      id="admin-input-ultimate-annual"
                      type="number"
                      value={config.ultimateAnnualPKR}
                      onChange={(e) => handleInputChange('ultimateAnnualPKR', Number(e.target.value))}
                      className="w-full pl-12 pr-3.5 py-2 bg-slate-950 border border-amber-700 rounded-xl text-xs font-mono font-black text-amber-300 focus:ring-2 focus:ring-amber-500"
                      min={0}
                      step={500}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Transfer Instructions */}
          <div className="bg-slate-800/90 border border-slate-700/80 rounded-3xl p-6 space-y-3 shadow-sm">
            <label className="text-xs font-semibold text-slate-300 block">Bank Transfer Instructions & Verification Policy</label>
            <textarea
              id="admin-input-instructions"
              value={config.transferInstructions || ''}
              onChange={(e) => handleInputChange('transferInstructions', e.target.value)}
              rows={3}
              className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 leading-relaxed"
              placeholder="e.g. Transfer the exact fee to our official bank account or mobile wallet and submit the transaction ID (TRX)..."
            />
          </div>

          {/* Bottom Save Bar */}
          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-800 text-slate-400 hover:text-white text-xs font-bold transition"
            >
              Reset to PKR 25k / 40k Defaults
            </button>

            <button
              type="submit"
              id="admin-submit-save-btn"
              disabled={isSaving}
              className="px-8 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black shadow-lg shadow-emerald-950/50 transition flex items-center gap-2"
            >
              <Save className="w-4 h-4" /> Save Bank Details & Pricing
            </button>
          </div>
        </form>

        {/* Right: Live Checkout Preview (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="sticky top-20 space-y-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <Eye className="w-4 h-4" /> Live Subscriber Checkout Preview
              </span>
              <span className="text-[10px] text-slate-400">Interactive Simulation</span>
            </div>

            {/* Simulated Checkout Box */}
            <div className="bg-slate-900 border border-slate-700 rounded-3xl p-5 sm:p-6 space-y-5 shadow-2xl">
              {/* Preview Toggle */}
              <div className="flex items-center justify-between bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setPreviewCycle('Monthly')}
                  className={`flex-1 py-1.5 rounded-lg transition ${previewCycle === 'Monthly' ? 'bg-slate-800 text-white shadow-xs' : 'text-slate-400'}`}
                >
                  Monthly
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewCycle('Yearly')}
                  className={`flex-1 py-1.5 rounded-lg transition ${previewCycle === 'Yearly' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-400'}`}
                >
                  Yearly (Best Value)
                </button>
              </div>

              {/* Plan Switcher */}
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => setPreviewPlan('pro')}
                  className={`p-3 rounded-xl border text-left transition ${previewPlan === 'pro' ? 'border-emerald-500 bg-emerald-950/40 ring-1 ring-emerald-500' : 'border-slate-800 bg-slate-950/60'}`}
                >
                  <div className="text-[11px] font-bold text-white">Pro Plan</div>
                  <div className="text-xs font-black text-emerald-400">
                    PKR {previewCycle === 'Yearly' ? `${Number(config.proAnnualPKR).toLocaleString()}/yr` : `${Number(config.proMonthlyPKR).toLocaleString()}/mo`}
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPreviewPlan('enterprise')}
                  className={`p-3 rounded-xl border text-left transition ${previewPlan === 'enterprise' ? 'border-amber-500 bg-amber-950/40 ring-1 ring-amber-500' : 'border-slate-800 bg-slate-950/60'}`}
                >
                  <div className="text-[11px] font-bold text-white">Ultimate / Corporate</div>
                  <div className="text-xs font-black text-amber-400">
                    PKR {previewCycle === 'Yearly' ? `${Number(config.ultimateAnnualPKR).toLocaleString()}/yr` : `${Number(config.ultimateMonthlyPKR).toLocaleString()}/mo`}
                  </div>
                </button>
              </div>

              {/* Live Bank Credentials Card */}
              <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 rounded-2xl p-4 border border-emerald-500/30 space-y-3 shadow-inner">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-300">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>Active Bank Wire Credentials</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Verified
                  </span>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-medium">Account Title</span>
                    <span className="font-bold text-white text-xs">
                      {config.accountTitle || <span className="text-slate-500 italic">Not set</span>}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-medium">Bank Name</span>
                    <span className="font-bold text-white text-xs">
                      {config.bankName || <span className="text-slate-500 italic">Not set</span>}
                    </span>
                  </div>

                  {/* IBAN Card */}
                  <div className="p-2.5 bg-slate-950/90 rounded-xl border border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-[9px] text-slate-400 block uppercase font-bold">IBAN Number</span>
                      <span className="font-mono text-xs font-black text-emerald-300">
                        {config.ibanNumber || <span className="text-slate-500 italic font-normal">Not configured</span>}
                      </span>
                    </div>
                    {config.ibanNumber ? (
                      <button
                        type="button"
                        onClick={() => copyToClipboard(config.ibanNumber, 'preview_iban')}
                        className="px-2 py-1 bg-emerald-500/20 text-emerald-300 text-[10px] font-bold rounded-lg flex items-center gap-1 hover:bg-emerald-500/30 transition"
                      >
                        {copiedField === 'preview_iban' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        {copiedField === 'preview_iban' ? 'Copied' : 'Copy'}
                      </button>
                    ) : null}
                  </div>

                  {/* Wallet Card */}
                  <div className="p-2.5 bg-slate-950/90 rounded-xl border border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-[9px] text-slate-400 block uppercase font-bold">{config.walletProvider || 'JazzCash / EasyPaisa'}</span>
                      <span className="font-mono text-xs font-black text-amber-300">
                        {config.walletNumber || <span className="text-slate-500 italic font-normal">Not configured</span>}
                      </span>
                    </div>
                    {config.walletNumber ? (
                      <button
                        type="button"
                        onClick={() => copyToClipboard(config.walletNumber, 'preview_wallet')}
                        className="px-2 py-1 bg-amber-500/20 text-amber-300 text-[10px] font-bold rounded-lg flex items-center gap-1 hover:bg-amber-500/30 transition"
                      >
                        {copiedField === 'preview_wallet' ? <Check className="w-3 h-3" /> : <Smartphone className="w-3 h-3" />}
                        {copiedField === 'preview_wallet' ? 'Copied' : 'Copy'}
                      </button>
                    ) : null}
                  </div>
                </div>

                <div className="pt-1 text-[11px] text-slate-300 flex items-start gap-1.5 border-t border-slate-800/80">
                  <Info className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    Subscribers will be instructed to transfer exactly{' '}
                    <strong className="text-white">
                      PKR {previewPlan === 'enterprise' 
                        ? (previewCycle === 'Yearly' ? Number(config.ultimateAnnualPKR).toLocaleString() : Number(config.ultimateMonthlyPKR).toLocaleString())
                        : (previewCycle === 'Yearly' ? Number(config.proAnnualPKR).toLocaleString() : Number(config.proMonthlyPKR).toLocaleString())
                      }
                    </strong>
                  </span>
                </div>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[11px] text-slate-400 leading-relaxed">
                {config.transferInstructions}
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
