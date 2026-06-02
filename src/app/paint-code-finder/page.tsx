import type { Metadata } from "next";
import Link from "next/link";
import {
  Check,
  Shield,
  Search,
  FileText,
  Palette,
  MapPin,
  ChevronRight,
  Lock,
  Zap,
  BadgeCheck,
  Sparkles,
  Brush,
  Eye,
  Smartphone,
  ScanLine,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import { PAINT_CODE_BRANDS } from "@/lib/paint-codes";

const SITE = "https://www.carcheckervin.com";

export const metadata: Metadata = {
  title:
    "Paint Code Finder — Find Any Car's Color Code by VIN, Brand & Color Name (Free)",
  description:
    "Find your car's paint code fast. Search by VIN, browse by brand, or match a factory color name to its exact code. Free directory of real OEM color codes for 30+ brands — for touch-up paint, body shop matching, and respray checks.",
  keywords: [
    "paint code finder",
    "find paint code",
    "car color code finder",
    "find my paint code",
    "find paint code by color name",
    "color name to paint code",
    "factory color name lookup",
    "find car paint color",
    "touch up paint finder",
    "touch up paint by color code",
    "find paint code by VIN",
    "OEM color code finder",
    "what color is my car",
    "car paint color code",
    "find factory paint color",
    "paint code by make",
    "Toyota color code finder",
    "Honda color code finder",
    "Ford paint color finder",
    "Chevy color code finder",
  ],
  alternates: { canonical: "/paint-code-finder" },
  openGraph: {
    title: "Paint Code Finder — Find Any Car's Factory Color Code Free",
    description:
      "Find a car's exact paint code by VIN, by brand, or by factory color name. Free OEM color directory for 30+ brands.",
    url: `${SITE}/paint-code-finder`,
    type: "article",
    siteName: "CarCheckerVIN",
    images: [{ url: `${SITE}/paint-code-finder/opengraph-image` }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Paint Code Finder — Find Any Car's Factory Color Code Free",
    description:
      "Find a car's exact paint code by VIN, brand, or color name. Free OEM directory, 30+ brands.",
    images: [`${SITE}/paint-code-finder/opengraph-image`],
  },
  robots: { index: true, follow: true },
};

/* ── JSON-LD schemas ───────────────────────────────────────────── */

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Paint Code Finder",
  url: `${SITE}/paint-code-finder`,
  applicationCategory: "AutomotiveApplication",
  operatingSystem: "All",
  description:
    "Find any vehicle's factory paint code three ways: by VIN, by browsing manufacturer, or by matching a factory color name to its exact OEM code. Covers 30+ brands.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  publisher: {
    "@type": "Organization",
    name: "CarCheckerVIN",
    url: SITE,
    logo: { "@type": "ImageObject", url: `${SITE}/logo.png` },
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the fastest way to find my car's paint code?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "There are three reliable ways. First, check the service sticker inside the driver-side door jamb — the code is usually a 2-5 character sequence next to the VIN. Second, if the sticker is missing or faded, run a free VIN-based lookup, since the factory code is permanently linked to the VIN. Third, if you only know the color name, use a color-name-to-code directory to match the marketing name to its exact factory code.",
      },
    },
    {
      "@type": "Question",
      name: "Can I find a paint code from just the color name?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Often, yes — but with a caveat. A color name like 'Crystal Black Pearl' usually maps to a specific code (NH731P on Honda), but the same name can be reused across model years with a slightly different formula and a new code. Use the color name to narrow it down, then confirm the exact code by VIN or door jamb sticker before ordering paint.",
      },
    },
    {
      "@type": "Question",
      name: "Is a paint code finder different from a paint code lookup?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "They solve the same problem from different starting points. A VIN paint code lookup is best when you have the VIN and want the exact code instantly. A paint code finder is best when you want to browse by brand or match a known factory color name to its code. Most people use both — find the likely color name here, then confirm the precise code by VIN.",
      },
    },
    {
      "@type": "Question",
      name: "Where exactly is the paint code sticker on most cars?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "On the majority of vehicles it is on the driver-side door jamb, on the same white or silver label as the VIN and tire pressures. Audi, VW, and Porsche commonly place it in the spare tire well or front trunk. BMW and Mini often print it on the engine-bay strut tower. The brand directory on this page lists the exact spot for 30+ manufacturers.",
      },
    },
    {
      "@type": "Question",
      name: "How do I find the right touch-up paint for my car?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Find your factory paint code first — never order by color name alone. Provide the code to any touch-up retailer (dealer, AutomotiveTouchup, PaintScratch) so they mix the exact factory formula. For pearl and tri-coat colors, a single touch-up pen will not match the depth; those need a multi-stage application from a body shop.",
      },
    },
    {
      "@type": "Question",
      name: "What does the letter or number prefix in a paint code mean?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Prefixes encode the brand system. Honda and Acura use a color-family letter (NH = neutral/black, R = red, B = blue). VW and Audi codes start with 'L'. GM uses a 'WA' prefix or a 3-character RPO code. Stellantis (Chrysler, Dodge, Jeep, Ram) uses a 'P' prefix. Knowing the prefix helps you spot the code on a faded sticker.",
      },
    },
    {
      "@type": "Question",
      name: "Can a paint code finder tell me if my car was repainted?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Indirectly, yes. Find the factory code recorded against the VIN, then compare it to the car's current color. If they do not match, the vehicle has been resprayed — which can signal prior accident repair. Pair this with an accident history check to find out why.",
      },
    },
    {
      "@type": "Question",
      name: "Is this paint code finder free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Browsing the brand directory and matching color names to codes is completely free with no sign-up. The VIN-based lookup is also free and returns the factory paint code and color name instantly.",
      },
    },
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Find Your Car's Paint Code Three Ways",
  description:
    "Find a vehicle's factory paint code by VIN, by browsing the manufacturer, or by matching a factory color name to its code.",
  totalTime: "PT2M",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Try the door jamb sticker first",
      text: "Open the driver's door and read the white or silver service label. The paint code is a 2-5 character sequence next to a row labeled Color, Paint, EXT, PNT, BC/CC, Lack, or C/TR.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "No sticker? Find it by VIN",
      text: "Enter the 17-character VIN into the free lookup. The factory paint code is locked to the VIN in the build database and returns even when the sticker is gone.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Only know the color name? Browse by brand",
      text: "Use the brand color directory on this page to match a factory color name (e.g., Soul Red Crystal) to its exact code (41V on Mazda).",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Confirm before you buy paint",
      text: "Color names get reused across years with new formulas. Confirm the exact code for your model year by VIN or sticker before ordering touch-up paint.",
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
      name: "Paint Code Finder",
      item: `${SITE}/paint-code-finder`,
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
  url: `${SITE}/paint-code-finder`,
};

