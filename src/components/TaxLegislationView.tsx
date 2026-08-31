import React, { useState, useMemo } from "react";
import {
  Scale,
  BookOpen,
  Gavel,
  ShieldAlert,
  Globe,
  Coins,
  Cpu,
  Search,
  X,
  Filter,
  ArrowRight,
  FileText,
  Sparkles,
  Download,
  Copy,
  Check,
  ExternalLink,
  ChevronRight,
  ChevronDown,
  Info,
  Layers,
  ChevronUp,
  SlidersHorizontal,
  Bookmark,
  CheckCircle2,
  AlertTriangle,
  FileSpreadsheet,
  Percent,
  Calculator,
  Share2,
  FolderOpen
} from "lucide-react";
import {
  TAX_LEGISLATION_DATA,
  TaxLegislationItem,
  TaxCategoryMeta
} from "../utils/taxLegislationData";
import {
  INCOME_TAX_CHAPTERS_PARTS,
  IncomeTaxChapterPart,
  IncomeTaxSection
} from "../utils/incomeTaxChapterData";

interface TaxLegislationViewProps {
  onNavigateToChat?: (initialPrompt?: string) => void;
  onOpenNoticeDrafter?: (section?: string) => void;
}

export const TaxLegislationView: React.FC<TaxLegislationViewProps> = ({
  onNavigateToChat,
  onOpenNoticeDrafter
}) => {
  // Main View Navigation: "chapter-accordion" (Default) | "all-statutes" | "wht-matrix"
  const [activeTab, setActiveTab] = useState<"chapter-accordion" | "all-statutes" | "wht-matrix">("chapter-accordion");

  // Chapter Accordion State
  const [expandedPartIds, setExpandedPartIds] = useState<string[]>([
    "part-iv-business",
    "part-v-capital-gains",
    "part-procedural-machinery"
  ]);
  const [selectedSectionDetail, setSelectedSectionDetail] = useState<IncomeTaxSection | null>(null);
  const [headFilter, setHeadFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Statutes Compendium State
  const [selectedStatuteCategory, setSelectedStatuteCategory] = useState<string>("Income Tax");
  const [copiedId, setCopiedId] = useState<number | string | null>(null);
  const [copiedJson, setCopiedJson] = useState<boolean>(false);

  // Dynamic Category Metadata for Compendium
  const categoriesMeta: TaxCategoryMeta[] = useMemo(() => {
    return [
      {
        key: "Income Tax",
        label: "Income Tax Core",
        shortCode: "ITO",
        count: TAX_LEGISLATION_DATA.filter((item) => item.category === "Income Tax").length,
        badgeColor: "bg-emerald-950/90 text-emerald-300 border-emerald-600",
        description: "Foundational income tax statutory code, operational rules & July 2026 amendments"
      },
      {
        key: "all",
        label: "All Direct Taxes",
        shortCode: "ALL",
        count: TAX_LEGISLATION_DATA.length,
        badgeColor: "bg-slate-800 text-slate-200 border-slate-700",
        description: "Complete unified directory of direct tax enactments in chronological sequence"
      },
      {
        key: "Appellate & Judicial",
        label: "Appellate & Judicial",
        shortCode: "ATIR / SC",
        count: TAX_LEGISLATION_DATA.filter((item) => item.category === "Appellate & Judicial").length,
        badgeColor: "bg-amber-950/90 text-amber-300 border-amber-600",
        description: "ATIR member rules, Supreme Court practice acts & judicial appeal mechanisms"
      },
      {
        key: "Asset Declarations & Amnesty",
        label: "Amnesty & Disclosures",
        shortCode: "ADA / FARA",
        count: TAX_LEGISLATION_DATA.filter((item) => item.category === "Asset Declarations & Amnesty").length,
        badgeColor: "bg-purple-950/90 text-purple-300 border-purple-600",
        description: "Voluntary domestic documentation, offshore repatriation & civil servant disclosures"
      },
      {
        key: "International & Reporting",
        label: "CRS & Global Reporting",
        shortCode: "CRS / AEOI",
        count: TAX_LEGISLATION_DATA.filter((item) => item.category === "International & Reporting").length,
        badgeColor: "bg-blue-950/90 text-blue-300 border-blue-600",
        description: "Automatic exchange of financial accounts and OECD compliance standards"
      },
      {
        key: "Rewards & Welfare",
        label: "Welfare, Levies & Rewards",
        shortCode: "WWF / CVT",
        count: TAX_LEGISLATION_DATA.filter((item) => item.category === "Rewards & Welfare").length,
        badgeColor: "bg-teal-950/90 text-teal-300 border-teal-600",
        description: "Workers welfare fund (2%), capital value tax & staff reward regulations"
      },
      {
        key: "Digital Taxation",
        label: "Digital Economy",
        shortCode: "DPPT",
        count: TAX_LEGISLATION_DATA.filter((item) => item.category === "Digital Taxation").length,
        badgeColor: "bg-cyan-950/90 text-cyan-300 border-cyan-600",
        description: "Digital presence proceeds tax & virtual platform footprint taxation"
      }
    ];
  }, []);

  // Filtered dataset for Statutes Compendium
  const filteredStatutes = useMemo(() => {
    return TAX_LEGISLATION_DATA.filter((item) => {
      const matchCategory =
        selectedStatuteCategory === "all" || item.category === selectedStatuteCategory;
      const matchSearch =
        searchTerm.trim() === "" ||
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.sourceRef && item.sourceRef.toLowerCase().includes(searchTerm.toLowerCase())) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase());

      return matchCategory && matchSearch;
    });
  }, [selectedStatuteCategory, searchTerm]);

  // Filtered dataset for Chapter III & Procedural Accordion
  const filteredChapterParts = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    return INCOME_TAX_CHAPTERS_PARTS.map((part) => {
      const matchedSections = part.sections.filter((sec) => {
        const matchesHead = headFilter === "all" || sec.headOfIncome === headFilter;
        if (!matchesHead) return false;

        if (!term) return true;

        const inCode = sec.sectionCode.toLowerCase().includes(term);
        const inTitle = sec.title.toLowerCase().includes(term);
        const inSummary = sec.summary.toLowerCase().includes(term);
        const inProvisions = sec.keyProvisions.some((p) => p.toLowerCase().includes(term));
        const inDefense = sec.fbrPracticeAndDefense.toLowerCase().includes(term);
        const inCrossRefs = sec.crossReferences.some((cr) => cr.toLowerCase().includes(term));
        const inRates = sec.statutoryRatesOrLimits?.toLowerCase().includes(term);
        const inPart = part.title.toLowerCase().includes(term) || part.sectionsRange.toLowerCase().includes(term);

        return inCode || inTitle || inSummary || inProvisions || inDefense || inCrossRefs || inRates || inPart;
      });

      return {
        ...part,
        sections: matchedSections,
        matchesSearchCount: matchedSections.length
      };
    }).filter((part) => part.sections.length > 0);
  }, [searchTerm, headFilter]);

  // Total matching sections count
  const totalMatchingSections = useMemo(() => {
    return filteredChapterParts.reduce((acc, p) => acc + p.sections.length, 0);
  }, [filteredChapterParts]);

  // All WHT Sections for Withholding Directory
  const allWithholdingSections = useMemo(() => {
    const list: IncomeTaxSection[] = [];
    INCOME_TAX_CHAPTERS_PARTS.forEach((part) => {
      part.sections.forEach((sec) => {
        if (sec.isWithholdingSection || sec.withholdingRates || sec.headOfIncome === "Withholding") {
          list.push(sec);
        }
      });
    });
    return list;
  }, []);

  // Accordion Toggle Handlers
  const togglePart = (partId: string) => {
    setExpandedPartIds((prev) =>
      prev.includes(partId) ? prev.filter((id) => id !== partId) : [...prev, partId]
    );
  };

  const expandAllParts = () => {
    setExpandedPartIds(INCOME_TAX_CHAPTERS_PARTS.map((p) => p.id));
  };

  const collapseAllParts = () => {
    setExpandedPartIds([]);
  };

  // Copy helpers
  const handleCopySection = (sec: IncomeTaxSection) => {
    const text = `[${sec.sectionCode}] ${sec.title}\n\nSummary:\n${sec.summary}\n\nKey Provisions:\n${sec.keyProvisions.join("\n")}\n\nStatutory Limits & Rates:\n${sec.statutoryRatesOrLimits || "N/A"}\n\nFBR Practice & Audit Defense:\n${sec.fbrPracticeAndDefense}\n\nCross References: ${sec.crossReferences.join(", ")}`;
    navigator.clipboard.writeText(text);
    setCopiedId(sec.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCopyJson = () => {
    const dataToExport = activeTab === "chapter-accordion" ? filteredChapterParts : filteredStatutes;
    const jsonString = JSON.stringify(dataToExport, null, 2);
    navigator.clipboard.writeText(jsonString);
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2000);
  };

  // Helper for category badge icons
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Income Tax":
        return BookOpen;
      case "Appellate & Judicial":
        return Gavel;
      case "Asset Declarations & Amnesty":
        return ShieldAlert;
      case "International & Reporting":
        return Globe;
      case "Rewards & Welfare":
        return Coins;
      case "Digital Taxation":
        return Cpu;
      default:
        return Scale;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 selection:bg-emerald-500 selection:text-white">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-9 h-9 rounded-xl bg-emerald-600/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-sm shadow-emerald-950">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Income Tax Ordinance, 2001 Legal Repository
              </span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                Updated to Finance Act 2025 / 2026
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Income Tax Legal Repository & Chapter Master Index
            </h1>
            <p className="text-sm text-slate-400 mt-1 max-w-3xl">
              Comprehensive breakdown of Chapter III (Parts IV to X) and Procedural Chapters (IV, V, VI, X) with dynamic category accordions, statutory deductions, WHT directory, and FBR audit defense notes.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              onClick={handleCopyJson}
              className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 hover:text-white rounded-lg text-xs font-medium flex items-center gap-2 transition shadow-sm"
              title="Copy current filtered data as clean JSON array"
            >
              {copiedJson ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-300 font-semibold">JSON Exported!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-400" />
                  <span>Export JSON</span>
                </>
              )}
            </button>

            <button
              onClick={() =>
                onNavigateToChat &&
                onNavigateToChat(
                  "Provide a comprehensive legal analysis of Chapter III of the Income Tax Ordinance 2001, focusing on Business Deductions (Sec 20-21), Capital Gains (Sec 37), and Procedural Assessments (Sec 120-122)."
                )
              }
              className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center gap-2 transition shadow-md shadow-emerald-950/50"
            >
              <Sparkles className="w-4 h-4" />
              <span>Consult Legal AI</span>
            </button>
          </div>
        </div>

        {/* Primary View Mode Switcher */}
        <div className="bg-slate-900/90 border border-slate-800 p-1.5 rounded-xl flex items-center gap-2 max-w-2xl">
          <button
            onClick={() => setActiveTab("chapter-accordion")}
            className={`flex-1 py-2.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition ${
              activeTab === "chapter-accordion"
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-950"
                : "text-slate-400 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            <FolderOpen className="w-4 h-4" />
            <span>Chapter III & Procedural Accordion</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-900 text-emerald-200 border border-emerald-700 font-mono">
              7 Parts
            </span>
          </button>

          <button
            onClick={() => setActiveTab("all-statutes")}
            className={`flex-1 py-2.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition ${
              activeTab === "all-statutes"
                ? "bg-slate-800 text-white shadow-md"
                : "text-slate-400 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Direct Taxes Compendium</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-700 text-slate-300 font-mono">
              18 Acts
            </span>
          </button>

          <button
            onClick={() => setActiveTab("wht-matrix")}
            className={`flex-1 py-2.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition ${
              activeTab === "wht-matrix"
                ? "bg-rose-600 text-white shadow-md shadow-rose-950"
                : "text-slate-400 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            <Percent className="w-4 h-4" />
            <span>WHT Directory (Sec 148-153)</span>
          </button>
        </div>

        {/* Global Dynamic Search Toolbar */}
        <div className="bg-slate-900/95 border border-slate-800 rounded-xl p-3.5 md:p-4 shadow-md flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3.5">
          <div className="relative flex-1 group">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-emerald-400 transition-colors">
              <Search className="w-4 h-4" />
            </div>
            <input
              id="tax-legislation-search-input"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={
                activeTab === "chapter-accordion"
                  ? "Query any section number or keyword (e.g. 'Sec 18', 'Depreciation', 'Cash salary', 'Sec 37(1A)', 'Sec 114', 'Definite Information')..."
                  : "Search statutes, enactment titles, rules, and circular citations..."
              }
              className="w-full pl-10 pr-20 py-2.5 bg-slate-950/90 border border-slate-800 rounded-lg text-xs md:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:bg-slate-950 transition-all shadow-inner"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                title="Clear search filter"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white px-2.5 py-1 bg-slate-800 hover:bg-slate-700 border border-slate-700/60 rounded-md flex items-center gap-1.5 transition shadow-sm"
              >
                <X className="w-3.5 h-3.5 text-slate-300" />
                <span className="font-medium text-[11px]">Clear</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {activeTab === "chapter-accordion" && (
              <>
                <button
                  onClick={expandAllParts}
                  className="px-3 py-2 bg-slate-950 border border-slate-800 hover:border-slate-700 rounded-lg text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1.5 transition"
                >
                  <ChevronDown className="w-3.5 h-3.5" />
                  <span>Expand All</span>
                </button>
                <button
                  onClick={collapseAllParts}
                  className="px-3 py-2 bg-slate-950 border border-slate-800 hover:border-slate-700 rounded-lg text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1.5 transition"
                >
                  <ChevronUp className="w-3.5 h-3.5" />
                  <span>Collapse</span>
                </button>
              </>
            )}

            <span className="text-xs text-slate-300 px-3 py-2 bg-slate-950/90 rounded-lg border border-slate-800 flex items-center gap-2 shadow-inner">
              <Scale className="w-3.5 h-3.5 text-emerald-400" />
              <span>
                {activeTab === "chapter-accordion"
                  ? `${totalMatchingSections} Sections in ${filteredChapterParts.length} Parts`
                  : `${filteredStatutes.length} of ${TAX_LEGISLATION_DATA.length} Statutes`}
              </span>
            </span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* VIEW 1: DYNAMIC CATEGORY ACCORDION (CHAPTER III & PROCEDURAL CHAPTERS)    */}
        {/* ========================================================================= */}
        {activeTab === "chapter-accordion" && (
          <div className="space-y-6">
            {/* Filter Pills for Heads of Income */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-slate-800">
              <div className="flex items-center gap-1.5 text-xs text-slate-400 mr-2 shrink-0">
                <Filter className="w-3.5 h-3.5 text-emerald-400" />
                <span className="font-semibold uppercase tracking-wider text-[11px]">Head of Income:</span>
              </div>

              {[
                { key: "all", label: "All Chapters & Parts" },
                { key: "Business", label: "Income from Business (Sec 18-36)" },
                { key: "Capital Gains", label: "Capital Gains (Sec 37-38)" },
                { key: "Other Sources", label: "Other Sources (Sec 39-40)" },
                { key: "Exemptions", label: "Statutory Exemptions (Sec 41-55)" },
                { key: "Losses", label: "Losses & Group Relief (Sec 56-59BB)" },
                { key: "Allowances & Credits", label: "Allowances & Credits (Sec 60-65E)" },
                { key: "Procedural", label: "Procedural Machinery (Sec 114, 122, 147)" },
                { key: "Withholding", label: "Withholding Matrix (Sec 148-153)" }
              ].map((pill) => {
                const isSelected = headFilter === pill.key;
                return (
                  <button
                    key={pill.key}
                    onClick={() => setHeadFilter(pill.key)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                      isSelected
                        ? "bg-emerald-600 text-white shadow-sm ring-1 ring-emerald-400/40"
                        : "bg-slate-900/90 text-slate-300 hover:bg-slate-800 border border-slate-800"
                    }`}
                  >
                    {pill.label}
                  </button>
                );
              })}
            </div>

            {/* Empty State */}
            {filteredChapterParts.length === 0 && (
              <div className="p-12 text-center bg-slate-900/50 border border-slate-800 rounded-2xl">
                <BookOpen className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                <h3 className="text-base font-bold text-white">No Matching Sections Found</h3>
                <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
                  No statutory provisions in Chapter III or Procedural Chapters matched your filter "{searchTerm}".
                </p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setHeadFilter("all");
                  }}
                  className="mt-4 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold transition"
                >
                  Reset Search & Filters
                </button>
              </div>
            )}

            {/* Accordion Drawers List */}
            <div className="space-y-4">
              {filteredChapterParts.map((part) => {
                const isExpanded = expandedPartIds.includes(part.id);

                return (
                  <div
                    key={part.id}
                    className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                      isExpanded
                        ? "bg-slate-900/95 border-slate-700 shadow-lg"
                        : "bg-slate-900/70 border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    {/* Accordion Header / Drawer Bar */}
                    <button
                      onClick={() => togglePart(part.id)}
                      className="w-full p-4 md:p-5 flex items-start md:items-center justify-between gap-4 text-left cursor-pointer group hover:bg-slate-800/40 transition"
                    >
                      <div className="flex items-start md:items-center gap-3.5">
                        <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-emerald-400 shrink-0 shadow-inner group-hover:border-emerald-500/50 transition">
                          <BookOpen className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <span className="text-xs font-mono font-bold text-emerald-400 uppercase">
                              {part.partNumber}
                            </span>
                            <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${part.badgeColor}`}>
                              {part.sectionsRange}
                            </span>
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 font-mono">
                              {part.sections.length} Active Provisions
                            </span>
                          </div>
                          <h2 className="text-base md:text-lg font-bold text-white group-hover:text-emerald-300 transition">
                            {part.title}
                          </h2>
                          <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">
                            {part.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <div className="w-8 h-8 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center text-slate-400 group-hover:text-white transition">
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </div>
                      </div>
                    </button>

                    {/* Accordion Content Body */}
                    {isExpanded && (
                      <div className="px-4 md:px-6 pb-6 pt-2 border-t border-slate-800/80 space-y-4">
                        {/* Part Summary Box */}
                        <div className="p-3.5 bg-slate-950/80 border border-slate-800 rounded-xl">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                            <Info className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Statutory Highlights & Charging Blueprint:</span>
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-300">
                            {part.keyHighlights.map((hl, idx) => (
                              <div key={idx} className="flex items-start gap-2">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                                <span>{hl}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Section Cards Grid within Drawer */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                          {part.sections.map((sec) => (
                            <div
                              key={sec.id}
                              className="bg-slate-950/90 border border-slate-800/90 hover:border-emerald-600/50 rounded-xl p-4 flex flex-col justify-between transition-all hover:shadow-md hover:shadow-emerald-950/20 group"
                            >
                              <div>
                                {/* Card Header */}
                                <div className="flex items-start justify-between gap-2 mb-2.5">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-700/60">
                                      {sec.sectionCode}
                                    </span>
                                    {sec.headOfIncome && (
                                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                                        {sec.headOfIncome}
                                      </span>
                                    )}
                                    {sec.isWithholdingSection && (
                                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-700">
                                        WHT Source Collection
                                      </span>
                                    )}
                                  </div>

                                  <button
                                    onClick={() => handleCopySection(sec)}
                                    className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 transition"
                                    title="Copy Section Summary"
                                  >
                                    {copiedId === sec.id ? (
                                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                                    ) : (
                                      <Copy className="w-3.5 h-3.5" />
                                    )}
                                  </button>
                                </div>

                                {/* Title */}
                                <h3 className="text-sm font-bold text-white mb-2 group-hover:text-emerald-300 transition">
                                  {sec.title}
                                </h3>

                                {/* Summary */}
                                <p className="text-xs text-slate-300 leading-relaxed mb-3">
                                  {sec.summary}
                                </p>

                                {/* Key Provisions */}
                                <div className="space-y-1.5 mb-3 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80">
                                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                                    Statutory Sub-Sections & Conditions:
                                  </span>
                                  {sec.keyProvisions.map((prov, pIdx) => (
                                    <div key={pIdx} className="text-xs text-slate-300 flex items-start gap-1.5">
                                      <span className="text-emerald-400 font-bold">•</span>
                                      <span>{prov}</span>
                                    </div>
                                  ))}
                                </div>

                                {/* Statutory Rates or Limits */}
                                {sec.statutoryRatesOrLimits && (
                                  <div className="mb-2.5 p-2 bg-slate-900/40 rounded-lg border border-slate-800 text-xs">
                                    <span className="text-slate-400 font-semibold mr-1">Statutory Rates / Limits:</span>
                                    <span className="text-emerald-300 font-mono font-medium">
                                      {sec.statutoryRatesOrLimits}
                                    </span>
                                  </div>
                                )}

                                {/* FBR Practice & Audit Defense */}
                                <div className="p-2.5 bg-amber-950/30 border border-amber-800/40 rounded-lg text-xs text-amber-200/90 mb-3">
                                  <div className="flex items-center gap-1.5 font-bold text-amber-300 mb-1 text-[11px]">
                                    <AlertTriangle className="w-3 h-3 shrink-0" />
                                    <span>FBR Practice & Audit Defense:</span>
                                  </div>
                                  <p className="leading-snug">{sec.fbrPracticeAndDefense}</p>
                                </div>

                                {/* Cross References */}
                                {sec.crossReferences.length > 0 && (
                                  <div className="flex items-center gap-1.5 flex-wrap text-[11px] mb-3">
                                    <span className="text-slate-500 font-medium">Cross-Refs:</span>
                                    {sec.crossReferences.map((cr, crIdx) => (
                                      <button
                                        key={crIdx}
                                        onClick={() => setSearchTerm(cr.split(" ")[0] || cr)}
                                        className="px-1.5 py-0.5 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-emerald-300 border border-slate-800 font-mono text-[10px] transition"
                                      >
                                        {cr}
                                      </button>
                                    ))}
                                  </div>
                                )}
                              </div>

                              {/* Card Actions Footer */}
                              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2 mt-2">
                                <button
                                  onClick={() => setSelectedSectionDetail(sec)}
                                  className="text-xs text-slate-300 hover:text-white flex items-center gap-1 font-medium transition"
                                >
                                  <span>View Full Clause</span>
                                  <ChevronRight className="w-3.5 h-3.5" />
                                </button>

                                <div className="flex items-center gap-2">
                                  {onOpenNoticeDrafter && (
                                    <button
                                      onClick={() => onOpenNoticeDrafter(sec.sectionCode)}
                                      className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 hover:text-white rounded text-[11px] font-medium transition flex items-center gap-1"
                                      title="Open Notice Drafter for this section"
                                    >
                                      <FileText className="w-3 h-3 text-emerald-400" />
                                      <span>Draft Rejoinder</span>
                                    </button>
                                  )}

                                  <button
                                    onClick={() =>
                                      onNavigateToChat &&
                                      onNavigateToChat(
                                        `Explain the practical compliance rules, tax deduction conditions, and appellate defense strategy under ${sec.sectionCode} (${sec.title}) of the Income Tax Ordinance 2001.`
                                      )
                                    }
                                    className="px-2.5 py-1 bg-emerald-600/90 hover:bg-emerald-600 text-white rounded text-[11px] font-semibold transition flex items-center gap-1"
                                  >
                                    <Sparkles className="w-3 h-3" />
                                    <span>AI Analysis</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 2: DIRECT TAXES COMPENDIUM (18 ENACTMENTS)                          */}
        {/* ========================================================================= */}
        {activeTab === "all-statutes" && (
          <div className="space-y-6">
            {/* Category Navigation Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-800">
              {categoriesMeta.map((cat) => {
                const isSelected = selectedStatuteCategory === cat.key;
                const isIncomeTax = cat.key === "Income Tax";

                return (
                  <button
                    key={cat.key}
                    onClick={() => setSelectedStatuteCategory(cat.key)}
                    className={`px-3.5 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap flex items-center gap-2 transition-all shrink-0 cursor-pointer ${
                      isSelected
                        ? isIncomeTax
                          ? "bg-emerald-600 text-white shadow-lg shadow-emerald-950/60 ring-2 ring-emerald-400/40"
                          : "bg-slate-100 text-slate-900 shadow-md font-bold"
                        : isIncomeTax
                        ? "bg-emerald-950/60 text-emerald-300 hover:bg-emerald-900/60 border border-emerald-700/50"
                        : "bg-slate-900 text-slate-300 hover:bg-slate-850 hover:text-white border border-slate-800"
                    }`}
                  >
                    {isIncomeTax && <BookOpen className={`w-3.5 h-3.5 ${isSelected ? "text-white" : "text-emerald-400"}`} />}
                    <span>{cat.label}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono font-bold ${
                        isSelected
                          ? isIncomeTax
                            ? "bg-emerald-800 text-emerald-100"
                            : "bg-slate-300 text-slate-900"
                          : "bg-slate-800 text-slate-400"
                      }`}
                    >
                      {cat.count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Statutes Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredStatutes.map((item) => {
                const Icon = getCategoryIcon(item.category);
                const isIncomeTax = item.category === "Income Tax";

                return (
                  <div
                    key={item.id}
                    className={`rounded-2xl border transition-all duration-200 flex flex-col justify-between overflow-hidden relative ${
                      isIncomeTax
                        ? "bg-slate-900/90 border-emerald-600/40 hover:border-emerald-500 shadow-md shadow-emerald-950/30"
                        : "bg-slate-900/80 border-slate-800 hover:border-slate-700 shadow-sm"
                    }`}
                  >
                    {isIncomeTax && (
                      <div className="h-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-600 w-full" />
                    )}

                    <div className="p-5 flex-1">
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-md bg-slate-800 border border-slate-700/80 text-slate-300 font-mono text-xs font-bold flex items-center justify-center shrink-0">
                            #{item.id}
                          </span>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                              isIncomeTax
                                ? "bg-emerald-950 text-emerald-300 border-emerald-700/70"
                                : "bg-slate-800/90 text-slate-300 border-slate-700"
                            }`}
                          >
                            {item.category}
                          </span>
                        </div>

                        {item.statusBadge && (
                          <span
                            className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                              item.isRepealed
                                ? "bg-rose-950/80 text-rose-300 border border-rose-800"
                                : isIncomeTax
                                ? "bg-emerald-950/60 text-emerald-300 border border-emerald-800/60"
                                : "bg-slate-800 text-slate-300"
                            }`}
                          >
                            {item.statusBadge}
                          </span>
                        )}
                      </div>

                      <h3 className="text-base font-bold text-white tracking-tight leading-snug mb-2 group-hover:text-emerald-300 transition">
                        {item.title}
                      </h3>

                      {item.sourceRef && (
                        <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mb-3">
                          <span className="text-slate-500 font-medium">Source Ref:</span>
                          <span className="font-mono text-slate-300 font-semibold bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800">
                            {item.sourceRef}
                          </span>
                        </div>
                      )}

                      <p className="text-xs text-slate-300 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="px-5 py-3.5 bg-slate-950/60 border-t border-slate-800/80 flex items-center justify-between gap-2">
                      <button
                        onClick={() => {
                          const text = `[ID: ${item.id}] ${item.title}\nCategory: ${item.category}\nSource: ${item.sourceRef || "N/A"}\n\n${item.description}`;
                          navigator.clipboard.writeText(text);
                          setCopiedId(item.id);
                          setTimeout(() => setCopiedId(null), 2000);
                        }}
                        className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 transition"
                        title="Copy item details"
                      >
                        {copiedId === item.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-300 font-semibold">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={() =>
                          onNavigateToChat &&
                          onNavigateToChat(
                            `Provide a comprehensive legal analysis and statutory interpretation of ${item.title} (${item.sourceRef || item.category}).`
                          )
                        }
                        className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition"
                      >
                        <span>Analyze with AI</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 3: WITHHOLDING TAX DIRECTORY MATRIX (SEC 148 - 153 & BEYOND)        */}
        {/* ========================================================================= */}
        {activeTab === "wht-matrix" && (
          <div className="space-y-6">
            <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-2xl flex items-start gap-3">
              <Percent className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-bold text-white">Withholding Tax (WHT) National Directory Matrix</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Complete withholding tax rates for Active Taxpayers List (ATL) filers vs Non-Filers under the Tenth Schedule, covering Imports, Salaries, Dividends, Profit on Debt, Non-Residents, and Goods / Services / Contracts under Section 153.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {allWithholdingSections.map((sec) => (
                <div
                  key={sec.id}
                  className="bg-slate-900/90 border border-slate-800 hover:border-rose-600/50 rounded-xl p-5 flex flex-col justify-between transition-all shadow-sm"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-700">
                        {sec.sectionCode}
                      </span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                        Chapter X / Part V
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-white mb-2">{sec.title}</h4>
                    <p className="text-xs text-slate-300 mb-3">{sec.summary}</p>

                    {sec.withholdingRates && (
                      <div className="grid grid-cols-2 gap-2 mb-3">
                        <div className="p-2.5 bg-emerald-950/40 border border-emerald-800/40 rounded-lg">
                          <span className="text-[10px] uppercase font-bold text-emerald-400 block mb-1">
                            ATL Filer Rates:
                          </span>
                          <span className="text-xs text-emerald-200 font-mono font-semibold">
                            {sec.withholdingRates.filerRate}
                          </span>
                        </div>
                        <div className="p-2.5 bg-rose-950/40 border border-rose-800/40 rounded-lg">
                          <span className="text-[10px] uppercase font-bold text-rose-400 block mb-1">
                            Non-Filer (10th Sched):
                          </span>
                          <span className="text-xs text-rose-200 font-mono font-semibold">
                            {sec.withholdingRates.nonFilerRate}
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="space-y-1 bg-slate-950/80 p-3 rounded-lg border border-slate-800 text-xs text-slate-300 mb-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                        Operational Withholding Rules:
                      </span>
                      {sec.keyProvisions.map((p, idx) => (
                        <div key={idx} className="flex items-start gap-1.5">
                          <span className="text-rose-400 font-bold">•</span>
                          <span>{p}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                    <button
                      onClick={() => handleCopySection(sec)}
                      className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 transition"
                    >
                      {copiedId === sec.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-300 font-semibold">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Rates</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() =>
                        onNavigateToChat &&
                        onNavigateToChat(
                          `Provide detailed withholding tax compliance guidelines, exemption rules under Section 159, and CPR electronic deposit procedure for ${sec.sectionCode} (${sec.title}).`
                        )
                      }
                      className="px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition shadow-sm"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Consult AI</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* MODAL / SLIDE-OVER FOR FULL SECTION DETAILS                               */}
        {/* ========================================================================= */}
        {selectedSectionDetail && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 space-y-5">
              <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-700">
                      {selectedSectionDetail.sectionCode}
                    </span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      {selectedSectionDetail.headOfIncome}
                    </span>
                  </div>
                  <h2 className="text-lg font-extrabold text-white">
                    {selectedSectionDetail.title}
                  </h2>
                </div>

                <button
                  onClick={() => setSelectedSectionDetail(null)}
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-xs text-slate-300">
                <div>
                  <h4 className="font-bold text-white uppercase text-[11px] mb-1">Statutory Summary:</h4>
                  <p className="leading-relaxed bg-slate-950 p-3 rounded-lg border border-slate-800">
                    {selectedSectionDetail.summary}
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-white uppercase text-[11px] mb-1.5">Key Legal Sub-Sections:</h4>
                  <div className="space-y-1.5 bg-slate-950 p-3 rounded-lg border border-slate-800">
                    {selectedSectionDetail.keyProvisions.map((prov, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <span className="text-emerald-400 font-bold">•</span>
                        <span>{prov}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {selectedSectionDetail.statutoryRatesOrLimits && (
                  <div>
                    <h4 className="font-bold text-white uppercase text-[11px] mb-1">Statutory Rates & Thresholds:</h4>
                    <p className="font-mono text-emerald-300 bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                      {selectedSectionDetail.statutoryRatesOrLimits}
                    </p>
                  </div>
                )}

                <div className="p-3 bg-amber-950/30 border border-amber-800/50 rounded-lg text-amber-200">
                  <h4 className="font-bold text-amber-300 uppercase text-[11px] mb-1 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>FBR Audit Practice & Appellate Defense:</span>
                  </h4>
                  <p className="leading-relaxed">{selectedSectionDetail.fbrPracticeAndDefense}</p>
                </div>

                {selectedSectionDetail.fbrCircularOrPrecedent && (
                  <div>
                    <h4 className="font-bold text-white uppercase text-[11px] mb-1">Judicial Precedent / Binding Circular:</h4>
                    <p className="text-slate-300 italic bg-slate-950 p-2.5 rounded-lg border border-slate-800 font-serif">
                      {selectedSectionDetail.fbrCircularOrPrecedent}
                    </p>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
                <button
                  onClick={() => handleCopySection(selectedSectionDetail)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition"
                >
                  <Copy className="w-4 h-4" />
                  <span>Copy Citation</span>
                </button>

                <div className="flex items-center gap-2">
                  {onOpenNoticeDrafter && (
                    <button
                      onClick={() => {
                        const code = selectedSectionDetail.sectionCode;
                        setSelectedSectionDetail(null);
                        onOpenNoticeDrafter(code);
                      }}
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition"
                    >
                      <FileText className="w-4 h-4 text-emerald-400" />
                      <span>Draft Legal Notice</span>
                    </button>
                  )}

                  <button
                    onClick={() => {
                      const prompt = `Provide a full legal opinion and defense strategy under ${selectedSectionDetail.sectionCode} (${selectedSectionDetail.title}) of the Income Tax Ordinance 2001.`;
                      setSelectedSectionDetail(null);
                      if (onNavigateToChat) onNavigateToChat(prompt);
                    }}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Consult Legal AI</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
