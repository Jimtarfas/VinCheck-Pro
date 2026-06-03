import type { Metadata } from "next";
import Link from "next/link";
import {
  Check,
  Shield,
  Search,
  AlertCircle,
  Truck,
  MapPin,
  ChevronRight,
  Lock,
  Zap,
  BadgeCheck,
  Container,
  ScanLine,
  Wrench,
  ClipboardCheck,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";

const SITE = "https://www.carcheckervin.com";

export const metadata: Metadata = {
  title:
    "Semi Truck VIN Lookup — Free Freightliner, Peterbilt & Trailer Decoder",
  description:
    "Free semi truck VIN lookup. Decode any Freightliner, Peterbilt, Kenworth, Volvo or Mack tractor — plus semi trailer VINs — to find the year, engine, GVWR class, and plant in seconds. No sign-up.",
  keywords: [
    "semi truck vin number lookup",
    "semi vin lookup",
    "freightliner vin number lookup",
    "peterbilt vin number lookup",
    "semi trailer vin lookup",
    "tractor trailer vin lookup",
    "trailer vin lookup free",
    "vin trailer lookup",
    "semi truck vin lookup free",
    "kenworth vin lookup",
    "volvo truck vin lookup",
    "mack truck vin lookup",
    "heavy truck vin decoder",
    "commercial truck vin lookup",
    "18 wheeler vin lookup",
  ],
  alternates: { canonical: "/semi-truck-vin-lookup" },
  openGraph: {
    title:
      "Semi Truck VIN Lookup — Free Freightliner, Peterbilt & Trailer Decoder",
    description:
      "Decode any semi tractor or trailer VIN free — make, model year, engine, GVWR, and plant. Works for every Class 8 builder. Instant, no sign-up.",
    url: `${SITE}/semi-truck-vin-lookup`,
    type: "article",
    siteName: "CarCheckerVIN",
    images: [
      {
        url: `${SITE}/semi-truck-vin-lookup/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Semi Truck VIN Lookup — decode any tractor or trailer VIN free",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Semi Truck VIN Lookup — Free Freightliner, Peterbilt & Trailer Decoder",
    description:
      "Decode any semi tractor or trailer VIN free — year, engine, GVWR, and plant. Every Class 8 builder. Instant.",
    images: [`${SITE}/semi-truck-vin-lookup/opengraph-image`],
  },
  robots: { index: true, follow: true },
};

/* ── JSON-LD schemas ───────────────────────────────────────────── */

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Semi Truck VIN Lookup",
  url: `${SITE}/semi-truck-vin-lookup`,
  applicationCategory: "AutomotiveApplication",
  operatingSystem: "All",
  description:
    "Free tool to decode any semi truck or trailer VIN — Freightliner, Peterbilt, Kenworth, Volvo, Mack, International — to find the make, model year, engine, GVWR class, and assembly plant.",
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
      name: "Is a semi truck VIN the same as a car VIN?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Every on-road vehicle built since 1981 — car, pickup, semi tractor, or trailer — uses the same 17-character VIN standard under ISO 3779. The decoding rules are identical: the first three characters identify the manufacturer and country, characters 4–8 describe the model and spec, the 10th encodes the model year, and the rest is the plant and serial.",
      },
    },
    {
      "@type": "Question",
      name: "How do I do a free Freightliner or Peterbilt VIN lookup?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Find the 17-character VIN on the driver-side door jamb, the frame rail, or the title, then paste it into the free VIN decoder. You will get the model line, model year, engine family, GVWR class, and assembly plant with no sign-up. Freightliner WMIs include 1FU and 3AK; Peterbilt uses 1XP and 2NP.",
      },
    },
    {
      "@type": "Question",
      name: "Where is the VIN on a semi truck?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Heavy trucks carry the VIN in several places: the driver-side door-jamb certification label, stamped into the frame rail on the driver's side near the front axle, on the dashboard visible through the windshield on newer tractors, and on the title and IRP/apportioned cab card. Always match the frame-rail stamping to the door label and the title.",
      },
    },
    {
      "@type": "Question",
      name: "Where is the VIN on a semi trailer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A semi trailer's VIN is on a plate riveted to the front wall or the driver-side frame near the landing gear, and stamped into the frame rail. On any modern trailer it is a full 17-character VIN that decodes to the manufacturer (Great Dane, Wabash, Utility, Hyundai Translead, Stoughton), trailer type, model year, and axle configuration.",
      },
    },
    {
      "@type": "Question",
      name: "Why is my trailer VIN shorter than 17 characters?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Older or light-duty utility trailers were issued manufacturer-specific serial numbers before the 17-character VIN became standard. If your trailer number isn't 17 characters, it predates the modern VIN standard or is a non-VIN unit — decode it from the manufacturer's data plate instead of a VIN tool.",
      },
    },
    {
      "@type": "Question",
      name: "Can a semi truck VIN lookup tell me who owns the truck?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Owner and registration data is personal information protected by the federal Driver's Privacy Protection Act (DPPA) and is never returned by a VIN lookup. A VIN reveals the vehicle's specification and, where records exist, its title, mileage, accident, lien, and theft history — not the owner's identity.",
      },
    },
    {
      "@type": "Question",
      name: "What can I learn from a heavy truck VIN?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Decoding a semi tractor or trailer VIN reveals the manufacturer, model line, model year, engine family, body or trailer class, GVWR rating, and country and plant of assembly. Extended into a history report, the same VIN surfaces title brands, reported accidents, odometer readings, liens, and theft records.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need to pay for a semi truck VIN check?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The decode — year, make, model, engine, and plant — is completely free and instant with no account. A full history report with title, accident, odometer, lien, and theft data is the paid step, and it is a fraction of the cost of one bad-truck repair bill.",
      },
    },
    {
      "@type": "Question",
      name: "What do the first three characters of a truck VIN mean?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The first three characters are the World Manufacturer Identifier (WMI), which name the builder and country. Common heavy-truck WMIs: 1FU/3AK Freightliner, 1XP/2NP Peterbilt, 1XK/1NK Kenworth, 4V4/4V5 Volvo, 1M1/1M2 Mack, and 1HT/3HA International (Navistar).",
      },
    },
    {
      "@type": "Question",
      name: "Does a VIN lookup work for an 18-wheeler bought at auction?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Any Class 8 tractor or trailer with a standard 17-character VIN can be decoded and history-checked. Auction trucks change hands fast across state lines, which is exactly where salvage rebuilds, odometer or hub-meter tampering, and outstanding liens hide — so a VIN check before bidding is essential.",
      },
    },
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Look Up a Semi Truck or Trailer by VIN",
  description:
    "Step-by-step guide to finding and decoding a semi truck or trailer VIN to identify the make, year, engine, and history.",
  totalTime: "PT2M",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Locate the VIN",
      text: "Find the 17-character VIN on the driver-side door jamb, the frame rail near the front axle, the dashboard through the windshield, or the title and cab card. On a trailer, check the front wall plate and the driver-side frame near the landing gear.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Copy all 17 characters exactly",
      text: "Write the VIN down character for character. The letters I, O, and Q are never used — anything that looks like one is really a 1 or a 0.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Enter it into the decoder",
      text: "Paste the VIN into the lookup field and submit. The decoder identifies the manufacturer, model line, model year, engine, GVWR class, and plant instantly.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Match it to the listing and the title",
      text: "Confirm the decoded make, model, and year match the advert and the title. Match the frame-rail stamping to the door label — a mismatch is a red flag for a cloned or salvage-rebuilt truck.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Run a full history check before buying",
      text: "Extend the decode into a full history report to surface title brands, odometer rollback, accident records, liens, and theft data tied to that VIN before any money changes hands.",
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
      name: "Semi Truck VIN Lookup",
      item: `${SITE}/semi-truck-vin-lookup`,
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
  url: `${SITE}/semi-truck-vin-lookup`,
};

/* ── Static UI data ────────────────────────────────────────────── */

const TRUST_STATS = [
  { icon: Truck, value: "Class 8", label: "tractors & trailers" },
  { icon: Container, value: "17", label: "characters decoded" },
  { icon: Zap, value: "Instant", label: "no sign-up needed" },
  { icon: BadgeCheck, value: "Free", label: "make, year & engine" },
];

const HOW_TO_STEPS = [
  {
    step: "01",
    icon: MapPin,
    title: "Find the VIN on the truck",
    body: "Heavy trucks carry the VIN in more places than a car because the cab and chassis are often built separately. Check the driver-side door-jamb label, the frame rail near the front axle, the dash through the windshield, and the title or apportioned cab card. Every copy should match.",
  },
  {
    step: "02",
    icon: ScanLine,
    title: "Read all 17 characters",
    body: "Modern truck and trailer VINs are exactly 17 characters. Copy them precisely — the letters I, O and Q are never used, so anything that looks like one is really a 1 or a 0. A single wrong character decodes a different vehicle.",
  },
  {
    step: "03",
    icon: Search,
    title: "Decode it instantly",
    body: "Enter the VIN above. The decoder reads the WMI (builder + country), the descriptor section (model, cab, engine, GVWR class), the model-year character, and the plant code — returning the full spec in seconds, free.",
  },
  {
    step: "04",
    icon: ClipboardCheck,
    title: "Match it to the listing & title",
    body: "Confirm the decoded make, model, year and engine match what the seller and paperwork claim. Then match the frame-rail stamping to the door label. A mismatch between the decoded truck and the advertised unit is an immediate red flag.",
  },
  {
    step: "05",
    icon: Shield,
    title: "Extend to a full history check",
    body: "When you're buying a six-figure tractor, take the same VIN into a full history report — title brands, odometer or hub-meter tampering, accident records, liens, and theft data — so you know the truck's past, not just its spec.",
  },
];

/* Brand WMI reference — the unique-content asset that differentiates
   this page from a generic VIN decoder and captures brand keywords. */
const BUILDER_ROWS = [
  {
    builder: "Freightliner",
    wmi: "1FU · 3AK",
    detail:
      "The most common semi on U.S. roads. Decodes the Cascadia, Coronado, and M2 model lines plus the engine (Detroit DD13/DD15, Cummins X15) and GVWR class.",
  },
  {
    builder: "Peterbilt",
    wmi: "1XP · 2NP",
    detail:
      "Decodes the 579, 389, 567 and other model lines, the engine, and the axle configuration. A premium owner-operator favourite.",
  },
  {
    builder: "Kenworth",
    wmi: "1XK · 1NK",
    detail:
      "T680, W900, and T880 model lines with the drivetrain spec. Shares a parent (PACCAR) with Peterbilt.",
  },
  {
    builder: "Volvo Trucks",
    wmi: "4V4 · 4V5",
    detail:
      "The VNL and VNR series plus the Volvo D11/D13 engine and I-Shift transmission details.",
  },
  {
    builder: "Mack",
    wmi: "1M1 · 1M2",
    detail:
      "Anthem, Pinnacle, and Granite lines with the MP-series engine. Built by the same group as Volvo Trucks.",
  },
  {
    builder: "International (Navistar)",
    wmi: "1HT · 3HA",
    detail:
      "LT, LoneStar, and HX model lines with the engine and cab spec. A long-standing North American heavy-truck builder.",
  },
];

const TRAILER_BUILDERS =
  "Great Dane · Wabash · Utility · Hyundai Translead · Stoughton · Vanguard · Wilson · MAC · Fontaine · Reitnouer";

const INTERNAL_LINKS = [
  {
    href: "/",
    label: "VIN Decoder",
    desc: "The core free decode — make, model, year, engine, and plant for any tractor or trailer VIN.",
  },
  {
    href: "/salvage-title-check",
    label: "Salvage Title Check",
    desc: "Was the tractor or trailer ever totaled and rebuilt? Catch branded titles before you buy.",
  },
  {
    href: "/accident-history-check",
    label: "Accident History Check",
    desc: "Major frame or collision damage reported against the VIN.",
  },
  {
    href: "/vehicle-lien-check",
    label: "Vehicle Lien Check",
    desc: "Is a bank still owed money on the unit? Confirm there's no outstanding lien.",
  },
  {
    href: "/odometer-check",
    label: "Odometer Check",
    desc: "Verify the mileage trail and spot ECM or hub-meter tampering on the VIN.",
  },
  {
    href: "/recall-check",
    label: "Recall Check",
    desc: "Open NHTSA safety recalls on the tractor, engine, or trailer.",
  },
  {
    href: "/stolen-vehicle-check",
    label: "Stolen Vehicle Check",
    desc: "Confirm the tractor or trailer isn't flagged as stolen before you pay.",
  },
  {
    href: "/chassis-number-lookup",
    label: "Chassis Number Lookup",
    desc: "For international buyers — the same 17-character code is called the chassis number outside North America.",
  },
];

const FAQS = [
  {
    q: "Is a semi truck VIN the same as a car VIN?",
    a: "Yes. Every on-road vehicle built since 1981 — car, pickup, semi tractor, or trailer — uses the same 17-character VIN standard under ISO 3779. The decoding rules are identical: the first three characters identify the manufacturer and country, characters 4–8 describe the model and spec, the 10th encodes the model year, and the rest is the plant and serial.",
  },
  {
    q: "How do I do a free Freightliner or Peterbilt VIN lookup?",
    a: "Find the 17-character VIN on the driver-side door jamb, the frame rail, or the title, then paste it into the free VIN decoder. You will get the model line, model year, engine family, GVWR class, and assembly plant with no sign-up. Freightliner WMIs include 1FU and 3AK; Peterbilt uses 1XP and 2NP.",
  },
  {
    q: "Where is the VIN on a semi truck?",
    a: "Heavy trucks carry the VIN in several places: the driver-side door-jamb certification label, stamped into the frame rail on the driver's side near the front axle, on the dashboard visible through the windshield on newer tractors, and on the title and IRP/apportioned cab card. Always match the frame-rail stamping to the door label and the title.",
  },
  {
    q: "Where is the VIN on a semi trailer?",
    a: "A semi trailer's VIN is on a plate riveted to the front wall or the driver-side frame near the landing gear, and stamped into the frame rail. On any modern trailer it is a full 17-character VIN that decodes to the manufacturer (Great Dane, Wabash, Utility, Hyundai Translead, Stoughton), trailer type, model year, and axle configuration.",
  },
  {
    q: "Why is my trailer VIN shorter than 17 characters?",
    a: "Older or light-duty utility trailers were issued manufacturer-specific serial numbers before the 17-character VIN became standard. If your trailer number isn't 17 characters, it predates the modern VIN standard or is a non-VIN unit — decode it from the manufacturer's data plate instead of a VIN tool.",
  },
  {
    q: "Can a semi truck VIN lookup tell me who owns the truck?",
    a: "No. Owner and registration data is personal information protected by the federal Driver's Privacy Protection Act (DPPA) and is never returned by a VIN lookup. A VIN reveals the vehicle's specification and, where records exist, its title, mileage, accident, lien, and theft history — not the owner's identity.",
  },
  {
    q: "What can I learn from a heavy truck VIN?",
    a: "Decoding a semi tractor or trailer VIN reveals the manufacturer, model line, model year, engine family, body or trailer class, GVWR rating, and country and plant of assembly. Extended into a history report, the same VIN surfaces title brands, reported accidents, odometer readings, liens, and theft records.",
  },
  {
    q: "Do I need to pay for a semi truck VIN check?",
    a: "The decode — year, make, model, engine, and plant — is completely free and instant with no account. A full history report with title, accident, odometer, lien, and theft data is the paid step, and it is a fraction of the cost of one bad-truck repair bill.",
  },
  {
    q: "What do the first three characters of a truck VIN mean?",
    a: "The first three characters are the World Manufacturer Identifier (WMI), which name the builder and country. Common heavy-truck WMIs: 1FU/3AK Freightliner, 1XP/2NP Peterbilt, 1XK/1NK Kenworth, 4V4/4V5 Volvo, 1M1/1M2 Mack, and 1HT/3HA International (Navistar).",
  },
  {
    q: "Does a VIN lookup work for an 18-wheeler bought at auction?",
    a: "Yes. Any Class 8 tractor or trailer with a standard 17-character VIN can be decoded and history-checked. Auction trucks change hands fast across state lines, which is exactly where salvage rebuilds, odometer or hub-meter tampering, and outstanding liens hide — so a VIN check before bidding is essential.",
  },
];

/* ── Page ──────────────────────────────────────────────────────── */

export default function SemiTruckVinLookupPage() {
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
                { label: "Semi Truck VIN Lookup" },
              ]}
              onDark
            />

            <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
              <Truck className="w-4 h-4" /> Tractors &amp; Trailers
              &nbsp;·&nbsp; Every Class 8 Builder
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-headline font-extrabold leading-tight mb-4">
              Semi Truck VIN Lookup —{" "}
              <span style={{ color: "var(--color-secondary-container)" }}>
                Decode Any Tractor Free
              </span>
            </h1>

            <p className="speakable-intro text-base sm:text-xl text-white/85 max-w-3xl mb-8 leading-relaxed">
              A semi truck&apos;s VIN works exactly like a car&apos;s — 17
              characters that decode the make, model year, engine, GVWR class,
              and plant. Look up any Freightliner, Peterbilt, Kenworth, Volvo,
              Mack or International tractor, plus semi trailers, free.
            </p>

            <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-xl">
              <h2 className="text-base sm:text-lg font-headline font-extrabold text-primary mb-1">
                Look Up a Semi Truck or Trailer VIN
              </h2>
              <p className="text-xs sm:text-sm text-on-surface-variant mb-4">
                Enter the 17-character VIN — we&apos;ll return the make, model,
                year, engine, GVWR class, and history
              </p>
              <VinSearchForm size="lg" />
              <p className="mt-3 text-[11px] text-slate-400 flex items-center gap-1.5">
                <Lock className="w-3 h-3" /> Free · No sign-up · Instant spec
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
          {/* ── Truck VIN = car VIN (the core answer) ───────── */}
          <section className="py-12 sm:py-16">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              A Semi Truck VIN Is the Same Standard as a Car VIN
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl leading-relaxed">
              This is the thing buyers and owner-operators ask most. The short
              answer: a heavy truck&apos;s VIN follows the{" "}
              <strong>exact same 17-character standard</strong> as a passenger
              car. The decoding rules don&apos;t change — only the spec it
              describes (GVWR class, sleeper cab, drive axles) is heavy-duty.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5 sm:p-6">
                <div className="text-[11px] font-black uppercase tracking-wider text-on-surface-variant mb-2">
                  The Tractor
                </div>
                <p className="text-lg font-headline font-extrabold text-on-surface mb-3">
                  Freightliner · Peterbilt · Kenworth · Volvo · Mack
                </p>
                <ul className="space-y-2 text-sm text-on-surface-variant">
                  <li className="flex gap-2">
                    <span>·</span>
                    <span>17-character VIN on the door jamb, frame rail, and title.</span>
                  </li>
                  <li className="flex gap-2">
                    <span>·</span>
                    <span>Decodes the model line, engine family, and GVWR class.</span>
                  </li>
                  <li className="flex gap-2">
                    <span>·</span>
                    <span>WMI starts with 1, 4, or 5 on U.S.-built trucks.</span>
                  </li>
                </ul>
              </div>
              <div className="rounded-2xl border border-primary/30 bg-primary/5 p-5 sm:p-6">
                <div className="text-[11px] font-black uppercase tracking-wider text-primary mb-2">
                  The Trailer
                </div>
                <p className="text-lg font-headline font-extrabold text-primary mb-3">
                  Dry van · Reefer · Flatbed · Lowboy · Tanker
                </p>
                <ul className="space-y-2 text-sm text-on-surface-variant">
                  <li className="flex gap-2">
                    <span>·</span>
                    <span>Its own 17-character VIN on the front wall and frame.</span>
                  </li>
                  <li className="flex gap-2">
                    <span>·</span>
                    <span>Decodes the builder, trailer type, and axle setup.</span>
                  </li>
                  <li className="flex gap-2">
                    <span>·</span>
                    <span>Decoded the same way as the tractor — same tool.</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-6 rounded-2xl bg-secondary-container/40 border border-outline-variant p-5 sm:p-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-on-secondary-container flex-shrink-0 mt-0.5" />
                <p className="text-sm text-on-surface leading-relaxed">
                  <strong className="text-on-surface">Quick test:</strong> count
                  the characters. If it&apos;s exactly 17 with no letters I, O or
                  Q, it&apos;s a modern VIN and the tool above will decode it. A
                  shorter number on an older utility trailer predates the VIN
                  standard and must be read from the manufacturer&apos;s plate
                  instead.
                </p>
              </div>
            </div>
          </section>

          {/* ── How to look up a semi by VIN ──────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              How to Look Up a Semi Truck by VIN — Step by Step
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl">
              Five steps from &ldquo;where is it?&rdquo; to a full
              identification and history. Works for tractors and trailers with a
              standard 17-character VIN.
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

          {/* ── Builder WMI reference (unique asset) ───────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              The Big Class 8 Builders &amp; Their VIN Codes
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl">
              The first three characters of a VIN — the WMI — name the builder.
              Here are the codes for every major North American semi
              manufacturer. All of them decode through the{" "}
              <Link
                href="/"
                className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80"
              >
                same free tool
              </Link>{" "}
              — you don&apos;t need a separate site per brand.
            </p>
            <div className="overflow-x-auto rounded-2xl border border-outline-variant">
              <table className="w-full border-collapse min-w-[640px] text-sm">
                <thead className="bg-surface-container-low">
                  <tr>
                    <th className="p-4 text-left font-headline font-extrabold text-primary">
                      Builder
                    </th>
                    <th className="p-4 text-left font-headline font-extrabold text-primary">
                      WMI (1–3)
                    </th>
                    <th className="p-4 text-left font-headline font-extrabold text-primary">
                      What the VIN decodes to
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {BUILDER_ROWS.map((row) => (
                    <tr
                      key={row.builder}
                      className="border-t border-outline-variant/60 align-top"
                    >
                      <td className="p-4 font-bold text-on-surface whitespace-nowrap">
                        {row.builder}
                      </td>
                      <td className="p-4">
                        <code className="font-mono text-xs bg-surface-container-low rounded px-2 py-1 text-primary whitespace-nowrap">
                          {row.wmi}
                        </code>
                      </td>
                      <td className="p-4 text-on-surface-variant leading-relaxed">
                        {row.detail}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* ── Where the VIN is on a truck (positions) ────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              Where to Find the VIN on a Semi Truck &amp; Trailer
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl">
              Heavy trucks carry the VIN in more places than a passenger car,
              because the cab and the chassis are often built separately. Check
              these spots — and make sure they all agree.
            </p>
            <div className="overflow-x-auto rounded-2xl border border-outline-variant">
              <table className="w-full border-collapse min-w-[640px] text-sm">
                <thead className="bg-surface-container-low">
                  <tr>
                    <th className="p-4 text-left font-headline font-extrabold text-primary">
                      Location
                    </th>
                    <th className="p-4 text-left font-headline font-extrabold text-primary">
                      Tractor or Trailer
                    </th>
                    <th className="p-4 text-left font-headline font-extrabold text-primary">
                      Notes
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      loc: "Driver-side door jamb",
                      unit: "Tractor",
                      note: "The federal certification label — the most reliable copy on the truck.",
                    },
                    {
                      loc: "Frame rail",
                      unit: "Both",
                      note: "Stamped into the steel on the driver's side near the front axle. The 'true' chassis number — trust this if a label looks tampered with.",
                    },
                    {
                      loc: "Dashboard",
                      unit: "Tractor",
                      note: "Visible through the windshield on newer tractors.",
                    },
                    {
                      loc: "Front wall plate",
                      unit: "Trailer",
                      note: "Riveted to the front wall, or on the driver-side frame near the landing gear.",
                    },
                    {
                      loc: "Title & cab card",
                      unit: "Both",
                      note: "On the title, registration, and the IRP / apportioned cab card.",
                    },
                  ].map((row) => (
                    <tr
                      key={row.loc}
                      className="border-t border-outline-variant/60 align-top"
                    >
                      <td className="p-4 font-bold text-on-surface whitespace-nowrap">
                        {row.loc}
                      </td>
                      <td className="p-4 text-on-surface-variant whitespace-nowrap">
                        {row.unit}
                      </td>
                      <td className="p-4 text-on-surface-variant leading-relaxed">
                        {row.note}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-xs text-on-surface-variant">
              Common trailer builders you&apos;ll decode: {TRAILER_BUILDERS}.
            </p>
          </section>

          {/* ── Mid-page CTA ───────────────────────────────── */}
          <section className="py-10">
            <div className="rounded-3xl bg-primary p-7 sm:p-10 text-center">
              <Truck className="w-8 h-8 text-yellow-300 mx-auto mb-3" />
              <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-white mb-2">
                Decode a Tractor or Trailer VIN in Seconds
              </h2>
              <p className="text-white/80 text-sm sm:text-base mb-6 max-w-xl mx-auto">
                Free, instant identification straight from the
                manufacturer&apos;s build record — make, model, year, engine,
                and GVWR class.
              </p>
              <div className="max-w-xl mx-auto bg-white rounded-2xl p-4 sm:p-5">
                <VinSearchForm size="lg" />
              </div>
            </div>
          </section>

          {/* ── Why match the VIN ───────────────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">
              Always Match the VIN Before You Buy a Used Truck
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
                <p>
                  A semi tractor is a six-figure asset that crosses state lines
                  and changes hands fast — the exact conditions that hide
                  salvage rebuilds, odometer or hub-meter tampering, and
                  outstanding liens. The VIN is your single best defence.
                </p>
                <p>
                  Decode the number first to confirm the truck type matches the
                  advert. A VIN that decodes to a different model, engine, or
                  year than the one in front of you is a stop-the-deal red flag.
                  Then verify the same number on the title, the door jamb, and
                  the frame-rail stamping all agree.
                </p>
                <p>
                  When the spec checks out, take the VIN into a full{" "}
                  <Link
                    href="/salvage-title-check"
                    className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80"
                  >
                    title and history check
                  </Link>{" "}
                  to surface the records a decode alone can&apos;t — title
                  brands, accident damage, liens, and theft markers.
                </p>
              </div>
              <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Wrench className="w-5 h-5 text-primary" />
                  <h3 className="font-headline font-extrabold text-primary">
                    Truck VIN red flags
                  </h3>
                </div>
                <ul className="space-y-2 text-sm text-on-surface">
                  {[
                    "Decoded model or engine doesn't match the listing",
                    "The VIN contains an I, O, or Q (never valid)",
                    "Title VIN differs from the number on the truck",
                    "Door-jamb label and frame-rail stamping disagree",
                    "Frame plate looks re-riveted, ground, or repainted",
                    "Fewer than 17 characters on a post-1981 unit",
                  ].map((reason) => (
                    <li key={reason} className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-5 rounded-xl bg-white p-4 border border-outline-variant">
                  <p className="text-xs font-bold text-on-surface mb-2">
                    Check a truck VIN now:
                  </p>
                  <VinSearchForm size="sm" />
                </div>
              </div>
            </div>
          </section>

          {/* ── Internal links ─────────────────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              More Checks That Read a Truck VIN
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-7">
              The same 17 characters unlock every one of these checks.
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
              Semi Truck VIN Lookup — Frequently Asked Questions
            </h2>
            <p className="text-sm text-on-surface-variant mb-8">
              Direct answers to what truck and trailer buyers ask most.
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
              <Zap className="w-3.5 h-3.5" /> Free · Instant · Class 8
            </div>
            <h2 className="text-2xl sm:text-4xl font-headline font-extrabold text-primary mb-3">
              Look Up Any Semi Truck or Trailer by VIN
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl mx-auto mb-8">
              Enter a 17-character VIN to identify the make, model, year, and
              engine, then unlock the full title, mileage, lien, and accident
              history.
            </p>
            <div className="max-w-xl mx-auto bg-surface-container-low rounded-2xl p-5 border border-outline-variant">
              <VinSearchForm size="lg" />
            </div>
            <div className="mt-3 flex items-center justify-center gap-2 text-xs text-on-surface-variant">
              <Check className="w-3.5 h-3.5 text-green-500" strokeWidth={3} />
              No credit card · No sign-up · Free spec
            </div>
          </section>

          <RelatedChecks exclude="/semi-truck-vin-lookup" />
        </div>
      </article>
    </>
  );
}
