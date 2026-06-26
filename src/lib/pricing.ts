/**
 * Single source of truth for report pricing — the one-off single report and
 * the prepaid bundle packs (3 / 5 / 10).
 *
 * Rules:
 *   - The SINGLE price comes from NEXT_PUBLIC_REPORT_PRICE_CENTS (defaults to
 *     1499 = $14.99) so it stays consistent with the rest of the app.
 *   - Bundle prices are server-authoritative. The client only ever sends a
 *     bundle SIZE; the price is looked up here so a tampered request can't
 *     change what Stripe charges.
 *   - A bundle delivers one report now and grants the rest as account credits,
 *     valid for CREDIT_VALIDITY_MONTHS.
 */

export const SINGLE_PRICE_CENTS = Number(
  process.env.NEXT_PUBLIC_REPORT_PRICE_CENTS || "1499"
);

/** How long bundle credits stay redeemable after purchase. */
export const CREDIT_VALIDITY_MONTHS = 12;

export interface Bundle {
  /** Number of reports in the pack. */
  size: number;
  /** Total price charged once, in cents. */
  priceCents: number;
  /** Highlight as the recommended option. */
  bestValue?: boolean;
}

/**
 * The multi-report packs, priced off the $14.99 single report:
 *   3 → $35.99 ($12.00/report) · 5 → $54.99 ($11.00) · 10 → $89.99 ($9.00).
 * The single report (size 1) is intentionally NOT here — it stays the existing
 * anonymous one-off flow and is added to the selector from SINGLE_PRICE_CENTS.
 */
export const BUNDLES: Bundle[] = [
  { size: 3, priceCents: 3599 },
  { size: 5, priceCents: 5499, bestValue: true },
  { size: 10, priceCents: 8999 },
];

/** Valid bundle sizes a checkout request may ask for. */
export const BUNDLE_SIZES = BUNDLES.map((b) => b.size);

/** Look up a bundle by size. Returns null for unknown sizes. */
export function getBundle(size: number | undefined | null): Bundle | null {
  if (!size) return null;
  return BUNDLES.find((b) => b.size === size) ?? null;
}

/** Per-report price in cents for a bundle (rounded for display). */
export function perReportCents(b: Bundle): number {
  return Math.round(b.priceCents / b.size);
}

/**
 * How much a buyer saves vs. paying the single price for each report,
 * in cents. e.g. 5 × $14.99 = $74.95, bundle $54.99 → saves $19.96.
 */
export function bundleSavingsCents(b: Bundle): number {
  return Math.max(0, b.size * SINGLE_PRICE_CENTS - b.priceCents);
}

/** Format a cents value as a USD string, e.g. 3499 → "$34.99". */
export function formatUsd(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

/**
 * Build the full option list the selector renders: the single report first,
 * then the bundles. Each option carries everything the UI needs.
 */
export interface PricingOption {
  size: number;
  priceCents: number;
  perReportCents: number;
  savingsCents: number;
  bestValue: boolean;
  isBundle: boolean;
}

export function pricingOptions(): PricingOption[] {
  const single: PricingOption = {
    size: 1,
    priceCents: SINGLE_PRICE_CENTS,
    perReportCents: SINGLE_PRICE_CENTS,
    savingsCents: 0,
    bestValue: false,
    isBundle: false,
  };
  const bundles = BUNDLES.map<PricingOption>((b) => ({
    size: b.size,
    priceCents: b.priceCents,
    perReportCents: perReportCents(b),
    savingsCents: bundleSavingsCents(b),
    bestValue: Boolean(b.bestValue),
    isBundle: true,
  }));
  return [single, ...bundles];
}
