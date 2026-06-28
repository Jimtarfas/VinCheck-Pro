/**
 * /vin-code-lookup landing page body.
 * English-only — targets "vin code lookup" (~2.9K monthly US searches).
 * Angle: character-by-character decode of the 17-character VIN code
 * (WMI / VDS / VIS), distinct from /vin-decoder which targets the tool name.
 */

import Link from "@/components/LocaleLink";
import {
  Check, Search, FileText, Database, Code, Hash, BookOpen, BadgeCheck,
  ChevronRight, Lock, Zap, Sparkles, Factory, Calendar, Globe2,
  MapPin, ListChecks, ShieldCheck, AlertTriangle,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";

const HOW_ICONS = [Search, Database, FileText] as const;
const SECTION_ICONS = [Globe2, Factory, Calendar] as const;
const OUTPUT_ICONS = [Hash, BookOpen, ShieldCheck] as const;

const COPY = {
  home: "Home",
  crumb: "VIN Code Lookup",
  badge: "Free VIN Code Decoder   ·   ISO 3779 / NHTSA Standard   ·   Instant Results",
  h1Lead: "VIN Code Lookup — ",
  h1Accent: "What Each of the 17 Characters Means",
  intro: "A VIN code is the 17-character fingerprint stamped onto every car, truck, and motorcycle built since 1981. It is not random — every position carries data about who built the vehicle, what model and engine it is, when it left the plant, and where. Enter a VIN below to decode it character by character, or read on to understand the WMI, VDS, and VIS sections that make up the code.",
  formHeading: "Decode a VIN Code Free — All 17 Characters",
  formSub: "Enter any 17-character VIN — we will return the manufacturer, model year, plant, body style, engine, and the full sequence breakdown",
  formNote: "Free · No sign-up · Instant result",
  trustStats: [
    { icon: Code, value: "17", label: "characters decoded" },
    { icon: Globe2, value: "WMI", label: "world manufacturer" },
    { icon: Factory, value: "VDS", label: "vehicle descriptor" },
    { icon: BadgeCheck, value: "Free", label: "no sign-up" },
  ] as const,
  h2How: "How a VIN Code Lookup Works",
  howIntro: "A VIN code is structured data, not a serial number. Three steps turn the 17 characters on your dashboard into a complete vehicle description.",
  howSteps: [
    { tag: "Step 1", title: "Enter the 17-character VIN", body: "Read the VIN from the driver-side dashboard, the door-jamb sticker, the title, or the insurance card. Confirm it is exactly 17 characters and contains no letters I, O, or Q — those three are excluded from the VIN alphabet on purpose." },
    { tag: "Step 2", title: "We split it into WMI, VDS, and VIS", body: "The lookup separates the VIN into its three standardized sections — positions 1–3 (World Manufacturer Identifier), positions 4–9 (Vehicle Descriptor Section, including the check digit at position 9), and positions 10–17 (Vehicle Identifier Section)." },
    { tag: "Step 3", title: "Read the decoded vehicle", body: "Each section is mapped against the SAE WMI table, the manufacturer's VDS pattern, and the NHTSA year/plant codes — returning the make, model, year, body type, engine, plant, and production sequence in plain English." },
  ] as const,
  h2What: "What Is a VIN Code?",
  whatIntro: "The VIN code is a global standard, not a manufacturer's choice. Two ISO standards and one U.S. federal mandate define exactly what a VIN must look like.",
  what1Pre: "A VIN — Vehicle Identification Number — is a ",
  what1Bold1: "17-character alphanumeric code",
  what1Mid: " that uniquely identifies one specific motor vehicle. The format is defined by ",
  what1Bold2: "ISO 3779",
  what1Mid2: " and ",
  what1Bold3: "ISO 3780",
  what1Suffix: ", and in the United States the National Highway Traffic Safety Administration (NHTSA) requires every road vehicle built for sale here since model year 1981 to carry one.",
  what2: "Before 1981 different automakers used VINs of different lengths and formats — a 1970s Chevrolet might have a 13-character VIN, a 1960s Volkswagen a 9-character one. The 17-character format was standardized so that any vehicle, anywhere in the world, can be identified by the same rules.",
  what3: "The VIN is also where federal recall data, title brands, theft reports, and warranty records are keyed. When you run a VIN code lookup, you are not just decoding a number — you are reading the index that ties a physical car to every database that has ever recorded it.",
  whatCardTitle: "The VIN at a glance",
  whatCardRows: [
    { label: "Length", value: "17 characters" },
    { label: "Standards", value: "ISO 3779 / 3780" },
    { label: "Required since", value: "Model year 1981" },
    { label: "Letters excluded", value: "I, O, Q" },
  ] as const,
  whatCardNote: "Every road vehicle sold in the U.S. since 1981 — and most worldwide — uses the same 17-character format.",
  h2Sections: "The 3 Sections of a VIN Code: WMI, VDS, VIS",
  sectionsIntro: "The 17 characters of a VIN are not one long string — they are three blocks, each governed by a different authority and each describing a different layer of the vehicle.",
  sections: [
    {
      tag: "Positions 1–3",
      title: "WMI — World Manufacturer Identifier",
      body: "The first three characters identify the country of origin, the manufacturer, and the vehicle type. Position 1 is the country or region (1, 4, 5 = USA; 2 = Canada; 3 = Mexico; J = Japan; K = Korea; S–Z = Europe; W = Germany). Position 2 identifies the manufacturer (H = Honda, G = General Motors, F = Ford, T = Toyota). Position 3, combined with the first two, narrows it to the division and vehicle type. WMI codes are assigned by the Society of Automotive Engineers (SAE) on behalf of ISO.",
    },
    {
      tag: "Positions 4–9",
      title: "VDS — Vehicle Descriptor Section",
      body: "The next six characters describe the vehicle itself: model, body type, restraint system, engine, transmission, and series. The exact pattern is set by the manufacturer and varies between makes — Ford's VDS pattern is different from Honda's. Position 9 is the special one: it is the check digit, a single character calculated from the other 16 using a Mod-11 algorithm that proves the VIN was transcribed correctly.",
    },
    {
      tag: "Positions 10–17",
      title: "VIS — Vehicle Identifier Section",
      body: "The final eight characters identify this specific car within the model run. Position 10 is the model-year code (a single letter or digit — see the chart below). Position 11 is the assembly plant code, assigned by the manufacturer. Positions 12–17 are the production sequence number — usually six digits — that uniquely identify this car among every other one of the same model built that year. Together they make the VIN globally unique.",
    },
  ] as const,
  h2Example: "A Worked Example: 1HGBH41JXMN109186",
  exampleIntro: "Pull the VIN apart one piece at a time, and a string of seemingly random characters becomes a complete vehicle description.",
  exampleRows: [
    { range: "Pos. 1", chars: "1", meaning: "Country — United States" },
    { range: "Pos. 2", chars: "H", meaning: "Manufacturer — Honda" },
    { range: "Pos. 3", chars: "G", meaning: "Vehicle type — passenger car (Honda division)" },
    { range: "Pos. 4–8", chars: "BH41J", meaning: "VDS — Accord, 4-door sedan, restraint & engine codes" },
    { range: "Pos. 9", chars: "X", meaning: "Check digit (Mod-11 verification)" },
    { range: "Pos. 10", chars: "M", meaning: "Model year — 1991" },
    { range: "Pos. 11", chars: "N", meaning: "Plant — Marysville, Ohio (assembly)" },
    { range: "Pos. 12–17", chars: "109186", meaning: "Production sequence — unit #109186" },
  ] as const,
  exampleSummary: "Decoded: a 1991 Honda Accord 4-door, built in Marysville, Ohio, unit number 109,186 — every fact above is encoded in the 17 characters, with no external lookup needed beyond the WMI and year tables.",
  h2Check: "Position 9 — How the VIN Check Digit Works",
  check1Pre: "Position 9 is the only character of a VIN that is not data — it is ",
  check1Bold: "math",
  check1Suffix: ". The check digit exists for one purpose: to catch typos when a human or scanner transcribes a VIN. If even one other character is wrong, the check digit will almost always fail to match.",
  check2Pre: "The calculation is ",
  check2Bold: "Mod-11",
  check2Suffix: ": each of the other 16 characters is converted to a number (letters map to digits via a fixed SAE table), multiplied by a position weight (8, 7, 6, 5, 4, 3, 2, 10, 0, 9, 8, 7, 6, 5, 4, 3, 2 — the weight at position 9 is the digit itself), summed, and the total is divided by 11. The remainder is the check digit — and if the remainder is 10, the check digit is the letter X.",
  check3: "When a VIN decoder rejects a VIN as 'invalid,' the check digit is almost always why. The most common cause is confusing a zero (0) for the letter O — which is exactly why O is not allowed in a VIN to begin with.",
  checkCardTitle: "Why the check digit matters",
  checkCardItems: [
    "Catches single-character typos almost every time",
    "Detects most two-character swaps (a common transcription error)",
    "Required by NHTSA on every U.S.-market VIN since 1981",
    "Letter X at position 9 means the remainder of the Mod-11 was 10",
  ] as const,
  checkCardNote: "If a tool reports your VIN as invalid, double-check the suspect characters O/0 and I/1 first — that is almost always the cause.",
  midCtaHeading: "Decode Your VIN Code Free",
  midCtaSub: "Enter any 17-character VIN to see every position broken out — WMI, VDS, check digit, year, plant, and production sequence in seconds.",
  h2Year: "Position 10 — The Model-Year Code (1980–2030 Chart)",
  yearIntro: "Position 10 is a single character that encodes the model year. NHTSA uses a 30-year cycle that repeats every three decades — but in practice you can tell the difference between, say, a 1991 and a 2021 Honda Accord at a glance, so the overlap rarely causes confusion. The full chart through the next cycle:",
  yearRows: [
    { code: "B", year: "1981" },
    { code: "C", year: "1982" },
    { code: "D", year: "1983" },
    { code: "E", year: "1984" },
    { code: "F", year: "1985" },
    { code: "G", year: "1986" },
    { code: "H", year: "1987" },
    { code: "J", year: "1988" },
    { code: "K", year: "1989" },
    { code: "L", year: "1990" },
    { code: "M", year: "1991" },
    { code: "N", year: "1992" },
    { code: "P", year: "1993" },
    { code: "R", year: "1994" },
    { code: "S", year: "1995" },
    { code: "T", year: "1996" },
    { code: "V", year: "1997" },
    { code: "W", year: "1998" },
    { code: "X", year: "1999" },
    { code: "Y", year: "2000" },
    { code: "1", year: "2001" },
    { code: "2", year: "2002" },
    { code: "3", year: "2003" },
    { code: "4", year: "2004" },
    { code: "5", year: "2005" },
    { code: "6", year: "2006" },
    { code: "7", year: "2007" },
    { code: "8", year: "2008" },
    { code: "9", year: "2009" },
    { code: "A", year: "2010" },
    { code: "B", year: "2011" },
    { code: "C", year: "2012" },
    { code: "D", year: "2013" },
    { code: "E", year: "2014" },
    { code: "F", year: "2015" },
    { code: "G", year: "2016" },
    { code: "H", year: "2017" },
    { code: "J", year: "2018" },
    { code: "K", year: "2019" },
    { code: "L", year: "2020" },
    { code: "M", year: "2021" },
    { code: "N", year: "2022" },
    { code: "P", year: "2023" },
    { code: "R", year: "2024" },
    { code: "S", year: "2025" },
    { code: "T", year: "2026" },
    { code: "V", year: "2027" },
    { code: "W", year: "2028" },
    { code: "X", year: "2029" },
    { code: "Y", year: "2030" },
  ] as const,
  yearNote: "The cycle repeats — a VIN with year code 'M' could be 1991 or 2021. To resolve the ambiguity, look at position 7: NHTSA reserves a digit at position 7 for vehicles in the 2010–2039 cycle and a letter for the 1980–2009 cycle.",
  h2Excluded: "Letters That Are NOT Used in a VIN: I, O, Q",
  excluded1Pre: "Three letters of the English alphabet are deliberately ",
  excluded1Bold: "excluded",
  excluded1Suffix: " from every legitimate VIN: I, O, and Q. The reason is human-readability — those three letters look nearly identical to the digits 1, 0, and 0 respectively on a stamped metal plate or a faded sticker.",
  excluded2: "Excluding them eliminates the most common source of VIN transcription errors. If a VIN you are trying to decode contains any of those three letters, the VIN itself is invalid — it has been mistyped, misread, or fabricated.",
  excluded3: "U and Z are also excluded from position 10 (the year code) for the same reason, and the digit 0 is excluded from position 10 because it would be confused with the letter O. Every other position permits any letter except I, O, Q and any digit 0–9.",
  excludedCardTitle: "Quick reference — excluded characters",
  excludedRows: [
    { label: "Excluded from every position", value: "I, O, Q" },
    { label: "Excluded from position 10 also", value: "U, Z, 0" },
    { label: "Reason", value: "Confusable with 1 / 0" },
  ] as const,
  excludedCardNote: "If a VIN has I, O, or Q anywhere — it is not a valid VIN. Re-check the source.",
  h2Output: "What a VIN Code Lookup Actually Returns",
  outputIntro: "A complete VIN code decode combines three different data sources to produce a single readable result.",
  outputs: [
    { title: "WMI table (SAE / ISO)", body: "The first three characters are looked up in the SAE-maintained World Manufacturer Identifier registry. This is a public list — every code, from 1HG (Honda Marysville) to WBA (BMW Munich), is assigned by SAE on behalf of ISO and updated as new plants and manufacturers come online." },
    { title: "Manufacturer's VDS pattern", body: "Positions 4–8 are decoded against the specific manufacturer's pattern, which is filed with NHTSA every model year. The pattern says, for that maker and year, which positions encode model, body, engine, restraint system, and trim — and what each character means." },
    { title: "Year & plant codes", body: "Position 10 is decoded via the NHTSA year-code chart (the table above). Position 11 is decoded via the manufacturer's plant table — Honda Marysville is 'N', Ford Dearborn is 'R', Toyota Georgetown is 'J', and so on. Combined, these tell you exactly when and where the car was built." },
  ] as const,
  outputNoteBoldLead: "VIN decoding is fully standardized.",
  outputNoteMid: " Any reputable decoder will return the same WMI, VDS, year, and plant for the same VIN — the differences between tools are about how deep they go into the manufacturer's option codes and how cleanly they present it. Try a full ",
  outputNoteLink1: "VIN decoder",
  outputNoteMid2: " or, if you want history records too, a full ",
  outputNoteLink2: "VIN history check",
  outputNoteSuffix: ".",
  h2Internal: "Related VIN Tools and Guides",
  internalIntro: "Once you understand the VIN code itself, these companion tools let you go further — from full decoding to history reports to paint and option lookups.",
  internalLinks: [
    { href: "/vin-decoder", label: "VIN Decoder", desc: "Decode any 17-character VIN to make, model, trim, engine, and factory options." },
    { href: "/vin-check", label: "Full VIN History Check", desc: "Title brands, accident, salvage, odometer, and recall records in one report." },
    { href: "/best-vin-decoder", label: "Best VIN Decoder Tools", desc: "Side-by-side comparison of the major VIN decoders and what each returns." },
    { href: "/vin-number-lookup", label: "VIN Number Lookup", desc: "Sister tool — same 17-character decode, framed for the 'VIN number' query." },
    { href: "/paint-code-lookup", label: "Paint Code Lookup", desc: "Find the factory paint code for any vehicle by VIN — for touch-up and bodywork." },
    { href: "/window-sticker", label: "Window Sticker by VIN", desc: "Recreate the original Monroney window sticker with build options and MSRP." },
    { href: "/guides/how-to-read-a-vin", label: "Guide: How to Read a VIN", desc: "Deeper reference on VIN anatomy, with manufacturer-specific examples." },
    { href: "/guides/vin-decoding-master-guide", label: "Guide: VIN Decoding Master Guide", desc: "Long-form reference covering every position, every standard, and every edge case." },
  ] as const,
  h2Faq: "VIN Code Lookup — Frequently Asked Questions",
  faqIntro: "The most common questions about decoding a VIN code character by character.",
  bottomBadge: "Free · Instant · ISO 3779 Standard",
  ctaBottomHeading: "Ready to Decode a VIN Code?",
  ctaBottomSub: "Enter any 17-character VIN to see the WMI, VDS, check digit, model year, plant, and production sequence — every character explained.",
  ctaBottomNote: "No credit card · No sign-up · Free",
} as const;

const FAQS_EN = [
  { question: "What is a VIN code?", answer: "A VIN code is the 17-character Vehicle Identification Number assigned to every motor vehicle. It is governed by ISO 3779 and ISO 3780, and required on every U.S.-market road vehicle by NHTSA since model year 1981. The code is split into three sections: the World Manufacturer Identifier (positions 1–3), the Vehicle Descriptor Section (positions 4–9, with a check digit at position 9), and the Vehicle Identifier Section (positions 10–17), which together identify the country of origin, the manufacturer, the model, the year, the assembly plant, and the production sequence." },
  { question: "How do I read a VIN code?", answer: "Read the VIN from left to right and split it into three groups: the first three characters are the WMI (country, manufacturer, vehicle type), the next six are the VDS (model, body, engine, restraint system, plus a check digit at position 9), and the last eight are the VIS (model year at position 10, assembly plant at position 11, and a six-digit production sequence). Each section is decoded against a different reference — the SAE WMI table, the manufacturer's filed VDS pattern, and the NHTSA year code chart." },
  { question: "What does each digit of a VIN mean?", answer: "Position 1 is the country of origin. Position 2 is the manufacturer. Position 3 is the vehicle type or division. Positions 4–8 describe the vehicle: model, body style, restraint system, engine, transmission, and series — the exact mapping depends on the manufacturer. Position 9 is the check digit, a Mod-11 verification value. Position 10 is the model year, a single character from a 30-year repeating cycle. Position 11 is the assembly plant. Positions 12–17 are the unique production sequence number for that vehicle." },
  { question: "Why are I, O, and Q not in a VIN?", answer: "The letters I, O, and Q are excluded from every position of a VIN to prevent confusion with the digits 1, 0, and 0. On a stamped metal plate or a faded sticker, an I looks like a 1, and an O or Q looks like a 0 — so excluding them eliminates the most common source of transcription errors. If you see I, O, or Q in a VIN you are trying to decode, the VIN itself is invalid — it has been mistyped, misread, or fabricated." },
  { question: "What is the check digit in a VIN?", answer: "The check digit is the character at position 9 of a VIN. It is not data about the vehicle — it is the result of a Mod-11 mathematical check on the other 16 characters. Each character is converted to a number, multiplied by a position weight, summed, and the total is divided by 11. The remainder is the check digit; if the remainder is 10, the digit is the letter X. The check digit exists to catch single-character typos and most two-character swaps, and it is required on every U.S.-market VIN since 1981." },
  { question: "How do I find a vehicle's year from the VIN?", answer: "The model year is encoded at position 10 — a single letter or digit. The NHTSA chart cycles through 30 years: B = 1981, C = 1982, and so on through Y = 2000, then 1 = 2001 through 9 = 2009, then A = 2010, B = 2011, restarting the letter cycle. Because the cycle repeats every 30 years, the same code can mean two different years (B = 1981 or 2011, for example). To resolve the overlap, look at position 7: NHTSA uses a digit there for vehicles in the 2010–2039 cycle and a letter for the 1980–2009 cycle." },
  { question: "What's the difference between a VIN code and a VIN number?", answer: "There is no difference — the two phrases refer to the same thing. 'VIN' itself stands for Vehicle Identification Number, so 'VIN number' is technically redundant, but it is the more common phrase in everyday speech. 'VIN code' tends to be used when people are thinking about the character-by-character structure (WMI, VDS, VIS), while 'VIN number' tends to be used when people want a full history report. Both refer to the same 17-character identifier on the same vehicle." },
];

export default function VinCodeLookupBody() {
  return (
    <article className="pb-16 bg-surface">
      <div className="bg-primary text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-14 sm:pt-28 sm:pb-20">
          <Breadcrumbs items={[{ label: COPY.home, href: "/" }, { label: COPY.crumb }]} onDark />
          <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
            <Code className="w-4 h-4" /> {COPY.badge}
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-headline font-extrabold leading-tight mb-4">
            {COPY.h1Lead}
            <span style={{ color: "var(--color-secondary-container)" }}>{COPY.h1Accent}</span>
          </h1>
          <p className="speakable-intro text-base sm:text-xl text-white/85 max-w-3xl mb-8 leading-relaxed">{COPY.intro}</p>

          <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-xl">
            <h2 className="text-base sm:text-lg font-headline font-extrabold text-primary mb-1">{COPY.formHeading}</h2>
            <p className="text-xs sm:text-sm text-on-surface-variant mb-4">{COPY.formSub}</p>
            <VinSearchForm size="lg" />
            <p className="mt-3 text-[11px] text-slate-400 flex items-center gap-1.5">
              <Lock className="w-3 h-3" /> {COPY.formNote}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
            {COPY.trustStats.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="bg-white/10 border border-white/15 rounded-xl px-4 py-3 text-center">
                  <Icon className="w-5 h-5 mx-auto mb-1 text-white/70" />
                  <div className="text-xl sm:text-2xl font-headline font-black text-white">{s.value}</div>
                  <div className="text-[11px] text-white/65 leading-tight mt-0.5">{s.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <section className="py-12 sm:py-16">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{COPY.h2How}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl">{COPY.howIntro}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {COPY.howSteps.map((m, i) => {
              const Icon = HOW_ICONS[i];
              return (
                <div key={m.title} className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5 sm:p-6">
                  <div className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-[11px] font-black uppercase tracking-wider text-primary/70 mb-0.5">{m.tag}</div>
                  <h3 className="text-base sm:text-lg font-headline font-extrabold text-primary mb-1.5">{m.title}</h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">{m.body}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{COPY.h2What}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl leading-relaxed">{COPY.whatIntro}</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              <p>
                {COPY.what1Pre}
                <strong className="text-on-surface">{COPY.what1Bold1}</strong>
                {COPY.what1Mid}
                <strong className="text-on-surface">{COPY.what1Bold2}</strong>
                {COPY.what1Mid2}
                <strong className="text-on-surface">{COPY.what1Bold3}</strong>
                {COPY.what1Suffix}
              </p>
              <p>{COPY.what2}</p>
              <p>{COPY.what3}</p>
            </div>
            <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
              <div className="flex items-center gap-2 mb-3">
                <Code className="w-5 h-5 text-primary" />
                <h3 className="font-headline font-extrabold text-primary">{COPY.whatCardTitle}</h3>
              </div>
              <ul className="space-y-3 text-sm text-on-surface">
                {COPY.whatCardRows.map((r) => (
                  <li key={r.label} className="flex items-center justify-between gap-3 rounded-lg bg-white px-3.5 py-2.5 border border-outline-variant/60">
                    <span className="text-on-surface-variant">{r.label}</span>
                    <code className="font-mono font-bold text-primary">{r.value}</code>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-on-surface-variant leading-relaxed">{COPY.whatCardNote}</p>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{COPY.h2Sections}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">{COPY.sectionsIntro}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {COPY.sections.map((s, i) => {
              const Icon = SECTION_ICONS[i];
              return (
                <div key={s.title} className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5 sm:p-6">
                  <div className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-[11px] font-black uppercase tracking-wider text-primary/70 mb-0.5">{s.tag}</div>
                  <h3 className="text-base sm:text-lg font-headline font-extrabold text-primary mb-1.5">{s.title}</h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">{s.body}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{COPY.h2Example}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">{COPY.exampleIntro}</p>
          <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest overflow-hidden">
            <div className="bg-primary/5 px-5 py-4 border-b border-outline-variant flex items-center gap-3">
              <Hash className="w-5 h-5 text-primary" />
              <code className="font-mono text-lg sm:text-xl font-extrabold text-primary tracking-wider">1HGBH41JXMN109186</code>
            </div>
            <div className="divide-y divide-outline-variant">
              {COPY.exampleRows.map((r) => (
                <div key={r.range} className="grid grid-cols-12 gap-3 px-5 py-3.5 text-sm">
                  <div className="col-span-3 sm:col-span-2 font-bold text-on-surface-variant">{r.range}</div>
                  <div className="col-span-3 sm:col-span-2"><code className="font-mono font-extrabold text-primary">{r.chars}</code></div>
                  <div className="col-span-6 sm:col-span-8 text-on-surface-variant leading-relaxed">{r.meaning}</div>
                </div>
              ))}
            </div>
            <div className="bg-secondary-container/40 px-5 py-4 border-t border-outline-variant">
              <p className="text-sm text-on-surface leading-relaxed">
                <strong className="text-on-surface">Example summary: </strong>{COPY.exampleSummary}
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">{COPY.h2Check}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              <p>
                {COPY.check1Pre}
                <strong className="text-on-surface">{COPY.check1Bold}</strong>
                {COPY.check1Suffix}
              </p>
              <p>
                {COPY.check2Pre}
                <strong className="text-on-surface">{COPY.check2Bold}</strong>
                {COPY.check2Suffix}
              </p>
              <p>{COPY.check3}</p>
            </div>
            <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck className="w-5 h-5 text-primary" />
                <h3 className="font-headline font-extrabold text-primary">{COPY.checkCardTitle}</h3>
              </div>
              <ul className="space-y-2 text-sm text-on-surface">
                {COPY.checkCardItems.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" strokeWidth={3} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-on-surface-variant leading-relaxed">{COPY.checkCardNote}</p>
            </div>
          </div>
        </section>

        <section className="py-10">
          <div className="rounded-3xl bg-primary p-7 sm:p-10 text-center">
            <Sparkles className="w-8 h-8 text-yellow-300 mx-auto mb-3" />
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-white mb-2">{COPY.midCtaHeading}</h2>
            <p className="text-white/80 text-sm sm:text-base mb-6 max-w-xl mx-auto">{COPY.midCtaSub}</p>
            <div className="max-w-xl mx-auto bg-white rounded-2xl p-4 sm:p-5">
              <VinSearchForm size="lg" />
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{COPY.h2Year}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">{COPY.yearIntro}</p>
          <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest overflow-hidden">
            <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-6 gap-px bg-outline-variant">
              {COPY.yearRows.map((r, i) => (
                <div key={`${r.code}-${i}`} className="bg-surface-container-lowest flex items-center justify-between gap-2 px-3 py-2 text-sm">
                  <code className="font-mono font-extrabold text-primary">{r.code}</code>
                  <span className="text-on-surface-variant text-xs">{r.year}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-5 rounded-2xl bg-secondary-container/40 border border-outline-variant p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-on-secondary-container flex-shrink-0 mt-0.5" />
              <p className="text-sm text-on-surface leading-relaxed">{COPY.yearNote}</p>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">{COPY.h2Excluded}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              <p>
                {COPY.excluded1Pre}
                <strong className="text-on-surface">{COPY.excluded1Bold}</strong>
                {COPY.excluded1Suffix}
              </p>
              <p>{COPY.excluded2}</p>
              <p>{COPY.excluded3}</p>
            </div>
            <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="w-5 h-5 text-primary" />
                <h3 className="font-headline font-extrabold text-primary">{COPY.excludedCardTitle}</h3>
              </div>
              <ul className="space-y-3 text-sm text-on-surface">
                {COPY.excludedRows.map((r) => (
                  <li key={r.label} className="flex items-center justify-between gap-3 rounded-lg bg-white px-3.5 py-2.5 border border-outline-variant/60">
                    <span className="text-on-surface-variant">{r.label}</span>
                    <code className="font-mono font-bold text-primary">{r.value}</code>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-on-surface-variant leading-relaxed">{COPY.excludedCardNote}</p>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{COPY.h2Output}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">{COPY.outputIntro}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {COPY.outputs.map((item, i) => {
              const Icon = OUTPUT_ICONS[i];
              return (
                <div key={item.title} className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5 sm:p-6">
                  <div className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-base sm:text-lg font-headline font-extrabold text-primary mb-1.5">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">{item.body}</p>
                </div>
              );
            })}
          </div>
          <div className="mt-6 rounded-2xl bg-secondary-container/40 border border-outline-variant p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <Database className="w-5 h-5 text-on-secondary-container flex-shrink-0 mt-0.5" />
              <p className="text-sm text-on-surface leading-relaxed">
                <strong className="text-on-surface">{COPY.outputNoteBoldLead}</strong>
                {COPY.outputNoteMid}
                <Link href="/vin-decoder" className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{COPY.outputNoteLink1}</Link>
                {COPY.outputNoteMid2}
                <Link href="/vin-check" className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{COPY.outputNoteLink2}</Link>
                {COPY.outputNoteSuffix}
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{COPY.h2Internal}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7">{COPY.internalIntro}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {COPY.internalLinks.map((l) => (
              <Link key={l.href} href={l.href} className="flex items-start gap-3 rounded-xl border border-outline-variant bg-surface hover:border-primary/40 hover:bg-primary/5 transition-colors p-4 group">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <ChevronRight className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-bold text-primary group-hover:underline">{l.label}</div>
                  <div className="text-xs text-on-surface-variant mt-0.5">{l.desc}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="py-10">
          <VinCheckBanner />
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{COPY.h2Faq}</h2>
          <p className="text-sm text-on-surface-variant mb-8">{COPY.faqIntro}</p>
          <div className="space-y-3">
            {FAQS_EN.map((f) => (
              <details key={f.question} className="group rounded-2xl border border-outline-variant bg-surface p-4 sm:p-5 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex items-start justify-between gap-4 cursor-pointer list-none">
                  <span className="text-sm sm:text-base font-headline font-extrabold text-primary pr-2">{f.question}</span>
                  <span className="flex-shrink-0 mt-0.5 text-primary text-xl font-light group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-3 text-xs sm:text-sm text-on-surface-variant leading-relaxed">{f.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="py-14 sm:py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-xs font-black uppercase tracking-wider mb-4">
            <Zap className="w-3.5 h-3.5" /> {COPY.bottomBadge}
          </div>
          <h2 className="text-2xl sm:text-4xl font-headline font-extrabold text-primary mb-3">{COPY.ctaBottomHeading}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl mx-auto mb-8">{COPY.ctaBottomSub}</p>
          <div className="max-w-xl mx-auto bg-surface-container-low rounded-2xl p-5 border border-outline-variant">
            <VinSearchForm size="lg" />
          </div>
          <div className="mt-3 flex items-center justify-center gap-2 text-xs text-on-surface-variant">
            <Check className="w-3.5 h-3.5 text-green-500" strokeWidth={3} />
            {COPY.ctaBottomNote}
          </div>
        </section>

        <RelatedChecks exclude="/vin-code-lookup" />
      </div>
    </article>
  );
}

export { FAQS_EN };
