import React from 'react';
import { 
  X, 
  Crown, 
  Sparkles, 
  CheckCircle2, 
  Lock, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Building2 
} from 'lucide-react';
import { UserProfile, SubscriptionTier, FeatureKey } from '../types';
import { FEATURE_REQUIREMENTS, SUBSCRIPTION_PLANS } from '../utils/subscriptionController';

interface UpgradeToUnlockModalProps {
  isOpen: boolean;
  onClose: () => void;
  featureKey: FeatureKey;
  user: UserProfile | null;
  onSelectPlan?: (tier: SubscriptionTier) => void;
  onNavigateToPricing?: () => void;
}

export const UpgradeToUnlockModal: React.FC<UpgradeToUnlockModalProps> = ({
  isOpen,
  onClose,
  featureKey,
  user,
  onSelectPlan,
  onNavigateToPricing,
}) => {
  if (!isOpen) return null;

  const req = FEATURE_REQUIREMENTS[featureKey] || {
    minTier: 'enterprise' as SubscriptionTier,
    name: 'Advanced Legal & Tax Feature',
    description: 'This capability requires an upgraded subscription.',
    benefits: ['Unlock full platform capabilities', 'Priority compliance support'],
  };

  const targetPlan = SUBSCRIPTION_PLANS[req.minTier];
  const userTier = user?.subscriptionTier || 'free';

  const handleUpgradeClick = (tier: SubscriptionTier) => {
    if (onSelectPlan) {
      onSelectPlan(tier);
    } else if (onNavigateToPricing) {
      onNavigateToPricing();
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div 
        id="upgrade-to-unlock-modal"
        className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative overflow-hidden text-slate-100 space-y-6"
      >
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-amber-400 to-emerald-500" />
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-xl bg-slate-800/60 hover:bg-slate-800 transition"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header with Feature Badge */}
        <div className="space-y-2.5">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1 text-[11px] font-bold">
              <Lock className="w-3.5 h-3.5" />
              {req.minTier === 'enterprise' ? 'Enterprise Tier Feature' : 'Pro Consultant Feature'}
            </span>
            <span className="text-xs text-slate-400">
              Current Plan: <span className="text-slate-200 font-semibold uppercase">{userTier}</span>
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2">
            <span>Unlock</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-emerald-300 to-teal-200">
              {req.name}
            </span>
          </h2>

          <p className="text-xs text-slate-300 leading-relaxed">
            {req.description}
          </p>
        </div>

        {/* Key Benefits List */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-4 space-y-2.5">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Included in this tier:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-200">
            {req.benefits.map((benefit, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-[11.5px] leading-snug">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Plan Pricing Callout */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Crown className="w-4 h-4 text-amber-400" />
              <span className="text-sm font-bold text-white">{targetPlan.name}</span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Starting from <strong className="text-white">PKR {targetPlan.monthlyPricePKR.toLocaleString()}/mo</strong> or PKR {targetPlan.annualPricePKR.toLocaleString()}/yr
            </p>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              id="upgrade-modal-cta-btn"
              onClick={() => handleUpgradeClick(req.minTier)}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-emerald-500 hover:from-amber-400 hover:to-emerald-400 text-slate-950 font-black text-xs shadow-lg shadow-emerald-950/50 flex items-center justify-center gap-2 transition"
            >
              <Zap className="w-3.5 h-3.5 fill-slate-950" />
              <span>Upgrade Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Footer Note */}
        <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-800/80">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Direct Pakistani Bank & Wallet Checkout</span>
          </div>
          <button
            onClick={() => {
              if (onNavigateToPricing) onNavigateToPricing();
              onClose();
            }}
            className="text-emerald-400 hover:text-emerald-300 font-semibold underline"
          >
            Compare All Plans
          </button>
        </div>

      </div>
    </div>
  );
};
