import { jsPDF } from 'jspdf';
import {
  TaxCalculationResult,
  UserProfile,
  ClientLedgerProfile,
  FirmBrandingSettings,
  ProfessionalBillingInvoice,
  ClientWealthReconciliation,
  DynamicTaxConfigSchema,
  CaseAssignment,
  LawFirmTeamMember
} from '../types';

/**
 * Draw an official High Court Advocate Digital Stamp / Seal on a jsPDF document
 */
export function drawAdvocateStamp(
  doc: jsPDF,
  x: number,
  y: number,
  branding?: FirmBrandingSettings | null,
  dateString?: string
) {
  const stamp = branding?.advocateStamp;
  if (stamp && !stamp.enabled) return;

  const practitioner = stamp?.practitionerName || branding?.practitionerName || 'ADVOCATE HIGH COURT';
  const designation = stamp?.advocateDesignation || branding?.designation || 'ADVOCATE HIGH COURT & FCA';
  const enrolment = stamp?.enrolmentNumber || branding?.licenseNumber || 'HC/LHR/28491/2012';
  const courtBar = stamp?.courtOrBar || branding?.barOrBody || 'LAHORE HIGH COURT BAR ASSOCIATION';
  const sealShape = stamp?.sealShape || 'round';
  const sealColor = stamp?.sealColor || branding?.headerColor || '#0f3c28';

  const r = parseInt(sealColor.slice(1, 3), 16) || 15;
  const g = parseInt(sealColor.slice(3, 5), 16) || 60;
  const b = parseInt(sealColor.slice(5, 7), 16) || 40;

  doc.setDrawColor(r, g, b);
  doc.setTextColor(r, g, b);

  if (sealShape === 'round') {
    // Outer circle
    doc.setLineWidth(0.8);
    doc.circle(x + 22, y + 22, 20, 'D');
    // Inner dotted circle
    doc.setLineWidth(0.4);
    doc.circle(x + 22, y + 22, 17.5, 'D');

    // Stamp text inside
    doc.setFontSize(5.5);
    doc.setFont('helvetica', 'bold');
    doc.text('★ LEGAL PRACTITIONER ★', x + 22, y + 9, { align: 'center' });

    doc.setFontSize(6.5);
    doc.text(practitioner.slice(0, 24).toUpperCase(), x + 22, y + 15, { align: 'center' });

    doc.setFontSize(5);
    doc.setFont('helvetica', 'normal');
    doc.text(designation.slice(0, 28), x + 22, y + 19, { align: 'center' });
    doc.text(`REG: ${enrolment}`, x + 22, y + 23, { align: 'center' });
    doc.text(courtBar.slice(0, 28), x + 22, y + 27, { align: 'center' });

    if (stamp?.includeDateStamp || dateString) {
      doc.setFontSize(5);
      doc.setFont('helvetica', 'bold');
      doc.text(`VERIFIED: ${dateString || new Date().toISOString().slice(0, 10)}`, x + 22, y + 33, { align: 'center' });
    }
  } else {
    // Rectangular / Oval Seal
    doc.setLineWidth(0.8);
    doc.roundedRect(x, y, 65, 30, 2, 2, 'D');
    doc.setLineWidth(0.3);
    doc.roundedRect(x + 1.5, y + 1.5, 62, 27, 1.5, 1.5, 'D');

    doc.setFontSize(7);
    doc.setFont('helvetica', 'bold');
    doc.text(practitioner.toUpperCase(), x + 32.5, y + 7, { align: 'center' });

    doc.setFontSize(5.5);
    doc.setFont('helvetica', 'normal');
    doc.text(designation, x + 32.5, y + 12, { align: 'center' });
    doc.text(`Enrolment No: ${enrolment}`, x + 32.5, y + 17, { align: 'center' });
    doc.text(courtBar, x + 32.5, y + 21, { align: 'center' });
    doc.setFontSize(5);
    doc.setFont('helvetica', 'bold');
    doc.text(`OFFICIAL SEAL • ${dateString || new Date().toISOString().slice(0, 10)}`, x + 32.5, y + 26, { align: 'center' });
  }

  doc.setLineWidth(0.2);
}

