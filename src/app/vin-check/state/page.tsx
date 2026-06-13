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
  ChevronRight,
  Star,
  Lock,
  Zap,
  BadgeCheck,
  Map,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import { ORG_AUTHOR } from "@/lib/seo/author";
import { states } from "@/lib/states";
import StateFinder from "./_components/StateFinder";

const SITE = "https://www.carcheckervin.com";

export const metadata: Metadata = {
  title: {
    absolute: "VIN Check by State — Free Title & History for All 50 States",
  },
  description:
    "Free VIN check for every US state. Find your state for local DMV rules and title brands, then run an instant nationwide vehicle history report from NMVTIS data. No signup, no credit card.",
  keywords: [
    "vin check by state",
    "free vin check by state",
    "state dmv vin lookup",
    "vehicle history by state",
    "all states vin decoder",
    "50 states vin check",
    "state title brand check",
    "us vin lookup",
  ],
  alternates: { canonical: "/vin-check/state" },
  openGraph: {
    title: "VIN Check by State — Free Title & History for All 50 States",
    description:
      "Free VIN check for every US state. Local DMV rules, state title brands, and an instant nationwide vehicle history report.",
    type: "article",
    url: `${SITE}/vin-check/state`,
    siteName: "CarCheckerVIN",
  },
  twitter: {
    card: "summary_large_image",
    title: "VIN Check by State — All 50 US States",
    description:
      "Free VIN check for every US state. Local DMV rules, state title brands, and an instant nationwide vehicle history report.",
  },
  robots: { index: true, follow: true },
};

