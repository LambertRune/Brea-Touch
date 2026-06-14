import type { NextConfig } from "next";
import { getSecurityHeaderEntries } from "./src/lib/security-headers";

const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  async redirects() {
    return [
      {
        source: "/onderzoek",
        destination: "/zelfonderzoek",
        permanent: true,
      },
      {
        source: "/onderzoek/:slug",
        destination: "/zelfonderzoek",
        permanent: true,
      },
    ];
  },
  async headers() {
    const security = getSecurityHeaderEntries().map(({ key, value }) => ({
      key,
      value,
    }));
    const noStore = {
      key: "Cache-Control",
      value: "no-store, max-age=0, must-revalidate",
    };
    return [
      {
        source: "/:path((?!_next/static|_next/image|pictures/).*)",
        headers: [...security, noStore],
      },
      {
        source: "/_next/static/:path*",
        headers: security,
      },
      {
        source: "/pictures/:path*",
        headers: security,
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
