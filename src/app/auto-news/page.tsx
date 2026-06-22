import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowRight, Newspaper, Rss } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";
import { sanityClient, urlFor } from "@/sanity/client";
import { autoNewsPostsQuery } from "@/sanity/queries";
import type { SanityPost } from "@/sanity/types";

const SITE = "https://www.carcheckervin.com";

/** Re-render at most once per hour; the cron publishes throughout the day. */
export const revalidate = 3600;

export const metadata: Metadata = {
  title: { absolute: "Auto News — Car Industry & Used-Car Buying Updates" },
  description:
    "Fresh automotive news rewritten for used-car buyers: new models, EVs, recalls, pricing, and reliability — with what each story means before you buy. Check any VIN in seconds.",
  keywords: [
    "auto news",
    "car news",
    "automotive news",
    "used car news",
    "car industry updates",
    "EV news",
    "car buying news",
  ],
  alternates: { canonical: "/auto-news" },
  openGraph: {
    title: "Auto News — Car Industry & Used-Car Buying Updates",
    description:
      "Fresh automotive news rewritten for used-car buyers, with what each story means before you buy.",
    url: `${SITE}/auto-news`,
    type: "website",
    siteName: "CarCheckerVIN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Auto News — Car Industry & Used-Car Buying Updates",
    description:
      "Fresh automotive news rewritten for used-car buyers, with what each story means before you buy.",
  },
  robots: { index: true, follow: true },
};

const categoryColors: Record<string, string> = {
  indigo: "bg-indigo-50 text-indigo-700 border-indigo-100",
  emerald: "bg-emerald-50 text-emerald-700 border-emerald-100",
  amber: "bg-amber-50 text-amber-700 border-amber-100",
  rose: "bg-rose-50 text-rose-700 border-rose-100",
  violet: "bg-violet-50 text-violet-700 border-violet-100",
  cyan: "bg-cyan-50 text-cyan-700 border-cyan-100",
};

export default async function AutoNewsPage() {
  // Resilient fetch: if Sanity is unreachable or quota-limited, render the
  // page with an empty post list instead of throwing a 500.
  let posts: SanityPost[] = [];
  try {
    posts = (await sanityClient.fetch<SanityPost[]>(autoNewsPostsQuery)) ?? [];
  } catch {
    posts = [];
  }

  const collectionLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Auto News",
    url: `${SITE}/auto-news`,
    description:
      "Fresh automotive news rewritten for used-car buyers, with what each story means before you buy.",
    publisher: {
      "@type": "Organization",
      name: "CarCheckerVIN",
      url: SITE,
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: posts.slice(0, 20).map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${SITE}/blog/${p.slug}`,
        name: p.title,
      })),
    },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Auto News", item: `${SITE}/auto-news` },
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
      <article className="pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Auto News" }]} />

          {/* Hero */}
          <div className="mt-6 grid lg:grid-cols-[1.3fr_1fr] gap-10 items-start">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide px-2.5 py-1 rounded-full border bg-cyan-50 text-cyan-700 border-cyan-100">
                <Newspaper className="w-3.5 h-3.5" /> Auto News
              </span>
              <h1 className="mt-4 text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">
                Car News for People About to Buy
              </h1>
              <p className="mt-4 text-lg text-slate-700 leading-relaxed">
                The automotive headlines that actually matter when you&apos;re shopping
                used — new models, EVs, recalls, pricing, and reliability — each story
                ending with what it means before you sign. Then run the VIN.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-base font-bold text-slate-900">
                Checking a specific car?
              </h2>
              <p className="mt-1.5 text-sm text-slate-700">
                Decode the VIN for title brands, accidents, mileage, and open recalls.
              </p>
              <div className="mt-4">
                <VinSearchForm />
              </div>
            </div>
          </div>

          {/* Feed */}
          {posts.length === 0 ? (
            <div className="mt-12 text-center py-20 bg-slate-50 rounded-2xl border border-slate-200">
              <Rss className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <h2 className="text-lg font-bold text-slate-900">No stories yet</h2>
              <p className="text-sm text-slate-700 mt-2 max-w-md mx-auto">
                Fresh auto news is published automatically throughout the day. Check
                back shortly — new articles appear here as they go live.
              </p>
              <Link
                href="/car-news"
                className="inline-block mt-6 px-5 py-2.5 bg-primary-600 text-white text-sm font-bold rounded-xl hover:bg-primary-700"
              >
                See the latest recalls →
              </Link>
            </div>
          ) : (
            <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => {
                const heroUrl = post.heroImage
                  ? urlFor(post.heroImage).width(800).height(500).quality(80).url()
                  : null;
                const colorClass =
                  categoryColors[post.category?.color || "cyan"] || categoryColors.cyan;

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
                      <span
                        className={`inline-block self-start text-xs font-bold uppercase tracking-wide px-2.5 py-1 rounded-full border ${colorClass} mb-3`}
                      >
                        {post.category?.title || "Auto News"}
                      </span>
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

          <div className="mt-16">
            <RelatedChecks />
          </div>
        </div>
      </article>
    </>
  );
}
