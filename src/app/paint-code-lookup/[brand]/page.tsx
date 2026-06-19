import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  MapPin,
  Tag,
  Hash,
  Palette,
  Lock,
  ChevronRight,
  ArrowRight,
  Search,
  AlertCircle,
  Lightbulb,
  Brush,
  Camera,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";
import { PAINT_CODE_BRANDS, findBrand } from "@/lib/paint-codes";
import { hreflangAlternates } from "@/lib/seo/hreflang";

const SITE = "https://www.carcheckervin.com";

interface Props {
  params: Promise<{ brand: string }>;
}

export async function generateStaticParams() {
  return PAINT_CODE_BRANDS.map((b) => ({ brand: b.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { brand: slug } = await params;
  const brand = findBrand(slug);
  if (!brand) return { title: "Paint Code Lookup" };

  // Title leads with the exact question searchers type ("where is the
  // {brand} paint code"). Layout appends " | CarCheckerVIN", so keep the
  // stem short enough that the brand name + suffix stays under ~62c.
  const title = `Where Is the ${brand.name} Paint Code? Location + Chart`;
  const description = `Find your ${brand.name} paint code fast. Exact sticker location (${brand.primaryLocation.split("—")[0].trim()}), what the label says, code format, and real ${brand.name} color code examples. Or look it up free by VIN.`;

  return {
    title,
    description,
    keywords: [
      `${brand.name} paint code`,
      `${brand.name} color code`,
      `where is ${brand.name} paint code`,
      `${brand.name} paint code location`,
      `${brand.name} paint code by VIN`,
      `${brand.name} touch up paint code`,
    ],
    alternates: hreflangAlternates(`/paint-code-lookup/${brand.slug}`),
    openGraph: {
      title: `${brand.name} Paint Code — Where to Find It & How to Read It`,
      description,
      type: "article",
      url: `${SITE}/paint-code-lookup/${brand.slug}`,
      siteName: "CarCheckerVIN",
    },
    twitter: {
      card: "summary_large_image",
      title: `${brand.name} Paint Code — Location & Color Chart`,
      description,
    },
    robots: { index: true, follow: true },
  };
}

export default async function BrandPaintCodePage({ params }: Props) {
  const { brand: slug } = await params;
  const brand = findBrand(slug);
  if (!brand) notFound();

  const url = `${SITE}/paint-code-lookup/${brand.slug}`;
  const allLocations = [brand.primaryLocation, ...brand.secondaryLocations];

  // FAQ is the single source of truth — rendered as visible accordions and
  // as FAQPage JSON-LD so the two can never drift apart.
  const faqs = [
    {
      q: `Where is the paint code on a ${brand.name}?`,
      a: `On a ${brand.name}, the paint code is at the ${brand.primaryLocation}. Look for the label marked "${brand.stickerLabel}". If that sticker is faded or missing, check ${brand.secondaryLocations.join(" or ").toLowerCase()}.`,
    },
    {
      q: `What does a ${brand.name} paint code look like?`,
      a: `${brand.codeFormat}. The typical pattern is ${brand.codePattern}. For example, ${brand.examples
        .slice(0, 2)
        .map((e) => `${e.code} is ${e.colorName}`)
        .join(", and ")}.`,
    },
    {
      q: `Can I find my ${brand.name} paint code with just the VIN?`,
      a: `Yes. The factory paint code is recorded against the VIN in ${brand.name}'s build database, so a VIN-based lookup returns the original color code even when the physical door jamb sticker is damaged, faded, or was replaced during repair. Enter your VIN in the form above.`,
    },
    {
      q: `What is the difference between the ${brand.name} paint code and the color name?`,
      a: `The color name (e.g., "${brand.examples[0].colorName}") is marketing copy that ${brand.name} may reuse across model years with small formula changes. The paint code (${brand.examples[0].code}) is tied to one specific formulation — it is what a paint supplier needs to mix an exact match.`,
    },
    {
      q: `How do I use my ${brand.name} paint code for touch-up?`,
      a: `Give the code — not the color name — to any paint supplier, dealer parts counter, or body shop. They mix to the code. For pearl or tri-coat ${brand.name} finishes, a single touch-up pen won't match the depth; those need a base + mid-coat + clear process.`,
    },
    {
      q: `My ${brand.name} was repainted and the sticker is gone — what now?`,
      a: `Run a VIN-based paint code lookup. The factory code is locked to the VIN at manufacture, so it survives a respray or a replaced door. If the car's current color doesn't match the factory code returned, the vehicle was repainted — worth pairing with an accident history check to find out why.`,
    },
  ];

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      {
        "@type": "ListItem",
        position: 2,
        name: "Paint Code Lookup",
        item: `${SITE}/paint-code-lookup`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `${brand.name} Paint Code`,
        item: url,
      },
    ],
  };

  const webPageLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${brand.name} Paint Code — Location & Color Code Chart`,
    description: `Where to find the ${brand.name} paint code, how to read it, and real ${brand.name} factory color code examples. Free VIN-based lookup.`,
    url,
    isPartOf: {
      "@type": "WebSite",
      name: "CarCheckerVIN",
      url: SITE,
    },
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const howToLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How to Find the Paint Code on a ${brand.name}`,
    description: `Step-by-step guide to locating the factory paint code on a ${brand.name}.`,
    totalTime: "PT2M",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Go to the primary location",
        text: `Open the driver's door and find the ${brand.primaryLocation}.`,
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Find the right label",
        text: `Look for the row labeled "${brand.stickerLabel}". On a ${brand.name} the code follows the pattern ${brand.codePattern}.`,
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Check backup locations if needed",
        text: `If the sticker is unreadable, check ${brand.secondaryLocations.join(" or ").toLowerCase()}.`,
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "Fall back to a VIN lookup",
        text: `If no sticker is legible, run a VIN-based paint code lookup — the factory ${brand.name} code is permanently linked to the VIN.`,
      },
    ],
  };

  const speakableLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", ".speakable-answer"],
    },
    url,
  };

  const otherBrands = PAINT_CODE_BRANDS.filter((b) => b.slug !== brand.slug);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableLd) }} />

      <article className="pb-16 bg-surface">
        {/* ── Hero ─────────────────────────────────────────── */}
        <div className="bg-primary text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-24 pb-14 sm:pt-28 sm:pb-18">
            <Breadcrumbs
              onDark
              items={[
                { label: "Home", href: "/" },
                { label: "Paint Code Lookup", href: "/paint-code-lookup" },
                { label: brand.name },
              ]}
            />

            <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
              <Palette className="w-4 h-4" /> {brand.name} OEM Paint Code
            </div>

            <h1 className="text-3xl sm:text-5xl font-headline font-extrabold leading-tight mb-4">
              Where Is the {brand.name} Paint Code?
            </h1>

            {/* Direct, quotable answer — the passage AI overviews and voice
                assistants lift verbatim. */}
            <p className="speakable-answer text-base sm:text-xl text-white/85 max-w-3xl mb-8 leading-relaxed">
              On a {brand.name}, the paint code is at the{" "}
              <strong className="text-white">{brand.primaryLocation}</strong>,
              printed on the label marked &ldquo;{brand.stickerLabel}&rdquo;. The
              code follows the pattern {brand.codePattern}. If the sticker is
              missing or faded, look it up by VIN below.
            </p>

            <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-xl">
              <h2 className="text-base sm:text-lg font-headline font-extrabold text-primary mb-1">
                Get Your {brand.name} Paint Code by VIN
              </h2>
              <p className="text-xs sm:text-sm text-on-surface-variant mb-4">
                Enter any 17-character VIN — we&apos;ll return the OEM paint code
                and factory color name from the build record.
              </p>
              <VinSearchForm size="lg" />
              <p className="mt-3 text-[11px] text-slate-400 flex items-center gap-1.5">
                <Lock className="w-3 h-3" /> Free · No sign-up · Instant result
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* ── Where to find it ─────────────────────────────── */}
          <section className="py-12 sm:py-16">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              {brand.name} Paint Code Location — Every Spot to Check
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl">
              {brand.name} prints the paint code in one main spot and backs it up
              in a couple of others. Start at the top of this list and work down
              if the label is hard to read.
            </p>
            <ol className="space-y-3">
              {allLocations.map((loc, i) => (
                <li
                  key={loc}
                  className="flex gap-4 items-start rounded-2xl border border-outline-variant bg-surface-container-lowest p-5"
                >
                  <div
                    className={`flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-sm font-black ${
                      i === 0 ? "bg-primary text-white" : "bg-primary/10 text-primary"
                    }`}
                  >
                    {i + 1}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-[11px] font-black uppercase tracking-wider text-primary/70">
                        {i === 0 ? "Primary location" : "Backup location"}
                      </span>
                    </div>
                    <p className="text-sm sm:text-base text-on-surface font-medium leading-relaxed">
                      {loc}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-outline-variant bg-surface p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Tag className="w-4 h-4 text-primary" />
                  <h3 className="text-sm font-headline font-extrabold text-primary">
                    What the label says
                  </h3>
                </div>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Look for the row marked{" "}
                  <code className="font-mono text-xs bg-surface-container-low rounded px-1.5 py-0.5 text-primary">
                    {brand.stickerLabel}
                  </code>
                  . That&apos;s the line that carries the {brand.name} color code.
                </p>
              </div>
              <div className="rounded-2xl border border-outline-variant bg-surface p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Hash className="w-4 h-4 text-primary" />
                  <h3 className="text-sm font-headline font-extrabold text-primary">
                    Code format
                  </h3>
                </div>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  {brand.codeFormat}. Pattern:{" "}
                  <code className="font-mono text-xs bg-surface-container-low rounded px-1.5 py-0.5 text-primary">
                    {brand.codePattern}
                  </code>
                  .
                </p>
              </div>
            </div>
          </section>

          {/* ── Example codes ────────────────────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              Common {brand.name} Paint Codes & Color Names
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl">
              A few well-known {brand.name} factory codes so you know what to
              expect on the sticker. Your exact code depends on the model year —
              always confirm against your own vehicle or VIN.
            </p>
            <div className="overflow-x-auto rounded-2xl border border-outline-variant">
              <table className="w-full border-collapse min-w-[420px] text-sm">
                <thead className="bg-surface-container-low">
                  <tr>
                    <th className="p-4 text-left font-headline font-extrabold text-primary">
                      Paint Code
                    </th>
                    <th className="p-4 text-left font-headline font-extrabold text-primary">
                      Factory Color Name
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {brand.examples.map((ex) => (
                    <tr
                      key={ex.code}
                      className="border-t border-outline-variant/60"
                    >
                      <td className="p-4">
                        <code className="font-mono text-sm bg-surface-container-low rounded px-2 py-1 text-primary font-bold tracking-wider">
                          {ex.code}
                        </code>
                      </td>
                      <td className="p-4 text-on-surface font-medium">
                        {ex.colorName}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* ── Brand-specific tips ──────────────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              {brand.name} Paint Code Tips
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl">
              The quirks worth knowing before you order paint for a {brand.name}.
            </p>
            <div className="space-y-3">
              {brand.tips.map((tip) => (
                <div
                  key={tip}
                  className="flex gap-3 items-start rounded-2xl border border-outline-variant bg-surface-container-lowest p-5"
                >
                  <div className="w-9 h-9 rounded-xl bg-secondary-container/50 flex items-center justify-center flex-shrink-0">
                    <Lightbulb className="w-4 h-4 text-on-secondary-container" />
                  </div>
                  <p className="text-sm text-on-surface leading-relaxed">{tip}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── Sticker missing → VIN ────────────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">
              {brand.name} Sticker Missing or Faded? Use the VIN.
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
                <p>
                  Door jamb stickers fade in the sun, get peeled during
                  detailing, or disappear when a door is replaced after a
                  collision. When the {brand.name} label is gone, the VIN is the
                  reliable way back to the factory paint code.
                </p>
                <p>
                  Every {brand.name} build record carries the factory paint code,
                  locked to the VIN at manufacture. Our free VIN check pulls that
                  record so you can order touch-up, brief a body shop, or verify
                  the current color matches the factory original.
                </p>
                <p>
                  Buying a used {brand.name}? If the current color doesn&apos;t
                  match the factory code, the car was repainted — worth an{" "}
                  <Link
                    href="/accident-history-check"
                    className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80"
                  >
                    accident history check
                  </Link>{" "}
                  to find out why.
                </p>
              </div>
              <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <AlertCircle className="w-5 h-5 text-primary" />
                  <h3 className="font-headline font-extrabold text-primary">
                    Look up your {brand.name} code by VIN
                  </h3>
                </div>
                <p className="text-sm text-on-surface-variant mb-4">
                  No sticker needed — the factory code comes straight from the
                  build record.
                </p>
                <div className="rounded-xl bg-white p-4 border border-outline-variant">
                  <VinSearchForm size="sm" />
                </div>
              </div>
            </div>
          </section>

          {/* ── What to do with the code ─────────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              What to Do With Your {brand.name} Paint Code
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl">
              Once you have the code, here&apos;s how to put it to work.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                  <Brush className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-base font-headline font-extrabold text-primary mb-1.5">
                  Order touch-up paint
                </h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Give the code to a {brand.name} parts counter or a touch-up
                  supplier. For pearl/metallic finishes, ask for the matching
                  base + clear so the repair doesn&apos;t flatten out.
                </p>
              </div>
              <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                  <Camera className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-base font-headline font-extrabold text-primary mb-1.5">
                  Save it for later
                </h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Photograph the {brand.name} sticker in good light and store it
                  with your documents. The code stays the same for the life of
                  the car — no more trips back to the driveway.
                </p>
              </div>
            </div>
          </section>

          {/* ── Other brands ─────────────────────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-6">
              Paint Code Location for Other Brands
            </h2>
            <div className="flex flex-wrap gap-2">
              {otherBrands.map((b) => (
                <Link
                  key={b.slug}
                  href={`/paint-code-lookup/${b.slug}`}
                  className="px-4 py-2 bg-surface text-on-surface text-sm rounded-xl border border-outline-variant hover:border-primary/40 hover:bg-primary/5 hover:text-primary transition-all font-medium"
                >
                  {b.name}
                </Link>
              ))}
            </div>
            <Link
              href="/paint-code-lookup"
              className="inline-flex items-center gap-1.5 mt-6 text-primary font-semibold text-sm hover:text-primary/80 transition-colors"
            >
              View the full paint code locator <ArrowRight className="w-4 h-4" />
            </Link>
          </section>

          {/* ── Sources & References — named citations lift AI-search
              citation rate; nofollow because these are references, not
              endorsements. ─────────────────────────────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-3">
              {brand.name} Paint Code — Sources & References
            </h2>
            <p className="text-sm text-on-surface-variant mb-6 leading-relaxed max-w-3xl">
              {brand.name} color codes trace back to factory build records and
              OEM service literature. The references below are the authoritative
              origins behind {brand.name} VIN, paint, and history data in the
              United States.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              {[
                {
                  href: "https://vpic.nhtsa.dot.gov/decoder/",
                  label: "NHTSA VIN Decoder",
                  note: `Federal reference decoder for ${brand.name} VIN structure.`,
                },
                {
                  href: "https://www.nhtsa.gov/recalls",
                  label: "NHTSA — Safety Recalls",
                  note: `Open ${brand.name} recall lookup by VIN.`,
                },
                {
                  href: "https://vehiclehistory.bja.ojp.gov/",
                  label: "NMVTIS — Bureau of Justice Assistance",
                  note: `Federal title-brand database covering every ${brand.name} across all 50 states.`,
                },
                {
                  href: "https://www.epa.gov/",
                  label: "EPA",
                  note: `Coatings and VOC standards behind OEM ${brand.name} paint formulations.`,
                },
              ].map((s) => (
                <li
                  key={s.href}
                  className="rounded-xl border border-outline-variant bg-surface-container-lowest p-4"
                >
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80"
                  >
                    {s.label} ↗
                  </a>
                  <p className="mt-1.5 text-xs text-on-surface-variant leading-relaxed">
                    {s.note}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          {/* ── FAQ ──────────────────────────────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-8">
              {brand.name} Paint Code — Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {faqs.map((f) => (
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

          {/* ── CTA ──────────────────────────────────────────── */}
          <section className="py-14 sm:py-20 text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-xs font-black uppercase tracking-wider mb-4">
              <Search className="w-3.5 h-3.5" /> Free · Instant · OEM Source
            </div>
            <h2 className="text-2xl sm:text-4xl font-headline font-extrabold text-primary mb-3">
              Get Your {brand.name} Paint Code in Seconds
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl mx-auto mb-8">
              Enter a 17-character VIN to retrieve the factory {brand.name} paint
              code and color name — for touch-up, body shop matching, or to
              verify a respray on a used vehicle.
            </p>
            <div className="max-w-xl mx-auto bg-surface-container-low rounded-2xl p-5 border border-outline-variant">
              <VinSearchForm size="lg" />
            </div>
            <div className="mt-3 flex items-center justify-center gap-2 text-xs text-on-surface-variant">
              <ChevronRight className="w-3.5 h-3.5 text-primary" />
              No credit card · No sign-up · Free
            </div>
          </section>

          <RelatedChecks exclude="/paint-code-lookup" />
        </div>
      </article>
    </>
  );
}
