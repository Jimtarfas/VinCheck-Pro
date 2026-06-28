/**
 * Wave 18 batch 2 — EN /guides/vehicle-fraud-prevention via shared body.
 */

import type { Metadata } from "next";
import GuideVehicleFraudPreventionBody, { FAQS_EN } from "@/components/GuideVehicleFraudPreventionBody";
import { hreflangAlternates } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/guides/vehicle-fraud-prevention`;
const title = "Vehicle Fraud Prevention: The Definitive 2026 Guide";
const description =
  "How to spot title fraud, odometer rollback, salvage washing, VIN cloning, dealer scams, and online fraud — with real data from NICB, NMVTIS, FTC, and NHTSA.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "vehicle fraud prevention",
    "car buying scams",
    "title fraud",
    "odometer fraud guide",
    "vin cloning",
    "salvage title washing",
    "auto fraud 2026",
    "used car scams",
    "online car scams",
    "dealer fraud",
    "stolen car check",
    "how to avoid car fraud",
  ],
  alternates: hreflangAlternates("/guides/vehicle-fraud-prevention"),
  openGraph: {
    title,
    description:
      "Title fraud, odometer rollback, salvage washing, VIN cloning, dealer scams, and online scams — how each works and how to defend yourself.",
    url: PAGE_URL,
    type: "article",
    siteName: "CarCheckerVIN",
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  inLanguage: "en",
  headline: "Vehicle Fraud Prevention: The Definitive 2026 Guide",
  description:
    "Comprehensive guide to vehicle fraud schemes including title fraud, odometer rollback, salvage washing, VIN cloning, dealer scams, and online fraud.",
  author: ORG_AUTHOR,
  publisher: {
    "@type": "Organization",
    name: "CarCheckerVIN",
    url: SITE,
    logo: { "@type": "ImageObject", url: `${SITE}/logo.png` },
  },
  mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL },
  datePublished: "2026-04-23",
  dateModified: "2026-06-25",
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  inLanguage: "en",
  name: "How to Protect Yourself From Vehicle Fraud",
  description:
    "A six-step protocol for spotting and preventing vehicle fraud before purchase.",
  step: [
    { "@type": "HowToStep", position: 1, name: "Verify the VIN matches", text: "Check the VIN on the dashboard, the door jamb sticker, the title, the registration, and the bill of sale. Mismatches indicate cloning." },
    { "@type": "HowToStep", position: 2, name: "Pull a full vehicle history report", text: "Use NMVTIS-sourced data to verify title brands, accident records, and ownership chain." },
    { "@type": "HowToStep", position: 3, name: "Cross-check NICB stolen vehicle and salvage databases", text: "Confirm the vehicle has not been reported stolen and is not a salvage record reissued in another state." },
    { "@type": "HowToStep", position: 4, name: "Validate odometer continuity", text: "Confirm every recorded odometer reading trends upward across the title chain." },
    { "@type": "HowToStep", position: 5, name: "Pay only via traceable methods", text: "Cashier's check or wire from your bank, never gift cards, crypto, or third-party escrow services suggested by the seller." },
    { "@type": "HowToStep", position: 6, name: "Inspect the title in person", text: "Verify watermarks, raised seals, and that the title is from the seller's state of residence with no alterations." },
  ],
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

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
    { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE}/guides` },
    { "@type": "ListItem", position: 3, name: "Vehicle Fraud Prevention", item: PAGE_URL },
  ],
};

export default function VehicleFraudPreventionPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <GuideVehicleFraudPreventionBody locale="en" />
    </>
  );
}
