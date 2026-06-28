import type { Metadata } from "next";
import { hreflangAlternates } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";
import MotorcycleVinCheckBody, { FAQS_EN } from "@/components/MotorcycleVinCheckBody";

const SITE = "https://www.carcheckervin.com";

export const metadata: Metadata = {
  title: "Motorcycle VIN Check — Free Bike VIN Decoder & History Report",
  description:
    "Run a free motorcycle VIN check for any bike, cruiser, sportbike, or off-road vehicle. Decode the 17-character VIN to get full history, title status, theft records, and specs.",
  keywords: [
    "motorcycle VIN check",
    "bike VIN decoder",
    "motorcycle history report",
    "free motorcycle VIN",
    "motorcycle title check",
    "motorcycle theft check",
    "how to lookup a vin number for a motorcycle",
    "free vin lookup motorcycle",
    "kbb motorcycle vin lookup",
    "nada motorcycle vin lookup",
    "free vin number lookup motorcycle",
  ],
  alternates: hreflangAlternates("/motorcycle-vin-check"),
  openGraph: {
    title: "Motorcycle VIN Check — Free Bike VIN Decoder & History Report",
    description:
      "Run a free motorcycle VIN check for any bike. Decode the 17-character VIN to get full history, title status, and theft records.",
    url: `${SITE}/motorcycle-vin-check`,
    type: "article",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  inLanguage: "en",
  headline: "Motorcycle VIN Check",
  description:
    "Learn how to run a motorcycle VIN check for any bike, including title status, theft records, accident history, and specifications.",
  author: ORG_AUTHOR,
  publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE },
  mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE}/motorcycle-vin-check` },
  datePublished: "2026-05-04",
  dateModified: "2026-05-04",
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

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <MotorcycleVinCheckBody locale="en" />
    </>
  );
}
