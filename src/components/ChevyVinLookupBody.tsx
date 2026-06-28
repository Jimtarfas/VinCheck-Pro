/**
 * Body for /chevy-vin-lookup — English-only brand page targeting the
 * "chevy vin number lookup" keyword cluster (~1.3K US monthly searches).
 * Mirrors the visual structure of VinNumberLookupBody but flattens COPY (no locales).
 */

import Link from "@/components/LocaleLink";
import {
  Check, Shield, Search, FileText, Database, Car,
  ChevronRight, Lock, Zap, BadgeCheck, Sparkles, Hash, Wrench,
  Gauge, ClipboardCheck, AlertTriangle, MapPin, Cpu,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";

const HOW_ICONS = [Search, Database, FileText] as const;
const REVEAL_ICONS = [Cpu, Wrench, Gauge, Car, Hash, BadgeCheck] as const;
const QUIRK_ICONS = [Sparkles, Zap, Shield] as const;

const COPY = {
  home: "Home",
  crumb: "Chevy VIN Lookup",
  badge: "Free Chevy VIN Lookup   ·   Decoded Specs + Recalls + Build",
  h1Lead: "Chevy VIN Lookup — ",
  h1Accent: "Free Chevrolet Decode With RPO Codes, Recalls, and Build Sheet.",
  intro: "Every Chevrolet rolling off a GM line carries a 17-character VIN that quietly tells you what engine, transmission, axle ratio, and paint code the factory bolted in. A chevy VIN lookup translates that string into the same build data your dealer technician sees on the SPID label inside the glove box. Drop the VIN below and we'll decode the year, trim, drivetrain, and RPO options, then layer in open GM recalls and any title brands NMVTIS has on file. Free, instant, no sign-up.",
  formHeading: "Free Chevy VIN Lookup — Decode Any Chevrolet VIN",
  formSub: "Enter the 17-character Chevy VIN and we'll surface decoded factory specs, RPO build codes, open recalls, and any title brands — instantly.",
  formNote: "Free · No sign-up · Instant Chevrolet decode",
  trustStats: [
    { icon: Cpu, value: "RPO codes", label: "factory build" },
    { icon: Car, value: "Every Chevy", label: "1981+ supported" },
    { icon: Shield, value: "GM recalls", label: "live NHTSA feed" },
    { icon: BadgeCheck, value: "Free", label: "no sign-up" },
  ],
  h2Reveals: "What a Chevy VIN Reveals",
  revealsIntro: "A Chevrolet VIN is denser than most. Beyond the year and model that any decoder returns, a chevy VIN lookup paired with the build-sheet data exposes the exact powertrain, axle, paint, and trim package that left the assembly plant. Here is what comes back when you lookup a Chevy VIN with us.",
  reveals: [
    { title: "Engine + RPO code", body: "The VIN's eighth character maps to the factory engine — LS3, LT1, LT4, LM7, L86, LFX, and so on — and the SPID label pairs it with the full three-character RPO code so you know exactly which long-block is between the fenders." },
    { title: "Transmission + axle", body: "Decoded outputs include the transmission family (4L60E, 4L80E, 6L80, 6L90, 8L90, 10L80, M5 six-speed) and the axle ratio RPO (GU6 for 3.42, GT4 for 3.73, GT5 for 4.10) — the difference between a tow-rated Silverado and a base half-ton." },
    { title: "Trim level + package", body: "LS, LT, RST, LTZ, Z71, Trail Boss, High Country on a Silverado; LS, RS, SS, ZL1, 1LE on a Camaro; Stingray, Z06, ZR1 on a Corvette. The lookup returns the factory trim and any option packages encoded into the VIN attributes." },
    { title: "Body style + drivetrain", body: "Crew cab vs. double cab vs. regular cab, short bed vs. long bed, 4WD vs. 2WD, and the GVWR class — all decoded straight from the VIN's vehicle-attribute section." },
    { title: "Paint code + interior", body: "Pulled from the SPID label keyed to the VIN, the paint RPO (Summit White GAZ, Black GBA, Red Hot G7C, Cherry Red GCS) and interior trim code tell you whether a respray happened — useful when a listing says original paint." },
    { title: "Plant + production sequence", body: "Characters 11–17 identify the assembly plant (Fort Wayne, Flint, Arlington, Bowling Green, Lansing) and the unit's production sequence — handy when a recall is plant-specific or build-date-specific." },
  ],
  h2Decode: "Decoding a Chevrolet VIN",
  decodeIntro: "GM's VIN structure follows the global ISO 3779 standard, but Chevrolet's WMI prefixes and plant codes are worth knowing in their own right. Here's how a chevy VIN lookup parses the 17 characters position by position.",
  decode1Pre: "The first three characters are the ",
  decode1Bold1: "World Manufacturer Identifier (WMI)",
  decode1Mid: ". Chevrolet uses ",
  decode1Bold2: "1G1",
  decode1Mid2: " for US-built passenger cars (Camaro, Corvette, Malibu, Impala, Cruze), ",
  decode1Bold3: "1GC",
  decode1Mid3: " for US-built trucks and SUVs (Silverado, Tahoe, Suburban, Colorado), ",
  decode1Bold4: "2G1",
  decode1Mid4: " for Canada-built Chevy cars from Oshawa, and ",
  decode1Bold5: "3GC",
  decode1Suffix: " for Mexico-built Chevy trucks from Silao or Ramos Arizpe.",
  decode2Pre: "Positions 4 through 8 are the ",
  decode2Bold: "Vehicle Descriptor Section",
  decode2Suffix: " — body style, restraint system, engine type, and series. Position 8 is the engine code and is the single most-decoded character on a Chevy VIN because it determines what's bolted to the bellhousing. The 9th character is the check digit; the 10th is the model year (L=2020, M=2021, N=2022, P=2023, R=2024, S=2025, T=2026).",
  decode3: "The 11th character is the assembly plant code: 8 for Shreveport (legacy Colorado/Canyon), C for Fort Wayne (Silverado/Sierra crew), F for Flint (HD trucks), G for Ramos Arizpe (Equinox/Blazer), J for Lansing Grand River (Camaro), N for Bowling Green (Corvette), R for Arlington (Tahoe/Suburban), Z for Fort Wayne (Silverado regular). The final six characters are the production sequence — every Chevy gets a unique trailing serial.",
  pathCardTitle: "Chevy VIN at a glance",
  pathRows: [
    { label: "WMI (positions 1–3)", value: "1G1 / 1GC / 2G1 / 3GC" },
    { label: "Engine code", value: "Position 8" },
    { label: "Model year", value: "Position 10" },
    { label: "Plant code", value: "Position 11" },
  ],
  pathCardNote: "One 17-character Chevy VIN, every factory choice on record. Run the decode in seconds with no account.",
  h2Build: "How the GM Build Sheet (SPID/RPO Label) Decodes Chevy Options",
  build1Pre: "Every GM-built Chevrolet carries an ",
  build1Bold: "SPID label",
  build1Suffix: " — the Service Parts Identification sticker — usually inside the glove box, the center console lid, or the spare-tire well. It lists the full set of RPO (Regular Production Option) codes the factory installed: engine, transmission, axle, paint, trim, wheels, suspension, infotainment, and every dealer-installed extra. A chevy VIN lookup that includes the build-sheet decode turns those three-character RPOs into plain English.",
  build2Pre: "The SPID label is keyed to the VIN, which is why a build-sheet decode is so powerful for used-Chevy buyers. A seller can claim a Silverado is a Z71 off-road package, but the SPID will list ",
  build2Bold: "Z71",
  build2Mid: " or it won't — and a lookup that surfaces the RPO codes gives you the proof. The same applies to a Camaro 1LE track package (",
  build2Bold2: "1LE",
  build2Mid2: " RPO), a Corvette Z51 performance package (",
  build2Bold3: "Z51",
  build2Mid3: " RPO), or a Trail Boss Silverado (",
  build2Bold4: "Z71",
  build2Suffix: " plus suspension lift RPOs). For a full breakdown by code family, see our dedicated GM build sheet decoder.",
  buildLinkPre: "Full GM RPO reference: ",
  buildLinkLabel: "GM Build Sheet Decoder",
  buildLinkSuffix: " — every Chevy, GMC, Cadillac, and Buick RPO code with plain-English meanings, organized by code family.",
  h2Where: "Where to Find Your Chevy VIN",
  whereIntro: "A chevy VIN lookup is only as fast as you can find the VIN. Chevrolet prints it in five places on every modern vehicle, and the build-sheet SPID label adds a sixth source unique to GM cars.",
  whereCards: [
    { icon: MapPin, title: "Lower windshield (driver side)", body: "Look through the glass from outside, lower corner of the driver-side windshield. This is the federally mandated visible VIN — fastest to read." },
    { icon: MapPin, title: "Driver-side door jamb sticker", body: "Open the driver's door. The white sticker on the B-pillar or door frame lists the VIN, tire pressures, and GVWR. Required on every Chevy by federal law." },
    { icon: MapPin, title: "Glove-box SPID label", body: "Open the glove box and check the inside surface or the underside of the lid. The Service Parts Identification label lists the VIN plus every RPO code the factory installed." },
    { icon: MapPin, title: "Vehicle title document", body: "The state-issued paper title prints the VIN at the top. On a private-party Chevy purchase, this is the VIN you should match against the dashboard." },
    { icon: MapPin, title: "Insurance ID card", body: "Your insurance card prints the VIN of every covered vehicle. Snap a photo and run the lookup before you renew or shop quotes." },
    { icon: MapPin, title: "OnStar/MyChevrolet app", body: "If the Chevy is enrolled, the VIN appears in the vehicle profile in the MyChevrolet app or the OnStar account portal — useful when you don't have the car in front of you." },
  ],
  whereNote: "Found the VIN? Paste it into the form above and run a free Chevy VIN lookup against NMVTIS, the GM recall feed, and our build-sheet decoder.",
  midCtaHeading: "Lookup This Specific Chevy VIN Now",
  midCtaSub: "Decoded specs, RPO codes, open recalls, and title brands — instantly. Free, no sign-up, no card required.",
  h2Recalls: "Common Chevy Recalls a VIN Lookup Surfaces",
  recallsIntro: "Chevrolet has issued some of the largest safety recalls in automotive history, and many remain unresolved on used vehicles because the work never gets done. A chevy VIN lookup queries the live NHTSA feed and the GM recall registry to surface any open campaign attached to the VIN.",
  recallsCards: [
    { title: "LS-engine valve spring (2014–2018)", body: "GM issued recalls covering certain Gen V small-block V8s for valve-spring fractures that could cause stalling. Silverado 1500, Suburban, Tahoe, Yukon, and Escalade with the 5.3L and 6.2L are within the affected build range. A VIN lookup confirms whether the spring replacement has been completed." },
    { title: "Cobalt ignition switch (legacy)", body: "The 2005–2010 Chevy Cobalt ignition-switch recall — one of the most consequential in GM history — covers more than 2 million vehicles. The repair is free at any Chevy dealer for life, but many cars never had the work done. A VIN lookup is the only way to know." },
    { title: "Silverado tailgate latch", body: "Multiple recalls on Silverado 1500 and 2500/3500 tailgates have addressed latch failures that can release the tailgate at speed. Coverage varies by build date and trim; a VIN lookup pulls the exact campaigns the truck is open on." },
    { title: "Bolt EV battery (LG Chem)", body: "2017–2022 Chevy Bolt EV and Bolt EUV battery-fire recalls require a battery-module replacement covered by GM. Used Bolt buyers should run a VIN lookup to confirm the new battery is installed before completing the purchase." },
    { title: "Takata airbag inflator", body: "Older Chevy Cruze, Equinox, and Impala models are caught up in the industry-wide Takata airbag inflator recall. A VIN lookup against the NHTSA feed flags any open Takata campaign on the vehicle." },
    { title: "Equinox seatbelt anchor", body: "Recent Equinox and Traverse campaigns have covered front-seatbelt-anchor welds that may not meet spec under crash loading. The fix is a free dealer-installed reinforcement — a VIN lookup confirms whether it's been done." },
  ],
  h2Quirks: "Camaro and Corvette VIN Decode Quirks",
  quirksIntro: "Most Chevy VINs decode cleanly, but the high-performance Camaro and Corvette lines have unique build variants — pace cars, anniversary editions, ZL1s, Z06s, ZR1s — that show up in the VIN's vehicle-descriptor section or the trailing sequence. A chevy VIN lookup that knows the patterns surfaces these details automatically.",
  quirks: [
    { title: "Special-build pace cars", body: "Indy 500 Pace Car Camaros (1967, 1969, 1982, 1993, 2009, 2010, 2011, 2014) and Pace Car Corvettes (1978, 1986, 1995, 1998, 2008) carry distinct VIN attributes and matching SPID RPOs (Z4Z for many Camaro Pace Cars). A proper decode flags the pace-car status rather than reading it as a base SS." },
    { title: "ZL1 / Z06 / ZR1 builds", body: "Camaro ZL1 (RPO 1LE for the track package), Corvette Z06, and Corvette ZR1 each carry unique engine codes (LSA, LS9, LT4, LT5) and trailing VIN sequences. A real chevy VIN lookup distinguishes a ZL1 from a 1SS with stripes — important for valuation." },
    { title: "Anniversary + COPO editions", body: "50th and 60th anniversary Camaros, 50th and 70th anniversary Corvettes, and COPO Camaro race-only builds carry distinctive RPO codes (Y2Y, Z2Y, CRH) on the SPID. The VIN itself often doesn't change much, but the build-sheet decode separates them from the standard production run." },
  ],
  h2Internal: "Related Chevy + VIN Checks That Build On Your Lookup",
  internalIntro: "A chevy VIN lookup is the entry point. These focused checks add brand history, recall depth, and full-history coverage when you want to be extra thorough on a Chevrolet purchase.",
  internalLinks: [
    { href: "/vin-check/chevrolet", label: "Chevrolet VIN Check Hub", desc: "Brand-level hub covering every Chevy model — Silverado, Camaro, Corvette, Tahoe, Equinox, and more — with model-specific guides." },
    { href: "/gm-build-sheet", label: "GM Build Sheet Decoder", desc: "Full RPO code reference for every Chevy, GMC, Cadillac, and Buick option — organized by code family with plain-English meanings." },
    { href: "/vin-decoder", label: "VIN Decoder", desc: "Break down any 17-character VIN into year, make, model, trim, engine, and factory equipment — not just Chevy." },
    { href: "/recall-check", label: "Recall Check", desc: "Look up any open safety recalls attached to a VIN through the live NHTSA and manufacturer feeds." },
    { href: "/salvage-title-check", label: "Salvage Title Check", desc: "See if a Chevy VIN carries a salvage, junk, or non-repairable title brand from any state DMV." },
    { href: "/vin-number-lookup", label: "General VIN Number Lookup", desc: "Same lookup tool with no brand focus — works for any 17-character VIN on any make." },
    { href: "/pricing", label: "Full Chevy History Report", desc: "Upgrade a free lookup to a full report with accident records, mileage history, and complete title chain." },
  ],
  h2Faq: "Chevy VIN Lookup — Frequently Asked Questions",
  faqIntro: "The questions Chevrolet buyers ask most when they want to lookup a Chevy VIN for the first time.",
  bottomBadge: "Free · Instant · GM-Specific Decode",
  ctaBottomHeading: "Ready to Lookup a Chevy VIN?",
  ctaBottomSub: "Enter any 17-character Chevrolet VIN to decode factory RPO codes, surface open GM recalls, and check NMVTIS title brands. No account, no card, no catch.",
  ctaBottomNote: "No credit card · No sign-up · Free Chevy decode",
} as const;

const FAQS_EN = [
  { question: "How do I look up a Chevy VIN?", answer: "Find the 17-character VIN on your Chevrolet — the easiest spots are the lower driver-side windshield (visible from outside), the driver-side door jamb sticker, or the SPID label inside the glove box. Then paste it into the chevy VIN lookup form on this page. The tool validates that the VIN is exactly 17 characters and contains no I, O, or Q, then queries the decoder, the NHTSA recall feed, and NMVTIS title records in parallel. You'll see decoded specs (year, model, trim, engine, transmission, drivetrain), open recalls, and any title-brand history in seconds. No account required, no credit card, no hidden charges." },
  { question: "What does a Chevrolet VIN tell me?", answer: "A Chevrolet VIN encodes the World Manufacturer Identifier (1G1 for US-built passenger cars, 1GC for US-built trucks/SUVs, 2G1 for Canada-built, 3GC for Mexico-built), the body style, the restraint system, the engine family, the model year, the assembly plant, and the production sequence. Layered on top of the VIN, the GM SPID build-sheet label keyed to that VIN lists every RPO (Regular Production Option) code the factory installed: exact engine RPO, transmission, axle ratio, paint code, trim package, wheels, suspension, infotainment, and any dealer-installed extras. A real chevy VIN lookup returns both layers." },
  { question: "Is the Chevy VIN lookup free?", answer: "Yes. The basic chevy VIN lookup on this page is free, with no sign-up, no credit card, and no hidden charges. You enter the 17-character Chevrolet VIN and we return decoded factory specs, the RPO build summary, open GM recalls, and the title-brand summary right away. NMVTIS data and NHTSA recall data are accessible through approved providers, which is why we can offer the consumer-relevant fields for free. A paid full history report is available if you need every line item, every reported mileage reading, and every accident record, but the free Chevy VIN lookup is sufficient for most pre-purchase decisions." },
  { question: "Where is the VIN on a Chevy Silverado?", answer: "Every modern Chevy Silverado (1500, 2500HD, 3500HD) prints the VIN in at least five places. The fastest to read is the lower driver-side corner of the windshield, visible from outside the truck. The second is the driver-side door jamb sticker on the B-pillar — a federal requirement, always present. The third is the SPID label inside the glove box, which adds the full RPO build sheet. The fourth and fifth are the title document and the insurance card. On some Silverado HD trucks the VIN also appears stamped into the frame rail under the driver's door — useful for verifying authenticity on older trucks that may have had body panels replaced." },
  { question: "How do I check Chevy recalls?", answer: "Run the VIN through the chevy VIN lookup on this page. The tool queries the live NHTSA recall feed and the GM recall registry, returning any open safety campaigns attached to the VIN — Cobalt ignition switch, Silverado tailgate latch, Bolt EV battery, LS valve spring, Takata airbag, Equinox seatbelt anchor, and any newer campaigns. Open recalls remain attached to the VIN until the work is completed at a Chevy dealer, and all recall repairs are free regardless of vehicle age or ownership. If a recall shows open, call any Chevrolet dealership service department and schedule the fix — there is no charge, no matter how old the vehicle." },
  { question: "How do I get RPO codes from a Chevy VIN?", answer: "RPO (Regular Production Option) codes aren't encoded directly into the 17-character VIN itself — they live on the SPID (Service Parts Identification) label that GM places inside every Chevy's glove box, center console, or spare-tire well. The SPID label is keyed to the VIN, which is why a chevy VIN lookup that includes build-sheet decoding can return the RPO list automatically. Engine RPOs (L86, LT1, LT4, LM7), transmission RPOs (M5U for 6L80, MQE for 10L80), axle RPOs (GU6 for 3.42, GT4 for 3.73), paint RPOs (GAZ for Summit White, GBA for Black), and trim/package RPOs (Z71, 1LE, Z06, Z51) all appear on the SPID. For a full RPO reference, see our GM Build Sheet Decoder linked above." },
  { question: "How do I check if a Chevy is salvage?", answer: "Run the VIN through the chevy VIN lookup on this page. The tool queries NMVTIS — the federal title aggregator that pulls from all 50 state DMVs, insurance carriers, and salvage auctions — for any salvage, junk, rebuilt, non-repairable, flood, or lemon-law title brand attached to the VIN. NMVTIS is the most authoritative single source for salvage history in the United States because federal law requires states, insurers, and salvage operators to report. If the lookup shows a salvage brand, you can use our dedicated salvage title check to see exactly which brand was applied, by which state, and on which date. A clean lookup is a strong signal but not absolute — a Chevy totaled out-of-pocket without an insurance claim may not appear, which is why a hands-on inspection still matters on any used purchase." },
];

export default function ChevyVinLookupBody() {
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
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Reveals}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl">{c.revealsIntro}</p>
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
                <strong className="text-on-surface">{c.decode1Bold1}</strong>
                {c.decode1Mid}
                <strong className="text-on-surface">{c.decode1Bold2}</strong>
                {c.decode1Mid2}
                <strong className="text-on-surface">{c.decode1Bold3}</strong>
                {c.decode1Mid3}
                <strong className="text-on-surface">{c.decode1Bold4}</strong>
                {c.decode1Mid4}
                <strong className="text-on-surface">{c.decode1Bold5}</strong>
                {c.decode1Suffix}
              </p>
              <p>
                {c.decode2Pre}
                <strong className="text-on-surface">{c.decode2Bold}</strong>
                {c.decode2Suffix}
              </p>
              <p>{c.decode3}</p>
            </div>
            <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
              <div className="flex items-center gap-2 mb-3">
                <Hash className="w-5 h-5 text-primary" />
                <h3 className="font-headline font-extrabold text-primary">{c.pathCardTitle}</h3>
              </div>
              <ul className="space-y-3 text-sm text-on-surface">
                {c.pathRows.map((r) => (
                  <li key={r.label} className="flex items-center justify-between gap-3 rounded-lg bg-white px-3.5 py-2.5 border border-outline-variant/60">
                    <span className="text-on-surface-variant">{r.label}</span>
                    <code className="font-mono font-bold text-primary">{r.value}</code>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-on-surface-variant leading-relaxed">{c.pathCardNote}</p>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">{c.h2Build}</h2>
          <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4 max-w-3xl">
            <p>
              {c.build1Pre}
              <strong className="text-on-surface">{c.build1Bold}</strong>
              {c.build1Suffix}
            </p>
            <p>
              {c.build2Pre}
              <strong className="text-on-surface">{c.build2Bold}</strong>
              {c.build2Mid}
              <strong className="text-on-surface">{c.build2Bold2}</strong>
              {c.build2Mid2}
              <strong className="text-on-surface">{c.build2Bold3}</strong>
              {c.build2Mid3}
              <strong className="text-on-surface">{c.build2Bold4}</strong>
              {c.build2Suffix}
            </p>
          </div>
          <div className="mt-6 rounded-2xl bg-secondary-container/40 border border-outline-variant p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-on-secondary-container flex-shrink-0 mt-0.5" />
              <p className="text-sm text-on-surface leading-relaxed">
                {c.buildLinkPre}
                <Link href="/gm-build-sheet" className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.buildLinkLabel}</Link>
                {c.buildLinkSuffix}
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Where}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">{c.whereIntro}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {c.whereCards.map((w) => {
              const Icon = w.icon;
              return (
                <div key={w.title} className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-base font-headline font-extrabold text-primary mb-1">{w.title}</h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">{w.body}</p>
                </div>
              );
            })}
          </div>
          <p className="mt-6 text-sm text-on-surface-variant max-w-3xl">{c.whereNote}</p>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {c.recallsCards.map((r) => (
              <div key={r.title} className="rounded-2xl border border-outline-variant bg-surface p-5">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                  <AlertTriangle className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-base font-headline font-extrabold text-primary mb-1">{r.title}</h3>
                <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">{r.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Quirks}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">{c.quirksIntro}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {c.quirks.map((q, i) => {
              const Icon = QUIRK_ICONS[i];
              return (
                <div key={q.title} className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5 sm:p-6">
                  <div className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-base sm:text-lg font-headline font-extrabold text-primary mb-1.5">{q.title}</h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">{q.body}</p>
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

        <RelatedChecks exclude="/chevy-vin-lookup" />
      </div>
    </article>
  );
}

export { FAQS_EN };
