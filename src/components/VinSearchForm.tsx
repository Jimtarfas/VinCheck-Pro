"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Loader2, ArrowRight } from "lucide-react";

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
    <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto lg:mx-0">
      <div className={`flex flex-col sm:flex-row gap-2 ${isLg ? "p-1.5 bg-white rounded-2xl shadow-xl shadow-slate-900/5 border border-slate-200" : ""}`}>
        <div className="relative flex-1">
          <Search className={`absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 ${isLg ? "w-5 h-5" : "w-4 h-4"}`} />
          <input
            type="text"
            value={vin}
            onChange={(e) => { setVin(e.target.value.toUpperCase()); setError(""); }}
            placeholder="Enter 17-character VIN"
            maxLength={17}
            className={`w-full pl-11 pr-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 transition-all font-mono tracking-wide ${isLg ? "py-3.5 text-base" : "py-3 text-sm"}`}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`flex items-center justify-center gap-2 font-semibold text-white bg-primary-600 rounded-xl hover:bg-primary-700 active:scale-[0.98] transition-all disabled:opacity-60 cursor-pointer shadow-md shadow-primary-600/20 ${isLg ? "px-6 py-3.5 text-base" : "px-5 py-3 text-sm"}`}
        >
          {loading ? <><Loader2 className="w-5 h-5 animate-spin" />Checking...</> : <>Check VIN <ArrowRight className="w-4 h-4" /></>}
        </button>
      </div>
      {error && <p className="mt-2 text-sm text-red-500 text-center lg:text-left">{error}</p>}
      <p className="mt-2 text-xs text-slate-400 text-center lg:text-left">
        Find the VIN on your dashboard, door frame, or registration document.
      </p>
    </form>
  );
}
