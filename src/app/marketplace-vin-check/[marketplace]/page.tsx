import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Shield, Search, FileText, Clock, AlertTriangle, ArrowRight } from "lucide-react";
import { marketplaces, getMarketplaceBySlug } from "@/lib/marketplaces";
import VinSearchForm from "@/components/VinSearchForm";
import Breadcrumbs from "@/components/Breadcrumbs";

interface Props {
  params: Promise<{ marketplace: string }>;
}

export async function generateStaticParams() {
  return marketplaces.map((m) => ({ marketplace: m.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { marketplace: slug } = await params;
  const marketplace = getMarketplaceBySlug(slug);
  if (!marketplace) return { title: "Marketplace VIN Check" };

  const title = `${marketplace.name} VIN Check — Verify Before You Buy on ${marketplace.name}`;
  const description = `Run a VIN check on any vehicle listed on ${marketplace.name}. Get a full vehicle history report before you buy — uncover accidents, title issues, and odometer fraud instantly.`;

  return {
    title,
    description,
    keywords: [
      `${marketplace.name} VIN check`,
      `${marketplace.name} vehicle history`,
      `${marketplace.name} car check`,
      `verify ${marketplace.name} listing`,
      `${marketplace.name} VIN lookup`,
      `${marketplace.name} used car check`,
      "marketplace VIN check",
      "online marketplace vehicle history",
    ],
    alternates: { canonical: `/marketplace-vin-check/${marketplace.slug}` },
    openGraph: {
      title,
      description,
      type: "website",
    },
  };
}

const features = [
  { icon: Shield, title: "Title & Ownership History", description: "Verify clean title, check for salvage or rebuilt brands, and see every past owner" },
  { icon: Search, title: "Accident & Damage Records", description: "Uncover reported collisions, airbag deployments, and structural damage events" },
  { icon: FileText, title: "Full Vehicle Specifications", description: "Confirm the vehicle's engine, trim, factory options, and build details match the listing" },
  { icon: Clock, title: "Odometer Verification", description: "Detect potential rollbacks by comparing mileage records across the vehicle's history" },
];

const riskColors: Record<"low" | "medium" | "high", { bg: string; border: string; text: string; icon: string }> = {
  low: { bg: "bg-green-50", border: "border-green-200", text: "text-green-800", icon: "text-green-600" },
  medium: { bg: "bg-yellow-50", border: "border-yellow-200", text: "text-yellow-800", icon: "text-yellow-600" },
  high: { bg: "bg-red-50", border: "border-red-200", text: "text-red-800", icon: "text-red-600" },
};

const riskLabels: Record<"low" | "medium" | "high", string> = {
  low: "Low Fraud Risk",
  medium: "Medium Fraud Risk",
  high: "High Fraud Risk",
};

export default async function MarketplacePage({ params }: Props) {
  const { marketplace: slug } = await params;
  const marketplace = getMarketplaceBySlug(slug);
  if (!marketplace) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${marketplace.name} VIN Check — Verify Before You Buy on ${marketplace.name}`,
    description: `Run a VIN check on any vehicle listed on ${marketplace.name}. Get a full vehicle history report before you buy.`,
    url: `https://www.carcheckervin.com/marketplace-vin-check/${marketplace.slug}`,
    isPartOf: { "@type": "WebSite", name: "CarCheckerVIN", url: "https://www.carcheckervin.com" },
  };

  const risk = riskColors[marketplace.riskLevel];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-700 text-white pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Breadcrumbs
              onDark
              items={[
                { label: "Home", href: "/" },
                { label: "Marketplace VIN Check", href: "/marketplace-vin-check" },
                { label: marketplace.name },
              ]}
            />
          </div>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">{marketplace.icon}</span>
            <h1 className="text-4xl sm:text-5xl font-bold">{marketplace.name} VIN Check</h1>
          </div>
          <p className="text-lg text-primary-100 max-w-2xl leading-relaxed mb-8">
            Buying a vehicle on {marketplace.name}? Run a VIN check first to verify the vehicle&apos;s
            full history before you commit to any purchase.
          </p>
          <div className="max-w-xl">
            <VinSearchForm size="lg" onDark />
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Why Run a VIN Check on {marketplace.name}?
          </h2>
          <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-4">
            <p>{marketplace.longDesc.split(". ")[0]}.</p>
            <p>{marketplace.longDesc.split(". ").slice(1).join(". ")}</p>
          </div>
        </div>
      </section>

      {/* Risk Warning */}
      <section className="py-8 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex items-start gap-4 p-5 rounded-xl border ${risk.bg} ${risk.border}`}>
            <AlertTriangle className={`w-6 h-6 flex-shrink-0 mt-0.5 ${risk.icon}`} />
            <div>
              <h3 className={`font-bold text-base mb-1 ${risk.text}`}>
                {riskLabels[marketplace.riskLevel]} on {marketplace.name}
              </h3>
              <p className={`text-sm leading-relaxed ${risk.text}`}>{marketplace.riskNote}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            What&apos;s Included in Your VIN Report
          </h2>
          <p className="text-slate-700 mb-8">
            Everything you need to verify any {marketplace.name} listing
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="flex items-start gap-3 p-5 bg-white rounded-xl border border-slate-200"
              >
                <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{title}</h3>
                  <p className="text-sm text-slate-700 mt-0.5">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular vehicle types */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Common Vehicles Found on {marketplace.name}
          </h2>
          <p className="text-slate-700 mb-8">
            Run a VIN check on any of these vehicle types commonly listed on {marketplace.name}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {marketplace.popular.map((type) => (
              <div
                key={type}
                className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center"
              >
                <span className="text-sm font-medium text-slate-700">{type}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">
            How to Check a VIN from {marketplace.name}
          </h2>
          <div className="space-y-4">
            {[
              {
                step: "1",
                title: "Find the VIN in the Listing",
                desc: `Locate the 17-character VIN in the ${marketplace.name} listing, or ask the seller to provide it. You can also find it on the vehicle's dashboard or door jamb.`,
              },
              {
                step: "2",
                title: "Enter the VIN Above",
                desc: "Type or paste the VIN into the search box at the top of this page. Make sure all 17 characters are correct before submitting.",
              },
              {
                step: "3",
                title: "Review Your Report Before Buying",
                desc: `Get your full vehicle history report instantly — including title status, accident records, mileage history, and specs — before meeting the ${marketplace.name} seller.`,
              },
            ].map(({ step, title, desc }) => (
              <div
                key={step}
                className="flex items-start gap-4 p-5 bg-white rounded-xl border border-slate-200"
              >
                <div className="w-8 h-8 rounded-lg bg-primary-600 text-white flex items-center justify-center flex-shrink-0 text-sm font-bold">
                  {step}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{title}</h3>
                  <p className="text-sm text-slate-700 mt-1">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other marketplaces */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Check Other Marketplaces
          </h2>
          <div className="flex flex-wrap gap-2">
            {marketplaces
              .filter((m) => m.slug !== marketplace.slug)
              .map((m) => (
                <Link
                  key={m.slug}
                  href={`/marketplace-vin-check/${m.slug}`}
                  className="px-4 py-2 bg-slate-50 text-slate-700 text-sm rounded-xl border border-slate-200 hover:border-primary-300 hover:bg-primary-50/30 hover:text-primary-700 transition-all font-medium"
                >
                  {m.icon} {m.name}
                </Link>
              ))}
          </div>
          <Link
            href="/marketplace-vin-check"
            className="inline-flex items-center gap-1.5 mt-6 text-primary-600 font-medium text-sm hover:text-primary-700 transition-colors"
          >
            View all marketplaces <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-primary-600 text-white">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-3">
            Ready to Check a {marketplace.name} VIN?
          </h2>
          <p className="text-primary-100 mb-6">
            Get your full vehicle history report before you buy
          </p>
          <VinSearchForm size="sm" />
        </div>
      </section>
    </>
  );
}
