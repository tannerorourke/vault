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

  // fade content to transparent in header zone
  maskImage: `linear-gradient(to bottom, 
    transparent 0px, 
    transparent calc(${theme.layout.headerHeight} - 32px),
    black ${theme.layout.headerHeight}
  )`,
  WebkitMaskImage: `linear-gradient(to bottom, 
    transparent 0px, 
    transparent calc(${theme.layout.headerHeight} - 32px),
    black ${theme.layout.headerHeight}
  )`,
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