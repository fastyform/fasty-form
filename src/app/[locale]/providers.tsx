'use client';

import { ReactNode, useRef } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import 'dayjs/locale/pl';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { Locale } from '@/utils/constants';

dayjs.extend(utc);
// TODO: Add locales for other languages

const Providers = ({ children, locale }: { children: ReactNode; locale: Locale }) => {
  dayjs.locale(locale);
  const queryClient = useRef(new QueryClient());

  return (
    <QueryClientProvider client={queryClient.current}>
      <LocalizationProvider adapterLocale="pl" dateAdapter={AdapterDayjs}>
        {children}
      </LocalizationProvider>
    </QueryClientProvider>
  );
};

export default Providers;
