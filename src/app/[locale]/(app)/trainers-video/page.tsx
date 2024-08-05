import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import ContentLayoutContainer from '@/app/[locale]/(app)/_components/content-layout-container';
import TrainerCard, { TrainerCardContainer } from '@/components/trainer-card';
import { Locale } from '@/utils/constants';

const data = [
  {
    service_price_in_grosz: 1000,
    profile_name: 'Wojciech Majewski',
    profile_image_url: '/trainers-video-mock/1.jpeg',
    profile_slug: 'test',
    user_id: 'a0afe8c4-5e45-49df-abb5-49fbcc74bcbc',
  },
  {
    service_price_in_grosz: 1000,
    profile_name: 'Martyna Baran',
    profile_image_url: '/trainers-video-mock/3.jpeg',
    profile_slug: 'newest-trainer',
    user_id: '91d14363-e097-47c5-8692-a1086cb79ca7',
  },
  {
    service_price_in_grosz: 1000,
    profile_name: 'Szymon Olszewski',
    profile_image_url: '/trainers-video-mock/2.jpeg',
    profile_slug: 'trainer3',
    user_id: '5947105a-4ad0-48d7-a1d8-78b50f758dba',
  },
  {
    service_price_in_grosz: 1000,
    profile_name: 'Rafał Górski',
    profile_image_url:
      'https://veknudpszbrjutmcmrwk.supabase.co/storage/v1/object/public/profile-images/51554e16-17e8-4cdd-aa22-a871b813014e.jpeg?timestamp=1722881816229;',
    profile_slug: 'rafal-gorski',
    user_id: '51554e16-17e8-4cdd-aa22-a871b813014e',
  },
  {
    service_price_in_grosz: 1000,
    profile_name: 'Michał Lewandowski',
    profile_image_url: '/trainers-video-mock/5.jpeg',
    profile_slug: 'michal-lewandowski',
    user_id: '32b02a2f-0507-4e13-8b53-8f099b3bef04',
  },
  {
    service_price_in_grosz: 1000,
    profile_name: 'Natalia Zawadzka',
    profile_image_url: '/trainers-video-mock/6.jpeg',
    profile_slug: 'annie-powerlifting',
    user_id: '4285a796-ce27-4f8e-b482-3c6516b4edeb',
  },
];

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
          <TrainerCardContainer>
            {data.map((trainer) => (
              <TrainerCard key={trainer.user_id} trainer={trainer} />
            ))}
          </TrainerCardContainer>
        </div>
      </div>
    </ContentLayoutContainer>
  );
};

export default TrainersPage;
