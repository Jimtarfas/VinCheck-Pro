/**
 * VIN Lookup California — English-only body for /vin-lookup-california.
 * California-specific landing page targeting:
 *   - "vin lookup california" (1.3K)
 *
 * Parallels VinNumberLookupTexasBody in shape but pivots to California-specific
 * buyer pain points: CA DMV Title Brand Manual, CARB emissions / smog history,
 * salt-air corrosion on coastal cars, wildfire-flood combo damage, and the
 * strict CA Revived Salvage retitle process (Lamp & Brake + CHP VIN inspection).
 */

import Link from "@/components/LocaleLink";
import {
  Check,
  Shield,
  Search,
  FileText,
  AlertCircle,
  Clock,
  Car,
  MapPin,
  ChevronRight,
  Star,
  Lock,
  Zap,
  BadgeCheck,
  Building2,
  Sun,
  Wind,
  Flame,
  Waves,
  Gauge,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";

interface Faq {
  question: string;
  answer: string;
}

const COPY = {
  crumbs: { home: "Home", current: "VIN Lookup California" },
  badge:
    "Free California VIN Lookup  \u00b7  CA DMV Title Data  \u00b7  Instant NMVTIS",
  h1Lead: "VIN Lookup California \u2014 ",
  h1Accent: "Free CA DMV Title History Check",
  intro:
    "Run a free California VIN lookup using CA DMV and NMVTIS data. Surface California title brands, CARB smog history flags, coastal salt-air corrosion patterns, wildfire damage, and salvage records in under 5 seconds \u2014 no credit card, no $5 REG 488C fee, no trip to a CA DMV field office.",
  searchHeading: "Run Your Free California VIN Lookup",
  searchSub:
    "Enter any 17-character VIN \u2014 passenger cars, pickups, SUVs, motorcycles, RVs",
  searchSecurity:
    "256-bit encrypted \u00b7 DPPA compliant \u00b7 No personal data stored",
  trustStats: [
    { value: "30M+", label: "CA vehicles in database" },
    { value: "NMVTIS", label: "certified data source" },
    { value: "< 5 sec", label: "average report time" },
    { value: "Free", label: "no credit card needed" },
  ],
  statsHeading: "California VIN Lookup \u2014 By the Numbers",
  headlineStats: [
    { value: "30M+", label: "California-registered vehicles on the road" },
    { value: "~3M", label: "Used-vehicle transactions in CA each year" },
    { value: "$5", label: "CA DMV REG 488C record fee bypassed with NMVTIS" },
    { value: "<5 sec", label: "Average VIN decode time" },
    { value: "$0", label: "Cost for the free California VIN report" },
  ],
} as const;

// California Title Brand Manual (CA DMV)
const CA_TITLE_BRANDS: { brand: string; desc: string }[] = [
  {
    brand: "Salvage",
    desc: "Issued when an insurer or owner declares the vehicle a total loss. The CA Salvage Certificate proves the vehicle cannot be operated on California roads until it is repaired, inspected, and re-titled as Revived Salvage.",
  },
  {
    brand: "Junk",
    desc: "The vehicle has been reported to the CA DMV as fit only for dismantling, scrap, or destruction. A Junk vehicle can never be re-titled for road use in California \u2014 watch closely for out-of-state retitle fraud.",
  },
  {
    brand: "Nonrepairable",
    desc: "California's harshest brand. The vehicle is permanently restricted to parts or scrap only and is barred from ever returning to road use in any form.",
  },
  {
    brand: "Revived Salvage",
    desc: "Formerly Salvage; the vehicle has been repaired and has passed California's Lamp & Brake Inspection plus the CHP-witnessed VIN re-inspection. Re-titled with a Revived Salvage brand that follows the VIN nationwide for life.",
  },
  {
    brand: "Dismantled",
    desc: "Reported to CA DMV by a licensed dismantler. Major components have been removed; the vehicle cannot be operated until it is rebuilt and re-titled through the full Revived Salvage process.",
  },
  {
    brand: "Flood",
    desc: "Required disclosure when water damage has impacted the body, engine, transmission, or electrical systems. Increasingly common after atmospheric-river flooding events in California's Central Valley and coastal counties.",
  },
  {
    brand: "Total Loss Salvage",
    desc: "Insurance-declared total loss carrying the Salvage brand on the CA title record. Often paired with the Revived Salvage brand once the vehicle is repaired and re-inspected.",
  },
];

const REPORT_ITEMS: { icon: typeof FileText; title: string; desc: string }[] = [
  {
    icon: FileText,
    title: "CA DMV Title History",
    desc: "Every California title record plus titles from the other 49 states \u2014 brands, lienholders, and ownership transfers tied to the VIN.",
  },
  {
    icon: AlertCircle,
    title: "Accident Records",
    desc: "Collision data from California insurance companies, body shops, and state DMV reports nationwide.",
  },
  {
    icon: Search,
    title: "Odometer Readings",
    desc: "Mileage snapshots from every CA DMV transaction, smog inspection, and insurance event. Critical in California's huge private-party market.",
  },
  {
    icon: Shield,
    title: "Theft Records",
    desc: "NICB stolen-vehicle database cross-reference \u2014 California ranks #1 in the US for total reported vehicle thefts.",
  },
  {
    icon: Car,
    title: "Recall Status",
    desc: "All open NHTSA safety recalls \u2014 verify before you transfer the title at a CA DMV field office.",
  },
  {
    icon: Gauge,
    title: "CARB Smog History",
    desc: "Failed-smog history is a red flag for hidden engine, catalytic converter, or emissions-system problems on California-registered cars.",
  },
];

const INTERNAL_LINKS = [
  {
    href: "/vin-check",
    label: "Full VIN History Check",
    desc: "National title, accident, odometer, and recall history in one free report.",
  },
  {
    href: "/vin-number-lookup-texas",
    label: "VIN Number Lookup Texas",
    desc: "Companion TX guide \u2014 useful when a California vehicle was previously titled in Texas.",
  },
  {
    href: "/florida-vin-check",
    label: "Florida VIN Check",
    desc: "Companion FL guide \u2014 cross-state title migration between California and Florida is common.",
  },
  {
    href: "/vin-check/state/california",
    label: "California State VIN Hub",
    desc: "California-specific VIN lookup hub with county-level resources.",
  },
  {
    href: "/salvage-title-check",
    label: "Salvage Title Check",
    desc: "Verify whether a vehicle carries a California Salvage, Junk, Nonrepairable, or Revived Salvage brand.",
  },
  {
    href: "/flood-check",
    label: "Flood Damage Check",
    desc: "Critical for any California vehicle from atmospheric-river or coastal-flood impact zones.",
  },
  {
    href: "/vin-decoder",
    label: "VIN Decoder",
    desc: "Decode the 17-character VIN to year, make, model, trim, and factory options.",
  },
  {
    href: "/accident-history-check",
    label: "Accident History Check",
    desc: "Deep dive into collision records and damage events tied to the VIN.",
  },
];

export const FAQS_EN: Faq[] = [
  {
    question: "How do I look up a VIN in California?",
    answer:
      "Enter the 17-character VIN in the search tool at the top of this page. Our California VIN lookup queries CA DMV title data and NMVTIS-aggregated records from all 50 state motor-vehicle agencies, insurers, salvage auctions, and dismantlers. Results return in under five seconds at no cost \u2014 you do not need to visit a CA DMV field office or submit Form REG 488C with the $5 record fee for basic title history.",
  },
  {
    question: "Is the CA DMV VIN lookup free?",
    answer:
      "California DMV charges $5 for a Vehicle/Vessel Record under Form REG 488C and mailed requests typically take 4 to 6 weeks to process. Our online California VIN lookup is free, instant, and pulls from the same NMVTIS feed that CA DMV reports into \u2014 plus accident, odometer, theft, and recall sources that the DMV record alone does not cover. Use the free tool first; only pay for a certified REG 488C record when you need a legally certified document for a court case or title dispute.",
  },
  {
    question: "What does a California VIN check show?",
    answer:
      "A California VIN check returns the full CA DMV title and ownership chain (including any Salvage, Junk, Nonrepairable, Revived Salvage, Dismantled, Flood, or Total Loss Salvage brand), reported accident and damage events, odometer history with rollback flags, NICB stolen-vehicle status, open NHTSA recalls, and basic decoded specs from the VIN itself. Owner names and addresses are not returned \u2014 the federal Driver's Privacy Protection Act (DPPA) and California Vehicle Code section 1808.21 protect that information.",
  },
  {
    question: "How can I check if a CA vehicle has a salvage title?",
    answer:
      "Run the VIN through the lookup above. The CA DMV stamps salvaged California vehicles with one of several brands defined in the California Title Brand Manual: Salvage, Junk, Nonrepairable, Revived Salvage, Dismantled, Flood, and Total Loss Salvage. These brands are reported to NMVTIS and follow the VIN permanently \u2014 even if someone later attempts to re-title the vehicle in another state with weaker disclosure rules. The free report flags any brand on the record immediately.",
  },
  {
    question: "How do I get vehicle records from the CA DMV (REG 488C)?",
    answer:
      "California DMV provides vehicle records through Form REG 488C, the Request for Vehicle or Vessel Records. You can submit by mail to CA DMV headquarters in Sacramento or in person at any California DMV field office. Standard records cost $5 and mailed requests typically take 4 to 6 weeks. Under California Vehicle Code section 1808.21 and the federal DPPA (18 U.S.C. \u00a7 2721), personal owner information is restricted; title brands and ownership counts are returned. For most pre-purchase due diligence the free NMVTIS-backed VIN lookup on this page returns the same title-brand data instantly.",
  },
  {
    question: "Does California have smog-history records by VIN?",
    answer:
      "Yes \u2014 California's biennial smog inspection program, administered by the Bureau of Automotive Repair (BAR) under California Air Resources Board (CARB) rules, ties every inspection result to the VIN. The smog history on a vehicle can confirm whether the seller's claim of a clean inspection is accurate, surface repeated failures that point to catalytic converter or oxygen sensor problems, and reveal whether the vehicle even qualifies for California registration. A clean VIN-linked smog record is a strong positive signal; a string of failed inspections is a red flag for hidden mechanical issues.",
  },
  {
    question: "How do I verify a California title by VIN?",
    answer:
      "Enter the VIN above. The lookup queries CA DMV-linked NMVTIS data to confirm the current title state, any brands on the record, lienholder of record, and the full California title history. For a certified copy of the California title (required for some legal and DMV transactions), submit Form REG 488C directly to the CA DMV. Always cross-check the VIN on the dashboard, door jamb, and title document \u2014 a mismatch between physical VIN locations and the title record is a major red flag and should be reported to the CA DMV Investigations Division.",
  },
];

export default function VinNumberLookupCaliforniaBody() {
  const c = COPY;
  const faqs = FAQS_EN;

  return (
    <article className="pb-16 bg-surface">
      {/* Hero */}
      <div className="bg-primary text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-14 sm:pt-28 sm:pb-20">
          <Breadcrumbs
            items={[{ label: c.crumbs.home, href: "/" }, { label: c.crumbs.current }]}
            onDark
          />

          <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
            <MapPin className="w-4 h-4" /> {c.badge}
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-headline font-extrabold leading-tight mb-4">
            {c.h1Lead}
            <span style={{ color: "var(--color-secondary-container)" }}>
              {c.h1Accent}
            </span>
          </h1>

          <p className="speakable-intro text-base sm:text-xl text-white/85 max-w-3xl mb-8 leading-relaxed">
            {c.intro}
          </p>

          <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-xl">
            <h2 className="text-base sm:text-lg font-headline font-extrabold text-primary mb-1">
              {c.searchHeading}
            </h2>
            <p className="text-xs sm:text-sm text-on-surface-variant mb-4">
              {c.searchSub}
            </p>
            <VinSearchForm size="lg" locale="en" />
            <p className="mt-3 text-[11px] text-slate-400 flex items-center gap-1.5">
              <Lock className="w-3 h-3" /> {c.searchSecurity}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
            {c.trustStats.map((s, i) => {
              const Icons = [Car, Shield, Clock, BadgeCheck];
              const Icon = Icons[i];
              return (
                <div
                  key={s.label}
                  className="bg-white/10 border border-white/15 rounded-xl px-4 py-3 text-center"
                >
                  <Icon className="w-5 h-5 mx-auto mb-1 text-white/70" />
                  <div className="text-xl sm:text-2xl font-headline font-black text-white">
                    {s.value}
                  </div>
                  <div className="text-[11px] text-white/65 leading-tight mt-0.5">
                    {s.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Stats strip */}
      <section
        aria-labelledby="ca-stats-heading"
        className="max-w-5xl mx-auto px-4 sm:px-6 -mt-8 sm:-mt-10 relative z-10"
      >
        <div className="rounded-3xl bg-surface-container shadow-md border border-outline-variant p-5 sm:p-7">
          <h2
            id="ca-stats-heading"
            className="text-xs sm:text-sm font-headline font-black uppercase tracking-widest text-primary mb-4 sm:mb-5"
          >
            {c.statsHeading}
          </h2>
          <dl className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
            {c.headlineStats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl bg-primary-container px-4 py-4 sm:py-5"
              >
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-headline font-bold text-3xl sm:text-4xl text-on-primary-container leading-none mb-2">
                  {s.value}
                </dd>
                <p className="text-xs sm:text-sm text-on-surface-variant leading-snug">
                  {s.label}
                </p>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Why CA VIN lookup matters */}
        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">
            Why a California VIN Lookup Matters
          </h2>
          <div className="prose prose-slate max-w-none text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
            <p>
              California is the largest used-vehicle market in the United States.
              The CA DMV processes roughly{" "}
              <strong className="text-on-surface">3 million used-vehicle transactions</strong>{" "}
              each year across its statewide network of DMV field offices and
              authorized business partners. Combine that volume with more than
              30 million registered vehicles, a strict salvage-to-rebuild regime,
              the country's only biennial smog program tied to a state air-quality
              regulator, and serious environmental damage risk from coastal
              corrosion and wildfires \u2014 and California becomes one of the
              most history-sensitive used-car markets to buy into without first
              running a VIN check.
            </p>
            <ul className="space-y-3 list-none pl-0">
              <li className="flex gap-3 items-start bg-surface-container-low rounded-xl p-4">
                <Building2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <span>
                  <strong className="text-on-surface">Largest used-car market in the US:</strong>{" "}
                  Approximately 3 million used-vehicle transactions per year flow
                  through California DMV \u2014 far more than any other state.
                  Sheer volume means more title transfers, more migration in and
                  out of state, and more opportunity for brand-washing fraud to
                  slip past unsuspecting private-party buyers.
                </span>
              </li>
              <li className="flex gap-3 items-start bg-surface-container-low rounded-xl p-4">
                <Shield className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <span>
                  <strong className="text-on-surface">Strict salvage / rebuild regime:</strong>{" "}
                  California has one of the most rigorous salvage-to-road-use
                  programs in the country. Before a Salvage vehicle can earn a
                  Revived Salvage title, it must pass a Lamp & Brake Inspection,
                  Brake & Lamp Adjuster certification, and a CHP-witnessed VIN
                  re-inspection. That paper trail is a goldmine for buyers \u2014
                  if the lookup shows a salvage brand and the seller cannot
                  produce the Revived Salvage paperwork, walk away.
                </span>
              </li>
              <li className="flex gap-3 items-start bg-surface-container-low rounded-xl p-4">
                <Gauge className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <span>
                  <strong className="text-on-surface">CARB smog program tied to the VIN:</strong>{" "}
                  Every California biennial smog inspection is recorded against
                  the VIN by the Bureau of Automotive Repair under California Air
                  Resources Board (CARB) rules. The smog history is one of the
                  most powerful seller-claim verification tools available to
                  California buyers.
                </span>
              </li>
              <li className="flex gap-3 items-start bg-surface-container-low rounded-xl p-4">
                <FileText className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <span>
                  <strong className="text-on-surface">Private-party volume:</strong>{" "}
                  California's private-party used-car market is enormous \u2014
                  Craigslist, Facebook Marketplace, OfferUp, and word-of-mouth
                  sales dwarf the dealer channel for many model segments. Private
                  sellers do not face the same disclosure obligations as licensed
                  dealers, so a VIN history report is your only reliable defense.
                </span>
              </li>
            </ul>
            <p>
              A <strong className="text-on-surface">California VIN lookup</strong>{" "}
              pulls title records that CA DMV reports into NMVTIS \u2014 the federal
              National Motor Vehicle Title Information System \u2014 along with
              national accident, insurance, theft, and recall data. The result is
              a far more complete picture than the CA DMV title record alone,
              returned in seconds instead of weeks.
            </p>
          </div>
        </section>

        {/* What it reveals */}
        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
            What a California VIN Lookup Reveals
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8">
            Our free California VIN lookup aggregates data from CA DMV title
            records, NMVTIS, NICB, NHTSA, CARB-linked smog inspection sources,
            and licensed insurance history providers into a single report.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {REPORT_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-base font-headline font-extrabold text-primary mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>

          <h3 className="text-xl sm:text-2xl font-headline font-extrabold text-primary mb-2">
            California Title Brands From the CA DMV Title Brand Manual
          </h3>
          <p className="text-sm sm:text-base text-on-surface-variant mb-6">
            The California Title Brand Manual defines a specific set of brands
            that CA DMV stamps on a vehicle's record. A California VIN lookup
            surfaces any of these brands instantly:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {CA_TITLE_BRANDS.map((b) => (
              <div
                key={b.brand}
                className="flex gap-3 items-start rounded-xl border border-outline-variant bg-surface-container-lowest p-4"
              >
                <AlertCircle className="w-5 h-5 text-error flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-sm font-bold text-on-surface">{b.brand}</strong>
                  <p className="text-xs text-on-surface-variant mt-0.5 leading-relaxed">
                    {b.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-2xl bg-primary/5 border border-primary/20 p-5 sm:p-6">
            <p className="text-sm text-on-surface-variant leading-relaxed">
              <strong className="text-primary">California Vehicle Code sections 5900 \u2013 5908 and 11515</strong>{" "}
              require sellers, insurers, and dismantlers to report salvage,
              flood, and total-loss events to the CA DMV. Enforcement is
              inconsistent in private-party sales, which is why an independent
              California VIN check is the safer move \u2014 do not rely on
              seller disclosure alone.
            </p>
          </div>
        </section>

        {/* Where to get a free CA VIN lookup */}
        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">
            Where to Get a Free California VIN Lookup
          </h2>
          <div className="prose prose-slate max-w-none text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
            <p>
              The fastest free California VIN lookup is a{" "}
              <strong className="text-on-surface">NMVTIS-backed service</strong>{" "}
              like CarCheckerVIN. NMVTIS is the federal vehicle-history database
              operated by the US Department of Justice; every state DMV \u2014
              including CA DMV \u2014 reports title brands into it. Approved
              consumer providers re-query NMVTIS in real time, so a free online
              California VIN lookup returns the same authoritative title-brand
              data CA DMV would hand you on Form REG 488C \u2014 without the
              trip to a CA DMV field office, without the $5 record fee, and
              without the 4 to 6 week mail processing wait.
            </p>
            <p>
              The free CarCheckerVIN California VIN lookup goes further than
              a CA DMV record on its own. The CA DMV certified record covers
              California title history, brands, and registered lienholders.
              The NMVTIS-backed VIN lookup adds national title brands from all
              50 states, insurance total-loss declarations, salvage-auction
              records from Copart and IAA yards in Los Angeles, Sacramento,
              Fresno, and the Bay Area, odometer rollback flags, NICB
              stolen-vehicle cross-reference, and all open NHTSA safety recalls
              \u2014 all sourced from the same authoritative feeds the state
              itself reports into.
            </p>
            <p>
              Save the paid REG 488C record for cases where you need a legally
              certified document (court filings, insurance disputes, or formal
              title corrections). For everyday pre-purchase due diligence, the
              free California VIN lookup above is the right starting point.
            </p>
          </div>
        </section>

        {/* CA DMV REG 488C explained */}
        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">
            CA DMV REG 488C Vehicle Record Request Explained
          </h2>
          <div className="prose prose-slate max-w-none text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
            <p>
              The official paper-trail path for California title information is{" "}
              <strong className="text-on-surface">CA DMV Form REG 488C</strong>,
              the Request for Vehicle or Vessel Records. It is the form you use
              to request a vehicle record directly from the CA DMV when you
              need an official, agency-issued document.
            </p>
            <ul className="space-y-3 list-none pl-0">
              <li className="flex gap-3 items-start bg-surface-container-low rounded-xl p-4">
                <FileText className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <span>
                  <strong className="text-on-surface">Form name:</strong> Request
                  for Vehicle or Vessel Records (Form REG 488C). Available for
                  download from dmv.ca.gov and at every California DMV field
                  office.
                </span>
              </li>
              <li className="flex gap-3 items-start bg-surface-container-low rounded-xl p-4">
                <Building2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <span>
                  <strong className="text-on-surface">Where to file:</strong> Mail
                  to CA DMV headquarters in Sacramento or hand-deliver to any
                  California DMV field office \u2014 Los Angeles, San Francisco,
                  San Diego, San Jose, Oakland, Fresno, Sacramento, Long Beach,
                  Bakersfield, Anaheim, Riverside, San Bernardino, and beyond.
                </span>
              </li>
              <li className="flex gap-3 items-start bg-surface-container-low rounded-xl p-4">
                <Star className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <span>
                  <strong className="text-on-surface">Fee:</strong> $5 per
                  vehicle record under the standard CA DMV fee schedule.
                  Additional fees apply for certified copies of the title
                  document itself or for vessel records.
                </span>
              </li>
              <li className="flex gap-3 items-start bg-surface-container-low rounded-xl p-4">
                <Clock className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <span>
                  <strong className="text-on-surface">Processing:</strong> 4 to 6
                  weeks for a mailed REG 488C in normal conditions. Walk-in
                  requests at a CA DMV field office can be faster but require
                  appointment availability.
                </span>
              </li>
              <li className="flex gap-3 items-start bg-surface-container-low rounded-xl p-4">
                <Lock className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <span>
                  <strong className="text-on-surface">Privacy restrictions:</strong>{" "}
                  Under California Vehicle Code section 1808.21 and the federal
                  DPPA (18 U.S.C. \u00a7 2721), CA DMV cannot release owner
                  names or addresses except to permitted users (insurers, law
                  enforcement, licensed investigators, court orders). Title
                  brands and ownership counts are returned; personal identifying
                  information is not.
                </span>
              </li>
            </ul>
            <p>
              For pre-purchase due diligence the free VIN lookup at the top of
              this page returns the same NMVTIS title-brand data instantly.
              Reserve the REG 488C for cases where you genuinely need the
              CA DMV-issued certified document for a legal proceeding.
            </p>
          </div>
        </section>

        {/* CARB smog history */}
        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">
            CARB Smog-History Records by VIN
          </h2>
          <div className="prose prose-slate max-w-none text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
            <p>
              California is the only state in the US that runs its own emissions
              regulator with VIN-tagged inspection records of this depth. Under
              the California Air Resources Board (CARB) rules and the Bureau of
              Automotive Repair (BAR) Smog Check Program, almost every gasoline
              vehicle model year 1976 and newer must pass a biennial smog
              inspection to renew California registration. Every inspection
              \u2014 pass or fail \u2014 is logged against the VIN.
            </p>
            <ul className="space-y-3 list-none pl-0">
              <li className="flex gap-3 items-start bg-surface-container-low rounded-xl p-4">
                <Gauge className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <span>
                  <strong className="text-on-surface">Verify the seller's smog claim:</strong>{" "}
                  A seller who advertises a "fresh smog" is making a verifiable
                  claim. A VIN-linked smog history confirms whether the
                  inspection actually happened, where, and what the result was.
                </span>
              </li>
              <li className="flex gap-3 items-start bg-surface-container-low rounded-xl p-4">
                <AlertCircle className="w-6 h-6 text-error flex-shrink-0 mt-0.5" />
                <span>
                  <strong className="text-on-surface">Failed-smog history is a red flag:</strong>{" "}
                  Repeated failures often point to a tired catalytic converter,
                  failing oxygen sensors, EVAP-system leaks, or chronic
                  engine-management problems. A vehicle that only passes after
                  three or four tries is telling you something about its long-term
                  mechanical condition.
                </span>
              </li>
              <li className="flex gap-3 items-start bg-surface-container-low rounded-xl p-4">
                <Shield className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <span>
                  <strong className="text-on-surface">CARB-legal verification for out-of-state imports:</strong>{" "}
                  Vehicles brought in from other states must meet CARB standards
                  to be registered in California. A VIN history that shows
                  prior out-of-state registration combined with no California
                  smog record yet is a reason to confirm CARB compatibility
                  before you buy.
                </span>
              </li>
            </ul>
            <p>
              A clean string of passes on the VIN-linked smog history is one of
              the strongest positive signals available to a California used-car
              buyer. A pattern of failures is one of the strongest negative
              signals \u2014 one that does not show up on a paper title at all.
            </p>
          </div>
        </section>

        {/* Revived salvage retitle process */}
        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">
            Salvage / Revived-Salvage Retitle Process in California
          </h2>
          <div className="prose prose-slate max-w-none text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
            <p>
              California's Revived Salvage process is one of the strictest in
              the country. A vehicle that has been declared a total loss and
              issued a California Salvage Certificate cannot be operated on
              public roads until it has been repaired and has cleared three
              separate state-mandated inspections:
            </p>
            <ul className="space-y-3 list-none pl-0">
              <li className="flex gap-3 items-start bg-surface-container-low rounded-xl p-4">
                <Check className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <span>
                  <strong className="text-on-surface">1. Lamp & Brake Inspection:</strong>{" "}
                  Independent state-licensed Brake and Lamp stations verify that
                  the repaired vehicle meets California braking-system and
                  lighting-system standards. Both certifications must be in hand
                  before the DMV will move forward.
                </span>
              </li>
              <li className="flex gap-3 items-start bg-surface-container-low rounded-xl p-4">
                <BadgeCheck className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <span>
                  <strong className="text-on-surface">2. Brake & Lamp Adjuster certification:</strong>{" "}
                  Certified Brake and Lamp Adjusters issue the formal
                  certificates the CA DMV requires alongside the Revived Salvage
                  application package. Receipts, parts invoices, and proof of
                  ownership of major component parts must accompany the
                  application.
                </span>
              </li>
              <li className="flex gap-3 items-start bg-surface-container-low rounded-xl p-4">
                <Shield className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <span>
                  <strong className="text-on-surface">3. CHP-witnessed VIN re-inspection:</strong>{" "}
                  California Highway Patrol (CHP) performs the final VIN
                  re-inspection \u2014 verifying the public VIN, the federal
                  safety certification label, and (where applicable) the
                  confidential VIN locations. CHP also confirms parts ownership
                  to deter chop-shop reassembly. Only after CHP signs off does
                  the CA DMV issue a Revived Salvage title.
                </span>
              </li>
            </ul>
            <p>
              For a buyer, this is excellent news. A California VIN lookup that
              shows a Salvage brand should always be paired with a request to
              see the full Revived Salvage paperwork \u2014 the Lamp & Brake
              certificates, the Brake & Lamp Adjuster certifications, and the
              CHP VIN re-inspection receipt. If the seller cannot produce them,
              the vehicle is not legally on the road in California. Walk away.
            </p>
          </div>
        </section>

        {/* Mid CTA */}
        <section className="py-10">
          <div className="rounded-3xl bg-primary p-7 sm:p-10 text-center">
            <Star className="w-8 h-8 text-yellow-300 mx-auto mb-3" />
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-white mb-2">
              Ready to Look Up a California VIN?
            </h2>
            <p className="text-white/80 text-sm sm:text-base mb-6 max-w-xl mx-auto">
              Free, instant, no credit card. Get the full California VIN history
              report in under 5 seconds.
            </p>
            <div className="max-w-xl mx-auto bg-white rounded-2xl p-4 sm:p-5">
              <VinSearchForm size="lg" locale="en" />
            </div>
          </div>
        </section>

        {/* Coastal corrosion + wildfire damage warning */}
        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">
            Coastal CA Salt-Air Corrosion &amp; Wildfire Smoke-Damage Warnings
          </h2>
          <div className="rounded-2xl border border-error/30 bg-error/5 p-5 sm:p-6 mb-5">
            <div className="flex items-start gap-3">
              <Flame className="w-6 h-6 text-error flex-shrink-0 mt-0.5" />
              <p className="text-sm text-on-surface-variant leading-relaxed">
                <strong className="text-on-surface">If you are buying a used vehicle in Los Angeles, San Francisco, San Diego, Monterey, Santa Barbara, or any California wildfire-impact county \u2014 run a VIN check first.</strong>{" "}
                California's coastal corrosion and wildfire risk profile is unlike
                any other state, and the damage does not always make it onto a
                paper title.
              </p>
            </div>
          </div>
          <div className="prose prose-slate max-w-none text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
            <p>
              <strong className="text-on-surface">Coastal salt-air corrosion:</strong>{" "}
              Cars from the immediate coastal zones of Los Angeles, Long Beach,
              the Bay Area, Monterey, Santa Barbara, and Orange County
              accumulate underside corrosion from chronic exposure to airborne
              salt. The damage shows up on brake lines, fuel lines, suspension
              hardware, exhaust components, and underbody seam welds. A clean
              CA DMV title does not flag this kind of slow environmental
              damage. Pair a VIN history report with a hands-on pre-purchase
              inspection on a lift before you commit to any coastal-region
              vehicle.
            </p>
            <p>
              <strong className="text-on-surface">Wildfire smoke and combo damage:</strong>{" "}
              California's wildfire seasons \u2014 the Camp Fire (2018), the LNU
              Lightning Complex (2020), Dixie Fire (2021), and dozens of
              smaller-named fires every year \u2014 have produced thousands of
              vehicles with smoke damage, melted exterior trim, paint blistering,
              and heat-warped electronics. Some of these are total-lossed and
              re-titled with the proper Salvage or Flood brand (firefighting
              water intrusion is common). Many more are quietly cleaned up and
              sold without disclosure.
            </p>
            <p>
              <strong className="text-on-surface">Atmospheric-river flood damage:</strong>{" "}
              California's increasingly severe atmospheric-river storms have
              flooded vehicles in the Central Valley, Santa Cruz County, and
              coastal LA in recent years. The same dry-out-and-resell pipeline
              that runs in hurricane states applies here: vehicles get re-titled,
              shipped, or sold private-party with no obvious indicator on the
              current paper.
            </p>
            <p>
              The free VIN lookup on this page pulls flood-related title brands,
              insurance total-loss declarations, salvage-auction records, and
              CA DMV title brands from every reporting source NMVTIS aggregates.
              Even when the most recent California paper title looks clean, the
              underlying environmental damage event usually still appears in the
              VIN history.
            </p>
          </div>
        </section>

        {/* How to verify a California VIN */}
        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">
            How to Verify a California Title Against the CA DMV Record
          </h2>
          <div className="space-y-4">
            {[
              {
                step: "01",
                title: "Locate the 17-character VIN on the vehicle",
                body:
                  "The VIN is stamped in three easy-to-check spots: the lower-left corner of the dashboard visible through the windshield from outside; the driver-side door jamb sticker; and the California title or registration document. On California-titled motorcycles the VIN is stamped on the steering head and engine block. Confirm all three locations match \u2014 a mismatch is a serious red flag and a known indicator of VIN swapping, which should be reported to the CA DMV Investigations Division.",
              },
              {
                step: "02",
                title: "Run the VIN through the free lookup above",
                body:
                  "Paste the 17-character VIN into the search box at the top of this page. The format is auto-validated, including the check digit at position 9, so transposition typos are caught before the lookup runs. NMVTIS, NICB, NHTSA, CARB-linked smog sources, and CA DMV-linked title sources are queried in parallel.",
              },
              {
                step: "03",
                title: "Cross-check the VIN against the California title",
                body:
                  "Compare the VIN returned in the report with the VIN printed on the seller's California Certificate of Title (the pink slip). The make, model, year, and body style should match the decoded VIN exactly. Any inconsistency \u2014 a different model year, a wrong body type, or a VIN that does not match the title \u2014 is a stop-the-deal moment.",
              },
            ].map((s) => (
              <div
                key={s.step}
                className="flex gap-4 sm:gap-6 items-start rounded-2xl border border-outline-variant bg-surface p-5 sm:p-6"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                  <span className="text-white font-headline font-black text-sm">
                    {s.step}
                  </span>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-headline font-extrabold text-primary mb-1.5">
                    {s.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                    {s.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Internal links */}
        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
            More California &amp; National VIN Tools
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7">
            Dig deeper into specific California vehicle concerns with these
            targeted tools.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {INTERNAL_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="flex items-start gap-3 rounded-xl border border-outline-variant bg-surface hover:border-primary/40 hover:bg-primary/5 transition-colors p-4 group"
              >
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <ChevronRight className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-bold text-primary group-hover:underline">
                    {l.label}
                  </div>
                  <div className="text-xs text-on-surface-variant mt-0.5">
                    {l.desc}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* VIN check banner */}
        <section className="py-10">
          <VinCheckBanner />
        </section>

        {/* FAQ */}
        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
            Frequently Asked Questions — California VIN Lookup
          </h2>
          <p className="text-sm text-on-surface-variant mb-8">
            Long-tail answers to the questions California car buyers ask most.
          </p>
          <div className="space-y-3">
            {faqs.map((f) => (
              <details
                key={f.question}
                className="group rounded-2xl border border-outline-variant bg-surface p-4 sm:p-5 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex items-start justify-between gap-4 cursor-pointer list-none">
                  <span className="text-sm sm:text-base font-headline font-extrabold text-primary pr-2">
                    {f.question}
                  </span>
                  <span className="flex-shrink-0 mt-0.5 text-primary text-xl font-light group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                  {f.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-14 sm:py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-xs font-black uppercase tracking-wider mb-4">
            <Zap className="w-3.5 h-3.5" /> Free · Instant · No Sign-Up
          </div>
          <h2 className="text-2xl sm:text-4xl font-headline font-extrabold text-primary mb-3">
            Protect Yourself Before You Buy in California
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl mx-auto mb-8">
            California's used-car market is the largest in the country, with
            roughly 3 million used-vehicle transactions per year, a strict
            Revived Salvage regime, and real coastal-corrosion and wildfire
            damage risk. A free California VIN lookup takes 5 seconds and could
            save you thousands.
          </p>
          <div className="max-w-xl mx-auto bg-surface-container-low rounded-2xl p-5 border border-outline-variant">
            <VinSearchForm size="lg" locale="en" />
          </div>
        </section>

        <RelatedChecks exclude="/vin-lookup-california" />
      </div>

      {/* Hidden references to keep tree-shaken icons explicit. */}
      <span className="hidden">
        <Sun />
        <Wind />
        <Waves />
      </span>
    </article>
  );
}
