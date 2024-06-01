import { SwipeableDrawer } from '@mui/material';
import { SwipeableDrawerProps } from '@mui/material/SwipeableDrawer/SwipeableDrawer';
import { twMerge } from 'tailwind-merge';

const AppSwipeableDrawer = ({
  classes: { paper, ...classes } = {},
  children,
  ...props
}: Omit<SwipeableDrawerProps, 'onOpen'>) => (
  <SwipeableDrawer
    disableSwipeToOpen
    anchor="bottom"
    swipeAreaWidth={20}
    classes={{
      paper: twMerge('max-h-[100dvh] max-h-[100vh] overflow-visible bg-shark bg-none px-5', paper),
      ...classes,
    }}
    onOpen={() => {}}
    {...props}
  >
    <div className="absolute left-0 right-0 top-0 z-50 flex h-4 w-full items-center justify-center border-t border-gray-600 bg-shark">
      <div className="h-2 w-12 rounded-full bg-white" />
    </div>
    <div className="h-full overflow-auto py-10">{children}</div>
  </SwipeableDrawer>
);

export default AppSwipeableDrawer;
