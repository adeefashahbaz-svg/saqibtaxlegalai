import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { 
  ShieldCheck, 
  FileText, 
  Upload, 
  Sparkles, 
  AlertOctagon, 
  CheckCircle2, 
  Lock, 
  ArrowRight,
  Scale,
  Copy,
  Check
} from 'lucide-react';
import { UserProfile } from '../types';

interface DocumentAnalyzerViewProps {
  user: UserProfile | null;
  onOpenAuth: (mode: 'signin' | 'signup') => void;
  onOpenTierModal: () => void;
}

const SAMPLE_CONTRACT = `SERVICES & VENDOR AGREEMENT
BETWEEN:
Alpha Technology Solutions (Private) Limited, a company incorporated in Pakistan having NTN: 8932140-5 ("Client")
AND
Indus Cloud Logistics ("Service Provider")

1. SCOPE & FEES:
The Service Provider agrees to deliver IT management and software infrastructure for an aggregate monthly fee of PKR 1,500,000 (exclusive of all taxes).

2. TAX DEDUCTION & WITHHOLDING:
The Client shall pay the net amount after deducting applicable withholding taxes under Section 153(1)(b) of the Income Tax Ordinance 2001. If the Service Provider does not appear on the ATL, tax shall be deducted at 100% higher rates.

3. PROVINCIAL SALES TAX ON SERVICES:
The Service Provider shall furnish sales tax invoices under the Punjab Sales Tax on Services Act 2012 at the applicable rate of 16% along with proof of PRA e-filing.

4. INDEMNIFICATION & PENALTY:
Any penalties or default surcharges levied by FBR or PRA due to failure of filing withholding statements by either party shall be indemnified by the defaulting party.`;

export const DocumentAnalyzerView: React.FC<DocumentAnalyzerViewProps> = ({
  user,
  onOpenAuth,
  onOpenTierModal,
}) => {
  const [documentType, setDocumentType] = useState('Commercial Service Agreement');
  const [documentText, setDocumentText] = useState(SAMPLE_CONTRACT);
  const [loading, setLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string>('');
  const [copied, setCopied] = useState(false);

  const token = localStorage.getItem('saqibtax_token');
  const isFreeTier = !user || user.subscriptionTier === 'free';

  const handleAnalyze = async () => {
    if (!token) {
      onOpenAuth('signin');
      return;
    }
    if (isFreeTier) {
      onOpenTierModal();
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/tools/analyze-document', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          documentText,
          documentType,
        }),
      });

      if (!res.ok) {
        let errDetail = 'Analysis failed';
        try {
          const errData = await res.json();
          errDetail = errData.detail || errDetail;
        } catch {
          // ignore non-json
        }
        throw new Error(errDetail);
      }

      const data = await res.json();
      setAnalysisResult(data.analysis);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(analysisResult);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 rounded-2xl p-6 text-white shadow-lg border border-slate-700/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              Pro & Enterprise Legal Audit Feature
            </span>
            <span className="text-xs text-slate-400">ITO 2001, PRA/SRB Sales Tax & Contract Law</span>
          </div>
          <h1 className="text-2xl font-black tracking-tight flex items-center gap-2.5">
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
            <span>Document & Contract Tax Exposure Reviewer</span>
          </h1>
          <p className="text-xs text-slate-300 mt-1 max-w-3xl">
            Upload or paste agreements, commercial contracts, or tax deduction certificates to detect withholding tax liabilities, provincial sales tax exposure, and non-compliance vulnerabilities.
          </p>
        </div>

        {isFreeTier && (
          <button
            onClick={onOpenTierModal}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition"
          >
            <Lock className="w-4 h-4" />
            <span>Upgrade to Pro to Unlock</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: Input Text & Settings (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Document Text / Contract Clauses
            </h2>
            <button
              onClick={() => setDocumentText(SAMPLE_CONTRACT)}
              className="text-[11px] font-semibold text-emerald-700 hover:underline"
            >
              Load Sample Contract
            </button>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Document Classification
            </label>
            <select
              value={documentType}
              onChange={(e) => setDocumentType(e.target.value)}
              className="w-full px-3 py-2 text-xs font-semibold text-slate-800 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none bg-white"
            >
              <option value="Commercial Service Agreement">Commercial Service Agreement</option>
              <option value="Vendor Procurement Contract">Vendor Procurement Contract</option>
              <option value="FBR Show Cause Notice">FBR Show Cause Notice</option>
              <option value="Employment & Executive Compensation Contract">Employment & Executive Compensation Contract</option>
              <option value="Commercial Property Lease Agreement">Commercial Property Lease Agreement</option>
            </select>
          </div>

          <div>
            <textarea
              rows={14}
              value={documentText}
              onChange={(e) => setDocumentText(e.target.value)}
              placeholder="Paste contract terms, tax deduction challans, or notice paragraphs here..."
              className="w-full p-3 text-xs font-mono bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none leading-relaxed text-slate-800"
            />
          </div>

          <button
            id="btn-analyze-document"
            type="button"
            onClick={handleAnalyze}
            disabled={loading || !documentText.trim()}
            className="w-full py-3 px-4 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-bold text-xs rounded-xl shadow-md shadow-emerald-950/20 transition flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Auditing Tax & Legal Exposure...</span>
              </div>
            ) : isFreeTier ? (
              <>
                <Lock className="w-4 h-4 text-amber-300" />
                <span>Unlock Contract Audit (Pro Tier)</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Run AI Legal & Tax Compliance Audit</span>
              </>
            )}
          </button>
        </div>

        {/* RIGHT COLUMN: Legal Audit Findings Report (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col min-h-[500px]">
          
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 shrink-0">
            <div>
              <h3 className="text-xs font-bold text-slate-900">
                Statutory Compliance & Tax Exposure Findings
              </h3>
              <p className="text-[11px] text-slate-500">Withholding tax obligations, provincial sales tax, and indemnification advice</p>
            </div>

            {analysisResult && (
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy Audit'}</span>
              </button>
            )}
          </div>

          <div className="flex-1 overflow-y-auto mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs leading-relaxed text-slate-800">
            {analysisResult ? (
              <div className="prose prose-xs max-w-none">
                <div className="markdown-body">
                  <ReactMarkdown>{analysisResult}</ReactMarkdown>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 text-slate-400">
                <Scale className="w-12 h-12 text-slate-300 mb-3" />
                <p className="font-bold text-slate-700 text-sm">No Document Audit Generated Yet</p>
                <p className="text-xs text-slate-500 max-w-sm mt-1">
                  Paste your legal contract or notice text on the left, then click <strong>Run AI Legal & Tax Compliance Audit</strong>.
                </p>
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};
