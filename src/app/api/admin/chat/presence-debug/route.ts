import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient, isAdminEmail } from "@/lib/supabase/admin";

/**
 * Diagnostic for the "Online Right Now" feature.
 * Returns whether the last_visitor_seen_at column exists and what
 * the current presence state looks like across recent conversations.
 *
 * GET /api/admin/chat/presence-debug
 */
export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user || !isAdminEmail(user.email)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  try {
    const admin = createAdminClient();

    // 1) Check the column exists by trying to select it
    let columnExists = true;
    let columnError: string | null = null;
    try {
      await admin
        .from("chat_conversations")
        .select("last_visitor_seen_at")
        .limit(1);
    } catch (e) {
      columnExists = false;
      columnError = e instanceof Error ? e.message : "unknown";
    }

    // 2) Pull presence data from the most recent 25 conversations
    const { data: convos, error } = await admin
      .from("chat_conversations")
      .select("id, visitor_name, last_visitor_seen_at, last_message_at, status")
      .order("last_message_at", { ascending: false })
      .limit(25);

    if (error) {
      return NextResponse.json({
        columnExists: false,
        columnError: error.message,
        hint:
          "It looks like the `last_visitor_seen_at` column wasn't created. " +
          "Run the v3 SQL block in supabase-setup.sql in the Supabase SQL Editor.",
      });
    }

    const now = Date.now();
    const ONLINE_WINDOW_MS = 15_000;
    const enriched = (convos ?? []).map((c) => {
      const last = c.last_visitor_seen_at as string | null;
      const ageSec = last ? Math.round((now - new Date(last).getTime()) / 1000) : null;
      return {
        id: c.id,
        visitor_name: c.visitor_name,
        status: c.status,
        last_visitor_seen_at: last,
        seconds_since_last_seen: ageSec,
        is_online: !!last && now - new Date(last).getTime() < ONLINE_WINDOW_MS,
      };
    });

    const onlineCount = enriched.filter((c) => c.is_online).length;
    const everSeenCount = enriched.filter((c) => !!c.last_visitor_seen_at).length;

    return NextResponse.json({
      columnExists,
      columnError,
      now: new Date(now).toISOString(),
      onlineWindowMs: ONLINE_WINDOW_MS,
      onlineCount,
      everSeenCount,
      totalConversations: enriched.length,
      conversations: enriched,
      hint:
        everSeenCount === 0
          ? "No conversation has ever recorded a heartbeat. The column probably exists but no visitor has polled since it was created. Open the chat widget on the public site and watch this endpoint refresh."
          : onlineCount === 0
          ? `${everSeenCount} conversations have heartbeats but none are within the 15s online window — meaning no one currently has the widget open.`
          : `${onlineCount} visitors are currently online.`,
    });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "unknown" },
      { status: 500 }
    );
  }
}
