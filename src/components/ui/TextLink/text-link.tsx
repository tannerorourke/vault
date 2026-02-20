'use client';

import React, { ElementType } from 'react'
import { Button, ButtonProps } from '@base-ui/react/button';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import * as sty from "./text-link.css";
import { IFilter } from '@/lib/types/global';
import { Text, TextProps, TextOwnProps } from '../Text/Text';

export type TextLinkProps = ButtonProps & {
  label: string;
  filterId?: IFilter['id'];
  notifyOnClick?: (filterId: IFilter['id']) => void;
  isActive?: boolean;
  textProps?: TextProps<ElementType>
  nextProps?: NextLinkProps;
}

export const TextLink: React.FC<TextLinkProps> = ({
  className,
  onClick,
  label,
  filterId,
  notifyOnClick,
  isActive = false,
  nextProps = null,
  textProps = {},
  ...rest
}) => {
  const handleClick = (e: any /** Base UI needs better typing here */) => {
    onClick?.(e);

    if (filterId && notifyOnClick) {
      notifyOnClick(filterId);
    }
  };
  
  const button = (
    <Button
      className={[sty.buttonBase, className, isActive].filter(Boolean).join(' ')}
      onClick={handleClick}
      aria-pressed={isActive}
      {...rest}
    >
      <Text as="p" variant="body" {...textProps}>{label}</Text>
    </Button>
  );

  if (nextProps) {
    return <NextLink {...nextProps}>{button}</NextLink>;
  }

  return button;
}
