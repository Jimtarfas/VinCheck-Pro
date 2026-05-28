"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

/**
 * Only allow same-origin internal redirects via `?next=`.
 * Anything starting with "//" or containing a scheme is treated
 * as untrusted and falls back to "/".
 */
function safeNext(raw: string | null): string {
  if (!raw) return "/";
  if (!raw.startsWith("/") || raw.startsWith("//")) return "/";
  return raw;
}

/**
 * Captures *where* a signup originated — the page the user was on, the
 * external referrer that drove them there, and any UTM tags on the URL.
 * Surfaces in the admin "Signups" panel so we can see which pages convert.
 *
 * Returns plain strings (no PII) clipped to sensible lengths so they fit
 * comfortably in user_metadata.
 */
function captureSignupSource(nextPath: string) {
  if (typeof window === "undefined") return {};
  // Prefer the actual page the form is mounted on; if the user is sitting
  // on /login or /signup, fall back to the `next` they're trying to reach,
  // because that's the page that effectively triggered the auth gate.
  const here = window.location.pathname;
  const isAuthPage = here === "/login" || here === "/signup";
  const path = (isAuthPage && nextPath !== "/" ? nextPath : here).slice(0, 200);

  const params = new URLSearchParams(window.location.search);
  const referrer = (document.referrer || "").slice(0, 300);

  return {
    signup_path: path,
    signup_referrer: referrer || null,
    signup_utm_source: params.get("utm_source")?.slice(0, 80) || null,
    signup_utm_medium: params.get("utm_medium")?.slice(0, 80) || null,
    signup_utm_campaign: params.get("utm_campaign")?.slice(0, 120) || null,
    signup_captured_at: new Date().toISOString(),
  };
}

/**
 * Persist signup-source attribution for the OAuth flow. The user doesn't
 * exist yet when they click "Continue with Google", so we stash the source
 * in a short-lived cookie and merge it into user_metadata in /auth/callback.
 */
function stashSignupSourceCookie(nextPath: string) {
  if (typeof document === "undefined") return;
  const src = captureSignupSource(nextPath);
  try {
    const value = encodeURIComponent(JSON.stringify(src));
    // 10-minute TTL — long enough for the Google round-trip, short enough
    // that a stale cookie can't accidentally tag a future signup.
    document.cookie = `cc_signup_src=${value}; Max-Age=600; Path=/; SameSite=Lax`;
  } catch {
    // Non-fatal.
  }
}

export default function AuthForm({
  mode,
  next: nextProp,
  compact = false,
}: {
  mode: "login" | "signup";
  /**
   * Where to send the user after successful auth. If omitted, falls back
   * to the `?next=` URL query param. Used by callers like <ReportGate>
   * that mount this form inline (where the URL doesn't carry ?next=).
   */
  next?: string;
  /**
   * When true, drops the outer white card wrapper so the form can sit
   * inside another container (e.g. an inline modal that already has its
   * own card chrome). Defaults to false to preserve the page-level look.
   */
  compact?: boolean;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = nextProp ?? safeNext(searchParams.get("next"));
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const supabase = createClient();

    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          // Pass `next` through the email confirmation link so the user
          // lands back on the page they originally tried to view (e.g.
          // /report/{vin}) once they click confirm.
          emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
          // `data` lands in raw_user_meta_data (a.k.a. user_metadata) so
          // the admin "Signups" panel can see which page each user came
          // from. Captured client-side because referrer + path are only
          // observable in the browser.
          data: {
            ...captureSignupSource(next),
            signup_method: "email",
          },
        },
      });
      if (error) {
        setError(error.message);
      } else {
        // Fire-and-forget: try to capture country immediately. This works
        // when email confirmation is off (signup creates a session right
        // away). When it's on, this will 401 silently and the country gets
        // captured on email-confirmation via /auth/callback instead.
        try {
          void fetch("/api/auth/track-country", { method: "POST" });
        } catch {
          // Non-fatal.
        }
        setSuccess("Check your email for a confirmation link to complete your registration.");
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setError(error.message);
      } else {
        // Fire-and-forget: stamp the user's country onto their metadata so
        // it surfaces in the admin Users panel. Skipped server-side if
        // already recorded, so safe to call on every login.
        try {
          void fetch("/api/auth/track-country", { method: "POST" });
        } catch {
          // Non-fatal.
        }
        router.push(next);
        router.refresh();
      }
    }
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    setError("");
    // Stash signup source in a short-lived cookie so /auth/callback can
    // merge it into user_metadata after the OAuth round-trip completes.
    // No-op for returning users — the callback only applies the cookie
    // when the metadata is still empty (i.e. brand-new account).
    stashSignupSourceCookie(next);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
      },
    });
    if (error) {
      setError(error.message);
      setGoogleLoading(false);
    }
  };

  return (
    <div className={compact ? "" : "bg-white rounded-2xl border border-slate-200 p-8 shadow-sm"}>
      {/* Google */}
      <button
        onClick={handleGoogleLogin}
        disabled={googleLoading}
        className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer disabled:opacity-50"
      >
        {googleLoading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
        )}
        Continue with Google
      </button>

      {/* Divider */}
      <div className="flex items-center gap-3 my-6">
        <div className="flex-1 border-t border-slate-200" />
        <span className="text-xs text-slate-600 uppercase">or</span>
        <div className="flex-1 border-t border-slate-200" />
      </div>

      {/* Email form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1.5">
            Email address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="you@example.com"
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1.5">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder={mode === "signup" ? "Min. 6 characters" : "Enter your password"}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-600 cursor-pointer"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
            {error}
          </div>
        )}

        {success && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-sm text-emerald-600">
            {success}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary-600 text-white text-sm font-semibold rounded-xl hover:bg-primary-700 transition-colors cursor-pointer disabled:opacity-50"
        >
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          {mode === "signup" ? "Create Account" : "Log In"}
        </button>
      </form>
    </div>
  );
}
