import type { Metadata } from "next";
import TeslaWarrantyCheckBody, { FAQS_EN } from "@/components/TeslaWarrantyCheckBody";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";

export const metadata: Metadata = {
  title: "Tesla Warranty Check — Free VIN Coverage Estimator",
  description: "Free Tesla warranty check. Estimate remaining 4yr/50k Basic Vehicle + 8yr battery & drive unit warranty (100K-150K mi cap) by VIN. NMVTIS salvage-brand voiding check included.",
  keywords: ["tesla warranty check", "tesla warranty by vin", "tesla battery warranty", "tesla drive unit warranty", "tesla 4 year warranty", "tesla 8 year warranty", "tesla used vehicle warranty", "tesla salvage warranty void", "tesla 70% capacity retention", "tesla extended warranty", "free tesla warranty lookup"],
  alternates: { canonical: "/tesla-warranty-check" },
  openGraph: { title: "Tesla Warranty Check — Free VIN Coverage Estimator", description: "Free Tesla warranty check. Estimate remaining Basic Vehicle and battery/drive unit warranty coverage by VIN. NMVTIS salvage check included.", url: `${SITE}/tesla-warranty-check`, type: "article", siteName: "CarCheckerVIN" },
  twitter: { card: "summary_large_image", title: "Tesla Warranty Check — Free VIN Coverage Estimator", description: "Free Tesla warranty estimator by VIN. 4yr/50k Basic + 8yr battery & drive unit coverage. NMVTIS salvage check." },
  robots: { index: true, follow: true },
};

const webAppSchema = { "@context": "https://schema.org", "@type": "WebApplication", name: "Tesla Warranty Check", url: `${SITE}/tesla-warranty-check`, applicationCategory: "AutomotiveApplication", operatingSystem: "All", description: "Free Tesla warranty check. Estimates remaining Tesla factory warranty coverage by VIN: 4-year / 50,000-mile Basic Vehicle Limited Warranty plus 8-year battery and drive unit warranty with model-specific mileage caps (100K for Model 3/Y Standard Range, 120K for Long Range and Performance, 150K for Model S/X). Cross-checks NMVTIS for any salvage or rebuilt brand that voids coverage.", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } } };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", headline: "Tesla Warranty Check — Free VIN Coverage Estimator", description: "How a Tesla warranty check estimates remaining coverage by VIN, Tesla's published warranty terms by model, and which title brands and modifications void Tesla warranty coverage.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } }, mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE}/tesla-warranty-check` }, datePublished: "2026-06-28", dateModified: new Date().toISOString().slice(0, 10) };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQS_EN.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };
const howToSchema = { "@context": "https://schema.org", "@type": "HowTo", name: "How to Check Tesla Warranty by VIN", description: "Estimate remaining Tesla factory warranty coverage by VIN in seconds.", totalTime: "PT1M", step: [
  { "@type": "HowToStep", position: 1, name: "Find the 17-character Tesla VIN", text: "Read the VIN from the lower driver-side corner of the windshield, the door jamb sticker, the Tesla title, or the MyTesla app." },
  { "@type": "HowToStep", position: 2, name: "Enter the VIN into the Tesla warranty check tool", text: "Type or paste the Tesla VIN into the free warranty estimator. The tool decodes the model year and model line." },
  { "@type": "HowToStep", position: 3, name: "Review the remaining coverage estimate", text: "See the estimated remaining Basic Vehicle Limited Warranty (4 years / 50,000 miles) and battery / drive unit warranty (8 years with 100K-150K mile cap) attached to the VIN." },
  { "@type": "HowToStep", position: 4, name: "Confirm no salvage or rebuilt brand voids coverage", text: "The tool cross-checks NMVTIS for any salvage, rebuilt, or junk brand that would void Tesla warranty coverage. Confirm exact in-service date with Tesla service before relying on the estimate." },
] };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE }, { "@type": "ListItem", position: 2, name: "Tesla Warranty Check", item: `${SITE}/tesla-warranty-check` }] };
const speakableSchema = { "@context": "https://schema.org", "@type": "WebPage", speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".speakable-intro"] }, url: `${SITE}/tesla-warranty-check` };

export default function TeslaWarrantyCheckPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <TeslaWarrantyCheckBody />
    </>
  );
}
