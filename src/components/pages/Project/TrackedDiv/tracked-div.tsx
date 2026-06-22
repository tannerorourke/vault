"use client"

import { ComponentProps, useCallback } from "react";

import { useAppContext } from "@/components/providers/AppProvider";


type ProjectRootProps = ComponentProps<"main"> & {
  pid: string;
}

export function TrackedDiv({
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
    <div {...rest} ref={trackScroll}>
      {children}
    </div>
  );
}