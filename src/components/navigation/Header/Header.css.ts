import { mq } from "@/lib/theme/responsive.css";
import { theme, darkTheme } from "@/lib/theme/theme.css";
import { style, globalStyle } from "@vanilla-extract/css";

export const root = style({
  position: "fixed",
  top: 0, left: 0, right: 0,
  width: "100%",
  zIndex: theme.layout.zIndex.header,

  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  height: theme.layout.headerHeight,
  backdropFilter: "blur(1px)",
  WebkitBackdropFilter: "blur(1px)",

  padding: '32px 16px 0 16px',
  [mq.sm]: { padding: '48px 40px 0 40px' },
  [mq.md]: { padding: '56px 80px 0 80px' }
});

export const headerLeft = style({
  display: "flex",
  alignItems: "flex-start",
  gap: 12,
});

export const logoContainer = style({
  width: "300px",
  display: "flex",
  flexDirection: "column",
});

export const filterRow = style({
  display: "inline-flex",
  alignItems: "center",
  gap: "24px",
  marginTop: "6px",
});

export const headerRight = style({
  display: "flex",
  alignItems: "center",
  gap: 12,
});

const underlineLinkBase = {
  fontFamily: "var(--font-body)",
  fontSize: "14px",
  fontWeight: theme.typography.fontWeight.medium,
  letterSpacing: "-0.005em",
  padding: "6px 2px",
  border: "none",
  background: "transparent",
  cursor: "pointer",
  backgroundImage: `linear-gradient(${theme.color.primary.hover}, ${theme.color.primary.hover})`,
  backgroundSize: "0% 2px",
  backgroundPosition: "bottom left",
  backgroundRepeat: "no-repeat",
  transition: "color 200ms ease, background-size 300ms ease",
} as const;

export const profileLinkStyles = style({
  ...underlineLinkBase,
  selectors: {
    "&:hover": {
      backgroundSize: "100% 2px",
    },
  },
});

globalStyle(`${profileLinkStyles} *`, {
  color: theme.color.text.secondary,
  transition: "color 200ms ease",
});

globalStyle(`${profileLinkStyles}:hover *`, {
  color: theme.color.primary.main,
});
