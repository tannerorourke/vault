import { EASE_CUBIC } from "@/lib/theme/responsive.css";
import { theme } from "@/lib/theme/theme.css";
import { globalStyle, style } from "@vanilla-extract/css";


export const drawer = style({
  position: "fixed",
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: theme.zIndex.sidebar,

  maxHeight: "80vh",
  overflowY: "auto",
  overscrollBehavior: "contain",
  scrollbarWidth: "none",
  msOverflowStyle: "none",

  background: theme.color.card.main,
  borderTop: `1px solid ${theme.color.divider}`,
  borderRadius: `${theme.sheet.radius} ${theme.sheet.radius} 0 0`,
  boxShadow: `0 -16px 48px -20px ${theme.color.shadowStrong}`,
  viewTransitionName: "drawer-bottom",

  transform: "translateY(100%)",
  transition: `transform 380ms ${EASE_CUBIC}`,
  willChange: "transform",

  selectors: {
    '&[data-bottom-drawer-open="true"]': { transform: "translateY(0)" },
  },
  "@media": {
    "(prefers-reduced-motion: reduce)": { transition: "none" },
  },
});

globalStyle(`.${drawer}::-webkit-scrollbar`, { display: "none" });

export const inner = style({
  display: "flex",
  flexDirection: "column",
  gap: theme.space._12,
  padding: `${theme.page.marginTop.xs} ${theme.page.gutter.xs} ${theme.space._32}`,
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
