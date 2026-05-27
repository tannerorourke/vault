"use client";

import * as React from "react";
import { usePathname } from "next/navigation";

import * as sty from "./content-transition-provider.css";


type RouteKind = "home" | "about" | "project";

function getRouteKind(pathname: string): RouteKind {
  if (pathname === "/") return "home";
  if (pathname.startsWith("/about")) return "about";
  return "project"; // any other top-level route is treated as a project page
}

// Direction names describe page motion (where pages move TOWARD).
// "left"  => incoming enters from right, outgoing exits to left
// "right" => incoming enters from left,  outgoing exits to right
// "down"  => incoming enters from top,   outgoing exits to bottom
// "up"    => incoming enters from bottom, outgoing exits to top
type Direction = "left" | "right" | "up" | "down" | "none";

// "push" covers regular link clicks, router.push, replace, reload.
// "back"/"forward" are browser-history traversals.
export type NavKind = "push" | "back" | "forward";

export function getDirection(
  fromPath: string | null,
  toPath: string,
  navKind: NavKind = "push",
): Direction {
  console.log(
    "from: ", fromPath,
    "\nto: ", toPath,
    "\nnavKind: ", navKind
  )
  if (!fromPath || fromPath === toPath) return "none";

  const from = getRouteKind(fromPath);
  const to = getRouteKind(toPath);

  // Project ↔ project: forward feels like sliding up to the next project;
  // browser-back should reverse that and slide down.
  if (from === "project" && to === "project") {
    return navKind === "back" ? "down" : "up";
  }

  if (from === to) return "none";

  // Horizontal transitions
  if (to === "about") return "left";
  if (from === "about") return "right";

  // Vertical transitions
  if (to === "project") return "up";
  if (from === "project") return "down";

  return "none";
}

// Minimal Navigation API surface — typings aren't in lib.dom yet everywhere.
// Note: NavigateEvent has no `from` field; the source entry is read off
// `navigation.currentEntry` (still points at the source when the event fires).
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

export function ContentTransitionProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const previousPathRef = React.useRef<string | null>(null);
  const navKindRef = React.useRef<NavKind>("push");
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const nav = (window as unknown as { navigation?: NavigationLike }).navigation;
    if (!nav) return;

    const onNavigate = (e: NavigateEventLike) => {
      // Only react to the events that represent a real route change.
      // After a traverse, next-view-transitions / Next.js fires a follow-up
      // "replace" to write post-nav history state — if we treated that as a
      // push, it would clobber the "back" we just set, before useLayoutEffect
      // got a chance to read it. "reload" is similarly internal noise.
      if (e.navigationType === "traverse") {
        const fromIdx = nav.currentEntry?.index ?? 0;
        const toIdx = e.destination?.index ?? 0;
        navKindRef.current = toIdx < fromIdx ? "back" : "forward";
      } else if (e.navigationType === "push") {
        navKindRef.current = "push";
      }
      console.log(
        "[nav] navigationType:", e.navigationType,
        "fromIdx:", nav.currentEntry?.index,
        "toIdx:", e.destination?.index,
        "→ navKind:", navKindRef.current,
      );
    };
    nav.addEventListener("navigate", onNavigate);
    return () => nav.removeEventListener("navigate", onNavigate);
  }, []);

  // Writes the direction onto <html> synchronously before the browser captures
  // the new view-transition snapshot. next-view-transitions runs the React
  // commit inside startViewTransition's callback, so this useLayoutEffect
  // resolves before the "new" snapshot is taken — the keyed CSS animations
  // pick up the direction correctly.
  React.useLayoutEffect(() => {
    const navKind = navKindRef.current;
    const direction = getDirection(previousPathRef.current, pathname, navKind);
    document.documentElement.dataset.pageTransition = direction;
    document.documentElement.style.setProperty("--page-transition-direction", direction);

    // Reset scroll on cross-route navigations. The scroll container persists
    // across navigations (same div instance), so without this the new page
    // inherits the previous page's scrollTop and lands mid-page. Skip on
    // initial mount so the hash-restore effect below can land at #foo.
    if (previousPathRef.current !== null) {
      scrollRef.current?.scrollTo({ top: 0, behavior: "instant" });
    }

    previousPathRef.current = pathname;
    // Reset so a stale "back" (e.g. from a cancelled traversal) can't leak
    // into the next push navigation.
    navKindRef.current = "push";
  }, [pathname]);

  // Resolve a hash anchor on initial load. The scrollable region below is a
  // nested div, not <body>, and browsers don't reliably fall through to
  // nested scroll contexts for fragment URLs — handle it explicitly so a
  // refreshed/bookmarked /foo#bar lands at #bar instead of the top.
  React.useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash.slice(1);
    if (!hash) return;
    const el = document.getElementById(hash);
    if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
  }, []);

  return (
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
  );
}
