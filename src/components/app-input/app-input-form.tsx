'use client';

import { FocusEventHandler } from 'react';
import { Control, FieldValues, Path, useController } from 'react-hook-form';
import { TextFieldProps } from '@mui/material';
import ErrorIcon from '@/assets/error-icon';
import AppInput from '@/components/app-input/app-input';

export interface Props<T extends FieldValues> extends Omit<TextFieldProps, 'name' | 'inputRef'> {
  fieldName: Path<T>;
  control: Control<T>;
}

const AppInputForm = <T extends FieldValues>({ fieldName, control, onBlur, onChange, ...props }: Props<T>) => {
  const { field, fieldState } = useController({ name: fieldName, control });

  const handleBlur: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
    field.onBlur();
    if (onBlur) {
      onBlur(e);
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    field.onChange(e);
    if (onChange) {
      onChange(e);
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
      onChange={handleOnChange}
      {...props}
    />
  );
};

export default AppInputForm;
