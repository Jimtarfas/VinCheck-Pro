import type { Metadata } from "next";
import Link from "next/link";
import {
  Check,
  Search,
  Factory,
  ChevronRight,
  Lock,
  Zap,
  BadgeCheck,
  Sparkles,
  Palette,
  Cog,
  MapPin,
  Award,
  ScrollText,
  ClipboardList,
  Tag,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";

export const metadata: Metadata = {
  title:
    "Ford Build Sheet by VIN — Door Data Plate, DSO & Marti Report Codes (Free)",
  description:
    "Look up a Ford, Lincoln, or Mercury build sheet by VIN, free. Decode the door data plate, DSO district code, axle and transmission tags, paint and trim codes, and learn how the Marti Report reconstructs the original factory order for 1967-up Ford vehicles.",
  keywords: [
    "Ford build sheet by VIN",
    "Ford door data plate decode",
    "Ford DSO code",
    "Marti Report",
    "Ford warranty plate decode",
    "Mustang build sheet",
    "Ford paint and trim code",
    "Ford axle code",
    "Lincoln Mercury build sheet",
    "Ford VIN decoder",
    "Ford factory options by VIN",
    "Ford rotunda buck tag",
    "decode Ford VIN options",
    "Ford build record",
  ],
  alternates: { canonical: "/ford-build-sheet" },
  openGraph: {
    title: "Ford Build Sheet by VIN — Door Data Plate & Marti Report Codes",
    description:
      "Decode a Ford build sheet by VIN: door data plate, DSO, axle and transmission codes, paint and trim, and the Marti Report for 1967-up vehicles.",
    url: `${SITE}/ford-build-sheet`,
    type: "article",
    siteName: "CarCheckerVIN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ford Build Sheet by VIN — Door Data Plate & Marti Report Codes",
    description:
      "Decode a Ford build sheet by VIN: door data plate, DSO, axle/transmission codes, paint and trim, and the Marti Report.",
  },
  robots: { index: true, follow: true },
};

/* ── JSON-LD schemas ───────────────────────────────────────────── */

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Ford Build Sheet by VIN",
  url: `${SITE}/ford-build-sheet`,
  applicationCategory: "AutomotiveApplication",
  operatingSystem: "All",
  description:
    "Retrieve a Ford, Lincoln, or Mercury build record using its VIN. Decodes the door data plate, DSO district code, axle and transmission tags, paint and trim codes, and assembly plant data, and explains how the Marti Report reconstructs the original factory order.",
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
  headline: "Ford Build Sheet by VIN — Door Data Plate, DSO & Marti Report",
  description:
    "How to read a Ford build sheet by VIN: the door data plate, DSO district code, axle and transmission codes, paint and trim, and the Marti Report that reconstructs the original factory order for 1967-up Ford vehicles.",
  author: ORG_AUTHOR,
  publisher: {
    "@type": "Organization",
    name: "CarCheckerVIN",
    url: SITE,
    logo: { "@type": "ImageObject", url: `${SITE}/logo.png` },
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${SITE}/ford-build-sheet`,
  },
  datePublished: "2026-06-12",
  dateModified: "2026-06-12",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is a Ford build sheet?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A Ford build sheet is the factory production record describing how a single Ford, Lincoln, or Mercury vehicle was ordered and assembled. On the car itself, Ford stamped much of this data onto the door data plate (also called the warranty plate or rating plate) and onto component tags. For 1967-and-newer Ford vehicles, the most complete reconstruction is the Marti Report, generated from Ford's original production database. Together these sources give the paint and trim codes, axle and transmission codes, the DSO district code, and the assembly plant.",
      },
    },
    {
      "@type": "Question",
      name: "How do I read a Ford door data plate?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Ford door data plate is a metal tag on the driver's door or door jamb. It encodes the vehicle in short alphanumeric fields: body code, exterior paint code, interior trim code, the consecutive rear-axle ratio code, the transmission code, and the DSO (District Sales Office) code that shows where the car was originally shipped. Decode each field against a Ford reference for that year and model. Pre-1980 plates use Ford's own format, while a VIN lookup is the fastest way to confirm the year, plant, and body style before reading the rest.",
      },
    },
    {
      "@type": "Question",
      name: "What is a Marti Report and which Fords does it cover?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Marti Report is an authenticated build record produced by Marti Auto Works, which licenses Ford's original production database. It reconstructs the factory order for Ford, Lincoln, and Mercury vehicles built from 1967 onward. It lists the original options, paint and trim, DSO, production and sales dates, and how rare the configuration was. It is widely accepted by collectors and judges as the authoritative Ford build document. Vehicles built before 1967 are not in that database and rely on the door data plate and component tags instead.",
      },
    },
    {
      "@type": "Question",
      name: "What does the DSO code mean on a Ford?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "DSO stands for District Sales Office. On a Ford door data plate the DSO field identifies the district the car was originally ordered through and shipped to, such as a specific regional sales district or an export destination. A special two-part DSO number can also flag a special-order or fleet vehicle. The DSO helps verify a car's documented origin and is one of the fields collectors cross-check against the Marti Report.",
      },
    },
    {
      "@type": "Question",
      name: "How do I decode Ford paint and trim codes by VIN?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ford paint and interior trim codes appear on the door data plate and in the build record. Enter the VIN to confirm the year, model, and assembly plant, then read the paint code (exterior color) and trim code (interior color and material) from the data plate or the Marti Report. Ford reused some letter codes across different years, so always decode against a reference for the exact model year. The VIN's tenth character fixes that year for you.",
      },
    },
    {
      "@type": "Question",
      name: "Can I get a build sheet for a Mustang by VIN?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The Mustang is one of the best-documented Ford vehicles. Enter the VIN to decode the year, plant, and body style, read the door data plate for paint, trim, axle, transmission, and DSO codes, and for 1967-up cars order a Marti Report for the authenticated original order. This combination is what collectors use to confirm a numbers-matching Mustang and separate a documented car from a tribute or clone.",
      },
    },
  ],
};

const FAQS = faqSchema.mainEntity.map((q) => ({
  question: q.name,
  answer: q.acceptedAnswer.text,
}));

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Read a Ford Build Sheet by VIN",
  description:
    "Decode a Ford, Lincoln, or Mercury build record from the VIN, the door data plate, and the Marti Report.",
  totalTime: "PT3M",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Confirm the VIN and model year",
      text: "Read the 17-character VIN (or the shorter pre-1981 Ford VIN) from the dash, door jamb, or title. The year character anchors which Ford reference tables apply.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Read the door data plate",
      text: "Find the metal warranty/data plate on the driver's door or jamb. Note the body, paint, trim, axle, transmission, and DSO codes.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Decode each field",
      text: "Match every code against a Ford reference for that exact model year: paint and trim, the rear-axle ratio, the transmission, and the DSO district.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Order a Marti Report for 1967-up cars",
      text: "For 1967-and-newer Fords, request a Marti Report from Marti Auto Works for the authenticated original factory order and rarity data.",
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
      name: "Ford Build Sheet",
      item: `${SITE}/ford-build-sheet`,
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
  url: `${SITE}/ford-build-sheet`,
};

/* ── Static UI data ────────────────────────────────────────────── */

const TRUST_STATS = [
  { icon: Tag, value: "Data Plate", label: "door tag decode" },
  { icon: ScrollText, value: "1967+", label: "Marti Report era" },
  { icon: Factory, value: "FoMoCo", label: "Ford · Lincoln · Mercury" },
  { icon: BadgeCheck, value: "Free", label: "VIN lookup, no sign-up" },
];

const HOW_STEPS = [
  {
    icon: Search,
    tag: "Step 1",
    title: "Enter the Ford VIN",
    body: "Type the VIN from the dash, door jamb, title, or registration. It fixes the model year, assembly plant, and body style before you read the rest.",
  },
  {
    icon: Tag,
    tag: "Step 2",
    title: "We tie it to the data plate",
    body: "The VIN tells you which Ford reference applies so the door data plate's paint, trim, axle, transmission, and DSO codes decode correctly.",
  },
  {
    icon: ScrollText,
    tag: "Step 3",
    title: "Reconstruct the order",
    body: "For 1967-up cars the Marti Report rebuilds the full factory order from Ford's database: options, dates, DSO, and how rare the build was.",
  },
];

const CONTENTS = [
  {
    icon: Tag,
    title: "Door data plate codes",
    body: "Body, paint, and trim codes stamped on the driver's-door warranty plate, Ford's on-the-car build summary.",
  },
  {
    icon: MapPin,
    title: "DSO district code",
    body: "The District Sales Office field showing where the car was ordered and shipped, and whether it was a special order.",
  },
  {
    icon: Cog,
    title: "Axle & transmission codes",
    body: "The consecutive rear-axle ratio code and transmission code, key to verifying a numbers-matching drivetrain.",
  },
  {
    icon: Palette,
    title: "Paint & interior trim",
    body: "Ford exterior paint codes and interior trim codes for exact, year-correct color and material matching.",
  },
  {
    icon: ScrollText,
    title: "Marti Report order",
    body: "For 1967-up Fords, the authenticated original order: options, production and sales dates, and rarity numbers.",
  },
  {
    icon: Factory,
    title: "Assembly plant & dates",
    body: "The Ford plant code and build date that confirm where and when the car ran down the line.",
  },
];

const COLLECTOR_CHECKLIST = [
  "Confirm the door data plate matches the VIN year and plant",
  "Decode the axle and transmission codes for numbers-matching",
  "Cross-check the DSO against a Marti Report",
  "Verify paint and trim codes against the year reference",
  "Document rarity for a 1967-up Marti-reported car",
  "Pair with a VIN history check for the full story",
];

const PLATE_FIELDS = [
  "Body / body-style code",
  "Exterior paint code",
  "Interior trim code",
  "Consecutive rear-axle ratio code",
  "Transmission code",
  "DSO district / special-order code",
];

const INTERNAL_LINKS = [
  {
    href: "/build-sheet",
    label: "Build Sheet by VIN (All Makes)",
    desc: "The general factory build-sheet lookup covering every manufacturer, not just Ford.",
  },
  {
    href: "/window-sticker",
    label: "Window Sticker Maker",
    desc: "The consumer-facing Monroney view with options in plain language and original MSRP.",
  },
  {
    href: "/vin-decoder",
    label: "VIN Decoder",
    desc: "Decode the Ford VIN to model year, plant, and production sequence.",
  },
  {
    href: "/paint-code-lookup",
    label: "Paint Code Lookup",
    desc: "Confirm the exact Ford factory paint code for touch-up or restoration matching.",
  },
  {
    href: "/vin-check",
    label: "Full VIN History Check",
    desc: "Title, accident, odometer, and recall records to pair with the factory origin.",
  },
  {
    href: "/classic-car-vin",
    label: "Classic Car VIN Decoder",
    desc: "For pre-1981 Fords with shorter VINs and era-specific plate formats.",
  },
];

/* ── Page ──────────────────────────────────────────────────────── */

export default function FordBuildSheetPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
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
                { label: "Ford Build Sheet" },
              ]}
              onDark
            />

            <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
              <ClipboardList className="w-4 h-4" /> Ford · Lincoln · Mercury
              &nbsp;·&nbsp; Door Data Plate &amp; Marti Report
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-headline font-extrabold leading-tight mb-4">
              Ford Build Sheet by VIN —{" "}
              <span style={{ color: "var(--color-secondary-container)" }}>
                Decode the Door Data Plate
              </span>
            </h1>

            <p className="speakable-intro text-base sm:text-xl text-white/85 max-w-3xl mb-8 leading-relaxed">
              Ford recorded each car&apos;s build on the door data plate and in
              its production database: paint and trim codes, the rear-axle and
              transmission codes, and the DSO district it shipped to. For
              1967-and-newer Ford, Lincoln, and Mercury vehicles, the Marti
              Report rebuilds the original factory order in full. Start with the
              VIN to lock in the year and plant. It&apos;s free.
            </p>

            <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-xl">
              <h2 className="text-base sm:text-lg font-headline font-extrabold text-primary mb-1">
                Look Up a Ford Build Sheet by VIN
              </h2>
              <p className="text-xs sm:text-sm text-on-surface-variant mb-4">
                Enter the VIN and we&apos;ll fix the year, plant, and body so the
                data plate and build codes decode correctly
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
          {/* ── How the lookup works ─────────────────────────── */}
          <section className="py-12 sm:py-16">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              How a Ford Build Sheet Lookup Works
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl">
              Ford split the build record between the car and the factory. The
              VIN points you to the right reference; the data plate and Marti
              Report fill in the rest.
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

          {/* ── What is a Ford build sheet ───────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              What Counts as a Ford Build Sheet?
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl leading-relaxed">
              Ford never shipped a single tidy document called a build sheet.
              The factory record lives across three sources, and a real Ford
              verification reads all three together.
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
                <p>
                  First is the{" "}
                  <strong className="text-on-surface">door data plate</strong>,
                  the metal warranty or rating plate riveted to the driver&apos;s
                  door or jamb. In a few short fields it stamps the body style,
                  paint and trim codes, the rear-axle ratio, the transmission,
                  and the DSO district. It is the build summary that travels on
                  the car.
                </p>
                <p>
                  Second are the{" "}
                  <strong className="text-on-surface">component tags</strong>.
                  Buck tags, engine and axle stampings, and casting dates let
                  restorers confirm individual parts are date-correct and
                  original to the car.
                </p>
                <p>
                  Third, for 1967-and-newer cars, is the{" "}
                  <strong className="text-on-surface">Marti Report</strong>,
                  reconstructed from Ford&apos;s own production database. It is
                  the closest thing to a printed factory order and the document
                  collectors treat as authoritative.
                </p>
              </div>
              <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Tag className="w-5 h-5 text-primary" />
                  <h3 className="font-headline font-extrabold text-primary">
                    On the door data plate
                  </h3>
                </div>
                <ul className="space-y-2 text-sm text-on-surface">
                  {PLATE_FIELDS.map((tip) => (
                    <li key={tip} className="flex items-start gap-2">
                      <Check
                        className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5"
                        strokeWidth={3}
                      />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs text-on-surface-variant leading-relaxed">
                  Each field is a short code. Decode it against a Ford reference
                  for the exact model year the VIN gives you, since Ford reused
                  codes across years.
                </p>
              </div>
            </div>
          </section>

          {/* ── What the build sheet contains ────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              What a Ford Build Record Shows
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">
              Between the data plate and the Marti Report, a Ford build record
              documents the car at the component level, far more than the
              window sticker ever showed the buyer.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {CONTENTS.map((c) => {
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

          {/* ── Marti Report deep-dive ───────────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              The Marti Report: Ford&apos;s Authenticated Build Record
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl leading-relaxed">
              If your Ford was built in 1967 or later, this is the document that
              settles arguments. Here is what makes it the Ford standard.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5 sm:p-6">
                <div className="text-[11px] font-black uppercase tracking-wider text-on-surface-variant mb-2">
                  Door Data Plate
                </div>
                <p className="text-lg font-headline font-extrabold text-on-surface mb-3">
                  What&apos;s on the car
                </p>
                <ul className="space-y-2 text-sm text-on-surface-variant">
                  <li className="flex gap-2">
                    <span>·</span>
                    <span>Stamped at the factory and physically on the car.</span>
                  </li>
                  <li className="flex gap-2">
                    <span>·</span>
                    <span>Body, paint, trim, axle, transmission, DSO codes.</span>
                  </li>
                  <li className="flex gap-2">
                    <span>·</span>
                    <span>Can be swapped or restamped, so verify against records.</span>
                  </li>
                  <li className="flex gap-2">
                    <span>·</span>
                    <span>Covers every era, including pre-1967 Fords.</span>
                  </li>
                </ul>
              </div>
              <div className="rounded-2xl border border-primary/30 bg-primary/5 p-5 sm:p-6">
                <div className="text-[11px] font-black uppercase tracking-wider text-primary mb-2">
                  Marti Report
                </div>
                <p className="text-lg font-headline font-extrabold text-primary mb-3">
                  What Ford&apos;s database holds
                </p>
                <ul className="space-y-2 text-sm text-on-surface-variant">
                  <li className="flex gap-2">
                    <span>·</span>
                    <span>Licensed from Ford&apos;s original production data.</span>
                  </li>
                  <li className="flex gap-2">
                    <span>·</span>
                    <span>Full option list, production and sales dates, DSO.</span>
                  </li>
                  <li className="flex gap-2">
                    <span>·</span>
                    <span>Rarity figures: how many were built like yours.</span>
                  </li>
                  <li className="flex gap-2">
                    <span>·</span>
                    <span>1967-up Ford, Lincoln, and Mercury only.</span>
                  </li>
                </ul>
              </div>
            </div>
            <p className="mt-5 text-xs text-on-surface-variant">
              Want a make-agnostic factory record instead? Use the general{" "}
              <Link
                href="/build-sheet"
                className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80"
              >
                build sheet by VIN
              </Link>{" "}
              for any manufacturer.
            </p>
          </section>

          {/* ── Mid-page CTA ───────────────────────────────── */}
          <section className="py-10">
            <div className="rounded-3xl bg-primary p-7 sm:p-10 text-center">
              <Sparkles className="w-8 h-8 text-yellow-300 mx-auto mb-3" />
              <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-white mb-2">
                Decode Your Ford&apos;s Original Build
              </h2>
              <p className="text-white/80 text-sm sm:text-base mb-6 max-w-xl mx-auto">
                Enter the VIN to lock in the year, plant, and body, then read
                the door data plate and, for 1967-up cars, line it up with the
                Marti Report. Free, in seconds.
              </p>
              <div className="max-w-xl mx-auto bg-white rounded-2xl p-4 sm:p-5">
                <VinSearchForm size="lg" />
              </div>
            </div>
          </section>

          {/* ── Collectors & restorers ─────────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">
              Why Ford Collectors Verify the Build
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
                <p>
                  In the Ford world, documentation drives value. A{" "}
                  <strong className="text-on-surface">
                    Marti-reported, numbers-matching
                  </strong>{" "}
                  Mustang, Torino, or Galaxie sells for far more than a
                  superficially identical car with no paper trail. A verified
                  rare DSO or option can move the price dramatically.
                </p>
                <p>
                  Restorers lean on the axle, transmission, paint, and trim codes
                  to source year-correct parts. A 1969 Mach 1 with a specific
                  axle code and DSO needs different components than a base
                  Mustang, so the data plate and Marti Report name the right
                  specs for judging-ready work.
                </p>
                <p>
                  Pair the build record with a{" "}
                  <Link
                    href="/salvage-title-check"
                    className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80"
                  >
                    salvage title check
                  </Link>{" "}
                  and an{" "}
                  <Link
                    href="/odometer-check"
                    className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80"
                  >
                    odometer check
                  </Link>{" "}
                  to confirm both the factory order and what happened since.
                </p>
              </div>
              <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Award className="w-5 h-5 text-primary" />
                  <h3 className="font-headline font-extrabold text-primary">
                    Ford verification checklist
                  </h3>
                </div>
                <ul className="space-y-2 text-sm text-on-surface">
                  {COLLECTOR_CHECKLIST.map((tip) => (
                    <li key={tip} className="flex items-start gap-2">
                      <Check
                        className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5"
                        strokeWidth={3}
                      />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-5 rounded-xl bg-white p-4 border border-outline-variant">
                  <p className="text-xs font-bold text-on-surface mb-2">
                    Start the Ford build lookup by VIN:
                  </p>
                  <VinSearchForm size="sm" />
                </div>
              </div>
            </div>
          </section>

          {/* ── VIN + data plate ───────────────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              The Ford VIN, the Plate, and the Database
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">
              The VIN tells you who, where, and when. The data plate adds the
              codes. Ford&apos;s database, through the Marti Report, completes
              the original order.
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
                <p>
                  A modern 17-character Ford VIN encodes the World Manufacturer
                  Identifier, the descriptor section, a check digit, the model
                  year, the assembly plant, and the sequential production number.
                  Pre-1981 Fords use a shorter VIN with its own plant and body
                  fields. Decode those with our{" "}
                  <Link
                    href="/classic-car-vin"
                    className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80"
                  >
                    classic car VIN decoder
                  </Link>
                  .
                </p>
                <p>
                  What the VIN does not carry is the option list. That has always
                  lived on the data plate and in Ford&apos;s production records,
                  which is exactly why the door tag and the Marti Report exist.
                  Decode the raw VIN first with our{" "}
                  <Link
                    href="/vin-decoder"
                    className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80"
                  >
                    VIN decoder
                  </Link>
                  .
                </p>
              </div>
              <div className="rounded-2xl bg-secondary-container/40 border border-outline-variant p-6">
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="w-5 h-5 text-on-secondary-container" />
                  <h3 className="font-headline font-extrabold text-on-secondary-container">
                    Where to find Ford build data on the car
                  </h3>
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm text-on-surface">
                  {[
                    "Driver's-door data / warranty plate",
                    "Door jamb VIN sticker",
                    "Engine block casting and stamping",
                    "Rear-axle housing tag",
                    "Transmission code tag",
                    "Buck tag (where it survives)",
                  ].map((spot) => (
                    <li key={spot} className="flex items-start gap-2">
                      <Check
                        className="w-4 h-4 text-primary flex-shrink-0 mt-0.5"
                        strokeWidth={3}
                      />
                      <span>{spot}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs text-on-surface-variant leading-relaxed">
                  Plates can be reproduced and parts can be swapped, so always
                  cross-check the codes against the VIN and, for 1967-up cars,
                  the Marti Report.
                </p>
              </div>
            </div>
          </section>

          {/* ── Internal links ─────────────────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              More VIN Tools for Ford Owners
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-7">
              The build record is the starting point. These checks complete the
              picture on any Ford, Lincoln, or Mercury.
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
              Ford Build Sheet: Frequently Asked Questions
            </h2>
            <p className="text-sm text-on-surface-variant mb-8">
              The questions Ford owners and collectors ask most about door data
              plates and Marti Reports.
            </p>
            <div className="space-y-3">
              {FAQS.map((f) => (
                <details
                  key={f.question}
                  className="group rounded-2xl border border-outline-variant bg-surface p-4 sm:p-5 [&_summary::-webkit-details-marker]:hidden"
                >
                  <summary className="flex items-start justify-between gap-4 cursor-pointer list-none">
                    <span className="text-sm sm:text-base font-headline font-extrabold text-primary pr-2">
                      {f.question}
                    </span>
                    <span className="flex-shrink-0 mt-0.5 text-primary text-xl font-light group-open:rotate-45 transition-transform">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                    {f.answer}
                  </p>
                </details>
              ))}
            </div>
          </section>

          {/* ── Bottom CTA ─────────────────────────────────── */}
          <section className="py-14 sm:py-20 text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-xs font-black uppercase tracking-wider mb-4">
              <Zap className="w-3.5 h-3.5" /> Free · Instant · Ford Build Codes
            </div>
            <h2 className="text-2xl sm:text-4xl font-headline font-extrabold text-primary mb-3">
              Look Up a Ford Build Sheet by VIN
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl mx-auto mb-8">
              Enter the VIN to anchor the year and plant, then decode the door
              data plate&apos;s paint, trim, axle, transmission, and DSO codes.
            </p>
            <div className="max-w-xl mx-auto bg-surface-container-low rounded-2xl p-5 border border-outline-variant">
              <VinSearchForm size="lg" />
            </div>
            <div className="mt-3 flex items-center justify-center gap-2 text-xs text-on-surface-variant">
              <Check className="w-3.5 h-3.5 text-green-500" strokeWidth={3} />
              No credit card · No sign-up · Free
            </div>
          </section>

          <RelatedChecks exclude="/build-sheet" />
        </div>
      </article>
    </>
  );
}
