"use client";

import {
  createContext, useContext, RefObject, ReactNode,
  useRef, useLayoutEffect, useEffect
} from "react";
import { usePathname } from "next/navigation";

import * as sty from "./content-transition-provider.css";


const ScrollContainerContext = createContext<RefObject<HTMLDivElement | null> | null>(null);

export function useScrollContainer() {
  return useContext(ScrollContainerContext);
}


type RouteKind = "home" | "contact" | "project";

function getRouteKind(pathname: string): RouteKind {
  if (pathname === "/") return "home";
  if (pathname.startsWith("/contact")) return "contact";
  return "project";
}

type Direction = "left" | "right" | "up" | "down" | "none";

// push: link clicks, router.push, replace, reload
// back/forward: browser-history traversals
export type NavKind = "push" | "back" | "forward";

/**
 * Derive routing direction for a page transition.
 * left : fromPath enters from right, toPath exits to left
 * right: fromPath enters from left, toPath exits to right
 * down : fromPath enters from top, toPath exits to bottom
 * up   : fromPath enters from bottom, toPath exits to top
 */
export function getDirection(
  fromPath: string | null,
  toPath: string,
  navKind: NavKind = "push",
): Direction {
  if (!fromPath || fromPath === toPath) return "none";

  const from = getRouteKind(fromPath);
  const to = getRouteKind(toPath);

  if (from === "project" && to === "project") {
    return navKind === "back" ? "down" : "up";
  }

  if (from === to) return "none";
  if (to === "contact") return "right";
  if (from === "contact") return "left";
  if (to === "project") return "left";
  if (from === "project") return "right";

  return "none";
}


type NavigateEventLike = {
  navigationType: "push" | "replace" | "traverse" | "reload";
  destination?: { index: number };
};
type NavigationHistoryEntryLike = { index: number };
type NavigationLike = {
  currentEntry?: NavigationHistoryEntryLike | null;
  addEventListener: (type: "navigate", listener: (e: NavigateEventLike) => void) => void;
  removeEventListener: (type: "navigate", listener: (e: NavigateEventLike) => void) => void;
};

export function ContentTransitionProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const previousPathRef = useRef<string | null>(null);
  const navKindRef = useRef<NavKind>("push");
  const scrollRef = useRef<HTMLDivElement>(null);

  /** onNavigate capture navigation type to send to useLayoutEffect
   *  - push: link clicks, router.push, replace, reload
   *  - traverse: back/forward buttons
   *    - Note: navigation.currentEntry still points at the source when the event fires
   *  - reload is a no-op 
   * */
  useEffect(() => {
    if (typeof window === "undefined") return;
    const nav = (window as unknown as { navigation?: NavigationLike }).navigation;
    if (!nav) return;
    
    const onNavigate = (e: NavigateEventLike) => {
      if (e.navigationType === "traverse") {
        const fromIdx = nav.currentEntry?.index ?? 0;
        const toIdx = e.destination?.index ?? 0;
        navKindRef.current = toIdx < fromIdx ? "back" : "forward";
      } else if (e.navigationType === "push") {
        navKindRef.current = "push";
      }
    };
    nav.addEventListener("navigate", onNavigate);
    return () => nav.removeEventListener("navigate", onNavigate);
  }, []);

  /** Navigation occurs -> navKindRef set
   * --> this component writes direction to <html> synchronously
   * --> next-view-transitions runs the react commit inside startViewTransition's callback 
   * */
  useLayoutEffect(() => {
    const navKind = navKindRef.current;
    const direction = getDirection(previousPathRef.current, pathname, navKind);
    document.documentElement.dataset.pageTransition = direction;
    document.documentElement.style.setProperty("--page-transition-direction", direction);

    // because page content is absolute positioned, reset scroll on cross-route nav's
    if (previousPathRef.current !== null) {
      const hash = window.location.hash.slice(1);
      const target = hash ? document.getElementById(hash) : null;
      if (target) target.scrollIntoView({ behavior: "instant", block: "start" });
      else scrollRef.current?.scrollTo({ top: 0, behavior: "instant" });
    }

    previousPathRef.current = pathname;
    navKindRef.current = "push";
  }, [pathname]);

  // Resolve hash anchor scroll on load
  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash.slice(1);
    if (!hash) return;
    const el = document.getElementById(hash);
    if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
  }, []);

  return (
    <ScrollContainerContext.Provider value={scrollRef}>
      <div
        ref={scrollRef}
        className={sty.scrollContainer}
        onScroll={(e) => {
          const scrollTop = (e.currentTarget as HTMLElement).scrollTop;
          window.dispatchEvent(
            new CustomEvent("app-scroll", { detail: { scrollTop } }),
          );
        }}
      >
        {children}
      </div>
    </ScrollContainerContext.Provider>
  );
}
