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
 * Client-side backstop for view tracking. The server component also calls
 * trackVinLookup on mount, but this API route ensures the row lands in
 * vin_lookups even in edge cases (e.g. if the server insert didn't resolve
 * before the serverless function froze, or if the user just signed in).
 *
 * Unlike /api/user/track-download, this writes to vin_lookups (not
 * vin_downloads) so it's consistent with the server-side tracker.
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
      // Guests already get localStorage history on the client.
      return NextResponse.json({ ok: true, guest: true });
    }

    const admin = createAdminClient();
    await admin.from("vin_lookups").insert({
      vin,
      make: body.make ?? null,
      model: body.model ?? null,
      year: typeof body.year === "number" ? body.year : null,
      user_id: user.id,
      user_email: user.email ?? null,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}
