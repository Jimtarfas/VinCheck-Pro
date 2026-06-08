import type { Metadata } from "next";
import Link from "next/link";
import {
  Bike,
  Sparkles,
  Search,
  Hash,
  ShieldCheck,
  Zap,
  Globe2,
  Calendar,
  Check,
  ChevronRight,
  Lock,
  BadgeCheck,
  MapPin,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import MotorcycleVinSearch from "./MotorcycleVinSearch";

const PAGE_URL = "https://www.carcheckervin.com/motorcycle-vin-search";
const OG_IMAGE = "https://www.carcheckervin.com/opengraph-image";
const PUBLISHED = "2026-05-07";
const MODIFIED = "2026-06-06";

export const metadata: Metadata = {
  title:
    "Free Motorcycle VIN Search & Decoder — Look Up Any Bike VIN Instantly",
  description:
    "Free motorcycle VIN search and decoder. Enter any 17-character bike VIN to instantly decode the manufacturer, country of origin, model year, plant code, and production number. Works for Harley-Davidson, Honda, Yamaha, Suzuki, Kawasaki, BMW, Ducati, Triumph, KTM, and every motorcycle brand.",
  keywords: [
    // Primary
    "motorcycle VIN search",
    "motorcycle VIN decoder",
    "motorcycle VIN lookup",
    "free motorcycle VIN search",
    "free motorcycle VIN decoder",
    "decode motorcycle VIN",
    "bike VIN search",
    "bike VIN decoder",
    "bike VIN lookup",
    "free bike VIN check",
    // Brand variations
    "Harley-Davidson VIN decoder",
    "Harley VIN lookup",
    "Honda motorcycle VIN decoder",
    "Yamaha VIN search",
    "Suzuki motorcycle VIN lookup",
    "Kawasaki VIN decoder",
    "BMW motorcycle VIN search",
    "Ducati VIN decoder",
    "Triumph VIN lookup",
    "KTM VIN search",
    "Indian motorcycle VIN decoder",
    "Royal Enfield VIN search",
    "Aprilia VIN lookup",
    "MV Agusta VIN decoder",
    "Husqvarna VIN search",
    "Moto Guzzi VIN lookup",
    // Action / format
    "lookup motorcycle by VIN",
    "find motorcycle year by VIN",
    "motorcycle WMI lookup",
    "motorcycle manufacturer by VIN",
    "what year is my motorcycle",
    // Long-tail
    "how to read a motorcycle VIN",
    "what does a motorcycle VIN mean",
    "motorcycle VIN check free no signup",
    "bike VIN check by 17 digits",
  ],
  authors: [{ name: "CarCheckerVIN", url: "https://www.carcheckervin.com" }],
  creator: "CarCheckerVIN",
  publisher: "CarCheckerVIN",
  category: "Automotive Tools",
  applicationName: "CarCheckerVIN Motorcycle VIN Search",
  alternates: {
    canonical: "/motorcycle-vin-search",
    languages: { "en-US": "/motorcycle-vin-search" },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title:
      "Free Motorcycle VIN Search & Decoder — Look Up Any Bike VIN Instantly",
    description:
      "Decode any motorcycle VIN in one click. Manufacturer, country, model year, plant, and production sequence — works for Harley, Honda, Yamaha, Suzuki, Kawasaki, BMW, Ducati, Triumph, and KTM.",
    url: PAGE_URL,
    siteName: "CarCheckerVIN",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "CarCheckerVIN Motorcycle VIN Search — free 17-character bike VIN decoder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@CarCheckerVIN",
    creator: "@CarCheckerVIN",
    title: "Free Motorcycle VIN Search & Decoder",
    description:
      "Decode any 17-character motorcycle VIN instantly — manufacturer, country, year, plant, and production number. 100% free.",
    images: [OG_IMAGE],
  },
  other: {
    "msapplication-TileColor": "#0c2d5e",
    "theme-color": "#0c2d5e",
  },
};

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": ["WebApplication", "SoftwareApplication"],
  "@id": `${PAGE_URL}#tool`,
  name: "Motorcycle VIN Search",
  alternateName: [
    "Motorcycle VIN Decoder",
    "Motorcycle VIN Lookup",
    "Bike VIN Search",
    "Free Motorcycle VIN Decoder",
  ],
  url: PAGE_URL,
  applicationCategory: ["UtilitiesApplication", "BusinessApplication"],
  applicationSubCategory: "Automotive · Motorcycles",
  operatingSystem: "Any (Web Browser)",
  browserRequirements: "Requires JavaScript and a modern web browser",
  inLanguage: "en-US",
  isAccessibleForFree: true,
  description:
    "Free online motorcycle VIN search tool. Enter any 17-character motorcycle VIN to instantly decode manufacturer, country of origin, model year, plant code, and production sequence.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
  },
  featureList: [
    "Instant 17-character motorcycle VIN decode",
    "Manufacturer (WMI) identification — 25+ brands",
    "Country and region of origin",
    "Model year decode (with 30-year cycle disambiguation)",
    "Plant code and production sequence",
    "Visual VIN character breakdown",
    "Free, no signup required for the basic decode",
  ],
  // aggregateRating intentionally omitted. Small honest counts on a young
  // domain read worse to AI overviews than no aggregate at all. The
  // verified Trustpilot reviews on the homepage Product JSON-LD carry the
  // social proof per-row, each linked to its source URL.
  publisher: {
    "@type": "Organization",
    name: "CarCheckerVIN",
    url: "https://www.carcheckervin.com",
    logo: {
      "@type": "ImageObject",
      url: "https://www.carcheckervin.com/icon.png",
    },
  },
  datePublished: PUBLISHED,
  dateModified: MODIFIED,
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.carcheckervin.com/" },
    { "@type": "ListItem", position: 2, name: "Tools", item: "https://www.carcheckervin.com/tools" },
    { "@type": "ListItem", position: 3, name: "Motorcycle VIN Search", item: PAGE_URL },
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Decode a Motorcycle VIN",
  description:
    "Decode any 17-character motorcycle VIN in three steps to identify the manufacturer, model year, country of origin, plant code, and production number.",
  totalTime: "PT30S",
  estimatedCost: { "@type": "MonetaryAmount", currency: "USD", value: "0" },
  supply: [{ "@type": "HowToSupply", name: "17-character motorcycle VIN" }],
  tool: [{ "@type": "HowToTool", name: "CarCheckerVIN Motorcycle VIN Search" }],
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Find the VIN on the bike",
      text: "On most modern motorcycles the 17-character VIN is stamped on the steering neck (right side, just below the handlebars), the engine case, and the frame near the swingarm pivot. It also appears on the title and registration.",
      url: `${PAGE_URL}#find-vin`,
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter the VIN above",
      text: "Type or paste the 17-character VIN into the search box. Don't worry about spaces or hyphens — we strip them automatically.",
      url: `${PAGE_URL}#tool`,
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Read your decoded results",
      text: "We instantly show the manufacturer, country, model year, plant code, and production sequence — plus a color-coded VIN character breakdown so you can read the VIN yourself.",
      url: `${PAGE_URL}#how-vin-works`,
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is this motorcycle VIN search really free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The motorcycle VIN search is 100% free with no signup, no payment, and no usage limit. Decode as many motorcycle VINs as you need. A free account is only required if you want the full vehicle history report (title status, theft, accidents, recalls) — the basic VIN decode and character breakdown are always open.",
      },
    },
    {
      "@type": "Question",
      name: "Where do I find the VIN on my motorcycle?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "On most modern motorcycles, the 17-character VIN is stamped on the steering neck (right side, just below the handlebars), on the engine case (often near the cylinder head), and on the frame near the swingarm pivot. It also appears on your title, registration, and insurance documents. On Harley-Davidsons it's on the right side of the frame neck. On Japanese sportbikes (Honda, Yamaha, Kawasaki, Suzuki) it's typically on the steering head.",
      },
    },
    {
      "@type": "Question",
      name: "Why does a motorcycle VIN have 17 characters?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The 17-character VIN format is an international standard adopted in 1981 (ISO 3779). Before 1981, VINs varied in length and format by manufacturer. Every motorcycle built since 1981 for sale in North America, Europe, and most other markets uses the 17-character format. The VIN excludes the letters I, O, and Q to avoid confusion with 1 and 0.",
      },
    },
    {
      "@type": "Question",
      name: "What can a motorcycle VIN tell me?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A motorcycle VIN identifies the manufacturer (positions 1–3, the WMI), the bike's specific model and engine attributes (positions 4–8, the VDS), a check digit (position 9), the model year (position 10), the assembly plant (position 11), and the unique production sequence (positions 12–17). Together these encode where, when, and exactly which unit was built.",
      },
    },
    {
      "@type": "Question",
      name: "Can a VIN tell me what year my motorcycle is?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — position 10 of the VIN is the model year code. Letters A–Y (skipping I, O, Q, U, Z) cover 1980–2000 and then again 2010–2030. Digits 1–9 cover 2001–2009. Because the letter codes repeat on a 30-year cycle, the same letter could mean two possible years; the title, registration, or full history report disambiguates.",
      },
    },
    {
      "@type": "Question",
      name: "Does this work for Harley-Davidson, Honda, Yamaha, Suzuki, Kawasaki, BMW, Ducati, KTM, and Triumph?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — the decoder recognizes WMIs from every major motorcycle manufacturer including Harley-Davidson (1HD, 5HD), Indian (56K), Honda (JH2, 1HF), Yamaha (JYA, JYE), Suzuki (JS1, JS3), Kawasaki (JKA, JKB), BMW Motorrad (WB1, WB2), Ducati (ZDM), Aprilia (ZD4), Triumph (SMT), KTM (VBK), Husqvarna (VBM), Royal Enfield (ME3), MV Agusta (ZCG), Moto Guzzi (ZGU), Vespa/Piaggio (ZAP), Buell (4MZ), and Victory (5VP).",
      },
    },
    {
      "@type": "Question",
      name: "Can I decode a motorcycle VIN that's less than 17 characters?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Pre-1981 motorcycle VINs varied in length (often 5–13 characters) and used manufacturer-specific schemes that aren't covered by the international standard. We can't decode them automatically. For vintage and classic motorcycles, contact a marque-specific registry or use the manufacturer's archive service.",
      },
    },
    {
      "@type": "Question",
      name: "Will the VIN tell me if my motorcycle is stolen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The basic VIN decode on this page identifies the bike but doesn't check theft databases. For a theft check against the National Insurance Crime Bureau (NICB) database — plus title brands, accident records, and lien information — run a full motorcycle history report.",
      },
    },
    {
      "@type": "Question",
      name: "What's the difference between motorcycle VIN search, VIN check, and VIN decoder?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "These terms are mostly interchangeable. A 'VIN search' or 'VIN lookup' usually means decoding the VIN to identify the bike. A 'VIN check' typically refers to a full history report including theft, title, and accident data. A 'VIN decoder' breaks down each VIN character to explain what it means. This page does all three: instant decode, character-by-character breakdown, and a one-click path to the full history report.",
      },
    },
  ],
};

const speakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${PAGE_URL}#webpage`,
  url: PAGE_URL,
  name: "Motorcycle VIN Search & Decoder",
  inLanguage: "en-US",
  isPartOf: {
    "@type": "WebSite",
    name: "CarCheckerVIN",
    url: "https://www.carcheckervin.com",
  },
  primaryImageOfPage: { "@type": "ImageObject", url: OG_IMAGE },
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["#how-vin-works", "#find-vin"],
  },
  datePublished: PUBLISHED,
  dateModified: MODIFIED,
};

/* ── Static UI data ────────────────────────────────────────────── */

const TRUST_STATS = [
  { icon: Bike, value: "25+", label: "motorcycle brands" },
  { icon: Zap, value: "Instant", label: "client-side decode" },
  { icon: Globe2, value: "ISO 3779", label: "17-char standard" },
  { icon: BadgeCheck, value: "Free", label: "no signup" },
];

const features = [
  {
    icon: Zap,
    title: "Instant offline decode",
    desc: "WMI, year, plant, and serial are decoded client-side — results appear in milliseconds with zero API calls.",
  },
  {
    icon: Bike,
    title: "25+ motorcycle brands",
    desc: "Recognizes Harley-Davidson, Honda, Yamaha, Suzuki, Kawasaki, BMW, Ducati, Triumph, KTM, Royal Enfield, and more.",
  },
  {
    icon: Globe2,
    title: "Country & region of origin",
    desc: "Decodes the WMI region code so you know the country and continent where your bike was assembled.",
  },
  {
    icon: Calendar,
    title: "Model year disambiguation",
    desc: "Handles the 30-year letter cycle and shows both possible years when the code is ambiguous.",
  },
  {
    icon: Hash,
    title: "Visual VIN breakdown",
    desc: "Color-coded position-by-position display teaches you to read any motorcycle VIN by sight.",
  },
  {
    icon: ShieldCheck,
    title: "One-click full history",
    desc: "Decode for free, then jump straight to the gated full history report (title, theft, accidents, recalls).",
  },
];

