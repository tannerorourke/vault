import React from 'react';
import MuiLink, { LinkProps as MuiLinkProps } from '@mui/material/Link';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';

/**
 * Stylistically renders an MUI icon, but with NEXT Link functionality
 * for underlying client-side routing.
 * - omits 'href'/'passHref' props from NextLinkProps because 
 *   we pass thru mui Link to next Link explicitly.
 */

export type LinkTextProps = {
  next: Omit<NextLinkProps, 'href' | 'passHref'>;
  mui?: MuiLinkProps;
  href: string;
  children: React.ReactNode;
}

export const TextLink: React.FC<LinkTextProps> = ({
  children,
  href,
  next,
  mui,
  ...rest
}) => {
  return (
    <MuiLink
      component={NextLink} // Tells MUI Link to use NextLink as the root element
      href={href}
      {...mui} // MUI-specific props (variant, color, etc.)
      {...next} // Next.js-specific props (prefetch, replace, etc.)
      {...rest} // Any other root HTML props (className, style, etc.)
    >
      {children}
    </MuiLink>
  );
};