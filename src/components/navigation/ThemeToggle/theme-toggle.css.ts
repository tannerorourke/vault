import { EASE_CUBIC } from "@/lib/theme/responsive.css";
import { theme } from "@/lib/theme/theme.css";
import { style } from "@vanilla-extract/css";


export const row = style({
  display: "flex",
  alignItems: "center",
  gap: 12,
  padding: "10px 12px",
  borderRadius: 8,
  background: "transparent",
  border: "none",
  color: theme.color.text.primary,
  fontFamily: "inherit",
  fontSize: theme.typography.fontSize.bodySm,
  fontWeight: theme.typography.fontWeight.medium,
  cursor: "pointer",
  width: "100%",
  textAlign: "left",
  transition: "background 180ms ease, color 180ms ease",
  selectors: {
    "&:hover": {
      background: theme.color.tint.primaryWeak,
      color: theme.color.primary.main,
    },
    "&:focus-visible": {
      outline: `2px solid ${theme.color.focus}`,
      outlineOffset: -2,
    },
  },
});

export const icon = style({
  display: "inline-grid",
  placeItems: "center",
  width: 20,
  height: 20,
  color: theme.color.text.secondary,
  transition: "color 200ms ease",
  selectors: {
    [`${row}:hover &`]: {
      color: theme.color.primary.main,
    },
  },
});

export const label = style({
  flex: "1 1 auto",
  textAlign: "left",
});

export const dot = style({
  display: "inline-block",
  width: 30,
  height: 18,
  borderRadius: 999,
  background: theme.color.tint.primarySoft,
  position: "relative",
  flexShrink: 0,
  transition: "background 220ms ease",
  selectors: {
    '&[data-on="true"]': {
      background: theme.color.secondary.main,
    },
    "&::after": {
      content: '""',
      position: "absolute",
      top: 2,
      left: 2,
      width: 14,
      height: 14,
      borderRadius: "50%",
      background: theme.color.card.main,
      boxShadow: `0 1px 3px ${theme.color.shadow}`,
      transition: `transform 240ms ${EASE_CUBIC}`,
    },
    '&[data-on="true"]::after': {
      transform: "translateX(12px)",
    },
  },
});
