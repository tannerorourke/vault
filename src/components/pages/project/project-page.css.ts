import { style } from "@vanilla-extract/css";
import { theme } from "@/lib/theme/theme.css";
import { mq } from "@/lib/theme/responsive.css";



export const root = style({
  position: "relative",
  zIndex: theme.layout.zIndex.content,
  width: "100%",
  maxWidth: "1100px",
  margin: "0 auto",
  marginTop: theme.layout.headerOffset.xs,
  padding: `0 ${theme.space._24} ${theme.space._96}`,
  [mq.sm]: {
    padding: `0 ${theme.space._48}`,
    marginTop: theme.layout.headerOffset.sm,
  },
  [mq.md]: {
    padding: `0 ${theme.space._80} ${theme.space._96}`,
    marginTop: theme.layout.headerOffset.md,
  },
});

/** Headers */
export const headerSolo = style({
  marginBottom: theme.space._36,
});

export const headerWithFinding = style({
  marginBottom: theme.space._36,
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: theme.space._24,
  alignItems: "end",
  [mq.md]: {
    gridTemplateColumns: "1.5fr 1fr",
    gap: theme.space._48,
  },
});

  export const heroSheet = style({
    padding: "28px 32px",
  });

    export const eyebrow = style({
      fontSize: theme.typography.fontSize.eyebrow,
      fontWeight: theme.typography.fontWeight.semibold,
      textTransform: "uppercase",
      letterSpacing: "0.08em",
      color: theme.color.text.secondary,
      marginBottom: theme.space._8,
    });

    export const title = style({
      fontFamily: "var(--font-display)",
      fontSize: theme.typography.fontSize.displayLg,
      fontWeight: theme.typography.fontWeight.bold,
      lineHeight: "1.08",
      letterSpacing: "-0.02em",
      color: theme.color.primary.main,
      margin: `0 0 ${theme.space._12}`,
      textWrap: "balance",
      [mq.md]: {
        letterSpacing: "-0.024em",
        lineHeight: "1.05",
      },
    });

    export const subtitle = style({
      fontSize: theme.typography.fontSize.bodyLg,
      lineHeight: 1.55,
      color: theme.color.text.primary,
      margin: `0 0 ${theme.space._16}`,
      maxWidth: "58ch",
      textWrap: "pretty",
    });

    export const tagsRow = style({
      display: "flex",
      flexWrap: "wrap",
      gap: theme.space._8,
      marginBottom: theme.space._16,
    });

    export const links = style({
      display: "flex",
      flexWrap: "wrap",
      gap: theme.space._8,
    });

      export const linkBtn = style({
        display: "inline-flex",
        alignItems: "center",
        gap: "7px",
        padding: "8px 16px",
        borderRadius: "8px",
        fontSize: theme.typography.fontSize.caption,
        fontWeight: theme.typography.fontWeight.semibold,
        border: `1.5px solid ${theme.color.primary.main}`,
        color: theme.color.primary.main,
        background: "transparent",
        textDecoration: "none",
        cursor: "pointer",
        transition: "background-color 200ms ease, color 200ms ease",

        selectors: {
          "&:hover": {
            background: theme.color.primary.main,
            color: theme.color.contrast,
          },
          "&:focus-visible": {
            outline: `2px solid ${theme.color.focus}`,
            outlineOffset: 2,
          },
        },
      });

        export const linkBtnIcon = style({
          width: "20px",
          height: "20px",
          fill: "currentColor",
          flexShrink: 0,
        });

  export const findingCard = style({
    padding: "20px 24px",
  });
    export const findingEyebrow = style({
      fontSize: theme.typography.fontSize.eyebrow,
      fontWeight: theme.typography.fontWeight.semibold,
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      color: theme.color.secondary.active,
      marginBottom: theme.space._12,
    });
    export const findingBody = style({
      fontFamily: "var(--font-body)",
      fontSize: theme.typography.fontSize.bodySm,
      lineHeight: 1.55,
      color: theme.color.text.primary,
      margin: 0,
      textWrap: "pretty",
    });
    export const findingJump = style({
      marginTop: theme.space._12,
      paddingTop: theme.space._12,
      borderTop: `1px solid ${theme.color.divider}`,
      display: "flex",
      justifyContent: "space-between", alignItems: "center",
      // fontFamily: "var(--font-mono)",
      fontSize: theme.typography.fontSize.eyebrow,
      letterSpacing: "0.04em",
      textDecoration: "none",
      transition: "color 200ms ease",
      
    });
      export const findingName = style({
        color: theme.color.text.secondary,
      });
      export const findingJumpCta = style({});

/** Sections */
export const heroImage = style({
  width: "100%",
  display: "block",
  minHeight: "320px",
  objectFit: "cover",
  borderRadius: "10px",
  background: theme.color.card,
  marginBottom: theme.space._36,
});

export const layout = style({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: theme.space._24,
  alignItems: "start",
  [mq.md]: {
    gridTemplateColumns: "180px 1fr",
    gap: theme.space._56,
  },
});

  /** TOC */
  export const tocRoot = style({
    display: "none",
    [mq.md]: {
      display: "block",
      position: "sticky",
      top: `calc(${theme.layout.headerHeight} + ${theme.space._24})`,
    },
  });
    export const toc = style({
      padding: "14px 16px",
    });
      export const tocLabel = style({
        fontSize: theme.typography.fontSize.micro,
        fontWeight: theme.typography.fontWeight.semibold,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: theme.color.text.secondary,
        marginBottom: theme.space._12,
      });
        export const tocLink = style({
          display: "block",
          fontSize: theme.typography.fontSize.caption,
          fontWeight: theme.typography.fontWeight.medium,
          color: theme.color.text.secondary,
          padding: "4px 0 4px 12px",
          borderLeft: "2px solid transparent",
          letterSpacing: "-0.005em",
          textDecoration: "none",
          transition: "color 200ms ease, border-color 200ms ease",
          selectors: {
            "&:hover": {
              color: theme.color.primary.main,
            },
            "&[aria-current='true']": {
              fontWeight: theme.typography.fontWeight.semibold,
              color: theme.color.primary.main,
              borderLeftColor: theme.color.secondary.main,
            },
          },
        });

export const sections = style({
  display: "flex",
  flexDirection: "column",
  gap: theme.space._24,
  maxWidth: "760px",
  [mq.md]: {
    gap: "28px",
  },
});
