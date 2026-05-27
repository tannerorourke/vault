import { EASE_CUBIC } from "@/lib/styles/utils.css";
import { theme } from "@/lib/theme/theme.css";
import { style } from "@vanilla-extract/css";


export const wrap = style({
  position: "relative",
  display: "inline-flex",
  alignItems: "center",
});

export const trigger = style({
  width: 40,
  height: 40,
  padding: 0,
  background: theme.color.card,
  border: `1px solid ${theme.color.divider}`,
  borderRadius: 999,
  boxShadow: `0 4px 20px -6px ${theme.color.shadow}`,
  color: theme.color.text.primary,
  transition: 
    `box-shadow 240ms ease, transform 180ms ${EASE_CUBIC}, border-color 200ms ease, color 200ms ease !important`,
  selectors: {
    "&:hover": {
      boxShadow: `0 8px 24px -6px ${theme.color.shadowStrong}`,
      transform: "translateY(-1px)",
      borderColor: theme.color.tint.primarySoft,
    },
  },
});

export const triggerOpen = style({
  color: theme.color.secondary.main,
  borderColor: theme.color.tint.secondary,
});

export const panel = style({
  position: "absolute",
  top: "calc(100% + 12px)",
  right: 0,
  width: 260,
  background: theme.color.card,
  border: `1px solid ${theme.color.divider}`,
  borderRadius: 14,
  boxShadow: `0 24px 60px -20px ${theme.color.shadowStrong}, 0 4px 16px -4px ${theme.color.shadow}`,
  padding: "10px 8px",
  zIndex: theme.zIndex.sidebar,
});

export const eyebrow = style({
  fontSize: theme.typography.fontSize.micro,
  fontWeight: theme.typography.fontWeight.bold,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: theme.color.text.secondary,
  padding: "8px 12px 6px",
});

export const list = style({
  listStyle: "none",
  padding: 0,
  margin: 0,
});

export const item = style({
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
  textDecoration: "none",
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

export const itemIcon = style({
  display: "inline-grid",
  placeItems: "center",
  width: 20,
  height: 20,
  color: theme.color.text.secondary,
  transition: "color 200ms ease",
  selectors: {
    [`${item}:hover &`]: {
      color: theme.color.primary.main,
    },
  },
});

export const itemLabel = style({
  flex: "1 1 auto",
  textAlign: "left",
});

export const itemArrow = style({
  display: "inline-grid",
  placeItems: "center",
  width: 14,
  height: 14,
  color: theme.color.text.secondary,
  opacity: 0.6,
  transition: "transform 180ms ease, opacity 180ms ease, color 180ms ease",
  selectors: {
    [`${item}:hover &`]: {
      transform: "translate(2px, -2px)",
      opacity: 1,
      color: theme.color.secondary.main,
    },
  },
});

export const divider = style({
  height: 1,
  background: theme.color.divider,
  margin: "6px 8px",
  border: "none",
});

export const toggleDot = style({
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
      background: theme.color.card,
      boxShadow: `0 1px 3px ${theme.color.shadow}`,
      transition: `transform 240ms ${EASE_CUBIC}`,
    },
    '&[data-on="true"]::after': {
      transform: "translateX(12px)",
    },
  },
});
