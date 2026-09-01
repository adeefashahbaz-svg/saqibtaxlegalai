import React, { useState } from "react";
import {
  Scale,
  BookOpen,
  Gavel,
  BellRing,
  BookmarkCheck,
  Newspaper,
  CalendarDays,
  FileSpreadsheet,
  Calculator,
  FileCheck,
  MessageSquare,
  ExternalLink,
  ChevronRight,
  ChevronDown,
  PhoneCall,
  Video,
  Layers,
  Search,
  X,
  Crown,
  ShieldCheck,
  Receipt,
  Building,
  Globe,
  Zap,
  Users,
  Briefcase,
  ShieldAlert,
  FolderOpen,
  Folder,
  Tag,
  FileSearch,
  FileText,
  Sliders,
  Code2,
  Sparkles,
  CreditCard
} from "lucide-react";

export interface NavSubItem {
  id: string;
  label: string;
  tabKey: string;
  badge?: string;
  badgeColor?: string;
  description?: string;
  subStatutes?: string[];
}

export interface NavItem {
  id: string;
  label: string;
  tabKey: string;
  icon: React.ElementType;
  badge?: string;
  badgeColor?: string;
  description?: string;
  isExternal?: boolean;
  externalUrl?: string;
  isAccordion?: boolean;
  subItems?: NavSubItem[];
}

export interface NavCategory {
  category: string;
  items: NavItem[];
}

