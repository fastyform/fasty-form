import { ReactNode } from 'react';
import MobileNavbar from '@/components/app-navbar/mobile-navbar/mobile-navbar';
import checkIsTrainerAccount from '@/utils/check-is-trainer-account';
import getTrainerDetailsById from '@/utils/get-trainer-details-by-id';
import getUserWithNull from '@/utils/get-user-with-null';
import { getSupabaseServerComponentClient } from '@/utils/supabase/client';
import DesktopNavbarApp from './_components/desktop-navbar-app';
import MarketingConsentDialog from './_components/marketing-consent-dialog/marketing-consent-dialog';
import MobileNavbarContent from './_components/mobile-navbar-content';
import OnboardingForm from './_components/onboarding-form/onboarding-form';
import OnboardingStripeStatusDialog from './_components/onboarding-stripe-status-dialog';
import StripeOnboardingInfo from './_components/stripe-onboarding-info';

const ContentLayout = async ({ children }: { children: ReactNode }) => {
  const supabase = getSupabaseServerComponentClient();
  const user = await getUserWithNull();
  const isTrainerAccount = user ? await checkIsTrainerAccount(user.id) : false;
  const trainerDetails = isTrainerAccount && user && (await getTrainerDetailsById(user.id));
  const isOnboarded = trainerDetails ? trainerDetails.is_onboarded : true;

  let shouldDisplayMarketingConsentModal = false;
  if (user && !isTrainerAccount) {
    const { data: roles, error } = await supabase
      .from('roles')
      .select('consent_modal_displayed')
      .eq('user_id', user.id)
      .single();
    if (!roles || error) throw new Error();

    shouldDisplayMarketingConsentModal = !roles.consent_modal_displayed;
  }

  return (
    <div className="min-h-screen-responsive flex flex-col">
      {isOnboarded && (
        <>
          <DesktopNavbarApp />
          <MobileNavbar>
            <MobileNavbarContent trainerDetails={trainerDetails} user={user} />
          </MobileNavbar>
        </>
      )}

      <div className="z-0 mx-auto flex w-full max-w-screen-2xl flex-col px-5 py-8 md:py-12">
        <main className="flex grow">
          {isOnboarded ? (
            children
          ) : (
            <section className="mx-auto flex w-[500px] max-w-full flex-col gap-10">
              <div className="flex flex-col gap-2.5 text-white  min-[500px]:text-center">
                <h1 className="text-2xl font-bold md:text-3xl">Wprowadź swoje dane</h1>
                <p className=" text-xl">
                  Aby rozpocząć korzystanie z portalu, prosimy o uzupełnienie wszystkich wymaganych pól.
                </p>
              </div>
              <OnboardingForm />
            </section>
          )}
        </main>
      </div>
      {trainerDetails && trainerDetails.stripe_onboarding_status !== 'verified' && isOnboarded && (
        <StripeOnboardingInfo trainerDetails={trainerDetails} userId={user.id} />
      )}
      <OnboardingStripeStatusDialog />
      <MarketingConsentDialog shouldDisplayMarketingConsentModal={shouldDisplayMarketingConsentModal} />
    </div>
  );
};

export default ContentLayout;
