"use client";

import { useEffect, useState } from "react";
import Link from "@/components/LocaleLink";
import { Download, FileText } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { VinData } from "@/lib/api";
import Logo from "./Logo";
import AuthForm from "./AuthForm";

type AuthState = "loading" | "authed" | "guest";

/**
 * ReportGate
 * ---------------------------------------------------------------
 * Gates the full VIN report behind Supabase auth. Guests see the
 * real report behind a light 2.3px blur (readable teaser) with a
 * signup/login popup over it. No heavy "locked content" overlay —
 * just blur + popup, so the visitor can see real data is here.
 *
 * On mobile the popup docks as a bottom sheet (max-h, internal
 * scroll) so the top of the blurred report peeks above it instead
 * of the popup covering the whole screen. On desktop it's a
 * centered card. The flow completes inline: the moment Supabase
 * emits an auth state change the gate drops live — no redirect.
 *
 * If Supabase env vars aren't configured we fall back to "authed"
 * so the report stays visible (a misconfigured auth backend should
 * never brick the report page).
 */
export default function ReportGate({
  vin,
  children,
}: {
  vin: string;
  data?: VinData;
  children: React.ReactNode;
}) {
  const [auth, setAuth] = useState<AuthState>("loading");
  const [mode, setMode] = useState<"signup" | "login">("signup");

  useEffect(() => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
    if (!supabaseUrl || !supabaseKey) {
      // Auth not configured → don't gate. Better to show the report than
      // to brick it behind a non-functional signup wall.
      setAuth("authed");
      return;
    }

    let mounted = true;
    const supabase = createClient();

    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!mounted) return;
      setAuth(user ? "authed" : "guest");
    });

    // If the user signs in/up in this tab (or another), drop the gate live.
    // AuthForm calls signInWithPassword / signUp on the same client which
    // triggers this listener, so the popup disappears without a redirect.
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!mounted) return;
        setAuth(session?.user ? "authed" : "guest");
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  // Lock body scroll while the gate is up so the popup feels modal and the
  // bottom sheet's own internal scroll takes over on mobile.
  useEffect(() => {
    if (auth !== "guest") return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [auth]);

  // While we're checking auth, render the children but invisible to
  // avoid (a) a content flash for guests and (b) a flash of the gate
  // for signed-in users. Reserving layout space prevents CLS.
  if (auth === "loading") {
    return (
      <div aria-busy="true" className="opacity-0">
        {children}
      </div>
    );
  }

  if (auth === "authed") {
    return <>{children}</>;
  }

  // Guest — render the report with only a light 2.3px blur so images and text
  // stay readable (a teaser the visitor can actually see), kept non-interactive.
  const next = `/report/${vin}`;

  return (
    <>
      <div
        aria-hidden="true"
        className="blur-[2.3px] pointer-events-none select-none"
      >
        {children}
      </div>

      {/* Light scrim so the blurred report stays visible behind the popup.
          Mobile: docked to the bottom as a sheet (items-end), so the top of
          the report peeks above. Desktop: centered card (sm:items-center). */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="report-gate-title"
        className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center px-0 py-0 sm:px-4 sm:py-8 bg-slate-900/30"
      >
        <div className="relative w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl p-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))] sm:p-8 sm:pb-8 max-h-[48vh] sm:max-h-none overflow-y-auto sm:overflow-visible">
          {/* Grab handle (mobile sheet affordance) */}
          <div className="sm:hidden mx-auto mb-3 h-1 w-10 rounded-full bg-slate-300" />

          {/* Brand */}
          <div className="flex justify-center mb-2.5 sm:mb-4">
            <Logo variant="onLight" size="sm" />
          </div>

          <h2
            id="report-gate-title"
            className="text-xl sm:text-[1.6rem] font-headline font-extrabold text-slate-900 text-center leading-tight tracking-tight mb-1.5 sm:mb-2"
          >
            {mode === "signup"
              ? "Sign up to view & download"
              : "Log in to view your report"}
          </h2>
          <p className="text-[13px] sm:text-sm text-slate-700 text-center mb-4 sm:mb-5">
            {mode === "signup" ? "Unlock the full report for " : "Continue to your report for "}
            <span className="font-mono font-semibold text-slate-900">{vin}</span>
            {mode === "signup"
              ? " — view all specs, recalls, market values, and download a PDF copy."
              : "."}
          </p>

          {/* Tabs */}
          <div
            role="tablist"
            aria-label="Authentication mode"
            className="flex bg-slate-100 rounded-full p-1 mb-4 sm:mb-5"
          >
            <button
              type="button"
              role="tab"
              aria-selected={mode === "signup"}
              onClick={() => setMode("signup")}
              className={`flex-1 px-4 py-2 text-sm font-semibold rounded-full transition-all cursor-pointer ${
                mode === "signup"
                  ? "bg-white text-primary-700 shadow-sm"
                  : "text-slate-700 hover:text-slate-900"
              }`}
            >
              Sign up
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mode === "login"}
              onClick={() => setMode("login")}
              className={`flex-1 px-4 py-2 text-sm font-semibold rounded-full transition-all cursor-pointer ${
                mode === "login"
                  ? "bg-white text-primary-700 shadow-sm"
                  : "text-slate-700 hover:text-slate-900"
              }`}
            >
              Log in
            </button>
          </div>

          {/* Inline auth — instant: signInWithPassword / signUp run on the
              same Supabase client; the parent's onAuthStateChange listener
              drops the gate the moment a session exists. */}
          <AuthForm mode={mode} next={next} compact />

          {/* Quick reassurance row */}
          <div className="mt-4 sm:mt-5 flex items-center justify-center gap-3 sm:gap-4 text-[10px] sm:text-[11px] font-semibold text-slate-600 uppercase tracking-wider sm:tracking-widest">
            <span className="inline-flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-primary-600" /> Full report
            </span>
            <span className="text-slate-300">•</span>
            <span className="inline-flex items-center gap-1.5">
              <Download className="w-3.5 h-3.5 text-primary-600" /> PDF download
            </span>
            <span className="text-slate-300">•</span>
            <span className="inline-flex items-center gap-1.5">
              No credit card
            </span>
          </div>

          <div className="mt-4 pt-3 sm:mt-5 sm:pt-4 border-t border-slate-200 text-center">
            <Link
              href="/"
              className="text-xs text-slate-500 hover:text-slate-700 transition-colors"
            >
              ← Back to home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
