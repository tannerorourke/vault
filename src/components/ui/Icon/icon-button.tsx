'use client';

import { ComponentPropsWithoutRef, MouseEvent } from 'react';

import { CommonProps, withTooltip } from './icon';
import * as sty from './icon.css';


export type IconButtonProps = ComponentPropsWithoutRef<"button"> & CommonProps & {
  href?: string;
  target?: string;
  download?: string;
  rel?: string;
};

export function IconButton({
  className,
  children,
  alt,
  tooltipText,
  tooltipSide,
  type = "button",
  variant,
  href,
  target,
  download,
  rel,
  onClick,
  ...rest
}: IconButtonProps) {
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (href) {
      e.preventDefault();
      e.stopPropagation();
      if (download) {
        const a = document.createElement("a");
        a.href = href;
        a.download = download;
        if (rel) a.rel = rel;
        if (target) a.target = target;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } else {
        const effTarget = target ?? "_self";
        const features =
          effTarget === "_blank" && rel?.includes("noopener")
            ? "noopener,noreferrer"
            : "";
        window.open(href, effTarget, features);
      }
    }
    onClick?.(e);
  };

  const el = (
    <button
      type={type}
      className={[sty.iconButton({ variant }), className].filter(Boolean).join(" ")}
      aria-label={alt ?? tooltipText}
      onClick={handleClick}
      {...rest}
    >
      {children}
    </button>
  );
  return withTooltip(el, tooltipText, tooltipSide);
}
