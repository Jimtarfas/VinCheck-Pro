/**
 * Wave 17g — Spanish blog category archive.
 * Renders the SAME full English category-archive layout via the shared
 * BlogCategoryBody component. Replaces the Wave 15 SpecialtyToolPage
 * stub with true visual parity.
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogCategoryBody from "@/components/BlogCategoryBody";
import { sanityClient } from "@/sanity/client";
import {
  allCategorySlugsQuery,
  categoryBySlugQuery,
  postsByCategoryQuery,
} from "@/sanity/queries";
import type { SanityPost, SanityCategory } from "@/sanity/types";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";

const SITE = "https://www.carcheckervin.com";

export const revalidate = 60;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await sanityClient.fetch<string[]>(allCategorySlugsQuery);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = await sanityClient.fetch<SanityCategory | null>(categoryBySlugQuery, { slug });

  if (!category) {
    return { robots: { index: false, follow: false } };
  }

  const alt = hreflangAlternatesForLocale(`/blog/category/${category.slug}`, "es");
  const description =
    category.description ||
    `Lee los artículos más recientes de CarCheckerVIN en la categoría ${category.title} — guías, consejos y análisis.`;
  const title = `${category.title} — Blog CarCheckerVIN`;

  return {
    title,
    description,
    alternates: { canonical: alt.canonical, languages: alt.languages },
    openGraph: {
      title,
      description,
      url: alt.canonical,
      type: "website",
      siteName: "CarCheckerVIN",
      locale: "es_US",
    },
    robots: { index: false, follow: true },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;

  const [category, posts] = await Promise.all([
    sanityClient.fetch<SanityCategory | null>(categoryBySlugQuery, { slug }),
    sanityClient.fetch<SanityPost[]>(postsByCategoryQuery, { slug }),
  ]);

  if (!category) notFound();

  const pageUrl = `${SITE}/es/blog/category/${category.slug}`;

  const collectionLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${category.title} — Blog CarCheckerVIN`,
    description: category.description,
    url: pageUrl,
    inLanguage: "es",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: posts.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${SITE}/es/blog/${p.slug}`,
        name: p.title,
      })),
    },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE}/es` },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE}/es/blog` },
      { "@type": "ListItem", position: 3, name: category.title, item: pageUrl },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <BlogCategoryBody category={category} posts={posts} locale="es" />
    </>
  );
}
