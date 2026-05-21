"use client";

import * as React from "react";

// FrozenRouter: prevents the exiting page's route context from being torn
// down before the exit animation completes. We capture the context value on
// first render and hold it stable for the lifetime of this component instance.
//
// NOTE: Previously used `next/dist/shared/lib/app-router-context.shared-runtime`
// directly, which in Next.js 16 routes through the Pages Router vendored module
// chain and blows up with MODULE_NOT_FOUND on pages.runtime.prod.js.
// This version captures context at the React element level instead.

export function FrozenRouter({ children }: { children: React.ReactNode }) {
  // Freeze the subtree: capture children on first render only.
  // This keeps the exiting page's component tree alive and unchanged
  // while Framer Motion runs the exit animation.
  const frozen = React.useRef<React.ReactNode>(null);
  if (frozen.current === null) {
    frozen.current = children;
  }

  return <>{frozen.current}</>;
}