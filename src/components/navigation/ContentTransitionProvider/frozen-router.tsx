"use client";

import * as React from "react";
import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";


type LayoutRouterContextValue = React.ContextType<typeof LayoutRouterContext>;

export function FrozenRouter({ children }: { children: React.ReactNode }) {
  const contextValue = React.useContext(LayoutRouterContext);
  const frozenContext = React.useRef<LayoutRouterContextValue>(contextValue).current;

  return (
    <LayoutRouterContext.Provider value={frozenContext}>
      {children}
    </LayoutRouterContext.Provider>
  );
}
