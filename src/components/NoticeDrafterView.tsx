import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { 
  FileText, 
  Send, 
  Sparkles, 
  Copy, 
  Check, 
  Download, 
  Scale, 
  ShieldAlert, 
  BookOpen, 
  HelpCircle,
  Building,
  UserCheck,
  RotateCcw
} from 'lucide-react';
import { FBR_NOTICE_TYPES } from '../utils/taxEngine';
import { generateNoticeReplyPDF } from '../utils/pdfGenerator';
import { UserProfile } from '../types';

interface NoticeDrafterViewProps {
  user: UserProfile | null;
  onOpenAuth: (mode: 'signin' | 'signup') => void;
  onOpenTierModal: () => void;
}

export const NoticeDrafterView: React.FC<NoticeDrafterViewProps> = ({
  user,
  onOpenAuth,
  onOpenTierModal,
}) => {
  const [selectedSection, setSelectedSection] = useState('114(4)');
  const [taxYear, setTaxYear] = useState('2024-2025');
  const [taxpayerName, setTaxpayerName] = useState(user?.fullName || 'Muhammad Asif / XYZ Enterprises');
  const [ntnOrCnic, setNtnOrCnic] = useState(user?.ntnNumber || '42101-9876543-1');
  const [jurisdiction, setJurisdiction] = useState('Regional Tax Office (RTO) Islamabad');
  const [officerDesignation, setOfficerDesignation] = useState('The Deputy Commissioner Inland Revenue, Audit Unit-04');
  const [keyIssues, setKeyIssues] = useState(
    'Taxpayer is a salaried employee whose full tax was deducted at source under Section 149. The return could not be submitted on time due to IRIS system outage and travel abroad.'
  );
  const [supportingDocuments, setSupportingDocuments] = useState(
    '1. Salary Tax Deduction Certificate under Section 149.\n2. Bank Statement for FY 2024.\n3. Passport Copy with Immigration exit/entry stamps.'
  );

  const [loading, setLoading] = useState(false);
  const [generatedDraft, setGeneratedDraft] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const token = localStorage.getItem('saqibtax_token');

  const selectedNoticeMeta = FBR_NOTICE_TYPES.find(n => n.code === selectedSection);

  const handleGenerateDraft = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      onOpenAuth('signin');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/tools/notice-draft', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          noticeType: selectedNoticeMeta?.title,
          sectionCode: selectedSection,
          taxYear,
          taxpayerName,
          ntnOrCnic,
          jurisdiction,
          officerDesignation,
          keyIssues,
          supportingDocuments,
        }),
      });

      if (!res.ok) {
        let errDetail = 'Failed to generate draft';
        try {
          const errData = await res.json();
          errDetail = errData.detail || errDetail;
        } catch {
          // ignore non-json error responses
        }
        throw new Error(errDetail);
      }

      const data = await res.json();
      setGeneratedDraft(data.draftText);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedDraft);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExportPDF = () => {
    if (!generatedDraft) return;
    generateNoticeReplyPDF(`Reply to FBR Notice ${selectedSection}`, selectedSection, generatedDraft, taxpayerName);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 rounded-2xl p-6 text-white shadow-lg border border-slate-700/60">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
            Court & FBR Admissible Legal Reply Format
          </span>
          <span className="text-xs text-slate-400">Income Tax Ordinance, 2001</span>
        </div>
        <h1 className="text-2xl font-black tracking-tight flex items-center gap-2.5">
          <FileText className="w-6 h-6 text-emerald-400" />
          <span>FBR Show Cause Notice Reply Drafter</span>
        </h1>
        <p className="text-xs text-slate-300 mt-1 max-w-3xl">
          Instantly formulate statutory responses to audit, non-filing, amendment, or withholding inquiries with legal citations, High Court precedents, and structured prayer clauses.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: Notice Parameter Form (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <Scale className="w-4 h-4 text-emerald-600" />
            <span>Notice Parameters & Defense Facts</span>
          </h2>

          <form onSubmit={handleGenerateDraft} className="space-y-3.5">
            
            {/* Notice Section Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-900 mb-1">
                Select FBR Notice Statutory Section
              </label>
              <select
                id="select-notice-section"
                value={selectedSection}
                onChange={(e) => setSelectedSection(e.target.value)}
                className="w-full px-3 py-2 text-xs font-semibold text-slate-900 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
              >
                {FBR_NOTICE_TYPES.map(n => (
                  <option key={n.code} value={n.code}>
                    {n.title}
                  </option>
                ))}
              </select>
              {selectedNoticeMeta && (
                <p className="text-[11px] text-slate-500 mt-1 italic">
                  {selectedNoticeMeta.description}
                </p>
              )}
            </div>

            {/* Tax Year & Taxpayer Name */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-900 mb-1">
                  Tax Year
                </label>
                <input
                  type="text"
                  value={taxYear}
                  onChange={(e) => setTaxYear(e.target.value)}
                  placeholder="e.g. 2024-2025"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-900 mb-1">
                  NTN / CNIC
                </label>
                <input
                  type="text"
                  value={ntnOrCnic}
                  onChange={(e) => setNtnOrCnic(e.target.value)}
                  placeholder="e.g. 7193840-1"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-900 mb-1">
                Taxpayer / Company Full Name
              </label>
              <input
                type="text"
                value={taxpayerName}
                onChange={(e) => setTaxpayerName(e.target.value)}
                placeholder="e.g. Muhammad Asif"
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>

            {/* Jurisdiction & Officer */}
            <div>
              <label className="block text-xs font-bold text-slate-900 mb-1">
                Regional Tax Office (RTO / LTO / CTO)
              </label>
              <input
                type="text"
                value={jurisdiction}
                onChange={(e) => setJurisdiction(e.target.value)}
                placeholder="e.g. RTO Lahore / CTO Karachi"
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-900 mb-1">
                Designation of Assessing Officer
              </label>
              <input
                type="text"
                value={officerDesignation}
                onChange={(e) => setOfficerDesignation(e.target.value)}
                placeholder="e.g. Deputy Commissioner Inland Revenue, Audit Unit-02"
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>

            {/* Factual Defense */}
            <div>
              <label className="block text-xs font-bold text-slate-900 mb-1">
                Factual Defense & Key Grounds of Explanation
              </label>
              <textarea
                rows={3}
                value={keyIssues}
                onChange={(e) => setKeyIssues(e.target.value)}
                placeholder="Explain the actual facts, reason for delay, source of funds, or withholding tax compliance..."
                className="w-full p-2.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>

            {/* Enclosed Documents */}
            <div>
              <label className="block text-xs font-bold text-slate-900 mb-1">
                Supporting Evidentiary Documents / Annexures
              </label>
              <textarea
                rows={2}
                value={supportingDocuments}
                onChange={(e) => setSupportingDocuments(e.target.value)}
                placeholder="Itemize documents: Bank statements, CPRs, Salary certificates, Invoices..."
                className="w-full p-2.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>

            <button
              id="btn-generate-notice"
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-bold text-xs rounded-xl shadow-md shadow-emerald-950/20 transition flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Drafting Court-Grade Legal Reply...</span>
                </div>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Formal FBR Legal Reply</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* RIGHT COLUMN: Generated Legal Document Viewer (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col min-h-[500px]">
          
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 shrink-0">
            <div>
              <h3 className="text-xs font-bold text-slate-900">
                Official Legal Response Document
              </h3>
              <p className="text-[11px] text-slate-500">Formulated in accordance with FBR Inland Revenue Appellate Standards</p>
            </div>

            {generatedDraft && (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy Text'}</span>
                </button>

                <button
                  onClick={handleExportPDF}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 rounded-lg transition"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export PDF</span>
                </button>
              </div>
            )}
          </div>

          <div className="flex-1 overflow-y-auto mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs font-serif leading-relaxed text-slate-800">
            {generatedDraft ? (
              <div className="prose prose-xs max-w-none">
                <div className="markdown-body">
                  <ReactMarkdown>{generatedDraft}</ReactMarkdown>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 text-slate-400">
                <FileText className="w-12 h-12 text-slate-300 mb-3" />
                <p className="font-bold text-slate-700 text-sm">No Reply Draft Generated Yet</p>
                <p className="text-xs text-slate-500 max-w-sm mt-1">
                  Fill in the notice details and factual grounds on the left, then click <strong>Generate Formal FBR Legal Reply</strong>.
                </p>
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};
