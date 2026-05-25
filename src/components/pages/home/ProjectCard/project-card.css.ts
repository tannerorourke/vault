import { globalStyle, style } from "@vanilla-extract/css";
import { theme } from "@/lib/theme/theme.css";


export const cardBase = style({
  position: "relative",
  display: "grid",
  gridTemplateColumns: "minmax(0, 1fr)",
  padding: "14px 18px",

  background: "transparent",
  border: "none",
  borderBottom: `1px solid ${theme.color.divider}`,
  borderRadius: 0,
  boxShadow: "none",
  textDecoration: "none",
  color: "inherit",
  cursor: "pointer",
  overflow: "visible",
  transition: `background 200ms ease`,

  selectors: {
    '&:hover, &:focus-visible': {
      background: theme.color.tint.primaryWeak,
      outline: "none",
    },
  },
});

// Featured variant
globalStyle(`${cardBase}[data-variant="featured"]`, {
  gap: "18px",
  padding: "18px 20px",
  "@media": {
    "(min-width: 900px)": {
      padding: "20px 22px",
      gap: "28px",
      gridTemplateColumns: "45% 1fr",
    },
  },
});
globalStyle(`${cardBase}[data-variant="featured"][data-ratio="40-60"]`, {
  "@media": {
    "(min-width: 900px)": { gridTemplateColumns: "40% 1fr" },
  },
});
globalStyle(`${cardBase}[data-variant="featured"][data-ratio="50-50"]`, {
  "@media": {
    "(min-width: 900px)": { gridTemplateColumns: "1fr 1fr" },
  },
});


export const imageCol = style({
  position: "relative",
  aspectRatio: "16 / 10",
  borderRadius: "6px",
  overflow: "hidden",
});

export const heroImg = style({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
});

export const heroCaptionStack = style({
  position: "absolute",
  left: "12px",
  bottom: "12px",
  display: "flex",
  flexDirection: "column",
  gap: "2px",
  fontFamily: 'ui-monospace, "SFMono-Regular", Menlo, monospace',
});

export const heroLabelText = style({
  fontSize: "11px",
  color: theme.color.text.primary,
  opacity: 0.85,
});

export const heroCaptionText = style({
  fontSize: "10px",
  color: theme.color.text.secondary,
  opacity: 0.7,
});


export const bodyCol = style({
  display: "flex",
  flexDirection: "column",
  minWidth: 0,
});


export const eyebrow = style({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  fontSize: "10px",
  fontWeight: theme.typography.fontWeight.semibold,
  textTransform: "uppercase",
  letterSpacing: "0.12em",
  color: theme.color.text.secondary,
  margin: "0 0 6px",
  selectors: {
    [`${cardBase}[data-variant="featured"] &`]: {
      fontSize: "10.5px",
      marginBottom: "10px",
    },
  },
});

export const year = style({
  marginLeft: "auto",
  opacity: 0.7,
  selectors: {
    [`${cardBase}[data-variant="featured"] &`]: {
      letterSpacing: "0.08em",
    },
  },
});


export const title = style({
  fontFamily: theme.typography.fontFamily.display,
  fontWeight: theme.typography.fontWeight.semibold,
  fontSize: "17px",
  lineHeight: "1.22",
  letterSpacing: "-0.012em",
  color: theme.color.primary.main,
  margin: "0 0 6px",
  transition: `color 180ms ease`,
  selectors: {
    [`${cardBase}:hover &, ${cardBase}:focus-visible &`]: {
      color: theme.color.primary.hover,
    },
    [`${cardBase}[data-variant="featured"] &`]: {
      fontSize: "clamp(22px, 2.2vw, 26px)",
      lineHeight: "1.18",
      letterSpacing: "-0.018em",
      margin: "0 0 10px",
    },
  },
});

globalStyle(`${cardBase}[data-variant="featured"] ${title}`, {
  "@media": {
    "(min-width: 900px)": {
      fontSize: theme.typography.fontSize.titleMd,
    },
  },
});


export const summary = style({
  margin: 0,
  fontSize: "13px",
  lineHeight: "1.5",
  color: theme.color.text.primary,
  opacity: 0.78,
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
});

export const subtitle = style({
  fontSize: "14px",
  lineHeight: "1.55",
  color: theme.color.text.primary,
  opacity: 0.82,
  maxWidth: "60ch",
  margin: "0 0 14px",
});


export const foot = style({
  marginTop: "10px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "12px",
  selectors: {
    [`${cardBase}[data-variant="featured"] &`]: {
      marginTop: "auto",
      gap: "16px",
      flexWrap: "wrap",
    },
  },
});


export const tagsInline = style({
  fontSize: "10px",
  fontWeight: theme.typography.fontWeight.semibold,
  letterSpacing: "0.13em",
  textTransform: "uppercase",
  color: theme.color.text.secondary,
  lineHeight: "1.4",
  minWidth: 0,
  flex: "1 1 auto",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const tagsSep = style({
  margin: "0 7px",
  opacity: 0.45,
});


export const cardLinks = style({
  display: "inline-flex",
  gap: 0,
  flexShrink: 0,
  marginRight: "-4px",
});

export const cardLink = style({
  width: "28px",
  height: "28px",
  display: "inline-grid",
  placeItems: "center",
  borderRadius: "6px",
  color: theme.color.text.secondary,
  textDecoration: "none",
  opacity: 0.7,
  background: "transparent",
  transition: `color 180ms ease, opacity 180ms ease, background 180ms ease`,
  selectors: {
    '&:hover, &:focus-visible': {
      background: theme.color.tint.secondarySoft,
      color: theme.color.secondary.main,
      opacity: 1,
      outline: "none",
    },
  },
});

// Suppress card's own hover state while an icon link inside it is hovered/focused,
// so only one target reads as active under the cursor.
globalStyle(
  `${cardBase}:has(${cardLink}:hover), ${cardBase}:has(${cardLink}:focus-visible)`,
  {
    background: "transparent",
  },
);
globalStyle(
  `${cardBase}:has(${cardLink}:hover) ${title}, ${cardBase}:has(${cardLink}:focus-visible) ${title}`,
  {
    color: theme.color.primary.main,
  },
);

