"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Lock, Download, FileText } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import Logo from "./Logo";
import AuthForm from "./AuthForm";

type AuthState = "loading" | "authed" | "guest";

/**
 * ReportGate
 * ---------------------------------------------------------------
 * Gates the full VIN report behind Supabase auth. Guests see the
 * report blurred behind a non-dismissible modal that contains an
 * inline signup/login form (<AuthForm compact>). They can complete
 * the entire flow without ever leaving the report URL — the moment
 * Supabase emits an auth state change the gate drops live.
 *
 * The modal also exposes a tab toggle between "Sign up" (default,
 * since this is a conversion gate) and "Log in" for returning users.
 *
 * Signed-in users see no overlay — the report renders normally.
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
    // triggers this listener, so the modal disappears without a redirect.
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

  // Lock body scroll while the gate is up so the modal feels modal.
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

  // Guest — render report blurred + non-interactive behind a fullscreen scrim.
  const next = `/report/${vin}`;

  return (
    <>
      <div
        aria-hidden="true"
        className="filter blur-md pointer-events-none select-none"
      >
        {children}
      </div>

      {/* Fullscreen scrim + centered card */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="report-gate-title"
        className="fixed inset-0 z-[100] flex items-start sm:items-center justify-center px-4 py-6 sm:py-8 bg-slate-900/70 backdrop-blur-sm overflow-y-auto"
      >
        <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 sm:p-8 my-auto">
          {/* Brand */}
          <div className="flex justify-center mb-4">
            <Logo variant="onLight" size="sm" />
          </div>

          <div className="flex justify-center mb-3">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 border border-primary-100 text-xs font-bold text-primary-700 uppercase tracking-widest">
              <Lock className="w-3 h-3" /> Free account required
            </span>
          </div>

          <h2
            id="report-gate-title"
            className="text-2xl sm:text-[1.6rem] font-headline font-extrabold text-slate-900 text-center leading-tight tracking-tight mb-2"
          >
            {mode === "signup"
              ? "Sign up to view & download"
              : "Log in to view your report"}
          </h2>
          <p className="text-sm text-slate-700 text-center mb-5">
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
            className="flex bg-slate-100 rounded-full p-1 mb-5"
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
          <div className="mt-5 flex items-center justify-center gap-4 text-[11px] font-semibold text-slate-600 uppercase tracking-widest">
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

          <div className="mt-5 pt-4 border-t border-slate-200 text-center">
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
