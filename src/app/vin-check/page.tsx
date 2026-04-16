import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { makes } from "@/lib/makes";
import VinSearchForm from "@/components/VinSearchForm";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Free VIN Check by Make — Decode Any Vehicle | CarCheckerVIN",
  description:
    "Free VIN check and decoder for every car brand. Look up Toyota, Ford, Honda, BMW, Tesla, and 30+ makes. Get full vehicle history, specs, photos, and market values instantly.",
  keywords: [
    "VIN check", "VIN decoder", "free VIN check", "VIN lookup", "vehicle history report",
    "car VIN check", "check VIN number", "VIN number lookup", "decode VIN",
    "vehicle identification number", "car history check",
  ],
  alternates: { canonical: "/vin-check" },
  openGraph: {
    title: "Free VIN Check by Make — Every Brand Covered",
    description: "Free VIN check for every car brand. Decode any VIN to get full specs, history, photos, and market values.",
    type: "website",
  },
};

const regions = [
  { label: "American", makes: makes.filter((m) => m.country === "USA") },
  { label: "Japanese", makes: makes.filter((m) => m.country === "Japan") },
  { label: "Korean", makes: makes.filter((m) => m.country === "South Korea") },
  { label: "German", makes: makes.filter((m) => m.country === "Germany") },
  { label: "European", makes: makes.filter((m) => ["UK", "Sweden", "Italy"].includes(m.country)) },
];

export default function VinCheckPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-primary-600 to-primary-700 text-white pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "VIN Check" }]} />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Free VIN Check & Decoder</h1>
          <p className="text-lg text-primary-100 max-w-2xl leading-relaxed mb-8">
            Decode any Vehicle Identification Number to get a comprehensive vehicle report. Select your vehicle brand below or enter a VIN directly.
          </p>
          <div className="max-w-xl">
            <VinSearchForm size="lg" />
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">VIN Check by Vehicle Brand</h2>
          <p className="text-slate-500 mb-10">Select a manufacturer to learn more about their VIN format and decode any VIN</p>

          {regions.map(({ label, makes: regionMakes }) => (
            <div key={label} className="mb-10">
              <h3 className="text-lg font-bold text-slate-800 mb-4">{label} Brands</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {regionMakes.map((m) => (
                  <Link key={m.slug} href={`/vin-check/${m.slug}`}
                    className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200 hover:border-primary-300 hover:bg-primary-50/30 transition-all group">
                    <span className="font-semibold text-slate-800 group-hover:text-primary-700 transition-colors">{m.name}</span>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-primary-600 transition-colors" />
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-14 bg-primary-600 text-white">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-3">Check Any VIN Now</h2>
          <p className="text-primary-100 mb-6">Works with all makes and models from 1981 onwards</p>
          <VinSearchForm size="sm" />
        </div>
      </section>
    </>
  );
}
