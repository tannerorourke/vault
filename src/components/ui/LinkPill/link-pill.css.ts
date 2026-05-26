import { style } from "@vanilla-extract/css";
import { theme } from "@/lib/theme/theme.css";


export const pill = style({
  display: "inline-flex",
  alignItems: "center",
  gap: theme.space._8,
  height: "36px",
  padding: "0 14px",
  borderRadius: "999px",
  fontSize: theme.typography.fontSize.bodySm,
  fontWeight: theme.typography.fontWeight.medium,
  border: `1px solid ${theme.color.divider}`,
  color: theme.color.text.primary,
  background: "transparent",
  textDecoration: "none",
  cursor: "pointer",
  transition: "border-color 180ms ease, color 180ms ease, background 180ms ease",
  selectors: {
    "&:hover": {
      borderColor: theme.color.tint.secondarySoft,
      color: theme.color.secondary.main,
      background: theme.color.tint.secondary,
    },
    "&:focus-visible": {
      outline: `2px solid ${theme.color.focus}`,
      outlineOffset: 2,
    },
  },
});
