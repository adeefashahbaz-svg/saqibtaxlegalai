import {
  PSTProvinceCode,
  PSTSectorRate,
  PSTCalculationResult
} from '../types';

export interface PSTProvinceProfile {
  code: PSTProvinceCode;
  name: string;
  authority: string;
  portalUrl: string;
  statute: string;
  standardRate: number; // e.g. 16, 15
  paymentDeadline: string;
  returnDeadline: string;
  withholdingStatute: string;
  sectors: PSTSectorRate[];
}

export const PST_PROVINCES_DATA: Record<PSTProvinceCode, PSTProvinceProfile> = {
  PRA: {
    code: 'PRA',
    name: 'Punjab',
    authority: 'Punjab Revenue Authority (PRA)',
    portalUrl: 'https://pra.punjab.gov.pk',
    statute: 'Punjab Sales Tax on Services Act, 2012 (Second Schedule)',
    standardRate: 16,
    paymentDeadline: '15th of each following calendar month',
    returnDeadline: '18th of each following calendar month',
    withholdingStatute: 'Punjab Sales Tax on Services (Withholding) Rules, 2015',
    sectors: [
      {
        id: 'pra_it_software',
        sectorName: 'IT & Software Development / SaaS Consultancy',
        category: 'Information Technology',
        standardRate: 0,
        concessionRate: 0,
        withholdingRate: 0,
        withholdingAgentRule: '0% Exempt on software exports & local development without input tax adjustment.',
        statutoryRef: 'Second Schedule Tariff Heading 98.12 (Exemption SRO 2024)',
        inputTaxAdjustable: false,
        notes: '0% exemption provided for export and local digital services; 5% concession without input tax adjustment.'
      },
      {
        id: 'pra_telecom',
        sectorName: 'Telecommunication & Cellular Services',
        category: 'Telecommunications',
        standardRate: 19.5,
        withholdingRate: 19.5,
        withholdingAgentRule: 'Full tax withheld at source for corporate telecom billings.',
        statutoryRef: 'Second Schedule Tariff Heading 98.12',
        inputTaxAdjustable: true,
        notes: 'Statutory 19.5% PST on cellular voice, SMS, data and interconnect bandwidth.'
      },
      {
        id: 'pra_construction',
        sectorName: 'Construction, Civil Works & EPC Turnkey Projects',
        category: 'Engineering & Construction',
        standardRate: 16,
        concessionRate: 5,
        withholdingRate: 5,
        withholdingAgentRule: 'Withholding agents must deduct 5% from gross payment without input tax.',
        statutoryRef: 'Second Schedule Tariff Heading 98.14',
        inputTaxAdjustable: true,
        notes: 'Standard 16% with input tax credit OR 5% reduced rate without input tax claim.'
      },
      {
        id: 'pra_hospitality',
        sectorName: 'Hotels, Clubs, Caterers & Restaurants',
        category: 'Hospitality & Food',
        standardRate: 16,
        concessionRate: 5,
        withholdingRate: 16,
        withholdingAgentRule: 'POS integration mandatory; 5% concession on digital/card payments.',
        statutoryRef: 'Second Schedule Tariff Heading 98.01',
        inputTaxAdjustable: true,
        notes: 'Standard 16% on cash dining; reduced 5% rate for customers paying via debit/credit cards or digital wallets.'
      },
      {
        id: 'pra_consultancy',
        sectorName: 'Legal, Accounting, Management & Technical Consultancy',
        category: 'Professional Services',
        standardRate: 16,
        withholdingRate: 16,
        withholdingAgentRule: 'Registered withholding agents deduct full PST if consultant is non-filer.',
        statutoryRef: 'Second Schedule Tariff Heading 98.18',
        inputTaxAdjustable: true,
        notes: 'Standard 16% on corporate consulting, advisory, audit and tax representation.'
      },
      {
        id: 'pra_advertising',
        sectorName: 'Advertising Agents & Digital Media Placement',
        category: 'Media & Marketing',
        standardRate: 16,
        withholdingRate: 16,
        withholdingAgentRule: '100% withholding by corporate advertisers on payment to agencies.',
        statutoryRef: 'Second Schedule Tariff Heading 98.05',
        inputTaxAdjustable: true,
        notes: 'Standard 16% on TV, print, radio, billboard, and programmatic digital advertising.'
      },
      {
        id: 'pra_freight',
        sectorName: 'Freight Forwarding, Logistics & Goods Transport',
        category: 'Transport & Logistics',
        standardRate: 16,
        concessionRate: 4,
        withholdingRate: 4,
        withholdingAgentRule: '4% withholding by manufacturing and commercial cargo consignors.',
        statutoryRef: 'Second Schedule Tariff Heading 98.36',
        inputTaxAdjustable: false,
        notes: 'Option to pay 4% fixed rate without input tax credit for multimodal transport.'
      },
      {
        id: 'pra_franchise',
        sectorName: 'Franchise Services, Royalty & Technical Know-How',
        category: 'Intellectual Property',
        standardRate: 16,
        withholdingRate: 16,
        withholdingAgentRule: 'Resident franchise payer must withhold 100% tax prior to remittance.',
        statutoryRef: 'Second Schedule Tariff Heading 98.23',
        inputTaxAdjustable: true,
        notes: 'Standard 16% on brand royalty, franchise fees, technical collaboration payments.'
      }
    ]
  },
  SRB: {
    code: 'SRB',
    name: 'Sindh',
    authority: 'Sindh Revenue Board (SRB)',
    portalUrl: 'https://srb.gos.pk',
    statute: 'Sindh Sales Tax on Services Act, 2011 (Second Schedule)',
    standardRate: 15,
    paymentDeadline: '15th of each following calendar month',
    returnDeadline: '18th of each following calendar month',
    withholdingStatute: 'Sindh Sales Tax Special Procedure (Withholding) Rules, 2014',
    sectors: [
      {
        id: 'srb_it_software',
        sectorName: 'IT Enabled Services & Software Development',
        category: 'Information Technology',
        standardRate: 13,
        concessionRate: 3,
        withholdingRate: 3,
        withholdingAgentRule: '3% reduced rate for call centers and IT exports without input tax.',
        statutoryRef: 'Second Schedule Tariff Heading 98.15',
        inputTaxAdjustable: false,
        notes: 'Standard rate 13%; special incentive rate of 3% for registered IT exporters and software labs.'
      },
      {
        id: 'srb_telecom',
        sectorName: 'Telecommunication Services',
        category: 'Telecommunications',
        standardRate: 19.5,
        withholdingRate: 19.5,
        withholdingAgentRule: '19.5% PST collected on telco usage.',
        statutoryRef: 'Second Schedule Tariff Heading 98.12',
        inputTaxAdjustable: true,
        notes: 'Statutory 19.5% on voice, data, broadband, and international incoming termination.'
      },
      {
        id: 'srb_construction',
        sectorName: 'Construction Services & Real Estate Developers',
        category: 'Engineering & Construction',
        standardRate: 15,
        concessionRate: 8,
        withholdingRate: 8,
        withholdingAgentRule: 'Withholding agent must withhold 8% on construction contracts.',
        statutoryRef: 'Second Schedule Tariff Heading 98.24',
        inputTaxAdjustable: true,
        notes: 'Standard 15% with input tax or 8% option without input tax credit.'
      },
      {
        id: 'srb_hospitality',
        sectorName: 'Restaurants, Banquet Halls & Catering Services',
        category: 'Hospitality & Food',
        standardRate: 15,
        concessionRate: 8,
        withholdingRate: 15,
        withholdingAgentRule: 'Reduced rate of 8% on card/POS digital payments; 15% on cash.',
        statutoryRef: 'Second Schedule Tariff Heading 98.01',
        inputTaxAdjustable: true,
        notes: 'Restaurants with SRB POS integration provide 8% discounted rate for cardholders.'
      },
      {
        id: 'srb_port_logistics',
        sectorName: 'Port Handling, Terminal Operations & Stevedoring',
        category: 'Transport & Logistics',
        standardRate: 15,
        withholdingRate: 15,
        withholdingAgentRule: 'Standard withholding applied by shipping lines and port authorities.',
        statutoryRef: 'Second Schedule Tariff Heading 98.19',
        inputTaxAdjustable: true,
        notes: 'Standard 15% on Karachi Port / Port Qasim cargo handling, container terminal services.'
      },
      {
        id: 'srb_consultancy',
        sectorName: 'Management, Legal & Financial Advisory',
        category: 'Professional Services',
        standardRate: 15,
        withholdingRate: 15,
        withholdingAgentRule: '100% withholding on services rendered by non-registered consultants.',
        statutoryRef: 'Second Schedule Tariff Heading 98.18',
        inputTaxAdjustable: true,
        notes: 'Standard 15% rate on corporate advisory, legal and accountancy services.'
      }
    ]
  },
  KPRA: {
    code: 'KPRA',
    name: 'Khyber Pakhtunkhwa',
    authority: 'KP Revenue Authority (KPRA)',
    portalUrl: 'https://kpra.kp.gov.pk',
    statute: 'Khyber Pakhtunkhwa Finance Act, 2013 (Second Schedule)',
    standardRate: 15,
    paymentDeadline: '15th of each following calendar month',
    returnDeadline: '18th of each following calendar month',
    withholdingStatute: 'KPRA Sales Tax on Services Withholding Regulations',
    sectors: [
      {
        id: 'kpra_it_software',
        sectorName: 'IT Consultancy & Software Development',
        category: 'Information Technology',
        standardRate: 2,
        concessionRate: 2,
        withholdingRate: 2,
        withholdingAgentRule: '2% special rate to promote provincial digital economy.',
        statutoryRef: 'KP Finance Act Second Schedule Category 2',
        inputTaxAdjustable: false,
        notes: 'Highly attractive 2% concessionary rate without input tax claim for tech startups.'
      },
      {
        id: 'kpra_telecom',
        sectorName: 'Telecommunication Services',
        category: 'Telecommunications',
        standardRate: 19.5,
        withholdingRate: 19.5,
        withholdingAgentRule: 'Full tax withheld by telecom operators.',
        statutoryRef: 'Category 1 Telecommunication Tariff',
        inputTaxAdjustable: true,
        notes: '19.5% PST on cellular and broadband connectivity.'
      },
      {
        id: 'kpra_tourism',
        sectorName: 'Hotels, Resorts & Tourism Services',
        category: 'Hospitality & Tourism',
        standardRate: 8,
        concessionRate: 5,
        withholdingRate: 8,
        withholdingAgentRule: 'Special tourist region incentives in Swat, Galiyat, Kaghan.',
        statutoryRef: 'Second Schedule Tourism Concession Head',
        inputTaxAdjustable: false,
        notes: '8% standard rate for hotels and 5% for certified eco-tourism lodges.'
      },
      {
        id: 'kpra_construction',
        sectorName: 'Construction & Civil Infrastructure Contracts',
        category: 'Engineering & Construction',
        standardRate: 15,
        concessionRate: 5,
        withholdingRate: 5,
        withholdingAgentRule: '5% withholding on public development contracts.',
        statutoryRef: 'Second Schedule Heading 98.14',
        inputTaxAdjustable: true,
        notes: 'Standard 15% with input adjustment or 5% fixed without input tax credit.'
      },
      {
        id: 'kpra_consultancy',
        sectorName: 'Professional & Business Management Services',
        category: 'Professional Services',
        standardRate: 15,
        withholdingRate: 15,
        withholdingAgentRule: 'Withholding rules apply to corporate entities.',
        statutoryRef: 'Second Schedule Heading 98.18',
        inputTaxAdjustable: true,
        notes: 'Standard 15% rate on technical consultancy.'
      }
    ]
  },
  BRA: {
    code: 'BRA',
    name: 'Balochistan',
    authority: 'Balochistan Revenue Authority (BRA)',
    portalUrl: 'https://bra.gob.pk',
    statute: 'Balochistan Sales Tax on Services Act, 2015 (Second Schedule)',
    standardRate: 15,
    paymentDeadline: '15th of each following calendar month',
    returnDeadline: '18th of each following calendar month',
    withholdingStatute: 'BRA Sales Tax on Services (Withholding) Rules, 2017',
    sectors: [
      {
        id: 'bra_mining_logistics',
        sectorName: 'Mining, Minerals & Coastal Logistics Services',
        category: 'Mining & Logistics',
        standardRate: 15,
        withholdingRate: 15,
        withholdingAgentRule: 'Withheld by mining concessionaires and Gwadar port operators.',
        statutoryRef: 'Second Schedule Heading 98.40',
        inputTaxAdjustable: true,
        notes: '15% on mineral extraction logistics, drilling services and port transit.'
      },
      {
        id: 'bra_telecom',
        sectorName: 'Telecommunication Services',
        category: 'Telecommunications',
        standardRate: 19.5,
        withholdingRate: 19.5,
        withholdingAgentRule: 'Standard 19.5% telecom withholding.',
        statutoryRef: 'Second Schedule Heading 98.12',
        inputTaxAdjustable: true,
        notes: '19.5% PST on telecom networks across Balochistan.'
      },
      {
        id: 'bra_construction',
        sectorName: 'Construction & Civil Engineering Works',
        category: 'Engineering & Construction',
        standardRate: 15,
        concessionRate: 6,
        withholdingRate: 6,
        withholdingAgentRule: '6% withholding by provincial government procurement agencies.',
        statutoryRef: 'Second Schedule Heading 98.14',
        inputTaxAdjustable: true,
        notes: 'Standard 15% with input credit or 6% fixed rate without input credit.'
      },
      {
        id: 'bra_it_software',
        sectorName: 'IT Services & Internet Service Providers',
        category: 'Information Technology',
        standardRate: 15,
        concessionRate: 5,
        withholdingRate: 5,
        withholdingAgentRule: '5% concessionary rate for registered tech enterprises.',
        statutoryRef: 'Second Schedule Heading 98.15',
        inputTaxAdjustable: false,
        notes: 'Incentivized 5% rate for ICT infrastructure adoption.'
      }
    ]
  },
  ICT: {
    code: 'ICT',
    name: 'Islamabad Capital Territory',
    authority: 'Federal Board of Revenue (FBR) - ICT Sales Tax Wing',
    portalUrl: 'https://fbr.gov.pk',
    statute: 'Islamabad Capital Territory (Tax on Services) Ordinance, 2001 (Table-1)',
    standardRate: 15,
    paymentDeadline: '15th of each following calendar month',
    returnDeadline: '18th of each following calendar month',
    withholdingStatute: 'Sales Tax Special Procedure (Withholding) Rules, 2007',
    sectors: [
      {
        id: 'ict_it_software',
        sectorName: 'IT Enabled Services & Software Export',
        category: 'Information Technology',
        standardRate: 0,
        concessionRate: 0,
        withholdingRate: 0,
        withholdingAgentRule: '0% Exempt for software export registered with PSEB.',
        statutoryRef: 'ICT Ordinance Table-1 Heading 98.12',
        inputTaxAdjustable: false,
        notes: '0% on software exports; 5% concession without input tax for domestic IT services.'
      },
      {
        id: 'ict_telecom',
        sectorName: 'Telecommunication Services',
        category: 'Telecommunications',
        standardRate: 19.5,
        withholdingRate: 19.5,
        withholdingAgentRule: '19.5% standard federal telecom PST.',
        statutoryRef: 'ICT Ordinance Table-1 Heading 98.12',
        inputTaxAdjustable: true,
        notes: '19.5% PST applied to Islamabad mobile and internet consumers.'
      },
      {
        id: 'ict_hospitality',
        sectorName: 'Hotels, Motels & Islamabad Restaurants',
        category: 'Hospitality & Food',
        standardRate: 15,
        concessionRate: 5,
        withholdingRate: 15,
        withholdingAgentRule: 'FBR POS integrated units offer 5% on card payments; 15% cash.',
        statutoryRef: 'ICT Ordinance Table-1 Heading 98.01',
        inputTaxAdjustable: true,
        notes: 'Standard 15% or 5% reduced rate for POS digital card receipts.'
      },
      {
        id: 'ict_consultancy',
        sectorName: 'Legal, Corporate Advisory & Diplomatic Services',
        category: 'Professional Services',
        standardRate: 15,
        withholdingRate: 15,
        withholdingAgentRule: 'Federal ministries and corporate withholding agents deduct full PST.',
        statutoryRef: 'ICT Ordinance Table-1 Heading 98.18',
        inputTaxAdjustable: true,
        notes: 'Standard 15% on business consulting and legal representation in ICT.'
      },
      {
        id: 'ict_construction',
        sectorName: 'Building Construction & EPC Turnkey Projects',
        category: 'Engineering & Construction',
        standardRate: 15,
        concessionRate: 5,
        withholdingRate: 5,
        withholdingAgentRule: '5% withholding on CDA / Federal government contracts.',
        statutoryRef: 'ICT Ordinance Table-1 Heading 98.14',
        inputTaxAdjustable: true,
        notes: 'Standard 15% with input credit or 5% flat without input adjustment.'
      }
    ]
  }
};

