import type { Metadata } from "next";
import Link from "next/link";
import {
  Check,
  Shield,
  ShieldAlert,
  FileText,
  Car,
  Droplets,
  Flame,
  ChevronRight,
  Lock,
  Zap,
  BadgeCheck,
  Sparkles,
  AlertTriangle,
  ScanLine,
  Landmark,
  Building2,
  Wrench,
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
    "Total Loss Check by VIN — Was This Car Totaled? (Free Insurance Write-Off Lookup)",
  description:
    "Free total loss check by VIN. Find out if a car was declared a total loss or insurance write-off, see salvage and rebuilt-title brands, and learn each state's total-loss threshold before you buy. Sourced from NMVTIS, insurers, and salvage auctions.",
  keywords: [
    "total loss check VIN",
    "was this car totaled",
    "insurance write-off VIN",
    "total loss vehicle check",
    "totaled car check by VIN",
    "rebuilt total loss",
    "totaled car history",
    "total loss threshold by state",
    "is my car a total loss",
    "salvage total loss check",
    "insurance total loss lookup",
    "check if car was written off",
    "total loss formula",
    "free total loss VIN check",
    "totaled vehicle title check",
  ],
  alternates: { canonical: "/total-loss-check" },
  openGraph: {
    title: "Total Loss Check by VIN — Was This Car Totaled? (Free)",
    description:
      "Check if a vehicle was declared a total loss or insurance write-off by VIN. See salvage/rebuilt brands and state total-loss thresholds before you buy.",
    url: `${SITE}/total-loss-check`,
    type: "article",
    siteName: "CarCheckerVIN",
    images: [{ url: `${SITE}/total-loss-check/opengraph-image` }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Total Loss Check by VIN — Was This Car Totaled? (Free)",
    description:
      "Free VIN total loss check. Insurance write-off records, salvage/rebuilt brands, and state total-loss thresholds.",
    images: [`${SITE}/total-loss-check/opengraph-image`],
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
    "Check whether a vehicle was declared a total loss or insurance write-off by VIN. Surfaces total-loss declarations, salvage and rebuilt-title brands, and structural damage history from NMVTIS, insurers, and salvage auctions.",
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
    "Learn how to check if a vehicle was declared a total loss by insurance, how total-loss thresholds work in each state, and what a prior total loss means for value, safety, and title status.",
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
  dateModified: "2026-06-08",
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Check if a Car Was Declared a Total Loss",
  description:
    "Find out whether a used vehicle was declared a total loss or insurance write-off before you buy it.",
  totalTime: "PT1M",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Find the 17-character VIN",
      text: "Locate the VIN on the driver-side dashboard, the door-jamb sticker, the title, or the insurance card.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Run the VIN total loss check",
      text: "Enter the VIN into the free lookup. The tool queries NMVTIS, insurer reporting, and salvage-auction data for total-loss declarations and title brands.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Read the title-brand history",
      text: "Look for total-loss, salvage, junk, flood, or rebuilt/reconstructed brands. Any of these means the car was written off at some point.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Inspect before you buy",
      text: "If the car was a total loss and rebuilt, have a structural-repair specialist inspect it and budget for a lower resale value and limited insurance.",
    },
  ],
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
        text: "Enter the 17-character VIN into the search tool on this page. The system queries NMVTIS and national title and insurance sources for total-loss declarations, salvage brands, and structural damage records. Because NMVTIS aggregates data from all 50 state DMVs and from insurers and salvage auctions, a VIN check can surface a prior total loss even if the vehicle was later rebuilt or re-titled in a different state.",
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
        text: "A total-loss threshold is the point at which an insurer must declare a vehicle a total loss, expressed as a percentage of the vehicle's actual cash value. The exact percentage varies by state — some states set a fixed threshold (often 70–80%) while others use a Total Loss Formula (TLF) that compares repair cost plus salvage value to the vehicle's value. Once repair estimates cross that threshold, the insurer totals the car rather than repairing it.",
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
    {
      "@type": "Question",
      name: "Is this total loss check free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Entering a VIN to check for total-loss and salvage-brand history is free with no sign-up. For the full picture — accident records, odometer history, and recalls alongside the total-loss data — run a complete VIN history report.",
      },
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
  { icon: Shield, value: "NMVTIS", label: "title-brand source" },
  { icon: Landmark, value: "50", label: "state DMVs covered" },
  { icon: Zap, value: "Instant", label: "VIN result" },
  { icon: BadgeCheck, value: "Free", label: "no sign-up" },
];

