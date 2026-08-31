"use client";

import React, { useState } from "react";
import {
  Scale,
  BookOpen,
  Gavel,
  BellRing,
  Sparkles,
  BookmarkCheck,
  Newspaper,
  CalendarDays,
  FileSpreadsheet,
  Calculator,
  FileCheck,
  MessageSquare,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  PhoneCall,
  Video,
  Layers,
  Search,
  Filter,
  X,
  Menu,
  Crown
} from "lucide-react";

export interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
  badgeColor?: string;
  description?: string;
  isExternal?: boolean;
}

export interface NavCategory {
  category: string;
  items: NavItem[];
}

export const SIDEBAR_MENU_CATEGORIES: NavCategory[] = [
  {
    category: "Legal Repository & Jurisprudence",
    items: [
      {
        id: "case-laws",
        label: "Case Laws & Archive",
        href: "/dashboard/case-laws",
        icon: Gavel,
        badge: "Old vs Current",
        badgeColor: "bg-amber-950/80 text-amber-300 border border-amber-800",
        description: "High Court & Supreme Court tax precedents",
      },
      {
        id: "statutes",
        label: "Statutes Database",
        href: "/dashboard/statutes",
        icon: BookOpen,
        badge: "ITO & STA",
        badgeColor: "bg-emerald-950/80 text-emerald-300 border border-emerald-800",
        description: "ITO 2001, STA 1990 & Provincial Acts",
      },
      {
        id: "notifications",
        label: "Notifications & SROs",
        href: "/dashboard/notifications",
        icon: BellRing,
        badge: "FBR Tracker",
        badgeColor: "bg-blue-950/80 text-blue-300 border border-blue-800",
        description: "Statutory Regulatory Orders & Circulars",
      },
      {
        id: "updated-laws",
        label: "Updated Laws",
        href: "/dashboard/updated-laws",
        icon: BookmarkCheck,
        badge: "Live Amendments",
        badgeColor: "bg-indigo-950/80 text-indigo-300 border border-indigo-800",
        description: "Real-time amended clauses & sections",
      },
      {
        id: "dictionary",
        label: "Legal Dictionary",
        href: "/dashboard/dictionary",
        icon: Layers,
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
        href: "/dashboard/news",
        icon: Newspaper,
        badge: "Latest",
        badgeColor: "bg-rose-950/80 text-rose-300 border border-rose-800",
        description: "FBR press releases & appellate alerts",
      },
      {
        id: "finance-act",
        label: "Finance Act Archive",
        href: "/dashboard/finance-act",
        icon: CalendarDays,
        badge: "2024-2026",
        badgeColor: "bg-teal-950/80 text-teal-300 border border-teal-800",
        description: "Year-wise Finance Bills & Acts",
      },
      {
        id: "custom-tariff",
        label: "Custom Tariff (HS Codes)",
        href: "/dashboard/custom-tariff",
        icon: FileSpreadsheet,
        description: "HS Codes, CD, RD, ACD & import tax tables",
      },
    ],
  },
  {
    category: "Tax Computation & Compliance",
    items: [
      {
        id: "tax-rates",
        label: "Tax Rates & Calculators",
        href: "/dashboard/tax-rates",
        icon: Calculator,
        badge: "2025/26 Slabs",
        badgeColor: "bg-emerald-950/80 text-emerald-300 border border-emerald-800",
        description: "Salary slabs, turnover tax & WHT finder",
      },
      {
        id: "returns-assistant",
        label: "Tax Returns Assistant",
        href: "/dashboard/returns-assistant",
        icon: FileCheck,
        badge: "Iris 2.0 Guide",
        badgeColor: "bg-purple-950/80 text-purple-300 border border-purple-800",
        description: "Step-by-step annual return filing helper",
      },
    ],
  },
  {
    category: "Live AI & Support Channels",
    items: [
      {
        id: "chat",
        label: "Legal AI Live Chat",
        href: "/dashboard/chat",
        icon: MessageSquare,
        badge: "24/7 Engine",
        badgeColor: "bg-emerald-600/30 text-emerald-300 border border-emerald-500/50",
        description: "Instant FBR legal advice & citation generator",
      },
      {
        id: "whatsapp",
        label: "WhatsApp Tax Support",
        href: "https://wa.me/923001234567?text=Assalamu%20Alaikum,%20I%20need%20tax%20advisory%20support%20from%20SaqibTax",
        icon: PhoneCall,
        badge: "+92 300 1234567",
        badgeColor: "bg-green-950/80 text-green-300 border border-green-800",
        description: "Direct advocate escalation desk",
        isExternal: true,
      },
      {
        id: "youtube",
        label: "YouTube Tax Tutorials",
        href: "https://www.youtube.com/@SaqibTaxLegalAI",
        icon: Video,
        badge: "Video Guides",
        badgeColor: "bg-red-950/80 text-red-300 border border-red-800",
        description: "FBR filing & legal commentary masterclasses",
        isExternal: true,
      },
    ],
  },
];

