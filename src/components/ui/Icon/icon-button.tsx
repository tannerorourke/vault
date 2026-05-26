'use client';

import { ComponentPropsWithoutRef } from 'react';

import { CommonProps, withTooltip } from './icon';
import * as sty from './icon.css';


export type IconButtonProps = ComponentPropsWithoutRef<"button"> & CommonProps;

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
