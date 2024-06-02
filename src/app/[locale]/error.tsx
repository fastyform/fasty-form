'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import ErrorIcon from '@/assets/error-icon';
import AppButtonNew from '@/components/app-button-new';

const ErrorPage = ({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) => {
  const t = useTranslations();

  return (
    <div className="bg-custom-radial min-h-screen-responsive flex items-center justify-center p-5 text-white">
      <div className="flex flex-col items-center gap-8 text-center">
        <ErrorIcon className="h-72 w-72" />
        <div className="flex flex-col items-center gap-2">
          <h2 className="mb-2 text-4xl font-bold">{t('ERROR_PAGE_TITLE')}</h2>
          <p className="text-2xl">
            {t('ERROR_PAGE_CODE_TITLE')} {error.digest}
          </p>
        </div>
        <div className="flex flex-wrap gap-5">
          <AppButtonNew size="large" onClick={reset}>
            {t('ERROR_PAGE_REFRESH_BUTTON')}
          </AppButtonNew>
          <AppButtonNew color="secondary" component={Link} href="/" size="large">
            {t('COMMON_HOME_PAGE')}
          </AppButtonNew>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
