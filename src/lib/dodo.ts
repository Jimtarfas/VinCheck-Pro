/**
 * Dodo Payments checkout helper — a LOCAL/SANDBOX alternative to Stripe for
 * the /order flow. Mirrors the shape of `@/lib/stripe` so the checkout and
 * report routes can swap providers with minimal branching.
 *
 * Provider selection: the checkout route uses Dodo whenever it is configured
 * (DODO_PAYMENTS_API_KEY + DODO_PRODUCT_ID present). In production those env
 * vars are absent, so the live site keeps using Stripe untouched. This is
 * intentionally a test-only path for now.
 *
 * Pricing model: Dodo charges a pre-created product, but a single
 * "Pay-What-You-Want" (Single Payment) product lets us pass the exact
 * `amount` (in cents) per checkout — so our whole catalogue (single report +
 * 3/5/10 bundles + promo codes) maps onto ONE Dodo product. The product's
 * minimum price must be ≤ our smallest charge.
 *
 * Required env vars:
 *   DODO_PAYMENTS_API_KEY        — Bearer key (test-mode, read-write)
 *   DODO_PRODUCT_ID              — the one PWYW product's id (pdt_…)
 *   DODO_PAYMENTS_WEBHOOK_KEY    — Standard-Webhooks signing secret (optional;
 *                                  only needed for the webhook path / tunnel)
 *   DODO_PAYMENTS_ENVIRONMENT    — "test_mode" (default) | "live_mode"
 *
 * Docs: https://docs.dodopayments.com/api-reference/introduction
 */

import { getBundle } from "./pricing";

const API_KEY = () => process.env.DODO_PAYMENTS_API_KEY || "";
const PRODUCT_ID = () => process.env.DODO_PRODUCT_ID || "";
const WEBHOOK_KEY = () => process.env.DODO_PAYMENTS_WEBHOOK_KEY || "";
const PRICE_CENTS = () =>
  Number(process.env.NEXT_PUBLIC_REPORT_PRICE_CENTS || "1499");

/** Live vs test base URL. Defaults to test mode. */
function apiBase(): string {
  return process.env.DODO_PAYMENTS_ENVIRONMENT === "live_mode"
    ? "https://live.dodopayments.com"
    : "https://test.dodopayments.com";
}

export const dodoConfig = {
  /** True when both the API key and the PWYW product id are set. */
  isConfigured: () => !!API_KEY() && !!PRODUCT_ID(),
  isLiveMode: () => process.env.DODO_PAYMENTS_ENVIRONMENT === "live_mode",
  /** True when a webhook signing secret is available. */
  webhookConfigured: () => !!WEBHOOK_KEY(),
  priceCents: PRICE_CENTS,
};

export interface CreateDodoCheckoutInput {
  orderId: string;
  vin: string;
  vehicleLabel?: string;
  customerEmail: string;
  couponCode?: string;
  /** Buyer's own origin — keeps the success/cancel flow on this host. */
  origin?: string;
  successUrl?: string;
  cancelUrl?: string;
  /** Prepaid bundle size (3 / 5 / 10). Absent/1 = single report. */
  bundleSize?: number;
}

export interface CreatedDodoCheckout {
  /** Dodo checkout session id (cks_…). */
  id: string;
  /** Hosted checkout URL to redirect the buyer to. */
  url: string;
}

const DEFAULT_APP_ORIGIN = "https://www.carcheckervin.com";

function getAppOrigin(): string {
  const raw = (process.env.NEXT_PUBLIC_SITE_URL || "").trim();
  if (!raw) return DEFAULT_APP_ORIGIN;
  let v = raw;
  if (!/^https?:\/\//i.test(v)) v = `https://${v}`;
  v = v.replace(/\/+$/, "");
  try {
    new URL(v);
    return v;
  } catch {
    return DEFAULT_APP_ORIGIN;
  }
}

/**
 * Create a Dodo checkout session for one VIN report purchase (or a bundle).
 * Returns { id, url } where `url` is the hosted checkout to redirect to.
 *
 * Dodo appends `?payment_id=…&status=succeeded&email=…` to the return_url on
 * success, so we keep the order id in the path and let the success page read
 * the payment id back for the polling fallback.
 */
export async function createDodoCheckoutSession(
  input: CreateDodoCheckoutInput
): Promise<CreatedDodoCheckout> {
  const site =
    (input.origin || "").trim().replace(/\/+$/, "") || getAppOrigin();

  const successUrl =
    input.successUrl ||
    `${site}/order/success?order=${encodeURIComponent(input.orderId)}`;
  const cancelUrl =
    input.cancelUrl ||
    `${site}/?vin=${encodeURIComponent(input.vin)}&cancelled=1`;

  // Server-authoritative pricing — the client only sends a bundle SIZE.
  const bundle = getBundle(input.bundleSize);
  const amountCents = bundle ? bundle.priceCents : PRICE_CENTS();

  const productName = bundle
    ? `${bundle.size}-Report Vehicle History Pack`
    : input.vehicleLabel
      ? `Vehicle History Report — ${input.vehicleLabel}`
      : "Vehicle History Report";

  // Metadata values must be strings — the webhook / payment lookup reads these.
  const metadata: Record<string, string> = {
    order_id: input.orderId,
    vin: input.vin,
    product_name: productName,
  };
  if (bundle) metadata.bundle_size = String(bundle.size);

  const body: Record<string, unknown> = {
    product_cart: [
      {
        product_id: PRODUCT_ID(),
        quantity: 1,
        // PWYW override — charge our exact amount (must be ≥ product minimum).
        amount: amountCents,
      },
    ],
    customer: { email: input.customerEmail },
    return_url: successUrl,
    cancel_url: cancelUrl,
    metadata,
  };

  const code = (input.couponCode || "").trim();
  if (code) body.discount_codes = [code];

  const res = await fetch(`${apiBase()}/checkouts`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(15000),
  });

  const data = (await res.json().catch(() => ({}))) as {
    session_id?: string;
    checkout_url?: string;
    message?: string;
    code?: string;
  };

  if (!res.ok || !data.session_id || !data.checkout_url) {
    const msg = data.message || data.code || res.statusText;
    // eslint-disable-next-line no-console
    console.error("[dodo] checkout session create failed:", {
      status: res.status,
      message: msg,
      successUrl,
      cancelUrl,
    });
    throw new Error(`Dodo checkout failed: ${msg}`);
  }

  return { id: data.session_id, url: data.checkout_url };
}

