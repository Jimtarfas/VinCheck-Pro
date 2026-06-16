import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  AlertOctagon,
  AlertTriangle,
  Shield,
  ShieldCheck,
  Search,
  FileText,
  Clock,
  Car,
  MapPin,
  ChevronRight,
  Zap,
  BadgeCheck,
  Lock,
  Check,
  Gavel,
  DollarSign,
  Wrench,
  Eye,
  ClipboardList,
  TrendingDown,
  ScrollText,
  Tag,
  ArrowRight,
  CalendarClock,
  Building2,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import { ORG_AUTHOR } from "@/lib/seo/author";
import { states, type StateInfo } from "@/lib/states";
import { LEMON_LAWS, type LemonLaw } from "@/lib/lemon-laws";

const SITE = "https://www.carcheckervin.com";

/* ── Data join ─────────────────────────────────────────────────────
   Each page is keyed by a state slug and pulls from TWO real datasets:
   the legal reference (LEMON_LAWS: statute citation, coverage window,
   repair-attempt threshold, used-car coverage, buyback brand term) and
   the DMV reference (states: agency name, registered-vehicle count,
   title brands, a state-specific fact). Because the underlying facts
   genuinely differ per state, the copy generated below is naturally
   unique from one state to the next — not spun boilerplate. */

interface StateBundle {
  s: StateInfo;
  law: LemonLaw;
}

function getBundle(slug: string): StateBundle | null {
  const s = states.find((x) => x.slug === slug);
  if (!s) return null;
  const law = LEMON_LAWS.find((l) => l.abbr === s.abbr);
  if (!law) return null;
  return { s, law };
}

const BUNDLES: StateBundle[] = states
  .map((s) => {
    const law = LEMON_LAWS.find((l) => l.abbr === s.abbr);
    return law ? { s, law } : null;
  })
  .filter((b): b is StateBundle => b !== null);

export function generateStaticParams() {
  return BUNDLES.map((b) => ({ state: b.s.slug }));
}

/* ── Derived, per-state prose helpers ──────────────────────────────
   Each returns a sentence assembled from the state's own data so the
   output differs state by state. */

function usedCarSentence(b: StateBundle): string {
  const { s, law } = b;
  if (law.usedCarCoverage === "Yes") {
    return `${s.name} is one of the small group of states that extends statutory lemon protection beyond new cars to qualifying used-vehicle sales. That makes a VIN-based buyback check especially worthwhile here, because both new-car repurchases and used-car claims can leave a brand on the record.`;
  }
  if (law.usedCarCoverage === "Limited") {
    return `${s.name} extends limited lemon protection to some used vehicles, typically those still inside the original manufacturer warranty. Outside that narrow window, used-car buyers in ${s.name} lean on the federal Magnuson-Moss Warranty Act and any implied warranty of merchantability.`;
  }
  return `${s.name}'s lemon law applies to new vehicles only. If you are buying used in ${s.name}, the practical protection comes from the original manufacturer warranty (if it is still active), the federal Magnuson-Moss Warranty Act, and a careful VIN history check before you sign.`;
}

function disclosureSentence(b: StateBundle): string {
  const { s, law } = b;
  if (law.disclosureRequired === "Yes") {
    return `When a manufacturer repurchases a vehicle in ${s.name}, the buyback must be recorded on the title as a "${law.brandTerm}" and disclosed to the next buyer in writing. That paper trail can still break down once a car crosses state lines, which is why the NMVTIS-sourced VIN record is the more reliable source.`;
  }
  if (law.disclosureRequired === "Limited") {
    return `${s.name} has weaker buyback-disclosure rules than most states, so a "${law.brandTerm}" notation may not always follow the car forward on paper. A VIN check that pulls the federal NMVTIS record is the safer way to confirm a repurchase here.`;
  }
  return `${s.name} records repurchased vehicles under the "${law.brandTerm}" label.`;
}

