import type { Metadata } from "next";
import VinCheckTypeHubBody, { FAQS_EN } from "@/components/VinCheckTypeHubBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/vin-check/type`;
const alt = hreflangAlternatesForLocale("/vin-check/type", "en");
const title =
  "VIN Check by Vehicle Type — Powersports, Trailers & Boats";
const description =
  "Free VIN check by vehicle type. Verify a used snowmobile, dirt bike, UTV, trailer or boat by VIN (or HIN) — confirm the year and check theft and title records before you buy.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  keywords: [
    "vin check by vehicle type",
    "powersports vin check",
    "snowmobile vin check",
    "dirt bike vin check",
    "utv vin check",
    "trailer vin check",
    "boat vin check",
  ],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: {
    title,
    description,
    url: PAGE_URL,
    type: "website",
    siteName: "CarCheckerVIN",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description:
      "Free VIN check by vehicle type — snowmobiles, dirt bikes, UTVs, trailers and boats.",
  },
  robots: { index: true, follow: true },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE },
    { "@type": "ListItem", position: 2, name: "VIN Check", item: `${SITE}/vin-check` },
    { "@type": "ListItem", position: 3, name: "By Vehicle Type", item: PAGE_URL },
  ],
};

const appSchema = {
  "@context": "https://schema.org",
  "@type": ["WebApplication", "SoftwareApplication"],
  name: "VIN Check by Vehicle Type",
  description,
  url: PAGE_URL,
  applicationCategory: "AutomotiveApplication",
  operatingSystem: "Web Browser",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  publisher: ORG_AUTHOR,
};

const DIRECTORY_HREFS = [
  "/vin-check/type/snowmobile",
  "/vin-check/type/dirt-bike",
  "/vin-check/type/utv",
  "/atv-vin-check",
  "/motorcycle-vin-check",
  "/harley-davidson-vin-check",
  "/vin-check/type/trailer",
  "/rv-vin-check",
  "/semi-truck-vin-lookup",
  "/golf-cart-vin-lookup",
  "/vin-check/type/boat",
  "/hin-lookup",
  "/classic-car-vin",
  "/stolen-vehicle-check",
];

const DIRECTORY_LABELS: Record<string, string> = {
  "/vin-check/type/snowmobile": "Snowmobile VIN Check",
  "/vin-check/type/dirt-bike": "Dirt Bike VIN Check",
  "/vin-check/type/utv": "UTV & Side-by-Side VIN Check",
  "/atv-vin-check": "ATV VIN Check",
  "/motorcycle-vin-check": "Motorcycle VIN Check",
  "/harley-davidson-vin-check": "Harley-Davidson VIN Check",
  "/vin-check/type/trailer": "Trailer VIN Check",
  "/rv-vin-check": "RV VIN Check",
  "/semi-truck-vin-lookup": "Semi Truck VIN Lookup",
  "/golf-cart-vin-lookup": "Golf Cart VIN Lookup",
  "/vin-check/type/boat": "Boat VIN Check (HIN)",
  "/hin-lookup": "Boat HIN Lookup",
  "/classic-car-vin": "Classic Car VIN Check",
  "/stolen-vehicle-check": "Stolen Vehicle Check",
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "VIN check tools by vehicle type",
  itemListElement: DIRECTORY_HREFS.map((href, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: DIRECTORY_LABELS[href],
    url: `${SITE}${href}`,
  })),
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

const speakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": PAGE_URL,
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: [".speakable-intro", ".speakable-answer", "h1"],
  },
};

export default function VinCheckTypeHubPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <VinCheckTypeHubBody locale="en" />
    </>
  );
}
