import { style } from "@vanilla-extract/css";
import { theme } from "@/lib/theme/theme.css";
import { mq } from "@/lib/theme/responsive.css";

export const shell = style({
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  position: "relative",
})

export const content = style({
  position: 'fixed',
  inset: 0,
  zIndex: theme.layout.zIndex.content,
});

// Replaces the old maskImage: fades content under the header zone.
// Lives inside .content (same stacking context as cards) so it doesn't
// create an isolated compositor group the way maskImage would.
export const headerFade = style({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  height: `calc(${theme.layout.headerHeight} + 16px)`,
  background: `linear-gradient(to bottom, ${theme.color.canvas} 40%, transparent)`,
  pointerEvents: 'none',
  zIndex: 9,
});

export const sidebarRoot = style({
  position: "fixed",
  zIndex: theme.layout.zIndex.sidebar,
  bottom: theme.space._24,
  right: '92px',
  [mq.md]: {
    width: theme.layout.gutterWidth,
    marginTop: theme.layout.headerHeight,
    padding: `${theme.space._56} 0 0`,
    top: 0, left: 0
  }
});