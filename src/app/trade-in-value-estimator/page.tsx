import type { Metadata } from "next";
import { hreflangAlternates } from "@/lib/seo/hreflang";
import TradeInValueEstimatorBody, { FAQS_EN } from "@/components/TradeInValueEstimatorBody";

const SITE = "https://www.carcheckervin.com";

export const metadata: Metadata = {
  title: "Trade-In Value Estimator — How Much Is My Car Worth? (Free)",
  description:
    "Free trade-in value estimator. Enter your vehicle's year, make, model, mileage, condition, and history to instantly estimate private party value, dealer trade-in, instant cash offer, and auction value.",
  keywords: [
    "trade-in value estimator",
    "car trade in value",
    "how much is my car worth",
    "car trade in calculator",
    "vehicle trade in value",
    "car value estimator",
    "trade in car value calculator",
    "what is my car worth",
    "car trade in value calculator",
    "auto trade in value",
    "car worth calculator",
    "estimate car trade in value",
    "free car value estimator",
    "used car value estimator",
    "car resale value calculator",
    "trade in vs private sale",
    "car depreciation calculator",
    "how much can I get for my car",
    "car trade in value by year make model",
    "KBB trade in value",
    "Edmunds trade in value",
    "dealer trade in value",
    "instant cash offer car",
    "car value by mileage",
    "trade in value with salvage title",
    "car trade in with accident history",
    "private party car value",
    "wholesale car value",
    "auction car value",
    "used car appraisal calculator",
  ],
  alternates: hreflangAlternates("/trade-in-value-estimator"),
  openGraph: {
    title: "Trade-In Value Estimator — How Much Is My Car Worth?",
    description:
      "Get instant estimates for private party sale, dealer trade-in, instant cash offer, and auction value. Enter year, make, model, mileage, condition, and history — free.",
    url: `${SITE}/trade-in-value-estimator`,
    type: "website",
    siteName: "CarCheckerVIN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Trade-In Value Estimator — How Much Is My Car Worth?",
    description:
      "Free trade-in value calculator. See private party, dealer trade-in, instant cash offer, and auction values based on year, make, mileage, condition, and history.",
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

/* ─── JSON-LD Schemas ─────────────────────────────────────── */

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": ["WebApplication", "SoftwareApplication"],
  name: "Trade-In Value Estimator",
  description:
    "Free trade-in value estimator. Enter year, make, model, mileage, condition, title status, and accident history to get private party, dealer trade-in, instant cash offer, and auction value estimates.",
  url: `${SITE}/trade-in-value-estimator`,
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web Browser",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  featureList: [
    "Private party sale estimate",
    "Dealer trade-in estimate",
    "Instant cash offer estimate",
    "Auction / wholesale value",
    "30 makes with brand-specific retention rates",
    "Condition multipliers (Excellent to Poor)",
    "Title brand deductions (Salvage, Flood, Rebuilt)",
    "Accident and owner history adjustments",
    "Step-by-step value breakdown",
  ],
  publisher: {
    "@type": "Organization",
    name: "CarCheckerVIN",
    url: SITE,
    logo: { "@type": "ImageObject", url: `${SITE}/logo.png` },
  },
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Estimate Your Car's Trade-In Value",
  description:
    "Use CarCheckerVIN's free trade-in value estimator to get private party, dealer, and instant cash offer estimates in minutes.",
  totalTime: "PT2M",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Enter vehicle details",
      text: "Select the year, make, model, body style, and original MSRP. The original sticker price anchors the depreciation calculation.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter mileage and condition",
      text: "Type the current odometer reading and select the condition rating from Excellent to Poor. Condition is the single biggest variable in used car valuation.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Add vehicle history",
      text: "Select the title status (clean, salvage, rebuilt, flood, etc.), number of reported accidents, and number of previous owners. Each reduces value by a specific percentage.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Get your estimate",
      text: "Click 'Estimate Trade-In Value' to see private party, dealer trade-in, instant cash offer, and auction values — plus a step-by-step breakdown of every adjustment.",
    },
  ],
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

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE },
    { "@type": "ListItem", position: 2, name: "Trade-In Value Estimator", item: `${SITE}/trade-in-value-estimator` },
  ],
};

export default function TradeInValuePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <TradeInValueEstimatorBody locale="en" />
    </>
  );
}