export const PORTAL_CATEGORIES: NavCategory[] = [
  {
    category: "Core Tax & Legal Tools",
    items: [
      {
        id: "core-chat",
        label: "Legal AI Advisory & Research",
        tabKey: "chat",
        icon: MessageSquare,
        badge: "AI Powered",
        badgeColor: "bg-emerald-950/90 text-emerald-300 border border-emerald-500",
        description: "Statutory citations & FBR jurisprudence query engine",
      },
      {
        id: "core-enterprise-b2b",
        label: "Compliance Vault & Client Ledger",
        tabKey: "enterprise-b2b",
        icon: Users,
        badge: "Enterprise",
        badgeColor: "bg-blue-950/90 text-blue-300 border border-blue-500",
        description: "Multi-client manager, Section 116 Wealth Recon & firm dossier",
      },
      {
        id: "core-calculator",
        label: "Advanced Tax Calculator",
        tabKey: "calculator",
        icon: Calculator,
        badge: "Finance Act 2026",
        badgeColor: "bg-emerald-950/90 text-emerald-300 border border-emerald-500",
        description: "Salary slabs, business tax, super tax & corporate withholding",
      },
      {
        id: "core-notice",
        label: "FBR Notice Drafter & Appeals",
        tabKey: "notice",
        icon: FileText,
        badge: "Drafting Suite",
        badgeColor: "bg-purple-950/90 text-purple-300 border border-purple-500",
        description: "Sec 122, 111, 177 & 161 automated notice replies & legal appeals",
      },
      {
        id: "core-analyzer",
        label: "Document Audit & Compliance Analyzer",
        tabKey: "analyzer",
        icon: FileSearch,
        badge: "Audit AI",
        badgeColor: "bg-amber-950/90 text-amber-300 border border-amber-500",
        description: "Scan FBR orders, show-cause notices & tax discrepancy matrices",
      },
      {
        id: "core-sales-tax-engine",
        label: "Sales Tax Act 1990 Interactive Engine",
        tabKey: "sales-tax-engine",
        icon: Receipt,
        badge: "STA 1990",
        badgeColor: "bg-emerald-950/90 text-emerald-300 border border-emerald-500",
        description: "Section 8B 90% input cap, Sched 3, 5, 6 & further tax engine",
      },
      {
        id: "core-directory",
        label: "Sales Tax & ATL Active Directory",
        tabKey: "directory",
        icon: FileSpreadsheet,
        badge: "ATL Lookup",
        badgeColor: "bg-cyan-950/90 text-cyan-300 border border-cyan-500",
        description: "HS Codes, SRO exemptions, provincial tariffs & ATL status rules",
      },
      {
        id: "core-pricing",
        label: "Subscription & Pricing Plans",
        tabKey: "pricing",
        icon: Crown,
        badge: "Pro & Enterprise",
        badgeColor: "bg-amber-950/90 text-amber-300 border border-amber-500",
        description: "Bank transfer verification, daily query allowances & team seats",
      },
    ],
  },
  {
    category: "Legal Repository & Jurisprudence",
    items: [
      {
        id: "master-statutes-index",
        label: "Statutes & Laws Master Index",
        tabKey: "master-statutes-index",
        icon: Scale,
        badge: "5 Categories",
        badgeColor: "bg-emerald-950/90 text-emerald-300 border border-emerald-500",
        description: "5 Primary Categories: Indirect, Levies, FTO Oversight, Benami/AML & FX",
        isAccordion: true,
        subItems: [
          {
            id: "sub-all-statutes",
            label: "All 5 Law Categories Index",
            tabKey: "master-statutes-index",
            badge: "All Laws",
            badgeColor: "bg-slate-800 text-slate-200 border border-slate-700",
            description: "Unified master index with section reference search & preview drawer",
          },
          {
            id: "sub-indirect-tax",
            label: "1. Core Indirect Taxation Laws",
            tabKey: "statutes-indirect",
            badge: "STA & FEA",
            badgeColor: "bg-emerald-950/90 text-emerald-300 border border-emerald-600",
            description: "Sales Tax Act 1990 & Rules 2006, Federal Excise Act 2005",
            subStatutes: ["STA 1990 (Sec 3, 8B, 73)", "FEA 2005 (Sec 3, 40C)"],
          },
          {
            id: "sub-sector-levies",
            label: "2. Specialized Sector Levies",
            tabKey: "statutes-sector-levies",
            badge: "Telecom & EVs",
            badgeColor: "bg-blue-950/90 text-blue-300 border border-blue-600",
            description: "Mobile Handset Levy (PTA DIRBS) & New Energy Vehicles (NEV) Act 2025",
            subStatutes: ["Mobile Handset Levy (DIRBS)", "NEV Adoption Act 2025"],
          },
          {
            id: "sub-taxpayer-oversight",
            label: "3. Taxpayer Oversight & Protection",
            tabKey: "statutes-taxpayer-oversight",
            badge: "FTO & FBR",
            badgeColor: "bg-amber-950/90 text-amber-300 border border-amber-600",
            description: "FTO Ordinance 2000, Ombudsmen Reforms 2013 & FBR Act 2007",
            subStatutes: ["FTO Ordinance 2000 (Maladministration)", "FBR Act 2007 (Jurisdiction)"],
          },
          {
            id: "sub-financial-integrity",
            label: "4. Financial Integrity & AML",
            tabKey: "statutes-financial-integrity",
            badge: "Benami & FATF",
            badgeColor: "bg-rose-950/90 text-rose-300 border border-rose-600",
            description: "Benami Transactions Prohibition Act 2017 & AML Act 2010 (FATF)",
            subStatutes: ["Benami Prohibition 2017", "AML Act 2010 (DNFBPs)"],
          },
          {
            id: "sub-foreign-exchange",
            label: "5. Foreign Exchange & Economic",
            tabKey: "statutes-foreign-exchange",
            badge: "PERA & FCY",
            badgeColor: "bg-purple-950/90 text-purple-300 border border-purple-600",
            description: "Protection of Economic Reforms Act 1992 & FCY Accounts Rules 2020",
            subStatutes: ["PERA 1992 (Sec 111(4))", "FCY Rules 2020 (RDA/CRS)"],
          },
        ],
      },
      {
        id: "tax-legislation",
        label: "Income Tax & Direct Tax Acts",
        tabKey: "tax-legislation",
        icon: BookOpen,
        badge: "Income Tax",
        badgeColor: "bg-emerald-950/90 text-emerald-300 border border-emerald-600",
        description: "Codified Income Tax, ATIR, Amnesty, CRS & Digital Tax Acts",
      },
      {
        id: "statutes-dashboard",
        label: "Statutes & Rules Master Dashboard",
        tabKey: "statutes-dashboard",
        icon: Scale,
        badge: "Tax Acts",
        badgeColor: "bg-emerald-950/90 text-emerald-300 border border-emerald-600",
        description: "Interactive dashboard of all 15+ Tax Acts, WWF 1971, ADA, & Rules",
      },
      {
        id: "case-laws",
        label: "Case Laws & Archive",
        tabKey: "portal-case-laws",
        icon: Gavel,
        badge: "Old vs Current",
        badgeColor: "bg-amber-950/80 text-amber-300 border border-amber-800",
        description: "High Court & Supreme Court tax precedents",
      },
      {
        id: "statutes",
        label: "Statutes Database",
        tabKey: "portal-statutes",
        icon: BookOpen,
        badge: "ITO & STA",
        badgeColor: "bg-emerald-950/80 text-emerald-300 border border-emerald-800",
        description: "ITO 2001, STA 1990 & Provincial Acts",
      },
      {
        id: "notifications",
        label: "Notifications & SROs",
        tabKey: "portal-notifications",
        icon: BellRing,
        badge: "FBR Tracker",
        badgeColor: "bg-blue-950/80 text-blue-300 border border-blue-800",
        description: "Statutory Regulatory Orders & Circulars",
      },
      {
        id: "updated-laws",
        label: "Updated Laws",
        tabKey: "portal-updated-laws",
        icon: BookmarkCheck,
        badge: "Live Amendments",
        badgeColor: "bg-indigo-950/80 text-indigo-300 border border-indigo-800",
        description: "Real-time amended clauses & sections",
      },
      {
        id: "dictionary",
        label: "Legal Dictionary",
        tabKey: "portal-dictionary",
        icon: Layers,
        badge: "Glossary",
        badgeColor: "bg-slate-800 text-slate-300 border border-slate-700",
        description: "Glossary of Pakistani legal & tax terminology",
      },
    ],
  },
  {
    category: "Regulatory & Tariffs",
    items: [
      {
        id: "tax-news",
        label: "Tax News & Policy",
        tabKey: "portal-tax-news",
        icon: Newspaper,
        badge: "Latest",
        badgeColor: "bg-rose-950/80 text-rose-300 border border-rose-800",
        description: "FBR press releases & appellate alerts",
      },
      {
        id: "finance-act",
        label: "Finance Act Archive",
        tabKey: "portal-finance-act",
        icon: CalendarDays,
        badge: "2024-2026",
        badgeColor: "bg-teal-950/80 text-teal-300 border border-teal-800",
        description: "Year-wise Finance Bills & Acts",
      },
      {
        id: "custom-tariff",
        label: "Custom Tariff (HS Codes)",
        tabKey: "portal-custom-tariff",
        icon: FileSpreadsheet,
        badge: "HS Search",
        badgeColor: "bg-cyan-950/80 text-cyan-300 border border-cyan-800",
        description: "HS Codes, CD, RD, ACD & import tax tables",
      },
    ],
  },
  {
    category: "Law Practice & B2B SaaS",
    items: [
      {
        id: "enterprise-b2b",
        label: "Client Ledger & Firm Dossiers",
        tabKey: "enterprise-b2b",
        icon: Users,
        badge: "B2B SaaS",
        badgeColor: "bg-emerald-950/90 text-emerald-300 border border-emerald-500",
        description: "Multi-client manager, Section 116 Wealth Recon, firm branding & billing",
      },
    ],
  },
  {
    category: "Tax Computation & Compliance",
    items: [
      {
        id: "super-tax-engine",
        label: "Super Tax (4C) & WHT Finder",
        tabKey: "super-tax",
        icon: Zap,
        badge: "Sec 4C & WHT",
        badgeColor: "bg-amber-950/90 text-amber-300 border border-amber-500",
        description: "Section 4C Super Tax (1%-10%) & Interactive WHT Rate Finder",
      },
      {
        id: "property-tax-suite",
        label: "Property & Real Estate Tax",
        tabKey: "property-tax",
        icon: Building,
        badge: "Sec 7E & 236",
        badgeColor: "bg-emerald-950/90 text-emerald-300 border border-emerald-500",
        description: "Sec 7E Deemed Tax, 236K/236C Advance Tax & Sec 37(1A) CGT",
      },
      {
        id: "provincial-tax-suite",
        label: "Provincial Services Tax (PST)",
        tabKey: "provincial-tax",
        icon: Globe,
        badge: "PRA & SRB",
        badgeColor: "bg-indigo-950/90 text-indigo-300 border border-indigo-500",
        description: "PRA 16%, SRB 15%, KPRA, BRA, ICT rates & withholding rules",
      },
      {
        id: "sales-tax-suite",
        label: "Sales Tax & FED Suite",
        tabKey: "sales-tax-calculator",
        icon: Receipt,
        badge: "18% & PST",
        badgeColor: "bg-emerald-950/90 text-emerald-300 border border-emerald-500",
        description: "STA 1990, PRA/SRB, 3% Further Tax & Sec 8B 90% input cap",
      },
      {
        id: "tax-compliance-suite",
        label: "Compliance & WHT Matrix",
        tabKey: "tax-compliance-suite",
        icon: Scale,
        badge: "New Suite",
        badgeColor: "bg-emerald-950/90 text-emerald-300 border border-emerald-500",
        description: "Filer vs Non-Filer WHT matrix, Sec 60 Allowances & FBR Calendar",
      },
      {
        id: "tax-rates",
        label: "Tax Rates & Slabs",
        tabKey: "portal-tax-rates",
        icon: Calculator,
        badge: "2025/26 Slabs",
        badgeColor: "bg-emerald-950/80 text-emerald-300 border border-emerald-800",
        description: "Salary slabs, turnover tax & WHT finder",
      },
      {
        id: "returns-assistant",
        label: "Tax Returns Assistant",
        tabKey: "portal-returns-assistant",
        icon: FileCheck,
        badge: "Iris 2.0",
        badgeColor: "bg-purple-950/80 text-purple-300 border border-purple-800",
        description: "Step-by-step annual return filing helper",
      },
    ],
  },
  {
    category: "Admin & Verification",
    items: [
      {
        id: "admin-payments",
        label: "Admin Bank Verification",
        tabKey: "admin-payments",
        icon: ShieldCheck,
        badge: "Ledger Desk",
        badgeColor: "bg-amber-950/90 text-amber-300 border border-amber-600",
        description: "Verify TRX IDs & approve Pro / Enterprise tiers",
      },
    ],
  },
  {
    category: "Live AI & Support Channels",
    items: [
      {
        id: "chat",
        label: "Legal AI Live Chat",
        tabKey: "chat",
        icon: MessageSquare,
        badge: "24/7 Engine",
        badgeColor: "bg-emerald-600/30 text-emerald-300 border border-emerald-500/50",
        description: "Instant FBR legal advice & citation generator",
      },
      {
        id: "whatsapp",
        label: "WhatsApp Tax Support",
        tabKey: "whatsapp",
        icon: PhoneCall,
        badge: "+92 300 1234567",
        badgeColor: "bg-green-950/80 text-green-300 border border-green-800",
        description: "Direct advocate escalation desk",
        isExternal: true,
        externalUrl: "https://wa.me/923001234567?text=Assalamu%20Alaikum,%20I%20need%20tax%20advisory%20support%20from%20SaqibTax%20Legal%20AI",
      },
      {
        id: "youtube",
        label: "YouTube Tax Tutorials",
        tabKey: "youtube",
        icon: Video,
        badge: "Masterclasses",
        badgeColor: "bg-red-950/80 text-red-300 border border-red-800",
        description: "FBR filing & legal commentary videos",
        isExternal: true,
        externalUrl: "https://www.youtube.com/@SaqibTaxLegalAI",
      },
    ],
  },
];

