"use client";

import * as React from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { usePathname } from "next/navigation";

type RouteKind = "profile" | "home" | "project";
function getRouteKind(pathname: string): RouteKind {
  if (pathname.startsWith("/profile")) return "profile";
  if (pathname.startsWith("/projects/")) return "project";
  return "home";
}

type ContentDirection = "up" | "down";
type RootDirection = "left" | "right";

type TransitionPlan =
  | { lane: "root"; dir: RootDirection }
  | { lane: "content"; dir: ContentDirection }
  | { lane: "none" };

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

type ContentCustom = { dir: ContentDirection };

const contentVariants: Variants = {
  initial: (custom: ContentCustom) => ({
    // "down" => enter from top; "up" => enter from bottom
    y: custom.dir === "down" ? "-100%" : "100%",
  }),
  animate: { y: "0%" },
  exit: (custom: ContentCustom) => ({
    y: custom.dir === "down" ? "100%" : "-100%",
  }),
};

function getShellViewKey(pathname: string): "home" | "project" {
  return pathname.startsWith("/projects/") ? "project" : "home";
}

export function ContentTransitionProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const viewKey = getShellViewKey(pathname);

  const previousPathRef = React.useRef<string | null>(null);
  const [plan, setPlan] = React.useState<TransitionPlan>({ lane: "none" });

  React.useEffect(() => {
    const fromPath = previousPathRef.current;
    const toPath = pathname;

    setPlan(getTransitionPlan(fromPath, toPath));
    previousPathRef.current = toPath;
  }, [pathname]);

  const shouldAnimateContent = plan.lane === "content";
  const contentCustom: ContentCustom = {
    dir: plan.lane === "content" ? plan.dir : "down",
  };

  return (
    <AnimatePresence mode="sync" initial={false} custom={contentCustom}>
      <motion.div
        // key={viewKey}
        key={viewKey}
        custom={contentCustom}
        variants={shouldAnimateContent ? contentVariants : undefined}
        initial={shouldAnimateContent ? "initial" : false}
        animate={shouldAnimateContent ? "animate" : false}
        exit={shouldAnimateContent ? "exit" : undefined}
        transition={{ duration: 0.32, ease: "easeInOut" }}
        style={{ position: "absolute", inset: 0, overflow: "auto" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}