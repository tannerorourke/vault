import { style, globalStyle } from "@vanilla-extract/css";
import { theme } from "@/lib/theme/theme.css";
import { mq } from "@/lib/theme/responsive.css";
import { markdownInline } from "@/lib/styles/common.css";

const MEDIA_RADIUS = "10px";

export const section = style({
  scrollMarginTop: `calc(${theme.page.marginTop.xs} + ${theme.space._24})`,
  [mq.sm]: {
    scrollMarginTop: `calc(${theme.page.marginTop.sm} + ${theme.space._24})`,
  },
  [mq.md]: {
    scrollMarginTop: `calc(${theme.page.marginTop.md} + ${theme.space._24})`,
  },
  [mq.lg]: {
    scrollMarginTop: `calc(${theme.page.marginTop.lg} + ${theme.space._24})`,
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

// --- Media ---------------------------------
// --- 1-up Image
export const image = style({
  width: "100%",
  height: "auto",
  borderRadius: MEDIA_RADIUS,
  display: "block",
  marginTop: theme.space._4,
});

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
    height: "auto",
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


// --- Stat sheet
export const statsList = style({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
  gap: 0,
  listStyle: "none",
  margin: 0,
  padding: 0,
  borderTop: `1px solid ${theme.color.divider}`,
  borderBottom: `1px solid ${theme.color.divider}`,
});

  export const statItem = style({
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
