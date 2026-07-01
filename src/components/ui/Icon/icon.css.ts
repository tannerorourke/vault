import { recipe, RecipeVariants } from "@vanilla-extract/recipes";
import { style } from '@vanilla-extract/css';
import { theme } from "@/lib/theme/theme.css";

export const iconButton = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    textDecoration: "none",
    border: "none",
    background: "transparent",
    color: theme.color.text.primary,
    transition: "background-color 300ms ease, box-shadow 300ms ease, transform 100ms ease, color 200ms ease, border-color 200ms ease",
    selectors: {
      "&:hover": {
        color: theme.color.secondary.main,
      },
      "&:focus-visible": {
        outline: `2px solid ${theme.color.focus}`,
        outlineOffset: 2,
      },
      "&:active": {
        background: theme.color.tint.primaryWeak
      },
    },
  },
  variants: {
    variant: {
      flat: {
        height: 25,
        width: 25,
      },
      pill: {
        height: 42, width: 42,
        borderRadius: "50%",
        background: theme.color.card.main,
        boxShadow: `0 4px 20px -6px ${theme.color.shadow}`,
      },
      box: {
        borderRadius: "8px",
        border: `1px solid ${theme.color.link.main}`,
        height: "36px",
        padding: "0 14px",
        selectors: {
          "&:hover": {
            borderColor: theme.color.secondary.main,
            color: theme.color.secondary.main,
            background: theme.color.tint.secondary,
          },
        }
      },
      boxSmall: {
        borderRadius: "8px",
        border: `1px solid ${theme.color.link.main}`,
        height: "30px",
        padding: "0 8px",
        selectors: {
          "&:hover": {
            borderColor: theme.color.secondary.main,
            color: theme.color.secondary.main,
          },
        }
      }
    },
  },
  defaultVariants: { variant: "flat" },
});

export type IconButtonVariants = RecipeVariants<typeof iconButton>;


export const iconMuted = style({ opacity: 0.7 });

// -----------------------------------------------------
// tooltip
// -----------------------------------------------------

export const tooltipPositioner = style({
  zIndex: 9999,
});

export const tooltipPopup = style({
  fontFamily: theme.typography.fontFamily.sans,
  fontSize: theme.typography.fontSize.caption,
  fontWeight: theme.typography.fontWeight.medium,
  lineHeight: theme.typography.lineHeight.normal,
  color: theme.color.text.primary,
  background: theme.color.card.main,
  padding: "6px 10px",
  borderRadius: "6px",
  boxShadow: `0 4px 20px -2px ${theme.color.shadow}`,
  border: `1px solid ${theme.color.divider}`,
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
