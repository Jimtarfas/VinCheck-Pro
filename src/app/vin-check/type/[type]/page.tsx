import type { Metadata } from "next";
import { notFound } from "next/navigation";
import VinCheckTypeLandingBody from "@/components/VinCheckTypeLandingBody";
import {
  VIN_CHECK_TYPE_PAGES,
  findVinCheckTypePage,
} from "@/lib/vin-check-type-pages";
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
  const page = findVinCheckTypePage(type);
  if (!page) return {};

  const url = `${SITE}/vin-check/type/${page.slug}`;
  return {
    title: { absolute: page.metaTitle },
    description: page.metaDescription,
    keywords: page.keywords,
    alternates: { canonical: `/vin-check/type/${page.slug}` },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url,
      type: "article",
      siteName: "CarCheckerVIN",
    },
    twitter: {
      card: "summary_large_image",
      title: page.metaTitle,
      description: page.metaDescription,
    },
    robots: { index: true, follow: true },
  };
}

export default async function VinCheckTypeSlugPage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = await params;
  const page = findVinCheckTypePage(type);
  if (!page) notFound();

  const pageUrl = `${SITE}/vin-check/type/${page.slug}`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "VIN Check", item: `${SITE}/vin-check` },
      { "@type": "ListItem", position: 3, name: "By Vehicle Type", item: `${SITE}/vin-check/type` },
      { "@type": "ListItem", position: 4, name: page.badge, item: pageUrl },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const appSchema = {
    "@context": "https://schema.org",
    "@type": ["WebApplication", "SoftwareApplication"],
    name: page.metaTitle,
    description: page.metaDescription,
    url: pageUrl,
    applicationCategory: "AutomotiveApplication",
    operatingSystem: "Web Browser",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    publisher: ORG_AUTHOR,
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: page.metaTitle,
    description: page.metaDescription,
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
      <VinCheckTypeLandingBody page={page} />
    </>
  );
}
