import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Hash, Search } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";

export const metadata: Metadata = {
  title: "VIN Guides & Resources — Learn Everything About VIN Numbers",
  description:
    "Free VIN guides and resources. Learn how to read a VIN, what a VIN number means, and how to decode any vehicle identification number for free.",
  keywords: [
    "VIN guides",
    "VIN resources",
    "VIN number guide",
    "vehicle identification number guide",
    "VIN help",
    "learn about VIN numbers",
  ],
  alternates: { canonical: "/guides" },
  openGraph: {
    title: "VIN Guides & Resources — Learn Everything About VIN Numbers",
    description:
      "Free VIN guides and resources. Learn how to read a VIN, what a VIN number means, and how to decode any vehicle identification number for free.",
    url: "https://www.carcheckervin.com/guides",
    type: "website",
  },
};

const guides = [
  {
    href: "/guides/how-to-read-a-vin",
    icon: Hash,
    title: "How to Read a VIN Number",
    description:
      "Understand all 17 positions of a VIN. Learn what each digit represents, from the country of origin to the unique serial number.",
    color: "bg-primary-50 text-primary-600",
  },
  {
    href: "/guides/what-is-a-vin-number",
    icon: BookOpen,
    title: "What Is a VIN Number?",
    description:
      "A complete introduction to Vehicle Identification Numbers: their history, why they exist, and where to find them on any vehicle.",
    color: "bg-amber-50 text-amber-600",
  },
  {
    href: "/guides/free-vin-check",
    icon: Search,
    title: "Free VIN Check",
    description:
      "Learn what information a free VIN check reveals, how it compares to premium reports, and why every buyer should run one before purchasing.",
    color: "bg-emerald-50 text-emerald-600",
  },
];

export default function GuidesPage() {
  return (
    <>
      <section className="pt-28 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Guides" },
            ]}
          />

          <h1 className="mt-6 text-4xl sm:text-5xl font-bold text-slate-900">
            VIN Guides & Resources
          </h1>
          <p className="mt-4 text-lg text-slate-700 max-w-2xl leading-relaxed">
            Everything you need to know about Vehicle Identification Numbers. Our
            free guides help you decode, understand, and use VINs to make smarter
            vehicle decisions.
          </p>
        </div>
      </section>

      <section className="pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-5">
            {guides.map(({ href, icon: Icon, title, description, color }) => (
              <Link
                key={href}
                href={href}
                className="flex gap-5 p-6 bg-white rounded-2xl border border-slate-200 hover:shadow-md hover:border-primary-200 transition-all group"
              >
                <div
                  className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center flex-shrink-0`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900 group-hover:text-primary-600 transition-colors">
                    {title}
                  </h2>
                  <p className="mt-1.5 text-slate-700 leading-relaxed">
                    {description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 bg-slate-50">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Ready to Check a Vehicle?
          </h2>
          <p className="text-slate-700 mb-6">
            Enter any 17-character VIN to get an instant vehicle report.
          </p>
          <VinSearchForm size="sm" />
        </div>
      </section>
    </>
  );
}
