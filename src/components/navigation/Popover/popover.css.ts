import { EASE_CUBIC } from "@/lib/theme/responsive.css";
import { theme } from "@/lib/theme/theme.css";
import { style } from "@vanilla-extract/css";


export const wrap = style({
  position: "relative",
  display: "inline-flex",
  alignItems: "center",
});

export const panel = style({
  position: "absolute",
  top: "calc(100% + 12px)",
  width: 260,
  maxWidth: "calc(100vw - 2 * 16px)",
  background: theme.color.card.main,
  border: `1px solid ${theme.color.divider}`,
  borderRadius: 14,
  boxShadow: `0 24px 60px -20px ${theme.color.shadowStrong}, 0 4px 16px -4px ${theme.color.shadow}`,
  padding: "10px 8px",
  zIndex: theme.zIndex.sidebar,

  // closed state
  opacity: 0,
  transform: "translateY(-6px) scale(0.98)",
  pointerEvents: "none",
  transition: `opacity 200ms ease-in-out, transform 240ms ${EASE_CUBIC}`,
  selectors: {
    '&[data-popover-open="true"]': {
      opacity: 1,
      transform: "translateY(0) scale(1)",
      pointerEvents: "auto",
    },
  },
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      transition: "none",
    },
  },
});

export const alignEnd = style({ right: 0 });
export const alignStart = style({ left: 0 });
