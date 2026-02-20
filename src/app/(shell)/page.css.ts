import { theme } from "@/lib/theme/theme.css";
import { style } from "@vanilla-extract/css";

export const heroContainer = style({
  width: "100%",
  position: "relative"
})

export const heroImage = style({
  width: "100%",
  objectFit: "cover",
  // position: "absolute",
  // top: 0,
  //zIndex: theme.layout.zIndex.heroImg
})