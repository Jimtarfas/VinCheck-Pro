import type { Metadata } from "next";
import ImpoundCheckBody, { FAQS_EN } from "@/components/ImpoundCheckBody";
import { ORG_AUTHOR } from "@/lib/seo/author";

export const metadata: Metadata = {
  title: "Impound & Repo History Check by VIN — Lien & Recovery Records",
  description:
    "Check any vehicle for impound, repossession, and lien history by VIN. Find active liens, past repossessions, and impound records that could complicate ownership transfer.",
  keywords: [
    "impound check VIN",
    "repo history check",
    "lien check by VIN",
    "repossession history VIN",
    "impound records vehicle",
    "active lien VIN check",
  ],
  alternates: { canonical: "/impound-check" },
  openGraph: {
    title: "Impound & Repo History Check by VIN — Lien & Recovery Records",
    description:
      "Check any vehicle for impound, repossession, and lien history by VIN. Find active liens and impound records before buying.",
    url: "https://www.carcheckervin.com/impound-check",
    type: "article",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Impound & Repo History Check by VIN",
  description: "Learn how to check any vehicle for impound, repossession, and lien history by VIN to protect against ownership transfer complications.",
  author: ORG_AUTHOR,
  publisher: { "@type": "Organization", name: "CarCheckerVIN", url: "https://www.carcheckervin.com" },
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://www.carcheckervin.com/impound-check" },
  datePublished: "2026-05-04",
  dateModified: "2026-05-04",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS_EN.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
};

export default function ImpoundCheckPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ImpoundCheckBody locale="en" />
    </>
  );
}
