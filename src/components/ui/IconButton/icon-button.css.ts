import { style } from '@vanilla-extract/css';
import { theme } from "@/lib/theme/theme.css";
import { responsive } from "@/lib/theme/responsive.css"

export const aBase = style({
  display: "inline-block",
  backgroundColor: "transparent",
  cursor: "pointer",
  textDecoration: "none",
  fontWeight: 600,
  height: "25px", width: "25px",

  selectors: {
    "&:hover": {
      color: theme.color.text.primary,
    },
    "&:focus-visible": {
      outline: `2px solid ${theme.color.link.main}`,
      outlineOffset: 2,
    },
    "&:disabled": {
      cursor: "not-allowed",
      opacity: 0.5,
    },
  },
});
