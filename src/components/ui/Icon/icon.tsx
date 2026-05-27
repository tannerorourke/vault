'use client';

import { ReactElement, ReactNode, SVGProps } from 'react';

import { Tooltip } from "@base-ui/react";

import { iconRegistry, type IconName } from '@/components/icons/registry';
import Text from '../Text';

import * as sty from "./icon.css";


// --- tooltip wiring (used by IconLink + IconButton) ---

export type Side = "top" | "right" | "bottom" | "left";

export type CommonProps = {
  children: ReactNode;
  alt?: string;
  tooltipText?: string;
  tooltipSide?: Side;
  variant?: NonNullable<sty.IconButtonVariants>["variant"]; // "flat" | "pill" | "box" | "boxSmall"
};

export function withTooltip(node: ReactElement, tooltipText?: string, tooltipSide: Side = "right") {
  if (!tooltipText) return node;
  return (
    <Tooltip.Root>
      <Tooltip.Trigger render={node} delay={220} />
      <Tooltip.Portal>
        <Tooltip.Positioner
          side={tooltipSide} className={sty.tooltipPositioner}
          align="center"
          sideOffset={10}
        >
          <Tooltip.Popup className={sty.tooltipPopup}>
            <Text as="span">{tooltipText}</Text>
          </Tooltip.Popup>
        </Tooltip.Positioner>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}

// -- Icon wrapper primitive --

export type IconSize = "sm" | "md" | "lg" | "xl";
export type IconTone = "default" | "muted";

const SIZE_MAP: Record<IconSize, number> = {
  sm: 14,
  md: 16,
  lg: 20,
  xl: 24,
};

export type IconProps = Omit<SVGProps<SVGSVGElement>, "width" | "height"> & {
  name: IconName;
  size?: IconSize;
  tone?: IconTone;
  className?: string;
};

export function Icon({
  name,
  size = "md",
  tone = "default",
  className,
  ...rest
}: IconProps) {
  const Glyph = iconRegistry[name];
  if (!Glyph) return null;
  const px = SIZE_MAP[size];

  return (
    <Glyph
      width={px}
      height={px}
      aria-hidden="true"
      className={[tone === "muted" ? sty.iconMuted : null, className].filter(Boolean).join(" ") || undefined}
      {...rest}
    />
  );
}
