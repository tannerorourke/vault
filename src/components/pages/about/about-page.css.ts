import { style, globalStyle } from "@vanilla-extract/css";
import { theme } from "@/lib/theme/theme.css";
import { mq } from "@/lib/theme/responsive.css";
import { page } from "@/lib/styles/page.css";

export { par } from "@/lib/styles/common.css";


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

export const photoFigure = style({
  margin: 0,
});

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

    export const photo = style({
      display: "block",
      width: "100%",
      height: "auto",
      aspectRatio: "4 / 5",
      borderRadius: "4px",
      objectFit: "cover",
      background: theme.color.tint.primaryWeak,
      filter: "saturate(0.95)",
      [mq.md]: {
        borderRadius: "8px",
      }
    });

// -- Prose

export const proseCol = style({
  display: "flex",
  flexDirection: "column",
  gap: theme.space._12,
  maxWidth: "62ch",
});

// -- CONTACT

export const contactSection = style({
  display: "flex",
  flexDirection: "column",
  borderTop: `1px solid ${theme.color.divider}`,
});

  const contactRowBase = {
    display: "inline-block",
    padding: `${theme.space._20} 0`,
    // borderTop: `1px solid ${theme.color.divider}`,
    borderBottom: `1px solid ${theme.color.divider}`,
  }

  export const contactRow = style(contactRowBase);

  export const contactRowGrid = style({
    ...contactRowBase,
    display: "grid",
    gridTemplateColumns: "1fr",
    rowGap: theme.space._4,
    columnGap: theme.space._24,
    alignItems: "center",
    [mq.sm]: {
      gridTemplateColumns: "130px 1fr",
    },
  });

    // -- Contact statement
    export const contactStatement = style({
      fontFamily: theme.typography.fontFamily.display,
      fontSize: "clamp(20px, 2vw, 26px)",
      lineHeight: theme.typography.lineHeight.snug,
      fontWeight: theme.typography.fontWeight.medium,
      letterSpacing: "-0.012em",
      color: theme.color.text.primary,
      maxWidth: "44ch",
      margin: `${theme.space._12} 0 ${theme.space._24}`,
    });

      globalStyle(`${contactStatement} em`, {
        fontStyle: "normal",
        color: theme.color.primary.main,
      });

      globalStyle(`${contactStatement} a`, {
        color: "inherit",
        background: "transparent",
        backgroundImage: "linear-gradient(currentColor, currentColor)",
        backgroundSize: "0% 2px",
        backgroundPosition: "bottom left",
        backgroundRepeat: "no-repeat",
        transition: "color 150ms ease, background-size 200ms ease",
      });

      globalStyle(`${contactStatement} a:focus-visible`, {
        outline: `2px solid ${theme.color.focus}`,
        outlineOffset: 2,
      });

      globalStyle(`${contactStatement} a:hover`, {
        color: theme.color.primary.hover,
        backgroundSize: "100% 2px",
      });

      globalStyle(`${contactStatement} a:active`, {
        backgroundSize: "100% 2px",
      });

    // -- Contact links
    export const contactGridLabel = style({
      fontWeight: theme.typography.fontWeight.semibold,
      letterSpacing: "0.16em",
      textTransform: "uppercase",
      whiteSpace: "nowrap",
      color: theme.color.text.secondary,
    });

    export const contactGridList = style({
      listStyle: "none",
      margin: 0,
      padding: 0,
      display: "flex",
      flexWrap: "wrap",
      alignItems: "baseline",
      rowGap: theme.space._4,
      columnGap: theme.space._24,
    });

      export const contactLink = style({
        fontFamily: theme.typography.fontFamily.sans,
      });

    export const footPad = style({ 
      marginRight: "6px"
    })
    export const footLink = style({
      fontFamily: theme.typography.fontFamily.sans,
    });
