/**
 * Body for /atv-vin-lookup — English-only hub page targeting the
 * "atv vin lookup" keyword cluster (~1.6K US monthly searches).
 * Mirrors the visual structure of VinNumberLookupBody but flattens COPY (no locales).
 */

import Link from "@/components/LocaleLink";
import {
  Check, Shield, Search, FileText, Database,
  ChevronRight, Lock, Zap, BadgeCheck, Sparkles, Hash, Wrench,
  Gauge, ClipboardCheck, AlertTriangle, MapPin, Cpu, Bike,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";

const REVEAL_ICONS = [Bike, Hash, Cpu, Wrench, Gauge, AlertTriangle] as const;
const BRAND_ICONS = [Bike, Bike, Bike, Bike, Bike, Bike] as const;
const SALVAGE_ICONS = [AlertTriangle, Shield, Wrench] as const;

const COPY = {
  home: "Home",
  crumb: "ATV VIN Lookup",
  badge: "Free ATV VIN Lookup   ·   Stolen Check + Decoded Specs",
  h1Lead: "ATV VIN Lookup — ",
  h1Accent: "Free Stolen Check and Decoded Specs for Any Quad or UTV.",
  intro: "All-terrain vehicles are stolen more often than almost any other type of motor vehicle in America — easy to load on a trailer, hard to trace through paperwork, and rarely well-documented at the state level. A free ATV VIN lookup is the fastest way to confirm what you are actually buying before money changes hands. Enter a VIN below and we will decode the manufacturer, model year, engine, and drivetrain while checking stolen-vehicle databases and any title or registration records that exist. Same tool works for UTV and side-by-side VINs.",
  formHeading: "Free ATV VIN Lookup — Decode Any 17-Character ATV or UTV VIN",
  formSub: "Enter the VIN from your quad, sport ATV, or side-by-side and we will surface manufacturer, year, displacement, stolen status, and any available title records — instantly.",
  formNote: "Free · No sign-up · Works for ATVs and UTVs",
  trustStats: [
    { icon: Database, value: "Stolen", label: "vehicle databases" },
    { icon: Bike, value: "ATV + UTV", label: "side-by-side coverage" },
    { icon: Shield, value: "Title brand", label: "where available" },
    { icon: BadgeCheck, value: "Free", label: "no sign-up" },
  ],
  h2Reveals: "What an ATV VIN Lookup Reveals",
  revealsIntro: "An ATV VIN carries the same factory fingerprint a car VIN does — but the data behind off-road titling is messier, and a real lookup has to handle both sides. Here is what comes back when you run an ATV VIN through our tool.",
  reveals: [
    { title: "Manufacturer", body: "The first three characters of the VIN identify the world manufacturer — Polaris, Yamaha, Honda, Kawasaki, Can-Am, Arctic Cat, Suzuki, or one of the smaller specialty builders. Confirming the manufacturer through the VIN catches the rare case where a stolen frame has been re-badged." },
    { title: "Model year", body: "The tenth character of a 17-character ATV VIN encodes the model year. That tells you whether the seller is being honest about the bike's age — a critical question because pre-2010 ATVs are dramatically cheaper to insure and register in many states." },
    { title: "Model and trim", body: "The VIN identifies the specific model line and trim — Polaris Sportsman 570 vs. Sportsman 850, Yamaha Grizzly 700 vs. Kodiak 450, Honda Rancher vs. Foreman vs. Rubicon. That separates the entry-level sport quads from the heavy utility machines at a glance." },
    { title: "Engine displacement", body: "Displacement is encoded in the vehicle-attribute section of the VIN. That is how you confirm the seller's '700cc' claim actually matches the factory spec — a common discrepancy on private-party listings." },
    { title: "Drivetrain (2WD vs. 4WD)", body: "The VIN encodes drivetrain configuration. A two-wheel-drive quad listed as four-wheel-drive is a red flag — and the VIN is the fastest way to catch the discrepancy before you ride it." },
    { title: "Stolen status", body: "Our ATV VIN lookup queries available stolen-vehicle databases including NCIC-sourced feeds where accessible. ATVs are the #1 most-stolen off-road vehicle in the United States, so this is the single most important field on the report." },
  ],
  h2Decoding: "Decoding an ATV VIN — Post-2006 vs. Pre-2006",
  decodingIntro: "ATVs follow the federal 17-character VIN standard for the post-2006 model years on most major brands. Older quads — and some small or niche brands even today — use shorter serial numbers stamped directly on the frame. Here is what to expect for each.",
  decoding1Pre: "Modern ATVs from the major brands use a full ",
  decoding1Bold: "17-character VIN",
  decoding1Suffix: " that follows the same structure as a car VIN. The first three characters are the World Manufacturer Identifier (WMI): Polaris uses 1ZE or 4XA depending on the plant, Yamaha uses 5Y4, Honda uses 478, Kawasaki uses JKB, Can-Am uses 3JB, and Arctic Cat uses 4UF. The next six characters describe the model line and equipment, the tenth character is the model year, the eleventh is the plant code, and the last six form the unique serial number.",
  decoding2Pre: "Pre-2006 ATVs — and some smaller or imported brands even now — often carry an ",
  decoding2Bold: "11 to 13-character serial number",
  decoding2Suffix: " stamped directly into the frame rail near the steering column. These older serials do not follow a federal standard and are not always recognized by automated VIN decoders. For those bikes, our lookup will return decoded specs where available and otherwise flag the VIN as a pre-standard serial that needs manual verification through the manufacturer.",
  decoding3: "Always physically read the VIN off the frame stamp itself, not just off the title or the manufacturer's sticker. Stickers fall off, get replaced, and get swapped — the stamped frame VIN is the one that matters. If the title VIN and the frame VIN do not match, walk away.",
  brandWmiTitle: "Major ATV brand WMIs (first 3 VIN chars)",
  brandWmiRows: [
    { label: "Polaris", value: "1ZE or 4XA" },
    { label: "Yamaha", value: "5Y4" },
    { label: "Honda", value: "478" },
    { label: "Kawasaki", value: "JKB" },
    { label: "Can-Am (BRP)", value: "3JB" },
    { label: "Arctic Cat", value: "4UF" },
  ],
  brandWmiNote: "If the first three characters of your ATV VIN do not match the brand printed on the bodywork, something is wrong. The VIN does not lie — the bodywork can.",
  h2Where: "Where to Find an ATV VIN",
  where1Pre: "Most buyers get stuck before they even start an ATV VIN lookup because they cannot find the VIN. Unlike cars, ATVs do not have a windshield sticker — but every modern quad and side-by-side stamps the VIN in ",
  where1Bold: "at least three places",
  where1Suffix: ", and you should physically confirm two of them match before you buy.",
  where2: "The primary location is the frame rail, usually near the steering column on the left side. The stamp is small, often partially hidden by plastic bodywork, and may need a flashlight and a damp rag to read. On some models — particularly Polaris and Can-Am — the VIN is stamped under the seat on the frame crossmember. A printed manufacturer's label is also affixed to the rear fender or frame near the rear suspension on most modern bikes.",
  where3: "On utility quads and side-by-sides, also check the inside of the engine compartment or under the cargo bed for a second factory sticker. If you cannot find a VIN at all on a bike being sold as a 2007-or-newer model from a major brand, treat that as a strong signal the bike is stolen or has had its frame swapped.",
  whereCardTitle: "Three places to look for the ATV VIN",
  whereList: [
    "Frame rail near the steering column (the stamped VIN — most important)",
    "Under the seat on the frame crossmember (Polaris, Can-Am, others)",
    "Manufacturer's label on the rear fender or rear frame",
    "Inside the engine compartment on UTVs and side-by-sides",
    "On the title and registration document where the state issued one",
  ],
  whereCardNote: "Always read the stamped frame VIN with your own eyes — a sticker or paperwork VIN alone is not enough on an off-road purchase.",
  midCtaHeading: "Check This Specific ATV VIN Right Now",
  midCtaSub: "You already have a quad or side-by-side in mind. Run the VIN against stolen-vehicle databases and our decoder — free, in seconds, no sign-up.",
  h2Stolen: "Stolen ATV Check — Why It Matters",
  stolen1Pre: "ATV theft is rampant. Off-road vehicles are one of the single ",
  stolen1Bold: "most-stolen categories",
  stolen1Suffix: " of titled equipment in the United States, with annual losses estimated in the $50-100 million range. A quad can be loaded onto a trailer in under sixty seconds with two people and a ramp — no keys required, no alarms to disable, often parked in unsecured rural sheds or trailheads. That makes verifying stolen status through a VIN check the single highest-leverage step in any used ATV purchase.",
  stolen2Pre: "Our ATV VIN lookup queries available stolen-vehicle feeds, including ",
  stolen2Bold: "NCIC-sourced databases",
  stolen2Suffix: " where accessible. The NCIC (National Crime Information Center) is the federal database law enforcement uses to record stolen vehicles, including ATVs. A clean NCIC check is not absolute proof a bike was not stolen — local thefts can take days or weeks to make it into the federal record, and stolen bikes recovered and re-registered may carry no flag at all — but a VIN that returns a stolen hit is unambiguous and final.",
  stolen3: "Trail-area thefts and rural-property thefts are especially common. If you are buying from a seller who is reluctant to meet at their home, will not let you photograph the VIN, or insists on a cash-only deal at a neutral location, treat that pattern as a red flag and run the VIN check before you go.",
  h2TitleStates: "ATV Title vs. Registration — How It Varies by State",
  titleStates1Pre: "Off-road titling rules are dramatically different from car titling rules — and they vary state by state. Some states ",
  titleStates1Bold: "do not title ATVs at all",
  titleStates1Suffix: " and rely entirely on registration plus a bill of sale. Others issue a full title with the same brand framework (clean, salvage, rebuilt, stolen-recovered) used for cars. That patchwork makes ATV history tracking harder than car history tracking — and means a VIN lookup is doing more inferential work.",
  titleStates2: "California is the classic example of a non-titling state for ATVs: a bill of sale plus an OHV (off-highway vehicle) registration through the DMV is the entire paper trail for most quads. New York, Texas, and Florida do issue titles, with brand requirements similar to cars. Several other states issue a title only above a certain horsepower threshold or only for newer model years. The result is that an ATV with a clean lookup in one state may have undocumented history from a previous owner in another.",
  titleStates3: "Because of this patchwork, always pair an ATV VIN lookup with a careful read of the bill of sale and registration. If the bill of sale and the VIN do not agree on the year and model, that is a more important red flag on an ATV than on a car — because the paperwork is doing more of the heavy lifting.",
  titleStatesCardTitle: "How ATV titling works in practice",
  titleStatesList: [
    "Some states (e.g., California) issue no ATV title — only OHV registration",
    "Some states (e.g., New York) issue a full title with brand framework",
    "Bill of sale is often the primary paper trail for off-road quads",
    "Stolen-recovered brands appear inconsistently across state systems",
    "VIN lookup must work harder where DMV title data is thin",
  ],
  titleStatesCardNote: "Run the VIN, confirm the frame stamp, read the bill of sale, and check registration — all four steps protect you on a used ATV purchase.",
  h2Brands: "Major ATV and UTV Brand VIN Patterns",
  brandsIntro: "Each major manufacturer encodes its model lines into the VIN in a slightly different way. Here is what to expect from the six brands that dominate the US ATV and side-by-side market.",
  brands: [
    { title: "Polaris (Sportsman, RZR, Ranger)", body: "Polaris uses the 1ZE or 4XA WMI depending on plant. The Sportsman utility line and the RZR sport side-by-side line are the highest-volume models. The Ranger utility UTV uses the same VIN structure. Polaris VINs are typically stamped on the frame near the steering column and on a label under the seat." },
    { title: "Yamaha (YFZ, Grizzly, Kodiak, Wolverine)", body: "Yamaha uses the 5Y4 WMI for ATVs. The YFZ450 is the sport quad benchmark; the Grizzly 700 and Kodiak 450/700 are the utility line; the Wolverine RMAX is the side-by-side. The VIN is stamped on the frame rail near the steering column and printed on a sticker on the rear fender." },
    { title: "Can-Am / BRP (Maverick, Outlander, Defender)", body: "Can-Am uses the 3JB WMI (BRP's Mexican plant) and other WMIs for Canadian-built bikes. The Outlander is the utility quad; the Renegade is the sport quad; the Maverick X3 is the high-performance side-by-side; the Defender is the work UTV. Can-Am stamps the VIN on the frame and prints it on a label inside the engine bay on side-by-sides." },
    { title: "Honda (TRX Recon, Rancher, Foreman, Rubicon, Pioneer)", body: "Honda uses the 478 WMI for ATVs. The TRX series covers the entire lineup: TRX250 Recon for entry sport, Rancher 420 and Foreman 500 for utility, Rubicon for premium utility with automatic transmission, and the Pioneer side-by-side. Honda VINs are stamped on the frame near the steering column." },
    { title: "Kawasaki (Brute Force, Mule, Teryx, KFX)", body: "Kawasaki uses the JKB WMI. The Brute Force is the utility quad line; the KFX is the sport quad; the Mule is the work UTV; the Teryx is the recreational side-by-side. Kawasaki VINs are stamped on the frame on the left side near the steering head." },
    { title: "Arctic Cat / Textron (Alterra, Wildcat, Prowler)", body: "Arctic Cat uses the 4UF WMI. The Alterra utility quad replaced the older 500 and 700 model designations. The Wildcat is the sport side-by-side line; the Prowler is the utility UTV. Arctic Cat VINs are stamped on the frame and printed on a label on the rear fender." },
  ],
  h2Salvage: "Salvage and Rebuilt ATV Warnings",
  salvageIntro: "ATVs are easy to crash and easy to frame-damage. A rollover at speed bends the frame, cracks the swingarm, and twists the suspension geometry — all of which are difficult to detect by eye and impossible to fully repair without specialized equipment. A meaningful percentage of used ATVs sold privately have hidden crash damage, often without any insurance claim filed.",
  salvages: [
    { title: "Bent or repaired frames", body: "A rolled ATV with a bent frame may ride straight on flat ground but will track sideways and wear tires unevenly on the trail. Frame straightening rarely fully restores the geometry. A VIN that returns a salvage or rebuilt brand is the clearest possible warning sign — and many states do issue those brands on ATVs." },
    { title: "Hidden insurance buybacks", body: "Some ATV crashes generate insurance claims that result in the bike being declared a total loss, then bought back by the owner for parts or rebuild. If the state subsequently re-issues a clean title, only the VIN lookup against the original loss record will catch it." },
    { title: "Engine and drivetrain damage from submersion", body: "Mud-bog culture means a lot of ATVs end up briefly submerged. Engine internals corrode silently for months afterward. The VIN cannot tell you about water damage that was never reported — but it can tell you about the brand history that often accompanies it on bikes pulled from serious mud or flood events." },
  ],
  salvageNoteBoldLead: "Considering a used ATV?",
  salvageNoteMid1: " Pair this VIN lookup with a careful ",
  salvageNoteLink1: "salvage title check",
  salvageNoteMid2: " and read up on how to spot a ",
  salvageNoteLink2: "stolen vehicle",
  salvageNoteSuffix: " before you put cash down — off-road purchases reward extra paperwork diligence.",
  h2Utv: "UTV and Side-by-Side VIN Differences",
  utv1Pre: "UTVs — side-by-sides like the Polaris RZR, Can-Am Maverick X3, Yamaha YXZ, Honda Pioneer, and Kawasaki Teryx — use the ",
  utv1Bold: "same 17-character VIN system",
  utv1Suffix: " as ATVs, from the same manufacturers, with the same WMI prefixes (1ZE/4XA for Polaris, 3JB for Can-Am, 5Y4 for Yamaha, etc.). The lookup process is identical: enter the VIN, get back the decoded specs, the stolen-vehicle check, and any title data the state has on record.",
  utv2: "The only differences are practical. UTVs are often titled where ATVs are not — they are larger, more expensive, and more often used on public roads with windshield-and-roof configurations. That means UTV VIN lookups tend to return richer title history than ATV VIN lookups on the same brand. UTVs are also stolen for different reasons (resale of intact units rather than parts), so the stolen-vehicle check is just as important.",
  utv3: "If you are buying a used UTV, the VIN check process is the same as for an ATV — but you should also confirm whether the bike has any street-legal modifications that would affect its registration status in your state. A street-legal kit installed in Utah may not satisfy DMV requirements in Oregon.",
  utvCardTitle: "UTV VIN checklist",
  utvChecklist: [
    "Same 17-character VIN format as ATVs, same WMI prefixes",
    "Stamped on the frame, usually under the cargo bed or near the steering column",
    "Often carries a title even in states that do not title quads",
    "Check stolen status — intact UTV resale is a known theft pattern",
    "Confirm street-legal modifications are valid in your registration state",
    "Run the lookup the same way you would for an ATV",
  ],
  utvCardCta: "Run the VIN now — paste it here:",
  h2Internal: "Related Checks for Off-Road and Powersport Buyers",
  internalIntro: "An ATV VIN lookup is the entry point. These focused checks dig deeper into specific records when something looks off — or when you want to be extra thorough on an off-road purchase.",
  internalLinks: [
    { href: "/stolen-vehicle-check", label: "Stolen Vehicle Check", desc: "Run any VIN against stolen-vehicle databases including NCIC-sourced records — critical for ATV and UTV purchases." },
    { href: "/motorcycle-vin-search", label: "Motorcycle VIN Search", desc: "VIN lookup for street bikes, sport bikes, cruisers, and dirt bikes from all major manufacturers." },
    { href: "/motorcycle-vin-check", label: "Motorcycle VIN Check", desc: "Full motorcycle history check including title brands, stolen status, and recall data." },
    { href: "/vin-decoder", label: "VIN Decoder", desc: "Break down any 17-character VIN into year, make, model, engine, and factory equipment." },
    { href: "/vin-check", label: "Full VIN Check", desc: "Complete history report including title brands, accidents, odometer, and recalls in one place." },
    { href: "/golf-cart-vin-lookup", label: "Golf Cart VIN Lookup", desc: "VIN lookup for golf carts and low-speed off-road utility vehicles." },
    { href: "/salvage-title-check", label: "Salvage Title Check", desc: "See if the VIN carries a salvage, junk, or rebuilt title brand from any state." },
    { href: "/pricing", label: "Full Report Pricing", desc: "Order a deeper history report for high-stakes purchases or commercial fleet vetting." },
  ],
  h2Faq: "ATV VIN Lookup — Frequently Asked Questions",
  faqIntro: "The questions ATV and UTV buyers ask most when they first try to verify a used quad or side-by-side.",
  bottomBadge: "Free · Instant · Stolen Check Included",
  ctaBottomHeading: "Ready to Lookup an ATV VIN?",
  ctaBottomSub: "Enter any 17-character ATV or UTV VIN to run a free decoder against the manufacturer's pattern and check stolen-vehicle databases. No account required, works for all major brands.",
  ctaBottomNote: "No credit card · No sign-up · Free for ATV and UTV VINs",
} as const;

const FAQS_EN = [
  { question: "How do I look up an ATV VIN?", answer: "Find the 17-character VIN stamped on the frame rail of your ATV — usually near the steering column on the left side, or under the seat on Polaris and Can-Am models. Type or paste it into the free ATV VIN lookup form above and the tool will validate the format, decode the manufacturer, model year, model line, engine displacement, and drivetrain, then check available stolen-vehicle databases and any title records that exist for that VIN. For pre-2006 ATVs that use shorter serial numbers stamped on the frame, the lookup will return whatever decoded data is available and flag the serial as a pre-standard format." },
  { question: "Is the ATV VIN lookup free?", answer: "Yes. Our basic ATV VIN lookup is free, with no sign-up, no credit card, and no hidden charges. You enter the VIN and we return the decoded factory specs, the stolen-vehicle check against available databases, and any title brand or registration data that exists for that VIN. Free ATV VIN lookups are made possible because the VIN structure is published by NHTSA and stolen-vehicle data from NCIC-sourced feeds is accessible to approved providers. A paid full history report is available if you need every available record, but the free lookup is sufficient for most pre-purchase decisions." },
  { question: "Where is the VIN on an ATV?", answer: "The VIN on an ATV is most commonly stamped into the frame rail near the steering column on the left side of the bike. It is small, often partially hidden by plastic bodywork, and may need a flashlight and a damp rag to read clearly. Some manufacturers — particularly Polaris and Can-Am — also stamp the VIN under the seat on the frame crossmember. A printed manufacturer's label is also affixed to the rear fender or rear frame on most modern bikes. On UTVs and side-by-sides, look inside the engine compartment or under the cargo bed for an additional factory sticker. Always confirm the stamped frame VIN matches the sticker and the title — sticker mismatches are a serious red flag." },
  { question: "Do older ATVs have 17-character VINs?", answer: "Not always. The federal 17-character VIN standard applies to ATVs from most major manufacturers built in 2006 or later — Polaris, Yamaha, Honda, Kawasaki, Can-Am, and Arctic Cat have all standardized on the 17-character format for the post-2006 model years. ATVs built before 2006, and some smaller or imported brands even today, often use an 11 to 13-character serial number stamped directly into the frame rail. Those older serials do not follow a federal standard and are not always recognized by automated VIN decoders. For pre-2006 ATVs, our lookup will return whatever decoded data is available and flag the serial as a pre-standard format that may need manual verification through the manufacturer." },
  { question: "How do I check if an ATV is stolen?", answer: "The most reliable way to check if an ATV is stolen is to run the VIN through a stolen-vehicle database. Our free ATV VIN lookup queries available stolen-vehicle feeds including NCIC-sourced records where accessible. The NCIC (National Crime Information Center) is the federal database law enforcement uses to record stolen vehicles, including ATVs and UTVs. A clean NCIC check is not absolute proof the bike was not stolen — local thefts can take days or weeks to make it into the federal record, and bikes stolen and recovered may carry no flag — but a VIN that returns a stolen hit is unambiguous. Always pair the VIN check with physical due diligence: meet the seller at their home, photograph the VIN before you pay, and walk away from cash-only deals at neutral locations." },
  { question: "Are UTV VINs the same as ATV VINs?", answer: "Yes. UTVs (side-by-sides like the Polaris RZR, Can-Am Maverick X3, Yamaha YXZ, Honda Pioneer, and Kawasaki Teryx) use the same 17-character VIN system as ATVs, from the same manufacturers, with the same WMI prefixes — 1ZE or 4XA for Polaris, 3JB for Can-Am, 5Y4 for Yamaha, 478 for Honda, JKB for Kawasaki, and 4UF for Arctic Cat. The lookup process is identical: enter the VIN and get back the decoded specs, the stolen-vehicle check, and any title data the state has on record. The main practical difference is that UTVs are titled more consistently than ATVs across states, so UTV VIN lookups tend to return richer title history than ATV lookups for the same brand." },
  { question: "Can I title an ATV in any state by VIN?", answer: "It depends on the state — not every state issues an ATV title. California, for example, does not title ATVs at all and relies entirely on a bill of sale plus an OHV (off-highway vehicle) registration through the DMV. New York, Texas, and Florida do issue full ATV titles with brand requirements similar to car titles. Several other states issue a title only above a certain horsepower threshold or only for newer model years. To register a used ATV in your state, you typically need the VIN, the bill of sale, the prior registration document if any, and proof of identity. A VIN lookup helps confirm the bike's identity and surfaces any stolen or salvage flag that would block titling — but the actual title issuance is a state-DMV process that requires you to apply in person with the paperwork. Always confirm the VIN on the frame matches the VIN on whatever paperwork the seller hands you before you take possession." },
];

export default function AtvVinLookupBody() {
  const c = COPY;

  return (
    <article className="pb-16 bg-surface">
      <div className="bg-primary text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-14 sm:pt-28 sm:pb-20">
          <Breadcrumbs items={[{ label: c.home, href: "/" }, { label: c.crumb }]} onDark />
          <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
            <Bike className="w-4 h-4" /> {c.badge}
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
            {c.reveals.map((r, i) => {
              const Icon = REVEAL_ICONS[i];
              return (
                <div key={r.title} className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5 sm:p-6">
                  <div className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-base sm:text-lg font-headline font-extrabold text-primary mb-1.5">{r.title}</h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">{r.body}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Decoding}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl leading-relaxed">{c.decodingIntro}</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              <p>
                {c.decoding1Pre}
                <strong className="text-on-surface">{c.decoding1Bold}</strong>
                {c.decoding1Suffix}
              </p>
              <p>
                {c.decoding2Pre}
                <strong className="text-on-surface">{c.decoding2Bold}</strong>
                {c.decoding2Suffix}
              </p>
              <p>{c.decoding3}</p>
            </div>
            <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
              <div className="flex items-center gap-2 mb-3">
                <Hash className="w-5 h-5 text-primary" />
                <h3 className="font-headline font-extrabold text-primary">{c.brandWmiTitle}</h3>
              </div>
              <ul className="space-y-3 text-sm text-on-surface">
                {c.brandWmiRows.map((r) => (
                  <li key={r.label} className="flex items-center justify-between gap-3 rounded-lg bg-white px-3.5 py-2.5 border border-outline-variant/60">
                    <span className="text-on-surface-variant">{r.label}</span>
                    <code className="font-mono font-bold text-primary">{r.value}</code>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-on-surface-variant leading-relaxed">{c.brandWmiNote}</p>
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
                {c.whereList.map((place) => (
                  <li key={place} className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>{place}</span>
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
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">{c.h2Stolen}</h2>
          <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4 max-w-3xl">
            <p>
              {c.stolen1Pre}
              <strong className="text-on-surface">{c.stolen1Bold}</strong>
              {c.stolen1Suffix}
            </p>
            <p>
              {c.stolen2Pre}
              <strong className="text-on-surface">{c.stolen2Bold}</strong>
              {c.stolen2Suffix}
            </p>
            <p>{c.stolen3}</p>
          </div>
          <div className="mt-6 rounded-2xl bg-secondary-container/40 border border-outline-variant p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-on-secondary-container flex-shrink-0 mt-0.5" />
              <p className="text-sm text-on-surface leading-relaxed">
                Running a stolen-vehicle check on every used ATV or UTV you consider is the single highest-leverage safety step in any off-road purchase. <Link href="/stolen-vehicle-check" className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">Run a stolen vehicle check</Link> on the VIN before you go to see the bike in person.
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">{c.h2TitleStates}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              <p>
                {c.titleStates1Pre}
                <strong className="text-on-surface">{c.titleStates1Bold}</strong>
                {c.titleStates1Suffix}
              </p>
              <p>{c.titleStates2}</p>
              <p>{c.titleStates3}</p>
            </div>
            <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
              <div className="flex items-center gap-2 mb-3">
                <FileText className="w-5 h-5 text-primary" />
                <h3 className="font-headline font-extrabold text-primary">{c.titleStatesCardTitle}</h3>
              </div>
              <ul className="space-y-2 text-sm text-on-surface">
                {c.titleStatesList.map((line) => (
                  <li key={line} className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-on-surface-variant leading-relaxed">{c.titleStatesCardNote}</p>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Brands}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">{c.brandsIntro}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {c.brands.map((b, i) => {
              const Icon = BRAND_ICONS[i];
              return (
                <div key={b.title} className="rounded-2xl border border-outline-variant bg-surface p-5">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-base font-headline font-extrabold text-primary mb-1">{b.title}</h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">{b.body}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Salvage}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">{c.salvageIntro}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {c.salvages.map((item, i) => {
              const Icon = SALVAGE_ICONS[i];
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
                <strong className="text-on-surface">{c.salvageNoteBoldLead}</strong>
                {c.salvageNoteMid1}
                <Link href="/salvage-title-check" className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.salvageNoteLink1}</Link>
                {c.salvageNoteMid2}
                <Link href="/stolen-vehicle-check" className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.salvageNoteLink2}</Link>
                {c.salvageNoteSuffix}
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">{c.h2Utv}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              <p>
                {c.utv1Pre}
                <strong className="text-on-surface">{c.utv1Bold}</strong>
                {c.utv1Suffix}
              </p>
              <p>{c.utv2}</p>
              <p>{c.utv3}</p>
            </div>
            <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
              <div className="flex items-center gap-2 mb-3">
                <ClipboardCheck className="w-5 h-5 text-primary" />
                <h3 className="font-headline font-extrabold text-primary">{c.utvCardTitle}</h3>
              </div>
              <ul className="space-y-2 text-sm text-on-surface">
                {c.utvChecklist.map((tip) => (
                  <li key={tip} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" strokeWidth={3} />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 rounded-xl bg-white p-4 border border-outline-variant">
                <p className="text-xs font-bold text-on-surface mb-2">{c.utvCardCta}</p>
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

        <RelatedChecks exclude="/atv-vin-lookup" />
      </div>
    </article>
  );
}

export { FAQS_EN };
