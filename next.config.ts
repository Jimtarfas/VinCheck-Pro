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
