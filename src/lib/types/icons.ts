import type { ComponentType, SVGProps } from "react";

export type IconProps = SVGProps<SVGSVGElement> & {
  color?: string;
  duopacity?: number;
};

export type IconComponent = ComponentType<IconProps>;
