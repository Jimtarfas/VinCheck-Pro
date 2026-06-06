import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";
import { ORG_AUTHOR } from "@/lib/seo/author";

export const metadata: Metadata = {
  title: "Build Sheet by VIN — Original Factory Build Record",
  description:
    "Look up the original factory build sheet for any vehicle by VIN. See every option, package, color code, and factory-installed equipment exactly as ordered.",
  keywords: [
    "build sheet by VIN",
    "factory build sheet",
    "original build record",
    "VIN build data",
    "vehicle factory options",
    "how to get build sheet",
  ],
  alternates: { canonical: "/build-sheet" },
  openGraph: {
    title: "Build Sheet by VIN — Original Factory Build Record",
    description:
      "Look up the original factory build sheet for any vehicle by VIN. See every option, package, color code, and factory-installed equipment.",
    url: "https://www.carcheckervin.com/build-sheet",
    type: "article",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Build Sheet by VIN",
  description:
    "Learn how to look up the original factory build sheet for any vehicle by VIN, including options, packages, color codes, and equipment.",
  author: ORG_AUTHOR,
  publisher: {
    "@type": "Organization",
    name: "CarCheckerVIN",
    url: "https://www.carcheckervin.com",
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": "https://www.carcheckervin.com/build-sheet",
  },
  datePublished: "2026-05-04",
  dateModified: "2026-05-04",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is a build sheet?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A build sheet — also called a build record, broadcast sheet, or factory invoice — is the manufacturer's internal production document listing the original factory configuration of a single vehicle. Tied to the VIN, it records the trim level, paint and interior codes, engine and transmission, and every factory-installed option using internal manufacturer codes. It documents exactly how the car was ordered and assembled, which is more detailed than the consumer window sticker.",
      },
    },
    {
      "@type": "Question",
      name: "How do I get a build sheet by VIN?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Enter the 17-character VIN into the lookup form above. The system queries manufacturer build databases linked to that VIN and returns the decoded original factory configuration where coverage exists. Availability depends on the manufacturer and model year — modern vehicles are well covered, while some older or imported models may have limited or no decoded data. You can also request the original build record directly from the manufacturer.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between a build sheet and a window sticker?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Both describe the same vehicle but serve different purposes. The window sticker — the Monroney label — is the federally mandated new-car disclosure showing options in plain language with retail pricing and fuel-economy ratings. The build sheet is the factory production document that lists the same equipment using internal manufacturer option codes, plus assembly details like plant and build sequence. The build sheet is more technical; the window sticker is consumer-facing.",
      },
    },
    {
      "@type": "Question",
      name: "What information is on a build sheet?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A build sheet typically lists the trim level, exterior paint code, interior trim code, engine and transmission, and every factory-installed option and package using manufacturer codes (such as GM RPO codes). It also commonly records the assembly plant, build date or sequence, and destination or ordering dealer. The exact fields vary by manufacturer and model year, but the goal is a complete component-level record of the car as it left the factory.",
      },
    },
    {
      "@type": "Question",
      name: "How do I find the original factory options by VIN?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Run a build sheet or window sticker lookup using the VIN. The VIN itself encodes the manufacturer, model year, and plant, but the full option list lives in the manufacturer's build database linked to that VIN — not in the VIN characters alone. A build sheet lookup retrieves that database record and returns the installed options, packages, and color codes as originally ordered, where the manufacturer's data coverage allows.",
      },
    },
    {
      "@type": "Question",
      name: "Can you get a build sheet for any car?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Not always. Coverage depends on the manufacturer and model year. Most mainstream vehicles built since the 1980s have retrievable digital build data, and many manufacturers offer build records or window-sticker reprints for their own vehicles. Older, rare, low-volume, or some imported models may have incomplete or unavailable decoded data. When digital records are missing, a surviving paper build sheet found inside the vehicle may be the only original source.",
      },
    },
    {
      "@type": "Question",
      name: "Where is the original build sheet located in a car?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "During assembly, some manufacturers physically tucked a paper build sheet inside the vehicle, where it occasionally survives for decades. Common hiding spots include under or behind seat cushions, beneath the carpet, on top of the gas tank, inside door panels, and above the headliner. Not every car has one, and survival is never guaranteed. For a reliable record, use a VIN-based build sheet lookup or request the build record from the manufacturer.",
      },
    },
  ],
};

const FAQS = faqSchema.mainEntity.map((q) => ({
  question: q.name,
  answer: q.acceptedAnswer.text,
}));

