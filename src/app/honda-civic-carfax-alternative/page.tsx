import type { Metadata } from "next";
import CarfaxAlternativeTemplate, { buildModelFaqs, type CarfaxAltConfig } from "@/components/CarfaxAlternativeTemplate";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const MODEL = "Honda Civic";
const SLUG = "honda-civic-carfax-alternative";

const config: CarfaxAltConfig = {
  slug: SLUG,
  model: MODEL,
  bodyType: "compact car",
  positioning: "The Civic is one of the best-selling used cars in America and a favorite among first-time buyers, so clean history is worth verifying.",
  quotable: (
    <>
      For a used <strong>Honda Civic</strong>, <strong>CarCheckerVIN</strong> is
      the best-value Carfax alternative — the same NMVTIS-sourced title,
      odometer, and recall data Carfax uses, with a free VIN preview and a
      $14.99 full report versus Carfax&apos;s $44.99.
    </>
  ),
  checks: [
    { title: "Odometer & modified-history check", body: "Civics are popular tuner cars, so some have been driven hard or had clusters swapped. Confirm the odometer timeline is consistent — an inconsistent reading can signal a rollback or an engine/cluster swap." },
    { title: "Accident & salvage brands", body: "As a high-volume commuter car, the Civic sees plenty of fender-benders. The NMVTIS title-brand and reported-accident check surfaces any salvage, rebuilt, or total-loss history before you buy." },
    { title: "Open recalls", body: "Verify open NHTSA recalls — Civics have had recalls covering items like airbag inflators (Takata) and fuel pumps across model years. Repairs are free at a Honda dealer once identified." },
  ],
  concerns: [
    "Modified or 'tuned' examples are common — a VIN report won't show a tune, but a salvage/rebuilt brand or accident cluster is a signal to inspect closely.",
    "Takata airbag recall coverage spans many Civic years — always confirm the recall was completed.",
    "High resale demand means odometer fraud is more tempting; cross-check the reading against service and inspection records.",
    "Some model years had AC compressor and infotainment complaints — pair the report with a functional test drive.",
  ],
};

export const metadata: Metadata = {
  title: `${MODEL} Carfax Alternative — Free VIN Preview, $14.99 Report`,
  description: `Best Carfax alternative for a used ${MODEL}: same NMVTIS title, odometer, and recall data, free VIN preview, $14.99 full report vs Carfax's $44.99.`,
  keywords: [`honda civic carfax`, `honda civic carfax alternative`, `honda civic vin check`, `honda civic history report`, `used honda civic vin`, `honda civic carfax report`, `free honda civic history`],
  alternates: { canonical: `/${SLUG}` },
  openGraph: { title: `${MODEL} Carfax Alternative — Free VIN Preview, $14.99 Report`, description: `Same NMVTIS data as Carfax for a used ${MODEL}. Free preview, $14.99 full report vs $44.99.`, url: `${SITE}/${SLUG}`, type: "article", siteName: "CarCheckerVIN" },
  robots: { index: true, follow: true },
};

const faqs = buildModelFaqs(MODEL);
const articleSchema = { "@context": "https://schema.org", "@type": "Article", headline: `${MODEL} Carfax Alternative — Same Data, One-Third the Price`, description: `How to check a used ${MODEL}'s history for a fraction of Carfax's price using NMVTIS-sourced data, and what records matter most on this model.`, author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } }, mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE}/${SLUG}` }, datePublished: "2026-07-02", dateModified: new Date().toISOString().slice(0, 10) };
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
