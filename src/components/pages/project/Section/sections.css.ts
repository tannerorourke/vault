import { style, globalStyle, styleVariants } from "@vanilla-extract/css";
import { theme } from "@/lib/theme/theme.css";
import { mq } from "@/lib/theme/responsive.css";

const MEDIA_RADIUS = "10px";

export const sectionSheet = style({
  padding: `${theme.space._24} 28px`,
});

  export const sectionTitle = style({
    fontFamily: "var(--font-display)",
    fontWeight: theme.typography.fontWeight.bold,
    fontSize: theme.typography.fontSize.titleXs,
    letterSpacing: "-0.012em",
    color: theme.color.primary.main,
    margin: `0 0 ${theme.space._12} 0`,
  });

  export const sectionTitleCopper = style({
    color: theme.color.secondary.active,
  });

    export const section = style({
      scrollMarginTop: `calc(${theme.layout.headerHeight} + ${theme.space._24})`,
    });

// --- Prose ---

export const prose = style({
  fontSize: theme.typography.fontSize.bodySm,
  lineHeight: "1.7",
  color: theme.color.text.primary,
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

// --- Bulleted List ---

export const list = style({
  margin: `${theme.space._8} 0 0 ${theme.space._20}`,
  fontSize: theme.typography.fontSize.bodySm,
  lineHeight: "1.7",
  color: theme.color.text.primary,
});

    globalStyle(`${list} li`, {
      marginBottom: theme.space._4,
    });
    globalStyle(`${list} li:last-child`, {
      marginBottom: 0,
    });

export const intro = style({
  marginBottom: theme.space._8,
});


// --- Media ---------------------------------

export const caption = style({
  fontSize: theme.typography.fontSize.caption,
  color: theme.color.text.secondary,
  marginTop: theme.space._8,
  textAlign: "center",
});


// --- Two-Up Image ---
export const twoUp = style({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: theme.space._24,
  alignItems: "start",
  "@media": {
    "(min-width: 700px)": {
      gridTemplateColumns: "1fr 1fr",
    },
  },
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

// --- 1-up Image ---

export const standaloneImage = style({
  width: "100%",
  borderRadius: MEDIA_RADIUS,
  display: "block",
  marginTop: theme.space._4,
});


// --- Video ---
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


// --- Stat sheet ---
export const strip = style({
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: theme.space._16,
  [mq.sm]: {
    gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
  },
});

export const cell = style({});

const valueBase = {
  fontFamily: "var(--font-display)",
  fontWeight: theme.typography.fontWeight.bold,
  letterSpacing: "-0.015em",
  lineHeight: 1,
  color: theme.color.primary.main,
  marginBottom: theme.space._8,
};

export const value = styleVariants({
  default: { ...valueBase, fontSize: theme.typography.fontSize.titleXs },
  headline: { ...valueBase, fontSize: theme.typography.fontSize.titleLg },
});

export const label = style({
  fontFamily: "var(--font-mono)",
  fontSize: theme.typography.fontSize.micro,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  lineHeight: 1.4,
  color: theme.color.text.secondary,
});