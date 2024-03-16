'use client';

import { ReactNode, useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import { Drawer, IconButton } from '@mui/material';
import { usePathname } from 'next/navigation';
import AppLogo from '@/components/app-logo';

const MobileNavbar = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const pathName = usePathname();

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  useEffect(() => {
    setOpen(false);
  }, [pathName]);

  return (
    <>
      <header className="fixed left-0 top-0 z-30 flex h-[50px] w-full items-center justify-start gap-4 border-b border-solid border-gray-600 bg-shark px-5 lg:hidden">
        <IconButton onClick={toggleDrawer(true)}>
          <MenuIcon />
        </IconButton>
        <AppLogo className="w-[100px]" />
      </header>
      <Drawer
        anchor="left"
        className="background"
        open={open}
        classes={{
          paper: 'w-[300px] border-r border-gray-600 px-5 py-2.5 flex flex-col gap-4 bg-shark bg-none',
          root: '[&_.MuiBackdrop-root]:backdrop-blur-sm',
        }}
        onClose={toggleDrawer(false)}
      >
        <div className="relative flex w-full justify-center">
          <span className="invisible">Menu</span>
          <IconButton className="absolute left-0 top-1/2 -translate-y-1/2" onClick={toggleDrawer(false)}>
            <CloseIcon />
          </IconButton>
        </div>
        {children}
      </Drawer>
    </>
  );
};

export default MobileNavbar;
