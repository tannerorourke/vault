import { style } from "@vanilla-extract/css";
import { theme } from "@/lib/theme/theme.css";

export const linkBtnBase = style({
  letterSpacing: "-0.005em",
  padding: "2px",
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
  transition: "color 150ms ease, background-size 200ms ease",

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
      backgroundSize: "100% 2px",
    },
    "&:active": {
      backgroundSize: "100% 2px",
    },
  },
});

// variants - applied alongside linkBtnBase
export const linkBtnInteractive = style({
  selectors: {
    "&:hover": {
      color: `${theme.color.link.hover} !important`,
    },
    "&:active": {
      color: theme.color.secondary.active,
    },
  },
});

export const linkBtnNavigation = style({
  selectors: {
    "&:hover": {
      color: `${theme.color.primary.main} !important`,
    },
    "&:active": {
      color: theme.color.primary.active,
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
    // Order matters: later rules wins
    [`${linkBtnBase}[aria-pressed="true"] &`]: {
      color: theme.color.secondary.active,
    },
    [`${linkBtnInteractive}:hover &`]: {
      color: theme.color.link.hover,
    },
    [`${linkBtnNavigation}:hover &`]: {
      color: theme.color.primary.main,
    },
    [`${linkBtnInteractive}:active &`]: {
      color: theme.color.secondary.active,
    },
    [`${linkBtnNavigation}:active &`]: {
      color: theme.color.primary.active,
    },
  },
});

// -- Left/Right Icons

const hoverBase = {
  opacity: 1,
} as const;

const activeBase = {
  width: "20px",
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
      ...hoverBase, width: "20px", padding: "0 0.25em 2px 0",
    },
    [`${linkBtnBase}:active &`]: {
      ...activeBase, width: "20px", padding: "0 0.25em 2px 0",
    },
  }
});

export const rightSlotEnabled = style({
  ...slotBase,
  selectors: {
    [`${linkBtnBase}:hover &`]: {
      ...hoverBase, width: "20px", padding: "0 0 2px 0.25em"
    },
    [`${linkBtnBase}:active &`]: {
      ...activeBase, width: "20px", padding: "0 0 2px 0.25em"
    },
  }
});

export const leftSlotHold = style({
  ...slotBase,
  opacity: 1,
  width: "20px",
  padding: "0 0.25em 2px 0"
});

export const rightSlotHold = style({
  ...slotBase,
  opacity: 1,
  width: "20px",
  padding: "0 0 0 2px.25em"
});