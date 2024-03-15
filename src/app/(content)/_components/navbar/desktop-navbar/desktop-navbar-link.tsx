'use client';

import { ButtonProps } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { twJoin } from 'tailwind-merge';
import navbarIcons from '@/app/(content)/_components/navbar/assets/navbar-icons';
import AppButton from '@/components/app-button';

interface Props extends ButtonProps {
  icon: keyof typeof navbarIcons;
}

const DesktopNavbarLink = ({ icon, children, variant = 'text', className, ...props }: Props) => {
  const pathname = usePathname();
  const isActive = pathname.includes(props.href as string);
  const NavbarIcon = navbarIcons[icon];

  return (
    <AppButton
      disableElevation
      classes={{ root: 'py-1 text-sm px-4 gap-1' }}
      color="inherit"
      LinkComponent={Link}
      variant={variant}
      className={twJoin(
        variant === 'contained'
          ? 'fade animate-[fade_16s_linear_infinite] bg-yellow-400 bg-[length:600%] font-bold text-bunker'
          : 'text-zinc-400 hover:text-yellow-100',
        isActive && variant === 'text' && '!text-yellow-400',
        className,
      )}
      {...props}
    >
      <NavbarIcon
        className={twJoin(
          variant === 'contained' && 'fill-bunker',
          isActive && variant === 'text' && '!fill-yellow-400',
          'group-hover:fill-yellow-200 group-hover:transition-colors',
        )}
      />
      {children}
    </AppButton>
  );
};

export default DesktopNavbarLink;
