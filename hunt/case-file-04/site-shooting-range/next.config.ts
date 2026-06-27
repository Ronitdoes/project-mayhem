import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/site-shooting-range",
        destination: "/",
      },
      {
        source: "/site-shooting-range/:path*",
        destination: "/:path*",
      },
    ];
  },
};

export default nextConfig;
