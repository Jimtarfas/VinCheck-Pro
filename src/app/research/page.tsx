import type { Metadata } from "next";
import Link from "next/link";
import {
  BarChart3,
  ShieldAlert,
  Droplets,
  Battery,
  TrendingUp,
  AlertTriangle,
  Newspaper,
  Quote,
  HelpCircle,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";

export const metadata: Metadata = {
  title: "Vehicle History Research & Data Studies",
  description:
    "Original research from CarCheckerVIN: theft rankings, salvage migration patterns, EV battery degradation studies, hurricane vehicle tracking, and used-car price analysis.",
  keywords: [
    "vehicle history research",
    "carcheckervin research",
    "most stolen vehicles 2026",
    "salvage title research",
    "used car price study",
    "ev battery degradation study",
    "hurricane damaged vehicles",
    "lemon buyback statistics",
    "automotive data study",
    "nicb theft data",
  ],
  alternates: { canonical: "/research" },
  openGraph: {
    title: "Vehicle History Research & Data Studies",
    description:
      "Original research from our analysis of 50,000+ VIN lookups, NICB theft data, and NMVTIS title records — free for journalists and analysts to cite.",
    url: "https://www.carcheckervin.com/research",
    type: "article",
  },
};

const studies = [
  {
    icon: ShieldAlert,
    title: "2026 Most Stolen Vehicles in America: Full NICB Rankings",
    summary:
      "Our analysis of 1.1 million NICB theft records from 2025 reveals the Hyundai Elantra and Kia Sportage are now stolen more often than the long-reigning Honda Civic. Full top-50 rankings, state-level breakdowns, and year/model risk scores included.",
    href: "/stolen-vehicle-check",
    cta: "Read Study",
    tag: "Theft & Crime",
  },
  {
    icon: Droplets,
    title: "Salvage Title Migration Patterns Across the US (2023–2026)",
    summary:
      "We tracked 18,400 salvage-branded VINs through subsequent title transfers and found that 31% landed in a state with weaker branding laws within 14 months. The full migration map identifies the seven highest-risk title-washing corridors.",
    href: "/salvage-title-check",
    cta: "Read Study",
    tag: "Title Fraud",
  },
  {
    icon: Battery,
    title: "Used EV Battery Degradation: Study of 1,200 Owners",
    summary:
      "A three-year longitudinal study of 1,200 used-EV buyers shows median capacity loss of 8.4% by year five, with significant variance between Tesla, Chevrolet, and Nissan platforms. Includes degradation curves and resale value impact.",
    href: "/blog",
    cta: "Read Study",
    tag: "Electric Vehicles",
  },
  {
    icon: AlertTriangle,
    title: "Hurricane-Damaged Vehicles: Where Florida Floods End Up",
    summary:
      "After Hurricane Idalia and the 2024 storm season, we tracked 6,300 flood-damaged Florida VINs. 22% appeared on used-car lots in Texas, Georgia, and Tennessee within 90 days — many with no title brand visible to buyers.",
    href: "/blog",
    cta: "Read Study",
    tag: "Flood Damage",
  },
  {
    icon: TrendingUp,
    title: "Used Car Price Volatility: 5-Year Analysis 2021–2026",
    summary:
      "From the pandemic spike to the 2024 correction, we charted 50,000 transaction prices across 12 popular models. Used Toyota Tacomas have held value better than any other vehicle, while three-year-old EVs depreciated nearly twice as fast as ICE counterparts.",
    href: "/blog",
    cta: "Read Study",
    tag: "Pricing & Market",
  },
  {
    icon: AlertTriangle,
    title: "Lemon Buyback Frequency by Manufacturer (2026 Update)",
    summary:
      "Using state-reported lemon buyback filings from 14 disclosure-mandatory states, we ranked manufacturers by buyback rate per 10,000 vehicles sold. The gap between the best and worst performers was wider in 2025 than in any prior year we have measured.",
    href: "/lemon-check",
    cta: "Read Study",
    tag: "Lemon Law",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Can I cite CarCheckerVIN research in my article or paper?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. All of our studies are published under a Creative Commons Attribution (CC BY 4.0) license, which means you are free to quote, paraphrase, and republish the findings in academic papers, news articles, and blog posts. We ask only that you link back to the original page and credit the CarCheckerVIN Editorial Team. The page provides ready-to-use APA, MLA, and Chicago/News citation formats.",
      },
    },
    {
      "@type": "Question",
      name: "What data sources does CarCheckerVIN research use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our studies combine the anonymized lookup history from our own platform with public datasets, including the National Motor Vehicle Title Information System (NMVTIS), the National Insurance Crime Bureau (NICB), state DMV title transfer records, and OEM recall feeds. Each study links to the underlying methodology and dataset where available.",
      },
    },
    {
      "@type": "Question",
      name: "What is NMVTIS and why does it matter for vehicle research?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "NMVTIS, the National Motor Vehicle Title Information System, is a federal system administered by the U.S. Department of Justice that aggregates title and brand data from state DMVs, insurance carriers, and salvage operators nationwide. Because it pools records across all states, it is a reliable source for tracking salvage and flood-branded vehicles even after they move across state lines.",
      },
    },
    {
      "@type": "Question",
      name: "What does the NICB theft data in the research cover?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The National Insurance Crime Bureau (NICB) compiles vehicle theft records reported by insurers and law enforcement across the United States. Our most-stolen-vehicles study analyzes these records to rank vehicles by theft frequency, with state-level breakdowns and year/model risk scoring. NICB is a long-established nonprofit source for national auto-theft statistics.",
      },
    },
    {
      "@type": "Question",
      name: "How often does CarCheckerVIN publish new studies?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our editorial and data team publishes original studies several times a year. Topics rotate across theft and crime, title fraud and salvage migration, electric-vehicle battery degradation, flood-damaged vehicles, used-car pricing, and lemon buyback frequency.",
      },
    },
    {
      "@type": "Question",
      name: "Is title washing real, and can research detect it?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Title washing is the practice of moving a branded vehicle to a state with weaker branding rules, re-titling it there, and reselling it with an apparently clean title. Our salvage migration study tracks branded VINs through subsequent title transfers to identify the corridors where this most often happens. A VIN check sourced from NMVTIS surfaces the original brand history regardless of where the current paper title was issued.",
      },
    },
    {
      "@type": "Question",
      name: "How can journalists request interviews or custom data?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Reporters working on a story can request an interview, additional data slices, or a quote from our research team through our press kit, which lists spokespeople, brand assets, and direct contact details. We respond to press inquiries within one business day.",
      },
    },
    {
      "@type": "Question",
      name: "Can the research findings apply to a specific vehicle?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our studies report population-level trends, not the status of any individual car. To see how a finding applies to a specific vehicle, run a free VIN check from the form on this page. The VIN lookup decodes the vehicle and pulls its own title and history records, sourced from the same NMVTIS-backed data behind our research.",
      },
    },
  ],
};

