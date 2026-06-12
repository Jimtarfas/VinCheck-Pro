import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createHash } from "node:crypto";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient as createServerClient } from "@/lib/supabase/server";
import { createCheckoutSession, stripeConfig } from "@/lib/stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface CheckoutBody {
  vin?: string;
  email?: string;
  vehicleLabel?: string;
  coupon?: string;
  /** The page the buyer launched checkout from (e.g. their report preview).
      Used as the Stripe cancel_url so a failed/cancelled payment returns them
      exactly where they were rather than the generic homepage. */
  returnTo?: string;
  /** Wave 10: locale for Stripe Checkout UI + custom_text + product copy. */
  locale?: "en" | "es";
}

const VIN_RE = /^[A-HJ-NPR-Z0-9]{17}$/i;

/**
 * Sanitise a buyer-supplied return URL into a safe cancel_url.
 *
 * `returnTo` comes from the client (window.location.href), so it's untrusted.
 * To prevent an open-redirect we only honour it when it resolves to the SAME
 * origin as the checkout request; anything cross-origin (or unparseable) is
 * rejected and we fall back to the default cancel URL. We also strip any
 * existing `cancelled`/`session_id` params and tag `cancelled=1` so the
 * destination page can surface a "payment cancelled" notice.
 */
function safeCancelUrl(
  returnTo: string | undefined,
  origin: string | undefined
): string | undefined {
  if (!returnTo || !origin) return undefined;
  try {
    const url = new URL(returnTo, origin);
    const base = new URL(origin);
    if (url.origin !== base.origin) return undefined; // reject cross-origin
    if (url.protocol !== "http:" && url.protocol !== "https:") return undefined;
    url.searchParams.delete("session_id");
    url.searchParams.set("cancelled", "1");
    return url.toString();
  } catch {
    return undefined;
  }
}

export async function POST(req: Request) {
  let body: CheckoutBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const vin = (body.vin || "").trim().toUpperCase();
  if (!VIN_RE.test(vin)) {
    return NextResponse.json(
      { error: "A valid 17-character VIN is required." },
      { status: 400 }
    );
  }

  // Pull the logged-in user (if any) — so the order can be tied to them later.
  let userId: string | null = null;
  let userEmail = (body.email || "").trim().toLowerCase();
  try {
    const supa = await createServerClient();
    const { data } = await supa.auth.getUser();
    if (data.user) {
      userId = data.user.id;
      if (!userEmail) userEmail = (data.user.email || "").toLowerCase();
    }
  } catch {
    // Anonymous order — no logged-in session. That's fine.
  }

  if (!userEmail) {
    return NextResponse.json(
      { error: "Email is required so we can send your report." },
      { status: 400 }
    );
  }

  // Telemetry — keep IP only as a salted hash, never raw.
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "";
  const userAgent = req.headers.get("user-agent") || "";
  const ipHash = ip
    ? createHash("sha256").update(ip).digest("hex").slice(0, 32)
    : null;

  // Insert the pending order
  const admin = createAdminClient();
  const { data: orderRow, error: orderErr } = await admin
    .from("report_orders")
    .insert({
      user_id: userId,
      user_email: userEmail,
      vin,
      vehicle_label: body.vehicleLabel || null,
      amount_cents: stripeConfig.priceCents(),
      currency: "usd",
      status: "pending",
      ip_hash: ipHash,
      user_agent: userAgent.slice(0, 500),
    })
    .select("id")
    .single();

  if (orderErr || !orderRow) {
    return NextResponse.json(
      { error: orderErr?.message || "Could not create the order record." },
      { status: 500 }
    );
  }

  // Create the Stripe Checkout session (or mock URL if Stripe isn't configured)
  try {
    // Keep checkout on the buyer's own origin so the success/report pages —
    // and the order_<id> cookie set below — all live on the same host. The
    // same-origin POST always carries an Origin header; fall back to the
    // forwarded host if it's ever absent.
    const origin =
      req.headers.get("origin") ||
      (() => {
        const host = req.headers.get("host");
        if (!host) return undefined;
        const proto = req.headers.get("x-forwarded-proto") || "https";
        return `${proto}://${host}`;
      })();

    // If the buyer cancels/fails payment, send them back to the exact page
    // they launched checkout from (e.g. their report preview) instead of the
    // generic app homepage. Validated same-origin to avoid an open redirect.
    const cancelUrl = safeCancelUrl(body.returnTo, origin);

    const session = await createCheckoutSession({
      orderId: orderRow.id,
      vin,
      vehicleLabel: body.vehicleLabel,
      customerEmail: userEmail,
      couponCode: (body.coupon || "").trim() || undefined,
      origin,
      cancelUrl,
      locale: body.locale === "es" ? "es" : "en",
    });

    // Stash the session id on the order so the webhook can match it.
    await admin
      .from("report_orders")
      .update({ stripe_session_id: session.id })
      .eq("id", orderRow.id);

    // ── Buyer access cookie ──
    // The buyer is typically anonymous (no Supabase login) — Stripe sends
    // them back to /success → /r/<id> and they shouldn't have to create an
    // account to read the report they just paid for. We set an httpOnly
    // cookie scoped to this specific order id; the report API treats the
    // cookie as proof-of-purchase from the same browser. 30 days so the
    // buyer can return to the report from email/bookmark.
    const cookieStore = await cookies();
    cookieStore.set(`order_${orderRow.id}`, "1", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });

    return NextResponse.json({
      ok: true,
      orderId: orderRow.id,
      url: session.url,
      mock: session.mock || false,
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Checkout failed.";
    await admin
      .from("report_orders")
      .update({ status: "failed", clearvin_error: msg })
      .eq("id", orderRow.id);
    return NextResponse.json({ error: msg }, { status: 502 });
  }
}
