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
  const author = await sanityClient.fetch<SanityAuthor | null>(authorBySlugQuery, { slug });

  if (!author) {
    return { title: "Author Not Found", robots: { index: false, follow: false } };
  }

  const description =
    author.bio ||
    `${author.name}${author.role ? ` — ${author.role}` : ""} at CarCheckerVIN. Read all articles by ${author.name}.`;

  const ogImageUrl = author.avatar ? urlFor(author.avatar).width(1200).height(630).url() : undefined;

  return {
    title: `${author.name} — Author at CarCheckerVIN`,
    description,
    alternates: { canonical: `/author/${author.slug}` },
    openGraph: {
      title: `${author.name} — Author at CarCheckerVIN`,
      description,
      url: `https://www.carcheckervin.com/author/${author.slug}`,
      type: "profile",
      images: ogImageUrl ? [{ url: ogImageUrl, width: 1200, height: 630 }] : undefined,
    },
  };
}

export default async function AuthorPage({ params }: Props) {
  const { slug } = await params;

  const [author, posts] = await Promise.all([
    sanityClient.fetch<SanityAuthor | null>(authorBySlugQuery, { slug }),
    sanityClient.fetch<SanityPost[]>(postsByAuthorQuery, { slug }),
  ]);

  if (!author) notFound();

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
    url: `https://www.carcheckervin.com/author/${author.slug}`,
    image: author.avatar ? urlFor(author.avatar).width(400).height(400).url() : undefined,
    sameAs: sameAs.length > 0 ? sameAs : undefined,
    worksFor: {
      "@type": "Organization",
      name: "CarCheckerVIN",
      url: "https://www.carcheckervin.com",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
      />
      <AuthorBody author={author} posts={posts} locale="en" />
    </>
  );
}
