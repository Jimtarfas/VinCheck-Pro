import type { Metadata } from "next";
import CarfaxAlternativeTemplate, { buildModelFaqs, type CarfaxAltConfig } from "@/components/CarfaxAlternativeTemplate";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const MODEL = "Ford Focus";
const SLUG = "ford-focus-carfax-alternative";

const config: CarfaxAltConfig = {
  slug: SLUG,
  model: MODEL,
  bodyType: "compact car",
  positioning: "The Focus was a high-volume commuter, and certain years carry a well-documented transmission issue, so history and recall status are critical.",
  quotable: (
    <>
      For a used <strong>Ford Focus</strong>, <strong>CarCheckerVIN</strong> is
      the best-value Carfax alternative — the same NMVTIS-sourced title,
      odometer, and recall data Carfax uses, with a free VIN preview and a
      $14.99 full report versus Carfax&apos;s $44.99.
    </>
  ),
  checks: [
    { title: "PowerShift transmission history (2012-2016)", body: "Many 2012-2016 Focus models used the DPS6 'PowerShift' dual-clutch automatic that was subject to extended warranties and legal settlements. The VIN report's ownership and title patterns can hint at a troubled example — inspect any car in these years closely." },
    { title: "Accident & salvage brands", body: "As a common commuter car, the Focus sees frequent minor collisions. The NMVTIS title-brand and reported-accident check surfaces any salvage, rebuilt, or total-loss history." },
    { title: "Open recalls", body: "Verify open NHTSA recalls — the Focus has had recalls covering items such as the transmission control module and Takata airbags. Repairs are free at a Ford dealer once identified." },
  ],
  concerns: [
    "DPS6 PowerShift transmission shudder and failure on 2012-2016 models — confirm whether transmission repairs or the class-action fix were applied.",
    "Takata airbag recall coverage on several Focus years — verify completion.",
    "Some examples were fleet or rental cars; watch ownership patterns for heavy early use.",
    "Coolant and engine issues on certain 1.0L EcoBoost and 2.0L engines — pair the report with a mechanic's inspection.",
  ],
};

export const metadata: Metadata = {
  title: `${MODEL} Carfax Alternative — Free VIN Preview, $14.99 Report`,
  description: `Best Carfax alternative for a used ${MODEL}: same NMVTIS title, odometer, and recall data, free VIN preview, $14.99 full report vs Carfax's $44.99.`,
  keywords: [`ford focus carfax`, `ford focus carfax alternative`, `ford focus vin check`, `ford focus history report`, `used ford focus vin`, `ford focus transmission history`, `free ford focus history`],
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