interface SidebarProps {
  activeTab: string;
  onSelectTab: (tabKey: string) => void;
  onOpenPricing?: () => void;
  onCloseMobile?: () => void;
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  onOpenPricing,
  onCloseMobile,
  className = "",
}) => {
  const [filterQuery, setFilterQuery] = useState("");
  // Accordion state for Master Statutes Index (open by default if active or user toggles)
  const [masterIndexExpanded, setMasterIndexExpanded] = useState<boolean>(true);

  const handleSelect = (tabKey: string) => {
    onSelectTab(tabKey);
    if (onCloseMobile) {
      onCloseMobile();
    }
  };

  const handlePricing = () => {
    if (onOpenPricing) onOpenPricing();
    if (onCloseMobile) onCloseMobile();
  };

  const isMasterStatutesTabActive =
    activeTab === "master-statutes-index" ||
    activeTab === "statutes-indirect" ||
    activeTab === "statutes-sector-levies" ||
    activeTab === "statutes-taxpayer-oversight" ||
    activeTab === "statutes-financial-integrity" ||
    activeTab === "statutes-foreign-exchange";

  const filteredCategories = PORTAL_CATEGORIES.map((cat) => {
    const matchedItems = cat.items.filter((item) => {
      const mainMatch =
        item.label.toLowerCase().includes(filterQuery.toLowerCase()) ||
        (item.description && item.description.toLowerCase().includes(filterQuery.toLowerCase())) ||
        (item.badge && item.badge.toLowerCase().includes(filterQuery.toLowerCase()));

      const subMatch = item.subItems?.some(
        (sub) =>
          sub.label.toLowerCase().includes(filterQuery.toLowerCase()) ||
          (sub.description && sub.description.toLowerCase().includes(filterQuery.toLowerCase())) ||
          (sub.badge && sub.badge.toLowerCase().includes(filterQuery.toLowerCase())) ||
          sub.subStatutes?.some((st) => st.toLowerCase().includes(filterQuery.toLowerCase()))
      );

      return mainMatch || subMatch;
    });
    return { ...cat, items: matchedItems };
  }).filter((cat) => cat.items.length > 0);

  return (
    <aside
      id="saqibtax-app-sidebar"
      className={`w-72 sm:w-80 bg-slate-950 text-slate-200 border-r border-slate-800/80 flex flex-col shrink-0 select-none ${className}`}
    >
      {/* Brand Header */}
      <div className="p-4 border-b border-slate-800/80 bg-slate-900/60">
        <div className="flex items-center justify-between gap-2">
          <button
            onClick={() => handleSelect("chat")}
            className="flex items-center gap-3 group text-left flex-1 min-w-0"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white shadow-md shadow-emerald-950/50 border border-emerald-400/30 group-hover:scale-105 transition shrink-0">
              <Scale className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-sm tracking-tight text-white">SaqibTax</span>
                <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-700">
                  PORTAL
                </span>
              </div>
              <p className="text-[10px] text-slate-400 truncate">Pakistan Legal & FBR Suite</p>
            </div>
          </button>

          {/* Mobile Drawer Close Button */}
          {onCloseMobile && (
            <button
              id="btn-close-mobile-sidebar"
              onClick={onCloseMobile}
              className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition shrink-0"
              title="Close navigation menu"
              aria-label="Close navigation"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Search filter in Sidebar */}
        <div className="mt-3 relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            placeholder="Search portal & statutes..."
            className="w-full pl-8 pr-8 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 transition"
          />
          {filterQuery && (
            <button
              onClick={() => setFilterQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Navigation Sections */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-5 scrollbar-thin scrollbar-thumb-slate-800">
        {filteredCategories.map((cat, idx) => (
          <div key={idx} className="space-y-1.5">
            <div className="px-2 text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center justify-between">
              <span>{cat.category}</span>
              <span className="text-[9px] text-slate-600 font-mono">({cat.items.length})</span>
            </div>

            <div className="space-y-1">
              {cat.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.tabKey || (item.id === "chat" && activeTab === "chat");

                if (item.isExternal && item.externalUrl) {
                  return (
                    <a
                      key={item.id}
                      href={item.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-start gap-2.5 px-2.5 py-2 rounded-xl text-xs text-slate-300 hover:text-white hover:bg-slate-900/80 border border-transparent transition-all"
                    >
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 bg-slate-900 border border-slate-800 text-slate-400 group-hover:text-emerald-300 group-hover:border-slate-700 transition">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <span className="font-semibold truncate text-[11px]">{item.label}</span>
                          <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-slate-300 shrink-0" />
                        </div>
                        {item.description && (
                          <p className="text-[10px] text-slate-400 truncate mt-0.5">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </a>
                  );
                }

                // If accordion item (Statutes & Laws Master Index)
                if (item.isAccordion && item.subItems) {
                  const isParentActive = isMasterStatutesTabActive;

                  return (
                    <div key={item.id} className="space-y-1 rounded-xl bg-slate-900/40 p-1 border border-slate-800/60">
                      <div
                        className={`w-full group flex items-center justify-between gap-2 px-2 py-2 rounded-lg text-xs text-left transition-all ${
                          isParentActive
                            ? "bg-slate-900 text-white font-bold border border-emerald-600/40"
                            : "text-slate-300 hover:text-white hover:bg-slate-900/80"
                        }`}
                      >
                        <button
                          onClick={() => handleSelect(item.tabKey)}
                          className="flex items-center gap-2 flex-1 min-w-0 text-left cursor-pointer"
                        >
                          <div
                            className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 transition ${
                              isParentActive
                                ? "bg-emerald-600 text-white"
                                : "bg-slate-800 text-slate-400 group-hover:text-emerald-300"
                            }`}
                          >
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="font-bold truncate text-[11.5px] block text-emerald-300">
                              {item.label}
                            </span>
                          </div>
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setMasterIndexExpanded(!masterIndexExpanded);
                          }}
                          className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
                          title="Toggle Categories"
                        >
                          {masterIndexExpanded ? (
                            <ChevronDown className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                          )}
                        </button>
                      </div>

                      {/* Expandable Sub-Categories Accordion */}
                      {masterIndexExpanded && (
                        <div className="pl-3 pr-1 py-1 space-y-1 border-l-2 border-slate-800 ml-3 animate-fade-in">
                          {item.subItems.map((sub) => {
                            const isSubActive = activeTab === sub.tabKey;
                            return (
                              <button
                                key={sub.id}
                                onClick={() => handleSelect(sub.tabKey)}
                                className={`w-full group text-left px-2 py-2 rounded-lg text-[11px] transition-all flex flex-col space-y-0.5 cursor-pointer ${
                                  isSubActive
                                    ? "bg-emerald-950/90 text-emerald-200 border border-emerald-600/60 font-semibold"
                                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/90"
                                }`}
                              >
                                <div className="flex items-center justify-between gap-1 w-full">
                                  <span className={`truncate ${isSubActive ? "text-emerald-200 font-bold" : ""}`}>
                                    {sub.label}
                                  </span>
                                  {sub.badge && (
                                    <span className={`text-[8.5px] px-1 py-0.2 rounded font-mono ${sub.badgeColor || "bg-slate-800 text-slate-300"}`}>
                                      {sub.badge}
                                    </span>
                                  )}
                                </div>
                                {sub.description && (
                                  <p className="text-[9.5px] text-slate-500 truncate group-hover:text-slate-400">
                                    {sub.description}
                                  </p>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelect(item.tabKey)}
                    className={`w-full group flex items-start gap-2.5 px-2.5 py-2.5 rounded-xl text-xs text-left transition-all cursor-pointer ${
                      isActive
                        ? "bg-gradient-to-r from-emerald-950/90 to-slate-900 border border-emerald-600/50 text-white shadow-sm"
                        : "text-slate-300 hover:text-white hover:bg-slate-900/80 border border-transparent"
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition ${
                        isActive
                          ? "bg-emerald-600 text-white"
                          : "bg-slate-900 border border-slate-800 text-slate-400 group-hover:text-emerald-300 group-hover:border-slate-700"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className={`font-semibold truncate text-[11px] ${isActive ? "text-emerald-200" : ""}`}>
                          {item.label}
                        </span>
                        {item.badge && (
                          <span
                            className={`text-[9px] px-1.5 py-0.2 rounded font-medium shrink-0 ${
                              item.badgeColor || "bg-slate-800 text-slate-300"
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </div>
                      {item.description && (
                        <p className="text-[10px] text-slate-400 truncate mt-0.5">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Upgrade Banner */}
      <div className="p-3 border-t border-slate-800/80 bg-slate-900/80 space-y-2">
        <button
          onClick={handlePricing}
          className="w-full flex items-center justify-between p-2.5 rounded-xl bg-gradient-to-r from-amber-950/60 to-emerald-950/60 border border-amber-600/40 hover:border-amber-500/70 transition group text-left cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
              <Crown className="w-3.5 h-3.5" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-amber-200 group-hover:text-amber-100">Upgrade to Pro</p>
              <p className="text-[9px] text-slate-400">Bank Transfer / JazzCash</p>
            </div>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-amber-400 group-hover:translate-x-0.5 transition" />
        </button>

        <div className="flex items-center justify-between text-[10px] text-slate-400 px-1 pt-1">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>FBR Portal Online</span>
          </div>
          <span className="font-mono text-[9px] text-slate-400">v2.5.0</span>
        </div>
      </div>
    </aside>
  );
};
