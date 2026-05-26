import type { ElementType, ComponentPropsWithoutRef } from "react";

import { eyebrowRecipe, type EyebrowSize } from "./eyebrow.css";


export type EyebrowOwnProps<TAs extends ElementType> = {
  as?: TAs;
  size?: EyebrowSize;
  className?: string;
};

export type EyebrowProps<TAs extends ElementType> =
  EyebrowOwnProps<TAs> &
    Omit<ComponentPropsWithoutRef<TAs>, keyof EyebrowOwnProps<TAs>>;

export function Eyebrow<TAs extends ElementType = "span">({
  as,
  size = "eyebrow",
  className,
  ...rest
}: EyebrowProps<TAs>) {
  const Component = (as ?? "span") as ElementType;

  return (
    <Component
      className={[eyebrowRecipe({ size }), className].filter(Boolean).join(" ")}
      {...rest}
    />
  );
}
