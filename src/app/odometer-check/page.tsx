import type { Metadata } from "next";
import Link from "next/link";
import {
  Check,
  Shield,
  Search,
  FileText,
  Database,
  Gauge,
  ChevronRight,
  Lock,
  Zap,
  BadgeCheck,
  Sparkles,
  AlertTriangle,
  TrendingUp,
  Footprints,
  Cpu,
  ScrollText,
  ClipboardCheck,
  DollarSign,
  Scale,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";

export const metadata: Metadata = {
  title:
    "Odometer & Mileage Check by VIN — Detect Rollback Fraud (Free NMVTIS Lookup)",
  description:
    "Check a vehicle's mileage history by VIN — free. Compare every reported odometer reading across NMVTIS, title transfers, and inspections to detect rollback and odometer fraud before you buy.",
  keywords: [
    "odometer rollback check",
    "mileage check VIN",
    "odometer fraud check",
    "vehicle mileage history",
    "odometer check by VIN",
    "VIN mileage lookup",
    "odometer reading history",
    "rollback detection VIN",
    "not actual mileage brand",
    "true mileage unknown VIN",
    "digital odometer rollback",
    "free mileage check",
  ],
  alternates: { canonical: "/odometer-check" },
  openGraph: {
    title:
      "Odometer & Mileage Check by VIN — Detect Rollback Fraud (Free)",
    description:
      "Spot odometer rollback with a free VIN-based mileage history check. Compare reported readings across NMVTIS records before you buy.",
    url: `${SITE}/odometer-check`,
    type: "article",
    siteName: "CarCheckerVIN",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Odometer & Mileage Check by VIN — Detect Rollback Fraud (Free)",
    description:
      "Free VIN-based mileage history. Compare every reported odometer reading across NMVTIS to catch rollback fraud.",
  },
  robots: { index: true, follow: true },
};

/* ── JSON-LD schemas ───────────────────────────────────────────── */

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Odometer & Mileage Check by VIN",
  url: `${SITE}/odometer-check`,
  applicationCategory: "AutomotiveApplication",
  operatingSystem: "All",
  description:
    "Check a vehicle's mileage history by its 17-character VIN. Assembles every reported odometer reading from NMVTIS, title transfers, state inspections, and service events into a date-stamped timeline so rollback and odometer fraud stand out.",
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
  headline: "Odometer & Mileage Check by VIN",
  description:
    "Learn how odometer fraud works, how a VIN check detects rollback, which physical signs to look for, and what to do if you spot a discrepancy.",
  author: ORG_AUTHOR,
  publisher: {
    "@type": "Organization",
    name: "CarCheckerVIN",
    url: SITE,
    logo: { "@type": "ImageObject", url: `${SITE}/logo.png` },
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${SITE}/odometer-check`,
  },
  datePublished: "2026-04-16",
  dateModified: "2026-06-09",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I check a car's odometer history by VIN?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Enter the 17-character VIN into a mileage check tool and it pulls every reported odometer reading on file. Readings are collected at title transfers, state inspections, oil changes, dealer service visits, and auction sales, then arranged into a date-stamped timeline. Because mileage should only ever increase, any reading lower than an earlier one — or a long unexplained gap — immediately stands out as a possible rollback.",
      },
    },
    {
      "@type": "Question",
      name: "What is odometer rollback?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Odometer rollback is the illegal practice of altering a vehicle's mileage display to show fewer miles than it has actually traveled. Lower mileage commands a higher resale price, so a few thousand miles erased can add thousands of dollars to the asking price. Despite the name, rollback also covers spinning a reading forward or backward — any tampering done to misrepresent true mileage with intent to defraud a buyer.",
      },
    },
    {
      "@type": "Question",
      name: "How can I spot a rolled-back odometer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Compare the dashboard reading against the VIN's reported mileage history — a current reading lower than a past record is near-certain rollback. Also watch physical clues: worn pedals, steering wheel, or seat bolsters on a low-mileage claim, service stickers showing higher miles than the dash, and a dashboard cluster with mismatched fonts or misaligned digits. Check the title for a 'Not Actual Mileage' brand.",
      },
    },
    {
      "@type": "Question",
      name: "Does a VIN check show mileage history?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. A VIN-based check assembles odometer readings reported at title transfers, state safety and emissions inspections, and service or auction events into a single timeline. Coverage varies by vehicle and state, and a reading is only as good as what was actually reported — so gaps can exist. Still, a typical older vehicle has multiple recorded data points, usually enough to confirm or disprove a seller's mileage claim.",
      },
    },
    {
      "@type": "Question",
      name: "Is odometer fraud illegal?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The federal Truth in Mileage Act makes odometer tampering a federal crime and requires sellers to disclose the true mileage in writing on the title at every transfer. Disconnecting, resetting, or altering an odometer with intent to defraud (49 U.S.C. § 32703) can bring prison time and substantial fines. A defrauded buyer may also recover treble damages plus attorney fees under federal law.",
      },
    },
    {
      "@type": "Question",
      name: "What does a 'Not Actual Mileage' or 'Exceeds Mechanical Limits' title brand mean?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "These are odometer title brands. 'Not Actual Mileage' means the recorded reading is known or suspected to be inaccurate — often the signature of a rollback or a replaced cluster. 'Exceeds Mechanical Limits' means the true mileage is higher than the odometer can physically display, common on older five-digit units that rolled past 99,999. Either brand permanently follows the VIN and signals the reading cannot be trusted at face value.",
      },
    },
    {
      "@type": "Question",
      name: "Can digital odometers be rolled back?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — a common misconception is that digital odometers cannot be altered. In reality, inexpensive tools that plug into the OBD-II port can rewrite the stored mileage in minutes, and on modern cars the figure lives in multiple electronic modules. NHTSA estimates odometer fraud affects on the order of hundreds of thousands of vehicles per year, which is exactly why a VIN-based reading history is more reliable than the dashboard alone.",
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
  name: "How to Check a Car's Odometer History by VIN",
  description:
    "Verify a used vehicle's true mileage and detect odometer rollback using its 17-character VIN before you buy.",
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
      name: "Pull the reported mileage history",
      text: "Enter the VIN into the search tool. It assembles odometer readings reported at title transfers, state inspections, service visits, and auctions into a date-stamped timeline.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Look for any reading that drops",
      text: "Mileage should only ever increase. A later reading lower than an earlier one is near-certain rollback. Also flag long gaps and sudden drops in annual mileage.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Confirm against the dashboard and the car",
      text: "Compare the timeline to the current dashboard reading and physical wear. A 'Not Actual Mileage' title brand or worn-but-low-mileage car confirms the reading can't be trusted.",
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
      name: "Odometer Check",
      item: `${SITE}/odometer-check`,
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
  url: `${SITE}/odometer-check`,
};

/* ── Static UI data ────────────────────────────────────────────── */

const TRUST_STATS = [
  { icon: Database, value: "NMVTIS", label: "DOJ-backed data" },
  { icon: TrendingUp, value: "Timeline", label: "every reading" },
  { icon: Gauge, value: "Rollback", label: "detection" },
  { icon: Zap, value: "Free", label: "no sign-up" },
];

const HOW_STEPS = [
  {
    icon: Search,
    tag: "Step 1",
    title: "Enter the VIN",
    body: "Type the 17-character VIN from the dashboard, door jamb, title, or registration. Mileage records are tied to the VIN — not the number on the dash a seller can rewrite.",
  },
  {
    icon: Database,
    tag: "Step 2",
    title: "We assemble every reading",
    body: "The lookup pulls reported odometer readings from NMVTIS, title transfers, state inspections, and service events into a single date-stamped timeline.",
  },
  {
    icon: TrendingUp,
    tag: "Step 3",
    title: "Spot any drop or gap",
    body: "Mileage should only climb. A later reading lower than an earlier one — or a sudden drop in annual miles — is the signature of a rollback.",
  },
];

const SIGNS = [
  {
    icon: Footprints,
    title: "Worn touch points",
    body: "Worn pedal pads, a shiny steering wheel, a frayed driver-seat bolster, or a polished shift knob on a car claiming low mileage.",
  },
  {
    icon: Gauge,
    title: "Worn or new tires",
    body: "Heavily worn — or recently replaced — tires on a vehicle showing under 30,000 miles rarely add up to the claim.",
  },
  {
    icon: ScrollText,
    title: "Service-sticker mismatch",
    body: "Oil-change stickers under the hood or on the door jamb showing higher mileage than the dashboard currently displays.",
  },
  {
    icon: FileText,
    title: "Gaps in the records",
    body: "Maintenance history that suddenly stops, or multi-year date gaps that create the window where tampering is most likely.",
  },
  {
    icon: Cpu,
    title: "Tampered cluster",
    body: "Mismatched fonts, misaligned digits, or scratches and clips that suggest the instrument cluster was removed and reinstalled.",
  },
  {
    icon: AlertTriangle,
    title: "Branded title field",
    body: "An odometer field marked 'exempt,' 'not actual,' or 'exceeds mechanical limits' — a permanent VIN warning the reading isn't trustworthy.",
  },
];

const SPOTTED_CHECKLIST = [
  "Do not buy — a dropping reading is near-certain fraud",
  "Save the listing, bill of sale, and your VIN report",
  "Photograph the dashboard reading and the title field",
  "Report it to your state attorney general's office",
  "Report it to the NHTSA Office of Odometer Fraud Investigation",
  "If already purchased, you may recover treble damages plus fees",
];

const INTERNAL_LINKS = [
  {
    href: "/accident-history-check",
    label: "Accident History Check",
    desc: "A clean mileage record means little if the car hides reported collision damage.",
  },
  {
    href: "/salvage-title-check",
    label: "Salvage Title Check",
    desc: "Rollback and branded titles often travel together — verify both by VIN.",
  },
  {
    href: "/total-loss-check",
    label: "Total Loss Check",
    desc: "See whether an insurer ever wrote the vehicle off, a common rollback context.",
  },
  {
    href: "/stolen-vehicle-check",
    label: "Stolen Vehicle Check",
    desc: "Confirm the car isn't reported stolen before you trust any of its paperwork.",
  },
  {
    href: "/vin-check",
    label: "Full VIN History Check",
    desc: "Mileage, title brands, accidents, theft, and recalls in one complete report.",
  },
  {
    href: "/vin-decoder",
    label: "VIN Decoder",
    desc: "Decode the 17-character VIN to specs, trim, and factory build details.",
  },
];

/* ── Page ──────────────────────────────────────────────────────── */

export default function OdometerCheckPage() {
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
                { label: "Odometer Check" },
              ]}
              onDark
            />

            <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
              <Gauge className="w-4 h-4" /> Mileage History
              &nbsp;·&nbsp; Rollback Detection
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-headline font-extrabold leading-tight mb-4">
              Odometer &amp; Mileage Check by VIN —{" "}
              <span style={{ color: "var(--color-secondary-container)" }}>
                Are the Miles Real?
              </span>
            </h1>

            <p className="speakable-intro text-base sm:text-xl text-white/85 max-w-3xl mb-8 leading-relaxed">
              Odometer fraud costs U.S. buyers an estimated billion-plus dollars
              a year — and digital dashboards make rollback easier than ever.
              Enter a 17-character VIN to pull every reported reading on file and
              lay them out chronologically, so any rollback stands out at a
              glance — free, before you buy.
            </p>

            <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-xl">
              <h2 className="text-base sm:text-lg font-headline font-extrabold text-primary mb-1">
                Run a Mileage Check by VIN
              </h2>
              <p className="text-xs sm:text-sm text-on-surface-variant mb-4">
                Enter any 17-character VIN — we&apos;ll assemble every reported
                odometer reading into a timeline
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
              How a VIN Mileage Check Detects Rollback
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl">
              The logic is simple: mileage should only ever go up. By gathering
              every reported reading against the VIN, three steps turn scattered
              records into proof the miles are — or aren&apos;t — real.
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

          {/* ── What is odometer fraud ───────────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              What Is Odometer Fraud — and Why It Still Happens
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
                <p>
                  Odometer fraud is the illegal practice of altering a
                  vehicle&apos;s mileage to make it appear to have less wear than
                  it really does. Lower mileage commands a higher resale price,
                  so sellers roll back digital readings using{" "}
                  <strong className="text-on-surface">
                    inexpensive OBD-II tools
                  </strong>{" "}
                  — a few minutes of work that can add thousands to the asking
                  price.
                </p>
                <p>
                  A common myth is that digital odometers can&apos;t be altered.
                  In reality the figure lives in several electronic modules, all
                  of which can be rewritten. NHTSA estimates hundreds of
                  thousands of vehicles are sold each year with falsified
                  readings, costing buyers thousands of dollars apiece.
                </p>
                <p>
                  The defense: every time a car is sold, registered, inspected,
                  or serviced, the reading at that moment is often recorded
                  somewhere. A VIN-based mileage check assembles all of those
                  data points into one timeline the dashboard can&apos;t fake.
                </p>
              </div>
              <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <h3 className="font-headline font-extrabold text-primary">
                    Worked example — a reading that drops
                  </h3>
                </div>
                <ul className="space-y-3 text-sm text-on-surface">
                  <li className="flex items-center justify-between gap-3 rounded-lg bg-white px-3.5 py-2.5 border border-outline-variant/60">
                    <span className="text-on-surface-variant">
                      2022 · inspection
                    </span>
                    <code className="font-mono font-bold text-primary">
                      88,400 mi
                    </code>
                  </li>
                  <li className="flex items-center justify-between gap-3 rounded-lg bg-white px-3.5 py-2.5 border border-outline-variant/60">
                    <span className="text-on-surface-variant">
                      2024 · title transfer
                    </span>
                    <code className="font-mono font-bold text-primary">
                      52,100 mi
                    </code>
                  </li>
                  <li className="flex items-center justify-between gap-3 rounded-lg bg-white px-3.5 py-2.5 border border-outline-variant/60">
                    <span className="text-on-surface-variant">
                      Verdict
                    </span>
                    <code className="font-mono font-bold text-primary">
                      rollback
                    </code>
                  </li>
                </ul>
                <p className="mt-4 text-xs text-on-surface-variant leading-relaxed">
                  Mileage can&apos;t fall ~36k between readings — the 2024 figure
                  was rolled back. The timeline exposes it instantly even though
                  the dashboard looks clean.
                </p>
              </div>
            </div>
          </section>

          {/* ── NMVTIS backbone ──────────────────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              NMVTIS — The Backbone of Mileage Data
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl leading-relaxed">
              The National Motor Vehicle Title Information System, run by the
              U.S. Department of Justice, requires every state DMV to report the
              odometer reading each time a title is issued or transferred.
              Insurers, auto auctions, and salvage yards report too.
            </p>
            <div className="rounded-2xl bg-secondary-container/40 border border-outline-variant p-5 sm:p-6">
              <div className="flex items-start gap-3">
                <Database className="w-5 h-5 text-on-secondary-container flex-shrink-0 mt-0.5" />
                <p className="text-sm text-on-surface leading-relaxed">
                  <strong className="text-on-surface">
                    Every transfer leaves a record.
                  </strong>{" "}
                  Each state-to-state title transfer, total-loss event, and
                  salvage-auction sale generates an NMVTIS-recorded reading.
                  Combined with state inspection and service-shop data, a typical
                  10-year-old vehicle carries roughly 5–30 individual mileage
                  data points — far more than enough to confirm or disprove a
                  seller&apos;s claim.
                </p>
              </div>
            </div>
          </section>

          {/* ── Mid-page CTA ───────────────────────────────── */}
          <section className="py-10">
            <div className="rounded-3xl bg-primary p-7 sm:p-10 text-center">
              <Sparkles className="w-8 h-8 text-yellow-300 mx-auto mb-3" />
              <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-white mb-2">
                Are This Car&apos;s Miles Real?
              </h2>
              <p className="text-white/80 text-sm sm:text-base mb-6 max-w-xl mx-auto">
                Don&apos;t trust the number on the dash — it can be rewritten in
                minutes. Run the VIN to see every reported reading on a timeline,
                free, in seconds.
              </p>
              <div className="max-w-xl mx-auto bg-white rounded-2xl p-4 sm:p-5">
                <VinSearchForm size="lg" />
              </div>
            </div>
          </section>

          {/* ── Physical signs ───────────────────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              Physical Signs of Odometer Tampering
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">
              A VIN check is your most powerful tool, but a careful in-person
              inspection adds another layer. Watch for these clues that the
              reported mileage may not match reality.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {SIGNS.map((s) => {
                const Icon = s.icon;
                return (
                  <div
                    key={s.title}
                    className="rounded-2xl border border-outline-variant bg-surface p-5"
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-base font-headline font-extrabold text-primary mb-1">
                      {s.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                      {s.body}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ── Odometer title brands ────────────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              Odometer Title Brands — What the Labels Mean
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl leading-relaxed">
              When a reading can&apos;t be trusted, the title carries a permanent
              brand that follows the VIN. Knowing which is which tells you how to
              read the number on the dash.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-2xl border border-primary/30 bg-primary/5 p-5 sm:p-6">
                <div className="text-[11px] font-black uppercase tracking-wider text-primary mb-2">
                  Actual mileage
                </div>
                <p className="text-lg font-headline font-extrabold text-primary mb-3">
                  Trusted reading
                </p>
                <ul className="space-y-2 text-sm text-on-surface-variant">
                  <li className="flex gap-2"><span>·</span><span>Recorded reading believed to be accurate.</span></li>
                  <li className="flex gap-2"><span>·</span><span>Still cross-check it against the VIN timeline.</span></li>
                  <li className="flex gap-2"><span>·</span><span>Confirm the dash matches the latest record.</span></li>
                </ul>
              </div>
              <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5 sm:p-6">
                <div className="text-[11px] font-black uppercase tracking-wider text-on-surface-variant mb-2">
                  Not actual mileage
                </div>
                <p className="text-lg font-headline font-extrabold text-on-surface mb-3">
                  Known inaccurate
                </p>
                <ul className="space-y-2 text-sm text-on-surface-variant">
                  <li className="flex gap-2"><span>·</span><span>Reading is known or suspected to be wrong.</span></li>
                  <li className="flex gap-2"><span>·</span><span>Often the signature of a rollback or swapped cluster.</span></li>
                  <li className="flex gap-2"><span>·</span><span>Treat the displayed mileage as unreliable.</span></li>
                </ul>
              </div>
              <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5 sm:p-6">
                <div className="text-[11px] font-black uppercase tracking-wider text-on-surface-variant mb-2">
                  Exceeds mechanical limits
                </div>
                <p className="text-lg font-headline font-extrabold text-on-surface mb-3">
                  Rolled past max
                </p>
                <ul className="space-y-2 text-sm text-on-surface-variant">
                  <li className="flex gap-2"><span>·</span><span>True mileage is higher than the dial can show.</span></li>
                  <li className="flex gap-2"><span>·</span><span>Common on older five-digit units past 99,999.</span></li>
                  <li className="flex gap-2"><span>·</span><span>Add the rollover to read the real figure.</span></li>
                </ul>
              </div>
            </div>
          </section>

          {/* ── What to do if you spot a rollback ────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">
              What to Do If You Spot a Rollback
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
                <p>
                  If your mileage check reveals a discrepancy,{" "}
                  <strong className="text-on-surface">
                    don&apos;t buy the vehicle.
                  </strong>{" "}
                  Federal law (49 U.S.C. § 32703) prohibits disconnecting,
                  resetting, or altering an odometer with intent to defraud —
                  penalties reach up to three years in prison and substantial
                  fines.
                </p>
                <p>
                  Report suspected fraud to your state attorney general&apos;s
                  office and the NHTSA Office of Odometer Fraud Investigation. If
                  you already bought the car and later discover rollback, you may
                  recover{" "}
                  <strong className="text-on-surface">
                    three times your actual damages plus attorney fees
                  </strong>{" "}
                  under federal law.
                </p>
                <p>
                  Save every document — the listing, the bill of sale, your VIN
                  check report, and all communication with the seller — to
                  support a claim.
                </p>
              </div>
              <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <ClipboardCheck className="w-5 h-5 text-primary" />
                  <h3 className="font-headline font-extrabold text-primary">
                    If a reading drops — do this
                  </h3>
                </div>
                <ul className="space-y-2 text-sm text-on-surface">
                  {SPOTTED_CHECKLIST.map((tip) => (
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
                    Check the mileage timeline before you commit:
                  </p>
                  <VinSearchForm size="sm" />
                </div>
              </div>
            </div>
          </section>

          {/* ── Why it matters ───────────────────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              Why a Mileage Check Matters Before You Buy
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">
              Mileage is the single biggest driver of a used car&apos;s value —
              and the easiest figure to fake. Verifying it tied to the VIN
              protects both your wallet and your safety.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  icon: DollarSign,
                  title: "Protect your wallet",
                  body: "Rolled-back miles inflate the price by thousands. Knowing the true reading before you negotiate keeps you from overpaying.",
                },
                {
                  icon: Shield,
                  title: "Protect your safety",
                  body: "A car with far more miles than shown may be overdue for timing belts, brakes, and major service the seller skipped.",
                },
                {
                  icon: BadgeCheck,
                  title: "Verify, don't trust",
                  body: "Digital odometers rewrite in minutes. The VIN-tied reading history — not the dashboard — is the only reliable proof.",
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
            <div className="mt-6 rounded-2xl bg-secondary-container/40 border border-outline-variant p-5 sm:p-6">
              <div className="flex items-start gap-3">
                <Scale className="w-5 h-5 text-on-secondary-container flex-shrink-0 mt-0.5" />
                <p className="text-sm text-on-surface leading-relaxed">
                  <strong className="text-on-surface">The law is on your side.</strong>{" "}
                  The federal Truth in Mileage Act requires written mileage
                  disclosure at every title transfer — so a seller who
                  misrepresents the odometer is breaking federal law, and your
                  VIN report is the evidence that proves it.
                </p>
              </div>
            </div>
          </section>

          {/* ── Internal links ─────────────────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              More VIN Checks That Pair With a Mileage Check
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-7">
              Mileage is one piece of the puzzle. These checks complete the
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
              Odometer Check — Frequently Asked Questions
            </h2>
            <p className="text-sm text-on-surface-variant mb-8">
              The questions buyers ask most about mileage history and odometer
              rollback.
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
              <Zap className="w-3.5 h-3.5" /> Free · Instant · NMVTIS-Backed
            </div>
            <h2 className="text-2xl sm:text-4xl font-headline font-extrabold text-primary mb-3">
              Verify the Mileage Before You Buy
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl mx-auto mb-8">
              Enter a 17-character VIN to see every reported odometer reading on
              file and catch rollback before it costs you thousands.
            </p>
            <div className="max-w-xl mx-auto bg-surface-container-low rounded-2xl p-5 border border-outline-variant">
              <VinSearchForm size="lg" />
            </div>
            <div className="mt-3 flex items-center justify-center gap-2 text-xs text-on-surface-variant">
              <Check className="w-3.5 h-3.5 text-green-500" strokeWidth={3} />
              No credit card · No sign-up · Free
            </div>
          </section>

          <RelatedChecks exclude="/odometer-check" />
        </div>
      </article>
    </>
  );
}
