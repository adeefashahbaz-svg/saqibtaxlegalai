export interface MasterStatuteSection {
  id: string;
  code: string; // e.g. "Sec. 3", "Rule 12", "Sec. 111-B"
  title: string;
  summary: string;
  fullContent?: string[];
  taxImpactNotes: string; // Dedicated legal summary explaining its impact on Income Tax & FBR compliance
  fbrPracticeAdvisory: string; // Practical step-by-step guidance for tax consultants and advocates
  crossReferences: string[];
}

export interface MasterStatuteLaw {
  id: string;
  title: string;
  shortTitle: string;
  citation: string;
  categoryId: "indirect_tax" | "sector_levies" | "taxpayer_oversight" | "financial_integrity" | "foreign_exchange";
  categoryName: string;
  enactmentYear: string;
  status: "Active & Enforced" | "Amended up to Finance Act 2026" | "Active Regulatory Engine";
  jurisdiction: "Federal (FBR / Inland Revenue)" | "Federal Ombudsman / Presidency" | "Financial Monitoring Unit (FMU) / NAB" | "State Bank of Pakistan (SBP) / Federal Govt";
  administeringBody: string;
  overallDescription: string;
  incomeTaxInterplaySummary: string; // Tooltip / advisory summary explaining impact on Income Tax
  keyHighlights: string[];
  sections: MasterStatuteSection[];
}

export interface MasterLawCategory {
  id: "indirect_tax" | "sector_levies" | "taxpayer_oversight" | "financial_integrity" | "foreign_exchange";
  name: string;
  shortLabel: string;
  badge: string;
  accentColor: "emerald" | "blue" | "amber" | "rose" | "purple";
  badgeClass: string;
  description: string;
  iconName: string;
  lawsCount: number;
  statuteIds: string[];
}

export const MASTER_LAW_CATEGORIES: MasterLawCategory[] = [
  {
    id: "indirect_tax",
    name: "Core Indirect Taxation Laws Engine",
    shortLabel: "Indirect Taxes",
    badge: "STA 1990 & FEA 2005",
    accentColor: "emerald",
    badgeClass: "bg-emerald-950/90 text-emerald-300 border-emerald-600",
    description: "Consumption, value addition, supply chain sales tax and manufacturing excise duties.",
    iconName: "Receipt",
    lawsCount: 2,
    statuteIds: ["sta-1990-rules-2006", "fea-2005-rules"],
  },
  {
    id: "sector_levies",
    name: "Specialized Sector Levies Module",
    shortLabel: "Sector Levies",
    badge: "Telecom & Green EVs",
    accentColor: "blue",
    badgeClass: "bg-blue-950/90 text-blue-300 border-blue-600",
    description: "Mobile Handset IMEI levies and New Energy Vehicles (NEV) 2025 green transport tax regimes.",
    iconName: "Zap",
    lawsCount: 2,
    statuteIds: ["mobile-handset-levy", "nev-adoption-levy-2025"],
  },
  {
    id: "taxpayer_oversight",
    name: "Taxpayer Protection & Institutional Oversight Suite",
    shortLabel: "Taxpayer Oversight",
    badge: "FTO & FBR Governance",
    accentColor: "amber",
    badgeClass: "bg-amber-950/90 text-amber-300 border-amber-600",
    description: "Federal Tax Ombudsman maladministration redressal, institutional reforms, and FBR statutory governance.",
    iconName: "Scale",
    lawsCount: 3,
    statuteIds: ["fto-ordinance-2000", "ombudsmen-reforms-2013", "fbr-act-2007"],
  },
  {
    id: "financial_integrity",
    name: "Financial Integrity & Anti-Corruption Regulations",
    shortLabel: "Financial Integrity",
    badge: "Benami & AML/FATF",
    accentColor: "rose",
    badgeClass: "bg-rose-950/90 text-rose-300 border-rose-600",
    description: "Prohibition of proxy/benami property ownership, anti-money laundering (AML), and FATF financial tracking.",
    iconName: "ShieldAlert",
    lawsCount: 2,
    statuteIds: ["benami-transactions-2017", "aml-act-2010-fatf"],
  },
  {
    id: "foreign_exchange",
    name: "Foreign Exchange & Economic Stability Laws",
    shortLabel: "Foreign Exchange",
    badge: "PERA 1992 & FCY Rules",
    accentColor: "purple",
    badgeClass: "bg-purple-950/90 text-purple-300 border-purple-600",
    description: "Protection of economic reforms, foreign currency bank accounts guarantees, and cross-border capital monitoring.",
    iconName: "Globe",
    lawsCount: 3,
    statuteIds: ["pera-1992", "fcy-accounts-protection-2001", "fcy-accounts-rules-2020"],
  },
];

