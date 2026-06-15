import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import {
  Check,
  Shield,
  Search,
  FileText,
  AlertCircle,
  Palette,
  MapPin,
  ChevronRight,
  Lock,
  Zap,
  BadgeCheck,
  Sparkles,
  Layers,
  Wrench,
  Brush,
  Eye,
  Camera,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import PaintCodeLocator from "./PaintCodeLocator";
import PaintCodeDiagram from "./PaintCodeDiagram";
import { PAINT_CODE_BRANDS } from "@/lib/paint-codes";

const SITE = "https://www.carcheckervin.com";

export const metadata: Metadata = {
  title:
    "Paint Code Lookup by VIN — Find Your Car's Factory Color Code (Free, 30+ Brands)",
  description:
    "Find your exact OEM paint code by VIN. Interactive paint code locator for 30+ brands — door jamb sticker locations, code formats, real factory color examples, and touch-up paint matching. 100% free.",
  keywords: [
    "paint code lookup",
    "paint code lookup by VIN",
    "car paint code by VIN",
    "OEM paint code",
    "factory paint code",
    "color code lookup",
    "vehicle color code",
    "VIN paint code finder",
    "find car paint code",
    "touch up paint code",
    "body shop paint code",
    "Toyota paint code",
    "Honda paint code",
    "Ford paint code",
    "Chevrolet paint code",
    "BMW paint code",
    "Mercedes paint code",
    "Subaru paint code",
    "Nissan paint code",
    "Mazda paint code",
    "Hyundai paint code",
    "Kia paint code",
    "Tesla paint code",
    "Volkswagen paint code",
    "Audi paint code",
    "color code by VIN",
    "where is my paint code",
    "paint code on door jamb",
    "OEM color code finder",
    "factory color name lookup",
  ],
  alternates: {
    canonical: "/paint-code-lookup",
    languages: {
      en: "https://www.carcheckervin.com/paint-code-lookup",
      es: "https://www.carcheckervin.com/es/codigo-de-pintura",
      "x-default": "https://www.carcheckervin.com/paint-code-lookup",
    },
  },
  openGraph: {
    title: "Paint Code Lookup by VIN — Free OEM Color Code Finder",
    description:
      "Interactive paint code finder for 30+ brands. Look up your exact factory color code by VIN — free, instant, no sign-up.",
    url: `${SITE}/paint-code-lookup`,
    type: "article",
    siteName: "CarCheckerVIN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Paint Code Lookup by VIN — Free OEM Color Code Finder",
    description:
      "Find any vehicle's factory paint code. Interactive tool for 30+ brands. Free, instant.",
  },
  robots: { index: true, follow: true },
};

/* ── JSON-LD schemas ───────────────────────────────────────────── */

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Paint Code Lookup",
  url: `${SITE}/paint-code-lookup`,
  applicationCategory: "AutomotiveApplication",
  operatingSystem: "All",
  description:
    "Interactive tool to find any vehicle's factory paint code by VIN or by manufacturer. Covers 30+ brands with sticker locations, code formats, and real example codes.",
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
      name: "Where is the paint code on my car?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "On most vehicles the paint code is printed on a sticker inside the driver-side door jamb, on the same label as the VIN and tire pressure data. Audi, VW, and Porsche typically place it in the spare tire well or front trunk. BMW and Mini often use the engine bay strut tower. Our interactive locator above shows the exact spot for 30+ brands.",
      },
    },
    {
      "@type": "Question",
      name: "Can I look up a paint code with just the VIN?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The factory paint code is recorded against the VIN in the manufacturer's build database. A VIN-based paint code lookup retrieves the original color code even when the physical door jamb sticker is damaged, faded, or has been removed during repair.",
      },
    },
    {
      "@type": "Question",
      name: "Is the paint code the same as the color name?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. The color name (e.g., 'Crystal Black Pearl') is marketing copy that may be reused with slightly different formulas across years. The paint code (e.g., 'NH731P') is tied to a specific formulation and is what paint suppliers use to mix the exact match.",
      },
    },
    {
      "@type": "Question",
      name: "What does BC/CC on my door jamb mean?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "BC/CC stands for Base Coat / Clear Coat — the two-stage paint process used on most modern vehicles. GM brands (Chevrolet, GMC, Buick, Cadillac) print 'BC/CC' next to the paint code on the SPID label. If the label shows a third layer (mid-coat or pearl), the color is a tri-coat and requires multi-stage application for an invisible repair.",
      },
    },
    {
      "@type": "Question",
      name: "What is a tri-coat (3-stage) paint?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A tri-coat paint uses three layers: a colored base, a translucent mid-coat (usually with pearl or mica flakes), and a clear coat. Examples include Toyota Blizzard Pearl, GM White Diamond Tricoat, and Mazda Soul Red Crystal. Tri-coats cannot be matched with a single touch-up pen — they require professional spray application to reproduce the depth.",
      },
    },
    {
      "@type": "Question",
      name: "What if my paint code sticker is missing or damaged?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Run a VIN-based paint code lookup using the form above. The factory code is permanently associated with the VIN in the manufacturer's build database, so we can retrieve it even if the door jamb label is unreadable.",
      },
    },
    {
      "@type": "Question",
      name: "How do I find a Toyota paint code?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Toyota paint codes are 3-character alphanumeric (e.g., 040 for Super White, 1F7 for Classic Silver Metallic, 8S6 for Blueprint). They are printed on the driver-side door jamb service label under 'C/TR' (Color / Trim). Two-tone vehicles list both codes separated by a slash.",
      },
    },
    {
      "@type": "Question",
      name: "How do I find a Honda or Acura paint code?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Honda and Acura paint codes have a color-family prefix and a 3-digit number, sometimes with a suffix. For example, NH731P (Crystal Black Pearl), R513 (Rallye Red), B593M (Aegean Blue Metallic). The 'P' suffix means pearl (tri-coat) and 'M' means metallic. Find the code on the driver-side door jamb service label.",
      },
    },
    {
      "@type": "Question",
      name: "How do I find a Ford paint code?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ford uses just two characters — easy to miss on the door jamb sticker. Look on the Safety Certification Label inside the driver's door for a row labeled 'PNT' or 'EXT PNT'. Examples: UA = Tuxedo Black, YZ = Oxford White, J7 = Magnetic Metallic, PQ = Race Red.",
      },
    },
    {
      "@type": "Question",
      name: "Where is the paint code on a BMW?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "On BMW, the paint code is a 3-character code (e.g., 668 for Jet Black, 475 for Black Sapphire Metallic, A52 for Space Gray). It's typically on the VIN sticker on the driver-side door jamb and again on the strut tower in the engine bay. Newer BMWs use alphanumeric codes (e.g., C4P, C3J) — same database, different format.",
      },
    },
    {
      "@type": "Question",
      name: "Where do I find an Audi or VW paint code?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Audi and Volkswagen paint codes always start with the letter 'L' (e.g., LY9C for Audi Ibis White, LC9X for VW Deep Black Pearl). The sticker is most often in the spare tire well in the trunk, sometimes on the driver-side door jamb on newer models, and also in the service booklet in the glove box.",
      },
    },
    {
      "@type": "Question",
      name: "Can a body shop match my color without a paint code?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Some shops match by eye or with a spectrophotometer, but the result is rarely as accurate as a factory-coded mix. UV exposure also fades original paint over time, so even with the correct code, large repairs may need 'blending' into adjacent panels for an invisible result. Always provide the paint code and let the shop decide whether to blend.",
      },
    },
    {
      "@type": "Question",
      name: "Why are touch-up paint pens often slightly off-color?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Touch-up pens use a single-stage formula sprayed thinly with a brush. They cannot reproduce the depth of a base/clear or tri-coat finish. They also age faster than factory paint. Pens work well for tiny rock chips but become visible on anything larger than a few millimeters.",
      },
    },
    {
      "@type": "Question",
      name: "Is the paint code different by model year?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sometimes. A color may share a name across years but have a slightly different formulation — and a new code. For example, Toyota Super White (040) has had multiple variants across the years. Always verify the code for the specific model year of your vehicle, not just the color name.",
      },
    },
    {
      "@type": "Question",
      name: "Will a VIN check show if my car was resprayed?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A VIN check returns the factory original paint code. If the vehicle's current color does not match that code, the car has been repainted. This can be a clue to undisclosed accident repair — pair the paint code lookup with our accident history check for a complete picture.",
      },
    },
    {
      "@type": "Question",
      name: "What is OEM paint and why does it matter?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "OEM (Original Equipment Manufacturer) paint is the factory formulation specified by the carmaker. Using OEM-grade paint mixed to your factory code is the only reliable way to get an invisible repair, preserve resale value, and avoid the metameric color shift that happens when generic 'close enough' paint is used.",
      },
    },
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Find Your Car's Paint Code",
  description:
    "Step-by-step guide to locating your vehicle's factory paint code on the door jamb or by VIN lookup.",
  totalTime: "PT2M",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the driver's door",
      text: "Open the driver-side door and find the white or silver service label printed on the door jamb (the metal frame that the door latches onto) or on the edge of the door itself.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Find the paint code row",
      text: "Look for a row labeled 'Color,' 'Paint,' 'EXT,' 'PNT,' 'BC/CC,' or 'Lack' (German cars). The code is usually a 2-3 character alphanumeric sequence.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Write down the exact code",
      text: "Copy the code character-for-character. Watch for easily-confused characters like 0 vs O, 1 vs I, and 8 vs B. The code is case-sensitive at some paint suppliers.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Check secondary locations if missing",
      text: "If the door jamb sticker is damaged or missing, check the spare tire well (Audi, VW), the engine bay strut tower (BMW, Mini), the front trunk (Porsche), or inside the glove box (newer trucks and luxury SUVs).",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Use a VIN-based lookup as a fallback",
      text: "If no sticker is readable, run a VIN-based paint code lookup. The factory paint code is permanently linked to the VIN in the manufacturer's build database — our free VIN check retrieves it.",
    },
    {
      "@type": "HowToStep",
      position: 6,
      name: "Order paint with the code",
      text: "Provide the code (not the color name) to any paint supplier or body shop. The code uniquely identifies the formulation; the name alone is not enough.",
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
      name: "Paint Code Lookup",
      item: `${SITE}/paint-code-lookup`,
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
  url: `${SITE}/paint-code-lookup`,
};

