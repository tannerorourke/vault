'use client';

import { ComponentPropsWithoutRef } from 'react';

import { CommonProps, withTooltip } from './icon';
import * as sty from './icon.css';


export type IconLinkProps = ComponentPropsWithoutRef<"a"> & CommonProps;

export function IconLink({
  className,
  children,
  alt,
  tooltipText,
  tooltipSide,
  variant,
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
