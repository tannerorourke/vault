'use client';

import React from 'react'
import { Button, ButtonProps } from '@base-ui/react/button';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import * as styles from "./text-link.css";

export type TextLinkProps = ButtonProps & {
  label: string;
  filterId?: string;
  notifyOnClick?: (filterId: string) => void;
  isActive?: boolean;
  nextProps?: NextLinkProps;
}

export const TextLink: React.FC<TextLinkProps> = ({
  children,
  onClick,
  label,
  filterId,
  notifyOnClick,
  isActive = false,
  nextProps = null,
  ...rest
}) => {
  const buttonClass = `${styles.buttonBase} ${isActive ? styles.buttonActive : ""}`;

  const handleClick = (e: any /** Base UI needs better typing here */) => {
    onClick?.(e);

    if (filterId && notifyOnClick) {
      notifyOnClick(filterId);
    }
  };
  
  const button = (
    <Button
      className={buttonClass}
      onClick={handleClick}
      aria-pressed={isActive}
      {...rest}
    >
      {label}
      {children}
    </Button>
  );

  if (nextProps) {
    return <NextLink {...nextProps}>{button}</NextLink>;
  }

  return button;
}
