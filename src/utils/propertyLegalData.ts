export interface PropertyStatuteItem {
  id: string;
  act_name: string;
  category: 'Income Tax Ordinance 2001' | 'Capital Value Tax (CVT) 2022' | 'Stamp Act & Registration Laws' | 'Appellate Case Laws' | 'Iris 2.0 Compliance';
  section_code: string;
  title: string;
  effective_rate_summary: string;
  sub_sections: { clause: string; text: string }[];
  statutory_purpose: string;
  practical_notes: string;
  withholding_agent_duty: string;
  penalties_and_consequences: string;
  landmark_judgments: { citation: string; court: string; year: number; summary: string }[];
  cross_references: string[];
}

export const PROPERTY_STATUTE_DIRECTORY: PropertyStatuteItem[] = [
  {
    id: 'sec-236c',
    act_name: 'Income Tax Ordinance, 2001',
    category: 'Income Tax Ordinance 2001',
    section_code: 'Section 236C',
    title: 'Advance Tax on Sale or Transfer of Immovable Property',
    effective_rate_summary: 'Active Filer: 3% (≤50M), 3.5% (50M-100M), 4% (>100M) | Late Filer: 6% to 8% | Non-Filer: 10% to 12%',
    sub_sections: [
      {
        clause: '236C(1)',
        text: 'Any person responsible for registering, recording or attesting transfer of any immovable property shall at the time of registering, recording or attesting the transfer collect from the seller or transferor advance tax at the rate specified in Division X of Part IV of the First Schedule.'
      },
      {
        clause: '236C(2)',
        text: 'The advance tax collected under sub-section (1) shall be adjustable against the overall tax liability of the seller or transferor for the tax year in which the sale or transfer is executed.'
      },
      {
        clause: '236C(3)',
        text: 'Where the seller or transferor is a non-resident individual holding a Pakistan Origin Card (POC) or National Identity Card for Overseas Pakistanis (NICOP) acquiring property through Roshan Digital Account (RDA) or foreign currency remittance channel, advance tax under this section shall be final tax subject to FBR notifications.'
      },
      {
        clause: '236C(4)',
        text: 'No registering authority, housing society, development authority, or cooperative entity shall register, record, or attest any transfer unless proof of payment of tax under this section along with Section 7E compliance certificate is furnished.'
      }
    ],
    statutory_purpose: 'Enforces immediate withholding collection from the seller at the point of conveyance and creates an automated audit trail for capital gains tax assessment under Section 37(1A).',
    practical_notes: 'Section 236C applies on the gross recorded consideration or the FBR table valuation, whichever is higher. For housing societies (such as DHA, Bahria Town, CDA, LDA), transfer certificates cannot be issued without verified CPR (Computerized Payment Receipt) under Section 236C.',
    withholding_agent_duty: 'Sub-Registrars, Revenue Officers, Housing Societies, and Land Authorities are designated Withholding Agents under Section 236C read with Section 161. Failure to collect or deposit renders the registering authority personally liable for tax recovery plus default surcharge at 12% p.a. under Section 205.',
    penalties_and_consequences: 'Non-filers are subject to Tenth Schedule enhanced rates (up to 12%). Attempting transfer without paying 236C renders the transaction voidable and triggers recovery proceedings under Sections 138, 140, and 161.',
    landmark_judgments: [
      {
        citation: '2023 PTD 1450',
        court: 'Lahore High Court',
        year: 2023,
        summary: 'Held that Section 236C advance tax is strictly adjustable against final assessment and cannot be treated as minimum or final tax unless explicitly stipulated under special schemes.'
      },
      {
        citation: '2022 SCMR 1890',
        court: 'Supreme Court of Pakistan',
        year: 2022,
        summary: 'Affirmed that housing societies and private developers fall within the statutory ambit of registering/attesting authorities bound to collect 236C.'
      }
    ],
    cross_references: ['Section 37(1A) (Capital Gains)', 'Section 7E (Deemed Rental Income)', 'Section 161 (Failure to Collect)', 'Division X, Part IV, First Schedule']
  },
  {
    id: 'sec-236k',
    act_name: 'Income Tax Ordinance, 2001',
    category: 'Income Tax Ordinance 2001',
    section_code: 'Section 236K',
    title: 'Advance Tax on Purchase of Immovable Property',
    effective_rate_summary: 'Active Filer: 3% (≤50M), 3.5% (50M-100M), 4% (>100M) | Late Filer: 6% to 8% | Non-Filer: 10.5% to 15%',
    sub_sections: [
      {
        clause: '236K(1)',
        text: 'Any person responsible for registering, recording or attesting transfer of any immovable property shall at the time of registering, recording or attesting the transfer collect from the purchaser or transferee advance tax at the rate specified in Division XVIII of Part IV of the First Schedule.'
      },
      {
        clause: '236K(2)',
        text: 'The advance tax collected under sub-section (1) shall be adjustable against the income tax liability of the purchaser for the tax year.'
      },
      {
        clause: '236K(3)',
        text: 'Where the purchaser is a non-filer, the collecting authority shall collect tax at the enhanced rates mandated under Rule 1 of the Tenth Schedule (10.5% to 15% progressive).'
      },
      {
        clause: '236K(4)',
        text: 'Installment schemes: In case of property purchased through periodic installments from housing developers or government schemes, tax under this section shall be collected pro-rata with each installment payment.'
      }
    ],
    statutory_purpose: 'Acts as an upfront documentation gatekeeper for wealth reconciliation under Section 111 (unexplained income/assets) and enforces active tax filing compliance.',
    practical_notes: 'Advance tax under Section 236K is fully adjustable in the buyer’s annual income tax return (Iris Form 114). The CPR must be retained for wealth statement reconciliation under Section 116.',
    withholding_agent_duty: 'Housing builders, town developers, registrar offices, and land revenue authorities must deposit collected 236K within 7 days of collection via PSID / CPR.',
    penalties_and_consequences: 'Purchasing property as a non-filer incurs punitive 10.5% - 15% withholding, which cannot be adjusted until tax returns for the relevant years are filed.',
    landmark_judgments: [
      {
        citation: '2023 CLD 920',
        court: 'Sindh High Court',
        year: 2023,
        summary: 'Clarified that 236K is levied on the FBR valuation table or DC rate whichever is higher, and private sale agreements cannot suppress the valuation base.'
      },
      {
        citation: '2021 PTD 670',
        court: 'Islamabad High Court',
        year: 2021,
        summary: 'Held that advance tax under Section 236K paid on installment plots must be allowed as an adjustable credit across consecutive financial tax years.'
      }
    ],
    cross_references: ['Section 111 (Unexplained Wealth)', 'Section 116 (Wealth Statement)', 'Tenth Schedule Rule 1', 'Division XVIII, Part IV, First Schedule']
  },
  {
    id: 'sec-7e',
    act_name: 'Income Tax Ordinance, 2001',
    category: 'Income Tax Ordinance 2001',
    section_code: 'Section 7E',
    title: 'Tax on Deemed Income from Immovable Property',
    effective_rate_summary: 'Deemed Income: 5% of FMV | Tax Rate: 20% on Deemed Income (= Effective 1% of FMV) | Threshold: > PKR 25M',
    sub_sections: [
      {
        clause: '7E(1)',
        text: 'For tax year 2022 and onwards, a tax shall be imposed at the rate specified in Division VIIIC of Part I of the First Schedule on the deemed income arising to every resident person from immovable property situated in Pakistan.'
      },
      {
        clause: '7E(2)(a)',
        text: 'Exemption: One capital asset (residential house/apartment) owned and occupied by the resident individual as primary residence is fully exempt.'
      },
      {
        clause: '7E(2)(c)',
        text: 'Exemption: Self-cultivated agricultural land or rural farm property excluding farmhouses.'
      },
      {
        clause: '7E(2)(d)',
        text: 'Exemption: Where the fair market value of all immovable properties owned by the person (excluding exempt assets) does not exceed twenty-five million rupees (PKR 25,000,000) in aggregate.'
      },
      {
        clause: '7E(2)(e)',
        text: 'Exemption: Land under active construction certified by the relevant local development authority or building control authority during the first tax year.'
      },
      {
        clause: '7E(2)(f)',
        text: 'Exemption: Any immovable property in respect of which a court of competent jurisdiction has issued an interim injunction or stay order restraining transfer or alienation.'
      }
    ],
    statutory_purpose: 'Introduced via Finance Act 2022 to discourage speculative unutilized land hoarding, unlock capital into productive sectors, and generate direct wealth tax revenues.',
    practical_notes: 'FBR Circular No. 01 of 2023-24 requires a Section 7E Exemption Certificate issued online via Iris 2.0 (Form 7E) before Sub-Registrars or Housing Authorities can execute any deed of transfer.',
    withholding_agent_duty: 'Transfer authorities are legally prohibited from transferring immovable property unless the seller presents an FBR Iris CPR showing 7E payment or Commissioner Inland Revenue digital exemption certificate under Rule 83AA.',
    penalties_and_consequences: 'Failure to declare assets under Section 7E in Wealth Statement leads to penalty under Section 182 (PKR 25,000 plus 5% of tax for each day of default) and blocking of transfer.',
    landmark_judgments: [
      {
        citation: '2023 PTD 1520',
        court: 'Lahore High Court',
        year: 2023,
        summary: 'Upheld the legislative competence of Federal Parliament to levy tax on deemed income under Entry 47 & 52 of Fourth Schedule to the Constitution, but mandated procedural safeguards for exemption certificates.'
      },
      {
        citation: '2024 SCMR 891',
        court: 'Supreme Court of Pakistan',
        year: 2024,
        summary: 'Supreme Court granted leave to appeal on Section 7E constitutionality and ordered 50% deposit of disputed 7E tax liability as an interim condition for registration in contested appeals.'
      }
    ],
    cross_references: ['Section 7E(2) (Exemption Clauses)', 'Rule 83AA (Iris Form 7E Certificate)', 'Circular No. 01 of 2023-24', 'Division VIIIC, Part I, First Schedule']
  },
  {
    id: 'sec-37a',
    act_name: 'Income Tax Ordinance, 2001',
    category: 'Income Tax Ordinance 2001',
    section_code: 'Section 37(1A) & 37A',
    title: 'Capital Gains on Disposal of Immovable Property',
    effective_rate_summary: 'Open Plots: 15% (<1 yr) down to 0% (>6 yrs) | Constructed: 15% (<1 yr) down to 0% (>4 yrs) | Non-Filers: Double Rates',
    sub_sections: [
      {
        clause: '37(1A)',
        text: 'The gain arising on the disposal of immovable property situated in Pakistan by a person in a tax year shall be chargeable to tax under the head Capital Gains at the rates specified in Division VIII of Part I of the First Schedule.'
      },
      {
        clause: '37(2)',
        text: 'The capital gain shall be computed as the consideration received on disposal of the asset minus the cost of the asset plus any expenditure incurred in connection with acquisition or improvement.'
      },
      {
        clause: '37(3A)',
        text: 'The holding period of the property shall be computed from the date of physical possession or date of registered allotment whichever is earlier.'
      }
    ],
    statutory_purpose: 'Taxes the net realized economic gain on property disposal with progressive holding relief to encourage long-term real estate investments over short-term flips.',
    practical_notes: 'Advance tax collected under Section 236C is fully set off against the capital gains tax liability calculated under Section 37(1A). If 236C exceeds the CGT payable, the excess is refundable or adjustable against other income.',
    withholding_agent_duty: 'Seller must declare capital gains computations in Iris Return (Form 114) under Section 37.',
    penalties_and_consequences: 'Misdeclaring cost basis or suppressing actual sale consideration attracts concealment penalty under Section 111 read with Section 192 (up to 100% of tax evaded).',
    landmark_judgments: [
      {
        citation: '2022 PTD 1100',
        court: 'Appellate Tribunal Inland Revenue (ATIR)',
        year: 2022,
        summary: 'Held that holding period begins on the date of initial provisional allotment where full down-payment was made, not merely from the date of final registered conveyance.'
      }
    ],
    cross_references: ['Section 236C (Advance Set-Off)', 'Section 111 (Concealment)', 'Division VIII, Part I, First Schedule']
  },
  {
    id: 'cvt-2022',
    act_name: 'Capital Value Tax Act, 2022 (Finance Act 2022)',
    category: 'Capital Value Tax (CVT) 2022',
    section_code: 'Section 8, Finance Act 2022',
    title: 'Capital Value Tax on Immovable Assets & High-Value Holdings',
    effective_rate_summary: '1% on Foreign Immovable Assets & Specified Islamabad ICT Immovable Properties',
    sub_sections: [
      {
        clause: 'Sec 8(1)',
        text: 'A capital value tax shall be levied on the capital value of assets specified in the First Schedule to this section for tax year 2022 and subsequent years.'
      },
      {
        clause: 'Sec 8(2)(b)',
        text: 'Immovable property situated in Islamabad Capital Territory (ICT) with value exceeding the prescribed ceiling shall be subject to 1% CVT at the time of registration.'
      },
      {
        clause: 'Sec 8(2)(c)',
        text: 'Foreign assets of resident individuals having value exceeding PKR 100 Million: 1% of the total value declared in the wealth statement.'
      }
    ],
    statutory_purpose: 'Broadens the national tax net on ultra-high net-worth assets and offshore real estate holdings owned by Pakistani tax residents.',
    practical_notes: 'CVT is distinct from Income Tax and is collected by the Sub-Registrar in Islamabad or declared under wealth schedules on Iris 2.0.',
    withholding_agent_duty: 'ICT Revenue Department and Registrar offices must verify CVT payment receipt prior to attestation.',
    penalties_and_consequences: 'Concealment of offshore properties triggers Section 8 recovery alongside Section 111 wealth reconciliation notices.',
    landmark_judgments: [
      {
        citation: '2023 CLD 450',
        court: 'Islamabad High Court',
        year: 2023,
        summary: 'Upheld federal competence to levy Capital Value Tax in Islamabad Capital Territory under Article 142(d) of the Constitution.'
      }
    ],
    cross_references: ['Article 142(d) Constitution of Pakistan', 'Section 116 Foreign Assets Schedule', 'ICT Land Revenue Act']
  },
  {
    id: 'stamp-act-1899',
    act_name: 'The Stamp Act, 1899 & Provincial Registration Acts',
    category: 'Stamp Act & Registration Laws',
    section_code: 'Schedule I & Section 17 Registration Act 1908',
    title: 'Provincial Stamp Duty, Registration & Mutation Fees',
    effective_rate_summary: 'Stamp Duty: 1% - 3% (e-Stamp) | TMA Town Tax: 1% | Reg Fee: 1% / Fixed | Mutation: PKR 1,000 - 1%',
    sub_sections: [
      {
        clause: 'Sec 17(1) Reg Act',
        text: 'Non-testamentary instruments which purport or operate to create, declare, assign, limit or extinguish any right, title or interest in immovable property of value exceeding one hundred rupees are compulsorily registrable.'
      },
      {
        clause: 'Sec 49 Reg Act',
        text: 'No document required by Section 17 to be registered shall affect any immovable property comprised therein or be received as evidence of any transaction affecting such property unless it has been registered.'
      },
      {
        clause: 'Art 23 Stamp Act',
        text: 'Conveyance as defined by Section 2(10) not being a Transfer charged or exempted under No. 62: Stamp Duty payable on e-Stamp portal based on DC valuation table.'
      }
    ],
    statutory_purpose: 'Governs the legal validity, admissibility in court of law, and title conveyance of immovable property across Punjab, Sindh, Khyber Pakhtunkhwa, Balochistan, and ICT.',
    practical_notes: 'E-Stamp challan must be generated through the provincial Board of Revenue portal (e.g. es.punjab.gov.pk or srb.gos.pk). FBR 236C, 236K, and 7E receipts must be physically attached with the stamped deed before the Sub-Registrar.',
    withholding_agent_duty: 'Sub-Registrars must endorse seal of registration only after reconciling e-Stamp transaction ID with FBR IRIS CPR tokens.',
    penalties_and_consequences: 'Unregistered deeds create no legal title against third parties under Section 49 of the Registration Act, 1908.',
    landmark_judgments: [
      {
        citation: '2021 SCMR 1240',
        court: 'Supreme Court of Pakistan',
        year: 2021,
        summary: 'Reiterated that an unregistered agreement to sell or power of attorney does not confer ownership title in immovable property without registered conveyance deed.'
      }
    ],
    cross_references: ['Section 17 & 49 Registration Act 1908', 'Transfer of Property Act 1882 (Sec 54)', 'Provincial e-Stamp Rules']
  }
];

