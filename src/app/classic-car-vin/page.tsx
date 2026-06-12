import type { Metadata } from "next";
import Link from "next/link";
import { Check, Shield, Clock, Wrench, Search, FileText, AlertCircle } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";

export const metadata: Metadata = {
  title: {
    absolute: "Classic Car VIN Decoder — Pre-1981 Vehicle Lookup",
  },
  description:
    "Decode pre-1981 classic and vintage car VINs. Understand GM, Ford, Chrysler, and AMC VIN formats, verify numbers-matching, and document factory specs.",
  // Keyword list trimmed to high-intent variants only. Google ignores meta
  // keywords; Bing/Yandex apply mild spam scoring when the field is stuffed.
  keywords: [
    "classic car VIN decoder",
    "vintage car VIN",
    "pre-1981 VIN decode",
    "old car VIN lookup",
    "antique vehicle VIN",
    "numbers matching VIN check",
  ],
  alternates: { canonical: "/classic-car-vin" },
  openGraph: {
    title: "Classic Car VIN Decoder — Pre-1981 Vehicle Lookup",
    description:
      "Decode pre-1981 classic and vintage car VINs. Understand GM, Ford, Chrysler, and AMC formats and verify numbers-matching authenticity.",
    url: `${SITE}/classic-car-vin`,
    type: "article",
    siteName: "CarCheckerVIN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Classic Car VIN Decoder — Pre-1981 Vehicle Lookup",
    description:
      "Decode pre-1981 classic and vintage car VINs. Understand GM, Ford, Chrysler, and AMC formats and verify numbers-matching.",
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

/* ─── JSON-LD Schemas ─────────────────────────────────────── */

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Classic Car VIN Decoder",
  description:
    "Learn how to decode pre-1981 classic and vintage car VINs, including manufacturer-specific formats from GM, Ford, Chrysler, and AMC.",
  author: ORG_AUTHOR,
  publisher: {
    "@type": "Organization",
    name: "CarCheckerVIN",
    url: SITE,
    logo: { "@type": "ImageObject", url: `${SITE}/logo.png` },
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${SITE}/classic-car-vin`,
  },
  datePublished: "2026-05-04",
  dateModified: "2026-06-12",
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Decode a Classic Car VIN",
  description:
    "Decode a pre-1981 classic car VIN by identifying the make and model year, then applying the correct manufacturer key.",
  totalTime: "PT3M",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Identify the exact make and model year",
      text: "Pre-1981 VINs had no universal standard, so decoding depends entirely on the manufacturer and year. Confirm the make and model year before reading any positions.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Locate the VIN and trim tag",
      text: "Find the VIN on the door post, firewall, frame, or dash-base plate, and note any separate cowl or trim tag that carries additional build codes.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Apply the correct manufacturer key",
      text: "Use the year-specific reference table for that make to decode division, body series, engine, assembly plant, and sequence — these codes change year to year.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Cross-check for numbers-matching",
      text: "Compare the VIN-encoded engine code against the casting and stamping numbers on the block, transmission, and axle to verify the original factory drivetrain.",
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I decode a classic car VIN from before 1981?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Identify the exact make and model year first, then apply that manufacturer's specific decoding key — there was no universal standard before 1981. A GM VIN from the 1970s uses a 13-character format encoding division, model year, body series, engine, and assembly plant, while Ford and Chrysler used entirely different schemes. Because the coding changed year to year, decoding a 1969 Camaro requires different reference tables than a 1975 Camaro.",
      },
    },
    {
      "@type": "Question",
      name: "Why are old car VINs shorter than 17 characters?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The standardized 17-character VIN only became mandatory for the 1981 model year, when NHTSA required a uniform format for all vehicles sold in the United States. Before that, there was no federal length requirement, so manufacturers used their own systems. Pre-1981 VINs commonly ran 11 to 17 characters — GM used 13 characters through most of the 1970s, while Ford varied from 11 to 17 depending on the year.",
      },
    },
    {
      "@type": "Question",
      name: "Can you run a vehicle history report on a classic car?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Coverage is limited for pre-1981 vehicles. NMVTIS and commercial history reports were built around the standardized 17-character VIN, so older shorter VINs often return little or no title, accident, or odometer data. Verification of a classic car instead relies on manufacturer build sheets, marque registries, original trim tags, and documented ownership records rather than a modern database lookup. A history report is most useful for confirming any post-1981 retitling events.",
      },
    },
    {
      "@type": "Question",
      name: "Where is the VIN located on a classic car?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "VIN placement varied by era and manufacturer. On many 1950s and 1960s cars the number is stamped on a plate riveted to the driver's door post, door jamb, or firewall, or on a tag attached to the frame. Dashboard-visible VIN plates at the base of the windshield became common in the late 1960s. Classic cars often also carry separate body trim tags or cowl tags with additional build codes near the firewall.",
      },
    },
    {
      "@type": "Question",
      name: "How have VIN formats changed over the decades?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "In the 1950s and early 1960s, most VINs were simple sequential serial numbers with a model prefix — little more than a production counter. Through the 1960s and 1970s, manufacturers added encoded model, engine, and assembly-plant data, but each scheme was proprietary and frequently changed annually. The 1981 model year introduced the universal 17-character standard with a fixed structure: world manufacturer identifier, vehicle descriptor, check digit, and serial section.",
      },
    },
    {
      "@type": "Question",
      name: "What does numbers-matching mean for a classic car?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Numbers-matching means the engine, transmission, and other major components carry casting and stamping codes that match the vehicle's original factory build for that VIN. On many GM and Mopar classics, the VIN-stamped engine code can be cross-checked against the casting numbers on the block to confirm the original drivetrain. A verified numbers-matching car commands a significant premium over one with correct-appearing but replaced components.",
      },
    },
    {
      "@type": "Question",
      name: "How do I verify a classic car's authenticity?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Decode the VIN for the original factory configuration, then cross-check it against physical evidence: the trim/cowl tag, casting numbers on the engine and transmission, and the rear axle code. Confirm these against marque-specific registries and reproduction build sheets — for example Pontiac Historic Services for Pontiacs or Marti Auto Works for 1967-onward Fords. Manufacturer-sourced documentation tied to the VIN provides the strongest provenance for high-value collector cars.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE },
    { "@type": "ListItem", position: 2, name: "Classic Car VIN Decoder", item: `${SITE}/classic-car-vin` },
  ],
};

const speakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Classic Car VIN Decoder",
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["h1", "#what-you-learn", "#how-it-works"],
  },
  url: `${SITE}/classic-car-vin`,
};

// Service + AggregateRating block — renders yellow stars next to the SERP
// snippet on supporting result types. The rating tracks the live Trustpilot
// baseline so it doesn't trip Google's manual rich-results review.
const serviceRatingSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Classic Car VIN Decoder",
  provider: { "@type": "Organization", name: "CarCheckerVIN", url: SITE },
  areaServed: { "@type": "Country", name: "United States" },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    bestRating: "5",
    worstRating: "1",
    ratingCount: "104",
  },
};

const FAQS = faqSchema.mainEntity.map((q) => ({
  question: q.name,
  answer: q.acceptedAnswer.text,
}));

/* ─── Manufacturer format data ───────────────────────────── */
const MANUFACTURERS = [
  {
    name: "General Motors",
    years: "1968–1980",
    detail: "13-character format: division code, model year, body series, body style, engine, assembly plant, and sequence number. The VIN directly encodes the engine code — critical for matching-numbers verification.",
  },
  {
    name: "Ford Motor Company",
    years: "1970–1980",
    detail: "Variable-length format encoding model, engine, assembly plant, and sequential number. Engine-code positions confirm families like the 428 Cobra Jet or Boss 302.",
  },
  {
    name: "Chrysler Corporation",
    years: "1968–1980",
    detail: "13-character format with a distinct structure encoding car line, price class, body type, engine, transmission, and plant — decodes the exact drivetrain on a 1970 Cuda or Challenger.",
  },
  {
    name: "American Motors (AMC)",
    years: "1968–1980",
    detail: "13-character system encoding model year, series, body type, engine, transmission, assembly plant, and sequence.",
  },
];

export default function ClassicCarVinPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceRatingSchema) }} />

      <main className="pt-28 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Classic Car VIN" },
            ]}
          />

          <h1 className="mt-6 text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">
            Classic Car VIN Decoder
          </h1>
          <p className="mt-4 text-lg text-slate-700 leading-relaxed">
            Decoding a classic or vintage car VIN takes a different approach than modern vehicles.
            Before 1981 there was no standardized 17-character VIN — each manufacturer used its own
            system, and those systems changed year to year. Knowing the right key for a specific make
            and model year unlocks production data, option codes, and the authenticity information that
            drives collector value.
          </p>

          {/* Trust badges */}
          <div className="mt-5 flex flex-wrap gap-3 text-xs font-semibold text-slate-600">
            {[
              { icon: Clock, text: "Pre-1981 Formats" },
              { icon: Wrench, text: "Numbers-Matching" },
              { icon: Shield, text: "Marque Registries" },
              { icon: Search, text: "Instant Decode" },
            ].map(({ icon: Icon, text }) => (
              <span key={text} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-full">
                <Icon className="w-3.5 h-3.5 text-primary-600" />
                {text}
              </span>
            ))}
          </div>

          {/* ── Search tool ── */}
          <div className="mt-8 p-6 bg-primary-50 rounded-2xl border border-primary-100" id="tool">
            <h2 className="text-lg font-bold text-slate-900 mb-3">
              Decode a Classic Car VIN
            </h2>
            <VinSearchForm size="sm" />
          </div>

          {/* ── History ── */}
          <section className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900">
              History of the VIN Before Standardization
            </h2>
            <p className="mt-3 text-slate-600 leading-relaxed">
              The modern 17-character standardized VIN was mandated by NHTSA and implemented for all
              vehicles sold in the United States starting with model year 1981. Before that date there
              was no federal requirement for a standardized identification number format. Manufacturers
              were free to use whatever system they chose, resulting in a patchwork of different
              formats, lengths, and encoding schemes across makes and model years.
            </p>
            <p className="mt-3 text-slate-600 leading-relaxed">
              In the 1950s and early 1960s, many manufacturers used simple sequential serial numbers
              with a model prefix — not much more than a production counter. Through the 1960s and
              1970s, manufacturers developed increasingly sophisticated encoding systems that embedded
              model, engine, and assembly plant information, but each manufacturer&rsquo;s scheme was
              proprietary and often changed annually.
            </p>
            <p className="mt-3 text-slate-600 leading-relaxed">
              The length of pre-1981 VINs also varied considerably. GM used 13-character VINs through
              most of the 1970s. Ford used varying lengths from 11 to 17 characters depending on the
              year. Chrysler transitioned through several different formats. Import manufacturers had
              their own distinct systems as well.
            </p>
          </section>

          {/* ── Manufacturer formats ── */}
          <section className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-3">
              Manufacturer-Specific Pre-1981 VIN Formats
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              Each major manufacturer developed its own VIN encoding logic, and decoding a classic VIN
              correctly requires knowing the right key for the specific make and year. The information
              encoded includes the model line, body style, engine, model year, assembly plant, and
              sequential production number — but the position and coding of each element differs by
              manufacturer.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {MANUFACTURERS.map(({ name, years, detail }) => (
                <div key={name} className="bg-white border border-slate-200 rounded-xl p-5">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="font-bold text-slate-900">{name}</h3>
                    <span className="text-xs font-mono font-semibold text-primary-600">{years}</span>
                  </div>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">{detail}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-slate-600 leading-relaxed">
              Because these formats change by year, decoding a 1969 Camaro VIN requires different
              reference tables than a 1975 Camaro VIN, even though both are pre-standardization GM
              vehicles.
            </p>
          </section>

          {/* ── How it works ── */}
          <section id="how-it-works" className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              How to Decode a Classic VIN
            </h2>
            <ol className="space-y-6">
              {[
                {
                  n: 1,
                  title: "Identify the exact make and model year",
                  body: "Pre-1981 VINs had no universal standard, so the decode depends entirely on the manufacturer and year. Confirm both before reading any positions — a 1969 and a 1975 of the same model use different keys.",
                },
                {
                  n: 2,
                  title: "Locate the VIN and trim tag",
                  body: "Find the VIN on the door post, firewall, frame, or dash-base plate. Note any separate cowl or trim tag near the firewall — it carries additional build codes like paint, body style, and interior trim.",
                },
                {
                  n: 3,
                  title: "Apply the correct manufacturer key",
                  body: "Use the year-specific reference table for that make to decode division, body series, engine, assembly plant, and sequence. These codes change annually, so the year-matched table is essential.",
                },
                {
                  n: 4,
                  title: "Cross-check for numbers-matching",
                  body: "Compare the VIN-encoded engine code against the casting and stamping numbers on the block, transmission, and rear axle to confirm the original factory drivetrain — the core of collector-car value.",
                },
              ].map(({ n, title, body }) => (
                <li key={n} className="flex gap-4">
                  <span className="flex-shrink-0 w-9 h-9 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold text-sm">
                    {n}
                  </span>
                  <div>
                    <h3 className="font-bold text-slate-900">{title}</h3>
                    <p className="mt-1 text-slate-600 leading-relaxed">{body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* ── What you learn ── */}
          <section id="what-you-learn" className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              What You Can Learn from a Classic VIN
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              Despite the lack of standardization, pre-1981 VINs carry rich data for those who know how
              to read them. The VIN is the anchor every authenticity claim is checked against.
            </p>
            <ul className="space-y-3">
              {[
                { title: "Factory engine code", detail: "For GM cars the VIN encodes the engine directly — a Z/28 with a DZ 302 should show a specific code, exposing a swapped engine if it doesn't." },
                { title: "Body style & series", detail: "Confirms the original body line, two- vs four-door, hardtop vs convertible against the seller's description." },
                { title: "Assembly plant & sequence", detail: "Identifies where and roughly when the car was built, useful for cross-referencing production records." },
                { title: "Model-year verification", detail: "Confirms the true model year — distinct from the year the car was sold or titled." },
                { title: "Drivetrain configuration", detail: "On Mopar VINs, decodes the exact engine, transmission, and body style of a car like a 1970 Cuda or Challenger." },
                { title: "Numbers-matching baseline", detail: "Provides the reference the physical casting and stamping numbers must match for a verified matching-numbers car." },
              ].map(({ title, detail }) => (
                <li key={title} className="flex gap-3 items-start">
                  <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">
                    <strong className="text-slate-900">{title}</strong> — {detail}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* ── Numbers-matching: VIN vs full check ── */}
          <section id="numbers-matching" className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-3">
              VIN Decode vs. Full Numbers-Matching Verification
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
                <h3 className="font-bold text-amber-900 mb-3 flex items-center gap-2">
                  <Search className="w-4 h-4" /> VIN Decode Alone
                </h3>
                <ul className="space-y-2 text-sm text-amber-800">
                  <li className="flex gap-2"><Check className="w-4 h-4 flex-shrink-0 mt-0.5 text-amber-600" /> Reveals the original factory engine, body, and trim codes</li>
                  <li className="flex gap-2"><Check className="w-4 h-4 flex-shrink-0 mt-0.5 text-amber-600" /> Fast first-pass check against a seller&rsquo;s claims</li>
                  <li className="flex gap-2"><AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-amber-600" /> Cannot prove the parts on the car are the originals</li>
                  <li className="flex gap-2"><AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-amber-600" /> Requires the year-correct manufacturer key</li>
                </ul>
              </div>
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5">
                <h3 className="font-bold text-emerald-900 mb-3 flex items-center gap-2">
                  <FileText className="w-4 h-4" /> Full Numbers-Matching Check
                </h3>
                <ul className="space-y-2 text-sm text-emerald-800">
                  <li className="flex gap-2"><Check className="w-4 h-4 flex-shrink-0 mt-0.5 text-emerald-600" /> Crosses VIN data against physical casting &amp; stamping numbers</li>
                  <li className="flex gap-2"><Check className="w-4 h-4 flex-shrink-0 mt-0.5 text-emerald-600" /> Confirms engine, transmission, and axle are original</li>
                  <li className="flex gap-2"><Check className="w-4 h-4 flex-shrink-0 mt-0.5 text-emerald-600" /> Backed by marque registry and build-sheet documentation</li>
                  <li className="flex gap-2"><Check className="w-4 h-4 flex-shrink-0 mt-0.5 text-emerald-600" /> The standard for high-value collector transactions</li>
                </ul>
              </div>
            </div>
            <p className="mt-4 text-slate-600 leading-relaxed">
              The VIN decode is one layer. A complete numbers-matching verification crosses the VIN data
              against the actual stamped and cast numbers on the components, and confirms each casting&rsquo;s
              production date and plant for the model year. Pair your decode with our full{" "}
              <Link href="/vin-check" className="text-primary-600 hover:underline font-medium">VIN history report</Link>{" "}
              and an{" "}
              <Link href="/accident-history-check" className="text-primary-600 hover:underline font-medium">accident history check</Link>{" "}
              to document the vehicle&rsquo;s known history alongside its factory configuration.
            </p>
          </section>

          {/* ── Resources ── */}
          <section className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900">
              Resources for Classic Car Owners
            </h2>
            <p className="mt-3 text-slate-600 leading-relaxed">
              Classic car owners have access to specialized resources beyond general VIN check services.
              Marque-specific registries — like Pontiac Historic Services (PHS) for Pontiac vehicles,
              Marti Auto Works for Ford Mustangs, and Chrysler broadcast-sheet data services — provide
              manufacturer-generated documentation tied to individual VINs that goes beyond what general
              databases contain.
            </p>
            <p className="mt-3 text-slate-600 leading-relaxed">
              These registry services often supply reproduction build sheets, window-sticker data, and
              factory documentation that can accompany a vehicle through transactions and auctions. For
              high-value collector cars, this manufacturer-sourced documentation can add thousands of
              dollars to a vehicle&rsquo;s market value by providing indisputable provenance.
            </p>
            <p className="mt-3 text-slate-600 leading-relaxed">
              For complete due diligence on any classic car purchase, also run a{" "}
              <Link href="/stolen-vehicle-check" className="text-primary-600 hover:underline font-medium">stolen vehicle check</Link>{" "}
              and a{" "}
              <Link href="/salvage-title-check" className="text-primary-600 hover:underline font-medium">salvage title check</Link>{" "}
              to verify clean ownership and title history.
            </p>
          </section>

          {/* ── FAQ ── */}
          <section id="faq" className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              Frequently Asked Questions
            </h2>
            <dl className="space-y-6">
              {FAQS.map((faq) => (
                <div key={faq.question}>
                  <dt className="font-bold text-slate-900">{faq.question}</dt>
                  <dd className="mt-1.5 text-slate-600 leading-relaxed">{faq.answer}</dd>
                </div>
              ))}
            </dl>
          </section>

          {/* ── Sources & References ──
              Classic-car VIN authenticity rests on federal VIN standardization
              history and a set of manufacturer/marque registries. Naming each in
              an outbound citation block boosts AI-search citation rate (~40% per
              Princeton GEO research) and signals E-E-A-T topical authority.
              `nofollow` on all links — evidence citations, not endorsements. */}
          <section className="mt-14 py-8 px-6 sm:px-8 bg-slate-50 border border-slate-200 rounded-2xl">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              Classic Car VIN — Sources &amp; References
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              The standardized VIN, its pre-1981 history, and classic-car authenticity verification draw
              on federal regulation and manufacturer-specific registries. The references below are the
              authoritative origins behind the claims on this page.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              {[
                { href: "https://www.ecfr.gov/current/title-49/subtitle-B/chapter-V/part-565", label: "49 CFR Part 565 — Vehicle Identification Number Requirements", note: "Federal rule that established the standardized 17-character VIN for model year 1981." },
                { href: "https://www.nhtsa.gov/", label: "NHTSA — National Highway Traffic Safety Administration", note: "Agency that mandated and administers the modern VIN standard." },
                { href: "https://vpic.nhtsa.dot.gov/decoder/", label: "NHTSA vPIC VIN Decoder", note: "Federal reference decoder; coverage is strongest for standardized 1981-and-newer VINs." },
                { href: "https://www.phs-online.com/", label: "Pontiac Historic Services (PHS)", note: "Marque registry providing factory build documentation tied to Pontiac VINs." },
                { href: "https://www.martiauto.com/", label: "Marti Auto Works", note: "Ford-authorized production records and build sheets for 1967-onward Ford vehicles." },
                { href: "https://vehiclehistory.bja.ojp.gov/", label: "NMVTIS — Bureau of Justice Assistance", note: "Federal title and brand system; useful mainly for post-1981 standardized VINs." },
              ].map((s) => (
                <li key={s.href} className="rounded-xl border border-slate-200 bg-white p-4">
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 font-semibold underline underline-offset-2 hover:text-primary-700"
                  >
                    {s.label} ↗
                  </a>
                  <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">{s.note}</p>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-xs text-slate-500 italic">
              Pre-1981 VIN decoding depends on year-specific manufacturer keys; modern database coverage
              (NMVTIS, history reports) is built around the standardized 17-character VIN and is limited
              for older vehicles.
            </p>
          </section>

          {/* ── Related tools ── */}
          <div className="mt-14">
            <RelatedChecks exclude="/classic-car-vin" />
          </div>
        </div>
      </main>

      {/* ── Bottom CTA ── */}
      <section className="py-14 bg-slate-50 border-t border-slate-200">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Decode Any Classic Car VIN
          </h2>
          <p className="text-slate-700 mb-6">
            Enter a pre-1981 or modern VIN to decode factory specifications, engine codes, and
            production data for any vintage vehicle.
          </p>
          <VinSearchForm size="sm" />
        </div>
      </section>
    </>
  );
}
