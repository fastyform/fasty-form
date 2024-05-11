'use client';

import { useState } from 'react';
import { MenuItem } from '@mui/material';
import AppInput from '@/components/app-input/app-input';
import { Locale, LOCALES, LOCALES_FULL_NAMES } from '@/utils/constants';

const LanguageSelect = ({ className }: { className?: string }) => {
  const [language, setLanguage] = useState<Locale>('pl');

  // TODO: ADD SAVING TO DATABASE
  return (
    <AppInput
      select
      className={className}
      value={language}
      SelectProps={{
        MenuProps: {
          classes: { paper: 'bg-shark bg-none rounded-xl ' },
        },
      }}
      onChange={(event) => setLanguage(event.target.value as Locale)}
    >
      {LOCALES.map((locale) => (
        <MenuItem key={locale} color="inherit" value={locale}>
          {LOCALES_FULL_NAMES[locale]}
        </MenuItem>
      ))}
    </AppInput>
  );
};

export default LanguageSelect;