export default function BuildSheetPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <article className="pt-28 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Build Sheet" },
            ]}
          />

          <h1 className="mt-6 text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">
            Build Sheet by VIN
          </h1>
          <p className="mt-4 text-lg text-slate-700 leading-relaxed">
            A factory build sheet is the internal production document that lists every option, code, and specification for a vehicle as it was assembled at the factory. Unlike the consumer-facing window sticker, the build sheet uses manufacturer option codes that correspond to specific equipment — giving collectors, restorers, and enthusiasts the definitive factory record. Looking up a build sheet by VIN is the most reliable way to verify what a vehicle was originally built with.
          </p>

          <div className="mt-8 p-6 bg-primary-50 rounded-2xl border border-primary-100">
            <h2 className="text-lg font-bold text-slate-900 mb-3">
              Look Up the Factory Build Sheet
            </h2>
            <VinSearchForm size="sm" />
          </div>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            What Is a Factory Build Sheet
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            A factory build sheet — also called a broadcast sheet, build record, or window data sheet — is a production document generated by the manufacturer&rsquo;s assembly plant for each individual vehicle. It travels with the vehicle through the assembly process and serves as the assembly line&rsquo;s instructions: every worker on the line can see exactly what goes on this specific car.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            The build sheet is distinct from the window sticker. While the window sticker is a consumer document written in plain language with retail pricing, the build sheet uses internal manufacturer option codes (RPO codes at GM, AO codes at Ford, for example). These codes are far more specific and can identify individual components, production sequences, and plant-specific configurations that never appear on the sticker.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Physical build sheets were sometimes hidden inside the vehicle during assembly — stuffed behind seat cushions, under carpet, or inside door panels — where they occasionally survive decades later. Digital build data, however, is preserved in manufacturer databases and can be retrieved electronically through a VIN lookup for most vehicles produced after the 1980s.
          </p>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            What the Build Sheet Contains
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            A factory build sheet contains the complete specification of a vehicle at the component level. The depth of information varies by manufacturer and model year, but typically includes far more granular data than the consumer window sticker.
          </p>
          <ul className="mt-4 space-y-2 text-slate-600">
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span><strong>Engine and transmission codes</strong> &mdash; specific engine variant, displacement, horsepower rating, and transmission type.</span>
            </li>
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span><strong>Exterior and interior color codes</strong> &mdash; manufacturer paint codes and interior trim codes for exact color matching.</span>
            </li>
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span><strong>Option and package codes</strong> &mdash; every factory option installed, from axle ratios to audio systems to appearance packages.</span>
            </li>
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span><strong>Production plant and date</strong> &mdash; the assembly facility and build date sequence.</span>
            </li>
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span><strong>Destination and dealer codes</strong> &mdash; the ordering dealer and geographic destination for the vehicle.</span>
            </li>
          </ul>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            Build Sheet vs. Window Sticker
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            The build sheet and window sticker represent two different views of the same underlying factory data. The window sticker is the marketing document — it presents factory options in consumer language with retail pricing and fuel economy ratings. The build sheet is the production document — it presents the same options in manufacturer codes used on the assembly line.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            For everyday used car buyers, the window sticker lookup provides all the information needed to verify factory equipment and original MSRP. The build sheet becomes essential for enthusiasts, collectors, and restorers who need to verify matching-numbers configurations or source correct original-spec replacement parts.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Combine a build sheet lookup with a full{" "}
            <Link href="/vin-check" className="text-primary-600 hover:underline font-medium">
              VIN history report
            </Link>{" "}
            and an{" "}
            <Link href="/accident-history-check" className="text-primary-600 hover:underline font-medium">
              accident history check
            </Link>{" "}
            to get both the factory origin and the subsequent history of any vehicle.
          </p>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            How Build Sheets Help Collectors &amp; Restorers
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            For classic car collectors, build sheet verification can mean the difference between a correct, documented car and an undocumented clone. High-value muscle cars, limited editions, and special-order vehicles often command premiums of tens of thousands of dollars over otherwise identical unverified examples. The build sheet provides the factory documentation that supports authenticity claims.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Restorers use build data to source correct original-specification parts. A 1969 Camaro Z/28 with specific factory options requires different components than a base model — the build sheet identifies the correct part numbers, colors, and assembly specifications. This level of detail ensures a show-quality restoration that can withstand judging scrutiny.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Pair the build sheet data with a{" "}
            <Link href="/salvage-title-check" className="text-primary-600 hover:underline font-medium">
              salvage title check
            </Link>{" "}
            and an{" "}
            <Link href="/odometer-check" className="text-primary-600 hover:underline font-medium">
              odometer check
            </Link>{" "}
            to verify both the factory configuration and the full ownership and damage history of a collectible vehicle.
          </p>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            Decoding Your VIN Build Data
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            The 17-character VIN itself encodes a subset of the build data: the World Manufacturer Identifier (positions 1–3), vehicle descriptor section (positions 4–8), check digit (position 9), model year (position 10), plant (position 11), and sequential production number (positions 12–17). This embedded data confirms the vehicle&rsquo;s origin and production sequence.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            However, the VIN alone does not contain option and equipment data — that resides in the manufacturer&rsquo;s build database, linked to the VIN. A build sheet lookup queries that database and returns the complete option list, which is far richer than what can be decoded from the VIN characters alone.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            For complete pre-purchase protection, always run a build sheet or window sticker lookup alongside a{" "}
            <Link href="/lemon-check" className="text-primary-600 hover:underline font-medium">
              lemon check
            </Link>{" "}
            and a{" "}
            <Link href="/stolen-vehicle-check" className="text-primary-600 hover:underline font-medium">
              stolen vehicle check
            </Link>
            .
          </p>
        </div>
      </article>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-4">
        <RelatedChecks exclude="/build-sheet" />
      </div>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <h2 className="text-2xl font-bold text-slate-900">
          Frequently Asked Questions
        </h2>
        <div className="mt-6 space-y-3">
          {FAQS.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-xl border border-slate-200 bg-white p-5"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-4 list-none [&::-webkit-details-marker]:hidden">
                <h3 className="text-base sm:text-lg font-semibold text-slate-900 m-0">
                  {faq.question}
                </h3>
                <span className="text-2xl text-primary-600 transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-slate-600 leading-relaxed">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      <section className="py-14 bg-slate-50 mt-12">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Look Up the Factory Build Sheet
          </h2>
          <p className="text-slate-700 mb-6">
            Enter a 17-character VIN to retrieve the original factory build data, option codes, and equipment list.
          </p>
          <VinSearchForm size="sm" />
        </div>
      </section>
    </>
  );
}
