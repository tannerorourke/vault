'use client';

import { ElementType } from 'react'
import { Button, ButtonProps } from '@base-ui/react/button';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import * as sty from "./text-link.css";
import { IFilter } from '@/lib/types/global';
import { Text, TextProps } from '../Text/Text';

export type TextLinkProps = ButtonProps & {
  label: string;
  filterId?: IFilter['id'];
  notifyOnClick?: (filterId: IFilter['id']) => void;
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