/* ── Static UI data ────────────────────────────────────────────── */

const TRUST_STATS = [
  { icon: Palette, value: "30+", label: "brands in directory" },
  { icon: Shield, value: "OEM", label: "factory color codes" },
  { icon: Zap, value: "3 ways", label: "VIN · brand · color name" },
  { icon: BadgeCheck, value: "Free", label: "no sign-up" },
];

const FIND_METHODS = [
  {
    icon: Search,
    tag: "Method 1",
    title: "By VIN — most precise",
    body: "Enter the 17-character VIN and get the exact factory paint code and color name in seconds. Best when the door jamb sticker is faded, peeled, or replaced after body work. The code is locked to the VIN, so it never goes missing.",
  },
  {
    icon: Eye,
    tag: "Method 2",
    title: "By door jamb sticker",
    body: "Open the driver's door and read the service label. The paint code sits next to a row labeled Color, Paint, EXT, PNT, BC/CC, Lack, or C/TR. The brand directory below tells you the exact label word and sticker location for your make.",
  },
  {
    icon: Palette,
    tag: "Method 3",
    title: "By factory color name",
    body: "Already know the marketing name — 'Magnetic Metallic', 'Soul Red Crystal', 'Pearl White'? Match it to its exact OEM code in the brand color directory below, then confirm by VIN before ordering paint.",
  },
];

