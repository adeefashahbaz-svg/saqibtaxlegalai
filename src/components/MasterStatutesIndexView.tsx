import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  Scale,
  BookOpen,
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
  CornerDownRight,
  ShieldAlert,
  ShieldCheck,
  Zap,
  Receipt,
  Info,
  Smartphone,
  Car,
  Landmark,
  Gavel,
  Lock,
  Compass,
  FileSignature
} from "lucide-react";
import {
  MASTER_LAW_CATEGORIES,
  MASTER_STATUTES_DATA,
  MasterStatuteLaw,
  MasterStatuteSection,
  MasterLawCategory
} from "../utils/masterStatutesRepository";

interface MasterStatutesIndexViewProps {
  initialCategoryId?: string;
  initialStatuteId?: string;
  onNavigateToChat?: (initialPrompt?: string) => void;
  onOpenNoticeDrafter?: (section?: string) => void;
  onOpenPricing?: () => void;
}

export const MasterStatutesIndexView: React.FC<MasterStatutesIndexViewProps> = ({
  initialCategoryId,
  initialStatuteId,
  onNavigateToChat,
  onOpenNoticeDrafter,
  onOpenPricing,
}) => {
  // State management
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(initialCategoryId || "all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeStatuteId, setActiveStatuteId] = useState<string | null>(initialStatuteId || null);
  const [previewDrawerLaw, setPreviewDrawerLaw] = useState<MasterStatuteLaw | null>(null);
  const [selectedSection, setSelectedSection] = useState<MasterStatuteSection | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedCitationId, setCopiedCitationId] = useState<string | null>(null);
  const [expandedInterplayId, setExpandedInterplayId] = useState<string | null>(null);
  const [activeTabFilter, setActiveTabFilter] = useState<"all" | "statute" | "rules">("all");

  // Sync initial props if changed
  useEffect(() => {
    if (initialCategoryId) {
      setSelectedCategoryId(initialCategoryId);
    }
  }, [initialCategoryId]);

  useEffect(() => {
    if (initialStatuteId) {
      const found = MASTER_STATUTES_DATA.find((l) => l.id === initialStatuteId);
      if (found) {
        setPreviewDrawerLaw(found);
        if (found.sections.length > 0) {
          setSelectedSection(found.sections[0]);
        }
      }
    }
  }, [initialStatuteId]);

  // Category Icon Resolver
  const getCategoryIcon = (id: string) => {
    switch (id) {
      case "indirect_tax":
        return Receipt;
      case "sector_levies":
        return Zap;
      case "taxpayer_oversight":
        return Scale;
      case "financial_integrity":
        return ShieldAlert;
      case "foreign_exchange":
        return Globe2;
      default:
        return BookOpen;
    }
  };

  // Filtered Laws based on category & search query
  const filteredLaws = useMemo(() => {
    return MASTER_STATUTES_DATA.filter((law) => {
      // Category Match
      const matchesCategory沉 = selectedCategoryId === "all" || law.categoryId === selectedCategoryId;
      if (!matchesCategory沉) return false;

      // Search Query Match (searches title, citation, shortTitle, description, highlights, section code, section title, impact notes)
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();

      const titleMatch = law.title.toLowerCase().includes(q) || law.shortTitle.toLowerCase().includes(q);
      const citationMatch四周 = law.citation.toLowerCase().includes(q);
      const descMatch = law.overallDescription.toLowerCase().includes(q) || law.incomeTaxInterplaySummary.toLowerCase().includes(q);
      const highlightMatch = law.keyHighlights.some((h) => h.toLowerCase().includes(q));
      const sectionMatch = law.sections.some(
        (s) =>
          s.code.toLowerCase().includes(q) ||
          s.title.toLowerCase().includes(q) ||
          s.summary.toLowerCase().includes(q) ||
          s.taxImpactNotes.toLowerCase().includes(q) ||
          s.fbrPracticeAdvisory.toLowerCase().includes(q) ||
          s.crossReferences.some((cr) => cr.toLowerCase().includes(q))
      );

      return titleMatch || citationMatch四周 || descMatch || highlightMatch || sectionMatch;
    });
  }, [selectedCategoryId, searchQuery]);

  // Metrics calculation
  const totalStats = useMemo(() => {
    const totalLaws = MASTER_STATUTES_DATA.length;
    let totalSectionsCount = 0;
    MASTER_STATUTES_DATA.forEach((l) => {
      totalSectionsCount += l.sections.length;
    });
    return {
      totalCategories: MASTER_LAW_CATEGORIES.length,
      totalLaws,
      totalSectionsCount,
    };
  }, []);

  // Copy handler
  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCopyCitation = (citation: string, id: string) => {
    navigator.clipboard.writeText(citation);
    setCopiedCitationId(id);
    setTimeout(() => setCopiedCitationId(null), 2000);
  };

  const handleOpenDrawer = (law: MasterStatuteLaw, section?: MasterStatuteSection) => {
    setPreviewDrawerLaw(law);
    setSelectedSection(section || (law.sections.length > 0 ? law.sections[0] : null));
  };

  return (
    <div id="master-statutes-repository-view" className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto animate-fade-in">
      
      {/* Top Hero Banner & Jurisprudence Header */}
      <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
                <Scale className="w-5 h-5" />
              </span>
              <span className="text-xs font-black uppercase tracking-wider text-emerald-400">
                Institutional Jurisprudence & Regulatory Index
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
              <span className="px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-300">
                5 Primary Law Categories
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-emerald-950/80 border border-emerald-800 text-emerald-300">
                Amended up to Finance Act 2026
              </span>
            </div>
          </div>

          <div className="max-w-3xl space-y-2">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
              Statutes, Laws & Institutional Regulations{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300">
                Master Index
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Comprehensive codified repository of Pakistan indirect taxes, sector levies, taxpayer protection ombudsman statutes, anti-benami & AML financial integrity codes, and foreign exchange protection enactments with direct Income Tax interplay analysis.
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800/80 flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                <Receipt className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400">Indirect Laws</p>
                <p className="text-sm font-black text-white">STA 1990 & FEA 2005</p>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800/80 flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400">Sector Levies</p>
                <p className="text-sm font-black text-white">Mobile Handset & EVs</p>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800/80 flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                <Scale className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400">Oversight & FTO</p>
                <p className="text-sm font-black text-white">FTO 2000 & FBR Act</p>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800/80 flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0">
                <ShieldAlert className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400">Integrity & FX</p>
                <p className="text-sm font-black text-white">Benami, AML & PERA</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Unified Statute Reference Search Bar */}
      <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800 shadow-xl space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-emerald-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="unified-statute-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by section, clause, rule, keyword (e.g. 'Section 3', 'Section 8B', 'FTO Maladministration', 'Benami 22', 'PERA 1992', 'FATF STR')..."
              className="w-full pl-10 pr-10 py-3 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30 transition shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (onNavigateToChat) {
                  onNavigateToChat(
                    searchQuery
                      ? `Please provide an authoritative legal and statutory analysis under Pakistani tax laws for: ${searchQuery}`
                      : "Please provide a statutory overview of Pakistan Indirect Taxes, Sector Levies, FTO Maladministration, Benami Act, and Foreign Exchange regulations."
                  );
                }
              }}
              className="px-4 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/60 transition shrink-0"
            >
              <Sparkles className="w-4 h-4" />
              <span>Ask AI Counsel</span>
            </button>
          </div>
        </div>

        {/* Quick Search Helper Pills */}
        <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-slate-400 pt-1">
          <span className="text-slate-500 flex items-center gap-1">
            <Tag className="w-3 h-3" /> Quick filters:
          </span>
          {[
            "Section 8B 90% Cap",
            "FTO Maladministration Sec 9",
            "Benami Provisional Attachment",
            "AML Predicate Offences",
            "PERA Sec 111(4) Remittance",
            "Track & Trace Sec 40C",
            "EV 1% Sales Tax",
          ].map((tag, idx) => (
            <button
              key={idx}
              onClick={() => setSearchQuery(tag)}
              className="px-2 py-0.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-emerald-300 transition text-[10.5px]"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Category Accordion / Pill Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-800">
        <button
          onClick={() => setSelectedCategoryId("all")}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition flex items-center gap-2 border ${
            selectedCategoryId === "all"
              ? "bg-slate-800 text-white border-emerald-500 shadow-md"
              : "bg-slate-950/80 text-slate-400 hover:text-white border-slate-800 hover:border-slate-700"
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>All 5 Categories</span>
          <span className="px-1.5 py-0.2 text-[10px] rounded-full bg-slate-900 border border-slate-700 text-slate-300 font-mono">
            {MASTER_STATUTES_DATA.length}
          </span>
        </button>

        {MASTER_LAW_CATEGORIES.map((category) => {
          const Icon = getCategoryIcon(category.id);
          const isSelected = selectedCategoryId === category.id;

          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategoryId(category.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition flex items-center gap-2 border ${
                isSelected
                  ? "bg-emerald-950/90 text-emerald-200 border-emerald-500 shadow-md shadow-emerald-950/50"
                  : "bg-slate-950/80 text-slate-400 hover:text-white border-slate-800 hover:border-slate-700"
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isSelected ? "text-emerald-400" : "text-slate-400"}`} />
              <span>{category.name}</span>
              <span className={`px-1.5 py-0.2 text-[10px] rounded-full border font-mono ${isSelected ? "bg-emerald-900/60 border-emerald-700 text-emerald-200" : "bg-slate-900 border-slate-700 text-slate-400"}`}>
                {category.lawsCount}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Category Description Banner (if single category selected) */}
      {selectedCategoryId !== "all" && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-950 border border-slate-800/90 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          {(() => {
            const activeCat = MASTER_LAW_CATEGORIES.find((c) => c.id === selectedCategoryId);
            if (!activeCat) return null;
            const Icon = getCategoryIcon(activeCat.id);
            return (
              <>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <span>{activeCat.name}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-700">
                        {activeCat.badge}
                      </span>
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {activeCat.description}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedCategoryId("all")}
                  className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold underline shrink-0"
                >
                  Show All 5 Categories
                </button>
              </>
            );
          })()}
        </div>
      )}

      {/* Statutes & Regulations Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredLaws.map((law) => {
          const categoryMeta = MASTER_LAW_CATEGORIES.find((c) => c.id === law.categoryId);
          const isInterplayExpanded = expandedInterplayId === law.id;

          return (
            <div
              key={law.id}
              id={`statute-card-${law.id}`}
              className="rounded-3xl bg-slate-950/80 border border-slate-800/90 hover:border-slate-700 transition-all p-5 sm:p-6 flex flex-col justify-between space-y-4 shadow-xl group hover:shadow-2xl hover:shadow-emerald-950/20 relative"
            >
              {/* Header Badges */}
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border ${categoryMeta?.badgeClass || "bg-slate-800 text-slate-300 border-slate-700"}`}>
                    {law.categoryName}
                  </span>
                  
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-mono">
                    <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-emerald-300 font-semibold">
                      {law.enactmentYear}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
                      {law.status}
                    </span>
                  </div>
                </div>

                {/* Law Title & Citation */}
                <div>
                  <h3 className="text-base sm:text-lg font-black text-white group-hover:text-emerald-300 transition">
                    {law.title}
                  </h3>
                  <div className="flex items-center justify-between gap-2 mt-1">
                    <p className="text-[11px] font-mono text-slate-400 truncate">
                      {law.citation}
                    </p>
                    <button
                      onClick={() => handleCopyCitation(law.citation, law.id)}
                      className="p-1 rounded text-slate-500 hover:text-slate-300 hover:bg-slate-900 transition shrink-0"
                      title="Copy official statutory citation"
                    >
                      {copiedCitationId === law.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Administering Body & Jurisdiction */}
                <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800/80 flex items-center gap-2 text-xs text-slate-300">
                  <Landmark className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="text-[11px] text-slate-300 truncate">
                    <strong className="text-slate-200">Enforcement Authority:</strong> {law.administeringBody}
                  </span>
                </div>

                {/* Overall Description */}
                <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                  {law.overallDescription}
                </p>

                {/* Dedicated Legal Interplay Tooltip / Accordion (Crucial Requirement) */}
                <div className="rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-600/30 p-3.5 space-y-2">
                  <div 
                    onClick={() => setExpandedInterplayId(isInterplayExpanded ? null : law.id)}
                    className="flex items-center justify-between gap-2 cursor-pointer select-none"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-md bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                        <Info className="w-3 h-3" />
                      </div>
                      <span className="text-[11.5px] font-bold text-emerald-300">
                        Impact on Income Tax & FBR Compliance
                      </span>
                    </div>
                    <button className="text-slate-400 hover:text-emerald-300">
                      {isInterplayExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  <p className={`text-[11px] text-slate-300 leading-relaxed ${isInterplayExpanded ? "" : "line-clamp-2"}`}>
                    {law.incomeTaxInterplaySummary}
                  </p>
                </div>

                {/* Statutory Key Highlights */}
                <div className="space-y-1.5 pt-1">
                  <p className="text-[10px] uppercase font-black tracking-wider text-slate-500">
                    Core Statutory Pillars:
                  </p>
                  <ul className="space-y-1 text-xs text-slate-300">
                    {law.keyHighlights.slice(0, 3).map((hl, i) => (
                      <li key={i} className="flex items-start gap-2 text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Card Footer & Action Drawer Trigger */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-mono text-slate-400">
                    {law.sections.length} Master Sections Codified
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      if (onNavigateToChat) {
                        onNavigateToChat(`I require a legal consultation on ${law.title} (${law.citation}). How does this impact my client under Pakistani tax law?`);
                      }
                    }}
                    className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-emerald-300 text-xs flex items-center gap-1.5 transition"
                    title="Consult AI about this Law"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Ask AI</span>
                  </button>

                  <button
                    onClick={() => handleOpenDrawer(law)}
                    className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-950/50 transition"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Sections</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Full-Text Statutory Preview Drawer (Modal / Slide-over) */}
      {previewDrawerLaw && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div
            id="statute-fulltext-preview-drawer"
            className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-5xl w-full h-[90vh] shadow-2xl flex flex-col overflow-hidden text-slate-100 relative"
          >
            {/* Top Modal Header */}
            <div className="p-4 sm:p-6 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between gap-4">
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-700 uppercase">
                    {previewDrawerLaw.categoryName}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    {previewDrawerLaw.citation}
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl font-black text-white truncate">
                  {previewDrawerLaw.title}
                </h2>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => {
                    const text = `${previewDrawerLaw.title}\nCitation: ${previewDrawerLaw.citation}\nEnforcement: ${previewDrawerLaw.administeringBody}\n\nKey Highlights:\n${previewDrawerLaw.keyHighlights.join("\n")}\n\nSections:\n${previewDrawerLaw.sections.map((s) => `${s.code} - ${s.title}:\n${s.summary}\nTax Impact: ${s.taxImpactNotes}\nAdvisory: ${s.fbrPracticeAdvisory}`).join("\n\n")}`;
                    handleCopyText(text, "full-law");
                  }}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-1.5 border border-slate-700 transition"
                >
                  {copiedId === "full-law" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedId === "full-law" ? "Copied" : "Copy Law"}</span>
                </button>

                <button
                  onClick={() => setPreviewDrawerLaw(null)}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body: Two-Column Section Browser */}
            <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
              
              {/* Left Column: Sections List */}
              <div className="w-full md:w-80 max-h-56 md:max-h-none border-b md:border-b-0 md:border-r border-slate-800 bg-slate-950/60 p-3 sm:p-4 overflow-y-auto space-y-2 scrollbar-thin scrollbar-thumb-slate-800 shrink-0">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2">
                  Codified Sections & Rules ({previewDrawerLaw.sections.length})
                </p>

                <div className="space-y-1.5">
                  {previewDrawerLaw.sections.map((section) => {
                    const isSelected = selectedSection?.id === section.id;
                    return (
                      <button
                        key={section.id}
                        onClick={() => setSelectedSection(section)}
                        className={`w-full text-left p-3 rounded-2xl transition border ${
                          isSelected
                            ? "bg-emerald-950/80 border-emerald-500/80 text-white shadow-md"
                            : "bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-1">
                          <span className={`text-xs font-black ${isSelected ? "text-emerald-300" : "text-white"}`}>
                            {section.code}
                          </span>
                          <ChevronRight className={`w-3.5 h-3.5 ${isSelected ? "text-emerald-400" : "text-slate-500"}`} />
                        </div>
                        <p className="text-[11px] font-semibold truncate mt-0.5">
                          {section.title}
                        </p>
                        <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">
                          {section.summary}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Section Detail & Practice Interplay Analysis */}
              <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-5 bg-slate-900/90 scrollbar-thin scrollbar-thumb-slate-800">
                {selectedSection ? (
                  <div className="space-y-5 animate-fade-in">
                    
                    {/* Section Header */}
                    <div className="space-y-1.5 pb-4 border-b border-slate-800">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-black px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          {selectedSection.code}
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              const text = `${selectedSection.code}: ${selectedSection.title}\n\nSummary:\n${selectedSection.summary}\n\nFull Details:\n${selectedSection.fullContent?.join("\n") || ""}\n\nTax Impact on Income Tax:\n${selectedSection.taxImpactNotes}\n\nFBR Practice Advisory:\n${selectedSection.fbrPracticeAdvisory}\n\nCross References: ${selectedSection.crossReferences.join(", ")}`;
                              handleCopyText(text, selectedSection.id);
                            }}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs flex items-center gap-1 border border-slate-700 transition"
                          >
                            {copiedId === selectedSection.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                            <span>{copiedId === selectedSection.id ? "Copied" : "Copy Section"}</span>
                          </button>
                        </div>
                      </div>

                      <h3 className="text-xl font-black text-white">
                        {selectedSection.title}
                      </h3>
                      <p className="text-xs text-slate-300 leading-relaxed font-medium">
                        {selectedSection.summary}
                      </p>
                    </div>

                    {/* Full Statutory Content Sub-Clauses */}
                    {selectedSection.fullContent && selectedSection.fullContent.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                          <FileText className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Statutory Sub-Sections & Legal Provisions</span>
                        </h4>
                        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5 text-xs text-slate-200 leading-relaxed font-mono">
                          {selectedSection.fullContent.map((clause, idx) => (
                            <div key={idx} className="flex items-start gap-2.5">
                              <span className="text-emerald-500 font-bold shrink-0">§{idx + 1}</span>
                              <span>{clause}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Dedicated Tax Impact Callout Box */}
                    <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-slate-950 border border-emerald-600/40 space-y-2 shadow-lg">
                      <div className="flex items-center gap-2 text-emerald-300 font-bold text-xs">
                        <Info className="w-4 h-4 text-emerald-400" />
                        <span>Impact on Income Tax & FBR Compliance</span>
                      </div>
                      <p className="text-xs text-slate-200 leading-relaxed">
                        {selectedSection.taxImpactNotes}
                      </p>
                    </div>

                    {/* Dedicated FBR Practice Advisory Box */}
                    <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-950/50 via-slate-900 to-slate-950 border border-amber-600/40 space-y-2 shadow-lg">
                      <div className="flex items-center gap-2 text-amber-300 font-bold text-xs">
                        <ShieldCheck className="w-4 h-4 text-amber-400" />
                        <span>FBR Practice & Tax Advocate Advisory</span>
                      </div>
                      <p className="text-xs text-slate-200 leading-relaxed">
                        {selectedSection.fbrPracticeAdvisory}
                      </p>
                    </div>

                    {/* Cross References & Statutory Synergies */}
                    {selectedSection.crossReferences && selectedSection.crossReferences.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                          <Layers className="w-3.5 h-3.5 text-blue-400" />
                          <span>Statutory Cross-References & Harmonized Codes</span>
                        </h4>
                        <div className="flex flex-wrap items-center gap-2">
                          {selectedSection.crossReferences.map((ref, idx) => (
                            <span
                              key={idx}
                              className="px-2.5 py-1 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 text-xs font-mono flex items-center gap-1"
                            >
                              <Tag className="w-3 h-3 text-emerald-400" />
                              {ref}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Direct Action Links */}
                    <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
                      <button
                        onClick={() => {
                          if (onNavigateToChat) {
                            onNavigateToChat(
                              `I need an in-depth legal consultation on ${previewDrawerLaw.shortTitle} - ${selectedSection.code} (${selectedSection.title}). Please explain the judicial precedents and compliance requirements.`
                            );
                            setPreviewDrawerLaw(null);
                          }
                        }}
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs flex items-center gap-2 transition shadow-md"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Ask Legal AI Deep Reasoning</span>
                      </button>

                      {onOpenNoticeDrafter && (
                        <button
                          onClick={() => {
                            onOpenNoticeDrafter(selectedSection.code);
                            setPreviewDrawerLaw(null);
                          }}
                          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 hover:text-amber-200 border border-amber-600/40 text-xs font-bold flex items-center gap-2 transition"
                        >
                          <FileSignature className="w-3.5 h-3.5" />
                          <span>Draft FBR Notice Reply</span>
                        </button>
                      )}
                    </div>

                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center p-8 text-slate-500 space-y-3">
                    <BookOpen className="w-10 h-10 stroke-1" />
                    <p className="text-sm">Select a section from the left panel to read codified statutory details.</p>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
