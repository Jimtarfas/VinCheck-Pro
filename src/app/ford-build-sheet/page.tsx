import type { Metadata } from "next";
import FordBuildSheetBody, { FAQS_EN } from "@/components/FordBuildSheetBody";
import { hreflangAlternates } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/ford-build-sheet`;
const alt = hreflangAlternates("/ford-build-sheet");

export const metadata: Metadata = {
  title: "Ford Build Sheet by VIN — Door Data Plate, DSO & Marti Report Codes (Free)",
  description: "Look up a Ford, Lincoln, or Mercury build sheet by VIN, free. Decode the door data plate, DSO district code, axle and transmission tags, paint and trim codes, and learn how the Marti Report reconstructs the original factory order for 1967-up Ford vehicles.",
  keywords: ["Ford build sheet by VIN", "Ford door data plate decode", "Ford DSO code", "Marti Report", "Ford warranty plate decode", "Mustang build sheet", "Ford paint and trim code", "Ford axle code", "Lincoln Mercury build sheet", "Ford VIN decoder", "Ford factory options by VIN", "Ford rotunda buck tag", "decode Ford VIN options", "Ford build record"],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: { title: "Ford Build Sheet by VIN — Door Data Plate & Marti Report Codes", description: "Decode a Ford build sheet by VIN: door data plate, DSO, axle and transmission codes, paint and trim, and the Marti Report for 1967-up vehicles.", url: PAGE_URL, type: "article", siteName: "CarCheckerVIN", locale: "en_US" },
  twitter: { card: "summary_large_image", title: "Ford Build Sheet by VIN — Door Data Plate & Marti Report Codes", description: "Decode a Ford build sheet by VIN: door data plate, DSO, axle/transmission codes, paint and trim, and the Marti Report." },
  robots: { index: true, follow: true },
};

const webAppSchema = { "@context": "https://schema.org", "@type": "WebApplication", inLanguage: "en", name: "Ford Build Sheet by VIN", url: PAGE_URL, applicationCategory: "AutomotiveApplication", operatingSystem: "All", description: "Retrieve a Ford, Lincoln, or Mercury build record using its VIN. Decodes the door data plate, DSO district code, axle and transmission tags, paint and trim codes, and assembly plant data, and explains how the Marti Report reconstructs the original factory order.", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } } };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", inLanguage: "en", headline: "Ford Build Sheet by VIN — Door Data Plate, DSO & Marti Report", description: "How to read a Ford build sheet by VIN: the door data plate, DSO district code, axle and transmission codes, paint and trim, and the Marti Report that reconstructs the original factory order for 1967-up Ford vehicles.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } }, mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL }, datePublished: "2026-06-12", dateModified: "2026-06-12" };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", inLanguage: "en", mainEntity: FAQS_EN.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };
const howToSchema = { "@context": "https://schema.org", "@type": "HowTo", inLanguage: "en", name: "How to Read a Ford Build Sheet by VIN", description: "Decode a Ford, Lincoln, or Mercury build record from the VIN, the door data plate, and the Marti Report.", totalTime: "PT3M", step: [
  { "@type": "HowToStep", position: 1, name: "Confirm the VIN and model year", text: "Read the 17-character VIN (or the shorter pre-1981 Ford VIN) from the dash, door jamb, or title. The year character anchors which Ford reference tables apply." },
  { "@type": "HowToStep", position: 2, name: "Read the door data plate", text: "Find the metal warranty/data plate on the driver's door or jamb. Note the body, paint, trim, axle, transmission, and DSO codes." },
  { "@type": "HowToStep", position: 3, name: "Decode each field", text: "Match every code against a Ford reference for that exact model year: paint and trim, the rear-axle ratio, the transmission, and the DSO district." },
  { "@type": "HowToStep", position: 4, name: "Order a Marti Report for 1967-up cars", text: "For 1967-and-newer Fords, request a Marti Report from Marti Auto Works for the authenticated original factory order and rarity data." },
] };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE }, { "@type": "ListItem", position: 2, name: "Ford Build Sheet", item: PAGE_URL }] };
const speakableSchema = { "@context": "https://schema.org", "@type": "WebPage", speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".speakable-intro"] }, url: PAGE_URL };

export default function FordBuildSheetPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <FordBuildSheetBody locale="en" />
    </>
  );
}
