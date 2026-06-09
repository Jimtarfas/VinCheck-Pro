import type { Metadata } from "next";
import Link from "next/link";
import {
  Check,
  Shield,
  Search,
  FileText,
  Database,
  ChevronRight,
  Lock,
  Zap,
  BadgeCheck,
  Sparkles,
  AlertTriangle,
  Banknote,
  Wrench,
  Warehouse,
  Landmark,
  Gavel,
  Car,
  Eye,
  HandCoins,
  ClipboardCheck,
  XCircle,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import VinCheckBanner from "@/components/VinCheckBanner";
import RelatedChecks from "@/components/RelatedChecks";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";

export const metadata: Metadata = {
  title:
    "Free Vehicle Lien Check — Find Hidden Loans, Liens & Repos by VIN",
  description:
    "Check any vehicle for hidden liens, outstanding loans, repossession records, and sale history before you buy — free. VIN-based lien lookup that protects you from inheriting someone else's debt.",
  keywords: [
    "vehicle lien check",
    "car lien check",
    "free lien check",
    "check car for lien",
    "vehicle lien search",
    "vin lien check",
    "car loan lien check",
    "check vehicle for liens",
    "free car lien lookup",
    "lien check by vin",
    "lien search free",
    "outstanding loan car check",
    "lienholder lookup",
    "dmv lien check",
    "car repossession history",
    "vehicle repo check",
    "title lien check",
    "lienholder by vin",
    "is there a lien on my car",
    "check if car has lien before buying",
    "find lien on vehicle",
    "free vehicle lien search",
    "lienholder release check",
    "car finance check",
    "car finance lookup free",
    "outstanding finance check",
    "vehicle finance check",
    "lien holder lookup vehicle",
    "check lien holder car",
    "auto loan lien check",
    "free dmv lien search",
  ],
  alternates: { canonical: "/vehicle-lien-check" },
  openGraph: {
    title:
      "Free Vehicle Lien Check — Find Hidden Loans, Liens & Repos by VIN",
    description:
      "Check any vehicle for hidden liens, outstanding loans, repossession records, and sale history before you buy. Free VIN-based lien lookup.",
    url: `${SITE}/vehicle-lien-check`,
    type: "article",
    siteName: "CarCheckerVIN",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Free Vehicle Lien Check — Find Hidden Loans, Liens & Repos by VIN",
    description:
      "Free VIN-based lien lookup. Find hidden loans, liens, and repo records before you buy.",
  },
  robots: { index: true, follow: true },
};

/* ── JSON-LD schemas ───────────────────────────────────────────── */

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Vehicle Lien Check",
  url: `${SITE}/vehicle-lien-check`,
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any",
  description:
    "Free VIN-based vehicle lien check. Surfaces auto loan liens, mechanic's liens, storage liens, tax liens, judgment liens, and repossession history.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  // aggregateRating intentionally omitted. Small honest counts on a young
  // domain read worse to AI overviews than no aggregate at all. The
  // verified Trustpilot reviews on the homepage Product JSON-LD carry the
  // social proof per-row, each linked to its source URL.
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Free Vehicle Lien Check by VIN",
  description:
    "How to check a vehicle for hidden liens by VIN, the six lien types that block a title transfer, red flags of an undisclosed lien, and how to close safely if you find one.",
  author: ORG_AUTHOR,
  publisher: {
    "@type": "Organization",
    name: "CarCheckerVIN",
    url: SITE,
    logo: { "@type": "ImageObject", url: `${SITE}/logo.png` },
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${SITE}/vehicle-lien-check`,
  },
  datePublished: "2026-05-04",
  dateModified: "2026-06-09",
};

const faqs = [
  {
    q: "Is a free VIN lien check actually accurate?",
    a: "A free consumer-grade VIN lien check pulls from public state DMV title brand records, NMVTIS, and reported lender filings. It catches the vast majority of recorded liens, but commercial NMVTIS searches that cost $20–$45 occasionally surface very recent filings (within the last 7–14 days) that have not yet propagated to public feeds. For a private-party purchase, run our free check first and request a paid NMVTIS report from an approved provider only if anything looks ambiguous.",
  },
  {
    q: "Can a seller hide a lien?",
    a: "Yes. A seller can show you a paper title that looks clean even when an active lien exists, especially if the title was issued before the loan was taken out, if the title is a duplicate, or if the lien was recorded with the lender but never updated on the physical title. Always verify independently using the VIN — the lien attaches to the VIN, not to whatever piece of paper the seller hands you.",
  },
  {
    q: "What happens if I buy a car with a lien?",
    a: "You do not legally own it. The lender holds the security interest in the vehicle until the loan is paid off. If the seller stops making payments — or never planned to make them — the lender can repossess the car from your driveway and you have no legal recourse against them. Your only remedy is a civil suit against the seller, who has likely already disappeared with your cash.",
  },
  {
    q: "How long does a lien stay on a title?",
    a: "A lien stays on the title until the debt is satisfied AND the lender files a lien release with the state DMV. Many old satisfied liens never get released because lenders close, get acquired, or simply forget. Even a long-paid-off lien that was never released can block a title transfer years later, so always confirm release status before you buy.",
  },
  {
    q: "Can I check a lien for free at the DMV?",
    a: "Some states offer a free or low-cost lien lookup directly through their DMV portal, but most charge a fee — typically $5 to $25 — for an official title and lien record search. Our VIN-based check is free and pulls from the same underlying state DMV reporting feeds, so it is usually the fastest first step before you decide whether you need an official certified record.",
  },
  {
    q: "What is a UCC-1 filing?",
    a: "A UCC-1 (Uniform Commercial Code) financing statement is a public notice that a lender has a security interest in a piece of collateral. For commercial vehicles, fleet vehicles, and some heavy equipment, the lien is recorded as a UCC-1 with the secretary of state rather than on the DMV title. If you are buying a commercial vehicle, always run both a DMV title lien check AND a UCC-1 search.",
  },
  {
    q: "Can I remove an old satisfied lien?",
    a: "Yes. If you have already paid off your loan but the lien is still showing on the title, request a lien release letter from the lender (sometimes called a 'satisfaction of lien'). Submit that letter to your state DMV with the appropriate form and a small fee, and the DMV will issue a new title with the lien removed. Doing this before you sell saves the buyer a major headache.",
  },
  {
    q: "Do private-party sellers have to disclose liens?",
    a: "It depends on the state. Roughly 13 states require explicit lien disclosure on private-party sales, and the rest leave it to buyer beware. Even in disclosure states, enforcement is weak and the legal remedy comes after the damage is done. Treat every private-party sale as a no-disclosure state: assume nothing, verify the VIN yourself.",
  },
  {
    q: "What is the difference between a lien and an encumbrance?",
    a: "A lien is a specific legal claim that secures a debt — the lender can repossess the vehicle if you do not pay. An encumbrance is a broader term that covers any restriction on a property's use or transfer, including liens, leases, easements, and use restrictions. Every lien is an encumbrance, but not every encumbrance is a lien.",
  },
  {
    q: "How do I check for a lien if the seller refuses to share the VIN?",
    a: "You walk away. A seller who will not share the 17-character VIN before a sale is hiding something — and the most common thing they are hiding is a lien, a salvage brand, or stolen status. The VIN is not private information; it is visible through the windshield from the street. A refusal to provide it is itself the red flag.",
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
  name: "How to Check a Vehicle for a Lien",
  description:
    "Run a free VIN-based lien check in four steps: enter the VIN, query state DMV and lender registries, review lien holder and status, and follow a protection plan.",
  totalTime: "PT2M",
  estimatedCost: { "@type": "MonetaryAmount", currency: "USD", value: "0" },
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Enter the 17-character VIN",
      text: "Locate the 17-character Vehicle Identification Number on the dashboard, driver-side door jamb, or title document, then enter it into the search box at the top of the page.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "We query state DMV and lender registries",
      text: "We cross-reference the VIN against state DMV title brand records, NMVTIS, UCC-1 filings, and reported lender registries to surface any active or historical liens.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Review the lien holder and current status",
      text: "The report shows the name of the lien holder, the type of lien, when it was filed, and whether it is currently active or has been released. Active liens require payoff before the title can transfer to you.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Follow your protection plan",
      text: "If a lien is active, request a lien payoff letter, use an escrow service, or close the deal directly at the lender's office. If the seller cannot or will not cooperate, walk away.",
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: `${SITE}/`,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Vehicle Lien Check",
      item: `${SITE}/vehicle-lien-check`,
    },
  ],
};

const speakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Free Vehicle Lien Check",
  url: `${SITE}/vehicle-lien-check`,
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["h1", ".speakable-intro", ".speakable-faq"],
  },
};

/* ── Static UI data ────────────────────────────────────────────── */

const TRUST_STATS = [
  { icon: Database, value: "NMVTIS", label: "+ DMV feeds" },
  { icon: Banknote, value: "Lien holder", label: "& status" },
  { icon: Car, value: "Repo", label: "history" },
  { icon: Zap, value: "Free", label: "no sign-up" },
];

const HOW_STEPS = [
  {
    icon: Search,
    tag: "Step 1",
    title: "Enter the VIN",
    body: "Type the 17-character VIN from the dashboard, door jamb, or title. A lien attaches to the VIN — not to whatever piece of paper the seller hands you.",
  },
  {
    icon: Database,
    tag: "Step 2",
    title: "We query DMV + lender registries",
    body: "The lookup cross-references NMVTIS, all 50 state DMV title-brand feeds, UCC-1 commercial filings, and reported lender registries into one lien picture.",
  },
  {
    icon: FileText,
    tag: "Step 3",
    title: "See holder, type, and status",
    body: "The report shows the lien holder, the lien type, the filing date, and whether it's active or released. An active lien blocks the title transfer until it's paid.",
  },
];

const LIEN_TYPES = [
  {
    icon: Banknote,
    title: "Auto loan liens",
    body: "The most common. Filed by banks, credit unions, and dealer-finance arms — stay on the title until the loan is paid and a release is filed.",
  },
  {
    icon: Wrench,
    title: "Mechanic's liens",
    body: "Filed by a repair shop when an owner refuses to pay for completed work. The shop can hold and eventually sell the car.",
  },
  {
    icon: Warehouse,
    title: "Storage liens",
    body: "Filed by tow yards, parking facilities, or impound lots over unpaid fees — common on cars impounded after an accident or police hold.",
  },
  {
    icon: Landmark,
    title: "Tax liens",
    body: "Filed by the IRS or a state against any property the debtor owns, including the vehicle. Federal tax liens are particularly aggressive.",
  },
  {
    icon: Gavel,
    title: "Judgment liens",
    body: "The result of a civil lawsuit where a court orders payment. The creditor can attach the judgment to the debtor's vehicle title.",
  },
  {
    icon: Car,
    title: "Repossession records",
    body: "Not technically a lien, but a critical companion record showing whether the car was previously repossessed and re-sold.",
  },
];

const RED_FLAGS = [
  "Title says \"Original\" but the seller can't produce a physical title",
  "Title lists a lienholder — \"it's paid off\" means nothing without a release",
  "Cash only; refuses cashier's checks, escrow, or traceable payment",
  "Wants to \"just sign the title over\" or has only a duplicate or bill of sale",
  "Asking price far below market with no clear, verifiable explanation",
  "Urgent sale — \"moving overseas tomorrow,\" pressure to skip paperwork",
];

const PROTECT_OPTIONS = [
  {
    icon: HandCoins,
    title: "Use an escrow service",
    body: "Escrow holds your funds, pays the loan payoff to the lender directly, and releases the rest to the seller only after release is confirmed. Costs $50–$500 and removes almost all the risk.",
  },
  {
    icon: FileText,
    title: "Get a lien payoff letter",
    body: "Have the seller request a 10-day payoff letter stating the exact balance. It proves the lien is real and gives you a fixed number to negotiate against.",
  },
  {
    icon: Landmark,
    title: "Close at the lender",
    body: "Meet at the lender's office, pay the lender directly, and walk out with a lien release in hand and the title ready to sign over to you.",
  },
  {
    icon: XCircle,
    title: "Walk away",
    body: "If the seller can't or won't cooperate with any of the above, the deal isn't worth it. There are always more cars.",
  },
];

const INTERNAL_LINKS = [
  {
    href: "/stolen-vehicle-check",
    label: "Stolen Vehicle Check",
    desc: "A seller hiding a lien may be hiding stolen status too — verify both by VIN.",
  },
  {
    href: "/salvage-title-check",
    label: "Salvage Title Check",
    desc: "Liens and branded titles both block a clean transfer — check the title history.",
  },
  {
    href: "/total-loss-check",
    label: "Total Loss Check",
    desc: "An insurer write-off often travels with repo and lien complications.",
  },
  {
    href: "/vin-check-vs-carfax",
    label: "CarCheckerVIN vs Carfax",
    desc: "See how our free lien data compares to the paid full-history bundles.",
  },
  {
    href: "/vin-check",
    label: "Full VIN History Check",
    desc: "Liens, title brands, accidents, odometer, and theft in one complete report.",
  },
  {
    href: "/vin-decoder",
    label: "VIN Decoder",
    desc: "Decode the 17-character VIN to specs, trim, and factory build details.",
  },
];

/* ── Page ──────────────────────────────────────────────────────── */

export default function VehicleLienCheckPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }}
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
                { label: "Vehicle Lien Check" },
              ]}
              onDark
            />

            <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
              <Lock className="w-4 h-4" /> Hidden-Loan Lookup
              &nbsp;·&nbsp; NMVTIS-Backed
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-headline font-extrabold leading-tight mb-4">
              Free Vehicle Lien Check by VIN —{" "}
              <span style={{ color: "var(--color-secondary-container)" }}>
                Do You Really Own It?
              </span>
            </h1>

            <p className="speakable-intro text-base sm:text-xl text-white/85 max-w-3xl mb-8 leading-relaxed">
              Buying a used car with an undisclosed lien means you don&apos;t own
              it — the lender does, and they can repossess it from your driveway
              whenever they want. Enter a 17-character VIN to surface hidden
              loans, repossession records, and sale history in seconds — free, so
              you never inherit somebody else&apos;s debt.
            </p>

            <div
              id="lien-search"
              className="bg-white rounded-2xl p-5 sm:p-7 shadow-xl"
            >
              <h2 className="text-base sm:text-lg font-headline font-extrabold text-primary mb-1">
                Run a Free Vehicle Lien Check
              </h2>
              <p className="text-xs sm:text-sm text-on-surface-variant mb-4">
                Enter any 17-character VIN — we&apos;ll surface any active or
                historical lien and the lien holder on record
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
              How a VIN Lien Check Works
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl">
              A lien is recorded against the VIN, not the paper title. Three
              steps turn scattered DMV and lender records into a clear answer on
              whether the car is truly free to sell.
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

          {/* ── What is a vehicle lien ───────────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              What Is a Vehicle Lien — and Why It Follows the Car
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
                <p>
                  A vehicle lien is a lender&apos;s legal claim against a
                  specific car that secures the right to{" "}
                  <strong className="text-on-surface">repossess</strong> it if a
                  debt isn&apos;t paid. The lien attaches to the VIN and the
                  title — not to the borrower personally — so it travels with the
                  car through every ownership change until it&apos;s formally
                  satisfied and released.
                </p>
                <p>
                  Most liens come from auto loans, but a car can also carry a
                  mechanic&apos;s lien, a storage lien, an IRS or state tax lien,
                  or a judgment lien. Any one of them is enough to block a clean
                  title transfer at the DMV.
                </p>
                <p>
                  The key point: the seller&apos;s paper title may read
                  &ldquo;clean&rdquo; or stay silent, but the underlying DMV
                  record still shows the encumbrance. That&apos;s why a{" "}
                  <strong className="text-on-surface">VIN-based</strong> lien
                  check beats reading the title document.
                </p>
              </div>
              <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="w-5 h-5 text-primary" />
                  <h3 className="font-headline font-extrabold text-primary">
                    Three ways skipping it goes wrong
                  </h3>
                </div>
                <ul className="space-y-3 text-sm text-on-surface">
                  <li className="flex items-start gap-2 rounded-lg bg-white px-3.5 py-2.5 border border-outline-variant/60">
                    <Banknote className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>You inherit the debt.</strong> Seller vanishes,
                      lender repos, no refund.
                    </span>
                  </li>
                  <li className="flex items-start gap-2 rounded-lg bg-white px-3.5 py-2.5 border border-outline-variant/60">
                    <FileText className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>You can&apos;t title it.</strong> The DMV blocks
                      transfer until the lien is released.
                    </span>
                  </li>
                  <li className="flex items-start gap-2 rounded-lg bg-white px-3.5 py-2.5 border border-outline-variant/60">
                    <AlertTriangle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>Repo years later.</strong> An old unreleased lien
                      can surface long after you buy.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* ── Lien types ───────────────────────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              The Six Lien Types We Surface
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">
              A &ldquo;lien&rdquo; is not just an auto loan. Six common types show
              up on used-vehicle titles — any one can block your purchase.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {LIEN_TYPES.map((l) => {
                const Icon = l.icon;
                return (
                  <div
                    key={l.title}
                    className="rounded-2xl border border-outline-variant bg-surface p-5"
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-base font-headline font-extrabold text-primary mb-1">
                      {l.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                      {l.body}
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
                Does This Car Carry a Hidden Lien?
              </h2>
              <p className="text-white/80 text-sm sm:text-base mb-6 max-w-xl mx-auto">
                Don&apos;t rely on the paper title — it can look clean over an
                active loan. Run the VIN to see the lien holder and status, free,
                in seconds.
              </p>
              <div className="max-w-xl mx-auto bg-white rounded-2xl p-4 sm:p-5">
                <VinSearchForm size="lg" />
              </div>
            </div>
          </section>

          {/* ── Free vs paid ─────────────────────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              Free vs. Paid — What You Actually Need
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl leading-relaxed">
              For a private-party purchase, you don&apos;t need to spend $44.99.
              Here&apos;s where each option fits.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-2xl border border-primary/30 bg-primary/5 p-5 sm:p-6">
                <div className="text-[11px] font-black uppercase tracking-wider text-primary mb-2">
                  CarCheckerVIN
                </div>
                <p className="text-lg font-headline font-extrabold text-primary mb-3">
                  Free
                </p>
                <ul className="space-y-2 text-sm text-on-surface-variant">
                  <li className="flex gap-2"><span>·</span><span>NMVTIS-fed lien status and lien holder.</span></li>
                  <li className="flex gap-2"><span>·</span><span>Repossession history included.</span></li>
                  <li className="flex gap-2"><span>·</span><span>Instant, no sign-up — the right first step.</span></li>
                </ul>
              </div>
              <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5 sm:p-6">
                <div className="text-[11px] font-black uppercase tracking-wider text-on-surface-variant mb-2">
                  State DMV search
                </div>
                <p className="text-lg font-headline font-extrabold text-on-surface mb-3">
                  $5–$25
                </p>
                <ul className="space-y-2 text-sm text-on-surface-variant">
                  <li className="flex gap-2"><span>·</span><span>Official certified record.</span></li>
                  <li className="flex gap-2"><span>·</span><span>Often slow — mail-in or in-person.</span></li>
                  <li className="flex gap-2"><span>·</span><span>One state's coverage at a time.</span></li>
                </ul>
              </div>
              <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5 sm:p-6">
                <div className="text-[11px] font-black uppercase tracking-wider text-on-surface-variant mb-2">
                  Carfax / AutoCheck
                </div>
                <p className="text-lg font-headline font-extrabold text-on-surface mb-3">
                  $24.99–$44.99
                </p>
                <ul className="space-y-2 text-sm text-on-surface-variant">
                  <li className="flex gap-2"><span>·</span><span>Full history: accidents and service.</span></li>
                  <li className="flex gap-2"><span>·</span><span>Lien data is the same NMVTIS feed we use.</span></li>
                  <li className="flex gap-2"><span>·</span><span>Overkill just to confirm a lien.</span></li>
                </ul>
              </div>
            </div>
            <div className="mt-6 rounded-2xl bg-secondary-container/40 border border-outline-variant p-5 sm:p-6">
              <div className="flex items-start gap-3">
                <BadgeCheck className="w-5 h-5 text-on-secondary-container flex-shrink-0 mt-0.5" />
                <p className="text-sm text-on-surface leading-relaxed">
                  <strong className="text-on-surface">
                    Just confirming a lien?
                  </strong>{" "}
                  Our free check is enough. If you want the full history bundle,
                  see our{" "}
                  <Link
                    href="/vin-check-vs-carfax"
                    className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80"
                  >
                    CarCheckerVIN vs Carfax
                  </Link>{" "}
                  comparison.
                </p>
              </div>
            </div>
          </section>

          {/* ── Red flags ────────────────────────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">
              Red Flags That Suggest a Hidden Lien
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
                <p>
                  Before you even run the VIN, certain seller behaviors point
                  strongly to an undisclosed lien. Any one of these is reason to
                  slow down and verify the VIN yourself.
                </p>
                <p>
                  Lien disclosure rules vary —{" "}
                  <strong className="text-on-surface">
                    roughly 13 states require explicit disclosure
                  </strong>{" "}
                  on private-party sales, and the rest are buyer-beware. Even in
                  disclosure states, the legal remedy arrives long after the
                  damage is done. Treat every private-party sale as
                  no-disclosure: assume nothing, verify the VIN.
                </p>
                <div className="rounded-xl bg-white p-4 border border-outline-variant">
                  <p className="text-xs font-bold text-on-surface mb-2">
                    Run the VIN before you hand over a dollar:
                  </p>
                  <VinSearchForm size="sm" />
                </div>
              </div>
              <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Eye className="w-5 h-5 text-primary" />
                  <h3 className="font-headline font-extrabold text-primary">
                    Hidden-lien warning signs
                  </h3>
                </div>
                <ul className="space-y-2 text-sm text-on-surface">
                  {RED_FLAGS.map((flag) => (
                    <li key={flag} className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>{flag}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* ── What to do if you find a lien ────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              What to Do If You Find a Lien
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">
              An active lien isn&apos;t automatically a deal-breaker — but it
              absolutely changes how you close. Pick the option that matches your
              risk tolerance.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {PROTECT_OPTIONS.map((p) => {
                const Icon = p.icon;
                return (
                  <div
                    key={p.title}
                    className="rounded-2xl border border-outline-variant bg-surface p-5"
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-base font-headline font-extrabold text-primary mb-1">
                      {p.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                      {p.body}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ── Why it matters ───────────────────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              Why a Lien Check Matters Before You Buy
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">
              A lien tied to the VIN decides whether you can legally own and
              register the car at all — and whether your money is safe.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  icon: Banknote,
                  title: "Protect your money",
                  body: "Buy over an active lien and the lender can repossess the car you paid for — with no refund and the seller long gone.",
                },
                {
                  icon: ClipboardCheck,
                  title: "Protect your title",
                  body: "An unreleased lien blocks DMV transfer. Confirming release status first means you can actually register and insure the car.",
                },
                {
                  icon: BadgeCheck,
                  title: "Verify, don't trust",
                  body: "A clean-looking paper title can hide an active loan. The VIN-tied DMV record — not the seller's word — is the only reliable proof.",
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
              More VIN Checks That Pair With a Lien Check
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-7">
              A lien is one piece of the puzzle. These checks complete the
              pre-purchase picture before you buy.
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
              Vehicle Lien Check — Frequently Asked Questions
            </h2>
            <p className="text-sm text-on-surface-variant mb-8">
              The questions buyers ask most about liens, lien holders, and
              closing safely.
            </p>
            <div className="speakable-faq space-y-3">
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

          {/* ── Bottom CTA ─────────────────────────────────── */}
          <section className="py-14 sm:py-20 text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-xs font-black uppercase tracking-wider mb-4">
              <Zap className="w-3.5 h-3.5" /> Free · Instant · NMVTIS-Backed
            </div>
            <h2 className="text-2xl sm:text-4xl font-headline font-extrabold text-primary mb-3">
              Run Your Free Lien Check Now
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl mx-auto mb-8">
              Two minutes today saves you a lifetime of someone else&apos;s debt.
              Enter the VIN and see every recorded lien, lien holder, and repo on
              file instantly.
            </p>
            <div className="max-w-xl mx-auto bg-surface-container-low rounded-2xl p-5 border border-outline-variant">
              <VinSearchForm size="lg" />
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-on-surface-variant">
              <span className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-green-500" /> NMVTIS-backed data
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-green-500" strokeWidth={3} /> No
                sign-up · Free
              </span>
            </div>
          </section>

          <RelatedChecks exclude="/vehicle-lien-check" />
        </div>
      </article>
    </>
  );
}
