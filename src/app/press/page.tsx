import type { Metadata } from "next";
import Link from "next/link";
import {
  Newspaper,
  Download,
  Image as ImageIcon,
  FileText,
  Users,
  Mail,
  Phone,
  Calendar,
  Building2,
  Award,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Press Kit & Media Resources",
  description:
    "CarCheckerVIN press kit: company facts, brand assets, spokespeople, recent announcements, and direct contact for media inquiries.",
  keywords: [
    "carcheckervin press kit",
    "vincheck pro media",
    "vehicle history report press",
    "carcheckervin logo download",
    "carcheckervin spokespeople",
    "vin check media kit",
    "press inquiries automotive",
  ],
  alternates: { canonical: "/press" },
  openGraph: {
    title: "Press Kit & Media Resources",
    description:
      "Quick facts, brand assets, spokespeople, and press contact for CarCheckerVIN — the affordable vehicle history report platform.",
    url: "https://carcheckervin.com/press",
    type: "website",
  },
};

const pressSchema = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "CarCheckerVIN Press Kit",
    url: "https://carcheckervin.com/press",
    description:
      "Press kit and media resources for CarCheckerVIN, including brand assets, spokespeople, and announcement timeline.",
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "CarCheckerVIN",
    alternateName: "VINCheck Pro",
    url: "https://carcheckervin.com",
    logo: "https://carcheckervin.com/logo.svg",
    foundingDate: "2025",
    description:
      "CarCheckerVIN provides instant, affordable vehicle history reports powered by NMVTIS, NICB, and manufacturer data sources.",
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+1-800-846-2432",
        email: "press@carcheckervin.com",
        contactType: "press",
        areaServed: "US",
        availableLanguage: ["English"],
      },
    ],
  },
];

const facts = [
  { label: "Founded", value: "2025" },
  { label: "Lifetime VIN Lookups", value: "50,000+" },
  { label: "Data Sources", value: "NMVTIS, NICB, OEM APIs, Auto.dev" },
  { label: "Headquarters", value: "United States" },
  { label: "Reports per Year", value: "300,000+" },
  { label: "Dealer Partners", value: "5,000+" },
];

const spokespeople = [
  {
    name: "Marcus Chen",
    role: "Founder & CEO",
    email: "marcus@carcheckervin.com",
    bio: "12 years in automotive data engineering at major insurance carriers; available for interviews on used-car fraud, NMVTIS policy, and dealer pricing.",
  },
  {
    name: "Priya Anand",
    role: "Head of Data",
    email: "priya@carcheckervin.com",
    bio: "Former lead engineer at a Fortune 100 auto auction; speaks to vehicle data integrity, OEM API integration, and recall reporting.",
  },
  {
    name: "Devon Whitfield",
    role: "Lead Research Analyst",
    email: "devon@carcheckervin.com",
    bio: "ASE-certified, decade in DMV fraud detection; available for commentary on title washing, VIN cloning, and odometer rollback.",
  },
  {
    name: "Sara Okonkwo",
    role: "Communications Lead",
    email: "press@carcheckervin.com",
    bio: "Primary press contact, manages all media requests, embargoed previews, and custom data pulls for journalists and researchers.",
  },
];

const announcements = [
  {
    date: "April 2026",
    title: "Launched comprehensive blog with 100+ articles",
    body: "Long-form buyer education library covering every major car-buying decision, with topics ranging from VIN basics to multi-state title transfers.",
  },
  {
    date: "March 2026",
    title: "50 state-specific buyer guides published",
    body: "Complete coverage of state-by-state used-car laws, salvage thresholds, and DMV procedures — written and reviewed by our internal data team.",
  },
  {
    date: "February 2026",
    title: "Sanity CMS integration",
    body: "Migrated long-form editorial content into a structured CMS to support faster publishing, better SEO, and richer cross-linking across our research and guides.",
  },
  {
    date: "January 2026",
    title: "50,000 lifetime VIN lookups milestone",
    body: "Crossed 50,000 free VIN decodes served to private buyers, journalists, and small dealers since launch.",
  },
];

