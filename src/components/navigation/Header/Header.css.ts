import { mq } from "@/lib/theme/responsive.css";
import { theme } from "@/lib/theme/theme.css";
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
  backdropFilter: "blur(0.5px)",
  WebkitBackdropFilter: "blur(0.5px)",

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

export const linkStyles = style({
  paddingBottom: '2px',
  borderBottom: '2px solid transparent',
  transition: 'border-color 200ms ease',
});

globalStyle(`${linkStyles} *`, {
  color: theme.color.text.secondary, /* Moss Grey */
  transition: 'color 200ms ease',
});

globalStyle(`${linkStyles}:hover *`, {
  color: theme.color.primary.hover, /* Light Teal */
});

globalStyle(`${linkStyles}[aria-pressed="true"] *`, {
  color: theme.color.secondary.main, /* Bark Brown */
});

globalStyle(`${linkStyles}[aria-pressed="true"]`, {
  borderBottomColor: theme.color.secondary.main,
});

export const headerRight = style({
  display: "flex",
  alignItems: "center",
  gap: 12,
});

export const profileLinkStyles = style({
  paddingBottom: '2px',
  borderBottom: '2px solid transparent',
  transition: 'border-color 200ms ease',
});

globalStyle(`${profileLinkStyles} *`, {
  color: theme.color.text.secondary, /* Moss Grey */
  transition: 'color 200ms ease',
});

globalStyle(`${profileLinkStyles}:hover *`, {
  color: theme.color.primary.hover, /* Light Teal */
});