/**
 * Deterministic PST Computation Engine
 */
export function calculatePST(
  provinceCode: PSTProvinceCode,
  sectorId: string,
  serviceValue: number,
  inputTaxClaimed: number = 0,
  useConcessionRate: boolean = false,
  withholdingDeductedPercent: number = 0
): PSTCalculationResult {
  const safeValue = Math.max(0, serviceValue || 0);
  const province = PST_PROVINCES_DATA[provinceCode] || PST_PROVINCES_DATA.PRA;
  const sector = province.sectors.find(s => s.id === sectorId) || province.sectors[0];

  const applicableRate = (useConcessionRate && sector.concessionRate !== undefined)
    ? sector.concessionRate
    : sector.standardRate;

  // 1. Base Output PST
  const baseOutputPst = Math.round((safeValue * applicableRate) / 100);

  // 2. Input Tax Adjustment
  let admissibleInputTax = 0;
  if (sector.inputTaxAdjustable && !useConcessionRate && inputTaxClaimed > 0) {
    // Provincial rules cap input tax at 80% - 90% of output tax
    const capLimit = Math.round(baseOutputPst * 0.90);
    admissibleInputTax = Math.min(inputTaxClaimed, capLimit);
  }

  // 3. Withholding Tax Deducted at Source by Buyer
  const safeWhtRate = Math.min(100, Math.max(0, withholdingDeductedPercent));
  const withholdingDeductedByClient = Math.round((baseOutputPst * safeWhtRate) / 100);

  // 4. Net PST Payable to Provincial Treasury (PRA / SRB / KPRA / BRA / ICT)
  const netPstPayableToProvince = Math.max(
    0,
    baseOutputPst - admissibleInputTax - withholdingDeductedByClient
  );

  // 5. Total Tax Invoice Amount charged to client
  const totalInvoiceAmount = safeValue + baseOutputPst;

  const citations: string[] = [
    province.statute,
    sector.statutoryRef,
    province.withholdingStatute,
    `Provincial e-Payment Deadline: ${province.paymentDeadline}`,
    `Provincial Return Submission Deadline: ${province.returnDeadline}`
  ];

  return {
    province: provinceCode,
    provinceName: province.name,
    authorityName: province.authority,
    statuteTitle: province.statute,
    serviceSector: sector.sectorName,
    serviceValue: safeValue,
    pstRate: applicableRate,
    baseOutputPst,
    withholdingDeductedByClient,
    inputTaxPaidOnPurchases: inputTaxClaimed,
    admissibleInputTax,
    netPstPayableToProvince,
    totalInvoiceAmount,
    returnFilingDeadline: province.returnDeadline,
    withholdingDeadline: province.paymentDeadline,
    statutoryCitations: citations
  };
}
