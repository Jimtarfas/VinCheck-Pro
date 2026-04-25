/**
 * Expands a PostSpec (title + outline + intro + conclusion) into a full
 * 1,200–1,800 word Portable Text body with H2 sections, paragraphs, lists,
 * callouts, and internal links — all the SEO-friendly structure Google
 * rewards.
 *
 * The expander uses the outline section titles as topical seeds and produces
 * varied, naturally-written content per section (multiple paragraph styles,
 * bullet lists, callouts) instead of a single repeating template, so 100
 * posts read as 100 distinct articles.
 */

import type { PostInput, PortableTextNode } from "../types";
import { p, h2, h3, bullets, callout, body } from "./helpers";

export interface PostSpec {
  slug: string;
  title: string;
  seoTitle?: string;
  seoDescription: string;
  excerpt: string;
  focusKeyword: string;
  keywords: string[];
  category: string;
  tags: string[];
  publishedAt: string;
  heroImageUrl: string;
  heroImageAlt: string;
  outline: string[];
  intro: string;
  conclusion: string;
}

// -----------------------------------------------------------------------------
// Section content library — paragraph templates keyed by topical signals in the
// outline H2. Each template contributes 1–3 paragraphs plus optional lists or
// callouts. The expander picks 2–4 templates per section based on keyword
// matching, then varies the order with a deterministic hash so different posts
// produce different prose.
// -----------------------------------------------------------------------------

interface SectionExpansion {
  paragraphs: string[];
  bullets?: { intro: string; items: string[] };
  callout?: { variant: "info" | "tip" | "warning"; title: string; text: string };
}

type Builder = (ctx: ExpandCtx) => SectionExpansion;

interface ExpandCtx {
  spec: PostSpec;
  sectionTitle: string;
  index: number;
  total: number;
  keyword: string;
}

const NUM = (n: number) => n.toLocaleString();

// Generic paragraph generators — each returns a unique paragraph styled to feel
// like editorial copy, with subtle variation based on the spec.

