import { mq } from "@/lib/theme/responsive.css";
import { theme } from "@/lib/theme/theme.css";
import { style } from "@vanilla-extract/css";

const PILL_W = 40;
const COLLAPSED_H = 40;
const OPEN_H = 210; // calc with static for exact

export const toolbarWrap = style({
  position: "fixed",
  right: 24,
  bottom: 24,
  display: "flex", flexWrap: "nowrap",
  alignItems: "flex-end",
  gap: 16,
  zIndex: theme.layout.zIndex.sidebar,

  [mq.md]: {
    position: "initial"
  }
})

// Mobile: a pill that morphs height. Desktop: fixed column in top left
export const toolbar = style({
  // position: "fixed",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-end",
  width: PILL_W,
  height: COLLAPSED_H,
  background: theme.color.card,
  border: `1px solid ${theme.color.divider}`,
  borderRadius: 999,
  boxShadow: `0 4px 20px -2px ${theme.color.shadow}`,
  overflow: "hidden",
  transition: "height 320ms cubic-bezier(.2,.8,.2,1), border-color 200ms ease",
  "@media": {
    "(prefers-reduced-motion: reduce)": { transition: "none" },
  },
  [mq.md]: {
    position: "fixed",
    left: 0, 
    top: theme.layout.headerOffset.md,
    width: theme.layout.gutterWidth,
    height: "auto",
    zIndex: theme.layout.zIndex.sidebar,
    padding: 0,
    background: "transparent",
    border: "none",
    borderRadius: 0,
    boxShadow: "none",
    overflow: "visible",
    transition: "none",
  },
});
  export const toolbarOpen = style({
    height: OPEN_H,
    [mq.md]: { height: "auto" },
  });


  // Social list: stacked above the chevron, fades in on open (mobile). always visible (desktop)
  export const list = style({
    display: "flex",
    flexDirection: "column-reverse",
    alignItems: "center",
    gap: "16px",
    padding: "10px 0 6px 0",
    listStyle: "none",
    pointerEvents: "none",
    // fade-in and raise icons on toolbar open
    opacity: 0,
    visibility: "hidden",
    transform: "translateY(12px)",
    transition:
      "opacity 250ms ease, transform 500ms cubic-bezier(.2,.8,.2,1), visibility 0s linear 250ms",
    // reset and place in static column
    [mq.md]: {
      flexDirection: "column",
      gap: '24px',
      padding: 0,
      margin: '0 16px 0 0',
      opacity: 1,
      visibility: "visible",
      transform: "none",
      pointerEvents: "auto",
      transition: "none",
    },
  });
    export const listOpen = style({
      opacity: 1,
      visibility: "visible",
      transform: "translateY(0)",
      pointerEvents: "auto",
      transition:
        "opacity 250ms ease, transform 500ms cubic-bezier(.2,.8,.2,1), visibility 0s linear 0s",
      transitionDelay: "80ms",
    });


    export const item = style({
      display: "grid",
      placeItems: "center",
      color: theme.color.text.secondary,
      transition: "color 300ms ease, transform 200ms cubic-bezier(0.4, 0, 0.2, 1)",
      selectors: {
        "&:hover": {
          color: theme.color.text.primary,
          transform: "translateY(-1px)",
        },
      },
    });

    
// bottom of the pill on mobile, hidden on desktop.
export const toolbarMbToggle = style({
  flexShrink: 0,
  zIndex: theme.layout.zIndex.sidebar,
  [mq.md]: { 
    display: "none !important" 
  },
});

export const themeToggle = style({
  // set own styles, out of z-context from sidebar links
  [mq.md]: { 
    position: "fixed",
    bottom: '24px',
    right: '24px',
    zIndex: theme.layout.zIndex.sidebar
  },
});
