import { globalStyle, style } from "@vanilla-extract/css";
import { theme } from "@/lib/theme/theme.css";
import { iconButtonBase } from "@/components/ui/Icon/icon.css";
import { mq } from "@/lib/theme/responsive.css";


export const cardBase = style({
  position: "relative",
  height: "100%",
  display: "grid",
  gridTemplateColumns: "minmax(0, 1fr)",
  padding: "14px 18px",

  background: "transparent",
  border: "none",
  borderBottom: `1px solid ${theme.color.divider}`,
  borderRadius: 0,
  boxShadow: "none",
  textDecoration: "none",
  color: "inherit",
  cursor: "pointer",
  overflow: "visible",
  transition: `background 200ms ease`,

  selectors: {
    '&:focus-visible': {
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
});

// Featured variant
globalStyle(`${cardBase}[data-variant="featured"]`, {
  gap: "18px",
  padding: "18px 20px",
  "@media": {
    "(min-width: 900px)": {
      padding: "20px 22px",
      gap: "28px",
      gridTemplateColumns: "45% 1fr",
    },
  },
});
globalStyle(`${cardBase}[data-variant="featured"][data-ratio="40-60"]`, {
  "@media": {
    "(min-width: 900px)": { gridTemplateColumns: "40% 1fr" },
  },
});
globalStyle(`${cardBase}[data-variant="featured"][data-ratio="50-50"]`, {
  "@media": {
    "(min-width: 900px)": { gridTemplateColumns: "1fr 1fr" },
  },
});


  export const imageCol = style({
    position: "relative",
    aspectRatio: "16 / 10",
    borderRadius: "6px",
    overflow: "hidden",
  });

    export const heroImg = style({
      width: "100%",
      height: "100%",
      objectFit: "cover",
      display: "block",
    });

    export const heroLabelText = style({
      position: "absolute",
      bottom: "12px", left: "12px",
      fontSize: theme.typography.fontSize.caption,
      fontFamily: theme.typography.fontFamily.mono,
      color: theme.color.text.secondary,
    });


export const bodyCol = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  minWidth: 0,
});

  export const title = style({
    margin: "0 0 6px",
    transition: `color 180ms ease`,
    selectors: {
      [`${cardBase} &`]: {
        color: theme.color.primary.main,
      },
      [`${cardBase}:hover &, ${cardBase}:focus-visible &`]: {
        color: theme.color.primary.hover,
      },
      [`${cardBase}[data-variant="featured"] &`]: {
        fontSize: theme.typography.fontSize.titleSm,
        lineHeight: theme.typography.lineHeight.tight,
        letterSpacing: "-0.018em",
        margin: "0 0 10px",
      },
    },
  });

  globalStyle(`${cardBase}[data-variant="featured"] ${title}`, {
    [mq.sm]: {
      fontSize: theme.typography.fontSize.titleMd,
    }
  });

  export const subtitle = style({
    opacity: 0.82,
    maxWidth: "70ch",
    margin: "0 0 14px",
  });

  export const foot = style({
    marginTop: 'auto',
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "12px",
    selectors: {
      [`${cardBase}[data-variant="featured"] &`]: {
        marginTop: "auto",
        gap: "16px",
        flexWrap: "wrap",
      },
    },
  });

      export const footLinks = style({
        display: "inline-flex",
        gap: 0,
        flexShrink: 0,
        marginRight: "-4px",
      });

        export const footLink = style({
          margin: "0 4px",
        });

// Suppress card's own hover state while an icon inside it is hovered/focused,
// so only one target reads as active under the cursor.
globalStyle(
  `${cardBase}:has(${iconButtonBase}:hover), ${cardBase}:has(${iconButtonBase}:focus-visible)`,
  {
    background: "transparent",
  },
);
globalStyle(
  `${cardBase}:has(${iconButtonBase}:hover) ${title}, ${cardBase}:has(${iconButtonBase}:focus-visible) ${title}`,
  {
    color: theme.color.primary.main,
  },
);

