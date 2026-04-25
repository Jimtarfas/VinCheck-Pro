import { NextRequest, NextResponse } from "next/server";
import crypto from "node:crypto";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

const ALLOWED_SUBJECTS = [
  "General Question",
  "Report Issue",
  "Partnership",
  "Press",
  "Other",
] as const;

type Subject = (typeof ALLOWED_SUBJECTS)[number];

interface ContactBody {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  website?: string; // honeypot
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function getClientIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  const real = req.headers.get("x-real-ip");
  if (real) return real;
  return "unknown";
}

async function sendEmailViaResend(payload: {
  apiKey: string;
  from: string;
  replyTo: string;
  to: string;
  subject: string;
  html: string;
}): Promise<void> {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${payload.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: payload.from,
      to: [payload.to],
      reply_to: payload.replyTo,
      subject: payload.subject,
      html: payload.html,
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Resend API error ${res.status}: ${text}`);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json().catch(() => ({}))) as ContactBody;

    // Honeypot check — silently succeed to fool bots
    if (body.website && body.website.trim().length > 0) {
      return NextResponse.json({ ok: true });
    }

    const name = (body.name ?? "").trim();
    const email = (body.email ?? "").trim();
    const subject = (body.subject ?? "").trim();
    const message = (body.message ?? "").trim();

    // Validation
    if (!name || name.length < 1 || name.length > 100) {
      return NextResponse.json(
        { ok: false, error: "Name must be between 1 and 100 characters." },
        { status: 400 }
      );
    }
    if (!EMAIL_RE.test(email) || email.length > 254) {
      return NextResponse.json(
        { ok: false, error: "Please provide a valid email address." },
        { status: 400 }
      );
    }
    if (!ALLOWED_SUBJECTS.includes(subject as Subject)) {
      return NextResponse.json(
        { ok: false, error: "Please select a valid subject." },
        { status: 400 }
      );
    }
    if (message.length < 10 || message.length > 5000) {
      return NextResponse.json(
        { ok: false, error: "Message must be between 10 and 5000 characters." },
        { status: 400 }
      );
    }

    const ip = getClientIp(req);
    const ipHash = crypto.createHash("sha256").update(ip).digest("hex").slice(0, 16);
    const userAgent = req.headers.get("user-agent")?.slice(0, 500) ?? null;

    // 1) Persist to Supabase (best-effort; do not crash if env vars missing)
    try {
      const admin = createAdminClient();
      await admin.from("contact_submissions").insert({
        name,
        email,
        subject,
        message,
        ip_hash: ipHash,
        user_agent: userAgent,
      });
    } catch (storeErr) {
      console.error("[contact] Supabase store failed:", storeErr);
    }

    // 2) Send email via Resend (if configured)
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      try {
        const fromAddress =
          process.env.RESEND_FROM ||
          "CarCheckerVIN Contact <noreply@carcheckervin.com>";
        const toAddress = process.env.CONTACT_TO || "support@carcheckervin.com";

        const html = `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; color: #0f172a;">
            <h2 style="color: #0f172a; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">
              New contact form submission
            </h2>
            <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
              <tr>
                <td style="padding: 8px 12px; background: #f8fafc; font-weight: 600; width: 120px; border: 1px solid #e2e8f0;">Name</td>
                <td style="padding: 8px 12px; border: 1px solid #e2e8f0;">${escapeHtml(name)}</td>
              </tr>
              <tr>
                <td style="padding: 8px 12px; background: #f8fafc; font-weight: 600; border: 1px solid #e2e8f0;">Email</td>
                <td style="padding: 8px 12px; border: 1px solid #e2e8f0;">
                  <a href="mailto:${escapeHtml(email)}" style="color: #2563eb;">${escapeHtml(email)}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 12px; background: #f8fafc; font-weight: 600; border: 1px solid #e2e8f0;">Subject</td>
                <td style="padding: 8px 12px; border: 1px solid #e2e8f0;">${escapeHtml(subject)}</td>
              </tr>
              <tr>
                <td style="padding: 8px 12px; background: #f8fafc; font-weight: 600; border: 1px solid #e2e8f0; vertical-align: top;">Message</td>
                <td style="padding: 8px 12px; border: 1px solid #e2e8f0; white-space: pre-wrap;">${escapeHtml(message)}</td>
              </tr>
              <tr>
                <td style="padding: 8px 12px; background: #f8fafc; font-weight: 600; border: 1px solid #e2e8f0;">IP hash</td>
                <td style="padding: 8px 12px; border: 1px solid #e2e8f0; font-family: monospace; font-size: 12px;">${escapeHtml(ipHash)}</td>
              </tr>
              <tr>
                <td style="padding: 8px 12px; background: #f8fafc; font-weight: 600; border: 1px solid #e2e8f0;">User-Agent</td>
                <td style="padding: 8px 12px; border: 1px solid #e2e8f0; font-size: 12px;">${escapeHtml(userAgent ?? "unknown")}</td>
              </tr>
            </table>
            <p style="margin-top: 20px; font-size: 12px; color: #64748b;">
              Reply directly to this email to respond to the sender.
            </p>
          </div>
        `;

        await sendEmailViaResend({
          apiKey: resendKey,
          from: fromAddress,
          replyTo: email,
          to: toAddress,
          subject: `[Contact] ${subject}: from ${name}`,
          html,
        });
      } catch (mailErr) {
        // Log but don't fail the request — submission is already stored.
        console.error("[contact] Resend send failed:", mailErr);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return NextResponse.json(
      { ok: false, error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}
