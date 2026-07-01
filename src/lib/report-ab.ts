/* Report-preview A/B/C experiment — single source of truth shared by the proxy
   (which assigns the sticky bucket cookie) and the report-preview page (which
   reads it to server-render the right variant). */

export const RP_AB_COOKIE = "rp_ab";

/** The three mutually-exclusive buckets a visitor can land in. */
export const RP_AB_VARIANTS = ["coupon", "blur", "swap"] as const;

export type RpAbVariant = (typeof RP_AB_VARIANTS)[number];

export function isRpAbVariant(v: string | undefined): v is RpAbVariant {
  return !!v && (RP_AB_VARIANTS as readonly string[]).includes(v);
}
