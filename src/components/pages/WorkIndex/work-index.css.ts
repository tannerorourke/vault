import { style } from "@vanilla-extract/css";
import { theme } from "@/lib/theme/theme.css";
import { EASE_CUBIC } from "@/lib/theme/responsive.css";


export const section = style({
  display: "flex",
  flexDirection: "column",
  gap: theme.space._24,
});

export const list = style({
  listStyle: "none",
  margin: 0,
  padding: 0,
  display: "flex",
  flexDirection: "column",
});

export const cardBase = style({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  rowGap: theme.space._8,

  padding: "16px 18px",
  marginLeft: "-16px",

  background: "transparent",
  border: "none",
  borderBottom: `2px solid ${theme.color.divider}`,
  borderRadius: 0,
  boxShadow: "none",
  textDecoration: "none",
  color: "inherit",
  cursor: "pointer",
  overflow: "visible",
  transition: `background 200ms ease`,

  selectors: {
    '&:focus-visible': {
      outline: `2px solid ${theme.color.focus}`,
      outlineOffset: 2
    },
    '&:hover': {
      background: theme.color.tint.primaryWeak
    },
    "&:active": {
      background: theme.color.tint.primary
    }
  },
});

// Row 1 thumbnail + title
export const headRow = style({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  columnGap: theme.space._16,
  width: "100%",
});

  export const image = style({
    flexShrink: 0,
    width: 88,
    aspectRatio: "16 / 10",
    borderRadius: "6px",
    overflow: "hidden",
    transition: `width 180ms ${EASE_CUBIC}`,
  });
    export const img = style({
      width: "100%",
      height: "100%",
      objectFit: "cover",
      display: "block",
    });

  export const title = style({
    margin: 0,
    textWrap: "pretty",
    transition: `color 180ms ease`,
    selectors: {
      [`${cardBase} &`]: {
        color: theme.color.primary.main,
      },
      [`${cardBase}:hover &, ${cardBase}:focus-visible &`]: {
        color: theme.color.primary.hover,
      },
    },
  });

// Row 2 eyebrow
export const eyebrow = style({
  textAlign: "left",
  margin: 0,
});

// Row 3 subtitle
export const reveal = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "12px",
});
  export const subtitle = style({
    opacity: 0.82,
    maxWidth: "70ch",
    margin: 0,
  });
