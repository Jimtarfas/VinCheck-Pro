"use client";

/**
 * "Set a password" form for the buyer-account onboarding flow.
 *
 * Lives at /account/set-password (rewritten to /order/account/set-password
 * by proxy.ts). Reached from the order-confirmation email's primary CTA:
 *   1. Buyer clicks the magic link in their inbox
 *   2. Supabase verifies the token, /auth/callback exchanges the code
 *      for a session, and forwards here
 *   3. By the time this form mounts, the buyer is authenticated (no
 *      password needed) and supabase.auth.updateUser({ password })
 *      will succeed
 *   4. On success we send them to /account so they immediately see
 *      their report
 *
 * Forks of ResetPasswordForm rather than reusing it directly because:
 *   - copy is buyer-onboarding-flavoured ("Set your password" vs
 *     "Choose a new password"),
 *   - the post-success redirect target is /account (their My Reports
 *     page) rather than the marketing homepage,
 *   - we render a small "Skip for now" link so a buyer who's already
 *     signed in can jump straight to the report without touching
 *     their password.
 */

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "@/components/LocaleLink";
import { Lock, Eye, EyeOff, Loader2, CheckCircle2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function SetPasswordForm({
  initialEmail,
}: {
  initialEmail: string | null;
}) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords don't match.");
      return;
    }

    setLoading(true);
    const supabase = createClient();
    const { error: updateErr } = await supabase.auth.updateUser({ password });
    if (updateErr) {
      setError(updateErr.message);
      setLoading(false);
      return;
    }
    setDone(true);
    setLoading(false);
    // Short visual confirmation, then send to My Reports.
    setTimeout(() => {
      router.push("/account");
      router.refresh();
    }, 1600);
  }

  if (done) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50">
          <CheckCircle2 className="h-6 w-6 text-emerald-600" />
        </div>
        <h2 className="text-lg font-bold text-slate-900">Password set</h2>
        <p className="mt-2 text-sm text-slate-700">
          You can now sign in with{" "}
          {initialEmail ? (
            <span className="font-medium">{initialEmail}</span>
          ) : (
            "your email"
          )}{" "}
          and this password any time. Taking you to your reports&hellip;
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
      <form onSubmit={handleSubmit} className="space-y-4">
        {initialEmail && (
          <div className="rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-sm">
            <span className="text-slate-500">Email:</span>{" "}
            <span className="font-semibold text-slate-900">{initialEmail}</span>
          </div>
        )}

        <div>
          <label
            htmlFor="new-password"
            className="block text-sm font-medium text-slate-700 mb-1.5"
          >
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
            <input
              id="new-password"
              type={showPassword ? "text" : "password"}
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="At least 8 characters"
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        <div>
          <label
            htmlFor="confirm-password"
            className="block text-sm font-medium text-slate-700 mb-1.5"
          >
            Confirm password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
            <input
              id="confirm-password"
              type={showPassword ? "text" : "password"}
              required
              minLength={8}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Type it again"
              autoComplete="new-password"
            />
          </div>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary text-white text-sm font-bold rounded-xl hover:bg-primary-700 transition-colors disabled:opacity-50"
        >
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          Set password &amp; continue
        </button>

        {/* Buyers who just want to see their report — they're already
            signed in via the magic link, so skip-to-account is safe. */}
        <p className="text-center text-xs text-slate-500 pt-1">
          <Link
            href="/account"
            className="text-primary hover:text-primary-700 underline underline-offset-2"
          >
            Skip — take me straight to my reports
          </Link>
        </p>
      </form>
    </div>
  );
}
