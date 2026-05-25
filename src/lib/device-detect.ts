/**
 * Lightweight User-Agent classifier — no external deps to keep the bundle
 * lean. Returns one of "mobile" | "tablet" | "desktop" | "unknown" so the
 * admin dashboard can render a phone / PC / tablet breakdown.
 *
 * Order matters: tablets are checked BEFORE phones because most tablet UAs
 * also contain "Mobile" (e.g. iPad sometimes, Android tablets always). If a
 * UA matches both signals we treat it as a tablet.
 *
 * This is heuristic, not perfect — that's the trade-off versus shipping
 * ua-parser-js (~25KB gzipped). Good enough for an internal admin chart.
 */
export type DeviceType = "mobile" | "tablet" | "desktop" | "unknown";

const TABLET_RE  = /\b(iPad|Tablet|PlayBook|Kindle|Silk|Nexus 7|Nexus 9|Nexus 10|SM-T|GT-P|KFAPWI)\b/i;
// iPadOS 13+ reports a desktop Safari UA; the only reliable browser-side hint
// is "Macintosh" + touch support — but we don't have window here, so we just
// note the gap. Most iPad traffic still surfaces as desktop with this scheme.
const MOBILE_RE  = /\b(Mobile|iPhone|iPod|Android|BlackBerry|BB10|IEMobile|Opera Mini|webOS|Windows Phone)\b/i;
const DESKTOP_RE = /\b(Windows NT|Macintosh|Mac OS X|Linux x86_64|X11|CrOS)\b/i;

export function classifyDevice(ua: string | null | undefined): DeviceType {
  if (!ua) return "unknown";
  if (TABLET_RE.test(ua))  return "tablet";
  if (MOBILE_RE.test(ua))  return "mobile";
  if (DESKTOP_RE.test(ua)) return "desktop";
  return "unknown";
}

export interface DeviceBreakdown {
  mobile:  number;
  tablet:  number;
  desktop: number;
  unknown: number;
  total:   number;
}

/** Aggregates an array of UA strings into per-bucket counts. */
export function tallyDevices(userAgents: Array<string | null | undefined>): DeviceBreakdown {
  const out: DeviceBreakdown = { mobile: 0, tablet: 0, desktop: 0, unknown: 0, total: 0 };
  for (const ua of userAgents) {
    out[classifyDevice(ua)]++;
    out.total++;
  }
  return out;
}
