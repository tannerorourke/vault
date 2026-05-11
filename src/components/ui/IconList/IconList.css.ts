import { mq } from "@/lib/theme/responsive.css";
import { theme } from "@/lib/theme/theme.css";
import { style } from "@vanilla-extract/css";

export const iconList = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  margin: '0',
  [mq.md]: {
    // flexDirection: "column",
    margin: '0 36px 0 0',
    width: "48px",
    
  }
});

export const sidebarItem = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: `0`,
  height: theme.space._48,
  [mq.md]: {
    margin: `0 0 ${theme.space._24} 0`,
    height: theme.space._36,
  }
});

export const sidebarItemIcon = style({
  color: theme.color.text.primary,
  transition: 'color 300ms ease',
  selectors: {
    "&:hover": {
      color: theme.color.text.primary, /* Deep Obsidian */
    },
  },
})