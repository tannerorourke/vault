import { style } from "@vanilla-extract/css";
import { theme } from "@/lib/theme/theme.css";
import { mq } from "@/lib/theme/responsive.css";

export const root = style({
  display: "block",
  marginTop: theme.space._96,
  borderTop: `1px solid ${theme.color.divider}`,
  textDecoration: "none",
  color: "inherit",
  cursor: "pointer",
  transition: "background 200ms ease",
  borderRadius: "8px",
  padding: `${theme.space._24} 0 ${theme.space._24}`,
  selectors: {
    "&:hover": {
      background: theme.color.tint.primaryWeak,
    },
    "&:focus-visible": {
      outline: `2px solid ${theme.color.focus}`,
      outlineOffset: 2,
    },
  },
});