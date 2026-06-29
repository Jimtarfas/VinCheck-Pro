/**
 * Wave 18 batch 3 — English rv-vin-check (slim wrapper).
 * Layout & copy live in RvVinCheckBody so /es/rv-vin-check can share.
 */

import type { Metadata } from "next";
import RvVinCheckBody, { FAQS_EN } from "@/components/RvVinCheckBody";
import { hreflangAlternates } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/rv-vin-check`;

export const metadata: Metadata = {
  title: "RV & Motorhome VIN Check — Free History",
  description:
    "Check any RV, motorhome, travel trailer, or camper by VIN — free. Get title brands, accident records, liens, and recalls before you buy a used RV.",
  keywords: [
    "RV VIN check",
    "motorhome VIN check",
    "recreational vehicle history",
    "camper VIN lookup",
    "travel trailer VIN",
    "RV title check",
    "fifth wheel VIN check",
    "RV salvage title check",
    "camper vin number lookup free",
    "free rv vin lookup",
    "motorhome vin lookup free",
    "motorhome vin number lookup",
    "lookup rv by vin",
    "vin lookup free rv",
    "rv lookup by vin number",
  ],
  alternates: hreflangAlternates("/rv-vin-check"),
  openGraph: {
    title: "RV & Motorhome VIN Check — Free History",
    description:
      "Check any RV, motorhome, or travel trailer by VIN. Get title status, accident records, liens, and recalls before you buy.",
    url: PAGE_URL,
    type: "article",
    siteName: "CarCheckerVIN",
  },
  twitter: {
    card: "summary_large_image",
    title: "RV & Motorhome VIN Check — Free History",
    description:
      "Check any RV, motorhome, or travel trailer by VIN — title brands, accidents, liens, and recalls.",
  },
  robots: { index: true, follow: true },
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "RV & Motorhome VIN Check",
  url: PAGE_URL,
  applicationCategory: "AutomotiveApplication",
  operatingSystem: "All",
  description:
    "Check any RV, motorhome, travel trailer, or camper van by its 17-character VIN. Returns NMVTIS-backed title status and brands, accident records, active liens, flood damage, and recall information.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "RV & Motorhome VIN Check",
  description:
    "How to check any RV, motorhome, travel trailer, or camper by VIN — including title brands, accident history, liens, recalls, and the chassis-vs-coach distinction unique to motorhomes.",
  author: ORG_AUTHOR,
  publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } },
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
  name: "How to Check an RV or Motorhome by VIN",
  description:
    "Run a free history check on any RV, motorhome, or travel trailer using its 17-character VIN before you buy.",
  totalTime: "PT2M",
  estimatedCost: { "@type": "MonetaryAmount", currency: "USD", value: "0" },
  supply: [{ "@type": "HowToSupply", name: "17-character RV VIN" }],
  tool: [{ "@type": "HowToTool", name: "CarCheckerVIN RV VIN Check" }],
  step: [
    { "@type": "HowToStep", position: 1, name: "Find the RV VIN", text: "Read the 17-character VIN from the dashboard or door jamb on a motorhome, or the forward-left frame rail or data plate on a travel trailer or fifth wheel." },
    { "@type": "HowToStep", position: 2, name: "Run the VIN check", text: "Enter the VIN into the search tool to query NMVTIS-backed title records and national data for title status, brands, liens, accidents, and recalls." },
    { "@type": "HowToStep", position: 3, name: "Review the report", text: "Check for salvage, rebuilt, or flood brands, active liens, and accident records. For motorhomes, confirm both the chassis maker and the coach builder." },
    { "@type": "HowToStep", position: 4, name: "Inspect before you buy", text: "Pair the VIN check with an in-person inspection by an RVIA-certified technician covering the roof, slideouts, LP gas, appliances, and chassis underbody." },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
    { "@type": "ListItem", position: 2, name: "RV VIN Check", item: PAGE_URL },
  ],
};

const speakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  url: PAGE_URL,
  speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".speakable-intro", ".fast-answer"] },
};

export default function RvVinCheckPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <RvVinCheckBody locale="en" />
    </>
  );
}
