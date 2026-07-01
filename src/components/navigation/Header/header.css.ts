import { EASE_CUBIC, mq } from "@/lib/theme/responsive.css";
import { theme } from "@/lib/theme/theme.css";
import { style } from "@vanilla-extract/css";


// Full-viewport overlay layer. Owns its own view-transition snapshot so the fixed
// header stays put while page-content slides. Transparent + click-through; only
// the slots inside re-enable pointer events.
export const root = style({
  position: "fixed",
  inset: 0,
  zIndex: theme.zIndex.header,
  pointerEvents: "none",
  viewTransitionName: "site-header",

  margin: `0 auto`,
  // Top padding clears fixed Header (clearanceTop) + spacing
  padding: `${theme.page.marginTop.xs} ${theme.page.gutter.xs} 0`,
  // transition: `padding 300ms ${EASE_CUBIC}`,
  [mq.sm]: {
    padding: `${theme.page.marginTop.sm} ${theme.page.gutter.sm} 0`,
    maxWidth: theme.page.maxContentWidth.sm,
  },
  [mq.md]: {
    padding: `${theme.page.marginTop.md} ${theme.page.gutter.md} 0`,
    width: theme.page.maxContentWidth.md,
    maxWidth: '100vw',
    gap: theme.space._48,
  },
  [mq.lg]: {
    padding: `${theme.page.marginTop.lg} ${theme.page.gutter.lg} 0`,
    width: theme.page.maxContentWidth.lg,
    maxWidth: theme.page.maxContentWidth.lg,
  }
});

const slotBase = {
  position: "absolute",
  display: "flex",
  alignItems: "center",
  pointerEvents: "auto",
} as const;

// Top-left back affordance (project pages).
export const backSlot = style({
  ...slotBase,
  top: theme.page.marginTop.xs,
  left: theme.page.gutter.xs,
  [mq.sm]: { top: theme.page.marginTop.sm, left: theme.page.gutter.sm },
  [mq.md]: { top: theme.page.marginTop.md, left: theme.page.gutter.md },
  [mq.lg]: { top: theme.page.marginTop.lg, left: theme.page.gutter.lg },
  
});
  export const backSlotLink = style({
    transition: `background 200ms ease, box-shadow 240ms ease, transform 180ms ${EASE_CUBIC}, border-color 200ms ease`,
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
    }
  });

// Top-right pill menu (mobile only).
export const mobileSlot = style({
  ...slotBase,
  top: theme.page.marginTop.xs,
  right: theme.page.gutter.xs,
  [mq.sm]: { display: "none" },
});

// Top-right text links (tablet and up).
export const tabletSlot = style({
  ...slotBase,
  display: "none",
  gap: theme.space._24,
  [mq.sm]: {
    display: "flex",
    top: theme.page.marginTop.sm,
    right: theme.page.gutter.sm,
  },
  [mq.md]: { top: theme.page.marginTop.md, right: theme.page.gutter.md },
  [mq.lg]: { top: theme.page.marginTop.lg, right: theme.page.gutter.lg },
});

export const navItem = style({
  display: "inline-flex",
  alignItems: "center",
  gap: theme.space._8,
});
  export const featureLink = style({ padding: 0 })

export const tabletToggle = style({
  marginTop: "-3px",
  marginLeft: `calc(-1 * ${theme.space._4})`,
});


export const dot = style({
  display: "inline-block",
  width: 6,
  height: 6,
  borderRadius: "50%",
  flexShrink: 0,
  background: theme.color.secondary.active,
  marginTop: "-3px"
});

// --- Mobile pill -------------------------------
export const pill = style({
  padding: 0,
  border: `1px solid ${theme.color.divider}`,
  color: theme.color.text.primary,
  transition:
    `box-shadow 240ms ease, transform 180ms ${EASE_CUBIC}, border-color 200ms ease, color 200ms ease !important`,
  selectors: {
    "&:focus-visible": {
      outline: `2px solid ${theme.color.focus}`,
      outlineOffset: 2
    },
    "&:hover": {
      boxShadow: `0 8px 12px -6px ${theme.color.shadowStrong}`,
      transform: "translateY(-1px)",
      borderColor: theme.color.tint.primarySoft,
    },
    '&:active': {
      background: theme.color.card.active
    }
  },
});

export const pillOpen = style({
  color: theme.color.secondary.main,
  borderColor: theme.color.tint.secondary,
});

// --- Mobile menu rows ------------------------------
export const menuList = style({
  listStyle: "none",
  padding: 0,
  margin: 0,
});

export const menuItem = style({
  display: "flex",
  alignItems: "center",
  gap: 12,
  padding: "10px 12px",
  borderRadius: 8,
  background: "transparent",
  border: "none",
  color: theme.color.text.primary,
  fontFamily: "inherit",
  fontSize: theme.typography.fontSize.body,
  fontWeight: theme.typography.fontWeight.medium,
  textDecoration: "none",
  cursor: "pointer",
  width: "100%",
  textAlign: "left",
  transition: "background 180ms ease, color 180ms ease",
  selectors: {
    "&:hover": {
      background: theme.color.tint.primaryWeak,
      color: theme.color.primary.main,
    },
    "&:focus-visible": {
      outline: `2px solid ${theme.color.focus}`,
      outlineOffset: -2,
    },
  },
});

export const menuItemIcon = style({
  display: "inline-grid",
  placeItems: "center",
  width: 20,
  height: 20,
  color: theme.color.text.secondary,
  transition: "color 200ms ease",
  selectors: {
    [`${menuItem}:hover &`]: {
      color: theme.color.primary.main,
    },
  },
});

export const menuItemLabel = style({
  flex: "1 1 auto",
  textAlign: "left",
});

export const divider = style({
  height: 1,
  background: theme.color.divider,
  margin: "6px 8px",
  border: "none",
});

// Gate the bottom sheet to mobile; the tablet+ Contact popover replaces it.
export const bottomDrawerSlot = style({
  display: "contents",
  [mq.sm]: { display: "none" },
});

// --- Tablet bar: per-page treatment ---------------------------------
// Project pages scroll content beneath the fixed tablet bar, so the bare links
// would collide with body text. Give them a surface — mirroring the back-arrow /
// mobile pill chrome — so they stay legible.
export const tabletChrome = style({
  padding: `0 ${theme.space._20}`,
  height: "46px",
  borderRadius: 999,
  background: theme.color.card.main,
  border: `1px solid ${theme.color.divider}`,
  boxShadow: `0 4px 20px -6px ${theme.color.shadow}`,
});

// The home hero paints `canvasFeature` (dark) behind the tablet bar, so the
// default dark link text has no contrast. `onFeature` is a context marker on the
// bar; the classes below recolor onto the feature panel (text -> onFeature,
// hover -> secondary.main; active stays secondary.active via TextLink's own
// aria-pressed rule). Scoped so it only applies over the hero.
export const onFeature = style({});

export const onFeatureLink = style({
  color: theme.color.text.onFeature, // underline (currentColor) at rest
  selectors: {
    [`${onFeature} &:hover`]: {
      color: `${theme.color.secondary.main} !important`, // underline on hover
    },
  },
});

export const onFeatureLabel = style({
  selectors: {
    // 4-class selector outranks TextLink's own navigation-hover rule.
    [`${onFeature} ${onFeatureLink}:hover &`]: {
      color: theme.color.secondary.main,
    },
  },
});

export const onFeatureToggle = style({
  color: `${theme.color.text.onFeature} !important`,
});
