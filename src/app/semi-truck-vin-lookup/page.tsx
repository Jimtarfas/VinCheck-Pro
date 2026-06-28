/**
 * Wave 18 batch 3 — English semi-truck-vin-lookup (slim wrapper).
 * Layout & copy live in SemiTruckVinLookupBody so /es/semi-truck-vin-lookup can share.
 */

import type { Metadata } from "next";
import SemiTruckVinLookupBody, { FAQS_EN } from "@/components/SemiTruckVinLookupBody";
import { hreflangAlternates } from "@/lib/seo/hreflang";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/semi-truck-vin-lookup`;

export const metadata: Metadata = {
  title: "Semi Truck VIN Lookup — Free Decoder",
  description:
    "Decode any Freightliner, Peterbilt, Kenworth, Volvo or Mack tractor — plus semi trailers — to the year, engine, GVWR class, and plant. Free.",
  keywords: [
    "semi truck vin number lookup",
    "semi vin lookup",
    "freightliner vin number lookup",
    "peterbilt vin number lookup",
    "semi trailer vin lookup",
    "tractor trailer vin lookup",
    "trailer vin lookup free",
    "vin trailer lookup",
    "semi truck vin lookup free",
    "kenworth vin lookup",
    "volvo truck vin lookup",
    "mack truck vin lookup",
    "heavy truck vin decoder",
    "commercial truck vin lookup",
    "18 wheeler vin lookup",
  ],
  alternates: hreflangAlternates("/semi-truck-vin-lookup"),
  openGraph: {
    title: "Semi Truck VIN Lookup — Free Freightliner, Peterbilt & Trailer Decoder",
    description:
      "Decode any semi tractor or trailer VIN free — make, model year, engine, GVWR, and plant. Works for every Class 8 builder. Instant, no sign-up.",
    url: PAGE_URL,
    type: "article",
    siteName: "CarCheckerVIN",
    images: [{ url: `${SITE}/semi-truck-vin-lookup/opengraph-image`, width: 1200, height: 630, alt: "Semi Truck VIN Lookup — decode any tractor or trailer VIN free" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Semi Truck VIN Lookup — Free Freightliner, Peterbilt & Trailer Decoder",
    description: "Decode any semi tractor or trailer VIN free — year, engine, GVWR, and plant. Every Class 8 builder. Instant.",
    images: [`${SITE}/semi-truck-vin-lookup/opengraph-image`],
  },
  robots: { index: true, follow: true },
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Semi Truck VIN Lookup",
  url: PAGE_URL,
  applicationCategory: "AutomotiveApplication",
  operatingSystem: "All",
  description:
    "Free tool to decode any semi truck or trailer VIN — Freightliner, Peterbilt, Kenworth, Volvo, Mack, International — to find the make, model year, engine, GVWR class, and assembly plant.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS_EN.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Look Up a Semi Truck or Trailer by VIN",
  description:
    "Step-by-step guide to finding and decoding a semi truck or trailer VIN to identify the make, year, engine, and history.",
  totalTime: "PT2M",
  step: [
    { "@type": "HowToStep", position: 1, name: "Locate the VIN", text: "Find the 17-character VIN on the driver-side door jamb, the frame rail near the front axle, the dashboard through the windshield, or the title and cab card. On a trailer, check the front wall plate and the driver-side frame near the landing gear." },
    { "@type": "HowToStep", position: 2, name: "Copy all 17 characters exactly", text: "Write the VIN down character for character. The letters I, O, and Q are never used — anything that looks like one is really a 1 or a 0." },
    { "@type": "HowToStep", position: 3, name: "Enter it into the decoder", text: "Paste the VIN into the lookup field and submit. The decoder identifies the manufacturer, model line, model year, engine, GVWR class, and plant instantly." },
    { "@type": "HowToStep", position: 4, name: "Match it to the listing and the title", text: "Confirm the decoded make, model, and year match the advert and the title. Match the frame-rail stamping to the door label — a mismatch is a red flag for a cloned or salvage-rebuilt truck." },
    { "@type": "HowToStep", position: 5, name: "Run a full history check before buying", text: "Extend the decode into a full history report to surface title brands, odometer rollback, accident records, liens, and theft data tied to that VIN before any money changes hands." },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE },
    { "@type": "ListItem", position: 2, name: "Semi Truck VIN Lookup", item: PAGE_URL },
  ],
};

const speakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".speakable-intro"] },
  url: PAGE_URL,
};

export default function SemiTruckVinLookupPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <SemiTruckVinLookupBody locale="en" />
    </>
  );
}