/* ── Static UI data ────────────────────────────────────────────── */

const TRUST_STATS = [
  { icon: Palette, value: "30+", label: "brands covered" },
  { icon: Shield, value: "OEM", label: "factory paint codes" },
  { icon: Zap, value: "Instant", label: "no sign-up needed" },
  { icon: BadgeCheck, value: "Free preview", label: "no credit card" },
];

const HOW_TO_STEPS = [
  {
    step: "01",
    icon: Eye,
    title: "Open the driver's door",
    body: "Find the white or silver service label on the door jamb (the metal frame the door latches onto). On most modern vehicles, this is where your paint code lives — printed alongside the VIN, tire pressure spec, and gross weight rating.",
  },
  {
    step: "02",
    icon: Search,
    title: "Look for the right row",
    body: "Different brands label the row differently: 'Color', 'Paint', 'EXT', 'PNT', 'BC/CC' (GM), 'Lack' or 'Lack-Nr.' (German cars), 'C/TR' (Toyota/Lexus). Use the interactive locator above to see exactly what to look for on your brand.",
  },
  {
    step: "03",
    icon: FileText,
    title: "Copy the code exactly",
    body: "Paint codes are short (2–5 characters) but precision matters. Distinguish carefully between 0 and O, 1 and I, 8 and B. The code is the identity of the formulation — one character off and your paint supplier mixes the wrong color.",
  },
  {
    step: "04",
    icon: MapPin,
    title: "Check secondary spots if needed",
    body: "If the door jamb sticker is faded, peeled, or missing, the code is usually backed up elsewhere: the strut tower (BMW, Mini), the spare tire well (Audi, VW), the front trunk (Porsche), or the glove box (full-size trucks).",
  },
  {
    step: "05",
    icon: Sparkles,
    title: "Fall back to a VIN lookup",
    body: "When no sticker is readable, run a VIN-based paint code lookup. The factory color is recorded against the VIN in the manufacturer's build database — our free VIN check returns it instantly without needing to find any physical label.",
  },
  {
    step: "06",
    icon: Brush,
    title: "Order paint by code, not by name",
    body: "Give the code to any paint supplier, body shop, or touch-up retailer. The code uniquely identifies the formulation; color names are marketing terms that get reused across years with slightly different formulas.",
  },
];

