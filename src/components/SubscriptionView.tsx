import React, { useState, useEffect } from 'react';
import { 
  Check, 
  Crown, 
  Zap, 
  ShieldCheck, 
  Sparkles, 
  CreditCard, 
  HelpCircle, 
  ArrowRight,
  Building,
  User,
  Clock,
  Building2,
  FileCheck2,
  RefreshCw,
  AlertCircle,
  Smartphone,
  Calendar,
  FileImage,
  CheckCircle2
} from 'lucide-react';
import { UserProfile, SubscriptionTier, SubscriptionStatusData, AdminSubscriptionConfig } from '../types';
import { BankPaymentModal } from './BankPaymentModal';
import { getAdminSubscriptionConfig, subscribeToAdminConfig } from '../utils/subscriptionController';

interface SubscriptionViewProps {
  user: UserProfile | null;
  onOpenAuth: (mode: 'signin' | 'signup') => void;
  onUpdateTier: (tier: SubscriptionTier) => void;
}

export const SubscriptionView: React.FC<SubscriptionViewProps> = ({
  user,
  onOpenAuth,
  onUpdateTier,
}) => {
  const [adminConfig, setAdminConfig] = useState<AdminSubscriptionConfig>(() => getAdminSubscriptionConfig());
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlanForModal, setSelectedPlanForModal] = useState<SubscriptionTier>('pro');
  const [billingCycle, setBillingCycle] = useState<'Monthly' | 'Yearly'>('Yearly');
  const [statusData, setStatusData] = useState<SubscriptionStatusData | null>(null);
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  
  const token = localStorage.getItem('saqibtax_token');
  const currentTier = user?.subscriptionTier || 'free';

  useEffect(() => {
    const unsubscribe = subscribeToAdminConfig((newCfg) => {
      setAdminConfig(newCfg);
    });
    return unsubscribe;
  }, []);

  const fetchSubscriptionStatus = async () => {
    if (!token) return;
    setLoadingStatus(true);
    try {
      const res = await fetch('/api/subscription/status', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        setStatusData(data);
      }
    } catch (err) {
      console.error('Error fetching subscription status:', err);
    } finally {
      setLoadingStatus(false);
    }
  };

  useEffect(() => {
    fetchSubscriptionStatus();
  }, [token, currentTier]);

  const handleOpenPaymentModal = (tier: SubscriptionTier) => {
    if (!token) {
      onOpenAuth('signin');
      return;
    }
    setSelectedPlanForModal(tier);
    setModalOpen(true);
  };

  const pendingPayment = statusData?.pending_payment || (statusData?.pending_subscription as any);

  return (
    <div id="subscription-pricing-view" className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8 animate-fade-in">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
          Transparent Pakistani Rupee Direct Bank Checkout
        </span>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          Choose the Right Plan for Your Tax & Compliance Needs
        </h1>
        <p className="text-xs text-slate-600 leading-relaxed">
          From individual filers navigating salary withholding to corporate entities requiring continuous FBR notice defense and contract audits. Pay securely via Meezan Bank, HBL, or JazzCash / EasyPaisa.
        </p>

        {successMessage && (
          <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-bold rounded-xl animate-fade-in">
            {successMessage}
          </div>
        )}

        {/* Monthly / Yearly Billing Toggle */}
        <div className="flex items-center justify-center pt-2">
          <div className="bg-slate-200/80 p-1 rounded-2xl flex items-center gap-1">
            <button
              onClick={() => setBillingCycle('Monthly')}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition ${
                billingCycle === 'Monthly'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('Yearly')}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                billingCycle === 'Yearly'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>Annual Billing</span>
              <span className="px-1.5 py-0.5 bg-amber-400 text-amber-950 text-[10px] font-black rounded-md">
                SAVE 17%
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* PENDING VERIFICATION ALERT BANNER */}
      {pendingPayment && (
        <div 
          id="pending-verification-alert"
          className="bg-amber-50/95 border-2 border-amber-400 rounded-3xl p-5 shadow-sm space-y-3 animate-fade-in"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-sm">
                <Clock className="w-5 h-5 animate-spin" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-amber-950">Payment Verification Under Review</h3>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-200 text-amber-900 border border-amber-400">
                    PENDING
                  </span>
                </div>
                <p className="text-xs text-amber-900 mt-0.5">
                  Plan: <strong>{pendingPayment.plan_tier?.toUpperCase()} (PKR {Number(pendingPayment.amount || pendingPayment.amount_pkr).toLocaleString()})</strong> • 
                  TRX ID: <span className="font-mono font-bold">{pendingPayment.transaction_id || pendingPayment.trx_id}</span> • 
                  Method: <strong>{pendingPayment.payment_method}</strong>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                id="refresh-sub-status-btn"
                onClick={fetchSubscriptionStatus}
                disabled={loadingStatus}
                className="px-4 py-2 bg-white hover:bg-slate-50 border border-amber-300 rounded-xl text-xs font-bold text-amber-900 flex items-center gap-1.5 transition shadow-xs"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loadingStatus ? 'animate-spin' : ''}`} /> Refresh Status
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* FREE TIER */}
        <div className={`bg-white rounded-3xl p-6 border flex flex-col justify-between transition-all ${
          currentTier === 'free'
            ? 'border-emerald-600 ring-2 ring-emerald-600/20 shadow-md'
            : 'border-slate-200 shadow-xs hover:border-slate-300'
        }`}>
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-100 text-slate-700">
                Free Tier
              </span>
              {currentTier === 'free' && (
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Current Active Plan
                </span>
              )}
            </div>

            <div className="mb-4">
              <div className="text-3xl font-black text-slate-900">PKR 0</div>
              <div className="text-xs text-slate-500 font-medium">Free Forever</div>
            </div>

            <p className="text-xs text-slate-600 mb-6">
              Ideal for individual salaried taxpayers needing quick advice on tax slabs and basic filing definitions.
            </p>

            <div className="space-y-3 text-xs text-slate-700 mb-6">
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><strong>5 AI Legal Queries</strong> per day</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Basic Tax Laws & Slab Summary</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Active Taxpayer List (ATL) directory</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-400">
                <span className="w-4 h-4 rounded-full bg-slate-100 flex items-center justify-center text-[10px]">✕</span>
                <span>No contract or notice file uploads</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-400">
                <span className="w-4 h-4 rounded-full bg-slate-100 flex items-center justify-center text-[10px]">✕</span>
                <span>No PDF audit computation export</span>
              </div>
            </div>
          </div>

          <button
            id="free-plan-action-btn"
            disabled={currentTier === 'free'}
            className={`w-full py-2.5 rounded-xl text-xs font-bold transition ${
              currentTier === 'free'
                ? 'bg-slate-100 text-slate-500 cursor-default'
                : 'bg-slate-800 hover:bg-slate-700 text-white'
            }`}
          >
            {currentTier === 'free' ? 'Your Current Plan' : 'Free Included'}
          </button>
        </div>

        {/* PRO TIER (Featured) */}
        <div className={`bg-gradient-to-b from-emerald-950 to-slate-900 text-white rounded-3xl p-6 shadow-xl border relative flex flex-col justify-between ${
          currentTier === 'pro'
            ? 'border-emerald-400 ring-2 ring-emerald-400/40'
            : 'border-emerald-800'
        }`}>
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-emerald-400 to-emerald-500 text-slate-950 px-3 py-0.5 rounded-full text-[10px] font-black tracking-wide uppercase shadow-sm">
            Most Popular for Filers & CFOs
          </div>

          <div>
            <div className="flex items-center justify-between mb-4 mt-2">
              <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-800/80 text-emerald-200 border border-emerald-700">
                Pro Tier
              </span>
              {currentTier === 'pro' && (
                <span className="text-[10px] font-bold text-emerald-300 bg-emerald-900/60 px-2 py-0.5 rounded-full border border-emerald-600">
                  Current Active Plan
                </span>
              )}
            </div>

            <div className="mb-4">
              <div className="text-3xl font-black text-white">
                PKR {billingCycle === 'Yearly' ? Number(adminConfig.proAnnualPKR).toLocaleString() : Number(adminConfig.proMonthlyPKR).toLocaleString()}
              </div>
              <div className="text-xs text-emerald-300 font-medium">
                {billingCycle === 'Yearly' 
                  ? `Billed annually (Save PKR ${Math.max(0, (Number(adminConfig.proMonthlyPKR) * 12) - Number(adminConfig.proAnnualPKR)).toLocaleString()})`
                  : 'Billed monthly (Direct Bank/JazzCash)'}
              </div>
            </div>

            <p className="text-xs text-slate-300 mb-6">
              Designed for active filers, businesses, and accountants requiring unlimited intelligence & downloadable PDF dossiers.
            </p>

            <div className="space-y-3 text-xs text-slate-200 mb-6">
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span><strong>Unlimited</strong> AI Legal & FBR queries</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span><strong>FBR Tax Calculator Assistant</strong></span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span><strong>Downloadable PDF Audit Trails</strong></span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Complete FBR Notice Reply Generator</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Contract & Clause Tax Risk Inspector</span>
              </div>
            </div>
          </div>

          <button
            id="select-pro-plan-btn"
            onClick={() => handleOpenPaymentModal('pro')}
            className={`w-full py-2.5 rounded-xl text-xs font-bold transition shadow-md flex items-center justify-center gap-2 ${
              currentTier === 'pro'
                ? 'bg-emerald-900/80 text-emerald-300 border border-emerald-700 hover:bg-emerald-800'
                : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            {currentTier === 'pro' ? 'Renew / View Bank Details' : `Select Pro (${billingCycle === 'Yearly' ? `PKR ${Number(adminConfig.proAnnualPKR).toLocaleString()}/yr` : `PKR ${Number(adminConfig.proMonthlyPKR).toLocaleString()}/mo`})`}
          </button>
        </div>

        {/* ENTERPRISE / CORPORATE TIER */}
        <div className={`bg-white rounded-3xl p-6 border flex flex-col justify-between transition-all ${
          currentTier === 'enterprise'
            ? 'border-amber-500 ring-2 ring-amber-500/20 shadow-md'
            : 'border-slate-200 shadow-xs hover:border-slate-300'
        }`}>
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
                Ultimate / Corporate Tier
              </span>
              {currentTier === 'enterprise' && (
                <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                  Current Active Plan
                </span>
              )}
            </div>

            <div className="mb-4">
              <div className="text-3xl font-black text-slate-900">
                PKR {billingCycle === 'Yearly' ? Number(adminConfig.ultimateAnnualPKR).toLocaleString() : Number(adminConfig.ultimateMonthlyPKR).toLocaleString()}
              </div>
              <div className="text-xs text-slate-500 font-medium">
                {billingCycle === 'Yearly' 
                  ? `Billed annually (Save PKR ${Math.max(0, (Number(adminConfig.ultimateMonthlyPKR) * 12) - Number(adminConfig.ultimateAnnualPKR)).toLocaleString()})`
                  : 'Billed monthly (Direct Bank/JazzCash)'}
              </div>
            </div>

            <p className="text-xs text-slate-600 mb-6">
              Full suite for law firms, corporate groups, and tax consultancies with multi-seat collaboration & escalation.
            </p>

            <div className="space-y-3 text-xs text-slate-700 mb-6">
              <div className="flex items-center gap-2.5">
                <Crown className="w-4 h-4 text-amber-600 shrink-0" />
                <span><strong>Multi-User Team Workspace</strong></span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Everything in Pro Plan included</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><strong>Direct Tax Consultant Escalation</strong></span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Custom High Court & ATIR Case Grounding</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Priority Dedicated Legal API Channel</span>
              </div>
            </div>
          </div>

          <button
            id="select-enterprise-plan-btn"
            onClick={() => handleOpenPaymentModal('enterprise')}
            className={`w-full py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
              currentTier === 'enterprise'
                ? 'bg-amber-100 text-amber-800 border border-amber-300 hover:bg-amber-200'
                : 'bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white shadow-md'
            }`}
          >
            <Crown className="w-4 h-4" />
            {currentTier === 'enterprise' ? 'Renew / View Bank Details' : `Upgrade to Corporate (${billingCycle === 'Yearly' ? `PKR ${Number(adminConfig.ultimateAnnualPKR).toLocaleString()}/yr` : `PKR ${Number(adminConfig.ultimateMonthlyPKR).toLocaleString()}/mo`})`}
          </button>
        </div>

      </div>

      {/* Bank Transfer Guide Box */}
      <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-3">
          <Building2 className="w-6 h-6 text-emerald-700" />
          <div>
            <h3 className="text-base font-bold text-slate-900">How Direct Bank Transfer Works</h3>
            <p className="text-xs text-slate-500">Fast, local Pakistani banking settlement without international card surcharges</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-2">
            <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black flex items-center justify-center">1</span>
            <h4 className="text-xs font-bold text-slate-900">Transfer from Banking App</h4>
            <p className="text-[11px] text-slate-600">Use Meezan Bank, HBL, Standard Chartered, JazzCash or EasyPaisa app to transfer funds to our official IBAN.</p>
          </div>
          <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-2">
            <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black flex items-center justify-center">2</span>
            <h4 className="text-xs font-bold text-slate-900">Submit Transaction ID & Screenshot</h4>
            <p className="text-[11px] text-slate-600">Enter your sender name, Transaction ID (TRX ID), and optional receipt screenshot in the checkout modal on this page.</p>
          </div>
          <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-2">
            <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black flex items-center justify-center">3</span>
            <h4 className="text-xs font-bold text-slate-900">Instant Verification</h4>
            <p className="text-[11px] text-slate-600">Our accounts desk verifies incoming receipts against bank statements within 15-30 minutes and elevates your account instantly.</p>
          </div>
        </div>
      </div>

      {/* Interactive Modal */}
      <BankPaymentModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          fetchSubscriptionStatus();
        }}
        selectedTier={selectedPlanForModal}
        user={user}
        onOpenAuth={onOpenAuth}
        onPaymentSuccess={(tier) => {
          onUpdateTier(tier);
          fetchSubscriptionStatus();
        }}
      />

    </div>
  );
};
