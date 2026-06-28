/**
 * VIN Number Lookup Texas — English-only body for /vin-number-lookup-texas.
 * Texas-specific landing page targeting:
 *   - "vin lookup texas" (2.9K)
 *   - "vin number lookup texas" (1.3K)
 *
 * Parallels FloridaVinCheckBody in shape but pivots to Texas-specific buyer
 * pain points: TxDMV process (Form VTR-275, ~$5.45, 2–3 wk), Texas Title
 * Manual brand list (Salvage, Nonrepairable, Reconstructed, Flood, Rebuilt),
 * and Houston / Gulf Coast flood-car risk after Harvey (2017) and Beryl (2024).
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
  Waves,
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
  crumbs: { home: "Home", current: "VIN Number Lookup Texas" },
  badge: "Free Texas VIN Lookup  \u00b7  TxDMV Title Data  \u00b7  Instant NMVTIS Report",
  h1Lead: "VIN Number Lookup Texas \u2014 ",
  h1Accent: "Free TxDMV Title Check",
  intro:
    "Run a free Texas VIN lookup using TxDMV and NMVTIS data. Surface Texas title brands, Gulf Coast flood damage, salvage records, and odometer history in under 5 seconds \u2014 no credit card, no $5.45 record fee, no trip to a TxDMV regional service center.",
  searchHeading: "Run Your Free Texas VIN Lookup",
  searchSub: "Enter any 17-character VIN \u2014 passenger cars, pickups, trucks, motorcycles, RVs",
  searchSecurity: "256-bit encrypted \u00b7 DPPA compliant \u00b7 No personal data stored",
  trustStats: [
    { value: "21M+", label: "TX vehicles in database" },
    { value: "NMVTIS", label: "certified data source" },
    { value: "< 5 sec", label: "average report time" },
    { value: "Free", label: "no credit card needed" },
  ],
  statsHeading: "Texas VIN Lookup \u2014 By the Numbers",
  headlineStats: [
    { value: "21M+", label: "Texas-registered vehicles on the road" },
    { value: "700K+", label: "Used-vehicle titles transferred in TX each year" },
    { value: "$5.45", label: "TxDMV record fee bypassed with a free NMVTIS lookup" },
    { value: "<5 sec", label: "Average VIN decode time" },
    { value: "$0", label: "Cost for the free Texas VIN report" },
  ],
} as const;

// Texas Title Manual brand list (TxDMV)
const TX_TITLE_BRANDS: { brand: string; desc: string }[] = [
  {
    brand: "Salvage",
    desc: "Issued when an insurer or owner declares the vehicle a total loss. The Salvage Vehicle Title proves the car cannot be operated on public roads in Texas until it is rebuilt and re-inspected.",
  },
  {
    brand: "Nonrepairable",
    desc: "TxDMV's harshest brand. The vehicle is suitable only for parts or scrap and can never be re-titled for road use. Watch for fraudulent attempts to retitle a Nonrepairable vehicle out of state.",
  },
  {
    brand: "Reconstructed",
    desc: "Used when a vehicle has been assembled from major component parts of one or more vehicles. Different from Rebuilt Salvage but often confused with it on resale.",
  },
  {
    brand: "Flood Damage",
    desc: "Required disclosure when the vehicle has been submerged to the point that damage to the body, engine, transmission, or electrical components occurred. Common after Harvey, Imelda, and Beryl.",
  },
  {
    brand: "Rebuilt",
    desc: "Formerly Salvage; the vehicle has been repaired and passed a TxDMV Rebuilt Salvage inspection. Re-titled with a Rebuilt brand that follows the VIN for life across all 50 states.",
  },
];

const REPORT_ITEMS: { icon: typeof FileText; title: string; desc: string }[] = [
  {
    icon: FileText,
    title: "TxDMV Title History",
    desc: "Every Texas title record plus titles from the other 49 states \u2014 brands, lienholders, and ownership transfers tied to the VIN.",
  },
  {
    icon: AlertCircle,
    title: "Accident Records",
    desc: "Collision data from Texas insurance companies, body shops, and state DMV reports across the country.",
  },
  {
    icon: Search,
    title: "Odometer Readings",
    desc: "Mileage snapshots from every TxDMV transaction, state inspection, and insurance event. Critical given the large Texas private-party market.",
  },
  {
    icon: Shield,
    title: "Theft Records",
    desc: "NICB stolen-vehicle database cross-reference \u2014 Texas ranks #2 nationally for vehicle theft volume.",
  },
  {
    icon: Car,
    title: "Recall Status",
    desc: "All open NHTSA safety recalls \u2014 verify before you transfer the title at a Texas county tax office.",
  },
  {
    icon: Waves,
    title: "Flood & Hurricane Damage",
    desc: "Flood title brands and total-loss records tied to Harvey, Imelda, Beryl, and other Gulf Coast events.",
  },
];

const INTERNAL_LINKS = [
  {
    href: "/vin-check",
    label: "Full VIN History Check",
    desc: "National title, accident, odometer, and recall history in one free report.",
  },
  {
    href: "/florida-vin-check",
    label: "Florida VIN Check",
    desc: "Companion FL guide \u2014 useful when a Texas vehicle was previously titled in Florida.",
  },
  {
    href: "/vin-check/state/texas",
    label: "Texas State VIN Hub",
    desc: "Texas-specific VIN lookup hub with county-level resources.",
  },
  {
    href: "/salvage-title-check",
    label: "Salvage Title Check",
    desc: "Verify whether a vehicle carries a Texas Salvage, Nonrepairable, or Rebuilt brand.",
  },
  {
    href: "/flood-check",
    label: "Flood Damage Check",
    desc: "Critical for any Texas vehicle that lived through Harvey, Imelda, or Beryl.",
  },
  {
    href: "/vin-decoder",
    label: "VIN Decoder",
    desc: "Decode the 17-character VIN to year, make, model, trim, and factory options.",
  },
  {
    href: "/recall-check",
    label: "Recall Check",
    desc: "Look up all open NHTSA recalls on any Texas-registered vehicle.",
  },
  {
    href: "/accident-history-check",
    label: "Accident History Check",
    desc: "Deep dive into collision records and damage events tied to the VIN.",
  },
];

export const FAQS_EN: Faq[] = [
  {
    question: "How do I look up a VIN in Texas?",
    answer:
      "Enter the 17-character VIN in the search tool at the top of this page. Our Texas VIN lookup queries TxDMV title data and NMVTIS-aggregated records from all 50 state motor-vehicle agencies, insurers, salvage auctions, and junk yards. Results return in under five seconds at no cost \u2014 you do not need to visit a TxDMV regional service center or pay the $5.45 record fee for basic title history.",
  },
  {
    question: "Is the Texas DMV VIN lookup free?",
    answer:
      "TxDMV charges $5.45 for a Certified Vehicle Record under Form VTR-275 and processing typically takes 2 to 3 weeks. Our online Texas VIN lookup is free, instant, and pulls from the same NMVTIS feed that TxDMV reports into \u2014 plus accident, odometer, theft, and recall sources that the TxDMV record alone does not cover. Use the free tool first; only pay for a certified TxDMV record when you need a legally certified document for a court case or title dispute.",
  },
  {
    question: "What does a Texas VIN check show?",
    answer:
      "A Texas VIN check returns the full title and ownership chain from TxDMV (including any Salvage, Nonrepairable, Reconstructed, Flood Damage, or Rebuilt brand), reported accident and damage events, odometer history (with rollback flags), NICB stolen-vehicle status, open NHTSA recalls, and basic decoded specs from the VIN itself. Owner names and addresses are not returned \u2014 the federal Driver's Privacy Protection Act (DPPA) and Texas Transportation Code Chapter 730 protect that information.",
  },
  {
    question: "How can I check if a Texas vehicle has a salvage title?",
    answer:
      "Run the VIN through the lookup above. TxDMV stamps every salvaged Texas vehicle with one of five title brands defined in the Texas Title Manual: Salvage, Nonrepairable, Reconstructed, Flood Damage, or Rebuilt. These brands are reported to NMVTIS and follow the VIN permanently \u2014 even if someone later attempts to re-title the vehicle in another state with weaker disclosure rules. The free report flags any brand on the record immediately.",
  },
  {
    question: "How do I get vehicle records from the TxDMV?",
    answer:
      "TxDMV provides vehicle records through Form VTR-275 (Request for Texas Motor Vehicle Information). You can submit by mail to TxDMV headquarters in Austin or in person at a regional service center. Standard records cost $5.45 and typically take 2 to 3 weeks. For most pre-purchase due diligence \u2014 confirming title brands, prior owners, and Texas DMV transactions \u2014 the free NMVTIS-backed VIN lookup on this page returns the same data instantly. Reserve the paid TxDMV record for legal filings.",
  },
  {
    question: "Does Texas have flood-damaged cars for sale?",
    answer:
      "Yes \u2014 Texas is one of the highest-risk states in the country for flood-damaged vehicles entering the used market. After Hurricane Harvey (2017) an estimated 500,000+ vehicles were flood-damaged across the Houston area alone; many were re-titled in other states and shipped back into Texas after dry-out. Hurricane Beryl (2024) and Tropical Storm Imelda (2019) added thousands more. The free VIN lookup surfaces Flood Damage and Salvage brands even when the current paper title appears clean.",
  },
  {
    question: "How do I verify a Texas title by VIN?",
    answer:
      "Enter the VIN above. The lookup queries TxDMV-linked NMVTIS data to confirm the current title state, any brands on the record, lienholder of record, and the full Texas title history. For a certified copy of the Texas title (required for some legal and DMV transactions), submit Form VTR-275 directly to TxDMV. Always cross-check the VIN on the dashboard, door jamb, and title document \u2014 a mismatch between physical VIN locations and the title record is a major red flag and should be reported to the Texas DMV Enforcement Division.",
  },
];

export default function VinNumberLookupTexasBody() {
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
        aria-labelledby="tx-stats-heading"
        className="max-w-5xl mx-auto px-4 sm:px-6 -mt-8 sm:-mt-10 relative z-10"
      >
        <div className="rounded-3xl bg-surface-container shadow-md border border-outline-variant p-5 sm:p-7">
          <h2
            id="tx-stats-heading"
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
        {/* Why TX VIN lookup matters */}
        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">
            Why a Texas VIN Lookup Matters
          </h2>
          <div className="prose prose-slate max-w-none text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
            <p>
              Texas issues over <strong className="text-on-surface">700,000 used-vehicle title transfers</strong>{" "}
              every year through the Texas Department of Motor Vehicles (TxDMV) and the
              254 county tax assessor-collector offices that process Texas titles.
              That sheer volume — combined with the state’s 21 million registered
              vehicles, busy salvage auctions, and exposure to Gulf Coast hurricanes —
              makes Texas one of the riskiest states in the country to buy a used car
              without a VIN history report.
            </p>
            <ul className="space-y-3 list-none pl-0">
              <li className="flex gap-3 items-start bg-surface-container-low rounded-xl p-4">
                <Waves className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <span>
                  <strong className="text-on-surface">Gulf Coast hurricane flood-car risk:</strong>{" "}
                  Houston, Beaumont, Corpus Christi, and the entire Gulf Coast see
                  repeat flood events. After Hurricane Harvey in 2017 alone an
                  estimated 500,000+ vehicles were flooded; thousands were dried out,
                  re-titled in other states, and ultimately ended up back on Texas
                  resale lots.
                </span>
              </li>
              <li className="flex gap-3 items-start bg-surface-container-low rounded-xl p-4">
                <Car className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <span>
                  <strong className="text-on-surface">Busy salvage market:</strong>{" "}
                  Texas hosts major Copart and IAA salvage auction yards in Houston,
                  Dallas-Fort Worth, San Antonio, and Austin. Vehicles cycle through
                  these auctions at high volume — some are rebuilt and re-sold with
                  Texas Rebuilt Salvage titles, others slip into private-party sales
                  before the brand is reconciled.
                </span>
              </li>
              <li className="flex gap-3 items-start bg-surface-container-low rounded-xl p-4">
                <Building2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <span>
                  <strong className="text-on-surface">Border-state title migration:</strong>{" "}
                  Vehicles flow between Texas, Louisiana, New Mexico, Oklahoma, and
                  Arkansas constantly. A vehicle branded Salvage in Louisiana can be
                  re-titled in Texas and — if the buyer does not run a VIN check —
                  the prior brand may not be obvious on the most recent paper title.
                </span>
              </li>
              <li className="flex gap-3 items-start bg-surface-container-low rounded-xl p-4">
                <FileText className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <span>
                  <strong className="text-on-surface">Private-party volume:</strong>{" "}
                  Texas is one of the largest private-party used-car markets in the
                  US. Private sellers are not required to disclose history the same
                  way licensed dealers are, so a VIN history report is your only
                  reliable defense.
                </span>
              </li>
            </ul>
            <p>
              A <strong className="text-on-surface">Texas VIN lookup</strong>{" "}
              pulls title records that TxDMV reports into NMVTIS — the federal
              National Motor Vehicle Title Information System — along with national
              accident, insurance, theft, and recall data. The result is a far more
              complete picture than the TxDMV title record alone, returned in seconds
              instead of weeks.
            </p>
          </div>
        </section>

        {/* What it reveals */}
        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
            What a Texas VIN Lookup Reveals
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8">
            Our free Texas VIN lookup aggregates data from TxDMV title records,
            NMVTIS, NICB, NHTSA, and licensed insurance history providers into a
            single report.
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
            Texas Title Brands From the TxDMV Title Manual
          </h3>
          <p className="text-sm sm:text-base text-on-surface-variant mb-6">
            The Texas Title Manual defines a specific set of brands that TxDMV
            stamps on a vehicle’s record. A Texas VIN lookup surfaces any of
            these brands instantly:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {TX_TITLE_BRANDS.map((b) => (
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
              <strong className="text-primary">Texas Transportation Code Chapter 501</strong>{" "}
              and the Texas Title Manual require sellers to disclose salvage and
              flood-damage history at the point of transfer. Enforcement is
              inconsistent in private-party sales, which is why an independent
              Texas VIN check is the safer move — do not rely on seller
              disclosure alone.
            </p>
          </div>
        </section>

        {/* Where to get a free TX VIN lookup */}
        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">
            Where to Get a Free TX VIN Lookup
          </h2>
          <div className="prose prose-slate max-w-none text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
            <p>
              The fastest free Texas VIN lookup is a{" "}
              <strong className="text-on-surface">NMVTIS-backed service</strong>{" "}
              like CarCheckerVIN. NMVTIS is the federal vehicle-history database
              operated by the US Department of Justice; every state DMV —
              including TxDMV — reports title brands into it. Approved consumer
              providers re-query NMVTIS in real time, so a free online Texas VIN
              lookup returns the same authoritative title-brand data TxDMV would
              hand you on Form VTR-275 — without the trip to a TxDMV regional
              service center, without the $5.45 record fee, and without the 2 to 3
              week processing wait.
            </p>
            <p>
              The free CarCheckerVIN Texas VIN lookup goes further than a TxDMV
              record on its own. The TxDMV certified record covers Texas title
              history, brands, and registered lienholders. The NMVTIS-backed VIN
              lookup adds national title brands from all 50 states, insurance
              total-loss declarations, salvage-auction records from Copart and IAA,
              odometer rollback flags, NICB stolen-vehicle cross-reference, and all
              open NHTSA safety recalls — all sourced from the same authoritative
              feeds the state itself reports into.
            </p>
            <p>
              Save the paid TxDMV record for cases where you need a legally
              certified document (court filings, insurance disputes, or formal title
              corrections). For everyday pre-purchase due diligence, the free Texas
              VIN lookup above is the right starting point.
            </p>
          </div>
        </section>

        {/* TxDMV Form VTR-275 explained */}
        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">
            TxDMV Vehicle Title Information Request — Form VTR-275 Explained
          </h2>
          <div className="prose prose-slate max-w-none text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
            <p>
              The official paper-trail path for Texas title information is{" "}
              <strong className="text-on-surface">TxDMV Form VTR-275</strong>,
              the Request for Texas Motor Vehicle Information. It is the form you
              use to request a Certified Vehicle Record directly from TxDMV when
              you need a stamped, legally certified document.
            </p>
            <ul className="space-y-3 list-none pl-0">
              <li className="flex gap-3 items-start bg-surface-container-low rounded-xl p-4">
                <FileText className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <span>
                  <strong className="text-on-surface">Form name:</strong> Request
                  for Texas Motor Vehicle Information (Form VTR-275). Available
                  for download from TxDMV.gov and at every TxDMV regional service
                  center.
                </span>
              </li>
              <li className="flex gap-3 items-start bg-surface-container-low rounded-xl p-4">
                <Building2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <span>
                  <strong className="text-on-surface">Where to file:</strong> Mail
                  to TxDMV in Austin or hand-deliver at a regional service center
                  in Houston, Dallas, Fort Worth, San Antonio, Austin, El Paso,
                  Lubbock, Amarillo, Beaumont, Corpus Christi, Pharr, Waco, Tyler,
                  Wichita Falls, or Childress.
                </span>
              </li>
              <li className="flex gap-3 items-start bg-surface-container-low rounded-xl p-4">
                <Star className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <span>
                  <strong className="text-on-surface">Fee:</strong> ~$5.45 per
                  certified record (TxDMV record fee). Additional fees apply for
                  certified copies of the title document itself.
                </span>
              </li>
              <li className="flex gap-3 items-start bg-surface-container-low rounded-xl p-4">
                <Clock className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <span>
                  <strong className="text-on-surface">Processing:</strong> 2 to 3
                  weeks for a mailed VTR-275 in normal conditions. Walk-in requests
                  at regional service centers can be same-day depending on volume.
                </span>
              </li>
              <li className="flex gap-3 items-start bg-surface-container-low rounded-xl p-4">
                <Lock className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <span>
                  <strong className="text-on-surface">Privacy restrictions:</strong>{" "}
                  Under Texas Transportation Code Chapter 730 and the federal DPPA
                  (18 U.S.C. § 2721), TxDMV cannot release owner names or
                  addresses except to permitted users (insurers, law enforcement,
                  licensed investigators). Title brands and ownership counts are
                  returned; personal identifying information is not.
                </span>
              </li>
            </ul>
            <p>
              For pre-purchase due diligence the free VIN lookup at the top of
              this page returns the same NMVTIS title-brand data instantly. Use
              the VTR-275 when you need the actual TxDMV-stamped certified document
              for a legal proceeding.
            </p>
          </div>
        </section>

        {/* Houston / Gulf Coast flood-car warning */}
        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">
            Houston &amp; Gulf Coast Flood-Car Warning
          </h2>
          <div className="rounded-2xl border border-error/30 bg-error/5 p-5 sm:p-6 mb-5">
            <div className="flex items-start gap-3">
              <Waves className="w-6 h-6 text-error flex-shrink-0 mt-0.5" />
              <p className="text-sm text-on-surface-variant leading-relaxed">
                <strong className="text-on-surface">If you are buying a used vehicle in Houston, Beaumont, Galveston, Corpus Christi, or anywhere along the Texas Gulf Coast — run a VIN check first.</strong>{" "}
                Texas is one of the most flood-impacted states in the country and
                flood cars do not always carry the Flood Damage brand they
                should.
              </p>
            </div>
          </div>
          <div className="prose prose-slate max-w-none text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
            <p>
              <strong className="text-on-surface">Hurricane Harvey (August 2017)</strong>{" "}
              dumped over 60 inches of rain on parts of southeast Texas. Industry
              estimates put the number of flood-damaged vehicles at half a million
              or more across the Houston metro alone. In the months that followed,
              investigators documented thousands of those vehicles being shipped
              to states with weaker title-brand transfer rules, re-titled with
              fresh “clean” paper, and sold back into used-car markets in
              Texas and well beyond.
            </p>
            <p>
              <strong className="text-on-surface">Hurricane Beryl (July 2024)</strong>{" "}
              made landfall near Matagorda and pushed widespread flooding through
              the greater Houston area. Tens of thousands of vehicles took on
              water; the same dry-out-and-resell pipeline that ran after Harvey
              kicked back into gear. Tropical Storm Imelda (2019) added another
              wave of flood-damaged inventory in between.
            </p>
            <p>
              The flow runs both directions. Many flood-damaged vehicles from{" "}
              <strong className="text-on-surface">other states</strong> —
              Louisiana, Mississippi, Florida, and the Carolinas — also migrate
              <em> into</em> Texas after hurricanes elsewhere on the Gulf and
              Atlantic coasts. The flood brand should follow the VIN through
              NMVTIS, but title washing in the gap between an out-of-state
              salvage auction and a Texas private-party sale is exactly the kind
              of fraud a Texas VIN lookup is built to catch.
            </p>
            <p>
              The VIN-based check on this page pulls flood-related title brands,
              insurance total-loss declarations, and salvage-auction records from
              every reporting source NMVTIS aggregates. Even when the most recent
              Texas paper title looks clean, the underlying flood event usually
              still appears in the VIN history.
            </p>
          </div>
        </section>

        {/* How to verify a Texas VIN against TxDMV */}
        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">
            How to Verify a Texas VIN Against the TxDMV Record
          </h2>
          <div className="space-y-4">
            {[
              {
                step: "01",
                title: "Locate the 17-character VIN on the vehicle",
                body:
                  "The VIN is stamped in three easy-to-check spots: the lower-left corner of the dashboard visible through the windshield from outside; the driver-side door jamb sticker; and the Texas title or registration document. On Texas-titled motorcycles the VIN is stamped on the steering head and engine block. Confirm all three locations match \u2014 a mismatch is a serious red flag and a known indicator of VIN swapping.",
              },
              {
                step: "02",
                title: "Run the VIN through the free lookup above",
                body:
                  "Paste the 17-character VIN into the search box at the top of this page. The format is auto-validated, including the check digit at position 9, so transposition typos are caught before the lookup runs. NMVTIS, NICB, NHTSA, and TxDMV-linked sources are queried in parallel.",
              },
              {
                step: "03",
                title: "Cross-check the VIN against the Texas title",
                body:
                  "Compare the VIN returned in the report with the VIN printed on the seller\u2019s Texas Certificate of Title. The make, model, year, and body style should match the decoded VIN exactly. Any inconsistency \u2014 a different model year, a wrong body type, or a VIN that does not match the title \u2014 is a stop-the-deal moment.",
              },
              {
                step: "04",
                title: "Review the brand history first",
                body:
                  "The most important section of the report for Texas vehicles is the title-brand history: Salvage, Nonrepairable, Reconstructed, Flood Damage, and Rebuilt. A brand reported in any state during the vehicle\u2019s life appears here. Any of these brands require a professional pre-purchase inspection before you commit.",
              },
              {
                step: "05",
                title: "Confirm odometer and accident records",
                body:
                  "Mileage readings should climb consistently through every TxDMV transaction and state inspection. A drop or a multi-year gap with no records is a strong odometer-fraud indicator \u2014 a federal crime and a common tactic in private-party Texas sales. Accident records from insurance claims and body shops give you the collision history to negotiate with.",
              },
              {
                step: "06",
                title: "Order a certified VTR-275 record only if needed",
                body:
                  "For most Texas pre-purchase decisions the free VIN lookup is enough. If you need a legally certified TxDMV document for a court case, insurance dispute, or formal title correction, submit Form VTR-275 to TxDMV. Otherwise, save the $5.45 fee and the 2 to 3 week wait.",
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

        {/* Mid CTA */}
        <section className="py-10">
          <div className="rounded-3xl bg-primary p-7 sm:p-10 text-center">
            <Star className="w-8 h-8 text-yellow-300 mx-auto mb-3" />
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-white mb-2">
              Ready to Look Up a Texas VIN?
            </h2>
            <p className="text-white/80 text-sm sm:text-base mb-6 max-w-xl mx-auto">
              Free, instant, no credit card. Get the full Texas VIN history report
              in under 5 seconds.
            </p>
            <div className="max-w-xl mx-auto bg-white rounded-2xl p-4 sm:p-5">
              <VinSearchForm size="lg" locale="en" />
            </div>
          </div>
        </section>

        {/* Internal links */}
        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
            More Texas &amp; National VIN Tools
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7">
            Dig deeper into specific Texas vehicle concerns with these targeted
            tools.
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
            Frequently Asked Questions — Texas VIN Lookup
          </h2>
          <p className="text-sm text-on-surface-variant mb-8">
            Long-tail answers to the questions Texas car buyers ask most.
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
            Protect Yourself Before You Buy in Texas
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl mx-auto mb-8">
            Texas’s used-car market sees over 700,000 title transfers a year,
            with serious flood-damage and title-washing risk along the Gulf
            Coast. A free Texas VIN lookup takes 5 seconds and could save you
            thousands.
          </p>
          <div className="max-w-xl mx-auto bg-surface-container-low rounded-2xl p-5 border border-outline-variant">
            <VinSearchForm size="lg" locale="en" />
          </div>
        </section>

        <RelatedChecks exclude="/vin-number-lookup-texas" />
      </div>
    </article>
  );
}
