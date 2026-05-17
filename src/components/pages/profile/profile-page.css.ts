import { style, globalStyle } from "@vanilla-extract/css";
import { theme } from "@/lib/theme/theme.css";
import { mq } from "@/lib/theme/responsive.css";


export const profileRoot = style({
  position: "relative",
  zIndex: theme.layout.zIndex.content,
  width: "100%",
  maxWidth: "1240px",
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

export const body = style({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: theme.space._48,
  alignItems: "start",
  marginBottom: theme.space._24,
  [mq.md]: {
    gridTemplateColumns: "minmax(260px, 4fr) minmax(0, 7fr)",
    gap: theme.space._80,
  },
});

// --- Snips ----------------------------------------------
export const pDivider = style({
  border: 0,
  height: "1px",
  // margin: `0 0 ${theme.space._20}`,
  background: theme.color.tint.primary,
});

// -- Photo Column ----------------------------------------------
  export const photoColumn = style({
    position: "relative",
    display: "flex",
    flexDirection: "column",
    gap: theme.space._32,
    maxWidth: "380px",
    width: "100%",
    [mq.md]: {
      position: "sticky",
      top: `calc(${theme.layout.headerHeight} + ${theme.space._32})`,
      paddingTop: theme.space._12,
      maxWidth: "none",
    },
  });
    export const photoFigure = style({
      margin: 0,
      transform: "rotate(-1deg)",
      transformOrigin: "top left",
      transition: "transform 600ms cubic-bezier(.2,.8,.2,1)",
      selectors: {
        "&:hover": {
          transform: "rotate(0deg) translateY(-2px)",
        },
      },
    });
      export const photo = style({
        display: "block",
        width: "100%",
        maxWidth: "380px",
        aspectRatio: "4 / 5",
        borderRadius: "10px",
        objectFit: "cover",
        background: theme.color.tint.primaryWeak,
        boxShadow: `0 4px 20px -2px ${theme.color.shadow}`,
      });

// -- Body ----------------------------------------------
  export const bodySheet = style({
    padding: `${theme.space._24} 28px`,
    maxWidth: "620px",
    [mq.md]: {
      paddingTop: theme.space._4,
    },
  });
    export const article = style({
      margin: `${theme.space._20} 0 ${theme.space._16}`,
      scrollMarginTop: `calc(${theme.layout.headerHeight} + ${theme.space._24})`,
      selectors: {
        "&:last-of-type": { marginBottom: 0 },
      },
    });
      
      export const par = style({
        // margin: `0 0 ${theme.space._20}`,
        color: theme.color.text.primary,
        textWrap: "pretty",
      });
      globalStyle(`${par} strong`, {
        fontWeight: theme.typography.fontWeight.semibold,
        color: theme.color.primary.main,
      });
      globalStyle(`${par} em`, {
        fontStyle: "italic",
        color: theme.color.text.primary,
      });

// -- Contact Sheet ----------------------------------------------

export const contactSheet = style({
  marginTop: theme.space._32,
  padding: `${theme.space._16} ${theme.space._24}`,
  display: "flex",
  flexDirection: "column",
  gap: theme.space._8,
});

  export const contactRow = style({
    display: "grid",
    gridTemplateColumns: "1fr",
    columnGap: theme.space._24,
    rowGap: theme.space._4,
    alignItems: "baseline",
    [mq.sm]: {
      gridTemplateColumns: "minmax(96px, max-content) 1fr",
    },
  });

    export const contactRowLabel = style({
      fontFamily: "var(--font-mono)",
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      whiteSpace: "nowrap",
    });

    export const contactRowList = style({
      listStyle: "none",
      margin: 0,
      padding: 0,
      display: "flex",
      flexWrap: "wrap",
      alignItems: "baseline",
      rowGap: theme.space._4,
    });

      export const contactRowItem = style({
        display: "inline-flex",
        alignItems: "baseline",
        listStyleType: "none",
        selectors: {
          "&:not(:first-child)::before": {
            content: '"\\00B7"',
            color: theme.color.text.secondary,
            margin: `0 ${theme.space._12}`,
            fontWeight: theme.typography.fontWeight.bold,
          },
        },
      });

