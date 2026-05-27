import { style } from "@vanilla-extract/css";
import { theme } from "@/lib/theme/theme.css";

export const tocNav = style({
  display: "flex",
  flexDirection: "column",
  gap: "2px",
});

// Navigation convention (teal hover, primary.main) per CONVENTIONS.md -> Link/icon hover.
// Intentionally bespoke: data-active left-border treatment is beyond TextLink's scope.
export const tocLink = style({
  display: "block",
  padding: "5px 0 5px 12px",
  marginLeft: "-12px",
  fontSize: theme.typography.fontSize.caption,
  fontWeight: theme.typography.fontWeight.medium,
  color: theme.color.text.secondary,
  textDecoration: "none",
  letterSpacing: "-0.005em",
  borderRadius: "0px",

  background: "transparent",
  backgroundImage: "linear-gradient(currentColor, currentColor)",
  backgroundSize: "2px 0%",
  backgroundPosition: "top left",
  backgroundRepeat: "no-repeat",
  transition: "color 200ms ease, border-color 200ms ease, background-size 300ms ease",

  selectors: {
    "&:focus-visible": {
      outline: `2px solid ${theme.color.focus}`,
      outlineOffset: 2,
    },
    "&:hover": {
      color: theme.color.primary.main,
      backgroundSize: "2px 100%",
    },
    '&[data-active="true"]': {
      color: theme.color.primary.main,
      backgroundSize: "2px 100%",
      fontWeight: theme.typography.fontWeight.semibold,
    },
    "&:active": {
      color: theme.color.primary.main,
      backgroundSize: "2px 100%",
      fontWeight: theme.typography.fontWeight.semibold,
    },
  },
});
