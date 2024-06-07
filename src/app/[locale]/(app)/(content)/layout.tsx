import { ReactNode } from 'react';
import { unstable_setRequestLocale } from 'next-intl/server';
import { Locale } from '@/utils/constants';

const ContentLayout = async ({ children, params: { locale } }: { children: ReactNode; params: { locale: Locale } }) => {
  unstable_setRequestLocale(locale);

  return (
    <div className="z-0 mx-auto flex w-full max-w-screen-2xl flex-col px-5 pb-24 pt-24 lg:pb-12 lg:pt-28">
      <main className="flex grow">{children}</main>
    </div>
  );
};

export default ContentLayout;
