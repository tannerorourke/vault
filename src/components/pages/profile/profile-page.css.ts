import { style, globalStyle } from "@vanilla-extract/css";
import { theme } from "@/lib/theme/theme.css";
import { mq } from "@/lib/theme/responsive.css";

const PHOTO_BG = "rgba(42, 95, 88, 0.06)";
const DIVIDER_TEAL = "rgba(42, 95, 88, 0.16)";
const DIVIDER_TEAL_SOFT = "rgba(42, 95, 88, 0.10)";


export const profileRoot = style({
  position: "relative",
  zIndex: theme.layout.zIndex.content,
  width: "100%",
  maxWidth: "1100px",
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

export const stDisplay = style({
  marginBottom: theme.space._32,
  [mq.md]: {
    marginBottom: theme.space._56,
  },
});
  export const textDisplay = style({
    margin: 0,
    fontFamily: "var(--font-display)",
    color: theme.color.text.primary,
    width: 'fit-content',
    maxWidth: "16ch",
    textWrap: "balance",
    [mq.md]: {
      maxWidth: "18ch",
    },
  });
  globalStyle(`${textDisplay} strong`, {
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.color.primary.main,
    letterSpacing: theme.typography.letterSpacing.tight,
  });


export const body = style({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: theme.space._48,
  alignItems: "start",
  marginBottom: theme.space._56,
  [mq.md]: {
    gridTemplateColumns: "minmax(260px, 4fr) minmax(0, 7fr)",
    gap: theme.space._80,
  },
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
      transform: "rotate(-1.4deg)",
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
        aspectRatio: "1 / 1",
        borderRadius: "10px",
        objectFit: "cover",
        background: PHOTO_BG,
        boxShadow: `0 4px 20px -2px ${theme.color.shadow}`,
      });

// -- Prose Column ----------------------------------------------
  export const bodyProse = style({
    maxWidth: "620px",
    [mq.md]: {
      paddingTop: theme.space._4,
    },
  });
    export const prose = style({
      margin: `0 0 ${theme.space._32}`,
      selectors: {
        "&:last-of-type": { marginBottom: 0 },
      },
    });
      export const pDivider = style({
        border: 0,
        height: "1px",
        margin: `0 0 ${theme.space._20}`,
        background: DIVIDER_TEAL,
      });
      export const par = style({
        margin: `0 0 ${theme.space._20}`,
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

// -- Get In Touch ----------------------------------------------

export const contact = style({
  marginTop: theme.space._56,
  // paddingTop: theme.space._24,
  borderTop: `1px solid ${DIVIDER_TEAL_SOFT}`,
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  gap: `${theme.space._12} ${theme.space._24}`,
});

  export const contactLabel = style({
    letterSpacing: "0.18em",
    textTransform: "uppercase",
  });

  export const contactList = style({
    listStyle: "none",
    margin: 0,
    padding: 0,
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: `${theme.space._4} ${theme.space._16}`,
  });
    export const contactItem = style({
      display: "inline-flex",
    });
      export const contactLink = style({
        display: "inline-flex",
        alignItems: "center",
        gap: theme.space._8,
        padding: `${theme.space._8} ${theme.space._12}`,
        borderRadius: "8px",
        color: theme.color.text.primary,
        textDecoration: "none",
        transition: "color 200ms ease, background-color 200ms ease",

        selectors: {
          "&:hover": {
            color: theme.color.secondary.active,
          },
          "&:focus-visible": {
            outline: `2px solid ${theme.color.primary.hover}`,
            outlineOffset: 2,
          },
        },
      });

      export const contactIcon = style({
        width: "16px",
        height: "16px",
        flexShrink: 0,
        fill: "currentColor",
      });
