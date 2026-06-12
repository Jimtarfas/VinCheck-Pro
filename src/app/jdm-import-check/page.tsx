import type { Metadata } from "next";
import Link from "next/link";
import { hreflangAlternates } from "@/lib/seo/hreflang";
import { Check } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";
import { ORG_AUTHOR } from "@/lib/seo/author";

export const metadata: Metadata = {
  title: "JDM Import VIN Check — Japanese Import Vehicle History",
  description:
    "Check the history of any Japanese Domestic Market (JDM) import vehicle. Verify mileage (km to miles), import records, Japanese title history, and US compliance status.",
  keywords: [
    "JDM import check",
    "Japanese car VIN check",
    "JDM VIN decoder",
    "import vehicle history",
    "JDM mileage check",
    "Japanese import compliance",
  ],
  alternates: hreflangAlternates("/jdm-import-check"),
  openGraph: {
    title: "JDM Import VIN Check — Japanese Import Vehicle History",
    description:
      "Check the history of any JDM import vehicle. Verify mileage, import records, and US compliance status.",
    url: "https://www.carcheckervin.com/jdm-import-check",
    type: "article",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "JDM Import VIN Check",
  description:
    "Learn how to check the history of Japanese Domestic Market import vehicles, including mileage verification, import records, and US compliance status.",
  author: ORG_AUTHOR,
  publisher: {
    "@type": "Organization",
    name: "CarCheckerVIN",
    url: "https://www.carcheckervin.com",
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": "https://www.carcheckervin.com/jdm-import-check",
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
      name: "What is the 25-year import rule?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The US '25-year rule' (administered by NHTSA and US Customs under 49 CFR 591) lets a nonconforming vehicle be imported once it is at least 25 years old, measured from its month of manufacture. At that age it is exempt from Federal Motor Vehicle Safety Standards (FMVSS) and from EPA conformity requirements. This is why JDM models never sold in America, like the Nissan Skyline GT-R, become legally importable only after they turn 25.",
      },
    },
    {
      "@type": "Question",
      name: "Do JDM imports have a 17-character VIN or a Japanese chassis code?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most Japanese-domestic-market vehicles do not use a 17-character VIN. Instead they carry a manufacturer chassis code (also called a frame or model number), such as JZA80 for a Toyota Supra or BNR32 for a Nissan Skyline GT-R, followed by a sequential production number. A standardized 17-character US VIN was not required for the Japan market, so JDM cars are identified by this shorter chassis/frame number until they are titled in the United States.",
      },
    },
    {
      "@type": "Question",
      name: "How do I decode a Japanese chassis number?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A Japanese chassis number combines a model code with a production sequence, for example BNR32-123456. The letter-and-number model code identifies the platform, body, and often the engine: in BNR32, 'BNR32' designates the R32-generation Skyline GT-R with the RB26DETT engine. The digits after the dash are the unit's build sequence. Decoding is manufacturer-specific, so confirm the code against the maker's chassis catalog rather than assuming a universal format.",
      },
    },
    {
      "@type": "Question",
      name: "Can you run a US history report on a JDM import?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can, but be aware of a major limitation: US history databases such as NMVTIS generally hold little or no record for a freshly imported JDM vehicle, because all of its history happened in Japan before it arrived. NMVTIS draws from US state DMVs, insurers, and salvage operators, none of which saw the car. A meaningful US record only begins after the vehicle clears customs and receives a US title and VIN.",
      },
    },
    {
      "@type": "Question",
      name: "How do I check a JDM import's history before it was brought to the US?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Because US databases will not cover the Japan period, the primary sources are Japanese auction sheets and the export/deregistration certificate. Auction sheets from houses like USS, TAA, or JU record the mileage, a graded condition score (typically 1 to 5), and a damage map at the time of sale. The export certificate documents the vehicle as it left Japan. Together these are the best evidence of a JDM import's pre-import condition and mileage.",
      },
    },
    {
      "@type": "Question",
      name: "What is a deregistration or export certificate?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "When a vehicle is exported from Japan, its domestic registration is cancelled and Japanese authorities issue a deregistration (or export) certificate. This document proves the car was officially removed from Japan's registry and lawfully exported, and it typically records the chassis code, recorded mileage, and export date. US importers use it during customs entry, and it is a key authenticity record buyers should ask to see for any JDM import.",
      },
    },
    {
      "@type": "Question",
      name: "How do I verify a JDM import was legally imported?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Confirm the vehicle was at least 25 years old at the time of import (or, rarely, meets full FMVSS and EPA compliance), then verify the paper trail: a US Customs and Border Protection entry record (CBP Form 7501) with bond release, the Japanese export/deregistration certificate, and a US title issued by the state of first registration. Illegally imported vehicles cannot be lawfully titled and may be subject to seizure, so this documentation is essential before purchase.",
      },
    },
  ],
};

