import { Suspense } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import ContentLayoutContainer from '@/app/[locale]/(app)/_components/content-layout-container';
import TrainerImage from '@/components/trainer-image';
import checkIsTrainerAccount from '@/utils/check-is-trainer-account';
import { Locale } from '@/utils/constants';
import getTrainerDetailsById from '@/utils/get-trainer-details-by-id';
import getUserWithNull from '@/utils/get-user-with-null';
import { groszToPLN } from '@/utils/stripe';
import { Database } from '@/utils/supabase/supabase';
import BuyButton from './_components/buy-button';
import ProfileActionButtons from './_components/profile-action-buttons';
import ProfileSocialIcons from './_components/profile-social-icons';
import checkIsTrainerProfileOwner from './_utils/check-is-trainer-profile-owner';
import getTrainerIdBySlug from './_utils/get-trainer-details-by-slug';

const TrainerPage = async ({ params }: { params: { slug: string; locale: Locale } }) => {
  unstable_setRequestLocale(params.locale);

  const trainerId = (await getTrainerIdBySlug(params.slug)).user_id;
  const [trainerDetails, user] = await Promise.all([getTrainerDetailsById(trainerId), getUserWithNull()]);
  const isUserOwner = checkIsTrainerProfileOwner(user, trainerId);
  const stripeOnboardingRedirect = trainerDetails.stripe_onboarding_status !== 'verified' && !isUserOwner;
  const isTrainerAccount = user ? await checkIsTrainerAccount(user.id) : false;
  const t = await getTranslations();

  if (!trainerDetails.is_onboarded || stripeOnboardingRedirect || !trainerDetails.profile_slug) return notFound();
  if (!trainerDetails.service_price_in_grosz || !trainerDetails.profile_name)
    throw new Error('Trainer has no service price set or no profile name');

  const isBuyButtonVisible = !(isUserOwner && trainerDetails.stripe_onboarding_status !== 'verified');

  return (
    <>
      <ContentLayoutContainer>
        <div className="flex grow flex-col items-center gap-5 lg:justify-start">
          <div className="relative flex w-full flex-col items-center justify-center">
            <TrainerImage
              fill
              className="opacity-60 blur-xl [transform:translate3d(0,0,0)]  lg:blur-3xl"
              trainerProfileImageUrl={trainerDetails.profile_image_url}
              trainerProfileName={trainerDetails.profile_name}
            />
            {isUserOwner && (
              <Suspense>
                <div className="flex-gap flex gap-2.5 self-end lg:self-start">
                  <ProfileActionButtons trainerId={trainerId} />
                </div>
              </Suspense>
            )}
            <div className="relative aspect-square w-full max-w-sm rounded-full object-cover">
              <TrainerImage
                fill
                trainerProfileImageUrl={trainerDetails.profile_image_url}
                trainerProfileName={trainerDetails.profile_name}
              />
            </div>
          </div>
          <div className="flex max-w-[500px] flex-col gap-5 ">
            <ProfileSocialIcons socialLinks={trainerDetails.social_links} />
            <div className="flex flex-col gap-2.5">
              <h1 className="text-2xl font-bold text-white [word-break:break-word] sm:text-4xl md:text-5xl">
                {trainerDetails.profile_name}
              </h1>
              <p className="text-base text-white [word-break:break-word]">{trainerDetails.bio}</p>
            </div>
            {isBuyButtonVisible && (
              <BuyButton
                className="hidden w-full lg:flex"
                disabled={isTrainerAccount}
                size="large"
                trainerId={trainerId}
              >
                {isTrainerAccount ? (
                  t('TRAINERS_PAGE_BUY_BUTTON_TRAINER')
                ) : (
                  <span>
                    {t('TRAINERS_PAGE_BUY_BUTTON')} - {groszToPLN(trainerDetails.service_price_in_grosz)}{' '}
                    {t('CURRENCY_PLN')}
                  </span>
                )}
              </BuyButton>
            )}
          </div>
        </div>
      </ContentLayoutContainer>
      {isBuyButtonVisible && (
        <BuyButton className="rounded-none lg:hidden" disabled={isTrainerAccount} size="large" trainerId={trainerId}>
          {isTrainerAccount ? (
            t('TRAINERS_PAGE_BUY_BUTTON_TRAINER')
          ) : (
            <span>
              {t('TRAINERS_PAGE_BUY_BUTTON')} - {groszToPLN(trainerDetails.service_price_in_grosz)} {t('CURRENCY_PLN')}
            </span>
          )}
        </BuyButton>
      )}
    </>
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
