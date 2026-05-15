import type { NextConfig } from "next";
import { createVanillaExtractPlugin } from "@vanilla-extract/next-plugin";

const withVanillaExtract = createVanillaExtractPlugin();

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  transpilePackages: ['@base-ui/react'],

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
    if (dev) webpackConfig.cache = false; // temporarily
    return webpackConfig;
  },
};

export default withVanillaExtract(nextConfig);
