import React, { useState, useEffect } from 'react';
import {
  Users,
  Briefcase,
  FileText,
  DollarSign,
  Plus,
  Search,
  Filter,
  Download,
  Building,
  CheckCircle,
  Clock,
  AlertTriangle,
  FileCheck,
  Edit2,
  Trash2,
  Save,
  Printer,
  ChevronRight,
  Shield,
  Layers,
  Scale,
  Sparkles,
  RefreshCw,
  Calculator,
  Eye,
  Check,
  Building2,
  Phone,
  Mail,
  MapPin,
  FileSpreadsheet,
  Sliders,
  Award,
  Upload
} from 'lucide-react';
import {
  ClientLedgerProfile,
  ClientCategory,
  ClientComplianceStatus,
  FirmBrandingSettings,
  ProfessionalBillingInvoice,
  BillingServiceItem,
  ClientWealthReconciliation,
  TaxCalculationResult,
  UserProfile,
  AdvocateStampSettings
} from '../types';
import {
  maskCNIC,
  maskNTN,
  maskCurrency,
  maskBankAccount
} from '../utils/cryptoStorage';
import {
  getStoredClientLedger,
  saveStoredClientLedger,
  getStoredFirmBranding,
  saveStoredFirmBranding,
  getStoredInvoices,
  saveStoredInvoices,
  STANDARD_LEGAL_SERVICES,
  DEFAULT_FIRM_BRANDING,
  DEFAULT_ADVOCATE_STAMP
} from '../utils/enterpriseStore';
import {
  generateBrandedTaxDossierPDF,
  generateBrandedInvoicePDF,
  generateBrandedWealthReconciliationPDF
} from '../utils/pdfGenerator';
import { DynamicTaxConfigView } from './DynamicTaxConfigView';
import { TeamManagementView } from './TeamManagementView';

interface EnterpriseB2BViewProps {
  user?: UserProfile | null;
  onOpenPricing?: () => void;
  onNavigateToChat?: (initialPrompt: string) => void;
  onLoadClientIntoTaxEngine?: (client: ClientLedgerProfile) => void;
  isMasked?: boolean;
  onToggleMasking?: () => void;
  onOpenPrivacyManager?: () => void;
  onOpenLegalNotice?: () => void;
}

