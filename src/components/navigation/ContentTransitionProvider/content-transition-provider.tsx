"use client";

import * as React from "react";
import { AnimatePresence, motion, type Variants } from "motion/react";
import { usePathname } from "next/navigation";

import { FrozenRouter } from "./frozen-router";

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

export function getDirection(fromPath: string | null, toPath: string): Direction {
  if (!fromPath || fromPath === toPath) return "none";

  const from = getRouteKind(fromPath);
  const to = getRouteKind(toPath);
  if (from === to) return "none";

  // Horizontal transitions
  if (to === "about") return "left";
  if (from === "about") return "right";

  // Vertical transitions
  if (to === "project") return "up";
  if (from === "project") return "down";

  return "none";
}

const variants: Variants = {
  initial: (dir: Direction) => {
    switch (dir) {
      case "left":  return { x: "100%",  y: 0 };
      case "right": return { x: "-100%", y: 0 };
      case "down":  return { x: 0, y: "-100%" };
      case "up":    return { x: 0, y: "100%"  };
      default:      return { x: 0, y: 0 };
    }
  },
  animate: { x: 0, y: 0 },
  exit: (dir: Direction) => {
    switch (dir) {
      case "left":  return { x: "-100%", y: 0 };
      case "right": return { x: "100%",  y: 0 };
      case "down":  return { x: 0, y: "100%" };
      case "up":    return { x: 0, y: "-100%" };
      default:      return { x: 0, y: 0 };
    }
  },
};

export function ContentTransitionProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const previousPathRef = React.useRef<string | null>(null);

  const direction = React.useMemo(
    () => getDirection(previousPathRef.current, pathname),
    [pathname]
  );

  React.useEffect(() => {
    previousPathRef.current = pathname;
  }, [pathname]);

  const animate = direction !== "none";

  return (
    <AnimatePresence mode="sync" initial={false} custom={direction}>
      <motion.div
        key={pathname}
        custom={direction}
        variants={animate ? variants : undefined}
        initial={animate ? "initial" : false}
        animate={animate ? "animate" : false}
        exit={animate ? "exit" : undefined}
        transition={{ duration: 0.4, ease: [0.5, 0.0, 0.3, 0.9] }}
        className={sty.transitionMotionDiv}
        onScroll={(e) => {
          // dispatch for
          const scrollTop = (e.currentTarget as HTMLElement).scrollTop;
          window.dispatchEvent(
            new CustomEvent('app-scroll', { detail: { scrollTop } })
          );
        }}
      >
          <FrozenRouter>{children}</FrozenRouter>
      </motion.div>
    </AnimatePresence>
  );
}
