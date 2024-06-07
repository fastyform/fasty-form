import { Suspense } from 'react';
import { unstable_setRequestLocale } from 'next-intl/server';
import { Locale } from '@/utils/constants';
import NewTrainers from './_components/new-trainers';
import { TrainerCardsSkeleton } from './_components/trainer-card';
import Trainers from './_components/trainers';

const TrainersPage = async ({ params }: { params: { slug: string; locale: Locale } }) => {
  unstable_setRequestLocale(params.locale);

  return (
    <div className="z-0 mx-auto flex w-full max-w-screen-2xl flex-col gap-10 px-5 pb-24 pt-24 text-white lg:pb-12 lg:pt-28">
      <h1 className="text-2xl font-bold">
        Znajdź <span className="text-yellow-400">trenera</span> dopasowanego do{' '}
        <span className="text-yellow-400">Twoich</span> potrzeb
      </h1>
      <div className="flex flex-col gap-5">
        <h2 className="text-xl">Odkryj naszych nowych trenerów</h2>
        <Suspense fallback={<TrainerCardsSkeleton length={6} />}>
          <NewTrainers />
        </Suspense>
      </div>
      <div className="flex flex-col gap-5">
        <h2 className="text-xl">Trenerzy - wybierz swojego eksperta</h2>
        <Suspense fallback={<TrainerCardsSkeleton length={6} />}>
          <Trainers />
        </Suspense>
      </div>
    </div>
  );
};

export default TrainersPage;
