'use client';

import { TextField, TextFieldProps } from '@mui/material';
import { twMerge } from 'tailwind-merge';

const AppInput = ({
  InputProps: { classes: { input = '', root = '', ...classes } = {}, ...InputProps } = {},
  ...props
}: TextFieldProps) => (
  <TextField
    FormHelperTextProps={{
      classes: {
        root: 'text-red-400 inline-flex gap-2 mt-1 items-center',
      },
    }}
    InputLabelProps={{
      classes: {
        root: '[&:not(.Mui-error)]:text-white',
        error: 'text-red-400',
      },
    }}
    InputProps={{
      sx: {
        '& input:-webkit-autofill': {
          caretColor: '#fff',
          WebkitTextFillColor: '#fff !important',
          transitionDelay: '9999s',
          transitionProperty: '-webkit-box-shadow, -webkit-text-fill-color, caret-color, background-color',
        },
      },
      classes: {
        input: twMerge('text-white', input),
        root: twMerge(
          'rounded-2xl [&:not(.Mui-error):not(.Mui-disabled):not(.Mui-focused)_fieldset]:hover:border-gray-500 bg-shark',
          root,
        ),
        notchedOutline: 'border-gray-600',
        focused: '[&:not(.Mui-error)_fieldset]:border-gray-400',
        error: '[&_.MuiInputBase-input]:text-red-400 [&_fieldset]:border-red-400',
        disabled: 'webkit-fill-white',
        ...classes,
      },
      ...InputProps,
    }}
    {...props}
  />
);

export default AppInput;
