import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { theme } from "@/lib/theme/theme.css";

const base = style({
  fontFamily: theme.typography.fontFamily.sans,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: theme.color.text.secondary,
});

export const eyebrowRecipe = recipe({
  base,
  variants: {
    size: {
      eyebrow: {
        fontSize: theme.typography.fontSize.eyebrow,
        fontWeight: theme.typography.fontWeight.semibold,
      },
      micro: {
        fontSize: theme.typography.fontSize.micro,
        fontWeight: theme.typography.fontWeight.bold,
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
