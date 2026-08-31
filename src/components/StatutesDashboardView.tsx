import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  Scale,
  BookOpen,
  Gavel,
  ShieldCheck,
  Search,
  Filter,
  Layers,
  FileText,
  Copy,
  Check,
  ArrowRight,
  ExternalLink,
  Download,
  Share2,
  Sparkles,
  HelpCircle,
  TrendingUp,
  Award,
  Globe2,
  Building,
  Briefcase,
  AlertCircle,
  FileCheck2,
  ListTree,
  Eye,
  ChevronDown,
  ChevronRight,
  Bookmark,
  Hash,
  FileSpreadsheet,
  X,
  Tag,
  SlidersHorizontal,
  CheckCircle2,
  CornerDownRight
} from "lucide-react";
import { STATUTES_MASTER_GROUPS, StatuteGroup, StatuteIndexItem } from "../utils/statutesDashboardData";
import { generateStatutesIndexPDF } from "../utils/pdfGenerator";

interface StatutesDashboardViewProps {
  onNavigateToChat?: (initialPrompt?: string) => void;
  onOpenPricing?: () => void;
  onOpenNoticeDrafter?: (section?: string) => void;
}

// Helper to highlight matching text in factual strings
const HighlightText: React.FC<{ text: string; highlight: string }> = ({ text, highlight }) => {
  if (!highlight.trim()) return <>{text}</>;
  const escaped = highlight.trim().replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  const parts = text.split(new RegExp(`(${escaped})`, "gi"));
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === highlight.trim().toLowerCase() ? (
          <mark key={i} className="bg-amber-400/30 text-amber-200 px-0.5 rounded font-semibold">
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </>
  );
};

