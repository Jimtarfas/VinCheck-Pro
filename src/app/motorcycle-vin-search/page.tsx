import type { Metadata } from "next";
import MotorcycleVinSearchBody, { FAQS_EN } from "@/components/MotorcycleVinSearchBody";
import { hreflangAlternates } from "@/lib/seo/hreflang";

const PAGE_URL = "https://www.carcheckervin.com/motorcycle-vin-search";
const OG_IMAGE = "https://www.carcheckervin.com/opengraph-image";
const PUBLISHED = "2026-05-07";
const MODIFIED = "2026-06-25";

export const metadata: Metadata = {
  title: "Free Motorcycle VIN Search & Decoder — Look Up Any Bike VIN Instantly",
  description:
    "Free motorcycle VIN search and decoder. Enter any 17-character bike VIN to instantly decode the manufacturer, country of origin, model year, plant code, and production number. Works for Harley-Davidson, Honda, Yamaha, Suzuki, Kawasaki, BMW, Ducati, Triumph, KTM, and every motorcycle brand.",
  keywords: [
    "motorcycle VIN search", "motorcycle VIN decoder", "motorcycle VIN lookup",
    "free motorcycle VIN search", "free motorcycle VIN decoder", "decode motorcycle VIN",
    "bike VIN search", "bike VIN decoder", "bike VIN lookup", "free bike VIN check",
    "Harley-Davidson VIN decoder", "Harley VIN lookup", "Honda motorcycle VIN decoder",
    "Yamaha VIN search", "Suzuki motorcycle VIN lookup", "Kawasaki VIN decoder",
    "BMW motorcycle VIN search", "Ducati VIN decoder", "Triumph VIN lookup",
    "KTM VIN search", "Indian motorcycle VIN decoder", "Royal Enfield VIN search",
    "Aprilia VIN lookup", "MV Agusta VIN decoder", "Husqvarna VIN search",
    "Moto Guzzi VIN lookup", "lookup motorcycle by VIN", "find motorcycle year by VIN",
    "motorcycle WMI lookup", "motorcycle manufacturer by VIN", "what year is my motorcycle",
    "how to read a motorcycle VIN", "what does a motorcycle VIN mean",
    "motorcycle VIN check free no signup", "bike VIN check by 17 digits",
  ],
  authors: [{ name: "CarCheckerVIN", url: "https://www.carcheckervin.com" }],
  creator: "CarCheckerVIN",
  publisher: "CarCheckerVIN",
  category: "Automotive Tools",
  applicationName: "CarCheckerVIN Motorcycle VIN Search",
  alternates: hreflangAlternates("/motorcycle-vin-search"),
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large", "max-video-preview": -1 },
  },
  openGraph: {
    title: "Free Motorcycle VIN Search & Decoder — Look Up Any Bike VIN Instantly",
    description: "Decode any motorcycle VIN in one click. Manufacturer, country, model year, plant, and production sequence — works for Harley, Honda, Yamaha, Suzuki, Kawasaki, BMW, Ducati, Triumph, and KTM.",
    url: PAGE_URL, siteName: "CarCheckerVIN", type: "website", locale: "en_US",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "CarCheckerVIN Motorcycle VIN Search — free 17-character bike VIN decoder" }],
  },
  twitter: {
    card: "summary_large_image", site: "@CarCheckerVIN", creator: "@CarCheckerVIN",
    title: "Free Motorcycle VIN Search & Decoder",
    description: "Decode any 17-character motorcycle VIN instantly — manufacturer, country, year, plant, and production number. 100% free.",
    images: [OG_IMAGE],
  },
  other: { "msapplication-TileColor": "#0c2d5e", "theme-color": "#0c2d5e" },
};

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": ["WebApplication", "SoftwareApplication"],
  "@id": `${PAGE_URL}#tool`,
  name: "Motorcycle VIN Search",
  alternateName: ["Motorcycle VIN Decoder", "Motorcycle VIN Lookup", "Bike VIN Search", "Free Motorcycle VIN Decoder"],
  url: PAGE_URL,
  applicationCategory: ["UtilitiesApplication", "BusinessApplication"],
  applicationSubCategory: "Automotive · Motorcycles",
  operatingSystem: "Any (Web Browser)",
  browserRequirements: "Requires JavaScript and a modern web browser",
  inLanguage: "en-US",
  isAccessibleForFree: true,
  description: "Free online motorcycle VIN search tool. Enter any 17-character motorcycle VIN to instantly decode manufacturer, country of origin, model year, plant code, and production sequence.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD", availability: "https://schema.org/InStock" },
  featureList: [
    "Instant 17-character motorcycle VIN decode",
    "Manufacturer (WMI) identification — 25+ brands",
    "Country and region of origin",
    "Model year decode (with 30-year cycle disambiguation)",
    "Plant code and production sequence",
    "Visual VIN character breakdown",
    "Free, no signup required for the basic decode",
  ],
  publisher: { "@type": "Organization", name: "CarCheckerVIN", url: "https://www.carcheckervin.com", logo: { "@type": "ImageObject", url: "https://www.carcheckervin.com/icon.png" } },
  datePublished: PUBLISHED, dateModified: MODIFIED,
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.carcheckervin.com/" },
    { "@type": "ListItem", position: 2, name: "Tools", item: "https://www.carcheckervin.com/tools" },
    { "@type": "ListItem", position: 3, name: "Motorcycle VIN Search", item: PAGE_URL },
  ],
};

const faqSchema = {
  "@context": "https://schema.org", "@type": "FAQPage", inLanguage: "en",
  mainEntity: FAQS_EN.map((f) => ({
    "@type": "Question", name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

export default function MotorcycleVinSearchPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <MotorcycleVinSearchBody locale="en" />
    </>
  );
}
