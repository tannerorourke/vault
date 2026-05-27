import { style, globalStyle, styleVariants } from "@vanilla-extract/css";
import { theme } from "@/lib/theme/theme.css";
import { mq } from "@/lib/theme/responsive.css";

const MEDIA_RADIUS = "10px";

export const section = style({
  scrollMarginTop: `calc(${theme.header.offset.xs} + ${theme.space._24})`,
  [mq.sm]: {
    scrollMarginTop: `calc(${theme.header.offset.sm} + ${theme.space._24})`,
  },
  [mq.md]: {
    scrollMarginTop: `calc(${theme.header.offset.md} + ${theme.space._24})`,
  },
  [mq.lg]: {
    scrollMarginTop: `calc(${theme.header.offset.lg} + ${theme.space._24})`,
  },
});

export const sectionTitle = style({
  display: "flex",
  alignItems: "baseline",
  gap: theme.space._12,
  margin: `0 0 ${theme.space._16} 0`,
  selectors: {
    "&::before": {
      content: "''",
      display: "inline-block",
      width: "9px",
      height: "2px",
      background: theme.color.secondary.main,
      flexShrink: 0,
      transform: "translateY(-6px)",
    },
  },
});

export const sectionTitleCopper = style({
  selectors: {
    "&::before": {
      background: theme.color.primary.main,
    },
  },
});

// --- Prose ---
// --- paragraphs
export const prose = style({
  fontFamily: theme.typography.fontFamily.serif,
});
    globalStyle(`${prose} p`, {
      margin: `0 0 ${theme.space._12}`,
    });
    globalStyle(`${prose} p:last-child`, {
      margin: 0,
    });
    globalStyle(`${prose} a`, {
      color: theme.color.link.main,
      textDecoration: "underline",
      textDecorationColor: theme.color.tint.primaryHoverSoft,
    });
    globalStyle(`${prose} a:hover`, {
      color: theme.color.link.hover,
    });
    globalStyle(`${prose} strong`, {
      fontWeight: theme.typography.fontWeight.semibold,
    });
    globalStyle(`${prose} em`, {
      fontStyle: "italic",
    });

// --- Bulleted List

export const bulletList = style({
  display: "flex",
  flexDirection: "column",
  gap: theme.space._12,
  listStyle: "none",
  padding: 0,
  margin: 0,
  maxWidth: "70ch",
  [mq.md]: { maxWidth: "88ch" },
  [mq.lg]: { maxWidth: "90ch" }
});

  export const bulletListItem = style({
    position: "relative",
    paddingLeft: "22px",
    selectors: {
      "&::before": {
        content: "''",
        position: "absolute",
        left: 0,
        top: "0.78em",
        width: "8px",
        height: "1px",
        background: theme.color.secondary.main,
        opacity: 0.85,
      }
    }
  })
    globalStyle(`${bulletListItem} strong`, {
      fontWeight: theme.typography.fontWeight.semibold,
    });

export const bulletListIntro = style({
  marginBottom: theme.space._12,
});


// --- Media ---------------------------------
// --- Two-Up Image
export const twoUp = style({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: theme.space._24,
  alignItems: "start",
  [mq.md]: {
    gridTemplateColumns: "45% 1fr",
  }
});

  export const twoUpReverse = style({
    "@media": {
      "(min-width: 700px)": {
        direction: "rtl",
      },
    },
  });

  globalStyle(`${twoUpReverse} > *`, {
    "@media": {
      "(min-width: 700px)": {
        direction: "ltr",
      },
    },
  });

  export const twoUpStacked = style({
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: theme.space._24,
    alignItems: "start",
  });

  export const inlineImage = style({
    width: "100%",
    borderRadius: MEDIA_RADIUS,
    display: "block",
  });


  // --- image captions
  export const inlineImageWrap = style({
    display: "flex",
    flexDirection: "column",
  })
  export const imgCaption = style({
    marginTop: theme.space._8
  });

// --- 1-up Image

export const standaloneImage = style({
  width: "100%",
  borderRadius: MEDIA_RADIUS,
  display: "block",
  marginTop: theme.space._4,
});


// --- Video
export const videoWrap = style({
  width: "100%",
  borderRadius: MEDIA_RADIUS,
  overflow: "hidden",
  background: theme.color.canvas,
  aspectRatio: "16 / 9",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginTop: theme.space._4,
});

export const videoMedia = style({
  width: "100%",
  height: "100%",
  border: "none",
  display: "block",
});


// --- Stat sheet
export const statsContainer = style({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
  gap: 0,
  borderTop: `1px solid ${theme.color.divider}`,
  borderBottom: `1px solid ${theme.color.divider}`,
});

  export const statCell = style({
    padding: `${theme.space._16} ${theme.space._20} ${theme.space._16}`,
    borderRight: `1px solid ${theme.color.divider}`,
    selectors: {
      "&:last-child": {
        borderRight: "none",
      },
    },
  });

    export const statValue = style({
      marginBottom: theme.space._8
    });
