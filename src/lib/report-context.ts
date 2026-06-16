/**
 * Source-page → report-preview "message match" context.
 *
 * When a visitor reaches the report from one of the focused check tools (e.g.
 * /warranty-check, /classic-car-vin), the source page carries `?from=<slug>`
 * into the report URL and the report renders an *additive*, friendly banner
 * that echoes what the visitor came to do — so the destination feels like a
 * natural continuation of the page they left. This is a standard conversion
 * technique known as "message match" / scent continuity.
 *
 * IMPORTANT — this is progressive enhancement only:
 *   • The banner is additive. The default report (no `from`, or an unknown
 *     `from`) is unchanged and complete — search crawlers and the ~20-30% of
 *     users whose browsers strip the param see the full baseline experience.
 *   • The canonical URL stays clean (no `from` param), so this never creates
 *     duplicate-content or cloaking issues.
 *   • Copy stays warm but honest — it reassures and reframes emphasis, it does
 *     not promise data we might not have (hedged with "reported", "may").
 *
 * The data here is icon-agnostic (`icon` is a string key) so this module stays
 * free of React/lucide imports and can be imported by both the client
 * VinSearchForm and the server report-preview page.
 */

export interface ReportContext {
  /** URL path segment of the source page (also the `?from=` value). */
  slug: string;
  /** Small uppercase label shown above the headline. */
  eyebrow: string;
  /** Friendly headline. `{vehicle}` is replaced with the decoded label. */
  headline: string;
  /** Conversational one-to-two sentences. `{vehicle}` replaced at render. */
  body: string;
  /** lucide icon key — mapped to a component on the render side. */
  icon:
    | "BadgeCheck"
    | "Banknote"
    | "AlertTriangle"
    | "Gauge"
    | "ShieldAlert"
    | "Fingerprint"
    | "Skull"
    | "Waves"
    | "Bike"
    | "Car"
    | "Citrus"
    | "ScrollText";
}

