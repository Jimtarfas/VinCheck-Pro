import type { Metadata } from "next";
import Link from "next/link";
import { hreflangAlternates } from "@/lib/seo/hreflang";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import { ORG_AUTHOR } from "@/lib/seo/author";

export const metadata: Metadata = {
  title: "What is a VIN Number? Complete Guide to Vehicle Identification Numbers",
  description:
    "Learn what a VIN number is, why it matters, and where to find it on any vehicle. Comprehensive guide to Vehicle Identification Numbers with history, structure, and practical uses.",
  keywords: [
    "what is a VIN number",
    "VIN meaning",
    "vehicle identification number",
    "VIN number explained",
    "what does VIN stand for",
    "VIN definition",
    "where to find VIN",
    "VIN number location",
  ],
  alternates: hreflangAlternates("/guides/what-is-a-vin-number"),
  openGraph: {
    title:
      "What is a VIN Number? Complete Guide to Vehicle Identification Numbers",
    description:
      "Learn what a VIN number is, why it matters, and where to find it. Everything you need to know about Vehicle Identification Numbers.",
    url: "https://www.carcheckervin.com/guides/what-is-a-vin-number",
    type: "article",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline:
    "What is a VIN Number? Complete Guide to Vehicle Identification Numbers",
  description:
    "Learn what a VIN number is, why it matters, and where to find it on any vehicle.",
  author: ORG_AUTHOR,
  publisher: {
    "@type": "Organization",
    name: "CarCheckerVIN",
    url: "https://www.carcheckervin.com",
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": "https://www.carcheckervin.com/guides/what-is-a-vin-number",
  },
  datePublished: "2026-04-16",
  dateModified: "2026-04-16",
};

const vinLocations = [
  {
    title: "Dashboard (Driver Side)",
    description:
      "Look through the windshield on the driver side where the dashboard meets the glass. This is the most common location and can be read from outside the vehicle.",
  },
  {
    title: "Driver-Side Door Jamb",
    description:
      "Open the driver door and check the sticker on the door frame. This sticker also displays tire pressure info and the manufacturing date.",
  },
  {
    title: "Vehicle Registration & Title",
    description:
      "Your state registration card and vehicle title both list the VIN. These are especially useful if you cannot physically access the vehicle.",
  },
  {
    title: "Insurance Documents",
    description:
      "Your insurance ID card and policy documents include the VIN for every covered vehicle.",
  },
  {
    title: "Engine Block",
    description:
      "Most manufacturers stamp the VIN onto the engine block. This is used by law enforcement to verify identity on vehicles with swapped dashboards.",
  },
  {
    title: "Under the Spare Tire",
    description:
      "Some manufacturers place a VIN plate in the trunk beneath the spare tire, providing yet another reference point.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is a VIN number?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A VIN number is a Vehicle Identification Number, a unique 17-character code that the manufacturer assigns to every car, truck, SUV, van, and motorcycle. Since 1981 it follows a standardized format set by NHTSA (FMVSS 115) and aligned with ISO 3779. It uses letters and digits but never the letters I, O, or Q, and it identifies one specific vehicle for its entire life.",
      },
    },
    {
      "@type": "Question",
      name: "What is a VIN used for?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A VIN is used to uniquely identify and track a single vehicle. It is the key DMVs use to register and title a car, insurers use to set premiums and write policies, manufacturers use to issue recalls by VIN range, and history reports use to compile accident, odometer, and ownership records. Law enforcement also relies on it to identify stolen or recovered vehicles.",
      },
    },
    {
      "@type": "Question",
      name: "Is saying 'VIN number' redundant?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Technically yes. VIN already stands for Vehicle Identification Number, so 'VIN number' literally means 'Vehicle Identification Number number,' similar to saying 'ATM machine' or 'PIN number.' Despite the redundancy, the phrase is so widely used that both 'VIN' and 'VIN number' are universally understood to mean the same 17-character vehicle identifier.",
      },
    },
    {
      "@type": "Question",
      name: "Do all vehicles have a VIN?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nearly all do. Every car, truck, SUV, van, and motorcycle sold in the United States since 1981 carries a standardized 17-character VIN. Vehicles built before 1981 also have an identifying serial number, but those used non-standard formats of roughly 5 to 13 characters that vary by manufacturer. Some trailers, off-road equipment, and very old vehicles may use different identifier systems.",
      },
    },
    {
      "@type": "Question",
      name: "Is a VIN the same as a license plate or title number?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. A VIN is permanently assigned by the manufacturer and never changes for the life of the vehicle. A license plate is issued by the state and changes when you move, renew, or transfer the car, and the title number is a document reference that changes each time a new title is issued. Only the VIN stays constant across owners, states, and decades.",
      },
    },
    {
      "@type": "Question",
      name: "Can two cars have the same VIN?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No two legitimately manufactured vehicles share the same VIN. The 17-character format combines manufacturer codes, model-year indicators, and sequential production numbers specifically to guarantee uniqueness worldwide. If two vehicles appear to have identical VINs, one is almost certainly a clone, where a stolen car is given the VIN of a legally registered vehicle to disguise it. Duplicate VINs are a red flag for fraud.",
      },
    },
    {
      "@type": "Question",
      name: "Is my VIN confidential or safe to share?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A VIN is not confidential. It is stamped on the dashboard and visible through the windshield of any parked vehicle, so sharing it with buyers, mechanics, or insurers is normal and necessary. It is not a secret like a Social Security number. Still, avoid posting it alongside your full name and address in public listings, since thieves can misuse an exposed VIN for cloning.",
      },
    },
  ],
};

