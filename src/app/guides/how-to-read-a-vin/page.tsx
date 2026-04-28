import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";

export const metadata: Metadata = {
  title: "How to Read a VIN Number — Complete VIN Breakdown Guide",
  description:
    "Learn how to read a VIN number with our step-by-step guide. Understand all 17 VIN digits, including the WMI, VDS, and VIS sections, and what each position means.",
  keywords: [
    "how to read a VIN",
    "VIN number breakdown",
    "VIN digits meaning",
    "VIN decoder guide",
    "17 digit VIN explained",
    "WMI VDS VIS",
    "VIN position meaning",
    "read vehicle identification number",
  ],
  alternates: { canonical: "/guides/how-to-read-a-vin" },
  openGraph: {
    title: "How to Read a VIN Number — Complete VIN Breakdown Guide",
    description:
      "Learn how to read a VIN number with our step-by-step guide. Understand all 17 VIN digits and what each position means.",
    url: "https://carcheckervin.com/guides/how-to-read-a-vin",
    type: "article",
  },
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Read a VIN Number",
  description:
    "A step-by-step guide to reading and understanding all 17 characters of a Vehicle Identification Number (VIN).",
  step: [
    {
      "@type": "HowToStep",
      name: "Identify the World Manufacturer Identifier (positions 1-3)",
      text: "The first three characters form the WMI. Position 1 indicates the country of manufacture, position 2 identifies the manufacturer, and position 3 denotes the vehicle type or manufacturing division.",
    },
    {
      "@type": "HowToStep",
      name: "Read the Vehicle Descriptor Section (positions 4-8)",
      text: "Positions 4 through 8 form the VDS. These digits encode vehicle attributes such as body style, engine type, model, and series. The exact meaning varies by manufacturer.",
    },
    {
      "@type": "HowToStep",
      name: "Check the check digit (position 9)",
      text: "Position 9 is the check digit, a calculated value used to verify the VIN is legitimate. It is derived using a weighted mathematical formula applied to all other characters.",
    },
    {
      "@type": "HowToStep",
      name: "Determine the model year (position 10)",
      text: "Position 10 represents the model year using a standardized letter or number code. For example, R represents 2024, S represents 2025, and T represents 2026.",
    },
    {
      "@type": "HowToStep",
      name: "Find the assembly plant (position 11)",
      text: "Position 11 is a code assigned by the manufacturer to identify the specific assembly plant where the vehicle was built.",
    },
    {
      "@type": "HowToStep",
      name: "Read the production sequence number (positions 12-17)",
      text: "The final six characters are the sequential production number assigned to the vehicle as it rolls off the assembly line. This gives each vehicle its unique identifier.",
    },
  ],
};

const vinPositions = [
  {
    positions: "1",
    label: "Country of Origin",
    example: "1 = USA, 2 = Canada, J = Japan, W = Germany, K = South Korea",
  },
  {
    positions: "2",
    label: "Manufacturer",
    example:
      "G = General Motors, F = Ford, T = Toyota, H = Honda, B = BMW",
  },
  {
    positions: "3",
    label: "Vehicle Type / Division",
    example:
      "Identifies the vehicle type (passenger car, truck, SUV) or the specific division within the manufacturer",
  },
  {
    positions: "4 - 8",
    label: "Vehicle Attributes (VDS)",
    example:
      "Body style, engine type, model line, series, and restraint system. Meaning varies by manufacturer",
  },
  {
    positions: "9",
    label: "Check Digit",
    example:
      "A calculated value (0-9 or X) used to detect invalid or fraudulent VINs",
  },
  {
    positions: "10",
    label: "Model Year",
    example: "R = 2024, S = 2025, T = 2026, V = 2027",
  },
  {
    positions: "11",
    label: "Assembly Plant",
    example: "A code assigned by the manufacturer for the factory location",
  },
  {
    positions: "12 - 17",
    label: "Sequential Production Number",
    example:
      "A unique serial number assigned to each vehicle on the production line",
  },
];