export function generateTaxCalculationPDF(result: TaxCalculationResult, user?: UserProfile | null) {

  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;

  // Header Background
  doc.setFillColor(15, 60, 40); // Pakistani Emerald Green
  doc.rect(0, 0, pageWidth, 38, 'F');

  // Title
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('SAQIBTAX LEGAL AI — TAX DOSSIER', margin, 16);

  doc.setFontSize(9.5);
  doc.setFont('helvetica', 'normal');
  doc.text('Official FBR Statutory Tax Computation & Advisory Dossier', margin, 24);
  doc.text(`Tax Year: ${result.taxYear} | Under Income Tax Ordinance, 2001 (as amended)`, margin, 31);

  // Date & Ref
  const today = new Date().toLocaleDateString('en-PK', { year: 'numeric', month: 'long', day: 'numeric' });
  doc.setFontSize(8.5);
  doc.text(`Date Issued: ${today}`, pageWidth - margin, 24, { align: 'right' });
  doc.text(`Dossier Ref: ST-FBR-${Date.now().toString().slice(-7)}`, pageWidth - margin, 31, { align: 'right' });

  // Taxpayer Identification Card
  doc.setDrawColor(210, 220, 215);
  doc.setFillColor(248, 250, 248);
  doc.roundedRect(margin, 44, contentWidth, 26, 2, 2, 'FD');

  doc.setTextColor(15, 60, 40);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('1. TAXPAYER PROFILE & STATUS', margin + 6, 52);

  doc.setTextColor(40, 40, 40);
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.text(`Taxpayer Name: ${user?.fullName || 'Individual Taxpayer / Client'}`, margin + 6, 59);
  doc.text(`NTN / CNIC: ${user?.ntnNumber || '7193840-1 (Active Filer Status)'}`, margin + 6, 65);

  const categoryName = result.taxpayerType === 'salaried' ? 'Salaried Individual (Sec 149)' :
    result.taxpayerType === 'non_salaried' ? 'Business / Non-Salaried Individual' :
    result.taxpayerType === 'aop' ? 'Association of Persons (AOP / Firm)' : 'Corporate Entity (Sec 29)';

  doc.text(`Category: ${categoryName}`, 115, 59);
  doc.text(`Filing Status: Active Taxpayer List (ATL) Eligible`, 115, 65);

  // Financial Computation Table
  let y = 77;
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 60, 40);
  doc.text('2. ITEMIZED PROGRESSIVE TAX COMPUTATION', margin, y);

  y += 5;
  const tableData: [string, string, boolean][] = [
    ['Gross Total Income', `PKR ${result.grossAnnualIncome.toLocaleString()}`, false],
    ['Deductible Allowances Total (Sec 60, 60D, PF)', `- PKR ${(result.totalDeductions || (result.grossAnnualIncome - result.taxableIncome)).toLocaleString()}`, false],
    ['Taxable Net Income (Base for Slab Evaluation)', `PKR ${result.taxableIncome.toLocaleString()}`, true],
    ['Applicable Statutory Bracket', result.applicableSlab, false],
    ['Base Slab Fixed Tax', `PKR ${result.fixedTax.toLocaleString()}`, false],
    ['Tax on Excess Amount', `PKR ${Math.round(result.grossTax - result.fixedTax).toLocaleString()}`, false],
    ['Tax Credits / Rebates (Sec 61 Donations, Sec 63)', `- PKR ${result.taxCredits.toLocaleString()}`, false],
    ['Total Net Annual Tax Liability', `PKR ${result.netAnnualTax.toLocaleString()}`, true],
    ['Monthly Withholding Deduction (Sec 149)', `PKR ${result.monthlyWithholding.toLocaleString()}`, true],
    ['Effective Income Tax Rate', `${result.effectiveTaxRate}%`, false],
    ['Estimated Net Annual Take-Home', `PKR ${result.takeHomeAnnual.toLocaleString()}`, false],
    ['Estimated Net Monthly Take-Home', `PKR ${result.takeHomeMonthly.toLocaleString()}`, true],
  ];

  doc.setFontSize(8.5);
  tableData.forEach(([label, value, isHighlight], idx) => {
    if (isHighlight) {
      doc.setFillColor(232, 245, 237);
      doc.rect(margin, y, contentWidth, 7, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(15, 60, 40);
    } else if (idx % 2 === 0) {
      doc.setFillColor(250, 252, 250);
      doc.rect(margin, y, contentWidth, 6.5, 'F');
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(50, 50, 50);
    } else {
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(50, 50, 50);
    }

    doc.text(label, margin + 4, y + 4.5);
    doc.text(value, pageWidth - margin - 4, y + 4.5, { align: 'right' });
    y += isHighlight ? 7.8 : 6.8;
  });

  // Deductible Allowances Breakdown (If present)
  if (result.allowancesBreakdown) {
    y += 4;
    doc.setFontSize(10.5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(15, 60, 40);
    doc.text('3. DEDUCTIBLE ALLOWANCES & TAX RELIEF AUDIT', margin, y);

    y += 5;
    const allowancesList = [
      ['Educational Expenses (Section 60D)', `PKR ${result.allowancesBreakdown.educationalExpenses.toLocaleString()}`],
      ['Zakat Deductions (Section 60 / Zakat & Ushr Ord 1980)', `PKR ${result.allowancesBreakdown.zakatAllowance.toLocaleString()}`],
      ['Provident Fund Contribution (Statutory/Recognized)', `PKR ${result.allowancesBreakdown.providentFundContribution.toLocaleString()}`],
      ['Charitable Donations Tax Credit (Section 61)', `PKR ${result.allowancesBreakdown.charitableDonations.toLocaleString()}`],
      ['Approved Pension Fund Investment (Section 63)', `PKR ${result.allowancesBreakdown.pensionFundInvestment.toLocaleString()}`],
      ['Total Estimated Tax Saved via Planning', `PKR ${(result.taxSaved || 0).toLocaleString()}`],
    ];

    doc.setFontSize(8);
    allowancesList.forEach(([lbl, val], i) => {
      const isTotal = i === allowancesList.length - 1;
      if (isTotal) {
        doc.setFillColor(240, 250, 242);
        doc.rect(margin, y, contentWidth, 6.5, 'F');
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(20, 90, 50);
      } else {
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(60, 60, 60);
      }
      doc.text(lbl, margin + 4, y + 4.2);
      doc.text(val, pageWidth - margin - 4, y + 4.2, { align: 'right' });
      y += 6.5;
    });
  }

  // Statutory Notes & Legal Authority
  y += 4;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 60, 40);
  doc.text('4. STATUTORY CITATIONS & COMPLIANCE AUTHORITY', margin, y);

  y += 5;
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(70, 70, 70);
  doc.text('• Computed in strict accordance with the First Schedule, Part I, Division I & II of the Income Tax Ordinance, 2001.', margin, y);
  y += 4.5;
  doc.text('• Deductible allowances applied strictly under Section 60 (Zakat), Section 60D (Education), and approved Provident Funds.', margin, y);
  y += 4.5;
  doc.text('• High net worth surcharge (10%) applied on individuals with taxable income exceeding PKR 10 million pursuant to recent Finance Act.', margin, y);
  y += 4.5;
  doc.text('• Monthly withholding deductions subject to employer payroll withholding compliance under Section 149 of ITO 2001.', margin, y);

  // Footer / Seal
  doc.setDrawColor(15, 60, 40);
  doc.line(margin, 275, pageWidth - margin, 275);

  doc.setFontSize(7.5);
  doc.setTextColor(110, 110, 110);
  doc.text('SaqibTax Legal AI — Pakistan Tax Law & Compliance Intelligence System', margin, 281);
  doc.text('CONFIDENTIAL & PRIVILEGED STATUTORY DOSSIER', pageWidth - margin, 281, { align: 'right' });

  // Save the PDF
  doc.save(`SaqibTax_Official_Dossier_${result.taxYear}_${Date.now()}.pdf`);
}

export function generateNoticeReplyPDF(title: string, section: string, text: string, taxpayer: string) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();

  doc.setFillColor(15, 60, 40);
  doc.rect(0, 0, pageWidth, 30, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('LEGAL NOTICE REPLY DRAFT', 14, 16);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text(`Statutory Section: ${section} | Taxpayer: ${taxpayer}`, 14, 24);

  doc.setTextColor(40, 40, 40);
  doc.setFontSize(9.5);
  doc.setFont('helvetica', 'normal');

  const splitText = doc.splitTextToSize(text, pageWidth - 28);
  doc.text(splitText, 14, 42);

  doc.save(`FBR_Notice_Reply_${section.replace(/[^a-zA-Z0-9]/g, '_')}_${Date.now()}.pdf`);
}

export interface StatuteExportItem {
  id: string;
  code: string;
  title: string;
  page?: string;
  keyRuleSummary?: string;
}

export interface StatuteExportGroup {
  id: string;
  title: string;
  shortCode: string;
  actCategory?: string;
  act_type?: string;
  pageRange?: string;
  effectiveYear?: string;
  description?: string;
  items: StatuteExportItem[];
}

