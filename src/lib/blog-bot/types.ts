/**
 * Types shared across the auto-publishing blog bot pipeline.
 * See src/lib/blog-bot/README.md for the end-to-end flow.
 */

export interface DiscoveredTopic {
  /** kebab-case URL slug — must be unique vs every existing post. */
  slug: string;
  /** Human-readable post title (under 70 chars). */
  title: string;
  /** Primary search phrase the post is built around. */
  focusKeyword: string;
  /** Category slug (must exist in scripts/categories.ts). */
  category: string;
  /** 2-6 secondary keywords for tags + internal links. */
  secondaryKeywords: string[];
  /** Why this topic was selected — purely for logs. */
  rationale: string;
}

/**
 * What the Claude prompt asks for back. Strict JSON contract so the
 * Portable Text adapter is deterministic. Keep this shape narrow: more
 * structure here means less freedom for the model to drift.
 */
export interface ClaudeDraft {
  title: string;
  seoTitle: string;          // ≤55 chars, no brand suffix
  seoDescription: string;    // 140-160 chars
  excerpt: string;           // ≤220 chars
  /**
   * Ordered list of body sections. Each section is either a "block"
   * (text), a "list" (bullet or number), or a "callout".
   * No nested sections — flatten everything.
   */
  sections: DraftSection[];
}

export type DraftSection =
  | { kind: "h2"; text: string }
  | { kind: "h3"; text: string }
  | { kind: "p"; text: string }
  | { kind: "bullets"; items: string[] }
  | { kind: "numbered"; items: string[] }
  | { kind: "callout"; variant: "tip" | "info" | "warning"; title: string; text: string };

/**
 * Telemetry for one cron run. Persisted to Supabase so we can compute the
 * 50-post auto-pause budget without a per-run round trip.
 */
export interface BotRunResult {
  runId: string;
  startedAt: string;
  endedAt: string;
  ok: boolean;
  postSlug?: string;
  topicRationale?: string;
  durationMs: number;
  cost?: { inputTokens: number; outputTokens: number; usdEstimate: number };
  error?: string;
}
