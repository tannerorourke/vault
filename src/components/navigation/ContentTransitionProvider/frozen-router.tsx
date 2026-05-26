"use client";

import * as React from "react";
import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";

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

export function FrozenRouter({ children }: { children: React.ReactNode }) {
  const context = React.useContext(LayoutRouterContext);
  const frozenContext = React.useRef(context);

  return (
    <LayoutRouterContext.Provider value={frozenContext.current}>
      {children}
    </LayoutRouterContext.Provider>
  );
}