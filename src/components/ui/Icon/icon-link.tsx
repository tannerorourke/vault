'use client';

import { ComponentPropsWithoutRef, AnchorHTMLAttributes } from 'react';
import { Link } from 'next-view-transitions';
import { type LinkProps } from 'next/link';

import { CommonProps, withTooltip } from './icon';
import * as sty from './icon.css';


export type IconLinkProps = ComponentPropsWithoutRef<"a"> & CommonProps & {
  // When set, route through next-view-transitions for the page-slide animation
  // (mirrors TextLink). A `#`-prefixed href stays a plain anchor.
  nextProps?: LinkProps &
              Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> &
              { className?: string };
};

export function IconLink({
  className,
  children,
  alt,
  tooltipText,
  tooltipSide,
  variant,
  nextProps,
  ...rest
}: IconLinkProps) {
  const cls = [sty.iconButton({ variant }), className].filter(Boolean).join(" ");

  if (nextProps) {
    const { className: nextClassName, href, ...restNextProps } = nextProps;
    const linkCls = [cls, nextClassName].filter(Boolean).join(" ");

    if (typeof href === "string" && href.startsWith("#")) {
      return withTooltip(
        <a href={href} className={linkCls} aria-label={alt ?? tooltipText} {...rest}>
          {children}
        </a>,
        tooltipText, tooltipSide,
      );
    }

    return withTooltip(
      <Link
        href={href}
        {...restNextProps}
        {...(rest as Record<string, unknown>)}
        className={linkCls}
        aria-label={alt ?? tooltipText}
      >
        {children}
      </Link>,
      tooltipText, tooltipSide,
    );
  }

  return withTooltip(
    <a className={cls} aria-label={alt ?? tooltipText} {...rest}>
      {children}
    </a>,
    tooltipText, tooltipSide,
  );
}
