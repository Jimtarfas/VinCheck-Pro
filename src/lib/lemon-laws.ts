/**
 * State-by-state lemon law reference data for the /lemon-check tool.
 *
 * All thresholds are summarised from publicly available state consumer
 * protection statutes (e.g. California's Song-Beverly Consumer Warranty Act,
 * New York's GBL § 198-a, Florida's Motor Vehicle Warranty Enforcement Act).
 * They are educational summaries — actual legal eligibility depends on the
 * exact statute, attorney general regulations, and case-by-case facts.
 * Always confirm with the state Attorney General's office or a qualified
 * lemon-law attorney before relying on these for a claim.
 */

export interface LemonLaw {
  state: string;
  abbr: string;
  /** Approximate eligibility window from delivery */
  coveragePeriod: string;
  /** Typical repair-attempt or days-out-of-service threshold */
  repairAttempts: string;
  /** Whether the state extends some statutory lemon protection to used cars */
  usedCarCoverage: "Yes" | "Limited" | "No";
  /** Whether a manufacturer-buyback / lemon brand must be carried on the title */
  disclosureRequired: "Yes" | "Limited" | "No";
  /** Title brand language used in this jurisdiction (informational) */
  brandTerm: string;
  /** Short factual summary for the expandable row */
  summary: string;
}