export interface Section7EChecklistItem {
  id: string;
  ruleCode: string;
  title: string;
  description: string;
  requiredEvidence: string;
  irisFormCode: string;
}

export const SECTION_7E_EXEMPTION_CHECKLIST: Section7EChecklistItem[] = [
  {
    id: 'chk-1',
    ruleCode: 'Sec 7E(2)(a)',
    title: 'One Self-Owned Primary Residential House',
    description: 'One residential house or flat owned and occupied as the primary home by the taxpayer.',
    requiredEvidence: 'Electricity/Gas utility bills in taxpayer name, CNIC address match, title deed.',
    irisFormCode: 'Iris 2.0 Form 7E - Exemption Reason: Self Residence (Clause a)'
  },
  {
    id: 'chk-2',
    ruleCode: 'Sec 7E(2)(c)',
    title: 'Self-Cultivated Agricultural Land',
    description: 'Agricultural land utilized for farming, crops, and cultivation (excluding commercial farmhouses).',
    requiredEvidence: 'Fard Malkiat / Khasra Girdawari issued by Patwari / Land Revenue Officer showing active cultivation.',
    irisFormCode: 'Iris 2.0 Form 7E - Exemption Reason: Agricultural (Clause c)'
  },
  {
    id: 'chk-3',
    ruleCode: 'Sec 7E(2)(d)',
    title: 'Aggregate FMV Value Under PKR 25 Million',
    description: 'Where total fair market value of all non-exempt immovable properties is below Rs. 25,000,000.',
    requiredEvidence: 'FBR valuation table calculation or registered sale deed showing aggregate valuation < Rs. 25M.',
    irisFormCode: 'Iris 2.0 Form 7E - Exemption Reason: Valuation < 25M (Clause d)'
  },
  {
    id: 'chk-4',
    ruleCode: 'Sec 7E(2)(e)',
    title: 'First Year Certified Construction',
    description: 'Open plot undergoing active construction certified by development authority in 1st tax year.',
    requiredEvidence: 'Approved building plan, completion commencement certificate from CDA/LDA/KDA/DHA.',
    irisFormCode: 'Iris 2.0 Form 7E - Exemption Reason: Construction in Progress (Clause e)'
  },
  {
    id: 'chk-5',
    ruleCode: 'Sec 7E(2)(f)',
    title: 'Active Court Injunction / Stay Order',
    description: 'Property subject to court stay or pending title litigation where alienation is restrained.',
    requiredEvidence: 'Certified copy of High Court / Civil Court interim stay order & memo of writ petition.',
    irisFormCode: 'Iris 2.0 Form 7E - Exemption Reason: Court Stay (Clause f)'
  }
];
