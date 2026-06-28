/**
 * Body for /dodge-vin-lookup — English-only brand-specific page targeting
 * the "vin lookup dodge" keyword (~1.3K US monthly searches).
 * Mirrors the visual structure of VinNumberLookupBody but flattens COPY (no locales).
 */

import Link from "@/components/LocaleLink";
import {
  Check, Shield, Search, FileText, Database, Car,
  ChevronRight, Lock, Zap, BadgeCheck, Sparkles, Hash, Wrench,
  Gauge, ClipboardCheck, AlertTriangle, MapPin, Cpu, Truck, Flame,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";

const REVEAL_ICONS = [Cpu, Wrench, Gauge, Car, Hash, Shield] as const;
const WMI_ICONS = [MapPin, MapPin, MapPin, MapPin] as const;
const RECALL_ICONS = [AlertTriangle, Wrench, Shield] as const;

const COPY = {
  home: "Home",
  crumb: "Dodge VIN Lookup",
  badge: "Free Dodge VIN Lookup   ·   Mopar Build Sheet + Recalls",
  h1Lead: "Dodge VIN Lookup — ",
  h1Accent: "Free Decoded Report, Mopar Codes, and Open Recalls.",
  intro: "Every Charger, Challenger, Durango, Hornet, and pre-2010 Ram pickup carries a 17-character Dodge VIN that unlocks the factory build — the engine family (Hemi V8, SRT supercharged, Pentastar V6), the transmission, the rear axle ratio, and the full list of Mopar option codes the car rolled off the line with. Enter your Dodge VIN below and we'll decode the build, pull the open NHTSA recalls, and check NMVTIS for title-brand history in seconds. Free, no sign-up, no card.",
  formHeading: "Free Dodge VIN Lookup — Decode Any Dodge Charger, Challenger, Durango, or Hornet",
  formSub: "Enter your 17-character Dodge VIN. We'll return decoded specs, the Mopar build profile, open recalls, and title brand records — instantly.",
  formNote: "Free · No sign-up · Instant decoded Dodge report",
  trustStats: [
    { icon: Cpu, value: "Hemi & SRT", label: "engine decode" },
    { icon: FileText, value: "Mopar", label: "option codes" },
    { icon: Shield, value: "NHTSA", label: "open recalls" },
    { icon: BadgeCheck, value: "Free", label: "no sign-up" },
  ],
  h2Reveal: "What a Dodge VIN Reveals — Beyond Just Year and Model",
  revealIntro: "A Dodge VIN is one of the richest in the industry because Mopar (Chrysler's parts and service brand) packs trim, engine, transmission, axle, and option-package data into a tight 17-character string and the matching broadcast-sheet record. Here is what your free Dodge VIN lookup pulls back.",
  reveals: [
    { title: "Engine family — Hemi, SRT, or Pentastar", body: "The VIN's eighth character is the engine code. On modern Dodges that means the 5.7L Hemi V8 (T), the 6.4L 392 Hemi (J), the 6.2L supercharged Hellcat or Demon (Z), or the 3.6L Pentastar V6 (G) — and on the Hornet, the 1.3L turbo or 2.0L hybrid plug-in. The decode tells you exactly which engine left the Brampton, Toluca, or Pomigliano plant in your car." },
    { title: "Transmission and drivetrain", body: "Dodge VIN decoding surfaces the transmission — the 8HP70 or 8HP90 ZF 8-speed automatic in most Chargers and Challengers, the Tremec TR-6060 six-speed manual in Challenger SRT and Scat Pack trims, or the 9-speed in Durango V6. The drivetrain code reveals RWD vs AWD, which matters a lot for resale on a Charger in northern states." },
    { title: "Rear axle ratio and limited-slip", body: "Mopar option codes attached to the VIN reveal the axle — the 3.07, 3.09, 3.70, or 3.92 ratio — and whether the car was built with a Tru-Lok or anti-spin limited-slip differential. On a Scat Pack or Hellcat, the axle code is a major value driver." },
    { title: "Body style, trim, and color code", body: "The decode returns the body style (sedan, coupe, SUV, hatchback), the trim level (SXT, GT, R/T, Scat Pack, SRT, Hellcat, Demon, Redeye, Jailbreak), and the original factory paint code — useful when sourcing touch-up paint or verifying a repaint." },
    { title: "Production sequence number", body: "The final eight VIN digits form the unique serial. On rare Dodges — Hellcat, Demon, Demon 170, Challenger SRT Super Stock, and limited-build Last Call editions — the production sequence tells you exactly where in the run your car was built. Low numbers and famous numbers (like 001 or 666) carry collector premiums." },
    { title: "Plant of manufacture", body: "Most Chargers and Challengers were built at Brampton Assembly in Ontario, Canada (VIN starts 2C3). Durangos come from Detroit's Jefferson North (1C4). The Hornet is built alongside the Alfa Romeo Tonale in Pomigliano d'Arco, Italy (ZACN). The plant code tells you the build origin and, indirectly, the build-quality era." },
  ],
  h2Decode: "Decoding a Dodge VIN — WMI Patterns and What They Mean",
  decodeIntro: "The first three characters of any VIN — the World Manufacturer Identifier, or WMI — pin down the country, the manufacturer, and the vehicle type. Dodge uses a small family of WMIs, and recognizing them at a glance tells you a lot about the car before you even decode the rest.",
  wmis: [
    { code: "1D3 / 1D4 / 1D7 / 1D8", body: "USA-built Dodge passenger cars and trucks. 1D3 and 1D4 covered most of the Avenger, Caliber, Caravan/Grand Caravan, Journey, and Nitro era. 1D7 and 1D8 were used heavily on pre-2010 Dodge Ram trucks built in Warren, Saltillo, and St. Louis." },
    { code: "2C3 / 2C4 / 2D3 / 2D4", body: "Canada-built Dodges, primarily the Charger, Challenger, and earlier Magnum at Brampton Assembly in Ontario. If your modern Dodge muscle car's VIN starts with 2, it rolled off the Brampton line — which is the case for the vast majority of LX/LD-platform Chargers and LC-platform Challengers from 2006 to 2023." },
    { code: "1C4", body: "Dodge Durango, built at Jefferson North Assembly in Detroit (shares the line with the Jeep Grand Cherokee). The 1C4 prefix is also used on Chrysler and Jeep models from the same plant — the fourth, fifth, and sixth characters identify it as a Durango." },
    { code: "ZACN", body: "Italy-built Dodge Hornet, assembled at Pomigliano d'Arco alongside the Alfa Romeo Tonale on the Stellantis Small Wide LWB platform. The Z prefix marks Italian origin; the rest of the WMI is unique to the Hornet within the Stellantis North American lineup." },
  ],
  decodeTailPre: "After the WMI, the next six characters describe the vehicle attributes — model, body style, restraint system, and engine. The ",
  decodeTailBold1: "tenth character",
  decodeTailMid: " encodes the model year (a 2024 car uses ",
  decodeTailBold2: "R",
  decodeTailMid2: ", 2025 uses ",
  decodeTailBold3: "S",
  decodeTailSuffix: "), the eleventh is the plant code, and the final six are the unique serial that ties the VIN to its specific build record and broadcast sheet.",
  h2Broadcast: "How the Mopar Broadcast Sheet Decodes Dodge Options",
  broadcastIntro: "The broadcast sheet is the build slip Chrysler/Mopar printed for every vehicle as it moved down the assembly line. It is the original sales code record — every option, every package, every paint and trim code — and it is the document that turns a stripped Dodge VIN decode into a verifiable build provenance.",
  broadcast1Pre: "For modern Dodges (2005-present LX/LD/LC platforms), the broadcast sheet was typically affixed to the underside of the rear seat cushion, behind the glovebox, or above the headliner. On older Mopars from the 1960s and 1970s, sheets were often tucked into the springs of the front bench seat or behind the back seat — which is why finding an original broadcast sheet on a 1970 Challenger R/T or 1969 Charger 500 can add ",
  broadcast1Bold: "thousands of dollars",
  broadcast1Suffix: " to the car's value at auction.",
  broadcast2Pre: "If you have the VIN but not the physical sheet, Mopar dealers can usually order a reprint of the build record from the manufacturer's archive. The reprint reproduces the sales codes — paint code (e.g., PHB for B5 Blue, PEL for Plum Crazy), trim code, engine code, transmission code, and the full option-package list. Combined with a free Dodge VIN lookup like the one on this page, the broadcast sheet completes the build story. See our ",
  broadcast2Link: "Mopar broadcast sheet guide",
  broadcast2Suffix: " for a full walk-through of how to read every section.",
  broadcastCardTitle: "Broadcast sheet on a Dodge",
  broadcastRows: [
    { label: "Body style code", value: "LX / LD / LC" },
    { label: "Engine sales code", value: "EZH / EZD / ESG" },
    { label: "Paint code", value: "PHB · PEL · PXR" },
    { label: "Transmission code", value: "DFD · DFP · DEH" },
  ],
  broadcastCardNote: "Pair your free Dodge VIN lookup with the broadcast sheet codes for a complete build provenance — especially valuable on Hellcat, Demon, and pre-1972 Mopar muscle.",
  h2Where: "Where to Find the VIN on a Dodge",
  where1Pre: "Every modern Dodge stamps the VIN in at least four places. On a Charger or Challenger, the easiest spot is the ",
  where1Bold: "lower driver-side corner of the windshield",
  where1Suffix: " — read it through the glass from outside. The driver-side door jamb sticker is the second-easiest and is required by federal law on every car sold in the US since 1981.",
  where2: "On a Durango or Hornet, the windshield VIN sits in the same lower driver-side corner. The door jamb sticker is again on the driver-side B-pillar where the door latches. The title document and the insurance card both print the VIN as well, and the state registration carries it too.",
  where3Pre: "Vipers are the exception — Dodge stamped the VIN on the ",
  where3Bold: "engine block",
  where3Suffix: " of every Viper as well as the standard dashboard and door-jamb locations, because the hand-built nature of the car meant the engine and chassis records had to stay matched for warranty work. A Viper with mismatched VIN-to-engine numbers is a major red flag for buyers.",
  whereCardTitle: "Six places a Dodge VIN lives",
  whereList: [
    "Lower driver-side windshield (visible from outside)",
    "Driver-side door jamb sticker (federal requirement)",
    "Vehicle title document",
    "Insurance ID card",
    "State registration",
    "Engine block (Viper only — match to dashboard VIN)",
  ],
  whereCardNote: "Got the VIN? Paste it into the form above to run a free Dodge VIN lookup against NMVTIS, the NHTSA recall feed, and our Mopar decoder.",
  midCtaHeading: "Run Your Dodge VIN Right Now",
  midCtaSub: "You already have the Charger, Challenger, Durango, or Hornet in mind. Drop the VIN below for a free decoded build, open recalls, and title-brand check.",
  h2Recalls: "Common Dodge Recalls Your VIN Lookup Will Surface",
  recallsIntro: "Dodge has had its share of recall campaigns. The free recall check built into your Dodge VIN lookup pulls the live NHTSA feed, so any open campaign attached to your specific VIN surfaces immediately. Three of the most common Dodge recall families to watch for.",
  recalls: [
    { title: "Takata airbag legacy recalls", body: "Many 2003-2010 Dodge Charger, Magnum, Durango, Dakota, and pre-split Ram pickup VINs were affected by the Takata airbag inflator recall — the largest auto safety recall in US history. Inflators degrade with heat and humidity and can rupture, sending shrapnel into the cabin. The repair is free at any Dodge or Chrysler dealer, but a surprising number of affected VINs remain unrepaired." },
    { title: "Fuel-pump relay failure", body: "Several Charger, Challenger, and 300 model years from the LX platform era were recalled for a totally integrated power module (TIPM) fuel-pump relay that could fail and cause a stall without warning. If your VIN is in the affected range, the dealer either reprograms the TIPM or replaces it under the recall." },
    { title: "Brake fluid and brake-line corrosion", body: "Cold-weather Durango and Ram (pre-2010) VINs have been included in brake-line corrosion campaigns where road salt accelerates degradation of the brake lines or the brake-fluid reservoir cap. The recall covers inspection and replacement of any compromised components — a critical safety fix you'll catch with a free Dodge VIN lookup." },
  ],
  h2Ram: "Dodge Ram vs RAM Trucks — The 2010 Brand Split",
  ram1Pre: "Here is one of the most-asked questions on a Dodge VIN lookup. In 2010, Chrysler split the Ram pickup line out of the Dodge brand and made it its own marque, ",
  ram1Bold: "RAM Trucks",
  ram1Suffix: ". The trucks are mechanically and physically nearly identical across the split — what changed is the badging on the grille and the WMI on the VIN.",
  ram2Pre: "Pre-2010 Ram pickups (2009 model year and earlier) carry ",
  ram2Bold1: "Dodge VINs",
  ram2Mid: " — typically a 1D7 or 1D8 WMI. They are decoded, recall-checked, and history-reported as Dodge vehicles. Post-2010 Ram pickups (2011 model year and newer) carry ",
  ram2Bold2: "RAM brand VINs",
  ram2Mid2: " — typically a 1C6 WMI — and are decoded as RAM Trucks. The 2010 model year itself is the transition: most 2010 Rams shipped as Dodge Rams with Dodge VINs, but late-2010 production began carrying the new RAM-only badging.",
  ram3Pre: "If your truck is a 2009 or earlier Ram, run it through this Dodge VIN lookup. If it is a 2011 or newer Ram, use our ",
  ram3Link: "RAM VIN lookup",
  ram3Suffix: " for the most accurate decode of the RAM-branded trim names, engine codes, and option packages.",
  ramCardTitle: "Dodge or RAM? Quick rule",
  ramRows: [
    { label: "Model year ≤ 2009", value: "Dodge VIN — 1D7/1D8" },
    { label: "Model year 2010", value: "Transition (check VIN)" },
    { label: "Model year ≥ 2011", value: "RAM VIN — 1C6" },
  ],
  ramCardNote: "When in doubt, the WMI on the VIN itself is the final word. Drop the 17 characters into the form and we'll route the decode correctly.",
  h2Srt: "Hellcat, Demon, and SRT — Reading the Production Sequence",
  srt1Pre: "On a stock Dodge, the production sequence is just a serial number. On a Hellcat, Demon, Demon 170, Challenger SRT Super Stock, or a Last Call special edition, the sequence is ",
  srt1Bold: "collector intelligence",
  srt1Suffix: ". It tells you where in the production run your car was built and, by extension, how rare it is.",
  srt2: "Demon production ran exactly 3,300 units for the 2018 model year (3,000 US + 300 Canada). Each car's window sticker, dash plaque, and broadcast sheet list its build number — and the final digits of the VIN map directly to that sequence. Demon 170 production for 2023 was capped at 3,300 as well. Last Call Challenger and Charger editions for 2023 — Black Ghost, Shakedown, Scat Pack Swinger, Super Bee, King Daytona, and Demon 170 — each had limited production allotments listed on the plaque inside the car.",
  srt3: "A VIN lookup that surfaces the production sequence lets a buyer verify rarity claims before paying a collector premium. If a seller advertises a Demon as build number 50 of 3,300, the VIN tail should align with that claim — and if it doesn't, the lookup is the fastest way to catch the discrepancy.",
  srtCardTitle: "SRT collector-build markers",
  srtChecklist: [
    "Production sequence in the VIN tail",
    "Window sticker (Monroney) — original list of options and packages",
    "Dash plaque — for limited editions, shows build number",
    "Broadcast sheet — confirms factory engine, transmission, axle",
    "Title brand history — verifies no salvage or rebuilt status",
    "Open recalls — Hellcat-specific TIPM and brake campaigns",
  ],
  srtCardCta: "Verify your Hellcat, Demon, or SRT — paste the VIN here:",
  h2Internal: "Related Dodge and Mopar Checks",
  internalIntro: "A Dodge VIN lookup is the entry point. These focused tools dig deeper into specific Dodge records and Mopar provenance.",
  internalLinks: [
    { href: "/vin-check/dodge", label: "Full Dodge VIN Check", desc: "Complete Dodge history report — title brands, accidents, odometer, recalls, and prior-owner count in one place." },
    { href: "/ram-vin-lookup", label: "RAM VIN Lookup", desc: "Post-2010 RAM Trucks (1C6 WMI) — decode 1500, 2500, 3500, ProMaster, and ProMaster City VINs." },
    { href: "/mopar-broadcast-sheet", label: "Mopar Broadcast Sheet Guide", desc: "Read the Mopar build slip — paint codes, engine codes, transmission codes, and option packages." },
    { href: "/vin-decoder", label: "VIN Decoder", desc: "Break down any 17-character VIN into year, make, model, trim, and factory equipment." },
    { href: "/recall-check", label: "Recall Check", desc: "Look up any open safety recalls attached to a Dodge VIN through the live NHTSA feed." },
    { href: "/salvage-title-check", label: "Salvage Title Check", desc: "See if a Dodge VIN carries a salvage, junk, flood, or non-repairable title brand." },
    { href: "/accident-history-check", label: "Accident History Check", desc: "Surface reported collisions, damage events, and total-loss claims by Dodge VIN." },
    { href: "/pricing", label: "Pricing", desc: "Compare the free Dodge VIN lookup with the full paid Dodge VIN history report." },
  ],
  h2Faq: "Dodge VIN Lookup — Frequently Asked Questions",
  faqIntro: "The questions Dodge owners and buyers ask most when they want to lookup a Dodge VIN for the first time.",
  bottomBadge: "Free · Instant · Mopar-Coded",
  ctaBottomHeading: "Ready to Lookup a Dodge VIN?",
  ctaBottomSub: "Enter any 17-character Dodge VIN to run a free decoded build report against NMVTIS, the live NHTSA recall feed, and our Mopar code database. No account required.",
  ctaBottomNote: "No credit card · No sign-up · Free",
} as const;

const FAQS_EN = [
  { question: "How do I look up a Dodge VIN?", answer: "Find the 17-character VIN on your Dodge — easiest spots are the lower driver-side corner of the windshield (read it from outside through the glass) and the driver-side door jamb sticker. Type or paste it into the free Dodge VIN lookup form on this page. We'll validate that the string is exactly 17 characters and excludes the disallowed letters I, O, and Q, then return the decoded build, Mopar option codes where available, any open NHTSA recalls, and title-brand records from NMVTIS in seconds. No sign-up, no card." },
  { question: "What does a Dodge VIN reveal?", answer: "A Dodge VIN lookup returns the model year, body style, trim (SXT, GT, R/T, Scat Pack, SRT, Hellcat, Demon, Redeye, Jailbreak), engine family (5.7 Hemi, 6.4 392, 6.2 supercharged Hellcat/Demon, 3.6 Pentastar, or 1.3/2.0 on the Hornet), transmission (ZF 8-speed automatic, Tremec TR-6060 6-speed manual, or 9-speed), drivetrain (RWD or AWD), rear axle ratio, plant of manufacture (Brampton, Jefferson North, Pomigliano d'Arco), and the unique production sequence number — plus the full Mopar option-code list where the broadcast sheet is available." },
  { question: "Is the Dodge VIN lookup free?", answer: "Yes. Our Dodge VIN lookup is free, with no sign-up, no credit card, and no hidden charges. You enter the 17-character VIN and we return the decoded specs, the open recall list from the live NHTSA feed, and the title-brand summary from NMVTIS right away. A paid full Dodge VIN history report is available if you need every prior-owner record and every odometer reading line-by-line, but the free Dodge VIN lookup is sufficient for most pre-purchase decisions." },
  { question: "Where is the VIN on a Dodge Charger or Challenger?", answer: "On a modern Charger or Challenger (2006-2023 LX/LC platforms built at Brampton Assembly), the VIN is stamped in five places: (1) the lower driver-side corner of the windshield, visible from outside through the glass; (2) the driver-side door jamb sticker, on the B-pillar where the door latches; (3) the vehicle title document; (4) the insurance ID card; and (5) the state registration. On a Viper, Dodge also stamped the VIN on the engine block because the hand-built nature of the car required engine and chassis records to stay matched for warranty work." },
  { question: "How do I check Dodge recalls?", answer: "Run your Dodge VIN through the free lookup on this page. We pull the live NHTSA recall feed, so any open campaign — Takata airbag inflator, TIPM fuel-pump relay, brake-fluid or brake-line corrosion, or any Dodge-specific service action — that is attached to your specific VIN surfaces immediately. Open Dodge recalls remain attached to the VIN until the repair is completed at a franchise Dodge or Chrysler dealer, and the work is always free under federal safety recall rules regardless of vehicle age or ownership." },
  { question: "How do I get a Mopar build sheet for my Dodge?", answer: "On modern Dodges (2005-present LX, LD, and LC platforms), the original Mopar broadcast sheet was usually affixed to the underside of the rear seat cushion, behind the glovebox, or above the headliner. If you cannot find the original, a Mopar dealer can typically order a reprint of the build record from the Chrysler/Stellantis archive using your VIN. The reprint reproduces all sales codes — paint, engine, transmission, axle, trim, and the full option-package list. See our Mopar broadcast sheet guide at /mopar-broadcast-sheet for a section-by-section walk-through of how to read every code." },
  { question: "Is my Dodge Ram pickup a Dodge or RAM VIN?", answer: "It depends on the model year. Pre-2010 Ram pickups (2009 model year and earlier) carry Dodge VINs — typically a 1D7 or 1D8 World Manufacturer Identifier — and are decoded, recall-checked, and history-reported as Dodge vehicles through this Dodge VIN lookup. Post-2010 Ram pickups (2011 model year and newer) carry RAM brand VINs after Chrysler split RAM Trucks off into its own marque — typically a 1C6 WMI — and should be decoded through our dedicated RAM VIN lookup tool at /ram-vin-lookup. The 2010 model year is the transition: most 2010 Rams shipped as Dodge Rams with Dodge VINs, but late-2010 production began carrying the RAM-only badging. The WMI on the VIN itself is always the final word." },
];

export default function DodgeVinLookupBody() {
  const c = COPY;

  return (
    <article className="pb-16 bg-surface">
      <div className="bg-primary text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-14 sm:pt-28 sm:pb-20">
          <Breadcrumbs items={[{ label: c.home, href: "/" }, { label: c.crumb }]} onDark />
          <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
            <Flame className="w-4 h-4" /> {c.badge}
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
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">{c.decodeIntro}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {c.wmis.map((w, i) => {
              const Icon = WMI_ICONS[i];
              return (
                <div key={w.code} className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className="w-5 h-5 text-primary" />
                    <code className="font-mono font-bold text-primary text-base">{w.code}</code>
                  </div>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">{w.body}</p>
                </div>
              );
            })}
          </div>
          <div className="rounded-2xl bg-secondary-container/40 border border-outline-variant p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <Hash className="w-5 h-5 text-on-secondary-container flex-shrink-0 mt-0.5" />
              <p className="text-sm text-on-surface leading-relaxed">
                {c.decodeTailPre}
                <strong className="text-on-surface">{c.decodeTailBold1}</strong>
                {c.decodeTailMid}
                <strong className="text-on-surface">{c.decodeTailBold2}</strong>
                {c.decodeTailMid2}
                <strong className="text-on-surface">{c.decodeTailBold3}</strong>
                {c.decodeTailSuffix}
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Broadcast}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl leading-relaxed">{c.broadcastIntro}</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              <p>
                {c.broadcast1Pre}
                <strong className="text-on-surface">{c.broadcast1Bold}</strong>
                {c.broadcast1Suffix}
              </p>
              <p>
                {c.broadcast2Pre}
                <Link href="/mopar-broadcast-sheet" className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.broadcast2Link}</Link>
                {c.broadcast2Suffix}
              </p>
            </div>
            <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
              <div className="flex items-center gap-2 mb-3">
                <FileText className="w-5 h-5 text-primary" />
                <h3 className="font-headline font-extrabold text-primary">{c.broadcastCardTitle}</h3>
              </div>
              <ul className="space-y-3 text-sm text-on-surface">
                {c.broadcastRows.map((r) => (
                  <li key={r.label} className="flex items-center justify-between gap-3 rounded-lg bg-white px-3.5 py-2.5 border border-outline-variant/60">
                    <span className="text-on-surface-variant">{r.label}</span>
                    <code className="font-mono font-bold text-primary">{r.value}</code>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-on-surface-variant leading-relaxed">{c.broadcastCardNote}</p>
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
              <p>
                {c.where3Pre}
                <strong className="text-on-surface">{c.where3Bold}</strong>
                {c.where3Suffix}
              </p>
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
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">{c.h2Ram}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              <p>
                {c.ram1Pre}
                <strong className="text-on-surface">{c.ram1Bold}</strong>
                {c.ram1Suffix}
              </p>
              <p>
                {c.ram2Pre}
                <strong className="text-on-surface">{c.ram2Bold1}</strong>
                {c.ram2Mid}
                <strong className="text-on-surface">{c.ram2Bold2}</strong>
                {c.ram2Mid2}
              </p>
              <p>
                {c.ram3Pre}
                <Link href="/ram-vin-lookup" className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.ram3Link}</Link>
                {c.ram3Suffix}
              </p>
            </div>
            <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
              <div className="flex items-center gap-2 mb-3">
                <Truck className="w-5 h-5 text-primary" />
                <h3 className="font-headline font-extrabold text-primary">{c.ramCardTitle}</h3>
              </div>
              <ul className="space-y-3 text-sm text-on-surface">
                {c.ramRows.map((r) => (
                  <li key={r.label} className="flex items-center justify-between gap-3 rounded-lg bg-white px-3.5 py-2.5 border border-outline-variant/60">
                    <span className="text-on-surface-variant">{r.label}</span>
                    <code className="font-mono font-bold text-primary text-xs">{r.value}</code>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-on-surface-variant leading-relaxed">{c.ramCardNote}</p>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">{c.h2Srt}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              <p>
                {c.srt1Pre}
                <strong className="text-on-surface">{c.srt1Bold}</strong>
                {c.srt1Suffix}
              </p>
              <p>{c.srt2}</p>
              <p>{c.srt3}</p>
            </div>
            <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
              <div className="flex items-center gap-2 mb-3">
                <ClipboardCheck className="w-5 h-5 text-primary" />
                <h3 className="font-headline font-extrabold text-primary">{c.srtCardTitle}</h3>
              </div>
              <ul className="space-y-2 text-sm text-on-surface">
                {c.srtChecklist.map((tip) => (
                  <li key={tip} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" strokeWidth={3} />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 rounded-xl bg-white p-4 border border-outline-variant">
                <p className="text-xs font-bold text-on-surface mb-2">{c.srtCardCta}</p>
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

        <RelatedChecks exclude="/dodge-vin-lookup" />
      </div>
    </article>
  );
}

export { FAQS_EN };
