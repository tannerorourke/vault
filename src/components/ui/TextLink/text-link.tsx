'use client';

import { ElementType, AnchorHTMLAttributes } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/components/navigation/AppProvider';

import { Button, ButtonProps } from '@base-ui/react/button';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import Text, { type TextProps } from '../Text';

import { IconName, iconRegistry } from '@/components/icons/registry';

import * as sty from "./text-link.css";
import { IconProps } from '@/lib/types/icons';


export type TextLinkProps = ButtonProps & {
  label: string;
  isActive?: boolean;
  nextProps?: NextLinkProps & 
              Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof NextLinkProps> & 
              { className?: string };
  textProps?: TextProps<ElementType>;
  underline?: 'hover' | 'always';
  leftIcon?: {
    icon: IconName | undefined;
    hold?: boolean;
    props?: IconProps;
  };
  rightIcon?: {
    icon: IconName | undefined;
    hold?: boolean;
    props?: IconProps;
  };
}

export const TextLink: React.FC<TextLinkProps> = ({
  className,
  onClick,
  label,
  isActive,
  nextProps = null,
  textProps = {},
  underline = 'hover',
  leftIcon,
  rightIcon,
  ...rest
}) => {
  const { hasAppHistory } = useAppContext()
  const router = useRouter();

  const LeftIcon = leftIcon?.icon ? iconRegistry[leftIcon.icon] : null;
  const RightIcon = rightIcon?.icon ? iconRegistry[rightIcon.icon] : null;

  const handleNavigate = (e: any /** Base UI needs better typing here */) => {
    if (nextProps?.href) {
      e.preventDefault();
      if (nextProps.href === 'back') {
        if (hasAppHistory) router.back();
        else router.push('/');
      } else {
        router.push(nextProps.href as string);
      }
    }
  };

  const { className: textClassName, ...restTextProps } = textProps;

  const innerChildren = (
    <>
      {LeftIcon && (
        <span
          className={leftIcon?.hold === true ? sty.leftSlotHold : sty.leftSlotEnabled} aria-hidden>
          {LeftIcon && <LeftIcon {...leftIcon?.props} />}
        </span>
      )}

      <Text
        {...restTextProps}
        className={[sty.linkTextBase, textClassName].filter(Boolean).join(' ')}
      >{label}</Text>

      {RightIcon && (
        <span className={rightIcon?.hold ? sty.rightSlotHold : sty.rightSlotEnabled} aria-hidden>
          {RightIcon && <RightIcon {...rightIcon?.props} />}
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
        onNavigate={handleNavigate}
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
      {...rest}
    >
      {innerChildren}
    </Button>
  );
}
