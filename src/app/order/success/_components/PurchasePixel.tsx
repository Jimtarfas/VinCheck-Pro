"use client";

import { useEffect } from "react";

// Single source of truth for report price (mirrors src/lib/stripe.ts).
const REPORT_VALUE =
  Number(process.env.NEXT_PUBLIC_REPORT_PRICE_CENTS || "999") / 100;

type Rdt = (...args: unknown[]) => void;

/**
 * Fires the Reddit "Purchase" conversion event once a real order is confirmed.
 *
 * Rendered ONLY for non-mock orders (see order/success/page.tsx), so sample
 * orders never report a fake conversion. The Reddit pixel itself is installed
 * site-wide in src/components/Analytics.tsx; here we just push the track call.
 *
 * Dedup: keyed in sessionStorage by orderId so a page refresh on the success
 * screen doesn't double-count the same purchase. `conversion_id` (the orderId)
 * is also sent so the event stays deduplicable if server-side CAPI is added
 * later.
 */
export default function PurchasePixel({ orderId }: { orderId: string }) {
  useEffect(() => {
    const key = `rdt_purchase_${orderId}`;
    try {
      if (sessionStorage.getItem(key)) return;
    } catch {
      // sessionStorage may be unavailable (private mode); fall through and
      // rely on the rdt callQueue being a no-op-safe single fire.
    }

    const rdt = (window as unknown as { rdt?: Rdt }).rdt;
    if (typeof rdt !== "function") return;

    rdt("track", "Purchase", {
      value: REPORT_VALUE,
      currency: "USD",
      conversion_id: orderId,
    });

    try {
      sessionStorage.setItem(key, "1");
    } catch {
      // ignore — best-effort dedup only
    }
  }, [orderId]);

  return null;
}
