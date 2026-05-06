import { style, globalStyle } from "@vanilla-extract/css";
import { theme } from "@/lib/theme/theme.css";

const MEDIA_RADIUS = "10px";

export const section = style({
  paddingTop: theme.space._24,
  paddingBottom: theme.space._24,
  borderBottom: `1px solid ${theme.color.divider}`,
  scrollMarginTop: `calc(${theme.layout.headerHeight} + ${theme.space._24})`,
  selectors: {
    "&:last-child": {
      borderBottom: "none",
    },
  },
});

export const sectionTitle = style({
  fontFamily: "var(--font-display)",
  fontSize: "18px",
  fontWeight: theme.typography.fontWeight.semibold,
  color: theme.color.primary.main,
  margin: `0 0 ${theme.space._12}`,
});

export const prose = style({
  fontSize: "14px",
  lineHeight: "1.7",
  color: theme.color.text.primary,
});

globalStyle(`${prose} p`, {
  margin: `0 0 ${theme.space._12}`,
});
globalStyle(`${prose} p:last-child`, {
  margin: 0,
});
globalStyle(`${prose} a`, {
  color: theme.color.link.main,
  textDecoration: "underline",
  textDecorationColor: "rgba(83, 141, 132, 0.4)",
});
globalStyle(`${prose} a:hover`, {
  color: theme.color.link.hover,
});
globalStyle(`${prose} strong`, {
  fontWeight: theme.typography.fontWeight.semibold,
});

export const list = style({
  margin: `${theme.space._8} 0 0 ${theme.space._20}`,
  fontSize: "14px",
  lineHeight: "1.7",
  color: theme.color.text.primary,
});

globalStyle(`${list} li`, {
  marginBottom: theme.space._4,
});
globalStyle(`${list} li:last-child`, {
  marginBottom: 0,
});

export const intro = style({
  marginBottom: theme.space._8,
});

export const twoUp = style({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: theme.space._24,
  alignItems: "start",
  "@media": {
    "(min-width: 700px)": {
      gridTemplateColumns: "1fr 1fr",
    },
  },
});

export const twoUpReverse = style({
  "@media": {
    "(min-width: 700px)": {
      direction: "rtl",
    },
  },
});

globalStyle(`${twoUpReverse} > *`, {
  "@media": {
    "(min-width: 700px)": {
      direction: "ltr",
    },
  },
});

export const inlineImage = style({
  width: "100%",
  borderRadius: MEDIA_RADIUS,
  boxShadow: `0 3px 14px -2px ${theme.color.shadow}`,
  display: "block",
});

export const standaloneImage = style({
  width: "100%",
  borderRadius: MEDIA_RADIUS,
  boxShadow: `0 3px 14px -2px ${theme.color.shadow}`,
  display: "block",
  marginTop: theme.space._4,
});

export const caption = style({
  fontSize: theme.typography.fontSize.caption,
  color: theme.color.text.secondary,
  marginTop: theme.space._8,
  textAlign: "center",
});

export const videoWrap = style({
  width: "100%",
  borderRadius: MEDIA_RADIUS,
  overflow: "hidden",
  boxShadow: `0 3px 14px -2px ${theme.color.shadow}`,
  background: theme.color.canvas,
  aspectRatio: "16 / 9",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginTop: theme.space._4,
});

export const videoMedia = style({
  width: "100%",
  height: "100%",
  border: "none",
  display: "block",
});
