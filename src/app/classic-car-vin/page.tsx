import type { Metadata } from "next";
import Link from "next/link";
import {
  Check,
  Shield,
  Search,
  FileText,
  CalendarClock,
  ChevronRight,
  Lock,
  Zap,
  BadgeCheck,
  Sparkles,
  Cog,
  Wrench,
  Gauge,
  ClipboardCheck,
  Factory,
  Hash,
  ScrollText,
  BookOpen,
  History,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";

export const metadata: Metadata = {
  title: {
    absolute: "Classic Car VIN Decoder — Pre-1981 Vehicle Lookup (Free)",
  },
  description:
    "Decode pre-1981 classic and vintage car VINs free. Understand GM, Ford, Chrysler, and AMC VIN formats, verify numbers-matching, and document factory specs before you buy.",
  keywords: [
    "classic car VIN decoder",
    "vintage car VIN",
    "pre-1981 VIN decode",
    "old car VIN lookup",
    "antique vehicle VIN",
    "numbers matching VIN check",
  ],
  alternates: { canonical: "/classic-car-vin" },
  openGraph: {
    title: "Classic Car VIN Decoder — Pre-1981 Vehicle Lookup (Free)",
    description:
      "Decode pre-1981 classic and vintage car VINs. Understand GM, Ford, Chrysler, and AMC formats and verify numbers-matching authenticity.",
    url: `${SITE}/classic-car-vin`,
    type: "article",
    siteName: "CarCheckerVIN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Classic Car VIN Decoder — Pre-1981 Vehicle Lookup (Free)",
    description:
      "Decode pre-1981 classic and vintage car VINs. Understand GM, Ford, Chrysler, and AMC formats and verify numbers-matching.",
  },
  robots: { index: true, follow: true },
};

/* ── JSON-LD schemas ───────────────────────────────────────────── */

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Classic Car VIN Decoder",
  url: `${SITE}/classic-car-vin`,
  applicationCategory: "AutomotiveApplication",
  operatingSystem: "All",
  description:
    "Decode a classic or vintage vehicle by its VIN. Understand pre-1981 manufacturer formats from GM, Ford, Chrysler, and AMC, and verify numbers-matching authenticity.",
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
  headline: "Classic Car VIN Decoder — Pre-1981 Vehicle Identification",
  description:
    "How to decode pre-1981 classic and vintage car VINs, including manufacturer-specific formats from GM, Ford, Chrysler, and AMC, and how to verify numbers-matching authenticity.",
  author: ORG_AUTHOR,
  publisher: {
    "@type": "Organization",
    name: "CarCheckerVIN",
    url: SITE,
    logo: { "@type": "ImageObject", url: `${SITE}/logo.png` },
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${SITE}/classic-car-vin`,
  },
  datePublished: "2026-05-04",
  dateModified: "2026-06-12",
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Decode a Classic Car VIN",
  description:
    "Decode a pre-1981 classic car VIN by identifying the make and model year, then applying the correct manufacturer key.",
  totalTime: "PT3M",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Identify the exact make and model year",
      text: "Pre-1981 VINs had no universal standard, so decoding depends entirely on the manufacturer and year. Confirm the make and model year before reading any positions.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Locate the VIN and trim tag",
      text: "Find the VIN on the door post, firewall, frame, or dash-base plate, and note any separate cowl or trim tag that carries additional build codes.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Apply the correct manufacturer key",
      text: "Use the year-specific reference table for that make to decode division, body series, engine, assembly plant, and sequence — these codes change year to year.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Cross-check for numbers-matching",
      text: "Compare the VIN-encoded engine code against the casting and stamping numbers on the block, transmission, and axle to verify the original factory drivetrain.",
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I decode a classic car VIN from before 1981?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Identify the exact make and model year first, then apply that manufacturer's specific decoding key — there was no universal standard before 1981. A GM VIN from the 1970s uses a 13-character format encoding division, model year, body series, engine, and assembly plant, while Ford and Chrysler used entirely different schemes. Because the coding changed year to year, decoding a 1969 Camaro requires different reference tables than a 1975 Camaro.",
      },
    },
    {
      "@type": "Question",
      name: "Why are old car VINs shorter than 17 characters?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The standardized 17-character VIN only became mandatory for the 1981 model year, when NHTSA required a uniform format for all vehicles sold in the United States. Before that, there was no federal length requirement, so manufacturers used their own systems. Pre-1981 VINs commonly ran 11 to 17 characters — GM used 13 characters through most of the 1970s, while Ford varied from 11 to 17 depending on the year.",
      },
    },
    {
      "@type": "Question",
      name: "Can you run a vehicle history report on a classic car?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Coverage is limited for pre-1981 vehicles. NMVTIS and commercial history reports were built around the standardized 17-character VIN, so older shorter VINs often return little or no title, accident, or odometer data. Verification of a classic car instead relies on manufacturer build sheets, marque registries, original trim tags, and documented ownership records rather than a modern database lookup. A history report is most useful for confirming any post-1981 retitling events.",
      },
    },
    {
      "@type": "Question",
      name: "Where is the VIN located on a classic car?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "VIN placement varied by era and manufacturer. On many 1950s and 1960s cars the number is stamped on a plate riveted to the driver's door post, door jamb, or firewall, or on a tag attached to the frame. Dashboard-visible VIN plates at the base of the windshield became common in the late 1960s. Classic cars often also carry separate body trim tags or cowl tags with additional build codes near the firewall.",
      },
    },
    {
      "@type": "Question",
      name: "How have VIN formats changed over the decades?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "In the 1950s and early 1960s, most VINs were simple sequential serial numbers with a model prefix — little more than a production counter. Through the 1960s and 1970s, manufacturers added encoded model, engine, and assembly-plant data, but each scheme was proprietary and frequently changed annually. The 1981 model year introduced the universal 17-character standard with a fixed structure: world manufacturer identifier, vehicle descriptor, check digit, and serial section.",
      },
    },
    {
      "@type": "Question",
      name: "What does numbers-matching mean for a classic car?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Numbers-matching means the engine, transmission, and other major components carry casting and stamping codes that match the vehicle's original factory build for that VIN. On many GM and Mopar classics, the VIN-stamped engine code can be cross-checked against the casting numbers on the block to confirm the original drivetrain. A verified numbers-matching car commands a significant premium over one with correct-appearing but replaced components.",
      },
    },
    {
      "@type": "Question",
      name: "How do I verify a classic car's authenticity?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Decode the VIN for the original factory configuration, then cross-check it against physical evidence: the trim/cowl tag, casting numbers on the engine and transmission, and the rear axle code. Confirm these against marque-specific registries and reproduction build sheets — for example Pontiac Historic Services for Pontiacs or Marti Auto Works for 1967-onward Fords. Manufacturer-sourced documentation tied to the VIN provides the strongest provenance for high-value collector cars.",
      },
    },
  ],
};

const FAQS = faqSchema.mainEntity.map((q) => ({
  question: q.name,
  answer: q.acceptedAnswer.text,
}));

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE },
    {
      "@type": "ListItem",
      position: 2,
      name: "Classic Car VIN Decoder",
      item: `${SITE}/classic-car-vin`,
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
  url: `${SITE}/classic-car-vin`,
};

/* ── Static UI data ────────────────────────────────────────────── */

const TRUST_STATS = [
  { icon: CalendarClock, value: "Pre-1981", label: "format experts" },
  { icon: Factory, value: "GM · Ford", label: "Mopar + AMC" },
  { icon: Hash, value: "Numbers", label: "matching checks" },
  { icon: Zap, value: "Free", label: "instant decode" },
];

const HOW_STEPS = [
  {
    icon: CalendarClock,
    tag: "Step 1",
    title: "Identify make & model year",
    body: "Pre-1981 VINs had no universal standard, so the decode depends entirely on the manufacturer and year. A 1969 and a 1975 of the same model use different keys — confirm both first.",
  },
  {
    icon: Search,
    tag: "Step 2",
    title: "Locate the VIN & trim tag",
    body: "Find the VIN on the door post, firewall, frame, or dash-base plate. Note any separate cowl or trim tag near the firewall — it carries paint, body, and interior build codes.",
  },
  {
    icon: ScrollText,
    tag: "Step 3",
    title: "Apply the manufacturer key",
    body: "Use the year-specific reference table for that make to decode division, body series, engine, assembly plant, and sequence. These codes change annually, so the year-matched table is essential.",
  },
];

const MANUFACTURERS = [
  {
    icon: Factory,
    title: "General Motors",
    years: "1968–1980",
    body: "13-character format: division code, model year, body series, body style, engine, assembly plant, and sequence. The VIN directly encodes the engine code — critical for matching-numbers verification.",
  },
  {
    icon: Factory,
    title: "Ford Motor Company",
    years: "1970–1980",
    body: "Variable-length format encoding model, engine, assembly plant, and sequential number. Engine-code positions confirm families like the 428 Cobra Jet or Boss 302.",
  },
  {
    icon: Factory,
    title: "Chrysler Corporation",
    years: "1968–1980",
    body: "13-character format with a distinct structure encoding car line, price class, body type, engine, transmission, and plant — decodes the exact drivetrain on a 1970 Cuda or Challenger.",
  },
  {
    icon: Factory,
    title: "American Motors (AMC)",
    years: "1968–1980",
    body: "13-character system encoding model year, series, body type, engine, transmission, assembly plant, and sequence.",
  },
];

const LEARN = [
  {
    icon: Cog,
    title: "Factory engine code",
    body: "For GM cars the VIN encodes the engine directly — a Z/28 with a DZ 302 should show a specific code, exposing a swapped engine if it doesn't.",
  },
  {
    icon: FileText,
    title: "Body style & series",
    body: "Confirms the original body line, two- vs four-door, hardtop vs convertible against the seller's description.",
  },
  {
    icon: Factory,
    title: "Assembly plant & sequence",
    body: "Identifies where and roughly when the car was built, useful for cross-referencing production records.",
  },
  {
    icon: CalendarClock,
    title: "True model year",
    body: "Confirms the real model year — distinct from the year the car was sold or later titled.",
  },
  {
    icon: Gauge,
    title: "Drivetrain configuration",
    body: "On Mopar VINs, decodes the exact engine, transmission, and body style of a car like a 1970 Cuda or Challenger.",
  },
  {
    icon: BadgeCheck,
    title: "Numbers-matching baseline",
    body: "Provides the reference the physical casting and stamping numbers must match for a verified matching-numbers car.",
  },
];

const MATCHING_CHECKLIST = [
  "Decode the VIN for the original factory engine and body codes",
  "Read the cowl / trim tag for paint, interior, and body data",
  "Cross-check the engine-block casting and stamping numbers",
  "Verify the transmission and rear-axle codes against the build",
  "Confirm casting dates fall before the car's assembly date",
  "Validate against a marque registry or reproduction build sheet",
];

const SOURCES = [
  {
    href: "https://www.ecfr.gov/current/title-49/subtitle-B/chapter-V/part-565",
    label: "49 CFR Part 565 — VIN Requirements",
    note: "Federal rule that established the standardized 17-character VIN for model year 1981.",
  },
  {
    href: "https://www.nhtsa.gov/",
    label: "NHTSA",
    note: "Agency that mandated and administers the modern VIN standard.",
  },
  {
    href: "https://vpic.nhtsa.dot.gov/decoder/",
    label: "NHTSA vPIC VIN Decoder",
    note: "Federal reference decoder; coverage is strongest for 1981-and-newer standardized VINs.",
  },
  {
    href: "https://www.phs-online.com/",
    label: "Pontiac Historic Services (PHS)",
    note: "Marque registry providing factory build documentation tied to Pontiac VINs.",
  },
  {
    href: "https://www.martiauto.com/",
    label: "Marti Auto Works",
    note: "Ford-authorized production records and build sheets for 1967-onward Ford vehicles.",
  },
  {
    href: "https://vehiclehistory.bja.ojp.gov/",
    label: "NMVTIS — Bureau of Justice Assistance",
    note: "Federal title and brand system; useful mainly for post-1981 standardized VINs.",
  },
];

const INTERNAL_LINKS = [
  {
    href: "/vin-check",
    label: "Full VIN History Check",
    desc: "Title, accident, odometer, and recall records in one report for post-1981 VINs.",
  },
  {
    href: "/vin-decoder",
    label: "VIN Decoder",
    desc: "Decode the 17-character VIN to specs, trim, and factory options.",
  },
  {
    href: "/accident-history-check",
    label: "Accident History Check",
    desc: "Document any recorded collision or damage events alongside the factory build.",
  },
  {
    href: "/stolen-vehicle-check",
    label: "Stolen Vehicle Check",
    desc: "Confirm the car isn't flagged as stolen before money changes hands.",
  },
  {
    href: "/salvage-title-check",
    label: "Salvage Title Check",
    desc: "Catch branded-title damage that undermines a restoration's value.",
  },
  {
    href: "/odometer-check",
    label: "Odometer Check",
    desc: "Verify mileage history where modern records exist for the vehicle.",
  },
];

/* ── Page ──────────────────────────────────────────────────────── */

export default function ClassicCarVinPage() {
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
                { label: "Classic Car VIN" },
              ]}
              onDark
            />

            <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
              <History className="w-4 h-4" /> Classic &amp; Vintage
              &nbsp;·&nbsp; Pre-1981 Formats
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-headline font-extrabold leading-tight mb-4">
              Classic Car VIN Decoder —{" "}
              <span style={{ color: "var(--color-secondary-container)" }}>
                Decode Any Vintage Vehicle
              </span>
            </h1>

            <p className="speakable-intro text-base sm:text-xl text-white/85 max-w-3xl mb-8 leading-relaxed">
              Before 1981 there was no standardized 17-character VIN — every
              manufacturer used its own system, and those systems changed year to
              year. Knowing the right key for a specific make and model year
              unlocks the engine code, body style, assembly plant, and the
              numbers-matching data that drives a classic&apos;s collector value.
            </p>

            <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-xl">
              <h2 className="text-base sm:text-lg font-headline font-extrabold text-primary mb-1">
                Decode a Classic Car VIN
              </h2>
              <p className="text-xs sm:text-sm text-on-surface-variant mb-4">
                Enter a pre-1981 or modern VIN — we&apos;ll decode the factory
                configuration so you can verify authenticity
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
          {/* ── How the decode works ─────────────────────────── */}
          <section className="py-12 sm:py-16">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              How to Decode a Classic VIN
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl">
              Pre-1981 VIN decoding is a manufacturer-and-year exercise, not a
              database lookup. Three steps turn a vintage VIN into a clear factory
              configuration you can verify against the car.
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
            <div className="mt-6 rounded-2xl bg-secondary-container/40 border border-outline-variant p-5 sm:p-6">
              <div className="flex items-start gap-3">
                <Hash className="w-5 h-5 text-on-secondary-container flex-shrink-0 mt-0.5" />
                <p className="text-sm text-on-surface leading-relaxed">
                  <strong className="text-on-surface">
                    The fourth step is numbers-matching
                  </strong>{" "}
                  — cross-check the VIN-encoded engine code against the casting and
                  stamping numbers on the block, transmission, and rear axle to
                  confirm the original factory drivetrain.
                </p>
              </div>
            </div>
          </section>

          {/* ── Manufacturer formats ─────────────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              Manufacturer-Specific Pre-1981 VIN Formats
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">
              Each major manufacturer developed its own VIN encoding logic.
              Decoding a classic VIN correctly means knowing the right key for the
              specific make and year — the position and coding of each element
              differs by manufacturer.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {MANUFACTURERS.map((c) => {
                const Icon = c.icon;
                return (
                  <div
                    key={c.title}
                    className="rounded-2xl border border-outline-variant bg-surface p-5"
                  >
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <span className="text-xs font-mono font-black text-primary/70">
                        {c.years}
                      </span>
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
            <div className="mt-6 rounded-2xl bg-secondary-container/40 border border-outline-variant p-5 sm:p-6">
              <div className="flex items-start gap-3">
                <CalendarClock className="w-5 h-5 text-on-secondary-container flex-shrink-0 mt-0.5" />
                <p className="text-sm text-on-surface leading-relaxed">
                  <strong className="text-on-surface">
                    The codes change every year
                  </strong>{" "}
                  — decoding a 1969 Camaro VIN requires different reference tables
                  than a 1975 Camaro VIN, even though both are pre-standardization
                  GM vehicles.
                </p>
              </div>
            </div>
          </section>

          {/* ── What you learn ───────────────────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              What You Can Learn from a Classic VIN
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">
              Despite the lack of standardization, pre-1981 VINs carry rich data
              for those who know how to read them. The VIN is the anchor every
              authenticity claim is checked against.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {LEARN.map((c) => {
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

          {/* ── Numbers-matching ─────────────────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              VIN Decode vs. Full Numbers-Matching Verification
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl leading-relaxed">
              The VIN decode is one layer. A complete numbers-matching check
              crosses that data against the physical stamps and castings on the
              car — the standard for any high-value collector transaction.
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
                <p>
                  Start by decoding the{" "}
                  <strong className="text-on-surface">factory configuration</strong>{" "}
                  from the VIN — engine, body, and trim codes. On many GM and Mopar
                  classics the VIN-stamped engine code is the reference every
                  physical part must match.
                </p>
                <p>
                  Then confirm the actual stamped and cast numbers on the engine
                  block, transmission, and rear axle, and check each casting date
                  falls before the car&apos;s assembly date. A mismatch means a
                  replaced component — and a false numbers-matching claim.
                </p>
                <p>
                  For the strongest provenance, validate against a marque registry
                  or reproduction build sheet, and pair the decode with a full{" "}
                  <Link
                    href="/vin-check"
                    className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80"
                  >
                    VIN history report
                  </Link>{" "}
                  and an{" "}
                  <Link
                    href="/accident-history-check"
                    className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80"
                  >
                    accident history check
                  </Link>
                  .
                </p>
              </div>
              <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <ClipboardCheck className="w-5 h-5 text-primary" />
                  <h3 className="font-headline font-extrabold text-primary">
                    Numbers-matching checklist
                  </h3>
                </div>
                <ul className="space-y-2 text-sm text-on-surface">
                  {MATCHING_CHECKLIST.map((tip) => (
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
                    Decode the factory configuration by VIN first:
                  </p>
                  <VinSearchForm size="sm" />
                </div>
              </div>
            </div>
          </section>

          {/* ── Mid-page CTA ───────────────────────────────── */}
          <section className="py-10">
            <div className="rounded-3xl bg-primary p-7 sm:p-10 text-center">
              <Sparkles className="w-8 h-8 text-yellow-300 mx-auto mb-3" />
              <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-white mb-2">
                Verify a Classic Before You Buy
              </h2>
              <p className="text-white/80 text-sm sm:text-base mb-6 max-w-xl mx-auto">
                Don&apos;t take the seller&apos;s word for a numbers-matching claim.
                Decode the VIN to reveal the original factory configuration — free,
                in seconds.
              </p>
              <div className="max-w-xl mx-auto bg-white rounded-2xl p-4 sm:p-5">
                <VinSearchForm size="lg" />
              </div>
            </div>
          </section>

          {/* ── History before standardization ───────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">
              The VIN Before Standardization
            </h2>
            <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4 max-w-3xl">
              <p>
                The modern 17-character standardized VIN was mandated by NHTSA and
                implemented for all vehicles sold in the United States starting
                with model year 1981. Before that date there was no federal
                requirement for a standardized format, so manufacturers used
                whatever system they chose — a patchwork of different formats,
                lengths, and encoding schemes across makes and years.
              </p>
              <p>
                In the 1950s and early 1960s, many manufacturers used simple
                sequential serial numbers with a model prefix — not much more than
                a production counter. Through the 1960s and 1970s they developed
                increasingly sophisticated systems that embedded model, engine, and
                assembly-plant data, but each scheme was proprietary and often
                changed annually.
              </p>
              <p>
                Length varied considerably too. GM used 13-character VINs through
                most of the 1970s, Ford used varying lengths from 11 to 17
                characters depending on the year, and Chrysler transitioned through
                several different formats. Import manufacturers had their own
                distinct systems as well.
              </p>
            </div>
          </section>

          {/* ── Resources ────────────────────────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">
              Resources for Classic Car Owners
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
                <p>
                  Classic car owners have access to specialized resources beyond
                  general VIN check services. Marque-specific registries — like{" "}
                  <strong className="text-on-surface">
                    Pontiac Historic Services (PHS)
                  </strong>{" "}
                  for Pontiac vehicles, <strong className="text-on-surface">Marti
                  Auto Works</strong> for Ford Mustangs, and Chrysler
                  broadcast-sheet data services — provide manufacturer-generated
                  documentation tied to individual VINs that goes beyond what
                  general databases contain.
                </p>
                <p>
                  These registry services often supply reproduction build sheets,
                  window-sticker data, and factory documentation that can accompany
                  a vehicle through transactions and auctions. For high-value
                  collector cars, this manufacturer-sourced documentation can add
                  thousands of dollars to a vehicle&apos;s market value by providing
                  indisputable provenance.
                </p>
                <p>
                  For complete due diligence on any classic car purchase, also run
                  a{" "}
                  <Link
                    href="/stolen-vehicle-check"
                    className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80"
                  >
                    stolen vehicle check
                  </Link>{" "}
                  and a{" "}
                  <Link
                    href="/salvage-title-check"
                    className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80"
                  >
                    salvage title check
                  </Link>{" "}
                  to verify clean ownership and title history.
                </p>
              </div>
              <div className="rounded-2xl bg-surface-container-lowest border border-outline-variant p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Shield className="w-5 h-5 text-primary" />
                  <h3 className="font-headline font-extrabold text-primary">
                    Why classic coverage is limited
                  </h3>
                </div>
                <ul className="space-y-3 text-sm text-on-surface-variant">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" strokeWidth={3} />
                    <span>NMVTIS and history reports were built around the 17-character VIN.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" strokeWidth={3} />
                    <span>Shorter pre-1981 VINs often return little or no title or odometer data.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" strokeWidth={3} />
                    <span>Verification leans on build sheets, registries, and trim tags instead.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" strokeWidth={3} />
                    <span>A history report is most useful for any post-1981 retitling events.</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* ── Sources & References ──
              Classic-car VIN authenticity rests on federal VIN standardization
              history and a set of manufacturer/marque registries. Naming each in
              an outbound citation block boosts AI-search citation rate (~40% per
              Princeton GEO research) and signals E-E-A-T topical authority.
              `nofollow` on all links — evidence citations, not endorsements. */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="w-6 h-6 text-primary" />
              <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary">
                Sources &amp; References
              </h2>
            </div>
            <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">
              The standardized VIN, its pre-1981 history, and classic-car
              authenticity verification draw on federal regulation and
              manufacturer-specific registries. These are the authoritative origins
              behind the claims on this page.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SOURCES.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="rounded-2xl border border-outline-variant bg-surface p-4 hover:border-primary/40 hover:bg-primary/5 transition-colors"
                >
                  <span className="text-sm font-bold text-primary underline underline-offset-2">
                    {s.label} ↗
                  </span>
                  <p className="mt-1.5 text-xs text-on-surface-variant leading-relaxed">
                    {s.note}
                  </p>
                </a>
              ))}
            </div>
            <p className="mt-5 text-xs text-on-surface-variant italic">
              Pre-1981 VIN decoding depends on year-specific manufacturer keys;
              modern database coverage (NMVTIS, history reports) is built around the
              standardized 17-character VIN and is limited for older vehicles.
            </p>
          </section>

          {/* ── Internal links ─────────────────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              More VIN Checks for Classic Buyers
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-7">
              A factory decode is one piece. These checks complete the picture
              before you commit to a vintage purchase.
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
              Classic Car VIN — Frequently Asked Questions
            </h2>
            <p className="text-sm text-on-surface-variant mb-8">
              The questions collectors and restorers ask most when decoding a
              vintage VIN.
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
              <Zap className="w-3.5 h-3.5" /> Free · Instant · VIN-Based
            </div>
            <h2 className="text-2xl sm:text-4xl font-headline font-extrabold text-primary mb-3">
              Decode Any Classic Car VIN
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl mx-auto mb-8">
              Enter a pre-1981 or modern VIN to decode factory specifications,
              engine codes, and production data for any vintage vehicle.
            </p>
            <div className="max-w-xl mx-auto bg-surface-container-low rounded-2xl p-5 border border-outline-variant">
              <VinSearchForm size="lg" />
            </div>
            <div className="mt-3 flex items-center justify-center gap-2 text-xs text-on-surface-variant">
              <Check className="w-3.5 h-3.5 text-green-500" strokeWidth={3} />
              No credit card · No sign-up · Free
            </div>
          </section>

          <RelatedChecks exclude="/classic-car-vin" />
        </div>
      </article>
    </>
  );
}
