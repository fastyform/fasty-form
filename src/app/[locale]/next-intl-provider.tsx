'use client';

import { ReactNode } from 'react';
import { AbstractIntlMessages, NextIntlClientProvider } from 'next-intl';
import { INTL_TIMEZONE } from '@/utils/constants';
import defaultTranslationValues from '@/utils/default-translation-values';

interface Props {
  children: ReactNode;
  locale: string;
  messages: AbstractIntlMessages;
}

const NextIntlProvider = ({ children, locale, messages }: Props) => (
  <NextIntlClientProvider
    defaultTranslationValues={defaultTranslationValues}
    locale={locale}
    messages={messages}
    timeZone={INTL_TIMEZONE}
  >
    {children}
  </NextIntlClientProvider>
);

export default NextIntlProvider;
