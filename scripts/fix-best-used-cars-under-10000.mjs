/**
 * One-off content patch for the blog post "Best Used Cars Under $10,000
 * in 2026". The blog bot drafted both list headings ("Our Top 12 Picks
 * for Under $10,000" and "Models to Avoid in This Price Range") but
 * then filled the body underneath with generic, off-topic paragraphs
 * (and even duplicated some of them across sections). A customer
 * flagged it. This script rewrites those two sections in Sanity with
 * actual model lists.
 *
 * Run once:
 *   ~/.nvm/versions/node/v22.14.0/bin/node \
 *     scripts/fix-best-used-cars-under-10000.mjs
 *
 * Requires SANITY_API_TOKEN.
 */

import { createClient } from "@sanity/client";

const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "s41e632p";
const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const SLUG = "best-used-cars-under-10000";

if (!process.env.SANITY_API_TOKEN) {
  console.error("SANITY_API_TOKEN env var is required");
  process.exit(1);
}

const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: "2024-04-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

// Random 8-char keys — Sanity needs every block + span to carry a stable _key.
function k() {
  return Math.random().toString(36).slice(2, 10);
}

// Build a Portable Text "normal" paragraph block.
function p(text) {
  return {
    _key: k(),
    _type: "block",
    style: "normal",
    markDefs: [],
    children: [{ _key: k(), _type: "span", marks: [], text }],
  };
}

// Build an h3 heading block.
function h3(text) {
  return {
    _key: k(),
    _type: "block",
    style: "h3",
    markDefs: [],
    children: [{ _key: k(), _type: "span", marks: [], text }],
  };
}

// ── Section 1: 12 picks ────────────────────────────────────────────
// Lead-in paragraph + (h3 model heading + body paragraph) × 12.
// Picks are above-average reliability per Consumer Reports +
// J.D. Power + owner-forum consensus, all genuinely findable in the
// $7–10k range in 2026.
const PICKS_LEAD = p(
  "Every model below carries above-average reliability across Consumer Reports owner surveys, J.D. Power dependability data, and long-running owner forums. Prices reflect typical private-party asking in mid-2026 for cars in clean condition with 80,000–130,000 miles. Mileage and condition vary widely at this price point, so a VIN check and a pre-purchase inspection are non-negotiable."
);

