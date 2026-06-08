import type { Metadata } from "next";
import Link from "next/link";
import {
  Check,
  Shield,
  ShieldAlert,
  Search,
  FileText,
  Database,
  Calculator,
  ChevronRight,
  Lock,
  Zap,
  BadgeCheck,
  Sparkles,
  Car,
  Droplet,
  Flame,
  CloudHail,
  KeyRound,
  DollarSign,
  Gauge,
  ClipboardCheck,
  AlertTriangle,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";

export const metadata: Metadata = {
  title:
    "Total Loss Check by VIN — Was This Car Totaled? (Free Insurance Write-Off Lookup)",
  description:
    "Check if a car was declared a total loss by insurance — free, by VIN. Surface insurance write-off records, total-loss declarations, salvage and rebuilt brands, and structural damage from NMVTIS, state DMVs, and salvage auctions before you buy.",
  keywords: [
    "total loss check VIN",
    "was this car totaled",
    "is this car a total loss",
    "insurance write-off VIN",
    "total loss vehicle check",
    "check if car was totaled by VIN",
    "rebuilt total loss",
    "totaled car history",
    "total loss vs salvage title",
    "total loss threshold by state",
    "NMVTIS total loss",
    "insurance total loss record",
    "free total loss check",
    "totaled car VIN lookup",
  ],
  alternates: { canonical: "/total-loss-check" },
  openGraph: {
    title: "Total Loss Check by VIN — Was This Car Totaled? (Free)",
    description:
      "Free VIN check for insurance total-loss declarations, salvage and rebuilt brands, and structural damage history. NMVTIS-sourced.",
    url: `${SITE}/total-loss-check`,
    type: "article",
    siteName: "CarCheckerVIN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Total Loss Check by VIN — Was This Car Totaled? (Free)",
    description:
      "Free VIN check for insurance total-loss declarations, salvage/rebuilt brands, and structural damage. NMVTIS-sourced.",
  },
  robots: { index: true, follow: true },
};

/* ── JSON-LD schemas ───────────────────────────────────────────── */

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Total Loss Check by VIN",
  url: `${SITE}/total-loss-check`,
  applicationCategory: "AutomotiveApplication",
  operatingSystem: "All",
  description:
    "Check whether a vehicle was declared a total loss by an insurer using its 17-character VIN. Surfaces insurance write-off records, salvage and rebuilt title brands, and structural damage from NMVTIS, state DMVs, insurers, and salvage auctions.",
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
  headline: "Total Loss Check by VIN — Was This Car Totaled?",
  description:
    "How to check if a vehicle was declared a total loss by insurance, what total loss means for value, safety, and title status, and how total-loss records reach a VIN report.",
  author: ORG_AUTHOR,
  publisher: {
    "@type": "Organization",
    name: "CarCheckerVIN",
    url: SITE,
    logo: { "@type": "ImageObject", url: `${SITE}/logo.png` },
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${SITE}/total-loss-check`,
  },
  datePublished: "2026-05-04",
  dateModified: "2026-06-06",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What does it mean when a car is a total loss?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A total loss means an insurer determined that repairing the vehicle would cost more than it is worth to fix. Specifically, the insurance company declares a total loss when repair costs — sometimes combined with the vehicle's salvage value — exceed its pre-accident actual cash value (ACV) or a state-defined total-loss threshold. Instead of paying for repairs, the insurer pays out the vehicle's value and usually takes ownership of the wreck.",
      },
    },
    {
      "@type": "Question",
      name: "How do I check if a car was declared a total loss by VIN?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Enter the 17-character VIN into the search tool above. The system queries NMVTIS and national title and insurance sources for total-loss declarations, salvage brands, and structural damage records. Because NMVTIS aggregates data from all 50 state DMVs and from insurers and salvage auctions, a VIN check can surface a prior total loss even if the vehicle was later rebuilt or re-titled in a different state.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between a total loss and a salvage title?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A total loss is an insurance decision; a salvage title is a legal title brand. When an insurer declares a vehicle a total loss, the state typically brands the title as salvage. However, the two do not always line up: some salvage titles come from severe damage with no insurance claim, and some states let owners keep a totaled car under an owner-retained or non-repairable brand instead of standard salvage.",
      },
    },
    {
      "@type": "Question",
      name: "What is a total-loss threshold?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A total-loss threshold is the point at which an insurer must declare a vehicle a total loss, expressed as a percentage of the vehicle's actual cash value. The exact percentage varies by state — some states set a fixed threshold while others use a total-loss formula comparing repair cost plus salvage value to the vehicle's value. Once repair estimates cross that threshold, the insurer totals the car rather than repairing it.",
      },
    },
    {
      "@type": "Question",
      name: "Can a totaled car be back on the road?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. A car declared a total loss is often sold at salvage auction, repaired, and then issued a rebuilt or reconstructed title after passing a state inspection in most states. Inspection standards vary widely by state, so rebuild quality is inconsistent. A properly rebuilt vehicle can be safe, but a poorly repaired one can be dangerous — always have a rebuilt total loss inspected by a structural repair specialist before buying.",
      },
    },
    {
      "@type": "Question",
      name: "Does a total loss always create a salvage title?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Not always. A total loss usually triggers a salvage title, but the resulting brand depends on the state and the cause of loss. Some states use flood, non-repairable, or owner-retained brands instead of standard salvage, and a few situations may not produce a salvage brand at all. Because the paper title may not capture every event, a VIN-based NMVTIS check is more reliable than reading the title alone.",
      },
    },
    {
      "@type": "Question",
      name: "Will a prior total loss affect a car's insurance and value?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. A prior total loss typically reduces resale value, often substantially, because the history follows the VIN and appears in future buyers' reports. It can also limit insurance: many carriers restrict rebuilt or salvage-branded vehicles to liability-only coverage and decline comprehensive or collision. Coverage availability and the size of the value discount vary by insurer, state, and the extent of the original damage.",
      },
    },
    {
      "@type": "Question",
      name: "Where does total-loss data come from?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Total-loss and salvage records reach NMVTIS through the 50 state DMVs, insurance carriers, and salvage auctions, with insurer total-loss reporting as a primary source. Insurers are generally required to report total losses to NMVTIS within a set timeframe, and salvage auctions like Copart and IAA report vehicles they receive. No single database is perfect, so coverage can have gaps, but a multi-source VIN check is the most thorough way to surface a prior total loss.",
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
  name: "How to Check if a Car Was Declared a Total Loss by VIN",
  description:
    "Verify whether a used vehicle was written off as a total loss by an insurer before you buy, using its 17-character VIN.",
  totalTime: "PT2M",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Find the 17-character VIN",
      text: "Read the VIN from the driver-side dashboard, the door jamb sticker, the title, or the insurance card. Confirm it is 17 characters with no letters I, O, or Q.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Run the VIN through the total loss check",
      text: "Enter the VIN into the search tool. It queries NMVTIS, state DMVs, insurers, and salvage auctions for total-loss declarations, salvage brands, and structural damage.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Read the title-brand and loss history",
      text: "Look for salvage, rebuilt, reconstructed, flood, junk, or non-repairable brands and any insurance total-loss record — these confirm the car was written off, even if the current paper title looks clean.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Inspect before you buy",
      text: "If a total loss or rebuilt brand appears, have the vehicle inspected by a structural repair specialist and confirm what was damaged and how it was repaired before paying.",
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
      name: "Total Loss Check",
      item: `${SITE}/total-loss-check`,
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
  url: `${SITE}/total-loss-check`,
};

/* ── Static UI data ────────────────────────────────────────────── */

const TRUST_STATS = [
  { icon: Database, value: "50-state", label: "NMVTIS sources" },
  { icon: Calculator, value: "60–100%", label: "total-loss threshold" },
  { icon: Shield, value: "30 days", label: "insurer reporting window" },
  { icon: BadgeCheck, value: "Free", label: "no sign-up" },
];

const HOW_STEPS = [
  {
    icon: Search,
    tag: "Step 1",
    title: "Enter the VIN",
    body: "Type the 17-character VIN from the dashboard, door jamb, title, or insurance card. The check is keyed to the VIN, so a prior total loss surfaces even after a rebuild or an out-of-state re-title.",
  },
  {
    icon: Database,
    tag: "Step 2",
    title: "We query the loss record",
    body: "The lookup pulls from NMVTIS — which aggregates all 50 state DMVs, insurers, and salvage auctions — for total-loss declarations, salvage and rebuilt brands, and structural damage events.",
  },
  {
    icon: FileText,
    tag: "Step 3",
    title: "Read the verdict",
    body: "See whether the car carries an insurance total-loss record or a branded title — and decide whether it needs a structural inspection before you put money down.",
  },
];

const CAUSES = [
  {
    icon: Car,
    title: "Collision",
    body: "Frame or unibody damage and airbag deployment make modern cars expensive to repair correctly — the most common reason a vehicle is totaled. Usually results in a salvage brand.",
  },
  {
    icon: Droplet,
    title: "Flood",
    body: "Water intrusion corrodes wiring, electronics, and safety systems for years after the event. Often branded flood or salvage; damage is frequently hidden.",
  },
  {
    icon: Flame,
    title: "Fire",
    body: "Heat compromises wiring harnesses, structural adhesives, and metallurgy well beyond the visibly burned area. Almost always totaled and salvage-branded.",
  },
  {
    icon: CloudHail,
    title: "Hail",
    body: "Severe storms can dent every panel; when bodywork costs exceed the threshold, the car is totaled even though it runs and drives fine.",
  },
  {
    icon: KeyRound,
    title: "Theft recovery",
    body: "Stripped or damaged stolen-and-recovered vehicles can be totaled by the insurer, sometimes carrying a theft-recovery or salvage brand.",
  },
  {
    icon: AlertTriangle,
    title: "Other covered loss",
    body: "Vandalism, falling objects, or mechanical destruction can all cross the total-loss threshold and trigger a write-off and title brand.",
  },
];

const REPORTING_CHAIN = [
  "Insurers are generally required to report a total loss to NMVTIS within a set timeframe — often about 30 days of the declaration.",
  "Salvage auction companies like Copart and IAA also report vehicles they receive, adding a second documentation layer.",
  "Insurance-industry databases such as ISO ClaimSearch hold claims data that supplements NMVTIS records.",
  "State motor vehicle agencies brand the title based on insurer and auction reporting, creating a permanent VIN-linked record.",
];

const REBUILT_CHECKLIST = [
  "Confirm the brand: salvage, rebuilt, reconstructed, flood, or non-repairable",
  "Get the cause of loss — collision, flood, and fire carry different risks",
  "Demand documented structural repairs, not just cosmetic bodywork",
  "Have a structural repair specialist inspect frame and safety systems",
  "Verify which airbags and sensors were replaced, not just reset",
  "Expect a 20–40% value discount and limited insurance options",
];

const INTERNAL_LINKS = [
  {
    href: "/salvage-title-check",
    label: "Salvage Title Check",
    desc: "Confirm whether the total loss produced a salvage, junk, or non-repairable brand.",
  },
  {
    href: "/vin-check",
    label: "Full VIN History Check",
    desc: "Title, total loss, accident, odometer, and recall records in one report.",
  },
  {
    href: "/accident-history-check",
    label: "Accident History Check",
    desc: "See the collision and damage events behind a total-loss declaration.",
  },
  {
    href: "/flood-damage-check",
    label: "Flood Damage Check",
    desc: "Flag flood-titled and storm-area vehicles where water damage is often hidden.",
  },
  {
    href: "/rebuilt-title-check",
    label: "Rebuilt Title Check",
    desc: "Verify whether a totaled car was rebuilt and re-titled after inspection.",
  },
  {
    href: "/vin-decoder",
    label: "VIN Decoder",
    desc: "Decode the 17-character VIN to specs, trim, and factory options.",
  },
];

/* ── Page ──────────────────────────────────────────────────────── */

export default function TotalLossCheckPage() {
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
                { label: "Total Loss Check" },
              ]}
              onDark
            />

            <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
              <ShieldAlert className="w-4 h-4" /> Insurance Write-Off Lookup
              &nbsp;·&nbsp; NMVTIS-Sourced
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-headline font-extrabold leading-tight mb-4">
              Total Loss Check by VIN —{" "}
              <span style={{ color: "var(--color-secondary-container)" }}>
                Was This Car Totaled?
              </span>
            </h1>

            <p className="speakable-intro text-base sm:text-xl text-white/85 max-w-3xl mb-8 leading-relaxed">
              A car declared a total loss was damaged badly enough that an
              insurer chose to write it off instead of repairing it. Many are
              rebuilt and resold with no obvious signs. Enter a 17-character VIN
              to surface insurance total-loss records, salvage and rebuilt
              brands, and structural damage history — free, before you buy.
            </p>

            <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-xl">
              <h2 className="text-base sm:text-lg font-headline font-extrabold text-primary mb-1">
                Check for Total Loss History by VIN
              </h2>
              <p className="text-xs sm:text-sm text-on-surface-variant mb-4">
                Enter any 17-character VIN — we&apos;ll check for total-loss
                declarations, write-off records, and branded titles
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
              How a VIN Total Loss Check Works
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl">
              A total loss is an insurance decision that follows the car&apos;s
              VIN for life. Three steps turn that record into a clear answer
              before you put money down.
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

          {/* ── What makes a car a total loss ─────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              What Makes a Car a Total Loss
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl leading-relaxed">
              Insurers declare a total loss when the cost to repair crosses a
              threshold percentage of the vehicle&apos;s pre-accident actual
              cash value (ACV). That threshold — and the formula behind it —
              varies by state.
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
                <p>
                  The total-loss threshold ranges from roughly{" "}
                  <strong className="text-on-surface">
                    60% to 100% of ACV
                  </strong>{" "}
                  depending on the jurisdiction. Some states fix a flat
                  percentage; others use a total-loss formula that compares
                  repair cost plus salvage value against the car&apos;s value.
                </p>
                <p>
                  The math often includes the anticipated diminished value after
                  repair. Vehicles with frame damage, airbag deployment, or
                  flood exposure are almost always totaled, because modern
                  unibody structural repair is costly and the liability of
                  returning a compromised car to the road is high.
                </p>
                <p>
                  The resulting title brand depends on the cause: a collision
                  total loss usually produces a salvage brand, a flood total
                  loss a flood or salvage brand, and a fire total loss a salvage
                  brand.
                </p>
              </div>
              <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Calculator className="w-5 h-5 text-primary" />
                  <h3 className="font-headline font-extrabold text-primary">
                    Worked example — 70% threshold
                  </h3>
                </div>
                <ul className="space-y-3 text-sm text-on-surface">
                  <li className="flex items-center justify-between gap-3 rounded-lg bg-white px-3.5 py-2.5 border border-outline-variant/60">
                    <span className="text-on-surface-variant">
                      Pre-accident value (ACV)
                    </span>
                    <code className="font-mono font-bold text-primary">
                      $20,000
                    </code>
                  </li>
                  <li className="flex items-center justify-between gap-3 rounded-lg bg-white px-3.5 py-2.5 border border-outline-variant/60">
                    <span className="text-on-surface-variant">
                      State threshold
                    </span>
                    <code className="font-mono font-bold text-primary">70%</code>
                  </li>
                  <li className="flex items-center justify-between gap-3 rounded-lg bg-white px-3.5 py-2.5 border border-outline-variant/60">
                    <span className="text-on-surface-variant">
                      Totaled if repairs exceed
                    </span>
                    <code className="font-mono font-bold text-primary">
                      $14,000
                    </code>
                  </li>
                </ul>
                <p className="mt-4 text-xs text-on-surface-variant leading-relaxed">
                  Cross the threshold and the insurer pays out the value and
                  takes the wreck instead of repairing it. Thresholds and
                  formulas differ by state — this is an illustration, not a
                  guarantee for any specific car.
                </p>
              </div>
            </div>
          </section>

          {/* ── Total loss vs salvage ─────────────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              Total Loss vs. Salvage Title — What&apos;s the Difference?
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl leading-relaxed">
              They&apos;re related but not identical. One is a financial
              decision; the other is a legal label. Knowing the gap between them
              is exactly why a VIN check beats reading the paper title.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5 sm:p-6">
                <div className="text-[11px] font-black uppercase tracking-wider text-on-surface-variant mb-2">
                  Total Loss
                </div>
                <p className="text-lg font-headline font-extrabold text-on-surface mb-3">
                  An insurance decision
                </p>
                <ul className="space-y-2 text-sm text-on-surface-variant">
                  <li className="flex gap-2">
                    <span>·</span>
                    <span>Made by the insurer when repairs cross the threshold.</span>
                  </li>
                  <li className="flex gap-2">
                    <span>·</span>
                    <span>The carrier pays the value and usually takes the car.</span>
                  </li>
                  <li className="flex gap-2">
                    <span>·</span>
                    <span>Recorded in NMVTIS as an insurance loss event.</span>
                  </li>
                  <li className="flex gap-2">
                    <span>·</span>
                    <span>Drives the title brand — but isn&apos;t the brand itself.</span>
                  </li>
                </ul>
              </div>
              <div className="rounded-2xl border border-primary/30 bg-primary/5 p-5 sm:p-6">
                <div className="text-[11px] font-black uppercase tracking-wider text-primary mb-2">
                  Salvage Title
                </div>
                <p className="text-lg font-headline font-extrabold text-primary mb-3">
                  A legal title brand
                </p>
                <ul className="space-y-2 text-sm text-on-surface-variant">
                  <li className="flex gap-2">
                    <span>·</span>
                    <span>Applied by the state DMV to the vehicle&apos;s title.</span>
                  </li>
                  <li className="flex gap-2">
                    <span>·</span>
                    <span>Can exist from severe damage with no insurance claim.</span>
                  </li>
                  <li className="flex gap-2">
                    <span>·</span>
                    <span>May instead read flood, non-repairable, or owner-retained.</span>
                  </li>
                  <li className="flex gap-2">
                    <span>·</span>
                    <span>Doesn&apos;t always appear — which is why VIN data matters.</span>
                  </li>
                </ul>
              </div>
            </div>
            <p className="mt-5 text-xs text-on-surface-variant">
              Run a{" "}
              <Link
                href="/salvage-title-check"
                className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80"
              >
                salvage title check
              </Link>{" "}
              alongside this total loss check for the most complete picture of
              any branded-title history.
            </p>
          </section>

          {/* ── Mid-page CTA ───────────────────────────────── */}
          <section className="py-10">
            <div className="rounded-3xl bg-primary p-7 sm:p-10 text-center">
              <Sparkles className="w-8 h-8 text-yellow-300 mx-auto mb-3" />
              <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-white mb-2">
                Was This Specific Car Totaled?
              </h2>
              <p className="text-white/80 text-sm sm:text-base mb-6 max-w-xl mx-auto">
                Don&apos;t take the seller&apos;s word for it. Run the VIN and
                see the insurance and title record straight from NMVTIS sources —
                free, in seconds.
              </p>
              <div className="max-w-xl mx-auto bg-white rounded-2xl p-4 sm:p-5">
                <VinSearchForm size="lg" />
              </div>
            </div>
          </section>

          {/* ── How total loss reaches your report ──────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              How a Total Loss Reaches Your VIN Report
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">
              Once an insurer writes a car off, the event flows through several
              reporters into the VIN&apos;s permanent record. That redundancy is
              why a write-off is hard to hide.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {REPORTING_CHAIN.map((item, i) => (
                <div
                  key={i}
                  className="flex gap-3 items-start rounded-2xl border border-outline-variant bg-surface p-5"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Check
                      className="w-4 h-4 text-primary"
                      strokeWidth={3}
                    />
                  </div>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    {item}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-2xl bg-secondary-container/40 border border-outline-variant p-5 sm:p-6">
              <div className="flex items-start gap-3">
                <Database className="w-5 h-5 text-on-secondary-container flex-shrink-0 mt-0.5" />
                <p className="text-sm text-on-surface leading-relaxed">
                  <strong className="text-on-surface">
                    No single database is perfect.
                  </strong>{" "}
                  Coverage can have gaps, but because NMVTIS pulls from all 50
                  state DMVs, insurers, and salvage auctions at once, a
                  multi-source VIN check is the most thorough way to surface a
                  prior total loss — even after a rebuild or an out-of-state
                  re-title.
                </p>
              </div>
            </div>
          </section>

          {/* ── Causes of a total loss ─────────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              What Causes a Vehicle to Be Totaled
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">
              A total loss can come from any covered event severe enough to cross
              the threshold. Each cause carries its own hidden-damage risk for a
              future buyer.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {CAUSES.map((c) => {
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

          {/* ── Rebuilt total loss ─────────────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">
              Rebuilt Total Loss Vehicles — Buy With Caution
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
                <p>
                  After a write-off and salvage title, a car can be bought at
                  auction, repaired, and re-titled as{" "}
                  <strong className="text-on-surface">
                    rebuilt or reconstructed
                  </strong>{" "}
                  once it passes a state inspection. Inspection standards vary
                  dramatically by state, so rebuild quality is wildly
                  inconsistent.
                </p>
                <p>
                  A rebuilt vehicle carries a permanently lower value — typically{" "}
                  <strong className="text-on-surface">20–40% less</strong> than a
                  comparable clean-title car — and limited insurance: many
                  carriers decline comprehensive or collision and offer
                  liability only.
                </p>
                <p>
                  Quality depends entirely on the repair. A professionally
                  rebuilt car with documented structural work can be safe; a
                  poorly rebuilt one can be genuinely dangerous. Always have a
                  rebuilt total loss inspected by a structural repair specialist
                  before you buy.
                </p>
              </div>
              <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <ClipboardCheck className="w-5 h-5 text-primary" />
                  <h3 className="font-headline font-extrabold text-primary">
                    Rebuilt total loss checklist
                  </h3>
                </div>
                <ul className="space-y-2 text-sm text-on-surface">
                  {REBUILT_CHECKLIST.map((tip) => (
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
                    Check the title brand by VIN first:
                  </p>
                  <VinSearchForm size="sm" />
                </div>
              </div>
            </div>
          </section>

          {/* ── Resale & insurance impact ──────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              Why a Total Loss Matters for Value &amp; Insurance
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">
              A total-loss record follows the VIN forever — it shapes what you
              can sell the car for and how you can insure it.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  icon: DollarSign,
                  title: "Permanent value discount",
                  body: "Every future buyer's VIN check reveals the history, so the 20–40% discount you negotiated on the way in comes back when you sell.",
                },
                {
                  icon: Shield,
                  title: "Limited insurance",
                  body: "Many carriers restrict rebuilt or salvage-branded cars to liability-only and decline comprehensive or collision coverage.",
                },
                {
                  icon: Gauge,
                  title: "The VIN tells the truth",
                  body: "Even if title washing produced a clean paper title, the NMVTIS total-loss record still appears in VIN history reports.",
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
                    <h3 className="text-base font-headline font-extrabold text-primary mb-1.5">
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
                <FileText className="w-5 h-5 text-on-secondary-container flex-shrink-0 mt-0.5" />
                <p className="text-sm text-on-surface leading-relaxed">
                  <strong className="text-on-surface">Buying used?</strong> Pair
                  this with a full{" "}
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
                  </Link>{" "}
                  to capture both the total-loss event and any additional damage
                  incidents.
                </p>
              </div>
            </div>
          </section>

          {/* ── Internal links ─────────────────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              More VIN Checks That Pair With a Total Loss Check
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-7">
              A total loss is one chapter of a car&apos;s story. These checks
              fill in the rest.
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
              Total Loss Check — Frequently Asked Questions
            </h2>
            <p className="text-sm text-on-surface-variant mb-8">
              The questions buyers ask most when checking whether a car was
              totaled.
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
              <Zap className="w-3.5 h-3.5" /> Free · Instant · NMVTIS Source
            </div>
            <h2 className="text-2xl sm:text-4xl font-headline font-extrabold text-primary mb-3">
              Was This Car Totaled? Find Out Now.
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl mx-auto mb-8">
              Enter a 17-character VIN to check for total-loss declarations,
              insurance write-off records, salvage and rebuilt brands, and
              structural damage history.
            </p>
            <div className="max-w-xl mx-auto bg-surface-container-low rounded-2xl p-5 border border-outline-variant">
              <VinSearchForm size="lg" />
            </div>
            <div className="mt-3 flex items-center justify-center gap-2 text-xs text-on-surface-variant">
              <Check className="w-3.5 h-3.5 text-green-500" strokeWidth={3} />
              No credit card · No sign-up · Free
            </div>
          </section>

          <RelatedChecks exclude="/total-loss-check" />
        </div>
      </article>
    </>
  );
}
