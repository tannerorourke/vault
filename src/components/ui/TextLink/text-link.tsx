'use client';

import { ComponentType, ElementType } from 'react'
import { NavFilter } from '@/lib/types/nav';

import { Button, ButtonProps } from '@base-ui/react/button';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import Text, { type TextProps } from '../Text';
import { ArrowLeft } from '@/components/icons/arrow-left';
import { ArrowRight } from '@/components/icons/arrow-right';
import { ArrowUp } from '@/components/icons/arrow-up';
import { ArrowDown } from '@/components/icons/arrow-down';


import * as sty from "./text-link.css";
import { IconProps } from '@/lib/types/icons';


type direction = 'left' | 'right' | 'up' | 'down';

const directionMap = {
  'left': ArrowLeft,
  'right': ArrowRight,
  'up': ArrowUp,
  'down': ArrowDown
} as const satisfies Record<string, ComponentType<IconProps>>;

export type TextLinkProps = ButtonProps & {
  label: string;
  filterId?: NavFilter['id'];
  notifyOnClick?: (filterId: NavFilter['id']) => void;
  isActive?: boolean;
  nextProps?: NextLinkProps & { className?: string };
  textProps?: TextProps<ElementType>;
  leftArrow?: {
    hold?: boolean;
    dir: direction
  };
  rightArrow?: {
    hold?: boolean;
    dir: direction
  };
}

export const TextLink: React.FC<TextLinkProps> = ({
  className,
  onClick,
  label,
  filterId,
  notifyOnClick,
  isActive,
  nextProps = null,
  textProps = {},
  leftArrow = {},
  rightArrow = {},
  ...rest
}) => {
  const LeftIcon = leftArrow?.dir ? directionMap[leftArrow.dir] : null;
  const RightIcon = rightArrow?.dir ? directionMap[rightArrow.dir] : null;

  const handleClick = (e: any /** Base UI needs better typing here */) => {
    onClick?.(e);

    if (filterId && notifyOnClick) {
      notifyOnClick(filterId);
    }
  };

  const { className: textClassName, ...restTextProps } = textProps;

  const button = (
    <Button
      aria-pressed={isActive}
      className={[sty.linkBtnBase, className].filter(Boolean).join(' ')}
      onClick={handleClick}
      {...rest}
    >

      {leftArrow?.dir && (
        <span
          className={leftArrow?.hold === true ? sty.leftSlotHold : sty.leftSlotEnabled} aria-hidden>
          {LeftIcon && <LeftIcon />}
        </span>
      )}

      <Text
        {...restTextProps}
        className={[sty.linkTextBase, textClassName].filter(Boolean).join(' ')}
      >{label}</Text>

      {rightArrow?.dir && (
        <span className={rightArrow?.hold ? sty.rightSlotHold : sty.rightSlotEnabled} aria-hidden>
          {RightIcon && <RightIcon />}
        </span>
      )}
    </Button>
  );

  if (nextProps) {
    const { className: nextClassName, ...restNextProps } = nextProps;
    return <NextLink
      {...restNextProps}
      className={[sty.linkWrapBase, nextClassName].filter(Boolean).join(' ')}
    >{button}</NextLink>;
  }

  return button;
}
