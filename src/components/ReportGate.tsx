"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Lock, ChevronRight, Check } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import Logo from "./Logo";

type AuthState = "loading" | "authed" | "guest";

/**
 * ReportGate
 * ---------------------------------------------------------------
 * Gates the full VIN report behind a Supabase signup. Guests see
 * the report blurred behind a non-dismissible modal that pushes
 * them to /signup or /login (with ?next=/report/{vin} so they
 * land back on this report immediately after authentication).
 *
 * Signed-in users see no overlay — the report renders normally.
 *
 * If Supabase env vars aren't configured we fall back to "authed"
 * so the report stays visible (don't block production behind a
 * misconfigured auth backend).
 */
export default function ReportGate({
  vin,
  children,
}: {
  vin: string;
  children: React.ReactNode;
}) {
  const [auth, setAuth] = useState<AuthState>("loading");

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

    // If the user signs in/up in another tab, drop the gate live.
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
  const next = encodeURIComponent(`/report/${vin}`);

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
        className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-8 bg-slate-900/70 backdrop-blur-sm overflow-y-auto"
      >
        <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-7 sm:p-9">
          {/* Brand */}
          <div className="flex justify-center mb-5">
            <Logo variant="onLight" size="sm" />
          </div>

          <div className="flex justify-center mb-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 border border-primary-100 text-xs font-bold text-primary-700 uppercase tracking-widest">
              <Lock className="w-3 h-3" /> Free account required
            </span>
          </div>

          <h2
            id="report-gate-title"
            className="text-2xl sm:text-3xl font-headline font-extrabold text-slate-900 text-center leading-tight tracking-tight mb-2"
          >
            Sign up to view your report
          </h2>
          <p className="text-sm text-slate-700 text-center mb-6">
            Create a free account to unlock the full vehicle history for{" "}
            <span className="font-mono font-semibold text-slate-900">{vin}</span>{" "}
            — including specs, market values, photos, and recalls.
          </p>

          <ul className="space-y-2.5 mb-7">
            {[
              "Full vehicle history & specs",
              "Real listing photos & market values",
              "Save reports to your dashboard",
              "100% free — no credit card",
            ].map((line) => (
              <li
                key={line}
                className="flex items-start gap-2.5 text-sm text-slate-700"
              >
                <Check className="w-4 h-4 mt-0.5 text-emerald-500 flex-shrink-0" />
                {line}
              </li>
            ))}
          </ul>

          <Link
            href={`/signup?next=${next}`}
            className="group flex items-center justify-center gap-1.5 w-full px-5 py-3 text-sm font-bold text-white bg-primary-600 rounded-full hover:bg-primary-700 transition-all shadow-md shadow-primary/20"
          >
            Create free account
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>

          <p className="text-center text-sm text-slate-700 mt-4">
            Already have an account?{" "}
            <Link
              href={`/login?next=${next}`}
              className="text-primary-600 font-semibold hover:text-primary-700"
            >
              Log in
            </Link>
          </p>

          <div className="mt-6 pt-5 border-t border-slate-200 text-center">
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

