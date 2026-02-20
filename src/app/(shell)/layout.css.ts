import { mq } from "@/lib/theme/responsive.css";
import { style } from "@vanilla-extract/css";

export const shell = style({
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
})

export const content = style({
  position: "relative",
  minHeight: 0,
  flex: 1,
  overflow: "hidden",
})