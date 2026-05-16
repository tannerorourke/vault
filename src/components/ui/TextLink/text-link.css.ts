import { style } from "@vanilla-extract/css";
import { theme } from "@/lib/theme/theme.css";

export const linkBtnBase = style({
  letterSpacing: "-0.005em",
  padding: "6px 2px 2px 2px",
  border: "none",
  borderRadius: "2px",
  display: "inline-flex", alignItems: "center",
  lineHeight: 1,
  whiteSpace: "nowrap",
  cursor: "pointer",
  textDecoration: "none",

  // underline hover
  background: "transparent",
  backgroundImage: "linear-gradient(currentColor, currentColor)",
  backgroundSize: "0% 2px",
  backgroundPosition: "bottom left",
  backgroundRepeat: "no-repeat",
  transition: "color 200ms ease, background-size 300ms ease",

  selectors: {
    "&:focus-visible": {
      outline: `2px solid ${theme.color.focus}`,
      outlineOffset: 2,
    },
    "&:disabled": {
      cursor: "not-allowed",
      opacity: 0.5,
    },
    "&:hover": {
      color: `${theme.color.link.hover} !important`,
      backgroundSize: "100% 2px",
    },
    "&:active": {
      color: theme.color.secondary.active,
      backgroundSize: "100% 2px",
    },
  },
});

export const linkBtnAlwaysUnderlined = style({
  backgroundSize: "100% 2px",
});

export const linkTextBase = style({
  letterSpacing: "-0.005em",
  transition: "color 200ms ease",

  selectors: {
    // Order matters: later rules win at equal specificity.
    [`${linkBtnBase}[aria-pressed="true"] &`]: {
      color: theme.color.secondary.active,
    },
    [`${linkBtnBase}:hover &`]: {
      color: theme.color.link.hover,
    },
    [`${linkBtnBase}:active &`]: {
      color: theme.color.secondary.active,
    },
  },
});



// -- Directional Arrows -----------------------------------------------

const hoverBase = {
  opacity: 1,
} as const;

const activeBase = {
  color: theme.color.secondary.active,
  width: "16px",
  opacity: 1,
} as const;

const slotBase = {
  display: "inline-flex",
  alignItems: "center",
  overflow: "hidden",
  height: "20px", 
  
  width: "0px",
  padding: 0,
  opacity: 0,
  transition:
    "width 300ms ease, padding 300ms ease, opacity 200ms ease, color 200ms ease",
  selectors: {
    [`${linkBtnBase}:hover &`]: hoverBase,
    [`${linkBtnBase}:active &`]: activeBase,
  }
} as const;

export const slotDisabled = style(slotBase);

export const leftSlotEnabled = style({
  ...slotBase,
  selectors: {
    [`${linkBtnBase}:hover &`]: {
      ...hoverBase, width: "16px", padding: "0 0.25em 0 0",
    },
    [`${linkBtnBase}:active &`]: {
      ...activeBase, width: "16px", padding: "0 0.25em 0 0",
    },
  }
});

export const rightSlotEnabled = style({
  ...slotBase,
  selectors: {
    [`${linkBtnBase}:hover &`]: {
      ...hoverBase, width: "16px", padding: "0 0 0 0.25em"
    },
    [`${linkBtnBase}:active &`]: {
      ...activeBase, width: "16px", padding: "0 0 0 0.25em"
    },
  }
});

export const leftSlotHold = style({
  ...slotBase,
  opacity: 1,
  width: "16px",
  padding: "0 0.25em 0 0"
});

export const rightSlotHold = style({
  ...slotBase,
  opacity: 1,
  width: "16px",
  padding: "0 0 0 0.25em"
});