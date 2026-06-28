/**
 * Body for /jeep-vin-lookup — English-only landing page targeting the
 * "jeep vin lookup" keyword cluster (~4.3K US monthly searches).
 * Brand-specific deep dive: Jeep VIN decode + history + Mopar build sheet.
 * Mirrors VinNumberLookupBody structure but flattens COPY for Jeep.
 */

import Link from "@/components/LocaleLink";
import {
  Check, Shield, Search, FileText, Database, Car,
  ChevronRight, Lock, Zap, Sparkles, Hash, Wrench,
  Gauge, AlertTriangle, MapPin, Cpu, Mountain, Factory, BadgeCheck,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";

const REVEAL_ICONS = [Car, Wrench, Cpu, Gauge, Factory, FileText] as const;
const DECODE_ICONS = [Hash, Factory, MapPin] as const;
const VIN_LOC_ICONS = [Search, Car, FileText, Mountain] as const;
const RECALL_ICONS = [AlertTriangle, Wrench, Shield] as const;
const REDFLAG_ICONS = [Mountain, Wrench, AlertTriangle] as const;

const COPY = {
  home: "Home",
  crumb: "Jeep VIN Lookup",
  badge: "Free Jeep VIN Lookup   ·   Decoded Build + Recalls   ·   NMVTIS-Sourced",
  h1Lead: "Jeep VIN Lookup — ",
  h1Accent: "Decoded Build, Recalls, and Mopar Build Sheet from the VIN.",
  intro: "Every Jeep — Wrangler, Cherokee, Grand Cherokee, Gladiator, Compass, Renegade, or vintage CJ — leaves the Toledo, Belvidere, or Detroit plant with a 17-character VIN stamped into its identity. A Jeep VIN lookup turns that string into a complete picture: the exact trim, the factory engine and transmission, the Mopar build-sheet options, every open recall, and any salvage or off-road damage events on record. Enter your Jeep VIN below and we'll run a free lookup against NMVTIS sources, NHTSA recall feeds, and our Mopar broadcast-sheet decoder in seconds. No sign-up.",
  formHeading: "Free Jeep VIN Lookup — Decode Any 17-Character Jeep VIN",
  formSub: "Enter the Jeep VIN and we'll surface decoded factory build, Mopar options, open recalls, salvage history, and title brands — instantly.",
  formNote: "Free · No sign-up · Instant Jeep result",
  trustStats: [
    { icon: Database, value: "50-state", label: "NMVTIS sources" },
    { icon: Factory, value: "Mopar", label: "build sheet hookup" },
    { icon: Shield, value: "Recalls", label: "& title brands" },
    { icon: BadgeCheck, value: "Free", label: "no sign-up" },
  ],
  h2Reveal: "What a Jeep VIN Lookup Reveals",
  revealIntro: "A Jeep VIN carries more than a serial number — it encodes the exact factory build of your Wrangler, Cherokee, Grand Cherokee, or Gladiator. When we decode it against the Mopar broadcast sheet, the result tells you what the vehicle was built to be, down to the axle ratio and the optional Trail Rated package.",
  reveals: [
    { title: "Model, trim, and submodel", body: "A Jeep VIN lookup returns the exact model (Wrangler JL, JK, TJ, YJ, CJ; Cherokee KL, KJ; Grand Cherokee WK2, WL) and trim — Sport, Sahara, Rubicon, Trailhawk, Overland, Summit, Mojave — so you know precisely what the badging claims is actually under the body." },
    { title: "Engine and powertrain", body: "Decode whether the Jeep left the factory with the 3.6L Pentastar V6, the 2.0L Hurricane turbo, the 5.7L HEMI V8, the 6.4L 392 HEMI, the EcoDiesel, or the 4xe plug-in hybrid powertrain. Engine swaps are common on older Wranglers — the VIN tells you what came from Toledo." },
    { title: "Transmission and transfer case", body: "The VIN reveals whether the Jeep was built with the NSG370 6-speed manual, the 850RE 8-speed automatic, or a 545RFE — and crucially, which transfer case (Command-Trac, Selec-Trac, Rock-Trac, Quadra-Drive II) shipped from the factory for serious off-road buyers." },
    { title: "Axle ratio and lockers", body: "Mopar build-sheet data tied to the VIN shows the original axle ratio (3.21, 3.45, 3.73, 4.10, 4.56) and whether the Jeep came with factory front and rear electronic lockers — a major value driver on Rubicon-trim Wranglers and Gladiators." },
    { title: "Factory options and packages", body: "The build sheet attached to the Jeep VIN lists every dealer-installed package — Trail Rated, Sky One-Touch power top, Cold Weather, LED lighting, Advanced Safety, premium audio — verifying the seller's option list isn't an after-market add-on." },
    { title: "Plant of manufacture and date", body: "Decode the assembly plant (Toledo South for Wrangler and Gladiator, Belvidere for Cherokee, Detroit Jefferson North for Grand Cherokee) and the production sequence to verify the build date matches the title's model year." },
  ],
  h2Decode: "How to Decode a Jeep VIN by Hand",
  decodeIntro: "A Jeep VIN is 17 characters that split into structured fields. You can decode the basics on the back of a napkin once you know the patterns — and our lookup tool does the rest, including the Mopar build-sheet cross-reference.",
  decode1Pre: "The first three characters are the ",
  decode1Bold1: "World Manufacturer Identifier (WMI)",
  decode1Mid: ". For Jeeps assembled in the United States, you'll see ",
  decode1Bold2: "1J4 or 1J8",
  decode1Mid2: " on most Wrangler, Cherokee, Grand Cherokee, and Liberty builds — the J in position two is Jeep's manufacturer code. Some later Wrangler and Cherokee models, and the Gladiator, were issued ",
  decode1Bold3: "1C4",
  decode1Suffix: " (Chrysler's WMI) when the corporate parent consolidated assembly identifiers under FCA and then Stellantis. WMIs starting with 3 indicate Mexican assembly (Compass and Renegade have used Toluca), and JN or KN indicate other markets.",
  decode2Pre: "Positions 4 through 8 are the ",
  decode2Bold: "Vehicle Descriptor Section",
  decode2Suffix: " — they encode the model line, body style, trim level, engine, restraint system, and gross vehicle weight rating. Position 8 in particular tells the decoder which engine the Jeep left Toledo with, which is how the Mopar broadcast sheet cross-references the exact powertrain build.",
  decode3Pre: "Position 9 is the ",
  decode3Bold1: "check digit",
  decode3Mid: ", a math-derived character that lets the decoder validate the VIN is real. Position 10 is the ",
  decode3Bold2: "model year",
  decode3Mid2: " (codes cycle every 30 years — for example, M=2021, N=2022, P=2023, R=2024, S=2025, T=2026). Position 11 is the ",
  decode3Bold3: "assembly plant",
  decode3Suffix: ": J for Toledo South (Wrangler and Gladiator), H for Belvidere (Cherokee), G for Detroit Jefferson North (Grand Cherokee), and X or T for other Stellantis facilities depending on year.",
  decode4: "The final six characters (positions 12–17) are the production sequence — a unique build number that, when fed into the Mopar broadcast-sheet system, returns the original factory invoice with every option box ticked.",
  decodeCardTitle: "Jeep VIN at a glance",
  decodeRows: [
    { label: "1J4 / 1J8 / 1C4", value: "USA Jeep WMI" },
    { label: "Plant J / H / G", value: "Toledo · Belvidere · Detroit" },
    { label: "Position 10", value: "Model year code" },
  ],
  decodeCardNote: "Three positions, three answers — but the full Jeep VIN lookup goes further, pulling the Mopar build sheet and the recall feed in one pass.",
  h2Mopar: "How the Mopar Build Sheet Ties Into Your Jeep VIN",
  moparIntro: "The single most powerful thing a Jeep VIN unlocks is the original Mopar broadcast sheet — the factory invoice that traveled down the assembly line with your Wrangler or Cherokee. Decoded against the VIN, it confirms every option, package, and powertrain choice Toledo or Belvidere actually built into the vehicle.",
  mopar1Pre: "When a Jeep was assembled, a paper broadcast sheet was generated for the line workers — listing the exact engine, transmission, transfer case, axle ratios, paint code, interior trim, soft-top or hard-top, factory-installed lockers, tow package, infotainment configuration, and any dealer-installed Mopar accessories. That sheet is tied to the VIN in the FCA / Stellantis production database, and a Jeep VIN lookup can ",
  mopar1Bold: "retrieve the build-sheet snapshot",
  mopar1Suffix: " years or decades later.",
  mopar2: "Why it matters: a 2018 Wrangler Rubicon with factory front and rear lockers is worth thousands more than a same-year Sport that's been re-badged with aftermarket Rubicon trim. The broadcast sheet is the only objective way to verify the Jeep came from the factory with the equipment the seller is advertising — and it's keyed to the VIN, not the badge.",
  mopar3Pre: "Our Jeep VIN lookup includes a direct link into the ",
  mopar3Link: "Mopar broadcast sheet decoder",
  mopar3Suffix: " so you can pull the factory build summary alongside the title and recall data in one place. For 4xe plug-in hybrids and Rubicon 392 builds, the broadcast sheet is essential for confirming powertrain provenance.",
  moparCardTitle: "What the Mopar sheet confirms",
  moparChecklist: [
    "Original engine, transmission, transfer case",
    "Factory axle ratio and locker configuration",
    "Soft-top, hard-top, or Sky One-Touch top",
    "Trail Rated and off-road packages",
    "Paint code and interior trim level",
    "Tow package and electronic accessories",
  ],
  moparCardCta: "Run the Jeep VIN here, then jump to the broadcast sheet decoder:",
  h2Where: "Where to Find the VIN on Your Jeep",
  whereIntro: "Before you can run a Jeep VIN lookup, you need the 17-character VIN. Jeep prints it in several locations — and on older Wranglers, the frame stamp is the canonical source if the dashboard or door jamb sticker has been damaged or replaced.",
  wheres: [
    { title: "Lower driver-side windshield", body: "Look through the glass from outside the Jeep, near the bottom corner on the driver's side. This is the easiest spot to read on Wranglers, Cherokees, Grand Cherokees, and Gladiators built since 1981." },
    { title: "Driver-side door jamb sticker", body: "Open the driver's door and look at the B-pillar or door frame. Federal Motor Vehicle Safety Standard 115 requires a sticker with the VIN, GVWR, and build date — present on every modern Jeep." },
    { title: "Title and registration documents", body: "The Jeep VIN is printed on the title certificate and the state registration card. Always cross-check the VIN on the dashboard against the title — a mismatch is a major red flag." },
    { title: "Frame stamp (older Wranglers and CJs)", body: "On TJ, YJ, and CJ-series Wranglers, the VIN is also stamped directly into the frame rail, usually on the driver's side near the firewall. This is the canonical VIN on older off-road Jeeps where dashboard plates can be swapped." },
  ],
  midCtaHeading: "Lookup This Specific Jeep VIN Right Now",
  midCtaSub: "You already have a Wrangler, Cherokee, Grand Cherokee, or Gladiator in mind. Run the VIN against NMVTIS, the NHTSA recall feed, and the Mopar broadcast sheet decoder — free, in seconds.",
  h2Recalls: "Common Jeep Recalls Surfaced by VIN Lookup",
  recallsIntro: "Jeep has issued a number of high-profile recalls over the past decade, and many used Jeeps on the market still carry unresolved safety campaigns. A VIN lookup checks the live NHTSA recall feed against your specific Jeep — here are the recurring issues to watch for.",
  recalls: [
    { title: "Fuel-tank rollover and integrity", body: "The 1993–2004 Grand Cherokee and 2002–2007 Liberty were subject to the high-profile fuel-tank recall (NHTSA campaign 13V-252) after rear-impact fires. A VIN lookup tells you whether the trailer-hitch remedy was completed at a dealer." },
    { title: "Transmission shifter confusion", body: "2014–2015 Grand Cherokees with the monostable shifter were recalled for shifter design that caused rollaway incidents (the same defect linked to the Anton Yelchin case). The VIN lookup surfaces whether the software update remedy was performed." },
    { title: "Brake booster and ABS failures", body: "Multiple recent campaigns have covered Jeep brake-booster vacuum-pump failures (Cherokee, Wrangler 4xe) and ABS module issues. Open recalls stay attached to the VIN until completed — a lookup catches what the previous owner ignored." },
  ],
  recallsNoteBoldLead: "Buying a used Jeep?",
  recallsNoteMid1: " Always run a ",
  recallsNoteLink1: "VIN recall check",
  recallsNoteMid2: " before purchase — Jeep dealers will perform open-recall work for free regardless of who owns the vehicle, but only if you know to ask. Pair the recall check with a ",
  recallsNoteLink2: "salvage title check",
  recallsNoteSuffix: " for any Jeep priced below market — off-road damage and flood loss are the two most common silent brands.",
  h2RedFlags: "Off-Road and History Red Flags a Jeep VIN Lookup Catches",
  redFlagsIntro: "Jeeps live hard lives. Trail rigs get rolled, fording attempts get drowned, and lifted Wranglers from auction get retitled and resold to unsuspecting buyers. A thorough VIN lookup is the single best defense — here's what to watch for.",
  redFlags: [
    { title: "Frame damage and twist from rollovers", body: "Wranglers are tall, narrow, and prone to rollovers off-road. A VIN lookup that returns a salvage or rebuilt title brand — especially on an older TJ or JK — is a strong signal the frame was bent and straightened. Always inspect for asymmetric panel gaps and uneven tire wear." },
    { title: "Aftermarket lifts hiding flood loss", body: "Lifted Wranglers from Texas, Louisiana, and Florida flood-zone auctions are commonly retitled in low-disclosure states (Alabama, Tennessee, Vermont) and resold. The VIN lookup against NMVTIS still surfaces the original flood brand even after a title wash — that's the entire point of the federal aggregator." },
    { title: "Salvage-auction Jeeps from Copart and IAA", body: "Copart and IAA list thousands of Jeeps per month — Wranglers, Cherokees, Grand Cherokees — many from insurance total losses, off-road accidents, and stolen-recovered cases. The VIN lookup surfaces public auction listings and lets you see the damage photos before you buy the rebuilt result." },
  ],
  h2Internal: "Related Checks That Build On Your Jeep VIN Lookup",
  internalIntro: "The Jeep VIN lookup is the entry point. These focused checks dig into specific records — the Mopar broadcast sheet, the recall feed, salvage status, accident reports — when something needs verification.",
  internalLinks: [
    { href: "/vin-check/jeep", label: "Full Jeep VIN Check", desc: "Complete Jeep history report — title brands, accidents, odometer, recalls, and salvage in one place." },
    { href: "/mopar-broadcast-sheet", label: "Mopar Broadcast Sheet", desc: "Decode the original factory build sheet for any Jeep, Dodge, Chrysler, or Ram VIN." },
    { href: "/vin-decoder", label: "VIN Decoder", desc: "Break down any 17-character VIN into year, make, model, trim, and factory equipment." },
    { href: "/recall-check", label: "Recall Check", desc: "Look up open NHTSA safety recalls attached to any Jeep VIN — fuel tank, shifter, brakes, more." },
    { href: "/salvage-title-check", label: "Salvage Title Check", desc: "See if a Jeep VIN carries a salvage, junk, rebuilt, or non-repairable title brand." },
    { href: "/accident-history-check", label: "Accident History Check", desc: "Surface reported collisions, off-road damage, and total-loss claims on the Jeep VIN." },
    { href: "/flood-check", label: "Flood Damage Check", desc: "Confirm whether the Jeep was branded flood or water-damaged after a fording or storm event." },
    { href: "/pricing", label: "Pricing & Full Reports", desc: "Compare free lookup tiers with the full Jeep history report when the lookup raises any flag." },
  ],
  h2Faq: "Jeep VIN Lookup — Frequently Asked Questions",
  faqIntro: "The questions Jeep buyers ask most when running a VIN lookup on a Wrangler, Cherokee, Grand Cherokee, or Gladiator for the first time.",
  bottomBadge: "Free · Mopar Build Sheet · NMVTIS Source",
  ctaBottomHeading: "Ready to Lookup a Jeep VIN?",
  ctaBottomSub: "Enter any 17-character Jeep VIN to run a free lookup against NMVTIS sources, the NHTSA recall feed, and the Mopar broadcast-sheet decoder. No account required.",
  ctaBottomNote: "No credit card · No sign-up · Free Jeep VIN lookup",
} as const;

const FAQS_EN = [
  { question: "How do I look up a Jeep VIN?", answer: "To look up a Jeep VIN, find the 17-character Vehicle Identification Number — it's printed on the lower driver-side corner of the windshield, on the driver-side door jamb sticker, on the title and registration documents, and on older TJ, YJ, and CJ Wranglers stamped directly into the driver-side frame rail near the firewall. Type or paste the VIN into the lookup form on this page. We validate it's exactly 17 characters with no I, O, or Q, then query NMVTIS, the NHTSA recall feed, and the Mopar broadcast-sheet database in parallel. You'll see the decoded factory build, open recalls, and any title brands in seconds, for free, with no sign-up." },
  { question: "What does a Jeep VIN reveal?", answer: "A Jeep VIN reveals the exact factory build of your Wrangler, Cherokee, Grand Cherokee, Gladiator, Compass, or Renegade — model line and submodel (JL, JK, TJ, WK2, WL, KL), trim level (Sport, Sahara, Rubicon, Trailhawk, Overland, Summit, Mojave, 392), engine (3.6L Pentastar V6, 2.0L Hurricane turbo, 5.7L HEMI, 6.4L 392 HEMI, EcoDiesel, or 4xe), transmission, transfer case (Command-Trac, Selec-Trac, Rock-Trac, Quadra-Drive II), axle ratios, factory lockers, paint code, interior trim, and every optional package (Trail Rated, Sky One-Touch, Cold Weather, LED lighting, Advanced Safety). Cross-referenced against the Mopar broadcast sheet, the VIN confirms whether the equipment matches what the seller is advertising. The lookup also surfaces title brands, open recalls, salvage records, and any reported damage events." },
  { question: "Is the Jeep VIN lookup free?", answer: "Yes. Our Jeep VIN lookup is free, with no sign-up, no credit card, and no hidden charges. Enter any 17-character Jeep VIN and you'll get the decoded factory build, the Mopar broadcast-sheet summary, the open-recall list, and the title-brand status right away. Free VIN lookups are possible because NMVTIS data and NHTSA recall data are accessible through approved providers — we surface the consumer-relevant fields without paywalling basic safety information. A paid full Jeep history report is available if you need every dated line item, but the free lookup is sufficient for most pre-purchase decisions on a used Wrangler, Cherokee, Grand Cherokee, or Gladiator." },
  { question: "Where is the VIN on a Jeep Wrangler?", answer: "On a modern Jeep Wrangler (JL, JK, and most TJ models from 1997 onward) the VIN is printed in four places. First, the lower driver-side corner of the windshield, visible from outside through the glass — this is the easiest spot. Second, the driver-side door jamb sticker, required by federal law. Third, the title and state registration documents. Fourth, and crucially for older Wranglers (TJ, YJ, and CJ-series), the VIN is stamped directly into the driver-side frame rail near the firewall. The frame stamp is the canonical VIN on vintage Wranglers because dashboard plates and door stickers can be swapped during restoration. Always cross-check the dashboard VIN against the frame stamp and the title — a mismatch is a major red flag on an off-road-built Wrangler." },
  { question: "How do I check Jeep recalls by VIN?", answer: "To check Jeep recalls by VIN, enter the 17-character Jeep VIN into the lookup form on this page. We query the live NHTSA recall feed, which Jeep and Stellantis publish directly, and return any open or unresolved safety recalls attached to your specific Wrangler, Cherokee, Grand Cherokee, Gladiator, Compass, or Renegade. Common Jeep recalls to watch for include the 1993–2004 Grand Cherokee / 2002–2007 Liberty fuel-tank recall (NHTSA 13V-252), the 2014–2015 Grand Cherokee monostable-shifter rollaway recall, and various recent brake-booster and ABS module campaigns on the Cherokee and Wrangler 4xe. Open recalls stay attached to the VIN until completed — and Jeep dealers will perform the work for free regardless of who owns the vehicle." },
  { question: "How do I get a Jeep Mopar build sheet from the VIN?", answer: "To get a Jeep Mopar build sheet from the VIN, run the VIN through our lookup tool and click the link to the Mopar broadcast-sheet decoder. The broadcast sheet is the original factory invoice that traveled down the assembly line at Toledo South (Wrangler and Gladiator), Belvidere (Cherokee), or Detroit Jefferson North (Grand Cherokee) — listing the exact engine, transmission, transfer case, axle ratios, factory lockers, paint code, interior trim, soft-top or hard-top, and every optional package. It's keyed to the VIN in the FCA / Stellantis production database. The Mopar broadcast sheet is the only objective way to verify a 2018 Wrangler Rubicon came from the factory with both lockers, that a Grand Cherokee Summit has the air suspension, or that a Gladiator Mojave has the desert-tuned shocks — not just badging applied after the fact." },
  { question: "How do I check if a Jeep is salvage?", answer: "To check if a Jeep is salvage, run the VIN through our lookup tool — we query NMVTIS, the federal aggregator that pulls salvage and total-loss records from all 50 state DMVs, insurers, and salvage auctions like Copart and IAA. If the Jeep was branded salvage, junk, rebuilt, or non-repairable in any state, the brand surfaces in the lookup result even if the current title was washed across state lines (Alabama, Tennessee, and Vermont are common destinations for title-washing). This matters most for Wranglers and Cherokees coming out of off-road damage, rollover, or flood-zone auctions — Texas, Louisiana, and Florida total-loss Jeeps regularly resurface with lifted suspension hiding the original brand. For any flagged result, follow up with a full salvage title check and a hands-on inspection by a Jeep specialist before you buy." },
];

export default function JeepVinLookupBody() {
  const c = COPY;

  return (
    <article className="pb-16 bg-surface">
      <div className="bg-primary text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-14 sm:pt-28 sm:pb-20">
          <Breadcrumbs items={[{ label: c.home, href: "/" }, { label: c.crumb }]} onDark />
          <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
            <Mountain className="w-4 h-4" /> {c.badge}
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
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl">{c.revealIntro}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {c.reveals.map((r, i) => {
              const Icon = REVEAL_ICONS[i];
              return (
                <div key={r.title} className="rounded-2xl border border-outline-variant bg-surface p-5">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-base font-headline font-extrabold text-primary mb-1">{r.title}</h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">{r.body}</p>
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
                {c.decode1Suffix}
              </p>
              <p>
                {c.decode2Pre}
                <strong className="text-on-surface">{c.decode2Bold}</strong>
                {c.decode2Suffix}
              </p>
              <p>
                {c.decode3Pre}
                <strong className="text-on-surface">{c.decode3Bold1}</strong>
                {c.decode3Mid}
                <strong className="text-on-surface">{c.decode3Bold2}</strong>
                {c.decode3Mid2}
                <strong className="text-on-surface">{c.decode3Bold3}</strong>
                {c.decode3Suffix}
              </p>
              <p>{c.decode4}</p>
            </div>
            <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
              <div className="flex items-center gap-2 mb-3">
                <Hash className="w-5 h-5 text-primary" />
                <h3 className="font-headline font-extrabold text-primary">{c.decodeCardTitle}</h3>
              </div>
              <ul className="space-y-3 text-sm text-on-surface">
                {c.decodeRows.map((r) => {
                  const Icon = DECODE_ICONS[c.decodeRows.indexOf(r)];
                  return (
                    <li key={r.label} className="flex items-center justify-between gap-3 rounded-lg bg-white px-3.5 py-2.5 border border-outline-variant/60">
                      <span className="flex items-center gap-2 text-on-surface-variant">
                        <Icon className="w-4 h-4 text-primary/70" />
                        <code className="font-mono font-bold text-primary">{r.label}</code>
                      </span>
                      <span className="text-xs">{r.value}</span>
                    </li>
                  );
                })}
              </ul>
              <p className="mt-4 text-xs text-on-surface-variant leading-relaxed">{c.decodeCardNote}</p>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Mopar}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl leading-relaxed">{c.moparIntro}</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              <p>
                {c.mopar1Pre}
                <strong className="text-on-surface">{c.mopar1Bold}</strong>
                {c.mopar1Suffix}
              </p>
              <p>{c.mopar2}</p>
              <p>
                {c.mopar3Pre}
                <Link href="/mopar-broadcast-sheet" className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.mopar3Link}</Link>
                {c.mopar3Suffix}
              </p>
            </div>
            <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
              <div className="flex items-center gap-2 mb-3">
                <Factory className="w-5 h-5 text-primary" />
                <h3 className="font-headline font-extrabold text-primary">{c.moparCardTitle}</h3>
              </div>
              <ul className="space-y-2 text-sm text-on-surface">
                {c.moparChecklist.map((tip) => (
                  <li key={tip} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" strokeWidth={3} />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 rounded-xl bg-white p-4 border border-outline-variant">
                <p className="text-xs font-bold text-on-surface mb-2">{c.moparCardCta}</p>
                <VinSearchForm size="sm" />
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Where}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">{c.whereIntro}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {c.wheres.map((w, i) => {
              const Icon = VIN_LOC_ICONS[i];
              return (
                <div key={w.title} className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5 sm:p-6">
                  <div className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-base sm:text-lg font-headline font-extrabold text-primary mb-1.5">{w.title}</h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">{w.body}</p>
                </div>
              );
            })}
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
              <AlertTriangle className="w-5 h-5 text-on-secondary-container flex-shrink-0 mt-0.5" />
              <p className="text-sm text-on-surface leading-relaxed">
                <strong className="text-on-surface">{c.recallsNoteBoldLead}</strong>
                {c.recallsNoteMid1}
                <Link href="/recall-check" className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.recallsNoteLink1}</Link>
                {c.recallsNoteMid2}
                <Link href="/salvage-title-check" className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.recallsNoteLink2}</Link>
                {c.recallsNoteSuffix}
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2RedFlags}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">{c.redFlagsIntro}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {c.redFlags.map((item, i) => {
              const Icon = REDFLAG_ICONS[i];
              return (
                <div key={item.title} className="rounded-2xl border border-outline-variant bg-surface p-5 sm:p-6">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-base sm:text-lg font-headline font-extrabold text-primary mb-1.5">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">{item.body}</p>
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

        <RelatedChecks exclude="/jeep-vin-lookup" />
      </div>
    </article>
  );
}

export { FAQS_EN };
