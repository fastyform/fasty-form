'use client';

import { useTranslations } from 'next-intl';
import ContentLayoutContainer from '@/app/[locale]/(app)/_components/content-layout-container';

const TrainerError = () => {
  const t = useTranslations();

  return (
    <ContentLayoutContainer>
      <h2 className="text-white">{t('COMMON_ERROR')}</h2>
    </ContentLayoutContainer>
  );
};

export default TrainerError;
