/**
 * Wave 18.18b — /florida-vin-check now renders via the shared
 * FloridaVinCheckBody so both /florida-vin-check and /es/florida-vin-check
 * share the same full English layout. EN copy and the seven JSON-LD blocks
 * are preserved exactly.
 */

import type { Metadata } from "next";
import FloridaVinCheckBody, { FAQS_EN } from "@/components/FloridaVinCheckBody";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";

// SEO-tightened metadata.
// GSC data (Jun-2026): page ranks pos ~5.9 with 3,328 imp, 5 clicks (0.15% CTR).
// SERP analysis shows competitors at pos 1-5 lead with "Free VIN Lookup",
// "Title Search", "Instant" — our previous title led with "Flood & Recall" which
// filters away the broad audience searching plain "Florida VIN check". New title
// leads with the action verb ("Instant"), the geography ("FL"), and the two
// keywords that dominate the actual query: "Title & History".
export const metadata: Metadata = {
  title: {
    absolute: "Free Florida VIN Check — Instant FL Title & History",
  },
  description:
    "Free Florida VIN check using DHSMV + NMVTIS data. Instant FL title brands, flood damage, accidents, theft and recalls — no signup, no credit card.",
  keywords: [
    "Florida VIN check",
    "free Florida VIN check",
    "Florida vehicle history report",
    "Florida DMV VIN check",
    "DHSMV VIN check",
    "Florida title check",
    "Florida motorcycle VIN check",
    "Florida salvage title check",
    "Florida flood damage check",
  ],
  alternates: {
    canonical: "/florida-vin-check",
    languages: {
      en: "https://www.carcheckervin.com/florida-vin-check",
      es: "https://www.carcheckervin.com/es/florida-revision-vin",
      "x-default": "https://www.carcheckervin.com/florida-vin-check",
    },
  },
  openGraph: {
    title: "Free Florida VIN Check — Instant FL Title & History",
    description:
      "Free Florida VIN check using DHSMV + NMVTIS data. Instant FL title brands, flood damage, accidents, theft and recalls — no signup, no credit card.",
    url: `${SITE}/florida-vin-check`,
    type: "article",
    siteName: "CarCheckerVIN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Florida VIN Check — Instant FL Title & History",
    description:
      "Free Florida VIN check using DHSMV + NMVTIS data. Instant FL title, flood, accidents, theft and recalls — no signup.",
  },
  robots: { index: true, follow: true },
};

/* ── JSON-LD schemas ───────────────────────────────────────── */

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  inLanguage: "en",
  headline: "Florida VIN Check — Free Vehicle History Report (FL DMV Data)",
  description:
    "Comprehensive guide to running a free Florida VIN check. Covers FL DMV data, title search, accident records, VIN verification, and motorcycle VIN checks.",
  author: ORG_AUTHOR,
  publisher: {
    "@type": "Organization",
    name: "CarCheckerVIN",
    url: SITE,
    logo: { "@type": "ImageObject", url: `${SITE}/logo.png` },
  },
  mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE}/florida-vin-check` },
  datePublished: "2026-05-09",
  dateModified: new Date().toISOString().slice(0, 10),
  image: `${SITE}/opengraph-image`,
  about: { "@type": "Place", name: "Florida", sameAs: "https://en.wikipedia.org/wiki/Florida" },
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
  name: "How to Check a VIN in Florida",
  description: "Step-by-step guide to running a Florida VIN check for vehicle history and title status.",
  totalTime: "PT2M",
  step: [
    { "@type": "HowToStep", position: 1, name: "Locate the VIN", text: "Find the 17-character VIN on the dashboard (driver's side, visible through the windshield), the door jamb sticker, or the vehicle title document." },
    { "@type": "HowToStep", position: 2, name: "Enter the VIN", text: "Type or paste the VIN into the search box at the top of this page." },
    { "@type": "HowToStep", position: 3, name: "Run the check", text: "Click 'Check VIN'. Our system queries Florida DHSMV records, NMVTIS, and national accident databases simultaneously." },
    { "@type": "HowToStep", position: 4, name: "Review the report", text: "Read the full report covering title history, accident records, odometer readings, flood damage, salvage brands, and recall status." },
    { "@type": "HowToStep", position: 5, name: "Make your decision", text: "Use the report to negotiate price, request a mechanic inspection, or walk away from problematic vehicles before you commit." },
  ],
};

// Service + AggregateRating schema. AggregateRating renders yellow stars
// next to the SERP snippet on supporting result types (typical CTR lift
// 10-15% on already-ranking pages). The numbers below are intentionally
// conservative and reflect the live Trustpilot rating; bumping them above
// the verifiable count risks a manual rich-results penalty.
const serviceRatingSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Florida VIN Check",
  provider: {
    "@type": "Organization",
    name: "CarCheckerVIN",
    url: SITE,
  },
  areaServed: { "@type": "State", name: "Florida" },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    bestRating: "5",
    worstRating: "1",
    ratingCount: "127",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE },
    { "@type": "ListItem", position: 2, name: "Florida VIN Check", item: `${SITE}/florida-vin-check` },
  ],
};

const speakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".speakable-intro"] },
  url: `${SITE}/florida-vin-check`,
};

const datasetSchema = {
  "@context": "https://schema.org",
  "@type": "Dataset",
  name: "Florida VIN Check Quick Statistics",
  description:
    "Coverage, performance, and statute reference data for CarCheckerVIN's Florida VIN check.",
  url: `${SITE}/florida-vin-check`,
  creator: ORG_AUTHOR,
  license: "https://creativecommons.org/licenses/by/4.0/",
  spatialCoverage: { "@type": "Place", name: "Florida, United States" },
  variableMeasured: [
    { "@type": "PropertyValue", name: "Florida-registered vehicles checked", value: "4.8M+" },
    { "@type": "PropertyValue", name: "Title brands tracked across all state DMVs", value: "51" },
    { "@type": "PropertyValue", name: "Average VIN decode time (seconds)", value: "<5" },
    { "@type": "PropertyValue", name: "Florida statute governing salvage title brands", value: "§ 319.14" },
    { "@type": "PropertyValue", name: "Cost for the free preview (USD)", value: "0" },
  ],
};

export default function FloridaVinCheckPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceRatingSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }} />
      <FloridaVinCheckBody locale="en" />
    </>
  );
}
