import { style, globalStyle } from "@vanilla-extract/css";

export const transitionMotionDiv = style({
  position: "absolute",
  inset: 0,
  overflow: "auto",
  scrollBehavior: "smooth",
  isolation: "isolate",
  scrollbarWidth: "none",
  msOverflowStyle: "none",
});


globalStyle(`.${transitionMotionDiv}::-webkit-scrollbar`, { display: "none" });