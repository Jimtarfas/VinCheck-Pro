"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Search,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Lock,
  X,
  Copy,
  CheckCheck,
  ArrowRight,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import AuthForm from "@/components/AuthForm";
import { states } from "@/lib/states";

interface LookupResult {
  ok: boolean;
  vin?: string;
  year?: number;
  make?: string;
  model?: string;
  error?: string;
  message?: string;
}

interface DecodedVehicle {
  year?: number;
  make?: string;
  model?: string;
  trim?: string;
  bodyStyle?: string;
  engine?: { name?: string };
  transmission?: { name?: string };
  drivenWheels?: string;
}

type AuthState = "loading" | "authed" | "guest";

export default function LicensePlateLookup() {
  const [plate, setPlate] = useState("");
  const [state, setState] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<LookupResult | null>(null);
  const [decoded, setDecoded] = useState<DecodedVehicle | null>(null);
  const [decoding, setDecoding] = useState(false);
  const [copied, setCopied] = useState(false);

  // Auth gate (mirrors the Window Sticker pattern)
  const [auth, setAuth] = useState<AuthState>("loading");
  const [showAuthModal, setShowAuthModal] = useState(false);
  const pendingSubmitRef = useRef(false);

  // 1) Subscribe to auth changes.
  useEffect(() => {
    const supabase = createClient();
    let mounted = true;

    supabase.auth.getUser().then(({ data }) => {
      if (!mounted) return;
      setAuth(data.user ? "authed" : "guest");
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;
      setAuth(session?.user ? "authed" : "guest");
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  // 2) When the user finishes auth, fire any queued submit.
  useEffect(() => {
    if (auth === "authed" && pendingSubmitRef.current) {
      pendingSubmitRef.current = false;
      setShowAuthModal(false);
      void runLookup();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  function validate(): string | null {
    const cleanedPlate = plate.toUpperCase().replace(/[^A-Z0-9]/g, "");
    if (cleanedPlate.length < 2) return "Enter a plate number.";
    if (cleanedPlate.length > 8) return "Plates are at most 8 characters.";
    if (!state) return "Select the issuing state.";
    return null;
  }

  async function runLookup() {
    const err = validate();
    if (err) {
      setResult({ ok: false, error: "client", message: err });
      return;
    }

    setLoading(true);
    setResult(null);
    setDecoded(null);

    try {
      const cleanedPlate = plate.toUpperCase().replace(/[^A-Z0-9]/g, "");
      const res = await fetch("/api/plate-to-vin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plate: cleanedPlate, state }),
      });
      const data = (await res.json()) as LookupResult;

      // 401 from the API means the server-side cookie session expired
      // between auth check and submit — re-open the modal.
      if (res.status === 401) {
        pendingSubmitRef.current = true;
        setShowAuthModal(true);
        setResult(null);
        setLoading(false);
        return;
      }

      setResult(data);

      // Auto-decode the VIN we got back.
      if (data.ok && data.vin) {
        setDecoding(true);
        try {
          const dec = await fetch(`/api/vin/${data.vin}`);
          if (dec.ok) {
            const vehicle = (await dec.json()) as DecodedVehicle;
            setDecoded(vehicle);
          }
        } finally {
          setDecoding(false);
        }
      }
    } catch (e) {
      setResult({
        ok: false,
        error: "network",
        message: e instanceof Error ? e.message : "Network error.",
      });
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const err = validate();
    if (err) {
      setResult({ ok: false, error: "client", message: err });
      return;
    }

    if (auth === "loading") return;
    if (auth === "guest") {
      pendingSubmitRef.current = true;
      setShowAuthModal(true);
      return;
    }
    void runLookup();
  }

  async function copyVin() {
    if (!result?.vin) return;
    try {
      await navigator.clipboard.writeText(result.vin);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // ignore
    }
  }

  return (
    <>
      {/* ---------- The interactive search card ---------- */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5 sm:p-7">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_180px] gap-3">
            <div>
              <label
                htmlFor="plate"
                className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5"
              >
                License Plate Number
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  id="plate"
                  type="text"
                  value={plate}
                  onChange={(e) => setPlate(e.target.value.toUpperCase())}
                  maxLength={10}
                  placeholder="e.g. 7ABC123"
                  autoComplete="off"
                  className="w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl text-base font-mono uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="state"
                className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5"
              >
                State
              </label>
              <select
                id="state"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full px-3 py-3 border border-slate-200 rounded-xl text-base bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">Select state…</option>
                {states.map((s) => (
                  <option key={s.abbr} value={s.abbr}>
                    {s.name} ({s.abbr})
                  </option>
                ))}
                <option value="DC">District of Columbia (DC)</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || auth === "loading"}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-primary-600 hover:bg-primary-700 text-white text-sm font-bold rounded-xl transition-colors cursor-pointer disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Looking up VIN…
              </>
            ) : auth === "guest" ? (
              <>
                <Lock className="w-4 h-4" />
                Sign Up to Look Up Plate
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                Look Up VIN by Plate
              </>
            )}
          </button>

          <p className="text-xs text-slate-500 text-center">
            Free for personal pre-purchase use. Plate data is governed by the federal{" "}
            <abbr title="Driver's Privacy Protection Act">DPPA</abbr>.
          </p>
        </form>

        {/* ---------- Result panel ---------- */}
        {result && !result.ok && (
          <div className="mt-5 flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-amber-900">
                {result.error === "service-unavailable"
                  ? "Plate lookup is being onboarded"
                  : result.error === "no-match"
                  ? "No match found"
                  : "Couldn't complete that lookup"}
              </p>
              <p className="text-sm text-amber-800 mt-0.5">
                {result.message || "Please try again or search by VIN instead."}
              </p>
              <Link
                href="/vin-check"
                className="inline-flex items-center gap-1 mt-2 text-sm font-bold text-amber-900 hover:text-amber-950"
              >
                Search by VIN instead <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}

        {result?.ok && result.vin && (
          <div className="mt-5 p-5 bg-emerald-50 border border-emerald-200 rounded-xl">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-emerald-700 uppercase tracking-wide">
                  VIN Found
                </p>
                <div className="flex items-center gap-2 mt-1.5">
                  <code className="text-lg font-mono font-bold text-slate-900 tracking-wider break-all">
                    {result.vin}
                  </code>
                  <button
                    type="button"
                    onClick={copyVin}
                    className="flex-shrink-0 inline-flex items-center gap-1 px-2 py-1 text-[11px] font-bold text-emerald-700 hover:text-emerald-900 bg-white border border-emerald-200 rounded-md cursor-pointer transition-colors"
                  >
                    {copied ? (
                      <>
                        <CheckCheck className="w-3 h-3" /> Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" /> Copy
                      </>
                    )}
                  </button>
                </div>

                {decoding && (
                  <p className="mt-3 text-xs text-emerald-700 inline-flex items-center gap-1.5">
                    <Loader2 className="w-3 h-3 animate-spin" /> Decoding vehicle…
                  </p>
                )}

                {decoded && (
                  <dl className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    {[
                      ["Year", decoded.year?.toString()],
                      ["Make", decoded.make],
                      ["Model", decoded.model],
                      ["Trim", decoded.trim],
                      ["Body", decoded.bodyStyle],
                      ["Engine", decoded.engine?.name],
                      ["Trans", decoded.transmission?.name],
                      ["Drive", decoded.drivenWheels],
                    ]
                      .filter(([, v]) => v)
                      .map(([k, v]) => (
                        <div key={k} className="bg-white rounded-lg p-2.5 border border-emerald-100">
                          <dt className="text-[10px] font-bold uppercase tracking-wide text-slate-500">
                            {k}
                          </dt>
                          <dd className="mt-0.5 text-sm font-semibold text-slate-900 truncate">
                            {v}
                          </dd>
                        </div>
                      ))}
                  </dl>
                )}

                <Link
                  href={`/report/${result.vin}`}
                  className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-lg transition-colors"
                >
                  See Full Vehicle History Report{" "}
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ---------- Auth gate modal ---------- */}
      {showAuthModal && (
        <AuthGateModal onClose={() => setShowAuthModal(false)} />
      )}
    </>
  );
}

function AuthGateModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
        <div className="p-6 pb-3">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary-50 text-primary-600 mb-3">
            <Lock className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-slate-900">
            Sign up to look up the VIN
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Free account. Takes 10 seconds. We use it to prevent automated abuse
            of the plate-lookup database (a federal DPPA requirement).
          </p>
        </div>
        <div className="px-6 pb-6">
          <AuthForm mode="signup" compact />
        </div>
      </div>
    </div>
  );
}
