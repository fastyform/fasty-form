import { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { groszToPLN } from '@/utils/stripe';
import { Database } from '@/utils/supabase/supabase';

export type TrainerCardDetails = Pick<
  Database['public']['Tables']['trainers_details']['Row'],
  'service_price_in_grosz' | 'profile_name' | 'profile_image_url' | 'profile_slug' | 'user_id'
>;

export const TrainerCardContainer = ({ children }: { children: ReactNode }) => (
  <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 ">{children}</div>
);

export const TrainerCardsSkeleton = () => (
  <div className=" flex animate-pulse flex-col gap-5 rounded-xl bg-shark p-5">
    <div className="flex items-center justify-center">
      <div className="aspect-square w-full max-w-40">
        <div className="h-full w-full animate-pulse rounded-full bg-bunker" />
      </div>
    </div>
    <div className="flex flex-col gap-5">
      <div className="h-6 w-full animate-pulse rounded-xl bg-bunker" />
      <div className="h-10 w-full animate-pulse rounded-xl bg-bunker" />
    </div>
  </div>
);

export const TrainerCardsSkeletons = ({ length }: { length: number }) => (
  <TrainerCardContainer>
    {[...Array(length).keys()].map((key) => (
      <TrainerCardsSkeleton key={key} />
    ))}
  </TrainerCardContainer>
);

const TrainerCard = ({ trainer }: { trainer: TrainerCardDetails }) => {
  const t = useTranslations();
  if (!trainer.service_price_in_grosz) return null;

  return (
    <Link
      key={trainer.user_id}
      className="relative flex flex-col gap-2.5 overflow-hidden rounded-xl border border-gray-600 p-2"
      href={`/trainers/${trainer.profile_slug}`}
    >
      <div className="relative flex items-center justify-center">
        <Image
          fill
          alt=""
          className="opacity-60 blur-xl [transform:translate3d(0,0,0)]"
          src={trainer.profile_image_url || '/default-trainer.jpg'}
        />
        <div className="relative aspect-square w-full max-w-40">
          <Image
            fill
            alt={`${trainer.profile_name} ${t('TRAINERS_PAGE_PROFILE_IMAGE')}`}
            className="rounded-full border border-gray-600 shadow-[0_4px_60px_0_#0000002b]"
            src={trainer.profile_image_url || '/default-trainer.jpg'}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2.5">
        <h4 className="truncate text-base">{trainer.profile_name}</h4>
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-widest ">{t('TRAINERS_DATABASE_PRICE_TITLE')}</span>
          <span className="text-sm font-bold">
            {groszToPLN(trainer.service_price_in_grosz)}&nbsp;
            {t('CURRENCY_PLN')}
          </span>
        </div>
      </div>
    </Link>
  );
};
export default TrainerCard;
