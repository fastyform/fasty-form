import { ReactNode } from 'react';
import { unstable_setRequestLocale } from 'next-intl/server';
import { Locale } from '@/utils/constants';

const SubmissionsLayout = async ({
  children,
  params: { locale },
}: {
  children: ReactNode;
  params: { locale: Locale };
}) => {
  unstable_setRequestLocale(locale);

  return <section className="flex w-full flex-col gap-10">{children}</section>;
};

export default SubmissionsLayout;
