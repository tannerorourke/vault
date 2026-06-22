import { globalStyle, style } from "@vanilla-extract/css";
import { theme } from "@/lib/theme/theme.css";
import { EASE_CUBIC, mq } from "@/lib/theme/responsive.css";


export const main = style({
  background: theme.color.surfaceAlt,
  position: "relative",
  width: "100%",
  paddingBottom: `calc((${theme.page.marginBottom.xs} + ${theme.space._8}))`, // match fixed footer
  [mq.sm]: {
    minHeight: 'unset',
    paddingBottom: 0, // unset
  },
  [mq.md]: {
    paddingBottom: theme.page.marginBottom.md, // space below body canvas bg
  },
  [mq.lg]: {
    paddingBottom: theme.page.marginBottom.lg,
  },


});

export const intro = style({
  // background: theme.color.surfaceAlt,
  position: "relative",
  margin: "0 auto",
  display: "flex",
  padding: 0,
  transition: `padding 1000ms ${EASE_CUBIC}`,
  
  [mq.sm]: {
    maxWidth: '900px',
  },
  [mq.md]: {
    width: '900px',
    maxWidth: '100%',
    padding: `${theme.page.clearanceTop.md} 0 ${theme.space._36} ${theme.space._12}`,
  },
  [mq.lg]: {
    width: '900px',
    padding: `${theme.page.clearanceTop.md} 0 ${theme.space._32} 0`,
  }
});

  export const introFlex = style({
    display: "flex",
    flexDirection: "column",
    margin: '0 auto',
    
    [mq.md]: {
      margin: 0,
      // left pad from image
      padding: `0 0 0 ${theme.space._76}`,
    }
  });

    export const headline = style({
      color: theme.color.text.primary,
      padding: `${theme.space._76} ${theme.space._48} ${theme.space._24} ${theme.space._12}`,
      [mq.sm]: {
        // T/B padding only
        padding: `${theme.space._76} 0 ${theme.space._16}`,
      }
    });
    globalStyle(`${headline} em`, {
      fontStyle: "normal",
      color: theme.color.secondary.active,
      display: 'block'
    });

    export const cues = style({
      position: "fixed",
      left: "50%", bottom: 0, 
      transform: "translateX(-50%)",
      zIndex: theme.zIndex.pageSticky,
      width: "100%",

      // height: theme.page.marginBottom.xs,
      height: `calc(${theme.page.marginBottom.xs} + ${theme.space._8})`,
      background: theme.color.surfaceAlt,
      borderTop: `1px solid ${theme.color.divider}`,
      [mq.sm]: {
        position: "static",
        transform: "none",
        borderTop: 'none',
        // T/B padding only
        padding: `${theme.space._8} 0 ${theme.space._24}`, 
      }
    });

  export const photoWrap = style({
    width: "40vw",
    transition: `width 200ms ${EASE_CUBIC}`,
    [mq.sm]: {
      width: "min(50vw, 400px)",
    },
  });

    export const photo = style({
      display: "block",
      width: "100%",
      height: "auto",
      minHeight: "200px", // force image width shrink instead of height
      aspectRatio: "10 / 9",
      objectFit: "cover",
      objectPosition: "center",
      borderRadius: "0",
      background: theme.color.surfaceAlt,
      [mq.sm]: {
        aspectRatio: "1 / 1",
        borderRadius: "0 4px 4px 0",
        objectPosition: "center",
      },
    });

export const contentCtnr = style({
  margin: "0 auto",
  width: '950px',
  maxWidth: '100%',
  // background: theme.color.surfaceAlt,
});

  export const content = style({
    background: theme.color.canvas,
    [mq.md]: { marginLeft: "12px" },
    [mq.lg]: { marginLeft: 0 }
  });

    export const about = style({
      display: "block !important",
      margin: '0 auto',
      textWrap: "pretty",
      fontSize: theme.typography.fontSize.bodySm,
      opacity: 0.92,
      padding: `${theme.space._24} ${theme.page.gutter.xs} ${theme.space._24}`,
      [mq.sm]: {
        maxWidth: "900px",
        padding: `${theme.space._36} ${theme.page.gutter.sm} ${theme.space._24}`,
      },
      [mq.md]: {
        width: "900px",
        maxWidth: "100%",
        padding: `${theme.space._36} 0 ${theme.space._24}`,
      },
      [mq.lg]: {
        padding: `${theme.space._36} 0 ${theme.space._24}`,
      },
    });
