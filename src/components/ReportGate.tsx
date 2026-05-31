"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Download, FileText, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { VinData } from "@/lib/api";
import Logo from "./Logo";
import AuthForm from "./AuthForm";
import ReportTeaser from "./ReportTeaser";

type AuthState = "loading" | "authed" | "guest";

/**
 * ReportGate
 * ---------------------------------------------------------------
 * Two-stage, intent-based gate that replaces the old blur-everything
 * wall (which bounced users the instant the page loaded).
 *
 *   1. Guests first see a fully-visible <ReportTeaser>: photos, the
 *      vehicle name + VIN + key specs, and an honest "What we found
 *      for this VIN" counts grid. Nothing is blurred — they get real
 *      value and build curiosity before any ask.
 *   2. Only when they click "View Full Report — Free" do we surface
 *      the signup/login popup. It's dismissible (X / backdrop /
 *      Esc) so the teaser never feels like a trap — closing just
 *      returns them to the teaser instead of bouncing the tab.
 *
 * The moment Supabase emits an auth state change the gate drops and
 * the full report (children) renders in place — no redirect.
 *
 * If Supabase env vars aren't configured we fall back to "authed"
 * so the report stays visible (a misconfigured auth backend should
 * never brick the report page).
 */
export default function ReportGate({
  vin,
  data,
  children,
}: {
  vin: string;
  data: VinData;
  children: React.ReactNode;
}) {
  const [auth, setAuth] = useState<AuthState>("loading");
  const [mode, setMode] = useState<"signup" | "login">("signup");
  const [showAuth, setShowAuth] = useState(false);

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

  // Lock body scroll only while the signup popup is open. The teaser itself
  // scrolls freely — we only trap scroll for the modal.
  useEffect(() => {
    if (!showAuth || auth !== "guest") return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [showAuth, auth]);

  // Close the popup on Escape.
  useEffect(() => {
    if (!showAuth) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowAuth(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showAuth]);

  // While we're checking auth, render an invisible teaser to reserve layout
  // space and avoid a flash of either the teaser (for signed-in users) or
  // the full report (for guests).
  if (auth === "loading") {
    return (
      <div aria-busy="true" className="opacity-0">
        <ReportTeaser data={data} onUnlock={() => {}} />
      </div>
    );
  }

  if (auth === "authed") {
    return <>{children}</>;
  }

  // Guest — show the free teaser. The full report (children) is NOT rendered
  // until they have a session, so it can't be peeked via devtools either.
  const next = `/report/${vin}`;

  return (
    <>
      <ReportTeaser data={data} onUnlock={() => setShowAuth(true)} />

      {showAuth && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="report-gate-title"
          className="fixed inset-0 z-[100] flex items-start sm:items-center justify-center px-4 py-6 sm:py-8 overflow-y-auto bg-slate-900/60 backdrop-blur-sm"
          onClick={(e) => {
            // Backdrop click closes; clicks inside the card don't bubble here.
            if (e.target === e.currentTarget) setShowAuth(false);
          }}
        >
          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 sm:p-8 my-auto">
            {/* Dismiss */}
            <button
              type="button"
              onClick={() => setShowAuth(false)}
              aria-label="Close"
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Brand */}
            <div className="flex justify-center mb-4">
              <Logo variant="onLight" size="sm" />
            </div>

            <h2
              id="report-gate-title"
              className="text-2xl sm:text-[1.6rem] font-headline font-extrabold text-slate-900 text-center leading-tight tracking-tight mb-2"
            >
              {mode === "signup"
                ? "Create your free account"
                : "Log in to view your report"}
            </h2>
            <p className="text-sm text-slate-700 text-center mb-5">
              {mode === "signup" ? "Unlock the full report for " : "Continue to your report for "}
              <span className="font-mono font-semibold text-slate-900">{vin}</span>
              {mode === "signup"
                ? " — all specs, market values, options, and a downloadable PDF."
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
      )}
    </>
  );
}
