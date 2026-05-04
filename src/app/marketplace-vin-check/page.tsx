import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { marketplaces } from "@/lib/marketplaces";
import VinSearchForm from "@/components/VinSearchForm";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Marketplace VIN Check — Verify Before You Buy",
  description:
    "Run a VIN check before buying from any online marketplace. Verify vehicles listed on Facebook Marketplace, Craigslist, eBay Motors, Copart, and more with a full vehicle history report.",
  keywords: [
    "marketplace VIN check",
    "Facebook Marketplace VIN check",
    "Craigslist VIN check",
    "eBay Motors VIN check",
    "Copart VIN check",
    "online marketplace vehicle history",
    "used car VIN check",
    "private seller VIN check",
    "auction VIN check",
  ],
  alternates: { canonical: "/marketplace-vin-check" },
  openGraph: {
    title: "Marketplace VIN Check — Verify Before You Buy",
    description:
      "Check any vehicle listed on Facebook Marketplace, Craigslist, eBay Motors, Copart, and 6 more platforms. Get a full history report before you buy.",
    type: "website",
  },
};

const riskBadge: Record<"low" | "medium" | "high", { label: string; className: string }> = {
  low: { label: "Low Risk", className: "bg-green-100 text-green-800" },
  medium: { label: "Medium Risk", className: "bg-yellow-100 text-yellow-800" },
  high: { label: "High Risk", className: "bg-red-100 text-red-800" },
};

export default function MarketplaceVinCheckPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-primary-600 to-primary-700 text-white pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Marketplace VIN Check" },
              ]}
            />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Marketplace VIN Check — Verify Before You Buy
          </h1>
          <p className="text-lg text-primary-100 max-w-2xl leading-relaxed mb-8">
            Buying a vehicle from an online marketplace? Run a VIN check first. Select your
            platform below or enter a VIN directly to get a full vehicle history report.
          </p>
          <div className="max-w-xl">
            <VinSearchForm size="lg" />
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            VIN Check by Marketplace
          </h2>
          <p className="text-slate-700 mb-10">
            Select the platform where you found the vehicle to learn about its specific risks
            and run a VIN check
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {marketplaces.map((m) => {
              const badge = riskBadge[m.riskLevel];
              return (
                <Link
                  key={m.slug}
                  href={`/marketplace-vin-check/${m.slug}`}
                  className="flex flex-col p-5 bg-slate-50 rounded-xl border border-slate-200 hover:border-primary-300 hover:bg-primary-50/30 transition-all group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-3xl">{m.icon}</span>
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full ${badge.className}`}
                    >
                      {badge.label}
                    </span>
                  </div>
                  <h3 className="font-semibold text-slate-900 group-hover:text-primary-700 transition-colors mb-1">
                    {m.name}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed flex-1">
                    {m.description}
                  </p>
                  <div className="flex items-center gap-1 mt-4 text-primary-600 text-sm font-medium">
                    VIN Check <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-14 bg-primary-600 text-white">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-3">Check Any Marketplace VIN Now</h2>
          <p className="text-primary-100 mb-6">
            Works with vehicles from any platform — private sellers, dealers, or auctions
          </p>
          <VinSearchForm size="sm" />
        </div>
      </section>
    </>
  );
}
