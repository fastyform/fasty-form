'use client';

import { ReactNode } from 'react';
import { Tab, Tabs } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-10">
      <Tabs value={pathname}>
        <Tab
          className="[&:not(.Mui-selected)]:text-zinc-400"
          href="/settings/payments"
          label="Twoje saldo"
          LinkComponent={Link}
          value="/settings/payments"
        />
        <Tab
          className="[&:not(.Mui-selected)]:text-zinc-400"
          href="/settings/payments/reports"
          label="Raporty"
          LinkComponent={Link}
          value="/settings/payments/reports"
        />
      </Tabs>
      <div>{children}</div>
    </div>
  );
};

export default DashboardLayout;
