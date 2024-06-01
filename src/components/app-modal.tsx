import { ReactNode } from 'react';
import { DialogProps as DialogPropsType, SwipeableDrawerProps as SwipeableDrawerPropsType } from '@mui/material';
import AppDialog from './app-dialog';
import AppSwipeableDrawer from './app-swipable-drawer';

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
  SwipeableDrawerProps?: Omit<SwipeableDrawerPropsType, 'children' | 'open' | 'onClose' | 'onOpen'>;
}) => (
  <>
    <AppDialog {...DialogProps} classes={{ root: 'hidden lg:block' }} open={open} onClose={onClose}>
      {children}
    </AppDialog>
    <AppSwipeableDrawer {...SwipeableDrawerProps} classes={{ root: 'lg:hidden' }} open={open} onClose={onClose}>
      {children}
    </AppSwipeableDrawer>
  </>
);

export default AppModal;
