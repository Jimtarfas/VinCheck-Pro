import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Compress all responses (only matters when self-hosted; Vercel does this anyway)
  compress: true,

  // Strip console.* in production builds (smaller bundles)
  compiler: {
    removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error", "warn"] } : false,
  },

  // Tree-shake the icon library aggressively. Without this, importing 1 icon can
  // pull megabytes of unused icon SVGs into the client bundle.
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "@portabletext/react",
      "@sanity/image-url",
    ],
  },

  images: {
    // Modern formats — Next.js auto-serves AVIF/WebP to supporting browsers
    formats: ["image/avif", "image/webp"],
    // Cache optimized images aggressively at the edge
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    remotePatterns: [
      { protocol: "https", hostname: "auto.dev", pathname: "/images/**" },
      { protocol: "https", hostname: "api.auto.dev", pathname: "/photos/**" },
      // ClearVin auction/vehicle hero images — shown in the paid report-preview
      // gallery (the real photo on file for the VIN).
      { protocol: "https", hostname: "www.clearvin.com", pathname: "/**" },
      { protocol: "https", hostname: "clearvin.com", pathname: "/**" },
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
      { protocol: "https", hostname: "cdn.sanity.io", pathname: "/**" },
      // Bing Image Search CDN — used as an external fallback when auto.dev
      // returns no photos for a VIN. See src/lib/external-photos.ts.
      { protocol: "https", hostname: "ts1.mm.bing.net", pathname: "/**" },
      { protocol: "https", hostname: "ts2.mm.bing.net", pathname: "/**" },
      { protocol: "https", hostname: "ts3.mm.bing.net", pathname: "/**" },
      { protocol: "https", hostname: "ts4.mm.bing.net", pathname: "/**" },
    ],
  },

  // 301 redirects to fix keyword cannibalization between sibling pages.
  // `/florida-vin-check` is the dedicated, better-converting state landing
  // page, so the older programmatic URL points all link equity at it.
  async redirects() {
    return [
      {
        source: "/vin-check/state/florida",
        destination: "/florida-vin-check",
        permanent: true,
      },
      // Old already-indexed `/state-vin-check/*` URLs 404 (route is now
      // `/vin-check/state/*`). 301 them to preserve link equity + clear the
      // crawler 404s. Florida has a dedicated landing page, so route it there
      // directly to avoid a redirect chain through `/vin-check/state/florida`.
      {
        source: "/state-vin-check/florida",
        destination: "/florida-vin-check",
        permanent: true,
      },
      {
        source: "/state-vin-check/:state",
        destination: "/vin-check/state/:state",
        permanent: true,
      },
      // Recall tool was renamed `/recall-lookup` -> `/recall-check`.
      {
        source: "/recall-lookup",
        destination: "/recall-check",
        permanent: true,
      },
      // `/lien-check` is cited externally (e.g. Microsoft Copilot) but only
      // `/vehicle-lien-check` exists, so the short alias 404s. 301 it to the
      // canonical page to recover the citation and clear the crawler 404.
      {
        source: "/lien-check",
        destination: "/vehicle-lien-check",
        permanent: true,
      },
    ];
  },

  // Cache headers for static assets — long max-age + immutable
  async headers() {
    return [
      {
        source: "/:path*\\.(jpg|jpeg|png|gif|webp|avif|svg|ico|woff|woff2)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      // Security headers for SEO + best-practices Lighthouse score
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
        ],
      },
    ];
  },
};

export default nextConfig;
