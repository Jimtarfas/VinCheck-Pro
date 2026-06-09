import type { Metadata } from "next";
import Link from "next/link";
import {
  Check,
  Shield,
  ShieldAlert,
  Search,
  FileText,
  Database,
  ChevronRight,
  Lock,
  Zap,
  BadgeCheck,
  Sparkles,
  AlertTriangle,
  Wind,
  Cpu,
  Wrench,
  Gauge,
  ClipboardCheck,
  Ban,
  Car,
  CircleAlert,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";

export const metadata: Metadata = {
  title:
    "Airbag & Deployment Check by VIN — SRS History & Fraud Detection (Free)",
  description:
    "Check if a vehicle's airbags were deployed or replaced by VIN — free. Surface severe-accident, total-loss, and salvage records plus open airbag recalls to detect counterfeit airbags and incomplete SRS repairs before you buy.",
  keywords: [
    "airbag check by VIN",
    "airbag deployment history",
    "SRS check VIN",
    "airbag fraud check",
    "deployed airbag VIN",
    "counterfeit airbag check",
    "Takata recall VIN check",
    "SRS warning light",
    "did airbags deploy",
    "free airbag check",
  ],
  alternates: { canonical: "/airbag-check" },
  openGraph: {
    title:
      "Airbag & Deployment Check by VIN — SRS History & Fraud Detection (Free)",
    description:
      "Check if a vehicle's airbags were deployed or replaced by VIN. Detect counterfeit airbags and incomplete SRS repairs before you buy.",
    url: `${SITE}/airbag-check`,
    type: "article",
    siteName: "CarCheckerVIN",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Airbag & Deployment Check by VIN — SRS History & Fraud Detection (Free)",
    description:
      "Free VIN-based airbag and SRS history. Surface deployment-linked records and open airbag recalls before you buy.",
  },
  robots: { index: true, follow: true },
};

/* ── JSON-LD schemas ───────────────────────────────────────────── */

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Airbag & Deployment Check by VIN",
  url: `${SITE}/airbag-check`,
  applicationCategory: "AutomotiveApplication",
  operatingSystem: "All",
  description:
    "Check a vehicle's airbag and SRS history by its 17-character VIN. Surfaces severe-accident, insurance total-loss, and salvage-title records that indicate likely airbag deployment, plus open NHTSA airbag recalls — the signals that expose counterfeit airbags and incomplete SRS repairs.",
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
  headline: "Airbag & Deployment Check by VIN",
  description:
    "Learn how to check airbag deployment history by VIN, why it matters, the common forms of airbag fraud, and how to verify the SRS system was correctly restored.",
  author: ORG_AUTHOR,
  publisher: {
    "@type": "Organization",
    name: "CarCheckerVIN",
    url: SITE,
    logo: { "@type": "ImageObject", url: `${SITE}/logo.png` },
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${SITE}/airbag-check`,
  },
  datePublished: "2026-05-04",
  dateModified: "2026-06-09",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Does a VIN check show airbag deployment history?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A VIN check rarely logs each airbag deployment as a separate line item. Instead, it surfaces the records that point to deployment: severe accident reports, insurance total-loss declarations, and salvage or rebuilt title brands. When a frontal or side collision appears in the history at speeds that typically trigger the SRS system, that is strong evidence airbags deployed — even when no explicit airbag entry exists.",
      },
    },
    {
      "@type": "Question",
      name: "Why do deployed airbags matter when buying a used car?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Airbags are single-use devices. Once deployed, they must be replaced with proper modules, sensors, and the airbag control module to restore crash protection. A correct replacement can cost $3,000 to $10,000, which tempts some sellers to install counterfeit modules, stuff the cavity with rags, or leave the system disabled. A buyer then drives a car that looks repaired but offers no airbag protection in the next crash.",
      },
    },
    {
      "@type": "Question",
      name: "Can you tell if airbags were replaced after deployment?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Not always from the VIN alone. Body-shop repair records are not centrally databased, so airbag replacement is often inferred rather than documented. The most reliable confirmation combines the VIN history with a physical inspection: check for a lit SRS warning light, mismatched dashboard or steering-wheel covers, and have a technician read SRS fault codes with an OBD-II scan tool before buying.",
      },
    },
    {
      "@type": "Question",
      name: "Does a salvage or total-loss title mean airbags deployed?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Not automatically, but it is a strong signal. A salvage or total-loss brand means an insurer declared the repair cost too high relative to the car's value, and severe frontal or side collisions that cause that damage usually deploy airbags. Flood or theft total-losses may not involve deployment. Treat any salvage or rebuilt title as a prompt to verify the SRS system was fully and correctly restored.",
      },
    },
    {
      "@type": "Question",
      name: "How do I check airbag status by VIN?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Enter the 17-character VIN into the search tool above. The report pulls accident severity, insurance total-loss, and salvage title records that indicate likely airbag deployment, plus any open NHTSA airbag-related recalls. For full confirmation, pair the VIN check with a pre-purchase inspection that includes an SRS diagnostic scan, since the actual condition of the airbag modules must be verified in person.",
      },
    },
    {
      "@type": "Question",
      name: "Are airbag recalls like the Takata recall shown by VIN?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Open airbag-related recalls are tied to the VIN through NHTSA's recall database, which you can search free at nhtsa.gov. The Takata inflator recall — the largest automotive recall in U.S. history, affecting tens of millions of vehicles — is tracked this way. A defective Takata inflator can rupture and send metal fragments into the cabin, so always confirm any open recall is closed before buying.",
      },
    },
    {
      "@type": "Question",
      name: "Is it safe to buy a car with previously deployed airbags?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It can be, but only if the airbags and the full SRS system were replaced correctly with OEM or equivalent parts by a qualified shop. The danger is not the prior deployment itself but improper repair — counterfeit modules, used modules that cannot redeploy, or a disabled warning light. Require documented repair records and an SRS diagnostic scan, and never rely on the airbag light being off alone.",
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
  name: "How to Check Airbag & SRS History by VIN",
  description:
    "Assess whether a used vehicle's airbags likely deployed and whether the SRS system was correctly restored, using its 17-character VIN before you buy.",
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
      name: "Run the VIN for deployment signals",
      text: "Enter the VIN into the search tool. It surfaces severe-accident, insurance total-loss, and salvage-title records that indicate likely airbag deployment, plus any open NHTSA airbag recalls.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Flag any deployment without a repair record",
      text: "A severe frontal or side collision in the history with no corresponding airbag replacement is a major red flag that the SRS system may not have been correctly restored.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Confirm with an SRS diagnostic scan",
      text: "Before buying, get a pre-purchase inspection that reads SRS fault codes with an OBD-II scanner. Never rely on the airbag warning light being off alone — it can be disabled.",
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
      name: "Airbag Check",
      item: `${SITE}/airbag-check`,
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
  url: `${SITE}/airbag-check`,
};

/* ── Static UI data ────────────────────────────────────────────── */

const TRUST_STATS = [
  { icon: Database, value: "Crash data", label: "severity records" },
  { icon: ShieldAlert, value: "SRS signals", label: "deployment clues" },
  { icon: BadgeCheck, value: "Recalls", label: "Takata & more" },
  { icon: Zap, value: "Free", label: "no sign-up" },
];

const HOW_STEPS = [
  {
    icon: Search,
    tag: "Step 1",
    title: "Enter the VIN",
    body: "Type the 17-character VIN from the dashboard, door jamb, title, or registration. Airbag risk is read from crash and title records tied to the VIN — not the car's cosmetic condition.",
  },
  {
    icon: Database,
    tag: "Step 2",
    title: "We surface deployment signals",
    body: "The lookup pulls severe-accident, insurance total-loss, and salvage-title records that indicate likely deployment, plus any open NHTSA airbag recalls.",
  },
  {
    icon: ClipboardCheck,
    tag: "Step 3",
    title: "Verify with an SRS scan",
    body: "A severe collision with no airbag-repair record is a red flag. Confirm in person with an OBD-II SRS diagnostic before you buy — the light alone isn't proof.",
  },
];

const FRAUD_TYPES = [
  {
    icon: Ban,
    title: "Counterfeit airbags",
    body: "Fake modules that look correct but lack proper inflators — they may not deploy at all, or deploy with dangerous, uncontrolled force.",
  },
  {
    icon: Wind,
    title: "Placeholder stuffing",
    body: "Rags, foam, or other materials packed into the airbag cavity to keep a cosmetic appearance with no functional module behind the cover.",
  },
  {
    icon: AlertTriangle,
    title: "Used deployed modules",
    body: "Previously deployed airbags reinstalled without repacking. They physically fit but cannot deploy again in the next crash.",
  },
  {
    icon: CircleAlert,
    title: "Disabled SRS systems",
    body: "The airbag warning light is disabled so the fault is invisible to a buyer or a quick inspection — hiding a non-functional system.",
  },
];

const SIGNS = [
  {
    icon: ShieldAlert,
    title: "Lit SRS warning light",
    body: "An illuminated airbag light on the dashboard is an immediate red flag that the SRS system has a stored fault.",
  },
  {
    icon: Car,
    title: "Mismatched covers",
    body: "Dashboard, steering-wheel, or pillar covers that don't match the rest of the interior can mean the airbag area was replaced.",
  },
  {
    icon: FileText,
    title: "Missing repair records",
    body: "Documented collision damage with no airbag-replacement entry in the service history warrants serious additional scrutiny.",
  },
  {
    icon: Cpu,
    title: "SRS fault codes",
    body: "An OBD-II scan that reads SRS-specific fault codes can reveal airbag faults that aren't visible from the warning light alone.",
  },
];

const VERIFY_CHECKLIST = [
  "Run the VIN for severe-accident and salvage signals first",
  "Cross-check any open NHTSA airbag recall (e.g. Takata)",
  "Confirm the SRS warning light cycles on, then off, at startup",
  "Get an OBD-II SRS diagnostic scan from a qualified technician",
  "Demand documented OEM airbag-replacement repair records",
  "Never trust a dark airbag light alone — it can be disabled",
];

const INTERNAL_LINKS = [
  {
    href: "/accident-history-check",
    label: "Accident History Check",
    desc: "See the collision severity and context in which any airbag deployment likely occurred.",
  },
  {
    href: "/salvage-title-check",
    label: "Salvage Title Check",
    desc: "Salvage and rebuilt brands often follow the severe crashes that deploy airbags.",
  },
  {
    href: "/total-loss-check",
    label: "Total Loss Check",
    desc: "An insurer write-off usually means damage severe enough to trigger the SRS system.",
  },
  {
    href: "/recall-check",
    label: "Recall Check",
    desc: "Confirm open airbag recalls like Takata are closed — repaired free by the dealer.",
  },
  {
    href: "/vin-check",
    label: "Full VIN History Check",
    desc: "Accidents, title brands, airbag signals, odometer, and recalls in one report.",
  },
  {
    href: "/vin-decoder",
    label: "VIN Decoder",
    desc: "Decode the 17-character VIN to specs, trim, and factory safety equipment.",
  },
];

/* ── Page ──────────────────────────────────────────────────────── */

export default function AirbagCheckPage() {
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
                { label: "Airbag Check" },
              ]}
              onDark
            />

            <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
              <ShieldAlert className="w-4 h-4" /> SRS History
              &nbsp;·&nbsp; Fraud Detection
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-headline font-extrabold leading-tight mb-4">
              Airbag &amp; Deployment Check by VIN —{" "}
              <span style={{ color: "var(--color-secondary-container)" }}>
                Will They Actually Deploy?
              </span>
            </h1>

            <p className="speakable-intro text-base sm:text-xl text-white/85 max-w-3xl mb-8 leading-relaxed">
              Airbag fraud is one of the most dangerous defects in the used-car
              market — a car can look perfectly repaired while hiding counterfeit
              modules, rag-stuffed cavities, or a disabled SRS system. Enter a
              17-character VIN to surface the crash and title records that point
              to deployment, plus open airbag recalls — free, before you buy.
            </p>

            <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-xl">
              <h2 className="text-base sm:text-lg font-headline font-extrabold text-primary mb-1">
                Check Airbag &amp; SRS History by VIN
              </h2>
              <p className="text-xs sm:text-sm text-on-surface-variant mb-4">
                Enter any 17-character VIN — we&apos;ll surface deployment signals
                and open airbag recalls on record
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
              How a VIN Airbag Check Works
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl">
              No database logs every deployment directly, so the check reads the
              records that reveal it. Three steps turn crash and title history
              into a clear picture of airbag risk.
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

          {/* ── Why airbag history matters ───────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              Why Airbag History Matters
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
                <p>
                  Airbags are{" "}
                  <strong className="text-on-surface">single-use</strong> safety
                  devices. Once deployed, restoring crash protection means
                  replacing not just the airbag modules but the crash sensors,
                  the airbag control module, the clockspring, seat-belt
                  pretensioners, and often the steering wheel and dashboard
                  covers the airbags tore through.
                </p>
                <p>
                  A proper OEM replacement can cost{" "}
                  <strong className="text-on-surface">$3,000 to $10,000</strong>{" "}
                  or more. That high cost is exactly what tempts bad actors to
                  cut corners — stuffing the cavity, fitting counterfeit modules
                  that won&apos;t fire, or simply capping the holes with covers
                  and nothing behind them.
                </p>
                <p>
                  The consequence is brutal: a buyer drives a car that looks
                  repaired but offers{" "}
                  <strong className="text-on-surface">
                    no airbag protection
                  </strong>{" "}
                  in the next crash — a failure they had no way of seeing from the
                  outside.
                </p>
              </div>
              <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Gauge className="w-5 h-5 text-primary" />
                  <h3 className="font-headline font-extrabold text-primary">
                    Worked example — the red-flag gap
                  </h3>
                </div>
                <ul className="space-y-3 text-sm text-on-surface">
                  <li className="flex items-center justify-between gap-3 rounded-lg bg-white px-3.5 py-2.5 border border-outline-variant/60">
                    <span className="text-on-surface-variant">
                      Accident record
                    </span>
                    <code className="font-mono font-bold text-primary">
                      severe frontal
                    </code>
                  </li>
                  <li className="flex items-center justify-between gap-3 rounded-lg bg-white px-3.5 py-2.5 border border-outline-variant/60">
                    <span className="text-on-surface-variant">
                      Airbag repair
                    </span>
                    <code className="font-mono font-bold text-primary">
                      none on file
                    </code>
                  </li>
                  <li className="flex items-center justify-between gap-3 rounded-lg bg-white px-3.5 py-2.5 border border-outline-variant/60">
                    <span className="text-on-surface-variant">
                      Verdict
                    </span>
                    <code className="font-mono font-bold text-primary">
                      verify SRS
                    </code>
                  </li>
                </ul>
                <p className="mt-4 text-xs text-on-surface-variant leading-relaxed">
                  A severe frontal crash that likely deployed airbags, with no
                  replacement record, is the classic warning sign — get an SRS
                  scan before you buy.
                </p>
              </div>
            </div>
          </section>

          {/* ── Mid-page CTA ───────────────────────────────── */}
          <section className="py-10">
            <div className="rounded-3xl bg-primary p-7 sm:p-10 text-center">
              <Sparkles className="w-8 h-8 text-yellow-300 mx-auto mb-3" />
              <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-white mb-2">
                Did This Car&apos;s Airbags Deploy?
              </h2>
              <p className="text-white/80 text-sm sm:text-base mb-6 max-w-xl mx-auto">
                A repaired look means nothing if the SRS system is fake or
                disabled. Run the VIN to surface the crash and recall records
                that expose airbag risk — free, in seconds.
              </p>
              <div className="max-w-xl mx-auto bg-white rounded-2xl p-4 sm:p-5">
                <VinSearchForm size="lg" />
              </div>
            </div>
          </section>

          {/* ── Airbag fraud types ───────────────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              Airbag Fraud — A Real and Documented Danger
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">
              NHTSA and the National Insurance Crime Bureau have documented theft
              rings and counterfeit modules sold as new on the secondary market.
              These are the four forms the fraud usually takes.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {FRAUD_TYPES.map((f) => {
                const Icon = f.icon;
                return (
                  <div
                    key={f.title}
                    className="rounded-2xl border border-outline-variant bg-surface p-5"
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-base font-headline font-extrabold text-primary mb-1">
                      {f.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                      {f.body}
                    </p>
                  </div>
                );
              })}
            </div>
            <div className="mt-6 rounded-2xl bg-secondary-container/40 border border-outline-variant p-5 sm:p-6">
              <div className="flex items-start gap-3">
                <ShieldAlert className="w-5 h-5 text-on-secondary-container flex-shrink-0 mt-0.5" />
                <p className="text-sm text-on-surface leading-relaxed">
                  <strong className="text-on-surface">The Takata recall.</strong>{" "}
                  The largest auto recall in U.S. history covers tens of millions
                  of cars whose inflators can rupture and fire metal fragments
                  into the cabin. Always confirm any open airbag recall is closed
                  with a{" "}
                  <Link
                    href="/recall-check"
                    className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80"
                  >
                    recall check
                  </Link>{" "}
                  before buying.
                </p>
              </div>
            </div>
          </section>

          {/* ── Signs of improper replacement ────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              Signs of Improper Airbag Replacement
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">
              A VIN check is your most powerful tool, but a careful in-person
              inspection adds another layer. Watch for these clues that the SRS
              system may not have been properly restored.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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

          {/* ── How deployment is recorded ───────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">
              How Airbag Deployment Is Recorded
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
                <p>
                  Deployment is recorded in several places. The vehicle&apos;s
                  own{" "}
                  <strong className="text-on-surface">
                    event data recorder
                  </strong>{" "}
                  (the &ldquo;black box&rdquo;) logs whether airbags fired, and
                  insurance claims for crashes severe enough to deploy them
                  create records captured in comprehensive VIN reports.
                </p>
                <p>
                  Body-shop repair records may document the replacement, but
                  they&apos;re not centrally databased — so deployment is often{" "}
                  <strong className="text-on-surface">inferred</strong> from
                  patterns: severe collision damage plus high documented repair
                  cost points to a likely airbag event even without an explicit
                  airbag line item.
                </p>
                <p>
                  That&apos;s why the strongest assessment pairs the VIN history
                  with a hands-on{" "}
                  <Link
                    href="/accident-history-check"
                    className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80"
                  >
                    accident history check
                  </Link>{" "}
                  and an in-person SRS diagnostic scan.
                </p>
              </div>
              <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <ClipboardCheck className="w-5 h-5 text-primary" />
                  <h3 className="font-headline font-extrabold text-primary">
                    Airbag verification checklist
                  </h3>
                </div>
                <ul className="space-y-2 text-sm text-on-surface">
                  {VERIFY_CHECKLIST.map((tip) => (
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
                    Start with the VIN — check the crash history first:
                  </p>
                  <VinSearchForm size="sm" />
                </div>
              </div>
            </div>
          </section>

          {/* ── Why it matters ───────────────────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              Why an Airbag Check Matters Before You Buy
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">
              No other defect is this invisible or this lethal. A VIN-based
              airbag check is the first line of defense between you and a car
              that can&apos;t protect you in a crash.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  icon: Shield,
                  title: "Protect your life",
                  body: "A fake or disabled SRS system offers zero protection in the next collision. Verifying it is genuinely a life-safety decision.",
                },
                {
                  icon: Wrench,
                  title: "Avoid a hidden repair bill",
                  body: "Correctly restoring a deployed SRS system can run thousands. Knowing first lets you price it in — or walk away.",
                },
                {
                  icon: BadgeCheck,
                  title: "Verify, don't trust",
                  body: "A dark airbag light can be deliberately disabled. The VIN history plus an SRS scan — not appearances — is the only real proof.",
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
              More VIN Checks That Pair With an Airbag Check
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-7">
              Airbag risk is one piece of the puzzle. These checks complete the
              safety picture before you buy.
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
              Airbag Check — Frequently Asked Questions
            </h2>
            <p className="text-sm text-on-surface-variant mb-8">
              The questions buyers ask most about airbag deployment, SRS repairs,
              and recall safety.
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
              Check Airbag &amp; SRS History Now
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl mx-auto mb-8">
              Enter a 17-character VIN to surface deployment-linked crash records,
              salvage brands, and open airbag recalls before you buy.
            </p>
            <div className="max-w-xl mx-auto bg-surface-container-low rounded-2xl p-5 border border-outline-variant">
              <VinSearchForm size="lg" />
            </div>
            <div className="mt-3 flex items-center justify-center gap-2 text-xs text-on-surface-variant">
              <Check className="w-3.5 h-3.5 text-green-500" strokeWidth={3} />
              No credit card · No sign-up · Free
            </div>
          </section>

          <RelatedChecks exclude="/airbag-check" />
        </div>
      </article>
    </>
  );
}
