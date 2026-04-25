// Categories created in Sanity.

export interface CategorySeed {
  slug: string;
  title: string;
  description: string;
  color: "indigo" | "emerald" | "amber" | "rose" | "violet" | "cyan";
}

export const CATEGORIES: CategorySeed[] = [
  {
    slug: "buying-guides",
    title: "Buying Guides",
    description: "Step-by-step guides for buying used and new cars with confidence.",
    color: "indigo",
  },
  {
    slug: "vehicle-safety",
    title: "Vehicle Safety",
    description: "How to spot fraud, recalls, theft and damage before you buy.",
    color: "rose",
  },
  {
    slug: "vin-education",
    title: "VIN Education",
    description: "Decode every character of a VIN and understand vehicle records.",
    color: "violet",
  },
  {
    slug: "market-insights",
    title: "Market Insights",
    description: "Used car pricing, trends, and the best time to buy or sell.",
    color: "emerald",
  },
  {
    slug: "ownership-maintenance",
    title: "Ownership & Maintenance",
    description: "Keeping your vehicle reliable, road-ready, and high-resale.",
    color: "amber",
  },
  {
    slug: "selling-guides",
    title: "Selling Guides",
    description: "Sell your car faster and for more — pricing, listings, paperwork.",
    color: "cyan",
  },
];

export const AUTHOR = {
  slug: "carcheckervin-editorial",
  name: "CarCheckerVIN Editorial Team",
  role: "In-house automotive research team",
  bio: "The CarCheckerVIN editorial team combines decades of automotive industry, dealer, and journalism experience to produce trustworthy buying, selling, and ownership guidance backed by NMVTIS, NICB, and manufacturer data.",
};
