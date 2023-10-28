'use client';

import { Control, FieldValues, Path, useController } from 'react-hook-form';
import { TextField, TextFieldProps } from '@mui/material';

interface Props<T extends FieldValues> extends Omit<TextFieldProps, 'name' | 'onChange' | 'onBlur' | 'inputRef'> {
  fieldName: keyof T;
  control: Control<T>;
}

const AppInputForm = <T extends FieldValues>({ fieldName, control, ...props }: Props<T>) => {
  const { field, fieldState } = useController({
    name: fieldName as Path<T>,
    control,
  });

  return (
    <TextField
      error={fieldState.invalid}
      helperText={fieldState.error?.message}
      inputRef={field.ref}
      name={field.name}
      value={field.value}
      onBlur={field.onBlur}
      onChange={field.onChange}
      {...props}
    />
  );
};

export default AppInputForm;