interface SidebarProps {
  currentPath?: string;
  activeItemId?: string;
  onSelectItem?: (itemId: string, href: string) => void;
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentPath = "/dashboard/chat",
  activeItemId,
  onSelectItem,
  className = "",
}) => {
  const [filterQuery, setFilterQuery] = useState("");

  const filteredCategories = SIDEBAR_MENU_CATEGORIES.map((cat) => {
    const matchedItems = cat.items.filter(
      (item) =>
        item.label.toLowerCase().includes(filterQuery.toLowerCase()) ||
        (item.description && item.description.toLowerCase().includes(filterQuery.toLowerCase())) ||
        (item.badge && item.badge.toLowerCase().includes(filterQuery.toLowerCase()))
    );
    return { ...cat, items: matchedItems };
  }).filter((cat) => cat.items.length > 0);

  const handleItemClick = (e: React.MouseEvent, item: NavItem) => {
    if (item.isExternal) return;
    if (onSelectItem) {
      e.preventDefault();
      onSelectItem(item.id, item.href);
    }
  };

  return (
    <aside
      id="saqibtax-sidebar-portal"
      className={`w-72 bg-slate-950 text-slate-200 border-r border-slate-800/80 flex flex-col shrink-0 select-none ${className}`}
    >
      {/* Brand Header / Portal Title */}
      <div className="p-4 border-b border-slate-800/80 bg-slate-900/60">
        <a href="/dashboard/chat" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white shadow-md shadow-emerald-950/50 border border-emerald-400/30 group-hover:scale-105 transition">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-sm tracking-tight text-white">SaqibTax</span>
              <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-700">
                PORTAL
              </span>
            </div>
            <p className="text-[10px] text-slate-400">Pakistan Legal & FBR Suite</p>
          </div>
        </a>

        {/* Quick Filter Search in Sidebar */}
        <div className="mt-3 relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            placeholder="Search portal modules..."
            className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 transition"
          />
          {filterQuery && (
            <button
              onClick={() => setFilterQuery("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* Navigation Sections Scrollable Area */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6 scrollbar-thin scrollbar-thumb-slate-800">
        {filteredCategories.map((cat, idx) => (
          <div key={idx} className="space-y-1.5">
            <div className="px-2 text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center justify-between">
              <span>{cat.category}</span>
              <span className="text-[9px] text-slate-600 font-mono">({cat.items.length})</span>
            </div>

            <div className="space-y-1">
              {cat.items.map((item) => {
                const Icon = item.icon;
                const isActive =
                  activeItemId === item.id ||
                  currentPath === item.href ||
                  (item.id === "chat" && currentPath === "/dashboard/chat") ||
                  (item.id === "statutes" && currentPath === "/dashboard/statutes");

                return (
                  <a
                    key={item.id}
                    href={item.href}
                    target={item.isExternal ? "_blank" : undefined}
                    rel={item.isExternal ? "noopener noreferrer" : undefined}
                    onClick={(e) => handleItemClick(e, item)}
                    className={`group flex items-start gap-2.5 px-2.5 py-2 rounded-xl text-xs transition-all ${
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
                        {item.isExternal && (
                          <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-slate-300 shrink-0" />
                        )}
                      </div>
                      {item.description && (
                        <p className="text-[10px] text-slate-400 truncate mt-0.5">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Upgrade / Account Footer Banner */}
      <div className="p-3 border-t border-slate-800/80 bg-slate-900/80 space-y-2">
        <a
          href="/pricing"
          className="flex items-center justify-between p-2.5 rounded-xl bg-gradient-to-r from-amber-950/60 to-emerald-950/60 border border-amber-600/40 hover:border-amber-500/70 transition group"
        >
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
              <Crown className="w-3.5 h-3.5" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-amber-200 group-hover:text-amber-100">Upgrade to Pro</p>
              <p className="text-[9px] text-slate-400">Unlimited Legal Citations</p>
            </div>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-amber-400 group-hover:translate-x-0.5 transition" />
        </a>

        <div className="flex items-center justify-between text-[10px] text-slate-400 px-1 pt-1">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>FBR Portal Online</span>
          </div>
          <span className="font-mono text-[9px] text-slate-400">v2.4.0</span>
        </div>
      </div>
    </aside>
  );
};
