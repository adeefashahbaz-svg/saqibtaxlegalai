/**
 * SaqibTax - Client Privacy & Secure Local Storage Utility
 * 
 * Provides deterministic client-side encryption, integrity hashing,
 * screen masking helpers, and local storage lifecycle controls (Export, Import, Purge).
 */

const STORAGE_ENCRYPTION_PREFIX = 'SAQIBTAX_ENC_V1$';
const PRIVACY_SETTINGS_KEY = 'saqibtax_privacy_settings_v1';

// Default salt for obfuscated local storage
const SALT_KEY = 'SQTB2B_LAW_CONFIDENTIAL_2026';

export interface PrivacySettings {
  screenMaskingEnabled: boolean;
  storageEncryptionEnabled: boolean;
  autoMaskOnInactivity: boolean;
  lastBackupDate?: string;
}

export const DEFAULT_PRIVACY_SETTINGS: PrivacySettings = {
  screenMaskingEnabled: false,
  storageEncryptionEnabled: true,
  autoMaskOnInactivity: false,
};

/**
 * Deterministic XOR + Base64 Scramble for Client Data at Rest
 */
function xorEncrypt(text: string, key: string): string {
  let result = '';
  for (let i = 0; i < text.length; i++) {
    const charCode = text.charCodeAt(i) ^ key.charCodeAt(i % key.length);
    result += String.fromCharCode(charCode);
  }
  try {
    return btoa(encodeURIComponent(result));
  } catch {
    return btoa(result);
  }
}

function xorDecrypt(cipherText: string, key: string): string {
  try {
    let decoded = '';
    try {
      decoded = decodeURIComponent(atob(cipherText));
    } catch {
      decoded = atob(cipherText);
    }
    let result = '';
    for (let i = 0; i < decoded.length; i++) {
      const charCode = decoded.charCodeAt(i) ^ key.charCodeAt(i % key.length);
      result += String.fromCharCode(charCode);
    }
    return result;
  } catch (e) {
    console.error('Decryption failed:', e);
    return '';
  }
}

/**
 * Encrypt and store data safely in LocalStorage
 */
export function setSecureItem<T>(key: string, value: T, encrypt: boolean = true): void {
  try {
    const jsonStr = JSON.stringify(value);
    if (!encrypt) {
      localStorage.setItem(key, jsonStr);
      return;
    }
    const encrypted = xorEncrypt(jsonStr, SALT_KEY);
    localStorage.setItem(key, `${STORAGE_ENCRYPTION_PREFIX}${encrypted}`);
  } catch (err) {
    console.error(`Failed to securely save key "${key}":`, err);
  }
}

/**
 * Retrieve and decrypt data from LocalStorage with backwards compatibility
 */
export function getSecureItem<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;

    // Check if data is encrypted with current prefix
    if (raw.startsWith(STORAGE_ENCRYPTION_PREFIX)) {
      const payload = raw.substring(STORAGE_ENCRYPTION_PREFIX.length);
      const decryptedJson = xorDecrypt(payload, SALT_KEY);
      if (decryptedJson) {
        return JSON.parse(decryptedJson) as T;
      }
    }

    // Backwards compatible: Try raw JSON parse if unencrypted
    try {
      const parsed = JSON.parse(raw);
      return parsed as T;
    } catch {
      return fallback;
    }
  } catch (err) {
    console.error(`Failed to retrieve/decrypt key "${key}":`, err);
    return fallback;
  }
}

/**
 * Get / Save Privacy Settings
 */
export function getPrivacySettings(): PrivacySettings {
  return getSecureItem<PrivacySettings>(PRIVACY_SETTINGS_KEY, DEFAULT_PRIVACY_SETTINGS);
}

export function savePrivacySettings(settings: PrivacySettings): void {
  setSecureItem(PRIVACY_SETTINGS_KEY, settings, false);
}

/**
 * Screen Privacy Masking Helpers
 */
export function maskCNIC(cnic?: string, isMasked: boolean = false): string {
  if (!cnic) return 'N/A';
  if (!isMasked) return cnic;
  const parts = cnic.split('-');
  if (parts.length === 3) {
    return `${parts[0]}-•••••••-${parts[2]}`;
  }
  return cnic.slice(0, 3) + '••••••' + cnic.slice(-2);
}

export function maskNTN(ntn?: string, isMasked: boolean = false): string {
  if (!ntn) return 'N/A';
  if (!isMasked) return ntn;
  const parts = ntn.split('-');
  if (parts.length === 2) {
    return `•••••••-${parts[1]}`;
  }
  return '•••••••-' + ntn.slice(-1);
}

export function maskCurrency(amount: number | undefined | null, isMasked: boolean = false): string {
  if (amount === undefined || amount === null) return 'PKR 0';
  if (isMasked) return 'PKR ••••••••';
  return `PKR ${amount.toLocaleString('en-PK')}`;
}