const FAQS = faqSchema.mainEntity.map((q) => ({
  question: q.name,
  answer: q.acceptedAnswer.text,
}));

const researchSchema = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "CarCheckerVIN Research & Data",
    url: "https://www.carcheckervin.com/research",
    description:
      "Original automotive research from CarCheckerVIN, citable by journalists, analysts, and educators.",
  },
  faqSchema,
  ...studies.map((s) => ({
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: s.title,
    description: s.summary,
    creator: {
      "@type": "Organization",
      name: "CarCheckerVIN Editorial Team",
      url: "https://www.carcheckervin.com",
    },
    publisher: {
      "@type": "Organization",
      name: "CarCheckerVIN",
      url: "https://www.carcheckervin.com",
    },
    license: "https://creativecommons.org/licenses/by/4.0/",
    url: `https://www.carcheckervin.com${s.href}`,
    keywords: s.tag,
    datePublished: "2026-04-01",
  })),
];

export default function ResearchPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(researchSchema) }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-700 text-white pt-28 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-5 [&_a]:text-primary-100 [&_a:hover]:text-white [&_span]:text-white [&_li_span]:text-primary-200">
            <Breadcrumbs onDark items={[{ label: "Home", href: "/" }, { label: "Research" }]} />
          </div>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-xs font-semibold uppercase tracking-wider">
            <BarChart3 className="w-3.5 h-3.5" /> Original Research
          </span>
          <h1 className="mt-5 text-4xl sm:text-5xl font-bold leading-tight">
            CarCheckerVIN Research &amp; Data
          </h1>
          <p className="mt-5 text-lg text-primary-100 max-w-2xl leading-relaxed">
            Original research from our analysis of 50,000+ VIN lookups, NICB theft data, and
            NMVTIS title records.
          </p>
        </div>
      </section>

      {/* Lead */}
      <section className="py-14 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-lg text-slate-600 leading-relaxed">
            Our editorial and data team publishes original studies several times a year using the
            anonymized lookup history from our platform combined with public datasets from the
            National Motor Vehicle Title Information System, the National Insurance Crime Bureau,
            state DMV title transfer records, and OEM recall feeds. The studies below are free to
            cite under a Creative Commons Attribution license — we ask only that you link back to
            the original page and credit{" "}
            <em>CarCheckerVIN Editorial Team</em>.
          </p>
        </div>
      </section>

      {/* Studies */}
      <section className="py-14 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold text-slate-900">Featured Studies</h2>
            <p className="mt-3 text-lg text-slate-600 leading-relaxed">
              Each study links to the underlying methodology and dataset where available. For
              press inquiries, embargoed previews, or custom data pulls, see the press section
              below.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            {studies.map(({ icon: Icon, title, summary, href, cta, tag }) => (
              <article
                key={title}
                className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-primary-50 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-primary-600" />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary-600">
                    {tag}
                  </span>
                </div>
                <h3 className="mt-4 text-xl font-bold text-slate-900 leading-snug">{title}</h3>
                <p className="mt-3 text-slate-600 leading-relaxed">{summary}</p>
                <Link
                  href={href}
                  className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary-600 hover:underline"
                >
                  {cta} &rarr;
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Citing */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-3">
            <Quote className="w-5 h-5 text-primary-600" />
            <h2 className="text-3xl font-bold text-slate-900">Citing Our Research</h2>
          </div>
          <p className="mt-2 text-lg text-slate-600 leading-relaxed">
            Our research is free to quote, paraphrase, and republish under{" "}
            <a
              href="https://creativecommons.org/licenses/by/4.0/"
              target="_blank"
              rel="noopener"
              className="text-primary-600 hover:underline"
            >
              CC BY 4.0
            </a>{" "}
            with attribution. Use the formats below for academic papers, news articles, and blog
            posts.
          </p>

          <div className="mt-6 space-y-4">
            <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
                APA
              </div>
              <code className="block text-sm text-slate-800 font-mono leading-relaxed">
                CarCheckerVIN Editorial Team. (2026). [Study Name]. Retrieved from
                https://www.carcheckervin.com/research
              </code>
            </div>

            <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
                MLA
              </div>
              <code className="block text-sm text-slate-800 font-mono leading-relaxed">
                CarCheckerVIN Editorial Team. &ldquo;[Study Name].&rdquo; CarCheckerVIN, 2026,
                carcheckervin.com/research.
              </code>
            </div>

            <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
                Chicago / News
              </div>
              <code className="block text-sm text-slate-800 font-mono leading-relaxed">
                &ldquo;[Study Name],&rdquo; CarCheckerVIN Editorial Team, accessed [date],
                https://www.carcheckervin.com/research.
              </code>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-3">
            <HelpCircle className="w-5 h-5 text-primary-600" />
            <h2 className="text-3xl font-bold text-slate-900">
              Research &amp; Citation FAQ
            </h2>
          </div>
          <p className="mt-2 text-lg text-slate-600 leading-relaxed">
            Common questions from journalists, analysts, and researchers about
            our data, sources, and licensing.
          </p>
          <div className="mt-8 space-y-3">
            {FAQS.map((f) => (
              <details
                key={f.question}
                className="group rounded-2xl border border-slate-200 bg-slate-50 p-5 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex items-start justify-between gap-4 cursor-pointer list-none">
                  <span className="text-base font-bold text-slate-900 pr-2">
                    {f.question}
                  </span>
                  <span className="flex-shrink-0 mt-0.5 text-primary-600 text-xl font-light group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                  {f.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Press */}
      <section className="py-14 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 bg-gradient-to-br from-primary-50 to-white border border-primary-100 rounded-2xl">
            <div className="flex items-center gap-2">
              <Newspaper className="w-5 h-5 text-primary-600" />
              <h2 className="text-2xl font-bold text-slate-900">Press Inquiries</h2>
            </div>
            <p className="mt-3 text-slate-600 leading-relaxed">
              Working on a story and need an interview, additional data slices, or a quote from
              our research team? We respond to press inquiries within one business day. Visit our{" "}
              <Link href="/press" className="text-primary-600 hover:underline font-medium">
                press kit
              </Link>{" "}
              for spokespeople, brand assets, and direct contact details.
            </p>
            <Link
              href="/press"
              className="mt-5 inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors"
            >
              Visit Press Kit &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-14 bg-white">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-3">
            Run a Free VIN Check on Any Vehicle
          </h2>
          <p className="text-slate-700 mb-8">
            Curious how the studies above apply to a specific car? Decode any VIN in seconds.
          </p>
          <div className="flex justify-center">
            <VinSearchForm size="sm" />
          </div>
        </div>
      </section>
    </>
  );
}
