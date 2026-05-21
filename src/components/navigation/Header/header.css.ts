import { mq } from "@/lib/theme/responsive.css";
import { theme } from "@/lib/theme/theme.css";
import { style, globalStyle } from "@vanilla-extract/css";
import { balance, falling, rY, rX, spinTop } from "@/lib/styles/animation.css";

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

  padding: `32px ${theme.space._24} 0`,
  [mq.sm]: {  padding: `48px ${theme.space._24} 0` },
  [mq.md]: {  padding: `48px ${theme.space._96} 0` },
  [mq.lg]: {  padding: `56px ${theme.space._112}` },

  selectors: {
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      // extend ~40px below the header for overhang
      bottom: '-40px',
      backdropFilter: 'blur(4px)',
      WebkitBackdropFilter: 'blur(4px)',
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
    display: "flex",
    flexWrap: "wrap",
    cursor: "text",
    flex: "0 0 100%",
    [mq.md]: { flex: "0 0 300px" },
    selectors: {
      "&:span": { lineHeight: '0.1em !important' }
    }
  });

  export const navScrollWrap = style({
    position: "relative",
    flex: "1 1 0",
    minWidth: 0,
    overflowX: "auto",
    overflowY: "hidden",
    WebkitOverflowScrolling: "touch",
    scrollbarWidth: "none",
    maskImage:
      "linear-gradient(to right, #000 0, #000 calc(100% - 24px), transparent 100%)",
    WebkitMaskImage:
      "linear-gradient(to right, #000 0, #000 calc(100% - 24px), transparent 100%)",
    [mq.lg]: {
      flex: "0 1 auto",
      overflowX: "visible",
      maskImage: "none",
      WebkitMaskImage: "none",
    },
  });

  globalStyle(`.${navScrollWrap}::-webkit-scrollbar`, { display: "none" });

    export const navFlex = style({
      display: "inline-flex",
      alignItems: "center",
      gap: "32px",
      marginTop: "6px",
      padding: "2px"
    });

      export const navFilters = style({
        fontWeight: `${theme.typography.fontWeight.semibold} !important`,
      })

  export const navRight = style({
    display: "flex",
    alignItems: "center",
    gap: 12,
    marginLeft: "auto",
    flex: "0 0 auto",
    padding: "2px"
  });

    export const navProfLink = style({
      marginTop: "6px"
    });

// --- Logo ---------------------------------------

export const word = style({
  perspective: '1000px',
  lineHeight: '0 !important',
  width: 'fit-content',
  height: '42px',
});

// Empty style so JS can reference the hashed class name
export const active = style({});

globalStyle(`.${word} span`, {
  cursor: 'pointer',
  display: 'inline-block',
  fontSize: '44px',
  userSelect: 'none',
  lineHeight: 0.8,
});

globalStyle('#logo-T, #logo-N2, #logo-O1, #logo-U, #logo-K', { cursor: 'help' });

globalStyle(`#logo-T[data-active]`,  { animation: `${balance} 1.5s ease-out`, transformOrigin: 'bottom left' });
globalStyle(`#logo-N2[data-active]`, { animation: `${rY} 1s ease-out` });
globalStyle('#logo-O1[data-active]', { animation: `${spinTop} 2.5s ease-in` });
globalStyle(`#logo-U[data-active]`,  { animation: `${falling} 1s ease-out` });
globalStyle(`#logo-K[data-active]`,  { animation: `${rX} 1.5s linear`, transformOrigin: 'bottom left' });