export const StatutesDashboardView: React.FC<StatutesDashboardViewProps> = ({
  onNavigateToChat,
  onOpenPricing,
  onOpenNoticeDrafter,
}) => {
  // State management - searchTerm for dynamic real-time filtering of Acts & Ordinances
  const [searchTerm, setSearchTerm] = useState("");
  const [searchScope, setSearchScope] = useState<"all" | "titles" | "sections" | "pages">("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedStatuteId, setSelectedStatuteId] = useState<string>("all");
  const [selectedItem, setSelectedItem] = useState<StatuteIndexItem | null>(null);
  const [viewMode, setViewMode] = useState<"dashboard" | "index" | "deep">("dashboard");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedFullMarkdown, setCopiedFullMarkdown] = useState(false);
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);
  const [expandedGroupId, setExpandedGroupId] = useState<string | null>("wwf-1971");
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Close search suggestions on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setShowSearchSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Summary Metrics calculations
  const metrics = useMemo(() => {
    const totalActs = STATUTES_MASTER_GROUPS.length;
    let totalItems = 0;
    let totalRules = 0;
    let totalSections = 0;
    let totalCrs = 0;

    STATUTES_MASTER_GROUPS.forEach((g) => {
      totalItems += g.items.length;
      g.items.forEach((item) => {
        if (item.type === "rule") totalRules++;
        else if (item.type === "section") totalSections++;
        else if (item.type === "guidance") totalCrs++;
      });
    });

    return {
      totalActs,
      totalItems,
      totalRules,
      totalSections,
      totalCrs,
    };
  }, []);

  // Filtered array of statutes using useMemo based on searchTerm input (case-insensitive check on 'title' and 'act_type')
  const filteredStatutes = useMemo(() => {
    if (!searchTerm.trim()) {
      return STATUTES_MASTER_GROUPS;
    }
    const term = searchTerm.toLowerCase().trim();
    return STATUTES_MASTER_GROUPS.filter((statute) => {
      const titleMatch = statute.title ? statute.title.toLowerCase().includes(term) : false;
      const actTypeMatch = statute.act_type
        ? statute.act_type.toLowerCase().includes(term)
        : (statute.actCategory ? statute.actCategory.toLowerCase().includes(term) : false);
      return titleMatch || actTypeMatch;
    });
  }, [searchTerm]);

  // Factual search auto-suggestions list based on Ordinance and Act titles & key sections
  const searchSuggestions = useMemo(() => {
    if (!searchTerm.trim()) return [];
    const q = searchTerm.toLowerCase().trim();
    
    interface SearchSuggestionItem {
      type: "Act / Ordinance Title" | "Section / Rule";
      label: string;
      code: string;
      id: string;
      category: string;
      actTitle?: string;
    }

    // Matched titles
    const matchedTitles: SearchSuggestionItem[] = STATUTES_MASTER_GROUPS.filter(
      (g) =>
        g.title.toLowerCase().includes(q) ||
        (g.act_type && g.act_type.toLowerCase().includes(q)) ||
        g.shortCode.toLowerCase().includes(q)
    ).map((g) => ({
      type: "Act / Ordinance Title",
      label: g.title,
      code: g.shortCode,
      id: g.id,
      category: g.act_type || g.actCategory,
    }));

    // Matched provisions
    const matchedProvisions: SearchSuggestionItem[] = [];

    STATUTES_MASTER_GROUPS.forEach((g) => {
      g.items.forEach((item) => {
        if (
          item.code.toLowerCase().includes(q) ||
          item.title.toLowerCase().includes(q) ||
          (item.page && item.page.toLowerCase().includes(q))
        ) {
          if (matchedProvisions.length < 5) {
            matchedProvisions.push({
              type: "Section / Rule",
              label: item.title,
              code: item.code,
              id: item.id,
              category: g.shortCode,
              actTitle: g.title,
            });
          }
        }
      });
    });

    return [...matchedTitles, ...matchedProvisions].slice(0, 8);
  }, [searchTerm]);

  // Filtered list of displayed Acts and Ordinances based on searchTerm state
  const filteredGroups = useMemo(() => {
    return STATUTES_MASTER_GROUPS.filter((group) => {
      // Category filter
      if (selectedCategory !== "all" && group.actCategory !== selectedCategory && group.act_type !== selectedCategory) {
        return false;
      }
      // Specific statute filter
      if (selectedStatuteId !== "all" && group.id !== selectedStatuteId) {
        return false;
      }

      // If no searchTerm, group matches
      if (!searchTerm.trim()) return true;

      const q = searchTerm.toLowerCase().trim();

      // Case-insensitive title and act_type checks
      const titleMatch = group.title ? group.title.toLowerCase().includes(q) : false;
      const actTypeMatch = group.act_type
        ? group.act_type.toLowerCase().includes(q)
        : (group.actCategory ? group.actCategory.toLowerCase().includes(q) : false);

      // Search Scope: Ordinance & Act Titles / Types Only
      if (searchScope === "titles") {
        return (
          titleMatch ||
          actTypeMatch ||
          group.shortCode.toLowerCase().includes(q) ||
          group.actCategory.toLowerCase().includes(q)
        );
      }

      // Search Scope: Page Numbers Only
      if (searchScope === "pages") {
        const groupPageMatch = group.pageRange && group.pageRange.toLowerCase().includes(q);
        const itemPageMatch = group.items.some((it) => it.page && it.page.toLowerCase().includes(q));
        return Boolean(groupPageMatch || itemPageMatch);
      }

      // Search Scope: Sections & Rules Only
      if (searchScope === "sections") {
        return group.items.some(
          (item) =>
            item.code.toLowerCase().includes(q) ||
            item.title.toLowerCase().includes(q) ||
            (item.summary && item.summary.toLowerCase().includes(q)) ||
            (item.complianceNotes && item.complianceNotes.toLowerCase().includes(q))
        );
      }

      // Search Scope: All Factual Index Data (default)
      const groupMatch =
        titleMatch ||
        actTypeMatch ||
        group.shortCode.toLowerCase().includes(q) ||
        group.actCategory.toLowerCase().includes(q) ||
        group.description.toLowerCase().includes(q) ||
        (group.pageRange && group.pageRange.toLowerCase().includes(q)) ||
        group.keyHighlights.some((h) => h.toLowerCase().includes(q));

      const itemsMatch = group.items.some(
        (item) =>
          item.code.toLowerCase().includes(q) ||
          item.title.toLowerCase().includes(q) ||
          (item.summary && item.summary.toLowerCase().includes(q)) ||
          (item.complianceNotes && item.complianceNotes.toLowerCase().includes(q)) ||
          (item.page && item.page.toLowerCase().includes(q)) ||
          (item.crossReferences && item.crossReferences.some((cr) => cr.toLowerCase().includes(q))) ||
          (item.fullDetails && item.fullDetails.some((fd) => fd.toLowerCase().includes(q)))
      );

      return groupMatch || itemsMatch;
    }).map((group) => {
      // If no searchTerm, return group intact
      if (!searchTerm.trim()) return group;
      const q = searchTerm.toLowerCase().trim();

      // If scope is titles only, retain all items if title matched
      if (searchScope === "titles") {
        return group;
      }

      // Filter matching items within group
      const matchingItems = group.items.filter((item) => {
        if (searchScope === "pages") {
          return item.page && item.page.toLowerCase().includes(q);
        }
        return (
          item.code.toLowerCase().includes(q) ||
          item.title.toLowerCase().includes(q) ||
          (item.summary && item.summary.toLowerCase().includes(q)) ||
          (item.complianceNotes && item.complianceNotes.toLowerCase().includes(q)) ||
          (item.page && item.page.toLowerCase().includes(q)) ||
          (item.crossReferences && item.crossReferences.some((cr) => cr.toLowerCase().includes(q))) ||
          (item.fullDetails && item.fullDetails.some((fd) => fd.toLowerCase().includes(q)))
        );
      });

      return {
        ...group,
        items: matchingItems.length > 0 ? matchingItems : group.items,
      };
    });
  }, [searchTerm, searchScope, selectedCategory, selectedStatuteId]);

  // Total matching provisions count
  const matchingProvisionsCount = useMemo(() => {
    return filteredGroups.reduce((acc, g) => acc + g.items.length, 0);
  }, [filteredGroups]);

  // Active search highlight query
  const activeTitleHighlight = searchTerm.trim();

  // Handle single item citation copy
  const handleCopyCitation = (item: StatuteIndexItem, groupTitle: string) => {
    let text = `* **${item.code}:** ${item.title}`;
    if (item.page) text += ` (${item.page})`;
    
    navigator.clipboard.writeText(text);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Generate and Copy Full Master Index Markdown
  const handleCopyFullMarkdown = () => {
    let output = "";
    STATUTES_MASTER_GROUPS.forEach((group) => {
      output += `**${group.title.toUpperCase()}**\n\n`;
      group.items.forEach((item) => {
        output += `* **${item.code}:** ${item.title}`;
        if (item.page) {
          output += ` (${item.page})`;
        }
        output += "\n";
      });
      output += "\n";
    });

    navigator.clipboard.writeText(output.trim());
    setCopiedFullMarkdown(true);
    setTimeout(() => setCopiedFullMarkdown(false), 2500);
  };

  // Handle AI question launch
  const handleAskAI = (item: StatuteIndexItem, group: StatuteGroup) => {
    const prompt = `Explain ${group.title} - ${item.code} (${item.title}) with respect to Pakistani Tax Law, FBR enforcement, judicial precedents, and practical compliance requirements.`;
    if (onNavigateToChat) {
      onNavigateToChat(prompt);
    }
  };

  // Generate and Download Clean PDF Export of Currently Filtered Statutes
  const handleDownloadPDF = () => {
    setIsDownloadingPdf(true);
    try {
      generateStatutesIndexPDF(filteredGroups, {
        searchTerm: searchTerm.trim() || undefined,
        category: selectedCategory !== "all" ? selectedCategory : undefined,
        scope: searchScope !== "all" ? searchScope : undefined,
      });
    } catch (err) {
      console.error("Error generating statutes PDF export:", err);
    } finally {
      setTimeout(() => setIsDownloadingPdf(false), 1200);
    }
  };

  // Pre-curated factual title chips
  const quickActChips = [
    { label: "WWF Ordinance 1971", query: "Workers Welfare Fund Ordinance", id: "wwf-1971" },
    { label: "SC Practice Act 2023", query: "Supreme Court (Practice and Procedure) Act", id: "sc-practice-2023" },
    { label: "Assets Declaration Act 2019", query: "Assets Declaration Act, 2019", id: "ada-2019" },
    { label: "ADA Rules 2019", query: "Assets Declaration (Procedure and Conditions)", id: "ada-rules-2019" },
    { label: "Domestic Assets (VDDA 2018)", query: "Voluntary Declaration of Domestic Assets", id: "vdda-2018" },
    { label: "Foreign Assets (FARA 2018)", query: "Foreign Assets (Declaration and Repatriation)", id: "fara-2018" },
    { label: "ATIR Service Rules 2024", query: "Appellate Tribunal Inland Revenue (Appointments", id: "atir-service-2024" },
    { label: "ATIR Functions Rules 2023", query: "Appellate Tribunal Inland Revenue (Functions)", id: "atir-functions-2023" },
    { label: "CVT & Allied Acts 2022", query: "Capital Value Tax", id: "allied-acts-suite" },
    { label: "Digital Presence Tax 2025", query: "Digital Presence Proceeds Tax", id: "dppt-2025" },
    { label: "Income Tax Rules 2002", query: "Income Tax Rules, 2002", id: "itr-2002-master" },
    { label: "CRS Guidance (AEOI)", query: "Common Reporting Standard", id: "crs-guidance-aeoi" },
    { label: "IR Reward & Welfare", query: "Inland Revenue Reward", id: "ir-welfare-rewards" },
  ];

  return (
    <div id="statutes-dashboard-container" className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8">
      {/* Top Header & Breadcrumb */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-950/80 text-emerald-400 border border-emerald-800/80">
                Statutory Intelligence Suite 2026
              </span>
              <span className="text-slate-400 text-xs flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Factual Legislative Index & Archive
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white flex items-center gap-3">
              <Scale className="w-8 h-8 text-emerald-400" />
              Tax Legislation & Allied Statutes Master Dashboard
            </h1>
            <p className="text-slate-400 text-sm md:text-base mt-1.5 max-w-3xl">
              Factual repository of Pakistan Tax Statutes, Subordinate Rules, Appellate Procedures, OECD CRS Directives, and Amnesty Enactments with section-by-section statutory indices.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-3 flex-wrap">
            <button
              id="download-index-pdf-btn"
              onClick={handleDownloadPDF}
              disabled={isDownloadingPdf}
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 disabled:opacity-75 text-white rounded-lg text-xs md:text-sm font-semibold flex items-center gap-2 transition-all shadow-md shadow-emerald-950/40 hover:shadow-emerald-900/50"
              title="Download clean PDF export of the currently filtered statute list for professional reference"
            >
              {isDownloadingPdf ? (
                <>
                  <Check className="w-4 h-4 text-emerald-200 animate-pulse" />
                  <span>Generating PDF...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Download Index (PDF)</span>
                </>
              )}
            </button>

            <button
              id="copy-full-markdown-btn"
              onClick={handleCopyFullMarkdown}
              className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 hover:text-white rounded-lg text-xs md:text-sm font-medium flex items-center gap-2 transition-all shadow-sm"
              title="Copy clean structured index in standard legal markdown notation"
            >
              {copiedFullMarkdown ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Index Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-400" />
                  <span>Export Master Index (Markdown)</span>
                </>
              )}
            </button>

            <button
              id="open-ai-consultant-btn"
              onClick={() => onNavigateToChat && onNavigateToChat("Provide a statutory overview of the Workers Welfare Fund Ordinance 1971, ATIR Rules 2024, and Income Tax Rules 2002.")}
              className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 border border-emerald-700/60 text-emerald-300 hover:text-emerald-200 rounded-lg text-xs md:text-sm font-semibold flex items-center gap-2 transition-all shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Ask AI Legal Advisor</span>
            </button>
          </div>
        </div>

        {/* Executive Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 mt-6">
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 flex flex-col justify-between hover:border-slate-700 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Statutes & Acts</span>
              <BookOpen className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="mt-2">
              <span className="text-2xl md:text-3xl font-extrabold text-white">{metrics.totalActs}</span>
              <span className="text-xs text-emerald-400 ml-2 font-medium">Enactments</span>
            </div>
            <span className="text-[11px] text-slate-500 mt-1">WWF 1971, ADA 2019, SC 2023</span>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 flex flex-col justify-between hover:border-slate-700 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Subordinate Rules</span>
              <Layers className="w-4 h-4 text-blue-400" />
            </div>
            <div className="mt-2">
              <span className="text-2xl md:text-3xl font-extrabold text-white">{metrics.totalRules}</span>
              <span className="text-xs text-blue-400 ml-2 font-medium">Rules</span>
            </div>
            <span className="text-[11px] text-slate-500 mt-1">ITR 2002, ATIR 2024, CVT 2022</span>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 flex flex-col justify-between hover:border-slate-700 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Statutory Sections</span>
              <Hash className="w-4 h-4 text-amber-400" />
            </div>
            <div className="mt-2">
              <span className="text-2xl md:text-3xl font-extrabold text-white">{metrics.totalSections}</span>
              <span className="text-xs text-amber-400 ml-2 font-medium">Sections</span>
            </div>
            <span className="text-[11px] text-slate-500 mt-1">Full statutory scope indexed</span>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 flex flex-col justify-between hover:border-slate-700 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">AEOI & CRS Guidance</span>
              <Globe2 className="w-4 h-4 text-purple-400" />
            </div>
            <div className="mt-2">
              <span className="text-2xl md:text-3xl font-extrabold text-white">{metrics.totalCrs}</span>
              <span className="text-xs text-purple-400 ml-2 font-medium">Directives</span>
            </div>
            <span className="text-[11px] text-slate-500 mt-1">OECD standard compliance</span>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 flex flex-col justify-between hover:border-slate-700 transition-colors col-span-2 sm:col-span-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Page Spectrum</span>
              <FileSpreadsheet className="w-4 h-4 text-rose-400" />
            </div>
            <div className="mt-2">
              <span className="text-2xl md:text-3xl font-extrabold text-white">1055-1254</span>
              <span className="text-xs text-rose-400 ml-2 font-medium">Official</span>
            </div>
            <span className="text-[11px] text-slate-500 mt-1">Table of Contents Verified</span>
          </div>
        </div>

        {/* Search and Statutory Filter Control Deck */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 md:p-5 mt-6 shadow-lg space-y-4">
          {/* Search Header with Scope Filter */}
          <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
            {/* Live Search Input with Dropdown */}
            <div ref={searchContainerRef} className="relative flex-1">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  id="statutes-search-input"
                  type="text"
                  value={searchTerm}
                  onFocus={() => setShowSearchSuggestions(true)}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setShowSearchSuggestions(true);
                  }}
                  placeholder={
                    searchScope === "titles"
                      ? "Search Ordinance & Act Titles (e.g. 'Workers Welfare', 'Supreme Court', 'Assets Declaration', 'CVT')..."
                      : searchScope === "sections"
                      ? "Search Section & Rule numbers or topics (e.g. 'Sec. 4', 'Rule 25', 'POS', 'SWAPS')..."
                      : searchScope === "pages"
                      ? "Search Page references (e.g. 'Page 1229', 'Page 1055', 'Page 1246')..."
                      : "Search across all factual index data (Ordinances, Acts, Rules, Sections, Page citations)..."
                  }
                  className="w-full pl-10 pr-20 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                />
                {searchTerm && (
                  <button
                    onClick={() => {
                      setSearchTerm("");
                      setShowSearchSuggestions(false);
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white px-2 py-0.5 bg-slate-800 hover:bg-slate-700 rounded flex items-center gap-1"
                  >
                    <X className="w-3 h-3" />
                    <span>Clear</span>
                  </button>
                )}
              </div>

              {/* Instant Search Suggestions Dropdown */}
              {showSearchSuggestions && searchSuggestions.length > 0 && (
                <div className="absolute left-0 right-0 top-full mt-1.5 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl z-50 overflow-hidden max-h-80 overflow-y-auto">
                  <div className="px-3 py-2 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between text-[11px] text-slate-400 font-semibold uppercase tracking-wider">
                    <span>Matching Factual Index Data ({searchSuggestions.length})</span>
                    <span>Click to jump</span>
                  </div>
                  <div className="p-1.5 space-y-1">
                    {searchSuggestions.map((item, idx) => (
                      <div
                        key={idx}
                        onClick={() => {
                          if (item.type === "Act / Ordinance Title") {
                            setSearchTerm(item.label);
                            setSelectedStatuteId(item.id);
                            setExpandedGroupId(item.id);
                          } else {
                            setSearchTerm(item.code);
                            // find group containing this item
                            const grp = STATUTES_MASTER_GROUPS.find((g) => g.items.some((it) => it.id === item.id));
                            if (grp) {
                              setSelectedStatuteId(grp.id);
                              setExpandedGroupId(grp.id);
                              const fullItem = grp.items.find((it) => it.id === item.id);
                              if (fullItem) setSelectedItem(fullItem);
                            }
                          }
                          setShowSearchSuggestions(false);
                        }}
                        className="p-2.5 rounded-lg hover:bg-slate-800/80 cursor-pointer flex items-center justify-between gap-3 text-xs transition-colors"
                      >
                        <div className="flex items-center gap-2 overflow-hidden">
                          <span
                            className={`px-2 py-0.5 rounded font-mono font-bold text-[11px] shrink-0 ${
                              item.type === "Act / Ordinance Title"
                                ? "bg-emerald-950 text-emerald-300 border border-emerald-800"
                                : "bg-blue-950 text-blue-300 border border-blue-800"
                            }`}
                          >
                            {item.code}
                          </span>
                          <div className="truncate">
                            <span className="font-medium text-slate-200">
                              <HighlightText text={item.label} highlight={searchTerm} />
                            </span>
                            {item.actTitle && (
                              <span className="text-[11px] text-slate-500 ml-1.5 truncate block sm:inline">
                                ({item.actTitle})
                              </span>
                            )}
                          </div>
                        </div>
                        <span className="text-[10px] text-slate-400 bg-slate-950 px-2 py-0.5 rounded shrink-0 border border-slate-800">
                          {item.type}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Search Scope Buttons */}
            <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs shrink-0">
              <span className="text-[11px] font-semibold text-slate-400 px-2 hidden lg:inline">Scope:</span>
              <button
                onClick={() => setSearchScope("all")}
                className={`px-2.5 py-1.5 rounded-md font-medium transition-colors ${
                  searchScope === "all"
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "text-slate-400 hover:text-slate-200"
                }`}
                title="Search across all factual index fields"
              >
                All Index
              </button>
              <button
                onClick={() => setSearchScope("titles")}
                className={`px-2.5 py-1.5 rounded-md font-medium transition-colors ${
                  searchScope === "titles"
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "text-slate-400 hover:text-slate-200"
                }`}
                title="Filter specifically by Ordinance and Act Titles"
              >
                Act & Ordinance Titles
              </button>
              <button
                onClick={() => setSearchScope("sections")}
                className={`px-2.5 py-1.5 rounded-md font-medium transition-colors ${
                  searchScope === "sections"
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "text-slate-400 hover:text-slate-200"
                }`}
                title="Filter section and rule provisions"
              >
                Sections & Rules
              </button>
              <button
                onClick={() => setSearchScope("pages")}
                className={`px-2.5 py-1.5 rounded-md font-medium transition-colors ${
                  searchScope === "pages"
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "text-slate-400 hover:text-slate-200"
                }`}
                title="Filter by official page spectrum"
              >
                Page No.
              </button>
            </div>
          </div>

          {/* Secondary Controls: Jurisdictional Category & View Mode Switcher */}
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between border-t border-slate-800/80 pt-3">
            {/* Category Select Filter */}
            <div className="flex items-center gap-2 flex-1">
              <Filter className="w-4 h-4 text-emerald-400 shrink-0" />
              <select
                id="category-filter-select"
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setSelectedStatuteId("all");
                }}
                className="bg-slate-950 border border-slate-800 text-slate-200 text-xs md:text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-emerald-500 w-full sm:w-auto"
              >
                <option value="all">All Jurisdictional Categories ({metrics.totalActs})</option>
                <option value="Statute">Primary Statutes & Ordinances</option>
                <option value="Subordinate Rules">Subordinate Statutory Rules</option>
                <option value="Tribunal">Appellate Tribunal (ATIR)</option>
                <option value="Guidance / AEOI">International Tax & CRS</option>
                <option value="Amnesty">Amnesty & Declarations</option>
                <option value="Constitutional">Constitutional & Supreme Court</option>
                <option value="Repealed">Repealed / Consolidated</option>
              </select>

              {(searchTerm || selectedCategory !== "all" || selectedStatuteId !== "all" || searchScope !== "all") && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("all");
                    setSelectedStatuteId("all");
                    setSearchScope("all");
                  }}
                  className="px-2.5 py-1.5 text-xs text-amber-400 hover:text-amber-300 bg-amber-950/40 hover:bg-amber-950/70 border border-amber-800/60 rounded-lg transition-colors whitespace-nowrap"
                >
                  Reset All Filters
                </button>
              )}
            </div>

            {/* View Mode Toggle */}
            <div className="flex bg-slate-950 border border-slate-800 rounded-lg p-1 shrink-0 self-end sm:self-auto">
              <button
                onClick={() => setViewMode("dashboard")}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                  viewMode === "dashboard"
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setViewMode("index")}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                  viewMode === "index"
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Legal Index
              </button>
              <button
                onClick={() => setViewMode("deep")}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                  viewMode === "deep"
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Deep Tree
              </button>
            </div>
          </div>

          {/* Quick Ordinance & Act Title Filter Chips */}
          <div className="pt-2">
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Quick Title Filters:
                </span>
              </div>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="text-[11px] text-amber-400 hover:text-amber-300 flex items-center gap-1"
                >
                  <X className="w-3 h-3" />
                  <span>Clear Search Filter</span>
                </button>
              )}
            </div>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
              <button
                onClick={() => {
                  setSelectedStatuteId("all");
                  setSearchTerm("");
                }}
                className={`px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedStatuteId === "all" && !searchTerm
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800"
                }`}
              >
                All Ordinances & Acts ({STATUTES_MASTER_GROUPS.length})
              </button>
              {quickActChips.map((chip) => {
                const isActive =
                  selectedStatuteId === chip.id ||
                  searchTerm.toLowerCase() === chip.query.toLowerCase() ||
                  searchTerm.toLowerCase() === chip.label.toLowerCase();
                return (
                  <button
                    key={chip.id}
                    onClick={() => {
                      setSearchTerm(chip.label);
                      setSelectedStatuteId("all");
                      setExpandedGroupId(chip.id);
                    }}
                    className={`px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                      isActive
                        ? "bg-emerald-900/80 text-emerald-300 border border-emerald-600 shadow-sm"
                        : "bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800"
                    }`}
                  >
                    <span>{chip.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Search Results Summary Banner */}
          {(searchTerm || selectedStatuteId !== "all" || selectedCategory !== "all" || searchScope !== "all") && (
            <div className="bg-slate-950/80 border border-slate-800/80 px-3.5 py-2 rounded-lg flex items-center justify-between text-xs text-slate-300">
              <div className="flex items-center gap-2 flex-wrap">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>
                  Factual Filter Results: Found <strong className="text-white">{filteredGroups.length}</strong> of {STATUTES_MASTER_GROUPS.length} Ordinance/Act {filteredGroups.length === 1 ? "Title" : "Titles"} and <strong className="text-emerald-400">{matchingProvisionsCount}</strong> matching provisions.
                </span>
                {searchTerm && (
                  <span className="bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded text-[11px] flex items-center gap-1">
                    <span>Filter: "{searchTerm}"</span>
                    <X className="w-3 h-3 cursor-pointer hover:text-white" onClick={() => setSearchTerm("")} />
                  </span>
                )}
                {searchScope !== "all" && (
                  <span className="bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded text-[11px]">
                    Scope: {searchScope}
                  </span>
                )}
              </div>

              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedStatuteId("all");
                  setSelectedCategory("all");
                  setSearchScope("all");
                }}
                className="text-slate-400 hover:text-white underline text-[11px] shrink-0"
              >
                Clear all
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto">
        {/* Real-Time Local Search Input for Displayed Acts and Ordinances */}
        <div className="bg-slate-900/95 border border-slate-800 rounded-xl p-3.5 md:p-4 mb-6 shadow-md hover:border-slate-700/80 transition-all flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3.5">
          <div className="flex items-center gap-2.5 flex-1">
            <div className="relative flex-1 group">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-emerald-400 transition-colors">
                <Search className="w-4 h-4" />
              </div>
              <input
                id="local-statutes-title-search-input"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Filter displayed Acts and Ordinances in real-time by title, short code, or act type (e.g. Workers Welfare, Supreme Court, ATIR, Amnesty)..."
                className="w-full pl-10 pr-20 py-2.5 bg-slate-950/90 border border-slate-800 rounded-lg text-xs md:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:bg-slate-950 transition-all shadow-inner"
              />
              {searchTerm && (
                <button
                  id="clear-statutes-local-search-btn"
                  onClick={() => setSearchTerm("")}
                  title="Clear search filter"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white px-2.5 py-1 bg-slate-800 hover:bg-slate-700 active:bg-slate-600 border border-slate-700/60 rounded-md flex items-center gap-1.5 transition-all shadow-sm group-hover:border-slate-600"
                >
                  <X className="w-3.5 h-3.5 text-slate-300" />
                  <span className="font-medium text-[11px]">Clear</span>
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0 justify-between sm:justify-start">
            <span className="text-xs text-slate-300 px-3 py-2 bg-slate-950/90 rounded-lg border border-slate-800 flex items-center gap-2 shadow-inner">
              <Scale className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>
                Displaying <strong className="text-white font-bold">{filteredGroups.length}</strong> of {STATUTES_MASTER_GROUPS.length} Acts/Ordinances
              </span>
            </span>

            <button
              id="download-filtered-statutes-pdf-btn"
              onClick={handleDownloadPDF}
              disabled={isDownloadingPdf || filteredGroups.length === 0}
              className="px-3 py-2 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 disabled:opacity-50 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer disabled:cursor-not-allowed"
              title="Download clean PDF export of currently displayed statutes"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{isDownloadingPdf ? "Exporting..." : "Download Index"}</span>
              <span className="sm:hidden">{isDownloadingPdf ? "Exporting..." : "PDF"}</span>
            </button>
          </div>
        </div>

        {/* No Results Fallback */}
        {filteredGroups.length === 0 && (
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-12 text-center my-6 space-y-3">
            <AlertCircle className="w-12 h-12 text-amber-400 mx-auto" />
            <h3 className="text-lg font-bold text-white">No Matching Statutes or Provisions Found</h3>
            <p className="text-xs md:text-sm text-slate-400 max-w-md mx-auto">
              No Acts or Ordinances match your search query <strong className="text-amber-300">"{searchTerm}"</strong>.
            </p>
            <div className="pt-2 flex justify-center gap-2">
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedStatuteId("all");
                  setSelectedCategory("all");
                  setSearchScope("all");
                }}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold"
              >
                Reset All Filters
              </button>
            </div>
          </div>
        )}

        {/* VIEW MODE 1: DASHBOARD TILES WITH RICH CARDS */}
        {viewMode === "dashboard" && filteredGroups.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left 2 Columns: Statute Enactments Overview & Accordion */}
            <div className="lg:col-span-2 space-y-5">
              {filteredGroups.map((group) => {
                const isExpanded = expandedGroupId === group.id;
                return (
                  <div
                    key={group.id}
                    className="bg-slate-900/90 border border-slate-800 hover:border-slate-700 rounded-xl overflow-hidden transition-all shadow-sm"
                  >
                    {/* Card Header */}
                    <div
                      className="p-4 md:p-5 flex items-start justify-between cursor-pointer select-none bg-gradient-to-r from-slate-900 via-slate-900 to-slate-900/80 hover:bg-slate-800/40 transition-colors"
                      onClick={() => setExpandedGroupId(isExpanded ? null : group.id)}
                    >
                      <div className="flex items-start gap-3.5">
                        <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-emerald-400 shrink-0 mt-0.5">
                          {group.actCategory === "Statute" && <Scale className="w-5 h-5" />}
                          {group.actCategory === "Subordinate Rules" && <Layers className="w-5 h-5" />}
                          {group.actCategory === "Tribunal" && <Gavel className="w-5 h-5" />}
                          {group.actCategory === "Guidance / AEOI" && <Globe2 className="w-5 h-5" />}
                          {group.actCategory === "Amnesty" && <Award className="w-5 h-5" />}
                          {group.actCategory === "Constitutional" && <ShieldCheck className="w-5 h-5" />}
                          {group.actCategory === "Repealed" && <AlertCircle className="w-5 h-5 text-amber-400" />}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                              {group.actCategory}
                            </span>
                            {group.pageRange && (
                              <span className="text-[11px] font-medium text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-900">
                                {group.pageRange}
                              </span>
                            )}
                            <span className="text-[11px] text-slate-500 font-mono">{group.effectiveYear}</span>
                          </div>
                          <h2 className="text-base md:text-lg font-bold text-white tracking-wide">
                            <HighlightText text={group.title} highlight={activeTitleHighlight} />
                          </h2>
                          <p className="text-xs md:text-sm text-slate-400 mt-1 line-clamp-2">
                            <HighlightText text={group.description} highlight={activeTitleHighlight} />
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 ml-3">
                        <span className="text-xs font-semibold px-2 py-1 rounded bg-slate-950 text-slate-300 border border-slate-800 hidden sm:inline-block">
                          {group.items.length} {group.actCategory.includes("Rule") ? "Rules" : "Provisions"}
                        </span>
                        {isExpanded ? (
                          <ChevronDown className="w-5 h-5 text-emerald-400" />
                        ) : (
                          <ChevronRight className="w-5 h-5 text-slate-500" />
                        )}
                      </div>
                    </div>

                    {/* Key Highlights Bar */}
                    <div className="px-4 md:px-5 py-2.5 bg-slate-950/60 border-t border-b border-slate-800/80">
                      <div className="text-[11px] font-medium text-slate-400 flex items-center gap-1.5 mb-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                        <span>Statutory Highlights & Enforcement Principles:</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5 text-xs text-slate-300">
                        {group.keyHighlights.map((hl, i) => (
                          <div key={i} className="flex items-start gap-1.5">
                            <span className="text-emerald-400 font-bold">•</span>
                            <span className="line-clamp-1">
                              <HighlightText text={hl} highlight={searchTerm} />
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Expanded Section Items */}
                    {isExpanded && (
                      <div className="p-4 md:p-5 bg-slate-950/40 space-y-2">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                            Section / Rule Index ({group.items.length} Entries)
                          </span>
                          <button
                            onClick={() => {
                              const groupText = `**${group.title.toUpperCase()}**\n\n` +
                                group.items.map(it => `* **${it.code}:** ${it.title}${it.page ? ` (${it.page})` : ''}`).join('\n');
                              navigator.clipboard.writeText(groupText);
                              setCopiedId(group.id);
                              setTimeout(() => setCopiedId(null), 2000);
                            }}
                            className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-medium"
                          >
                            {copiedId === group.id ? (
                              <>
                                <Check className="w-3.5 h-3.5" />
                                <span>Copied Act Index</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span>Copy {group.shortCode} Index</span>
                              </>
                            )}
                          </button>
                        </div>

                        <div className="space-y-1.5 max-h-96 overflow-y-auto pr-1">
                          {group.items.map((item) => {
                            const isSelected = selectedItem?.id === item.id;
                            return (
                              <div
                                key={item.id}
                                onClick={() => setSelectedItem(item)}
                                className={`p-3 rounded-lg border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                                  isSelected
                                    ? "bg-emerald-950/50 border-emerald-600 text-white"
                                    : "bg-slate-900/60 hover:bg-slate-900 border-slate-800 text-slate-200"
                                }`}
                              >
                                <div className="flex items-center gap-2.5 overflow-hidden">
                                  <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-xs font-mono font-bold text-emerald-400 shrink-0">
                                    <HighlightText text={item.code} highlight={searchTerm} />
                                  </span>
                                  <span className="text-xs md:text-sm font-medium truncate">
                                    <HighlightText text={item.title} highlight={searchTerm} />
                                  </span>
                                </div>

                                <div className="flex items-center gap-2 shrink-0">
                                  {item.page && (
                                    <span className="text-[11px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800 hidden sm:inline">
                                      <HighlightText text={item.page} highlight={searchTerm} />
                                    </span>
                                  )}
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleCopyCitation(item, group.title);
                                    }}
                                    className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors"
                                    title="Copy legal citation"
                                  >
                                    {copiedId === item.id ? (
                                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                                    ) : (
                                      <Copy className="w-3.5 h-3.5" />
                                    )}
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Right Column: Selected Statutory Item Inspection Panel */}
            <div className="space-y-6">
              {selectedItem ? (
                <div className="bg-slate-900/90 border border-emerald-600/50 rounded-xl p-5 shadow-xl sticky top-20">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                    <span className="px-2.5 py-1 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 text-xs font-mono font-bold">
                      {selectedItem.code}
                    </span>
                    {selectedItem.page && (
                      <span className="text-xs font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                        {selectedItem.page}
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-white leading-snug mb-2">
                    {selectedItem.title}
                  </h3>

                  {selectedItem.summary && (
                    <div className="mb-4">
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                        Statutory Scope:
                      </span>
                      <p className="text-xs md:text-sm text-slate-300 leading-relaxed bg-slate-950 p-3 rounded-lg border border-slate-800">
                        {selectedItem.summary}
                      </p>
                    </div>
                  )}

                  {selectedItem.fullDetails && selectedItem.fullDetails.length > 0 && (
                    <div className="mb-4">
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                        Sub-Provisions & Mechanics:
                      </span>
                      <ul className="space-y-1.5 text-xs text-slate-300">
                        {selectedItem.fullDetails.map((det, idx) => (
                          <li key={idx} className="flex items-start gap-2 bg-slate-950/60 p-2 rounded border border-slate-800/60">
                            <span className="text-emerald-400 font-bold">›</span>
                            <span>{det}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {selectedItem.complianceNotes && (
                    <div className="mb-4 bg-amber-950/30 border border-amber-900/60 p-3 rounded-lg">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300 mb-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>Practical Tax Compliance Note:</span>
                      </div>
                      <p className="text-xs text-amber-200/90 leading-relaxed">
                        {selectedItem.complianceNotes}
                      </p>
                    </div>
                  )}

                  {selectedItem.crossReferences && (
                    <div className="mb-4">
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                        Cross References:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedItem.crossReferences.map((cr, idx) => (
                          <span
                            key={idx}
                            className="text-[11px] px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800"
                          >
                            {cr}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Inspector Action Buttons */}
                  <div className="pt-3 border-t border-slate-800 space-y-2">
                    <button
                      onClick={() => {
                        const grp = STATUTES_MASTER_GROUPS.find((g) => g.items.some((it) => it.id === selectedItem.id)) || STATUTES_MASTER_GROUPS[0];
                        handleAskAI(selectedItem, grp);
                      }}
                      className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs md:text-sm font-semibold flex items-center justify-center gap-2 transition-all"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Ask AI Legal Analysis</span>
                    </button>

                    <button
                      onClick={() => {
                        const grp = STATUTES_MASTER_GROUPS.find((g) => g.items.some((it) => it.id === selectedItem.id)) || STATUTES_MASTER_GROUPS[0];
                        handleCopyCitation(selectedItem, grp.title);
                      }}
                      className="w-full py-2 bg-slate-950 hover:bg-slate-800 border border-slate-700 text-slate-200 rounded-lg text-xs font-medium flex items-center justify-center gap-2 transition-all"
                    >
                      {copiedId === selectedItem.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Citation Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Legal Citation</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-slate-900/60 border border-slate-800 border-dashed rounded-xl p-8 text-center text-slate-400 sticky top-20">
                  <FileText className="w-10 h-10 mx-auto text-slate-600 mb-3" />
                  <h4 className="text-sm font-bold text-slate-300">Statutory Provision Inspector</h4>
                  <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                    Click any section or rule in the list to inspect statutory definitions, compliance guidelines, and cross references.
                  </p>
                </div>
              )}

              {/* Quick Legal Reference Card */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5">
                <h4 className="text-sm font-bold text-white flex items-center gap-2 mb-3">
                  <Award className="w-4 h-4 text-emerald-400" />
                  Statutory Hierarchy of Pakistani Tax Laws
                </h4>
                <div className="space-y-2.5 text-xs text-slate-300">
                  <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                    <span className="font-bold text-white block">1. The Constitution of Pakistan, 1973</span>
                    <span className="text-slate-400 text-[11px]">Art 184(3), Art 199, Fourth Schedule Federal/Provincial tax legislative entries.</span>
                  </div>
                  <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                    <span className="font-bold text-white block">2. Primary Acts & Ordinances</span>
                    <span className="text-slate-400 text-[11px]">Income Tax Ordinance 2001, Sales Tax Act 1990, WWF Ordinance 1971, ADA 2019.</span>
                  </div>
                  <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                    <span className="font-bold text-white block">3. Subordinate Statutory Rules & SROs</span>
                    <span className="text-slate-400 text-[11px]">Income Tax Rules 2002, ATIR Rules 2024, Sales Tax Rules 2006, CVT Rules 2022.</span>
                  </div>
                  <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                    <span className="font-bold text-white block">4. International Standards & Guidance</span>
                    <span className="text-slate-400 text-[11px]">OECD Common Reporting Standard (CRS) for Automatic Exchange of Information (AEOI).</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW MODE 2: CLEAN LEGAL INDEX (EXACT NOTATION MATCHING USER SPECIFICATION) */}
        {viewMode === "index" && filteredGroups.length > 0 && (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 md:p-8 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-xl font-extrabold text-white">
                  Chronological Table of Contents & Statutory Index
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Standardized legal notation format grouped strictly by Act / Ordinance / Rules Title in Bold UPPERCASE.
                </p>
              </div>
              <button
                onClick={handleCopyFullMarkdown}
                className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shrink-0 self-start"
              >
                {copiedFullMarkdown ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedFullMarkdown ? "Copied All" : "Copy Complete Index"}</span>
              </button>
            </div>

            <div className="space-y-8 font-mono text-xs md:text-sm">
              {filteredGroups.map((group) => (
                <div key={group.id} className="border-b border-slate-800/80 pb-6 last:border-b-0">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-base md:text-lg font-bold text-emerald-400 font-sans tracking-wide">
                      **<HighlightText text={group.title.toUpperCase()} highlight={activeTitleHighlight} />**
                    </h3>
                    <button
                      onClick={() => {
                        const grpText = `**${group.title.toUpperCase()}**\n\n` +
                          group.items.map(it => `* **${it.code}:** ${it.title}${it.page ? ` (${it.page})` : ''}`).join('\n');
                        navigator.clipboard.writeText(grpText);
                        setCopiedId(group.id);
                        setTimeout(() => setCopiedId(null), 2000);
                      }}
                      className="text-xs font-sans text-slate-400 hover:text-white flex items-center gap-1"
                    >
                      {copiedId === group.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>Copy Block</span>
                    </button>
                  </div>

                  <ul className="space-y-1.5 text-slate-300 pl-2">
                    {group.items.map((item) => (
                      <li key={item.id} className="flex items-baseline gap-2 hover:text-white group">
                        <span className="text-emerald-500 font-bold select-none">*</span>
                        <span className="font-bold text-slate-100">
                          **<HighlightText text={item.code} highlight={searchTerm} />:**
                        </span>
                        <span>
                          <HighlightText text={item.title} highlight={searchTerm} />
                        </span>
                        {item.page && (
                          <span className="text-slate-500 group-hover:text-slate-400">
                            (<HighlightText text={item.page} highlight={searchTerm} />)
                          </span>
                        )}
                        <button
                          onClick={() => handleCopyCitation(item, group.title)}
                          className="opacity-0 group-hover:opacity-100 p-0.5 text-slate-500 hover:text-emerald-400 transition-opacity ml-2"
                          title="Copy entry"
                        >
                          {copiedId === item.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW MODE 3: DEEP REPOSITORY TREE EXPLORER */}
        {viewMode === "deep" && filteredGroups.length > 0 && (
          <div className="space-y-6">
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5">
              <h2 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                <ListTree className="w-5 h-5 text-emerald-400" />
                Comprehensive Statutory & Rulebook Data Tree
              </h2>
              <p className="text-xs text-slate-400">
                Detailed view of all chapters, statutory sub-rules, administrative requirements, penalties, and operational mechanisms.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredGroups.map((group) => (
                <div key={group.id} className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-900">
                        <HighlightText text={group.shortCode} highlight={activeTitleHighlight} />
                      </span>
                      <span className="text-xs text-slate-500 font-mono">
                        <HighlightText text={group.pageRange || group.effectiveYear} highlight={searchTerm} />
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-white mb-1.5">
                      <HighlightText text={group.title} highlight={activeTitleHighlight} />
                    </h3>
                    <p className="text-xs text-slate-400 mb-4">
                      <HighlightText text={group.description} highlight={activeTitleHighlight} />
                    </p>

                    <div className="space-y-2 border-t border-slate-800 pt-3">
                      <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                        Included Sections & Provisions:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {group.items.slice(0, 18).map((item) => (
                          <span
                            key={item.id}
                            onClick={() => {
                              setSelectedItem(item);
                              setViewMode("dashboard");
                            }}
                            className="text-xs px-2 py-1 bg-slate-950 hover:bg-emerald-950/60 hover:text-emerald-300 border border-slate-800 rounded cursor-pointer transition-colors"
                            title={item.title}
                          >
                            <HighlightText text={item.code} highlight={searchTerm} />
                          </span>
                        ))}
                        {group.items.length > 18 && (
                          <span className="text-xs px-2 py-1 bg-slate-950 text-slate-500 border border-slate-800 rounded">
                            +{group.items.length - 18} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between">
                    <span className="text-xs text-slate-400">Total {group.items.length} items</span>
                    <button
                      onClick={() => {
                        setSelectedStatuteId(group.id);
                        setExpandedGroupId(group.id);
                        setViewMode("dashboard");
                      }}
                      className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1"
                    >
                      <span>Explore Full Act</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default StatutesDashboardView;
