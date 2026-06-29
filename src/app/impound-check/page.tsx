import type { Metadata } from "next";
import ImpoundCheckBody, { FAQS_EN, HOWTO_EN } from "@/components/ImpoundCheckBody";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/impound-check`;
const TITLE = "Impound & Repo History Check by VIN — Lien & Recovery Records";
const DESCRIPTION =
  "Check any vehicle for impound, repossession, and lien history by VIN. Find active liens, past repossessions, and impound records that could complicate ownership transfer.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
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
    title: TITLE,
    description:
      "Check any vehicle for impound, repossession, and lien history by VIN. Find active liens and impound records before buying.",
    url: PAGE_URL,
    type: "article",
    siteName: "CarCheckerVIN",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description:
      "Free VIN-based impound, repossession, and lien lookup. Find active liens and recovery records before you buy.",
  },
  robots: { index: true, follow: true },
};

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Impound & Repo History Check",
  url: PAGE_URL,
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any",
  description:
    "Free VIN-based impound, repossession, and lien check. Surfaces active liens, lender repossession records, storage liens, and impound-related title brands.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Impound & Repo History Check by VIN",
  description: "Learn how to check any vehicle for impound, repossession, and lien history by VIN to protect against ownership transfer complications.",
  author: ORG_AUTHOR,
  publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE },
  mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL },
  datePublished: "2026-05-04",
  dateModified: new Date().toISOString().slice(0, 10),
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS_EN.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Check a Vehicle's Impound, Repo & Lien History by VIN",
  description:
    "Run a free VIN-based impound, repossession, and lien check in six steps: enter the VIN, review active liens, inspect the title, look for repo records, confirm with the DMV, and resolve before paying.",
  totalTime: "PT3M",
  estimatedCost: { "@type": "MonetaryAmount", currency: "USD", value: "0" },
  step: HOWTO_EN.map((s, i) => ({
    "@type": "HowToStep",
    position: i + 1,
    name: s.title,
    text: s.body,
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
    { "@type": "ListItem", position: 2, name: "Impound Check", item: PAGE_URL },
  ],
};

const speakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: TITLE,
  url: PAGE_URL,
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["h1", ".speakable-intro", ".speakable-faq"],
  },
};

export default function ImpoundCheckPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <ImpoundCheckBody locale="en" />
    </>
  );
}
