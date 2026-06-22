import { style } from "@vanilla-extract/css";
import { theme } from "@/lib/theme/theme.css";
import { mq } from "@/lib/theme/responsive.css";


export const wrap = style({
  position: 'fixed',
  bottom: theme.page.marginTop.xs,
  right: theme.page.gutter.xs,
  zIndex: theme.zIndex.header,
  display: 'none',
  [mq.sm]: {
    display: 'inline-flex',
    bottom: theme.page.marginTop.sm, right: theme.page.gutter.sm 
  },
  [mq.md]: { bottom: theme.page.marginTop.md, right: theme.page.gutter.md },
  [mq.lg]: { bottom: theme.page.marginTop.lg, right: theme.page.gutter.md },
});

export const heart = style({
  color: theme.color.secondary.main
})