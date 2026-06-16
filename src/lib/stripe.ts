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
 *   NEXT_PUBLIC_REPORT_PRICE_CENTS — int, defaults to 999 ($9.99)
 *   NEXT_PUBLIC_SITE_URL          — for redirect URLs
 */

import { getBundle } from "./pricing";

const SECRET = () => process.env.STRIPE_SECRET_KEY || "";
const PRICE_CENTS = () => Number(process.env.NEXT_PUBLIC_REPORT_PRICE_CENTS || "999");

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
  /**
   * True when the configured secret is a live-mode key (`sk_live_*`).
   * Used by the admin dashboard to hide test/sandbox traffic — once we go
   * live we don't want operator decisions polluted by older test orders.
   * `rk_live_` (restricted key) also counts as live.
   */
  isLiveMode: () => /^(sk|rk)_live_/.test(SECRET()),
  priceCents: PRICE_CENTS,
  priceLabel: () => `$${(PRICE_CENTS() / 100).toFixed(2)}`,
};

export interface CreateCheckoutSessionInput {
  orderId: string;
  vin: string;
  vehicleLabel?: string;     // shows on Stripe page, e.g. "2021 Toyota Camry"
  customerEmail?: string;
  couponCode?: string;       // buyer-entered promotion code, e.g. "SAVE10"
  origin?: string;           // buyer's own origin — keeps the flow on this site
  successUrl?: string;       // overrides default
  cancelUrl?: string;
  // Wave 10: pass-through to Stripe's `locale` parameter (Stripe
  // localises the entire Checkout UI — labels, error messages, country
  // names, card brand strings). Also drives the language of our
  // custom_text and the product name / description below.
  locale?: "en" | "es";
  // Prepaid bundle size (3 / 5 / 10). When set to a valid bundle, the line
  // item is charged at the bundle's server-authoritative total instead of
  // the single-report price, and `metadata[bundle_size]` is set so the
  // webhook can grant the remaining reports as account credits.
  bundleSize?: number;
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
  // Keep the whole flow on the buyer's own origin (carcheckervin.com). We
  // hit the canonical /order/* routes directly so no host-specific proxy
  // rewrite is needed — they resolve on any host. Falls back to the configured
  // app origin only if the caller didn't pass the request origin.
  const site = (input.origin || "").trim().replace(/\/+$/, "") || getAppOrigin();
  // {CHECKOUT_SESSION_ID} is a Stripe-substituted placeholder, not URL syntax.
  const successUrl =
    input.successUrl ||
    `${site}/order/success?session_id={CHECKOUT_SESSION_ID}&order=${encodeURIComponent(input.orderId)}`;
  const cancelUrl =
    input.cancelUrl ||
    `${site}/?vin=${encodeURIComponent(input.vin)}&cancelled=1`;

