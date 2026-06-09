import type { Metadata } from "next";
import Link from "next/link";
import {
  Check,
  Search,
  FileText,
  ScanLine,
  ChevronRight,
  Lock,
  Zap,
  BadgeCheck,
  Sparkles,
  Tag,
  Car,
  DollarSign,
  Gauge,
  ClipboardCheck,
  Building2,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import WindowStickerMaker from "../window-sticker/WindowStickerMaker";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/window-sticker-lookup`;
const OG_IMAGE = `${SITE}/opengraph-image`;

export const metadata: Metadata = {
  title: "Window Sticker Lookup by VIN — Free Monroney",
  description:
    "Look up a window sticker by VIN free. Enter a 17-character VIN to pull the original Monroney label — MSRP, factory options, and EPA MPG. No Carfax fee.",
  keywords: [
    "window sticker lookup",
    "monroney sticker lookup",
    "window sticker lookup by vin",
    "vin number window sticker lookup",
    "sticker lookup by vin",
    "look up sticker by vin",
    "find window sticker with vin",
    "auto window sticker lookup",
    "window sticker lookup free",
    "vin sticker search",
    "carfax window sticker lookup",
    "ford window sticker lookup",
    "bmw window sticker lookup",
    "chrysler window sticker lookup",
    "toyota monroney sticker lookup",
    "dodge window sticker lookup by vin",
    "mopar window sticker lookup",
    "monroney window sticker lookup",
  ],
  alternates: { canonical: "/window-sticker-lookup" },
  openGraph: {
    title: "Window Sticker Lookup by VIN — Free Monroney Label",
    description:
      "Free Monroney window sticker lookup by VIN. Pull original MSRP, factory options, and EPA fuel economy for any U.S.-market vehicle.",
    url: PAGE_URL,
    siteName: "CarCheckerVIN",
    type: "article",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Window Sticker Lookup by VIN" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Window Sticker Lookup by VIN — Original Monroney Label",
    description:
      "Look up any vehicle's original window sticker by VIN — MSRP, options, and EPA MPG. Free.",
    images: [OG_IMAGE],
  },
  robots: { index: true, follow: true },
};

/* ── JSON-LD schemas ───────────────────────────────────────────── */

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Window Sticker Lookup by VIN",
  url: PAGE_URL,
  applicationCategory: "AutomotiveApplication",
  operatingSystem: "All",
  description:
    "Look up a vehicle's original Monroney window sticker by its 17-character VIN. Retrieves base MSRP, factory options and packages, standard equipment, and EPA fuel economy for U.S.-market cars, trucks, and SUVs.",
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
  headline: "Window Sticker Lookup by VIN — Find the Original Monroney Label",
  description:
    "How to look up a vehicle's original window sticker by VIN, what data a Monroney lookup returns, brand-by-brand coverage, and how a free VIN lookup compares to paid Carfax and CarEdge reports.",
  author: ORG_AUTHOR,
  publisher: {
    "@type": "Organization",
    name: "CarCheckerVIN",
    url: SITE,
    logo: { "@type": "ImageObject", url: `${SITE}/logo.png` },
  },
  mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL },
  datePublished: "2026-06-09",
  dateModified: "2026-06-09",
};

const faqs = [
  {
    q: "How do I look up a window sticker by VIN?",
    a: "Enter the vehicle's 17-character VIN into the lookup tool and decode it. The lookup pulls the original Monroney window sticker data from the factory build record — year, make, model, trim, engine, base MSRP, factory options and packages, standard equipment, and EPA fuel economy. You can then view, edit, print, or save the sticker as a PDF.",
  },
  {
    q: "Is the window sticker lookup free?",
    a: "Yes. Looking up and previewing a window sticker by VIN is free. A free account (email only — no credit card) is required at the moment you download or print the finished sticker. There is no per-lookup fee like Carfax charges for its window sticker.",
  },
  {
    q: "Where do I find the VIN to look up a window sticker?",
    a: "The 17-character VIN is stamped on a plate at the base of the driver-side windshield, printed on the driver-side door-jamb sticker, and listed on the title, registration, and insurance card. Always match the VIN across at least two of these locations before you rely on a sticker lookup.",
  },
  {
    q: "Can I look up a Ford, Chevy, Toyota, BMW, or Chrysler window sticker by VIN?",
    a: "Yes. The lookup works for every U.S.-market brand, including Ford, Chevrolet, Toyota, Honda, Nissan, BMW, Mercedes-Benz, Audi, Chrysler, Dodge, RAM, Jeep, GMC, Hyundai, Kia, Subaru, Volkswagen, Lexus, and more. If the vehicle has a 17-character VIN, its window sticker can be reconstructed.",
  },
  {
    q: "What is on a Monroney window sticker?",
    a: "A Monroney label lists the vehicle description (year, make, model, trim, engine, drivetrain, colors, assembly plant), the standard equipment included at no charge, every factory option and package with its price, EPA city/highway/combined fuel economy, and the pricing summary — base MSRP, total options, destination charge, and total price — tied to the VIN.",
  },
  {
    q: "How is this different from a Carfax window sticker lookup?",
    a: "Carfax and similar services charge for a window sticker as part of a paid report. This tool reconstructs the same Monroney-style sticker — original MSRP, options, and EPA data — directly from the VIN for free, and lets you edit and download it. For accident, title, and odometer history, pair it with a full VIN history report.",
  },
  {
    q: "Can I look up the window sticker for a used or older car?",
    a: "Coverage is strongest for U.S.-market vehicles built from 1981 onward, when the 17-character VIN became standard. For older or specialty vehicles with limited public records, you can still build the sticker manually by entering the year, make, model, options, and original MSRP — the Monroney layout is identical for any era.",
  },
  {
    q: "Can I look up a window sticker without the VIN?",
    a: "No — the VIN is the key that pulls the exact factory build. Without it, two cars of the same year and model can have completely different options and MSRP. If you don't have the VIN, find it at the base of the windshield, on the driver-side door jamb, or on the title, registration, or insurance card, then run the lookup.",
  },
  {
    q: "How accurate is a window sticker lookup by VIN?",
    a: "A VIN window sticker lookup reflects the factory build record, so the year, make, model, trim, engine, standard equipment, and original MSRP are accurate to how the vehicle was ordered. Option pricing and EPA figures match the original model-year data. You can edit any field before printing if you need to correct dealer-added items.",
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
  name: "How to Look Up a Window Sticker by VIN",
  description:
    "Find a vehicle's original Monroney window sticker in under a minute using only the 17-character VIN.",
  totalTime: "PT1M",
  estimatedCost: { "@type": "MonetaryAmount", currency: "USD", value: "0" },
  supply: [{ "@type": "HowToSupply", name: "17-character vehicle VIN" }],
  tool: [{ "@type": "HowToTool", name: "CarCheckerVIN Window Sticker Lookup" }],
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Find the VIN",
      text: "Locate the 17-character VIN on the windshield base, driver-side door jamb, title, or registration.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter and decode",
      text: "Paste the VIN into the lookup tool and click Decode to pull the original factory build record.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Review the Monroney data",
      text: "Confirm MSRP, factory options and packages, standard equipment, and EPA fuel economy on the reconstructed sticker.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Print or save as PDF",
      text: "Sign in free, then print the window sticker or save it as a PDF for listings, records, or display.",
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
    { "@type": "ListItem", position: 2, name: "Tools", item: `${SITE}/tools` },
    { "@type": "ListItem", position: 3, name: "Window Sticker Lookup", item: PAGE_URL },
  ],
};

const speakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  url: PAGE_URL,
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["h1", ".speakable-intro", ".fast-answer"],
  },
};

/* ── Static UI data ────────────────────────────────────────────── */

const TRUST_STATS = [
  { icon: ScanLine, value: "By VIN", label: "17-char decode" },
  { icon: DollarSign, value: "Original", label: "MSRP & options" },
  { icon: BadgeCheck, value: "All brands", label: "U.S.-market" },
  { icon: Zap, value: "Free", label: "no Carfax fee" },
];

const HOW_STEPS = [
  {
    icon: Search,
    tag: "Step 1",
    title: "Find the VIN",
    body: "The 17-character VIN sits at the base of the windshield, on the driver-side door jamb, and on the title, registration, and insurance card. Match it across two spots before you trust a lookup.",
  },
  {
    icon: ScanLine,
    tag: "Step 2",
    title: "Decode the VIN",
    body: "Paste the VIN into the lookup and click Decode. The tool queries the factory build record and reconstructs the original Monroney window sticker for that exact vehicle.",
  },
  {
    icon: FileText,
    tag: "Step 3",
    title: "Review & download",
    body: "Confirm MSRP, options, standard equipment, and EPA MPG, then print the sticker or save it as a PDF — free, no per-report charge.",
  },
];

const STICKER_FIELDS = [
  {
    icon: Car,
    title: "Vehicle description",
    body: "Year, make, model, trim, engine, transmission, drivetrain, exterior and interior color, and the assembly plant — exactly as ordered.",
  },
  {
    icon: DollarSign,
    title: "Original MSRP & pricing",
    body: "Base MSRP, the sum of all factory options, the destination charge, and the total sticker price the car carried when new.",
  },
  {
    icon: Tag,
    title: "Factory options & packages",
    body: "Every factory-installed option and bundled package, each with its individual price — the detail used cars almost never list.",
  },
  {
    icon: Gauge,
    title: "EPA fuel economy",
    body: "City, highway, and combined MPG (or MPGe for hybrids and EVs) plus the estimated annual fuel cost block.",
  },
];

const BRANDS = [
  "Ford",
  "Chevrolet",
  "Toyota",
  "Honda",
  "BMW",
  "Chrysler",
  "Dodge / RAM",
  "Jeep",
  "GMC",
  "Nissan",
  "Hyundai / Kia",
  "Mercedes-Benz",
];

const WHY_LOOKUP = [
  "Confirm a used car's original MSRP to judge how much it has really depreciated",
  "See which factory options and packages the car was actually ordered with",
  "Verify the trim and engine match what the seller is advertising",
  "Document original equipment for insurance, appraisal, or agreed-value coverage",
  "Recreate a lost or removed sticker for a clean resale listing",
  "Cross-check EPA fuel economy before you commit to a fuel budget",
];

const INTERNAL_LINKS = [
  {
    href: "/window-sticker",
    label: "Window Sticker Maker",
    desc: "Build and customize a Monroney label from scratch — edit every field, then print or download.",
  },
  {
    href: "/free-window-sticker-by-vin",
    label: "Free Window Sticker by VIN",
    desc: "Pull the original sticker straight from the VIN at no cost — no per-report fee.",
  },
  {
    href: "/build-sheet",
    label: "Factory Build Sheet",
    desc: "The full as-built option and equipment list behind the window sticker.",
  },
  {
    href: "/vin-decoder",
    label: "VIN Decoder",
    desc: "Decode the 17-character VIN to specs, trim, engine, and factory options.",
  },
  {
    href: "/vin-check",
    label: "Full VIN History Check",
    desc: "Title, accident, odometer, and recall records to pair with the original sticker.",
  },
  {
    href: "/market-value",
    label: "Market Value",
    desc: "Compare the original MSRP to what the car is worth today.",
  },
];

/* ── Page ──────────────────────────────────────────────────────── */

export default function WindowStickerLookupPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />

      <article className="pb-16 bg-surface">
        {/* ── Hero ─────────────────────────────────────────── */}
        <div className="bg-primary text-white print:hidden">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-14 sm:pt-28 sm:pb-20">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Tools", href: "/tools" },
                { label: "Window Sticker Lookup" },
              ]}
              onDark
            />

            <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
              <ScanLine className="w-4 h-4" /> Monroney Lookup &nbsp;·&nbsp; By VIN &nbsp;·&nbsp; Free
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-headline font-extrabold leading-tight mb-4">
              Window Sticker Lookup{" "}
              <span style={{ color: "var(--color-secondary-container)" }}>
                by VIN
              </span>
            </h1>

            <p className="speakable-intro text-base sm:text-xl text-white/85 max-w-3xl mb-8 leading-relaxed">
              Look up any vehicle&apos;s original Monroney window sticker straight
              from its VIN. Enter a 17-character VIN to pull the base MSRP, factory
              options and packages, standard equipment, and EPA fuel economy — for
              Ford, Chevy, Toyota, Honda, BMW, Chrysler, Dodge, and every
              U.S.-market vehicle. Free, with no per-report Carfax fee.
            </p>

            <a
              href="#tool"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-primary font-bold hover:bg-white/90 transition"
            >
              <Search className="w-5 h-5" /> Start the VIN Lookup
            </a>
            <p className="mt-3 text-[11px] text-white/60 flex items-center gap-1.5">
              <Lock className="w-3 h-3" /> Free · No sign-up to preview · Instant result
            </p>

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

        {/* ── The tool ─────────────────────────────────────── */}
        <section
          id="tool"
          className="bg-surface-container-low border-b border-outline-variant py-10 print:py-0 print:bg-white print:border-0 scroll-mt-24"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <WindowStickerMaker />
          </div>
        </section>

        {/* ── Main content ─────────────────────────────────── */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 print:hidden">
          {/* ── Fast answer (AI / featured-snippet target) ──── */}
          <section className="pt-12 sm:pt-16">
            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5 sm:p-7">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-4 h-4 text-primary" />
                <span className="text-[11px] font-black uppercase tracking-wider text-primary">
                  Quick answer
                </span>
              </div>
              <p className="fast-answer text-base sm:text-lg text-on-surface leading-relaxed">
                <strong className="text-primary">
                  To look up a window sticker by VIN, enter the vehicle&apos;s
                  17-character VIN and decode it.
                </strong>{" "}
                You get the original Monroney label — base MSRP, factory options and
                packages, standard equipment, and EPA fuel economy — for any
                U.S.-market car, truck, or SUV built from 1981 onward. The lookup is
                free; a free account (email only) is needed only to print or save the
                sticker as a PDF. Brands covered include Ford, Chevy, Toyota, Honda,
                BMW, Chrysler, and Dodge.
              </p>
            </div>
          </section>

          {/* How the lookup works */}
          <section className="py-12 sm:py-16">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              How a VIN Window Sticker Lookup Works
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl">
              The original Monroney sticker is keyed to the VIN in the
              manufacturer&apos;s build record. Three steps turn that code back into
              the sticker the car wore on the showroom floor.
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

          {/* What you get */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              What a Window Sticker Lookup Returns
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">
              A Monroney lookup reconstructs every block of the original
              federally-mandated label — the same data the car was sold with.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {STICKER_FIELDS.map((c) => {
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

          {/* Brand lookup */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              Window Sticker Lookup by Brand
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">
              The same VIN lookup covers every U.S.-market manufacturer — whether
              you need a Ford, Chevy, Toyota, BMW, Chrysler, or Mopar window
              sticker, the process is identical.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {BRANDS.map((b) => (
                <div
                  key={b}
                  className="flex items-center gap-2 rounded-xl border border-outline-variant bg-surface px-4 py-3"
                >
                  <Building2 className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm font-bold text-on-surface">{b}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Mid CTA */}
          <section className="py-4">
            <div className="rounded-3xl bg-primary text-white p-7 sm:p-10 text-center">
              <div className="inline-flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-yellow-300" />
                <span className="text-xs font-black uppercase tracking-wider text-white/80">
                  Free Monroney lookup
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-headline font-extrabold mb-2">
                Look Up a Window Sticker by VIN
              </h2>
              <p className="text-sm sm:text-base text-white/80 max-w-2xl mx-auto mb-6">
                Original MSRP, factory options, and EPA fuel economy in seconds —
                no Carfax fee.
              </p>
              <a
                href="#tool"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-primary font-bold hover:bg-white/90 transition"
              >
                <Search className="w-5 h-5" /> Start the Lookup
              </a>
            </div>
          </section>

          {/* Free vs paid */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              Free VIN Lookup vs. Paid Window Sticker Reports
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">
              Several services sell a window sticker as part of a paid report. Here
              is how a free CarCheckerVIN lookup compares.
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="rounded-2xl border-2 border-primary bg-primary/5 p-6">
                <div className="text-xs font-black uppercase tracking-wider text-primary mb-1">
                  CarCheckerVIN
                </div>
                <div className="text-2xl font-headline font-black text-primary mb-3">
                  Free
                </div>
                <ul className="space-y-2 text-sm text-on-surface">
                  {[
                    "Original MSRP, options & EPA data",
                    "Edit every field after decode",
                    "Print or save as PDF",
                    "No per-report charge",
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" strokeWidth={3} />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-outline-variant bg-surface p-6">
                <div className="text-xs font-black uppercase tracking-wider text-on-surface-variant mb-1">
                  Carfax window sticker
                </div>
                <div className="text-2xl font-headline font-black text-on-surface mb-3">
                  Paid report
                </div>
                <ul className="space-y-2 text-sm text-on-surface-variant">
                  {[
                    "Bundled into a paid history report",
                    "View-only, not editable",
                    "Per-VIN charge",
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 text-on-surface-variant flex-shrink-0 mt-0.5" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-outline-variant bg-surface p-6">
                <div className="text-xs font-black uppercase tracking-wider text-on-surface-variant mb-1">
                  CarEdge / iSeeCars
                </div>
                <div className="text-2xl font-headline font-black text-on-surface mb-3">
                  Limited
                </div>
                <ul className="space-y-2 text-sm text-on-surface-variant">
                  {[
                    "Coverage varies by make",
                    "View-only output",
                    "Account often required",
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 text-on-surface-variant flex-shrink-0 mt-0.5" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Why lookup matters */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">
              Why Look Up the Original Window Sticker
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
                <p>
                  The original Monroney sticker is the single most reliable record
                  of how a vehicle was actually built and priced when new. Used-car
                  listings routinely omit factory options or overstate the trim —
                  the sticker settles it.
                </p>
                <p>
                  Knowing the original MSRP also tells you how much real
                  depreciation has happened, which is your factual baseline for an
                  offer. Pair it with a full{" "}
                  <Link
                    href="/vin-check"
                    className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80"
                  >
                    VIN history report
                  </Link>{" "}
                  to confirm nothing has happened to the car since the showroom.
                </p>
              </div>
              <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <ClipboardCheck className="w-5 h-5 text-primary" />
                  <h3 className="font-headline font-extrabold text-primary">
                    What the lookup proves
                  </h3>
                </div>
                <ul className="space-y-2 text-sm text-on-surface">
                  {WHY_LOOKUP.map((tip) => (
                    <li key={tip} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" strokeWidth={3} />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Internal links */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              Tools That Pair With a Window Sticker Lookup
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-7">
              The sticker is one piece. These tools complete the picture before you
              buy or list.
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

          {/* VIN check banner */}
          <section className="py-10">
            <VinCheckBanner />
          </section>

          {/* FAQ */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              Window Sticker Lookup — Frequently Asked Questions
            </h2>
            <p className="text-sm text-on-surface-variant mb-8">
              The questions buyers and sellers ask most about looking up a window
              sticker by VIN.
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

          {/* Bottom CTA */}
          <section className="py-14 sm:py-20 text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-xs font-black uppercase tracking-wider mb-4">
              <Zap className="w-3.5 h-3.5" /> Free · Instant · By VIN
            </div>
            <h2 className="text-2xl sm:text-4xl font-headline font-extrabold text-primary mb-3">
              Look Up Any Window Sticker by VIN
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl mx-auto mb-8">
              Enter a 17-character VIN to pull the original Monroney label — MSRP,
              factory options, and EPA fuel economy — then print or save as PDF.
            </p>
            <a
              href="#tool"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 transition"
            >
              <Search className="w-5 h-5" /> Start the Lookup
            </a>
          </section>

          <RelatedChecks exclude="/window-sticker" />
        </div>
      </article>
    </>
  );
}
