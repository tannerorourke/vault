import { globalStyle, keyframes, style } from "@vanilla-extract/css";


// Scroll container for the routed content. Preserves the prior layout
// (absolute fill inside the shell's fixed content frame, scroll inside the
// pane rather than on <body>, no visible scrollbar).
export const scrollContainer = style({
  position: "absolute",
  inset: 0,
  overflow: "auto",
  scrollBehavior: "smooth",
  isolation: "isolate",
  scrollbarWidth: "none",
  msOverflowStyle: "none",
});

globalStyle(`.${scrollContainer}::-webkit-scrollbar`, { display: "none" });


// --- View Transitions API animations -----------------------------------
//
// Direction is set by ContentTransitionProvider on <html data-page-transition>
// (and as a CSS custom property --page-transition-direction for inspection).
// The browser creates ::view-transition-old(root) and ::view-transition-new(root)
// pseudo-elements during a navigation; we attach keyframes to them per direction.
//
// Duration / easing match the previous motion config (400ms, cubic-bezier
// reconstructed from the AnimatePresence config).

const DURATION = "400ms";
const EASING = "cubic-bezier(0.5, 0, 0.3, 0.9)";

const slideOutToLeft = keyframes({
  from: { transform: "translate3d(0, 0, 0)" },
  to: { transform: "translate3d(-100%, 0, 0)" },
});
const slideInFromRight = keyframes({
  from: { transform: "translate3d(100%, 0, 0)" },
  to: { transform: "translate3d(0, 0, 0)" },
});

const slideOutToRight = keyframes({
  from: { transform: "translate3d(0, 0, 0)" },
  to: { transform: "translate3d(100%, 0, 0)" },
});
const slideInFromLeft = keyframes({
  from: { transform: "translate3d(-100%, 0, 0)" },
  to: { transform: "translate3d(0, 0, 0)" },
});

const slideOutToTop = keyframes({
  from: { transform: "translate3d(0, 0, 0)" },
  to: { transform: "translate3d(0, -100%, 0)" },
});
const slideInFromBottom = keyframes({
  from: { transform: "translate3d(0, 100%, 0)" },
  to: { transform: "translate3d(0, 0, 0)" },
});

const slideOutToBottom = keyframes({
  from: { transform: "translate3d(0, 0, 0)" },
  to: { transform: "translate3d(0, 100%, 0)" },
});
const slideInFromTop = keyframes({
  from: { transform: "translate3d(0, -100%, 0)" },
  to: { transform: "translate3d(0, 0, 0)" },
});

// Default timing for both pseudo-elements; animation-name is set per-direction
// below so unknown / "none" directions stay inert.
globalStyle("::view-transition-old(root), ::view-transition-new(root)", {
  animationDuration: DURATION,
  animationTimingFunction: EASING,
  animationFillMode: "both",
});

// Run old + new in place (not stacked) so the slide reads as one motion.
globalStyle("::view-transition-group(root)", {
  animationDuration: DURATION,
  animationTimingFunction: EASING,
});

// Direction = "left": outgoing exits to the left, incoming enters from the right.
globalStyle(`html[data-page-transition="left"]::view-transition-old(root)`, {
  animationName: slideOutToLeft,
});
globalStyle(`html[data-page-transition="left"]::view-transition-new(root)`, {
  animationName: slideInFromRight,
});

// Direction = "right": outgoing exits to the right, incoming enters from the left.
globalStyle(`html[data-page-transition="right"]::view-transition-old(root)`, {
  animationName: slideOutToRight,
});
globalStyle(`html[data-page-transition="right"]::view-transition-new(root)`, {
  animationName: slideInFromLeft,
});

// Direction = "up": outgoing exits to the top, incoming enters from the bottom.
globalStyle(`html[data-page-transition="up"]::view-transition-old(root)`, {
  animationName: slideOutToTop,
});
globalStyle(`html[data-page-transition="up"]::view-transition-new(root)`, {
  animationName: slideInFromBottom,
});

// Direction = "down": outgoing exits to the bottom, incoming enters from the top.
globalStyle(`html[data-page-transition="down"]::view-transition-old(root)`, {
  animationName: slideOutToBottom,
});
globalStyle(`html[data-page-transition="down"]::view-transition-new(root)`, {
  animationName: slideInFromTop,
});

// Direction = "none": same-route refresh, suppress the cross-fade default.
globalStyle(
  `html[data-page-transition="none"]::view-transition-old(root), html[data-page-transition="none"]::view-transition-new(root)`,
  { animation: "none" },
);

// Reduced motion: collapse all directional animations to instant.
globalStyle("::view-transition-old(root), ::view-transition-new(root)", {
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      animation: "none",
    },
  },
});
