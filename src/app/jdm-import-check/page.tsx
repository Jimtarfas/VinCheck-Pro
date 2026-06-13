import type { Metadata } from "next";
import Link from "next/link";
import {
  Check,
  Search,
  ChevronRight,
  Lock,
  Zap,
  BadgeCheck,
  Sparkles,
  Ship,
  Gauge,
  FileText,
  ScrollText,
  MapPin,
  Globe,
  Car,
} from "lucide-react";
import { hreflangAlternates } from "@/lib/seo/hreflang";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";

export const metadata: Metadata = {
  title: "JDM Import VIN Check — Japanese Import Vehicle History (Free)",
  description:
    "Check the history of any Japanese Domestic Market (JDM) import. Verify mileage (km to miles), chassis codes vs 17-character VINs, Japanese auction sheets, the 25-year rule, and US import compliance before you buy.",
  keywords: [
    "JDM import check",
    "Japanese car VIN check",
    "JDM VIN decoder",
    "import vehicle history",
    "JDM mileage check",
    "Japanese import compliance",
    "25-year import rule",
    "JDM chassis code",
    "Japanese auction sheet",
    "Skyline GT-R import check",
    "Supra VIN check",
    "JDM export certificate",
  ],
  alternates: hreflangAlternates("/jdm-import-check"),
  openGraph: {
    title: "JDM Import VIN Check — Japanese Import Vehicle History",
    description:
      "Check the history of any JDM import: mileage in km vs miles, chassis codes, auction sheets, the 25-year rule, and US compliance status.",
    url: `${SITE}/jdm-import-check`,
    type: "article",
    siteName: "CarCheckerVIN",
  },
  twitter: {
    card: "summary_large_image",
    title: "JDM Import VIN Check — Japanese Import Vehicle History",
    description:
      "Verify a JDM import's mileage, chassis code, auction sheet, 25-year eligibility, and US compliance before you buy.",
  },
  robots: { index: true, follow: true },
};

