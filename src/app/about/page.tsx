import type { Metadata } from "next";
import { Shield, Zap, Users, Award } from "lucide-react";
import VinSearchForm from "@/components/VinSearchForm";

export const metadata: Metadata = {
  title: "About VINCheck Pro — Trusted Vehicle History Reports",
  description: "Learn about VINCheck Pro, the trusted platform for instant VIN decoding and comprehensive vehicle history reports.",
  alternates: { canonical: "/about" },
};

const values = [
  { icon: Shield, title: "Trust & Transparency", description: "We source data from NMVTIS and manufacturer databases to ensure every report is accurate.", color: "bg-primary-50 text-primary-600" },
  { icon: Zap, title: "Speed & Efficiency", description: "Get instant results in under 60 seconds. No waiting, no delays.", color: "bg-amber-50 text-amber-600" },
  { icon: Users, title: "Customer First", description: "Over 50,000 buyers trust us to help them make informed vehicle decisions.", color: "bg-emerald-50 text-emerald-600" },
  { icon: Award, title: "Affordable Access", description: "Starting at just $7.99 — a fraction of competitor pricing.", color: "bg-violet-50 text-violet-600" },
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-primary-600 to-primary-700 text-white pt-28 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold">About VINCheck Pro</h1>
          <p className="mt-5 text-lg text-primary-100 max-w-2xl mx-auto leading-relaxed">
            We&apos;re on a mission to make vehicle history data accessible, affordable, and easy to understand.
          </p>
        </div>
      </section>
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <h2 className="text-3xl font-bold text-slate-900">Our Mission</h2>
            <p className="mt-5 text-lg text-slate-500 leading-relaxed">
              Every year, millions buy used vehicles without knowing their full history. VINCheck Pro provides comprehensive, instant reports that help buyers avoid costly mistakes.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {values.map(({ icon: Icon, title, description, color }) => (
              <div key={title} className="flex gap-4 p-6 bg-white rounded-2xl border border-slate-200 hover:shadow-md transition-all">
                <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center flex-shrink-0`}><Icon className="w-6 h-6" /></div>
                <div><h3 className="text-lg font-bold text-slate-900">{title}</h3><p className="mt-1.5 text-slate-500 leading-relaxed">{description}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-14 bg-slate-50">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Ready to Check a Vehicle?</h2>
          <VinSearchForm size="sm" />
        </div>
      </section>
    </>
  );
}