const FORMAT_TABLE_ROWS = [
  {
    family: "American (Detroit Three)",
    detail:
      "GM uses 'WA' + 4 digits or 3-char RPO codes. Ford and Lincoln use 2 characters. Stellantis (Chrysler, Dodge, Jeep, Ram) uses a 'P' prefix + 2 chars.",
    examples: "WA8555, UA, PW7",
  },
  {
    family: "Japanese",
    detail:
      "Toyota, Lexus, Mazda, Subaru, Mitsubishi all use 3-character codes. Honda and Acura prefix with a color-family letter + 3-digit number. Nissan and Infiniti use 3-character codes.",
    examples: "040, 1F7, NH731P, KH3",
  },
  {
    family: "Korean (Hyundai Motor Group)",
    detail:
      "Hyundai, Kia, and Genesis all use 3-character alphanumeric codes. Many are shared across brands.",
    examples: "PGU, SWP, R2R",
  },
  {
    family: "German (BMW Group / VW Group / Mercedes)",
    detail:
      "BMW and Mini use 3-digit numeric or alphanumeric codes. VW and Audi use 'L' + 3 chars. Mercedes-Benz uses a 3-digit numeric code labeled 'Lack'. Porsche uses 3 chars in the frunk.",
    examples: "668, LY9C, 040 (MB), C9A",
  },
  {
    family: "European (other)",
    detail:
      "Volvo uses a 3-digit numeric code. Jaguar Land Rover uses a letter + digits code on the B-pillar plate.",
    examples: "614, 1AG, 867",
  },
  {
    family: "Tesla",
    detail:
      "Tesla uses a much smaller palette (~5 colors per model) with simple alphanumeric codes available in the touchscreen menu and the Tesla account.",
    examples: "PPSW, PMNG, PPSB",
  },
];

