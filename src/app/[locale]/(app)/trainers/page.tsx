import { Suspense } from 'react';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import ContentLayoutContainer from '@/app/[locale]/(app)/_components/content-layout-container';
import { TrainerCardsSkeletons } from '@/components/trainer-card';
import Trainers from '@/components/trainers';
import { Locale } from '@/utils/constants';

const TrainersPage = async ({ params }: { params: { slug: string; locale: Locale } }) => {
  unstable_setRequestLocale(params.locale);
  const t = await getTranslations();

  return (
    <ContentLayoutContainer>
      <div className="flex flex-col gap-10 text-white">
        <div className="flex max-w-2xl flex-col gap-5">
          <h1 className="text-2xl font-bold lg:text-4xl">{t.rich('TRAINERS_DATABASE_TITLE')}</h1>
          <p className="text-sm md:text-base">{t.rich('TRAINERS_DATABASE_DESCRIPTION')}</p>
        </div>
        <div className="flex flex-col gap-5">
          <Suspense fallback={<TrainerCardsSkeletons length={6} />}>
            <Trainers />
          </Suspense>
        </div>
      </div>
    </ContentLayoutContainer>
  );
};

export default TrainersPage;
