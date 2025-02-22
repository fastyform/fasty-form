'use client';

import { ButtonProps, IconButton } from '@mui/material';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import navbarIcons from '@/components/app-navbar/assets/navbar-icons';

interface Props extends ButtonProps {
  icon: Exclude<keyof typeof navbarIcons, 'submissions'>;
}

const MobileNavigationIconLink = ({ icon, className, ...props }: Props) => {
  const NavbarIcon = navbarIcons[icon];

  return (
    <IconButton
      className={twMerge(className, 'h-11 w-11 min-w-0 rounded-xl border border-solid border-gray-600 bg-shark')}
      LinkComponent={Link}
      {...props}
    >
      <NavbarIcon className="fill-white" />
    </IconButton>
  );
};

export default MobileNavigationIconLink;