const COLOR_DIRECTORY = PAINT_CODE_BRANDS.map((b) => ({
  slug: b.slug,
  name: b.name,
  label: b.stickerLabel,
  location: b.primaryLocation,
  pattern: b.codePattern,
  colors: b.examples,
}));

const INTERNAL_LINKS = [
  {
    href: "/paint-code-lookup",
    label: "Paint Code Lookup by VIN",
    desc: "The interactive VIN tool with a brand-by-brand sticker locator — confirm the exact code instantly.",
  },
  {
    href: "/vin-check",
    label: "Full VIN History Check",
    desc: "Title, accident, odometer, recall, and original paint records in one report.",
  },
  {
    href: "/accident-history-check",
    label: "Accident History Check",
    desc: "Was the car resprayed after a collision? Find out why the color may not match the code.",
  },
  {
    href: "/vin-decoder",
    label: "VIN Decoder",
    desc: "Decode any 17-character VIN to specs, trim, and factory options.",
  },
  {
    href: "/window-sticker",
    label: "Window Sticker Maker",
    desc: "Recreate the original Monroney sticker with factory color, trim, and options.",
  },
  {
    href: "/build-sheet",
    label: "Build Sheet by VIN",
    desc: "Pull the original factory build sheet — paint code, options, and packages.",
  },
];

const FAQS = [
  {
    q: "What is the fastest way to find my car's paint code?",
    a: "Three reliable ways: (1) check the service sticker inside the driver-side door jamb — the code is a 2-5 character sequence next to the VIN; (2) if the sticker is missing or faded, run a free VIN-based lookup, since the factory code is permanently linked to the VIN; (3) if you only know the color name, match it to the exact factory code in the brand directory below.",
  },
  {
    q: "Can I find a paint code from just the color name?",
    a: "Often yes — but with a caveat. A name like 'Crystal Black Pearl' usually maps to a specific code (NH731P on Honda), but the same name can be reused across model years with a slightly different formula and a new code. Use the name to narrow it down, then confirm the exact code by VIN or door jamb sticker before ordering paint.",
  },
  {
    q: "Is a paint code finder different from a VIN paint code lookup?",
    a: "They solve the same problem from different starting points. A VIN lookup is best when you have the VIN and want the exact code instantly. A finder is best when you want to browse by brand or match a known color name to its code. Most people use both — find the likely color name here, then confirm the precise code by VIN on our paint code lookup tool.",
  },
  {
    q: "Where exactly is the paint code sticker on most cars?",
    a: "On most vehicles it's on the driver-side door jamb, on the same white or silver label as the VIN and tire pressures. Audi, VW, and Porsche commonly place it in the spare tire well or front trunk. BMW and Mini often print it on the engine-bay strut tower. The brand directory above lists the exact spot for each make.",
  },
  {
    q: "How do I find the right touch-up paint for my car?",
    a: "Find your factory paint code first — never order by color name alone. Give the code to any touch-up retailer so they mix the exact factory formula. For pearl and tri-coat colors, a single touch-up pen won't match the depth; those need a multi-stage application from a body shop.",
  },
  {
    q: "What does the letter or number prefix in a paint code mean?",
    a: "Prefixes encode the brand system. Honda/Acura use a color-family letter (NH = neutral/black, R = red, B = blue). VW and Audi codes start with 'L'. GM uses a 'WA' prefix or 3-character RPO code. Stellantis (Chrysler, Dodge, Jeep, Ram) uses a 'P' prefix. Knowing the prefix helps you spot the code on a faded sticker.",
  },
  {
    q: "Can a paint code finder tell me if my car was repainted?",
    a: "Indirectly, yes. Find the factory code recorded against the VIN, then compare it to the car's current color. If they don't match, the vehicle has been resprayed — which can signal prior accident repair. Pair this with an accident history check to find out why.",
  },
  {
    q: "Is this paint code finder free?",
    a: "Yes. Browsing the brand directory and matching color names to codes is completely free with no sign-up. The VIN-based lookup is also free and returns the factory paint code and color name instantly.",
  },
];

/* ── Page ──────────────────────────────────────────────────────── */

