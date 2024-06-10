import { Suspense } from 'react';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import ContentLayoutContainer from '@/app/[locale]/(app)/_components/content-layout-container';
import { Locale } from '@/utils/constants';
import { SearchParams } from '@/utils/types';
import NewTrainers from './_components/new-trainers';

import { TrainerCardsSkeletons } from './_components/trainer-card';
import Trainers from './_components/trainers';
import TrainersFilters from './_components/trainers-filters';

const TrainersPage = async ({
  params,
  searchParams,
}: {
  params: { slug: string; locale: Locale };
  searchParams: SearchParams;
}) => {
  unstable_setRequestLocale(params.locale);
  const t = await getTranslations();

  const key = JSON.stringify(searchParams);

  return (
    <ContentLayoutContainer>
      <div className="flex flex-col gap-10 text-white">
        <h1 className="text-2xl font-bold">{t.rich('TRAINERS_DATABASE_TITLE')}</h1>
        <div className="flex flex-col gap-5">
          <h2 className="text-xl">{t('TRAINERS_DATABASE_TITLE_NEW')}</h2>
          <Suspense fallback={<TrainerCardsSkeletons length={6} />}>
            <NewTrainers />
          </Suspense>
        </div>
        <div className="flex flex-col gap-5">
          <h2 className="text-xl">{t('TRAINERS_DATABASE_TITLE_ALL')}</h2>
          <Suspense key={key} fallback={<TrainerCardsSkeletons length={6} />}>
            <TrainersFilters />
            <Trainers searchParams={searchParams} />
          </Suspense>
        </div>
      </div>
    </ContentLayoutContainer>
  );
};

export default TrainersPage;
