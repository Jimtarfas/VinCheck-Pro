/**
 * June 2026 — Batch 2 of 4.
 * High-intent buying / VIN-education posts.
 */

import { body, bullets, callout, h2, h3, img, numbered, p, pLink } from "./helpers";
import type { PostInput } from "../types";

const HERO_PLACEHOLDER =
  "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=1600&q=80";

export const JUN_BATCH_2: PostInput[] = [
  // ───────────────────────────────────────────────────────────────────
  // 5. Lien check before buying
  // ───────────────────────────────────────────────────────────────────
  {
    slug: "how-to-check-if-a-used-car-has-a-lien",
    title: "How to Check if a Used Car Has a Lien Against It",
    seoTitle: "Lien Check on a Used Car: 3 Ways That Actually Work",
    seoDescription:
      "If a car still has a loan against it, the bank can repossess it after you buy. Here are the three ways to verify a lien is clear before you transfer cash.",
    excerpt:
      "Buy a car with an undisclosed lien and the bank can repossess it from you. Here are the three ways to verify the title is free and clear before cash changes hands.",
    focusKeyword: "how to check if a used car has a lien",
    keywords: [
      "vehicle lien check",
      "lien free title",
      "used car loan check",
      "title lien holder",
      "private party lien verification",
    ],
    category: "buying-guides",
    tags: ["lien", "title", "private-party", "financing", "vin"],
    publishedAt: "2026-05-19T10:00:00.000Z",
    heroImageUrl: HERO_PLACEHOLDER,
    heroImageAlt: "Used car title document with lien holder section highlighted",
    body: body(
      p(
        "When someone finances a car, the lender's name goes on the title as the lienholder. Until the loan is paid in full, the lender — not the driver — owns the car in any practical legal sense. If you buy a car with an outstanding lien, the lender can repossess it from you even though you paid the seller in good faith. Your only recourse is to sue the seller for the money you handed over, which is fine if they're solvent and findable, and a catastrophe if they're not."
      ),
      p(
        "This guide walks through the three independent ways to verify a car's title is free and clear before you transfer cash. None of them takes more than 15 minutes. All three together cost less than $30."
      ),
      callout(
        "tip",
        "60-second answer",
        "1. Look at the physical title document — the lienholder section should be either blank or explicitly stamped \"released.\" 2. Run a VIN check through your state DMV or a third-party report. 3. If a lien is shown, get the loan payoff letter from the lender and pay them directly at closing. Never wire money to a private seller who claims they'll \"pay off the loan after.\""
      ),
      img(
        "bing:car title document lien holder release",
        "Vehicle title document showing lien holder section and release stamp",
        "The physical title is the first thing to check — but it's not the only thing."
      ),

      h2("Why an undisclosed lien is the worst-case private-party purchase"),
      p(
        "In most US states, when you pay a private seller for a car, what you're buying is a piece of paper called a 'Bill of Sale' and (ideally) a signed title transfer. You file these with your state DMV to register the car in your name. If the DMV detects an active lien on the VIN, the title transfer is rejected. You now own a car you can't register, the seller has your cash, and the lender — whose lien is still active — is legally entitled to repossess the vehicle from wherever it sits."
      ),
      p(
        "The legal doctrine that protects you in most consumer transactions (the 'bona fide purchaser' rule) is much weaker for cars than for almost anything else. Vehicle titles are governed by state-specific lien-perfection rules, and a lien properly recorded with the DMV survives any private-party transfer — even if you had no idea it existed."
      ),

      h2("Check 1: Read the physical title carefully"),
      p(
        "Every state's vehicle title has a 'Lienholder' or 'First Lienholder' section, usually on the front of the certificate. There are three possibilities:"
      ),
      ...numbered([
        "The section is blank — the car has no recorded lien. This is the easiest case but doesn't prove the absence of a lien added after the title was last printed.",
        "The section names a lender (e.g. \"Chase Auto,\" \"Ally Financial\") with no release stamp — there's an active lien. Do not buy the car from a private seller in this state.",
        "The section names a lender and has a release stamp/signature/perforation — the lien has been paid off and the title is free. Look closely at the release: it should be a physical stamp from the lender, a perforation through the lender's name, or a signed release on lender letterhead attached to the title.",
      ]),
      p(
        "If the seller hands you a printed title with the lienholder section blank but says 'I just paid it off last month, the DMV will update,' that's not enough. Insist on either a fresh title from the DMV with the section blank, or written lien-release documentation from the lender."
      ),

      h2("Check 2: VIN-based lien lookup"),
      p(
        "Many states let you check title status by VIN directly through the DMV — California, Florida, New York, Texas, and Illinois all offer free or low-cost lookups. Search your state DMV website for 'VIN title status' or 'lien status check.' Results vary by state but typically tell you whether the title is currently held by the DMV (active lien) or has been mailed to the owner (no lien)."
      ),
      pLink(
        "For a more comprehensive view, a ",
        ["paid vehicle history report", "/vin-check"],
        " includes the most recent title status across all states the car has been registered in, plus any reported lien activity. The report won't always show a current lien balance, but it will tell you whether the most recent recorded title was issued to a lienholder or to the owner — which is enough to know whether to proceed."
      ),

      img(
        "bing:dmv vin lookup vehicle title status",
        "DMV website showing VIN-based title and lien lookup",
        "Most state DMVs let you check title and lien status by VIN — often for free."
      ),

      h2("Check 3: Get the payoff letter from the lender"),
      p(
        "If the title shows an active lien but the seller wants to sell the car anyway (common when someone needs to sell mid-loan), the only safe way to close the deal is to pay the lender directly at the time of sale."
      ),
      p(
        "Ask the seller to call their lender and request a '10-day payoff letter' — a document showing the exact amount needed to satisfy the loan if paid within 10 business days, plus the lender's name, mailing address, and remittance instructions. Most lenders will email or fax this within a few hours."
      ),
      p(
        "At closing, instead of paying the seller the full purchase price, you pay the lender directly for the payoff amount (cashier's check or wire) and pay the seller the difference. The lender mails the lien release and the title to you (or to your DMV) typically within 30 days. Some states allow electronic title transfers that complete faster."
      ),

      h2("Specific red flags for hidden liens"),
      ...bullets([
        "Seller offers an unusually low price and pressures a same-day cash transaction.",
        "Title is missing or 'at the bank' (suggests the bank still holds it as collateral).",
        "Seller's name on the title doesn't match their ID (could be a dealer trying to flip without proper title transfer).",
        "Title is a duplicate or replacement (any chance it was issued to hide a lien on the original).",
        "Seller is moving out of state imminently or has another urgent reason to close fast.",
        "The car is a recent model year (2-5 years old) being sold by a private seller — most are still under loan in that age bracket.",
      ]),

      callout(
        "warning",
        "Never wire money to 'pay off the loan after the sale'",
        "A common scam: the seller says \"give me $20,000, I'll pay off the loan with it, and the lender will release the title in a week.\" Once the cash leaves your hands you have no leverage. If the seller doesn't pay the loan, you own a financed car and lose your money. Always pay the lender directly."
      ),

      h2("What to do at the DMV after a clean purchase"),
      p(
        "Once you have the signed title, the bill of sale, and (if applicable) the lien release letter, take everything to your state DMV within the title-transfer deadline (typically 10–30 days). The DMV issues a new title in your name. If you financed your own purchase, the new title shows your lender as the lienholder. If you paid cash, the new title shows you as the sole owner and is mailed to your address."
      ),
      p(
        "Keep copies of every document for at least seven years. If a dispute over the title ever arises later, this paperwork is your only evidence that you bought the car in good faith."
      ),

      callout(
        "info",
        "What to do next",
        "Before you transfer money on any private-party used car: look at the title's lienholder section, run a VIN lookup through your state DMV or a paid report, and — if any lien shows — pay the lender directly at closing. Three checks, under thirty minutes, under $30."
      )
    ),
  },

  // ───────────────────────────────────────────────────────────────────
  // 6. Why no records in VIN report
  // ───────────────────────────────────────────────────────────────────
  {
    slug: "why-does-my-vin-show-no-records",
    title: "Why Does My VIN Show No Records? (And When to Worry)",
    seoTitle: "Why Does My VIN Show No Records?",
    seoDescription:
      "A blank VIN history report can be perfectly normal — or a sign of a counterfeit VIN. Here's how to tell the difference in five minutes.",
    excerpt:
      "An empty VIN report doesn't always mean fraud. Here's how to tell the harmless explanations from the genuinely concerning ones, in five minutes.",
    focusKeyword: "why does my vin show no records",
    keywords: [
      "blank vin report",
      "no records found vin",
      "vin not in nmvtis",
      "new car no history",
      "counterfeit vin",
    ],
    category: "vin-education",
    tags: ["vin", "nmvtis", "history-report", "new-car", "counterfeit"],
    publishedAt: "2026-05-22T10:00:00.000Z",
    heroImageUrl: HERO_PLACEHOLDER,
    heroImageAlt: "Empty vehicle history report screen showing no records found",
    body: body(
      p(
        "You paid for a vehicle history report, you entered the VIN, and the result came back blank — no title records, no accident reports, no service entries. The natural first reaction is to panic. The actual answer is more interesting: a blank VIN report is sometimes the most reassuring result you could get, and sometimes the most alarming. The trick is knowing which one you're looking at."
      ),
      p(
        "Here's the playbook for interpreting a blank or near-blank VIN history report in 2026."
      ),
      callout(
        "tip",
        "60-second answer",
        "If the car is brand new (under one year old), no records is normal — there's nothing to report yet. If the car is 3+ years old and you got no records, it's either a database mismatch (try a different report provider) or a fabricated/counterfeit VIN (walk away)."
      ),
      img(
        "bing:vehicle history report no records found screen",
        "Vehicle history report screen showing no records found message",
        "A blank report is sometimes good news, sometimes terrible news — context decides which."
      ),

      h2("Reason 1: The vehicle is genuinely new"),
      p(
        "A vehicle that was manufactured within the last 12 months and hasn't been registered, inspected, sold, or had any insurance claim filed against it will have no entries in NMVTIS, the federal database that powers most history reports. NMVTIS is fed by state DMVs (which report when a title is issued), insurance carriers (when claims are filed), and junk/salvage yards (when a car is processed). If none of those events have happened, there's nothing to retrieve."
      ),
      p(
        "This is the expected and reassuring case. A 2026 model year car with delivery mileage and a clean MCO (Manufacturer's Certificate of Origin) won't appear in NMVTIS until its first title is issued."
      ),

      h2("Reason 2: The car has only been registered in one state, recently"),
      p(
        "NMVTIS data flows to the federal repository on different schedules from different states. Some states submit in near-real-time; others batch updates every 24–72 hours. A car that was titled in California last week may not appear in a NMVTIS query you run today. Wait 7–10 days and re-run the report; if it appears, the system was simply catching up."
      ),

      img(
        "bing:nmvtis vehicle history database screen",
        "NMVTIS database query interface showing vehicle history lookup",
        "NMVTIS receives data from 50 state DMVs on staggered schedules — a brand-new title can take days to propagate."
      ),

      h2("Reason 3: The VIN you entered is malformed"),
      p(
        "VINs are 17 characters and contain no letters I, O, or Q (to prevent confusion with the digits 1 and 0). A common cause of a 'no records' result is a single character mis-typed at lookup time. Re-check the VIN against the physical car: it should be visible on the dashboard near the windshield base, on the driver's-side door jamb sticker, and on the title document. If any of those three don't match what you entered, run the report again with the correct VIN."
      ),

      h2("Reason 4: The vehicle is a manufacturer recall buyback or pre-production"),
      p(
        "Cars that were bought back by the manufacturer under lemon law or recall buyback programs sometimes have NMVTIS records suppressed pending re-titling. Pre-production engineering vehicles, press-fleet cars, and some fleet vehicles also have non-standard NMVTIS profiles. These are uncommon in private-party sales but do exist."
      ),

      h2("Reason 5 (the worrying one): The VIN doesn't correspond to a real vehicle"),
      p(
        "If the car is 3+ years old, has been driven, and yet has zero records in any database — that's a strong signal something is wrong. The most common explanation is a counterfeit or cloned VIN: the physical VIN plate on the car was altered or replaced. The original VIN belonged to a real car that's been crushed, scrapped, or shipped overseas; the new VIN was fabricated or copied from a different car."
      ),

      callout(
        "warning",
        "The cloned-VIN scenario",
        "An organized auto-theft ring takes a stolen vehicle, then finds a similar car on a public sale listing. They duplicate the legitimate car's VIN onto the stolen one. When you look up the cloned VIN, you may get a clean history (because the real car's history is clean) — but when you compare the VIN locations on the car you're inspecting, they don't all match. Always verify the VIN appears identical on the dashboard, the door jamb, the engine block, and the title document."
      ),

      h2("What to do when you get a blank report"),

      h3("Step 1: Verify the VIN itself"),
      p(
        "Physically read the VIN from the dashboard (visible through the windshield), the driver's door jamb sticker, the engine block stamping, and the title document. They must all match each other character-for-character. If they don't, the car is misrepresented — walk away."
      ),

      h3("Step 2: Cross-check with a second source"),
      pLink(
        "Run the VIN through ",
        ["a second VIN history report provider", "/vin-check"],
        " (different providers query slightly different data partners) and through the free NHTSA VIN decoder. A real VIN will decode into a real make, model, year, and country of manufacture. If the NHTSA decoder rejects the VIN or returns mismatched specs, the VIN is fabricated."
      ),

      h3("Step 3: Look at the title"),
      p(
        "A real car has a title trail. Even brand-new cars have an MCO (Manufacturer's Certificate of Origin) before they get a state-issued title. Ask the seller for the title and look at the issue date. A title issued years ago for a car with no NMVTIS history is suspicious."
      ),

      h3("Step 4: Compare physical features to the VIN's decoded specs"),
      p(
        "The first three characters of a VIN identify the world manufacturer (e.g. '1HG' = Honda made in USA, 'WBA' = BMW made in Germany). Positions 4–8 encode model and body style; position 10 is the model year. If the VIN decodes to 'Honda Civic 2018 sedan' but the car you're looking at is a Honda Accord coupe, the VIN doesn't belong to this car."
      ),

      h2("When a clean blank report is actually good"),
      ...bullets([
        "The car is a current or prior model year with delivery-mileage odometer (you're buying a new or near-new car from a dealer).",
        "The previous owner has the original window sticker, MCO documentation, and dealer purchase paperwork to back up the story.",
        "The VIN matches in every physical location and decodes cleanly through NHTSA.",
        "The seller's name on the title matches the registration and their government ID.",
      ]),

      h2("When a blank report is a deal-breaker"),
      ...bullets([
        "The car is 3+ years old and clearly has wear consistent with normal use.",
        "The seller can't produce a title, or the title was issued recently from a state where the car has never been registered.",
        "The VIN doesn't match across all physical locations on the car.",
        "The NHTSA VIN decoder either rejects the VIN or returns specs that don't match the car you're looking at.",
        "The seller becomes evasive when you mention you'd like an independent inspection or a second report.",
      ]),

      callout(
        "info",
        "What to do next",
        "If you got a blank report on a recent-model car, that's expected. If you got a blank report on an older car, verify the VIN physically and through a second provider before paying anything. A blank report on a 2018 Honda is far more concerning than a blank report on a 2026 Toyota."
      )
    ),
  },

  // ───────────────────────────────────────────────────────────────────
  // 7. Cheap-cars VIN check (under $5k)
  // ───────────────────────────────────────────────────────────────────
  {
    slug: "vin-check-cars-under-5000-dollars",
    title: "VIN Check for Cars Under $5,000: What to Watch For",
    seoTitle: "Buying a Car Under $5K? Run This VIN Check First",
    seoDescription:
      "Cheap used cars hide more problems per dollar than any other segment. Here's the VIN-and-physical checklist that catches the worst risks under $5,000.",
    excerpt:
      "Sub-$5K used cars hide more problems per dollar than any other category. Here's the VIN check, physical inspection, and walk-away rules that protect you.",
    focusKeyword: "vin check cars under 5000",
    keywords: [
      "cheap used car checks",
      "vin check budget car",
      "buying a car under 5000",
      "used car inspection cheap",
      "salvage budget car",
    ],
    category: "buying-guides",
    tags: ["budget", "cheap", "inspection", "vin", "first-car"],
    publishedAt: "2026-05-26T10:00:00.000Z",
    heroImageUrl: HERO_PLACEHOLDER,
    heroImageAlt: "Affordable used car for sale with handwritten price sign in windshield",
    body: body(
      p(
        "The under-$5,000 used-car market is the riskiest segment of the entire used-vehicle world — and it's also the most important to get right, because buyers in this price band typically have the least margin for a bad purchase. A $4,000 car that needs a $3,000 transmission within six months is a financial disaster; the same problem on a $25,000 car is an annoyance."
      ),
      p(
        "Here's the focused VIN-and-physical checklist that catches the worst risks in this price band before you commit cash. The order matters: cheaper risks to check come first, expensive ones last."
      ),
      callout(
        "tip",
        "60-second answer",
        "Run a VIN history report (~$15) before the test drive. Check the title brand, the odometer history, and any reported total-loss events. Then do a 15-minute physical inspection focused on fluid leaks, frame straightness, and electrical health. Reject anything with a salvage or rebuilt title at this price band unless you have a mechanic backing you up."
      ),
      img(
        "bing:cheap used car for sale lot budget",
        "Budget used cars displayed at a small dealership lot",
        "The cheapest cars on any lot are the ones that have been there longest — usually for a reason."
      ),

      h2("Why sub-$5K is the highest-risk segment"),
      p(
        "Cars selling for less than $5,000 in 2026 fall into a few specific buckets. Each has its own risk profile."
      ),
      ...bullets([
        "10-15 year old mainstream sedans (Camry, Accord, Corolla) with 150,000+ miles — usually mechanically sound but with deferred maintenance.",
        "8-12 year old US-brand vehicles (Focus, Cruze, Cobalt) — known model-specific issues that depress value.",
        "Salvage / rebuilt title vehicles of more recent vintage — drivable but with all the branded-title downsides.",
        "Flood, hail, or accident vehicles being moved through low-end dealer lots after light cosmetic repair.",
        "First-generation hybrid or EV vehicles with battery degradation that's not yet catastrophic.",
      ]),
      p(
        "Each bucket can produce a great deal or a disaster. The only way to know which one a specific car belongs to is the combination of a vehicle history report and a competent inspection."
      ),

      h2("Step 1: Vehicle history report (before the test drive)"),
      pLink(
        "Spend the $10–20 on a ",
        ["full NMVTIS-backed history report", "/vin-check"],
        " before you drive to see the car. The report will surface every title brand, every state of registration, every reported total-loss event, every odometer reading, and every recorded insurance claim. In the under-$5K segment, the things you're most likely to find that should kill the deal are:"
      ),
      ...bullets([
        "Salvage or rebuilt title — at this price band you usually can't afford the insurance and resale penalties.",
        "Flood total-loss event in the last 10 years — corrosion is a permanent enemy.",
        "Multiple state-hopping in a short window (e.g. 3 states in 2 years) — strong indicator of title washing or commercial flipping.",
        "Odometer history with a downward step — the car was rolled back.",
        "Recent (last 12 months) total-loss event with no rebuilt title issued — title may not be valid for road use.",
      ]),

      img(
        "bing:car frame rust corrosion undercarriage",
        "Rusted and corroded vehicle frame undercarriage",
        "Frame and floor-pan rust is the single most expensive thing to inherit on a budget car."
      ),

      h2("Step 2: Physical inspection (the 15-minute version)"),
      p(
        "If the history report passes, drive to see the car with a flashlight, a pair of cheap nitrile gloves, and a magnet. The walk-around takes 15 minutes and catches 80% of the problems that should kill a sub-$5K purchase."
      ),

      h3("Outside"),
      p(
        "Look down the side panels at a shallow angle. Paint waves and color mismatches indicate body work — fine on its own, but a clue to look harder elsewhere. Use the magnet on metal body panels to test for filler (the magnet won't stick to filler). Examine every panel gap; uneven gaps indicate either a previous accident or a poor reassembly."
      ),

      h3("Under the hood"),
      p(
        "Look for oil leaks at the valve cover, the oil pan, and the transmission case. Surface dust or grease is normal; wet, oily residue with road grime stuck to it is a leak. Smell the engine oil on the dipstick — gasoline or coolant smell indicates internal damage. Pull the radiator cap (cold engine only) and look for an oil sheen on the coolant; that's a head gasket telltale."
      ),

      h3("Underneath"),
      p(
        "Crawl under the car (or have a mechanic do it). Look at the frame rails and floor pans. Surface rust is normal; flaking, pitted, or perforated metal is not. Look at the brake lines, fuel lines, and exhaust hangers — wholesale corrosion replacement is a $1,500+ job and on a $4,000 car the math doesn't work."
      ),

      h3("Inside"),
      p(
        "Smell for mildew. Lift the floor mats and feel the carpet. Pull the back seat (most lift out with a tug). Check that every electrical accessory works: windows, locks, heated seats, infotainment, climate, defroster, mirrors. Multiple electrical glitches on an older car suggest flood damage or rodent-chewed wiring."
      ),

      h3("Test drive"),
      p(
        "Drive at least 15 minutes including stop-and-go, highway speed, and a full-throttle acceleration. Listen for transmission slippage, drivetrain clunks, and brake pulsation. Pull over and check fluid levels are unchanged. Park, leave the engine running, and walk around looking for new leaks dripping onto the ground."
      ),

      h2("Walk-away triggers at this price point"),
      ...bullets([
        "Salvage or rebuilt title (unless you're a mechanic and have inspected the original repair invoice).",
        "Any check-engine light that the seller hasn't already diagnosed — the diagnosis often costs more than the car's worth.",
        "Frame rust beyond surface staining — structural welding is uneconomical at this price.",
        "Transmission slippage under load — replacement averages $2,500-4,000.",
        "Multiple flood indicators on a car not titled in a coastal state — title washing.",
        "Seller won't release the VIN for a history report or won't allow a pre-purchase inspection.",
      ]),

      callout(
        "warning",
        "The 30% rule for cheap cars",
        "Budget a repair fund equal to 30% of the purchase price for the first 6 months of ownership. A $4,000 car needs a $1,200 cushion. If you can't put that aside, you can't actually afford that car — buy something cheaper and bank the difference, or wait until you can afford to buy in the $7,000–$9,000 band where reliability sharply improves."
      ),

      h2("The case for spending slightly more"),
      p(
        "Reliability data on used vehicles in 2026 shows a clear inflection point at the $7,000–$10,000 mark for typical 8–12 year old sedans. Below that line, the cars selling are largely those with significant deferred maintenance, branded titles, or known mechanical issues. Above that line, the same models from the same year typically have full service history, clean titles, and lower remaining-life risk."
      ),
      p(
        "If you can stretch to $7,500 instead of $4,500, the expected total cost of ownership over three years often comes out lower despite the higher entry price. Run the numbers on a few candidates before committing to the cheapest option."
      ),

      callout(
        "info",
        "What to do next",
        "Decide on a maximum total budget (purchase + first-6-month repair cushion). Run a VIN history report on any car you're considering before you drive to see it. Reject anything with a salvage title, flood total-loss, or odometer rollback indicators. The cheapest car you can find is rarely the cheapest car you can own."
      )
    ),
  },

  // ───────────────────────────────────────────────────────────────────
  // 8. Facebook Marketplace VIN red flags
  // ───────────────────────────────────────────────────────────────────
  {
    slug: "facebook-marketplace-used-car-vin-red-flags",
    title: "Buying a Used Car on Facebook Marketplace: 7 VIN Red Flags",
    seoTitle: "7 VIN Red Flags on Facebook Marketplace Cars",
    seoDescription:
      "Facebook Marketplace has overtaken Craigslist for private car sales — and the scams have followed. Here are the seven VIN-related red flags to check.",
    excerpt:
      "Facebook Marketplace has overtaken Craigslist for private car sales — and so have the scams. These are the seven VIN-related red flags every buyer should check.",
    focusKeyword: "facebook marketplace used car vin",
    keywords: [
      "facebook marketplace car scams",
      "vin check marketplace",
      "private party car vin red flags",
      "marketplace stolen car",
      "facebook car listing fraud",
    ],
    category: "buying-guides",
    tags: ["facebook-marketplace", "private-party", "vin", "scams", "online"],
    publishedAt: "2026-05-29T10:00:00.000Z",
    heroImageUrl: HERO_PLACEHOLDER,
    heroImageAlt: "Smartphone showing a Facebook Marketplace used car listing",
    body: body(
      p(
        "Facebook Marketplace has quietly overtaken Craigslist as the dominant US platform for private-party used car sales — and the scam ecosystem has followed. Marketplace's tight integration with personal Facebook profiles gives some buyers a false sense of security: 'This guy has 400 friends and family photos, he can't be a scammer.' That's exactly what makes Marketplace scams effective."
      ),
      p(
        "Here are the seven VIN-related red flags that come up over and over in Marketplace listings. Any one of them is enough reason to ask harder questions before you drive to see the car."
      ),
      callout(
        "tip",
        "60-second answer",
        "The VIN should be in the listing photos (a clear shot of the dashboard plate). The seller's name should match the title. The car should be currently registered. The price should be within 15% of comparable listings. The seller should accept a pre-purchase inspection. If any of those four are off, ask why before you drive to see the car."
      ),
      img(
        "bing:facebook marketplace car listing smartphone",
        "Smartphone displaying a Facebook Marketplace used car listing",
        "Marketplace's tight integration with personal profiles isn't a substitute for VIN diligence."
      ),

      h2("Red flag 1: No VIN visible in the listing"),
      p(
        "Legitimate private sellers in 2026 have learned to put the VIN — usually a photo of the dashboard plate — directly in their listing photos. It signals seriousness and lets buyers run a history report before driving across town. A listing with no VIN visible isn't necessarily a scam, but you should ask for the VIN before scheduling a viewing. If the seller refuses to share it ('I don't want my car cloned'), end the conversation. VINs are visible to anyone walking past the car on a public street; refusing to share one signals something else is wrong."
      ),

      h2("Red flag 2: Stock photos instead of the actual car"),
      p(
        "Marketplace listings using only manufacturer press photos, dealer stock images, or photos with watermarks from other sellers are almost always either scams (no car exists) or relisted dealer inventory (you're not buying from the title holder). Ask the seller to text you photos that include a small handwritten sign with today's date — that takes 30 seconds for a real seller and is impossible for a scammer with stolen photos."
      ),

      img(
        "bing:used car dashboard vin plate photo",
        "Close-up photo of a vehicle VIN plate on the dashboard",
        "A clear dashboard-VIN photo in the listing is a signal of seriousness — and lets you run a history report before you drive over."
      ),

      h2("Red flag 3: Title issues mentioned only in private messages"),
      p(
        "A common pattern: the listing says 'clean title' but in the first private message the seller mentions 'oh, it has a salvage title but it drives perfect' or 'the title is in my brother's name but I have power of attorney.' Both of those should trigger a hard no — not because every salvage car or every power-of-attorney sale is fraudulent, but because the seller already lied in the public listing. If they'll lie about the title status, what else are they lying about?"
      ),

      h2("Red flag 4: Seller's profile is brand new or sparsely populated"),
      p(
        "Click through to the seller's Facebook profile. A profile created in the last 90 days, with fewer than 50 friends, no tagged photos, and a 'lives in' location that doesn't match the listing's city is the classic scam profile. Real local sellers usually have years-old profiles, school/work history that matches the listing area, and mutual friends with at least one of your connections."
      ),

      h2("Red flag 5: VIN history shows recent state changes"),
      pLink(
        "When you ",
        ["run a VIN history report", "/vin-check"],
        " on a Marketplace listing, look at the state-by-state title history. A car with five different states in the last three years is being commercially flipped — even if the current seller is presenting as a private party. The car was probably bought at a wholesale auction, driven across the country, and is being resold for a margin. That's not illegal, but it usually means the seller knows much less about the car's actual condition than they claim."
      ),

      h2("Red flag 6: Seller insists on cash and refuses any other payment method"),
      p(
        "Cashier's checks can be verified directly with the issuing bank in 10 minutes. ACH transfers are reversible for fraud. Escrow services exist specifically for high-value private-party transactions. A seller who refuses every option except physical cash is usually flagging that the title transfer is going to be ugly — fast cash now, then they're gone before you discover the problem."
      ),
      p(
        "Counterpoint: many legitimate private sellers prefer cash too. The combination to worry about is cash-only AND any other red flag from this list."
      ),

      h2("Red flag 7: Pressure to skip the pre-purchase inspection"),
      p(
        "Any honest seller of a used car will allow a buyer to take the car to an independent mechanic for a pre-purchase inspection (PPI). Reasonable conditions are normal: the buyer pays the inspection fee, the seller drives the car to a mutually agreed location, and the seller is present during the inspection. Sellers who refuse PPIs entirely, demand a non-refundable deposit before the PPI, or insist on using 'their guy' as the inspector are signaling that the car won't pass an honest inspection."
      ),

      callout(
        "warning",
        "The 'I'm out of state, just send the money' scam",
        "This one targets Marketplace buyers specifically. Listing looks great, photos check out, profile seems legitimate. First message: 'I'm working out of state for the next two weeks, my cousin has the car. Just send a deposit and I'll have a transport service deliver it.' Never. Never wire money for a car you haven't seen in person, regardless of how convincing the story is."
      ),

      h2("The Marketplace-specific verification stack"),
      ...numbered([
        "Get the VIN from the listing or by asking. Run a free NHTSA VIN decoder check (vpic.nhtsa.dot.gov) to confirm year/make/model match the listing.",
        "Run an NMVTIS-backed history report on the VIN. Look for title brands, accident records, state history, and odometer trajectory.",
        "Click through to the seller's Facebook profile. Check profile age, friends count, mutual friends, and location consistency.",
        "Schedule an in-person viewing at the seller's home address (or a public location like a police-station meet-up spot in their city — most police departments have a designated parking area for private-party sales).",
        "Inspect the car. Match all VIN locations (dashboard, door jamb, engine block, title) and seller ID to the name on the title.",
        "Have an independent mechanic do a pre-purchase inspection before any money changes hands.",
        "Pay at a bank, with the title transferred in front of you, in exchange for a cashier's check made out to the seller by name.",
      ]),

      h2("If you've already been scammed"),
      p(
        "File a report with the FTC (reportfraud.ftc.gov), your state attorney general's consumer protection division, the local police department in the seller's claimed location, and Facebook (Marketplace > Help > Report). The probability of recovering the money is low, but each report adds to the evidence trail if the scammer is eventually prosecuted."
      ),

      callout(
        "info",
        "What to do next",
        "If you're shopping Marketplace, build a quick checklist on your phone: VIN visible in listing, NHTSA decoder match, NMVTIS history report clean, seller profile mature, in-person viewing scheduled, PPI agreed to, payment via cashier's check. Anything that fails closes the deal for you."
      )
    ),
  },
];
