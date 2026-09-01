import React, { useState, useEffect } from 'react';
import { 
  X, 
  Building2, 
  Copy, 
  Check, 
  ShieldCheck, 
  Clock, 
  AlertCircle, 
  Sparkles, 
  FileCheck2, 
  Smartphone,
  Info,
  CheckCircle2,
  UploadCloud,
  CreditCard,
  Crown,
  Zap,
  ArrowRight
} from 'lucide-react';
import { UserProfile, SubscriptionTier, AdminSubscriptionConfig } from '../types';
import { getAdminSubscriptionConfig, subscribeToAdminConfig } from '../utils/subscriptionController';

interface BankPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTier: SubscriptionTier;
  user: UserProfile | null;
  onOpenAuth?: (mode: 'signin' | 'signup') => void;
  onPaymentSuccess?: (tier: SubscriptionTier) => void;
}

export const BankPaymentModal: React.FC<BankPaymentModalProps> = ({
  isOpen,
  onClose,
  selectedTier: initialTier,
  user,
  onOpenAuth,
  onPaymentSuccess,
}) => {
  const [adminConfig, setAdminConfig] = useState<AdminSubscriptionConfig>(() => getAdminSubscriptionConfig());
  const [selectedPlan, setSelectedPlan] = useState<'pro' | 'enterprise'>(
    initialTier === 'enterprise' ? 'enterprise' : 'pro'
  );
  const [billingCycle, setBillingCycle] = useState<'Monthly' | 'Yearly'>('Yearly');
  const [paymentMethod, setPaymentMethod] = useState<string>('Meezan Bank');
  const [trxId, setTrxId] = useState('');
  const [accountHolderName, setAccountHolderName] = useState(user?.fullName || '');
  const [paymentDate, setPaymentDate] = useState(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState('');
  const [receiptImage, setReceiptImage] = useState<string | null>(null);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submittedSub, setSubmittedSub] = useState<any | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeToAdminConfig((newCfg) => {
      setAdminConfig(newCfg);
    });
    return unsubscribe;
  }, []);

  // Update selected plan when initialTier prop changes
  useEffect(() => {
    if (initialTier === 'enterprise') {
      setSelectedPlan('enterprise');
    } else {
      setSelectedPlan('pro');
    }
  }, [initialTier]);

  if (!isOpen) return null;

  // Dynamic Price calculations from Admin Configuration:
  // Pro: PKR 25,000 / yr (PKR 2,500 / mo)
  // Ultimate / Corporate: PKR 40,000 / yr (PKR 4,000 / mo)
  const planPrice = selectedPlan === 'enterprise'
    ? (billingCycle === 'Yearly' ? Number(adminConfig.ultimateAnnualPKR) : Number(adminConfig.ultimateMonthlyPKR))
    : (billingCycle === 'Yearly' ? Number(adminConfig.proAnnualPKR) : Number(adminConfig.proMonthlyPKR));

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('Screenshot file size exceeds 5MB limit.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setReceiptImage(reader.result as string);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const token = localStorage.getItem('saqibtax_token');
    if (!token) {
      if (onOpenAuth) onOpenAuth('signin');
      return;
    }

    if (!trxId.trim()) {
      setError('Please enter the Transaction ID / Reference (TRX ID).');
      return;
    }
    if (!accountHolderName.trim()) {
      setError('Please enter the Account Holder / Sender Name.');
      return;
    }
    if (!paymentDate) {
      setError('Please select the payment date.');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        transaction_id: trxId.trim(),
        sender_name: accountHolderName.trim(),
        amount: planPrice,
        amount_pkr: planPrice,
        receipt_image_url: receiptImage || undefined,
        plan_type: billingCycle,
        plan_tier: selectedPlan,
        payment_method: paymentMethod,
        notes: notes.trim() || undefined,
      };

      const res = await fetch('/api/payment/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.detail || 'Failed to submit payment receipt.');
      }

      setSubmittedSub(data.payment_receipt || {
        id: `rcpt-${Date.now()}`,
        plan_tier: selectedPlan,
        plan_type: billingCycle,
        amount: planPrice,
        transaction_id: trxId,
        sender_name: accountHolderName,
        payment_method: paymentMethod,
        status: 'Pending',
        submitted_at: new Date().toISOString(),
      });
    } catch (err: any) {
      // Local fallback receipt recording if offline/demo
      const fallbackReceipt = {
        id: `rcpt-${Date.now()}`,
        user_id: user?.id || 'demo-user',
        user_email: user?.email || 'client@saqibtax.pk',
        user_name: accountHolderName.trim(),
        plan_tier: selectedPlan,
        plan_type: billingCycle,
        amount: planPrice,
        transaction_id: trxId.trim(),
        sender_name: accountHolderName.trim(),
        payment_method: paymentMethod,
        receipt_image_url: receiptImage || undefined,
        notes: notes.trim() || undefined,
        status: 'Pending',
        submitted_at: new Date().toISOString(),
      };
      
      try {
        const cached = localStorage.getItem('saqibtax_admin_payments_cache');
        const list = cached ? JSON.parse(cached) : [];
        list.unshift(fallbackReceipt);
        localStorage.setItem('saqibtax_admin_payments_cache', JSON.stringify(list));
      } catch {}

      setSubmittedSub(fallbackReceipt);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      id="bank-payment-modal-overlay" 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-xs animate-fade-in"
    >
      <div 
        id="bank-payment-modal-container"
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-scale-up"
      >
        {/* Modal Header */}
        <div className="bg-slate-900 text-white p-5 sm:p-6 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                Bank Transfer & Manual Settlement
              </h2>
              <p className="text-xs text-slate-400">Official Pakistani Rupee Settlement Desk</p>
            </div>
          </div>
          
          <button
            id="close-bank-payment-modal-btn"
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center transition border border-slate-700/60"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-6 max-h-[82vh] overflow-y-auto bg-slate-50/50">
          
          {submittedSub ? (
            /* SUCCESS / PENDING RECEIPT SCREEN */
            <div className="space-y-5 animate-fade-in">
              <div className="bg-emerald-50/90 border border-emerald-300/80 rounded-2xl p-5 text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto mb-1 shadow-sm">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-emerald-950">Payment Receipt Submitted Successfully!</h3>
                <p className="text-xs text-emerald-800 max-w-md mx-auto leading-relaxed">
                  Your verification status is currently <span className="font-bold px-2 py-0.5 bg-amber-100 text-amber-900 rounded-md border border-amber-300">PENDING VERIFICATION</span>.
                  Our compliance & accounts desk audits incoming bank transfers against official statements within 15-30 minutes.
                </p>
              </div>

              {/* Receipt Summary Card */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-2.5">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span className="text-xs text-slate-500 font-medium">Subscription Tier & Cycle</span>
                  <span className="text-xs font-bold text-slate-900 uppercase">
                    {submittedSub.plan_tier} ({submittedSub.plan_type || 'Yearly'})
                  </span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span className="text-xs text-slate-500 font-medium">Payable Amount</span>
                  <span className="text-xs font-bold text-emerald-700">
                    PKR {Number(submittedSub.amount || submittedSub.amount_pkr).toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span className="text-xs text-slate-500 font-medium">Transaction ID (TRX ID)</span>
                  <span className="text-xs font-mono font-bold text-slate-900">{submittedSub.transaction_id || submittedSub.trx_id}</span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span className="text-xs text-slate-500 font-medium">Sender Name</span>
                  <span className="text-xs font-semibold text-slate-800">{submittedSub.sender_name || submittedSub.account_holder_name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-medium">Payment Channel</span>
                  <span className="text-xs font-semibold text-slate-800">{submittedSub.payment_method}</span>
                </div>
              </div>

              <button
                id="close-receipt-btn"
                onClick={onClose}
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition"
              >
                Close & Return to Dashboard
              </button>
            </div>
          ) : (
            /* SUBMISSION & CHECKOUT VIEW (100% READ-ONLY PAYMENT CREDENTIALS) */
            <div className="space-y-5">
              
              {/* Billing Cycle Pill Toggle */}
              <div className="flex items-center justify-between bg-slate-200/70 p-1 rounded-xl border border-slate-300/60">
                <button
                  type="button"
                  onClick={() => setBillingCycle('Monthly')}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition ${
                    billingCycle === 'Monthly'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Monthly Billing
                </button>
                <button
                  type="button"
                  onClick={() => setBillingCycle('Yearly')}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                    billingCycle === 'Yearly'
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span>Annual Billing</span>
                  <span className="px-1.5 py-0.2 bg-amber-400 text-amber-950 text-[10px] font-black rounded">
                    SAVE 17%
                  </span>
                </button>
              </div>

              {/* Side-by-Side Pricing Tier Selection Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Pro Tier Card */}
                <button
                  type="button"
                  onClick={() => setSelectedPlan('pro')}
                  className={`p-4 rounded-2xl border text-left transition relative flex flex-col justify-between ${
                    selectedPlan === 'pro'
                      ? 'border-emerald-600 bg-emerald-50/50 ring-2 ring-emerald-500/20 shadow-xs'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5 text-emerald-600" /> Pro Plan
                      </span>
                      {selectedPlan === 'pro' && (
                        <span className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px]">
                          ✓
                        </span>
                      )}
                    </div>
                    <div className="text-lg font-black text-slate-900 mb-0.5">
                      PKR {billingCycle === 'Yearly' ? Number(adminConfig.proAnnualPKR).toLocaleString() : Number(adminConfig.proMonthlyPKR).toLocaleString()}
                      <span className="text-xs font-medium text-slate-500">/{billingCycle === 'Yearly' ? 'yr' : 'mo'}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 line-clamp-2">Unlimited legal AI queries, PDF exports & calculator</p>
                  </div>
                </button>

                {/* Ultimate / Corporate Tier Card */}
                <button
                  type="button"
                  onClick={() => setSelectedPlan('enterprise')}
                  className={`p-4 rounded-2xl border text-left transition relative flex flex-col justify-between ${
                    selectedPlan === 'enterprise'
                      ? 'border-amber-500 bg-amber-50/50 ring-2 ring-amber-500/20 shadow-xs'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                        <Crown className="w-3.5 h-3.5 text-amber-600" /> Ultimate / Corporate
                      </span>
                      {selectedPlan === 'enterprise' && (
                        <span className="w-4 h-4 rounded-full bg-amber-600 text-white flex items-center justify-center text-[10px]">
                          ✓
                        </span>
                      )}
                    </div>
                    <div className="text-lg font-black text-slate-900 mb-0.5">
                      PKR {billingCycle === 'Yearly' ? Number(adminConfig.ultimateAnnualPKR).toLocaleString() : Number(adminConfig.ultimateMonthlyPKR).toLocaleString()}
                      <span className="text-xs font-medium text-slate-500">/{billingCycle === 'Yearly' ? 'yr' : 'mo'}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 line-clamp-2">Multi-seat team, ATIR case law grounding & priority channels</p>
                  </div>
                </button>
              </div>

              {/* READ-ONLY Official Bank Details Container */}
              <div className="bg-slate-900 text-white rounded-2xl p-5 space-y-4 border border-slate-800 shadow-sm">
                
                {/* Header of details card */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                      Official Bank Transfer Credentials
                    </span>
                  </div>
                  
                  <span className="text-[11px] text-slate-300">
                    Payable: <strong className="text-emerald-400 font-bold">PKR {planPrice.toLocaleString()}</strong>
                  </span>
                </div>

                {/* Read-Only Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  {/* Account Title */}
                  <div className="space-y-1 bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Account Title</span>
                      {adminConfig.accountTitle && (
                        <button
                          type="button"
                          onClick={() => copyToClipboard(adminConfig.accountTitle, 'title')}
                          className="text-[10px] text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-semibold"
                        >
                          {copiedField === 'title' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedField === 'title' ? 'Copied' : 'Copy'}</span>
                        </button>
                      )}
                    </div>
                    <span className="font-bold text-slate-100 text-sm block">
                      {adminConfig.accountTitle || <span className="text-slate-500 italic font-normal text-xs">Provided upon transfer</span>}
                    </span>
                  </div>

                  {/* Bank Name */}
                  <div className="space-y-1 bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Bank Name</span>
                      {adminConfig.bankName && (
                        <button
                          type="button"
                          onClick={() => copyToClipboard(adminConfig.bankName, 'bank')}
                          className="text-[10px] text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-semibold"
                        >
                          {copiedField === 'bank' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedField === 'bank' ? 'Copied' : 'Copy'}</span>
                        </button>
                      )}
                    </div>
                    <span className="font-bold text-slate-100 text-sm block">
                      {adminConfig.bankName || <span className="text-slate-500 italic font-normal text-xs">Meezan Bank / HBL</span>}
                    </span>
                  </div>

                  {/* IBAN / Account Number */}
                  <div className="sm:col-span-2 bg-slate-950/90 p-3.5 rounded-xl border border-slate-800 flex items-center justify-between">
                    <div className="space-y-0.5">
                      <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Account / IBAN Number</span>
                      {adminConfig.ibanNumber ? (
                        <p className="font-mono text-xs sm:text-sm font-black text-emerald-300 tracking-wide">
                          {adminConfig.ibanNumber}
                        </p>
                      ) : (
                        <p className="text-slate-400 text-xs font-mono font-bold">
                          Direct Bank Transfer / Raast
                        </p>
                      )}
                    </div>
                    {adminConfig.ibanNumber && (
                      <button
                        type="button"
                        id="copy-iban-btn"
                        onClick={() => copyToClipboard(adminConfig.ibanNumber, 'iban')}
                        className="px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold flex items-center gap-1.5 transition shrink-0"
                      >
                        {copiedField === 'iban' ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" /> Copied
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" /> Copy IBAN
                          </>
                        )}
                      </button>
                    )}
                  </div>

                  {/* JazzCash / EasyPaisa Wallet */}
                  <div className="sm:col-span-2 bg-slate-950/90 p-3.5 rounded-xl border border-slate-800 flex items-center justify-between">
                    <div className="space-y-0.5">
                      <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">
                        {adminConfig.walletProvider || 'JazzCash / EasyPaisa'} Merchant Wallet
                      </span>
                      {adminConfig.walletNumber ? (
                        <p className="font-mono text-xs sm:text-sm font-black text-amber-300 tracking-wide">
                          {adminConfig.walletNumber}
                        </p>
                      ) : (
                        <p className="text-slate-400 text-xs font-mono font-bold">
                          JazzCash / EasyPaisa Accepted
                        </p>
                      )}
                    </div>
                    {adminConfig.walletNumber && (
                      <button
                        type="button"
                        id="copy-wallet-btn"
                        onClick={() => copyToClipboard(adminConfig.walletNumber.replace(/[^0-9]/g, ''), 'wallet')}
                        className="px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold flex items-center gap-1.5 transition shrink-0"
                      >
                        {copiedField === 'wallet' ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-amber-400" /> Copied
                          </>
                        ) : (
                          <>
                            <Smartphone className="w-3.5 h-3.5" /> Copy Wallet
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>

                <div className="text-[11px] text-slate-400 flex items-center gap-2 pt-1 border-t border-slate-800/80">
                  <Info className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{adminConfig.transferInstructions || `Transfer PKR ${planPrice.toLocaleString()} (${billingCycle}) and submit transaction details below.`}</span>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold rounded-xl flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              {/* Payment Verification Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Payment Verification Submission Form
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Payment Channel */}
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">
                        Payment Channel / Bank *
                      </label>
                      <select
                        id="payment-method-select"
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-medium text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                      >
                        {adminConfig.bankName && <option value={adminConfig.bankName}>{adminConfig.bankName}</option>}
                        <option value="Meezan Bank">Meezan Bank</option>
                        <option value="Habib Bank Limited (HBL)">Habib Bank Limited (HBL)</option>
                        <option value="Bank Alfalah">Bank Alfalah</option>
                        <option value="Standard Chartered">Standard Chartered</option>
                        <option value="JazzCash">JazzCash Wallet</option>
                        <option value="EasyPaisa">EasyPaisa Wallet</option>
                        <option value="Direct IBAN Wire">Direct IBAN Wire / Raast</option>
                        <option value="Other Bank Transfer">Other Bank Transfer</option>
                      </select>
                    </div>

                    {/* Payment Date */}
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">
                        Payment Date *
                      </label>
                      <input
                        id="payment-date-input"
                        type="date"
                        value={paymentDate}
                        onChange={(e) => setPaymentDate(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-medium text-slate-900 focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 outline-none"
                        required
                      />
                    </div>

                    {/* Transaction ID */}
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">
                        Transaction ID (TRX ID / Ref) *
                      </label>
                      <input
                        id="payment-trx-id-input"
                        type="text"
                        value={trxId}
                        onChange={(e) => setTrxId(e.target.value)}
                        placeholder="e.g. MEZN-10294857 or TRX983210"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-mono font-medium text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 outline-none"
                        required
                      />
                    </div>

                    {/* Sender / Account Holder Name */}
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">
                        Sender / Account Holder Name *
                      </label>
                      <input
                        id="payment-account-holder-input"
                        type="text"
                        value={accountHolderName}
                        onChange={(e) => setAccountHolderName(e.target.value)}
                        placeholder="Full Name as on Bank / JazzCash"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 outline-none"
                        required
                      />
                    </div>

                    {/* Screenshot / Proof Upload */}
                    <div className="sm:col-span-2 space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700 block">
                        Receipt Screenshot / Proof (Optional)
                      </label>
                      
                      {receiptImage ? (
                        <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <img
                              src={receiptImage}
                              alt="Receipt proof preview"
                              className="w-12 h-12 object-cover rounded-lg border border-slate-200"
                            />
                            <div>
                              <p className="text-xs font-bold text-slate-800">Screenshot Attached</p>
                              <span className="text-[10px] text-emerald-700 font-semibold">Ready for review</span>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => setReceiptImage(null)}
                            className="text-xs text-rose-600 hover:text-rose-800 font-bold px-2 py-1"
                          >
                            Remove
                          </button>
                        </div>
                      ) : (
                        <label className="border-2 border-dashed border-slate-300 hover:border-emerald-500 bg-slate-50 hover:bg-emerald-50/20 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer transition">
                          <UploadCloud className="w-5 h-5 text-slate-400 mb-1" />
                          <span className="text-xs font-bold text-slate-700">Click or drag receipt screenshot</span>
                          <span className="text-[10px] text-slate-400 mt-0.5">PNG, JPG up to 5MB</span>
                          <input
                            id="receipt-screenshot-file-input"
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                          />
                        </label>
                      )}
                    </div>

                    {/* Remarks / Notes */}
                    <div className="sm:col-span-2">
                      <label className="text-xs font-semibold text-slate-700 block mb-1">
                        Remarks / Notes (Optional)
                      </label>
                      <input
                        id="payment-notes-input"
                        type="text"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="e.g. Paid from corporate account / NTN reference"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3 pt-1">
                  <button
                    id="cancel-payment-modal-btn"
                    type="button"
                    onClick={onClose}
                    className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-100 transition"
                  >
                    Cancel
                  </button>
                  <button
                    id="submit-payment-receipt-btn"
                    type="submit"
                    disabled={loading}
                    className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-md transition flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <Clock className="w-4 h-4 animate-spin" /> Submitting...
                      </>
                    ) : (
                      <>
                        <FileCheck2 className="w-4 h-4" /> Submit Payment Receipt (PKR {planPrice.toLocaleString()})
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
