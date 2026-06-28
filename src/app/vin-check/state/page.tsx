import type { Metadata } from "next";
import { ORG_AUTHOR } from "@/lib/seo/author";
import VinCheckStateHubBody, { FAQS_EN } from "@/components/VinCheckStateHubBody";

const SITE = "https://www.carcheckervin.com";

export const metadata: Metadata = {
  title: {
    absolute: "VIN Check by State — Free Title & History for All 50 States",
  },
  description:
    "Free VIN check for every US state. Find your state for local DMV rules and title brands, then run an instant nationwide vehicle history report from NMVTIS data. No signup, no credit card.",
  keywords: [
    "vin check by state",
    "free vin check by state",
    "state dmv vin lookup",
    "vehicle history by state",
    "all states vin decoder",
    "50 states vin check",
    "state title brand check",
    "us vin lookup",
  ],
  alternates: { canonical: "/vin-check/state" },
  openGraph: {
    title: "VIN Check by State — Free Title & History for All 50 States",
    description:
      "Free VIN check for every US state. Local DMV rules, state title brands, and an instant nationwide vehicle history report.",
    type: "article",
    url: `${SITE}/vin-check/state`,
    siteName: "CarCheckerVIN",
  },
  twitter: {
    card: "summary_large_image",
    title: "VIN Check by State — All 50 US States",
    description:
      "Free VIN check for every US state. Local DMV rules, state title brands, and an instant nationwide vehicle history report.",
  },
  robots: { index: true, follow: true },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "VIN Check by State — Free Vehicle History for All 50 US States",
  description:
    "Guide to running a free VIN check in any US state. Covers how nationwide NMVTIS data works, why title brands differ state to state, and how to read a state-by-state vehicle history report.",
  author: ORG_AUTHOR,
  publisher: {
    "@type": "Organization",
    name: "CarCheckerVIN",
    url: SITE,
    logo: { "@type": "ImageObject", url: `${SITE}/logo.png` },
  },
  mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE}/vin-check/state` },
  datePublished: "2026-06-13",
  dateModified: "2026-06-13",
  image: `${SITE}/opengraph-image`,
  about: {
    "@type": "Country",
    name: "United States",
    sameAs: "https://en.wikipedia.org/wiki/United_States",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS_EN.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Run a VIN Check in Any State",
  description:
    "Step-by-step guide to running a free VIN check for a vehicle registered in any US state.",
  totalTime: "PT2M",
  step: [
    { "@type": "HowToStep", position: 1, name: "Find your state", text: "Use the state finder at the top of this page to open the page for the state where the vehicle is titled and learn its local DMV rules and title brands." },
    { "@type": "HowToStep", position: 2, name: "Locate the VIN", text: "Find the 17-character VIN on the dashboard (visible through the windshield), the driver-side door jamb, or the title document." },
    { "@type": "HowToStep", position: 3, name: "Enter the VIN", text: "Type or paste the VIN into the search box. The same lookup works for a vehicle titled in any state." },
    { "@type": "HowToStep", position: 4, name: "Review the nationwide report", text: "Read the consolidated report covering title brands from every state, accident records, odometer readings, and recall status." },
    { "@type": "HowToStep", position: 5, name: "Cross-check state rules", text: "Compare any title brand against your state's DMV definitions to understand exactly what it means before you buy." },
  ],
};

const serviceRatingSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "VIN Check by State",
  provider: {
    "@type": "Organization",
    name: "CarCheckerVIN",
    url: SITE,
  },
  areaServed: { "@type": "Country", name: "United States" },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    bestRating: "5",
    worstRating: "1",
    ratingCount: "127",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE },
    { "@type": "ListItem", position: 2, name: "VIN Check", item: `${SITE}/vin-check` },
    { "@type": "ListItem", position: 3, name: "By State", item: `${SITE}/vin-check/state` },
  ],
};

const speakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".speakable-intro"] },
  url: `${SITE}/vin-check/state`,
};

const datasetSchema = {
  "@context": "https://schema.org",
  "@type": "Dataset",
  name: "VIN Check by State Quick Statistics",
  description:
    "Coverage and performance data for CarCheckerVIN's nationwide, state-by-state VIN check.",
  url: `${SITE}/vin-check/state`,
  creator: ORG_AUTHOR,
  license: "https://creativecommons.org/licenses/by/4.0/",
  spatialCoverage: { "@type": "Place", name: "United States" },
  variableMeasured: [
    { "@type": "PropertyValue", name: "US states and territories covered", value: "51" },
    { "@type": "PropertyValue", name: "State DMVs reporting into NMVTIS", value: "50" },
    { "@type": "PropertyValue", name: "Average VIN decode time (seconds)", value: "<5" },
    { "@type": "PropertyValue", name: "Cost for the free preview (USD)", value: "0" },
  ],
};

export default function StateIndexPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceRatingSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }} />
      <VinCheckStateHubBody locale="en" />
    </>
  );
}
