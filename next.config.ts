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
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "geolocation=(), camera=(), microphone=()" },
          { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
          {
            key: "Content-Security-Policy-Report-Only",
            value:
              "default-src 'self'; script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https://www.figma.com https://images.unsplash.com; font-src 'self'; connect-src 'self' https://challenges.cloudflare.com; frame-src https://challenges.cloudflare.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self'",
          },
        ],
      },
    ];
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
