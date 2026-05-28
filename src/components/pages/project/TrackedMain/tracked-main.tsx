"use client"

import { ComponentProps, useCallback } from "react";

import { useAppContext } from "@/components/navigation/AppProvider";


type ProjectRootProps = ComponentProps<"main"> & {
  pid: string;
}

export function TrackedMain({
  pid,
  children,
  ...rest
}: ProjectRootProps) {
  const { viewedProjects, markProjectViewed } = useAppContext();

  const trackScroll = useCallback((el: HTMLElement | null) => {
    if (!el || viewedProjects.has(pid)) 
      return;
    
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const scrollPct = 0.5;
      if (-rect.top >= rect.height * scrollPct) {
        markProjectViewed(pid);
        window.removeEventListener("app-scroll", onScroll);
      }
    };
    window.addEventListener("app-scroll", onScroll);
    return () => window.removeEventListener("app-scroll", onScroll);
  }, [pid, viewedProjects, markProjectViewed]);

  return (
    <main {...rest} id="main-content" tabIndex={-1} ref={trackScroll}>
      {children}
    </main>
  );
}