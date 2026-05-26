import type { NextConfig } from "next";
import { createVanillaExtractPlugin } from "@vanilla-extract/next-plugin";

const withVanillaExtract = createVanillaExtractPlugin();

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  transpilePackages: ['@base-ui/react'],

  // Workaround for a next@16 + Vercel bundling bug.
  //
  // "use client" components that transitively import LayoutRouterContext
  // (via the canonical `next/dist/shared/lib/app-router-context.shared-runtime`
  // path) end up with a server bundle whose require chain reaches
  // pages.runtime.prod.js — a file Vercel's NFT does NOT package into App
  // Router Lambdas. Cold-start MODULE_NOT_FOUND ensues.
  //
  // Tried the proper fix (post-process the substitution plugin's `pages` -> 
  // `app-page` rewrite in next.config.ts webpack hook). Local builds came out
  // clean either way, but the same fix on Vercel left the broken require in
  // place — likely a plugin-ordering or layer-tagging issue inside Next's
  // pipeline that we couldn't isolate.
  //
  // This is the bandage: force NFT to include the file. The require still
  // resolves to the wrong runtime, it just doesn't crash anymore. Revisit
  // when next-view-transitions migration lands.
  outputFileTracingIncludes: {
    "/**/*": [
      "./node_modules/next/dist/compiled/next-server/pages.runtime.prod.js",
    ],
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // Stop MIME sniffing
          { key: "X-Content-Type-Options", value: "nosniff" },
          // limit referrer leakage
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // basic clickjacking defense (CSP frame-ancestors is better, but this is easy + safe)
          { key: "X-Frame-Options", value: "DENY" },
          // Enable on HTTPS only. If you ever serve via HTTP locally, this is ignored by browsers.
          // If you use a custom domain, make sure it is always HTTPS before enabling "preload".
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          // Disable for now
          {
            key: "Permissions-Policy",
            value: [
              "camera=()",
              "microphone=()",
              "geolocation=()",
              "payment=()",
              "usb=()",
              "clipboard-read=()",
              "clipboard-write=()",
            ].join(", "),
          },
          // cross-origin isolation
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
        ],
      },
      // Long chaching pdf/images
      {
        source: "/content/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },

  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.tannerorourke.dev" }],
        destination: "https://tannerorourke.dev/:path*",
        permanent: true,
      }
    ]
  },

  webpack: (webpackConfig, { dev }) => {
    if (dev) webpackConfig.cache = false;
    return webpackConfig;
  },
};

export default withVanillaExtract(nextConfig);
