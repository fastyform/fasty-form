'use client';

import { createTheme } from '@mui/material';
import { enUS, plPL } from '@mui/material/locale';
import { enUS as datePickerEnUS, plPL as datePickerPlPL } from '@mui/x-date-pickers/locales';
import { Locale } from './constants';

const MuiLocale = { pl: [plPL, datePickerPlPL], en: [enUS, datePickerEnUS] } as const satisfies Record<
  Locale,
  [any, any]
>;

const getTheme = (locale: Locale) =>
  createTheme(
    {
      palette: {
        mode: 'dark',
        primary: {
          main: '#facc15',
        },
      },
    },
    ...MuiLocale[locale],
  );

export default getTheme;
