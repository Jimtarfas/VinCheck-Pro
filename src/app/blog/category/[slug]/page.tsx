import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Calendar, Clock, ArrowRight, FileText, FolderOpen } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import { sanityClient, urlFor } from "@/sanity/client";
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
      url: `https://carcheckervin.com/blog/category/${category.slug}`,
      type: "website",
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
    url: `https://carcheckervin.com/blog/category/${category.slug}`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: posts.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `https://carcheckervin.com/blog/${p.slug}`,
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
      <article className="pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Blog", href: "/blog" },
              { label: category.title },
            ]}
          />

          <div className="mt-6 max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-4">
              <FolderOpen className="w-5 h-5 text-primary-600" />
              <span className="text-xs font-bold uppercase tracking-wide text-primary-600">
                Category
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">
              {category.title}
            </h1>
            {category.description && (
              <p className="mt-4 text-lg text-slate-700 leading-relaxed">
                {category.description}
              </p>
            )}
          </div>

          {posts.length === 0 ? (
            <div className="mt-12 text-center py-20 bg-slate-50 rounded-2xl border border-slate-200">
              <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <h2 className="text-lg font-bold text-slate-900">No posts in this category yet</h2>
              <p className="text-sm text-slate-700 mt-2">Check back soon for new articles.</p>
              <Link
                href="/blog"
                className="inline-block mt-6 px-5 py-2.5 bg-primary-600 text-white text-sm font-bold rounded-xl hover:bg-primary-700"
              >
                Browse all posts →
              </Link>
            </div>
          ) : (
            <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => {
                const heroUrl = post.heroImage
                  ? urlFor(post.heroImage).width(800).height(500).quality(80).url()
                  : null;
                const colorClass =
                  categoryColors[post.category?.color || "indigo"] || categoryColors.indigo;

                return (
                  <Link
                    key={post._id}
                    href={`/blog/${post.slug}`}
                    className="group flex flex-col bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-md hover:border-slate-300 transition"
                  >
                    {heroUrl && (
                      <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
                        <Image
                          src={heroUrl}
                          alt={post.heroImage?.alt || post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>
                    )}
                    <div className="flex-1 p-5 flex flex-col">
                      {post.category && (
                        <span
                          className={`inline-block self-start text-xs font-bold uppercase tracking-wide px-2.5 py-1 rounded-full border ${colorClass} mb-3`}
                        >
                          {post.category.title}
                        </span>
                      )}
                      <h2 className="text-lg font-bold text-slate-900 leading-snug group-hover:text-primary-700 transition">
                        {post.title}
                      </h2>
                      {post.excerpt && (
                        <p className="mt-2 text-sm text-slate-700 leading-relaxed line-clamp-3">
                          {post.excerpt}
                        </p>
                      )}
                      <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-700">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(post.publishedAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                        {post.readMinutes ? (
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {post.readMinutes} min read
                          </span>
                        ) : null}
                      </div>
                      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary-600 group-hover:gap-2 transition-all">
                        Read more <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </article>
    </>
  );
}
