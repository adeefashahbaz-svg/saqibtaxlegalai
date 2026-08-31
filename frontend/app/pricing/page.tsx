"use client";

import React, { useState, useEffect } from "react";
import { 
  Check, 
  Crown, 
  Zap, 
  ShieldCheck, 
  Sparkles, 
  CreditCard, 
  Building2, 
  Clock, 
  Copy, 
  AlertCircle, 
  FileCheck2, 
  Smartphone, 
  Info, 
  X, 
  CheckCircle2, 
  RefreshCw,
  ArrowRight
} from "lucide-react";
import { Navbar } from "../../components/Navbar";

type PlanTier = "free" | "pro" | "enterprise";

interface SubscriptionStatus {
  user_id: string;
  email: string;
  current_tier: string;
  queries_used_today: number;
  max_daily_queries: number;
  has_pending_payment: boolean;
  pending_subscription?: {
    id: string;
    plan_tier: string;
    amount_pkr: number;
    trx_id: string;
    account_holder_name: string;
    payment_date: string;
    payment_method: string;
    status: string;
  } | null;
}

export default function PricingPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<"pro" | "enterprise">("pro");
  const [paymentMethod, setPaymentMethod] = useState<"Meezan Bank" | "HBL" | "JazzCash" | "EasyPaisa">("Meezan Bank");
  const [trxId, setTrxId] = useState("");
  const [accountHolderName, setAccountHolderName] = useState("");
  const [paymentDate, setPaymentDate] = useState(new Date().toISOString().split("T")[0]);
  const [notes, setNotes] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submittedSub, setSubmittedSub] = useState<any | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [simulatingApproval, setSimulatingApproval] = useState(false);
  const [approvalSuccess, setApprovalSuccess] = useState(false);

  const [statusData, setStatusData] = useState<SubscriptionStatus | null>(null);
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [userToken, setUserToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("saqibtax_token") || "demo-token";
      setUserToken(token);
      fetchStatus(token);
    }
  }, []);

  const fetchStatus = async (token: string) => {
    setLoadingStatus(true);
    try {
      const res = await fetch("/api/subscription/status", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setStatusData(data);
      }
    } catch (err) {
      console.error("Status fetch error", err);
    } finally {
      setLoadingStatus(false);
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    if (typeof navigator !== "undefined") {
      navigator.clipboard.writeText(text);
      setCopiedField(label);
      setTimeout(() => setCopiedField(null), 2000);
    }
  };

  const openCheckoutModal = (tier: "pro" | "enterprise") => {
    setSelectedPlan(tier);
    setSubmittedSub(null);
    setError(null);
    setApprovalSuccess(false);
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!trxId.trim()) {
      setError("Please enter the Transaction ID / Reference (TRX ID).");
      return;
    }
    if (!accountHolderName.trim()) {
      setError("Please enter the Sender / Account Holder Name.");
      return;
    }
    if (!paymentDate) {
      setError("Please specify the payment date.");
      return;
    }

    setLoading(true);
    try {
      const amount = selectedPlan === "enterprise" ? 10000 : 2500;
      const res = await fetch("/api/subscription/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken || "demo-token"}`,
        },
        body: JSON.stringify({
          plan_tier: selectedPlan,
          amount_pkr: amount,
          trx_id: trxId.trim(),
          account_holder_name: accountHolderName.trim(),
          payment_date: paymentDate,
          payment_method: paymentMethod,
          notes: notes.trim() || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.detail || "Submission failed");
      }

      setSubmittedSub(data.subscription || {
        id: `sub-${Date.now()}`,
        plan_tier: selectedPlan,
        amount_pkr: amount,
        trx_id: trxId,
        account_holder_name: accountHolderName,
        payment_date: paymentDate,
        payment_method: paymentMethod,
        status: "PENDING",
      });

      if (userToken) fetchStatus(userToken);
    } catch (err: any) {
      setError(err.message || "An error occurred while submitting.");
    } finally {
      setLoading(false);
    }
  };

  const handleSimulateAdminApproval = async (subId: string) => {
    setSimulatingApproval(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/approve-subscription/${subId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Admin approval failed");

      setApprovalSuccess(true);
      if (userToken) fetchStatus(userToken);
      setTimeout(() => {
        setModalOpen(false);
      }, 2200);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSimulatingApproval(false);
    }
  };

  const currentTier = statusData?.current_tier || "free";
  const pendingSub = statusData?.pending_subscription;
  const planPrice = selectedPlan === "enterprise" ? 10000 : 2500;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        
        {/* Page Title Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-800/80 shadow-sm">
            <Building2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Direct Pakistani Bank & Wallet Payment Gateway</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Transparent Pricing for Pakistani Filers & Tax Advisors
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            Choose the legal intelligence plan tailored to your practice. Pay directly via <strong>Meezan Bank</strong>, <strong>HBL</strong>, or <strong>JazzCash / EasyPaisa</strong> with zero foreign transaction markups.
          </p>
        </div>

        {/* Pending Banner if any */}
        {pendingSub && (
          <div className="bg-amber-950/70 border-2 border-amber-500/80 rounded-3xl p-5 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-fade-in">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center shrink-0 font-bold">
                <Clock className="w-5 h-5 animate-spin" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-amber-200">Pending Bank Verification</h3>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    PENDING
                  </span>
                </div>
                <p className="text-xs text-amber-300/80 mt-0.5">
                  Plan: <strong>{pendingSub.plan_tier?.toUpperCase()}</strong> • TRX ID: <span className="font-mono font-bold">{pendingSub.trx_id}</span> • Method: <strong>{pendingSub.payment_method}</strong>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => userToken && fetchStatus(userToken)}
                disabled={loadingStatus}
                className="px-3 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-bold rounded-xl flex items-center gap-1.5"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loadingStatus ? "animate-spin" : ""}`} /> Refresh
              </button>
              <button
                onClick={() => handleSimulateAdminApproval(pendingSub.id)}
                disabled={simulatingApproval}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black rounded-xl shadow flex items-center gap-1.5"
              >
                <ShieldCheck className="w-3.5 h-3.5" /> Admin Fast-Approve (Demo)
              </button>
            </div>
          </div>
        )}

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* FREE PLAN */}
          <div className="bg-slate-800/80 border border-slate-700 rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:border-slate-600 transition shadow-lg">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-lg text-xs font-bold bg-slate-700/80 text-slate-300">
                  Free Forever
                </span>
                {currentTier === "free" && (
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-800">
                    Active Plan
                  </span>
                )}
              </div>

              <div className="mb-4">
                <div className="text-3xl sm:text-4xl font-black text-white">PKR 0</div>
                <div className="text-xs text-slate-400 font-medium">Free for individual taxpayers</div>
              </div>

              <p className="text-xs text-slate-300 mb-6 leading-relaxed">
                Ideal for individual salaried taxpayers needing quick advice on tax slabs and basic filing definitions.
              </p>

              <div className="space-y-3 text-xs text-slate-300 mb-6">
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span><strong>5 AI Legal Queries</strong> per day</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Basic Tax Laws & Slab Summary</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Active Taxpayer List (ATL) directory</span>
                </div>
                <div className="flex items-center gap-2.5 text-slate-500">
                  <span className="w-4 h-4 rounded-full bg-slate-700/60 flex items-center justify-center text-[10px]">✕</span>
                  <span>No contract or notice uploads</span>
                </div>
                <div className="flex items-center gap-2.5 text-slate-500">
                  <span className="w-4 h-4 rounded-full bg-slate-700/60 flex items-center justify-center text-[10px]">✕</span>
                  <span>No PDF audit trails</span>
                </div>
              </div>
            </div>

            <button
              disabled={currentTier === "free"}
              className="w-full py-3 rounded-xl text-xs font-bold bg-slate-700/80 text-slate-400 cursor-default"
            >
              {currentTier === "free" ? "Your Current Plan" : "Downgrade to Free"}
            </button>
          </div>

          {/* PRO PLAN */}
          <div className="bg-gradient-to-b from-emerald-950 via-slate-900 to-slate-900 border-2 border-emerald-500 rounded-3xl p-6 sm:p-8 relative flex flex-col justify-between shadow-2xl">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-emerald-400 to-emerald-500 text-slate-950 px-4 py-1 rounded-full text-[10px] font-black tracking-wide uppercase shadow-md">
              Most Popular for Filers & CFOs
            </div>

            <div>
              <div className="flex items-center justify-between mb-4 mt-2">
                <span className="px-3 py-1 rounded-lg text-xs font-bold bg-emerald-900/90 text-emerald-300 border border-emerald-700">
                  Pro Tier
                </span>
                {currentTier === "pro" && (
                  <span className="text-[10px] font-bold text-emerald-300 bg-emerald-900/80 px-2.5 py-0.5 rounded-full border border-emerald-600">
                    Current Active Plan
                  </span>
                )}
              </div>

              <div className="mb-4">
                <div className="text-3xl sm:text-4xl font-black text-white">PKR 2,500</div>
                <div className="text-xs text-emerald-300 font-medium">Billed monthly via Direct Bank / JazzCash</div>
              </div>

              <p className="text-xs text-slate-300 mb-6 leading-relaxed">
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
              id="btn-upgrade-pro"
              onClick={() => openCheckoutModal("pro")}
              className="w-full py-3 rounded-xl text-xs font-black bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <CreditCard className="w-4 h-4" />
              <span>{currentTier === "pro" ? "Renew / View Bank Details" : "Select Pro Plan (PKR 2,500/mo)"}</span>
            </button>
          </div>

          {/* ENTERPRISE PLAN */}
          <div className="bg-slate-800/80 border border-amber-500/60 rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:border-amber-500 transition shadow-lg">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-lg text-xs font-bold bg-amber-950/80 text-amber-300 border border-amber-700/60">
                  Enterprise Tier
                </span>
                {currentTier === "enterprise" && (
                  <span className="text-[10px] font-bold text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded-full border border-amber-800">
                    Active Plan
                  </span>
                )}
              </div>

              <div className="mb-4">
                <div className="text-3xl sm:text-4xl font-black text-white">PKR 10,000</div>
                <div className="text-xs text-amber-300 font-medium">Billed monthly via Direct Bank / JazzCash</div>
              </div>

              <p className="text-xs text-slate-300 mb-6 leading-relaxed">
                Full suite for law firms, corporate groups, and tax consultancies with multi-seat collaboration & escalation.
              </p>

              <div className="space-y-3 text-xs text-slate-200 mb-6">
                <div className="flex items-center gap-2.5">
                  <Crown className="w-4 h-4 text-amber-400 shrink-0" />
                  <span><strong>Multi-User Team Workspace</strong></span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Everything in Pro Plan included</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span><strong>Direct Tax Consultant Escalation</strong></span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Custom High Court & ATIR Case Grounding</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Priority Dedicated Legal API Channel</span>
                </div>
              </div>
            </div>

            <button
              id="btn-upgrade-enterprise"
              onClick={() => openCheckoutModal("enterprise")}
              className="w-full py-3 rounded-xl text-xs font-black bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 transition shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <Crown className="w-4 h-4" />
              <span>{currentTier === "enterprise" ? "Renew / View Bank Details" : "Upgrade to Enterprise (PKR 10,000/mo)"}</span>
            </button>
          </div>

        </div>

      </main>

      {/* DIRECT BANK TRANSFER CHECKOUT MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div className="bg-slate-900 text-white rounded-3xl shadow-2xl border border-slate-700 max-w-2xl w-full overflow-hidden my-8">
            
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-emerald-950 to-slate-900 px-6 py-5 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold tracking-tight text-white">Direct Bank Transfer Checkout</h2>
                  <p className="text-xs text-emerald-300">SaqibTax Legal AI Official Payment Gateway</p>
                </div>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
              
              {submittedSub ? (
                /* RECEIPT SCREEN */
                <div className="space-y-6">
                  <div className="bg-emerald-950/60 border border-emerald-600 rounded-2xl p-5 text-center space-y-2">
                    <div className="w-12 h-12 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center mx-auto mb-2 font-bold shadow-md">
                      <CheckCircle2 className="w-7 h-7" />
                    </div>
                    <h3 className="text-base font-bold text-emerald-300">Payment Receipt Submitted Successfully!</h3>
                    <p className="text-xs text-slate-300 max-w-md mx-auto">
                      Your verification status is currently <span className="font-bold px-2 py-0.5 bg-amber-500/20 text-amber-300 rounded border border-amber-500/40">PENDING VERIFICATION</span>.
                      Our accounts desk verifies incoming transfers within 15-30 minutes during business hours.
                    </p>
                  </div>

                  <div className="bg-slate-800/80 rounded-2xl p-5 border border-slate-700 space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-700 pb-2">
                      <span className="text-xs text-slate-400">Subscription Plan</span>
                      <span className="text-xs font-bold text-white">{submittedSub.plan_tier?.toUpperCase()} Tier</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-slate-700 pb-2">
                      <span className="text-xs text-slate-400">Amount Paid</span>
                      <span className="text-xs font-bold text-emerald-400">PKR {Number(submittedSub.amount_pkr).toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-slate-700 pb-2">
                      <span className="text-xs text-slate-400">Transaction ID (TRX ID)</span>
                      <span className="text-xs font-mono font-bold text-white">{submittedSub.trx_id}</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-slate-700 pb-2">
                      <span className="text-xs text-slate-400">Sender / Account Name</span>
                      <span className="text-xs font-semibold text-slate-200">{submittedSub.account_holder_name}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-400">Payment Channel</span>
                      <span className="text-xs font-semibold text-slate-200">{submittedSub.payment_method}</span>
                    </div>
                  </div>

                  <div className="bg-amber-950/50 border border-amber-600/60 rounded-2xl p-4 space-y-3">
                    <div className="flex items-start gap-2.5">
                      <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-amber-200">Developer Fast-Approval Simulator</p>
                        <p className="text-[11px] text-slate-300">
                          Trigger the admin approval endpoint directly to activate <span className="font-bold">{selectedPlan.toUpperCase()}</span> capabilities instantly.
                        </p>
                      </div>
                    </div>

                    {approvalSuccess ? (
                      <div className="p-3 bg-emerald-600 text-white text-xs font-bold rounded-xl text-center">
                        ✓ Account Role Elevated to {selectedPlan.toUpperCase()}!
                      </div>
                    ) : (
                      <button
                        onClick={() => handleSimulateAdminApproval(submittedSub.id)}
                        disabled={simulatingApproval}
                        className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold rounded-xl text-xs shadow transition flex items-center justify-center gap-2"
                      >
                        {simulatingApproval ? "Verifying..." : "Simulate Admin Instant Approval"}
                      </button>
                    )}
                  </div>

                  <button
                    onClick={() => setModalOpen(false)}
                    className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs"
                  >
                    Close
                  </button>
                </div>
              ) : (
                /* FORM */
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Plan Switcher */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-300 block">Choose Plan</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setSelectedPlan("pro")}
                        className={`p-3 rounded-2xl border text-left transition ${
                          selectedPlan === "pro"
                            ? "border-emerald-500 bg-emerald-950/40 ring-1 ring-emerald-500"
                            : "border-slate-700 bg-slate-800/60"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold text-white">Pro Plan</span>
                          <span className="text-xs font-black text-emerald-400">PKR 2,500</span>
                        </div>
                        <p className="text-[11px] text-slate-400">Unlimited queries & notice drafter</p>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedPlan("enterprise")}
                        className={`p-3 rounded-2xl border text-left transition ${
                          selectedPlan === "enterprise"
                            ? "border-amber-500 bg-amber-950/40 ring-1 ring-amber-500"
                            : "border-slate-700 bg-slate-800/60"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold text-white">Enterprise</span>
                          <span className="text-xs font-black text-amber-400">PKR 10,000</span>
                        </div>
                        <p className="text-[11px] text-slate-400">Team seats & direct escalation</p>
                      </button>
                    </div>
                  </div>

                  {/* Official Bank Details Card */}
                  <div className="bg-gradient-to-br from-slate-950 to-emerald-950/80 rounded-2xl p-5 space-y-4 border border-slate-700 shadow-lg">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-emerald-400" />
                        <span className="text-xs font-bold uppercase text-emerald-300">
                          Official Bank Transfer Details
                        </span>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 bg-emerald-500/20 text-emerald-300 rounded-full border border-emerald-500/30">
                        Active FBR Account
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div>
                        <span className="text-slate-400 text-[11px] block">Account Title</span>
                        <span className="font-bold text-white text-sm">SaqibTax Legal AI</span>
                      </div>

                      <div>
                        <span className="text-slate-400 text-[11px] block">Bank Name</span>
                        <span className="font-bold text-white text-sm">Meezan Bank / HBL</span>
                      </div>

                      {/* IBAN */}
                      <div className="sm:col-span-2 bg-slate-900/90 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
                        <div className="space-y-0.5">
                          <span className="text-slate-400 text-[10px] uppercase font-bold">Account / IBAN Number</span>
                          <p className="font-mono text-xs sm:text-sm font-black text-emerald-400">
                            PK00MEZN00012345678901
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => copyToClipboard("PK00MEZN00012345678901", "iban")}
                          className="px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 text-xs font-semibold flex items-center gap-1.5 transition"
                        >
                          {copiedField === "iban" ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedField === "iban" ? "Copied" : "Copy IBAN"}</span>
                        </button>
                      </div>

                      {/* JazzCash / EasyPaisa */}
                      <div className="sm:col-span-2 bg-slate-900/90 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
                        <div className="space-y-0.5">
                          <span className="text-slate-400 text-[10px] uppercase font-bold">JazzCash / EasyPaisa Wallet</span>
                          <p className="font-mono text-xs sm:text-sm font-black text-amber-400">
                            0300-1234567
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => copyToClipboard("03001234567", "wallet")}
                          className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 text-xs font-semibold flex items-center gap-1.5 transition"
                        >
                          {copiedField === "wallet" ? <Check className="w-3.5 h-3.5" /> : <Smartphone className="w-3.5 h-3.5" />}
                          <span>{copiedField === "wallet" ? "Copied" : "Copy Number"}</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {error && (
                    <div className="p-3 bg-rose-950/70 border border-rose-600 text-rose-200 text-xs font-semibold rounded-xl flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                      <span>{error}</span>
                    </div>
                  )}

                  {/* Submission Form Inputs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-300 block mb-1">Payment Method *</label>
                      <select
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value as any)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-800 text-xs text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                      >
                        <option value="Meezan Bank">Meezan Bank</option>
                        <option value="HBL">Habib Bank Limited (HBL)</option>
                        <option value="JazzCash">JazzCash Wallet</option>
                        <option value="EasyPaisa">EasyPaisa Wallet</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-300 block mb-1">Payment Date *</label>
                      <input
                        type="date"
                        value={paymentDate}
                        onChange={(e) => setPaymentDate(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-800 text-xs text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-300 block mb-1">Transaction ID (TRX ID) *</label>
                      <input
                        type="text"
                        value={trxId}
                        onChange={(e) => setTrxId(e.target.value)}
                        placeholder="e.g. MEZN-8392104"
                        className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-800 text-xs text-white font-mono focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-300 block mb-1">Sender / Account Name *</label>
                      <input
                        type="text"
                        value={accountHolderName}
                        onChange={(e) => setAccountHolderName(e.target.value)}
                        placeholder="Name on bank receipt"
                        className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-800 text-xs text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setModalOpen(false)}
                      className="px-5 py-2.5 rounded-xl border border-slate-700 text-slate-300 font-bold text-xs hover:bg-slate-800 transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-black transition flex items-center justify-center gap-2"
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
              )}

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
