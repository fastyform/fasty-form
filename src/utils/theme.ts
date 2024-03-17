'use client';

import { createTheme } from '@mui/material';
import { plPL } from '@mui/material/locale';
import { plPL as datePickerPlPL } from '@mui/x-date-pickers/locales';

const theme = createTheme(
  {
    palette: {
      mode: 'dark',
      primary: {
        main: '#facc15',
      },
    },
  },
  plPL,
  datePickerPlPL,
);

export default theme;
