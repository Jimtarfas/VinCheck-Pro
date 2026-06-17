/**
 * Buyer onboarding — set a password for the auto-provisioned account.
 *
 * Reached from the order-confirmation email's primary CTA. The magic
 * link in that email points at /auth/callback?next=/account/set-password.
 * /auth/callback exchanges the PKCE code for a session, then forwards
 * here — so by the time this page renders, the buyer is signed in and
 * supabase.auth.updateUser({ password }) can succeed on the client.
 *
 * URL: app.carcheckervin.com/account/set-password  (proxied internally
 * to /order/account/set-password by src/proxy.ts).
 *
 * If the buyer hits this page without a session (link expired, opened
 * in a different browser, magic link consumed once already) we render
 * an "Open a new link" prompt instead of the form — the link itself is
 * single-use, so the only recovery path is requesting a fresh one.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { KeyRound, AlertTriangle } from "lucide-react";
import SetPasswordForm from "./_components/SetPasswordForm";

export const metadata: Metadata = {
  title: "Set your password",
  description: "Create a password for your CarCheckerVIN account.",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function SetPasswordPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // No session ⇒ magic link expired / already used / opened in the
  // wrong browser. Don't render the form — it would silently fail
  // updateUser() with an unhelpful error.
  if (!user) {
    return (
      <div className="bg-surface min-h-[calc(100vh-200px)] flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 p-8 shadow-sm text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-50">
            <AlertTriangle className="h-6 w-6 text-amber-600" />
          </div>
          <h1 className="text-xl font-bold text-slate-900">
            Sign-in link has expired
          </h1>
          <p className="mt-3 text-sm text-slate-700 leading-relaxed">
            Magic links expire after a short time and can only be used
            once. Open the most recent order-confirmation email from
            CarCheckerVIN and click <strong>Set your password</strong>{" "}
            again, or use the password-reset flow if you&apos;ve already
            set one.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-2 justify-center">
            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-bold hover:bg-primary-700 transition"
            >
              Go to sign in
            </Link>
            <Link
              href="/forgot-password"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-sm font-bold hover:bg-slate-50 transition"
            >
              Reset password
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface min-h-[calc(100vh-200px)] px-4 py-12 sm:py-20">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-6">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <KeyRound className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">
            Set your password
          </h1>
          <p className="mt-2 text-sm text-slate-700 leading-relaxed">
            Your account is already created. Set a password now so you
            can sign in later without using the email link each time.
          </p>
        </div>
        <SetPasswordForm initialEmail={user.email ?? null} />
      </div>
    </div>
  );
}
