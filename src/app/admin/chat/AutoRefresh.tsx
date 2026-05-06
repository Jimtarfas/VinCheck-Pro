"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * Refreshes the parent server component every <intervalMs> via
 * router.refresh(), so the conversation list stays in sync with
 * presence and incoming messages without a full reload.
 */
export default function AutoRefresh({ intervalMs = 10_000 }: { intervalMs?: number }) {
  const router = useRouter();
  useEffect(() => {
    const id = setInterval(() => router.refresh(), intervalMs);
    return () => clearInterval(id);
  }, [router, intervalMs]);
  return null;
}
