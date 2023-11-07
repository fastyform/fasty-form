'use client';

import { Control, FieldValues, Path, useController } from 'react-hook-form';
import { TextFieldProps } from '@mui/material';
import ErrorIcon from '@/assets/error-icon';
import AppInput from '@/components/app-input/app-input';

interface Props<T extends FieldValues> extends Omit<TextFieldProps, 'name' | 'onChange' | 'onBlur' | 'inputRef'> {
  fieldName: Path<T>;
  control: Control<T>;
}

const AppInputForm = <T extends FieldValues>({ fieldName, control, ...props }: Props<T>) => {
  const { field, fieldState } = useController({ name: fieldName, control });

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
      onBlur={field.onBlur}
      onChange={field.onChange}
      {...props}
    />
  );
};

export default AppInputForm;
