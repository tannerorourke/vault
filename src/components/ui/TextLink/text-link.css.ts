import { style } from "@vanilla-extract/css";
import { theme } from "@/lib/theme/theme.css";

export const linkWrapBase = style({
  marginTop: "6px",
  padding: 0,
  selectors: {
    "&:focus-visible": { outline: "none" }, // Button owns the focus ring
  },
});

export const linkBtnBase = style({
  letterSpacing: "-0.005em",
  padding: "6px 2px 2px 2px",
  border: "none",
  borderRadius: "2px",
  display: "inline",
  lineHeight: 1,
  whiteSpace: "nowrap",
  cursor: "pointer",
  textDecoration: "none",
  background: "transparent",

  selectors: {
    "&:focus-visible": {
      outline: `2px solid ${theme.color.primary.hover}`,
      outlineOffset: 2,
    },
    "&:disabled": {
      cursor: "not-allowed",
      opacity: 0.5,
    },
  },
});

export const linkTextBase = style({
  fontSize: "14px",
  letterSpacing: "-0.005em",
  fontWeight: `${theme.typography.fontWeight.semibold} !important`,

  // Underline tracks color via currentColor + transitions together
  backgroundImage: "linear-gradient(currentColor, currentColor)",
  backgroundSize: "0% 2px",
  backgroundPosition: "bottom left",
  backgroundRepeat: "no-repeat",
  transition: "color 200ms ease, background-size 300ms ease",

  selectors: {
    // Order matters: later rules win at equal specificity.
    [`${linkBtnBase}[aria-pressed="true"] &`]: {
      color: theme.color.secondary.active,
      backgroundSize: "100% 2px",
    },
    [`${linkBtnBase}:hover &`]: {
      color: theme.color.link.hover,
      backgroundSize: "100% 2px",
    },
    [`${linkBtnBase}:active &`]: {
      color: theme.color.secondary.active,
      backgroundSize: "100% 2px",
    },
  },
});