export const EnterpriseB2BView: React.FC<EnterpriseB2BViewProps> = ({
  user,
  onOpenPricing,
  onNavigateToChat,
  onLoadClientIntoTaxEngine,
  isMasked = false,
  onToggleMasking,
  onOpenPrivacyManager,
  onOpenLegalNotice
}) => {

  // Navigation Sub-tab
  const [activeB2BTab, setActiveB2BTab] = useState<
    'client_ledger' | 'team_management' | 'wealth_reconciliation' | 'firm_branding' | 'dynamic_tax_config' | 'billing_invoicing'
  >('client_ledger');

  // Persistence State
  const [clients, setClients] = useState<ClientLedgerProfile[]>([]);
  const [firmBranding, setFirmBranding] = useState<FirmBrandingSettings>(DEFAULT_FIRM_BRANDING);
  const [invoices, setInvoices] = useState<ProfessionalBillingInvoice[]>([]);

  // Search & Filter state for Clients
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  // Selected Client for detail drawer / modal / wealth recon
  const [selectedClient, setSelectedClient] = useState<ClientLedgerProfile | null>(null);

  // Client Modal Form State
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<ClientLedgerProfile | null>(null);
  const [clientForm, setClientForm] = useState<Partial<ClientLedgerProfile>>({
    category: 'salaried',
    status: 'active',
    taxYear: '2025'
  });

  // Invoice Modal Form State
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [newInvoiceClientId, setNewInvoiceClientId] = useState<string>('');
  const [invoiceItems, setInvoiceItems] = useState<BillingServiceItem[]>([
    {
      id: 'item-1',
      serviceCode: 'RET-SAL-01',
      description: 'Salaried Individual Annual Income Tax Return & Wealth Statement (Sec 114 & 116)',
      category: 'filing',
      quantity: 1,
      unitPrice: 15000,
      amount: 15000
    }
  ]);
  const [invoiceDiscount, setInvoiceDiscount] = useState<number>(0);
  const [applyPST, setApplyPST] = useState<boolean>(true);
  const [pstRate, setPstRate] = useState<number>(16); // 16% PRA default
  const [invoiceNotes, setInvoiceNotes] = useState<string>('Professional services rendered. Payment due within 15 days.');

  // Wealth Reconciliation Interactive State
  const [reconOpening, setReconOpening] = useState<number>(76000000);
  const [reconNetIncome, setReconNetIncome] = useState<number>(10550000);
  const [reconForeignRemit, setReconForeignRemit] = useState<number>(3200000);
  const [reconCapitalGains, setReconCapitalGains] = useState<number>(0);
  const [reconExpenses, setReconExpenses] = useState<number>(4750000);
  const [reconOutflows, setReconOutflows] = useState<number>(0);
  const [reconIrisDeclared, setReconIrisDeclared] = useState<number>(85000000);
  const [reconNotes, setReconNotes] = useState<string>('Reconciled against bank statements and PRC certificates.');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load Initial Data
  useEffect(() => {
    const loadedClients = getStoredClientLedger();
    const loadedBranding = getStoredFirmBranding();
    const loadedInvoices = getStoredInvoices();

    setClients(loadedClients);
    setFirmBranding(loadedBranding);
    setInvoices(loadedInvoices);

    if (loadedClients.length > 0) {
      setSelectedClient(loadedClients[0]);
      if (loadedClients[0].wealthReconciliation) {
        setReconOpening(loadedClients[0].wealthReconciliation.openingNetWealth);
        setReconNetIncome(loadedClients[0].wealthReconciliation.netInflowIncome);
        setReconForeignRemit(loadedClients[0].wealthReconciliation.exemptInflowRemittance);
        setReconCapitalGains(loadedClients[0].wealthReconciliation.capitalGainsInflow);
        setReconExpenses(loadedClients[0].wealthReconciliation.personalHouseholdExpenses);
        setReconOutflows(loadedClients[0].wealthReconciliation.otherOutflowsGifts);
        setReconIrisDeclared(loadedClients[0].wealthReconciliation.declaredClosingWealthIris);
        setReconNotes(loadedClients[0].wealthReconciliation.reconciliationNotes || '');
      }
    }
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Filtered Clients
  const filteredClients = clients.filter(c => {
    const matchesSearch =
      c.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.cnic.includes(searchTerm) ||
      c.ntn.includes(searchTerm) ||
      (c.phone && c.phone.includes(searchTerm));

    const matchesCategory = selectedCategory === 'all' || c.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || c.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Client Management Handlers
  const handleOpenAddClient = () => {
    setEditingClient(null);
    setClientForm({
      clientName: '',
      cnic: '',
      ntn: '',
      category: 'salaried',
      taxYear: '2025',
      status: 'active',
      phone: '',
      email: '',
      address: '',
      fbrJurisdiction: 'RTO Lahore - Corporate Zone',
      notes: '',
      totalIncomeDeclared: 0,
      wealthNetAssets: 0,
      totalBilledAmount: 0,
      totalPaidAmount: 0
    });
    setIsClientModalOpen(true);
  };

  const handleOpenEditClient = (client: ClientLedgerProfile) => {
    setEditingClient(client);
    setClientForm({ ...client });
    setIsClientModalOpen(true);
  };

  const handleSaveClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientForm.clientName || !clientForm.cnic) {
      alert('Please fill in Client Name and CNIC / NTN.');
      return;
    }

    let updatedClients: ClientLedgerProfile[];
    if (editingClient) {
      updatedClients = clients.map(c =>
        c.id === editingClient.id
          ? ({
              ...c,
              ...clientForm,
              updatedAt: new Date().toISOString().split('T')[0]
            } as ClientLedgerProfile)
          : c
      );
      showToast(`Client profile for "${clientForm.clientName}" updated.`);
    } else {
      const newClient: ClientLedgerProfile = {
        id: `cli-${Date.now().toString().slice(-4)}`,
        clientName: clientForm.clientName || 'Untitled Client',
        cnic: clientForm.cnic || '',
        ntn: clientForm.ntn || '',
        category: (clientForm.category as ClientCategory) || 'salaried',
        taxYear: clientForm.taxYear || '2025',
        status: (clientForm.status as ClientComplianceStatus) || 'active',
        phone: clientForm.phone || '',
        email: clientForm.email || '',
        address: clientForm.address || '',
        fbrJurisdiction: clientForm.fbrJurisdiction || 'RTO Lahore',
        notes: clientForm.notes || '',
        totalIncomeDeclared: Number(clientForm.totalIncomeDeclared) || 0,
        wealthNetAssets: Number(clientForm.wealthNetAssets) || 0,
        totalBilledAmount: Number(clientForm.totalBilledAmount) || 0,
        totalPaidAmount: Number(clientForm.totalPaidAmount) || 0,
        savedCalculations: [],
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0]
      };
      updatedClients = [newClient, ...clients];
      setSelectedClient(newClient);
      showToast(`New client "${newClient.clientName}" registered in ledger.`);
    }

    setClients(updatedClients);
    saveStoredClientLedger(updatedClients);
    setIsClientModalOpen(false);
  };

  const handleDeleteClient = (clientId: string) => {
    if (confirm('Are you sure you want to delete this client record?')) {
      const updated = clients.filter(c => c.id !== clientId);
      setClients(updated);
      saveStoredClientLedger(updated);
      if (selectedClient?.id === clientId) {
        setSelectedClient(updated[0] || null);
      }
      showToast('Client record deleted.');
    }
  };

  // Firm Branding Handlers
  const handleSaveBranding = (e: React.FormEvent) => {
    e.preventDefault();
    saveStoredFirmBranding(firmBranding);
    showToast('Firm branding settings and letterhead template saved!');
  };

  // Wealth Reconciliation Calculations
  const calculatedClosingWealth =
    reconOpening + reconNetIncome + reconForeignRemit + reconCapitalGains - reconExpenses - reconOutflows;
  const reconDifference = reconIrisDeclared - calculatedClosingWealth;
  const isReconBalanced = Math.abs(reconDifference) < 1;

  const handleSaveWealthReconciliation = () => {
    if (!selectedClient) {
      alert('Please select a client from the ledger first.');
      return;
    }

    const updatedRecon: ClientWealthReconciliation = {
      taxYear: selectedClient.taxYear || '2025',
      openingNetWealth: reconOpening,
      netInflowIncome: reconNetIncome,
      exemptInflowRemittance: reconForeignRemit,
      capitalGainsInflow: reconCapitalGains,
      personalHouseholdExpenses: reconExpenses,
      otherOutflowsGifts: reconOutflows,
      closingNetWealthCalculated: calculatedClosingWealth,
      declaredClosingWealthIris: reconIrisDeclared,
      unreconciledDifference: reconDifference,
      isReconciled: isReconBalanced,
      reconciliationNotes: reconNotes
    };

    const updatedClients = clients.map(c =>
      c.id === selectedClient.id
        ? {
            ...c,
            wealthNetAssets: reconIrisDeclared,
            totalIncomeDeclared: reconNetIncome,
            wealthReconciliation: updatedRecon,
            updatedAt: new Date().toISOString().split('T')[0]
          }
        : c
    );

    setClients(updatedClients);
    saveStoredClientLedger(updatedClients);
    setSelectedClient({
      ...selectedClient,
      wealthNetAssets: reconIrisDeclared,
      totalIncomeDeclared: reconNetIncome,
      wealthReconciliation: updatedRecon
    });

    showToast(`Wealth Reconciliation saved for ${selectedClient.clientName}.`);
  };

  // Invoicing & Billing Handlers
  const handleAddInvoiceItem = () => {
    const defaultSrv = STANDARD_LEGAL_SERVICES[0];
    const newItem: BillingServiceItem = {
      id: `item-${Date.now()}`,
      serviceCode: defaultSrv.code,
      description: defaultSrv.description,
      category: defaultSrv.category,
      quantity: 1,
      unitPrice: defaultSrv.defaultFee,
      amount: defaultSrv.defaultFee
    };
    setInvoiceItems([...invoiceItems, newItem]);
  };

  const handleInvoiceItemPreset = (index: number, code: string) => {
    const preset = STANDARD_LEGAL_SERVICES.find(s => s.code === code);
    if (!preset) return;

    const updated = [...invoiceItems];
    updated[index] = {
      ...updated[index],
      serviceCode: preset.code,
      description: preset.description,
      category: preset.category,
      unitPrice: preset.defaultFee,
      amount: preset.defaultFee * updated[index].quantity
    };
    setInvoiceItems(updated);
  };

  const handleUpdateItemQty = (index: number, qty: number) => {
    const updated = [...invoiceItems];
    const newQty = Math.max(1, qty);
    updated[index] = {
      ...updated[index],
      quantity: newQty,
      amount: updated[index].unitPrice * newQty
    };
    setInvoiceItems(updated);
  };

  const handleUpdateItemPrice = (index: number, price: number) => {
    const updated = [...invoiceItems];
    updated[index] = {
      ...updated[index],
      unitPrice: price,
      amount: price * updated[index].quantity
    };
    setInvoiceItems(updated);
  };

  const handleRemoveInvoiceItem = (index: number) => {
    if (invoiceItems.length === 1) return;
    setInvoiceItems(invoiceItems.filter((_, i) => i !== index));
  };

  const invoiceSubtotal = invoiceItems.reduce((sum, item) => sum + item.amount, 0);
  const taxableAmount = Math.max(0, invoiceSubtotal - invoiceDiscount);
  const pstAmount = applyPST ? Math.round((taxableAmount * pstRate) / 100) : 0;
  const invoiceGrandTotal = taxableAmount + pstAmount;

  const handleCreateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    const client = clients.find(c => c.id === newInvoiceClientId) || selectedClient;
    if (!client) {
      alert('Please select a client to bill.');
      return;
    }

    const newInv: ProfessionalBillingInvoice = {
      id: `inv-${Date.now().toString().slice(-4)}`,
      invoiceNumber: `INV-${new Date().getFullYear()}-${Date.now().toString().slice(-4)}`,
      clientId: client.id,
      clientName: client.clientName,
      clientNTN: client.ntn,
      clientCNIC: client.cnic,
      clientAddress: client.address || 'Pakistan',
      dateIssued: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 15 * 86400000).toISOString().split('T')[0],
      taxYear: client.taxYear || '2025',
      services: invoiceItems,
      subtotal: invoiceSubtotal,
      discount: invoiceDiscount,
      applyProvincialTax: applyPST,
      provincialTaxRate: pstRate,
      provincialTaxAmount: pstAmount,
      grandTotal: invoiceGrandTotal,
      paymentStatus: 'unpaid',
      amountPaid: 0,
      balanceDue: invoiceGrandTotal,
      bankAccountDetails: `${firmBranding.firmName} | HBL A/C: 0148-79281048201 / IBAN: PK36HABB0001487928104820`,
      notes: invoiceNotes
    };

    const updatedInvoices = [newInv, ...invoices];
    setInvoices(updatedInvoices);
    saveStoredInvoices(updatedInvoices);

    // Update Client's total billed
    const updatedClients = clients.map(c =>
      c.id === client.id
        ? {
            ...c,
            totalBilledAmount: (c.totalBilledAmount || 0) + invoiceGrandTotal
          }
        : c
    );
    setClients(updatedClients);
    saveStoredClientLedger(updatedClients);

    setIsInvoiceModalOpen(false);
    showToast(`Invoice ${newInv.invoiceNumber} generated for ${client.clientName}!`);
  };

  const handleMarkInvoicePaid = (invId: string) => {
    const updated = invoices.map(inv => {
      if (inv.id === invId) {
        const isCurrentlyPaid = inv.paymentStatus === 'paid';
        const newStatus: 'paid' | 'unpaid' = isCurrentlyPaid ? 'unpaid' : 'paid';
        return {
          ...inv,
          paymentStatus: newStatus,
          amountPaid: newStatus === 'paid' ? inv.grandTotal : 0,
          balanceDue: newStatus === 'paid' ? 0 : inv.grandTotal
        };
      }
      return inv;
    });

    setInvoices(updated);
    saveStoredInvoices(updated);
    showToast('Invoice payment status updated.');
  };

  const handleDeleteInvoice = (invId: string) => {
    if (confirm('Delete this invoice record?')) {
      const updated = invoices.filter(i => i.id !== invId);
      setInvoices(updated);
      saveStoredInvoices(updated);
      showToast('Invoice deleted.');
    }
  };

  // Helper for quick Demo Tax Dossier PDF
  const handleExportSampleDossier = (client: ClientLedgerProfile) => {
    const demoResult: TaxCalculationResult = {
      taxYear: client.taxYear || '2025',
      taxpayerType: client.category === 'salaried' ? 'salaried' : client.category === 'private_limited' ? 'company' : 'non_salaried',
      grossAnnualIncome: client.totalIncomeDeclared || 14500000,
      taxableIncome: Math.round((client.totalIncomeDeclared || 14500000) * 0.95),
      applicableSlab: 'Slab 5: Rs. 6M to 10M (+ 35% on excess)',
      fixedTax: 1200000,
      rateOnExcess: 35,
      excessAmount: (client.totalIncomeDeclared || 14500000) - 6000000,
      grossTax: Math.round((client.totalIncomeDeclared || 14500000) * 0.28),
      taxCredits: 150000,
      netAnnualTax: Math.round((client.totalIncomeDeclared || 14500000) * 0.27),
      monthlyWithholding: Math.round(((client.totalIncomeDeclared || 14500000) * 0.27) / 12),
      effectiveTaxRate: 27,
      takeHomeAnnual: Math.round((client.totalIncomeDeclared || 14500000) * 0.73),
      takeHomeMonthly: Math.round(((client.totalIncomeDeclared || 14500000) * 0.73) / 12),
      detailedBreakdown: [
        'Income Tax computed under First Schedule Part I',
        'Section 60D educational allowances factored',
        'Certified for FBR Iris submission'
      ]
    };

    generateBrandedTaxDossierPDF(demoResult, client, firmBranding);
  };

  return (
    <div className="space-y-6 text-slate-200">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-emerald-700 text-white px-5 py-3 rounded-xl shadow-2xl border border-emerald-500/40 animate-fade-in">
          <CheckCircle className="w-5 h-5 text-emerald-200" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-900/60 p-6 md:p-8 border border-emerald-500/30 shadow-2xl">
        <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-emerald-400" />
                Enterprise SaaS for Law Firms & Chartered Accountants
              </span>
              <span className="px-2.5 py-0.5 text-xs font-medium bg-slate-800 text-slate-300 rounded-full border border-slate-700">
                Active Filer Mode
              </span>
            </div>
            
            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              B2B Client Ledger & Branded Dossier Suite
            </h1>
            <p className="mt-1 text-sm text-slate-300 max-w-3xl">
              Multi-client database management, Section 116 Wealth Reconciliation statements, customizable firm letterhead branding, and automated legal fee estimation.
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="flex items-center gap-3 bg-slate-900/80 p-3 rounded-xl border border-slate-800 backdrop-blur-md">
            <div className="px-3 py-1 border-r border-slate-800 text-center">
              <div className="text-xs text-slate-400">Total Clients</div>
              <div className="text-lg font-bold text-emerald-400">{clients.length}</div>
            </div>
            <div className="px-3 py-1 border-r border-slate-800 text-center">
              <div className="text-xs text-slate-400">Total Invoiced</div>
              <div className="text-lg font-bold text-white">
                PKR {(invoices.reduce((s, i) => s + i.grandTotal, 0) / 1000).toFixed(0)}k
              </div>
            </div>
            <div className="px-3 py-1 text-center">
              <div className="text-xs text-slate-400">Firm Seal</div>
              <div className="text-xs font-semibold text-emerald-300 truncate max-w-[120px]">
                {firmBranding.firmName.slice(0, 16)}...
              </div>
            </div>
          </div>
        </div>

        {/* Sub-Navigation Tabs */}
        <div className="mt-6 flex flex-wrap gap-2 pt-4 border-t border-slate-800">
          <button
            id="tab-client-ledger"
            onClick={() => setActiveB2BTab('client_ledger')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeB2BTab === 'client_ledger'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/60'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Client Ledger ({clients.length})</span>
          </button>

          <button
            id="tab-team-management"
            onClick={() => setActiveB2BTab('team_management')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeB2BTab === 'team_management'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/60'
            }`}
          >
            <Briefcase className="w-4 h-4 text-blue-400" />
            <span>Team & Case Dispatch</span>
          </button>

          <button
            id="tab-dynamic-tax-config"
            onClick={() => setActiveB2BTab('dynamic_tax_config')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeB2BTab === 'dynamic_tax_config'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/60'
            }`}
          >
            <Sliders className="w-4 h-4 text-amber-400" />
            <span>Dynamic Tax Slabs & SROs</span>
          </button>

          <button
            id="tab-wealth-recon"
            onClick={() => setActiveB2BTab('wealth_reconciliation')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeB2BTab === 'wealth_reconciliation'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/60'
            }`}
          >
            <Scale className="w-4 h-4 text-emerald-400" />
            <span>Wealth Reconciliation (Sec 116)</span>
          </button>

          <button
            id="tab-firm-branding"
            onClick={() => setActiveB2BTab('firm_branding')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeB2BTab === 'firm_branding'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/60'
            }`}
          >
            <Building className="w-4 h-4 text-purple-400" />
            <span>Firm Branding & Seal</span>
          </button>

          <button
            id="tab-billing-invoicing"
            onClick={() => setActiveB2BTab('billing_invoicing')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeB2BTab === 'billing_invoicing'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/60'
            }`}
          >
            <DollarSign className="w-4 h-4 text-emerald-400" />
            <span>Fee Invoicing ({invoices.length})</span>
          </button>

          {/* Privacy & Legal Utilities */}
          <div className="ml-auto flex items-center gap-2">
            {onToggleMasking && (
              <button
                id="btn-b2b-privacy-mask"
                onClick={onToggleMasking}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold border transition shadow-sm ${
                  isMasked
                    ? 'bg-amber-950/90 border-amber-500 text-amber-300 ring-1 ring-amber-500/50'
                    : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:text-white'
                }`}
                title="Toggle client financial data masking on screen"
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Masking: {isMasked ? 'ON' : 'OFF'}</span>
              </button>
            )}

            {onOpenPrivacyManager && (
              <button
                id="btn-b2b-privacy-manager"
                onClick={onOpenPrivacyManager}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition shadow-sm"
                title="Open Client Privacy & Encrypted Local Storage Manager"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
                <span>Privacy & Backups</span>
              </button>
            )}

            {onOpenLegalNotice && (
              <button
                id="btn-b2b-legal-notice"
                onClick={onOpenLegalNotice}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-700/60 text-emerald-300 transition shadow-sm"
                title="View Statutory Legal Disclaimers"
              >
                <Scale className="w-3.5 h-3.5 text-emerald-400" />
                <span>Statutory Notice</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: MULTI-CLIENT MANAGEMENT MODULE (CLIENT LEDGER) */}
      {/* ========================================================================= */}
      {activeB2BTab === 'client_ledger' && (
        <div className="space-y-6">
          {/* Controls Bar: Search, Filters & Add Client Button */}
          <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center bg-slate-900/70 p-4 rounded-xl border border-slate-800">
            <div className="flex flex-1 flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by Client Name, CNIC, NTN, or Phone..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value)}
                className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-300 focus:outline-none focus:border-emerald-500"
              >
                <option value="all">All Categories</option>
                <option value="salaried">Salaried Individual</option>
                <option value="business_individual">Sole Proprietor / Business</option>
                <option value="aop_firm">AOP / Partnership Firm</option>
                <option value="private_limited">Private Limited Company</option>
                <option value="high_net_worth">High Net Worth (HNW)</option>
              </select>

              {/* Status Filter */}
              <select
                value={selectedStatus}
                onChange={e => setSelectedStatus(e.target.value)}
                className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-300 focus:outline-none focus:border-emerald-500"
              >
                <option value="all">All Statuses</option>
                <option value="active">Active Filer</option>
                <option value="return_drafted">Return Drafted</option>
                <option value="filed_iris">Filed on Iris 2.0</option>
                <option value="audit_notice">Under FBR Audit Notice</option>
                <option value="retainer_active">Active Retainer</option>
              </select>
            </div>

            <button
              id="btn-add-new-client"
              onClick={handleOpenAddClient}
              className="flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm font-semibold transition-all shadow-lg shadow-emerald-950/50 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Register New Client
            </button>
          </div>

          {/* Main Grid: Client List & Detail Drawer */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: Client Cards Directory (2 Cols) */}
            <div className="lg:col-span-2 space-y-3">
              {filteredClients.length === 0 ? (
                <div className="p-12 text-center bg-slate-900/40 rounded-xl border border-slate-800">
                  <Users className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                  <p className="text-slate-400 font-medium">No client profiles match your filter criteria.</p>
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('all');
                      setSelectedStatus('all');
                    }}
                    className="mt-3 text-xs text-emerald-400 underline hover:text-emerald-300"
                  >
                    Reset all filters
                  </button>
                </div>
              ) : (
                filteredClients.map(client => {
                  const isSelected = selectedClient?.id === client.id;
                  return (
                    <div
                      key={client.id}
                      onClick={() => setSelectedClient(client)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-slate-900 border-emerald-500/70 shadow-lg shadow-emerald-950/30 ring-1 ring-emerald-500/40'
                          : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/90'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-semibold text-white text-base">{client.clientName}</h3>
                            <span
                              className={`px-2 py-0.5 text-[11px] font-semibold rounded-full uppercase ${
                                client.status === 'filed_iris'
                                  ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                                  : client.status === 'audit_notice'
                                  ? 'bg-rose-950 text-rose-400 border border-rose-800'
                                  : client.status === 'return_drafted'
                                  ? 'bg-amber-950 text-amber-400 border border-amber-800'
                                  : 'bg-blue-950 text-blue-400 border border-blue-800'
                              }`}
                            >
                              {client.status.replace('_', ' ')}
                            </span>
                            <span className="px-2 py-0.5 text-[11px] font-medium bg-slate-800 text-slate-300 rounded">
                              TY {client.taxYear}
                            </span>
                          </div>

                          <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-1 text-xs text-slate-400">
                            <div>
                              <span className="text-slate-500">NTN:</span>{' '}
                              <span className="font-mono text-slate-200">{maskNTN(client.ntn, isMasked)}</span>
                            </div>
                            <div>
                              <span className="text-slate-500">CNIC:</span>{' '}
                              <span className="font-mono text-slate-200">{maskCNIC(client.cnic, isMasked)}</span>
                            </div>
                            <div>
                              <span className="text-slate-500">Category:</span>{' '}
                              <span className="capitalize text-slate-300">
                                {client.category.replace('_', ' ')}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Action buttons */}
                        <div className="flex items-center gap-1.5" onClick={e => e.stopPropagation()}>
                          <button
                            title="Edit Profile"
                            onClick={() => handleOpenEditClient(client)}
                            className="p-1.5 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            title="Print Branded Tax Dossier"
                            onClick={() => handleExportSampleDossier(client)}
                            className="p-1.5 text-emerald-400 hover:text-emerald-300 bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-800/60 rounded-lg transition-colors"
                          >
                            <Download className="w-3.5 h-3.5" />
                          </button>
                          <button
                            title="Delete Client"
                            onClick={() => handleDeleteClient(client.id)}
                            className="p-1.5 text-rose-400 hover:text-rose-300 bg-rose-950/40 hover:bg-rose-900/60 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Brief financial footer */}
                      <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                        <div>
                          Declared Net Income: <span className="font-semibold text-emerald-400">{maskCurrency(client.totalIncomeDeclared, isMasked)}</span>
                        </div>
                        <div>
                          Net Wealth (Sec 116): <span className="font-semibold text-slate-200">{maskCurrency(client.wealthNetAssets, isMasked)}</span>
                        </div>
                        <div className="flex items-center gap-1 text-emerald-400 font-medium">
                          <span>View dossier</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Right: Client Dossier & Calculation Archive Drawer (1 Col) */}
            <div className="bg-slate-900/90 rounded-xl border border-slate-800 p-5 space-y-5 flex flex-col justify-between">
              {selectedClient ? (
                <div className="space-y-5">
                  <div className="flex items-start justify-between pb-4 border-b border-slate-800">
                    <div>
                      <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider">
                        Client Dossier Card
                      </span>
                      <h2 className="text-lg font-bold text-white mt-0.5">{selectedClient.clientName}</h2>
                      <p className="text-xs text-slate-400 mt-0.5">{selectedClient.fbrJurisdiction}</p>
                    </div>
                    <button
                      onClick={() => handleOpenEditClient(selectedClient)}
                      className="text-xs text-emerald-400 hover:underline flex items-center gap-1"
                    >
                      <Edit2 className="w-3 h-3" /> Edit
                    </button>
                  </div>

                  {/* Identification Attributes */}
                  <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800/80 space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400">CNIC Number:</span>
                      <span className="font-mono text-slate-200">{selectedClient.cnic}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">FBR NTN:</span>
                      <span className="font-mono text-emerald-300 font-semibold">{selectedClient.ntn || 'Not assigned'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Phone / Cell:</span>
                      <span className="text-slate-200">{selectedClient.phone || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Email Address:</span>
                      <span className="text-slate-200 truncate max-w-[180px]">{selectedClient.email || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Registered Office:</span>
                      <span className="text-slate-300 text-right truncate max-w-[180px]">{selectedClient.address || 'N/A'}</span>
                    </div>
                  </div>

                  {/* Saved Calculation Records under this profile */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                        Saved Tax Computations ({selectedClient.savedCalculations?.length || 0})
                      </h4>
                    </div>

                    <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                      {selectedClient.savedCalculations && selectedClient.savedCalculations.length > 0 ? (
                        selectedClient.savedCalculations.map(calc => (
                          <div
                            key={calc.id}
                            className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 text-xs hover:border-slate-700"
                          >
                            <div className="flex items-center justify-between font-semibold text-slate-200">
                              <span>{calc.title}</span>
                              <span className="text-emerald-400 font-mono">
                                PKR {calc.taxAmount.toLocaleString()}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">{calc.summary}</p>
                            <div className="mt-1.5 flex items-center justify-between text-[10px] text-slate-500">
                              <span>Date: {calc.date}</span>
                              <span className="uppercase text-emerald-500 font-semibold">{calc.engineType}</span>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-4 text-center bg-slate-950/60 rounded-lg border border-dashed border-slate-800 text-slate-500 text-xs">
                          No calculations saved yet. Calculations run across Income Tax, Super Tax, Sales Tax & Property Tax will appear here.
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Wealth Reconciliation Quick Badge */}
                  <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Section 116 Wealth Status:</span>
                      <span
                        className={`font-semibold flex items-center gap-1 ${
                          selectedClient.wealthReconciliation?.isReconciled
                            ? 'text-emerald-400'
                            : 'text-amber-400'
                        }`}
                      >
                        {selectedClient.wealthReconciliation?.isReconciled ? (
                          <>
                            <CheckCircle className="w-3.5 h-3.5" /> Reconciled
                          </>
                        ) : (
                          <>
                            <AlertTriangle className="w-3.5 h-3.5" /> Unbalanced / Pending
                          </>
                        )}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        if (selectedClient.wealthReconciliation) {
                          setReconOpening(selectedClient.wealthReconciliation.openingNetWealth);
                          setReconNetIncome(selectedClient.wealthReconciliation.netInflowIncome);
                          setReconForeignRemit(selectedClient.wealthReconciliation.exemptInflowRemittance);
                          setReconCapitalGains(selectedClient.wealthReconciliation.capitalGainsInflow);
                          setReconExpenses(selectedClient.wealthReconciliation.personalHouseholdExpenses);
                          setReconOutflows(selectedClient.wealthReconciliation.otherOutflowsGifts);
                          setReconIrisDeclared(selectedClient.wealthReconciliation.declaredClosingWealthIris);
                          setReconNotes(selectedClient.wealthReconciliation.reconciliationNotes || '');
                        }
                        setActiveB2BTab('wealth_reconciliation');
                      }}
                      className="mt-2 w-full text-center py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded font-medium text-xs transition-colors"
                    >
                      Open Form 116 Reconciliation Tool
                    </button>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2 pt-2">
                    <button
                      id="btn-export-dossier-pdf"
                      onClick={() => handleExportSampleDossier(selectedClient)}
                      className="w-full flex items-center justify-center gap-2 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm font-semibold transition-all shadow-md shadow-emerald-950/40 cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      Generate Branded Tax Dossier PDF
                    </button>

                    <button
                      id="btn-create-invoice-for-client"
                      onClick={() => {
                        setNewInvoiceClientId(selectedClient.id);
                        setIsInvoiceModalOpen(true);
                      }}
                      className="w-full flex items-center justify-center gap-2 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold transition-all border border-slate-700"
                    >
                      <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                      Create Fee Invoice / Retainer Note
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center text-slate-500">Select a client to view details.</div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: SECTION 116 WEALTH RECONCILIATION AUDIT ENGINE */}
      {/* ========================================================================= */}
      {activeB2BTab === 'wealth_reconciliation' && (
        <div className="space-y-6">
          <div className="bg-slate-900/80 p-6 rounded-xl border border-slate-800">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-800">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <Scale className="w-4 h-4" />
                  Statutory Section 116(2) Wealth Statement & Reconciliation Audit
                </span>
                <h2 className="text-xl font-bold text-white mt-1">
                  Net Wealth Inflow & Outflow Balancing Engine
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Reconcile opening net assets + declared inflows - household expenses vs Iris declared closing wealth.
                </p>
              </div>

              {/* Client Selector for Wealth Reconciliation */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Client Profile:</span>
                <select
                  value={selectedClient?.id || ''}
                  onChange={e => {
                    const c = clients.find(cl => cl.id === e.target.value);
                    if (c) {
                      setSelectedClient(c);
                      if (c.wealthReconciliation) {
                        setReconOpening(c.wealthReconciliation.openingNetWealth);
                        setReconNetIncome(c.wealthReconciliation.netInflowIncome);
                        setReconForeignRemit(c.wealthReconciliation.exemptInflowRemittance);
                        setReconCapitalGains(c.wealthReconciliation.capitalGainsInflow);
                        setReconExpenses(c.wealthReconciliation.personalHouseholdExpenses);
                        setReconOutflows(c.wealthReconciliation.otherOutflowsGifts);
                        setReconIrisDeclared(c.wealthReconciliation.declaredClosingWealthIris);
                        setReconNotes(c.wealthReconciliation.reconciliationNotes || '');
                      }
                    }
                  }}
                  className="px-3 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-xs font-semibold text-white focus:outline-none focus:border-emerald-500"
                >
                  {clients.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.clientName} ({c.cnic})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Reconciliation Live Status Banner */}
            <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                <div className="text-xs text-slate-400">Calculated Closing Wealth (Formula)</div>
                <div className="text-xl font-bold text-emerald-400 font-mono mt-1">
                  PKR {calculatedClosingWealth.toLocaleString()}
                </div>
                <div className="text-[11px] text-slate-500 mt-1">Opening + Inflows - Expenses</div>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                <div className="text-xs text-slate-400">Declared Iris Wealth (Balance Sheet)</div>
                <div className="text-xl font-bold text-white font-mono mt-1">
                  PKR {reconIrisDeclared.toLocaleString()}
                </div>
                <div className="text-[11px] text-slate-500 mt-1">Net assets declared in Iris 2.0</div>
              </div>

              <div
                className={`p-4 rounded-xl border ${
                  isReconBalanced
                    ? 'bg-emerald-950/40 border-emerald-700 text-emerald-300'
                    : 'bg-rose-950/40 border-rose-700 text-rose-300'
                }`}
              >
                <div className="text-xs font-medium">Reconciliation Variance (Diff)</div>
                <div className="text-xl font-bold font-mono mt-1">
                  PKR {Math.abs(reconDifference).toLocaleString()}
                </div>
                <div className="text-[11px] font-semibold mt-1 flex items-center gap-1">
                  {isReconBalanced ? (
                    <>
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> Perfect Balance (NIL Exposure)
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-400" /> Section 111 Audit Exposure Risk
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Input Form Fields */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left: Opening Assets & Inflows */}
              <div className="space-y-4 bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
                <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-1.5 uppercase tracking-wider">
                  <Plus className="w-4 h-4" /> 1. Opening Wealth & Inflows (Additions)
                </h3>

                <div>
                  <label className="block text-xs text-slate-400 mb-1">
                    Opening Net Wealth (Previous Tax Year Net Assets) (PKR)
                  </label>
                  <input
                    type="number"
                    value={reconOpening}
                    onChange={e => setReconOpening(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1">
                    Net Income Declared Subject to Normal Tax (PKR)
                  </label>
                  <input
                    type="number"
                    value={reconNetIncome}
                    onChange={e => setReconNetIncome(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1">
                    Foreign Remittance / PRC & Exempt Inflows (Section 111(4)) (PKR)
                  </label>
                  <input
                    type="number"
                    value={reconForeignRemit}
                    onChange={e => setReconForeignRemit(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1">
                    Realized Capital Gains & Other Inflows (PKR)
                  </label>
                  <input
                    type="number"
                    value={reconCapitalGains}
                    onChange={e => setReconCapitalGains(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Right: Outflows & Iris Declared Wealth */}
              <div className="space-y-4 bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
                <h3 className="text-sm font-bold text-rose-400 flex items-center gap-1.5 uppercase tracking-wider">
                  <Layers className="w-4 h-4" /> 2. Outflows & Iris Balance Sheet
                </h3>

                <div>
                  <label className="block text-xs text-slate-400 mb-1">
                    Personal Household & Living Expenses (Code 7089) (PKR)
                  </label>
                  <input
                    type="number"
                    value={reconExpenses}
                    onChange={e => setReconExpenses(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1">
                    Other Outflows / Gift Deeds / Asset Dispositions (PKR)
                  </label>
                  <input
                    type="number"
                    value={reconOutflows}
                    onChange={e => setReconOutflows(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1 font-semibold text-emerald-300">
                    Declared Closing Net Wealth on Iris 2.0 (Form 116) (PKR)
                  </label>
                  <input
                    type="number"
                    value={reconIrisDeclared}
                    onChange={e => setReconIrisDeclared(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-900 border border-emerald-500/60 rounded-lg text-sm font-bold text-emerald-300 focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1">
                    Auditor / Practitioner Reconciliation Notes
                  </label>
                  <input
                    type="text"
                    value={reconNotes}
                    onChange={e => setReconNotes(e.target.value)}
                    placeholder="e.g. Reconciled with PRCs, sale deeds, and bank ledger statements..."
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
            </div>

            {/* Reconciliation Footer Actions */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800">
              <div className="text-xs text-slate-400">
                Statutory Note: Under Section 116(2), unexplained net wealth accretion is liable to assessment under Section 111(1)(b).
              </div>

              <div className="flex items-center gap-3">
                <button
                  id="btn-save-wealth-recon"
                  onClick={handleSaveWealthReconciliation}
                  className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm font-semibold transition-all shadow-md shadow-emerald-950/40 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  Save Reconciliation to Client Profile
                </button>

                <button
                  id="btn-export-wealth-recon-pdf"
                  onClick={() => {
                    const reconData: ClientWealthReconciliation = {
                      taxYear: selectedClient?.taxYear || '2025',
                      openingNetWealth: reconOpening,
                      netInflowIncome: reconNetIncome,
                      exemptInflowRemittance: reconForeignRemit,
                      capitalGainsInflow: reconCapitalGains,
                      personalHouseholdExpenses: reconExpenses,
                      otherOutflowsGifts: reconOutflows,
                      closingNetWealthCalculated: calculatedClosingWealth,
                      declaredClosingWealthIris: reconIrisDeclared,
                      unreconciledDifference: reconDifference,
                      isReconciled: isReconBalanced,
                      reconciliationNotes: reconNotes
                    };
                    generateBrandedWealthReconciliationPDF(reconData, selectedClient, firmBranding);
                  }}
                  className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-sm font-semibold transition-all border border-slate-700 cursor-pointer"
                >
                  <Download className="w-4 h-4 text-emerald-400" />
                  Export Form 116 PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: BRANDED PDF DOSSIER ENGINE & FIRM SETTINGS */}
      {/* ========================================================================= */}
      {activeB2BTab === 'firm_branding' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left 2 Cols: Firm Settings Form */}
          <div className="lg:col-span-2 bg-slate-900/80 p-6 rounded-xl border border-slate-800 space-y-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <Building className="w-4 h-4" />
                Firm Branding & Professional Letterhead Configuration
              </span>
              <h2 className="text-xl font-bold text-white mt-1">
                Customize Legal Dossier & Letterhead Output
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                These credentials, designations, and firm contact info are dynamically embedded into all generated PDF Dossiers, Invoices, and Section 116 Statements.
              </p>
            </div>

            <form onSubmit={handleSaveBranding} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    Firm / Practice Legal Name
                  </label>
                  <input
                    type="text"
                    value={firmBranding.firmName}
                    onChange={e => setFirmBranding({ ...firmBranding, firmName: e.target.value })}
                    required
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    Senior Practitioner / Lead Counsel Name
                  </label>
                  <input
                    type="text"
                    value={firmBranding.practitionerName}
                    onChange={e => setFirmBranding({ ...firmBranding, practitionerName: e.target.value })}
                    required
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    Professional Designation
                  </label>
                  <input
                    type="text"
                    value={firmBranding.designation}
                    onChange={e => setFirmBranding({ ...firmBranding, designation: e.target.value })}
                    placeholder="e.g. Advocate High Court / Fellow Chartered Accountant (ICAP)"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    Bar Roll / ICAP Registration Number
                  </label>
                  <input
                    type="text"
                    value={firmBranding.licenseNumber}
                    onChange={e => setFirmBranding({ ...firmBranding, licenseNumber: e.target.value })}
                    placeholder="e.g. LHC-Roll-28491 / ICAP-6842"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    Bar Association / Statutory Body
                  </label>
                  <input
                    type="text"
                    value={firmBranding.barOrBody}
                    onChange={e => setFirmBranding({ ...firmBranding, barOrBody: e.target.value })}
                    placeholder="e.g. Lahore High Court Bar Association / ICAP"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    Firm FBR NTN Number
                  </label>
                  <input
                    type="text"
                    value={firmBranding.taxRegistrationNTN}
                    onChange={e => setFirmBranding({ ...firmBranding, taxRegistrationNTN: e.target.value })}
                    placeholder="e.g. 4829104-7"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    Official Email Address
                  </label>
                  <input
                    type="email"
                    value={firmBranding.email}
                    onChange={e => setFirmBranding({ ...firmBranding, email: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    Contact Phone Numbers
                  </label>
                  <input
                    type="text"
                    value={firmBranding.phone}
                    onChange={e => setFirmBranding({ ...firmBranding, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Office Chamber / Physical Address
                </label>
                <input
                  type="text"
                  value={firmBranding.address}
                  onChange={e => setFirmBranding({ ...firmBranding, address: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Firm Tagline / Practice Motto
                </label>
                <input
                  type="text"
                  value={firmBranding.tagline}
                  onChange={e => setFirmBranding({ ...firmBranding, tagline: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Firm Logo & Image URL */}
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-white flex items-center gap-1.5">
                    <Upload className="w-3.5 h-3.5 text-emerald-400" />
                    Firm Logo / Emblem Asset
                  </label>
                  <span className="text-[10px] text-slate-400">PNG / SVG / JPEG supported</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <input
                      type="url"
                      placeholder="https://example.com/firm-logo.png"
                      value={firmBranding.logoUrl || ''}
                      onChange={e => setFirmBranding({ ...firmBranding, logoUrl: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={e => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = () => {
                            if (typeof reader.result === 'string') {
                              setFirmBranding({ ...firmBranding, logoBase64: reader.result });
                            }
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="w-full text-xs text-slate-400 file:mr-2 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-slate-800 file:text-slate-200 hover:file:bg-slate-700 cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Advocate High Court Digital Stamp / Seal Customizer */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-emerald-500/20 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-400" />
                    <div>
                      <h4 className="text-xs font-bold text-white">Advocate High Court & FCA Digital Stamp Seal</h4>
                      <p className="text-[11px] text-slate-400">Renders statutory verification seals onto generated PDFs and memos</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={firmBranding.advocateStamp?.enabled ?? true}
                      onChange={e => {
                        const currentStamp = firmBranding.advocateStamp || DEFAULT_ADVOCATE_STAMP;
                        setFirmBranding({
                          ...firmBranding,
                          advocateStamp: { ...currentStamp, enabled: e.target.checked }
                        });
                      }}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600"></div>
                  </label>
                </div>

                {(firmBranding.advocateStamp?.enabled ?? true) && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-800">
                    <div>
                      <label className="block text-[11px] font-medium text-slate-400 mb-1">Seal Shape Profile</label>
                      <select
                        value={firmBranding.advocateStamp?.sealShape || 'round'}
                        onChange={e => {
                          const currentStamp = firmBranding.advocateStamp || DEFAULT_ADVOCATE_STAMP;
                          setFirmBranding({
                            ...firmBranding,
                            advocateStamp: { ...currentStamp, sealShape: e.target.value as 'round' | 'rectangle' | 'oval' }
                          });
                        }}
                        className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-emerald-500"
                      >
                        <option value="round">Circular High Court Bar Seal (Standard)</option>
                        <option value="rectangle">Rectangular Chamber Rubber Stamp</option>
                        <option value="oval">Oval Corporate Practice Stamp</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-slate-400 mb-1">Seal Ink Color</label>
                      <select
                        value={firmBranding.advocateStamp?.sealColor || '#1e3a8a'}
                        onChange={e => {
                          const currentStamp = firmBranding.advocateStamp || DEFAULT_ADVOCATE_STAMP;
                          setFirmBranding({
                            ...firmBranding,
                            advocateStamp: { ...currentStamp, sealColor: e.target.value }
                          });
                        }}
                        className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-emerald-500"
                      >
                        <option value="#1e3a8a">Official Legal Blue (#1e3a8a)</option>
                        <option value="#0f3c28">National Emerald Green (#0f3c28)</option>
                        <option value="#78350f">Notary Amber / Bronze (#78350f)</option>
                        <option value="#111827">Executive Black Ink (#111827)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-slate-400 mb-1">High Court / Bar Association</label>
                      <input
                        type="text"
                        value={firmBranding.advocateStamp?.courtOrBar || 'Lahore High Court Bar Association'}
                        onChange={e => {
                          const currentStamp = firmBranding.advocateStamp || DEFAULT_ADVOCATE_STAMP;
                          setFirmBranding({
                            ...firmBranding,
                            advocateStamp: { ...currentStamp, courtOrBar: e.target.value }
                          });
                        }}
                        className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-slate-400 mb-1">Advocate Enrolment / Bar Roll #</label>
                      <input
                        type="text"
                        value={firmBranding.advocateStamp?.enrolmentNumber || 'HC/LHR/28491/2012'}
                        onChange={e => {
                          const currentStamp = firmBranding.advocateStamp || DEFAULT_ADVOCATE_STAMP;
                          setFirmBranding({
                            ...firmBranding,
                            advocateStamp: { ...currentStamp, enrolmentNumber: e.target.value }
                          });
                        }}
                        className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div className="sm:col-span-2 flex items-center justify-between pt-1">
                      <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={firmBranding.advocateStamp?.includeDateStamp ?? true}
                          onChange={e => {
                            const currentStamp = firmBranding.advocateStamp || DEFAULT_ADVOCATE_STAMP;
                            setFirmBranding({
                              ...firmBranding,
                              advocateStamp: { ...currentStamp, includeDateStamp: e.target.checked }
                            });
                          }}
                          className="rounded bg-slate-900 border-slate-700 text-emerald-500"
                        />
                        <span>Embed dynamic date seal on PDF generation</span>
                      </label>
                    </div>
                  </div>
                )}
              </div>

              {/* Theme / Palette Selection */}
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-2">
                  Dossier Letterhead Color Palette
                </label>
                <div className="flex items-center gap-3">
                  {[
                    { name: 'Pakistani Emerald', hex: '#0f3c28' },
                    { name: 'Appellate Navy', hex: '#1e3a8a' },
                    { name: 'Executive Slate', hex: '#1e293b' },
                    { name: 'Corporate Amber', hex: '#78350f' }
                  ].map(color => (
                    <button
                      key={color.hex}
                      type="button"
                      onClick={() => setFirmBranding({ ...firmBranding, headerColor: color.hex })}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                        firmBranding.headerColor === color.hex
                          ? 'border-white bg-slate-800 text-white ring-2 ring-emerald-400'
                          : 'border-slate-800 bg-slate-950 text-slate-400'
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-white/20"
                        style={{ backgroundColor: color.hex }}
                      />
                      {color.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end">
                <button
                  id="btn-save-branding-settings"
                  type="submit"
                  className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm font-semibold transition-all shadow-md shadow-emerald-950/40 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  Save Firm Letterhead & Stamp Settings
                </button>
              </div>
            </form>
          </div>

          {/* Right 1 Col: Live Letterhead & Stamp Preview Card */}
          <div className="bg-slate-900/80 p-6 rounded-xl border border-slate-800 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-emerald-400" /> Live Letterhead & Seal Preview
            </h3>

            {/* Document Mockup */}
            <div className="bg-white text-slate-900 rounded-lg shadow-2xl overflow-hidden border border-slate-300 text-[10px] select-none relative">
              {/* Header */}
              <div
                className="p-3 text-white flex items-start justify-between gap-2"
                style={{ backgroundColor: firmBranding.headerColor || '#0f3c28' }}
              >
                <div>
                  <div className="font-bold text-xs tracking-tight">{firmBranding.firmName}</div>
                  <div className="text-[9px] opacity-90">{firmBranding.practitionerName}</div>
                  <div className="text-[8px] opacity-75">{firmBranding.designation}</div>
                  <div className="text-[7.5px] opacity-75">{firmBranding.address}</div>
                </div>
                {firmBranding.logoBase64 || firmBranding.logoUrl ? (
                  <img
                    src={firmBranding.logoBase64 || firmBranding.logoUrl}
                    alt="Firm Logo"
                    className="w-10 h-10 object-contain bg-white/10 rounded p-1"
                  />
                ) : (
                  <div className="w-8 h-8 rounded border border-white/30 flex items-center justify-center text-[10px] font-bold">
                    {firmBranding.firmName.slice(0, 2).toUpperCase()}
                  </div>
                )}
              </div>

              {/* Sample Content */}
              <div className="p-3 space-y-2 relative">
                <div className="flex justify-between border-b pb-1">
                  <span className="font-bold text-[8.5px]">STATUTORY TAX DOSSIER</span>
                  <span className="text-[8px] text-slate-500">Tax Year: 2025</span>
                </div>
                <div className="bg-slate-50 p-1.5 rounded border border-slate-200">
                  <div className="text-[8px] text-slate-600">Client: Tariq Textiles Mills (Pvt) Ltd</div>
                  <div className="text-[8px] text-slate-600">NTN: 4928103-9 | Active Filer</div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-[8px]">
                    <span>Gross Annual Income</span>
                    <span className="font-semibold">PKR 385,000,000</span>
                  </div>
                  <div className="flex justify-between text-[8px] text-emerald-700 font-bold bg-emerald-50 px-1 py-0.5 rounded">
                    <span>Net Annual Tax Liability</span>
                    <span>PKR 38,500,000</span>
                  </div>
                </div>

                {/* Digital Stamp Watermark / Seal Display */}
                {(firmBranding.advocateStamp?.enabled ?? true) && (
                  <div className="mt-3 flex justify-end">
                    <div
                      className={`p-2 border-2 text-center select-none ${
                        firmBranding.advocateStamp?.sealShape === 'round'
                          ? 'rounded-full w-24 h-24 flex flex-col items-center justify-center'
                          : firmBranding.advocateStamp?.sealShape === 'oval'
                          ? 'rounded-[50%] w-28 h-20 flex flex-col items-center justify-center'
                          : 'rounded-md w-28 py-1.5'
                      }`}
                      style={{
                        borderColor: firmBranding.advocateStamp?.sealColor || '#1e3a8a',
                        color: firmBranding.advocateStamp?.sealColor || '#1e3a8a'
                      }}
                    >
                      <div className="text-[7.5px] font-bold leading-tight uppercase">
                        {firmBranding.advocateStamp?.practitionerName || firmBranding.practitionerName}
                      </div>
                      <div className="text-[6.5px] font-semibold leading-none opacity-90 my-0.5">
                        {firmBranding.advocateStamp?.advocateDesignation || 'Advocate High Court'}
                      </div>
                      <div className="text-[6px] leading-tight opacity-75">
                        {firmBranding.advocateStamp?.enrolmentNumber || 'LHC-28491'}
                      </div>
                      <div className="text-[5.5px] tracking-tighter opacity-80 mt-0.5 font-bold uppercase">
                        {firmBranding.advocateStamp?.courtOrBar || 'High Court Bar'}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-2 bg-slate-100 border-t border-slate-200 text-[7px] text-slate-500 flex justify-between">
                <span>Advocate High Court & FCA</span>
                <span>Privileged Legal Memo</span>
              </div>
            </div>

            <button
              onClick={() => {
                if (selectedClient) {
                  handleExportSampleDossier(selectedClient);
                } else if (clients.length > 0) {
                  handleExportSampleDossier(clients[0]);
                }
              }}
              className="w-full flex items-center justify-center gap-2 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold transition-all border border-slate-700"
            >
              <Printer className="w-3.5 h-3.5 text-emerald-400" />
              Download Test Dossier Sample
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB: LAW FIRM TEAM MANAGEMENT & CASE DISPATCH MATRIX */}
      {/* ========================================================================= */}
      {activeB2BTab === 'team_management' && (
        <TeamManagementView firmBranding={firmBranding} />
      )}

      {/* ========================================================================= */}
      {/* TAB: DYNAMIC TAX SLAB & SRO CONFIGURATION ENGINE */}
      {/* ========================================================================= */}
      {activeB2BTab === 'dynamic_tax_config' && (
        <DynamicTaxConfigView firmBranding={firmBranding} />
      )}

      {/* ========================================================================= */}
      {/* TAB 4: PROFESSIONAL BILLING & FEE CALCULATOR */}
      {/* ========================================================================= */}
      {activeB2BTab === 'billing_invoicing' && (
        <div className="space-y-6">
          {/* Header Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900/70 p-4 rounded-xl border border-slate-800">
            <div>
              <h2 className="text-lg font-bold text-white">Client Invoices & Fee Ledger</h2>
              <p className="text-xs text-slate-400">
                Generate professional fee notes with statutory provincial services tax (PRA/SRB) and track payment receipts.
              </p>
            </div>

            <button
              id="btn-create-new-invoice"
              onClick={() => {
                setNewInvoiceClientId(selectedClient?.id || (clients[0] ? clients[0].id : ''));
                setIsInvoiceModalOpen(true);
              }}
              className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm font-semibold transition-all shadow-md shadow-emerald-950/40 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Create Fee Invoice
            </button>
          </div>

          {/* Invoices List Table */}
          <div className="bg-slate-900/80 rounded-xl border border-slate-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
                  <tr>
                    <th className="p-3.5">Invoice #</th>
                    <th className="p-3.5">Client Name</th>
                    <th className="p-3.5">Issue Date</th>
                    <th className="p-3.5">Due Date</th>
                    <th className="p-3.5 text-right">Subtotal</th>
                    <th className="p-3.5 text-right">PST Tax</th>
                    <th className="p-3.5 text-right">Grand Total</th>
                    <th className="p-3.5 text-center">Status</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {invoices.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="p-8 text-center text-slate-500">
                        No billing invoices generated yet. Click "Create Fee Invoice" to bill a client.
                      </td>
                    </tr>
                  ) : (
                    invoices.map(inv => (
                      <tr key={inv.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="p-3.5 font-mono font-bold text-white">{inv.invoiceNumber}</td>
                        <td className="p-3.5 font-semibold text-slate-200">{inv.clientName}</td>
                        <td className="p-3.5 text-slate-400">{inv.dateIssued}</td>
                        <td className="p-3.5 text-slate-400">{inv.dueDate}</td>
                        <td className="p-3.5 text-right font-mono text-slate-300">
                          PKR {inv.subtotal.toLocaleString()}
                        </td>
                        <td className="p-3.5 text-right font-mono text-slate-400">
                          PKR {inv.provincialTaxAmount.toLocaleString()}
                        </td>
                        <td className="p-3.5 text-right font-mono font-bold text-emerald-400">
                          PKR {inv.grandTotal.toLocaleString()}
                        </td>
                        <td className="p-3.5 text-center">
                          <button
                            onClick={() => handleMarkInvoicePaid(inv.id)}
                            className={`px-2.5 py-1 text-[11px] font-semibold rounded-full uppercase transition-all ${
                              inv.paymentStatus === 'paid'
                                ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                                : inv.paymentStatus === 'partial'
                                ? 'bg-amber-950 text-amber-300 border border-amber-800'
                                : 'bg-rose-950 text-rose-300 border border-rose-800'
                            }`}
                          >
                            {inv.paymentStatus}
                          </button>
                        </td>
                        <td className="p-3.5 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              title="Download PDF Invoice"
                              onClick={() => generateBrandedInvoicePDF(inv, firmBranding)}
                              className="p-1.5 text-emerald-400 hover:text-emerald-300 bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-800/60 rounded-lg transition-colors"
                            >
                              <Download className="w-3.5 h-3.5" />
                            </button>
                            <button
                              title="Delete Invoice"
                              onClick={() => handleDeleteInvoice(inv.id)}
                              className="p-1.5 text-rose-400 hover:text-rose-300 bg-rose-950/40 hover:bg-rose-900/60 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: ADD / EDIT CLIENT */}
      {/* ========================================================================= */}
      {isClientModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-emerald-400" />
                {editingClient ? 'Edit Client Profile' : 'Register New Client Profile'}
              </h3>
              <button
                onClick={() => setIsClientModalOpen(false)}
                className="text-slate-400 hover:text-white text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveClient} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    Client Legal / Trade Name *
                  </label>
                  <input
                    type="text"
                    value={clientForm.clientName || ''}
                    onChange={e => setClientForm({ ...clientForm, clientName: e.target.value })}
                    required
                    placeholder="e.g. Tariq Textiles Mills (Pvt) Ltd or Dr. Ayesha Siddiqui"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    CNIC Number (with dashes) *
                  </label>
                  <input
                    type="text"
                    value={clientForm.cnic || ''}
                    onChange={e => setClientForm({ ...clientForm, cnic: e.target.value })}
                    required
                    placeholder="e.g. 35202-8491029-1"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-emerald-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    FBR NTN Number
                  </label>
                  <input
                    type="text"
                    value={clientForm.ntn || ''}
                    onChange={e => setClientForm({ ...clientForm, ntn: e.target.value })}
                    placeholder="e.g. 4928103-9"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-emerald-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    Taxpayer Classification
                  </label>
                  <select
                    value={clientForm.category || 'salaried'}
                    onChange={e =>
                      setClientForm({ ...clientForm, category: e.target.value as ClientCategory })
                    }
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="salaried">Salaried Individual (Sec 149)</option>
                    <option value="business_individual">Sole Proprietor / Business</option>
                    <option value="aop_firm">AOP / Partnership Firm</option>
                    <option value="private_limited">Private Limited Company</option>
                    <option value="public_listed">Public Listed Corporate</option>
                    <option value="high_net_worth">High Net Worth Individual (HNW)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    Compliance Status
                  </label>
                  <select
                    value={clientForm.status || 'active'}
                    onChange={e =>
                      setClientForm({ ...clientForm, status: e.target.value as ClientComplianceStatus })
                    }
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="active">Active Filer</option>
                    <option value="return_pending">Return Preparation Pending</option>
                    <option value="return_drafted">Return Drafted</option>
                    <option value="filed_iris">Filed on Iris 2.0</option>
                    <option value="audit_notice">Under Audit Notice</option>
                    <option value="retainer_active">Active Monthly Retainer</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    Contact Phone Number
                  </label>
                  <input
                    type="text"
                    value={clientForm.phone || ''}
                    onChange={e => setClientForm({ ...clientForm, phone: e.target.value })}
                    placeholder="+92 300 1234567"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={clientForm.email || ''}
                    onChange={e => setClientForm({ ...clientForm, email: e.target.value })}
                    placeholder="client@domain.com"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    FBR Tax Office Jurisdiction
                  </label>
                  <input
                    type="text"
                    value={clientForm.fbrJurisdiction || ''}
                    onChange={e => setClientForm({ ...clientForm, fbrJurisdiction: e.target.value })}
                    placeholder="e.g. Large Taxpayers Office (LTO) Lahore or RTO Karachi"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    Registered Address
                  </label>
                  <input
                    type="text"
                    value={clientForm.address || ''}
                    onChange={e => setClientForm({ ...clientForm, address: e.target.value })}
                    placeholder="Plot / House number, Street, City"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    Declared Annual Income (PKR)
                  </label>
                  <input
                    type="number"
                    value={clientForm.totalIncomeDeclared || 0}
                    onChange={e => setClientForm({ ...clientForm, totalIncomeDeclared: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    Declared Net Wealth (PKR)
                  </label>
                  <input
                    type="number"
                    value={clientForm.wealthNetAssets || 0}
                    onChange={e => setClientForm({ ...clientForm, wealthNetAssets: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsClientModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm font-semibold shadow-md shadow-emerald-950/40"
                >
                  {editingClient ? 'Save Changes' : 'Create Client Profile'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: CREATE FEE INVOICE */}
      {/* ========================================================================= */}
      {isInvoiceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-emerald-400" />
                Generate Professional Fee Note / Invoice
              </h3>
              <button
                onClick={() => setIsInvoiceModalOpen(false)}
                className="text-slate-400 hover:text-white text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateInvoice} className="space-y-4">
              {/* Select Client */}
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Bill To Client *
                </label>
                <select
                  value={newInvoiceClientId}
                  onChange={e => setNewInvoiceClientId(e.target.value)}
                  required
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-emerald-500 font-semibold"
                >
                  <option value="">Select a Client Profile</option>
                  {clients.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.clientName} (CNIC: {c.cnic} | NTN: {c.ntn || 'N/A'})
                    </option>
                  ))}
                </select>
              </div>

              {/* Service Line Items */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Services Rendered / Fee Tariff Line Items
                  </span>
                  <button
                    type="button"
                    onClick={handleAddInvoiceItem}
                    className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Service Line
                  </button>
                </div>

                <div className="space-y-2">
                  {invoiceItems.map((item, idx) => (
                    <div
                      key={item.id}
                      className="p-3 bg-slate-950 rounded-lg border border-slate-800 grid grid-cols-12 gap-2 items-center text-xs"
                    >
                      {/* Preset selector */}
                      <div className="col-span-12 sm:col-span-6">
                        <select
                          value={item.serviceCode}
                          onChange={e => handleInvoiceItemPreset(idx, e.target.value)}
                          className="w-full px-2 py-1.5 bg-slate-900 border border-slate-700 rounded text-xs text-slate-200"
                        >
                          {STANDARD_LEGAL_SERVICES.map(srv => (
                            <option key={srv.code} value={srv.code}>
                              [{srv.code}] {srv.description}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Qty */}
                      <div className="col-span-4 sm:col-span-2">
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={e => handleUpdateItemQty(idx, Number(e.target.value))}
                          placeholder="Qty"
                          className="w-full px-2 py-1.5 bg-slate-900 border border-slate-700 rounded text-xs text-white text-center"
                        />
                      </div>

                      {/* Rate */}
                      <div className="col-span-6 sm:col-span-3">
                        <input
                          type="number"
                          value={item.unitPrice}
                          onChange={e => handleUpdateItemPrice(idx, Number(e.target.value))}
                          placeholder="Rate (PKR)"
                          className="w-full px-2 py-1.5 bg-slate-900 border border-slate-700 rounded text-xs text-emerald-400 font-mono"
                        />
                      </div>

                      {/* Delete */}
                      <div className="col-span-2 sm:col-span-1 text-right">
                        <button
                          type="button"
                          onClick={() => handleRemoveInvoiceItem(idx)}
                          disabled={invoiceItems.length === 1}
                          className="text-slate-500 hover:text-rose-400 disabled:opacity-30 p-1"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tax & Discount Calculations */}
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Services Subtotal:</span>
                  <span className="font-mono text-slate-200 font-semibold">
                    PKR {invoiceSubtotal.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Client Concession / Discount:</span>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500">PKR</span>
                    <input
                      type="number"
                      value={invoiceDiscount}
                      onChange={e => setInvoiceDiscount(Number(e.target.value))}
                      className="w-28 px-2 py-1 bg-slate-900 border border-slate-700 rounded text-xs text-white font-mono text-right"
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-slate-800">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="chk-pst"
                      checked={applyPST}
                      onChange={e => setApplyPST(e.target.checked)}
                      className="rounded bg-slate-900 border-slate-700 text-emerald-500"
                    />
                    <label htmlFor="chk-pst" className="text-slate-300">
                      Add Provincial Sales Tax on Legal Services (PRA / SRB)
                    </label>
                  </div>
                  {applyPST && (
                    <div className="flex items-center gap-2">
                      <select
                        value={pstRate}
                        onChange={e => setPstRate(Number(e.target.value))}
                        className="px-2 py-1 bg-slate-900 border border-slate-700 rounded text-xs text-slate-300"
                      >
                        <option value={16}>PRA Punjab (16%)</option>
                        <option value={13}>SRB Sindh (13%)</option>
                        <option value={15}>KPRA KPK (15%)</option>
                        <option value={15}>BRA Balochistan (15%)</option>
                        <option value={15}>ICT Islamabad (15%)</option>
                      </select>
                      <span className="font-mono text-slate-400">PKR {pstAmount.toLocaleString()}</span>
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center pt-3 border-t border-slate-800 text-sm font-bold">
                  <span className="text-white">Total Fee Note Payable:</span>
                  <span className="text-emerald-400 font-mono text-base">
                    PKR {invoiceGrandTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Payment Terms & Bank Wire Details */}
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Payment Terms / Wire Instructions Memo
                </label>
                <input
                  type="text"
                  value={invoiceNotes}
                  onChange={e => setInvoiceNotes(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsInvoiceModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm font-semibold shadow-md shadow-emerald-950/40"
                >
                  Generate & Record Invoice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default EnterpriseB2BView;
