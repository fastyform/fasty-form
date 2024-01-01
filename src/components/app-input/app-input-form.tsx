'use client';

import { FocusEventHandler } from 'react';
import { Control, FieldValues, Path, useController } from 'react-hook-form';
import { TextFieldProps } from '@mui/material';
import ErrorIcon from '@/assets/error-icon';
import AppInput from '@/components/app-input/app-input';

export interface Props<T extends FieldValues> extends Omit<TextFieldProps, 'name' | 'onChange' | 'inputRef'> {
  fieldName: Path<T>;
  control: Control<T>;
}

const AppInputForm = <T extends FieldValues>({ fieldName, control, onBlur, ...props }: Props<T>) => {
  const { field, fieldState } = useController({ name: fieldName, control });

  const handleBlur: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
    field.onBlur();
    if (onBlur) {
      onBlur(e);
    }
  };

  return (
    <AppInput
      error={fieldState.invalid}
      inputRef={field.ref}
      name={field.name}
      value={field.value}
      helperText={
        fieldState.error?.message && (
          <>
            <ErrorIcon />
            {fieldState.error.message}
          </>
        )
      }
      onBlur={handleBlur}
      onChange={field.onChange}
      {...props}
    />
  );
};

export default AppInputForm;