export const LEMON_LAWS: LemonLaw[] = [
  {
    state: "Alabama",
    abbr: "AL",
    coveragePeriod: "1 year / 12,000 mi",
    repairAttempts: "3 attempts or 30 days out of service",
    usedCarCoverage: "No",
    disclosureRequired: "Yes",
    brandTerm: "Manufacturer Buyback",
    summary:
      "Alabama's lemon law (Ala. Code § 8-20A) covers new vehicles for the first 12 months or 12,000 miles. Manufacturer must be given a reasonable opportunity to repair — typically 3 attempts at the same defect or 30 cumulative days out of service.",
  },
  {
    state: "Alaska",
    abbr: "AK",
    coveragePeriod: "1 year / 12,000 mi",
    repairAttempts: "3 attempts or 30 days out of service",
    usedCarCoverage: "No",
    disclosureRequired: "Yes",
    brandTerm: "Lemon Law Buyback",
    summary:
      "Alaska Stat. § 45.45.300 covers new vehicles purchased or leased in Alaska. The manufacturer must repurchase or replace after a reasonable number of repair attempts within the first year.",
  },
  {
    state: "Arizona",
    abbr: "AZ",
    coveragePeriod: "2 years / 24,000 mi",
    repairAttempts: "4 attempts or 30 days out of service",
    usedCarCoverage: "Limited",
    disclosureRequired: "Yes",
    brandTerm: "Manufacturer Buyback",
    summary:
      "Arizona Rev. Stat. § 44-1261 covers new passenger vehicles during the manufacturer's express warranty or the first 2 years / 24,000 miles, whichever comes first. Limited used-car protection exists for buyers of cars still under the original warranty.",
  },
  {
    state: "Arkansas",
    abbr: "AR",
    coveragePeriod: "2 years / 24,000 mi",
    repairAttempts: "3 attempts (or 1 for safety) or 30 days",
    usedCarCoverage: "No",
    disclosureRequired: "Yes",
    brandTerm: "Manufacturer Buyback",
    summary:
      "Arkansas Code § 4-90-401 covers new vehicles during the lemon-law rights period. A single failed repair attempt is enough for a 'serious safety defect' such as steering or brakes.",
  },
  {
    state: "California",
    abbr: "CA",
    coveragePeriod: "18 months / 18,000 mi (Tanner presumption)",
    repairAttempts: "2 (safety) / 4 (other) or 30 days",
    usedCarCoverage: "Yes",
    disclosureRequired: "Yes",
    brandTerm: "Lemon Law Buyback (decal required)",
    summary:
      "California's Song-Beverly Consumer Warranty Act and the Tanner Consumer Protection Act provide some of the strongest protections in the US. Used cars sold with a manufacturer warranty are also covered. A 'Lemon Law Buyback' decal must be permanently affixed to the door jamb of any reacquired vehicle.",
  },
  {
    state: "Colorado",
    abbr: "CO",
    coveragePeriod: "1 year",
    repairAttempts: "4 attempts or 30 days out of service",
    usedCarCoverage: "No",
    disclosureRequired: "Yes",
    brandTerm: "Manufacturer Buyback",
    summary:
      "Colorado Rev. Stat. § 42-10-101 covers new motor vehicles during the warranty period or the first year. Mandatory binding arbitration through the manufacturer's program is typically required before suit.",
  },
  {
    state: "Connecticut",
    abbr: "CT",
    coveragePeriod: "2 years / 24,000 mi",
    repairAttempts: "4 attempts or 30 days",
    usedCarCoverage: "Yes",
    disclosureRequired: "Yes",
    brandTerm: "Lemon Law Vehicle",
    summary:
      "Connecticut Gen. Stat. § 42-179 was the first state lemon law (1982). It also has one of the few used-car lemon laws in the US, covering dealer-sold used cars under $40,000 with mileage caps.",
  },
  {
    state: "Delaware",
    abbr: "DE",
    coveragePeriod: "1 year",
    repairAttempts: "3 attempts or 30 days",
    usedCarCoverage: "No",
    disclosureRequired: "Yes",
    brandTerm: "Manufacturer Buyback",
    summary:
      "Delaware Code Title 6 § 5001 covers new motor vehicles for the warranty term or first year of operation, whichever is shorter.",
  },
  {
    state: "District of Columbia",
    abbr: "DC",
    coveragePeriod: "2 years / 18,000 mi",
    repairAttempts: "4 attempts or 30 days",
    usedCarCoverage: "Limited",
    disclosureRequired: "Yes",
    brandTerm: "Manufacturer Buyback",
    summary:
      "D.C. Code § 50-501 covers new vehicles for the first 2 years or 18,000 miles. Limited protection extends to used cars sold by licensed dealers.",
  },
  {
    state: "Florida",
    abbr: "FL",
    coveragePeriod: "24 months",
    repairAttempts: "3 attempts or 15 days (safety) / 30 days (other)",
    usedCarCoverage: "No",
    disclosureRequired: "Yes",
    brandTerm: "Manufacturer Buyback",
    summary:
      "Florida's Motor Vehicle Warranty Enforcement Act (§ 681.10) covers new and demonstrator vehicles for 24 months from delivery. Florida operates a state-administered arbitration program (the Florida New Motor Vehicle Arbitration Board).",
  },
  {
    state: "Georgia",
    abbr: "GA",
    coveragePeriod: "1 year / 12,000 mi",
    repairAttempts: "3 attempts (1 for safety) or 30 days",
    usedCarCoverage: "No",
    disclosureRequired: "Yes",
    brandTerm: "Manufacturer Buyback",
    summary:
      "Georgia Code § 10-1-780 covers new motor vehicles for 1 year / 12,000 miles. Vehicles sold as resold lemons must carry a permanent title brand.",
  },
  {
    state: "Hawaii",
    abbr: "HI",
    coveragePeriod: "2 years / 24,000 mi",
    repairAttempts: "3 attempts or 30 days",
    usedCarCoverage: "Limited",
    disclosureRequired: "Yes",
    brandTerm: "Lemon Law Buyback",
    summary:
      "Hawaii Rev. Stat. § 481I-1 covers new vehicles for 2 years or 24,000 miles. State Office of Consumer Protection runs the certified arbitration program.",
  },
  {
    state: "Idaho",
    abbr: "ID",
    coveragePeriod: "2 years / 24,000 mi",
    repairAttempts: "4 attempts or 30 days",
    usedCarCoverage: "No",
    disclosureRequired: "Yes",
    brandTerm: "Manufacturer Buyback",
    summary:
      "Idaho Code § 48-901 covers new motor vehicles purchased in the state during the warranty period or the first 24,000 miles / 2 years.",
  },
  {
    state: "Illinois",
    abbr: "IL",
    coveragePeriod: "12 months / 12,000 mi",
    repairAttempts: "4 attempts or 30 days",
    usedCarCoverage: "No",
    disclosureRequired: "Yes",
    brandTerm: "Manufacturer Buyback",
    summary:
      "Illinois 815 ILCS 380 covers new vehicles for the statutory warranty period. Manufacturers must repurchase or replace if the same defect persists after 4 repair attempts.",
  },
  {
    state: "Indiana",
    abbr: "IN",
    coveragePeriod: "18 months / 18,000 mi",
    repairAttempts: "4 attempts or 30 days",
    usedCarCoverage: "No",
    disclosureRequired: "Yes",
    brandTerm: "Manufacturer Buyback",
    summary:
      "Indiana Code § 24-5-13 covers new vehicles for the manufacturer's warranty term or 18 months / 18,000 miles, whichever ends first.",
  },
  {
    state: "Iowa",
    abbr: "IA",
    coveragePeriod: "2 years / 24,000 mi",
    repairAttempts: "3 attempts or 20 days",
    usedCarCoverage: "No",
    disclosureRequired: "Yes",
    brandTerm: "Manufacturer Buyback",
    summary:
      "Iowa Code § 322G.1 covers new vehicles for 2 years or 24,000 miles. Iowa has one of the shortest 'days out of service' thresholds in the country (20 days).",
  },
  {
    state: "Kansas",
    abbr: "KS",
    coveragePeriod: "1 year / 12,000 mi",
    repairAttempts: "4 attempts (1 for safety) or 30 days",
    usedCarCoverage: "No",
    disclosureRequired: "Yes",
    brandTerm: "Manufacturer Buyback",
    summary:
      "Kansas Stat. § 50-645 covers new vehicles for the first year or 12,000 miles. A single repair attempt suffices for a safety-related defect such as brakes or steering.",
  },
  {
    state: "Kentucky",
    abbr: "KY",
    coveragePeriod: "1 year / 12,000 mi",
    repairAttempts: "4 attempts or 30 days",
    usedCarCoverage: "No",
    disclosureRequired: "Yes",
    brandTerm: "Manufacturer Buyback",
    summary:
      "Kentucky Rev. Stat. § 367.840 covers new motor vehicles for the warranty period or first year / 12,000 miles. Kentucky operates a state-administered arbitration program.",
  },
  {
    state: "Louisiana",
    abbr: "LA",
    coveragePeriod: "1 year / warranty term",
    repairAttempts: "4 attempts or 90 days",
    usedCarCoverage: "No",
    disclosureRequired: "Yes",
    brandTerm: "Warranty Return",
    summary:
      "Louisiana Rev. Stat. § 51:1941 covers new motor vehicles. Louisiana uses an unusually long 90-day out-of-service threshold, but the consecutive-day count is what triggers eligibility.",
  },
  {
    state: "Maine",
    abbr: "ME",
    coveragePeriod: "3 years / 18,000 mi",
    repairAttempts: "3 attempts or 15 days",
    usedCarCoverage: "No",
    disclosureRequired: "Yes",
    brandTerm: "Manufacturer Buyback",
    summary:
      "Maine Rev. Stat. tit. 10 § 1163 offers one of the longest coverage periods in the country (3 years) and the shortest out-of-service window (15 business days).",
  },
  {
    state: "Maryland",
    abbr: "MD",
    coveragePeriod: "24 months / 18,000 mi",
    repairAttempts: "4 attempts (1 for brakes/steering) or 30 days",
    usedCarCoverage: "No",
    disclosureRequired: "Yes",
    brandTerm: "Manufacturer Buyback",
    summary:
      "Maryland Commercial Law § 14-1501 covers new vehicles for 24 months or 18,000 miles. A single failed brake or steering repair attempt is enough.",
  },
  {
    state: "Massachusetts",
    abbr: "MA",
    coveragePeriod: "1 year / 15,000 mi (new) · used-car program separate",
    repairAttempts: "3 attempts or 15 business days",
    usedCarCoverage: "Yes",
    disclosureRequired: "Yes",
    brandTerm: "Lemon Aid (used) / Lemon Law Buyback (new)",
    summary:
      "Massachusetts (M.G.L. c. 90 § 7N½) has both a new-car lemon law and a separately-codified used-car lemon law that covers dealer sales for 30–90 days depending on mileage. One of the most consumer-friendly states in the US.",
  },
  {
    state: "Michigan",
    abbr: "MI",
    coveragePeriod: "1 year",
    repairAttempts: "4 attempts or 30 days",
    usedCarCoverage: "No",
    disclosureRequired: "Yes",
    brandTerm: "Manufacturer Buyback",
    summary:
      "Michigan MCL § 257.1401 covers new vehicles in their first year. The state's Attorney General runs an informal complaint-resolution program before litigation.",
  },
  {
    state: "Minnesota",
    abbr: "MN",
    coveragePeriod: "2 years / warranty term",
    repairAttempts: "4 attempts (1 for safety) or 30 days",
    usedCarCoverage: "No",
    disclosureRequired: "Yes",
    brandTerm: "Manufacturer Buyback (Prior Lemon Law Vehicle)",
    summary:
      "Minnesota Stat. § 325F.665 covers new vehicles during the express warranty period or 2 years, whichever is shorter. Resold buybacks must carry the 'Prior Lemon Law Vehicle' label.",
  },
  {
    state: "Mississippi",
    abbr: "MS",
    coveragePeriod: "1 year / 12,000 mi",
    repairAttempts: "3 attempts or 15 days",
    usedCarCoverage: "No",
    disclosureRequired: "Yes",
    brandTerm: "Manufacturer Buyback",
    summary:
      "Mississippi Code § 63-17-159 covers new vehicles for the first year. The 15-day out-of-service threshold is shorter than the 30-day standard used by most states.",
  },
  {
    state: "Missouri",
    abbr: "MO",
    coveragePeriod: "1 year / warranty term",
    repairAttempts: "4 attempts or 30 days",
    usedCarCoverage: "No",
    disclosureRequired: "Yes",
    brandTerm: "Manufacturer Buyback",
    summary:
      "Missouri Rev. Stat. § 407.560 covers new motor vehicles for the warranty period or first year. Mandatory pre-suit arbitration through manufacturer-sponsored programs is required.",
  },
  {
    state: "Montana",
    abbr: "MT",
    coveragePeriod: "2 years / 18,000 mi",
    repairAttempts: "4 attempts or 30 days",
    usedCarCoverage: "No",
    disclosureRequired: "Yes",
    brandTerm: "Manufacturer Buyback",
    summary:
      "Montana Code § 61-4-501 covers new vehicles for 2 years or 18,000 miles. The Montana Department of Justice administers the certified arbitration program.",
  },
  {
    state: "Nebraska",
    abbr: "NE",
    coveragePeriod: "1 year / warranty term",
    repairAttempts: "4 attempts or 40 days",
    usedCarCoverage: "No",
    disclosureRequired: "Yes",
    brandTerm: "Manufacturer Buyback",
    summary:
      "Nebraska Rev. Stat. § 60-2701 covers new motor vehicles within the express warranty period. The 40-day out-of-service threshold is longer than most states.",
  },
  {
    state: "Nevada",
    abbr: "NV",
    coveragePeriod: "1 year / warranty term",
    repairAttempts: "4 attempts or 30 days",
    usedCarCoverage: "No",
    disclosureRequired: "Yes",
    brandTerm: "Manufacturer Buyback",
    summary:
      "Nevada Rev. Stat. § 597.600 covers new motor vehicles for the warranty term or first year. The Nevada Consumer Affairs Division accepts complaints prior to formal proceedings.",
  },
  {
    state: "New Hampshire",
    abbr: "NH",
    coveragePeriod: "Warranty term",
    repairAttempts: "3 attempts (1 for safety) or 30 days",
    usedCarCoverage: "No",
    disclosureRequired: "Yes",
    brandTerm: "Manufacturer Buyback",
    summary:
      "New Hampshire RSA § 357-D covers new vehicles during the manufacturer's express warranty. The state Motor Vehicle Industry Board hears lemon law arbitration cases.",
  },
  {
    state: "New Jersey",
    abbr: "NJ",
    coveragePeriod: "2 years / 24,000 mi",
    repairAttempts: "3 attempts or 20 days",
    usedCarCoverage: "Yes",
    disclosureRequired: "Yes",
    brandTerm: "Lemon Law Buyback",
    summary:
      "New Jersey N.J.S.A. 56:12-29 is one of the strongest lemon laws nationally. NJ also has a separate Used Car Lemon Law that covers dealer-sold used vehicles for 90 days or 3,000 miles depending on age.",
  },
  {
    state: "New Mexico",
    abbr: "NM",
    coveragePeriod: "1 year / warranty term",
    repairAttempts: "4 attempts or 30 days",
    usedCarCoverage: "No",
    disclosureRequired: "Yes",
    brandTerm: "Manufacturer Buyback",
    summary:
      "New Mexico Stat. § 57-16A-1 covers new vehicles for the warranty term or first year. The state Attorney General supervises the complaint process.",
  },
  {
    state: "New York",
    abbr: "NY",
    coveragePeriod: "2 years / 18,000 mi",
    repairAttempts: "4 attempts or 30 days",
    usedCarCoverage: "Yes",
    disclosureRequired: "Yes",
    brandTerm: "Manufacturer Buyback (New) / Used Car Lemon (Used)",
    summary:
      "New York GBL § 198-a is one of the strongest US lemon laws. NY also has a robust Used Car Lemon Law (GBL § 198-b) that requires dealers to provide a statutory warranty on cars sold under 100,000 miles.",
  },
  {
    state: "North Carolina",
    abbr: "NC",
    coveragePeriod: "24 months / 24,000 mi",
    repairAttempts: "4 attempts or 20 business days",
    usedCarCoverage: "No",
    disclosureRequired: "Yes",
    brandTerm: "Manufacturer Buyback",
    summary:
      "North Carolina General Statute § 20-351 covers new vehicles for 24 months or 24,000 miles. The 20-business-day out-of-service window is one of the shorter thresholds.",
  },
  {
    state: "North Dakota",
    abbr: "ND",
    coveragePeriod: "1 year / warranty term",
    repairAttempts: "4 attempts or 30 days",
    usedCarCoverage: "No",
    disclosureRequired: "Yes",
    brandTerm: "Manufacturer Buyback",
    summary:
      "North Dakota Cent. Code § 51-07-16 covers new vehicles within the warranty period. The Attorney General's Consumer Protection Division administers arbitration.",
  },
  {
    state: "Ohio",
    abbr: "OH",
    coveragePeriod: "1 year / 18,000 mi",
    repairAttempts: "3 attempts (1 for safety) or 30 days",
    usedCarCoverage: "No",
    disclosureRequired: "Yes",
    brandTerm: "Manufacturer Buyback",
    summary:
      "Ohio Rev. Code § 1345.71 covers new vehicles for the first year or 18,000 miles. A single failed repair on a serious safety defect can qualify.",
  },
  {
    state: "Oklahoma",
    abbr: "OK",
    coveragePeriod: "1 year / warranty term",
    repairAttempts: "4 attempts or 45 days",
    usedCarCoverage: "No",
    disclosureRequired: "Yes",
    brandTerm: "Manufacturer Buyback",
    summary:
      "Oklahoma Stat. tit. 15 § 901 covers new vehicles for the warranty period. The 45-day out-of-service window is unusually long compared to other states.",
  },
  {
    state: "Oregon",
    abbr: "OR",
    coveragePeriod: "2 years / 24,000 mi",
    repairAttempts: "3 attempts or 30 days",
    usedCarCoverage: "No",
    disclosureRequired: "Yes",
    brandTerm: "Reacquired Vehicle",
    summary:
      "Oregon Rev. Stat. § 646A.400 covers new vehicles for 2 years or 24,000 miles. Oregon uses the term 'Reacquired Vehicle' on title brands.",
  },
  {
    state: "Pennsylvania",
    abbr: "PA",
    coveragePeriod: "1 year / 12,000 mi (or warranty term)",
    repairAttempts: "3 attempts or 30 days",
    usedCarCoverage: "No",
    disclosureRequired: "Yes",
    brandTerm: "Manufacturer Repurchase",
    summary:
      "Pennsylvania 73 P.S. § 1951 covers new vehicles for 1 year / 12,000 miles or the warranty term. The PA Attorney General's Bureau of Consumer Protection administers the lemon-law arbitration program.",
  },
  {
    state: "Rhode Island",
    abbr: "RI",
    coveragePeriod: "1 year / 15,000 mi",
    repairAttempts: "4 attempts or 30 days",
    usedCarCoverage: "Yes",
    disclosureRequired: "Yes",
    brandTerm: "Manufacturer Buyback",
    summary:
      "Rhode Island Gen. Laws § 31-5.2-1 covers new vehicles for 1 year or 15,000 miles. RI also has a used-car lemon law covering dealer sales.",
  },
  {
    state: "South Carolina",
    abbr: "SC",
    coveragePeriod: "1 year / 12,000 mi",
    repairAttempts: "3 attempts or 30 days",
    usedCarCoverage: "No",
    disclosureRequired: "Yes",
    brandTerm: "Manufacturer Buyback",
    summary:
      "South Carolina Code § 56-28-10 covers new vehicles for 1 year or 12,000 miles. SC uses an informal dispute settlement procedure before formal proceedings.",
  },
  {
    state: "South Dakota",
    abbr: "SD",
    coveragePeriod: "1 year / warranty term",
    repairAttempts: "4 attempts or 30 days",
    usedCarCoverage: "No",
    disclosureRequired: "Yes",
    brandTerm: "Manufacturer Buyback",
    summary:
      "South Dakota Cod. Laws § 32-6D-1 covers new vehicles during the warranty period. The state Department of Revenue records buyback title brands.",
  },
  {
    state: "Tennessee",
    abbr: "TN",
    coveragePeriod: "1 year / warranty term",
    repairAttempts: "3 attempts or 30 days",
    usedCarCoverage: "No",
    disclosureRequired: "Yes",
    brandTerm: "Manufacturer Buyback",
    summary:
      "Tennessee Code § 55-24-101 covers new vehicles for the warranty term or first year. Buybacks must carry a 'Manufacturer Buyback' notation on the title.",
  },
  {
    state: "Texas",
    abbr: "TX",
    coveragePeriod: "24 months / 24,000 mi",
    repairAttempts: "4 attempts (or 2 for safety) or 30 days",
    usedCarCoverage: "No",
    disclosureRequired: "Yes",
    brandTerm: "Reacquired Vehicle",
    summary:
      "Texas Occupations Code § 2301.601 administered by the Texas Department of Motor Vehicles. Texas uses the term 'Reacquired Vehicle' and requires permanent title disclosure.",
  },
  {
    state: "Utah",
    abbr: "UT",
    coveragePeriod: "1 year / warranty term",
    repairAttempts: "4 attempts or 30 days",
    usedCarCoverage: "No",
    disclosureRequired: "Yes",
    brandTerm: "Manufacturer Buyback",
    summary:
      "Utah Code § 13-20-1 covers new vehicles for the warranty period. The Utah Division of Consumer Protection oversees the formal arbitration process.",
  },
  {
    state: "Vermont",
    abbr: "VT",
    coveragePeriod: "Warranty term (max 24 mo)",
    repairAttempts: "3 attempts or 30 days",
    usedCarCoverage: "No",
    disclosureRequired: "Yes",
    brandTerm: "Manufacturer Buyback",
    summary:
      "Vermont 9 V.S.A. § 4170 covers new vehicles during the express warranty or 24 months. The Vermont Motor Vehicle Arbitration Board hears cases at no cost to the consumer.",
  },
  {
    state: "Virginia",
    abbr: "VA",
    coveragePeriod: "18 months",
    repairAttempts: "3 attempts (1 for safety) or 30 days",
    usedCarCoverage: "No",
    disclosureRequired: "Yes",
    brandTerm: "Manufacturer Buyback (Warranty Nonconformity)",
    summary:
      "Virginia Code § 59.1-207.9 covers new vehicles for 18 months from delivery. The Virginia title brand specifies 'Warranty Nonconformity' for resold buybacks.",
  },
  {
    state: "Washington",
    abbr: "WA",
    coveragePeriod: "2 years / 24,000 mi",
    repairAttempts: "4 attempts (2 for safety) or 30 days",
    usedCarCoverage: "Limited",
    disclosureRequired: "Yes",
    brandTerm: "Lemon Law Buyback",
    summary:
      "Washington Rev. Code § 19.118 covers new vehicles for 2 years or 24,000 miles. Limited used-car protection applies to certified pre-owned vehicles sold with manufacturer warranty extensions.",
  },
  {
    state: "West Virginia",
    abbr: "WV",
    coveragePeriod: "1 year / warranty term",
    repairAttempts: "3 attempts (1 for safety) or 30 days",
    usedCarCoverage: "No",
    disclosureRequired: "Yes",
    brandTerm: "Manufacturer Buyback",
    summary:
      "West Virginia Code § 46A-6A-1 covers new vehicles for the warranty period. A single failed brake or steering repair qualifies for buyback eligibility.",
  },
  {
    state: "Wisconsin",
    abbr: "WI",
    coveragePeriod: "1 year / warranty term",
    repairAttempts: "4 attempts or 30 days",
    usedCarCoverage: "No",
    disclosureRequired: "Yes",
    brandTerm: "Manufacturer Buyback",
    summary:
      "Wisconsin Stat. § 218.0171 was historically one of the strongest lemon laws in the country, with double-damages and attorney-fee provisions. Covers new vehicles for the warranty period.",
  },
  {
    state: "Wyoming",
    abbr: "WY",
    coveragePeriod: "1 year",
    repairAttempts: "3 attempts or 30 days",
    usedCarCoverage: "No",
    disclosureRequired: "Limited",
    brandTerm: "Manufacturer Buyback",
    summary:
      "Wyoming Stat. § 40-17-101 covers new vehicles for the first year. Among the weaker enforcement frameworks; consumers often proceed under Magnuson-Moss federal warranty law instead.",
  },
];
