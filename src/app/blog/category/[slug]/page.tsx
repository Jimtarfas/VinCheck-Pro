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
    return { title: "Category Not Found", robots: { index: false, follow: false } };
  }

  const description =
    category.description ||
    `Read the latest CarCheckerVIN articles in the ${category.title} category — guides, tips, and insights.`;

  return {
    title: `${category.title} — VIN Check Blog`,
    description,
    alternates: { canonical: `/blog/category/${category.slug}` },
    openGraph: {
      title: `${category.title} — VIN Check Blog`,
      description,
      url: `https://www.carcheckervin.com/blog/category/${category.slug}`,
      type: "website",
    },
    // Category archives are navigation, not destinations. See the matching
    // comment on /blog/tag/[tag] — Google parks listing pages in
    // "Crawled — currently not indexed" because they're just post-title
    // lists. `follow: true` preserves link equity to the real posts.
    robots: { index: false, follow: true },
  };
}

export default async function BlogCategoryPage({ params }: Props) {
  const { slug } = await params;

  const [category, posts] = await Promise.all([
    sanityClient.fetch<SanityCategory | null>(categoryBySlugQuery, { slug }),
    sanityClient.fetch<SanityPost[]>(postsByCategoryQuery, { slug }),
  ]);

  if (!category) notFound();

  const collectionLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${category.title} — VIN Check Blog`,
    description: category.description,
    url: `https://www.carcheckervin.com/blog/category/${category.slug}`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: posts.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `https://www.carcheckervin.com/blog/${p.slug}`,
        name: p.title,
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionLd) }}
      />
      <BlogCategoryBody category={category} posts={posts} locale="en" />
    </>
  );
}