/* ── JSON-LD schemas ───────────────────────────────────────────── */

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "JDM Import VIN Check",
  url: `${SITE}/jdm-import-check`,
  applicationCategory: "AutomotiveApplication",
  operatingSystem: "All",
  description:
    "Check the history of a Japanese Domestic Market import vehicle. Verifies mileage (kilometers to miles), Japanese chassis codes against the 17-character US VIN, auction-sheet condition grades, export and deregistration certificates, the 25-year import rule, and US registration compliance.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  publisher: {
    "@type": "Organization",
    name: "CarCheckerVIN",
    url: SITE,
    logo: { "@type": "ImageObject", url: `${SITE}/logo.png` },
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "JDM Import VIN Check — Japanese Import Vehicle History",
  description:
    "How to check the history of Japanese Domestic Market import vehicles: mileage verification in kilometers, chassis codes versus the 17-character VIN, Japanese auction sheets, the 25-year import rule, and US compliance status.",
  author: ORG_AUTHOR,
  publisher: {
    "@type": "Organization",
    name: "CarCheckerVIN",
    url: SITE,
    logo: { "@type": "ImageObject", url: `${SITE}/logo.png` },
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${SITE}/jdm-import-check`,
  },
  datePublished: "2026-05-04",
  dateModified: "2026-06-13",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the 25-year import rule?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The US '25-year rule' (administered by NHTSA and US Customs under 49 CFR 591) lets a nonconforming vehicle be imported once it is at least 25 years old, measured from its month of manufacture. At that age it is exempt from Federal Motor Vehicle Safety Standards (FMVSS) and from EPA conformity requirements. This is why JDM models never sold in America, like the Nissan Skyline GT-R, become legally importable only after they turn 25.",
      },
    },
    {
      "@type": "Question",
      name: "Do JDM imports have a 17-character VIN or a Japanese chassis code?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most Japanese-domestic-market vehicles do not use a 17-character VIN. Instead they carry a manufacturer chassis code (also called a frame or model number), such as JZA80 for a Toyota Supra or BNR32 for a Nissan Skyline GT-R, followed by a sequential production number. A standardized 17-character US VIN was not required for the Japan market, so JDM cars are identified by this shorter chassis/frame number until they are titled in the United States.",
      },
    },
    {
      "@type": "Question",
      name: "How do I decode a Japanese chassis number?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A Japanese chassis number combines a model code with a production sequence, for example BNR32-123456. The letter-and-number model code identifies the platform, body, and often the engine: in BNR32, 'BNR32' designates the R32-generation Skyline GT-R with the RB26DETT engine. The digits after the dash are the unit's build sequence. Decoding is manufacturer-specific, so confirm the code against the maker's chassis catalog rather than assuming a universal format.",
      },
    },
    {
      "@type": "Question",
      name: "Can you run a US history report on a JDM import?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can, but be aware of a major limitation: US history databases such as NMVTIS generally hold little or no record for a freshly imported JDM vehicle, because all of its history happened in Japan before it arrived. NMVTIS draws from US state DMVs, insurers, and salvage operators, none of which saw the car. A meaningful US record only begins after the vehicle clears customs and receives a US title and VIN.",
      },
    },
    {
      "@type": "Question",
      name: "How do I check a JDM import's history before it was brought to the US?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Because US databases will not cover the Japan period, the primary sources are Japanese auction sheets and the export/deregistration certificate. Auction sheets from houses like USS, TAA, or JU record the mileage, a graded condition score (typically 1 to 5), and a damage map at the time of sale. The export certificate documents the vehicle as it left Japan. Together these are the best evidence of a JDM import's pre-import condition and mileage.",
      },
    },
    {
      "@type": "Question",
      name: "What is a deregistration or export certificate?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "When a vehicle is exported from Japan, its domestic registration is cancelled and Japanese authorities issue a deregistration (or export) certificate. This document proves the car was officially removed from Japan's registry and lawfully exported, and it typically records the chassis code, recorded mileage, and export date. US importers use it during customs entry, and it is a key authenticity record buyers should ask to see for any JDM import.",
      },
    },
    {
      "@type": "Question",
      name: "How do I verify a JDM import was legally imported?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Confirm the vehicle was at least 25 years old at the time of import (or, rarely, meets full FMVSS and EPA compliance), then verify the paper trail: a US Customs and Border Protection entry record (CBP Form 7501) with bond release, the Japanese export/deregistration certificate, and a US title issued by the state of first registration. Illegally imported vehicles cannot be lawfully titled and may be subject to seizure, so this documentation is essential before purchase.",
      },
    },
    {
      "@type": "Question",
      name: "How do I convert a JDM odometer reading from kilometers to miles?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "JDM odometers read in kilometers, not miles. Multiply the kilometer figure by 0.621 to get miles, so 60,000 km is roughly 37,000 miles. Always confirm which unit a listing is quoting, because some sellers present the kilometer number as if it were miles to make a car look lower-mileage than it is. Cross-check the figure against the Japanese auction sheet and the export certificate, which both record mileage at the time the car left Japan.",
      },
    },
  ],
};

const FAQS = faqSchema.mainEntity.map((q) => ({
  question: q.name,
  answer: q.acceptedAnswer.text,
}));

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Check a JDM Import's History",
  description:
    "Verify a Japanese Domestic Market import's mileage, chassis code, pre-import condition, and US compliance before buying.",
  totalTime: "PT4M",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Identify the chassis code or US VIN",
      text: "Read the Japanese chassis code (for example BNR32 or JZA80) or, if already titled in the US, the 17-character VIN from the title and door jamb.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Pull the Japanese auction sheet and export certificate",
      text: "Find the USS, TAA, or JU auction sheet for its grade and damage map, and the export/deregistration certificate that records mileage and export date.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Verify mileage in the correct units",
      text: "Confirm whether the odometer reads kilometers or miles and convert (km times 0.621). Compare against the auction sheet and export certificate.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Confirm legal import and US history",
      text: "Check the CBP Form 7501 entry, the 25-year eligibility, the state title, and run a US VIN history report for anything that happened after the car landed.",
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE },
    {
      "@type": "ListItem",
      position: 2,
      name: "JDM Import Check",
      item: `${SITE}/jdm-import-check`,
    },
  ],
};

const speakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["h1", ".speakable-intro"],
  },
  url: `${SITE}/jdm-import-check`,
};

/* ── Static UI data ────────────────────────────────────────────── */

const TRUST_STATS = [
  { icon: ScrollText, value: "25-Year", label: "import rule (49 CFR 591)" },
  { icon: Gauge, value: "km → mi", label: "mileage verified" },
  { icon: Globe, value: "Japan", label: "auction sheet history" },
  { icon: BadgeCheck, value: "Free", label: "VIN lookup, no sign-up" },
];

const HOW_STEPS = [
  {
    icon: Search,
    tag: "Step 1",
    title: "Enter the VIN or chassis code",
    body: "Type the US 17-character VIN if the car is already titled here, or the Japanese chassis code (BNR32, JZA80, GC8) for a car still on its export paperwork.",
  },
  {
    icon: FileText,
    tag: "Step 2",
    title: "We surface the import trail",
    body: "The lookup ties the identifier to US title and NMVTIS records, then points you to the Japanese auction sheet and export certificate that cover the pre-import years.",
  },
  {
    icon: Gauge,
    tag: "Step 3",
    title: "Verify mileage and compliance",
    body: "Confirm kilometers versus miles, cross-check the auction grade, and validate 25-year eligibility and the CBP entry so you know the car was legally imported.",
  },
];

const CONTENTS = [
  {
    icon: ScrollText,
    title: "Chassis code vs US VIN",
    body: "Why JDM cars carry a frame code like BNR32 instead of a 17-character VIN, and how that code maps to platform and engine.",
  },
  {
    icon: Gauge,
    title: "Mileage in kilometers",
    body: "How to convert km to miles, and how to catch sellers quoting the kilometer figure as if it were miles.",
  },
  {
    icon: FileText,
    title: "Japanese auction sheet",
    body: "The USS, TAA, or JU sheet with its 1 to 5 condition grade and damage map at the time the car was sold for export.",
  },
  {
    icon: Ship,
    title: "Export & deregistration cert",
    body: "Proof the car was removed from Japan's registry and lawfully exported, with chassis code, mileage, and export date.",
  },
  {
    icon: BadgeCheck,
    title: "25-year eligibility",
    body: "Whether the car was at least 25 years old at import under 49 CFR 591, the FMVSS and EPA exemption that makes it legal.",
  },
  {
    icon: MapPin,
    title: "US title & compliance",
    body: "The CBP Form 7501 entry, bond release, state title, and any extra state rules such as California CARB emissions.",
  },
];

const COLLECTOR_CHECKLIST = [
  "Confirm the chassis code matches the platform and engine claimed",
  "Convert the odometer (km × 0.621) and compare to the auction sheet",
  "Read the auction grade and damage map for past repairs",
  "Verify the export/deregistration certificate is genuine",
  "Confirm 25-year eligibility and the CBP Form 7501 entry",
  "Run a US VIN history report for everything since import",
];

const DOC_FIELDS = [
  "Chassis / frame code (e.g. BNR32)",
  "Recorded mileage in kilometers",
  "Auction condition grade (1 to 5)",
  "Damage map from the auction sheet",
  "Export / deregistration date",
  "CBP Form 7501 customs entry",
];

const INTERNAL_LINKS = [
  {
    href: "/vin-check",
    label: "Full VIN History Check",
    desc: "Title, accident, odometer, and recall records on the US chassis number after import.",
  },
  {
    href: "/stolen-vehicle-check",
    label: "Stolen Vehicle Check",
    desc: "Confirm the import is not flagged as stolen before money changes hands.",
  },
  {
    href: "/vin-decoder",
    label: "VIN Decoder",
    desc: "Decode the 17-character VIN a JDM car receives once it is titled in the US.",
  },
  {
    href: "/odometer-check",
    label: "Odometer Check",
    desc: "Catch odometer rollback and km-to-miles mislabeling on an import.",
  },
  {
    href: "/salvage-title-check",
    label: "Salvage Title Check",
    desc: "Check whether the car picked up a branded title after it landed in the US.",
  },
  {
    href: "/classic-car-vin",
    label: "Classic Car VIN Decoder",
    desc: "For older imports with shorter, era-specific identification formats.",
  },
];

const POPULAR_MODELS = [
  {
    name: "Nissan Skyline GT-R (R32, R33, R34)",
    chassis: "BNR32 / BCNR33 / BNR34",
    note: "Verify the RB26DETT matching numbers, check for turbocharger rebuilds, and confirm a clean title from a licensed importer.",
  },
  {
    name: "Toyota Supra (JZA80)",
    chassis: "JZA80",
    note: "Confirm the 2JZ-GTE twin-turbo if claimed, verify the gearbox (the 6-speed is highly desirable), and check for track damage.",
  },
  {
    name: "Honda NSX / NSX-R",
    chassis: "NA1 / NA2",
    note: "Confirm NSX-R specification (lighter weight, no A/C or radio) and verify mileage against the Japanese auction documentation.",
  },
  {
    name: "Subaru Impreza WRX STI",
    chassis: "GC8 / GDB",
    note: "Verify the engine (EJ20 versus EJ207), check the differential condition, and confirm no major rally or track damage.",
  },
];

/* ── Page ──────────────────────────────────────────────────────── */

export default function JdmImportCheckPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }}
      />

      <article className="pb-16 bg-surface">
        {/* ── Hero ─────────────────────────────────────────── */}
        <div className="bg-primary text-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-14 sm:pt-28 sm:pb-20">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "JDM Import Check" },
              ]}
              onDark
            />

            <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
              <Ship className="w-4 h-4" /> Japanese Imports &nbsp;·&nbsp;
              Chassis Code, Mileage &amp; 25-Year Rule
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-headline font-extrabold leading-tight mb-4">
              JDM Import VIN Check —{" "}
              <span style={{ color: "var(--color-secondary-container)" }}>
                Japanese Import History
              </span>
            </h1>

            <p className="speakable-intro text-base sm:text-xl text-white/85 max-w-3xl mb-8 leading-relaxed">
              Japanese Domestic Market cars like the Nissan Skyline GT-R, Honda
              NSX-R, Subaru Impreza STI, and Toyota Supra RZ were never sold in
              America. Most of their history happened in Japan, recorded on a
              chassis code, an auction sheet, and an export certificate rather
              than a US VIN. Start with the VIN or chassis code to verify
              mileage, condition, and legal import status. It&apos;s free.
            </p>

            <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-xl">
              <h2 className="text-base sm:text-lg font-headline font-extrabold text-primary mb-1">
                Check a JDM Import by VIN or Chassis Code
              </h2>
              <p className="text-xs sm:text-sm text-on-surface-variant mb-4">
                Enter the US 17-character VIN, or the Japanese chassis code, and
                we&apos;ll pull the import and history trail
              </p>
              <VinSearchForm size="lg" />
              <p className="mt-3 text-[11px] text-slate-400 flex items-center gap-1.5">
                <Lock className="w-3 h-3" /> Free · No sign-up · Instant result
              </p>
            </div>

            {/* Trust stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
              {TRUST_STATS.map((s) => {
                const Icon = s.icon;
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

        {/* ── Main content ─────────────────────────────────── */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          {/* ── How the lookup works ─────────────────────────── */}
          <section className="py-12 sm:py-16">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              How a JDM Import Check Works
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl">
              A JDM import has two histories: the Japan years on its chassis
              code and auction paperwork, and the US years that begin once it is
              titled here. A real check reads both.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {HOW_STEPS.map((m) => {
                const Icon = m.icon;
                return (
                  <div
                    key={m.title}
                    className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5 sm:p-6"
                  >
                    <div className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-[11px] font-black uppercase tracking-wider text-primary/70 mb-0.5">
                      {m.tag}
                    </div>
                    <h3 className="text-base sm:text-lg font-headline font-extrabold text-primary mb-1.5">
                      {m.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                      {m.body}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ── What is a JDM import ─────────────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              What Counts as a JDM Import?
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl leading-relaxed">
              Japanese Domestic Market vehicles are cars, trucks, and
              motorcycles built for sale inside Japan, often with different
              specifications than the versions exported elsewhere. The records
              that matter live across a few key sources.
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
                <p>
                  Japan&apos;s rigorous{" "}
                  <strong className="text-on-surface">Shaken</strong> vehicle
                  inspection system makes ownership of older cars expensive,
                  which pushes owners to sell at relatively low mileage. That is
                  why so many JDM imports arrive with well-documented,
                  low-kilometer histories compared to equivalent Western cars.
                </p>
                <p>
                  US import rules under{" "}
                  <strong className="text-on-surface">49 CFR Part 591</strong>,
                  the 25-year rule, allow a vehicle at least 25 years old to be
                  imported without meeting current Federal Motor Vehicle Safety
                  Standards. This opened the door to icons from the late 1990s
                  and early 2000s that US buyers could never order new.
                </p>
                <p>
                  The market&apos;s growth has also created room for fraud:
                  mileage manipulation, fabricated titles, compliance
                  misrepresentation, and cars imported before they were actually
                  eligible. A thorough JDM import check guards against all of
                  these.
                </p>
              </div>
              <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="w-5 h-5 text-primary" />
                  <h3 className="font-headline font-extrabold text-primary">
                    Documents that tell the story
                  </h3>
                </div>
                <ul className="space-y-2 text-sm text-on-surface">
                  {DOC_FIELDS.map((tip) => (
                    <li key={tip} className="flex items-start gap-2">
                      <Check
                        className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5"
                        strokeWidth={3}
                      />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs text-on-surface-variant leading-relaxed">
                  US databases only see the car after it lands, so the Japanese
                  paperwork is your main evidence for the pre-import years.
                </p>
              </div>
            </div>
          </section>

          {/* ── What the check contains ──────────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              What a JDM Import Check Covers
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">
              Between the Japanese records and the US title trail, a complete
              import check documents the car&apos;s identity, mileage, condition,
              and legal status.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {CONTENTS.map((c) => {
                const Icon = c.icon;
                return (
                  <div
                    key={c.title}
                    className="rounded-2xl border border-outline-variant bg-surface p-5"
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-base font-headline font-extrabold text-primary mb-1">
                      {c.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                      {c.body}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ── Chassis code vs VIN deep-dive ────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              Chassis Code vs the 17-Character VIN
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl leading-relaxed">
              This is the single biggest difference between a JDM import and a
              US-market car, and the reason standard VIN databases come up
              short.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5 sm:p-6">
                <div className="text-[11px] font-black uppercase tracking-wider text-on-surface-variant mb-2">
                  Japanese Chassis Code
                </div>
                <p className="text-lg font-headline font-extrabold text-on-surface mb-3">
                  What the car was born with
                </p>
                <ul className="space-y-2 text-sm text-on-surface-variant">
                  <li className="flex gap-2">
                    <span>·</span>
                    <span>
                      A frame/model code plus a sequence, like BNR32-123456.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span>·</span>
                    <span>
                      Encodes platform, body, and often engine (BNR32 = R32
                      GT-R, RB26DETT).
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span>·</span>
                    <span>Shorter than a US VIN and maker-specific.</span>
                  </li>
                  <li className="flex gap-2">
                    <span>·</span>
                    <span>
                      Decode against the manufacturer catalog, not a universal
                      format.
                    </span>
                  </li>
                </ul>
              </div>
              <div className="rounded-2xl border border-primary/30 bg-primary/5 p-5 sm:p-6">
                <div className="text-[11px] font-black uppercase tracking-wider text-primary mb-2">
                  US 17-Character VIN
                </div>
                <p className="text-lg font-headline font-extrabold text-primary mb-3">
                  What it receives once titled here
                </p>
                <ul className="space-y-2 text-sm text-on-surface-variant">
                  <li className="flex gap-2">
                    <span>·</span>
                    <span>
                      Assigned through the state DMV after a CBP customs entry.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span>·</span>
                    <span>
                      Often built from the chassis number, so it may not match
                      the standard 17-character pattern.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span>·</span>
                    <span>
                      This is the identifier NMVTIS and US history reports track.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span>·</span>
                    <span>
                      US records only start from the date of first US title.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <p className="mt-5 text-xs text-on-surface-variant">
              Once a JDM car has a US VIN, decode it with our{" "}
              <Link
                href="/vin-decoder"
                className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80"
              >
                VIN decoder
              </Link>{" "}
              and pull its domestic record with a full{" "}
              <Link
                href="/vin-check"
                className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80"
              >
                VIN history check
              </Link>
              .
            </p>
          </section>

          {/* ── Mileage verification ─────────────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">
              Verifying JDM Mileage (Kilometers, Not Miles)
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
                <p>
                  JDM odometers read in kilometers. A car showing 60,000 km has
                  about <strong className="text-on-surface">37,000 miles</strong>{" "}
                  of use (multiply km by 0.621). That gap is exactly what some
                  sellers exploit, presenting the kilometer figure as if it were
                  miles to make a car look lower-mileage than it is.
                </p>
                <p>
                  The Japanese auction export sheet, typically from USS, TAA, or
                  JU, records mileage at the time of the export sale and is the
                  most reliable single reference. The export and deregistration
                  certificate records it again as the car left Japan, and the US
                  title should document it at import.
                </p>
                <p>
                  Large gaps between any of these figures and the current
                  odometer need an explanation. Pair this page with a focused{" "}
                  <Link
                    href="/odometer-check"
                    className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80"
                  >
                    odometer check
                  </Link>{" "}
                  to catch rollback.
                </p>
              </div>
              <div className="rounded-2xl bg-secondary-container/40 border border-outline-variant p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Gauge className="w-5 h-5 text-on-secondary-container" />
                  <h3 className="font-headline font-extrabold text-on-secondary-container">
                    Mileage cross-checks
                  </h3>
                </div>
                <ul className="space-y-2 text-sm text-on-surface">
                  {[
                    "Confirm the unit: kilometers or miles",
                    "Convert: km × 0.621 = miles",
                    "Match against the auction sheet figure",
                    "Match against the export certificate",
                    "Match against the import mileage on the US title",
                    "Read the auction grade (1 to 5) and damage map",
                  ].map((spot) => (
                    <li key={spot} className="flex items-start gap-2">
                      <Check
                        className="w-4 h-4 text-primary flex-shrink-0 mt-0.5"
                        strokeWidth={3}
                      />
                      <span>{spot}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs text-on-surface-variant leading-relaxed">
                  Auction grade certificates rate condition on a 1 to 5 scale
                  and map any damage at the time of sale. They should travel with
                  the car.
                </p>
              </div>
            </div>
          </section>

          {/* ── Mid-page CTA ───────────────────────────────── */}
          <section className="py-10">
            <div className="rounded-3xl bg-primary p-7 sm:p-10 text-center">
              <Sparkles className="w-8 h-8 text-yellow-300 mx-auto mb-3" />
              <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-white mb-2">
                Verify a JDM Import Before You Buy
              </h2>
              <p className="text-white/80 text-sm sm:text-base mb-6 max-w-xl mx-auto">
                Enter the VIN or chassis code to confirm mileage, condition, and
                legal import status. Free, in seconds.
              </p>
              <div className="max-w-xl mx-auto bg-white rounded-2xl p-4 sm:p-5">
                <VinSearchForm size="lg" />
              </div>
            </div>
          </section>

          {/* ── Import compliance ────────────────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">
              Import Compliance and US Registration
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
                <p>
                  A legal JDM import has to clear US customs and, in many states,
                  meet registration requirements. The car must be at least 25
                  years old for the standard exemption, or meet full NHTSA and
                  EPA compliance, which is extremely rare for JDM-specific
                  models.
                </p>
                <p>
                  States vary. California adds{" "}
                  <strong className="text-on-surface">CARB</strong> emissions
                  requirements that can complicate or block registration of some
                  JDM cars, and some states require a structural inspection
                  first. Research your own state&apos;s rules before you buy.
                </p>
                <p>
                  Confirm the car was imported through a licensed importer,
                  cleared customs with proper documentation (CBP entry records,
                  bond release), and holds a US title from the state of first
                  registration. Illegally imported vehicles cannot be registered
                  and may be seized. Always run a{" "}
                  <Link
                    href="/stolen-vehicle-check"
                    className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80"
                  >
                    stolen vehicle check
                  </Link>{" "}
                  as well.
                </p>
              </div>
              <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <BadgeCheck className="w-5 h-5 text-primary" />
                  <h3 className="font-headline font-extrabold text-primary">
                    Buyer verification checklist
                  </h3>
                </div>
                <ul className="space-y-2 text-sm text-on-surface">
                  {COLLECTOR_CHECKLIST.map((tip) => (
                    <li key={tip} className="flex items-start gap-2">
                      <Check
                        className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5"
                        strokeWidth={3}
                      />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-5 rounded-xl bg-white p-4 border border-outline-variant">
                  <p className="text-xs font-bold text-on-surface mb-2">
                    Start the JDM import lookup:
                  </p>
                  <VinSearchForm size="sm" />
                </div>
              </div>
            </div>
          </section>

          {/* ── Popular models ─────────────────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              Popular JDM Models and What to Verify
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">
              A handful of icons dominate the import market, and each carries its
              own checks beyond the standard history report.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {POPULAR_MODELS.map((m) => (
                <div
                  key={m.name}
                  className="rounded-2xl border border-outline-variant bg-surface p-5 sm:p-6"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Car className="w-5 h-5 text-primary flex-shrink-0" />
                    <h3 className="text-base font-headline font-extrabold text-primary">
                      {m.name}
                    </h3>
                  </div>
                  <div className="text-[11px] font-black uppercase tracking-wider text-on-surface-variant mb-2">
                    Chassis: {m.chassis}
                  </div>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                    {m.note}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-5 text-xs text-on-surface-variant">
              For any of these, run a full{" "}
              <Link
                href="/vin-check"
                className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80"
              >
                VIN history report
              </Link>{" "}
              on the US chassis number to capture any domestic history after
              import.
            </p>
          </section>

          {/* ── Internal links ─────────────────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              More VIN Tools for Import Buyers
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-7">
              The import check is the starting point. These tools complete the
              picture on any Japanese import.
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

          {/* ── VIN check banner ───────────────────────────── */}
          <section className="py-10">
            <VinCheckBanner />
          </section>

          {/* ── FAQ ────────────────────────────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              JDM Import Check: Frequently Asked Questions
            </h2>
            <p className="text-sm text-on-surface-variant mb-8">
              The questions importers and buyers ask most about JDM history,
              chassis codes, and the 25-year rule.
            </p>
            <div className="space-y-3">
              {FAQS.map((f) => (
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

          {/* ── Bottom CTA ─────────────────────────────────── */}
          <section className="py-14 sm:py-20 text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-xs font-black uppercase tracking-wider mb-4">
              <Zap className="w-3.5 h-3.5" /> Free · Instant · JDM Import History
            </div>
            <h2 className="text-2xl sm:text-4xl font-headline font-extrabold text-primary mb-3">
              Check Any JDM Import Vehicle
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl mx-auto mb-8">
              Enter the VIN or chassis number to check import records, mileage
              history, and US compliance status for any Japanese import.
            </p>
            <div className="max-w-xl mx-auto bg-surface-container-low rounded-2xl p-5 border border-outline-variant">
              <VinSearchForm size="lg" />
            </div>
            <div className="mt-3 flex items-center justify-center gap-2 text-xs text-on-surface-variant">
              <Check className="w-3.5 h-3.5 text-green-500" strokeWidth={3} />
              No credit card · No sign-up · Free
            </div>
          </section>

          <RelatedChecks exclude="/jdm-import-check" />
        </div>
      </article>
    </>
  );
}
