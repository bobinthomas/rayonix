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
  // Redirects are applied by next-on-pages on Cloudflare Pages (a public/_redirects
  // file is not used: the generated _worker.js handles every request).
  async redirects() {
    return [
      // Old duplicate route spelling.
      {
        source: "/sub-surface/:path*",
        destination: "/subsurface/:path*",
        statusCode: 301,
      },
      // Retired coverage stubs and placeholder news stories (see src/content/news.ts).
      ...[
        "xtend-coverage",
        "shephard-coverage",
        "xtend-partnership",
        "aero-india-integrated-suite",
        "extreme-cold-testing-gpr-18000-ft",
        "x-labs-swarm-d-loitering-munition",
        "australia-bilateral-integration-facility-canberra",
      ].map((slug) => ({ source: `/news/${slug}`, destination: "/news", statusCode: 301 })),
      {
        source: "/subsurface/command-intelligence",
        destination: "/subsurface/decide",
        statusCode: 301,
      },
      {
        source: "/subsurface/decide/command-intelligence",
        destination: "/subsurface/decide",
        statusCode: 301,
      },
    ];
  },
};

export default nextConfig;
