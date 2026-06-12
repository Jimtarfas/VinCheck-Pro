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
  Hash,
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
    "GM Build Sheet by VIN — RPO Codes, SPID Label & Service Parts ID (Free)",
  description:
    "Look up a GM build sheet by VIN, free. Decode RPO (Regular Production Option) codes, the SPID / Service Parts Identification label in the glovebox or trunk, paint and trim codes, and the broadcast sheet for Chevrolet, Buick, Pontiac, Oldsmobile, GMC, and Cadillac.",
  keywords: [
    "GM build sheet by VIN",
    "RPO code lookup",
    "GM SPID label decode",
    "Service Parts Identification",
    "Chevrolet build sheet",
    "GM broadcast sheet",
    "Camaro build sheet",
    "GM paint code RPO",
    "Pontiac PHS",
    "GM cowl tag decode",
    "GM factory options by VIN",
    "decode GM VIN options",
    "GM RPO list",
    "GM build record",
  ],
  alternates: { canonical: "/gm-build-sheet" },
  openGraph: {
    title: "GM Build Sheet by VIN — RPO Codes & SPID Label",
    description:
      "Decode a GM build sheet by VIN: RPO option codes, the SPID label, paint and trim codes, and broadcast sheet for Chevrolet, Buick, Pontiac, Olds, GMC, and Cadillac.",
    url: `${SITE}/gm-build-sheet`,
    type: "article",
    siteName: "CarCheckerVIN",
  },
  twitter: {
    card: "summary_large_image",
    title: "GM Build Sheet by VIN — RPO Codes & SPID Label",
    description:
      "Decode a GM build sheet by VIN: RPO codes, the SPID label, paint and trim codes, and the broadcast sheet.",
  },
  robots: { index: true, follow: true },
};

