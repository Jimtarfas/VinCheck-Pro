import type { Metadata } from "next";
import Link from "next/link";
import { hreflangAlternates } from "@/lib/seo/hreflang";
import {
  Check,
  X,
  DollarSign,
  ShieldCheck,
  Camera,
  BadgeCheck,
  Clock,
  Scale,
  Gauge,
  Database,
  Zap,
  ChevronRight,
  ArrowRight,
  Award,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";
import { ORG_AUTHOR } from "@/lib/seo/author";
import { SINGLE_PRICE_CENTS, getBundle, formatUsd } from "@/lib/pricing";

const SITE = "https://www.carcheckervin.com";

/* ── Canonical pricing (single source: pricing.ts) ───────────────── */
const SINGLE = formatUsd(SINGLE_PRICE_CENTS); // $9.99
const B3 = formatUsd(getBundle(3)!.priceCents); // $23.99
const B5 = formatUsd(getBundle(5)!.priceCents); // $34.99
const B10 = formatUsd(getBundle(10)!.priceCents); // $59.99
// AutoCheck consumer retail pricing (public autocheck.com pricing).
const AC_SINGLE = "$24.99";
const AC_BUNDLE = "$49.99 (25 reports)";

export const metadata: Metadata = {
  title: "CarCheckerVIN vs AutoCheck: 2026 Comparison",
  description: `CarCheckerVIN vs AutoCheck (by Experian) compared on price, data sources, and report depth. ${SINGLE} per report versus AutoCheck's ${AC_SINGLE} — without the AutoCheck Score paywall.`,
  keywords: [
    "carfax alternative",
    "autocheck vs",
    "experian autocheck",
    "autocheck cost",
    "is autocheck good",
    "autocheck alternative",
    "autocheck vs carfax",
    "best vin check 2026",
    "autocheck score explained",
    "autocheck unlimited reports",
    "cheaper than autocheck",
    "autocheck price",
  ],
  alternates: hreflangAlternates("/vin-check-vs-autocheck"),
  openGraph: {
    title: "CarCheckerVIN vs AutoCheck: 2026 Comparison",
    description:
      "Compare CarCheckerVIN with Experian AutoCheck on pricing, data, and the AutoCheck Score. A fair side-by-side breakdown for used-car buyers.",
    url: `${SITE}/vin-check-vs-autocheck`,
    type: "article",
    siteName: "CarCheckerVIN",
  },
  twitter: {
    card: "summary_large_image",
    title: "CarCheckerVIN vs AutoCheck: 2026 Comparison",
    description: `${SINGLE} per report versus AutoCheck's ${AC_SINGLE}. Same core NMVTIS data, plus real photos and a market value.`,
  },
  robots: { index: true, follow: true },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "CarCheckerVIN vs AutoCheck: 2026 Comparison",
  description:
    "A side-by-side comparison of CarCheckerVIN and Experian AutoCheck covering pricing, data sources, the AutoCheck Score, and the right use case for each.",
  author: ORG_AUTHOR,
  publisher: {
    "@type": "Organization",
    name: "CarCheckerVIN",
    url: SITE,
    logo: { "@type": "ImageObject", url: `${SITE}/logo.png` },
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${SITE}/vin-check-vs-autocheck`,
  },
  datePublished: "2026-04-26",
  dateModified: "2026-06-16",
  image: `${SITE}/opengraph-image`,
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the difference between CarCheckerVIN and AutoCheck?",
      acceptedAnswer: {
        "@type": "Answer",
        text: `AutoCheck, owned by Experian, is a vehicle history service best known for the AutoCheck Score and strong wholesale auction-lane data. CarCheckerVIN delivers the same core records (title brands, accidents, odometer, theft, and recalls) at a lower price (${SINGLE} versus ${AC_SINGLE} per single report) and adds real vehicle photos and a market value estimate that AutoCheck does not include at the consumer tier. CarCheckerVIN also offers a free instant VIN decode with no account required.`,
      },
    },
    {
      "@type": "Question",
      name: "What is the AutoCheck Score?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The AutoCheck Score is Experian's proprietary 0-100 number that rolls a vehicle's age, mileage, title brands, and reported events into a single summary metric, then compares it against a similar peer group of vehicles. It is genuinely popular at wholesale auctions, where buyers need a quick relative ranking across hundreds of vehicles in one session. CarCheckerVIN does not publish a proprietary risk score; it gives you the underlying NMVTIS, NICB, and DMV records to judge yourself.",
      },
    },
    {
      "@type": "Question",
      name: "Is CarCheckerVIN cheaper than AutoCheck?",
      acceptedAnswer: {
        "@type": "Answer",
        text: `Yes. CarCheckerVIN charges ${SINGLE} for a single report, well under half of AutoCheck's ${AC_SINGLE} single-report price. CarCheckerVIN also sells prepaid report bundles: ${B3} for 3 reports, ${B5} for 5, and ${B10} for 10, with the extra reports saved to your account as credits valid for 12 months. AutoCheck's 25-report package runs ${AC_BUNDLE.split(" (")[0]} and is valid for 21 days. For a buyer cross-shopping a few cars, CarCheckerVIN is the lower-cost option for the same essential data.`,
      },
    },
    {
      "@type": "Question",
      name: "Do CarCheckerVIN and AutoCheck use the same data?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Both pull from the same backbone of public and industry data: NMVTIS for title brands, all 50 state DMVs, the NICB for stolen vehicle records, the NHTSA for recalls, and insurance industry feeds for accident and total-loss events. Experian's position gives AutoCheck strong auction-lane data, while CarCheckerVIN adds partner data exchanges for accident and salvage events. For 95% of used-car shoppers, the critical data points are essentially identical between the two providers.",
      },
    },
    {
      "@type": "Question",
      name: "Which is better for dealers and auctions versus private buyers?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "AutoCheck makes the most sense for wholesale and auction buyers who genuinely use the AutoCheck Score to rank dozens of vehicles per session, or who run high report volume each month using the 25-report bundle. CarCheckerVIN fits private-party buyers comparing one to five vehicles who want real photos, a market value estimate, and to read the raw records themselves at a much lower per-report price.",
      },
    },
    {
      "@type": "Question",
      name: "Is there a free alternative to AutoCheck?",
      acceptedAnswer: {
        "@type": "Answer",
        text: `CarCheckerVIN offers a free instant VIN decode that returns factory build data without creating an account, something AutoCheck does not provide. The free decode covers the VIN breakdown, but full history records (NMVTIS title brands, accidents, odometer timeline, theft check, recalls, and real photos) require a paid CarCheckerVIN report starting at ${SINGLE}, still well under half of AutoCheck's single-report price.`,
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
      name: "CarCheckerVIN vs AutoCheck",
      item: `${SITE}/vin-check-vs-autocheck`,
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
  url: `${SITE}/vin-check-vs-autocheck`,
};

const FAQS = faqSchema.mainEntity.map((q) => ({
  question: q.name,
  answer: q.acceptedAnswer.text,
}));

const TRUST_STATS = [
  { icon: DollarSign, value: SINGLE, label: "per single report" },
  { icon: ShieldCheck, value: "NMVTIS", label: "federally-sourced" },
  { icon: Camera, value: "Photos", label: "real vehicle photos" },
  { icon: Clock, value: "< 5 sec", label: "average lookup time" },
  { icon: BadgeCheck, value: "Free", label: "VIN decode, no signup" },
];

const HEADLINE_STATS = [
  { value: SINGLE, label: `CarCheckerVIN single report (vs ${AC_SINGLE})` },
  { value: "Free", label: "Instant VIN decode, no account needed" },
  { value: "All 50", label: "state DMVs plus NMVTIS coverage" },
  { value: "0-100", label: "AutoCheck Score we let you skip" },
];

const comparisonRows: {
  feature: string;
  carchecker: boolean | string;
  competitor: boolean | string;
}[] = [
  { feature: "Single report price", carchecker: SINGLE, competitor: AC_SINGLE },
  {
    feature: "Report bundles",
    carchecker: `${B3} (3) · ${B10} (10)`,
    competitor: AC_BUNDLE,
  },
  { feature: "Free VIN decode (no account)", carchecker: true, competitor: false },
  { feature: "NMVTIS title brand data", carchecker: true, competitor: true },
  { feature: "Salvage / rebuilt brand check", carchecker: true, competitor: true },
  { feature: "Accident history records", carchecker: true, competitor: true },
  { feature: "Odometer / mileage timeline", carchecker: true, competitor: true },
  { feature: "Stolen vehicle (NICB) check", carchecker: true, competitor: true },
  { feature: "Open recall lookup", carchecker: true, competitor: true },
  { feature: "Manufacturer buyback / lemon", carchecker: true, competitor: true },
  { feature: "Real vehicle photos", carchecker: true, competitor: false },
  { feature: "Market value estimate", carchecker: true, competitor: false },
  { feature: "Proprietary risk score (0-100)", carchecker: false, competitor: true },
  { feature: "Auction-lane data (dealer focus)", carchecker: false, competitor: true },
  { feature: "No subscription required", carchecker: true, competitor: true },
  { feature: "Instant download report", carchecker: true, competitor: true },
];

function Cell({ value }: { value: boolean | string }) {
  if (typeof value === "string") {
    return <span className="font-bold text-on-surface">{value}</span>;
  }
  return value ? (
    <Check className="w-5 h-5 text-emerald-500 mx-auto" strokeWidth={2.5} />
  ) : (
    <X className="w-5 h-5 text-slate-400 mx-auto" />
  );
}

export default function VinCheckVsAutoCheckPage() {
  return (
    <>
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
                { label: "CarCheckerVIN vs AutoCheck" },
              ]}
              onDark
            />

            <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
              <Scale className="w-4 h-4" /> AutoCheck Alternative &nbsp;·&nbsp; 2026 Comparison
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-headline font-extrabold leading-tight mb-4">
              CarCheckerVIN vs AutoCheck —{" "}
              <span style={{ color: "var(--color-secondary-container)" }}>
                Same Data, {SINGLE} Instead of {AC_SINGLE}
              </span>
            </h1>

            <p className="speakable-intro text-base sm:text-xl text-white/85 max-w-3xl mb-8 leading-relaxed">
              {`AutoCheck, owned by Experian, is the second most recognized vehicle history brand in the US after Carfax, best known for the 0-100 AutoCheck Score. CarCheckerVIN takes a different approach: ${SINGLE} per report, real vehicle photos, a market value estimate, and a free instant decode you can run without an account. Here is an honest, fact-checked side-by-side.`}
            </p>

            <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-xl">
              <h2 className="text-base sm:text-lg font-headline font-extrabold text-primary mb-1">
                Run a VIN Check Now
              </h2>
              <p className="text-xs sm:text-sm text-on-surface-variant mb-4">
                {`Free instant decode, or a full history report for ${SINGLE}`}
              </p>
              <VinSearchForm size="lg" />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-8">
              {TRUST_STATS.map((s) => {
                const Icon = s.icon;
                return (
                  <div
                    key={s.label}
                    className="bg-white/10 border border-white/15 rounded-xl px-3 py-3 text-center"
                  >
                    <Icon className="w-5 h-5 mx-auto mb-1 text-white/70" />
                    <div className="text-lg sm:text-xl font-headline font-black text-white">
                      {s.value}
                    </div>
                    <div className="text-[10px] sm:text-[11px] text-white/65 leading-tight mt-0.5">
                      {s.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Stats block ───────────────────────────────────────── */}
        <section
          aria-labelledby="ac-stats-heading"
          className="max-w-5xl mx-auto px-4 sm:px-6 -mt-8 sm:-mt-10 relative z-10"
        >
          <div className="rounded-3xl bg-surface-container shadow-md border border-outline-variant p-5 sm:p-7">
            <h2
              id="ac-stats-heading"
              className="text-xs sm:text-sm font-headline font-black uppercase tracking-widest text-primary mb-4 sm:mb-5"
            >
              CarCheckerVIN vs AutoCheck — By the Numbers
            </h2>
            <dl className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {HEADLINE_STATS.map((s) => (
                <div key={s.label} className="rounded-2xl bg-primary px-4 py-4 sm:py-5">
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="font-headline font-bold text-2xl sm:text-3xl text-white leading-none mb-2">
                    {s.value}
                  </dd>
                  <p className="text-xs sm:text-sm text-white/85 leading-snug">
                    {s.label}
                  </p>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ── Main content ──────────────────────────────────────── */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          {/* Comparison table */}
          <section className="py-12 sm:py-16 border-b border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              Side-by-Side Comparison
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-6 max-w-3xl">
              A feature-by-feature breakdown based on the publicly listed retail
              prices and report contents of both services. AutoCheck pricing is
              taken from the consumer-facing autocheck.com website.
            </p>

            <div className="overflow-x-auto rounded-2xl border border-outline-variant">
              <table className="w-full text-sm text-left">
                <thead className="bg-surface-container text-on-surface">
                  <tr>
                    <th className="px-4 py-3 font-headline font-extrabold">Feature</th>
                    <th className="px-4 py-3 font-headline font-extrabold text-center text-primary">
                      CarCheckerVIN
                    </th>
                    <th className="px-4 py-3 font-headline font-extrabold text-center">
                      AutoCheck
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant">
                  {comparisonRows.map(({ feature, carchecker, competitor }) => (
                    <tr key={feature} className="hover:bg-primary/5">
                      <td className="px-4 py-3 text-on-surface">{feature}</td>
                      <td className="px-4 py-3 text-center bg-primary/[0.04]">
                        <Cell value={carchecker} />
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Cell value={competitor} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-xs text-on-surface-variant">
              Pricing reflects the publicly listed retail price for individual
              consumer reports. Dealer pricing differs. Bundle credits are valid
              for 12 months.
            </p>
          </section>

          {/* Pricing */}
          <section className="py-12 sm:py-16 border-b border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">
              Pricing — What Each One Actually Costs
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="rounded-2xl border-2 border-primary bg-primary/5 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Award className="w-5 h-5 text-primary" />
                  <h3 className="text-base font-headline font-extrabold text-primary">
                    CarCheckerVIN
                  </h3>
                </div>
                <ul className="space-y-1.5 text-sm text-on-surface-variant">
                  <li className="flex justify-between gap-3">
                    <span>Single report</span>
                    <span className="font-bold text-on-surface">{SINGLE}</span>
                  </li>
                  <li className="flex justify-between gap-3">
                    <span>3-report bundle</span>
                    <span className="font-bold text-on-surface">{B3}</span>
                  </li>
                  <li className="flex justify-between gap-3">
                    <span>5-report bundle</span>
                    <span className="font-bold text-on-surface">{B5}</span>
                  </li>
                  <li className="flex justify-between gap-3">
                    <span>10-report bundle</span>
                    <span className="font-bold text-on-surface">{B10}</span>
                  </li>
                  <li className="flex justify-between gap-3 pt-1.5 border-t border-outline-variant">
                    <span>Free VIN decode</span>
                    <span className="font-bold text-emerald-600">Included</span>
                  </li>
                </ul>
              </div>
              <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Database className="w-5 h-5 text-on-surface-variant" />
                  <h3 className="text-base font-headline font-extrabold text-on-surface">
                    AutoCheck
                  </h3>
                </div>
                <ul className="space-y-1.5 text-sm text-on-surface-variant">
                  <li className="flex justify-between gap-3">
                    <span>Single report</span>
                    <span className="font-bold text-on-surface">{AC_SINGLE}</span>
                  </li>
                  <li className="flex justify-between gap-3">
                    <span>25-report package (21 days)</span>
                    <span className="font-bold text-on-surface">$49.99</span>
                  </li>
                  <li className="flex justify-between gap-3 pt-1.5 border-t border-outline-variant">
                    <span>Free VIN decode</span>
                    <span className="font-bold text-slate-400">Not offered</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="prose prose-slate max-w-none text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              <p>
                {`That puts a single CarCheckerVIN report at ${SINGLE}, well under half of AutoCheck's ${AC_SINGLE}. For a buyer cross-shopping three or four cars, CarCheckerVIN's ${B3} three-report bundle covers the job for less than the price of two AutoCheck reports, and the unused reports stay on your account as credits for a full year.`}
              </p>
              <p>
                {`AutoCheck's 25-report package is genuinely useful if you are an independent dealer running heavy auction volume. For a typical consumer buying one or two cars a year, you will rarely come close to using all 25 in the 21-day window, which makes the per-useful-report cost a lot higher than the ${"$49.99"} headline suggests.`}
              </p>
            </div>
          </section>

          {/* AutoCheck Score */}
          <section className="py-12 sm:py-16 border-b border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">
              The AutoCheck Score — Useful or Marketing?
            </h2>
            <div className="prose prose-slate max-w-none text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              <p>
                AutoCheck&apos;s most distinctive feature is the AutoCheck Score,
                a 0-100 number that rolls a vehicle&apos;s age, mileage, title
                brands, and reported events into one summary metric, then
                compares it against a similar peer group of vehicles. The score
                is genuinely popular at wholesale auctions, where buyers need a
                quick relative ranking across hundreds of vehicles in a single
                morning.
              </p>
              <p>
                For a private-party buyer, however, a single risk score is no
                substitute for actually reading the underlying data. A vehicle
                with a clean title, no reported accidents, and a consistent
                odometer trail is a good bet whether the score is 88 or 92.
                CarCheckerVIN gives you the same underlying{" "}
                <Link href="/stolen-vehicle-check" className="text-primary font-bold hover:underline">
                  NMVTIS, NICB, and DMV records
                </Link>{" "}
                and lets you make the call yourself, plus real vehicle photos
                that AutoCheck does not include.
              </p>
            </div>
          </section>

          {/* Data sources */}
          <section className="py-12 sm:py-16 border-b border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">
              Data Sources — Where the Reports Come From
            </h2>
            <div className="prose prose-slate max-w-none text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              <p>
                Both services pull from the same backbone of public and industry
                data: the National Motor Vehicle Title Information System
                (NMVTIS), all 50 state DMVs, the National Insurance Crime Bureau
                (NICB) for stolen vehicle records, the National Highway Traffic
                Safety Administration (NHTSA) for recalls, and various insurance
                industry feeds for accident and total-loss events.
              </p>
              <p>
                Experian&apos;s position as a credit and data company gives
                AutoCheck strong access to auction-lane data, which is why
                wholesale dealers like the platform. CarCheckerVIN draws on the
                same NMVTIS, NICB, NHTSA, and state DMV feeds, plus partner data
                exchanges for accident and salvage events, covering the same
                critical data points that determine whether a car is safe to
                buy.
              </p>
              <p>
                For 95% of used-car shoppers, the data that matters most (title
                brands, accidents, theft, odometer rollback, recalls) is
                essentially identical between the two providers. The differences
                are presentation, photos, and price.
              </p>
            </div>
          </section>

          {/* What each report includes */}
          <section className="py-12 sm:py-16 border-b border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">
              What Each Report Actually Includes
            </h2>
            <div className="prose prose-slate max-w-none text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              <p>
                A CarCheckerVIN premium report includes a full VIN decode and
                factory build data, NMVTIS title brand history including{" "}
                <Link href="/salvage-title-check" className="text-primary font-bold hover:underline">
                  salvage and rebuilt brands
                </Link>
                , reported{" "}
                <Link href="/accident-history-check" className="text-primary font-bold hover:underline">
                  accident history
                </Link>
                ,{" "}
                <Link href="/odometer-check" className="text-primary font-bold hover:underline">
                  odometer and mileage timeline
                </Link>
                , NICB stolen vehicle check, open recalls,{" "}
                <Link href="/lemon-check" className="text-primary font-bold hover:underline">
                  manufacturer buyback / lemon flags
                </Link>
                , a market value estimate, and real vehicle photos when
                available.
              </p>
              <p>
                An AutoCheck report includes most of the same major data sets
                plus the proprietary AutoCheck Score and strong auction-lane
                history. AutoCheck reports do not typically include real vehicle
                photos or a market value estimate at the consumer tier.
              </p>
            </div>
          </section>

          {/* When each makes sense */}
          <section className="py-12 sm:py-16 border-b border-outline-variant">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Database className="w-5 h-5 text-on-surface-variant" />
                  <h2 className="text-xl font-headline font-extrabold text-on-surface">
                    When AutoCheck Makes Sense
                  </h2>
                </div>
                <ul className="space-y-3 text-sm text-on-surface-variant">
                  {[
                    "You are a wholesale or auction buyer who genuinely uses the AutoCheck Score to rank dozens of vehicles per session.",
                    "You run high report volume each month and can use the 25-report bundle efficiently inside its 21-day window.",
                    "The vehicle is sold through an auction that specifically advertises AutoCheck-backed history.",
                  ].map((t, i) => (
                    <li key={i} className="flex gap-2 items-start">
                      <Check className="w-4 h-4 text-on-surface-variant flex-shrink-0 mt-0.5" strokeWidth={3} />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border-2 border-primary bg-primary/5 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Award className="w-5 h-5 text-primary" />
                  <h2 className="text-xl font-headline font-extrabold text-primary">
                    When to Choose CarCheckerVIN
                  </h2>
                </div>
                <ul className="space-y-3 text-sm text-on-surface-variant">
                  {[
                    `You are a private-party buyer comparing one to five vehicles and want to keep total report spend low (from ${SINGLE} per report).`,
                    "You want real vehicle photos and a market value estimate alongside the title and accident data.",
                    "You want a free instant VIN decode without creating an account.",
                    "You prefer to read the raw events yourself rather than trust a single proprietary risk score.",
                  ].map((t, i) => (
                    <li key={i} className="flex gap-2 items-start">
                      <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" strokeWidth={3} />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Bottom line */}
          <section className="py-12 sm:py-16 border-b border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">
              The Bottom Line
            </h2>
            <div className="prose prose-slate max-w-none text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              <p>
                {`AutoCheck is a credible, Experian-backed product whose biggest edge is the AutoCheck Score and its strong position in the wholesale auction lane. For a private-party buyer evaluating a handful of used cars, you can get the same NMVTIS, NICB, DMV, and NHTSA data, plus real photos and a market value, for ${SINGLE} with CarCheckerVIN, well under half of AutoCheck's ${AC_SINGLE}.`}
              </p>
              <p>
                See how it compares to the other major providers in our{" "}
                <Link href="/vin-check-vs-carfax" className="text-primary font-bold hover:underline">
                  CarCheckerVIN vs Carfax breakdown
                </Link>
                , or run a free decode now from our{" "}
                <Link href="/vin-check" className="text-primary font-bold hover:underline">
                  VIN check page
                </Link>
                .
              </p>
            </div>
          </section>

          {/* Mid CTA */}
          <section className="py-10">
            <div className="rounded-3xl bg-primary p-7 sm:p-10 text-center">
              <Gauge className="w-8 h-8 text-yellow-300 mx-auto mb-3" />
              <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-white mb-2">
                See What a {SINGLE} Report Looks Like
              </h2>
              <p className="text-white/80 text-sm sm:text-base mb-6 max-w-xl mx-auto">
                Enter a 17-character VIN for a free instant decode, then unlock
                the full history for {SINGLE}. No subscription, no AutoCheck
                Score paywall.
              </p>
              <div className="max-w-xl mx-auto bg-white rounded-2xl p-4 sm:p-5">
                <VinSearchForm size="lg" />
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="py-12 sm:py-16 border-b border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-on-surface-variant mb-8">
              The questions used-car buyers ask most when comparing CarCheckerVIN
              and Experian AutoCheck.
            </p>
            <div className="space-y-3">
              {FAQS.map((faq) => (
                <details
                  key={faq.question}
                  className="group rounded-2xl border border-outline-variant bg-surface p-4 sm:p-5 [&_summary::-webkit-details-marker]:hidden"
                >
                  <summary className="flex items-start justify-between gap-4 cursor-pointer list-none">
                    <span className="text-sm sm:text-base font-headline font-extrabold text-primary pr-2">
                      {faq.question}
                    </span>
                    <span className="flex-shrink-0 mt-0.5 text-primary text-xl font-light group-open:rotate-45 transition-transform">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </section>

          {/* Bottom CTA */}
          <section className="py-14 sm:py-20 text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-xs font-black uppercase tracking-wider mb-4">
              <Zap className="w-3.5 h-3.5" /> Free decode · {SINGLE} full report
            </div>
            <h2 className="text-2xl sm:text-4xl font-headline font-extrabold text-primary mb-3">
              A Smarter, Cheaper AutoCheck Alternative
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl mx-auto mb-8">
              {`Same NMVTIS, NICB, DMV, and NHTSA data AutoCheck uses, plus real photos and a market value, for ${SINGLE} instead of ${AC_SINGLE}.`}
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

          <RelatedChecks exclude="" />
        </div>
      </article>
    </>
  );
}
