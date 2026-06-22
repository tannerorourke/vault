import { EASE_CUBIC, mq } from "@/lib/theme/responsive.css";
import { theme } from "@/lib/theme/theme.css";
import { globalStyle, style } from "@vanilla-extract/css";


export const drawer = style({
  position: "fixed",
  width: "clamp(320px, 80vw, 460px)",
  [mq.sm]: { width: "360px" },
  [mq.md]: {
    // matches SIDEBAR_W in content-transition-provider.css.ts so pushed
    // content fills exactly the space this drawer doesn't take
    width: "min(35vw, 400px)",
  },
  insetBlock: 0,
  zIndex: theme.zIndex.sidebar,
  background: theme.color.card,
  overflowY: "auto",
  overflowX: "hidden",
  // The close-gesture overscrolls past the drawer's edge; don't chain it.
  overscrollBehavior: "contain",
  scrollbarWidth: "none",
  msOverflowStyle: "none",

  transition: `transform 380ms ${EASE_CUBIC}`,
  willChange: "transform",

  selectors: {
    // higher specificity than the side variants' resting transform
    '&[data-open="true"]': { transform: "translateX(0)" },
  },
  "@media": {
    "(prefers-reduced-motion: reduce)": { transition: "none" },
  },
});

globalStyle(`.${drawer}::-webkit-scrollbar`, { display: "none" });

// Contact panel slide in from the left edge.
export const left = style({
  left: 0,
  transform: "translateX(-100%)",
  borderRight: `1px solid ${theme.color.divider}`,
  // distinct name per panel
  viewTransitionName: "sidebar-left",
});

// Work panel slide in from right edge
export const right = style({
  right: 0,
  transform: "translateX(100%)",
  borderLeft: `1px solid ${theme.color.divider}`,
  viewTransitionName: "sidebar-right",
});

export const inner = style({
  display: "flex",
  flexDirection: "column",
  gap: theme.space._12,
  minHeight: "100%",
  padding: `${theme.page.marginTop.xs} ${theme.space._20} ${theme.space._24}`,
  [mq.sm]: {
    padding: `${theme.page.marginTop.sm} ${theme.space._24} ${theme.space._32}`,
  },
});
    export const top = style({
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    });

export const title = style({
  margin: 0,
  paddingInline: theme.space._4,
});
