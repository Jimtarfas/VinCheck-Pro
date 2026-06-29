/**
 * Body for /tesla-vin-decoder — English-only TOP-LEVEL HUB page targeting
 * the broad "tesla vin decoder" keyword. Covers every model, every plant,
 * full 17-character breakdown, and the standard model-year code table.
 */

import Link from "@/components/LocaleLink";
import {
  Check, Shield, Search, FileText, Database, Car,
  ChevronRight, Lock, Zap, BadgeCheck, Sparkles, Hash, Wrench,
  Gauge, ClipboardCheck, AlertTriangle, MapPin, Cpu, Factory, Calendar,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import QuickAnswer from "@/components/QuickAnswer";
import { TESLA_WMI, TESLA_MODELS, TESLA_PLANTS, VIN_YEAR_CODES, TESLA_VIN_RULES } from "@/lib/tesla-data";

const QUICK_ANSWER_ITEMS = [
  {
    question: "What is a Tesla VIN decoder?",
    answer: (
      <>
        <strong>CarCheckerVIN&apos;s</strong> free Tesla VIN decoder applies the
        federal VIN standard (49 CFR Part 565, ISO 3779) to decode any
        17-character Tesla VIN into model, Gigafactory, model year, trim, and
        battery configuration. As an NMVTIS-approved data provider,
        CarCheckerVIN also surfaces title brands and open NHTSA recalls — free.
      </>
    ),
  },
  {
    question: "What does each character of a Tesla VIN mean?",
    answer: (
      <>
        Positions 1-3 are the WMI (plant): <code>5YJ</code> Fremont,
        <code> 7SAY</code> Austin, <code>LRW</code> Shanghai, <code>XP7</code>{" "}
        Berlin. Positions 4-8 encode model and equipment, 9 is the check digit,
        10 is the model year, 11 is the plant code, and 12-17 are the
        production sequence.
      </>
    ),
  },
  {
    question: "Is the Tesla VIN decoder free?",
    answer: (
      <>
        Yes. CarCheckerVIN&apos;s Tesla VIN decoder is free with no sign-up or
        credit card. It returns the decoded Gigafactory, year, model, trim,
        Autopilot hardware era, NMVTIS-sourced title brands, and open NHTSA
        recalls — every Model S, Model 3, Model X, Model Y, Cybertruck, and
        Roadster VIN.
      </>
    ),
  },
];

const HOW_ICONS = [Search, Database, FileText] as const;
const SIGN_ICONS = [Hash, Car, Cpu, AlertTriangle, Wrench, Gauge] as const;

const COPY = {
  home: "Home",
  crumb: "Tesla VIN Decoder",
  badge: "Free Tesla VIN Decoder   ·   All Models · All Plants   ·   NMVTIS-Sourced",
  h1Lead: "Tesla VIN Decoder — ",
  h1Accent: "Decode Any Model S, 3, X, Y, Cybertruck, or Roadster Free.",
  intro:
    "CarCheckerVIN's free Tesla VIN decoder applies the federal VIN standard (49 CFR Part 565, ISO 3779) to decode any 17-character Tesla VIN into model, Gigafactory, model year, trim, battery configuration, and Autopilot hardware revision. As an NMVTIS-approved data provider, CarCheckerVIN returns decoded specs plus title brands and NHTSA recalls for every Model S, Model 3, Model X, Model Y, Cybertruck, and Roadster VIN — free. Drop any 17-character Tesla VIN into the form below — 5YJ from Fremont, 7SAY from Austin, LRW from Shanghai, or XP7 from Berlin — and the decoder returns the year, model, trim, drivetrain, and recall status in seconds. No sign-up, no card, no catch.",
  formHeading: "Free Tesla VIN Decoder — Decode Any 17-Character Tesla VIN",
  formSub:
    "Enter a Tesla VIN to decode the Gigafactory, model, year, trim, drivetrain, and battery configuration, then surface any open NHTSA safety recalls attached to the VIN.",
  formNote: "Free · No sign-up · Instant decode",
  trustStats: [
    { icon: Database, value: "NMVTIS", label: "title history" },
    { icon: Factory, value: "4 plants", label: "decoded by WMI" },
    { icon: Shield, value: "NHTSA", label: "recall feed" },
    { icon: BadgeCheck, value: "Free", label: "no sign-up" },
  ],
  h2How: "How the Tesla VIN Decoder Works",
  howIntro:
    "Decoding a Tesla VIN is a three-step job. You provide the 17-character VIN; the decoder reads the WMI for the plant, position 10 for the year, the VDS for the model and trim, then queries NMVTIS for title brands and NHTSA for any open Tesla recall campaigns. The full decode runs in seconds against the same records Tesla service centers use.",
  howSteps: [
    {
      tag: "Step 1",
      title: "Enter the Tesla VIN",
      body:
        "Paste the 17-character VIN from the windshield, the door pillar sticker, the Tesla app, or the title document. The Tesla VIN decoder validates that it is exactly 17 characters and excludes the disallowed letters I, O, and Q per FMVSS 565 before running.",
    },
    {
      tag: "Step 2",
      title: "We decode + query the records",
      body:
        "Your Tesla VIN decode reads the WMI (5YJ Fremont, 7SAY Austin, LRW Shanghai, XP7 Berlin), the model year character at position 10, the model and trim inside the VDS, then queries NMVTIS for title brands and the NHTSA recall feed for any open Tesla actions still attached to the VIN.",
    },
    {
      tag: "Step 3",
      title: "Read the Tesla decode",
      body:
        "You see the decoded Gigafactory, model year, model (Model S, 3, X, Y, Cybertruck, or Roadster), trim, drivetrain, title-brand summary, and any open NHTSA recalls — including the Autopilot OTA campaign (23V-838) and the touchscreen visibility action (24V-051).",
    },
  ],
  h2Models: "Every Tesla Model the Decoder Covers",
  modelsIntro:
    "The Tesla VIN decoder handles every production Tesla shipped since 2008 — six models across four Gigafactories. The VDS section of the VIN (positions 4-8) encodes the model, body style, and equipment, and the decoder maps that string back to a human-readable trim summary.",
  h2Plants: "Every Gigafactory the Decoder Maps",
  plantsIntro:
    "The first three characters of any Tesla VIN — the World Manufacturer Identifier (WMI) — tell the decoder where the car was built. Tesla uses four WMIs, one per Gigafactory, under the SAE J853 standard. Every decoded Tesla VIN starts with this lookup.",
  h2Decode: "The Full 17-Character Tesla VIN Breakdown",
  decodeIntro:
    "The 17 characters of any Tesla VIN follow the federal VIN standard (49 CFR Part 565, ISO 3779). The decoder reads each position in turn — here is what every position encodes.",
  decodeRows: [
    { code: "1-3", meaning: "WMI — World Manufacturer Identifier. 5YJ Fremont (US), 7SAY Austin (US), LRW Shanghai (China), XP7 Berlin (Germany). Confirms country, manufacturer, and plant in a single three-character prefix per SAE J853." },
    { code: "4-8", meaning: "VDS — vehicle descriptor section encoding the model line (Model S, 3, X, Y, Cybertruck, Roadster), body style, restraint configuration, and high-voltage battery pack." },
    { code: "9", meaning: "Check digit — a federally-required mathematical checksum that catches typos and fraudulent VIN edits. If position 9 does not validate against the rest of the VIN, the VIN is wrong or tampered with." },
    { code: "10", meaning: "Model year — see the year-code table below. Tesla VINs encode the year with a single letter or digit cycling through 30 years before repeating." },
    { code: "11", meaning: "Plant code — narrows assembly within the WMI. Most Tesla plants currently use a single code per WMI, but the position is reserved per the federal standard." },
    { code: "12-17", meaning: "Production sequence — the unique six-digit serial that distinguishes one Tesla from the next off the same line." },
  ],
  decodeTail: `Tesla VINs use the standard 17-character length, exclude the letters I, O, Q (and Z, U, 0 in the year position) per ${TESLA_VIN_RULES.standard}, and follow the same rules every post-1981 vehicle does. The decoder enforces these rules before running any lookup — a 17-character string that fails the federal pattern is rejected at validation.`,
  h2YearTable: "Tesla VIN Year Code Table (Position 10)",
  yearIntro:
    "Position 10 of any 17-character Tesla VIN encodes the model year. The federal standard cycles through 30 unique characters before repeating, skipping the letters I, O, Q, U, Z, and the digit 0 to avoid visual confusion. Here is the relevant slice for every production Tesla VIN.",
  h2Where: "Where to Find Your Tesla VIN Before You Decode",
  where1Pre: "Most people get stuck before they even start a Tesla VIN decode because they cannot find the VIN. Good news — every Tesla prints the VIN in ",
  where1Bold: "at least four places",
  where1Suffix: ", and any one of them is enough to feed the decoder.",
  where2:
    "The fastest spot is the lower corner of the windshield on the driver's side — look through the glass from outside the Tesla. The driver-side door pillar sticker is the second-easiest. The Tesla app prints the VIN inside the Vehicle tab once the car is associated with your account. The title document, registration card, and insurance ID card print the VIN as well, and Tesla's Supercharger session history in the app is keyed to the same VIN.",
  where3:
    "If the VIN on the dashboard does not match the VIN on the Tesla title, stop. That mismatch is a strong signal that something is wrong with the vehicle's identity — exactly the kind of thing a Tesla VIN decoder validation pass is designed to catch via the check-digit at position 9.",
  whereCardTitle: "Five places the Tesla VIN lives",
  whereList: [
    "Lower driver-side windshield (visible from outside)",
    "Driver-side door pillar sticker",
    "Tesla app · Vehicle tab",
    "Registration card and insurance ID",
    "Tesla Supercharger session history",
  ],
  whereCardNote: "Found it? Drop the VIN into the form above and run a free Tesla VIN decode in seconds.",
  h2Quirks: "Tesla-Specific Quirks the Decoder Surfaces",
  quirks: [
    { title: "Autopilot hardware tier (HW3 vs HW4)", body: "Tesla shipped Autopilot Hardware 3 (HW3) from 2019 through early 2023 and transitioned the fleet to Hardware 4 (HW4) starting in April 2023 on Model S/X, then expanding to Model 3, Model Y, and Cybertruck. The VIN doesn't encode hardware tier directly, but the model-year code at position 10 combined with the production sequence at positions 12-17 narrows the build date — and HW3 vs HW4 determines whether Full Self-Driving (FSD) can be transferred between cars under Tesla's transfer rules." },
    { title: "Battery chemistry by trim and plant", body: "Standard Range Model 3 and Model Y trims built at Shanghai and Berlin use CATL LFP (lithium iron phosphate) packs; Long Range and Performance trims use NCM (nickel cobalt manganese). The decoder returns the trim and the plant — combine those two and you know the chemistry without a service-center lookup." },
    { title: "FSD transfer eligibility", body: "Full Self-Driving (FSD) packages historically did not transfer between Teslas, with limited exceptions Tesla announced periodically. The Tesla VIN decoder identifies the model and hardware tier — which determines whether a previously-purchased FSD can be moved to a new Tesla under whatever rules Tesla has in force at the time." },
    { title: "Supercharging history travels with the VIN", body: "Tesla's Supercharger session history is keyed to the VIN, not the owner. A used Tesla you buy carries every Supercharge session the prior owner logged — accessible through the Tesla app once the vehicle is associated with your account. The decoder confirms the VIN before you take delivery." },
  ],
  midCtaHeading: "Decode This Specific Tesla VIN Right Now",
  midCtaSub: "You already have a Tesla VIN in mind. Run it through the decoder for the Gigafactory, year, trim, and recall status — free, in seconds. No sign-up.",
  h2Signs: "When You Should Run the Tesla VIN Decoder",
  signsIntro:
    "The Tesla VIN decoder is cheap insurance — actually free — for anyone making a decision about a specific Tesla. Six situations where decoding the Tesla VIN before you commit pays off.",
  signs: [
    { title: "Before buying a used Tesla private-party", body: "The seller's word on year and trim is not the VIN record. Decoding the Tesla VIN confirms the Gigafactory, year, and trim, and surfaces any open NHTSA recalls the seller may not even know about." },
    { title: "Shopping a Tesla on an independent lot", body: "Independent dealers inherit cars from auctions. A quick Tesla VIN decode tells you whether the trade-in came with a flood brand, an accident history, or unresolved Autopilot or touchscreen recalls before you negotiate." },
    { title: "Decoding an unfamiliar Tesla trim", body: "Need to know if that used Model 3 is Standard Range, Long Range, Performance, or Highland refresh? The Tesla VIN decoder returns the factory-installed trim so you can compare apples to apples." },
    { title: "Confirming Gigafactory of origin", body: "Some Tesla buyers prefer Fremont over Shanghai for warranty and resale reasons. The decoder reads the WMI and confirms 5YJ Fremont, 7SAY Austin, LRW Shanghai, or XP7 Berlin in the first three characters." },
    { title: "Checking an inherited Tesla", body: "Inheriting a Tesla? A free Tesla VIN decode confirms the model year, trim, and Autopilot hardware tier before you put your name on the registration or attempt to add the vehicle to your Tesla account." },
    { title: "Verifying an insurance quote on a Tesla", body: "Insurers price by VIN. Running the Tesla VIN decoder confirms the year, trim, and safety equipment they used — and catches mistakes that inflate premiums on a Model S, Model 3, Model X, Model Y, or Cybertruck." },
  ],
  h2Internal: "Related Tesla VIN Pages That Build On the Decoder",
  internalIntro:
    "The Tesla VIN decoder is the broad entry point. These focused Tesla pages dig deeper into a specific model, a specific plant, or a specific record type — title brands, recalls, history.",
  internalLinks: [
    { href: "/tesla-vin-lookup", label: "Tesla VIN Lookup (Hub)", desc: "The broader Tesla VIN lookup hub — decoder plus title brands, accidents, recalls in one report." },
    { href: "/tesla-vin-history-check", label: "Tesla Vehicle History Check", desc: "Title brands, accidents, odometer integrity, and ownership transfers for any Tesla VIN." },
    { href: "/tesla-fremont-vin", label: "Tesla Fremont VIN Lookup", desc: "5YJ WMI — Tesla's original California plant, Model S/3/X/Y." },
    { href: "/tesla-austin-vin", label: "Tesla Austin VIN Lookup", desc: "7SAY WMI — Cybertruck and post-2022 Model Y from Gigafactory Texas." },
    { href: "/tesla-shanghai-vin", label: "Tesla Shanghai VIN Lookup", desc: "LRW WMI — Model 3 and Model Y from Gigafactory Shanghai." },
    { href: "/tesla-berlin-vin", label: "Tesla Berlin VIN Lookup", desc: "XP7 WMI — EU-market Model Y from Gigafactory Berlin-Brandenburg." },
    { href: "/tesla-model-3-vin-decoder", label: "Tesla Model 3 VIN Decoder", desc: "Model 3-specific decoder covering Fremont (5YJ) and Shanghai (LRW) builds." },
    { href: "/tesla-model-y-vin-decoder", label: "Tesla Model Y VIN Decoder", desc: "Model Y-specific decoder covering all four Gigafactories that build the Model Y." },
    { href: "/tesla-model-s-vin-decoder", label: "Tesla Model S VIN Decoder", desc: "Decode the 5YJ Model S — Tesla's flagship sedan from Fremont only." },
    { href: "/tesla-model-x-vin-decoder", label: "Tesla Model X VIN Decoder", desc: "Falcon-wing Model X decoder — Fremont 5YJ exclusive." },
    { href: "/tesla-cybertruck-vin-decoder", label: "Tesla Cybertruck VIN Decoder", desc: "Decode the 7SAY Cybertruck — Austin-only stainless-steel pickup." },
    { href: "/tesla-roadster-vin-decoder", label: "Tesla Roadster VIN Decoder", desc: "Decode the original 2008-2012 Roadster and second-gen reservations." },
    { href: "/tesla-model-3-recall-check", label: "Tesla Model 3 Recall Check", desc: "Open NHTSA recalls attached to a specific Model 3 VIN." },
    { href: "/tesla-model-y-recall-check", label: "Tesla Model Y Recall Check", desc: "Open NHTSA recalls attached to a specific Model Y VIN." },
    { href: "/tesla-model-s-recall-check", label: "Tesla Model S Recall Check", desc: "Open recalls for the 5YJ Model S — Autopilot OTA, touchscreen visibility, and more." },
    { href: "/tesla-model-x-recall-check", label: "Tesla Model X Recall Check", desc: "Open recalls for the 5YJ Model X — falcon-wing and front-trunk latch actions." },
    { href: "/tesla-cybertruck-recall-check", label: "Tesla Cybertruck Recall Check", desc: "Open recalls for the 7SAY Cybertruck — accelerator pedal and trim actions." },
    { href: "/tesla-roadster-recall-check", label: "Tesla Roadster Recall Check", desc: "Open recalls on the original first-generation Tesla Roadster." },
    { href: "/tesla-model-3-history-check", label: "Tesla Model 3 History Check", desc: "Full title and accident history for any Model 3 VIN." },
    { href: "/tesla-model-y-history-check", label: "Tesla Model Y History Check", desc: "Full title and accident history for any Model Y VIN across all four plants." },
    { href: "/tesla-model-s-history-check", label: "Tesla Model S History Check", desc: "Title brands, accidents, and ownership chain for any Model S VIN." },
    { href: "/tesla-model-x-history-check", label: "Tesla Model X History Check", desc: "Title brands, accidents, and ownership chain for any Model X VIN." },
    { href: "/tesla-cybertruck-history-check", label: "Tesla Cybertruck History Check", desc: "Title and accident history for the 7SAY Cybertruck." },
    { href: "/tesla-roadster-history-check", label: "Tesla Roadster History Check", desc: "Title and accident history for the original Tesla Roadster." },
    { href: "/vin-decoder", label: "General VIN Decoder", desc: "Any-make 17-character VIN decoder — useful for non-Tesla vehicles." },
    { href: "/recall-check", label: "General Recall Check", desc: "Any-make open NHTSA recall lookup." },
    { href: "/salvage-title-check", label: "Salvage Title Check", desc: "Confirm whether a Tesla VIN carries a salvage, junk, or non-repairable brand." },
    { href: "/flood-check", label: "Flood Damage Check", desc: "Check whether a Tesla was branded flood or water-damaged in any state." },
    { href: "/accident-history-check", label: "Accident History Check", desc: "Surface reported collisions, damage events, and total-loss claims on the Tesla VIN." },
    { href: "/odometer-check", label: "Odometer Check", desc: "Track mileage history and spot rollbacks across the Tesla title chain." },
    { href: "/vin-check", label: "Full VIN Check", desc: "Upgrade to a complete history report on any Tesla VIN when the free decode raises a flag." },
  ],
  h2Faq: "Tesla VIN Decoder — Frequently Asked Questions",
  faqIntro: "The questions buyers ask most when they want to decode a Tesla VIN for the first time.",
  bottomBadge: "Free · Instant · NMVTIS Source",
  ctaBottomHeading: "Ready to Decode a Tesla VIN?",
  ctaBottomSub: "Enter any 17-character Tesla VIN to run a free Tesla VIN decode against NMVTIS, the NHTSA recall feed, and the federal VIN standard. No account required.",
  ctaBottomNote: "No credit card · No sign-up · Free",
} as const;

const FAQS_EN = [
  { question: "What is a Tesla VIN decoder?", answer: "A Tesla VIN decoder is a tool that applies the federal VIN standard (49 CFR Part 565, ISO 3779) to a 17-character Tesla Vehicle Identification Number and returns the decoded factory specifications: the Gigafactory of origin, the model (Model S, Model 3, Model X, Model Y, Cybertruck, or Roadster), the model year, the trim, the drivetrain configuration, and (for paid integrations) the Autopilot hardware revision. CarCheckerVIN's Tesla VIN decoder also queries NMVTIS for title brand history and the NHTSA recall feed for any open Tesla safety recalls in the same lookup, returning a complete picture of the Tesla in seconds." },
  { question: "What do the first three characters of a Tesla VIN mean?", answer: "The first three characters of any Tesla VIN are the World Manufacturer Identifier (WMI), assigned under SAE J853. Tesla uses four WMIs, one per Gigafactory: 5YJ for Gigafactory California (Fremont, CA, since 2010); 7SAY for Gigafactory Texas (Austin, TX, since 2022); LRW for Gigafactory Shanghai (China, since December 2019); and XP7 for Gigafactory Berlin-Brandenburg (Grünheide, Germany, since March 2022). Reading the WMI alone tells you the country of origin, the manufacturer, and the assembly plant before any further decoding." },
  { question: "How does the Tesla VIN model-year code work?", answer: "Position 10 of every Tesla VIN encodes the model year using a single letter or digit. The federal standard cycles through 30 unique characters before repeating, skipping the letters I, O, Q, U, Z, and the digit 0 to avoid visual confusion. For Teslas in production now: L=2020, M=2021, N=2022, P=2023, R=2024, S=2025, T=2026, V=2027, W=2028, X=2029, Y=2030. Earlier-generation Model S VINs go back to C (2012). The decoder reads position 10 and returns the year automatically." },
  { question: "Is the Tesla VIN decoder really free?", answer: "Yes. CarCheckerVIN's Tesla VIN decoder is free with no sign-up, no credit card, and no hidden charges. You enter the 17-character Tesla VIN and the decoder returns the Gigafactory, year, model, trim, drivetrain, title-brand summary, and any open NHTSA recalls in seconds. Free Tesla VIN decoding is possible because the federal VIN standard is public and NMVTIS data plus NHTSA recall data are accessible through approved providers. A paid full history report is available if you need every line item, but the free decoder is sufficient for most pre-purchase decisions." },
  { question: "Where is the Tesla VIN located?", answer: "Every Tesla prints the VIN in at least five places. The easiest is the lower corner of the windshield on the driver's side, visible through the glass from outside the vehicle. The second is the driver-side door pillar sticker, which is required on every Tesla by federal law and also lists the manufacture date. The Tesla app prints the VIN inside the Vehicle tab once the car is associated with your account, and the title document and insurance ID card both print it. Tesla's Supercharger session history in the app is keyed to the same VIN, so any Tesla you have previously charged shows up under that VIN." },
  { question: "Can I use the Tesla VIN decoder for Cybertruck and Roadster?", answer: "Yes. The Tesla VIN decoder handles every production Tesla shipped since 2008, including the original 2008-2012 Roadster (Fremont assembly), the Model S (since 2012, Fremont), the Model X (since 2015, Fremont), the Model 3 (since 2017, Fremont and Shanghai), the Model Y (since 2020, Fremont/Austin/Shanghai/Berlin), and the Cybertruck (since November 2023, Austin only). The decoder reads the WMI to confirm the Gigafactory and the VDS positions 4-8 to identify the model and trim, and works on any 17-character Tesla VIN that passes the federal check-digit at position 9." },
  { question: "What does the check digit at position 9 do?", answer: "Position 9 of every VIN is a federally-required mathematical checksum that catches typos and fraudulent VIN edits. The check digit is computed by multiplying each of the other 16 characters by a position-specific weight, summing the products, and taking the result modulo 11 (with X representing 10). If the computed check digit does not match position 9 of the VIN you entered, the Tesla VIN decoder rejects the input as invalid. This is the first line of defense against VIN cloning, typos in handwritten titles, and brokered or auctioned vehicles with tampered VIN tags." },
];

const RELEVANT_YEARS: Array<[string, number]> = Object.entries(VIN_YEAR_CODES).sort((a, b) => a[1] - b[1]) as Array<[string, number]>;

export default function TeslaVinDecoderBody() {
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
        <div className="pt-10 sm:pt-12">
          <QuickAnswer items={QUICK_ANSWER_ITEMS} />
        </div>

        <section className="py-12 sm:py-16">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2How}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl">{c.howIntro}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {c.howSteps.map((m, i) => {
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
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Models}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl leading-relaxed">{c.modelsIntro}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {TESLA_MODELS.map((m) => (
              <div key={m.key} className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Car className="w-5 h-5 text-primary" />
                  <h3 className="text-base font-headline font-extrabold text-primary">{m.name}</h3>
                </div>
                <div className="text-xs text-on-surface-variant mb-2">
                  <code className="font-mono font-bold text-primary">VDS: {m.vdsPrefix}</code>
                  <span className="mx-2">·</span>
                  <span>Since {m.introYear}</span>
                </div>
                <div className="text-xs text-on-surface-variant mb-2">
                  Plants: {m.plants.join(", ")}
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">{m.note}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Plants}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl leading-relaxed">{c.plantsIntro}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {Object.entries(TESLA_WMI).map(([wmi, info]) => (
              <div key={wmi} className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5">
                <div className="flex items-center gap-3 mb-2">
                  <code className="font-mono font-black text-primary text-lg">{wmi}</code>
                  <h3 className="text-base font-headline font-extrabold text-primary">{info.plant}</h3>
                </div>
                <div className="text-xs text-on-surface-variant mb-2">Country: {info.country}</div>
                <div className="text-xs text-on-surface-variant mb-2">Models: {info.models.join(", ")}</div>
                <p className="text-xs text-on-surface-variant leading-relaxed">{info.note}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Decode}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl leading-relaxed">{c.decodeIntro}</p>
          <div className="rounded-2xl bg-primary/5 border border-primary/20 p-5 sm:p-6">
            <ul className="space-y-2.5 text-sm text-on-surface">
              {c.decodeRows.map((r) => (
                <li key={r.code} className="flex items-start gap-3 rounded-lg bg-white px-3.5 py-2.5 border border-outline-variant/60">
                  <code className="font-mono font-black text-primary text-base flex-shrink-0 w-14">{r.code}</code>
                  <span className="text-on-surface-variant text-xs sm:text-sm leading-relaxed">{r.meaning}</span>
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-5 text-sm sm:text-base text-on-surface-variant leading-relaxed max-w-3xl">{c.decodeTail}</p>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2YearTable}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl leading-relaxed">{c.yearIntro}</p>
          <div className="rounded-2xl bg-primary/5 border border-primary/20 p-5 sm:p-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
              {RELEVANT_YEARS.map(([code, year]) => (
                <div key={code} className="flex items-center justify-between rounded-lg bg-white px-3 py-2 border border-outline-variant/60">
                  <code className="font-mono font-black text-primary">{code}</code>
                  <span className="text-sm text-on-surface-variant">{year}</span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-on-surface-variant leading-relaxed">
              Position 10 reads left-to-right with the WMI: a Tesla VIN starting with <code className="font-mono">5YJ3</code> and showing the letter <code className="font-mono">R</code> at position 10 is a 2024 Model 3 built at Fremont.
            </p>
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
                {c.whereList.map((state) => (
                  <li key={state} className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>{state}</span>
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
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">{c.h2Quirks}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {c.quirks.map((q) => (
              <div key={q.title} className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5 sm:p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Cpu className="w-5 h-5 text-primary" />
                  <h3 className="text-base sm:text-lg font-headline font-extrabold text-primary">{q.title}</h3>
                </div>
                <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">{q.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Signs}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">{c.signsIntro}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {c.signs.map((s, i) => {
              const Icon = SIGN_ICONS[i];
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

        <RelatedChecks exclude="/tesla-vin-decoder" />
      </div>
    </article>
  );
}

export { FAQS_EN };
