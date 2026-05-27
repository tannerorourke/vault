import { style } from "@vanilla-extract/css";
import { theme } from "@/lib/theme/theme.css";
import { mq } from "@/lib/theme/responsive.css";


export const tocNav = style({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  gap: theme.space._8,
  [mq.md]: {
    width: "fit-content",
    minWidth: "200px",
    marginLeft: "auto",
  },
});

  export const tocTriggerMb = style({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: theme.space._12,
    width: "100%",
    padding: `${theme.space._12} ${theme.space._20}`,
    background: "transparent",
    border: `1px solid ${theme.color.divider}`,
    borderRadius: "8px",
    color: theme.color.text.primary,
    font: "inherit",
    cursor: "pointer",
    textAlign: "left",

    transition: `background 200ms ease`,

    selectors: {
      "&:focus-visible": {
        outline: `2px solid ${theme.color.focus}`,
        outlineOffset: 2
      },
      '&:hover': {
        background: theme.color.tint.primaryWeak
      },
      "&:active": {
        background: theme.color.tint.primary
      }
    },

    [mq.md]: {
      display: "none",
    },
  });

    export const tocTriggerLeftMb = style({
      display: 'flex',
      alignItems: 'center',
      gap: theme.space._12
    })

    export const sectionCountMb = style({
      fontSize: theme.typography.fontSize.caption,
      color: theme.color.text.secondary,
    });

    export const triggerIconMb = style({
      transition: "transform 300ms ease 100ms",
      selectors: {
        [`${tocTriggerMb}[aria-expanded="true"] &`]: {
          transform: "rotate(180deg)",
        },
      },
    });

export const tocBody = style({
  // display: "none",
  flexDirection: "column",
  gap: "2px",
  overflow: "hidden",
  transition: "max-height 250ms ease, opacity 200ms ease",
  opacity: 0.2,
  maxHeight: 0,

  selectors: {
    '&[data-open="true"]': {
      maxHeight: "400px",
      opacity: 1,
    },
  },

  [mq.md]: {
    maxHeight: "none",
    opacity: 1,
  },
});

  export const tocList = style({
    padding: "4px 20px 14px",
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: theme.space._4,
    [mq.md]: {
      padding: "4px 10px 14px 20px",
    },
  });

    export const tocItem = style({});

      // Navigation convention (teal hover, primary.main) per CONVENTIONS.md -> Link/icon hover.
      // Intentionally bespoke: data-active left-border treatment is beyond TextLink's scope.
      export const tocLink = style({
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
          [`${tocItem}[data-active="true"] &`]: {
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
