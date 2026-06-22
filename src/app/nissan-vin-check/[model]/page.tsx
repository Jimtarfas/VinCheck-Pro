import type { Metadata } from "next";
import { notFound } from "next/navigation";
import NissanVinBody from "@/components/NissanVinBody";
import {
  NISSAN_MODELS,
  findNissanModel,
  nissanFaqs,
  nissanHowTo,
} from "@/lib/nissan-models";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";

export function generateStaticParams() {
  return NISSAN_MODELS.map((m) => ({ model: m.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ model: string }>;
}): Promise<Metadata> {
  const { model } = await params;
  const m = findNissanModel(model);
  if (!m) return {};

  const title = `${m.fullName} VIN Check & Decoder — Free Lookup`;
  const description = `Free ${m.fullName} VIN check. Decode the year, engine, and trim, and reveal salvage, flood, buyback, accident & odometer brands on your ${m.name}. NMVTIS-backed, instant, no signup.`;

  return {
    title: { absolute: title },
    description,
    keywords: [
      `${m.fullName} VIN check`,
      `${m.name} VIN check`,
      `${m.name} VIN decoder`,
      `decode ${m.name} VIN`,
      `${m.name} VIN lookup`,
      `Nissan ${m.name} VIN`,
      `${m.name} history report`,
      `is my ${m.name} salvage`,
      `free ${m.name} VIN check`,
    ],
    alternates: { canonical: `/nissan-vin-check/${m.slug}` },
    openGraph: {
      title,
      description,
      url: `${SITE}/nissan-vin-check/${m.slug}`,
      type: "article",
      siteName: "CarCheckerVIN",
    },
    twitter: { card: "summary_large_image", title, description },
    robots: { index: true, follow: true },
  };
}

export default async function NissanModelVinPage({
  params,
}: {
  params: Promise<{ model: string }>;
}) {
  const { model } = await params;
  const m = findNissanModel(model);
  if (!m) notFound();

  const pageUrl = `${SITE}/nissan-vin-check/${m.slug}`;
  const faqs = nissanFaqs(m);
  const howTo = nissanHowTo(m);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${m.fullName} VIN Check & Decoder`,
    description: `How to decode and check a ${m.fullName} VIN: where to find it, what the ${m.vinPrefix} WMI prefix and ${m.generation} generation mean, and how to surface salvage, flood, and buyback brands before you buy.`,
    author: ORG_AUTHOR,
    publisher: {
      "@type": "Organization",
      name: "CarCheckerVIN",
      url: SITE,
      logo: { "@type": "ImageObject", url: `${SITE}/logo.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
    datePublished: "2026-06-22",
    dateModified: "2026-06-22",
    image: `${SITE}/opengraph-image`,
    about: {
      "@type": "Car",
      name: m.fullName,
      brand: { "@type": "Brand", name: "Nissan" },
      model: m.name,
      bodyType: m.bodyStyle,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Nissan VIN Check", item: `${SITE}/nissan-vin-check` },
      { "@type": "ListItem", position: 3, name: `${m.name} VIN Check`, item: pageUrl },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How to Check a ${m.fullName} VIN`,
    description: `A 6-step guide to decoding and verifying a ${m.fullName} VIN before purchase.`,
    totalTime: "PT15M",
    step: howTo.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.title,
      text: s.body,
    })),
  };

  const appSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: `${m.fullName} VIN Check`,
    url: pageUrl,
    applicationCategory: "AutomotiveApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    publisher: ORG_AUTHOR,
  };

  const speakableSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": pageUrl,
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: [".speakable-intro", "h1"],
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <NissanVinBody modelSlug={m.slug} />
    </>
  );
}
