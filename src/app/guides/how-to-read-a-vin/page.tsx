import type { Metadata } from "next";
import Link from "next/link";
import { hreflangAlternates } from "@/lib/seo/hreflang";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";

export const metadata: Metadata = {
  title: "How to Read a VIN — Complete VIN Breakdown",
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
    "VIN year chart",
    "VIN model year code",
    "10th digit VIN year",
    "VIN year code chart",
  ],
  alternates: hreflangAlternates("/guides/how-to-read-a-vin"),
  openGraph: {
    title: "How to Read a VIN Number — Complete VIN Breakdown Guide",
    description:
      "Learn how to read a VIN number with our step-by-step guide. Understand all 17 VIN digits and what each position means.",
    url: "https://www.carcheckervin.com/guides/how-to-read-a-vin",
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

// Position-level FAQ. Each answer is written as a self-contained, citable
// passage (direct answer first) so AI engines and Bing FAQ rich results can
// lift a single Q&A without surrounding context. The same array drives both the
// visible accordion and the FAQPage schema, keeping schema<->visible parity.
const faqs = [
  {
    q: "What does the 10th digit of a VIN tell you?",
    a: "The 10th digit of a VIN is the model-year code. It uses a standardized letter or number that runs on a 30-year cycle: A = 1980, B = 1981, and so on up to Y = 2000, then 1 = 2001 through 9 = 2009, after which the letters repeat (A = 2010, B = 2011...). Because each code maps to two years 30 years apart, you confirm the cycle using the vehicle's body style and overall condition. The letters I, O, Q, U, Z and the digit 0 are never used.",
  },
  {
    q: "What is the WMI in a VIN?",
    a: "The WMI, or World Manufacturer Identifier, is the first three characters of a VIN. Position 1 identifies the country of manufacture (1, 4, or 5 = United States; 2 = Canada; 3 = Mexico; J = Japan; W = Germany; K = South Korea; S = United Kingdom). Position 2 identifies the manufacturer (G = General Motors, F = Ford, T = Toyota, H = Honda). Position 3 indicates the vehicle type or the manufacturer's division.",
  },
  {
    q: "What characters are never used in a VIN?",
    a: "A VIN never contains the letters I, O, or Q because they are too easily confused with the numbers 1 and 0. In the 10th-position model-year code, the letters U and Z and the digit 0 are also skipped. If a 17-character VIN contains an I, O, or Q, it has been misread or is fraudulent — every legitimate VIN since the 1981 standard avoids those three letters entirely.",
  },
  {
    q: "What is the check digit in a VIN?",
    a: "The check digit is the 9th character of a VIN. It is a single value from 0 to 9, or the letter X (representing 10), calculated from all the other characters using a weighted mathematical formula. Its only purpose is to verify the VIN is internally consistent: if someone alters or mistypes a character, the check digit will no longer match, flagging the VIN as invalid. It is mandatory on all vehicles sold in North America.",
  },
  {
    q: "How long is a VIN and when did the 17-character standard start?",
    a: "A modern VIN is exactly 17 characters long. The standardized 17-character format became mandatory for all vehicles manufactured for the 1981 model year and later, defined by ISO standards 3779 and 3780 and the U.S. National Highway Traffic Safety Administration. Vehicles built before 1981 used shorter, non-standardized VINs that varied by manufacturer and ranged from 11 to 17 characters.",
  },
  {
    q: "What do the 4th through 8th VIN characters mean?",
    a: "Characters 4 through 8 form the Vehicle Descriptor Section (VDS). These five positions encode the vehicle's attributes — body style, engine type, model line, series, and restraint (safety) system. Unlike the country and year codes, the exact meaning of each VDS character is defined by the individual manufacturer, so the same letter can mean different things across brands. Decoding the VDS fully usually requires the manufacturer's reference or a VIN decoder tool.",
  },
  {
    q: "Where can I find the VIN on a vehicle?",
    a: "The most common place to find a VIN is on the lower-left corner of the dashboard, visible through the windshield from outside the car. It also appears on a sticker or plate in the driver's-side door jamb, on the vehicle title and registration, and on the insurance card. On many vehicles the VIN is additionally stamped on the engine block and the firewall. Always confirm the dashboard VIN matches the title to rule out a cloned or stolen vehicle.",
  },
  {
    q: "Can you tell a car's age from the VIN?",
    a: "Yes. The 10th character of the VIN reveals the model year directly — for example, R = 2024, S = 2025, T = 2026. Because the code repeats on a 30-year cycle, that single character could indicate either of two years 30 years apart, so you confirm the correct one using the vehicle's design, features, and condition. The model year is the most reliable single piece of age information encoded in a VIN.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
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

// VIN 10th-character model-year codes. The standard runs on a 30-year cycle
// (1980-2009, repeating 2010-2039). Letters I, O, Q, U, Z and the digit 0 are
// never used. The same character therefore maps to two possible years 30 apart;
// the 7th VIN character (numeric vs alphabetic) is what disambiguates them on
// real vehicles, but for a quick chart both cycles are shown side by side.
const modelYearCodes = [
  { code: "A", c1: 1980, c2: 2010 },
  { code: "B", c1: 1981, c2: 2011 },
  { code: "C", c1: 1982, c2: 2012 },
  { code: "D", c1: 1983, c2: 2013 },
  { code: "E", c1: 1984, c2: 2014 },
  { code: "F", c1: 1985, c2: 2015 },
  { code: "G", c1: 1986, c2: 2016 },
  { code: "H", c1: 1987, c2: 2017 },
  { code: "J", c1: 1988, c2: 2018 },
  { code: "K", c1: 1989, c2: 2019 },
  { code: "L", c1: 1990, c2: 2020 },
  { code: "M", c1: 1991, c2: 2021 },
  { code: "N", c1: 1992, c2: 2022 },
  { code: "P", c1: 1993, c2: 2023 },
  { code: "R", c1: 1994, c2: 2024 },
  { code: "S", c1: 1995, c2: 2025 },
  { code: "T", c1: 1996, c2: 2026 },
  { code: "V", c1: 1997, c2: 2027 },
  { code: "W", c1: 1998, c2: 2028 },
  { code: "X", c1: 1999, c2: 2029 },
  { code: "Y", c1: 2000, c2: 2030 },
  { code: "1", c1: 2001, c2: 2031 },
  { code: "2", c1: 2002, c2: 2032 },
  { code: "3", c1: 2003, c2: 2033 },
  { code: "4", c1: 2004, c2: 2034 },
  { code: "5", c1: 2005, c2: 2035 },
  { code: "6", c1: 2006, c2: 2036 },
  { code: "7", c1: 2007, c2: 2037 },
  { code: "8", c1: 2008, c2: 2038 },
  { code: "9", c1: 2009, c2: 2039 },
];

export default function HowToReadAVinPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
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
              { label: "How to Read a VIN" },
            ]}
          />

          <h1 className="mt-6 text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">
            How to Read a VIN Number
          </h1>
          <p className="mt-4 text-lg text-slate-700 leading-relaxed">
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
                      <span className="text-[10px] text-slate-600">
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
            <div className="mt-4 flex flex-wrap gap-3 text-xs text-slate-700 justify-center">
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
                    <td className="px-4 py-3 text-slate-700">{row.example}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* --- VIN Year Chart --- */}
          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            VIN Year Chart — Model Year Code (10th Digit)
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            The 10th character of a VIN encodes the model year. The chart below
            covers every code from{" "}
            <span className="font-mono font-semibold">A (1980)</span> through{" "}
            <span className="font-mono font-semibold">9 (2009)</span>, then
            repeating from <span className="font-mono font-semibold">A (2010)</span>{" "}
            to <span className="font-mono font-semibold">9 (2039)</span>. Because
            the code runs on a 30-year cycle, each character maps to two years 30
            years apart — for example,{" "}
            <span className="font-mono font-semibold">R</span> means 1994{" "}
            <em>and</em> 2024 — so use the vehicle's body style and condition to
            tell which cycle applies. Letters{" "}
            <span className="font-mono">I, O, Q, U, Z</span> and the digit{" "}
            <span className="font-mono">0</span> are never used.
          </p>

          <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-700">
                <tr>
                  <th className="px-4 py-3 font-semibold">VIN Code</th>
                  <th className="px-4 py-3 font-semibold">Model Year</th>
                  <th className="px-4 py-3 font-semibold">Model Year (repeat)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {modelYearCodes.map((row) => (
                  <tr key={row.code} className="hover:bg-slate-50/50">
                    <td className="px-4 py-3 font-mono font-bold text-primary-600">
                      {row.code}
                    </td>
                    <td className="px-4 py-3 text-slate-900">{row.c1}</td>
                    <td className="px-4 py-3 text-slate-700">{row.c2}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm text-slate-500 leading-relaxed">
            Note: the modern 17-character VIN became mandatory for the 1981 model
            year, so <span className="font-mono">A = 1980</span> only appears on a
            handful of early-adopter vehicles.
          </p>

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
          {/* --- FAQ --- */}
          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            VIN Reading FAQ
          </h2>
          <div className="mt-6 space-y-3">
            {faqs.map((f) => (
              <details
                key={f.q}
                className="group rounded-xl border border-slate-200 bg-white p-5"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 font-semibold text-slate-900 list-none">
                  {f.q}
                  <span className="text-2xl text-primary-600 transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-slate-600 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </article>

      {/* --- CTA --- */}
      <section className="py-14 bg-slate-50">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Decode Any VIN Instantly
          </h2>
          <p className="text-slate-700 mb-6">
            Paste a 17-character VIN below to see the full breakdown, vehicle
            specs, and history report.
          </p>
          <VinSearchForm size="sm" />
        </div>
      </section>
    </>
  );
}
