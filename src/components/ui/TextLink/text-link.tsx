'use client';

import { ComponentType, ElementType, AnchorHTMLAttributes } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/components/navigation/AppProvider';
import { NavFilter } from '@/lib/types/nav';
import { IconProps } from '@/lib/types/icons';

import { Button, ButtonProps } from '@base-ui/react/button';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import Text, { type TextProps } from '../Text';
import { ArrowLeft } from '@/components/icons/arrow-left';
import { ArrowRight } from '@/components/icons/arrow-right';
import { ArrowUp } from '@/components/icons/arrow-up';
import { ArrowDown } from '@/components/icons/arrow-down';

import * as sty from "./text-link.css";


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
  nextProps?: NextLinkProps & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof NextLinkProps> & { className?: string };
  textProps?: TextProps<ElementType>;
  underline?: 'hover' | 'always';
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
  underline = 'hover',
  leftArrow = {},
  rightArrow = {},
  ...rest
}) => {
  const { hasAppHistory } = useAppContext()
  const router = useRouter();

  const LeftIcon = leftArrow?.dir ? directionMap[leftArrow.dir] : null;
  const RightIcon = rightArrow?.dir ? directionMap[rightArrow.dir] : null;

  const handleClick = (e: any /** Base UI needs better typing here */) => {
    onClick?.(e);

    if (nextProps !== null) {
      if (nextProps.href === 'back') {
        e.preventDefault();
        if (hasAppHistory)
          router.back();
        else
          router.push('/');
      } else {
        router.push(nextProps.href as string);
      }
    }

    if (filterId && notifyOnClick) {
      notifyOnClick(filterId);
    }
  };

  const { className: textClassName, ...restTextProps } = textProps;

  const innerChildren = (
    <>
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
    </>
  );

  const rootCls = [
    sty.linkBtnBase,
    underline === 'always' && sty.linkBtnAlwaysUnderlined,
    className,
  ].filter(Boolean).join(' ');

  if (nextProps) {
    const { className: nextClassName, ...restNextProps } = nextProps;
    return (
      <NextLink
        {...restNextProps}
        {...(rest as Record<string, unknown>)}
        onClick={handleClick}
        className={[rootCls, nextClassName].filter(Boolean).join(' ')}
      >
        {innerChildren}
      </NextLink>
    );
  }

  return (
    <Button
      aria-pressed={isActive}
      className={rootCls}
      onClick={handleClick}
      {...rest}
    >
      {innerChildren}
    </Button>
  );
}
