import { globalStyle, style } from "@vanilla-extract/css";
import { theme } from "@/lib/theme/theme.css";
import { EASE_CUBIC, mq } from "@/lib/theme/responsive.css";


export const main = style({
  position: "relative",
  width: "100%",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  // Reserve footer height
  marginBottom: theme.space._24
});


export const header = style({
  background: theme.color.canvasFeature,
});
export const headerBox = style({
  display: "flex",
  alignItems: "center",
  flexWrap: "wrap",
  margin: '0 auto',
  padding: 0,
  [mq.sm]: {
    maxWidth: "max(900px, 65vw)", // "900px"
    transition: `padding 300ms ${EASE_CUBIC}`,
  },
  [mq.md]: {
    width: "max(900px, 65vw)", // "900px"
    maxWidth: '100%',
    padding: `${theme.page.clearanceTop.md} 0 ${theme.space._24} ${theme.page.gutter.md}`,
  },
  [mq.lg]: {
    padding: `${theme.page.clearanceTop.md} 0 ${theme.space._36}`,
  }
});

  export const heroWrap = style({
    width: "40vw",
    [mq.sm]: {
      width: "min(35vw, 320px)",
      transition: `width 200ms ${EASE_CUBIC}`,
    },
    [mq.md]: {
      width: "min(40vw, 360px)",
    },
  });
    export const hero = style({
      display: "block",
      width: "100%",
      height: "auto",
      minHeight: "200px", // force image width shrink instead of height
      aspectRatio: "10 / 9",
      objectFit: "cover",
      objectPosition: "center",
      borderRadius: 0,
      background: theme.color.canvasFeature,
      [mq.sm]: {
        aspectRatio: "1 / 1",
        objectPosition: "center",
        minHeight: "250px",
      },
      [mq.md]: {
        borderRadius: "8px",
      }
    });

  export const textCol = style({
    display: "contents",
    [mq.sm]: {
      display: "flex",
      flex: 1,
      minWidth: 0,
      flexDirection: "column",
      justifyContent: "center",
    },
  });

  export const headline = style({
    flex: "1 1 0",
    minWidth: 0, // no wrap to next line on tight screen
    lineHeight: theme.typography.lineHeight.tight,
    display: "inline-flex",
    flexWrap: "wrap",
    width: 'fit-content',
    justifyContent: "flex-start",
    padding: `${theme.page.clearanceTop.xs} ${theme.space._12} ${theme.space._4} 2vw`,
    [mq.sm]: {
      padding: `${theme.page.clearanceTop.sm} ${theme.space._16} 0 3vw`,
    },
    [mq.md]: {
      margin: 0,
      padding: `0 ${theme.space._16} ${theme.space._8} 4vw`,
    }
  });
    export const greeting = style({
      display: "contents",
      lineHeight: theme.typography.lineHeight.tight,
      whiteSpace: "pre",
      fontSize: `min(${theme.typography.fontSize.headline}, 15vw) !important`,
      [mq.sm]: { fontSize: theme.typography.fontSize.headline },
    });
    globalStyle(`${greeting} span span`, { color: `${theme.color.secondary.main} !important` });

  export const subheadline = style({
    flexBasis: "100%",
    width: "100%",
    padding: `${theme.space._24} ${theme.page.gutter.xs} ${theme.space._24}`,
    [mq.sm]: {
      flexBasis: "auto",
      width: "auto",
      padding: `0 ${theme.space._16} 0 5vw`,
    },
    // align left edge under the title
    [mq.md]: { padding: `0 ${theme.space._12} 0 6vw` }
  });

export const content = style({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  margin: "0 auto",
  padding: 0,
  [mq.sm]: { padding: `${theme.space._12} 0` },
  [mq.md]: { padding: `${theme.space._24} 0` },
  [mq.lg]: { padding: `${theme.space._36} 0` }
});
export const contentBox = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  gap: theme.space._8,
  flex: 1, // stretch to bottom of page
  maxHeight: "500px", // but not too much
  background: theme.color.canvas,

  margin: '0 auto',
  padding: `${theme.space._24} ${theme.page.gutter.xs} ${theme.space._24}`,
  [mq.sm]: {
    maxWidth: "max(900px, 65vw)", // "900px"
    padding: `${theme.space._36} ${theme.page.gutter.sm} ${theme.space._24}`,
    transition: `padding 300ms ${EASE_CUBIC}`,
  },
  [mq.md]: {
    width: "max(900px, 65vw)", // "900px"
    maxWidth: "100%",
    padding: `${theme.space._32} ${theme.page.gutter.md} ${theme.space._24}`,
    margin: "0 12px" 
  },
  [mq.lg]: {
    padding: `${theme.space._36} ${theme.page.gutter.lg} ${theme.space._24}`,
    margin: 0 
  }
});
    export const body = style({
      display: "block !important",
      textWrap: "pretty",
      opacity: 0.92,
    });

    export const footer = style({
      paddingTop: theme.space._24
    });