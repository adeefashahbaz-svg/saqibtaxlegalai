"use client";

import React, { useState, useEffect } from "react";
import { Sidebar } from "../../components/Sidebar";
import { 
  Menu, 
  X, 
  Scale, 
  Crown, 
  Search, 
  Bell, 
  MessageSquare, 
  HelpCircle,
  ExternalLink,
  ShieldCheck
} from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState<string>("/dashboard/chat");
  const [userEmail, setUserEmail] = useState<string>("consultant@saqibtax.pk");
  const [userTier, setUserTier] = useState<string>("enterprise");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentPath(window.location.pathname);
      const userStr = localStorage.getItem("saqibtax_user");
      if (userStr) {
        try {
          const u = JSON.parse(userStr);
          setUserEmail(u.email || "user@saqibtax.pk");
          setUserTier(u.subscriptionTier || "free");
        } catch (e) {
          // ignore
        }
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col md:flex-row font-sans">
      
      {/* Mobile Sidebar Overlay Drawer */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div 
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-slate-950 z-10 shadow-2xl">
            <div className="absolute top-2 right-2 p-1">
              <button
                onClick={() => setSidebarOpen(false)}
                className="w-8 h-8 rounded-lg bg-slate-800 text-slate-300 flex items-center justify-center hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <Sidebar
              currentPath={currentPath}
              className="w-full h-full"
              onSelectItem={() => setSidebarOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Desktop Persistent Sidebar */}
      <div className="hidden md:flex md:flex-col shrink-0">
        <Sidebar currentPath={currentPath} className="h-screen sticky top-0" />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Top Control Bar */}
        <header className="h-14 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 flex items-center justify-between px-4 sm:px-6 z-30 sticky top-0">
          
          <div className="flex items-center gap-3">
            {/* Mobile Toggle Button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700"
              aria-label="Open Navigation Portal"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400">
              <span className="font-semibold text-slate-300">SaqibTax Portal</span>
              <span>/</span>
              <span className="text-emerald-400 font-mono font-medium capitalize">
                {currentPath.replace("/dashboard/", "").replace("-", " ") || "Legal AI Chat"}
              </span>
            </div>
          </div>

          {/* Quick Action Badges & Help */}
          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/923001234567"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-green-950/80 border border-green-700/60 text-green-300 text-[11px] font-semibold hover:bg-green-900/80 transition"
            >
              <span>WhatsApp Adv. Desk</span>
              <ExternalLink className="w-3 h-3 text-green-400" />
            </a>

            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                userTier === "enterprise"
                  ? "bg-amber-400/20 text-amber-300 border border-amber-500/40"
                  : userTier === "pro"
                  ? "bg-emerald-400/20 text-emerald-300 border border-emerald-500/40"
                  : "bg-slate-800 text-slate-400 border border-slate-700"
              }`}>
                {userTier} Plan
              </span>

              <a
                href="/pricing"
                className="px-3 py-1 rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 text-xs font-black transition flex items-center gap-1 shadow-sm"
              >
                <Crown className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Upgrade</span>
              </a>
            </div>
          </div>

        </header>

        {/* Dynamic Page Viewport */}
        <main className="flex-1 overflow-y-auto bg-slate-900">
          {children}
        </main>

      </div>

    </div>
  );
}
