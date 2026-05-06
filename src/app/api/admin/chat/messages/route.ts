import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient, isAdminEmail } from "@/lib/supabase/admin";

export async function GET(req: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user || !isAdminEmail(user.email)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const conversationId = req.nextUrl.searchParams.get("conversationId");
  const since = Number(req.nextUrl.searchParams.get("since") || "0");
  if (!conversationId) {
    return NextResponse.json({ error: "missing conversationId" }, { status: 400 });
  }

  try {
    const admin = createAdminClient();
    const sinceIso = since > 0 ? new Date(since).toISOString() : new Date(0).toISOString();
    const [{ data: messages }, { data: convo }] = await Promise.all([
      admin
        .from("chat_messages")
        .select("id, sender, body, source, created_at")
        .eq("conversation_id", conversationId)
        .gt("created_at", sinceIso)
        .order("created_at", { ascending: true }),
      admin
        .from("chat_conversations")
        .select("last_visitor_seen_at, status")
        .eq("id", conversationId)
        .single(),
    ]);

    const lastSeen = convo?.last_visitor_seen_at as string | null | undefined;
    const online =
      !!lastSeen && Date.now() - new Date(lastSeen).getTime() < 15_000;

    return NextResponse.json({
      messages: messages ?? [],
      now: Date.now(),
      online,
      lastSeen: lastSeen || null,
      status: convo?.status || "open",
    });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "unknown" },
      { status: 500 }
    );
  }
}
