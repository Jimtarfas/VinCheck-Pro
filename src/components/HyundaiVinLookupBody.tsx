/**
 * Body for /hyundai-vin-lookup — English-only brand-specific landing page
 * targeting the "hyundai vin lookup" keyword (~1.3K US monthly searches).
 * Hyundai-focused deep dive: theft-vulnerability (Kia Boys), recalls, Bluelink,
 * Theta II class-action. Mirrors VinNumberLookupBody visual structure with a
 * flat COPY object (no locales).
 */

import Link from "@/components/LocaleLink";
import {
  Check, Shield, Search, FileText, Database, Car,
  ChevronRight, Lock, Zap, BadgeCheck, Sparkles, Hash, Wrench,
  Gauge, ClipboardCheck, AlertTriangle, MapPin, Cpu, Flame, KeyRound, Smartphone, Scale,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";

const REVEAL_ICONS = [Cpu, BadgeCheck, KeyRound, Wrench] as const;
const WMI_ICONS = [Hash, Car, MapPin, Gauge] as const;
const VIN_LOC_ICONS = [Search, Car, FileText, Shield] as const;
const THEFT_ICONS = [AlertTriangle, KeyRound, Shield] as const;
const RECALL_ICONS = [Flame, AlertTriangle, KeyRound] as const;

const COPY = {
  home: "Home",
  crumb: "Hyundai VIN Lookup",
  badge: "Free Hyundai VIN Lookup   ·   Theft + Recall + Spec Check",
  h1Lead: "Hyundai VIN Lookup — ",
  h1Accent: "Free Theft, Recall, and Decoded Spec Report.",
  intro: "Every Hyundai on the road carries a 17-character VIN that opens up the car's factory build sheet, its recall history, and — for 2011 through 2022 Elantra, Sonata, Tucson, and Santa Fe owners — whether it falls inside the well-known no-immobilizer theft vulnerability that turned certain Hyundais into a TikTok trend. Enter the VIN below and we'll run a free Hyundai VIN lookup against NMVTIS, the NHTSA recall feed, and the manufacturer's anti-theft software update list in seconds. No sign-up, no card, no catch.",
  formHeading: "Free Hyundai VIN Lookup — Search Any 17-Character Hyundai VIN",
  formSub: "Enter the VIN and we'll surface decoded Hyundai specs, open recalls, salvage records, and the anti-theft software update status — instantly.",
  formNote: "Free · No sign-up · Instant result",
  trustStats: [
    { icon: Database, value: "NMVTIS", label: "title + salvage" },
    { icon: Car, value: "Decoded", label: "Hyundai trim" },
    { icon: Shield, value: "Theft", label: "vulnerability check" },
    { icon: BadgeCheck, value: "Free", label: "no sign-up" },
  ],
  h2Reveal: "What a Hyundai VIN Lookup Reveals",
  revealIntro: "A Hyundai VIN lookup goes well beyond the badge on the trunk. Behind those 17 characters sit the engine code, the trim package, the plant of manufacture, and — uniquely for Hyundai — a record of whether the vehicle was part of the multi-year anti-theft software update campaign. Four layers of insight come back from a single search.",
  reveals: [
    { title: "Engine and trim breakdown", body: "The decoder pulls the engine family (Theta II 2.4L, Nu 2.0L, Smartstream 2.5L, Lambda 3.3L V6, and so on), the transmission, the drivetrain, and the factory trim — SE, SEL, Limited, N Line, or N — so you can confirm what the seller is actually offering before you negotiate." },
    { title: "Recall history (open and resolved)", body: "Hyundai has issued some of the largest recall campaigns of the last decade — Theta II engine seizures, ABS hydraulic module fire risk, and the anti-theft software update among them. Your VIN lookup shows which recalls still require dealer work and which have already been completed." },
    { title: "Theft-deterrent status", body: "For 2011-2022 Elantra, Sonata, Tucson, Santa Fe, Veloster, Accent, and Kona models, the VIN tells you whether the car shipped with an engine immobilizer or whether it falls inside the no-immobilizer group made famous by the Kia Boys TikTok trend — and whether the free anti-theft software update has been applied." },
    { title: "Title and salvage history", body: "NMVTIS surfaces flood, salvage, junk, rebuilt, and lemon-law brands across all 50 states. Hyundai-specific theft losses are heavily represented in salvage pools because of the same vulnerability, so this check matters more for these brands than for most." },
  ],
  h2Decode: "Decoding a Hyundai VIN — WMI Patterns That Identify the Plant",
  decodeIntro: "The first three characters of any VIN form the World Manufacturer Identifier — the WMI — and Hyundai uses several depending on where the vehicle was built. Recognizing the WMI alone tells you the country of assembly and often the body style before you even decode the rest.",
  wmis: [
    { code: "KMH", title: "Korea-built passenger cars", body: "Standard Hyundai passenger sedans and hatchbacks assembled in South Korea — Elantra, Sonata, Accent, Veloster, and the Korean-built Tucson variants. The most common Hyundai WMI in the US used market." },
    { code: "KMF", title: "Korea-built MPVs and commercial vans", body: "Multi-purpose vehicles and certain commercial vans assembled in Korea, including the Hyundai Staria and select Starex generations exported under various market names." },
    { code: "5NM", title: "Alabama-built SUVs (Montgomery plant)", body: "Tucson and Santa Fe units built at Hyundai Motor Manufacturing Alabama (HMMA) in Montgomery use the 5NM WMI. If you're looking at a US-market Tucson or Santa Fe, this is the most common prefix." },
    { code: "5NP", title: "Alabama-built Sonata", body: "Sonata sedans built at HMMA also use a 5N-series WMI — typically 5NP for sedans. Use the model-year digit (position 10) and the trim digits (positions 4-8) to confirm the build." },
  ],
  decodeOutroPre: "Beyond the WMI, position 10 is the ",
  decodeOutroBold: "model-year code",
  decodeOutroSuffix: " — A is 2010, B is 2011, on up to N for 2022, P for 2023, R for 2024, and so on (the letters I, O, Q, U, Z, and the digit 0 are skipped to avoid confusion). This is exactly the digit you need to confirm whether a used Hyundai falls inside the 2011-2022 theft-vulnerability window.",
  cardWmiTitle: "Hyundai WMI quick reference",
  cardWmiNote: "Match the first three characters of your VIN to one of these rows to confirm where the car was built — and which trim families to expect.",
  h2Where: "Where to Find the VIN on a Hyundai",
  whereIntro: "Every Hyundai prints its VIN in at least four places, and any one of them is enough to run a free VIN check. Knowing where to look also helps you spot mismatches — a classic warning sign on used cars.",
  whereLocations: [
    { title: "Lower driver-side windshield", body: "Stand outside the car on the driver's side and look down at the bottom corner of the windshield from outside. The VIN is etched into a small plate visible through the glass on every Hyundai built for the US market." },
    { title: "Driver-side door jamb sticker", body: "Open the driver's door and look at the B-pillar (the post the door latches into). The federal certification sticker prints the full VIN along with the build date and tire-pressure specs." },
    { title: "Vehicle title and registration", body: "Both the state title document and the annual registration card print the 17-character VIN. Cross-check this against the dashboard and door jamb — all three should match exactly." },
    { title: "Insurance ID card and Bluelink account", body: "Your insurer prints the VIN on the ID card, and if the car has an active Hyundai Bluelink subscription, the VIN is shown in the MyHyundai app under the vehicle profile." },
  ],
  midCtaHeading: "Look Up This Specific Hyundai Right Now",
  midCtaSub: "You already have a Hyundai in mind. Run the VIN against NMVTIS, the NHTSA recall feed, the Theta II class-action list, and the anti-theft update registry — free, in seconds.",
  h2Theft: "The 2011-2022 Hyundai Theft-Vulnerability Situation",
  theftIntro: "If you're checking a Hyundai built between 2011 and 2022, this is the single most important section on the page. A large slice of mid-range trims on those model years shipped without a standard engine immobilizer — the small chip in the key that prevents the engine from starting unless it recognizes the key's transponder. That gap is what made certain Hyundais (and the corresponding Kia models) the target of the viral TikTok trend often called the Kia Boys.",
  theft2Pre: "The thefts work because the affected cars use a traditional turn-key ignition without an immobilizer. Once the steering column is broken, the ignition cylinder can be turned with a flat-blade tool — famously a USB-A connector cut to the right profile. ",
  theft2Bold: "Vehicles with push-button start were not affected",
  theft2Suffix: " because they require the key fob to be present and authenticated. Higher trims often had push-button start as standard, which is why the vulnerability is trim-specific even within a single model year.",
  theftModels: [
    { title: "Affected model families", body: "2011-2022 Elantra, 2011-2022 Sonata (excluding hybrid and turbo trims with push-button start), 2011-2022 Tucson, 2013-2022 Santa Fe and Santa Fe Sport, 2012-2022 Veloster, 2018-2022 Accent, 2018-2022 Kona, and 2021-2022 Palisade base trims. Trim and option packages matter — check the VIN, not the model name alone." },
    { title: "The free anti-theft software update", body: "In response to the theft wave, Hyundai rolled out a free software update that extends the alarm sound and requires the key to be in the ignition for the engine to start. It's installed at any Hyundai dealer at no cost and is identified by the recall campaign number 953. Your VIN lookup shows whether the update has been applied to this specific car." },
    { title: "Insurance and resale impact", body: "Several US insurers — including Progressive and State Farm — temporarily declined new policies on affected Hyundais in some metros at the peak of the theft wave. Resale values softened on affected trims as well. Confirming the software update status (and the presence of any aftermarket immobilizer or steering lock) materially affects insurability and price." },
  ],
  theftCalloutBoldLead: "Buying a 2011-2022 Hyundai?",
  theftCalloutMid: " Run the VIN through our ",
  theftCalloutLink1: "stolen vehicle check",
  theftCalloutMid2: " and confirm the anti-theft software update is logged against the VIN before you close the deal. If it isn't, the dealer can install it in under an hour at no charge.",
  h2Recalls: "Common Hyundai Recalls a VIN Lookup Surfaces",
  recallsIntro: "Hyundai has been at the center of three of the largest US recall campaigns of the last decade. A VIN lookup is the only way to confirm whether the specific car in front of you was repaired or whether the work is still outstanding.",
  recalls: [
    { title: "Theta II engine seizure", body: "The Theta II 2.0L and 2.4L gasoline direct-injection engines used in 2011-2019 Sonata, 2013-2019 Santa Fe Sport, 2014-2015 Tucson, and several Kia equivalents were subject to multiple recalls for premature engine failure caused by manufacturing debris in the crankshaft oil passages. The campaigns included a software-based knock sensor detection system to alert drivers before catastrophic failure, plus extended warranty coverage and a class-action settlement." },
    { title: "ABS hydraulic module fire risk", body: "Certain 2014-2022 Tucson, 2016-2018 Santa Fe, 2017-2018 Santa Fe Sport, and 2019 Santa Fe XL units were recalled because brake fluid could leak into the anti-lock brake (ABS) hydraulic module, potentially causing an electrical short and engine-compartment fire. Owners were advised to park outside until the fix — a replacement multi-fuse or ABS module — was completed." },
    { title: "Anti-theft software update (campaign 953)", body: "The free software update issued in response to the Kia Boys theft wave is itself logged as a recall-equivalent customer satisfaction campaign on the affected 2011-2022 Hyundais. Your VIN lookup will show whether the campaign has been performed on this specific car." },
  ],
  h2Bluelink: "Hyundai Bluelink Connected Services and Your VIN",
  bluelink1Pre: "Hyundai Bluelink is the brand's connected-services platform — remote start, stolen-vehicle recovery, automatic collision notification, monthly vehicle health reports, and integration with the MyHyundai app. ",
  bluelink1Bold: "Every Bluelink subscription is keyed to the VIN",
  bluelink1Suffix: ", which means transferring ownership of a used Hyundai requires the previous owner to release the VIN from their MyHyundai account before the new owner can enroll.",
  bluelink2: "When you run a Hyundai VIN lookup before buying, you confirm the model year and trim, which in turn confirms whether the car shipped with Bluelink hardware (the embedded modem) and whether the original subscription is still active or transferable. Bluelink trial periods vary — many recent Hyundais include three years of complimentary Bluelink Connected Care from the original in-service date, and that date is tied to the VIN.",
  bluelink3: "Bluelink's stolen-vehicle recovery feature is especially relevant to the 2011-2022 theft-vulnerability discussion. Affected trims that originally lacked an immobilizer often did include Bluelink — so even though the engine could be hot-wired, the car could still be located and immobilized remotely once stolen, assuming the subscription was active.",
  bluelinkCardTitle: "Bluelink + VIN: what to check",
  bluelinkChecklist: [
    "VIN-enrolled subscription has been released by the prior owner",
    "Bluelink hardware is present (look up trim by VIN)",
    "Original in-service date — sets the complimentary-trial clock",
    "Whether stolen-vehicle recovery was active at the time of any past loss",
    "MyHyundai app vehicle profile matches the dashboard VIN exactly",
  ],
  bluelinkCardNote: "Bluelink is VIN-anchored. Sorting it out before purchase saves a frustrating call to the Bluelink call center after the title transfers.",
  h2Lawsuits: "Class-Action Lawsuit History Affecting Hyundai VIN Owners",
  lawsuitsIntro: "Several large class-action settlements over the last decade attach to specific Hyundai VINs — meaning the prior owner of a used Hyundai may be entitled to reimbursement, extended warranty coverage, or a buyback, and a VIN lookup is the way to confirm eligibility.",
  lawsuits: [
    { title: "Theta II engine settlement", body: "The 2020 settlement covering the Theta II 2.0L and 2.4L GDI engines extended powertrain warranty coverage to lifetime for original and subsequent owners on affected VINs, established a reimbursement program for past out-of-pocket repairs, and added a goodwill payment for documented engine failures and trade-ins. Eligibility is determined by VIN against Hyundai's class-action database." },
    { title: "Anti-theft consumer class actions", body: "Multiple consumer class actions tied to the no-immobilizer theft vulnerability have produced settlements covering reimbursement for theft losses, glass and steering-column repairs, insurance premium increases, and the cost of aftermarket steering locks. Hyundai distributed steering wheel locks free of charge through several police departments in affected metros." },
    { title: "Sonata/Elantra hybrid battery extensions", body: "Separate, narrower campaigns have extended hybrid battery coverage and addressed seat-belt pretensioner concerns on specific Sonata and Elantra hybrid trims. Each campaign is VIN-specific — your lookup is the source of truth." },
  ],
  h2Internal: "Related VIN Checks for Hyundai Owners",
  internalIntro: "A VIN lookup is the entry point. These focused checks dig into specific Hyundai-relevant records when something looks off — or when you want to be extra thorough before you buy.",
  internalLinks: [
    { href: "/vin-check/hyundai", label: "Hyundai VIN Check Hub", desc: "Full Hyundai VIN check landing page with model-by-model breakdowns and free decoder." },
    { href: "/vin-decoder", label: "VIN Decoder", desc: "Break down the 17-character VIN into year, make, model, trim, plant, and factory equipment." },
    { href: "/recall-check", label: "Recall Check", desc: "Look up Theta II, ABS, and anti-theft campaign 953 recalls attached to a Hyundai VIN." },
    { href: "/stolen-vehicle-check", label: "Stolen Vehicle Check", desc: "Cross-reference the VIN against NICB and NCIC stolen-vehicle databases." },
    { href: "/salvage-title-check", label: "Salvage Title Check", desc: "See if the Hyundai VIN carries a salvage, junk, or non-repairable title brand." },
    { href: "/accident-history-check", label: "Accident History Check", desc: "Surface reported collisions, damage events, and total-loss claims by VIN." },
    { href: "/flood-check", label: "Flood Damage Check", desc: "Confirm whether the Hyundai was branded flood or water-damaged in any state." },
    { href: "/pricing", label: "Full History Report Pricing", desc: "Upgrade to a complete Hyundai history report when the free lookup raises any flag." },
  ],
  h2Faq: "Hyundai VIN Lookup — Frequently Asked Questions",
  faqIntro: "The questions Hyundai owners and buyers ask most when they want to look up a VIN for the first time.",
  bottomBadge: "Free · Instant · Hyundai-Specific",
  ctaBottomHeading: "Ready to Look Up a Hyundai VIN?",
  ctaBottomSub: "Enter any 17-character Hyundai VIN to run a free check against NMVTIS sources, the NHTSA recall feed, the Theta II class-action list, and the anti-theft software update registry. No account required.",
  ctaBottomNote: "No credit card · No sign-up · Free",
} as const;

const FAQS_EN = [
  { question: "How do I look up a Hyundai VIN?", answer: "Find the 17-character VIN on the lower driver-side corner of the windshield (visible from outside), the driver-side door jamb sticker, the title document, the insurance card, or inside the MyHyundai app under the vehicle profile. Enter it into the free Hyundai VIN lookup form on this page. The tool validates the format (17 characters, no I, O, or Q), then queries NMVTIS for title and salvage records, the NHTSA recall feed for open Hyundai recalls including Theta II and the anti-theft software update, and our decoder for the factory specs. The whole search runs in a few seconds and never asks for an account." },
  { question: "What does a Hyundai VIN reveal?", answer: "A Hyundai VIN lookup returns the decoded year, make, model, trim, engine family (Theta II, Nu, Smartstream, Lambda V6, and so on), transmission, drivetrain, and plant of manufacture — plus title-brand history from all 50 state DMVs through NMVTIS, any open or resolved safety recalls from the NHTSA feed, and the status of the anti-theft software update campaign for 2011-2022 Elantra, Sonata, Tucson, Santa Fe, Veloster, Accent, and Kona models. For Bluelink-equipped cars, the VIN also confirms whether the original connected-services subscription is still attached to the previous owner's MyHyundai account." },
  { question: "Is the Hyundai VIN lookup free?", answer: "Yes. The basic Hyundai VIN lookup on this page is completely free — no sign-up, no credit card, no hidden charges. You enter the 17-character VIN and get the decoded specs, the title-brand summary, the recall list, and the anti-theft software update status right away. Free Hyundai VIN lookups are possible because NMVTIS data and NHTSA recall data are accessible to approved providers, and we surface the consumer-relevant fields without putting a paywall in front of basic safety information. A paid full history report is available if you need every line item, every accident detail, and every odometer reading — but the free lookup is sufficient for most pre-purchase decisions." },
  { question: "Where is the VIN on a Hyundai?", answer: "Every Hyundai prints the VIN in at least four places. The fastest spot is the lower driver-side corner of the windshield — look through the glass from outside the car. The driver-side door jamb sticker is the second-easiest location and is required by federal law on every US-market Hyundai. The VIN is also printed on the title document, the state registration, the insurance ID card, and inside the MyHyundai app under the vehicle profile. If the VIN on the dashboard does not match the VIN on the title or the door jamb, stop — that mismatch is a strong signal that something is wrong with the car's identity." },
  { question: "How do I check Hyundai recalls?", answer: "Enter the Hyundai VIN into the lookup form on this page and the tool queries the NHTSA recall feed directly. You'll see every open recall and every resolved recall attached to that specific VIN — including the major Hyundai campaigns: Theta II engine seizure recalls covering 2011-2019 Sonata and 2013-2019 Santa Fe Sport (among others), the ABS hydraulic module fire-risk recall on certain 2014-2022 Tucson and Santa Fe units, and the anti-theft software update (customer-satisfaction campaign 953) for 2011-2022 no-immobilizer trims. Open recalls stay attached to the VIN until the work is performed at a Hyundai dealer at no charge." },
  { question: "Was my Hyundai part of the Theta II engine class-action?", answer: "The Theta II class-action settlement covers many 2011-2019 Hyundai Sonata, 2013-2019 Santa Fe Sport, 2014-2015 Tucson, and corresponding Kia models equipped with the 2.0L or 2.4L Theta II gasoline direct-injection engine. Eligibility is determined by VIN against Hyundai's class-action database, not by model name alone — some trims with different engines are excluded. The settlement extended powertrain warranty coverage to lifetime for original and subsequent owners on covered VINs, established a reimbursement program for past out-of-pocket engine repairs, added goodwill payments for documented engine failures, and required Hyundai to install a knock sensor detection software system. Run the VIN through our lookup to see the current recall status, and check Hyundai's class-action portal for settlement-specific eligibility." },
  { question: "Is my Hyundai vulnerable to the no-immobilizer theft issue?", answer: "If your Hyundai is a 2011-2022 Elantra, Sonata, Tucson, Santa Fe (or Santa Fe Sport), Veloster, Accent, or Kona — and it uses a traditional turn-key ignition rather than push-button start — it likely falls inside the no-immobilizer group made famous by the Kia Boys TikTok trend. Higher trims with push-button start were not affected because the key fob must be authenticated before the engine will start. The fastest way to confirm is to run the VIN through this lookup: the report shows whether the free anti-theft software update (customer-satisfaction campaign 953) has been applied to that specific car. If it hasn't, any Hyundai dealer will install it free of charge in under an hour. Insurance availability and resale value on affected trims often improve materially once the update is logged against the VIN." },
];

export default function HyundaiVinLookupBody() {
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {c.reveals.map((m, i) => {
              const Icon = REVEAL_ICONS[i];
              return (
                <div key={m.title} className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5 sm:p-6">
                  <div className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-base sm:text-lg font-headline font-extrabold text-primary mb-1.5">{m.title}</h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">{m.body}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Decode}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl leading-relaxed">{c.decodeIntro}</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {c.wmis.map((w, i) => {
                const Icon = WMI_ICONS[i];
                return (
                  <div key={w.code} className="rounded-2xl border border-outline-variant bg-surface p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon className="w-4 h-4 text-primary" />
                      </div>
                      <code className="font-mono font-bold text-primary text-base">{w.code}</code>
                    </div>
                    <h3 className="text-sm font-headline font-extrabold text-on-surface mb-1">{w.title}</h3>
                    <p className="text-xs text-on-surface-variant leading-relaxed">{w.body}</p>
                  </div>
                );
              })}
            </div>
            <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
              <div className="flex items-center gap-2 mb-3">
                <Hash className="w-5 h-5 text-primary" />
                <h3 className="font-headline font-extrabold text-primary">{c.cardWmiTitle}</h3>
              </div>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                {c.decodeOutroPre}
                <strong className="text-on-surface">{c.decodeOutroBold}</strong>
                {c.decodeOutroSuffix}
              </p>
              <p className="mt-4 text-xs text-on-surface-variant leading-relaxed">{c.cardWmiNote}</p>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Where}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">{c.whereIntro}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {c.whereLocations.map((s, i) => {
              const Icon = VIN_LOC_ICONS[i];
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
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Theft}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-5 max-w-3xl leading-relaxed">{c.theftIntro}</p>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">
            {c.theft2Pre}
            <strong className="text-on-surface">{c.theft2Bold}</strong>
            {c.theft2Suffix}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {c.theftModels.map((item, i) => {
              const Icon = THEFT_ICONS[i];
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
                <strong className="text-on-surface">{c.theftCalloutBoldLead}</strong>
                {c.theftCalloutMid}
                <Link href="/stolen-vehicle-check" className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.theftCalloutLink1}</Link>
                {c.theftCalloutMid2}
              </p>
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
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">{c.h2Bluelink}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              <p>
                {c.bluelink1Pre}
                <strong className="text-on-surface">{c.bluelink1Bold}</strong>
                {c.bluelink1Suffix}
              </p>
              <p>{c.bluelink2}</p>
              <p>{c.bluelink3}</p>
            </div>
            <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
              <div className="flex items-center gap-2 mb-3">
                <Smartphone className="w-5 h-5 text-primary" />
                <h3 className="font-headline font-extrabold text-primary">{c.bluelinkCardTitle}</h3>
              </div>
              <ul className="space-y-2 text-sm text-on-surface">
                {c.bluelinkChecklist.map((tip) => (
                  <li key={tip} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" strokeWidth={3} />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-on-surface-variant leading-relaxed">{c.bluelinkCardNote}</p>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Lawsuits}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">{c.lawsuitsIntro}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {c.lawsuits.map((item) => (
              <div key={item.title} className="rounded-2xl border border-outline-variant bg-surface p-5">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                  <Scale className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-base font-headline font-extrabold text-primary mb-1">{item.title}</h3>
                <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">{item.body}</p>
              </div>
            ))}
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

        <RelatedChecks exclude="/hyundai-vin-lookup" />
      </div>
    </article>
  );
}

export { FAQS_EN };