const FIND_VIN_LOCATIONS = [
  {
    title: "Steering neck (frame head)",
    desc: "The most common location on Japanese sportbikes (Honda, Yamaha, Kawasaki, Suzuki) and most European brands. Look on the right side just below the handlebars.",
  },
  {
    title: "Right side of the frame neck (Harley-Davidson)",
    desc: "Harley stamps the VIN deeply on the right side of the frame neck. Older Harleys also stamped it on the left side of the engine case.",
  },
  {
    title: "Engine case",
    desc: "Most modern motorcycles also stamp the VIN (or a partial VIN) on the engine block, typically near the cylinder head or starter motor.",
  },
  {
    title: "Frame near the swingarm",
    desc: "Many cruisers and adventure bikes carry a secondary VIN stamping on the frame above or beside the swingarm pivot.",
  },
  {
    title: "Title, registration, and insurance documents",
    desc: "Every paper document tied to the bike lists the VIN. Use this to cross-check the stamped VIN on the frame.",
  },
];

const VIN_POSITIONS = [
  {
    pos: "1–3",
    title: "WMI — World Manufacturer Identifier",
    desc: "Identifies the country, manufacturer, and motorcycle category. Position 1 is the region (1–5 = North America, J–R = Asia, S–Z = Europe). Examples: 1HD = Harley-Davidson, JH2 = Honda, JYA = Yamaha, ZDM = Ducati.",
  },
  {
    pos: "4–8",
    title: "VDS — Vehicle Descriptor Section",
    desc: "Encodes model-specific attributes: engine displacement and configuration, body or frame type, transmission, and trim. Each manufacturer uses its own scheme within these five positions.",
  },
  {
    pos: "9",
    title: "Check digit",
    desc: "A mathematical checksum that validates the entire VIN. If even one character is wrong, the check digit won't match — useful for catching transcription errors.",
  },
  {
    pos: "10",
    title: "Model year",
    desc: "A single character that encodes the model year. Letters A–Y (skipping I, O, Q, U, Z) cycle through 30 years; digits 1–9 cover 2001–2009. The same code can mean two possible years 30 years apart.",
  },
  {
    pos: "11",
    title: "Assembly plant",
    desc: "A single character identifying the specific factory where the motorcycle was built. Each manufacturer assigns its own plant codes.",
  },
  {
    pos: "12–17",
    title: "Production sequence",
    desc: "A unique six-character serial number assigned by the manufacturer. Combined with the WMI and year, it uniquely identifies your individual motorcycle out of millions.",
  },
];

