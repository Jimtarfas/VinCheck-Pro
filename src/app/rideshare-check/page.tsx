/**
 * Wave 18 batch 4 — English rideshare-check. Body is shared via
 * RideshareCheckBody so /es/rideshare-check renders the same full layout.
 */

import type { Metadata } from "next";
import RideshareCheckBody, { FAQS_EN } from "@/components/RideshareCheckBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/rideshare-check`;
const alt = hreflangAlternatesForLocale("/rideshare-check", "en");

export const metadata: Metadata = {
  title: {
    absolute: "Rideshare & Taxi History Check by VIN — Uber, Lyft & Taxi Records",
  },
  description:
    "Check if a used car was driven as an Uber, Lyft, or taxi by VIN. Spot former rideshare and for-hire use from mileage patterns, commercial registration, and insurance records before you buy. Free preview, no signup, results in seconds.",
  keywords: [
    "rideshare history check VIN",
    "Uber car history",
    "Lyft vehicle check",
    "taxi history VIN",
    "former rideshare vehicle",
    "commercial use check",
    "for-hire vehicle history",
    "is this car a former Uber",
  ],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: {
    title: "Rideshare & Taxi History Check by VIN — Uber, Lyft & Taxi Records",
    description:
      "Check if a used car was driven as an Uber, Lyft, or taxi by VIN. Mileage patterns, commercial registration, and insurance signals that reveal for-hire use.",
    url: PAGE_URL,
    type: "article",
    siteName: "CarCheckerVIN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rideshare & Taxi History Check by VIN — Uber, Lyft & Taxi Records",
    description:
      "Spot a former Uber, Lyft, or taxi by VIN: mileage patterns, for-hire registration, and commercial-insurance signals before you buy.",
  },
  robots: { index: true, follow: true },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  inLanguage: "en",
  headline: "Rideshare & Taxi History Check by VIN",
  description:
    "Guide to checking whether a used car was driven as an Uber, Lyft, or taxi by VIN. Covers how commercial passenger use shows up in mileage patterns, for-hire registration, and insurance records, what that history means for wear and value, and how to read the signals before buying.",
  author: ORG_AUTHOR,
  publisher: {
    "@type": "Organization",
    name: "CarCheckerVIN",
    url: SITE,
    logo: { "@type": "ImageObject", url: `${SITE}/logo.png` },
  },
  mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL },
  datePublished: "2026-05-04",
  dateModified: "2026-06-14",
  image: `${SITE}/opengraph-image`,
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
  name: "How to Check a VIN for Rideshare or Taxi History",
  description:
    "Step-by-step guide to spotting former Uber, Lyft, taxi, and commercial passenger use from a VIN.",
  totalTime: "PT2M",
  step: [
    { "@type": "HowToStep", position: 1, name: "Locate the VIN", text: "Find the 17-character VIN on the dashboard through the windshield, the driver-side door jamb, or the title document." },
    { "@type": "HowToStep", position: 2, name: "Enter the VIN", text: "Type or paste the VIN into the search box at the top of this page." },
    { "@type": "HowToStep", position: 3, name: "Compare mileage to age", text: "Check the odometer readings against the model year. Forty thousand or more miles a year is a strong rideshare or for-hire pattern." },
    { "@type": "HowToStep", position: 4, name: "Read title and insurance records", text: "Look for commercial or for-hire registration, livery designations, and any commercial or rideshare-endorsed insurance entry tied to the VIN." },
    { "@type": "HowToStep", position: 5, name: "Inspect before buying", text: "Treat the signals as a reason for a pre-purchase inspection. Focus on brakes, transmission, suspension, and interior wear, and confirm the odometer is accurate." },
  ],
};

const serviceRatingSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Rideshare & Taxi History Check by VIN",
  provider: {
    "@type": "Organization",
    name: "CarCheckerVIN",
    url: SITE,
  },
  areaServed: { "@type": "Country", name: "United States" },
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
    { "@type": "ListItem", position: 2, name: "Rideshare Check", item: PAGE_URL },
  ],
};

const speakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  inLanguage: "en",
  speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".speakable-intro"] },
  url: PAGE_URL,
};

const datasetSchema = {
  "@context": "https://schema.org",
  "@type": "Dataset",
  inLanguage: "en",
  name: "Rideshare & Taxi History Check Quick Statistics",
  description:
    "Coverage and signal reference for CarCheckerVIN's VIN rideshare and taxi history check.",
  url: PAGE_URL,
  creator: ORG_AUTHOR,
  license: "https://creativecommons.org/licenses/by/4.0/",
  variableMeasured: [
    { "@type": "PropertyValue", name: "Typical full-time rideshare mileage per year", value: "40,000-60,000" },
    { "@type": "PropertyValue", name: "Rideshare mileage vs. private-vehicle rate", value: "3-5x" },
    { "@type": "PropertyValue", name: "Commercial / for-hire registration source", value: "NMVTIS" },
    { "@type": "PropertyValue", name: "Average VIN decode time (seconds)", value: "<5" },
    { "@type": "PropertyValue", name: "Cost for the free preview (USD)", value: "0" },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceRatingSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }} />
      <RideshareCheckBody locale="en" />
    </>
  );
}
