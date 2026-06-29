import type { Metadata } from "next";
import TeslaGigafactoryByVinBody, { FAQS_EN } from "@/components/TeslaGigafactoryByVinBody";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";

export const metadata: Metadata = {
  title: "Tesla Gigafactory by VIN — Free WMI Decoder (5YJ, 7SAY, LRW, XP7)",
  description: "Free Tesla Gigafactory VIN decoder. Read the WMI (positions 1-3) to identify Fremont, Austin, Shanghai, or Berlin in seconds. NMVTIS-approved provider.",
  keywords: ["tesla gigafactory by vin", "tesla gigafactory vin decoder", "tesla wmi 5YJ", "tesla wmi 7SAY", "tesla wmi LRW", "tesla wmi XP7", "tesla fremont vin", "tesla austin vin", "tesla shanghai vin", "tesla berlin vin", "where was my tesla built", "tesla plant decoder", "tesla import vin"],
  alternates: { canonical: "/tesla-gigafactory-by-vin" },
  openGraph: { title: "Tesla Gigafactory by VIN — Free WMI Decoder (5YJ, 7SAY, LRW, XP7)", description: "Free Tesla Gigafactory VIN decoder. Identify Fremont, Austin, Shanghai, or Berlin from any 17-character Tesla VIN. Instant, no sign-up.", url: `${SITE}/tesla-gigafactory-by-vin`, type: "article", siteName: "CarCheckerVIN" },
  twitter: { card: "summary_large_image", title: "Tesla Gigafactory by VIN — Free WMI Decoder", description: "Free Tesla Gigafactory decoder. Read the WMI to identify the assembly plant — Fremont, Austin, Shanghai, or Berlin." },
  robots: { index: true, follow: true },
};

const webAppSchema = { "@context": "https://schema.org", "@type": "WebApplication", name: "Tesla Gigafactory by VIN", url: `${SITE}/tesla-gigafactory-by-vin`, applicationCategory: "AutomotiveApplication", operatingSystem: "All", description: "Free Tesla Gigafactory VIN decoder. Read the World Manufacturer Identifier (positions 1-3 of the Tesla VIN) under the SAE J853 standard to identify the assembly Gigafactory — 5YJ for California (Fremont), 7SAY for Texas (Austin), LRW for Shanghai, XP7 for Berlin.", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } } };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", headline: "Tesla Gigafactory by VIN — Free WMI Decoder", description: "How to decode any Tesla VIN to identify the assembly Gigafactory — Fremont, Austin, Shanghai, or Berlin — using the SAE J853 World Manufacturer Identifier standard.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } }, mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE}/tesla-gigafactory-by-vin` }, datePublished: "2026-06-28", dateModified: new Date().toISOString().slice(0, 10) };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQS_EN.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };
const howToSchema = { "@context": "https://schema.org", "@type": "HowTo", name: "How to Decode a Tesla Gigafactory by VIN", description: "Identify which of Tesla's four Gigafactories built a specific Tesla using the first three characters of the 17-character VIN.", totalTime: "PT1M", step: [
  { "@type": "HowToStep", position: 1, name: "Find the 17-character Tesla VIN", text: "Read the VIN from the lower driver-side corner of the windshield, the door jamb sticker, the Tesla title, or the MyTesla app." },
  { "@type": "HowToStep", position: 2, name: "Enter the VIN into the Tesla Gigafactory decoder", text: "Type or paste the Tesla VIN into the free decoder form. The tool reads the first three characters (the World Manufacturer Identifier)." },
  { "@type": "HowToStep", position: 3, name: "Match the WMI to its Gigafactory", text: "5YJ is Gigafactory California (Fremont), 7SAY is Gigafactory Texas (Austin), LRW is Gigafactory Shanghai, and XP7 is Gigafactory Berlin." },
  { "@type": "HowToStep", position: 4, name: "Verify Tesla USA warranty and EPA paperwork for imports", text: "Shanghai (LRW) and Berlin (XP7) Teslas in the US are usually gray-market imports — confirm Tesla USA warranty coverage and EPA compliance directly with Tesla before purchase." },
] };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE }, { "@type": "ListItem", position: 2, name: "Tesla Gigafactory by VIN", item: `${SITE}/tesla-gigafactory-by-vin` }] };
const speakableSchema = { "@context": "https://schema.org", "@type": "WebPage", speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".speakable-intro"] }, url: `${SITE}/tesla-gigafactory-by-vin` };

export default function TeslaGigafactoryByVinPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <TeslaGigafactoryByVinBody />
    </>
  );
}