const LOSS_CAUSES = [
  {
    icon: Car,
    title: "Collision damage",
    body: "The most common cause. Frame/unibody damage and airbag deployment push repair costs past the threshold fast — modern structural repair is expensive and liability-heavy. Usually results in a salvage brand.",
  },
  {
    icon: Droplets,
    title: "Flood & water damage",
    body: "Submersion ruins wiring, electronics, and safety systems. Insurers almost always total flooded cars, and many states apply a dedicated flood title brand on top of (or instead of) salvage.",
  },
  {
    icon: Flame,
    title: "Fire, hail & theft",
    body: "Fire damage, severe hail, and theft-recovery damage can all exceed the total-loss threshold. The resulting brand depends on the cause and the state's specific title-branding rules.",
  },
];

/* Representative state total-loss thresholds. Statutes change and several states
   use the Total Loss Formula (TLF) instead of a fixed percentage — always verify
   with the state's DMV or insurance department. Shown as an SEO/education asset. */
const STATE_THRESHOLDS: { state: string; threshold: string; type: "fixed" | "tlf" }[] = [
  { state: "Alabama", threshold: "75%", type: "fixed" },
  { state: "Arkansas", threshold: "70%", type: "fixed" },
  { state: "California", threshold: "TLF (formula)", type: "tlf" },
  { state: "Colorado", threshold: "100%", type: "fixed" },
  { state: "Florida", threshold: "80%", type: "fixed" },
  { state: "Georgia", threshold: "TLF (formula)", type: "tlf" },
  { state: "Illinois", threshold: "TLF (formula)", type: "tlf" },
  { state: "Indiana", threshold: "70%", type: "fixed" },
  { state: "Iowa", threshold: "70%", type: "fixed" },
  { state: "Kansas", threshold: "75%", type: "fixed" },
  { state: "Kentucky", threshold: "75%", type: "fixed" },
  { state: "Louisiana", threshold: "75%", type: "fixed" },
  { state: "Maryland", threshold: "75%", type: "fixed" },
  { state: "Michigan", threshold: "75%", type: "fixed" },
  { state: "Minnesota", threshold: "70%", type: "fixed" },
  { state: "Missouri", threshold: "80%", type: "fixed" },
  { state: "Nebraska", threshold: "75%", type: "fixed" },
  { state: "Nevada", threshold: "65%", type: "fixed" },
  { state: "New York", threshold: "75%", type: "fixed" },
  { state: "North Carolina", threshold: "75%", type: "fixed" },
  { state: "Ohio", threshold: "TLF (formula)", type: "tlf" },
  { state: "Oklahoma", threshold: "60%", type: "fixed" },
  { state: "Oregon", threshold: "80%", type: "fixed" },
  { state: "Tennessee", threshold: "75%", type: "fixed" },
  { state: "Texas", threshold: "100%", type: "fixed" },
  { state: "Virginia", threshold: "75%", type: "fixed" },
  { state: "Washington", threshold: "TLF (formula)", type: "tlf" },
  { state: "Wisconsin", threshold: "70%", type: "fixed" },
];

const DATA_SOURCES = [
  {
    icon: ShieldAlert,
    title: "Insurance carriers",
    body: "By law, insurers must report total-loss declarations to NMVTIS — typically within 30 days. This is the primary, most authoritative source for total-loss records.",
  },
  {
    icon: Building2,
    title: "Salvage auctions",
    body: "Copart, IAA, and other salvage pools report every vehicle they receive, adding an independent layer of documentation to the total-loss trail.",
  },
  {
    icon: Landmark,
    title: "State DMVs (all 50)",
    body: "State motor-vehicle agencies brand the title based on insurer and auction reporting, then feed those brands into NMVTIS for nationwide visibility.",
  },
  {
    icon: FileText,
    title: "Claims databases",
    body: "Industry claims databases such as ISO ClaimSearch hold claim records that supplement NMVTIS and help surface losses that didn't end in a title brand.",
  },
];