const INTERNAL_LINKS = [
  {
    href: "/vin-check",
    label: "Full VIN History Check",
    desc: "Title, accident, odometer, recall, paint, and ownership records in one report.",
  },
  {
    href: "/accident-history-check",
    label: "Accident History Check",
    desc: "Verify if a vehicle was previously repainted as part of post-collision repair.",
  },
  {
    href: "/vin-decoder",
    label: "VIN Decoder",
    desc: "Decode any 17-character VIN to specs, trim, and factory options.",
  },
  {
    href: "/build-sheet",
    label: "Build Sheet by VIN",
    desc: "Pull the original factory build sheet — paint code, options, packages.",
  },
  {
    href: "/window-sticker",
    label: "Window Sticker Maker",
    desc: "Recreate the original Monroney sticker with color, trim, and options.",
  },
  {
    href: "/recall-check",
    label: "Recall Check",
    desc: "Open NHTSA recalls — useful when buying a repainted vehicle.",
  },
  {
    href: "/salvage-title-check",
    label: "Salvage Title Check",
    desc: "Was the car a total loss before its respray? Critical context.",
  },
  {
    href: "/odometer-check",
    label: "Odometer Check",
    desc: "Cross-check mileage against the vehicle's paint and condition.",
  },
];

const FAQS = [
  {
    q: "Where is the paint code on my car?",
    a: "On most vehicles the paint code is printed on a sticker inside the driver-side door jamb, on the same label as the VIN and tire pressure data. Audi, VW, and Porsche typically place it in the spare tire well or front trunk. BMW and Mini often use the engine bay strut tower. Our interactive locator above shows the exact spot for 30+ brands.",
  },
  {
    q: "Can I look up a paint code with just the VIN?",
    a: "Yes. The factory paint code is recorded against the VIN in the manufacturer's build database. A VIN-based paint code lookup retrieves the original color code even when the physical door jamb sticker is damaged, faded, or has been removed during repair.",
  },
  {
    q: "Is the paint code the same as the color name?",
    a: "No. The color name (e.g., 'Crystal Black Pearl') is marketing copy that may be reused with slightly different formulas across years. The paint code (e.g., 'NH731P') is tied to a specific formulation and is what paint suppliers use to mix the exact match.",
  },
  {
    q: "What does BC/CC on my door jamb mean?",
    a: "BC/CC stands for Base Coat / Clear Coat — the two-stage paint process used on most modern vehicles. GM brands (Chevrolet, GMC, Buick, Cadillac) print 'BC/CC' next to the paint code on the SPID label. If the label shows a third layer (mid-coat or pearl), the color is a tri-coat and requires multi-stage application for an invisible repair.",
  },
  {
    q: "What is a tri-coat (3-stage) paint?",
    a: "A tri-coat paint uses three layers: a colored base, a translucent mid-coat (usually with pearl or mica flakes), and a clear coat. Examples include Toyota Blizzard Pearl, GM White Diamond Tricoat, and Mazda Soul Red Crystal. Tri-coats cannot be matched with a single touch-up pen — they require professional spray application to reproduce the depth.",
  },
  {
    q: "What if my paint code sticker is missing or damaged?",
    a: "Run a VIN-based paint code lookup using the form above. The factory code is permanently associated with the VIN in the manufacturer's build database, so we can retrieve it even if the door jamb label is unreadable.",
  },
  {
    q: "How do I find a Toyota paint code?",
    a: "Toyota paint codes are 3-character alphanumeric (e.g., 040 for Super White, 1F7 for Classic Silver Metallic, 8S6 for Blueprint). They are printed on the driver-side door jamb service label under 'C/TR' (Color / Trim). Two-tone vehicles list both codes separated by a slash.",
  },
  {
    q: "How do I find a Honda or Acura paint code?",
    a: "Honda and Acura paint codes have a color-family prefix and a 3-digit number, sometimes with a suffix. For example, NH731P (Crystal Black Pearl), R513 (Rallye Red), B593M (Aegean Blue Metallic). The 'P' suffix means pearl (tri-coat) and 'M' means metallic. Find the code on the driver-side door jamb service label.",
  },
  {
    q: "How do I find a Ford paint code?",
    a: "Ford uses just two characters — easy to miss on the door jamb sticker. Look on the Safety Certification Label inside the driver's door for a row labeled 'PNT' or 'EXT PNT'. Examples: UA = Tuxedo Black, YZ = Oxford White, J7 = Magnetic Metallic, PQ = Race Red.",
  },
  {
    q: "Where is the paint code on a BMW?",
    a: "On BMW, the paint code is a 3-character code (e.g., 668 for Jet Black, 475 for Black Sapphire Metallic, A52 for Space Gray). It's typically on the VIN sticker on the driver-side door jamb and again on the strut tower in the engine bay. Newer BMWs use alphanumeric codes (e.g., C4P, C3J) — same database, different format.",
  },
  {
    q: "Where do I find an Audi or VW paint code?",
    a: "Audi and Volkswagen paint codes always start with the letter 'L' (e.g., LY9C for Audi Ibis White, LC9X for VW Deep Black Pearl). The sticker is most often in the spare tire well in the trunk, sometimes on the driver-side door jamb on newer models, and also in the service booklet in the glove box.",
  },
  {
    q: "Can a body shop match my color without a paint code?",
    a: "Some shops match by eye or with a spectrophotometer, but the result is rarely as accurate as a factory-coded mix. UV exposure also fades original paint over time, so even with the correct code, large repairs may need 'blending' into adjacent panels for an invisible result. Always provide the paint code and let the shop decide whether to blend.",
  },
  {
    q: "Why are touch-up paint pens often slightly off-color?",
    a: "Touch-up pens use a single-stage formula sprayed thinly with a brush. They cannot reproduce the depth of a base/clear or tri-coat finish. They also age faster than factory paint. Pens work well for tiny rock chips but become visible on anything larger than a few millimeters.",
  },
  {
    q: "Is the paint code different by model year?",
    a: "Sometimes. A color may share a name across years but have a slightly different formulation — and a new code. For example, Toyota Super White (040) has had multiple variants across the years. Always verify the code for the specific model year of your vehicle, not just the color name.",
  },
  {
    q: "Will a VIN check show if my car was resprayed?",
    a: "A VIN check returns the factory original paint code. If the vehicle's current color does not match that code, the car has been repainted. This can be a clue to undisclosed accident repair — pair the paint code lookup with our accident history check for a complete picture.",
  },
  {
    q: "What is OEM paint and why does it matter?",
    a: "OEM (Original Equipment Manufacturer) paint is the factory formulation specified by the carmaker. Using OEM-grade paint mixed to your factory code is the only reliable way to get an invisible repair, preserve resale value, and avoid the metameric color shift that happens when generic 'close enough' paint is used.",
  },
];

