'use client';

import React, { useState, useEffect } from "react";
import { 
  Scale, 
  Calculator, 
  MessageSquare, 
  FileText, 
  Search, 
  ShieldCheck, 
  Crown, 
  LogOut, 
  LogIn, 
  UserPlus, 
  Zap,
  Building2,
  Menu,
  X
} from "lucide-react";

interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  role: string;
  subscriptionTier: "free" | "pro" | "enterprise";
  queriesUsedToday: number;
}

export const Navbar = () => {
  const [pathname, setPathname] = useState<string>("/pricing");
  const [user, setUser] = useState<UserProfile | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setPathname(window.location.pathname);
      const userStr = localStorage.getItem("saqibtax_user");
      if (userStr) {
        try {
          setUser(JSON.parse(userStr));
        } catch (e) {
          setUser(null);
        }
      }
    }
  }, []);

  const handleSignOut = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("saqibtax_token");
      localStorage.removeItem("saqibtax_user");
      setUser(null);
      window.location.href = "/";
    }
  };

  const navLinks = [
    { href: "/dashboard/chat", label: "Legal AI Chat", icon: MessageSquare },
    { href: "/dashboard/sales-tax", label: "Sales Tax 1990", icon: Scale },
    { href: "/pricing", label: "Pricing & Plans", icon: Crown, highlight: true },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-900 text-white border-b border-slate-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand / Logo */}
          <a href="/dashboard/chat" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center shadow-lg shadow-emerald-950/40 border border-emerald-400/30 group-hover:scale-105 transition">
              <Scale className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg tracking-tight text-white flex items-center gap-1.5">
                  SaqibTax <span className="text-emerald-400 font-extrabold text-sm px-1.5 py-0.5 rounded bg-emerald-950/80 border border-emerald-800/60">LEGAL AI</span>
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">Pakistan Tax Advisory & FBR Legal Engine</p>
            </div>
          </a>

          {/* Center Links */}
          <nav className="hidden md:flex items-center space-x-1 bg-slate-800/80 p-1 rounded-xl border border-slate-700/60">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-emerald-600 text-white shadow-sm"
                      : link.highlight
                      ? "text-amber-300 hover:text-amber-200 hover:bg-slate-700/60"
                      : "text-slate-300 hover:text-white hover:bg-slate-700/50"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${link.highlight && !isActive ? "text-amber-400" : ""}`} />
                  <span>{link.label}</span>
                </a>
              );
            })}
          </nav>

          {/* User Status / Upgrade Button */}
          <div className="flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex flex-col items-end">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-semibold text-slate-200">{user.fullName}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      user.subscriptionTier === "enterprise"
                        ? "bg-amber-100 text-amber-900"
                        : user.subscriptionTier === "pro"
                        ? "bg-emerald-100 text-emerald-900"
                        : "bg-slate-700 text-slate-300"
                    }`}>
                      {user.subscriptionTier?.toUpperCase()}
                    </span>
                  </div>
                </div>

                <a
                  href="/pricing"
                  className="px-3 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 text-xs font-bold transition flex items-center gap-1"
                >
                  <Crown className="w-3.5 h-3.5 text-amber-400" />
                  <span>Upgrade Plan</span>
                </a>

                <button
                  onClick={handleSignOut}
                  className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition"
                  title="Sign out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <a
                  href="/pricing"
                  className="px-3.5 py-1.5 text-xs font-black bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 rounded-xl shadow-sm transition flex items-center gap-1.5"
                >
                  <Crown className="w-3.5 h-3.5" />
                  <span>Upgrade to Pro</span>
                </a>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-slate-800 space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800"
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.label}</span>
                </a>
              );
            })}
          </div>
        )}

      </div>
    </header>
  );
};
