import React, { useState, useEffect, useRef } from 'react';
import {
  ShieldCheck,
  Lock,
  Eye,
  EyeOff,
  Download,
  Upload,
  Trash2,
  AlertTriangle,
  CheckCircle2,
  HardDrive,
  RefreshCw,
  X,
  FileSpreadsheet,
  Users
} from 'lucide-react';
import {
  getPrivacySettings,
  savePrivacySettings,
  getStorageAuditStats,
  exportSecureBackup,
  importSecureBackup,
  purgeLocalClientStorage,
  PrivacySettings,
  StorageAuditStats
} from '../utils/cryptoStorage';

interface ClientPrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
  isMasked: boolean;
  onToggleMasking: () => void;
  onDataChanged?: () => void;
}

export const ClientPrivacyModal: React.FC<ClientPrivacyModalProps> = ({
  isOpen,
  onClose,
  isMasked,
  onToggleMasking,
  onDataChanged
}) => {
  const [settings, setSettings] = useState<PrivacySettings>(getPrivacySettings());
  const [stats, setStats] = useState<StorageAuditStats>(getStorageAuditStats());
  const [confirmPurge, setConfirmPurge] = useState(false);
  const [importStatus, setImportStatus] = useState<{ status: 'idle' | 'success' | 'error'; message: string }>({
    status: 'idle',
    message: ''
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setSettings(getPrivacySettings());
      setStats(getStorageAuditStats());
      setConfirmPurge(false);
      setImportStatus({ status: 'idle', message: '' });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleToggleEncryption = () => {
    const updated = { ...settings, storageEncryptionEnabled: !settings.storageEncryptionEnabled };
    setSettings(updated);
    savePrivacySettings(updated);
  };

  const handleExportBackup = () => {
    const backupJson = exportSecureBackup(true);
    const blob = new Blob([backupJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SaqibTax_Client_Ledger_Backup_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const result = importSecureBackup(content);
        if (result.success) {
          setImportStatus({ status: 'success', message: result.message });
          setStats(getStorageAuditStats());
          if (onDataChanged) onDataChanged();
        } else {
          setImportStatus({ status: 'error', message: result.message });
        }
      }
    };
    reader.readAsText(file);
  };

  const handlePurgeAll = () => {
    purgeLocalClientStorage();
    setStats(getStorageAuditStats());
    setConfirmPurge(false);
    setImportStatus({ status: 'success', message: 'All local client files and drafts have been permanently erased.' });
    if (onDataChanged) onDataChanged();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div
        id="client-privacy-modal"
        className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl max-h-[90vh] shadow-2xl flex flex-col overflow-hidden text-slate-100"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-600/40 flex items-center justify-center text-emerald-400">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                Client Privacy & Local Storage Manager
                <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-emerald-900/60 text-emerald-300 border border-emerald-700/50">
                  Zero Cloud Telemetry
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Chamber privacy controls, local AES encryption, and client data backup utilities
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

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-300">
          {/* Status Message */}
          {importStatus.message && (
            <div
              className={`p-3.5 rounded-xl border flex items-center gap-2.5 ${
                importStatus.status === 'success'
                  ? 'bg-emerald-950/50 border-emerald-700/60 text-emerald-200'
                  : 'bg-red-950/50 border-red-700/60 text-red-200'
              }`}
            >
              {importStatus.status === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
              )}
              <span>{importStatus.message}</span>
            </div>
          )}

          {/* Privacy Screen Masking Switch */}
          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                {isMasked ? (
                  <EyeOff className="w-4 h-4 text-amber-400" />
                ) : (
                  <Eye className="w-4 h-4 text-emerald-400" />
                )}
                <span className="font-semibold text-white text-sm">Privacy Presentation Mode (Screen Masking)</span>
              </div>
              <p className="text-slate-400 text-[11px]">
                Instantly mask sensitive CNICs, NTNs, bank account numbers, and declared financial metrics on screen when presenting to clients or sharing displays.
              </p>
            </div>
            <button
              id="btn-toggle-screen-masking"
              onClick={onToggleMasking}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition whitespace-nowrap shadow-sm ${
                isMasked
                  ? 'bg-amber-600 hover:bg-amber-500 text-slate-950'
                  : 'bg-slate-700 hover:bg-slate-600 text-slate-200'
              }`}
            >
              {isMasked ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              <span>{isMasked ? 'Masking ACTIVE' : 'Enable Masking'}</span>
            </button>
          </div>

          {/* Local Storage Audit & Security Footprint */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
              <HardDrive className="w-3.5 h-3.5 text-emerald-400" />
              <span>Encrypted Local Storage Footprint</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
                <span className="text-[11px] text-slate-400 block">Client Dossiers</span>
                <span className="text-base font-bold text-white mt-0.5 block">{stats.clientCount} Profiles</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
                <span className="text-[11px] text-slate-400 block">Tax Calculations</span>
                <span className="text-base font-bold text-white mt-0.5 block">{stats.calculationCount} Saved</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
                <span className="text-[11px] text-slate-400 block">Invoices</span>
                <span className="text-base font-bold text-white mt-0.5 block">{stats.invoiceCount} Records</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
                <span className="text-[11px] text-slate-400 block">Storage Space</span>
                <span className="text-base font-bold text-emerald-400 mt-0.5 block">
                  {(stats.totalStorageBytes / 1024).toFixed(1)} KB
                </span>
              </div>
            </div>
          </div>

          {/* Backup & Portability Actions */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
              <span>Dossier Backup & Chamber Portability</span>
            </h3>
            <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700 space-y-3">
              <p className="text-slate-400 text-[11px]">
                Create a full, offline backup of your firm&apos;s client records, invoices, and wealth reconciliations. No data leaves your machine.
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  id="btn-export-backup-json"
                  onClick={handleExportBackup}
                  className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-2 transition shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Backup (.JSON)</span>
                </button>

                <button
                  id="btn-import-backup-json"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3.5 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200 font-semibold text-xs flex items-center gap-2 transition"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Restore from Backup</span>
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".json"
                  className="hidden"
                />
              </div>
            </div>
          </div>

          {/* Secure Emergency Data Wipe */}
          <div className="p-4 rounded-xl bg-red-950/20 border border-red-900/40 space-y-3">
            <div className="flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-red-300 block">Chamber Station Security & Emergency Purge</span>
                <p className="text-red-200/70 text-[11px]">
                  When concluding work on a public or shared computer, wipe all client profiles, tax computations, and cached drafts permanently.
                </p>
              </div>
            </div>

            {confirmPurge ? (
              <div className="p-3 rounded-lg bg-red-950/60 border border-red-800 space-y-2">
                <span className="text-xs text-red-200 font-bold block">
                  Confirm permanent purge of all client records?
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePurgeAll}
                    className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-xs transition"
                  >
                    Yes, Purge Permanently
                  </button>
                  <button
                    onClick={() => setConfirmPurge(false)}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button
                id="btn-purge-local-storage"
                onClick={() => setConfirmPurge(true)}
                className="px-3.5 py-2 rounded-xl bg-red-950 hover:bg-red-900 border border-red-800 text-red-300 font-semibold text-xs flex items-center gap-2 transition"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Wipe All Local Client Data</span>
              </button>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-800 bg-slate-900/90 flex items-center justify-between text-xs">
          <div className="text-slate-400 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Encrypted At Rest via Obfuscated Local Storage</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold transition"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
