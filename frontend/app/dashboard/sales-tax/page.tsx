'use client';

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
  ExternalLink,
  ShieldAlert,
  CheckCircle2,
  Copy,
  Check,
  Send,
  Loader2,
  Award,
  Download,
  Building2,
  Calendar,
  Layers,
  ArrowRight
} from 'lucide-react';

interface StatuteSection {
  id: string;
  act_type: string;
  chapter: string;
  section: string;
  title: string;
  description: string;
  sub_sections?: string[];
  practical_notes: string;
  cross_references?: string[];
  key_amendments?: string;
}

interface CaseLawItem {
  id: string;
  citation: string;
  title: string;
  court: string;
  year: number;
  summary: string;
  key_holding: string;
  appellant?: string;
  respondent?: string;
  relevant_sections: string;
  keywords: string[];
}

interface SROItem {
  id: string;
  number: string;
  title: string;
  year: number;
  category: string;
  description: string;
  effective_date?: string;
  status: string;
  issuing_authority: string;
}

interface TaxProblemItem {
  id: string;
  section_id: string;
  topic: string;
  scenario: string;
  calculation_steps: {
    step: number;
    title: string;
    computation: string;
    statutory_reason: string;
  }[];
  solution: string;
  statutory_ref: string;
  difficulty_level: string;
  practical_takeaways: string[];
}

