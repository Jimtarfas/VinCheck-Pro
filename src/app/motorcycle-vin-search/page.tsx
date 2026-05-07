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
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedChecks from "@/components/RelatedChecks";
import MotorcycleVinSearch from "./MotorcycleVinSearch";

const PAGE_URL = "https://www.carcheckervin.com/motorcycle-vin-search";
const OG_IMAGE = "https://www.carcheckervin.com/opengraph-image";
const PUBLISHED = "2026-05-07";
const MODIFIED = "2026-05-07";

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
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "642",
    bestRating: "5",
    worstRating: "1",
  },
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

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-700 text-white pt-24 pb-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Breadcrumbs
              onDark
              items={[
                { label: "Home", href: "/" },
                { label: "Tools", href: "/tools" },
                { label: "Motorcycle VIN Search" },
              ]}
            />
          </div>
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 border border-white/20 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            100% Free · Instant Decode · No Signup
          </span>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center flex-shrink-0">
              <Bike className="w-7 h-7" />
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              Motorcycle VIN Search
            </h1>
          </div>
          <p className="text-lg text-primary-100 max-w-2xl leading-relaxed">
            Free motorcycle VIN decoder. Enter any 17-character bike VIN to instantly identify the
            <strong> manufacturer, country of origin, model year, plant code, and production
            sequence</strong> — plus a position-by-position breakdown of what every character
            means. Works for Harley-Davidson, Honda, Yamaha, Suzuki, Kawasaki, BMW, Ducati,
            Triumph, KTM, and every major motorcycle brand.
          </p>

          <nav aria-label="On this page" className="mt-6 flex flex-wrap gap-2 text-sm">
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
        </div>
      </section>

      {/* The actual tool */}
      <section
        id="tool"
        className="bg-slate-50 border-b border-slate-200 py-10 scroll-mt-24"
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <MotorcycleVinSearch />
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-16 bg-white scroll-mt-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">
            Free Motorcycle VIN Decoder Features
          </h2>
          <p className="text-slate-700 mb-8">
            Built specifically for motorcycles — recognizes manufacturers and quirks that
            generic car-VIN tools miss.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map(({ icon: Icon, title, desc }) => (
              <article
                key={title}
                className="p-5 bg-slate-50 rounded-2xl border border-slate-200"
              >
                <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-slate-900">{title}</h3>
                <p className="text-sm text-slate-700 mt-1 leading-relaxed">{desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Find VIN */}
      <section id="find-vin" className="py-16 bg-slate-50 scroll-mt-24">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Where Is the VIN on a Motorcycle?
          </h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            Motorcycle manufacturers stamp the VIN in multiple locations on every bike, plus
            print it on every paper document tied to the vehicle. Knowing where to look saves
            time and confirms the VIN hasn&rsquo;t been tampered with — a missing or scratched
            VIN is one of the strongest indicators of a stolen motorcycle.
          </p>
          <ul className="space-y-3 text-slate-700">
            <li className="flex gap-3 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <div>
                <strong>Steering neck (frame head)</strong> — the most common location on Japanese
                sportbikes (Honda, Yamaha, Kawasaki, Suzuki) and most European brands. Look on the
                right side just below the handlebars.
              </div>
            </li>
            <li className="flex gap-3 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <div>
                <strong>Right side of the frame neck (Harley-Davidson)</strong> — Harley stamps
                the VIN deeply on the right side of the frame neck. Older Harleys also stamped it
                on the left side of the engine case.
              </div>
            </li>
            <li className="flex gap-3 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <div>
                <strong>Engine case</strong> — most modern motorcycles also stamp the VIN (or a
                partial VIN) on the engine block, typically near the cylinder head or starter
                motor.
              </div>
            </li>
            <li className="flex gap-3 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <div>
                <strong>Frame near the swingarm</strong> — many cruisers and adventure bikes carry
                a secondary VIN stamping on the frame above or beside the swingarm pivot.
              </div>
            </li>
            <li className="flex gap-3 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <div>
                <strong>Title, registration, and insurance documents</strong> — every paper
                document tied to the bike lists the VIN. Use this to cross-check the stamped VIN
                on the frame.
              </div>
            </li>
          </ul>
        </article>
      </section>

      {/* How a VIN works */}
      <section id="how-vin-works" className="py-16 bg-white scroll-mt-24">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            How a Motorcycle VIN Works (17 Characters Explained)
          </h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            The 17-character VIN format is an international standard (ISO 3779) adopted in 1981.
            Every motorcycle built since then for sale in North America, Europe, and most other
            markets uses this format. Letters I, O, and Q are excluded to avoid confusion with
            digits 1 and 0.
          </p>
          <div className="grid sm:grid-cols-2 gap-4 mt-6">
            {[
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
            ].map(({ pos, title, desc }) => (
              <div
                key={pos}
                className="p-5 rounded-2xl bg-slate-50 border border-slate-200"
              >
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-[10px] font-bold text-primary-700 uppercase tracking-wider bg-primary-100 px-2 py-0.5 rounded-full">
                    Pos {pos}
                  </span>
                  <h3 className="font-semibold text-slate-900">{title}</h3>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <p className="text-slate-700 leading-relaxed mt-6">
            Pair a VIN decode with a full{" "}
            <Link href="/motorcycle-vin-check" className="text-primary-600 hover:underline font-medium">
              motorcycle VIN check
            </Link>{" "}
            to see title status, theft records, accidents, and recalls. For the original factory
            spec sheet, use the{" "}
            <Link href="/window-sticker" className="text-primary-600 hover:underline font-medium">
              Window Sticker Maker
            </Link>
            .
          </p>
        </article>
      </section>

      {/* Supported brands */}
      <section id="brands" className="py-16 bg-slate-50 scroll-mt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">
            Supported Motorcycle Brands
          </h2>
          <p className="text-slate-700 mb-8">
            The decoder recognizes 25+ motorcycle manufacturer WMIs and falls back to a generic
            decode for unrecognized brands.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
            {supportedBrands.map((b) => (
              <div
                key={b}
                className="p-3 bg-white rounded-xl border border-slate-200 text-center text-sm font-medium text-slate-800"
              >
                {b}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 bg-white scroll-mt-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">
            Motorcycle VIN Search FAQ
          </h2>
          <div className="space-y-4">
            {faqSchema.mainEntity.map((q) => (
              <details
                key={q.name}
                className="group bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden"
              >
                <summary className="cursor-pointer list-none p-5 flex items-center justify-between gap-4 font-semibold text-slate-900 hover:bg-slate-100">
                  <span>{q.name}</span>
                  <span className="text-primary-600 group-open:rotate-45 transition-transform text-xl leading-none">
                    +
                  </span>
                </summary>
                <div className="px-5 pb-5 text-slate-700 leading-relaxed text-sm">
                  {q.acceptedAnswer.text}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Related */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-12">
        <RelatedChecks exclude="/motorcycle-vin-search" />
      </div>

      {/* CTA */}
      <section className="py-14 bg-primary-600 text-white">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-3">Decode Any Motorcycle VIN Now</h2>
          <p className="text-primary-100 mb-6">
            Free, instant, no signup. Then jump to the full motorcycle history report when
            you&rsquo;re ready.
          </p>
          <a
            href="#tool"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-primary-700 font-semibold hover:bg-primary-50 transition"
          >
            Search a VIN
            <Search className="w-4 h-4" />
          </a>
        </div>
      </section>
    </>
  );
}
