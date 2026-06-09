/**
 * June 2026 — Batch 4 of 4.
 * Specialty VIN topics + seasonal posts.
 */

import { body, bullets, callout, h2, h3, img, numbered, p, pLink } from "./helpers";
import type { PostInput } from "../types";

const HERO_PLACEHOLDER =
  "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=1600&q=80";

export const JUN_BATCH_4: PostInput[] = [
  // ───────────────────────────────────────────────────────────────────
  // 13. Used motorcycle VIN check
  // ───────────────────────────────────────────────────────────────────
  {
    slug: "used-motorcycle-vin-check-guide",
    title: "Used Motorcycle VIN Check: A Complete Guide",
    seoTitle: "Used Motorcycle VIN Check: Everything to Know",
    seoDescription:
      "Motorcycle VIN checks differ from cars: shorter VINs on older bikes, theft-heavy market, parts-only sales. Here's the complete guide for used motorcycle buyers.",
    excerpt:
      "Motorcycle VIN checks differ from cars in important ways — shorter VINs on older bikes, a theft-heavy market, and 'parts-only' titles. Here's the complete buyer's guide.",
    focusKeyword: "used motorcycle vin check",
    keywords: [
      "motorcycle vin lookup",
      "stolen motorcycle check",
      "motorcycle title brands",
      "salvage motorcycle vin",
      "buying a used motorcycle",
    ],
    category: "vehicle-safety",
    tags: ["motorcycle", "vin", "theft", "salvage", "private-party"],
    publishedAt: "2026-06-07T10:00:00.000Z",
    heroImageUrl: HERO_PLACEHOLDER,
    heroImageAlt: "Used motorcycle parked for sale with VIN plate visible on steering head",
    body: body(
      p(
        "Motorcycle VIN checks share fundamentals with car VIN checks, but they have their own twist: motorcycle theft rates run roughly 3x higher per vehicle than car theft, pre-1981 bikes can have shorter non-standard VINs that confuse most tools, and 'parts-only' or 'restoration-only' titles are far more common in the bike market than the car market. Here's the complete buyer's playbook for used motorcycles in 2026."
      ),
      callout(
        "tip",
        "60-second answer",
        "Find the VIN at the steering head (right side, stamped into the frame) AND on the engine block — they should both decode to the same model and year. Run the free NICB VINCheck. Pull an NMVTIS-backed history report. Verify the seller's ID matches the title. Match every VIN location before paying."
      ),
      img(
        "bing:motorcycle vin plate steering head close up",
        "Close-up of a motorcycle VIN plate stamped into the steering head frame",
        "Most motorcycles carry the VIN on the steering head (right side) — this is the canonical location."
      ),

      h2("Where to find the VIN on a motorcycle"),
      p(
        "Unlike cars (which have the VIN in standard locations dictated by federal law), motorcycle VIN locations vary by manufacturer and model year. The common locations:"
      ),
      ...bullets([
        "Steering head — stamped into the frame on the right side, just below the handlebar mount. Most bikes 1981+ have it here.",
        "Engine case — separately stamped engine number, often near the cylinder base. On some bikes (especially pre-1981 Japanese imports) this can be the only VIN.",
        "Frame neck / down tube — older bikes (1960s-70s) often stamp the VIN here instead of the steering head.",
        "VIN sticker on the lower frame — federal compliance sticker (1981+) usually placed somewhere on the frame, sometimes hidden under panels.",
        "Title document — should match all of the above exactly.",
      ]),
      p(
        "If you can't find a VIN at all on a bike that should have one, walk away — that's either a stripped/parts bike with no legitimate title, or a stolen bike with the VIN ground off."
      ),

      h2("Pre-1981 bikes: special considerations"),
      p(
        "Motorcycles built before 1981 weren't required to use the 17-character VIN standard. Their identification numbers can be anywhere from 5 to 12 characters, with no check digit and no standardized position meanings. Decoding these requires manufacturer-specific reference material — Honda, Harley-Davidson, Triumph, and BSA each have their own conventions."
      ),
      p(
        "Title brands and history reporting are also patchier on pre-1981 bikes. NMVTIS coverage is thinner. For vintage bike purchases, lean more heavily on the physical inspection, the bike's title history (specific states have better records than others), and verification with the manufacturer or a marque-specific registry."
      ),

      img(
        "bing:motorcycle title document salvage rebuilt",
        "Motorcycle title document with salvage or rebuilt brand visible",
        "Salvage and parts-only titles are common in the bike market — much more so than in cars."
      ),

      h2("Motorcycle-specific title brands"),
      p(
        "Most car title brands apply to bikes (salvage, rebuilt, flood, theft recovery). A few are more common or have specific bike-world meanings:"
      ),
      ...bullets([
        "Parts Only / Non-Repairable — the bike cannot be re-titled for road use. Often a stripped frame or a totaled bike. If you're buying for parts, fine; if you're hoping to register and ride, walk away.",
        "Salvage — total-loss declared. Re-titleable as 'rebuilt' if inspected and repaired per state law.",
        "Rebuilt / Restored — was salvage, passed inspection. Insurance premiums roughly double for rebuilt bikes; resale value drops 30-40%.",
        "Flood / Submersion — water-damaged bike. Engine internals are especially vulnerable; many flood bikes have hidden corrosion that surfaces 12-18 months later.",
        "Theft Recovery — was reported stolen, then recovered. If undamaged, often a non-issue. If recovered after a chase or crash, frequently followed by a salvage brand.",
      ]),

      h2("Theft is the dominant motorcycle risk"),
      p(
        "Motorcycles are stolen at roughly 3x the per-vehicle rate of cars, per NICB data, and stolen bikes resurface on private-party markets faster than stolen cars (smaller, easier to move, easier to part out)."
      ),
      p(
        "The free NICB VINCheck is the right first step for every used motorcycle purchase. NICB covers most participating insurance carriers' stolen-vehicle reports and is the easiest way to catch a recently-stolen bike. Five free searches per IP per day, no signup."
      ),
      pLink(
        "Pair NICB with a paid ",
        ["NMVTIS-backed history report", "/vin-check"],
        " for a more comprehensive picture — NMVTIS includes title brand history across all states, ownership transfers, and any state-recorded theft or recovery event going back years."
      ),

      h2("Physical inspection: motorcycle-specific checks"),
      h3("Frame and steering head"),
      p(
        "Look closely at the steering head VIN. The numbers and letters should be uniform depth, in a consistent font, with even spacing. Re-stamped VINs are typically uneven and may show grinding marks where the old VIN was removed. The compliance sticker (if present) should be intact and not show signs of being re-applied."
      ),

      h3("Engine"),
      p(
        "Compare the engine VIN/serial number to the title. They should match the model and year of the rest of the bike. A 2018 frame with a 2009 engine is either a parts bike or a previously-totaled bike with a swapped powertrain — either case warrants a deep discount and a focused mechanical inspection."
      ),

      h3("Frame for damage"),
      p(
        "Look down the frame from the back of the bike to the front. The frame should be perfectly straight; any kink, bend, or paint inconsistency around the steering head, swingarm, or rear shock mount is evidence of a previous crash. Even minor frame damage on a motorcycle is unsafe at speed."
      ),

      h3("Fluids and engine internals"),
      p(
        "Check the oil for water (a milky color indicates flooding or coolant intrusion). Listen for unusual engine noises at startup and at idle. Verify the bike starts cleanly without excessive choke or assistance — hard starts on a 'maintained' bike usually signal carb or fuel-injection issues that aren't cheap to fix."
      ),

      callout(
        "warning",
        "Title-jumping and 'open titles'",
        "A common sketchy practice in the bike world: the seller has the title signed by the previous owner but never actually transferred it to their own name. They then 'jump' the title to you. This is illegal in most states and can leave you unable to register the bike. Always verify the seller's name is on the title document — if it isn't, walk away regardless of how good the story sounds."
      ),

      h2("Insurance considerations"),
      p(
        "Motorcycle insurance reacts more strongly to title brands than car insurance does. A rebuilt motorcycle title typically results in:"
      ),
      ...bullets([
        "Liability-only coverage from major carriers — comprehensive and collision often unavailable.",
        "20-40% higher liability premiums.",
        "Loan-to-value caps from financing lenders, or outright loan denials.",
        "Resale value 30-50% below clean-title equivalents.",
      ]),
      p(
        "If you're buying a rebuilt-title bike, run the insurance quote before you commit. The premiums and financing constraints can erase the savings from the cheaper purchase price."
      ),

      h2("The complete used-motorcycle VIN checklist"),
      ...numbered([
        "Find the VIN at the steering head, on the engine, and on the federal compliance sticker. All three must match.",
        "Verify the VIN on the title matches all physical locations.",
        "Verify the seller's name on the title matches their government ID.",
        "Run the free NICB VINCheck.",
        "Pull an NMVTIS-backed vehicle history report.",
        "Inspect the frame for straightness, re-stamped VIN, or paint inconsistency around the steering head.",
        "Verify the engine number matches the model and year of the rest of the bike.",
        "Check fluids, start the bike cold, listen for unusual noises.",
        "Get an insurance quote before agreeing to a price.",
        "Pay at a bank with the title transferred in front of you.",
      ]),

      callout(
        "info",
        "What to do next",
        "Motorcycles get stolen more often, get parted out more often, and turn up as 'open titles' more often than cars. The VIN-check process is the same fundamentals but the diligence is more critical. Run the free checks before driving to see any bike — then run the paid report before negotiating price."
      )
    ),
  },

  // ───────────────────────────────────────────────────────────────────
  // 14. RV/Camper VIN check
  // ───────────────────────────────────────────────────────────────────
  {
    slug: "rv-camper-vin-check-different-from-car",
    title: "RV & Camper VIN Check: Why It's Different from a Car",
    seoTitle: "RV VIN Check: 6 Things Cars Don't Deal With",
    seoDescription:
      "RVs and campers have multi-VIN structures, dual title trails, and recall categories cars never face. Here's the complete VIN-check guide for RV buyers.",
    excerpt:
      "RVs and campers have multi-VIN structures, dual title trails, and recall categories that cars never have to worry about. Here's the complete RV VIN check guide.",
    focusKeyword: "rv vin check",
    keywords: [
      "camper vin lookup",
      "motorhome vin check",
      "rv chassis vin vs coach vin",
      "rv history report",
      "buying used rv vin",
    ],
    category: "vehicle-safety",
    tags: ["rv", "camper", "motorhome", "vin", "specialty"],
    publishedAt: "2026-06-08T10:00:00.000Z",
    heroImageUrl: HERO_PLACEHOLDER,
    heroImageAlt: "Class A motorhome RV parked at a dealer lot for inspection",
    body: body(
      p(
        "RVs and campers look like cars when you're shopping for them — same dealer lots, same private-party listings, same Marketplace and Craigslist channels. They're not. An RV has a chassis VIN (the underlying truck or van that the coach sits on) AND a coach VIN (the manufactured house portion). Recalls can target either or both. Title trails can split between the chassis manufacturer and the coach manufacturer. Insurance, financing, and lien rules differ. And the inspection priorities — water damage, slide-out mechanics, propane systems, roof integrity — are entirely different from cars."
      ),
      p(
        "Here's the complete VIN-check playbook for used RV and camper buyers."
      ),
      callout(
        "tip",
        "60-second answer",
        "Find both the chassis VIN (under the hood or driver's door jamb) AND the coach VIN (interior data plate, usually inside a cabinet). Run history reports on both. Check chassis recalls at the chassis brand (Ford, Chevy, Freightliner) and coach recalls at the coach brand (Winnebago, Tiffin, etc.) separately. Inspect for water damage at every seam."
      ),
      img(
        "bing:rv motorhome chassis vin engine compartment",
        "RV chassis with VIN visible in the engine compartment",
        "The chassis VIN is what most RV history reports focus on — but it's only half of the picture."
      ),

      h2("RV types and what's actually 'the vehicle'"),

      h3("Class A motorhome"),
      p(
        "Built on a heavy-duty chassis (Freightliner, Spartan, Ford F-53). The chassis has a VIN at the standard truck locations: driver's door jamb, dashboard, and engine block. The coach (the house portion) has its own data plate inside the coach, usually in a cabinet near the driver's seat or in the bedroom."
      ),

      h3("Class B (camper van)"),
      p(
        "Built on a cargo van chassis (Mercedes Sprinter, Ford Transit, Ram ProMaster). The chassis VIN is in the normal car/truck locations. The coach builder (Airstream Interstate, Roadtrek, Storyteller Overland, etc.) typically affixes a separate data plate but reuses the chassis VIN as the legal vehicle identifier in many states."
      ),

      h3("Class C motorhome"),
      p(
        "Cutaway-cab chassis (Ford E-350/E-450, Chevy Express). The cab has the chassis VIN; the coach behind it has the coach VIN."
      ),

      h3("Travel trailer / fifth wheel"),
      p(
        "Towed, not motorized — there's no engine and no chassis VIN. The coach VIN is the only VIN. Title and registration follow trailer rules (varies by state)."
      ),

      img(
        "bing:rv interior data plate vin coach manufacturer",
        "RV interior data plate showing coach VIN and manufacturer information",
        "The coach VIN lives on an interior data plate, often inside a cabinet — easy to overlook."
      ),

      h2("Why dual-VIN matters for buyers"),
      p(
        "When you pull a vehicle history report on an RV's chassis VIN, you typically get the truck or van portion: title brands, accidents, odometer history, recalls on the chassis. You DON'T get coach-specific recalls (a defective slide-out mechanism, a faulty propane regulator, a water-heater recall), and you may miss coach-side incidents that the title trail recorded separately."
      ),
      pLink(
        "Run a ",
        ["chassis VIN history report", "/vin-check"],
        " AND check the coach manufacturer's recall portal separately (most coach makers have a website lookup tool by serial number). Insurance claims that damaged only the coach (e.g., a low-clearance hit that damaged the roof but not the engine) are sometimes recorded on neither — which is why physical inspection of the coach matters disproportionately."
      ),

      h2("Recalls: chassis vs coach"),
      h3("Chassis recalls"),
      p(
        "Standard automotive recalls — airbag inflators, brake systems, fuel pumps, transmission control modules. Checked at the chassis manufacturer's dealer (a Ford E-450 chassis is serviced at any Ford commercial dealer; a Freightliner chassis at a Freightliner dealer). Usually free."
      ),

      h3("Coach recalls"),
      p(
        "Everything from the chassis back: propane regulators, electrical converters, generator carbon-monoxide detection, water-heater tank corrosion, slide-out hydraulic systems, refrigerator fire risks. Checked at the coach manufacturer (Winnebago, Tiffin, Jayco, etc.). The NHTSA recall portal at nhtsa.gov/recalls covers some coach recalls but coverage is less consistent than for cars."
      ),

      h2("Water damage: the #1 RV killer"),
      p(
        "Water intrusion is to RVs what flooding is to cars — only chronic and harder to spot. Every roof seam, every window seal, every slide-out gasket is a potential leak point. By the time you can see water damage on the interior, the underlying wood structure (most RVs use plywood and OSB sheathing) is usually already compromised."
      ),
      p(
        "On any used RV inspection:"
      ),
      ...bullets([
        "Climb on the roof. Look at every seam (around the AC unit, the antenna, the vents, the edges where roof meets sidewall). Caulking should be uniform and not cracked or peeling.",
        "Inside, push firmly on the ceiling near the corners and at any wall-to-ceiling joint. Soft spots indicate water-damaged structure.",
        "Look for ceiling stains, especially in light-colored areas around windows, vents, and roof penetrations.",
        "Open every cabinet door and look in the corners; trapped water can pool here.",
        "Sniff for mildew — same test as a flooded car.",
        "Check the floor around the door, under the slide-outs, and around the toilet for delamination or spongy spots.",
      ]),

      h2("Slide-outs: a major mechanical risk"),
      p(
        "Slide-outs (the room extensions that motor out when the RV is parked) are one of the most expensive things to repair on a used RV. The motor, gears, seals, and floor track can all fail. On a used-RV inspection:"
      ),
      ...bullets([
        "Operate every slide-out fully out and back in. Listen for binding, popping, or motor strain.",
        "Look at the seal where the slide-out meets the main coach wall — should be intact, uniformly compressed, no daylight visible.",
        "Check the floor inside the slide-out for water staining, especially in corners.",
        "Verify the slide-out is plumb when extended (it shouldn't tilt or sag).",
      ]),

      h2("Mileage and engine considerations"),
      p(
        "RV chassis are built for higher mileage than passenger cars, but the engines often see hard use under heavy load. A Class A motorhome's diesel engine can run 200,000+ miles with proper maintenance; a Class B van engine generally has a shorter life under the load of a coach conversion."
      ),
      p(
        "On the test drive:"
      ),
      ...bullets([
        "Accelerate hard up a hill — listen for unusual exhaust sounds and watch for excessive smoke.",
        "Brake hard from highway speed in a safe area. RV brakes work harder than car brakes and wear faster.",
        "Check engine oil and transmission fluid color and smell. Transmission fluid that smells burnt indicates pending failure.",
        "Verify the generator starts and runs under load (turn on the AC). Generator failure is a $4,000-7,000 repair.",
      ]),

      callout(
        "warning",
        "Lien check is critical on RVs",
        "RV loans run longer (often 15-20 years) than car loans, and RVs depreciate slower than cars in some segments — which means many used RVs are still under loan when sold. Run a lien check via the state DMV on the chassis VIN before paying. If a lien exists, pay the lender directly at closing (same playbook as cars)."
      ),

      h2("Insurance and registration quirks"),
      ...bullets([
        "Most states register Class A and Class C motorhomes as 'motor vehicles' (same category as trucks) — register the same way you would a car.",
        "Travel trailers and fifth wheels register as 'trailers' with separate fee structures.",
        "RV-specific insurance carriers (Good Sam, Foremost, Progressive RV) offer coverage tailored to RV use patterns. Standard auto insurance won't cover RV-specific risks like awning damage, slide-out failures, or interior water damage.",
        "Personal-use vs full-time-use distinction matters for insurance — declare honestly, because misrepresentation can void coverage at claim time.",
      ]),

      callout(
        "info",
        "What to do next",
        "RV purchases reward patience and diligence. Find both VINs, run history reports on both, check recalls at both the chassis and coach manufacturers, then inspect for water damage at every seam. The cheapest mistake is the one you catch before paying."
      )
    ),
  },

  // ───────────────────────────────────────────────────────────────────
  // 15. Pre-road-trip recall + safety audit
  // ───────────────────────────────────────────────────────────────────
  {
    slug: "pre-road-trip-vin-recall-safety-checklist",
    title: "Pre-Road-Trip Checklist: VIN Recalls + Tire + Brake Audit",
    seoTitle: "Pre-Road-Trip Safety: VIN Recalls + Tires + Brakes",
    seoDescription:
      "Before any 500+ mile road trip, run a VIN recall check, audit tire age and pressure, and inspect brakes. Here's the 30-minute pre-trip checklist.",
    excerpt:
      "Before any long road trip, run a VIN recall check, audit your tire age and pressure, and inspect your brakes. Here's the 30-minute checklist that prevents the worst breakdowns.",
    focusKeyword: "pre road trip safety checklist",
    keywords: [
      "road trip vin recall check",
      "tire age check road trip",
      "pre trip vehicle inspection",
      "summer road trip safety",
      "brake check before long drive",
    ],
    category: "ownership-maintenance",
    tags: ["road-trip", "recall", "tires", "brakes", "safety", "summer"],
    publishedAt: "2026-06-08T16:00:00.000Z",
    heroImageUrl: HERO_PLACEHOLDER,
    heroImageAlt: "Family car loaded for a summer road trip with luggage and bikes on the roof",
    body: body(
      p(
        "Summer is the peak season for both road trips and the kind of mechanical failures that ruin them. Hot pavement accelerates tire wear and exposes old, dry-rotted rubber to blowout risk. Long highway grades reveal brake problems that city driving never tests. And manufacturer recalls — including ones that have been outstanding on your car for years without you knowing — can become safety-critical at the exact moment you're 800 miles from home with kids in the backseat."
      ),
      p(
        "Thirty focused minutes before you leave catches almost every preventable breakdown. Here's the pre-road-trip checklist that actually matters."
      ),
      callout(
        "tip",
        "30-minute pre-trip checklist",
        "VIN recall check (5 min, free) → tire age + pressure + tread (10 min) → brake pad check (5 min) → fluid levels (5 min) → battery test (5 min). Total: half an hour, all DIY, prevents the vast majority of roadside failures."
      ),
      img(
        "bing:family car road trip packed luggage highway",
        "Family vehicle loaded for a summer road trip on a highway",
        "The right time to find mechanical problems is before you leave, not 400 miles from home."
      ),

      h2("Step 1: VIN recall check (5 minutes, free)"),
      p(
        "Every vehicle sold in the US since 2014 can be checked for open safety recalls in under 60 seconds. You enter your VIN at the manufacturer's recall portal or the NHTSA recall lookup (nhtsa.gov/recalls), and it returns every active recall that hasn't been recorded as completed for your specific car."
      ),
      p(
        "Recalls are free to fix at any dealer of the same brand, even if your car is years out of warranty. Common ones that are road-trip-critical:"
      ),
      ...bullets([
        "Airbag inflator recalls (Takata and others) — affected airbags can rupture and project shrapnel.",
        "Fuel pump module recalls — failure causes the engine to stall, sometimes at highway speed.",
        "Brake booster vacuum hose recalls — sudden loss of brake assist.",
        "Wheel hub / lug nut recalls — wheel separation at speed.",
        "Power steering recalls — sudden loss of assist at low speed.",
        "Software / electronic recalls — typically updated by dealer in under an hour.",
      ]),
      p(
        "If your VIN has any outstanding safety recall, call a dealer this week and book an appointment to clear it. Most can do safety recalls same-day with parts in stock."
      ),

      h2("Step 2: Tire age + pressure + tread (10 minutes)"),

      h3("Tire age — the one most drivers ignore"),
      p(
        "Tires degrade with age regardless of mileage. Six years is the maximum recommended life for any passenger tire, even one with abundant tread depth. After that, the rubber compounds dry out and structural failure becomes possible without warning. A 10-year-old tire with full tread is still a 10-year-old tire — and it will blow out on a hot road eventually."
      ),
      p(
        "Find the DOT code on each tire's sidewall. It's a series of 8-13 characters ending in a 4-digit number — that 4-digit number is the manufacturing date: the first two digits are the week, the last two are the year. A code ending in '2519' means the tire was made in the 25th week of 2019."
      ),

      img(
        "bing:tire dot code sidewall date manufacture",
        "Tire sidewall showing DOT code and date of manufacture",
        "The DOT date code lives on every tire's sidewall — and it tells you how close the tire is to age-related failure."
      ),

      h3("Tire pressure"),
      p(
        "Check pressure cold (before driving more than a mile or two). The recommended pressure is on a sticker inside the driver's door jamb — not the maximum pressure printed on the tire sidewall. Underinflated tires generate heat, accelerate wear, and increase blowout risk; overinflated tires reduce traction and crash safety."
      ),
      p(
        "If you'll be loading the car heavily (luggage, passengers, roof box), add 3-5 PSI to compensate. The door-jamb sticker often includes both 'normal' and 'fully loaded' recommended pressures."
      ),

      h3("Tread depth"),
      p(
        "Use a tread depth gauge or the penny test (Lincoln's head down — if you can see the top of his head, you have less than 2/32\" tread and the tire is legally bald). For long highway trips in summer rain, aim for at least 4/32\" remaining tread. Wet-weather grip degrades rapidly below that threshold."
      ),

      h2("Step 3: Brake inspection (5 minutes)"),
      p(
        "Look through the spokes of each wheel at the brake pad through the caliper opening. You can usually see a sliver of pad material. New pads are 10-12mm thick; replace at 3mm. If the metal backing plate is visible through the pad, you're driving on metal-on-metal — book service immediately and don't take the trip."
      ),
      p(
        "Take the car around the block and brake hard from 30 mph. Listen for grinding (worn pads), high-pitched squealing (often a wear indicator deliberately triggered), and feel for pulsation through the pedal (warped rotors). Any of these suggests a service visit before a long trip — not after."
      ),

      h2("Step 4: Fluid levels (5 minutes)"),
      ...bullets([
        "Engine oil — check on level ground after the engine has been off 5+ minutes. Level should be between the marks; color should be amber to light brown (very dark or black is overdue for a change).",
        "Coolant — check the overflow reservoir level; should be between MIN and MAX marks. NEVER open the radiator cap on a hot engine.",
        "Brake fluid — reservoir under the hood; should be between MIN and MAX. Dark brown fluid needs flushing.",
        "Power steering fluid (if applicable) — most newer cars are electric power steering with no fluid to check.",
        "Washer fluid — top it off. You'll go through more than you expect on highway bugs.",
        "Transmission fluid (if your car has a dipstick — many newer cars don't) — color should be red or pink, not brown or burnt-smelling.",
      ]),

      h2("Step 5: Battery test (5 minutes)"),
      p(
        "Most parts stores (AutoZone, O'Reilly, Advance) test batteries for free. A battery older than 3 years should be tested before a long trip. Heat is brutal on batteries; a marginal battery that's been getting by all winter can fail unexpectedly in summer."
      ),
      p(
        "Visually check the terminals for corrosion (white or green powder) and clean if needed. Check the date code on the battery — most have a sticker with the manufacture date. Most batteries last 3-5 years; if yours is past 4 and you're driving cross-country, replacing it proactively is cheaper than the cost of a tow."
      ),

      callout(
        "warning",
        "The summer heat trap",
        "Every system on your car works harder in summer heat. Battery life drops. Tire pressure rises. Engine cooling system is at peak load. AC compressor is under continuous strain. The right time to find weaknesses is in a parking lot near your home — not in the middle of a desert with no cell coverage."
      ),

      h2("Bonus: items to throw in the trunk"),
      ...bullets([
        "Tire pressure gauge (digital is more accurate than dial).",
        "Tire repair kit + 12V air compressor (or a working spare + jack + lug wrench).",
        "Jumper cables or a portable jump-starter.",
        "Quart of motor oil matching your car's spec.",
        "Gallon of water (engine coolant emergencies AND drinking).",
        "Flashlight or headlamp with fresh batteries.",
        "First-aid kit.",
        "Roadside reflective triangles or flares.",
        "Phone charger that works without the engine running.",
        "Paper map of the regions you're traveling through (cell coverage gaps are real).",
      ]),

      h2("On the road: what to watch for"),
      ...bullets([
        "Tire pressure can drop suddenly — most cars have a TPMS warning light; pull over and check immediately if it lights up.",
        "Engine temperature gauge climbing into the red — pull over and let it cool; never open the radiator cap hot.",
        "Brake fade on long downhill grades — downshift to use engine braking and give the brakes time to cool.",
        "Wind drift suddenly worse than before — could indicate a developing tire problem.",
        "Battery / charging light coming on — limit electrical loads (turn off AC, accessories) and head to the nearest service station.",
      ]),

      callout(
        "info",
        "What to do next",
        "Before your next road trip: run the VIN recall check tomorrow, then the rest of the inspection 24-48 hours before departure (so there's time to book service if you find something). Thirty minutes of inspection beats six hours on the side of an interstate in July."
      )
    ),
  },

  // ───────────────────────────────────────────────────────────────────
  // 16. Why used-car prices drop in July
  // ───────────────────────────────────────────────────────────────────
  {
    slug: "why-used-car-prices-drop-in-july",
    title: "Why Used Car Prices Drop in July (And When to Pounce)",
    seoTitle: "Why Used Car Prices Drop in July (2026)",
    seoDescription:
      "Used car prices reliably soften in July and August as dealers clear inventory for new model-year arrivals. Here's the pattern and the buyer's playbook.",
    excerpt:
      "Used car prices reliably soften in July and August as dealers clear inventory for new model-year arrivals. Here's the pattern, the reasons, and when to actually pounce.",
    focusKeyword: "why used car prices drop in july",
    keywords: [
      "best time to buy used car",
      "summer used car prices",
      "july car sales",
      "model year changeover used car",
      "used car market timing",
    ],
    category: "market-insights",
    tags: ["pricing", "market-timing", "summer", "negotiation", "dealer"],
    publishedAt: "2026-06-09T10:00:00.000Z",
    heroImageUrl: HERO_PLACEHOLDER,
    heroImageAlt: "Used car dealership lot with summer clearance pricing signs",
    body: body(
      p(
        "Used car prices in the United States follow a remarkably consistent seasonal pattern. Year after year, the wholesale and retail price indices show the same shape: a peak in the spring (tax-refund-driven demand colliding with limited supply), a plateau through early summer, then a 3-6% softening through July and August as dealers begin clearing aging inventory to make room for the autumn arrival of new model-year vehicles."
      ),
      p(
        "For buyers, that means there's a real, measurable window when prices are softer than at any other time of the calendar year — and dealers have unusual flexibility on margin. Here's why the pattern happens and how to take advantage of it."
      ),
      callout(
        "tip",
        "The window",
        "Mid-July through Labor Day weekend is the sweet spot. Dealers' aging-inventory pressure peaks in the last 60 days before autumn floor plan rotation. Combine that timing with end-of-month and end-of-quarter close pressure for stackable leverage."
      ),
      img(
        "bing:used car dealership lot summer sale",
        "Used car dealership lot with summer clearance signage",
        "Late July through August is when dealer aging-inventory pressure peaks — and when the most flexibility on price exists."
      ),

      h2("The structural cause: dealer floor plan rotation"),
      p(
        "Used car dealers don't typically own their inventory outright. Most finance their inventory through a 'floor plan' — a short-term revolving credit facility from a lender (Chase, NextGear, AFC) that charges interest by the day for every vehicle on the lot. A typical used vehicle costs the dealer $8-15 per day in floor plan interest while it sits."
      ),
      p(
        "The math gets ugly fast for aged inventory. A car that's been on the lot 90 days has cost the dealer $720-1,350 in interest alone, plus depreciation, insurance, and lot-handling costs. At day 60, the dealer is feeling pressure. At day 90, the math is screaming. By day 120, the dealer is often willing to take a small loss just to get the car off the floor plan."
      ),

      h2("Why summer specifically"),
      p(
        "Three forces converge between mid-July and late August to amplify aging-inventory pressure:"
      ),
      h3("1. Autumn model-year changeover"),
      p(
        "New-vehicle inventory begins arriving at franchised dealers in August and September. New cars sold means trade-ins absorbed — which means used-car departments need empty space to receive them. The cars that have been sitting longest on the used lot have to go first."
      ),

      h3("2. Tax-refund demand fades"),
      p(
        "The biggest demand surge of the year for used cars comes in late February through April, fueled by tax-refund spending. That demand pulls inventory rapidly. By July, the tax-season buyers have largely been absorbed; remaining demand is more rational and price-sensitive."
      ),

      h3("3. Auction-supply lift"),
      p(
        "Wholesale auctions see increased supply in summer as rental car companies cycle out fleet vehicles. Dealers can replace cleared inventory cheaply at auction, which both increases supply on the retail lot and gives dealers more confidence to take aggressive trade-in offers."
      ),

      img(
        "bing:used car auction dealer wholesale lot",
        "Wholesale used car auction with cars lined up for sale to dealers",
        "Increased summer auction supply gives dealers cheap replacement inventory — which translates to more flexibility on the cars already on their lot."
      ),

      h2("Which segments soften most"),
      ...bullets([
        "Convertibles and roadsters — counterintuitive but real: by July most convertible buyers have already bought, leaving dealers stuck with inventory until next spring.",
        "Larger SUVs and minivans — family-vehicle buyers are typically settled before summer travel begins.",
        "Trucks — pickup demand spikes around tax season and during construction-season fleet purchases (typically Q1 and Q4); summer is the soft window.",
        "Higher-mileage vehicles (over 80,000 miles) — these turn slowest in any season and feel the aging pressure most.",
        "Aged trade-ins from spring tax-season sales — many spring trade-ins are still on the lot in July.",
      ]),

      h2("Which segments don't soften (or soften less)"),
      ...bullets([
        "Compact and fuel-efficient cars — gas-price sensitivity props up demand year-round, especially in summer.",
        "Recent model-year (1-2 years old) certified pre-owned — supply is constrained and demand from lease-up buyers is steady.",
        "Specialty performance and collector vehicles — these follow their own calendar tied to events and shows.",
        "Very low-mileage examples of popular models — always priced at a premium regardless of season.",
      ]),

      h2("The buyer's playbook"),

      h3("1. Identify aging inventory before you visit"),
      p(
        "Most dealer websites display the date a vehicle was listed (or 'days on lot'). When browsing, sort by oldest first. Aim for vehicles that have been on the lot 60+ days. Those are the cars the dealer is feeling most pressure to move."
      ),

      h3("2. Time your visit"),
      p(
        "End of month (last 3-5 days) and end of quarter (last week of June, September, December) intensify the dealer's incentive to move metal. Late July through end of August stacks the summer-clearance dynamic on top of normal end-of-month pressure. The strongest single window is the last week of August."
      ),

      h3("3. Lead with a fair number, not a lowball"),
      p(
        "Negotiation in this environment isn't about insulting the dealer; it's about being the buyer they want to take a thin margin from to clear inventory. Show up with a printout of three comparable listings (KBB, AutoTrader, CarGurus) and a respectful opening offer that reflects what those comparables are actually transacting at."
      ),

      h3("4. Run the VIN history report before the negotiation"),
      pLink(
        "Pull a ",
        ["VIN history report", "/vin-check"],
        " on the specific car you're considering. If there are any meaningful items in the history (a minor accident, a previous total-loss event, multi-state title hopping), use them as legitimate negotiating points. \"I'm comfortable with the moderate front-end accident from 2022, but it does reduce comparable value by about $1,500 — can we work toward that number?\""
      ),

      h3("5. Don't bring trade-in pressure into the cash deal"),
      p(
        "Negotiate the cash price of the car you're buying first, separately from any trade-in. Once you have the cash price agreed, then discuss trade-in. Mixing the two negotiations is how dealers obscure where the actual savings (or non-savings) are coming from."
      ),

      h3("6. Walk if the deal doesn't close"),
      p(
        "Inventory pressure is real but it's not infinite. If a dealer won't move on a 90-day-aged unit at the end of July, that's a signal they're either confident they can hold the price or they have specific cost basis constraints. Walk. There are plenty of other aged units at plenty of other dealers in the same window."
      ),

      callout(
        "warning",
        "The 'we'll lose money on this' line",
        "Almost every dealer will tell you at some point that they'd 'lose money' on the deal at your number. Take it with a grain of salt. The 'cost basis' the dealer is quoting often doesn't include the floor plan interest they've already eaten, the depreciation they've already absorbed, and the cost of continuing to hold the car. A genuine loss-leader sale is rare; what's common is a deal that's less profitable than the dealer would prefer."
      ),

      h2("Beyond July: the full year of timing windows"),
      ...bullets([
        "Late February–April — worst time to buy (tax-refund demand surge, lowest dealer flexibility).",
        "May–June — slightly softer than spring peak; new-car-shopper trade-ins start arriving.",
        "July–August — best window of the year for used cars.",
        "September–October — model-year changeover lifts new-car incentives, which can push trade-in values down (good if you're buying without trading; mixed if you are).",
        "November–December — slow buyer traffic, but limited inventory; year-end push can yield specific deals if you're flexible on the exact car.",
        "January — quiet, modestly soft prices.",
      ]),

      h2("Watch the macro indicators"),
      p(
        "Two free public data sources track used-car prices in close to real time:"
      ),
      ...bullets([
        "Manheim Used Vehicle Value Index — published monthly by Cox Automotive; tracks wholesale prices that flow through to retail with about a 60-day lag.",
        "Edmunds + KBB market reports — published quarterly; track retail transaction prices by segment.",
      ]),
      p(
        "Watching these lets you spot whether the seasonal pattern is holding in any given year. Years with abnormal supply shocks (semiconductor shortages, fleet returns, dramatic rate changes) can scramble the normal pattern."
      ),

      callout(
        "info",
        "What to do next",
        "If you're shopping for a used car this summer, identify 2-3 specific vehicles you want, find dealers with aged inventory examples (60+ days on lot), and time a visit in late July or August. Combine the seasonal window with end-of-month timing for the strongest negotiating position of the year."
      )
    ),
  },
];