export default function PaintCodeFinderPage() {
  return (
    <>
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
        {/* ── Hero ─────────────────────────────────────────── */}
        <div className="bg-primary text-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-14 sm:pt-28 sm:pb-20">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Paint Code Finder" },
              ]}
              onDark
            />

            <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
              <ScanLine className="w-4 h-4" /> Find a Color Code &nbsp;·&nbsp; VIN · Brand · Color Name
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-headline font-extrabold leading-tight mb-4">
              Paint Code Finder —{" "}
              <span style={{ color: "var(--color-secondary-container)" }}>
                Find Any Car&apos;s Color Code
              </span>
            </h1>

            <p className="speakable-intro text-base sm:text-xl text-white/85 max-w-3xl mb-8 leading-relaxed">
              Three ways to find a vehicle&apos;s exact factory paint code: enter the VIN, browse by brand, or match a factory color name to its code. Free OEM color directory for {PAINT_CODE_BRANDS.length}+ manufacturers — perfect for touch-up paint, body shop matching, or checking a respray.
            </p>

            <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-xl">
              <h2 className="text-base sm:text-lg font-headline font-extrabold text-primary mb-1">
                Find Your Paint Code by VIN
              </h2>
              <p className="text-xs sm:text-sm text-on-surface-variant mb-4">
                Enter any 17-character VIN — we&apos;ll return the OEM paint code and factory color name
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
          {/* ── Three ways to find ───────────────────────────── */}
          <section className="py-12 sm:py-16">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              Three Ways to Find a Paint Code
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl">
              Pick the method that matches what you already know. They all lead to the same place — the exact factory code your paint supplier needs.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {FIND_METHODS.map((m) => {
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

          {/* ── Brand color directory (the unique asset) ─────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              Find Your Paint Code by Brand &amp; Color Name
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl">
              Browse {PAINT_CODE_BRANDS.length} manufacturers below. Each card shows where the sticker hides, the code format, and real factory color names matched to their exact OEM codes. Find your color, then confirm the precise code for your model year by VIN.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {COLOR_DIRECTORY.map((brand) => (
                <details
                  key={brand.slug}
                  className="group rounded-2xl border border-outline-variant bg-surface p-5 [&_summary::-webkit-details-marker]:hidden"
                >
                  <summary className="flex items-start justify-between gap-3 cursor-pointer list-none">
                    <div>
                      <h3 className="text-base sm:text-lg font-headline font-extrabold text-primary">
                        {brand.name} Paint Codes
                      </h3>
                      <p className="text-xs text-on-surface-variant mt-0.5 flex items-center gap-1.5">
                        <MapPin className="w-3 h-3 flex-shrink-0" />
                        {brand.location}
                      </p>
                    </div>
                    <span className="flex-shrink-0 mt-1 text-primary text-xl font-light group-open:rotate-45 transition-transform">
                      +
                    </span>
                  </summary>
                  <div className="mt-4 space-y-3">
                    <div className="flex flex-wrap gap-2 text-[11px]">
                      <span className="rounded-full bg-surface-container-low px-2.5 py-1 text-on-surface-variant">
                        Label: <strong className="text-on-surface">{brand.label}</strong>
                      </span>
                      <span className="rounded-full bg-surface-container-low px-2.5 py-1 text-on-surface-variant">
                        Format: <strong className="text-on-surface">{brand.pattern}</strong>
                      </span>
                    </div>
                    <ul className="divide-y divide-outline-variant/50 rounded-xl border border-outline-variant/60 overflow-hidden">
                      {brand.colors.map((c) => (
                        <li
                          key={c.code}
                          className="flex items-center justify-between gap-3 px-3.5 py-2.5 bg-surface-container-lowest"
                        >
                          <span className="text-xs sm:text-sm text-on-surface">
                            {c.colorName}
                          </span>
                          <code className="font-mono text-xs bg-primary/10 rounded px-2 py-1 text-primary font-bold flex-shrink-0">
                            {c.code}
                          </code>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={`/paint-code-lookup?brand=${brand.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline"
                    >
                      See the full {brand.name} sticker locator
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </details>
              ))}
            </div>
            <p className="mt-5 text-xs text-on-surface-variant">
              Color names and codes are illustrative examples drawn from OEM service literature — actual codes vary by model, year, and region. Always confirm the exact code for your vehicle via the{" "}
              <Link
                href="/paint-code-lookup"
                className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80"
              >
                VIN paint code lookup
              </Link>{" "}
              before ordering paint.
            </p>
          </section>

          {/* ── Color name vs code ─────────────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              Why the Color Name Alone Isn&apos;t Enough
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl leading-relaxed">
              A color name gets you close. The code gets you an exact match. Here&apos;s why finding the code — not just the name — is the step that matters.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5 sm:p-6">
                <div className="text-[11px] font-black uppercase tracking-wider text-on-surface-variant mb-2">
                  Color Name
                </div>
                <p className="text-lg font-headline font-extrabold text-on-surface mb-3">
                  &ldquo;Pearl White&rdquo;
                </p>
                <ul className="space-y-2 text-sm text-on-surface-variant">
                  <li className="flex gap-2"><span>·</span><span>A marketing term — reused across years and trims.</span></li>
                  <li className="flex gap-2"><span>·</span><span>Several brands use near-identical names for different colors.</span></li>
                  <li className="flex gap-2"><span>·</span><span>Can map to multiple codes depending on model year.</span></li>
                  <li className="flex gap-2"><span>·</span><span>Not precise enough to mix paint on its own.</span></li>
                </ul>
              </div>
              <div className="rounded-2xl border border-primary/30 bg-primary/5 p-5 sm:p-6">
                <div className="text-[11px] font-black uppercase tracking-wider text-primary mb-2">
                  Paint Code
                </div>
                <p className="text-lg font-headline font-extrabold text-primary mb-3 font-mono tracking-wider">
                  QAB
                </p>
                <ul className="space-y-2 text-sm text-on-surface-variant">
                  <li className="flex gap-2"><span>·</span><span>Locked to one specific factory formulation.</span></li>
                  <li className="flex gap-2"><span>·</span><span>What every paint supplier and body shop actually uses.</span></li>
                  <li className="flex gap-2"><span>·</span><span>Unique per variant — even when the name is unchanged.</span></li>
                  <li className="flex gap-2"><span>·</span><span>The only reliable input for an invisible repair.</span></li>
                </ul>
              </div>
            </div>
          </section>

          {/* ── Mid-page CTA ───────────────────────────────── */}
          <section className="py-10">
            <div className="rounded-3xl bg-primary p-7 sm:p-10 text-center">
              <Sparkles className="w-8 h-8 text-yellow-300 mx-auto mb-3" />
              <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-white mb-2">
                Confirm the Exact Code by VIN
              </h2>
              <p className="text-white/80 text-sm sm:text-base mb-6 max-w-xl mx-auto">
                Found your color above? Lock in the precise code for your model year. Free VIN-based lookup, straight from the manufacturer&apos;s build record.
              </p>
              <div className="max-w-xl mx-auto bg-white rounded-2xl p-4 sm:p-5">
                <VinSearchForm size="lg" />
              </div>
            </div>
          </section>

          {/* ── Touch-up guidance ──────────────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">
              Found the Code — Now Find the Right Paint
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
                <p>
                  Once you have the factory code, ordering the correct paint is straightforward — as long as you give the supplier the <strong className="text-on-surface">code, not the color name</strong>. The code uniquely identifies the formula; the name is marketing.
                </p>
                <p>
                  For tiny rock chips, a factory-coded touch-up pen is fine. For anything larger, or for any pearl/tri-coat finish, a single-stage pen will look slightly off — those colors are built from multiple layers and need a body shop to reproduce the depth.
                </p>
                <p>
                  Buying a used car and the current color doesn&apos;t match the factory code? The vehicle was resprayed. Run an{" "}
                  <Link
                    href="/accident-history-check"
                    className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80"
                  >
                    accident history check
                  </Link>{" "}
                  to find out whether it was post-collision repair.
                </p>
              </div>
              <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Brush className="w-5 h-5 text-primary" />
                  <h3 className="font-headline font-extrabold text-primary">
                    Quick touch-up checklist
                  </h3>
                </div>
                <ul className="space-y-2 text-sm text-on-surface">
                  {[
                    "Order by code — never by color name alone",
                    "Match the code to your exact model year",
                    "Pearl or tri-coat? Use a body shop, not a pen",
                    "Clean and degrease before any application",
                    "Apply thin coats; let each cure fully",
                    "Photograph the door jamb sticker for next time",
                  ].map((tip) => (
                    <li key={tip} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" strokeWidth={3} />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-5 rounded-xl bg-white p-4 border border-outline-variant">
                  <p className="text-xs font-bold text-on-surface mb-2">
                    Don&apos;t have the code yet? Find it by VIN:
                  </p>
                  <VinSearchForm size="sm" />
                </div>
              </div>
            </div>
          </section>

          {/* ── Where else the code lives ──────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              Sticker Gone? Other Places the Code Hides
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">
              If the driver-side door jamb label is faded or missing, the code is usually backed up elsewhere — or recorded permanently against the VIN.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  icon: MapPin,
                  title: "Spare tire well / trunk floor",
                  body: "Audi, VW, and some European models print the lacquer-number sticker here rather than the door jamb.",
                },
                {
                  icon: MapPin,
                  title: "Engine-bay strut tower",
                  body: "BMW and Mini stamp the body-color code on the strut tower in factory non-fading ink.",
                },
                {
                  icon: MapPin,
                  title: "Front trunk (frunk)",
                  body: "Porsche 911, Cayman, and Boxster keep the data sticker inside the front luggage compartment.",
                },
                {
                  icon: Smartphone,
                  title: "In-car menu / owner account",
                  body: "Tesla and some newer EVs surface the paint code in the touchscreen software menu or the online owner account.",
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="flex gap-4 items-start rounded-2xl border border-outline-variant bg-surface p-5"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-base font-headline font-extrabold text-primary mb-1">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                        {item.body}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-6 rounded-2xl bg-secondary-container/40 border border-outline-variant p-5 sm:p-6">
              <div className="flex items-start gap-3">
                <FileText className="w-5 h-5 text-on-secondary-container flex-shrink-0 mt-0.5" />
                <p className="text-sm text-on-surface leading-relaxed">
                  <strong className="text-on-surface">Still nothing?</strong> The factory paint code is permanently linked to the VIN in the manufacturer&apos;s build record. Our free{" "}
                  <Link
                    href="/paint-code-lookup"
                    className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80"
                  >
                    VIN paint code lookup
                  </Link>{" "}
                  retrieves it even when every physical label is gone.
                </p>
              </div>
            </div>
          </section>

          {/* ── Internal links ─────────────────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              More VIN Tools That Pair With a Paint Code Finder
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-7">
              Color is one piece of a vehicle&apos;s story. These checks fill in the rest.
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
              Paint Code Finder — Frequently Asked Questions
            </h2>
            <p className="text-sm text-on-surface-variant mb-8">
              The questions people ask most when trying to find a car&apos;s color code.
            </p>
            <div className="space-y-3">
              {FAQS.map((f) => (
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
              <Zap className="w-3.5 h-3.5" /> Free · Instant · OEM Source
            </div>
            <h2 className="text-2xl sm:text-4xl font-headline font-extrabold text-primary mb-3">
              Find Any Vehicle&apos;s Exact Paint Code
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl mx-auto mb-8">
              Enter a 17-character VIN to retrieve the factory paint code and color name — or browse the brand directory above to match a color name to its code.
            </p>
            <div className="max-w-xl mx-auto bg-surface-container-low rounded-2xl p-5 border border-outline-variant">
              <VinSearchForm size="lg" />
            </div>
            <div className="mt-3 flex items-center justify-center gap-2 text-xs text-on-surface-variant">
              <Check className="w-3.5 h-3.5 text-green-500" strokeWidth={3} />
              No credit card · No sign-up · Free
            </div>
          </section>

          <RelatedChecks exclude="/paint-code-finder" />
        </div>
      </article>
    </>
  );
}
