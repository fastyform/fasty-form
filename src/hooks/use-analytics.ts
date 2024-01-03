'use client';

import { useEffect } from 'react';
import TagManager from 'react-gtm-module';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { CookieConsent } from '@/app/(legal-contact)/cookies/_utils/types';

const development = process.env.NODE_ENV !== 'production';
const tagManagerArgs = {
  gtmId: process.env.NEXT_PUBLIC_GTM_ID!,
};

const useAnalytics = (cookiesConsent: RequestCookie | null | undefined) => {
  useEffect(() => {
    if (!cookiesConsent) return;

    const initGtm = async () => {
      if (!development) {
        const parsedCookiesConsent = JSON.parse(cookiesConsent.value) as CookieConsent;

        TagManager.initialize({
          ...tagManagerArgs,
          dataLayer: {
            googleAnalytics: parsedCookiesConsent.googleAnalytics,
            hotjar: parsedCookiesConsent.hotjar,
          },
        });
      }
    };

    initGtm();
  }, [cookiesConsent]);
};

export default useAnalytics;
