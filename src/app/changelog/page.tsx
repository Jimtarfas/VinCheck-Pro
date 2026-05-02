import type { Metadata } from "next";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Product Changelog — What's New at CarCheckerVIN",
  description:
    "A reverse-chronological log of every meaningful CarCheckerVIN product release, from launch through the latest data, content, and platform updates.",
  keywords: [
    "carcheckervin changelog",
    "vin check updates",
    "product release notes",
    "carcheckervin new features",
  ],
  alternates: { canonical: "/changelog" },
  openGraph: {
    title: "Product Changelog — CarCheckerVIN",
    description:
      "Track every CarCheckerVIN release: new data sources, landing pages, integrations, and product features.",
    url: "https://carcheckervin.com/changelog",
    type: "article",
  },
};

const changelogSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Product Changelog — CarCheckerVIN",
  url: "https://carcheckervin.com/changelog",
  description:
    "Public release notes for CarCheckerVIN, covering data, content, platform, and product changes since launch.",
  inLanguage: "en-US",
  isPartOf: {
    "@type": "WebSite",
    name: "CarCheckerVIN",
    url: "https://carcheckervin.com",
  },
};

type Entry = {
  date: string;
  title: string;
  body: string;
};

const entries: Entry[] = [
  {
    date: "April 2026",
    title: "50 state-specific VIN check landing pages",
    body: "Launched dedicated VIN check pages for every U.S. state with localized title-brand law summaries, DMV links, and state-by-state data coverage notes. Each state page is hand-written and reviewed by our research team for accuracy.",
  },
  {
    date: "April 2026",
    title: "Comprehensive editorial blog with 100+ articles",
    body: "Rolled out a long-form blog covering buyer education, title fraud, financing, recall guidance, and brand-specific buying tips. Every post is written or reviewed by an in-house subject-matter expert and refreshed quarterly.",
  },
  {
    date: "March 2026",
    title: "Sanity CMS integration for editorial content",
    body: "Migrated our blog and guides to a Sanity-backed content pipeline so editors can ship updates without a code release. The new workflow cut average time-to-publish from two days to under an hour and added structured data automatically.",
  },
  {
    date: "February 2026",
    title: "Internal admin dashboard launched",
    body: "Released the internal admin dashboard for monitoring lookups, refund requests, and customer accounts. The new tool gives our support team real-time visibility into data-source health and lets us resolve escalations in minutes instead of hours.",
  },
  {
    date: "January 2026",
    title: "Supabase authentication with Google OAuth",
    body: "Replaced our legacy session system with Supabase-backed authentication and Google single sign-on. Customers can now create an account and access their report library in a single click, with bcrypt-hashed credentials and modern session security.",
  },
  {
    date: "December 2025",
    title: "Comparison page versus Carfax launched",
    body: "Published a side-by-side comparison page covering data sources, pricing, refund policy, and report depth versus Carfax. The page includes neutral source citations and a downloadable feature matrix to help buyers make an informed choice.",
  },
  {
    date: "November 2025",
    title: "33 brand-specific landing pages",
    body: "Added dedicated VIN check landing pages for the 33 most-searched vehicle brands in the United States, each with brand-specific decode guidance, common recall summaries, and known title-brand patterns researched by our analyst team.",
  },
  {
    date: "October 2025",
    title: "Initial product launch",
    body: "CarCheckerVIN went live with free VIN decode, paid history reports starting at $7.99, NMVTIS and NICB integration, NHTSA recall lookups, and a 30-day money-back guarantee. Thank you to the early customers who shaped the first release.",
  },
];

export default function ChangelogPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(changelogSchema) }}
      />

      <section className="bg-gradient-to-br from-primary-600 to-primary-700 text-white pt-28 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-5 [&_a]:text-primary-100 [&_a:hover]:text-white [&_span]:text-white [&_li_span]:text-primary-200">
            <Breadcrumbs onDark items={[{ label: "Home", href: "/" }, { label: "Changelog" }]} />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold">Product Changelog</h1>
          <p className="mt-5 text-lg text-primary-100 max-w-2xl leading-relaxed">
            A public log of every meaningful CarCheckerVIN release. We believe transparency is part
            of the product, so we publish what we ship and when, in plain English.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-lg text-slate-600 leading-relaxed">
            New entries are added at the top. We track product features, data-source updates,
            content launches, and platform improvements. For day-to-day editorial updates, see our{" "}
            <Link href="/blog" className="text-primary-600 hover:underline font-medium">
              blog
            </Link>
            . For details on how we source and protect data, see our{" "}
            <Link href="/trust" className="text-primary-600 hover:underline font-medium">
              Trust & Security
            </Link>{" "}
            page.
          </p>

          <ol className="mt-10 space-y-8">
            {entries.map((entry) => (
              <li
                key={`${entry.date}-${entry.title}`}
                className="p-6 bg-white rounded-2xl border border-slate-200"
              >
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-primary-600 mt-1 flex-shrink-0" />
                  <div>
                    <div className="text-sm font-semibold text-primary-600 uppercase tracking-wide">
                      {entry.date}
                    </div>
                    <h2 className="mt-1 text-xl font-bold text-slate-900">{entry.title}</h2>
                    <p className="mt-3 text-slate-600 leading-relaxed">{entry.body}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-12 p-6 bg-primary-50 rounded-2xl border border-primary-100 text-center">
            <p className="text-slate-700 leading-relaxed">
              Want to be the first to know what we ship next?{" "}
              <Link
                href="/blog"
                className="text-primary-600 hover:underline font-medium"
              >
                Subscribe to our blog for product updates
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
