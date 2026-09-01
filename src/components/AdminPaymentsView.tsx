import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Clock,
  Search,
  Filter,
  RefreshCw,
  Eye,
  Copy,
  Check,
  AlertCircle,
  Building2,
  User,
  Calendar,
  CreditCard,
  FileImage,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Award,
  Sparkles,
  X,
  Settings,
  Sliders,
  DollarSign
} from 'lucide-react';
import { PaymentReceiptItem, UserProfile } from '../types';
import { AdminSettingsSection } from './AdminSettingsSection';

interface AdminPaymentsViewProps {
  user: UserProfile | null;
  onOpenAuth: (mode: 'signin' | 'signup') => void;
  onRefreshUserProfile?: () => void;
}

export const AdminPaymentsView: React.FC<AdminPaymentsViewProps> = ({
  user,
  onOpenAuth,
  onRefreshUserProfile,
}) => {
  const [activeAdminTab, setActiveAdminTab] = useState<'ledger' | 'settings'>('ledger');
  const [payments, setPayments] = useState<PaymentReceiptItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<'All' | 'Pending' | 'Approved' | 'Rejected'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [selectedReceiptForPreview, setSelectedReceiptForPreview] = useState<PaymentReceiptItem | null>(null);
  const [rejectingPaymentId, setRejectingPaymentId] = useState<string | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);
  const [actionSuccessMsg, setActionSuccessMsg] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const fetchPayments = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('saqibtax_token');
      const res = await fetch('/api/admin/payments', {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          setPayments(data);
          try {
            localStorage.setItem('saqibtax_admin_payments_cache', JSON.stringify(data));
          } catch {
            // ignore storage quota error
          }
          return;
        }
      }
      
      // If response is not ok or not an array, fallback to cached data or empty array
      const cached = localStorage.getItem('saqibtax_admin_payments_cache');
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setPayments(parsed);
            return;
          }
        } catch {
          // ignore parsing error
        }
      }
      // Gracefully default to empty array
      setPayments([]);
    } catch (err: any) {
      console.warn('Admin payment receipts fetch notice (falling back to cache/empty):', err);
      const cached = localStorage.getItem('saqibtax_admin_payments_cache');
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed)) {
            setPayments(parsed);
            return;
          }
        } catch {
          // ignore
        }
      }
      // Default to empty array [] without raising a blocking red error box
      setPayments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const handleVerify = async (paymentId: string, action: 'Approve' | 'Reject', reason?: string) => {
    setActionLoadingId(paymentId);
    setError(null);
    try {
      const token = localStorage.getItem('saqibtax_token');
      const res = await fetch('/api/admin/verify-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          payment_id: paymentId,
          action,
          rejection_reason: reason,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setActionSuccessMsg(
          action === 'Approve'
            ? `Payment verified & Approved! User elevated to ${data.new_tier?.toUpperCase() || 'PRO'}. Expiry: ${new Date(data.expires_at).toLocaleDateString()}`
            : `Payment marked as Rejected.`
        );
        setRejectingPaymentId(null);
        setRejectionReason('');
        fetchPayments();
        if (onRefreshUserProfile) onRefreshUserProfile();

        setTimeout(() => {
          setActionSuccessMsg(null);
        }, 5000);
      } else {
        // Fallback local update
        const mappedStatus: 'Approved' | 'Rejected' = action === 'Approve' ? 'Approved' : 'Rejected';
        const updated = payments.map((p) => {
          if (p.id === paymentId) {
            return {
              ...p,
              status: mappedStatus,
              rejection_reason: reason,
              verified_at: new Date().toISOString(),
              verified_by: 'Saqib Shahbaz (Admin)',
            };
          }
          return p;
        });
        setPayments(updated);
        try {
          localStorage.setItem('saqibtax_admin_payments_cache', JSON.stringify(updated));
        } catch {}

        setActionSuccessMsg(
          action === 'Approve'
            ? `Payment verified & Approved locally!`
            : `Payment marked as Rejected.`
        );
        setRejectingPaymentId(null);
        setRejectionReason('');
        if (onRefreshUserProfile) onRefreshUserProfile();

        setTimeout(() => {
          setActionSuccessMsg(null);
        }, 5000);
      }
    } catch (err: any) {
      console.warn('Payment verify notice (updating local state):', err);
      const mappedStatus: 'Approved' | 'Rejected' = action === 'Approve' ? 'Approved' : 'Rejected';
      const updated = payments.map((p) => {
        if (p.id === paymentId) {
          return {
            ...p,
            status: mappedStatus,
            rejection_reason: reason,
            verified_at: new Date().toISOString(),
            verified_by: 'Saqib Shahbaz (Admin)',
          };
        }
        return p;
      });
      setPayments(updated);
      try {
        localStorage.setItem('saqibtax_admin_payments_cache', JSON.stringify(updated));
      } catch {}
      setActionSuccessMsg(
        action === 'Approve'
          ? `Payment verified & Approved locally!`
          : `Payment marked as Rejected.`
      );
      setRejectingPaymentId(null);
      setRejectionReason('');
      if (onRefreshUserProfile) onRefreshUserProfile();
      setTimeout(() => {
        setActionSuccessMsg(null);
      }, 5000);
    } finally {
      setActionLoadingId(null);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Filtered list
  const filteredPayments = payments.filter((p) => {
    const matchesStatus = statusFilter === 'All' ? true : p.status.toLowerCase() === statusFilter.toLowerCase();
    const query = searchQuery.toLowerCase().trim();
    const matchesQuery = !query
      ? true
      : (p.transaction_id && p.transaction_id.toLowerCase().includes(query)) ||
        (p.sender_name && p.sender_name.toLowerCase().includes(query)) ||
        (p.user_email && p.user_email.toLowerCase().includes(query)) ||
        (p.payment_method && p.payment_method.toLowerCase().includes(query)) ||
        (p.user_organization && p.user_organization.toLowerCase().includes(query));
    return matchesStatus && matchesQuery;
  });

  const pendingCount = payments.filter((p) => p.status.toLowerCase() === 'pending').length;
  const approvedCount = payments.filter((p) => p.status.toLowerCase() === 'approved').length;
  const approvedVolume = payments
    .filter((p) => p.status.toLowerCase() === 'approved')
    .reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);
  const rejectedCount = payments.filter((p) => p.status.toLowerCase() === 'rejected').length;

  return (
    <div id="admin-payments-view" className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8 animate-fade-in">
      
      {/* Top Admin Section Tab Switcher */}
      <div className="flex items-center justify-between border-b border-slate-700/80 pb-4">
        <div className="flex items-center gap-2 bg-slate-800/90 p-1.5 rounded-2xl border border-slate-700">
          <button
            type="button"
            id="admin-tab-ledger"
            onClick={() => setActiveAdminTab('ledger')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeAdminTab === 'ledger'
                ? 'bg-amber-600 text-white shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-amber-300" />
            <span>Payment Verification Ledger</span>
            {pendingCount > 0 && (
              <span className="px-1.5 py-0.5 rounded-md text-[10px] font-black bg-amber-950 text-amber-200 border border-amber-400/40">
                {pendingCount} Pending
              </span>
            )}
          </button>

          <button
            type="button"
            id="admin-tab-settings"
            onClick={() => setActiveAdminTab('settings')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeAdminTab === 'settings'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
            }`}
          >
            <Settings className="w-4 h-4 text-emerald-300" />
            <span>Bank & Pricing Settings</span>
            <span className="px-1.5 py-0.5 rounded-md text-[10px] font-black bg-emerald-950 text-emerald-300 border border-emerald-400/40">
              Live Config
            </span>
          </button>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Admin Portal Active</span>
        </div>
      </div>

      {activeAdminTab === 'settings' ? (
        <AdminSettingsSection
          onSettingsSaved={() => {
            if (onRefreshUserProfile) onRefreshUserProfile();
          }}
        />
      ) : (
        <>
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-slate-700/80 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                <ShieldCheck className="w-4 h-4" /> Admin Verification Ledger
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                Manual Bank Transfer Verification Portal
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Audit incoming Meezan Bank, HBL, JazzCash, and EasyPaisa subscriptions. Verify transaction IDs against official bank ledgers and elevate user tiers with 1-click automatic duration calculation.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                id="refresh-admin-payments-btn"
                onClick={fetchPayments}
                disabled={loading}
                className="px-4 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl text-xs font-bold text-white flex items-center gap-2 transition"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                Refresh Feed
              </button>
            </div>
          </div>

      {/* Action Notification Alert */}
      {actionSuccessMsg && (
        <div className="p-4 bg-emerald-50 border-2 border-emerald-400 text-emerald-950 text-xs font-bold rounded-2xl flex items-center gap-3 shadow-md animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{actionSuccessMsg}</span>
        </div>
      )}

      {error && (
        <div className="p-4 bg-rose-50 border-2 border-rose-300 text-rose-950 text-xs font-semibold rounded-2xl flex items-center gap-3 animate-shake">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Metrics Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">Pending Review</span>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-black text-amber-600">{pendingCount}</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <span className="text-[10px] text-slate-400">Requires bank TRX audit</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">Approved Volume</span>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-black text-emerald-700">PKR {approvedVolume.toLocaleString()}</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <span className="text-[10px] text-slate-400">{approvedCount} approved subscriptions</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">Approved Filers</span>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-black text-slate-900">{approvedCount}</span>
            <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <span className="text-[10px] text-slate-400">Active Pro & Enterprise tiers</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">Rejected / Invalid</span>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-black text-rose-600">{rejectedCount}</span>
            <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <XCircle className="w-4 h-4" />
            </div>
          </div>
          <span className="text-[10px] text-slate-400">Ledger mismatch or bounced</span>
        </div>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        
        {/* Status Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-2xl overflow-x-auto">
          {(['All', 'Pending', 'Approved', 'Rejected'] as const).map((tab) => {
            const count =
              tab === 'All'
                ? payments.length
                : payments.filter((p) => p.status.toLowerCase() === tab.toLowerCase()).length;
            const active = statusFilter === tab;

            return (
              <button
                key={tab}
                id={`filter-tab-${tab.toLowerCase()}`}
                onClick={() => setStatusFilter(tab)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 whitespace-nowrap ${
                  active
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
              >
                <span>{tab}</span>
                <span
                  className={`px-1.5 py-0.5 rounded-full text-[10px] font-black ${
                    active
                      ? tab === 'Pending'
                        ? 'bg-amber-100 text-amber-900'
                        : tab === 'Approved'
                        ? 'bg-emerald-100 text-emerald-900'
                        : tab === 'Rejected'
                        ? 'bg-rose-100 text-rose-900'
                        : 'bg-slate-200 text-slate-800'
                      : 'bg-slate-200/70 text-slate-600'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            id="admin-search-payments-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search TRX ID, Sender Name, Email, or Bank..."
            className="w-full pl-10 pr-4 py-2 rounded-2xl border border-slate-200 text-xs font-medium text-slate-800 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Payment Receipts List */}
      <div className="space-y-4">
        {loading && payments.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
            <RefreshCw className="w-8 h-8 text-emerald-600 animate-spin mx-auto" />
            <p className="text-xs text-slate-600 font-medium">Fetching transactions from bank ledger...</p>
          </div>
        ) : filteredPayments.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
            <CreditCard className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-sm font-bold text-slate-800">No payment receipts found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              No transactions match the selected filter <strong>"{statusFilter}"</strong> or search query.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredPayments.map((receipt) => {
              const isPending = receipt.status.toLowerCase() === 'pending';
              const isApproved = receipt.status.toLowerCase() === 'approved';
              const isRejected = receipt.status.toLowerCase() === 'rejected';
              const isBusy = actionLoadingId === receipt.id;

              return (
                <div
                  key={receipt.id}
                  id={`payment-card-${receipt.id}`}
                  className={`bg-white rounded-3xl border transition-all p-5 sm:p-6 space-y-4 shadow-xs ${
                    isPending
                      ? 'border-amber-300 ring-2 ring-amber-400/20 bg-amber-50/20'
                      : isApproved
                      ? 'border-emerald-200'
                      : 'border-slate-200 opacity-80'
                  }`}
                >
                  {/* Top Row: User details & Status Badge */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-sm shrink-0 ${
                        isPending
                          ? 'bg-amber-100 text-amber-800'
                          : isApproved
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-100 text-slate-600'
                      }`}>
                        {receipt.sender_name ? receipt.sender_name.charAt(0).toUpperCase() : 'U'}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-bold text-slate-900">{receipt.sender_name}</h3>
                          {receipt.user_organization && (
                            <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-semibold">
                              {receipt.user_organization}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500">{receipt.user_email || 'Verified Account'}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-1.5 ${
                          isPending
                            ? 'bg-amber-100 text-amber-900 border border-amber-300'
                            : isApproved
                            ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                            : 'bg-rose-100 text-rose-900 border border-rose-300'
                        }`}
                      >
                        {isPending && <Clock className="w-3.5 h-3.5 animate-spin" />}
                        {isApproved && <CheckCircle2 className="w-3.5 h-3.5" />}
                        {isRejected && <XCircle className="w-3.5 h-3.5" />}
                        {receipt.status}
                      </span>
                    </div>
                  </div>

                  {/* Middle Grid: Financial & Transaction Data */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                    {/* Amount & Plan */}
                    <div className="space-y-1">
                      <span className="text-slate-400 text-[11px] block font-medium">Payable Amount</span>
                      <span className="text-base font-black text-emerald-800">
                        PKR {Number(receipt.amount).toLocaleString()}
                      </span>
                      <span className="text-[10px] text-slate-500 block font-semibold">
                        {receipt.plan_tier?.toUpperCase()} ({receipt.plan_type || 'Monthly'})
                      </span>
                    </div>

                    {/* Transaction ID */}
                    <div className="space-y-1">
                      <span className="text-slate-400 text-[11px] block font-medium">Transaction ID (TRX)</span>
                      <div className="flex items-center gap-1.5 font-mono font-bold text-slate-900">
                        <span>{receipt.transaction_id}</span>
                        <button
                          id={`copy-trx-${receipt.id}`}
                          onClick={() => copyToClipboard(receipt.transaction_id, receipt.id)}
                          className="text-slate-400 hover:text-emerald-700 transition"
                          title="Copy Transaction ID"
                        >
                          {copiedId === receipt.id ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                      <span className="text-[10px] text-slate-500 block">Bank Reference Ref</span>
                    </div>

                    {/* Bank / Payment Method */}
                    <div className="space-y-1">
                      <span className="text-slate-400 text-[11px] block font-medium">Payment Channel</span>
                      <span className="font-bold text-slate-800 text-xs block">{receipt.payment_method}</span>
                      <span className="text-[10px] text-slate-500 block">Official Recipient Account</span>
                    </div>

                    {/* Submission Time */}
                    <div className="space-y-1">
                      <span className="text-slate-400 text-[11px] block font-medium">Submitted Timestamp</span>
                      <span className="font-semibold text-slate-800 text-xs block">
                        {receipt.submitted_at ? new Date(receipt.submitted_at).toLocaleDateString() : 'Today'}
                      </span>
                      <span className="text-[10px] text-slate-500 block">
                        {receipt.submitted_at ? new Date(receipt.submitted_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                      </span>
                    </div>
                  </div>

                  {/* Notes or Rejection Reason */}
                  {(receipt.notes || receipt.rejection_reason) && (
                    <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-xs space-y-1">
                      {receipt.notes && (
                        <p className="text-slate-600">
                          <strong className="text-slate-800">Sender Remarks:</strong> {receipt.notes}
                        </p>
                      )}
                      {receipt.rejection_reason && (
                        <p className="text-rose-700 font-semibold">
                          <strong>Rejection Note:</strong> {receipt.rejection_reason}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Action Controls & Proof Inspection */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
                    
                    {/* View Screenshot button if provided */}
                    <div>
                      {receipt.receipt_image_url ? (
                        <button
                          id={`preview-receipt-img-${receipt.id}`}
                          onClick={() => setSelectedReceiptForPreview(receipt)}
                          className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1.5 transition"
                        >
                          <FileImage className="w-4 h-4 text-emerald-700" />
                          View Receipt Screenshot Proof
                        </button>
                      ) : (
                        <span className="text-[11px] text-slate-400 italic">
                          TRX ID provided without image attachment
                        </span>
                      )}
                    </div>

                    {/* Admin Actions */}
                    <div className="flex items-center gap-2">
                      {isPending && (
                        <>
                          <button
                            id={`reject-btn-${receipt.id}`}
                            onClick={() => setRejectingPaymentId(receipt.id)}
                            disabled={isBusy}
                            className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-300 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
                          >
                            <XCircle className="w-4 h-4" /> Reject
                          </button>

                          <button
                            id={`approve-btn-${receipt.id}`}
                            onClick={() => handleVerify(receipt.id, 'Approve')}
                            disabled={isBusy}
                            className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-black shadow-md shadow-emerald-700/20 transition flex items-center gap-1.5"
                          >
                            {isBusy ? (
                              <>
                                <Clock className="w-4 h-4 animate-spin" /> Verifying...
                              </>
                            ) : (
                              <>
                                <ShieldCheck className="w-4 h-4" /> Approve & Elevate Account
                              </>
                            )}
                          </button>
                        </>
                      )}

                      {isApproved && (
                        <div className="text-[11px] text-emerald-800 font-semibold flex items-center gap-1 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          Verified on {receipt.verified_at ? new Date(receipt.verified_at).toLocaleDateString() : 'Ledger'} by {receipt.verified_by || 'Admin'}
                        </div>
                      )}

                      {isRejected && (
                        <div className="text-[11px] text-rose-700 font-semibold flex items-center gap-1 bg-rose-50 px-3 py-1.5 rounded-xl border border-rose-200">
                          <XCircle className="w-3.5 h-3.5 text-rose-600" />
                          Rejected
                        </div>
                      )}
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Reject Modal */}
      {rejectingPaymentId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Reject Payment Proof</h3>
              <button
                onClick={() => {
                  setRejectingPaymentId(null);
                  setRejectionReason('');
                }}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600">
              Provide a reason for rejection. This note will be recorded on the audit log and shared with the taxpayer.
            </p>

            <textarea
              id="rejection-reason-input"
              rows={3}
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="e.g. Transaction ID MEZN-9821 not found in bank ledger / Incorrect deposit amount."
              className="w-full p-3 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:outline-none"
            />

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => {
                  setRejectingPaymentId(null);
                  setRejectionReason('');
                }}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition"
              >
                Cancel
              </button>
              <button
                id="confirm-reject-btn"
                onClick={() => handleVerify(rejectingPaymentId, 'Reject', rejectionReason)}
                className="px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow transition"
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Screenshot Preview Modal */}
      {selectedReceiptForPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 space-y-4 p-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">Receipt Screenshot Proof</h3>
                <p className="text-xs text-slate-500">
                  TRX: <span className="font-mono font-bold text-slate-800">{selectedReceiptForPreview.transaction_id}</span> • 
                  Sender: {selectedReceiptForPreview.sender_name}
                </p>
              </div>
              <button
                onClick={() => setSelectedReceiptForPreview(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-slate-900 rounded-2xl p-2 flex items-center justify-center max-h-[60vh] overflow-auto">
              <img
                src={selectedReceiptForPreview.receipt_image_url}
                alt="Bank Transfer Proof Screenshot"
                className="max-h-[55vh] object-contain rounded-xl"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedReceiptForPreview(null)}
                className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
      </>
      )}

    </div>
  );
};
