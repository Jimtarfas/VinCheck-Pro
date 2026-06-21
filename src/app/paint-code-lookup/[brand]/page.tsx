import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PaintCodeBrandBody from "@/components/PaintCodeBrandBody";
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

  // FAQ is the single source of truth — rendered as visible accordions and
  // as FAQPage JSON-LD so the two can never drift apart. Keep this list
  // byte-equivalent with the COPY.en.faqBuilder output in
  // src/components/PaintCodeBrandBody.tsx.
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

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableLd) }} />

      <PaintCodeBrandBody brandSlug={slug} locale="en" />
    </>
  );
}
