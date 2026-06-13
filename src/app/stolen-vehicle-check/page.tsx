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
  ShieldAlert,
  ShieldCheck,
  Database,
  FileSearch,
  AlertTriangle,
  Siren,
  MapPin,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";

export const metadata: Metadata = {
  title: "Stolen Vehicle Check by VIN — Is This Car Stolen? (Free)",
  description:
    "Run a stolen vehicle check by VIN against the NICB and NMVTIS theft databases. Find out if a car is reported stolen, theft-recovery, or salvage before you buy, in seconds.",
  keywords: [
    "stolen vehicle check",
    "is this car stolen",
    "stolen car VIN check",
    "check if car is stolen by VIN",
    "NICB stolen vehicle lookup",
    "stolen VIN check free",
    "report stolen car VIN",
    "stolen car database search",
    "theft recovery title",
    "cloned VIN check",
  ],
  alternates: { canonical: "/stolen-vehicle-check" },
  openGraph: {
    title: "Stolen Vehicle Check by VIN — Is This Car Stolen?",
    description:
      "Find out if a vehicle is reported stolen by checking the VIN against the NICB and NMVTIS national theft databases.",
    url: `${SITE}/stolen-vehicle-check`,
    type: "article",
    siteName: "CarCheckerVIN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stolen Vehicle Check by VIN — Is This Car Stolen?",
    description:
      "Check a VIN against NICB and NMVTIS theft databases before you buy a used car.",
  },
  robots: { index: true, follow: true },
};

