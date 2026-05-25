import { style } from "@vanilla-extract/css";
import { theme } from "@/lib/theme/theme.css";
import { mq } from "@/lib/theme/responsive.css";
import { page } from "@/lib/styles/page.css";
import { EASE_CUBIC } from "@/lib/styles/utils.css";

export const root = style(page);

  export const content = style({

  });

  export const heading = style({
    fontSize: "14px",
    lineHeight: "1.5",
    color: theme.color.text.primary,
    letterSpacing: "0.005em",
    fontWeight: theme.typography.fontWeight.regular,
    marginBottom: theme.space._48,
    [mq.md]: { fontSize: "15px" },
    [mq.lg]: { fontSize: "16px" },
  });

  export const sectionHeading = style({
    fontSize: "11px",
    fontWeight: theme.typography.fontWeight.bold,
    letterSpacing: "0.16em",
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
    padding: `0 ${theme.space._24}`,
    [mq.sm]: { 
      padding: `0 ${theme.space._24}`,
    },
    [mq.md]: {
      padding: `0 ${theme.space._80}`,
    },
    [mq.lg]: {
      padding: `0 ${theme.space._96}`,
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
