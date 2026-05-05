import { style } from "@vanilla-extract/css";
import { theme } from "@/lib/theme/theme.css";
import { mq } from "@/lib/theme/responsive.css";

const HEADER_OFFSET = `calc(${theme.layout.headerHeight} + ${theme.space._48})`;
const DIVIDER = "1px solid rgba(0,0,0,0.08)";
const CHIP_BG = "rgba(42,95,88,0.09)";
const PHOTO_PLACEHOLDER_BG = "rgba(42,95,88,0.06)";

export const profileRoot = style({
  width: "100%",
  maxWidth: "1100px",
  margin: "0 auto",
  padding: `${HEADER_OFFSET} ${theme.space._24} ${theme.space._80}`,
  [mq.md]: {
    padding: `${HEADER_OFFSET} ${theme.space._80} ${theme.space._80}`,
  },
});

export const grid = style({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: theme.space._32,
  alignItems: "start",
  [mq.md]: {
    gridTemplateColumns: "320px 1fr",
    gap: theme.space._56,
  },
});

export const photoColumn = style({
  position: "relative",
  maxWidth: "280px",
  width: "100%",
  [mq.md]: {
    maxWidth: "none",
    position: "sticky",
    top: HEADER_OFFSET,
  },
});

export const photoPlaceholder = style({
  width: "100%",
  aspectRatio: "3 / 4",
  borderRadius: "12px",
  background: PHOTO_PLACEHOLDER_BG,
  boxShadow: `0 4px 20px -2px ${theme.color.shadow}`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.color.text.secondary,
  fontSize: theme.typography.fontSize.bodySm,
  fontWeight: theme.typography.fontWeight.medium,
});

export const photo = style({
  width: "100%",
  aspectRatio: "3 / 4",
  borderRadius: "12px",
  objectFit: "cover",
  display: "block",
  background: PHOTO_PLACEHOLDER_BG,
  boxShadow: `0 4px 20px -2px ${theme.color.shadow}`,
});

export const body = style({
  display: "flex",
  flexDirection: "column",
});

export const name = style({
  fontFamily: "var(--font-display)",
  fontSize: theme.typography.fontSize.display,
  lineHeight: "1.1",
  fontWeight: theme.typography.fontWeight.bold,
  letterSpacing: theme.typography.letterSpacing.tight,
  color: theme.color.primary.main,
  margin: `0 0 ${theme.space._4}`,
});

export const subtitle = style({
  fontSize: theme.typography.fontSize.body,
  color: theme.color.text.secondary,
  marginBottom: theme.space._32,
});

export const paragraph = style({
  fontSize: "15px",
  lineHeight: "1.75",
  color: theme.color.text.primary,
  margin: `0 0 ${theme.space._20}`,
  textWrap: "pretty",
});

export const skills = style({
  display: "flex",
  flexWrap: "wrap",
  gap: theme.space._8,
  marginTop: theme.space._24,
  paddingTop: theme.space._24,
  borderTop: DIVIDER,
});

export const skillChip = style({
  fontSize: theme.typography.fontSize.caption,
  fontWeight: theme.typography.fontWeight.semibold,
  borderRadius: "20px",
  padding: "5px 14px",
  background: CHIP_BG,
  color: theme.color.primary.main,
  whiteSpace: "nowrap",
});

export const links = style({
  display: "flex",
  flexWrap: "wrap",
  gap: theme.space._12,
  marginTop: theme.space._24,
});

export const linkButton = style({
  display: "inline-flex",
  alignItems: "center",
  gap: "7px",
  padding: "9px 18px",
  borderRadius: "8px",
  fontSize: "13px",
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

export const linkButtonIcon = style({
  width: "15px",
  height: "15px",
  fill: "currentColor",
  flexShrink: 0,
});
