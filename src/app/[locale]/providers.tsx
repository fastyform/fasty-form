'use client';

import { ReactNode, useRef } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { Locale } from '@/utils/constants';
import getTheme from '@/utils/theme';
import 'dayjs/locale/pl';

dayjs.extend(utc);

const Providers = ({ children, locale }: { children: ReactNode; locale: Locale }) => {
  const queryClient = useRef(new QueryClient());

  return (
    <ThemeProvider theme={getTheme(locale)}>
      <QueryClientProvider client={queryClient.current}>
        <LocalizationProvider adapterLocale={locale} dateAdapter={AdapterDayjs}>
          {children}
        </LocalizationProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default Providers;
