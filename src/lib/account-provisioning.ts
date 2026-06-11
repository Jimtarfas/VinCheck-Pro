import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * Auto-provision a buyer account the moment a purchase is confirmed.
 *
 * When someone pays for a report we create a Supabase auth account for the
 * email they checked out with (if one doesn't already exist) and tie the
 * order to it. From then on the buyer can sign in with that email — via the
 * "forgot password" flow or Google — and the order shows up under
 * "My Reports" (which matches on user_id OR user_email).
 *
 * Design rules:
 *   - NEVER throw. Account creation is a convenience layered on top of a paid
 *     order; a failure here must not block report delivery or fail the
 *     Stripe webhook (which would make Stripe retry the whole event).
 *   - Idempotent. The webhook and the on-demand report fallback can both call
 *     this for the same order; creating an existing account is a no-op and we
 *     only set user_id when it's still null.
 *   - email_confirm:true. The buyer proved ownership of the inbox at Stripe
 *     checkout, so there's nothing to verify — we don't want to send them a
 *     confirmation email for an account they didn't explicitly ask for.
 */
export async function provisionAccountForOrder(
  admin: SupabaseClient,
  params: { orderId: string; email: string | null | undefined }
): Promise<{ created: boolean; linked: boolean }> {
  const email = (params.email || "").trim().toLowerCase();
  const result = { created: false, linked: false };
  if (!email || !params.orderId) return result;

  try {
    const { data, error } = await admin.auth.admin.createUser({
      email,
      email_confirm: true,
      user_metadata: {
        created_via: "purchase",
        created_at: new Date().toISOString(),
      },
    });

    const userId = data?.user?.id ?? null;

    if (!error && userId) {
      result.created = true;
      // Link the freshly created account to this order. Guard on a null
      // user_id so we never clobber an order already tied to a logged-in
      // buyer.
      const { error: linkErr } = await admin
        .from("report_orders")
        .update({ user_id: userId })
        .eq("id", params.orderId)
        .is("user_id", null);
      if (!linkErr) result.linked = true;
      return result;
    }

    // createUser failed — almost always because the email is already
    // registered. That's fine: an account already exists, and the order is
    // still reachable for that user by email match on the My Reports page, so
    // there's nothing more we need to do here.
  } catch {
    // Provisioning must never block report delivery.
  }

  return result;
}
