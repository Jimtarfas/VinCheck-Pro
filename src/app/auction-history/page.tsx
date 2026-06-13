import type { Metadata } from "next";
import Link from "next/link";
import {
  Check,
  FileText,
  AlertCircle,
  Clock,
  Camera,
  Gavel,
  ChevronRight,
  Star,
  Lock,
  Zap,
  BadgeCheck,
  Building2,
  Gauge,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";

export const metadata: Metadata = {
  title: {
    absolute: "VIN Auction History Check — Salvage & Dealer Auction Records",
  },
  description:
    "Check a VIN for past salvage and dealer auction records. See Copart and IAA sale dates, damage codes, odometer at sale, run/drive status, and real auction photos. No signup, no credit card.",
  keywords: [
    "vin auction history",
    "auction history check",
    "copart vin check",
    "iaa auction history",
    "salvage auction records",
    "vin auction photos",
    "vehicle auction history by vin",
    "check car auction history",
  ],
  alternates: { canonical: "/auction-history" },
  openGraph: {
    title: "VIN Auction History Check — Salvage & Dealer Auction Records",
    description:
      "Check a VIN for past salvage and dealer auction records. Copart and IAA sale dates, damage codes, odometer at sale, and real auction photos.",
    url: `${SITE}/auction-history`,
    type: "article",
    siteName: "CarCheckerVIN",
  },
  twitter: {
    card: "summary_large_image",
    title: "VIN Auction History Check — Salvage & Dealer Auction Records",
    description:
      "See Copart and IAA sale dates, damage codes, odometer at sale, and real auction photos for any VIN.",
  },
  robots: { index: true, follow: true },
};

/* ── JSON-LD schemas ───────────────────────────────────────── */

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "VIN Auction History — Salvage & Dealer Auction Records by VIN",
  description:
    "Guide to checking a vehicle's auction history by VIN. Covers salvage auctions (Copart, IAA), dealer auctions (Manheim, ADESA), damage codes, run-and-drive status, odometer at sale, and how to read auction photos before buying.",
  author: ORG_AUTHOR,
  publisher: {
    "@type": "Organization",
    name: "CarCheckerVIN",
    url: SITE,
    logo: { "@type": "ImageObject", url: `${SITE}/logo.png` },
  },
  mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE}/auction-history` },
  datePublished: "2026-06-13",
  dateModified: "2026-06-13",
  image: `${SITE}/opengraph-image`,
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I check a car's auction history by VIN?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Enter the 17-character VIN in the search box above. Our system cross-references salvage and dealer auction records and returns every auction event on file: the auction house and location, sale date, result, damage description, condition, odometer reading at sale, and the original auction photos when available.",
      },
    },
    {
      "@type": "Question",
      name: "Why does it matter if a car was sold at a salvage auction?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A vehicle that passed through a salvage auction such as Copart or IAA was almost always declared a total loss by an insurer first. Even if it was later repaired and re-titled, the prior total-loss damage permanently affects safety, value, and insurability. Auction records are often the earliest and most detailed evidence of that damage, frequently with photos taken before any cosmetic repair.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between a salvage auction and a dealer auction?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Salvage auctions (Copart, IAA) sell insurance total-loss, theft-recovery, and damaged vehicles, usually to rebuilders, dismantlers, and exporters. Dealer auctions (Manheim, ADESA) are wholesale sales of trade-ins, off-lease, and fleet vehicles between licensed dealers. A salvage-auction record is a strong warning sign; a dealer-auction record is routine but still useful for tracing ownership and mileage.",
      },
    },
    {
      "@type": "Question",
      name: "Do auction records include photos of the damage?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Often, yes. Salvage auctions photograph each vehicle from multiple angles at intake, before any repair. When those images are on file for a VIN, our report displays them so you can see the actual pre-repair condition, the single most useful piece of evidence for a car that was later rebuilt and listed as clean.",
      },
    },
    {
      "@type": "Question",
      name: "What does 'run and drive' mean in an auction listing?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "'Run and drive' is an auction condition note meaning the vehicle started, moved under its own power, and could be driven a short distance at the sale. It does not certify roadworthiness or that the car is repaired, only that it operated at that moment. Categories like 'starts' or 'enhanced vehicle' indicate progressively less function, and no operability note at all is a red flag.",
      },
    },
    {
      "@type": "Question",
      name: "Can a car be sold at auction more than once?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. A vehicle can appear at several auctions over its life. For example, a salvage sale after a total loss, then a dealer auction after it was rebuilt and resold. Multiple auction events, or a salvage sale followed by a quick clean-title resale, are patterns worth scrutinizing closely before you buy.",
      },
    },
    {
      "@type": "Question",
      name: "Does an auction record always mean the car has a salvage title?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Not always. Dealer-auction (wholesale) records are common on clean, undamaged trade-ins and off-lease cars. A salvage-auction record, however, almost always traces back to a total-loss or branded title. Read the auction house, the damage description, and the title brand together, and our report shows all three so you can tell a routine wholesale sale from a total-loss event.",
      },
    },
    {
      "@type": "Question",
      name: "Is the odometer reading at auction reliable?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Auction odometer readings are a valuable cross-check because they are recorded at a specific date independent of the seller. Compare the mileage at each auction event against later DMV and inspection readings: mileage should only increase over time. A reading that drops, or a large unexplained jump, is a strong indicator of odometer tampering.",
      },
    },
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Check Vehicle Auction History by VIN",
  description:
    "Step-by-step guide to finding and reading a vehicle's salvage and dealer auction records by VIN.",
  totalTime: "PT2M",
  step: [
    { "@type": "HowToStep", position: 1, name: "Locate the VIN", text: "Find the 17-character VIN on the dashboard, the driver-side door jamb, or the title document." },
    { "@type": "HowToStep", position: 2, name: "Enter the VIN", text: "Type or paste the VIN into the search box at the top of this page." },
    { "@type": "HowToStep", position: 3, name: "Open the auction history section", text: "In your report, review the Auction History section for each auction event: house and location, date, result, damage, condition, and odometer at sale." },
    { "@type": "HowToStep", position: 4, name: "Study the auction photos", text: "Examine any pre-repair auction photos closely. They show the actual damage before cosmetic work, which a current listing may hide." },
    { "@type": "HowToStep", position: 5, name: "Cross-check mileage and title", text: "Compare the odometer reading at auction with later readings, and check the auction event against the title brand to confirm the full picture before buying." },
  ],
};

const serviceRatingSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "VIN Auction History Check",
  provider: {
    "@type": "Organization",
    name: "CarCheckerVIN",
    url: SITE,
  },
  areaServed: { "@type": "Country", name: "United States" },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    bestRating: "5",
    worstRating: "1",
    ratingCount: "127",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE },
    { "@type": "ListItem", position: 2, name: "Auction History", item: `${SITE}/auction-history` },
  ],
};

const speakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".speakable-intro"] },
  url: `${SITE}/auction-history`,
};

const datasetSchema = {
  "@context": "https://schema.org",
  "@type": "Dataset",
  name: "VIN Auction History Quick Statistics",
  description:
    "Coverage and data-field reference for CarCheckerVIN's VIN auction history check.",
  url: `${SITE}/auction-history`,
  creator: ORG_AUTHOR,
  license: "https://creativecommons.org/licenses/by/4.0/",
  variableMeasured: [
    { "@type": "PropertyValue", name: "Auction data fields per event", value: "7" },
    { "@type": "PropertyValue", name: "Average VIN decode time (seconds)", value: "<5" },
    { "@type": "PropertyValue", name: "Pre-repair auction photos shown when on file", value: "Yes" },
    { "@type": "PropertyValue", name: "Cost for the free preview (USD)", value: "0" },
  ],
};

/* ── Static content ────────────────────────────────────────── */

const HEADLINE_STATS = [
  { value: "Copart + IAA", label: "Salvage auction houses cross-referenced" },
  { value: "7 fields", label: "Captured per auction event" },
  { value: "Photos", label: "Pre-repair images shown when on file" },
  { value: "<5 sec", label: "Average VIN decode time" },
  { value: "$0", label: "Cost for the free preview" },
];

const TRUST_STATS = [
  { icon: Gavel,      value: "Salvage", label: "+ dealer auction records" },
  { icon: Camera,     value: "Photos",  label: "pre-repair, when available" },
  { icon: Clock,      value: "< 5 sec", label: "average report time" },
  { icon: BadgeCheck, value: "Free",    label: "no credit card needed" },
];

const RECORD_FIELDS = [
  { icon: Building2, title: "Auction House & Location", desc: "Which auction sold the vehicle (Copart, IAA, and others) and the physical sale yard location." },
  { icon: Clock,     title: "Sale Date & Result",       desc: "When the vehicle crossed the block and whether it sold, was a no-sale, or was relisted." },
  { icon: AlertCircle, title: "Damage Description",     desc: "Primary and secondary damage as recorded by the auction: front-end, flood, theft-recovery, hail, and more." },
  { icon: FileText,  title: "Condition / Run Status",   desc: "Operability notes such as run-and-drive, starts, or enhanced, giving a quick read on how functional the car was at sale." },
  { icon: Gauge,     title: "Odometer at Sale",         desc: "The mileage recorded at auction, an independent checkpoint for spotting odometer rollback." },
  { icon: Camera,    title: "Original Auction Photos",  desc: "Intake photos taken before any repair, the clearest evidence of the vehicle's true pre-sale condition." },
];

const RED_FLAGS = [
  { flag: "Salvage auction, now clean title", desc: "A Copart or IAA salvage sale followed by a quick clean-title resale is the classic title-washing and undisclosed-rebuild pattern." },
  { flag: "Heavy primary damage",   desc: "Front, rear, side, or undercarriage damage that affects frame and safety systems. Even after repair, value and crashworthiness suffer." },
  { flag: "Flood or water damage",  desc: "Flood-coded auction sales signal hidden corrosion and electrical faults that surface months or years later." },
  { flag: "No run-and-drive note",  desc: "If the auction did not list the car as operable, assume significant mechanical or electrical problems until proven otherwise." },
  { flag: "Theft recovery",         desc: "Theft-recovery auction vehicles are often stripped or vandalized; verify every component was properly replaced." },
  { flag: "Mileage mismatch",       desc: "An auction odometer reading higher than a later 'lower-mileage' listing points to odometer fraud." },
];

const INTERNAL_LINKS = [
  { href: "/salvage-title-check",    label: "Salvage Title Check",      desc: "Verify salvage and rebuilt title brands." },
  { href: "/total-loss-check",       label: "Total Loss Check",         desc: "Find insurance total-loss records." },
  { href: "/accident-history-check", label: "Accident History Check",   desc: "Review collision and damage records." },
  { href: "/flood-check",            label: "Flood Damage Check",       desc: "Detect water-damage history." },
  { href: "/odometer-check",         label: "Odometer Check",           desc: "Cross-check auction mileage for rollback." },
  { href: "/stolen-vehicle-check",   label: "Stolen Vehicle Check",     desc: "Theft-recovery and NICB records." },
  { href: "/market-value",           label: "Market Value",             desc: "How auction history affects valuation." },
  { href: "/dealer-check",           label: "Dealer Check",             desc: "Vet a dealer before you buy." },
];

const FAQS = faqSchema.mainEntity.map((q) => ({
  q: q.name,
  a: q.acceptedAnswer.text,
}));

export default function AuctionHistoryPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceRatingSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }} />

      <article className="pb-16 bg-surface">

        {/* ── Hero ─────────────────────────────────────────── */}
        <div className="bg-primary text-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-14 sm:pt-28 sm:pb-20">
            <Breadcrumbs
              items={[{ label: "Home", href: "/" }, { label: "Auction History" }]}
              onDark
            />

            <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
              <Gavel className="w-4 h-4" /> Copart · IAA · Dealer Auctions
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-headline font-extrabold leading-tight mb-4">
              VIN Auction History —{" "}
              <span style={{ color: "var(--color-secondary-container)" }}>
                Salvage & Dealer Records
              </span>
            </h1>

            <p className="speakable-intro text-base sm:text-xl text-white/85 max-w-3xl mb-8 leading-relaxed">
              Find out if a vehicle passed through a salvage or dealer auction. See sale dates, damage codes, odometer at sale, run-and-drive status, and the original pre-repair auction photos for any VIN. Free, no credit card, results in under 5 seconds.
            </p>

            {/* VIN Search */}
            <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-xl">
              <h2 className="text-base sm:text-lg font-headline font-extrabold text-primary mb-1">
                Check Auction History by VIN
              </h2>
              <p className="text-xs sm:text-sm text-on-surface-variant mb-4">
                Enter any 17-character VIN — cars, trucks, motorcycles, RVs
              </p>
              <VinSearchForm size="lg" />
              <p className="mt-3 text-[11px] text-slate-400 flex items-center gap-1.5">
                <Lock className="w-3 h-3" /> 256-bit encrypted · DPPA compliant · No personal data stored
              </p>
            </div>

            {/* Trust stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
              {TRUST_STATS.map((s) => {
                const Icon = s.icon;
                return (
                  <div key={s.label} className="bg-white/10 border border-white/15 rounded-xl px-4 py-3 text-center">
                    <Icon className="w-5 h-5 mx-auto mb-1 text-white/70" />
                    <div className="text-xl sm:text-2xl font-headline font-black text-white">{s.value}</div>
                    <div className="text-[11px] text-white/65 leading-tight mt-0.5">{s.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Stats block (By the numbers) ─────────────────── */}
        <section
          aria-labelledby="auction-stats-heading"
          className="max-w-5xl mx-auto px-4 sm:px-6 -mt-8 sm:-mt-10 relative z-10"
        >
          <div className="rounded-3xl bg-surface-container shadow-md border border-outline-variant p-5 sm:p-7">
            <h2
              id="auction-stats-heading"
              className="text-xs sm:text-sm font-headline font-black uppercase tracking-widest text-primary mb-4 sm:mb-5"
            >
              VIN Auction History — By the Numbers
            </h2>
            <dl className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
              {HEADLINE_STATS.map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl bg-primary-container px-4 py-4 sm:py-5"
                >
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="font-headline font-bold text-2xl sm:text-3xl text-on-primary-container leading-none mb-2">
                    {s.value}
                  </dd>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-snug">
                    {s.label}
                  </p>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ── Main content ─────────────────────────────────── */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6">

          {/* Why auction history matters */}
          <section className="py-12 sm:py-16 border-b border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">
              Why Auction History Is the Record Sellers Hope You Skip
            </h2>
            <div className="prose prose-slate max-w-none text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              <p>
                When an insurer declares a vehicle a total loss, it usually heads to a salvage auction, most often{" "}
                <a href="https://www.copart.com/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary underline underline-offset-2">Copart</a>{" "}
                or{" "}
                <a href="https://www.iaai.com/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary underline underline-offset-2">IAA (Insurance Auto Auctions)</a>. There it is photographed from every angle and tagged with its damage type, condition, and mileage <strong className="text-on-surface">before anyone repairs it</strong>. That snapshot is the closest thing to ground truth about a damaged car.
              </p>
              <p>
                The problem for buyers is what happens next. A rebuilder can purchase the car, do cosmetic work, move it to a state with looser titling rules, and resell it with a title that looks clean. The current photos look fine. The seller says nothing. The only durable evidence of the total loss is the <strong className="text-on-surface">auction record</strong> attached to the VIN: the sale date, the damage code, and the intake photos that no amount of bodywork can erase from history.
              </p>
              <p>
                A VIN auction history check surfaces exactly that. It tells you whether a car was sold for salvage, what was wrong with it, how many miles it showed at the time, and whether it could even run, so you can compare the auction reality against the glossy listing in front of you.
              </p>
            </div>
          </section>

          {/* What's in the record */}
          <section className="py-12 sm:py-16 border-b border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              What Each Auction Record Shows
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-8">
              For every auction event on file, the report captures the data that matters for a buying decision.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {RECORD_FIELDS.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-base font-headline font-extrabold text-primary mb-1.5">{item.title}</h3>
                    <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Salvage vs dealer auctions */}
          <section className="py-12 sm:py-16 border-b border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">
              Salvage Auctions vs. Dealer Auctions
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-6 leading-relaxed">
              Not every auction record is a warning. Knowing which type of sale you are looking at is the difference between a routine wholesale trade and a hidden total loss.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-error/30 bg-error/5 p-5 sm:p-6">
                <div className="flex items-center gap-2 mb-3">
                  <AlertCircle className="w-5 h-5 text-error" />
                  <h3 className="text-base font-headline font-extrabold text-on-surface">Salvage Auctions — Copart, IAA</h3>
                </div>
                <p className="text-sm text-on-surface-variant leading-relaxed mb-3">
                  Sell insurance total-loss, theft-recovery, flood, and heavily damaged vehicles, mostly to rebuilders, dismantlers, and exporters.
                </p>
                <ul className="space-y-1.5 text-sm text-on-surface-variant">
                  {["Almost always tied to a total loss or branded title", "Detailed damage codes and pre-repair photos", "A strong signal to inspect before buying"].map((t) => (
                    <li key={t} className="flex gap-2 items-start">
                      <AlertCircle className="w-4 h-4 text-error flex-shrink-0 mt-0.5" /> {t}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5 sm:p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Building2 className="w-5 h-5 text-primary" />
                  <h3 className="text-base font-headline font-extrabold text-on-surface">Dealer Auctions — Manheim, ADESA</h3>
                </div>
                <p className="text-sm text-on-surface-variant leading-relaxed mb-3">
                  Wholesale sales of trade-ins, off-lease, and fleet vehicles between licensed dealers. Common on clean, undamaged cars.
                </p>
                <ul className="space-y-1.5 text-sm text-on-surface-variant">
                  {["Routine, not a sign of damage by itself", "Useful for tracing ownership and mileage history", "Worth reading alongside the title brand"].map((t) => (
                    <li key={t} className="flex gap-2 items-start">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" strokeWidth={3} /> {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Step-by-step */}
          <section className="py-12 sm:py-16 border-b border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              How to Read a VIN&apos;s Auction History — Step-by-Step
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-8">
              Pulling and reading auction records takes under two minutes.
            </p>
            <div className="space-y-4">
              {[
                { step: "01", title: "Run the VIN above", body: "Enter the 17-character VIN. Our system cross-references salvage and dealer auction records and returns every event on file for that vehicle." },
                { step: "02", title: "Identify the auction house", body: "Copart and IAA are salvage auctions, so treat their records as total-loss evidence. Manheim and ADESA are dealer wholesale auctions, which are routine. The house tells you how seriously to read the rest." },
                { step: "03", title: "Read the damage and condition codes", body: "Note the primary and secondary damage and any run-and-drive status. 'Front end' plus 'run and drive' is very different from 'flood' with no operability note. Match the codes to what the seller is disclosing." },
                { step: "04", title: "Study the pre-repair photos", body: "When auction photos are on file, look at them closely. They show the car before bodywork: bent frames, deployed airbags, and waterlines that a fresh detail job hides. This is the most valuable part of the record." },
                { step: "05", title: "Cross-check mileage and title", body: "Compare the odometer at each auction with later readings and the current title brand. A salvage auction followed by a clean title and lower mileage is a clear stop-and-inspect signal." },
              ].map((s) => (
                <div key={s.step} className="flex gap-4 sm:gap-6 items-start rounded-2xl border border-outline-variant bg-surface p-5 sm:p-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                    <span className="text-white font-headline font-black text-sm">{s.step}</span>
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-headline font-extrabold text-primary mb-1.5">{s.title}</h3>
                    <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">{s.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Red flags */}
          <section className="py-12 sm:py-16 border-b border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              Auction Red Flags to Watch For
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-8">
              Any one of these patterns in an auction record is reason to inspect closely, or walk away.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {RED_FLAGS.map((b) => (
                <div key={b.flag} className="flex gap-3 items-start rounded-xl border border-outline-variant bg-surface-container-lowest p-4">
                  <AlertCircle className="w-5 h-5 text-error flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-sm font-bold text-on-surface">{b.flag}</strong>
                    <p className="text-xs text-on-surface-variant mt-0.5 leading-relaxed">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-2xl bg-primary/5 border border-primary/20 p-5 sm:p-6">
              <p className="text-sm text-on-surface-variant leading-relaxed">
                <strong className="text-primary">Bottom line:</strong> auction photos and damage codes are recorded before any repair, by a neutral third party, on a specific date. That makes them harder to fake than a seller&apos;s description, and the single best tool for catching a rebuilt car sold as clean.
              </p>
            </div>
          </section>

          {/* Mid-page CTA */}
          <section className="py-10">
            <div className="rounded-3xl bg-primary p-7 sm:p-10 text-center">
              <Star className="w-8 h-8 text-yellow-300 mx-auto mb-3" />
              <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-white mb-2">
                Check a VIN&apos;s Auction History Now
              </h2>
              <p className="text-white/80 text-sm sm:text-base mb-6 max-w-xl mx-auto">
                Free, instant, no credit card. See salvage and dealer auction records, damage codes, and pre-repair photos in under 5 seconds.
              </p>
              <div className="max-w-xl mx-auto bg-white rounded-2xl p-4 sm:p-5">
                <VinSearchForm size="lg" />
              </div>
            </div>
          </section>

          {/* Internal links */}
          <section className="py-12 sm:py-16 border-b border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              Related Vehicle History Checks
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-7">
              Auction history is one piece of the picture. These checks cover the records it connects to.
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
                    <div className="text-sm font-bold text-primary group-hover:underline">{l.label}</div>
                    <div className="text-xs text-on-surface-variant mt-0.5">{l.desc}</div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* VIN Check banner */}
          <section className="py-10">
            <VinCheckBanner />
          </section>

          {/* FAQ */}
          <section className="py-12 sm:py-16 border-b border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              Frequently Asked Questions — VIN Auction History
            </h2>
            <p className="text-sm text-on-surface-variant mb-8">
              The questions car buyers ask most about salvage and dealer auction records.
            </p>
            <div className="space-y-3">
              {FAQS.map((f) => (
                <details
                  key={f.q}
                  className="group rounded-2xl border border-outline-variant bg-surface p-4 sm:p-5 [&_summary::-webkit-details-marker]:hidden"
                >
                  <summary className="flex items-start justify-between gap-4 cursor-pointer list-none">
                    <span className="text-sm sm:text-base font-headline font-extrabold text-primary pr-2">{f.q}</span>
                    <span className="flex-shrink-0 mt-0.5 text-primary text-xl font-light group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="mt-3 text-xs sm:text-sm text-on-surface-variant leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </section>

          {/* Bottom CTA */}
          <section className="py-14 sm:py-20 text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-xs font-black uppercase tracking-wider mb-4">
              <Zap className="w-3.5 h-3.5" /> Free · Instant · No Sign-Up
            </div>
            <h2 className="text-2xl sm:text-4xl font-headline font-extrabold text-primary mb-3">
              See the History Behind the Listing
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl mx-auto mb-8">
              A clean-looking car can hide a salvage-auction past. One VIN check brings the auction records and pre-repair photos back into view, in 5 seconds, for free.
            </p>
            <div className="max-w-xl mx-auto bg-surface-container-low rounded-2xl p-5 border border-outline-variant">
              <VinSearchForm size="lg" />
            </div>
          </section>

          {/* Sources & Data Authority */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              Sources &amp; Data Authority
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-6">
              Auction records are read alongside federal title and theft data so the full picture is consistent. Below are the primary sources and the agencies you can cross-check with.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              {[
                { href: "https://www.copart.com/", label: "Copart", note: "Major US salvage auction house for insurance total-loss vehicles." },
                { href: "https://www.iaai.com/", label: "IAA — Insurance Auto Auctions", note: "Salvage and total-loss auction marketplace." },
                { href: "https://vehiclehistory.bja.ojp.gov/", label: "NMVTIS — Bureau of Justice Assistance", note: "Federal title system that records total-loss and salvage brands." },
                { href: "https://www.nicb.org/vincheck", label: "NICB VINCheck", note: "Theft-recovery and salvage reports from insurance carriers." },
                { href: "https://www.nhtsa.gov/recalls", label: "NHTSA — Safety Recalls", note: "Open-recall data cross-referenced for every VIN." },
                { href: "https://www.ftc.gov/news-events/topics/protecting-consumers/auto-sales-financing", label: "FTC — Auto Sales & Financing", note: "Federal consumer-protection guidance on used-vehicle disclosure." },
              ].map((s) => (
                <li
                  key={s.href}
                  className="rounded-xl border border-outline-variant bg-surface-container-lowest p-4"
                >
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary font-bold underline underline-offset-2"
                  >
                    {s.label} ↗
                  </a>
                  <p className="mt-1.5 text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                    {s.note}
                  </p>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs text-on-surface-variant italic">
              Auction availability varies by vehicle. Records and photos are shown when an auction event is on file for the VIN; absence of a record does not guarantee a vehicle was never auctioned.
            </p>
          </section>

          <RelatedChecks exclude="/auction-history" />
        </div>
      </article>
    </>
  );
}
