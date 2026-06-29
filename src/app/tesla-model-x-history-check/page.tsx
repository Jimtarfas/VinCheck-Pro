import type { Metadata } from "next";
import TeslaModelXHistoryCheckBody, { FAQS_EN } from "@/components/TeslaModelXHistoryCheckBody";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";

export const metadata: Metadata = {
  title: "Tesla Model X History Check — Free VIN Report & Recalls",
  description: "Free Tesla Model X history check by VIN. NMVTIS title brands, salvage, flood, Supercharger-lockout risk, falcon-wing door recalls, and open NHTSA campaigns.",
  keywords: ["tesla model x history check", "tesla model x vin check", "tesla model x vin lookup", "model x history", "tesla model x salvage", "tesla model x flood", "model x recall lookup", "tesla model x falcon wing recall", "tesla model x supercharger lockout", "free tesla model x vin check", "tesla model x nmvtis"],
  alternates: { canonical: "/tesla-model-x-history-check" },
  openGraph: { title: "Tesla Model X History Check — Free VIN Report & Recalls", description: "Free Tesla Model X history check by VIN — NMVTIS title brands, salvage, flood, falcon-wing door recalls, and Supercharger-lockout risk.", url: `${SITE}/tesla-model-x-history-check`, type: "article", siteName: "CarCheckerVIN" },
  twitter: { card: "summary_large_image", title: "Tesla Model X History Check — Free VIN Report & Recalls", description: "Free Tesla Model X history check — NMVTIS title brands, salvage, flood, falcon-wing door recalls." },
  robots: { index: true, follow: true },
};

const webAppSchema = { "@context": "https://schema.org", "@type": "WebApplication", name: "Tesla Model X History Check", url: `${SITE}/tesla-model-x-history-check`, applicationCategory: "AutomotiveApplication", operatingSystem: "All", description: "Free Tesla Model X history check by VIN. Returns NMVTIS-sourced title brands (salvage, flood, junk, rebuilt, lemon), state-by-state title chain, total-loss flags, decoded Model X specs, and open NHTSA Tesla recalls including the Autopilot remediation, touchscreen visibility, and 2016-2018 falcon-wing door campaigns.", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } } };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", headline: "Tesla Model X History Check — Free VIN Report & Recalls", description: "What a free Tesla Model X history check reveals, how Supercharger lockout works on salvage Model X VINs, why flood damage is catastrophic to the high-voltage system, and which 2016-2018 falcon-wing door recalls to confirm before buying.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } }, mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE}/tesla-model-x-history-check` }, datePublished: "2026-06-29", dateModified: new Date().toISOString().slice(0, 10) };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQS_EN.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };
const howToSchema = { "@context": "https://schema.org", "@type": "HowTo", name: "How to Run a Tesla Model X History Check by VIN", description: "Look up any 17-character Tesla Model X VIN to see decoded specs, NMVTIS title brands, salvage and flood records, and open Tesla recalls in seconds.", totalTime: "PT1M", step: [
  { "@type": "HowToStep", position: 1, name: "Find the 17-character Model X VIN", text: "Read the VIN from the lower driver-side corner of the windshield, the door jamb sticker, the Model X title, the insurance card, or the Tesla mobile app vehicle profile. Confirm it is 17 characters with no letters I, O, or Q." },
  { "@type": "HowToStep", position: 2, name: "Enter the VIN into the Tesla Model X history check tool", text: "Type or paste the Model X VIN into the free history check form. The tool validates the format before it runs." },
  { "@type": "HowToStep", position: 3, name: "Review the NMVTIS title history and recall feed", text: "See the decoded year, configuration, and plant alongside title brands, salvage and flood records, and any open Tesla recalls pulled from NMVTIS and NHTSA." },
  { "@type": "HowToStep", position: 4, name: "Decide before you buy", text: "Treat the Tesla Model X history check as your first checkpoint. If anything looks off, order a full Tesla VIN history report or arrange an EV-experienced inspection before you buy." },
] };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE }, { "@type": "ListItem", position: 2, name: "Tesla Model X History Check", item: `${SITE}/tesla-model-x-history-check` }] };
const speakableSchema = { "@context": "https://schema.org", "@type": "WebPage", speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".speakable-intro"] }, url: `${SITE}/tesla-model-x-history-check` };

export default function TeslaModelXHistoryCheckPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <TeslaModelXHistoryCheckBody />
    </>
  );
}
