/**
 * Body for /tesla-model-s-history-check — English-only Model S VIN
 * history landing covering title brands, accidents, salvage, flood,
 * theft, ownership, Fremont origin, and Tesla-specific red flags
 * including pre-2016 60/85/P85/P85D battery pack considerations.
 * Mirrors ToyotaVinLookupBody structure.
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
import QuickAnswer from "@/components/QuickAnswer";
import { TESLA_MODELS, TESLA_RECALL_OVERVIEW } from "@/lib/tesla-data";

const QUICK_ANSWER_ITEMS = [
  {
    question: "How do I check Tesla Model S history by VIN?",
    answer: (
      <>
        Enter the 17-character Model S VIN into{" "}
        <strong>CarCheckerVIN&apos;s</strong> free history check. It queries{" "}
        <strong>NMVTIS</strong> for title brands, salvage, flood, and theft
        records plus open NHTSA recalls — the same data state DMVs report.
        Every Model S is built at Fremont (WMI 5YJ).
      </>
    ),
  },
  {
    question: "What does a Model S history check show?",
    answer: (
      <>
        A Tesla Model S history check returns title brands, accident records,
        salvage flags, flood damage, theft and recovery status, ownership
        count, Fremont assembly confirmation, and any open NHTSA recalls
        including the 23V-376 front trunk hood latch action.
      </>
    ),
  },
  {
    question: "Can a salvage Model S lose Supercharger access?",
    answer: (
      <>
        Yes — Tesla has historically flagged some salvage Model S VINs as
        ineligible for Supercharger network access. The lockout travels with
        the VIN regardless of who owns the car. Verify Supercharger status
        with Tesla service before buying any salvage or rebuilt Model S.
      </>
    ),
  },
];

const HOW_ICONS = [Search, Database, FileText] as const;
const SIGN_ICONS = [Hash, Car, Cpu, AlertTriangle, Wrench, Gauge] as const;
const DANGER_ICONS = [Cpu, Shield, Gauge] as const;

const modelS = TESLA_MODELS.find((m) => m.key === "model-s")!;

const COPY = {
  home: "Home",
  crumb: "Tesla Model S History Check",
  badge: "Free Tesla Model S History Check by VIN   ·   NMVTIS + Title Brands",
  h1Lead: "Free Tesla Model S History Check — ",
  h1Accent: "NMVTIS Title Brands, Salvage & Recall Lookup.",
  intro: "The Tesla Model S is Tesla's flagship sedan and the car that proved the long-range electric vehicle was viable. Every Model S since 2012 has been built at Gigafactory California in Fremont, so every Model S VIN starts with WMI 5YJ. Every Model S carries a 17-character VIN that keys into NMVTIS — the federal title-history aggregator — plus the NHTSA recall feed. A Tesla Model S history check pulls title brands, salvage and flood flags, theft records, ownership count, and open recalls including the 23V-376 front trunk hood latch action. Enter a Model S VIN below and we'll run the lookup in seconds. No account, no card, no catch.",
  formHeading: "Free Tesla Model S History Check — Lookup Any 17-Character Model S VIN",
  formSub: "Enter the Tesla Model S VIN and we'll query NMVTIS for title brands, salvage records, and flood damage plus NHTSA for open recalls.",
  formNote: "Free · No sign-up · Instant result",
  trustStats: [
    { icon: Database, value: "NMVTIS", label: "title history" },
    { icon: Car, value: "Model S", label: "specific" },
    { icon: Shield, value: "NHTSA", label: "recall feed" },
    { icon: BadgeCheck, value: "Free", label: "no sign-up" },
  ],
  h2How: "How a Tesla Model S History Check Works",
  howIntro: "A Model S history check is simple from your side of the screen. Behind it, the tool reaches into the same national databases Tesla service centers, insurers, and state DMVs use, then returns the result in plain English. Three steps from VIN to verdict.",
  howSteps: [
    { tag: "Step 1", title: "Enter the Model S VIN", body: "Type or paste the 17-character VIN from the lower windshield, the driver-side door jamb sticker, the Tesla title, or the MyTesla app vehicle profile. Every Model S VIN starts with 5YJ — Fremont is the only Model S assembly plant since 2012." },
    { tag: "Step 2", title: "We query the records", body: "Your Model S VIN check hits NMVTIS — the federal aggregator pulling from all 50 state DMVs, insurers, junk yards, and salvage auctions — plus the NHTSA recall feed and our Tesla decoder. The full lookup runs in seconds." },
    { tag: "Step 3", title: "Read the Model S history report", body: "You'll see title brands, accident records, salvage and flood flags, theft and recovery status, ownership count, Fremont assembly confirmation, and any open NHTSA recalls. Use it to negotiate, walk away, or buy with confidence." },
  ],
  h2Title: "What a Tesla Model S History Check Reveals",
  titleIntro: "A Tesla Model S history check returns the same VIN-keyed data Tesla service centers, insurance carriers, and state DMVs already use, presented for a buyer rather than a back-office system. Here is what comes back when you run a Model S VIN through the lookup.",
  title1Pre: "First, the lookup confirms ",
  title1Bold1: "title brands and salvage status",
  title1Mid: " — flood, salvage, junk, rebuilt, lemon-law buyback, and odometer-rollback brands all surface here. Because Tesla titles move across state lines as the car changes hands, ",
  title1Bold2: "NMVTIS is the only definitive source",
  title1Mid2: " that pulls from every state DMV. The report also confirms ",
  title1Bold3: "Fremont as the assembly plant",
  title1Suffix: " — every Model S since 2012 carries the 5YJ WMI from Gigafactory California.",
  title2Pre: "Second, your Model S history check returns ",
  title2Bold: "accident records, theft and recovery status, and ownership count",
  title2Suffix: ". Outright Model S theft is rare thanks to Sentry Mode (on later cars) and the Tesla immobilizer, but parts theft — particularly wheels, center screens, and the front bumper sensor packs on newer cars — is more common and may show up in insurance theft claims that feed into NMVTIS.",
  title3: "Third, the lookup checks the open-recall feed published by Tesla and NHTSA. Tesla pushes most safety remedies as free over-the-air software updates, but dealer-applied actions stay attached to the VIN until completed at a Tesla service center. The 23V-376 front trunk hood latch action and various Model S-specific campaigns may still be open on older cars.",
  pathCardTitle: "What you get from one Model S VIN",
  pathRows: [
    { label: "Title brands", value: "NMVTIS · States" },
    { label: "Salvage / flood", value: "Flags · Records" },
    { label: "Plant", value: "5YJ · Fremont" },
  ],
  pathCardNote: "One 17-character Model S VIN, three layers of insight. The whole history check runs in seconds and never asks for an account.",
  h2Decode: "Tesla-Specific Model S History Red Flags",
  decodeIntro: "Used Tesla Model S sedans carry the same generic risks as any used car — flood, salvage, theft, odometer rollback — but several risks are uniquely Tesla, and Model S adds pre-2016 battery-pack considerations that no other Tesla model has. Knowing these red flags before you buy is the difference between a great deal and a 4,800-pound paperweight.",
  decodeRows: [
    { code: "Salvage battery", meaning: "Salvage Model S sedans often have battery-pack issues that do not show externally. Water intrusion or impact damage to the high-voltage pack can cause thermal-runaway risk months or years after the salvage event. A clean exterior does not mean a clean pack — particularly on older 85 kWh cars." },
    { code: "Flood damage", meaning: "Flood damage is catastrophic for a Model S's high-voltage system. Saltwater can short the pack permanently, and even fresh-water flooding can corrode the BMS and connector pins. Any flood brand on a Model S NMVTIS report is a hard no for most buyers." },
    { code: "Pre-2016 pack degradation", meaning: "Pre-2016 Model S cars use 60/85/P85/P85D battery packs that may have degraded significantly over a decade of use. Original-range estimates may no longer be accurate, and 85 kWh packs in particular have well-documented age-related capacity loss. Ask Tesla service for a battery health report before buying." },
    { code: "Supercharger lock-out", meaning: "Tesla has historically flagged some salvage Model S VINs as ineligible for Supercharger network access. The lockout travels with the VIN regardless of who currently owns the car. Verify Supercharger eligibility with Tesla service before buying any salvage or rebuilt Model S." },
    { code: "23V-376 hood latch", meaning: "NHTSA campaign 23V-376 covers a Model S / X subset where the front trunk hood could open while driving due to a secondary-latch design issue. A Model S VIN check confirms whether the remedy has been applied. Schedule the fix before the next drive if it is still open on the VIN." },
  ],
  decodeTail: "These five risks — particularly the pre-2016 battery-pack degradation question — are why a Model S history check is not optional for any used purchase. Run the VIN before you write a check. The lookup is free and surfaces exactly the brands and flags that the previous owner does not want you to see.",
  h2Signs: "When You Should Run a Tesla Model S History Check",
  signsIntro: "A Tesla Model S history check is cheap insurance — actually free — for anyone making a decision about a specific Model S. Six situations where it pays to run a Model S VIN before you commit.",
  signs: [
    { title: "Before you buy a used Model S private-party", body: "The seller's word is not the title record. Run a Tesla Model S history check before you hand over a deposit, and you'll see salvage brands, flood flags, theft records, and open recalls the seller may not even disclose." },
    { title: "Buying a pre-2016 Model S", body: "Older Model S sedans with 60, 85, P85, or P85D packs have well-documented age-related battery capacity loss. A VIN check tells you the production year exactly, and pairing it with a Tesla service battery health report tells you what range the car actually delivers today." },
    { title: "Shopping a Tesla or non-Tesla used lot", body: "Even Tesla's own used inventory inherits cars from trade-ins. A quick Model S history check tells you whether the trade came with a flood brand, a salvage history, or unresolved recalls before you sit down to negotiate." },
    { title: "Checking an inherited Model S", body: "Inheriting a Model S? A free history check confirms the title status, surfaces any open recalls including 23V-376 hood latch, and tells you whether the VIN has been flagged for Supercharger lockout before you put your name on the registration." },
    { title: "Verifying a Model S insurance quote", body: "Insurers price by VIN. Running the Model S history check yourself confirms the year, trim, and accident history they used — and catches mistakes that inflate your premium." },
    { title: "Spotting a too-good-to-be-true Model S deal", body: "A clean-looking Model S priced well below market is the classic salvage-or-flood tell. Older Model S cars depreciate faster than newer Teslas because of battery-age concerns — but a price that's far below market for the year is the fastest way to spot a salvage car." },
  ],
  midCtaHeading: "Run the Tesla Model S History Check Right Now",
  midCtaSub: "You already have a Model S in mind. Run the VIN against NMVTIS, the NHTSA recall feed, and our Tesla decoder — free, in seconds. No sign-up.",
  h2Where: "How Tesla's Connected Services Interact With VIN History",
  where1Pre: "Tesla owners have an advantage other carmakers do not provide: the MyTesla app shows service history, charging history, and OTA update logs in real time. But that data lives in Tesla's account ecosystem — when ownership transfers, the new owner sees their own MyTesla account, ",
  where1Bold: "not the previous owner's records",
  where1Suffix: ". A Tesla Model S history check via VIN is the only way to see the open NMVTIS record across owners.",
  where2: "Use them together. The MyTesla app shows what Tesla service centers have done on the car (with the current owner's consent). The CarCheckerVIN history check shows what NMVTIS knows across all 50 state DMVs, insurers, and salvage auctions. The two views overlap on some events and diverge on others — together they form a complete picture, particularly on older Model S cars where the service history can span more than a decade.",
  where3: "If the MyTesla app shows clean service history but the NMVTIS report flags a salvage brand from three states ago, that gap matters. The seller may have legitimately rebuilt and re-registered the car, or the previous owner may have hidden a structural rebuild. Either way, the VIN history check forces the conversation.",
  whereCardTitle: "Five places the Model S VIN lives",
  whereList: [
    "Lower driver-side windshield (visible from outside)",
    "Driver-side door jamb sticker (federal requirement)",
    "MyTesla app vehicle profile",
    "Tesla title document",
    "Insurance ID card",
  ],
  whereCardNote: "Found it? Drop it into the form above and run a free Tesla Model S history check against NMVTIS in seconds.",
  h2Danger: "Specific Tesla Model S History Concerns by Year",
  dangerIntro: "The Model S has been in production since 2012, and not every model year is equivalent. These year-specific concerns help you read a Model S history check report with the right context for the specific car you're considering.",
  dangers: [
    { title: "Pre-2016 60/85/P85/P85D packs", body: "Pre-2016 Model S cars use 60, 85, P85, or P85D battery packs that may have degraded significantly over a decade of use. Original-range estimates may no longer be accurate, and 85 kWh packs in particular have well-documented age-related capacity loss. A VIN check confirms the production year exactly. Pair it with a Tesla service battery health report before any purchase of a pre-2016 Model S." },
    { title: "2016-2020 mid-cycle production", body: "Post-2016 Model S production benefited from the 2016 hardware refresh (AP2 hardware, redesigned front fascia). Battery pack architecture also evolved — including 90, 100, and Long Range variants. NMVTIS checks remain critical because some 2016-2020 Model S cars passed through flood-prone states during major storms; verify any title transfer through Texas, Louisiana, Florida, or the Carolinas." },
    { title: "2021+ Refresh", body: "The 2021 Model S 'Refresh' introduced the redesigned interior (yoke steering wheel option), updated battery architecture, and the tri-motor Plaid variant. Late-2021 and 2022 Model S history checks may also surface OTA recall remedies for fleet-wide actions like the 23V-838 Autopilot remediation. Confirm both pre- and post-Refresh builds via the production date on the door jamb sticker." },
  ],
  dangerNoteBoldLead: "Buying a used Model S?",
  dangerNoteMid1: " Pair this Model S history check with a focused ",
  dangerNoteLink1: "accident history check",
  dangerNoteMid2: " and a ",
  dangerNoteLink2: "salvage title check",
  dangerNoteSuffix: " for a complete picture before you put money down.",
  h2Certified: "MyTesla App vs a Free VIN History Check",
  cert1Pre: "Tesla's MyTesla app is excellent for current-owner service history, charging history, and OTA logs — but it does not show NMVTIS-sourced title brand history, salvage records, total-loss claims, or accident records from independent sources. A free Model S history check on this page combines NMVTIS title and brand records with NHTSA recall data to give you a more complete picture in a single search. The MyTesla app ",
  cert1Bold: "does not replace a VIN-level history check",
  cert1Suffix: ". MyTesla confirms what Tesla service has done; CarCheckerVIN confirms what has happened to the car.",
  cert2Pre: "A free Model S history check catches the things the MyTesla app isn't designed to surface: a flood brand from a state that re-titled the car clean, a prior salvage history, an open recall the previous owner ignored, an odometer rollback, or a Supercharger lockout flag. For any used Model S purchase, run the lookup ",
  cert2Bold: "first",
  cert2Mid: ", and consider a full ",
  cert2Link1: "VIN history report",
  cert2Mid2: " plus an independent Tesla inspection. If anything looks off, a ",
  cert2Link2: "flood damage check",
  cert2Suffix: " can confirm exactly which state applied the brand and when.",
  cert3: "Either way, double-check the VIN itself. Compare the VIN on the windshield against the door jamb sticker, the title, and the MyTesla app. If even one digit is off across those sources, the Model S may not be what the paperwork says it is.",
  certCardTitle: "Model S pre-purchase VIN checklist",
  certChecklist: [
    "Confirm the VIN matches across windshield, door jamb, MyTesla app, and title",
    "Verify the WMI starts with 5YJ (Fremont production)",
    "Run a free Model S history check for title brands and salvage records",
    "For pre-2016 cars, request a Tesla service battery health report",
    "Verify Supercharger network eligibility with Tesla service",
    "Confirm any open NHTSA campaigns including 23V-376 are closed on the VIN",
  ],
  certCardCta: "Run the Model S history lookup first — paste the VIN here:",
  h2Internal: "Related Checks That Build On Your Model S History Lookup",
  internalIntro: "A Tesla Model S history check is the entry point. These focused checks dig into specific records when something looks off — or when you want to be extra thorough before buying any used Model S.",
  internalLinks: [
    { href: "/vin-check", label: "VIN Check", desc: "Full VIN-specific history report with title brands, accidents, mileage, and recalls in one view." },
    { href: "/tesla-vin-decoder", label: "Tesla VIN Decoder", desc: "Break down any Tesla VIN into year, model, plant, and factory equipment." },
    { href: "/tesla-model-3-history-check", label: "Model 3 History Check", desc: "Run a Model 3 VIN against NMVTIS title brands and history records." },
    { href: "/tesla-model-y-history-check", label: "Model Y History Check", desc: "Run a Model Y VIN against NMVTIS title brands and history records." },
    { href: "/salvage-title-check", label: "Salvage Title Check", desc: "See if a Model S VIN carries a salvage, junk, or non-repairable title brand." },
    { href: "/flood-check", label: "Flood Damage Check", desc: "Confirm whether a Model S was branded flood or water-damaged in any state." },
    { href: "/accident-history-check", label: "Accident History Check", desc: "Surface reported collisions, damage events, and total-loss claims on the Model S VIN." },
    { href: "/stolen-vehicle-check", label: "Stolen Vehicle Check", desc: "Confirm whether the Model S VIN is listed as stolen in police or insurance records." },
  ],
  h2Faq: "Tesla Model S History Check — Frequently Asked Questions",
  faqIntro: "The questions buyers ask most when they want to check a Tesla Model S history by VIN before buying.",
  bottomBadge: "Free · Instant · NMVTIS Source",
  ctaBottomHeading: "Ready to Check a Tesla Model S History?",
  ctaBottomSub: "Enter any 17-character Tesla Model S VIN to run a free history check against NMVTIS sources and the NHTSA recall feed. No account required.",
  ctaBottomNote: "No credit card · No sign-up · Free",
} as const;

const FAQS_EN = [
  { question: "How do I check Tesla Model S history by VIN?", answer: "To check Tesla Model S history by VIN, find the 17-character Vehicle Identification Number on the lower driver-side corner of the windshield, the driver-side door jamb sticker, the MyTesla app vehicle profile, or the Tesla title. Enter it into the free Model S history check form on this page. The tool validates the format then queries NMVTIS for title brands and salvage records, the NHTSA recall feed for open campaigns including 23V-376, and our Tesla decoder for Fremont production confirmation. Every Model S VIN since 2012 starts with WMI 5YJ. Results return in seconds with no account required." },
  { question: "What if a Tesla Model S has a salvage title?", answer: "A salvage title on a Tesla Model S means the car was declared a total loss by an insurer at some point in its history. Salvage Model S sedans often have battery-pack issues that do not show externally — water intrusion or impact damage to the high-voltage pack can cause thermal-runaway risk months or years after the salvage event. Tesla may also flag salvage Model S VINs as ineligible for Supercharger network access. Pre-2016 cars with 60/85/P85/P85D packs are particularly suspect because a salvage event combined with normal age-related capacity loss can leave the car with very limited usable range. Before buying any salvage or rebuilt Model S, verify Supercharger eligibility with Tesla service, ask Tesla to read the BMS log if possible, and have an independent Tesla-certified shop inspect the high-voltage pack." },
  { question: "Can Tesla lock a salvaged Model S out of Supercharging?", answer: "Yes. Tesla has historically flagged some salvage Model S VINs as ineligible for Supercharger network access. The lockout travels with the VIN regardless of who currently owns the car or whether the title was washed clean in another state. The lockout is enforced at the Supercharger handshake protocol, so DC fast charging at non-Tesla networks may still work, but the convenience and density of the Tesla Supercharger network is no longer available. Always verify Supercharger eligibility with Tesla service before buying any salvage or rebuilt Model S — Tesla can confirm the status on a specific VIN before you commit." },
  { question: "Does flood damage destroy a Tesla Model S battery?", answer: "Flood damage is catastrophic for a Tesla Model S's high-voltage system. Saltwater is particularly destructive because it can short the high-voltage pack permanently — even brief submersion can render the pack non-functional and unsafe. Fresh-water flooding is less immediately destructive but can corrode the battery management system circuit board, connector pins, and low-voltage harnesses over months. Any flood brand on a Model S NMVTIS report is a hard no for most buyers because replacement of a Tesla Model S high-voltage pack — particularly on older 85 kWh cars — is one of the most expensive repairs in modern automotive service and often more than the car's market value." },
  { question: "How do I know if a Tesla Model S was in an accident?", answer: "A Tesla Model S history check surfaces accident-related events reported to insurers, NMVTIS, or salvage operators. Look specifically for total-loss claims, salvage and junk title brands, and rebuilt brands in the title history — those are strong indicators that the Model S was in a significant accident. For more granular collision data including police-reported accidents and damage estimates, run a dedicated accident history check on the Model S VIN. Keep in mind that minor body work paid out of pocket may never appear in any database, which is why a Tesla Model S history check should always be paired with a hands-on Tesla-certified inspection before any significant used purchase." },
  { question: "How does the MyTesla app compare to a VIN history check?", answer: "Tesla's MyTesla app shows service history, charging history, and over-the-air update logs for the current owner's account. It is excellent for confirming what Tesla service has done on the car under current ownership. However, MyTesla does not show NMVTIS-sourced title brand history, salvage records, total-loss claims, or accident records from independent sources. A free Model S history check on this page combines NMVTIS title and brand records with NHTSA recall data to give you a more complete picture in a single search. The two views are complementary — MyTesla for what Tesla service has touched, CarCheckerVIN for what NMVTIS knows across all 50 state DMVs, insurers, and salvage auctions. The combination is particularly important on older Model S cars where the service history can span more than a decade." },
  { question: "What's a clean Tesla Model S title worth vs a rebuilt one?", answer: "A clean-title Tesla Model S typically commands a 30-50 percent premium over an equivalent rebuilt-title Model S, sometimes more depending on the year, trim, and severity of the original damage. The discount on rebuilt Model S sedans reflects three real risks: hidden battery-pack damage that does not show externally (particularly on pre-2016 85 kWh cars), potential Supercharger network lockout, and reduced insurance availability (many carriers will not write full coverage on a rebuilt Tesla). Some rebuilt Model S cars are excellent value when verified by Tesla service with a clean BMS log and confirmed Supercharger access; others are 4,800-pound paperweights. The Model S history check tells you which category the specific VIN falls into before you commit." },
];

export default function TeslaModelSHistoryCheckBody() {
  const c = COPY;

  return (
    <article className="pb-16 bg-surface">
      <div className="bg-primary text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-14 sm:pt-28 sm:pb-20">
          <Breadcrumbs items={[{ label: c.home, href: "/" }, { label: c.crumb }]} onDark />
          <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
            <Database className="w-4 h-4" /> {c.badge}
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
              <p className="text-xs text-on-surface-variant/80 italic">{modelS.note}</p>
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
                    <code className="font-mono font-bold text-primary text-xs">{r.value}</code>
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
          <div className="rounded-2xl bg-primary/5 border border-primary/20 p-5 sm:p-6">
            <ul className="space-y-2.5 text-sm text-on-surface">
              {c.decodeRows.map((r) => (
                <li key={r.code} className="flex items-start gap-3 rounded-lg bg-white px-3.5 py-2.5 border border-outline-variant/60">
                  <code className="font-mono font-black text-primary text-xs sm:text-sm flex-shrink-0 w-28">{r.code}</code>
                  <span className="text-on-surface-variant text-xs sm:text-sm leading-relaxed">{r.meaning}</span>
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-5 text-sm sm:text-base text-on-surface-variant leading-relaxed max-w-3xl">{c.decodeTail}</p>
          <p className="mt-3 text-xs text-on-surface-variant italic max-w-3xl">{TESLA_RECALL_OVERVIEW.freeRepair}</p>
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

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Danger}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">{c.dangerIntro}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {c.dangers.map((item, i) => {
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
              <FileText className="w-5 h-5 text-on-secondary-container flex-shrink-0 mt-0.5" />
              <p className="text-sm text-on-surface leading-relaxed">
                <strong className="text-on-surface">{c.dangerNoteBoldLead}</strong>
                {c.dangerNoteMid1}
                <Link href="/accident-history-check" className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.dangerNoteLink1}</Link>
                {c.dangerNoteMid2}
                <Link href="/salvage-title-check" className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.dangerNoteLink2}</Link>
                {c.dangerNoteSuffix}
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">{c.h2Certified}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              <p>
                {c.cert1Pre}
                <strong className="text-on-surface">{c.cert1Bold}</strong>
                {c.cert1Suffix}
              </p>
              <p>
                {c.cert2Pre}
                <strong className="text-on-surface">{c.cert2Bold}</strong>
                {c.cert2Mid}
                <Link href="/vin-check" className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.cert2Link1}</Link>
                {c.cert2Mid2}
                <Link href="/flood-check" className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.cert2Link2}</Link>
                {c.cert2Suffix}
              </p>
              <p>{c.cert3}</p>
            </div>
            <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
              <div className="flex items-center gap-2 mb-3">
                <ClipboardCheck className="w-5 h-5 text-primary" />
                <h3 className="font-headline font-extrabold text-primary">{c.certCardTitle}</h3>
              </div>
              <ul className="space-y-2 text-sm text-on-surface">
                {c.certChecklist.map((tip) => (
                  <li key={tip} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" strokeWidth={3} />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 rounded-xl bg-white p-4 border border-outline-variant">
                <p className="text-xs font-bold text-on-surface mb-2">{c.certCardCta}</p>
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

        <RelatedChecks exclude="/tesla-model-s-history-check" />
      </div>
    </article>
  );
}

export { FAQS_EN };
