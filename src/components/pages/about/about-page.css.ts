import { style, globalStyle } from "@vanilla-extract/css";
import { theme } from "@/lib/theme/theme.css";
import { mq } from "@/lib/theme/responsive.css";
import { page } from "@/lib/styles/page.css";
import { EASE_CUBIC } from "@/lib/styles/utils.css";
import {
  linkBtnBase,
  leftSlotHold,
  rightSlotEnabled,
} from "@/components/ui/TextLink/text-link.css";


const MONO = "ui-monospace, SFMono-Regular, Menlo, monospace";


export const aboutRoot = style([
  page,
  {
    maxWidth: "1100px",
    display: "flex",
    flexDirection: "column",
    gap: theme.space._56,
    [mq.md]: { maxWidth: "1100px" },
    [mq.lg]: { width: "1100px", maxWidth: "1100px" },
  },
]);


// -- Intro
export const intro = style({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: theme.space._32,
  paddingTop: theme.space._12,
  [mq.md]: {
    gridTemplateColumns: "minmax(220px, 280px) 1fr",
    gap: theme.space._56,
  },
});

// -- Photo column

export const photoCol = style({
  display: "flex",
  flexDirection: "column",
  gap: theme.space._16,
  maxWidth: "380px",
  width: "100%",
  [mq.md]: {
    position: "sticky",
    top: `calc(${theme.header.offset.xs} + ${theme.space._24})`,
    maxWidth: "none",
  },
});

export const photoFigure = style({
  margin: 0,
  transition: `transform 400ms ${EASE_CUBIC}`,
  selectors: {
    "&:hover": {
      transform: "translateY(-2px)",
    },
  },
});

export const photo = style({
  display: "block",
  width: "100%",
  aspectRatio: "4 / 5",
  borderRadius: "4px",
  objectFit: "cover",
  background: theme.color.tint.primaryWeak,
  filter: "saturate(0.95)",
});

export const photoMeta = style({
  margin: 0,
  padding: `${theme.space._4} 0 0 0`,
  display: "flex",
  flexDirection: "column",
  gap: theme.space._4,
});

export const photoMetaRow = style({
  display: "flex",
  gap: theme.space._12,
  margin: 0,
});

export const photoMetaKey = style({
  fontFamily: MONO,
  color: theme.color.text.secondary,
  opacity: 0.6,
  minWidth: "64px",
  letterSpacing: "0.02em",
});

export const photoMetaVal = style({
  fontFamily: MONO,
  color: theme.color.text.primary,
  opacity: 0.85,
  letterSpacing: "0.02em",
});

// -- Prose column

export const proseCol = style({
  display: "flex",
  flexDirection: "column",
  gap: theme.space._16,
  maxWidth: "62ch",
});

export const headline = style({
  fontWeight: theme.typography.fontWeight.semibold,
  lineHeight: theme.typography.lineHeight.relaxed,
  letterSpacing: "-0.005em",
  textWrap: "pretty",
  margin: 0,
  color: theme.color.text.primary,
});

export const par = style({
  lineHeight: theme.typography.lineHeight.relaxed,
  color: theme.color.text.primary,
  opacity: 0.92,
  textWrap: "pretty",
  margin: 0,
  scrollMarginTop: `calc(${theme.header.height.xs} + ${theme.space._24})`,
  [mq.sm]: {
    scrollMarginTop: `calc(${theme.header.height.sm} + ${theme.space._24})`,
  },
});

globalStyle(`${headline} strong, ${par} strong`, {
  fontWeight: theme.typography.fontWeight.semibold,
  color: theme.color.primary.main,
});

globalStyle(`${headline} em, ${par} em`, {
  fontStyle: "italic",
  color: theme.color.text.primary,
});

// -- CONTACT

export const contact = style({
  display: "flex",
  flexDirection: "column",
  gap: theme.space._4,
  paddingTop: theme.space._12,
  borderTop: `1px solid ${theme.color.divider}`,
});

export const contactStatement = style({
  fontFamily: "var(--font-display)",
  fontSize: "clamp(20px, 2.2vw, 28px)",
  lineHeight: theme.typography.lineHeight.snug,
  fontWeight: theme.typography.fontWeight.medium,
  letterSpacing: "-0.012em",
  color: theme.color.text.primary,
  maxWidth: "36ch",
  margin: `${theme.space._16} 0 ${theme.space._24}`,
});

globalStyle(`${contactStatement} em`, {
  fontStyle: "normal",
  color: theme.color.primary.main,
  borderBottom: `1px solid ${theme.color.tint.primarySoft}`,
});

globalStyle(`${contactStatement} a`, {
  color: "inherit",
  textDecoration: "underline",
  textDecorationColor: theme.color.tint.primarySoft,
  textDecorationThickness: "1px",
  textUnderlineOffset: "4px",
  transition: "color 180ms ease, text-decoration-color 180ms ease",
});

globalStyle(`${contactStatement} a:hover`, {
  color: theme.color.primary.main,
  textDecorationColor: theme.color.secondary.main,
});

// -- Contact row

export const contactRow = style({
  display: "grid",
  gridTemplateColumns: "1fr",
  rowGap: theme.space._4,
  columnGap: theme.space._24,
  alignItems: "baseline",
  padding: `${theme.space._16} 0`,
  borderTop: `1px solid ${theme.color.divider}`,
  borderBottom: `1px solid ${theme.color.divider}`,
  [mq.sm]: {
    gridTemplateColumns: "160px 1fr",
  },
});

export const contactRowLabel = style({
  fontWeight: theme.typography.fontWeight.bold,
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  whiteSpace: "nowrap",
  color: theme.color.text.secondary,
});

export const contactRowList = style({
  listStyle: "none",
  margin: 0,
  padding: 0,
  display: "flex",
  flexWrap: "wrap",
  alignItems: "baseline",
  rowGap: theme.space._4,
  columnGap: theme.space._24,
});

export const contactRowItem = style({
  display: "inline-flex",
  alignItems: "baseline",
  listStyleType: "none",
});

// Contact link (TextLink override hooks)

export const contactLink = style({});

// Tint the trailing arrow copper on hover (TextLink's right slot).
globalStyle(`${contactLink}${linkBtnBase}:hover ${rightSlotEnabled}`, {
  color: theme.color.secondary.main,
});

// Tint the leading icon primary on hover (overrides TextLink's default).
globalStyle(`${contactLink}${linkBtnBase}:hover ${leftSlotHold}`, {
  color: theme.color.primary.main,
});
