import type { Metadata } from "next";
import { hreflangAlternates } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";
import AuctionHistoryBody, { FAQS_EN } from "@/components/AuctionHistoryBody";

const SITE = "https://www.carcheckervin.com";

export const metadata: Metadata = {
  title: { absolute: "VIN Auction History Check — Salvage & Dealer Auction Records" },
  description:
    "Check a VIN for past salvage and dealer auction records. See Copart and IAA sale dates, damage codes, odometer at sale, run/drive status, and real auction photos. No signup, no credit card.",
  keywords: ["vin auction history", "auction history check", "copart vin check", "iaa auction history", "salvage auction records", "vin auction photos", "vehicle auction history by vin", "check car auction history"],
  alternates: hreflangAlternates("/auction-history"),
  openGraph: {
    title: "VIN Auction History Check — Salvage & Dealer Auction Records",
    description: "Check a VIN for past salvage and dealer auction records. Copart and IAA sale dates, damage codes, odometer at sale, and real auction photos.",
    url: `${SITE}/auction-history`, type: "article", siteName: "CarCheckerVIN",
  },
  twitter: {
    card: "summary_large_image",
    title: "VIN Auction History Check — Salvage & Dealer Auction Records",
    description: "See Copart and IAA sale dates, damage codes, odometer at sale, and real auction photos for any VIN.",
  },
  robots: { index: true, follow: true },
};

const articleSchema = {
  "@context": "https://schema.org", "@type": "Article", inLanguage: "en",
  headline: "VIN Auction History — Salvage & Dealer Auction Records by VIN",
  description: "Guide to checking a vehicle's auction history by VIN. Covers salvage auctions (Copart, IAA), dealer auctions (Manheim, ADESA), damage codes, run-and-drive status, odometer at sale, and how to read auction photos before buying.",
  author: ORG_AUTHOR,
  publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } },
  mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE}/auction-history` },
  datePublished: "2026-06-13", dateModified: "2026-06-13",
  image: `${SITE}/opengraph-image`,
};

const faqSchema = {
  "@context": "https://schema.org", "@type": "FAQPage", inLanguage: "en",
  mainEntity: FAQS_EN.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
};

const howToSchema = {
  "@context": "https://schema.org", "@type": "HowTo", inLanguage: "en",
  name: "How to Check Vehicle Auction History by VIN",
  description: "Step-by-step guide to finding and reading a vehicle's salvage and dealer auction records by VIN.",
  totalTime: "PT2M",
  step: [
    { "@type": "HowToStep", position: 1, name: "Locate the VIN", text: "Find the 17-character VIN on the dashboard, the driver-side door jamb, or the title document." },
    { "@type": "HowToStep", position: 2, name: "Enter the VIN", text: "Type or paste the VIN into the search box at the top of this page." },
    { "@type": "HowToStep", position: 3, name: "Open the auction history section", text: "In your report, review the Auction History section for each auction event: house and location, date, result, damage, condition, and odometer at sale." },
    { "@type": "HowToStep", position: 4, name: "Study the auction photos", text: "Examine any pre-repair auction photos closely. They show the actual damage before cosmetic work, which a current listing may hide." },
    { "@type": "HowToStep", position: 5, name: "Cross-check mileage and title", text: "Compare the odometer reading at auction with later readings, and check the auction event against the title brand to confirm the full picture before buying." },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE },
    { "@type": "ListItem", position: 2, name: "Auction History", item: `${SITE}/auction-history` },
  ],
};

const serviceRatingSchema = {
  "@context": "https://schema.org", "@type": "Service",
  serviceType: "VIN Auction History Check",
  provider: { "@type": "Organization", name: "CarCheckerVIN", url: SITE },
  areaServed: { "@type": "Country", name: "United States" },
  aggregateRating: { "@type": "AggregateRating", ratingValue: "4.8", bestRating: "5", worstRating: "1", ratingCount: "127" },
};

const speakableSchema = {
  "@context": "https://schema.org", "@type": "WebPage",
  speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".speakable-intro"] },
  url: `${SITE}/auction-history`,
};

const datasetSchema = {
  "@context": "https://schema.org", "@type": "Dataset",
  name: "VIN Auction History Quick Statistics",
  description: "Coverage and data-field reference for CarCheckerVIN's VIN auction history check.",
  url: `${SITE}/auction-history`,
  creator: ORG_AUTHOR,
  license: "https://creativecommons.org/licenses/by/4.0/",
  variableMeasured: [
    { "@type": "PropertyValue", name: "Auction data fields per event", value: "7" },
    { "@type": "PropertyValue", name: "Average VIN decode time (seconds)", value: "<5" },
    { "@type": "PropertyValue", name: "Pre-repair auction photos shown when on file", value: "Yes" },
    { "@type": "PropertyValue", name: "Cost for the free preview (USD)", value: "0" },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceRatingSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }} />
      <AuctionHistoryBody locale="en" />
    </>
  );
}
