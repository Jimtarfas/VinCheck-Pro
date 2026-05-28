"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * Calls `router.refresh()` on a fixed interval so the parent
 * server-rendered admin page picks up fresh data without the admin
 * having to reload the tab. RSC refresh is cheap (only re-runs the
 * page's server fetches + re-streams the HTML) so 30s is comfortable
 * load-wise.
 *
 * Pauses while the tab is hidden — no point polling Supabase for a
 * background tab. Also fires immediately when the tab regains focus
 * so coming back to a stale tab doesn't show minute-old numbers.
 *
 * Underscore-prefixed folder (`_components`) keeps this out of the
 * Next.js app-router route tree even though it lives under app/admin.
 */
export default function AutoRefresh({ intervalMs = 30_000 }: { intervalMs?: number }) {
  const router = useRouter();
  useEffect(() => {
    const tick = () => {
      if (document.visibilityState === "visible") {
        router.refresh();
      }
    };
    const id = window.setInterval(tick, intervalMs);
    const onVis = () => {
      if (document.visibilityState === "visible") router.refresh();
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      window.clearInterval(id);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [router, intervalMs]);
  return null;
}
