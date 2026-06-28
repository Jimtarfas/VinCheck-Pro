/**
 * Wave 18 batch 3 — English hin-lookup. Same full layout shared with
 * /es/hin-lookup via HinLookupBody.
 */

import type { Metadata } from "next";
import HinLookupBody, { FAQS_EN } from "@/components/HinLookupBody";
import { hreflangAlternates } from "@/lib/seo/hreflang";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/hin-lookup`;

export const metadata: Metadata = {
  title: "HIN Lookup — Free Boat Hull ID Decoder",
  description: "A boat's Hull Identification Number is its VIN. Decode the 12-character HIN to find the manufacturer code, hull serial, and build year. Free.",
  keywords: ["hin lookup", "hull identification number lookup", "boat vin lookup", "boat vin check", "hin decoder", "decode hin number", "boat hull number lookup", "free boat vin check", "hull id number lookup", "what is a hin number", "where is the hin on a boat", "boat serial number lookup", "uscg hin format", "watercraft vin lookup", "jet ski vin lookup", "pwc hin lookup", "boat manufacturer code lookup", "mic lookup boat", "check boat history by hin", "boat hin year decoder"],
  alternates: hreflangAlternates("/hin-lookup"),
  openGraph: {
    title: "HIN Lookup — Free Boat Hull Identification Number Decoder",
    description: "A boat's HIN is its VIN. Decode the 12-character Hull Identification Number free to find the manufacturer, serial, and build year. USCG format, instant, no sign-up.",
    url: PAGE_URL,
    type: "article",
    siteName: "CarCheckerVIN",
    images: [{ url: `${SITE}/hin-lookup/opengraph-image`, width: 1200, height: 630, alt: "HIN Lookup — free boat hull identification number decoder" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "HIN Lookup — Free Boat Hull Identification Number Decoder",
    description: "Decode any 12-character boat HIN free — manufacturer code, hull serial, and build year. The boat equivalent of a VIN. Instant, no sign-up.",
    images: [`${SITE}/hin-lookup/opengraph-image`],
  },
  robots: { index: true, follow: true },
};

const webAppSchema = { "@context": "https://schema.org", "@type": "WebApplication", name: "HIN Lookup — Boat Hull Identification Number Decoder", url: PAGE_URL, applicationCategory: "AutomotiveApplication", operatingSystem: "All", description: "Free tool to decode a boat's 12-character Hull Identification Number (HIN) — the marine equivalent of a VIN. Returns the manufacturer identification code, hull serial number, and build/model year for any boat built since 1972.", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } } };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQS_EN.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };
const howToSchema = { "@context": "https://schema.org", "@type": "HowTo", name: "How to Look Up a Boat by Its HIN (Hull Identification Number)", description: "Step-by-step guide to finding and decoding a boat's 12-character Hull Identification Number to identify the manufacturer, serial, and build year.", totalTime: "PT2M", step: [{ "@type": "HowToStep", position: 1, name: "Find the HIN on the transom", text: "Look at the upper starboard (right) corner of the transom — the flat rear of the boat — within two inches of the top edge. The 12-character HIN is permanently stamped or plated there." }, { "@type": "HowToStep", position: 2, name: "Copy all 12 characters", text: "Write the HIN down exactly. It is exactly 12 characters: a 3-character manufacturer code, a 5-character serial, and a 4-character date section." }, { "@type": "HowToStep", position: 3, name: "Decode it instantly", text: "Enter the HIN into the decoder above. It splits out the manufacturer identification code (MIC), the hull serial number, and translates the build-date characters into a month and year." }, { "@type": "HowToStep", position: 4, name: "Match it to the paperwork", text: "Confirm the decoded HIN matches the number on the registration and title, and that the hidden duplicate HIN on the hull agrees. A mismatch is a red flag for a re-numbered or stolen hull." }, { "@type": "HowToStep", position: 5, name: "Run a history and theft check", text: "Use the verified HIN to check title status, recalls, and theft records through your state titling agency and the US Coast Guard before you buy." }] };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE }, { "@type": "ListItem", position: 2, name: "HIN Lookup", item: PAGE_URL }] };
const speakableSchema = { "@context": "https://schema.org", "@type": "WebPage", speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".speakable-intro"] }, url: PAGE_URL };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <HinLookupBody locale="en" />
    </>
  );
}
