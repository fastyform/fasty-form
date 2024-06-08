import { ReactNode } from 'react';
import { unstable_setRequestLocale } from 'next-intl/server';
import ContentLayoutContainer from '@/app/[locale]/(app)/_components/content-layout-container';
import { Locale } from '@/utils/constants';

const ContentLayout = async ({ children, params: { locale } }: { children: ReactNode; params: { locale: Locale } }) => {
  unstable_setRequestLocale(locale);

  return <ContentLayoutContainer>{children}</ContentLayoutContainer>;
};

export default ContentLayout;
