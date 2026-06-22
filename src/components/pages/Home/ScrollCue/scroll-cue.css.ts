import { style, keyframes } from "@vanilla-extract/css";
import { theme } from "@/lib/theme/theme.css";
import { mq } from "@/lib/theme/responsive.css";


export const RING_R = 15;
export const RING_CENTER = 17;
const RING_DIAMETER = RING_CENTER * 2;
const CIRCUMFERENCE = 2 * Math.PI * RING_R;


export const cueWrap = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
  [mq.sm]: {
    justifyContent: "flex-start",
  },
});

export const scrollCuePositioner = style({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: theme.space._12,
  padding: `${theme.space._12} ${theme.space._16}`,
  borderRadius: theme.sheet.radius,
  boxShadow: theme.sheet.shadow,
  background: "none",
  border: "none",
  opacity: 0.7,
  color: theme.color.text.secondary,
  pointerEvents: "auto",
  cursor: "pointer",
  transition: "opacity 180ms ease",
  selectors: {
    "&:hover": { opacity: 1 },
    "&:focus-visible": {
      opacity: 1,
      outline: `2px solid ${theme.color.focus}`,
      outlineOffset: "4px",
    },
  },
});

export const chargeRing = style({
  position: "relative",
  display: "grid",
  placeItems: "center",
  width: RING_DIAMETER,
  height: RING_DIAMETER,
  flexShrink: 0,
  color: theme.color.text.secondary,
});

export const ring = style({
  position: "absolute",
  inset: 0,
  width: RING_DIAMETER,
  height: RING_DIAMETER,
  transform: "rotate(-90deg)", // Start arc at 12 o'clock
});

export const ringProgress = style({
  fill: "none",
  stroke: theme.color.primary.main,
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeDasharray: CIRCUMFERENCE,
  strokeDashoffset: `calc(${CIRCUMFERENCE}px * (1 - var(--explore-charge, 0)))`,
  // Charge bumps glide. 
  // Drain is a rAF loop (minuscule per-frame ticks), so
  // the hook sets --explore-charge-anim to 0ms while draining to bypass the
  // transition and let the loop itself be the animation.
  transition: "stroke-dashoffset var(--explore-charge-anim, 200ms) ease",
});

export const ringTrack = style({
  fill: "none",
  stroke: theme.color.tint.primaryWeak,
  strokeWidth: 2,
});

const bounceDown = keyframes({
  "0%, 100%": { transform: "translateY(0)" },
  "40%": { transform: "translateY(4px)" },
});
const bounceUp = keyframes({
  "0%, 100%": { transform: "translateY(0)" },
  "40%": { transform: "translateY(-4px)" },
});

export const iconStack = style({
  position: "relative",
  display: "grid",
  placeItems: "center",
  color: theme.color.primary.main,
  selectors: {
    [`${scrollCuePositioner}[data-arrow="down"] &`]: {
      animation: `${bounceDown} 1.6s ease-in-out infinite`,
    },
    [`${scrollCuePositioner}[data-arrow="up"] &`]: {
      animation: `${bounceUp} 1.6s ease-in-out infinite`,
    },
  },
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      animation: "none",
    },
  },
});

export const labelStack = style({
  display: "grid",
  placeItems: "center start",
  color: theme.color.text.primary,
});

export const layer = style({
  gridArea: "1 / 1",
  transition: "opacity 300ms ease",
  "@media": {
    "(prefers-reduced-motion: reduce)": { transition: "none" },
  },
});

export const labelLayer = style([layer, {
  whiteSpace: "nowrap",
}]);

export const layerShown = style({ opacity: 1 });
export const layerHidden = style({ opacity: 0 });
