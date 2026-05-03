import type { Metadata } from "next";
import Link from "next/link";
import { FolderOpen, ArrowRight } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import { sanityClient } from "@/sanity/client";
import { allCategoriesQuery } from "@/sanity/queries";
import type { SanityCategory } from "@/sanity/types";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Blog Categories — All Topics",
  description:
    "Browse all CarCheckerVIN blog categories — from buying guides and vehicle safety to VIN education, market insights, and ownership tips.",
  alternates: { canonical: "/blog/category" },
  openGraph: {
    title: "Blog Categories — All Topics",
    description:
      "Browse all CarCheckerVIN blog categories — buying guides, VIN education, vehicle safety, and more.",
    url: "https://www.carcheckervin.com/blog/category",
    type: "website",
  },
};

const categoryColors: Record<string, string> = {
  indigo: "bg-indigo-50 text-indigo-700 border-indigo-100",
  emerald: "bg-emerald-50 text-emerald-700 border-emerald-100",
  amber: "bg-amber-50 text-amber-700 border-amber-100",
  rose: "bg-rose-50 text-rose-700 border-rose-100",
  violet: "bg-violet-50 text-violet-700 border-violet-100",
  cyan: "bg-cyan-50 text-cyan-700 border-cyan-100",
};

export default async function BlogCategoryIndexPage() {
  const categories = await sanityClient.fetch<SanityCategory[]>(allCategoriesQuery);

  const collectionLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Blog Categories — CarCheckerVIN",
    url: "https://www.carcheckervin.com/blog/category",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: categories.map((c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `https://www.carcheckervin.com/blog/category/${c.slug}`,
        name: c.title,
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
              { label: "Categories" },
            ]}
          />

          <div className="mt-6 max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">
              Blog Categories
            </h1>
            <p className="mt-4 text-lg text-slate-700 leading-relaxed">
              Explore CarCheckerVIN articles by topic. From buying guides and VIN education to
              vehicle safety, market insights, and ownership advice.
            </p>
          </div>

          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => {
              const colorClass =
                categoryColors[category.color || "indigo"] || categoryColors.indigo;
              return (
                <Link
                  key={category._id}
                  href={`/blog/category/${category.slug}`}
                  className="group flex flex-col bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md hover:border-slate-300 transition"
                >
                  <div className="flex items-center justify-between mb-4">
                    <FolderOpen className="w-7 h-7 text-primary-600" />
                    <span
                      className={`text-xs font-bold uppercase tracking-wide px-2.5 py-1 rounded-full border ${colorClass}`}
                    >
                      {category.postCount ?? 0} {category.postCount === 1 ? "post" : "posts"}
                    </span>
                  </div>
                  <h2 className="text-lg font-bold text-slate-900 group-hover:text-primary-700 transition">
                    {category.title}
                  </h2>
                  {category.description && (
                    <p className="mt-2 text-sm text-slate-700 leading-relaxed line-clamp-3">
                      {category.description}
                    </p>
                  )}
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary-600 group-hover:gap-2 transition-all">
                    Browse {category.title} <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </article>
    </>
  );
}
