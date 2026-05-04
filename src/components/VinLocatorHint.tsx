"use client";

import { useState } from "react";
import { ChevronDown, LayoutDashboard, DoorOpen, FileText } from "lucide-react";

const locations = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    desc: "Driver's side, visible through the windshield at the base",
    color: "bg-primary-50 text-primary-700",
  },
  {
    icon: DoorOpen,
    label: "Driver's Door Jamb",
    desc: "Inside the door frame — look for the white sticker near the latch",
    color: "bg-amber-50 text-amber-700",
  },
  {
    icon: FileText,
    label: "Documents",
    desc: "On your registration, title, or insurance card",
    color: "bg-emerald-50 text-emerald-700",
  },
];

export default function VinLocatorHint() {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-4 max-w-2xl">
      {/* Toggle pill */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="group inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-primary transition-colors cursor-pointer select-none"
      >
        <span className="w-4 h-4 rounded-full bg-slate-200 group-hover:bg-primary/10 flex items-center justify-center transition-colors">
          <span className="text-[9px] font-black text-slate-400 group-hover:text-primary leading-none">?</span>
        </span>
        Where do I find my VIN?
        <ChevronDown
          className={`w-3.5 h-3.5 text-slate-400 group-hover:text-primary transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Expandable card */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-[500px] opacity-100 mt-3" : "max-h-0 opacity-0 mt-0"
        }`}
      >
        <div className="bg-white border border-slate-200/80 rounded-2xl shadow-lg shadow-slate-900/5 p-5">
          {/* Header */}
          <div className="flex items-start gap-3 mb-4 pb-4 border-b border-slate-100">
            {/* Mini car illustration */}
            <div className="flex-shrink-0 w-28 h-20 bg-slate-100 rounded-xl overflow-hidden relative hidden sm:block">
              {/* Simple SVG car side view */}
              <svg viewBox="0 0 120 80" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Body */}
                <rect x="8" y="38" width="104" height="22" rx="4" fill="#CBD5E1"/>
                {/* Cabin */}
                <path d="M28 38 C32 22 42 18 62 18 C82 18 88 22 92 38Z" fill="#94A3B8"/>
                {/* Windshield */}
                <path d="M34 38 C37 26 44 21 62 21 C72 21 80 25 86 38Z" fill="#BAE6FD" opacity="0.8"/>
                {/* Wheels */}
                <circle cx="32" cy="60" r="10" fill="#475569"/>
                <circle cx="32" cy="60" r="5" fill="#CBD5E1"/>
                <circle cx="88" cy="60" r="10" fill="#475569"/>
                <circle cx="88" cy="60" r="5" fill="#CBD5E1"/>
                {/* VIN dot — dashboard */}
                <circle cx="52" cy="37" r="4" fill="#003178" stroke="white" strokeWidth="1.5"/>
                {/* VIN dot — door */}
                <circle cx="28" cy="49" r="4" fill="#F59E0B" stroke="white" strokeWidth="1.5"/>
              </svg>
              {/* Dot labels */}
              <div className="absolute top-[30px] left-[37px] w-1.5 h-1.5 bg-primary rounded-full animate-ping opacity-60" />
            </div>

            <div>
              <p className="text-sm font-bold text-slate-800 mb-0.5">Your 17-character VIN</p>
              <p className="text-xs text-slate-500 leading-relaxed">
                Every vehicle built after 1981 has a unique VIN. Here are the most common places to find it:
              </p>
              {/* Example VIN */}
              <div className="mt-2 inline-flex items-center gap-2 bg-slate-100 rounded-lg px-2.5 py-1">
                <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Example:</span>
                <span className="font-mono text-xs font-bold text-slate-700 tracking-widest">1HGBH41JXMN109186</span>
              </div>
            </div>
          </div>

          {/* 3 location cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {locations.map(({ icon: Icon, label, desc, color }) => (
              <div key={label} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center ${color}`}>
                  <Icon className="w-3.5 h-3.5" />
                </span>
                <div>
                  <p className="text-xs font-bold text-slate-800 leading-snug">{label}</p>
                  <p className="text-[11px] text-slate-500 leading-relaxed mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
