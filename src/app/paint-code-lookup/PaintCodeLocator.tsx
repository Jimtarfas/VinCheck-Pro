"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  MapPin,
  Tag,
  FileText,
  Sparkles,
  Lightbulb,
  Copy,
  Check,
  Palette,
  ChevronRight,
} from "lucide-react";
import { PAINT_CODE_BRANDS, findBrand, type PaintCodeBrand } from "@/lib/paint-codes";

/**
 * Interactive "Where is my paint code?" tool.
 *
 * Pill-button grid of 30 brands. Selecting a brand shows a detailed card
 * with primary/secondary locations, sticker label format, example codes,
 * and tips. State is synced with the `?brand=` query param so the tool is
 * deep-linkable for SEO (e.g., /paint-code-lookup?brand=toyota).
 */
export default function PaintCodeLocator() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initial = searchParams.get("brand");

  const [activeSlug, setActiveSlug] = useState<string | null>(
    findBrand(initial)?.slug ?? null
  );
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Keep state and URL in sync if the user navigates with browser back/forward
  useEffect(() => {
    const fromUrl = searchParams.get("brand");
    const match = findBrand(fromUrl);
    if (match && match.slug !== activeSlug) setActiveSlug(match.slug);
    if (!fromUrl && activeSlug) setActiveSlug(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const activeBrand = useMemo<PaintCodeBrand | undefined>(
    () => findBrand(activeSlug),
    [activeSlug]
  );

  const handleSelect = (slug: string) => {
    setActiveSlug(slug);
    const params = new URLSearchParams(searchParams.toString());
    params.set("brand", slug);
    router.replace(`/paint-code-lookup?${params.toString()}`, { scroll: false });
  };

  const handleClear = () => {
    setActiveSlug(null);
    router.replace(`/paint-code-lookup`, { scroll: false });
  };

  const handleCopy = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 1500);
    } catch {
      // Clipboard API can fail in older browsers / non-secure contexts — fail silently.
    }
  };

  return (
    <div className="rounded-3xl border border-outline-variant bg-surface-container-lowest p-5 sm:p-7 shadow-sm">
      <div className="flex items-start justify-between gap-4 mb-5">
        <div>
          <div className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-wider bg-primary/10 text-primary rounded-full px-3 py-1 mb-3">
            <Palette className="w-3.5 h-3.5" /> Interactive Tool
          </div>
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-1.5">
            Where Is My Paint Code? Pick Your Brand
          </h2>
          <p className="text-sm text-on-surface-variant max-w-2xl leading-relaxed">
            Tap your vehicle&apos;s manufacturer to see the exact sticker location, label format, example codes, and brand-specific tips.
          </p>
        </div>
        {activeBrand && (
          <button
            type="button"
            onClick={handleClear}
            className="hidden sm:inline-flex flex-shrink-0 text-xs font-semibold text-on-surface-variant hover:text-primary transition-colors px-3 py-1.5 rounded-full border border-outline-variant hover:border-primary/40"
          >
            Clear
          </button>
        )}
      </div>

      {/* Brand pill grid */}
      <div className="flex flex-wrap gap-2 mb-6">
        {PAINT_CODE_BRANDS.map((b) => {
          const isActive = b.slug === activeSlug;
          return (
            <button
              key={b.slug}
              type="button"
              onClick={() => handleSelect(b.slug)}
              aria-pressed={isActive}
              className={[
                "px-4 py-2 rounded-full text-sm font-bold border transition-all",
                isActive
                  ? "bg-primary text-white border-primary shadow-md shadow-primary/20 scale-[1.02]"
                  : "bg-surface text-on-surface border-outline-variant hover:border-primary/50 hover:bg-primary/5",
              ].join(" ")}
            >
              {b.name}
            </button>
          );
        })}
      </div>

      {/* Detail panel */}
      {activeBrand ? (
        <BrandCard
          brand={activeBrand}
          copiedCode={copiedCode}
          onCopy={handleCopy}
        />
      ) : (
        <GenericHelper />
      )}
    </div>
  );
}

