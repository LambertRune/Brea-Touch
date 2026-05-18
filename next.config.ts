import type { NextConfig } from "next";
import { getSecurityHeaderEntries } from "./src/lib/security-headers";

const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  async headers() {
    const entries = getSecurityHeaderEntries().map(({ key, value }) => ({
      key,
      value,
    }));
    return [
      {
        source: "/:path*",
        headers: entries,
      },
    ];
  },
  images: {
    unoptimized: false,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dbbreatouch.phiosk.be",
        pathname: "/assets/**",
      },
    ],
  },
};

export default nextConfig;
