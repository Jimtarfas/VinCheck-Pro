/**
 * Wave 18.18 (batch 2) — English free-vin-check guide. Slim wrapper around
 * the shared GuideFreeVinCheckBody. ES counterpart at /es/guides/free-vin-check.
 */

import type { Metadata } from "next";
import GuideFreeVinCheckBody, { FAQS_EN } from "@/components/GuideFreeVinCheckBody";
import { hreflangAlternates } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/guides/free-vin-check`;
const alt = hreflangAlternates("/guides/free-vin-check");

export const metadata: Metadata = {
  title: "Free VIN Check — Decode Any VIN Number for Free",
  description:
    "Run a free VIN check to decode any vehicle identification number. See what free VIN checks include, how they compare to premium reports, and why every buyer should use one.",
  keywords: [
    "free VIN check",
    "free VIN decoder",
    "check VIN for free",
    "free vehicle history",
    "VIN lookup free",
    "decode VIN free",
    "free car check",
    "VIN report free",
  ],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: {
    title: "Free VIN Check — Decode Any VIN Number for Free",
    description:
      "Run a free VIN check to decode any vehicle identification number. See what's included in free vs. premium VIN reports.",
    url: PAGE_URL,
    type: "article",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  inLanguage: "en",
  headline: "Free VIN Check — Decode Any VIN Number for Free",
  description:
    "Run a free VIN check to decode any vehicle identification number. Learn what free checks include and how they compare to premium reports.",
  author: ORG_AUTHOR,
  publisher: {
    "@type": "Organization",
    name: "CarCheckerVIN",
    url: SITE,
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": PAGE_URL,
  },
  datePublished: "2026-04-16",
  dateModified: new Date().toISOString().slice(0, 10),
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

export default function FreeVinCheckPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <GuideFreeVinCheckBody locale="en" />
    </>
  );
}