export type DodoPaymentStatus =
  | "succeeded"
  | "failed"
  | "cancelled"
  | "processing"
  | "requires_customer_action"
  | "requires_merchant_action"
  | "requires_payment_method"
  | "requires_confirmation"
  | "requires_capture"
  | "partially_captured"
  | "partially_captured_and_capturable";

export interface DodoPayment {
  payment_id: string;
  status: DodoPaymentStatus;
  total_amount: number | null;
  currency: string | null;
  metadata: Record<string, string>;
}

/**
 * Retrieve a single payment by id. Used as the redirect-based confirmation
 * fallback (the success page passes back the `payment_id` Dodo appended to
 * the return_url), mirroring the Stripe `fetchCheckoutSession` fallback.
 *
 * Returns null on any failure so the caller treats it as "still pending".
 */
export async function fetchDodoPayment(
  paymentId: string
): Promise<DodoPayment | null> {
  if (!dodoConfig.isConfigured() || !paymentId) return null;
  try {
    const res = await fetch(
      `${apiBase()}/payments/${encodeURIComponent(paymentId)}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${API_KEY()}` },
        signal: AbortSignal.timeout(10000),
      }
    );
    if (!res.ok) {
      // eslint-disable-next-line no-console
      console.error("[dodo] fetchDodoPayment failed", res.status, res.statusText);
      return null;
    }
    const json = (await res.json()) as {
      payment_id: string;
      status: DodoPaymentStatus;
      total_amount?: number | null;
      currency?: string | null;
      metadata?: Record<string, string> | null;
    };
    return {
      payment_id: json.payment_id,
      status: json.status,
      total_amount: json.total_amount ?? null,
      currency: json.currency ?? null,
      metadata: json.metadata ?? {},
    };
  } catch {
    return null;
  }
}

interface DodoWebhookEvent {
  type: string;
  data: {
    payload_type?: string;
    payment_id?: string;
    status?: DodoPaymentStatus;
    metadata?: Record<string, string>;
    [k: string]: unknown;
  };
}

/**
 * Verify a Dodo webhook (Standard Webhooks spec) and return the parsed event.
 *
 * Standard Webhooks signs `${webhook-id}.${webhook-timestamp}.${rawBody}` with
 * an HMAC-SHA256 keyed on the base64-decoded secret (the part after the
 * `whsec_` prefix), emitting a base64 signature. The `webhook-signature`
 * header is a space-separated list of `v1,<sig>` entries; a match on any
 * entry passes.
 *
 * Implemented manually (no SDK) to match the existing manual Stripe verifier.
 */
export async function verifyDodoWebhook(
  rawBody: string,
  headers: {
    id: string | null;
    signature: string | null;
    timestamp: string | null;
  },
  toleranceSec = 300
): Promise<{ valid: boolean; event?: DodoWebhookEvent; reason?: string }> {
  const secretRaw = WEBHOOK_KEY();
  if (!secretRaw) return { valid: false, reason: "missing DODO_PAYMENTS_WEBHOOK_KEY" };
  const { id, signature, timestamp } = headers;
  if (!id || !signature || !timestamp) {
    return { valid: false, reason: "missing webhook headers" };
  }

  const ts = Number(timestamp);
  if (!ts || Math.abs(Date.now() / 1000 - ts) > toleranceSec) {
    return { valid: false, reason: "timestamp out of tolerance" };
  }

  const { createHmac, timingSafeEqual } = await import("node:crypto");
  // Secret is `whsec_<base64>`; the HMAC key is the decoded base64 portion.
  const secretKey = secretRaw.startsWith("whsec_")
    ? Buffer.from(secretRaw.slice("whsec_".length), "base64")
    : Buffer.from(secretRaw, "utf8");

  const signedContent = `${id}.${ts}.${rawBody}`;
  const expected = createHmac("sha256", secretKey)
    .update(signedContent)
    .digest("base64");
  const expectedBuf = Buffer.from(expected);

  // Header may carry multiple space-separated `v1,<sig>` entries.
  const provided = signature
    .split(" ")
    .map((p) => (p.includes(",") ? p.split(",")[1] : p))
    .filter(Boolean);

  const matches = provided.some((sig) => {
    const sigBuf = Buffer.from(sig);
    return (
      sigBuf.length === expectedBuf.length && timingSafeEqual(sigBuf, expectedBuf)
    );
  });

  if (!matches) return { valid: false, reason: "signature mismatch" };

  try {
    return { valid: true, event: JSON.parse(rawBody) as DodoWebhookEvent };
  } catch {
    return { valid: false, reason: "invalid JSON payload" };
  }
}
