/**
 * Wave 18.18 batch 3 — English /classic-car-vin wrapper.
 * Full layout lives in src/components/ClassicCarVinBody.tsx; this stays slim.
 */

import type { Metadata } from "next";
import ClassicCarVinBody, { FAQS_EN } from "@/components/ClassicCarVinBody";
import { hreflangAlternates } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/classic-car-vin`;
const alt = hreflangAlternates("/classic-car-vin");
const title = "Classic Car VIN Decoder — Pre-1981 Vehicle Lookup (Free)";
const description = "Decode pre-1981 classic and vintage car VINs free. Understand GM, Ford, Chrysler, and AMC VIN formats, verify numbers-matching, and document factory specs before you buy.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  keywords: ["classic car VIN decoder", "vintage car VIN", "pre-1981 VIN decode", "old car VIN lookup", "antique vehicle VIN", "numbers matching VIN check"],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: { title, description, url: PAGE_URL, type: "article", siteName: "CarCheckerVIN" },
  twitter: { card: "summary_large_image", title, description: "Decode pre-1981 classic and vintage car VINs. Understand GM, Ford, Chrysler, and AMC formats and verify numbers-matching." },
  robots: { index: true, follow: true },
};

const webAppSchema = { "@context": "https://schema.org", "@type": "WebApplication", name: "Classic Car VIN Decoder", url: PAGE_URL, applicationCategory: "AutomotiveApplication", operatingSystem: "All", description: "Decode a classic or vintage vehicle by its VIN. Understand pre-1981 manufacturer formats from GM, Ford, Chrysler, and AMC, and verify numbers-matching authenticity.", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } } };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", headline: "Classic Car VIN Decoder — Pre-1981 Vehicle Identification", description: "How to decode pre-1981 classic and vintage car VINs, including manufacturer-specific formats from GM, Ford, Chrysler, and AMC, and how to verify numbers-matching authenticity.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } }, mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL }, datePublished: "2026-05-04", dateModified: "2026-06-25" };
const howToSchema = { "@context": "https://schema.org", "@type": "HowTo", name: "How to Decode a Classic Car VIN", description: "Decode a pre-1981 classic car VIN by identifying the make and model year, then applying the correct manufacturer key.", totalTime: "PT3M", step: [{ "@type": "HowToStep", position: 1, name: "Identify the exact make and model year", text: "Pre-1981 VINs had no universal standard, so decoding depends entirely on the manufacturer and year. Confirm the make and model year before reading any positions." }, { "@type": "HowToStep", position: 2, name: "Locate the VIN and trim tag", text: "Find the VIN on the door post, firewall, frame, or dash-base plate, and note any separate cowl or trim tag that carries additional build codes." }, { "@type": "HowToStep", position: 3, name: "Apply the correct manufacturer key", text: "Use the year-specific reference table for that make to decode division, body series, engine, assembly plant, and sequence — these codes change year to year." }, { "@type": "HowToStep", position: 4, name: "Cross-check for numbers-matching", text: "Compare the VIN-encoded engine code against the casting and stamping numbers on the block, transmission, and axle to verify the original factory drivetrain." }] };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQS_EN.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE }, { "@type": "ListItem", position: 2, name: "Classic Car VIN Decoder", item: PAGE_URL }] };
const speakableSchema = { "@context": "https://schema.org", "@type": "WebPage", speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".speakable-intro"] }, url: PAGE_URL };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <ClassicCarVinBody locale="en" />
    </>
  );
}
