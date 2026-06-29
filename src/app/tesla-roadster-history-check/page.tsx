import type { Metadata } from "next";
import TeslaRoadsterHistoryCheckBody, { FAQS_EN } from "@/components/TeslaRoadsterHistoryCheckBody";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";

export const metadata: Metadata = {
  title: "Tesla Roadster History Check — Free VIN Report",
  description: "Free Tesla Roadster history check by VIN. NMVTIS title brands, salvage, flood, and NHTSA recalls for first-gen 2008-2012 and second-gen Roadster.",
  keywords: ["tesla roadster history check", "tesla roadster vin check", "tesla roadster vin lookup", "first-gen roadster vin", "tesla roadster 2008", "tesla roadster 2012", "tesla roadster salvage", "tesla roadster authentication", "tesla roadster nmvtis", "free tesla roadster vin check", "tesla roadster recall lookup"],
  alternates: { canonical: "/tesla-roadster-history-check" },
  openGraph: { title: "Tesla Roadster History Check — Free VIN Report", description: "Free Tesla Roadster history check by VIN — NMVTIS title brands, salvage, flood, and recall status for first-gen and second-gen Roadsters.", url: `${SITE}/tesla-roadster-history-check`, type: "article", siteName: "CarCheckerVIN" },
  twitter: { card: "summary_large_image", title: "Tesla Roadster History Check — Free VIN Report", description: "Free Tesla Roadster history check — NMVTIS title brands, salvage, flood, and recall status." },
  robots: { index: true, follow: true },
};

const webAppSchema = { "@context": "https://schema.org", "@type": "WebApplication", name: "Tesla Roadster History Check", url: `${SITE}/tesla-roadster-history-check`, applicationCategory: "AutomotiveApplication", operatingSystem: "All", description: "Free Tesla Roadster history check by VIN. Returns NMVTIS-sourced title brands (salvage, flood, junk, rebuilt, lemon), state-by-state title chain, total-loss flags, decoded Roadster specs, and any open NHTSA Tesla campaigns. Covers first-generation 2008-2012 Roadsters and any second-generation units once VINs are issued.", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } } };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", headline: "Tesla Roadster History Check — Free VIN Report", description: "What a free Tesla Roadster history check reveals, why VIN authentication matters on first-gen 2008-2012 Roadsters, chassis-corrosion risk on the Lotus-derived bonded-aluminum chassis, and why 14-year-old battery cells need pack-replacement history.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } }, mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE}/tesla-roadster-history-check` }, datePublished: "2026-06-29", dateModified: new Date().toISOString().slice(0, 10) };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQS_EN.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };
const howToSchema = { "@context": "https://schema.org", "@type": "HowTo", name: "How to Run a Tesla Roadster History Check by VIN", description: "Look up any 17-character Tesla Roadster VIN to see decoded specs, NMVTIS title brands, salvage and flood records, and open Tesla campaigns in seconds.", totalTime: "PT1M", step: [
  { "@type": "HowToStep", position: 1, name: "Find the 17-character Roadster VIN", text: "Read the VIN from the lower driver-side windshield dash plate, the door jamb sticker, the Roadster title, the insurance card, or the chassis plate behind the driver seat on first-gen cars. Confirm it is 17 characters with no letters I, O, or Q." },
  { "@type": "HowToStep", position: 2, name: "Enter the VIN into the Roadster history check tool", text: "Type or paste the Roadster VIN into the free history check form. The tool validates the format before it runs." },
  { "@type": "HowToStep", position: 3, name: "Review the NMVTIS title history and recall feed", text: "See the decoded year and plant alongside title brands, salvage and flood records, and any open Tesla campaigns pulled from NMVTIS and NHTSA." },
  { "@type": "HowToStep", position: 4, name: "Decide before you buy", text: "Treat the Tesla Roadster history check as your first checkpoint. If anything looks off, order a full Tesla VIN history report or arrange a Roadster-specialist inspection before you buy." },
] };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE }, { "@type": "ListItem", position: 2, name: "Tesla Roadster History Check", item: `${SITE}/tesla-roadster-history-check` }] };
const speakableSchema = { "@context": "https://schema.org", "@type": "WebPage", speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".speakable-intro"] }, url: `${SITE}/tesla-roadster-history-check` };

export default function TeslaRoadsterHistoryCheckPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <TeslaRoadsterHistoryCheckBody />
    </>
  );
}
