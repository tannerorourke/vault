import { cloneElement, isValidElement, ReactElement } from 'react';
import type { IconProps } from "@/lib/types/icons";

import * as sty from './morph-icon.css';


export type MorphIconProps = {
  active: boolean;
  from: ReactElement<IconProps>;
  to: ReactElement<IconProps>;
  shownClass?: string;  // default "shown" transition override
  hiddenClass?: string; // default "hidden" transition override
  className?: string;   // applied to span
};

export function MorphIcon({
  active,
  from,
  to,
  shownClass = sty.shown,
  hiddenClass = sty.hidden,
  className,
}: MorphIconProps) {
  const layer = (el: ReactElement<IconProps>, visible: boolean) =>
    isValidElement(el)
      ? cloneElement(el, {
          className: [sty.layer, visible ? shownClass : hiddenClass, el.props.className]
            .filter(Boolean).join(" "),
        })
      : el;

  return (
    <span className={[sty.morphWrap, className].filter(Boolean).join(" ")} aria-hidden="true">
      {layer(from, !active)}
      {layer(to, active)}
    </span>
  );
}