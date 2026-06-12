"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Globe, Check } from "lucide-react";
import { detectLocale, PICKER_LOCALES, type Locale } from "@/i18n/config";
import { translateSlug, untranslateSlug } from "@/i18n/slugs";

/**
 * Language switcher dropdown — used in both Header and Footer.
 *
 * Behaviour:
 *   • Detects the current locale from the URL prefix.
 *   • For each peer locale, computes the URL of the *same content page*
 *     in that locale (canonical-to-canonical, slug-translated).
 *   • Renders as a button + dropdown. The dropdown items are real
 *     <Link>s — middle-click / open-in-new-tab works.
 *
 * Critical SEO behaviour: each link target uses the locale's translated
 * slug, not just the locale prefix. That makes the switcher itself a
 * source of in-content internal links between the English page and
 * its Spanish equivalent, which reinforces the hreflang signal.
 *
 * Placement = `variant`:
 *   • "header"  → compact button with globe icon, dropdown below.
 *   • "footer"  → horizontal inline list, no dropdown.
 */

interface Props {
  variant?: "header" | "footer";
}

export default function LanguageSwitcher({ variant = "header" }: Props) {
  const pathname = usePathname() || "/";
  const [open, setOpen] = useState(false);

  const { locale: currentLocale, pathname: pathWithinLocale } =
    detectLocale(pathname);
  // The Next.js page tree is keyed by English slug, so convert the
  // currently displayed (possibly translated) path back to the
  // canonical English path. We use that as the source of truth when
  // building each peer-locale URL.
  const englishPath = untranslateSlug(pathWithinLocale, currentLocale);

  const linkFor = (target: Locale): string => {
    const targetPath = translateSlug(englishPath, target);
    if (target === "en") return targetPath;
    if (targetPath === "/") return `/${target}`;
    return `/${target}${targetPath}`;
  };

  if (variant === "footer") {
    return (
      <nav
        aria-label="Language"
        className="flex flex-wrap items-center gap-2 text-xs text-on-surface-variant"
      >
        <span className="font-semibold text-on-surface mr-1">
          <Globe className="inline w-3.5 h-3.5 mr-1 -mt-0.5" />
          Language:
        </span>
        {PICKER_LOCALES.map((opt) => {
          const active = opt.code === currentLocale;
          return (
            <Link
              key={opt.code}
              href={linkFor(opt.code)}
              hrefLang={opt.code}
              className={
                active
                  ? "px-2 py-1 rounded-md bg-primary/10 text-primary font-semibold"
                  : "px-2 py-1 rounded-md hover:bg-slate-100 transition"
              }
            >
              <span className="mr-1" aria-hidden>
                {opt.flag}
              </span>
              {opt.nativeLabel}
            </Link>
          );
        })}
      </nav>
    );
  }

  // ── Header variant ──
  const active = PICKER_LOCALES.find((p) => p.code === currentLocale);
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 transition"
      >
        <Globe className="w-4 h-4" />
        <span aria-hidden>{active?.flag}</span>
        <span className="hidden sm:inline">{active?.nativeLabel ?? "EN"}</span>
      </button>
      {open && (
        // Click-outside is handled by the user clicking another link —
        // not worth a global handler for a 2-item menu. The menu auto-
        // closes on navigation because the page re-renders.
        <div
          role="menu"
          className="absolute right-0 mt-2 w-44 rounded-xl bg-white border border-slate-200 shadow-lg z-50 overflow-hidden"
        >
          {PICKER_LOCALES.map((opt) => {
            const isActive = opt.code === currentLocale;
            return (
              <Link
                key={opt.code}
                href={linkFor(opt.code)}
                hrefLang={opt.code}
                role="menuitem"
                onClick={() => setOpen(false)}
                className={
                  isActive
                    ? "flex items-center justify-between gap-2 px-3 py-2 text-sm bg-primary/8 text-primary font-semibold"
                    : "flex items-center justify-between gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                }
              >
                <span className="flex items-center gap-2">
                  <span aria-hidden>{opt.flag}</span>
                  <span>{opt.nativeLabel}</span>
                </span>
                {isActive && <Check className="w-3.5 h-3.5" />}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
