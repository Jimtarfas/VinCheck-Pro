import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Calendar, Clock, User, Tag, ArrowRight } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import { blogPosts, getPostBySlug, type BlogSection } from "@/lib/blog";

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found | CarCheckerVIN",
      description: "The requested blog post could not be found.",
    };
  }

  return {
    title: post.metaTitle,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://carcheckervin.com/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.date,
      authors: [post.author],
      images: [
        {
          url: post.heroImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
  };
}

const formatDate = (iso: string) =>
  new Date(iso + "T00:00:00Z").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });

function renderSection(section: BlogSection, index: number) {
  switch (section.type) {
    case "h2":
      return (
        <h2
          key={index}
          className="mt-12 text-2xl font-bold text-slate-900 scroll-mt-28"
        >
          {section.text}
        </h2>
      );
    case "h3":
      return (
        <h3
          key={index}
          className="mt-8 text-xl font-semibold text-slate-900 scroll-mt-28"
        >
          {section.text}
        </h3>
      );
    case "p":
      return (
        <p key={index} className="mt-4 text-slate-600 leading-relaxed">
          {section.text}
        </p>
      );
    case "list":
      return (
        <ul key={index} className="mt-4 space-y-2 text-slate-600">
          {section.items.map((item, i) => (
            <li key={i} className="flex gap-2 items-start">
              <span className="mt-2 inline-block w-1.5 h-1.5 rounded-full bg-primary-500 flex-shrink-0" />
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <blockquote
          key={index}
          className="mt-6 border-l-4 border-primary-400 pl-5 py-2 text-slate-700 italic"
        >
          <p className="leading-relaxed">&ldquo;{section.text}&rdquo;</p>
          {section.author && (
            <footer className="mt-2 text-sm text-slate-500 not-italic">
              &mdash; {section.author}
            </footer>
          )}
        </blockquote>
      );
    case "callout":
      return (
        <aside
          key={index}
          className="mt-6 p-5 bg-primary-50 border border-primary-100 rounded-2xl"
        >
          <p className="text-sm font-semibold text-primary-800">
            {section.title}
          </p>
          <p className="mt-2 text-slate-700 leading-relaxed">{section.text}</p>
        </aside>
      );
    default:
      return null;
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const midpoint = Math.floor(post.content.length / 2);
  const firstHalf = post.content.slice(0, midpoint);
  const secondHalf = post.content.slice(midpoint);

  const relatedPosts = blogPosts
    .filter((p) => p.slug !== post.slug)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: [post.heroImage],
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Organization",
      name: post.author,
      url: "https://carcheckervin.com",
    },
    publisher: {
      "@type": "Organization",
      name: "CarCheckerVIN",
      url: "https://carcheckervin.com",
      logo: {
        "@type": "ImageObject",
        url: "https://carcheckervin.com/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://carcheckervin.com/blog/${post.slug}`,
    },
    keywords: post.keywords.join(", "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />

      <article className="pt-28 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Blog", href: "/blog" },
              { label: post.title },
            ]}
          />

          <div className="mt-6 relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-slate-100">
            <Image
              src={post.heroImage}
              alt={post.title}
              fill
              priority
              sizes="(min-width: 1024px) 768px, 100vw"
              className="object-cover"
            />
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-50 text-primary-700 font-semibold px-3 py-1">
              <Tag className="w-3.5 h-3.5" />
              {post.category}
            </span>
            <span className="inline-flex items-center gap-1.5 text-slate-500">
              <Calendar className="w-4 h-4" />
              {formatDate(post.date)}
            </span>
            <span className="inline-flex items-center gap-1.5 text-slate-500">
              <Clock className="w-4 h-4" />
              {post.readMinutes} min read
            </span>
          </div>

          <h1 className="mt-4 text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">
            {post.title}
          </h1>

          <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
            <User className="w-4 h-4" />
            <span>
              By <span className="font-medium text-slate-700">{post.author}</span>
            </span>
          </div>

          <p className="mt-6 text-lg text-slate-500 leading-relaxed">
            {post.excerpt}
          </p>

          <div className="mt-2">
            {firstHalf.map((section, i) => renderSection(section, i))}
          </div>

          {/* Mid-article CTA */}
          <div className="mt-12 p-6 bg-primary-50 rounded-2xl border border-primary-100">
            <h2 className="text-lg font-bold text-slate-900 mb-2">
              Run a VIN Check Right Now
            </h2>
            <p className="text-sm text-slate-600 mb-4">
              Decode any 17-character VIN to instantly verify a vehicle&rsquo;s
              build, history, and key specifications.
            </p>
            <VinSearchForm size="sm" />
          </div>

          <div className="mt-2">
            {secondHalf.map((section, i) =>
              renderSection(section, i + firstHalf.length)
            )}
          </div>
        </div>
      </article>

      {/* End-of-article CTA */}
      <section className="py-14 bg-slate-50">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Check Any VIN for Free
          </h2>
          <p className="text-slate-500 mb-6">
            Enter a 17-character VIN to get a free vehicle report instantly.
          </p>
          <VinSearchForm size="sm" />
        </div>
      </section>

      {/* Related posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">
              Related Posts
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.map((related) => (
                <Link
                  key={related.slug}
                  href={`/blog/${related.slug}`}
                  className="group flex flex-col bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:border-primary-200 transition-all"
                >
                  <div className="relative w-full aspect-[16/9] bg-slate-100 overflow-hidden">
                    <Image
                      src={related.heroImage}
                      alt={related.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex flex-col flex-1 p-6">
                    <span className="inline-flex self-start items-center rounded-full bg-primary-50 text-primary-700 text-xs font-semibold px-2.5 py-1 mb-3">
                      {related.category}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 leading-snug group-hover:text-primary-700 transition-colors">
                      {related.title}
                    </h3>
                    <p className="mt-2 text-sm text-slate-500 leading-relaxed flex-1">
                      {related.excerpt}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 group-hover:gap-2 transition-all">
                      Read more <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