const BUYER_CHECKLIST = [
  "Run a VIN total loss check before you pay or sign anything",
  "Treat any salvage, junk, flood, or rebuilt brand as a total loss",
  "Hire a structural-repair specialist to inspect a rebuilt car",
  "Confirm airbags and safety systems were properly restored",
  "Budget for a 20–40% lower resale value going forward",
  "Verify your insurer will cover a rebuilt/salvage vehicle",
];

const INTERNAL_LINKS = [
  {
    href: "/salvage-title-check",
    label: "Salvage Title Check",
    desc: "Confirm the legal title brand that a total loss usually triggers.",
  },
  {
    href: "/vin-check",
    label: "Full VIN History Check",
    desc: "Total loss, accidents, odometer, title, and recalls in one report.",
  },
  {
    href: "/accident-history-check",
    label: "Accident History Check",
    desc: "Find the collisions and damage events behind a total-loss declaration.",
  },
  {
    href: "/flood-check",
    label: "Flood Damage Check",
    desc: "Flooded cars are almost always totaled — check for water-damage brands.",
  },
  {
    href: "/vin-decoder",
    label: "VIN Decoder",
    desc: "Decode any 17-character VIN to specs, trim, and factory options.",
  },
  {
    href: "/odometer-check",
    label: "Odometer Check",
    desc: "Spot rollback and mileage inconsistencies on a rebuilt vehicle.",
  },
];

