import type { Metadata } from "next";
import Link from "next/link";
import { hreflangAlternates } from "@/lib/seo/hreflang";
import {
  Check,
  Search,
  MapPin,
  ChevronRight,
  Zap,
  BadgeCheck,
  ScanLine,
  ClipboardCheck,
  AlertCircle,
  Car,
  Calendar,
  Hash,
  ShieldCheck,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import GolfCartDecoder from "./GolfCartDecoder";

const SITE = "https://www.carcheckervin.com";

export const metadata: Metadata = {
  title: "Golf Cart VIN Lookup — Serial Decoder",
  description:
    "Golf carts use a serial number, not a 17-character VIN. Decode a Club Car serial for the model year, with E-Z-GO and Yamaha guides. Free.",
  keywords: [
    "golf cart vin lookup",
    "yamaha golf cart vin lookup",
    "club car serial number lookup",
    "ezgo serial number lookup",
    "golf cart serial number lookup",
    "golf cart year by serial number",
    "club car year lookup",
    "yamaha golf cart year by serial number",
    "ezgo golf cart year lookup",
    "golf cart vin decoder",
    "how to tell what year a golf cart is",
    "golf cart model year lookup",
  ],
  alternates: hreflangAlternates("/golf-cart-vin-lookup"),
  openGraph: {
    title:
      "Golf Cart VIN Lookup — Free Serial Decoder (Club Car, EZGO, Yamaha)",
    description:
      "Golf carts use a serial number, not a road VIN. Find and decode it to get the model year on any Club Car, E-Z-GO, or Yamaha cart. Free, instant.",
    url: `${SITE}/golf-cart-vin-lookup`,
    type: "article",
    siteName: "CarCheckerVIN",
    images: [
      {
        url: `${SITE}/golf-cart-vin-lookup/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Golf Cart VIN Lookup — free serial number decoder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Golf Cart VIN Lookup — Free Serial Decoder (Club Car, EZGO, Yamaha)",
    description:
      "Golf carts use a serial number, not a road VIN. Decode it to find the model year. Free, instant, no sign-up.",
    images: [`${SITE}/golf-cart-vin-lookup/opengraph-image`],
  },
  robots: { index: true, follow: true },
};

/* ── JSON-LD schemas ───────────────────────────────────────────── */

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Golf Cart VIN / Serial Number Lookup",
  url: `${SITE}/golf-cart-vin-lookup`,
  applicationCategory: "AutomotiveApplication",
  operatingSystem: "All",
  description:
    "Free tool to find and decode a golf cart serial number — Club Car, E-Z-GO, or Yamaha — to determine the model year. Golf carts use a manufacturer serial number rather than a 17-character road VIN.",
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
      name: "Do golf carts have a VIN?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Not in the road-vehicle sense. Golf carts are low-speed off-road vehicles and are not required to carry a 17-character VIN like a car or truck. Instead, each manufacturer assigns a serial number that identifies the model and build year. People search 'golf cart VIN' but what they actually need is the serial number — which does the same job for identifying a cart.",
      },
    },
    {
      "@type": "Question",
      name: "How do I tell what year my golf cart is?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Find the serial number and read the year code from it. On a Club Car, the serial is two letters followed by the two-digit model year and a two-digit week (e.g. PG05 = 2005). On a Yamaha, the year is read from a model-prefix chart. On an E-Z-GO, newer models show the year in the serial/manufacturer number while older ones use a date code. Locate the serial first, then match it to the brand's chart.",
      },
    },
    {
      "@type": "Question",
      name: "Where is the serial number on a golf cart?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It depends on the brand. Club Car: on a bar-code label under the glove box or beneath the driver-side seat, and stamped on the frame. E-Z-GO: under the seat or on the frame near the controller, plus a manufacturer number on the body. Yamaha: stamped on the frame under the seat and on a sticker beneath the body. Always check the frame stamping against any label.",
      },
    },
    {
      "@type": "Question",
      name: "How do I decode a Club Car serial number?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A Club Car serial is two letters (the model/assembly prefix) followed by the two-digit model year, the two-digit week of production, and a sequence number. For example PG0512 decodes to model year 2005, week 12. Enter it into the decoder above to read the year instantly.",
      },
    },
    {
      "@type": "Question",
      name: "How do I find the year of a Yamaha golf cart by serial number?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yamaha encodes the year in the model code at the start of the serial, not in a fixed digit position, so you read it from a Yamaha year/model-prefix chart rather than a simple formula. Locate the serial stamped on the frame under the seat (often prefixed J for gas or G for electric on G-series carts), then match the model prefix to Yamaha's chart to find the year.",
      },
    },
    {
      "@type": "Question",
      name: "How do I find the year of an E-Z-GO golf cart?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "E-Z-GO uses a manufacturer code plus a serial number. On many models built from the late 1990s onward the model year is embedded in the manufacturer's number, while older carts use a date/build code. Find the serial and manufacturer number under the seat or on the frame, then match it to an E-Z-GO year chart for that era.",
      },
    },
    {
      "@type": "Question",
      name: "Why does the year on my golf cart matter?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The model year determines which parts, batteries, controllers, and accessories fit your cart — golf cart components are year- and model-specific. It also affects resale value and helps confirm a seller's claim before you buy. Knowing the exact year saves you from ordering the wrong parts.",
      },
    },
    {
      "@type": "Question",
      name: "Can a golf cart serial number be used to check if it's stolen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A serial number is what police and the manufacturer use to identify a specific cart, so it's worth recording — but golf carts aren't in the national road-vehicle theft databases that cars are, because they don't carry a road VIN. If you're buying used, ask for the bill of sale, match the frame serial to any documents, and contact the manufacturer with the serial to confirm build details.",
      },
    },
    {
      "@type": "Question",
      name: "Is a golf cart serial number the same as a VIN?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Functionally it serves the same purpose — uniquely identifying the vehicle and encoding its build year — but it is not a 17-character ISO 3779 road VIN. Some street-legal LSV (low-speed vehicle) conversions are assigned a true 17-character VIN so they can be registered for road use; a standard golf cart is identified by its manufacturer serial number.",
      },
    },
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Look Up a Golf Cart Year by Serial Number",
  description:
    "Step-by-step guide to finding and decoding a golf cart serial number to determine the model year on a Club Car, E-Z-GO, or Yamaha cart.",
  totalTime: "PT2M",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Identify the brand",
      text: "Confirm whether the cart is a Club Car, E-Z-GO, or Yamaha — each encodes the year differently. The brand is usually on the body, the steering column, or the seat.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Locate the serial number",
      text: "Find the serial on the frame and the label: Club Car under the glove box or driver seat, E-Z-GO under the seat or near the controller, Yamaha stamped on the frame under the seat.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Read or decode the year",
      text: "For a Club Car, enter the serial into the decoder to read the model year and week. For Yamaha or E-Z-GO, match the model prefix to that brand's year chart.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Verify against the cart",
      text: "Match the decoded year and model to the cart's features and the seller's claim. A mismatch between the serial and the advertised year is a red flag.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Use the year to order parts or value the cart",
      text: "Once you know the exact model year, order year-specific batteries, controllers, and accessories, or use it to price the cart for sale or purchase.",
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
      name: "Golf Cart VIN Lookup",
      item: `${SITE}/golf-cart-vin-lookup`,
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
  url: `${SITE}/golf-cart-vin-lookup`,
};

/* ── Static UI data ────────────────────────────────────────────── */

const TRUST_STATS = [
  { icon: Car, value: "3 Brands", label: "Club Car · EZGO · Yamaha" },
  { icon: Calendar, value: "Model Year", label: "from the serial" },
  { icon: Zap, value: "Instant", label: "no sign-up needed" },
  { icon: BadgeCheck, value: "Free", label: "serial decode" },
];

const HOW_TO_STEPS = [
  {
    step: "01",
    icon: BadgeCheck,
    title: "Identify the brand",
    body: "Club Car, E-Z-GO, and Yamaha each encode the build year differently, so the brand decides how you read the serial. It's usually badged on the body, steering column, or seat back.",
  },
  {
    step: "02",
    icon: MapPin,
    title: "Find the serial number",
    body: "Look under the glove box or driver seat (Club Car), under the seat or near the controller (E-Z-GO), or stamped on the frame under the seat (Yamaha). Always check the frame stamping, not just a sticker.",
  },
  {
    step: "03",
    icon: Search,
    title: "Read or decode the year",
    body: "For a Club Car, drop the serial into the decoder above to get the model year and production week instantly. For Yamaha and E-Z-GO, match the model prefix to that brand's year chart below.",
  },
  {
    step: "04",
    icon: ClipboardCheck,
    title: "Verify against the cart",
    body: "Confirm the decoded year and model line up with the cart's features and the seller's claim. A serial that decodes to a different year than advertised is a reason to ask questions before you buy.",
  },
  {
    step: "05",
    icon: ScanLine,
    title: "Use it to order parts or price it",
    body: "Golf cart batteries, controllers, and accessories are year- and model-specific. The exact model year is what you need to order the right parts or to value the cart fairly.",
  },
];

/* Brand serial guidance — the unique, honest content asset. */
const BRAND_ROWS = [
  {
    brand: "Club Car",
    where: "Bar-code label under the glove box or driver-side seat; stamped on the frame.",
    format:
      "2 letters (model prefix) + YY (year) + WW (week) + sequence. PG05 = model year 2005. Decode it instantly above.",
    decodes: "Yes — deterministic",
  },
  {
    brand: "E-Z-GO",
    where: "Under the seat or on the frame near the controller; manufacturer number on the body.",
    format:
      "Manufacturer code + serial. Newer models embed the year in the manufacturer number; older carts use a date/build code — match to an E-Z-GO era chart.",
    decodes: "Via brand chart",
  },
  {
    brand: "Yamaha",
    where: "Stamped on the frame under the seat; sticker beneath the body.",
    format:
      "Model code + serial. The year lives in the model prefix (e.g. G-series, Drive, Drive2), read from Yamaha's year/model chart — not a fixed digit.",
    decodes: "Via brand chart",
  },
];

const INTERNAL_LINKS = [
  {
    href: "/",
    label: "Car & Truck VIN Decoder",
    desc: "For a street-legal LSV with a real 17-character VIN, decode it here for make, model, and year.",
  },
  {
    href: "/motorcycle-vin-search",
    label: "Motorcycle VIN Search",
    desc: "Decode a motorcycle or ATV frame number for make, model, and engine.",
  },
  {
    href: "/hin-lookup",
    label: "HIN Lookup (Boat VIN)",
    desc: "A boat's serial equivalent — decode a 12-character Hull Identification Number.",
  },
  {
    href: "/rv-vin-check",
    label: "RV VIN Check",
    desc: "Decode and history-check a motorhome or travel-trailer VIN.",
  },
  {
    href: "/stolen-vehicle-check",
    label: "Stolen Vehicle Check",
    desc: "For road vehicles with a VIN — confirm it isn't flagged as stolen before you buy.",
  },
  {
    href: "/chassis-number-lookup",
    label: "Chassis Number Lookup",
    desc: "The same 17-character VIN is called a chassis number outside North America.",
  },
];

const FAQS = [
  {
    q: "Do golf carts have a VIN?",
    a: "Not in the road-vehicle sense. Golf carts are low-speed off-road vehicles and are not required to carry a 17-character VIN like a car or truck. Instead, each manufacturer assigns a serial number that identifies the model and build year. People search 'golf cart VIN' but what they actually need is the serial number — which does the same job for identifying a cart.",
  },
  {
    q: "How do I tell what year my golf cart is?",
    a: "Find the serial number and read the year code from it. On a Club Car, the serial is two letters followed by the two-digit model year and a two-digit week (e.g. PG05 = 2005). On a Yamaha, the year is read from a model-prefix chart. On an E-Z-GO, newer models show the year in the serial/manufacturer number while older ones use a date code. Locate the serial first, then match it to the brand's chart.",
  },
  {
    q: "Where is the serial number on a golf cart?",
    a: "It depends on the brand. Club Car: on a bar-code label under the glove box or beneath the driver-side seat, and stamped on the frame. E-Z-GO: under the seat or on the frame near the controller, plus a manufacturer number on the body. Yamaha: stamped on the frame under the seat and on a sticker beneath the body. Always check the frame stamping against any label.",
  },
  {
    q: "How do I decode a Club Car serial number?",
    a: "A Club Car serial is two letters (the model/assembly prefix) followed by the two-digit model year, the two-digit week of production, and a sequence number. For example PG0512 decodes to model year 2005, week 12. Enter it into the decoder above to read the year instantly.",
  },
  {
    q: "How do I find the year of a Yamaha golf cart by serial number?",
    a: "Yamaha encodes the year in the model code at the start of the serial, not in a fixed digit position, so you read it from a Yamaha year/model-prefix chart rather than a simple formula. Locate the serial stamped on the frame under the seat (often prefixed J for gas or G for electric on G-series carts), then match the model prefix to Yamaha's chart to find the year.",
  },
  {
    q: "How do I find the year of an E-Z-GO golf cart?",
    a: "E-Z-GO uses a manufacturer code plus a serial number. On many models built from the late 1990s onward the model year is embedded in the manufacturer's number, while older carts use a date/build code. Find the serial and manufacturer number under the seat or on the frame, then match it to an E-Z-GO year chart for that era.",
  },
  {
    q: "Why does the year on my golf cart matter?",
    a: "The model year determines which parts, batteries, controllers, and accessories fit your cart — golf cart components are year- and model-specific. It also affects resale value and helps confirm a seller's claim before you buy. Knowing the exact year saves you from ordering the wrong parts.",
  },
  {
    q: "Can a golf cart serial number be used to check if it's stolen?",
    a: "A serial number is what police and the manufacturer use to identify a specific cart, so it's worth recording — but golf carts aren't in the national road-vehicle theft databases that cars are, because they don't carry a road VIN. If you're buying used, ask for the bill of sale, match the frame serial to any documents, and contact the manufacturer with the serial to confirm build details.",
  },
  {
    q: "Is a golf cart serial number the same as a VIN?",
    a: "Functionally it serves the same purpose — uniquely identifying the vehicle and encoding its build year — but it is not a 17-character ISO 3779 road VIN. Some street-legal LSV (low-speed vehicle) conversions are assigned a true 17-character VIN so they can be registered for road use; a standard golf cart is identified by its manufacturer serial number.",
  },
];

/* ── Page ──────────────────────────────────────────────────────── */

export default function GolfCartVinLookupPage() {
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
                { label: "Golf Cart VIN Lookup" },
              ]}
              onDark
            />

            <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
              <Car className="w-4 h-4" /> Golf Cart = Serial Number
              &nbsp;·&nbsp; Not a Road VIN
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-headline font-extrabold leading-tight mb-4">
              Golf Cart VIN Lookup —{" "}
              <span style={{ color: "var(--color-secondary-container)" }}>
                Decode the Serial &amp; Year
              </span>
            </h1>

            <p className="speakable-intro text-base sm:text-xl text-white/85 max-w-3xl mb-8 leading-relaxed">
              Golf carts don&apos;t carry a 17-character road VIN — they use a{" "}
              <strong>manufacturer serial number</strong> that encodes the model
              year. Find it, decode it, and know exactly what year your Club
              Car, E-Z-GO, or Yamaha cart is.
            </p>

            <GolfCartDecoder />

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
                    <div className="text-lg sm:text-2xl font-headline font-black text-white">
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
          {/* ── Golf cart "VIN" = serial number ──────────────── */}
          <section className="py-12 sm:py-16">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              A Golf Cart&apos;s &ldquo;VIN&rdquo; Is Its Serial Number
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl leading-relaxed">
              Here&apos;s the honest answer most people are looking for: a golf
              cart <strong>does not have a 17-character VIN</strong> like a car.
              As a low-speed off-road vehicle, it&apos;s identified by a{" "}
              <strong>manufacturer serial number</strong> instead — and that
              serial is exactly what you read to find the year, order parts, or
              confirm a cart before buying.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5 sm:p-6">
                <div className="text-[11px] font-black uppercase tracking-wider text-on-surface-variant mb-2">
                  Golf Cart
                </div>
                <p className="text-lg font-headline font-extrabold text-on-surface mb-3">
                  Serial Number
                </p>
                <ul className="space-y-2 text-sm text-on-surface-variant">
                  <li className="flex gap-2">
                    <span>·</span>
                    <span>Assigned by the maker — Club Car, E-Z-GO, Yamaha.</span>
                  </li>
                  <li className="flex gap-2">
                    <span>·</span>
                    <span>Encodes the model year and production run.</span>
                  </li>
                  <li className="flex gap-2">
                    <span>·</span>
                    <span>On the frame and a label under the seat or glove box.</span>
                  </li>
                </ul>
              </div>
              <div className="rounded-2xl border border-primary/30 bg-primary/5 p-5 sm:p-6">
                <div className="text-[11px] font-black uppercase tracking-wider text-primary mb-2">
                  Car / Truck
                </div>
                <p className="text-lg font-headline font-extrabold text-primary mb-3">
                  17-Character VIN
                </p>
                <ul className="space-y-2 text-sm text-on-surface-variant">
                  <li className="flex gap-2">
                    <span>·</span>
                    <span>Required on road vehicles built since 1981.</span>
                  </li>
                  <li className="flex gap-2">
                    <span>·</span>
                    <span>Decodes make, model, year, engine, and plant.</span>
                  </li>
                  <li className="flex gap-2">
                    <span>·</span>
                    <span>
                      A street-legal LSV conversion may get a true VIN —{" "}
                      <Link
                        href="/"
                        className="text-primary font-semibold underline underline-offset-2"
                      >
                        decode that here
                      </Link>
                      .
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-6 rounded-2xl bg-secondary-container/40 border border-outline-variant p-5 sm:p-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-on-secondary-container flex-shrink-0 mt-0.5" />
                <p className="text-sm text-on-surface leading-relaxed">
                  <strong className="text-on-surface">Bottom line:</strong> if
                  you searched &ldquo;golf cart VIN,&rdquo; what you actually
                  need is the <strong>serial number</strong>. Find it, and the
                  brand guides below (plus the Club Car decoder at the top) turn
                  it into a model year.
                </p>
              </div>
            </div>
          </section>

          {/* ── How to look up the year ──────────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              How to Look Up a Golf Cart Year — Step by Step
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl">
              Five steps from &ldquo;what year is this?&rdquo; to the exact model
              year — for Club Car, E-Z-GO, and Yamaha.
            </p>
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

          {/* ── Brand-by-brand serial guide (unique asset) ───── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              Serial Numbers by Brand — Club Car, E-Z-GO &amp; Yamaha
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl">
              Each maker hides the year in a different place and format.
              Here&apos;s where to look and how the year is encoded for the three
              big brands.
            </p>
            <div className="overflow-x-auto rounded-2xl border border-outline-variant">
              <table className="w-full border-collapse min-w-[720px] text-sm">
                <thead className="bg-surface-container-low">
                  <tr>
                    <th className="p-4 text-left font-headline font-extrabold text-primary">
                      Brand
                    </th>
                    <th className="p-4 text-left font-headline font-extrabold text-primary">
                      Where to find the serial
                    </th>
                    <th className="p-4 text-left font-headline font-extrabold text-primary">
                      How the year is encoded
                    </th>
                    <th className="p-4 text-left font-headline font-extrabold text-primary">
                      Decodes here?
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {BRAND_ROWS.map((row) => (
                    <tr
                      key={row.brand}
                      className="border-t border-outline-variant/60 align-top"
                    >
                      <td className="p-4 font-bold text-on-surface whitespace-nowrap">
                        {row.brand}
                      </td>
                      <td className="p-4 text-on-surface-variant leading-relaxed">
                        {row.where}
                      </td>
                      <td className="p-4 text-on-surface-variant leading-relaxed">
                        {row.format}
                      </td>
                      <td className="p-4">
                        <span className="inline-block rounded-full bg-primary/10 text-primary text-xs font-bold px-2.5 py-1 whitespace-nowrap">
                          {row.decodes}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-xs text-on-surface-variant">
              The decoder at the top of this page reads the{" "}
              <strong>Club Car</strong> format directly. For Yamaha and E-Z-GO,
              find the serial using the guide above, then match the model prefix
              to that brand&apos;s official year chart — we don&apos;t guess a
              year we can&apos;t verify from the serial alone.
            </p>
          </section>

          {/* ── Club Car format breakdown ────────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              How a Club Car Serial Number Breaks Down
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl">
              Club Car&apos;s serial is the easiest to decode because the year
              and week sit in fixed positions. Take an example like{" "}
              <code className="font-mono text-xs bg-surface-container-low rounded px-2 py-1 text-primary">
                PG0512345678
              </code>
              :
            </p>
            <div className="overflow-x-auto rounded-2xl border border-outline-variant">
              <table className="w-full border-collapse min-w-[560px] text-sm">
                <thead className="bg-surface-container-low">
                  <tr>
                    <th className="p-4 text-left font-headline font-extrabold text-primary">
                      Position
                    </th>
                    <th className="p-4 text-left font-headline font-extrabold text-primary">
                      Example
                    </th>
                    <th className="p-4 text-left font-headline font-extrabold text-primary">
                      Meaning
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { pos: "1–2", ex: "PG", mean: "Model / assembly prefix (the cart line)" },
                    { pos: "3–4", ex: "05", mean: "Model year — here, 2005" },
                    { pos: "5–6", ex: "12", mean: "Week of production — here, week 12" },
                    { pos: "7+", ex: "345678", mean: "Production sequence number" },
                  ].map((row) => (
                    <tr
                      key={row.pos}
                      className="border-t border-outline-variant/60 align-top"
                    >
                      <td className="p-4">
                        <code className="font-mono text-xs bg-surface-container-low rounded px-2 py-1 text-primary">
                          {row.pos}
                        </code>
                      </td>
                      <td className="p-4 font-mono font-bold text-on-surface whitespace-nowrap">
                        {row.ex}
                      </td>
                      <td className="p-4 text-on-surface-variant leading-relaxed">
                        {row.mean}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 flex items-start gap-2 rounded-xl bg-surface-container-low border border-outline-variant p-4 text-xs text-on-surface-variant">
              <Hash className="w-4 h-4 flex-shrink-0 mt-0.5 text-primary" />
              <span>
                Note: very early Club Car DS units (1980s) and some special runs
                vary slightly. The year digits (positions 3–4) are the reliable
                figure — the decoder flags anything that doesn&apos;t fit the
                standard week pattern.
              </span>
            </div>
          </section>

          {/* ── Mid-page CTA ───────────────────────────────── */}
          <section className="py-10">
            <div className="rounded-3xl bg-primary p-7 sm:p-10 text-center">
              <Car className="w-8 h-8 text-yellow-300 mx-auto mb-3" />
              <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-white mb-2">
                Buying a Street-Legal Cart With a Real VIN?
              </h2>
              <p className="text-white/80 text-sm sm:text-base mb-6 max-w-xl mx-auto">
                Some low-speed vehicles are registered with a true 17-character
                VIN. If yours has one, decode it free for the make, model, year,
                and full history.
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-bold text-primary hover:opacity-90 transition"
              >
                <Search className="w-4 h-4" /> Decode a 17-character VIN
              </Link>
            </div>
          </section>

          {/* ── Why the year matters / buying tips ───────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">
              Check the Serial Before You Buy a Used Cart
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
                <p>
                  The serial number is a golf cart&apos;s identity, so it&apos;s
                  the first thing to check on a used buy. Decode the year and
                  confirm it matches what the seller advertised — model years on
                  carts are easy to fudge because there&apos;s no title or road
                  VIN keeping everyone honest.
                </p>
                <p>
                  Match the serial on the frame to any label and to the bill of
                  sale. Then use the exact model year to price the cart and to
                  order the correct batteries, controller, and parts — golf cart
                  components are tightly year- and model-specific.
                </p>
                <p>
                  For build details or to confirm a cart isn&apos;t reported
                  stolen, contact the manufacturer directly with the frame
                  serial — golf carts aren&apos;t in the road-vehicle theft
                  databases that cars are.
                </p>
              </div>
              <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                  <h3 className="font-headline font-extrabold text-primary">
                    Golf cart serial red flags
                  </h3>
                </div>
                <ul className="space-y-2 text-sm text-on-surface">
                  {[
                    "Decoded year doesn't match the advertised year",
                    "Serial on the frame differs from the label or bill of sale",
                    "Frame area looks ground down or repainted over the stamp",
                    "Seller can't or won't show you the serial number",
                    "No bill of sale on a used private-party purchase",
                  ].map((reason) => (
                    <li key={reason} className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* ── Internal links ─────────────────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              More Vehicle Lookups
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-7">
              Decoding something with a road VIN? These tools have you covered.
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
              Golf Cart VIN / Serial Lookup — Frequently Asked Questions
            </h2>
            <p className="text-sm text-on-surface-variant mb-8">
              Direct answers to what golf cart owners and buyers ask most.
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
              <Zap className="w-3.5 h-3.5" /> Free · Instant · Club Car decoder
            </div>
            <h2 className="text-2xl sm:text-4xl font-headline font-extrabold text-primary mb-3">
              Find Your Golf Cart&apos;s Year From the Serial
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl mx-auto mb-8">
              Scroll back up to decode a Club Car serial instantly, or use the
              brand guides to read a Yamaha or E-Z-GO year. Free, no sign-up.
            </p>
            <div className="flex items-center justify-center gap-2 text-xs text-on-surface-variant">
              <Check className="w-3.5 h-3.5 text-green-500" strokeWidth={3} />
              No credit card · No sign-up · Honest, brand-accurate guidance
            </div>
          </section>

          <RelatedChecks exclude="/golf-cart-vin-lookup" />
        </div>
      </article>
    </>
  );
}
