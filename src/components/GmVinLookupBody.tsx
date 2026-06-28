/**
 * Body for /gm-vin-lookup — English-only page targeting the
 * "gm vin lookup" keyword cluster (~3.2K US monthly searches:
 * "gm vin lookup" 1.9K + "gm vin number lookup" 1.3K).
 * Covers all GM brands: Chevrolet, GMC, Cadillac, Buick, plus
 * historical Pontiac, Oldsmobile, Saturn, and Hummer.
 * Mirrors the visual structure of VinNumberLookupBody (flat COPY, no props).
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

const HOW_ICONS = [Search, Database, FileText] as const;
const BRAND_ICONS = [Car, Wrench, Sparkles, Shield, Hash, Cpu] as const;
const WMI_ICONS = [Hash, Factory, Cpu] as const;
const RECALL_ICONS = [AlertTriangle, Shield, Wrench] as const;

const COPY = {
  home: "Home",
  crumb: "GM VIN Lookup",
  badge: "Free GM VIN Lookup   ·   All GM Brands   ·   Build Sheet + Recalls",
  h1Lead: "GM VIN Lookup — ",
  h1Accent: "Free Decoder for Chevy, GMC, Cadillac, and Buick.",
  intro: "Every General Motors vehicle leaves the factory with a 17-character VIN that encodes its brand, model, trim, engine, plant, and the factory options bundled onto the SPID build-sheet label. A GM VIN lookup turns that string into a complete portrait of the car — RPO codes, recall history, title brands, and assembly facility. Enter any Chevrolet, GMC, Cadillac, Buick, Pontiac, Oldsmobile, Saturn, or Hummer VIN below and we'll run a free GM VIN number lookup against NMVTIS, the NHTSA recall feed, and our decoded-options index in seconds. No sign-up, no card, no catch.",
  formHeading: "Free GM VIN Lookup — Decode Any Chevy, GMC, Cadillac, or Buick VIN",
  formSub: "Enter the GM VIN and we'll surface RPO codes, build-sheet specs, open recalls, title brands, and salvage records — instantly.",
  formNote: "Free · No sign-up · Instant result",
  trustStats: [
    { icon: Database, value: "All GM", label: "brands covered" },
    { icon: Wrench, value: "RPO codes", label: "decoded" },
    { icon: Shield, value: "Open recalls", label: "& bulletins" },
    { icon: BadgeCheck, value: "Free", label: "no sign-up" },
  ],
  h2How: "How a GM VIN Lookup Works",
  howIntro: "A GM VIN lookup is one of the most data-rich searches you can run on any vehicle, because General Motors has decoded VIN patterns going back decades and ties almost every factory option to an RPO code printed on the SPID label. Three steps from VIN to complete GM build sheet.",
  howSteps: [
    { tag: "Step 1", title: "Enter the GM VIN", body: "Type or paste the 17-character VIN from the windshield, the driver-side door jamb sticker, the title, or the SPID label in the glove box or trunk. The lookup tool validates that it is exactly 17 characters and excludes the disallowed letters I, O, and Q before it runs." },
    { tag: "Step 2", title: "We decode and query", body: "Your GM VIN number lookup decodes the WMI to confirm the brand (1G1 Chevy passenger, 1GC Chevy truck, 1GT GMC truck, 1G6 Cadillac, 1G4 Buick), reads the year and plant codes, then queries NMVTIS for title history and the NHTSA feed for any open recalls on the chassis." },
    { tag: "Step 3", title: "Read the GM result", body: "You'll see the decoded year, brand, model, trim, engine, transmission, and drivetrain, plus the assembly plant, factory RPO options where available, open safety recalls, and any title brands. Use it to negotiate, walk away, or buy a GM with confidence." },
  ],
  h2Reveal: "What a GM VIN Reveals",
  revealIntro: "A General Motors VIN is unusually transparent. GM encodes more information into the 17 characters than most manufacturers, and the SPID label adds another layer of RPO codes describing every factory option. Here is what a complete GM VIN lookup surfaces.",
  reveal1Pre: "First, the decoder reads the 17 characters. The first three identify the ",
  reveal1Bold1: "world manufacturer",
  reveal1Mid: " (the 1G prefix is GM's North American assignment), the fourth through eighth describe the vehicle attributes including ",
  reveal1Bold2: "body, engine, and restraint system",
  reveal1Mid2: ", the tenth digit encodes the ",
  reveal1Bold3: "model year",
  reveal1Suffix: ", the eleventh identifies the assembly plant, and the final six form the unique sequential serial.",
  reveal2Pre: "Second, the lookup ties the VIN to ",
  reveal2Bold: "RPO codes — Regular Production Options",
  reveal2Suffix: ". GM uses RPO codes for every factory option, from engine families (LS, LT, LFX) to trim packages (Z71 off-road, SS performance, Denali luxury) to interior colors. The SPID label printed on a sticker inside the vehicle lists every RPO code that was installed at the factory.",
  reveal3: "Third, the lookup queries the live NHTSA and GM recall feeds. Recalls stay attached to the VIN until the work is completed at a GM dealer — and many used Chevy, GMC, Cadillac, and Buick vehicles carry recalls the previous owner never resolved, especially for items like ignition switches, airbags, and brake systems.",
  revealCardTitle: "What you get from one GM VIN",
  revealRows: [
    { label: "Brand & model", value: "Chevy · GMC · Caddy" },
    { label: "RPO codes", value: "Engine · Trim · Pkg" },
    { label: "Recalls", value: "NHTSA + GM feed" },
  ],
  revealCardNote: "One 17-character GM VIN, three layers of insight. The lookup tool runs in seconds and never asks for an account.",
  h2Brands: "Which Brands the GM VIN Lookup Covers",
  brandsIntro: "General Motors has owned and built a remarkable family of brands. The GM VIN lookup recognizes WMI prefixes and model codes for every nameplate the company has sold in North America — current divisions and historical ones alike.",
  brands: [
    { title: "Chevrolet", body: "GM's volume brand — Silverado, Tahoe, Suburban, Equinox, Traverse, Malibu, Camaro, Corvette, Colorado, and Trax. WMI prefixes include 1G1 (passenger cars), 1GC (light trucks), 1GN (SUVs), and 3GC (Mexico-built trucks). The largest dataset in any GM VIN lookup." },
    { title: "GMC", body: "GM's professional-grade truck and SUV brand — Sierra, Yukon, Acadia, Terrain, Canyon, and Hummer EV. WMI 1GT identifies GMC trucks; 1GK identifies GMC SUVs. GMC shares platforms with Chevrolet but uses distinct RPO trim codes like SLT, AT4, and Denali." },
    { title: "Cadillac", body: "GM's luxury brand — Escalade, CT4, CT5, XT4, XT5, XT6, and the Lyriq EV. WMI 1G6 identifies Cadillac passenger vehicles; 1GY identifies Cadillac SUVs. The VIN decoder returns trim levels like Luxury, Premium Luxury, and V-Series Blackwing." },
    { title: "Buick", body: "GM's near-luxury brand — Encore GX, Envision, Enclave, and Envista. WMI 1G4 identifies Buick passenger and SUV models. The lookup returns trim packages like Preferred, Essence, Avenir, and ST." },
    { title: "Pontiac, Oldsmobile, Saturn", body: "GM's discontinued brands remain fully supported in the VIN lookup for any model-year 1981 or newer vehicle. Pontiac (1G2), Oldsmobile (1G3), and Saturn (1G8) WMIs all decode correctly, returning the original factory specs along with title history and any open recalls still attached." },
    { title: "Hummer (original) and Hummer EV", body: "The original Hummer H1, H2, and H3 trucks (5GR, 5GT) decode through the GM VIN lookup, as does the modern GMC Hummer EV pickup and SUV. Useful when shopping a vintage H2 or verifying the spec of a current-gen electric Hummer." },
  ],
  h2Wmi: "Decoding a GM VIN — WMI Patterns and Plant Codes",
  wmiIntro: "The first three characters of any GM VIN — the World Manufacturer Identifier — tell you which brand built the vehicle and where. The eleventh character tells you which assembly plant. A few of the most common GM WMI patterns and what they mean.",
  wmis: [
    { title: "1G1, 1GC, 1GN — Chevrolet", body: "1G1 covers Chevrolet passenger cars built in the US (Malibu, Camaro, Corvette, Cruze, Spark). 1GC covers Chevrolet light-duty trucks (Silverado, Colorado, Avalanche). 1GN covers Chevrolet SUVs (Tahoe, Suburban, Equinox, Traverse). Variants like 2G1 and 3G1 indicate Canadian and Mexican assembly." },
    { title: "1GT, 1GK, 1GD — GMC", body: "1GT covers GMC trucks (Sierra 1500/2500/3500, Canyon). 1GK covers GMC SUVs (Yukon, Yukon XL, Acadia, Terrain). 1GD covers heavy-duty GMC trucks. The same RPO codes that distinguish a Silverado from a Sierra also appear in the VIN's vehicle-attribute section." },
    { title: "1G6, 1G4 — Cadillac and Buick", body: "1G6 covers Cadillac passenger cars and sedans; 1GY covers Cadillac SUVs (Escalade, XT4, XT5, XT6). 1G4 covers Buick across passenger and SUV models. Plant codes in position 11 identify the specific assembly facility — for example, plant code U is Hamtramck, J is Lansing Grand River, and 1 is Bowling Green for the Corvette." },
  ],
  wmiNoteLead: "Plant codes matter for collectors.",
  wmiNoteRest: " A Bowling Green-built Corvette, a Hamtramck Cadillac, or an Oshawa-built Silverado all carry distinct production histories — and the eleventh digit of the GM VIN is the fastest way to confirm where a specific car was assembled. Our lookup decodes plant codes for every GM facility from 1981 forward.",
  h2BuildSheet: "How the GM Build Sheet (SPID Label) Ties Into the VIN",
  buildSheet1Pre: "The GM ",
  buildSheet1Bold: "Service Parts Identification (SPID) label",
  buildSheet1Suffix: " is a printed sticker affixed inside every GM vehicle — usually in the glove box, the trunk, or the spare tire well — that lists every Regular Production Option (RPO) code installed at the factory. The SPID label is essentially the original GM build sheet, and it pairs one-to-one with the VIN.",
  buildSheet2Pre: "When you run a GM VIN lookup and follow it with a ",
  buildSheet2Link: "GM build sheet lookup",
  buildSheet2Suffix: ", you can verify that the trim, package, paint code, interior color, transmission, axle ratio, and accessory equipment on the vehicle today match what GM installed at the factory. That matters for restoration projects, dealer trade-ins, and any used-car negotiation where the seller claims a high-value option package.",
  buildSheet3: "Common RPO codes you might see decoded from a GM VIN's SPID label include LT1 or LS3 (engine families), Z71 (off-road suspension package), MYC (transmission), G80 (locking rear differential), and U2K (XM radio). The full code list runs into thousands of entries across the GM brand portfolio.",
  buildSheetCardTitle: "GM build sheet pairs with the VIN",
  buildSheetList: [
    "VIN encodes brand, model, engine family, plant, year",
    "SPID label encodes every factory RPO option installed",
    "Together they form the complete GM factory build record",
    "Order a build sheet to verify trim and package claims",
  ],
  buildSheetCardCta: "Run the VIN lookup first, then pull the build sheet:",
  h2Find: "Where to Find the VIN on a GM Vehicle",
  find1Pre: "Like every modern car, a Chevrolet, GMC, Cadillac, or Buick prints its 17-character VIN in ",
  find1Bold: "several federally required locations",
  find1Suffix: ". Any one of them is enough to run a free GM VIN number lookup — but cross-checking them is the easiest way to confirm the car's identity matches the paperwork.",
  find2: "The fastest spot is the lower corner of the windshield on the driver's side — visible from outside. The driver-side door jamb sticker is the second-easiest and includes the VIN along with tire pressure and gross vehicle weight rating. On most GM vehicles, the SPID label inside the glove box also references the VIN. The title document, the registration, and the insurance card all print the VIN as well.",
  find3: "If the VIN on the windshield does not match the VIN on the title, the door jamb, or the SPID label, stop. That mismatch is a strong signal that something is wrong with the car's identity — exactly the kind of thing a GM VIN lookup is designed to catch before money changes hands.",
  findCardTitle: "Five places to find a GM VIN",
  findList: [
    "Lower driver-side windshield (visible from outside)",
    "Driver-side door jamb sticker (federal requirement)",
    "SPID label in glove box, trunk, or spare-tire well",
    "Vehicle title and state registration",
    "Insurance ID card",
  ],
  findCardNote: "Found it? Drop the GM VIN into the form above and decode it free in seconds.",
  midCtaHeading: "Lookup This Specific GM VIN Right Now",
  midCtaSub: "You already have a Chevy, GMC, Cadillac, or Buick in mind. Run the VIN against NMVTIS, the GM recall feed, and our RPO decoder — free, in seconds. No sign-up.",
  h2Recalls: "Common GM Recalls You Should Check by VIN",
  recallsIntro: "General Motors has a long and well-documented recall history, including some of the largest safety campaigns in modern automotive history. A GM VIN lookup checks the live NHTSA and GM recall feeds so you see open safety recalls tied to your specific Chevy, GMC, Cadillac, or Buick.",
  recalls: [
    { title: "Ignition switch and electrical recalls", body: "The 2014 ignition-switch recall covered millions of Chevy Cobalt, Saturn Ion, and other GM models where a faulty switch could cut engine power and disable airbags. Even more than a decade later, used vehicles still surface with unresolved campaigns from this era — exactly what the VIN lookup is designed to surface." },
    { title: "LS and LT engine campaigns", body: "GM's small-block V8 family — the LS series in older trucks and Camaros, and the LT series in modern Silverado, Tahoe, and Corvette — has carried multiple recalls and service campaigns over the years for issues like oil-pump pickup tubes, lifter failures on AFM/DFM equipped engines, and timing components. The VIN lookup surfaces any open chassis recall covering these engine families." },
    { title: "Brake system and ABS recalls", body: "GMC, Chevrolet, Cadillac, and Buick have had recalls covering brake booster vacuum pumps, ABS module software, and electronic stability control. These affect SUVs and pickups in particular — running a GM VIN lookup before you buy a used Tahoe, Yukon, Escalade, or Silverado catches these before they catch you." },
  ],
  recallsNoteBoldLead: "Buying a used GM?",
  recallsNoteMid1: " Pair this GM VIN lookup with a focused ",
  recallsNoteLink1: "recall check",
  recallsNoteMid2: " and a ",
  recallsNoteLink2: "salvage title check",
  recallsNoteSuffix: " for a complete picture before you put money down on a Chevy, GMC, Cadillac, or Buick.",
  h2Tsb: "GM Service Bulletins and the VIN",
  tsb1Pre: "Beyond formal NHTSA recalls, General Motors issues ",
  tsb1Bold: "Technical Service Bulletins (TSBs)",
  tsb1Suffix: " for known issues that don't rise to the level of a safety recall but that GM technicians use to diagnose and repair recurring problems. TSBs are VIN-scoped — a bulletin may apply only to vehicles built between specific date ranges or only to certain engine families.",
  tsb2: "A complete GM VIN lookup paired with a dealer service inquiry reveals not just open recalls but also TSBs that may explain symptoms a buyer is noticing — transmission shift quality on certain 8L90 transmissions, intermittent display problems on certain MyLink units, or AFM lifter ticking on LS-based V8s. Knowing the TSB list before you buy is leverage during negotiation.",
  tsb3: "While our free VIN lookup focuses on safety recalls (which are the legally mandated public record), the decoded year, engine RPO, and build date from your GM VIN lookup are exactly what a dealer needs to pull TSBs that apply to your specific vehicle.",
  tsbCardTitle: "Use the VIN with your GM dealer",
  tsbList: [
    "Confirm year and engine RPO from the VIN lookup",
    "Print the SPID/build-sheet RPO list for the dealer",
    "Ask service to pull any open TSBs by VIN",
    "Cross-reference TSBs against any symptoms you've noticed",
  ],
  tsbCardCta: "Decode the VIN first, then walk into the dealer informed:",
  h2Internal: "Related GM and VIN Checks That Build On Your Lookup",
  internalIntro: "A GM VIN lookup is the entry point. These focused checks dig into specific records — brand-specific decoders, build sheets, and history reports — when you need more depth.",
  internalLinks: [
    { href: "/gm-build-sheet", label: "GM Build Sheet Lookup", desc: "Pull the SPID/RPO option list — engine, trim, axle, interior — tied to any GM VIN." },
    { href: "/vin-check/chevrolet", label: "Chevrolet VIN Check", desc: "Full Chevy-focused VIN report covering Silverado, Tahoe, Camaro, Corvette, and the rest of the lineup." },
    { href: "/vin-check/gmc", label: "GMC VIN Check", desc: "GMC-specific decoder and history report for Sierra, Yukon, Acadia, Terrain, and Canyon." },
    { href: "/vin-check/cadillac", label: "Cadillac VIN Check", desc: "Decode Cadillac trims like Luxury, Premium Luxury, and V-Series Blackwing from the VIN." },
    { href: "/vin-check/buick", label: "Buick VIN Check", desc: "Buick-specific decoder and history report for Encore, Envision, Enclave, and Envista." },
    { href: "/vin-decoder", label: "VIN Decoder", desc: "Generic 17-character decoder that works for any make — useful for cross-shopping non-GM vehicles." },
    { href: "/recall-check", label: "Recall Check", desc: "Look up any open NHTSA safety recall attached to a VIN, GM or otherwise." },
    { href: "/salvage-title-check", label: "Salvage Title Check", desc: "Confirm whether a GM vehicle carries a salvage, junk, or non-repairable title brand." },
  ],
  h2Faq: "GM VIN Lookup — Frequently Asked Questions",
  faqIntro: "The questions buyers and owners ask most when they want to lookup a GM VIN — Chevy, GMC, Cadillac, or Buick — for the first time.",
  bottomBadge: "Free · Instant · All GM Brands",
  ctaBottomHeading: "Ready to Lookup a GM VIN?",
  ctaBottomSub: "Enter any 17-character GM VIN to run a free GM VIN number lookup against NMVTIS, the NHTSA recall feed, and our RPO decoder. Chevy, GMC, Cadillac, Buick, and historical brands all supported. No account required.",
  ctaBottomNote: "No credit card · No sign-up · Free",
} as const;

const FAQS_EN = [
  { question: "How do I look up a GM VIN?", answer: "To look up a GM VIN, find the 17-character Vehicle Identification Number on the lower driver-side corner of the windshield, the driver-side door jamb sticker, the SPID label inside the glove box or trunk, or on the title document. Enter the VIN into the free GM VIN lookup form on this page, and the tool will decode the brand, model, trim, engine, year, and assembly plant, then query NMVTIS for title history and the NHTSA feed for any open safety recalls attached to that specific Chevrolet, GMC, Cadillac, or Buick. Results return in seconds, with no sign-up required." },
  { question: "Does the GM VIN lookup cover Chevrolet and GMC?", answer: "Yes. The GM VIN lookup covers every General Motors brand sold in North America, both current and historical. That includes Chevrolet (WMI 1G1, 1GC, 1GN), GMC (1GT, 1GK), Cadillac (1G6, 1GY), Buick (1G4), and all the discontinued GM brands like Pontiac (1G2), Oldsmobile (1G3), Saturn (1G8), and the original Hummer H1, H2, and H3 (5GR, 5GT). It also covers the modern GMC Hummer EV. Any 17-character VIN issued for a model-year 1981 or newer GM vehicle decodes correctly through the lookup, including Canadian-built and Mexican-built GM models with 2G or 3G prefixes." },
  { question: "Is the GM VIN lookup free?", answer: "Yes. Our basic GM VIN lookup is free, with no sign-up, no credit card, and no hidden charges. You enter the 17-character GM VIN and we return the decoded specs (year, brand, model, trim, engine, plant), a title-brand summary from NMVTIS, and any open safety recalls from the NHTSA feed right away. Free GM VIN lookups work because NMVTIS data and NHTSA recall data are accessible through approved providers — we surface the consumer-relevant fields without putting a paywall in front of basic safety information. A paid full history report is available if you want every line item, every date, and a downloadable record, but the free GM VIN number lookup is sufficient for most pre-purchase decisions on a used Chevy, GMC, Cadillac, or Buick." },
  { question: "Where is the VIN on a GM vehicle?", answer: "GM vehicles print the 17-character VIN in at least four federally required locations. First, the lower driver-side corner of the windshield, visible from outside the car looking through the glass. Second, the driver-side door jamb sticker, which also lists tire pressures and gross vehicle weight. Third, the SPID (Service Parts Identification) label inside the glove box or trunk, which lists the VIN along with every factory RPO option code installed at build. Fourth, the vehicle title and registration. Some GM models also stamp the VIN onto the engine block and the dashboard frame for theft-deterrent purposes. Any one of these is enough to run the lookup — but cross-checking them is the fastest way to confirm the car's identity matches the paperwork." },
  { question: "How do I check GM recalls by VIN?", answer: "To check GM recalls by VIN, run a free GM VIN lookup using the form on this page, or visit /recall-check for a recall-specific tool. The lookup queries the live NHTSA recall feed and surfaces any open safety recalls attached to your specific Chevrolet, GMC, Cadillac, Buick, or historical-brand GM vehicle. Open recalls stay attached to the VIN until the work is completed at an authorized GM dealer — and that work is free regardless of how old the vehicle is. Common GM recall categories include the famous ignition-switch campaigns, LS/LT engine service campaigns for AFM/DFM lifters and oil-pump pickup tubes, brake booster vacuum-pump recalls, and ABS module software updates on SUVs and pickups." },
  { question: "How do I get a GM build sheet from the VIN?", answer: "A GM build sheet — what GM calls the SPID (Service Parts Identification) label — lists every factory RPO option code installed on the vehicle when it left the assembly plant. To get a GM build sheet from the VIN, run our GM VIN lookup first to decode the brand, year, engine, and plant, then follow up with the dedicated GM build sheet lookup at /gm-build-sheet, which returns the RPO option list for the specific VIN. You can also find the physical SPID label inside the glove box, the trunk, the spare-tire well, or under the rear seat on most GM vehicles. The build sheet is essential for confirming trim packages (Z71, SS, Denali, V-Series, Avenir), engine family (LS, LT, LFX, LBZ), transmission code, axle ratio, paint code, and interior color — all of which appear as RPO codes on the SPID label." },
  { question: "What's the difference between a GM VIN check and a GM VIN lookup?", answer: "The terms are often used interchangeably, but there is a subtle distinction. A GM VIN lookup typically refers to the free, fast decode of a 17-character VIN — it returns the year, brand, model, trim, engine, plant, and any open safety recalls in seconds, drawing on NMVTIS, the NHTSA feed, and the VIN's encoded structure itself. A GM VIN check is a broader term that usually refers to a paid, comprehensive history report including accident records, prior owners, mileage history, lien records, and full title-brand details. Both start with the same 17 characters, but the lookup is the entry point and the check is the deep-dive. For most pre-purchase decisions on a used Chevrolet, GMC, Cadillac, or Buick, a free GM VIN lookup is enough to flag any obvious red flags — and the paid check is worth ordering if the lookup surfaces any brand, recall, or salvage record that needs further investigation." },
];

export default function GmVinLookupBody() {
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
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Reveal}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl leading-relaxed">{c.revealIntro}</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              <p>
                {c.reveal1Pre}
                <strong className="text-on-surface">{c.reveal1Bold1}</strong>
                {c.reveal1Mid}
                <strong className="text-on-surface">{c.reveal1Bold2}</strong>
                {c.reveal1Mid2}
                <strong className="text-on-surface">{c.reveal1Bold3}</strong>
                {c.reveal1Suffix}
              </p>
              <p>
                {c.reveal2Pre}
                <strong className="text-on-surface">{c.reveal2Bold}</strong>
                {c.reveal2Suffix}
              </p>
              <p>{c.reveal3}</p>
            </div>
            <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
              <div className="flex items-center gap-2 mb-3">
                <Hash className="w-5 h-5 text-primary" />
                <h3 className="font-headline font-extrabold text-primary">{c.revealCardTitle}</h3>
              </div>
              <ul className="space-y-3 text-sm text-on-surface">
                {c.revealRows.map((r) => (
                  <li key={r.label} className="flex items-center justify-between gap-3 rounded-lg bg-white px-3.5 py-2.5 border border-outline-variant/60">
                    <span className="text-on-surface-variant">{r.label}</span>
                    <code className="font-mono font-bold text-primary">{r.value}</code>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-on-surface-variant leading-relaxed">{c.revealCardNote}</p>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Brands}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">{c.brandsIntro}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {c.brands.map((s, i) => {
              const Icon = BRAND_ICONS[i];
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
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Wmi}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">{c.wmiIntro}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {c.wmis.map((item, i) => {
              const Icon = WMI_ICONS[i];
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
              <Factory className="w-5 h-5 text-on-secondary-container flex-shrink-0 mt-0.5" />
              <p className="text-sm text-on-surface leading-relaxed">
                <strong className="text-on-surface">{c.wmiNoteLead}</strong>
                {c.wmiNoteRest}
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">{c.h2BuildSheet}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              <p>
                {c.buildSheet1Pre}
                <strong className="text-on-surface">{c.buildSheet1Bold}</strong>
                {c.buildSheet1Suffix}
              </p>
              <p>
                {c.buildSheet2Pre}
                <Link href="/gm-build-sheet" className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.buildSheet2Link}</Link>
                {c.buildSheet2Suffix}
              </p>
              <p>{c.buildSheet3}</p>
            </div>
            <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
              <div className="flex items-center gap-2 mb-3">
                <ClipboardCheck className="w-5 h-5 text-primary" />
                <h3 className="font-headline font-extrabold text-primary">{c.buildSheetCardTitle}</h3>
              </div>
              <ul className="space-y-2 text-sm text-on-surface">
                {c.buildSheetList.map((tip) => (
                  <li key={tip} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" strokeWidth={3} />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 rounded-xl bg-white p-4 border border-outline-variant">
                <p className="text-xs font-bold text-on-surface mb-2">{c.buildSheetCardCta}</p>
                <VinSearchForm size="sm" />
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">{c.h2Find}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              <p>
                {c.find1Pre}
                <strong className="text-on-surface">{c.find1Bold}</strong>
                {c.find1Suffix}
              </p>
              <p>{c.find2}</p>
              <p>{c.find3}</p>
            </div>
            <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-5 h-5 text-primary" />
                <h3 className="font-headline font-extrabold text-primary">{c.findCardTitle}</h3>
              </div>
              <ul className="space-y-2 text-sm text-on-surface">
                {c.findList.map((state) => (
                  <li key={state} className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>{state}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-on-surface-variant leading-relaxed">{c.findCardNote}</p>
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
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">{c.h2Tsb}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              <p>
                {c.tsb1Pre}
                <strong className="text-on-surface">{c.tsb1Bold}</strong>
                {c.tsb1Suffix}
              </p>
              <p>{c.tsb2}</p>
              <p>{c.tsb3}</p>
            </div>
            <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
              <div className="flex items-center gap-2 mb-3">
                <Gauge className="w-5 h-5 text-primary" />
                <h3 className="font-headline font-extrabold text-primary">{c.tsbCardTitle}</h3>
              </div>
              <ul className="space-y-2 text-sm text-on-surface">
                {c.tsbList.map((tip) => (
                  <li key={tip} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" strokeWidth={3} />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 rounded-xl bg-white p-4 border border-outline-variant">
                <p className="text-xs font-bold text-on-surface mb-2">{c.tsbCardCta}</p>
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

        <RelatedChecks exclude="/gm-vin-lookup" />
      </div>
    </article>
  );
}

export { FAQS_EN };
