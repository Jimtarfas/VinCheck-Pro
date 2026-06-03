import type { Metadata } from "next";
import Link from "next/link";
import {
  Check,
  Anchor,
  Search,
  MapPin,
  ChevronRight,
  Zap,
  BadgeCheck,
  Ship,
  Waves,
  ScanLine,
  ClipboardCheck,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import HinDecoder from "./HinDecoder";

const SITE = "https://www.carcheckervin.com";

export const metadata: Metadata = {
  title: "HIN Lookup — Free Boat Hull ID Decoder",
  description:
    "A boat's Hull Identification Number is its VIN. Decode the 12-character HIN to find the manufacturer code, hull serial, and build year. Free.",
  keywords: [
    "hin lookup",
    "hull identification number lookup",
    "boat vin lookup",
    "boat vin check",
    "hin decoder",
    "decode hin number",
    "boat hull number lookup",
    "free boat vin check",
    "hull id number lookup",
    "what is a hin number",
    "where is the hin on a boat",
    "boat serial number lookup",
    "uscg hin format",
    "watercraft vin lookup",
    "jet ski vin lookup",
    "pwc hin lookup",
    "boat manufacturer code lookup",
    "mic lookup boat",
    "check boat history by hin",
    "boat hin year decoder",
  ],
  alternates: { canonical: "/hin-lookup" },
  openGraph: {
    title: "HIN Lookup — Free Boat Hull Identification Number Decoder",
    description:
      "A boat's HIN is its VIN. Decode the 12-character Hull Identification Number free to find the manufacturer, serial, and build year. USCG format, instant, no sign-up.",
    url: `${SITE}/hin-lookup`,
    type: "article",
    siteName: "CarCheckerVIN",
    images: [
      {
        url: `${SITE}/hin-lookup/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "HIN Lookup — free boat hull identification number decoder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HIN Lookup — Free Boat Hull Identification Number Decoder",
    description:
      "Decode any 12-character boat HIN free — manufacturer code, hull serial, and build year. The boat equivalent of a VIN. Instant, no sign-up.",
    images: [`${SITE}/hin-lookup/opengraph-image`],
  },
  robots: { index: true, follow: true },
};

/* ── JSON-LD schemas ───────────────────────────────────────────── */

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "HIN Lookup — Boat Hull Identification Number Decoder",
  url: `${SITE}/hin-lookup`,
  applicationCategory: "AutomotiveApplication",
  operatingSystem: "All",
  description:
    "Free tool to decode a boat's 12-character Hull Identification Number (HIN) — the marine equivalent of a VIN. Returns the manufacturer identification code, hull serial number, and build/model year for any boat built since 1972.",
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
      name: "What is a HIN on a boat?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A HIN, or Hull Identification Number, is a 12-character code that uniquely identifies a boat — the marine equivalent of a car's VIN. The US Coast Guard has required a HIN on every boat manufactured or imported for sale in the United States since November 1, 1972. It encodes the manufacturer, a unique hull serial number, and the build date.",
      },
    },
    {
      "@type": "Question",
      name: "Is a HIN the same as a boat VIN?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Effectively yes. People search for a 'boat VIN,' but boats don't use the 17-character automotive VIN — they use a 12-character HIN that serves the same purpose: a permanent, unique identifier used for registration, titling, recall, and theft records. If someone refers to a boat's VIN, they mean its HIN.",
      },
    },
    {
      "@type": "Question",
      name: "Where is the HIN located on a boat?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The primary HIN is permanently affixed to the upper starboard (right) side of the transom — the flat rear of the boat — within two inches of the top. A duplicate HIN is also hidden in an unexposed location elsewhere on the hull. On a PWC or jet ski it's typically on the rear or the hull near the pump. It's also listed on the registration and title documents.",
      },
    },
    {
      "@type": "Question",
      name: "How do I read a 12-character HIN?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The first three characters are the Manufacturer Identification Code (MIC). Characters 4–8 are the hull serial number assigned by the builder. The final four characters encode the date. In the current straight-year format the 9th character is the month of build (A–L for January–December), the 10th is a year-of-build digit, and the 11th–12th are the model year.",
      },
    },
    {
      "@type": "Question",
      name: "What do the letters in a HIN date mean?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "In the build-date portion, months are encoded as letters A through L: A is January, B is February, and so on through L for December. So a HIN with 'H' in the month position was built in August. Our decoder translates the letter automatically.",
      },
    },
    {
      "@type": "Question",
      name: "Can I find the boat manufacturer from the HIN?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — the first three characters are the Manufacturer Identification Code (MIC), which the US Coast Guard assigns to each builder. Our tool isolates the MIC for you; to convert it to a company name, look it up in the official USCG MIC database, which we link directly from the result.",
      },
    },
    {
      "@type": "Question",
      name: "Why is my HIN not 12 characters?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Boats built before November 1, 1972 predate the federal HIN requirement and may have no HIN or a non-standard builder's number. Some imported or home-built boats also carry irregular numbers. A standard, decodable HIN is always exactly 12 characters; anything shorter or longer needs to be verified with the manufacturer or your state titling agency.",
      },
    },
    {
      "@type": "Question",
      name: "Does a HIN lookup show the boat's owner?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Owner identity is personal information protected by privacy law and is not returned by a HIN decode. What the HIN gives you is the boat's identity — manufacturer, serial, and build year — plus a starting point for registration, recall, and theft checks through the relevant marine authorities.",
      },
    },
    {
      "@type": "Question",
      name: "Can I check a boat's history with the HIN?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The HIN is the key used to look up a boat's title, registration, accident, and theft history through state agencies and the US Coast Guard. Decoding the HIN confirms the boat's identity and build year first; from there you can verify the same number matches the title and run a marine history report before buying.",
      },
    },
    {
      "@type": "Question",
      name: "Does a jet ski or PWC have a HIN?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Personal watercraft (jet skis, wave runners) follow the same US Coast Guard HIN rules as any other boat — a 12-character Hull Identification Number, usually on the rear of the hull. Our decoder reads a PWC HIN exactly the same way it reads a boat HIN.",
      },
    },
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Look Up a Boat by Its HIN (Hull Identification Number)",
  description:
    "Step-by-step guide to finding and decoding a boat's 12-character Hull Identification Number to identify the manufacturer, serial, and build year.",
  totalTime: "PT2M",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Find the HIN on the transom",
      text: "Look at the upper starboard (right) corner of the transom — the flat rear of the boat — within two inches of the top edge. The 12-character HIN is permanently stamped or plated there.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Copy all 12 characters",
      text: "Write the HIN down exactly. It is exactly 12 characters: a 3-character manufacturer code, a 5-character serial, and a 4-character date section.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Decode it instantly",
      text: "Enter the HIN into the decoder above. It splits out the manufacturer identification code (MIC), the hull serial number, and translates the build-date characters into a month and year.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Match it to the paperwork",
      text: "Confirm the decoded HIN matches the number on the registration and title, and that the hidden duplicate HIN on the hull agrees. A mismatch is a red flag for a re-numbered or stolen hull.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Run a history and theft check",
      text: "Use the verified HIN to check title status, recalls, and theft records through your state titling agency and the US Coast Guard before you buy.",
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
      name: "HIN Lookup",
      item: `${SITE}/hin-lookup`,
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
  url: `${SITE}/hin-lookup`,
};

/* ── Static UI data ────────────────────────────────────────────── */

const TRUST_STATS = [
  { icon: Anchor, value: "12", label: "characters decoded" },
  { icon: Ship, value: "Since 1972", label: "USCG HIN standard" },
  { icon: Zap, value: "Instant", label: "no sign-up needed" },
  { icon: BadgeCheck, value: "Free", label: "manufacturer & year" },
];

const HOW_TO_STEPS = [
  {
    step: "01",
    icon: MapPin,
    title: "Find the HIN on the transom",
    body: "The primary HIN is on the upper starboard (right) corner of the transom — the flat rear of the boat — within two inches of the top. A duplicate is hidden elsewhere on the hull, and the same number is on the registration and title.",
  },
  {
    step: "02",
    icon: ScanLine,
    title: "Read all 12 characters",
    body: "A standard HIN is exactly 12 characters: a 3-character manufacturer code, a 5-character hull serial, and a 4-character date section. Copy it precisely — a single wrong character points to a different hull.",
  },
  {
    step: "03",
    icon: Search,
    title: "Decode it instantly",
    body: "Enter the HIN above. The decoder isolates the Manufacturer Identification Code (MIC), the hull serial number, and translates the date characters into a build month and model year — free, in seconds.",
  },
  {
    step: "04",
    icon: ClipboardCheck,
    title: "Match it to the paperwork",
    body: "Confirm the decoded HIN matches the registration, the title, and the hidden duplicate HIN on the hull. Any mismatch between copies is an immediate red flag for a re-numbered or stolen boat.",
  },
  {
    step: "05",
    icon: ShieldCheck,
    title: "Run a history & theft check",
    body: "With the HIN verified, check title brands, recalls, and theft records through your state titling agency and the US Coast Guard before money changes hands.",
  },
];

/* The structure-of-a-HIN table — the unique-content asset that
   differentiates this page from a thin decoder. */
const HIN_SEGMENT_ROWS = [
  {
    pos: "1–3",
    seg: "MIC",
    detail:
      "Manufacturer Identification Code — three characters the US Coast Guard assigns to each boat builder. This is how the tool knows who built the hull.",
  },
  {
    pos: "4–8",
    seg: "Hull serial",
    detail:
      "A five-character serial number the manufacturer assigns to that specific hull. Unique within the builder's production run.",
  },
  {
    pos: "9",
    seg: "Month (current format)",
    detail:
      "In the straight-year format, the month of build encoded as a letter A–L (A = January through L = December).",
  },
  {
    pos: "10",
    seg: "Year digit",
    detail:
      "A single digit for the year the hull was built/certified in the straight-year format.",
  },
  {
    pos: "11–12",
    seg: "Model year",
    detail:
      "The two-digit model year of the boat. In the older model-year format these positions shift — the 11th character is the letter 'M' and the 12th is the month.",
  },
];

const FORMAT_ROWS = [
  {
    format: "Straight-Year Format",
    used: "Aug 1, 1984 → present",
    layout: "MIC · serial · month(A–L) · year-digit · model-year",
    example: "ABC12345 H8 05",
  },
  {
    format: "Model-Year Format",
    used: "Nov 1972 → Jul 1984",
    layout: "MIC · serial · model-year · 'M' · month(A–L)",
    example: "ABC12345 79 M H",
  },
];

const INTERNAL_LINKS = [
  {
    href: "/chassis-number-lookup",
    label: "Chassis Number / VIN Lookup",
    desc: "Decode the 17-character VIN on your boat trailer or tow vehicle.",
  },
  {
    href: "/vin-decoder",
    label: "VIN Decoder",
    desc: "Free decode for any car, truck, or trailer VIN — specs and origin.",
  },
  {
    href: "/stolen-vehicle-check",
    label: "Stolen Vehicle Check",
    desc: "Confirm a trailer or tow vehicle isn't flagged stolen before you buy.",
  },
  {
    href: "/motorcycle-vin-search",
    label: "Motorcycle VIN Search",
    desc: "Decode a motorcycle or off-road frame number for make and model.",
  },
  {
    href: "/recall-check",
    label: "Recall Check",
    desc: "Find open safety recalls on a tow vehicle by its VIN.",
  },
  {
    href: "/odometer-check",
    label: "Odometer Check",
    desc: "Verify the mileage trail on the tow vehicle pulling your boat.",
  },
  {
    href: "/market-value",
    label: "Market Value",
    desc: "Check the current value of the tow vehicle or trailer by VIN.",
  },
  {
    href: "/vin-check",
    label: "Full VIN History Check",
    desc: "Title, accident, and theft records for the vehicle towing your boat.",
  },
];

const FAQS = [
  {
    q: "What is a HIN on a boat?",
    a: "A HIN, or Hull Identification Number, is a 12-character code that uniquely identifies a boat — the marine equivalent of a car's VIN. The US Coast Guard has required a HIN on every boat manufactured or imported for sale in the United States since November 1, 1972. It encodes the manufacturer, a unique hull serial number, and the build date.",
  },
  {
    q: "Is a HIN the same as a boat VIN?",
    a: "Effectively yes. People search for a 'boat VIN,' but boats don't use the 17-character automotive VIN — they use a 12-character HIN that serves the same purpose: a permanent, unique identifier used for registration, titling, recall, and theft records. If someone refers to a boat's VIN, they mean its HIN.",
  },
  {
    q: "Where is the HIN located on a boat?",
    a: "The primary HIN is permanently affixed to the upper starboard (right) side of the transom — the flat rear of the boat — within two inches of the top. A duplicate HIN is also hidden in an unexposed location elsewhere on the hull. On a PWC or jet ski it's typically on the rear or the hull near the pump. It's also listed on the registration and title documents.",
  },
  {
    q: "How do I read a 12-character HIN?",
    a: "The first three characters are the Manufacturer Identification Code (MIC). Characters 4–8 are the hull serial number assigned by the builder. The final four characters encode the date. In the current straight-year format the 9th character is the month of build (A–L for January–December), the 10th is a year-of-build digit, and the 11th–12th are the model year.",
  },
  {
    q: "What do the letters in a HIN date mean?",
    a: "In the build-date portion, months are encoded as letters A through L: A is January, B is February, and so on through L for December. So a HIN with 'H' in the month position was built in August. Our decoder translates the letter automatically.",
  },
  {
    q: "Can I find the boat manufacturer from the HIN?",
    a: "Yes — the first three characters are the Manufacturer Identification Code (MIC), which the US Coast Guard assigns to each builder. Our tool isolates the MIC for you; to convert it to a company name, look it up in the official USCG MIC database, which we link directly from the result.",
  },
  {
    q: "Why is my HIN not 12 characters?",
    a: "Boats built before November 1, 1972 predate the federal HIN requirement and may have no HIN or a non-standard builder's number. Some imported or home-built boats also carry irregular numbers. A standard, decodable HIN is always exactly 12 characters; anything shorter or longer needs to be verified with the manufacturer or your state titling agency.",
  },
  {
    q: "Does a HIN lookup show the boat's owner?",
    a: "No. Owner identity is personal information protected by privacy law and is not returned by a HIN decode. What the HIN gives you is the boat's identity — manufacturer, serial, and build year — plus a starting point for registration, recall, and theft checks through the relevant marine authorities.",
  },
  {
    q: "Can I check a boat's history with the HIN?",
    a: "The HIN is the key used to look up a boat's title, registration, accident, and theft history through state agencies and the US Coast Guard. Decoding the HIN confirms the boat's identity and build year first; from there you can verify the same number matches the title and run a marine history report before buying.",
  },
  {
    q: "Does a jet ski or PWC have a HIN?",
    a: "Yes. Personal watercraft (jet skis, wave runners) follow the same US Coast Guard HIN rules as any other boat — a 12-character Hull Identification Number, usually on the rear of the hull. Our decoder reads a PWC HIN exactly the same way it reads a boat HIN.",
  },
];

/* ── Page ──────────────────────────────────────────────────────── */

export default function HinLookupPage() {
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
                { label: "HIN Lookup" },
              ]}
              onDark
            />

            <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
              <Waves className="w-4 h-4" /> A Boat&apos;s HIN = Its VIN
              &nbsp;·&nbsp; USCG Standard
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-headline font-extrabold leading-tight mb-4">
              HIN Lookup —{" "}
              <span style={{ color: "var(--color-secondary-container)" }}>
                Decode Any Boat&apos;s Hull Number
              </span>
            </h1>

            <p className="speakable-intro text-base sm:text-xl text-white/85 max-w-3xl mb-8 leading-relaxed">
              A boat&apos;s Hull Identification Number <em>is</em> its VIN. Enter
              the 12-character HIN from the transom to break out the
              manufacturer code, hull serial, and build year instantly. The
              marine equivalent of a VIN decode — free, no sign-up.
            </p>

            <HinDecoder />

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
          {/* ── HIN = boat VIN (the core answer) ───────────── */}
          <section className="py-12 sm:py-16">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              HIN vs &ldquo;Boat VIN&rdquo; — Same Idea, Different Code
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl leading-relaxed">
              Searchers ask for a &ldquo;boat VIN&rdquo; every day. Boats
              don&apos;t carry the 17-character automotive VIN — they carry a{" "}
              <strong>12-character Hull Identification Number (HIN)</strong> that
              does the exact same job: a permanent, unique identity used for
              titling, registration, recalls, and theft records.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5 sm:p-6">
                <div className="text-[11px] font-black uppercase tracking-wider text-on-surface-variant mb-2">
                  Boat &ldquo;HIN&rdquo;
                </div>
                <p className="text-lg font-headline font-extrabold text-on-surface mb-3">
                  12 characters · on the transom
                </p>
                <ul className="space-y-2 text-sm text-on-surface-variant">
                  <li className="flex gap-2">
                    <span>·</span>
                    <span>Required by the US Coast Guard since Nov 1, 1972.</span>
                  </li>
                  <li className="flex gap-2">
                    <span>·</span>
                    <span>MIC + hull serial + build-date characters.</span>
                  </li>
                  <li className="flex gap-2">
                    <span>·</span>
                    <span>Used to title, register, and trace any boat or PWC.</span>
                  </li>
                </ul>
              </div>
              <div className="rounded-2xl border border-primary/30 bg-primary/5 p-5 sm:p-6">
                <div className="text-[11px] font-black uppercase tracking-wider text-primary mb-2">
                  Car &ldquo;VIN&rdquo;
                </div>
                <p className="text-lg font-headline font-extrabold text-primary mb-3">
                  17 characters · on the dash &amp; door
                </p>
                <ul className="space-y-2 text-sm text-on-surface-variant">
                  <li className="flex gap-2">
                    <span>·</span>
                    <span>Vehicle Identification Number for cars and trucks.</span>
                  </li>
                  <li className="flex gap-2">
                    <span>·</span>
                    <span>Same purpose — permanent, unique identity.</span>
                  </li>
                  <li className="flex gap-2">
                    <span>·</span>
                    <span>
                      Your boat <em>trailer</em> has a 17-character VIN, not a HIN.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-6 rounded-2xl bg-secondary-container/40 border border-outline-variant p-5 sm:p-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-on-secondary-container flex-shrink-0 mt-0.5" />
                <p className="text-sm text-on-surface leading-relaxed">
                  <strong className="text-on-surface">Quick test:</strong> count
                  the characters. Exactly <strong>12</strong> means it&apos;s a
                  boat HIN and the decoder above will read it. If it&apos;s{" "}
                  <strong>17</strong>, you&apos;re looking at the VIN on the boat
                  trailer or tow vehicle — use the{" "}
                  <Link
                    href="/chassis-number-lookup"
                    className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80"
                  >
                    VIN lookup
                  </Link>{" "}
                  instead.
                </p>
              </div>
            </div>
          </section>

          {/* ── How to look up a boat by HIN ────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              How to Look Up a Boat by Its HIN — Step by Step
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl">
              Five steps from &ldquo;where is it?&rdquo; to a full hull
              identification. Works for powerboats, sailboats, and personal
              watercraft with a standard 12-character HIN.
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

          {/* ── What the 12 characters mean ──────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              What Each Part of a HIN Means
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl">
              A 12-character HIN isn&apos;t random — it&apos;s a structured code.
              Knowing the segments tells you exactly what the decoder is reading.
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
                  {HIN_SEGMENT_ROWS.map((row) => (
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
          </section>

          {/* ── The two HIN formats (unique asset) ───────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              The Two HIN Date Formats
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl">
              The last four characters encode the date two different ways
              depending on when the boat was built. Our decoder detects the
              format automatically — here&apos;s how to read each by hand.
            </p>
            <div className="overflow-x-auto rounded-2xl border border-outline-variant">
              <table className="w-full border-collapse min-w-[680px] text-sm">
                <thead className="bg-surface-container-low">
                  <tr>
                    <th className="p-4 text-left font-headline font-extrabold text-primary">
                      Format
                    </th>
                    <th className="p-4 text-left font-headline font-extrabold text-primary">
                      Used
                    </th>
                    <th className="p-4 text-left font-headline font-extrabold text-primary">
                      Date Layout
                    </th>
                    <th className="p-4 text-left font-headline font-extrabold text-primary">
                      Example
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {FORMAT_ROWS.map((row) => (
                    <tr
                      key={row.format}
                      className="border-t border-outline-variant/60 align-top"
                    >
                      <td className="p-4 font-bold text-on-surface whitespace-nowrap">
                        {row.format}
                      </td>
                      <td className="p-4 text-on-surface-variant whitespace-nowrap">
                        {row.used}
                      </td>
                      <td className="p-4 text-on-surface-variant leading-relaxed">
                        {row.layout}
                      </td>
                      <td className="p-4">
                        <code className="font-mono text-xs bg-surface-container-low rounded px-2 py-1 text-primary whitespace-nowrap">
                          {row.example}
                        </code>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-xs text-on-surface-variant">
              Month letters run <strong>A–L</strong> for January through
              December in both formats.
            </p>
          </section>

          {/* ── Mid-page CTA ───────────────────────────────── */}
          <section className="py-10">
            <div className="rounded-3xl bg-primary p-7 sm:p-10 text-center">
              <Anchor className="w-8 h-8 text-yellow-300 mx-auto mb-3" />
              <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-white mb-2">
                Decode Your Boat&apos;s HIN in Seconds
              </h2>
              <p className="text-white/80 text-sm sm:text-base mb-6 max-w-xl mx-auto">
                Free, instant hull identification — manufacturer code, serial,
                and build year straight from the 12-character HIN.
              </p>
              <div className="max-w-xl mx-auto">
                <HinDecoder />
              </div>
            </div>
          </section>

          {/* ── Why match the HIN ─────────────────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">
              Always Match the HIN Before You Buy a Boat
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
                <p>
                  The HIN is a boat&apos;s permanent identity, so it&apos;s the
                  single best defence against buying a stolen or re-titled hull.
                  A re-numbered boat wears the identity of a legitimate vessel to
                  hide a theft or total-loss history — and the way to catch it is
                  to decode the HIN and confirm every copy matches.
                </p>
                <p>
                  Decode the number first to confirm the manufacturer and build
                  year line up with the listing. Then verify the same HIN appears
                  identically on the transom, the hidden duplicate on the hull,
                  the registration, and the title.
                </p>
                <p>
                  When the identity checks out, take the HIN to your state
                  titling agency and the US Coast Guard to confirm title status,
                  recalls, and theft records before any money changes hands.
                </p>
              </div>
              <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Ship className="w-5 h-5 text-primary" />
                  <h3 className="font-headline font-extrabold text-primary">
                    HIN red flags
                  </h3>
                </div>
                <ul className="space-y-2 text-sm text-on-surface">
                  {[
                    "Decoded manufacturer or year doesn't match the listing",
                    "Transom HIN differs from the hidden duplicate on the hull",
                    "HIN on the boat doesn't match the title or registration",
                    "Plate or stamping looks ground down, re-glued, or repainted",
                    "Fewer or more than 12 characters on a post-1972 boat",
                    "Seller can't or won't show you the transom HIN",
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
              Trailer or Tow Vehicle? Decode Its VIN Too
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-7">
              Your boat has a HIN — but the trailer and the truck towing it carry
              17-character VINs. These tools cover the rest of the rig.
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
              HIN Lookup — Frequently Asked Questions
            </h2>
            <p className="text-sm text-on-surface-variant mb-8">
              Direct answers to what boat buyers and owners ask most.
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
              <Zap className="w-3.5 h-3.5" /> Free · Instant · USCG Format
            </div>
            <h2 className="text-2xl sm:text-4xl font-headline font-extrabold text-primary mb-3">
              Decode Any Boat by Its Hull Number
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl mx-auto mb-8">
              Enter a 12-character HIN to identify the manufacturer, hull serial,
              and build year — the marine equivalent of a free VIN decode.
            </p>
            <div className="max-w-xl mx-auto">
              <HinDecoder />
            </div>
            <div className="mt-3 flex items-center justify-center gap-2 text-xs text-on-surface-variant">
              <Check className="w-3.5 h-3.5 text-green-500" strokeWidth={3} />
              No credit card · No sign-up · Free hull identification
            </div>
          </section>

          <RelatedChecks exclude="/hin-lookup" />
        </div>
      </article>
    </>
  );
}
