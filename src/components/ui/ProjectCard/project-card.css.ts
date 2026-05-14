import { globalStyle, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { theme, darkTheme } from "@/lib/theme/theme.css";

const EASE = "cubic-bezier(.2,.1,.2,1)";

export const cardBase = style({
  position: "relative",
  display: "block",
  height: "176px",
  padding: "22px 22px 20px 22px",
  background: "rgba(255, 255, 255, 0.72)",
  // Controls blur intensity
  backdropFilter: "blur(6px)",
  WebkitBackdropFilter: "blur(6px)",
  borderRadius: "14px",
  border: "1px solid rgba(255, 255, 255, 0.6)",
  boxShadow: "none",
  overflow: "hidden",
  textDecoration: "none",
  color: "inherit",
  cursor: "pointer",
  transition: `transform 350ms ${EASE}, box-shadow 350ms ${EASE}, border-color 250ms ease, background 250ms ease`,

  selectors: {
    '&:hover, &:focus-visible, &[data-revealed="true"]': {
      background: theme.color.card,
      transform: "translateY(-3px)",
      boxShadow: "0 16px 40px -10px rgba(42, 95, 88, 0.22)",
      borderColor: "transparent",
      outline: "none",
    },
  },
});

    // copper feature rail pseudo-element
    globalStyle(`${cardBase}::before`, {
      content: '""',
      position: "absolute",
      left: 0,
      top: "22px",
      bottom: "22px",
      width: "2px",
      background: theme.color.secondary.main,
      borderRadius: "0 2px 2px 0",
      opacity: 0,
      transform: "scaleY(0.4)",
      transformOrigin: "center",
      transition: `opacity 300ms ease, transform 300ms ease`,
    });

    globalStyle(`${cardBase}[data-feature="true"]::before`, {
      opacity: 1,
      transform: "scaleY(1)",
    });

    // dark mode card
    globalStyle(`:where(.${darkTheme}) ${cardBase}`, {
      background: "rgba(22, 40, 34, 0.65)",
      border: "1px solid rgba(255, 255, 255, 0.06)",
    });

    globalStyle(`:where(.${darkTheme}) ${cardBase}:hover, :where(.${darkTheme}) ${cardBase}:focus-visible, :where(.${darkTheme}) ${cardBase}[data-revealed="true"]`, {
      background: "#162822",
      boxShadow: "0 16px 40px -10px rgba(0, 0, 0, 0.5)",
      borderColor: "transparent",
    });


// eyebrow row
export const eyebrow = style({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  fontSize: theme.typography.fontSize.micro,
  fontWeight: theme.typography.fontWeight.semibold,
  textTransform: "uppercase",
  letterSpacing: "0.12em",
  color: theme.color.text.secondary,
  marginBottom: "14px",
  transition: `margin-bottom 320ms ${EASE}, transform 320ms ${EASE}`,

  selectors: {
    [`${cardBase}:hover &, ${cardBase}:focus-visible &, ${cardBase}[data-revealed="true"] &`]: {
      marginBottom: "8px",
      transform: "translateY(-2px)",
    },
  },
});

export const featureDot = style({
  width: "5px",
  height: "5px",
  borderRadius: "50%",
  background: theme.color.secondary.main,
  flexShrink: 0,
  boxShadow: "0 0 0 3px rgba(224, 122, 95, 0.12)",
});

export const year = style({
  marginLeft: "auto",
  opacity: 0.7,
});

// swap area - title and summary share the same vertical slot
export const swap = style({
  position: "relative",
  minHeight: "64px",
});

// title
export const title = style({
  fontFamily: "var(--font-display)",
  fontSize: "24px",
  fontWeight: theme.typography.fontWeight.bold,
  lineHeight: theme.typography.lineHeight.tight,
  letterSpacing: "-0.015em",
  color: theme.color.primary.main,
  margin: 0,
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  opacity: 1,
  transform: "translateY(0)",
  transition: `opacity 240ms ease, transform 320ms ${EASE}, color 250ms ease`,

  selectors: {
    [`${cardBase}:hover &, ${cardBase}:focus-visible &, ${cardBase}[data-revealed="true"] &`]: {
      opacity: 0,
      transform: "translateY(-8px)",
      pointerEvents: "none",
    },
  },
});

// summary
export const summary = style({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  fontSize: "14px",
  lineHeight: "1.5",
  color: theme.color.text.primary,
  margin: 0,
  opacity: 0,
  display: "-webkit-box",
  WebkitLineClamp: 3,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  transform: "translateY(8px)",
  pointerEvents: "none",
  transition: `opacity 240ms ease, transform 320ms ${EASE}`,
  transitionDelay: "0ms",

  selectors: {
    [`${cardBase}:hover &, ${cardBase}:focus-visible &, ${cardBase}[data-revealed="true"] &`]: {
      opacity: 0.82,
      transform: "translateY(0)",
      pointerEvents: "auto",
      transitionDelay: "80ms",
    },
  },
});

// reveal block (tags + cta) - absolutely positioned at card bottom
export const reveal = style({
  position: "absolute",
  left: "22px",
  right: "22px",
  bottom: "18px",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  gap: "10px",
  opacity: 0,
  transform: "translateY(8px)",
  pointerEvents: "none",
  transition: `opacity 280ms ease, transform 340ms ${EASE}`,

  selectors: {
    [`${cardBase}:hover &, ${cardBase}:focus-visible &, ${cardBase}[data-revealed="true"] &`]: {
      opacity: 1,
      transform: "translateY(0)",
      pointerEvents: "auto",
      transitionDelay: "120ms",
    },
  },
});

export const tagsRow = style({
  display: "flex",
  alignItems: "center",
  gap: "6px",
  maxHeight: "22px",
  overflow: "hidden",
  flexWrap: "nowrap",
});

const ctaBase = {
  width: "28px", 
  height: "28px",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
};

export const cta = style({
  ...ctaBase,
  color: theme.color.primary.main,
})

export const ctaFeature = style({
  ...ctaBase,
  color: theme.color.link.hover,
});