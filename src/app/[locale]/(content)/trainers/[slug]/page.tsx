import { createClient } from '@supabase/supabase-js';
import 'dayjs/locale/pl';
import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import checkIsTrainerAccount from '@/utils/check-is-trainer-account';
import { Locale } from '@/utils/constants';
import getTrainerDetailsById from '@/utils/get-trainer-details-by-id';
import getUserWithNull from '@/utils/get-user-with-null';
import { groszToPLN } from '@/utils/stripe';
import { Database } from '@/utils/supabase/supabase';
import BuyButton from './_components/buy-button';
import checkIsTrainerProfileOwner from './_utils/check-is-trainer-profile-owner';
import getTrainerIdBySlug from './_utils/get-trainer-id-by-slug';

const TrainerPage = async ({ params }: { params: { slug: string; locale: Locale } }) => {
  unstable_setRequestLocale(params.locale);

  const trainerId = (await getTrainerIdBySlug(params.slug)).user_id;
  const [trainerDetails, user] = await Promise.all([getTrainerDetailsById(trainerId), getUserWithNull()]);
  const isUserOwner = await checkIsTrainerProfileOwner(user, trainerId);
  const stripeOnboardingRedirect = trainerDetails.stripe_onboarding_status !== 'verified' && !isUserOwner;
  const isTrainerAccount = user ? await checkIsTrainerAccount(user.id) : false;
  const t = await getTranslations();

  if (!trainerDetails.is_onboarded || stripeOnboardingRedirect) return notFound();
  if (!trainerDetails.service_price_in_grosz) throw new Error('Trainer has no service price set');

  return (
    <div className="flex grow flex-col items-center justify-between gap-10 lg:justify-start">
      <div className="relative mb-auto mt-auto aspect-square w-full max-w-sm rounded-full border border-gray-600 object-cover lg:mb-0 lg:mt-0">
        <Image
          fill
          alt={`${trainerDetails.profile_name} ${t('TRAINERS_PAGE_PROFILE_IMAGE')}`}
          className="rounded-full"
          src={trainerDetails.profile_image_url || '/default-trainer.jpg'}
        />
      </div>

      <div className="flex w-full flex-col items-center gap-10">
        <div className="flex flex-col items-center sm:gap-2.5">
          <h1 className="text-center text-2xl font-bold text-white sm:text-4xl md:text-6xl">
            {trainerDetails.profile_name}
          </h1>
          <span className="text-base text-white lg:text-xl">
            {t('TRAINERS_PAGE_SERVICE_NAME')}
            <span className="font-bold">{groszToPLN(trainerDetails.service_price_in_grosz)} zł</span>
          </span>
        </div>
        <BuyButton isTrainerAccount={isTrainerAccount} trainerId={trainerId} />
      </div>
    </div>
  );
};

export default TrainerPage;

interface MetadataParams {
  params: { slug: string; locale: Locale };
}

export async function generateMetadata({ params: { slug, locale } }: MetadataParams): Promise<Metadata> {
  const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
  const { data: trainer } = await supabase
    .from('trainers_details')
    .select('profile_name')
    .eq('profile_slug', slug)
    .single();

  const t = await getTranslations({ locale });

  const variables = { profileName: trainer?.profile_name || '' };

  return {
    title: t('TRAINERS_PAGE_METADATA_TITLE', variables),
    description: t('TRAINERS_PAGE_METADATA_DESCRIPTION', variables),
  };
}
