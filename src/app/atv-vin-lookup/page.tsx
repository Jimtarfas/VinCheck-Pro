import type { Metadata } from "next";
import AtvVinLookupBody, { FAQS_EN } from "@/components/AtvVinLookupBody";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";

export const metadata: Metadata = {
  title: "ATV VIN Lookup — Free Stolen Check + Decoded Specs",
  description: "Free ATV VIN lookup tool. Enter any 17-character ATV or UTV (side-by-side) VIN to decode manufacturer, year, engine, drivetrain and check stolen-vehicle databases.",
  keywords: ["atv vin lookup", "atv vin check", "atv vin decoder", "free atv vin lookup", "utv vin lookup", "side by side vin lookup", "polaris vin lookup", "yamaha atv vin lookup", "honda atv vin lookup", "can am vin lookup", "kawasaki atv vin", "arctic cat vin lookup", "stolen atv check", "quad vin lookup", "atv vin search"],
  alternates: { canonical: "/atv-vin-lookup" },
  openGraph: { title: "ATV VIN Lookup — Free Stolen Check + Decoded Specs", description: "Free ATV VIN lookup. Decode any 17-character ATV or UTV VIN and check stolen-vehicle databases — instantly, no sign-up. Works for all major brands.", url: `${SITE}/atv-vin-lookup`, type: "article", siteName: "CarCheckerVIN" },
  twitter: { card: "summary_large_image", title: "ATV VIN Lookup — Free Stolen Check + Decoded Specs", description: "Free ATV VIN lookup. Decode any 17-character ATV or UTV VIN and check stolen-vehicle databases — instantly, no sign-up." },
  robots: { index: true, follow: true },
};

const webAppSchema = { "@context": "https://schema.org", "@type": "WebApplication", name: "ATV VIN Lookup", url: `${SITE}/atv-vin-lookup`, applicationCategory: "AutomotiveApplication", operatingSystem: "All", description: "Free ATV VIN lookup tool. Enter any 17-character ATV or UTV (side-by-side) VIN to decode the manufacturer, model year, model line, engine displacement, and drivetrain, and to check stolen-vehicle databases including NCIC-sourced records. Works for Polaris, Yamaha, Honda, Kawasaki, Can-Am, Arctic Cat, and other major off-road brands.", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } } };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", headline: "ATV VIN Lookup — Free Stolen Check + Decoded Specs", description: "How an ATV VIN lookup decodes the manufacturer, year, and engine; how the post-2006 17-character VIN standard differs from older serials; and how to use the result to avoid stolen, salvage, or misrepresented quads and side-by-sides.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } }, mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE}/atv-vin-lookup` }, datePublished: "2026-06-15", dateModified: new Date().toISOString().slice(0, 10) };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQS_EN.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };
const howToSchema = { "@context": "https://schema.org", "@type": "HowTo", name: "How to Lookup an ATV VIN for Free", description: "Lookup any ATV or UTV VIN to decode manufacturer, year, model, engine, and drivetrain — and check stolen-vehicle databases.", totalTime: "PT1M", step: [
  { "@type": "HowToStep", position: 1, name: "Find the VIN on the ATV frame", text: "Look for the 17-character VIN stamped on the frame rail near the steering column, or under the seat on Polaris and Can-Am models. Confirm it matches the manufacturer's sticker on the rear fender and any title or registration paperwork." },
  { "@type": "HowToStep", position: 2, name: "Enter the VIN into the ATV lookup tool", text: "Type or paste the VIN into the free ATV VIN lookup form. The tool validates the format before it runs and handles both modern 17-character VINs and pre-2006 shorter serials." },
  { "@type": "HowToStep", position: 3, name: "Review decoded specs and stolen status", text: "See the decoded manufacturer, model year, model line, engine displacement, and drivetrain, alongside a stolen-vehicle check against available NCIC-sourced databases and any title brand data." },
  { "@type": "HowToStep", position: 4, name: "Use the result to decide", text: "Confirm the VIN on the frame matches the paperwork, the lookup shows no stolen flag, and the decoded specs match the seller's listing. If anything looks off, walk away or request additional documentation before paying." },
] };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE }, { "@type": "ListItem", position: 2, name: "ATV VIN Lookup", item: `${SITE}/atv-vin-lookup` }] };
const speakableSchema = { "@context": "https://schema.org", "@type": "WebPage", speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".speakable-intro"] }, url: `${SITE}/atv-vin-lookup` };

export default function AtvVinLookupPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <AtvVinLookupBody />
    </>
  );
}