const PICKS = [
  {
    title: "1. Toyota Corolla (2014–2017) — $7,500 to $10,000",
    body: "The default answer for cheap reliable transportation. The 1.8L 4-cylinder is famously durable, the CVT (or available 6-speed manual) holds up well, and parts are everywhere. Real-world fuel economy lands around 32 city / 41 highway. Verify it wasn't a rental fleet car by running a VIN history check — fleet usage is common in this year range.",
  },
  {
    title: "2. Honda Civic (2014–2016) — $7,800 to $10,000",
    body: "The R18 1.8L engine in the LX/EX trims is one of the most reliable powertrains Honda has built. Comfortable to live with, easy to find parts for, and excellent resale means you'll get most of your money back when you eventually sell. Skip the 2016 Civic with the 1.5T if you want the simplest ownership experience.",
  },
  {
    title: "3. Mazda3 (2014–2018) — $7,000 to $10,000",
    body: "The best-driving compact car you can buy under $10,000. The Skyactiv 2.0L and 2.5L engines are reliable and return mid-30s MPG, and the chassis is genuinely engaging. Watch for worn rear suspension bushings on higher-mileage examples — a $400 repair if caught before it eats tires.",
  },
  {
    title: "4. Toyota Prius (2012–2015) — $6,500 to $9,500",
    body: "A 50-MPG hybrid for under $9,000 is hard to beat on running costs. Hybrid battery replacement is the headline fear, but Gen-3 packs commonly last 200,000+ miles, and rebuilt packs run around $1,500 installed. The known weak spot is EGR cooler clogging — ask whether it has been cleaned and confirm with a compression check.",
  },
  {
    title: "5. Honda Fit (2015–2018) — $8,000 to $10,000",
    body: "The Magic Seat folds flat in seconds and turns this subcompact into a cargo van. The 1.5L 4-cylinder is bulletproof, real-world fuel economy is in the mid-30s, and the car is so simple that most maintenance is DIY-friendly. Salt-belt examples can hide rust under the rear wheel arches — inspect carefully.",
  },
  {
    title: "6. Toyota Camry (2012–2014) — $8,000 to $10,000",
    body: "Mid-size comfort, a roomy back seat, and the same 2.5L 4-cylinder or 3.5L V6 that powers Lexus models. The 4-cylinder on certain build dates can consume oil — check level on the test drive and verify whether the dealer ever performed the oil-control ring service campaign. The V6 is virtually trouble-free.",
  },
  {
    title: "7. Honda Accord (2013–2015) — $8,500 to $10,000",
    body: "Refined, comfortable, and the K24 2.4L engine is one of the longest-lived Honda has produced. The CVT-equipped trims need their fluid changed on Honda's schedule (every 30k–40k miles); skipped service is the #1 reason for early failure. The 6-speed manual on Sport trims is a hidden gem if you can find one.",
  },
  {
    title: "8. Subaru Impreza (2015–2017) — $7,500 to $10,000",
    body: "Standard all-wheel drive at this price is rare, and that alone makes the Impreza worth a look in snow-belt states. The head-gasket issues that haunted earlier Subarus are mostly behind these years, but verify cooling-system service in the records and look for any oil-coolant cross-contamination on the dipstick.",
  },
  {
    title: "9. Hyundai Elantra (2017–2019) — $7,500 to $10,000",
    body: "Big interior, modern infotainment for the price, and you may catch the tail end of Hyundai's 10-year / 100,000-mile powertrain warranty if the car is below the mileage cap and you're the second owner. Stick with the 2.0L Nu engine; the 1.4T in Eco trims has a fussier service interval and a smaller specialist network.",
  },
  {
    title: "10. Ford Fusion (2013–2015) — $6,500 to $9,500",
    body: "A genuinely comfortable mid-size with a quiet cabin and big trunk for short money. Critical: avoid the 1.6L EcoBoost — coolant intrusion failure is a documented pattern. Stick to the 2.5L 4-cylinder (the rental-fleet workhorse) or the 2.0L EcoBoost in SE/Titanium trims, both of which are far more reliable.",
  },
  {
    title: "11. Kia Soul (2014–2017) — $7,000 to $9,500",
    body: "Cavernous for its footprint, easy to park, and dirt simple to live with. The 2.0L engine is the reliable pick — the 1.6L GDI engine in base trims had piston/oil-consumption issues that triggered a class action, so prefer the 2.0L in Plus or Exclaim trims.",
  },
  {
    title: "12. Nissan Frontier (2012–2015) — $9,000 to $10,000+",
    body: "The simplest, toughest small truck you can still buy under $10k. The 4.0L V6 and 5-speed automatic are essentially unkillable. Critical: on 2010–2013 examples, verify the radiator-into-transmission coolant cross-contamination issue was addressed (factory radiator replaced) — if the original radiator is still in there, walk away or budget for a transmission rebuild.",
  },
];

// ── Section 2: Models to Avoid ─────────────────────────────────────
const AVOID_LEAD = p(
  "The models below appear at attractive prices in this range for a reason — owner-reported failure rates, costly repairs, or shrinking dealer networks make total cost of ownership much higher than the sticker suggests. Avoiding these saves more money than any negotiation tactic on the right car would."
);

