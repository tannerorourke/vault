import { style } from "@vanilla-extract/css";
import { theme } from "@/lib/theme/theme.css";
import { EASE_CUBIC, mq } from "@/lib/theme/responsive.css";


export const main = style({
  display: "flex",
  flexDirection: "column",
  position: "relative",
  width: "100%",
  margin: `0 auto`,
});

export const content = style({
  minHeight: "90vh",
  display: "flex",
  flexDirection: "column",
  gap: theme.space._32,

  margin: `0 auto`,
  padding: `${theme.page.clearanceTop.xs} ${theme.page.gutter.xs} 0`,
  transition: `padding 300ms ${EASE_CUBIC}`,
  [mq.sm]: { 
    padding: `${theme.page.clearanceTop.sm} ${theme.page.gutter.sm} 0`,
    maxWidth: theme.page.maxContentWidth.sm,
  },
  [mq.md]: {
    padding: `${theme.page.clearanceTop.md} ${theme.page.gutter.md} 0`,
    width: theme.page.maxContentWidth.md,
    maxWidth: '100vw',
    gap: theme.space._48,
  },
  [mq.lg]: {
    padding: `${theme.page.clearanceTop.lg} ${theme.page.gutter.lg} 0`,
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
    alignItems: "center",
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

/** Body layout */
const layoutGrid = {
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: theme.space._24,
  alignItems: "start",
  margin: `0 auto`,
  [mq.md]: {
    gridTemplateColumns: "220px 1fr",
    gap: theme.space._36,
  },
  [mq.lg]: {
    gridTemplateColumns: "240px 1fr",
    gap: theme.space._56,
  }
}

export const layout = style({ margin: `0 auto` });
export const layoutToc = style([{ margin: `0 auto` }, layoutGrid])

  export const tocWrapSticky = style({
    display: "inline-flex",
    [mq.md]: {
      display: "block",
      position: "sticky",
      top: `calc(${theme.page.marginTop.md})`,
    },
    [mq.lg]: {
      top: `calc(${theme.page.marginTop.lg})`,
    },
  });

  export const sectionsWrap = style({
    display: "flex",
    flexDirection: "column",
    gap: theme.space._56
  });


export const eyebrowGutter = style({ marginBottom: theme.space._24 });
