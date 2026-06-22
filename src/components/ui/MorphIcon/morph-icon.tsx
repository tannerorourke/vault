import { cloneElement, isValidElement, ReactElement } from 'react';

import * as sty from './morph-icon.css';


type MorphElement = ReactElement<{ className?: string }>;

export type MorphIconProps = {
  active: boolean;
  from: MorphElement;
  to: MorphElement;
  shownClass?: string;
  hiddenClass?: string;
  className?: string;
};

export function MorphIcon({
  active,
  from,
  to,
  shownClass = sty.shown,
  hiddenClass = sty.hidden,
  className,
}: MorphIconProps) {
  const layer = (el: MorphElement, visible: boolean) =>
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