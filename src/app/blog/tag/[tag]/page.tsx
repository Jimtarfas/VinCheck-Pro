import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogTagBody from "@/components/BlogTagBody";
import { sanityClient } from "@/sanity/client";
import { allTagsQuery, postsByTagQuery } from "@/sanity/queries";
import type { SanityPost } from "@/sanity/types";

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
    const s = slugifyTag(t);
    if (s && !seen.has(s)) {
      seen.add(s);
      params.push({ tag: s });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params;
  const resolved = await resolveTag(tag);

  if (!resolved) {
    return { title: "Tag Not Found", robots: { index: false, follow: false } };
  }

  const posts = await sanityClient.fetch<SanityPost[]>(postsByTagQuery, { tag: resolved } as Record<string, string>);
  const count = posts.length;

  return {
    title: `${resolved} Articles | CarCheckerVIN Blog`,
    description: `Read ${count} CarCheckerVIN ${count === 1 ? "article" : "articles"} tagged with ${resolved}.`,
    alternates: { canonical: `/blog/tag/${slugifyTag(resolved)}` },
    openGraph: {
      title: `${resolved} Articles | CarCheckerVIN Blog`,
      description: `Read ${count} CarCheckerVIN ${count === 1 ? "article" : "articles"} tagged with ${resolved}.`,
      url: `https://www.carcheckervin.com/blog/tag/${slugifyTag(resolved)}`,
      type: "website",
    },
    // Tag archives are navigation, not destinations. Google was repeatedly
    // putting them in "Crawled — currently not indexed" because they're just
    // lists of post titles with no original content. Explicitly noindex so
    // they transition into the cleaner "Excluded by noindex" bucket and
    // stop competing with the actual articles for crawl budget.
    // `follow: true` keeps link equity flowing to the real posts.
    robots: { index: false, follow: true },
  };
}

export default async function BlogTagPage({ params }: Props) {
  const { tag } = await params;
  const resolved = await resolveTag(tag);

  if (!resolved) notFound();

  const posts = await sanityClient.fetch<SanityPost[]>(postsByTagQuery, { tag: resolved } as Record<string, string>);

  if (!posts || posts.length === 0) notFound();

  const collectionLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `Articles tagged: ${resolved}`,
    description: `CarCheckerVIN articles tagged with ${resolved}.`,
    url: `https://www.carcheckervin.com/blog/tag/${slugifyTag(resolved)}`,
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
      <BlogTagBody tag={resolved} posts={posts} locale="en" />
    </>
  );
}
