import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  experimental: {
    // Merge client chunks aggressively so the homepage ships fewer script
    // files (SEO checkers flag pages that load too many separate JS files).
    turbopackChunking: {
      minChunkSize: 800000,
      maxChunkCountPerGroup: 6,
      maxMergeChunkSize: 2000000,
      firstPageLoadPriority: 1,
      priorityRoutes: [/^\/$/],
      priorityBoost: 4,
      requestCost: 500000,
    },
  },
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    localPatterns: [
      { pathname: "/images/**", search: "" },
      { pathname: "/brand/**", search: "" },
      { pathname: "/brand/**", search: "?v=2" },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.veltrixstudio.ir" }],
        destination: "https://veltrixstudio.ir/:path*",
        permanent: true,
      },
    ];
  },
  outputFileTracingIncludes: {
    "/api/og": ["./src/fonts/og/*.ttf", "./public/brand/logo-192.png"],
  },
};

export default nextConfig;
