import type { ElementType, ComponentPropsWithoutRef } from "react";

import { textRecipe, type TextTone, type TextVariant } from "src/lib/theme/typography.css";


export type TextOwnProps<TAs extends ElementType> = {
  as?: TAs; // By extending element type, we can list the HTML element as a string
  variant?: TextVariant;
  tone?: TextTone;
  truncate?: boolean;
  className?: string;
  color?: string; // Override any theme tone color
};

export type TextProps<TAs extends ElementType> =
  TextOwnProps<TAs> &
    Omit<ComponentPropsWithoutRef<TAs>, keyof TextOwnProps<TAs> | "color">;

export function Text<TAs extends ElementType = "span">({
  as,
  variant = "body",
  tone = "primary",
  truncate = false,
  className,
  color,
  style,
  ...rest
}: TextProps<TAs>) {
  const Component = (as ?? "p") as ElementType;

  const mergeStyle = color !== undefined ? { ...style, color } : style;
  
  return (
    <Component
      className={[
          textRecipe({ variant, tone, truncate: truncate || false }), 
          className
        ].filter(Boolean).join(" ")
      }
      style={mergeStyle}
      {...rest}
    />
  );
}
