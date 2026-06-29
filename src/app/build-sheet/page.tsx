import type { Metadata } from "next";
import BuildSheetBody, { FAQS_EN } from "@/components/BuildSheetBody";
import { hreflangAlternates } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/build-sheet`;
const alt = hreflangAlternates("/build-sheet");

export const metadata: Metadata = {
  title: "Build Sheet by VIN — Original Factory Build Record & Option Codes (Free)",
  description: "Look up a vehicle's original factory build sheet by VIN — free. Decode every option code, package, paint and trim code, engine, and assembly detail exactly as the car was ordered and built. More technical than the window sticker.",
  keywords: ["build sheet by VIN", "factory build sheet", "original build record", "VIN build data", "vehicle factory options", "how to get build sheet", "build sheet lookup", "broadcast sheet by VIN", "factory option codes", "RPO code lookup", "build sheet vs window sticker", "decode factory options by VIN", "free build sheet", "matching numbers verification", "vin build sheet lookup"],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: { title: "Build Sheet by VIN — Original Factory Build Record (Free)", description: "Decode a vehicle's original factory build sheet by VIN: option codes, packages, paint/trim codes, engine, and assembly details.", url: PAGE_URL, type: "article", siteName: "CarCheckerVIN", locale: "en_US" },
  twitter: { card: "summary_large_image", title: "Build Sheet by VIN — Original Factory Build Record (Free)", description: "Decode any vehicle's factory build sheet by VIN: option codes, packages, paint/trim codes, engine, and assembly data." },
  robots: { index: true, follow: true },
};

const webAppSchema = { "@context": "https://schema.org", "@type": "WebApplication", inLanguage: "en", name: "Build Sheet by VIN", url: PAGE_URL, applicationCategory: "AutomotiveApplication", operatingSystem: "All", description: "Retrieve a vehicle's original factory build sheet using its 17-character VIN. Decodes trim, paint and interior codes, engine and transmission, factory option and package codes, and assembly plant data where manufacturer coverage exists.", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } } };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", inLanguage: "en", headline: "Build Sheet by VIN — Original Factory Build Record", description: "How to look up the original factory build sheet for any vehicle by VIN, what it contains, how it differs from the window sticker, and why collectors and restorers rely on it.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } }, mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL }, datePublished: "2026-05-04", dateModified: new Date().toISOString().slice(0, 10) };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", inLanguage: "en", mainEntity: FAQS_EN.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };
const howToSchema = { "@context": "https://schema.org", "@type": "HowTo", inLanguage: "en", name: "How to Get a Factory Build Sheet by VIN", description: "Retrieve a vehicle's original factory build record — options, codes, and assembly data — using its 17-character VIN.", totalTime: "PT2M", step: [
  { "@type": "HowToStep", position: 1, name: "Locate the 17-character VIN", text: "Read the VIN from the driver-side dashboard, the door jamb sticker, the title, or the registration. Confirm it is 17 characters." },
  { "@type": "HowToStep", position: 2, name: "Run the build sheet lookup", text: "Enter the VIN into the lookup. It queries the manufacturer's build database linked to that VIN for the decoded original factory configuration." },
  { "@type": "HowToStep", position: 3, name: "Read the decoded build record", text: "Review the trim, paint and interior codes, engine and transmission, factory option and package codes, and assembly plant and build sequence." },
  { "@type": "HowToStep", position: 4, name: "Verify or restore with the codes", text: "Use the option codes to confirm a matching-numbers configuration or to source correct original-specification replacement parts." },
] };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE }, { "@type": "ListItem", position: 2, name: "Build Sheet", item: PAGE_URL }] };
const speakableSchema = { "@context": "https://schema.org", "@type": "WebPage", speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".speakable-intro"] }, url: PAGE_URL };

export default function BuildSheetPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <BuildSheetBody locale="en" />
    </>
  );
}