const FAQS = faqSchema.mainEntity.map((q) => ({
  question: q.name,
  answer: q.acceptedAnswer.text,
}));

export default function JdmImportCheckPage() {
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
              { label: "JDM Import Check" },
            ]}
          />

          <h1 className="mt-6 text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">
            JDM Import VIN Check
          </h1>
          <p className="mt-4 text-lg text-slate-700 leading-relaxed">
            Japanese Domestic Market (JDM) vehicles are among the most desirable imports in the US enthusiast community — models like the Nissan Skyline GT-R, Honda NSX-R, Subaru Impreza STI Version 6, and Toyota Supra RZ were never officially sold in America. As these vehicles become eligible under the 25-year import rule, verifying their history, mileage, and compliance status is essential for any buyer.
          </p>

          <div className="mt-8 p-6 bg-primary-50 rounded-2xl border border-primary-100">
            <h2 className="text-lg font-bold text-slate-900 mb-3">
              Check a JDM Import Vehicle
            </h2>
            <VinSearchForm size="sm" />
          </div>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            What Is a JDM Import
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Japanese Domestic Market vehicles are cars, trucks, and motorcycles manufactured for sale within Japan, often with different specifications than the versions exported to other markets. Japan&rsquo;s rigorous Shaken (vehicle inspection) system incentivizes owners to sell their vehicles at relatively low mileage compared to equivalent Western vehicles, making many JDM imports available with well-documented low-mileage histories.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            US import regulations under 49 CFR Part 591 (the &ldquo;25-year rule&rdquo;) allow vehicles that are at least 25 years old to be imported without meeting current US Federal Motor Vehicle Safety Standards (FMVSS), making them legal for registration in most states. This rule opened the door to iconic vehicles from the late 1990s and early 2000s that were previously inaccessible to US buyers.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            The JDM import market has grown significantly, and with it the potential for fraud: mileage manipulation, title fabrication, compliance misrepresentation, and importation of vehicles that don&rsquo;t actually meet eligibility requirements. A thorough JDM import check protects buyers from all of these risks.
          </p>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            How JDM VINs Differ from US VINs
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Japanese vehicles sold exclusively in Japan do not use the standardized 17-character NHTSA VIN format — they use Japan&rsquo;s own vehicle identification system, which is shorter and structured differently. Japanese VINs encode the model code (chassis designation), engine type, and sequential production number in a format that varies by manufacturer.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            When a JDM vehicle is imported to the United States, US Customs and Border Protection (CBP) assigns a customs entry number, and the importer typically obtains a US title through the state DMV using the Japanese chassis number as the VIN (or a modified version of it). The resulting US title may show a VIN that doesn&rsquo;t conform to standard 17-character format, which is normal for legitimate JDM imports.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            The difference in VIN format means that standard US VIN history databases will have limited information about the vehicle&rsquo;s Japanese ownership history. Auction records from Japanese vehicle auction platforms and Japanese vehicle history services can provide the pre-import history that US databases cannot.
          </p>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            Verifying JDM Mileage
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Mileage verification for JDM imports requires special attention because Japan uses kilometers, not miles. A vehicle with 60,000 km on the odometer has approximately 37,000 miles of actual use — a significant difference that unscrupulous sellers sometimes exploit by presenting the kilometer figure as miles to make the vehicle appear lower-mileage than it actually is.
          </p>
          <ul className="mt-4 space-y-2 text-slate-600">
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span>Always confirm whether odometer readings are in kilometers or miles and perform the appropriate conversion (multiply km by 0.621 to get miles).</span>
            </li>
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span>Japanese auction export certificates (typically from USS, TAA, or JU auctions) document the mileage at the time of export sale and are a reliable reference.</span>
            </li>
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span>US title records should document the mileage at import; significant discrepancies between the import mileage and current mileage require explanation.</span>
            </li>
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span>Japanese auction grade certificates rate condition on a 1–5 scale and document any damage at time of auction — these should accompany the vehicle.</span>
            </li>
          </ul>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            Import Compliance and US Registration
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Legal JDM import requires compliance with US customs regulations and, in many states, compliance with state registration requirements. The vehicle must be at least 25 years old to qualify for the standard 25-year rule exemption, or must meet NHTSA and EPA compliance standards for newer vehicles (which is extremely rare for JDM-specific vehicles).
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Individual states have varying requirements for registering imported vehicles. California, for example, has additional emissions requirements (CARB compliance) that can complicate or prevent registration of some JDM vehicles. Some states require a structural inspection before registering imported vehicles. Always research your state&rsquo;s specific requirements before purchasing a JDM import.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Verify that any JDM vehicle you consider purchasing was legally imported through a licensed US importer, has cleared customs with proper documentation (CBP entry records, bond release), and has a US title from the state where it was first registered. Illegally imported vehicles cannot be registered and may be subject to seizure.
          </p>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            Popular JDM Models and What to Look For
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            The JDM import market is dominated by a handful of iconic models that command strong prices from enthusiast buyers. Each model has specific concerns that buyers should verify through history checks and physical inspection.
          </p>
          <ul className="mt-4 space-y-2 text-slate-600">
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span><strong>Nissan Skyline GT-R (R32, R33, R34)</strong> &mdash; verify engine matching numbers (RB26DETT), check for turbocharger rebuilds, and confirm clean title from a licensed importer.</span>
            </li>
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span><strong>Toyota Supra (JZA80)</strong> &mdash; confirm 2JZ-GTE twin-turbo engine if claimed, verify gearbox (6-speed is highly desirable), check for track damage.</span>
            </li>
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span><strong>Honda NSX / NSX-R</strong> &mdash; confirm NSX-R specification (lighter weight, no A/C or radio), verify mileage against Japanese auction documentation.</span>
            </li>
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span><strong>Subaru Impreza WRX STI</strong> &mdash; verify engine (EJ20 vs. EJ207), check differential condition, and confirm no major rally or track damage.</span>
            </li>
          </ul>
          <p className="mt-4 text-slate-600 leading-relaxed">
            For any JDM purchase, also run a{" "}
            <Link href="/stolen-vehicle-check" className="text-primary-600 hover:underline font-medium">
              stolen vehicle check
            </Link>{" "}
            and a full{" "}
            <Link href="/vin-check" className="text-primary-600 hover:underline font-medium">
              VIN history report
            </Link>{" "}
            on the US chassis number to capture any domestic history after import.
          </p>
        </div>
      </article>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <h2 className="text-2xl font-bold text-slate-900">
          Frequently Asked Questions
        </h2>
        <div className="mt-6 space-y-3">
          {FAQS.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-xl border border-slate-200 bg-white p-5 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-4 list-none">
                <h3 className="text-base sm:text-lg font-semibold text-slate-900 m-0">
                  {faq.question}
                </h3>
                <span className="text-2xl text-primary-600 transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-slate-600 leading-relaxed">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-4">
        <RelatedChecks exclude="/jdm-import-check" />
      </div>

      <section className="py-14 bg-slate-50">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Check Any JDM Import Vehicle
          </h2>
          <p className="text-slate-700 mb-6">
            Enter the VIN or chassis number to check import records, mileage history, and US compliance status for any JDM vehicle.
          </p>
          <VinSearchForm size="sm" />
        </div>
      </section>
    </>
  );
}
