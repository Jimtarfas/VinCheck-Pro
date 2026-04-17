import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import { blogPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title:
    "VIN Check Blog — Car Buying & Vehicle History Insights | CarCheckerVIN",
  description:
    "Expert insights, buying guides, and vehicle safety advice from the CarCheckerVIN editorial team. Learn how to use VIN checks, spot bad cars, and shop smart.",
  keywords: [
    "VIN check blog",
    "car buying blog",
    "used car advice",
    "vehicle history insights",
    "VIN decoder articles",
    "car safety guides",
    "auto buying tips",
    "CarCheckerVIN blog",
  ],
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "VIN Check Blog — Car Buying & Vehicle History Insights",
    description:
      "Buying guides, vehicle safety advice, and market insights from the CarCheckerVIN editorial team.",
    url: "https://carcheckervin.com/blog",
    type: "website",
  },
};

const formatDate = (iso: string) =>
  new Date(iso + "T00:00:00Z").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });

export default function BlogIndexPage() {
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "CarCheckerVIN Blog",
    url: "https://carcheckervin.com/blog",
    description:
      "Buying guides, vehicle safety advice, and market insights from the CarCheckerVIN editorial team.",
    publisher: {
      "@type": "Organization",
      name: "CarCheckerVIN",
      url: "https://carcheckervin.com",
    },
    blogPost: blogPosts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      url: `https://carcheckervin.com/blog/${post.slug}`,
      datePublished: post.date,
      dateModified: post.date,
      image: post.heroImage,
      author: {
        "@type": "Organization",
        name: post.author,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />

      <article className="pt-28 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: "Blog" }]}
          />

          <header className="mt-6 max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">
              The CarCheckerVIN Blog
            </h1>
            <p className="mt-4 text-lg text-slate-500 leading-relaxed">
              Practical buying guides, vehicle safety deep dives, and honest
              market insights from the CarCheckerVIN editorial team. Everything
              we publish is written to help you make a smarter decision the
              next time you buy, sell, or research a vehicle.
            </p>
          </header>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:border-primary-200 transition-all"
              >
                <div className="relative w-full aspect-[16/9] bg-slate-100 overflow-hidden">
                  <Image
                    src={post.heroImage}
                    alt={post.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="flex flex-col flex-1 p-6">
                  <span className="inline-flex self-start items-center rounded-full bg-primary-50 text-primary-700 text-xs font-semibold px-2.5 py-1 mb-3">
                    {post.category}
                  </span>
                  <h2 className="text-lg font-bold text-slate-900 leading-snug group-hover:text-primary-700 transition-colors">
                    {post.title}
                  </h2>
                  <p className="mt-2 text-sm text-slate-500 leading-relaxed flex-1">
                    {post.excerpt}
                  </p>
                  <div className="mt-4 flex items-center gap-4 text-xs text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDate(post.date)}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readMinutes} min read
                    </span>
                  </div>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 group-hover:gap-2 transition-all">
                    Read more <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </article>
    </>
  );
}
