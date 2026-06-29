import type { Metadata } from "next";
import ChassisNumberLookupBody, { FAQS_EN } from "@/components/ChassisNumberLookupBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/chassis-number-lookup`;
const alt = hreflangAlternatesForLocale("/chassis-number-lookup", "en");
const title = "Chassis Number Lookup — Decode Any Chassis (VIN) Number Free & Find Car Type";
const description = "Search a car by chassis number free. A chassis number is the same 17-character VIN — decode it to find the car type, make, model, year, engine, and full history. Works for vehicles worldwide. No sign-up.";

export const metadata: Metadata = {
  title, description,
  keywords: ["chassis number lookup", "search car by chassis number", "find vehicle by chassis number", "chassis number finder", "check my chassis number", "find my chassis number", "look up car type by vin", "chassis number check", "decode chassis number", "vin decoder lookup", "free vin decoder online", "best vin decoder free", "check a car free", "what is a chassis number", "chassis number vs vin", "car frame number lookup", "vehicle chassis number search"],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: { title: "Chassis Number Lookup — Decode Any Chassis (VIN) Number Free", description: "Your chassis number is your VIN. Decode it free to find the car type, specs, and history. Works for vehicles worldwide — instant, no sign-up.", url: PAGE_URL, type: "article", siteName: "CarCheckerVIN", locale: "en_US", images: [{ url: `${SITE}/chassis-number-lookup/opengraph-image`, width: 1200, height: 630, alt: "Chassis Number Lookup — decode any chassis (VIN) number free" }] },
  twitter: { card: "summary_large_image", title: "Chassis Number Lookup — Decode Any Chassis (VIN) Number Free", description: "A chassis number is the same as a VIN. Decode it free to find the car type, specs, and full history. Instant, worldwide.", images: [`${SITE}/chassis-number-lookup/opengraph-image`] },
  robots: { index: true, follow: true },
};

const webAppSchema = { "@context": "https://schema.org", "@type": "WebApplication", inLanguage: "en", name: "Chassis Number Lookup", url: PAGE_URL, applicationCategory: "AutomotiveApplication", operatingSystem: "All", description: "Free tool to decode any chassis number (VIN) and find the car type, make, model, year, engine, and full vehicle history. Works for vehicles worldwide.", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } } };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", inLanguage: "en", headline: "Chassis Number Lookup", description: "Learn how to look up a car by chassis number, what each segment of the 17-character code means, where to find it by country, and how to spot red flags before you buy.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } }, mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL }, datePublished: "2026-04-16", dateModified: new Date().toISOString().slice(0, 10) };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", inLanguage: "en", mainEntity: FAQS_EN.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE }, { "@type": "ListItem", position: 2, name: "Chassis Number Lookup", item: PAGE_URL }] };
const speakableSchema = { "@context": "https://schema.org", "@type": "WebPage", speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".speakable-intro"] }, url: PAGE_URL };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <ChassisNumberLookupBody locale="en" />
    </>
  );
}
