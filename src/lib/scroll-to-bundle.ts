/**
 * Smooth-scrolls the report preview to the "Buy more, pay less" bundle card so a
 * tapped buy CTA lands the reader on the real in-page checkout instead of a
 * popup. The page renders two copies of the card (a desktop sidebar one and a
 * mobile inline one); both are marked with `data-bundle-target`, so we pick
 * whichever is currently visible at the active breakpoint (`offsetParent` is
 * null for the `display:none` copy).
 *
 * It also fires the Google Ads "Begin checkout" conversion once per click. This
 * used to fire when the (now removed) upsell popup opened; clicking a buy CTA to
 * jump to the checkout card is the equivalent "began checkout" signal.
 */

// Google Ads "Begin checkout" conversion label. Overridable via env. Value uses
// the site's real report price in USD (single source: REPORT_PRICE_CENTS).
const GOOGLE_ADS_BEGIN_CHECKOUT_SEND_TO =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_BEGIN_CHECKOUT_SEND_TO ||
  "AW-18237007044/3x3_CJ6q_b4cEMTJivhD";

const REPORT_VALUE_USD =
  Number(process.env.NEXT_PUBLIC_REPORT_PRICE_CENTS || "999") / 100;

function fireBeginCheckout() {
  const gtag = (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag;
  if (typeof gtag !== "function") return;
  gtag("event", "conversion", {
    send_to: GOOGLE_ADS_BEGIN_CHECKOUT_SEND_TO,
    value: REPORT_VALUE_USD,
    currency: "USD",
  });
}

export function scrollToBundle() {
  if (typeof document === "undefined") return;
  fireBeginCheckout();
  const targets = Array.from(
    document.querySelectorAll<HTMLElement>("[data-bundle-target]")
  );
  const target = targets.find((t) => t.offsetParent !== null) ?? targets[0];
  target?.scrollIntoView({ behavior: "smooth", block: "center" });
}
