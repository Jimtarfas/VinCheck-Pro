/**
 * Spanish make landing page — /es/revision-vin/<make>.
 * Wave 18.19 — slim wrapper delegating to VinCheckMakeBody with locale="es".
 *
 * The proxy rewrites "/es/revision-vin/<make>" → "/es/vin-check/<make>"
 * (per slugs.ts), so this file lives at the English-shape path even
 * though buyers see the native-language slug.
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { makes, getMakeBySlug } from "@/lib/makes";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";
import VinCheckMakeBody, { getMakeFaqsEs } from "@/components/VinCheckMakeBody";

const LOCALE = "es" as const;
const SITE = "https://www.carcheckervin.com";

interface Props {
  params: Promise<{ make: string }>;
}

export async function generateStaticParams() {
  return makes.map((m) => ({ make: m.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { make: slug } = await params;
  const make = getMakeBySlug(slug);
  if (!make) return { title: "Revisión VIN" };

  const title = `Revisión VIN ${make.name} gratis — Decodificador e historial`;
  const description = `Revisión VIN ${make.name} y decodificador gratis. Decodifica cualquier VIN ${make.name} para especificaciones, fotos, valor de mercado, retiros e historial completo del vehículo — sin registro, sin tarjeta.`;
  const englishPath = `/vin-check/${make.slug}`;
  const alt = hreflangAlternatesForLocale(englishPath, LOCALE);

  return {
    title: { absolute: title },
    description,
    keywords: [
      `revisión VIN ${make.name}`,
      `decodificador VIN ${make.name}`,
      `VIN check ${make.name} español`,
      `historial vehicular ${make.name}`,
      `${make.name} VIN gratis`,
      `retiros ${make.name} por VIN`,
    ],
    alternates: { canonical: alt.canonical, languages: alt.languages },
    openGraph: {
      title,
      description,
      url: alt.canonical,
      type: "website",
      locale: "es_US",
      siteName: "CarCheckerVIN",
    },
    twitter: { card: "summary_large_image", title, description },
    robots: { index: true, follow: true },
  };
}

export default async function MakePageEs({ params }: Props) {
  const { make: slug } = await params;
  const make = getMakeBySlug(slug);
  if (!make) notFound();

  const url = `${SITE}/es/revision-vin/${make.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    inLanguage: "es",
    name: `Revisión VIN y decodificador ${make.name}`,
    description: `Revisión VIN ${make.name} gratis. Decodifica cualquier VIN ${make.name} para historial completo del vehículo, especificaciones y valores de mercado.`,
    url,
    isPartOf: { "@type": "WebSite", name: "CarCheckerVIN", url: SITE },
    author: ORG_AUTHOR,
  };

  const serviceRatingLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: `Revisión VIN ${make.name}`,
    provider: { "@type": "Organization", name: "CarCheckerVIN", url: SITE },
    areaServed: { "@type": "Country", name: "United States" },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      bestRating: "5",
      worstRating: "1",
      ratingCount: "89",
    },
  };

  const faqs = getMakeFaqsEs(make.name, make.popular[0]);

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: "es",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceRatingLd) }} />
      <VinCheckMakeBody make={make.slug} locale="es" />
    </>
  );
}
