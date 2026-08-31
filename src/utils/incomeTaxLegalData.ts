import { TaxSectionItem } from '../types';

export const INCOME_TAX_SECTIONS_DATA: TaxSectionItem[] = [
  // =========================================================================
  // CHAPTER X: PROCEDURE - PART II: ASSESSMENTS (SECTIONS 114 - 126)
  // =========================================================================
  {
    id: 'ito-sec-114',
    act_type: 'Income Tax Ordinance, 2001',
    chapter: 'Chapter X: Procedure',
    part_division: 'Part II: Assessments',
    section_code: 'Section 114',
    title: 'Return of Income & Mandatory Filing Thresholds',
    description: 'Every company, every person whose taxable income exceeds the maximum amount not chargeable to tax, non-profit organizations, individuals owning immovable property with land area of 500 sq yards or flat, motor vehicle 1000cc+, or holding commercial electricity connection above threshold shall furnish a return of income for the tax year.',
    sub_sections: [
      '114(1): Mandatory classes of persons required to file annual tax returns.',
      '114(2): Mandatory electronic filing via IRIS portal along with wealth statement under Section 116.',
      '114(3): Due dates: 30th September for salaried & non-corporate taxpayers; 31st December for companies.',
      '114(4): Power of Commissioner to issue notice requiring return of income for any of the last 5 completed tax years (or up to 10 years for offshore assets).',
      '114(6): Revision of return of income subject to conditions, revised wealth statement, and Commissioner approval / automatic system validation.'
    ],
    statutory_rates_or_penalties: 'Penalty under Section 182(1) Entry 1: 0.1% of tax payable per day of default (Min PKR 1,000, Max 50% of tax).',
    practical_notes: 'Filing after statutory due date results in exclusion from Active Taxpayers List (ATL) under Section 182A and imposition of Tenth Schedule 100% higher withholding rates unless ATL surcharge is deposited.',
    cross_references: ['Section 116 (Wealth Statement)', 'Section 120 (Deemed Assessment)', 'Section 182A (ATL Status)', 'Tenth Schedule'],
    fbr_precedents_and_circulars: 'Circular No. 01 of 2024 (IRIS filing procedures and automated ATL updates).'
  },
  {
    id: 'ito-sec-116',
    act_type: 'Income Tax Ordinance, 2001',
    chapter: 'Chapter X: Procedure',
    part_division: 'Part II: Assessments',
    section_code: 'Section 116',
    title: 'Wealth Statement & Reconciliation of Net Wealth',
    description: 'Every resident individual filing a return of income shall furnish a wealth statement in the prescribed form showing total assets and liabilities of the person, his spouse, and minor children, along with a wealth reconciliation statement explaining inflows, outflows, and net wealth changes.',
    sub_sections: [
      '116(1): Obligation to furnish wealth statement along with return of income.',
      '116(2): Commissioner power to issue notice requiring wealth statement from any person.',
      '116(2A): Mandatory foreign income and assets statement under Section 116A for resident individuals owning foreign assets with value $10,000+ or foreign income $10,000+.',
      '116(3): Revision of wealth statement before assessment amendment under Section 122.',
      '116(4): Wealth reconciliation explaining difference between current year net wealth and previous year declared wealth plus income minus personal expenses.'
    ],
    statutory_rates_or_penalties: 'Penalty under Section 182: PKR 20,000 for failure to file wealth statement.',
    practical_notes: 'Unexplained differences in wealth reconciliation are treated as concealed income under Section 111(1)(b) and added to taxable income under Section 122.',
    cross_references: ['Section 111 (Unexplained Income/Assets)', 'Section 116A (Foreign Assets)', 'Section 122 (Amendment)'],
    fbr_precedents_and_circulars: '2021 PTD 1620 (High Court ruling on evidentiary burden in wealth reconciliation discrepancies).'
  },
  {
    id: 'ito-sec-116a',
    act_type: 'Income Tax Ordinance, 2001',
    chapter: 'Chapter X: Procedure',
    part_division: 'Part II: Assessments',
    section_code: 'Section 116A',
    title: 'Foreign Income and Assets Statement',
    description: 'Every resident individual having foreign income of not less than ten thousand United States dollars or having foreign assets with a value of not less than one hundred thousand United States dollars shall furnish a statement of foreign income and assets.',
    sub_sections: [
      '116A(1): Mandatory declaration of foreign bank accounts, offshore immovable property, and foreign securities.',
      '116A(2): Commissioner power to issue notice requiring statement for any of the last ten completed tax years.',
      '116A(3): Comprehensive disclosure of foreign trust beneficiary interests and offshore holdings.'
    ],
    statutory_rates_or_penalties: 'Penalty under Section 182: 2% of the value of foreign assets per year; Section 192B prosecution for offshore concealment.',
    practical_notes: 'FBR automatically cross-checks foreign holdings via OECD Common Reporting Standard (CRS) automatic exchange of banking information.',
    cross_references: ['Section 192B (Offshore Concealment)', 'Section 111(1) Proviso', 'OECD CRS Rules'],
    fbr_precedents_and_circulars: 'FBR Directorate General of International Taxes Circular 04 of 2023 on CRS automatic data integration.'
  },
  {
    id: 'ito-sec-120',
    act_type: 'Income Tax Ordinance, 2001',
    chapter: 'Chapter X: Procedure',
    part_division: 'Part II: Assessments',
    section_code: 'Section 120',
    title: 'Deemed Assessment on Complete Return Filing',
    description: 'Where a taxpayer has furnished a complete return of income, the Commissioner shall be treated to have made an assessment of taxable income and tax payable as declared by the taxpayer, and the return shall be treated as an assessment order issued on the day the return was furnished.',
    sub_sections: [
      '120(1): Automatic deemed assessment status upon submission of complete return on IRIS portal.',
      '120(2A): Automated system adjustments: Iris computer algorithm may adjust arithmetic errors, incorrect claims, or apparent deductions after 14-day notice.',
      '120(3): Incomplete returns: Notice of deficiency issued; failure to cure within specified time invalidates deemed assessment.'
    ],
    statutory_rates_or_penalties: 'Self-assessment scheme: Return equals assessment order under the law.',
    practical_notes: 'Deemed assessment under Section 120 is the default status of all validly filed returns until and unless formally amended under Section 122 within the 5-year limitation period.',
    cross_references: ['Section 114', 'Section 122 (Amendment of Assessment)', 'Section 177 (Audit)'],
    fbr_precedents_and_circulars: '2019 SCMR 450 (Supreme Court: Deemed assessment cannot be reopened without definite information under Section 122(5)).'
  },
  {
    id: 'ito-sec-121',
    act_type: 'Income Tax Ordinance, 2001',
    chapter: 'Chapter X: Procedure',
    part_division: 'Part II: Assessments',
    section_code: 'Section 121',
    title: 'Best Judgement Assessment for Non-Compliance',
    description: 'Where a person fails to furnish a return of income under Section 114(3) or Section 114(4), or fails to furnish wealth statement under Section 116, or fails to produce accounts, documents and records under Section 177, the Commissioner may make a best judgment assessment based on available evidence, sector benchmarks, and external intelligence.',
    sub_sections: [
      '121(1): Grounds for best judgement: Non-filing, non-compliance with statutory notice, failure of books.',
      '121(2): Mandatory issuance of Show Cause Notice specifying basis of estimated income.',
      '121(3): Limitation period: Best judgment assessment can be made within 5 years from end of the financial year in which notice was issued.',
      '121(4): Right of appeal under Section 127 remains preserved against best judgment orders.'
    ],
    statutory_rates_or_penalties: 'Ex-parte assessment with immediate demand notice issued under Section 137.',
    practical_notes: 'Best judgement cannot be arbitrary, vindictive, or capricious. High Courts have consistently held that the assessing officer must maintain an honest estimation supported by empirical sector data.',
    cross_references: ['Section 114', 'Section 137', 'Section 127', '2022 PTD 890'],
    fbr_precedents_and_circulars: '2022 PTD 890 (Lahore High Court: Best judgment must adhere to principles of natural justice and verifiable turnover indicators).'
  },
  {
    id: 'ito-sec-122',
    act_type: 'Income Tax Ordinance, 2001',
    chapter: 'Chapter X: Procedure',
    part_division: 'Part II: Assessments',
    section_code: 'Section 122',
    title: 'Amendment of Assessments & Definite Information',
    description: 'The Commissioner may amend an assessment order made under Section 120 or Section 121 by making such alterations or additions as may be necessary where taxable income was under-assessed, tax was assessed at too low a rate, or excessive relief/refund was miscalculated.',
    sub_sections: [
      '122(1): Power to amend assessment order as often as may be necessary.',
      '122(2): Five-year limitation period from the end of financial year in which original assessment was treated as made.',
      '122(5): Mandatory condition precedent: Amendment requires audit under Section 177 or "definite information" acquired from an audit or otherwise.',
      '122(5A): Suo motu revision of assessment erroneous and prejudicial to the interest of revenue.',
      '122(9): Mandatory Show Cause Notice specifying reasons for proposed amendment and reasonable opportunity of being heard.'
    ],
    statutory_rates_or_penalties: 'Tax short-assessed recovered along with default surcharge under Section 205 and penalties under Section 182.',
    practical_notes: 'Section 122 is the backbone of FBR audit additions. Crucial defense ground: Challenge jurisdiction if notice lacks specific "definite information" or if 5-year limitation has expired.',
    cross_references: ['Section 120', 'Section 177', 'Section 205', 'Section 122A', 'Section 122D'],
    fbr_precedents_and_circulars: '2023 SCMR 1210 (Supreme Court: Reopening deemed assessment requires tangible material, not mere change of opinion).'
  },
  {
    id: 'ito-sec-122a',
    act_type: 'Income Tax Ordinance, 2001',
    chapter: 'Chapter X: Procedure',
    part_division: 'Part II: Assessments',
    section_code: 'Section 122A',
    title: 'Revision of Orders by Commissioner',
    description: 'The Commissioner may on his own motion call for and examine the record of any proceeding under this Ordinance, and make such inquiry and pass such order as he may think fit, modifying, annulling or setting aside any order passed by an officer subordinate to him.',
    sub_sections: [
      '122A(1): Suo motu administrative revision power of the Commissioner.',
      '122A(2): Restriction: No order prejudicial to the taxpayer shall be passed without affording opportunity of hearing.',
      '122A(3): Limitation: Order cannot be revised after expiry of 5 years from date of original order.'
    ],
    statutory_rates_or_penalties: 'Corrective statutory mechanism for administrative error rectification.',
    practical_notes: 'Taxpayers can petition the Commissioner under Section 122A for relief against erroneous adverse orders where appeal timelines were inadvertently missed.',
    cross_references: ['Section 122', 'Section 129', 'Section 218'],
    fbr_precedents_and_circulars: '2020 PTD 450 (ATIR: Section 122A cannot be used to circumvent appellate forum jurisdiction).'
  },
  {
    id: 'ito-sec-122c',
    act_type: 'Income Tax Ordinance, 2001',
    chapter: 'Chapter X: Procedure',
    part_division: 'Part II: Assessments',
    section_code: 'Section 122C',
    title: 'Provisional Assessment for Non-Filers',
    description: 'Where in response to a notice under Section 114(3) or (4), a person fails to furnish return of income, the Commissioner may make a provisional assessment of taxable income and tax due based on available data, utility bills, banking transactions, or past declarations.',
    sub_sections: [
      '122C(1): Provisional assessment framed automatically through computerized system or assessing officer.',
      '122C(2): Finality rule: Provisional assessment becomes final assessment after 45 days unless taxpayer files complete return with wealth statement within 45 days.'
    ],
    statutory_rates_or_penalties: 'Becomes binding final assessment order if return is not filed within 45 days.',
    practical_notes: 'Immediate action required upon receiving Section 122C notice: File return and wealth statement on IRIS within 45 days to automatically vacate the provisional order.',
    cross_references: ['Section 114', 'Section 116', 'Section 137'],
    fbr_precedents_and_circulars: 'FBR Circular 03 of 2022 on automated Section 122C batch assessments for non-filers.'
  },
  {
    id: 'ito-sec-122d',
    act_type: 'Income Tax Ordinance, 2001',
    chapter: 'Chapter X: Procedure',
    part_division: 'Part II: Assessments',
    section_code: 'Section 122D',
    title: 'Agreed Assessment Mechanism',
    description: 'Where a taxpayer, in response to an audit notice or amendment notice under Section 122, intends to settle tax liability amicably, he may file an application to the Assessment Oversight Committee (AOC) for an agreed settlement of tax affairs.',
    sub_sections: [
      '122D(1): Application for agreed assessment before final amendment order is passed.',
      '122D(2): Constitution of Assessment Oversight Committee comprising Chief Commissioner, Commissioner, and senior officer.',
      '122D(5): Agreed order passed by Committee is final and non-appealable by both taxpayer and department.'
    ],
    statutory_rates_or_penalties: 'Waiver of criminal prosecution under Section 191/192 upon deposit of agreed tax.',
    practical_notes: 'Allows taxpayers to avoid prolonged litigation by agreeing on adjusted turnover with reduced penalties and structured installment schedules.',
    cross_references: ['Section 122', 'Section 134A (ADRC)', 'Section 182'],
    fbr_precedents_and_circulars: 'Assessment Oversight Committee Rules 2021.'
  },
  {
    id: 'ito-sec-124',
    act_type: 'Income Tax Ordinance, 2001',
    chapter: 'Chapter X: Procedure',
    part_division: 'Part II: Assessments',
    section_code: 'Section 124',
    title: 'Assessment Giving Effect to Appellate Orders',
    description: 'Where an assessment order has been modified, set aside, or remanded back by Commissioner Appeals, Appellate Tribunal, High Court, or Supreme Court, the Commissioner shall pass a modified assessment order giving effect to the appellate directions within one year.',
    sub_sections: [
      '124(1): Mandatory timeline: 1 year from the end of financial year in which appellate order was served.',
      '124(2): Consequences of limitation lapse: If modified order is not passed within 1 year, the taxpayer\'s original declared return stands accepted by operation of law.',
      '124(4): Assessment in relation to disputed property or deceased person representatives under Sections 125 & 126.'
    ],
    statutory_rates_or_penalties: 'Statutory abatement of departmental claim if 1-year time limit is violated.',
    practical_notes: 'A powerful defense in remands: Check the exact service date of ATIR/High Court order. If FBR fails to pass Section 124 order within 1 year, the entire tax demand lapses.',
    cross_references: ['Section 129', 'Section 132', 'Section 133', '2020 SCMR 1890'],
    fbr_precedents_and_circulars: '2020 SCMR 1890 (Supreme Court on strict enforcement of Section 124 limitation period).'
  },

  // =========================================================================
  // CHAPTER X: PART III: APPEALS & DISPUTE RESOLUTION (SECTIONS 126A - 136)
  // =========================================================================
  {
    id: 'ito-sec-127',
    act_type: 'Income Tax Ordinance, 2001',
    chapter: 'Chapter X: Procedure',
    part_division: 'Part III: Appeals & Dispute Resolution',
    section_code: 'Section 127',
    title: 'Appeal to the Commissioner (Appeals)',
    description: 'Any person dissatisfied with an order of assessment passed under Section 121, 122, 143, 161, 170, 172, 182, or 205 may appeal to the Commissioner (Appeals) within thirty days of service of notice of demand.',
    sub_sections: [
      '127(1): Right of first appeal against assessment, penalty, withholding default, and refund rejection orders.',
      '127(2): Appeal limitation: 30 days for general orders (or 60 days for banking/insurance companies).',
      '127(4): Mandatory pre-condition: Electronic filing on IRIS portal along with appeal fee and proof of payment of admitted tax liability.',
      '127(5): Condonation of delay upon showing reasonable cause under Section 127(5).'
    ],
    statutory_rates_or_penalties: 'Appeal fee: PKR 1,000 for non-corporate; PKR 5,000 for companies.',
    practical_notes: 'Admitted tax declared in return must be paid before filing appeal. Recovery of disputed tax is not automatically stayed unless stay is granted under Section 128(1AA) or High Court writ.',
    cross_references: ['Section 128 (Procedure)', 'Section 129 (Decision)', 'Section 138 (Recovery Stay)'],
    fbr_precedents_and_circulars: 'FBR e-Appeals Rules 2021 (Mandatory electronic memo of appeal and grounds).'
  },
  {
    id: 'ito-sec-128',
    act_type: 'Income Tax Ordinance, 2001',
    chapter: 'Chapter X: Procedure',
    part_division: 'Part III: Appeals & Dispute Resolution',
    section_code: 'Section 128',
    title: 'Procedure in Appeal & Power to Grant Stay',
    description: 'The Commissioner (Appeals) shall fix a day and place for hearing of the appeal and may allow the appellant to argue new grounds not specified in the grounds of appeal if omission was not willful.',
    sub_sections: [
      '128(1): Hearing notice to appellant and assessing officer.',
      '128(1AA): Stay of recovery: Commissioner (Appeals) can grant stay against recovery of disputed tax for a cumulative period up to thirty days.',
      '128(2): Power to call for remand reports, books of accounts, or direct fresh inquiry under Section 128(2).'
    ],
    statutory_rates_or_penalties: 'Statutory stay mechanism against coercive bank attachment under Section 140.',
    practical_notes: 'File stay application simultaneously with memo of appeal to prevent recovery notices from field officers during appeal pendency.',
    cross_references: ['Section 127', 'Section 140 (Bank Attachment)', 'Section 129'],
    fbr_precedents_and_circulars: '2023 PTD 1100 (Sindh High Court guidelines on stay of demand pending appeal).'
  },
  {
    id: 'ito-sec-129',
    act_type: 'Income Tax Ordinance, 2001',
    chapter: 'Chapter X: Procedure',
    part_division: 'Part III: Appeals & Dispute Resolution',
    section_code: 'Section 129',
    title: 'Decision in Appeal & Powers of CIR (Appeals)',
    description: 'In disposing of an appeal, the Commissioner (Appeals) may confirm, reduce, enhance or annul the assessment order, or set aside the assessment and remand back to the assessing officer for fresh determination with specific directions.',
    sub_sections: [
      '129(1): Core appellate powers: Confirm, modify, annul, or set aside.',
      '129(2): Enhancement warning: No enhancement of assessment or penalty shall be made without issuing Show Cause Notice.',
      '129(4): Statutory time limit: Appeal must be decided within 120 days of filing (extendable by 60 days for reasons recorded in writing).'
    ],
    statutory_rates_or_penalties: 'Binding quasi-judicial determination enforceable across Inland Revenue field offices.',
    practical_notes: 'If the appeal is not decided within statutory limitation, taxpayer can apply for transfer or approach High Court under Article 199 for expeditious disposal.',
    cross_references: ['Section 124 (Giving Effect)', 'Section 131 (Tribunal Appeal)'],
    fbr_precedents_and_circulars: '2022 SCMR 1560 (Supreme Court on quasi-judicial independence of appellate commissioners).'
  },
  {
    id: 'ito-sec-130',
    act_type: 'Income Tax Ordinance, 2001',
    chapter: 'Chapter X: Procedure',
    part_division: 'Part III: Appeals & Dispute Resolution',
    section_code: 'Section 130',
    title: 'Appellate Tribunal Inland Revenue (ATIR)',
    description: 'The Federal Government shall establish an Appellate Tribunal Inland Revenue consisting of a Chairman and Judicial Members (District Judges / Advocates High Court) and Accountant Members (Officers of Inland Revenue / Chartered Accountants) to exercise appellate jurisdiction.',
    sub_sections: [
      '130(1): Constitution of independent second appellate judicial tribunal.',
      '130(3): Qualification of Judicial and Accountant Members.',
      '130(8): Power of Chairman to constitute Benches (Single, Division, Full Bench).'
    ],
    statutory_rates_or_penalties: 'Final fact-finding authority under Pakistani tax jurisprudence.',
    practical_notes: 'ATIR is the final court of fact. Findings of fact recorded by ATIR cannot be challenged before the High Court under Section 133 unless a substantial question of law arises.',
    cross_references: ['Section 131', 'Section 132', 'Section 133 (High Court Reference)'],
    fbr_precedents_and_circulars: 'ATIR Rules 2010 (Practice & Procedure in tax appeals).'
  },
  {
    id: 'ito-sec-131',
    act_type: 'Income Tax Ordinance, 2001',
    chapter: 'Chapter X: Procedure',
    part_division: 'Part III: Appeals & Dispute Resolution',
    section_code: 'Section 131',
    title: 'Appeal to the Appellate Tribunal & 60-Day Stay',
    description: 'The taxpayer or Commissioner may appeal to the Appellate Tribunal against an order passed by the Commissioner (Appeals) within sixty days of service of the order.',
    sub_sections: [
      '131(1): Right of second appeal by both taxpayer and Revenue department.',
      '131(2): Limitation: 60 days from date of communication of CIR (Appeals) order.',
      '131(3): Prescribed fee: PKR 2,000 for individuals; PKR 5,000 for companies.',
      '131(5): Power to grant stay against recovery of tax for a period not exceeding 180 days in aggregate.'
    ],
    statutory_rates_or_penalties: 'Tribunal stay protects against all recovery actions under Chapter X Part IV.',
    practical_notes: 'Stay granted by ATIR automatically lapses after 180 days; taxpayers needing further protection must seek High Court constitutional stay or speedy hearing.',
    cross_references: ['Section 130', 'Section 132', 'Section 133', '2021 PTD 500'],
    fbr_precedents_and_circulars: '2021 PTD 500 (Supreme Court ruling on 180-day limitation on Tribunal stay orders).'
  },
  {
    id: 'ito-sec-133',
    act_type: 'Income Tax Ordinance, 2001',
    chapter: 'Chapter X: Procedure',
    part_division: 'Part III: Appeals & Dispute Resolution',
    section_code: 'Section 133',
    title: 'Reference to High Court on Questions of Law',
    description: 'Within ninety days of communication of an order of the Appellate Tribunal, the taxpayer or the Commissioner may prefer an application in the prescribed form to the High Court on any question of law arising out of such order.',
    sub_sections: [
      '133(1): Jurisdiction of High Court strictly confined to substantial questions of law.',
      '133(2): 90-day limitation period for filing tax reference application (TRA).',
      '133(4): High Court Bench of not less than two judges (Division Bench) hears the reference.',
      '133(6): High Court judgment communicated to ATIR which disposes of the case in conformity with the decision.',
      '133(8): Stay of recovery: High Court may grant stay on deposit of 30% to 50% disputed tax or furnishing bank guarantee.'
    ],
    statutory_rates_or_penalties: 'Binding precedent across provincial high court jurisdictions.',
    practical_notes: 'Must clearly frame distinct numbered Questions of Law (e.g. "Whether on facts and circumstances of the case, ATIR was justified in law to allow input adjustment under Sec 8(1)(ca)...").',
    cross_references: ['Section 130', 'Section 132', 'Article 199 of Constitution of Pakistan'],
    fbr_precedents_and_circulars: '2023 SCMR 150 (Supreme Court: Distinction between questions of fact vs pure questions of law).'
  },
  {
    id: 'ito-sec-134a',
    act_type: 'Income Tax Ordinance, 2001',
    chapter: 'Chapter X: Procedure',
    part_division: 'Part III: Appeals & Dispute Resolution',
    section_code: 'Section 134A',
    title: 'Alternative Dispute Resolution (ADRC) & Algorithmic Settlement',
    description: 'A taxpayer seeking resolution of any dispute in appeal regarding liability of tax, admissibility of expenditure, calculation of income, or penalty may apply to the Board for appointment of an Alternative Dispute Resolution Committee (ADRC).',
    sub_sections: [
      '134A(1): Application to FBR before final appellate adjudication.',
      '134A(2): Constitution of Committee: Chief Commissioner, Chartered Accountant / Senior Advocate, and reputable businessman.',
      '134A(4): ADRC recommendation binding on both parties if taxpayer withdraws pending appeal in High Court / Tribunal.',
      '134A(6): Fast-track algorithmic settlement engine for standard digital reconciliation discrepancies.'
    ],
    statutory_rates_or_penalties: 'Waiver of prosecution and up to 75% reduction in penalty upon ADRC consensus.',
    practical_notes: 'Ideal for complex transfer pricing or corporate group restructuring disputes where multi-year tax liabilities can be resolved without decade-long court litigation.',
    cross_references: ['Section 122D', 'Section 127', 'Section 131', 'ADRC Rules 2022'],
    fbr_precedents_and_circulars: 'FBR SRO 1450(I)/2022 (Modernized ADRC Mechanism and Timelines).'
  },

  // =========================================================================
  // CHAPTER X: PART IV: COLLECTION & RECOVERY OF TAX (SECTIONS 137 - 141)
  // =========================================================================
  {
    id: 'ito-sec-137',
    act_type: 'Income Tax Ordinance, 2001',
    chapter: 'Chapter X: Procedure',
    part_division: 'Part IV: Collection & Recovery of Tax',
    section_code: 'Section 137',
    title: 'Due Date for Payment of Tax & Notice of Demand',
    description: 'The tax payable by a taxpayer on the taxable income declared in return shall be due on the date the return is furnished. Tax payable pursuant to an assessment order or penalty order shall be payable within thirty days from service of notice of demand under Section 137(2).',
    sub_sections: [
      '137(1): Self-assessed tax due simultaneously upon return submission.',
      '137(2): Issuance of statutory Notice of Demand for tax assessed under Section 121, 122, 143, 161, 182, or 205.',
      '137(3): 30-day statutory grace period for payment from service of demand notice.',
      '137(4): Commissioner power to extend time for payment or allow payment in monthly installments.'
    ],
    statutory_rates_or_penalties: 'Default surcharge under Section 205 begins accruing immediately after the 30th day.',
    practical_notes: 'FBR officers cannot initiate coercive recovery or attach bank accounts before the expiry of the mandatory 30-day statutory notice period under Section 137(2).',
    cross_references: ['Section 138 (Recovery)', 'Section 140 (Bank Freeze)', 'Section 205 (Default Surcharge)'],
    fbr_precedents_and_circulars: '2022 PTD 1400 (Islamabad High Court: Premature recovery before 30 days under Section 137 is illegal and void ab initio).'
  },
  {
    id: 'ito-sec-138',
    act_type: 'Income Tax Ordinance, 2001',
    chapter: 'Chapter X: Procedure',
    part_division: 'Part IV: Collection & Recovery of Tax',
    section_code: 'Section 138',
    title: 'Recovery of Tax out of Property and Arrest Procedures',
    description: 'For the purpose of recovering any tax due by a taxpayer in default, the Commissioner may pass an order of attachment and sale of movable or immovable property, appointment of receiver, or issuance of arrest warrant for civil detention of the defaulter up to six months.',
    sub_sections: [
      '138(1): Issuance of Recovery Certificate to Tax Recovery Officer (TRO).',
      '138(2): Attachment and auction sale of taxpayer\'s commercial, industrial, or residential properties.',
      '138(3): Execution through District Officer (Revenue) as arrears of land revenue under Section 138A.',
      '138(4): Arrest and detention in civil prison where defaulter deliberately conceals or transfers property to evade tax.'
    ],
    statutory_rates_or_penalties: 'Extreme recovery enforcement for persistent willful tax defaulters.',
    practical_notes: 'Arrest requires prior sanction of Chief Commissioner and proof of deliberate asset alienation. Taxpayer can obtain release upon furnishing bank guarantee or surety bond.',
    cross_references: ['Section 138A', 'Section 140', 'Section 203A (Arrest & Prosecution)'],
    fbr_precedents_and_circulars: 'Income Tax Recovery Rules 2002 (Procedures for Auction and Distress Warrants).'
  },
  {
    id: 'ito-sec-140',
    act_type: 'Income Tax Ordinance, 2001',
    chapter: 'Chapter X: Procedure',
    part_division: 'Part IV: Collection & Recovery of Tax',
    section_code: 'Section 140',
    title: 'Recovery from Bank Accounts & Debtors (Garnishee Order)',
    description: 'The Commissioner may, by notice in writing, require any person or commercial bank holding money for or on account of the taxpayer to pay to the Commissioner so much of the money as is sufficient to pay the tax due.',
    sub_sections: [
      '140(1): Garnishee notice served on banks, debtors, employers, or clients of the taxpayer.',
      '140(2): Bank obligation to freeze and remit funds to the Federal Government Treasury CPR within specified timeframe.',
      '140(5): Personal liability of bank manager / debtor for failure to comply with Section 140 notice.',
      '140(6): Discharge of debtor liability towards taxpayer to the extent of amount paid to FBR.'
    ],
    statutory_rates_or_penalties: 'Immediate debit of taxpayer bank account up to outstanding demand.',
    practical_notes: 'High Courts have repeatedly established that prior notice of at least 24 hours must be served on the taxpayer before executing Section 140 bank account attachment.',
    cross_references: ['Section 137', 'Section 138', '2023 PTD 800'],
    fbr_precedents_and_circulars: '2023 PTD 800 (Lahore High Court: Deprecating unilateral bank account freeze without prior intimation).'
  },

  // =========================================================================
  // CHAPTER X: PART V: ADVANCE TAX & WITHHOLDING TAX (SECTIONS 159 - 169)
  // =========================================================================
  {
    id: 'ito-sec-159',
    act_type: 'Income Tax Ordinance, 2001',
    chapter: 'Chapter X: Procedure',
    part_division: 'Part V: Advance Tax & Withholding Tax',
    section_code: 'Section 159',
    title: 'Exemption or Lower Rate Withholding Certificate',
    description: 'Where the Commissioner is satisfied that total income of a person is exempt from tax, or subject to reduced rate of tax, or where tax deductible at source exceeds estimated tax liability, the Commissioner shall, upon electronic application, issue an exemption or lower rate certificate.',
    sub_sections: [
      '159(1): Application for exemption / reduced withholding under Section 148, 150, 151, 152, 153, or 236C.',
      '159(2): Mandatory 15-day statutory timeline for Commissioner to issue certificate on IRIS portal.',
      '159(3): Automatic deemed issuance: If application is not disposed of within 15 days, Iris computer system automatically generates lower rate certificate.',
      '159(6): Revocation of certificate where circumstances justifying grant cease to exist.'
    ],
    statutory_rates_or_penalties: 'Withholding agents prohibited from deducting tax upon presentation of valid Section 159 certificate.',
    practical_notes: 'Vital tool for corporate cash flow management: Companies carrying heavy advance tax credits or operating on thin profit margins can legally reduce withholding from 5.5%/11% down to 1% or 0%.',
    cross_references: ['Section 153 (WHT on Goods/Services)', 'Section 152', 'Second Schedule'],
    fbr_precedents_and_circulars: 'FBR Circular No. 04 of 2021 on Automated Deemed Exemption Certificates.'
  },
  {
    id: 'ito-sec-161',
    act_type: 'Income Tax Ordinance, 2001',
    chapter: 'Chapter X: Procedure',
    part_division: 'Part V: Advance Tax & Withholding Tax',
    section_code: 'Section 161',
    title: 'Failure to Deduct or Collect Tax - Recovery & Default',
    description: 'Where a withholding agent fails to deduct or collect tax as required under Chapter X Part V, or having deducted fails to deposit it into the Government Treasury, the person shall be personally liable to pay the amount of tax to the Commissioner together with default surcharge under Section 205.',
    sub_sections: [
      '161(1): Order of default passed against non-compliant withholding agent.',
      '161(1A): No recovery of principal tax from withholding agent if supplier/recipient has already discharged and paid the tax in its annual return (relief against double taxation).',
      '161(2): Default surcharge under Section 205 computed from date of failure until date of actual deposit.',
      '161(3): Limitation: Notice under Section 161 must be issued within 5 years from end of the financial year in which tax was deductible.'
    ],
    statutory_rates_or_penalties: 'Personal liability + 12% default surcharge per annum + penalty under Section 182.',
    practical_notes: 'Under Section 161(1A), obtain a certificate from vendor\'s Chartered Accountant showing vendor declared the income and paid tax in their return to completely vacate principal tax demand.',
    cross_references: ['Section 153', 'Section 162', 'Section 205', '2021 PTD 950'],
    fbr_precedents_and_circulars: '2021 PTD 950 (Supreme Court on avoiding double taxation under Section 161(1A)).'
  },
  {
    id: 'ito-sec-164a',
    act_type: 'Income Tax Ordinance, 2001',
    chapter: 'Chapter X: Procedure',
    part_division: 'Part V: Advance Tax & Withholding Tax',
    section_code: 'Section 164A',
    title: 'SWAPS - Synchronized Withholding Administration & Payment System',
    description: 'The Board may notify a Synchronized Withholding Administration and Payment System (SWAPS) agent to integrate its digital billing, ERP, and payment systems with the Board for real-time automatic withholding, deduction, and instant treasury deposit.',
    sub_sections: [
      '164A(1): Mandatory onboarding of Tier-1 corporate buyers, banks, and utility providers as SWAPS agents.',
      '164A(2): Real-time electronic CPR generation at the exact moment of payment transfer.',
      '164A(3): Disallowance of business expenditure under Section 21(q) if payment is made outside SWAPS system for notified sectors.'
    ],
    statutory_rates_or_penalties: 'Disallowance of entire purchase expense under Section 21(q) for non-SWAPS transactions.',
    practical_notes: 'Corporate ERPs (SAP, Oracle) must integrate SWAPS API to ensure real-time vendor NTN/ATL validation and automatic tax bifurcation before transaction settlement.',
    cross_references: ['Section 21(q)', 'Section 165', 'SWAPS Rules 2023'],
    fbr_precedents_and_circulars: 'FBR SRO 1640(I)/2023 on SWAPS Digital Invoicing Protocol.'
  },
  {
    id: 'ito-sec-165a',
    act_type: 'Income Tax Ordinance, 2001',
    chapter: 'Chapter X: Procedure',
    part_division: 'Part V: Advance Tax & Withholding Tax',
    section_code: 'Section 165A',
    title: 'Furnishing of Real-Time Information by Banking Companies',
    description: 'Every banking company shall furnish to the Board real-time online data of cash withdrawals exceeding aggregate PKR 50,000 in a day, credit card transactions exceeding PKR 250,000 per month, bank accounts opening, and individuals depositing PKR 10 million or more in a tax year.',
    sub_sections: [
      '165A(1)(a): Monthly list of persons making cash withdrawals exceeding statutory limits.',
      '165A(1)(b): Monthly list of persons receiving profit on debt exceeding PKR 1,000,000.',
      '165A(1)(d): List of business bank accounts opened or operated by non-filers.',
      '165A(2): Immunity to banks against confidentiality claims under Banking Companies Ordinance 1962.'
    ],
    statutory_rates_or_penalties: 'Penalty under Section 182: PKR 25,000 for each day of default by banking company.',
    practical_notes: 'FBR utilizes Section 165A banking automated pipelines to feed intelligence into the "Maloomat" portal and trigger automated Section 114(4) notices for non-filers.',
    cross_references: ['Section 175A', 'Section 175B (NADRA)', 'Section 231AB'],
    fbr_precedents_and_circulars: 'State Bank of Pakistan BPRD Circular 08 of 2022 on FBR Real-time Data Sharing.'
  },
  {
    id: 'ito-sec-169',
    act_type: 'Income Tax Ordinance, 2001',
    chapter: 'Chapter X: Procedure',
    part_division: 'Part V: Advance Tax & Withholding Tax',
    section_code: 'Section 169',
    title: 'Tax Collected or Deducted as a Final Tax (Final Tax Regime - FTR)',
    description: 'This section applies where the tax deducted or collected at source is treated as a final tax on the income of the person. Income subject to final tax shall not be included in computation of taxable income, no deduction shall be allowed for any expenditure incurred, and the tax liability is fully discharged.',
    sub_sections: [
      '169(1): Definition and scope of Final Tax Regime (FTR).',
      '169(2): Key FTR exclusions: No business loss set-off, no depreciation deduction, no tax credit adjustment.',
      '169(3): Apportionment of common business expenses between Normal Tax Regime (NTR) and Final Tax Regime (FTR) under Rule 25.'
    ],
    statutory_rates_or_penalties: 'Tax deducted at source constitutes total tax liability on that transaction.',
    practical_notes: 'Exporters under Section 154 and prize bond winners under Section 156 are traditional FTR examples. Ensure accurate revenue segregation on IRIS return to prevent illegal expense allocation.',
    cross_references: ['Section 154 (Exports)', 'Section 156', 'Rule 25 (Apportionment)'],
    fbr_precedents_and_circulars: '2021 SCMR 890 (Supreme Court: Strict prohibition of business expense deduction against FTR receipts).'
  },

  // =========================================================================
  // CHAPTER X: PART VI & VII: REFUNDS & REPRESENTATIVES (SECTIONS 170 - 173)
  // =========================================================================
  {
    id: 'ito-sec-170',
    act_type: 'Income Tax Ordinance, 2001',
    chapter: 'Chapter X: Procedure',
    part_division: 'Part VI & VII: Refunds & Representatives',
    section_code: 'Section 170',
    title: 'Electronic Refund Application & 60-Day Statutory Issuance',
    description: 'A taxpayer who has paid tax in excess of the amount properly chargeable may apply to the Commissioner in the prescribed form for a refund of excess tax within three years from the end of the tax year to which it relates.',
    sub_sections: [
      '170(1): Right of taxpayer to claim refund of excess advance tax, WHT, or tax paid under mistake of law.',
      '170(2): Electronic application via IRIS portal supported by CPRs and withholding certificates.',
      '170(4): Mandatory 60-day deadline: Commissioner must pass an order admitting or rejecting refund within sixty days of application.',
      '170(5): Right of appeal under Section 127 against refund rejection order.'
    ],
    statutory_rates_or_penalties: 'Additional compensation for delay under Section 171 at KIBOR rate per annum.',
    practical_notes: 'If refund order is not passed within 60 days, taxpayer can lodge complaint with the Federal Tax Ombudsman (FTO) for maladministration, which routinely directs instant refund clearance.',
    cross_references: ['Section 170A', 'Section 171', 'Section 171A (Refund Bonds)', 'FTO Ordinance 2000'],
    fbr_precedents_and_circulars: 'FTO Landmark Recommendation in Complaint No. 1200/2023 on automated refund sanctioning.'
  },
  {
    id: 'ito-sec-170a',
    act_type: 'Income Tax Ordinance, 2001',
    chapter: 'Chapter X: Procedure',
    part_division: 'Part VI & VII: Refunds & Representatives',
    section_code: 'Section 170A',
    title: 'Electronic Refund Issuance & Centralized Processing',
    description: 'Notwithstanding Section 170, the Board may implement a fully automated Centralized Income Tax Refund Processing System to issue refunds directly into taxpayer verified IBAN bank accounts without manual field officer intervention.',
    sub_sections: [
      '170A(1): Direct electronic payment advice issued to State Bank of Pakistan.',
      '170A(2): System validation against active withholding CPR ledgers and treasury deposits.',
      '170A(3): Elimination of paper refund payment orders (RPOs).'
    ],
    statutory_rates_or_penalties: 'Direct bank transfer of verified income tax refunds.',
    practical_notes: 'Ensure that the IBAN number declared in your IRIS registration profile is 100% active and 1-link verified with your title name matching your NTN.',
    cross_references: ['Section 170', 'Section 171A'],
    fbr_precedents_and_circulars: 'FBR SRO 1120(I)/2022 (Electronic Income Tax Refund Rules).'
  },
  {
    id: 'ito-sec-171a',
    act_type: 'Income Tax Ordinance, 2001',
    chapter: 'Chapter X: Procedure',
    part_division: 'Part VI & VII: Refunds & Representatives',
    section_code: 'Section 171A',
    title: 'Payment of Refund through Tax Refund Bonds',
    description: 'The Federal Government may issue Tax Refund Bonds through FBR or Central Depository Company (CDC) in lieu of cash payment for admitted refund claims to corporate exporters and industrial units.',
    sub_sections: [
      '171A(1): Option to receive tradable tax refund bonds with defined maturity period (typically 3 years).',
      '171A(2): Sovereign interest coupon rates linked to State Bank monetary policy.',
      '171A(3): Tradable on Pakistan Stock Exchange (PSX) or pledgeable as collateral with commercial banks.'
    ],
    statutory_rates_or_penalties: 'Sovereign backed financial instrument for liquidity management.',
    practical_notes: 'Allows industrial conglomerates to monetize massive accumulated refund books via bank discounting.',
    cross_references: ['Section 170', 'Section 171', 'Sales Tax Act Sec 10'],
    fbr_precedents_and_circulars: 'FBR Tax Refund Bonds Regulations 2020.'
  },
  {
    id: 'ito-sec-172',
    act_type: 'Income Tax Ordinance, 2001',
    chapter: 'Chapter X: Procedure',
    part_division: 'Part VI & VII: Refunds & Representatives',
    section_code: 'Section 172',
    title: 'Representatives - Definition, Appointment & Scope',
    description: 'For the purposes of this Ordinance, "representative" of a person means: for an individual under legal disability (guardian); for a company (principal officer, managing director, CEO); for a non-resident (agent, branch manager, or person through whom non-resident derives income).',
    sub_sections: [
      '172(1): Classification of statutory representatives.',
      '172(2): Representative of non-resident: Agent, employee, debtor, or joint venture partner in Pakistan.',
      '172(3): Notice by Commissioner declaring a person as representative of non-resident with right to object within 30 days.'
    ],
    statutory_rates_or_penalties: 'Representative bound by all taxpayer obligations under Section 173.',
    practical_notes: 'Foreign suppliers rendering services in Pakistan without permanent establishment (PE) are often assessed through their local resident distributor under Section 172(3).',
    cross_references: ['Section 173 (Liabilities)', 'Section 107', 'Section 152'],
    fbr_precedents_and_circulars: '2020 PTD 1400 (Supreme Court: Procedure for declaring representative of foreign entity).'
  },
  {
    id: 'ito-sec-173',
    act_type: 'Income Tax Ordinance, 2001',
    chapter: 'Chapter X: Procedure',
    part_division: 'Part VI & VII: Refunds & Representatives',
    section_code: 'Section 173',
    title: 'Liabilities and Duties of Representatives',
    description: 'Every representative of a person shall be responsible for performing any duties or obligations imposed on the taxpayer, including furnishing returns and paying tax; however, the personal liability of the representative is limited to the extent of assets of the taxpayer in his possession or control.',
    sub_sections: [
      '173(1): Representative step-in liability for filing and tax discharge.',
      '173(2): Personal liability arises if representative alienates, disposes of, or parts with assets before paying tax due.',
      '173(3): Statutory right of representative to retain money from taxpayer assets to indemnify himself for tax paid.'
    ],
    statutory_rates_or_penalties: 'Personal liability to the extent of alienated taxpayer assets.',
    practical_notes: 'Liquidators, court receivers, and company directors must maintain adequate tax reserves before distributing liquidation proceeds to avoid personal liability under Section 173(2).',
    cross_references: ['Section 172', 'Section 138', 'Companies Act 2017 Sec 380'],
    fbr_precedents_and_circulars: '2021 CLD 890 (High Court on liquidator indemnification rights).'
  },

  // =========================================================================
  // CHAPTER X: PART VIII: RECORDS, AUDIT & INFORMATION (SECTIONS 174 - 180)
  // =========================================================================
  {
    id: 'ito-sec-174',
    act_type: 'Income Tax Ordinance, 2001',
    chapter: 'Chapter X: Procedure',
    part_division: 'Part VIII: Records, Audit & Information Collection',
    section_code: 'Section 174',
    title: 'Accounts, Documents & Records Retention (6-Year Rule)',
    description: 'Every taxpayer shall maintain in Pakistan such accounts, documents, and records as may be prescribed to enable the Commissioner to accurately determine the tax liability of the person. Records must be maintained for a mandatory period of six years from the end of the tax year to which they relate.',
    sub_sections: [
      '174(1): Obligation to maintain books of accounts in double-entry bookkeeping (for companies/large businesses).',
      '174(2): Mandatory records: Sales invoices, purchase bills, bank statements, asset registers, stock registers.',
      '174(3): Mandatory 6-year retention period (or until final disposal of pending appeal/reference).',
      '174(4): Disallowance of undocumented expenses under Section 21(l).'
    ],
    statutory_rates_or_penalties: 'Penalty under Section 182: PKR 10,000 or 5% of tax for failure to maintain records.',
    practical_notes: 'If an assessment is in appeal before ATIR or High Court, the 6-year retention clock is frozen, and records must be retained until the final judicial order is executed under Section 124.',
    cross_references: ['Section 177 (Audit)', 'Section 21 (Inadmissible Deductions)', 'Income Tax Rules Rule 29'],
    fbr_precedents_and_circulars: '2022 PTD 1050 (ATIR: Discarding accounts without pointing out specific defects under Section 174 is unlawful).'
  },
  {
    id: 'ito-sec-175',
    act_type: 'Income Tax Ordinance, 2001',
    chapter: 'Chapter X: Procedure',
    part_division: 'Part VIII: Records, Audit & Information Collection',
    section_code: 'Section 175',
    title: 'Power to Enter Premises & Search Real-Time Computer Systems',
    description: 'An officer of Inland Revenue authorized by the Commissioner in writing shall have at all times full and free access to any premises, place, accounts, documents, or computerized database to inspect, seize, or extract electronic copies of business records.',
    sub_sections: [
      '175(1): Unrestricted access to commercial premises, computers, servers, and cloud databases.',
      '175(2): Impounding of accounts, books, and hard drives for a period up to 60 days (extendable with Chief Commissioner approval).',
      '175(3): Search of private residential premises requires prior warrant signed by Judicial Magistrate.',
      '175(4): Police assistance mandatory upon requisition by Commissioner.'
    ],
    statutory_rates_or_penalties: 'Obstruction punishable under Section 191 with fine and imprisonment up to 1 year.',
    practical_notes: 'During field visits under Section 175, always inspect the officer\'s written Authorization Letter signed by the jurisdictional Commissioner; unauthorized junior staff have zero legal search powers.',
    cross_references: ['Section 175A', 'Section 191', 'Code of Criminal Procedure 1898'],
    fbr_precedents_and_circulars: '2021 PTD 1320 (Lahore High Court: Warrantless search of non-business premises declared unconstitutional).'
  },
  {
    id: 'ito-sec-175a',
    act_type: 'Income Tax Ordinance, 2001',
    chapter: 'Chapter X: Procedure',
    part_division: 'Part VIII: Records, Audit & Information Collection',
    section_code: 'Section 175A',
    title: 'Real-Time Electronic Access to Databases of Utility & Govt Depts',
    description: 'The Board shall have real-time electronic access to databases of National Database and Registration Authority (NADRA), DISCO electricity utilities, gas companies, provincial excise and land revenue authorities, State Bank of Pakistan, and commercial banks.',
    sub_sections: [
      '175A(1): Automated data pipeline integration for automated economic activity monitoring.',
      '175A(2): Real-time electricity consumption linkage with business NTN/STRN.',
      '175A(3): Real-time land registration and vehicle transfer telemetry.'
    ],
    statutory_rates_or_penalties: 'Automatic generation of indicative tax assessments.',
    practical_notes: 'FBR\'s centralized data warehouse correlates industrial electricity units consumed with declared manufacturing output to detect suppressed sales.',
    cross_references: ['Section 175B (NADRA)', 'Section 165A', 'Section 235'],
    fbr_precedents_and_circulars: 'FBR National Data Integration Framework 2023.'
  },
  {
    id: 'ito-sec-175b',
    act_type: 'Income Tax Ordinance, 2001',
    chapter: 'Chapter X: Procedure',
    part_division: 'Part VIII: Records, Audit & Information Collection',
    section_code: 'Section 175B',
    title: 'NADRA Data Sharing & Indicative Income Computation',
    description: 'NADRA shall share its citizens database with the Board, and compute indicative income and tax liability of any person by applying artificial intelligence, mathematical algorithms, and expenditure models based on international travels, vehicle purchases, luxury spending, and property transactions.',
    sub_sections: [
      '175B(1): Statutory mandate for NADRA algorithmic citizen expenditure modeling.',
      '175B(2): Opportunity to pay indicative tax or file formal objection on portal.',
      '175B(4): Disconnection of mobile SIMs, electricity meters, and overseas travel ban for uncooperative high-net-worth non-filers.'
    ],
    statutory_rates_or_penalties: 'Blocking of mobile phone SIMs, electricity connections, and inclusion on Exit Control List (ECL) / travel restriction.',
    practical_notes: 'Citizens receiving NADRA indicative tax notices must promptly link their declared tax returns or submit reconciliation of foreign visits to prevent SIM/utility disconnection.',
    cross_references: ['Section 114', 'Section 181A', 'Income Tax General Orders (ITGOs) 2024'],
    fbr_precedents_and_circulars: 'ITGO No. 01 of 2024 (List of 500,000 non-filers for mobile SIM blocking).'
  },
  {
    id: 'ito-sec-177',
    act_type: 'Income Tax Ordinance, 2001',
    chapter: 'Chapter X: Procedure',
    part_division: 'Part VIII: Records, Audit & Information Collection',
    section_code: 'Section 177',
    title: 'Audit of Tax Affairs by Commissioner & Special Audit Panels',
    description: 'The Commissioner may call for all the books of accounts, documents, and records of any person and conduct an audit of the tax affairs of that person. The Board may also appoint a firm of Chartered Accountants or Cost and Management Accountants to conduct special audits.',
    sub_sections: [
      '177(1): Notice for production of books, ledgers, and inventory registers.',
      '177(2): Desk audit, field audit, or computerized remote audit procedures.',
      '177(6): Mandatory issuance of Audit Report specifying discrepancy findings before passing amendment order.',
      '177(8): Appointment of Special Audit Panels (SAP) consisting of officers and private Chartered Accountants under Section 177(8).'
    ],
    statutory_rates_or_penalties: 'Basis for amendment of assessment under Section 122(5) or best judgement under Section 121.',
    practical_notes: 'Crucial procedural right: Assessing officer must provide a formal Audit Report under Section 177(6) and seek taxpayer explanations before issuing a Section 122(9) Show Cause Notice.',
    cross_references: ['Section 122', 'Section 174', 'Section 214C (Ballot Audit)', '2021 SCMR 1450'],
    fbr_precedents_and_circulars: '2021 SCMR 1450 (Supreme Court: Failure to confront Audit Report invalidates subsequent amendment order).'
  },

  // =========================================================================
  // CHAPTER XI: ADMINISTRATION & OFFENSES (SECTIONS 181 - 227E)
  // =========================================================================
  {
    id: 'ito-sec-181a',
    act_type: 'Income Tax Ordinance, 2001',
    chapter: 'Chapter XI: Administration & Offenses',
    part_division: 'Part IX & X: Taxpayer Registration & Penalties',
    section_code: 'Section 181A',
    title: 'Active Taxpayers List (ATL) & Surcharge for Inclusion',
    description: 'The Board shall publish an Active Taxpayers List on its web portal. A person who files his return of income after the statutory due date shall not be included in the ATL unless he deposits a surcharge of PKR 1,000 (individuals), PKR 10,000 (AOPs), or PKR 20,000 (companies).',
    sub_sections: [
      '181A(1): Weekly publishing of updated Active Taxpayers List.',
      '181A(2): Non-ATL persons subjected to 100% higher withholding tax rates under Tenth Schedule.',
      '181A(3): Surcharge payment via CPR on Iris for instant reinstatement to ATL.'
    ],
    statutory_rates_or_penalties: '100% higher withholding tax on all banking, property, and vehicle transactions for non-ATL persons.',
    practical_notes: 'Filing the return late is only step one; you MUST generate and pay the ATL Surcharge PSID/CPR on FBR e-portal to immediately restore active filer status.',
    cross_references: ['Tenth Schedule', 'Section 182A', 'Section 236K', 'Section 236C'],
    fbr_precedents_and_circulars: 'FBR Circular 02 of 2023 on Automated Weekly ATL Synchronizations.'
  },
  {
    id: 'ito-sec-181b',
    act_type: 'Income Tax Ordinance, 2001',
    chapter: 'Chapter XI: Administration & Offenses',
    part_division: 'Part IX & X: Taxpayer Registration & Penalties',
    section_code: 'Section 181B',
    title: 'Taxpayer\'s Business Licence & Mandatory Premises Display',
    description: 'Every person engaged in any business, profession, or vocation shall obtain a Taxpayer\'s Business Licence from the Board and display it at a prominent place on every place of business.',
    sub_sections: [
      '181B(1): Mandatory issuance of digital QR-coded Business Licence on IRIS.',
      '181B(2): Mandatory physical display at cash counters and commercial entrance.',
      '181B(3): Power of Inland Revenue officers to seal business premises for non-compliance after notice.'
    ],
    statutory_rates_or_penalties: 'Sealing of business premises + PKR 20,000 penalty for non-display.',
    practical_notes: 'Ensure all retail outlets, clinics, and professional consulting chambers download and laminate their official FBR QR-code licence.',
    cross_references: ['Section 181', 'Section 182', 'Section 181C'],
    fbr_precedents_and_circulars: 'FBR Tajir Dost Scheme & Business Licence Rules 2024.'
  },
  {
    id: 'ito-sec-182',
    act_type: 'Income Tax Ordinance, 2001',
    chapter: 'Chapter XI: Administration & Offenses',
    part_division: 'Part IX & X: Taxpayer Registration & Penalties',
    section_code: 'Section 182',
    title: 'Comprehensive Offences and Penalties Table',
    description: 'Any person who commits any offence specified in column (2) of the Table shall pay the penalty specified in column (4) thereof, covering non-filing, wealth concealment, non-deduction of WHT, obstruction of officers, and issuance of false statements.',
    sub_sections: [
      '182(1) Entry 1: Non-filing of return — 0.1% of tax per day (Min PKR 1,000, Max 50%).',
      '182(1) Entry 2: Non-furnishing of wealth statement — PKR 20,000.',
      '182(1) Entry 4A: Failure to register / obtain NTN — PKR 10,000.',
      '182(1) Entry 11: Concealment of income — 100% of tax evaded (or 200% for offshore concealment).',
      '182(1) Entry 14: Failure to deduct withholding tax — PKR 40,000 or 10% of tax.',
      '182(1) Entry 25: Non-integration with FBR POS / SWAPS — PKR 500,000 to PKR 3,000,000 and sealing.'
    ],
    statutory_rates_or_penalties: 'Statutory financial penalties ranging from PKR 1,000 to 200% of evaded tax liability.',
    practical_notes: 'Penalties are not automatic; assessing officer must show willful default and issue a distinct Show Cause Notice providing opportunity of defense.',
    cross_references: ['Section 182A', 'Section 191', 'Section 205'],
    fbr_precedents_and_circulars: '2022 PTD 1600 (Supreme Court: Penalty cannot be levied where default is due to bona fide interpretation doubt).'
  },
  {
    id: 'ito-sec-192a',
    act_type: 'Income Tax Ordinance, 2001',
    chapter: 'Chapter XI: Administration & Offenses',
    part_division: 'Part XI: Offenses & Prosecutions',
    section_code: 'Section 192A',
    title: 'Prosecution for Concealment of Income and Assets',
    description: 'Any person who deliberately conceals income or furnishes inaccurate particulars of income shall commit an offence punishable on conviction with a fine or imprisonment for a term which may extend to two years, or both.',
    sub_sections: [
      '192A(1): Criminal culpability for deliberate suppression of sales, hidden bank accounts, or sham expenses.',
      '192A(2): Section 192B: Offshore concealment punishable with imprisonment up to seven years and fine up to 200% of tax evaded.',
      '192A(3): Prior approval of the Board mandatory before lodging criminal complaint.'
    ],
    statutory_rates_or_penalties: 'Imprisonment up to 2 years (Domestic) / Up to 7 years (Offshore) + Heavy criminal fine.',
    practical_notes: 'Criminal prosecution under Section 192A is tried exclusively by the Special Judge (Customs, Taxation & Anti-Smuggling) under Section 203.',
    cross_references: ['Section 192B', 'Section 202', 'Section 203', 'Section 203A'],
    fbr_precedents_and_circulars: '2021 PCrLJ 890 (High Court on standard of criminal proof in tax fraud prosecutions).'
  },
  {
    id: 'ito-sec-203a',
    act_type: 'Income Tax Ordinance, 2001',
    chapter: 'Chapter XI: Administration & Offenses',
    part_division: 'Part XI: Offenses & Prosecutions',
    section_code: 'Section 203A',
    title: 'Power to Arrest and Prosecute Cognizable Tax Offenders',
    description: 'Where on the basis of material evidence the Commissioner has reason to believe that any person has committed an offence of concealment of income or massive tax fraud, the Commissioner may cause such person to be arrested with prior written approval of the Special Committee.',
    sub_sections: [
      '203A(1): Arrest power for deliberate tax fraud and concealment exceeding statutory monetary thresholds.',
      '203B: Production of arrested person before the Special Judicial Magistrate within twenty-four hours.',
      '203C: Special Judge powers regarding bail, judicial custody, and summary trial procedures.'
    ],
    statutory_rates_or_penalties: 'Cognizable arrest powers & detention under Code of Criminal Procedure.',
    practical_notes: 'Arrest powers are subject to strict scrutiny by High Courts; the department must possess concrete documentary evidence of active fraud rather than mere contentious legal interpretations.',
    cross_references: ['Section 192A', 'Section 203', 'CrPC 1898'],
    fbr_precedents_and_circulars: '2023 MLD 450 (Sindh High Court bail jurisprudence in tax prosecution cases).'
  },
  {
    id: 'ito-sec-205',
    act_type: 'Income Tax Ordinance, 2001',
    chapter: 'Chapter XI: Administration & Offenses',
    part_division: 'Part XII & XIII: Default Surcharge & Circulars',
    section_code: 'Section 205',
    title: 'Default Surcharge Computation (12% per Annum / KIBOR + 3%)',
    description: 'A person who fails to pay any tax, advance tax under Section 147, or withholding tax under Chapter X Part V on or before the due date shall be liable to pay a default surcharge at the rate of twelve per cent per annum (or KIBOR + 3%) on the unpaid tax from the date on which it was due until the date on which it is paid.',
    sub_sections: [
      '205(1): Mandatory statutory interest levy on all unpaid tax balances.',
      '205(1B): Default surcharge on shortfall in quarterly advance tax installments under Section 147.',
      '205(3): Default surcharge on delayed withholding tax remittance under Section 161.',
      '205A: Power of Board to grant reduction or waiver of default surcharge in notified hardship cases.'
    ],
    statutory_rates_or_penalties: '12% per annum simple interest computed on daily accrual basis.',
    practical_notes: 'Default surcharge is mandatory and automatic under the statute. However, if the underlying principal assessment under Section 122 is annulled in appeal, the default surcharge automatically drops to zero.',
    cross_references: ['Section 137', 'Section 147 (Advance Tax)', 'Section 161', 'Section 205A'],
    fbr_precedents_and_circulars: '2020 SCMR 1250 (Supreme Court: Default surcharge is compensatory, not penal in nature).'
  },
  {
    id: 'ito-sec-206',
    act_type: 'Income Tax Ordinance, 2001',
    chapter: 'Chapter XI: Administration & Offenses',
    part_division: 'Part XII & XIII: Default Surcharge & Circulars',
    section_code: 'Section 206',
    title: 'Binding Circulars Issued by the Federal Board of Revenue',
    description: 'The Board may issue circulars containing instructions, directions, or interpretations of the provisions of this Ordinance. Such circulars shall be binding on all officers of Inland Revenue, but are not binding on appellate authorities or taxpayers.',
    sub_sections: [
      '206(1): Power of FBR to issue binding statutory interpretations.',
      '206(2): Mandatory compliance by assessing officers and Commissioners.',
      '206A: Advance Rulings mechanism for non-residents and foreign investors on proposed transactions.'
    ],
    statutory_rates_or_penalties: 'Administrative binding instructions for uniform tax execution.',
    practical_notes: 'If an FBR Circular grants a beneficial tax treatment or exemption, the department cannot deny it to a taxpayer; however, an adverse circular can always be challenged before the High Court.',
    cross_references: ['Section 206A', 'Section 207', '2021 PTD 1120'],
    fbr_precedents_and_circulars: '2021 PTD 1120 (Supreme Court: FBR circulars cannot override or restrict statutory provisions of the Ordinance).'
  },
  {
    id: 'ito-sec-218',
    act_type: 'Income Tax Ordinance, 2001',
    chapter: 'Chapter XI: Administration & Offenses',
    part_division: 'Administration Provisions (Sections 207-227E)',
    section_code: 'Section 218',
    title: 'Faceless Assessment & Randomized Digital Jurisdictions',
    description: 'The Board may formulate a scheme for faceless assessment, randomized digital jurisdiction, electronic audit, and remote hearing through dynamic assigned panels to eliminate physical interface between taxpayers and tax officers.',
    sub_sections: [
      '218(1): Electronic issuance of notices through automated IRIS central servers.',
      '218(2): Anonymization of taxpayer identity during audit review.',
      '218(3): Video conference hearings recorded and archived centrally in FBR secure data centers.',
      '227B: Whistleblower rewards program providing 20% of recovered tax for reporting tax evasion.'
    ],
    statutory_rates_or_penalties: 'Digital governance and complete anti-corruption transparency.',
    practical_notes: 'All compliance responses, rejoinders, and financial reconciliations must be uploaded in searchable PDF format directly to the e-hearing portal.',
    cross_references: ['Section 122', 'Section 177', 'Section 227B (Whistleblower)'],
    fbr_precedents_and_circulars: 'FBR SRO 1330(I)/2022 (Faceless Assessment & e-Hearing Regulations).'
  },

  // =========================================================================
  // CHAPTER XII & XIII: TRANSITIONAL ADVANCE TAX (SECTIONS 231A - 236Y)
  // =========================================================================
  {
    id: 'ito-sec-231ab',
    act_type: 'Income Tax Ordinance, 2001',
    chapter: 'Chapter XII: Transitional Advance Tax',
    part_division: 'Advance Tax Provisions (Sections 231A-236Y)',
    section_code: 'Section 231AB',
    title: 'Advance Tax on Cash Withdrawals by Non-Filers',
    description: 'Every banking company shall deduct advance adjustable income tax at the rate of 0.6% from persons whose names are not appearing in the Active Taxpayers List (ATL) on all cash withdrawals exceeding PKR 50,000 in a single day.',
    sub_sections: [
      '231AB(1): 0.6% advance tax deduction on cash withdrawals by non-filers.',
      '231AB(2): Aggregate daily limit across all accounts maintained in the same bank branch.',
      '231AB(3): Exemption for Active Taxpayers (0% rate on ATL filers), Federal/Provincial Governments, and foreign diplomats.'
    ],
    statutory_rates_or_penalties: 'Rate: 0.6% for Non-Filers (0% for Filers on ATL).',
    practical_notes: 'Adjustable in annual return under Section 168. Non-filers can instantly avoid this 0.6% deduction by filing returns and paying ATL surcharge under Section 182A.',
    cross_references: ['Section 168', 'Section 181A (ATL)', 'First Schedule Part IV Division VI'],
    fbr_precedents_and_circulars: 'FBR Circular 03 of 2023 on Banking Withholding Protocols.'
  },
  {
    id: 'ito-sec-231b',
    act_type: 'Income Tax Ordinance, 2001',
    chapter: 'Chapter XII: Transitional Advance Tax',
    part_division: 'Advance Tax Provisions (Sections 231A-236Y)',
    section_code: 'Section 231B',
    title: 'Advance Tax on Motor Vehicle Purchase, Registration & Transfer',
    description: 'Every motor vehicle registration authority and local car manufacturer shall collect advance adjustable income tax from the purchaser or transferee at the time of booking, registration, or transfer based on engine capacity (cc) or invoice value.',
    sub_sections: [
      '231B(1): Advance tax on purchase/booking of new locally manufactured motor vehicles.',
      '231B(2): Advance tax collected by Motor Registering Authority (Excise) on initial registration.',
      '231B(3): Advance tax collected on transfer of ownership within five years of initial registration.',
      '231B(7): 200% to 300% punitive withholding rates for non-filers under Tenth Schedule.'
    ],
    statutory_rates_or_penalties: 'Up to 850cc: PKR 10k; 1000cc: PKR 20k; 1300cc: PKR 25k; 1800cc: PKR 150k; 2000cc+: 3% to 12% of value (doubled/tripled for non-filers).',
    practical_notes: 'Advance tax paid under Section 231B is fully adjustable against final annual tax liability in the buyer\'s income tax return.',
    cross_references: ['First Schedule Part IV Division VII', 'Tenth Schedule', 'Section 168'],
    fbr_precedents_and_circulars: 'Finance Act 2024 Amendments on High Engine Capacity Luxury Vehicle Slabs.'
  },
  {
    id: 'ito-sec-235',
    act_type: 'Income Tax Ordinance, 2001',
    chapter: 'Chapter XII: Transitional Advance Tax',
    part_division: 'Advance Tax Provisions (Sections 231A-236Y)',
    section_code: 'Section 235',
    title: 'Advance Tax on Commercial & Industrial Electricity Consumption',
    description: 'There shall be collected advance tax on the amount of electricity bills of commercial and industrial consumers at the tiered rates specified in Part IV of the First Schedule.',
    sub_sections: [
      '235(1): Mandatory collection by DISCOs (LESCO, K-Electric, IESCO, FESCO, etc.) in monthly electricity bills.',
      '235(2): Non-corporate commercial consumers: Treated as minimum tax under Section 235(4) if annual bill exceeds threshold.',
      '235(3): Companies: Fully adjustable advance tax against corporate tax liability.'
    ],
    statutory_rates_or_penalties: 'Bill up to PKR 20k: PKR 1,000; PKR 20k-40k: PKR 1,500; above PKR 40k: 10% to 12% of electricity bill.',
    practical_notes: 'Link your company NTN and STRN with your electricity DISCO consumer ID to ensure advance tax is credited under your CNIC/NTN in IRIS.',
    cross_references: ['First Schedule Part IV Division IV', 'Section 168', 'Sales Tax Sec 3(9A)'],
    fbr_precedents_and_circulars: 'NEPRA & FBR Joint SRO 450(I)/2023 on Commercial Billing Tax Integration.'
  },
  {
    id: 'ito-sec-236c',
    act_type: 'Income Tax Ordinance, 2001',
    chapter: 'Chapter XII: Transitional Advance Tax',
    part_division: 'Advance Tax Provisions (Sections 231A-236Y)',
    section_code: 'Section 236C',
    title: 'Advance Tax on Sale or Transfer of Immovable Property (Seller Tax)',
    description: 'Any person responsible for registering, recording, or attesting the transfer of any immovable property shall collect advance income tax from the seller or transferor at the time of executing the transfer deed.',
    sub_sections: [
      '236C(1): Mandatory collection by housing societies, CDA, LDA, KDA, and sub-registrars.',
      '236C(2): Rate: 3% of gross property value for ATL Filers; 6% to 10.5% for Late-Filers and Non-Filers under Tenth Schedule.',
      '236C(3): Fully adjustable against capital gains tax computed under Section 37 in seller\'s annual return.'
    ],
    statutory_rates_or_penalties: 'Filer Rate: 3% | Late-Filer Rate: 6% to 7% | Non-Filer Rate: 10.5% of FBR valuation table value.',
    practical_notes: 'Advance tax under Section 236C is adjustable against Section 37 capital gains tax; if property was acquired more than 6 years ago (or as per holding period slabs), excess WHT can be claimed as refund under Section 170.',
    cross_references: ['Section 37 (Capital Gains)', 'Section 236K (Buyer Tax)', 'FBR Property Valuation Tables'],
    fbr_precedents_and_circulars: 'FBR Valuation S.R.O.s 2024 across 56 major cities in Pakistan.'
  },
  {
    id: 'ito-sec-236k',
    act_type: 'Income Tax Ordinance, 2001',
    chapter: 'Chapter XII: Transitional Advance Tax',
    part_division: 'Advance Tax Provisions (Sections 231A-236Y)',
    section_code: 'Section 236K',
    title: 'Advance Tax on Purchase or Allotment of Immovable Property (Buyer Tax)',
    description: 'Any person responsible for registering, recording, or attesting the transfer or allotment of any immovable property shall collect advance income tax from the purchaser or allottee at the prescribed rates.',
    sub_sections: [
      '236K(1): Advance tax collected from property buyers by housing authorities and sub-registrars.',
      '236K(2): Rates for Filers: 3% of FBR gross property value.',
      '236K(3): Punitive Rates for Non-Filers: 12% to 15% (or 20% for luxury high-value properties) under Tenth Schedule.',
      '236K(4): Installment payment schemes: Advance tax collected pro-rata on each development installment.'
    ],
    statutory_rates_or_penalties: 'Filer Rate: 3% | Non-Filer Rate: 12% to 15%+ of FBR Valuation / DC Rate / Actual consideration.',
    practical_notes: 'Crucial for real estate investments: Being on ATL saves 9% to 12% cash outlay at the time of property registration. The 3% paid is fully adjustable in annual return.',
    cross_references: ['Section 236C', 'Section 116 (Wealth Statement Asset Entry)', 'Tenth Schedule'],
    fbr_precedents_and_circulars: 'Finance Act 2024 Property Tax Slabs and FBR Fair Market Valuation Tables.'
  },
  {
    id: 'ito-sec-236y',
    act_type: 'Income Tax Ordinance, 2001',
    chapter: 'Chapter XII: Transitional Advance Tax',
    part_division: 'Advance Tax Provisions (Sections 231A-236Y)',
    section_code: 'Section 236Y',
    title: 'Advance Tax on Foreign Outward Remittances & Credit Cards',
    description: 'Every banking company shall collect advance income tax at the time of remitting money outside Pakistan on behalf of any person, or at the time of debiting credit card / debit card transactions for international payments.',
    sub_sections: [
      '236Y(1): Outward foreign remittances and educational fees remitted abroad.',
      '236Y(2): International e-commerce transactions, SaaS subscriptions, and digital card payments abroad.',
      '236Y(3): Rate: 5% for ATL Filers; 10% for Non-Filers.'
    ],
    statutory_rates_or_penalties: 'Filer Rate: 5% | Non-Filer Rate: 10% on foreign card transactions.',
    practical_notes: 'Software companies and individuals paying foreign SaaS services (AWS, Google Cloud, GitHub) can adjust this 5% advance tax in their annual return under Section 168.',
    cross_references: ['Section 152', 'Section 168', 'First Schedule Part IV Division XXVII'],
    fbr_precedents_and_circulars: 'State Bank of Pakistan Exchange Policy Circular No. 05 of 2023.'
  },

  // =========================================================================
  // SCHEDULES TO THE INCOME TAX ORDINANCE, 2001
  // =========================================================================
  {
    id: 'ito-sched-first-part1',
    act_type: 'Income Tax Ordinance, 2001',
    chapter: 'Schedules to ITO 2001',
    part_division: 'First Schedule: Tax Rates',
    section_code: 'First Schedule Division I',
    title: 'Rates of Income Tax for Salaried, Non-Salaried Individuals & AOPs',
    description: 'Sets out the progressive tax slabs and rate brackets for salaried individuals (where salary constitutes more than 75% of taxable income), non-salaried individuals, and Associations of Persons (AOPs).',
    sub_sections: [
      'Salaried Slab 1: Up to PKR 600,000 -> 0%',
      'Salaried Slab 2: PKR 600,001 - 1,200,000 -> 5% of amount exceeding 600k',
      'Salaried Slab 3: PKR 1,200,001 - 2,200,000 -> PKR 30k + 15% exceeding 1.2M',
      'Salaried Slab 4: PKR 2,200,001 - 3,200,000 -> PKR 180k + 25% exceeding 2.2M',
      'Salaried Slab 5: PKR 3,200,001 - 4,100,000 -> PKR 430k + 30% exceeding 3.2M',
      'Salaried Slab 6: Above PKR 4,100,000 -> PKR 700k + 35% exceeding 4.1M',
      'Corporate Tax Rate (Division II): 29% flat rate on net taxable profit of companies (plus 10% super tax for high earners).'
    ],
    statutory_rates_or_penalties: 'Progressive rates 0% to 35% for individuals; 29% for companies.',
    practical_notes: 'Salaried threshold rule: If non-salary business or property income exceeds 25% of total income, the taxpayer falls into the higher non-salaried progressive rate table.',
    cross_references: ['Section 4 (Tax Charge)', 'Section 12 (Salary)', 'First Schedule Division IIA (Super Tax)'],
    fbr_precedents_and_circulars: 'Finance Act 2024 / 2025 Tax Year Rate Tables.'
  },
  {
    id: 'ito-sched-first-div2a',
    act_type: 'Income Tax Ordinance, 2001',
    chapter: 'Schedules to ITO 2001',
    part_division: 'First Schedule: Tax Rates',
    section_code: 'First Schedule Division IIA',
    title: 'Super Tax on High Earning Persons (Section 4C)',
    description: 'Graduated super tax rates applicable on high earning individuals, AOPs, and corporate entities whose total income exceeds PKR 150 million in a tax year.',
    sub_sections: [
      'PKR 150M to 200M: 1% of income',
      'PKR 200M to 250M: 2% of income',
      'PKR 250M to 300M: 3% of income',
      'PKR 300M to 350M: 4% of income',
      'PKR 350M to 400M: 6% of income',
      'PKR 400M to 500M: 8% of income',
      'Above PKR 500M: 10% of income (plus special 10% for banking companies).'
    ],
    statutory_rates_or_penalties: '1% to 10% additional super tax over and above regular income tax.',
    practical_notes: 'Super tax applies on economic income (computed before accounting for brought forward business losses and depreciation allowances). Upheld by High Courts in 2023 PTD 1550.',
    cross_references: ['Section 4C', '2023 PTD 1550', 'Seventh Schedule (Banking)'],
    fbr_precedents_and_circulars: '2023 PTD 1550 (Lahore High Court & Islamabad High Court Super Tax Rulings).'
  },
  {
    id: 'ito-sched-first-div7',
    act_type: 'Income Tax Ordinance, 2001',
    chapter: 'Schedules to ITO 2001',
    part_division: 'First Schedule: Tax Rates',
    section_code: 'First Schedule Division VII',
    title: 'Capital Gains on Listed Securities (Section 37A & NCCPL)',
    description: 'Rates of capital gains tax on disposal of listed securities on the Pakistan Stock Exchange (PSX), mutual fund units, and REIT units computed and collected through the National Clearing Company of Pakistan Limited (NCCPL).',
    sub_sections: [
      'Securities acquired after 1st July 2024: 15% flat rate for ATL Filers (doubled to 30% for Non-Filers).',
      'Securities acquired prior to 1st July 2024: Graduated rates based on holding period (Holding < 1 year: 15%; 1-2 years: 12.5%; 2-3 years: 10%; 3-4 years: 7.5%; 4-5 years: 5%; 5-6 years: 2.5%; > 6 years: 0%).',
      'Mutual Funds: Fixed 15% rate on capital gains from stock funds.'
    ],
    statutory_rates_or_penalties: '15% for Filers | 30% for Non-Filers collected at source by NCCPL.',
    practical_notes: 'Capital loss on listed securities can be set off only against capital gains on other securities and can be carried forward for up to 3 tax years under Section 37A(5).',
    cross_references: ['Section 37A', 'Eighth Schedule', 'NCCPL Regulations 2024'],
    fbr_precedents_and_circulars: 'NCCPL Circular on Capital Gains Tax Automated Deduction Mechanism 2024.'
  },
  {
    id: 'ito-sched-second-part1',
    act_type: 'Income Tax Ordinance, 2001',
    chapter: 'Schedules to ITO 2001',
    part_division: 'Second Schedule: Exemptions',
    section_code: 'Second Schedule Part I',
    title: 'Total Income Exemptions from Income Tax',
    description: 'Comprehensive catalogue of specific incomes, institutions, and funds that are 100% exempt from the levy of income tax under Section 53 of the Ordinance.',
    sub_sections: [
      'Clause 66: Specific non-profit institutions, charitable trusts, and foundations (Shaukat Khanum, Edhi, SIUT, etc.).',
      'Clause 80: Pensions granted to former government servants and armed forces personnel.',
      'Clause 100: Gratuity, approved pension funds, and provident funds.',
      'Clause 126E: Special Economic Zone (SEZ) enterprises 10-year income tax holiday from commercial commencement.',
      'Clause 133: IT and IT-enabled services export income (subject to 80% export proceeds repatriation through banking channels).'
    ],
    statutory_rates_or_penalties: '0% Tax (100% statutory exemption).',
    practical_notes: 'Exemption under Second Schedule must still be declared in the annual return on IRIS under the "Exempt Income" tab to prevent Section 111 unexplained wealth inquiries.',
    cross_references: ['Section 53', 'Section 100C', 'Thirteenth Schedule'],
    fbr_precedents_and_circulars: 'FBR Guidelines on IT Export Repatriation Documentation 2024.'
  },
  {
    id: 'ito-sched-third',
    act_type: 'Income Tax Ordinance, 2001',
    chapter: 'Schedules to ITO 2001',
    part_division: 'Third to Fifteenth Schedules',
    section_code: 'Third Schedule',
    title: 'Depreciation, Initial Allowance & Amortization Rates',
    description: 'Prescribes the statutory depreciation rates, initial allowance percentages, and written down value (WDV) methodology for capital assets used in business under Section 22 and Section 23.',
    sub_sections: [
      'Initial Allowance (Section 23): 25% on eligible plant, machinery and equipment installed in Pakistan.',
      'Normal Depreciation (Part I): Buildings: 10%; Furniture & Fittings: 15%; Plant & Machinery: 15%; Motor Vehicles: 15%; Computer Hardware: 30%; Technical Software: 30%.',
      'Passenger Transport Vehicle: Depreciation cost capped at PKR 7.5 million for luxury cars under Section 22(13).'
    ],
    statutory_rates_or_penalties: 'Standard tax depreciation allowances deductible from gross business revenue.',
    practical_notes: 'Tax depreciation differs from accounting depreciation (IFRS/IAS). Maintain a distinct Tax Depreciation Schedule to substantiate additions, disposals, and tax WDV carried forward.',
    cross_references: ['Section 22 (Depreciation)', 'Section 23 (Initial Allowance)', 'Section 24 (Amortization)'],
    fbr_precedents_and_circulars: 'Income Tax Rules Rule 29 (Depreciation Ledgers).'
  },
  {
    id: 'ito-sched-seventh',
    act_type: 'Income Tax Ordinance, 2001',
    chapter: 'Schedules to ITO 2001',
    part_division: 'Third to Fifteenth Schedules',
    section_code: 'Seventh Schedule',
    title: 'Rules for Computation of Profits of Banking Companies & ADR Surcharges',
    description: 'Specialized accounting and tax rules governing commercial banks, statutory provisioning for non-performing loans (NPLs), capital gain on sovereign bonds (PIBs/T-Bills), and additional punitive tax for low Advance-to-Deposit (ADR) ratios.',
    sub_sections: [
      'Rule 1: Tax rate on banking companies: 39% (standard 29% + 10% super tax).',
      'Rule 6C: Punitive tax rate up to 49% on income from Federal Government securities where gross ADR falls below 50%.',
      'Rule 3: Deductibility of classified loan provisions subject to 1% of total advances ceiling.'
    ],
    statutory_rates_or_penalties: 'Effective corporate tax rate for banks: 39% to 49%.',
    practical_notes: 'Banks actively calibrate private sector lending before December 31st each year to maintain ADR above 50% and avoid the 10% Section 6C punitive tax bracket.',
    cross_references: ['Section 100A', 'First Schedule Division IIA', 'State Bank Banking Regulations'],
    fbr_precedents_and_circulars: '2024 PTD 550 (High Court challenges on retrospective application of ADR tax).'
  },
  {
    id: 'ito-sched-eleventh',
    act_type: 'Income Tax Ordinance, 2001',
    chapter: 'Schedules to ITO 2001',
    part_division: 'Third to Fifteenth Schedules',
    section_code: 'Eleventh Schedule',
    title: 'Special Tax Regime for Builders and Real Estate Developers',
    description: 'Sets out fixed square foot and square yard tax rates on construction and development of residential, commercial, and industrial buildings in major metropolitan areas.',
    sub_sections: [
      'Commercial Buildings: Fixed PKR 250 per sq ft (Karachi/Lahore/Islamabad) / PKR 210 per sq ft (Other cities).',
      'Residential Buildings: Fixed PKR 80 to 125 per sq ft.',
      'Land Development: Fixed PKR 150 per sq yard for commercial plots / PKR 100 per sq yard for residential plots.',
      'Low-Cost Housing (Naya Pakistan Housing): 90% tax reduction on certified affordable projects.'
    ],
    statutory_rates_or_penalties: 'Fixed per-square-foot tax in full discharge of project liability.',
    practical_notes: 'Project-by-project separate accounting required. Books of accounts must track exact carpet area built and approved building control authority layout plans.',
    cross_references: ['Section 100D', 'Section 120', 'Income Tax Rules Rule 27A-27Q'],
    fbr_precedents_and_circulars: 'FBR Builders and Developers Taxation Circular 06 of 2021.'
  },
  {
    id: 'ito-sched-fourteenth',
    act_type: 'Income Tax Ordinance, 2001',
    chapter: 'Schedules to ITO 2001',
    part_division: 'Third to Fifteenth Schedules',
    section_code: 'Fourteenth Schedule',
    title: 'Rules for Computation of Tax on Small & Medium Enterprises (SMEs)',
    description: 'Simplified, concessionary tax regime for manufacturing sector Small and Medium Enterprises (SMEs) with gross turnover up to PKR 250 million, offering choice between normal tax on net profit or fixed turnover tax.',
    sub_sections: [
      'Category 1 SME (Turnover up to PKR 100 Million): Normal Tax Regime at 7.5% on net taxable profit OR Final Turnover Tax at 0.25% of gross turnover.',
      'Category 2 SME (Turnover between PKR 100 Million and PKR 250 Million): Normal Tax Regime at 15% on net taxable profit OR Final Turnover Tax at 0.5% of gross turnover.',
      'Mandatory registration on SMEDA SME portal to qualify for Fourteenth Schedule tax cuts.',
      'Complete exemption from Section 113 turnover tax and Section 147 quarterly advance tax compliance.'
    ],
    statutory_rates_or_penalties: 'Reduced rates: 7.5% / 15% on profit OR 0.25% / 0.5% on gross turnover.',
    practical_notes: 'Huge tax advantage for emerging industrial manufacturers: Standard 29% corporate rate is slashed to 7.5% or 15%, providing vital working capital savings.',
    cross_references: ['Section 100E', 'Section 113 (Exemption)', 'SMEDA SME Policy 2021'],
    fbr_precedents_and_circulars: 'FBR SME Taxation Rules & Circular No. 05 of 2021.'
  }
];
