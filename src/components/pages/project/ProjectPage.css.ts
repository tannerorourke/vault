import { style } from "@vanilla-extract/css";
import { theme } from "@/lib/theme/theme.css";
import { mq } from "@/lib/theme/responsive.css";



export const root = style({
  position: "relative",
  zIndex: theme.layout.zIndex.content,
  width: "100%",
  // maxWidth: "860px",
  maxWidth: "1100px",
  margin: "0 auto",
  marginTop: theme.layout.headerOffset.xs,
  padding: `0 ${theme.space._24} ${theme.space._96}`,
  [mq.sm]: { 
    padding: `0 ${theme.space._48}`,
    marginTop: theme.layout.headerOffset.sm,
  },
  [mq.md]: {
    padding: `0 ${theme.space._80} ${theme.space._96}`,
    marginTop: theme.layout.headerOffset.md, 
  },
});

export const backBtn = style({
  display: "inline-flex",
  alignItems: "center",
  gap: "6px",
  fontSize: "13px",
  fontWeight: theme.typography.fontWeight.semibold,
  color: theme.color.text.secondary,
  background: "none",
  border: "none",
  textDecoration: "none",
  cursor: "pointer",
  marginBottom: theme.space._32,
  transition: "color 200ms ease",

  selectors: {
    "&:hover": {
      color: theme.color.primary.hover,
    },
  },
});

export const backIcon = style({
  width: "14px",
  height: "14px",
  fill: "currentColor",
  flexShrink: 0,
});

export const header = style({
  marginBottom: theme.space._32,
});

export const eyebrow = style({
  fontSize: "11px",
  fontWeight: theme.typography.fontWeight.semibold,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  color: theme.color.text.secondary,
  marginBottom: theme.space._8,
});

export const title = style({
  fontFamily: "var(--font-display)",
  fontSize: theme.typography.fontSize.display,
  fontWeight: theme.typography.fontWeight.bold,
  color: theme.color.primary.main,
  letterSpacing: theme.typography.letterSpacing.tight,
  lineHeight: "1.1",
  margin: `0 0 ${theme.space._12}`,
});

export const subtitle = style({
  fontSize: theme.typography.fontSize.body,
  lineHeight: theme.typography.lineHeight.relaxed,
  color: theme.color.text.primary,
  margin: `0 0 ${theme.space._16}`,
});

export const tagsRow = style({
  display: "flex",
  flexWrap: "wrap",
  gap: theme.space._8,
  marginBottom: theme.space._16,
});

export const links = style({
  display: "flex",
  flexWrap: "wrap",
  gap: theme.space._8,
});

export const linkBtn = style({
  display: "inline-flex",
  alignItems: "center",
  gap: "7px",
  padding: "8px 16px",
  borderRadius: "8px",
  fontSize: "12px",
  fontWeight: theme.typography.fontWeight.semibold,
  border: `1.5px solid ${theme.color.primary.main}`,
  color: theme.color.primary.main,
  background: "transparent",
  textDecoration: "none",
  cursor: "pointer",
  transition: "background-color 200ms ease, color 200ms ease",

  selectors: {
    "&:hover": {
      background: theme.color.primary.main,
      color: theme.color.contrast,
    },
    "&:focus-visible": {
      outline: `2px solid ${theme.color.primary.hover}`,
      outlineOffset: 2,
    },
  },
});

export const linkBtnIcon = style({
  width: "14px",
  height: "14px",
  fill: "currentColor",
  flexShrink: 0,
});

export const heroImage = style({
  width: "100%",
  borderRadius: "12px",
  boxShadow: `0 4px 20px -2px ${theme.color.shadow}`,
  marginBottom: theme.space._32,
  maxHeight: "360px",
  objectFit: "cover",
  display: "block",
});

export const layout = style({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: theme.space._24,
  alignItems: "start",
  [mq.md]: {
    gridTemplateColumns: "160px 1fr",
    gap: theme.space._48,
  },
});

export const toc = style({
  display: "none",
  [mq.md]: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    position: "sticky",
    top: `calc(${theme.layout.headerHeight} + ${theme.space._24})`,
  },
});

export const tocLink = style({
  fontSize: "11px",
  fontWeight: theme.typography.fontWeight.medium,
  color: theme.color.text.secondary,
  textDecoration: "none",
  paddingLeft: "10px",
  paddingTop: "3px",
  paddingBottom: "3px",
  borderLeft: "2px solid transparent",
  transition: "color 200ms ease, border-color 200ms ease",
  cursor: "pointer",

  selectors: {
    "&:hover": {
      color: theme.color.primary.main,
    },
  },
});

export const sections = style({
  display: "block",
});
