'use client';

import { ElementType } from 'react';
import { LoadingButton, LoadingButtonProps } from '@mui/lab';

const AppButton = <C extends ElementType>(props: LoadingButtonProps<C, { component?: C }>) => (
  <LoadingButton
    classes={{
      root: 'bg-yellow-400 text-[#0D1116] py-[18px] text-base font-bold rounded-full tracking-normal normal-case transition-opacity hover:opacity-80 px-[30px]',
    }}
    {...props}
    disableElevation
  />
);

export default AppButton;
