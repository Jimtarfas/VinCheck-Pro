/**
 * Source-page → report-preview "message match" context.
 *
 * When a visitor reaches /report-preview/<vin> from one of the focused check
 * tools (e.g. /warranty-check, /vehicle-lien-check), the source page's
 * VinSearchForm appends `?from=<slug>` to the report URL. The report then
 * renders an *additive* banner that echoes what the visitor came to check, so
 * the destination feels like a continuation of the page they left — a standard
 * conversion technique known as "message match" / scent continuity.
 *
 * IMPORTANT — this is progressive enhancement only:
 *   • The banner is additive. The default report (no `from`, or an unknown
 *     `from`) is unchanged and complete — search crawlers and the ~20-30% of
 *     users whose browsers strip the param see the full baseline experience.
 *   • The canonical URL stays clean (no `from` param), so this never creates
 *     duplicate-content or cloaking issues.
 *   • Copy stays hedged ("may", "reported") to match the rest of the report —
 *     it reframes emphasis, it does not promise data we might not have.
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
  /** Headline. `{vehicle}` is replaced with the decoded vehicle label. */
  headline: string;
  /** One-to-two sentence reassurance. `{vehicle}` is replaced at render. */
  body: string;
  /** lucide icon key — mapped to a component on the render side. */
  icon: "BadgeCheck" | "Banknote" | "AlertTriangle" | "Gauge" | "ShieldAlert" | "Fingerprint" | "Skull" | "Waves";
}

export const REPORT_CONTEXTS: Record<string, ReportContext> = {
  "warranty-check": {
    slug: "warranty-check",
    eyebrow: "Warranty Check",
    headline: "The warranty picture for this {vehicle}",
    body: "You came to check warranty status. Your full report surfaces the in-service date, original factory coverage window, and any reported lemon-law buyback — so you know what protection may still apply before you buy.",
    icon: "BadgeCheck",
  },
  "vehicle-lien-check": {
    slug: "vehicle-lien-check",
    eyebrow: "Lien & Loan Check",
    headline: "Checking this {vehicle} for active liens",
    body: "You're here to confirm no lender or lienholder is still attached. Your full report flags reported open liens and loan records, so you don't inherit someone else's debt with the title.",
    icon: "Banknote",
  },
  "accident-history-check": {
    slug: "accident-history-check",
    eyebrow: "Accident History",
    headline: "The accident history for this {vehicle}",
    body: "You came to check for crashes. Your full report compiles reported collisions, damage severity, airbag deployment and frame damage from thousands of sources nationwide.",
    icon: "AlertTriangle",
  },
  "odometer-check": {
    slug: "odometer-check",
    eyebrow: "Odometer Check",
    headline: "Verifying the mileage on this {vehicle}",
    body: "You're here to catch a rollback. Your full report tracks reported odometer readings over time and flags mileage inconsistencies that point to tampering.",
    icon: "Gauge",
  },
  "salvage-title-check": {
    slug: "salvage-title-check",
    eyebrow: "Salvage Title Check",
    headline: "Salvage & title-brand check for this {vehicle}",
    body: "You came to rule out a salvage or rebuilt title. Your full report scans NMVTIS title brands across all 50 states — salvage, junk, flood and rebuilt.",
    icon: "ShieldAlert",
  },
  "stolen-vehicle-check": {
    slug: "stolen-vehicle-check",
    eyebrow: "Theft Check",
    headline: "Theft & recovery check for this {vehicle}",
    body: "You're here to confirm it isn't stolen. Your full report checks reported theft and total-loss records, so you don't buy a vehicle with a clouded past.",
    icon: "Fingerprint",
  },
  "recall-check": {
    slug: "recall-check",
    eyebrow: "Recall Check",
    headline: "Open safety recalls for this {vehicle}",
    body: "You came to check for unfixed recalls. Your report surfaces open NHTSA safety recalls for this VIN, so you know exactly what still needs to be repaired.",
    icon: "ShieldAlert",
  },
  "flood-check": {
    slug: "flood-check",
    eyebrow: "Flood Damage Check",
    headline: "Flood-damage check for this {vehicle}",
    body: "You're here to rule out water damage. Your full report flags reported flood and water-damage title brands alongside related salvage records.",
    icon: "Waves",
  },
  "total-loss-check": {
    slug: "total-loss-check",
    eyebrow: "Total Loss Check",
    headline: "Total-loss history for this {vehicle}",
    body: "You came to check for an insurance write-off. Your full report compiles reported total-loss and salvage events tied to this VIN.",
    icon: "Skull",
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
 * per-page wiring.
 */
export function contextSlugForPath(pathname: string): string | null {
  const slug = pathname.replace(/^\/+/, "").replace(/\/+$/, "");
  return REPORT_CONTEXTS[slug] ? slug : null;
}
