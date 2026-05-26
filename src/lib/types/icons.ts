import type { ComponentType, SVGProps } from "react";

export type IconProps = SVGProps<SVGSVGElement> & {
  color?: string;
};

export type IconComponent = ComponentType<IconProps>;