export function generateStatutesIndexPDF(
  statutes: StatuteExportGroup[],
  options?: {
    searchTerm?: string;
    category?: string;
    scope?: string;
  }
) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;

  const totalProvisions = statutes.reduce((sum, g) => sum + g.items.length, 0);
  const today = new Date().toLocaleDateString('en-PK', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const renderHeader = (pageNumber: number) => {
    // Top Brand Bar
    doc.setFillColor(15, 60, 40); // Pakistani Emerald Green
    doc.rect(0, 0, pageWidth, 28, 'F');

    // Title
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(15);
    doc.setFont('helvetica', 'bold');
    doc.text('SAQIBTAX LEGAL AI', margin, 12);

    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text('Pakistan Tax Law Statutory Index & Enactments Reference', margin, 19);
    doc.text('Federal Board of Revenue • Corporate Tax • Appellate Law', margin, 24);

    // Right-aligned Metadata
    doc.setFontSize(8);
    doc.text(`Generated: ${today}`, pageWidth - margin, 12, { align: 'right' });
    doc.text(`Ref: STAT-IDX-${Date.now().toString().slice(-6)}`, pageWidth - margin, 19, { align: 'right' });
    doc.text(`Page ${pageNumber}`, pageWidth - margin, 24, { align: 'right' });
  };

  const renderFooter = (pageNumber: number) => {
    doc.setDrawColor(200, 210, 205);
    doc.line(margin, pageHeight - 12, pageWidth - margin, pageHeight - 12);

    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(110, 120, 115);
    doc.text('SaqibTax Legal AI — Pakistan Statutory & Appellate Law Intelligence', margin, pageHeight - 7);
    doc.text(`CONFIDENTIAL LEGAL REFERENCE • PAGE ${pageNumber}`, pageWidth - margin, pageHeight - 7, { align: 'right' });
  };

  // Page 1 Header
  renderHeader(1);
  let currentPage = 1;
  let y = 35;

  // Filter Summary Box
  doc.setDrawColor(180, 200, 190);
  doc.setFillColor(245, 249, 246);
  doc.roundedRect(margin, y, contentWidth, 22, 2, 2, 'FD');

  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 60, 40);
  doc.text('FILTERED STATUTORY REPOSITORY REPORT', margin + 4, y + 6);

  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(50, 60, 55);

  const filterText = [
    options?.searchTerm ? `Search: "${options.searchTerm}"` : 'Search: All Enactments',
    options?.category && options.category !== 'all' ? `Category: ${options.category}` : 'Category: All Classes',
    `Matched Acts/Ordinances: ${statutes.length}`,
    `Total Indexed Provisions: ${totalProvisions}`,
  ].join('   |   ');

  doc.text(filterText, margin + 4, y + 12);
  doc.setTextColor(100, 110, 105);
  doc.text('Factual cross-reference with Income Tax Ordinance 2001, Subordinate Rules, and ATIR Appellate Procedures.', margin + 4, y + 17);

  y += 28;

  const checkPageBreak = (neededHeight: number) => {
    if (y + neededHeight > pageHeight - 20) {
      renderFooter(currentPage);
      doc.addPage();
      currentPage++;
      renderHeader(currentPage);
      y = 35;
      return true;
    }
    return false;
  };

  if (statutes.length === 0) {
    doc.setFontSize(11);
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(120, 120, 120);
    doc.text('No statutes or ordinances match the selected filter criteria.', margin, y + 10);
  } else {
    statutes.forEach((statute, sIdx) => {
      // Check space for statute header (around 26 units)
      checkPageBreak(26);

      // Group Header Box
      doc.setFillColor(235, 243, 238);
      doc.setDrawColor(180, 205, 195);
      doc.roundedRect(margin, y, contentWidth, 12, 1.5, 1.5, 'FD');

      doc.setFontSize(9.5);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(15, 60, 40);
      const titleText = `${sIdx + 1}. ${statute.title}`;
      const splitTitle = doc.splitTextToSize(titleText, contentWidth - 45);
      doc.text(splitTitle[0] || titleText, margin + 3, y + 7.5);

      // Short code & category tag on the right
      doc.setFontSize(8);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(30, 80, 55);
      const tagText = `[${statute.shortCode}] ${statute.pageRange || statute.effectiveYear || ''}`;
      doc.text(tagText, pageWidth - margin - 3, y + 7.5, { align: 'right' });

      y += 15;

      // Description if available
      if (statute.description) {
        doc.setFontSize(7.5);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(70, 75, 72);
        const descLines = doc.splitTextToSize(statute.description, contentWidth - 6);
        const descHeight = descLines.length * 3.6;
        checkPageBreak(descHeight + 4);
        doc.text(descLines, margin + 3, y);
        y += descHeight + 3;
      }

      // Provisions Table Header
      if (statute.items && statute.items.length > 0) {
        checkPageBreak(10);
        doc.setFillColor(245, 247, 246);
        doc.rect(margin, y, contentWidth, 5.5, 'F');
        doc.setFontSize(7.5);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(50, 60, 55);
        doc.text('SECTION / PROVISION', margin + 3, y + 4);
        doc.text('SUBJECT & STATUTORY SCOPE', margin + 38, y + 4);
        doc.text('PAGE / REF', pageWidth - margin - 3, y + 4, { align: 'right' });
        y += 7;

        // Provisions List
        statute.items.forEach((item, itemIdx) => {
          checkPageBreak(6.5);

          // Zebra striping
          if (itemIdx % 2 === 1) {
            doc.setFillColor(250, 252, 251);
            doc.rect(margin, y - 1, contentWidth, 5.5, 'F');
          }

          doc.setFontSize(7.5);
          doc.setFont('helvetica', 'bold');
          doc.setTextColor(15, 60, 40);
          doc.text(item.code, margin + 3, y + 3);

          doc.setFont('helvetica', 'normal');
          doc.setTextColor(40, 45, 42);
          const maxTitleWidth = contentWidth - 75;
          const itemTitle = item.title.length > 68 ? item.title.slice(0, 65) + '...' : item.title;
          doc.text(itemTitle, margin + 38, y + 3);

          if (item.page) {
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(90, 100, 95);
            doc.text(item.page, pageWidth - margin - 3, y + 3, { align: 'right' });
          }

          y += 5.5;
        });
      }

      y += 5; // Spacing between statutes
    });
  }

  // Render footer on the last page
  renderFooter(currentPage);

  // Save the generated PDF
  const filenameSearch = options?.searchTerm
    ? `_${options.searchTerm.replace(/[^a-zA-Z0-9]/g, '_').slice(0, 15)}`
    : '';
  doc.save(`SaqibTax_Statutes_Index${filenameSearch}_${Date.now().toString().slice(-6)}.pdf`);
}

/**
 * Enterprise Branded Tax Dossier PDF for Law Firms & Chartered Accountants
 */
