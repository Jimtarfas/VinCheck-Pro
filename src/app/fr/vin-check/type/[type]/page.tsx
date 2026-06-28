import type { Metadata } from "next";
import { notFound } from "next/navigation";
import VinCheckTypeBody from "@/components/VinCheckTypeBody";
import {
  VIN_CHECK_TYPE_PAGES,
  findVinCheckTypePage,
} from "@/lib/vin-check-type-pages";
import { vinCheckTypePageEs } from "@/lib/vin-check-type-pages-es";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";

export function generateStaticParams() {
  return VIN_CHECK_TYPE_PAGES.map((p) => ({ type: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ type: string }>;
}): Promise<Metadata> {
  const { type } = await params;
  const enPage = findVinCheckTypePage(type);
  if (!enPage) return {};
  const esPage = vinCheckTypePageEs(type) ?? enPage;

  const englishPath = `/vin-check/type/${enPage.slug}`;
  const url = `${SITE}/es${englishPath}`;
  const alt = hreflangAlternatesForLocale(englishPath, "fr");

  return {
    title: { absolute: esPage.metaTitle },
    description: esPage.metaDescription,
    keywords: esPage.keywords,
    alternates: { canonical: alt.canonical, languages: alt.languages },
    openGraph: {
      title: esPage.metaTitle,
      description: esPage.metaDescription,
      url,
      type: "article",
      siteName: "CarCheckerVIN",
      locale: "fr_US",
    },
    twitter: {
      card: "summary_large_image",
      title: esPage.metaTitle,
      description: esPage.metaDescription,
    },
    robots: { index: true, follow: true },
  };
}

export default async function VinCheckTypeSlugPageEs({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = await params;
  const enPage = findVinCheckTypePage(type);
  if (!enPage) notFound();
  const esPage = vinCheckTypePageEs(type) ?? enPage;

  const pageUrl = `${SITE}/fr/vin-check/type/${enPage.slug}`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    inLanguage: "fr",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE}/fr` },
      { "@type": "ListItem", position: 2, name: "Vérification VIN", item: `${SITE}/fr/vin-check` },
      { "@type": "ListItem", position: 3, name: "Par tipo de véhicule", item: `${SITE}/fr/vin-check/type` },
      { "@type": "ListItem", position: 4, name: esPage.badge, item: pageUrl },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: "fr",
    mainEntity: esPage.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const appSchema = {
    "@context": "https://schema.org",
    "@type": ["WebApplication", "SoftwareApplication"],
    inLanguage: "fr",
    name: esPage.metaTitle,
    description: esPage.metaDescription,
    url: pageUrl,
    applicationCategory: "AutomotiveApplication",
    operatingSystem: "Web Browser",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    publisher: ORG_AUTHOR,
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    inLanguage: "fr",
    headline: esPage.metaTitle,
    description: esPage.metaDescription,
    author: ORG_AUTHOR,
    publisher: {
      "@type": "Organization",
      name: "CarCheckerVIN",
      url: SITE,
      logo: { "@type": "ImageObject", url: `${SITE}/logo.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
    datePublished: "2026-06-27",
    dateModified: "2026-06-27",
    image: `${SITE}/opengraph-image`,
  };

  const speakableSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": pageUrl,
    inLanguage: "fr",
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: [".speakable-intro", ".speakable-answer", "h1"],
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <VinCheckTypeBody page={enPage} locale="fr" />
    </>
  );
}
