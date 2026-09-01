import React, { useState } from 'react';
import { 
  Scale, 
  Search, 
  Crown, 
  LogOut, 
  LogIn, 
  UserPlus, 
  Zap,
  Lock,
  Eye,
  EyeOff,
  Menu,
  X,
  Sparkles,
  ArrowRight,
  ShieldCheck
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
  mobileSidebarOpen?: boolean;
  onToggleMobileSidebar?: () => void;
  isAdminUnlocked?: boolean;
  onExitAdmin?: () => void;
}

const SEARCH_QUICK_ACTIONS = [
  { label: 'Legal AI Advisory Chat', tab: 'chat', category: 'AI Tools' },
  { label: 'Client Ledger & Compliance Vault', tab: 'enterprise-b2b', category: 'B2B Suite' },
  { label: 'Income Tax Calculator (Finance Act 2026)', tab: 'calculator', category: 'Calculators' },
  { label: 'Super Tax (Section 4C) & WHT Finder', tab: 'super-tax', category: 'Calculators' },
  { label: 'Sales Tax Act 1990 Interactive Engine', tab: 'sales-tax-engine', category: 'Indirect Tax' },
  { label: 'Statutes & Laws Master Index', tab: 'master-statutes-index', category: 'Statutes' },
  { label: 'Section 7E Property Tax Calculator', tab: 'property-tax', category: 'Property' },
  { label: 'Provincial Sales Tax (PRA/SRB/KPRA/BRA)', tab: 'provincial-tax', category: 'Indirect Tax' },
  { label: 'FBR Show-Cause Notice Drafter', tab: 'notice', category: 'Legal Suite' },
  { label: 'Document Audit & Discrepancy Matrix', tab: 'analyzer', category: 'Audit' },
  { label: 'Active Taxpayers List (ATL) Lookup', tab: 'directory', category: 'Directories' },
];

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
  onOpenLegalNotice,
  mobileSidebarOpen = false,
  onToggleMobileSidebar,
  isAdminUnlocked = false,
  onExitAdmin,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const getTierBadge = () => {
    if (!user) return null;
    const tier = user.subscriptionTier;
    if (tier === 'enterprise') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-950/80 text-amber-300 border border-amber-500/50 shadow-xs">
          <Crown className="w-3 h-3 text-amber-400" /> Enterprise
        </span>
      );
    }
    if (tier === 'pro') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-500/50 shadow-xs">
          <Zap className="w-3 h-3 text-emerald-400" /> Pro Plan
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700">
        Free Tier
      </span>
    );
  };

  const getRoleLabel = () => {
    if (!user) return '';
    if (user.role === 'tax_consultant') return 'Advocate / Consultant';
    if (user.role === 'corporate_client') return 'Corporate Client';
    if (user.role === 'admin') return 'System Administrator';
    return 'Individual Taxpayer';
  };

  const filteredSearchResults = searchQuery.trim()
    ? SEARCH_QUICK_ACTIONS.filter(item => 
        item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tab.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : SEARCH_QUICK_ACTIONS.slice(0, 6);

  const handleSelectSearchResult = (tabKey: string) => {
    setActiveTab(tabKey);
    setSearchQuery('');
    setIsSearchOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 text-white border-b border-slate-800 shadow-md backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3 sm:gap-6">
          
          {/* Left: Mobile Hamburger & Logo / Brand */}
          <div className="flex items-center gap-2.5 sm:gap-3.5 shrink-0">
            {/* Hamburger Button for Mobile Drawer */}
            <button
              id="btn-mobile-hamburger"
              onClick={onToggleMobileSidebar}
              className="lg:hidden p-2 min-h-[44px] min-w-[44px] flex items-center gap-1.5 justify-center rounded-xl bg-slate-800 text-slate-200 hover:text-white hover:bg-slate-700 active:bg-slate-600 border border-slate-700 shadow-sm transition cursor-pointer"
              title={mobileSidebarOpen ? "Close navigation menu" : "Open full navigation menu (☰)"}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileSidebarOpen}
            >
              {mobileSidebarOpen ? (
                <X className="w-5 h-5 text-emerald-400" />
              ) : (
                <Menu className="w-5 h-5 text-emerald-400" />
              )}
              <span className="text-[11px] font-bold tracking-tight text-slate-300 hidden xs:inline">Menu</span>
            </button>

            {/* Logo & Brand */}
            <div 
              className="flex items-center gap-2.5 cursor-pointer select-none group" 
              onClick={() => setActiveTab('chat')}
              title="Return to SaqibTax Legal AI Advisory"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center shadow-lg shadow-emerald-950/50 border border-emerald-400/40 shrink-0 group-hover:scale-105 transition-transform">
                <Scale className="w-5 h-5 text-white" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-black text-base sm:text-lg tracking-tight text-white flex items-center gap-1">
                    SaqibTax <span className="text-emerald-400 font-extrabold text-[10px] sm:text-xs px-1.5 py-0.5 rounded bg-emerald-950/90 border border-emerald-800/80">LEGAL AI</span>
                  </span>
                </div>
                <p className="text-[10px] sm:text-[11px] text-slate-400 hidden sm:block truncate">Pakistan Tax Advisory & Statutory Intelligence</p>
              </div>
            </div>
          </div>

          {/* Center: Interactive Global Search Bar */}
          <div className="flex-1 max-w-lg relative">
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
              <input
                id="global-portal-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchOpen(true)}
                placeholder="Search laws, sections, rulings, calculators..."
                className="w-full bg-slate-950/80 hover:bg-slate-950 focus:bg-slate-950 text-xs sm:text-sm text-slate-200 placeholder-slate-500 pl-10 pr-16 py-2 rounded-xl border border-slate-700/80 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-hidden transition shadow-inner"
              />
              <span className="hidden sm:inline-block absolute right-3 px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-slate-800 rounded border border-slate-700 select-none">
                ⌘K
              </span>
            </div>

            {/* Quick Search Autocomplete Dropdown */}
            {isSearchOpen && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setIsSearchOpen(false)} 
                />
                <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900 border border-slate-700/90 rounded-2xl shadow-2xl z-50 overflow-hidden max-h-80 overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="p-2 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between text-[11px] text-slate-400 px-3">
                    <span className="font-semibold uppercase tracking-wider text-slate-400">Quick Navigation & Tools</span>
                    <span>{filteredSearchResults.length} Results</span>
                  </div>
                  <div className="p-1 space-y-0.5">
                    {filteredSearchResults.length > 0 ? (
                      filteredSearchResults.map((item) => (
                        <button
                          key={item.tab}
                          onClick={() => handleSelectSearchResult(item.tab)}
                          className="w-full flex items-center justify-between px-3 py-2 text-left rounded-xl hover:bg-slate-800 text-xs text-slate-200 hover:text-white transition group"
                        >
                          <div className="flex items-center gap-2">
                            <span className="px-1.5 py-0.5 text-[10px] font-bold rounded bg-slate-800 text-emerald-400 border border-slate-700 group-hover:border-emerald-500/50">
                              {item.category}
                            </span>
                            <span className="font-medium text-slate-200 group-hover:text-emerald-300">{item.label}</span>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400 transition-transform group-hover:translate-x-0.5" />
                        </button>
                      ))
                    ) : (
                      <div className="p-4 text-center text-xs text-slate-400">
                        No matches found. Press Enter to search in Legal AI Chat.
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Right: User Profile, Privacy & Admin Badge */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Quick Screen Masking Toggle */}
            {onToggleMasking && (
              <button
                id="btn-nav-mask-toggle"
                onClick={onToggleMasking}
                className={`hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold border transition shadow-xs ${
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
                className="p-2 text-slate-400 hover:text-emerald-400 hover:bg-slate-800 rounded-xl transition border border-transparent hover:border-slate-700 hidden sm:flex"
                title="Client Privacy & Encrypted Local Storage Manager"
              >
                <Lock className="w-4 h-4" />
              </button>
            )}

            {/* Host / Admin Desk Shortcut (Only visible when Host Mode is unlocked) */}
            {isAdminUnlocked && (
              <div className="flex items-center gap-1.5">
                <button
                  id="btn-nav-admin-badge"
                  onClick={() => setActiveTab('admin-payments')}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold transition shadow-xs ${
                    activeTab === 'admin-payments'
                      ? 'bg-amber-600 text-white shadow-md'
                      : 'bg-amber-950/80 text-amber-300 border border-amber-500/50 hover:bg-amber-900/60'
                  }`}
                  title="Host Administration Desk"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden sm:inline">Host Desk</span>
                </button>
                {onExitAdmin && (
                  <button
                    onClick={onExitAdmin}
                    className="p-1.5 text-[10px] text-slate-400 hover:text-rose-300 hover:bg-slate-800 rounded-lg transition"
                    title="Lock Host Session"
                  >
                    Lock
                  </button>
                )}
              </div>
            )}

            {user ? (
              <div className="flex items-center gap-2 sm:gap-3">
                <div 
                  onClick={onOpenTierModal}
                  className="flex flex-col items-end cursor-pointer group p-1 rounded-xl hover:bg-slate-800 transition"
                  title="Click to view/upgrade plan"
                >
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-slate-200 group-hover:text-emerald-400 transition hidden sm:inline truncate max-w-[120px]">
                      {user.fullName}
                    </span>
                    {getTierBadge()}
                  </div>
                  <div className="text-[10px] text-slate-400 hidden md:flex items-center gap-1">
                    <span>{getRoleLabel()}</span>
                    {user.subscriptionTier === 'free' && (
                      <span className="text-amber-400 font-bold">
                        ({5 - user.queriesUsedToday} left)
                      </span>
                    )}
                  </div>
                </div>

                <button
                  id="btn-signout"
                  onClick={onSignOut}
                  className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition"
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
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl transition"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Sign In</span>
                </button>

                <button
                  id="btn-signup-nav"
                  onClick={() => onOpenAuth('signup')}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl shadow-md transition"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Register</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