// A real-format Harley-Davidson VIN broken into its six segments, used for
// the color-coded visual breakdown in the "How a VIN Works" section. The
// colors mirror the position cards directly below it.
const SAMPLE_VIN = [
  { chars: "1HD", pos: "1–3", label: "WMI", color: "bg-indigo-600" },
  { chars: "1KB41", pos: "4–8", label: "VDS", color: "bg-sky-600" },
  { chars: "9", pos: "9", label: "Check", color: "bg-amber-600" },
  { chars: "7", pos: "10", label: "Year", color: "bg-emerald-600" },
  { chars: "Y", pos: "11", label: "Plant", color: "bg-rose-600" },
  { chars: "012345", pos: "12–17", label: "Sequence", color: "bg-violet-600" },
];

const supportedBrands = [
  "Harley-Davidson",
  "Honda",
  "Yamaha",
  "Suzuki",
  "Kawasaki",
  "BMW Motorrad",
  "Ducati",
  "Triumph",
  "KTM",
  "Indian",
  "Royal Enfield",
  "Aprilia",
  "MV Agusta",
  "Husqvarna",
  "Moto Guzzi",
  "Piaggio / Vespa",
  "Buell",
  "Victory (Polaris)",
];

const INTERNAL_LINKS = [
  {
    href: "/motorcycle-vin-check",
    label: "Full Motorcycle VIN Check",
    desc: "Title status, theft records, accidents, recalls, and liens for any bike.",
  },
  {
    href: "/vin-decoder",
    label: "VIN Decoder",
    desc: "Decode any 17-character VIN — cars and bikes — to make, year, plant, and sequence.",
  },
  {
    href: "/stolen-vehicle-check",
    label: "Stolen Vehicle Check",
    desc: "Check the VIN against the NICB theft database before you buy.",
  },
  {
    href: "/window-sticker",
    label: "Window Sticker Maker",
    desc: "Recreate the original factory spec sheet for the bike.",
  },
  {
    href: "/vin-check",
    label: "Full VIN History Check",
    desc: "Title, accident, odometer, and recall records in one report.",
  },
  {
    href: "/build-sheet",
    label: "Build Sheet by VIN",
    desc: "Pull the original factory build record and option codes.",
  },
];

