import type { Metadata } from "next";
import Link from "next/link";
import {
  Check,
  Shield,
  Search,
  FileText,
  Database,
  Gavel,
  ChevronRight,
  Lock,
  Zap,
  BadgeCheck,
  Sparkles,
  AlertTriangle,
  Car,
  Wrench,
  ClipboardCheck,
  Tag,
  Camera,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PATH = "/marketplace-vin-check/copart";

export const metadata: Metadata = {
  title:
    "Copart VIN Check — Verify Any Salvage Auction Lot Before You Bid (Free)",
  description:
    "Run a free VIN check on any Copart lot before you bid. Decode salvage, rebuilt, flood, and total-loss title brands, prior-damage and theft-recovery history, and odometer records from NMVTIS sources — so you know exactly what you're bidding on.",
  keywords: [
    "Copart VIN check",
    "Copart VIN lookup",
    "check Copart car history",
    "Copart salvage title check",
    "Copart lot VIN",
    "is a Copart car worth buying",
    "Copart total loss",
    "Copart flood damage",
    "Copart rebuilt title",
    "verify Copart vehicle",
    "Copart auction history report",
    "salvage auction VIN check",
    "free Copart VIN check",
    "Copart buyer guide",
  ],
  alternates: { canonical: PATH },
  openGraph: {
    title: "Copart VIN Check — Verify Any Salvage Lot Before You Bid (Free)",
    description:
      "Free VIN check for Copart lots: salvage, rebuilt, flood, and total-loss brands, prior damage, and theft records. NMVTIS-sourced.",
    url: `${SITE}${PATH}`,
    type: "article",
    siteName: "CarCheckerVIN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Copart VIN Check — Verify Any Salvage Lot Before You Bid (Free)",
    description:
      "Free VIN check for Copart salvage lots: title brands, prior damage, theft, and odometer history. NMVTIS-sourced.",
  },
  robots: { index: true, follow: true },
};

/* ── JSON-LD schemas ───────────────────────────────────────────── */

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Copart VIN Check",
  url: `${SITE}${PATH}`,
  applicationCategory: "AutomotiveApplication",
  operatingSystem: "All",
  description:
    "Check any Copart salvage-auction lot by its 17-character VIN. Surfaces salvage, rebuilt, flood, and total-loss title brands, prior-damage and theft records, and odometer history from NMVTIS, state DMVs, insurers, and salvage auctions.",
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
  headline: "Copart VIN Check — Verify Any Salvage Lot Before You Bid",
  description:
    "How to check a Copart auction lot by VIN, what Copart's branded titles mean, how to read a lot before bidding, and how salvage and total-loss records reach a VIN report.",
  author: ORG_AUTHOR,
  publisher: {
    "@type": "Organization",
    name: "CarCheckerVIN",
    url: SITE,
    logo: { "@type": "ImageObject", url: `${SITE}/logo.png` },
  },
  mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE}${PATH}` },
  datePublished: "2026-05-04",
  dateModified: "2026-06-08",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is a VIN check free for Copart lots?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Enter the 17-character VIN from any Copart lot into the search box above to decode the vehicle and pull its available history — no account or payment required to start. Because Copart sells most vehicles 'as-is' on behalf of insurers, an independent VIN check is the most reliable way to understand the full damage and title history before you place a bid.",
      },
    },
    {
      "@type": "Question",
      name: "Are all Copart cars salvage or branded titles?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most are, but not all. Copart sells a large share of insurance total-loss vehicles that carry salvage, rebuilt, junk, or non-repairable brands, but it also lists some clean-title cars from dealers, fleets, banks, and charities. The title type is listed on each lot — confirm it, then run the VIN to verify the brand against NMVTIS and surface any history the lot summary doesn't show.",
      },
    },
    {
      "@type": "Question",
      name: "What do Copart title types mean?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Copart labels each lot with a title type. 'Clean' means no brand on record; 'Salvage' means an insurer declared it a total loss; 'Rebuilt/Reconstructed' means a salvage vehicle passed a state inspection and was re-titled to drive; 'Non-Repairable,' 'Junk,' or 'Certificate of Destruction' means it can legally only be used for parts or scrap. Always match the lot's stated title type against an independent VIN check.",
      },
    },
    {
      "@type": "Question",
      name: "How do I check a Copart car's history by VIN?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Copy the 17-character VIN from the Copart lot details and paste it into the search box above. The check queries NMVTIS, state DMVs, insurers, and salvage auctions for title brands, total-loss declarations, prior damage, theft records, and odometer readings. If the VIN is hidden on the lot, you can request it through Copart or read it from the photos before bidding.",
      },
    },
    {
      "@type": "Question",
      name: "What does 'Run and Drive' mean on a Copart lot?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "'Run and Drive' is Copart's note that, at intake, the vehicle started, moved, and stopped under its own power on the yard — it is not a mechanical guarantee or an inspection. Many lots are 'Enhanced Vehicles' (non-running) or sold with no condition guarantee at all. Treat the designation as a starting point, study the photos and condition report, and run the VIN for the documented history before you bid.",
      },
    },
    {
      "@type": "Question",
      name: "Can I see if a Copart car was flooded or totaled?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Enter the VIN above to run an NMVTIS-backed check that surfaces reported flood, water-damage, salvage, and total-loss brands, plus theft and odometer records where they appear in national databases. Flood and fire totals are common at salvage auctions and their damage is often hidden, so verifying the brand and loss cause by VIN is essential before committing money to a Copart lot.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need a license or membership to buy from Copart?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Copart sells primarily to registered members, and many lots — especially clean and dealer-only inventory — require a dealer or business license to bid. Public buyers can register for a Basic membership to bid on a subset of lots or buy through a licensed broker. Membership and licensing rules don't change the vehicle's history, so a VIN check remains the key step regardless of how you bid.",
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
  name: "How to Check a Copart Lot by VIN Before You Bid",
  description:
    "Verify a Copart salvage-auction vehicle's title brand and damage history with its 17-character VIN before placing a bid.",
  totalTime: "PT2M",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Find the VIN on the lot",
      text: "Open the Copart lot details and copy the 17-character VIN. If it's hidden, read it from the dashboard or door-jamb in the lot photos, or request it from Copart before bidding.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Run the VIN check",
      text: "Paste the VIN into the search tool. It queries NMVTIS, state DMVs, insurers, and salvage auctions for title brands, total-loss records, prior damage, theft, and odometer history.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Match it against the lot details",
      text: "Compare the reported title brand and loss cause to Copart's stated title type, primary damage, and condition. Mismatches — or extra history the lot doesn't mention — are a reason to dig deeper or pass.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Budget the true cost before bidding",
      text: "Add the bid, Copart buyer and gate fees, transport, parts, and repair to estimate your all-in cost. Set a hard maximum and never bid past it on a branded vehicle.",
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
      name: "Marketplace VIN Check",
      item: `${SITE}/marketplace-vin-check`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Copart",
      item: `${SITE}${PATH}`,
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
  url: `${SITE}${PATH}`,
};

/* ── Static UI data ────────────────────────────────────────────── */

const TRUST_STATS = [
  { icon: Database, value: "50-state", label: "NMVTIS sources" },
  { icon: Gavel, value: "Salvage", label: "auction-focused" },
  { icon: Shield, value: "High-risk", label: "branded titles" },
  { icon: BadgeCheck, value: "Free", label: "no sign-up" },
];

const HOW_STEPS = [
  {
    icon: Search,
    tag: "Step 1",
    title: "Grab the lot VIN",
    body: "Copy the 17-character VIN from the Copart lot page. If it's masked, read it off the dashboard or door-jamb in the lot photos, or request it from Copart before the sale closes.",
  },
  {
    icon: Database,
    tag: "Step 2",
    title: "We query the record",
    body: "The lookup pulls from NMVTIS — all 50 state DMVs, insurers, and salvage auctions — for title brands, total-loss declarations, prior damage, theft records, and odometer readings.",
  },
  {
    icon: FileText,
    tag: "Step 3",
    title: "Bid with the facts",
    body: "Match the report against the lot's stated title type and damage. Now you know whether the brand, loss cause, and mileage line up — before you commit a single dollar.",
  },
];

const TITLE_TYPES = [
  {
    icon: BadgeCheck,
    title: "Clean",
    body: "No title brand on record. Less common at salvage auctions but does appear on dealer, fleet, bank, and charity consignments. Still worth verifying by VIN.",
  },
  {
    icon: AlertTriangle,
    title: "Salvage",
    body: "An insurer declared the vehicle a total loss. It cannot be registered to drive until it's rebuilt and passes a state inspection. The most common Copart brand.",
  },
  {
    icon: Wrench,
    title: "Rebuilt / Reconstructed",
    body: "A former salvage vehicle that was repaired and re-titled after inspection. Drivable, but carries a permanent value discount and limited insurance options.",
  },
  {
    icon: Shield,
    title: "Non-Repairable / Junk",
    body: "Includes Certificate of Destruction and parts-only titles. Legally cannot be returned to the road — usable only for parts or scrap. Know this before you bid.",
  },
];

const RED_FLAGS = [
  "Primary and secondary damage that doesn't match the photos",
  "A title brand on the VIN that the lot summary doesn't mention",
  "Odometer readings that drop or stall across the history",
  "Flood or fire loss cause — damage is often hidden and spreads",
  "'Enhanced' (non-running) status when you budgeted for a runner",
  "Bidding past your all-in cap once fees and repairs are added",
];

const INTERNAL_LINKS = [
  {
    href: "/salvage-title-check",
    label: "Salvage Title Check",
    desc: "Confirm the exact brand — salvage, junk, or non-repairable — on any Copart lot.",
  },
  {
    href: "/total-loss-check",
    label: "Total Loss Check",
    desc: "See the insurance write-off behind a salvage-auction vehicle.",
  },
  {
    href: "/flood-check",
    label: "Flood Damage Check",
    desc: "Flag flood and water-damage totals, which are common at Copart.",
  },
  {
    href: "/vin-check",
    label: "Full VIN History Check",
    desc: "Title, accident, odometer, and recall records in one report.",
  },
  {
    href: "/marketplace-vin-check/iaai",
    label: "IAAI VIN Check",
    desc: "Checking the other major salvage network? Verify IAAI lots too.",
  },
  {
    href: "/vin-decoder",
    label: "VIN Decoder",
    desc: "Decode the 17-character VIN to specs, trim, and factory options.",
  },
];

/* ── Page ──────────────────────────────────────────────────────── */

export default function CopartVinCheckPage() {
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
                {
                  label: "Marketplace VIN Check",
                  href: "/marketplace-vin-check",
                },
                { label: "Copart" },
              ]}
              onDark
            />

            <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
              <Gavel className="w-4 h-4" /> Salvage Auction Lookup
              &nbsp;·&nbsp; NMVTIS-Sourced
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-headline font-extrabold leading-tight mb-4">
              Copart VIN Check —{" "}
              <span style={{ color: "var(--color-secondary-container)" }}>
                Know the Lot Before You Bid
              </span>
            </h1>

            <p className="speakable-intro text-base sm:text-xl text-white/85 max-w-3xl mb-8 leading-relaxed">
              Copart is one of the world&apos;s largest salvage auctions, and
              most of its lots are insurance total-loss vehicles sold as-is.
              Enter a 17-character VIN to surface salvage, rebuilt, flood, and
              total-loss title brands, prior-damage and theft records, and
              odometer history — free, before you place a bid.
            </p>

            <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-xl">
              <h2 className="text-base sm:text-lg font-headline font-extrabold text-primary mb-1">
                Check a Copart Lot by VIN
              </h2>
              <p className="text-xs sm:text-sm text-on-surface-variant mb-4">
                Paste the 17-character VIN from any Copart lot — we&apos;ll
                decode the vehicle and pull its title and damage history
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
              How a Copart VIN Check Works
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl">
              A salvage lot&apos;s history follows the VIN for life. Three steps
              turn that record into a clear answer before you bid.
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

          {/* ── What is Copart ───────────────────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              What Is Copart — and Why a VIN Check Matters
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl leading-relaxed">
              Copart auctions vehicles online for insurers, banks, fleets, and
              charities. The bulk of its inventory is total-loss cars sold
              as-is, which makes the documented history the single most important
              thing to verify before bidding.
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
                <p>
                  Most Copart lots come from insurance{" "}
                  <strong className="text-on-surface">total-loss claims</strong>,
                  so they typically carry a salvage, rebuilt, flood, or
                  non-repairable brand. Some clean-title dealer and fleet cars
                  also pass through, but the platform is built around damaged and
                  written-off vehicles.
                </p>
                <p>
                  Lots are sold{" "}
                  <strong className="text-on-surface">as-is, where-is</strong>{" "}
                  with no mechanical guarantee. Copart provides photos, a primary
                  and secondary damage note, and sometimes a &ldquo;Run and
                  Drive&rdquo; tag — but none of that replaces the documented
                  title and loss history tied to the VIN.
                </p>
                <p>
                  That&apos;s the gap a VIN check closes: it confirms the brand,
                  reveals the loss cause and prior damage, and flags theft or
                  odometer issues the lot summary may not mention — so you bid on
                  facts, not photos.
                </p>
              </div>
              <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Gavel className="w-5 h-5 text-primary" />
                  <h3 className="font-headline font-extrabold text-primary">
                    Where Copart inventory comes from
                  </h3>
                </div>
                <ul className="space-y-2 text-sm text-on-surface">
                  {[
                    "Insurance total-loss claims (the largest share)",
                    "Bank and lender repossessions",
                    "Fleet, rental, and lease returns",
                    "Charity and donation vehicles",
                    "Dealer trade-ins and consignments",
                  ].map((src) => (
                    <li key={src} className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>{src}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs text-on-surface-variant leading-relaxed">
                  Whatever the source, the VIN is what reveals the real history —
                  not the consignor.
                </p>
              </div>
            </div>
          </section>

          {/* ── Title types ──────────────────────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              Copart Title Types — What Each One Means
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">
              Every Copart lot is labeled with a title type. Knowing what each
              one allows — drive, rebuild, or parts-only — is the difference
              between a smart buy and a vehicle you can never register.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {TITLE_TYPES.map((c) => {
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
            <p className="mt-5 text-xs text-on-surface-variant">
              Run a{" "}
              <Link
                href="/salvage-title-check"
                className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80"
              >
                salvage title check
              </Link>{" "}
              to verify the exact brand on the VIN against what the lot claims.
            </p>
          </section>

          {/* ── Mid-page CTA ───────────────────────────────── */}
          <section className="py-10">
            <div className="rounded-3xl bg-primary p-7 sm:p-10 text-center">
              <Sparkles className="w-8 h-8 text-yellow-300 mx-auto mb-3" />
              <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-white mb-2">
                Eyeing a Specific Copart Lot?
              </h2>
              <p className="text-white/80 text-sm sm:text-base mb-6 max-w-xl mx-auto">
                Don&apos;t bid on photos alone. Run the VIN and see the title and
                damage record straight from NMVTIS sources — free, in seconds.
              </p>
              <div className="max-w-xl mx-auto bg-white rounded-2xl p-4 sm:p-5">
                <VinSearchForm size="lg" />
              </div>
            </div>
          </section>

          {/* ── How to read a lot ────────────────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              How to Read a Copart Lot Before You Bid
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">
              The lot page tells you part of the story; the VIN tells you the
              rest. Work through both, then set a hard budget.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  icon: Camera,
                  title: "Study every photo",
                  body: "Copart posts multiple images per lot. Zoom in on the frame rails, airbags, floor pans, and engine bay. Look for flood tide-lines, fire scorching, and structural folds the damage note may understate.",
                },
                {
                  icon: Tag,
                  title: "Read the lot details",
                  body: "Check the title type, primary and secondary damage, odometer status (actual vs. not-actual), and whether it's a 'Run and Drive' or 'Enhanced' (non-running) vehicle. These set your repair expectations.",
                },
                {
                  icon: FileText,
                  title: "Verify with the VIN",
                  body: "Run the VIN to confirm the brand and surface anything the lot omits — prior totals, theft recovery, or odometer rollback. Mismatches between the lot and the report are your cue to pass.",
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
                <Car className="w-5 h-5 text-on-secondary-container flex-shrink-0 mt-0.5" />
                <p className="text-sm text-on-surface leading-relaxed">
                  <strong className="text-on-surface">Budget the all-in cost.</strong>{" "}
                  Your winning bid is only the start — add Copart buyer and gate
                  fees, transport, parts, and labor. A cheap salvage lot can cost
                  more than a clean-title car once the repair bill lands.
                </p>
              </div>
            </div>
          </section>

          {/* ── Red flags ────────────────────────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">
              Copart Red Flags — When to Walk Away
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
                <p>
                  Salvage auctions reward buyers who do their homework and punish
                  those who bid on impulse. A VIN check plus a careful read of
                  the lot catches most of the costly surprises before your money
                  is committed.
                </p>
                <p>
                  The biggest risks are <strong className="text-on-surface">hidden
                  structural and flood damage</strong>, a title brand the lot
                  doesn&apos;t surface, and an odometer that doesn&apos;t add up.
                  Each one can turn a &ldquo;deal&rdquo; into a vehicle you
                  can&apos;t safely drive or legally register.
                </p>
                <p>
                  When the report and the lot disagree — or when the numbers stop
                  making sense once fees and repairs are added — the right move is
                  to pass. There&apos;s always another lot.
                </p>
              </div>
              <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <ClipboardCheck className="w-5 h-5 text-primary" />
                  <h3 className="font-headline font-extrabold text-primary">
                    Pre-bid red-flag checklist
                  </h3>
                </div>
                <ul className="space-y-2 text-sm text-on-surface">
                  {RED_FLAGS.map((tip) => (
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
                    Verify the lot history by VIN first:
                  </p>
                  <VinSearchForm size="sm" />
                </div>
              </div>
            </div>
          </section>

          {/* ── Internal links ─────────────────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              More VIN Checks That Pair With a Copart Lookup
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-7">
              A salvage auction lot has many layers. These checks fill in the
              rest of the picture.
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
              Copart VIN Check — Frequently Asked Questions
            </h2>
            <p className="text-sm text-on-surface-variant mb-8">
              The questions buyers ask most before bidding on a Copart lot.
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
              Check a Copart Lot Before You Bid
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl mx-auto mb-8">
              Enter the 17-character VIN from any Copart lot to check for
              salvage, rebuilt, flood, and total-loss title brands, prior
              damage, theft, and odometer history.
            </p>
            <div className="max-w-xl mx-auto bg-surface-container-low rounded-2xl p-5 border border-outline-variant">
              <VinSearchForm size="lg" />
            </div>
            <div className="mt-3 flex items-center justify-center gap-2 text-xs text-on-surface-variant">
              <Check className="w-3.5 h-3.5 text-green-500" strokeWidth={3} />
              No credit card · No sign-up · Free
            </div>
          </section>

          <RelatedChecks exclude="/marketplace-vin-check" />
        </div>
      </article>
    </>
  );
}
