import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SalvageCheckStateBody, { getSalvageState, getAllSalvageStates } from "@/components/SalvageCheckStateBody";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";

export function generateStaticParams() {
  return getAllSalvageStates().map((s) => ({ state: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string }>;
}): Promise<Metadata> {
  const { state } = await params;
  const s = getSalvageState(state);
  if (!s) return {};

  const title = `${s.name} Salvage Title Check by VIN — Branded Title Lookup (Free)`;
  const description = `Free ${s.name} salvage title check by VIN. Cross-reference NMVTIS and ${s.dmvName} title brands to catch salvage, rebuilt, and flood titles before you buy. Instant, no signup.`;

  return {
    title: { absolute: title },
    description,
    keywords: [
      `${s.name} salvage title check`,
      `salvage title VIN ${s.name}`,
      `${s.name} rebuilt title check`,
      `branded title check ${s.name}`,
      `${s.abbr} salvage title lookup`,
      `check for salvage title ${s.name}`,
      `${s.name} flood title VIN check`,
      `title washing check ${s.name}`,
      `NMVTIS salvage ${s.name}`,
      `free salvage title check ${s.name}`,
      `is the title clean ${s.name}`,
      `reconstructed title VIN ${s.name}`,
    ],
    alternates: { canonical: `/salvage-title-check/${s.slug}` },
    openGraph: {
      title,
      description,
      url: `${SITE}/salvage-title-check/${s.slug}`,
      type: "article",
      siteName: "CarCheckerVIN",
    },
    twitter: { card: "summary_large_image", title, description },
    robots: { index: true, follow: true },
  };
}

export default async function StateSalvageCheckPage({
  params,
}: {
  params: Promise<{ state: string }>;
}) {
  const { state } = await params;
  const s = getSalvageState(state);
  if (!s) notFound();
  const pageUrl = `${SITE}/salvage-title-check/${s.slug}`;

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: `${s.name} Salvage Title Check by VIN`,
    url: pageUrl,
    applicationCategory: "AutomotiveApplication",
    operatingSystem: "All",
    description: `Check a ${s.name} vehicle's title-brand history by its VIN. Cross-references NMVTIS, the title-brand records reported by the ${s.dmvName}, and insurance total-loss feeds to surface salvage, rebuilt, flood, and junk brands — even when the paper title has been washed clean in another state.`,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    publisher: {
      "@type": "Organization",
      name: "CarCheckerVIN",
      url: SITE,
      logo: { "@type": "ImageObject", url: `${SITE}/logo.png` },
    },
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${s.name} Salvage Title Check by VIN`,
    description: `How to check for a salvage or branded title in ${s.name} using a VIN: the NMVTIS database, the title brands the ${s.dmvName} uses, how title washing works, and what to do if a VIN is branded.`,
    author: ORG_AUTHOR,
    publisher: {
      "@type": "Organization",
      name: "CarCheckerVIN",
      url: SITE,
      logo: { "@type": "ImageObject", url: `${SITE}/logo.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
    datePublished: "2026-06-25",
    dateModified: new Date().toISOString().slice(0, 10),
    image: `${SITE}/opengraph-image`,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `How do I check for a salvage title in ${s.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Enter the 17-character VIN into a salvage-title lookup that cross-references NMVTIS, which aggregates title-brand records from the ${s.dmvName} and every other state DMV, plus insurance total-loss feeds. A salvage, rebuilt, flood, or junk brand on a ${s.name} vehicle will surface even if the car was later re-titled in another state to hide it.`,
        },
      },
      {
        "@type": "Question",
        name: `What title brands does ${s.name} use?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${s.name} records these brands through the ${s.dmvName}: ${s.titleBrands.join(", ")}. Once a brand is applied it follows the VIN nationwide through NMVTIS and cannot be erased by re-titling the car.`,
        },
      },
      {
        "@type": "Question",
        name: `What is title washing, and does a VIN check stop it in ${s.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Title washing is moving a branded vehicle between states to obtain a clean-looking paper title. Because NMVTIS ties every brand to the VIN rather than to the paper document, a VIN check surfaces a brand applied in any state — including ${s.name} — no matter where the car is currently titled.`,
        },
      },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Salvage Title Check", item: `${SITE}/salvage-title-check` },
      { "@type": "ListItem", position: 3, name: `${s.name} Salvage Title Check`, item: pageUrl },
    ],
  };

  const speakableSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".speakable-intro"] },
    url: pageUrl,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <SalvageCheckStateBody stateSlug={state} />
    </>
  );
}
