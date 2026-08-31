import React, { useState, useEffect } from "react";
import {
  Gavel,
  BookOpen,
  BellRing,
  BookmarkCheck,
  Layers,
  Newspaper,
  CalendarDays,
  FileSpreadsheet,
  Calculator,
  FileCheck,
  Search,
  Filter,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Download,
  Share2,
  FileText,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Scale,
  Sparkles,
  Building2,
  DollarSign,
  ShieldCheck,
  RefreshCw,
  Tag,
  FileCode2,
  FileDigit
} from "lucide-react";
import { INCOME_TAX_SECTIONS_DATA } from "../utils/incomeTaxLegalData";
import { INCOME_TAX_RULES_DATA } from "../utils/incomeTaxRulesData";
import { STATUTE_SECTIONS } from "../utils/salesTaxLegalData";
import { ALLIED_TAX_LAWS_DATA } from "../utils/specializedAlliedTaxLawsData";

interface LegalPortalSuiteViewProps {
  activeModule: string;
  onNavigateToChat?: (initialPrompt?: string) => void;
  onOpenPricing?: () => void;
}

export const LegalPortalSuiteView: React.FC<LegalPortalSuiteViewProps> = ({
  activeModule,
  onNavigateToChat,
  onOpenPricing,
}) => {
  // Global search & filters per module
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [versionFilter, setVersionFilter] = useState<"all" | "current" | "old">("current");
  const [statuteActFilter, setStatuteActFilter] = useState<string>("all");
  const [selectedYear, setSelectedYear] = useState<string>("2025-2026");

  // Interactive Tax Calculator State inside Tax Rates view
  const [calcAnnualSalary, setCalcAnnualSalary] = useState<number>(2400000);
  const [calcTurnover, setCalcTurnover] = useState<number>(15000000);
  const [calcWhtSection, setCalcWhtSection] = useState<string>("153_goods");

  // Custom Tariff live calculator
  const [customsItemValueUsd, setCustomsItemValueUsd] = useState<number>(1000);
  const [usdToPkr, setUsdToPkr] = useState<number>(280);

  // Dynamic data states
  const [statutes, setStatutes] = useState<any[]>([]);
  const [dictionaryTerms, setDictionaryTerms] = useState<any[]>([]);
  const [tariffItems, setTariffItems] = useState<any[]>([]);
  const [newsFeed, setNewsFeed] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchModuleData();
  }, [activeModule]);

  const fetchModuleData = async () => {
    setLoading(true);
    try {
      if (activeModule === "portal-statutes") {
        const res = await fetch("/api/portal/statutes");
        if (res.ok && res.headers.get('content-type')?.includes('application/json')) {
          setStatutes(await res.json());
        }
      } else if (activeModule === "portal-dictionary") {
        const res = await fetch("/api/portal/dictionary");
        if (res.ok && res.headers.get('content-type')?.includes('application/json')) {
          setDictionaryTerms(await res.json());
        }
      } else if (activeModule === "portal-custom-tariff") {
        const res = await fetch("/api/portal/custom-tariff");
        if (res.ok && res.headers.get('content-type')?.includes('application/json')) {
          setTariffItems(await res.json());
        }
      } else if (activeModule === "portal-tax-news") {
        const res = await fetch("/api/portal/news");
        if (res.ok && res.headers.get('content-type')?.includes('application/json')) {
          setNewsFeed(await res.json());
        }
      }
    } catch (e) {
      console.error("Failed to load portal data", e);
    } finally {
      setLoading(false);
    }
  };

  // 1. Calculate Salary Tax
  const computeSalaryTax = (annual: number) => {
    if (annual <= 600000) return { tax: 0, slab: "Slab 1 (0%)", monthly: 0 };
    if (annual <= 1200000) {
      const tax = (annual - 600000) * 0.05;
      return { tax, slab: "Slab 2 (5%)", monthly: Math.round(tax / 12) };
    }
    if (annual <= 2200000) {
      const tax = 30000 + (annual - 1200000) * 0.15;
      return { tax, slab: "Slab 3 (15%)", monthly: Math.round(tax / 12) };
    }
    if (annual <= 3200000) {
      const tax = 180000 + (annual - 2200000) * 0.25;
      return { tax, slab: "Slab 4 (25%)", monthly: Math.round(tax / 12) };
    }
    if (annual <= 4100000) {
      const tax = 430000 + (annual - 3200000) * 0.30;
      return { tax, slab: "Slab 5 (30%)", monthly: Math.round(tax / 12) };
    }
    const tax = 700000 + (annual - 4100000) * 0.35;
    return { tax, slab: "Slab 6 (35%)", monthly: Math.round(tax / 12) };
  };

  const currentSalaryCalc = computeSalaryTax(calcAnnualSalary);

  // =========================================================================
  // VIEW: CASE LAWS & ARCHIVE
  // =========================================================================
  if (activeModule === "portal-case-laws") {
    const caseLaws = [
      {
        citation: "2024 SCMR 1102 SC",
        title: "Messrs Indus Motors Co. Ltd vs Commissioner Inland Revenue, Large Taxpayers Office",
        court: "Supreme Court of Pakistan",
        year: 2024,
        isCurrent: true,
        summary: "Scope of Section 8(1)(ca) of Sales Tax Act 1990. Held that innocent bona fide buyers who made payments via banking channels under Section 73 cannot be penalized for subsequent supplier blacklisting unless active fraud or collusion is proved by the department.",
        holding: "Input tax deduction is a statutory entitlement upon verification of CPR and banking proof.",
        sections: "Section 8(1)(ca), Section 73, Section 21",
        version: "Current Precedent"
      },
      {
        citation: "2023 PTD 1450 Lah",
        title: "Al-Hamd Textile Mills Ltd vs Federation of Pakistan & FBR",
        court: "Lahore High Court",
        year: 2023,
        isCurrent: true,
        summary: "Challenge against 90% input tax restriction under Section 8B. Court held that while the legislature has power to cap adjustable input tax, the department must expeditiously refund excess unadjusted input tax under Section 10.",
        holding: "Section 8B is constitutionally valid provided refund mechanisms under Section 10 remain operational.",
        sections: "Section 8B, Section 10",
        version: "Current Precedent"
      },
      {
        citation: "2019 PTD 410 SC (Old Law)",
        title: "Messrs Orient Electronics vs Deputy Commissioner Inland Revenue",
        court: "Supreme Court of Pakistan",
        year: 2019,
        isCurrent: false,
        summary: "Pre-2020 interpretation of Section 11(2) best judgment assessments where no formal show-cause notice was served prior to issuance of demand notice. (Superseded by Finance Act 2021 amendments).",
        holding: "Department was previously allowed summary recovery. Now superseded by mandatory 30-day statutory notice.",
        sections: "Section 11(2), Section 45B",
        version: "Old Version (Superseded)"
      }
    ];

    const filteredCases = caseLaws.filter(c => {
      const matchVersion = 
        versionFilter === "all" ? true :
        versionFilter === "current" ? c.isCurrent : !c.isCurrent;
      const matchQuery = 
        c.citation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.sections.toLowerCase().includes(searchQuery.toLowerCase());
      return matchVersion && matchQuery;
    });

    return (
      <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
        {/* Module Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-950 p-6 rounded-2xl border border-slate-800 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Gavel className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-black text-white">Case Laws & Judicial Archive</h1>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-700 font-bold">
                  High Court & SC Precedents
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Authoritative rulings on Sales Tax Act 1990, Income Tax Ordinance 2001, and ATIR appellate orders.
              </p>
            </div>
          </div>

          {/* Old vs Current Version Filter Toggle */}
          <div className="flex items-center gap-2 bg-slate-900 p-1.5 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-400 pl-2 font-medium">Jurisprudence:</span>
            <button
              onClick={() => setVersionFilter("current")}
              className={`px-3 py-1 text-xs rounded-lg font-bold transition ${
                versionFilter === "current"
                  ? "bg-emerald-600 text-white shadow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Current Law (Active)
            </button>
            <button
              onClick={() => setVersionFilter("old")}
              className={`px-3 py-1 text-xs rounded-lg font-bold transition ${
                versionFilter === "old"
                  ? "bg-amber-600 text-white shadow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Old Version / Superseded
            </button>
            <button
              onClick={() => setVersionFilter("all")}
              className={`px-3 py-1 text-xs rounded-lg font-bold transition ${
                versionFilter === "all"
                  ? "bg-slate-700 text-white shadow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              All Citations
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search citation (e.g. 2024 SCMR, PTD), parties, section code (e.g. Section 8B, 73), or legal principle..."
            className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition"
          />
        </div>

        {/* Case Cards Grid */}
        <div className="grid grid-cols-1 gap-4">
          {filteredCases.map((c, idx) => (
            <div
              key={idx}
              className="bg-slate-950 p-5 rounded-2xl border border-slate-800/90 hover:border-slate-700 transition space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-xs font-black text-amber-300 px-2.5 py-1 bg-amber-950/80 border border-amber-800 rounded-lg">
                    {c.citation}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">{c.court} ({c.year})</span>
                </div>
                <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full border ${
                  c.isCurrent
                    ? "bg-emerald-950 text-emerald-300 border-emerald-700"
                    : "bg-amber-950 text-amber-300 border-amber-700"
                }`}>
                  {c.version}
                </span>
              </div>

              <h3 className="text-sm font-bold text-white leading-snug">{c.title}</h3>

              <div className="bg-slate-900/90 p-3.5 rounded-xl border border-slate-800 space-y-2">
                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong className="text-slate-200">Ratio Decidendi:</strong> {c.summary}
                </p>
                <div className="pt-2 border-t border-slate-800 flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <p className="text-xs text-emerald-300 font-medium">
                    <strong>Legal Principle:</strong> {c.holding}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] text-slate-400 font-mono">
                  Cited Sections: <span className="text-slate-300">{c.sections}</span>
                </span>
                <button
                  onClick={() => onNavigateToChat && onNavigateToChat(`Explain judicial precedent ${c.citation} and how it applies to my FBR audit.`)}
                  className="flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 font-bold"
                >
                  <span>Consult in AI Chat</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW: STATUTES DATABASE
  // =========================================================================
  if (activeModule === "portal-statutes") {
    // Generate combined local database matching StatuteSection interface
    const mappedIncomeTaxSections = INCOME_TAX_SECTIONS_DATA.map(item => ({
      id: item.id,
      act_type: item.act_type,
      chapter: item.chapter || (item.part_division ? `${item.part_division}` : "Income Tax Ordinance, 2001"),
      section: item.section_code,
      title: item.title,
      description: item.description,
      sub_sections: Array.isArray(item.sub_sections) ? item.sub_sections.join(" \n• ") : (item.sub_sections || ""),
      practical_notes: item.practical_notes || "",
      cross_references: Array.isArray(item.cross_references) ? item.cross_references.join(", ") : (item.cross_references || ""),
      part_division: item.part_division,
      statutory_rates_or_penalties: item.statutory_rates_or_penalties,
      fbr_precedents_and_circulars: item.fbr_precedents_and_circulars
    }));

    const mappedIncomeTaxRules = INCOME_TAX_RULES_DATA.map(rule => ({
      id: rule.id,
      act_type: rule.rule_book,
      chapter: rule.chapter || "Income Tax Rules, 2002",
      section: rule.rule_number,
      title: rule.title,
      description: rule.description,
      sub_sections: Array.isArray(rule.sub_rules) ? rule.sub_rules.join(" \n• ") : (rule.sub_rules || ""),
      practical_notes: `[Valuation Formula: ${rule.valuation_methodology || 'Prescribed Benchmark'}] — ${rule.practical_notes || ''}`,
      cross_references: Array.isArray(rule.cross_references) ? rule.cross_references.join(", ") : (rule.cross_references || ""),
      part_division: rule.chapter,
      statutory_rates_or_penalties: rule.compliance_steps
    }));

    const provincialStatutes = [
      {
        id: "stat-pra-sec14",
        act_type: "Punjab Sales Tax on Services Act, 2012 (PRA)",
        chapter: "Chapter III: Scope of Tax on Services",
        section: "Section 14",
        title: "Withholding and Deduction of Tax on Services",
        description: "Any recipient of taxable services designated as a withholding agent shall deduct sales tax on services at the rates specified in the Punjab Sales Tax on Services Withholding Rules.",
        sub_sections: "(1) Mandatory deduction by corporate recipients; (2) Responsibility for deposit by 15th of following month.",
        practical_notes: "PRA service tax standard rate is 16%, with reduced rates (5% without input adjustment) applicable on IT and telecom services.",
        cross_references: "Second Schedule to PSTSA 2012",
        part_division: "Chapter III",
        statutory_rates_or_penalties: "16% standard / 5% concessionary"
      },
      {
        id: "stat-srb-sec3",
        act_type: "Sindh Sales Tax on Services Act, 2011 (SRB)",
        chapter: "Chapter II: Scope of Tax",
        section: "Section 3",
        title: "Taxable Services and Jurisdictional Nexus",
        description: "A taxable service is a service provided, rendered, initiated, or received in the Province of Sindh. The standard rate is 15% (or 13% for specific sectors) as defined in the Second Schedule.",
        sub_sections: "(1) Economic nexus rule; (2) Reverse charge mechanism for cross-border/cross-provincial services.",
        practical_notes: "Crucial for inter-provincial disputes between SRB and FBR regarding franchise fees, software development, and construction contracts.",
        cross_references: "SRB Circular No. 02 of 2024",
        part_division: "Chapter II",
        statutory_rates_or_penalties: "15% standard rate"
      }
    ];

    const mappedAlliedLaws = ALLIED_TAX_LAWS_DATA.map(item => ({
      id: item.id,
      act_type: item.act_type,
      chapter: item.chapter || item.category,
      section: item.section_or_rule,
      title: item.title,
      description: item.description,
      sub_sections: Array.isArray(item.sub_provisions) ? item.sub_provisions.join(" \n• ") : (item.sub_provisions || ""),
      practical_notes: `[Ref: ${item.page_reference || 'Statutory'}] — ${item.practical_notes || ''}`,
      cross_references: Array.isArray(item.cross_references) ? item.cross_references.join(", ") : (item.cross_references || ""),
      part_division: item.category,
      statutory_rates_or_penalties: item.statutory_rates_or_penalties || item.compliance_steps
    }));

    const allLocalStatutes = [
      ...mappedIncomeTaxSections,
      ...mappedIncomeTaxRules,
      ...mappedAlliedLaws,
      ...STATUTE_SECTIONS,
      ...provincialStatutes
    ];

    const statutesList = statutes.length > 0 ? statutes : allLocalStatutes;

    const filteredStatutes = statutesList.filter(s => {
      let matchAct = true;
      if (statuteActFilter === "all") {
        matchAct = true;
      } else if (statuteActFilter === "Income Tax") {
        matchAct = s.act_type.toLowerCase().includes("income tax ordinance");
      } else if (statuteActFilter === "Income Tax Rules") {
        matchAct = s.act_type.toLowerCase().includes("income tax rules, 2002") || s.act_type.toLowerCase().includes("income tax rules 2002");
      } else if (statuteActFilter === "Tribunal Rules") {
        matchAct = s.act_type.toLowerCase().includes("appellate tribunal") || s.act_type.toLowerCase().includes("atir") || s.act_type.toLowerCase().includes("supreme court");
      } else if (statuteActFilter === "Amnesty & Declarations") {
        matchAct = s.act_type.toLowerCase().includes("assets declaration") || s.act_type.toLowerCase().includes("voluntary declaration") || s.act_type.toLowerCase().includes("foreign assets (declaration");
      } else if (statuteActFilter === "CRS Guidance") {
        matchAct = s.act_type.toLowerCase().includes("common reporting standard") || s.act_type.toLowerCase().includes("crs") || s.act_type.toLowerCase().includes("civil servants");
      } else if (statuteActFilter === "Allied Acts & Levies") {
        matchAct = s.act_type.toLowerCase().includes("capital value tax") || s.act_type.toLowerCase().includes("cvt") || s.act_type.toLowerCase().includes("workers welfare fund") || s.act_type.toLowerCase().includes("inland revenue reward") || s.act_type.toLowerCase().includes("inland revenue welfare") || s.act_type.toLowerCase().includes("digital presence");
      } else if (statuteActFilter === "Assessments & Appeals") {
        matchAct = (s.chapter && (s.chapter.toLowerCase().includes("procedure") || s.chapter.toLowerCase().includes("assessments") || s.chapter.toLowerCase().includes("appeals") || s.chapter.toLowerCase().includes("tribunal"))) ||
                   (s.part_division && (s.part_division.toLowerCase().includes("assessments") || s.part_division.toLowerCase().includes("appeals")));
      } else if (statuteActFilter === "WHT & Advance Tax") {
        matchAct = (s.chapter && (s.chapter.toLowerCase().includes("advance tax") || s.chapter.toLowerCase().includes("withholding"))) ||
                   (s.part_division && (s.part_division.toLowerCase().includes("advance tax") || s.part_division.toLowerCase().includes("withholding")));
      } else if (statuteActFilter === "Schedules & Slabs") {
        matchAct = s.section.toLowerCase().includes("schedule") || (s.chapter && s.chapter.toLowerCase().includes("schedules"));
      } else if (statuteActFilter === "Sales Tax") {
        matchAct = s.act_type.toLowerCase().includes("sales tax act");
      } else if (statuteActFilter === "Provincial") {
        matchAct = s.act_type.toLowerCase().includes("punjab") || s.act_type.toLowerCase().includes("sindh") || s.act_type.toLowerCase().includes("pra") || s.act_type.toLowerCase().includes("srb");
      } else {
        matchAct = s.act_type.toLowerCase().includes(statuteActFilter.toLowerCase());
      }

      const q = searchQuery.toLowerCase().trim();
      const matchQuery = !q ? true : (
        s.section.toLowerCase().includes(q) ||
        s.title.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        (s.chapter && s.chapter.toLowerCase().includes(q)) ||
        (s.part_division && s.part_division.toLowerCase().includes(q)) ||
        (s.practical_notes && s.practical_notes.toLowerCase().includes(q)) ||
        (s.statutory_rates_or_penalties && s.statutory_rates_or_penalties.toLowerCase().includes(q)) ||
        (s.cross_references && s.cross_references.toLowerCase().includes(q))
      );

      return matchAct && matchQuery;
    });

    const quickJumpTags = [
      { label: "ATIR Apt Rules 2024", query: "ATIR (Appointments" },
      { label: "ATIR Functions 2023", query: "ATIR (Functions)" },
      { label: "Assets Decl Act 2019", query: "Assets Declaration Act" },
      { label: "ADA Rules 2019", query: "Assets Declaration (Procedure" },
      { label: "VDDA 2018 (Domestic)", query: "Voluntary Declaration" },
      { label: "FARA 2018 (Foreign)", query: "Foreign Assets (Declaration" },
      { label: "CRS Guidance (AEOI)", query: "Common Reporting Standard" },
      { label: "CVT 2022 (Luxuries)", query: "Capital Value Tax" },
      { label: "WWF Sec 4 (2% Levy)", query: "Workers Welfare Fund" },
      { label: "WWF Sec 11A (Boards)", query: "Workers Welfare Boards" },
      { label: "DPPT 2025 (Digital)", query: "Digital Presence Proceeds" },
      { label: "SC Practice Act 2023", query: "Supreme Court (Practice" },
      { label: "IR Reward Rules 2021", query: "Inland Revenue Reward" },
      { label: "IR Welfare Fund 2016", query: "Inland Revenue Welfare" },
      { label: "Civil Servants Assets 2023", query: "Civil Servants Rules" },
      { label: "Rule 1 (Definitions)", query: "Rule 1" },
      { label: "Rule 3 (Perquisites)", query: "Rule 3" },
      { label: "Rule 4 (Accommodation)", query: "Rule 4" },
      { label: "Rule 5 (Conveyance)", query: "Rule 5" },
      { label: "Rule 10 (Entertainment)", query: "Rule 10" },
      { label: "Rule 12 (Depreciation)", query: "Rule 12" },
      { label: "Rule 13 (Apportionment)", query: "Rule 13" },
      { label: "Rule 13A (Securities 37A)", query: "Rule 13A" },
      { label: "Rule 27A (CbCR MNEs)", query: "Rule 27A" },
      { label: "Rule 27K (Master/Local File)", query: "Rule 27K" },
      { label: "Rule 28 (Books of Account)", query: "Rule 28" },
      { label: "Rule 33A (POS Integrations)", query: "Rule 33A" },
      { label: "Rule 34 (Returns & Profiles)", query: "Rule 34" },
      { label: "Rule 36 (Wealth Form A)", query: "Rule 36" },
      { label: "Rule 39A (Banking Reports)", query: "Rule 39A" },
      { label: "Rule 40 (Exemption 159)", query: "Rule 40" },
      { label: "Rule 42 (WHT Certificate)", query: "Rule 42" },
      { label: "Rule 44 (WHT Statements)", query: "Rule 44" },
      { label: "Rule 46 (SWAPS Agents)", query: "Rule 46" },
      { label: "Rule 67 (Prescribed Forms)", query: "Rule 67" },
      { label: "Rule 76 (CIR Appeals Portal)", query: "Rule 76" },
      { label: "Rule 78A (CRS Due Diligence)", query: "Rule 78A" },
      { label: "Rule 79 (NTN & Enrolment)", query: "Rule 79" },
      { label: "Rule 83A (Beneficial Owners)", query: "Rule 83A" },
      { label: "Rule 84 (Tax Practitioners)", query: "Rule 84" },
      { label: "Rule 91 (Provident Funds)", query: "Rule 91" },
      { label: "Rule 108 (Superannuation)", query: "Rule 108" },
      { label: "Rule 115 (Gratuity Funds)", query: "Rule 115" },
      { label: "Rule 122 (Tax Recovery)", query: "Rule 122" },
      { label: "Rule 136 (Movable Seizure)", query: "Rule 136" },
      { label: "Rule 158 (Immovable Auction)", query: "Rule 158" },
      { label: "Rule 179 (Receivers & Arrest)", query: "Rule 179" },
      { label: "Rule 210A (Bank Freezing 140)", query: "Rule 210A" },
      { label: "Rule 210IA (CITRO Refunds)", query: "Rule 210IA" },
      { label: "Rule 211 (NPO Approvals)", query: "Rule 211" },
      { label: "Rule 220C (Greenfield Units)", query: "Rule 220C" },
      { label: "Rule 221 (Clearance 145)", query: "Rule 221" },
      { label: "Rule 224 (Valuers & E-Audit)", query: "Rule 224" },
      { label: "First Sched (Forms FTC/122/140)", query: "First Schedule" },
      { label: "Sec 114 (Returns)", query: "Section 114" },
      { label: "Sec 122 (Amendment)", query: "Section 122" },
      { label: "Sec 127 (Appeals)", query: "Section 127" },
      { label: "Sec 140 (Bank Freeze)", query: "Section 140" },
      { label: "Sec 159 (Exemption)", query: "Section 159" },
      { label: "Sec 177 (Audit)", query: "Section 177" }
    ];

    return (
      <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
        {/* Module Header */}
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-black text-white">Pakistani Tax Statutes & Rules Repository</h1>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-700 font-bold">
                  {filteredStatutes.length} Provisions
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Income Tax Ordinance 2001 (Assessments to Schedules 1-15), Income Tax Rules 2002 (Rules 1-79), Sales Tax Act 1990, & Provincial Acts.
              </p>
            </div>
          </div>

          {/* Act Filter Pills */}
          <div className="flex flex-wrap gap-1.5 bg-slate-900 p-1.5 rounded-xl border border-slate-800">
            {[
              { key: "all", label: "All Statutes & Rules" },
              { key: "Income Tax", label: "Income Tax Ordinance 2001" },
              { key: "Income Tax Rules", label: "Income Tax Rules 2002" },
              { key: "Tribunal Rules", label: "Tribunal Rules (ATIR 2024/2023)" },
              { key: "Amnesty & Declarations", label: "Amnesty & Asset Acts (2019/2018)" },
              { key: "CRS Guidance", label: "CRS Guidance & FATF (AEOI)" },
              { key: "Allied Acts & Levies", label: "Allied Acts (CVT, WWF, IR Welfare)" },
              { key: "Assessments & Appeals", label: "Assessments & Appeals" },
              { key: "WHT & Advance Tax", label: "WHT & Advance Tax" },
              { key: "Schedules & Slabs", label: "Schedules 1-15" },
              { key: "Sales Tax", label: "Sales Tax Act 1990" },
              { key: "Provincial", label: "Provincial (PRA/SRB)" }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setStatuteActFilter(tab.key)}
                className={`px-3 py-1.5 text-xs rounded-lg font-bold transition whitespace-nowrap ${
                  statuteActFilter === tab.key
                    ? "bg-emerald-600 text-white shadow"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Quick Jump Bar */}
        <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800/80">
          <div className="flex items-center gap-2 mb-2">
            <Tag className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider">Quick Section & Rule Lookups:</span>
          </div>
          <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto pr-1">
            {quickJumpTags.map((tag, i) => (
              <button
                key={i}
                onClick={() => setSearchQuery(tag.query)}
                className={`text-[11px] px-2.5 py-1 rounded-md font-mono transition border ${
                  searchQuery.toLowerCase() === tag.query.toLowerCase()
                    ? "bg-amber-500 text-slate-950 font-bold border-amber-400"
                    : "bg-slate-950 text-slate-300 border-slate-800 hover:border-amber-500/50 hover:text-white"
                }`}
              >
                {tag.label}
              </button>
            ))}
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="text-[11px] px-2.5 py-1 rounded-md bg-rose-950/60 text-rose-300 border border-rose-800 hover:bg-rose-900 transition font-bold"
              >
                Clear Search
              </button>
            )}
          </div>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search reference (e.g. Section 122, Section 236K, First Schedule Division VII, Rule 23, Fourteenth Schedule, Transfer Pricing)..."
            className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition"
          />
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-slate-400 px-1">
          <span>Showing <strong className="text-white">{filteredStatutes.length}</strong> matching statutory provisions & rules</span>
          {searchQuery && (
            <span>Filter: <code className="text-emerald-400 font-mono">"{searchQuery}"</code></span>
          )}
        </div>

        {/* Statutes Cards */}
        <div className="space-y-4">
          {filteredStatutes.length === 0 ? (
            <div className="bg-slate-950 p-12 text-center rounded-2xl border border-slate-800 space-y-3">
              <BookOpen className="w-12 h-12 text-slate-600 mx-auto" />
              <h3 className="text-base font-bold text-white">No Matching Statutory Provisions Found</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                No sections or rules matched your current search filters. Try clearing the filter or searching for standard references like "Section 122", "Rule 25", or "Schedules".
              </p>
              <button
                onClick={() => { setSearchQuery(""); setStatuteActFilter("all"); }}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition inline-flex items-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset All Filters</span>
              </button>
            </div>
          ) : (
            filteredStatutes.map((s, idx) => (
              <div key={idx} className="bg-slate-950 p-6 rounded-2xl border border-slate-800 hover:border-slate-700 transition shadow-lg space-y-3.5">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-black text-emerald-300 px-3 py-1 bg-emerald-950/90 border border-emerald-700 rounded-lg">
                      {s.section}
                    </span>
                    <span className="text-xs font-semibold text-slate-300">{s.act_type}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {s.part_division && (
                      <span className="text-[10px] text-amber-300 font-mono bg-amber-950/60 px-2.5 py-0.5 rounded border border-amber-800/60">
                        {s.part_division}
                      </span>
                    )}
                    {s.chapter && s.chapter !== s.part_division && (
                      <span className="text-[10px] text-slate-400 font-mono bg-slate-900 px-2.5 py-0.5 rounded border border-slate-800">
                        {s.chapter}
                      </span>
                    )}
                  </div>
                </div>

                <h3 className="text-base font-black text-white flex items-center gap-2">
                  <span>{s.title}</span>
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/70 p-3.5 rounded-xl border border-slate-800/80 font-normal">
                  {s.description}
                </p>

                {s.statutory_rates_or_penalties && (
                  <div className="text-xs bg-emerald-950/30 p-3 rounded-lg border border-emerald-800/40 text-emerald-300">
                    <strong className="text-emerald-200">Statutory Rates / Penalties / Compliance:</strong> {s.statutory_rates_or_penalties}
                  </div>
                )}

                {s.sub_sections && (
                  <div className="text-xs text-slate-300 bg-slate-900/50 p-3.5 rounded-lg border border-slate-800/60 space-y-1">
                    <div className="text-slate-400 font-bold uppercase tracking-wider text-[10px] flex items-center gap-1.5">
                      <FileDigit className="w-3.5 h-3.5 text-slate-400" />
                      <span>Itemized Sub-Sections & Legal Provisos:</span>
                    </div>
                    <div className="whitespace-pre-line text-slate-300 pl-2 leading-relaxed">
                      {s.sub_sections}
                    </div>
                  </div>
                )}

                {s.practical_notes && (
                  <div className="flex items-start gap-2.5 text-xs text-amber-300 bg-amber-950/30 p-3.5 rounded-lg border border-amber-800/40">
                    <Sparkles className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
                    <div>
                      <strong className="text-amber-200">Senior Advocate Practice Notes & Traps:</strong> {s.practical_notes}
                    </div>
                  </div>
                )}

                {s.fbr_precedents_and_circulars && (
                  <div className="text-xs bg-slate-900/80 p-2.5 rounded-lg border border-slate-800 text-slate-400 flex items-center gap-2">
                    <Gavel className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                    <span><strong className="text-sky-300">Judicial Precedents & Circulars:</strong> {s.fbr_precedents_and_circulars}</span>
                  </div>
                )}

                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800/60">
                  <span className="text-[11px] text-slate-400 font-mono">
                    Cross-Ref: <span className="text-slate-300">{s.cross_references || "None"}</span>
                  </span>
                  <button
                    onClick={() => onNavigateToChat && onNavigateToChat(`Provide an authoritative legal interpretation, calculation examples, and recent judicial precedents for ${s.section} (${s.title}) of ${s.act_type}.`)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-700/60 rounded-lg text-xs font-bold transition"
                  >
                    <span>Interpret in AI Chat</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW: LEGAL DICTIONARY
  // =========================================================================
  if (activeModule === "portal-dictionary") {
    const terms = dictionaryTerms.length > 0 ? dictionaryTerms : [
      {
        id: "dict-1",
        term: "Active Taxpayer List (ATL)",
        urdu_title: "ایکٹو ٹیکس پیئر لسٹ",
        category: "Taxation",
        definition: "The active taxpayer list published by the FBR on its official web portal under Section 181A of the Income Tax Ordinance, 2001. Filers on ATL enjoy 50% lower withholding tax rates on banking, property, vehicle registrations, and contracts.",
        statutory_reference: "Section 181A & Tenth Schedule, Income Tax Ordinance 2001",
        practical_example: "A person buying a car on ATL pays 1% advance tax, whereas a non-ATL person pays up to 3% to 4%.",
        related_terms: "Late Filer, 10th Schedule Surcharge, Surcharge for Non-Filer"
      },
      {
        id: "dict-2",
        term: "Withholding Agent",
        urdu_title: "ودہولڈنگ ایجنٹ",
        category: "Taxation",
        definition: "Any person or entity statutorily obligated under Division II, III, or IV of Part V of Chapter X to deduct or collect advance income tax at source from payments made to suppliers, service providers, landlords, or employees and deposit it with the State Bank / FBR.",
        statutory_reference: "Section 153, 149, 155, 161, Income Tax Ordinance 2001",
        practical_example: "A corporate entity paying a vendor invoice of PKR 500,000 must deduct 5.5% (goods) or 11% (services) before remitting the balance.",
        related_terms: "Section 161 Assessment, e-Payment CPR, Monthly WHT Statement"
      },
      {
        id: "dict-3",
        term: "Best Judgment Assessment",
        urdu_title: "بہترین فیصلے کا ٹیکس تخمینہ",
        category: "Litigation",
        definition: "An assessment framed by a Commissioner Inland Revenue when a taxpayer fails to file a return, comply with a statutory notice under Section 114/116, or furnish books of accounts under Section 177. The officer estimates taxable income based on available evidence and market nexus.",
        statutory_reference: "Section 121, Income Tax Ordinance 2001 & Section 11(2), Sales Tax Act 1990",
        practical_example: "If an importer fails to explain declared sales, the CIR assesses tax based on industry gross margin averages.",
        related_terms: "Section 122 Amendment of Assessment, Show Cause Notice, ATIR Precedent"
      },
      {
        id: "dict-4",
        term: "Normal Tax Regime (NTR) vs Final Tax Regime (FTR)",
        urdu_title: "نارمل بمقابلہ فائنل ٹیکس رجیم",
        category: "Taxation",
        definition: "Under NTR, tax is computed on net taxable income (gross revenue minus allowable business deductions). Under FTR (or Minimum Tax Regime MTR), the tax deducted at source is treated as full and final discharge of tax liability with zero expense deductions allowed.",
        statutory_reference: "Section 4, 153, 154 (Exports), 169, Income Tax Ordinance 2001",
        practical_example: "Commercial export proceeds are taxed at 1% under FTR, whereas manufacturing exports are governed under NTR with full profit and loss filing.",
        related_terms: "Section 113, Minimum Tax, Tax Credit Sec 65"
      }
    ];

    const filteredTerms = terms.filter(t => {
      const matchCat = selectedCategory === "all" ? true : t.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchQuery = 
        t.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.definition.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (t.urdu_title && t.urdu_title.includes(searchQuery)) ||
        (t.statutory_reference && t.statutory_reference.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCat && matchQuery;
    });

    return (
      <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-black text-white">Pakistani Legal & Tax Dictionary</h1>
              <p className="text-xs text-slate-400 mt-0.5">
                Glossary of Pakistani commercial, taxation, and appellate terminology with Urdu equivalents.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5 bg-slate-900 p-1.5 rounded-xl border border-slate-800">
            {["all", "Taxation", "Litigation", "Corporate", "Customs"].map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCategory(c)}
                className={`px-3 py-1 text-xs rounded-lg font-bold transition ${
                  selectedCategory === c
                    ? "bg-indigo-600 text-white shadow"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {c === "all" ? "All Terms" : c}
              </button>
            ))}
          </div>
        </div>

        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search legal term (e.g. ATL, Withholding Agent, Best Judgment, FTR), Urdu term, or section..."
            className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredTerms.map((t, idx) => (
            <div key={idx} className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                <div>
                  <h3 className="text-sm font-bold text-white">{t.term}</h3>
                  {t.urdu_title && <span className="text-xs text-emerald-400 font-sans">{t.urdu_title}</span>}
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800 font-medium">
                  {t.category}
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">{t.definition}</p>

              {t.statutory_reference && (
                <div className="text-[11px] text-slate-400 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80">
                  <strong className="text-slate-300">Statutory Authority:</strong> {t.statutory_reference}
                </div>
              )}

              {t.practical_example && (
                <div className="text-[11px] text-emerald-300 bg-emerald-950/30 p-2.5 rounded-lg border border-emerald-800/40">
                  <strong className="text-emerald-200">Practical Example:</strong> {t.practical_example}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW: CUSTOM TARIFF (HS CODES)
  // =========================================================================
  if (activeModule === "portal-custom-tariff") {
    const tariffs = tariffItems.length > 0 ? tariffItems : [
      {
        id: "tariff-8517-13",
        hs_code: "8517.13.00",
        chapter_number: 85,
        description: "Smartphones and cellular telecommunications handsets (CKD / CBU)",
        custom_duty_rate: "PKR 5,000 / unit fixed + 11% ad valorem",
        regulatory_duty: "PKR 3,000 - 15,000 based on C&F Tier",
        additional_custom_duty: "2%",
        sales_tax_rate: "18% (Tier-1) or 25% on luxury handsets > $500",
        advance_income_tax_wht: "5.5% (Filer) / 11% (Non-Filer) under Sec 148",
        import_restriction: "PTA Type Approval & COC Required"
      },
      {
        id: "tariff-8471-30",
        hs_code: "8471.30.10",
        chapter_number: 84,
        description: "Portable automatic data processing machines (Laptops, Notebooks & Tablets)",
        custom_duty_rate: "0% (Concessionary)",
        regulatory_duty: "0%",
        additional_custom_duty: "2%",
        sales_tax_rate: "18%",
        advance_income_tax_wht: "1% (Filer) / 2% (Non-Filer) for capital IT goods",
        import_restriction: "Free / Commercial Import Permitted"
      },
      {
        id: "tariff-8541-43",
        hs_code: "8541.43.00",
        chapter_number: 85,
        description: "Photovoltaic solar cells, assembled in modules or made up into panels",
        custom_duty_rate: "0% (Fifth Schedule Concession)",
        regulatory_duty: "0%",
        additional_custom_duty: "0%",
        sales_tax_rate: "0% / Exempt under Sixth Schedule Table-1",
        advance_income_tax_wht: "0% under Section 148 exemption clause",
        import_restriction: "Certified under IEC/TUV standards"
      }
    ];

    const filteredTariffs = tariffs.filter(t => 
      t.hs_code.includes(searchQuery) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-black text-white">Pakistan Customs Tariff & HS Codes</h1>
              <p className="text-xs text-slate-400 mt-0.5">
                First Schedule to Customs Act 1969. Custom Duty (CD), Regulatory Duty (RD), ACD, Sales Tax & Section 148 WHT.
              </p>
            </div>
          </div>
        </div>

        {/* Live Import Duty Estimation Tool */}
        <div className="bg-slate-950 p-5 rounded-2xl border border-cyan-900/40 space-y-4">
          <div className="flex items-center gap-2">
            <Calculator className="w-4 h-4 text-cyan-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-300">Quick C&F Landed Cost Estimator</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Invoice Value (USD $)</label>
              <input
                type="number"
                value={customsItemValueUsd}
                onChange={(e) => setCustomsItemValueUsd(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white"
              />
            </div>
            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Exchange Rate (PKR / USD)</label>
              <input
                type="number"
                value={usdToPkr}
                onChange={(e) => setUsdToPkr(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white"
              />
            </div>
            <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800 flex flex-col justify-center">
              <span className="text-[10px] text-slate-400">Assessed Import Value in PKR</span>
              <span className="text-sm font-black text-cyan-300">
                PKR {(customsItemValueUsd * usdToPkr).toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search HS Code (e.g. 8517.13.00, 8471), product name (e.g. laptop, mobile, solar, vehicle)..."
            className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition"
          />
        </div>

        {/* Tariff Items Grid */}
        <div className="space-y-4">
          {filteredTariffs.map((t, idx) => (
            <div key={idx} className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm font-black text-cyan-300 px-3 py-1 bg-cyan-950 border border-cyan-800 rounded-lg">
                    {t.hs_code}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">Chapter {t.chapter_number}</span>
                </div>
                <span className="text-xs text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded border border-emerald-800">
                  {t.import_restriction}
                </span>
              </div>

              <h3 className="text-sm font-bold text-white">{t.description}</h3>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2 text-xs">
                <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Custom Duty (CD)</span>
                  <span className="font-bold text-white">{t.custom_duty_rate}</span>
                </div>
                <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Regulatory Duty (RD)</span>
                  <span className="font-bold text-white">{t.regulatory_duty}</span>
                </div>
                <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Addl. Custom Duty</span>
                  <span className="font-bold text-white">{t.additional_custom_duty}</span>
                </div>
                <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Sales Tax Rate</span>
                  <span className="font-bold text-white">{t.sales_tax_rate}</span>
                </div>
                <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Advance WHT Sec 148</span>
                  <span className="font-bold text-emerald-300">{t.advance_income_tax_wht}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW: TAX RATES & CALCULATORS (SALARY, TURNOVER, WHT)
  // =========================================================================
  if (activeModule === "portal-tax-rates") {
    return (
      <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-black text-white">Pakistani Tax Rates & Slabs Matrix</h1>
              <p className="text-xs text-slate-400 mt-0.5">
                Tax Year 2025-2026 official rates under Finance Act 2025 for Salary, Business, Corporate & Withholding.
              </p>
            </div>
          </div>
        </div>

        {/* Live Interactive Salary Slabs Calculator */}
        <div className="bg-slate-950 p-6 rounded-2xl border border-emerald-600/40 space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-emerald-400" />
              <h2 className="text-sm font-bold text-white">Live Salaried Income Tax Calculator (Tax Year 2025-2026)</h2>
            </div>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded border border-emerald-800">
              Finance Act 2025
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-xs text-slate-300 font-medium">Annual Taxable Salary (PKR)</label>
              <input
                type="number"
                step="50000"
                value={calcAnnualSalary}
                onChange={(e) => setCalcAnnualSalary(Number(e.target.value))}
                className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-white font-mono"
              />
              <span className="text-[11px] text-slate-400 block">
                Monthly Equivalent: PKR {Math.round(calcAnnualSalary / 12).toLocaleString()}
              </span>
            </div>

            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-1">
              <span className="text-xs text-slate-400">Monthly Tax Deduction</span>
              <div className="text-2xl font-black text-emerald-400 font-mono">
                PKR {currentSalaryCalc.monthly.toLocaleString()}
              </div>
              <span className="text-[10px] text-slate-400">Deducted by employer under Section 149</span>
            </div>

            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-1">
              <span className="text-xs text-slate-400">Total Annual Tax Payable</span>
              <div className="text-2xl font-black text-white font-mono">
                PKR {currentSalaryCalc.tax.toLocaleString()}
              </div>
              <span className="text-[10px] text-emerald-300 font-medium">Applicable: {currentSalaryCalc.slab}</span>
            </div>
          </div>
        </div>

        {/* Official Slabs Reference Table */}
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white">First Schedule: Slabs of Income Tax for Salaried Individuals</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-900 text-slate-300 border-b border-slate-800">
                  <th className="p-3">Slab</th>
                  <th className="p-3">Taxable Income Range</th>
                  <th className="p-3">Rate of Tax</th>
                  <th className="p-3">Statutory Formula</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300 font-mono">
                <tr><td className="p-3 font-bold text-white">1</td><td className="p-3">Up to PKR 600,000</td><td className="p-3 text-emerald-400">0%</td><td className="p-3 text-slate-400">Nil</td></tr>
                <tr><td className="p-3 font-bold text-white">2</td><td className="p-3">PKR 600,001 to 1,200,000</td><td className="p-3 text-emerald-400">5%</td><td className="p-3">5% of amount exceeding PKR 600,000</td></tr>
                <tr><td className="p-3 font-bold text-white">3</td><td className="p-3">PKR 1,200,001 to 2,200,000</td><td className="p-3 text-emerald-400">15%</td><td className="p-3">PKR 30,000 + 15% exceeding PKR 1,200,000</td></tr>
                <tr><td className="p-3 font-bold text-white">4</td><td className="p-3">PKR 2,200,001 to 3,200,000</td><td className="p-3 text-emerald-400">25%</td><td className="p-3">PKR 180,000 + 25% exceeding PKR 2,200,000</td></tr>
                <tr><td className="p-3 font-bold text-white">5</td><td className="p-3">PKR 3,200,001 to 4,100,000</td><td className="p-3 text-emerald-400">30%</td><td className="p-3">PKR 430,000 + 30% exceeding PKR 3,200,000</td></tr>
                <tr><td className="p-3 font-bold text-white">6</td><td className="p-3">Exceeding PKR 4,100,000</td><td className="p-3 text-emerald-400">35%</td><td className="p-3">PKR 700,000 + 35% exceeding PKR 4,100,000</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Withholding Tax Matrix */}
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white">Key Withholding Tax (WHT) Rates (Filer vs Non-Filer)</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-white">Section 153(1)(a) - Supply of Goods</span>
              <div className="flex items-center justify-between text-xs pt-1">
                <span className="text-emerald-400 font-bold">Filer: 5.5% (Co) / 6%</span>
                <span className="text-rose-400 font-bold">Non-Filer: 11% / 12%</span>
              </div>
              <p className="text-[10px] text-slate-400">Minimum tax for companies & individuals.</p>
            </div>

            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-white">Section 153(1)(b) - Services</span>
              <div className="flex items-center justify-between text-xs pt-1">
                <span className="text-emerald-400 font-bold">Filer: 9% (Co) / 11%</span>
                <span className="text-rose-400 font-bold">Non-Filer: 18% / 22%</span>
              </div>
              <p className="text-[10px] text-slate-400">Minimum tax deduction on service payments.</p>
            </div>

            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-white">Section 236C / 236K - Property</span>
              <div className="flex items-center justify-between text-xs pt-1">
                <span className="text-emerald-400 font-bold">Filer: 3%</span>
                <span className="text-rose-400 font-bold">Non-Filer: 10.5% - 20%</span>
              </div>
              <p className="text-[10px] text-slate-400">Advance tax on sale & purchase of real estate.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW: TAX RETURNS ASSISTANT (IRIS 2.0 GUIDE)
  // =========================================================================
  if (activeModule === "portal-returns-assistant") {
    const steps = [
      {
        step: 1,
        title: "Log in to Iris 2.0 & Create Draft Return",
        desc: "Log in using your CNIC/NTN and password. Navigate to 'Declaration' > 'Salary / Business Return' > Select current Tax Year 2025.",
        action: "Verify your Active Taxpayer List (ATL) status."
      },
      {
        step: 2,
        title: "Enter Salary / Business Income & Allowances",
        desc: "Populate gross salary received, medical allowance exemptions under Clause 139 Part I of Second Schedule, and provident fund interest.",
        action: "Collect Section 149 deduction certificate from employer."
      },
      {
        step: 3,
        title: "Populate Adjustable Withholding Taxes",
        desc: "Input advance tax deducted on Electricity Bills (Sec 235), Vehicles (Sec 231B), Bank Cash, Property, and Mobile cellular cards.",
        action: "Download annual tax statements from Jazz/Telenor/Zong and banks."
      },
      {
        step: 4,
        title: "Complete Wealth Statement (Section 116)",
        desc: "List all domestic assets (agricultural land, residential plots, bank balances, vehicles, gold, cash in hand) at cost. Declare personal household expenses.",
        action: "Ensure unreconciled amount equals zero (Current Wealth - Previous Wealth - Inflows + Outflows)."
      },
      {
        step: 5,
        title: "Calculate, Verify & Submit with 4-Digit Iris PIN",
        desc: "Click 'Calculate' twice. Verify final tax payable or refund claimable. Enter your 4-digit secret Iris PIN and click 'Submit'.",
        action: "Download e-Acknowledgement CPR receipt immediately."
      }
    ];

    return (
      <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
              <FileCheck className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-black text-white">FBR Iris 2.0 Tax Returns Assistant</h1>
              <p className="text-xs text-slate-400 mt-0.5">
                Step-by-step interactive workflow for preparing and e-filing Annual Income Tax Returns & Wealth Statements.
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigateToChat && onNavigateToChat("Guide me step-by-step through filing my salaried income tax return on Iris portal.")}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition shadow-lg shadow-purple-950/50"
          >
            <Sparkles className="w-4 h-4" />
            <span>Start AI Return Filing Session</span>
          </button>
        </div>

        <div className="space-y-4">
          {steps.map((s) => (
            <div key={s.step} className="bg-slate-950 p-5 rounded-2xl border border-slate-800 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-purple-950 border border-purple-800 flex items-center justify-center text-purple-300 font-bold shrink-0">
                {s.step}
              </div>
              <div className="space-y-1.5 flex-1">
                <h3 className="text-sm font-bold text-white">{s.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{s.desc}</p>
                <div className="text-[11px] text-emerald-400 bg-emerald-950/40 px-3 py-1.5 rounded-lg border border-emerald-800/40 font-medium inline-block mt-1">
                  Advisor Tip: {s.action}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW: TAX NEWS & NOTIFICATIONS
  // =========================================================================
  if (activeModule === "portal-tax-news" || activeModule === "portal-notifications") {
    const news = newsFeed.length > 0 ? newsFeed : [
      {
        id: "news-1",
        title: "FBR Mandates Digital Invoicing System (SWAPS & S.R.O. 350) for Fast-Moving Consumer Goods",
        category: "FBR Policy",
        summary: "Federal Board of Revenue enforces nationwide integration of electronic sales tax invoicing. Registered tier-1 distributors must validate supplier filing status before claiming input tax.",
        source: "FBR Headquarters, Islamabad",
        published_date: "2026-08-20",
        is_breaking: 1,
        pdf_url: "https://fbr.gov.pk/notifications/sro350-update.pdf"
      },
      {
        id: "news-2",
        title: "Supreme Court Upholds Super Tax under Section 4C for Tax Years 2022-2025",
        category: "High Court Ruling",
        summary: "The Supreme Court of Pakistan delivers landmark verdict confirming the constitutional validity of Section 4C Super Tax on high-earning corporate entities with retrospective effect.",
        source: "Supreme Court of Pakistan, Appellate Bench",
        published_date: "2026-08-15",
        is_breaking: 0,
        pdf_url: "https://supremecourt.gov.pk/judgments/2026/super-tax-full-bench.pdf"
      }
    ];

    return (
      <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 shadow-xl flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400">
            <Newspaper className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-black text-white">Tax News, FBR Notifications & SRO Alerts</h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Live updates on statutory regulatory orders, circulars, and tax policy changes.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {news.map((n, idx) => (
            <div key={idx} className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800 font-bold">
                  {n.category}
                </span>
                <span className="text-xs text-slate-400 font-mono">{n.published_date}</span>
              </div>
              <h3 className="text-sm font-bold text-white">{n.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{n.summary}</p>
              <div className="flex items-center justify-between pt-1 text-xs text-slate-400">
                <span>Source: {n.source}</span>
                <button
                  onClick={() => onNavigateToChat && onNavigateToChat(`Analyze the legal impact of the following news for my business: "${n.title}"`)}
                  className="text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1"
                >
                  <span>Analyze Impact in AI</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Default Fallback
  return (
    <div className="p-8 text-center text-slate-400">
      <p>Select a module from the sidebar portal to begin exploring Pakistani legal databases.</p>
    </div>
  );
};
