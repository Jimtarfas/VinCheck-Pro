import type { Metadata } from "next";
import TeslaAustinVinBody, { FAQS_EN } from "@/components/TeslaAustinVinBody";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";

export const metadata: Metadata = {
  title: "Tesla Austin VIN Lookup — Gigafactory Texas (7SAY)",
  description: "Free Tesla Austin VIN lookup. Decode any 7SAY Tesla from Gigafactory Texas (Austin, TX). NMVTIS title brands, NHTSA recalls including 24V-273 Cybertruck accelerator-pedal.",
  keywords: ["tesla austin vin lookup", "tesla austin vin", "gigafactory texas vin", "tesla 7say vin", "tesla 7say decoder", "austin tesla vin check", "cybertruck vin austin", "tesla texas plant vin", "tesla austin nmvtis", "tesla giga texas vin"],
  alternates: { canonical: "/tesla-austin-vin" },
  openGraph: { title: "Tesla Austin VIN Lookup — Gigafactory Texas (7SAY)", description: "Free Tesla Austin VIN lookup \u2014 decode any 7SAY Tesla from Gigafactory Texas with NMVTIS title brands and NHTSA recalls including 24V-273 Cybertruck accelerator-pedal.", url: `${SITE}/tesla-austin-vin`, type: "article", siteName: "CarCheckerVIN" },
  twitter: { card: "summary_large_image", title: "Tesla Austin VIN Lookup — Gigafactory Texas (7SAY)", description: "Free Tesla Austin VIN lookup \u2014 decode any 7SAY Tesla with NMVTIS title brands and NHTSA recalls." },
  robots: { index: true, follow: true },
};

const webAppSchema = { "@context": "https://schema.org", "@type": "WebApplication", name: "Tesla Austin VIN Lookup", url: `${SITE}/tesla-austin-vin`, applicationCategory: "AutomotiveApplication", operatingSystem: "All", description: "Free Tesla Austin VIN lookup. Decodes any 17-character Tesla VIN beginning with 7SAY to confirm Gigafactory Texas (Austin) as the assembly plant. Returns NMVTIS-sourced title brands, the state-by-state title chain, accident events, and open NHTSA Tesla recalls including 24V-273 Cybertruck accelerator-pedal trim, 24V-051 touchscreen visibility, and 23V-838 Autopilot remediation.", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } } };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", headline: "Tesla Austin VIN Lookup — Gigafactory Texas (7SAY)", description: "What a Tesla Austin VIN lookup reveals, how Gigafactory Texas became Tesla's flagship plant in April 2022, why every Cybertruck rolls off the Austin line, and how Tesla's corporate headquarters relocated to Austin in December 2021.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } }, mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE}/tesla-austin-vin` }, datePublished: "2026-06-28", dateModified: new Date().toISOString().slice(0, 10) };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQS_EN.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };
const howToSchema = { "@context": "https://schema.org", "@type": "HowTo", name: "How to Look Up a Tesla Austin VIN", description: "Confirm Gigafactory Texas as the assembly plant for any 17-character Tesla VIN starting with 7SAY, then run a free history check against NMVTIS and the NHTSA recall feed.", totalTime: "PT1M", step: [
  { "@type": "HowToStep", position: 1, name: "Find the 17-character Tesla VIN", text: "Read the VIN from the lower driver-side corner of the windshield, the door-jamb sticker, the MyTesla app under the Vehicle tab, or the Tesla title document. Confirm it is 17 characters with no letters I, O, or Q." },
  { "@type": "HowToStep", position: 2, name: "Confirm the 7SAY Austin WMI", text: "If the VIN begins with 7SAY, the Tesla was built at Gigafactory Texas in Austin. Other Tesla WMIs are 5YJ (Fremont), LRW (Shanghai), and XP7 (Berlin-Brandenburg)." },
  { "@type": "HowToStep", position: 3, name: "Enter the VIN into the Austin VIN lookup tool", text: "Type or paste the 7SAY Tesla VIN into the free Austin lookup form. The tool validates the format and the 7SAY WMI before it runs." },
  { "@type": "HowToStep", position: 4, name: "Review the plant-aware report", text: "See the confirmed Austin plant, the decoded year and model (Cybertruck or post-2022 Model Y), any NMVTIS title brands, accident events, and open NHTSA Tesla recalls attached to the VIN." },
] };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE }, { "@type": "ListItem", position: 2, name: "Tesla Austin VIN Lookup", item: `${SITE}/tesla-austin-vin` }] };
const speakableSchema = { "@context": "https://schema.org", "@type": "WebPage", speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".speakable-intro"] }, url: `${SITE}/tesla-austin-vin` };

export default function TeslaAustinVinPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <TeslaAustinVinBody />
    </>
  );
}
