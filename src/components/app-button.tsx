'use client';

import { ElementType } from 'react';
import { LoadingButton, LoadingButtonProps } from '@mui/lab';
import { createTheme, ThemeProvider } from '@mui/material';
import { twMerge } from 'tailwind-merge';

const AppButton = <C extends ElementType>(props: LoadingButtonProps<C, { component?: C }>) => {
  const {
    classes: { disabled, contained, outlined, root, ...classes } = {},
    variant = 'contained',
    ...propsRest
  } = props;
  const theme = createTheme({ palette: { action: { disabled: undefined, disabledBackground: undefined } } });

  return (
    <ThemeProvider theme={theme}>
      <LoadingButton
        disableElevation
        color="inherit"
        variant={variant}
        classes={{
          disabled: twMerge(
            '[&_.MuiCircularProgress-root]:!h-6 [&_.MuiCircularProgress-root]:!w-6 [&_.MuiLoadingButton-loadingIndicator]:text-bunker opacity-40',
            disabled,
          ),
          loading: '!text-transparent',
          root: twMerge(
            'py-[18px] text-base font-bold rounded-full tracking-normal normal-case transition-opacity hover:opacity-80 px-[30px] transition-colors',
            root,
          ),
          contained: twMerge('bg-yellow-400 text-bunker', contained),
          outlined: twMerge('border border-yellow-400 text-yellow-400', outlined),
          ...classes,
        }}
        {...propsRest}
      />
    </ThemeProvider>
  );
};
export default AppButton;
