'use client';

import React from 'react'
import * as sty from "./icon-button.css";

import { DynamicIcon, IconName } from 'public/icons/icon-registry';
import { Tooltip } from "@base-ui/react";
import Text from '../Text';

export type IconButtonProps = React.ComponentPropsWithoutRef<'a'> & {
  icon: IconName;
  ssr?: boolean;
  alt?: string;
  
  tooltipText?: string;
  onClick?: () => void;
}



export const IconButton: React.FC<IconButtonProps> = ({
  children,
  className,
  icon,
  ssr = true,
  alt = '',
  tooltipText,
  onClick = () => {},
  ...rest
}) => {
  
  
  const Component = (
    <a className={[sty.aBase, className].filter(Boolean).join(' ')}
      onClick={onClick}
      {...rest}
    >
      <DynamicIcon name={icon} ssr={ssr} width={'100%'} height={'100%'} />
    </a>
  )

  if (tooltipText) {
    return (
      <Tooltip.Root>
        <Tooltip.Trigger render={Component} />
        <Tooltip.Portal>
          <Tooltip.Positioner side="right" align="center" sideOffset={10} className={sty.tooltipPositioner}>
            <Tooltip.Popup className={sty.tooltipPopup}>
              <Text as='span'>
                {tooltipText}
              </Text>
            </Tooltip.Popup>
          </Tooltip.Positioner>
        </Tooltip.Portal>
      </Tooltip.Root>
    )
  }

  return Component;
}
