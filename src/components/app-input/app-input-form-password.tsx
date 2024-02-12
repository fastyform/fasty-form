'use client';

import { useReducer } from 'react';
import { FieldValues } from 'react-hook-form';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { IconButton, InputAdornment, Tooltip } from '@mui/material';
import AppInputForm, { Props as AppInputFormPasswordProps } from './app-input-form';

const AppInputFormPassword = <T extends FieldValues>(props: AppInputFormPasswordProps<T>) => {
  const [isPasswordVisible, toggleIsPasswordVisible] = useReducer((value) => !value, false);

  return (
    <AppInputForm
      {...props}
      type={isPasswordVisible ? 'text' : 'password'}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Tooltip arrow title={isPasswordVisible ? 'Ukryj hasło' : 'Pokaż hasło'}>
              <IconButton className="text-white" onClick={toggleIsPasswordVisible}>
                {isPasswordVisible ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </Tooltip>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default AppInputFormPassword;
