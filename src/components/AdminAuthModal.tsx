import React, { useState } from 'react';
import { 
  Lock, 
  KeyRound, 
  X, 
  ShieldCheck, 
  AlertCircle,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';

interface AdminAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminAuthModal: React.FC<AdminAuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [passkey, setPasskey] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    setTimeout(() => {
      if (passkey.trim() === '78727872') {
        try {
          sessionStorage.setItem('saqibtax_host_authenticated', 'true');
        } catch {
          // ignore
        }
        setLoading(false);
        setPasskey('');
        onSuccess();
      } else {
        setLoading(false);
        setError('Invalid Admin Passkey. Access restricted to authorized portal hosts.');
      }
    }, 250);
  };

  return (
    <div 
      id="admin-auth-modal-overlay" 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-fade-in"
    >
      <div className="relative w-full max-w-md bg-slate-900 border border-amber-500/40 rounded-3xl shadow-2xl overflow-hidden animate-scale-up text-white">
        
        {/* Header with amber glow */}
        <div className="p-6 bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950/60 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400 shadow-inner">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">Host / Admin Authentication</h3>
              <p className="text-[11px] text-slate-400">Restricted Administration & Ledger Portal</p>
            </div>
          </div>

          <button
            id="close-admin-auth-modal-btn"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 block">
              Enter 8-Digit Secret Admin Passkey
            </label>
            <div className="relative">
              <input
                id="host-passkey-input"
                type="password"
                autoFocus
                value={passkey}
                onChange={(e) => {
                  setPasskey(e.target.value);
                  setError(null);
                }}
                placeholder="Enter secret passkey"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm font-mono text-white placeholder-slate-500 focus:outline-hidden focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
              />
              <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            </div>
            <p className="text-[10px] text-slate-400">
              Only authorized hosts can manage bank accounts, pricing tiers, and verify user payment receipts.
            </p>
          </div>

          {error && (
            <div className="p-3 bg-rose-950/80 border border-rose-600/50 text-rose-200 text-xs font-semibold rounded-xl flex items-center gap-2 animate-shake">
              <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl text-xs font-bold text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700/80 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              id="unlock-host-portal-btn"
              disabled={loading || !passkey.trim()}
              className="flex-1 py-2.5 rounded-xl text-xs font-black text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-lg shadow-amber-950/50 transition flex items-center justify-center gap-1.5 disabled:opacity-50"
            >
              {loading ? (
                <span>Verifying...</span>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5" />
                  <span>Unlock Host Portal</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
