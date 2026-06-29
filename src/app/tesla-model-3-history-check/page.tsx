import type { Metadata } from "next";
import TeslaModel3HistoryCheckBody, { FAQS_EN } from "@/components/TeslaModel3HistoryCheckBody";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";

export const metadata: Metadata = {
  title: "Tesla Model 3 History Check — Free VIN Lookup",
  description: "Free Tesla Model 3 history check by VIN. NMVTIS title brands, salvage, flood, theft, ownership count, Gigafactory of origin, and open NHTSA recalls. Instant.",
  keywords: ["tesla model 3 history check", "model 3 vin lookup", "tesla model 3 vin check", "model 3 nmvtis", "salvage tesla model 3", "tesla model 3 history report", "model 3 supercharger lockout", "model 3 flood damage", "tesla model 3 title check", "fremont model 3 vin", "shanghai model 3 vin"],
  alternates: { canonical: "/tesla-model-3-history-check" },
  openGraph: { title: "Tesla Model 3 History Check — Free VIN Lookup", description: "Free Tesla Model 3 history check. NMVTIS title brands, salvage, flood, theft, and open recalls by VIN.", url: `${SITE}/tesla-model-3-history-check`, type: "article", siteName: "CarCheckerVIN" },
  twitter: { card: "summary_large_image", title: "Tesla Model 3 History Check — Free VIN Lookup", description: "Free Tesla Model 3 history check by VIN. NMVTIS sourced, instant." },
  robots: { index: true, follow: true },
};

const webAppSchema = { "@context": "https://schema.org", "@type": "WebApplication", name: "Tesla Model 3 History Check", url: `${SITE}/tesla-model-3-history-check`, applicationCategory: "AutomotiveApplication", operatingSystem: "All", description: "Free Tesla Model 3 history check by VIN. Returns NMVTIS-sourced title brands, salvage records, flood flags, theft and recovery status, ownership count, Gigafactory of origin (Fremont 5YJ or Shanghai LRW), and open NHTSA recalls.", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } } };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", headline: "Tesla Model 3 History Check — Free VIN Lookup", description: "What a free Tesla Model 3 history check actually shows, Tesla-specific salvage and Supercharger risks, year-by-year concerns, and how to use the result before you buy.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } }, mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE}/tesla-model-3-history-check` }, datePublished: "2026-06-29", dateModified: new Date().toISOString().slice(0, 10) };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQS_EN.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };
const howToSchema = { "@context": "https://schema.org", "@type": "HowTo", name: "How to Check Tesla Model 3 History by VIN", description: "Look up any 17-character Tesla Model 3 VIN against NMVTIS title brands and NHTSA recalls in seconds.", totalTime: "PT1M", step: [
  { "@type": "HowToStep", position: 1, name: "Find the 17-character Model 3 VIN", text: "Read the VIN from the lower driver-side corner of the windshield, the door jamb sticker, the MyTesla app, or the Tesla title." },
  { "@type": "HowToStep", position: 2, name: "Enter the VIN into the history check tool", text: "Type or paste the Model 3 VIN into the free history form. The tool validates the format before it runs." },
  { "@type": "HowToStep", position: 3, name: "Review the NMVTIS + NHTSA result", text: "See title brands, salvage and flood flags, theft and recovery status, ownership count, Gigafactory of origin, and any open NHTSA recalls." },
  { "@type": "HowToStep", position: 4, name: "Use the result to decide", text: "If anything looks off, order a full VIN history report or arrange an independent Tesla-certified inspection before you buy." },
] };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE }, { "@type": "ListItem", position: 2, name: "Tesla Model 3 History Check", item: `${SITE}/tesla-model-3-history-check` }] };
const speakableSchema = { "@context": "https://schema.org", "@type": "WebPage", speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".speakable-intro"] }, url: `${SITE}/tesla-model-3-history-check` };

export default function TeslaModel3HistoryCheckPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <TeslaModel3HistoryCheckBody />
    </>
  );
}
