import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  FileText,
  MapPin,
  Shield,
  AlertTriangle,
  CheckCircle,
  Calculator,
  Check,
  ArrowRight,
  Car,
  Search,
  ClipboardCheck,
  ChevronRight,
  Lock,
  Zap,
  BadgeCheck,
  Sparkles,
  Gavel,
} from "lucide-react";
import VinSearchForm from "@/components/VinSearchForm";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import { states, getStateBySlug } from "@/lib/states";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";

interface Props {
  params: Promise<{ state: string }>;
}

export async function generateStaticParams() {
  return states.map((s) => ({ state: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { state: slug } = await params;
  const state = getStateBySlug(slug);
  if (!state) return { title: "Buying a Used Car — State Guides" };

  const title = `Buying a Used Car in ${state.name} — Complete 2026 Guide`;
  const description = `Step-by-step guide to buying a used car in ${state.name}. ${state.dmvName} title transfer, sales tax, ${state.name} lemon law, and inspection requirements explained.`;

  return {
    title,
    description,
    keywords: [
      `buying used car ${state.name}`,
      `${state.name} dmv used car`,
      `${state.name} title transfer`,
      `${state.name} sales tax used car`,
      `used car inspection ${state.name}`,
      `${state.name} lemon law`,
      `${state.name} vin check`,
      `how to buy used car in ${state.name}`,
      `${state.name} ${state.abbr} used car guide`,
    ],
    alternates: { canonical: `/guides/buying-used-car-in/${state.slug}` },
    openGraph: {
      title: `Buying a Used Car in ${state.name} — Complete 2026 Guide`,
      description,
      type: "article",
      url: `${SITE}/guides/buying-used-car-in/${state.slug}`,
    },
    robots: { index: true, follow: true },
  };
}

// Common title-brand explanations used to expand the per-state titleBrands list.
const titleBrandLookup: Record<string, string> = {
  Salvage: "Insurer declared the vehicle a total loss. Repairable, but value and insurability are reduced.",
  "Rebuilt": "Previously salvage; rebuilt and inspected back to roadworthy condition. Resale value remains lower.",
  "Rebuilt Salvage": "Same as Rebuilt — a salvage vehicle restored and re-titled after passing a state inspection.",
  "Restored Salvage": "A salvage vehicle restored to operating condition and re-issued a title.",
  "Revived Salvage": "California-style brand for a salvage vehicle that has been re-titled after rebuild and inspection.",
  Flood: "Vehicle was submerged in water. Hidden electrical, transmission, and corrosion problems are common.",
  "Flood Damage": "Texas-style brand identifying flood-affected vehicles, often from hurricane events.",
  Hurricane: "Specific to flood damage from a named hurricane event — high risk of long-term issues.",
  "Hail Damage": "Vehicle suffered hail strikes severe enough to be reported on the title. Cosmetic and sometimes structural.",
  Junk: "Vehicle is not legally roadworthy and may only be sold for parts or scrap.",
  "Junked": "Vehicle has been declared unfit for the road and intended for scrap or parts only.",
  "Junking Certificate": "Indicates the vehicle is not legal to title for road use.",
  "Non-Repairable": "Permanent designation — vehicle cannot be re-titled for road use under any circumstances.",
  "Non-Rebuildable": "Vehicle is too damaged to ever return to the road; sold for parts only.",
  "Unrebuildable": "Georgia-style permanent designation that the vehicle cannot be re-titled for road use.",
  Reconstructed: "Built from parts of multiple vehicles or substantially rebuilt after major damage.",
  "Lemon Law Buyback": "Manufacturer repurchased the vehicle under a state lemon law due to unresolved defects.",
  "Distressed": "Significant damage outside of a typical collision (often interior, mechanical, or environmental).",
  "Disclosed Damage": "Vehicle has documented damage that doesn't meet the salvage threshold but should be disclosed.",
  "Owner Retained": "Insurer declared a total loss but the original owner kept the vehicle.",
  "Salvage Parts Only": "Vehicle may only be dismantled and sold for parts.",
  "Parts Only": "Vehicle may only be dismantled and sold for parts.",
  "Prior Salvage": "Title shows the vehicle was previously salvage even after rebuild.",
  "Previous Salvage": "Indicates the vehicle had a salvage title at some point in its history.",
  "Total Loss": "Insurer declared the vehicle a total loss after damage exceeded its value threshold.",
  "Totaled": "Insurer-declared total loss — Oregon-style brand recorded directly on the title.",
  "Certificate of Destruction": "Vehicle is permanently retired and cannot be re-titled for road use.",
  "Destroyed": "Washington-style brand: vehicle cannot be returned to roadworthy condition.",
  "Non-Highway": "Kansas-style brand — vehicle is not legal for use on public roads.",
  "Scrap": "Vehicle is intended for dismantling and scrap metal recycling only.",
};

function brandDescription(brand: string, stateName: string): string {
  return (
    titleBrandLookup[brand] ||
    `Vehicles branded "${brand}" by ${stateName} have been flagged for significant history. Always verify with a VIN check before buying.`
  );
}

// Pick 8 nearby/popular states for the cross-link grid.
function pickOtherStates(currentSlug: string) {
  const popular = [
    "california",
    "texas",
    "florida",
    "new-york",
    "illinois",
    "pennsylvania",
    "ohio",
    "georgia",
    "north-carolina",
    "michigan",
  ];
  const list = states
    .filter((s) => s.slug !== currentSlug && popular.includes(s.slug))
    .slice(0, 8);
  if (list.length < 8) {
    for (const s of states) {
      if (list.length >= 8) break;
      if (s.slug === currentSlug) continue;
      if (!list.find((x) => x.slug === s.slug)) list.push(s);
    }
  }
  return list;
}

// Light region heuristic to add a state-relevant flavor line.
function regionalRiskLine(state: { name: string; abbr: string }): string {
  const coastalFlood = new Set(["FL", "LA", "MS", "AL", "TX", "NC", "SC", "GA", "VA", "NJ", "NY"]);
  const rustBelt = new Set(["MI", "OH", "PA", "NY", "WI", "IL", "IN", "MN", "MA", "CT", "RI", "NH", "VT", "ME", "WV"]);
  const hailHeavy = new Set(["CO", "TX", "NE", "KS", "OK", "WY", "SD", "ND", "MO"]);
  if (coastalFlood.has(state.abbr)) {
    return `Buyers in ${state.name} should be especially alert for flood and hurricane damage that can be hidden under fresh detailing or a clean-looking interior.`;
  }
  if (rustBelt.has(state.abbr)) {
    return `Buyers in ${state.name} should pay close attention to undercarriage rust and frame corrosion caused by salt-treated winter roads.`;
  }
  if (hailHeavy.has(state.abbr)) {
    return `Buyers in ${state.name} should watch for hail-damaged vehicles relocated from neighboring states with severe storm seasons.`;
  }
  return `Buyers in ${state.name} should always verify a vehicle's full out-of-state history, since title brands and damage records don't always follow a car when it crosses state lines.`;
}

// Generic, state-agnostic trust stats shown in the hero.
const TRUST_STATS = [
  { icon: FileText, value: "NMVTIS", label: "title-brand data" },
  { icon: Shield, value: "Title brands", label: "surfaced by VIN" },
  { icon: BadgeCheck, value: "DMV-ready", label: "transfer steps" },
  { icon: Zap, value: "Free", label: "no sign-up" },
];

export default async function GuidePage({ params }: Props) {
  const { state: slug } = await params;
  const state = getStateBySlug(slug);
  if (!state) notFound();

  const otherStates = pickOtherStates(state.slug);
  const regionalLine = regionalRiskLine(state);
  const pageUrl = `${SITE}/guides/buying-used-car-in/${state.slug}`;

  // Three-step "how to buy" cards, state-aware, mirroring the HowTo schema.
  const howSteps = [
    {
      icon: Search,
      tag: "Step 1",
      title: "Run the VIN first",
      body: `Before any deposit, enter the 17-character VIN to surface ${state.name} title brands, accidents, salvage or flood damage, odometer issues, and open recalls — including out-of-state records the seller or local DMV may not show.`,
    },
    {
      icon: ClipboardCheck,
      tag: "Step 2",
      title: "Inspect and negotiate",
      body: `Inspect the car in daylight, get an independent ${state.name} mechanic to do a pre-purchase inspection, then negotiate using KBB and Edmunds private-party values against the condition and history report.`,
    },
    {
      icon: FileText,
      tag: "Step 3",
      title: "Title and register",
      body: `Sign the title, complete a bill of sale, and submit it with your ID, proof of insurance, and sales tax to the ${state.dmvName} to complete the title transfer and registration.`,
    },
  ];

  // More VIN checks that pair with this guide.
  const internalLinks = [
    {
      href: "/vin-check",
      label: "Full VIN History Check",
      desc: `Title, accident, odometer, salvage, and recall records for any ${state.name} vehicle in one report.`,
    },
    {
      href: `/vin-check/state/${state.slug}`,
      label: `${state.name} VIN Check`,
      desc: `State-specific VIN lookup tuned to ${state.name} title brands and ${state.dmvName} records.`,
    },
    {
      href: "/salvage-title-check",
      label: "Salvage Title Check",
      desc: "Detect rebuilt, flood, and total-loss brands that slash a car's value and safety.",
    },
    {
      href: "/stolen-vehicle-check",
      label: "Stolen Vehicle Check",
      desc: "Verify a VIN against national theft databases before money changes hands.",
    },
    {
      href: "/odometer-check",
      label: "Odometer Check",
      desc: "Spot mileage rollback fraud that inflates a used car's apparent value.",
    },
    {
      href: "/lemon-check",
      label: "Lemon Check",
      desc: `See whether a car was bought back under ${state.name}'s lemon law for unresolved defects.`,
    },
  ];

  // Single source of truth for the FAQ — rendered both as visible <details>
  // accordions and as FAQPage JSON-LD so schema can never drift from the
  // on-page copy. Answers are written to be true for any state without
  // asserting state-specific tax rates, fees, or day-counts that vary.
  const faqs = [
    {
      q: `How do I buy a used car in ${state.name}?`,
      a: `To buy a used car in ${state.name}, find a vehicle, run its 17-character VIN to check the history, inspect it in person or with a mechanic, agree on a price, then complete the title transfer and registration with the ${state.dmvName}. Bring the signed title, a bill of sale, your ID, proof of insurance, and any required tax payment to finish the deal.`,
    },
    {
      q: `How do I transfer a title in ${state.name}?`,
      a: `In ${state.name}, the seller signs the certificate of title over to you and you submit it to the ${state.dmvName} along with a bill of sale, your photo ID, and proof of insurance. The state issues a new title in your name. Time limits and fees vary, so check the ${state.dmvName} for the exact deadline that applies to your purchase.`,
    },
    {
      q: `Do I pay sales tax on a used car in ${state.name}?`,
      a: `Most states, including ${state.name}, charge sales or use tax on used-car purchases, and it is usually collected by the ${state.dmvName} at the time of title and registration. The rate and any local additions vary, so confirm ${state.name}'s current rate with its DMV or revenue department. Trade-in credits, gifts, and family transfers may reduce or eliminate the tax owed.`,
    },
    {
      q: `Does ${state.name} require a safety or emissions inspection?`,
      a: `Inspection and emissions requirements vary by state and sometimes by county, so verify whether ${state.name} requires one before you register. Where required, the check is typically tied to titling or registration through the ${state.dmvName}. A separate VIN inspection is also common when a vehicle comes from out of state or carries a salvage or rebuilt history.`,
    },
    {
      q: `How do I check a car's history before buying in ${state.name}?`,
      a: `Enter the vehicle's 17-character VIN into a vehicle history report before you put down any money. For a ${state.name} purchase this surfaces title brands, reported accidents, salvage or flood damage, odometer discrepancies, and open recalls recorded in national databases — including out-of-state records the seller or local DMV may not show. Always match the VIN on the dashboard, door jamb, and title.`,
    },
    {
      q: `Do I need a bill of sale in ${state.name}?`,
      a: `A bill of sale documents the purchase price, date, and both parties for a used-car sale, and ${state.name} generally expects one as part of the title-transfer paperwork submitted to the ${state.dmvName}. Even where it is not strictly required, keep a signed copy: it supports the sales-tax calculation and protects both buyer and seller if a dispute arises later.`,
    },
  ];

  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: `VIN Check for ${state.name} Used-Car Buyers`,
    url: pageUrl,
    applicationCategory: "AutomotiveApplication",
    operatingSystem: "All",
    description: `Free VIN-based vehicle history lookup for ${state.name} used-car buyers. Surfaces ${state.name} title brands, accidents, salvage and flood damage, odometer discrepancies, and open recalls before you complete a ${state.dmvName} title transfer.`,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    publisher: {
      "@type": "Organization",
      name: "CarCheckerVIN",
      url: SITE,
      logo: { "@type": "ImageObject", url: `${SITE}/logo.png` },
    },
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `Buying a Used Car in ${state.name} — Complete 2026 Guide`,
    description: `Step-by-step guide to buying a used car in ${state.name}. ${state.dmvName} title transfer, sales tax, ${state.name} lemon law, and inspection requirements explained.`,
    datePublished: "2026-04-26",
    dateModified: "2026-06-09",
    author: ORG_AUTHOR,
    publisher: {
      "@type": "Organization",
      name: "CarCheckerVIN",
      url: SITE,
      logo: { "@type": "ImageObject", url: `${SITE}/logo.png` },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl,
    },
  };

  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How to Buy a Used Car in ${state.name}`,
    description: `Six steps to safely buy a used car in ${state.name}, from finding a vehicle through title and registration with the ${state.dmvName}.`,
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Find a vehicle",
        text: `Search ${state.name} private listings, dealer inventory, and online marketplaces to identify candidate vehicles that match your needs and budget.`,
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Run a VIN check",
        text: `Enter the 17-character VIN into a vehicle history report to surface ${state.name} title brands, accident records, salvage history, odometer issues, and open recalls.`,
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Inspect in person",
        text: `Inspect the vehicle in daylight, drive it under varied conditions, and have an independent ${state.name} mechanic perform a pre-purchase inspection.`,
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "Negotiate price",
        text: `Use KBB and Edmunds private-party values, condition, and any history report findings to negotiate a fair ${state.name} market price.`,
      },
      {
        "@type": "HowToStep",
        position: 5,
        name: "Complete paperwork",
        text: `Sign the title, complete a bill of sale, transfer license plates if applicable, and confirm odometer disclosure as required by the ${state.dmvName}.`,
      },
      {
        "@type": "HowToStep",
        position: 6,
        name: "Title and register",
        text: `Submit the signed title, bill of sale, ID, proof of insurance, and applicable sales tax to the ${state.dmvName} to complete the title transfer and registration.`,
      },
    ],
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE}/guides` },
      {
        "@type": "ListItem",
        position: 3,
        name: "Buying Used Car",
        item: `${SITE}/guides`,
      },
      { "@type": "ListItem", position: 4, name: state.name, item: pageUrl },
    ],
  };

  const speakableJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", ".speakable-intro"],
    },
    url: pageUrl,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableJsonLd) }} />

      <article className="pb-16 bg-surface">
        {/* ── Hero ─────────────────────────────────────────── */}
        <div className="bg-primary text-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-14 sm:pt-28 sm:pb-20">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Guides", href: "/guides" },
                { label: "Buying Used Car", href: "/guides" },
                { label: state.name },
              ]}
              onDark
            />

            <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
              <MapPin className="w-4 h-4" /> {state.name} ({state.abbr})
              &nbsp;·&nbsp; 2026 Buyer Guide
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-headline font-extrabold leading-tight mb-4">
              Buying a Used Car in{" "}
              <span style={{ color: "var(--color-secondary-container)" }}>
                {state.name}
              </span>
            </h1>

            <p className="speakable-intro text-base sm:text-xl text-white/85 max-w-3xl mb-8 leading-relaxed">
              {state.specialFact} For the roughly {state.population} residents of{" "}
              {state.name}, buying a used car the right way means knowing the rules
              of the {state.dmvName}, your rights under {state.name}&apos;s lemon
              law, and verifying any vehicle&apos;s history with a VIN check before
              money changes hands.
            </p>

            <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-xl">
              <h2 className="text-base sm:text-lg font-headline font-extrabold text-primary mb-1">
                Start with a {state.name} VIN check
              </h2>
              <p className="text-xs sm:text-sm text-on-surface-variant mb-4">
                Before you put down a deposit on any used car in {state.name}, run
                the VIN — a vehicle history report takes seconds and can save you
                thousands.
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
          {/* ── How to buy ───────────────────────────────────── */}
          <section className="py-12 sm:py-16">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              How to Buy a Used Car in {state.name}
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">
              This 2026 guide walks every step — from finding a vehicle and pulling
              a history report through completing the title transfer with the{" "}
              {state.dmvName}. Start here.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {howSteps.map((m) => {
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

          {/* ── Why it matters ───────────────────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <div className="flex items-center gap-2 mb-3 text-primary">
              <AlertTriangle className="w-5 h-5" />
              <span className="text-xs font-black uppercase tracking-wider">
                Why it matters
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">
              Why {state.name} Used Car Buyers Need to Be Extra Careful
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-on-surface-variant leading-relaxed">
              <p>
                With a population of about {state.population} and roughly{" "}
                {state.vehiclesRegistered} registered vehicles, {state.name} has a
                deep used car market. That depth is good news for buyers shopping
                for choice, but it also means a constant churn of vehicles being
                bought, sold, and re-titled — sometimes across state lines, where
                damage and title brands can quietly disappear from local records.
              </p>
              <p>
                {state.specialFact} That detail alone is a strong reason to pull a
                full VIN history report on any vehicle you&apos;re considering,
                rather than relying solely on what the seller or {state.dmvName}{" "}
                record shows.
              </p>
              <p>{regionalLine}</p>
            </div>
          </section>

          {/* ── Title brands ─────────────────────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <div className="flex items-center gap-2 mb-3 text-primary">
              <FileText className="w-5 h-5" />
              <span className="text-xs font-black uppercase tracking-wider">
                Title brands
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">
              {state.name} Title Brands You&apos;ll See on Vehicle History Reports
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-on-surface-variant leading-relaxed mb-6">
              <p>
                A title brand is a permanent notation that a state DMV adds to a
                vehicle&apos;s title to flag significant events — total losses,
                flood damage, manufacturer buybacks, and more. {state.name} reports
                these brands to the National Motor Vehicle Title Information System
                (NMVTIS), which is what feeds most VIN-based vehicle history
                reports.
              </p>
              <p>
                When a {state.name} buyer pulls a VIN report, these are the title
                brands the {state.dmvName} most commonly issues, along with what
                each one means in practice:
              </p>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {state.titleBrands.map((brand) => (
                <li
                  key={brand}
                  className="flex items-start gap-3 p-4 rounded-2xl border border-outline-variant bg-surface"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-headline font-extrabold text-primary">{brand}</p>
                    <p className="text-xs sm:text-sm text-on-surface-variant mt-0.5 leading-relaxed">
                      {brandDescription(brand, state.name)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* ── Mid CTA ──────────────────────────────────────── */}
          <section className="py-4">
            <div className="rounded-3xl bg-primary text-white p-7 sm:p-10 text-center">
              <div className="inline-flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-yellow-300" />
                <span className="text-xs font-black uppercase tracking-wider text-white/80">
                  Check before you commit
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-headline font-extrabold mb-2">
                Verify a {state.name} VIN in seconds
              </h2>
              <p className="text-sm sm:text-base text-white/80 max-w-2xl mx-auto mb-6">
                Title brands, accidents, salvage, flood, odometer, and recalls —
                one report before you sign anything.
              </p>
              <div className="max-w-xl mx-auto">
                <VinSearchForm size="lg" onDark />
              </div>
            </div>
          </section>

          {/* ── Title transfer ───────────────────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <div className="flex items-center gap-2 mb-3 text-primary">
              <BadgeCheck className="w-5 h-5" />
              <span className="text-xs font-black uppercase tracking-wider">
                Title transfer
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">
              {state.dmvName} Title Transfer Requirements
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-on-surface-variant leading-relaxed">
              <p>
                Once you and the seller agree on a price, the title transfer is the
                formal legal step that moves ownership to your name. In {state.name},
                the {state.dmvName} processes title transfers, collects sales tax,
                and issues a new certificate of title in the buyer&apos;s name.
              </p>
              <p>
                Most {state.name} private-party used car transactions require the
                same core paperwork. Bring the following to your local{" "}
                {state.dmvName} office (or your tag agent, depending on the county):
              </p>
            </div>
            <div className="mt-5 rounded-2xl bg-primary/5 border border-primary/20 p-6">
              <div className="flex items-center gap-2 mb-3">
                <ClipboardCheck className="w-5 h-5 text-primary" />
                <h3 className="font-headline font-extrabold text-primary">
                  Title-transfer paperwork
                </h3>
              </div>
              <ul className="space-y-2 text-sm text-on-surface">
                {[
                  `The original certificate of title, signed over to you by the seller`,
                  `A bill of sale showing purchase price and date`,
                  `The seller's current registration card`,
                  `Your valid government-issued photo ID`,
                  `Proof of ${state.name} auto insurance in your name`,
                  `Sales tax payment per ${state.dmvName} schedules`,
                  `A VIN inspection if the vehicle is from out of state or has a salvage history`,
                  `Odometer disclosure (federally required for vehicles under 20 model years old)`,
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <Check
                      className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5"
                      strokeWidth={3}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="mt-5 text-sm sm:text-base text-on-surface-variant leading-relaxed">
              Time limits to complete the transfer vary, but most {state.name}{" "}
              buyers should plan to title and register a newly purchased used car
              within 30 days to avoid late penalties.
            </p>
          </section>

          {/* ── Lemon law ────────────────────────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <div className="flex items-center gap-2 mb-3 text-primary">
              <Gavel className="w-5 h-5" />
              <span className="text-xs font-black uppercase tracking-wider">
                Lemon law
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">
              {state.name} Lemon Law Protections
            </h2>
            <div className="flex items-start gap-3 p-5 rounded-2xl bg-secondary-container/40 border border-outline-variant mb-5">
              <AlertTriangle className="w-5 h-5 text-on-secondary-container flex-shrink-0 mt-0.5" />
              <p className="text-sm text-on-surface leading-relaxed">{state.lemonLawNotes}</p>
            </div>
            <div className="space-y-4 text-sm sm:text-base text-on-surface-variant leading-relaxed">
              <p>
                The {state.name} lemon law generally applies when a vehicle has a
                substantial defect that the manufacturer or dealer can&apos;t fix
                after a reasonable number of repair attempts, or when the vehicle
                has been out of service for repairs for a significant cumulative
                period. If those thresholds are met, qualifying buyers may be
                entitled to a refund, a comparable replacement vehicle, or other
                remedies.
              </p>
              <p>
                To file a {state.name} lemon law claim, document every repair visit
                (dates, mileage, written technician notes), keep all receipts, and
                notify the manufacturer in writing. A{" "}
                <Link
                  href="/lemon-check"
                  className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80"
                >
                  lemon check
                </Link>{" "}
                can also reveal whether a used vehicle has already been bought back
                as a lemon — a critical disclosure that not all sellers volunteer.
              </p>
            </div>
          </section>

          {/* ── Sales tax ────────────────────────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <div className="flex items-center gap-2 mb-3 text-primary">
              <Calculator className="w-5 h-5" />
              <span className="text-xs font-black uppercase tracking-wider">
                Sales tax
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">
              Sales Tax on Used Vehicles in {state.name}
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-on-surface-variant leading-relaxed">
              <p>
                {state.name} charges sales or use tax on used vehicle purchases, and
                the exact rate depends on your county and city. The {state.dmvName}{" "}
                typically collects this tax at the time of titling and registration
                based on the actual purchase price shown on your bill of sale (or a
                fair market value floor if the price seems unrealistically low).
              </p>
              <p>
                Because rates and exemptions can change, always confirm the current{" "}
                {state.name} used vehicle sales tax rate on the official{" "}
                {state.dmvName} website before you finalize a deal. Trade-in credits,
                family transfers, and gift transfers may reduce or eliminate tax in
                certain situations.
              </p>
            </div>
          </section>

          {/* ── Checklist ────────────────────────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <div className="flex items-center gap-2 mb-3 text-primary">
              <CheckCircle className="w-5 h-5" />
              <span className="text-xs font-black uppercase tracking-wider">
                Checklist
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">
              Pre-Purchase Checklist for {state.name} Buyers
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed mb-5 max-w-3xl">
              Use this checklist on every used car you&apos;re seriously considering
              in {state.name}. Skipping any single item is how most buyers end up
              with a vehicle they regret.
            </p>
            <ol className="space-y-3">
              {[
                <>
                  Run a{" "}
                  <Link href="/vin-check" className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">
                    VIN check
                  </Link>{" "}
                  before any test drive or deposit
                </>,
                `Verify the seller's name on their photo ID matches the name on the ${state.name} title`,
                <>
                  Check for any open recalls at{" "}
                  <a
                    href="https://www.nhtsa.gov/recalls"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80"
                  >
                    NHTSA.gov
                  </a>
                </>,
                `Inspect undercarriage and frame for rust — especially important on ${state.name} vehicles exposed to road salt or coastal air`,
                `Confirm the odometer reading matches the title and the VIN history report`,
                `Get a pre-purchase inspection from an independent ${state.name} mechanic`,
                `Verify all keys, the spare, and any factory accessories are present`,
                `Test all electrical systems: lights, infotainment, power windows, climate control, and warning indicators`,
                `Cross-check the VIN on the dashboard, door jamb, engine bay, and title to make sure they all match`,
                <>
                  Negotiate based on KBB and Edmunds private-party values, then
                  verify clean history with a{" "}
                  <Link href="/salvage-title-check" className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">
                    salvage title check
                  </Link>{" "}
                  and a{" "}
                  <Link href="/stolen-vehicle-check" className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">
                    stolen vehicle check
                  </Link>
                </>,
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 p-4 rounded-2xl border border-outline-variant bg-surface-container-lowest"
                >
                  <div className="w-7 h-7 rounded-lg bg-primary text-white flex items-center justify-center flex-shrink-0 text-xs font-black">
                    {i + 1}
                  </div>
                  <span className="text-sm text-on-surface leading-relaxed">{item}</span>
                </li>
              ))}
            </ol>
          </section>

          {/* ── Internal links ───────────────────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              VIN Checks That Pair With This {state.name} Guide
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-7">
              A history report is the single most important step before buying.
              These tools complete the picture.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {internalLinks.map((l) => (
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

          {/* ── VIN check banner ─────────────────────────────── */}
          <section className="py-10">
            <VinCheckBanner />
          </section>

          {/* ── FAQ ──────────────────────────────────────────── */}
          <section className="speakable-faq py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              Buying a Used Car in {state.name} — FAQ
            </h2>
            <p className="text-sm text-on-surface-variant mb-8">
              The questions {state.name} buyers ask most before they sign.
            </p>
            <div className="space-y-3">
              {faqs.map((f) => (
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

          {/* ── Bottom CTA ───────────────────────────────────── */}
          <section className="py-14 sm:py-20 text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-xs font-black uppercase tracking-wider mb-4">
              <Zap className="w-3.5 h-3.5" /> Free · Instant · VIN-Based
            </div>
            <h2 className="text-2xl sm:text-4xl font-headline font-extrabold text-primary mb-3">
              Ready to Check a {state.name} VIN?
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl mx-auto mb-8">
              Pull a full vehicle history report before you sign anything — title
              brands, accidents, salvage, flood, odometer, and recalls in one place.
            </p>
            <div className="max-w-xl mx-auto bg-surface-container-low rounded-2xl p-5 border border-outline-variant">
              <VinSearchForm size="lg" />
            </div>
            <div className="mt-3 flex items-center justify-center gap-2 text-xs text-on-surface-variant">
              <Check className="w-3.5 h-3.5 text-green-500" strokeWidth={3} />
              Trusted by 50,000+ buyers nationwide · No sign-up · Free
            </div>
          </section>

          {/* ── Other states ─────────────────────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              Buying a Used Car in Other States
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-6">
              Shopping a wider radius? See state-specific guides for nearby and
              popular markets.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {otherStates.map((s) => (
                <Link
                  key={s.slug}
                  href={`/guides/buying-used-car-in/${s.slug}`}
                  className="flex items-center gap-2 p-4 rounded-xl border border-outline-variant bg-surface hover:border-primary/40 hover:bg-primary/5 transition-colors"
                >
                  <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm font-medium text-on-surface">{s.name}</span>
                </Link>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-4 text-sm">
              <Link
                href={`/vin-check/state/${state.slug}`}
                className="inline-flex items-center gap-1.5 text-primary font-semibold hover:text-primary/80 transition-colors"
              >
                <Car className="w-4 h-4" /> {state.name} VIN check
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/guides"
                className="inline-flex items-center gap-1.5 text-primary font-semibold hover:text-primary/80 transition-colors"
              >
                <FileText className="w-4 h-4" /> All guides
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/lemon-check"
                className="inline-flex items-center gap-1.5 text-primary font-semibold hover:text-primary/80 transition-colors"
              >
                <AlertTriangle className="w-4 h-4" /> Lemon check
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </section>

          <RelatedChecks />
        </div>
      </article>
    </>
  );
}
