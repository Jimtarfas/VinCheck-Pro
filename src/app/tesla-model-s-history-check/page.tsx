import type { Metadata } from "next";
import TeslaModelSHistoryCheckBody, { FAQS_EN } from "@/components/TeslaModelSHistoryCheckBody";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";

export const metadata: Metadata = {
  title: "Tesla Model S History Check — Free VIN Lookup",
  description: "Free Tesla Model S history check by VIN. NMVTIS title brands, salvage, flood, theft, ownership count, Fremont assembly, and open NHTSA recalls including 23V-376.",
  keywords: ["tesla model s history check", "model s vin lookup", "tesla model s vin check", "model s nmvtis", "salvage tesla model s", "tesla model s history report", "model s supercharger lockout", "model s 85 kwh battery", "tesla model s title check", "fremont model s vin", "23V-376 hood latch"],
  alternates: { canonical: "/tesla-model-s-history-check" },
  openGraph: { title: "Tesla Model S History Check — Free VIN Lookup", description: "Free Tesla Model S history check. NMVTIS title brands, salvage, flood, theft, and open recalls by VIN.", url: `${SITE}/tesla-model-s-history-check`, type: "article", siteName: "CarCheckerVIN" },
  twitter: { card: "summary_large_image", title: "Tesla Model S History Check — Free VIN Lookup", description: "Free Tesla Model S history check by VIN. NMVTIS sourced, instant." },
  robots: { index: true, follow: true },
};

const webAppSchema = { "@context": "https://schema.org", "@type": "WebApplication", name: "Tesla Model S History Check", url: `${SITE}/tesla-model-s-history-check`, applicationCategory: "AutomotiveApplication", operatingSystem: "All", description: "Free Tesla Model S history check by VIN. Returns NMVTIS-sourced title brands, salvage records, flood flags, theft and recovery status, ownership count, Fremont assembly confirmation (WMI 5YJ), and open NHTSA recalls including 23V-376 front trunk hood latch.", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } } };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", headline: "Tesla Model S History Check — Free VIN Lookup", description: "What a free Tesla Model S history check actually shows, pre-2016 battery-pack risks, Tesla-specific salvage and Supercharger considerations, and how to use the result before you buy.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } }, mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE}/tesla-model-s-history-check` }, datePublished: "2026-06-29", dateModified: new Date().toISOString().slice(0, 10) };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQS_EN.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };
const howToSchema = { "@context": "https://schema.org", "@type": "HowTo", name: "How to Check Tesla Model S History by VIN", description: "Look up any 17-character Tesla Model S VIN against NMVTIS title brands and NHTSA recalls in seconds.", totalTime: "PT1M", step: [
  { "@type": "HowToStep", position: 1, name: "Find the 17-character Model S VIN", text: "Read the VIN from the lower driver-side corner of the windshield, the door jamb sticker, the MyTesla app, or the Tesla title. Every Model S VIN starts with 5YJ." },
  { "@type": "HowToStep", position: 2, name: "Enter the VIN into the history check tool", text: "Type or paste the Model S VIN into the free history form. The tool validates the format before it runs." },
  { "@type": "HowToStep", position: 3, name: "Review the NMVTIS + NHTSA result", text: "See title brands, salvage and flood flags, theft and recovery status, ownership count, Fremont assembly confirmation, and any open NHTSA recalls including 23V-376." },
  { "@type": "HowToStep", position: 4, name: "Use the result to decide", text: "For pre-2016 cars, pair the VIN check with a Tesla service battery health report. Order a full VIN history report if anything looks off." },
] };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE }, { "@type": "ListItem", position: 2, name: "Tesla Model S History Check", item: `${SITE}/tesla-model-s-history-check` }] };
const speakableSchema = { "@context": "https://schema.org", "@type": "WebPage", speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".speakable-intro"] }, url: `${SITE}/tesla-model-s-history-check` };

export default function TeslaModelSHistoryCheckPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <TeslaModelSHistoryCheckBody />
    </>
  );
}