const FAQS = faqSchema.mainEntity.map((q) => ({
  q: q.name,
  a: q.acceptedAnswer.text,
}));

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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
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
              <ScanLine className="w-4 h-4" /> Insurance Write-Off Lookup &nbsp;·&nbsp; NMVTIS Sourced
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-headline font-extrabold leading-tight mb-4">
              Total Loss Check by VIN —{" "}
              <span style={{ color: "var(--color-secondary-container)" }}>
                Was This Car Totaled?
              </span>
            </h1>

            <p className="speakable-intro text-base sm:text-xl text-white/85 max-w-3xl mb-8 leading-relaxed">
              A car declared a total loss was damaged badly enough that an insurer paid it out instead of repairing it — and many are quietly rebuilt and resold. Enter a VIN to surface insurance write-off records, salvage and rebuilt-title brands, and structural-damage history before you buy.
            </p>

            <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-xl">
              <h2 className="text-base sm:text-lg font-headline font-extrabold text-primary mb-1">
                Check for Total Loss History
              </h2>
              <p className="text-xs sm:text-sm text-on-surface-variant mb-4">
                Enter any 17-character VIN — we&apos;ll check for total-loss declarations and salvage/rebuilt brands
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
          {/* ── What makes a car a total loss ────────────────── */}
          <section className="py-12 sm:py-16">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              What Makes a Car a Total Loss
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-6 max-w-3xl leading-relaxed">
              Insurers declare a vehicle a total loss when the cost to repair it exceeds a threshold percentage of its pre-accident actual cash value (ACV). In a state using a 70% threshold, a $20,000 car is totaled once repair estimates pass $14,000. The damage that gets a car there usually falls into one of three buckets:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {LOSS_CAUSES.map((m) => {
                const Icon = m.icon;
                return (
                  <div
                    key={m.title}
                    className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5 sm:p-6"
                  >
                    <div className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5 text-white" />
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
            <p className="mt-6 text-sm sm:text-base text-on-surface-variant max-w-3xl leading-relaxed">
              The calculation includes both direct repair costs and the anticipated diminished value after repair. Vehicles with frame damage, airbag deployment, or flood submersion are almost always totaled because structural repair is costly and returning a compromised vehicle to the road carries real liability.
            </p>
          </section>

          {/* ── State total-loss threshold directory (unique asset) ── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              Total-Loss Thresholds by State
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl leading-relaxed">
              Each state decides when an insurer <em>must</em> declare a total loss. Some set a fixed percentage of the car&apos;s value; others use a{" "}
              <strong className="text-on-surface">Total Loss Formula (TLF)</strong> — repair cost plus salvage value versus actual cash value. The same wreck can be totaled in one state and repairable in another.
            </p>
            <div className="overflow-hidden rounded-2xl border border-outline-variant">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-primary text-white text-left">
                    <th className="px-4 py-3 font-headline font-extrabold">State</th>
                    <th className="px-4 py-3 font-headline font-extrabold">
                      Total-loss threshold
                    </th>
                    <th className="px-4 py-3 font-headline font-extrabold hidden sm:table-cell">
                      Method
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/60">
                  {STATE_THRESHOLDS.map((row, i) => (
                    <tr
                      key={row.state}
                      className={
                        i % 2 === 0
                          ? "bg-surface-container-lowest"
                          : "bg-surface-container-low"
                      }
                    >
                      <td className="px-4 py-2.5 text-on-surface font-medium">
                        {row.state}
                      </td>
                      <td className="px-4 py-2.5">
                        <span
                          className={
                            row.type === "tlf"
                              ? "font-mono text-xs bg-secondary-container/40 text-on-surface rounded px-2 py-1"
                              : "font-mono text-xs bg-primary/10 text-primary font-bold rounded px-2 py-1"
                          }
                        >
                          {row.threshold}
                        </span>
                      </td>
                      <td className="px-4 py-2.5 text-on-surface-variant hidden sm:table-cell">
                        {row.type === "tlf" ? "Total Loss Formula" : "Fixed percentage"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-xs text-on-surface-variant flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>
                Representative figures for general education only — total-loss statutes change and several states revise their rules. Always confirm the current threshold with your state&apos;s DMV or insurance department. States not listed commonly use the Total Loss Formula.
              </span>
            </p>
          </section>

          {/* ── Total loss vs salvage title ────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              Total Loss vs. Salvage Title
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl leading-relaxed">
              People use the terms interchangeably, but they describe two different things — and they don&apos;t always line up. That gap is exactly why reading the paper title alone isn&apos;t enough.
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
                  <li className="flex gap-2"><span>·</span><span>Made by the insurer when repair cost crosses the threshold.</span></li>
                  <li className="flex gap-2"><span>·</span><span>Reported to NMVTIS — follows the VIN nationwide.</span></li>
                  <li className="flex gap-2"><span>·</span><span>Can exist even when the paper title still looks clean.</span></li>
                  <li className="flex gap-2"><span>·</span><span>The underlying event behind most branded titles.</span></li>
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
                  <li className="flex gap-2"><span>·</span><span>Issued by the state, usually after a total loss.</span></li>
                  <li className="flex gap-2"><span>·</span><span>Can also come from severe damage with no insurance claim.</span></li>
                  <li className="flex gap-2"><span>·</span><span>May instead be flood, junk, non-repairable, or owner-retained.</span></li>
                  <li className="flex gap-2"><span>·</span><span>Becomes &ldquo;rebuilt&rdquo; once repaired and re-inspected.</span></li>
                </ul>
              </div>
            </div>
            <p className="mt-5 text-sm text-on-surface-variant max-w-3xl leading-relaxed">
              Run a{" "}
              <Link
                href="/salvage-title-check"
                className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80"
              >
                salvage title check
              </Link>{" "}
              alongside this total loss check for the most complete branded-title picture.
            </p>
          </section>

          {/* ── Mid-page CTA ───────────────────────────────── */}
          <section className="py-10">
            <div className="rounded-3xl bg-primary p-7 sm:p-10 text-center">
              <Sparkles className="w-8 h-8 text-yellow-300 mx-auto mb-3" />
              <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-white mb-2">
                Check a VIN for Total Loss Records
              </h2>
              <p className="text-white/80 text-sm sm:text-base mb-6 max-w-xl mx-auto">
                Don&apos;t rely on the seller or the paper title. Run the VIN against NMVTIS, insurer, and salvage-auction data in seconds — free.
              </p>
              <div className="max-w-xl mx-auto bg-white rounded-2xl p-4 sm:p-5">
                <VinSearchForm size="lg" />
              </div>
            </div>
          </section>

          {/* ── Rebuilt total loss + buyer checklist ───────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">
              Buying a Rebuilt Total Loss — What to Know
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
                <p>
                  After a total loss, a car is often bought at salvage auction, repaired, and re-titled as <strong className="text-on-surface">rebuilt</strong> or <strong className="text-on-surface">reconstructed</strong> once it passes a state inspection. But inspection standards vary dramatically — a rebuilt title certifies paperwork, not repair quality.
                </p>
                <p>
                  A rebuilt vehicle permanently carries a lower value — typically <strong className="text-on-surface">20–40% less</strong> than a comparable clean-title car — and that discount follows the VIN to the next buyer too. Insurance is also limited: many carriers offer liability-only and decline comprehensive or collision coverage.
                </p>
                <p>
                  A professionally rebuilt car can be safe; a poorly rebuilt one can be dangerous. Pair this check with an{" "}
                  <Link
                    href="/accident-history-check"
                    className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80"
                  >
                    accident history check
                  </Link>{" "}
                  and always have a structural specialist inspect before you buy.
                </p>
              </div>
              <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Wrench className="w-5 h-5 text-primary" />
                  <h3 className="font-headline font-extrabold text-primary">
                    Total-loss buyer checklist
                  </h3>
                </div>
                <ul className="space-y-2 text-sm text-on-surface">
                  {BUYER_CHECKLIST.map((tip) => (
                    <li key={tip} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" strokeWidth={3} />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-5 rounded-xl bg-white p-4 border border-outline-variant">
                  <p className="text-xs font-bold text-on-surface mb-2">
                    Start with the VIN:
                  </p>
                  <VinSearchForm size="sm" />
                </div>
              </div>
            </div>
          </section>

          {/* ── Where total-loss data comes from ───────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              Where Total-Loss Data Comes From
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">
              A reliable total loss check pulls from multiple independent sources, because no single database is complete. These four feed the title-brand history you see in a VIN report.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {DATA_SOURCES.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="flex gap-4 items-start rounded-2xl border border-outline-variant bg-surface p-5"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-base font-headline font-extrabold text-primary mb-1">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                        {item.body}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-6 rounded-2xl bg-secondary-container/40 border border-outline-variant p-5 sm:p-6">
              <div className="flex items-start gap-3">
                <DollarSign className="w-5 h-5 text-on-secondary-container flex-shrink-0 mt-0.5" />
                <p className="text-sm text-on-surface leading-relaxed">
                  <strong className="text-on-surface">Why it matters for resale:</strong> a total loss creates a permanent value discount that compounds at every future sale. Even a car later re-titled clean keeps a documented total-loss record in NMVTIS — the paper may look clean, but the{" "}
                  <Link
                    href="/vin-check"
                    className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80"
                  >
                    VIN history
                  </Link>{" "}
                  tells the true story.
                </p>
              </div>
            </div>
          </section>

          {/* ── Internal links ─────────────────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              More VIN Tools That Pair With a Total Loss Check
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-7">
              A total loss is one chapter of a vehicle&apos;s story. These checks fill in the rest.
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
              The questions buyers ask most about totaled and written-off vehicles.
            </p>
            <div className="space-y-3">
              {FAQS.map((f) => (
                <details
                  key={f.q}
                  className="group rounded-2xl border border-outline-variant bg-surface p-4 sm:p-5 [&_summary::-webkit-details-marker]:hidden"
                >
                  <summary className="flex items-start justify-between gap-4 cursor-pointer list-none">
                    <h3 className="text-sm sm:text-base font-headline font-extrabold text-primary pr-2 m-0">
                      {f.q}
                    </h3>
                    <span className="flex-shrink-0 mt-0.5 text-primary text-xl font-light group-open:rotate-45 transition-transform">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </section>

          {/* ── Bottom CTA ─────────────────────────────────── */}
          <section className="py-14 sm:py-20 text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-xs font-black uppercase tracking-wider mb-4">
              <Zap className="w-3.5 h-3.5" /> Free · Instant · NMVTIS Sourced
            </div>
            <h2 className="text-2xl sm:text-4xl font-headline font-extrabold text-primary mb-3">
              Was This Car Totaled? Find Out Now.
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl mx-auto mb-8">
              Enter a 17-character VIN to check for total-loss declarations, insurance write-off records, and rebuilt-title history before you buy.
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
