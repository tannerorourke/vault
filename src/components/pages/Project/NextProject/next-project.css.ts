import { style } from "@vanilla-extract/css";
import { theme } from "@/lib/theme/theme.css";
import { EASE_CUBIC, mq } from "@/lib/theme/responsive.css";

export const footer = style({
  display: "flex",
  justifyContent: "center",
  width: "100%",
  transition: `background-color 200ms ${EASE_CUBIC}`,
  marginTop: theme.space._24,
  [mq.md]: { marginTop: theme.space._48 },
  selectors: {
    "&:hover": {
      background: theme.color.tint.primaryWeak,
    }
  }
});

export const footLink = style({
  display: "block",
  textDecoration: "none",
  color: "inherit",
  cursor: "pointer",
  transition: "background 200ms ease",
  borderRadius: "16px",
  borderTop: `1px solid ${theme.color.divider}`,
  
  padding: `0 ${theme.page.gutter.xs}`,
  [mq.sm]: { 
    padding: `0 ${theme.page.gutter.sm}`,
    maxWidth: theme.page.maxContentWidth.sm,
  },
  [mq.md]: {
    padding: `0 ${theme.page.gutter.md}`,
    width: theme.page.maxContentWidth.md,
    maxWidth: '100vw',
  },
  [mq.lg]: {
    padding: `0 ${theme.page.gutter.lg}`,
    width: theme.page.maxContentWidth.lg,
    maxWidth: theme.page.maxContentWidth.lg,
  },
  selectors: {
    "&:focus-visible": {
      outline: `2px solid ${theme.color.focus}`,
      outlineOffset: 2,
    }
  }
});

export const eyebrowBox = style({
  paddingTop: theme.space._24,
});