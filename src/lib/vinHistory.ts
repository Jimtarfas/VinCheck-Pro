/**
 * Lightweight per-browser history of VIN reports the user has visited.
 * Works for guests and logged-in users alike — everything lives in
 * localStorage so there is no server round-trip.
 *
 * Storage key: "carchecker_vin_history"
 * Max entries: 12 (newest first, deduped by VIN)
 */

export interface VinHistoryEntry {
  vin: string;
  label: string;       // Human-readable, e.g. "2020 Toyota Camry LE"
  photo?: string;      // First photo URL, if available
  price?: string;      // Listing price, if available
  visitedAt: number;   // Epoch ms
}

const KEY = "carchecker_vin_history";
const MAX = 12;

function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export function getHistory(): VinHistoryEntry[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    // Defensive: only keep entries that have at least a VIN and label
    return parsed
      .filter(
        (e): e is VinHistoryEntry =>
          !!e &&
          typeof e === "object" &&
          typeof (e as VinHistoryEntry).vin === "string" &&
          typeof (e as VinHistoryEntry).label === "string",
      )
      .slice(0, MAX);
  } catch {
    return [];
  }
}

export function addToHistory(entry: Omit<VinHistoryEntry, "visitedAt">): void {
  if (!isBrowser()) return;
  if (!entry.vin) return;
  try {
    const prev = getHistory().filter((e) => e.vin !== entry.vin);
    const next: VinHistoryEntry[] = [
      { ...entry, visitedAt: Date.now() },
      ...prev,
    ].slice(0, MAX);
    window.localStorage.setItem(KEY, JSON.stringify(next));
    // Let listeners in the same tab know the history changed.
    window.dispatchEvent(new CustomEvent("vinhistory:updated"));
  } catch {
    // ignore quota / parse errors
  }
}

export function removeFromHistory(vin: string): void {
  if (!isBrowser()) return;
  try {
    const next = getHistory().filter((e) => e.vin !== vin);
    window.localStorage.setItem(KEY, JSON.stringify(next));
    window.dispatchEvent(new CustomEvent("vinhistory:updated"));
  } catch {
    // ignore
  }
}

export function clearHistory(): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.removeItem(KEY);
    window.dispatchEvent(new CustomEvent("vinhistory:updated"));
  } catch {
    // ignore
  }
}
