import type { Metadata } from "next";
import Link from "next/link";
import {
  Check,
  Shield,
  Search,
  FileText,
  AlertCircle,
  Clock,
  Car,
  MapPin,
  Phone,
  ChevronRight,
  Star,
  Lock,
  Zap,
  BadgeCheck,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";

const SITE = "https://www.carcheckervin.com";

export const metadata: Metadata = {
  title: "Florida VIN Check — Free Vehicle History Report (FL DMV Data)",
  description:
    "Run a free Florida VIN check instantly. Access FL DMV vehicle history reports, title search by VIN, accident records, odometer data, and VIN verification. Trusted by thousands of Florida car buyers.",
  keywords: [
    "Florida VIN check",
    "Florida vehicle history report",
    "Florida DMV VIN check",
    "free VIN check Florida",
    "VIN lookup Florida",
    "Florida DMV vehicle history report",
    "Florida title search by VIN",
    "vehicle title lookup Florida",
    "VIN verification Florida",
    "VIN owner lookup Florida",
    "motorcycle VIN check Florida",
    "Florida salvage title check",
    "FL VIN check",
    "Florida car history report",
    "check VIN Florida DMV",
    "Florida vehicle identification number lookup",
    "used car VIN check Florida",
    "Florida rebuilt title check",
    "Florida flood damage check",
    "Florida lemon law VIN check",
    "DHSMV VIN check Florida",
    "Florida vehicle title status",
    "run VIN number Florida",
    "free Florida car history",
    "Florida VIN decoder",
  ],
  alternates: { canonical: "/florida-vin-check" },
  openGraph: {
    title: "Florida VIN Check — Free FL Vehicle History Report",
    description:
      "Free Florida VIN check with DMV data, title records, accident history, and odometer verification. Run a VIN lookup in seconds — no sign-up required.",
    url: `${SITE}/florida-vin-check`,
    type: "article",
    siteName: "CarCheckerVIN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Florida VIN Check — FL DMV Vehicle History",
    description:
      "Check any Florida vehicle VIN instantly. Title status, accident history, flood damage, salvage records, and more.",
  },
  robots: { index: true, follow: true },
};

/* ── JSON-LD schemas ───────────────────────────────────────── */

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Florida VIN Check — Free Vehicle History Report (FL DMV Data)",
  description:
    "Comprehensive guide to running a free Florida VIN check. Covers FL DMV data, title search, accident records, VIN verification, and motorcycle VIN checks.",
  author: { "@type": "Organization", name: "CarCheckerVIN", url: SITE },
  publisher: {
    "@type": "Organization",
    name: "CarCheckerVIN",
    url: SITE,
    logo: { "@type": "ImageObject", url: `${SITE}/logo.png` },
  },
  mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE}/florida-vin-check` },
  datePublished: "2026-05-09",
  dateModified: "2026-05-09",
  image: `${SITE}/opengraph-image`,
  about: { "@type": "Place", name: "Florida", sameAs: "https://en.wikipedia.org/wiki/Florida" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I run a free VIN check in Florida?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Enter the 17-character VIN in the search box above. Our system queries Florida DHSMV records and national databases including NMVTIS to return title status, accident history, odometer records, and more — at no charge.",
      },
    },
    {
      "@type": "Question",
      name: "What is a Florida DMV VIN check?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A Florida DMV VIN check (officially handled by the Florida Department of Highway Safety and Motor Vehicles, DHSMV) verifies vehicle ownership, title status, any liens recorded, and title brands such as salvage, rebuilt, or flood. Our service aggregates DHSMV data alongside NMVTIS and national history providers for a comprehensive report.",
      },
    },
    {
      "@type": "Question",
      name: "Can I look up a vehicle owner by VIN in Florida?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Under the federal Driver's Privacy Protection Act (DPPA), owner name and address cannot be returned to the general public from any VIN or plate lookup service. Our VIN check returns vehicle data — specs, title history, accident records — but not personal owner information.",
      },
    },
    {
      "@type": "Question",
      name: "How do I check for a salvage or rebuilt title in Florida?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Run a VIN check above. Florida DHSMV records every title brand on a vehicle's history including salvage, rebuilt, junk, flood, lemon buyback, and odometer discrepancy. These brands follow the VIN permanently and will appear in your free report.",
      },
    },
    {
      "@type": "Question",
      name: "Can I do a motorcycle VIN check in Florida?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Florida DHSMV titles motorcycles, scooters, and mopeds just like passenger vehicles. Our free VIN check covers all 2-wheeled vehicles registered in Florida. Motorcycle VINs are typically 17 characters on models 1981 and newer.",
      },
    },
    {
      "@type": "Question",
      name: "Does Florida have a lot of flood-damaged vehicles?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — Florida's hurricane and tropical storm history makes it one of the top states for flood-damaged vehicles. After events like Hurricane Ian (2022) and Irma (2017), tens of thousands of flood-totaled vehicles entered the used car market, sometimes with washed titles from other states. Always run a VIN check before buying any Florida vehicle.",
      },
    },
    {
      "@type": "Question",
      name: "What is VIN verification in Florida?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Florida VIN verification is a physical inspection of the VIN plate on the vehicle by a licensed dealer, law enforcement officer, or DHSMV inspector. It is required when registering an out-of-state vehicle in Florida or when the title shows a discrepancy. Our online VIN check is a data verification — not a substitute for a physical VIN inspection when one is legally required.",
      },
    },
    {
      "@type": "Question",
      name: "How do I check a Florida title by VIN?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Enter the VIN in our search tool above. We pull Florida title records via NMVTIS and DHSMV-linked data sources to show the current title status, any lienholders of record, and all historical title brands. For a certified title copy you must request directly from DHSMV.",
      },
    },
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Check a VIN in Florida",
  description: "Step-by-step guide to running a Florida VIN check for vehicle history and title status.",
  totalTime: "PT2M",
  step: [
    { "@type": "HowToStep", position: 1, name: "Locate the VIN", text: "Find the 17-character VIN on the dashboard (driver's side, visible through the windshield), the door jamb sticker, or the vehicle title document." },
    { "@type": "HowToStep", position: 2, name: "Enter the VIN", text: "Type or paste the VIN into the search box at the top of this page." },
    { "@type": "HowToStep", position: 3, name: "Run the check", text: "Click 'Check VIN'. Our system queries Florida DHSMV records, NMVTIS, and national accident databases simultaneously." },
    { "@type": "HowToStep", position: 4, name: "Review the report", text: "Read the full report covering title history, accident records, odometer readings, flood damage, salvage brands, and recall status." },
    { "@type": "HowToStep", position: 5, name: "Make your decision", text: "Use the report to negotiate price, request a mechanic inspection, or walk away from problematic vehicles before you commit." },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE },
    { "@type": "ListItem", position: 2, name: "Florida VIN Check", item: `${SITE}/florida-vin-check` },
  ],
};

const speakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".speakable-intro"] },
  url: `${SITE}/florida-vin-check`,
};

/* ── Component ─────────────────────────────────────────────── */

const TRUST_STATS = [
  { icon: Car,        value: "4.8M+",   label: "FL vehicles in database" },
  { icon: Shield,     value: "NMVTIS",  label: "certified data source" },
  { icon: Clock,      value: "< 5 sec", label: "average report time" },
  { icon: BadgeCheck, value: "Free",    label: "no credit card needed" },
];

const TITLE_BRANDS = [
  { brand: "Salvage",          desc: "Vehicle was declared a total loss by an insurer. May be unsafe or uninsurable." },
  { brand: "Rebuilt / Reconstructed", desc: "Was salvage, repaired, and re-inspected. Must be disclosed by Florida law." },
  { brand: "Flood",            desc: "Water damage reported. Extremely common in Florida after hurricanes." },
  { brand: "Lemon Buyback",    desc: "Manufacturer repurchased the vehicle under Florida's Lemon Law." },
  { brand: "Odometer Rollback", desc: "Mileage discrepancy recorded by DMV or insurance data." },
  { brand: "Junk",             desc: "Designated for scrap. Cannot be legally retitled or driven on Florida roads." },
];

const REPORT_ITEMS = [
  { icon: FileText,    title: "Title History",      desc: "Every title issued in Florida and all 49 other states, including brands, lienholders, and ownership transfers." },
  { icon: AlertCircle, title: "Accident Records",   desc: "Collision data from insurance companies, repair facilities, and state DMV reports." },
  { icon: Search,      title: "Odometer Readings",  desc: "Mileage snapshots from every DMV transaction, inspection, and insurance event." },
  { icon: Shield,      title: "Theft Records",      desc: "NICB stolen vehicle database cross-reference — critical in South Florida's high-theft metro areas." },
  { icon: Car,         title: "Recall Status",      desc: "All open NHTSA safety recalls — know before you register." },
  { icon: MapPin,      title: "Flood & Hurricane Damage", desc: "Flood-title brands and total-loss records from Florida's hurricane events." },
];

const INTERNAL_LINKS = [
  { href: "/salvage-title-check",    label: "Salvage Title Check",         desc: "Verify if a vehicle carries a Florida salvage brand." },
  { href: "/accident-history-check", label: "Accident History Check",      desc: "Deep dive into collision and damage records." },
  { href: "/flood-check",            label: "Flood Damage Check",          desc: "Critical for any vehicle that spent time in Florida." },
  { href: "/odometer-check",         label: "Odometer Check",              desc: "Detect rollback and mileage fraud." },
  { href: "/license-plate-lookup",   label: "Florida Plate Lookup",        desc: "Find the VIN from any Florida plate number." },
  { href: "/motorcycle-vin-search",  label: "Motorcycle VIN Check",        desc: "FL title history for motorcycles and scooters." },
  { href: "/lemon-check",            label: "Lemon Law Buyback Check",     desc: "Find Florida lemon buyback records." },
  { href: "/vehicle-lien-check",     label: "Lien Check",                  desc: "Verify outstanding loans on any Florida vehicle." },
];

export default function FloridaVinCheckPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />

      <article className="pt-10 pb-16 bg-surface">

        {/* ── Hero ─────────────────────────────────────────── */}
        <div className="bg-primary text-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
            <Breadcrumbs
              items={[{ label: "Home", href: "/" }, { label: "Florida VIN Check" }]}
              onDark
            />

            {/* State badge */}
            <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
              <MapPin className="w-4 h-4" /> Florida (FL) &nbsp;·&nbsp; DHSMV Data
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-headline font-extrabold leading-tight mb-4">
              Florida VIN Check —{" "}
              <span style={{ color: "var(--color-secondary-container)" }}>
                Free FL Vehicle History
              </span>
            </h1>

            <p className="speakable-intro text-base sm:text-xl text-white/85 max-w-3xl mb-8 leading-relaxed">
              Instant access to Florida DHSMV records, title brands, accident history, flood damage, and odometer data for any vehicle. Free, no credit card, no sign-up — results in under 5 seconds.
            </p>

            {/* VIN Search */}
            <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-xl">
              <h2 className="text-base sm:text-lg font-headline font-extrabold text-primary mb-1">
                Run Your Free Florida VIN Check
              </h2>
              <p className="text-xs sm:text-sm text-on-surface-variant mb-4">
                Enter any 17-character VIN — passenger cars, trucks, motorcycles, RVs
              </p>
              <VinSearchForm size="lg" />
              <p className="mt-3 text-[11px] text-slate-400 flex items-center gap-1.5">
                <Lock className="w-3 h-3" /> 256-bit encrypted · DPPA compliant · No personal data stored
              </p>
            </div>

            {/* Trust stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
              {TRUST_STATS.map((s) => {
                const Icon = s.icon;
                return (
                  <div key={s.label} className="bg-white/10 border border-white/15 rounded-xl px-4 py-3 text-center">
                    <Icon className="w-5 h-5 mx-auto mb-1 text-white/70" />
                    <div className="text-xl sm:text-2xl font-headline font-black text-white">{s.value}</div>
                    <div className="text-[11px] text-white/65 leading-tight mt-0.5">{s.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Main content ─────────────────────────────────── */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6">

          {/* Intro / Why Florida is unique */}
          <section className="py-12 sm:py-16 border-b border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">
              Why a Florida VIN Check Is Different From Other States
            </h2>
            <div className="prose prose-slate max-w-none text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              <p>
                Florida is one of the most important states to check when buying a used vehicle — and one of the most risky to skip. The Sunshine State consistently ranks in the <strong className="text-on-surface">top 5 states nationally for salvage vehicle registrations</strong>, flood-damage title brands, and odometer fraud cases. Here&apos;s why:
              </p>
              <ul className="space-y-3 list-none pl-0">
                {[
                  { icon: "🌀", point: "Hurricane exposure", detail: "Florida is struck by more hurricanes and tropical storms than any other US state. After events like Hurricane Ian (2022), Irma (2017), and Michael (2018), tens of thousands of flood-totaled vehicles entered the used car market — many with washed or out-of-state titles." },
                  { icon: "🚢", point: "Port of entry", detail: "Miami and Jacksonville are major ports for imported vehicles. Out-of-state and international vehicles frequently enter with incomplete or misrepresented histories." },
                  { icon: "👴", point: "High seasonal turnover", detail: "Florida&apos;s large snowbird population means vehicles frequently change hands between private parties — bypassing dealer disclosure requirements." },
                  { icon: "☀️", point: "Sun and salt damage", detail: "UV degradation and coastal salt air cause cosmetic and structural damage that sellers routinely conceal. A VIN history report surfaces prior damage claims even when the vehicle looks clean." },
                ].map((item) => (
                  <li key={item.point} className="flex gap-3 items-start bg-surface-container-low rounded-xl p-4">
                    <span className="text-2xl flex-shrink-0">{item.icon}</span>
                    <span><strong className="text-on-surface">{item.point}:</strong> {item.detail}</span>
                  </li>
                ))}
              </ul>
              <p>
                A <strong className="text-on-surface">Florida DMV VIN check</strong> pulls records directly from the Florida Department of Highway Safety and Motor Vehicles (DHSMV) — the state agency responsible for vehicle registration and titling. Combined with NMVTIS (the federal National Motor Vehicle Title Information System) and national insurance data, our free VIN check gives you the most complete picture available.
              </p>
            </div>
          </section>

          {/* What your report includes */}
          <section className="py-12 sm:py-16 border-b border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              What Your Free Florida Vehicle History Report Includes
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-8">
              Our Florida VIN lookup aggregates data from DHSMV, NMVTIS, NICB, NHTSA, and licensed insurance history providers into a single report.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {REPORT_ITEMS.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-base font-headline font-extrabold text-primary mb-1.5">{item.title}</h3>
                    <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Step-by-step guide */}
          <section className="py-12 sm:py-16 border-b border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              How to Check a VIN in Florida — Step-by-Step
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-8">
              Running a <strong>free VIN check in Florida</strong> takes under two minutes.
            </p>
            <div className="space-y-4">
              {[
                {
                  step: "01",
                  title: "Locate the VIN on the vehicle",
                  body: "The VIN is a 17-character code found in three easy locations: (1) the dashboard, visible through the lower-left corner of the windshield from outside the vehicle; (2) the driver-side door jamb sticker; (3) the vehicle title or registration document. On motorcycles, the VIN is typically stamped on the steering head or engine block. Always verify all three locations match — mismatches are a serious red flag.",
                },
                {
                  step: "02",
                  title: "Enter the VIN above",
                  body: "Paste or type the 17-character VIN into the search box at the top of this page. Our system auto-validates the format, including the check digit (position 9), to catch transposition errors before you run the report.",
                },
                {
                  step: "03",
                  title: "Review Florida title records first",
                  body: "The most critical section for Florida vehicles is title history. Look for these brands specifically: Salvage, Rebuilt/Reconstructed, Flood/Water Damage, Lemon Law Buyback, and Odometer Discrepancy. Any of these require careful negotiation or a professional inspection before purchase.",
                },
                {
                  step: "04",
                  title: "Check accident and damage records",
                  body: "Florida accident records come from insurance company filings, body shop repair orders, and law enforcement accident reports. Even minor collisions can affect safety systems, frame integrity, and resale value. Our report flags airbag deployments separately — a deployed airbag that was never replaced is a major safety issue.",
                },
                {
                  step: "05",
                  title: "Verify the odometer history",
                  body: "Cross-reference each mileage reading in the odometer history section. Readings should increase consistently. A drop in mileage or a multi-year gap with no records is a strong indicator of odometer tampering — a federal crime and a common fraud tactic in the Florida private-party market.",
                },
                {
                  step: "06",
                  title: "Check open recalls before you register",
                  body: "Florida DHSMV does not require sellers to disclose open recalls. Our report pulls all NHTSA recall data so you know before you buy — and before the next registration renewal when a recall notification could ground the vehicle.",
                },
              ].map((s) => (
                <div key={s.step} className="flex gap-4 sm:gap-6 items-start rounded-2xl border border-outline-variant bg-surface p-5 sm:p-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                    <span className="text-white font-headline font-black text-sm">{s.step}</span>
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-headline font-extrabold text-primary mb-1.5">{s.title}</h3>
                    <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">{s.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Florida title brands */}
          <section className="py-12 sm:py-16 border-b border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              Florida Title Brands You Must Know Before Buying
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-8">
              Florida DHSMV stamps every titled vehicle with one or more brands that follow it permanently. A <strong>Florida title search by VIN</strong> reveals these brands even if the vehicle was re-titled in another state.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {TITLE_BRANDS.map((b) => (
                <div key={b.brand} className="flex gap-3 items-start rounded-xl border border-outline-variant bg-surface-container-lowest p-4">
                  <AlertCircle className="w-5 h-5 text-error flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-sm font-bold text-on-surface">{b.brand}</strong>
                    <p className="text-xs text-on-surface-variant mt-0.5 leading-relaxed">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-2xl bg-primary/5 border border-primary/20 p-5 sm:p-6">
              <p className="text-sm text-on-surface-variant leading-relaxed">
                <strong className="text-primary">Florida law (§ 319.14, F.S.)</strong> requires sellers to disclose rebuilt, salvage, and flood titles. However, enforcement is inconsistent in private-party transactions. Always run a <strong>Florida vehicle history report</strong> independently — don&apos;t rely solely on seller disclosure.
              </p>
            </div>
          </section>

          {/* Florida DMV section */}
          <section className="py-12 sm:py-16 border-b border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">
              Florida DHSMV VIN Check vs. Our Free Report
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-6 leading-relaxed">
              The Florida Department of Highway Safety and Motor Vehicles (DHSMV) maintains the official state vehicle title and registration database. Here&apos;s how a <strong>Florida DMV VIN check</strong> compares to our free report:
            </p>
            <div className="overflow-x-auto rounded-2xl border border-outline-variant">
              <table className="w-full border-collapse min-w-[520px] text-sm">
                <thead className="bg-surface-container-low">
                  <tr>
                    <th className="p-4 text-left font-headline font-extrabold text-primary">Data Point</th>
                    <th className="p-4 text-center font-headline font-extrabold text-white bg-primary">CarCheckerVIN (Free)</th>
                    <th className="p-4 text-center font-headline font-bold text-on-surface-variant">DHSMV Direct ($)</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Florida title status",         true,  true],
                    ["Title brands (salvage, flood)", true,  true],
                    ["Lienholder information",        true,  true],
                    ["Accident / damage records",     true,  false],
                    ["National history (all 50 states)", true, false],
                    ["Odometer fraud detection",      true,  false],
                    ["Recall status",                 true,  false],
                    ["Real vehicle photos",           true,  false],
                    ["Cost",                          "Free", "$5–25 + form"],
                    ["Turnaround",                    "< 5 sec", "1–5 business days"],
                  ].map(([feature, us, dmv]) => (
                    <tr key={feature as string} className="border-t border-outline-variant/60">
                      <td className="p-3 sm:p-4 text-on-surface font-medium">{feature}</td>
                      <td className="p-3 sm:p-4 text-center bg-primary/5">
                        {typeof us === "boolean" ? (
                          us ? <Check className="w-5 h-5 text-green-500 mx-auto" strokeWidth={3} /> : <span className="text-error/70 text-xs font-bold">No</span>
                        ) : (
                          <span className="font-headline font-black text-primary text-base">{us}</span>
                        )}
                      </td>
                      <td className="p-3 sm:p-4 text-center">
                        {typeof dmv === "boolean" ? (
                          dmv ? <Check className="w-5 h-5 text-on-surface-variant mx-auto" /> : <span className="text-error/70 text-xs font-bold">No</span>
                        ) : (
                          <span className="text-sm text-on-surface-variant font-semibold">{dmv}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-xs text-on-surface-variant">
              For a certified title copy for legal or financial purposes, request directly from{" "}
              <span className="font-semibold text-on-surface">Florida DHSMV at flhsmv.gov</span>. Our report is for pre-purchase due diligence.
            </p>
          </section>

          {/* Motorcycle VIN section */}
          <section className="py-12 sm:py-16 border-b border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">
              Motorcycle VIN Check in Florida
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed mb-4">
              Florida is one of the top motorcycle markets in the US — year-round riding weather drives high demand for used bikes. A <strong>motorcycle VIN check in Florida</strong> follows the same process as a passenger vehicle, with a few differences:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {[
                { title: "Where to find the motorcycle VIN", body: "The VIN is usually stamped on the steering head (headstock) — look at the front of the frame where the fork meets the frame. It&apos;s also on the engine case and on the title document." },
                { title: "Florida titles motorcycles separately", body: "DHSMV issues a specific Motorcycle Certificate of Title. Salvage and flood brands apply to motorcycles just like cars. Always verify the title type before buying." },
                { title: "Flood risk is high", body: "South Florida&apos;s flooding means motorcycles — often stored outdoors or in garages — are particularly susceptible to flood damage that doesn&apos;t always result in a title brand." },
                { title: "Theft is a major concern", body: "Florida ranks in the top 5 states for motorcycle theft. Our report cross-references the NICB database for theft records on every two-wheeled VIN." },
              ].map((item) => (
                <div key={item.title} className="rounded-xl border border-outline-variant bg-surface-container-lowest p-4">
                  <h3 className="text-sm font-bold text-primary mb-1.5">{item.title}</h3>
                  <p className="text-xs text-on-surface-variant leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
            <Link
              href="/motorcycle-vin-search"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-white text-sm font-bold hover:brightness-110 transition-all"
            >
              Run a Florida Motorcycle VIN Check <ChevronRight className="w-4 h-4" />
            </Link>
          </section>

          {/* Owner lookup limitations */}
          <section className="py-12 sm:py-16 border-b border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">
              VIN Owner Lookup in Florida — What You Can (and Can&apos;t) Access
            </h2>
            <div className="rounded-2xl border border-outline-variant bg-surface-container-low p-5 sm:p-6 mb-5">
              <div className="flex items-start gap-3">
                <Lock className="w-6 h-6 text-secondary flex-shrink-0 mt-0.5" />
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Under the <strong className="text-on-surface">federal Driver&apos;s Privacy Protection Act (DPPA, 18 U.S.C. § 2721)</strong> and Florida Statute § 119.0712, owner names, addresses, and phone numbers tied to vehicle registrations are protected private information. No consumer VIN lookup service — including ours — can legally return owner identity from a VIN search. Any service claiming to provide this is operating outside the law.
                </p>
              </div>
            </div>
            <p className="text-sm text-on-surface-variant leading-relaxed mb-4">
              What a <strong>VIN owner lookup in Florida</strong> <em>can</em> legally provide:
            </p>
            <ul className="space-y-2">
              {[
                "Number of previous owners (count, not names)",
                "Whether the title was issued to a private individual, dealer, or fleet/rental company",
                "State(s) where the vehicle was previously titled",
                "Length of time each title was held (approximate)",
                "Whether any title was issued to a business entity (rental, fleet, lease)",
              ].map((item) => (
                <li key={item} className="flex gap-2 items-start text-sm text-on-surface-variant">
                  <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" strokeWidth={3} />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* Mid-page CTA */}
          <section className="py-10">
            <div className="rounded-3xl bg-primary p-7 sm:p-10 text-center">
              <Star className="w-8 h-8 text-yellow-300 mx-auto mb-3" />
              <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-white mb-2">
                Ready to Check a Florida VIN?
              </h2>
              <p className="text-white/80 text-sm sm:text-base mb-6 max-w-xl mx-auto">
                Free, instant, no credit card. Get the full Florida vehicle history report in under 5 seconds.
              </p>
              <div className="max-w-xl mx-auto bg-white rounded-2xl p-4 sm:p-5">
                <VinSearchForm size="lg" />
              </div>
            </div>
          </section>

          {/* Internal links */}
          <section className="py-12 sm:py-16 border-b border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              More Florida Vehicle Check Tools
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-7">
              Dig deeper into specific Florida vehicle concerns with these targeted tools.
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
                    <div className="text-sm font-bold text-primary group-hover:underline">{l.label}</div>
                    <div className="text-xs text-on-surface-variant mt-0.5">{l.desc}</div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* VIN Check banner */}
          <section className="py-10">
            <VinCheckBanner />
          </section>

          {/* FAQ */}
          <section className="py-12 sm:py-16 border-b border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              Frequently Asked Questions — Florida VIN Check
            </h2>
            <p className="text-sm text-on-surface-variant mb-8">
              Long-tail answers to the questions Florida car buyers search most.
            </p>
            <div className="space-y-3">
              {[
                {
                  q: "How do I run a free VIN check in Florida?",
                  a: "Enter the 17-character VIN in the search box at the top of this page. Our system queries Florida DHSMV records and national databases including NMVTIS to return title status, accident history, odometer records, and more — at no charge.",
                },
                {
                  q: "What is a Florida DMV VIN check?",
                  a: "A Florida DMV VIN check (officially handled by the Florida Department of Highway Safety and Motor Vehicles, DHSMV) verifies vehicle ownership, title status, any liens recorded, and title brands such as salvage, rebuilt, or flood. Our service aggregates DHSMV data alongside NMVTIS and national history providers for a comprehensive report.",
                },
                {
                  q: "Can I look up a vehicle owner by VIN in Florida?",
                  a: "No. Under the federal Driver's Privacy Protection Act (DPPA), owner name and address cannot be returned to the general public from any VIN or plate lookup service. Our VIN check returns vehicle data — specs, title history, accident records — but not personal owner information.",
                },
                {
                  q: "How do I check for a salvage or rebuilt title in Florida?",
                  a: "Run a VIN check above. Florida DHSMV records every title brand on a vehicle's history including salvage, rebuilt, junk, flood, lemon buyback, and odometer discrepancy. These brands follow the VIN permanently and will appear in your free report.",
                },
                {
                  q: "Can I do a motorcycle VIN check in Florida?",
                  a: "Yes. Florida DHSMV titles motorcycles, scooters, and mopeds just like passenger vehicles. Our free VIN check covers all 2-wheeled vehicles registered in Florida. Motorcycle VINs are typically 17 characters on models 1981 and newer.",
                },
                {
                  q: "Does Florida have a lot of flood-damaged vehicles?",
                  a: "Yes — Florida's hurricane and tropical storm history makes it one of the top states for flood-damaged vehicles. After events like Hurricane Ian (2022) and Irma (2017), tens of thousands of flood-totaled vehicles entered the used car market, sometimes with washed titles from other states. Always run a VIN check before buying any Florida vehicle.",
                },
                {
                  q: "What is VIN verification in Florida?",
                  a: "Florida VIN verification is a physical inspection of the VIN plate on the vehicle by a licensed dealer, law enforcement officer, or DHSMV inspector. It is required when registering an out-of-state vehicle in Florida or when the title shows a discrepancy. Our online VIN check is a data verification — not a substitute for a physical VIN inspection when one is legally required.",
                },
                {
                  q: "How do I check a Florida title by VIN?",
                  a: "Enter the VIN in our search tool above. We pull Florida title records via NMVTIS and DHSMV-linked data sources to show the current title status, any lienholders of record, and all historical title brands. For a certified title copy you must request directly from DHSMV.",
                },
                {
                  q: "Is a Florida vehicle history report the same as a Carfax report?",
                  a: "Our Florida vehicle history report covers the same data categories as Carfax — title records, accident history, odometer readings, theft records, and recall status — but our report is free. Carfax charges $44.99 per report. We source data from the same NMVTIS-certified feeds plus additional insurance history providers.",
                },
                {
                  q: "What does 'title washing' mean for Florida vehicles?",
                  a: "Title washing is when a badly-branded vehicle (salvage, flood, lemon) is re-titled in a state with looser branding laws to remove the brand, then brought back to Florida for sale. NMVTIS was created specifically to stop this practice — our report queries all 50 states' records so a washed title cannot hide its history.",
                },
              ].map((f) => (
                <details
                  key={f.q}
                  className="group rounded-2xl border border-outline-variant bg-surface p-4 sm:p-5 [&_summary::-webkit-details-marker]:hidden"
                >
                  <summary className="flex items-start justify-between gap-4 cursor-pointer list-none">
                    <span className="text-sm sm:text-base font-headline font-extrabold text-primary pr-2">{f.q}</span>
                    <span className="flex-shrink-0 mt-0.5 text-primary text-xl font-light group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="mt-3 text-xs sm:text-sm text-on-surface-variant leading-relaxed">{f.a}</p>
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
              Protect Yourself Before You Buy in Florida
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl mx-auto mb-8">
              Florida&apos;s used car market is one of the riskiest in the US for hidden flood damage, title washing, and odometer fraud. A free VIN check takes 5 seconds and could save you thousands.
            </p>
            <div className="max-w-xl mx-auto bg-surface-container-low rounded-2xl p-5 border border-outline-variant">
              <VinSearchForm size="lg" />
            </div>
          </section>

          <RelatedChecks exclude="/florida-vin-check" />
        </div>
      </article>
    </>
  );
}
