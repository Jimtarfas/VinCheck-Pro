import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  AlertOctagon,
  Shield,
  Search,
  FileText,
  Clock,
  Car,
  ChevronRight,
  Zap,
  BadgeCheck,
  Lock,
  Check,
  Wrench,
  ClipboardList,
  ScrollText,
  Tag,
  ArrowRight,
  CalendarClock,
  Building2,
  Factory,
  ShieldCheck,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import { ORG_AUTHOR } from "@/lib/seo/author";
import { LEMON_BRANDS, findLemonBrand, type LemonBrand } from "@/lib/lemon-brands";

const SITE = "https://www.carcheckervin.com";

export function generateStaticParams() {
  return LEMON_BRANDS.map((b) => ({ make: b.slug }));
}

/* ── Per-brand metadata ───────────────────────────────────────── */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ make: string }>;
}): Promise<Metadata> {
  const { make } = await params;
  const b = findLemonBrand(make);
  if (!b) return {};

  const title = `${b.name} Lemon Check by VIN — Free Buyback Lookup`;
  const description = `Free ${b.name} lemon check by VIN. See if a ${b.name} was a manufacturer buyback or lemon-law repurchase. Warranty ${b.basicWarranty}. NMVTIS-backed, instant, no signup.`;

  return {
    title: { absolute: title },
    description,
    keywords: [
      `${b.name} lemon check`,
      `${b.name} lemon law`,
      `is my ${b.name} a lemon`,
      `${b.name} lemon law buyback`,
      `${b.name} buyback VIN`,
      `${b.name} manufacturer buyback check`,
      `${b.name} buyback title`,
      `lemon check ${b.name} by VIN`,
      `${b.name} warranty repurchase`,
      `${b.name} lemon law claim`,
      `${b.name} used car lemon check`,
      `free ${b.name} lemon check`,
      `${b.name} reacquired vehicle`,
    ],
    alternates: { canonical: `/lemon-check/brand/${b.slug}` },
    openGraph: {
      title,
      description,
      url: `${SITE}/lemon-check/brand/${b.slug}`,
      type: "article",
      siteName: "CarCheckerVIN",
    },
    twitter: { card: "summary_large_image", title, description },
    robots: { index: true, follow: true },
  };
}

/* ── Page ─────────────────────────────────────────────────────── */