const AVOIDS = [
  {
    title: "Chrysler 200 (2015–2017)",
    body: "The ZF 9-speed automatic was the headline issue — harsh shifts, software updates that never fully resolved customer complaints, and replacement costs in the $4,000–$6,000 range. Resale values collapsed accordingly. Easy to find under $7,000, easy to regret.",
  },
  {
    title: "Dodge Journey (2009–2020)",
    body: "Underpowered base engine, poor crash-test scores compared to peers, and a Consumer Reports reliability rating that sat at the bottom of the segment for most of its run. Cheap because nobody wants one used.",
  },
  {
    title: "Fiat 500 / 500L (2012–2019)",
    body: "Quirky to look at, painful to own. Electrical gremlins are common, parts can take weeks to source, and the U.S. dealer network has shrunk significantly since Stellantis pulled back. Repair anywhere outside a major metro is a real problem.",
  },
  {
    title: "Nissan Altima (2013–2018)",
    body: "The Jatco CVT failure rate between 80,000 and 120,000 miles is well documented. Transmission replacement runs $3,500–$5,000 — often more than the car is worth at that mileage. If you must consider one, demand a transmission fluid sample and a recent service record.",
  },
  {
    title: "Ford Focus (2012–2018, PowerShift dual-clutch)",
    body: "The DPS6 dual-clutch transmission shuddered, slipped, and failed early enough that Ford settled a class-action lawsuit. Many cars on the market today are post-settlement repairs that may or may not have actually been fixed. Avoid any Focus with the PowerShift; the 6-speed manual is fine.",
  },
  {
    title: "Jeep Compass / Patriot (2007–2017)",
    body: "Underwhelming on every axis — CVT durability, interior quality, fuel economy, and crash scores all rate below segment average. Better Jeep options exist for the money, and far better non-Jeep options.",
  },
];

async function run() {
  const post = await client.fetch(
    `*[_type=="post" && slug.current==$slug][0]{_id, _rev, body}`,
    { slug: SLUG }
  );
  if (!post) throw new Error(`post not found: ${SLUG}`);
  console.log("Found post:", post._id);

  const body = post.body ?? [];
  console.log("Original body block count:", body.length);

  // Locate the two H2 headings so we can splice the right ranges.
  function findH2(needle) {
    return body.findIndex(
      (b) =>
        b._type === "block" &&
        b.style === "h2" &&
        (b.children || [])
          .map((c) => c.text)
          .join("")
          .toLowerCase()
          .includes(needle)
    );
  }
  const picksIdx = findH2("top 12 picks");
  const avoidIdx = findH2("models to avoid");
  const vinIdx = findH2("how to run a vin check");
  if (picksIdx < 0 || avoidIdx < 0 || vinIdx < 0) {
    throw new Error(
      `Could not locate one of the section headings: picks=${picksIdx}, avoid=${avoidIdx}, vin=${vinIdx}`
    );
  }
  console.log(
    `Section indices: picks=${picksIdx}, avoid=${avoidIdx}, vin=${vinIdx}`
  );

  // Build new blocks.
  const newPicksBlocks = [
    PICKS_LEAD,
    ...PICKS.flatMap((m) => [h3(m.title), p(m.body)]),
  ];
  const newAvoidBlocks = [
    AVOID_LEAD,
    ...AVOIDS.flatMap((m) => [h3(m.title), p(m.body)]),
  ];

  // Splice: keep [0..picksIdx], then picks H2 + new picks, then avoid
  // H2 + new avoid, then everything from vinIdx onward (HowTo VIN check
  // section and beyond stay untouched).
  const newBody = [
    ...body.slice(0, picksIdx),
    body[picksIdx], // keep the "Top 12 Picks" H2 itself
    ...newPicksBlocks,
    body[avoidIdx], // keep the "Models to Avoid" H2 itself
    ...newAvoidBlocks,
    ...body.slice(vinIdx),
  ];

  console.log("New body block count:", newBody.length);

  await client
    .patch(post._id)
    .set({ body: newBody })
    .ifRevisionId(post._rev)
    .commit();

  console.log("Patch committed.");
}

run().catch((e) => {
  console.error("FAILED:", e.message);
  process.exit(1);
});