/* ── JSON-LD schemas ───────────────────────────────────────────── */

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "GM Build Sheet by VIN",
  url: `${SITE}/gm-build-sheet`,
  applicationCategory: "AutomotiveApplication",
  operatingSystem: "All",
  description:
    "Retrieve a General Motors build record using its VIN. Decodes RPO (Regular Production Option) codes, the SPID Service Parts Identification label, cowl-tag paint and trim codes, and assembly data for Chevrolet, Buick, Pontiac, Oldsmobile, GMC, and Cadillac.",
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
  headline: "GM Build Sheet by VIN — RPO Codes, SPID Label & Broadcast Sheet",
  description:
    "How to decode a GM build sheet by VIN: RPO option codes, the SPID Service Parts Identification label, cowl-tag paint and trim codes, and the broadcast sheet for Chevrolet, Buick, Pontiac, Oldsmobile, GMC, and Cadillac.",
  author: ORG_AUTHOR,
  publisher: {
    "@type": "Organization",
    name: "CarCheckerVIN",
    url: SITE,
    logo: { "@type": "ImageObject", url: `${SITE}/logo.png` },
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${SITE}/gm-build-sheet`,
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
      name: "What is a GM build sheet?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A GM build sheet is the factory production record for a single General Motors vehicle. On the car, much of it survives as the SPID (Service Parts Identification) label, a sticker in the glovebox or trunk listing every RPO option code, and as the cowl-tag paint and trim codes. The original paper version is the broadcast sheet that ran down the assembly line. Together they document the trim, paint, drivetrain, and every factory option for Chevrolet, Buick, Pontiac, Oldsmobile, GMC, and Cadillac vehicles.",
      },
    },
    {
      "@type": "Question",
      name: "What is an RPO code?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "RPO stands for Regular Production Option. It is GM's three-character alphanumeric code for a factory-installed option, package, color, or component, such as a specific engine, axle ratio, paint color, or trim package. Every GM build sheet and SPID label is essentially a list of RPO codes. Decoding them against a GM reference for the model year reveals exactly how the car was equipped from the factory, in far more detail than the window sticker showed.",
      },
    },
    {
      "@type": "Question",
      name: "Where is the SPID label on a GM vehicle?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The SPID (Service Parts Identification) label is usually inside the glovebox, on the inside of the glovebox door, or in the trunk, often on the spare-tire cover or trunk lid. It lists the VIN, the paint and trim codes, and every RPO option code the vehicle left the factory with. It is the single most useful on-the-car source for a GM build sheet, since it captures the full RPO list in one place. Exact placement varies by model and year.",
      },
    },
    {
      "@type": "Question",
      name: "How do I decode a GM cowl tag?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The cowl tag (also called the trim tag or body tag) is a metal plate on the firewall or cowl. It encodes the assembly plant, build date, body style, and the paint and interior trim codes. It does not list every option the way the SPID label does, but it is the key source for verifying the original paint and trim and the plant and time of build. Decode each field against a GM cowl-tag reference for the specific division and model year.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between a GM build sheet and the SPID label?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The build sheet (broadcast sheet) is the original paper production document that traveled with the car down the assembly line, and it is often missing or was discarded. The SPID label is a durable sticker GM applied so dealers and service could identify the correct parts; it lists the same RPO option codes and survives far more reliably. For most owners the SPID label, combined with the cowl tag, reconstructs the build when the original paper sheet is long gone.",
      },
    },
    {
      "@type": "Question",
      name: "Can I get a build sheet for a Pontiac through PHS?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Pontiac Historic Services (PHS) provides documentation packages for many Pontiac vehicles, including a copy of the original billing history and build information tied to the VIN. It is the Pontiac equivalent of a manufacturer build record and is widely used to authenticate GTOs, Firebirds, and Trans Ams. For other GM divisions, the SPID label, cowl tag, and RPO decoding are the primary sources, since GM-wide build records are less centralized than Ford's.",
      },
    },
    {
      "@type": "Question",
      name: "Can I get a build sheet for a Camaro by VIN?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Enter the VIN to confirm the year, plant, and body style, then read the SPID label for the full RPO option list and the cowl tag for paint, trim, and build date. For a numbers-matching Camaro, especially a Z/28 or SS, collectors cross-check the RPO codes, the engine and transmission stampings, and the cowl tag to confirm the car matches its documented configuration and isn't a clone.",
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
  name: "How to Read a GM Build Sheet by VIN",
  description:
    "Decode a GM build record from the VIN, the SPID label, the cowl tag, and the RPO option codes.",
  totalTime: "PT3M",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Confirm the VIN and model year",
      text: "Read the VIN from the dash, door jamb, or title. The year and division anchor which GM RPO and cowl-tag references apply.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Find the SPID label",
      text: "Check the glovebox or trunk for the Service Parts Identification label and note the paint, trim, and full RPO option list.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Read the cowl tag",
      text: "Locate the cowl/trim tag on the firewall and note the plant, build date, and paint and trim codes to confirm the original colors.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Decode the RPO codes",
      text: "Match each RPO code against a GM reference for the division and year to reveal the engine, axle, packages, and equipment as built.",
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
      name: "GM Build Sheet",
      item: `${SITE}/gm-build-sheet`,
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
  url: `${SITE}/gm-build-sheet`,
};

/* ── Static UI data ────────────────────────────────────────────── */

const TRUST_STATS = [
  { icon: Hash, value: "RPO", label: "option code decode" },
  { icon: Tag, value: "SPID", label: "glovebox / trunk label" },
  { icon: Factory, value: "GM", label: "Chevy · Buick · Pontiac · Olds" },
  { icon: BadgeCheck, value: "Free", label: "VIN lookup, no sign-up" },
];

const HOW_STEPS = [
  {
    icon: Search,
    tag: "Step 1",
    title: "Enter the GM VIN",
    body: "Type the VIN from the dash, door jamb, title, or registration. It fixes the model year, division, plant, and body before you read the codes.",
  },
  {
    icon: Tag,
    tag: "Step 2",
    title: "We point you to the SPID",
    body: "The VIN tells you which GM reference applies so the SPID label's RPO list and the cowl tag's paint and trim codes decode correctly.",
  },
  {
    icon: Hash,
    tag: "Step 3",
    title: "Decode the RPO codes",
    body: "Each three-character RPO code maps to a factory option, color, or component, and together they rebuild exactly how the car was equipped.",
  },
];

const CONTENTS = [
  {
    icon: Hash,
    title: "RPO option codes",
    body: "Every Regular Production Option, from engine and axle ratio to packages, audio, and appearance, as a three-character GM code.",
  },
  {
    icon: Tag,
    title: "SPID label list",
    body: "The Service Parts Identification sticker that captures the full RPO list, VIN, and paint and trim in one place.",
  },
  {
    icon: Palette,
    title: "Cowl-tag paint & trim",
    body: "Firewall cowl-tag codes for the exact original exterior paint and interior trim, year- and division-correct.",
  },
  {
    icon: Cog,
    title: "Drivetrain stampings",
    body: "Engine and transmission codes and casting dates to confirm a numbers-matching GM drivetrain.",
  },
  {
    icon: Factory,
    title: "Plant & build date",
    body: "The assembly plant and build date from the cowl tag that confirm where and when the car was produced.",
  },
  {
    icon: ScrollText,
    title: "Broadcast sheet",
    body: "Where it survives, the original paper assembly-line sheet listing the same RPO build in factory order.",
  },
];

const COLLECTOR_CHECKLIST = [
  "Read the full RPO list from the SPID label",
  "Confirm paint and trim on the cowl tag",
  "Verify engine and transmission stampings match",
  "Cross-check special-performance RPO codes (Z/28, SS, etc.)",
  "Use PHS for Pontiac billing documentation",
  "Pair with a VIN history check for the full story",
];

const SPID_FIELDS = [
  "VIN printed on the label",
  "Exterior paint code (and two-tone)",
  "Interior trim code",
  "Full Regular Production Option (RPO) list",
  "Build / order reference numbers",
  "Service parts identification data",
];

const INTERNAL_LINKS = [
  {
    href: "/build-sheet",
    label: "Build Sheet by VIN (All Makes)",
    desc: "The general factory build-sheet lookup covering every manufacturer, not just GM.",
  },
  {
    href: "/window-sticker",
    label: "Window Sticker Maker",
    desc: "The consumer-facing Monroney view with options in plain language and original MSRP.",
  },
  {
    href: "/vin-decoder",
    label: "VIN Decoder",
    desc: "Decode the GM VIN to model year, division, plant, and production sequence.",
  },
  {
    href: "/paint-code-lookup",
    label: "Paint Code Lookup",
    desc: "Confirm the exact GM factory paint code from the RPO or cowl tag for matching.",
  },
  {
    href: "/vin-check",
    label: "Full VIN History Check",
    desc: "Title, accident, odometer, and recall records to pair with the factory origin.",
  },
  {
    href: "/classic-car-vin",
    label: "Classic Car VIN Decoder",
    desc: "For pre-1981 GM cars with shorter VINs and era-specific cowl-tag formats.",
  },
];

/* ── Page ──────────────────────────────────────────────────────── */

export default function GmBuildSheetPage() {
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
                { label: "GM Build Sheet" },
              ]}
              onDark
            />

            <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
              <ClipboardList className="w-4 h-4" /> Chevy · Buick · Pontiac ·
              Olds &nbsp;·&nbsp; RPO &amp; SPID
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-headline font-extrabold leading-tight mb-4">
              GM Build Sheet by VIN —{" "}
              <span style={{ color: "var(--color-secondary-container)" }}>
                Decode the RPO &amp; SPID Codes
              </span>
            </h1>

            <p className="speakable-intro text-base sm:text-xl text-white/85 max-w-3xl mb-8 leading-relaxed">
              GM built each car to a list of RPO option codes. Much of that list
              survives on the SPID label in the glovebox or trunk, with paint and
              trim on the firewall cowl tag, across Chevrolet, Buick, Pontiac,
              Oldsmobile, GMC, and Cadillac alike. Enter the VIN to anchor the
              year, division, and plant, then decode the codes. It&apos;s free.
            </p>

            <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-xl">
              <h2 className="text-base sm:text-lg font-headline font-extrabold text-primary mb-1">
                Look Up a GM Build Sheet by VIN
              </h2>
              <p className="text-xs sm:text-sm text-on-surface-variant mb-4">
                Enter the VIN and we&apos;ll fix the year, division, and plant so
                the SPID label and RPO codes decode correctly
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
              How a GM Build Sheet Lookup Works
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl">
              GM spread the build record across the SPID label and the cowl tag.
              The VIN points you to the right reference; the RPO codes do the
              rest.
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

          {/* ── What is a GM build sheet ─────────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              What Counts as a GM Build Sheet?
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl leading-relaxed">
              The original paper broadcast sheet is usually long gone. What
              survives on most GM cars are two durable sources that, read
              together, rebuild the factory order.
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
                <p>
                  The{" "}
                  <strong className="text-on-surface">SPID label</strong>, the
                  Service Parts Identification sticker, is the workhorse. GM stuck it in
                  the glovebox or trunk so dealers could order the right parts,
                  and it lists the VIN, paint and trim codes, and the complete{" "}
                  <strong className="text-on-surface">RPO option list</strong> in
                  one place.
                </p>
                <p>
                  The{" "}
                  <strong className="text-on-surface">cowl tag</strong> on the
                  firewall adds the assembly plant, build date, and the original
                  paint and trim codes, the source restorers use to prove a car
                  wears its factory colors.
                </p>
                <p>
                  The original{" "}
                  <strong className="text-on-surface">broadcast sheet</strong>{" "}
                  was the paper document that ran the line. When one survives,
                  tucked behind a seat or above the tank, it is gold, but the
                  SPID and cowl tag are what most owners actually have.
                </p>
              </div>
              <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Tag className="w-5 h-5 text-primary" />
                  <h3 className="font-headline font-extrabold text-primary">
                    On the SPID label
                  </h3>
                </div>
                <ul className="space-y-2 text-sm text-on-surface">
                  {SPID_FIELDS.map((tip) => (
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
                  Each RPO is a three-character code. Decode it against a GM
                  reference for the division and the exact model year the VIN
                  gives you.
                </p>
              </div>
            </div>
          </section>

          {/* ── What a GM build record shows ─────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              What a GM Build Record Shows
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">
              Between the SPID label, the cowl tag, and the drivetrain
              stampings, a GM build record documents the car at the component
              level, far more than the window sticker showed the buyer.
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

          {/* ── RPO & SPID deep-dive ─────────────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              RPO Codes vs. the SPID Label: How They Fit Together
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl leading-relaxed">
              RPO codes are the language; the SPID label is where GM wrote them
              down on the car. Knowing which source holds what saves hours.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5 sm:p-6">
                <div className="text-[11px] font-black uppercase tracking-wider text-on-surface-variant mb-2">
                  RPO Code
                </div>
                <p className="text-lg font-headline font-extrabold text-on-surface mb-3">
                  The option language
                </p>
                <ul className="space-y-2 text-sm text-on-surface-variant">
                  <li className="flex gap-2">
                    <span>·</span>
                    <span>Three-character code for one factory option.</span>
                  </li>
                  <li className="flex gap-2">
                    <span>·</span>
                    <span>Covers engines, axles, paint, packages, audio.</span>
                  </li>
                  <li className="flex gap-2">
                    <span>·</span>
                    <span>Meaning is division- and year-specific.</span>
                  </li>
                  <li className="flex gap-2">
                    <span>·</span>
                    <span>The same codes appear on the broadcast sheet.</span>
                  </li>
                </ul>
              </div>
              <div className="rounded-2xl border border-primary/30 bg-primary/5 p-5 sm:p-6">
                <div className="text-[11px] font-black uppercase tracking-wider text-primary mb-2">
                  SPID Label
                </div>
                <p className="text-lg font-headline font-extrabold text-primary mb-3">
                  Where the codes live
                </p>
                <ul className="space-y-2 text-sm text-on-surface-variant">
                  <li className="flex gap-2">
                    <span>·</span>
                    <span>Durable sticker in the glovebox or trunk.</span>
                  </li>
                  <li className="flex gap-2">
                    <span>·</span>
                    <span>Lists the full RPO set the car was built with.</span>
                  </li>
                  <li className="flex gap-2">
                    <span>·</span>
                    <span>Includes VIN, paint, and trim for cross-check.</span>
                  </li>
                  <li className="flex gap-2">
                    <span>·</span>
                    <span>Survives when the paper broadcast sheet is gone.</span>
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
                Decode Your GM&apos;s RPO Build
              </h2>
              <p className="text-white/80 text-sm sm:text-base mb-6 max-w-xl mx-auto">
                Enter the VIN to lock in the year, division, and plant, then
                read the SPID label and cowl tag and decode every RPO option
                code. Free, in seconds.
              </p>
              <div className="max-w-xl mx-auto bg-white rounded-2xl p-4 sm:p-5">
                <VinSearchForm size="lg" />
              </div>
            </div>
          </section>

          {/* ── Collectors & restorers ─────────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">
              Why GM Collectors Verify the RPO Build
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
                <p>
                  For GM muscle and performance cars, the RPO list is the
                  difference between a{" "}
                  <strong className="text-on-surface">
                    documented, numbers-matching car
                  </strong>{" "}
                  and a clone. A genuine Z/28, SS, GTO, or 442 with the correct
                  performance RPO codes commands a premium over a tribute built
                  to look the same.
                </p>
                <p>
                  Restorers use the RPO and cowl-tag codes to source year-correct
                  parts and the right factory colors. A 1970 Chevelle SS 454 with
                  a specific axle and trim RPO needs different components than a
                  base Malibu, so the SPID label names the right specs for
                  show-quality work.
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
                    GM verification checklist
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
                    Start the GM build lookup by VIN:
                  </p>
                  <VinSearchForm size="sm" />
                </div>
              </div>
            </div>
          </section>

          {/* ── VIN + SPID ─────────────────────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              The GM VIN, the Cowl Tag, and the SPID Label
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">
              The VIN tells you who, where, and when. The cowl tag adds plant and
              color. The SPID label carries the full RPO option list.
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
                <p>
                  A modern 17-character GM VIN encodes the World Manufacturer
                  Identifier, the descriptor section, a check digit, the model
                  year, the assembly plant, and the sequential production number.
                  Pre-1981 GM cars use a shorter VIN with division-specific
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
                  What the VIN does not carry is the RPO list. That has always
                  lived on the SPID label and in GM&apos;s production records,
                  which is why the glovebox sticker matters so much. Decode the
                  raw VIN first with our{" "}
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
                    Where to find GM build data on the car
                  </h3>
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm text-on-surface">
                  {[
                    "SPID label in the glovebox",
                    "SPID label on the trunk / spare cover",
                    "Cowl / trim tag on the firewall",
                    "Engine block stamping pad",
                    "Transmission and axle codes",
                    "Broadcast sheet (where it survives)",
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
                  Labels can be reproduced and stampings can be altered, so always
                  cross-check the RPO codes against the VIN, the cowl tag, and
                  the drivetrain.
                </p>
              </div>
            </div>
          </section>

          {/* ── Internal links ─────────────────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              More VIN Tools for GM Owners
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-7">
              The RPO build is the starting point. These checks complete the
              picture on any Chevrolet, Buick, Pontiac, Oldsmobile, GMC, or
              Cadillac.
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
              GM Build Sheet: Frequently Asked Questions
            </h2>
            <p className="text-sm text-on-surface-variant mb-8">
              The questions GM owners and collectors ask most about RPO codes and
              the SPID label.
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
              <Zap className="w-3.5 h-3.5" /> Free · Instant · GM Build Codes
            </div>
            <h2 className="text-2xl sm:text-4xl font-headline font-extrabold text-primary mb-3">
              Look Up a GM Build Sheet by VIN
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl mx-auto mb-8">
              Enter the VIN to anchor the year, division, and plant, then decode
              the SPID label&apos;s RPO list and the cowl tag&apos;s paint and
              trim codes.
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
