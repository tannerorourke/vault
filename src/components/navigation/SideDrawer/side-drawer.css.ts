import { globalStyle, style } from "@vanilla-extract/css";
import { theme } from "@/lib/theme/theme.css";
import { mq, EASE_CUBIC, breakpoints } from "@/lib/theme/responsive.css";


export const drawerWidth = {
  xs: "100vw",
  sm: `max(50vw, ${breakpoints.sm}px)`,
  // matches SIDEBAR_W in content-transition-provider.css.ts so the pushed
  // content fills exactly the space this drawer doesn't take
  md: `max(35vw, ${breakpoints.sm}px)`
};

export const drawer = style({
  position: "fixed",
  width: drawerWidth.xs,
  [mq.sm]: { width: drawerWidth.sm },
  [mq.md]: { width: drawerWidth.md },
  top: 0,
  bottom: 0,
  zIndex: theme.zIndex.sidebar,
  background: theme.color.card.main,
  overflowY: "auto",
  overflowX: "hidden",
  overscrollBehavior: "contain",
  scrollbarWidth: "none",
  msOverflowStyle: "none",

  transition: `transform 380ms ${EASE_CUBIC}`,
  willChange: "transform",

  selectors: {
    '&[data-drawer-open="true"]': { transform: "translateX(0)" },
  },
  "@media": {
    "(prefers-reduced-motion: reduce)": { transition: "none" },
  },
});

globalStyle(`.${drawer}::-webkit-scrollbar`, { display: "none" });

export const left = style({
  left: 0,
  transform: "translateX(-100%)",
  borderRight: `1px solid ${theme.color.divider}`,
  viewTransitionName: "drawer-side-left",
});

export const right = style({
  right: 0,
  transform: "translateX(100%)",
  borderLeft: `1px solid ${theme.color.divider}`,
  viewTransitionName: "drawer-side",
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
