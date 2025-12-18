import { style } from '@vanilla-extract/css';
import { vars } from 'src/lib/theme/theme.css';
import { responsive } from "@/lib/theme/responsive.css"

export const buttonBase = style([
  // Uses your sprinkles (responsive.ts)
  responsive({
    display: "inline",
    paddingLeft: { xs: "small", md: "medium" },
    paddingRight: { xs: "small", md: "medium" },
    paddingTop: { xs: "none", md: "small" },
    paddingBottom: { xs: "none", md: "small" },
  }),
  {
    color: vars.link.main,
    backgroundColor: "transparent",
    cursor: "pointer",
    textDecoration: "none",
    fontWeight: 600,

    selectors: {
      "&:hover": {
        color: vars.link.hover,
      },
      "&:focus-visible": {
        outline: `2px solid ${vars.primary.hover}`,
        outlineOffset: 2,
      },
      "&:disabled": {
        cursor: "not-allowed",
        opacity: 0.5,
      },
    },
  },
]);

export const buttonActive = style({
  color: vars.primary.active,
  selectors: {
    "&:hover": {
      color: vars.primary.active,
    },
  },
});