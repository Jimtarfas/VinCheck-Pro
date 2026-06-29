import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AtvVinBody from "@/components/AtvVinBody";
import {
  ATV_BRANDS,
  findAtvBrand,
  atvFaqs,
  atvHowTo,
} from "@/lib/atv-models";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";

export function generateStaticParams() {
  return ATV_BRANDS.map((m) => ({ model: m.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ model: string }>;
}): Promise<Metadata> {
  const { model } = await params;
  const m = findAtvBrand(model);
  if (!m) return {};

  const title = `${m.fullName} VIN Decoder & Check — Free Lookup`;
  const description = `Free ${m.fullName} VIN decoder. Decode the year, engine, and model, and reveal salvage, flood, theft, accident & odometer brands on your ${m.name} quad. NMVTIS-backed, instant, no signup.`;

  return {
    title: { absolute: title },
    description,
    keywords: [
      `${m.fullName} VIN decoder`,
      `${m.name} ATV VIN check`,
      `${m.name} ATV VIN decoder`,
      `decode ${m.name} ATV VIN`,
      `${m.name} ATV VIN lookup`,
      `${m.name} quad VIN check`,
      `${m.name} ATV history report`,
      `is my ${m.name} ATV stolen`,
      `free ${m.name} ATV VIN check`,
    ],
    alternates: { canonical: `/atv-vin-check/${m.slug}` },
    openGraph: {
      title,
      description,
      url: `${SITE}/atv-vin-check/${m.slug}`,
      type: "article",
      siteName: "CarCheckerVIN",
    },
    twitter: { card: "summary_large_image", title, description },
    robots: { index: true, follow: true },
  };
}

export default async function AtvBrandVinPage({
  params,
}: {
  params: Promise<{ model: string }>;
}) {
  const { model } = await params;
  const m = findAtvBrand(model);
  if (!m) notFound();

  const pageUrl = `${SITE}/atv-vin-check/${m.slug}`;
  const faqs = atvFaqs(m);
  const howTo = atvHowTo(m);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${m.fullName} VIN Decoder & Check`,
    description: `How to decode and check a ${m.fullName} VIN: where it is stamped on the frame, how the engine number should match it, what the ${m.vinPrefix} WMI prefix means, and how to surface salvage, flood, and theft brands before you buy.`,
    author: ORG_AUTHOR,
    publisher: {
      "@type": "Organization",
      name: "CarCheckerVIN",
      url: SITE,
      logo: { "@type": "ImageObject", url: `${SITE}/logo.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
    datePublished: "2026-06-22",
    dateModified: new Date().toISOString().slice(0, 10),
    image: `${SITE}/opengraph-image`,
    about: {
      "@type": "Vehicle",
      name: m.fullName,
      vehicleConfiguration: "ATV",
      brand: { "@type": "Brand", name: m.name },
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "ATV VIN Check", item: `${SITE}/atv-vin-check` },
      { "@type": "ListItem", position: 3, name: `${m.name} ATV VIN Check`, item: pageUrl },
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
    description: `A 6-step guide to decoding and verifying a ${m.fullName} VIN — including matching the frame VIN to the engine number and running a theft check — before purchase.`,
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
      <AtvVinBody modelSlug={m.slug} />
    </>
  );
}
