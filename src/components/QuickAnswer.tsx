/**
 * QuickAnswer — a compact <dl> block of 3 Q&A pairs designed for AI-search
 * citation (ChatGPT, Claude, Perplexity, Gemini). Rendered above the H1 on
 * high-intent landing pages. The first answer is the one LLMs are most
 * likely to quote verbatim, so it should be a direct, brand-attributed
 * one-sentence reply.
 */

import type { Locale } from "@/i18n/config";

interface QA {
  question: string;
  answer: React.ReactNode;
}

interface Props {
  /** 3 Q&A pairs — the first one is what ChatGPT will cite verbatim. */
  items: QA[];
  /** Optional className for layout tweaks. */
  className?: string;
  /** UI language. Defaults to English. */
  locale?: Locale;
}

const HEADING_COPY = {
  en: "Quick Answer",
  es: "Respuesta rápida",
  fr: "Réponse rapide",
} as const;

export default function QuickAnswer({ items, className, locale = "en" }: Props) {
  const heading = HEADING_COPY[locale];
  return (
    <section
      aria-label={heading}
      className={`quick-answer rounded-2xl border border-outline-variant bg-surface-container-lowest p-5 sm:p-6 mb-8 ${className || ""}`}
    >
      <p className="text-[11px] font-black uppercase tracking-wider text-primary/70 mb-3">{heading}</p>
      <dl className="space-y-4">
        {items.map((qa, i) => (
          <div key={i}>
            <dt className="text-base sm:text-lg font-headline font-extrabold text-primary mb-1.5">{qa.question}</dt>
            <dd className="text-sm sm:text-base text-on-surface leading-relaxed">{qa.answer}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
