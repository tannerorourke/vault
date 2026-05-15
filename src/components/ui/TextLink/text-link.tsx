'use client';

import { ElementType } from 'react'
import { NavFilter } from '@/lib/types/nav';

import { Button, ButtonProps } from '@base-ui/react/button';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import Text, { type TextProps } from '../Text';

import * as sty from "./text-link.css";


export type TextLinkProps = ButtonProps & {
  label: string;
  filterId?: NavFilter['id'];
  notifyOnClick?: (filterId: NavFilter['id']) => void;
  isActive?: boolean;
  nextProps?: NextLinkProps & { className?: string };
  textProps?: TextProps<ElementType>;
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
      aria-pressed={isActive}
      className={[sty.linkBtnBase, className].filter(Boolean).join(' ')}
      onClick={handleClick}
      {...rest}
    >
      <Text
        className={[sty.linkTextBase, textProps.className].filter(Boolean).join(' ')}
        {...textProps}
       >{label}</Text>
      
    </Button>
  );

  if (nextProps) {
    return <NextLink
      className={[sty.linkWrapBase, nextProps.className].filter(Boolean).join(' ')}
      {...nextProps}
    >{button}</NextLink>;
  }

  return button;
}
