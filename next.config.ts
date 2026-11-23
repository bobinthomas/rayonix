import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.figma.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  async redirects() {
    return [
      {
        source: "/domains/subsurface",
        destination: "/subsurface/detect/gpr",
        permanent: true,
      },
      {
        source: "/sub-surface/detect/gpr",
        destination: "/subsurface/detect/gpr",
        permanent: true,
      },
      {
        source: "/subsurface/command-intelligence",
        destination: "/subsurface/decide",
        permanent: true,
      },
      {
        source: "/subsurface/decide/command-intelligence",
        destination: "/subsurface/decide",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
