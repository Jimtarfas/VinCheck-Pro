import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BuildSheetBrandBody from "@/components/BuildSheetBrandBody";
import { ORG_AUTHOR } from "@/lib/seo/author";
import { BUILD_SHEET_BRANDS, findBuildSheetBrand } from "@/lib/build-sheets";
import { hreflangAlternates } from "@/lib/seo/hreflang";

const SITE = "https://www.carcheckervin.com";

interface Props {
  params: Promise<{ brand: string }>;
}

export async function generateStaticParams() {
  return BUILD_SHEET_BRANDS.map((b) => ({ brand: b.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { brand: slug } = await params;
  const brand = findBuildSheetBrand(slug);
  if (!brand) return { title: "Build Sheet by VIN" };

  // Layout appends " | CarCheckerVIN" (~17c) — keep the stem tight so the
  // brand name + suffix stays inside Google's ~62c snippet.
  const title = `${brand.name} Build Sheet by VIN — Free Decoder`;
  const description = `Look up a ${brand.name} build sheet by VIN, free. Decode the ${brand.docName}: factory options, paint and interior codes, engine, transmission, and assembly plant from the original build record.`;

  return {
    title,
    description,
    keywords: [
      `${brand.name} build sheet`,
      `${brand.name} build sheet by VIN`,
      `${brand.name} factory options by VIN`,
      `${brand.name} option codes`,
      `${brand.name} paint code by VIN`,
      `${brand.name} VIN decoder`,
    ],
    alternates: hreflangAlternates(`/build-sheet/${brand.slug}`),
    openGraph: {
      title: `${brand.name} Build Sheet by VIN — ${brand.docName}`,
      description,
      url: `${SITE}/build-sheet/${brand.slug}`,
      type: "article",
      siteName: "CarCheckerVIN",
    },
    twitter: {
      card: "summary_large_image",
      title: `${brand.name} Build Sheet by VIN`,
      description,
    },
    robots: { index: true, follow: true },
  };
}

export default async function BrandBuildSheetPage({ params }: Props) {
  const { brand: slug } = await params;
  const brand = findBuildSheetBrand(slug);
  if (!brand) notFound();

  const url = `${SITE}/build-sheet/${brand.slug}`;

  // Single source of truth: FAQ JSON-LD must stay byte-equivalent with the
  // COPY.en.faqBuilder output in src/components/BuildSheetBrandBody.tsx.
  const faqs = [
    {
      q: `What is a ${brand.name} build sheet?`,
      a: `A ${brand.name} build sheet is the ${brand.docName} — the factory record of how a single vehicle was originally specified. ${brand.summary.replace(/^A[n]? [^—]+—\s*/, "It is ")} It documents ${brand.contains.slice(0, 3).join(", ").toLowerCase()}, and more.`,
    },
    {
      q: `How do I find a ${brand.name} build sheet by VIN?`,
      a: `Enter the 17-character VIN in the form above. The VIN fixes the model year, assembly plant, and body style, which is what lets the ${brand.docName} decode correctly. You can find the VIN on the dashboard, the driver-side door jamb, the title, or the registration.`,
    },
    {
      q: `What do ${brand.name} option codes look like?`,
      a: `${brand.optionCodeFormat}`,
    },
    {
      q: `Where is the ${brand.name} build data located?`,
      a: `On a ${brand.name}, the build data is found in these places: ${brand.whereToFind.join("; ")}.`,
    },
    {
      q: `Why do ${brand.name} buyers and collectors check the build sheet?`,
      a: `The build record is how you confirm a factory option, package, or color was fitted at the factory rather than added later — which directly affects what a ${brand.name} is worth. ${brand.sourceName} is the authority that ${brand.sourceNote.charAt(0).toLowerCase() + brand.sourceNote.slice(1)}`,
    },
  ];

  const webAppLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: `${brand.name} Build Sheet by VIN`,
    url,
    applicationCategory: "AutomotiveApplication",
    operatingSystem: "All",
    description: `Retrieve a ${brand.name} factory build record by VIN — the ${brand.docName} with option codes, paint and interior codes, engine, transmission, and assembly plant.`,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    publisher: {
      "@type": "Organization",
      name: "CarCheckerVIN",
      url: SITE,
      logo: { "@type": "ImageObject", url: `${SITE}/logo.png` },
    },
  };

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${brand.name} Build Sheet by VIN — ${brand.docName}`,
    description: `How to read a ${brand.name} build record by VIN: the ${brand.docName}, factory option codes, paint and interior codes, and assembly data.`,
    author: ORG_AUTHOR,
    publisher: {
      "@type": "Organization",
      name: "CarCheckerVIN",
      url: SITE,
      logo: { "@type": "ImageObject", url: `${SITE}/logo.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
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
    name: `How to Read a ${brand.name} Build Sheet by VIN`,
    description: `Decode a ${brand.name} factory build record from the VIN and the ${brand.docName}.`,
    totalTime: "PT3M",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Enter the VIN",
        text: `Read the 17-character VIN from the dash, door jamb, or title and enter it. It anchors the model year, plant, and body style.`,
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: `Locate the ${brand.docName}`,
        text: `Find the build data: ${brand.whereToFind[0]}.`,
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Decode the option and color codes",
        text: `${brand.optionCodeFormat}`,
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "Verify against the factory authority",
        text: `For authenticated original-build confirmation, ${brand.sourceName} ${brand.sourceNote.charAt(0).toLowerCase() + brand.sourceNote.slice(1)}`,
      },
    ],
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      {
        "@type": "ListItem",
        position: 2,
        name: "Build Sheet",
        item: `${SITE}/build-sheet`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `${brand.name} Build Sheet`,
        item: url,
      },
    ],
  };

  const speakableLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", ".speakable-intro"],
    },
    url,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableLd) }} />

      <BuildSheetBrandBody brandSlug={slug} locale="en" />
    </>
  );
}
