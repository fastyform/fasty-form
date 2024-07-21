import { Suspense } from 'react';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import ContentLayoutContainer from '@/app/[locale]/(app)/_components/content-layout-container';
import { Locale } from '@/utils/constants';
import { TrainerCardsSkeletons } from './_components/trainer-card';
import Trainers from './_components/trainers';

const heroBenefits = ['professional', 'improve', 'injury', 'price'] as const;

const TrainersPage = async ({ params }: { params: { slug: string; locale: Locale } }) => {
  unstable_setRequestLocale(params.locale);
  const t = await getTranslations();

  return (
    <ContentLayoutContainer>
      <div className="flex flex-col gap-10 text-white">
        <div className="flex max-w-2xl flex-col gap-5">
          <h1 className="text-2xl font-bold lg:text-4xl">{t.rich('TRAINERS_DATABASE_TITLE')}</h1>
          <div className="flex flex-col gap-1">
            {heroBenefits.map((benefit) => (
              <div key={benefit} className="flex items-center gap-3 font-medium">
                <CheckCircleOutlineRoundedIcon className="text-yellow-400" />
                <p>{t(`TRAINERS_DATABASE_${benefit}`)}</p>
              </div>
            ))}
          </div>
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