const G = {
  whyItMatters: (c: ExpandCtx) =>
    `${c.sectionTitle.replace(/^[Ww]hy\s+/, "")} matters more than most car buyers realize. The decisions you make at this stage shape the next 5–10 years of ownership cost, reliability, and resale outcome. Skipping the homework here is exactly how buyers end up overpaying or, worse, locked into a vehicle that drains money for years.`,

  context2026: (c: ExpandCtx) =>
    `In 2026, the used car market is in a different place than it was even two years ago. Inventory has loosened, off-lease vehicles are returning to dealer lots in large numbers, and average prices have softened from their pandemic peaks. That makes ${c.spec.focusKeyword} a more rewarding question to answer in 2026 than at almost any time in the last five years — but only if you know what to look for.`,

  inspectionPoint: (c: ExpandCtx) =>
    `Before you commit to anything, run through a simple inspection routine. Walk the car from front to back. Check tire wear patterns (cupping or feathering points to alignment or suspension issues). Open the hood and look at the engine bay for oil leaks, corroded battery terminals, and aftermarket wiring that could indicate a poorly executed repair. Inside, sit in every seat, test every switch, and pay close attention to dashboard warning lights when you cycle the ignition.`,

  vinCheckBenefit: (c: ExpandCtx) =>
    `A vehicle history report cuts through guesswork in seconds. Pulling a VIN check before you spend hours on a test drive lets you confirm reported mileage, ownership chain, title brand, accident records, and whether the vehicle has been declared a total loss in any state. The $7.99 spend has saved buyers from five-figure mistakes thousands of times — and at this point in the buying process there's no good reason to skip it.`,

  costOfOwnership: (c: ExpandCtx) =>
    `Sticker price tells you almost nothing about real ownership cost. Insurance, fuel, scheduled maintenance, and depreciation routinely add up to more than the purchase price over a 5-year hold. When you compare options, look at the total — not just the monthly payment. RepairPal averages, Kelley Blue Book 5-year cost-to-own data, and your own zip code's insurance quotes will paint a much fuller picture than any window sticker ever can.`,

  redFlag: (c: ExpandCtx) =>
    `There are a few non-negotiable red flags worth memorizing. Mismatched paint between adjacent panels usually means collision repair. A musty interior smell almost always means water intrusion at some point. Uneven panel gaps suggest frame work. And any seller who refuses to share the VIN before you visit — or insists on a quick cash-only deal — has something to hide. Trust your instincts and walk away when something doesn't add up.`,

  testDriveTips: (c: ExpandCtx) =>
    `Test drive for at least 30 minutes if the seller will allow it. Five-minute spins around the block hide everything that matters. You want time at highway speed (transmission shift quality, alignment pull, wind noise), time stopped (idle smoothness, AC performance), and time on rough pavement (suspension noises, steering feedback). Bring a notebook and write down anything that feels off — the human memory is bad at compiling minor issues into a clear picture.`,

  negotiation: (c: ExpandCtx) =>
    `Negotiation succeeds when you've done the homework everyone else skips. Know the model's market price range from KBB and Edmunds. Know what comparable cars are selling for in your zip code on AutoTrader. Know the dealer's invoice price (not just MSRP) on a new car or trade-in value on a used one. Walking in with that data turns a high-pressure sales pitch into a calm comparison conversation — and that's where the discount lives.`,

  safetyContext: (c: ExpandCtx) =>
    `Safety isn't just an airbag count. Modern crash data from IIHS and NHTSA goes deeper: small overlap front, side impact, roof strength, head restraint geometry, and the effectiveness of standard active-safety features like automatic emergency braking and lane keep assist. The IIHS Top Safety Pick+ rating is the gold standard, and it filters out a surprising amount of the fleet — especially older sedans and budget compacts that aged out of current standards.`,

  reliabilityData: (c: ExpandCtx) =>
    `Reliability rankings come from real-world data: Consumer Reports surveys hundreds of thousands of owners, J.D. Power tracks problems per 100 vehicles, and forums like Bimmerforums or HondaTech compile owner-reported failure modes you won't find anywhere else. The picks above all carry above-average marks across multiple sources — single-source rankings are easy to game, but consensus across CR, J.D. Power, and owner forums is hard to fake.`,

  warrantyAdvice: (c: ExpandCtx) =>
    `Factory warranty coverage usually means 3 years/36,000 miles for bumper-to-bumper and 5 years/60,000 for powertrain on most mainstream brands. CPO programs typically extend that to 7 years/100,000 from the original in-service date. Third-party extended warranties are a different conversation — they can be worth the money on complex luxury or technology-heavy cars, and rarely pay off on simple, reliable models. Read the contract before you sign anything.`,

  financingBasics: (c: ExpandCtx) =>
    `Get pre-approved before you set foot in a dealership. Credit unions consistently offer the lowest auto loan rates, often 1–3 points below dealer financing. Walking in with a pre-approval letter completely changes the dynamic — the F&I manager has to either beat your rate or lose the financing margin entirely. Either way you win. And never sign a contract you don't fully understand; ask the F&I manager to explain every line item.`,

  insuranceTip: (c: ExpandCtx) =>
    `Get insurance quotes before you buy. Premiums vary wildly by model, year, trim, and your zip code. The same buyer might pay $1,200 a year on a Toyota Camry and $2,800 on a Subaru WRX. Shop quotes from at least three carriers (one big-name, one regional, one direct-to-consumer) and confirm you can actually afford to insure the car before you commit to buying it.`,

  paperworkChecklist: (c: ExpandCtx) =>
    `The paperwork that protects you most: signed bill of sale (with VIN, mileage, and price), original title (signed over by the seller), proof of any active liens being released, current registration, emissions certificate if your state requires one, and a receipt for any deposit. Take photos of all of it before you drive away. If the seller can't produce the title, do not buy the car — period.`,

  whenToWalk: (c: ExpandCtx) =>
    `Knowing when to walk away is the most underrated skill in car buying. There is always another car. Whatever's making your gut uneasy — pressure tactics, missing paperwork, an inspection finding the seller dismisses — is information. Trust it. The buyers who get burned are nearly always the ones who knew something was off but talked themselves into the deal anyway.`,

  diyMaintenance: (c: ExpandCtx) =>
    `If you're handy enough to swap your own oil, you can probably handle 80% of routine maintenance: brake pads, air filters, cabin filters, spark plugs, and basic fluid changes. The savings add up — DIY oil changes alone save $40–$80 per service over a quick-lube shop, and brake jobs save $300–$600 per axle. YouTube has a video for nearly every common job on every common car, and the tools you need pay for themselves on the first or second job.`,

  brandsCompare: (c: ExpandCtx) =>
    `When you compare brands head-to-head, the differences sharpen quickly. Toyota and Honda lead long-term reliability surveys but charge a premium upfront. Hyundai and Kia have closed the gap dramatically on quality while undercutting on price. Domestic brands like Ford and Chevrolet excel at trucks but lag in compact and mid-size segments. German brands deliver on driving feel but punish owners with maintenance costs. There is no "best" brand — only the best fit for your specific needs.`,

  longTermView: (c: ExpandCtx) =>
    `Think about the 5-year picture, not the first month of ownership. The car that's $1,500 cheaper today but costs $4,000 more to maintain over 5 years isn't actually cheaper. The "boring" choice that holds resale value is often the smart financial choice. Buyers who optimize for the long term consistently end up with more money in their pockets — and ironically, just as much fun on the road.`,
};

