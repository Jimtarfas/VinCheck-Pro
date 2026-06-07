import { NextResponse } from "next/server";
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
}

const VIN_RE = /^[A-HJ-NPR-Z0-9]{17}$/i;

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
    const session = await createCheckoutSession({
      orderId: orderRow.id,
      vin,
      vehicleLabel: body.vehicleLabel,
      customerEmail: userEmail,
    });

    // Stash the session id on the order so the webhook can match it.
    await admin
      .from("report_orders")
      .update({ stripe_session_id: session.id })
      .eq("id", orderRow.id);

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
