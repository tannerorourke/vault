import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { theme } from "@/lib/theme/theme.css";

const base = style({
  margin: 0,
  fontFamily: theme.typography.fontFamily.sans,
  fontWeight: theme.typography.fontWeight.semibold,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: theme.color.text.secondary,
  lineHeight: theme.typography.lineHeight.normal,
});

export const eyebrowRecipe = recipe({
  base,
  variants: {
    size: {
      eyebrow: {
        fontSize: theme.typography.fontSize.eyebrow,
      },
      micro: {
        fontSize: theme.typography.fontSize.micro,
      },
    },
  },
  defaultVariants: {
    size: "eyebrow",
  },
});

export type EyebrowSize = NonNullable<
  NonNullable<Parameters<typeof eyebrowRecipe>[0]>["size"]
>;
