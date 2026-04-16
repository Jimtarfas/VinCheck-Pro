import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "auto.dev",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "api.auto.dev",
        pathname: "/photos/**",
      },
    ],
  },
};

export default nextConfig;
