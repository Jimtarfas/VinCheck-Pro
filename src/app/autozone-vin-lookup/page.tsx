import type { Metadata } from "next";
import AutozoneVinLookupBody, { FAQS_EN } from "@/components/AutozoneVinLookupBody";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";

export const metadata: Metadata = {
  title: "AutoZone VIN Lookup — Plus Free Title & Recall History",
  description: "AutoZone's free VIN lookup shows parts that fit your vehicle — not title brands or recalls. Add a free full VIN history check here. No sign-up, instant results.",
  keywords: ["autozone vin lookup", "vin lookup autozone", "autozone vin", "autozone vin check", "autozone free vin lookup", "autozone find vehicle by vin", "autozone parts vin lookup", "free vin lookup", "vin lookup", "vin check"],
  alternates: { canonical: "/autozone-vin-lookup" },
  openGraph: { title: "AutoZone VIN Lookup — Plus Free Title & Recall History", description: "AutoZone's VIN tool shows what parts fit — not what happened to the car. Add free title brand, salvage, and recall data here.", url: `${SITE}/autozone-vin-lookup`, type: "article", siteName: "CarCheckerVIN" },
  twitter: { card: "summary_large_image", title: "AutoZone VIN Lookup — Plus Free Title & Recall History", description: "AutoZone's VIN tool is for parts. Add the title, salvage, and recall layer free here — instant, no sign-up." },
  robots: { index: true, follow: true },
};

const webAppSchema = { "@context": "https://schema.org", "@type": "WebApplication", name: "AutoZone VIN Lookup Complement — Full History Check", url: `${SITE}/autozone-vin-lookup`, applicationCategory: "AutomotiveApplication", operatingSystem: "All", description: "AutoZone's free VIN lookup is a parts-fitment tool — it shows the engine, transmission, brake size, and battery type that fit your vehicle. It does not show title brands, recalls, salvage records, or accident history. This page explains what AutoZone's VIN tool covers and provides a free complementary VIN history check sourced from NMVTIS, state DMVs, NHTSA, and salvage auctions.", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } } };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", headline: "AutoZone VIN Lookup — Plus Free Title & Recall History", description: "What AutoZone's free VIN lookup actually shows, what it leaves out, and how to combine it with a full VIN history check for the complete picture on any vehicle.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } }, mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE}/autozone-vin-lookup` }, datePublished: "2026-06-28", dateModified: new Date().toISOString().slice(0, 10) };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQS_EN.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };
const howToSchema = { "@context": "https://schema.org", "@type": "HowTo", name: "How to Use the AutoZone VIN Lookup", description: "Use AutoZone's free VIN lookup to filter the parts catalog to fitment-correct SKUs for your specific vehicle.", totalTime: "PT1M", step: [
  { "@type": "HowToStep", position: 1, name: "Find the 17-character VIN", text: "Read the VIN from the lower driver-side windshield, door jamb sticker, title, or insurance card. Confirm it is 17 characters with no I, O, or Q." },
  { "@type": "HowToStep", position: 2, name: "Go to autozone.com parts section", text: "Open autozone.com and navigate to the parts section. Look for the Find Vehicle by VIN option alongside the year/make/model selectors." },
  { "@type": "HowToStep", position: 3, name: "Enter the VIN into AutoZone's lookup", text: "Paste or type the 17-character VIN. AutoZone validates the format, decodes year/make/model/engine/transmission, and loads the vehicle as your saved selection." },
  { "@type": "HowToStep", position: 4, name: "Add a free history check for what AutoZone skips", text: "AutoZone's lookup is parts-fitment only. Run the same VIN through a free full history check on this page to see title brands, recalls, salvage records, and accident flags." },
] };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE }, { "@type": "ListItem", position: 2, name: "AutoZone VIN Lookup", item: `${SITE}/autozone-vin-lookup` }] };
const speakableSchema = { "@context": "https://schema.org", "@type": "WebPage", speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".speakable-intro"] }, url: `${SITE}/autozone-vin-lookup` };

export default function AutozoneVinLookupPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <AutozoneVinLookupBody />
    </>
  );
}
