import { globalStyle, style } from "@vanilla-extract/css";
import { theme } from "@/lib/theme/theme.css";
import { darkTheme } from "@/lib/theme/theme.css";

export const pill = style({
  fontFamily: "var(--font-body)",
  fontSize: "14px",
  fontWeight: theme.typography.fontWeight.medium,
  letterSpacing: "-0.005em",
  color: theme.color.text.secondary,
  padding: "9px 16px",
  borderRadius: "999px",
  border: "none",
  background: "transparent",
  cursor: "pointer",
  whiteSpace: "nowrap",
  lineHeight: 1,
  transition: "color 200ms ease, background 200ms ease",

  selectors: {
    "&:hover": {
      color: theme.color.text.primary,
      background: "rgba(42, 95, 88, 0.06)",
    },
    '&[aria-pressed="true"]': {
      color: theme.color.contrast,
      background: theme.color.primary.main,
      boxShadow: "0 2px 8px -2px rgba(42, 95, 88, 0.35)",
    },
    '&[aria-pressed="true"]:hover': {
      background: theme.color.primary.hover,
    },
  },
});

globalStyle(`:where(.${darkTheme}) ${pill}:hover`, {
  background: "rgba(77, 184, 172, 0.10)",
});

globalStyle(`:where(.${darkTheme}) ${pill}[aria-pressed="true"]`, {
  boxShadow: "0 2px 8px -2px rgba(0, 0, 0, 0.4)",
});
