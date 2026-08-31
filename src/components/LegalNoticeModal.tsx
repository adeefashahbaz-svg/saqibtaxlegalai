import React, { useState } from 'react';
import {
  Scale,
  ShieldCheck,
  AlertTriangle,
  FileCheck,
  Lock,
  ExternalLink,
  BookOpen,
  X,
  CheckCircle2,
  HelpCircle
} from 'lucide-react';

interface LegalNoticeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenPrivacyManager?: () => void;
}

export const LegalNoticeModal: React.FC<LegalNoticeModalProps> = ({
  isOpen,
  onClose,
  onOpenPrivacyManager
}) => {
  const [activeSection, setActiveSection] = useState<'statutory' | 'fbr_iris' | 'sec_116' | 'privacy' | 'liability'>('statutory');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div 
        id="legal-notice-dialog"
        className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-4xl max-h-[90vh] shadow-2xl flex flex-col overflow-hidden text-slate-100"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-600/40 flex items-center justify-center text-emerald-400">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                Global Legal Notice & Statutory Disclaimers
                <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-emerald-900/60 text-emerald-300 border border-emerald-700/50">
                  Finance Act 2026
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Statutory determinism, FBR Iris non-substitution, and client confidentiality parameters
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Primary Banner */}
        <div className="px-6 py-3.5 bg-emerald-950/40 border-b border-emerald-800/40 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div className="text-xs text-emerald-200/90 leading-relaxed font-medium">
            <strong>Mandatory Advisory:</strong> SaqibTax is an independent legal-tech assistance platform. All calculations are performed deterministically based on statutory provisions (Finance Act 2026). This application does not substitute official FBR Iris filings.
          </div>
        </div>

        {/* Main Body with Tabs */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Sidebar Tabs */}
          <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-slate-800 bg-slate-950/50 p-3 space-y-1 overflow-y-auto">
            <button
              onClick={() => setActiveSection('statutory')}
              className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition ${
                activeSection === 'statutory'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-300 hover:bg-slate-800/60'
              }`}
            >
              <Scale className="w-4 h-4" />
              <span>Statutory Determinism</span>
            </button>

            <button
              onClick={() => setActiveSection('fbr_iris')}
              className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition ${
                activeSection === 'fbr_iris'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-300 hover:bg-slate-800/60'
              }`}
            >
              <FileCheck className="w-4 h-4" />
              <span>FBR Iris 2.0 Advisory</span>
            </button>

            <button
              onClick={() => setActiveSection('sec_116')}
              className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition ${
                activeSection === 'sec_116'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-300 hover:bg-slate-800/60'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Section 116 Wealth Recon</span>
            </button>

            <button
              onClick={() => setActiveSection('privacy')}
              className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition ${
                activeSection === 'privacy'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-300 hover:bg-slate-800/60'
              }`}
            >
              <Lock className="w-4 h-4" />
              <span>Client Data & Privacy</span>
            </button>

            <button
              onClick={() => setActiveSection('liability')}
              className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition ${
                activeSection === 'liability'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-300 hover:bg-slate-800/60'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Limitation of Liability</span>
            </button>
          </div>

          {/* Tab Content Panel */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4 text-xs text-slate-300 leading-relaxed">
            {activeSection === 'statutory' && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <Scale className="w-4 h-4" />
                  <h3>Deterministic Computation Framework</h3>
                </div>
                <p>
                  SaqibTax computes income tax, progressive rate slabs, Section 4C Super Tax, Section 7E Immovable Property deemed rent, withholding tax adjustments, and provincial sales tax schedules in strict accordance with:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="p-3 rounded-xl bg-slate-800/70 border border-slate-700/60 space-y-1">
                    <span className="font-semibold text-white block">Income Tax Ordinance, 2001</span>
                    <span className="text-[11px] text-slate-400">First Schedule (Part I, III, IV), Section 4C, Section 7E, Section 37/37A Capital Gains, Section 116.</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-800/70 border border-slate-700/60 space-y-1">
                    <span className="font-semibold text-white block">Finance Act, 2026 Amendments</span>
                    <span className="text-[11px] text-slate-400">Enhanced progressive surcharge on high earners, revised banking & telecom WHT rates, and Section 236C/K thresholds.</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-800/70 border border-slate-700/60 space-y-1">
                    <span className="font-semibold text-white block">Provincial Sales Tax on Services</span>
                    <span className="text-[11px] text-slate-400">Punjab (PRA 16%), Sindh (SRB 15%), Khyber Pakhtunkhwa (KPRA 15%), and Balochistan (BRA 15%).</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-800/70 border border-slate-700/60 space-y-1">
                    <span className="font-semibold text-white block">Sales Tax Act, 1990 & FEA 2005</span>
                    <span className="text-[11px] text-slate-400">Standard 18% rate, Third Schedule retail price taxation, and Zero-Rating Fifth Schedule provisions.</span>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'fbr_iris' && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                  <FileCheck className="w-4 h-4" />
                  <h3>Non-Substitution of Official FBR Iris Portal</h3>
                </div>
                <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-800/40 text-amber-200 text-xs leading-relaxed space-y-2">
                  <p className="font-semibold">Notice on Statutory Returns & Challans:</p>
                  <ul className="list-disc pl-5 space-y-1 text-slate-300">
                    <li>This platform serves as an <strong>analytical, pre-filing reconciliation, and drafting engine</strong>.</li>
                    <li>Official annual tax returns, withholding statements (Section 165), and monthly sales tax returns (STR-7) must be submitted directly through the <strong>Federal Board of Revenue (FBR) Iris 2.0 portal</strong> (iris.fbr.gov.pk).</li>
                    <li>Payment of taxes requires the creation of an official Computerized Payment Receipt (CPR) or PSID generated through the Iris e-Payment system.</li>
                  </ul>
                </div>
                <p>
                  Taxpayers and practitioners are advised to verify all computed deductible allowances, foreign remittances, and advance tax deductions against Iris MIS 236 withholding records prior to final return submission.
                </p>
              </div>
            )}

            {activeSection === 'sec_116' && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <BookOpen className="w-4 h-4" />
                  <h3>Section 116 Wealth Statement Reconciliation Advisory</h3>
                </div>
                <p>
                  Under Section 116(2) of the Income Tax Ordinance 2001, all individual taxpayers and AOP members are statutorily required to file a complete reconciliation of net wealth.
                </p>
                <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-2">
                  <span className="font-semibold text-white block">Key Legal Considerations:</span>
                  <ul className="list-disc pl-5 space-y-1 text-slate-300 text-[11px]">
                    <li><strong>Unexplained Inflows / Differences:</strong> Any negative unreconciled variation between declared net wealth and calculated inflows is subject to statutory inquiry under Section 111 (Unexplained Income or Assets).</li>
                    <li><strong>Foreign Remittance Encashment:</strong> Inflows under Section 111(4) must be supported by official Proceeds Realization Certificates (PRCs) issued by authorized scheduled banks.</li>
                    <li><strong>Spouse & Minor Assets:</strong> Assets held in the name of a spouse or minor child must be declared unless acquired from independent taxable sources.</li>
                  </ul>
                </div>
              </div>
            )}

            {activeSection === 'privacy' && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <Lock className="w-4 h-4" />
                  <h3>Zero-Cloud Client Confidentiality & Local Encryption</h3>
                </div>
                <p>
                  SaqibTax respects the high-privilege fiduciary relationship between Advocates, Chartered Accountants, and their clients:
                </p>
                <div className="space-y-2">
                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-800/60 border border-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-white">Local-First Storage Architecture</span>
                      <p className="text-[11px] text-slate-400">
                        Client CNICs, NTNs, financial statements, and fee invoices are stored in encrypted browser storage without transmission to third-party marketing servers.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-800/60 border border-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-white">Presentation Privacy Screen Masking</span>
                      <p className="text-[11px] text-slate-400">
                        Activate Privacy Mode to obfuscate all sensitive financial figures and CNIC/NTN numbers while demonstrating dossiers or sharing screens with clients.
                      </p>
                    </div>
                  </div>
                </div>
                {onOpenPrivacyManager && (
                  <button
                    onClick={() => {
                      onClose();
                      onOpenPrivacyManager();
                    }}
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition shadow-sm"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>Open Client Privacy & Storage Manager</span>
                  </button>
                )}
              </div>
            )}

            {activeSection === 'liability' && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <ShieldCheck className="w-4 h-4" />
                  <h3>Limitation of Liability & Practitioner Responsibility</h3>
                </div>
                <p>
                  The outputs, templates, and automated drafts generated by SaqibTax are provided for professional informational and preparatory purposes only. 
                </p>
                <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 text-slate-300 space-y-2 text-[11px]">
                  <p>
                    1. <strong>Independent Professional Review:</strong> Taxpayers and legal practitioners must independently examine and verify all legal authorities, statutory references, and mathematical calculations prior to filing or formal submission before the Commissioner Inland Revenue (CIR), Appellate Tribunal (ATIR), or High Court.
                  </p>
                  <p>
                    2. <strong>No Warranty:</strong> While the underlying statutory tax matrix is rigorously maintained against SROs and statutory circulars, SaqibTax and its authors assume no liability for penalties, default surcharges under Section 205, or assessments levied by tax authorities.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-800 bg-slate-900/90 flex items-center justify-between text-xs">
          <div className="text-slate-400 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Statutory Verification: Finance Act 2026 & ITO 2001</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold transition"
          >
            Acknowledge & Close
          </button>
        </div>
      </div>
    </div>
  );
};
