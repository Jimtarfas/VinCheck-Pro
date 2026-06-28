/**
 * Wave 17g — French author profile.
 * Renders the SAME full English author-profile layout via the shared
 * AuthorBody component. Replaces the Wave 15 SpecialtyToolPage stub
 * with true visual parity. Bio + name + role render verbatim from
 * Sanity (proper nouns / journalist credentials); only chrome translates.
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AuthorBody from "@/components/AuthorBody";
import { sanityClient, urlFor } from "@/sanity/client";
import {
  allAuthorsQuery,
  authorBySlugQuery,
  postsByAuthorQuery,
} from "@/sanity/queries";
import type { SanityAuthor, SanityPost } from "@/sanity/types";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";

const SITE = "https://www.carcheckervin.com";

export const revalidate = 60;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const authors = await sanityClient.fetch<SanityAuthor[]>(allAuthorsQuery);
    return (authors ?? [])
      .filter((a) => !!a.slug)
      .map((a) => ({ slug: a.slug as string }));
  } catch {
    // Sanity unreachable or quota reached at build time — skip prerendering and
    // let these pages render on demand via ISR rather than failing the build.
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  let author: SanityAuthor | null = null;
  try {
    author = await sanityClient.fetch<SanityAuthor | null>(authorBySlugQuery, { slug });
  } catch {
    author = null;
  }

  if (!author) {
    return { robots: { index: false, follow: false } };
  }

  const alt = hreflangAlternatesForLocale(`/author/${author.slug}`, "fr");
  const description =
    author.bio ||
    `${author.name}${author.role ? ` — ${author.role}` : ""} en CarCheckerVIN. Lee todeux les artículos escritos par ${author.name}.`;
  const ogImageUrl = author.avatar ? urlFor(author.avatar).width(1200).height(630).url() : undefined;
  const title = `${author.name} — Autor en CarCheckerVIN`;

  return {
    title,
    description,
    alternates: { canonical: alt.canonical, languages: alt.languages },
    openGraph: {
      title,
      description,
      url: alt.canonical,
      type: "profile",
      siteName: "CarCheckerVIN",
      locale: "fr_US",
      images: ogImageUrl ? [{ url: ogImageUrl, width: 1200, height: 630 }] : undefined,
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;

  let author: SanityAuthor | null = null;
  let posts: SanityPost[] = [];
  try {
    const result = await Promise.all([
      sanityClient.fetch<SanityAuthor | null>(authorBySlugQuery, { slug }),
      sanityClient.fetch<SanityPost[]>(postsByAuthorQuery, { slug }),
    ]);
    author = result[0];
    posts = result[1] ?? [];
  } catch {
    author = null;
    posts = [];
  }

  if (!author) notFound();

  const pageUrl = `${SITE}/fr/author/${author.slug}`;
  const sameAs = [
    author.social?.twitter,
    author.social?.linkedin,
    author.social?.website,
  ].filter(Boolean) as string[];

  const personLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: author.name,
    jobTitle: author.role,
    description: author.bio,
    url: pageUrl,
    image: author.avatar ? urlFor(author.avatar).width(400).height(400).url() : undefined,
    sameAs: sameAs.length > 0 ? sameAs : undefined,
    worksFor: {
      "@type": "Organization",
      name: "CarCheckerVIN",
      url: SITE,
    },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE}/fr` },
      { "@type": "ListItem", position: 2, name: "Autores", item: `${SITE}/fr/author` },
      { "@type": "ListItem", position: 3, name: author.name, item: pageUrl },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <AuthorBody author={author} posts={posts} locale="fr" />
    </>
  );
}
