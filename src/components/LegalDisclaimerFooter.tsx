import React from 'react';
import {
  Scale,
  ShieldCheck,
  Lock,
  Eye,
  EyeOff,
  ExternalLink,
  Info
} from 'lucide-react';

interface LegalDisclaimerFooterProps {
  onOpenLegalNotice: () => void;
  onOpenPrivacyManager: () => void;
  isMasked: boolean;
  onToggleMasking: () => void;
}

export const LegalDisclaimerFooter: React.FC<LegalDisclaimerFooterProps> = ({
  onOpenLegalNotice,
  onOpenPrivacyManager,
  isMasked,
  onToggleMasking
}) => {
  return (
    <footer 
      id="global-legal-footer"
      className="border-t border-slate-800 bg-slate-950/95 text-slate-400 py-3 px-4 sm:px-6 text-[11px] backdrop-blur-md transition-all mt-auto shrink-0"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2.5">
        {/* Left: Mandatory Global Statutory Disclaimer */}
        <div className="flex items-center gap-2 text-slate-400 text-center md:text-left">
          <Info className="w-3.5 h-3.5 text-emerald-400 shrink-0 hidden sm:block" />
          <p className="leading-tight">
            <span className="font-semibold text-slate-300">Statutory Notice:</span> SaqibTax is an independent legal-tech assistance platform. All calculations are performed deterministically based on statutory provisions (Finance Act 2026). This application does not substitute official FBR Iris filings.
          </p>
        </div>

        {/* Right: Quick Action Controls & Badges */}
        <div className="flex items-center gap-3 shrink-0 flex-wrap justify-center">
          {/* Screen Masking Status Button */}
          <button
            id="footer-toggle-privacy-mask"
            onClick={onToggleMasking}
            className={`flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-semibold transition border ${
              isMasked
                ? 'bg-amber-950/80 border-amber-600 text-amber-300'
                : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-slate-200'
            }`}
            title="Toggle client financial data masking on screen"
          >
            {isMasked ? <EyeOff className="w-3 h-3 text-amber-400" /> : <Eye className="w-3 h-3" />}
            <span>Privacy Mask: {isMasked ? 'ON' : 'OFF'}</span>
          </button>

          {/* Privacy Manager Trigger */}
          <button
            id="footer-open-privacy-manager"
            onClick={onOpenPrivacyManager}
            className="flex items-center gap-1 text-slate-400 hover:text-emerald-400 transition"
            title="Local Storage Encryption & Chamber Backups"
          >
            <Lock className="w-3 h-3 text-emerald-500" />
            <span className="hover:underline">Client Privacy Manager</span>
          </button>

          <span className="text-slate-700 hidden sm:inline">|</span>

          {/* Legal Notice Trigger */}
          <button
            id="footer-open-legal-notice"
            onClick={onOpenLegalNotice}
            className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-medium transition"
            title="View Full Statutory Disclaimers & Limitations"
          >
            <Scale className="w-3 h-3" />
            <span className="underline decoration-emerald-600/60 underline-offset-2">Legal Disclaimers</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
