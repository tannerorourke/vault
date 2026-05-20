import { style } from "@vanilla-extract/css";
import { theme } from "@/lib/theme/theme.css";
import { mq } from "@/lib/theme/responsive.css";
import { page, SLOW_SNAP } from "@/lib/styles/page.css";

export const root = style([
  page,
  {
    zIndex: theme.layout.zIndex.content,
  }
]);

    export const sectionHeader = style({
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: theme.space._16,
      borderBottom: `1px solid ${theme.color.divider}`,
      paddingBottom: theme.space._12,
      marginBottom: theme.space._24,
    });

    export const sectionTitle = style({
      fontFamily: "var(--font-display)",
      fontSize: theme.typography.fontSize.bodySm,
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
  marginInline: "auto",

  // xs: full width single col, v gap only
  gridTemplateColumns: "minmax(0, 1fr)",
  rowGap: theme.space._16,
  columnGap: 0,

  [mq.sm]: {
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    rowGap: theme.space._24,
    columnGap: theme.space._36,
  },
  [mq.md]: {
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    rowGap: theme.space._36,
    columnGap: theme.space._48,
  },
  [mq.lg]: {
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 360px))",
    maxWidth: `${5 * 360 + 4 * 48}px`, // ~1992px, caps growth on ultrawide
    marginInline: "0"
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
  transition: `padding 500ms ${SLOW_SNAP}`,

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