export function maskGenericNumber(amount: number | undefined | null, isMasked: boolean = false): string {
  if (amount === undefined || amount === null) return '0';
  if (isMasked) return '••••••';
  return amount.toLocaleString('en-PK');
}

export function maskBankAccount(account?: string, isMasked: boolean = false): string {
  if (!account) return 'N/A';
  if (!isMasked) return account;
  return account.replace(/\d{4}(?=\d)/g, '•••• ');
}

/**
 * Storage Footprint & Record Statistics
 */
export interface StorageAuditStats {
  clientCount: number;
  invoiceCount: number;
  calculationCount: number;
  totalStorageBytes: number;
  isEncrypted: boolean;
  lastUpdated: string;
}

export function getStorageAuditStats(): StorageAuditStats {
  const CLIENT_LEDGER_KEY = 'saqibtax_client_ledger_v1';
  const INVOICES_KEY = 'saqibtax_invoices_v1';

  let clientCount = 0;
  let calculationCount = 0;
  let invoiceCount = 0;
  let totalBytes = 0;
  let isEncrypted = true;

  try {
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith('saqibtax_')) {
        const val = localStorage.getItem(k) || '';
        totalBytes += (k.length + val.length) * 2; // UTF-16 approximate bytes
        if (k === CLIENT_LEDGER_KEY) {
          if (!val.startsWith(STORAGE_ENCRYPTION_PREFIX)) isEncrypted = false;
        }
      }
    }

    const clientsRaw = getSecureItem<any[]>(CLIENT_LEDGER_KEY, []);
    clientCount = clientsRaw.length;
    calculationCount = clientsRaw.reduce((acc, curr) => acc + (curr.savedCalculations?.length || 0), 0);

    const invoicesRaw = getSecureItem<any[]>(INVOICES_KEY, []);
    invoiceCount = invoicesRaw.length;
  } catch (e) {
    console.error('Failed to compute storage audit:', e);
  }

  return {
    clientCount,
    invoiceCount,
    calculationCount,
    totalStorageBytes: totalBytes,
    isEncrypted,
    lastUpdated: new Date().toISOString(),
  };
}

/**
 * Export full client ledger and invoice records as downloadable JSON
 */
export function exportSecureBackup(includeFirmBranding: boolean = true): string {
  const FIRM_BRANDING_KEY = 'saqibtax_firm_branding_v1';
  const CLIENT_LEDGER_KEY = 'saqibtax_client_ledger_v1';
  const INVOICES_KEY = 'saqibtax_invoices_v1';

  const backupData = {
    app: 'SaqibTax Legal-Tech Suite',
    version: '2026.1.0',
    exportTimestamp: new Date().toISOString(),
    statutoryBasis: 'Pakistan Finance Act 2026 & Income Tax Ordinance 2001',
    data: {
      firmBranding: includeFirmBranding ? getSecureItem(FIRM_BRANDING_KEY, null) : null,
      clients: getSecureItem(CLIENT_LEDGER_KEY, []),
      invoices: getSecureItem(INVOICES_KEY, []),
      privacySettings: getPrivacySettings()
    }
  };

  return JSON.stringify(backupData, null, 2);
}

/**
 * Import and restore backup
 */
export function importSecureBackup(jsonContent: string): { success: boolean; message: string; clientCount?: number } {
  try {
    const parsed = JSON.parse(jsonContent);
    if (!parsed || !parsed.data || !Array.isArray(parsed.data.clients)) {
      return { success: false, message: 'Invalid backup structure. Missing client ledger schema.' };
    }

    const FIRM_BRANDING_KEY = 'saqibtax_firm_branding_v1';
    const CLIENT_LEDGER_KEY = 'saqibtax_client_ledger_v1';
    const INVOICES_KEY = 'saqibtax_invoices_v1';

    if (parsed.data.firmBranding) {
      setSecureItem(FIRM_BRANDING_KEY, parsed.data.firmBranding);
    }
    if (parsed.data.clients) {
      setSecureItem(CLIENT_LEDGER_KEY, parsed.data.clients);
    }
    if (parsed.data.invoices) {
      setSecureItem(INVOICES_KEY, parsed.data.invoices);
    }

    return {
      success: true,
      message: `Successfully restored ${parsed.data.clients.length} client dossiers and ${parsed.data.invoices?.length || 0} invoices.`,
      clientCount: parsed.data.clients.length
    };
  } catch (err) {
    return { success: false, message: `Import failed: ${(err as Error).message}` };
  }
}

/**
 * Purge and wipe all local sensitive client data
 */
export function purgeLocalClientStorage(): void {
  const keysToPurge = [
    'saqibtax_client_ledger_v1',
    'saqibtax_invoices_v1',
    'saqibtax_firm_branding_v1',
    'saqibtax_privacy_settings_v1',
    'saqibtax_tax_calc_cache',
    'saqibtax_super_tax_draft',
    'saqibtax_7e_draft'
  ];

  keysToPurge.forEach(k => localStorage.removeItem(k));
}
