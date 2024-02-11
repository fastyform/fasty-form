'use client';

import { ReactNode, useRef } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const Providers = ({ children }: { children: ReactNode }) => {
  const queryClient = useRef(new QueryClient());

  return <QueryClientProvider client={queryClient.current}>{children}</QueryClientProvider>;
};

export default Providers;
