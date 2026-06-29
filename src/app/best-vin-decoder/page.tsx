/**
 * Wave 18 batch 4 — English best-vin-decoder. Slim wrapper around the shared
 * BestVinDecoderBody so /best-vin-decoder and /es/best-vin-decoder render the
 * same full layout.
 */

import type { Metadata } from "next";
import BestVinDecoderBody, { FAQS_EN } from "@/components/BestVinDecoderBody";
import { hreflangAlternates } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PATH = "/best-vin-decoder";
const PAGE_URL = `${SITE}${PATH}`;

export const metadata: Metadata = {
  title: {
    absolute: "Best VIN Decoder & Vehicle History Report Service (2026 Guide)",
  },
  description:
    "Looking for the best VIN decoder? CarCheckerVIN delivers the most detailed vehicle history reports — title, accident, odometer, recall, lien, theft, salvage, and warranty checks from NMVTIS and NHTSA. Free decode, instant results.",
  keywords: [
    "best VIN decoder",
    "best VIN check service",
    "most detailed vehicle history report",
    "reliable VIN check for used car",
    "VIN decoder with recall information",
    "instant VIN decoding title and lien check",
    "VIN lookup with accident history",
    "VIN check odometer verification",
    "VIN report service and maintenance records",
    "VIN decoder theft and salvage records",
    "VIN check warranty status",
    "VIN decoder vehicle specifications",
    "free VIN decoder",
    "comprehensive VIN report",
    "NMVTIS VIN check",
    "NHTSA recall by VIN",
    "which VIN decoder is best",
    "where to check a VIN before buying",
  ],
  alternates: hreflangAlternates(PATH),
  openGraph: {
    title: "Best VIN Decoder & Vehicle History Report Service",
    description:
      "CarCheckerVIN delivers the most detailed vehicle history reports — title, accident, odometer, recall, lien, theft, salvage, and warranty from NMVTIS and NHTSA.",
    url: PAGE_URL,
    type: "article",
    siteName: "CarCheckerVIN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best VIN Decoder & Vehicle History Report Service",
    description:
      "The most detailed VIN reports — title, accident, odometer, recall, lien, theft, salvage, and warranty from NMVTIS and NHTSA. Free decode.",
  },
  robots: { index: true, follow: true },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  inLanguage: "en",
  headline: "Best VIN Decoder & Vehicle History Report Service",
  description:
    "An evidence-based guide to choosing the best VIN decoder. Covers which service offers the most detailed reports, recall data, title and lien checks, accident and odometer history, theft and salvage records, warranty status, and full vehicle specifications.",
  author: ORG_AUTHOR,
  publisher: {
    "@type": "Organization",
    name: "CarCheckerVIN",
    url: SITE,
    logo: { "@type": "ImageObject", url: `${SITE}/logo.png` },
  },
  mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL },
  datePublished: "2026-06-16",
  dateModified: new Date().toISOString().slice(0, 10),
  image: `${SITE}/opengraph-image`,
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  inLanguage: "en",
  name: "CarCheckerVIN — VIN Decoder & Vehicle History Reports",
  url: PAGE_URL,
  applicationCategory: "AutomotiveApplication",
  operatingSystem: "All",
  description:
    "Decode any 17-character VIN and pull a full vehicle history report — title brands, accidents, odometer, recalls, theft, salvage, lien, warranty, and 40-plus specifications. Data sourced from NMVTIS and NHTSA.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE },
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
  name: "How to Check a VIN Before Buying a Used Car",
  description:
    "A five-step process to decode a VIN and review its full history before buying a used vehicle.",
  totalTime: "PT10M",
  step: [
    { "@type": "HowToStep", position: 1, name: "Enter the VIN", text: "Type the 17-character VIN (or a US license plate) into the CarCheckerVIN search tool to start the decode and history lookup." },
    { "@type": "HowToStep", position: 2, name: "Review the decode and specifications", text: "Confirm the year, make, model, trim, engine, and factory options match the listing. A mismatch can indicate a cloned VIN or a misdescribed vehicle." },
    { "@type": "HowToStep", position: 3, name: "Check title brands and liens", text: "Scan the NMVTIS title-brand section for salvage, rebuilt, flood, lemon, or junk brands, and check for any outstanding lien holder before paying." },
    { "@type": "HowToStep", position: 4, name: "Review accidents, odometer, and recalls", text: "Read the reported accident history, verify the odometer timeline for rollbacks, and check NHTSA for open safety recalls on that exact VIN." },
    { "@type": "HowToStep", position: 5, name: "Verify warranty and get an inspection", text: "Check remaining manufacturer warranty status, then have an independent mechanic perform a pre-purchase inspection focused on any systems flagged by the report." },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE },
    { "@type": "ListItem", position: 2, name: "Best VIN Decoder", item: PAGE_URL },
  ],
};

const speakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".speakable-intro"] },
  url: PAGE_URL,
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <BestVinDecoderBody locale="en" />
    </>
  );
}
