import { NextResponse } from "next/server";
import { isUsingMockData } from "@/lib/clearvin";
import { stripeConfig } from "@/lib/stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * GET /api/order/diagnostic
 *
 * Tiny health-check that tells the operator which mode the running
 * deployment is in. Returns booleans only — never echoes the actual
 * token or secret values. Safe to leave public.
 *
 * Use it after editing Vercel env vars to confirm the new build
 * actually sees them:
 *   curl https://www.carcheckervin.com/api/order/diagnostic
 */
export async function GET() {
  const token = process.env.CLEARVIN_API_TOKEN || "";
  const base = process.env.CLEARVIN_API_BASE_URL || "";
  const stripeSecret = process.env.STRIPE_SECRET_KEY || "";
  const stripeWebhook = process.env.STRIPE_WEBHOOK_SECRET || "";
  const appUrl =
    process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_APP_URL || "";

  return NextResponse.json({
    clearvin: {
      mode: isUsingMockData() ? "MOCK" : "LIVE",
      tokenPresent: token.length > 0,
      tokenLength: token.length,
      tokenStartsWith: token ? `${token.slice(0, 8)}…` : null,
      baseUrl: base || "https://www.clearvin.com (default)",
    },
    stripe: {
      mode: stripeConfig.isConfigured() ? "LIVE" : "MOCK",
      secretPresent: stripeSecret.length > 0,
      secretPrefix: stripeSecret ? stripeSecret.slice(0, 8) : null,
      webhookSecretPresent: stripeWebhook.length > 0,
      priceLabel: stripeConfig.priceLabel(),
    },
    app: {
      appUrl: appUrl || "https://www.carcheckervin.com (default)",
      nodeEnv: process.env.NODE_ENV,
    },
    timestamp: new Date().toISOString(),
  });
}
