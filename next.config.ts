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
          // Stops MIME sniffing
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Limits referrer leakage
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Basic clickjacking defense (CSP frame-ancestors is better, but this is easy + safe)
          { key: "X-Frame-Options", value: "DENY" },
          // Enable on HTTPS only. If you ever serve via HTTP locally, this is ignored by browsers.
          // If you use a custom domain, make sure it is always HTTPS before enabling "preload".
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          // Controls powerful browser features
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
          // Sensible cross-origin isolation defaults (usually safe for portfolios)
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          { key: "Cross-Origin-Resource-Policy", value: "same-origin" },

          // Optional: a CSP will likely break Next unless you implement nonces.
          // See notes below before enabling.
          // { key: "Content-Security-Policy", value: "default-src 'self'; img-src 'self' data: https:; style-src 'self' 'unsafe-inline'; script-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'; upgrade-insecure-requests" },
        ],
      },
    ];
  },

  // If you ever hit build errors from vanilla-extract emitting .vanilla.css files,
  // this keeps Next happy when importing generated CSS.
  // (Usually not needed, but safe.)
  // webpack(config) {
  //   return config;
  // }
};

export default withVanillaExtract(nextConfig);
