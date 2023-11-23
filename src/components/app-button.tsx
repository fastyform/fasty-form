'use client';

import { ElementType } from 'react';
import { LoadingButton, LoadingButtonProps } from '@mui/lab';
import { twMerge } from 'tailwind-merge';

const AppButton = <C extends ElementType>(props: LoadingButtonProps<C, { component?: C }>) => {
  const { classes: { disabled, root, ...classes } = {}, ...propsRest } = props;

  return (
    <LoadingButton
      disableElevation
      classes={{
        disabled: twMerge(
          '!bg-gray-600 [&_.MuiCircularProgress-root]:!h-6 [&_.MuiCircularProgress-root]:!w-6 transition-colors',
          disabled,
        ),
        loading: 'text-transparent',
        root: twMerge(
          'bg-yellow-400 text-[#0D1116] py-[18px] text-base font-bold rounded-full tracking-normal normal-case transition-opacity hover:opacity-80 px-[30px]  transition-colors',
          root,
        ),
        ...classes,
      }}
      {...propsRest}
    />
  );
};
export default AppButton;
