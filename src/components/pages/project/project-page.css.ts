import { style } from "@vanilla-extract/css";
import { theme } from "@/lib/theme/theme.css";
import { mq } from "@/lib/theme/responsive.css";
import { page } from "@/lib/styles/page.css";


export const root = style([page, {
  display: "flex",
  flexDirection: "column",
  gap: theme.space._48,
}]);

  /** Breadcrumbs */
  export const crumbs = style({
    display: "flex",
    alignItems: "center",
    gap: theme.space._12,
    fontSize: theme.typography.fontSize.eyebrow,
    fontWeight: theme.typography.fontWeight.semibold,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: theme.color.text.secondary,
    marginBottom: `calc(-1 * ${theme.space._24})`,
  });

    export const crumbLink = style({
      color: theme.color.text.secondary,
      textDecoration: "none",
      transition: "color 180ms ease",
      selectors: {
        "&:hover": { color: theme.color.primary.main },
      },
    });

    export const crumbSep = style({
      opacity: 0.5,
    });

    export const crumbCurrent = style({
      color: theme.color.text.primary,
    });

/** Hero */
export const headerSolo = style({
  display: "block",
});

export const headerWithFinding = style({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: theme.space._24,
  alignItems: "end",
  [mq.md]: {
    gridTemplateColumns: "minmax(0, 1.6fr) minmax(280px, 1fr)",
    gap: theme.space._56,
  },
});

  export const heroBody = style({
    display: "flex",
    flexDirection: "column",
  });

    // eyebrow
    export const eyebrow = style({
      display: "flex",
      alignItems: "center",
      gap: theme.space._12,
      fontSize: theme.typography.fontSize.eyebrow,
      fontWeight: theme.typography.fontWeight.semibold,
      letterSpacing: "0.16em",
      textTransform: "uppercase",
      color: theme.color.text.secondary,
      marginBottom: theme.space._12,
    });

    export const eyebrowDot = style({
      display: "inline-block",
      width: "4px",
      height: "4px",
      borderRadius: "50%",
      background: theme.color.secondary.main,
      flexShrink: 0,
    });

    export const eyebrowYear = style({
      color: theme.color.text.primary,
      opacity: 0.7,
    });

  // title and subtitle
  export const title = style({
    fontFamily: "var(--font-display)",
    fontSize: theme.typography.fontSize.displayLg,
    fontWeight: theme.typography.fontWeight.semibold,
    lineHeight: "1.06",
    letterSpacing: "-0.024em",
    color: theme.color.text.primary,
    margin: `0 0 ${theme.space._16}`,
    maxWidth: "22ch",
    textWrap: "balance",
  });

  export const subtitle = style({
    fontFamily: "var(--font-body)",
    fontSize: theme.typography.fontSize.bodyLg,
    lineHeight: 1.55,
    color: theme.color.text.primary,
    opacity: 0.85,
    margin: `0 0 ${theme.space._24}`,
    maxWidth: "62ch",
    textWrap: "pretty",
  });

  // hero foot (tags and links)
  export const heroFoot = style({
    display: "flex",
    alignItems: "center",
    gap: theme.space._16,
    flexWrap: "wrap",
    marginTop: theme.space._4,
  });

    export const tagsRow = style({
      display: "flex",
      flexWrap: "wrap",
      gap: theme.space._8,
      minWidth: 0,
      flex: "1 1 auto",
    });

      export const links = style({
        display: "inline-flex",
        flexWrap: "wrap",
        gap: theme.space._8,
        marginLeft: "auto",
      });

      export const linkBtn = style({
        display: "inline-flex",
        alignItems: "center",
        gap: theme.space._8,
        height: "36px",
        padding: "0 14px",
        borderRadius: "999px",
        fontSize: theme.typography.fontSize.bodySm,
        fontWeight: theme.typography.fontWeight.medium,
        border: `1px solid ${theme.color.divider}`,
        color: theme.color.text.primary,
        background: "transparent",
        textDecoration: "none",
        cursor: "pointer",
        transition: "border-color 180ms ease, color 180ms ease, background 180ms ease",

        selectors: {
          "&:hover": {
            borderColor: theme.color.tint.primarySoft,
            color: theme.color.primary.main,
            background: theme.color.tint.primaryWeak,
          },
          "&:focus-visible": {
            outline: `2px solid ${theme.color.focus}`,
            outlineOffset: 2,
          },
        },
      });

        export const linkBtnIcon = style({
          width: "16px",
          height: "16px",
          fill: "currentColor",
          color: theme.color.text.secondary,
          flexShrink: 0,
          transition: "color 180ms ease",
          selectors: {
            [`${linkBtn}:hover &`]: {
              color: theme.color.primary.main,
            },
          },
        });

/** Finding card */
export const findingCard = style({
  position: "relative",
  padding: `${theme.space._20} ${theme.space._20} ${theme.space._20} 22px`,
  background: theme.color.tint.secondarySoft,
  borderLeft: `2px solid ${theme.color.secondary.main}`,
  borderRadius: "0 8px 8px 0",
});

  export const findingEyebrow = style({
    color: theme.color.secondary.active,
    marginBottom: theme.space._12,
    selectors: {
      "&:hover": {
        color: `${theme.color.secondary.active} !important`,
      },
      "&:active": {
        color: theme.color.secondary.active,
      },
    },
  });

    export const findingEyebrowText = style({
      selectors: {
        [`${findingEyebrow} &`]: {
          fontSize: theme.typography.fontSize.eyebrow,
          fontWeight: theme.typography.fontWeight.semibold,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: theme.color.secondary.active,
        },
        [`${findingEyebrow}:hover &`]: {
          color: theme.color.secondary.active,
        },
        [`${findingEyebrow}:active &`]: {
          color: theme.color.secondary.active,
        },
      },
    });

    export const findingBody = style({
      fontFamily: "var(--font-body)",
      fontSize: "15px",
      lineHeight: 1.55,
      color: theme.color.text.primary,
      opacity: 0.92,
      margin: `0 0 ${theme.space._12}`,
      textWrap: "pretty",
    });

/** Hero image */
export const heroImage = style({
  width: "100%",
  display: "block",
  aspectRatio: "21 / 9",
  objectFit: "cover",
  borderRadius: "6px",
  background: theme.color.tint.neutralSoft,
});

/** Body layout */
export const layout = style({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: theme.space._24,
  alignItems: "start",
  [mq.md]: {
    gridTemplateColumns: "220px 1fr",
    gap: theme.space._64,
  },
});

/** TOC */
export const tocRoot = style({
  display: "none",
  [mq.md]: {
    display: "block",
    position: "sticky",
    top: `calc(${theme.header.offset.md} + ${theme.space._24})`,
  },
  [mq.lg]: {
    top: `calc(${theme.header.offset.lg} + ${theme.space._24})`,
  },
});

/** Sections */
export const sections = style({
  display: "flex",
  flexDirection: "column",
  gap: theme.space._56,
  minWidth: 0,
  maxWidth: "760px",
});
