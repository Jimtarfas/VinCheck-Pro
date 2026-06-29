import type { Metadata } from "next";
import VinCodeLookupBody, { FAQS_EN } from "@/components/VinCodeLookupBody";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";

export const metadata: Metadata = {
  title: "VIN Code Lookup — What Each of the 17 Characters Means",
  description: "Free VIN code lookup — decode the 17-character VIN by section. Learn what the WMI (positions 1–3), VDS (4–9 with check digit), and VIS (10–17) sections reveal.",
  keywords: ["vin code lookup", "decode vin code", "vin code meaning", "what does my vin code mean", "vin character meaning", "vin position decoder", "17 character vin", "wmi vds vis", "vin check digit", "vin year code chart", "iso 3779", "nhtsa vin standard"],
  alternates: { canonical: "/vin-code-lookup" },
  openGraph: { title: "VIN Code Lookup — What Each of the 17 Characters Means", description: "Free decode of the 17-character VIN code — WMI, VDS, VIS, check digit, model-year code, and assembly plant explained.", url: `${SITE}/vin-code-lookup`, type: "article", siteName: "CarCheckerVIN" },
  twitter: { card: "summary_large_image", title: "VIN Code Lookup — What Each of the 17 Characters Means", description: "Free decode of the 17-character VIN code — WMI, VDS, VIS, check digit, year, and plant explained." },
  robots: { index: true, follow: true },
};

const webAppSchema = { "@context": "https://schema.org", "@type": "WebApplication", name: "VIN Code Lookup", url: `${SITE}/vin-code-lookup`, applicationCategory: "AutomotiveApplication", operatingSystem: "All", description: "Decode any 17-character VIN code character by character. Splits the VIN into the WMI (positions 1–3), VDS (positions 4–9 including the Mod-11 check digit), and VIS (positions 10–17 with year, plant, and production sequence) per ISO 3779 and NHTSA.", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } } };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", headline: "VIN Code Lookup — What Each of the 17 Characters Means", description: "A position-by-position guide to the 17-character VIN code: the WMI, VDS, and VIS sections, the check digit math, the year code chart, and why I, O, and Q are excluded.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } }, mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE}/vin-code-lookup` }, datePublished: "2026-06-28", dateModified: new Date().toISOString().slice(0, 10) };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQS_EN.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };
const howToSchema = { "@context": "https://schema.org", "@type": "HowTo", name: "How to Decode a VIN Code Character by Character", description: "Read the 17 characters of a VIN code and decode each position into a real vehicle description.", totalTime: "PT2M", step: [
  { "@type": "HowToStep", position: 1, name: "Find the 17-character VIN", text: "Read the VIN from the driver-side dashboard, the door-jamb sticker, the title, or the insurance card. Confirm it is exactly 17 characters and contains no letters I, O, or Q." },
  { "@type": "HowToStep", position: 2, name: "Split the VIN into WMI, VDS, and VIS", text: "Positions 1–3 are the World Manufacturer Identifier (country, manufacturer, vehicle type). Positions 4–9 are the Vehicle Descriptor Section (model, body, engine, restraint system, plus a check digit at position 9). Positions 10–17 are the Vehicle Identifier Section (year, plant, production sequence)." },
  { "@type": "HowToStep", position: 3, name: "Decode each section", text: "Look up the WMI against the SAE registry, decode positions 4–8 against the manufacturer's VDS pattern, verify position 9 with the Mod-11 check, then read the model year from position 10 and the assembly plant from position 11. Positions 12–17 are the unique production sequence." },
  { "@type": "HowToStep", position: 4, name: "Confirm the result", text: "A valid VIN decodes to a single make, model year, and plant. If the decoder returns 'invalid,' the most common cause is confusing the digit 0 with the letter O or the digit 1 with the letter I — re-check those characters first." },
] };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE }, { "@type": "ListItem", position: 2, name: "VIN Code Lookup", item: `${SITE}/vin-code-lookup` }] };
const speakableSchema = { "@context": "https://schema.org", "@type": "WebPage", speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".speakable-intro"] }, url: `${SITE}/vin-code-lookup` };

export default function VinCodeLookupPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <VinCodeLookupBody />
    </>
  );
}
