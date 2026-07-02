/* Report-preview A/B/C experiment — single source of truth shared by the proxy
   (which assigns the sticky bucket cookie) and the report-preview page (which
   reads it to server-render the right variant). */

export const RP_AB_COOKIE = "rp_ab";

/** The mutually-exclusive buckets a visitor can land in. "nophoto" is the
    "D" variant: for vehicles with no photo on file it drops the image area
    entirely and shows a clean manufacturer-logo hero instead of the generic
    "no photos" placeholder — testing whether the vehicle image itself is what
    drives conversion. */
export const RP_AB_VARIANTS = ["coupon", "blur", "swap", "nophoto"] as const;

export type RpAbVariant = (typeof RP_AB_VARIANTS)[number];

export function isRpAbVariant(v: string | undefined): v is RpAbVariant {
  return !!v && (RP_AB_VARIANTS as readonly string[]).includes(v);
}