  // ── MOCK PATH ──
  if (!stripeConfig.isConfigured()) {
    return {
      id: `mock_${input.orderId}`,
      url: `${site}/order/success?mock=1&order=${input.orderId}`,
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

  // Wave 10: Stripe will localise its entire UI when `locale` is set.
  // Valid values include "auto" (Accept-Language sniff) and explicit
  // language tags — "es" covers the LATAM + US Hispanic market.
  if (input.locale === "es") body.set("locale", "es");

  const isEs = input.locale === "es";

  // Server-authoritative pricing. The client only sends a bundle SIZE; we
  // look up the real total here so a tampered request can't change what
  // Stripe charges. An unknown/absent size falls back to the single report.
  const bundle = getBundle(input.bundleSize);
  const unitAmount = bundle ? bundle.priceCents : PRICE_CENTS();

  body.set("line_items[0][quantity]", "1");
  body.set("line_items[0][price_data][currency]", "usd");
  body.set("line_items[0][price_data][unit_amount]", String(unitAmount));
  body.set(
    "line_items[0][price_data][product_data][name]",
    bundle
      ? isEs
        ? `Paquete de ${bundle.size} reportes de historial vehicular`
        : `${bundle.size}-Report Vehicle History Pack`
      : isEs
      ? input.vehicleLabel
        ? `Reporte de historial vehicular — ${input.vehicleLabel}`
        : "Reporte de historial vehicular"
      : input.vehicleLabel
      ? `Vehicle History Report — ${input.vehicleLabel}`
      : "Vehicle History Report"
  );
  body.set(
    "line_items[0][price_data][product_data][description]",
    bundle
      ? isEs
        ? `Reporte del VIN ${input.vin} ahora + ${bundle.size - 1} créditos para cualquier VIN (válidos 12 meses).`
        : `VIN ${input.vin} report now + ${bundle.size - 1} credits for any VIN (valid 12 months).`
      : isEs
      ? `Reporte completo respaldado por NMVTIS para el VIN ${input.vin}.`
      : `Full NMVTIS-backed history report for VIN ${input.vin}.`
  );

  // Metadata we'll need in the webhook
  body.set("metadata[order_id]", input.orderId);
  body.set("metadata[vin]", input.vin);
  body.set("payment_intent_data[metadata][order_id]", input.orderId);
  body.set("payment_intent_data[metadata][vin]", input.vin);
  if (bundle) {
    body.set("metadata[bundle_size]", String(bundle.size));
    body.set("payment_intent_data[metadata][bundle_size]", String(bundle.size));
  }

  // Disable automatic tax for now — flip this on when Stripe Tax is configured
  body.set("automatic_tax[enabled]", "false");

  // ── Coupon / promotion code ──
  // A buyer-entered code (e.g. "SAVE10") is a human-readable *promotion code*,
  // not a Stripe coupon id. Resolve it to its promotion_code id and pre-apply
  // it as a discount. `discounts` and `allow_promotion_codes` are mutually
  // exclusive, so only when we DON'T pre-apply a code do we let the buyer type
  // one in on Stripe's page instead. An unrecognised code is ignored (the
  // order proceeds at full price) rather than failing the whole checkout.
  let appliedDiscount = false;
  const code = (input.couponCode || "").trim();
  if (code) {
    try {
      const lookup = await fetch(
        `https://api.stripe.com/v1/promotion_codes?code=${encodeURIComponent(code)}&active=true&limit=1`,
        {
          headers: { Authorization: `Bearer ${SECRET()}` },
          signal: AbortSignal.timeout(5000),
        }
      );
      const lj = (await lookup.json()) as { data?: { id?: string }[] };
      const promoId = lj.data?.[0]?.id;
      if (promoId) {
        body.set("discounts[0][promotion_code]", promoId);
        appliedDiscount = true;
      }
    } catch {
      // Resolution failed (network/timeout) — proceed without a discount.
    }
  }
  if (!appliedDiscount) body.set("allow_promotion_codes", "true");

  // ── ClearVin compliance disclaimer on the Stripe checkout page ──
  //
  // Previously we used Stripe's `consent_collection.terms_of_service`
  // field to render a clickable "Terms of Service" link under the Pay
  // button. That requires a Terms-of-Service URL to be set on the
  // Stripe account (Dashboard → Settings → Public details, in BOTH
  // Test and Live modes). When that URL is missing or set in the wrong
  // mode, Stripe rejects the checkout session with:
  //
  //   "You cannot collect consent to your terms of service unless a
  //    URL is set in the Stripe Dashboard"
  //
  // The buyer-facing disclaimer + clickable T&C / NMVTIS links already
  // live on app.carcheckervin.com/order (the consent line sits directly
  // under the order button there), which is the page ClearVin's review
  // requires us to display them on. To keep checkout reliable even
  // before the dashboard ToS URL is in place, we use only plain
  // custom_text on Stripe — the inline-clickable on-site disclaimer
  // does the legal heavy lifting.
  body.set(
    "custom_text[submit][message]",
    isEs
      ? `Al hacer clic en Pagar aceptas los Términos y Condiciones de CarCheckerVIN ` +
          `(${site}/terms) y la Divulgación NMVTIS al Consumidor exigida por la ley ` +
          `federal (${site}/disclaimer). Los reportes son solo para uso personal. ` +
          `Datos provistos por ClearVin LLC, un proveedor de datos NMVTIS aprobado, ` +
          `y mostrados sin modificación.`
      : `By clicking Pay you agree to CarCheckerVIN's Terms & Conditions ` +
          `(${site}/terms) and the federally-mandated NMVTIS Consumer Disclosure ` +
          `(${site}/disclaimer). Reports are for personal use only. Data ` +
          `sourced from ClearVin LLC, an approved NMVTIS Data Provider, and ` +
          `rendered unmodified.`
  );
  body.set(
    "custom_text[after_submit][message]",
    isEs
      ? "Tras el pago serás redirigido al reporte completo del historial del vehículo en app.carcheckervin.com."
      : "After payment you'll be redirected to your full vehicle history report on app.carcheckervin.com."
  );

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
 * Look up a single Checkout Session by id. Used as a fallback when the
 * Stripe webhook is missing/misconfigured: the report API can ask Stripe
 * directly whether a session was paid and promote the order itself, so the
 * buyer never gets stuck on a "Waiting for payment confirmation" spinner
 * because of a webhook problem on the operator's end.
 *
 * Returns null on any failure (network, wrong key, session not found) so
 * the caller can treat "couldn't reach Stripe" as "still pending".
 */
export async function fetchCheckoutSession(
  sessionId: string
): Promise<{
  id: string;
  payment_status: "paid" | "unpaid" | "no_payment_required";
  status: "open" | "complete" | "expired";
  payment_intent: string | null;
  amount_total: number | null;
  currency: string | null;
} | null> {
  if (!stripeConfig.isConfigured() || !sessionId) return null;
  try {
    const res = await fetch(
      `https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(sessionId)}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${SECRET()}` },
        signal: AbortSignal.timeout(5000),
      }
    );
    if (!res.ok) {
      // eslint-disable-next-line no-console
      console.error(
        "[stripe] fetchCheckoutSession failed",
        res.status,
        res.statusText
      );
      return null;
    }
    const json = (await res.json()) as {
      id: string;
      payment_status: "paid" | "unpaid" | "no_payment_required";
      status: "open" | "complete" | "expired";
      payment_intent: string | null;
      amount_total: number | null;
      currency: string | null;
    };
    return json;
  } catch {
    return null;
  }
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

// ─────────────────────────────────────────────────────────────────────
// Stripe production stats — admin dashboard
// ─────────────────────────────────────────────────────────────────────
// Pulls real-time data from Stripe's REST API for the /admin/clearvin
// "Stripe Prod" panel. Everything is best-effort: the helper never throws
// (caller treats a failure as "no data") so a bad credential or rate
// limit can't take down the whole admin page.

export interface StripeProdStats {
  /** sk_live_* configured? */
  liveMode: boolean;
  /** Account display name + country (from /v1/account). */
  account: { name: string | null; country: string | null; email: string | null } | null;
  /** Available + pending balance, in USD cents. */
  balance: { availableCents: number; pendingCents: number; currency: string } | null;
  /** Gross volume in the current calendar month, USD cents. */
  monthVolumeCents: number;
  /** Net (gross − refunded − Stripe fees) for the current month, USD cents. */
  monthNetCents: number;
  /** Total Stripe fees for the current month, USD cents. */
  monthFeesCents: number;
  /** Refunded amount this month, USD cents. */
  monthRefundedCents: number;
  /** Charges this month: succeeded vs refunded vs disputed. */
  chargeCounts: { succeeded: number; refunded: number; disputed: number };
  /** Most recent successful charges (paginated, capped at 25). */
  recentCharges: Array<{
    id: string;
    amountCents: number;
    netCents: number | null;
    feeCents: number | null;
    currency: string;
    created: number;
    receiptEmail: string | null;
    paymentMethod: string | null;
    last4: string | null;
    country: string | null;
    status: string;
    refunded: boolean;
    disputed: boolean;
    receiptUrl: string | null;
    description: string | null;
  }>;
  /** Most recent disputes (any status). */
  recentDisputes: Array<{
    id: string;
    amountCents: number;
    currency: string;
    reason: string;
    status: string;
    created: number;
    chargeId: string;
  }>;
  /** Most recent payouts to the linked bank account. */
  recentPayouts: Array<{
    id: string;
    amountCents: number;
    currency: string;
    arrivalDate: number;
    status: string;
    method: string;
  }>;
  /** New customers count, current month. */
  newCustomersThisMonth: number;
  /** Error string if any underlying call failed. Page still renders. */
  errors: string[];
}

/** Convert a "yyyy-mm" + day-of-month string to a Unix timestamp (seconds). */
function unixStartOfCurrentMonth(): number {
  const d = new Date();
  return Math.floor(new Date(d.getFullYear(), d.getMonth(), 1).getTime() / 1000);
}

/**
 * Generic helper — call Stripe's REST API with the configured secret key.
 * Returns null on any failure (network, non-2xx, parse error).
 */
async function stripeGet<T = unknown>(
  path: string,
  errors: string[]
): Promise<T | null> {
  if (!stripeConfig.isConfigured()) return null;
  try {
    const res = await fetch(`https://api.stripe.com${path}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${SECRET()}`,
        Accept: "application/json",
      },
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      errors.push(`${path} → ${res.status}`);
      return null;
    }
    return (await res.json()) as T;
  } catch (e) {
    errors.push(`${path} → ${e instanceof Error ? e.message : "fetch failed"}`);
    return null;
  }
}

/**
 * Build the production-only stats blob for the admin dashboard.
 *
 * Skips entirely when the configured key is a test key — returning
 * `liveMode: false` so the UI can render an explanatory "sandbox mode"
 * card instead of misleading numbers.
 *
 * Hits these Stripe REST endpoints in parallel:
 *   GET /v1/account                — display name, country, email
 *   GET /v1/balance                — available + pending
 *   GET /v1/charges                — month-to-date for volume/counts
 *   GET /v1/disputes               — most recent disputes
 *   GET /v1/payouts                — most recent payouts
 *   GET /v1/customers              — new customers month-to-date
 *
 * Total round-trip: ~600-1200ms. Cached by the admin page's
 * `force-dynamic` revalidation — fresh every 60s with AutoRefresh.
 */
export async function fetchStripeProdStats(): Promise<StripeProdStats> {
  const liveMode = stripeConfig.isLiveMode();
  if (!liveMode) {
    return {
      liveMode: false,
      account: null,
      balance: null,
      monthVolumeCents: 0,
      monthNetCents: 0,
      monthFeesCents: 0,
      monthRefundedCents: 0,
      chargeCounts: { succeeded: 0, refunded: 0, disputed: 0 },
      recentCharges: [],
      recentDisputes: [],
      recentPayouts: [],
      newCustomersThisMonth: 0,
      errors: [],
    };
  }

  const errors: string[] = [];
  const monthStart = unixStartOfCurrentMonth();

  // Stripe paginates at 100 max — for /charges we'd want to iterate, but
  // the typical month volume here is well under 100. If/when we cross
  // that, the iteration loop is the only change needed.
  type StripeAccount = { business_profile?: { name?: string }; country?: string; email?: string };
  type StripeBalance = {
    available?: Array<{ amount?: number; currency?: string }>;
    pending?: Array<{ amount?: number; currency?: string }>;
  };
  type StripeCharge = {
    id: string;
    amount: number;
    amount_refunded: number;
    currency: string;
    created: number;
    // Stripe doesn't auto-populate receipt_email from the Checkout
    // Session's customer_email anymore. We expand payment_intent to
    // recover it from there (see expand[] below). billing_details.email
    // is the third source — set when the buyer typed an email into
    // Stripe's link/card form even when no Checkout was used.
    receipt_email: string | null;
    receipt_url: string | null;
    description: string | null;
    payment_method_details?: {
      card?: { brand?: string; last4?: string; country?: string };
      type?: string;
    };
    billing_details?: { email?: string | null } | null;
    payment_intent?:
      | string
      | null
      | { id?: string; receipt_email?: string | null };
    status: string;
    refunded: boolean;
    disputed: boolean;
    balance_transaction?: string | null;
  };
  type StripeBalanceTx = { id: string; amount: number; fee: number; net: number };
  type StripeDispute = {
    id: string;
    amount: number;
    currency: string;
    reason: string;
    status: string;
    created: number;
    charge: string;
  };
  type StripePayout = {
    id: string;
    amount: number;
    currency: string;
    arrival_date: number;
    status: string;
    method: string;
  };
  type StripeCustomersList = { data: unknown[] };
  type StripeList<T> = { data: T[] };

  const [account, balance, charges, disputes, payouts, customers] = await Promise.all([
    stripeGet<StripeAccount>("/v1/account", errors),
    stripeGet<StripeBalance>("/v1/balance", errors),
    // expand[] payment_intent so we can recover the buyer's email even
    // when Stripe doesn't mirror Checkout Session.customer_email down
    // to Charge.receipt_email (current Stripe behaviour).
    stripeGet<StripeList<StripeCharge>>(
      `/v1/charges?limit=100&created[gte]=${monthStart}` +
        `&expand[]=data.payment_intent`,
      errors
    ),
    stripeGet<StripeList<StripeDispute>>("/v1/disputes?limit=10", errors),
    stripeGet<StripeList<StripePayout>>("/v1/payouts?limit=10", errors),
    stripeGet<StripeCustomersList>(
      `/v1/customers?limit=100&created[gte]=${monthStart}`,
      errors
    ),
  ]);

  // Available + pending — sum the USD line (or first line if no USD).
  const availUsd =
    balance?.available?.find((b) => b.currency === "usd") ??
    balance?.available?.[0];
  const pendUsd =
    balance?.pending?.find((b) => b.currency === "usd") ?? balance?.pending?.[0];

  // For each charge we want the underlying balance_transaction to compute
  // the Stripe fee. Pull them in parallel (capped at the 20 most recent so
  // we don't hammer the API).
  const chargesArr: StripeCharge[] = charges?.data ?? [];
  const topCharges = chargesArr.slice(0, 25);
  const txIds = topCharges
    .map((c) => c.balance_transaction)
    .filter((x): x is string => typeof x === "string" && x.length > 0);
  const txMap = new Map<string, StripeBalanceTx>();
  if (txIds.length > 0) {
    const txs = await Promise.all(
      txIds.map((id) => stripeGet<StripeBalanceTx>(`/v1/balance_transactions/${id}`, errors))
    );
    for (const t of txs) if (t) txMap.set(t.id, t);
  }

  // Month aggregates from every charge in the window (not just top 25).
  let monthVolume = 0;
  let monthRefunded = 0;
  let monthFees = 0;
  let succeeded = 0;
  let refunded = 0;
  let disputed = 0;

  // For the fee sum across ALL month charges we'd need the balance_tx for
  // each — too many API calls. Stripe's reporting endpoint exists for this
  // but requires Restricted API key scopes. We approximate by computing
  // the fee % from the top 25 (where we DO have balance_tx) and applying
  // it to the rest.
  let sampledGross = 0;
  let sampledFees = 0;

  for (const c of chargesArr) {
    if (c.status === "succeeded") succeeded++;
    if (c.refunded || c.amount_refunded > 0) refunded++;
    if (c.disputed) disputed++;
    monthVolume += c.amount;
    monthRefunded += c.amount_refunded;

    if (c.balance_transaction && txMap.has(c.balance_transaction)) {
      const tx = txMap.get(c.balance_transaction)!;
      sampledGross += tx.amount;
      sampledFees += tx.fee;
      monthFees += tx.fee;
    }
  }

  // Approximate fees for the unsampled portion using the sampled effective
  // rate. ~2.9% + $0.30 is Stripe's standard so this stays close.
  if (chargesArr.length > topCharges.length && sampledGross > 0) {
    const sampledRate = sampledFees / sampledGross;
    const remainderGross =
      monthVolume - chargesArr.slice(0, topCharges.length).reduce((s, c) => s + c.amount, 0);
    monthFees += Math.round(remainderGross * sampledRate);
  }

  const monthNet = monthVolume - monthRefunded - monthFees;

  return {
    liveMode: true,
    account: account
      ? {
          name: account.business_profile?.name ?? null,
          country: account.country ?? null,
          email: account.email ?? null,
        }
      : null,
    balance: balance
      ? {
          availableCents: availUsd?.amount ?? 0,
          pendingCents: pendUsd?.amount ?? 0,
          currency: (availUsd?.currency ?? pendUsd?.currency ?? "usd").toUpperCase(),
        }
      : null,
    monthVolumeCents: monthVolume,
    monthNetCents: monthNet,
    monthFeesCents: monthFees,
    monthRefundedCents: monthRefunded,
    chargeCounts: { succeeded, refunded, disputed },
    recentCharges: topCharges.map((c) => {
      const tx = c.balance_transaction ? txMap.get(c.balance_transaction) : undefined;
      const card = c.payment_method_details?.card;
      // Email-resolution chain — Stripe stopped mirroring the Checkout
      // Session's customer_email onto Charge.receipt_email some time
      // ago, so we have to chase it across the related objects:
      //   1. Charge.receipt_email          — the legacy field, mostly null now
      //   2. Charge.payment_intent.receipt_email — expanded above, the
      //      authoritative source for orders that came from a Checkout
      //      Session with customer_email set
      //   3. Charge.billing_details.email  — set when the buyer typed
      //      an email into the link/card form
      // Falling through these three keeps the EMAIL column populated
      // across every order shape we issue.
      const piEmail =
        typeof c.payment_intent === "object" &&
        c.payment_intent !== null &&
        c.payment_intent.receipt_email
          ? c.payment_intent.receipt_email
          : null;
      const resolvedEmail =
        c.receipt_email ?? piEmail ?? c.billing_details?.email ?? null;
      return {
        id: c.id,
        amountCents: c.amount,
        netCents: tx ? tx.net : null,
        feeCents: tx ? tx.fee : null,
        currency: c.currency.toUpperCase(),
        created: c.created,
        receiptEmail: resolvedEmail,
        paymentMethod:
          card?.brand ??
          c.payment_method_details?.type ??
          null,
        last4: card?.last4 ?? null,
        country: card?.country ?? null,
        status: c.status,
        refunded: c.refunded || c.amount_refunded > 0,
        disputed: c.disputed,
        receiptUrl: c.receipt_url,
        description: c.description,
      };
    }),
    recentDisputes: (disputes?.data ?? []).map((d) => ({
      id: d.id,
      amountCents: d.amount,
      currency: d.currency.toUpperCase(),
      reason: d.reason,
      status: d.status,
      created: d.created,
      chargeId: d.charge,
    })),
    recentPayouts: (payouts?.data ?? []).map((p) => ({
      id: p.id,
      amountCents: p.amount,
      currency: p.currency.toUpperCase(),
      arrivalDate: p.arrival_date,
      status: p.status,
      method: p.method,
    })),
    newCustomersThisMonth: customers?.data?.length ?? 0,
    errors,
  };
}
