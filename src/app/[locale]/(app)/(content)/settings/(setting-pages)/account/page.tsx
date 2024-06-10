import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import UpdatePasswordForm from '@/app/[locale]/(app)/(content)/settings/(setting-pages)/account/components/update-password-form';
import { Locale } from '@/utils/constants';
import { SearchParams } from '@/utils/types';

import LanguageSelect from './components/language-select';

const AccountManagePage = async ({
  searchParams,
  params: { locale },
}: {
  searchParams: SearchParams;
  params: { locale: Locale };
}) => {
  unstable_setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <>
      <h1 className="text-2xl text-white">{t('SETTINGS_ACCOUNT_TITLE')}</h1>
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-5">
          <h2 className="text-md text-white">{t('SETTINGS_ACCOUNT_PASSWORD_TITLE')}</h2>
          <UpdatePasswordForm redirectPathParam={searchParams.redirectPath} />
        </div>
        <div className="flex flex-col gap-5">
          <h2 className="text-md text-white">{t('SETTINGS_ACCOUNT_LANGUAGE_TITLE')}</h2>
          <LanguageSelect className="max-w-md" currentLocale={locale} />
        </div>
      </div>
    </>
  );
};

export default AccountManagePage;
