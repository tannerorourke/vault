import { style } from "@vanilla-extract/css";

export const layoutRoot = style({
  margin: 0,
});

export const layoutShell = style({
  display: "grid",
  gridTemplateColumns: "56px 1fr",
  minHeight: "100vh",
});

export const layoutMain = style({
  padding: 16,
});