export default function SalesTaxLegalDashboard() {
  const [activeTab, setActiveTab] = useState<'statute' | 'caselaws' | 'sros' | 'solved_problems' | 'notice_draft'>('statute');
  
  // Data state
  const [sections, setSections] = useState<StatuteSection[]>([]);
  const [caseLaws, setCaseLaws] = useState<CaseLawItem[]>([]);
  const [sros, setSros] = useState<SROItem[]>([]);
  const [problems, setProblems] = useState<TaxProblemItem[]>([]);
  const [loading, setLoading] = useState(false);

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

  // Fetch initial data
  useEffect(() => {
    fetchStatutes();
    fetchCaseLaws();
    fetchSros();
    fetchProblems();
  }, []);

  const fetchStatutes = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/tax/sales-tax/sections');
      if (res.ok) {
        const data = await res.json();
        setSections(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const fetchCaseLaws = async () => {
    try {
      const res = await fetch('/api/tax/case-laws/search');
      if (res.ok) {
        const data = await res.json();
        setCaseLaws(data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const fetchSros = async () => {
    try {
      const res = await fetch('/api/tax/sro-lookup');
      if (res.ok) {
        const data = await res.json();
        setSros(data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const fetchProblems = async () => {
    try {
      const res = await fetch('/api/tax/solved-problems');
      if (res.ok) {
        const data = await res.json();
        setProblems(data);
      }
    } catch (e) {
      console.error(e);
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

      if (res.ok) {
        const data = await res.json();
        setAiInterpretation(data.interpretation);
      }
    } catch (e) {
      console.error(e);
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

      if (res.ok) {
        const data = await res.json();
        setGeneratedDraft(data.draftText);
      } else {
        alert('Please ensure you are signed in to generate formal notice drafts.');
      }
    } catch (e) {
      console.error(e);
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
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-900 border border-emerald-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-2">
                <Scale className="w-3.5 h-3.5" />
                <span>The Sales Tax Act, 1990 & Sales Tax Rules 2006</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Pakistani Sales Tax Legal Engine & Practice Suite
              </h1>
              <p className="text-slate-400 text-sm mt-1 max-w-3xl">
                Authoritative statutory repository, Supreme Court & High Court appellate case law precedents, SROs & STGOs database, and section-wise solved practical tax calculation problems.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveTab('notice_draft')}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-lg shadow-emerald-950/60 transition"
              >
                <Sparkles className="w-4 h-4" />
                <span>Notice Reply Drafter</span>
              </button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center gap-2 mt-6 pt-4 border-t border-slate-800/80 overflow-x-auto scrollbar-none">
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
              <span>SROs & STGOs Repository ({sros.length})</span>
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
              <span>Solved Practice Scenarios ({problems.length})</span>
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
              <span>FBR Notice Explanation Drafter</span>
            </button>
          </div>
        </div>

        {/* Global Search & Filter Bar */}
        {activeTab !== 'notice_draft' && (
          <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder={
                  activeTab === 'statute' ? 'Search sections (e.g. Section 3, Section 8B, input tax, retail price)...' :
                  activeTab === 'caselaws' ? 'Search case laws (e.g. 2023 PTD 1450, Supreme Court, banking channel)...' :
                  activeTab === 'sros' ? 'Search SROs / STGOs (e.g. SRO 350, SRO 297, withholding, POS)...' :
                  'Search practical problems (e.g. Rule 25 apportionment, 90% cap, further tax)...'
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-900/90 border border-slate-700 rounded-lg text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Sub-Filters */}
            {activeTab === 'caselaws' && (
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Filter className="w-4 h-4 text-slate-400" />
                <select
                  value={selectedCourt}
                  onChange={(e) => setSelectedCourt(e.target.value)}
                  className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
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
                  className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
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
                  className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
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

        {/* TAB 1: STATUTE SECTIONS */}
        {activeTab === 'statute' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredSections.map((sec) => (
                <div
                  key={sec.id}
                  className="bg-slate-800/70 border border-slate-700/60 hover:border-emerald-500/50 rounded-xl p-5 transition flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="px-2.5 py-1 rounded bg-emerald-950/80 text-emerald-400 text-xs font-bold border border-emerald-800/60">
                        {sec.section}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        {sec.chapter.split(':')[0]}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition mb-2">
                      {sec.title}
                    </h3>

                    <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed mb-4">
                      {sec.description}
                    </p>

                    {sec.key_amendments && (
                      <div className="bg-slate-900/60 rounded-lg p-2.5 mb-3 border border-slate-700/50 text-[11px] text-amber-300/90">
                        <strong className="text-amber-400 font-semibold">Amendment Note: </strong>
                        {sec.key_amendments}
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-slate-700/40 flex items-center justify-between gap-2">
                    <div className="flex flex-wrap gap-1">
                      {sec.cross_references?.slice(0, 2).map((cr, idx) => (
                        <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-slate-700/50 text-slate-300">
                          {cr}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => handleInterpretSection(sec)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition whitespace-nowrap"
                    >
                      <span>AI Interpretation</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredSections.length === 0 && (
              <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-12 text-center text-slate-400">
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
                  className="bg-slate-800/70 border border-slate-700/60 hover:border-emerald-500/50 rounded-xl p-5 transition space-y-3"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-1 rounded bg-amber-950/80 text-amber-300 font-mono text-xs font-bold border border-amber-800/60">
                      {cl.citation}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-slate-400">
                      <Calendar className="w-3.5 h-3.5" />
                      {cl.year}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white">
                      {cl.title}
                    </h3>
                    <p className="text-xs text-emerald-400 font-medium mt-0.5">
                      {cl.court} &bull; Relevant: {cl.relevant_sections}
                    </p>
                  </div>

                  <div className="bg-slate-900/80 rounded-lg p-3 border border-slate-700/50 space-y-2">
                    <p className="text-xs text-slate-300 leading-relaxed">
                      <strong className="text-slate-100 font-semibold">Summary of Facts: </strong>
                      {cl.summary}
                    </p>
                    <p className="text-xs text-emerald-300 leading-relaxed font-medium">
                      <strong className="text-emerald-400 font-semibold">Ratio Decidendi / Key Holding: </strong>
                      {cl.key_holding}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {cl.keywords.map((kw, idx) => (
                      <span key={idx} className="text-[10px] px-2 py-0.5 rounded-full bg-slate-700/60 text-slate-300 border border-slate-600/40">
                        #{kw}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-700/40">
                    <button
                      onClick={() => handleCopy(`${cl.citation} - ${cl.title}\nKey Holding: ${cl.key_holding}`, cl.id)}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-700/60 hover:bg-slate-700 text-xs text-slate-200 transition"
                    >
                      {copiedId === cl.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedId === cl.id ? 'Copied' : 'Copy Citation'}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredCaseLaws.length === 0 && (
              <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-12 text-center text-slate-400">
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
                  className="bg-slate-800/70 border border-slate-700/60 hover:border-emerald-500/50 rounded-xl p-5 transition flex flex-col justify-between"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`px-2.5 py-0.5 rounded text-[11px] font-bold border ${
                        sro.category === 'SRO' ? 'bg-indigo-950 text-indigo-300 border-indigo-800' :
                        sro.category === 'STGO' ? 'bg-purple-950 text-purple-300 border-purple-800' :
                        'bg-emerald-950 text-emerald-300 border-emerald-800'
                      }`}>
                        {sro.category}
                      </span>
                      <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800/50 font-medium">
                        {sro.status}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white">
                      {sro.number}
                    </h3>
                    <p className="text-xs font-semibold text-slate-300">
                      {sro.title}
                    </p>

                    <p className="text-xs text-slate-400 leading-relaxed">
                      {sro.description}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-slate-700/40 text-[11px] text-slate-400 flex items-center justify-between">
                    <span>Issued by: {sro.issuing_authority}</span>
                    <span className="font-mono text-slate-300">{sro.year}</span>
                  </div>
                </div>
              ))}
            </div>

            {filteredSros.length === 0 && (
              <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-12 text-center text-slate-400">
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
                  className="bg-slate-800/80 border border-slate-700/60 rounded-xl p-6 shadow-md space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
                          {prob.section_id}
                        </span>
                        <span className="text-xs text-slate-400 font-mono">
                          {prob.statutory_ref}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-white">
                        {prob.topic}
                      </h3>
                    </div>

                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border self-start sm:self-auto ${
                      prob.difficulty_level.includes('Advanced') ? 'bg-red-950 text-red-300 border-red-800' :
                      prob.difficulty_level.includes('Intermediate') ? 'bg-amber-950 text-amber-300 border-amber-800' :
                      'bg-emerald-950 text-emerald-300 border-emerald-800'
                    }`}>
                      {prob.difficulty_level}
                    </span>
                  </div>

                  {/* Scenario */}
                  <div className="bg-slate-900/90 rounded-xl p-4 border border-slate-700/60">
                    <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Factual Scenario & Practical Problem</span>
                    </h4>
                    <p className="text-xs text-slate-300 whitespace-pre-line leading-relaxed">
                      {prob.scenario}
                    </p>
                  </div>

                  {/* Step by step calculations */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5" />
                      <span>Step-by-Step Statutory Computation</span>
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {prob.calculation_steps.map((step) => (
                        <div key={step.step} className="bg-slate-900/60 border border-slate-700/50 rounded-lg p-3 space-y-1.5">
                          <div className="flex items-center gap-1.5">
                            <span className="w-5 h-5 rounded-full bg-emerald-900/80 text-emerald-400 font-bold text-[11px] flex items-center justify-center">
                              {step.step}
                            </span>
                            <span className="text-xs font-bold text-white">{step.title}</span>
                          </div>
                          <p className="text-xs text-slate-200 font-mono bg-slate-950/60 p-2 rounded border border-slate-800 whitespace-pre-line">
                            {step.computation}
                          </p>
                          <p className="text-[11px] text-slate-400">
                            {step.statutory_reason}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Final Solution & Takeaways */}
                  <div className="bg-emerald-950/30 border border-emerald-500/30 rounded-xl p-4 space-y-2">
                    <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Tax Return Determination & Practical Solution</span>
                    </h4>
                    <p className="text-xs text-slate-200 whitespace-pre-line font-mono bg-slate-900/80 p-3 rounded-lg border border-slate-700/50">
                      {prob.solution}
                    </p>

                    <div className="pt-2">
                      <p className="text-xs font-bold text-slate-300 mb-1">Practical Takeaways for Tax Advisors:</p>
                      <ul className="list-disc list-inside text-xs text-slate-400 space-y-0.5">
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
              <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-12 text-center text-slate-400">
                No solved problems found matching &quot;{searchQuery}&quot;.
              </div>
            )}
          </div>
        )}

        {/* TAB 5: AUTOMATED NOTICE REPLY DRAFTER */}
        {activeTab === 'notice_draft' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Input Form */}
            <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl p-6 shadow-md space-y-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-emerald-400" />
                  <span>FBR Notice Reply & Explanation Generator</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Automated court-admissible draft generator incorporating Sales Tax Act 1990 sections and landmark appellate citations.
                </p>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Notice Type / Section</label>
                  <input
                    type="text"
                    value={noticeForm.noticeType}
                    onChange={(e) => setNoticeForm({ ...noticeForm, noticeType: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Section Code</label>
                    <input
                      type="text"
                      value={noticeForm.sectionCode}
                      onChange={(e) => setNoticeForm({ ...noticeForm, sectionCode: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Tax Period</label>
                    <input
                      type="text"
                      value={noticeForm.taxPeriod}
                      onChange={(e) => setNoticeForm({ ...noticeForm, taxPeriod: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Taxpayer Name / Entity</label>
                    <input
                      type="text"
                      value={noticeForm.taxpayerName}
                      onChange={(e) => setNoticeForm({ ...noticeForm, taxpayerName: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-medium mb-1">NTN / STRN</label>
                    <input
                      type="text"
                      value={noticeForm.ntnStrn}
                      onChange={(e) => setNoticeForm({ ...noticeForm, ntnStrn: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Addressing Officer / Jurisdiction</label>
                  <input
                    type="text"
                    value={noticeForm.officerDesignation}
                    onChange={(e) => setNoticeForm({ ...noticeForm, officerDesignation: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Departmental Allegations</label>
                  <textarea
                    rows={2}
                    value={noticeForm.allegationsSummary}
                    onChange={(e) => setNoticeForm({ ...noticeForm, allegationsSummary: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Key Substantive Defense Grounds</label>
                  <textarea
                    rows={3}
                    value={noticeForm.defenseGrounds}
                    onChange={(e) => setNoticeForm({ ...noticeForm, defenseGrounds: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Attached Documents / Evidences</label>
                  <input
                    type="text"
                    value={noticeForm.attachedDocuments}
                    onChange={(e) => setNoticeForm({ ...noticeForm, attachedDocuments: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <button
                  onClick={handleGenerateNoticeDraft}
                  disabled={drafting}
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-950/50 flex items-center justify-center gap-2 transition disabled:opacity-50"
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
            <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl p-6 shadow-md flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <FileText className="w-4 h-4 text-emerald-400" />
                    <span>Court-Admissible Legal Draft</span>
                  </h3>

                  {generatedDraft && (
                    <button
                      onClick={() => handleCopy(generatedDraft, 'draft-output')}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-xs text-white transition"
                    >
                      {copiedId === 'draft-output' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedId === 'draft-output' ? 'Copied' : 'Copy Full Draft'}</span>
                    </button>
                  )}
                </div>

                {generatedDraft ? (
                  <div className="bg-slate-900 rounded-xl p-4 border border-slate-700 max-h-[600px] overflow-y-auto font-mono text-xs text-slate-200 whitespace-pre-line leading-relaxed select-text">
                    {generatedDraft}
                  </div>
                ) : (
                  <div className="h-96 flex flex-col items-center justify-center text-center p-8 bg-slate-900/50 border border-dashed border-slate-700 rounded-xl text-slate-400 space-y-3">
                    <FileText className="w-12 h-12 text-slate-600" />
                    <p className="text-sm font-medium">No reply draft generated yet.</p>
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
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
              
              {/* Modal Header */}
              <div className="p-6 border-b border-slate-800 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded bg-emerald-950 text-emerald-400 text-xs font-bold border border-emerald-800">
                      {selectedSection.section}
                    </span>
                    <span className="text-xs text-slate-400">{selectedSection.act_type}</span>
                  </div>
                  <h2 className="text-xl font-extrabold text-white mt-1">
                    {selectedSection.title}
                  </h2>
                </div>

                <button
                  onClick={() => setSelectedSection(null)}
                  className="p-2 text-slate-400 hover:text-white rounded-lg transition"
                >
                  &times;
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto space-y-4 flex-1 text-xs">
                
                {/* Verbatim Section */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <h4 className="font-bold text-slate-300 uppercase tracking-wider">Statutory Text:</h4>
                  <p className="text-slate-300 leading-relaxed">{selectedSection.description}</p>
                  
                  {selectedSection.sub_sections && (
                    <div className="pt-2 space-y-1">
                      <p className="font-semibold text-slate-400">Sub-Sections:</p>
                      {selectedSection.sub_sections.map((sub, idx) => (
                        <p key={idx} className="text-slate-400 pl-2 border-l border-slate-700">{sub}</p>
                      ))}
                    </div>
                  )}
                </div>

                {/* Practical Notes */}
                <div className="bg-emerald-950/30 p-4 rounded-xl border border-emerald-500/20 space-y-1">
                  <h4 className="font-bold text-emerald-400 uppercase tracking-wider">Senior Counsel Practical Notes:</h4>
                  <p className="text-slate-300 leading-relaxed">{selectedSection.practical_notes}</p>
                </div>

                {/* AI Deep Legal Opinion */}
                {interpreting ? (
                  <div className="py-8 flex flex-col items-center justify-center text-center space-y-3">
                    <Loader2 className="w-8 h-8 text-emerald-400 animate-spin" />
                    <p className="text-xs text-slate-300">Consulting Pakistani Sales Tax Jurisprudence & Appellate Rulings...</p>
                  </div>
                ) : aiInterpretation ? (
                  <div className="bg-slate-950 p-4 rounded-xl border border-emerald-500/30 space-y-2">
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
              <div className="p-4 border-t border-slate-800 flex items-center justify-between bg-slate-900/50">
                <button
                  onClick={() => setSelectedSection(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white transition"
                >
                  Close
                </button>

                <button
                  onClick={() => handleInterpretSection(selectedSection)}
                  disabled={interpreting}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{interpreting ? 'Interpreting...' : 'Re-Generate AI Analysis'}</span>
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
