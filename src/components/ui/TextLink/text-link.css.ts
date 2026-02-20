import { style } from '@vanilla-extract/css';
import { theme } from 'src/lib/theme/theme.css';
import { responsive } from "@/lib/theme/responsive.css"

export const buttonBase = style({
  display: "inline",
  color: theme.color.link.main,
  backgroundColor: "transparent",
  cursor: "pointer",
  textDecoration: "none",
  fontWeight: 600,
  border: "none",

  // transition: `color ${theme.transition.duration} ${theme.transition.timingFunction}`,

  selectors: {
    "&:hover": {
      color: theme.color.link.hover,
    },
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

