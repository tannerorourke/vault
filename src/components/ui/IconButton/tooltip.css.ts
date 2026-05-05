import { style } from "@vanilla-extract/css";
import { theme } from "@/lib/theme/theme.css";

export const tooltipPopup = style({
  fontFamily: "var(--font-body), system-ui, sans-serif",
  fontSize: theme.typography.fontSize.caption,
  fontWeight: theme.typography.fontWeight.medium,
  lineHeight: theme.typography.lineHeight.normal,
  color: theme.color.text.primary,
  background: theme.color.card,
  padding: "6px 10px",
  borderRadius: "6px",
  boxShadow: `0 4px 20px -2px ${theme.color.shadow}`,
  border: "1px solid rgba(0,0,0,0.06)",
  transformOrigin: "left center",
  transition: "opacity 150ms ease, transform 150ms ease",

  selectors: {
    '&[data-starting-style], &[data-ending-style]': {
      opacity: 0,
      transform: "scale(0.92)",
    },
    '&[data-instant]': {
      transition: "none",
    },
  },
});