const FAQS = faqSchema.mainEntity.map((q) => ({
  question: q.name,
  answer: q.acceptedAnswer.text,
}));

export default function WhatIsAVinNumberPage() {
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
              { label: "Guides", href: "/guides" },
              { label: "What Is a VIN Number?" },
            ]}
          />

          <h1 className="mt-6 text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">
            What Is a VIN Number?
          </h1>
          <p className="mt-4 text-lg text-slate-700 leading-relaxed">
            A Vehicle Identification Number (VIN) is a unique 17-character code
            assigned to every motor vehicle manufactured since 1981. Think of it
            as a fingerprint for your car: no two vehicles in the world share
            the same VIN, making it the single most reliable way to identify any
            car, truck, or SUV.
          </p>

          {/* --- What VIN Stands For --- */}
          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            What Does VIN Stand For?
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            VIN stands for <strong>Vehicle Identification Number</strong>. You
            may hear people say &ldquo;VIN number,&rdquo; which is technically
            redundant (like saying ATM machine), but the phrase has become so
            common that both forms are widely understood. Whether you call it a
            VIN or a VIN number, it refers to the same 17-character identifier.
          </p>

          {/* --- Brief History --- */}
          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            A Brief History of the VIN
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Before VINs were standardized, manufacturers used their own
            numbering systems, which varied in length and format. This made it
            difficult for regulators, insurance companies, and law enforcement
            to track vehicles across state lines or between owners.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            In 1954, the United States began requiring manufacturers to stamp
            serial numbers onto vehicles, but there was no universal format. The
            modern 17-character VIN standard was established in 1981 by the
            National Highway Traffic Safety Administration (NHTSA) through
            Federal Motor Vehicle Safety Standard No. 115. This standard,
            aligned with ISO 3779 and ISO 3780, created a globally recognized
            format that every automaker must follow.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Since 1981, every car, truck, SUV, van, and motorcycle sold in the
            United States has carried a VIN in this standardized format. The
            system ensures that every vehicle produced anywhere in the world can
            be uniquely identified for its entire lifespan.
          </p>

          {/* --- Structure overview --- */}
          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            How Is a VIN Structured?
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            A VIN is composed of 17 characters, using a combination of uppercase
            letters and numbers. The letters I, O, and Q are excluded to prevent
            confusion with the digits 1 and 0. Each VIN is divided into three
            sections:
          </p>
          <ul className="mt-4 space-y-3 text-slate-600">
            <li className="flex gap-3">
              <span className="font-bold text-primary-600 whitespace-nowrap">
                Positions 1-3:
              </span>
              <span>
                <strong>World Manufacturer Identifier (WMI)</strong> &mdash;
                identifies the country, manufacturer, and vehicle type.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-primary-600 whitespace-nowrap">
                Positions 4-8:
              </span>
              <span>
                <strong>Vehicle Descriptor Section (VDS)</strong> &mdash;
                encodes body style, engine, model, and series.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-primary-600 whitespace-nowrap">
                Positions 9-17:
              </span>
              <span>
                <strong>Vehicle Identifier Section (VIS)</strong> &mdash;
                includes the check digit, model year, assembly plant, and
                production sequence number.
              </span>
            </li>
          </ul>
          <p className="mt-4 text-slate-600 leading-relaxed">
            For a detailed position-by-position breakdown, see our{" "}
            <Link
              href="/guides/how-to-read-a-vin"
              className="text-primary-600 hover:underline font-medium"
            >
              How to Read a VIN
            </Link>{" "}
            guide.
          </p>

          {/* --- Where to Find --- */}
          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            Where to Find the VIN on a Vehicle
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Manufacturers place the VIN in multiple locations on every vehicle.
            This redundancy helps law enforcement verify a vehicle&rsquo;s
            identity even if one plate is damaged or tampered with.
          </p>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {vinLocations.map(({ title, description }) => (
              <div
                key={title}
                className="p-5 bg-slate-50 rounded-xl border border-slate-200"
              >
                <h3 className="font-semibold text-slate-900">{title}</h3>
                <p className="mt-1.5 text-sm text-slate-700 leading-relaxed">
                  {description}
                </p>
              </div>
            ))}
          </div>

          {/* --- Why VINs Matter --- */}
          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            Why Do VIN Numbers Matter?
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            VINs serve as the backbone of vehicle tracking in the automotive
            industry. Every title transfer, insurance claim, recall, accident
            report, and service record is tied to the VIN. This makes VINs
            indispensable in several situations.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">
            Buying a Used Vehicle
          </h3>
          <p className="mt-2 text-slate-600 leading-relaxed">
            Running a{" "}
            <Link
              href="/vin-check"
              className="text-primary-600 hover:underline font-medium"
            >
              VIN check
            </Link>{" "}
            before purchasing a used car is one of the most important steps a
            buyer can take. A VIN report reveals the vehicle&rsquo;s history
            including previous owners, accident records, title status, odometer
            readings, and open recalls. Without this information, buyers risk
            overpaying or purchasing a vehicle with hidden damage.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">
            Safety Recalls
          </h3>
          <p className="mt-2 text-slate-600 leading-relaxed">
            Manufacturers issue safety recalls based on VIN ranges. By checking
            your VIN against the NHTSA recall database, you can determine
            whether your vehicle is affected by any open recalls. This is
            critical because recall repairs are always free at authorized
            dealerships, but you must know the recall exists to take advantage of
            it.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">
            Insurance and Registration
          </h3>
          <p className="mt-2 text-slate-600 leading-relaxed">
            Insurance companies use VINs to determine premiums. The VIN tells
            the insurer the exact vehicle model, safety features, and equipment,
            all of which affect pricing. State DMVs use VINs to register
            vehicles and track title transfers. An accurate VIN ensures your
            vehicle is properly documented.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">
            Theft Prevention and Recovery
          </h3>
          <p className="mt-2 text-slate-600 leading-relaxed">
            Law enforcement agencies rely on VINs to identify stolen vehicles.
            The multiple VIN locations on a vehicle make it difficult for
            thieves to alter all of them. If a vehicle is recovered, officers
            compare VIN plates across different locations to verify its identity.
            The National Motor Vehicle Title Information System (NMVTIS)
            maintains a central database that law enforcement can query by VIN.
          </p>

          {/* --- Vehicles before 1981 --- */}
          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            What About Vehicles Made Before 1981?
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Vehicles manufactured before 1981 used serial numbers that varied in
            length and format from one manufacturer to another. These older
            serial numbers can range from 5 to 13 characters and do not follow
            the standardized structure described above. While some VIN lookup
            tools support pre-1981 vehicles, the data available is typically
            limited compared to post-1981 models. Our{" "}
            <Link
              href="/"
              className="text-primary-600 hover:underline font-medium"
            >
              VIN decoder
            </Link>{" "}
            covers all vehicles from 1981 onward.
          </p>

          {/* --- Frequently Asked Questions --- */}
          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            Frequently Asked Questions
          </h2>
          <div className="mt-6 space-y-3">
            {FAQS.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-xl border border-slate-200 bg-slate-50 p-5 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 list-none">
                  <h3 className="text-base sm:text-lg font-semibold text-slate-900 m-0">
                    {faq.question}
                  </h3>
                  <span className="flex-shrink-0 text-2xl font-light text-primary-600 transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-slate-600 leading-relaxed">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </article>

      {/* --- CTA --- */}
      <section className="py-14 bg-slate-50">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Look Up Any VIN for Free
          </h2>
          <p className="text-slate-700 mb-6">
            Enter a VIN below to decode it instantly and see the full vehicle
            profile.
          </p>
          <VinSearchForm size="sm" />
        </div>
      </section>
    </>
  );
}
