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
  
  webpack: (webpackConfig, { dev, isServer, webpack }) => {
    if (dev) webpackConfig.cache = false; // temporarily

    // Workaround for next@16 server-build bug.
    //
    // Next's webpack config registers a layer-aware NormalModuleReplacementPlugin
    // that rewrites relative `./X.shared-runtime` imports inside next's own
    // internals to one of two vendored runtimes based on the issuer's webpack
    // layer:
    //   - App Router layers   -> `next/dist/server/route-modules/app-page/vendored/contexts/X`
    //   - null/undefined      -> `next/dist/server/route-modules/pages/vendored/contexts/X`
    //
    // When next's internal client-component files (layout-router.js, etc.)
    // get pulled into a "use client" component's server bundle for SSR, the
    // issuer's layer can end up null/undefined, causing the plugin to choose
    // the `pages` variant. That variant's module.compiled.js then requires
    // `pages.runtime.prod.js`, which Vercel does NOT package into App Router
    // Lambdas — producing a cold-start MODULE_NOT_FOUND at runtime.
    //
    // Fix: post-process those mis-rewrites by redirecting any request for
    // `pages/vendored/contexts/` to `app-page/vendored/contexts/`. Both files
    // re-export the same shape (`vendored.contexts.AppRouterContext`), so
    // this is a safe drop-in, and `app-page.runtime.prod.js` IS bundled.
    if (isServer) {
      webpackConfig.plugins.push(
        new webpack.NormalModuleReplacementPlugin(
          /next\/dist\/server\/route-modules\/pages\/vendored\/contexts\//,
          (resource: { request: string }) => {
            resource.request = resource.request.replace(
              "/pages/vendored/contexts/",
              "/app-page/vendored/contexts/"
            );
          }
        )
      );
    }

    return webpackConfig;
  },
};

export default withVanillaExtract(nextConfig);
