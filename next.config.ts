import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.fotmob.com",
        pathname: "/image_resources/playerimages/**",
      },
    ],
  },
};

export default nextConfig;
