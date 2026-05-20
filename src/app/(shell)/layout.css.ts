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

// fades content under the header zone
export const headerFade = style({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  height: `calc(${theme.layout.headerHeight} + ${theme.space._24})`,
  background: `linear-gradient(to bottom, ${theme.color.canvas} 40%, transparent)`,
  pointerEvents: 'none',
  zIndex: 9,
});

