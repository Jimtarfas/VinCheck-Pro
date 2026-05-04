import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";

export const metadata: Metadata = {
  title: "Motorcycle VIN Check — Free Bike VIN Decoder & History Report",
  description:
    "Run a free motorcycle VIN check for any bike, cruiser, sportbike, or off-road vehicle. Decode the 17-character VIN to get full history, title status, theft records, and specs.",
  keywords: [
    "motorcycle VIN check",
    "bike VIN decoder",
    "motorcycle history report",
    "free motorcycle VIN",
    "motorcycle title check",
    "motorcycle theft check",
  ],
  alternates: { canonical: "/motorcycle-vin-check" },
  openGraph: {
    title: "Motorcycle VIN Check — Free Bike VIN Decoder & History Report",
    description:
      "Run a free motorcycle VIN check for any bike. Decode the 17-character VIN to get full history, title status, and theft records.",
    url: "https://www.carcheckervin.com/motorcycle-vin-check",
    type: "article",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Motorcycle VIN Check",
  description:
    "Learn how to run a motorcycle VIN check for any bike, including title status, theft records, accident history, and specifications.",
  author: {
    "@type": "Organization",
    name: "CarCheckerVIN",
    url: "https://www.carcheckervin.com",
  },
  publisher: {
    "@type": "Organization",
    name: "CarCheckerVIN",
    url: "https://www.carcheckervin.com",
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": "https://www.carcheckervin.com/motorcycle-vin-check",
  },
  datePublished: "2026-05-04",
  dateModified: "2026-05-04",
};

export default function MotorcycleVinCheckPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <article className="pt-28 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Motorcycle VIN Check" },
            ]}
          />

          <h1 className="mt-6 text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">
            Motorcycle VIN Check
          </h1>
          <p className="mt-4 text-lg text-slate-700 leading-relaxed">
            Buying a used motorcycle without a VIN check is a significant risk. Motorcycles have some of the highest theft rates of any vehicle category, and stolen bikes are frequently relicensed and resold. A motorcycle VIN check reveals title status, theft records, salvage brands, and accident history — the same essential data points that protect car buyers also protect motorcycle buyers from costly mistakes.
          </p>

          <div className="mt-8 p-6 bg-primary-50 rounded-2xl border border-primary-100">
            <h2 className="text-lg font-bold text-slate-900 mb-3">
              Run a Free Motorcycle VIN Check
            </h2>
            <VinSearchForm size="sm" />
          </div>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            How Motorcycle VINs Differ from Car VINs
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Since 1981, all motorcycles sold in the United States — like automobiles — have used the standardized 17-character VIN format mandated by NHTSA. The structure is the same: the first three characters identify the World Manufacturer Identifier, characters 4–8 form the Vehicle Descriptor Section, character 9 is the check digit, character 10 encodes the model year, character 11 identifies the assembly plant, and characters 12–17 are the sequential production number.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            The key differences from automobile VINs are in the specific codes used within the standard structure. Motorcycle manufacturer codes are different from car manufacturer codes. Engine displacement is encoded differently. Body style codes reflect motorcycle categories (sport, cruiser, dual-sport, off-road) rather than car body styles.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            VIN location on motorcycles also differs from automobiles. On most motorcycles, the VIN is stamped into the frame — typically on the steering head (where the forks attach to the frame), on the left side of the frame near the engine, or in both locations. Some manufacturers also place a VIN plate on the frame in addition to the stamped number.
          </p>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            What&rsquo;s in a Motorcycle VIN Report
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            A comprehensive motorcycle VIN report covers the same categories as a car history report, with some motorcycle-specific considerations. Title brands for motorcycles include the standard salvage, rebuilt, and flood brands, but also motorcycle-specific categories like &ldquo;off-road use only&rdquo; and &ldquo;parts only&rdquo; — titles that indicate the bike was deemed unroadworthy or was stripped for parts.
          </p>
          <ul className="mt-4 space-y-2 text-slate-600">
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span><strong>Title and registration history</strong> &mdash; all states where the motorcycle was titled, including any brands or status changes.</span>
            </li>
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span><strong>Theft records</strong> &mdash; NICB and law enforcement theft reports, including whether the bike is currently on a stolen vehicle list.</span>
            </li>
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span><strong>Accident and damage history</strong> &mdash; insurance claims and reported collision damage.</span>
            </li>
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span><strong>Odometer records</strong> &mdash; mileage readings at title transfers to detect rollback.</span>
            </li>
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span><strong>VIN decode</strong> &mdash; manufacturer, model year, engine displacement, and assembly plant from the VIN structure.</span>
            </li>
          </ul>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            Motorcycle Title Brands to Watch For
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Title brands on motorcycles carry the same implications as on automobiles, but the specific risks differ because of motorcycle construction. A salvage-branded car may be rebuildable with extensive structural repair; a salvage-branded motorcycle that suffered frame damage may be fundamentally unsafe regardless of cosmetic repair because the frame is the primary structural element of the bike.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Rebuilt title motorcycles — those that were previously salvage but have been inspected and retitled — require careful scrutiny. The inspection process varies by state, and some states have minimal requirements. A motorcycle with a rebuilt title from a state with minimal inspection requirements should be treated with the same caution as a salvage title bike. Have the bike inspected by a qualified motorcycle mechanic who can assess frame integrity before purchase.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Run your motorcycle VIN check alongside a{" "}
            <Link href="/salvage-title-check" className="text-primary-600 hover:underline font-medium">
              salvage title check
            </Link>{" "}
            and a{" "}
            <Link href="/stolen-vehicle-check" className="text-primary-600 hover:underline font-medium">
              stolen vehicle check
            </Link>{" "}
            to get complete title and theft history coverage.
          </p>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            Checking for Stolen Motorcycles
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Motorcycles are stolen at a significantly higher rate per unit than automobiles. According to NICB data, hundreds of thousands of motorcycles are reported stolen each year in the United States, with recovery rates substantially lower than for cars. The secondary market for stolen motorcycles is active because bikes are easy to transport, can be quickly stripped for parts, or can be retitled with altered VINs in jurisdictions with less rigorous inspection.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            A VIN theft check queries NICB&rsquo;s database and law enforcement stolen vehicle records to determine whether the VIN you&rsquo;re checking has been reported stolen. This check should be run on every used motorcycle purchase, not just when something seems suspicious. Many stolen motorcycles are sold with fraudulent documentation that appears completely legitimate.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Before completing any used motorcycle purchase, physically verify the VIN stamped on the frame against the title document and insurance card. Altered or restamped VINs on the frame are a strong indicator of a stolen or cloned motorcycle. If the numbers don&rsquo;t match or show signs of alteration, walk away.
          </p>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            Top Motorcycle Brands and VIN Prefixes
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Major motorcycle manufacturers each have distinctive WMI codes that appear in the first three characters of the VIN. These codes are internationally standardized and allow instant brand identification from the VIN alone.
          </p>
          <ul className="mt-4 space-y-2 text-slate-600">
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span><strong>Harley-Davidson</strong> &mdash; begins with 1HD (US manufacturing); international plants use different prefixes.</span>
            </li>
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span><strong>Honda motorcycles</strong> &mdash; JH2 (Japan), 1HF, or 19H depending on production year and plant.</span>
            </li>
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span><strong>Kawasaki</strong> &mdash; JKBVD or similar JK prefix codes for Japan manufacturing.</span>
            </li>
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span><strong>Yamaha</strong> &mdash; JYA prefix for Japanese-built models; VBKV for European-manufactured bikes.</span>
            </li>
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span><strong>Suzuki</strong> &mdash; JS1 prefix for Japan; different codes for other production regions.</span>
            </li>
          </ul>
        </div>
      </article>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-4">
        <RelatedChecks exclude="/motorcycle-vin-check" />
      </div>

      <section className="py-14 bg-slate-50">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Run a Free Motorcycle VIN Check
          </h2>
          <p className="text-slate-700 mb-6">
            Enter a 17-character motorcycle VIN to check title status, theft records, accident history, and specifications.
          </p>
          <VinSearchForm size="sm" />
        </div>
      </section>
    </>
  );
}
