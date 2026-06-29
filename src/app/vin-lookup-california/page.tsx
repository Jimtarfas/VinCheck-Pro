/**
 * /vin-lookup-california
 *
 * California-specific VIN lookup landing page targeting:
 *   - "vin lookup california" (1.3K monthly US)
 *
 * Mirrors the 6-JSON-LD shape of /vin-number-lookup-texas
 * (WebApplication, Article, FAQPage, HowTo, BreadcrumbList, WebPage/speakable).
 */

import type { Metadata } from "next";
import VinNumberLookupCaliforniaBody, {
  FAQS_EN,
} from "@/components/VinNumberLookupCaliforniaBody";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";

export const metadata: Metadata = {
  title: "VIN Lookup California — Free CA DMV Title History Check",
  description:
    "Free California VIN lookup using CA DMV and NMVTIS data. Instant title brands, smog history flags, salvage records, accidents and recalls — no signup, no $5 REG 488C fee.",
  keywords: [
    "vin lookup california",
    "california vin check",
    "ca dmv vin lookup",
    "california dmv vin check",
    "free california vin lookup",
    "california salvage title check",
    "california smog history by vin",
    "revived salvage california",
    "california title check by vin",
  ],
  alternates: {
    canonical: "/vin-lookup-california",
  },
  openGraph: {
    title: "VIN Lookup California — Free CA DMV Title History Check",
    description:
      "Free California VIN lookup with CA DMV + NMVTIS data. Title brands, smog history flags, salvage, accidents and recalls — instant, no signup.",
    url: `${SITE}/vin-lookup-california`,
    type: "article",
    siteName: "CarCheckerVIN",
  },
  twitter: {
    card: "summary_large_image",
    title: "VIN Lookup California — Free CA DMV Title History Check",
    description:
      "Free California VIN lookup with CA DMV + NMVTIS data. Title brands, smog, salvage, accidents, recalls — instant.",
  },
  robots: { index: true, follow: true },
};

/* ── JSON-LD schemas ───────────────────────────────────────── */

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "VIN Lookup California",
  url: `${SITE}/vin-lookup-california`,
  applicationCategory: "AutomotiveApplication",
  operatingSystem: "All",
  description:
    "Free California VIN lookup tool that surfaces CA DMV title brands, CARB smog-history flags, coastal salt-air corrosion patterns, wildfire damage, salvage records, accident history, odometer readings, and open NHTSA recalls using NMVTIS-aggregated data.",
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
  inLanguage: "en",
  headline: "VIN Lookup California — Free CA DMV Title History Check",
  description:
    "Comprehensive guide to running a free California VIN lookup. Covers CA DMV Title Brand Manual brands, REG 488C records, CARB smog-history records by VIN, the Revived Salvage retitle process, and coastal-corrosion and wildfire-damage warnings.",
  author: ORG_AUTHOR,
  publisher: {
    "@type": "Organization",
    name: "CarCheckerVIN",
    url: SITE,
    logo: { "@type": "ImageObject", url: `${SITE}/logo.png` },
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${SITE}/vin-lookup-california`,
  },
  datePublished: "2026-06-28",
  dateModified: new Date().toISOString().slice(0, 10),
  image: `${SITE}/opengraph-image`,
  about: {
    "@type": "Place",
    name: "California",
    sameAs: "https://en.wikipedia.org/wiki/California",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  inLanguage: "en",
  mainEntity: FAQS_EN.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  inLanguage: "en",
  name: "How to Look Up a VIN in California",
  description:
    "Step-by-step guide to running a California VIN lookup for CA DMV title brands, smog history, salvage records, and vehicle history.",
  totalTime: "PT2M",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Locate the 17-character VIN",
      text: "Find the VIN on the lower-left of the dashboard (visible through the windshield), the driver-side door jamb sticker, or the California Certificate of Title (pink slip). Confirm all three locations match.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter the VIN",
      text: "Type or paste the 17-character VIN into the search tool at the top of the California VIN lookup page.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Run the free lookup",
      text: "Click Check VIN. The lookup queries CA DMV-linked NMVTIS data plus NICB, NHTSA, CARB-linked smog sources, and insurance sources in parallel.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Review California title brands",
      text: "Look first for any California Title Brand Manual brand: Salvage, Junk, Nonrepairable, Revived Salvage, Dismantled, Flood, or Total Loss Salvage. These brands follow the VIN nationally.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Order a REG 488C only if needed",
      text: "For most pre-purchase decisions the free California VIN lookup is enough. Order a certified CA DMV record via Form REG 488C only when you need a legally certified document.",
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
      name: "VIN Lookup California",
      item: `${SITE}/vin-lookup-california`,
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
  url: `${SITE}/vin-lookup-california`,
};

export default function VinLookupCaliforniaPage() {
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
      <VinNumberLookupCaliforniaBody />
    </>
  );
}
