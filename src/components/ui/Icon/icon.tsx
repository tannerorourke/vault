'use client';

import { ComponentPropsWithoutRef, ReactElement, ReactNode } from 'react';
import { Tooltip } from "@base-ui/react";
import * as sty from "./icon.css";
import Text from '../Text';


type Side = "top" | "right" | "bottom" | "left";

type CommonProps = {
  children: ReactNode;
  alt?: string;
  tooltipText?: string;
  tooltipSide?: Side;
  variant?: NonNullable<sty.IconButtonVariants>["variant"]; // "flat" | "pill"
};


export type IconLinkProps = ComponentPropsWithoutRef<"a"> & 
  CommonProps;

export type IconButtonProps = ComponentPropsWithoutRef<"button"> & 
  CommonProps;

function withTooltip(node: ReactElement, tooltipText?: string, tooltipSide: Side = "right") {
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


export function IconLink({
  className, 
  children, 
  alt, 
  tooltipText, 
  tooltipSide, 
  variant, 
  target,
  ...rest
}: IconLinkProps) {
  const el = (
    <a
      className={[sty.iconButton({ variant }), className].filter(Boolean).join(" ")}
      aria-label={alt ?? tooltipText}
      {...rest}
    >
      {children}
    </a>
  );
  return withTooltip(el, tooltipText, tooltipSide);
}

export function IconButton({
  className, 
  children, 
  alt, 
  tooltipText, 
  tooltipSide, 
  type = "button", 
  variant,
  ...rest
}: IconButtonProps) {
  const el = (
    <button
      type={type}
      className={[sty.iconButton({ variant }), className].filter(Boolean).join(" ")}
      aria-label={alt ?? tooltipText}
      {...rest}
    >
      {children}
    </button>
  );
  return withTooltip(el, tooltipText, tooltipSide);
}
