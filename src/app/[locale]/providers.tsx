'use client';

import { ReactNode, useRef } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import 'dayjs/locale/pl';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.locale('pl');
// TODO: Add locales for other languages

const Providers = ({ children }: { children: ReactNode }) => {
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
