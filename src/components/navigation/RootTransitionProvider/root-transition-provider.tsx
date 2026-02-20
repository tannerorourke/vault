"use client";

import { useRef, useMemo, useEffect, ReactNode } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { usePathname } from "next/navigation";
import { FrozenRouter } from "@/lib/utils/FrozenRouter";

// ---------- route + plan ----------
type RouteKind = "profile" | "home" | "project";
type RootDirection = "left" | "right";
type ContentDirection = "up" | "down";

type TransitionPlan =
  | { lane: "root"; dir: RootDirection }
  | { lane: "content"; dir: ContentDirection }
  | { lane: "none" };

const getRouteKind = (path: string): RouteKind =>
  path.startsWith("/profile") ? "profile" : 
  path.startsWith("/projects/") ? "project" : 
  "home";




function getTransitionPlan(fromPath: string | null, toPath: string): TransitionPlan {
  if (!fromPath) return { lane: "none" };

  const from = getRouteKind(fromPath);
  const to = getRouteKind(toPath);

  // Profile lives to the right of main content stack.
  // transition to/from Profile slides horizontally
  if (to === "profile")
    return { lane: "root", dir: "left" };
  if (from === "profile")
    return { lane: "root", dir: "right" };

  // Home and projects live in a vertical stack.
  // Transition  slides vertically
  if (from === "project" && to === "home")
    return { lane: "content", dir: "up" };
  if (from === "home" && to === "project")
    return { lane: "content", dir: "down" };

  // Error pages default to no transition and will render as normal.
  return { lane: "none" };
}

// ---------- root animation ----------
type RootCustom = { dir: RootDirection; active: boolean };

const rootVariants: Variants = {
  initial: (custom: RootCustom) => {
    if (!custom.active) return { x: "0%" };
    return { x: custom.dir === "left" ? "100%" : "-100%" };
  },
  animate: () => ({ x: "0%" }),
  exit: (custom: RootCustom) => {
    if (!custom.active) return { x: "0%" };
    return { x: custom.dir === "left" ? "-100%" : "100%" };
  },
};

function getRootMode(pathname: string): "shell" | "profile" {
  return pathname.startsWith("/profile") ? "profile" : "shell";
}

export function RootTransitionProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const mode = getRootMode(pathname);

  const previousPathRef = useRef<string | null>(null);

  const plan = useMemo(
    () => getTransitionPlan(previousPathRef.current, pathname),
    [pathname]
  );

  useEffect(() => {
    previousPathRef.current = pathname;
  }, [pathname]);

  const shouldAnimateRoot = plan.lane === "root";
  const rootCustom: RootCustom = {
    dir: plan.lane === "root" ? plan.dir : "left",
    active: shouldAnimateRoot,
  };

  return (
    <div style={{ position: "relative", overflow: "hidden", minHeight: "100vh" }}>
      <AnimatePresence mode="sync" initial={false} custom={rootCustom}>
        <motion.div
          key={mode}
          custom={rootCustom}
          variants={rootVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.3, ease: "easeInOut" }}
          style={{ position: "absolute", inset: 0, width: "100%", minHeight: "100vh" }}
        >
          <FrozenRouter>{children}</FrozenRouter>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}