const toc = [
  { id: "tool", label: "Search Tool" },
  { id: "features", label: "Features" },
  { id: "find-vin", label: "Find Your VIN" },
  { id: "how-vin-works", label: "How a VIN Works" },
  { id: "brands", label: "Supported Brands" },
  { id: "faq", label: "FAQ" },
];

export default function MotorcycleVinSearchPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
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
              onDark
              items={[
                { label: "Home", href: "/" },
                { label: "Tools", href: "/tools" },
                { label: "Motorcycle VIN Search" },
              ]}
            />

            <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
              <Sparkles className="w-4 h-4" /> 100% Free · Instant Decode · No
              Signup
            </div>

            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center flex-shrink-0">
                <Bike className="w-7 h-7" />
              </div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-headline font-extrabold leading-tight">
                Motorcycle VIN Search
              </h1>
            </div>

            <p className="text-base sm:text-xl text-white/85 max-w-3xl mb-8 leading-relaxed">
              Free motorcycle VIN decoder. Enter any 17-character bike VIN to
              instantly identify the{" "}
              <strong>
                manufacturer, country of origin, model year, plant code, and
                production sequence
              </strong>{" "}
              — plus a position-by-position breakdown of what every character
              means. Works for Harley-Davidson, Honda, Yamaha, Suzuki, Kawasaki,
              BMW, Ducati, Triumph, KTM, and every major motorcycle brand.
            </p>

            <nav
              aria-label="On this page"
              className="flex flex-wrap gap-2 text-sm mb-8"
            >
              {toc.map((t) => (
                <a
                  key={t.id}
                  href={`#${t.id}`}
                  className="px-3 py-1.5 rounded-full bg-white/10 border border-white/15 hover:bg-white/20 text-white/90 hover:text-white transition"
                >
                  {t.label}
                </a>
              ))}
            </nav>

            {/* Trust stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
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
          {/* ── The actual tool ──────────────────────────────── */}
          <section id="tool" className="py-10 scroll-mt-24">
            <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-xl border border-outline-variant">
              <h2 className="text-base sm:text-lg font-headline font-extrabold text-primary mb-1">
                Decode a Motorcycle VIN
              </h2>
              <p className="text-xs sm:text-sm text-on-surface-variant mb-4">
                Enter any 17-character bike VIN — we&apos;ll decode the
                manufacturer, year, plant, and production sequence instantly
              </p>
              <MotorcycleVinSearch />
              <p className="mt-3 text-[11px] text-slate-400 flex items-center gap-1.5">
                <Lock className="w-3 h-3" /> Free · No signup · Instant decode
              </p>
            </div>
          </section>

          {/* ── Features ─────────────────────────────────────── */}
          <section
            id="features"
            className="py-12 sm:py-16 border-t border-outline-variant scroll-mt-24"
          >
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              Free Motorcycle VIN Decoder Features
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl">
              Built specifically for motorcycles — recognizes manufacturers and
              quirks that generic car-VIN tools miss.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {features.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5 sm:p-6"
                >
                  <div className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-base sm:text-lg font-headline font-extrabold text-primary mb-1.5">
                    {title}
                  </h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ── Find the VIN ─────────────────────────────────── */}
          <section
            id="find-vin"
            className="py-12 sm:py-16 border-t border-outline-variant scroll-mt-24"
          >
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              Where Is the VIN on a Motorcycle?
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">
              Manufacturers stamp the VIN in multiple locations on every bike,
              plus print it on every paper document tied to the vehicle. Knowing
              where to look saves time and confirms the VIN hasn&rsquo;t been
              tampered with — a missing or scratched VIN is one of the strongest
              indicators of a stolen motorcycle.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {FIND_VIN_LOCATIONS.map((loc) => (
                <div
                  key={loc.title}
                  className="flex gap-4 items-start rounded-2xl border border-outline-variant bg-surface p-5"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-base font-headline font-extrabold text-primary mb-1">
                      {loc.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                      {loc.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── How a VIN works ──────────────────────────────── */}
          <section
            id="how-vin-works"
            className="py-12 sm:py-16 border-t border-outline-variant scroll-mt-24"
          >
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              How a Motorcycle VIN Works (17 Characters Explained)
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">
              The 17-character VIN format is an international standard (ISO 3779)
              adopted in 1981. Every motorcycle built since then for sale in
              North America, Europe, and most other markets uses this format.
              Letters I, O, and Q are excluded to avoid confusion with digits 1
              and 0.
            </p>

            {/* Color-coded sample VIN breakdown */}
            <div className="mb-8 rounded-2xl border border-outline-variant bg-surface-container-lowest p-5 sm:p-6">
              <div className="text-[11px] font-black uppercase tracking-wider text-on-surface-variant mb-3">
                Example — a Harley-Davidson VIN, decoded
              </div>
              <div className="flex flex-wrap items-stretch gap-1.5 sm:gap-2">
                {SAMPLE_VIN.map((seg) => (
                  <div
                    key={seg.label}
                    className="flex-1 min-w-[58px] rounded-xl overflow-hidden border border-outline-variant shadow-sm"
                  >
                    <div
                      className={`${seg.color} px-2 py-2.5 text-center font-mono font-black text-white text-sm sm:text-base tracking-[0.15em]`}
                    >
                      {seg.chars}
                    </div>
                    <div className="px-1.5 py-1.5 text-center bg-surface">
                      <div className="text-[10px] font-bold text-on-surface leading-tight">
                        {seg.label}
                      </div>
                      <div className="text-[9px] text-on-surface-variant leading-tight">
                        Pos {seg.pos}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-[11px] text-on-surface-variant leading-relaxed">
                Each block maps to a position group below. Read left to right:
                who built it, what it is, a checksum, the year, the plant, and
                the unique serial.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {VIN_POSITIONS.map(({ pos, title, desc }, i) => (
                <div
                  key={pos}
                  className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5 sm:p-6"
                >
                  <div className="flex items-baseline gap-2 mb-1.5">
                    <span
                      className={`w-2.5 h-2.5 rounded-full self-center ${SAMPLE_VIN[i].color}`}
                      aria-hidden
                    />
                    <span className="text-[10px] font-black text-primary uppercase tracking-wider bg-primary/10 px-2 py-0.5 rounded-full">
                      Pos {pos}
                    </span>
                    <h3 className="font-headline font-extrabold text-primary">
                      {title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-2xl bg-secondary-container/40 border border-outline-variant p-5 sm:p-6">
              <p className="text-sm text-on-surface leading-relaxed">
                Pair a VIN decode with a full{" "}
                <Link
                  href="/motorcycle-vin-check"
                  className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80"
                >
                  motorcycle VIN check
                </Link>{" "}
                to see title status, theft records, accidents, and recalls. For
                the original factory spec sheet, use the{" "}
                <Link
                  href="/window-sticker"
                  className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80"
                >
                  Window Sticker Maker
                </Link>
                .
              </p>
            </div>
          </section>

          {/* ── Mid-page CTA ───────────────────────────────── */}
          <section className="py-10">
            <div className="rounded-3xl bg-primary p-7 sm:p-10 text-center">
              <Sparkles className="w-8 h-8 text-yellow-300 mx-auto mb-3" />
              <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-white mb-2">
                Decode Any Motorcycle VIN Now
              </h2>
              <p className="text-white/80 text-sm sm:text-base mb-6 max-w-xl mx-auto">
                Free, instant, no signup. Identify the manufacturer, year,
                country, and plant in milliseconds — then jump to the full
                history report when you&apos;re ready.
              </p>
              <a
                href="#tool"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-primary font-bold hover:bg-white/90 transition"
              >
                Search a VIN
                <Search className="w-4 h-4" />
              </a>
            </div>
          </section>

          {/* ── Supported brands ─────────────────────────────── */}
          <section
            id="brands"
            className="py-12 sm:py-16 border-t border-outline-variant scroll-mt-24"
          >
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              Supported Motorcycle Brands
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl">
              The decoder recognizes 25+ motorcycle manufacturer WMIs and falls
              back to a generic decode for unrecognized brands.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
              {supportedBrands.map((b) => (
                <div
                  key={b}
                  className="p-3 bg-surface rounded-xl border border-outline-variant text-center text-sm font-semibold text-on-surface"
                >
                  {b}
                </div>
              ))}
            </div>
          </section>

          {/* ── Internal links ─────────────────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              More VIN Tools That Pair With a Motorcycle VIN Search
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-7">
              Decoding the VIN is the first step. These checks complete the
              bike&apos;s story.
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
          <section
            id="faq"
            className="py-12 sm:py-16 border-t border-outline-variant scroll-mt-24"
          >
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              Motorcycle VIN Search — Frequently Asked Questions
            </h2>
            <p className="text-sm text-on-surface-variant mb-8">
              The questions riders ask most about decoding a motorcycle VIN.
            </p>
            <div className="space-y-3">
              {faqSchema.mainEntity.map((q) => (
                <details
                  key={q.name}
                  className="group rounded-2xl border border-outline-variant bg-surface p-4 sm:p-5 [&_summary::-webkit-details-marker]:hidden"
                >
                  <summary className="flex items-start justify-between gap-4 cursor-pointer list-none">
                    <span className="text-sm sm:text-base font-headline font-extrabold text-primary pr-2">
                      {q.name}
                    </span>
                    <span className="flex-shrink-0 mt-0.5 text-primary text-xl font-light group-open:rotate-45 transition-transform">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                    {q.acceptedAnswer.text}
                  </p>
                </details>
              ))}
            </div>
          </section>

          {/* ── Bottom CTA ─────────────────────────────────── */}
          <section className="py-14 sm:py-20 text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-xs font-black uppercase tracking-wider mb-4">
              <Zap className="w-3.5 h-3.5" /> Free · Instant · No Signup
            </div>
            <h2 className="text-2xl sm:text-4xl font-headline font-extrabold text-primary mb-3">
              Decode Any Motorcycle VIN Now
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl mx-auto mb-8">
              Free, instant, no signup. Decode the manufacturer, year, country,
              plant, and production sequence — then jump to the full motorcycle
              history report when you&apos;re ready.
            </p>
            <a
              href="#tool"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 transition"
            >
              Search a VIN
              <Search className="w-4 h-4" />
            </a>
          </section>

          <RelatedChecks exclude="/motorcycle-vin-search" />
        </div>
      </article>
    </>
  );
}
