import React from 'react';
import { 
  Scale, 
  Calculator, 
  MessageSquare, 
  FileText, 
  Search, 
  ShieldCheck, 
  Crown, 
  Code2, 
  LogOut, 
  LogIn, 
  UserPlus, 
  Building2, 
  UserCheck, 
  Zap,
  Sparkles,
  Layers,
  Building,
  Globe,
  Users,
  Lock,
  Eye,
  EyeOff
} from 'lucide-react';

import { UserProfile } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  user: UserProfile | null;
  onOpenAuth: (mode: 'signin' | 'signup') => void;
  onSignOut: () => void;
  onOpenTierModal: () => void;
  isMasked?: boolean;
  onToggleMasking?: () => void;
  onOpenPrivacyManager?: () => void;
  onOpenLegalNotice?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  user,
  onOpenAuth,
  onSignOut,
  onOpenTierModal,
  isMasked = false,
  onToggleMasking,
  onOpenPrivacyManager,
  onOpenLegalNotice
}) => {
  const getTierBadge = () => {
    if (!user) return null;
    const tier = user.subscriptionTier;
    if (tier === 'enterprise') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-900 border border-amber-300">
          <Crown className="w-3 h-3 text-amber-600" /> Enterprise
        </span>
      );
    }
    if (tier === 'pro') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-900 border border-emerald-300">
          <Zap className="w-3 h-3 text-emerald-600" /> Pro Plan
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
        Free Tier
      </span>
    );
  };

  const getRoleLabel = () => {
    if (!user) return '';
    if (user.role === 'tax_consultant') return 'Advocate / Consultant';
    if (user.role === 'corporate_client') return 'Corporate Client';
    return 'Individual Taxpayer';
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-900 text-white border-b border-slate-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('chat')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center shadow-lg shadow-emerald-950/40 border border-emerald-400/30">
              <Scale className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg tracking-tight text-white flex items-center gap-1.5">
                  SaqibTax <span className="text-emerald-400 font-extrabold text-sm px-1.5 py-0.5 rounded bg-emerald-950/80 border border-emerald-800/60">LEGAL AI</span>
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">Pakistan Tax Advisory & FBR Legal Intelligence</p>
            </div>
          </div>

          {/* Center Navigation Tabs */}
          <nav className="hidden lg:flex items-center space-x-1 bg-slate-800/80 p-1 rounded-xl border border-slate-700/60">
            <button
              id="nav-tab-statutes-dashboard"
              onClick={() => setActiveTab('statutes-dashboard')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'statutes-dashboard'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Scale className="w-3.5 h-3.5 text-emerald-400" />
              <span>Statutes Dashboard</span>
            </button>

            <button
              id="nav-tab-enterprise-b2b"
              onClick={() => setActiveTab('enterprise-b2b')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'enterprise-b2b'
                  ? 'bg-emerald-600 text-white shadow-sm ring-1 ring-emerald-400'
                  : 'text-emerald-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Users className="w-3.5 h-3.5 text-emerald-400" />
              <span>Client Ledger & B2B</span>
            </button>

            <button
              id="nav-tab-chat"
              onClick={() => setActiveTab('chat')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'chat'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Legal AI Chat</span>
            </button>

            <button
              id="nav-tab-super-tax"
              onClick={() => setActiveTab('super-tax')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'super-tax'
                  ? 'bg-amber-600 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Super Tax (4C) & WHT</span>
            </button>

            <button
              id="nav-tab-property-tax"
              onClick={() => setActiveTab('property-tax')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'property-tax'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Building className="w-3.5 h-3.5 text-emerald-400" />
              <span>Property Tax (7E)</span>
            </button>

            <button
              id="nav-tab-provincial-tax"
              onClick={() => setActiveTab('provincial-tax')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'provincial-tax'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Globe className="w-3.5 h-3.5 text-indigo-400" />
              <span>Provincial PST</span>
            </button>

            <button
              id="nav-tab-sales-tax-engine"
              onClick={() => setActiveTab('sales-tax-engine')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'sales-tax-engine'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Scale className="w-3.5 h-3.5 text-emerald-400" />
              <span>Sales Tax 1990</span>
            </button>

            <button
              id="nav-tab-calculator"
              onClick={() => setActiveTab('calculator')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'calculator'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>Tax Calculator 2026</span>
            </button>

            <button
              id="nav-tab-notice"
              onClick={() => setActiveTab('notice')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'notice'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Notice Reply Drafter</span>
            </button>

            <button
              id="nav-tab-directory"
              onClick={() => setActiveTab('directory')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'directory'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              <span>Sales Tax & ATL</span>
            </button>

            <button
              id="nav-tab-analyzer"
              onClick={() => setActiveTab('analyzer')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'analyzer'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Document Audit</span>
            </button>

            <button
              id="nav-tab-admin-payments"
              onClick={() => setActiveTab('admin-payments')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'admin-payments'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-amber-300/80 hover:text-amber-200 hover:bg-slate-700/50'
              }`}
              title="Admin Payment Verification Ledger"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Admin Ledger</span>
            </button>

            <button
              id="nav-tab-pricing"
              onClick={() => setActiveTab('pricing')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'pricing'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Crown className="w-3.5 h-3.5 text-amber-400" />
              <span>Tiers & Plans</span>
            </button>

            <button
              id="nav-tab-architecture"
              onClick={() => setActiveTab('architecture')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'architecture'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
              }`}
              title="View Python FastAPI & Next.js Source Code"
            >
              <Code2 className="w-3.5 h-3.5 text-indigo-400" />
              <span>FastAPI Code</span>
            </button>
          </nav>

          {/* Right User Actions / Tier & Privacy Controls */}
          <div className="flex items-center gap-2.5">
            {/* Quick Screen Masking Toggle */}
            {onToggleMasking && (
              <button
                id="btn-nav-mask-toggle"
                onClick={onToggleMasking}
                className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition shadow-sm ${
                  isMasked
                    ? 'bg-amber-950/80 border-amber-500 text-amber-300 ring-1 ring-amber-500/50'
                    : 'bg-slate-800/80 border-slate-700/80 text-slate-400 hover:text-slate-200'
                }`}
                title={isMasked ? 'Screen Masking Active (Click to Unmask)' : 'Click to Mask Sensitive Client Metrics on Screen'}
              >
                {isMasked ? <EyeOff className="w-3.5 h-3.5 text-amber-400" /> : <Eye className="w-3.5 h-3.5" />}
                <span className="hidden xl:inline">{isMasked ? 'Masked' : 'Privacy'}</span>
              </button>
            )}

            {/* Privacy Manager Modal Trigger */}
            {onOpenPrivacyManager && (
              <button
                id="btn-nav-privacy-manager"
                onClick={onOpenPrivacyManager}
                className="p-1.5 text-slate-400 hover:text-emerald-400 hover:bg-slate-800/80 rounded-lg transition border border-transparent hover:border-slate-700"
                title="Client Privacy & Encrypted Local Storage Manager"
              >
                <Lock className="w-4 h-4" />
              </button>
            )}

            {user ? (
              <div className="flex items-center gap-3">
                <div 
                  onClick={onOpenTierModal}
                  className="hidden md:flex flex-col items-end cursor-pointer group p-1 rounded hover:bg-slate-800 transition"
                  title="Click to view/upgrade plan"
                >
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-medium text-slate-200 group-hover:text-emerald-400 transition">
                      {user.fullName}
                    </span>
                    {getTierBadge()}
                  </div>
                  <div className="text-[10px] text-slate-400 flex items-center gap-1">
                    <span>{getRoleLabel()}</span>
                    {user.subscriptionTier === 'free' && (
                      <span className="text-amber-400 font-semibold">
                        ({5 - user.queriesUsedToday} left today)
                      </span>
                    )}
                  </div>
                </div>

                <button
                  id="btn-signout"
                  onClick={onSignOut}
                  className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition"
                  title="Sign out / Switch user"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  id="btn-signin-nav"
                  onClick={() => onOpenAuth('signin')}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Sign In</span>
                </button>

                <button
                  id="btn-signup-nav"
                  onClick={() => onOpenAuth('signup')}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg shadow-sm transition"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Register</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation Row */}
        <div className="lg:hidden flex items-center justify-between overflow-x-auto py-2 space-x-2 scrollbar-none border-t border-slate-800">
          <button
            onClick={() => setActiveTab('enterprise-b2b')}
            className={`whitespace-nowrap px-2.5 py-1 text-xs font-semibold rounded-md ${activeTab === 'enterprise-b2b' ? 'bg-emerald-600 text-white' : 'text-emerald-300'}`}
          >
            Client Ledger
          </button>
          <button
            onClick={() => setActiveTab('chat')}
            className={`whitespace-nowrap px-2.5 py-1 text-xs font-medium rounded-md ${activeTab === 'chat' ? 'bg-emerald-600 text-white' : 'text-slate-300'}`}
          >
            Chat
          </button>

          <button
            onClick={() => setActiveTab('sales-tax-engine')}
            className={`whitespace-nowrap px-2.5 py-1 text-xs font-medium rounded-md ${activeTab === 'sales-tax-engine' ? 'bg-emerald-600 text-white' : 'text-slate-300'}`}
          >
            Sales Tax 1990
          </button>
          <button
            onClick={() => setActiveTab('calculator')}
            className={`whitespace-nowrap px-2.5 py-1 text-xs font-medium rounded-md ${activeTab === 'calculator' ? 'bg-emerald-600 text-white' : 'text-slate-300'}`}
          >
            Tax Calc
          </button>
          <button
            onClick={() => setActiveTab('notice')}
            className={`whitespace-nowrap px-2.5 py-1 text-xs font-medium rounded-md ${activeTab === 'notice' ? 'bg-emerald-600 text-white' : 'text-slate-300'}`}
          >
            Notice Reply
          </button>
          <button
            onClick={() => setActiveTab('directory')}
            className={`whitespace-nowrap px-2.5 py-1 text-xs font-medium rounded-md ${activeTab === 'directory' ? 'bg-emerald-600 text-white' : 'text-slate-300'}`}
          >
            Sales Tax & ATL
          </button>
          <button
            onClick={() => setActiveTab('analyzer')}
            className={`whitespace-nowrap px-2.5 py-1 text-xs font-medium rounded-md ${activeTab === 'analyzer' ? 'bg-emerald-600 text-white' : 'text-slate-300'}`}
          >
            Audit
          </button>
          <button
            onClick={() => setActiveTab('pricing')}
            className={`whitespace-nowrap px-2.5 py-1 text-xs font-medium rounded-md ${activeTab === 'pricing' ? 'bg-emerald-600 text-white' : 'text-slate-300'}`}
          >
            Tiers
          </button>
          <button
            onClick={() => setActiveTab('architecture')}
            className={`whitespace-nowrap px-2.5 py-1 text-xs font-medium rounded-md ${activeTab === 'architecture' ? 'bg-indigo-600 text-white' : 'text-slate-300'}`}
          >
            Code
          </button>
        </div>
      </div>
    </header>
  );
};
