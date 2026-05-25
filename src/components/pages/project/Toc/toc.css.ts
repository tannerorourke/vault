import { style } from "@vanilla-extract/css";
import { theme } from "@/lib/theme/theme.css";

export const tocNav = style({
  display: "flex",
  flexDirection: "column",
  gap: "2px",
});

export const tocLabel = style({
  fontSize: theme.typography.fontSize.micro,
  fontWeight: theme.typography.fontWeight.semibold,
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  color: theme.color.text.secondary,
  marginBottom: theme.space._12,
});

export const tocLink = style({
  display: "block",
  padding: "5px 0 5px 12px",
  marginLeft: "-12px",
  fontSize: theme.typography.fontSize.caption,
  fontWeight: theme.typography.fontWeight.medium,
  color: theme.color.text.secondary,
  textDecoration: "none",
  letterSpacing: "-0.005em",
  transition: "color 200ms ease, border-color 200ms ease",
  selectors: {
    "&:hover": {
      color: theme.color.primary.main,
      borderLeftColor: theme.color.tint.primarySoft,
    },
    '&[data-active="true"]': {
      color: theme.color.primary.main,
      borderLeftColor: theme.color.secondary.main,
      fontWeight: theme.typography.fontWeight.semibold,
    },
  },
});
