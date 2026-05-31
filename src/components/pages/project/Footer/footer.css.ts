import { style } from "@vanilla-extract/css";
import { theme } from "@/lib/theme/theme.css";
import { mq } from "@/lib/theme/responsive.css";


export const root = style({
  display: "block",
  marginTop: theme.space._96,
  
  textDecoration: "none",
  // match page padding w/ neg. margin
  padding: `0 ${theme.page.gutter.xs} 0`,
  margin: `${theme.space._96} calc(-1 * ${theme.page.gutter.xs}) 0`,
  [mq.sm]: {
    padding: `0 ${theme.page.gutter.sm} 0`,
    margin: `${theme.space._96} calc(-1 * ${theme.page.gutter.sm}) 0`,
  },
  [mq.md]: {
    padding: `0 ${theme.page.gutter.md} 0`,
    margin: `${theme.space._96} calc(-1 * ${theme.page.gutter.md}) 0`,
  },
  [mq.lg]: {
    padding: `0 ${theme.page.gutter.lg} 0`,
    margin: `${theme.space._96} calc(-1 * ${theme.page.gutter.lg}) 0`,
  }
});

  export const nextProjLink = style({
    display: "block",
    borderRadius: "8px",
    textDecoration: "none",
    cursor: "pointer",
    transition: "background 200ms ease",
    selectors: {
      "&:hover": {
        background: theme.color.tint.primaryWeak,
      },
      "&:focus-visible": {
        outline: `2px solid ${theme.color.focus}`,
        outlineOffset: 2,
      }
    }
  });

export const note = style({
  display: "flex",
  flexDirection: "column",
  gap: theme.space._4,
  paddingBottom: theme.space._24
});

export const eyebrowBox = style({
  paddingTop: theme.space._24,
  borderTop: `1px solid ${theme.color.divider}`,
});

export const eyebrowGutter = style({
  marginBottom: theme.space._24
});