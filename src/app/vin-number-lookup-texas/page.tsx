/**
 * /vin-number-lookup-texas
 *
 * Texas-specific VIN lookup landing page targeting:
 *   - "vin lookup texas" (2.9K monthly US)
 *   - "vin number lookup texas" (1.3K monthly US)
 *
 * Mirrors the JSON-LD structure of /flood-check (WebApplication, Article,
 * FAQPage, HowTo, BreadcrumbList, WebPage/speakable).
 */

import type { Metadata } from "next";
import VinNumberLookupTexasBody, {
  FAQS_EN,
} from "@/components/VinNumberLookupTexasBody";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";

export const metadata: Metadata = {
  title:
    "VIN Number Lookup Texas — Free TxDMV Title History Check",
  description:
    "Free Texas VIN lookup using TxDMV and NMVTIS data. Instant title brands, flood damage, salvage, accidents and recalls — no signup, no $5.45 record fee.",
  keywords: [
    "vin lookup texas",
    "vin number lookup texas",
    "texas vin check",
    "txdmv vin lookup",
    "texas dmv vin check",
    "free texas vin lookup",
    "houston flood car vin check",
    "texas title check by vin",
    "texas salvage title check",
  ],
  alternates: {
    canonical: "/vin-number-lookup-texas",
  },
  openGraph: {
    title:
      "VIN Number Lookup Texas — Free TxDMV Title History Check",
    description:
      "Free Texas VIN lookup with TxDMV + NMVTIS data. Title brands, flood damage, salvage, accidents and recalls — instant, no signup.",
    url: `${SITE}/vin-number-lookup-texas`,
    type: "article",
    siteName: "CarCheckerVIN",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "VIN Number Lookup Texas — Free TxDMV Title History Check",
    description:
      "Free Texas VIN lookup with TxDMV + NMVTIS data. Title brands, flood, salvage, accidents, recalls — instant.",
  },
  robots: { index: true, follow: true },
};

/* ── JSON-LD schemas ───────────────────────────────────────── */

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "VIN Number Lookup Texas",
  url: `${SITE}/vin-number-lookup-texas`,
  applicationCategory: "AutomotiveApplication",
  operatingSystem: "All",
  description:
    "Free Texas VIN lookup tool that surfaces TxDMV title brands, Gulf Coast flood damage, salvage records, accident history, odometer readings, and open NHTSA recalls using NMVTIS-aggregated data.",
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
  headline:
    "VIN Number Lookup Texas — Free TxDMV Title History Check",
  description:
    "Comprehensive guide to running a free Texas VIN lookup. Covers TxDMV title brands, Form VTR-275, Houston / Gulf Coast flood-car risk after Harvey and Beryl, and how to verify any Texas VIN.",
  author: ORG_AUTHOR,
  publisher: {
    "@type": "Organization",
    name: "CarCheckerVIN",
    url: SITE,
    logo: { "@type": "ImageObject", url: `${SITE}/logo.png` },
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${SITE}/vin-number-lookup-texas`,
  },
  datePublished: "2026-06-28",
  dateModified: "2026-06-28",
  image: `${SITE}/opengraph-image`,
  about: {
    "@type": "Place",
    name: "Texas",
    sameAs: "https://en.wikipedia.org/wiki/Texas",
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
  name: "How to Look Up a VIN in Texas",
  description:
    "Step-by-step guide to running a Texas VIN lookup for TxDMV title brands, flood damage, salvage records, and vehicle history.",
  totalTime: "PT2M",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Locate the 17-character VIN",
      text: "Find the VIN on the lower-left of the dashboard (visible through the windshield), the driver-side door jamb sticker, or the Texas Certificate of Title. Confirm all three locations match.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter the VIN",
      text: "Type or paste the 17-character VIN into the search tool at the top of the Texas VIN lookup page.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Run the free lookup",
      text: "Click Check VIN. The lookup queries TxDMV-linked NMVTIS data plus NICB, NHTSA, and insurance sources in parallel.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Review Texas title brands",
      text: "Look first for any Texas Title Manual brand: Salvage, Nonrepairable, Reconstructed, Flood Damage, or Rebuilt. These brands follow the VIN nationally.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Order a VTR-275 only if needed",
      text: "For most pre-purchase decisions the free Texas VIN lookup is enough. Order a certified TxDMV record via Form VTR-275 only when you need a legally certified document.",
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
      name: "VIN Number Lookup Texas",
      item: `${SITE}/vin-number-lookup-texas`,
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
  url: `${SITE}/vin-number-lookup-texas`,
};

export default function VinNumberLookupTexasPage() {
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
      <VinNumberLookupTexasBody />
    </>
  );
}