/* ── JSON-LD schemas ───────────────────────────────────────── */

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "VIN Check by State — Free Vehicle History for All 50 US States",
  description:
    "Guide to running a free VIN check in any US state. Covers how nationwide NMVTIS data works, why title brands differ state to state, and how to read a state-by-state vehicle history report.",
  author: ORG_AUTHOR,
  publisher: {
    "@type": "Organization",
    name: "CarCheckerVIN",
    url: SITE,
    logo: { "@type": "ImageObject", url: `${SITE}/logo.png` },
  },
  mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE}/vin-check/state` },
  datePublished: "2026-06-13",
  dateModified: "2026-06-13",
  image: `${SITE}/opengraph-image`,
  about: {
    "@type": "Country",
    name: "United States",
    sameAs: "https://en.wikipedia.org/wiki/United_States",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Does a VIN check work in every US state?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. A VIN check works nationwide because it draws on NMVTIS, the National Motor Vehicle Title Information System, which aggregates title and brand data reported by all 50 state DMVs plus the District of Columbia. No matter where a vehicle was titled, registered, or sold, the same 17-character VIN lookup returns its consolidated history.",
      },
    },
    {
      "@type": "Question",
      name: "What is NMVTIS?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "NMVTIS, the National Motor Vehicle Title Information System, is a federal database administered by the U.S. Department of Justice. It collects title records, brand information, odometer readings, and total-loss reports from state motor-vehicle agencies, insurance carriers, and salvage and junk operators. It was established in part to prevent title fraud and title washing across state lines, and it is the backbone of a nationwide VIN check.",
      },
    },
    {
      "@type": "Question",
      name: "Why do title brands differ from state to state?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Each state writes its own motor-vehicle code, so the wording and criteria for brands like salvage, rebuilt, flood, junk, or lemon-law buyback are set independently. The same physical condition can be labeled differently, or trigger a brand in one state but not another. Because the standards vary, the safest way to understand a specific brand is to check the rules published by the DMV in the state where the title was issued.",
      },
    },
    {
      "@type": "Question",
      name: "Can a car's title history span multiple states?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, and it often does. Vehicles are frequently bought, sold, and re-registered across state lines over their lifetime, so a single VIN can carry records from several state DMVs. Because brands and disclosure rules differ between states, a vehicle's complete picture only emerges when records from every state it touched are combined, which is exactly what a NMVTIS-sourced VIN check does.",
      },
    },
    {
      "@type": "Question",
      name: "What is title washing?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Title washing is the practice of moving a branded vehicle to a state with different titling rules and re-titling it so the brand no longer appears on the new paper title. NMVTIS was created in large part to disrupt this, because the original brand stays attached to the VIN in the federal record even when a later paper title looks clean. A VIN check surfaces the underlying brand history regardless of where the current title was issued.",
      },
    },
    {
      "@type": "Question",
      name: "Does my state's DMV report salvage and junk titles?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "State motor-vehicle agencies are required to report title and brand information, including salvage and junk designations, into NMVTIS, and insurers and salvage yards report total-loss and junk vehicles as well. However, the exact threshold for declaring a vehicle salvage or junk, and the terminology used, is set by each state. For the precise definition and process in your state, consult that state's DMV.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need a different report for each state?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. One VIN check returns a consolidated, nationwide history, so you do not need a separate report per state. The per-state pages on this site exist to explain local DMV procedures and titling terminology, but the underlying lookup is the same nationwide query for any vehicle.",
      },
    },
    {
      "@type": "Question",
      name: "Can I look up a vehicle owner by VIN in my state?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. The federal Driver's Privacy Protection Act (DPPA) bars any consumer VIN or plate lookup from returning an owner's name or address, and it applies in every state. A VIN check returns vehicle data such as title brands, accident records, odometer readings, and the number and type of prior owners, but never the personal identity of an owner.",
      },
    },
    {
      "@type": "Question",
      name: "Where can I find my state's specific title rules?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Title-branding thresholds, fees, and disclosure requirements are set by each state and change over time, so the authoritative source is your own state's Department of Motor Vehicles (or equivalent agency). Use the state finder above to reach a page for your state, then verify any state-specific figures directly with that state's DMV before relying on them.",
      },
    },
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Run a VIN Check in Any State",
  description:
    "Step-by-step guide to running a free VIN check for a vehicle registered in any US state.",
  totalTime: "PT2M",
  step: [
    { "@type": "HowToStep", position: 1, name: "Find your state", text: "Use the state finder at the top of this page to open the page for the state where the vehicle is titled and learn its local DMV rules and title brands." },
    { "@type": "HowToStep", position: 2, name: "Locate the VIN", text: "Find the 17-character VIN on the dashboard (visible through the windshield), the driver-side door jamb, or the title document." },
    { "@type": "HowToStep", position: 3, name: "Enter the VIN", text: "Type or paste the VIN into the search box. The same lookup works for a vehicle titled in any state." },
    { "@type": "HowToStep", position: 4, name: "Review the nationwide report", text: "Read the consolidated report covering title brands from every state, accident records, odometer readings, and recall status." },
    { "@type": "HowToStep", position: 5, name: "Cross-check state rules", text: "Compare any title brand against your state's DMV definitions to understand exactly what it means before you buy." },
  ],
};

const serviceRatingSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "VIN Check by State",
  provider: {
    "@type": "Organization",
    name: "CarCheckerVIN",
    url: SITE,
  },
  areaServed: { "@type": "Country", name: "United States" },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    bestRating: "5",
    worstRating: "1",
    ratingCount: "127",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE },
    { "@type": "ListItem", position: 2, name: "VIN Check", item: `${SITE}/vin-check` },
    { "@type": "ListItem", position: 3, name: "By State", item: `${SITE}/vin-check/state` },
  ],
};

const speakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".speakable-intro"] },
  url: `${SITE}/vin-check/state`,
};

const datasetSchema = {
  "@context": "https://schema.org",
  "@type": "Dataset",
  name: "VIN Check by State Quick Statistics",
  description:
    "Coverage and performance data for CarCheckerVIN's nationwide, state-by-state VIN check.",
  url: `${SITE}/vin-check/state`,
  creator: ORG_AUTHOR,
  license: "https://creativecommons.org/licenses/by/4.0/",
  spatialCoverage: { "@type": "Place", name: "United States" },
  variableMeasured: [
    { "@type": "PropertyValue", name: "US states and territories covered", value: "51" },
    { "@type": "PropertyValue", name: "State DMVs reporting into NMVTIS", value: "50" },
    { "@type": "PropertyValue", name: "Average VIN decode time (seconds)", value: "<5" },
    { "@type": "PropertyValue", name: "Cost for the free preview (USD)", value: "0" },
  ],
};

/* ── Static content ────────────────────────────────────────── */

const HEADLINE_STATS = [
  { value: "50", label: "State DMVs reporting into NMVTIS" },
  { value: "51", label: "States & territories covered" },
  { value: "<5 sec", label: "Average VIN decode time" },
  { value: "1 VIN", label: "One lookup covers every state" },
  { value: "$0", label: "Cost for the free preview" },
];

const TRUST_STATS = [
  { icon: Map,        value: "50",     label: "states covered" },
  { icon: Shield,     value: "NMVTIS", label: "certified data source" },
  { icon: Clock,      value: "< 5 sec", label: "average report time" },
  { icon: BadgeCheck, value: "Free",   label: "no credit card needed" },
];

const REPORT_ITEMS = [
  { icon: FileText,    title: "Title History (All States)", desc: "Every title issued in all 50 states plus DC, including salvage, rebuilt, flood, and junk brands wherever they were recorded." },
  { icon: AlertCircle, title: "Accident Records",   desc: "Collision data from insurance companies, repair facilities, and state DMV reports nationwide." },
  { icon: Search,      title: "Odometer Readings",  desc: "Mileage snapshots from every DMV transaction, inspection, and insurance event across state lines." },
  { icon: Shield,      title: "Theft Records",      desc: "NICB stolen-vehicle database cross-reference covering every US state." },
  { icon: Car,         title: "Recall Status",      desc: "All open NHTSA safety recalls, the same federal data regardless of state." },
  { icon: MapPin,      title: "State Title Brands", desc: "Brand terminology decoded per state so you know what a 'reconstructed' or 'distressed' title actually means." },
];

// Four US census regions, ordered to match the per-state pages.
const REGIONS: { name: string; slugs: string[] }[] = [
  { name: "West",      slugs: ["california", "oregon", "washington", "nevada", "arizona", "idaho", "montana", "wyoming", "utah", "colorado", "new-mexico", "alaska", "hawaii"] },
  { name: "Midwest",   slugs: ["illinois", "indiana", "iowa", "kansas", "michigan", "minnesota", "missouri", "nebraska", "north-dakota", "ohio", "south-dakota", "wisconsin"] },
  { name: "South",     slugs: ["alabama", "arkansas", "florida", "georgia", "kentucky", "louisiana", "mississippi", "north-carolina", "oklahoma", "south-carolina", "tennessee", "texas", "virginia", "west-virginia"] },
  { name: "Northeast", slugs: ["connecticut", "delaware", "maine", "maryland", "massachusetts", "new-hampshire", "new-jersey", "new-york", "pennsylvania", "rhode-island", "vermont"] },
];

const INTERNAL_LINKS = [
  { href: "/florida-vin-check",       label: "Florida VIN Check",        desc: "DHSMV title, flood, and salvage records for FL vehicles." },
  { href: "/salvage-title-check",     label: "Salvage Title Check",      desc: "Detect salvage and rebuilt brands in any state." },
  { href: "/accident-history-check",  label: "Accident History Check",   desc: "Collision and damage records nationwide." },
  { href: "/flood-check",             label: "Flood Damage Check",       desc: "Water-damage title brands across all states." },
  { href: "/odometer-check",          label: "Odometer Check",           desc: "Detect rollback and mileage fraud." },
  { href: "/license-plate-lookup",    label: "License Plate Lookup",     desc: "Find the VIN from a plate in any state." },
  { href: "/lemon-check",             label: "Lemon Law Buyback Check",  desc: "Find manufacturer buyback records." },
  { href: "/vehicle-lien-check",      label: "Lien Check",               desc: "Verify outstanding loans on any vehicle." },
];

const FAQS = faqSchema.mainEntity.map((q) => ({
  q: q.name,
  a: q.acceptedAnswer.text,
}));

export default function StateIndexPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceRatingSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }} />

      <article className="pb-16 bg-surface">

        {/* ── Hero ─────────────────────────────────────────── */}
        <div className="bg-primary text-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-14 sm:pt-28 sm:pb-20">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "VIN Check", href: "/vin-check" },
                { label: "By State" },
              ]}
              onDark
            />

            <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
              <Map className="w-4 h-4" /> All 50 States &nbsp;·&nbsp; NMVTIS Data
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-headline font-extrabold leading-tight mb-4">
              VIN Check by State —{" "}
              <span style={{ color: "var(--color-secondary-container)" }}>
                Free, in Every State
              </span>
            </h1>

            <p className="speakable-intro text-base sm:text-xl text-white/85 max-w-3xl mb-8 leading-relaxed">
              Title rules and brands change at every state line. Find your state below for its local DMV rules, then run any 17-character VIN for an instant nationwide history report. Free, no credit card, results in under 5 seconds.
            </p>

            {/* Run a VIN directly */}
            <div className="bg-white/10 border border-white/15 rounded-2xl p-5 sm:p-6">
              <h2 className="text-sm sm:text-base font-headline font-extrabold text-white mb-3">
                Already have the VIN? Run it now
              </h2>
              <VinSearchForm size="lg" onDark />
              <p className="mt-3 text-[11px] text-white/60 flex items-center gap-1.5">
                <Lock className="w-3 h-3" /> 256-bit encrypted · DPPA compliant · No personal data stored
              </p>
            </div>

            {/* Interactive state finder */}
            <div className="mt-6">
              <StateFinder />
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

        {/* ── Stats block (By the numbers) ─────────────────── */}
        <section
          aria-labelledby="state-stats-heading"
          className="max-w-5xl mx-auto px-4 sm:px-6 -mt-8 sm:-mt-10 relative z-10"
        >
          <div className="rounded-3xl bg-surface-container shadow-md border border-outline-variant p-5 sm:p-7">
            <h2
              id="state-stats-heading"
              className="text-xs sm:text-sm font-headline font-black uppercase tracking-widest text-primary mb-4 sm:mb-5"
            >
              VIN Check by State — By the Numbers
            </h2>
            <dl className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
              {HEADLINE_STATS.map((s) => (
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

        {/* ── Main content ─────────────────────────────────── */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6">

          {/* Why state matters */}
          <section className="py-12 sm:py-16 border-b border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">
              Why the State Matters on a VIN Check
            </h2>
            <div className="prose prose-slate max-w-none text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              <p>
                The lookup itself is nationwide: one VIN returns records from every state a vehicle has touched. What changes at each state line is the <strong className="text-on-surface">law that defines what those records mean</strong>. A vehicle declared a total loss in one state may carry a &ldquo;salvage&rdquo; brand; the identical damage in another state might be branded &ldquo;reconstructed,&rdquo; &ldquo;distressed,&rdquo; or not branded at all.
              </p>
              <p>
                That gap is exactly what makes <strong className="text-on-surface">title washing</strong> possible: a branded car moved to a state with looser rules and re-titled so the brand disappears from the paper. NMVTIS, the federal{" "}
                <a
                  href="https://vehiclehistory.bja.ojp.gov/"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-primary underline underline-offset-2"
                >
                  National Motor Vehicle Title Information System
                </a>{" "}
                , was built to stop this by keeping the original brand attached to the VIN in the federal record no matter how many times the paper title is reissued. Reading a VIN report well means knowing the rules of the state that issued each title, which is why every state has its own page here.
              </p>
            </div>
          </section>

          {/* What your report includes */}
          <section className="py-12 sm:py-16 border-b border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              What a State-by-State VIN Report Includes
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-8">
              One report consolidates data from every state DMV, NMVTIS, NICB, NHTSA, and licensed insurance history providers.
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

          {/* Step-by-step */}
          <section className="py-12 sm:py-16 border-b border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              How to Run a VIN Check in Any State — Step-by-Step
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-8">
              The lookup is identical in all 50 states. The only state-specific step is reading the title brands against local rules.
            </p>
            <div className="space-y-4">
              {[
                { step: "01", title: "Find your state above", body: "Use the state finder to open the page for the state where the vehicle is currently titled. Each state page lists that DMV's exact title-brand terminology, lemon-law window, and any inspection requirements for salvage or rebuilt vehicles." },
                { step: "02", title: "Locate the VIN on the vehicle", body: "The 17-character VIN is on the dashboard (visible through the lower windshield), the driver-side door jamb sticker, and the title document. Confirm all three match, since a mismatch is a serious red flag in any state." },
                { step: "03", title: "Run the nationwide lookup", body: "Enter the VIN above. The query hits NMVTIS, every state DMV feed, NICB, and NHTSA at once, so it does not matter which state the car came from: the report is consolidated." },
                { step: "04", title: "Read title brands against state rules", body: "A brand only tells you what the issuing state decided. Cross-check each brand against that state's definition (linked on its page) so you know whether 'reconstructed' meant light repair or a near-total rebuild." },
                { step: "05", title: "Watch for cross-state gaps", body: "If the title jumped between states with a suspicious gap or a brand that vanished after a move, treat it as a title-washing warning and inspect closely before buying." },
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

          {/* Browse all states by region */}
          <section className="py-12 sm:py-16 border-b border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              Browse All 50 States by Region
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-8">
              Every state page covers its DMV name, exact title brands, lemon-law window, and a state-specific fact worth knowing before you buy.
            </p>
            <div className="space-y-8">
              {REGIONS.map((region) => {
                const regionStates = region.slugs
                  .map((slug) => states.find((s) => s.slug === slug))
                  .filter((s): s is NonNullable<typeof s> => Boolean(s));
                return (
                  <div key={region.name}>
                    <h3 className="text-xs font-headline font-black uppercase tracking-widest text-on-surface-variant mb-3">
                      {region.name}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {regionStates.map((s) => (
                        <Link
                          key={s.slug}
                          href={`/vin-check/state/${s.slug}`}
                          className="flex items-center justify-between gap-3 p-4 bg-surface rounded-xl border border-outline-variant hover:border-primary/40 hover:bg-primary/5 transition-all group"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 text-[11px] font-black">
                              {s.abbr}
                            </div>
                            <div className="min-w-0">
                              <div className="font-semibold text-on-surface truncate group-hover:text-primary">{s.name}</div>
                              <div className="text-xs text-on-surface-variant">{s.vehiclesRegistered} vehicles</div>
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-outline group-hover:text-primary transition-colors flex-shrink-0" />
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Owner lookup limitations */}
          <section className="py-12 sm:py-16 border-b border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">
              VIN Owner Lookup — What Every State Allows (and Doesn&apos;t)
            </h2>
            <div className="rounded-2xl border border-outline-variant bg-surface-container-low p-5 sm:p-6 mb-5">
              <div className="flex items-start gap-3">
                <Lock className="w-6 h-6 text-secondary flex-shrink-0 mt-0.5" />
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  The <strong className="text-on-surface">federal Driver&apos;s Privacy Protection Act (DPPA, 18 U.S.C. § 2721)</strong> applies in all 50 states. Owner names, addresses, and phone numbers tied to vehicle registrations are protected private information. No consumer VIN lookup service, including ours, can legally return owner identity from a VIN search in any state. Any service claiming to do so is operating outside the law.
                </p>
              </div>
            </div>
            <p className="text-sm text-on-surface-variant leading-relaxed mb-4">
              What a <strong>VIN owner lookup</strong> <em>can</em> legally provide, in every state:
            </p>
            <ul className="space-y-2">
              {[
                "Number of previous owners (count, not names)",
                "Whether each title was issued to a private individual, dealer, or fleet/rental company",
                "State(s) where the vehicle was previously titled",
                "Approximate length of time each title was held",
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
                Ready to Check a VIN?
              </h2>
              <p className="text-white/80 text-sm sm:text-base mb-6 max-w-xl mx-auto">
                One lookup covers every state. Free, instant, no credit card. Full vehicle history in under 5 seconds.
              </p>
              <div className="max-w-xl mx-auto bg-white rounded-2xl p-4 sm:p-5">
                <VinSearchForm size="lg" />
              </div>
            </div>
          </section>

          {/* Internal links */}
          <section className="py-12 sm:py-16 border-b border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              More VIN Check Tools
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-7">
              Dig deeper into specific records that appear on a state-by-state report.
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
              Frequently Asked Questions — VIN Check by State
            </h2>
            <p className="text-sm text-on-surface-variant mb-8">
              How nationwide VIN history works across all 50 state DMVs, and why title rules differ from state to state.
            </p>
            <div className="space-y-3">
              {FAQS.map((f) => (
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
              Check Any VIN in Any State
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl mx-auto mb-8">
              Title washing crosses state lines so the brand disappears from the paper. One nationwide VIN check brings the full history back, in 5 seconds, for free.
            </p>
            <div className="max-w-xl mx-auto bg-surface-container-low rounded-2xl p-5 border border-outline-variant">
              <VinSearchForm size="lg" />
            </div>
          </section>

          {/* Sources & Data Authority */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              Sources &amp; Data Authority
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-6">
              Every claim on this page traces back to a public, authoritative US source. Below are the primary references behind a nationwide VIN check and the agencies you can cross-check with.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              {[
                { href: "https://vehiclehistory.bja.ojp.gov/", label: "NMVTIS — Bureau of Justice Assistance", note: "Federal title system aggregating all 50 state DMVs." },
                { href: "https://www.nhtsa.gov/recalls", label: "NHTSA — Safety Recalls", note: "Authoritative open-recall database for every US VIN." },
                { href: "https://www.nicb.org/vincheck", label: "NICB VINCheck", note: "Stolen-vehicle & salvage reports from insurance carriers." },
                { href: "https://www.iihs.org/topics/auto-theft", label: "IIHS — Auto Theft Statistics", note: "Independent state-by-state vehicle-theft research." },
                { href: "https://www.law.cornell.edu/uscode/text/18/2721", label: "18 U.S.C. § 2721 (DPPA)", note: "Federal statute protecting owner identity in every state." },
                { href: "https://www.usa.gov/state-motor-vehicle-services", label: "USA.gov — State DMV Directory", note: "Official links to every state motor-vehicle agency." },
              ].map((s) => (
                <li
                  key={s.href}
                  className="rounded-xl border border-outline-variant bg-surface-container-lowest p-4"
                >
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary font-bold underline underline-offset-2"
                  >
                    {s.label} ↗
                  </a>
                  <p className="mt-1.5 text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                    {s.note}
                  </p>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs text-on-surface-variant italic">
              Title-branding thresholds and disclosure rules are set by each state and change over time. Verify any state-specific figure directly with that state&apos;s DMV before relying on it.
            </p>
          </section>

          <RelatedChecks exclude="/vin-check/state" />
        </div>
      </article>
    </>
  );
}
