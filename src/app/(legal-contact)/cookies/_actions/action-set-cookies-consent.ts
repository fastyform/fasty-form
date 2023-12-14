'use server';

import { cookies } from 'next/headers';
import { CookieConsent } from '@/app/(legal-contact)/cookies/_utils/types';

const EXPIRE_TIME_IN_MS = 1000 * 60 * 60 * 24 * 365 * 5; // 5 years

export async function actionSetCookiesConsent(value: CookieConsent) {
  cookies().set('cookiesConsent', JSON.stringify(value), {
    expires: EXPIRE_TIME_IN_MS,
    maxAge: EXPIRE_TIME_IN_MS,
  });
}
