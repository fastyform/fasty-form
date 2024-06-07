import { ReactNode } from 'react';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import checkIsTrainerAccount from '@/utils/check-is-trainer-account';
import { Locale } from '@/utils/constants';
import getTrainerDetailsById from '@/utils/get-trainer-details-by-id';
import getUserWithNull from '@/utils/get-user-with-null';
import { getSupabaseServerClient } from '@/utils/supabase/client';
import DesktopNavbarApp from './_components/desktop-navbar-app';
import MarketingConsentDialog from './_components/marketing-consent-dialog';
import MobileNavbarApp from './_components/mobile-navbar-app';
import OnboardingForm from './_components/onboarding-form/onboarding-form';
import OnboardingStripeStatusDialog from './_components/onboarding-stripe-status-dialog';
import StripeOnboardingInfo from './_components/stripe-onboarding-info';

const AppLayout = async ({ children, params: { locale } }: { children: ReactNode; params: { locale: Locale } }) => {
  unstable_setRequestLocale(locale);
  const t = await getTranslations();
  const supabase = getSupabaseServerClient();
  const user = await getUserWithNull();
  const isTrainerAccount = user ? await checkIsTrainerAccount(user.id) : false;
  const trainerDetails = isTrainerAccount && user && (await getTrainerDetailsById(user.id));
  const isOnboarded = trainerDetails ? trainerDetails.is_onboarded : true;

  let shouldDisplayMarketingConsentModal = false;
  if (user && !isTrainerAccount) {
    const { data: roles, error } = await supabase
      .from('user_data')
      .select('consent_modal_displayed')
      .eq('user_id', user.id)
      .single();
    if (!roles || error) throw new Error();

    shouldDisplayMarketingConsentModal = !roles.consent_modal_displayed;
  }

  return (
    <>
      <div className="min-h-screen-responsive flex flex-col">
        {isOnboarded && (
          <>
            <DesktopNavbarApp />
            <MobileNavbarApp />
          </>
        )}
        {isOnboarded ? (
          children
        ) : (
          <div className="z-0 mx-auto flex w-full max-w-screen-2xl flex-col px-5 pb-8 pt-4 lg:pb-12 lg:pt-28">
            <main className="flex grow">
              <section className="mx-auto flex w-[500px] max-w-full flex-col gap-10">
                <div className="flex flex-col gap-2.5 text-white  min-[500px]:text-center">
                  <h1 className="text-2xl font-bold md:text-3xl">{t('ONBOARDING_TITLE')}</h1>
                  <p className=" text-xl">{t('ONBOARDING_DESCRIPTION')}</p>
                </div>
                <OnboardingForm />
              </section>
            </main>
          </div>
        )}
        {trainerDetails && trainerDetails.stripe_onboarding_status !== 'verified' && isOnboarded && (
          <StripeOnboardingInfo trainerDetails={trainerDetails} userId={user.id} />
        )}
        <OnboardingStripeStatusDialog />
        <MarketingConsentDialog shouldDisplayMarketingConsentModal={shouldDisplayMarketingConsentModal} />
      </div>
      <div id="portal-root" />
    </>
  );
};

export default AppLayout;
