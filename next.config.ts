import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.1xkaustubh.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "wallpapercave.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
