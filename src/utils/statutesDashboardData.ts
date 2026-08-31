import { LucideIcon } from "lucide-react";

export interface StatuteIndexItem {
  id: string;
  type: "section" | "rule" | "guidance" | "schedule" | "form" | "repealed";
  code: string; // e.g. "Sec. 1", "Rule 1", "Sec. 1.1", "Schedule-I"
  title: string;
  page?: string;
  summary?: string;
  fullDetails?: string[];
  statutoryCategory?: string;
  complianceNotes?: string;
  crossReferences?: string[];
}

export interface StatuteGroup {
  id: string;
  title: string;
  shortCode: string;
  actCategory: "Statute" | "Subordinate Rules" | "Guidance / AEOI" | "Amnesty" | "Tribunal" | "Constitutional" | "Repealed";
  act_type: string;
  pageRange?: string;
  effectiveYear: string;
  description: string;
  keyHighlights: string[];
  items: StatuteIndexItem[];
}

export const STATUTES_MASTER_GROUPS: StatuteGroup[] = [
  // 1. WORKERS WELFARE FUND ORDINANCE, 1971
  {
    id: "wwf-1971",
    title: "WORKERS WELFARE FUND ORDINANCE, 1971",
    shortCode: "WWF 1971",
    actCategory: "Statute",
    act_type: "Statute",
    pageRange: "Pages 1229 - 1238",
    effectiveYear: "1971 (Active)",
    description: "Federal enactment establishing the Workers Welfare Fund to provide residential housing, educational scholarships, and healthcare institutions for industrial and commercial workers, imposing a mandatory 2% levy on total accounting or assessable profit exceeding PKR 500,000.",
    keyHighlights: [
      "Mandatory 2% contribution under Section 4 on higher of taxable income or accounting profit before tax",
      "Tripartite Governing Body representing Federal Government, Employers, and Trade Unions",
      "Autonomous Provincial Workers Welfare Boards as bodies corporate with property powers",
      "Summary eviction powers (Sec 11E) and rent recovery as arrears of land revenue (Sec 11D)",
      "Total statutory exemption from all federal and provincial income and wealth taxes (Sec 16)"
    ],
    items: [
      {
        id: "wwf-1",
        type: "section",
        code: "Sec. 1",
        title: "Short title, extent and commencement",
        page: "Page 1229",
        summary: "Extends to the whole of Pakistan and came into force on 9th December, 1971.",
        fullDetails: [
          "Covers industrial and commercial establishments across Pakistan.",
          "Post-18th Amendment applies to trans-provincial entities and Islamabad Capital Territory."
        ],
        complianceNotes: "Determine whether enterprise operations span multiple provinces to assess federal vs provincial WWF jurisdiction.",
        crossReferences: ["Industrial Relations Act 2012", "Constitution of Pakistan (18th Amendment)"]
      },
      {
        id: "wwf-2",
        type: "section",
        code: "Sec. 2",
        title: "Definitions",
        page: "Page 1229",
        summary: "Statutory definitions of 'Act' (ITO 2001), 'employer', 'industrial establishment', and 'worker'.",
        fullDetails: [
          "'Act' means the Income Tax Ordinance, 2001 (XLIX of 2001).",
          "'Employer' means the owner, manager, or person responsible for the management of an establishment.",
          "'Industrial Establishment' includes factories under Factories Act 1934, mines under Mines Act 1923, workshops, and commercial enterprises with 10+ employees.",
          "'Worker' means any employee engaged for manual, clerical, technical or supervisory labor."
        ],
        crossReferences: ["Factories Act 1934", "Mines Act 1923", "Companies Act 2017"]
      },
      {
        id: "wwf-3",
        type: "section",
        code: "Sec. 3",
        title: "Constitution of Workers Welfare Fund",
        page: "Page 1230",
        summary: "Constitutes the Federal Workers Welfare Fund with initial initial state grants and recurring contributions.",
        fullDetails: [
          "Initial capital grant of Rs. 100 million from the Federal Government.",
          "Credit of all 2% statutory collections paid under Section 4 and Section 4A.",
          "Interest, dividends, investments, loans, and voluntary donations received by the Fund."
        ]
      },
      {
        id: "wwf-4",
        type: "section",
        code: "Sec. 4",
        title: "Mode of payment by, and recovery from industrial establishments",
        page: "Page 1230",
        summary: "Every industrial establishment with total income of PKR 500,000 or more shall pay 2% of total assessable income or accounting profit.",
        fullDetails: [
          "Sec 4(1): Computation on higher of accounting profit before tax or taxable income declared in return.",
          "Sec 4(2): Assessed and collected by the Commissioner Inland Revenue in the same manner as income tax.",
          "Sec 4(3): Due date coincides with the filing date of the annual income tax return under Section 114."
        ],
        complianceNotes: "Generate CPR under WWF Head (Code 0023) at the time of e-filing annual income tax return.",
        crossReferences: ["Section 114 ITO 2001", "Section 137 ITO 2001", "Section 205 Default Surcharge"]
      },
      {
        id: "wwf-4a",
        type: "section",
        code: "Sec. 4A",
        title: "Payment of further amount",
        page: "Page 1231",
        summary: "Payment of additional 2% WWF when taxable income is increased pursuant to amended assessment orders.",
        fullDetails: [
          "Applies whenever an order under Section 122 or appellate order under Section 129/132 increases assessable income.",
          "Establishment must remit 2% on the incremental income within 30 days of notice of demand."
        ],
        crossReferences: ["Section 122 ITO 2001", "Section 129 ITO 2001"]
      },
      {
        id: "wwf-5",
        type: "section",
        code: "Sec. 5",
        title: "Liability to be discharged by certain persons",
        page: "Page 1231",
        summary: "Successor liability of legal representatives, liquidators in winding up, and asset transferees.",
        fullDetails: [
          "Liquidator of a company cannot distribute assets until WWF liabilities are fully certified as settled.",
          "Transferee of an industrial undertaking remains jointly and severally liable for unpaid WWF."
        ],
        crossReferences: ["Companies Act 2017 (Liquidation)", "Section 139 ITO 2001"]
      },
      {
        id: "wwf-6",
        type: "section",
        code: "Sec. 6",
        title: "Purposes to which moneys in the Fund may be applied",
        page: "Page 1232",
        summary: "Restricts capital deployment exclusively to worker housing schemes, educational scholarships, and healthcare facilities.",
        fullDetails: [
          "Financing construction of worker residential colonies and flats.",
          "Funding school education, technical training, and university scholarships for workers children.",
          "Medical treatment, marriage grants, and death compensation assistance for laborers.",
          "Defraying administrative expenses of the Governing Body and Provincial Boards."
        ]
      },
      {
        id: "wwf-7",
        type: "section",
        code: "Sec. 7",
        title: "Constitution of the Governing Body",
        page: "Page 1232",
        summary: "Creation of a tripartite Governing Body chaired by Federal Secretary, Overseas Pakistanis & HRD.",
        fullDetails: [
          "Equal representation from Federal Government, Provincial Governments, Employers, and Trade Unions.",
          "Oversees policy formulation, project approvals, and fund disbursements."
        ]
      },
      {
        id: "wwf-8",
        type: "section",
        code: "Sec. 8",
        title: "Appointment of Secretary and other employees of the Fund",
        page: "Page 1233",
        summary: "Executive powers of the Secretary and appointment of administrative officers."
      },
      {
        id: "wwf-9",
        type: "section",
        code: "Sec. 9",
        title: "Governing Body to lay down procedure, etc.",
        page: "Page 1233",
        summary: "Procedural rules for convening meetings, quorum determinations, and executive minutes."
      },
      {
        id: "wwf-10",
        type: "section",
        code: "Sec. 10",
        title: "Functions of the Governing Body",
        page: "Page 1233",
        summary: "Statutory powers to sanction labor schemes, approve annual budgets, allocate funds, and invest surplus capital."
      },
      {
        id: "wwf-10a",
        type: "section",
        code: "Sec. 10A",
        title: "Vesting of money allocated from the fund",
        page: "Page 1234",
        summary: "Non-lapsable vesting of allocated welfare funds into Provincial Workers Welfare Boards."
      },
      {
        id: "wwf-11",
        type: "section",
        code: "Sec. 11",
        title: "Maintenance of books of account, etc.",
        page: "Page 1234",
        summary: "Commercial double-entry accounting and mandatory annual audit by the Auditor General of Pakistan."
      },
      {
        id: "wwf-11a",
        type: "section",
        code: "Sec. 11A",
        title: "Constitution of Workers' Welfare Boards",
        page: "Page 1234",
        summary: "Constitution of Provincial and Islamabad Capital Territory Workers Welfare Boards."
      },
      {
        id: "wwf-11b",
        type: "section",
        code: "Sec. 11B",
        title: "Board to be a body corporate, etc.",
        page: "Page 1235",
        summary: "Every Welfare Board shall be a body corporate with perpetual succession, common seal, and property ownership powers."
      },
      {
        id: "wwf-11c",
        type: "section",
        code: "Sec. 11C",
        title: "Powers, etc. of the board",
        page: "Page 1235",
        summary: "Execution of residential colonies, vocational institutes, and community hospitals for workers."
      },
      {
        id: "wwf-11d",
        type: "section",
        code: "Sec. 11D",
        title: "Recovery of rent",
        page: "Page 1235",
        summary: "Unpaid rent and maintenance charges of welfare housing recoverable as arrears of land revenue."
      },
      {
        id: "wwf-11e",
        type: "section",
        code: "Sec. 11E",
        title: "Eviction",
        page: "Page 1235",
        summary: "Summary eviction of unauthorized occupants or retired employees upon 14-day formal notice."
      },
      {
        id: "wwf-11f",
        type: "section",
        code: "Sec. 11F",
        title: "Finality of order",
        page: "Page 1236",
        summary: "Orders of eviction and rent recovery are final and cannot be challenged in any civil court."
      },
      {
        id: "wwf-12",
        type: "section",
        code: "Sec. 12",
        title: "Delegation of powers",
        page: "Page 1236",
        summary: "Delegation of Governing Body functions to the Secretary or sub-committees."
      },
      {
        id: "wwf-13",
        type: "section",
        code: "Sec. 13",
        title: "Power to remit or reduce amount due",
        page: "Page 1236",
        summary: "Federal Government authority to remit or reduce WWF liability in genuine industrial hardship or disaster cases."
      },
      {
        id: "wwf-14",
        type: "section",
        code: "Sec. 14",
        title: "Protection of persons acting under this Ordinance",
        page: "Page 1236",
        summary: "Good faith indemnity protecting officers and board members against civil or criminal suits."
      },
      {
        id: "wwf-15",
        type: "section",
        code: "Sec. 15",
        title: "Power to make rules",
        page: "Page 1237",
        summary: "Rule-making powers of the Federal Government for regulating welfare administration."
      },
      {
        id: "wwf-16",
        type: "section",
        code: "Sec. 16",
        title: "Exemption from taxes",
        page: "Page 1237",
        summary: "Total statutory exemption of the Fund and all its capital, income, and real properties from all taxes."
      }
    ]
  },

  // 2. DIGITAL PRESENCE PROCEEDS TAX ACT, 2025 [REPEALED / CONSOLIDATED]
  {
    id: "dppt-2025",
    title: "DIGITAL PRESENCE PROCEEDS TAX ACT, 2025 [Repealed]",
    shortCode: "DPPT Act 2025 [Repealed]",
    actCategory: "Repealed",
    act_type: "Repealed",
    pageRange: "Pages 1239 - 1245",
    effectiveYear: "2025 (Repealed / Consolidated into ITO 2001)",
    description: "Statute originally enacted to impose an equalization levy on gross digital earnings of non-resident multinational technology firms (cloud providers, streaming, digital ads), subsequently repealed and codified under Sections 101, 102 (Offshore Digital Services), 109A, and 152 of the Income Tax Ordinance, 2001.",
    keyHighlights: [
      "Targeted significant economic digital presence of non-resident tech platforms without local PEs",
      "5% gross withholding on international digital advertising, cloud compute, and streaming remittances",
      "Repealed to avoid double-taxation disputes and conform to OECD/G20 Pillar One global tax architecture",
      "Currently regulated under Section 102 & Section 152(1C)/(1D) of ITO 2001"
    ],
    items: [
      {
        id: "dppt-overview",
        type: "repealed",
        code: "Digital Nexus & Repeal",
        title: "Taxation of Non-Resident Digital Platforms & Legislative Consolidation into ITO 2001",
        page: "Pages 1239-1245",
        summary: "Historical 5% gross digital levy consolidated into Section 102 of Income Tax Ordinance, 2001.",
        fullDetails: [
          "Covered digital platforms: Google, Meta, AWS, Netflix, Spotify, booking aggregators.",
          "Withholding handled by State Bank of Pakistan authorized dealer banks upon outward payment routing.",
          "Repealed to align with bilateral Double Taxation Avoidance Agreements (DTAAs) and OECD Pillar One."
        ],
        crossReferences: ["Section 101(3) ITO 2001", "Section 102 ITO 2001", "Section 152 ITO 2001"]
      }
    ]
  },

  // 3. SUPREME COURT (PRACTICE AND PROCEDURE) ACT, 2023
  {
    id: "sc-practice-2023",
    title: "SUPREME COURT (PRACTICE AND PROCEDURE) ACT, 2023",
    shortCode: "SC Practice Act 2023",
    actCategory: "Constitutional",
    act_type: "Constitutional",
    pageRange: "Pages 1246 - 1254",
    effectiveYear: "2023 (Active - Upheld in PLD 2023 SC 705)",
    description: "Regulates the exercise of the Supreme Court of Pakistan original jurisdiction, transparent 3-member committee bench formations, guaranteed right of intra-court appeal against suo motu orders under Article 184(3), and urgent 14-day hearing fixations in tax and constitutional matters.",
    keyHighlights: [
      "Sec 2: Benches constituted by Committee of Chief Justice and two most senior judges",
      "Sec 3: Article 184(3) matters referred to Committee for bench of not less than 3 judges",
      "Sec 4: Minimum 5-judge bench required for constitutional interpretation",
      "Sec 5: Mandatory right of appeal within 30 days to a larger bench against 184(3) orders",
      "Sec 6: Absolute right of taxpayer/litigant to appoint Counsel of Choice (Senior Advocate / AOR)",
      "Sec 7: Urgent fixation of interim stay applications within 14 days"
    ],
    items: [
      {
        id: "sc-sec-1",
        type: "section",
        code: "Sec. 1",
        title: "Short title, extent and commencement",
        page: "Page 1246",
        summary: "Extends to the whole of Pakistan and took effect at once."
      },
      {
        id: "sc-sec-2",
        type: "section",
        code: "Sec. 2",
        title: "Constitution of Benches",
        page: "Page 1247",
        summary: "Every cause, appeal or matter shall be disposed of by a Bench constituted by the Committee of CJP and 2 most senior judges.",
        fullDetails: [
          "Decisions in the Committee are taken by majority.",
          "Removes sole unilateral discretion over bench constitution."
        ],
        crossReferences: ["Article 191 Constitution of Pakistan", "PLD 2023 SC 705"]
      },
      {
        id: "sc-sec-3",
        type: "section",
        code: "Sec. 3",
        title: "Exercise of Original Jurisdiction by the Supreme Court",
        page: "Page 1248",
        summary: "Invocation of Article 184(3) must be first placed before the Committee for constitution of a bench of not less than 3 judges."
      },
      {
        id: "sc-sec-4",
        type: "section",
        code: "Sec. 4",
        title: "Interpretation of the Constitution",
        page: "Page 1249",
        summary: "Substantial questions of constitutional interpretation must be adjudicated by a bench of not less than 5 judges."
      },
      {
        id: "sc-sec-5",
        type: "section",
        code: "Sec. 5",
        title: "Appeal against orders under Article 184(3)",
        page: "Page 1250",
        summary: "Statutory right of appeal within 30 days to a larger bench of the Supreme Court against original jurisdiction orders.",
        complianceNotes: "In tax constitutional petitions challenging federal levies or retroactive taxes, file intra-court appeal within 30 days.",
        crossReferences: ["Article 184(3)", "Article 185"]
      },
      {
        id: "sc-sec-6",
        type: "section",
        code: "Sec. 6",
        title: "Right to appoint counsel of choice",
        page: "Page 1251",
        summary: "Party filing an appeal or review application has the absolute right to engage any Advocate of the Supreme Court of choice."
      },
      {
        id: "sc-sec-7",
        type: "section",
        code: "Sec. 7",
        title: "Application for urgent hearing",
        page: "Page 1252",
        summary: "Urgent petitions or stay applications must be fixed for hearing within 14 days of filing."
      },
      {
        id: "sc-sec-8",
        type: "section",
        code: "Sec. 8",
        title: "Act to override other laws",
        page: "Page 1253",
        summary: "Overrides any conflicting rules or provisions."
      }
    ]
  },

  // 4. APPELLATE TRIBUNAL INLAND REVENUE (APPOINTMENTS, TERMS AND CONDITIONS OF SERVICE) RULES, 2024
  {
    id: "atir-service-2024",
    title: "APPELLATE TRIBUNAL INLAND REVENUE (APPOINTMENTS, TERMS AND CONDITIONS OF SERVICE) RULES, 2024",
    shortCode: "ATIR Service Rules 2024",
    actCategory: "Subordinate Rules",
    act_type: "Subordinate Rules",
    pageRange: "Pages 1055 - 1063",
    effectiveYear: "2024 (Active)",
    description: "Framed under Section 130(7) of the Income Tax Ordinance, 2001 to restructure the Appellate Tribunal Inland Revenue with transparent Search & Selection Committee guidelines, competitive appointment criteria for Judicial and Accountant Members, market-competitive pay packages, and judicial code of conduct.",
    keyHighlights: [
      "Rule 3-4: Method and manner of competitive appointments for Judicial & Accountant Members",
      "Rule 5: Search & Selection Committee headed by Law Minister and senior judicial officers",
      "Rule 7: Competitive MP-I equivalent pay scales, judicial allowances, and official perks",
      "Rule 8-9: Formal disciplinary inquiry procedures and performance service records"
    ],
    items: [
      { id: "atir-2024-r1", type: "rule", code: "Rule 1", title: "Short title and commencement", page: "Page 1055" },
      { id: "atir-2024-r2", type: "rule", code: "Rule 2", title: "Definitions", page: "Page 1055" },
      { id: "atir-2024-r3", type: "rule", code: "Rule 3", title: "Manner of appointment", page: "Page 1056" },
      { id: "atir-2024-r4", type: "rule", code: "Rule 4", title: "Method of appointment", page: "Page 1057" },
      { id: "atir-2024-r5", type: "rule", code: "Rule 5", title: "Selection Committee", page: "Page 1057" },
      { id: "atir-2024-r6", type: "rule", code: "Rule 6", title: "Deputation", page: "Page 1057" },
      { id: "atir-2024-r7", type: "rule", code: "Rule 7", title: "Salary, allowances and privileges", page: "Page 1058" },
      { id: "atir-2024-r8", type: "rule", code: "Rule 8", title: "Removal, resignation etc.", page: "Page 1058" },
      { id: "atir-2024-r9", type: "rule", code: "Rule 9", title: "Record of service", page: "Page 1058" },
      { id: "atir-2024-r10", type: "rule", code: "Rule 10", title: "Repeal", page: "Page 1063" }
    ]
  },

  // 5. ASSETS DECLARATION ACT, 2019
  {
    id: "ada-2019",
    title: "ASSETS DECLARATION ACT, 2019",
    shortCode: "ADA 2019",
    actCategory: "Amnesty",
    act_type: "Amnesty",
    pageRange: "Pages 1063 - 1068",
    effectiveYear: "2019 (Amnesty Statute)",
    description: "National tax amnesty legislation allowing declaration of undisclosed domestic and foreign assets, sales, and expenditures upon payment of 1.5% to 4% tax, conferring total confidentiality and statutory immunity from prosecution under FBR and NAB laws.",
    keyHighlights: [
      "Sec 3-4: Scope of declaration and concessional tax rates (1.5% - 4%)",
      "Sec 5: Valuation formulas for immovable property (150% of FBR value)",
      "Sec 9: Foreign repatriation mechanism via State Bank special forex accounts",
      "Sec 12: Absolute evidentiary immunity (declarations inadmissible in court against declarant)"
    ],
    items: [
      { id: "ada-s1", type: "section", code: "Sec. 1", title: "Short title and commencement", page: "Page 1063" },
      { id: "ada-s2", type: "section", code: "Sec. 2", title: "Definitions", page: "Page 1063" },
      { id: "ada-s3", type: "section", code: "Sec. 3", title: "Declaration of undisclosed assets, sales and expenditure", page: "Page 1064" },
      { id: "ada-s4", type: "section", code: "Sec. 4", title: "Charge of tax and default surcharge", page: "Page 1064" },
      { id: "ada-s5", type: "section", code: "Sec. 5", title: "Value of assets", page: "Page 1064" },
      { id: "ada-s6", type: "section", code: "Sec. 6", title: "Time for payment of tax", page: "Page 1065" },
      { id: "ada-s7", type: "section", code: "Sec. 7", title: "Incorporation in books of account", page: "Page 1066" },
      { id: "ada-s8", type: "section", code: "Sec. 8", title: "Conditions for declaration", page: "Page 1066" },
      { id: "ada-s9", type: "section", code: "Sec. 9", title: "Mode and manner of repatriation of assets held outside Pakistan and payment of tax thereon", page: "Page 1066" },
      { id: "ada-s10", type: "section", code: "Sec. 10", title: "Tax paid not refundable", page: "Page 1066" },
      { id: "ada-s11", type: "section", code: "Sec. 11", title: "Act not to apply to certain persons, assets or proceedings", page: "Page 1067" },
      { id: "ada-s12", type: "section", code: "Sec. 12", title: "Declaration not admissible in evidence", page: "Page 1067" },
      { id: "ada-s13", type: "section", code: "Sec. 13", title: "Misrepresentation", page: "Page 1067" },
      { id: "ada-s14", type: "section", code: "Sec. 14", title: "Confidentiality", page: "Page 1067" },
      { id: "ada-s15", type: "section", code: "Sec. 15", title: "Power to make rules", page: "Page 1067" },
      { id: "ada-s16", type: "section", code: "Sec. 16", title: "Act to override other laws", page: "Page 1067" },
      { id: "ada-s17", type: "section", code: "Sec. 17", title: "Removal of difficulty", page: "Page 1067" },
      { id: "ada-s18", type: "section", code: "Sec. 18", title: "Revision of declaration", page: "Page 1068" },
      { id: "ada-s19", type: "section", code: "Sec. 19", title: "Repeal", page: "Page 1068" },
      { id: "ada-sched", type: "schedule", code: "Schedule", title: "Rates of Tax on Undisclosed Assets & Sales", page: "Page 1068" }
    ]
  },

  // 6. ASSETS DECLARATION (PROCEDURE AND CONDITIONS) RULES, 2019
  {
    id: "ada-rules-2019",
    title: "ASSETS DECLARATION (PROCEDURE AND CONDITIONS) RULES, 2019",
    shortCode: "ADA Rules 2019",
    actCategory: "Subordinate Rules",
    act_type: "Subordinate Rules",
    pageRange: "Pages 1073 - 1078",
    effectiveYear: "2019 (Subordinate Rules)",
    description: "Procedural regulations prescribing the electronic filing of amnesty declarations on the IRIS portal, treatment of CRS intelligence, beneficial ownership verification, and public office holder exclusions.",
    keyHighlights: [
      "Rule 3: Electronic filing on IRIS portal with designated CPR payment receipts",
      "Rule 9-10: Coordination with OECD Common Reporting Standard (CRS) foreign account data",
      "Rule 12: Strict exclusion of holders of public office, spouses, and minor children"
    ],
    items: [
      { id: "adar-1", type: "rule", code: "Rule 1", title: "Short title and commencement", page: "Page 1073" },
      { id: "adar-2", type: "rule", code: "Rule 2", title: "Definitions", page: "Page 1073" },
      { id: "adar-3", type: "rule", code: "Rule 3", title: "Manner of filing declaration", page: "Page 1073" },
      { id: "adar-4", type: "rule", code: "Rule 4", title: "Conditions for making declaration", page: "Page 1074" },
      { id: "adar-5", type: "rule", code: "Rule 5", title: "Payment of tax for original demand", page: "Page 1075" },
      { id: "adar-6", type: "rule", code: "Rule 6", title: "Payment of tax under other laws", page: "Page 1075" },
      { id: "adar-7", type: "rule", code: "Rule 7", title: "Revision of declaration", page: "Page 1075" },
      { id: "adar-8", type: "rule", code: "Rule 8", title: "Treatment of asset, income or expenditure in a declaration", page: "Page 1075" },
      { id: "adar-9", type: "rule", code: "Rule 9", title: "Proceedings under the Ordinance in respect of the information received other than under CRS", page: "Page 1076" },
      { id: "adar-10", type: "rule", code: "Rule 10", title: "Declaration filed and the information under CRS", page: "Page 1076" },
      { id: "adar-11", type: "rule", code: "Rule 11", title: "Beneficial ownership", page: "Page 1077" },
      { id: "adar-12", type: "rule", code: "Rule 12", title: "Holder of public office", page: "Page 1077" },
      { id: "adar-13", type: "rule", code: "Rule 13", title: "Immunity from proceedings under any other law", page: "Page 1077" },
      { id: "adar-14", type: "rule", code: "Rule 14", title: "Voluntary Declaration of Domestic Assets, 2018 and Foreign Assets (Declaration and Repatriation) Act, 2018", page: "Page 1077" },
      { id: "adar-15", type: "rule", code: "Rule 15", title: "Access to Declarations under the Act", page: "Page 1078" }
    ]
  },

  // 7. VOLUNTARY DECLARATION OF DOMESTIC ASSETS ACT, 2018
  {
    id: "vdda-2018",
    title: "VOLUNTARY DECLARATION OF DOMESTIC ASSETS ACT, 2018",
    shortCode: "VDDA 2018",
    actCategory: "Amnesty",
    act_type: "Amnesty",
    pageRange: "Pages 1079 - 1087",
    effectiveYear: "2018 (Domestic Amnesty)",
    description: "Statutory amnesty enabling regularisation of undisclosed domestic cash, bank balances, real estate, and financial assets at concessional rates of 2% to 5% with full book-incorporation rights.",
    keyHighlights: [
      "Sec 5: Declaration of domestic liquid & fixed assets held within Pakistan",
      "Sec 7-8: 2% rate for liquid cash/bonds, 3% on immovable property, 5% on general undisclosed assets",
      "Sec 9: Legal permission to incorporate declared assets into wealth statements without Section 111 addition"
    ],
    items: [
      { id: "vdda-1", type: "section", code: "Sec. 1", title: "Short title and commencement", page: "Page 1079" },
      { id: "vdda-2", type: "section", code: "Sec. 2", title: "Definitions", page: "Page 1079" },
      { id: "vdda-3", type: "section", code: "Sec. 3", title: "Act to override other laws", page: "Page 1080" },
      { id: "vdda-4", type: "section", code: "Sec. 4", title: "Application", page: "Page 1080" },
      { id: "vdda-5", type: "section", code: "Sec. 5", title: "Declaration of domestic assets in Pakistan", page: "Page 1081" },
      { id: "vdda-6", type: "section", code: "Sec. 6", title: "Period of applicability", page: "Page 1081" },
      { id: "vdda-7", type: "section", code: "Sec. 7", title: "Charge of tax", page: "Page 1081" },
      { id: "vdda-8", type: "section", code: "Sec. 8", title: "Payment of tax", page: "Page 1082" },
      { id: "vdda-9", type: "section", code: "Sec. 9", title: "Incorporation in books of account", page: "Page 1082" },
      { id: "vdda-10", type: "section", code: "Sec. 10", title: "Valuation", page: "Page 1082" },
      { id: "vdda-11", type: "section", code: "Sec. 11", title: "Confidentiality", page: "Page 1084" },
      { id: "vdda-12", type: "section", code: "Sec. 12", title: "Declaration not admissible in evidence", page: "Page 1084" },
      { id: "vdda-13", type: "section", code: "Sec. 13", title: "Removal of difficulty", page: "Page 1084" },
      { id: "vdda-14", type: "section", code: "Sec. 14", title: "Misrepresentation", page: "Page 1084" },
      { id: "vdda-15", type: "section", code: "Sec. 15", title: "Revision", page: "Page 1085" },
      { id: "vdda-sched", type: "schedule", code: "Schedule", title: "Rates of Tax on Domestic Declarations", page: "Page 1087" }
    ]
  },

  // 8. FOREIGN ASSETS (DECLARATION AND REPATRIATION) ACT, 2018
  {
    id: "fara-2018",
    title: "FOREIGN ASSETS (DECLARATION AND REPATRIATION) ACT, 2018",
    shortCode: "FARA 2018",
    actCategory: "Amnesty",
    act_type: "Amnesty",
    pageRange: "Pages 1087 - 1095",
    effectiveYear: "2018 (Offshore Amnesty)",
    description: "Statutory framework allowing resident individuals to declare foreign bank accounts, offshore shares, and real estate, offering reduced 2% rate for repatriated liquid funds and 3% for non-repatriated foreign assets.",
    keyHighlights: [
      "Sec 5: Declaration & repatriation of foreign assets held outside Pakistan",
      "Sec 9: Foreign currency conversion formulas at official State Bank inter-bank exchange rates",
      "Sec 12: Special sovereign USD denominated investment bond incentive at 2% tax rate"
    ],
    items: [
      { id: "fara-1", type: "section", code: "Sec. 1", title: "Short title and commencement", page: "Page 1087" },
      { id: "fara-2", type: "section", code: "Sec. 2", title: "Definitions", page: "Page 1087" },
      { id: "fara-3", type: "section", code: "Sec. 3", title: "Act to override other laws", page: "Page 1089" },
      { id: "fara-4", type: "section", code: "Sec. 4", title: "Application", page: "Page 1089" },
      { id: "fara-5", type: "section", code: "Sec. 5", title: "Declaration and repatriation of assets held outside Pakistan", page: "Page 1089" },
      { id: "fara-6", type: "section", code: "Sec. 6", title: "Period of applicability", page: "Page 1089" },
      { id: "fara-7", type: "section", code: "Sec. 7", title: "Charge of tax", page: "Page 1090" },
      { id: "fara-8", type: "section", code: "Sec. 8", title: "Payment of tax", page: "Page 1090" },
      { id: "fara-9", type: "section", code: "Sec. 9", title: "Currency and rate of conversion", page: "Page 1090" },
      { id: "fara-10", type: "section", code: "Sec. 10", title: "Mode and manner", page: "Page 1091" },
      { id: "fara-11", type: "section", code: "Sec. 11", title: "Incorporation in books of account", page: "Page 1091" },
      { id: "fara-12", type: "section", code: "Sec. 12", title: "Investment in Government securities", page: "Page 1091" },
      { id: "fara-13", type: "section", code: "Sec. 13", title: "Confidentiality", page: "Page 1091" },
      { id: "fara-14", type: "section", code: "Sec. 14", title: "Declaration not admissible in evidence", page: "Page 1091" },
      { id: "fara-15", type: "section", code: "Sec. 15", title: "Removal of difficulty", page: "Page 1091" },
      { id: "fara-16", type: "section", code: "Sec. 16", title: "Misrepresentation", page: "Page 1091" },
      { id: "fara-17", type: "section", code: "Sec. 17", title: "Revision", page: "Page 1092" },
      { id: "fara-sched", type: "schedule", code: "Schedule", title: "Tax Rates on Foreign Declarations & Repatriations", page: "Page 1095" }
    ]
  },

  // 9. GUIDANCE NOTE ON COMMON REPORTING STANDARD (CRS) FOR AUTOMATIC EXCHANGE OF INFORMATION (AEOI)
  {
    id: "crs-guidance-aeoi",
    title: "GUIDANCE NOTE ON COMMON REPORTING STANDARD FOR AUTOMATIC EXCHANGE OF FINANCIAL ACCOUNTS INFORMATION",
    shortCode: "CRS Guidance (AEOI)",
    actCategory: "Guidance / AEOI",
    act_type: "Guidance / AEOI",
    pageRange: "Pages 1101 - 1154",
    effectiveYear: "OECD Standard (Active)",
    description: "Authoritative compliance guidance for Pakistani Financial Institutions (Commercial Banks, Asset Management Companies, Central Depository Company, Microfinance Banks) on implementing OECD Common Reporting Standard due diligence, foreign tax resident identification, and XML information exchange.",
    keyHighlights: [
      "Classification of Reporting vs Non-Reporting Financial Institutions (Depository, Custodial, Investment Entities)",
      "Due diligence search rules for Pre-existing Lower Value vs High Value Accounts (Indicia Search)",
      "Identification of Passive Non-Financial Entities (NFEs) and Controlling Persons (PEPs / FATF)",
      "Reporting schema covering TIN, account balance, dividends, interest, and gross proceeds"
    ],
    items: [
      { id: "crs-1.1", type: "guidance", code: "Sec. 1.1", title: "Background", page: "Page 1101" },
      { id: "crs-2.1", type: "guidance", code: "Sec. 2.1", title: "Introduction", page: "Page 1101" },
      { id: "crs-2.2", type: "guidance", code: "Sec. 2.2", title: "Step 1: Is it an Entity?", page: "Page 1106" },
      { id: "crs-2.3", type: "guidance", code: "Sec. 2.3", title: "Step 2: Is the Entity a financial institution?", page: "Page 1106" },
      { id: "crs-2.3.1", type: "guidance", code: "Sec. 2.3.1", title: "Custodial Institution", page: "Page 1107" },
      { id: "crs-2.3.2", type: "guidance", code: "Sec. 2.3.2", title: "Depository Institution", page: "Page 1107" },
      { id: "crs-2.3.3", type: "guidance", code: "Sec. 2.3.3", title: "Investment Entity", page: "Page 1107" },
      { id: "crs-2.3.4", type: "guidance", code: "Sec. 2.3.4", title: "Specified Insurance Company", page: "Page 1108" },
      { id: "crs-2.4", type: "guidance", code: "Sec. 2.4", title: "Step 3: Is the Financial Institution in Pakistan?", page: "Page 1108" },
      { id: "crs-2.5", type: "guidance", code: "Sec. 2.5", title: "Step 4: Is the Entity a Non-Reporting Financial Institution?", page: "Page 1110" },
      { id: "crs-2.6", type: "guidance", code: "Sec. 2.6", title: "Lending Non-Banking Financial Companies (NBFCs)", page: "Page 1111" },
      { id: "crs-2.7", type: "guidance", code: "Sec. 2.7", title: "Non-Bank Micro Finance Companies", page: "Page 1111" },
      { id: "crs-2.8", type: "guidance", code: "Sec. 2.8", title: "Fund Management NBFCs: Real Estate Investment Trusts (REITs) / Management Companies", page: "Page 1112" },
      { id: "crs-2.9", type: "guidance", code: "Sec. 2.9", title: "Custodial Institution: Central Depository Company (CDC)", page: "Page 1113" },
      { id: "crs-2.10", type: "guidance", code: "Sec. 2.10", title: "Custodial Institution: Execution-Only Broker", page: "Page 1113" },
      { id: "crs-2.11", type: "guidance", code: "Sec. 2.11", title: "Custodial institution: National Clearing Company of Pakistan Limited (NCCPL)", page: "Page 1114" },
      { id: "crs-2.12", type: "guidance", code: "Sec. 2.12", title: "Microfinance Banks (MFBs)", page: "Page 1114" },
      { id: "crs-2.13", type: "guidance", code: "Sec. 2.13", title: "Development Finance Institutions (DFIs)", page: "Page 1115" },
      { id: "crs-2.14", type: "guidance", code: "Sec. 2.14", title: "Exchange Companies (ECs)", page: "Page 1115" },
      { id: "crs-2.15", type: "guidance", code: "Sec. 2.15", title: "Trusts", page: "Page 1116" },
      { id: "crs-3.1", type: "guidance", code: "Sec. 3.1", title: "Introduction to Financial Accounts", page: "Page 1116" },
      { id: "crs-3.2", type: "guidance", code: "Sec. 3.2", title: "Depository Account", page: "Page 1117" },
      { id: "crs-3.3", type: "guidance", code: "Sec. 3.3", title: "Custodial Account", page: "Page 1117" },
      { id: "crs-3.4", type: "guidance", code: "Sec. 3.4", title: "Equity and Debt interests", page: "Page 1118" },
      { id: "crs-3.5", type: "guidance", code: "Sec. 3.5", title: "Cash Value Insurance Contracts", page: "Page 1118" },
      { id: "crs-3.6", type: "guidance", code: "Sec. 3.6", title: "Annuity Contract", page: "Page 1119" },
      { id: "crs-3.7", type: "guidance", code: "Sec. 3.7", title: "Excluded Accounts (Retirement, Escrow, Estate)", page: "Page 1120" },
      { id: "crs-4.1", type: "guidance", code: "Sec. 4.1", title: "Introduction to Reportable Accounts", page: "Page 1123" },
      { id: "crs-4.2", type: "guidance", code: "Sec. 4.2", title: "Reportable Accounts by virtue of Account Holder", page: "Page 1123" },
      { id: "crs-4.3", type: "guidance", code: "Sec. 4.3", title: "Reportable Accounts by virtue of Controlling Persons", page: "Page 1124" },
      { id: "crs-5.1", type: "guidance", code: "Sec. 5.1", title: "General Requirements (Due Diligence)", page: "Page 1126" },
      { id: "crs-5.2", type: "guidance", code: "Sec. 5.2", title: "AML/KYC Procedures", page: "Page 1126" },
      { id: "crs-5.5", type: "guidance", code: "Sec. 5.5", title: "Preexisting Lower Value Accounts & Residence Address Test", page: "Page 1128" },
      { id: "crs-5.6", type: "guidance", code: "Sec. 5.6", title: "Preexisting High Value Accounts & Relationship Manager Enquiry", page: "Page 1132" },
      { id: "crs-5.7", type: "guidance", code: "Sec. 5.7", title: "Due Diligence - Preexisting Entity Accounts & Passive NFEs", page: "Page 1136" },
      { id: "crs-5.8", type: "guidance", code: "Sec. 5.8", title: "Due Diligence - New Individual Accounts & Self-Certification", page: "Page 1140" },
      { id: "crs-6.1", type: "guidance", code: "Sec. 6.1", title: "Introduction to Information Reporting Schema & TIN Verification", page: "Page 1145" }
    ]
  },

  // 10. THE INLAND REVENUE REWARD RULES, 2021 & INLAND REVENUE WELFARE FUND RULES, 2016
  {
    id: "ir-welfare-rewards",
    title: "INLAND REVENUE REWARD & WELFARE FUND RULES",
    shortCode: "IR Reward & Welfare",
    actCategory: "Subordinate Rules",
    act_type: "Subordinate Rules",
    pageRange: "Pages 1155 - 1170",
    effectiveYear: "2021 / 2016 (Active)",
    description: "Statutory rules providing monetary rewards to tax whistleblowers and dedicated officers recovering concealed tax, alongside welfare relief funds for medical, scholarship, and bereavement support.",
    keyHighlights: [
      "Inland Revenue Reward Rules, 2021 (Page 1155): Whistleblower reward up to 20% of net recovered tax",
      "Inland Revenue Welfare Fund Rules, 2016 (Rules 1 - 11): Central and Regional Welfare Boards",
      "Statutory audits and non-lapsable treasury welfare allocations"
    ],
    items: [
      { id: "irr-2021", type: "rule", code: "Reward Rules", title: "The Inland Revenue Reward Rules, 2021", page: "Page 1155" },
      { id: "irw-1", type: "rule", code: "Rule 1", title: "Short title, extent and commencement", page: "Page 1165" },
      { id: "irw-2", type: "rule", code: "Rule 2", title: "Definitions", page: "Page 1165" },
      { id: "irw-3", type: "rule", code: "Rule 3", title: "Constitution of Central Inland Revenue Welfare Fund Board", page: "Page 1165" },
      { id: "irw-4", type: "rule", code: "Rule 4", title: "Formation of Regional Inland Revenue Welfare Fund Boards", page: "Page 1166" },
      { id: "irw-5", type: "rule", code: "Rule 5", title: "Functions of the Central Inland Revenue Welfare Fund Board", page: "Page 1166" },
      { id: "irw-6", type: "rule", code: "Rule 6", title: "Functions of the Regional Inland Revenue Welfare Fund Boards", page: "Page 1167" },
      { id: "irw-7", type: "rule", code: "Rule 7", title: "Income of the Central Inland Revenue Welfare Fund Board", page: "Page 1167" },
      { id: "irw-8", type: "rule", code: "Rule 8", title: "Income of the Regional Inland Revenue Welfare Fund Boards", page: "Page 1168" },
      { id: "irw-9", type: "rule", code: "Rule 9", title: "Expenditure from the Inland Revenue Welfare Fund Boards", page: "Page 1168" },
      { id: "irw-10", type: "rule", code: "Rule 10", title: "Expenditure with prior approval of Central Inland Revenue Welfare Fund Board", page: "Page 1168" },
      { id: "irw-11", type: "rule", code: "Rule 11", title: "Regulation of the Funds", page: "Page 1169" }
    ]
  },

  // 11. OTHER ACTS & RULES: CVT 2022, CIVIL SERVANTS ASSETS 2023, INCOME SUPPORT LEVY
  {
    id: "allied-acts-suite",
    title: "CAPITAL VALUE TAX & ALLIED ACTS",
    shortCode: "CVT & Allied Acts",
    actCategory: "Statute",
    act_type: "Statute",
    pageRange: "Pages 1171 - 1205",
    effectiveYear: "2022 / 2023 (Active)",
    description: "Comprehensive compilation of the Capital Value Tax 2022 on luxury vehicles and foreign assets, CVT Rules 2022, Sharing of Declaration of Assets of Civil Servants Rules 2023, and historical repealed levies.",
    keyHighlights: [
      "Capital Value Tax, 2022 (Page 1171): 1% levy on high-capacity motor vehicles and foreign wealth > PKR 100M",
      "Capital Value Tax Rules, 2022 (Page 1177): Collection procedures by motor registration authorities & IRIS e-filing",
      "Sharing of Declaration of Assets of Civil Servants Rules, 2023 (Page 1203): Mandatory data exchange with banks",
      "Income Support Levy Act/Rules, 2013 [Repealed] (Page 1201) & Historical CVT [Repealed] (Page 1181)"
    ],
    items: [
      { id: "cvt-2022", type: "section", code: "CVT 2022", title: "CAPITAL VALUE TAX, 2022", page: "Page 1171" },
      { id: "cvt-rules-2022", type: "rule", code: "CVT Rules 2022", title: "CAPITAL VALUE TAX RULES, 2022", page: "Page 1177" },
      { id: "cvt-repealed", type: "repealed", code: "Repealed CVT", title: "CAPITAL VALUE TAX & RULES [Repealed]", page: "Page 1181" },
      { id: "isl-repealed", type: "repealed", code: "Repealed ISL", title: "INCOME SUPPORT LEVY ACT/RULES, 2013 [Repealed]", page: "Page 1201" },
      { id: "cs-assets-2023", type: "rule", code: "Civil Servants Rules", title: "SHARING OF DECLARATION OF ASSETS OF CIVIL SERVANTS RULES, 2023", page: "Page 1203" }
    ]
  },

  // 12. APPELLATE TRIBUNAL INLAND REVENUE (FUNCTIONS) RULES, 2023
  {
    id: "atir-functions-2023",
    title: "APPELLATE TRIBUNAL INLAND REVENUE (FUNCTIONS) RULES, 2023",
    shortCode: "ATIR Functions 2023",
    actCategory: "Tribunal",
    act_type: "Tribunal",
    pageRange: "Pages 1207 - 1221",
    effectiveYear: "2023 (Active)",
    description: "Complete procedural machinery for filing, hearing, and deciding second appeals before the Appellate Tribunal Inland Revenue, regulating Division and Single Benches, 60-day limitation periods, stay applications, and additional evidence.",
    keyHighlights: [
      "Rules 8-15: Memorandum of appeal filing formats, index requirements, and concise grounds",
      "Rule 25-26: Rigorous statutory procedure for producing additional evidence before the Tribunal",
      "Rule 32-33: Miscellaneous stay applications heard by the same Bench",
      "Schedules I - IV & Forms A, B, C: Official prescribed appeal and reference templates"
    ],
    items: [
      { id: "atir-f-r1", type: "rule", code: "Rule 1", title: "Short title and commencement", page: "Page 1207" },
      { id: "atir-f-r2", type: "rule", code: "Rule 2", title: "Definitions", page: "Page 1207" },
      { id: "atir-f-r3", type: "rule", code: "Rule 3", title: "Constitution of Benches", page: "Page 1207" },
      { id: "atir-f-r4", type: "rule", code: "Rule 4", title: "Sittings of Benches", page: "Page 1208" },
      { id: "atir-f-r5", type: "rule", code: "Rule 5", title: "Powers of Chairperson and the Bench", page: "Page 1208" },
      { id: "atir-f-r6", type: "rule", code: "Rule 6", title: "Office hours and holidays", page: "Page 1208" },
      { id: "atir-f-r7", type: "rule", code: "Rule 7", title: "Language of the Tribunal", page: "Page 1208" },
      { id: "atir-f-r8", type: "rule", code: "Rule 8", title: "Procedure for filing appeals", page: "Page 1208" },
      { id: "atir-f-r9", type: "rule", code: "Rule 9", title: "Date of presentation and registration of appeals", page: "Page 1208" },
      { id: "atir-f-r10", type: "rule", code: "Rule 10", title: "Who may be joined as respondent", page: "Page 1208" },
      { id: "atir-f-r11", type: "rule", code: "Rule 11", title: "Contents of memorandum of appeal", page: "Page 1209" },
      { id: "atir-f-r12", type: "rule", code: "Rule 12", title: "Documents to accompany memorandum of appeal", page: "Page 1209" },
      { id: "atir-f-r13", type: "rule", code: "Rule 13", title: "Intimation of filing of appeal or application to the respondents", page: "Page 1209" },
      { id: "atir-f-r14", type: "rule", code: "Rule 14", title: "Filing of affidavit", page: "Page 1209" },
      { id: "atir-f-r15", type: "rule", code: "Rule 15", title: "Grounds which may be taken in appeal", page: "Page 1209" },
      { id: "atir-f-r16", type: "rule", code: "Rule 16", title: "Defective appeals etc.", page: "Page 1209" },
      { id: "atir-f-r17", type: "rule", code: "Rule 17", title: "Appellant to explain delay", page: "Page 1210" },
      { id: "atir-f-r18", type: "rule", code: "Rule 18", title: "Power of attorney etc., by authorized representative", page: "Page 1210" },
      { id: "atir-f-r19", type: "rule", code: "Rule 19", title: "Date and place of hearing of appeal and application", page: "Page 1210" },
      { id: "atir-f-r20", type: "rule", code: "Rule 20", title: "Preparation of cause list for hearing", page: "Page 1210" },
      { id: "atir-f-r21", type: "rule", code: "Rule 21", title: "Hearing & Disposal of appeal or application", page: "Page 1211" },
      { id: "atir-f-r22", type: "rule", code: "Rule 22", title: "Ex parte decision and recall of order", page: "Page 1211" },
      { id: "atir-f-r23", type: "rule", code: "Rule 23", title: "Continuation of proceedings after the death or insolvency of an aggrieved person", page: "Page 1211" },
      { id: "atir-f-r24", type: "rule", code: "Rule 24", title: "Respondent may support order on grounds decided against him", page: "Page 1211" },
      { id: "atir-f-r25", type: "rule", code: "Rule 25", title: "Production of additional evidence before the Tribunal", page: "Page 1211" },
      { id: "atir-f-r26", type: "rule", code: "Rule 26", title: "Mode of producing additional evidence", page: "Page 1212" },
      { id: "atir-f-r27", type: "rule", code: "Rule 27", title: "Adjournment of hearing", page: "Page 1212" },
      { id: "atir-f-r28", type: "rule", code: "Rule 28", title: "Remand of the case by the Tribunal", page: "Page 1212" },
      { id: "atir-f-r29", type: "rule", code: "Rule 29", title: "Order to be signed and dated", page: "Page 1212" },
      { id: "atir-f-r30", type: "rule", code: "Rule 30", title: "Proceedings not open to the public", page: "Page 1212" },
      { id: "atir-f-r31", type: "rule", code: "Rule 31", title: "Order to be communicated to the parties", page: "Page 1212" },
      { id: "atir-f-r32", type: "rule", code: "Rule 32", title: "Procedure for filing and disposal of miscellaneous application", page: "Page 1212" },
      { id: "atir-f-r33", type: "rule", code: "Rule 33", title: "Same Bench to hear the application", page: "Page 1212" },
      { id: "atir-f-r34", type: "rule", code: "Rule 34", title: "Copying and inspection charges", page: "Page 1212" },
      { id: "atir-f-r35", type: "rule", code: "Rule 35", title: "Reconciliation of copying and inspection charges", page: "Page 1213" },
      { id: "atir-f-r36", type: "rule", code: "Rule 36", title: "Arrangement of record", page: "Page 1213" },
      { id: "atir-f-r37", type: "rule", code: "Rule 37", title: "Preservation of record", page: "Page 1213" },
      { id: "atir-f-r38", type: "rule", code: "Rule 38", title: "Manner of destruction of record", page: "Page 1213" },
      { id: "atir-f-r39", type: "rule", code: "Rule 39", title: "When Part 'B' of the record to be destroyed", page: "Page 1214" },
      { id: "atir-f-r40", type: "rule", code: "Rule 40", title: "Fact of the destruction to be recorded", page: "Page 1214" },
      { id: "atir-f-r41", type: "rule", code: "Rule 41", title: "Classification, maintenance and preservation of registers", page: "Page 1214" },
      { id: "atir-f-r42", type: "rule", code: "Rule 42", title: "Preservation and destruction of returns and other papers", page: "Page 1214" },
      { id: "atir-f-r43", type: "rule", code: "Rule 43", title: "Seal and notice of the Tribunal", page: "Page 1215" },
      { id: "atir-f-r44", type: "rule", code: "Rule 44", title: "Protection of action taken in good faith", page: "Page 1215" },
      { id: "atir-f-r45", type: "rule", code: "Rule 45", title: "Computerization and automation", page: "Page 1215" },
      { id: "atir-f-r46", type: "rule", code: "Rule 46", title: "Repeal", page: "Page 1215" },
      { id: "atir-f-s1", type: "schedule", code: "Schedule-I", title: "Jurisdictional Allocation of ATIR Benches", page: "Page 1215" },
      { id: "atir-f-s2", type: "schedule", code: "Schedule-II", title: "Register Formats for Appeals & Applications", page: "Page 1216" },
      { id: "atir-f-s3", type: "schedule", code: "Schedule-III", title: "Fee Structure for Inspection & Certified Copies", page: "Page 1217" },
      { id: "atir-f-s4", type: "schedule", code: "Schedule-IV", title: "Classification of Tribunal Records for Preservation", page: "Page 1218" },
      { id: "atir-f-fa", type: "form", code: "FORM 'A'", title: "Memorandum of Appeal to the Appellate Tribunal", page: "Page 1219" },
      { id: "atir-f-fb", type: "form", code: "FORM-B", title: "Form of Miscellaneous Application for Stay of Demand", page: "Page 1220" },
      { id: "atir-f-fc", type: "form", code: "Form-C", title: "Certificate of Service of Notice", page: "Page 1221" }
    ]
  },

  // 13. INCOME TAX RULES, 2002 (COMPLETE CHAPTER I TO XIX & FIRST SCHEDULE)
  {
    id: "itr-2002-master",
    title: "INCOME TAX RULES, 2002 (MASTER STATUTORY RULEBOOK)",
    shortCode: "Income Tax Rules 2002",
    actCategory: "Subordinate Rules",
    act_type: "Subordinate Rules",
    pageRange: "Chapters I - XIX (Complete)",
    effectiveYear: "2002 (Amended up to 2026)",
    description: "The primary subordinate legislation issued by the Federal Board of Revenue containing detailed procedural rules for salary valuation, depreciation, capital gains under 37A, books of account, SWAPS integration, point-of-sale licensing, appeals, CITRO refunds, and prescribed statutory return forms.",
    keyHighlights: [
      "Chapter II: Valuation of Salary Perquisites (Accommodation, Conveyance 5%/10%, Medical)",
      "Chapter VII & VIIA: Prescribed Books of Account & Point of Sale (POS) Online Integration Licensing",
      "Chapter IX: WHT Exemption Certificates under Sec 159 & SWAPS Rules (Rules 46-53)",
      "Chapter XII: Electronic CIR(A) Appeals, Stay Applications & ATIR / High Court Reference Forms",
      "Chapter XVIIB: Centralized Income Tax Refund Office (CITRO) Automated Sanctions",
      "First Schedule: Prescribed Statutory Notices (Sec 122, Sec 140, Sec 145, Sec 159)"
    ],
    items: [
      { id: "itr-r1", type: "rule", code: "Rule 1", title: "Short title and commencement", summary: "Title and operational commencement." },
      { id: "itr-r2", type: "rule", code: "Rule 2", title: "Definitions", summary: "Prescribed tax terms and concepts." },
      { id: "itr-r3", type: "rule", code: "Rule 3", title: "Valuation of perquisites, allowances benefits", summary: "Salary valuation methodology." },
      { id: "itr-r4", type: "rule", code: "Rule 4", title: "Valuation of accommodation", summary: "45% of minimum time scale or rental value addition." },
      { id: "itr-r5", type: "rule", code: "Rule 5", title: "Valuation of conveyance", summary: "5% for mixed use or 10% for personal use of motor vehicles." },
      { id: "itr-r10", type: "rule", code: "Rule 10", title: "Entertainment expenditure", summary: "Ceiling and conditions for business entertainment deductions." },
      { id: "itr-r11", type: "rule", code: "Rule 11", title: "Agricultural produce as raw materials", summary: "Market price deductions for raw agricultural produce." },
      { id: "itr-r12", type: "rule", code: "Rule 12", title: "Particulars required to be furnished for claiming depreciation deduction or initial allowance amortisation deduction" },
      { id: "itr-r12a", type: "rule", code: "Rule 12A", title: "Decommissioning certificate" },
      { id: "itr-r13", type: "rule", code: "Rule 13", title: "Apportionment of expenditures, deductions and allowances" },
      { id: "itr-r13a", type: "rule", code: "Rule 13A", title: "Acquisition of Securities" },
      { id: "itr-r13b", type: "rule", code: "Rule 13B", title: "Disposal of securities" },
      { id: "itr-r13c", type: "rule", code: "Rule 13C", title: "Holding period" },
      { id: "itr-r13d", type: "rule", code: "Rule 13D", title: "Computation of capital gain or loss" },
      { id: "itr-r13e", type: "rule", code: "Rule 13E", title: "Computation of capital gain or loss on derivatives" },
      { id: "itr-r13f", type: "rule", code: "Rule 13F", title: "Capital loss adjustment disallowed in certain cases" },
      { id: "itr-r13g", type: "rule", code: "Rule 13G", title: "Exemption from tax on capital gain" },
      { id: "itr-r13h", type: "rule", code: "Rule 13H", title: "Payment of tax on capital gain" },
      { id: "itr-r13i", type: "rule", code: "Rule 13I", title: "Maintenance of records" },
      { id: "itr-r13j", type: "rule", code: "Rule 13J", title: "Liability of broker" },
      { id: "itr-r13k", type: "rule", code: "Rule 13K", title: "Violations and penalties" },
      { id: "itr-r13l", type: "rule", code: "Rule 13L", title: "Definitions" },
      { id: "itr-r13m", type: "rule", code: "Rule 13M", title: "Quarterly statements" },
      { id: "itr-r13n", type: "rule", code: "Rule 13N", title: "Special procedures for computation of capital gains and collection of tax" },
      { id: "itr-r13o", type: "rule", code: "Rule 13O", title: "Statements and forms" },
      { id: "itr-r13p", type: "rule", code: "Rule 13P", title: "Clarifications and explanations" },
      { id: "itr-r13q", type: "rule", code: "Rule 13Q", title: "Application" },
      { id: "itr-r13r", type: "rule", code: "Rule 13R", title: "Definitions" },
      { id: "itr-r13s", type: "rule", code: "Rule 13S", title: "Advance tax on builders and developers" },
      { id: "itr-r27a", type: "rule", code: "Rule 27A", title: "Application of this chapter (CbC Reporting)" },
      { id: "itr-r27b", type: "rule", code: "Rule 27B", title: "Country-by-Country Reporting Requirements (Rules 27B–27J)" },
      { id: "itr-r27k", type: "rule", code: "Rule 27K", title: "Master File and Local File Documentation Requirements (Rules 27K–27Q)" },
      { id: "itr-r28", type: "rule", code: "Rule 28", title: "Application of Chapter" },
      { id: "itr-r29", type: "rule", code: "Rule 29", title: "Books of account, documents and records to be maintained" },
      { id: "itr-r30", type: "rule", code: "Rule 30", title: "Books of account, documents and records for business/professional taxpayers" },
      { id: "itr-r30a", type: "rule", code: "Rule 30A", title: "Electronic tax register" },
      { id: "itr-r31", type: "rule", code: "Rule 31", title: "Minimum documents for taxpayers deriving income from salary, property, capital gains, or other sources" },
      { id: "itr-r32", type: "rule", code: "Rule 32", title: "General form of books of accounts, documents and records" },
      { id: "itr-r33", type: "rule", code: "Rule 33", title: "Books of account, documents and records to be kept at the specified place" },
      { id: "itr-r33a", type: "rule", code: "Rule 33A", title: "Application of Chapter VIIA (Point of Sales Online Integration)" },
      { id: "itr-r33b", type: "rule", code: "Rule 33B", title: "Obligations and requirements" },
      { id: "itr-r33c", type: "rule", code: "Rule 33C", title: "Licence of points of sales (POS) systems" },
      { id: "itr-r33d", type: "rule", code: "Rule 33D", title: "Record, access and examination" },
      { id: "itr-r33e", type: "rule", code: "Rule 33E", title: "Online integration during intervening period" },
      { id: "itr-r33f", type: "rule", code: "Rule 33F", title: "Consequences of non-compliance or contravention" },
      { id: "itr-r33g", type: "rule", code: "Rule 33G", title: "Reporting of failure to transfer sale or bill data to the Board" },
      { id: "itr-r33h", type: "rule", code: "Rule 33H", title: "Licensing of POS Integrator" },
      { id: "itr-r33i", type: "rule", code: "Rule 33I", title: "Functions of the Licensing Committee" },
      { id: "itr-r33j", type: "rule", code: "Rule 33J", title: "Application for Grant of License" },
      { id: "itr-r33k", type: "rule", code: "Rule 33K", title: "Procedure for Grant of License" },
      { id: "itr-r33l", type: "rule", code: "Rule 33L", title: "Rights Granted to the Licensee" },
      { id: "itr-r33m", type: "rule", code: "Rule 33M", title: "Renewal of license" },
      { id: "itr-r33n", type: "rule", code: "Rule 33N", title: "Technical support" },
      { id: "itr-r33o", type: "rule", code: "Rule 33O", title: "Responsibilities of the Member Digital Initiatives" },
      { id: "itr-r33p", type: "rule", code: "Rule 33P", title: "Procedure for suspension, cancellation or termination of license" },
      { id: "itr-r33q", type: "rule", code: "Rule 33Q", title: "Audit of the License Integrator" },
      { id: "itr-r33r", type: "rule", code: "Rule 33R", title: "Fee and Charges" },
      { id: "itr-r33s", type: "rule", code: "Rule 33S", title: "Responsibilities of the Integrated Enterprises" },
      { id: "itr-r33t", type: "rule", code: "Rule 33T", title: "Functions of Commissioner Inland Revenue" },
      { id: "itr-r34", type: "rule", code: "Rule 34", title: "Return of income" },
      { id: "itr-r34a", type: "rule", code: "Rule 34A", title: "Time limit for notifying income tax return form" },
      { id: "itr-r34b", type: "rule", code: "Rule 34B", title: "Taxpayer's profile" },
      { id: "itr-r36", type: "rule", code: "Rule 36", title: "Wealth statement" },
      { id: "itr-r36a", type: "rule", code: "Rule 36A", title: "Foreign income and assets statement" },
      { id: "itr-r37", type: "rule", code: "Rule 37", title: "Return to be furnished by a non-resident ship_owner or charterer" },
      { id: "itr-r38", type: "rule", code: "Rule 38", title: "Return to be furnished by a non-resident aircraft owner or charterer" },
      { id: "itr-r38a", type: "rule", code: "Rule 38A", title: "Statement to be furnished by Online Marketplace" },
      { id: "itr-r39a", type: "rule", code: "Rule 39A", title: "Banking Companies Reporting Requirements - Definitions" },
      { id: "itr-r39b", type: "rule", code: "Rule 39B", title: "Furnishing of information by Banking Companies" },
      { id: "itr-r40", type: "rule", code: "Rule 40", title: "Exemption or lower rate certificate u/s 159" },
      { id: "itr-r40a", type: "rule", code: "Rule 40A", title: "Imported Goods - Committee & Reclassification (Rules 40A-40F)" },
      { id: "itr-r40fa", type: "rule", code: "Rule 40FA", title: "Exemption or lower rate certificate under sections 152 and 159 to non-resident persons or permanent establishment" },
      { id: "itr-r42", type: "rule", code: "Rule 42", title: "Certificate of collection or deduction of tax" },
      { id: "itr-r43", type: "rule", code: "Rule 43", title: "Payment of tax collected or deducted" },
      { id: "itr-r43a", type: "rule", code: "Rule 43A", title: "Advance tax on air tickets" },
      { id: "itr-r44", type: "rule", code: "Rule 44", title: "Statement of tax collected or deducted" },
      { id: "itr-r45", type: "rule", code: "Rule 45", title: "Statement of tax deducted under the Sixth Schedule" },
      { id: "itr-r46", type: "rule", code: "Rule 46", title: "SWAPS Rules - Applicability & Definitions (Rules 46-53)" },
      { id: "itr-r67", type: "rule", code: "Rule 67", title: "Prescribed Forms (Rules 67-72)" },
      { id: "itr-r73", type: "rule", code: "Rule 73", title: "Furnishing & electronic service of documents (Rules 73-75)" },
      { id: "itr-r76", type: "rule", code: "Rule 76", title: "Appeal to CIR(Appeals) on web portal & Stay Applications (Rules 76-76O)" },
      { id: "itr-r77", type: "rule", code: "Rule 77", title: "Prescribed form for appeal to the Appellate Tribunal" },
      { id: "itr-r78", type: "rule", code: "Rule 78", title: "Prescribed Form for reference to High Court" },
      { id: "itr-r78a", type: "rule", code: "Rule 78A", title: "Common Reporting Standard (Rules 78A-78O)" },
      { id: "itr-r79", type: "rule", code: "Rule 79", title: "National Tax Number Card, E-Enrolment & Active Taxpayers List (Rules 79-83)" },
      { id: "itr-r83a", type: "rule", code: "Rule 83A", title: "Record of Beneficial Owners (Rules 83A-83E)" },
      { id: "itr-r84", type: "rule", code: "Rule 84", title: "Registration of Income Tax Practitioners (ITP) (Rules 84-90)" },
      { id: "itr-r91", type: "rule", code: "Rule 91", title: "Recognised Provident, Superannuation & Gratuity Funds (Rules 91-121)" },
      { id: "itr-r122", type: "rule", code: "Rule 122", title: "Income Tax Recovery Rules (Movable & Immovable Property) (Rules 122-210)" },
      { id: "itr-r210a", type: "rule", code: "Rule 210A", title: "Recovery of tax from persons holding money on behalf of taxpayer (Rules 210A-210I)" },
      { id: "itr-r210ia", type: "rule", code: "Rule 210IA", title: "Centralized Income Tax Refund Office (CITRO) Sanction & Payment (Rules 210IA-210IC)" },
      { id: "itr-r211", type: "rule", code: "Rule 211", title: "Non-Profit Organisations Approval (Rules 211-220B)" },
      { id: "itr-r220c", type: "rule", code: "Rule 220C", title: "Greenfield Industrial Undertaking Approval (Rules 220C-220H)" },
      { id: "itr-r221", type: "rule", code: "Rule 221", title: "Tax Clearance Certificate under section 145" },
      { id: "itr-r224", type: "rule", code: "Rule 224", title: "Miscellaneous (Valuers, Export Profits, Advance Ruling, ADR, E-Audit, Shariah Companies) (Rules 224-232)" },
      { id: "itr-sched-p1", type: "form", code: "Part-I", title: "Application for foreign tax Credit & Notice Letter u/s 122" },
      { id: "itr-sched-p2", type: "form", code: "Part-II", title: "Notice under section 140(1) of the Income Tax Ordinance, 2001" },
      { id: "itr-sched-p3", type: "form", code: "Part-III", title: "Notice u/s 140 read with Rule 69: Recovery of Tax" },
      { id: "itr-sched-p4", type: "form", code: "Part-IV", title: "Notice u/s 145 & Rule 70: Taxpayer leaving Pakistan permanently" },
      { id: "itr-sched-p5", type: "form", code: "Part-V", title: "Section 170 Refund Application (See Rule 71)" },
      { id: "itr-sched-p6", type: "form", code: "Part-VI", title: "Application for Certificate of Exemption from deduction of tax u/s 159" },
      { id: "itr-sched-p7", type: "form", code: "Part-VII", title: "Application for Certificate of Exemption under Section 159" },
      { id: "itr-sched-p7a", type: "form", code: "Part-VII(a)", title: "Application for Certificate of Exemption under Section 159" }
    ]
  }
];
