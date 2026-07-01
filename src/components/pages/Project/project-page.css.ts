import { style } from "@vanilla-extract/css";
import { theme } from "@/lib/theme/theme.css";
import { mq } from "@/lib/theme/responsive.css";

export const main = style({
  display: "flex",
  flexDirection: "column",
  position: 'relative',
  width: "100%",
  margin: `0 auto`,
});


export const content = style({
  minHeight: "90vh",
  display: "flex",
  flexDirection: "column",
  gap: theme.space._16,
  position: "relative",

  margin: `0 auto`,
  // Top padding clears fixed Header (clearanceTop) + spacing
  padding: `${theme.page.marginTop.xs} ${theme.page.gutter.xs} 0`,
  // transition: `padding 300ms ${EASE_CUBIC}`,
  [mq.sm]: {
    padding: `${theme.page.marginTop.sm} ${theme.page.gutter.sm} 0`,
    maxWidth: theme.page.maxContentWidth.sm,
  },
  [mq.md]: {
    padding: `${theme.page.marginTop.md} ${theme.page.gutter.md} 0`,
    width: theme.page.maxContentWidth.md,
    maxWidth: '100vw',
    gap: theme.space._48,
  },
  [mq.lg]: {
    padding: `${theme.page.marginTop.lg} ${theme.page.gutter.lg} 0`,
    width: theme.page.maxContentWidth.lg,
    maxWidth: theme.page.maxContentWidth.lg,
  }
});

/** Hero */
export const header = style({ 
  display: "flex",
  flexDirection: "column",
});

  export const title = style({
    color: theme.color.text.primary,
    margin: `0 0 ${theme.space._16}`,
    maxWidth: "26ch",
    textWrap: "balance",
  });

  export const eyebrow = style({
    display: "flex",
    alignItems: "center",
    gap: theme.space._12,
    marginBottom: theme.space._12,
  });

  export const subtitle = style({
    fontFamily: theme.typography.fontFamily.serif,
    opacity: 0.85,
    margin: `0 0 ${theme.space._24}`,
    maxWidth: "62ch",
    textWrap: "pretty",
  });

  // hero foot (chips and links)
  export const heroFoot = style({
    display: "flex",
    alignItems: "baseline",
    gap: theme.space._16,
    flexWrap: "wrap",
    marginTop: theme.space._4,
  });

    export const chipsRow = style({
      display: "flex",
      flexWrap: "wrap",
      gap: theme.space._8,
      minWidth: 0,
      flex: "1 1 auto",
    });

    export const linksRow = style({
      display: "inline-flex",
      flexWrap: "wrap",
      gap: theme.space._8
    });

/** Hero image */
export const heroImage = style({
  width: "100%",
  height: "auto",
  display: "block",
  objectFit: "cover",
  borderRadius: "6px",
  background: theme.color.tint.neutralSoft,
});

export const layout = style({ 
  margin: `0 auto` 
});

  export const sectionsWrap = style({
    display: "flex",
    flexDirection: "column",
    gap: theme.space._56
  });


export const eyebrowGutter = style({ marginBottom: theme.space._24 });