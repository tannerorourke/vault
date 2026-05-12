import { mq } from "@/lib/theme/responsive.css";
import { theme, darkTheme } from "@/lib/theme/theme.css";
import { style, globalStyle } from "@vanilla-extract/css";

export const root = style({
  position: "fixed",
  top: 0, left: 0, right: 0,
  width: "100%",
  zIndex: theme.layout.zIndex.header,

  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  height: theme.layout.headerHeight,
  backdropFilter: "blur(1px)",
  WebkitBackdropFilter: "blur(1px)",

  padding: '32px 16px 0 16px',
  [mq.sm]: { padding: '48px 40px 0 40px' },
  [mq.md]: { padding: '56px 80px 0 80px' }
});

export const headerLeft = style({
  display: "flex",
  alignItems: "flex-start",
  gap: 12,
});

export const logoContainer = style({
  width: "300px",
  display: "flex",
  flexDirection: "column",
});

export const filterRow = style({
  display: "inline-flex",
  alignItems: "center",
  gap: "6px",
  padding: "4px",
  borderRadius: "999px",
  background: "rgba(255, 255, 255, 0.55)",
  backdropFilter: "blur(8px)",
  WebkitBackdropFilter: "blur(8px)",
  border: "1px solid rgba(0, 0, 0, 0.04)",
  boxShadow: "0 2px 12px -4px rgba(42, 95, 88, 0.08)",
  marginTop: "2px",
});

globalStyle(`:where(.${darkTheme}) ${filterRow}`, {
  background: "rgba(22, 40, 34, 0.55)",
  border: "1px solid rgba(255, 255, 255, 0.04)",
  boxShadow: "0 2px 12px -4px rgba(0, 0, 0, 0.3)",
});

export const headerRight = style({
  display: "flex",
  alignItems: "center",
  gap: 12,
});

export const profileLinkStyles = style({
  paddingBottom: '2px',
  borderBottom: '2px solid transparent',
  transition: 'border-color 200ms ease',
});

globalStyle(`${profileLinkStyles} *`, {
  color: theme.color.text.secondary, /* Moss Grey */
  transition: 'color 200ms ease',
});

globalStyle(`${profileLinkStyles}:hover *`, {
  color: theme.color.primary.hover, /* Light Teal */
});
