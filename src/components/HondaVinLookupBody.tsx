/**
 * Body for /honda-vin-lookup — English-only brand-specific page targeting the
 * "honda vin lookup" keyword cluster (~2.6K US monthly searches combined).
 * Mirrors the visual structure of VinNumberLookupBody but flattens COPY (no locales).
 */

import Link from "@/components/LocaleLink";
import {
  Check, Shield, Search, FileText, Database, Car,
  ChevronRight, Lock, Zap, BadgeCheck, Sparkles, Hash, Wrench,
  Gauge, ClipboardCheck, AlertTriangle, MapPin, Cpu, Factory,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";

const REVEAL_ICONS = [Hash, Car, Cpu, Wrench, Shield, Gauge] as const;
const DECODE_ICONS = [Factory, MapPin, Cpu] as const;
const RECALL_ICONS = [AlertTriangle, Wrench, Cpu] as const;

const COPY = {
  home: "Home",
  crumb: "Honda VIN Lookup",
  badge: "Free Honda VIN Lookup   ·   Decoded Specs   ·   NMVTIS-Sourced",
  h1Lead: "Honda VIN Lookup — ",
  h1Accent: "Free Decode, Recalls, and Title History for Any Honda.",
  intro: "Every Honda — every Civic, Accord, CR-V, Pilot, Odyssey, and Ridgeline — leaves the factory with a 17-character VIN that encodes its plant, its powertrain, and its identity. A Honda VIN lookup turns that string into a complete picture: decoded factory specs, open recalls (including any unresolved Takata airbag work), and the title brand history pulled from NMVTIS. Enter a Honda VIN below and we'll run a free Honda VIN check in seconds. No sign-up, no card, no catch.",
  formHeading: "Free Honda VIN Lookup — Search Any 17-Character Honda VIN",
  formSub: "Enter a Honda VIN and we'll surface decoded trim, plant of manufacture, open recalls, title brands, and salvage records — instantly.",
  formNote: "Free · No sign-up · Instant result",
  trustStats: [
    { icon: Database, value: "50-state", label: "NMVTIS sources" },
    { icon: Car, value: "Honda-trim", label: "decoded specs" },
    { icon: Shield, value: "Title brand", label: "& salvage records" },
    { icon: BadgeCheck, value: "Free", label: "no sign-up" },
  ],
  h2Reveal: "What a Honda VIN Reveals",
  revealIntro: "A Honda VIN lookup goes far beyond the badge on the trunk. The 17 characters tell you where the car was built, what engine and transmission it left the factory with, and which trim was installed — and our lookup adds the lived history on top of that. Six things you learn from a single Honda VIN.",
  reveals: [
    { title: "Plant of manufacture", body: "Honda VINs identify the assembly plant precisely. Marysville, Ohio (plant code A), East Liberty, Ohio, El Salto in Mexico (plant code M), Lincoln, Alabama, and Sayama and Suzuka in Japan all stamp distinct plant codes into the VIN. The lookup translates the code into the city." },
    { title: "Exact trim and equipment", body: "LX, Sport, EX, EX-L, Touring, Type R — a Honda VIN encodes the trim level and factory-installed equipment. The lookup returns it so you can tell a base CR-V apart from a Touring without taking the dealer's word for it." },
    { title: "Engine and transmission", body: "1.5L turbo, 2.0L hybrid, 3.5L V6 — your Honda VIN check decodes the powertrain that came off the line. That matters for parts ordering, insurance accuracy, and confirming the seller's description." },
    { title: "Open Honda recalls", body: "Honda has issued large recall campaigns — Takata airbag inflators, fuel pump assemblies, and certain transmission components. A VIN lookup pulls the NHTSA recall feed live, so any unresolved Honda recall shows up attached to that specific VIN." },
    { title: "Title brands and salvage flags", body: "Flood, salvage, junk, rebuilt, lemon-law buyback — if a Honda has been branded in any of the 50 states, NMVTIS keeps the record. Our lookup queries it so a washed title still shows the original brand." },
    { title: "Odometer history snapshots", body: "Each state title transfer records the odometer reading. A Honda VIN lookup surfaces those snapshots so you can spot rollbacks or inconsistencies before you commit to buying." },
  ],
  h2Decode: "Decoding a Honda VIN Code",
  decodeIntro: "Honda VINs follow the same global 17-character standard as every other automaker, but the patterns Honda uses are remarkably consistent — once you know them, you can read a lot from the VIN without any tool. The decoder still does the heavy lifting, but here is what the characters mean for a Honda.",
  decode1Pre: "The first three characters — the World Manufacturer Identifier or ",
  decode1Bold: "WMI",
  decode1Suffix: " — tell you the country, the manufacturer, and the vehicle class. Honda passenger cars built in the United States start with 1HG (Accord, Civic). SUVs and light trucks built in the US start with 5FN (Pilot, Passport, Ridgeline). Honda-built vehicles assembled in Japan start with JHM for passenger cars and JHL for SUVs. Acura — Honda's luxury brand — uses 19U for US-built sedans, 19V for US-built SUVs, and JH4 for Japan-built models.",
  decode2Pre: "Characters four through eight describe the vehicle attributes: model line, body style, restraint system, and engine. The ninth character is a ",
  decode2Bold: "check digit",
  decode2Mid: " calculated from the other characters. The tenth character encodes the ",
  decode2Bold2: "model year",
  decode2Suffix: ". The eleventh character — the plant code — is where the Honda VIN lookup gets specific: A for Marysville, Ohio, M for El Salto in Mexico, T for Anna, Ohio (engine plant codes also appear here for engine-only assemblies), with separate codes for East Liberty, Lincoln, Sayama, and Suzuka.",
  decode3: "Characters twelve through seventeen form the unique production serial. The lookup pulls all of this together and presents it in plain English: year, model, trim, engine, transmission, drivetrain, and the assembly plant in one decoded view.",
  decodeCardTitle: "Common Honda WMI patterns",
  decodeRows: [
    { label: "1HG / 1HT", value: "US passenger (Civic, Accord)" },
    { label: "5FN / 5FP", value: "US SUV (Pilot, Ridgeline)" },
    { label: "JHM / JHL", value: "Japan-built Honda" },
    { label: "19U / 19V", value: "US-built Acura" },
    { label: "JH4 / JH3", value: "Japan-built Acura" },
    { label: "2HG / 2HK", value: "Canada-built Honda" },
  ],
  decodeCardNote: "Plant codes for Honda North America include A (Marysville OH), M (El Salto MX), T (Anna OH engine), plus codes for East Liberty, Lincoln, Sayama, and Suzuka.",
  h2Where: "Where to Find Your Honda VIN",
  where1Pre: "Honda prints the VIN in ",
  where1Bold: "at least five places",
  where1Suffix: " on every modern vehicle. Any one of them is enough to run a free Honda VIN lookup — and if any of them disagree with each other, that is a strong signal that the car's identity has been tampered with.",
  where2: "The fastest place to find a Honda VIN is the lower corner of the windshield on the driver's side — look through the glass from outside. The driver-side door jamb sticker is the second-easiest place; Honda includes it as required by federal law, and it also lists the tire pressure spec and the manufacture date. The title document and the insurance ID card both print the VIN, and your Honda registration usually does too.",
  where3: "On older Hondas and Acuras you may also find the VIN stamped on the firewall under the hood or on the steering column. For the cleanest read, copy the VIN directly from the door jamb sticker — that one is printed and protected, so it is less likely to be smudged or scratched than the dashboard plate.",
  whereCardTitle: "Five places the Honda VIN lives",
  whereList: [
    "Lower driver-side windshield (visible from outside)",
    "Driver-side door jamb sticker (also lists tire pressure)",
    "Honda title document",
    "Insurance ID card",
    "State registration document",
  ],
  whereCardNote: "Found it? Drop the 17-character Honda VIN into the form above and run a free Honda VIN check against NMVTIS in seconds.",
  midCtaHeading: "Lookup Your Honda VIN Right Now",
  midCtaSub: "Got a Honda in mind — yours, or one you're about to buy? Run the VIN against NMVTIS, the Honda recall feed, and our decoder — free, in seconds. No sign-up.",
  h2Recalls: "Common Honda Recall Categories",
  recallsIntro: "Honda has issued some of the largest recall campaigns in the industry, and many used Hondas still carry open recall work that the previous owner never completed. A VIN lookup pulls the live NHTSA feed so you see exactly what is open on that specific Honda — but here are the three categories you are most likely to encounter.",
  recalls: [
    { title: "Takata airbag inflators", body: "The Takata airbag recall is the largest in automotive history, and Honda was the most heavily affected manufacturer. Older Civics, Accords, CR-Vs, Pilots, Odysseys, and the Acura TL and MDX may still have unreplaced inflators. A Honda VIN lookup tells you in seconds whether the airbag work has been completed on that VIN — Honda performs the replacement at no charge regardless of mileage or ownership." },
    { title: "Fuel pump assemblies", body: "Honda has recalled certain 2018-2020 Accord, Civic, CR-V, HR-V, Odyssey, Passport, Pilot, and Ridgeline models for fuel pump failures that can cause the engine to stall. A Honda VIN check confirms whether the pump on that specific car has been replaced or remains open." },
    { title: "Transmission and software", body: "A series of Honda recalls covers transmission control software and components on certain Accord, Civic, and Acura models. The VIN lookup shows whether the dealer has completed the software flash or part replacement, which is important because untreated transmission recalls can cause shifting problems that look like mechanical wear." },
  ],
  recallsNoteBoldLead: "Buying a used Honda?",
  recallsNoteMid1: " Pair this Honda VIN lookup with a focused ",
  recallsNoteLink1: "recall check",
  recallsNoteMid2: " and an ",
  recallsNoteLink2: "accident history check",
  recallsNoteSuffix: " for a complete picture before you put money down.",
  h2Certified: "Honda Certified Pre-Owned vs Free VIN History",
  certified1Pre: "Honda's official ",
  certified1Bold: "Certified Pre-Owned",
  certified1Suffix: " program runs a 182-point inspection, includes a vehicle history report, and extends powertrain coverage to 7 years or 100,000 miles from the original sale date. It is a real differentiator — and it is the right answer for some buyers. But CPO is not the only path to a confident Honda purchase, and a free VIN lookup is the foundation underneath every smart used-car decision.",
  certified2Pre: "A free Honda VIN check gives you the same NMVTIS title-brand data and the same live NHTSA recall feed that a CPO inspection relies on. It will not perform a mechanical inspection — that still has to happen in person — but for ",
  certified2Link1: "non-CPO Hondas",
  certified2Mid: " sold private-party or at independent lots, pairing a Honda VIN lookup with a hands-on inspection from a trusted mechanic delivers most of what CPO delivers, at a fraction of the cost. For high-stakes purchases, follow the lookup with a full ",
  certified2Link2: "VIN history report",
  certified2Suffix: " to see every line item.",
  certified3: "The right call depends on your budget and your risk tolerance. CPO buys you a manufacturer-backed warranty and an extended powertrain commitment. A free Honda VIN lookup plus an independent inspection buys you a clearer picture at a lower total price. Either way, the lookup is step one.",
  certifiedCardTitle: "Honda buying checklist",
  certifiedChecklist: [
    "Run a free Honda VIN lookup for title brands and salvage records",
    "Check the live NHTSA feed for any open Honda recalls",
    "Confirm the decoded trim matches the seller's description",
    "Compare odometer snapshots across title transfers",
    "Get a hands-on inspection from a Honda-experienced mechanic",
    "Consider CPO for warranty coverage on higher-mileage Hondas",
  ],
  certifiedCardCta: "Run the lookup first — paste the Honda VIN here:",
  h2Internal: "Related VIN Checks for Honda Owners",
  internalIntro: "A Honda VIN lookup is the entry point. These focused checks dig into specific records when something looks off — or when you want a complete picture before you buy.",
  internalLinks: [
    { href: "/vin-check/honda", label: "Honda VIN Check Hub", desc: "Full Honda VIN check landing page covering history reports, model coverage, and Honda-specific buying guidance." },
    { href: "/vin-decoder", label: "VIN Decoder", desc: "Break down any 17-character VIN — Honda or otherwise — into year, make, model, trim, and factory equipment." },
    { href: "/recall-check", label: "Recall Check", desc: "Look up any open Honda safety recalls attached to a VIN through the live NHTSA feed." },
    { href: "/flood-check", label: "Flood Damage Check", desc: "Confirm whether a Honda was branded flood or water-damaged in any state." },
    { href: "/odometer-check", label: "Odometer Check", desc: "Track mileage history and spot odometer rollbacks across the Honda title chain." },
    { href: "/salvage-title-check", label: "Salvage Title Check", desc: "See if the Honda VIN carries a salvage, junk, or non-repairable title brand." },
    { href: "/accident-history-check", label: "Accident History Check", desc: "Surface reported collisions, damage events, and total-loss claims by Honda VIN." },
    { href: "/pricing", label: "Pricing", desc: "Compare the free Honda VIN lookup against the full paid history report when you need every line item." },
  ],
  h2Faq: "Honda VIN Lookup — Frequently Asked Questions",
  faqIntro: "The questions Honda owners and used-Honda buyers ask most when they want to lookup a Honda VIN.",
  bottomBadge: "Free · Instant · NMVTIS Source",
  ctaBottomHeading: "Ready to Lookup a Honda VIN?",
  ctaBottomSub: "Enter any 17-character Honda VIN to run a free Honda VIN check against NMVTIS sources, the live NHTSA recall feed, and our decoder. No account required.",
  ctaBottomNote: "No credit card · No sign-up · Free",
} as const;

const FAQS_EN = [
  { question: "How do I look up a Honda VIN?", answer: "To look up a Honda VIN, find the 17-character VIN — typically on the lower driver-side corner of the windshield, the driver-side door jamb sticker, the title document, or the insurance card — and enter it into the free Honda VIN lookup form on this page. The tool validates that the VIN is exactly 17 characters and excludes the disallowed letters I, O, and Q, then queries the VIN against NMVTIS, the NHTSA recall feed, and our decoder. In a few seconds you get a complete picture: decoded year, make, model, trim, engine, plant of manufacture, plus title brand history and any open Honda safety recalls. No sign-up and no credit card required for the basic lookup." },
  { question: "What does a Honda VIN reveal?", answer: "A Honda VIN reveals everything the manufacturer encoded into the 17 characters — model year, model line, trim level, body style, engine, transmission, drivetrain, and the specific assembly plant — plus everything that has happened to that car since it left the plant. A complete Honda VIN lookup adds the title chain (which states the car has been titled in), any title brands (flood, salvage, junk, rebuilt, lemon-law buyback), open NHTSA recalls (including Takata airbag and fuel pump campaigns), and odometer snapshots recorded at each title transfer. It is the same VIN-keyed data Honda dealers, insurers, and auction houses use, presented for a buyer." },
  { question: "Is Honda VIN lookup free?", answer: "Yes. The basic Honda VIN lookup on this page is free, with no sign-up, no credit card, and no hidden charges. You enter the 17-character Honda VIN and we return the decoded factory specs (year, trim, engine, plant), a title-brand summary from NMVTIS, and any open recalls from the live NHTSA feed. Free Honda VIN lookups are possible because NMVTIS title-brand data and NHTSA recall data are accessible through approved providers — we surface the consumer-relevant fields without putting a paywall in front of basic safety information. A paid full history report is available if you need every dated line item, but the free Honda VIN check is sufficient for most pre-purchase decisions." },
  { question: "Where is the VIN on a Honda?", answer: "Honda prints the VIN in at least five places on every modern vehicle. The fastest is the lower driver-side corner of the windshield, visible by looking through the glass from outside the car. The driver-side door jamb sticker is the second-easiest place — Honda includes it as required by federal law, and it also lists the tire pressure spec and the manufacture date. The VIN also appears on the Honda title document, the insurance ID card, and the state registration document. On older Hondas and Acuras you may find it stamped on the firewall under the hood or on the steering column. If the VIN on the dashboard does not match the VIN on the title, stop — that mismatch is a strong signal that the car's identity has been tampered with." },
  { question: "How do I check Honda recalls by VIN?", answer: "To check Honda recalls by VIN, enter the 17-character Honda VIN into the lookup form on this page. The tool queries the live NHTSA recall feed and the manufacturer's recall data and returns any open recalls attached to that specific VIN. Honda recalls remain attached to the VIN until the work is completed at an authorized Honda or Acura dealer — and many used Hondas still carry open recall work the previous owner never resolved. Common open recalls include Takata airbag inflators (the largest recall in automotive history), fuel pump assemblies on certain 2018-2020 models, and transmission control software on selected Accord and Civic models. Honda performs recall work at no charge regardless of ownership, so if a recall is open, schedule the service at a dealer immediately." },
  { question: "Does Honda offer a free VIN lookup tool?", answer: "Honda's owner website (owners.honda.com) and the NHTSA SaferCar site (nhtsa.gov/recalls) both offer free Honda VIN lookup features focused on recall status. Those tools tell you whether the specific Honda has any open safety recalls, but they do not surface title brands, salvage records, or the title-chain history. The free Honda VIN lookup on this page combines the same recall data — pulled live from the NHTSA feed — with NMVTIS title-brand records and a full Honda VIN decoder. If you only need recall status, the manufacturer and NHTSA tools are fine. If you are buying a used Honda and want title-brand and salvage records too, run the combined Honda VIN check here so you see everything in one place." },
  { question: "How can I tell if a Honda was in an accident?", answer: "A Honda VIN lookup is the fastest way to surface accident indicators on a specific Honda. NMVTIS receives total-loss reports from insurers and salvage-pool sales from auction houses, so any accident severe enough to be declared a total loss appears in the lookup. Title-brand data also captures rebuilt and salvage brands that follow major accident damage. For minor accidents that were repaired out-of-pocket without an insurance claim, no record may exist anywhere — that is true for any vehicle, not just Hondas. To catch those, pair the Honda VIN lookup with a dedicated accident history check and a hands-on pre-purchase inspection from a Honda-experienced mechanic. Visible signs of body repair (mismatched paint, uneven panel gaps, replaced bolts) are clues an inspection will surface even when the records are silent." },
];

export default function HondaVinLookupBody() {
  const c = COPY;

  return (
    <article className="pb-16 bg-surface">
      <div className="bg-primary text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-14 sm:pt-28 sm:pb-20">
          <Breadcrumbs items={[{ label: c.home, href: "/" }, { label: c.crumb }]} onDark />
          <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
            <Hash className="w-4 h-4" /> {c.badge}
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-headline font-extrabold leading-tight mb-4">
            {c.h1Lead}
            <span style={{ color: "var(--color-secondary-container)" }}>{c.h1Accent}</span>
          </h1>
          <p className="speakable-intro text-base sm:text-xl text-white/85 max-w-3xl mb-8 leading-relaxed">{c.intro}</p>

          <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-xl">
            <h2 className="text-base sm:text-lg font-headline font-extrabold text-primary mb-1">{c.formHeading}</h2>
            <p className="text-xs sm:text-sm text-on-surface-variant mb-4">{c.formSub}</p>
            <VinSearchForm size="lg" />
            <p className="mt-3 text-[11px] text-slate-400 flex items-center gap-1.5">
              <Lock className="w-3 h-3" /> {c.formNote}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
            {c.trustStats.map((s) => {
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
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Reveal}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">{c.revealIntro}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {c.reveals.map((s, i) => {
              const Icon = REVEAL_ICONS[i];
              return (
                <div key={s.title} className="rounded-2xl border border-outline-variant bg-surface p-5">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-base font-headline font-extrabold text-primary mb-1">{s.title}</h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">{s.body}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Decode}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl leading-relaxed">{c.decodeIntro}</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              <p>
                {c.decode1Pre}
                <strong className="text-on-surface">{c.decode1Bold}</strong>
                {c.decode1Suffix}
              </p>
              <p>
                {c.decode2Pre}
                <strong className="text-on-surface">{c.decode2Bold}</strong>
                {c.decode2Mid}
                <strong className="text-on-surface">{c.decode2Bold2}</strong>
                {c.decode2Suffix}
              </p>
              <p>{c.decode3}</p>
            </div>
            <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
              <div className="flex items-center gap-2 mb-3">
                <Factory className="w-5 h-5 text-primary" />
                <h3 className="font-headline font-extrabold text-primary">{c.decodeCardTitle}</h3>
              </div>
              <ul className="space-y-3 text-sm text-on-surface">
                {c.decodeRows.map((r) => (
                  <li key={r.label} className="flex items-center justify-between gap-3 rounded-lg bg-white px-3.5 py-2.5 border border-outline-variant/60">
                    <code className="font-mono font-bold text-primary">{r.label}</code>
                    <span className="text-on-surface-variant text-xs sm:text-sm text-right">{r.value}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-on-surface-variant leading-relaxed">{c.decodeCardNote}</p>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">{c.h2Where}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              <p>
                {c.where1Pre}
                <strong className="text-on-surface">{c.where1Bold}</strong>
                {c.where1Suffix}
              </p>
              <p>{c.where2}</p>
              <p>{c.where3}</p>
            </div>
            <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-5 h-5 text-primary" />
                <h3 className="font-headline font-extrabold text-primary">{c.whereCardTitle}</h3>
              </div>
              <ul className="space-y-2 text-sm text-on-surface">
                {c.whereList.map((spot) => (
                  <li key={spot} className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>{spot}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-on-surface-variant leading-relaxed">{c.whereCardNote}</p>
            </div>
          </div>
        </section>

        <section className="py-10">
          <div className="rounded-3xl bg-primary p-7 sm:p-10 text-center">
            <Sparkles className="w-8 h-8 text-yellow-300 mx-auto mb-3" />
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-white mb-2">{c.midCtaHeading}</h2>
            <p className="text-white/80 text-sm sm:text-base mb-6 max-w-xl mx-auto">{c.midCtaSub}</p>
            <div className="max-w-xl mx-auto bg-white rounded-2xl p-4 sm:p-5">
              <VinSearchForm size="lg" />
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Recalls}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">{c.recallsIntro}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {c.recalls.map((item, i) => {
              const Icon = RECALL_ICONS[i];
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
              <FileText className="w-5 h-5 text-on-secondary-container flex-shrink-0 mt-0.5" />
              <p className="text-sm text-on-surface leading-relaxed">
                <strong className="text-on-surface">{c.recallsNoteBoldLead}</strong>
                {c.recallsNoteMid1}
                <Link href="/recall-check" className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.recallsNoteLink1}</Link>
                {c.recallsNoteMid2}
                <Link href="/accident-history-check" className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.recallsNoteLink2}</Link>
                {c.recallsNoteSuffix}
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">{c.h2Certified}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              <p>
                {c.certified1Pre}
                <strong className="text-on-surface">{c.certified1Bold}</strong>
                {c.certified1Suffix}
              </p>
              <p>
                {c.certified2Pre}
                <Link href="/vin-check/honda" className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.certified2Link1}</Link>
                {c.certified2Mid}
                <Link href="/vin-check" className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.certified2Link2}</Link>
                {c.certified2Suffix}
              </p>
              <p>{c.certified3}</p>
            </div>
            <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
              <div className="flex items-center gap-2 mb-3">
                <ClipboardCheck className="w-5 h-5 text-primary" />
                <h3 className="font-headline font-extrabold text-primary">{c.certifiedCardTitle}</h3>
              </div>
              <ul className="space-y-2 text-sm text-on-surface">
                {c.certifiedChecklist.map((tip) => (
                  <li key={tip} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" strokeWidth={3} />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 rounded-xl bg-white p-4 border border-outline-variant">
                <p className="text-xs font-bold text-on-surface mb-2">{c.certifiedCardCta}</p>
                <VinSearchForm size="sm" />
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Internal}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7">{c.internalIntro}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {c.internalLinks.map((l) => (
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
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Faq}</h2>
          <p className="text-sm text-on-surface-variant mb-8">{c.faqIntro}</p>
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
            <Zap className="w-3.5 h-3.5" /> {c.bottomBadge}
          </div>
          <h2 className="text-2xl sm:text-4xl font-headline font-extrabold text-primary mb-3">{c.ctaBottomHeading}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl mx-auto mb-8">{c.ctaBottomSub}</p>
          <div className="max-w-xl mx-auto bg-surface-container-low rounded-2xl p-5 border border-outline-variant">
            <VinSearchForm size="lg" />
          </div>
          <div className="mt-3 flex items-center justify-center gap-2 text-xs text-on-surface-variant">
            <Check className="w-3.5 h-3.5 text-green-500" strokeWidth={3} />
            {c.ctaBottomNote}
          </div>
        </section>

        <RelatedChecks exclude="/honda-vin-lookup" />
      </div>
    </article>
  );
}

export { FAQS_EN };
