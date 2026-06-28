/**
 * Body for /ram-vin-lookup — English-only brand-specific landing page
 * targeting the "ram vin lookup" keyword (~1.9K US monthly searches).
 * Mirrors VinNumberLookupBody structure but flattens COPY for RAM Trucks.
 */

import Link from "@/components/LocaleLink";
import {
  Check, Shield, Search, FileText, Database, Truck,
  ChevronRight, Lock, Zap, BadgeCheck, Sparkles, Hash, Wrench,
  Gauge, ClipboardCheck, AlertTriangle, MapPin, Cpu, Fuel,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";

const HOW_ICONS = [Search, Database, FileText] as const;
const SIGN_ICONS = [Hash, Truck, Cpu, AlertTriangle, Wrench, Gauge] as const;
const DANGER_ICONS = [Fuel, Shield, Gauge] as const;

const COPY = {
  home: "Home",
  crumb: "RAM VIN Lookup",
  badge: "Free RAM VIN Lookup   ·   Decoded Specs + Mopar Build Sheet",
  h1Lead: "RAM VIN Lookup — ",
  h1Accent: "Decoded Specs, Mopar Build Sheet, and Recall Truth.",
  intro: "RAM Trucks left the Dodge family in 2010 and have been their own brand ever since — which means the way a RAM VIN reads, decodes, and reports has its own rules. A RAM VIN lookup turns the 17-character stamp on your 1500, 2500, or 3500 into a complete picture: engine family, cab and bed configuration, axle ratio, trailer-tow package, and the title and recall history that follows the truck around. Enter your VIN below and we'll decode the build, surface open Mopar recalls, and check NMVTIS for any title brands — free, no sign-up.",
  formHeading: "Free RAM VIN Lookup — Search Any RAM 1500, 2500, or 3500",
  formSub: "Enter your 17-character RAM VIN. We'll return decoded specs, axle and tow data, open recalls, and any title brand records — instantly.",
  formNote: "Free · No sign-up · Instant result",
  trustStats: [
    { icon: Truck, value: "1500-3500", label: "all RAM bodies" },
    { icon: Fuel, value: "Hemi · EcoDiesel", label: "Cummins · Pentastar" },
    { icon: Shield, value: "Mopar recalls", label: "live NHTSA feed" },
    { icon: BadgeCheck, value: "Free", label: "no sign-up" },
  ],
  h2How: "How a RAM VIN Lookup Works",
  howIntro: "A RAM VIN lookup is straightforward. Behind the form, the tool reaches into the same VIN-keyed databases Stellantis dealers and Mopar parts counters use, then returns the result in plain English. Three steps from VIN to verdict.",
  howSteps: [
    { tag: "Step 1", title: "Enter your RAM VIN", body: "Type or paste the 17-character VIN from the dashboard, the driver-side door jamb sticker, the frame stamp on heavy-duty 2500/3500 trucks, or the title. Our tool validates that it is exactly 17 characters and starts with a valid RAM WMI before it runs." },
    { tag: "Step 2", title: "We query the RAM record", body: "Your VIN hits Stellantis decoder patterns to identify engine (Hemi V8, EcoDiesel, Cummins Turbo Diesel, or Pentastar V6), cab configuration, bed length, axle ratio, and trailer-tow package. In parallel we query NMVTIS for title brands and the NHTSA recall feed for any open Mopar recalls." },
    { tag: "Step 3", title: "Read the RAM report", body: "You'll see the decoded year, trim, engine, drivetrain, and factory options alongside any salvage or flood brands, the recall list, and a link to pull a full Mopar broadcast sheet if you need the original build-line equipment." },
  ],
  h2Title: "What a RAM VIN Reveals",
  titleIntro: "RAM VINs encode a level of build detail most other brands do not — because the truck market lives or dies on configuration. Here is what the decoder pulls off your 1500, 2500, or 3500 VIN.",
  title1Pre: "First, the ",
  title1Bold1: "engine family",
  title1Mid: ". The eighth digit of the VIN tells you whether the truck rolled off the line with a 5.7L Hemi V8, a 6.4L Hemi (HD only), a 6.7L Cummins Turbo Diesel (the heavy-duty workhorse), a 3.0L EcoDiesel V6 (1500 only, 2014-2023), a 3.6L Pentastar V6, or the eTorque mild-hybrid variant. Engine family drives the ",
  title1Bold2: "tow rating, fuel economy, and recall exposure",
  title1Mid2: " — and a VIN lookup is the only way to be certain which one is under the hood without lifting it. The decoder also returns the ",
  title1Bold3: "transmission",
  title1Suffix: " (8-speed TorqueFlite, six-speed Aisin on HD diesels, etc.) and the drivetrain — 4x2 or 4x4.",
  title2Pre: "Second, the ",
  title2Bold: "cab and bed configuration",
  title2Suffix: " — Regular Cab, Quad Cab, Crew Cab, or Mega Cab paired with the 5'7\", 6'4\", or 8' bed. This is where buyers get burned: a Crew Cab short-bed and a Quad Cab long-bed have very different resale and utility profiles, and the listing photo doesn't always tell the truth. The VIN does.",
  title3: "Third, the axle ratio and trailer-tow package. RAM offers 3.21, 3.55, 3.92, and 4.10 axle ratios on light-duty trucks alone, and the difference between them is thousands of pounds of tow capacity. The Max Tow Package, the 5th-wheel prep group, and the air suspension option all leave fingerprints on the VIN — the decoder surfaces them so you know what you're actually buying.",
  pathCardTitle: "What you get from one RAM VIN",
  pathRows: [
    { label: "Engine + drive", value: "Hemi · Cummins · 4x4" },
    { label: "Cab + bed", value: "Crew · 6'4\" · etc." },
    { label: "Tow package", value: "Axle · Max Tow" },
  ],
  pathCardNote: "One 17-character RAM VIN, three layers of build detail. The lookup runs in seconds and never asks for an account.",
  h2Decode: "Decoding a RAM VIN — WMI Patterns and the Dodge Split",
  decodeIntro: "Every VIN starts with a three-character World Manufacturer Identifier. RAM has a distinct WMI history that reflects its 2009-2010 spin-off from Dodge — and recognizing the pattern is the fastest way to confirm you're looking at a legitimate RAM VIN.",
  decodeRows: [
    { code: "1C6", label: "RAM Truck (US-built, post-2010 spin-off)" },
    { code: "3C6", label: "RAM Truck (Mexico-built — Saltillo Assembly)" },
    { code: "1D7 / 1D3", label: "Dodge Ram (pre-2009 — before the brand split)" },
    { code: "2C6", label: "RAM Truck (Canada-built — historically rare)" },
  ],
  decode1Pre: "If you see a 2009 or earlier truck with a ",
  decode1Code: "1D7",
  decode1Mid: " or ",
  decode1Code2: "1D3",
  decode1Suffix: " WMI, that's a Dodge Ram — the original badge before Stellantis (then Chrysler) carved out RAM as a standalone truck brand. From the 2011 model year onward you should see 1C6 (US plants like Warren Truck Assembly) or 3C6 (Saltillo, Mexico, where most heavy-duty and Mega Cab trucks were built).",
  decode2: "Digits 4-8 carry the body type, cab style, GVWR class, and engine family. Digit 9 is the check digit. Digit 10 is the model year code. Digits 11-17 identify the assembly plant and the sequential serial number. A RAM VIN that doesn't fit one of these WMIs is either not a RAM or — far worse — a VIN that has been altered. That kind of mismatch is exactly what a free VIN lookup is designed to catch.",
  h2Mopar: "How the Mopar Broadcast Sheet Ties Into Your RAM VIN",
  mopar1Pre: "Every RAM rolling down the Warren or Saltillo line is built from a ",
  mopar1Bold: "Mopar broadcast sheet",
  mopar1Suffix: " — the line-side instruction list that tells the assembly plant exactly which engine, transmission, axle, seat, radio, and trim package to install on that specific VIN. Restoration shops and serious buyers track these down because they prove original equipment in a way a window sticker reprint cannot.",
  mopar2Pre: "Our RAM VIN lookup decodes the build code data the broadcast sheet was generated from. For the full original sheet, see our ",
  mopar2Link: "Mopar broadcast sheet guide",
  mopar2Suffix: " — it walks through where the sheet lives in Chrysler's archives, what each three-letter sales code means, and how to request a copy through Stellantis Historical Services or a Mopar specialist.",
  mopar3: "For modern RAMs (roughly 2011 and newer) the broadcast sheet equivalent is available digitally through Mopar's owner portal once you've verified ownership with the VIN. For pre-2010 Dodge Ram trucks the paper broadcast sheet is sometimes still tucked above the headliner, under the seat foam, or behind the glovebox — original copies are gold for collectors.",
  h2Where: "Where to Find Your RAM VIN",
  where1Pre: "Most RAM owners get stuck before they even start because they don't know where to find the VIN. Good news — Stellantis stamps the VIN in ",
  where1Bold: "at least five places",
  where1Suffix: " on every truck, and heavy-duty 2500/3500 models add a sixth.",
  where2: "The fastest spot is the lower driver-side corner of the windshield — read it through the glass from outside. The driver-side door jamb sticker is the second-easiest and is required by federal law. The title document and the insurance card print the VIN as well, and the registration card usually does too.",
  where3: "On 2500 and 3500 heavy-duty RAMs there's an additional frame stamp — typically on the driver-side frame rail just behind the cab or above the rear axle. This stamp is harder to fake and is the one experienced inspectors check on commercial-grade trucks. If the frame stamp doesn't match the dashboard VIN on a heavy-duty RAM, walk away.",
  whereCardTitle: "Six places the RAM VIN lives",
  whereList: [
    "Lower driver-side windshield (visible from outside)",
    "Driver-side door jamb sticker (federal requirement)",
    "Vehicle title document",
    "Insurance ID card",
    "State registration document",
    "Frame stamp on HD 2500/3500 (behind cab or above rear axle)",
  ],
  whereCardNote: "Found it? Drop it into the form above and run a free RAM VIN lookup against the Mopar decoder and NMVTIS in seconds.",
  midCtaHeading: "Lookup This Specific RAM VIN Right Now",
  midCtaSub: "You already have a 1500, 2500, or 3500 in mind. Run the VIN against the Mopar decoder, NMVTIS, and the recall feed — free, in seconds. No sign-up.",
  h2Recalls: "Common RAM Recalls Worth Checking Before You Buy",
  recallsIntro: "RAM Trucks have had a handful of well-publicized recall campaigns. Knowing which ones apply to a specific VIN is what separates an informed buyer from one who inherits an open campaign.",
  recalls: [
    { title: "Cummins EcoDiesel emissions", body: "The 3.0L EcoDiesel V6 fitted to the 1500 from 2014 through 2023 was the subject of a major emissions-defeat consent decree with the EPA and CARB. Affected trucks needed software updates and component replacements. Run the VIN to confirm whether the campaign was completed on a specific truck before you put money down." },
    { title: "Fuel-pump relay (HD diesel)", body: "Multiple RAM 2500/3500 and 4500/5500 cab-chassis recalls have targeted fuel-pump relays and powertrain control modules that could cause sudden stalling. The remedy is typically a free dealer reflash plus the relay replacement — a VIN check confirms whether it was performed." },
    { title: "Transfer case / driveshaft", body: "Selected 4x4 RAM 1500 model years have been recalled for transfer-case or front-driveshaft issues that could cause loss of drive or unintended movement in park. These are open until a dealer performs the fix, so the recall stays attached to the VIN no matter how many owners it has had." },
  ],
  recallsNoteBoldLead: "Always check open recalls before buying.",
  recallsNoteMid1: " RAM recalls follow the truck across owners — they're free to repair at any Stellantis-authorized dealer. Run a ",
  recallsNoteLink: "recall check",
  recallsNoteSuffix: " on the VIN you're considering to see exactly which campaigns are open.",
  h2Split: "Pre-2010 Dodge Ram vs Post-2010 RAM Trucks",
  split1Pre: "In 2009 Chrysler split RAM Trucks out as a standalone brand to let Dodge focus on cars and crossovers. The 2010 model year is the messy transition — some trucks were badged Dodge, some were badged RAM, and the WMI changed from ",
  split1Code: "1D7/1D3",
  split1Mid: " to ",
  split1Code2: "1C6/3C6",
  split1Suffix: " mid-year.",
  split2: "Practically, this matters for two reasons. First, parts catalogs and recall lookups for pre-2009 trucks live under \"Dodge Ram\" while 2011+ trucks live under \"RAM\" — searching the wrong brand returns nothing. Second, the title may say \"Dodge\" while the truck wears RAM badges, or vice versa, on transition-year vehicles. A VIN lookup cuts through the badge confusion because the WMI tells the real story.",
  split3: "If you're shopping a 2009-2011 Ram, run the VIN before you read the badges. The decoder will tell you whether you're looking at a true post-split RAM build or a late Dodge Ram with carried-over hardware.",
  h2HeavyDuty: "Heavy-Duty vs Light-Duty RAM VIN Considerations",
  hd1Pre: "The RAM 1500 and the RAM 2500/3500 share a nameplate but very little else mechanically. A VIN lookup treats them ",
  hd1Bold: "as different vehicles",
  hd1Suffix: " for good reason — and a few HD-specific checks belong on every commercial-grade RAM purchase.",
  hd2: "Heavy-duty 2500 and 3500 RAMs carry GVWR classifications that put them into Class 2b or Class 3 — meaning different emissions rules, different recall campaigns, and (often) different state title categories. The Cummins 6.7L Turbo Diesel option fundamentally changes the recall surface compared to the 6.4L Hemi gasser. The frame stamp matters more on HD trucks because they're more likely to have been used for fleet, plow, or commercial duty where frame damage and re-tagging are real risks.",
  hd3: "Light-duty RAM 1500s are more likely to surface engine-family confusion in a VIN lookup — Hemi V8 vs EcoDiesel V6 vs Pentastar V6 vs eTorque mild-hybrid — and to carry the older EcoDiesel emissions recall. They're also far more likely to carry consumer-vehicle title brands like flood or salvage, where HD trucks tend to carry commercial-fleet history instead.",
  hdCardTitle: "HD-specific VIN checks",
  hdChecklist: [
    "Confirm the frame stamp matches the dashboard and door VIN",
    "Verify the engine option (6.7L Cummins vs 6.4L Hemi) against the listing",
    "Check for HD-specific recall campaigns (fuel-pump relay, brake booster)",
    "Look for fleet or commercial title history that may not appear on a 1500",
    "Confirm GVWR class against intended use (towing, plowing, hauling)",
  ],
  hdCardCta: "Run the RAM VIN check first — paste it here:",
  h2Internal: "Related VIN Checks That Build On Your RAM Lookup",
  internalIntro: "A RAM VIN lookup is the entry point. These focused checks dig into specific records when something looks off — or when you want to be thorough on a truck purchase.",
  internalLinks: [
    { href: "/vin-check/ram", label: "Full RAM VIN Check", desc: "Complete RAM history report: title brands, accidents, odometer, recalls, and decoded options in one place." },
    { href: "/mopar-broadcast-sheet", label: "Mopar Broadcast Sheet Guide", desc: "How to pull the original line-side build sheet for any RAM or Mopar vehicle by VIN." },
    { href: "/vin-decoder", label: "VIN Decoder", desc: "Break down any 17-character VIN into year, make, model, trim, and factory equipment." },
    { href: "/recall-check", label: "Recall Check", desc: "Look up open Mopar/NHTSA safety recalls attached to a RAM VIN." },
    { href: "/salvage-title-check", label: "Salvage Title Check", desc: "See if the RAM VIN carries a salvage, junk, or non-repairable title brand." },
    { href: "/accident-history-check", label: "Accident History Check", desc: "Surface reported collisions, damage events, and total-loss claims on the RAM VIN." },
    { href: "/flood-check", label: "Flood Damage Check", desc: "Confirm whether a RAM 1500, 2500, or 3500 was branded flood or water-damaged in any state." },
    { href: "/pricing", label: "Full Report Pricing", desc: "When the free lookup raises a flag, upgrade to a complete VIN history report." },
  ],
  h2Faq: "RAM VIN Lookup — Frequently Asked Questions",
  faqIntro: "The questions RAM owners and buyers ask most when they want to lookup a RAM VIN for the first time.",
  bottomBadge: "Free · Instant · Mopar Decoder",
  ctaBottomHeading: "Ready to Lookup a RAM VIN?",
  ctaBottomSub: "Enter any 17-character RAM VIN to run a free Mopar decoder query, NMVTIS title check, and live NHTSA recall lookup. No account required.",
  ctaBottomNote: "No credit card · No sign-up · Free",
} as const;

const FAQS_EN = [
  { question: "How do I look up a RAM VIN?", answer: "Find the 17-character VIN on your RAM — the easiest spots are the lower driver-side corner of the windshield, the door jamb sticker, the title, or the insurance card. On heavy-duty 2500 or 3500 trucks there's also a frame stamp behind the cab. Type or paste the VIN into the free lookup form on this page and we'll decode the build (engine, cab, bed, axle, tow package), check NMVTIS for title brands, and pull the live NHTSA recall feed — all in seconds, no sign-up." },
  { question: "What does a RAM VIN reveal?", answer: "A RAM VIN encodes the model year, plant of manufacture, engine family (5.7L Hemi V8, 6.4L Hemi, 6.7L Cummins Turbo Diesel, 3.0L EcoDiesel V6, 3.6L Pentastar V6, or eTorque), transmission, drivetrain (4x2 or 4x4), cab style (Regular, Quad, Crew, or Mega), bed length, GVWR class, axle ratio, and trailer-tow package. The lookup adds title-brand history (flood, salvage, rebuilt, lemon), open Mopar recall campaigns, and any reported salvage-auction records that follow the truck." },
  { question: "Is the RAM VIN lookup free?", answer: "Yes. Our basic RAM VIN lookup is free, with no sign-up, no credit card, and no hidden charges. You enter the 17-character VIN and we return decoded specs from the Mopar decoder patterns, the title-brand summary from NMVTIS, and any open recalls from the live NHTSA feed. A paid full history report is available if you need every reported event with dates, but the free lookup is sufficient for most pre-purchase decisions on a RAM 1500, 2500, or 3500." },
  { question: "Where is the VIN on a RAM 1500, 2500, or 3500?", answer: "Every RAM stamps the VIN in at least five places: the lower driver-side corner of the windshield (visible from outside), the driver-side door jamb sticker (federal requirement), the title document, the insurance card, and the state registration. Heavy-duty 2500 and 3500 trucks add a frame stamp — typically on the driver-side frame rail just behind the cab or above the rear axle. If the frame stamp doesn't match the dashboard VIN on an HD truck, that's a serious red flag and you should walk away from the purchase." },
  { question: "How do I check RAM recalls?", answer: "Run the VIN through our free lookup and the report includes any open recall campaigns published by Stellantis (RAM's parent) and NHTSA. Common RAM recalls include the 3.0L EcoDiesel emissions consent decree (2014-2023 1500s), fuel-pump relay campaigns on HD diesel trucks, and various transfer-case or driveshaft issues on 4x4 1500s. Open recalls stay attached to the VIN until a Stellantis-authorized dealer performs the free fix, so a recall opened years ago may still be unresolved on the truck you're considering." },
  { question: "How do I get a Mopar build sheet for my RAM?", answer: "The Mopar broadcast sheet is the original line-side instruction document that told the Warren or Saltillo assembly plant exactly how to build a specific VIN — engine, transmission, axle, seat, radio, and every trim option. For modern RAMs (roughly 2011 and newer) the digital equivalent is available through Mopar's owner portal once you verify ownership. For pre-2010 Dodge Ram trucks the original paper sheet was sometimes tucked above the headliner, under seat foam, or behind the glovebox — original copies are valuable to collectors. See our Mopar broadcast sheet guide for step-by-step instructions on requesting a copy through Stellantis Historical Services." },
  { question: "Does the lookup cover Cummins diesel engines?", answer: "Yes. The decoder identifies the 6.7L Cummins Turbo Diesel option on RAM 2500/3500 and the older 3.0L EcoDiesel V6 on RAM 1500 (2014-2023) directly from the eighth digit of the VIN. The recall portion of the lookup is especially important for Cummins-equipped HD trucks because they carry HD-specific campaigns (fuel-pump relays, exhaust aftertreatment, brake boosters) that don't apply to Hemi gas trucks. For EcoDiesel 1500s the lookup will surface whether the EPA/CARB emissions consent-decree work has been completed on that specific VIN." },
];

export default function RamVinLookupBody() {
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
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Title}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl leading-relaxed">{c.titleIntro}</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              <p>
                {c.title1Pre}
                <strong className="text-on-surface">{c.title1Bold1}</strong>
                {c.title1Mid}
                <strong className="text-on-surface">{c.title1Bold2}</strong>
                {c.title1Mid2}
                <strong className="text-on-surface">{c.title1Bold3}</strong>
                {c.title1Suffix}
              </p>
              <p>
                {c.title2Pre}
                <strong className="text-on-surface">{c.title2Bold}</strong>
                {c.title2Suffix}
              </p>
              <p>{c.title3}</p>
            </div>
            <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
              <div className="flex items-center gap-2 mb-3">
                <Truck className="w-5 h-5 text-primary" />
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
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Decode}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl leading-relaxed">{c.decodeIntro}</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
              <div className="flex items-center gap-2 mb-3">
                <Hash className="w-5 h-5 text-primary" />
                <h3 className="font-headline font-extrabold text-primary">RAM WMI patterns</h3>
              </div>
              <ul className="space-y-3 text-sm text-on-surface">
                {c.decodeRows.map((r) => (
                  <li key={r.code} className="flex items-center justify-between gap-3 rounded-lg bg-white px-3.5 py-2.5 border border-outline-variant/60">
                    <code className="font-mono font-bold text-primary">{r.code}</code>
                    <span className="text-on-surface-variant text-right text-xs sm:text-sm">{r.label}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              <p>
                {c.decode1Pre}
                <code className="font-mono font-bold text-on-surface bg-primary/5 px-1.5 py-0.5 rounded">{c.decode1Code}</code>
                {c.decode1Mid}
                <code className="font-mono font-bold text-on-surface bg-primary/5 px-1.5 py-0.5 rounded">{c.decode1Code2}</code>
                {c.decode1Suffix}
              </p>
              <p>{c.decode2}</p>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">{c.h2Mopar}</h2>
          <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4 max-w-3xl">
            <p>
              {c.mopar1Pre}
              <strong className="text-on-surface">{c.mopar1Bold}</strong>
              {c.mopar1Suffix}
            </p>
            <p>
              {c.mopar2Pre}
              <Link href="/mopar-broadcast-sheet" className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.mopar2Link}</Link>
              {c.mopar2Suffix}
            </p>
            <p>{c.mopar3}</p>
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
              const Icon = DANGER_ICONS[i];
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
              <AlertTriangle className="w-5 h-5 text-on-secondary-container flex-shrink-0 mt-0.5" />
              <p className="text-sm text-on-surface leading-relaxed">
                <strong className="text-on-surface">{c.recallsNoteBoldLead}</strong>
                {c.recallsNoteMid1}
                <Link href="/recall-check" className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.recallsNoteLink}</Link>
                {c.recallsNoteSuffix}
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">{c.h2Split}</h2>
          <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4 max-w-3xl">
            <p>
              {c.split1Pre}
              <code className="font-mono font-bold text-on-surface bg-primary/5 px-1.5 py-0.5 rounded">{c.split1Code}</code>
              {c.split1Mid}
              <code className="font-mono font-bold text-on-surface bg-primary/5 px-1.5 py-0.5 rounded">{c.split1Code2}</code>
              {c.split1Suffix}
            </p>
            <p>{c.split2}</p>
            <p>{c.split3}</p>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">{c.h2HeavyDuty}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              <p>
                {c.hd1Pre}
                <strong className="text-on-surface">{c.hd1Bold}</strong>
                {c.hd1Suffix}
              </p>
              <p>{c.hd2}</p>
              <p>{c.hd3}</p>
            </div>
            <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
              <div className="flex items-center gap-2 mb-3">
                <ClipboardCheck className="w-5 h-5 text-primary" />
                <h3 className="font-headline font-extrabold text-primary">{c.hdCardTitle}</h3>
              </div>
              <ul className="space-y-2 text-sm text-on-surface">
                {c.hdChecklist.map((tip) => (
                  <li key={tip} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" strokeWidth={3} />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 rounded-xl bg-white p-4 border border-outline-variant">
                <p className="text-xs font-bold text-on-surface mb-2">{c.hdCardCta}</p>
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

        <RelatedChecks exclude="/ram-vin-lookup" />
      </div>
    </article>
  );
}

export { FAQS_EN };
