import { mq } from "@/lib/theme/responsive.css";
import { theme } from "@/lib/theme/theme.css";
import { style, globalStyle } from "@vanilla-extract/css";

export const root = style({
  position: "fixed",
  top: 0, left: 0, right: 0,
  width: "100%",
  zIndex: theme.layout.zIndex.header,

  display: "flex",
  flexWrap: "wrap",
  alignItems: "flex-start",
  rowGap: 8,
  columnGap: 12,
  height: theme.layout.headerHeight,
  isolation: "isolate", // contains the ::before z-index: -1

  padding: '32px 16px 0 16px',
  [mq.sm]: {  padding: '48px 40px 0 40px' },
  [mq.lg]: {  padding: '56px 80px 0 80px' },

  selectors: {
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      // extend ~40px below the header for overhang
      bottom: '-40px',
      backdropFilter: 'blur(6px)',
      WebkitBackdropFilter: 'blur(6px)',
      maskImage:
        'linear-gradient(to bottom, black 0%, black 55%, transparent 100%)',
      WebkitMaskImage:
        'linear-gradient(to bottom, black 0%, black 55%, transparent 100%)',
      pointerEvents: 'none',
      zIndex: -1,
    }
  }
});

  export const logoContainer = style({
    flex: "0 0 100%",
    display: "flex",
    flexWrap: "wrap",
    cursor: "text",
    [mq.md]: { 
      flex: "0 0 300px"
    },
    selectors: {
      "&:span": { lineHeight: '0.1em !important' }
    }
  });

  export const navScrollWrap = style({
    flex: "1 1 0",
    minWidth: 0,
    overflowX: "auto",
    overflowY: "hidden",
    WebkitOverflowScrolling: "touch",
    scrollbarWidth: "none",
    maskImage:
      "linear-gradient(to right, #000 0, #000 calc(100% - 32px), transparent 100%)",
    WebkitMaskImage:
      "linear-gradient(to right, #000 0, #000 calc(100% - 32px), transparent 100%)",
    [mq.lg]: {
      flex: "0 1 auto",
      overflowX: "visible",
      maskImage: "none",
      WebkitMaskImage: "none",
    },
  });

  globalStyle(`.${navScrollWrap}::-webkit-scrollbar`, { display: "none" });

    export const navMain = style({
      display: "inline-flex",
      alignItems: "center",
      gap: "24px",
      marginTop: "6px",
      padding: "2px"
    });

  export const navRight = style({
    display: "flex",
    alignItems: "center",
    gap: 12,
    marginLeft: "auto",
    flex: "0 0 auto",
    padding: "2px"
  });