export default function HowToReadAVinPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      <article className="pt-28 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Guides", href: "/guides" },
              { label: "How to Read a VIN" },
            ]}
          />

          <h1 className="mt-6 text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">
            How to Read a VIN Number
          </h1>
          <p className="mt-4 text-lg text-slate-500 leading-relaxed">
            A Vehicle Identification Number (VIN) is a 17-character code that
            serves as a fingerprint for every car, truck, and SUV on the road.
            Each character carries specific meaning. This guide breaks down every
            position so you can read any VIN at a glance.
          </p>

          {/* --- Visual VIN Breakdown --- */}
          <div className="mt-10 p-6 bg-slate-50 rounded-2xl border border-slate-200">
            <h2 className="text-lg font-bold text-slate-900 mb-4">
              VIN Structure at a Glance
            </h2>
            <div className="flex flex-wrap gap-1 font-mono text-sm sm:text-base justify-center">
              {["1", "H", "G", "B", "H", "4", "1", "J", "X", "M", "N", "1", "0", "9", "1", "8", "6"].map(
                (char, i) => {
                  let bg = "bg-primary-100 text-primary-700";
                  if (i >= 3 && i <= 7) bg = "bg-amber-100 text-amber-700";
                  if (i === 8) bg = "bg-red-100 text-red-700";
                  if (i >= 9 && i <= 10) bg = "bg-emerald-100 text-emerald-700";
                  if (i >= 11) bg = "bg-violet-100 text-violet-700";
                  return (
                    <div key={i} className="flex flex-col items-center gap-1">
                      <span className="text-[10px] text-slate-400">
                        {i + 1}
                      </span>
                      <span
                        className={`w-8 h-10 sm:w-10 sm:h-12 flex items-center justify-center rounded-lg font-bold ${bg}`}
                      >
                        {char}
                      </span>
                    </div>
                  );
                }
              )}
            </div>
            <div className="mt-4 flex flex-wrap gap-3 text-xs text-slate-500 justify-center">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-primary-100 inline-block" />
                WMI (1-3)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-amber-100 inline-block" />
                VDS (4-8)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-red-100 inline-block" />
                Check (9)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-emerald-100 inline-block" />
                VIS (10-11)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-violet-100 inline-block" />
                Serial (12-17)
              </span>
            </div>
          </div>

          {/* --- Three Sections --- */}
          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            The Three Sections of a VIN
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Every VIN is divided into three distinct sections defined by ISO
            standards 3779 and 3780. Understanding these sections is the first
            step to reading any VIN.
          </p>

          <h3 className="mt-8 text-xl font-semibold text-slate-900">
            1. World Manufacturer Identifier (WMI) - Positions 1 to 3
          </h3>
          <p className="mt-2 text-slate-600 leading-relaxed">
            The WMI tells you where the vehicle was made and who made it. The
            first character identifies the country of manufacture. For example,
            vehicles built in the United States start with 1, 4, or 5. Canadian
            vehicles start with 2, and Mexican vehicles with 3. Japan uses J,
            Germany uses W, South Korea uses K, and the United Kingdom uses S.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            The second character identifies the manufacturer. G stands for
            General Motors, F for Ford, T for Toyota, H for Honda, and so on.
            The third character narrows things further, specifying the vehicle
            type or the division within the manufacturer. Together, these three
            characters let you immediately identify the origin and maker of any
            vehicle.
          </p>

          <h3 className="mt-8 text-xl font-semibold text-slate-900">
            2. Vehicle Descriptor Section (VDS) - Positions 4 to 8
          </h3>
          <p className="mt-2 text-slate-600 leading-relaxed">
            The VDS encodes vehicle-specific attributes. These five characters
            describe the body style, engine type, model line, series, and
            restraint system. The exact meaning of each position varies by
            manufacturer because automakers have some flexibility in how they
            assign these codes.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            For example, one manufacturer might use position 4 for the body type
            and position 5 for the engine, while another reverses that order.
            This is why a{" "}
            <Link
              href="/vin-check"
              className="text-primary-600 hover:underline font-medium"
            >
              VIN decoder tool
            </Link>{" "}
            is so valuable: it knows the encoding scheme for every manufacturer
            and can translate these positions into plain language.
          </p>

          <h3 className="mt-8 text-xl font-semibold text-slate-900">
            3. Vehicle Identifier Section (VIS) - Positions 9 to 17
          </h3>
          <p className="mt-2 text-slate-600 leading-relaxed">
            The VIS starts with the check digit at position 9. This is a
            mathematically calculated value used to verify the entire VIN is
            valid. It helps detect typos and fraudulent VINs. The check digit
            can be any number from 0 through 9, or the letter X (which
            represents 10).
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Position 10 indicates the model year. A rotating system of letters
            and numbers is used, cycling through the alphabet (skipping I, O, Q,
            U, and Z) and digits. For instance, R represents 2024, S represents
            2025, and T represents 2026. Position 11 identifies the assembly
            plant. The final six positions (12 through 17) are the sequential
            production number, a unique serial assigned to the vehicle as it
            comes off the assembly line.
          </p>

          {/* --- Position Table --- */}
          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            Complete VIN Position Reference
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Use this table as a quick reference for each position in a
            17-character VIN.
          </p>

          <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-700">
                <tr>
                  <th className="px-4 py-3 font-semibold">Position</th>
                  <th className="px-4 py-3 font-semibold">Meaning</th>
                  <th className="px-4 py-3 font-semibold">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {vinPositions.map((row) => (
                  <tr key={row.positions} className="hover:bg-slate-50/50">
                    <td className="px-4 py-3 font-mono font-bold text-primary-600 whitespace-nowrap">
                      {row.positions}
                    </td>
                    <td className="px-4 py-3 font-medium text-slate-900">
                      {row.label}
                    </td>
                    <td className="px-4 py-3 text-slate-500">{row.example}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* --- Characters not allowed --- */}
          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            Characters Never Used in a VIN
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            VINs never contain the letters I, O, or Q. These characters were
            excluded from the standard because they can be easily confused with
            the numbers 1 and 0. If you see any of these letters in what claims
            to be a VIN, the number is either misread or fraudulent. This rule
            has been in effect since the 17-character VIN standard was adopted in
            1981.
          </p>

          {/* --- Why it matters --- */}
          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            Why Knowing How to Read a VIN Matters
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Understanding VIN structure empowers you in several important ways.
            When buying a used car, you can verify that the VIN on the dashboard
            matches the one on the title and door jamb. Discrepancies can
            indicate a stolen vehicle or one that has been rebuilt from parts of
            multiple cars (known as a "cloned" VIN).
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            You can also use the model year digit to confirm the seller is
            representing the correct year, and the country-of-origin digit to
            verify where the vehicle was actually manufactured. Many buyers
            assume a vehicle with a domestic brand name was built domestically,
            but the VIN reveals the truth.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            For the most complete picture, pair your VIN reading skills with a{" "}
            <Link
              href="/"
              className="text-primary-600 hover:underline font-medium"
            >
              comprehensive VIN check
            </Link>
            . Our tool decodes every position and pulls in additional data
            including full specs, equipment lists, recall information, and market
            values.
          </p>
        </div>
      </article>

      {/* --- CTA --- */}
      <section className="py-14 bg-slate-50">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Decode Any VIN Instantly
          </h2>
          <p className="text-slate-500 mb-6">
            Paste a 17-character VIN below to see the full breakdown, vehicle
            specs, and history report.
          </p>
          <VinSearchForm size="sm" />
        </div>
      </section>
    </>
  );
}
