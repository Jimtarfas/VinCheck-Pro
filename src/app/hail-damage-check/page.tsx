import type { Metadata } from "next";
import HailDamageCheckBody, { FAQS_EN } from "@/components/HailDamageCheckBody";
import { ORG_AUTHOR } from "@/lib/seo/author";

export const metadata: Metadata = {
  title: "Hail Damage Check by VIN — Detect Storm Damage Before You Buy",
  description:
    "Check any vehicle for hail damage history by VIN. Find storm damage records, insurance claims, and hail-branded titles that can affect resale value and structural integrity.",
  keywords: [
    "hail damage check VIN",
    "storm damage vehicle history",
    "hail car VIN check",
    "hail branded title",
    "hail damage insurance claim",
    "storm damaged car",
  ],
  alternates: { canonical: "/hail-damage-check" },
  openGraph: {
    title: "Hail Damage Check by VIN — Detect Storm Damage Before You Buy",
    description:
      "Check any vehicle for hail damage history by VIN. Find storm damage records and hail-branded titles before buying.",
    url: "https://www.carcheckervin.com/hail-damage-check",
    type: "article",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Hail Damage Check by VIN",
  description:
    "Learn how to check any vehicle for hail damage history by VIN, including storm damage records, insurance claims, and hail title brands.",
  author: ORG_AUTHOR,
  publisher: { "@type": "Organization", name: "CarCheckerVIN", url: "https://www.carcheckervin.com" },
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://www.carcheckervin.com/hail-damage-check" },
  datePublished: "2026-05-04",
  dateModified: "2026-05-04",
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

export default function HailDamageCheckPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <HailDamageCheckBody locale="en" />
    </>
  );
}