export const REPORT_CONTEXTS: Record<string, ReportContext> = {
  "warranty-check": {
    slug: "warranty-check",
    eyebrow: "Warranty Check",
    headline: "Wondering if this {vehicle} still has warranty left?",
    body: "Good call checking first. Your full report pulls the in-service date and original factory coverage window — plus any reported lemon-law buyback — so you know what protection may still carry over before you commit.",
    icon: "BadgeCheck",
  },
  "vehicle-lien-check": {
    slug: "vehicle-lien-check",
    eyebrow: "Lien & Loan Check",
    headline: "Making sure no lender still has a claim on this {vehicle}?",
    body: "Smart move. We check reported open liens and loan records tied to this VIN, so a hidden lienholder doesn't come knocking after you've handed over the cash.",
    icon: "Banknote",
  },
  "accident-history-check": {
    slug: "accident-history-check",
    eyebrow: "Accident History",
    headline: "Curious whether this {vehicle} has been in a crash?",
    body: "Let's find out together. Your report gathers reported collisions, damage severity, airbag deployment and frame damage from thousands of sources — the things a seller might not mention.",
    icon: "AlertTriangle",
  },
  "odometer-check": {
    slug: "odometer-check",
    eyebrow: "Odometer Check",
    headline: "Want to be sure the miles on this {vehicle} are real?",
    body: "We'll track the reported odometer readings over time and flag anything that points to a rollback — because paying for low miles you didn't actually get is a costly surprise.",
    icon: "Gauge",
  },
  "salvage-title-check": {
    slug: "salvage-title-check",
    eyebrow: "Salvage Title Check",
    headline: "Checking this {vehicle} for a salvage or rebuilt title?",
    body: "Worth a careful look. We scan NMVTIS title brands across all 50 states — salvage, junk, flood and rebuilt — so a clean-looking car can't hide a branded past.",
    icon: "ShieldAlert",
  },
  "stolen-vehicle-check": {
    slug: "stolen-vehicle-check",
    eyebrow: "Theft Check",
    headline: "Want peace of mind that this {vehicle} isn't stolen?",
    body: "Totally reasonable. Your report checks reported theft and total-loss records tied to this VIN, so you're not unknowingly buying someone else's headache.",
    icon: "Fingerprint",
  },
  "recall-check": {
    slug: "recall-check",
    eyebrow: "Recall Check",
    headline: "Checking this {vehicle} for open safety recalls?",
    body: "Quick and free. We surface open NHTSA recalls for this exact VIN, so you know what still needs a fix — and it's usually repaired at no cost at the dealer.",
    icon: "ShieldAlert",
  },
  "flood-check": {
    slug: "flood-check",
    eyebrow: "Flood Damage Check",
    headline: "Worried this {vehicle} might have water damage?",
    body: "Better safe than soggy. We flag reported flood and water-damage title brands plus related salvage records — the kind of damage that quietly wrecks electronics down the road.",
    icon: "Waves",
  },
  "total-loss-check": {
    slug: "total-loss-check",
    eyebrow: "Total Loss Check",
    headline: "Checking whether this {vehicle} was ever written off?",
    body: "Good instinct. Your report compiles reported total-loss and salvage events tied to this VIN, so an insurance write-off doesn't slip past you.",
    icon: "Skull",
  },
  "lemon-check": {
    slug: "lemon-check",
    eyebrow: "Lemon Check",
    headline: "Making sure this {vehicle} isn't a lemon?",
    body: "Nobody wants a money pit. We look for reported lemon-law buybacks, manufacturer repurchases and recurring defect records tied to this VIN — so a sour history doesn't catch you off guard.",
    icon: "Citrus",
  },
  "classic-car-vin": {
    slug: "classic-car-vin",
    eyebrow: "Classic Car VIN",
    headline: "Looking into your classic car's VIN?",
    body: "Classics deserve a closer look before you fall for them. We decode the VIN and check NMVTIS title brands, reported theft and salvage history so you know its real story. (Heads up: pre-1981 vehicles use shorter VINs and records vary by era.)",
    icon: "Car",
  },
  "gm-build-sheet": {
    slug: "gm-build-sheet",
    eyebrow: "GM Build Sheet",
    headline: "Want the factory build details for this {vehicle}?",
    body: "Let's decode it. From the VIN we lay out the original factory trim, drivetrain, options and paint data GM recorded when it left the line — handy for restorations, valuations, and spotting 'upgrades' that weren't factory.",
    icon: "ScrollText",
  },
  "motorcycle-vin-check": {
    slug: "motorcycle-vin-check",
    eyebrow: "Motorcycle VIN Check",
    headline: "Sizing up this bike before you ride off?",
    body: "Smart rider. We decode the motorcycle's VIN and pull reported title, theft, salvage and odometer records — so the only surprise left is how good it feels on the road.",
    icon: "Bike",
  },
  "motorcycle-vin-search": {
    slug: "motorcycle-vin-search",
    eyebrow: "Motorcycle VIN Search",
    headline: "Sizing up this bike before you ride off?",
    body: "Smart rider. We decode the motorcycle's VIN and pull reported title, theft, salvage and odometer records — so the only surprise left is how good it feels on the road.",
    icon: "Bike",
  },
};

/** Look up the context for a `?from=` value. Returns null for unknown values. */
export function getReportContext(from: string | undefined | null): ReportContext | null {
  if (!from) return null;
  return REPORT_CONTEXTS[from.toLowerCase().trim()] ?? null;
}

/**
 * Given the current pathname, return the matching context slug to append as
 * `?from=` — or null when the page has no tailored report variant. Used by
 * VinSearchForm so every form on a source page carries the context with zero
 * per-page wiring. Falls back to the first path segment so dynamic sub-routes
 * (e.g. /lemon-check/florida) inherit their parent's context.
 */
export function contextSlugForPath(pathname: string): string | null {
  const trimmed = pathname.replace(/^\/+/, "").replace(/\/+$/, "");
  if (REPORT_CONTEXTS[trimmed]) return trimmed;
  const first = trimmed.split("/")[0];
  return first && REPORT_CONTEXTS[first] ? first : null;
}
