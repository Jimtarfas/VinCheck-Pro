"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Search, Download, Shield, TrendingDown, X, MapPin, Star } from "lucide-react";

interface SocialEvent {
  id: string;
  type: "lookup" | "download" | "alert" | "savings";
  name: string;
  location: string;
  message: string;
  vin?: string;
  vehicle?: string;
  at: string;
  ago: string;
}

const SHOW_AFTER_MS_INITIAL = 9_000;       // ~9s before first toast
const SHOW_AFTER_MS_MIN = 25_000;          // 25-45s between toasts
const SHOW_AFTER_MS_MAX = 45_000;
const VISIBLE_MS = 6_500;                  // each toast on screen ~6.5s
const MAX_TOASTS_PER_SESSION = 6;
const SESSION_DISMISSED_KEY = "ccv_sp_dismissed";

function rand(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

const TYPE_META = {
  lookup:   { icon: Search,        ring: "bg-primary-100 text-primary-700",   tag: "Verified" },
  download: { icon: Download,      ring: "bg-emerald-100 text-emerald-700",  tag: "Downloaded" },
  alert:    { icon: Shield,        ring: "bg-rose-100 text-rose-700",        tag: "Avoided fraud" },
  savings:  { icon: TrendingDown,  ring: "bg-amber-100 text-amber-700",      tag: "Saved $$$" },
} as const;

export default function SocialProofToast() {
  const [event, setEvent] = useState<SocialEvent | null>(null);
  const [visible, setVisible] = useState(false);
  const queueRef = useRef<SocialEvent[]>([]);
  const indexRef = useRef(0);
  const shownCountRef = useRef(0);
  const dismissedRef = useRef(false);
  const timeoutsRef = useRef<{ show?: ReturnType<typeof setTimeout>; hide?: ReturnType<typeof setTimeout> }>({});

  // ── load events from API ──
  const fetchEvents = useCallback(async () => {
    try {
      const r = await fetch("/api/social-proof", { cache: "no-store" });
      if (!r.ok) return;
      const data = (await r.json()) as { events: SocialEvent[] };
      // Shuffle so successive visits don't see identical order
      queueRef.current = [...data.events].sort(() => Math.random() - 0.5);
      indexRef.current = 0;
    } catch {
      // ignore
    }
  }, []);

  // ── show next toast ──
  const showNext = useCallback(() => {
    if (dismissedRef.current) return;
    if (shownCountRef.current >= MAX_TOASTS_PER_SESSION) return;
    if (document.hidden) {
      // wait for tab focus
      timeoutsRef.current.show = setTimeout(showNext, 5_000);
      return;
    }
    if (queueRef.current.length === 0) return;

    const next = queueRef.current[indexRef.current % queueRef.current.length];
    indexRef.current += 1;
    shownCountRef.current += 1;

    setEvent(next);
    setVisible(true);

    timeoutsRef.current.hide = setTimeout(() => {
      setVisible(false);
      // schedule next after fade-out completes
      timeoutsRef.current.show = setTimeout(
        showNext,
        rand(SHOW_AFTER_MS_MIN, SHOW_AFTER_MS_MAX)
      );
    }, VISIBLE_MS);
  }, []);

  // ── boot ──
  useEffect(() => {
    try {
      if (sessionStorage.getItem(SESSION_DISMISSED_KEY) === "1") {
        dismissedRef.current = true;
      }
    } catch {
      // ignore
    }

    if (dismissedRef.current) return;

    void fetchEvents().then(() => {
      timeoutsRef.current.show = setTimeout(showNext, SHOW_AFTER_MS_INITIAL);
    });

    const onVisibility = () => {
      // Re-fetch when tab returns to foreground after a long absence,
      // so "ago" stays accurate.
      if (!document.hidden && shownCountRef.current === 0) {
        void fetchEvents();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      if (timeoutsRef.current.show) clearTimeout(timeoutsRef.current.show);
      if (timeoutsRef.current.hide) clearTimeout(timeoutsRef.current.hide);
    };
  }, [fetchEvents, showNext]);

  function dismissForSession() {
    dismissedRef.current = true;
    try {
      sessionStorage.setItem(SESSION_DISMISSED_KEY, "1");
    } catch {
      // ignore
    }
    setVisible(false);
    if (timeoutsRef.current.show) clearTimeout(timeoutsRef.current.show);
    if (timeoutsRef.current.hide) clearTimeout(timeoutsRef.current.hide);
  }

  if (!event) return null;

  const meta = TYPE_META[event.type] ?? TYPE_META.lookup;
  const Icon = meta.icon;

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed left-3 sm:left-5 bottom-3 sm:bottom-5 z-[55] max-w-[calc(100vw-1.5rem)] sm:max-w-sm transition-all duration-500 ease-out ${
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-3 pointer-events-none"
      }`}
    >
      <div className="bg-white border border-slate-200 rounded-2xl shadow-2xl shadow-slate-900/10 px-4 py-3 flex items-start gap-3 hover:shadow-slate-900/20 transition-shadow">
        {/* Icon */}
        <div className={`relative w-10 h-10 rounded-xl ${meta.ring} flex items-center justify-center flex-shrink-0`}>
          <Icon className="w-5 h-5" />
          <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white" />
        </div>

        {/* Body */}
        <div className="min-w-0 flex-1 pr-3">
          <p className="text-sm text-slate-900 leading-snug">
            <span className="font-semibold">{event.name}</span>
            <span className="text-slate-500"> from {event.location}</span>
          </p>
          <p className="text-sm text-slate-700 leading-snug mt-0.5">
            {messageBody(event)}
          </p>
          <div className="flex items-center gap-2 mt-1.5 flex-wrap">
            <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-emerald-600">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              {event.ago}
            </span>
            {event.vin && (
              <span className="text-[10px] font-mono text-slate-400">VIN {event.vin}</span>
            )}
            <span className="ml-auto inline-flex items-center gap-0.5 text-amber-500">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-2.5 h-2.5 fill-current" />
              ))}
            </span>
          </div>
        </div>

        {/* Dismiss */}
        <button
          onClick={dismissForSession}
          aria-label="Dismiss"
          className="absolute top-1.5 right-1.5 w-6 h-6 rounded-md text-slate-300 hover:text-slate-600 hover:bg-slate-100 flex items-center justify-center transition"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

function messageBody(e: SocialEvent): React.ReactNode {
  // Slightly different phrasings keep the toast feeling alive.
  switch (e.type) {
    case "download":
      return (
        <>
          downloaded a full report on <span className="font-medium">{e.vehicle || "a vehicle"}</span>
        </>
      );
    case "alert":
      return e.message.replace(/^[A-Z][a-z]+ /, "");
    case "savings":
      return e.message.replace(/^[A-Z][a-z]+ /, "");
    case "lookup":
    default:
      return (
        <span className="inline-flex items-center gap-1.5">
          <MapPin className="w-3 h-3 text-slate-400" />
          checked {e.vehicle ? <span className="font-medium">{e.vehicle}</span> : "a vehicle"}
        </span>
      );
  }
}
