/**
 * Stripe Checkout helper for the /order flow.
 *
 * Until the real Stripe keys are added to Vercel env, this module returns a
 * placeholder session URL that lands directly on /order/success?mock=1 so the
 * end-to-end flow is testable without leaving the site.
 *
 * Required env vars (when wired):
 *   STRIPE_SECRET_KEY             — server secret (sk_test_... or sk_live_...)
 *   STRIPE_WEBHOOK_SECRET         — for webhook signature verification
 *   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY — client publishable key (not used server-side)
 *   NEXT_PUBLIC_REPORT_PRICE_CENTS — int, defaults to 1499 ($14.99)
 *   NEXT_PUBLIC_SITE_URL          — for redirect URLs
 */

const SECRET = () => process.env.STRIPE_SECRET_KEY || "";
const PRICE_CENTS = () => Number(process.env.NEXT_PUBLIC_REPORT_PRICE_CENTS || "1499");

// Checkout success/cancel URLs live on the app. subdomain — that's where the
// /order flow is publicly served. The pretty paths on app. (/, /success, /r/<id>)
// are rewritten onto /order/* by src/proxy.ts.
const DEFAULT_APP_ORIGIN = "https://app.carcheckervin.com";

/**
 * Returns a guaranteed-valid app origin string with `https://` prefix and no
 * trailing slash. Hardened against the common Vercel-env-var mistakes that
 * cause Stripe to reject success/cancel URLs:
 *   - missing protocol  ("app.carcheckervin.com")     → prepend https://
 *   - trailing slash    ("https://app.carcheckervin.com/")  → strip it
 *   - stray whitespace                                → trim
 *   - empty string                                    → use the default
 */
function getAppOrigin(): string {
  const raw = (process.env.NEXT_PUBLIC_APP_URL || "").trim();
  if (!raw) return DEFAULT_APP_ORIGIN;
  let v = raw;
  if (!/^https?:\/\//i.test(v)) v = `https://${v}`;
  v = v.replace(/\/+$/, "");
  try {
    // Validate that what we built is a real URL — fall back to default if not.
    new URL(v);
    return v;
  } catch {
    return DEFAULT_APP_ORIGIN;
  }
}

export const stripeConfig = {
  isConfigured: () => !!SECRET(),
  priceCents: PRICE_CENTS,
  priceLabel: () => `$${(PRICE_CENTS() / 100).toFixed(2)}`,
};

export interface CreateCheckoutSessionInput {
  orderId: string;
  vin: string;
  vehicleLabel?: string;     // shows on Stripe page, e.g. "2021 Toyota Camry"
  customerEmail?: string;
  successUrl?: string;       // overrides default
  cancelUrl?: string;
}

export interface CreatedCheckoutSession {
  id: string;
  url: string;               // where to redirect the buyer
  mock?: boolean;
}

/**
 * Create a Stripe Checkout Session for one VIN report purchase.
 * Returns a mock session that bounces back to /order/success?mock=1 if
 * Stripe isn't configured yet, so the UI flow is still testable.
 */
export async function createCheckoutSession(
  input: CreateCheckoutSessionInput
): Promise<CreatedCheckoutSession> {
  const site = getAppOrigin();
  // Pretty subdomain URLs — the proxy rewrites these onto /order/* internally.
  // {CHECKOUT_SESSION_ID} is a Stripe-substituted placeholder, not URL syntax.
  const successUrl =
    input.successUrl ||
    `${site}/success?session_id={CHECKOUT_SESSION_ID}&order=${encodeURIComponent(input.orderId)}`;
  const cancelUrl =
    input.cancelUrl ||
    `${site}/?vin=${encodeURIComponent(input.vin)}&cancelled=1`;

  // ── MOCK PATH ──
  if (!stripeConfig.isConfigured()) {
    return {
      id: `mock_${input.orderId}`,
      url: `${site}/success?mock=1&order=${input.orderId}`,
      mock: true,
    };
  }

  // ── REAL STRIPE PATH ──
  // Using the raw API (no SDK) so this works even before installing the
  // `stripe` npm package. Replace with the SDK once installed if you prefer.
  const body = new URLSearchParams();
  body.set("mode", "payment");
  body.set("success_url", successUrl);
  body.set("cancel_url", cancelUrl);
  if (input.customerEmail) body.set("customer_email", input.customerEmail);

  body.set("line_items[0][quantity]", "1");
  body.set("line_items[0][price_data][currency]", "usd");
  body.set("line_items[0][price_data][unit_amount]", String(PRICE_CENTS()));
  body.set(
    "line_items[0][price_data][product_data][name]",
    input.vehicleLabel ? `Vehicle History Report — ${input.vehicleLabel}` : "Vehicle History Report"
  );
  body.set(
    "line_items[0][price_data][product_data][description]",
    `Full NMVTIS-backed history report for VIN ${input.vin}.`
  );

  // Metadata we'll need in the webhook
  body.set("metadata[order_id]", input.orderId);
  body.set("metadata[vin]", input.vin);
  body.set("payment_intent_data[metadata][order_id]", input.orderId);
  body.set("payment_intent_data[metadata][vin]", input.vin);

  // Disable automatic tax for now — flip this on when Stripe Tax is configured
  body.set("automatic_tax[enabled]", "false");

  const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${SECRET()}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });
  const data = (await res.json()) as {
    id?: string;
    url?: string;
    error?: { message?: string; param?: string };
  };
  if (!res.ok || !data.id || !data.url) {
    // Echo back the specific URL that Stripe rejected so the user can see at
    // a glance whether the issue is the success_url, cancel_url, or something
    // else (e.g. price, customer_email). Logged server-side and surfaced in
    // the API error so the UI can render it directly.
    const param = data.error?.param;
    const msg = data.error?.message || res.statusText;
    let context = "";
    if (param === "success_url") context = ` (success_url=${successUrl})`;
    else if (param === "cancel_url") context = ` (cancel_url=${cancelUrl})`;
    else if (param) context = ` (param=${param})`;
    // eslint-disable-next-line no-console
    console.error("[stripe] checkout session create failed:", {
      status: res.status,
      message: msg,
      param,
      successUrl,
      cancelUrl,
      site,
    });
    throw new Error(`Stripe checkout failed: ${msg}${context}`);
  }
  return { id: data.id, url: data.url };
}

