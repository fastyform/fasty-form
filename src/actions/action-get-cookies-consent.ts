'use server';

import { cookies } from 'next/headers';

const actionGetCookiesConsent = async () => cookies().get('cookiesConsent');

export default actionGetCookiesConsent;
