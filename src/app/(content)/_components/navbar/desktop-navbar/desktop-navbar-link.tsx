'use client';

import { Button, ButtonProps } from '@mui/material';
import Link from 'next/link';
import { useParams, useSelectedLayoutSegment } from 'next/navigation';
import { twMerge } from 'tailwind-merge';
import navbarIcons from '@/app/(content)/_components/navbar/assets/navbar-icons';

interface Props extends ButtonProps {
  icon: keyof typeof navbarIcons;
}

const DesktopNavbarLink = ({ children, icon, ...props }: Props) => {
  const active = useSelectedLayoutSegment();
  const params = useParams();
  const isActive =
    typeof params.slug === 'string'
      ? props.href?.includes(params.slug)
      : props.href?.split('?')[0].includes(active || '');

  const NavbarIcon = navbarIcons[icon];

  return (
    <Button
      disableElevation
      color="inherit"
      LinkComponent={Link}
      className={twMerge(
        'group relative flex h-full items-center gap-2.5 font-normal text-zinc-400 transition-colors hover:text-yellow-100 hover:transition-colors',
        isActive &&
          'text-yellow-400 after:absolute after:bottom-0  after:left-1/2 after:h-1 after:w-[calc(100%+20px)] after:-translate-x-1/2 after:rounded-full after:bg-yellow-400 after:content-[""]',
      )}
      {...props}
    >
      <NavbarIcon
        className={twMerge(
          isActive ? 'fill-yellow-400' : 'fill-zinc-400',
          'transition-colors group-hover:fill-yellow-200 group-hover:transition-colors',
        )}
      />
      {children}
    </Button>
  );
};

export default DesktopNavbarLink;
