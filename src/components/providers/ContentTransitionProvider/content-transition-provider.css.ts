import { theme } from "@/lib/theme/theme.css";
import { EASE_CUBIC, breakpoints } from "@/lib/theme/responsive.css";
import { globalStyle, keyframes, style } from "@vanilla-extract/css";


// Both scroll container and animated content on route change
export const scrollContainer = style({
  position: "absolute",
  inset: 0,
  overflow: "auto",
  background: theme.color.surfaceAlt,
  overscrollBehavior: "contain",
  display: "flex",
  flexDirection: "column",
  scrollBehavior: "smooth",
  isolation: "isolate",
  scrollbarWidth: "none",
  msOverflowStyle: "none",
  viewTransitionName: "page-content",
  zIndex: theme.zIndex.content,
  // Pushed aside by an open drawer
  transition: `left 380ms ${EASE_CUBIC}, right 380ms ${EASE_CUBIC}`,
});

globalStyle(`.${scrollContainer}::-webkit-scrollbar`, { display: "none" });

// [FIX]: When a drawer is open (> md), pull container's edge in by 
// drawer width so drawer + content fill the viewport
// Computed width = min(35vw,400px) = max(65vw, 100vw − 400px).
const SIDEBAR_W = "min(35vw, 400px)";
globalStyle(`html[data-drawer="contact"] .${scrollContainer}`, {
  "@media": { [`(min-width: ${breakpoints.md}px)`]: { left: SIDEBAR_W } },
});
globalStyle(`html[data-drawer="work"] .${scrollContainer}`, {
  "@media": { [`(min-width: ${breakpoints.md}px)`]: { right: SIDEBAR_W } },
});


// --- View Transitions API animations -----------------------------------
//
// Direction is set in ContentTransitionProvider useLayoutEffect on <html data-page-transition>
// The browser creates pseudo elements 
//   ::view-transition-old(page-content) and
//   ::view-transition-new(page-content)
// during a navigation, we attach keyframes to them per direction.

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

// Setup default animation vals
globalStyle("::view-transition-old(page-content), ::view-transition-new(page-content)", {
  animationDuration: DURATION,
  animationTimingFunction: EASING,
  animationFillMode: "both",
});

// Run old + new in place
globalStyle("::view-transition-group(page-content)", {
  animationDuration: DURATION,
  animationTimingFunction: EASING,
  zIndex: theme.zIndex.content,
});
globalStyle("::view-transition-group(sidebar-left), ::view-transition-group(sidebar-right)", {
  zIndex: theme.zIndex.sidebar,
});

// Direction = "left"
globalStyle(
  `html[data-page-transition="left"]::view-transition-old(page-content)`,
  { animationName: slideOutToLeft }
);
globalStyle(
  `html[data-page-transition="left"]::view-transition-new(page-content)`,
  { animationName: slideInFromRight }
);

// Direction = "right"
globalStyle(
  `html[data-page-transition="right"]::view-transition-old(page-content)`,
  { animationName: slideOutToRight }
);
globalStyle(
  `html[data-page-transition="right"]::view-transition-new(page-content)`,
  { animationName: slideInFromLeft }
);

// Direction = "up"
globalStyle(
  `html[data-page-transition="up"]::view-transition-old(page-content)`,
  { animationName: slideOutToTop }
);
globalStyle(
  `html[data-page-transition="up"]::view-transition-new(page-content)`,
  { animationName: slideInFromBottom }
);

// Direction = "down"
globalStyle(
  `html[data-page-transition="down"]::view-transition-old(page-content)`,
  { animationName: slideOutToBottom }
);
globalStyle(
  `html[data-page-transition="down"]::view-transition-new(page-content)`,
  { animationName: slideInFromTop }
);

// Direction = "none": same-route refresh, suppress the cross-fade default.
globalStyle(
  `html[data-page-transition="none"]::view-transition-old(page-content), html[data-page-transition="none"]::view-transition-new(page-content)`,
  { animation: "none" },
);

// Reduced motion: collapse the page slide to instant
globalStyle("::view-transition-old(page-content), ::view-transition-new(page-content)", {
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      animation: "none",
    },
  },
});
