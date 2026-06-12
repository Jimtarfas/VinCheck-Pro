/**
 * Spanish locale layout.
 *
 * The root layout (src/app/layout.tsx) hardcodes <html lang="en"> on
 * the document, which Google reads as a strong language signal. To
 * keep that signal accurate for Spanish pages we wrap the /es/* route
 * group in this layout and set <html lang> via a small client-side
 * helper that runs once on mount.
 *
 * Why not a full nested <html>? Next.js only allows one <html> per
 * render tree — the root layout owns it. Mutating the attribute from
 * a small effect is the documented App-Router pattern for per-route
 * locale flags.
 */

"use client";

import { useEffect } from "react";

export default function EsLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Set both `lang` (HTML standard) and `xml:lang` (legacy but still
    // consulted by some indexers). Reset to "en" on unmount so
    // client-side navigation back to English pages restores the
    // default — without this, navigating /es/... → /florida-vin-check
    // would leave lang="es" set incorrectly.
    const previous = document.documentElement.lang;
    document.documentElement.lang = "es";
    return () => {
      document.documentElement.lang = previous || "en";
    };
  }, []);
  return children;
}
