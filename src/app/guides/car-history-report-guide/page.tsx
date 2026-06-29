/**
 * Wave 18b — English car-history-report-guide. Same full layout in both locales
 * via the shared GuideCarHistoryReportBody.
 */

import type { Metadata } from "next";
import GuideCarHistoryReportBody, { FAQS_EN } from "@/components/GuideCarHistoryReportBody";
import { hreflangAlternates } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/guides/car-history-report-guide`;

export const metadata: Metadata = {
  title: "Vehicle History Reports: Everything You Need to Know (2026)",
  description:
    "What\u2019s in a vehicle history report, where the data comes from (NMVTIS, NICB, NHTSA), how to read one, and how providers like Carfax, AutoCheck, and CarCheckerVIN compare.",
  keywords: [
    "vehicle history report",
    "car history check",
    "carfax alternative guide",
    "vehicle history report explained",
    "nmvtis report",
    "nicb vincheck",
    "autocheck vs carfax",
    "what is in a car history report",
    "how to read a vehicle history report",
    "vin history report",
    "best vehicle history report 2026",
    "car history report comparison",
  ],
  alternates: hreflangAlternates("/guides/car-history-report-guide"),
  openGraph: {
    title: "Vehicle History Reports: Everything You Need to Know",
    description:
      "Comprehensive guide to vehicle history reports: data sources, what to look for, how to read one, and how providers stack up.",
    url: PAGE_URL,
    type: "article",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  inLanguage: "en",
  headline: "Vehicle History Reports: Everything You Need to Know (2026)",
  description:
    "Everything in a vehicle history report explained: NMVTIS data, NICB checks, manufacturer recalls, market value, how to read a report, and how to compare providers.",
  author: ORG_AUTHOR,
  publisher: {
    "@type": "Organization",
    name: "CarCheckerVIN",
    url: SITE,
    logo: { "@type": "ImageObject", url: `${SITE}/logo.png` },
  },
  mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL },
  datePublished: "2026-04-23",
  dateModified: new Date().toISOString().slice(0, 10),
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  inLanguage: "en",
  name: "How to Read a Vehicle History Report",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Verify the VIN and basic specs",
      text: "Confirm the report header VIN matches the vehicle\u2019s dashboard plate and door jamb sticker.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Review title and brand history",
      text: "Look for any salvage, rebuilt, flood, junk, or lemon brand across every recorded title state.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Check the odometer chain",
      text: "Verify each recorded mileage trends upward and matches what is on the current odometer.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Review accident and damage records",
      text: "Read severity, airbag deployment, and structural-repair indicators for every recorded incident.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Review service and ownership history",
      text: "Look for consistent service intervals and a reasonable number of prior owners.",
    },
    {
      "@type": "HowToStep",
      position: 6,
      name: "Cross-check open recalls",
      text: "Verify any open NHTSA recalls and confirm whether they have been completed.",
    },
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

export default function CarHistoryReportGuidePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <GuideCarHistoryReportBody locale="en" />
    </>
  );
}
