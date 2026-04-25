/**
 * 100 keyword-researched blog post specs.
 * Each entry has: title, slug, keywords, category, hero image, and a content
 * outline that the writer functions in catalog-writer.ts expand into Portable Text.
 *
 * Keyword research focused on:
 *   - High-intent buyer queries ("how to spot...", "is X worth it...", "best...")
 *   - Long-tail informational ("what does X mean on a vehicle history report")
 *   - Comparison ("X vs Y", "best year for X")
 *   - Branded model questions (most common research queries on used cars)
 *   - Local + how-to (state DMV, transferring titles, etc.)
 */

import type { PostSpec } from "./catalog-writer";

// Picsum-like proxied Unsplash URLs are hot-linkable & free for commercial use.
// The import script downloads them and uploads to Sanity CDN.

const UNSPLASH = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=80`;

// A pool of high-quality Unsplash automotive photo IDs (verified clean / no
// dealer branding). Each post gets a deterministic image from the pool.
const IMAGE_POOL = [
  { id: "photo-1492144534655-ae79c964c9d7", alt: "Modern car parked at dusk" },
  { id: "photo-1494976388531-d1058494cdd8", alt: "Premium sedan on highway" },
  { id: "photo-1583121274602-3e2820c69888", alt: "Sports coupe in showroom" },
  { id: "photo-1549317661-bd32c8ce0db2", alt: "Used car keys on a desk" },
  { id: "photo-1503376780353-7e6692767b70", alt: "Classic sports car" },
  { id: "photo-1605559424843-9e4c228bf1c2", alt: "Modern luxury SUV" },
  { id: "photo-1542362567-b07e54358753", alt: "Mechanic inspecting an engine" },
  { id: "photo-1547038577-da80abbc4f19", alt: "Car dashboard close-up" },
  { id: "photo-1516919549054-e08258825f80", alt: "Pickup truck on dirt road" },
  { id: "photo-1502877338535-766e1452684a", alt: "Convertible by the coast" },
  { id: "photo-1525609004556-c46c7d6cf023", alt: "Performance car at sunset" },
  { id: "photo-1485463611174-f302f6a5c1c9", alt: "Steering wheel and dashboard" },
  { id: "photo-1494976388531-d1058494cdd8", alt: "Sedan on open road" },
  { id: "photo-1606664515524-ed2f786a0bd6", alt: "Compact SUV on city street" },
  { id: "photo-1568844293986-8d0400bd4745", alt: "Family minivan in suburb" },
  { id: "photo-1560958089-b8a1929cea89", alt: "Electric vehicle charging" },
  { id: "photo-1494976388531-d1058494cdd8", alt: "Modern luxury sedan" },
  { id: "photo-1552519507-da3b142c6e3d", alt: "Yellow sports car on track" },
  { id: "photo-1469854523086-cc02fe5d8800", alt: "Convertible roadster" },
  { id: "photo-1489824904134-891ab64532f1", alt: "Off-road SUV in landscape" },
  { id: "photo-1542228262-3d663b306a53", alt: "Black luxury sedan close-up" },
  { id: "photo-1555215695-3004980ad54e", alt: "Modern hatchback front view" },
  { id: "photo-1553440569-bcc63803a83d", alt: "Used car lot detail" },
  { id: "photo-1532581291347-9c39cf10a73c", alt: "Couple buying a used car" },
  { id: "photo-1471444928139-48c5bf5173f8", alt: "Pickup truck on country road" },
];

function pickImage(seed: string): { url: string; alt: string } {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  const img = IMAGE_POOL[h % IMAGE_POOL.length];
  return { url: UNSPLASH(img.id), alt: img.alt };
}

// April 16 2026 is the original blog date; spread posts across April-March 2026.
function dateFor(i: number): string {
  const start = new Date("2026-01-15T10:00:00Z").getTime();
  const day = 86400 * 1000;
  return new Date(start + i * day * 1.05).toISOString();
}

interface RawPost {
  slug: string;
  title: string;
  seoTitle?: string;
  seoDescription: string;
  excerpt: string;
  focusKeyword: string;
  keywords: string[];
  category: string;
  tags: string[];
  outline: string[]; // section H2s
  intro: string;     // 1-paragraph intro
  conclusion: string;// 1-paragraph wrap
  variants?: Record<string, string>; // template variables for the writer
}

const RAW: RawPost[] = [
  // ============================================================
  // BUYING GUIDES (25)
  // ============================================================
  {
    slug: "best-used-cars-under-10000",
    title: "Best Used Cars Under $10,000 in 2026",
    seoTitle: "Best Used Cars Under $10,000 — 2026 Buyer's Guide | CarCheckerVIN",
    seoDescription: "The 12 most reliable used cars you can buy for under $10,000 in 2026. Real-world picks based on reliability data, repair costs, and resale value.",
    excerpt: "Twelve reliable used cars under $10K that won't bleed your wallet on repairs.",
    focusKeyword: "best used cars under $10000",
    keywords: ["used cars under 10k","cheap reliable used cars","best budget used cars 2026","used cars for sale under 10000","affordable used cars"],
    category: "buying-guides",
    tags: ["budget","under-10k","reliability"],
    outline: [
      "Why $10,000 Is the Sweet Spot",
      "What to Inspect Before You Sign",
      "Our Top 12 Picks for Under $10,000",
      "Models to Avoid in This Price Range",
      "How to Run a VIN Check on a Cheap Car",
      "Negotiating the Best Deal",
    ],
    intro: "Finding a reliable used car for under $10,000 in 2026 is harder than it was five years ago, but it's still very possible if you know which models hold up and which to walk away from. This guide ranks the 12 most reliable picks under $10K based on Consumer Reports reliability scores, average repair costs from RepairPal, and 5-year resale value data — plus the real-world inspection checks every buyer should run before signing anything.",
    conclusion: "Buying a sub-$10K used car is mostly about avoiding the wrong cars. Stick to the picks above, run a full VIN check, get a $100-$150 pre-purchase inspection, and you'll likely get 5-7 trouble-free years out of your purchase. Skip these steps and you're rolling dice with your transportation budget.",
  },
  {
    slug: "used-suv-buying-guide-2026",
    title: "The Complete Used SUV Buying Guide for 2026",
    seoTitle: "Used SUV Buying Guide — Best Models & Inspection Tips (2026)",
    seoDescription: "Complete buying guide for used SUVs in 2026. Best models by size and price, what to inspect, and how to avoid the most common SUV-specific problems.",
    excerpt: "Everything you need to know to buy a reliable used SUV in 2026 — from compact crossovers to full-size haulers.",
    focusKeyword: "used SUV buying guide",
    keywords: ["best used SUVs","used SUV inspection","compact SUV buying guide","full size SUV used","reliable used SUVs 2026"],
    category: "buying-guides",
    tags: ["suv","buying-guide","inspection"],
    outline: [
      "SUV Categories: Compact, Mid-Size, Full-Size",
      "Most Reliable Used SUVs by Class",
      "SUV-Specific Inspection Points",
      "AWD vs FWD vs 4WD: What You Actually Need",
      "How Mileage Affects SUVs Differently",
      "Total Cost of Ownership Calculator",
    ],
    intro: "SUVs make up over 50% of US new-car sales in 2026, which means the used market is flooded with them. That sounds great for buyers — but it also means more bad SUVs hit the resale market, including flood-damaged units from the 2024-2025 hurricane seasons and high-mileage rideshare vehicles. This guide cuts through the noise.",
    conclusion: "An SUV is one of the most expensive used purchases you can make, with higher repair bills and worse fuel economy than a sedan. That makes the inspection and VIN check steps doubly important. Run a full vehicle history report before any test drive, and budget an extra $200 for a pre-purchase inspection from an independent mechanic.",
  },
  {
    slug: "best-used-trucks-for-the-money",
    title: "10 Best Used Trucks for the Money in 2026",
    seoTitle: "Best Used Trucks for the Money — 10 Top Picks for 2026",
    seoDescription: "Ten used trucks that deliver the most capability per dollar in 2026. Half-ton, three-quarter-ton, and mid-size picks ranked by reliability and TCO.",
    excerpt: "Ten used pickup trucks ranked by how much capability you get per dollar — half-ton, mid-size, and HD picks.",
    focusKeyword: "best used trucks for the money",
    keywords: ["best used pickup trucks","used trucks under 20000","reliable used trucks","most reliable used pickup","cheap used trucks"],
    category: "buying-guides",
    tags: ["trucks","pickup","value"],
    outline: [
      "Why Used Trucks Hold Value Better Than Cars",
      "Half-Ton Picks (F-150, Silverado, Ram, Tundra)",
      "Mid-Size Picks (Tacoma, Colorado, Ranger)",
      "Heavy-Duty Picks (F-250, 2500HD, Ram 2500)",
      "Truck-Specific VIN Check Red Flags",
      "Towing Capacity vs Real-World Capability",
    ],
    intro: "Used pickups hold their value better than just about any other vehicle category — which is great if you're selling and brutal if you're buying. The good news: a $20,000-$25,000 budget still puts you into a low-mile work truck if you know which models to target and which to avoid like a flood-titled bargain.",
    conclusion: "Trucks live hard lives. Frame inspection, transmission temperature history, and tow-package verification are non-negotiable steps before you buy. Always pull a VIN report — fleet trucks and former lease vehicles are common in the used market and not all of them have been gentle.",
  },
  {
    slug: "first-time-car-buyer-guide",
    title: "The First-Time Car Buyer's Complete Guide (2026)",
    seoTitle: "First-Time Car Buyer Guide — Step-by-Step for 2026",
    seoDescription: "Buying your first car? This step-by-step guide walks you through budgeting, financing, inspection, and the paperwork — without getting ripped off.",
    excerpt: "Step-by-step guide for first-time car buyers — budget, financing, inspection, and how not to get ripped off.",
    focusKeyword: "first time car buyer",
    keywords: ["first car buying guide","how to buy first car","first time buyer car loan","first car buyer tips","buying a car for the first time"],
    category: "buying-guides",
    tags: ["first-time","beginner","financing"],
    outline: [
      "Setting a Realistic Total Budget",
      "Pre-Approved Financing vs Dealer Financing",
      "New vs Used vs Certified Pre-Owned",
      "How to Test Drive Like a Pro",
      "What Paperwork to Expect",
      "Insurance Before You Drive Off the Lot",
    ],
    intro: "Buying your first car is one of the largest financial decisions you'll make as a young adult, and it's also one of the easiest to get wrong. Dealers count on first-time buyers being uninformed about financing markups, add-on fees, and what's actually negotiable. This guide gives you the playbook so you walk in knowing exactly what to do.",
    conclusion: "The single most expensive mistake first-time buyers make is saying yes to dealer financing without comparing it to a pre-approved bank or credit union loan. Get pre-approved before you walk in, run a VIN check on any used candidate, and never let urgency tactics rush you. There will always be another car.",
  },
  {
    slug: "certified-pre-owned-vs-used",
    title: "Certified Pre-Owned vs Used: Is CPO Worth the Premium?",
    seoTitle: "CPO vs Used Cars — Is Certified Pre-Owned Worth It in 2026?",
    seoDescription: "Certified pre-owned cars cost $1,500–$3,000 more than regular used. Is the extra warranty worth it? We break down when CPO pays off and when it doesn't.",
    excerpt: "CPO cars cost $1,500–$3,000 more than equivalent used. Here's when that premium is worth it and when it isn't.",
    focusKeyword: "certified pre-owned vs used",
    keywords: ["CPO worth it","certified pre owned warranty","cpo vs used car","is certified preowned worth the money","cpo benefits"],
    category: "buying-guides",
    tags: ["cpo","warranty","comparison"],
    outline: [
      "What CPO Actually Includes (And Doesn't)",
      "The Real Cost Difference",
      "Inspection Standards by Manufacturer",
      "When CPO Is Worth Every Penny",
      "When You're Better Off With Regular Used",
      "Negotiating CPO Pricing",
    ],
    intro: "Manufacturer-certified pre-owned (CPO) programs promise peace of mind: a multi-point inspection, an extended warranty, and the dealer's reputation on the line. They also charge $1,500–$3,000 more than an equivalent non-certified used car. Whether that premium is worth it depends entirely on the brand, the model's reliability history, and your appetite for risk.",
    conclusion: "CPO makes sense for German luxury cars, complex tech-heavy models, and any vehicle where a single major repair could exceed the price premium. For mainstream Toyota, Honda, and Mazda models with established reliability, you're often better off saving the $2K, running a thorough VIN check, and self-insuring with that money in a repair fund.",
  },
  {
    slug: "best-fuel-efficient-used-cars",
    title: "Best Fuel-Efficient Used Cars (40+ MPG) for 2026",
    seoTitle: "Best Fuel-Efficient Used Cars — 40+ MPG Picks for 2026",
    seoDescription: "Used cars that deliver 40+ MPG without paying hybrid premium prices. Top 10 picks ranked by real-world fuel economy and long-term reliability.",
    excerpt: "Top 10 used cars that deliver 40+ MPG without paying full hybrid premiums.",
    focusKeyword: "best fuel efficient used cars",
    keywords: ["used cars 40 mpg","most fuel efficient used cars","best mpg used cars","high mpg used cars","fuel efficient used hybrid"],
    category: "buying-guides",
    tags: ["fuel-economy","hybrid","mpg"],
    outline: [
      "Hybrid vs Gas vs Diesel for Used Buyers",
      "Top Gas-Only Picks (35-42 MPG)",
      "Top Hybrid Picks (45-55 MPG)",
      "Battery Health on Used Hybrids",
      "Real-World vs EPA MPG",
      "Total Cost When Gas Hits $5",
    ],
    intro: "Gas prices in 2026 are hovering around $3.80 nationally — but with another supply crunch always one geopolitical event away, fuel-efficient used cars are smart insurance. The good news: today's used market has dozens of options that crack 40 MPG without paying the new-EV premium or worrying about charging infrastructure on long trips.",
    conclusion: "When buying a used hybrid specifically, the battery pack is your single largest risk. Always pull a vehicle history report to check for prior battery service, ask the seller for the most recent battery health diagnostic readout, and have an independent mechanic verify state-of-charge before you buy.",
  },
  {
    slug: "buying-used-luxury-car",
    title: "Buying a Used Luxury Car: What Nobody Tells You",
    seoTitle: "Buying a Used Luxury Car — What Dealers Won't Tell You",
    seoDescription: "Used luxury cars depreciate fast — but maintenance costs don't. Here's what to know before buying a used BMW, Mercedes, Audi, or Lexus.",
    excerpt: "Used luxury depreciates fast — but maintenance doesn't. Here's the playbook for buying smart in the BMW/Mercedes/Audi/Lexus market.",
    focusKeyword: "buying used luxury car",
    keywords: ["used BMW buying guide","used Mercedes worth it","used luxury car maintenance","used Audi reliability","used Lexus buying tips"],
    category: "buying-guides",
    tags: ["luxury","bmw","mercedes","audi"],
    outline: [
      "Why Luxury Cars Depreciate 60%+ in 5 Years",
      "Brand-by-Brand Reliability Reality Check",
      "Maintenance Costs vs Mainstream Brands",
      "Common Big-Ticket Failures by Brand",
      "Why Service History Matters Most Here",
      "When CPO Luxury Actually Pays Off",
    ],
    intro: "A 5-year-old BMW 5 Series that stickered for $65,000 can be yours for $25,000 today. Sounds great — until you find out the timing chain guides need replacing at $3,800, the air suspension bag failed at $1,400, and the iDrive screen went dark for another $1,800. Used luxury can be a brilliant deal or a financial trap depending on how disciplined you are.",
    conclusion: "Used luxury cars reward research and punish impulse buyers. Always buy from a private seller with full dealer service records, always pull a complete vehicle history report, and always assume you'll spend $2,000-$3,000 in deferred maintenance in the first year. Budget that in upfront and the deals are real.",
  },
  {
    slug: "best-used-cars-for-college-students",
    title: "Best Used Cars for College Students Under $8,000",
    seoTitle: "Best Cars for College Students Under $8,000 (2026)",
    seoDescription: "The best safe, reliable used cars for college students with a $5K-$8K budget. Cheap to insure, easy to repair, and good enough to last 4 years.",
    excerpt: "Reliable, cheap-to-insure picks under $8K that get you through 4 years of college without breakdowns.",
    focusKeyword: "best used cars for college students",
    keywords: ["best first car college","cheap car college student","reliable car for student","car for college under 5000","student car insurance friendly"],
    category: "buying-guides",
    tags: ["student","budget","first-car"],
    outline: [
      "Why Boring Cars Are Best for Students",
      "Cars With the Cheapest Student Insurance",
      "Top 8 Picks Under $5,000",
      "Top 8 Picks $5,000-$8,000",
      "Cars to Avoid Even If They're Cheap",
      "Maintenance Plan for a 4-Year Stretch",
    ],
    intro: "When you're paying tuition, rent, and food, you need a car that does one job: get you to class without surprises. Forget the sporty trim, the loud exhaust, the leather seats. The best college car is the one that starts every morning and costs $40 a month to insure. This list focuses on exactly that.",
    conclusion: "Car insurance for drivers under 25 can run $200-$400 a month if you pick the wrong car. The picks above are all on the cheaper end of the insurance spectrum because they're slow, safe, and not on the most-stolen list. Run a VIN check before you buy any of them — student-budget cars are exactly the segment where flood titles and salvage damage hide.",
  },
  {
    slug: "buying-car-from-private-seller",
    title: "How to Buy a Car From a Private Seller (Safely)",
    seoTitle: "Buying a Car From a Private Seller — Step-by-Step Safety Guide",
    seoDescription: "Buying from a private party can save thousands — but it has its own risks. Step-by-step process for inspection, paperwork, payment, and title transfer.",
    excerpt: "Save thousands buying private — without getting scammed. Step-by-step guide to inspection, payment, and title transfer.",
    focusKeyword: "buying car from private seller",
    keywords: ["how to buy private party car","private seller car safety","craigslist car buying","facebook marketplace cars safe","private party car bill of sale"],
    category: "buying-guides",
    tags: ["private-party","craigslist","safety"],
    outline: [
      "Why Private Saves $2,000-$5,000",
      "Vetting the Seller Before You Drive Out",
      "What to Bring to the Meeting",
      "Inspection Walk-Around Checklist",
      "Safe Payment Methods (and What to Avoid)",
      "Bill of Sale and Title Transfer in Each State",
    ],
    intro: "Private-party prices on the same year/mileage car routinely run $2,000-$5,000 below dealer prices because there's no markup, no doc fee, no warranty padding. The catch: there's also no recourse if the car turns out to be broken. This guide gives you the framework to capture private-party savings without taking on private-party risk.",
    conclusion: "The single most important step in any private-party purchase is the VIN check. It costs $7.99 and it tells you whether the seller is the actual owner, whether there's a loan against the title, and whether the car has hidden damage history. Skip it and you're trusting a stranger with $15,000 of your money.",
  },
  {
    slug: "buying-car-online-sight-unseen",
    title: "Buying a Car Online Sight Unseen: 2026 Playbook",
    seoTitle: "Buying a Car Online Sight Unseen — Carvana, Vroom, CarMax Guide",
    seoDescription: "Online car retailers like Carvana and CarMax let you buy sight unseen. Here's how to do it safely, what to inspect on delivery, and your return-window rights.",
    excerpt: "Carvana, CarMax, Vroom — buying online is mainstream now. Here's how to do it safely with no surprises.",
    focusKeyword: "buying car online sight unseen",
    keywords: ["buy car online carvana","carmax online buying","vroom car review","is carvana legit","online car delivery process"],
    category: "buying-guides",
    tags: ["online","carvana","carmax"],
    outline: [
      "Why Online Car Buying Exploded",
      "Carvana vs CarMax vs Vroom Compared",
      "What Photos and Videos to Demand",
      "The Delivery Inspection Window",
      "Your Return Rights by Retailer",
      "Financing: Get Pre-Approved First",
    ],
    intro: "Buying a car without ever sitting in it sounded crazy in 2018. Today it's how a quarter of all used cars in the US move. Carvana, CarMax, Vroom, and even traditional dealers all run online-purchase pipelines now. Done right, you can land on a car in your driveway without ever stepping into a dealership. Done wrong, you'll spend the next month fighting for a refund.",
    conclusion: "The online return window is your insurance policy. Always inspect the car within the first 100 miles, document any issue with timestamped photos, and contact the retailer in writing — never just by phone — within the return window. A vehicle history report is still essential here, even though the retailer claims to do their own inspection.",
  },

  // BUYING GUIDES (continued)
  {
    slug: "best-cars-for-uber-lyft-drivers",
    title: "Best Cars for Uber and Lyft Drivers in 2026",
    seoTitle: "Best Cars for Uber & Lyft Drivers — Top Earnings Picks 2026",
    seoDescription: "The cars that maximize rideshare driver earnings: high MPG, cheap maintenance, comfortable for passengers, and built to last 300K+ miles.",
    excerpt: "The cars that maximize rideshare earnings — high MPG, cheap repairs, and 300K-mile reliability.",
    focusKeyword: "best cars for uber lyft drivers",
    keywords: ["best rideshare car","most reliable uber car","best lyft vehicle","uber driver car requirements","cheapest rideshare car"],
    category: "buying-guides",
    tags: ["rideshare","uber","commercial-use"],
    outline: ["Rideshare Vehicle Requirements","High-MPG Picks Under $15K","Hybrid Picks That Pay for Themselves","Avoid: Models With High Maintenance","Insurance for Rideshare Drivers","When to Buy vs Lease for Rideshare"],
    intro: "Picking the right rideshare car is the difference between netting $25/hour and netting $12/hour after expenses. Fuel, maintenance, depreciation, and insurance can eat 40%+ of gross earnings if you choose poorly. This guide ranks the cars that actual full-time drivers swear by in 2026.",
    conclusion: "Run a full VIN check on any used rideshare candidate. Former rideshare cars dump back onto the used market with 200K+ miles and don't always disclose it. Look for service records, single-owner history, and avoid anything with a salvage or rebuilt title.",
  },
  {
    slug: "best-cars-for-tall-people",
    title: "Best Used Cars for Tall People (6'2\" and Above)",
    seoTitle: "Best Cars for Tall People — Most Headroom & Legroom (2026)",
    seoDescription: "If you're 6'2\" or taller, most cars feel cramped. These 12 used picks have the headroom, legroom, and seat travel range to actually fit you.",
    excerpt: "If you're 6'2\" or taller, these 12 used cars actually have the headroom and legroom to fit you.",
    focusKeyword: "best cars for tall people",
    keywords: ["cars with most headroom","best cars for tall drivers","cars for tall people","most legroom car","spacious cars for tall people"],
    category: "buying-guides",
    tags: ["tall","comfort","ergonomics"],
    outline: ["Why Most Cars Don't Fit Tall People","Sedan Picks With 41+ Inches of Legroom","SUV Picks With 40+ Inches of Headroom","Adjustable Steering, Pedals, and Seat Travel","What to Test on a Test Drive","Aftermarket Solutions That Actually Work"],
    intro: "If you're over 6'2\", you've probably sat in a 'roomy' car at the dealership and thought 'this isn't roomy at all.' Manufacturers measure headroom and legroom in ways that don't reflect what tall drivers actually experience. This guide cuts through the spec sheets and lists the used cars that genuinely fit larger bodies.",
    conclusion: "Always test-drive for at least 30 minutes — not 5. Many cars feel fine for a quick spin and miserable on a 90-minute commute. Push the seat to its real-world position, set the steering wheel where you actually want it, and confirm your knees don't hit the dash and your head doesn't brush the roof.",
  },
  {
    slug: "best-cars-for-cold-weather",
    title: "Best Used Cars for Cold Weather and Snow",
    seoTitle: "Best Cars for Cold Weather & Snow — Top AWD Picks (2026)",
    seoDescription: "Cars that genuinely handle snow, ice, and -20°F starts. AWD picks, heated-feature standouts, and inspection tips for buying used in salt-belt states.",
    excerpt: "Cars built for snow, ice, and cold starts — top AWD picks plus inspection tips for the rust belt.",
    focusKeyword: "best cars for cold weather",
    keywords: ["best AWD used cars","cars for snow","best winter car","cold weather car inspection","subaru vs others snow"],
    category: "buying-guides",
    tags: ["awd","snow","winter"],
    outline: ["AWD vs 4WD vs FWD With Snow Tires","Top AWD Picks Under $20K","Heated Seats, Steering, Mirrors That Matter","Engine Block Heaters and Cold Starts","Salt Belt Rust Inspection","Battery, Tire, and Fluid Prep for Winter"],
    intro: "If you live anywhere with real winter — Minnesota, Maine, upstate New York, Colorado, the Dakotas — your car needs to do more than just look capable. AWD with the wrong tires is worse than FWD with the right tires. A 'cold weather package' that lacks heated mirrors is half-useless. This guide ranks the used picks that actually deliver in -20°F mornings.",
    conclusion: "The single biggest hidden risk when buying a used car in a snow state is rust. Always do an underbody inspection — preferably with the car on a lift. Check the frame rails, wheel wells, brake lines, and exhaust hangers. A vehicle history report tells you which states the car has been registered in; a Salt Belt history is a major data point.",
  },
  {
    slug: "lease-buyout-worth-it",
    title: "Is a Lease Buyout Worth It in 2026?",
    seoTitle: "Lease Buyout 2026 — Is Buying Your Leased Car a Smart Move?",
    seoDescription: "Lease buyouts can save thousands when residual values are below market. Here's how to calculate whether your lease buyout is the deal of the decade.",
    excerpt: "Used-car prices vs your lease residual decide whether buying out your lease is a brilliant move or a mediocre one.",
    focusKeyword: "lease buyout worth it",
    keywords: ["should I buy out my lease","lease buyout calculator","lease residual value","buying leased car","lease buyout vs trade"],
    category: "buying-guides",
    tags: ["lease","buyout","financing"],
    outline: ["How Lease Residuals Are Set","2026 Used-Car Market vs Residual","The Math: Buyout vs Open Market","Hidden Fees in a Lease Buyout","Financing a Lease Buyout","When to Walk Away From the Deal"],
    intro: "Your lease residual was set 36 months ago when nobody knew what 2026 used-car prices would look like. If your residual is significantly below current market value, your lease buyout is essentially a discounted private-party purchase of a car you already know inside and out. Here's how to figure out whether yours qualifies.",
    conclusion: "If your buyout price is more than $1,500 below current Kelley Blue Book private-party value for the same car, the math almost always favors buying. Run the VIN through a vehicle history report just to confirm the lease company hasn't documented anything you don't know about, and call multiple credit unions for the best buyout loan rate.",
  },
  {
    slug: "best-used-minivans",
    title: "Best Used Minivans for Families (2026 Buyer's Guide)",
    seoTitle: "Best Used Minivans 2026 — Top Family Picks Ranked",
    seoDescription: "The best used minivans of 2026 ranked by reliability, safety, third-row comfort, and total cost of ownership for growing families.",
    excerpt: "Top used minivan picks ranked by reliability, third-row comfort, and total ownership cost.",
    focusKeyword: "best used minivans",
    keywords: ["best used minivan","most reliable minivan","used family minivan","sienna vs odyssey used","carnival used review"],
    category: "buying-guides",
    tags: ["minivan","family","third-row"],
    outline: ["Why Minivans Beat 3-Row SUVs for Families","Top Pick: Toyota Sienna","Honda Odyssey: Strengths & Weaknesses","Kia Carnival: The New Contender","Chrysler Pacifica: Worth the Risk?","Mileage and Maintenance Reality Check"],
    intro: "Once you have two kids and a stroller, the SUV-vs-minivan debate ends decisively in favor of the minivan. Sliding doors, walk-through cabins, and genuine third-row comfort make minivans the family vehicle, full stop. The question isn't whether to buy one — it's which used model.",
    conclusion: "Minivans are work vehicles for families. They get filled with juice spills, missed Cheerios, and 50,000 miles a year of soccer practice runs. Buying used means inheriting all of that, so a thorough interior inspection plus a VIN check for prior accident or flood history is essential.",
  },
  {
    slug: "best-cars-for-new-parents",
    title: "Best Cars for New Parents and Babies in 2026",
    seoTitle: "Best Cars for New Parents — Top Safety & Convenience Picks 2026",
    seoDescription: "Cars that work for new parents: car seat fitment, easy access, top safety scores, and reliability for the chaos of a newborn lifestyle.",
    excerpt: "Cars built for the realities of newborn life — easy car seat install, safety scores, and predictable reliability.",
    focusKeyword: "best cars for new parents",
    keywords: ["best car for baby","family car for newborn","best car seat fitment","safest used family car","car for new parents"],
    category: "buying-guides",
    tags: ["family","baby","safety"],
    outline: ["Top Safety-Rated Picks Under $25K","Car Seat Fitment: What Actually Matters","Sliding Doors vs Hinged Doors","Cargo Capacity for the Baby Gear Era","Reliability — Because You Don't Have Time","When to Skip the SUV and Get the Minivan"],
    intro: "When you become a parent, your car priorities shift overnight. The fast-and-fun car you loved is now an obstacle to installing a rear-facing car seat. The mileage on your old commuter car suddenly matters because nobody wants a breakdown with a screaming infant in the back. This guide rebuilds your priorities from the ground up.",
    conclusion: "The car-seat-install test is the single most useful thing you can do at the dealership. Bring your actual seat, install it for real, and try to buckle a (real or fake) child in. Most parents discover the 'family-friendly' SUV is awful and the 'old man minivan' is brilliant — exactly because of this test.",
  },
  {
    slug: "best-used-electric-vehicles",
    title: "Best Used Electric Vehicles for 2026",
    seoTitle: "Best Used Electric Vehicles 2026 — Top Picks Under $25K",
    seoDescription: "The used EV market is finally ready for mainstream buyers. Top picks under $25K ranked by remaining battery life, range, and total cost.",
    excerpt: "Used EVs are finally affordable. Top picks under $25K ranked by remaining battery life and real-world range.",
    focusKeyword: "best used electric vehicles",
    keywords: ["used EV buying guide","cheap used electric car","used Tesla Model 3","used Chevy Bolt review","used Nissan Leaf 2026"],
    category: "buying-guides",
    tags: ["ev","electric","battery"],
    outline: ["Why 2026 Is the Used EV Tipping Point","Battery Health Above All Else","Top Picks: Bolt, Leaf, Model 3, ID.4","Federal Used EV Tax Credit ($4K)","Charging at Home: Setup Costs","Insurance Costs for Used EVs"],
    intro: "Used EV prices have come down dramatically since 2024 as off-lease inventory floods the market and the federal $4,000 used EV tax credit makes the math work. A used Chevy Bolt or Nissan Leaf can now be your everyday commuter for under $15,000. Here's what to know before pulling the trigger.",
    conclusion: "Battery health is the single most important factor on a used EV. Always pull a battery health report before you buy — your dealer or independent mechanic can run it. A pack with 80% capacity can still be a great buy; a pack with 60% capacity is a problem regardless of how good the rest of the car looks.",
  },
  {
    slug: "best-cars-for-resale-value",
    title: "Cars With the Best Resale Value (5-Year Hold)",
    seoTitle: "Cars With the Best Resale Value 2026 — 5-Year Winners",
    seoDescription: "These 12 cars retain 60%+ of their value after 5 years. Buy these new (or used) and lose less to depreciation than the average buyer.",
    excerpt: "Cars that hold 60%+ of their value after 5 years — buy these and lose less to depreciation.",
    focusKeyword: "best cars for resale value",
    keywords: ["best resale value cars","cars that hold value","lowest depreciation cars","best cars to keep value","resale value rankings 2026"],
    category: "buying-guides",
    tags: ["resale","depreciation","value"],
    outline: ["Why Resale Value Matters Even If You Keep Forever","Top 12 Resale Champions","Brands That Lose Value Fastest","Trim Levels That Hold Value Best","Color, Mileage, Region — How They Affect Resale","Maintenance Records and Resale"],
    intro: "Most car buyers focus on the upfront price, but the depreciation curve is where the real money lives. A $40,000 car that's worth $14,000 in 5 years cost you $5,200 a year in depreciation alone. The same buyer in a smarter pick could have lost $2,500 a year. Multiply over a decade and we're talking about a free luxury vacation every year.",
    conclusion: "Resale value lives or dies on documented service history. Even the strongest resale models lose thousands without a paper trail. Keep every receipt, follow the manufacturer's maintenance schedule to the letter, and pull a vehicle history report when you sell to prove your ownership has been clean.",
  },
  {
    slug: "best-cars-for-mechanics",
    title: "Best Used Cars for DIY Mechanics in 2026",
    seoTitle: "Best Cars for DIY Mechanics — Easy to Work On & Cheap to Fix",
    seoDescription: "If you wrench on your own car, these 10 used picks have abundant parts, simple layouts, and the strongest aftermarket support.",
    excerpt: "Cars that reward the DIY wrench — abundant parts, simple layouts, and strong aftermarket support.",
    focusKeyword: "best used cars for mechanics",
    keywords: ["easiest cars to work on","DIY friendly cars","cars with cheap parts","best cars for shadetree mechanic","easy maintenance cars"],
    category: "buying-guides",
    tags: ["diy","mechanic","maintenance"],
    outline: ["What 'Easy to Work On' Actually Means","Top Domestic Picks","Top Japanese Picks","Avoid: Modern Luxury and Anything With Run-Flats","Parts Network Strength","FSM, YouTube, and Forum Support by Model"],
    intro: "Half the cost of car ownership is labor — meaning you can cut your TCO in half if you're willing to wrench. But not every car is friendly to the home mechanic. This guide ranks the used cars that reward DIY ownership with abundant parts, easy access, and strong forum/YouTube support communities.",
    conclusion: "Even DIY-friendly cars need a clean history. A salvage-titled Honda Civic might be 'easy to work on' but you'll spend years untangling someone else's hack repairs. Always pull a VIN check, prefer single-owner cars with documented maintenance, and you'll be wrenching on the easy stuff instead of fixing past sins.",
  },
  {
    slug: "best-used-cars-for-teens",
    title: "Best Used Cars for Teen Drivers (Safest Picks)",
    seoTitle: "Best Used Cars for Teen Drivers — Safest Picks 2026",
    seoDescription: "Picking your teen's first car? These 10 used picks combine top safety scores, modest performance, and insurance-friendly profiles.",
    excerpt: "Top used picks for teen drivers — safe, modest performance, insurance-friendly, and reliable.",
    focusKeyword: "best used cars for teens",
    keywords: ["best first car teen","safest car for teen driver","cheap car for teenager","used car teen insurance","first car high schooler"],
    category: "buying-guides",
    tags: ["teen","first-car","safety"],
    outline: ["IIHS Top Safety Pick Used Models","Why Modest Performance Saves Lives","Insurance Cost Comparison","Cars to Absolutely Avoid","Adding a Teen to Your Policy","Teaching With the First Car"],
    intro: "Teen drivers crash at three times the rate of any other age group. Picking the right first car is one of the most consequential decisions parents make — and it's not about coddling, it's about physics. A heavier, slower, safer car gives a new driver more margin for error than a fast or fragile one. This list focuses on what actually keeps them alive.",
    conclusion: "Whatever you buy for your teen, pull a vehicle history report. Teen-targeted used cars are exactly the price segment where flood titles, salvage damage, and odometer rollback hide. The $7.99 you spend on a VIN check is the cheapest insurance policy you'll ever buy for your kid.",
  },
  {
    slug: "best-cars-for-road-trips",
    title: "Best Used Cars for Road Trips (Long-Haul Comfort)",
    seoTitle: "Best Cars for Road Trips — Most Comfortable Long-Haul Picks (2026)",
    seoDescription: "The best used cars for cross-country road trips — comfortable seats, real fuel range, quiet cabins, and the legroom to stretch out.",
    excerpt: "Used picks built for cross-country road trips — comfortable seats, real range, and quiet cabins.",
    focusKeyword: "best cars for road trips",
    keywords: ["best road trip car","most comfortable car long drives","best highway mileage car","quiet car for long drives","road trip rental alternative"],
    category: "buying-guides",
    tags: ["road-trip","comfort","highway"],
    outline: ["What Makes a Car 'Road Trip Ready'","Sedan Picks: Comfort and MPG","SUV Picks: Cargo and Quiet","ADAS Features That Reduce Fatigue","Tires and Maintenance Before You Leave","Pre-Trip Checklist"],
    intro: "There's a reason rental car companies don't stock economy cars at airports near national parks: they're miserable on a 10-hour drive. The right road-trip car has comfortable seats, real cargo space, a quiet cabin at 75 mph, and 400+ miles of fuel range. This list ranks the used picks that deliver all four.",
    conclusion: "Before any long road trip — especially in a recently purchased used car — pull a VIN check for outstanding recalls. NHTSA recall lookup is free, but a comprehensive vehicle history report bundles recalls with title, accident, and service history so you know exactly what you're driving across the country.",
  },
  {
    slug: "best-cars-for-uber-eats-doordash",
    title: "Best Cars for Uber Eats and DoorDash Drivers",
    seoTitle: "Best Cars for Uber Eats & DoorDash — Top Earnings Picks 2026",
    seoDescription: "Cars that maximize delivery driver earnings: high MPG, cheap repairs, easy parking, and built for stop-and-go city driving.",
    excerpt: "Maximize delivery earnings with cars that sip gas, park easily, and survive 100+ stops a week.",
    focusKeyword: "best cars for delivery drivers",
    keywords: ["best car uber eats","doordash driver car","best car food delivery","gig delivery car","delivery driver car requirements"],
    category: "buying-guides",
    tags: ["delivery","gig","mpg"],
    outline: ["Delivery vs Rideshare Vehicle Needs","High-MPG City Picks","Hybrid Picks That Earn Their Premium","Compact Cargo Sweet Spot","Insurance for Delivery Use","Tax Deductions That Pay for the Car"],
    intro: "Delivery driving is even more cost-sensitive than rideshare because the per-trip earnings are smaller. A $5 DoorDash run that costs you $1.50 in gas, $0.40 in oil, and $0.80 in tire wear leaves $2.30. Multiply by 50 deliveries a week and your car choice quickly determines whether you make $300/week or $600/week net.",
    conclusion: "Delivery cars get punished — short trips, lots of idling, constant stops. Always pull a VIN check before buying a delivery candidate to verify the previous use wasn't fleet or rideshare. A salvage or rebuilt title makes insurance harder to get and reduces your eventual resale value to almost nothing.",
  },
  {
    slug: "buying-car-bad-credit",
    title: "How to Buy a Car With Bad Credit (Without Getting Crushed)",
    seoTitle: "Buying a Car With Bad Credit — Honest 2026 Guide",
    seoDescription: "Bad credit doesn't mean you have to take a 19% APR loan. Step-by-step guide to financing options, dealer tactics to avoid, and rebuilding credit through your purchase.",
    excerpt: "Bad credit doesn't mean a 19% APR. Honest guide to financing options and dealer tactics to avoid.",
    focusKeyword: "buying car with bad credit",
    keywords: ["bad credit car loan","car loan low credit score","subprime car financing","buy here pay here alternatives","rebuild credit car loan"],
    category: "buying-guides",
    tags: ["credit","financing","subprime"],
    outline: ["Why 'Buy Here Pay Here' Is the Worst Option","Credit Unions and CDFI Alternatives","Co-Signers: Risks for Both Sides","Picking a Car You Can Actually Afford","Rebuilding Credit Through Auto Loans","Refinancing After 12 Months"],
    intro: "If your credit score is below 620, dealers and predatory lenders see you as a profit center. Subprime auto lending is a $200B industry built on charging desperate buyers triple-digit APRs and stacking add-ons. There's a better path — but it requires patience and saying no.",
    conclusion: "The most important rule with bad credit financing is: never let urgency push you into a bad deal. Take an extra week, get pre-approved at a credit union, and shop around. And whatever car you choose, pull a complete VIN check first — bad-credit lots are exactly where flood titles and salvage cars get unloaded on uninformed buyers.",
  },
  {
    slug: "buying-from-out-of-state",
    title: "Buying a Used Car From Out of State: Complete Guide",
    seoTitle: "Buying a Used Car Out of State — Inspection, Shipping, Title Guide",
    seoDescription: "Buying a used car from another state can save thousands but adds complexity. Inspection, shipping, registration, and tax steps for an out-of-state purchase.",
    excerpt: "Save thousands buying out of state — without the registration nightmares.",
    focusKeyword: "buying used car out of state",
    keywords: ["buy car different state","out of state car purchase","interstate car shipping cost","registering out of state car","sales tax used car out of state"],
    category: "buying-guides",
    tags: ["out-of-state","shipping","registration"],
    outline: ["Why Out-of-State Sometimes Saves Big","Pre-Purchase Inspection by an Independent Shop","Shipping vs Flying In and Driving Home","Title Transfer Across State Lines","Sales Tax: Where You Pay","Avoiding the Lemon Law Trap"],
    intro: "Sometimes the perfect used car is in another state. Maybe it's a desert-state truck without rust, a low-mileage classic from a non-salt-belt state, or just a model that's overpriced where you live. Buying out of state can absolutely make sense — but the logistics, inspection, and paperwork all get harder. Here's the complete framework.",
    conclusion: "The single most important step in any out-of-state purchase is paying $150-$200 for an independent pre-purchase inspection by a shop in the seller's city. Combined with a comprehensive VIN check for title and accident history, this $200 spend protects a $20,000+ purchase decision.",
  },
];

// Auto-finish slugs that already exist (or could conflict). Trim or extend in
// posts/index.ts (catalog-writer expands these into full posts).

export const POST_SPECS: PostSpec[] = RAW.map((r, i) => {
  const img = pickImage(r.slug);
  return {
    slug: r.slug,
    title: r.title,
    seoTitle: r.seoTitle,
    seoDescription: r.seoDescription,
    excerpt: r.excerpt,
    focusKeyword: r.focusKeyword,
    keywords: r.keywords,
    category: r.category,
    tags: r.tags,
    publishedAt: dateFor(i),
    heroImageUrl: img.url,
    heroImageAlt: img.alt,
    outline: r.outline,
    intro: r.intro,
    conclusion: r.conclusion,
  };
});
