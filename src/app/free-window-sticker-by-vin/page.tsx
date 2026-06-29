import type { Metadata } from "next";
import FreeWindowStickerByVinBody, { FAQS_EN } from "@/components/FreeWindowStickerByVinBody";
import { hreflangAlternates } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/free-window-sticker-by-vin`;
const OG_IMAGE = `${SITE}/opengraph-image`;
const alt = hreflangAlternates("/free-window-sticker-by-vin");

export const metadata: Metadata = {
  title: "Free Window Sticker by VIN — Monroney Label",
  description:
    "Get a free window sticker by VIN. Enter a 17-character VIN to pull the original Monroney label — MSRP, factory options, and EPA MPG. Print or save as PDF.",
  keywords: [
    "free window sticker by vin", "monroney sticker by vin", "window sticker by vin",
    "window sticker by vin free", "toyota window sticker by vin", "toyota window sticker by vin free",
    "vehicle window sticker by vin", "window sticker for vin", "car sticker by vin",
    "ford window sticker pdf free download", "window sticker lookup free", "monroney label by vin",
    "free monroney sticker", "window sticker by vin toyota", "carfax window sticker by vin",
  ],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: {
    title: "Free Window Sticker by VIN — Monroney Label",
    description: "Pull a free Monroney window sticker straight from the VIN — MSRP, factory options, and EPA fuel economy. Print or save as PDF.",
    url: PAGE_URL, siteName: "CarCheckerVIN", type: "article",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Free Window Sticker by VIN" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Window Sticker by VIN — Original Monroney Label",
    description: "Get any vehicle's original window sticker free from its VIN — MSRP, options, and EPA MPG.",
    images: [OG_IMAGE],
  },
  robots: { index: true, follow: true },
};

const webAppSchema = {
  "@context": "https://schema.org", "@type": "WebApplication",
  name: "Free Window Sticker by VIN", url: PAGE_URL,
  applicationCategory: "AutomotiveApplication", operatingSystem: "All",
  description: "Generate a vehicle's original Monroney window sticker for free using its 17-character VIN. Retrieves base MSRP, factory options and packages, standard equipment, and EPA fuel economy, then exports to print or PDF.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } },
};

const articleSchema = {
  "@context": "https://schema.org", "@type": "Article",
  headline: "Free Window Sticker by VIN — Original Monroney Label at No Charge",
  description: "How to get a free window sticker by VIN, what the Monroney label includes, which brands are covered, and how a free VIN sticker compares to paid Carfax and dealer reports.",
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
  name: "How to Get a Free Window Sticker by VIN",
  description: "Pull a vehicle's original Monroney window sticker for free in under a minute using only the 17-character VIN.",
  totalTime: "PT1M",
  estimatedCost: { "@type": "MonetaryAmount", currency: "USD", value: "0" },
  supply: [{ "@type": "HowToSupply", name: "17-character vehicle VIN" }],
  tool: [{ "@type": "HowToTool", name: "CarCheckerVIN Free Window Sticker by VIN" }],
  step: [
    { "@type": "HowToStep", position: 1, name: "Enter the VIN", text: "Type or paste the 17-character VIN into the auto-fill field at the top of the tool." },
    { "@type": "HowToStep", position: 2, name: "Decode for free", text: "Click Decode to pull MSRP, factory options, standard equipment, and EPA fuel economy from the build record at no charge." },
    { "@type": "HowToStep", position: 3, name: "Edit if needed", text: "Adjust MSRP, add or remove options, and refine the equipment list to match the exact build." },
    { "@type": "HowToStep", position: 4, name: "Print or save free", text: "Sign in with a free account, then print the window sticker or save it as a PDF — no fee." },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
    { "@type": "ListItem", position: 2, name: "Tools", item: `${SITE}/tools` },
    { "@type": "ListItem", position: 3, name: "Free Window Sticker by VIN", item: PAGE_URL },
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
      <FreeWindowStickerByVinBody locale="en" />
    </>
  );
}
