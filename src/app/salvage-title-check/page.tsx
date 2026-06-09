import type { Metadata } from "next";
import Link from "next/link";
import {
  Check,
  Shield,
  ShieldX,
  Search,
  FileText,
  Database,
  ChevronRight,
  Lock,
  Zap,
  BadgeCheck,
  Sparkles,
  AlertTriangle,
  Droplets,
  Flame,
  Ban,
  Wrench,
  Gauge,
  ClipboardCheck,
  DollarSign,
  Car,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";

export const metadata: Metadata = {
  title:
    "Salvage Title Check by VIN — Rebuilt & Branded Title Lookup (Free NMVTIS Check)",
  description:
    "Check for salvage, rebuilt, flood, junk, and lemon title brands by VIN — free. Cross-references NMVTIS and all 50 state DMV records to surface branded titles that title washing tries to hide, before you buy.",
  keywords: [
    "salvage title check",
    "salvage title VIN",
    "rebuilt title check",
    "branded title check",
    "flood title VIN check",
    "junk title lookup",
    "salvage title VIN lookup free",
    "check for salvage title by VIN",
    "NMVTIS salvage check",
    "title washing check",
    "is the title clean",
    "reconstructed title VIN",
  ],
  alternates: { canonical: "/salvage-title-check" },
  openGraph: {
    title:
      "Salvage Title Check by VIN — Rebuilt & Branded Title Lookup (Free)",
    description:
      "Find out if a vehicle has a salvage, rebuilt, flood, or junk title brand before you buy. Free NMVTIS-backed VIN check in seconds.",
    url: `${SITE}/salvage-title-check`,
    type: "article",
    siteName: "CarCheckerVIN",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Salvage Title Check by VIN — Rebuilt & Branded Title Lookup (Free)",
    description:
      "Free VIN-based salvage and branded-title lookup across NMVTIS and all 50 state DMV records. Defeats title washing.",
  },
  robots: { index: true, follow: true },
};

/* ── JSON-LD schemas ───────────────────────────────────────────── */

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Salvage Title Check by VIN",
  url: `${SITE}/salvage-title-check`,
  applicationCategory: "AutomotiveApplication",
  operatingSystem: "All",
  description:
    "Check a vehicle's title-brand history by its 17-character VIN. Cross-references NMVTIS, state DMV title-brand files, and insurance total-loss feeds to surface salvage, rebuilt, flood, junk, and lemon brands — even when the paper title has been washed clean.",
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
  headline: "Salvage Title Check by VIN",
  description:
    "Learn what salvage and branded titles mean, how to identify them, the real risks of buying one, and how a VIN check defeats title washing.",
  author: ORG_AUTHOR,
  publisher: {
    "@type": "Organization",
    name: "CarCheckerVIN",
    url: SITE,
    logo: { "@type": "ImageObject", url: `${SITE}/logo.png` },
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${SITE}/salvage-title-check`,
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
      name: "What is a salvage title?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A salvage title is a state-issued title brand applied when an insurance company declares a vehicle a total loss — usually because the cost to repair it exceeds a state-defined percentage of its pre-loss value, often around 70–80% (the exact threshold varies by state). The brand can result from a collision, flood, fire, theft recovery, or hail. Once applied, the salvage brand stays attached to the VIN permanently.",
      },
    },
    {
      "@type": "Question",
      name: "How do I check if a car has a salvage title by VIN?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Enter the 17-character VIN into the search box on this page. The report cross-references NMVTIS, state DMV title-brand files, and major insurance total-loss feeds to surface any salvage, rebuilt, flood, or junk brand. Because the history is tied to the VIN rather than the paper title, a VIN check reveals brands even when the current document looks clean.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between a salvage title and a rebuilt title?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A salvage title means the vehicle was declared a total loss and is not legal to drive on public roads until it is repaired. A rebuilt or reconstructed title is issued after a salvage vehicle is repaired and passes a state inspection that confirms it is roadworthy. The title never reverts to clean — a rebuilt brand permanently signals the vehicle's prior salvage history.",
      },
    },
    {
      "@type": "Question",
      name: "Can you insure or finance a salvage-title car?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It is limited. A pure salvage car generally cannot be insured for road use until it is rebuilt and re-inspected. On rebuilt titles, many carriers offer liability-only coverage and decline comprehensive or collision. Financing is also restricted — most banks and credit unions will not write a loan on a branded title, so buyers often need to pay cash or use a specialty lender.",
      },
    },
    {
      "@type": "Question",
      name: "Is it safe to buy a salvage-title car?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It can be, but the risk is higher than with a clean title. A well-documented, professionally rebuilt vehicle that passed inspection may be sound, but hidden structural damage can compromise airbag deployment and crash performance. Before buying, get an independent pre-purchase inspection, review repair documentation, and confirm the brand history with a VIN check. Expect a lower resale value and tighter insurance and financing options.",
      },
    },
    {
      "@type": "Question",
      name: "How does a car get a salvage title?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A car typically gets a salvage title when an insurer determines it is a total loss — meaning estimated repair costs exceed a state-set percentage of the vehicle's pre-loss market value, often around 70–80% though the threshold varies by state. The triggering event can be a collision, flood, fire, hail, or theft recovery. The insurer reports the total loss, and the state issues the salvage brand.",
      },
    },
    {
      "@type": "Question",
      name: "What is title washing, and does NMVTIS show salvage brands?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Title washing is moving a branded vehicle to a state with weaker title laws and re-registering it to obtain a clean-looking title. NMVTIS — the National Motor Vehicle Title Information System, run by the U.S. Department of Justice — counters this by aggregating brands reported by all 50 state DMVs, insurers, and salvage and junk reporters. Because it pulls from every state, NMVTIS surfaces salvage brands that washing tries to hide.",
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
  name: "How to Check for a Salvage or Branded Title by VIN",
  description:
    "Find out whether a used vehicle carries a salvage, rebuilt, flood, or junk title brand using its 17-character VIN before you buy.",
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
      name: "Run the VIN against NMVTIS and state records",
      text: "Enter the VIN into the search tool. It cross-references NMVTIS, all 50 state DMV title-brand files, and insurance total-loss feeds to surface any branded-title history tied to that VIN.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Read every title brand on record",
      text: "Review each brand — salvage, rebuilt, flood, junk, or lemon. Because the history follows the VIN, brands appear even if the current paper title was washed clean in another state.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Inspect and verify before you buy",
      text: "Match the VIN on the car to the title, get an independent pre-purchase inspection, and review repair documentation for any rebuilt vehicle before committing.",
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
      name: "Salvage Title Check",
      item: `${SITE}/salvage-title-check`,
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
  url: `${SITE}/salvage-title-check`,
};

/* ── Static UI data ────────────────────────────────────────────── */

const TRUST_STATS = [
  { icon: Database, value: "NMVTIS", label: "DOJ-backed data" },
  { icon: Shield, value: "50 states", label: "DMV brand files" },
  { icon: BadgeCheck, value: "Permanent", label: "VIN-tied history" },
  { icon: Zap, value: "Free", label: "no sign-up" },
];

const HOW_STEPS = [
  {
    icon: Search,
    tag: "Step 1",
    title: "Enter the VIN",
    body: "Type the 17-character VIN from the dashboard, door jamb, title, or registration. Title brands are tied to the VIN — not the paper document a seller hands you.",
  },
  {
    icon: Database,
    tag: "Step 2",
    title: "We query NMVTIS + 50 states",
    body: "The lookup cross-references NMVTIS, every state DMV title-brand file, and insurance total-loss feeds — the same records that title washing in a single state can't erase.",
  },
  {
    icon: FileText,
    tag: "Step 3",
    title: "Read every brand on record",
    body: "See any salvage, rebuilt, flood, junk, or lemon brand ever reported. A brand that appears here but not on the paper title is a major red flag.",
  },
];

const TITLE_BRANDS = [
  {
    icon: AlertTriangle,
    title: "Salvage",
    body: "Declared a total loss by an insurer — not road-legal until repaired and re-inspected. The starting point for most branded titles.",
  },
  {
    icon: Wrench,
    title: "Rebuilt / Reconstructed",
    body: "Previously salvage, now repaired and inspected for road use. The title never reverts to clean, and resale value drops significantly.",
  },
  {
    icon: Droplets,
    title: "Flood / Water damage",
    body: "Submerged or significantly water-damaged. Long-term electrical, corrosion, and mold problems are nearly guaranteed and surface for years.",
  },
  {
    icon: Ban,
    title: "Junk / Non-repairable",
    body: "Legally cannot be retitled for road use — suitable only for parts or scrap. A junk brand should never appear on a car offered for the road.",
  },
  {
    icon: ShieldX,
    title: "Lemon / Manufacturer buyback",
    body: "Repurchased by the manufacturer due to chronic, unfixable defects under state lemon laws. Covered in depth on our lemon check page.",
  },
  {
    icon: Flame,
    title: "Hail / Fire / Vandalism",
    body: "Cause-of-loss brands used in some states to flag specific damage events — useful context even when repairs were completed.",
  },
];

const RISKS = [
  {
    icon: DollarSign,
    title: "Resale value drops 20–40%",
    body: "A branded title cuts market value sharply versus an equivalent clean-title car, and the brand follows the VIN forever.",
  },
  {
    icon: Shield,
    title: "Insurance is harder to get",
    body: "Many carriers offer liability-only coverage on rebuilt titles and decline comprehensive or collision entirely.",
  },
  {
    icon: FileText,
    title: "Financing is limited",
    body: "Most banks and credit unions won't write a loan on a branded title, so buyers often need cash or a specialty lender.",
  },
  {
    icon: AlertTriangle,
    title: "Hidden structural damage",
    body: "Prior frame or unibody damage can compromise airbag deployment, crumple-zone performance, and overall crashworthiness.",
  },
];

const INSPECT_CHECKLIST = [
  "Run the VIN against NMVTIS before you meet the seller",
  "Match the VIN on the dash, door jamb, and title — all three",
  "Watch for fresh paint, mismatched panels, or weld marks",
  "Check carpets and seat mounts for rust, silt, or a musty smell",
  "Demand repair invoices and the state re-inspection certificate",
  "Get an independent pre-purchase inspection before paying",
];

const INTERNAL_LINKS = [
  {
    href: "/total-loss-check",
    label: "Total Loss Check",
    desc: "See whether an insurer ever declared the vehicle a total loss — the event that triggers a salvage brand.",
  },
  {
    href: "/flood-check",
    label: "Flood Damage Check",
    desc: "Flood is one of the most damaging — and most hidden — reasons a car ends up branded.",
  },
  {
    href: "/accident-history-check",
    label: "Accident History Check",
    desc: "Reported collisions and damage severity that may have led to a total-loss decision.",
  },
  {
    href: "/odometer-check",
    label: "Odometer Check",
    desc: "Branded and rebuilt cars are common targets for rollback — verify the mileage too.",
  },
  {
    href: "/vin-check",
    label: "Full VIN History Check",
    desc: "Title brands, accidents, odometer, theft, and recall records in one complete report.",
  },
  {
    href: "/lemon-check",
    label: "Lemon Check",
    desc: "Dig deeper into manufacturer buybacks and chronic-defect history by VIN.",
  },
];

/* ── Page ──────────────────────────────────────────────────────── */

export default function SalvageTitleCheckPage() {
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
                { label: "Salvage Title Check" },
              ]}
              onDark
            />

            <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
              <ShieldX className="w-4 h-4" /> Branded-Title Lookup
              &nbsp;·&nbsp; NMVTIS-Backed
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-headline font-extrabold leading-tight mb-4">
              Salvage Title Check by VIN —{" "}
              <span style={{ color: "var(--color-secondary-container)" }}>
                Is the Title Really Clean?
              </span>
            </h1>

            <p className="speakable-intro text-base sm:text-xl text-white/85 max-w-3xl mb-8 leading-relaxed">
              A salvage title means an insurer already declared the vehicle a
              total loss — and that status follows the VIN forever, even after
              repairs. Some sellers won&apos;t volunteer it, and title washing
              can scrub it off the paper title. Enter a 17-character VIN to check
              NMVTIS and all 50 state DMV records — free, before you buy.
            </p>

            <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-xl">
              <h2 className="text-base sm:text-lg font-headline font-extrabold text-primary mb-1">
                Run a Salvage Title Check by VIN
              </h2>
              <p className="text-xs sm:text-sm text-on-surface-variant mb-4">
                Enter any 17-character VIN — we&apos;ll surface any salvage,
                rebuilt, flood, junk, or lemon brand on record
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
              How a VIN Salvage Title Check Works
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl">
              Title brands are tracked against the VIN by NMVTIS and every state
              DMV. Three steps turn that into a clear picture of whether the
              title is truly clean.
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

          {/* ── What a salvage title means ───────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              What Does a Salvage Title Actually Mean?
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
                <p>
                  A salvage title is a state-issued title brand applied to a
                  vehicle an insurer has determined is uneconomical to repair.
                  This typically happens when repair costs exceed a percentage
                  of the car&apos;s{" "}
                  <strong className="text-on-surface">
                    pre-loss market value
                  </strong>{" "}
                  — a threshold that ranges from roughly 50% in some states to
                  100% in others.
                </p>
                <p>
                  Once applied, the brand can&apos;t be erased. Even after a full
                  rebuild and a passed inspection, the title moves from
                  &ldquo;salvage&rdquo; to &ldquo;rebuilt&rdquo; or
                  &ldquo;reconstructed&rdquo; — it never reverts to clean. The
                  VIN carries that history through every future sale, which is
                  why a VIN check is far more reliable than the paperwork a
                  seller hands you.
                </p>
                <p>
                  Salvage vehicles have legitimate uses — parts cars, track-day
                  builds, budget transportation — when the buyer fully
                  understands what they&apos;re getting. The danger is buying one
                  unknowingly, either through deception or because the car was
                  washed through a state with weaker title laws.
                </p>
              </div>
              <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Gauge className="w-5 h-5 text-primary" />
                  <h3 className="font-headline font-extrabold text-primary">
                    Worked example — total-loss math
                  </h3>
                </div>
                <ul className="space-y-3 text-sm text-on-surface">
                  <li className="flex items-center justify-between gap-3 rounded-lg bg-white px-3.5 py-2.5 border border-outline-variant/60">
                    <span className="text-on-surface-variant">
                      Pre-loss value
                    </span>
                    <code className="font-mono font-bold text-primary">
                      $20,000
                    </code>
                  </li>
                  <li className="flex items-center justify-between gap-3 rounded-lg bg-white px-3.5 py-2.5 border border-outline-variant/60">
                    <span className="text-on-surface-variant">
                      Estimated repair
                    </span>
                    <code className="font-mono font-bold text-primary">
                      $15,000
                    </code>
                  </li>
                  <li className="flex items-center justify-between gap-3 rounded-lg bg-white px-3.5 py-2.5 border border-outline-variant/60">
                    <span className="text-on-surface-variant">
                      Repair ratio
                    </span>
                    <code className="font-mono font-bold text-primary">
                      75% → totaled
                    </code>
                  </li>
                </ul>
                <p className="mt-4 text-xs text-on-surface-variant leading-relaxed">
                  At 75% the car clears a typical 70–80% total-loss threshold, so
                  the insurer brands it salvage. Thresholds vary by state — this
                  is an illustration, not a rule for any specific car.
                </p>
              </div>
            </div>
          </section>

          {/* ── The major title brands ───────────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              The Major Title Brands You Should Know
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">
              &ldquo;Branded title&rdquo; is the umbrella term for any title that
              carries a non-clean designation. Each brand tells a different
              story about what happened to the vehicle.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {TITLE_BRANDS.map((b) => {
                const Icon = b.icon;
                return (
                  <div
                    key={b.title}
                    className="rounded-2xl border border-outline-variant bg-surface p-5"
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-base font-headline font-extrabold text-primary mb-1">
                      {b.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                      {b.body}
                    </p>
                  </div>
                );
              })}
            </div>
            <div className="mt-6 rounded-2xl bg-secondary-container/40 border border-outline-variant p-5 sm:p-6">
              <div className="flex items-start gap-3">
                <ShieldX className="w-5 h-5 text-on-secondary-container flex-shrink-0 mt-0.5" />
                <p className="text-sm text-on-surface leading-relaxed">
                  <strong className="text-on-surface">
                    Looking specifically for a buyback?
                  </strong>{" "}
                  Manufacturer lemon and buyback history gets its own dedicated
                  coverage on our{" "}
                  <Link
                    href="/lemon-check"
                    className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80"
                  >
                    lemon check by VIN
                  </Link>{" "}
                  page.
                </p>
              </div>
            </div>
          </section>

          {/* ── Mid-page CTA ───────────────────────────────── */}
          <section className="py-10">
            <div className="rounded-3xl bg-primary p-7 sm:p-10 text-center">
              <Sparkles className="w-8 h-8 text-yellow-300 mx-auto mb-3" />
              <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-white mb-2">
                Is This Specific Car Branded?
              </h2>
              <p className="text-white/80 text-sm sm:text-base mb-6 max-w-xl mx-auto">
                Don&apos;t rely on the paper title — it can be washed clean. Run
                the VIN against NMVTIS and all 50 states to see every brand on
                record, free, in seconds.
              </p>
              <div className="max-w-xl mx-auto bg-white rounded-2xl p-4 sm:p-5">
                <VinSearchForm size="lg" />
              </div>
            </div>
          </section>

          {/* ── The real risks ───────────────────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              The Real Risks of Buying a Salvage or Rebuilt Vehicle
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">
              Even a well-rebuilt salvage vehicle carries financial and safety
              risks you simply don&apos;t have with a clean-title car. Weigh
              these carefully before signing anything.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {RISKS.map((r) => {
                const Icon = r.icon;
                return (
                  <div
                    key={r.title}
                    className="rounded-2xl border border-outline-variant bg-surface p-5"
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-base font-headline font-extrabold text-primary mb-1">
                      {r.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                      {r.body}
                    </p>
                  </div>
                );
              })}
            </div>
            <div className="mt-6 rounded-2xl bg-secondary-container/40 border border-outline-variant p-5 sm:p-6">
              <div className="flex items-start gap-3">
                <Droplets className="w-5 h-5 text-on-secondary-container flex-shrink-0 mt-0.5" />
                <p className="text-sm text-on-surface leading-relaxed">
                  <strong className="text-on-surface">
                    Flood damage is the worst case.
                  </strong>{" "}
                  Corroded electronics, mildew, ECU failures, and airbag-sensor
                  problems can surface years later. If a brand traces back to
                  water, run a dedicated{" "}
                  <Link
                    href="/flood-check"
                    className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80"
                  >
                    flood damage check
                  </Link>{" "}
                  before you buy.
                </p>
              </div>
            </div>
          </section>

          {/* ── Salvage vs Rebuilt vs Clean ──────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              Salvage vs. Rebuilt vs. Clean — At a Glance
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl leading-relaxed">
              These three title statuses carry very different rights, risks, and
              resale outcomes. Knowing which you&apos;re looking at is essential
              before you negotiate.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-2xl border border-primary/30 bg-primary/5 p-5 sm:p-6">
                <div className="text-[11px] font-black uppercase tracking-wider text-primary mb-2">
                  Clean
                </div>
                <p className="text-lg font-headline font-extrabold text-primary mb-3">
                  No brand on record
                </p>
                <ul className="space-y-2 text-sm text-on-surface-variant">
                  <li className="flex gap-2"><span>·</span><span>Never declared a total loss in any state.</span></li>
                  <li className="flex gap-2"><span>·</span><span>Full insurance and financing options.</span></li>
                  <li className="flex gap-2"><span>·</span><span>Still verify by VIN — washing can fake it.</span></li>
                </ul>
              </div>
              <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5 sm:p-6">
                <div className="text-[11px] font-black uppercase tracking-wider text-on-surface-variant mb-2">
                  Rebuilt
                </div>
                <p className="text-lg font-headline font-extrabold text-on-surface mb-3">
                  Repaired & inspected
                </p>
                <ul className="space-y-2 text-sm text-on-surface-variant">
                  <li className="flex gap-2"><span>·</span><span>Was salvage; repaired and passed state inspection.</span></li>
                  <li className="flex gap-2"><span>·</span><span>Often liability-only insurance, limited financing.</span></li>
                  <li className="flex gap-2"><span>·</span><span>Demand repair docs and an independent inspection.</span></li>
                </ul>
              </div>
              <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5 sm:p-6">
                <div className="text-[11px] font-black uppercase tracking-wider text-on-surface-variant mb-2">
                  Salvage
                </div>
                <p className="text-lg font-headline font-extrabold text-on-surface mb-3">
                  Total loss, unrepaired
                </p>
                <ul className="space-y-2 text-sm text-on-surface-variant">
                  <li className="flex gap-2"><span>·</span><span>Not legal to drive until rebuilt and re-inspected.</span></li>
                  <li className="flex gap-2"><span>·</span><span>Generally can&apos;t be insured for road use as-is.</span></li>
                  <li className="flex gap-2"><span>·</span><span>For parts, projects, or rebuild — eyes wide open.</span></li>
                </ul>
              </div>
            </div>
          </section>

          {/* ── Title washing & NMVTIS ───────────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">
              Title Washing — And Why a VIN Check Defeats It
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
                <p>
                  Title washing is moving a branded vehicle to a state with
                  weaker title laws and re-registering it to obtain a
                  clean-looking title. The paper may read{" "}
                  <strong className="text-on-surface">&ldquo;clean,&rdquo;</strong>{" "}
                  but the underlying VIN history still records every brand ever
                  applied, in any state.
                </p>
                <p>
                  That&apos;s exactly why a VIN-based salvage check — pulling from
                  NMVTIS and all 50 state DMV records — is so much more
                  trustworthy than the title document itself. The brand follows
                  the VIN; the paperwork can be swapped.
                </p>
                <p>
                  NMVTIS, the National Motor Vehicle Title Information System, is
                  operated by the U.S. Department of Justice. Every state DMV and
                  every insurance auto auction is required to report to it — so
                  the database catches brands that were scrubbed off the paper
                  title in another state.
                </p>
              </div>
              <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <ClipboardCheck className="w-5 h-5 text-primary" />
                  <h3 className="font-headline font-extrabold text-primary">
                    Inspect-before-you-buy checklist
                  </h3>
                </div>
                <ul className="space-y-2 text-sm text-on-surface">
                  {INSPECT_CHECKLIST.map((tip) => (
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
                    Start with the VIN — check the brand history first:
                  </p>
                  <VinSearchForm size="sm" />
                </div>
              </div>
            </div>
          </section>

          {/* ── Why it matters ───────────────────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              Why a Salvage Check Matters Before You Buy
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">
              A title brand tied to the VIN directly shapes what a used car is
              worth — and how much hidden risk you take on as the next owner.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  icon: DollarSign,
                  title: "Protect your money",
                  body: "A branded title can slash resale value 20–40%. Knowing before you negotiate keeps you from overpaying for a damaged history.",
                },
                {
                  icon: Car,
                  title: "Protect your safety",
                  body: "Hidden structural or flood damage can compromise airbags and crash performance. The brand is your first warning to inspect harder.",
                },
                {
                  icon: BadgeCheck,
                  title: "Verify, don't trust",
                  body: "Sellers may not disclose a brand, and washing can hide it. The VIN history — not the paper title — is the only reliable proof.",
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
              More VIN Checks That Pair With a Salvage Check
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-7">
              Title brands are one piece of the puzzle. These checks complete the
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
              Salvage Title Check — Frequently Asked Questions
            </h2>
            <p className="text-sm text-on-surface-variant mb-8">
              The questions buyers ask most about salvage, rebuilt, and branded
              titles.
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
              Check for a Salvage or Branded Title Now
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl mx-auto mb-8">
              Enter a 17-character VIN to instantly check NMVTIS and all 50 state
              DMV title-brand records for salvage, rebuilt, flood, junk, and
              lemon history.
            </p>
            <div className="max-w-xl mx-auto bg-surface-container-low rounded-2xl p-5 border border-outline-variant">
              <VinSearchForm size="lg" />
            </div>
            <div className="mt-3 flex items-center justify-center gap-2 text-xs text-on-surface-variant">
              <Check className="w-3.5 h-3.5 text-green-500" strokeWidth={3} />
              No credit card · No sign-up · Free
            </div>
          </section>

          <RelatedChecks exclude="/salvage-title-check" />
        </div>
      </article>
    </>
  );
}
