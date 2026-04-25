import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import PortableTextRenderer from "@/components/PortableTextRenderer";
import { sanityClient, urlFor } from "@/sanity/client";
import { postBySlugQuery, postSlugsQuery } from "@/sanity/queries";
import type { SanityPost } from "@/sanity/types";

export const revalidate = 60;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await sanityClient.fetch<string[]>(postSlugsQuery);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await sanityClient.fetch<SanityPost>(postBySlugQuery, { slug });

  if (!post) {
    return { title: "Post Not Found", robots: { index: false, follow: false } };
  }

  const ogImageSource = post.ogImage || post.heroImage;
  const ogImageUrl = ogImageSource ? urlFor(ogImageSource).width(1200).height(630).url() : undefined;

  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    keywords: post.keywords,
    alternates: { canonical: post.canonicalUrl || `/blog/${post.slug}` },
    robots: post.noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      url: `https://carcheckervin.com/blog/${post.slug}`,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post._updatedAt,
      authors: post.author?.name ? [post.author.name] : undefined,
      tags: post.tags,
      images: ogImageUrl ? [{ url: ogImageUrl, width: 1200, height: 630 }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      images: ogImageUrl ? [ogImageUrl] : undefined,
    },
  };
}

const categoryColors: Record<string, string> = {
  indigo: "bg-indigo-50 text-indigo-700 border-indigo-100",
  emerald: "bg-emerald-50 text-emerald-700 border-emerald-100",
  amber: "bg-amber-50 text-amber-700 border-amber-100",
  rose: "bg-rose-50 text-rose-700 border-rose-100",
  violet: "bg-violet-50 text-violet-700 border-violet-100",
  cyan: "bg-cyan-50 text-cyan-700 border-cyan-100",
};

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await sanityClient.fetch<SanityPost>(postBySlugQuery, { slug });

  if (!post) notFound();

  const heroUrl = post.heroImage ? urlFor(post.heroImage).width(1600).quality(85).url() : null;
  const ogImageUrl = (post.ogImage || post.heroImage)
    ? urlFor(post.ogImage || post.heroImage!).width(1200).height(630).url()
    : undefined;
  const colorClass = categoryColors[post.category?.color || "indigo"] || categoryColors.indigo;

  const blogPostingLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.seoDescription || post.excerpt,
    image: ogImageUrl,
    datePublished: post.publishedAt,
    dateModified: post._updatedAt || post.publishedAt,
    author: post.author
      ? {
          "@type": "Person",
          name: post.author.name,
          url: post.author.social?.website,
        }
      : { "@type": "Organization", name: "CarCheckerVIN" },
    publisher: {
      "@type": "Organization",
      name: "CarCheckerVIN",
      logo: { "@type": "ImageObject", url: "https://carcheckervin.com/logo.svg" },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://carcheckervin.com/blog/${post.slug}`,
    },
    keywords: post.keywords?.join(", "),
    articleSection: post.category?.title,
    wordCount: post.wordCount,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingLd) }} />

      <article className="pt-28 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Blog", href: "/blog" },
              { label: post.title },
            ]}
          />

          {post.category && (
            <span
              className={`mt-6 inline-block text-xs font-bold uppercase tracking-wide px-2.5 py-1 rounded-full border ${colorClass}`}
            >
              {post.category.title}
            </span>
          )}

          <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="mt-4 text-lg text-slate-500 leading-relaxed">{post.excerpt}</p>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-slate-500 pb-6 border-b border-slate-200">
            {post.author && (
              <div className="flex items-center gap-2">
                {post.author.avatar && (
                  <Image
                    src={urlFor(post.author.avatar).width(80).height(80).url()}
                    alt={post.author.name}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                )}
                <span className="font-semibold text-slate-900">{post.author.name}</span>
                {post.author.role && <span className="text-xs text-slate-400">· {post.author.role}</span>}
              </div>
            )}
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {new Date(post.publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </span>
            {post.readMinutes ? (
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {post.readMinutes} min read
              </span>
            ) : null}
          </div>

          {heroUrl && (
            <div className="mt-8 relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-slate-100">
              <Image
                src={heroUrl}
                alt={post.heroImage?.alt || post.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 800px"
              />
            </div>
          )}

          <div className="mt-8">
            {post.body ? (
              <PortableTextRenderer value={post.body} />
            ) : (
              <p className="text-slate-500">No content yet.</p>
            )}
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="mt-12 pt-6 border-t border-slate-200 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2.5 py-1 bg-slate-100 text-slate-700 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {post.author?.bio && (
            <div className="mt-12 p-6 bg-slate-50 border border-slate-200 rounded-2xl">
              <div className="flex items-start gap-4">
                {post.author.avatar && (
                  <Image
                    src={urlFor(post.author.avatar).width(120).height(120).url()}
                    alt={post.author.name}
                    width={56}
                    height={56}
                    className="rounded-full"
                  />
                )}
                <div>
                  <p className="font-bold text-slate-900">{post.author.name}</p>
                  {post.author.role && <p className="text-xs text-slate-500">{post.author.role}</p>}
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">{post.author.bio}</p>
                </div>
              </div>
            </div>
          )}

          <div className="mt-12 p-6 bg-primary-50 rounded-2xl border border-primary-100">
            <h2 className="text-lg font-bold text-slate-900 mb-2">Run a free VIN check</h2>
            <p className="text-sm text-slate-600 mb-4">Decode any vehicle in under 60 seconds.</p>
            <VinSearchForm size="sm" />
          </div>

          {post.relatedPosts && post.relatedPosts.length > 0 && (
            <section className="mt-16">
              <h2 className="text-xl font-bold text-slate-900 mb-5">Related Posts</h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {post.relatedPosts.map((p) => {
                  const url = p.heroImage ? urlFor(p.heroImage).width(400).height(250).url() : null;
                  return (
                    <Link
                      key={p._id}
                      href={`/blog/${p.slug}`}
                      className="group block bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-md transition"
                    >
                      {url && (
                        <div className="relative aspect-[16/10] bg-slate-100">
                          <Image src={url} alt={p.heroImage?.alt || p.title} fill className="object-cover" sizes="300px" />
                        </div>
                      )}
                      <div className="p-4">
                        <p className="text-sm font-bold text-slate-900 group-hover:text-primary-700 line-clamp-2">{p.title}</p>
                        <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-primary-600">
                          Read <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          )}
        </div>
      </article>

      <section className="py-14 bg-slate-50">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Check Any VIN for Free</h2>
          <p className="text-slate-500 mb-6">Get instant vehicle history reports.</p>
          <VinSearchForm size="sm" />
        </div>
      </section>
    </>
  );
}
