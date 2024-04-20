'use client';

import { useTranslations } from 'next-intl';

const TrainerError = () => {
  const t = useTranslations();

  return (
    <div className="lg:mt-10">
      <h2 className="text-white">{t('COMMON_ERROR')}</h2>
    </div>
  );
};

export default TrainerError;
