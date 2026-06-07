import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

interface Body {
  vin?: string;
  make?: string | null;
  model?: string | null;
  year?: string | null;
  action?: "download" | "print";
}

/**
 * Records a window-sticker download/print for the currently signed-in user.
 * Best-effort: never surfaces errors to the browser.
 */
export async function POST(req: NextRequest) {
  try {
    const body = (await req.json().catch(() => ({}))) as Body;

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ ok: true, guest: true });
    }

    const admin = createAdminClient();
    await admin.from("window_sticker_downloads").insert({
      vin: body.vin?.trim().toUpperCase() || null,
      make: body.make ?? null,
      model: body.model ?? null,
      year: body.year ? parseInt(body.year, 10) || null : null,
      action: body.action ?? "download",
      user_id: user.id,
      user_email: user.email ?? null,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}
