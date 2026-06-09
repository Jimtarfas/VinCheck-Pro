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
  Printer,
  Download,
  Ban,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import WindowStickerMaker from "../window-sticker/WindowStickerMaker";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/free-window-sticker-by-vin`;
const OG_IMAGE = `${SITE}/opengraph-image`;

export const metadata: Metadata = {
  title:
    "Free Window Sticker by VIN — Original Monroney Label, No Charge",
  description:
    "Get a free window sticker by VIN. Enter a 17-character VIN to pull the original Monroney label — MSRP, factory options, packages, and EPA fuel economy — then print or save as PDF. Works for Toyota, Ford, Chevy, Honda, BMW, and every U.S.-market vehicle. No fee.",
  keywords: [
    "free window sticker by vin",
    "monroney sticker by vin",
    "window sticker by vin",
    "window sticker by vin free",
    "toyota window sticker by vin",
    "toyota window sticker by vin free",
    "vehicle window sticker by vin",
    "window sticker for vin",
    "car sticker by vin",
    "ford window sticker pdf free download",
    "window sticker lookup free",
    "monroney label by vin",
    "free monroney sticker",
    "window sticker by vin toyota",
    "carfax window sticker by vin",
  ],
  alternates: { canonical: "/free-window-sticker-by-vin" },
  openGraph: {
    title: "Free Window Sticker by VIN — Original Monroney Label, No Charge",
    description:
      "Pull a free Monroney window sticker straight from the VIN — MSRP, factory options, and EPA fuel economy. Print or save as PDF.",
    url: PAGE_URL,
    siteName: "CarCheckerVIN",
    type: "article",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Free Window Sticker by VIN" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Window Sticker by VIN — Original Monroney Label",
    description:
      "Get any vehicle's original window sticker free from its VIN — MSRP, options, and EPA MPG.",
    images: [OG_IMAGE],
  },
  robots: { index: true, follow: true },
};

/* ── JSON-LD schemas ───────────────────────────────────────────── */

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Free Window Sticker by VIN",
  url: PAGE_URL,
  applicationCategory: "AutomotiveApplication",
  operatingSystem: "All",
  description:
    "Generate a vehicle's original Monroney window sticker for free using its 17-character VIN. Retrieves base MSRP, factory options and packages, standard equipment, and EPA fuel economy, then exports to print or PDF.",
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
  headline: "Free Window Sticker by VIN — Original Monroney Label at No Charge",
  description:
    "How to get a free window sticker by VIN, what the Monroney label includes, which brands are covered, and how a free VIN sticker compares to paid Carfax and dealer reports.",
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
    q: "How do I get a free window sticker by VIN?",
    a: "Enter the vehicle's 17-character VIN into the tool and click Decode. It pulls the original Monroney window sticker data from the factory build record — MSRP, factory options and packages, standard equipment, and EPA fuel economy — at no charge. You can then edit, print, or save the sticker as a PDF.",
  },
  {
    q: "Is the window sticker really free?",
    a: "Yes. Generating and previewing the window sticker by VIN is completely free — no payment, no trial limit, and no watermark. A free account using only your email (no credit card) is required at the moment you download or print. Unlike Carfax, there is no per-VIN report fee.",
  },
  {
    q: "Can I get a free Toyota window sticker by VIN?",
    a: "Yes. Toyota is fully supported — enter the VIN and the tool reconstructs the original Toyota Monroney sticker with MSRP, packages, and EPA data. The same works for Ford, Chevrolet, Honda, Nissan, BMW, Chrysler, Dodge, RAM, Jeep, GMC, Hyundai, Kia, and every other U.S.-market brand.",
  },
  {
    q: "Can I download the free window sticker as a PDF?",
    a: "Yes. After signing in free, click Print / Save as PDF to open your browser's print dialog and choose 'Save as PDF'. The print stylesheet hides the rest of the page so you get a clean, single-page sticker. You can also download a portable HTML copy to edit later.",
  },
  {
    q: "Where is the VIN I need to enter?",
    a: "The 17-character VIN is on a plate at the base of the driver-side windshield, on the driver-side door-jamb sticker, and on the title, registration, and insurance card. Match the VIN across two locations before relying on the sticker it produces.",
  },
  {
    q: "Is this the official manufacturer window sticker?",
    a: "It is a Monroney-style reconstruction built from the VIN's factory data and any values you enter — accurate for personal use, listings, records, and display, but not a manufacturer-issued legal document. For accident, title, and odometer history, pair it with a full VIN history report.",
  },
  {
    q: "Can I get a free window sticker for an older or used car?",
    a: "Coverage is strongest for U.S.-market vehicles built from 1981 onward, when the 17-character VIN became standard. For older or specialty vehicles, you can still build the sticker for free by entering the year, make, model, options, and original MSRP manually — the Monroney layout is the same for any era.",
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
  name: "How to Get a Free Window Sticker by VIN",
  description:
    "Pull a vehicle's original Monroney window sticker for free in under a minute using only the 17-character VIN.",
  totalTime: "PT1M",
  estimatedCost: { "@type": "MonetaryAmount", currency: "USD", value: "0" },
  supply: [{ "@type": "HowToSupply", name: "17-character vehicle VIN" }],
  tool: [{ "@type": "HowToTool", name: "CarCheckerVIN Free Window Sticker by VIN" }],
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Enter the VIN",
      text: "Type or paste the 17-character VIN into the auto-fill field at the top of the tool.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Decode for free",
      text: "Click Decode to pull MSRP, factory options, standard equipment, and EPA fuel economy from the build record at no charge.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Edit if needed",
      text: "Adjust MSRP, add or remove options, and refine the equipment list to match the exact build.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Print or save free",
      text: "Sign in with a free account, then print the window sticker or save it as a PDF — no fee.",
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
    { "@type": "ListItem", position: 2, name: "Tools", item: `${SITE}/tools` },
    { "@type": "ListItem", position: 3, name: "Free Window Sticker by VIN", item: PAGE_URL },
  ],
};

const speakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  url: PAGE_URL,
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["h1", ".speakable-intro"],
  },
};

/* ── Static UI data ────────────────────────────────────────────── */

const TRUST_STATS = [
  { icon: DollarSign, value: "$0", label: "always free" },
  { icon: ScanLine, value: "By VIN", label: "17-char decode" },
  { icon: BadgeCheck, value: "All brands", label: "U.S.-market" },
  { icon: Printer, value: "PDF", label: "print or save" },
];

const HOW_STEPS = [
  {
    icon: ScanLine,
    tag: "Step 1",
    title: "Enter the VIN",
    body: "Paste any 17-character VIN into the auto-fill field. The free decode keys into the factory build record for that exact vehicle.",
  },
  {
    icon: FileText,
    tag: "Step 2",
    title: "Decode for free",
    body: "One click pulls year, make, model, trim, engine, MSRP, factory options, standard equipment, and EPA fuel economy — no charge, no per-VIN fee.",
  },
  {
    icon: Download,
    tag: "Step 3",
    title: "Print or save as PDF",
    body: "Sign in with a free account, then export a clean single-page Monroney sticker to print or save as PDF for listings, records, or display.",
  },
];

const INCLUDED = [
  {
    icon: DollarSign,
    title: "Original MSRP & pricing",
    body: "Base MSRP, total of all factory options, destination charge, and the total sticker price the vehicle carried when new.",
  },
  {
    icon: Tag,
    title: "Factory options & packages",
    body: "Every factory-installed option and bundled package with its individual price — itemized exactly like the original label.",
  },
  {
    icon: Car,
    title: "Standard equipment",
    body: "The safety, comfort, technology, and convenience features included at no charge with the base trim.",
  },
  {
    icon: Gauge,
    title: "EPA fuel economy",
    body: "City, highway, and combined MPG (or MPGe for hybrids and EVs) plus the estimated annual fuel cost block.",
  },
];

const FREE_VS_PAID = [
  "No per-VIN report fee — generate as many stickers as you want",
  "No credit card, ever — a free email account unlocks downloads",
  "Edit every field after the decode, unlike view-only paid reports",
  "Print or save as PDF, plus a portable HTML copy",
  "Works for every U.S.-market brand and model year from 1981 on",
  "No watermark on the finished sticker",
];

const INTERNAL_LINKS = [
  {
    href: "/window-sticker-lookup",
    label: "Window Sticker Lookup",
    desc: "The lookup-focused walkthrough, with brand-by-brand guidance and a free-vs-paid comparison.",
  },
  {
    href: "/window-sticker",
    label: "Window Sticker Maker",
    desc: "Build and customize a Monroney label from scratch — edit every field, then print or download.",
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
    href: "/recall-check",
    label: "Recall Check",
    desc: "Open NHTSA safety recalls for the same VIN — repaired free by the dealer.",
  },
];

/* ── Page ──────────────────────────────────────────────────────── */

export default function FreeWindowStickerByVinPage() {
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
                { label: "Free Window Sticker by VIN" },
              ]}
              onDark
            />

            <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
              <Sparkles className="w-4 h-4" /> 100% Free &nbsp;·&nbsp; Monroney Label &nbsp;·&nbsp; By VIN
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-headline font-extrabold leading-tight mb-4">
              Free Window Sticker{" "}
              <span style={{ color: "var(--color-secondary-container)" }}>
                by VIN
              </span>
            </h1>

            <p className="speakable-intro text-base sm:text-xl text-white/85 max-w-3xl mb-8 leading-relaxed">
              Get any vehicle&apos;s original Monroney window sticker free, straight
              from its VIN. Enter a 17-character VIN to pull the base MSRP, factory
              options and packages, standard equipment, and EPA fuel economy — for
              Toyota, Ford, Chevy, Honda, BMW, Chrysler, Dodge, and every
              U.S.-market vehicle. Print or save as PDF, with no per-report fee.
            </p>

            <a
              href="#tool"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-primary font-bold hover:bg-white/90 transition"
            >
              <Search className="w-5 h-5" /> Get the Free Window Sticker
            </a>
            <p className="mt-3 text-[11px] text-white/60 flex items-center gap-1.5">
              <Lock className="w-3 h-3" /> Free · No credit card · Instant result
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
          {/* How it works */}
          <section className="py-12 sm:py-16">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              How to Get a Free Window Sticker by VIN
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl">
              The original Monroney sticker lives in the manufacturer&apos;s build
              record, keyed to the VIN. Three free steps turn that code back into
              the label the car was sold with.
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

          {/* What's included free */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              What&apos;s Included Free
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">
              The free VIN sticker reconstructs every block of the original
              federally-mandated Monroney label — nothing held back behind a
              paywall.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {INCLUDED.map((c) => {
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

          {/* Mid CTA */}
          <section className="py-4">
            <div className="rounded-3xl bg-primary text-white p-7 sm:p-10 text-center">
              <div className="inline-flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-yellow-300" />
                <span className="text-xs font-black uppercase tracking-wider text-white/80">
                  Always free
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-headline font-extrabold mb-2">
                Get a Free Window Sticker by VIN
              </h2>
              <p className="text-sm sm:text-base text-white/80 max-w-2xl mx-auto mb-6">
                Original MSRP, factory options, and EPA fuel economy in seconds —
                no fee, no credit card.
              </p>
              <a
                href="#tool"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-primary font-bold hover:bg-white/90 transition"
              >
                <Search className="w-5 h-5" /> Get It Free
              </a>
            </div>
          </section>

          {/* Free vs paid */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">
              Free by VIN vs. Paid Window Sticker Reports
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
                <p>
                  Carfax and several dealer tools bundle the window sticker into a
                  paid report and charge per VIN — and the output is view-only. This
                  tool reconstructs the same Monroney-style sticker from the VIN for
                  free, and lets you edit and export it.
                </p>
                <p>
                  The catch is small and honest: building and previewing is open to
                  everyone, and a free email account is required only at the
                  download step. There is no payment and no watermark. Pair the free
                  sticker with a full{" "}
                  <Link
                    href="/vin-check"
                    className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80"
                  >
                    VIN history report
                  </Link>{" "}
                  for the complete picture.
                </p>
              </div>
              <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Ban className="w-5 h-5 text-primary" />
                  <h3 className="font-headline font-extrabold text-primary">
                    What you don&apos;t pay for
                  </h3>
                </div>
                <ul className="space-y-2 text-sm text-on-surface">
                  {FREE_VS_PAID.map((tip) => (
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
              Free Tools That Pair With Your Window Sticker
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-7">
              The sticker is one piece. These free tools complete the picture before
              you buy or list.
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
              Free Window Sticker by VIN — Frequently Asked Questions
            </h2>
            <p className="text-sm text-on-surface-variant mb-8">
              The questions people ask most about pulling a free window sticker from
              a VIN.
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
              Get Your Free Window Sticker by VIN
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl mx-auto mb-8">
              Enter a 17-character VIN to pull the original Monroney label — MSRP,
              factory options, and EPA fuel economy — then print or save as PDF, at
              no charge.
            </p>
            <a
              href="#tool"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 transition"
            >
              <Search className="w-5 h-5" /> Get It Free
            </a>
          </section>

          <RelatedChecks exclude="/window-sticker" />
        </div>
      </article>
    </>
  );
}
