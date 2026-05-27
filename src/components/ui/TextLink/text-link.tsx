'use client';

import { ElementType, AnchorHTMLAttributes, ReactNode } from 'react';
import { Link } from 'next-view-transitions';

import { Button, ButtonProps } from '@base-ui/react/button';
import { type LinkProps } from 'next/link';
import Text, { type TextProps } from '../Text';

import { IconName } from '@/components/icons/registry';
import { Icon, type IconSize, type IconTone } from '@/components/ui/Icon';

import * as sty from "./text-link.css";


export type TextLinkProps = ButtonProps & {
  intent: "interactive" | "navigation";
  label: ReactNode;
  isActive?: boolean;
  nextProps?: LinkProps &
              Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> &
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
    const { className: nextClassName, href, ...restNextProps } = nextProps;

    // Hash-only hrefs are in-page anchors — render a native <a> so the
    // browser handles the scroll and we don't kick off a view transition for
    // a non-route change.
    if (typeof href === "string" && href.startsWith("#")) {
      return (
        <a
          href={href}
          className={[rootCls, nextClassName].filter(Boolean).join(' ')}
          {...(rest as Record<string, unknown>)}
        >
          {innerChildren}
        </a>
      );
    }

    return (
      <Link
        href={href}
        {...restNextProps}
        {...(rest as Record<string, unknown>)}
        className={[rootCls, nextClassName].filter(Boolean).join(' ')}
      >
        {innerChildren}
      </Link>
    );
  }

  return (
    <Button
      aria-pressed={isActive}
      className={rootCls}
      onClick={onClick}
      {...rest}
    >
      {innerChildren}
    </Button>
  );
}
