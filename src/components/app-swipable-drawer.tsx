import { SwipeableDrawer } from '@mui/material';
import { SwipeableDrawerProps } from '@mui/material/SwipeableDrawer/SwipeableDrawer';
import { twMerge } from 'tailwind-merge';

export interface AppSwipeableDrawerProps extends Omit<SwipeableDrawerProps, 'onOpen'> {
  swipeHandlerClassName?: string;
}

const AppSwipeableDrawer = ({
  classes: { paper, ...classes } = {},
  children,
  swipeHandlerClassName,
  ...props
}: AppSwipeableDrawerProps) => (
  <SwipeableDrawer
    disableSwipeToOpen
    anchor="bottom"
    swipeAreaWidth={20}
    classes={{
      paper: twMerge('max-h-screen-responsive overflow-visible bg-shark bg-none px-5 overflow-auto', paper),
      ...classes,
    }}
    onOpen={() => {}}
    {...props}
  >
    <div
      className={twMerge(
        'absolute left-0 right-0 top-0 z-50 flex h-4 w-full items-center justify-center border-t border-gray-600 bg-shark',
        swipeHandlerClassName,
      )}
    >
      <div className="h-2 w-12 rounded-full bg-white" />
    </div>
    <div className="h-full py-10">{children}</div>
  </SwipeableDrawer>
);

export default AppSwipeableDrawer;
