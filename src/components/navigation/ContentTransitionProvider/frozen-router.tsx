"use client";

import * as React from "react";

// FrozenRouter: prevents the exiting page's route from re-rendering with the
// new route's content while AnimatePresence runs the exit animation.
//
// IMPORTANT: Capturing `children` as a React element is NOT sufficient. The
// children prop describes Next.js internal components (OuterLayoutRouter,
// InnerLayoutRouter) that subscribe to LayoutRouterContext at render time.
// When the route changes, the App Router pushes a new context value upstream;
// the captured element re-renders against that *new* value, so the outgoing
// pane shows the incoming page's content. Freezing the context value at the
// boundary is the only thing that actually keeps the old route rendered.
//
// This relies on a private Next.js export. It has been stable across major
// versions but is not officially supported.
//
// ---
//
// Workaround for next@16 server-build bug:
//   `import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime"`
// gets caught by a layer-aware `NormalModuleReplacementPlugin` in next's
// node-server webpack config. When the issuer's webpack layer is null/undefined
// (which "use client" components in the App Router layout-router subtree can
// end up as), the plugin rewrites the request to
// `next/dist/server/route-modules/pages/vendored/contexts/app-router-context`
// — the Pages-router vendored copy. That copy then requires
// `next/dist/compiled/next-server/pages.runtime.prod.js`, which isn't packaged
// into App-Router Lambdas, producing a runtime MODULE_NOT_FOUND on Vercel.
// (Source: packages/next/src/build/webpack-config.ts, search for
// `NormalModuleReplacementPlugin(/\.\/(.+)\.shared-runtime$/`.)
//
// To work around: split server and client branches on `typeof window`. Next's
// webpack DefinePlugin substitutes this at compile time, enabling dead-code
// elimination so each bundle only sees its own branch.
//   - Server bundle: the `if` branch survives, with `eval("require")` hiding
//     the literal path from webpack's static analyzer so the layer-aware
//     plugin never matches it. Node resolves the path at runtime to the real
//     shared-runtime.js, which exports the contexts directly.
//   - Client bundle: the `else` branch survives, with a static `require()`
//     using an inlined string literal so webpack bundles the module normally.
//     (A variable would resolve to webpack's "missing module" stub at runtime
//     and throw.) The layer-aware plugin only runs on `isNodeServer` builds,
//     so the client resolves it correctly via the standard module graph,
//     producing the same context instance Next's own client-side
//     LayoutRouter uses.
//
// When next fixes the upstream bug, this can collapse back to a single static
// import.

const LayoutRouterContext: React.Context<unknown> = (() => {
  if (typeof window === "undefined") {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, no-eval
    const req = eval("require") as (id: string) => any;
    return req("next/dist/shared/lib/app-router-context.shared-runtime")
      .LayoutRouterContext;
  }
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  return require("next/dist/shared/lib/app-router-context.shared-runtime")
    .LayoutRouterContext;
})();

export function FrozenRouter({ children }: { children: React.ReactNode }) {
  const context = React.useContext(LayoutRouterContext);

  // Capture once per component instance. AnimatePresence keeps this instance
  // mounted for the exit animation, so this snapshot is what the exiting
  // subtree will see for its remaining lifetime.
  const frozenContext = React.useRef(context);

  return (
    <LayoutRouterContext.Provider value={frozenContext.current}>
      {children}
    </LayoutRouterContext.Provider>
  );
}