export default async function BrandLemonCheckPage({
  params,
}: {
  params: Promise<{ make: string }>;
}) {
  const { make } = await params;
  const b = findLemonBrand(make);
  if (!b) notFound();

  const pageUrl = `${SITE}/lemon-check/brand/${b.slug}`;

  /* ── JSON-LD ─────────────────────────────────────────────────── */

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${b.name} Lemon Check by VIN — Buyback Lookup`,
    description: `How to run a free ${b.name} lemon check by VIN, what ${b.name}'s warranty (${b.basicWarranty}) means for lemon-law eligibility, and how manufacturer buybacks are branded on the title.`,
    author: ORG_AUTHOR,
    publisher: {
      "@type": "Organization",
      name: "CarCheckerVIN",
      url: SITE,
      logo: { "@type": "ImageObject", url: `${SITE}/logo.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
    datePublished: "2026-06-19",
    dateModified: "2026-06-19",
    image: `${SITE}/opengraph-image`,
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: `${b.name} Lemon Check by VIN`,
    url: pageUrl,
    applicationCategory: "AutomotiveApplication",
    operatingSystem: "All",
    description: `Run a free VIN-based lemon and manufacturer-buyback check on any ${b.name}. NMVTIS-sourced title brand history in seconds.`,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE },
    brand: { "@type": "Brand", name: b.name },
  };

  const faqs: { q: string; a: string }[] = [
    {
      q: `How do I check if my ${b.name} is a lemon?`,
      a: `Enter the 17-character VIN in the search box above. We query NMVTIS and national title sources for any manufacturer buyback, lemon-law repurchase, or warranty-return brand on that specific ${b.name}. Because NMVTIS aggregates records from all 50 state DMVs, a buyback recorded in one state will still surface even if the car was later re-titled elsewhere.`,
    },
    {
      q: `What warranty does a ${b.name} come with, and why does it matter for lemon law?`,
      a: `${b.name}'s standard new-vehicle coverage is ${b.basicWarranty} bumper-to-bumper with a ${b.powertrainWarranty} powertrain warranty. This matters because most state lemon laws only apply to defects that appear during the original manufacturer warranty period — so the warranty window effectively defines the lemon-law eligibility window for a ${b.name}.`,
    },
    {
      q: `What is a ${b.name} buyback title called?`,
      a: `${b.name} buybacks carry the same title brands any manufacturer repurchase does — most commonly "Manufacturer Buyback" or "Lemon Law Buyback," with some states using "Reacquired Vehicle" or "Warranty Return." The brand is issued by the state DMV, not by ${b.parent}, so the exact wording depends on which state first repurchased the vehicle.`,
    },
    {
      q: `Does a ${b.name} buyback show up on a VIN check?`,
      a: `Yes, if the buyback was reported to NMVTIS. A "${b.name}" repurchase recorded by any state DMV becomes part of the federal title record, which our check pulls directly. ${b.angle}`,
    },
    {
      q: `How many repair attempts make a ${b.name} a lemon?`,
      a: `It depends on the state, not the brand — most states require 3 or 4 failed repair attempts for the same defect, or 30 cumulative days out of service, during the warranty period. A single failed repair can be enough for a serious safety defect such as brakes or steering. Check your state's exact threshold on our state lemon-law pages.`,
    },
    {
      q: `Is a ${b.name} more or less likely to be a lemon than other brands?`,
      a: `A buyback is a per-vehicle event, not a brand verdict. Every modern manufacturer, ${b.name} included, builds hundreds of thousands of trouble-free vehicles, and even a model with many complaints has far more clean-running units. That is exactly why a VIN-specific check is more useful than brand reputation — it tells you about the one car you are buying.`,
    },
    {
      q: `What if a ${b.name} seller never told me it was a buyback?`,
      a: `If a seller failed to disclose a known buyback brand, you may have a claim under your state's deceptive trade practices law, common-law fraud, or the federal Magnuson-Moss Warranty Act. Keep the title, the listing, and every repair record, and consult a qualified consumer-protection attorney. This page is informational, not legal advice.`,
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
    name: `How to Lemon-Check a Used ${b.name}`,
    description: `Step-by-step process to confirm whether a used ${b.name} was previously a manufacturer buyback or lemon-law repurchase.`,
    totalTime: "PT15M",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Run the VIN",
        text: `Enter the 17-character VIN to pull NMVTIS-sourced title brand history for the ${b.name}, including any buyback record.`,
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Check the brand history",
        text: `Look for a "Manufacturer Buyback," "Lemon Law Buyback," "Reacquired Vehicle," or "Warranty Return" brand on the title record.`,
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Confirm the warranty window",
        text: `${b.name} coverage runs ${b.basicWarranty} basic and ${b.powertrainWarranty} powertrain. Confirm whether the car's defect history falls inside that window.`,
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "Pull service records",
        text: `Request the full ${b.parent} warranty repair history by VIN and count repair visits for the same defect.`,
      },
      {
        "@type": "HowToStep",
        position: 5,
        name: "Get a pre-purchase inspection",
        text: `Have an independent mechanic familiar with ${b.name} vehicles inspect the car and target any systems the VIN report flagged.`,
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
        name: "By Brand",
        item: `${SITE}/lemon-check/brand`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: `${b.name} Lemon Check`,
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

  /* ── Display data ────────────────────────────────────────────── */

  const HEADLINE_STATS = [
    { value: b.basicWarranty, label: "Basic warranty window" },
    { value: b.powertrainWarranty, label: "Powertrain warranty" },
    { value: b.salesModel, label: "How it's sold in the US" },
    { value: b.parent, label: "Parent company" },
  ];

  const TRUST_STATS = [
    { icon: Factory, value: b.name, label: "buyback records" },
    { icon: Shield, value: "NMVTIS", label: "federally-sourced" },
    { icon: Clock, value: "< 5 sec", label: "average lookup time" },
    { icon: BadgeCheck, value: "Free", label: "preview, no signup" },
    { icon: Car, value: "All models", label: "cars · SUVs · trucks" },
  ];

  // Sibling brands (same parent) for tight internal linking, then fill from
  // the rest of the list so every page links sideways into the cluster.
  const siblings = LEMON_BRANDS.filter(
    (x) => x.parent === b.parent && x.slug !== b.slug,
  );
  const idx = LEMON_BRANDS.findIndex((x) => x.slug === b.slug);
  const filler = [
    LEMON_BRANDS[(idx + 1) % LEMON_BRANDS.length],
    LEMON_BRANDS[(idx + 5) % LEMON_BRANDS.length],
    LEMON_BRANDS[(idx + 11) % LEMON_BRANDS.length],
  ];
  const others: LemonBrand[] = [];
  for (const cand of [...siblings, ...filler]) {
    if (cand.slug !== b.slug && !others.some((o) => o.slug === cand.slug)) {
      others.push(cand);
    }
    if (others.length >= 4) break;
  }

  const HOW_TO_STEPS = [
    {
      n: "01",
      icon: Search,
      title: "Run the VIN",
      body: `Enter the 17-character VIN above. We pull NMVTIS, DMV title records, and national auction data in under 5 seconds for any ${b.name}.`,
    },
    {
      n: "02",
      icon: FileText,
      title: "Find the brand",
      body: `Scan the title-history section for a "Manufacturer Buyback," "Lemon Law Buyback," or equivalent repurchase brand.`,
    },
    {
      n: "03",
      icon: CalendarClock,
      title: "Check the window",
      body: `${b.name} coverage runs ${b.basicWarranty} basic. See whether the defect history falls inside that period.`,
    },
    {
      n: "04",
      icon: Wrench,
      title: "Pull service records",
      body: `Request the ${b.parent} warranty repair history by VIN and count same-defect visits.`,
    },
    {
      n: "05",
      icon: Building2,
      title: "Match the state rules",
      body: `Lemon thresholds vary by state. Open your state's lemon-law page for the exact repair-attempt count.`,
    },
    {
      n: "06",
      icon: ClipboardList,
      title: "Get a PPI",
      body: `Have an independent mechanic who knows ${b.name} inspect the car and target any flagged systems.`,
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
                { label: "By Brand", href: "/lemon-check/brand" },
                { label: b.name },
              ]}
              onDark
            />

            <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
              <AlertOctagon className="w-4 h-4" /> {b.name} Manufacturer Buyback
              Lookup
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-headline font-extrabold leading-tight mb-4">
              {b.name} Lemon Check by VIN —{" "}
              <span style={{ color: "var(--color-secondary-container)" }}>
                Catch the Buyback Before You Buy
              </span>
            </h1>

            <p className="speakable-intro text-base sm:text-xl text-white/85 max-w-3xl mb-8 leading-relaxed">
              {`Check any ${b.name} for a manufacturer buyback, lemon-law repurchase, or warranty return. ${b.name}'s standard coverage is ${b.basicWarranty} basic and ${b.powertrainWarranty} powertrain — the window that usually defines lemon-law eligibility. Free preview, no credit card, instant results from NMVTIS.`}
            </p>

            <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-xl">
              <h2 className="text-base sm:text-lg font-headline font-extrabold text-primary mb-1">
                Run a Free {b.name} Lemon Check
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
                    <div className="text-sm sm:text-base font-headline font-black text-white">
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
          aria-labelledby="brand-stats-heading"
          className="max-w-5xl mx-auto px-4 sm:px-6 -mt-8 sm:-mt-10 relative z-10"
        >
          <div className="rounded-3xl bg-surface-container shadow-md border border-outline-variant p-5 sm:p-7">
            <h2
              id="brand-stats-heading"
              className="text-xs sm:text-sm font-headline font-black uppercase tracking-widest text-primary mb-4 sm:mb-5"
            >
              {b.name} Warranty &amp; Lemon-Law Window at a Glance
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
                  <dd className="font-headline font-bold text-base sm:text-lg text-white leading-tight">
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
              What a {b.name} Lemon Check Tells You
            </h2>
            <div className="prose prose-slate max-w-none text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              <p>{b.blurb}</p>
              <p>{b.angle}</p>
              <p>
                {`A "buyback" happens when ${b.parent} repurchases a vehicle from its original owner because a defect could not be fixed within a reasonable number of attempts. The car is then resold — and its title is branded by the state DMV. `}
                A{" "}
                <Link
                  href="/lemon-check"
                  className="text-primary font-bold hover:underline"
                >
                  VIN-based lemon check
                </Link>{" "}
                pulls that brand from NMVTIS, the federal title system that
                gathers records from every state DMV, so a {b.name} buyback
                cannot quietly disappear by moving the car across state lines.
              </p>
            </div>
          </section>

          {/* Brand detail card */}
          <section className="py-12 sm:py-16 border-b border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              {b.name} Warranty &amp; Buyback Basics
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl">
              Lemon-law eligibility for a {b.name} is anchored to the original
              factory warranty. Here is what defines the window — and how a
              repurchase is recorded.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5">
                <div className="flex items-center gap-2 mb-2">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                  <h3 className="text-base font-headline font-extrabold text-primary">
                    Coverage &amp; eligibility
                  </h3>
                </div>
                <ul className="space-y-2 text-sm text-on-surface-variant">
                  <li className="flex gap-2">
                    <Check
                      className="w-4 h-4 text-primary flex-shrink-0 mt-0.5"
                      strokeWidth={3}
                    />
                    <span>Basic warranty: {b.basicWarranty}</span>
                  </li>
                  <li className="flex gap-2">
                    <Check
                      className="w-4 h-4 text-primary flex-shrink-0 mt-0.5"
                      strokeWidth={3}
                    />
                    <span>Powertrain warranty: {b.powertrainWarranty}</span>
                  </li>
                  <li className="flex gap-2">
                    <Check
                      className="w-4 h-4 text-primary flex-shrink-0 mt-0.5"
                      strokeWidth={3}
                    />
                    <span>Sales model: {b.salesModel}</span>
                  </li>
                </ul>
              </div>
              <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Tag className="w-5 h-5 text-primary" />
                  <h3 className="text-base font-headline font-extrabold text-primary">
                    How a buyback is branded
                  </h3>
                </div>
                <ul className="space-y-2 text-sm text-on-surface-variant">
                  <li className="flex gap-2">
                    <Building2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>Parent company: {b.parent}</span>
                  </li>
                  <li className="flex gap-2">
                    <Tag className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>
                      Title brands: Manufacturer Buyback · Lemon Law Buyback ·
                      Reacquired Vehicle
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <Shield className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>Recorded in NMVTIS by the state DMV</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Brand-specific tips */}
          <section className="py-12 sm:py-16 border-b border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              What to Check on a Used {b.name}
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl">
              Brand-specific pointers that make a {b.name} buyback easier to
              catch before you sign.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {b.tips.map((tip, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                    <span className="text-sm font-black text-primary">
                      {i + 1}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                    {tip}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* How to */}
          <section className="py-12 sm:py-16 border-b border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              How to Lemon-Check a {b.name} — 6 Steps
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

          {/* Brand reputation context */}
          <section className="py-12 sm:py-16 border-b border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">
              Is a {b.name} a &ldquo;Lemon Brand&rdquo;?
            </h2>
            <div className="prose prose-slate max-w-none text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              <p>
                No brand is a &ldquo;lemon brand.&rdquo; A buyback is a{" "}
                <strong className="text-on-surface">per-vehicle event</strong>,
                not a verdict on every {b.name} ever built. {b.parent} produces
                hundreds of thousands of trouble-free units, and even a model
                with a high complaint count has far more clean-running cars than
                problem ones.
              </p>
              <p>
                The most credible public data source is the{" "}
                <strong className="text-on-surface">
                  NHTSA Office of Defects Investigation
                </strong>{" "}
                complaint database, which is searchable by year, make, and
                model. High complaint clusters for the same system correlate
                with higher lemon-law eligibility — but they describe a model
                year, not the specific car in front of you. That is why a{" "}
                <Link
                  href="/lemon-check"
                  className="text-primary font-bold hover:underline"
                >
                  VIN-level lemon check
                </Link>{" "}
                always beats brand reputation: it tells you about the one{" "}
                {b.name} you are about to buy.
              </p>
            </div>
          </section>

          {/* Mid-page CTA */}
          <section className="py-10">
            <div className="rounded-3xl bg-primary p-7 sm:p-10 text-center">
              <AlertOctagon className="w-8 h-8 text-yellow-300 mx-auto mb-3" />
              <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-white mb-2">
                Don&apos;t Buy a {b.name} Buyback by Mistake
              </h2>
              <p className="text-white/80 text-sm sm:text-base mb-6 max-w-xl mx-auto">
                Free, instant {b.name} lemon check sourced from NMVTIS and every
                state DMV. No credit card. No signup.
              </p>
              <div className="max-w-xl mx-auto bg-white rounded-2xl p-4 sm:p-5">
                <VinSearchForm size="lg" />
              </div>
            </div>
          </section>

          {/* Other brands */}
          <section className="py-12 sm:py-16 border-b border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              Lemon Checks for Other Brands
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-7">
              Warranty windows and buyback patterns differ by manufacturer.
              Compare {b.name} with these brand guides, or browse every brand.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {others.map((o) => (
                <Link
                  key={o.slug}
                  href={`/lemon-check/brand/${o.slug}`}
                  className="flex items-start gap-3 rounded-xl border border-outline-variant bg-surface hover:border-primary/40 hover:bg-primary/5 transition-colors p-4 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <Factory className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-primary group-hover:underline">
                      {o.name} Lemon Check
                    </div>
                    <div className="text-xs text-on-surface-variant mt-0.5">
                      {o.basicWarranty} basic · {o.parent}
                    </div>
                  </div>
                </Link>
              ))}
              <Link
                href="/lemon-check/brand"
                className="flex items-start gap-3 rounded-xl border border-outline-variant bg-surface hover:border-primary/40 hover:bg-primary/5 transition-colors p-4 group"
              >
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <ScrollText className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-bold text-primary group-hover:underline">
                    All Brands Lemon Check
                  </div>
                  <div className="text-xs text-on-surface-variant mt-0.5">
                    Browse every manufacturer in one place.
                  </div>
                </div>
              </Link>
              <Link
                href="/lemon-check"
                className="flex items-start gap-3 rounded-xl border border-outline-variant bg-surface hover:border-primary/40 hover:bg-primary/5 transition-colors p-4 group"
              >
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <ChevronRight className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-bold text-primary group-hover:underline">
                    Lemon Law by State
                  </div>
                  <div className="text-xs text-on-surface-variant mt-0.5">
                    Repair-attempt thresholds for all 50 states.
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
              {b.name} Lemon Check FAQ
            </h2>
            <p className="text-sm text-on-surface-variant mb-8">
              The most-searched questions about {b.name} buybacks, warranty
              windows, and VIN-based lemon detection.
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
              <Zap className="w-3.5 h-3.5" /> Free · Instant · {b.name}
            </div>
            <h2 className="text-2xl sm:text-4xl font-headline font-extrabold text-primary mb-3">
              One VIN. Every {b.name} Buyback Brand. Five Seconds.
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl mx-auto mb-8">
              A manufacturer buyback record follows the VIN permanently, even
              when the paper title looks clean. Run the free {b.name} check
              before you write a check.
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
