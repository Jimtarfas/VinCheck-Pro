"use client";

import { useEffect } from "react";

// Single source of truth for report price (mirrors src/lib/stripe.ts).
const REPORT_VALUE =
  Number(process.env.NEXT_PUBLIC_REPORT_PRICE_CENTS || "999") / 100;

// Google Ads conversion action ("Purchase") send-to label. Overridable via env.
const GOOGLE_ADS_PURCHASE_SEND_TO =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_PURCHASE_SEND_TO ||
  "AW-18237007044/yWuCCPKCpr4cEMTJivhD";

type Rdt = (...args: unknown[]) => void;
type Gtag = (...args: unknown[]) => void;

/**
 * Best-effort, per-order dedup so a refresh on the success screen doesn't
 * double-count. Returns true if this key already fired.
 */
function alreadyFired(key: string): boolean {
  try {
    return sessionStorage.getItem(key) !== null;
  } catch {
    // sessionStorage may be unavailable (private mode) — treat as not-fired.
    return false;
  }
}

function markFired(key: string): void {
  try {
    sessionStorage.setItem(key, "1");
  } catch {
    // ignore — best-effort dedup only
  }
}

/**
 * Fires marketing "Purchase" conversions once a real order is confirmed:
 *   • Reddit Ads  → rdt('track','Purchase')
 *   • Google Ads  → gtag('event','conversion', { send_to: <purchase label> })
 *
 * Rendered ONLY for non-mock orders (see order/success/page.tsx), so sample
 * orders never report a fake conversion. Both pixels are installed site-wide
 * in src/components/Analytics.tsx; here we just push the conversion calls.
 *
 * Each network is deduped independently in sessionStorage by orderId so that,
 * if one tag hasn't loaded yet on first render, the other still fires. The
 * orderId is sent as the dedup id (Reddit `conversion_id`, Google
 * `transaction_id`) so the events stay deduplicable server-side later.
 *
 * Value/currency use the site's single price source (REPORT_VALUE in USD),
 * not the placeholder value/currency from the provider's copy-paste snippet.
 */
export default function PurchasePixel({ orderId }: { orderId: string }) {
  useEffect(() => {
    // ── Reddit Ads ──────────────────────────────────────────────
    const rdtKey = `rdt_purchase_${orderId}`;
    if (!alreadyFired(rdtKey)) {
      const rdt = (window as unknown as { rdt?: Rdt }).rdt;
      if (typeof rdt === "function") {
        rdt("track", "Purchase", {
          value: REPORT_VALUE,
          currency: "USD",
          conversion_id: orderId,
        });
        markFired(rdtKey);
      }
    }

    // ── Google Ads ──────────────────────────────────────────────
    const gaKey = `gads_purchase_${orderId}`;
    if (!alreadyFired(gaKey)) {
      const gtag = (window as unknown as { gtag?: Gtag }).gtag;
      if (typeof gtag === "function") {
        gtag("event", "conversion", {
          send_to: GOOGLE_ADS_PURCHASE_SEND_TO,
          value: REPORT_VALUE,
          currency: "USD",
          transaction_id: orderId,
        });
        markFired(gaKey);
      }
    }
  }, [orderId]);

  return null;
}
