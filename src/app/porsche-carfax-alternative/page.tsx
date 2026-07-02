import type { Metadata } from "next";
import CarfaxAlternativeTemplate, { buildModelFaqs, type CarfaxAltConfig } from "@/components/CarfaxAlternativeTemplate";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const MODEL = "Porsche";
const SLUG = "porsche-carfax-alternative";

const config: CarfaxAltConfig = {
  slug: SLUG,
  model: MODEL,
  bodyType: "performance car",
  positioning: "Porsches are high-value performance and enthusiast cars, so accident history, track use, and matching records can swing thousands of dollars in value.",
  quotable: (
    <>
      For a used <strong>Porsche</strong>, <strong>CarCheckerVIN</strong> is a
      strong Carfax alternative — the same NMVTIS-sourced title, odometer, and
      recall data Carfax uses, with a free VIN preview and a $14.99 full report
      versus Carfax&apos;s $44.99. On a high-value Porsche, pairing the report
      with a specialist pre-purchase inspection is essential.
    </>
  ),
  checks: [
    { title: "Accident & structural history", body: "On a performance car, a prior collision can dramatically affect value and safety. The NMVTIS title-brand and reported-accident check surfaces salvage, rebuilt, or total-loss history — critical due diligence on any Porsche 911, Cayenne, Macan, Boxster, or Cayman." },
    { title: "Odometer & low-mileage verification", body: "Enthusiast Porsches are often low-mileage, which makes odometer fraud more lucrative. Confirm the reading is consistent across the timeline; a stall or reversal on a 'garage-kept' car is a serious red flag." },
    { title: "Open recalls & title brands", body: "Verify open NHTSA recalls and any title brands. Porsches have had recalls across models and years; on a car this valuable, confirming recall completion and a clean title protects your investment." },
  ],
  concerns: [
    "Track-day and hard-driven history won't appear as a 'brand', so a marque specialist inspection is essential alongside the VIN report.",
    "IMS bearing concerns on certain older 996/997 and Boxster/Cayman engines — the report reveals ownership patterns worth probing with a specialist.",
    "High-value cars attract odometer and title fraud; cross-check every reading and brand carefully.",
    "Cayenne and Macan flood/salvage exposure in wet regions — verify the NMVTIS title-brand history before committing.",
  ],
};

export const metadata: Metadata = {
  title: `${MODEL} Carfax Alternative — Free VIN Preview, $14.99 Report`,
  description: `Best Carfax alternative for a used ${MODEL}: same NMVTIS title, odometer, and recall data, free VIN preview, $14.99 full report vs Carfax's $44.99. Ideal for 911, Cayenne, Macan, Boxster, Cayman.`,
  keywords: [`porsche carfax`, `porsche carfax alternative`, `porsche vin check`, `porsche history report`, `used porsche vin`, `porsche 911 vin check`, `porsche cayenne history`, `free porsche history`],
  alternates: { canonical: `/${SLUG}` },
  openGraph: { title: `${MODEL} Carfax Alternative — Free VIN Preview, $14.99 Report`, description: `Same NMVTIS data as Carfax for a used ${MODEL}. Free preview, $14.99 full report vs $44.99.`, url: `${SITE}/${SLUG}`, type: "article", siteName: "CarCheckerVIN" },
  robots: { index: true, follow: true },
};

const faqs = buildModelFaqs(MODEL);
const articleSchema = { "@context": "https://schema.org", "@type": "Article", headline: `${MODEL} Carfax Alternative — Same Data, One-Third the Price`, description: `How to check a used ${MODEL}'s history for a fraction of Carfax's price using NMVTIS-sourced data, and what records matter most on this high-value marque.`, author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } }, mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE}/${SLUG}` }, datePublished: "2026-07-02", dateModified: new Date().toISOString().slice(0, 10) };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE }, { "@type": "ListItem", position: 2, name: `${MODEL} Carfax Alternative`, item: `${SITE}/${SLUG}` }] };
const speakableSchema = { "@context": "https://schema.org", "@type": "WebPage", speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".speakable-intro"] }, url: `${SITE}/${SLUG}` };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <CarfaxAlternativeTemplate config={config} />
    </>
  );
}