/* ── Page ──────────────────────────────────────────────────────── */

export default function PaintCodeLookupPage() {
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
                { label: "Paint Code Lookup" },
              ]}
              onDark
            />

            <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
              <Palette className="w-4 h-4" /> OEM Factory Paint Codes &nbsp;·&nbsp; 30+ Brands
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-headline font-extrabold leading-tight mb-4">
              Paint Code Lookup by VIN —{" "}
              <span style={{ color: "var(--color-secondary-container)" }}>
                Find Your Factory Color
              </span>
            </h1>

            <p className="speakable-intro text-base sm:text-xl text-white/85 max-w-3xl mb-8 leading-relaxed">
              Every vehicle leaves the factory with a specific paint code that identifies the exact color formulation. Find yours by VIN, or use the interactive locator below to see where your manufacturer hides the sticker.
            </p>

            <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-xl">
              <h2 className="text-base sm:text-lg font-headline font-extrabold text-primary mb-1">
                Get Your Paint Code by VIN
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
          {/* ── Interactive Locator (the centerpiece) ──────── */}
          <section className="py-12 sm:py-16">
            <Suspense
              fallback={
                <div className="rounded-3xl border border-outline-variant bg-surface-container-lowest p-7 text-sm text-on-surface-variant">
                  Loading paint code locator…
                </div>
              }
            >
              <PaintCodeLocator />
            </Suspense>
          </section>

          {/* ── How to find your paint code ──────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              How to Find Your Car&apos;s Paint Code — Step-by-Step
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl">
              Six steps from &ldquo;I have no idea&rdquo; to &ldquo;I have the exact code in hand.&rdquo; Works on virtually any passenger car, truck, SUV, or motorcycle.
            </p>

            {/* Interactive 3D location diagram */}
            <PaintCodeDiagram />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {HOW_TO_STEPS.map((s) => {
                const Icon = s.icon;
                return (
                  <div
                    key={s.step}
                    className="flex gap-4 items-start rounded-2xl border border-outline-variant bg-surface p-5 sm:p-6"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-[11px] font-black uppercase tracking-wider text-primary/70 mb-0.5">
                        Step {s.step}
                      </div>
                      <h3 className="text-base sm:text-lg font-headline font-extrabold text-primary mb-1.5">
                        {s.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                        {s.body}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ── Paint code formats by brand (table) ─────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              Paint Code Formats by Brand Family — At a Glance
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl">
              Code length and format vary widely by manufacturer family. Knowing the pattern makes the code easier to spot on a faded door jamb sticker.
            </p>
            <div className="overflow-x-auto rounded-2xl border border-outline-variant">
              <table className="w-full border-collapse min-w-[640px] text-sm">
                <thead className="bg-surface-container-low">
                  <tr>
                    <th className="p-4 text-left font-headline font-extrabold text-primary">
                      Brand Family
                    </th>
                    <th className="p-4 text-left font-headline font-extrabold text-primary">
                      Format
                    </th>
                    <th className="p-4 text-left font-headline font-extrabold text-primary">
                      Example Codes
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {FORMAT_TABLE_ROWS.map((row) => (
                    <tr
                      key={row.family}
                      className="border-t border-outline-variant/60 align-top"
                    >
                      <td className="p-4 font-bold text-on-surface">
                        {row.family}
                      </td>
                      <td className="p-4 text-on-surface-variant leading-relaxed">
                        {row.detail}
                      </td>
                      <td className="p-4">
                        <code className="font-mono text-xs bg-surface-container-low rounded px-2 py-1 text-primary">
                          {row.examples}
                        </code>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-xs text-on-surface-variant">
              Want the exact spot on your specific brand? Use the interactive locator at the top of this page — it covers {PAINT_CODE_BRANDS.length}+ manufacturers with sticker locations, label words, and real example codes.
            </p>
          </section>

          {/* ── Sticker missing / damaged ──────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">
              Sticker Missing, Damaged, or Unreadable? Use the VIN.
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
                <p>
                  Door jamb stickers fade in direct sun, get peeled off during body work, or get covered by a replacement door after a collision repair. When that happens, the only reliable way back to your factory paint code is the VIN.
                </p>
                <p>
                  Every vehicle&apos;s build record includes the factory paint code, locked to the VIN at the time of manufacture. Our free VIN check pulls that record so you can order touch-up paint, brief a body shop, or verify that the current color matches the factory original.
                </p>
                <p>
                  This is especially useful when buying a used car: if the current color doesn&apos;t match the factory code, the vehicle has been repainted — which warrants further investigation with an{" "}
                  <Link
                    href="/accident-history-check"
                    className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80"
                  >
                    accident history check
                  </Link>{" "}
                  to find out why.
                </p>
              </div>
              <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <AlertCircle className="w-5 h-5 text-primary" />
                  <h3 className="font-headline font-extrabold text-primary">
                    Common reasons the sticker is gone
                  </h3>
                </div>
                <ul className="space-y-2 text-sm text-on-surface">
                  {[
                    "UV fading — label is intact but unreadable",
                    "Door was replaced after a collision repair",
                    "Sticker peeled or scraped during detailing",
                    "Aftermarket vinyl wrap or trim covering the label",
                    "Repainted door jamb with the sticker masked over",
                    "Vehicle imported and the label is in another language or different position",
                  ].map((reason) => (
                    <li key={reason} className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-5 rounded-xl bg-white p-4 border border-outline-variant">
                  <p className="text-xs font-bold text-on-surface mb-2">
                    Run a VIN-based paint code lookup:
                  </p>
                  <VinSearchForm size="sm" />
                </div>
              </div>
            </div>
          </section>

          {/* ── Paint code vs color name ───────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              Paint Code vs. Color Name — What&apos;s the Difference?
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl leading-relaxed">
              Manufacturer color names are marketing terms; paint codes are technical specifications. The difference is invisible — until you ask a paint supplier to mix a quart.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5 sm:p-6">
                <div className="text-[11px] font-black uppercase tracking-wider text-on-surface-variant mb-2">
                  Color Name
                </div>
                <p className="text-lg font-headline font-extrabold text-on-surface mb-3">
                  &ldquo;Velocity Red Satin Mica&rdquo;
                </p>
                <ul className="space-y-2 text-sm text-on-surface-variant">
                  <li className="flex gap-2"><span>·</span><span>Marketing description used in brochures and ads.</span></li>
                  <li className="flex gap-2"><span>·</span><span>Can be re-used across model years with subtle formula changes.</span></li>
                  <li className="flex gap-2"><span>·</span><span>Multiple brands may share similar names for very different colors.</span></li>
                  <li className="flex gap-2"><span>·</span><span>Not enough on its own to mix paint.</span></li>
                </ul>
              </div>
              <div className="rounded-2xl border border-primary/30 bg-primary/5 p-5 sm:p-6">
                <div className="text-[11px] font-black uppercase tracking-wider text-primary mb-2">
                  Paint Code
                </div>
                <p className="text-lg font-headline font-extrabold text-primary mb-3 font-mono tracking-wider">
                  41V
                </p>
                <ul className="space-y-2 text-sm text-on-surface-variant">
                  <li className="flex gap-2"><span>·</span><span>Locked to a specific factory formulation.</span></li>
                  <li className="flex gap-2"><span>·</span><span>Used by paint suppliers, body shops, and OEM parts catalogs.</span></li>
                  <li className="flex gap-2"><span>·</span><span>Unique per color variant — even if the name is unchanged.</span></li>
                  <li className="flex gap-2"><span>·</span><span>The only reliable input for an invisible repair.</span></li>
                </ul>
              </div>
            </div>
          </section>

          {/* ── How to use the code (practical guidance) ───── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              What to Do With Your Paint Code — Touch-Up, Body Shop, Ordering
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">
              Once you have the code, here&apos;s how to put it to work for each scenario — from a 5-minute rock-chip fix to a full panel respray.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  icon: Brush,
                  title: "Small chips & light scratches",
                  body: "Order a factory-coded touch-up pen from the dealer or an aftermarket supplier like AutomotiveTouchup or PaintScratch. Best for sub-millimeter rock chips. Clean, degrease, apply in thin layers, let cure 24h between coats, then clear coat.",
                },
                {
                  icon: Layers,
                  title: "Deeper scratches & panel rash",
                  body: "Use a brush-on bottle plus blending solvent, or upgrade to a spray can of factory-mixed paint. For colors with pearl or mica, a tri-coat process is needed — a single-coat product will not match.",
                },
                {
                  icon: Wrench,
                  title: "Full panel repair (body shop)",
                  body: "Hand the body shop your paint code. A good shop will mix to the code, then blend into adjacent panels to absorb any UV fade on the original paint. Insist on basecoat + clearcoat — never a single-stage shortcut on a modern car.",
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5"
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-base font-headline font-extrabold text-primary mb-1.5">
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
                <Camera className="w-5 h-5 text-on-secondary-container flex-shrink-0 mt-0.5" />
                <p className="text-sm text-on-surface leading-relaxed">
                  <strong className="text-on-surface">Pro tip:</strong> photograph the door jamb sticker in natural light and store it with your other vehicle documents. The code is the same for the life of the vehicle — having a clean image saves a trip back to the driveway every time you need touch-up.
                </p>
              </div>
            </div>
          </section>

          {/* ── Mid-page CTA ───────────────────────────────── */}
          <section className="py-10">
            <div className="rounded-3xl bg-primary p-7 sm:p-10 text-center">
              <Sparkles className="w-8 h-8 text-yellow-300 mx-auto mb-3" />
              <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-white mb-2">
                Get Your Factory Paint Code in Seconds
              </h2>
              <p className="text-white/80 text-sm sm:text-base mb-6 max-w-xl mx-auto">
                Free VIN-based lookup. Returns the OEM paint code and color name straight from the manufacturer&apos;s build record.
              </p>
              <div className="max-w-xl mx-auto bg-white rounded-2xl p-4 sm:p-5">
                <VinSearchForm size="lg" />
              </div>
            </div>
          </section>

          {/* ── Internal links ─────────────────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              More VIN Tools That Pair Well With a Paint Code Lookup
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-7">
              Paint history rarely tells the whole story. These checks fill in the rest of the picture.
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
              Paint Code Lookup — Frequently Asked Questions
            </h2>
            <p className="text-sm text-on-surface-variant mb-8">
              Detailed answers to the questions most paint-code searchers ask.
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
              Find the Exact Paint Code for Any Vehicle
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl mx-auto mb-8">
              Enter a 17-character VIN to retrieve the factory paint code and color name. Use it for touch-up, body shop matching, or to verify a respray on a used vehicle.
            </p>
            <div className="max-w-xl mx-auto bg-surface-container-low rounded-2xl p-5 border border-outline-variant">
              <VinSearchForm size="lg" />
            </div>
            <div className="mt-3 flex items-center justify-center gap-2 text-xs text-on-surface-variant">
              <Check className="w-3.5 h-3.5 text-green-500" strokeWidth={3} />
              No credit card · No sign-up · Free
            </div>
          </section>

          <RelatedChecks exclude="/paint-code-lookup" />
        </div>
      </article>
    </>
  );
}
