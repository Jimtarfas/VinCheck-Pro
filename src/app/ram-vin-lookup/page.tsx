import type { Metadata } from "next";
import RamVinLookupBody, { FAQS_EN } from "@/components/RamVinLookupBody";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";

export const metadata: Metadata = {
  title: "RAM VIN Lookup — Free Decoded Report + Build Sheet | CarCheckerVIN",
  description: "Free RAM VIN lookup. Decode any RAM 1500, 2500, or 3500 VIN to see engine (Hemi, Cummins, EcoDiesel), cab and bed, axle, tow package, recalls, and title brands.",
  keywords: ["ram vin lookup", "ram vin decoder", "ram 1500 vin lookup", "ram 2500 vin lookup", "ram 3500 vin lookup", "dodge ram vin lookup", "mopar vin lookup", "cummins vin lookup", "ecodiesel vin lookup", "ram truck vin check", "ram vin number lookup", "free ram vin lookup", "ram recall lookup", "mopar broadcast sheet vin", "ram axle ratio vin"],
  alternates: { canonical: "/ram-vin-lookup" },
  openGraph: { title: "RAM VIN Lookup — Free Decoded Report + Build Sheet", description: "Free RAM VIN lookup. Decode any RAM 1500, 2500, or 3500 — engine, cab, axle, tow package, recalls, title brands. NMVTIS-sourced.", url: `${SITE}/ram-vin-lookup`, type: "article", siteName: "CarCheckerVIN" },
  twitter: { card: "summary_large_image", title: "RAM VIN Lookup — Free Decoded Report + Build Sheet", description: "Free RAM VIN lookup. Engine, cab, axle, tow package, recalls, and title brands — instantly." },
  robots: { index: true, follow: true },
};

const webAppSchema = { "@context": "https://schema.org", "@type": "WebApplication", name: "RAM VIN Lookup", url: `${SITE}/ram-vin-lookup`, applicationCategory: "AutomotiveApplication", operatingSystem: "All", description: "Free RAM VIN lookup tool. Enter any 17-character RAM VIN to instantly decode engine family (Hemi V8, Cummins, EcoDiesel, Pentastar), cab and bed configuration, axle ratio, trailer-tow package, plus title brand history and open Mopar/NHTSA safety recalls.", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } } };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", headline: "RAM VIN Lookup — Free Decoded Report + Build Sheet", description: "What a RAM VIN reveals, how to decode the WMI patterns (1C6, 3C6, 1D7), how the Mopar broadcast sheet ties in, where to find your VIN on a 1500 or HD 2500/3500, and the common recalls worth checking before you buy.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } }, mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE}/ram-vin-lookup` }, datePublished: "2026-06-28", dateModified: "2026-06-28" };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQS_EN.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };
const howToSchema = { "@context": "https://schema.org", "@type": "HowTo", name: "How to Lookup a RAM VIN for Free", description: "Lookup any 17-character RAM VIN to decode engine, cab, bed, axle, and tow package, plus title brands and open recalls in seconds.", totalTime: "PT1M", step: [
  { "@type": "HowToStep", position: 1, name: "Find the 17-character RAM VIN", text: "Read the VIN from the lower driver-side corner of the windshield, the door jamb sticker, the title, the insurance card, or the frame stamp on HD 2500/3500 trucks. Confirm it starts with 1C6, 3C6, 1D7, or 1D3 and is exactly 17 characters." },
  { "@type": "HowToStep", position: 2, name: "Enter the RAM VIN into the lookup tool", text: "Type or paste the VIN into the free RAM VIN lookup form. The tool validates the format and the RAM WMI before it runs." },
  { "@type": "HowToStep", position: 3, name: "Review the decoded RAM build and history", text: "See decoded engine (Hemi V8, Cummins, EcoDiesel, Pentastar), cab and bed configuration, axle ratio, trailer-tow package, plus title brands from NMVTIS and open Mopar/NHTSA recalls." },
  { "@type": "HowToStep", position: 4, name: "Use the result to decide", text: "Treat the lookup as your first checkpoint. If the report shows an open recall or title brand, order a full RAM history report or arrange a hands-on inspection before you buy." },
] };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE }, { "@type": "ListItem", position: 2, name: "RAM VIN Lookup", item: `${SITE}/ram-vin-lookup` }] };
const speakableSchema = { "@context": "https://schema.org", "@type": "WebPage", speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".speakable-intro"] }, url: `${SITE}/ram-vin-lookup` };

export default function RamVinLookupPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <RamVinLookupBody />
    </>
  );
}
