'use client';

import React from 'react'
import { Button, ButtonProps } from '@base-ui/react/button';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import * as styles from "./icon-button.css";

export type IconButtonProps = ButtonProps & {
  label: string;
  filterId?: string;
  onFilterSelect?: (filterId: string) => void;
  isActive?: boolean;
  nextProps?: NextLinkProps;
}

export const IconButton: React.FC<IconButtonProps> = ({
  children,
  onClick,
  label,
  filterId,
  onFilterSelect,
  isActive = false,
  nextProps = null,
  ...rest
}) => {
  const buttonClass = `${styles.buttonBase} ${isActive ? styles.buttonActive : ""}`;

  const handleClick = (e: any /** Base UI needs better typing here */) => {
    onClick?.(e);

    if (filterId && onFilterSelect) {
      onFilterSelect(filterId);
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
