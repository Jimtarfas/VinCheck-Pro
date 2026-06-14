import type { Metadata } from "next";
import Link from "next/link";
import {
  Check,
  FileText,
  AlertCircle,
  Clock,
  Gauge,
  Wrench,
  Users,
  Car,
  ChevronRight,
  Star,
  Lock,
  Zap,
  BadgeCheck,
  Building2,
  ShieldAlert,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";

export const metadata: Metadata = {
  title: {
    absolute: "Rideshare & Taxi History Check by VIN — Uber, Lyft & Taxi Records",
  },
  description:
    "Check if a used car was driven as an Uber, Lyft, or taxi by VIN. Spot former rideshare and for-hire use from mileage patterns, commercial registration, and insurance records before you buy. Free preview, no signup, results in seconds.",
  keywords: [
    "rideshare history check VIN",
    "Uber car history",
    "Lyft vehicle check",
    "taxi history VIN",
    "former rideshare vehicle",
    "commercial use check",
    "for-hire vehicle history",
    "is this car a former Uber",
  ],
  alternates: { canonical: "/rideshare-check" },
  openGraph: {
    title: "Rideshare & Taxi History Check by VIN — Uber, Lyft & Taxi Records",
    description:
      "Check if a used car was driven as an Uber, Lyft, or taxi by VIN. Mileage patterns, commercial registration, and insurance signals that reveal for-hire use.",
    url: `${SITE}/rideshare-check`,
    type: "article",
    siteName: "CarCheckerVIN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rideshare & Taxi History Check by VIN — Uber, Lyft & Taxi Records",
    description:
      "Spot a former Uber, Lyft, or taxi by VIN: mileage patterns, for-hire registration, and commercial-insurance signals before you buy.",
  },
  robots: { index: true, follow: true },
};

/* ── JSON-LD schemas ───────────────────────────────────────── */

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Rideshare & Taxi History Check by VIN",
  description:
    "Guide to checking whether a used car was driven as an Uber, Lyft, or taxi by VIN. Covers how commercial passenger use shows up in mileage patterns, for-hire registration, and insurance records, what that history means for wear and value, and how to read the signals before buying.",
  author: ORG_AUTHOR,
  publisher: {
    "@type": "Organization",
    name: "CarCheckerVIN",
    url: SITE,
    logo: { "@type": "ImageObject", url: `${SITE}/logo.png` },
  },
  mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE}/rideshare-check` },
  datePublished: "2026-05-04",
  dateModified: "2026-06-14",
  image: `${SITE}/opengraph-image`,
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Does a VIN check reveal if a car was an Uber or Lyft?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Usually not directly. Uber and Lyft do not report individual vehicles to NMVTIS or vehicle-history databases, so there is rarely a definitive 'rideshare' flag. Former rideshare use is most often inferred from very high mileage relative to the vehicle's age, commercial or for-hire registration, and commercial-insurance records when those exist. A VIN check surfaces those supporting signals rather than a confirmed Uber or Lyft label.",
      },
    },
    {
      "@type": "Question",
      name: "How can I tell if a used car was a former rideshare vehicle?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Look at mileage relative to age first: a two- to three-year-old car with 80,000 or more miles is a common rideshare pattern. Then check the title history for commercial or 'for-hire' registration, look for a rideshare-style endorsement or commercial-insurance record, and inspect the interior for heavy seat, carpet, and door-handle wear. No single clue is proof, but several together strongly suggest commercial passenger use.",
      },
    },
    {
      "@type": "Question",
      name: "Why do former rideshare cars have such high mileage and wear?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A full-time Uber or Lyft driver can cover 40,000 to 60,000 miles a year, three to five times the typical private vehicle. That mileage is mostly stop-and-go city driving with frequent short trips, so brakes, transmissions, and engines wear faster than the same miles on the highway. Constant passenger entry and exit also accelerates interior wear on seats, carpets, and door panels.",
      },
    },
    {
      "@type": "Question",
      name: "Are former rideshare cars a bad buy?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Not automatically. Like rental cars, former rideshare vehicles were driven regularly and may have been maintained on a predictable schedule, which is gentler than long storage or erratic use. The real risk is variable upkeep, since rideshare cars are owned by individual drivers rather than a maintained fleet. Judge each car on its actual mileage, service records, and a mechanic's inspection rather than on rideshare stigma alone.",
      },
    },
    {
      "@type": "Question",
      name: "How does rideshare or commercial use show up in vehicle history?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Traditional taxis and livery cars are registered as commercial 'for-hire' vehicles, creating clear NMVTIS and DMV records. Uber and Lyft cars are typically registered as private passenger vehicles, so they often leave no explicit commercial mark. In those cases, the history points are indirect: unusually high annual mileage, a commercial-insurance entry, or a state-specific rideshare registration where local law requires one.",
      },
    },
    {
      "@type": "Question",
      name: "Should I avoid a high-mileage former rideshare car?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "High mileage alone is not a reason to walk away if the price reflects it and the car checks out mechanically. Prioritize a former rideshare car with documented maintenance and a clean pre-purchase inspection over a cheaper one with no records. Pay special attention to brakes, transmission fluid condition, and suspension components, since city stop-and-go driving wears those systems faster than the odometer suggests.",
      },
    },
    {
      "@type": "Question",
      name: "Does commercial-use insurance history appear on a VIN report?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sometimes. When a vehicle carried a commercial or rideshare-endorsed policy, that coverage can appear in insurance-sourced records tied to the VIN and is a strong hint of for-hire use. But many part-time rideshare drivers use personal policies with only a rideshare add-on, which may not surface clearly. Treat the absence of a commercial-insurance record as inconclusive rather than proof the car was never used for rideshare.",
      },
    },
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Check a VIN for Rideshare or Taxi History",
  description:
    "Step-by-step guide to spotting former Uber, Lyft, taxi, and commercial passenger use from a VIN.",
  totalTime: "PT2M",
  step: [
    { "@type": "HowToStep", position: 1, name: "Locate the VIN", text: "Find the 17-character VIN on the dashboard through the windshield, the driver-side door jamb, or the title document." },
    { "@type": "HowToStep", position: 2, name: "Enter the VIN", text: "Type or paste the VIN into the search box at the top of this page." },
    { "@type": "HowToStep", position: 3, name: "Compare mileage to age", text: "Check the odometer readings against the model year. Forty thousand or more miles a year is a strong rideshare or for-hire pattern." },
    { "@type": "HowToStep", position: 4, name: "Read title and insurance records", text: "Look for commercial or for-hire registration, livery designations, and any commercial or rideshare-endorsed insurance entry tied to the VIN." },
    { "@type": "HowToStep", position: 5, name: "Inspect before buying", text: "Treat the signals as a reason for a pre-purchase inspection. Focus on brakes, transmission, suspension, and interior wear, and confirm the odometer is accurate." },
  ],
};

const serviceRatingSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Rideshare & Taxi History Check by VIN",
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
    { "@type": "ListItem", position: 2, name: "Rideshare Check", item: `${SITE}/rideshare-check` },
  ],
};

const speakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".speakable-intro"] },
  url: `${SITE}/rideshare-check`,
};

const datasetSchema = {
  "@context": "https://schema.org",
  "@type": "Dataset",
  name: "Rideshare & Taxi History Check Quick Statistics",
  description:
    "Coverage and signal reference for CarCheckerVIN's VIN rideshare and taxi history check.",
  url: `${SITE}/rideshare-check`,
  creator: ORG_AUTHOR,
  license: "https://creativecommons.org/licenses/by/4.0/",
  variableMeasured: [
    { "@type": "PropertyValue", name: "Typical full-time rideshare mileage per year", value: "40,000-60,000" },
    { "@type": "PropertyValue", name: "Rideshare mileage vs. private-vehicle rate", value: "3-5x" },
    { "@type": "PropertyValue", name: "Commercial / for-hire registration source", value: "NMVTIS" },
    { "@type": "PropertyValue", name: "Average VIN decode time (seconds)", value: "<5" },
    { "@type": "PropertyValue", name: "Cost for the free preview (USD)", value: "0" },
  ],
};

/* ── Static content ────────────────────────────────────────── */

const HEADLINE_STATS = [
  { value: "40-60k", label: "Miles a year for a full-time driver" },
  { value: "3-5x", label: "The private-vehicle mileage rate" },
  { value: "NMVTIS", label: "Source for for-hire registration" },
  { value: "<5 sec", label: "Average VIN decode time" },
  { value: "$0", label: "Cost for the free preview" },
];

const TRUST_STATS = [
  { icon: Gauge,      value: "Mileage",     label: "annual-rate patterns flagged" },
  { icon: FileText,   value: "For-hire",    label: "commercial registration records" },
  { icon: Clock,      value: "< 5 sec",     label: "average report time" },
  { icon: BadgeCheck, value: "Free preview", label: "no credit card needed" },
];

const RECORD_FIELDS = [
  { icon: Gauge,       title: "Mileage vs. Age",        desc: "Odometer readings over time against the model year. An annual rate far above average is the single strongest rideshare and for-hire signal." },
  { icon: FileText,    title: "Title & Registration",   desc: "Commercial, for-hire, and livery designations recorded against the VIN, the clearest mark of a traditional taxi or fleet car." },
  { icon: Building2,   title: "Commercial Use Records", desc: "NMVTIS and state DMV entries that flag for-hire or commercial passenger use where the vehicle was registered that way." },
  { icon: ShieldAlert, title: "Insurance Signals",      desc: "Commercial or rideshare-endorsed policy records tied to the VIN, a strong hint of for-hire use when present." },
  { icon: Users,       title: "Owner & State History",  desc: "Number of owners and where the car lived. Frequent ownership in a dense metro fits a rideshare profile." },
  { icon: Wrench,      title: "Wear Indicators",        desc: "Service entries and odometer trend that help you judge stop-and-go city wear the mileage number alone hides." },
];

const RIDESHARE_SIGNS = [
  { flag: "Mileage far above its age", desc: "A two- to three-year-old car with 80,000 or more miles is a classic full-time rideshare pattern worth questioning." },
  { flag: "For-hire or commercial registration", desc: "Taxi and livery cars are registered commercially, leaving a clear for-hire mark in NMVTIS and DMV records." },
  { flag: "Commercial or rideshare insurance", desc: "A commercial or rideshare-endorsed policy entry tied to the VIN strongly suggests the car carried paying passengers." },
  { flag: "Heavy interior wear", desc: "Worn seat bolsters, sagging carpet, polished door handles, and grab-handle wear point to constant passenger turnover." },
  { flag: "Registered in a major metro", desc: "Rideshare demand concentrates in big cities. A high-mileage car from a dense urban market fits the profile." },
  { flag: "Short, frequent ownership", desc: "Several owners in a few years, especially with mileage spikes, can mark a car cycled through commercial use." },
];

const INTERNAL_LINKS = [
  { href: "/odometer-check",                    label: "Odometer Check",        desc: "Verify the mileage and screen for rollback." },
  { href: "/rental-car-check",                  label: "Rental Car Check",      desc: "Spot former fleet and rental vehicles." },
  { href: "/fleet-check",                       label: "Fleet Check",           desc: "Identify ex-corporate and government fleet cars." },
  { href: "/accident-history-check",            label: "Accident History Check", desc: "Review collision and damage records." },
  { href: "/vin-check",                         label: "Full VIN Check",        desc: "Run a complete vehicle history report." },
  { href: "/market-value",                      label: "Market Value",          desc: "See how commercial use affects price." },
  { href: "/total-cost-of-ownership-calculator", label: "Cost of Ownership",     desc: "Model upkeep on a high-mileage car." },
  { href: "/vin-decoder",                       label: "VIN Decoder",           desc: "Decode the build details behind the VIN." },
];

const FAQS = faqSchema.mainEntity.map((q) => ({
  q: q.name,
  a: q.acceptedAnswer.text,
}));

export default function RideshareCheckPage() {
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
              items={[{ label: "Home", href: "/" }, { label: "Rideshare Check" }]}
              onDark
            />

            <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
              <Car className="w-4 h-4" /> Uber, Lyft &amp; Taxi History
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-headline font-extrabold leading-tight mb-4">
              Rideshare &amp; Taxi History Check —{" "}
              <span style={{ color: "var(--color-secondary-container)" }}>
                Spot a Former Uber, Lyft, or Taxi by VIN
              </span>
            </h1>

            <p className="speakable-intro text-base sm:text-xl text-white/85 max-w-3xl mb-8 leading-relaxed">
              Find out whether a used car earned its miles carrying paying passengers before you buy it. Enter a 17-character VIN to read the mileage pattern, commercial or for-hire registration, and insurance signals that reveal former rideshare and taxi use. Free preview, no credit card, results in under 5 seconds.
            </p>

            {/* VIN Search */}
            <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-xl">
              <h2 className="text-base sm:text-lg font-headline font-extrabold text-primary mb-1">
                Check for Rideshare and Taxi History by VIN
              </h2>
              <p className="text-xs sm:text-sm text-on-surface-variant mb-4">
                Enter any 17-character VIN — cars, SUVs, vans
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

        {/* ── Stats block (By the numbers) ─────────────────── */}
        <section
          aria-labelledby="rideshare-stats-heading"
          className="max-w-5xl mx-auto px-4 sm:px-6 -mt-8 sm:-mt-10 relative z-10"
        >
          <div className="rounded-3xl bg-surface-container shadow-md border border-outline-variant p-5 sm:p-7">
            <h2
              id="rideshare-stats-heading"
              className="text-xs sm:text-sm font-headline font-black uppercase tracking-widest text-primary mb-4 sm:mb-5"
            >
              Rideshare &amp; Taxi Check — By the Numbers
            </h2>
            <dl className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
              {HEADLINE_STATS.map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl bg-primary-container px-4 py-4 sm:py-5"
                >
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="font-headline font-bold text-2xl sm:text-3xl text-white leading-none mb-2">
                    {s.value}
                  </dd>
                  <p className="text-xs sm:text-sm text-on-primary-container leading-snug">
                    {s.label}
                  </p>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ── Main content ─────────────────────────────────── */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6">

          {/* Why it matters */}
          <section className="py-12 sm:py-16 border-b border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">
              Why a Former Rideshare Car Is the History No One Lists
            </h2>
            <div className="prose prose-slate max-w-none text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              <p>
                Millions of cars are driven every day as Uber, Lyft, and taxi vehicles across the United States, so a meaningful share of the used market has carried paying passengers. That history matters because commercial passenger use wears a car differently than private ownership: very high daily mileage, constant short trips, and continuous passenger loading all leave their mark on the drivetrain and the interior.
              </p>
              <p>
                The problem is that this history rarely appears on the listing. Uber and Lyft register most cars as ordinary private vehicles, so there is usually no <strong className="text-on-surface">rideshare flag</strong> on the title. A seller may not volunteer it, and an inattentive buyer can mistake a worn-out commercial workhorse for a lightly used private car at the same model year.
              </p>
              <p>
                A rideshare and taxi history check reads the signals that do survive. It pulls the mileage pattern, any commercial or for-hire registration, and insurance records tied to the exact 17-character VIN, then lets you weigh them together. No single signal is proof, but read as a set they tell you whether a car likely spent its life carrying strangers, before you base an offer on the assumption it did not.
              </p>
            </div>
          </section>

          {/* What's in the record */}
          <section className="py-12 sm:py-16 border-b border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              What the Report Reveals
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-8">
              Because rideshare use is inferred rather than labeled, the value is in the signals read together. Here is what the report surfaces for each VIN.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {RECORD_FIELDS.map((item) => {
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

          {/* How rideshare use affects a vehicle */}
          <section className="py-12 sm:py-16 border-b border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">
              How Rideshare Use Wears a Vehicle
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-6 leading-relaxed">
              A full-time Uber or Lyft driver can cover 40,000 to 60,000 miles a year, three to five times the national average. Worse for the car, those miles are mostly stop-and-go city driving with frequent short trips, which is harder on every major system than the same distance on the highway. Evaluate a former rideshare car by the wear behind the odometer, not the number alone.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: AlertCircle, title: "Brake system", body: "Frequent urban stops wear pads and rotors well beyond what the mileage alone would suggest." },
                { icon: Wrench, title: "Transmission", body: "Continuous city driving causes thermal stress and faster fluid degradation in automatic transmissions." },
                { icon: Car, title: "Suspension", body: "Curb impacts, rough city roads, and heavier passenger loads wear bushings, shocks, and struts faster." },
                { icon: Gauge, title: "Engine & interior", body: "Short trips that never fully warm the engine accelerate wear, while constant passenger turnover punishes seats, carpets, and handles." },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5 sm:p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className="w-5 h-5 text-primary" />
                      <h3 className="text-base font-headline font-extrabold text-on-surface">{item.title}</h3>
                    </div>
                    <p className="text-sm text-on-surface-variant leading-relaxed">{item.body}</p>
                  </div>
                );
              })}
            </div>
            <p className="mt-6 text-sm sm:text-base text-on-surface-variant leading-relaxed">
              Always get a pre-purchase inspection by an independent mechanic before buying a car with suspected rideshare history, and confirm the odometer reading with our{" "}
              <Link href="/odometer-check" className="text-primary underline underline-offset-2 font-medium">
                odometer check
              </Link>
              .
            </p>
          </section>

          {/* Signs of a former rideshare car */}
          <section className="py-12 sm:py-16 border-b border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              Signs a Used Car Was a Rideshare or Taxi
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-8">
              No single clue is proof. The more of these line up on one car, the more likely it carried paying passengers.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {RIDESHARE_SIGNS.map((b) => (
                <div key={b.flag} className="flex gap-3 items-start rounded-xl border border-outline-variant bg-surface-container-lowest p-4">
                  <AlertCircle className="w-5 h-5 text-error flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-sm font-bold text-on-surface">{b.flag}</strong>
                    <p className="text-xs text-on-surface-variant mt-0.5 leading-relaxed">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Step-by-step */}
          <section className="py-12 sm:py-16 border-b border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              How to Check a VIN for Rideshare History — Step-by-Step
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-8">
              Reading the signals takes under two minutes.
            </p>
            <div className="space-y-4">
              {[
                { step: "01", title: "Locate the VIN", body: "The 17-character VIN is on the dashboard through the lower windshield, the driver-side door jamb sticker, and the title. Confirm all three match before you rely on a result." },
                { step: "02", title: "Run the VIN above", body: "Enter the VIN. The lookup pulls the title, odometer, registration, and insurance-sourced records tied to that exact vehicle." },
                { step: "03", title: "Compare mileage to age", body: "Divide the mileage by the vehicle's age. Forty thousand or more miles a year, especially on a newer car, is a strong commercial-use pattern." },
                { step: "04", title: "Read registration and insurance", body: "Look for commercial or for-hire registration, livery designations, and any commercial or rideshare-endorsed insurance entry. These are the clearest marks of paid passenger use." },
                { step: "05", title: "Inspect and negotiate", body: "Treat the signals as a reason for a mechanic's inspection. Focus on brakes, transmission, and suspension, then use documented commercial use as a negotiating point on price." },
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

          {/* Rideshare vs rental vs private */}
          <section className="py-12 sm:py-16 border-b border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">
              Rideshare vs. Rental vs. Private Use
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-6 leading-relaxed">
              The three kinds of high-use car carry very different risk. The deciding factor is who maintained the vehicle and how consistently.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5 sm:p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Car className="w-5 h-5 text-primary" />
                  <h3 className="text-base font-headline font-extrabold text-on-surface">Rideshare</h3>
                </div>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Owned by an individual driver, used commercially, with highly variable upkeep. The biggest unknown, since maintenance depends entirely on one owner.
                </p>
              </div>
              <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5 sm:p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Building2 className="w-5 h-5 text-primary" />
                  <h3 className="text-base font-headline font-extrabold text-on-surface">Rental &amp; fleet</h3>
                </div>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Fleet-owned, serviced on a fixed schedule, and sold on a set replacement cycle. Often in better mechanical shape than a rideshare car at the same mileage.
                </p>
              </div>
              <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5 sm:p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Check className="w-5 h-5 text-primary" strokeWidth={3} />
                  <h3 className="text-base font-headline font-extrabold text-on-surface">Private</h3>
                </div>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Lower typical mileage and gentler use, but quality still varies by owner. A private car is not automatically the safer buy without records.
                </p>
              </div>
            </div>
            <div className="mt-6 rounded-2xl bg-primary/5 border border-primary/20 p-5 sm:p-6">
              <p className="text-sm text-on-surface-variant leading-relaxed">
                <strong className="text-primary">Bottom line:</strong> a former rideshare car is not automatically a bad buy. Judge it on documented maintenance, actual wear, and a clean inspection, then price the commercial history in rather than ignoring it.
              </p>
            </div>
          </section>

          {/* Mid-page CTA */}
          <section className="py-10">
            <div className="rounded-3xl bg-primary p-7 sm:p-10 text-center">
              <Star className="w-8 h-8 text-yellow-300 mx-auto mb-3" />
              <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-white mb-2">
                Check a VIN for Rideshare History Now
              </h2>
              <p className="text-white/80 text-sm sm:text-base mb-6 max-w-xl mx-auto">
                Free preview, instant, no credit card. See the mileage pattern, commercial registration, and insurance signals in under 5 seconds.
              </p>
              <div className="max-w-xl mx-auto bg-white rounded-2xl p-4 sm:p-5">
                <VinSearchForm size="lg" />
              </div>
            </div>
          </section>

          {/* Internal links */}
          <section className="py-12 sm:py-16 border-b border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              Related Vehicle History Checks
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-7">
              A rideshare check is one usage signal. These checks cover the records it connects to.
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
              Frequently Asked Questions — Rideshare &amp; Taxi History
            </h2>
            <p className="text-sm text-on-surface-variant mb-8">
              The questions used-car buyers ask most about former Uber, Lyft, and taxi vehicles.
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
              <Zap className="w-3.5 h-3.5" /> Free preview · Instant · VIN-Based
            </div>
            <h2 className="text-2xl sm:text-4xl font-headline font-extrabold text-primary mb-3">
              Don&apos;t Overpay for a Former Workhorse
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl mx-auto mb-8">
              A high-mileage ex-rideshare car can look like a lightly used private one. One VIN check reads the mileage pattern, registration, and insurance signals in 5 seconds, so you negotiate from facts.
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
              Rideshare signals are read alongside federal title, odometer, and consumer-protection records so the full picture stays consistent. Below are the primary sources and the agencies you can cross-check with.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              {[
                { href: "https://vehiclehistory.bja.ojp.gov/", label: "NMVTIS — Bureau of Justice Assistance", note: "Federal title system that records commercial and for-hire designations." },
                { href: "https://www.nhtsa.gov/", label: "NHTSA", note: "Federal vehicle safety authority and odometer-fraud guidance." },
                { href: "https://www.ftc.gov/news-events/topics/protecting-consumers/auto-sales-financing", label: "FTC — Auto Sales & Financing", note: "Federal consumer-protection rules on used-vehicle disclosure." },
                { href: "https://www.consumer.ftc.gov/articles/buying-used-car", label: "FTC — Buying a Used Car", note: "Guidance on inspecting and negotiating a used purchase." },
                { href: "https://www.usa.gov/motor-vehicle-services", label: "USA.gov — Motor Vehicle Services", note: "Directory of state DMV registration and title records." },
                { href: "https://www.dol.gov/agencies/whd/state/contacts", label: "State Agency Directory", note: "Where state-specific rideshare and for-hire rules are administered." },
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
              Rideshare use is inferred from supporting signals, not a definitive flag. Absence of a commercial record does not prove a car was never used for rideshare, and a clear result does not replace an independent pre-purchase inspection.
            </p>
          </section>

          <RelatedChecks exclude="/rideshare-check" />
        </div>
      </article>
    </>
  );
}