export const MASTER_STATUTES_DATA: MasterStatuteLaw[] = [
  // =========================================================================
  // CATEGORY 1: CORE INDIRECT TAXATION LAWS ENGINE
  // =========================================================================
  {
    id: "sta-1990-rules-2006",
    title: "Sales Tax Act, 1990 & Sales Tax Rules, 2006",
    shortTitle: "Sales Tax Act & Rules",
    citation: "Act No. VII of 1990 as amended up to Finance Act 2026",
    categoryId: "indirect_tax",
    categoryName: "Core Indirect Taxation Laws Engine",
    enactmentYear: "1990 (Active with Rules 2006)",
    status: "Amended up to Finance Act 2026",
    jurisdiction: "Federal (FBR / Inland Revenue)",
    administeringBody: "Federal Board of Revenue - Inland Revenue Operations",
    overallDescription: "The premier indirect consumption tax statute in Pakistan imposing a standard 18% ad valorem tax on the value of taxable supplies made by registered persons and goods imported into Pakistan, featuring strict input tax apportionment, electronic invoicing (SRO 1525(I)/2023), and Section 8B 90% input cap limits.",
    incomeTaxInterplaySummary: "Crucial for Section 21(l) income tax expense deductibility: un-invoiced supplies or purchases from non-active sales tax persons lead to automatic disallowances under Income Tax Ordinance 2001. Cross-matching of Sales Tax Annex-C with Income Tax turnover is the #1 basis for Section 122(5A) assessment amendments.",
    keyHighlights: [
      "Standard 18% sales tax under Section 3 on taxable goods manufactured or imported",
      "Section 8 & 8B: Input tax deduction restrictions and mandatory 10% minimum tax payment rule",
      "Mandatory Digital Invoicing & POS Integration for Tier-1 retailers and corporate suppliers",
      "Eleventh Schedule: Withholding sales tax rules for government departments and withholding agents",
      "Section 73: Mandatory banking channel payment requirement for transactions over PKR 50,000",
    ],
    sections: [
      {
        id: "sta-sec-3",
        code: "Section 3",
        title: "Scope of Tax & Charging Mechanism",
        summary: "Levies 18% sales tax on the value of taxable supplies made by a registered person in Pakistan and goods imported into Pakistan.",
        fullContent: [
          "Section 3(1): Imposes tax at 18% of the value of taxable supplies made in the course or furtherance of any taxable activity.",
          "Section 3(1A): Imposes Further Tax of 4% on supplies made to unregistered persons not appearing in the Active Taxpayers List.",
          "Section 3(2): Special rates specified in Third Schedule (Retail Price Tax) and Eighth Schedule (Reduced Rates).",
          "Section 3(9): Imposes tax on Tier-1 Retailers integrated with FBR online point of sale systems."
        ],
        taxImpactNotes: "Output tax collected does not form part of gross business receipts for income tax, but unpaid output tax liabilities create statutory liens under Section 140 of ITO 2001.",
        fbrPracticeAdvisory: "Ensure client sales ledgers differentiate standard 18% supplies from 0% export zero-rated (Fifth Schedule) and 4% Further Tax items to prevent FBR automated show-cause notices under Section 11(2).",
        crossReferences: ["Section 18 ITO 2001 (Business Income)", "Third Schedule STA 1990", "Fifth Schedule STA 1990"],
      },
      {
        id: "sta-sec-7-8b",
        code: "Section 7 & 8B",
        title: "Input Tax Determination & 90% Monthly Adjustment Cap",
        summary: "Governs allowable input tax credits against output liabilities with an overarching 90% ceiling on input adjustment in a single tax period.",
        fullContent: [
          "Section 7(1): Entitles registered persons to deduct input tax paid on taxable purchases and imports directly used in taxable supplies.",
          "Section 8(1): Inadmissible input tax on non-business purchases, fake invoices, and supplies from blacklisted/suspended units.",
          "Section 8B(1): Registered persons cannot adjust input tax exceeding 90% of the output tax for that tax period, forcing at least 10% cash output tax remittance to national exchequer.",
          "Section 8B(2): Annual refund/adjustment reconciliation permitted in the return for the second month following the end of the financial year."
        ],
        taxImpactNotes: "Unclaimed or disallowed input sales tax that cannot be adjusted due to statutory caps can be treated as an allowable deductible expense under Section 20 of ITO 2001, provided it is not penalized under Section 8.",
        fbrPracticeAdvisory: "Corporate filers should prepare automated annual Section 8B reconciliation dossiers to claim unadjusted carried-forward input balances in their August tax period filing.",
        crossReferences: ["Section 20 ITO 2001", "Rule 24 Sales Tax Rules 2006", "SRO 647(I)/2007"],
      },
      {
        id: "sta-sec-73",
        code: "Section 73",
        title: "Mandatory Banking Channel & Digital Payment Mode",
        summary: "Mandates payment through cross cheque, banking channel or digital Raast transfer from the registered business bank account for invoices exceeding PKR 50,000.",
        fullContent: [
          "Payment for transactions exceeding PKR 50,000 must be made by a crossed banking instrument or authorized digital transfer.",
          "The payment must originate from the declared business bank account of the buyer to the registered bank account of the supplier.",
          "Violation results in total disallowance of input tax under Section 8(1)(m) and penalties under Section 33."
        ],
        taxImpactNotes: "Mirrors Section 21(l) of Income Tax Ordinance 2001. A failure under Section 73 STA 1990 automatically triggers an immediate Section 21(l) income tax expense disallowance during assessment proceedings.",
        fbrPracticeAdvisory: "Audit client payment vouchers to verify bank account titles match the FBR Iris 181 registration certificates of both parties before filing.",
        crossReferences: ["Section 21(l) ITO 2001", "Section 33 STA 1990", "FBR Circular No. 01 of 2021"],
      },
    ],
  },
  {
    id: "fea-2005-rules",
    title: "Federal Excise Act, 2005 & Federal Excise Rules",
    shortTitle: "Federal Excise Act & Rules",
    citation: "Act No. VII of 2005 as amended up to Finance Act 2026",
    categoryId: "indirect_tax",
    categoryName: "Core Indirect Taxation Laws Engine",
    enactmentYear: "2005 (Active)",
    status: "Amended up to Finance Act 2026",
    jurisdiction: "Federal (FBR / Inland Revenue)",
    administeringBody: "Federal Board of Revenue - Inland Revenue Operations",
    overallDescription: "Federal excise duty statute targeting specific manufacturing sectors, beverages, cigarettes, cement, air travel tickets, financial services in non-provincial areas, and corporate telecommunications, featuring physical monitoring and electronic track-and-trace stamps.",
    incomeTaxInterplaySummary: "Federal Excise Duty paid on manufactured output is an allowable production cost deduction under Section 20 of ITO 2001. FED default orders under Section 14 create statutory joint liabilities with direct tax officers under Section 140 ITO.",
    keyHighlights: [
      "First Schedule Table-I: Specific and ad valorem duty rates on excisable goods (beverages, tobacco, cement, sugar)",
      "First Schedule Table-II: Excisable services including international air travel and telecommunication services",
      "Track and Trace System (Section 40C): Mandatory digital tax stamps on tobacco, sugar, fertilizer, and cement",
      "Section 16: Zero-rating on exports and designated manufacturing export processing zones",
      "Recovery mechanisms mirroring Section 140 ITO 2001 with attachment of bank accounts",
    ],
    sections: [
      {
        id: "fea-sec-3",
        code: "Section 3",
        title: "Levy and Collection of Federal Excise Duty",
        summary: "Charges duty of excise on goods produced or manufactured in Pakistan, imported goods, and specified services.",
        fullContent: [
          "Duty is levied on excisable goods produced in Pakistan at the time of clearance from the factory premises.",
          "Duty on excisable services is levied at the time of rendering or billing the service.",
          "First Schedule Table-I and Table-II prescribe specific duty rates, tiers, and capacity taxation benchmarks."
        ],
        taxImpactNotes: "Excise duty paid at import or clearance stage is added to inventory valuation under Section 35 of ITO 2001, impacting Cost of Goods Sold (COGS).",
        fbrPracticeAdvisory: "Review track and trace serial validation logs for beverage and tobacco clients before quarterly audit submissions.",
        crossReferences: ["Section 35 ITO 2001", "Table-I First Schedule FEA 2005", "SRO 250(I)/2019"],
      },
      {
        id: "fea-sec-40c",
        code: "Section 40C",
        title: "Track and Trace Electronic Monitoring System",
        summary: "Mandates unique identification tax stamps and electronic production monitoring for targeted high-revenue sectors.",
        fullContent: [
          "No excisable goods (tobacco, sugar, fertilizer, cement) may be removed from production facilities without security stamps.",
          "Counterfeit stamps or untracked production leads to summary seizure of plant, machinery, and criminal prosecution under Section 19.",
          "Information gathered through Track and Trace feeds directly into the FBR Central Data Warehouse."
        ],
        taxImpactNotes: "Track and trace production metrics are used by FBR to calculate suppressed production volumes and compute suppressed turnover under Section 111(1)(a) & 122(5A) of ITO 2001.",
        fbrPracticeAdvisory: "Advise manufacturing clients to maintain automated electronic log backups reconciling machine counters against FBR Iris production declarations.",
        crossReferences: ["Section 111 ITO 2001", "Section 19 FEA 2005", "Federal Excise Rules 2005"],
      },
    ],
  },

  // =========================================================================
  // CATEGORY 2: SPECIALIZED SECTOR LEVIES MODULE
  // =========================================================================
  {
    id: "mobile-handset-levy",
    title: "Mobile Handset Levy & Device Registration Tax Framework",
    shortTitle: "Mobile Handset Levy",
    citation: "Finance Act 2018 (Section 10) read with PTA DIRBS Regulations",
    categoryId: "sector_levies",
    categoryName: "Specialized Sector Levies Module",
    enactmentYear: "2018 (Amended 2024-2026)",
    status: "Active Regulatory Engine",
    jurisdiction: "Federal (FBR / Inland Revenue)",
    administeringBody: "FBR Customs & Inland Revenue in coordination with Pakistan Telecommunication Authority (PTA)",
    overallDescription: "Statutory levy framework imposed on commercial importation, local CKD/SKD manufacturing, and individual passenger baggage registration of mobile cellular handsets via PTA DIRBS (Device Identification, Registration and Blocking System), with tiered slabs based on C&F / USD handset valuation.",
    incomeTaxInterplaySummary: "Tied directly with Section 236K (Advance tax on purchase/import) and Section 236C of ITO 2001. Handset registration fees paid by commercial importers form part of the Minimum Tax regime under Section 148 / 153. Individual taxpayers can claim advance income tax portions against annual tax liabilities under Section 168.",
    keyHighlights: [
      "Tiered slab structure based on C&F value (Under $30, $30-$100, $100-$200, $200-$350, $350-$500, >$500)",
      "Integrated with PTA DIRBS system for automated IMEI whitelisting and tax collection",
      "Sales tax on commercial imports vs individual passenger CPV registration",
      "Advance income tax component under Section 148 ITO 2001 creditable in annual income tax return",
      "Local assembly incentives: Reduced levy on CKD/SKD kits to stimulate domestic industrialization",
    ],
    sections: [
      {
        id: "mhl-sec-1",
        code: "Section 10",
        title: "Charging Slabs for Mobile Cellular Handset Levy",
        summary: "Imposes statutory fixed levies on cellular devices according to USD valuation brackets.",
        fullContent: [
          "Category A (Below $30): Fixed levy of PKR 100 - PKR 300.",
          "Category B ($30 to $100): Fixed levy of PKR 1,500 + standard regulatory duty.",
          "Category C ($100 to $200): Fixed levy of PKR 4,000 + 18% sales tax.",
          "Category D ($200 to $350): Fixed levy of PKR 6,000 + WHT under Section 148.",
          "Category E ($350 to $500): Fixed levy of PKR 12,000 + Customs Duty.",
          "Category F (Exceeding $500 / Flagship devices): Fixed levy of PKR 25,000 to PKR 45,000 + regulatory duties."
        ],
        taxImpactNotes: "The Section 148 advance tax collected during mobile handset IMEI registration is an adjustable tax under Section 168 of ITO 2001 for active return filers.",
        fbrPracticeAdvisory: "Obtain PTA DIRBS payment CPR slips (PSID receipt) showing the taxpayer CNIC to claim Section 168 advance tax credits in the Iris return Code 64151480.",
        crossReferences: ["Section 148 ITO 2001", "Section 168 ITO 2001", "PTA DIRBS Framework"],
      },
      {
        id: "mhl-sec-2",
        code: "PTA DIRBS Rules",
        title: "Individual Baggage & Commercial IMEI Legalization",
        summary: "Procedures for travelers and commercial importers to legalize mobile devices within 60 days of arrival.",
        fullContent: [
          "Overseas Pakistanis and foreign passengers are entitled to one temporary registration window.",
          "Commercial importers must submit electronic GD (Goods Declaration) with serial IMEI manifests via WeBOC.",
          "Unregistered handsets are automatically blocked on cellular networks after 60 days of first SIM insertion."
        ],
        taxImpactNotes: "Corporate clients providing company-owned smartphones to executive employees must record the capitalized value inclusive of handset levies for depreciation claims under Section 22 of ITO 2001.",
        fbrPracticeAdvisory: "For corporate device fleet management, ensure invoices show enterprise NTN to ensure input sales tax adjustments under Section 7 of STA 1990.",
        crossReferences: ["Section 22 ITO 2001 (Depreciation)", "Customs Act 1969", "SRO 1455(I)/2018"],
      },
    ],
  },
  {
    id: "nev-adoption-levy-2025",
    title: "New Energy Vehicles Adoption Levy Act, 2025",
    shortTitle: "New Energy Vehicles (NEV) Levy Act",
    citation: "Act No. IV of 2025 (Green Mobility & Clean Transport Framework)",
    categoryId: "sector_levies",
    categoryName: "Specialized Sector Levies Module",
    enactmentYear: "2025 (Active)",
    status: "Active & Enforced",
    jurisdiction: "Federal (FBR / Inland Revenue)",
    administeringBody: "Ministry of Industries & Production in coordination with FBR Revenue Division",
    overallDescription: "Statutory green fiscal framework designed to accelerate national transition to Battery Electric Vehicles (BEVs), Plug-in Hybrids (PHEVs), and Fuel Cell Electric Vehicles (FCEVs), imposing progressive environmental levies on high-emission internal combustion engine (ICE) luxury vehicles while providing statutory tax holidays, accelerated depreciation, and 1% sales tax concessions for NEV infrastructure.",
    incomeTaxInterplaySummary: "Provides 100% first-year accelerated tax depreciation under Section 23 of ITO 2001 for corporate EV fleet acquisitions and EV charging station infrastructure. Imposes higher CVT rates on internal combustion luxury vehicles exceeding 2500cc.",
    keyHighlights: [
      "1% concessional Sales Tax on locally assembled Battery Electric Vehicles up to 50kWh battery capacity",
      "Exemption from Advance Tax under Section 231B / 236K on registration of zero-emission commercial transport",
      "Environmental Carbon Surcharge on high-emission luxury ICE vehicles (>3000cc) channeled to NEV Fund",
      "Tax Credit under Section 65F for green technology manufacturing and lithium-ion battery local assembly",
      "Accelerated first-year tax depreciation (100%) for corporate charging infrastructure investments",
    ],
    sections: [
      {
        id: "nev-sec-3",
        code: "Section 3",
        title: "Green Transport Tariff Concessions & Zero-Rating",
        summary: "Prescribes fiscal exemptions for clean energy vehicles, battery packs, and bidirectional charging units.",
        fullContent: [
          "Import of dedicated EV charging stations and battery swapping modules taxed at 0% Customs Duty and 0% Advance Income Tax.",
          "Electric buses and light commercial vehicles (LCVs) exempted from Section 236K advance motor vehicle tax.",
          "Concessional 1% sales tax applied to locally assembled 2-wheelers and 3-wheelers (E-Rickshaws)."
        ],
        taxImpactNotes: "Corporate entities investing in EV charging stations qualify for greenfield industrial status under Section 65E / 65F of ITO 2001, providing a 5-year corporate tax credit.",
        fbrPracticeAdvisory: "Ensure client invoices for EV infrastructure state engineering development board (EDB) approval certificate numbers to claim 1% sales tax and Section 23 depreciation.",
        crossReferences: ["Section 23 ITO 2001", "Section 65F ITO 2001", "Eighth Schedule STA 1990"],
      },
      {
        id: "nev-sec-7",
        code: "Section 7",
        title: "Carbon Offset Levy on High-Emission Luxury ICE Vehicles",
        summary: "Imposes a graduated green transition levy on large displacement internal combustion engine vehicles.",
        fullContent: [
          "Engine displacement 2000cc - 2500cc: 2.5% ad valorem Green Transition Levy.",
          "Engine displacement 2501cc - 3000cc: 5% ad valorem Green Transition Levy.",
          "Engine displacement above 3000cc / Supercharged: 7.5% ad valorem Green Transition Levy.",
          "Collected by motor vehicle registering authorities alongside Capital Value Tax (CVT) 2022."
        ],
        taxImpactNotes: "The Green Transition Levy is non-creditable and capitalized as part of the vehicle cost, subject to the motor vehicle passenger vehicle depreciation ceiling of PKR 7.5 million under Section 22(13) of ITO 2001.",
        fbrPracticeAdvisory: "Account for the passenger car depreciation cap under Section 22(13) when calculating taxable business income for clients acquiring luxury executive vehicles.",
        crossReferences: ["Section 22(13) ITO 2001", "Capital Value Tax 2022", "Section 231B ITO 2001"],
      },
    ],
  },

  // =========================================================================
  // CATEGORY 3: TAXPAYER PROTECTION & INSTITUTIONAL OVERSIGHT SUITE
  // =========================================================================
  {
    id: "fto-ordinance-2000",
    title: "Federal Tax Ombudsman Ordinance, 2000 & Regulations, 2001",
    shortTitle: "Federal Tax Ombudsman (FTO) Suite",
    citation: "Ordinance No. XXXV of 2000 read with FTO Investigation & Disposal Regulations 2001",
    categoryId: "taxpayer_oversight",
    categoryName: "Taxpayer Protection & Institutional Oversight Suite",
    enactmentYear: "2000 (Active with Regulations 2001)",
    status: "Active & Enforced",
    jurisdiction: "Federal Ombudsman / Presidency",
    administeringBody: "Federal Tax Ombudsman Secretariat, Islamabad",
    overallDescription: "Statutory institutional watchdog established to diagnose, investigate, eradicate, and redress maladministration by tax officials of the Federal Board of Revenue (Customs, Sales Tax, Income Tax), empowered to order disciplinary inquiries, recommend refund releases within 30 days, stay arbitrary bank attachments, and punish contempt.",
    incomeTaxInterplaySummary: "The most potent procedural remedy against corrupt, delayed, or arbitrary FBR actions. FTO complaints under Section 9 routinely secure immediate release of delayed income tax refunds under Section 170, stay illegal bank account freezing under Section 140, and penalize assessing officers who pass ex-parte best judgement assessments under Section 121 without statutory service of notice.",
    keyHighlights: [
      "Section 2(3): Broad statutory definition of 'Maladministration' (bias, delay, arbitrariness, corruption)",
      "Section 9: Jurisdiction to investigate complaints by aggrieved taxpayers against any FBR employee",
      "Section 10: Summary powers to summon witnesses, inspect records, and execute search warrants",
      "Section 11: Definite recommendations for refund issuance, disciplinary inquiry, and administrative reform",
      "Section 16: Contempt powers identical to Supreme Court of Pakistan with civil imprisonment authority",
      "Section 32: Presidential representation mechanism (only appeal avenue available to FBR)",
    ],
    sections: [
      {
        id: "fto-sec-2-3",
        code: "Section 2(3)",
        title: "Statutory Definition & Scope of 'Maladministration'",
        summary: "Defines maladministration to include a decision, process, recommendation, or omission made contrary to law or based on corrupt or extraneous motives.",
        fullContent: [
          "Clause (i): A decision, process, recommendation, act of omission or commission which is contrary to law, rules, or established practice.",
          "Clause (ii): Inordinate delay in processing refund applications, issuing exemption certificates, or deciding statutory appeals.",
          "Clause (iii): Neglect, inattention, delay, incompetence, inefficiency, and ineptitude in the discharge of duties.",
          "Clause (iv): Repeated issuance of arbitrary show-cause notices for extortion or harassment."
        ],
        taxImpactNotes: "Invoked when assessing officers fail to process valid Section 170 refund applications within 60 days or refuse Section 159 exemption certificates without speaking orders.",
        fbrPracticeAdvisory: "File an immediate FTO complaint under Form-A whenever an FBR officer freezes client bank accounts without providing mandatory 24-hour statutory notice of recovery.",
        crossReferences: ["Section 140 ITO 2001", "Section 170 ITO 2001", "Section 159 ITO 2001"],
      },
      {
        id: "fto-sec-9",
        code: "Section 9",
        title: "Jurisdiction, Functions & Bar of Jurisdiction",
        summary: "Empowers the Tax Ombudsman to investigate maladministration upon complaint by any aggrieved person or on suomoto motion.",
        fullContent: [
          "Section 9(1): Ombudsman may investigate any allegation of maladministration on the part of the Revenue Division or any tax employee.",
          "Section 9(2): Bars jurisdiction over matters sub-judice before court of competent jurisdiction or assessment of tax quantum unless tainted with arbitrary misconduct.",
          "Section 9(3): 60-day expedited statutory resolution target for taxpayer grievance disposal."
        ],
        taxImpactNotes: "While FTO cannot substitute its opinion for judicial assessment merits, it can set aside illegal assessment orders passed without valid service of statutory notices under Section 218 ITO 2001.",
        fbrPracticeAdvisory: "Ensure the complaint specifies procedural illegalities (lack of notice, absence of jurisdiction) rather than pure quantum debates to survive Section 9(2) maintainability objections.",
        crossReferences: ["Section 218 ITO 2001 (Service of Notice)", "Section 121 ITO 2001", "FTO Regulations 2001"],
      },
      {
        id: "fto-sec-16",
        code: "Section 16",
        title: "Power to Punish for Contempt",
        summary: "Vests the Federal Tax Ombudsman with contempt powers equivalent to the Supreme Court of Pakistan.",
        fullContent: [
          "The Ombudsman has the power to punish any person for contempt who disobeys lawful orders or undermines the authority of the Ombudsman.",
          "Punishment includes civil imprisonment or monetary fine, executable by the High Court or District Magistrate.",
          "FBR Commissioners failing to implement refund recommendations within 30 days face personal contempt proceedings."
        ],
        taxImpactNotes: "Guarantees 100% implementation of refund sanction recommendations by FBR Commissioners under Section 170 / CITRO rules.",
        fbrPracticeAdvisory: "Upon non-implementation of an FTO order after 30 days, file an immediate Contempt Petition under Rule 16 of FTO Regulations 2001 against the concerned Chief Commissioner.",
        crossReferences: ["Contempt of Court Ordinance 2003", "Article 204 Constitution of Pakistan", "Rule 16 FTO Regs"],
      },
    ],
  },
  {
    id: "ombudsmen-reforms-2013",
    title: "Federal Ombudsmen Institutional Reforms Act, 2013",
    shortTitle: "Federal Ombudsmen Reforms Act",
    citation: "Act No. XIV of 2013",
    categoryId: "taxpayer_oversight",
    categoryName: "Taxpayer Protection & Institutional Oversight Suite",
    enactmentYear: "2013 (Active)",
    status: "Active & Enforced",
    jurisdiction: "Federal Ombudsman / Presidency",
    administeringBody: "Federal Ombudsman Secretariat & Council of Ombudsmen",
    overallDescription: "Statutory enactment modernizing and standardizing the institutional framework of all Federal Ombudsmen (Tax, Federal, Banking, Insurance, Protection of Women against Harassment), introducing strict 60-day statutory time limits for complaint disposal, fast-track review mechanisms, and binding presidential representation rules.",
    incomeTaxInterplaySummary: "Provides legal backbone for FTO operational efficiency, mandating that all tax maladministration complaints must be decided within 60 days and FBR review petitions within 45 days. Bars frivolous FBR appeals to the President unless approved by the FBR Chairman personally.",
    keyHighlights: [
      "Section 3: Mandatory 60-day time limit for disposal of complaints by the Ombudsman",
      "Section 11: 30-day strict time limit for submission of Presidential Representations by FBR",
      "Section 13: Powers of civil court (discovery, document production, summoning witnesses, local commissions)",
      "Section 14: Finality of Ombudsman orders unless modified by the President of Pakistan",
      "Protection of whistleblowers and aggrieved small taxpayers against administrative retribution",
    ],
    sections: [
      {
        id: "fora-sec-3-11",
        code: "Section 3 & 11",
        title: "Statutory Timeframes & Presidential Representation Rules",
        summary: "Imposes strict mandatory deadlines on complaint adjudication and regulates FBR appeals to the President of Pakistan.",
        fullContent: [
          "Section 3: The Ombudsman shall decide the complaint and pass orders within 60 days from the date of filing.",
          "Section 11(1): Any party aggrieved by Ombudsman recommendations may file a Representation to the President within 30 days.",
          "Section 11(2): The operation of the Ombudsman order is NOT automatically stayed upon filing a Representation unless explicitly granted by the President.",
          "Section 12: Decisions of the President on representations are final and binding on all statutory authorities."
        ],
        taxImpactNotes: "Eliminates indefinite delays by FBR field formations in executing tax refund and maladministration relief orders.",
        fbrPracticeAdvisory: "Check if FBR filed its Presidential Representation within the non-extendable 30-day limitation window; if time-barred, petition the President for summary dismissal.",
        crossReferences: ["Section 32 FTO Ordinance 2000", "Article 99 Constitution of Pakistan"],
      },
    ],
  },
  {
    id: "fbr-act-2007",
    title: "Federal Board of Revenue Act, 2007 & Governance Rules",
    shortTitle: "FBR Act, 2007",
    citation: "Act No. IV of 2007 as amended up to 2026",
    categoryId: "taxpayer_oversight",
    categoryName: "Taxpayer Protection & Institutional Oversight Suite",
    enactmentYear: "2007 (Active)",
    status: "Active & Enforced",
    jurisdiction: "Federal (FBR / Inland Revenue)",
    administeringBody: "Federal Board of Revenue, Revenue Division, Islamabad",
    overallDescription: "The primary charter establishing the Federal Board of Revenue as a semi-autonomous statutory body corporate responsible for formulation and administration of fiscal policies, federal tax collection, human resource management, digital transformation, automated data sharing, and integrity management.",
    incomeTaxInterplaySummary: "Defines the constitutional and statutory delegation of powers to Members, Chief Commissioners, Commissioners, and Officers of Inland Revenue. Under Section 4 & 5, any delegation of authority not gazetted or published ultra vires invalidates assessment orders passed under Sections 121, 122, and 177 of ITO 2001.",
    keyHighlights: [
      "Section 3: Constitution of the Board comprising Chairman and statutory Members (Inland Revenue, Customs, IT, Legal)",
      "Section 4: Powers and functions of the Board in fiscal administration and tax policy formulation",
      "Section 5: Strict rules governing statutory delegation of powers to Inland Revenue field officers",
      "Section 8: Human Resource Management, integrity monitoring, and performance bonus allowances",
      "Section 10: Power to call for confidential banking and financial records from state and private bodies",
    ],
    sections: [
      {
        id: "fbra-sec-4-5",
        code: "Section 4 & 5",
        title: "Powers of the Board & Statutory Delegation Matrix",
        summary: "Regulates statutory jurisdiction, transfer of cases between Regional Tax Offices (RTOs/LTOs), and officer powers.",
        fullContent: [
          "Section 4: The Board exercises executive powers of the Federal Government in collecting direct and indirect taxes.",
          "Section 5(1): The Board may delegate its powers to any Member, Chief Commissioner, Commissioner, or Officer of Inland Revenue.",
          "Section 5(2): Delegation must be formalized via gazetted statutory notification or general order.",
          "Jurisdiction over corporate groups across multiple provinces requires a specific Section 209 ITO jurisdiction order read with FBR Act."
        ],
        taxImpactNotes: "Defense ground in tax appeals: If an assessing officer issues a Section 122 notice without a valid Section 209 / Section 5 jurisdiction order, the entire assessment is void ab-initio.",
        fbrPracticeAdvisory: "Always demand the Section 209 jurisdiction transfer order when an RTO initiates audit proceedings on a company whose registered office is in another territory.",
        crossReferences: ["Section 209 ITO 2001", "Section 210 ITO 2001", "Section 122 ITO 2001"],
      },
    ],
  },

  // =========================================================================
  // CATEGORY 4: FINANCIAL INTEGRITY & ANTI-CORRUPTION REGULATIONS
  // =========================================================================
  {
    id: "benami-transactions-2017",
    title: "Benami Transactions (Prohibition) Act, 2017 & Rules",
    shortTitle: "Benami Prohibition Act & Rules",
    citation: "Act No. V of 2017 read with Benami Transactions (Prohibition) Rules 2019",
    categoryId: "financial_integrity",
    categoryName: "Financial Integrity & Anti-Corruption Regulations",
    enactmentYear: "2017 (Active with Rules 2019)",
    status: "Active & Enforced",
    jurisdiction: "Financial Monitoring Unit (FMU) / NAB",
    administeringBody: "Federal Board of Revenue - Directorate General of Anti-Benami Operations & Adjudicating Authority",
    overallDescription: "Comprehensive statutory framework criminalizing the holding of benami (proxy/fictitious name) assets, properties, and bank accounts, providing for provisional attachment by Initiating Officers, confiscation by the Adjudicating Authority, and rigorous imprisonment of up to 7 years for beneficial owners and benamidars.",
    incomeTaxInterplaySummary: "Directly intersects with Section 111 (Unexplained Income & Assets) and Section 116 (Wealth Statement) of ITO 2001. Assets held in the name of spouses, minor children, drivers, or domestic employees that cannot be justified with tax-declared wealth sources trigger immediate Section 111 additions and parallel Benami confiscation proceedings under Section 24.",
    keyHighlights: [
      "Section 2(8): Exhaustive statutory definition of 'Benami Transaction', 'Benamidar', and 'Beneficial Owner'",
      "Section 3: Absolute statutory prohibition on entering into any benami transaction in Pakistan",
      "Section 5: Confiscation of benami property by the Federal Government with zero compensation",
      "Section 22: Attachment powers of Initiating Officer (provisional freezing of real estate and bank accounts)",
      "Section 24: Adjudication by Federal Adjudicating Authority with civil court evidentiary powers",
      "Section 53: Criminal penalties: Rigorous imprisonment from 1 to 7 years + fine up to 25% of fair market value",
    ],
    sections: [
      {
        id: "btpa-sec-2-3",
        code: "Section 2 & 3",
        title: "Prohibition of Benami Transactions & Fictitious Ownership",
        summary: "Prohibits any transaction where property is transferred to or held by a person while consideration was provided by another.",
        fullContent: [
          "Section 2(8)(a): A transaction where property is held by one person, but the consideration has been provided by another person.",
          "Section 2(8)(b): A transaction carried out in a fictitious or untraceable name.",
          "Section 2(8)(c): A transaction where the owner of property denies knowledge of such ownership.",
          "Section 2(8)(d): A transaction where the person providing consideration is untraceable or fictitious.",
          "Exceptions: Property held by Karta of HUF, fiduciary/trustee, or spouse/child purchased from known disclosed income."
        ],
        taxImpactNotes: "Purchases in the name of a spouse or children are ONLY protected if the purchasing funds originate from documented, tax-declared wealth reported in the buyer's Section 116 Wealth Statement.",
        fbrPracticeAdvisory: "In Section 116 wealth audits, verify banking trail showing money transfer from the taxpayer's declared bank account to the seller to defeat Benami allegations.",
        crossReferences: ["Section 111 ITO 2001", "Section 116 ITO 2001", "Benami Rules 2019"],
      },
      {
        id: "btpa-sec-22-24",
        code: "Section 22 & 24",
        title: "Provisional Attachment, Investigation & Adjudication",
        summary: "Procedural mechanism for Initiating Officer to freeze assets for 90 days and file reference before Adjudicating Authority.",
        fullContent: [
          "Initiating Officer issues show-cause notice under Section 22 and can provisionally attach property with Chief Commissioner approval.",
          "Case referred within 90 days to Adjudicating Authority for formal hearing.",
          "Adjudicating Authority passes order within 1 year confirming or revoking attachment.",
          "Appeal against Adjudicating Authority lies before Appellate Tribunal (Benami) and subsequently to the High Court under Section 45."
        ],
        taxImpactNotes: "Provisional attachment freezes property registration in land revenue records and halts banking debits without prior judicial trial.",
        fbrPracticeAdvisory: "Upon receipt of a Section 22 notice, file an immediate interim reply submitting tax returns, wealth statements, and bank statements establishing legitimate source of consideration within 30 days.",
        crossReferences: ["Section 45 BTPA 2017 (Appeal to High Court)", "Section 140 ITO 2001"],
      },
    ],
  },
  {
    id: "aml-act-2010-fatf",
    title: "Anti-Money Laundering Act, 2010 & FATF Compliance Rules",
    shortTitle: "AML Act, 2010 & FATF Rules",
    citation: "Act No. VII of 2010 as amended up to Finance Act 2026",
    categoryId: "financial_integrity",
    categoryName: "Financial Integrity & Anti-Corruption Regulations",
    enactmentYear: "2010 (Active)",
    status: "Active & Enforced",
    jurisdiction: "Financial Monitoring Unit (FMU) / NAB",
    administeringBody: "Financial Monitoring Unit (FMU), State Bank of Pakistan & FBR Directorate General of DNFBPs",
    overallDescription: "Statutory framework designed to prevent money laundering, combat financing of terrorism, and enforce FATF Recommendations across Financial Institutions and Designated Non-Financial Businesses and Professions (DNFBPs - Real Estate Agents, Lawyers, Accountants, Jewelers), mandating Currency Transaction Reports (CTRs), Suspicious Transaction Reports (STRs), and beneficial ownership disclosures.",
    incomeTaxInterplaySummary: "Major tax crimes (tax evasion exceeding PKR 10 million under Section 192A ITO 2001, fraudulent sales tax refunds, fake invoicing) are designated Predicate Offences under the AML Act Schedule. Tax evaders face joint prosecution by FBR and FMU, with asset freezing under Section 8 AMLA.",
    keyHighlights: [
      "Section 3: Comprehensive offense of money laundering covering acquisition, possession, conversion, or concealment of proceeds of crime",
      "Section 4: Severe criminal penalties: Rigorous imprisonment from 1 to 10 years + fine up to PKR 25 million + forfeiture of property",
      "Section 6: Financial Monitoring Unit (FMU) powers to receive and analyze CTRs and STRs from banks",
      "Section 6A: Mandatory DNFBP regulatory supervision for real estate agents, accountants, and corporate service providers",
      "Schedule of Predicate Offences: Includes Section 192A (Tax Evasion), Customs smuggling, and corruption offenses",
    ],
    sections: [
      {
        id: "amla-sec-3-4",
        code: "Section 3 & 4",
        title: "Offence of Money Laundering & Penal Sanctions",
        summary: "Defines the offense of acquiring, converting, transferring, or concealing property knowing it to be proceeds of crime.",
        fullContent: [
          "A person commits money laundering if they convert, transfer, conceal, disguise, acquire, possess or use property generated from a predicate crime.",
          "Rigorous imprisonment shall not be less than 1 year and may extend to 10 years.",
          "Mandatory fine of up to PKR 25,000,000 for natural persons and up to PKR 100,000,000 for corporate bodies.",
          "All assets, bank balances, and properties derived directly or indirectly are forfeited to the Federal Government."
        ],
        taxImpactNotes: "Deliberate tax fraud involving fake invoices or un-declared foreign wealth exceeding statutory thresholds turns standard tax audit into a criminal money laundering prosecution.",
        fbrPracticeAdvisory: "Advise corporate clients to maintain verified KYC files for all high-value vendor transactions over PKR 2 million to avoid accessory liability under AML Section 3(b).",
        crossReferences: ["Section 192A ITO 2001 (Tax Evasion Crime)", "Schedule of Predicate Offences AMLA"],
      },
      {
        id: "amla-sec-6a",
        code: "Section 6A & DNFBP Rules",
        title: "Obligations of DNFBPs & Beneficial Ownership Verification",
        summary: "Mandates real estate dealers, lawyers, tax consultants, and chartered accountants to conduct Customer Due Diligence (CDD).",
        fullContent: [
          "DNFBPs must register on the FBR DNFBP portal and conduct CDD on all property transactions and corporate formations.",
          "Mandatory identification and verification of Ultimate Beneficial Owners (UBOs) holding 25% or more equity.",
          "Filing of Suspicious Transaction Reports (STRs) to FMU within 3 days of detecting un-explainable cash funds.",
          "Failure to comply attracts administrative fines up to PKR 100 million and cancellation of professional licenses."
        ],
        taxImpactNotes: "Real estate deeds executed without DNFBP STR clearance are flagged during Section 236C / 236K advance tax verification on Iris.",
        fbrPracticeAdvisory: "Ensure law chambers and tax consultancy firms maintain updated DNFBP AML compliance manuals and client risk profiling templates.",
        crossReferences: ["FBR DNFBP Regulations 2020", "Section 181 ITO 2001", "Rule 83A Income Tax Rules 2002"],
      },
    ],
  },

  // =========================================================================
  // CATEGORY 5: FOREIGN EXCHANGE & ECONOMIC STABILITY LAWS
  // =========================================================================
  {
    id: "pera-1992",
    title: "Protection of Economic Reforms Act, 1992 (PERA)",
    shortTitle: "Protection of Economic Reforms Act",
    citation: "Act No. XII of 1992 as amended up to Finance Act 2026",
    categoryId: "foreign_exchange",
    categoryName: "Foreign Exchange & Economic Stability Laws",
    enactmentYear: "1992 (Active)",
    status: "Amended up to Finance Act 2026",
    jurisdiction: "State Bank of Pakistan (SBP) / Federal Govt",
    administeringBody: "Federal Government & State Bank of Pakistan",
    overallDescription: "Statutory enactment designed to foster foreign investment and ensure legal protection for economic liberalization, granting citizens and foreign investors the right to bring, hold, and take out foreign currency, guaranteeing property rights against state nationalization, and regulating foreign remittance tax immunities.",
    incomeTaxInterplaySummary: "Historically provided total tax immunity for foreign remittances. Following critical Finance Act amendments, PERA protections are harmonized with Section 111(4) of ITO 2001: foreign exchange remittances exceeding PKR 5 million per tax year are now subject to mandatory documentation and legitimate income source verification by the Commissioner.",
    keyHighlights: [
      "Section 3: Overriding statutory effect of the Act over all other existing laws including Customs and Tax statutes",
      "Section 4: Freedom to bring, hold, sell, and transfer foreign currency in any form within and outside Pakistan",
      "Section 5: Statutory guarantees against nationalization, compulsory acquisition, or expropriation of private investments",
      "Section 6: Protection of financial secrecy of foreign currency accounts held in commercial banks",
      "Harmonization with Section 111(4) ITO 2001: Mandatory banking channel remittance through authorized SBP channels",
    ],
    sections: [
      {
        id: "pera-sec-3-4",
        code: "Section 3 & 4",
        title: "Freedom to Hold & Transfer Foreign Currency & Overriding Effect",
        summary: "Grants all citizens and non-residents the statutory right to freely maintain foreign currency accounts and transfer capital.",
        fullContent: [
          "Section 3: The provisions of this Act shall have effect notwithstanding anything contained in the Foreign Exchange Regulation Act 1947 or Income Tax Ordinance.",
          "Section 4: All citizens of Pakistan resident in Pakistan or outside and other persons are entitled to freely bring, hold, sell and take out foreign currency.",
          "No statutory authority can impose restrictions on opening or operating foreign currency accounts in authorized banks."
        ],
        taxImpactNotes: "While Section 4 guarantees the right to hold foreign currency, Section 116A of ITO 2001 still requires resident individuals to declare foreign bank balances in their annual Foreign Income & Assets Statement.",
        fbrPracticeAdvisory: "Advise overseas and resident clients holding foreign currency accounts to file Iris Form 116A annually to prevent penalty proceedings under Section 182(1A).",
        crossReferences: ["Section 116A ITO 2001", "Section 111(4) ITO 2001", "Foreign Exchange Regulation Act 1947"],
      },
      {
        id: "pera-sec-5-9",
        code: "Section 5 & 9",
        title: "Protection of Foreign Remittance & Tax Inquiries",
        summary: "Harmonized statutory balance between foreign investment protection and tax source verification.",
        fullContent: [
          "Foreign exchange remittances routed through scheduled banks via banking channel receive statutory recognition.",
          "Pursuant to Finance Act amendments, tax authorities can inquire into the origin of foreign remittances if unexplained funds exceed statutory thresholds or indicate circular round-tripping.",
          "Protection from expropriation guarantees foreign investors repatriation of dividends, capital, and technology fees."
        ],
        taxImpactNotes: "Foreign remittances claimed as exempt under Section 111(4) must strictly be backed by standard PRC (Proceeds Realization Certificate) issued by the remitting bank under SBP FE Circulars.",
        fbrPracticeAdvisory: "Ensure clients retain official Bank PRCs with MT103 Swift messages for all foreign inward remittances claimed as non-taxable capital receipts in Section 116 wealth reconciliations.",
        crossReferences: ["Section 111(4) ITO 2001", "SBP Foreign Exchange Manual Chapter 14"],
      },
    ],
  },
  {
    id: "fcy-accounts-protection-2001",
    title: "Foreign Currency Accounts (Protection) Ordinance, 2001",
    shortTitle: "Foreign Currency Accounts Protection",
    citation: "Ordinance No. LVI of 2001",
    categoryId: "foreign_exchange",
    categoryName: "Foreign Exchange & Economic Stability Laws",
    enactmentYear: "2001 (Active)",
    status: "Active & Enforced",
    jurisdiction: "State Bank of Pakistan (SBP) / Federal Govt",
    administeringBody: "State Bank of Pakistan - Banking Policy & Regulation Department",
    overallDescription: "Statutory ordinance enacted to provide absolute legal protection to foreign currency account holders, prohibiting any future government freezing, seizure, compulsory conversion into PKR, or arbitrary restrictions on withdrawals following the historical 1998 post-nuclear test account freeze.",
    incomeTaxInterplaySummary: "Exempts profit on debt (interest income) earned by non-resident individuals on foreign currency accounts and Roshan Digital Accounts (RDA) from withholding tax under Section 151 and final tax under Section 152 of ITO 2001 pursuant to Clause (78) & (79) Part-I Second Schedule.",
    keyHighlights: [
      "Section 3: Absolute statutory guarantee that foreign currency accounts will never be frozen or seized by the Government",
      "Section 4: Freedom of foreign currency transfer, cash withdrawal, and outward remittance",
      "Section 5: Exemption from all federal and provincial wealth taxes, zakat deductions, and compulsory conversion",
      "Roshan Digital Account (RDA) statutory protection and seamless repatriation of portfolio investments",
    ],
    sections: [
      {
        id: "fcapo-sec-3-5",
        code: "Section 3, 4 & 5",
        title: "Prohibition of Freezing, Seizure & Tax Immunity",
        summary: "Prohibits the Federal Government or State Bank from freezing, seizing, or imposing restrictions on foreign currency accounts.",
        fullContent: [
          "Section 3: The Federal Government or State Bank of Pakistan shall not impose any restriction on the operation of foreign currency accounts, nor freeze or seize them.",
          "Section 4: Account holders are entitled to withdraw funds in foreign currency or convert into PKR at open market rates.",
          "Section 5: Balances held in foreign currency accounts are exempt from mandatory Zakat deduction under Zakat and Ushr Ordinance 1980."
        ],
        taxImpactNotes: "Interest income credited on Non-Resident Foreign Currency Accounts (NRFCAs) and RDA accounts is 100% tax-free under Clause 78 Part-I Second Schedule ITO 2001.",
        fbrPracticeAdvisory: "For non-resident clients receiving profit on RDA/FCY accounts, ensure tax deductions by banks are claimed as full refunds or zero-withholding under Second Schedule Clause 78.",
        crossReferences: ["Clause 78 Part-I Second Schedule ITO 2001", "Section 151 ITO 2001", "Zakat and Ushr Ordinance 1980"],
      },
    ],
  },
  {
    id: "fcy-accounts-rules-2020",
    title: "Foreign Currency Accounts Rules, 2020 (SBP & FBR Regulatory Engine)",
    shortTitle: "Foreign Currency Accounts Rules 2020",
    citation: "S.R.O. 963(I)/2020 read with SBP FE Circular No. 04 of 2020",
    categoryId: "foreign_exchange",
    categoryName: "Foreign Exchange & Economic Stability Laws",
    enactmentYear: "2020 (Active)",
    status: "Active Regulatory Engine",
    jurisdiction: "State Bank of Pakistan (SBP) / Federal Govt",
    administeringBody: "State Bank of Pakistan & FBR International Taxes / AEOI Directorate",
    overallDescription: "Subordinate regulatory framework modernizing foreign currency account operations in Pakistan, establishing rigorous source-of-fund documentation rules to prevent capital flight and money laundering, while allowing flexible operations for Roshan Digital Accounts (RDA), freelance IT exports, and resident foreign currency savings accounts.",
    incomeTaxInterplaySummary: "Establishes compliance protocols for cash foreign currency deposits: cash deposits exceeding USD 10,000 must be backed by documented foreign exchange purchase receipts or travel declarations. Failure to provide source leads to FBR Section 111 unexplained cash credit additions.",
    keyHighlights: [
      "Rule 3: Categories of allowable Foreign Currency Accounts (Resident FCY, Non-Resident FCY, RDA, Exporters Special FCY)",
      "Rule 4: Permissible credits (Inward remittances via banking channels, freelance IT receipts, authorized traveller cash)",
      "Rule 5: Prohibition on depositing cash foreign currency purchased from local unauthorized open market without NTN",
      "Rule 6: Mandatory automated reporting by commercial banks to State Bank and FBR under CRS and Section 165A",
      "Special dispensations for IT exporters allowing retention of up to 50% export proceeds in foreign currency",
    ],
    sections: [
      {
        id: "fcar-r3-4",
        code: "Rule 3 & 4",
        title: "Permissible Credit Operations & Source Documentation",
        summary: "Regulates what funds can legally be deposited or credited to foreign currency accounts held in Pakistani banks.",
        fullContent: [
          "Permissible credits include remittances received from abroad through banking channels.",
          "Proceeds from export of IT and IT-enabled services routed via banking channels.",
          "Foreign exchange brought into Pakistan by travelers who declared amounts exceeding USD 10,000 on Customs Form.",
          "Prohibits credit of funds derived from local PKR sources through unauthorized currency conversion."
        ],
        taxImpactNotes: "Cash deposits into FCY accounts without travel declarations or foreign remittances trigger Section 111(1)(b) unexplained investment notices during tax return audits.",
        fbrPracticeAdvisory: "Ensure IT freelance clients maintain SBP-compliant Exporters Special Foreign Currency Accounts (ESFCAs) to utilize the 1% final tax regime under Section 154A ITO 2001.",
        crossReferences: ["Section 154A ITO 2001 (Export of Services)", "Section 111 ITO 2001", "Rule 39B Income Tax Rules 2002"],
      },
      {
        id: "fcar-r6",
        code: "Rule 6",
        title: "Automated Banking Data Exchange & Tax Monitoring",
        summary: "Mandates commercial banks to share periodic transaction data of high-value foreign currency movements with FBR.",
        fullContent: [
          "Banks must submit monthly statements of foreign currency cash deposits and outward transfers under Section 165A of ITO 2001.",
          "Integration with the OECD Common Reporting Standard (CRS) for automatic exchange of financial account information.",
          "Suspicious or un-documented foreign currency accounts are reported to the Financial Monitoring Unit (FMU)."
        ],
        taxImpactNotes: "Data from Rule 6 feeds directly into FBR Iris automated profiling, generating computer-selected audit notices under Section 177 / 214C for discrepancies in declared foreign assets.",
        fbrPracticeAdvisory: "Reconcile closing foreign currency bank balances in USD and their PKR exchange equivalents at the SBP June 30 closing rate when preparing Form 116A Wealth Statements.",
        crossReferences: ["Section 165A ITO 2001", "Section 177 ITO 2001", "OECD CRS Standards"],
      },
    ],
  },
];
