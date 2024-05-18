'use client';

import { useTranslations } from 'next-intl';

const SubmissionsError = () => {
  const t = useTranslations();

  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-base text-white">{t('SUBMISSIONS_ERROR')}</h2>
    </div>
  );
};

export default SubmissionsError;
