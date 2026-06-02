import type { Metadata } from "next";
import Link from "next/link";
import {
  Check,
  Shield,
  Search,
  FileText,
  AlertCircle,
  Globe,
  MapPin,
  ChevronRight,
  Lock,
  Zap,
  BadgeCheck,
  Hash,
  ScanLine,
  Car,
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
    "Chassis Number Lookup — Decode Any Chassis (VIN) Number Free & Find Car Type",
  description:
    "Search a car by chassis number free. A chassis number is the same 17-character VIN — decode it to find the car type, make, model, year, engine, and full history. Works for vehicles worldwide. No sign-up.",
  keywords: [
    "chassis number lookup",
    "search car by chassis number",
    "find vehicle by chassis number",
    "chassis number finder",
    "check my chassis number",
    "find my chassis number",
    "look up car type by vin",
    "chassis number check",
    "decode chassis number",
    "vin decoder lookup",
    "free vin decoder online",
    "best vin decoder free",
    "check a car free",
    "what is a chassis number",
    "chassis number vs vin",
    "car frame number lookup",
    "vehicle chassis number search",
  ],
  alternates: { canonical: "/chassis-number-lookup" },
  openGraph: {
    title: "Chassis Number Lookup — Decode Any Chassis (VIN) Number Free",
    description:
      "Your chassis number is your VIN. Decode it free to find the car type, specs, and history. Works for vehicles worldwide — instant, no sign-up.",
    url: `${SITE}/chassis-number-lookup`,
    type: "article",
    siteName: "CarCheckerVIN",
    images: [
      {
        url: `${SITE}/chassis-number-lookup/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Chassis Number Lookup — decode any chassis (VIN) number free",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chassis Number Lookup — Decode Any Chassis (VIN) Number Free",
    description:
      "A chassis number is the same as a VIN. Decode it free to find the car type, specs, and full history. Instant, worldwide.",
    images: [`${SITE}/chassis-number-lookup/opengraph-image`],
  },
  robots: { index: true, follow: true },
};

/* ── JSON-LD schemas ───────────────────────────────────────────── */

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Chassis Number Lookup",
  url: `${SITE}/chassis-number-lookup`,
  applicationCategory: "AutomotiveApplication",
  operatingSystem: "All",
  description:
    "Free tool to decode any chassis number (VIN) and find the car type, make, model, year, engine, and full vehicle history. Works for vehicles worldwide.",
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
      name: "Is a chassis number the same as a VIN?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. 'Chassis number' is the term used across the UK, Europe, Australia, India, the Middle East, Africa, and much of Asia for what North America calls the VIN (Vehicle Identification Number). On vehicles built after 1981 it is the same 17-character alphanumeric code. Older vehicles and some markets used shorter chassis numbers, but the modern standard is identical worldwide.",
      },
    },
    {
      "@type": "Question",
      name: "How do I search a car by chassis number?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Enter the full 17-character chassis number into the lookup tool above and we decode it instantly. The result shows the car type, make, model, year, body style, engine, manufacturing plant, and — where records exist — title, mileage, and accident history. There is no sign-up to decode the specs.",
      },
    },
    {
      "@type": "Question",
      name: "Where do I find my chassis number?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The chassis number appears in several places: on the vehicle registration document (V5C in the UK, registration certificate elsewhere), on a metal plate in the engine bay, stamped on the chassis rail or firewall, on a sticker in the driver-side door jamb, and visible through the lower corner of the windscreen on most modern cars. All copies should match — a mismatch is a fraud red flag.",
      },
    },
    {
      "@type": "Question",
      name: "Can I look up a car type by chassis number for free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Decoding the chassis number to reveal the car type, make, model, year, body, and engine is completely free and instant — no account needed. A fuller history report (title brands, odometer trail, accident and theft records) is available as a paid add-on, but the core vehicle identification is free.",
      },
    },
    {
      "@type": "Question",
      name: "What can a chassis number tell me about a car?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A 17-character chassis number is structured: the first three characters (WMI) identify the manufacturer and country of origin, characters 4–8 (VDS) describe the model, body style, engine, and restraint system, the 9th is a check digit, the 10th encodes the model year, the 11th is the assembly plant, and the last six are the unique serial number. Decoding it reveals the exact car type and specification.",
      },
    },
    {
      "@type": "Question",
      name: "My chassis number is shorter than 17 characters — why?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Vehicles manufactured before 1981 (and some classic, kit, or grey-import vehicles) often have a shorter, non-standard chassis number that predates the 17-character ISO 3779 VIN standard. These cannot be decoded automatically and usually require manufacturer-specific records or a classic-vehicle club to interpret. For any vehicle from 1981 onward, the chassis number should be a full 17 characters.",
      },
    },
    {
      "@type": "Question",
      name: "Is a chassis number the same as the engine number or frame number?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. The chassis number (VIN) identifies the whole vehicle and is the one used for registration, history, and recalls. The engine number is stamped on the engine block and identifies that specific engine — it can change if the engine is replaced. 'Frame number' is another name for the chassis number on body-on-frame vehicles and motorcycles. Always use the chassis number (VIN) for a history lookup.",
      },
    },
    {
      "@type": "Question",
      name: "Can I find a vehicle's owner from the chassis number?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Owner identity is personal data protected by privacy law (the DPPA in the US and equivalent regulations elsewhere) and is never returned by a chassis number lookup. What you can legally retrieve is the vehicle's specification and, where available, its title, mileage, accident, and theft history — the records that matter when buying a used car.",
      },
    },
    {
      "@type": "Question",
      name: "Does a chassis number lookup work for imported cars?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, if the import carries a standard 17-character chassis number. Decoding the WMI reveals the country of manufacture, which is useful for verifying a grey import or JDM vehicle. History data depth varies by country of origin — North American records are the deepest. For Japanese imports, pair the chassis number with a JDM import check for auction and export records.",
      },
    },
    {
      "@type": "Question",
      name: "What letters are never used in a chassis number?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The letters I, O, and Q are never used in a 17-character chassis number, because they are too easily confused with the numbers 1 and 0. If your chassis number appears to contain one of these letters, look again — it is almost certainly a 1 or a 0. This rule is a quick way to spot a transcription error or a faked plate.",
      },
    },
    {
      "@type": "Question",
      name: "Why does the same chassis number show on the V5C and the car?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Because the chassis number is the vehicle's permanent identity, it is printed on the registration document and physically stamped or plated on the car so the two can be matched. When buying, always confirm the chassis number on the document matches every copy on the vehicle. A mismatch can indicate a cloned, ringed, or stolen car — verify it with a free chassis number check before paying.",
      },
    },
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Look Up a Car by Chassis Number",
  description:
    "Step-by-step guide to finding and decoding a vehicle's chassis number (VIN) to identify the car type and history.",
  totalTime: "PT2M",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Locate the chassis number",
      text: "Find the chassis number on the registration document (V5C / registration certificate), through the lower windscreen, in the engine bay, on the chassis rail, or on the driver-side door jamb sticker.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Copy all 17 characters exactly",
      text: "Write down the full chassis number character for character. Remember the letters I, O, and Q are never used — any character that looks like one is really a 1 or 0.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Enter it into the lookup tool",
      text: "Paste the chassis number into the lookup field above and submit. The decoder identifies the manufacturer, country, model, body, engine, and year instantly.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Review the car type and specification",
      text: "Read the decoded result to confirm the car type matches the listing or document. Check the country of origin and model year against what the seller claims.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Run a full history check before buying",
      text: "For a used-car purchase, extend the decode into a full history report to surface title brands, odometer rollback, accident records, and theft data tied to that chassis number.",
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
      name: "Chassis Number Lookup",
      item: `${SITE}/chassis-number-lookup`,
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
  url: `${SITE}/chassis-number-lookup`,
};

/* ── Static UI data ────────────────────────────────────────────── */

const TRUST_STATS = [
  { icon: Globe, value: "Worldwide", label: "any 17-char chassis no." },
  { icon: Hash, value: "17", label: "characters decoded" },
  { icon: Zap, value: "Instant", label: "no sign-up needed" },
  { icon: BadgeCheck, value: "Free", label: "car type & specs" },
];

const HOW_TO_STEPS = [
  {
    step: "01",
    icon: MapPin,
    title: "Find your chassis number",
    body: "It lives in several places: on the registration document (V5C in the UK, the registration certificate elsewhere), through the bottom of the windscreen, on a plate in the engine bay, stamped on the chassis rail or firewall, and on the driver-side door jamb sticker. Every copy should match.",
  },
  {
    step: "02",
    icon: ScanLine,
    title: "Read all 17 characters",
    body: "Modern chassis numbers are exactly 17 characters. Copy them precisely — the letters I, O and Q are never used, so anything that looks like one is really a 1 or a 0. A single wrong character decodes a different vehicle.",
  },
  {
    step: "03",
    icon: Search,
    title: "Decode it instantly",
    body: "Enter the chassis number above. The decoder reads the WMI (manufacturer + country), the descriptor section (model, body, engine, restraints), the model-year character, and the plant code — returning the full car type in seconds, free.",
  },
  {
    step: "04",
    icon: ClipboardCheck,
    title: "Match it to the listing or document",
    body: "Confirm the decoded make, model, year and body match what the seller or paperwork claims. A mismatch between the decoded car type and the advertised vehicle is an immediate red flag for a cloned or misrepresented car.",
  },
  {
    step: "05",
    icon: Shield,
    title: "Extend to a full history check",
    body: "When you're buying, take the same chassis number further into a full vehicle history report — title brands, odometer trail, accident records, theft and salvage data — so you know the car's past, not just its specification.",
  },
];

/* Country / region naming reference — the unique-content asset that
   differentiates this page from a generic VIN decoder. */
const REGION_TABLE_ROWS = [
  {
    region: "United Kingdom & Ireland",
    term: "Chassis number / VIN",
    detail:
      "Printed on the V5C logbook (registration document). Also stamped on the chassis and shown through the windscreen. 17 characters on vehicles from 1981 onward.",
    doc: "V5C",
  },
  {
    region: "European Union",
    term: "Chassis number / VIN",
    detail:
      "Shown on the vehicle registration certificate (Part 1) and the manufacturer's plate. EU type-approval mandates a 17-character VIN to ISO 3779.",
    doc: "Reg. certificate",
  },
  {
    region: "Australia & New Zealand",
    term: "Chassis number / VIN",
    detail:
      "On the registration papers and a compliance/identification plate. Imports must carry a 17-character VIN to be registered; pre-1989 vehicles may have a shorter chassis number.",
    doc: "Rego papers",
  },
  {
    region: "India & South Asia",
    term: "Chassis number",
    detail:
      "Recorded on the RC (Registration Certificate) and stamped on the chassis. The chassis number and a separate engine number are both listed on the RC.",
    doc: "RC",
  },
  {
    region: "Middle East & Africa",
    term: "Chassis number",
    detail:
      "Used on the Mulkiya / registration card and the manufacturer's plate. Many vehicles are imports, so the WMI is useful for confirming country of origin.",
    doc: "Mulkiya / Reg. card",
  },
  {
    region: "North America (US & Canada)",
    term: "VIN",
    detail:
      "Called 'VIN' rather than chassis number. On the title/registration, the dashboard through the windscreen, and the door jamb. The deepest history records of any region.",
    doc: "Title",
  },
  {
    region: "Japan (JDM)",
    term: "Chassis number (車台番号)",
    detail:
      "Domestic Japanese vehicles use a shorter model-code + serial chassis number, not the 17-character VIN. Export and grey-import vehicles are matched via auction sheets and export certificates.",
    doc: "Export certificate",
  },
];

const INTERNAL_LINKS = [
  {
    href: "/vin-decoder",
    label: "VIN Decoder",
    desc: "The same decode, framed for North American 'VIN' searchers — specs, trim, and factory options.",
  },
  {
    href: "/vin-check",
    label: "Full VIN History Check",
    desc: "Title, accident, odometer, recall, and ownership records tied to the chassis number.",
  },
  {
    href: "/jdm-import-check",
    label: "JDM Import Check",
    desc: "For Japanese imports with a domestic chassis number — auction sheets and export records.",
  },
  {
    href: "/motorcycle-vin-search",
    label: "Motorcycle Frame Number Search",
    desc: "Decode a motorcycle frame (chassis) number for make, model, and engine.",
  },
  {
    href: "/recall-check",
    label: "Recall Check",
    desc: "Find open safety recalls registered against the chassis number.",
  },
  {
    href: "/odometer-check",
    label: "Odometer Check",
    desc: "Verify the mileage trail recorded against this chassis number over time.",
  },
  {
    href: "/stolen-vehicle-check",
    label: "Stolen Vehicle Check",
    desc: "Confirm the chassis number isn't flagged as stolen before you buy.",
  },
  {
    href: "/window-sticker",
    label: "Window Sticker by VIN",
    desc: "Rebuild the original factory specification sheet from the chassis number.",
  },
];

const FAQS = [
  {
    q: "Is a chassis number the same as a VIN?",
    a: "Yes. 'Chassis number' is the term used across the UK, Europe, Australia, India, the Middle East, Africa, and much of Asia for what North America calls the VIN (Vehicle Identification Number). On vehicles built after 1981 it is the same 17-character alphanumeric code. Older vehicles and some markets used shorter chassis numbers, but the modern standard is identical worldwide.",
  },
  {
    q: "How do I search a car by chassis number?",
    a: "Enter the full 17-character chassis number into the lookup tool above and we decode it instantly. The result shows the car type, make, model, year, body style, engine, manufacturing plant, and — where records exist — title, mileage, and accident history. There is no sign-up to decode the specs.",
  },
  {
    q: "Where do I find my chassis number?",
    a: "The chassis number appears in several places: on the vehicle registration document (V5C in the UK, registration certificate elsewhere), on a metal plate in the engine bay, stamped on the chassis rail or firewall, on a sticker in the driver-side door jamb, and visible through the lower corner of the windscreen on most modern cars. All copies should match — a mismatch is a fraud red flag.",
  },
  {
    q: "Can I look up a car type by chassis number for free?",
    a: "Yes. Decoding the chassis number to reveal the car type, make, model, year, body, and engine is completely free and instant — no account needed. A fuller history report (title brands, odometer trail, accident and theft records) is available as a paid add-on, but the core vehicle identification is free.",
  },
  {
    q: "What can a chassis number tell me about a car?",
    a: "A 17-character chassis number is structured: the first three characters (WMI) identify the manufacturer and country of origin, characters 4–8 (VDS) describe the model, body style, engine, and restraint system, the 9th is a check digit, the 10th encodes the model year, the 11th is the assembly plant, and the last six are the unique serial number. Decoding it reveals the exact car type and specification.",
  },
  {
    q: "My chassis number is shorter than 17 characters — why?",
    a: "Vehicles manufactured before 1981 (and some classic, kit, or grey-import vehicles) often have a shorter, non-standard chassis number that predates the 17-character ISO 3779 VIN standard. These cannot be decoded automatically and usually require manufacturer-specific records or a classic-vehicle club to interpret. For any vehicle from 1981 onward, the chassis number should be a full 17 characters.",
  },
  {
    q: "Is a chassis number the same as the engine number or frame number?",
    a: "No. The chassis number (VIN) identifies the whole vehicle and is the one used for registration, history, and recalls. The engine number is stamped on the engine block and identifies that specific engine — it can change if the engine is replaced. 'Frame number' is another name for the chassis number on body-on-frame vehicles and motorcycles. Always use the chassis number (VIN) for a history lookup.",
  },
  {
    q: "Can I find a vehicle's owner from the chassis number?",
    a: "No. Owner identity is personal data protected by privacy law (the DPPA in the US and equivalent regulations elsewhere) and is never returned by a chassis number lookup. What you can legally retrieve is the vehicle's specification and, where available, its title, mileage, accident, and theft history — the records that matter when buying a used car.",
  },
  {
    q: "Does a chassis number lookup work for imported cars?",
    a: "Yes, if the import carries a standard 17-character chassis number. Decoding the WMI reveals the country of manufacture, which is useful for verifying a grey import or JDM vehicle. History data depth varies by country of origin — North American records are the deepest. For Japanese imports, pair the chassis number with a JDM import check for auction and export records.",
  },
  {
    q: "What letters are never used in a chassis number?",
    a: "The letters I, O, and Q are never used in a 17-character chassis number, because they are too easily confused with the numbers 1 and 0. If your chassis number appears to contain one of these letters, look again — it is almost certainly a 1 or a 0. This rule is a quick way to spot a transcription error or a faked plate.",
  },
  {
    q: "Why does the same chassis number show on the V5C and the car?",
    a: "Because the chassis number is the vehicle's permanent identity, it is printed on the registration document and physically stamped or plated on the car so the two can be matched. When buying, always confirm the chassis number on the document matches every copy on the vehicle. A mismatch can indicate a cloned, ringed, or stolen car — verify it with a free chassis number check before paying.",
  },
];

/* ── Page ──────────────────────────────────────────────────────── */

export default function ChassisNumberLookupPage() {
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
                { label: "Chassis Number Lookup" },
              ]}
              onDark
            />

            <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
              <Globe className="w-4 h-4" /> Chassis Number = VIN &nbsp;·&nbsp;
              Works Worldwide
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-headline font-extrabold leading-tight mb-4">
              Chassis Number Lookup —{" "}
              <span style={{ color: "var(--color-secondary-container)" }}>
                Find the Car Type Free
              </span>
            </h1>

            <p className="speakable-intro text-base sm:text-xl text-white/85 max-w-3xl mb-8 leading-relaxed">
              Your chassis number <em>is</em> your VIN. Enter the 17-character
              code to decode the make, model, year, body, and engine instantly —
              then see the full history. Whether your document calls it a chassis
              number, frame number, or VIN, this is the one tool that reads it.
            </p>

            <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-xl">
              <h2 className="text-base sm:text-lg font-headline font-extrabold text-primary mb-1">
                Search a Car by Chassis Number
              </h2>
              <p className="text-xs sm:text-sm text-on-surface-variant mb-4">
                Enter the 17-character chassis number (VIN) — we&apos;ll return
                the car type, full specification, and history
              </p>
              <VinSearchForm size="lg" />
              <p className="mt-3 text-[11px] text-slate-400 flex items-center gap-1.5">
                <Lock className="w-3 h-3" /> Free · No sign-up · Instant car type
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
          {/* ── Chassis number = VIN (the core answer) ───────── */}
          <section className="py-12 sm:py-16">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              Chassis Number vs VIN — They&apos;re the Same Thing
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl leading-relaxed">
              This trips up buyers every day. The short answer: on any vehicle
              built since 1981, the <strong>chassis number and the VIN are one
              and the same</strong> 17-character code. Only the name changes by
              country.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5 sm:p-6">
                <div className="text-[11px] font-black uppercase tracking-wider text-on-surface-variant mb-2">
                  &ldquo;Chassis Number&rdquo;
                </div>
                <p className="text-lg font-headline font-extrabold text-on-surface mb-3">
                  UK · EU · Australia · India · Middle East · Africa
                </p>
                <ul className="space-y-2 text-sm text-on-surface-variant">
                  <li className="flex gap-2">
                    <span>·</span>
                    <span>The everyday term on a V5C, RC, or registration certificate.</span>
                  </li>
                  <li className="flex gap-2">
                    <span>·</span>
                    <span>Stamped on the chassis and shown on the manufacturer&apos;s plate.</span>
                  </li>
                  <li className="flex gap-2">
                    <span>·</span>
                    <span>17 characters under the global ISO 3779 standard.</span>
                  </li>
                </ul>
              </div>
              <div className="rounded-2xl border border-primary/30 bg-primary/5 p-5 sm:p-6">
                <div className="text-[11px] font-black uppercase tracking-wider text-primary mb-2">
                  &ldquo;VIN&rdquo;
                </div>
                <p className="text-lg font-headline font-extrabold text-primary mb-3">
                  USA · Canada (and the technical/legal name everywhere)
                </p>
                <ul className="space-y-2 text-sm text-on-surface-variant">
                  <li className="flex gap-2">
                    <span>·</span>
                    <span>Vehicle Identification Number — same 17 characters.</span>
                  </li>
                  <li className="flex gap-2">
                    <span>·</span>
                    <span>On the title, dashboard, and door jamb.</span>
                  </li>
                  <li className="flex gap-2">
                    <span>·</span>
                    <span>Identical structure: WMI + descriptor + serial.</span>
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
                  Q, it&apos;s a modern chassis number (VIN) and the tool above
                  will decode it. If it&apos;s shorter, you have a pre-1981 or
                  domestic-market chassis number that needs manufacturer records
                  instead.
                </p>
              </div>
            </div>
          </section>

          {/* ── How to look up a car by chassis number ──────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              How to Look Up a Car by Chassis Number — Step by Step
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl">
              Five steps from &ldquo;where is it?&rdquo; to a full car-type
              identification and history. Works for cars, vans, trucks, and
              motorcycles with a standard 17-character chassis number.
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

          {/* ── What the 17 characters mean ──────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              What Each Part of a Chassis Number Means
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl">
              A 17-character chassis number isn&apos;t random — it&apos;s a
              structured code. Knowing the segments tells you what the decoder is
              reading to identify the car type.
            </p>
            <div className="overflow-x-auto rounded-2xl border border-outline-variant">
              <table className="w-full border-collapse min-w-[640px] text-sm">
                <thead className="bg-surface-container-low">
                  <tr>
                    <th className="p-4 text-left font-headline font-extrabold text-primary">
                      Position
                    </th>
                    <th className="p-4 text-left font-headline font-extrabold text-primary">
                      Segment
                    </th>
                    <th className="p-4 text-left font-headline font-extrabold text-primary">
                      What it tells you
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      pos: "1–3",
                      seg: "WMI",
                      detail:
                        "World Manufacturer Identifier — the make and the country of origin. This is how the tool knows a car is, say, a German-built BMW or a US-built Ford.",
                    },
                    {
                      pos: "4–8",
                      seg: "VDS",
                      detail:
                        "Vehicle Descriptor Section — model, body style, engine, and restraint system. This is the core of the 'car type' answer.",
                    },
                    {
                      pos: "9",
                      seg: "Check digit",
                      detail:
                        "A calculated digit that validates the whole number. If it doesn't compute, the chassis number was mistyped or tampered with.",
                    },
                    {
                      pos: "10",
                      seg: "Model year",
                      detail:
                        "A single character encoding the model year (e.g. the year a 2019 vs a 2003 was built). Letters skip I, O, Q, U, Z and the digit 0.",
                    },
                    {
                      pos: "11",
                      seg: "Plant code",
                      detail:
                        "The specific assembly plant that built the vehicle — useful for verifying a build location on imports.",
                    },
                    {
                      pos: "12–17",
                      seg: "Serial number",
                      detail:
                        "The unique production serial that makes this one vehicle different from every other of the same model.",
                    },
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
                      <td className="p-4 font-bold text-on-surface whitespace-nowrap">
                        {row.seg}
                      </td>
                      <td className="p-4 text-on-surface-variant leading-relaxed">
                        {row.detail}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-xs text-on-surface-variant">
              Want the deeper breakdown? See our{" "}
              <Link
                href="/guides/how-to-read-a-vin"
                className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80"
              >
                guide to reading a VIN
              </Link>{" "}
              — every rule applies identically to a chassis number.
            </p>
          </section>

          {/* ── Region naming reference (unique asset) ───────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              What It&apos;s Called &amp; Where to Find It — by Country
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl">
              The same 17-character code goes by different names and lives on
              different documents around the world. Here&apos;s where to look,
              wherever your car is registered.
            </p>
            <div className="overflow-x-auto rounded-2xl border border-outline-variant">
              <table className="w-full border-collapse min-w-[680px] text-sm">
                <thead className="bg-surface-container-low">
                  <tr>
                    <th className="p-4 text-left font-headline font-extrabold text-primary">
                      Region
                    </th>
                    <th className="p-4 text-left font-headline font-extrabold text-primary">
                      Term Used
                    </th>
                    <th className="p-4 text-left font-headline font-extrabold text-primary">
                      Where to Find It
                    </th>
                    <th className="p-4 text-left font-headline font-extrabold text-primary">
                      Document
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {REGION_TABLE_ROWS.map((row) => (
                    <tr
                      key={row.region}
                      className="border-t border-outline-variant/60 align-top"
                    >
                      <td className="p-4 font-bold text-on-surface">
                        {row.region}
                      </td>
                      <td className="p-4 text-on-surface-variant whitespace-nowrap">
                        {row.term}
                      </td>
                      <td className="p-4 text-on-surface-variant leading-relaxed">
                        {row.detail}
                      </td>
                      <td className="p-4">
                        <code className="font-mono text-xs bg-surface-container-low rounded px-2 py-1 text-primary whitespace-nowrap">
                          {row.doc}
                        </code>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* ── Mid-page CTA ───────────────────────────────── */}
          <section className="py-10">
            <div className="rounded-3xl bg-primary p-7 sm:p-10 text-center">
              <Car className="w-8 h-8 text-yellow-300 mx-auto mb-3" />
              <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-white mb-2">
                Decode Your Chassis Number in Seconds
              </h2>
              <p className="text-white/80 text-sm sm:text-base mb-6 max-w-xl mx-auto">
                Free, instant car-type identification straight from the
                manufacturer&apos;s build record — make, model, year, body, and
                engine.
              </p>
              <div className="max-w-xl mx-auto bg-white rounded-2xl p-4 sm:p-5">
                <VinSearchForm size="lg" />
              </div>
            </div>
          </section>

          {/* ── Why match the chassis number ─────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">
              Always Match the Chassis Number Before You Buy
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
                <p>
                  The chassis number is a vehicle&apos;s permanent identity, so
                  it&apos;s the single best defence against fraud. A cloned or
                  &ldquo;ringed&rdquo; car wears the identity of a legitimate
                  vehicle to hide a stolen or write-off history — and the only
                  way to catch it is to decode the chassis number and check that
                  every copy matches.
                </p>
                <p>
                  Decode the number first to confirm the car type matches the
                  advert. A chassis number that decodes to a different model,
                  body, or year than the one in front of you is a stop-the-deal
                  red flag. Then verify the same number on the document, the
                  windscreen, the door jamb, and the engine bay all agree.
                </p>
                <p>
                  When the specification checks out, take the chassis number into
                  a full{" "}
                  <Link
                    href="/vin-check"
                    className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80"
                  >
                    vehicle history check
                  </Link>{" "}
                  to surface the records a decode alone can&apos;t — title brands,
                  odometer rollback, accident damage, and theft markers.
                </p>
              </div>
              <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Wrench className="w-5 h-5 text-primary" />
                  <h3 className="font-headline font-extrabold text-primary">
                    Chassis number red flags
                  </h3>
                </div>
                <ul className="space-y-2 text-sm text-on-surface">
                  {[
                    "Decoded car type doesn't match the advertised model or year",
                    "The number contains an I, O, or Q (never valid)",
                    "Document number differs from the number on the car",
                    "Windscreen, door jamb, and engine-bay numbers disagree",
                    "Plate looks re-riveted, scratched, or freshly painted",
                    "Fewer than 17 characters on a post-1981 vehicle",
                  ].map((reason) => (
                    <li key={reason} className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-5 rounded-xl bg-white p-4 border border-outline-variant">
                  <p className="text-xs font-bold text-on-surface mb-2">
                    Check a chassis number now:
                  </p>
                  <VinSearchForm size="sm" />
                </div>
              </div>
            </div>
          </section>

          {/* ── Internal links ─────────────────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              More Tools That Read Your Chassis Number
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
              Chassis Number Lookup — Frequently Asked Questions
            </h2>
            <p className="text-sm text-on-surface-variant mb-8">
              Direct answers to what chassis-number searchers ask most.
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
              <Zap className="w-3.5 h-3.5" /> Free · Instant · Worldwide
            </div>
            <h2 className="text-2xl sm:text-4xl font-headline font-extrabold text-primary mb-3">
              Look Up Any Car by Its Chassis Number
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl mx-auto mb-8">
              Enter a 17-character chassis number to identify the car type and
              specification, then unlock the full title, mileage, and accident
              history.
            </p>
            <div className="max-w-xl mx-auto bg-surface-container-low rounded-2xl p-5 border border-outline-variant">
              <VinSearchForm size="lg" />
            </div>
            <div className="mt-3 flex items-center justify-center gap-2 text-xs text-on-surface-variant">
              <Check className="w-3.5 h-3.5 text-green-500" strokeWidth={3} />
              No credit card · No sign-up · Free car type
            </div>
          </section>

          <RelatedChecks exclude="/chassis-number-lookup" />
        </div>
      </article>
    </>
  );
}
