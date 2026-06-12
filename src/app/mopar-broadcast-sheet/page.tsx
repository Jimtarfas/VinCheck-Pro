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
    "Mopar Broadcast Sheet by VIN — Fender Tag & Build Codes (Dodge, Plymouth, Chrysler)",
  description:
    "Look up a Mopar broadcast sheet by VIN, free. Decode the fender tag, SO and sales codes, paint and trim codes, and the original broadcast sheet for Dodge, Plymouth, and Chrysler, plus how the Chrysler registry and build records authenticate a numbers-matching car.",
  keywords: [
    "Mopar broadcast sheet by VIN",
    "Dodge fender tag decode",
    "Plymouth build sheet",
    "Chrysler build record",
    "Mopar sales codes",
    "Mopar SO number",
    "fender tag decode",
    "Charger broadcast sheet",
    "Challenger fender tag",
    "Mopar paint code",
    "decode Mopar VIN options",
    "Mopar factory options by VIN",
    "Mopar build codes",
    "Mopar VIN decoder",
  ],
  alternates: { canonical: "/mopar-broadcast-sheet" },
  openGraph: {
    title: "Mopar Broadcast Sheet by VIN — Fender Tag & Build Codes",
    description:
      "Decode a Mopar broadcast sheet by VIN: fender tag, SO and sales codes, paint and trim, and build records for Dodge, Plymouth, and Chrysler.",
    url: `${SITE}/mopar-broadcast-sheet`,
    type: "article",
    siteName: "CarCheckerVIN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mopar Broadcast Sheet by VIN — Fender Tag & Build Codes",
    description:
      "Decode a Mopar broadcast sheet by VIN: fender tag, SO and sales codes, paint and trim, and build records for Dodge, Plymouth, and Chrysler.",
  },
  robots: { index: true, follow: true },
};

