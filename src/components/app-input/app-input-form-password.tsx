'use client';

import { useReducer } from 'react';
import { FieldValues } from 'react-hook-form';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { IconButton, InputAdornment } from '@mui/material';
import { useTranslations } from 'next-intl';
import AppTooltip from '@/components/app-tooltip';
import AppInputForm, { Props as AppInputFormPasswordProps } from './app-input-form';

const AppInputFormPassword = <T extends FieldValues>(props: AppInputFormPasswordProps<T>) => {
  const t = useTranslations();
  const [isPasswordVisible, toggleIsPasswordVisible] = useReducer((value) => !value, false);

  return (
    <AppInputForm
      {...props}
      type={isPasswordVisible ? 'text' : 'password'}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <AppTooltip title={t(`${isPasswordVisible ? 'PASSWORD_INPUT_SHOW' : 'PASSWORD_INPUT_HIDE'}`)}>
              <IconButton className="text-white" onClick={toggleIsPasswordVisible}>
                {isPasswordVisible ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </AppTooltip>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default AppInputFormPassword;
