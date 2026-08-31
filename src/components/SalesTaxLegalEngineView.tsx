import React, { useState, useEffect } from 'react';
import { 
  Scale, 
  Search, 
  BookOpen, 
  Gavel, 
  FileText, 
  HelpCircle, 
  Sparkles, 
  ChevronRight, 
  Filter, 
  Copy, 
  Check, 
  Loader2, 
  Calendar, 
  Layers, 
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ShieldCheck,
  Send,
  Building,
  Briefcase
} from 'lucide-react';
import { StatuteSection, CaseLawItem, SROItem, TaxProblemItem, UserProfile, SalesTaxPhaseItem, SalesTaxPhaseSubsection } from '../types';
import { STATUTE_SECTIONS, CASE_LAWS, SRO_COLLECTION, TAX_PROBLEMS, SALES_TAX_PHASES } from '../utils/salesTaxLegalData';

interface SalesTaxLegalEngineViewProps {
  user: UserProfile | null;
  onOpenTierModal: () => void;
  onNavigateToNoticeDrafter?: (section?: string) => void;
}

export const SalesTaxLegalEngineView: React.FC<SalesTaxLegalEngineViewProps> = ({
  user,
  onOpenTierModal,
  onNavigateToNoticeDrafter,
}) => {
  const [activeTab, setActiveTab] = useState<'phases' | 'statute' | 'caselaws' | 'sros' | 'solved_problems' | 'notice_draft'>('phases');
  
  // Data state with fallback to local comprehensive data
  const [phases, setPhases] = useState<SalesTaxPhaseItem[]>(SALES_TAX_PHASES);
  const [sections, setSections] = useState<StatuteSection[]>(STATUTE_SECTIONS);
  const [caseLaws, setCaseLaws] = useState<CaseLawItem[]>(CASE_LAWS);
  const [sros, setSros] = useState<SROItem[]>(SRO_COLLECTION);
  const [problems, setProblems] = useState<TaxProblemItem[]>(TAX_PROBLEMS);
  const [loading, setLoading] = useState(false);

  // Accordion & phase state
  const [expandedPhases, setExpandedPhases] = useState<number[]>([1, 2]);
  const [expandedSubsections, setExpandedSubsections] = useState<string[]>(['phase-1-sub-1', 'phase-1-sub-2']);
  const [selectedPhaseFilter, setSelectedPhaseFilter] = useState<string>('all');

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourt, setSelectedCourt] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');

  // Interactive AI Interpretation Modal / Section Detail
  const [selectedSection, setSelectedSection] = useState<StatuteSection | null>(null);
  const [aiInterpretation, setAiInterpretation] = useState<string | null>(null);
  const [interpreting, setInterpreting] = useState(false);
  const [specificQuery, setSpecificQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Notice Draft state
  const [noticeForm, setNoticeForm] = useState({
    noticeType: 'Section 11(2) - Assessment of Tax & Disallowance of Input Tax',
    sectionCode: 'Section 8(1)(ca) read with Section 11',
    taxPeriod: 'Tax Year 2024 (Monthly Sales Tax Returns)',
    taxpayerName: 'Al-Madina Engineering Works (Pvt) Ltd',
    ntnStrn: '3948291-5 / STRN 07-02-9999-123-45',
    officerDesignation: 'The Deputy Commissioner Inland Revenue, Audit Unit-03, LTO Lahore',
    allegationsSummary: 'Alleged input tax claim from supplier whose STRN was suspended subsequent to invoice period.',
    defenseGrounds: 'Taxpayer is a bona fide buyer under 2023 PTD 1450 SC; verified active status on date of supply, payments made strictly via crossed banking channel under Section 73.',
    attachedDocuments: 'Sales Tax Invoices, Bank Payment Advice, Goods Inward Gate Pass, FBR ATL Verification Screenshot on transaction date',
  });
  const [generatedDraft, setGeneratedDraft] = useState<string | null>(null);
  const [drafting, setDrafting] = useState(false);

  // Fetch live from server API
  useEffect(() => {
    fetchPhases();
    fetchStatutes();
    fetchCaseLaws();
    fetchSros();
    fetchProblems();
  }, []);

  const fetchPhases = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/tax/sales-tax/phases');
      const isJson = res.headers.get('content-type')?.includes('application/json');
      if (res.ok && isJson) {
        const data = await res.json();
        if (data && data.length > 0) setPhases(data);
      }
    } catch (e) {
      console.error('Fetch phases notice:', e);
    } finally {
      setLoading(false);
    }
  };

  const togglePhase = (phaseNum: number) => {
    setExpandedPhases(prev => 
      prev.includes(phaseNum) ? prev.filter(n => n !== phaseNum) : [...prev, phaseNum]
    );
  };

  const toggleSubsection = (subId: string) => {
    setExpandedSubsections(prev => 
      prev.includes(subId) ? prev.filter(id => id !== subId) : [...prev, subId]
    );
  };

  const expandAllPhases = () => {
    setExpandedPhases([1, 2, 3, 4, 5, 6]);
    const allSubIds = phases.flatMap(p => p.subsections.map(s => s.id));
    setExpandedSubsections(allSubIds);
  };

  const collapseAllPhases = () => {
    setExpandedPhases([]);
    setExpandedSubsections([]);
  };

  const fetchStatutes = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/tax/sales-tax/sections');
      const isJson = res.headers.get('content-type')?.includes('application/json');
      if (res.ok && isJson) {
        const data = await res.json();
        if (data && data.length > 0) setSections(data);
      }
    } catch (e) {
      console.error('Fetch statutes notice:', e);
    } finally {
      setLoading(false);
    }
  };

  const fetchCaseLaws = async () => {
    try {
      const res = await fetch('/api/tax/case-laws/search');
      const isJson = res.headers.get('content-type')?.includes('application/json');
      if (res.ok && isJson) {
        const data = await res.json();
        if (data && data.length > 0) setCaseLaws(data);
      }
    } catch (e) {
      console.error('Fetch case laws notice:', e);
    }
  };

  const fetchSros = async () => {
    try {
      const res = await fetch('/api/tax/sro-lookup');
      const isJson = res.headers.get('content-type')?.includes('application/json');
      if (res.ok && isJson) {
        const data = await res.json();
        if (data && data.length > 0) setSros(data);
      }
    } catch (e) {
      console.error('Fetch SROs notice:', e);
    }
  };

  const fetchProblems = async () => {
    try {
      const res = await fetch('/api/tax/solved-problems');
      const isJson = res.headers.get('content-type')?.includes('application/json');
      if (res.ok && isJson) {
        const data = await res.json();
        if (data && data.length > 0) setProblems(data);
      }
    } catch (e) {
      console.error('Fetch problems notice:', e);
    }
  };

  const handleInterpretSection = async (sec: StatuteSection) => {
    setSelectedSection(sec);
    setAiInterpretation(null);
    setInterpreting(true);

    try {
      const res = await fetch('/api/tax/interpret-section', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section: `${sec.section} - ${sec.title}`,
          specificQuery: specificQuery || 'Provide full legal commentary, credit mechanism, and FBR audit defense strategy',
          factualContext: 'Pakistani corporate & commercial tax advisory',
        }),
      });

      const isJson = res.headers.get('content-type')?.includes('application/json');
      if (res.ok && isJson) {
        const data = await res.json();
        setAiInterpretation(data.interpretation);
      }
    } catch (e) {
      console.error('Interpret section error:', e);
    } finally {
      setInterpreting(false);
    }
  };

  const handleGenerateNoticeDraft = async () => {
    setDrafting(true);
    try {
      const token = localStorage.getItem('saqibtax_token');
      const res = await fetch('/api/tax/generate-notice-reply', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify(noticeForm),
      });

      const isJson = res.headers.get('content-type')?.includes('application/json');
      if (res.ok && isJson) {
        const data = await res.json();
        setGeneratedDraft(data.draftText);
      } else {
        alert('Please ensure you are signed in to generate formal notice drafts.');
      }
    } catch (e) {
      console.error('Generate notice error:', e);
    } finally {
      setDrafting(false);
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Filtered lists
  const filteredPhases = phases.filter(p => {
    const matchesPhaseFilter = selectedPhaseFilter === 'all' || p.phase_number.toString() === selectedPhaseFilter;
    const matchesSearch = !searchQuery ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sections_range.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.subsections.some(sub => 
        sub.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sub.sections.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sub.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sub.key_provisions.some(kp => kp.toLowerCase().includes(searchQuery.toLowerCase())) ||
        sub.practical_notes.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sub.applicable_rules_or_sros.some(sro => sro.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    return matchesPhaseFilter && matchesSearch;
  });

  const filteredSections = sections.filter(s => {
    const matchesSearch = !searchQuery || 
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.section.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.practical_notes.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const filteredCaseLaws = caseLaws.filter(c => {
    const matchesCourt = selectedCourt === 'all' || c.court.toLowerCase().includes(selectedCourt.toLowerCase());
    const matchesSearch = !searchQuery ||
      c.citation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.key_holding.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.keywords.some(k => k.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCourt && matchesSearch;
  });

  const filteredSros = sros.filter(s => {
    const matchesCategory = selectedCategory === 'all' || s.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = !searchQuery ||
      s.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const filteredProblems = problems.filter(p => {
    const matchesDiff = selectedDifficulty === 'all' || p.difficulty_level.toLowerCase().includes(selectedDifficulty.toLowerCase());
    const matchesSearch = !searchQuery ||
      p.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.scenario.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.solution.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.statutory_ref.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDiff && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-2">
              <Scale className="w-3.5 h-3.5" />
              <span>The Sales Tax Act, 1990 & Sales Tax Rules, 2006</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Sales Tax Legal Engine & Practice Suite
            </h1>
            <p className="text-slate-400 text-sm mt-1 max-w-3xl">
              Authoritative statutory interpretation engine, Supreme Court & High Court case law citations, SROs & STGOs repository, and practical calculation scenarios for tax advisors.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('notice_draft')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-lg shadow-emerald-950/60 transition"
            >
              <Sparkles className="w-4 h-4" />
              <span>Draft Notice Reply</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 mt-6 pt-4 border-t border-slate-800/80 overflow-x-auto scrollbar-none">
          <button
            onClick={() => { setActiveTab('phases'); setSearchQuery(''); }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition ${
              activeTab === 'phases'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Layers className="w-4 h-4 text-emerald-300" />
            <span>6 Structured Phases ({phases.length})</span>
          </button>

          <button
            onClick={() => { setActiveTab('statute'); setSearchQuery(''); }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition ${
              activeTab === 'statute'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Statute Sections ({sections.length})</span>
          </button>

          <button
            onClick={() => { setActiveTab('caselaws'); setSearchQuery(''); }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition ${
              activeTab === 'caselaws'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Gavel className="w-4 h-4" />
            <span>Case Laws & Citations ({caseLaws.length})</span>
          </button>

          <button
            onClick={() => { setActiveTab('sros'); setSearchQuery(''); }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition ${
              activeTab === 'sros'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>SROs & Circulars ({sros.length})</span>
          </button>

          <button
            onClick={() => { setActiveTab('solved_problems'); setSearchQuery(''); }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition ${
              activeTab === 'solved_problems'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>Solved Tax Scenarios ({problems.length})</span>
          </button>

          <button
            onClick={() => { setActiveTab('notice_draft'); }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition ${
              activeTab === 'notice_draft'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Notice Reply Drafter</span>
          </button>
        </div>
      </div>

      {/* Global Search & Filter Bar */}
      {activeTab !== 'notice_draft' && (
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder={
                activeTab === 'phases' ? 'Search 6 phases, topics, sections (e.g. charging provision, Section 73 banking channel, blacklisting, FASTER refund, audits)...' :
                activeTab === 'statute' ? 'Search sections (e.g. Section 3, Section 8B, input tax, retail price)...' :
                activeTab === 'caselaws' ? 'Search case laws (e.g. 2023 PTD 1450, Supreme Court, banking channel)...' :
                activeTab === 'sros' ? 'Search SROs / STGOs (e.g. SRO 350, SRO 297, withholding, POS)...' :
                'Search practical problems (e.g. Rule 25 apportionment, 90% cap, further tax)...'
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white"
            />
          </div>

          {/* Sub-Filters */}
          {activeTab === 'phases' && (
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Filter className="w-4 h-4 text-slate-400" />
              <select
                value={selectedPhaseFilter}
                onChange={(e) => setSelectedPhaseFilter(e.target.value)}
                className="bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-700 focus:outline-none focus:border-emerald-500"
              >
                <option value="all">All 6 Phases</option>
                <option value="1">Phase 1: Foundations & Charging (Sec 1–13)</option>
                <option value="2">Phase 2: Registration & Penal Status (Sec 14–21)</option>
                <option value="3">Phase 3: Bookkeeping, Invoicing & Audits (Sec 22–30)</option>
                <option value="4">Phase 4: Admin Hierarchy & Penalties (Sec 30A–44)</option>
                <option value="5">Phase 5: Appeals & Arrear Recovery (Sec 45–48)</option>
                <option value="6">Phase 6: Miscellaneous & Banking Rules (Sec 49–76)</option>
              </select>
            </div>
          )}

          {/* Sub-Filters */}
          {activeTab === 'caselaws' && (
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Filter className="w-4 h-4 text-slate-400" />
              <select
                value={selectedCourt}
                onChange={(e) => setSelectedCourt(e.target.value)}
                className="bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-700 focus:outline-none focus:border-emerald-500"
              >
                <option value="all">All Courts</option>
                <option value="Supreme Court">Supreme Court of Pakistan</option>
                <option value="Sindh High Court">Sindh High Court</option>
                <option value="Lahore High Court">Lahore High Court</option>
                <option value="ATIR">Appellate Tribunal (ATIR)</option>
              </select>
            </div>
          )}

          {activeTab === 'sros' && (
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Filter className="w-4 h-4 text-slate-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-700 focus:outline-none focus:border-emerald-500"
              >
                <option value="all">All Categories</option>
                <option value="SRO">Statutory Orders (SROs)</option>
                <option value="STGO">General Orders (STGOs)</option>
                <option value="Circular">FBR Circulars</option>
              </select>
            </div>
          )}

          {activeTab === 'solved_problems' && (
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Filter className="w-4 h-4 text-slate-400" />
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-700 focus:outline-none focus:border-emerald-500"
              >
                <option value="all">All Difficulty Levels</option>
                <option value="Basic">Basic Practice</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced / Corporate</option>
              </select>
            </div>
          )}
        </div>
      )}

      {/* TAB 0: 6 STRUCTURED PHASES OF THE SALES TAX ACT 1990 */}
      {activeTab === 'phases' && (
        <div className="space-y-6">
          
          {/* Overview Banner & Quick Controls */}
          <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-700/70 rounded-2xl p-5 text-white shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Authoritative Statutory Architecture
                </span>
                <span className="text-xs text-slate-400">Complete Act Taxonomy</span>
              </div>
              <h2 className="text-lg font-bold text-white">
                The 6 Phases of Sales Tax Act, 1990
              </h2>
              <p className="text-xs text-slate-300 max-w-2xl mt-0.5">
                Navigate Pakistan&apos;s sales tax legislation systematically across all 76 sections—from foundational charging provisions and zero-rated supply chains to audit scrutiny, coercive enforcement, ATIR appeals, and Section 73 banking mandates.
              </p>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                onClick={expandAllPhases}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-600 transition"
              >
                Expand All
              </button>
              <button
                onClick={collapseAllPhases}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-600 transition"
              >
                Collapse All
              </button>
            </div>
          </div>

          {/* Phases List */}
          <div className="space-y-4">
            {filteredPhases.map((phase) => {
              const isPhaseExpanded = expandedPhases.includes(phase.phase_number);
              return (
                <div
                  key={phase.phase_number}
                  className="bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow transition overflow-hidden"
                >
                  {/* Phase Header */}
                  <div
                    onClick={() => togglePhase(phase.phase_number)}
                    className="p-5 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/60 hover:bg-slate-100/60 transition select-none"
                  >
                    <div className="flex items-start sm:items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-extrabold text-sm shadow-md shrink-0">
                        P{phase.phase_number}
                      </div>

                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-base font-extrabold text-slate-900">
                            Phase {phase.phase_number}: {phase.title}
                          </h3>
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-900 border border-emerald-200">
                            {phase.sections_range}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 mt-1 max-w-3xl leading-relaxed">
                          {phase.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                      <span className="text-xs text-slate-500 font-medium">
                        {phase.subsections.length} Key Subsections
                      </span>
                      <button
                        className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-slate-900"
                        aria-label="Toggle Phase"
                      >
                        <ChevronRight
                          className={`w-4 h-4 transition-transform duration-200 ${
                            isPhaseExpanded ? 'rotate-90 text-emerald-600' : ''
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Phase Body: Subsections */}
                  {isPhaseExpanded && (
                    <div className="p-5 border-t border-slate-200 space-y-4 bg-white">
                      <div className="grid grid-cols-1 gap-4">
                        {phase.subsections.map((sub: SalesTaxPhaseSubsection) => {
                          const isSubExpanded = expandedSubsections.includes(sub.id);
                          return (
                            <div
                              key={sub.id}
                              className="border border-slate-200 rounded-xl p-4 hover:border-emerald-400 transition bg-slate-50/40 space-y-3"
                            >
                              {/* Subsection Header */}
                              <div
                                onClick={() => toggleSubsection(sub.id)}
                                className="cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-2 select-none"
                              >
                                <div className="flex items-center gap-2.5">
                                  <span className="px-2 py-0.5 rounded bg-slate-200 text-slate-800 font-bold text-xs font-mono">
                                    {sub.sections}
                                  </span>
                                  <h4 className="text-sm font-bold text-slate-900 hover:text-emerald-700 transition">
                                    {sub.topic}
                                  </h4>
                                </div>

                                <div className="flex items-center gap-2 self-end sm:self-auto">
                                  <span className="text-[11px] text-slate-500">
                                    {sub.key_provisions.length} Core Provisions
                                  </span>
                                  <button className="p-1 text-slate-400 hover:text-slate-700">
                                    <ChevronRight
                                      className={`w-3.5 h-3.5 transition-transform duration-150 ${
                                        isSubExpanded ? 'rotate-90 text-emerald-600' : ''
                                      }`}
                                    />
                                  </button>
                                </div>
                              </div>

                              {/* Summary */}
                              <p className="text-xs text-slate-700 leading-relaxed">
                                {sub.summary}
                              </p>

                              {/* Detailed Dropdown Content */}
                              {isSubExpanded && (
                                <div className="pt-3 border-t border-slate-200/80 space-y-3">
                                  
                                  {/* Key Statutory Provisions */}
                                  <div>
                                    <h5 className="text-[11px] font-bold text-slate-800 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                                      <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                                      <span>Key Statutory Provisions & Subsections</span>
                                    </h5>
                                    <ul className="space-y-1.5 pl-1">
                                      {sub.key_provisions.map((prov, pIdx) => (
                                        <li key={pIdx} className="text-xs text-slate-700 flex items-start gap-2">
                                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                                          <span className="leading-snug">{prov}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>

                                  {/* Senior Counsel Practical Notes */}
                                  <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-3.5 space-y-1">
                                    <h5 className="text-[11px] font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                                      <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
                                      <span>Senior Counsel Practical & Audit Advice</span>
                                    </h5>
                                    <p className="text-xs text-amber-950 leading-relaxed font-sans">
                                      {sub.practical_notes}
                                    </p>
                                  </div>

                                  {/* Applicable SROs / Rules & Actions */}
                                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-slate-100">
                                    <div className="flex flex-wrap items-center gap-1.5">
                                      <span className="text-[11px] text-slate-500 font-medium">Cross-Rules:</span>
                                      {sub.applicable_rules_or_sros.map((ruleTag, rIdx) => (
                                        <span
                                          key={rIdx}
                                          className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-slate-700 font-mono font-medium"
                                        >
                                          {ruleTag}
                                        </span>
                                      ))}
                                    </div>

                                    <div className="flex items-center gap-2 self-end sm:self-auto">
                                      <button
                                        onClick={() => handleCopy(`${sub.topic} (${sub.sections}):\n${sub.summary}\n\nKey Provisions:\n${sub.key_provisions.join('\n')}\n\nPractical Advice:\n${sub.practical_notes}`, sub.id)}
                                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-[11px] text-slate-700 font-medium transition"
                                      >
                                        {copiedId === sub.id ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                                        <span>{copiedId === sub.id ? 'Copied' : 'Copy'}</span>
                                      </button>

                                      <button
                                        onClick={() => {
                                          setSelectedSection({
                                            id: sub.id,
                                            act_type: 'Sales Tax Act, 1990',
                                            chapter: `Phase ${phase.phase_number}: ${phase.title}`,
                                            section: sub.sections,
                                            title: sub.topic,
                                            description: sub.summary,
                                            sub_sections: sub.key_provisions,
                                            practical_notes: sub.practical_notes,
                                            cross_references: sub.applicable_rules_or_sros
                                          });
                                          handleInterpretSection({
                                            id: sub.id,
                                            act_type: 'Sales Tax Act, 1990',
                                            chapter: `Phase ${phase.phase_number}: ${phase.title}`,
                                            section: sub.sections,
                                            title: sub.topic,
                                            description: sub.summary,
                                            sub_sections: sub.key_provisions,
                                            practical_notes: sub.practical_notes,
                                            cross_references: sub.applicable_rules_or_sros
                                          });
                                        }}
                                        className="inline-flex items-center gap-1 px-3 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-[11px] text-white font-semibold shadow-sm transition"
                                      >
                                        <Sparkles className="w-3 h-3" />
                                        <span>Ask AI Analysis</span>
                                      </button>
                                    </div>
                                  </div>

                                </div>
                              )}
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

          {filteredPhases.length === 0 && (
            <div className="bg-white border border-slate-200 rounded-xl p-12 text-center text-slate-500">
              No statutory phases or subsections found matching &quot;{searchQuery}&quot;.
            </div>
          )}
        </div>
      )}

      {/* TAB 1: STATUTE SECTIONS */}
      {activeTab === 'statute' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSections.map((sec) => (
              <div
                key={sec.id}
                className="bg-white border border-slate-200 hover:border-emerald-500 rounded-xl p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="px-2.5 py-1 rounded bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
                      {sec.section}
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium">
                      {sec.chapter.split(':')[0]}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition mb-2">
                    {sec.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
                    {sec.description}
                  </p>

                  {sec.key_amendments && (
                    <div className="bg-amber-50/80 rounded-lg p-2.5 mb-3 border border-amber-200 text-[11px] text-amber-900">
                      <strong className="text-amber-950 font-semibold">Amendment Note: </strong>
                      {sec.key_amendments}
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <div className="flex flex-wrap gap-1">
                    {sec.cross_references?.slice(0, 2).map((cr, idx) => (
                      <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">
                        {cr}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => handleInterpretSection(sec)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-800 transition whitespace-nowrap"
                  >
                    <span>AI Analysis</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredSections.length === 0 && (
            <div className="bg-white border border-slate-200 rounded-xl p-12 text-center text-slate-500">
              No statute sections found matching &quot;{searchQuery}&quot;.
            </div>
          )}
        </div>
      )}

      {/* TAB 2: CASE LAWS & CITATIONS */}
      {activeTab === 'caselaws' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredCaseLaws.map((cl) => (
              <div
                key={cl.id}
                className="bg-white border border-slate-200 hover:border-emerald-500 rounded-xl p-5 shadow-sm hover:shadow-md transition space-y-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2.5 py-1 rounded bg-amber-50 text-amber-900 font-mono text-xs font-bold border border-amber-200">
                    {cl.citation}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs text-slate-500 font-medium">
                    <Calendar className="w-3.5 h-3.5" />
                    {cl.year}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    {cl.title}
                  </h3>
                  <p className="text-xs text-emerald-700 font-semibold mt-0.5">
                    {cl.court} &bull; Relevant: {cl.relevant_sections}
                  </p>
                </div>

                <div className="bg-slate-50 rounded-lg p-3 border border-slate-200 space-y-2">
                  <p className="text-xs text-slate-700 leading-relaxed">
                    <strong className="text-slate-900 font-semibold">Summary of Facts: </strong>
                    {cl.summary}
                  </p>
                  <p className="text-xs text-emerald-900 leading-relaxed font-medium">
                    <strong className="text-emerald-800 font-semibold">Ratio Decidendi / Key Holding: </strong>
                    {cl.key_holding}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {cl.keywords.map((kw, idx) => (
                    <span key={idx} className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200 font-medium">
                      #{kw}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                  <button
                    onClick={() => handleCopy(`${cl.citation} - ${cl.title}\nKey Holding: ${cl.key_holding}`, cl.id)}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs text-slate-700 font-medium transition"
                  >
                    {copiedId === cl.id ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedId === cl.id ? 'Copied' : 'Copy Citation'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredCaseLaws.length === 0 && (
            <div className="bg-white border border-slate-200 rounded-xl p-12 text-center text-slate-500">
              No case laws or precedents found matching &quot;{searchQuery}&quot;.
            </div>
          )}
        </div>
      )}

      {/* TAB 3: SROS, STGOS & CIRCULARS */}
      {activeTab === 'sros' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSros.map((sro) => (
              <div
                key={sro.id}
                className="bg-white border border-slate-200 hover:border-emerald-500 rounded-xl p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`px-2.5 py-0.5 rounded text-[11px] font-bold border ${
                      sro.category === 'SRO' ? 'bg-indigo-50 text-indigo-900 border-indigo-200' :
                      sro.category === 'STGO' ? 'bg-purple-50 text-purple-900 border-purple-200' :
                      'bg-emerald-50 text-emerald-900 border-emerald-200'
                    }`}>
                      {sro.category}
                    </span>
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold">
                      {sro.status}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900">
                    {sro.number}
                  </h3>
                  <p className="text-xs font-semibold text-slate-700">
                    {sro.title}
                  </p>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {sro.description}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
                  <span>Issued by: {sro.issuing_authority}</span>
                  <span className="font-mono text-slate-600 font-semibold">{sro.year}</span>
                </div>
              </div>
            ))}
          </div>

          {filteredSros.length === 0 && (
            <div className="bg-white border border-slate-200 rounded-xl p-12 text-center text-slate-500">
              No statutory regulatory orders found matching &quot;{searchQuery}&quot;.
            </div>
          )}
        </div>
      )}

      {/* TAB 4: SOLVED PRACTICE SCENARIOS & CALCULATIONS */}
      {activeTab === 'solved_problems' && (
        <div className="space-y-4">
          <div className="space-y-4">
            {filteredProblems.map((prob) => (
              <div
                key={prob.id}
                className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                        {prob.section_id}
                      </span>
                      <span className="text-xs text-slate-500 font-mono font-medium">
                        {prob.statutory_ref}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">
                      {prob.topic}
                    </h3>
                  </div>

                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border self-start sm:self-auto ${
                    prob.difficulty_level.includes('Advanced') ? 'bg-red-50 text-red-800 border-red-200' :
                    prob.difficulty_level.includes('Intermediate') ? 'bg-amber-50 text-amber-800 border-amber-200' :
                    'bg-emerald-50 text-emerald-800 border-emerald-200'
                  }`}>
                    {prob.difficulty_level}
                  </span>
                </div>

                {/* Scenario */}
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Factual Scenario & Practical Problem</span>
                  </h4>
                  <p className="text-xs text-slate-700 whitespace-pre-line leading-relaxed">
                    {prob.scenario}
                  </p>
                </div>

                {/* Step by step calculations */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Step-by-Step Statutory Computation</span>
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {prob.calculation_steps.map((step) => (
                      <div key={step.step} className="bg-slate-50 border border-slate-200 rounded-lg p-3 space-y-1.5">
                        <div className="flex items-center gap-1.5">
                          <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[11px] flex items-center justify-center">
                            {step.step}
                          </span>
                          <span className="text-xs font-bold text-slate-900">{step.title}</span>
                        </div>
                        <p className="text-xs text-slate-800 font-mono bg-white p-2 rounded border border-slate-200 whitespace-pre-line">
                          {step.computation}
                        </p>
                        <p className="text-[11px] text-slate-600">
                          {step.statutory_reason}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Final Solution & Takeaways */}
                <div className="bg-emerald-50/50 border border-emerald-200 rounded-xl p-4 space-y-2">
                  <h4 className="text-xs font-bold text-emerald-900 uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Tax Return Determination & Practical Solution</span>
                  </h4>
                  <p className="text-xs text-slate-800 whitespace-pre-line font-mono bg-white p-3 rounded-lg border border-emerald-200">
                    {prob.solution}
                  </p>

                  <div className="pt-2">
                    <p className="text-xs font-bold text-slate-800 mb-1">Practical Takeaways for Tax Advisors:</p>
                    <ul className="list-disc list-inside text-xs text-slate-700 space-y-0.5">
                      {prob.practical_takeaways.map((pt, idx) => (
                        <li key={idx}>{pt}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProblems.length === 0 && (
            <div className="bg-white border border-slate-200 rounded-xl p-12 text-center text-slate-500">
              No solved problems found matching &quot;{searchQuery}&quot;.
            </div>
          )}
        </div>
      )}

      {/* TAB 5: AUTOMATED NOTICE REPLY DRAFTER */}
      {activeTab === 'notice_draft' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Input Form */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-600" />
                <span>FBR Notice Reply & Explanation Generator</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Automated court-admissible draft generator incorporating Sales Tax Act 1990 sections and landmark appellate citations.
              </p>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Notice Type / Section</label>
                <input
                  type="text"
                  value={noticeForm.noticeType}
                  onChange={(e) => setNoticeForm({ ...noticeForm, noticeType: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:border-emerald-500 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Section Code</label>
                  <input
                    type="text"
                    value={noticeForm.sectionCode}
                    onChange={(e) => setNoticeForm({ ...noticeForm, sectionCode: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:border-emerald-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Tax Period</label>
                  <input
                    type="text"
                    value={noticeForm.taxPeriod}
                    onChange={(e) => setNoticeForm({ ...noticeForm, taxPeriod: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:border-emerald-500 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Taxpayer Name / Entity</label>
                  <input
                    type="text"
                    value={noticeForm.taxpayerName}
                    onChange={(e) => setNoticeForm({ ...noticeForm, taxpayerName: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:border-emerald-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">NTN / STRN</label>
                  <input
                    type="text"
                    value={noticeForm.ntnStrn}
                    onChange={(e) => setNoticeForm({ ...noticeForm, ntnStrn: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:border-emerald-500 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Addressing Officer / Jurisdiction</label>
                <input
                  type="text"
                  value={noticeForm.officerDesignation}
                  onChange={(e) => setNoticeForm({ ...noticeForm, officerDesignation: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:border-emerald-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Departmental Allegations</label>
                <textarea
                  rows={2}
                  value={noticeForm.allegationsSummary}
                  onChange={(e) => setNoticeForm({ ...noticeForm, allegationsSummary: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:border-emerald-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Key Substantive Defense Grounds</label>
                <textarea
                  rows={3}
                  value={noticeForm.defenseGrounds}
                  onChange={(e) => setNoticeForm({ ...noticeForm, defenseGrounds: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:border-emerald-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Attached Documents / Evidences</label>
                <input
                  type="text"
                  value={noticeForm.attachedDocuments}
                  onChange={(e) => setNoticeForm({ ...noticeForm, attachedDocuments: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:border-emerald-500 focus:bg-white"
                />
              </div>

              <button
                onClick={handleGenerateNoticeDraft}
                disabled={drafting}
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 transition disabled:opacity-50"
              >
                {drafting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Formulating Statutory Legal Response...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Generate Formal Notice Reply Draft</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Generated Draft Output */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-emerald-600" />
                  <span>Court-Admissible Legal Draft</span>
                </h3>

                {generatedDraft && (
                  <button
                    onClick={() => handleCopy(generatedDraft, 'draft-output')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs text-slate-800 font-medium transition"
                  >
                    {copiedId === 'draft-output' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedId === 'draft-output' ? 'Copied' : 'Copy Full Draft'}</span>
                  </button>
                )}
              </div>

              {generatedDraft ? (
                <div className="bg-slate-900 text-slate-100 rounded-xl p-4 border border-slate-800 max-h-[600px] overflow-y-auto font-mono text-xs whitespace-pre-line leading-relaxed select-text shadow-inner">
                  {generatedDraft}
                </div>
              ) : (
                <div className="h-96 flex flex-col items-center justify-center text-center p-8 bg-slate-50 border border-dashed border-slate-300 rounded-xl text-slate-500 space-y-3">
                  <FileText className="w-12 h-12 text-slate-400" />
                  <p className="text-sm font-semibold text-slate-700">No reply draft generated yet.</p>
                  <p className="text-xs text-slate-500 max-w-sm">
                    Fill in the notice details and click &quot;Generate Formal Notice Reply Draft&quot; to produce a formatted response citing the Sales Tax Act 1990 & relevant High Court precedents.
                  </p>
                </div>
              )}
            </div>
          </div>

        </div>
      )}

      {/* SECTION INTERPRETATION MODAL */}
      {selectedSection && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200">
                    {selectedSection.section}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">{selectedSection.act_type}</span>
                </div>
                <h2 className="text-xl font-extrabold text-slate-900 mt-1">
                  {selectedSection.title}
                </h2>
              </div>

              <button
                onClick={() => setSelectedSection(null)}
                className="text-slate-400 hover:text-slate-700 text-2xl font-bold p-1 leading-none"
              >
                &times;
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-4 flex-1 text-xs">
              
              {/* Verbatim Section */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                <h4 className="font-bold text-slate-800 uppercase tracking-wider">Statutory Text:</h4>
                <p className="text-slate-700 leading-relaxed">{selectedSection.description}</p>
                
                {selectedSection.sub_sections && (
                  <div className="pt-2 space-y-1">
                    <p className="font-semibold text-slate-700">Sub-Sections:</p>
                    {selectedSection.sub_sections.map((sub, idx) => (
                      <p key={idx} className="text-slate-600 pl-2 border-l-2 border-slate-300">{sub}</p>
                    ))}
                  </div>
                )}
              </div>

              {/* Practical Notes */}
              <div className="bg-emerald-50/70 p-4 rounded-xl border border-emerald-200 space-y-1">
                <h4 className="font-bold text-emerald-900 uppercase tracking-wider">Senior Counsel Practical Notes:</h4>
                <p className="text-slate-800 leading-relaxed">{selectedSection.practical_notes}</p>
              </div>

              {/* AI Deep Legal Opinion */}
              {interpreting ? (
                <div className="py-8 flex flex-col items-center justify-center text-center space-y-3">
                  <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
                  <p className="text-xs text-slate-600 font-medium">Consulting Pakistani Sales Tax Jurisprudence & Appellate Rulings...</p>
                </div>
              ) : aiInterpretation ? (
                <div className="bg-slate-900 text-slate-100 p-4 rounded-xl border border-slate-800 space-y-2 shadow-inner">
                  <h4 className="font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    <span>AI Senior Tax Counsel Legal Opinion</span>
                  </h4>
                  <div className="text-slate-200 whitespace-pre-line leading-relaxed font-sans text-xs">
                    {aiInterpretation}
                  </div>
                </div>
              ) : null}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-100 flex items-center justify-between bg-slate-50">
              <button
                onClick={() => setSelectedSection(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition"
              >
                Close
              </button>

              <button
                onClick={() => handleInterpretSection(selectedSection)}
                disabled={interpreting}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow transition"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{interpreting ? 'Interpreting...' : 'Re-Generate AI Analysis'}</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
