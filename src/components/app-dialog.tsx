'use client';

import { Dialog, DialogProps } from '@mui/material';
import { twMerge } from 'tailwind-merge';

const AppDialog = (props: DialogProps) => {
  const { classes: { paper, ...classes } = {}, ...propsRest } = props;

  return (
    <Dialog
      classes={{
        paper: twMerge('rounded-xl border border-gray-600 bg-[#1e2226] py-10 px-5 lg:px-10 w-full max-w-xl', paper),
        ...classes,
      }}
      {...propsRest}
    />
  );
};

export default AppDialog;
