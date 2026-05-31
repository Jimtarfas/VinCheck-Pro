"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Download, FileText, X, Lock, ChevronRight, Camera, BarChart3,
  DollarSign, ListChecks, ShieldCheck,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { VinData } from "@/lib/api";
import Logo from "./Logo";
import AuthForm from "./AuthForm";

type AuthState = "loading" | "authed" | "guest";

/**
 * ReportGate
 * ---------------------------------------------------------------
 * Intent-based paywall tease. Guests see the *real* full report
 * rendered behind a frosted "fade-to-blur" veil:
 *
 *   • The hero + photo gallery + first specs stay sharp (a mask
 *     gradient keeps the top ~55vh un-blurred) so the visitor can
 *     confirm we found their exact vehicle and see there's real
 *     data here — the thing that builds trust and curiosity.
 *   • Everything below fades into a glassy blur, with a floating
 *     "View Full Report — Free" unlock card that tracks scroll over
 *     the locked content and shows honest counts of what's inside.
 *
 * Clicking the CTA opens a dismissible signup/login popup (X /
 * backdrop / Esc). The moment Supabase confirms a session the veil
 * drops and the full report renders interactively — no redirect.
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

  // Lock body scroll only while the signup popup is open. The blurred report
  // itself scrolls freely so the floating unlock card can track the content.
  useEffect(() => {
    if (!showAuth) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [showAuth]);

  // Close the popup on Escape.
  useEffect(() => {
    if (!showAuth) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowAuth(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showAuth]);

  // While we're checking auth, render the report invisible to reserve layout
  // space and avoid a flash of either the veil (for signed-in users) or the
  // sharp report (for guests).
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

  // ── Guest — real report behind a fade-to-blur veil ──
  const next = `/report/${vin}`;

  // Honest, data-derived counts surfaced on the unlock card.
  const photoCount = data.photos?.length ?? 0;
  const listingCount = data.marketData?.totalListings ?? 0;
  const pricePoints = data.price
    ? [
        data.price.baseMsrp,
        data.price.baseInvoice,
        data.price.usedTmvRetail,
        data.price.usedTradeIn,
        data.price.usedPrivateParty,
      ].filter((p) => (p ?? 0) > 0).length
    : 0;
  const optionCount = data.options?.reduce((a, c) => a + c.options.length, 0) ?? 0;

  const chips = [
    { icon: Camera, label: photoCount > 0 ? `${photoCount} photos` : "Photos", show: true },
    { icon: BarChart3, label: listingCount > 0 ? `${listingCount} listings` : "Market data", show: !!data.marketData },
    { icon: DollarSign, label: pricePoints > 0 ? `${pricePoints} price points` : "Valuation", show: pricePoints > 0 },
    { icon: ListChecks, label: optionCount > 0 ? `${optionCount} options` : "Full specs", show: true },
  ].filter((c) => c.show);

  // Mask gradient: fully transparent (sharp) for the first 55vh, then ramps
  // into the blur by ~85vh and stays blurred to the bottom of the report.
  const mask =
    "linear-gradient(to bottom, transparent 0, transparent 55vh, rgba(0,0,0,0.92) 85vh, #000 100vh)";

  return (
    <>
      <div className="relative">
        {/* Real report — non-interactive while gated. */}
        <div aria-hidden="true" className="pointer-events-none select-none">
          {children}
        </div>

        {/* Frosted veil: blurs everything below the sharp zone. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 backdrop-blur-[7px] pointer-events-none"
          style={{
            WebkitMaskImage: mask,
            maskImage: mask,
            background:
              "linear-gradient(to bottom, transparent 50vh, rgba(248,250,252,0.45) 80vh, rgba(248,250,252,0.82) 110vh)",
          }}
        />

        {/* Floating unlock card — tracks scroll over the locked content.
            NOTE: the sticky element must NOT be a flex child (flex alignment
            breaks position: sticky), so we center it with mx-auto and push it
            into the blur zone with a top margin instead of a flex wrapper. */}
        <div className="absolute inset-0 px-4 pointer-events-none">
          <div className="sticky top-[26vh] mt-[52vh] mx-auto h-fit w-full max-w-md pointer-events-auto">
            <div className="relative rounded-3xl bg-white/95 backdrop-blur-xl shadow-2xl ring-1 ring-slate-900/5 p-6 sm:p-7 text-center">
              {/* Lock badge */}
              <div className="flex justify-center -mt-12 mb-3">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg text-on-secondary-container"
                  style={{ background: "var(--color-secondary-container)" }}
                >
                  <Lock className="w-7 h-7" />
                </div>
              </div>

              <h2 className="font-headline font-extrabold text-xl sm:text-2xl text-slate-900 tracking-tight leading-tight">
                Your full report is ready
              </h2>
              <p className="text-sm text-slate-600 mt-1.5">
                Create a free account to unlock everything we found for
                {" "}
                <span className="font-mono font-semibold text-slate-800">{vin}</span>.
              </p>

              {/* Honest count chips */}
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                {chips.map(({ icon: Icon, label }) => (
                  <span
                    key={label}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 text-xs font-semibold text-slate-700"
                  >
                    <Icon className="w-3.5 h-3.5 text-primary-600" />
                    {label}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <button
                onClick={() => setShowAuth(true)}
                className="group mt-5 w-full flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl text-base sm:text-lg font-extrabold text-on-secondary-container shadow-lg hover:brightness-110 transition cursor-pointer"
                style={{ background: "var(--color-secondary-container)" }}
              >
                <Lock className="w-5 h-5" />
                View Full Report — Free
                <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <p className="mt-3 flex items-center justify-center gap-2 text-[11px] font-semibold text-slate-500 uppercase tracking-widest flex-wrap">
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-primary-600" /> No credit card
                </span>
                <span className="text-slate-300">•</span>
                <span>Free account</span>
                <span className="text-slate-300">•</span>
                <span>Instant access</span>
              </p>

              <p className="mt-4 text-xs text-slate-500">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setMode("login");
                    setShowAuth(true);
                  }}
                  className="font-semibold text-primary-700 hover:text-primary-800 cursor-pointer"
                >
                  Log in
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>

      {showAuth && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="report-gate-title"
          className="fixed inset-0 z-[100] flex items-start sm:items-center justify-center px-4 py-6 sm:py-8 overflow-y-auto bg-slate-900/60 backdrop-blur-sm"
          onClick={(e) => {
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
