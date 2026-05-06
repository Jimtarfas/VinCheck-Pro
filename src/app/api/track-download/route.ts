import { NextResponse, type NextRequest } from "next/server";
import { createHash } from "node:crypto";
import { headers } from "next/headers";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

interface Body {
  vin: string;
  make?: string | null;
  model?: string | null;
  year?: number | null;
}

/**
 * Beacon endpoint called by VinReport.tsx when the user clicks
 * "Download Report". Best-effort logging; never blocks the download.
 */
export async function POST(req: NextRequest) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  if (!body.vin || typeof body.vin !== "string") {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  try {
    const h = await headers();
    const ip = h.get("x-forwarded-for")?.split(",")[0].trim() || h.get("x-real-ip") || "";
    const ipHash = ip ? createHash("sha256").update(ip).digest("hex").slice(0, 16) : null;
    const userAgent = h.get("user-agent")?.slice(0, 300) || null;

    let userEmail: string | null = null;
    let userId: string | null = null;
    try {
      const sb = await createClient();
      const { data: { user } } = await sb.auth.getUser();
      if (user) {
        userEmail = user.email ?? null;
        userId = user.id;
      }
    } catch {
      // not signed in — that's fine
    }

    const admin = createAdminClient();
    await admin.from("report_downloads").insert({
      vin: body.vin,
      make: body.make ?? null,
      model: body.model ?? null,
      year: body.year ?? null,
      user_id: userId,
      user_email: userEmail,
      ip_hash: ipHash,
      user_agent: userAgent,
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
