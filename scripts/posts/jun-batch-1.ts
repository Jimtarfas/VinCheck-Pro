/**
 * June 2026 — Batch 1 of 4.
 * High-intent vehicle-safety posts.
 *
 * Date strategy: spread May 5 → Jun 9 to fill the gap since the last post
 * (Apr 24) and signal consistent publishing cadence to Google.
 *
 * Hero images: dynamically picked from Bing at import time via
 * pickHeroImage() (scripts/posts/image-picker.ts).
 *
 * Inline images: marker URLs of the form "bing:<query>" — resolved to a
 * real Bing image URL by pickInlineImage() at import time. Keeps every
 * inline shot topical without requiring a hand-curated photo library.
 */

import { body, bullets, callout, h2, h3, img, numbered, p, pLink } from "./helpers";
import type { PostInput } from "../types";

// Placeholder — overwritten with a real Bing URL at import time by
// pickHeroImage() in scripts/import-blog.ts. The actual `heroImageUrl`
// value here is ignored when the picker returns a fresh URL.
const HERO_PLACEHOLDER =
  "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=1600&q=80";

export const JUN_BATCH_1: PostInput[] = [
  // ───────────────────────────────────────────────────────────────────
  // 1. Flood-damaged car detection
  // ───────────────────────────────────────────────────────────────────
  {
    slug: "how-to-check-if-a-car-was-in-a-flood",
    title: "How to Check if a Car Was in a Flood (2026 Buyer's Guide)",
    seoTitle: "Was This Car Flooded? 7 Tells + a VIN Check",
    seoDescription:
      "Flooded cars get cleaned up and resold across state lines every season. Here's how to spot the seven physical tells — and which VIN check catches the rest.",
    excerpt:
      "Flooded vehicles are routinely resold cross-state after the title is washed. Use these seven physical inspections plus a VIN check to spot one before you pay.",
    focusKeyword: "how to check if a car was in a flood",
    keywords: [
      "flood damaged car",
      "flood title vin check",
      "salt water car",
      "flood vehicle history",
      "nmvtis flood report",
    ],
    category: "vehicle-safety",
    tags: ["flood", "salvage", "vin", "title-washing", "inspection"],
    publishedAt: "2026-05-05T10:00:00.000Z",
    heroImageUrl: HERO_PLACEHOLDER,
    heroImageAlt: "Flood-damaged sedan being recovered from receding water",
    body: body(
      p(
        "After every major hurricane, hailstorm, or river flood, tens of thousands of vehicles get a quiet second life. Insurance carriers total them, salvage auctions move them across state lines, and a small percentage end up back on consumer marketplaces with a fresh detail and a story you can't independently verify. The seller may not even know — the car they bought at a wholesale auction six months ago might already have been laundered through two title states."
      ),
      p(
        "This guide gives you the seven physical checks a competent mechanic walks through in fifteen minutes, plus the one data check that catches the cars whose physical evidence has already been hidden. Together they cover the realistic ways a flooded vehicle reaches a private buyer in 2026."
      ),
      callout(
        "tip",
        "60-second answer",
        "Smell the interior, lift the carpets, pull the back seat, check the dash electronics, peek under the spare-tire well, look for waterline corrosion on the seat rails, then run a VIN history report. Any single red flag is enough to walk away."
      ),
      img(
        "bing:flood damaged car interior wet seats",
        "Flood-damaged car interior with wet seats and waterline staining",
        "Interior waterline staining (lower seat back) is one of the hardest things to detail out completely."
      ),

      h2("Why flooded cars resurface — and where they're sold"),
      p(
        "When an insurer pays out a total loss, the car goes to a salvage auction (Copart and IAA together handle the vast majority of US salvage in 2026). Auctions are open to licensed dealers and rebuilders. A rebuilder takes a flooded car for a fraction of its pre-loss value, replaces the obviously ruined parts, dries everything they can dry, and registers it in a state with weaker brand-carryover rules. Once a clean title issues in the new state, that car can travel back across the country and appear on Craigslist, Facebook Marketplace, or even franchised used-car lots — sometimes without the brand following it."
      ),
      p(
        "The National Motor Vehicle Title Information System (NMVTIS) was designed to stop exactly this kind of title washing, and it works most of the time. But the system depends on every state, every insurance carrier, and every salvage yard reporting their data on time. There are gaps, especially in the first 30–60 days after a disaster, which is precisely when many flooded cars start moving."
      ),

      h2("The seven physical checks (in priority order)"),

      h3("1. Smell test, with the AC and heat off"),
      p(
        "Sit in the driver's seat with the doors closed and the climate system off. Take a long breath through your nose. Mildew, damp paper, or a chemical 'too clean' smell (someone tried to mask it) are all warning signs. Then turn the AC on and smell what comes out of the vents — water that sat in the evaporator core or blower motor housing can produce a distinctive musty odor when forced air flows through it."
      ),

      h3("2. Lift the floor mats and feel the carpet beneath"),
      p(
        "Don't trust new-looking mats — they're $40 to replace. The carpet underneath is what matters. Press firmly with your knuckles in the front and rear footwells. If it feels damp, gritty, or unusually springy (the underlayment can swell), that car was wet inside at some point."
      ),

      h3("3. Pull up the back-seat bench"),
      p(
        "Most back seats lift out with a single tug at the front edge. Once it's up, look at the metal floor pan, the seat-belt anchor bolts, and the wiring harness running across the floor. Surface rust on the bolts, white salt residue around the seat-belt mounts, or any sign of mineral deposits in the harness loom is high-confidence evidence of flooding."
      ),

      img(
        "bing:car back seat removed water damage floor pan",
        "Vehicle with back seat removed showing rusted floor pan and seat-belt anchors",
        "Lifting the back seat takes 10 seconds and exposes evidence a detailer can't easily reach."
      ),

      h3("4. Inspect the spare-tire well and undercarriage"),
      p(
        "Open the trunk and lift the spare. The well underneath is one of the lowest points in the body shell and water settles there. Look for waterline staining, surface rust on the jack, and damp foam. Then crawl underneath the car (or have a mechanic do it) and look at the unibody seams and frame rails — flooded cars often show recent undercoating that's been applied over corrosion the seller wanted to hide."
      ),

      h3("5. Test every electrical accessory"),
      p(
        "Water and modern automotive electronics don't coexist gracefully, even when the car appears to start fine. Cycle every window, every door lock, the sunroof, the heated seats, the infotainment system, every audio source, the rear defroster, the cruise control, and every dash warning light. Flickers, slow responses, or intermittent errors in two or more unrelated systems are a strong signal of corrosion in connectors that haven't failed yet but will."
      ),

      h3("6. Look at the seat rails, belt webbing, and dash hardware"),
      p(
        "Run a finger along the metal seat rails and under the seat-belt webbing where it normally retracts into the trim. Mineral residue, white salt crystals, or a stiff, crunchy texture in the belt webbing is hard to detail out. Same for the screws that hold the dashboard and door cards together — flood cars often show rust starting at fastener heads."
      ),

      h3("7. Read the inside of the headlights and tail lights"),
      p(
        "Modern sealed headlight assemblies are watertight when intact. Condensation, a high-water tide mark on the inside of the lens, or a small puddle inside the assembly is something you can't easily fake or fix without replacing the whole unit. Cracked or replaced lights on an otherwise clean car can also mean impact during a flood."
      ),

      callout(
        "warning",
        "What dealers will tell you (and why it's not enough)",
        "\"It's been certified pre-owned.\" CPO programs vary wildly and most don't include a flood-specific inspection. A CPO certificate is not a substitute for an NMVTIS-backed history report — they answer different questions."
      ),

      h2("The data check: what a VIN history report tells you"),
      p(
        "Even a perfectly executed physical inspection misses one thing: cars that were declared a total loss but then re-titled in a state that doesn't carry the flood brand forward. That's where the National Motor Vehicle Title Information System comes in. NMVTIS is a federal database fed by every state DMV, every participating insurance carrier, and every junk and salvage yard. When a car has been reported as a flood loss anywhere in the country, the record stays in NMVTIS even if a later title doesn't show the brand."
      ),
      pLink(
        "A ",
        ["VIN history report", "/vin-check"],
        " pulled at the moment you're considering an offer will surface the original flood declaration, every state the car has been titled in, the recorded total-loss event, and any salvage-yard receipt. The report can't physically inspect the car, but it can answer one question the seller can't: has this VIN ever been declared a total loss for water damage?"
      ),

      h2("Red-flag patterns specific to flooded resales"),
      ...bullets([
        "The car is titled in a state hundreds of miles from where it's being sold, and the title issued within the last six months.",
        "The seller offers an unusually low price for a car of that year and mileage, with a vague explanation (\"I'm moving,\" \"my dad passed\").",
        "There's a recent CarFax/AutoCheck report, but no NMVTIS-backed history.",
        "The interior smells too strongly of leather cleaner or new-car spray.",
        "The seller will only accept cash, won't let you take it to a mechanic, or pressures a same-day decision.",
        "Carpet looks brand new on a five-year-old car — and the rest of the wear matches the mileage.",
      ]),

      h2("When you find flood evidence — your options"),
      p(
        "If you've already paid, your recourse depends on whether the seller knew. Most US states have an Unfair and Deceptive Acts and Practices (UDAP) statute that gives a private buyer a right of rescission for material undisclosed defects. A documented NMVTIS hit combined with photos of the physical evidence is usually enough for a small-claims case or a strongly-worded demand letter. Document everything before you confront the seller."
      ),
      p(
        "If you haven't paid yet, the answer is simple: walk away and tell the seller why. A flooded car is not a discount opportunity. The electrical problems get worse, not better, as corrosion advances inside the wiring harness — and most of the fixes are not fixes, they're maintenance you'll be performing for the rest of your ownership."
      ),

      callout(
        "info",
        "What to do next",
        "Before you put down a deposit on any used vehicle: lift the back seat, smell the carpet, then pull a VIN history report. The combined cost is twenty minutes and the price of one report — versus the average cost of unwinding a flooded-car purchase, which industry data puts north of $4,000."
      )
    ),
  },

  // ───────────────────────────────────────────────────────────────────
  // 2. Salvage vs Rebuilt Title
  // ───────────────────────────────────────────────────────────────────
  {
    slug: "salvage-title-vs-rebuilt-title",
    title: "Salvage Title vs Rebuilt Title: Which Is Safer to Buy?",
    seoTitle: "Salvage Title vs Rebuilt: Buy, Avoid, or Pass?",
    seoDescription:
      "Salvage and rebuilt titles aren't the same thing. Here's what each brand means for resale, insurance, financing, and whether either is ever worth buying.",
    excerpt:
      "A salvage title is permanent. A rebuilt title is what comes after. Here's how each one affects insurance, financing, resale value, and whether the discount is worth it.",
    focusKeyword: "salvage title vs rebuilt title",
    keywords: [
      "salvage title meaning",
      "rebuilt title worth buying",
      "branded title insurance",
      "salvage car financing",
      "rebuilt title resale value",
    ],
    category: "vehicle-safety",
    tags: ["salvage", "rebuilt", "title-brands", "insurance", "financing"],
    publishedAt: "2026-05-09T10:00:00.000Z",
    heroImageUrl: HERO_PLACEHOLDER,
    heroImageAlt: "Salvage auction lot with rows of damaged vehicles",
    body: body(
      p(
        "Branded titles are some of the most misunderstood paperwork in the used-car world. People use 'salvage' and 'rebuilt' interchangeably, but they're two distinct legal states, and the difference between them is the difference between a car you can drive and a car you can only sell for parts. Understanding what each brand actually means — and what it means for insurance, financing, and resale — is the first thing to do before you let the price discount tempt you."
      ),
      p(
        "Here's the plain-English version, what each brand does to the car's title for the rest of its life, and the honest answer to whether either is ever worth buying."
      ),
      callout(
        "tip",
        "Bottom line first",
        "Salvage = not legally drivable. Rebuilt = legally drivable but permanently branded. A rebuilt-title car typically sells for 20–40% less than a clean-title equivalent, costs more to insure, can't be financed by most banks, and loses an extra 20% of value when you try to sell it. Sometimes worth it; usually not."
      ),
      img(
        "bing:salvage auction Copart damaged cars",
        "Rows of salvage-titled vehicles at an auction yard",
        "Salvage auctions like Copart and IAA are where every branded title car begins its second life."
      ),

      h2("What a salvage title actually means"),
      p(
        "A salvage title is issued by the state DMV when an insurance carrier declares a vehicle a total loss. 'Total loss' doesn't necessarily mean the car is destroyed — it means the cost to repair exceeded a state-set threshold (typically 70–80% of the car's pre-incident actual cash value). A car can be totaled and still be drivable; insurers are math companies, and once repair estimates cross the threshold, paying out is cheaper than fixing."
      ),
      p(
        "Once the salvage brand is on the title, the car is not legal to operate on public roads in any US state. It can be sold — usually to a licensed rebuilder or a parts yard via salvage auctions — but it can't be registered, insured for road use, or driven. The brand is permanent: it cannot be removed."
      ),

      h2("What a rebuilt title means (and how a car gets one)"),
      p(
        "A rebuilt title is what a salvage-title car becomes after a licensed rebuilder repairs it, gets it inspected by a state inspector, and applies to the DMV for a re-titling. The inspection varies dramatically by state — some require a comprehensive frame, structural, and safety check; others are essentially a paperwork formality. Once the car passes its state's process, the salvage brand is replaced with a 'rebuilt' brand. The car is now legal to register, insure, and drive."
      ),
      p(
        "But the brand stays on the title for the rest of the car's life and follows it across state lines. There is no legitimate process to turn a rebuilt title back into a clean one. Anyone who claims otherwise is describing title fraud."
      ),

      img(
        "bing:rebuilt car inspection mechanic frame check",
        "Mechanic performing a frame inspection on a rebuilt vehicle before re-titling",
        "State rebuilt-title inspections vary wildly in rigor — and that's the buyer's risk to evaluate."
      ),

      h2("The four things branded titles cost you (beyond the obvious)"),

      h3("Insurance"),
      p(
        "Most major insurance carriers will write liability insurance on a rebuilt title car, but many won't write comprehensive or collision. The ones that do typically apply a 20–40% premium to account for the unknown repair quality. State Farm, Geico, and Progressive will all quote rebuilt-title vehicles; Allstate and several smaller carriers either won't or will only write a stripped-down policy."
      ),

      h3("Financing"),
      p(
        "Most banks and credit unions won't finance a rebuilt-title vehicle at all. The ones that will typically cap loan-to-value at 50–70% and charge a higher rate. If you need financing, you're often forced into specialty subprime lenders with double-digit APRs — which usually erases the savings from the cheaper purchase price."
      ),

      h3("Resale"),
      p(
        "When it's your turn to sell, expect to lose an additional 20–25% of the car's already-discounted value. The pool of buyers who will consider a rebuilt title is small, and they all know they have leverage. The closer you can get to selling to a private buyer who needs cheap transportation and knows what they're doing, the better; trading it in to a dealer is usually a 30–50% haircut off retail value."
      ),

      h3("Hidden mechanical risk"),
      p(
        "The discount on a rebuilt car factors in known repair costs. What it can't factor in is the second-order problems: a frame straightened to within tolerance but never quite tracking right, an airbag harness re-wired by someone in a hurry, a steering rack from a different model year of the same car, electrical gremlins from sensors that were submerged. These show up in the first 12–24 months of ownership and they're rarely cheap."
      ),

      callout(
        "warning",
        "States where the brand can disappear",
        "A handful of states historically didn't carry branded titles forward when a car was re-registered (\"title washing\"). NMVTIS closed most of these loopholes, but a 30–60 day gap between a salvage event and the federal record sometimes still exists. Always pull an NMVTIS-backed report before buying — never trust the title document alone."
      ),

      h2("When a rebuilt title can be worth it"),
      ...bullets([
        "You're an experienced mechanic and can verify the repair quality yourself.",
        "You're paying cash (no financing needed) and don't plan to sell within five years.",
        "You only need liability insurance for an older, low-value car.",
        "You've seen the original pre-repair damage photos and the rebuilder's invoice.",
        "The price discount versus a clean-title equivalent is 40%+, not 15%.",
      ]),

      h2("When to walk away"),
      ...bullets([
        "The discount is less than 25% versus clean-title comparable cars.",
        "The seller can't show you photos of the original damage or the repair invoice.",
        "The repair was done in one state, the car was re-titled in another, and you can't see the inspection paperwork.",
        "The mileage is less than 50,000 — newer rebuilt cars rarely make financial sense after insurance and financing penalties.",
        "Your gut tells you the seller is hiding something.",
      ]),

      h2("How to verify before you buy"),
      pLink(
        "Pull a ",
        ["full NMVTIS-backed vehicle history report", "/vin-check"],
        " before any test drive. The report will show the original total-loss event (date, state, cause: collision/flood/hail/theft), every title brand the car has carried, every state it's been registered in, and any insurance claim that prompted the brand. If you see the salvage brand never converted to rebuilt — that car still isn't legal to drive. If you see the rebuilt brand in a state different from where the salvage was issued, that's not necessarily fraud, but it warrants extra inspection rigor."
      ),
      p(
        "Then take the car to a mechanic of your choosing — not the seller's mechanic — for a pre-purchase inspection focused on structural integrity, airbag system, and electrical health. Budget $150–250 for a thorough PPI. That fee is the cheapest insurance you'll ever buy on a branded-title vehicle."
      ),

      callout(
        "info",
        "What to do next",
        "If a car you're considering has a branded title, the question isn't 'is it a good price' but 'is the inspection good enough.' Pull the NMVTIS report first, then a PPI, then negotiate. In that order."
      )
    ),
  },

  // ───────────────────────────────────────────────────────────────────
  // 3. Stolen-car VIN verification
  // ───────────────────────────────────────────────────────────────────
  {
    slug: "stolen-car-vin-check-before-buying",
    title: "Stolen Car VIN Check: How to Verify Before You Buy",
    seoTitle: "Stolen Car VIN Check: Verify Before You Buy",
    seoDescription:
      "If you buy a stolen car — even unknowingly — you can lose it and your money. Here's the free NICB check, the paid NMVTIS check, and the physical VIN match.",
    excerpt:
      "Buy a stolen car and you can lose both the vehicle and the money. Here's how to verify a VIN against the NICB and NMVTIS databases before any cash changes hands.",
    focusKeyword: "stolen car vin check",
    keywords: [
      "nicb vincheck",
      "stolen vehicle database",
      "vin verification before buying",
      "how to know if a car is stolen",
      "stolen car red flags",
    ],
    category: "vehicle-safety",
    tags: ["stolen", "theft", "nicb", "vin", "verification"],
    publishedAt: "2026-05-13T10:00:00.000Z",
    heroImageUrl: HERO_PLACEHOLDER,
    heroImageAlt: "Police officer inspecting a vehicle VIN plate at a checkpoint",
    body: body(
      p(
        "Buying a stolen car — even completely unknowingly — is one of the few transactions in American consumer law where the buyer typically loses everything. The vehicle gets seized and returned to the rightful owner or insurer. The money you paid is gone, recoverable only by suing the seller (assuming you can find them, and assuming they have assets). Your insurance won't cover the loss because the title transfer was never legally valid."
      ),
      p(
        "Twenty minutes of free checks and one paid report cover the realistic ways this happens. Here's the playbook."
      ),
      callout(
        "tip",
        "60-second answer",
        "1. Check the VIN against the free NICB VINCheck database. 2. Pull an NMVTIS-backed history report. 3. Physically match the VIN on the dash, the door jamb sticker, and the title document. 4. Make sure the seller's ID matches the name on the title. Any mismatch = walk away."
      ),
      img(
        "bing:vin plate dashboard car identification number",
        "VIN plate visible through windshield on a vehicle dashboard",
        "The dashboard VIN is the easiest to read; it must match the door-jamb sticker and the title document exactly."
      ),

      h2("The three places a 'stolen' car comes from"),
      p(
        "Most stolen vehicles in 2026 fall into one of three resale pipelines. Each has its own warning signs."
      ),
      h3("1. Direct theft + immediate resale"),
      p(
        "An opportunistic thief takes the car and sells it cheap and fast on Craigslist, Facebook Marketplace, or in a private parking lot. The original VIN is intact because there's no time to alter it. These are the easiest to detect: the title is missing or 'in the mail,' the seller wants cash same-day, and the price is well below market. The free NICB VINCheck catches most of these within 30 days of the theft being reported."
      ),
      h3("2. VIN cloning"),
      p(
        "An organized ring steals a car, then finds a similar make/model/year/color on a legitimate sale listing. They duplicate the VIN of the legitimate car and stamp or sticker it onto the stolen one. The fake car gets a 'real' history when you look it up. This is harder to detect — you need to physically check that all the VIN locations match each other and that the federal sticker on the door jamb hasn't been tampered with."
      ),
      h3("3. Stolen-then-rebuilt"),
      p(
        "Some stolen cars get crashed in chases or otherwise damaged, then get processed through salvage auctions and end up with a rebuilt title. The theft event is in NMVTIS but may not be on the new title. A full vehicle history report catches the theft record even when the title doesn't show it."
      ),

      h2("Check 1: NICB VINCheck (free)"),
      p(
        "The National Insurance Crime Bureau maintains a free VIN-lookup tool at nicb.org/vincheck. It searches against two databases: theft records that haven't yet been recovered, and salvage records from participating insurance carriers. You get five searches per IP per day, and the result is binary: 'no record' or 'record found.'"
      ),
      p(
        "A clean NICB result is necessary but not sufficient. NICB only has records that participating carriers and law enforcement have submitted. Recent thefts may not appear for several weeks. Foreign-market thefts (cars shipped from overseas) won't show up. Always treat NICB as the first filter, not the only one."
      ),

      img(
        "bing:nicb vincheck website car theft lookup",
        "Screenshot of NICB VINCheck free stolen vehicle lookup tool",
        "NICB VINCheck is free, fast, and the obvious first step — but it's only one of three checks you need."
      ),

      h2("Check 2: Physical VIN verification"),
      p(
        "Every passenger vehicle sold in the US has the VIN in at least four places. They must all match each other exactly. Take a flashlight and check each one before any money changes hands."
      ),
      ...numbered([
        "Dashboard VIN — visible through the windshield at the base on the driver's side. This is the one most people check.",
        "Driver's door jamb sticker — a federal safety-standards sticker that includes the VIN, the vehicle's manufacture date, and the gross vehicle weight rating. Look at the sticker carefully: if it's peeling, has been re-applied, or the lamination is bubbled, treat that as a major red flag.",
        "Engine block stamping — usually on the front or top of the engine block, harder to see but standard on all US vehicles. A mechanic can locate it in 60 seconds.",
        "Title document and registration — the VIN must match the previous three locations exactly. One transposed character is enough to invalidate the title transfer.",
      ]),

      callout(
        "warning",
        "What VIN cloning looks like in person",
        "The dash VIN is correct. The door jamb sticker is missing, damaged, or visibly different in font/weight from a normal sticker. The engine VIN doesn't match. The title looks correct but the seller's name doesn't match their ID, or the title was issued recently in a state where the car has never been registered. Any of those, alone, is enough to walk."
      ),

      h2("Check 3: NMVTIS-backed history report"),
      pLink(
        "A ",
        ["paid VIN history report", "/vin-check"],
        " accesses the federal NMVTIS database plus commercial sources like insurance carriers and salvage yards. Unlike NICB's free tool, NMVTIS includes every reported title transfer, every state of registration, every insurance total-loss event, every salvage-yard receipt, and every reported theft — even from years ago. If a car was stolen in 2019, recovered, and quietly retitled, NMVTIS still has the record. Most consumer-facing NMVTIS reports cost $10–25 per VIN and are returned in under a minute."
      ),
      p(
        "Specifically look for: title transfers between states with no corresponding ownership transfer (a sign of laundering), recent re-titling in a state where the car has no other history, theft or recovery records, and any insurance total-loss event."
      ),

      h2("Seller red flags that no database can catch"),
      ...bullets([
        "The seller can't or won't show government-issued ID.",
        "The name on the seller's ID doesn't match the name on the title.",
        "The title is missing, 'in the mail,' or 'at the bank.'",
        "The seller will only meet in a public parking lot, not at their home.",
        "They demand cash and refuse a cashier's check, ACH, or escrow.",
        "The price is more than 20% below comparable listings for the same year/make/model/mileage.",
        "The seller pressures a same-day decision or refuses a third-party mechanic's inspection.",
        "The 'seller' is selling on behalf of someone else (a relative, a friend who's out of town).",
      ]),

      h2("If you discover the car is stolen after you've paid"),
      p(
        "Stop driving it immediately. Continued use after discovering theft can expose you to additional criminal liability. Call your local police non-emergency line and report what you've found. Bring the bill of sale, the seller's contact information, and your physical evidence. The car will almost certainly be returned to its rightful owner or their insurer; your only path to recovery is civil action against the seller."
      ),
      p(
        "Practically, this is why all the upfront diligence matters. Once cash is gone and the car is gone, the legal system rarely makes the victim whole."
      ),

      callout(
        "info",
        "What to do next",
        "Before you transfer any money: NICB free check, physical VIN match across four locations, NMVTIS-backed history report, seller-ID match against title. Four checks, twenty minutes, total cost under $20. Compared to losing the entire purchase price, the math isn't close."
      )
    ),
  },

  // ───────────────────────────────────────────────────────────────────
  // 4. Odometer rollback detection
  // ───────────────────────────────────────────────────────────────────
  {
    slug: "how-to-spot-odometer-rollback",
    title: "Mileage Rollback: How to Spot Odometer Fraud Before You Pay",
    seoTitle: "Spotting Odometer Rollback: 8 Tells That Work",
    seoDescription:
      "Odometer fraud costs US car buyers over $1B every year. Here are the eight physical and digital tells that catch a rollback before the cash changes hands.",
    excerpt:
      "Digital odometers haven't ended rollback fraud — they've made it harder to spot. Here are the eight checks that catch a tampered odometer before you sign anything.",
    focusKeyword: "how to spot odometer rollback",
    keywords: [
      "odometer fraud signs",
      "digital odometer tampering",
      "mileage rollback check",
      "true mileage verification",
      "nmvtis odometer history",
    ],
    category: "vehicle-safety",
    tags: ["odometer", "mileage", "fraud", "inspection", "vin"],
    publishedAt: "2026-05-17T10:00:00.000Z",
    heroImageUrl: HERO_PLACEHOLDER,
    heroImageAlt: "Close-up of a digital odometer display showing low mileage on a worn used car",
    body: body(
      p(
        "Odometer fraud sounds like a 1970s problem — mechanical odometers spinning backward in a shop with a drill and a screwdriver. It isn't. The National Highway Traffic Safety Administration estimates that more than 450,000 vehicles are sold each year in the US with rolled-back odometers, and that the practice costs American buyers over a billion dollars annually. Digital odometers haven't ended the fraud; they've made it less obvious by removing some of the physical evidence buyers used to look for."
      ),
      p(
        "Here are eight checks — four physical, four data-based — that catch the vast majority of rollback attempts before any money changes hands."
      ),
      callout(
        "tip",
        "60-second answer",
        "Check the steering wheel, driver's seat bolster, pedal pads, and door handles for wear that matches the displayed mileage. Then pull the vehicle's reported odometer history from NMVTIS — every state inspection, oil change, and title transfer creates a recorded reading. A 30,000-mile gap is impossible to fake."
      ),
      img(
        "bing:worn used car steering wheel high mileage interior",
        "Worn steering wheel and faded leather on a high-mileage used car interior",
        "Interior wear that doesn't match the displayed mileage is the single most reliable physical tell of rollback."
      ),

      h2("Why rollback is still profitable in 2026"),
      p(
        "Every 10,000 miles knocked off the odometer adds roughly $300–700 to a typical sedan's market value and considerably more on trucks and SUVs. A rollback of 50,000 miles on a five-year-old crossover can shift the asking price by $3,000–5,000. The cost of the rollback itself — using OBD-II tools widely sold online despite being illegal to use for this purpose — is under $200. The math is irresistible to the kind of seller who's already willing to defraud you."
      ),
      p(
        "Federal law (49 U.S.C. § 32703) makes it a felony to disconnect, reset, or alter an odometer with intent to change the mileage reading. Convictions carry up to three years in prison and substantial fines. Enforcement focuses on volume offenders — dealers and rebuilders who do it at scale. Private-party rollbacks are charged less often but the law applies equally."
      ),

      h2("The four physical checks"),

      h3("1. Steering wheel and shift knob"),
      p(
        "The driver's side of the steering wheel — typically the 9- and 3-o'clock positions where hands rest naturally — wears smooth from use. A 30,000-mile car has a barely-perceptible polish. A 100,000-mile car has visibly worn leather or a flat spot in the rubber. If the displayed mileage says 45,000 but the wheel looks like 120,000, that's your answer. Same logic applies to a manual shift knob."
      ),

      h3("2. Driver's seat bolster"),
      p(
        "The left side of the driver's seat (the outer bolster) takes daily wear from people sliding in and out of the car. A low-mileage car has firm, evenly-shaped bolsters. A high-mileage car has a collapsed, cracked, or visibly scuffed driver's bolster — and the passenger side typically looks brand new by comparison. This is one of the hardest things for a seller to hide because replacing a seat cover or having the leather repaired is expensive and shows up under any close inspection."
      ),

      img(
        "bing:worn driver seat bolster leather car wear",
        "Worn and collapsed driver's seat bolster on a high-mileage vehicle",
        "Compare the driver's seat bolster to the passenger seat bolster — symmetric wear is normal, lopsided wear suggests mileage doesn't match."
      ),

      h3("3. Pedal pads"),
      p(
        "Rubber pedal pads wear smooth with use. The brake pedal in particular tells the story because it's used every time the car moves. A car with 25,000 displayed miles should still have the original mold lines on the pedal rubber. A car with 100,000+ miles will have rounded edges, smooth surfaces, and possibly a worn-through patch where the driver's heel sits."
      ),

      h3("4. Door handles, switches, and the key"),
      p(
        "The interior door handle on the driver's side, the volume knob on the infotainment system, the climate control dials, and the wear pattern on the ignition key (if it's a physical key) — all of these accumulate small abuses with every use. Worn-out switches and a polished key fob on a 'low-mileage' car are red flags that something's off."
      ),

      h2("The four data checks"),

      h3("5. Vehicle history report odometer log"),
      pLink(
        "Pull a ",
        ["full vehicle history report", "/vin-check"],
        " before any test drive. The report's odometer history section lists every recorded mileage reading from every source: state safety inspections, emissions tests, oil-change service centers that report to data partners, dealer service visits, insurance claim photographs, and title transfers. Each reading is timestamped. Look at the sequence: if the car had 95,000 miles in March 2024 and is now showing 51,000 miles in June 2026, that's not just a red flag — it's prosecutable fraud."
      ),

      h3("6. The federal Odometer Disclosure Statement on the title"),
      p(
        "Every title transfer in the US since 1986 requires an Odometer Disclosure Statement signed by the seller, certifying the mileage at the time of transfer. Pull the current title and any previous title (the seller should have access via their DMV). Each title shows the disclosed mileage at transfer. The mileage should monotonically increase across each transfer. If transfer #2 shows less mileage than transfer #1, you've found the rollback."
      ),

      h3("7. Service records and maintenance stickers"),
      p(
        "Most oil-change shops put an under-hood sticker showing the date and mileage of the last service. Look at that sticker and at any service records the seller can produce. Check whether the displayed odometer and the most recent service reading are consistent. Also check whether the brake fluid bottle, the timing-belt sticker, and the air filter date stamps line up with the displayed mileage trajectory."
      ),

      h3("8. NMVTIS title brand history"),
      p(
        "NMVTIS occasionally carries an 'odometer brand' on the title — applied when a state DMV has reason to believe the mileage is inaccurate (e.g. the disclosed mileage on a transfer was lower than the previously recorded one). A title with an existing odometer brand is unambiguous: walk away or accept the car is being sold with a known false reading."
      ),

      callout(
        "warning",
        "Newer cars aren't immune",
        "Modern OBD-II rollback tools can edit the mileage stored in a vehicle's instrument cluster and in some cases the engine ECU. They typically can't edit every module in the car simultaneously — which is how a skilled mechanic catches them. If you suspect rollback, have a dealer pull mileage from multiple modules (transmission, body control, infotainment); discrepancies are evidence."
      ),

      h2("Categories of vehicle most often rolled back"),
      ...bullets([
        "Trucks and SUVs — the highest dollar uplift per 10K miles removed.",
        "Three- to seven-year-old vehicles — old enough to have accumulated real mileage, young enough that low-mileage versions are still worth a premium.",
        "Lease returns and fleet vehicles — buyers expect high mileage, so a 'low' lease return commands a disproportionate price bump.",
        "Cars sourced from auction by small independent dealers — the supply chain has the most opportunities and the least accountability.",
      ]),

      h2("If you discover rollback after purchase"),
      p(
        "Document everything immediately. Photograph the physical wear, save the vehicle history report PDF, get the most recent service record, and write down what the seller said about the mileage. Then file a complaint with your state's attorney general (every state has a consumer-protection division) and NHTSA's Office of Odometer Fraud Investigation. Federal odometer fraud is a felony and the buyer is entitled to triple actual damages or $10,000 — whichever is greater — under 49 U.S.C. § 32710."
      ),
      p(
        "If the seller is a licensed dealer, also file a complaint with your state's DMV dealer regulation division. Dealers can lose their license over a single substantiated rollback complaint and most will offer a full refund rather than fight."
      ),

      callout(
        "info",
        "What to do next",
        "Before you put down a deposit: examine the steering wheel, driver's seat, and pedal pads — three minutes. Then pull a VIN history report and read the odometer history section — two minutes. If those two checks pass, you've eliminated the vast majority of rollback risk."
      )
    ),
  },
];
