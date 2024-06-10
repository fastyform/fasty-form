import { ReactNode } from 'react';
import { DialogProps as DialogPropsType } from '@mui/material';
import { twMerge } from 'tailwind-merge';
import AppDialog from './app-dialog';
import AppSwipeableDrawer, { AppSwipeableDrawerProps } from './app-swipable-drawer';

const AppModal = ({
  children,
  DialogProps,
  open,
  onClose,
  SwipeableDrawerProps,
}: {
  children: ReactNode;
  open: boolean;
  onClose: () => void;
  DialogProps?: Omit<DialogPropsType, 'children' | 'open' | 'onClose' | 'onOpen'>;
  SwipeableDrawerProps?: Omit<AppSwipeableDrawerProps, 'children' | 'open' | 'onClose' | 'onOpen'>;
}) => (
  <>
    <AppDialog
      {...DialogProps}
      classes={{ ...DialogProps?.classes, root: twMerge('hidden lg:block', DialogProps?.classes?.root) }}
      open={open}
      onClose={onClose}
    >
      {children}
    </AppDialog>
    <AppSwipeableDrawer
      {...SwipeableDrawerProps}
      classes={{ ...SwipeableDrawerProps?.classes, root: twMerge('lg:hidden', SwipeableDrawerProps?.classes?.root) }}
      open={open}
      onClose={onClose}
    >
      {children}
    </AppSwipeableDrawer>
  </>
);

export default AppModal;
