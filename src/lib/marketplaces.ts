export interface MarketplaceInfo {
  slug: string;
  name: string;
  description: string;
  longDesc: string;
  icon: string;
  popular: string[];
  riskLevel: "low" | "medium" | "high";
  riskNote: string;
}

export const marketplaces: MarketplaceInfo[] = [
  {
    slug: "facebook-marketplace",
    name: "Facebook Marketplace",
    description: "Peer-to-peer marketplace built into Facebook with millions of local vehicle listings",
    longDesc:
      "Facebook Marketplace connects private sellers and buyers in local communities, making it one of the largest peer-to-peer vehicle selling platforms in the United States. Because listings are created by individuals rather than vetted dealers, running a VIN check before any purchase is essential to uncover hidden accidents, title issues, or odometer fraud.",
    icon: "📘",
    popular: ["Pickup Trucks", "SUVs", "Sedans", "Minivans"],
    riskLevel: "medium",
    riskNote:
      "Private sellers on Facebook Marketplace may not disclose accident history or title problems, making a VIN report a critical step before you hand over any money.",
  },
  {
    slug: "craigslist",
    name: "Craigslist",
    description: "Classifieds platform with a massive inventory of private-party vehicle listings nationwide",
    longDesc:
      "Craigslist has been a go-to destination for private vehicle sales for over two decades, hosting hundreds of thousands of car listings across every major U.S. city. The anonymous nature of Craigslist ads means buyers have very little information about a vehicle's true history, and VIN verification is one of the most effective defenses against common scams.",
    icon: "📋",
    popular: ["Used Cars", "Trucks", "Motorcycles", "RVs"],
    riskLevel: "medium",
    riskNote:
      "Craigslist scams involving cloned VINs, salvage titles disguised as clean titles, and rolled-back odometers are well documented — always run a VIN check before meeting a seller.",
  },
  {
    slug: "offerup",
    name: "OfferUp",
    description: "Mobile-first marketplace popular for local vehicle sales with in-app messaging",
    longDesc:
      "OfferUp is a mobile-first marketplace that has grown rapidly as a local buying and selling platform, including a sizeable auto section where private sellers list everything from daily drivers to project cars. While OfferUp does offer some seller ratings, those ratings don't reveal what's in a vehicle's history, so a VIN check adds an essential layer of due diligence.",
    icon: "📱",
    popular: ["Economy Cars", "Pickup Trucks", "Sports Cars", "Classic Cars"],
    riskLevel: "medium",
    riskNote:
      "OfferUp's seller ratings reflect transaction feedback but do not verify vehicle condition or history, so buyers should always run a VIN report independently.",
  },
  {
    slug: "ebay-motors",
    name: "eBay Motors",
    description: "High-volume online auction and fixed-price platform for new and used vehicles",
    longDesc:
      "eBay Motors is one of the world's largest online vehicle marketplaces, handling millions of transactions annually across auction and buy-it-now listings from both private sellers and professional dealers. Because many eBay Motors purchases are completed remotely — sometimes across state lines — and the vehicle is shipped sight-unseen, a thorough VIN check is especially important before committing to a bid.",
    icon: "🏷️",
    popular: ["Collector Cars", "Muscle Cars", "Import Vehicles", "Trucks"],
    riskLevel: "low",
    riskNote:
      "eBay Motors' buyer protection policy provides some coverage, but it does not replace a full vehicle history report — undisclosed title brands or accidents may still fall outside protected claim categories.",
  },
  {
    slug: "autotrader",
    name: "AutoTrader",
    description: "Leading dealer-focused marketplace with extensive new and certified pre-owned listings",
    longDesc:
      "AutoTrader is one of the most established online automotive marketplaces in the country, featuring inventory from thousands of franchised and independent dealers alongside a selection of private-party listings. While dealer listings on AutoTrader typically include more disclosure than private ads, independently verifying the VIN ensures the information provided matches what's actually on record.",
    icon: "🚗",
    popular: ["Certified Pre-Owned", "Luxury Vehicles", "Family SUVs", "Electric Vehicles"],
    riskLevel: "low",
    riskNote:
      "AutoTrader dealers are generally reputable, but even certified pre-owned vehicles can have undisclosed prior accidents or lien issues that only a VIN report will reveal.",
  },
  {
    slug: "cars-com",
    name: "Cars.com",
    description: "National dealer marketplace with consumer reviews, pricing tools, and financing resources",
    longDesc:
      "Cars.com aggregates inventory from thousands of dealerships across the country and supplements listings with consumer dealer reviews, expert ratings, and market price analysis. Despite Cars.com's robust dealer vetting, an independent VIN check gives buyers confirmation that the vehicle's documented history matches what the dealer has disclosed.",
    icon: "🏎️",
    popular: ["Family Sedans", "Crossover SUVs", "Hybrid Vehicles", "Pickup Trucks"],
    riskLevel: "low",
    riskNote:
      "Cars.com connects buyers with screened dealers, but a VIN check is still the only way to independently verify that a vehicle's title, mileage, and accident history are accurately represented.",
  },
  {
    slug: "copart",
    name: "Copart",
    description: "Online salvage and insurance auto auction with vehicles from insurance total-loss claims",
    longDesc:
      "Copart is one of the largest salvage vehicle auction companies in the world, selling total-loss vehicles on behalf of insurance companies, financial institutions, and fleet operators. Most vehicles sold through Copart carry a salvage, rebuilt, or similar branded title, and understanding the full damage history before bidding is critical to making an informed purchase decision.",
    icon: "🔨",
    popular: ["Flood-Damaged Vehicles", "Collision Totals", "Theft Recoveries", "Hail-Damaged Cars"],
    riskLevel: "high",
    riskNote:
      "Virtually all Copart vehicles carry a branded title such as salvage or rebuilt, and a VIN check is essential to understand the full extent of prior damage and any structural or airbag deployment history.",
  },
  {
    slug: "iaai",
    name: "IAAI",
    description: "Insurance Auto Auctions — major salvage auction platform for total-loss and damaged vehicles",
    longDesc:
      "Insurance Auto Auctions (IAAI) operates alongside Copart as one of the two dominant salvage auction networks in North America, liquidating total-loss and damaged vehicles from insurance carriers and fleet operators. Buyers range from licensed dismantlers and rebuilders to international exporters, and every vehicle warrants a detailed VIN report before bidding.",
    icon: "🏚️",
    popular: ["Total-Loss Sedans", "Fire-Damaged Vehicles", "Mechanical Failures", "Repo Vehicles"],
    riskLevel: "high",
    riskNote:
      "IAAI vehicles are frequently total-loss insurance write-offs with significant structural, mechanical, or flood damage, and only a VIN check will reveal the complete chain of reported incidents.",
  },
  {
    slug: "manheim",
    name: "Manheim",
    description: "The world's largest wholesale auto auction network, primarily serving licensed dealers",
    longDesc:
      "Manheim operates the world's largest network of wholesale vehicle auctions, facilitating dealer-to-dealer transactions at over 100 physical and digital auction locations across North America. Although access is typically restricted to licensed dealers, the vehicles sold through Manheim span every condition tier from off-lease and fleet units to frontline-ready and salvage inventory.",
    icon: "🏭",
    popular: ["Off-Lease Vehicles", "Fleet Units", "Rental Cars", "Dealer Trade-Ins"],
    riskLevel: "high",
    riskNote:
      "Manheim's wholesale auction environment moves vehicles quickly with limited buyer inspection time, making a pre-bid VIN check the most reliable way to uncover liens, prior damage, or title discrepancies.",
  },
  {
    slug: "car-auctions",
    name: "Car Auctions",
    description: "General government, seized, and fleet vehicle auctions open to the public",
    longDesc:
      "Public car auctions — including government surplus, seized property, fleet liquidation, and local dealer auctions — offer vehicles at potentially below-market prices but with little or no warranty and as-is sale conditions. Because auction vehicles are sold without recourse, a thorough VIN check before the auction date is the only opportunity buyers have to understand a vehicle's history.",
    icon: "🔔",
    popular: ["Government Fleet Cars", "Seized Vehicles", "Police Cruisers", "Municipal Trucks"],
    riskLevel: "high",
    riskNote:
      "Auction vehicles are sold strictly as-is with no returns, so running a VIN check before bidding is the only way to avoid inheriting a vehicle with hidden liens, prior damage, or a branded title.",
  },
];

export function getMarketplaceBySlug(slug: string): MarketplaceInfo | undefined {
  return marketplaces.find((m) => m.slug === slug);
}