export function generateBrandedTaxDossierPDF(
  result: TaxCalculationResult,
  client?: ClientLedgerProfile | null,
  branding?: FirmBrandingSettings | null
) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;

  // Header Banner with customizable firm color
  const hex = branding?.headerColor || '#0f3c28';
  // Parse hex to RGB
  const r = parseInt(hex.slice(1, 3), 16) || 15;
  const g = parseInt(hex.slice(3, 5), 16) || 60;
  const b = parseInt(hex.slice(5, 7), 16) || 40;

  doc.setFillColor(r, g, b);
  doc.rect(0, 0, pageWidth, 42, 'F');

  // Firm Name & Letterhead
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text(branding?.firmName || 'SAQIB & PARTNERS TAX CONSULTANTS', margin, 14);

  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.text(`${branding?.practitionerName || 'Advocate Muhammad Saqib, FCA'} • ${branding?.designation || 'Advocate High Court & Chartered Accountant'}`, margin, 21);
  doc.text(`License/Reg: ${branding?.licenseNumber || 'LHC-HC-28491'} | ${branding?.barOrBody || 'Lahore High Court Bar Association'}`, margin, 27);
  doc.text(`${branding?.address || 'Gulberg III, Lahore'} | Tel: ${branding?.phone || '+92 42 3578-9040'}`, margin, 33);
  doc.text(`Firm NTN: ${branding?.taxRegistrationNTN || '4829104-7'} | Email: ${branding?.email || 'tax@saqibtaxassociates.com.pk'}`, margin, 38);

  // Date & Dossier Ref
  const today = new Date().toLocaleDateString('en-PK', { year: 'numeric', month: 'long', day: 'numeric' });
  doc.setFontSize(8);
  doc.text(`Issued: ${today}`, pageWidth - margin, 21, { align: 'right' });
  doc.text(`Dossier Ref: ${client?.id ? `CLI-${client.id.toUpperCase()}` : 'FBR'}-${Date.now().toString().slice(-6)}`, pageWidth - margin, 27, { align: 'right' });
  doc.text(`Tax Year: ${result.taxYear}`, pageWidth - margin, 33, { align: 'right' });

  // Client Identification Card
  let y = 48;
  doc.setDrawColor(200, 215, 210);
  doc.setFillColor(248, 250, 248);
  doc.roundedRect(margin, y, contentWidth, 24, 2, 2, 'FD');

  doc.setTextColor(r, g, b);
  doc.setFontSize(9.5);
  doc.setFont('helvetica', 'bold');
  doc.text('CLIENT / TAXPAYER REGISTRATION DOSSIER', margin + 5, y + 6);

  doc.setTextColor(40, 40, 40);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text(`Client Name: ${client?.clientName || 'Privileged Client'}`, margin + 5, y + 12);
  doc.text(`NTN: ${client?.ntn || '7193840-1'}  |  CNIC: ${client?.cnic || '35202-0000000-0'}`, margin + 5, y + 18);

  doc.text(`Category: ${(client?.category || result.taxpayerType).toUpperCase().replace('_', ' ')}`, 115, y + 12);
  doc.text(`Jurisdiction: ${client?.fbrJurisdiction || 'RTO Lahore Corporate Zone'}`, 115, y + 18);

  // Itemized Computation Table
  y += 30;
  doc.setFontSize(10.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(r, g, b);
  doc.text('ITEMIZED TAX ASSESSMENT & SLAB BREAKDOWN', margin, y);

  y += 5;
  const tableData: [string, string, boolean][] = [
    ['Gross Total Income Declared', `PKR ${result.grossAnnualIncome.toLocaleString()}`, false],
    ['Deductible Allowances (Sec 60, 60D, PF)', `- PKR ${(result.totalDeductions || (result.grossAnnualIncome - result.taxableIncome)).toLocaleString()}`, false],
    ['Taxable Net Income Base', `PKR ${result.taxableIncome.toLocaleString()}`, true],
    ['Applicable Statutory Bracket', result.applicableSlab, false],
    ['Base Fixed Tax on Slab', `PKR ${result.fixedTax.toLocaleString()}`, false],
    ['Tax on Excess Amount', `PKR ${Math.round(result.grossTax - result.fixedTax).toLocaleString()}`, false],
    ['Tax Credits / Section 61 Donations', `- PKR ${result.taxCredits.toLocaleString()}`, false],
    ['Net Annual Income Tax Liability', `PKR ${result.netAnnualTax.toLocaleString()}`, true],
    ['Monthly Withholding Deduction (Sec 149)', `PKR ${result.monthlyWithholding.toLocaleString()}`, true],
    ['Effective Statutory Tax Rate', `${result.effectiveTaxRate}%`, false],
    ['Net Annual Take-Home Income', `PKR ${result.takeHomeAnnual.toLocaleString()}`, false],
    ['Net Monthly Disposable Take-Home', `PKR ${result.takeHomeMonthly.toLocaleString()}`, true],
  ];

  doc.setFontSize(8);
  tableData.forEach(([label, value, isHighlight], idx) => {
    if (isHighlight) {
      doc.setFillColor(235, 245, 240);
      doc.rect(margin, y, contentWidth, 6.5, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(r, g, b);
    } else if (idx % 2 === 0) {
      doc.setFillColor(250, 252, 250);
      doc.rect(margin, y, contentWidth, 6, 'F');
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(50, 50, 50);
    } else {
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(50, 50, 50);
    }

    doc.text(label, margin + 4, y + 4.2);
    doc.text(value, pageWidth - margin - 4, y + 4.2, { align: 'right' });
    y += isHighlight ? 7.2 : 6.2;
  });

  // Statutory Citations & Legal Certification
  y += 4;
  doc.setFontSize(9.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(r, g, b);
  doc.text('STATUTORY CITATIONS & COUNSEL CERTIFICATION', margin, y);

  y += 4.5;
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(70, 70, 70);
  doc.text('• Certified computation prepared under the First Schedule to the Income Tax Ordinance, 2001 (as amended by the Finance Act).', margin, y);
  y += 4;
  doc.text('• Deductible allowances applied strictly under Section 60 (Zakat), Section 60D (Education), and recognized Provident Funds.', margin, y);
  y += 4;
  doc.text('• Advisory Note: Taxpayer is advised to maintain bank account statements, CPR payment receipts, and withholding certificates for 6 years under Section 174.', margin, y);

  // Advocate / CA Sign & Stamp Box
  y += 10;
  doc.setDrawColor(180, 190, 185);
  doc.roundedRect(pageWidth - margin - 65, y, 65, 26, 1.5, 1.5, 'D');

  doc.setFontSize(7);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(50, 50, 50);
  doc.text('OFFICIAL SIGNATURE & SEAL', pageWidth - margin - 60, y + 5);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(90, 90, 90);
  doc.text(branding?.practitionerName || 'Advocate High Court', pageWidth - margin - 60, y + 17);
  doc.text(branding?.designation || 'Tax & Legal Consultant', pageWidth - margin - 60, y + 21);

  // Footer Disclaimer
  doc.setDrawColor(r, g, b);
  doc.line(margin, 276, pageWidth - margin, 276);

  doc.setFontSize(7);
  doc.setTextColor(110, 110, 110);
  doc.text(branding?.footerDisclaimer || 'Confidential & Attorney-Client Privileged Legal Document.', margin, 281);
  doc.text(`Powered by SaqibTax Legal AI Engine`, pageWidth - margin, 281, { align: 'right' });

  // Save the PDF
  const safeClientName = (client?.clientName || 'Client').replace(/[^a-zA-Z0-9]/g, '_');
  doc.save(`${branding?.firmName ? branding.firmName.replace(/[^a-zA-Z0-9]/g, '_') : 'SaqibTax'}_Dossier_${safeClientName}_${result.taxYear}.pdf`);
}

/**
 * Enterprise Branded Legal & Tax Fee Invoice PDF
 */
export function generateBrandedInvoicePDF(
  invoice: ProfessionalBillingInvoice,
  branding?: FirmBrandingSettings | null
) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;

  const hex = branding?.headerColor || '#0f3c28';
  const r = parseInt(hex.slice(1, 3), 16) || 15;
  const g = parseInt(hex.slice(3, 5), 16) || 60;
  const b = parseInt(hex.slice(5, 7), 16) || 40;

  // Header Banner
  doc.setFillColor(r, g, b);
  doc.rect(0, 0, pageWidth, 42, 'F');

  // Firm Details
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text(branding?.firmName || 'SAQIB & PARTNERS TAX CONSULTANTS', margin, 14);

  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.text(`${branding?.practitionerName || 'Advocate Muhammad Saqib, FCA'} • ${branding?.designation || 'Advocate High Court'}`, margin, 21);
  doc.text(`${branding?.address || 'Executive Heights, Gulberg III, Lahore'} | Tel: ${branding?.phone || '+92 42 3578-9040'}`, margin, 27);
  doc.text(`Firm NTN: ${branding?.taxRegistrationNTN || '4829104-7'} | Email: ${branding?.email || 'billing@saqibtaxassociates.com.pk'}`, margin, 33);
  doc.text(branding?.tagline || 'Tax Advisory, Appellate Defense & Corporate Compliance', margin, 38);

  // Invoice Title on the right
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('FEE NOTE / INVOICE', pageWidth - margin, 18, { align: 'right' });

  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.text(`Invoice No: ${invoice.invoiceNumber}`, pageWidth - margin, 25, { align: 'right' });
  doc.text(`Date: ${invoice.dateIssued}`, pageWidth - margin, 31, { align: 'right' });
  doc.text(`Due Date: ${invoice.dueDate}`, pageWidth - margin, 37, { align: 'right' });

  // Bill To Box
  let y = 48;
  doc.setDrawColor(210, 220, 215);
  doc.setFillColor(248, 250, 248);
  doc.roundedRect(margin, y, contentWidth, 24, 2, 2, 'FD');

  doc.setTextColor(r, g, b);
  doc.setFontSize(9.5);
  doc.setFont('helvetica', 'bold');
  doc.text('BILLED TO (CLIENT DETAILS):', margin + 5, y + 6);

  doc.setTextColor(40, 40, 40);
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.text(`Client Name: ${invoice.clientName}`, margin + 5, y + 12);
  doc.text(`NTN: ${invoice.clientNTN || 'N/A'}  |  CNIC: ${invoice.clientCNIC || 'N/A'}`, margin + 5, y + 18);
  doc.text(`Address: ${invoice.clientAddress || 'Pakistan'}`, 115, y + 12);
  doc.text(`Tax Assessment Year: ${invoice.taxYear}`, 115, y + 18);

  // Services Table Header
  y += 30;
  doc.setFillColor(r, g, b);
  doc.rect(margin, y, contentWidth, 7, 'F');

  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text('SR#', margin + 3, y + 4.5);
  doc.text('DESCRIPTION OF LEGAL / TAX SERVICES', margin + 14, y + 4.5);
  doc.text('QTY', margin + 115, y + 4.5);
  doc.text('RATE (PKR)', margin + 130, y + 4.5);
  doc.text('AMOUNT (PKR)', pageWidth - margin - 4, y + 4.5, { align: 'right' });

  y += 8;
  doc.setFontSize(8);
  invoice.services.forEach((srv, idx) => {
    if (idx % 2 === 1) {
      doc.setFillColor(250, 252, 250);
      doc.rect(margin, y - 1, contentWidth, 7, 'F');
    }

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(50, 50, 50);
    doc.text(`${idx + 1}`, margin + 3, y + 3.5);

    const desc = doc.splitTextToSize(srv.description, 95);
    doc.text(desc[0] || srv.description, margin + 14, y + 3.5);

    doc.text(`${srv.quantity}`, margin + 118, y + 3.5);
    doc.text(srv.unitPrice.toLocaleString(), margin + 130, y + 3.5);
    doc.setFont('helvetica', 'bold');
    doc.text(srv.amount.toLocaleString(), pageWidth - margin - 4, y + 3.5, { align: 'right' });

    y += 7.5;
  });

  // Summary Ledger Calculation on the right
  y += 4;
  const summaryX = pageWidth - margin - 85;
  const summaryWidth = 85;

  doc.setDrawColor(200, 215, 210);
  doc.setFillColor(248, 250, 248);
  doc.roundedRect(summaryX, y, summaryWidth, 42, 2, 2, 'FD');

  let sy = y + 6;
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(60, 60, 60);

  doc.text('Subtotal:', summaryX + 4, sy);
  doc.text(`PKR ${invoice.subtotal.toLocaleString()}`, pageWidth - margin - 4, sy, { align: 'right' });

  if (invoice.discount > 0) {
    sy += 6;
    doc.text('Discount / Concession:', summaryX + 4, sy);
    doc.text(`- PKR ${invoice.discount.toLocaleString()}`, pageWidth - margin - 4, sy, { align: 'right' });
  }

  if (invoice.applyProvincialTax) {
    sy += 6;
    doc.text(`Provincial Tax (${invoice.provincialTaxRate}%):`, summaryX + 4, sy);
    doc.text(`PKR ${invoice.provincialTaxAmount.toLocaleString()}`, pageWidth - margin - 4, sy, { align: 'right' });
  }

  sy += 8;
  doc.setFillColor(r, g, b);
  doc.rect(summaryX, sy - 4, summaryWidth, 8, 'F');
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text('GRAND TOTAL:', summaryX + 4, sy + 1.5);
  doc.text(`PKR ${invoice.grandTotal.toLocaleString()}`, pageWidth - margin - 4, sy + 1.5, { align: 'right' });

  sy += 10;
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(invoice.paymentStatus === 'paid' ? 20 : 180, invoice.paymentStatus === 'paid' ? 120 : 50, 50);
  doc.text(`Payment Status: ${invoice.paymentStatus.toUpperCase()}`, summaryX + 4, sy);
  doc.text(`Balance Due: PKR ${invoice.balanceDue.toLocaleString()}`, pageWidth - margin - 4, sy, { align: 'right' });

  // Bank Account & Wire Details on the left
  const bankY = y;
  doc.setDrawColor(200, 215, 210);
  doc.setFillColor(248, 250, 248);
  doc.roundedRect(margin, bankY, 85, 42, 2, 2, 'FD');

  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(r, g, b);
  doc.text('BANK WIRE / PAYMENT INSTRUCTIONS', margin + 4, bankY + 6);

  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(50, 50, 50);
  const bankLines = doc.splitTextToSize(invoice.bankAccountDetails || 'Habib Bank Limited (HBL) / Meezan Bank', 78);
  doc.text(bankLines, margin + 4, bankY + 13);

  doc.setFontSize(7);
  doc.setTextColor(100, 100, 100);
  doc.text('Cross cheques payable to firm name or direct IBAN transfer.', margin + 4, bankY + 36);

  // Footer / Disclaimer
  doc.setDrawColor(r, g, b);
  doc.line(margin, 276, pageWidth - margin, 276);

  doc.setFontSize(7);
  doc.setTextColor(110, 110, 110);
  doc.text(branding?.footerDisclaimer || 'Thank you for your business. Fee notes are due within 15 days of issue.', margin, 281);
  doc.text('SaqibTax Legal AI Enterprise Billing System', pageWidth - margin, 281, { align: 'right' });

  // Save the invoice PDF
  doc.save(`${invoice.invoiceNumber}_${invoice.clientName.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`);
}

/**
 * Enterprise Branded Section 116 Wealth Reconciliation Statement PDF
 */
export function generateBrandedWealthReconciliationPDF(
  recon: ClientWealthReconciliation,
  client?: ClientLedgerProfile | null,
  branding?: FirmBrandingSettings | null
) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;

  const hex = branding?.headerColor || '#0f3c28';
  const r = parseInt(hex.slice(1, 3), 16) || 15;
  const g = parseInt(hex.slice(3, 5), 16) || 60;
  const b = parseInt(hex.slice(5, 7), 16) || 40;

  // Header Banner
  doc.setFillColor(r, g, b);
  doc.rect(0, 0, pageWidth, 40, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(15);
  doc.setFont('helvetica', 'bold');
  doc.text(branding?.firmName || 'SAQIB & PARTNERS TAX CONSULTANTS', margin, 14);

  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.text('FORM 116 WEALTH STATEMENT & NET WEALTH RECONCILIATION AUDIT', margin, 21);
  doc.text(`Prepared under Section 116(2) of the Income Tax Ordinance, 2001 | Tax Year: ${recon.taxYear}`, margin, 27);
  doc.text(`Advocate / Practitioner: ${branding?.practitionerName || 'Advocate Muhammad Saqib, FCA'}`, margin, 33);

  // Client Details Box
  let y = 46;
  doc.setDrawColor(210, 220, 215);
  doc.setFillColor(248, 250, 248);
  doc.roundedRect(margin, y, contentWidth, 20, 2, 2, 'FD');

  doc.setTextColor(r, g, b);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text(`Taxpayer: ${client?.clientName || 'Taxpayer Client'}`, margin + 4, y + 6);

  doc.setTextColor(50, 50, 50);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text(`CNIC: ${client?.cnic || 'N/A'}  |  NTN: ${client?.ntn || 'N/A'}`, margin + 4, y + 12);
  doc.text(`Jurisdiction: ${client?.fbrJurisdiction || 'RTO Lahore'}`, 115, y + 6);
  doc.text(`Reconciliation Status: ${recon.isReconciled ? 'BALANCED (NIL VARIANCE)' : 'UNRECONCILED VARIANCE'}`, 115, y + 12);

  // Reconciliation Ledger Table
  y += 26;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(r, g, b);
  doc.text('SECTION 116 WEALTH RECONCILIATION LEDGER', margin, y);

  y += 5;
  const ledgerItems: [string, string, 'inflow' | 'outflow' | 'base' | 'total'][] = [
    ['1. Opening Net Wealth (Net Assets of Previous Tax Year)', `PKR ${recon.openingNetWealth.toLocaleString()}`, 'base'],
    ['2. Add: Net Inflow / Declared Income Subject to Normal Tax', `+ PKR ${recon.netInflowIncome.toLocaleString()}`, 'inflow'],
    ['3. Add: Foreign Remittance / PRC & Exempt Inflows', `+ PKR ${recon.exemptInflowRemittance.toLocaleString()}`, 'inflow'],
    ['4. Add: Realized Capital Gains & Investment Realizations', `+ PKR ${recon.capitalGainsInflow.toLocaleString()}`, 'inflow'],
    ['5. Less: Personal Household Expenses (Section 116(2))', `- PKR ${recon.personalHouseholdExpenses.toLocaleString()}`, 'outflow'],
    ['6. Less: Other Outflows, Gift Deeds & Asset Dispositions', `- PKR ${recon.otherOutflowsGifts.toLocaleString()}`, 'outflow'],
    ['7. Calculated Closing Net Wealth (Formula Total: 1+2+3+4-5-6)', `PKR ${recon.closingNetWealthCalculated.toLocaleString()}`, 'total'],
    ['8. Declared Closing Wealth on Iris 2.0 Balance Sheet', `PKR ${recon.declaredClosingWealthIris.toLocaleString()}`, 'total'],
    ['9. Unreconciled Variance / Audit Exposure Difference', `PKR ${recon.unreconciledDifference.toLocaleString()}`, recon.isReconciled ? 'base' : 'outflow'],
  ];

  doc.setFontSize(8);
  ledgerItems.forEach(([label, amount, type], i) => {
    if (type === 'total') {
      doc.setFillColor(235, 245, 240);
      doc.rect(margin, y, contentWidth, 6.8, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(r, g, b);
    } else if (i % 2 === 1) {
      doc.setFillColor(250, 252, 251);
      doc.rect(margin, y, contentWidth, 6.2, 'F');
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(50, 50, 50);
    } else {
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(50, 50, 50);
    }

    doc.text(label, margin + 4, y + 4.2);
    doc.text(amount, pageWidth - margin - 4, y + 4.2, { align: 'right' });
    y += type === 'total' ? 7.5 : 6.4;
  });

  // Notes & Signatures
  y += 6;
  doc.setDrawColor(200, 215, 210);
  doc.setFillColor(248, 250, 248);
  doc.roundedRect(margin, y, contentWidth, 26, 2, 2, 'FD');

  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(r, g, b);
  doc.text('PRACTITIONER RECONCILIATION NOTES & AUDIT MEMO', margin + 4, y + 6);

  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(60, 60, 60);
  const noteLines = doc.splitTextToSize(recon.reconciliationNotes || 'Reconciled in full with bank accounts, PRC certificates, and Iris wealth statement.', contentWidth - 8);
  doc.text(noteLines, margin + 4, y + 13);

  // Footer
  doc.setDrawColor(r, g, b);
  doc.line(margin, 276, pageWidth - margin, 276);

  doc.setFontSize(7);
  doc.setTextColor(110, 110, 110);
  doc.text('Prepared for FBR E-Filing Compliance under Section 116 of ITO 2001.', margin, 281);
  doc.text('SaqibTax Legal AI Enterprise Suite', pageWidth - margin, 281, { align: 'right' });

  doc.save(`Wealth_Reconciliation_${(client?.clientName || 'Client').replace(/[^a-zA-Z0-9]/g, '_')}_TY${recon.taxYear}.pdf`);
}

/**
 * Generate Comprehensive Dynamic Tax Rates Schema PDF
 */
export function generateDynamicTaxRatesPDF(
  config: DynamicTaxConfigSchema,
  branding?: FirmBrandingSettings | null
) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;

  const hex = branding?.headerColor || '#0f3c28';
  const r = parseInt(hex.slice(1, 3), 16) || 15;
  const g = parseInt(hex.slice(3, 5), 16) || 60;
  const b = parseInt(hex.slice(5, 7), 16) || 40;

  // Header Banner
  doc.setFillColor(r, g, b);
  doc.rect(0, 0, pageWidth, 32, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(15);
  doc.setFont('helvetica', 'bold');
  doc.text('SAQIBTAX — DYNAMIC TAX SLAB & STATUTORY RATE MATRIX', margin, 13);

  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.text(`Enactment: ${config.financeActName} | Tax Year: ${config.statutoryTaxYear}`, margin, 20);
  doc.text(`Effective Date: ${config.effectiveDate} | Version: ${config.version} | Override Status: ${config.isCustomOverrideActive ? 'CUSTOM ACTIVE' : 'STATUTORY DEFAULT'}`, margin, 26);

  let y = 40;

  // Salaried Slabs Section
  doc.setFontSize(10.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(r, g, b);
  doc.text('1. SALARIED INDIVIDUAL TAX SLABS (FIRST SCHEDULE, PART I, DIV I)', margin, y);

  y += 5;
  doc.setFillColor(r, g, b);
  doc.rect(margin, y, contentWidth, 6, 'F');

  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text('SLAB', margin + 3, y + 4.2);
  doc.text('TAXABLE INCOME RANGE (PKR)', margin + 20, y + 4.2);
  doc.text('FIXED TAX', margin + 95, y + 4.2);
  doc.text('RATE ON EXCESS', margin + 130, y + 4.2);
  doc.text('LEGAL CITATION', pageWidth - margin - 4, y + 4.2, { align: 'right' });

  y += 7;
  doc.setFontSize(7.5);
  config.incomeTax.salariedSlabs.forEach((slab, idx) => {
    if (idx % 2 === 1) {
      doc.setFillColor(248, 251, 249);
      doc.rect(margin, y - 1, contentWidth, 6, 'F');
    }
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(50, 50, 50);
    doc.text(`${slab.slabIndex}`, margin + 3, y + 3.5);
    const range = slab.maxIncome > 500000000
      ? `Above PKR ${slab.minIncome.toLocaleString()}`
      : `PKR ${slab.minIncome.toLocaleString()} to ${slab.maxIncome.toLocaleString()}`;
    doc.text(range, margin + 20, y + 3.5);
    doc.text(`PKR ${slab.fixedTax.toLocaleString()}`, margin + 95, y + 3.5);
    doc.setFont('helvetica', 'bold');
    doc.text(`${slab.ratePercentage}%`, margin + 130, y + 3.5);
    doc.setFont('helvetica', 'normal');
    doc.text(slab.legalProvisionRef.slice(0, 32), pageWidth - margin - 4, y + 3.5, { align: 'right' });
    y += 6.5;
  });

  // Non-Salaried / Business Slabs Section
  y += 4;
  doc.setFontSize(10.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(r, g, b);
  doc.text('2. NON-SALARIED / BUSINESS INDIVIDUAL SLABS (FIRST SCHEDULE, PART I)', margin, y);

  y += 5;
  doc.setFillColor(r, g, b);
  doc.rect(margin, y, contentWidth, 6, 'F');

  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text('SLAB', margin + 3, y + 4.2);
  doc.text('TAXABLE INCOME RANGE (PKR)', margin + 20, y + 4.2);
  doc.text('FIXED TAX', margin + 95, y + 4.2);
  doc.text('RATE ON EXCESS', margin + 130, y + 4.2);
  doc.text('LEGAL CITATION', pageWidth - margin - 4, y + 4.2, { align: 'right' });

  y += 7;
  doc.setFontSize(7.5);
  config.incomeTax.nonSalariedSlabs.forEach((slab, idx) => {
    if (idx % 2 === 1) {
      doc.setFillColor(248, 251, 249);
      doc.rect(margin, y - 1, contentWidth, 6, 'F');
    }
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(50, 50, 50);
    doc.text(`${slab.slabIndex}`, margin + 3, y + 3.5);
    const range = slab.maxIncome > 500000000
      ? `Above PKR ${slab.minIncome.toLocaleString()}`
      : `PKR ${slab.minIncome.toLocaleString()} to ${slab.maxIncome.toLocaleString()}`;
    doc.text(range, margin + 20, y + 3.5);
    doc.text(`PKR ${slab.fixedTax.toLocaleString()}`, margin + 95, y + 3.5);
    doc.setFont('helvetica', 'bold');
    doc.text(`${slab.ratePercentage}%`, margin + 130, y + 3.5);
    doc.setFont('helvetica', 'normal');
    doc.text(slab.legalProvisionRef.slice(0, 32), pageWidth - margin - 4, y + 3.5, { align: 'right' });
    y += 6.5;
  });

  // Sales Tax Rates Section
  y += 4;
  doc.setFontSize(10.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(r, g, b);
  doc.text('3. SALES TAX & PROVINCIAL SERVICES REVENUE MATRIX', margin, y);

  y += 5;
  doc.setFillColor(r, g, b);
  doc.rect(margin, y, contentWidth, 6, 'F');

  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text('AUTHORITY', margin + 3, y + 4.2);
  doc.text('JURISDICTION NAME', margin + 28, y + 4.2);
  doc.text('STANDARD RATE', margin + 115, y + 4.2);
  doc.text('WHT STANDARD', margin + 145, y + 4.2);
  doc.text('GOVERNING ACT', pageWidth - margin - 4, y + 4.2, { align: 'right' });

  y += 7;
  doc.setFontSize(7.5);
  config.salesTax.forEach((st, idx) => {
    if (idx % 2 === 1) {
      doc.setFillColor(248, 251, 249);
      doc.rect(margin, y - 1, contentWidth, 6, 'F');
    }
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(50, 50, 50);
    doc.text(st.jurisdiction, margin + 3, y + 3.5);
    doc.setFont('helvetica', 'normal');
    doc.text(st.jurisdictionName.slice(0, 42), margin + 28, y + 3.5);
    doc.setFont('helvetica', 'bold');
    doc.text(`${st.standardRate}%`, margin + 115, y + 3.5);
    doc.setFont('helvetica', 'normal');
    doc.text(`${st.withholdingRateStandard}%`, margin + 145, y + 3.5);
    doc.text(st.legalActRef.slice(0, 30), pageWidth - margin - 4, y + 3.5, { align: 'right' });
    y += 6.5;
  });

  // Footer & Seal
  drawAdvocateStamp(doc, pageWidth - margin - 60, pageHeight - 48, branding);

  doc.setDrawColor(r, g, b);
  doc.line(margin, pageHeight - 12, pageWidth - margin, pageHeight - 12);

  doc.setFontSize(7);
  doc.setTextColor(110, 110, 110);
  doc.text(`Official Rate Matrix • ${config.financeActName} • Verified by SaqibTax Enterprise Engine`, margin, pageHeight - 7);

  doc.save(`SaqibTax_Statutory_Rates_Schema_${config.statutoryTaxYear.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`);
}

/**
 * Generate Case Assignment & Associate Workload Memo PDF
 */
export function generateCaseAssignmentMemoPDF(
  assignment: CaseAssignment,
  client?: ClientLedgerProfile | null,
  branding?: FirmBrandingSettings | null
) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;

  const hex = branding?.headerColor || '#0f3c28';
  const r = parseInt(hex.slice(1, 3), 16) || 15;
  const g = parseInt(hex.slice(3, 5), 16) || 60;
  const b = parseInt(hex.slice(5, 7), 16) || 40;

  // Header Banner
  doc.setFillColor(r, g, b);
  doc.rect(0, 0, pageWidth, 38, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text(branding?.firmName || 'SAQIB & PARTNERS TAX LAW CHAMBERS', margin, 14);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text('INTERNAL CLIENT CASE ASSIGNMENT & ADVISORY MEMO', margin, 22);
  doc.text(`Assigned By: ${assignment.assignedByPartnerName} | Date: ${assignment.assignedDate}`, margin, 29);

  // Case Brief Card
  let y = 46;
  doc.setDrawColor(210, 220, 215);
  doc.setFillColor(248, 250, 248);
  doc.roundedRect(margin, y, contentWidth, 36, 2, 2, 'FD');

  doc.setTextColor(r, g, b);
  doc.setFontSize(10.5);
  doc.setFont('helvetica', 'bold');
  doc.text('CASE & ASSOCIATE ENGAGEMENT SPECIFICATIONS', margin + 5, y + 7);

  doc.setTextColor(40, 40, 40);
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.text(`Client Name: ${assignment.clientName}`, margin + 5, y + 15);
  doc.text(`Assigned Associate: ${assignment.associateName}`, margin + 5, y + 22);
  doc.text(`Statutory Tax Year: ${client?.taxYear || '2025-2026'}`, margin + 5, y + 29);

  doc.text(`Priority Level: ${assignment.priority.toUpperCase()}`, 115, y + 15);
  doc.text(`Submission Deadline: ${assignment.deadlineDate}`, 115, y + 22);
  doc.text(`Case Status: ${assignment.status.replace('_', ' ').toUpperCase()}`, 115, y + 29);

  // Task Scope
  y += 44;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(r, g, b);
  doc.text('SCOPE OF LEGAL & TAX MANDATE', margin, y);

  y += 6;
  doc.setDrawColor(210, 220, 215);
  doc.setFillColor(252, 253, 252);
  doc.roundedRect(margin, y, contentWidth, 24, 2, 2, 'FD');

  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(40, 40, 40);
  const scopeLines = doc.splitTextToSize(assignment.taskScope, contentWidth - 10);
  doc.text(scopeLines, margin + 5, y + 8);

  // Internal Instructions & Audit Notes
  y += 32;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(r, g, b);
  doc.text('PARTNER INSTRUCTIONS & COMPLIANCE DIRECTIVES', margin, y);

  y += 6;
  doc.setDrawColor(210, 220, 215);
  doc.setFillColor(252, 253, 252);
  doc.roundedRect(margin, y, contentWidth, 34, 2, 2, 'FD');

  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(40, 40, 40);
  const noteLines = doc.splitTextToSize(assignment.internalNotes || 'Ensure strict compliance with the First Schedule to ITO 2001. Maintain all audit trails in encrypted client dossier.', contentWidth - 10);
  doc.text(noteLines, margin + 5, y + 8);

  // Advocate Stamp & Signatures
  y += 45;
  drawAdvocateStamp(doc, margin, y, branding, assignment.assignedDate);

  doc.setDrawColor(180, 190, 185);
  doc.roundedRect(pageWidth - margin - 65, y, 65, 30, 1.5, 1.5, 'D');
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(50, 50, 50);
  doc.text('MANAGING PARTNER SIGNATURE', pageWidth - margin - 60, y + 6);
  doc.setFont('helvetica', 'normal');
  doc.text(assignment.assignedByPartnerName, pageWidth - margin - 60, y + 20);
  doc.text('Saqib & Partners Legal Chambers', pageWidth - margin - 60, y + 25);

  doc.setDrawColor(r, g, b);
  doc.line(margin, 276, pageWidth - margin, 276);
  doc.setFontSize(7);
  doc.setTextColor(110, 110, 110);
  doc.text('Confidential Internal Law Firm Assignment Memo • SaqibTax Multi-Tenant Management', margin, 281);

  doc.save(`Case_Assignment_${(assignment.clientName || 'Client').replace(/[^a-zA-Z0-9]/g, '_')}_${assignment.id}.pdf`);
}



