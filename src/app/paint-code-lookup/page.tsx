/**
 * Wave 18 batch 4 — English paint-code-lookup. Same full layout shared with
 * /es/paint-code-lookup via PaintCodeLookupBody.
 */

import type { Metadata } from "next";
import PaintCodeLookupBody, { FAQS_EN } from "@/components/PaintCodeLookupBody";
import { hreflangAlternates } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/paint-code-lookup`;

export const metadata: Metadata = {
  title: "Paint Code Lookup by VIN — Find Your Car's Factory Color Code (Free, 30+ Brands)",
  description: "Find your exact OEM paint code by VIN. Interactive paint code locator for 30+ brands — door jamb sticker locations, code formats, real factory color examples, and touch-up paint matching. 100% free.",
  keywords: ["paint code lookup", "paint code lookup by VIN", "car paint code by VIN", "OEM paint code", "factory paint code", "color code lookup", "vehicle color code", "VIN paint code finder", "find car paint code", "touch up paint code", "body shop paint code", "Toyota paint code", "Honda paint code", "Ford paint code", "Chevrolet paint code", "BMW paint code", "Mercedes paint code", "Subaru paint code", "Nissan paint code", "Mazda paint code", "Hyundai paint code", "Kia paint code", "Tesla paint code", "Volkswagen paint code", "Audi paint code", "color code by VIN", "where is my paint code", "paint code on door jamb", "OEM color code finder", "factory color name lookup"],
  alternates: hreflangAlternates("/paint-code-lookup"),
  openGraph: {
    title: "Paint Code Lookup by VIN — Free OEM Color Code Finder",
    description: "Interactive paint code finder for 30+ brands. Look up your exact factory color code by VIN — free, instant, no sign-up.",
    url: PAGE_URL,
    type: "article",
    siteName: "CarCheckerVIN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Paint Code Lookup by VIN — Free OEM Color Code Finder",
    description: "Find any vehicle's factory paint code. Interactive tool for 30+ brands. Free, instant.",
  },
  robots: { index: true, follow: true },
};

const webAppSchema = { "@context": "https://schema.org", "@type": "WebApplication", name: "Paint Code Lookup", url: PAGE_URL, applicationCategory: "AutomotiveApplication", operatingSystem: "All", description: "Interactive tool to find any vehicle's factory paint code by VIN or by manufacturer. Covers 30+ brands with sticker locations, code formats, and real example codes.", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } } };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", headline: "Paint Code Lookup by VIN — Find Your Factory Color", description: "Interactive paint code locator for 30+ brands and a VIN-based lookup that returns the exact OEM paint code from the manufacturer's build database.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } }, mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL }, datePublished: "2026-04-16", dateModified: new Date().toISOString().slice(0, 10) };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQS_EN.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };
const howToSchema = { "@context": "https://schema.org", "@type": "HowTo", name: "How to Find Your Car's Paint Code", description: "Step-by-step guide to locating your vehicle's factory paint code on the door jamb or by VIN lookup.", totalTime: "PT2M", step: [{ "@type": "HowToStep", position: 1, name: "Open the driver's door", text: "Open the driver-side door and find the white or silver service label printed on the door jamb (the metal frame that the door latches onto) or on the edge of the door itself." }, { "@type": "HowToStep", position: 2, name: "Find the paint code row", text: "Look for a row labeled 'Color,' 'Paint,' 'EXT,' 'PNT,' 'BC/CC,' or 'Lack' (German cars). The code is usually a 2-3 character alphanumeric sequence." }, { "@type": "HowToStep", position: 3, name: "Write down the exact code", text: "Copy the code character-for-character. Watch for easily-confused characters like 0 vs O, 1 vs I, and 8 vs B. The code is case-sensitive at some paint suppliers." }, { "@type": "HowToStep", position: 4, name: "Check secondary locations if missing", text: "If the door jamb sticker is damaged or missing, check the spare tire well (Audi, VW), the engine bay strut tower (BMW, Mini), the front trunk (Porsche), or inside the glove box (newer trucks and luxury SUVs)." }, { "@type": "HowToStep", position: 5, name: "Use a VIN-based lookup as a fallback", text: "If no sticker is readable, run a VIN-based paint code lookup. The factory paint code is permanently linked to the VIN in the manufacturer's build database — our free VIN check retrieves it." }, { "@type": "HowToStep", position: 6, name: "Order paint with the code", text: "Provide the code (not the color name) to any paint supplier or body shop. The code uniquely identifies the formulation; the name alone is not enough." }] };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE }, { "@type": "ListItem", position: 2, name: "Paint Code Lookup", item: PAGE_URL }] };
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
      <PaintCodeLookupBody locale="en" />
    </>
  );
}
