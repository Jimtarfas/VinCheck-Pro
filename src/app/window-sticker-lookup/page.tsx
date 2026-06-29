import type { Metadata } from "next";
import WindowStickerLookupBody, { FAQS_EN } from "@/components/WindowStickerLookupBody";
import { hreflangAlternates } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/window-sticker-lookup`;
const OG_IMAGE = `${SITE}/opengraph-image`;
const alt = hreflangAlternates("/window-sticker-lookup");

export const metadata: Metadata = {
  title: "Window Sticker Lookup by VIN — Free Monroney",
  description:
    "Look up a window sticker by VIN free. Enter a 17-character VIN to pull the original Monroney label — MSRP, factory options, and EPA MPG. No Carfax fee.",
  keywords: [
    "window sticker lookup", "monroney sticker lookup", "window sticker lookup by vin",
    "vin number window sticker lookup", "sticker lookup by vin", "look up sticker by vin",
    "find window sticker with vin", "auto window sticker lookup", "window sticker lookup free",
    "vin sticker search", "carfax window sticker lookup", "ford window sticker lookup",
    "bmw window sticker lookup", "chrysler window sticker lookup", "toyota monroney sticker lookup",
    "dodge window sticker lookup by vin", "mopar window sticker lookup", "monroney window sticker lookup",
  ],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: {
    title: "Window Sticker Lookup by VIN — Free Monroney Label",
    description: "Free Monroney window sticker lookup by VIN. Pull original MSRP, factory options, and EPA fuel economy for any U.S.-market vehicle.",
    url: PAGE_URL, siteName: "CarCheckerVIN", type: "article",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Window Sticker Lookup by VIN" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Window Sticker Lookup by VIN — Original Monroney Label",
    description: "Look up any vehicle's original window sticker by VIN — MSRP, options, and EPA MPG. Free.",
    images: [OG_IMAGE],
  },
  robots: { index: true, follow: true },
};

const webAppSchema = {
  "@context": "https://schema.org", "@type": "WebApplication",
  name: "Window Sticker Lookup by VIN", url: PAGE_URL,
  applicationCategory: "AutomotiveApplication", operatingSystem: "All",
  description: "Look up a vehicle's original Monroney window sticker by its 17-character VIN. Retrieves base MSRP, factory options and packages, standard equipment, and EPA fuel economy for U.S.-market cars, trucks, and SUVs.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } },
};

const articleSchema = {
  "@context": "https://schema.org", "@type": "Article",
  headline: "Window Sticker Lookup by VIN — Find the Original Monroney Label",
  description: "How to look up a vehicle's original window sticker by VIN, what data a Monroney lookup returns, brand-by-brand coverage, and how a free VIN lookup compares to paid Carfax and CarEdge reports.",
  author: ORG_AUTHOR,
  publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } },
  mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL },
  datePublished: "2026-06-09", dateModified: new Date().toISOString().slice(0, 10),
};

const faqSchema = {
  "@context": "https://schema.org", "@type": "FAQPage",
  mainEntity: FAQS_EN.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
};

const howToSchema = {
  "@context": "https://schema.org", "@type": "HowTo",
  name: "How to Look Up a Window Sticker by VIN",
  description: "Find a vehicle's original Monroney window sticker in under a minute using only the 17-character VIN.",
  totalTime: "PT1M",
  estimatedCost: { "@type": "MonetaryAmount", currency: "USD", value: "0" },
  supply: [{ "@type": "HowToSupply", name: "17-character vehicle VIN" }],
  tool: [{ "@type": "HowToTool", name: "CarCheckerVIN Window Sticker Lookup" }],
  step: [
    { "@type": "HowToStep", position: 1, name: "Find the VIN", text: "Locate the 17-character VIN on the windshield base, driver-side door jamb, title, or registration." },
    { "@type": "HowToStep", position: 2, name: "Enter and decode", text: "Paste the VIN into the lookup tool and click Decode to pull the original factory build record." },
    { "@type": "HowToStep", position: 3, name: "Review the Monroney data", text: "Confirm MSRP, factory options and packages, standard equipment, and EPA fuel economy on the reconstructed sticker." },
    { "@type": "HowToStep", position: 4, name: "Print or save as PDF", text: "Sign in free, then print the window sticker or save it as a PDF for listings, records, or display." },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
    { "@type": "ListItem", position: 2, name: "Tools", item: `${SITE}/tools` },
    { "@type": "ListItem", position: 3, name: "Window Sticker Lookup", item: PAGE_URL },
  ],
};

const speakableSchema = {
  "@context": "https://schema.org", "@type": "WebPage", url: PAGE_URL,
  speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".speakable-intro", ".fast-answer"] },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <WindowStickerLookupBody locale="en" />
    </>
  );
}
