/**
 * French make landing page — /fr/revision-vin/<make>.
 * Wave 18.19 — slim wrapper delegating to VinCheckMakeBody with locale="fr".
 *
 * The proxy rewrites "/fr/revision-vin/<make>" → "/fr/vin-check/<make>"
 * (per slugs.ts), so this file lives at the English-shape path even
 * though buyers see the native-language slug.
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { makes, getMakeBySlug } from "@/lib/makes";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";
import VinCheckMakeBody, { getMakeFaqsEs } from "@/components/VinCheckMakeBody";

const LOCALE = "fr" as const;
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
  if (!make) return { title: "Vérification VIN" };

  const title = `Vérification VIN ${make.name} gratuit — Décodeur e historique`;
  const description = `Vérification VIN ${make.name} et décodeur gratuit. Décode n’importe quel VIN ${make.name} pour especificaciones, fotos, valeur de marché, rappels et historique complet du véhicule — sans inscription, sans carte.`;
  const englishPath = `/vin-check/${make.slug}`;
  const alt = hreflangAlternatesForLocale(englishPath, LOCALE);

  return {
    title: { absolute: title },
    description,
    keywords: [
      `vérification VIN ${make.name}`,
      `décodeur VIN ${make.name}`,
      `VIN check ${make.name} français`,
      `historique de véhicule ${make.name}`,
      `${make.name} VIN gratuit`,
      `rappels ${make.name} par VIN`,
    ],
    alternates: { canonical: alt.canonical, languages: alt.languages },
    openGraph: {
      title,
      description,
      url: alt.canonical,
      type: "website",
      locale: "fr_US",
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

  const url = `${SITE}/fr/revision-vin/${make.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    inLanguage: "fr",
    name: `Vérification VIN et décodeur ${make.name}`,
    description: `Vérification VIN ${make.name} gratuit. Décode n’importe quel VIN ${make.name} pour historique complet du véhicule, especificaciones et valeures de marché.`,
    url,
    isPartOf: { "@type": "WebSite", name: "CarCheckerVIN", url: SITE },
    author: ORG_AUTHOR,
  };

  const êtreviceRatingLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    êtreviceType: `Vérification VIN ${make.name}`,
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
    inLanguage: "fr",
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(êtreviceRatingLd) }} />
      <VinCheckMakeBody make={make.slug} locale="fr" />
    </>
  );
}
