import { style } from "@vanilla-extract/css";
import { theme } from "@/lib/theme/theme.css";
import { srOnly } from "@/lib/theme/responsive.css";

export const shell = style({
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  position: "relative",
  overflow: 'hidden',
});

export const content = style({
  position: 'fixed',
  inset: 0,
});

export const skipLink = style({
  ...srOnly,
  selectors: {
    "&:focus-visible": {
      position: "fixed",
      top: theme.space._16,
      left: theme.space._16,
      width: "auto",
      height: "auto",
      margin: 0,
      padding: `${theme.space._8} ${theme.space._16}`,
      clip: "auto",
      overflow: "visible",
      zIndex: theme.zIndex.tooltip,
      background: theme.color.card,
      color: theme.color.text.primary,
      border: `1px solid ${theme.color.divider}`,
      borderRadius: theme.sheet.radius,
      boxShadow: theme.sheet.shadow,
      fontFamily: theme.typography.fontFamily.sans,
      fontSize: theme.typography.fontSize.bodySm,
      textDecoration: "none",
      outline: `2px solid ${theme.color.focus}`,
      outlineOffset: "2px",
    },
  },
});


