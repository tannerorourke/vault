import { style } from "@vanilla-extract/css";
import { theme } from "@/lib/theme/theme.css";
import { mq } from "@/lib/theme/responsive.css";
import { page } from "@/lib/styles/page.css";
import { EASE_CUBIC } from "@/lib/styles/utils.css";

export const root = style(page);

export const heading = style({
  letterSpacing: "0.01em",
  marginBottom: theme.space._16
});

export const subheadingWrapper = style({
  display: 'flex',
  alignItems: 'flex-start',
  gap: '6px',
  marginBottom: theme.space._48,
});

const DOT_SIZE = '8px';

export const statusDot = style({
  width: DOT_SIZE,
  height: DOT_SIZE,
  borderRadius: '50%',
  backgroundColor: theme.color.status.available,
  border: `1px solid ${theme.color.primary.main}`,
  boxShadow: `0 0 4px ${theme.color.status.available}, 0 1px 2px ${theme.color.shadow}`,
  flexShrink: 0,
  // Match subheading's first-line box, then center dot 
  // within half the leftover - 2px
  fontSize: theme.typography.fontSize.body,
  lineHeight: theme.typography.lineHeight.relaxed,
  marginTop: `calc(((1lh - ${DOT_SIZE}) / 2) - 2px)`,
});

export const subheading = style({
  letterSpacing: "0.01em",
});

export const sectionHeading = style({
  fontSize: theme.typography.fontSize.body,
  fontWeight: theme.typography.fontWeight.bold,
  letterSpacing: theme.typography.letterSpacing.loose,
  textTransform: "uppercase",
  color: theme.color.text.secondary,
  margin: `${theme.space._48} 0 ${theme.space._8}`,
  padding: `0 18px`,
});

export const gridFeature = style({
  marginBottom: 0,
});

export const grid = style({
  display: "grid",
  marginInline: "auto",
  gridTemplateColumns: "minmax(0, 1fr)",
  rowGap: 0,
  columnGap: 0,
  borderTop: `1px solid ${theme.color.divider}`,

  [mq.md]: {
    gridTemplateColumns: "1fr 1fr",
    columnGap: theme.space._36,
    rowGap: 0,
  },
});

export const footer = style({
  position: "absolute",
  width: "100%",
  bottom: 0,   left: 0,
  padding: `0 ${theme.page.gutter.xs} ${theme.space._24}`,
  margin: `${theme.space._96} calc(-1 * ${theme.page.gutter.xs}) 0`,
  [mq.sm]: {
    padding: `0 ${theme.page.gutter.sm} ${theme.space._24}`,
    margin: `${theme.space._96} calc(-1 * ${theme.page.gutter.sm}) 0`,
  },
  [mq.md]: {
    padding: `0 ${theme.page.gutter.md} ${theme.space._24}`,
    margin: `${theme.space._96} calc(-1 * ${theme.page.gutter.md}) 0`,
  },
  [mq.lg]: {
    padding: `0 ${theme.page.gutter.lg} ${theme.space._24}`,
    margin: `${theme.space._96} calc(-1 * ${theme.page.gutter.lg}) 0`,
  },
  transition: `padding 500ms ${EASE_CUBIC}`,

  selectors: {
    '&::before': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      // extend ~40px below the header for overhang
      top: '-20px',
      backdropFilter: 'blur(3px)',
      WebkitBackdropFilter: 'blur(3px)',
      maskImage:
        'linear-gradient(to bottom, black 0%, black 55%, transparent 100%)',
      WebkitMaskImage:
        'linear-gradient(to bottom, black 0%, black 55%, transparent 100%)',
      pointerEvents: 'none',
      zIndex: -1,
    }
  }
});