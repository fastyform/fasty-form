'use client';

import { ElementType } from 'react';
import { Button, ButtonProps } from '@mui/material';

const AppButton = <C extends ElementType>(props: ButtonProps<C, { component?: C }>) => (
  <Button {...props} disableElevation />
);

export default AppButton;
