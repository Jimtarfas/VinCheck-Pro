"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Loader2 } from "lucide-react";

export default function VinSearchForm({ size = "lg" }: { size?: "lg" | "sm" }) {
  const [vin, setVin] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = vin.trim().toUpperCase();
    if (cleaned.length !== 17) { setError("A valid VIN must be exactly 17 characters."); return; }
    if (/[IOQ]/i.test(cleaned)) { setError("VINs cannot contain I, O, or Q characters."); return; }
    setError("");
    setLoading(true);
    router.push(`/report/${cleaned}`);
  };

  const isLg = size === "lg";

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl">
      {/* Pill-shaped search bar — Stitch "High-Contrast Search Bar" */}
      <div className={`relative flex items-center gap-2 bg-surface-container-lowest rounded-full shadow-2xl shadow-primary/5 ring-1 ring-outline-variant/15 ${isLg ? "p-2" : "p-1.5"}`}>
        <div className="pl-5 flex items-center gap-3 flex-1">
          <Search className={`flex-shrink-0 text-outline/60 ${isLg ? "w-5 h-5" : "w-4 h-4"}`} />
          <input
            type="text"
            value={vin}
            onChange={(e) => { setVin(e.target.value.toUpperCase()); setError(""); }}
            placeholder="Enter 17-digit VIN Number"
            maxLength={17}
            className={`w-full bg-transparent border-none outline-none text-on-surface placeholder:text-outline/50 uppercase tracking-widest font-mono font-medium ${isLg ? "text-base py-2" : "text-sm py-1.5"}`}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`flex-shrink-0 flex items-center justify-center gap-2 bg-secondary-container text-on-secondary-container font-headline font-extrabold rounded-full transition-all hover:scale-105 hover:shadow-lg hover:shadow-secondary-container/20 active:scale-95 disabled:opacity-60 cursor-pointer ${isLg ? "px-8 py-4 text-base" : "px-6 py-3 text-sm"}`}
        >
          {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Checking…</> : "Check VIN"}
        </button>
      </div>

      {error && (
        <p className="mt-3 text-sm text-error text-center font-medium">{error}</p>
      )}

      {isLg && (
        <div className="mt-4 flex items-center gap-6 text-xs font-semibold text-on-surface-variant/60 uppercase tracking-widest">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            100% Secure
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary-container" />
            Instant Results
          </span>
        </div>
      )}
    </form>
  );
}
