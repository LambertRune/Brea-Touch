import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
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
