import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

interface Body {
  vin?: string;
  make?: string | null;
  model?: string | null;
  year?: number | null;
}

/**
 * Records a PDF/report download for the currently signed-in user.
 *
 * Best-effort: never surfaces errors to the browser (analytics shouldn't
 * break the download UX). Guests are simply ignored — guest history lives
 * in localStorage via /src/lib/vinHistory.ts.
 */
export async function POST(req: NextRequest) {
  try {
    const body = (await req.json().catch(() => ({}))) as Body;
    const vin = body.vin?.trim().toUpperCase();
    if (!vin || vin.length !== 17) {
      return NextResponse.json({ ok: false, reason: "invalid_vin" }, { status: 400 });
    }

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ ok: true, guest: true });
    }

    const admin = createAdminClient();
    await admin.from("vin_downloads").insert({
      vin,
      make: body.make ?? null,
      model: body.model ?? null,
      year: typeof body.year === "number" ? body.year : null,
      user_id: user.id,
      user_email: user.email ?? null,
    });

    return NextResponse.json({ ok: true });
  } catch {
    // Silent fail — tracking must never break the download UX
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}
