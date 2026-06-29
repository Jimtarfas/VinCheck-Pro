import type { Metadata } from "next";
import TeslaFremontVinBody, { FAQS_EN } from "@/components/TeslaFremontVinBody";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";

export const metadata: Metadata = {
  title: "Tesla Fremont VIN Lookup — Gigafactory California (5YJ)",
  description: "Free Tesla Fremont VIN lookup. Decode any 5YJ Tesla from Gigafactory California (Fremont, CA). NMVTIS title brands, NHTSA recalls, year-code C 2012 first-year Model S identification.",
  keywords: ["tesla fremont vin lookup", "tesla fremont vin", "gigafactory california vin", "tesla 5yj vin", "tesla 5yj decoder", "fremont tesla vin check", "tesla model s 2012 first year", "tesla nummi plant", "tesla fremont nmvtis", "tesla california plant vin"],
  alternates: { canonical: "/tesla-fremont-vin" },
  openGraph: { title: "Tesla Fremont VIN Lookup — Gigafactory California (5YJ)", description: "Free Tesla Fremont VIN lookup \u2014 decode any 5YJ Tesla from Gigafactory California with NMVTIS title brands and NHTSA recalls.", url: `${SITE}/tesla-fremont-vin`, type: "article", siteName: "CarCheckerVIN" },
  twitter: { card: "summary_large_image", title: "Tesla Fremont VIN Lookup — Gigafactory California (5YJ)", description: "Free Tesla Fremont VIN lookup \u2014 decode any 5YJ Tesla with NMVTIS title brands and NHTSA recalls." },
  robots: { index: true, follow: true },
};

const webAppSchema = { "@context": "https://schema.org", "@type": "WebApplication", name: "Tesla Fremont VIN Lookup", url: `${SITE}/tesla-fremont-vin`, applicationCategory: "AutomotiveApplication", operatingSystem: "All", description: "Free Tesla Fremont VIN lookup. Decodes any 17-character Tesla VIN beginning with 5YJ to confirm Gigafactory California (Fremont) as the assembly plant. Returns NMVTIS-sourced title brands, the state-by-state title chain, accident events, and open NHTSA Tesla recalls including 23V-376 hood-latch on Model S and Model X, 23V-838 Autopilot remediation, and 24V-051 touchscreen visibility.", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } } };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", headline: "Tesla Fremont VIN Lookup — Gigafactory California (5YJ)", description: "What a Tesla Fremont VIN lookup reveals, how the former NUMMI plant became Gigafactory California, which Tesla models still ship from Fremont (Model S, X, 3, and older Y), and how to identify a first-year 2012 Model S via the year-code C in position 10.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } }, mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE}/tesla-fremont-vin` }, datePublished: "2026-06-28", dateModified: new Date().toISOString().slice(0, 10) };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQS_EN.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };
const howToSchema = { "@context": "https://schema.org", "@type": "HowTo", name: "How to Look Up a Tesla Fremont VIN", description: "Confirm Gigafactory California as the assembly plant for any 17-character Tesla VIN starting with 5YJ, then run a free history check against NMVTIS and the NHTSA recall feed.", totalTime: "PT1M", step: [
  { "@type": "HowToStep", position: 1, name: "Find the 17-character Tesla VIN", text: "Read the VIN from the lower driver-side corner of the windshield, the door-jamb sticker, the MyTesla app under the Vehicle tab, or the Tesla title document. Confirm it is 17 characters with no letters I, O, or Q." },
  { "@type": "HowToStep", position: 2, name: "Confirm the 5YJ Fremont WMI", text: "If the VIN begins with 5YJ, the Tesla was built at Gigafactory California in Fremont. Other Tesla WMIs are 7SAY (Austin), LRW (Shanghai), and XP7 (Berlin-Brandenburg)." },
  { "@type": "HowToStep", position: 3, name: "Enter the VIN into the Fremont VIN lookup tool", text: "Type or paste the 5YJ Tesla VIN into the free Fremont lookup form. The tool validates the format and the 5YJ WMI before it runs." },
  { "@type": "HowToStep", position: 4, name: "Review the plant-aware report", text: "See the confirmed Fremont plant, the decoded year and model (Model S, X, 3, or older Y), any NMVTIS title brands, accident events, and open NHTSA Tesla recalls attached to the VIN." },
] };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE }, { "@type": "ListItem", position: 2, name: "Tesla Fremont VIN Lookup", item: `${SITE}/tesla-fremont-vin` }] };
const speakableSchema = { "@context": "https://schema.org", "@type": "WebPage", speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".speakable-intro"] }, url: `${SITE}/tesla-fremont-vin` };

export default function TeslaFremontVinPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <TeslaFremontVinBody />
    </>
  );
}
