import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Shield, Search, FileText, Clock, CheckCircle, ArrowRight } from "lucide-react";
import { makes, getMakeBySlug } from "@/lib/makes";
import VinSearchForm from "@/components/VinSearchForm";
import Breadcrumbs from "@/components/Breadcrumbs";

interface Props {
  params: Promise<{ make: string }>;
}

export async function generateStaticParams() {
  return makes.map((m) => ({ make: m.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { make: slug } = await params;
  const make = getMakeBySlug(slug);
  if (!make) return { title: "VIN Check" };

  const title = `${make.name} VIN Check & Decoder — Free ${make.name} VIN Lookup | CarCheckerVIN`;
  const description = `Free ${make.name} VIN check and decoder. Look up any ${make.name} VIN to get full vehicle specs, history, photos, market value, equipment lists, and recall info. Trusted by 50,000+ buyers.`;

  return {
    title,
    description,
    keywords: [
      `${make.name} VIN check`, `${make.name} VIN decoder`, `${make.name} VIN lookup`,
      `${make.name} vehicle history`, `check ${make.name} VIN`, `decode ${make.name} VIN`,
      `${make.name} car history report`, `free ${make.name} VIN check`,
      ...make.popular.map((m) => `${make.name} ${m} VIN check`),
    ],
    alternates: { canonical: `/vin-check/${make.slug}` },
    openGraph: {
      title: `${make.name} VIN Check — Free VIN Decoder & Vehicle History`,
      description,
      type: "website",
    },
  };
}

const features = [
  { icon: Search, title: "Instant VIN Decoding", description: "Decode any VIN in under 60 seconds" },
  { icon: FileText, title: "Full Specifications", description: "Engine, transmission, drivetrain & more" },
  { icon: Shield, title: "Vehicle History", description: "Ownership, accidents & title records" },
  { icon: Clock, title: "Recall Alerts", description: "Open recalls & safety campaigns" },
];

export default async function MakePage({ params }: Props) {
  const { make: slug } = await params;
  const make = getMakeBySlug(slug);
  if (!make) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${make.name} VIN Check & Decoder`,
    description: `Free ${make.name} VIN check. Decode any ${make.name} VIN for full vehicle history, specs, and market values.`,
    url: `https://carcheckervin.com/vin-check/${make.slug}`,
    isPartOf: { "@type": "WebSite", name: "CarCheckerVIN", url: "https://carcheckervin.com" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-700 text-white pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Breadcrumbs items={[
              { label: "Home", href: "/" },
              { label: "VIN Check", href: "/vin-check" },
              { label: make.name },
            ]} />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            {make.name} VIN Check & Decoder
          </h1>
          <p className="text-lg text-primary-100 max-w-2xl leading-relaxed mb-8">
            Look up any {make.name} VIN number to get a complete vehicle history report, full specifications, real photos, market values, and equipment details — instantly.
          </p>
          <div className="max-w-xl">
            <VinSearchForm size="lg" />
          </div>
        </div>
      </section>

      {/* About Make */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            About {make.name} VIN Numbers
          </h2>
          <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-4">
            <p>
              {make.name} is {make.description}, founded in {make.founded} in {make.country}. Every {make.name} vehicle manufactured since 1981 has a unique 17-character Vehicle Identification Number (VIN) that contains detailed information about the vehicle&apos;s specifications, manufacturing details, and history.
            </p>
            <p>
              {make.name} VINs typically begin with the characters &ldquo;{make.vinPrefix}&rdquo;, which identify the manufacturer and country of origin. By decoding a {make.name} VIN through our free tool, you can instantly access complete vehicle specifications, factory-installed equipment, recall information, market valuations, and real photos.
            </p>
            <p>
              Whether you&apos;re buying a used {make.name} {make.popular[0]}, selling your {make.name} {make.popular[1]}, or verifying the specs on a {make.name} {make.popular[2]}, our VIN decoder provides all the information you need to make an informed decision.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            What&apos;s Included in a {make.name} VIN Report
          </h2>
          <p className="text-slate-500 mb-8">Everything you need to know about any {make.name} vehicle</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map(({ icon: Icon, title, description }) => (
              <div key={title} className="flex items-start gap-3 p-5 bg-white rounded-xl border border-slate-200">
                <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{title}</h3>
                  <p className="text-sm text-slate-500 mt-0.5">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Models */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Popular {make.name} Models to VIN Check
          </h2>
          <p className="text-slate-500 mb-8">Run a VIN check on any of these popular {make.name} models</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {make.popular.map((model) => (
              <div key={model} className="flex items-center gap-2 p-4 bg-slate-50 rounded-xl border border-slate-200 hover:border-primary-300 hover:bg-primary-50/30 transition-all">
                <CheckCircle className="w-4 h-4 text-primary-600 flex-shrink-0" />
                <span className="text-sm font-medium text-slate-700">{make.name} {model}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How To */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">
            How to Check a {make.name} VIN Number
          </h2>
          <div className="space-y-4">
            {[
              { step: "1", title: "Find the VIN", desc: `Locate the 17-character VIN on your ${make.name}. Check the driver-side dashboard, door jamb sticker, registration, or title.` },
              { step: "2", title: "Enter the VIN Above", desc: `Type or paste the VIN into the search box above. Make sure all 17 characters are entered correctly.` },
              { step: "3", title: "Get Your Report", desc: `View your complete ${make.name} vehicle report instantly — including specs, photos, market values, and history.` },
            ].map(({ step, title, desc }) => (
              <div key={step} className="flex items-start gap-4 p-5 bg-white rounded-xl border border-slate-200">
                <div className="w-8 h-8 rounded-lg bg-primary-600 text-white flex items-center justify-center flex-shrink-0 text-sm font-bold">{step}</div>
                <div>
                  <h3 className="font-semibold text-slate-900">{title}</h3>
                  <p className="text-sm text-slate-500 mt-1">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other Makes */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Check Other Vehicle Brands
          </h2>
          <div className="flex flex-wrap gap-2">
            {makes.filter((m) => m.slug !== make.slug).slice(0, 20).map((m) => (
              <Link key={m.slug} href={`/vin-check/${m.slug}`} className="px-4 py-2 bg-slate-50 text-slate-700 text-sm rounded-xl border border-slate-200 hover:border-primary-300 hover:bg-primary-50/30 hover:text-primary-700 transition-all font-medium">
                {m.name}
              </Link>
            ))}
          </div>
          <Link href="/vin-check" className="inline-flex items-center gap-1.5 mt-6 text-primary-600 font-medium text-sm hover:text-primary-700 transition-colors">
            View all brands <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-primary-600 text-white">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-3">Ready to Check Your {make.name} VIN?</h2>
          <p className="text-primary-100 mb-6">Get instant access to your complete vehicle report</p>
          <VinSearchForm size="sm" />
        </div>
      </section>
    </>
  );
}
