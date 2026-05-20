import { theme } from "@/lib/theme/theme.css";
import { style } from "@vanilla-extract/css";


export const footerSheet = style({
  margin: `${theme.space._32} 0`,
  padding: `${theme.space._16} ${theme.space._24}`,
  border: 'none'
});

  export const footerLabel = style({
    paddingRight: "6px"
  });

  export const footerLink = style({
    padding: '0 !important',
    margin: "0 0 0 6px"
  });

export const divider = style({
  marginTop: theme.space._32,
  border: 0,
  height: "1px",
  // margin: `0 0 ${theme.space._20}`,
  background: theme.color.tint.primary,
});