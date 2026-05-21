import { style } from "@vanilla-extract/css";
import { theme } from "@/lib/theme/theme.css";

export const shell = style({
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  position: "relative",
  overflow: 'hidden',
})

export const content = style({
  position: 'fixed',
  inset: 0,
  zIndex: theme.layout.zIndex.content,
});
