'use client';

import { Button, ButtonProps } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { twMerge } from 'tailwind-merge';
import SettingsIcon from './assets/setting-icon';
import SubmissionsIcon from './assets/submissions-icon';

const NavbarIcons = {
  settings: SettingsIcon,
  submissions: SubmissionsIcon,
};

interface Props extends ButtonProps {
  icon: keyof typeof NavbarIcons;
}

const NavbarLink = ({ children, icon, ...props }: Props) => {
  const path = usePathname();
  const isActive = path === props.href;
  const NavbarIcon = NavbarIcons[icon];

  return (
    <Button
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

export default NavbarLink;
