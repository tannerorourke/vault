'use client';

import { usePathname } from 'next/navigation';
import NextLink from 'next/link';
import { Button } from '@base-ui/react/button';
import { Text } from '@/components/ui/Text/Text';
import { CaretLeft } from '@/content/icons/caret-left';
import { CaretRight } from '@/content/icons/caret-right';
import * as sty from './profile-nav-link.css';

export function ProfileNavLink() {
  const pathname = usePathname();
  const isOnProfile = pathname === '/profile';

  const link = isOnProfile 
    ? { label: 'Projects', href: '/' } 
    : { label: 'Profile',  href: '/profile' }

  return (
    <NextLink href={link.href} prefetch className={sty.wrap}>
      <Button
        className={sty.btn}
        aria-current={isOnProfile ? 'page' : undefined}
      >
        <span className={isOnProfile ? sty.leftSlotEnabled : sty.slotDisabled} aria-hidden>
          <CaretLeft />
        </span>
        <Text
          as="span"
          className={sty.text}
          variant="bodyLg"
          tone="primary"
        >
          {link.label}
        </Text>
        <span className={!isOnProfile ? sty.rightSlotEnabled : sty.slotDisabled} aria-hidden>
          <CaretRight />
        </span>
      </Button>
    </NextLink>
  );
};
