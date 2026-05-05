import { mq } from "@/lib/theme/responsive.css";
import { theme } from "@/lib/theme/theme.css";
import { style } from "@vanilla-extract/css";

export const sidebarRoot = style({
  position: "fixed",
  width: '80px',
  marginTop: "156px",
  top: 0,
  left: 0,
  bottom: 0,
  zIndex: theme.layout.zIndex.sidebar
});

export const sidebarList = style({
  display: "flex",
  flexDirection: "row",
  margin: '0 36px 0 0',
  [mq.md]: {
    width: "48px",
    flexDirection: "column",
  },
});

export const sidebarItem = style({
  display: "flex",
  justifyContent: "center",
  margin: `0 0 ${theme.space._24} 0`,
});

export const sidebarItemIcon = style({
  color: 'rgba(244, 246, 245, 0.7)', /* canvas at 70% */
  transition: 'color 300ms ease',
  selectors: {
    "&:hover": {
      color: theme.color.text.primary, /* Deep Obsidian */
    },
  },
})