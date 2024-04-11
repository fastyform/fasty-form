'use client';

import { ReactNode } from 'react';
import { AbstractIntlMessages, NextIntlClientProvider } from 'next-intl';

interface Props {
  children: ReactNode;
  locale: string;
  messages: AbstractIntlMessages;
}

const NextIntlProvider = ({ children, locale, messages }: Props) => (
  <NextIntlClientProvider locale={locale} messages={messages}>
    {children}
  </NextIntlClientProvider>
);

export default NextIntlProvider;