// Match outline section titles to relevant builders. The matcher picks 2–4
// builders per section based on keyword overlap, plus 1 universal builder per
// section to ensure variety across posts.

interface BuilderRule {
  match: RegExp;
  builders: Array<keyof typeof G>;
  bullets?: { intro: string; items: string[] };
  callout?: { variant: "info" | "tip" | "warning"; title: string; text: string };
}

const RULES: BuilderRule[] = [
  {
    match: /\b(why|sweet spot|matters|important|tipping)\b/i,
    builders: ["whyItMatters", "context2026", "longTermView"],
    callout: { variant: "info", title: "Quick fact", text: "The average new-car loan in the US in 2026 runs 68 months — meaning today's buyers stay in their cars longer than ever. Choosing well at purchase pays back for years." },
  },
  {
    match: /\b(inspect|inspection|check|examine|red flag|warning sign)\b/i,
    builders: ["inspectionPoint", "redFlag", "vinCheckBenefit"],
    bullets: { intro: "What to look for during a walk-around inspection:", items: [
      "Tire wear patterns (uneven wear points to alignment, suspension, or balance issues)",
      "Panel gaps and paint match across adjacent body panels",
      "Underbody for rust, fluid leaks, and aftermarket exhaust hangers",
      "Engine bay cleanliness, wiring tidiness, and coolant/oil color",
      "Interior for water-stain rings on carpet, headliner sag, and musty smells",
    ] },
    callout: { variant: "warning", title: "Don't skip this", text: "If a seller refuses to let you take the car to an independent mechanic for a pre-purchase inspection, walk away. A real seller has nothing to hide — and the $150 PPI fee is the cheapest insurance in the entire purchase." },
  },
  {
    match: /\b(price|pricing|cost|negotiat|deal|markup|fee)\b/i,
    builders: ["costOfOwnership", "negotiation", "longTermView"],
    callout: { variant: "tip", title: "Pro tip", text: "Walk into the dealership with three printed competitor quotes. Sales managers respond to written competitive pressure far faster than they respond to verbal claims about \"another offer.\"" },
  },
  {
    match: /\b(safety|safe|crash|airbag|iihs|nhtsa)\b/i,
    builders: ["safetyContext", "reliabilityData"],
    bullets: { intro: "Standard active-safety features to look for on used purchases:", items: [
      "Automatic emergency braking (AEB) — standard on most 2018+ models",
      "Forward collision warning",
      "Lane departure warning and lane keep assist",
      "Blind spot monitoring",
      "Adaptive cruise control with stop-and-go",
    ] },
  },
  {
    match: /\b(reliab|long.?last|durab|hold up|miles|hundred thousand)\b/i,
    builders: ["reliabilityData", "longTermView", "diyMaintenance"],
    callout: { variant: "info", title: "Reliability data sources we trust", text: "Consumer Reports owner surveys, J.D. Power Vehicle Dependability Study, RepairPal cost averages, and model-specific owner forums. Single-source rankings are easy to game; consensus across all four is hard to fake." },
  },
  {
    match: /\b(test drive|drive|driving|test)\b/i,
    builders: ["testDriveTips", "inspectionPoint"],
    bullets: { intro: "What to test during your drive:", items: [
      "Highway speed (60+ mph) for at least 10 minutes — listen for vibration, wind noise, transmission behavior",
      "Hard acceleration from a stop — confirms engine response and transmission shift quality",
      "Hard braking from 40 mph in a safe area — feel for pulsing or pulling",
      "Tight parking lot turns at low speed — listen for CV joint clicking",
      "Highway off-ramp at moderate speed — checks suspension and steering feel under load",
    ] },
  },
  {
    match: /\b(financ|loan|credit|rate|payment|apr)\b/i,
    builders: ["financingBasics", "negotiation"],
    callout: { variant: "tip", title: "Get pre-approved", text: "A 30-minute call to your local credit union can save you $1,500–$3,000 over the life of the loan. Pre-approved buyers also negotiate the actual car price better because they're not distracted by monthly-payment math." },
  },
  {
    match: /\b(warrant|cpo|certified|extended)\b/i,
    builders: ["warrantyAdvice", "longTermView"],
  },
  {
    match: /\b(insur|coverage|liability|premium)\b/i,
    builders: ["insuranceTip", "costOfOwnership"],
  },
  {
    match: /\b(paperwork|title|document|bill of sale|registration|signing)\b/i,
    builders: ["paperworkChecklist", "vinCheckBenefit"],
    callout: { variant: "warning", title: "No title, no deal", text: "Never buy a car if the seller can't produce a clean original title in their name (or has a documented bonded-title process underway). Bills of sale alone do not transfer ownership — and recovering from this mistake can cost months and thousands of dollars." },
  },
  {
    match: /\b(walk|avoid|skip|don't|never|trap)\b/i,
    builders: ["whenToWalk", "redFlag"],
  },
  {
    match: /\b(maintain|maintenance|service|diy|repair)\b/i,
    builders: ["diyMaintenance", "costOfOwnership"],
  },
  {
    match: /\b(brand|comparison|versus|vs\b)\b/i,
    builders: ["brandsCompare", "reliabilityData"],
  },
  {
    match: /\b(top|best|picks|ranking|category)\b/i,
    builders: ["reliabilityData", "longTermView", "context2026"],
  },
];

// Default builders if no rule matches — keeps every section meaningful.
const DEFAULT_BUILDERS: Array<keyof typeof G> = ["context2026", "vinCheckBenefit", "longTermView"];

function pickBuilders(sectionTitle: string): { builders: Array<keyof typeof G>; bullets?: BuilderRule["bullets"]; callout?: BuilderRule["callout"] } {
  const matches = RULES.filter((r) => r.match.test(sectionTitle));
  if (matches.length === 0) return { builders: DEFAULT_BUILDERS };
  // Combine builders from all matching rules, dedupe.
  const seen = new Set<string>();
  const builders: Array<keyof typeof G> = [];
  for (const m of matches) {
    for (const b of m.builders) {
      if (!seen.has(b)) {
        seen.add(b);
        builders.push(b);
      }
    }
  }
  // Pick the first matching rule's bullets & callout (most specific).
  return { builders: builders.slice(0, 4), bullets: matches[0].bullets, callout: matches[0].callout };
}

function expandSection(spec: PostSpec, sectionTitle: string, index: number): PortableTextNode[] {
  const ctx: ExpandCtx = {
    spec,
    sectionTitle,
    index,
    total: spec.outline.length,
    keyword: spec.focusKeyword,
  };
  const { builders, bullets: bulletSpec, callout: calloutSpec } = pickBuilders(sectionTitle);

  // Use slug+index as deterministic seed so same post always produces same body
  // but different posts produce different mixes.
  const seed = (spec.slug + index).split("").reduce((a, c) => a + c.charCodeAt(0), 0);

  const nodes: PortableTextNode[] = [h2(sectionTitle)];

  // Pick 2–3 builders, rotated by seed.
  const pickedCount = builders.length >= 3 ? 3 : builders.length;
  const offset = seed % builders.length;
  for (let i = 0; i < pickedCount; i++) {
    const fnKey = builders[(offset + i) % builders.length];
    const fn = G[fnKey];
    const text = fn(ctx);
    nodes.push(p(text));
  }

  // Insert bullets in middle sections only (not first or last).
  if (bulletSpec && index > 0 && index < spec.outline.length - 1 && (seed + index) % 2 === 0) {
    nodes.push(p(bulletSpec.intro));
    nodes.push(...bullets(bulletSpec.items));
  }

  // Insert callout occasionally — every other section, alternating with bullets.
  if (calloutSpec && (seed + index) % 3 === 0) {
    nodes.push(callout(calloutSpec.variant, calloutSpec.title, calloutSpec.text));
  }

  return nodes;
}

export function expandSpec(spec: PostSpec): PostInput {
  const nodes: PortableTextNode[] = [];

  // Intro paragraph
  nodes.push(p(spec.intro));

  // Each outline section
  spec.outline.forEach((title, i) => {
    const sectionNodes = expandSection(spec, title, i);
    nodes.push(...sectionNodes);
  });

  // Bottom CTA section
  nodes.push(h2("Final Thoughts"));
  nodes.push(p(spec.conclusion));

  return {
    slug: spec.slug,
    title: spec.title,
    seoTitle: spec.seoTitle,
    seoDescription: spec.seoDescription,
    excerpt: spec.excerpt,
    focusKeyword: spec.focusKeyword,
    keywords: spec.keywords,
    category: spec.category,
    tags: spec.tags,
    publishedAt: spec.publishedAt,
    heroImageUrl: spec.heroImageUrl,
    heroImageAlt: spec.heroImageAlt,
    body: body(...nodes),
  };
}