function comparisonSentence(b: StateBundle): string {
  const { s, law } = b;
  const lower = law.repairAttempts.toLowerCase();
  let daysNote = "";
  if (lower.includes("15 day") || lower.includes("15 business")) {
    daysNote = `Its out-of-service window is shorter than the common 30-day standard, which makes it comparatively friendly to consumers.`;
  } else if (
    lower.includes("40 day") ||
    lower.includes("45 day") ||
    lower.includes("90 day")
  ) {
    daysNote = `Its out-of-service window is longer than the common 30-day standard, so a defect has to keep a car off the road for an extended stretch before it qualifies.`;
  } else {
    daysNote = `That tracks the 30-day out-of-service standard used across most of the country.`;
  }
  return `In ${s.name}, the manufacturer generally gets ${law.repairAttempts.toLowerCase()} to fix the same defect before the vehicle can qualify. ${daysNote}`;
}

/* ── Per-state metadata ────────────────────────────────────────── */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string }>;
}): Promise<Metadata> {
  const { state } = await params;
  const b = getBundle(state);
  if (!b) return {};
  const { s, law } = b;

  const title = `${s.name} Lemon Law Check by VIN — Free Buyback Lookup`;
  const description = `Free ${s.name} lemon check by VIN. See if a car was a manufacturer buyback under ${s.name}'s lemon law (${law.coveragePeriod}). NMVTIS-backed, instant, no signup.`;

  return {
    title: { absolute: title },
    description,
    keywords: [
      `${s.name} lemon law check`,
      `${s.name} lemon law`,
      `is this car a lemon in ${s.name}`,
      `${s.name} lemon law buyback`,
      `${s.name} manufacturer buyback VIN`,
      `${s.name} buyback title check`,
      `lemon check by VIN ${s.name}`,
      `${s.name} ${law.brandTerm} title`,
      `${s.name} used car lemon`,
      `${s.name} lemon law used car`,
      `how many repair attempts lemon ${s.name}`,
      `${s.name} lemon law statute`,
      `${s.abbr} lemon law check`,
      `free lemon check ${s.name}`,
    ],
    alternates: { canonical: `/lemon-check/${s.slug}` },
    openGraph: {
      title,
      description,
      url: `${SITE}/lemon-check/${s.slug}`,
      type: "article",
      siteName: "CarCheckerVIN",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: { index: true, follow: true },
  };
}

/* ── Page ──────────────────────────────────────────────────────── */

export default async function StateLemonCheckPage({
  params,
}: {
  params: Promise<{ state: string }>;
}) {
  const { state } = await params;
  const b = getBundle(state);
  if (!b) notFound();
  const { s, law } = b;

  const pageUrl = `${SITE}/lemon-check/${s.slug}`;

  /* ── Per-state JSON-LD ──────────────────────────────────────── */

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${s.name} Lemon Law Check by VIN — Buyback Lookup`,
    description: `How to run a free ${s.name} lemon check by VIN, what ${s.name}'s lemon law covers (${law.coveragePeriod}, ${law.repairAttempts}), and how manufacturer buybacks are branded and disclosed in ${s.name}.`,
    author: ORG_AUTHOR,
    publisher: {
      "@type": "Organization",
      name: "CarCheckerVIN",
      url: SITE,
      logo: { "@type": "ImageObject", url: `${SITE}/logo.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
    datePublished: "2026-06-16",
    dateModified: "2026-06-16",
    image: `${SITE}/opengraph-image`,
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: `${s.name} Lemon Check by VIN`,
    url: pageUrl,
    applicationCategory: "AutomotiveApplication",
    operatingSystem: "All",
    description: `Run a free VIN-based lemon and manufacturer-buyback check for vehicles titled in ${s.name}. NMVTIS-sourced title brand history in seconds.`,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE },
    areaServed: { "@type": "State", name: s.name },
  };

  const faqs: { q: string; a: string }[] = [
    {
      q: `Does ${s.name}'s lemon law cover used cars?`,
      a: usedCarSentence(b),
    },
    {
      q: `How many repair attempts make a car a lemon in ${s.name}?`,
      a: `Under ${s.name}'s lemon law, the threshold is ${law.repairAttempts.toLowerCase()} for the same persistent defect. A single failed repair can sometimes be enough when the defect is a serious safety issue such as brakes or steering. ${law.summary}`,
    },
    {
      q: `How long does ${s.name}'s lemon law protection last?`,
      a: `${s.name} covers eligible vehicles for ${law.coveragePeriod}. After that window closes you generally cannot file a new state lemon claim, though the federal Magnuson-Moss Warranty Act may still apply to defects that first appeared inside the warranty period.`,
    },
    {
      q: `What is a ${s.name} lemon buyback title called?`,
      a: `In ${s.name} a repurchased lemon is branded as a "${law.brandTerm}". ${disclosureSentence(b)}`,
    },
    {
      q: `How do I check if a used car is a lemon in ${s.name}?`,
      a: `Enter the 17-character VIN in the search box above. We query NMVTIS and national title sources for any buyback or repurchase brand, regardless of which state issued the current paper title. Because NMVTIS aggregates records from the ${s.dmvName} and every other state DMV, a car that was branded in ${s.name} and then re-titled elsewhere will still surface its history.`,
    },
    {
      q: `Are lemon buybacks required to be disclosed in ${s.name}?`,
      a: disclosureSentence(b),
    },
    {
      q: `What if the seller in ${s.name} never told me the car was a buyback?`,
      a: `If a ${s.name} seller failed to disclose a known buyback brand, you may have a claim under the state's deceptive trade practices law, common-law fraud, or the federal Magnuson-Moss Warranty Act. Keep the title, the listing, and every repair record, and consult a qualified consumer-protection attorney. This page is informational, not legal advice.`,
    },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How to Lemon-Check a Used Car in ${s.name}`,
    description: `Step-by-step process to confirm whether a vehicle titled in ${s.name} was previously a manufacturer buyback or lemon-law repurchase.`,
    totalTime: "PT15M",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Run the VIN",
        text: `Enter the 17-character VIN to pull NMVTIS-sourced title brand history for the ${s.name} vehicle, including any "${law.brandTerm}" record.`,
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Check the brand history",
        text: `Look for a "${law.brandTerm}" notation or any equivalent buyback, repurchase, or warranty-return brand on the title record.`,
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Confirm the warranty window",
        text: `${s.name} protection runs ${law.coveragePeriod}. Confirm whether the car's defect history falls inside that window.`,
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "Pull service records",
        text: `Request the full service history and count repair visits for the same defect. ${s.name}'s threshold is ${law.repairAttempts.toLowerCase()}.`,
      },
      {
        "@type": "HowToStep",
        position: 5,
        name: "Verify with the DMV",
        text: `Cross-check the title status with the ${s.dmvName} and get an independent pre-purchase inspection before you buy.`,
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
        name: "Lemon Check",
        item: `${SITE}/lemon-check`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `${s.name} Lemon Law`,
        item: pageUrl,
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
    url: pageUrl,
  };

  /* ── Per-state display data ─────────────────────────────────── */

  const HEADLINE_STATS = [
    { value: law.coveragePeriod, label: `${s.name} coverage window` },
    { value: law.repairAttempts, label: "Repair-attempt threshold" },
    {
      value: law.usedCarCoverage,
      label: "Used-car lemon protection",
    },
    { value: law.brandTerm, label: "Buyback title brand used" },
  ];

  const TRUST_STATS = [
    { icon: MapPin, value: s.abbr, label: `${s.name} title records` },
    { icon: Shield, value: "NMVTIS", label: "federally-sourced" },
    { icon: Clock, value: "< 5 sec", label: "average lookup time" },
    { icon: BadgeCheck, value: "Free", label: "preview, no signup" },
    { icon: Car, value: s.vehiclesRegistered, label: "vehicles registered" },
  ];

  // Nearby / suggested other state pages for internal linking — three
  // other states drawn deterministically from the list so every page
  // links sideways into the cluster without a giant 50-link block.
  const idx = BUNDLES.findIndex((x) => x.s.slug === s.slug);
  const others = [
    BUNDLES[(idx + 1) % BUNDLES.length],
    BUNDLES[(idx + 7) % BUNDLES.length],
    BUNDLES[(idx + 19) % BUNDLES.length],
  ].filter((o) => o.s.slug !== s.slug);

  const RED_FLAGS = [
    `A "${law.brandTerm}" notation that the seller skips over or cannot explain`,
    `Repeated ${s.name} service tickets for the same defect inside the ${law.coveragePeriod} window`,
    "A short first-ownership period with the manufacturer's finance arm taking the car back",
    `The car re-titled out of ${s.name} within a few months of its first registration`,
    "Dealer-only auction history immediately after the original retail sale",
    "An asking price well below comparable clean-title cars in the same trim",
    "Listing photos that avoid the driver-side door jamb and title close-ups",
    "A third-party warranty offered in place of manufacturer certified coverage",
  ];

  const HOW_TO_STEPS = [
    {
      n: "01",
      icon: Search,
      title: "Run the VIN",
      body: `Enter the 17-character VIN above. We pull NMVTIS, DMV title records, and national auction data in under 5 seconds for any ${s.name} vehicle.`,
    },
    {
      n: "02",
      icon: FileText,
      title: "Find the brand",
      body: `Scan the title-history section for a "${law.brandTerm}" record or any equivalent buyback or repurchase brand.`,
    },
    {
      n: "03",
      icon: CalendarClock,
      title: "Check the window",
      body: `${s.name} protection runs ${law.coveragePeriod}. See whether the defect history falls inside that period.`,
    },
    {
      n: "04",
      icon: Wrench,
      title: "Pull service records",
      body: `Count repair visits for the same defect. ${s.name}'s threshold is ${law.repairAttempts.toLowerCase()}.`,
    },
    {
      n: "05",
      icon: Building2,
      title: "Verify with the DMV",
      body: `Confirm the title status with the ${s.dmvName} before money changes hands.`,
    },
    {
      n: "06",
      icon: ClipboardList,
      title: "Get a PPI",
      body: "Have an independent mechanic inspect the car and target any systems the VIN report flagged.",
    },
  ];

  const COST_OF_LEMON = [
    {
      icon: TrendingDown,
      title: "Resale value drops 15-40%",
      body: `A "${law.brandTerm}" brand is a permanent valuation discount. Most ${s.name} retail buyers walk away once the brand is disclosed, and valuation guides apply a fixed deduction.`,
    },
    {
      icon: Shield,
      title: "Insurance limits",
      body: "Many carriers restrict branded-title cars to liability-only coverage and decline comprehensive or collision, the same way they treat salvage titles.",
    },
    {
      icon: DollarSign,
      title: "Financing limits",
      body: `Prime lenders usually decline branded titles. Subprime financing exists in ${s.name} but at higher APRs and lower loan-to-value ratios.`,
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
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
        {/* ── Hero ──────────────────────────────────────────────── */}
        <div className="bg-primary text-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-14 sm:pt-28 sm:pb-20">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Lemon Check", href: "/lemon-check" },
                { label: s.name },
              ]}
              onDark
            />

            <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
              <AlertOctagon className="w-4 h-4" /> {s.name} Lemon Law Buyback Lookup
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-headline font-extrabold leading-tight mb-4">
              {s.name} Lemon Check by VIN —{" "}
              <span style={{ color: "var(--color-secondary-container)" }}>
                Catch the Buyback Before You Buy
              </span>
            </h1>

            <p className="speakable-intro text-base sm:text-xl text-white/85 max-w-3xl mb-8 leading-relaxed">
              {`Check any vehicle titled in ${s.name} for a "${law.brandTerm}" brand, lemon-law repurchase, or warranty return. ${s.name}'s lemon law covers eligible cars for ${law.coveragePeriod}. Free preview, no credit card, instant results sourced from NMVTIS and the ${s.dmvName}.`}
            </p>

            <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-xl">
              <h2 className="text-base sm:text-lg font-headline font-extrabold text-primary mb-1">
                Run a Free {s.name} Lemon Check
              </h2>
              <p className="text-xs sm:text-sm text-on-surface-variant mb-4">
                Enter any 17-character VIN — cars, trucks, SUVs, leased vehicles
              </p>
              <VinSearchForm size="lg" />
              <p className="mt-3 text-[11px] text-slate-400 flex items-center gap-1.5">
                <Lock className="w-3 h-3" /> 256-bit encrypted · DPPA compliant ·
                NMVTIS-sourced title data
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-8">
              {TRUST_STATS.map((st) => {
                const Icon = st.icon;
                return (
                  <div
                    key={st.label}
                    className="bg-white/10 border border-white/15 rounded-xl px-3 py-3 text-center"
                  >
                    <Icon className="w-5 h-5 mx-auto mb-1 text-white/70" />
                    <div className="text-base sm:text-lg font-headline font-black text-white">
                      {st.value}
                    </div>
                    <div className="text-[10px] sm:text-[11px] text-white/65 leading-tight mt-0.5">
                      {st.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── At-a-glance stats ─────────────────────────────────── */}
        <section
          aria-labelledby="state-stats-heading"
          className="max-w-5xl mx-auto px-4 sm:px-6 -mt-8 sm:-mt-10 relative z-10"
        >
          <div className="rounded-3xl bg-surface-container shadow-md border border-outline-variant p-5 sm:p-7">
            <h2
              id="state-stats-heading"
              className="text-xs sm:text-sm font-headline font-black uppercase tracking-widest text-primary mb-4 sm:mb-5"
            >
              {s.name} Lemon Law at a Glance
            </h2>
            <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {HEADLINE_STATS.map((st) => (
                <div
                  key={st.label}
                  className="rounded-2xl bg-primary px-4 py-4 sm:py-5"
                >
                  <dt className="text-[11px] sm:text-xs text-white/75 leading-snug mb-1.5">
                    {st.label}
                  </dt>
                  <dd className="font-headline font-bold text-lg sm:text-xl text-white leading-tight">
                    {st.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ── Main content ──────────────────────────────────────── */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          {/* Intro */}
          <section className="py-12 sm:py-16 border-b border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">
              How {s.name}&apos;s Lemon Law Works
            </h2>
            <div className="prose prose-slate max-w-none text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              <p>{law.summary}</p>
              <p>{comparisonSentence(b)}</p>
              <p>{usedCarSentence(b)}</p>
              <p>
                {`When a ${s.name} vehicle qualifies, the manufacturer must repurchase or replace it, and the title is branded as a "${law.brandTerm}". `}
                A{" "}
                <Link
                  href="/lemon-check"
                  className="text-primary font-bold hover:underline"
                >
                  VIN-based lemon check
                </Link>{" "}
                {`pulls that brand from NMVTIS, the federal title system that gathers records from the ${s.dmvName} and every other state DMV, so a buyback cannot quietly disappear by moving the car across state lines.`}
              </p>
            </div>
          </section>

          {/* State detail card */}
          <section className="py-12 sm:py-16 border-b border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              {s.name} Buyback &amp; Disclosure Rules
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl">
              {disclosureSentence(b)}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Gavel className="w-5 h-5 text-primary" />
                  <h3 className="text-base font-headline font-extrabold text-primary">
                    Coverage &amp; eligibility
                  </h3>
                </div>
                <ul className="space-y-2 text-sm text-on-surface-variant">
                  <li className="flex gap-2">
                    <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" strokeWidth={3} />
                    <span>Coverage window: {law.coveragePeriod}</span>
                  </li>
                  <li className="flex gap-2">
                    <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" strokeWidth={3} />
                    <span>Repair threshold: {law.repairAttempts}</span>
                  </li>
                  <li className="flex gap-2">
                    <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" strokeWidth={3} />
                    <span>Used-car protection: {law.usedCarCoverage}</span>
                  </li>
                </ul>
              </div>
              <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Building2 className="w-5 h-5 text-primary" />
                  <h3 className="text-base font-headline font-extrabold text-primary">
                    {s.name} title office
                  </h3>
                </div>
                <ul className="space-y-2 text-sm text-on-surface-variant">
                  <li className="flex gap-2">
                    <Tag className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>Buyback brand term: {law.brandTerm}</span>
                  </li>
                  <li className="flex gap-2">
                    <Building2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>{s.dmvName}</span>
                  </li>
                  <li className="flex gap-2">
                    <Car className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>{s.vehiclesRegistered} vehicles registered</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-4 rounded-2xl bg-secondary-container/40 border border-secondary-container p-5">
              <p className="text-sm text-on-surface-variant leading-relaxed">
                <strong className="text-on-surface">{s.name} fact: </strong>
                {s.specialFact}
              </p>
            </div>
          </section>

          {/* Red flags */}
          <section className="py-12 sm:py-16 border-b border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              Red Flags a {s.name} Used Car Might Be a Hidden Lemon
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl">
              No single flag is proof, but two or three together should prompt a
              full VIN lemon check and a pre-purchase inspection.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {RED_FLAGS.map((flag, i) => (
                <div
                  key={i}
                  className="flex gap-3 items-start rounded-xl border border-outline-variant bg-surface-container-lowest p-4"
                >
                  <div className="w-6 h-6 rounded-full bg-error-container flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[11px] font-black text-on-error-container">
                      {i + 1}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                    {flag}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Cost of a lemon */}
          <section className="py-12 sm:py-16 border-b border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              What a {s.name} Lemon Title Costs You
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl">
              Even after the defect is repaired, the brand follows the VIN for
              life and carries real financial weight.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {COST_OF_LEMON.map((c) => {
                const Icon = c.icon;
                return (
                  <div
                    key={c.title}
                    className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5"
                  >
                    <div className="w-10 h-10 rounded-xl bg-error-container flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5 text-on-error-container" />
                    </div>
                    <h3 className="text-base font-headline font-extrabold text-primary mb-1.5">
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

          {/* How to */}
          <section className="py-12 sm:py-16 border-b border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              How to Lemon-Check a Car in {s.name} — 6 Steps
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl">
              A full pre-purchase lemon screen takes about 15 minutes between
              your desk and the dealership.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {HOW_TO_STEPS.map((st) => {
                const Icon = st.icon;
                return (
                  <div
                    key={st.n}
                    className="rounded-2xl border border-outline-variant bg-surface p-5"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-headline font-black text-primary">
                        {st.n}
                      </span>
                    </div>
                    <h3 className="text-base font-headline font-extrabold text-primary mb-1.5">
                      {st.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                      {st.body}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Federal backstop */}
          <section className="py-12 sm:py-16 border-b border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">
              When {s.name} Lemon Law Runs Out: Federal Backstop
            </h2>
            <div className="rounded-2xl bg-secondary-container/40 border border-secondary-container p-5 sm:p-7">
              <div className="flex items-start gap-3 mb-3">
                <Gavel className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <h3 className="text-base sm:text-lg font-headline font-extrabold text-primary">
                  The Magnuson-Moss Warranty Act
                </h3>
              </div>
              <p className="text-sm text-on-surface-variant leading-relaxed mb-3">
                {`${s.name}'s lemon law is limited to the ${law.coveragePeriod} window. When that closes, or when you buy from a private party, the federal Magnuson-Moss Warranty Act (15 U.S.C. § 2301) can still help in three ways:`}
              </p>
              <ul className="space-y-2 mb-3">
                {[
                  "It creates a private cause of action for breach of any written or implied warranty, including powertrain and certified pre-owned warranties.",
                  "It allows recovery of reasonable attorneys' fees, which makes consumer claims economically viable.",
                  `It applies in ${s.name} and all 50 states, filling gaps where the state lemon window has expired.`,
                ].map((point, i) => (
                  <li
                    key={i}
                    className="flex gap-2 items-start text-sm text-on-surface-variant"
                  >
                    <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" strokeWidth={3} />
                    {point}
                  </li>
                ))}
              </ul>
              <p className="text-xs text-on-surface-variant italic">
                This summary is informational, not legal advice. Consult a
                qualified consumer-protection attorney about your situation.
              </p>
            </div>
          </section>

          {/* Mid-page CTA */}
          <section className="py-10">
            <div className="rounded-3xl bg-primary p-7 sm:p-10 text-center">
              <AlertOctagon className="w-8 h-8 text-yellow-300 mx-auto mb-3" />
              <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-white mb-2">
                Don&apos;t Buy a {s.name} Lemon by Mistake
              </h2>
              <p className="text-white/80 text-sm sm:text-base mb-6 max-w-xl mx-auto">
                {`Free, instant lemon check sourced from NMVTIS and the ${s.dmvName}. No credit card. No signup.`}
              </p>
              <div className="max-w-xl mx-auto bg-white rounded-2xl p-4 sm:p-5">
                <VinSearchForm size="lg" />
              </div>
            </div>
          </section>

          {/* Other states */}
          <section className="py-12 sm:py-16 border-b border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              Lemon Law Checks in Other States
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-7">
              Lemon laws vary widely from one state to the next. Compare {s.name}{" "}
              with these other state guides, or see the full 50-state table.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {others.map((o) => (
                <Link
                  key={o.s.slug}
                  href={`/lemon-check/${o.s.slug}`}
                  className="flex items-start gap-3 rounded-xl border border-outline-variant bg-surface hover:border-primary/40 hover:bg-primary/5 transition-colors p-4 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <ChevronRight className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-primary group-hover:underline">
                      {o.s.name} Lemon Law Check
                    </div>
                    <div className="text-xs text-on-surface-variant mt-0.5">
                      {o.law.coveragePeriod} · {o.law.repairAttempts}
                    </div>
                  </div>
                </Link>
              ))}
              <Link
                href="/lemon-check"
                className="flex items-start gap-3 rounded-xl border border-outline-variant bg-surface hover:border-primary/40 hover:bg-primary/5 transition-colors p-4 group"
              >
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <ScrollText className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-bold text-primary group-hover:underline">
                    All 50 States Lemon Law Table
                  </div>
                  <div className="text-xs text-on-surface-variant mt-0.5">
                    Search, sort, and compare every state in one place.
                  </div>
                </div>
              </Link>
            </div>
          </section>

          {/* VIN Check banner */}
          <section className="py-10">
            <VinCheckBanner />
          </section>

          {/* FAQ */}
          <section className="py-12 sm:py-16 border-b border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              {s.name} Lemon Check FAQ
            </h2>
            <p className="text-sm text-on-surface-variant mb-8">
              The most-searched questions about {s.name}&apos;s lemon law,
              buyback titles, and VIN-based lemon detection.
            </p>
            <div className="space-y-3">
              {faqs.map((f) => (
                <details
                  key={f.q}
                  className="group rounded-2xl border border-outline-variant bg-surface p-4 sm:p-5 [&_summary::-webkit-details-marker]:hidden"
                >
                  <summary className="flex items-start justify-between gap-4 cursor-pointer list-none">
                    <span className="text-sm sm:text-base font-headline font-extrabold text-primary pr-2">
                      {f.q}
                    </span>
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

          {/* Bottom CTA */}
          <section className="py-14 sm:py-20 text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-xs font-black uppercase tracking-wider mb-4">
              <Zap className="w-3.5 h-3.5" /> Free · Instant · {s.name}
            </div>
            <h2 className="text-2xl sm:text-4xl font-headline font-extrabold text-primary mb-3">
              One VIN. Every {s.name} Lemon Brand. Five Seconds.
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl mx-auto mb-8">
              {`A "${law.brandTerm}" record follows the VIN permanently, even when the paper title looks clean. Run the free check before you write a check.`}
            </p>
            <div className="max-w-xl mx-auto bg-surface-container-low rounded-2xl p-5 border border-outline-variant">
              <VinSearchForm size="lg" />
            </div>
            <Link
              href="/vin-check"
              className="inline-flex items-center gap-2 mt-6 text-sm font-bold text-primary hover:underline"
            >
              Or get the full VIN history report
              <ArrowRight className="w-4 h-4" />
            </Link>
          </section>

          <RelatedChecks exclude="/lemon-check" />
        </div>
      </article>
    </>
  );
}