/* ── JSON-LD schemas ───────────────────────────────────────────── */

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Mopar Broadcast Sheet by VIN",
  url: `${SITE}/mopar-broadcast-sheet`,
  applicationCategory: "AutomotiveApplication",
  operatingSystem: "All",
  description:
    "Retrieve a Mopar build record using its VIN. Decodes the fender tag, SO (schedule order) number, sales codes, paint and trim codes, and the original broadcast sheet for Dodge, Plymouth, and Chrysler vehicles.",
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
  headline: "Mopar Broadcast Sheet by VIN — Fender Tag & Build Codes",
  description:
    "How to decode a Mopar broadcast sheet by VIN: the fender tag, SO number, sales codes, paint and trim codes, and the original broadcast sheet for Dodge, Plymouth, and Chrysler vehicles.",
  author: ORG_AUTHOR,
  publisher: {
    "@type": "Organization",
    name: "CarCheckerVIN",
    url: SITE,
    logo: { "@type": "ImageObject", url: `${SITE}/logo.png` },
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${SITE}/mopar-broadcast-sheet`,
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
      name: "What is a Mopar broadcast sheet?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A Mopar broadcast sheet is the paper production document Chrysler generated for each Dodge, Plymouth, or Chrysler vehicle as it was assembled. It lists the model, engine and transmission, paint and trim, and the full set of sales codes for every factory option. Because it was tucked inside the car during assembly, surviving broadcast sheets are prized by Mopar collectors. When the paper sheet is gone, the metal fender tag carries a condensed version of the same build data.",
      },
    },
    {
      "@type": "Question",
      name: "How do I decode a Mopar fender tag?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Mopar fender tag is a stamped metal plate on the driver's-side inner fender or radiator support. It encodes the vehicle in rows of sales codes: the paint code, trim code, engine and transmission codes, the SO (schedule order) number, the build date, and option sales codes. Read it from the bottom row up, decoding each sales code against a Chrysler reference for that model year. The VIN confirms the year, plant, and body before you start, since Chrysler reused some codes across years.",
      },
    },
    {
      "@type": "Question",
      name: "What are Mopar sales codes?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sales codes are Chrysler's short alphanumeric codes for factory options, colors, and equipment, the Mopar equivalent of GM's RPO codes. They appear on the fender tag and broadcast sheet, covering everything from the engine and axle to interior color and individual option packages. Decoding the sales codes for a given model year reveals exactly how the Dodge, Plymouth, or Chrysler was equipped at the factory, in more detail than the original window sticker.",
      },
    },
    {
      "@type": "Question",
      name: "What is an SO number on a Mopar?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "SO stands for Schedule Order, sometimes called the scheduling or order number. It is the production order Chrysler assigned to the vehicle, appearing on both the fender tag and the broadcast sheet. The SO number ties the fender tag to the broadcast sheet and the rest of the build paperwork, so collectors use it to confirm that a car's tag, sheet, and VIN all belong together rather than having been mixed and matched.",
      },
    },
    {
      "@type": "Question",
      name: "Where was the broadcast sheet hidden in a Mopar?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "During assembly Chrysler workers often tucked the paper broadcast sheet inside the car, where it sometimes survives for decades. Common spots include under the rear seat, behind or beneath the front seats, above the headliner, behind door panels, on top of the gas tank, and inside the springs of the seat frame. Survival is never guaranteed, and many were thrown away, so when no paper sheet turns up, the fender tag is the primary on-the-car build source.",
      },
    },
    {
      "@type": "Question",
      name: "Can I get a broadcast sheet for a Charger or Challenger by VIN?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The classic Dodge Charger and Challenger are among the most documented Mopars. Enter the VIN to confirm the year, plant, and body, then decode the fender tag for paint, trim, engine, transmission, SO number, and sales codes. If the original broadcast sheet survives inside the car, it confirms the same build in full. For a high-value Hemi or R/T car, collectors cross-check the fender tag, the VIN-stamped engine and transmission, and any surviving broadcast sheet to confirm a genuine numbers-matching example.",
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
  name: "How to Read a Mopar Broadcast Sheet by VIN",
  description:
    "Decode a Mopar build record from the VIN, the fender tag, and the broadcast sheet for Dodge, Plymouth, and Chrysler vehicles.",
  totalTime: "PT3M",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Confirm the VIN and model year",
      text: "Read the VIN from the dash, door jamb, or title. The year, body, and plant anchor which Chrysler sales-code references apply.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Read the fender tag",
      text: "Find the stamped metal tag on the driver's-side inner fender. Note the paint, trim, engine, transmission, SO number, and sales codes.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Decode the sales codes",
      text: "Work the fender tag from the bottom row up, matching each sales code to a Chrysler reference for the model year.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Cross-check the broadcast sheet",
      text: "If a paper broadcast sheet survives inside the car, confirm its SO number and codes match the fender tag and VIN.",
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
      name: "Mopar Broadcast Sheet",
      item: `${SITE}/mopar-broadcast-sheet`,
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
  url: `${SITE}/mopar-broadcast-sheet`,
};

/* ── Static UI data ────────────────────────────────────────────── */

const TRUST_STATS = [
  { icon: Tag, value: "Fender Tag", label: "stamped sales codes" },
  { icon: ScrollText, value: "Broadcast", label: "original paper sheet" },
  { icon: Factory, value: "Mopar", label: "Dodge · Plymouth · Chrysler" },
  { icon: BadgeCheck, value: "Free", label: "VIN lookup, no sign-up" },
];

const HOW_STEPS = [
  {
    icon: Search,
    tag: "Step 1",
    title: "Enter the Mopar VIN",
    body: "Type the VIN from the dash, door jamb, title, or registration. It fixes the model year, plant, and body before you read the fender tag.",
  },
  {
    icon: Tag,
    tag: "Step 2",
    title: "We tie it to the fender tag",
    body: "The VIN tells you which Chrysler reference applies so the fender tag's sales codes, paint, trim, and SO number decode correctly.",
  },
  {
    icon: ScrollText,
    tag: "Step 3",
    title: "Match the broadcast sheet",
    body: "Where the paper broadcast sheet survives inside the car, its SO number and codes confirm the full original build in writing.",
  },
];

const CONTENTS = [
  {
    icon: Tag,
    title: "Fender tag sales codes",
    body: "Stamped rows of Chrysler sales codes (paint, trim, engine, transmission, and every option) condensed onto one metal tag.",
  },
  {
    icon: ScrollText,
    title: "SO (schedule order) number",
    body: "The production order number that ties the fender tag, broadcast sheet, and VIN together as one car.",
  },
  {
    icon: Cog,
    title: "Engine & transmission codes",
    body: "The engine and transmission sales codes, key to confirming a numbers-matching Hemi, R/T, or 440 drivetrain.",
  },
  {
    icon: Palette,
    title: "Paint & interior trim",
    body: "Mopar paint codes (including the high-impact colors) and interior trim codes for exact, year-correct matching.",
  },
  {
    icon: ScrollText,
    title: "Broadcast sheet build",
    body: "Where it survives inside the car, the original paper sheet listing the full factory order in Chrysler sales codes.",
  },
  {
    icon: Factory,
    title: "Plant & build date",
    body: "The assembly plant and build date stamped on the fender tag that confirm where and when the car was produced.",
  },
];

const COLLECTOR_CHECKLIST = [
  "Decode the fender tag sales codes row by row",
  "Confirm the SO number ties tag, sheet, and VIN together",
  "Verify engine and transmission codes for numbers-matching",
  "Check high-impact paint and trim codes against the year",
  "Authenticate a surviving broadcast sheet against the tag",
  "Pair with a VIN history check for the full story",
];

const TAG_FIELDS = [
  "Exterior paint code",
  "Interior trim code",
  "Engine and transmission sales codes",
  "SO (schedule order) number",
  "Build date",
  "Option sales codes (rows of three-character codes)",
];

const HIDING_SPOTS = [
  "Under the rear seat",
  "Beneath or behind the front seats",
  "Above the headliner",
  "On top of the gas tank",
  "Inside the seat-frame springs",
  "Behind the door panels",
];

const INTERNAL_LINKS = [
  {
    href: "/build-sheet",
    label: "Build Sheet by VIN (All Makes)",
    desc: "The general factory build-sheet lookup covering every manufacturer, not just Mopar.",
  },
  {
    href: "/window-sticker",
    label: "Window Sticker Maker",
    desc: "The consumer-facing Monroney view, options in plain language with original MSRP.",
  },
  {
    href: "/vin-decoder",
    label: "VIN Decoder",
    desc: "Decode the Mopar VIN to model year, plant, and production sequence.",
  },
  {
    href: "/paint-code-lookup",
    label: "Paint Code Lookup",
    desc: "Confirm the exact Mopar factory paint code, including high-impact colors, for matching.",
  },
  {
    href: "/vin-check",
    label: "Full VIN History Check",
    desc: "Title, accident, odometer, and recall records to pair with the factory origin.",
  },
  {
    href: "/classic-car-vin",
    label: "Classic Car VIN Decoder",
    desc: "For pre-1981 Mopars with shorter VINs and era-specific fender-tag formats.",
  },
];

/* ── Page ──────────────────────────────────────────────────────── */

export default function MoparBroadcastSheetPage() {
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
                { label: "Mopar Broadcast Sheet" },
              ]}
              onDark
            />

            <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
              <ClipboardList className="w-4 h-4" /> Dodge · Plymouth · Chrysler
              &nbsp;·&nbsp; Fender Tag &amp; Sales Codes
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-headline font-extrabold leading-tight mb-4">
              Mopar Broadcast Sheet by VIN —{" "}
              <span style={{ color: "var(--color-secondary-container)" }}>
                Decode the Fender Tag
              </span>
            </h1>

            <p className="speakable-intro text-base sm:text-xl text-white/85 max-w-3xl mb-8 leading-relaxed">
              Chrysler recorded each Mopar&apos;s build on the metal fender tag
              and the paper broadcast sheet: paint and trim codes, the engine
              and transmission, the SO number, and rows of sales codes for every
              option. Dodge, Plymouth, and Chrysler alike. Enter the VIN to
              anchor the year and plant, then decode the tag for free.
            </p>

            <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-xl">
              <h2 className="text-base sm:text-lg font-headline font-extrabold text-primary mb-1">
                Look Up a Mopar Broadcast Sheet by VIN
              </h2>
              <p className="text-xs sm:text-sm text-on-surface-variant mb-4">
                Enter the VIN and we&apos;ll fix the year, plant, and body so the
                fender tag and sales codes decode correctly
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
              How a Mopar Broadcast Sheet Lookup Works
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl">
              Chrysler split the build record between the fender tag and the
              paper broadcast sheet. The VIN points you to the right reference;
              the sales codes do the rest.
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

          {/* ── What is a Mopar broadcast sheet ──────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              What Counts as a Mopar Build Record?
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl leading-relaxed">
              Chrysler left two records on the car, one metal and one paper. A
              real Mopar verification reads both, and the SO number is what ties
              them together.
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
                <p>
                  The{" "}
                  <strong className="text-on-surface">fender tag</strong> is the
                  durable record, a stamped metal plate on the driver&apos;s
                  inner fender carrying rows of{" "}
                  <strong className="text-on-surface">sales codes</strong> for
                  the paint, trim, engine, transmission, build date, and every
                  factory option. It almost always survives, so it is where most
                  Mopar decoding starts.
                </p>
                <p>
                  The{" "}
                  <strong className="text-on-surface">broadcast sheet</strong> is
                  the paper original that ran the assembly line and was tucked
                  inside the car. When one survives, it confirms the full build
                  in writing, and its SO number must match the fender tag.
                </p>
                <p>
                  Mopar sales codes are Chrysler&apos;s answer to GM&apos;s RPO
                  codes: short alphanumeric codes for every option. Decoding them
                  for the right model year is how you rebuild the original order.
                </p>
              </div>
              <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Tag className="w-5 h-5 text-primary" />
                  <h3 className="font-headline font-extrabold text-primary">
                    On the fender tag
                  </h3>
                </div>
                <ul className="space-y-2 text-sm text-on-surface">
                  {TAG_FIELDS.map((tip) => (
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
                  Read the tag from the bottom row up, decoding each sales code
                  against a Chrysler reference for the exact model year the VIN
                  gives you.
                </p>
              </div>
            </div>
          </section>

          {/* ── What a Mopar build record shows ──────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              What a Mopar Build Record Shows
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">
              Between the fender tag and a surviving broadcast sheet, a Mopar
              build record documents the car at the component level, far more
              than the window sticker showed the buyer.
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

          {/* ── Fender tag vs broadcast sheet ────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              Fender Tag vs. Broadcast Sheet: How They Fit Together
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl leading-relaxed">
              The same build, recorded twice. One is metal and almost always
              there; the other is paper and rarely is. The SO number links them.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5 sm:p-6">
                <div className="text-[11px] font-black uppercase tracking-wider text-on-surface-variant mb-2">
                  Fender Tag
                </div>
                <p className="text-lg font-headline font-extrabold text-on-surface mb-3">
                  The metal record
                </p>
                <ul className="space-y-2 text-sm text-on-surface-variant">
                  <li className="flex gap-2">
                    <span>·</span>
                    <span>Stamped plate on the driver&apos;s inner fender.</span>
                  </li>
                  <li className="flex gap-2">
                    <span>·</span>
                    <span>Rows of sales codes, paint, trim, SO number.</span>
                  </li>
                  <li className="flex gap-2">
                    <span>·</span>
                    <span>Almost always survives. Read bottom row up.</span>
                  </li>
                  <li className="flex gap-2">
                    <span>·</span>
                    <span>Can be reproduced, so verify against the VIN.</span>
                  </li>
                </ul>
              </div>
              <div className="rounded-2xl border border-primary/30 bg-primary/5 p-5 sm:p-6">
                <div className="text-[11px] font-black uppercase tracking-wider text-primary mb-2">
                  Broadcast Sheet
                </div>
                <p className="text-lg font-headline font-extrabold text-primary mb-3">
                  The paper original
                </p>
                <ul className="space-y-2 text-sm text-on-surface-variant">
                  <li className="flex gap-2">
                    <span>·</span>
                    <span>The assembly-line document tucked inside the car.</span>
                  </li>
                  <li className="flex gap-2">
                    <span>·</span>
                    <span>Lists the full factory order in sales codes.</span>
                  </li>
                  <li className="flex gap-2">
                    <span>·</span>
                    <span>Rarely survives. Many were thrown away.</span>
                  </li>
                  <li className="flex gap-2">
                    <span>·</span>
                    <span>Its SO number must match the fender tag.</span>
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
                Decode Your Mopar&apos;s Fender Tag
              </h2>
              <p className="text-white/80 text-sm sm:text-base mb-6 max-w-xl mx-auto">
                Enter the VIN to lock in the year, plant, and body, then read
                the fender tag&apos;s sales codes and line them up with any
                surviving broadcast sheet. Free, in seconds.
              </p>
              <div className="max-w-xl mx-auto bg-white rounded-2xl p-4 sm:p-5">
                <VinSearchForm size="lg" />
              </div>
            </div>
          </section>

          {/* ── Collectors & restorers ─────────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">
              Why Mopar Collectors Verify the Build
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
                <p>
                  In the Mopar world, the fender tag and a matching broadcast
                  sheet are the difference between a{" "}
                  <strong className="text-on-surface">
                    documented, numbers-matching car
                  </strong>{" "}
                  and a clone. A genuine Hemi Charger, R/T, or Six-Pack car with
                  the correct sales codes commands a premium over a tribute built
                  to look identical.
                </p>
                <p>
                  Restorers use the sales codes to source year-correct parts and
                  the right factory colors, including Chrysler&apos;s
                  high-impact paints. A 1970 Challenger R/T with a specific engine
                  and trim code needs different components than a base car, so the
                  fender tag names the right specs for show-quality work.
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
                    Mopar verification checklist
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
                    Start the Mopar build lookup by VIN:
                  </p>
                  <VinSearchForm size="sm" />
                </div>
              </div>
            </div>
          </section>

          {/* ── VIN + hidden sheet ─────────────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              The Mopar VIN, the Fender Tag, and the Hidden Sheet
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">
              The VIN tells you who, where, and when. The fender tag carries the
              codes. And in many classic Mopars a paper broadcast sheet may still
              be hidden inside.
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
                <p>
                  A modern 17-character Mopar VIN encodes the World Manufacturer
                  Identifier, the descriptor section, a check digit, the model
                  year, the assembly plant, and the sequential production number.
                  Pre-1981 Dodge, Plymouth, and Chrysler cars use a shorter VIN.
                  Decode those with our{" "}
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
                  lived on the fender tag and the broadcast sheet, which is why
                  the metal tag and the hidden paper sheet matter so much. Decode
                  the raw VIN first with our{" "}
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
                    Where a Mopar broadcast sheet hides
                  </h3>
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm text-on-surface">
                  {HIDING_SPOTS.map((spot) => (
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
                  Survival is never guaranteed. When no paper sheet turns up,
                  the fender tag is the primary on-the-car build source.
                </p>
              </div>
            </div>
          </section>

          {/* ── Internal links ─────────────────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              More VIN Tools for Mopar Owners
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-7">
              The build record is the starting point. These checks complete the
              picture on any Dodge, Plymouth, or Chrysler.
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
              Mopar Broadcast Sheet: Frequently Asked Questions
            </h2>
            <p className="text-sm text-on-surface-variant mb-8">
              The questions Mopar owners and collectors ask most about fender
              tags and broadcast sheets.
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
              <Zap className="w-3.5 h-3.5" /> Free · Instant · Mopar Build Codes
            </div>
            <h2 className="text-2xl sm:text-4xl font-headline font-extrabold text-primary mb-3">
              Look Up a Mopar Broadcast Sheet by VIN
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl mx-auto mb-8">
              Enter the VIN to anchor the year and plant, then decode the fender
              tag&apos;s paint, trim, engine, transmission, SO number, and sales
              codes.
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
