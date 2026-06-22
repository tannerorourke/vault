"use client";

import { useScrollContainer } from "@/components/providers/ContentTransitionProvider";
import { useDrawer } from "@/components/providers/DrawerProvider";

import { useExploreCharge } from "@/components/pages/Home/ScrollCue/use-explore-charge";

/**
 * Headless controller for the scroll-cue gateway that lives in the shell layout so
 * the overscroll -> open/close drawer behavior is active on every route, incl. 
 * project pages and over an open drawer
 */
export function ScrollGateway() {
  const scrollRef = useScrollContainer();
  const { open, openDrawer, closeDrawer } = useDrawer();

  useExploreCharge({ scrollRef, open, openDrawer, closeDrawer });

  return null;
}
