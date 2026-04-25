import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Calendar, Clock, ArrowRight, User, FileText } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
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
  const authors = await sanityClient.fetch<SanityAuthor[]>(allAuthorsQuery);
  return authors
    .filter((a) => !!a.slug)
    .map((a) => ({ slug: a.slug as string }));
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
      url: `https://carcheckervin.com/author/${author.slug}`,
      type: "profile",
      images: ogImageUrl ? [{ url: ogImageUrl, width: 1200, height: 630 }] : undefined,
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
    url: `https://carcheckervin.com/author/${author.slug}`,
    image: author.avatar ? urlFor(author.avatar).width(400).height(400).url() : undefined,
    sameAs: sameAs.length > 0 ? sameAs : undefined,
    worksFor: {
      "@type": "Organization",
      name: "CarCheckerVIN",
      url: "https://carcheckervin.com",
    },
  };

  const avatarUrl = author.avatar ? urlFor(author.avatar).width(240).height(240).url() : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
      />
      <article className="pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Authors", href: "/author" },
              { label: author.name },
            ]}
          />

          <div className="mt-8 flex flex-col sm:flex-row gap-6 items-start p-6 sm:p-8 bg-slate-50 border border-slate-200 rounded-2xl">
            {avatarUrl ? (
              <Image
                src={avatarUrl}
                alt={author.name}
                width={120}
                height={120}
                className="rounded-full flex-shrink-0"
              />
            ) : (
              <div className="w-[120px] h-[120px] rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0">
                <User className="w-12 h-12 text-slate-400" />
              </div>
            )}
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 mb-2">
                <User className="w-4 h-4 text-primary-600" />
                <span className="text-xs font-bold uppercase tracking-wide text-primary-600">
                  Author
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
                {author.name}
              </h1>
              {author.role && (
                <p className="mt-1 text-sm font-semibold text-slate-500">{author.role}</p>
              )}
              {author.bio && (
                <p className="mt-4 text-base text-slate-600 leading-relaxed">{author.bio}</p>
              )}
              {sameAs.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-3 text-sm">
                  {author.social?.website && (
                    <a
                      href={author.social.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 font-semibold hover:underline"
                    >
                      Website
                    </a>
                  )}
                  {author.social?.twitter && (
                    <a
                      href={author.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 font-semibold hover:underline"
                    >
                      Twitter
                    </a>
                  )}
                  {author.social?.linkedin && (
                    <a
                      href={author.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 font-semibold hover:underline"
                    >
                      LinkedIn
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>

          <section className="mt-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              Articles by {author.name}
            </h2>

            {posts.length === 0 ? (
              <div className="text-center py-16 bg-slate-50 rounded-2xl border border-slate-200">
                <FileText className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                <p className="text-sm text-slate-500">No articles published yet.</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                        <h3 className="text-lg font-bold text-slate-900 leading-snug group-hover:text-primary-700 transition">
                          {post.title}
                        </h3>
                        {post.excerpt && (
                          <p className="mt-2 text-sm text-slate-500 leading-relaxed line-clamp-3">
                            {post.excerpt}
                          </p>
                        )}
                        <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
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
          </section>
        </div>
      </article>
    </>
  );
}
