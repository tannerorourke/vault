import { style } from "@vanilla-extract/css";
import { theme } from "@/lib/theme/theme.css";
import { EASE_CUBIC, mq } from "@/lib/theme/responsive.css";

const navBtnSpacing = 16;
const navBtnWidth = 42;
const navTbWidth = 270

// --- Containers -----------------------------------
export const tocPos = style({
  display: "block",
  position: "sticky",
  zIndex: theme.zIndex.pageSticky,
  width: `calc(100% - ${2*navBtnWidth}px - ${2 * navBtnSpacing}px)`,
  top: theme.page.marginTop.xs,
  [mq.sm]: {
    width: "100%",
    maxWidth: `min(400px, calc(100% - ${navBtnWidth}px - ${navTbWidth}px - ${2 * navBtnSpacing}px))`,
    top: theme.page.marginTop.sm,
  },
  [mq.md]: {
    top: theme.page.marginTop.md,
  },
  [mq.lg]: {
    top: theme.page.marginTop.lg,
  }
});

export const nav = style({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  left: `calc(${navBtnWidth}px + ${navBtnSpacing}px)`,
});

// --- Trigger button -----------------------------------
export const trigger = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  position: "relative",
  width: "100%",
  padding: `${theme.space._12} ${theme.space._20}`,
  border: `1px solid ${theme.color.divider}`,
  borderRadius: "999px",
  color: theme.color.text.primary,
  font: "inherit",
  cursor: "pointer",
  textAlign: "left",
  background: theme.color.card.main,
  transition: 
    `background 200ms ease, box-shadow 240ms ease, transform 180ms ${EASE_CUBIC}, border-color 200ms ease`,
  selectors: {
    "&:focus-visible": {
      outline: `2px solid ${theme.color.focus}`,
      outlineOffset: 2
    },
    '&:hover': {
      boxShadow: `0 8px 12px -6px ${theme.color.shadowStrong}`,
      transform: "translateY(-1px)",
      background: theme.color.card.hover,
    },
    '&:active': {
      background: theme.color.card.active
    }
  },
});

  export const triggerLeft = style({
    display: 'flex',
    alignItems: 'center',
    gap: theme.space._12,
    zIndex: theme.zIndex.header
  });

  export const contents = style({
    fontSize: theme.typography.fontSize.caption,
    color: theme.color.text.primary,
    letterSpacing: theme.typography.letterSpacing.loose
  });
  export const sectionCount = style({
    fontSize: theme.typography.fontSize.caption,
    color: theme.color.text.primary,
    whiteSpace: "pre"
  });

  export const triggerIcon = style({
    zIndex: theme.zIndex.header,
    transition: "transform 300ms ease 100ms",
    selectors: {
      [`${trigger}[aria-expanded="true"] &`]: {
        transform: "rotate(180deg)",
      },
    },
  });

// --- List -----------------------------------
export const body = style({
  position: "absolute",
  top: "100%",
  left: 0,
  width: "100%",
  
  marginTop: theme.space._8,
  borderRadius: "8px",
  background: theme.color.card.main,
  borderColor: theme.color.divider,
  overflow: "hidden",
  transition: "max-height 250ms ease, opacity 250ms ease",
  opacity: 0.2,
  maxHeight: 0,
  selectors: {
    '&[data-open="true"]': {
      maxHeight: "400px",
      opacity: 1,
      borderWidth: "1px",
    },
  },
});

  export const list = style({
    padding: "12px 20px 14px",
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: theme.space._4,
  });

    export const item = style({});

      // Navigation convention (teal hover, primary.main) per CONVENTIONS.md -> Link/icon hover.
      // Intentionally bespoke: data-active left-border treatment is beyond TextLink's scope.
      export const link = style({
        display: "block",
        padding: "5px 0 5px 12px",
        marginLeft: "-12px",
        fontSize: theme.typography.fontSize.bodySm,
        fontWeight: theme.typography.fontWeight.medium,
        color: theme.color.text.secondary,
        textDecoration: "none",
        letterSpacing: "-0.005em",
        borderRadius: "0px",

        background: "transparent",
        backgroundImage: "linear-gradient(currentColor, currentColor)",
        backgroundSize: "2px 0%",
        backgroundPosition: "top left",
        backgroundRepeat: "no-repeat",
        transition: "color 150ms ease, border-color 200ms ease, background-size 200ms ease",

        selectors: {
          "&:focus-visible": {
            outline: `2px solid ${theme.color.focus}`,
            outlineOffset: 2,
          },
          "&:hover": {
            color: theme.color.secondary.main,
            backgroundSize: "2px 100%",
          },
          [`${item}[data-active="true"] &`]: {
            color: theme.color.primary.main,
            backgroundSize: "2px 100%",
            fontWeight: theme.typography.fontWeight.semibold,
          },
          "&:active": {
            color: theme.color.primary.main,
            backgroundSize: "2px 100%",
            fontWeight: theme.typography.fontWeight.semibold,
          }
        }
      });
