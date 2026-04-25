import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { User, ArrowRight } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import { sanityClient, urlFor } from "@/sanity/client";
import { allAuthorsQuery } from "@/sanity/queries";
import type { SanityAuthor } from "@/sanity/types";

export const revalidate = 60;

interface AuthorWithCount extends SanityAuthor {
  postCount?: number;
}

export const metadata: Metadata = {
  title: "Our Editorial Team | CarCheckerVIN",
  description:
    "Meet the CarCheckerVIN editorial team — automotive researchers, journalists, and industry experts producing trusted VIN, buying, and ownership guidance.",
  alternates: { canonical: "/author" },
  openGraph: {
    title: "Our Editorial Team | CarCheckerVIN",
    description:
      "Meet the CarCheckerVIN editorial team — automotive researchers and industry experts.",
    url: "https://carcheckervin.com/author",
    type: "website",
  },
};

export default async function AuthorIndexPage() {
  const authors = await sanityClient.fetch<AuthorWithCount[]>(allAuthorsQuery);

  const collectionLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "CarCheckerVIN Editorial Team",
    url: "https://carcheckervin.com/author",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: authors
        .filter((a) => !!a.slug)
        .map((a, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: `https://carcheckervin.com/author/${a.slug}`,
          name: a.name,
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
              { label: "Authors" },
            ]}
          />

          <div className="mt-6 max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">
              Our Editorial Team
            </h1>
            <p className="mt-4 text-lg text-slate-500 leading-relaxed">
              Meet the writers, researchers, and automotive experts behind CarCheckerVIN. Every
              article is reviewed for accuracy against NMVTIS, NICB, and manufacturer data.
            </p>
          </div>

          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {authors.map((author) => {
              const avatarUrl = author.avatar
                ? urlFor(author.avatar).width(160).height(160).url()
                : null;
              const href = author.slug ? `/author/${author.slug}` : "#";

              const Wrapper = author.slug
                ? ({ children }: { children: React.ReactNode }) => (
                    <Link
                      href={href}
                      className="group flex flex-col bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md hover:border-slate-300 transition"
                    >
                      {children}
                    </Link>
                  )
                : ({ children }: { children: React.ReactNode }) => (
                    <div className="flex flex-col bg-white border border-slate-200 rounded-2xl p-6">
                      {children}
                    </div>
                  );

              return (
                <Wrapper key={author._id}>
                  <div className="flex items-center gap-4">
                    {avatarUrl ? (
                      <Image
                        src={avatarUrl}
                        alt={author.name}
                        width={72}
                        height={72}
                        className="rounded-full flex-shrink-0"
                      />
                    ) : (
                      <div className="w-[72px] h-[72px] rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
                        <User className="w-8 h-8 text-slate-400" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h2 className="text-lg font-bold text-slate-900 group-hover:text-primary-700 transition truncate">
                        {author.name}
                      </h2>
                      {author.role && (
                        <p className="text-xs font-semibold text-slate-500 mt-0.5">
                          {author.role}
                        </p>
                      )}
                      <p className="text-xs text-slate-500 mt-1">
                        {author.postCount ?? 0}{" "}
                        {author.postCount === 1 ? "article" : "articles"}
                      </p>
                    </div>
                  </div>
                  {author.bio && (
                    <p className="mt-4 text-sm text-slate-500 leading-relaxed line-clamp-3">
                      {author.bio}
                    </p>
                  )}
                  {author.slug && (
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary-600 group-hover:gap-2 transition-all">
                      View profile <ArrowRight className="w-4 h-4" />
                    </span>
                  )}
                </Wrapper>
              );
            })}
          </div>
        </div>
      </article>
    </>
  );
}
