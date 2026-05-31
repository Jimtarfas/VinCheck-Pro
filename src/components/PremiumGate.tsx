"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import Link from "next/link";
import { Download, FileText, Lock } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import Logo from "./Logo";
import AuthForm from "./AuthForm";

type AuthStatus = "loading" | "authed" | "guest";

interface GateContextValue {
  status: AuthStatus;
  /** Opens the dismissible signup modal. No-op when already authed. */
  openSignup: () => void;
}

/**
 * Default fails OPEN — if a LockedCard is rendered without a provider
 * (or before hydration), it shows its children rather than hiding value.
 */
const GateContext = createContext<GateContextValue>({
  status: "authed",
  openSignup: () => {},
});

export function usePremiumGate() {
  return useContext(GateContext);
}

/**
 * AuthGateProvider
 * ---------------------------------------------------------------
 * Teaser-first replacement for the old full-page ReportGate.
 *
 * Free decode content renders fully and stays scrollable. Premium
 * sections wrap in <LockedCard>, which blurs them for guests and
 * shows an inline unlock CTA. The signup modal is DISMISSIBLE and
 * only opens on demand (clicking an unlock CTA or the gated download
 * button) — so visitors can read the free report before deciding.
 *
 * Auth detection mirrors ReportGate: unconfigured Supabase env →
 * treat as authed (never brick the page); onAuthStateChange drops
 * the locks live the moment a session exists.
 */
export function AuthGateProvider({
  vin,
  children,
}: {
  vin: string;
  children: React.ReactNode;
}) {
  const [status, setStatus] = useState<AuthStatus>("loading");
  const [modalOpen, setModalOpen] = useState(false);
  const [mode, setMode] = useState<"signup" | "login">("signup");

  useEffect(() => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
    if (!supabaseUrl || !supabaseKey) {
      setStatus("authed");
      return;
    }

    let mounted = true;
    const supabase = createClient();

    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!mounted) return;
      setStatus(user ? "authed" : "guest");
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;
      const authed = !!session?.user;
      setStatus(authed ? "authed" : "guest");
      // Close the modal automatically once they're in.
      if (authed) setModalOpen(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const openSignup = useCallback(() => {
    setStatus((s) => {
      if (s !== "authed") setModalOpen(true);
      return s;
    });
  }, []);

  // Lock body scroll only while the modal is actually open.
  useEffect(() => {
    if (!modalOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [modalOpen]);

  const value = useMemo<GateContextValue>(
    () => ({ status, openSignup }),
    [status, openSignup],
  );

  const next = `/report/${vin}`;

  return (
    <GateContext.Provider value={value}>
      {children}

      {modalOpen && status === "guest" && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="premium-gate-title"
          className="fixed inset-0 z-[100] flex items-start sm:items-center justify-center px-4 py-6 sm:py-8 bg-slate-900/70 backdrop-blur-sm overflow-y-auto"
          onClick={(e) => {
            // Click on the scrim (not the card) dismisses.
            if (e.target === e.currentTarget) setModalOpen(false);
          }}
        >
          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 sm:p-8 my-auto">
            {/* Dismiss */}
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              aria-label="Close"
              className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer text-lg leading-none"
            >
              ✕
            </button>

            <div className="flex justify-center mb-4">
              <Logo variant="onLight" size="sm" />
            </div>

            <h2
              id="premium-gate-title"
              className="text-2xl sm:text-[1.6rem] font-headline font-extrabold text-slate-900 text-center leading-tight tracking-tight mb-2"
            >
              {mode === "signup"
                ? "Unlock valuation & market data"
                : "Log in to unlock"}
            </h2>
            <p className="text-sm text-slate-700 text-center mb-5">
              {mode === "signup"
                ? "Create a free account to reveal pricing, market analysis, AI insights, and download a PDF copy of "
                : "Continue to the full report for "}
              <span className="font-mono font-semibold text-slate-900">{vin}</span>.
            </p>

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

            <AuthForm mode={mode} next={next} compact />

            <div className="mt-5 flex items-center justify-center gap-4 text-[11px] font-semibold text-slate-600 uppercase tracking-widest">
              <span className="inline-flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-primary-600" /> Full report
              </span>
              <span className="text-slate-300">•</span>
              <span className="inline-flex items-center gap-1.5">
                <Download className="w-3.5 h-3.5 text-primary-600" /> PDF download
              </span>
              <span className="text-slate-300">•</span>
              <span className="inline-flex items-center gap-1.5">No credit card</span>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-200 text-center">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="text-xs text-slate-500 hover:text-slate-700 transition-colors cursor-pointer"
              >
                Maybe later — keep reading
              </button>
            </div>
          </div>
        </div>
      )}
    </GateContext.Provider>
  );
}

/**
 * LockedCard
 * ---------------------------------------------------------------
 * Wraps a premium section. Renders children clear when authed (or
 * while auth is still loading, to avoid a flash of locked state on
 * the happy path), and blurred + non-interactive with an inline
 * unlock overlay when the visitor is a guest.
 *
 * `label` names what's behind the lock (e.g. "Valuation").
 */
export function LockedCard({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  const { status, openSignup } = usePremiumGate();

  if (status !== "guest") {
    return <>{children}</>;
  }

  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="filter blur-md pointer-events-none select-none"
      >
        {children}
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-[2rem] bg-white/40 backdrop-blur-[2px] p-6 text-center">
        <div className="w-11 h-11 rounded-full bg-primary-600 text-white flex items-center justify-center shadow-lg">
          <Lock className="w-5 h-5" />
        </div>
        <p className="text-sm font-bold text-slate-900">{label} is locked</p>
        <button
          type="button"
          onClick={openSignup}
          className="px-5 py-2.5 rounded-full bg-primary-600 text-white text-sm font-bold hover:bg-primary-700 transition-colors cursor-pointer shadow-sm"
        >
          Unlock free
        </button>
        <Link
          href="/"
          className="text-[11px] text-slate-500 hover:text-slate-700 transition-colors"
        >
          No credit card required
        </Link>
      </div>
    </div>
  );
}
