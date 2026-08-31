export interface TaxLegislationItem {
  id: number;
  category: "Income Tax" | "Appellate & Judicial" | "Asset Declarations & Amnesty" | "International & Reporting" | "Rewards & Welfare" | "Digital Taxation";
  title: string;
  description: string;
  sourceRef?: string;
  isRepealed?: boolean;
  statusBadge?: string;
}

export interface TaxCategoryMeta {
  key: string;
  label: string;
  shortCode: string;
  count: number;
  badgeColor: string;
  description: string;
}

export const TAX_LEGISLATION_DATA: TaxLegislationItem[] = [
  // SECTION 1: DEDICATED INCOME TAX LEGISLATION
  {
    id: 1,
    category: "Income Tax",
    title: "National Income Tax Framework Enactment, 2001",
    description: "The foundational statutory legislation establishing substantive income taxation principles, taxable income classifications, charging mechanisms, deduction rules, withholding tax regimes, and compliance obligations.",
    sourceRef: "Income Tax Ordinance, 2001",
    isRepealed: false,
    statusBadge: "Active Core Statute"
  },
  {
    id: 2,
    category: "Income Tax",
    title: "Income Tax Administration and Procedural Regulations, 2002",
    description: "Comprehensive subordinate regulatory guidelines establishing operational procedures, assessment methodologies, return formats, withholding protocols, and administrative mechanics for national income tax enforcement.",
    sourceRef: "Income Tax Rules, 2002",
    isRepealed: false,
    statusBadge: "Active Subordinate Rules"
  },
  {
    id: 3,
    category: "Income Tax",
    title: "Direct Taxation Statutory Compendium & Legislative Archive",
    description: "An exhaustive codified reference compendium documenting direct tax enactments, statutory historical evolutions, legislative annotations, and cumulative legal amendments up to July 1, 2026.",
    sourceRef: "Direct Taxes Compendium",
    isRepealed: false,
    statusBadge: "Updated to July 1, 2026"
  },

  // SECTION 2: APPELLATE & JUDICIAL PROCEDURES
  {
    id: 4,
    category: "Appellate & Judicial",
    title: "Revenue Appellate Tribunal (Member Appointments & Service Tenures) Regulations, 2024",
    description: "Statutory criteria and terms of engagement governing qualifications, judicial appointments, tenure conditions, and professional standards for Inland Revenue Appellate Tribunal members.",
    sourceRef: "ATIR Service Rules, 2024",
    isRepealed: false,
    statusBadge: "Statutory Regulation"
  },
  {
    id: 5,
    category: "Appellate & Judicial",
    title: "Apex Court Administrative Protocols & Judicial Proceedings Act, 2023",
    description: "Legislative statute standardizing bench constitution protocols, original jurisdiction exercise, appeal mechanisms, and internal case management rules across the Supreme Court.",
    sourceRef: "Supreme Court (Practice and Procedure) Act, 2023",
    isRepealed: false,
    statusBadge: "Constitutional Statute"
  },
  {
    id: 6,
    category: "Appellate & Judicial",
    title: "Inland Revenue Appellate Forum Jurisdiction and Procedural Rules, 2023",
    description: "Operational guidelines establishing tribunal territorial benches, registry filings, statutory limitation standards, hearing conduct, and dispute adjudication procedures for tax appeals.",
    sourceRef: "ATIR Functions Rules, 2023",
    isRepealed: false,
    statusBadge: "Appellate Rules"
  },

  // SECTION 3: ASSET DECLARATIONS & AMNESTY LEGISLATION
  {
    id: 7,
    category: "Asset Declarations & Amnesty",
    title: "Domestic Wealth & Unrecorded Capital Declaration Act, 2019",
    description: "A statutory documentation scheme enabling resident individuals and corporate entities to voluntarily register undisclosed domestic assets, real estate, and financial instruments upon payment of statutory levies.",
    sourceRef: "Assets Declaration Act, 2019",
    isRepealed: false,
    statusBadge: "Amnesty Framework"
  },
  {
    id: 8,
    category: "Asset Declarations & Amnesty",
    title: "Voluntary Local Assets Documentation and Regularization Act, 2018",
    description: "A structured fiscal incentive statute facilitating spontaneous declarations and legalization of previously unrecorded domestic wealth, real properties, and commercial holdings.",
    sourceRef: "Voluntary Declaration of Domestic Assets Act, 2018",
    isRepealed: false,
    statusBadge: "Amnesty Enactment"
  },
  {
    id: 9,
    category: "Asset Declarations & Amnesty",
    title: "Offshore Assets Regularization and Capital Repatriation Act, 2018",
    description: "A legal compliance mechanism enabling tax residents to disclose foreign-held real estate, securities, and monetary accounts with provisions for capital repatriation into the national banking system.",
    sourceRef: "Foreign Assets (Declaration and Repatriation) Act, 2018",
    isRepealed: false,
    statusBadge: "Offshore Repatriation"
  },
  {
    id: 10,
    category: "Asset Declarations & Amnesty",
    title: "Offshore Asset Tax Settlement and Fund Repatriation Procedures, 2018",
    description: "Prescribed banking and regulatory protocols detailing the step-by-step settlement of tax obligations, foreign exchange channels, and State Bank reporting for liquid capital repatriations.",
    sourceRef: "Repatriation Procedure, 2018",
    isRepealed: false,
    statusBadge: "Procedural Banking Rules"
  },
  {
    id: 11,
    category: "Asset Declarations & Amnesty",
    title: "Public Sector Officers' Asset Disclosure Exchange Rules, 2023",
    description: "Regulatory transparency protocols establishing inter-agency data sharing, authentication parameters, and disclosure mechanisms regarding the declared assets of civil servants.",
    sourceRef: "Civil Servants Assets Sharing Rules, 2023",
    isRepealed: false,
    statusBadge: "Public Transparency"
  },

  // SECTION 4: INTERNATIONAL & REPORTING STANDARDS
  {
    id: 12,
    category: "International & Reporting",
    title: "Global Financial Accounts Automatic Information Exchange Guidelines (CRS)",
    description: "Technical compliance directives and due diligence guidance for financial institutions to identify, verify, and transmit foreign tax resident account data under the Common Reporting Standard.",
    sourceRef: "CRS / AEOI Guidance Note",
    isRepealed: false,
    statusBadge: "OECD International Standard"
  },

  // SECTION 5: REWARDS, WELFARE, AND LEVIES
  {
    id: 13,
    category: "Rewards & Welfare",
    title: "Tax Administration Meritorious Service Reward Framework, 2021",
    description: "Performance evaluation standards and monetary incentive structures instituted for tax administration personnel and informants instrumental in revenue recovery and detection of tax evasion.",
    sourceRef: "Inland Revenue Reward Rules, 2021",
    isRepealed: false,
    statusBadge: "Administrative Rules"
  },
  {
    id: 14,
    category: "Rewards & Welfare",
    title: "Revenue Service Employees' Welfare Trust Fund Regulations, 2016",
    description: "Governance frameworks and financial allocation principles directing benevolent support funds, healthcare coverage, and educational stipends for tax department personnel.",
    sourceRef: "Inland Revenue Welfare Fund Rules, 2016",
    isRepealed: false,
    statusBadge: "Welfare Regulations"
  },
  {
    id: 15,
    category: "Rewards & Welfare",
    title: "Industrial Labor Assistance & Welfare Fund Enactment, 1971",
    description: "A statutory levy requiring industrial and commercial establishments exceeding defined profit thresholds to contribute toward industrial labor welfare, healthcare, and educational schemes.",
    sourceRef: "Workers Welfare Fund Ordinance, 1971",
    isRepealed: false,
    statusBadge: "Statutory Levy (2%)"
  },
  {
    id: 16,
    category: "Rewards & Welfare",
    title: "Asset Valuation and Capital Transaction Levy Provisions, 2022",
    description: "Legislative principles and valuation tables determining statutory levies assessed on high-value real estate acquisitions, luxury assets, and specified movable capital instruments.",
    sourceRef: "Capital Value Tax, 2022 & Rules",
    isRepealed: false,
    statusBadge: "Asset Levy"
  },
  {
    id: 17,
    category: "Rewards & Welfare",
    title: "Historical Social Safety Income Support Levy [Repealed]",
    description: "Archived legislative documentation and historical assessment guidelines for the defunct direct contribution levy formerly appropriated for public social assistance programs.",
    sourceRef: "Income Support Levy Act & Rules",
    isRepealed: true,
    statusBadge: "Historical / Repealed"
  },

  // SECTION 6: MODERN DIGITAL TAXATION
  {
    id: 18,
    category: "Digital Taxation",
    title: "Digital Economy & Virtual Platform Proceeds Taxation Act, 2025",
    description: "Modern direct taxation regulations targeting cross-border digital service providers, e-commerce marketplaces, cloud solutions, and virtual business footprints operating within the national jurisdiction.",
    sourceRef: "Digital Presence Proceeds Tax Act, 2025",
    isRepealed: false,
    statusBadge: "Digital Economy"
  }
];
