/**
 * Wave 18 batch 4 — English paint-code-finder. Same full layout shared with
 * /es/buscar-codigo-pintura via PaintCodeFinderBody.
 */

import type { Metadata } from "next";
import PaintCodeFinderBody, { FAQS_EN } from "@/components/PaintCodeFinderBody";
import { hreflangAlternates } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/paint-code-finder`;

export const metadata: Metadata = {
  title: "Paint Code Finder — Find Any Car's Color Code by VIN, Brand & Color Name (Free)",
  description: "Find your car's paint code fast. Search by VIN, browse by brand, or match a factory color name to its exact code. Free directory of real OEM color codes for 30+ brands — for touch-up paint, body shop matching, and respray checks.",
  keywords: ["paint code finder", "find paint code", "car color code finder", "find my paint code", "find paint code by color name", "color name to paint code", "factory color name lookup", "find car paint color", "touch up paint finder", "touch up paint by color code", "find paint code by VIN", "OEM color code finder", "what color is my car", "car paint color code", "find factory paint color", "paint code by make", "Toyota color code finder", "Honda color code finder", "Ford paint color finder", "Chevy color code finder"],
  alternates: hreflangAlternates("/paint-code-finder"),
  openGraph: {
    title: "Paint Code Finder — Find Any Car's Factory Color Code Free",
    description: "Find a car's exact paint code by VIN, by brand, or by factory color name. Free OEM color directory for 30+ brands.",
    url: PAGE_URL,
    type: "article",
    siteName: "CarCheckerVIN",
    images: [{ url: `${SITE}/paint-code-finder/opengraph-image` }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Paint Code Finder — Find Any Car's Factory Color Code Free",
    description: "Find a car's exact paint code by VIN, brand, or color name. Free OEM directory, 30+ brands.",
    images: [`${SITE}/paint-code-finder/opengraph-image`],
  },
  robots: { index: true, follow: true },
};

const webAppSchema = { "@context": "https://schema.org", "@type": "WebApplication", name: "Paint Code Finder", url: PAGE_URL, applicationCategory: "AutomotiveApplication", operatingSystem: "All", description: "Find any vehicle's factory paint code three ways: by VIN, by browsing manufacturer, or by matching a factory color name to its exact OEM code. Covers 30+ brands.", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } } };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", headline: "Paint Code Finder — Find Any Car's Color Code", description: "Three ways to find a vehicle's factory paint code: by VIN, by brand, or by matching a factory color name to its exact OEM code.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } }, mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL }, datePublished: "2026-04-16", dateModified: new Date().toISOString().slice(0, 10) };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQS_EN.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };
const howToSchema = { "@context": "https://schema.org", "@type": "HowTo", name: "How to Find Your Car's Paint Code Three Ways", description: "Find a vehicle's factory paint code by VIN, by browsing the manufacturer, or by matching a factory color name to its code.", totalTime: "PT2M", step: [{ "@type": "HowToStep", position: 1, name: "Try the door jamb sticker first", text: "Open the driver's door and read the white or silver service label. The paint code is a 2-5 character sequence next to a row labeled Color, Paint, EXT, PNT, BC/CC, Lack, or C/TR." }, { "@type": "HowToStep", position: 2, name: "No sticker? Find it by VIN", text: "Enter the 17-character VIN into the free lookup. The factory paint code is locked to the VIN in the build database and returns even when the sticker is gone." }, { "@type": "HowToStep", position: 3, name: "Only know the color name? Browse by brand", text: "Use the brand color directory on this page to match a factory color name (e.g., Soul Red Crystal) to its exact code (41V on Mazda)." }, { "@type": "HowToStep", position: 4, name: "Confirm before you buy paint", text: "Color names get reused across years with new formulas. Confirm the exact code for your model year by VIN or sticker before ordering touch-up paint." }] };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE }, { "@type": "ListItem", position: 2, name: "Paint Code Finder", item: PAGE_URL }] };
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
      <PaintCodeFinderBody locale="en" />
    </>
  );
}
