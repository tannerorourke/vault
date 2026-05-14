import { style } from "@vanilla-extract/css";
import { theme } from "@/lib/theme/theme.css";

export const wrap = style({
  marginTop: "6px",
  padding: 0,
  selectors: {
    "&:focus-visible": { outline: "none" },
  },
});

export const btn = style({
  letterSpacing: "-0.005em",
  padding: "6px 2px 2px 2px",
  border: "none",
  borderRadius: "2px",
  display: "inline-flex",
  alignItems: "center",
  gap: 0,
  lineHeight: 1,
  whiteSpace: "nowrap",
  cursor: "pointer",
  textDecoration: "none",
  background: "transparent",
  backgroundImage: "linear-gradient(currentColor, currentColor)",
  backgroundSize: "0% 2px",
  backgroundPosition: "bottom left",
  backgroundRepeat: "no-repeat",
  transition: "color 200ms ease, background-size 300ms ease",

  selectors: {
    "&:focus-visible": {
      outline: `2px solid ${theme.color.primary.hover}`,
      outlineOffset: 2,
    },
    "&:disabled": {
      cursor: "not-allowed",
      opacity: 0.5,
    },


    "&:hover": {
      color: theme.color.link.hover,
      backgroundSize: "100% 2px",
    },
    "&:active": {
      color: theme.color.secondary.active,
      backgroundSize: "100% 2px",
    },
  },
});

export const text = style({
  fontSize: "14px",
  letterSpacing: "-0.005em",
  fontWeight: `${theme.typography.fontWeight.semibold} !important`,

  // backgroundImage: "linear-gradient(currentColor, currentColor)",
  // backgroundSize: "0% 2px",
  // backgroundPosition: "bottom left",
  // backgroundRepeat: "no-repeat",
  transition: "color 200ms ease, background-size 300ms ease",

  selectors: {
    [`${btn}:hover &`]: {
      color: theme.color.link.hover,
      // backgroundSize: "100% 2px",
    },
    [`${btn}:active &`]: {
      color: theme.color.secondary.active,
      // backgroundSize: "100% 2px",
    },
  },
});


const hoverBase = {
  color: theme.color.link.hover,
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
    "width 300ms ease, padding 300ms ease, opacity 200ms ease,  color 200ms ease",
  selectors: {
    [`${btn}:hover &`]: {
      ...hoverBase, width: "0px", padding: "0",
    },
    [`${btn}:active &`]: {
      ...activeBase, width: "0px", padding: "0",
    },
  }
} as const;

export const slotDisabled = style(slotBase);

export const leftSlotEnabled = style({
  ...slotBase,
  selectors: {
    [`${btn}:hover &`]: {
      ...hoverBase, width: "16px", padding: "0 0.25em 0 0",
    },
    [`${btn}:active &`]: {
      ...activeBase, width: "16px", padding: "0 0.25em 0 0",
    },
  }
});

export const rightSlotEnabled = style({
  ...slotBase,
  selectors: {
    [`${btn}:hover &`]: {
      ...hoverBase, width: "16px", padding: "0 0 0 0.25em"
    },
    [`${btn}:active &`]: {
      ...activeBase, width: "16px", padding: "0 0 0 0.25em"
    },
  }
});