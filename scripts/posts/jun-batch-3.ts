/**
 * June 2026 — Batch 3 of 4.
 * High-intent buying / VIN-education posts.
 */

import { body, bullets, callout, h2, h3, img, numbered, p, pLink } from "./helpers";
import type { PostInput } from "../types";

const HERO_PLACEHOLDER =
  "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=1600&q=80";

export const JUN_BATCH_3: PostInput[] = [
  // ───────────────────────────────────────────────────────────────────
  // 9. Out-of-state used car
  // ───────────────────────────────────────────────────────────────────
  {
    slug: "out-of-state-used-car-vin-checklist",
    title: "Out-of-State Used Car Purchase: VIN + Title Checklist",
    seoTitle: "Buying a Car Out of State? VIN + Title Checklist",
    seoDescription:
      "Buying a used car in another state adds title, tax, and inspection layers most buyers underestimate. Here's the VIN-and-paperwork checklist that prevents disasters.",
    excerpt:
      "An out-of-state used car can save you thousands or trap you in months of paperwork. Here's the VIN-first checklist that gets the car home and titled cleanly.",
    focusKeyword: "out of state used car checklist",
    keywords: [
      "buying car out of state vin",
      "out of state title transfer",
      "interstate vehicle purchase",
      "out of state car inspection",
      "moving car between states",
    ],
    category: "buying-guides",
    tags: ["out-of-state", "title-transfer", "vin", "interstate", "registration"],
    publishedAt: "2026-06-01T10:00:00.000Z",
    heroImageUrl: HERO_PLACEHOLDER,
    heroImageAlt: "Used car being inspected by a buyer on an out-of-state dealership lot",
    body: body(
      p(
        "Buying a used car in another state is one of the highest-leverage moves a US car buyer can make. Regional pricing differences for popular models can run $1,500–4,000; specialty vehicles (trucks in Texas, low-rust cars from the Southwest, JDM imports in California) often have even bigger spreads. The downside is that out-of-state purchases come with title, tax, registration, and emissions layers that most first-time interstate buyers underestimate — and any one of those layers can turn a great deal into months of paperwork pain."
      ),
      p(
        "Here's the VIN-first checklist that gets the car home and titled in your name cleanly. The order matters: do these in sequence, not in parallel."
      ),
      callout(
        "tip",
        "60-second answer",
        "Run a VIN history report first. Verify the title is in the seller's name and lien-free. Confirm your home state will accept the seller-state title brand (if any). Get a temporary transport permit before driving home. Pay sales tax to your home state, not the seller's. Title and register within your state's deadline (typically 30 days)."
      ),
      img(
        "bing:car transport truck interstate vehicle delivery",
        "Vehicle on a transport truck being delivered across state lines",
        "Transport adds $600-1400 depending on distance but eliminates the temp-tag and inspection-state risk of driving the car home yourself."
      ),

      h2("Step 1: VIN history report (do this first)"),
      pLink(
        "Before you fly anywhere or commit any money, run a ",
        ["full vehicle history report", "/vin-check"],
        ". Out-of-state purchases concentrate certain risks: title washing across state lines, flood vehicles being moved from coastal to inland markets, and salvage titles being rebuilt in lenient states before crossing into stricter ones."
      ),
      p(
        "Look specifically for these red flags in the report:"
      ),
      ...bullets([
        "More than two state title transfers in the last 24 months (commercial flipping).",
        "Most recent state title issued in a different state than where the car is being sold.",
        "Any salvage or rebuilt brand currently on the title — your home state may not accept the rebuilt designation.",
        "Flood total-loss event followed by retitling in a non-coastal state (classic title-washing pattern).",
        "Odometer history that doesn't match the disclosed mileage on the current listing.",
      ]),

      h2("Step 2: Confirm your home-state title acceptance"),
      p(
        "Title brands don't always carry across state lines identically. A car with a 'rebuilt' brand in Arizona may need additional inspection before being titled in California. A 'flood' brand in Florida is typically accepted as-is in other states, but some states add their own brand on top during transfer. Call your home-state DMV (or check their website) and ask specifically: 'Can I title a car in this state that currently has a [brand] title from [seller state]?'"
      ),
      p(
        "Several states have rules around emissions equipment that effectively block certain out-of-state purchases:"
      ),
      ...bullets([
        "California — bars titling of most pre-OBD-II vehicles modified after federal certification expired; check the CARB emissions sticker before buying.",
        "New York — requires inspection within 10 days of registration and rejects vehicles missing factory emissions hardware.",
        "Colorado, Washington — require emissions testing before initial registration in certain counties.",
        "Hawaii, Alaska — require additional documentation for any imported vehicle, including from other US states.",
      ]),

      img(
        "bing:state dmv title transfer paperwork desk",
        "DMV title transfer paperwork being processed at a service counter",
        "Most title-transfer surprises come from rules the buyer didn't research before paying."
      ),

      h2("Step 3: Verify the title in person before paying"),
      p(
        "When you arrive to see the car, the first thing to do is examine the physical title document — not photos, not scans. Verify all of the following:"
      ),
      ...numbered([
        "VIN on the title matches the dashboard VIN, the door jamb sticker, and the engine block stamping.",
        "The title is the current original (not a duplicate, not a 'replacement') — duplicates are sometimes issued to hide a lien or a prior brand.",
        "The seller's name on the title matches their government-issued ID exactly.",
        "The lienholder section is either blank or explicitly stamped 'released' with the lender's name and date.",
        "The most recent recorded mileage on the title matches the current odometer reading (within reasonable accumulated miles).",
        "Any title brand (salvage, rebuilt, flood, hail) is visible — and matches what was on your VIN history report.",
      ]),
      p(
        "If anything on the title looks altered, photocopied, or doesn't match the car, walk away. Forged out-of-state titles are a known scam pattern and you have no leverage once you've handed over cash."
      ),

      h2("Step 4: Sales tax — pay to your home state, not the seller state"),
      p(
        "Sales tax on a private-party used vehicle is owed to the state where the buyer will register the car, not where the seller lives. This is standard across all US states. The seller should not collect sales tax from you, and the bill of sale should reflect the actual purchase price (not an inflated 'gift' price meant to dodge tax — your state DMV will use NADA or KBB to set a minimum taxable value if the bill-of-sale price looks unreasonable)."
      ),
      p(
        "When you register the car in your home state, you'll pay your state's tax rate on the purchase price. Most states accept a properly executed bill of sale; some require a notarized version. Check your state DMV website for the specific requirement before you close the deal."
      ),

      h2("Step 5: Get the car home — transport vs drive"),
      p(
        "There are two ways to get the car from seller to home: an enclosed or open transport truck (cost: $600–1,400 depending on distance), or driving it yourself (cost: gas + temporary tags + the risk of breakdown or inspection issues along the route)."
      ),
      h3("Drive-it-home pros and cons"),
      ...bullets([
        "Pro: Cheaper for short distances (under 500 miles); you get a long test drive.",
        "Pro: You can stop at a mechanic mid-route if anything feels wrong.",
        "Con: Requires a temporary transport tag — every state has one and they vary in cost and process.",
        "Con: You're financially exposed if the car breaks down (no warranty, no roadside coverage).",
        "Con: Crossing inspection-required states (e.g. driving through Pennsylvania to get to Maryland) can trigger documentation issues.",
      ]),
      h3("Transport pros and cons"),
      ...bullets([
        "Pro: No mileage added to the car en route, no breakdown risk.",
        "Pro: No temporary-tag paperwork — the car is delivered on a trailer.",
        "Pro: Insurance is included with most transporters; the car is covered for damage in transit.",
        "Con: Adds $600-1,400 to the purchase cost, sometimes more for expedited.",
        "Con: You lose the ability to test the car at highway speed before paying.",
      ]),

      h2("Step 6: Title and register at your home DMV (within deadline)"),
      p(
        "Every state has a deadline for transferring an out-of-state title into your name, typically 10–30 days after purchase. Miss the deadline and you face escalating late fees, sometimes plus penalties. Bring to your DMV appointment:"
      ),
      ...bullets([
        "Original signed title from the seller (with their odometer disclosure if your state requires it).",
        "Bill of sale with date, purchase price, both parties' names and addresses.",
        "Your government-issued ID.",
        "Proof of in-state insurance (some states issue you a binder until permanent insurance is active).",
        "Emissions/safety inspection certificate if your state requires it for initial registration.",
        "Payment for your state's title fee, registration fee, and sales tax.",
      ]),
      p(
        "Most DMVs in 2026 let you schedule an appointment online; walk-in waits can be 2-4 hours in major metro areas. Booking an appointment in advance saves a half-day."
      ),

      callout(
        "warning",
        "The temporary-tag trap",
        "Several states (Pennsylvania, Texas, Massachusetts) have cracked down on 'paper-plate' fraud — issuing temporary transport tags from dealers that get reused by criminals. Some states now refuse to recognize out-of-state paper plates after 30 days. If you can't title the car in your home state quickly, transport may be the safer choice than driving with paper plates."
      ),

      h2("When out-of-state buying actually makes sense"),
      ...bullets([
        "Regional pricing gap of $2,000+ on the specific model you want (check Marketplace listings in your target state vs. yours).",
        "You're after a vehicle type rare in your area (low-rust truck from the Southwest, JDM import in California, lifted Jeep in Colorado).",
        "You have a friend or family in the seller state who can do the in-person inspection on your behalf.",
        "You're buying from a dealer with an established transport relationship and a refundable deposit policy.",
      ]),
      h2("When it doesn't"),
      ...bullets([
        "The price gap is under $1,000 — transport + travel + paperwork erodes the savings.",
        "The car has a branded title and your home state requires reinspection.",
        "You're buying a high-mileage budget car (more reliability variance per mile, harder to PPI remotely).",
        "The seller is unwilling to do a video walkaround inspection or won't extend a refundable deposit window.",
      ]),

      callout(
        "info",
        "What to do next",
        "If you're considering an out-of-state purchase: run the VIN report first, then call your home DMV with the seller-state title brand to confirm acceptance, then negotiate transport vs drive. Skip any of those steps and you're betting on luck."
      )
    ),
  },

  // ───────────────────────────────────────────────────────────────────
  // 10. How to read a vehicle history report
  // ───────────────────────────────────────────────────────────────────
  {
    slug: "how-to-read-a-vehicle-history-report",
    title: "How to Read a Vehicle History Report Step by Step",
    seoTitle: "How to Read a Vehicle History Report (2026)",
    seoDescription:
      "A vehicle history report packs ten years of data into one document. Here's how to read every section — and what each red flag actually means.",
    excerpt:
      "Vehicle history reports pack ten years of records into one document. Here's how to read every section and decode what each red flag actually means for your purchase.",
    focusKeyword: "how to read a vehicle history report",
    keywords: [
      "vin report sections explained",
      "nmvtis report red flags",
      "vehicle history report meaning",
      "decoding vin history",
      "title brand explained",
    ],
    category: "vin-education",
    tags: ["nmvtis", "vin", "report", "title-brands", "decoding"],
    publishedAt: "2026-06-03T10:00:00.000Z",
    heroImageUrl: HERO_PLACEHOLDER,
    heroImageAlt: "Person reviewing a printed vehicle history report at a desk with a laptop",
    body: body(
      p(
        "A vehicle history report compresses up to ten years of a car's life into a few pages. Done right, those pages tell you exactly which vehicles to pass on, which need an inspection focus, and which are genuinely as advertised. Done wrong — skimmed for 'clean' or 'no accidents' — they're roughly as useful as the seller's own description."
      ),
      p(
        "This guide walks through every section of a modern NMVTIS-backed report, what each entry means, and what to look for when something seems off."
      ),
      callout(
        "tip",
        "Sections to scrutinize first",
        "Title brands (page 1), state-by-state title history, odometer history, total-loss events. If any of those four have anything to flag, that's where 90% of the deal-killing risk lives."
      ),
      img(
        "bing:vehicle history report document review",
        "Person reviewing a vehicle history report document on a desk",
        "A 10-minute careful read of a history report catches the issues a 30-second skim misses."
      ),

      h2("Section 1: Vehicle specification block"),
      p(
        "Every report starts with a decode of the VIN into year, make, model, trim, engine, body style, and country of manufacture. Compare every field against the car you're considering. A 2018 Honda Civic LX with a 2.0L engine that's being advertised as a Civic Sport with a 1.5L turbo is either a misadvertised listing or a clone VIN — either way, the conversation needs to happen before money does."
      ),
      p(
        "Pay special attention to the Manufacturer's Suggested Retail Price (MSRP) when provided. A car listed for sale at 70% of original MSRP that's a decade old and shows minimal records is roughly priced; the same car at 50% MSRP with three recorded accidents is priced at the discount you'd expect once the history is known."
      ),

      h2("Section 2: Title brands and current title state"),
      p(
        "This is the make-or-break section. Title brands are codes states attach to vehicles after certain qualifying events. The most important ones to recognize:"
      ),
      ...bullets([
        "Clean — no qualifying events recorded. Standard for vehicles without insurance total-loss history.",
        "Salvage — total loss declared, car not currently legal to operate.",
        "Rebuilt / Reconstructed — was salvage, passed state inspection, now legal to operate but permanently branded.",
        "Flood / Water Damage — total loss specifically from water; insurance coverage and resale heavily penalized.",
        "Hail — total loss from hail damage; cosmetic but title brand persists.",
        "Junk / Non-Repairable — sold for parts only, cannot be re-titled for road use.",
        "Lemon Law Buyback — manufacturer repurchased under state lemon law; mechanical history is fully documented.",
        "Manufacturer Buyback — repurchased outside of lemon law (e.g. recall or customer satisfaction).",
        "Theft Recovery — was reported stolen and subsequently recovered.",
        "Odometer Discrepancy / Not Actual Miles — DMV has reason to believe the odometer reading is inaccurate.",
      ]),
      p(
        "Any brand other than 'clean' deserves a hard discount on the asking price and a focused inspection. Several brands (junk, salvage without subsequent rebuilt) are absolute walk-aways for road use."
      ),

      img(
        "bing:vehicle title brand salvage rebuilt document",
        "Vehicle title document showing a brand stamp",
        "Title brands persist for the life of the vehicle and follow it across state lines — when reporting works correctly."
      ),

      h2("Section 3: State title history"),
      p(
        "Every state the car has been registered in, with the date the title was issued. This section tells you the car's geographic story. A few patterns to look for:"
      ),
      h3("Normal patterns"),
      ...bullets([
        "Two states over 10 years (original buyer moved once).",
        "One state for the entire life of the car (most common for older cars).",
        "Sale state matches the most recent title state.",
      ]),
      h3("Patterns worth questioning"),
      ...bullets([
        "Three+ states in the last 24 months — commercial flipping or auction-buying.",
        "Car titled in one state but being sold in a different state today — not always bad, but ask why.",
        "Most recent title issued in a state with weaker brand-carryover rules (historically: Georgia, Alabama, Texas — though NMVTIS has narrowed these gaps).",
        "A salvage brand that disappears between consecutive titles in different states.",
      ]),

      h2("Section 4: Odometer history"),
      p(
        "A timestamped log of every recorded mileage reading. Sources include state inspections, emissions tests, oil-change centers that report, dealer service visits, title transfers, and insurance claim photographs. The mileage should monotonically increase over time."
      ),
      p(
        "Things that should always trigger questions:"
      ),
      ...bullets([
        "A reading later in time than another reading, but with lower mileage — that's odometer rollback evidence.",
        "Gaps of multiple years between readings on an otherwise-active vehicle — possible deliberate suppression of records.",
        "Very low recent mileage on a car with very high earlier mileage — could be genuine (the car has been garaged) or could be a fresh rollback.",
        "An 'Odometer Not Actual Miles' brand from a state DMV.",
      ]),

      h2("Section 5: Accident & damage records"),
      p(
        "Reported accident events with severity, location, airbag deployment, and damage area. The key word here is 'reported' — only accidents that triggered an insurance claim, a police report, or a state-required damage report appear. A car can have been in a fender-bender that the previous owner paid for out of pocket and you'll never see it in this section."
      ),
      p(
        "How to interpret severity:"
      ),
      ...bullets([
        "Minor — typically cosmetic damage, no airbag deployment, structural integrity intact. Usually not a deal-killer.",
        "Moderate — significant repair work needed; should prompt a focused inspection of the affected area.",
        "Severe / Major — structural damage, often with airbag deployment. Usually worth walking away from unless the price discount is steep and the repair quality is documented.",
      ]),
      p(
        "Airbag deployment is the single most important field in this section. Deployed airbags require replacement of the entire airbag system, which is expensive and not always done correctly in private rebuilds. A previously-deployed airbag that wasn't properly replaced won't deploy in the next collision."
      ),

      h2("Section 6: Service & maintenance records"),
      p(
        "Reported service events from data partners (large oil-change chains, dealer service departments, some independent shops). This section is far from complete — most independent shops don't report — but a fully populated service section is a strong positive signal because it indicates a car that was maintained at recordkeeping facilities."
      ),
      p(
        "What to look for: a regular cadence of oil changes (every 5,000–10,000 miles), evidence of major service milestones (timing belt replacement at the manufacturer's interval, transmission service, brake jobs), and any 'check engine light' diagnoses that were addressed."
      ),

      h2("Section 7: Open safety recalls"),
      p(
        "Active manufacturer recalls that haven't been recorded as completed. These are usually free to fix at any dealer of the same brand and don't affect a buying decision much — they're easy to remedy. But you should make the appointment to clear them within a few weeks of purchase, especially safety-critical recalls (brakes, airbags, fuel systems)."
      ),

      h2("Section 8: Theft & total-loss history"),
      p(
        "Reported theft events (even if recovered) and insurance total-loss declarations. A theft-recovery record is not automatically a deal-killer — if the car was found undamaged within a few days, it's essentially a curiosity. But a theft event followed by a salvage or rebuilt title typically means the car was damaged during the theft or recovery and was processed through salvage."
      ),

      callout(
        "warning",
        "What a report doesn't include",
        "Hail damage that wasn't claimed. Accidents the owner paid for cash. Wear-and-tear that didn't trigger a service record. The condition of the timing belt, transmission, or specific suspension components. The report tells you what's been recorded — never assume the absence of a record means the absence of an event. Pair every report with a physical pre-purchase inspection."
      ),

      h2("Putting it all together: the 5-minute read"),
      ...numbered([
        "Glance at title brands — anything other than 'clean' triggers a deeper read.",
        "Count the state transitions — more than two in three years deserves a question.",
        "Look at the odometer plot — should be monotonically increasing.",
        "Skim accident records — focus on severity and airbag deployment.",
        "Check open recalls — note them for post-purchase service.",
        "Read theft / total-loss section — any entries change the calculus.",
        "Compare what's there to what the seller told you. Discrepancies are the most actionable signal in any report.",
      ]),

      callout(
        "info",
        "What to do next",
        "If you're shopping for a used car, run the history report before the test drive — never after. The whole purpose of the report is to filter out the cars you don't want to waste time driving. Five minutes with a thorough report saves an afternoon at a bad listing."
      )
    ),
  },

  // ───────────────────────────────────────────────────────────────────
  // 11. Free vs paid VIN check
  // ───────────────────────────────────────────────────────────────────
  {
    slug: "free-vs-paid-vin-check-comparison",
    title: "Free VIN Check vs Paid Report: Honest Comparison",
    seoTitle: "Free vs Paid VIN Check: When Each Is Enough",
    seoDescription:
      "Free VIN checks cover specs and recalls. Paid reports add NMVTIS title history, accident records, and odometer audits. Here's when each is enough.",
    excerpt:
      "Free VIN checks cover specs and recalls. Paid reports add NMVTIS title history, accident records, and odometer audits. Here's exactly when each is enough.",
    focusKeyword: "free vs paid vin check",
    keywords: [
      "free vin check vs paid",
      "vin check comparison",
      "nhtsa vin check",
      "nicb vincheck free",
      "when to pay for vin report",
    ],
    category: "vin-education",
    tags: ["vin", "free-check", "comparison", "nhtsa", "nicb", "nmvtis"],
    publishedAt: "2026-06-05T10:00:00.000Z",
    heroImageUrl: HERO_PLACEHOLDER,
    heroImageAlt: "Comparison of free and paid VIN check report formats on two devices",
    body: body(
      p(
        "Every used-car buyer wonders the same thing eventually: do I need to pay for a vehicle history report, or are the free checks enough? The honest answer depends on what the car costs and how much you trust the seller. Free checks cover the basics — vehicle specification, active manufacturer recalls, and (via NICB) a stolen-vehicle lookup. Paid reports add the layers most buyers actually care about: title brand history, accident records, odometer audit, and total-loss events."
      ),
      p(
        "Here's a clear, honest breakdown of what each tier actually delivers, and how to decide which one your specific purchase needs."
      ),
      callout(
        "tip",
        "Decision rule",
        "If you're spending under $3,000 on a known beater you're rebuilding yourself, free checks may be enough. For any private-party purchase between $3,000 and $30,000, a paid NMVTIS-backed report is the highest-ROI $15-25 in the entire transaction."
      ),
      img(
        "bing:vin lookup tool computer screen",
        "Person comparing free and paid VIN lookup tools on a laptop",
        "Different VIN tools answer different questions — knowing which one to use saves time and prevents bad decisions."
      ),

      h2("What you get for free"),

      h3("NHTSA VIN Decoder (vpic.nhtsa.dot.gov)"),
      p(
        "The federal vehicle identification database. Free, unlimited use, no signup. Returns: year, make, model, trim, body style, engine specification, transmission, country of manufacture, plant, restraint system, and a long list of standard equipment fields. Does NOT return: title history, accident records, odometer history, ownership history, or anything that didn't come from the factory."
      ),
      p(
        "Use case: confirming a VIN is real and that the decoded vehicle matches the listing photos. Run any VIN you're considering through this first; it costs nothing and immediately catches mismatched or fabricated VINs."
      ),

      h3("NICB VINCheck (nicb.org/vincheck)"),
      p(
        "Free stolen-vehicle and salvage-records lookup from the National Insurance Crime Bureau. Limited to 5 searches per IP per day. Returns: yes or no on whether the VIN appears in either of two databases — (1) reported as stolen and not recovered, or (2) reported by a participating insurance carrier as a total-loss salvage."
      ),
      p(
        "Use case: a fast first-pass filter. A 'no record' result is necessary but not sufficient — NICB only sees records that participating carriers and law enforcement submitted, and recent thefts can take weeks to appear."
      ),

      h3("Manufacturer recall lookup"),
      p(
        "Every major manufacturer plus the NHTSA recall portal lets you enter a VIN and see active, un-completed recalls. Free, unlimited, takes 30 seconds. Use case: pre-purchase 'is this car under any active recall' check, and post-purchase 'what should I get fixed at the dealer this month' check."
      ),

      h3("State DMV title status lookups"),
      p(
        "Many states (California, Florida, Texas, Illinois, New York and others) offer free or low-cost VIN-based title status lookups. Returns vary but typically include the current title state, lien status, and whether a brand is recorded. Use case: confirming a private seller's claim that the title is clean before driving across town."
      ),

      img(
        "bing:nhtsa website vin decoder lookup",
        "NHTSA VIN decoder website on a computer screen",
        "NHTSA's free decoder is the right first step on any VIN — it catches fabricated VINs instantly."
      ),

      h2("What free checks DON'T tell you"),
      ...bullets([
        "Title brand history across all states (was this car ever salvage, rebuilt, flood, lemon, etc., even if the current title is clean).",
        "Number of previous owners and registration transfers.",
        "Accident records (severity, location, airbag deployment, damage area).",
        "Odometer readings over time (the only way to catch rollback).",
        "Service and maintenance records.",
        "Total-loss insurance events (separate from physical salvage).",
        "State-by-state title history (the geographic story).",
      ]),
      p(
        "Each of those is a meaningful piece of due diligence for any purchase north of a few thousand dollars."
      ),

      h2("What you get for paid"),
      pLink(
        "A ",
        ["paid NMVTIS-backed vehicle history report", "/vin-check"],
        " accesses the federal National Motor Vehicle Title Information System plus commercial data sources (insurance carriers, salvage yards, auction houses, service-record partners). Typical reports cost $10–25 per VIN and return within a minute. They include:"
      ),
      ...bullets([
        "Every title brand the car has ever carried, anywhere in the US.",
        "Complete state title history with issue dates.",
        "Odometer history with source attribution.",
        "Accident records with severity and damage detail.",
        "Total-loss events from participating insurance carriers.",
        "Salvage and junk-yard records.",
        "Open safety recalls.",
        "Service records from data-partner shops (mostly large chains and dealers).",
        "Theft and recovery events.",
      ]),

      h2("When free is enough"),
      ...bullets([
        "Buying a vehicle from a close family member with full history disclosure and known maintenance.",
        "Buying a vehicle you're going to scrap or part out (price under $1,500 and you're a mechanic).",
        "Confirming a VIN before paying for a paid report — NHTSA decoder first, then paid only if the VIN decodes correctly.",
        "Post-purchase recall checks — free portals are perfect for this.",
        "Filtering listings before in-person viewings (NICB free check catches obvious stolen cars).",
      ]),

      h2("When paid is worth it"),
      ...bullets([
        "Any private-party purchase over $3,000.",
        "Any out-of-state purchase regardless of price.",
        "Any car being sold by a small or unknown dealer.",
        "Any car with cosmetic indicators of repair (mismatched panels, recent repaint, fresh undercoating).",
        "Any car whose listing photos show a single hero shot and minimal detail.",
        "Any car where the seller's story (one owner, garage-kept, low miles) seems too clean for the price.",
        "Any car for which you're financing — the lender's lien depends on a clean title transfer.",
      ]),

      callout(
        "warning",
        "Brand-name reports vs NMVTIS-backed reports",
        "Some heavily advertised 'history reports' don't actually source NMVTIS — they use insurance carrier data and self-reported dealer information. NMVTIS is the federal database mandated by the Anti-Car Theft Act of 1992; only NMVTIS-approved providers can pull it. Check the report provider explicitly lists 'NMVTIS' as a data source before paying."
      ),

      h2("The realistic stack: what most buyers should do"),
      ...numbered([
        "Run the NHTSA VIN decoder on every car you're considering. Confirms the VIN is real and matches the listing.",
        "Run the free NICB VINCheck. Filters obvious stolen cars and salvage records.",
        "If those pass and you're seriously considering the car, run a paid NMVTIS-backed history report before driving to see it. Costs $15-25.",
        "Schedule the in-person viewing only after the paid report passes.",
        "After the test drive, take the car to an independent mechanic for a pre-purchase inspection ($150-250) if you're still interested.",
      ]),
      p(
        "Total cost of the full stack: under $300 for a comprehensive due-diligence package. Compared to the average cost of unwinding a bad used-car purchase ($3,800+ according to FTC data), the math is straightforward."
      ),

      callout(
        "info",
        "What to do next",
        "Free checks are great for filtering. Paid reports are great for closing. Use the free tools to weed out the obvious problems, then spend the $15-25 on a paid report for the cars you're seriously considering. The combination catches what either alone would miss."
      )
    ),
  },

  // ───────────────────────────────────────────────────────────────────
  // 12. What each VIN character means
  // ───────────────────────────────────────────────────────────────────
  {
    slug: "what-each-vin-character-means",
    title: "What Each Character in Your VIN Actually Means",
    seoTitle: "Every Character in Your VIN, Decoded",
    seoDescription:
      "Your 17-character VIN encodes the make, model, year, plant, restraints, engine, and a check digit. Here's what every position actually means.",
    excerpt:
      "Your 17-character VIN is a structured code, not a random string. Here's what every single position means, from the country of origin to the check digit.",
    focusKeyword: "what each vin character means",
    keywords: [
      "vin character meaning",
      "vin decoded by position",
      "vin position 10",
      "vin check digit",
      "world manufacturer identifier",
    ],
    category: "vin-education",
    tags: ["vin", "decoding", "education", "structure", "iso-3779"],
    publishedAt: "2026-06-06T10:00:00.000Z",
    heroImageUrl: HERO_PLACEHOLDER,
    heroImageAlt: "Close-up of a VIN plate on a vehicle dashboard with individual characters visible",
    body: body(
      p(
        "Every 17-character VIN since 1981 is a structured code defined by ISO 3779. Each position tells you something specific about the vehicle, and once you know the structure you can decode any VIN at a glance — verify a year-model match against a seller's claim, check for a counterfeit VIN, or just understand what you're looking at. Here's the position-by-position breakdown."
      ),
      callout(
        "tip",
        "Quick reference",
        "Positions 1-3 = World Manufacturer Identifier (country + maker). Positions 4-8 = vehicle attributes (model, body, engine, restraints). Position 9 = check digit. Position 10 = model year. Position 11 = plant. Positions 12-17 = serial number."
      ),
      img(
        "bing:vin plate close up dashboard 17 characters",
        "Close-up of a vehicle VIN plate showing 17 characters",
        "Every position has a meaning — modern VINs are not random strings."
      ),

      h2("The big picture"),
      p(
        "A VIN is 17 characters long. The allowed characters are digits 0-9 and uppercase letters except I, O, and Q (to avoid confusion with 1 and 0). Every position has a defined role under ISO 3779, but the specific meaning of positions 4-8 varies by manufacturer — each manufacturer files a 'VIN decoder map' with NHTSA that explains their internal encoding."
      ),

      h2("Positions 1–3: World Manufacturer Identifier (WMI)"),
      p(
        "The first three characters identify where the car was made and who made it. The first character is the country/region, the second is the manufacturer, and the third is a vehicle type or further manufacturer subdivision."
      ),
      h3("Common first-character codes"),
      ...bullets([
        "1, 4, 5 — United States",
        "2 — Canada",
        "3 — Mexico",
        "J — Japan",
        "K — South Korea",
        "L — China",
        "S — United Kingdom",
        "V — France or Spain",
        "W — Germany",
        "Y — Sweden or Finland",
        "Z — Italy",
      ]),
      h3("Common WMI prefixes (full first 3 characters)"),
      ...bullets([
        "1HG / 2HG / 3HG / 5HG — Honda (US, Canada, Mexico, US light truck respectively)",
        "1FA / 1FT / 1FM — Ford passenger / Ford truck / Ford SUV (US)",
        "1G1 / 1GC / 2G1 — Chevrolet passenger (US) / Chevrolet truck (US) / Chevrolet passenger (Canada)",
        "5YJ — Tesla",
        "JT2 / JT3 / JTD / JTE — Toyota passenger / Toyota truck (older) / various Toyota body styles",
        "WBA / WBS — BMW (Germany)",
        "WDB / WDC / WDD — Mercedes-Benz passenger / SUV / various",
        "WVW — Volkswagen passenger (Germany)",
        "KMH / KNA — Hyundai / Kia (South Korea)",
      ]),

      img(
        "bing:car vin assembly plant manufacturer",
        "Car being assembled at a manufacturer plant",
        "The WMI tells you which manufacturer and which plant — useful for sourcing replacement parts."
      ),

      h2("Positions 4–8: Vehicle Descriptor Section (VDS)"),
      p(
        "These five characters encode model line, body style, restraint system, engine, and other attributes specific to that manufacturer. The exact meaning varies by manufacturer, so a VIN decoder is needed to translate them accurately. For example, on a Honda Civic the VDS might encode 'EM2' for the body style and door count, while on a Ford F-150 the same positions encode payload class and cab configuration."
      ),
      p(
        "The NHTSA's free VIN decoder at vpic.nhtsa.dot.gov resolves these positions accurately for every US-market manufacturer and is the canonical source for VIN-to-spec translation."
      ),

      h2("Position 9: Check digit"),
      p(
        "A mathematical checksum of the other 16 characters. The federal government uses a weighted modulo-11 algorithm — each character is assigned a numeric value, multiplied by a position weight, summed, and divided by 11. The remainder (or 'X' if the remainder is 10) is the check digit."
      ),
      p(
        "Why it matters: if any other character in the VIN is altered, the check digit no longer matches. A VIN with an invalid check digit is either typo'd or counterfeit. Most VIN-decoder tools verify the check digit automatically; if a tool tells you 'invalid VIN' even though you typed it carefully, that's a strong signal something is off with the physical VIN on the car."
      ),

      h2("Position 10: Model year"),
      p(
        "Encoded as a single character following a published table. Common values for 2010s and 2020s:"
      ),
      ...bullets([
        "A = 1980 or 2010",
        "B = 1981 or 2011",
        "C = 1982 or 2012",
        "D = 1983 or 2013",
        "E = 1984 or 2014",
        "F = 1985 or 2015",
        "G = 1986 or 2016",
        "H = 1987 or 2017",
        "J = 1988 or 2018",
        "K = 1989 or 2019",
        "L = 1990 or 2020",
        "M = 1991 or 2021",
        "N = 1992 or 2022",
        "P = 1993 or 2023",
        "R = 1994 or 2024",
        "S = 1995 or 2025",
        "T = 1996 or 2026",
        "V = 1997 or 2027",
      ]),
      pLink(
        "The same letter is used for cars 30 years apart, so position 10 alone is ambiguous. But position 7 can usually disambiguate — pre-2010 VINs use a digit (0-9) in position 7 for the body class, while 2010+ VINs typically use a letter. There's a ",
        ["full position-10 decoder chart on our blog", "/blog/model-year-vin-position"],
        " if you want the complete table."
      ),

      h2("Position 11: Plant code"),
      p(
        "Identifies the specific assembly plant where the vehicle was built. Each manufacturer assigns its own plant codes (Ford's 'P' is Twin Cities; Toyota's 'C' is Cambridge, Ontario; etc.). Plant codes matter for warranty recalls and parts sourcing, and are sometimes used to identify pre-production or limited-run vehicles."
      ),

      h2("Positions 12–17: Serial number"),
      p(
        "A six-digit production sequence number that identifies the specific vehicle within its model year and plant. Early production units in a given year typically have lower serial numbers; later production has higher numbers. Some manufacturers use the serial number to identify special-edition or limited-production vehicles."
      ),

      h2("Putting it together: example decode"),
      p(
        "Take the VIN 1HGCM82633A123456. Decoded:"
      ),
      ...bullets([
        "1HG — Honda Motor Company, United States plant.",
        "CM826 — vehicle descriptor (Honda Accord coupe with a specific engine and restraint configuration).",
        "3 — check digit.",
        "3 — model year 2003 (or 1973, but Hondas weren't made in 1973 so unambiguously 2003).",
        "A — assembly plant: Marysville, Ohio.",
        "123456 — production serial number.",
      ]),

      h2("Why VIN structure matters for buyers"),
      ...bullets([
        "Verify the seller's claimed make/model/year matches the VIN — instant catch on misrepresented listings.",
        "Catch cloned VINs by verifying the WMI matches the brand visible on the car (a Ford with a Honda WMI is fake).",
        "Check the model year against the title and the seller's listing — small details like year discrepancies often hide bigger problems.",
        "Identify the plant for recall and warranty purposes.",
        "Verify the check digit to catch typo'd VINs before paying for a history report.",
      ]),

      callout(
        "warning",
        "Pre-1981 vehicles",
        "VINs on US vehicles before 1981 weren't standardized to 17 characters and don't follow ISO 3779. They can be anywhere from 5 to 13 characters and the meaning of each position varies by manufacturer. Decoding them requires a manufacturer-specific reference; don't expect a standard VIN tool to handle them."
      ),

      callout(
        "info",
        "What to do next",
        "Next time you're looking at a used-car listing, glance at the VIN's first three characters and its tenth character. The WMI plus model year alone catch a surprising number of misrepresented listings — and the check is free."
      )
    ),
  },
];
