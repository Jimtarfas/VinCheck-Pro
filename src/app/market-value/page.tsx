import type { Metadata } from "next";
import MarketValueBody, { FAQS_EN } from "@/components/MarketValueBody";
import { ORG_AUTHOR } from "@/lib/seo/author";

export const metadata: Metadata = {
  title: "Car Market Value by VIN — Free Vehicle Valuation Tool",
  description:
    "Get the current market value of any vehicle by VIN. Compare trade-in, private party, and dealer retail values based on mileage, condition, options, and regional market data.",
  keywords: [
    "car market value by VIN",
    "vehicle valuation by VIN",
    "trade-in value by VIN",
    "car value lookup",
    "vehicle worth by VIN",
    "how much is my car worth",
  ],
  alternates: { canonical: "/market-value" },
  openGraph: {
    title: "Car Market Value by VIN — Free Vehicle Valuation Tool",
    description:
      "Get the current market value of any vehicle by VIN. Compare trade-in, private party, and dealer retail values based on real market data.",
    url: "https://www.carcheckervin.com/market-value",
    type: "article",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Car Market Value by VIN",
  description:
    "Learn how vehicle market value is calculated by VIN, including trade-in vs. private party vs. retail values and how mileage, condition, and region affect pricing.",
  author: ORG_AUTHOR,
  publisher: { "@type": "Organization", name: "CarCheckerVIN", url: "https://www.carcheckervin.com" },
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://www.carcheckervin.com/market-value" },
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

export default function MarketValuePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <MarketValueBody locale="en" />
    </>
  );
}
