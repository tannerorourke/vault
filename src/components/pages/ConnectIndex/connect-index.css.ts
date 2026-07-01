import { style } from "@vanilla-extract/css";
import { theme } from "@/lib/theme/theme.css";


export const list = style({
  listStyle: "none",
  margin: 0,
  padding: 0,
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
    // Active = the sidebar this item opens is currently open.
    '&[aria-current="true"]': {
      color: theme.color.secondary.main,
      background: theme.color.tint.secondarySoft,
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
