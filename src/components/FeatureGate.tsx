import React, { useState } from 'react';
import { Lock, Crown, Zap, ArrowRight, ShieldAlert } from 'lucide-react';
import { UserProfile, FeatureKey, SubscriptionTier } from '../types';
import { hasFeatureAccess, getFeatureRequirement } from '../utils/subscriptionController';
import { UpgradeToUnlockModal } from './UpgradeToUnlockModal';

interface FeatureGateProps {
  feature: FeatureKey;
  user: UserProfile | null;
  children: React.ReactNode;
  fallbackMode?: 'blur_overlay' | 'banner' | 'hidden';
  onNavigateToPricing?: () => void;
  onSelectPlan?: (tier: SubscriptionTier) => void;
  customMessage?: string;
}

export const FeatureGate: React.FC<FeatureGateProps> = ({
  feature,
  user,
  children,
  fallbackMode = 'blur_overlay',
  onNavigateToPricing,
  onSelectPlan,
  customMessage,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const isAccessible = hasFeatureAccess(user, feature);

  if (isAccessible) {
    return <>{children}</>;
  }

  if (fallbackMode === 'hidden') {
    return null;
  }

  const req = getFeatureRequirement(feature);

  if (fallbackMode === 'banner') {
    return (
      <div className="p-4 rounded-2xl bg-slate-900/90 border border-amber-500/40 text-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">{req.name} Locked</h4>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40">
                {req.minTier.toUpperCase()} TIER REQUIRED
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              {customMessage || req.description}
            </p>
          </div>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="px-4 py-2 bg-gradient-to-r from-amber-500 to-emerald-500 hover:from-amber-400 hover:to-emerald-400 text-slate-950 font-black rounded-xl text-xs flex items-center gap-1.5 shadow-md shrink-0 transition"
        >
          <Crown className="w-3.5 h-3.5" />
          <span>Upgrade to Unlock</span>
        </button>

        <UpgradeToUnlockModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          featureKey={feature}
          user={user}
          onNavigateToPricing={onNavigateToPricing}
          onSelectPlan={onSelectPlan}
        />
      </div>
    );
  }

  // Default: Blur Overlay
  return (
    <div className="relative rounded-2xl overflow-hidden group">
      {/* Blurred / Non-interactive Content */}
      <div className="filter blur-[4px] pointer-events-none opacity-40 select-none">
        {children}
      </div>

      {/* Lock Overlay */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6 bg-slate-950/75 backdrop-blur-xs text-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500/20 to-emerald-500/20 border border-amber-500/40 text-amber-300 flex items-center justify-center shadow-lg shadow-amber-950/40">
          <Lock className="w-6 h-6" />
        </div>

        <div className="max-w-md space-y-1.5">
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/40">
            {req.minTier.toUpperCase()} EXCLUSIVE
          </span>
          <h3 className="text-base font-extrabold text-white">
            Unlock {req.name}
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            {customMessage || req.description}
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="px-5 py-2.5 bg-gradient-to-r from-amber-500 via-emerald-500 to-teal-400 hover:from-amber-400 hover:to-teal-300 text-slate-950 font-black rounded-xl text-xs shadow-lg shadow-emerald-950/60 flex items-center gap-2 transition transform hover:scale-[1.02]"
        >
          <Zap className="w-4 h-4 fill-slate-950" />
          <span>Upgrade to Unlock</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <UpgradeToUnlockModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        featureKey={feature}
        user={user}
        onNavigateToPricing={onNavigateToPricing}
        onSelectPlan={onSelectPlan}
      />
    </div>
  );
};
