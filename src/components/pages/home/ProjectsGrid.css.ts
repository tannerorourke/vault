import { style } from "@vanilla-extract/css";
import { theme } from "@/lib/theme/theme.css";
import { mq } from "@/lib/theme/responsive.css";

const DIVIDER = "1px solid rgba(0,0,0,0.08)";
const TAG_BG = "rgba(42,95,88,0.09)";
const CARD_HOVER_SHADOW = "0 8px 32px -4px rgba(42,95,88,0.20)";

export const section = style({
  display: "flex",
  flexDirection: "column",
  padding: `${theme.space._36} ${theme.space._24} ${theme.space._48}`,
  [mq.md]: {
    padding: `${theme.space._36} ${theme.space._48} ${theme.space._48}`,
  },
});

export const sectionHeader = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: theme.space._16,
  borderBottom: DIVIDER,
  paddingBottom: theme.space._12,
  marginBottom: theme.space._24,
});

export const sectionTitle = style({
  fontFamily: "var(--font-display)",
  fontSize: "13px",
  fontWeight: theme.typography.fontWeight.semibold,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  color: theme.color.text.secondary,
  margin: 0,
});

export const sectionCount = style({
  fontSize: theme.typography.fontSize.caption,
  fontWeight: theme.typography.fontWeight.medium,
  color: theme.color.text.secondary,
});

export const grid = style({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
  gap: theme.space._20,
});

export const card = style({
  display: "flex",
  flexDirection: "column",
  background: theme.color.card,
  borderRadius: "12px",
  boxShadow: `0 4px 20px -2px ${theme.color.shadow}`,
  overflow: "hidden",
  cursor: "pointer",
  textDecoration: "none",
  color: "inherit",
  transition: "box-shadow 250ms ease, transform 250ms ease",

  selectors: {
    "&:hover": {
      boxShadow: CARD_HOVER_SHADOW,
      transform: "translateY(-2px)",
    },
    "&:focus-visible": {
      outline: `2px solid ${theme.color.primary.hover}`,
      outlineOffset: 2,
    },
  },
});

export const cardImage = style({
  width: "100%",
  height: "160px",
  objectFit: "cover",
  objectPosition: "center",
  display: "block",
});

export const cardBody = style({
  padding: theme.space._16,
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: "6px",
});

export const eyebrow = style({
  fontSize: theme.typography.fontSize.micro,
  fontWeight: theme.typography.fontWeight.semibold,
  textTransform: "uppercase",
  letterSpacing: "0.07em",
  color: theme.color.text.secondary,
});

export const cardTitle = style({
  fontFamily: "var(--font-display)",
  fontSize: "20px",
  fontWeight: theme.typography.fontWeight.bold,
  lineHeight: "1.2",
  color: theme.color.primary.main,
  margin: 0,
});

export const cardDesc = style({
  fontSize: "13px",
  lineHeight: "1.55",
  color: theme.color.text.primary,
  margin: 0,
});

export const cardFooter = style({
  borderTop: DIVIDER,
  padding: `${theme.space._8} ${theme.space._16}`,
  display: "flex",
  alignItems: "center",
  gap: theme.space._8,
  marginTop: "auto",
});

export const tag = style({
  fontSize: theme.typography.fontSize.micro,
  fontWeight: theme.typography.fontWeight.semibold,
  color: theme.color.primary.main,
  background: TAG_BG,
  borderRadius: "4px",
  padding: "3px 7px",
  whiteSpace: "nowrap",
});

export const cardCta = style({
  marginLeft: "auto",
  display: "inline-flex",
  alignItems: "center",
  gap: theme.space._4,
  fontSize: theme.typography.fontSize.caption,
  fontWeight: theme.typography.fontWeight.semibold,
  color: theme.color.text.secondary,
  transition: "color 200ms ease",

  selectors: {
    [`${card}:hover &`]: {
      color: theme.color.primary.hover,
    },
  },
});

export const ctaIcon = style({
  width: "12px",
  height: "12px",
  fill: "currentColor",
  flexShrink: 0,
});
