import type { Metadata } from "next";
import TeslaCybertruckHistoryCheckBody, { FAQS_EN } from "@/components/TeslaCybertruckHistoryCheckBody";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";

export const metadata: Metadata = {
  title: "Tesla Cybertruck History Check — Free VIN Report",
  description: "Free Tesla Cybertruck history check by VIN. NMVTIS title brands, salvage, flood, and NHTSA recalls including the April 2024 accelerator-pedal campaign.",
  keywords: ["tesla cybertruck history check", "cybertruck vin check", "cybertruck vehicle history", "cybertruck vin lookup", "cybertruck salvage", "cybertruck flood", "cybertruck recall lookup", "cybertruck accelerator pedal recall", "24v-273 recall", "free cybertruck vin check", "cybertruck nmvtis", "7say vin"],
  alternates: { canonical: "/tesla-cybertruck-history-check" },
  openGraph: { title: "Tesla Cybertruck History Check — Free VIN Report", description: "Free Tesla Cybertruck history check by VIN — NMVTIS title brands, salvage, flood, and accelerator-pedal recall status.", url: `${SITE}/tesla-cybertruck-history-check`, type: "article", siteName: "CarCheckerVIN" },
  twitter: { card: "summary_large_image", title: "Tesla Cybertruck History Check — Free VIN Report", description: "Free Tesla Cybertruck history check — NMVTIS title brands, salvage, flood, and recall status." },
  robots: { index: true, follow: true },
};

const webAppSchema = { "@context": "https://schema.org", "@type": "WebApplication", name: "Tesla Cybertruck History Check", url: `${SITE}/tesla-cybertruck-history-check`, applicationCategory: "AutomotiveApplication", operatingSystem: "All", description: "Free Tesla Cybertruck history check by VIN. Returns NMVTIS-sourced title brands (salvage, flood, junk, rebuilt, lemon), state-by-state title chain, total-loss flags, decoded Cybertruck specs, and open NHTSA Tesla recalls including the April 2024 accelerator-pedal pad campaign (24V-273), the February 2024 touchscreen visibility update (24V-051), and the December 2023 Autopilot remediation (23V-838).", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } } };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", headline: "Tesla Cybertruck History Check — Free VIN Report", description: "What a free Tesla Cybertruck history check reveals, why Supercharger lockout matters on salvage Cybertruck VINs, why flood damage is catastrophic to the 800V architecture, and which Cybertruck recalls to confirm before buying.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } }, mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE}/tesla-cybertruck-history-check` }, datePublished: "2026-06-29", dateModified: new Date().toISOString().slice(0, 10) };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQS_EN.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };
const howToSchema = { "@context": "https://schema.org", "@type": "HowTo", name: "How to Run a Tesla Cybertruck History Check by VIN", description: "Look up any 17-character Tesla Cybertruck VIN to see decoded specs, NMVTIS title brands, salvage and flood records, and open Tesla recalls in seconds.", totalTime: "PT1M", step: [
  { "@type": "HowToStep", position: 1, name: "Find the 17-character Cybertruck VIN", text: "Read the VIN from the lower driver-side corner of the windshield, the door jamb sticker, the Cybertruck title, the insurance card, or the Tesla mobile app vehicle profile. Confirm it is 17 characters and starts with 7SAY." },
  { "@type": "HowToStep", position: 2, name: "Enter the VIN into the Cybertruck history check tool", text: "Type or paste the Cybertruck VIN into the free history check form. The tool validates the format before it runs." },
  { "@type": "HowToStep", position: 3, name: "Review the NMVTIS title history and recall feed", text: "See the decoded year, configuration, and Austin plant alongside title brands, salvage and flood records, and any open Tesla recalls pulled from NMVTIS and NHTSA." },
  { "@type": "HowToStep", position: 4, name: "Decide before you buy", text: "Treat the Tesla Cybertruck history check as your first checkpoint. If anything looks off, order a full Tesla VIN history report or arrange an EV-experienced inspection before you buy." },
] };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE }, { "@type": "ListItem", position: 2, name: "Tesla Cybertruck History Check", item: `${SITE}/tesla-cybertruck-history-check` }] };
const speakableSchema = { "@context": "https://schema.org", "@type": "WebPage", speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".speakable-intro"] }, url: `${SITE}/tesla-cybertruck-history-check` };

export default function TeslaCybertruckHistoryCheckPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <TeslaCybertruckHistoryCheckBody />
    </>
  );
}
