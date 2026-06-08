import type { Metadata } from "next";
import Link from "next/link";
import {
  Check,
  Shield,
  ShieldCheck,
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
  AlertTriangle,
  BatteryCharging,
  ShieldOff,
  DollarSign,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";

export const metadata: Metadata = {
  title:
    "Warranty Check by VIN — Is This Car Still Under Warranty? (Free Coverage Lookup)",
  description:
    "Check if a car is still under warranty by VIN — free. Find the in-service date and see remaining bumper-to-bumper, powertrain, corrosion, emissions, EV-battery, and CPO coverage before you buy. Confirm exact limits with the manufacturer.",
  keywords: [
    "warranty check by VIN",
    "is my car still under warranty",
    "is this car under warranty",
    "vehicle warranty lookup",
    "check car warranty by VIN",
    "powertrain warranty check",
    "bumper to bumper warranty",
    "CPO warranty VIN",
    "remaining warranty check",
    "factory warranty transfer",
    "in-service date lookup",
    "EV battery warranty check",
    "extended warranty vs factory",
    "free warranty check",
  ],
  alternates: { canonical: "/warranty-check" },
  openGraph: {
    title: "Warranty Check by VIN — Is This Car Still Under Warranty? (Free)",
    description:
      "Free VIN-based warranty lookup. Find the in-service date and remaining factory, powertrain, corrosion, emissions, EV-battery, and CPO coverage.",
    url: `${SITE}/warranty-check`,
    type: "article",
    siteName: "CarCheckerVIN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Warranty Check by VIN — Is This Car Still Under Warranty? (Free)",
    description:
      "Free VIN warranty lookup: in-service date, remaining factory/powertrain coverage, CPO status, and transfer rules.",
  },
  robots: { index: true, follow: true },
};

/* ── JSON-LD schemas ───────────────────────────────────────────── */

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Warranty Check by VIN",
  url: `${SITE}/warranty-check`,
  applicationCategory: "AutomotiveApplication",
  operatingSystem: "All",
  description:
    "Check a vehicle's warranty status by its 17-character VIN. Retrieves the in-service date and helps estimate remaining bumper-to-bumper, powertrain, corrosion, emissions, EV-battery, and CPO coverage. Exact limits confirmed with the manufacturer.",
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
  headline: "Warranty Check by VIN — Is This Car Still Under Warranty?",
  description:
    "How to check warranty status by VIN, what each factory coverage includes, how the in-service date and mileage set remaining coverage, transfer rules, and what voids a manufacturer warranty.",
  author: ORG_AUTHOR,
  publisher: {
    "@type": "Organization",
    name: "CarCheckerVIN",
    url: SITE,
    logo: { "@type": "ImageObject", url: `${SITE}/logo.png` },
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${SITE}/warranty-check`,
  },
  datePublished: "2026-05-04",
  dateModified: "2026-06-08",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I check a car's warranty by VIN?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Enter the 17-character VIN into a warranty lookup tool, which retrieves the manufacturer's in-service date (the date of first retail sale) and calculates remaining coverage against the current mileage. The most authoritative source is the manufacturer or a franchised dealer of that brand, since they query the official warranty database keyed to the VIN. A comprehensive VIN report can also surface CPO extensions and service contracts that the factory lookup alone may not show.",
      },
    },
    {
      "@type": "Question",
      name: "How can I tell if a used car is still under factory warranty?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Factory warranty status depends on two things: the in-service date and the current mileage. The warranty is still active only if the vehicle is within both the time limit and the mileage limit of each coverage. Run a VIN-based warranty check to retrieve the in-service date, then compare the time elapsed and the odometer reading against the brand's published limits. Exact remaining coverage should be confirmed with the manufacturer or a franchised dealer.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between a powertrain and a bumper-to-bumper warranty?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A bumper-to-bumper (basic) warranty covers virtually all components except normal wear items, but for a shorter period — commonly around 3 years/36,000 miles, though this varies by brand. A powertrain warranty covers only the engine, transmission, and drivetrain, but lasts longer — commonly around 5 years/60,000 miles, and as long as 10 years/100,000 miles for some brands such as Hyundai and Kia. Both run from the in-service date.",
      },
    },
    {
      "@type": "Question",
      name: "Does a factory warranty transfer to a second owner?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, in most cases. The remaining factory bumper-to-bumper warranty typically transfers automatically to subsequent owners at no cost, because coverage follows the VIN and the in-service date rather than the original buyer. Some brands apply different transfer terms to the powertrain portion — for example, a longer powertrain term may be reduced for second owners. Confirm the specific transfer rules with the manufacturer or a franchised dealer for that brand.",
      },
    },
    {
      "@type": "Question",
      name: "How do I check how much warranty is remaining?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Remaining warranty is the time and mileage left before each coverage's limit is reached. Find the in-service date (via a VIN check or the manufacturer), then subtract elapsed time from the time limit and current mileage from the mileage limit for each coverage — whichever runs out first ends that coverage. Because mileage can be misrepresented, pair the warranty check with an odometer check, and confirm the exact figures with the manufacturer or a franchised dealer.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between a factory warranty and an extended or aftermarket warranty?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A factory warranty is provided by the manufacturer, included with the vehicle, and honored at any franchised dealer of that brand. An extended warranty — also called a vehicle service contract — is purchased separately and may be issued by the manufacturer, the selling dealer, or a third-party (aftermarket) administrator. Aftermarket contracts vary widely in coverage and reliability, so always read the exclusions before buying. Manufacturer-backed and CPO coverage is generally the most dependable.",
      },
    },
    {
      "@type": "Question",
      name: "How long do factory warranties typically last?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Factory warranties are limited by both time and mileage, and the exact lengths vary by brand. As industry-typical examples, bumper-to-bumper coverage commonly runs about 3 years/36,000 miles and powertrain coverage about 5 years/60,000 miles, while some brands such as Hyundai and Kia offer powertrain coverage up to 10 years/100,000 miles. Corrosion, emissions, and EV-battery warranties run on separate, often longer schedules. Always verify the specific limits for the brand and model.",
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
  name: "How to Check if a Car Is Still Under Warranty by VIN",
  description:
    "Estimate a used vehicle's remaining factory warranty coverage using its 17-character VIN and current mileage before you buy.",
  totalTime: "PT2M",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Find the 17-character VIN",
      text: "Read the VIN from the driver-side dashboard, the door jamb sticker, the title, or the registration. Confirm it is 17 characters with no letters I, O, or Q.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Run the VIN warranty check",
      text: "Enter the VIN into the search tool to retrieve the in-service date and vehicle details. The warranty clock starts from the in-service date, not the model year.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Compare time and mileage to the limits",
      text: "For each coverage, subtract elapsed time from the time limit and current mileage from the mileage limit. Whichever runs out first ends that coverage — bumper-to-bumper usually expires before powertrain.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Confirm with the manufacturer",
      text: "Verify exact remaining coverage and any CPO or service-contract extensions with the manufacturer or a franchised dealer, since they query the official warranty database keyed to the VIN.",
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
      name: "Warranty Check",
      item: `${SITE}/warranty-check`,
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
  url: `${SITE}/warranty-check`,
};

/* ── Static UI data ────────────────────────────────────────────── */

const TRUST_STATS = [
  { icon: CalendarClock, value: "In-service", label: "date-based" },
  { icon: Shield, value: "6 coverages", label: "factory + CPO" },
  { icon: BadgeCheck, value: "Transfers", label: "with the VIN" },
  { icon: Zap, value: "Free", label: "no sign-up" },
];

const HOW_STEPS = [
  {
    icon: Search,
    tag: "Step 1",
    title: "Enter the VIN",
    body: "Type the 17-character VIN from the dashboard, door jamb, title, or registration. Warranty coverage is keyed to the VIN and its in-service date — not the model year or the owner.",
  },
  {
    icon: CalendarClock,
    tag: "Step 2",
    title: "We find the in-service date",
    body: "The lookup retrieves the in-service date (first retail sale) and vehicle details. That date — plus current mileage — is what every factory coverage clock is measured against.",
  },
  {
    icon: FileText,
    tag: "Step 3",
    title: "Estimate remaining coverage",
    body: "Compare elapsed time and mileage to each coverage limit to see what's likely still active. Confirm exact figures and any CPO extension with the manufacturer or a franchised dealer.",
  },
];

const COVERAGES = [
  {
    icon: ShieldCheck,
    title: "Bumper-to-bumper",
    body: "Covers virtually all components except normal wear items. Commonly around 3 years / 36,000 miles, though it varies by brand. Usually the first coverage to expire.",
  },
  {
    icon: Cog,
    title: "Powertrain",
    body: "Covers the engine, transmission, and drivetrain. Often around 5 years / 60,000 miles — up to 10 years / 100,000 miles for some brands such as Hyundai and Kia.",
  },
  {
    icon: Wrench,
    title: "Corrosion / rust",
    body: "Covers rust-through perforation of body panels. Typically 5–7 years, frequently with no mileage limit at all.",
  },
  {
    icon: Gauge,
    title: "Emissions",
    body: "Federally mandated coverage for emission-control components. Major parts are commonly covered around 8 years / 80,000 miles.",
  },
  {
    icon: BatteryCharging,
    title: "EV battery",
    body: "Electric-vehicle battery packs carry their own warranty, often around 8 years / 100,000 miles under federal requirements.",
  },
  {
    icon: BadgeCheck,
    title: "CPO coverage",
    body: "Certified Pre-Owned programs add manufacturer-backed coverage on top of the factory warranty when a used car passes a certified inspection.",
  },
];

const VOIDS = [
  {
    icon: Cog,
    title: "Engine modifications",
    body: "Performance tuning, superchargers, or nitrous systems typically void powertrain coverage for related failures.",
  },
  {
    icon: AlertTriangle,
    title: "Flood or accident damage",
    body: "A vehicle in a major accident or flood event may have coverage denied for damage tied to that event.",
  },
  {
    icon: Gauge,
    title: "Off-road or racing use",
    body: "Many warranties exclude damage from track events, competition, or off-road driving outside the vehicle's design.",
  },
  {
    icon: Wrench,
    title: "Neglected maintenance",
    body: "Skipping required service — oil changes, coolant flushes — at the documented intervals can void affected coverage.",
  },
];

const REMAINING_CHECKLIST = [
  "Retrieve the in-service date by VIN, not the model year",
  "Subtract elapsed time from each coverage's time limit",
  "Subtract current mileage from each coverage's mileage limit",
  "Whichever runs out first ends that specific coverage",
  "Verify CPO or service-contract extensions through the VIN",
  "Confirm exact figures with the manufacturer or franchised dealer",
];

const INTERNAL_LINKS = [
  {
    href: "/odometer-check",
    label: "Odometer Check",
    desc: "A rollback can make a car look like it has more warranty mileage left than it really does.",
  },
  {
    href: "/vin-check",
    label: "Full VIN History Check",
    desc: "Title, warranty signals, accident, odometer, and recall records in one report.",
  },
  {
    href: "/lemon-check",
    label: "Lemon Check",
    desc: "See whether the car had repeated warranty repairs or a manufacturer buyback.",
  },
  {
    href: "/recall-check",
    label: "Recall Check",
    desc: "Open recalls are repaired free by the dealer, separate from warranty coverage.",
  },
  {
    href: "/salvage-title-check",
    label: "Salvage Title Check",
    desc: "Branded-title damage can deny warranty claims tied to the original event.",
  },
  {
    href: "/vin-decoder",
    label: "VIN Decoder",
    desc: "Decode the 17-character VIN to specs, trim, and factory options.",
  },
];

/* ── Page ──────────────────────────────────────────────────────── */

export default function WarrantyCheckPage() {
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
                { label: "Warranty Check" },
              ]}
              onDark
            />

            <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
              <ShieldCheck className="w-4 h-4" /> Coverage Lookup
              &nbsp;·&nbsp; In-Service-Date Based
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-headline font-extrabold leading-tight mb-4">
              Warranty Check by VIN —{" "}
              <span style={{ color: "var(--color-secondary-container)" }}>
                Is This Car Still Covered?
              </span>
            </h1>

            <p className="speakable-intro text-base sm:text-xl text-white/85 max-w-3xl mb-8 leading-relaxed">
              Remaining factory warranty is one of the most valuable — and most
              misrepresented — selling points on a used car. Enter a 17-character
              VIN to find the in-service date and estimate the bumper-to-bumper,
              powertrain, corrosion, emissions, EV-battery, and CPO coverage
              that&apos;s likely still active — free, before you buy.
            </p>

            <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-xl">
              <h2 className="text-base sm:text-lg font-headline font-extrabold text-primary mb-1">
                Check Warranty Status by VIN
              </h2>
              <p className="text-xs sm:text-sm text-on-surface-variant mb-4">
                Enter any 17-character VIN — we&apos;ll find the in-service date
                so you can estimate remaining factory and CPO coverage
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
          {/* ── How the check works ──────────────────────────── */}
          <section className="py-12 sm:py-16">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              How a VIN Warranty Check Works
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl">
              Warranty coverage is tracked by the manufacturer against the VIN
              and its in-service date. Three steps turn that into a clear picture
              of what&apos;s likely still covered.
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

          {/* ── Types of coverage ────────────────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              The Coverages on a Typical New-Car Warranty
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">
              A new vehicle ships with several separate coverages, each on its
              own time-and-mileage clock. Knowing which is which is essential
              when you value a used car — the figures below are industry-typical
              and vary by brand.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {COVERAGES.map((c) => {
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
            <div className="mt-6 rounded-2xl bg-secondary-container/40 border border-outline-variant p-5 sm:p-6">
              <div className="flex items-start gap-3">
                <CalendarClock className="w-5 h-5 text-on-secondary-container flex-shrink-0 mt-0.5" />
                <p className="text-sm text-on-surface leading-relaxed">
                  <strong className="text-on-surface">
                    Every clock starts at the in-service date
                  </strong>{" "}
                  — the date of first retail sale — not the model year. A car
                  that sat on the lot for a year still has its warranty measured
                  from when it was actually sold.
                </p>
              </div>
            </div>
          </section>

          {/* ── How to read remaining coverage ───────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              How to Calculate Remaining Warranty
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl leading-relaxed">
              Remaining warranty is simply the time and mileage left before each
              coverage limit is reached — whichever runs out first ends that
              coverage. Here&apos;s the method, with a worked example.
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
                <p>
                  Start with the{" "}
                  <strong className="text-on-surface">in-service date</strong>{" "}
                  from a VIN check, then for each coverage subtract elapsed time
                  from the time limit and current mileage from the mileage limit.
                  The coverage ends the moment either limit is hit.
                </p>
                <p>
                  Because the mileage half of the equation can be manipulated,
                  pair this with an{" "}
                  <Link
                    href="/odometer-check"
                    className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80"
                  >
                    odometer check
                  </Link>
                  . An artificially low reading can make a car look like it has
                  far more warranty left than it really does.
                </p>
                <p>
                  Manufacturer websites offer free factory-warranty lookups, but
                  they often miss CPO extensions and service contracts. Always
                  confirm the exact remaining figures with the manufacturer or a
                  franchised dealer of that brand.
                </p>
              </div>
              <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Gauge className="w-5 h-5 text-primary" />
                  <h3 className="font-headline font-extrabold text-primary">
                    Worked example — bumper-to-bumper
                  </h3>
                </div>
                <ul className="space-y-3 text-sm text-on-surface">
                  <li className="flex items-center justify-between gap-3 rounded-lg bg-white px-3.5 py-2.5 border border-outline-variant/60">
                    <span className="text-on-surface-variant">
                      Coverage limit
                    </span>
                    <code className="font-mono font-bold text-primary">
                      3 yr / 36k
                    </code>
                  </li>
                  <li className="flex items-center justify-between gap-3 rounded-lg bg-white px-3.5 py-2.5 border border-outline-variant/60">
                    <span className="text-on-surface-variant">
                      In service / now
                    </span>
                    <code className="font-mono font-bold text-primary">
                      2 yr · 20k mi
                    </code>
                  </li>
                  <li className="flex items-center justify-between gap-3 rounded-lg bg-white px-3.5 py-2.5 border border-outline-variant/60">
                    <span className="text-on-surface-variant">
                      Remaining (first to hit)
                    </span>
                    <code className="font-mono font-bold text-primary">
                      ~1 yr
                    </code>
                  </li>
                </ul>
                <p className="mt-4 text-xs text-on-surface-variant leading-relaxed">
                  Time runs out before mileage here, so ~1 year of coverage
                  remains. Limits vary by brand — this is an illustration, not a
                  guarantee for any specific car.
                </p>
              </div>
            </div>
          </section>

          {/* ── Mid-page CTA ───────────────────────────────── */}
          <section className="py-10">
            <div className="rounded-3xl bg-primary p-7 sm:p-10 text-center">
              <Sparkles className="w-8 h-8 text-yellow-300 mx-auto mb-3" />
              <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-white mb-2">
                Is This Specific Car Still Covered?
              </h2>
              <p className="text-white/80 text-sm sm:text-base mb-6 max-w-xl mx-auto">
                Don&apos;t take the seller&apos;s word for it. Run the VIN to find
                the in-service date and estimate the coverage that&apos;s likely
                still active — free, in seconds.
              </p>
              <div className="max-w-xl mx-auto bg-white rounded-2xl p-4 sm:p-5">
                <VinSearchForm size="lg" />
              </div>
            </div>
          </section>

          {/* ── Factory vs extended vs CPO ───────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              Factory vs. Extended vs. CPO Warranties
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl leading-relaxed">
              Not all coverage is equal. Where a warranty comes from determines
              how dependable it is — and whether you can trust the seller&apos;s
              claim without verifying the VIN.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-2xl border border-primary/30 bg-primary/5 p-5 sm:p-6">
                <div className="text-[11px] font-black uppercase tracking-wider text-primary mb-2">
                  Factory
                </div>
                <p className="text-lg font-headline font-extrabold text-primary mb-3">
                  Most dependable
                </p>
                <ul className="space-y-2 text-sm text-on-surface-variant">
                  <li className="flex gap-2"><span>·</span><span>Provided by the manufacturer, included with the car.</span></li>
                  <li className="flex gap-2"><span>·</span><span>Honored at any franchised dealer of that brand.</span></li>
                  <li className="flex gap-2"><span>·</span><span>Transfers automatically with the VIN at no cost.</span></li>
                </ul>
              </div>
              <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5 sm:p-6">
                <div className="text-[11px] font-black uppercase tracking-wider text-on-surface-variant mb-2">
                  CPO
                </div>
                <p className="text-lg font-headline font-extrabold text-on-surface mb-3">
                  Manufacturer-backed
                </p>
                <ul className="space-y-2 text-sm text-on-surface-variant">
                  <li className="flex gap-2"><span>·</span><span>Adds coverage on top of the factory warranty.</span></li>
                  <li className="flex gap-2"><span>·</span><span>Requires the car to pass a certified inspection.</span></li>
                  <li className="flex gap-2"><span>·</span><span>Verify the certification by VIN, not the seller&apos;s word.</span></li>
                </ul>
              </div>
              <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5 sm:p-6">
                <div className="text-[11px] font-black uppercase tracking-wider text-on-surface-variant mb-2">
                  Extended / aftermarket
                </div>
                <p className="text-lg font-headline font-extrabold text-on-surface mb-3">
                  Varies widely
                </p>
                <ul className="space-y-2 text-sm text-on-surface-variant">
                  <li className="flex gap-2"><span>·</span><span>A service contract bought separately.</span></li>
                  <li className="flex gap-2"><span>·</span><span>Issued by the maker, dealer, or a third party.</span></li>
                  <li className="flex gap-2"><span>·</span><span>Read the exclusions — quality and reliability differ a lot.</span></li>
                </ul>
              </div>
            </div>
          </section>

          {/* ── What voids a warranty ────────────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              What Can Void a Manufacturer Warranty
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">
              The Magnuson-Moss Warranty Act stops a dealer from voiding your
              entire warranty just for using aftermarket parts — but a specific
              claim can still be denied if a modification or event caused the
              failure. The common culprits:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {VOIDS.map((c) => {
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
            <div className="mt-6 rounded-2xl bg-secondary-container/40 border border-outline-variant p-5 sm:p-6">
              <div className="flex items-start gap-3">
                <ShieldOff className="w-5 h-5 text-on-secondary-container flex-shrink-0 mt-0.5" />
                <p className="text-sm text-on-surface leading-relaxed">
                  <strong className="text-on-surface">Buying used?</strong> Prior
                  flood or accident damage can quietly deny future claims. Pair
                  this with a{" "}
                  <Link
                    href="/salvage-title-check"
                    className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80"
                  >
                    salvage title check
                  </Link>{" "}
                  and a{" "}
                  <Link
                    href="/lemon-check"
                    className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80"
                  >
                    lemon check
                  </Link>{" "}
                  to catch history that could undermine the coverage.
                </p>
              </div>
            </div>
          </section>

          {/* ── Buying with remaining warranty ───────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">
              Buying a Car With Warranty Left — Price It In
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
                <p>
                  A used car with substantial factory warranty remaining has a
                  measurable edge over one that&apos;s out of coverage. Factory
                  coverage{" "}
                  <strong className="text-on-surface">
                    transfers to new owners automatically
                  </strong>{" "}
                  — no registration, no transfer fee — and any franchised dealer
                  honors it regardless of ownership history.
                </p>
                <p>
                  Use the warranty check to learn exactly how much is left, then
                  price accordingly. A car with two years of bumper-to-bumper
                  coverage remaining is worth more than an identical one
                  out-of-warranty — the difference in repair exposure can run to
                  thousands of dollars.
                </p>
                <p>
                  Complete your due diligence with a full{" "}
                  <Link
                    href="/vin-check"
                    className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80"
                  >
                    VIN history report
                  </Link>{" "}
                  before any purchase decision.
                </p>
              </div>
              <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <ClipboardCheck className="w-5 h-5 text-primary" />
                  <h3 className="font-headline font-extrabold text-primary">
                    Remaining-coverage checklist
                  </h3>
                </div>
                <ul className="space-y-2 text-sm text-on-surface">
                  {REMAINING_CHECKLIST.map((tip) => (
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
                    Find the in-service date by VIN first:
                  </p>
                  <VinSearchForm size="sm" />
                </div>
              </div>
            </div>
          </section>

          {/* ── Why warranty matters for value ───────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              Why Remaining Warranty Matters for Value
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">
              Coverage that follows the VIN directly shapes what a used car is
              worth — and how much repair risk you take on as the next owner.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  icon: DollarSign,
                  title: "Real resale value",
                  body: "Remaining bumper-to-bumper or powertrain coverage is a tangible asset — a comparable out-of-warranty car should cost noticeably less.",
                },
                {
                  icon: ShieldCheck,
                  title: "Lower repair exposure",
                  body: "Active coverage means the manufacturer, not you, pays for qualifying failures during the remaining time and mileage.",
                },
                {
                  icon: BadgeCheck,
                  title: "Verify, don't trust",
                  body: "Sellers often overstate coverage. The in-service date tied to the VIN — confirmed with the dealer — is the only reliable proof.",
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5 sm:p-6"
                  >
                    <div className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-base sm:text-lg font-headline font-extrabold text-primary mb-1.5">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                      {item.body}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ── Internal links ─────────────────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              More VIN Checks That Pair With a Warranty Check
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-7">
              Warranty is one piece of the puzzle. These checks complete the
              picture before you buy.
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
              Warranty Check — Frequently Asked Questions
            </h2>
            <p className="text-sm text-on-surface-variant mb-8">
              The questions buyers ask most when checking whether a car is still
              under warranty.
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
              Is This Car Still Under Warranty? Find Out Now.
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl mx-auto mb-8">
              Enter a 17-character VIN to find the in-service date and estimate
              remaining factory, powertrain, corrosion, emissions, EV-battery,
              and CPO coverage.
            </p>
            <div className="max-w-xl mx-auto bg-surface-container-low rounded-2xl p-5 border border-outline-variant">
              <VinSearchForm size="lg" />
            </div>
            <div className="mt-3 flex items-center justify-center gap-2 text-xs text-on-surface-variant">
              <Check className="w-3.5 h-3.5 text-green-500" strokeWidth={3} />
              No credit card · No sign-up · Free
            </div>
          </section>

          <RelatedChecks exclude="/warranty-check" />
        </div>
      </article>
    </>
  );
}
