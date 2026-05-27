import { globalStyle, keyframes, style } from "@vanilla-extract/css";


// Scroll container for the routed content. Preserves the prior layout
// (absolute fill inside the shell's fixed content frame, scroll inside the
// pane rather than on <body>, no visible scrollbar).
//
// `view-transition-name: page-content` makes only this region the animated
// part of a route change. Everything outside it (header, canvas, shell
// chrome) stays in ::view-transition-*(root) and gets the spec's default
// quick crossfade — which is invisible for the unchanging shell and a clean
// fade for the header's about ↔ back swap. Naming this element instead of
// the header avoids the `contain: paint` clip that would otherwise eat the
// header's blur-band fade-out.
export const scrollContainer = style({
  position: "absolute",
  inset: 0,
  overflow: "auto",
  scrollBehavior: "smooth",
  isolation: "isolate",
  scrollbarWidth: "none",
  msOverflowStyle: "none",
  viewTransitionName: "page-content",
});

globalStyle(`.${scrollContainer}::-webkit-scrollbar`, { display: "none" });


// --- View Transitions API animations -----------------------------------
//
// Direction is set by ContentTransitionProvider on <html data-page-transition>
// (and as a CSS custom property --page-transition-direction for inspection).
// The browser creates ::view-transition-old(page-content) and
// ::view-transition-new(page-content) pseudo-elements during a navigation;
// we attach keyframes to them per direction.
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
globalStyle("::view-transition-old(page-content), ::view-transition-new(page-content)", {
  animationDuration: DURATION,
  animationTimingFunction: EASING,
  animationFillMode: "both",
});

// Run old + new in place (not stacked) so the slide reads as one motion.
globalStyle("::view-transition-group(page-content)", {
  animationDuration: DURATION,
  animationTimingFunction: EASING,
});

// Direction = "left": outgoing exits to the left, incoming enters from the right.
globalStyle(`html[data-page-transition="left"]::view-transition-old(page-content)`, {
  animationName: slideOutToLeft,
});
globalStyle(`html[data-page-transition="left"]::view-transition-new(page-content)`, {
  animationName: slideInFromRight,
});

// Direction = "right": outgoing exits to the right, incoming enters from the left.
globalStyle(`html[data-page-transition="right"]::view-transition-old(page-content)`, {
  animationName: slideOutToRight,
});
globalStyle(`html[data-page-transition="right"]::view-transition-new(page-content)`, {
  animationName: slideInFromLeft,
});

// Direction = "up": outgoing exits to the top, incoming enters from the bottom.
globalStyle(`html[data-page-transition="up"]::view-transition-old(page-content)`, {
  animationName: slideOutToTop,
});
globalStyle(`html[data-page-transition="up"]::view-transition-new(page-content)`, {
  animationName: slideInFromBottom,
});

// Direction = "down": outgoing exits to the bottom, incoming enters from the top.
globalStyle(`html[data-page-transition="down"]::view-transition-old(page-content)`, {
  animationName: slideOutToBottom,
});
globalStyle(`html[data-page-transition="down"]::view-transition-new(page-content)`, {
  animationName: slideInFromTop,
});

// Direction = "none": same-route refresh, suppress the cross-fade default.
globalStyle(
  `html[data-page-transition="none"]::view-transition-old(page-content), html[data-page-transition="none"]::view-transition-new(page-content)`,
  { animation: "none" },
);

// Reduced motion: collapse the page slide to instant. The root crossfade
// for the shell is the spec default and is already quick (~250ms), no need
// to suppress separately.
globalStyle("::view-transition-old(page-content), ::view-transition-new(page-content)", {
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      animation: "none",
    },
  },
});
