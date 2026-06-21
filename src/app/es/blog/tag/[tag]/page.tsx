/**
 * Wave 17g — Spanish blog tag archive.
 * Renders the SAME full English tag-archive layout via the shared
 * BlogTagBody component. Replaces the Wave 15 SpecialtyToolPage stub
 * with true visual parity.
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogTagBody from "@/components/BlogTagBody";
import { sanityClient } from "@/sanity/client";
import { allTagsQuery, postsByTagQuery } from "@/sanity/queries";
import type { SanityPost } from "@/sanity/types";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";

const SITE = "https://www.carcheckervin.com";

export const revalidate = 60;

interface Props {
  params: Promise<{ tag: string }>;
}

function slugifyTag(tag: string): string {
  return tag
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function resolveTag(slugParam: string): Promise<string | null> {
  const allTags = await sanityClient.fetch<string[]>(allTagsQuery);
  if (!allTags) return null;
  const decoded = decodeURIComponent(slugParam).toLowerCase();
  const match = allTags.find(
    (t) => slugifyTag(t) === decoded || t.toLowerCase() === decoded,
  );
  return match || null;
}

export async function generateStaticParams() {
  const allTags = await sanityClient.fetch<string[]>(allTagsQuery);
  if (!allTags) return [];
  const seen = new Set<string>();
  const params: { tag: string }[] = [];
  for (const t of allTags) {
    const slug = slugifyTag(t);
    if (slug && !seen.has(slug)) {
      seen.add(slug);
      params.push({ tag: slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params;
  const resolved = await resolveTag(tag);

  if (!resolved) return { robots: { index: false, follow: false } };

  const posts = await sanityClient.fetch<SanityPost[]>(
    postsByTagQuery,
    { tag: resolved } as Record<string, string>,
  );
  const count = posts.length;
  const slug = slugifyTag(resolved);
  const alt = hreflangAlternatesForLocale(`/blog/tag/${slug}`, "es");
  const title = `Artículos sobre ${resolved} | Blog CarCheckerVIN`;
  const description = `Lee ${count} ${count === 1 ? "artículo etiquetado" : "artículos etiquetados"} con ${resolved} del equipo editorial de CarCheckerVIN.`;

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
  const { tag } = await params;
  const resolved = await resolveTag(tag);

  if (!resolved) notFound();

  const posts = await sanityClient.fetch<SanityPost[]>(
    postsByTagQuery,
    { tag: resolved } as Record<string, string>,
  );
  if (!posts || posts.length === 0) notFound();

  const slug = slugifyTag(resolved);
  const pageUrl = `${SITE}/es/blog/tag/${slug}`;

  const collectionLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `Artículos etiquetados: ${resolved}`,
    description: `Artículos de CarCheckerVIN etiquetados con ${resolved}.`,
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
      { "@type": "ListItem", position: 3, name: `#${resolved}`, item: pageUrl },
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
      <BlogTagBody tag={resolved} posts={posts} locale="es" />
    </>
  );
}
