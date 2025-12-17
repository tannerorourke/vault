import { style } from "@vanilla-extract/css";

export const sidebarRoot = style({
  width: 56,
  borderRight: "1px solid rgba(0,0,0,0.08)",
  padding: 8,
});

export const sidebarNav = style({
  display: "flex",
  flexDirection: "column",
  gap: 8,
});

export const sidebarIcon = style({
  display: "grid",
  placeItems: "center",
  height: 48,
  borderRadius: 8,
  textDecoration: "none",
  color: "inherit",
  border: "1px solid rgba(0,0,0,0.08)",
});