/* ── JSON-LD schemas ───────────────────────────────────────────── */

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Stolen Vehicle Check by VIN",
  url: `${SITE}/stolen-vehicle-check`,
  applicationCategory: "AutomotiveApplication",
  operatingSystem: "All",
  description:
    "Check whether a vehicle is reported stolen by its VIN. Queries the NICB VINCheck theft and salvage records and NMVTIS title brands from all 50 state DMVs, surfacing active theft, theft-recovery, and salvage flags before purchase.",
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
  headline: "Stolen Vehicle Check by VIN — Is This Car Stolen?",
  description:
    "How to check if a vehicle is stolen using its VIN: what the NICB and NMVTIS databases cover, the warning signs of a stolen car, and what to do if a VIN is flagged.",
  author: ORG_AUTHOR,
  publisher: {
    "@type": "Organization",
    name: "CarCheckerVIN",
    url: SITE,
    logo: { "@type": "ImageObject", url: `${SITE}/logo.png` },
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${SITE}/stolen-vehicle-check`,
  },
  datePublished: "2026-04-16",
  dateModified: "2026-06-13",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I check if a car is stolen by its VIN?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Enter the 17-character VIN into a stolen-vehicle lookup that queries theft databases. The National Insurance Crime Bureau (NICB) offers a free VINCheck tool that flags vehicles reported stolen-and-unrecovered or as insurance salvage by participating member insurers. For a fuller picture, pair the VIN with an NMVTIS-sourced title-history report so you also see salvage, theft-recovery, and total-loss brands recorded by state DMVs.",
      },
    },
    {
      "@type": "Question",
      name: "Is there a free stolen car database I can search?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The NICB VINCheck tool is free and lets you run a limited number of VIN searches per day. It returns whether a VIN has been reported stolen-and-unrecovered or declared a salvage total loss by a participating insurer. It is not a complete national registry, so a clean result is reassuring but not a guarantee. Confirm anything you find directly with local law enforcement.",
      },
    },
    {
      "@type": "Question",
      name: "What database shows if a car is stolen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Two main systems matter. The NICB VINCheck database carries theft and salvage records submitted by participating insurers and is searchable free by VIN. The National Motor Vehicle Title Information System (NMVTIS) aggregates title brands from all 50 state DMVs, insurers, and salvage operators, including theft-recovery and salvage brands. Local and federal law enforcement also maintain the NCIC, which is not public but is checked when you file a report.",
      },
    },
    {
      "@type": "Question",
      name: "What should I do if a car is reported stolen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Do not confront the seller or drive the vehicle. Walk away calmly and contact your local police non-emergency line as soon as it is safe. Give them the VIN, listing URL, meeting location, and the seller's name and number. If you already bought it, stop driving it, preserve all paperwork and payment records, and notify both police and your insurer. The legal owner can usually reclaim a stolen car without repaying you.",
      },
    },
    {
      "@type": "Question",
      name: "Can a stolen car have a clean title?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. A freshly stolen vehicle, a car with a cloned or altered VIN, or a theft never reported to insurance may still show a clean title and a clean database result. Thieves sometimes 'wash' titles across states or swap VIN plates to mask a car's history. A clean title is not proof a car was never stolen, so always verify the VIN matches the title, registration, and door-jamb plate.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between stolen, theft-recovery, and salvage?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A 'stolen' record means a vehicle is currently reported stolen and not yet recovered. 'Theft recovery' means a previously stolen car has been found, sometimes with a salvage brand if it was damaged or stripped. 'Salvage' is a broader title brand for vehicles an insurer declared a total loss, which can stem from theft, collision, flood, or other damage. A VIN check can surface all three as separate records.",
      },
    },
    {
      "@type": "Question",
      name: "Does a VIN check guarantee a car isn't stolen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. A VIN check only reflects thefts that were reported and entered into the databases it queries. A car stolen hours ago, one with a cloned VIN, or a theft never reported to insurance may not appear. Treat a clean result as one positive signal, not a guarantee. Confirm the VIN matches across the title, registration, and door-jamb plate, and contact local police or the NICB if anything looks off.",
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
  name: "How to Check If a Car Is Stolen by VIN",
  description:
    "Verify whether a used car is reported stolen before you buy it, using its VIN and the national theft databases.",
  totalTime: "PT3M",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Find and confirm the VIN",
      text: "Read the 17-character VIN from the dashboard, driver's door jamb, and the title. All three should match exactly.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Run the VIN against theft databases",
      text: "Enter the VIN to query the NICB VINCheck theft and salvage records and the NMVTIS title-brand database from all 50 state DMVs.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Read the theft and brand flags",
      text: "Check for active theft, theft-recovery, salvage, or total-loss records, and note any state title brands attached to the VIN.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Act on the result",
      text: "If the VIN is flagged or anything looks off, do not buy or drive the car. Contact local police with the VIN, listing, and seller details.",
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
      name: "Stolen Vehicle Check",
      item: `${SITE}/stolen-vehicle-check`,
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
  url: `${SITE}/stolen-vehicle-check`,
};

/* ── Static UI data ────────────────────────────────────────────── */

const TRUST_STATS = [
  { icon: Database, value: "NICB", label: "theft & salvage records" },
  { icon: ShieldCheck, value: "NMVTIS", label: "50-state title brands" },
  { icon: Siren, value: "Seconds", label: "instant theft flag" },
  { icon: BadgeCheck, value: "Free", label: "VIN lookup, no sign-up" },
];

const HOW_STEPS = [
  {
    icon: Search,
    tag: "Step 1",
    title: "Enter the VIN",
    body: "Type the 17-character VIN from the dashboard, door jamb, or title. It is the unique identifier every theft database is keyed to.",
  },
  {
    icon: Database,
    tag: "Step 2",
    title: "We query the theft databases",
    body: "The lookup checks NICB VINCheck theft and salvage records alongside NMVTIS title brands reported by all 50 state DMVs, insurers, and salvage operators.",
  },
  {
    icon: ShieldAlert,
    tag: "Step 3",
    title: "Read the flags",
    body: "See whether the VIN carries an active theft, theft-recovery, salvage, or total-loss record, then confirm the VIN matches the title and plates on the car.",
  },
];

const CONTENTS = [
  {
    icon: ShieldAlert,
    title: "Active theft records",
    body: "Vehicles currently reported stolen and not yet recovered, the clearest stop signal in a report.",
  },
  {
    icon: ShieldCheck,
    title: "Theft-recovery records",
    body: "Previously stolen cars that have been found, often carrying a salvage brand if they were damaged or stripped.",
  },
  {
    icon: AlertTriangle,
    title: "Insurance total-loss flags",
    body: "Vehicles an insurer declared a total loss after a theft event, recorded by participating member insurers.",
  },
  {
    icon: FileSearch,
    title: "State title brands",
    body: "Stolen, theft-recovery, and salvage brands recorded across all 50 states and aggregated through NMVTIS.",
  },
  {
    icon: Database,
    title: "NICB VINCheck",
    body: "The free insurer-sourced registry of stolen-and-unrecovered and salvage vehicles, searchable by VIN.",
  },
  {
    icon: MapPin,
    title: "VIN-location guidance",
    body: "Where to find and cross-check the VIN on the car so you can spot a swapped or cloned plate.",
  },
];

const WARNING_SIGNS = [
  "Price is far below market value with no clear explanation",
  "Seller will only meet in a public lot, never at their home",
  "No current registration, a duplicate title, or a title in another name",
  "Dashboard VIN plate looks tampered with or glued, not factory-riveted",
  "Forced-entry ignition, damaged steering column, or freshly cut keys",
  "Seller is rushed, cash-only, or pushes you to skip the title transfer",
];

const VIN_SPOTS = [
  "Dashboard (base of the windshield)",
  "Driver-side door jamb sticker",
  "Engine block stamping",
  "Firewall and structural members",
  "Vehicle title document",
  "Current registration card",
];

const INTERNAL_LINKS = [
  {
    href: "/vin-check",
    label: "Full VIN History Check",
    desc: "Title, accident, odometer, and salvage records alongside the theft flag.",
  },
  {
    href: "/salvage-title-check",
    label: "Salvage Title Check",
    desc: "See whether a recovered theft picked up a salvage or total-loss brand.",
  },
  {
    href: "/license-plate-lookup",
    label: "License Plate Lookup",
    desc: "Trace a vehicle from its plate to the VIN when a listing hides the number.",
  },
  {
    href: "/guides/what-is-a-vin-number",
    label: "VIN Locations Guide",
    desc: "Every spot the VIN is stamped, so you can catch a mismatched plate.",
  },
  {
    href: "/vin-check-vs-carfax",
    label: "CarCheckerVIN vs Carfax",
    desc: "How our theft and title data compares to the legacy providers.",
  },
  {
    href: "/odometer-check",
    label: "Odometer Check",
    desc: "Pair the theft check with rollback detection on the same VIN.",
  },
];

/* ── Page ──────────────────────────────────────────────────────── */

export default function StolenVehicleCheckPage() {
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
                { label: "Stolen Vehicle Check" },
              ]}
              onDark
            />

            <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
              <ShieldAlert className="w-4 h-4" /> NICB &amp; NMVTIS &nbsp;·&nbsp;
              Theft, Recovery &amp; Salvage Flags
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-headline font-extrabold leading-tight mb-4">
              Stolen Vehicle Check by VIN —{" "}
              <span style={{ color: "var(--color-secondary-container)" }}>
                Is This Car Stolen?
              </span>
            </h1>

            <p className="speakable-intro text-base sm:text-xl text-white/85 max-w-3xl mb-8 leading-relaxed">
              Buying a car you don&apos;t know is stolen can cost you the
              vehicle, your money, and a police interview. A stolen vehicle
              check cross-references the 17-character VIN against the NICB and
              NMVTIS theft databases, so you can confirm a car&apos;s status in
              seconds before you hand over a dollar. It&apos;s free.
            </p>

            <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-xl">
              <h2 className="text-base sm:text-lg font-headline font-extrabold text-primary mb-1">
                Run a Stolen Vehicle Check by VIN
              </h2>
              <p className="text-xs sm:text-sm text-on-surface-variant mb-4">
                Enter the VIN and we&apos;ll check it against national theft and
                title-brand databases
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
              How a Stolen Vehicle Check Works
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl">
              Theft records live in databases keyed to the VIN. The lookup
              checks them in seconds, but the result is only as good as your
              in-person verification of the car.
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

          {/* ── How NICB powers the check ────────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              The Databases Behind a Stolen Vehicle Check
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl leading-relaxed">
              No single registry is complete in real time. A real theft check
              reads more than one source and treats a clean result as a signal,
              not a guarantee.
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
                <p>
                  The{" "}
                  <strong className="text-on-surface">
                    National Insurance Crime Bureau (NICB)
                  </strong>{" "}
                  maintains the largest stolen-vehicle registry in the US.
                  Insurers, law enforcement, and salvage yards report stolen
                  vehicles using the VIN, covering cars, trucks, motorcycles,
                  boats, and heavy equipment.
                </p>
                <p>
                  The lookup also queries{" "}
                  <strong className="text-on-surface">NMVTIS</strong>, which
                  aggregates title brands from all 50 state DMVs, insurers, and
                  salvage operators. If a car was reported stolen and not
                  recovered, or recovered as a salvage total loss, these sources
                  flag it.
                </p>
                <p>
                  Some thefts take 24 to 72 hours to propagate, and a
                  private-party theft never reported to insurance may not appear
                  at all. That is why the database check should always be paired
                  with a full{" "}
                  <Link
                    href="/vin-check"
                    className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80"
                  >
                    VIN history report
                  </Link>{" "}
                  and an in-person inspection.
                </p>
              </div>
              <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                  <h3 className="font-headline font-extrabold text-primary">
                    Why the VIN matters
                  </h3>
                </div>
                <p className="text-sm text-on-surface-variant leading-relaxed mb-3">
                  The VIN is stamped or laser-etched in multiple places: the
                  dashboard, door jamb, engine block, firewall, and structural
                  members. Thieves can swap a plate or two, but altering every
                  VIN on a car is enormously difficult.
                </p>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Mismatched VINs across these locations are one of the strongest
                  red flags of a stolen vehicle. Our{" "}
                  <Link
                    href="/guides/what-is-a-vin-number"
                    className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80"
                  >
                    VIN locations guide
                  </Link>{" "}
                  shows every spot to check.
                </p>
              </div>
            </div>
          </section>

          {/* ── What the report shows ────────────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              What a Stolen Vehicle Report Shows
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">
              When a VIN is run against theft databases, the report surfaces
              these record types whenever they are present.
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

          {/* ── Warning signs deep-dive ──────────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">
              Warning Signs of a Stolen Vehicle
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
                <p>
                  Even before you run a VIN check, certain seller behaviors and
                  vehicle conditions should raise immediate concern. Any one of
                  them is a reason to slow down and verify everything.
                </p>
                <p>
                  Trust the physical evidence over the seller&apos;s story.
                  Compare the VIN on the dashboard with the door-jamb sticker and
                  the title. All three should match exactly, and any discrepancy
                  is a reason to walk away.
                </p>
                <p>
                  Honest sellers welcome verification. Pressure to rush, pay
                  cash, or skip the title transfer is the opposite of how a
                  legitimate sale works.
                </p>
              </div>
              <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="w-5 h-5 text-primary" />
                  <h3 className="font-headline font-extrabold text-primary">
                    Red flags to watch for
                  </h3>
                </div>
                <ul className="space-y-2 text-sm text-on-surface">
                  {WARNING_SIGNS.map((tip) => (
                    <li key={tip} className="flex items-start gap-2">
                      <Check
                        className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5"
                        strokeWidth={3}
                      />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* ── Mid-page CTA ───────────────────────────────── */}
          <section className="py-10">
            <div className="rounded-3xl bg-primary p-7 sm:p-10 text-center">
              <Sparkles className="w-8 h-8 text-yellow-300 mx-auto mb-3" />
              <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-white mb-2">
                Check a VIN Before You Pay
              </h2>
              <p className="text-white/80 text-sm sm:text-base mb-6 max-w-xl mx-auto">
                Enter the VIN to query national theft and title-brand databases.
                Free, in seconds.
              </p>
              <div className="max-w-xl mx-auto bg-white rounded-2xl p-4 sm:p-5">
                <VinSearchForm size="lg" />
              </div>
            </div>
          </section>

          {/* ── What to do if flagged ────────────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">
              What to Do If You Suspect a Stolen Vehicle
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
                <p>
                  If a VIN check returns a stolen flag, or you notice the warning
                  signs during a viewing, do not confront the seller. Walk away
                  calmly and contact your local police non-emergency line as soon
                  as it is safe.
                </p>
                <p>
                  Give investigators the VIN, the listing URL, the address where
                  you met, the seller&apos;s name and phone number, and any
                  photos you took. Recovering a stolen vehicle is far easier when
                  they get this quickly.
                </p>
                <p>
                  If you already bought a car that turns out to be stolen, do not
                  drive it. Contact law enforcement, preserve all paperwork and
                  payment records, and notify your insurer. In most states the
                  legal owner can reclaim the vehicle without compensating you,
                  so a police report and a civil claim against the seller are
                  your best path to recovering money.
                </p>
              </div>
              <div className="rounded-2xl bg-secondary-container/40 border border-outline-variant p-6">
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="w-5 h-5 text-on-secondary-container" />
                  <h3 className="font-headline font-extrabold text-on-secondary-container">
                    Where to cross-check the VIN
                  </h3>
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm text-on-surface">
                  {VIN_SPOTS.map((spot) => (
                    <li key={spot} className="flex items-start gap-2">
                      <Check
                        className="w-4 h-4 text-primary flex-shrink-0 mt-0.5"
                        strokeWidth={3}
                      />
                      <span>{spot}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-5 rounded-xl bg-white p-4 border border-outline-variant">
                  <p className="text-xs font-bold text-on-surface mb-2">
                    Start the stolen vehicle check:
                  </p>
                  <VinSearchForm size="sm" />
                </div>
              </div>
            </div>
          </section>

          {/* ── Combine with full report ─────────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              Combine Theft Checks with a Full History Report
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl leading-relaxed">
              A stolen vehicle check is one essential layer of due diligence, but
              it should never be the only one.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5 sm:p-6">
                <div className="text-[11px] font-black uppercase tracking-wider text-on-surface-variant mb-2">
                  Theft Check
                </div>
                <p className="text-lg font-headline font-extrabold text-on-surface mb-3">
                  What it confirms
                </p>
                <ul className="space-y-2 text-sm text-on-surface-variant">
                  <li className="flex gap-2">
                    <span>·</span>
                    <span>Active theft and theft-recovery flags by VIN.</span>
                  </li>
                  <li className="flex gap-2">
                    <span>·</span>
                    <span>NICB insurer-reported salvage and total loss.</span>
                  </li>
                  <li className="flex gap-2">
                    <span>·</span>
                    <span>A fast yes-or-no signal before a viewing.</span>
                  </li>
                </ul>
              </div>
              <div className="rounded-2xl border border-primary/30 bg-primary/5 p-5 sm:p-6">
                <div className="text-[11px] font-black uppercase tracking-wider text-primary mb-2">
                  Full VIN History
                </div>
                <p className="text-lg font-headline font-extrabold text-primary mb-3">
                  What it adds
                </p>
                <ul className="space-y-2 text-sm text-on-surface-variant">
                  <li className="flex gap-2">
                    <span>·</span>
                    <span>Title history and brands across all 50 states.</span>
                  </li>
                  <li className="flex gap-2">
                    <span>·</span>
                    <span>Accident, odometer, and salvage records.</span>
                  </li>
                  <li className="flex gap-2">
                    <span>·</span>
                    <span>The full picture to match against the seller&apos;s story.</span>
                  </li>
                </ul>
              </div>
            </div>
            <p className="mt-5 text-xs text-on-surface-variant">
              New to this? Our{" "}
              <Link
                href="/guides/free-vin-check"
                className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80"
              >
                free VIN check guide
              </Link>{" "}
              and{" "}
              <Link
                href="/salvage-title-check"
                className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80"
              >
                salvage title check
              </Link>{" "}
              cover the next steps.
            </p>
          </section>

          {/* ── Internal links ─────────────────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              More VIN Tools for Buyers
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-7">
              The theft check is the starting point. These tools complete your
              due diligence on any used car.
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
              Stolen Vehicle Check: Frequently Asked Questions
            </h2>
            <p className="text-sm text-on-surface-variant mb-8">
              The questions buyers ask most about checking a VIN against theft
              databases.
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
              <Zap className="w-3.5 h-3.5" /> Free · Instant · National Theft Data
            </div>
            <h2 className="text-2xl sm:text-4xl font-headline font-extrabold text-primary mb-3">
              Check If a Car Is Stolen
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl mx-auto mb-8">
              Enter a 17-character VIN to instantly check national theft and
              title-brand databases before you buy.
            </p>
            <div className="max-w-xl mx-auto bg-surface-container-low rounded-2xl p-5 border border-outline-variant">
              <VinSearchForm size="lg" />
            </div>
            <div className="mt-3 flex items-center justify-center gap-2 text-xs text-on-surface-variant">
              <Check className="w-3.5 h-3.5 text-green-500" strokeWidth={3} />
              No credit card · No sign-up · Free
            </div>
          </section>

          <RelatedChecks exclude="/stolen-vehicle-check" />
        </div>
      </article>
    </>
  );
}
