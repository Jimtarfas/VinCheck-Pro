import type { Metadata } from "next";
import WindowStickerBody, { FAQS_EN } from "@/components/WindowStickerBody";
import { hreflangAlternates } from "@/lib/seo/hreflang";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/window-sticker`;
const OG_IMAGE = `${SITE}/opengraph-image`;
const PUBLISHED = "2026-05-04";
const MODIFIED = "2026-05-07";
const alt = hreflangAlternates("/window-sticker");

export const metadata: Metadata = {
  title: "Free Window Sticker Maker — Build & Download a Monroney Label by VIN",
  description:
    "Create a free Monroney-style window sticker for any car, truck, or SUV in under a minute. Auto-fill from VIN, edit MSRP, options, and EPA fuel economy, then download or print. Works for Ford, Chevy, Toyota, Honda, BMW, and every U.S.-market vehicle.",
  keywords: [
    "window sticker maker", "monroney label maker", "monroney label generator", "window sticker generator",
    "create window sticker", "build window sticker", "free window sticker maker", "window sticker creator",
    "window sticker by VIN", "monroney sticker by VIN", "make window sticker from VIN", "VIN to window sticker",
    "lookup window sticker by VIN", "factory window sticker by VIN",
    "download window sticker", "print window sticker", "save window sticker as PDF",
    "window sticker PDF download", "window sticker template", "window sticker online", "make window sticker online free",
    "Ford window sticker", "Chevy window sticker", "Toyota window sticker", "Honda window sticker",
    "BMW window sticker", "Jeep window sticker", "RAM window sticker",
    "how to make a window sticker", "what is a Monroney label", "original MSRP by VIN",
    "factory equipment by VIN", "EPA fuel economy by VIN",
  ],
  authors: [{ name: "CarCheckerVIN", url: SITE }],
  creator: "CarCheckerVIN",
  publisher: "CarCheckerVIN",
  category: "Automotive Tools",
  applicationName: "CarCheckerVIN Window Sticker Maker",
  alternates: { canonical: alt.canonical, languages: alt.languages },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large", "max-video-preview": -1 },
  },
  openGraph: {
    title: "Free Window Sticker Maker — Build & Download a Monroney Label by VIN",
    description: "Create a professional Monroney-style window sticker in seconds. Auto-fill from VIN, edit MSRP and factory options, then download or print — completely free.",
    url: PAGE_URL, siteName: "CarCheckerVIN", type: "website", locale: "en_US",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "CarCheckerVIN Window Sticker Maker — build a Monroney label by VIN" }],
  },
  twitter: {
    card: "summary_large_image", site: "@CarCheckerVIN", creator: "@CarCheckerVIN",
    title: "Free Window Sticker Maker — Build a Monroney Label by VIN",
    description: "Auto-fill any vehicle from a VIN, customize MSRP and options, then download a Monroney-style window sticker. 100% free.",
    images: [OG_IMAGE],
  },
  other: { "msvalidate.01": "", "msapplication-TileColor": "#0c2d5e", "theme-color": "#0c2d5e" },
};

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": ["WebApplication", "SoftwareApplication"],
  "@id": `${PAGE_URL}#tool`,
  name: "Window Sticker Maker",
  alternateName: ["Monroney Label Maker", "Window Sticker Generator"],
  url: PAGE_URL,
  applicationCategory: ["BusinessApplication", "UtilitiesApplication"],
  applicationSubCategory: "Automotive",
  operatingSystem: "Any (Web Browser)",
  browserRequirements: "Requires JavaScript and a modern web browser",
  inLanguage: "en-US",
  isAccessibleForFree: true,
  description: "Free online window sticker maker. Auto-fill vehicle data from a 17-character VIN, add factory options and MSRP, and download or print a Monroney-style window sticker.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD", availability: "https://schema.org/InStock" },
  featureList: [
    "Auto-fill from 17-character VIN", "Edit base MSRP, destination charge, and option pricing",
    "Add unlimited factory options and packages", "Standard equipment list builder",
    "EPA fuel economy block (city, highway, combined)", "Live Monroney-style preview",
    "Print-to-PDF export", "Portable HTML download",
  ],
  publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/icon.png` } },
  datePublished: PUBLISHED, dateModified: MODIFIED,
};

const breadcrumbSchema = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
    { "@type": "ListItem", position: 2, name: "Tools", item: `${SITE}/tools` },
    { "@type": "ListItem", position: 3, name: "Window Sticker Maker", item: PAGE_URL },
  ],
};

const howToSchema = {
  "@context": "https://schema.org", "@type": "HowTo",
  name: "How to Make a Window Sticker by VIN",
  description: "Build a Monroney-style window sticker for any vehicle in under a minute using only the VIN.",
  totalTime: "PT1M",
  estimatedCost: { "@type": "MonetaryAmount", currency: "USD", value: "0" },
  supply: [{ "@type": "HowToSupply", name: "17-character vehicle VIN" }],
  tool: [{ "@type": "HowToTool", name: "CarCheckerVIN Window Sticker Maker" }],
  step: [
    { "@type": "HowToStep", position: 1, name: "Enter the VIN", text: "Type or paste the 17-character VIN into the auto-fill field at the top of the maker.", url: `${PAGE_URL}#step-1` },
    { "@type": "HowToStep", position: 2, name: "Decode and review", text: "Click Decode to pull year, make, model, engine, MSRP, equipment, and EPA fuel economy from the factory record.", url: `${PAGE_URL}#step-2` },
    { "@type": "HowToStep", position: 3, name: "Edit options and pricing", text: "Add or remove optional packages, adjust MSRP and destination charge, and refine the standard equipment list.", url: `${PAGE_URL}#step-3` },
    { "@type": "HowToStep", position: 4, name: "Sign in to download or print", text: "Create a free account or sign in, then click Print / Save as PDF for a clean export, or Download to save the sticker as an HTML file.", url: `${PAGE_URL}#step-4` },
  ],
};

const faqSchema = {
  "@context": "https://schema.org", "@type": "FAQPage",
  mainEntity: FAQS_EN.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
};

const speakableSchema = {
  "@context": "https://schema.org", "@type": "WebPage", "@id": `${PAGE_URL}#webpage`,
  url: PAGE_URL, name: "Window Sticker Maker — Free Monroney Label Generator by VIN",
  inLanguage: "en-US",
  isPartOf: { "@type": "WebSite", name: "CarCheckerVIN", url: SITE },
  primaryImageOfPage: { "@type": "ImageObject", url: OG_IMAGE },
  speakable: { "@type": "SpeakableSpecification", cssSelector: ["#what-is-a-window-sticker", "#how-to-make"] },
  datePublished: PUBLISHED, dateModified: MODIFIED,
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <WindowStickerBody locale="en" />
    </>
  );
}
