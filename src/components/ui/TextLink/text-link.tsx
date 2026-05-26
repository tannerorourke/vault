'use client';

import { ElementType, AnchorHTMLAttributes, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/components/navigation/AppProvider';

import { Button, ButtonProps } from '@base-ui/react/button';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import Text, { type TextProps } from '../Text';

import { IconName } from '@/components/icons/registry';
import { Icon, type IconSize, type IconTone } from '@/components/ui/Icon';

import * as sty from "./text-link.css";


export type TextLinkProps = ButtonProps & {
  intent: "interactive" | "navigation";
  label: ReactNode;
  isActive?: boolean;
  nextProps?: NextLinkProps &
              Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof NextLinkProps> &
              { className?: string };
  textProps?: TextProps<ElementType>;
  underline?: 'hover' | 'always';
  leftIcon?: {
    name: IconName;
    hold?: boolean;
    size?: IconSize;
    tone?: IconTone;
  };
  rightIcon?: {
    name: IconName;
    hold?: boolean;
    size?: IconSize;
    tone?: IconTone;
  };
}

export const TextLink: React.FC<TextLinkProps> = ({
  className,
  onClick,
  intent,
  label,
  isActive,
  nextProps = null,
  textProps = {},
  underline = 'hover',
  leftIcon,
  rightIcon,
  ...rest
}) => {
  const { hasAppHistory } = useAppContext();
  const router = useRouter();

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
      {leftIcon && (
        <span
          className={leftIcon.hold === true ? sty.leftSlotHold : sty.leftSlotEnabled}
          aria-hidden
        >
          <Icon name={leftIcon.name} size={leftIcon.size ?? "lg"} tone={leftIcon.tone} />
        </span>
      )}

      {typeof label === "string"
        ? <Text {...restTextProps} className={[sty.linkTextBase, textClassName].filter(Boolean).join(' ')}>{label}</Text>
        : label
      }

      {rightIcon && (
        <span
          className={rightIcon.hold ? sty.rightSlotHold : sty.rightSlotEnabled}
          aria-hidden
        >
          <Icon name={rightIcon.name} size={rightIcon.size ?? "lg"} tone={rightIcon.tone} />
        </span>
      )}
    </>
  );

  const rootCls = [
    sty.linkBtnBase,
    intent === "interactive" ? sty.linkBtnInteractive : sty.linkBtnNavigation,
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
