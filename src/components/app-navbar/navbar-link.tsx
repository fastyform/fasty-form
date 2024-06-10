'use client';

import { ButtonProps } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { twJoin } from 'tailwind-merge';
import AppButton from '@/components/app-button';
import navbarIcons from '@/components/app-navbar/assets/navbar-icons';

interface Props extends ButtonProps {
  icon?: keyof typeof navbarIcons;
}

const NavbarLink = ({ icon, children, variant = 'text', className, ...props }: Props) => {
  const pathname = usePathname();
  const isActive = pathname.includes(props.href as string);
  const NavbarIcon = icon ? navbarIcons[icon] : navbarIcons.submissions;

  return (
    <AppButton
      disableElevation
      classes={{ root: 'px-5 gap-1' }}
      color="inherit"
      LinkComponent={Link}
      size="small"
      variant={variant}
      className={twJoin(
        variant === 'contained'
          ? 'fade bg-yellow-400 bg-[length:600%] font-bold text-bunker'
          : 'font-medium text-zinc-400 hover:text-yellow-100',
        isActive && variant === 'text' && '!text-yellow-400',
        variant === 'text' && 'min-w-0 flex-col rounded-none !text-[10px] lg:flex-row lg:rounded-full lg:!text-sm',
        className,
      )}
      {...props}
    >
      {icon && (
        <NavbarIcon
          className={twJoin(
            variant === 'contained' && 'fill-bunker',
            isActive && variant === 'text' && '!fill-yellow-400',
            'group-hover:fill-yellow-200 group-hover:transition-colors',
          )}
        />
      )}
      {children}
    </AppButton>
  );
};

export default NavbarLink;
