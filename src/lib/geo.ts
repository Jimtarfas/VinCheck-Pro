/**
 * Server-side IP geolocation. Used to attach country/city metadata to
 * incoming chat messages so admins can see where visitors are from
 * without asking.
 *
 * Vercel automatically injects geo headers on every request — they're
 * derived from the edge POP that received the connection, so they're
 * accurate and free (no third-party API calls).
 *
 * Spec: https://vercel.com/docs/edge-network/headers#geolocation-headers
 */

// Minimal headers reader that works for both `next/headers` ReadonlyHeaders
// and a standard fetch `Headers`.
type HeaderReader = { get: (name: string) => string | null };

export interface VisitorGeo {
  country?: string;       // 2-letter ISO code (e.g. "US")
  countryName?: string;   // Friendly name (e.g. "United States")
  countryFlag?: string;   // 🇺🇸 emoji from country code
  region?: string;
  city?: string;
}

const COUNTRY_NAMES: Record<string, string> = {
  US: "United States", CA: "Canada", MX: "Mexico", GB: "United Kingdom",
  DE: "Germany", FR: "France", ES: "Spain", IT: "Italy", NL: "Netherlands",
  BE: "Belgium", CH: "Switzerland", AT: "Austria", PT: "Portugal",
  IE: "Ireland", DK: "Denmark", SE: "Sweden", NO: "Norway", FI: "Finland",
  PL: "Poland", CZ: "Czechia", GR: "Greece", RO: "Romania", HU: "Hungary",
  TR: "Turkey", RU: "Russia", UA: "Ukraine",
  CN: "China", JP: "Japan", KR: "South Korea", IN: "India", PK: "Pakistan",
  BD: "Bangladesh", LK: "Sri Lanka", PH: "Philippines", VN: "Vietnam",
  TH: "Thailand", ID: "Indonesia", MY: "Malaysia", SG: "Singapore",
  AE: "UAE", SA: "Saudi Arabia", IL: "Israel", EG: "Egypt", MA: "Morocco",
  DZ: "Algeria", TN: "Tunisia", NG: "Nigeria", KE: "Kenya", ZA: "South Africa",
  AU: "Australia", NZ: "New Zealand",
  BR: "Brazil", AR: "Argentina", CL: "Chile", CO: "Colombia", PE: "Peru",
  VE: "Venezuela",
};

function flagFromCountryCode(code: string): string {
  if (!code || code.length !== 2) return "";
  // Map A→🇦, B→🇧, etc. (regional indicator symbols start at U+1F1E6)
  const A = 0x1f1e6;
  const upper = code.toUpperCase();
  return (
    String.fromCodePoint(A + upper.charCodeAt(0) - 65) +
    String.fromCodePoint(A + upper.charCodeAt(1) - 65)
  );
}

/**
 * Read geo from Vercel's geolocation headers, falling back to none if
 * we're running locally / behind a different edge.
 */
export function geoFromHeaders(h: HeaderReader): VisitorGeo {
  const country = (h.get("x-vercel-ip-country") || "").toUpperCase().trim();
  const region = decode(h.get("x-vercel-ip-country-region") || "");
  const city = decode(h.get("x-vercel-ip-city") || "");

  if (!country) return {};

  return {
    country,
    countryName: COUNTRY_NAMES[country] || country,
    countryFlag: flagFromCountryCode(country),
    region: region || undefined,
    city: city || undefined,
  };
}

function decode(s: string): string {
  // Vercel URL-encodes non-ASCII region/city names (e.g. "Z%C3%BCrich").
  try {
    return decodeURIComponent(s);
  } catch {
    return s;
  }
}

/** Pretty single-line label like "🇺🇸 New York, NY (US)". */
export function formatGeo(g: VisitorGeo): string {
  if (!g.country) return "";
  const parts: string[] = [];
  if (g.countryFlag) parts.push(g.countryFlag);
  const place = [g.city, g.region].filter(Boolean).join(", ");
  if (place) parts.push(place);
  parts.push(`(${g.countryName || g.country})`);
  return parts.join(" ");
}
