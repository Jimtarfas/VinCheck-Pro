import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";

export const metadata: Metadata = {
  title: "Paint Code Lookup by VIN — Find Your Car's Exact Color Code",
  description:
    "Find the exact paint color code for any vehicle by VIN. Match touch-up paint, body shop colors, and factory color names using your vehicle's original build data.",
  keywords: [
    "paint code lookup by VIN",
    "car paint code by VIN",
    "vehicle color code VIN",
    "find paint code",
    "OEM paint code lookup",
    "factory color code",
  ],
  alternates: { canonical: "/paint-code-lookup" },
  openGraph: {
    title: "Paint Code Lookup by VIN — Find Your Car's Exact Color Code",
    description:
      "Find the exact paint color code for any vehicle by VIN. Match touch-up paint and body shop colors using your vehicle's original build data.",
    url: "https://www.carcheckervin.com/paint-code-lookup",
    type: "article",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Paint Code Lookup by VIN",
  description:
    "Learn how to find the exact paint color code for any vehicle by VIN for touch-up paint matching and body shop repairs.",
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
    "@id": "https://www.carcheckervin.com/paint-code-lookup",
  },
  datePublished: "2026-05-04",
  dateModified: "2026-05-04",
};

export default function PaintCodeLookupPage() {
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
              { label: "Paint Code Lookup" },
            ]}
          />

          <h1 className="mt-6 text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">
            Paint Code Lookup by VIN
          </h1>
          <p className="mt-4 text-lg text-slate-700 leading-relaxed">
            Every vehicle leaves the factory with a specific paint code that corresponds to an exact color formulation. Whether you need touch-up paint for a door ding, a full panel repaint after an accident, or want to verify that a vehicle hasn&rsquo;t been resprayed in a different color, looking up the paint code by VIN gives you the definitive factory color reference. Generic color names like &ldquo;silver&rdquo; or &ldquo;blue&rdquo; describe dozens of different formulations — only the code identifies the exact one.
          </p>

          <div className="mt-8 p-6 bg-primary-50 rounded-2xl border border-primary-100">
            <h2 className="text-lg font-bold text-slate-900 mb-3">
              Find Your Vehicle&apos;s Paint Code
            </h2>
            <VinSearchForm size="sm" />
          </div>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            Where to Find Your Paint Code
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Paint codes are recorded in two places: physically on the vehicle itself and in the manufacturer&rsquo;s build database linked to the VIN. The physical location varies by manufacturer. Common locations include the driver-side door jamb sticker, the firewall in the engine bay, the radiator support, the spare tire well, or a label inside the trunk or glove box.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            The door jamb sticker (also called the service label or certification label) is the most common location and is present on virtually all vehicles. It contains the paint code alongside other important data like tire pressure specifications, GVW ratings, and the VIN. The code is usually prefixed with a label like &ldquo;Color,&rdquo; &ldquo;Paint,&rdquo; &ldquo;Ext. Color,&rdquo; or a brand-specific abbreviation.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            For vehicles where the physical label has been damaged, removed, or is illegible, a VIN-based paint code lookup retrieves the original factory color code directly from the manufacturer&rsquo;s build data. This is the most reliable method for vehicles with repainted panels where the original sticker may have been obscured or replaced.
          </p>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            Why Factory Paint Codes Matter
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Paint formulations are manufacturer-specific and model-year-specific. A color named &ldquo;Midnight Black&rdquo; from 2018 may have a slightly different formulation than the same name from 2020, and the same color family can have dozens of variants across different manufacturers. Using the wrong paint code results in a visible color mismatch that becomes more obvious in certain lighting conditions.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            For insurance claims and body shop repairs, the correct OEM paint code ensures the repaired panel matches the rest of the vehicle. Body shops that match by eye rather than by code often produce results that look acceptable in the shop but show a mismatch in sunlight. Always provide your factory paint code to any body shop performing panel repairs.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Paint code accuracy is also relevant when buying a used vehicle. A vehicle advertised as a specific color — a rare option or desirable special edition finish — can be verified against the factory build record. If the VIN-linked paint code doesn&rsquo;t match the current color, the vehicle may have been respayed, which could indicate hidden damage and is worth investigating with an{" "}
            <Link href="/accident-history-check" className="text-primary-600 hover:underline font-medium">
              accident history check
            </Link>
            .
          </p>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            Common Paint Code Formats by Brand
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Paint code formats differ significantly between manufacturers, which is why brand knowledge matters when searching for the correct code. Understanding the format helps you identify the code quickly on the door jamb sticker or in a lookup result.
          </p>
          <ul className="mt-4 space-y-2 text-slate-600">
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span><strong>General Motors</strong> &mdash; uses two to three uppercase letters (e.g., WA8555 or GBA). Look for &ldquo;BC/CC&rdquo; on the door jamb label.</span>
            </li>
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span><strong>Ford / Lincoln</strong> &mdash; two-character alphanumeric code (e.g., UH or J4). Found on the door jamb certification label.</span>
            </li>
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span><strong>Toyota / Lexus</strong> &mdash; three-character alphanumeric (e.g., 1F7 or 8S6). Listed on the door jamb or under the hood.</span>
            </li>
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span><strong>BMW / Mini</strong> &mdash; three-character code (e.g., A52 or C3J). Found on a sticker inside the trunk or engine bay.</span>
            </li>
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span><strong>Honda / Acura</strong> &mdash; three-character alphanumeric (e.g., NH731P or YR574M). On the door jamb or driver&rsquo;s side firewall.</span>
            </li>
          </ul>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            Paint Code vs. Color Name
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Manufacturer color names are marketing terms; paint codes are technical specifications. A color might be marketed as &ldquo;Velocity Red Satin Mica&rdquo; by Mazda or &ldquo;Supersonic Red&rdquo; by Honda — two different formulations that both appear simply &ldquo;red&rdquo; to the casual observer. The paint code (not the name) is what the paint supplier uses to mix the correct formulation.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Color names can also be reused across different years with subtle formula changes. The code, however, remains tied to a specific formulation. Always use the code when ordering touch-up paint from automotive paint suppliers or when instructing a body shop to mix panel paint for a repair.
          </p>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            How to Match Touch-Up Paint
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            With the correct factory paint code in hand, touch-up paint is available from multiple sources. OEM touch-up pens from the dealership use the original formula but are expensive and come in small quantities. Aftermarket suppliers offer the same formulation in larger bottles, spray cans, or pen applicators at lower cost.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            For small chips and scratches, a touch-up pen provides a quick, cost-effective fix. For larger scratches, a brush-on bottle and blending solvent produce a cleaner result. Panel repaints for fender benders or hail damage require custom-mixed professional paint from a body shop using the factory code as the base formulation.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Pair the paint code lookup with a full{" "}
            <Link href="/vin-check" className="text-primary-600 hover:underline font-medium">
              VIN history report
            </Link>{" "}
            to understand whether a vehicle has had paint work performed as part of a post-accident repair — which may affect your assessment of the vehicle&rsquo;s condition and value.
          </p>
        </div>
      </article>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-4">
        <RelatedChecks exclude="/paint-code-lookup" />
      </div>

      <section className="py-14 bg-slate-50">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Find the Exact Paint Code for Any Vehicle
          </h2>
          <p className="text-slate-700 mb-6">
            Enter a 17-character VIN to retrieve the factory paint code and color name for touch-up or body shop matching.
          </p>
          <VinSearchForm size="sm" />
        </div>
      </section>
    </>
  );
}
