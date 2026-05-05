import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { theme } from "@/lib/theme/theme.css";
import { mq } from "@/lib/theme/responsive.css";

const DIVIDER = "1px solid rgba(0,0,0,0.08)";
const CHIP_BG = "rgba(0, 0, 0, 0.04)";
const CARD_HOVER_SHADOW = "0 8px 32px -4px rgba(42, 95, 88, 0.20)";

const cardBase = style({
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

export const card = recipe({
  base: cardBase,
  variants: {
    variant: {
      default: {},
      feature: {
        [mq.md]: {
          gridColumn: "span 2",
        },
      },
      minimal: {},
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export type ProjectCardVariant = NonNullable<
  Parameters<typeof card>[0]
>["variant"];

export const image = style({
  width: "100%",
  height: "160px",
  objectFit: "cover",
  objectPosition: "center",
  display: "block",
  selectors: {
    [`${cardBase}:has(&) &`]: {},
  },
});

export const featureImage = style({
  height: "220px",
});

export const body = style({
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

export const title = style({
  fontFamily: "var(--font-display)",
  fontSize: "20px",
  fontWeight: theme.typography.fontWeight.bold,
  lineHeight: "1.2",
  color: theme.color.primary.main,
  margin: 0,
});

export const featureTitle = style({
  fontSize: "24px",
});

export const desc = style({
  fontSize: "13px",
  lineHeight: "1.55",
  color: theme.color.text.primary,
  margin: 0,
});

export const footer = style({
  borderTop: DIVIDER,
  padding: `${theme.space._8} ${theme.space._16}`,
  display: "flex",
  alignItems: "center",
  gap: theme.space._8,
  marginTop: "auto",
});

export const tagsRow = style({
  display: "inline-flex",
  alignItems: "center",
  gap: theme.space._8,
  flexWrap: "wrap",
});

export const readChip = style({
  marginLeft: "auto",
  display: "inline-flex",
  alignItems: "center",
  gap: theme.space._4,
  fontSize: theme.typography.fontSize.micro,
  fontWeight: theme.typography.fontWeight.medium,
  color: theme.color.text.secondary,
  background: CHIP_BG,
  borderRadius: "20px",
  padding: "3px 10px",
  transition: "color 200ms ease, background-color 200ms ease",

  selectors: {
    [`${cardBase}:hover &`]: {
      color: theme.color.primary.hover,
    },
  },
});

export const readChipIcon = style({
  width: "10px",
  height: "10px",
  fill: "currentColor",
  flexShrink: 0,
});