/**
 * Verify a Stripe webhook signature. Returns the parsed event if valid,
 * or null. Implemented manually (HMAC SHA-256) so we don't have to install
 * the `stripe` SDK just for this.
 *
 * See: https://stripe.com/docs/webhooks/signatures#verify-manually
 */
export async function verifyWebhookSignature(
  payload: string,
  signatureHeader: string | null,
  toleranceSec = 300
): Promise<{ valid: boolean; event?: unknown; reason?: string }> {
  if (!signatureHeader) return { valid: false, reason: "missing signature" };
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) return { valid: false, reason: "missing STRIPE_WEBHOOK_SECRET" };

  // Header format: `t=<unix>,v1=<sig>,v0=<sig>...`
  const parts = signatureHeader.split(",").reduce<Record<string, string>>((acc, kv) => {
    const [k, v] = kv.split("=");
    if (k && v) acc[k] = v;
    return acc;
  }, {});

  const ts = Number(parts.t);
  const v1 = parts.v1;
  if (!ts || !v1) return { valid: false, reason: "malformed signature header" };
  if (Math.abs(Date.now() / 1000 - ts) > toleranceSec) {
    return { valid: false, reason: "timestamp out of tolerance" };
  }

  const signedPayload = `${ts}.${payload}`;
  const { createHmac } = await import("node:crypto");
  const expected = createHmac("sha256", secret).update(signedPayload).digest("hex");

  // Constant-time compare
  if (expected.length !== v1.length) return { valid: false, reason: "signature length mismatch" };
  let diff = 0;
  for (let i = 0; i < expected.length; i++) diff |= expected.charCodeAt(i) ^ v1.charCodeAt(i);
  if (diff !== 0) return { valid: false, reason: "signature mismatch" };

  try {
    return { valid: true, event: JSON.parse(payload) };
  } catch {
    return { valid: false, reason: "invalid JSON payload" };
  }
}