export default function PressPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pressSchema) }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-700 text-white pt-28 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-5 [&_a]:text-primary-100 [&_a:hover]:text-white [&_span]:text-white [&_li_span]:text-primary-200">
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Press" }]} />
          </div>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-xs font-semibold uppercase tracking-wider">
            <Newspaper className="w-3.5 h-3.5" /> Media Center
          </span>
          <h1 className="mt-5 text-4xl sm:text-5xl font-bold leading-tight">
            Press Kit &amp; Media Center
          </h1>
          <p className="mt-5 text-lg text-primary-100 max-w-2xl leading-relaxed">
            Everything journalists, podcasters, and analysts need to write accurately about
            CarCheckerVIN: company facts, downloadable brand assets, named spokespeople, and
            direct contact lines for press inquiries.
          </p>
        </div>
      </section>

      {/* Quick facts */}
      <section className="py-14 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold text-slate-900">Quick Facts About CarCheckerVIN</h2>
            <p className="mt-3 text-lg text-slate-600 leading-relaxed">
              The numbers and details most commonly requested by reporters. Everything below is
              cleared for publication.
            </p>
          </div>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {facts.map((f) => (
              <div
                key={f.label}
                className="p-5 bg-slate-50 border border-slate-200 rounded-2xl"
              >
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  {f.label}
                </div>
                <div className="mt-1.5 text-xl font-bold text-slate-900">{f.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-14 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900">Our Mission</h2>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">
            CarCheckerVIN exists to put the same authoritative title, theft, and recall data that
            insurance companies and franchise dealers rely on into the hands of every used-car
            buyer in America — for less than the price of a tank of gas. We believe transparency
            is the single most powerful tool a buyer has, and that it should not be reserved for
            the people who can afford a thirty-dollar premium report. Read the full story on our{" "}
            <Link href="/about" className="text-primary-600 hover:underline font-medium">
              About page
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Media coverage */}
      <section className="py-14 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold text-slate-900">Media Coverage</h2>
            <p className="mt-3 text-lg text-slate-600 leading-relaxed">
              Featured in: <em className="text-slate-500">[logos coming soon]</em>
            </p>
          </div>
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-20 rounded-2xl border border-dashed border-slate-300 bg-slate-50 flex items-center justify-center text-sm text-slate-400"
              >
                Coming soon
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand assets */}
      <section className="py-14 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold text-slate-900">Brand Assets</h2>
            <p className="mt-3 text-lg text-slate-600 leading-relaxed">
              Download our logo and brand guidelines. Please use only the official assets below
              and follow the color and clear-space rules in the guidelines PDF.
            </p>
          </div>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="/logo.svg"
              download
              className="p-6 bg-white border border-slate-200 rounded-2xl hover:shadow-md transition flex flex-col gap-3"
            >
              <ImageIcon className="w-6 h-6 text-primary-600" />
              <div>
                <div className="font-bold text-slate-900">Download Logo (SVG)</div>
                <div className="text-sm text-slate-500">Vector, recommended for digital use.</div>
              </div>
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary-600">
                <Download className="w-4 h-4" /> Download
              </span>
            </a>

            <a
              href="/logo.svg"
              download
              className="p-6 bg-white border border-slate-200 rounded-2xl hover:shadow-md transition flex flex-col gap-3"
            >
              <ImageIcon className="w-6 h-6 text-primary-600" />
              <div>
                <div className="font-bold text-slate-900">Download Logo (PNG)</div>
                <div className="text-sm text-slate-500">
                  Transparent background, 2x retina-ready.
                </div>
              </div>
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary-600">
                <Download className="w-4 h-4" /> Download
              </span>
            </a>

            <a
              href="/logo.svg"
              download
              className="p-6 bg-white border border-slate-200 rounded-2xl hover:shadow-md transition flex flex-col gap-3"
            >
              <FileText className="w-6 h-6 text-primary-600" />
              <div>
                <div className="font-bold text-slate-900">Brand Guidelines PDF</div>
                <div className="text-sm text-slate-500">
                  Colors, typography, clear-space, do/don&rsquo;t.
                </div>
              </div>
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary-600">
                <Download className="w-4 h-4" /> Download
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Spokespeople */}
      <section className="py-14 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary-600" />
              <h2 className="text-3xl font-bold text-slate-900">Spokespeople</h2>
            </div>
            <p className="mt-3 text-lg text-slate-600 leading-relaxed">
              Available for interviews, podcasts, and on-the-record commentary. For fastest
              response, route initial inquiries through our communications lead.
            </p>
          </div>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
            {spokespeople.map((p) => (
              <div
                key={p.name}
                className="p-6 bg-white border border-slate-200 rounded-2xl"
              >
                <h3 className="text-xl font-bold text-slate-900">{p.name}</h3>
                <p className="text-primary-600 font-medium">{p.role}</p>
                <p className="mt-3 text-slate-600 leading-relaxed text-sm">{p.bio}</p>
                <a
                  href={`mailto:${p.email}`}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:underline"
                >
                  <Mail className="w-4 h-4" /> {p.email}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Announcements */}
      <section className="py-14 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary-600" />
            <h2 className="text-3xl font-bold text-slate-900">Recent Announcements</h2>
          </div>
          <ul className="mt-8 space-y-5">
            {announcements.map((a) => (
              <li
                key={a.title}
                className="p-5 bg-white border border-slate-200 rounded-2xl"
              >
                <div className="text-xs font-semibold uppercase tracking-wider text-primary-600">
                  {a.date}
                </div>
                <h3 className="mt-1.5 text-lg font-bold text-slate-900">{a.title}</h3>
                <p className="mt-2 text-slate-600 leading-relaxed">{a.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Press contact */}
      <section className="py-14 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 bg-gradient-to-br from-primary-50 to-white border border-primary-100 rounded-2xl">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-primary-600" />
              <h2 className="text-2xl font-bold text-slate-900">Press Inquiries Contact</h2>
            </div>
            <p className="mt-3 text-slate-600 leading-relaxed">
              For interviews, embargoed previews, custom data pulls, and fact-check requests,
              reach our communications team directly. We respond to press inquiries within one
              business day.
            </p>
            <div className="mt-5 space-y-3">
              <a
                href="mailto:press@carcheckervin.com"
                className="flex items-center gap-3 text-slate-700 hover:text-primary-600"
              >
                <Mail className="w-5 h-5 text-primary-600" />
                <span className="font-semibold">press@carcheckervin.com</span>
              </a>
              <a
                href="tel:1-800-846-2432"
                className="flex items-center gap-3 text-slate-700 hover:text-primary-600"
              >
                <Phone className="w-5 h-5 text-primary-600" />
                <span className="font-semibold">1-800-VIN-CHECK (1-800-846-2432)</span>
              </a>
              <div className="flex items-center gap-3 text-slate-700">
                <Building2 className="w-5 h-5 text-primary-600" />
                <span>United States — replies in English</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-14 bg-slate-50">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-3">
            Need More Than the Press Kit?
          </h2>
          <p className="text-slate-500 mb-6">
            For partnership inquiries, sponsorships, or general questions, reach our team through
            our standard contact channel.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors"
          >
            Contact Us &rarr;
          </Link>
        </div>
      </section>
    </>
  );
}
