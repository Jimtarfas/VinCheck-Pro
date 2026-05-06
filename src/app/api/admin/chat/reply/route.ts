import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient, isAdminEmail } from "@/lib/supabase/admin";

interface Body {
  conversationId: string;
  message: string;
}

export async function POST(req: NextRequest) {
  // Auth: must be a logged-in admin
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user || !isAdminEmail(user.email)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "invalid body" }, { status: 400 });
  }

  if (!body.conversationId || !body.message || body.message.length > 4000) {
    return NextResponse.json({ error: "missing or invalid fields" }, { status: 400 });
  }

  try {
    const admin = createAdminClient();

    const { data: convo } = await admin
      .from("chat_conversations")
      .select("id, unread_visitor")
      .eq("id", body.conversationId)
      .single();
    if (!convo) return NextResponse.json({ error: "not found" }, { status: 404 });

    await admin.from("chat_messages").insert({
      conversation_id: body.conversationId,
      sender: "admin",
      body: body.message,
      source: "web",
    });

    await admin
      .from("chat_conversations")
      .update({
        last_message_at: new Date().toISOString(),
        unread_admin: 0,
        unread_visitor: ((convo as { unread_visitor?: number }).unread_visitor || 0) + 1,
        status: "open",
      })
      .eq("id", body.conversationId);

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "unknown" },
      { status: 500 }
    );
  }
}
