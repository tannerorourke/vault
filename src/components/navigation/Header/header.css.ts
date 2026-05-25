import { mq } from "@/lib/theme/responsive.css";
import { theme } from "@/lib/theme/theme.css";
import { style, globalStyle } from "@vanilla-extract/css";
import { srOnly, EASE_CUBIC, balance, falling, rY, rX, spinTop } from "@/lib/styles/utils.css";

export const root = style({
  position: "fixed",
  top: 0, left: 0, right: 0,
  width: "100%",
  zIndex: theme.zIndex.header,

  display: "flex",
  alignItems: "flex-start",
  rowGap: 8,
  columnGap: 12,
  isolation: "isolate", // contains the ::before z-index: -1

  margin: '0 auto',
  padding: `${theme.header.padTop.xs} ${theme.page.gutter.xs} 0`,
  transition: `margin 400ms ${EASE_CUBIC}, padding 400ms ${EASE_CUBIC}, width 400ms ${EASE_CUBIC}`,
  [mq.sm]: { 
    padding: `${theme.header.padTop.sm} ${theme.page.gutter.sm} 0`,
    maxWidth: theme.page.maxContentWidth.sm,
  },
  [mq.md]: { 
    padding: `${theme.header.padTop.md} ${theme.page.gutter.md} 0`,
    width: theme.page.maxContentWidth.md,
    maxWidth: '100vw',
  },
  [mq.lg]: { 
    padding: `${theme.header.padTop.lg} ${theme.page.gutter.md} 0`,
    width: theme.page.maxContentWidth.lg,
    maxWidth: theme.page.maxContentWidth.lg,
  },
  selectors: {
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: '-20px',
      backdropFilter: 'blur(4px)',
      WebkitBackdropFilter: 'blur(4px)',
      maskImage:
        'linear-gradient(to bottom, black 0%, black 75%, transparent 100%)',
      WebkitMaskImage:
        'linear-gradient(to bottom, black 0%, black 75%, transparent 100%)',
      pointerEvents: 'none',
      zIndex: -1,
    }
  }
});

export const container = style({
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});



// Logo
export const logoContainer = style({
  display: "flex",
  flexWrap: "wrap",
  cursor: "text",
  marginRight: "12px",
  selectors: {
    "&:span": { lineHeight: '0.1em !important' }
  }
});

  export const word = style({
    lineHeight: '0 !important',
    width: 'fit-content',
    display: 'flex',
    flexWrap: 'nowrap',
    [mq.sm]: { width: 'fit-content' },
  });

  globalStyle(`.${word} span`, {
    cursor: 'pointer',
    display: 'inline-block',
    fontSize: `${theme.typography.fontSize.logo} !important`,
    letterSpacing: '-0.05em',
    userSelect: 'none',
    lineHeight: 0.8,
  });

  globalStyle('#logo-T, #logo-N2, #logo-O1, #logo-U, #logo-K', { cursor: 'help' });
  globalStyle(`#logo-T[data-active]`,  { animation: `${balance} 1.5s ease-out`, transformOrigin: 'bottom left' });
  globalStyle(`#logo-N2[data-active]`, { animation: `${rY} 1s ease-out` });
  globalStyle('#logo-O1[data-active]', { animation: `${spinTop} 2.5s ease-in`, transformOrigin: 'bottom' });
  globalStyle(`#logo-U[data-active]`,  { animation: `${falling} 1s ease-out` });
  globalStyle(`#logo-K[data-active]`,  { animation: `${rX} 1.5s linear` });

// nav
export const navRight = style({
  display: "flex",
  alignItems: "center",
  gap: theme.space._16,
  marginLeft: "auto",
  [mq.md]: {
    gap: theme.space._20,
  },
});

  export const aboutLink = style({
    display: "inline-flex",
    alignItems: "center",
    padding: "0px !important",
    // margin: "-2px",
    [mq.sm]: {
      padding: "revert",
      margin: "revert",
    },
  });

    // icon
    globalStyle(`.${aboutLink} span`, {
      display: "block",
      [mq.sm]: { display: "none" }
    });

    // text
    globalStyle(`.${aboutLink} p`, {
      ...srOnly,
      [mq.sm]: {
        position: 'static',
        width: 'auto',
        height: 'auto',
        padding: '0',
        margin: '0',
        overflow: 'visible',
        clip: 'auto',
        whiteSpace: 'normal',
        border: '0',
      }
    });

    export const aboutText = style({
      fontWeight: `${theme.typography.fontWeight.semibold} !important`,
    });

  

