/**
 * Diagnostic — reports the EXACT byte length and JSON-encoded form of
 * RESEND_FROM as the deploy sees it. Catches trailing newlines, smart
 * quotes, BOM bytes, accidental wrapping quotes that the Vercel UI
 * doesn't visibly show.
 *
 * Admin-gated. Read-only.
 */
import { NextResponse } from "next/server";
import { createClient as createServerClient } from "@/lib/supabase/server";
import { isAdminEmail } from "@/lib/supabase/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  let actorEmail: string | null = null;
  try {
    const supa = await createServerClient();
    const { data } = await supa.auth.getUser();
    actorEmail = data.user?.email ?? null;
  } catch {
    /* fall through */
  }
  if (!isAdminEmail(actorEmail)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const raw = process.env.RESEND_FROM ?? null;
  return NextResponse.json({
    resendFromPresent: raw !== null,
    rawLength: raw?.length ?? 0,
    rawJson: JSON.stringify(raw),
    trimmed: raw?.trim() ?? null,
    trimmedLength: raw?.trim().length ?? 0,
    charCodes: raw
      ? Array.from(raw).map((c) => c.charCodeAt(0))
      : [],
    apiKeyPresent: Boolean(process.env.RESEND_API_KEY),
    apiKeyLength: (process.env.RESEND_API_KEY || "").length,
  });
}
