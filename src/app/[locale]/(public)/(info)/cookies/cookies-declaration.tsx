'use client';

import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import AppButton from '@/components/app-button';
import { Locale } from '@/utils/constants';

const COOKIE_DECLARATION_ID = 'cookies-declaration-id';

const CookiesDeclaration = ({ locale }: { locale: Locale }) => {
  const t = useTranslations();
  // NOTE: We need to run this code only once on client, so we use useQuery hook
  // next.js doesn't allow to use script tag without using their <Script> component so we need to add script manually
  useQuery({
    queryKey: ['cookie-declaration', locale],
    queryFn: () => {
      if (document.getElementById('CookieDeclaration')) return null;

      const content = document.getElementById(COOKIE_DECLARATION_ID);

      const script = document.createElement('script');
      script.id = 'CookieDeclaration';
      script.setAttribute('data-culture', locale.toUpperCase());
      script.src = 'https://consent.cookiebot.com/af9bc4d6-f7c9-4a4d-8b4f-3ace3e37cf8f/cd.js';
      content?.appendChild(script);

      return null;
    },
  });

  return (
    <div className="flex flex-col items-start gap-4">
      <AppButton
        onClick={() => {
          window.Cookiebot?.renew();
        }}
      >
        {t('COOKIES_EDIT_CONSENTS')}
      </AppButton>
      <div id={COOKIE_DECLARATION_ID} />
    </div>
  );
};

export default CookiesDeclaration;
