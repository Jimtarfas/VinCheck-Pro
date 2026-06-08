import type { Metadata } from "next";
import Link from "next/link";
import {
  Check,
  Shield,
  Search,
  FileText,
  Database,
  Droplets,
  Waves,
  ChevronRight,
  Lock,
  Zap,
  BadgeCheck,
  Sparkles,
  Wind,
  Wrench,
  Gauge,
  ClipboardCheck,
  AlertTriangle,
  MapPin,
  Cpu,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";

export const metadata: Metadata = {
  title:
    "Flood Damage Check by VIN — Was This Car Flooded? (Free Water-Damage Lookup)",
  description:
    "Check any car for flood damage by VIN — free. Surface flood and water-damage title brands, hurricane salvage records, and insurance total-loss declarations from NMVTIS, state DMVs, and salvage auctions before you buy a water-damaged vehicle.",
  keywords: [
    "flood damage check VIN",
    "flood car history",
    "water damage VIN check",
    "flood title check",
    "was this car flooded",
    "check car for flood damage by VIN",
    "hurricane damage vehicle",
    "flood salvage title",
    "water damage title brand",
    "flood vehicle check free",
    "NMVTIS flood title",
    "title washing flood car",
    "storm damage vehicle VIN",
    "free flood check",
  ],
  alternates: { canonical: "/flood-check" },
  openGraph: {
    title: "Flood Damage Check by VIN — Was This Car Flooded? (Free)",
    description:
      "Free VIN check for flood and water-damage title brands, hurricane salvage records, and insurance total-loss history. NMVTIS-sourced.",
    url: `${SITE}/flood-check`,
    type: "article",
    siteName: "CarCheckerVIN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Flood Damage Check by VIN — Was This Car Flooded? (Free)",
    description:
      "Free VIN check for flood and water-damage brands, hurricane salvage, and total-loss history. NMVTIS-sourced.",
  },
  robots: { index: true, follow: true },
};

/* ── JSON-LD schemas ───────────────────────────────────────────── */

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Flood Damage Check by VIN",
  url: `${SITE}/flood-check`,
  applicationCategory: "AutomotiveApplication",
  operatingSystem: "All",
  description:
    "Check whether a vehicle was damaged by flooding using its 17-character VIN. Surfaces flood and water-damage title brands, hurricane salvage records, and insurance total-loss declarations from NMVTIS, state DMVs, insurers, and salvage auctions.",
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
  headline: "Flood Damage Check by VIN — Was This Car Flooded?",
  description:
    "How to check any vehicle for flood and water-damage history by VIN, what a flood title brand means, how to spot a hidden flood car, and how flood records reach a VIN report.",
  author: ORG_AUTHOR,
  publisher: {
    "@type": "Organization",
    name: "CarCheckerVIN",
    url: SITE,
    logo: { "@type": "ImageObject", url: `${SITE}/logo.png` },
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${SITE}/flood-check`,
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
      name: "Does a VIN check show flood damage?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, in most cases. A VIN check surfaces flood damage when a state DMV applied a 'Flood' or 'Water Damage' title brand, or when an insurer reported a flood-related total loss to NMVTIS. It also captures salvage-auction records from companies like Copart and IAA. The limit: a flood car that was never insured or claimed may still carry a clean title, so a physical inspection remains important.",
      },
    },
    {
      "@type": "Question",
      name: "What is a flood or water-damage title brand?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A flood or water-damage title brand is a permanent designation a state adds to a vehicle's title after it was significantly damaged by flooding, typically when water reached the floorboards or higher and an insurer declared it a total loss. Common brand wording includes 'Flood,' 'Water Damage,' and 'Storm Damage.' Once applied, the brand is reported to NMVTIS and is meant to follow the VIN for the life of the vehicle.",
      },
    },
    {
      "@type": "Question",
      name: "How can I spot a flood-damaged car?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Start with a VIN check for flood and salvage brands, then inspect in person. Look for a musty or mildew odor under the carpet and in the trunk, tide-line water stains inside door panels and the spare-tire well, greenish corrosion on electrical connectors and ground points, premature rust on seat bolts and brake lines, and recently replaced carpet or interior trim. Intermittent electrical glitches are another red flag.",
      },
    },
    {
      "@type": "Question",
      name: "Does NMVTIS show flood titles?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. NMVTIS — the National Motor Vehicle Title Information System, administered by the U.S. Department of Justice — aggregates title-brand data from all 50 state DMVs plus insurance carriers, junk yards, and salvage auctions. It flags flood, water-damage, salvage, and junk brands. Because it pulls from every state, a flood brand reported by one state is visible even after the vehicle is moved or retitled elsewhere.",
      },
    },
    {
      "@type": "Question",
      name: "Can flood damage be hidden through title washing?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It can be attempted, but it is harder than it used to be. Title washing means re-titling a flood vehicle in a state with weaker brand-transfer rules to obtain a 'clean' title. NMVTIS was created specifically to disrupt this by preserving the original brand history regardless of where the current paper title was issued. A multi-source VIN check that draws on NMVTIS is the most reliable defense against a washed title.",
      },
    },
    {
      "@type": "Question",
      name: "Why are flood-damaged cars dangerous?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Flood water corrodes the wiring harnesses, control modules, and connectors that run nearly every modern vehicle system — engine management, ABS, traction control, and airbags. This corrosion develops over months, causing intermittent failures that are costly to diagnose. Water-damaged airbag and SRS components may fail to deploy or deploy unexpectedly, and trapped moisture promotes mold and structural rust, making a flood car genuinely hazardous to drive.",
      },
    },
    {
      "@type": "Question",
      name: "Are flood cars from hurricanes resold across state lines?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. After major events like Hurricane Katrina, Harvey, and Ian, large numbers of flood-damaged vehicles are dried out and shipped to used-car markets far from the disaster zone, often in states where buyers are less alert to flood history. Gulf Coast states such as Texas, Louisiana, Florida, and Mississippi see the most flooding, but the affected vehicles migrate nationwide, which is why a VIN-based flood check matters anywhere.",
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
  name: "How to Check a Car for Flood Damage by VIN",
  description:
    "Verify whether a used vehicle was damaged by flooding before you buy, using its 17-character VIN.",
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
      name: "Run the VIN through the flood check",
      text: "Enter the VIN into the search tool. It queries NMVTIS, state DMVs, insurers, and salvage auctions for flood and water-damage brands, storm-related total losses, and salvage records.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Read the brand and loss history",
      text: "Look for flood, water-damage, storm-damage, salvage, or junk brands and any insurance total-loss record — these confirm water damage even if the current paper title looks clean.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Inspect for hidden water damage",
      text: "Before you buy, check for a musty odor, tide-line stains, corroded connectors, and unusual rust. A VIN can come back clean if the car was never insured or claimed, so a physical inspection still matters.",
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
      name: "Flood Check",
      item: `${SITE}/flood-check`,
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
  url: `${SITE}/flood-check`,
};

/* ── Static UI data ────────────────────────────────────────────── */

const TRUST_STATS = [
  { icon: Database, value: "50-state", label: "NMVTIS sources" },
  { icon: Waves, value: "Flood", label: "& water-damage brands" },
  { icon: Shield, value: "Hurricane", label: "salvage records" },
  { icon: BadgeCheck, value: "Free", label: "no sign-up" },
];

const HOW_STEPS = [
  {
    icon: Search,
    tag: "Step 1",
    title: "Enter the VIN",
    body: "Type the 17-character VIN from the dashboard, door jamb, title, or insurance card. The check is keyed to the VIN, so a flood brand surfaces even after the car is dried out and re-titled in another state.",
  },
  {
    icon: Database,
    tag: "Step 2",
    title: "We query the flood record",
    body: "The lookup pulls from NMVTIS — which aggregates all 50 state DMVs, insurers, junk yards, and salvage auctions — for flood, water-damage, and storm-damage brands plus flood-related total losses.",
  },
  {
    icon: FileText,
    tag: "Step 3",
    title: "Read the verdict",
    body: "See whether the car carries a flood or water-damage brand or a flood-related salvage record — and decide whether it needs a hands-on inspection before you put money down.",
  },
];

const FLOOD_SIGNS = [
  {
    icon: Wind,
    title: "Musty or mildew odor",
    body: "Especially under carpet, in the trunk, and behind interior panels — a smell that lingers even after heavy cleaning or air fresheners meant to mask it.",
  },
  {
    icon: Waves,
    title: "Water stain tide lines",
    body: "Faint horizontal marks inside door panels, under seats, in the engine bay, or in the spare-tire well that show how high the water rose.",
  },
  {
    icon: Cpu,
    title: "Corroded connectors",
    body: "Greenish-white oxidation on wiring-harness plugs, fuse boxes, and ground points — a tell-tale of submersion that is hard to fully clean.",
  },
  {
    icon: AlertTriangle,
    title: "Rust in odd places",
    body: "Premature rust on seat-bolt tracks, floor-pan fasteners, brake lines, or under-dash brackets points to water intrusion, not normal age.",
  },
  {
    icon: Wrench,
    title: "New carpet or trim",
    body: "Recently replaced carpets, seats, or headliner on an otherwise older car can mean a flood refurbishment meant to hide the damage.",
  },
  {
    icon: Zap,
    title: "Electronic glitches",
    body: "Intermittent warning lights, flaky infotainment, and HVAC or power-accessory faults are common as corrosion spreads through the harness.",
  },
];

const REPORTING_CHAIN = [
  "Insurers are generally required to report a flood-related total loss to NMVTIS within a set timeframe after the declaration.",
  "Salvage auction companies like Copart and IAA report flood vehicles they receive — a major channel after hurricanes and storms.",
  "State motor vehicle agencies brand the title 'Flood,' 'Water Damage,' or 'Salvage,' creating a permanent VIN-linked record.",
  "NMVTIS aggregates all of it, so a brand reported in one state stays visible even after the car is moved and re-titled elsewhere.",
];

const INSPECT_CHECKLIST = [
  "Run the VIN for flood, water-damage, and salvage brands first",
  "Smell the cabin and trunk for mildew, especially with windows up",
  "Lift carpet edges and check the spare-tire well for silt or stains",
  "Inspect harness connectors and ground points for green corrosion",
  "Test every electrical accessory, light, and the HVAC system",
  "Have a mechanic inspect a flood-prone car before you pay",
];

const INTERNAL_LINKS = [
  {
    href: "/salvage-title-check",
    label: "Salvage Title Check",
    desc: "Confirm whether the flood damage produced a salvage, junk, or non-repairable brand.",
  },
  {
    href: "/total-loss-check",
    label: "Total Loss Check",
    desc: "See whether an insurer wrote the car off after a flood or storm event.",
  },
  {
    href: "/vin-check",
    label: "Full VIN History Check",
    desc: "Title, flood, accident, odometer, and recall records in one report.",
  },
  {
    href: "/accident-history-check",
    label: "Accident History Check",
    desc: "Capture collision and damage events alongside the flood history.",
  },
  {
    href: "/stolen-vehicle-check",
    label: "Stolen Vehicle Check",
    desc: "Verify the car isn't reported stolen before you commit to a purchase.",
  },
  {
    href: "/vin-decoder",
    label: "VIN Decoder",
    desc: "Decode the 17-character VIN to specs, trim, and factory options.",
  },
];

/* ── Page ──────────────────────────────────────────────────────── */

export default function FloodCheckPage() {
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
                { label: "Flood Check" },
              ]}
              onDark
            />

            <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
              <Droplets className="w-4 h-4" /> Water-Damage Lookup
              &nbsp;·&nbsp; NMVTIS-Sourced
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-headline font-extrabold leading-tight mb-4">
              Flood Damage Check by VIN —{" "}
              <span style={{ color: "var(--color-secondary-container)" }}>
                Was This Car Flooded?
              </span>
            </h1>

            <p className="speakable-intro text-base sm:text-xl text-white/85 max-w-3xl mb-8 leading-relaxed">
              After every hurricane and major flood, thousands of water-damaged
              cars are dried out, cleaned up, and shipped to states where buyers
              never see it coming. Enter a 17-character VIN to surface flood and
              water-damage title brands, hurricane salvage records, and
              insurance total-loss history — free, before you buy.
            </p>

            <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-xl">
              <h2 className="text-base sm:text-lg font-headline font-extrabold text-primary mb-1">
                Check for Flood &amp; Water-Damage History by VIN
              </h2>
              <p className="text-xs sm:text-sm text-on-surface-variant mb-4">
                Enter any 17-character VIN — we&apos;ll check for flood,
                water-damage, and storm-damage brands plus salvage records
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
              How a VIN Flood Check Works
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl">
              A flood brand follows the car&apos;s VIN for life. Three steps turn
              that record into a clear answer before you put money down.
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

          {/* ── How flood damage gets into the title system ──── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              How Flood Damage Gets Into the Title System
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl leading-relaxed">
              When water reaches the floorboards or higher, insurers almost
              always declare the car a total loss. That decision is what creates
              the permanent, VIN-linked flood record — and what title washing
              tries to erase.
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
                <p>
                  When a vehicle is submerged, the insurer typically pays the
                  policyholder the{" "}
                  <strong className="text-on-surface">actual cash value</strong>,
                  takes ownership of the wreck, and brands the title{" "}
                  <strong className="text-on-surface">flood</strong> or{" "}
                  <strong className="text-on-surface">salvage</strong>. That
                  brand is reported to NMVTIS and is meant to follow the car for
                  life.
                </p>
                <p>
                  The problem is <strong className="text-on-surface">title
                  washing</strong>. Operators buy flood cars at salvage auction,
                  dry them out, and re-register them in states with weaker
                  brand-transfer rules — sometimes obtaining a fresh &ldquo;clean&rdquo;
                  paper title. NMVTIS was built to disrupt exactly this by
                  preserving the original brand history.
                </p>
                <p>
                  After Hurricane Katrina (2005), Harvey (2017), and Ian (2022),
                  investigators tracked thousands of flood cars that ended up
                  retitled far from the disaster zone and sold within months. A
                  VIN flood check is your primary defense against that fraud.
                </p>
              </div>
              <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Droplets className="w-5 h-5 text-primary" />
                  <h3 className="font-headline font-extrabold text-primary">
                    The flood-to-title path
                  </h3>
                </div>
                <ul className="space-y-3 text-sm text-on-surface">
                  <li className="flex items-center justify-between gap-3 rounded-lg bg-white px-3.5 py-2.5 border border-outline-variant/60">
                    <span className="text-on-surface-variant">
                      Water reaches
                    </span>
                    <code className="font-mono font-bold text-primary">
                      floorboards+
                    </code>
                  </li>
                  <li className="flex items-center justify-between gap-3 rounded-lg bg-white px-3.5 py-2.5 border border-outline-variant/60">
                    <span className="text-on-surface-variant">
                      Insurer declares
                    </span>
                    <code className="font-mono font-bold text-primary">
                      total loss
                    </code>
                  </li>
                  <li className="flex items-center justify-between gap-3 rounded-lg bg-white px-3.5 py-2.5 border border-outline-variant/60">
                    <span className="text-on-surface-variant">
                      Title branded
                    </span>
                    <code className="font-mono font-bold text-primary">
                      Flood / Salvage
                    </code>
                  </li>
                </ul>
                <p className="mt-4 text-xs text-on-surface-variant leading-relaxed">
                  Once the brand reaches NMVTIS it&apos;s meant to stay with the
                  VIN nationwide — even after a re-title attempt in another
                  state.
                </p>
              </div>
            </div>
          </section>

          {/* ── Signs of hidden flood damage ─────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              Signs of Hidden Flood Damage
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">
              Even a clean VIN result deserves a hands-on look when a car comes
              from a flood-prone region. Sophisticated flood prep can make a
              vehicle look spotless until the electrical problems surface weeks
              later.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {FLOOD_SIGNS.map((c) => {
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

          {/* ── Mid-page CTA ───────────────────────────────── */}
          <section className="py-10">
            <div className="rounded-3xl bg-primary p-7 sm:p-10 text-center">
              <Sparkles className="w-8 h-8 text-yellow-300 mx-auto mb-3" />
              <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-white mb-2">
                Was This Specific Car Flooded?
              </h2>
              <p className="text-white/80 text-sm sm:text-base mb-6 max-w-xl mx-auto">
                Don&apos;t take the seller&apos;s word for it. Run the VIN and
                see the flood and title record straight from NMVTIS sources —
                free, in seconds.
              </p>
              <div className="max-w-xl mx-auto bg-white rounded-2xl p-4 sm:p-5">
                <VinSearchForm size="lg" />
              </div>
            </div>
          </section>

          {/* ── How flood data reaches your report ───────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              How Flood Records Reach Your VIN Report
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">
              Once a car is flooded and claimed, the event flows through several
              reporters into the VIN&apos;s permanent record. That redundancy is
              why a flood is hard to hide.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {REPORTING_CHAIN.map((item, i) => (
                <div
                  key={i}
                  className="flex gap-3 items-start rounded-2xl border border-outline-variant bg-surface p-5"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Check className="w-4 h-4 text-primary" strokeWidth={3} />
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
                  A flood car that was never insured or claimed can still carry a
                  clean title — but because NMVTIS pulls from all 50 state DMVs,
                  insurers, junk yards, and salvage auctions at once, a
                  multi-source VIN check is the most thorough way to surface a
                  prior flood, even after a re-title.
                </p>
              </div>
            </div>
          </section>

          {/* ── States most affected ─────────────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">
              Where Flood Cars Come From — and Where They End Up
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
                <p>
                  Flood-vehicle concentrations follow the geography of major
                  weather events. Gulf Coast states —{" "}
                  <strong className="text-on-surface">
                    Texas, Louisiana, Florida, and Mississippi
                  </strong>{" "}
                  — have the highest rates of flood-branded vehicles thanks to
                  repeated hurricane activity.
                </p>
                <p>
                  But flood cars don&apos;t stay where they were damaged. They
                  migrate to used-car markets across the country, often appearing
                  on dealer lots hundreds of miles from the original disaster
                  zone, in states where buyers are far less alert to flood
                  history.
                </p>
                <p>
                  After Hurricane Harvey in 2017, investigators documented flood
                  vehicles surfacing from California to Massachusetts within 90
                  days of the storm. That nationwide migration is exactly why a
                  VIN-based flood check matters no matter where you live.
                </p>
              </div>
              <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="w-5 h-5 text-primary" />
                  <h3 className="font-headline font-extrabold text-primary">
                    Highest-risk origin states
                  </h3>
                </div>
                <ul className="space-y-2 text-sm text-on-surface">
                  {[
                    "Texas — repeated hurricane and inland flooding",
                    "Louisiana — Gulf storms and low-lying terrain",
                    "Florida — hurricanes and storm-surge flooding",
                    "Mississippi — Gulf Coast hurricane exposure",
                    "Other coastal & river-basin flood zones",
                  ].map((state) => (
                    <li key={state} className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>{state}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs text-on-surface-variant leading-relaxed">
                  A car for sale far from these states can still have a flood
                  history — the VIN is what reveals it.
                </p>
              </div>
            </div>
          </section>

          {/* ── Why flood cars are dangerous ─────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              Why Flood Cars Are Dangerous Long-Term
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">
              The danger of a flood car isn&apos;t always immediate. Corrosion
              develops over months and years, turning a car that runs fine today
              into an unpredictable one tomorrow.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  icon: Cpu,
                  title: "Corroded electronics",
                  body: "Water intrusion into wiring harnesses and control modules creates corrosion that causes intermittent, hard-to-diagnose failures across engine, transmission, ABS, and traction systems.",
                },
                {
                  icon: Shield,
                  title: "Compromised safety systems",
                  body: "Water-damaged airbag and SRS components may fail to deploy in a crash — or deploy unexpectedly. Combined with hidden structural rust, that makes a flood car genuinely hazardous.",
                },
                {
                  icon: Gauge,
                  title: "The VIN tells the truth",
                  body: "Even if title washing produced a clean paper title, the NMVTIS flood or salvage record still appears in a multi-source VIN history report.",
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
                <FileText className="w-5 h-5 text-on-secondary-container flex-shrink-0 mt-0.5" />
                <p className="text-sm text-on-surface leading-relaxed">
                  <strong className="text-on-surface">Buying used?</strong> Pair
                  this with an{" "}
                  <Link
                    href="/accident-history-check"
                    className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80"
                  >
                    accident history check
                  </Link>{" "}
                  and a{" "}
                  <Link
                    href="/stolen-vehicle-check"
                    className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80"
                  >
                    stolen vehicle check
                  </Link>{" "}
                  to capture both water damage and any additional incidents
                  before you buy.
                </p>
              </div>
            </div>
          </section>

          {/* ── Inspect before you buy ───────────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">
              Flood-Prone Purchase? Inspect Before You Pay
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
                <p>
                  A VIN flood check is the first and most important step, but it
                  isn&apos;t the last. A flood car that was never insured or
                  claimed can slip through with a{" "}
                  <strong className="text-on-surface">clean title</strong>, so a
                  hands-on inspection backs up the data.
                </p>
                <p>
                  Combine the flood check with a{" "}
                  <Link
                    href="/salvage-title-check"
                    className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80"
                  >
                    salvage title check
                  </Link>{" "}
                  and a full{" "}
                  <Link
                    href="/vin-check"
                    className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80"
                  >
                    VIN history report
                  </Link>{" "}
                  for the most complete picture of any vehicle&apos;s damage
                  history.
                </p>
                <p>
                  When in doubt, pay a trusted mechanic for a pre-purchase
                  inspection focused on water intrusion. A few dollars up front
                  is far cheaper than years of chasing electrical gremlins.
                </p>
              </div>
              <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <ClipboardCheck className="w-5 h-5 text-primary" />
                  <h3 className="font-headline font-extrabold text-primary">
                    Flood inspection checklist
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
                    Check the flood history by VIN first:
                  </p>
                  <VinSearchForm size="sm" />
                </div>
              </div>
            </div>
          </section>

          {/* ── Internal links ─────────────────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              More VIN Checks That Pair With a Flood Check
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-7">
              Flood damage is one chapter of a car&apos;s story. These checks
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
              Flood Damage Check — Frequently Asked Questions
            </h2>
            <p className="text-sm text-on-surface-variant mb-8">
              The questions buyers ask most when checking a car for water damage.
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
              Was This Car Flooded? Find Out Now.
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl mx-auto mb-8">
              Enter a 17-character VIN to check for flood and water-damage title
              brands, hurricane salvage records, and insurance total-loss
              history.
            </p>
            <div className="max-w-xl mx-auto bg-surface-container-low rounded-2xl p-5 border border-outline-variant">
              <VinSearchForm size="lg" />
            </div>
            <div className="mt-3 flex items-center justify-center gap-2 text-xs text-on-surface-variant">
              <Check className="w-3.5 h-3.5 text-green-500" strokeWidth={3} />
              No credit card · No sign-up · Free
            </div>
          </section>

          <RelatedChecks exclude="/flood-check" />
        </div>
      </article>
    </>
  );
}
