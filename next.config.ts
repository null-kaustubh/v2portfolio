import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.kaustubh.cloud",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