function GenericHelper() {
  return (
    <div className="rounded-2xl border border-dashed border-outline-variant bg-surface p-6 sm:p-8">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-2xl bg-secondary-container flex items-center justify-center flex-shrink-0">
          <Sparkles className="w-6 h-6 text-on-secondary-container" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-headline font-extrabold text-primary mb-1">
            Select your manufacturer above
          </h3>
          <p className="text-sm text-on-surface-variant leading-relaxed mb-4">
            Every brand puts the paint code in a slightly different place and writes it differently. Pick yours to see the exact sticker location, what the label looks like, real example codes, and brand-specific tips.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { icon: MapPin, label: "Exact sticker location" },
              { icon: Tag, label: "Code format & examples" },
              { icon: Lightbulb, label: "Brand-specific tips" },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 bg-surface-container-low rounded-xl p-3 border border-outline-variant/60"
              >
                <Icon className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-xs font-medium text-on-surface">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function BrandCard({
  brand,
  copiedCode,
  onCopy,
}: {
  brand: PaintCodeBrand;
  copiedCode: string | null;
  onCopy: (code: string) => void;
}) {
  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center gap-3 pb-4 border-b border-outline-variant">
        <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center font-headline font-black text-lg">
          {brand.name.slice(0, 1)}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-xl sm:text-2xl font-headline font-extrabold text-primary leading-tight">
            {brand.name} Paint Code Location
          </h3>
          <p className="text-xs text-on-surface-variant mt-0.5">
            Sticker label: <span className="font-semibold text-on-surface">{brand.stickerLabel}</span>
          </p>
        </div>
      </div>

      {/* Primary location */}
      <div className="rounded-2xl border border-primary/30 bg-primary/5 p-5">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-primary text-white flex items-center justify-center flex-shrink-0">
            <MapPin className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] font-black uppercase tracking-wider text-primary mb-1">
              Primary Location
            </div>
            <p className="text-sm sm:text-base text-on-surface font-semibold leading-relaxed">
              {brand.primaryLocation}
            </p>
          </div>
        </div>
      </div>

      {/* Two-column grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Secondary locations */}
        <div className="rounded-2xl border border-outline-variant bg-surface p-5">
          <div className="text-[11px] font-black uppercase tracking-wider text-on-surface-variant mb-3">
            Also Check Here
          </div>
          <ul className="space-y-2">
            {brand.secondaryLocations.map((loc) => (
              <li key={loc} className="flex items-start gap-2 text-sm text-on-surface">
                <ChevronRight className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <span>{loc}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Code format */}
        <div className="rounded-2xl border border-outline-variant bg-surface p-5">
          <div className="text-[11px] font-black uppercase tracking-wider text-on-surface-variant mb-3">
            Code Format
          </div>
          <p className="text-sm text-on-surface leading-relaxed mb-2">
            <span className="font-semibold">Format:</span> {brand.codeFormat}
          </p>
          <p className="text-sm text-on-surface leading-relaxed">
            <span className="font-semibold">Pattern:</span>{" "}
            <code className="bg-surface-container-low rounded px-1.5 py-0.5 text-xs font-mono text-primary">
              {brand.codePattern}
            </code>
          </p>
        </div>
      </div>

      {/* Examples */}
      <div className="rounded-2xl border border-outline-variant bg-surface p-5">
        <div className="flex items-center gap-2 mb-3">
          <FileText className="w-4 h-4 text-primary" />
          <div className="text-[11px] font-black uppercase tracking-wider text-on-surface-variant">
            Example Codes &amp; Colors
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {brand.examples.map((ex) => {
            const copied = copiedCode === ex.code;
            return (
              <div
                key={ex.code}
                className="flex items-center justify-between gap-3 bg-surface-container-low rounded-xl px-3 py-2.5 border border-outline-variant/60"
              >
                <div className="min-w-0">
                  <div className="font-mono text-sm font-extrabold text-primary tracking-wider">
                    {ex.code}
                  </div>
                  <div className="text-xs text-on-surface-variant truncate">
                    {ex.colorName}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onCopy(ex.code)}
                  aria-label={`Copy ${ex.code}`}
                  className="flex-shrink-0 p-1.5 rounded-lg hover:bg-primary/10 text-on-surface-variant hover:text-primary transition-colors"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-green-500" strokeWidth={3} />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tips */}
      <div className="rounded-2xl border border-outline-variant bg-secondary-container/40 p-5">
        <div className="flex items-center gap-2 mb-3">
          <Lightbulb className="w-4 h-4 text-on-secondary-container" />
          <div className="text-[11px] font-black uppercase tracking-wider text-on-secondary-container">
            {brand.name}-Specific Tips
          </div>
        </div>
        <ul className="space-y-2">
          {brand.tips.map((tip) => (
            <li
              key={tip}
              className="flex items-start gap-2 text-sm text-on-surface leading-relaxed"
            >
              <span className="text-on-secondary-container font-black mt-0.5">·</span>
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
