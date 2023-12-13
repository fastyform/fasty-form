'use client';

import { TextField, TextFieldProps } from '@mui/material';

const AppInput = ({ InputProps, ...props }: TextFieldProps) => (
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
          WebkitTextFillColor: '#fff !important',
          transitionDelay: '9999s',
          transitionProperty: '-webkit-box-shadow, -webkit-text-fill-color, caret-color, background-color',
        },
      },
      classes: {
        input: 'text-white',
        root: 'rounded-2xl [&:not(.Mui-error):not(.Mui-disabled):not(.Mui-focused)_fieldset]:hover:border-gray-500 bg-[#1E2226]',
        notchedOutline: 'border-gray-600',
        focused: '[&:not(.Mui-error)_fieldset]:border-gray-400',
        error: '[&_.MuiInputBase-input]:text-red-400 [&_fieldset]:border-red-400',
        disabled: 'webkit-fill-white',
      },
      ...InputProps,
    }}
    {...props}
  />
);

export default AppInput;
