import type { Metadata } from "next";
import AccidentHistoryCheckBody, { FAQS_EN } from "@/components/AccidentHistoryCheckBody";
import { ORG_AUTHOR } from "@/lib/seo/author";

export const metadata: Metadata = {
  title: "Vehicle Accident History Check by VIN — Crash Report Lookup",
  description:
    "Run an accident history check by VIN to see reported crashes, insurance claims, and damage records. Spot hidden collision damage before you buy.",
  keywords: [
    "accident history by VIN",
    "vehicle accident history",
    "car accident report VIN",
    "crash history check",
    "VIN accident lookup",
    "check car for accidents by VIN",
    "vehicle damage history",
    "collision history report",
  ],
  alternates: { canonical: "/accident-history-check" },
  openGraph: {
    title: "Vehicle Accident History Check by VIN",
    description:
      "Find reported accidents, crash records, and damage claims tied to any VIN. Avoid hidden collision damage before you buy.",
    url: "https://www.carcheckervin.com/accident-history-check",
    type: "article",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Vehicle Accident History Check",
  description:
    "Learn how accident history is reported, what shows up on a VIN-based crash report, and how to identify hidden damage on a used car.",
  author: ORG_AUTHOR,
  publisher: {
    "@type": "Organization",
    name: "CarCheckerVIN",
    url: "https://www.carcheckervin.com",
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": "https://www.carcheckervin.com/accident-history-check",
  },
  datePublished: "2026-04-16",
  dateModified: new Date().toISOString().slice(0, 10),
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS_EN.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

export default function AccidentHistoryCheckPage() {
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
      <AccidentHistoryCheckBody locale="en" />
    </>
  );
}
