import { ReactNode } from 'react';
import checkIsTrainerAccount from '@/utils/check-is-trainer-account';
import getTrainerDetailsById from '@/utils/get-trainer-details-by-id';
import getUserWithNull from '@/utils/get-user-with-null';
import DesktopNavbar from './_components/navbar/desktop-navbar/desktop-navbar';
import OnboardingForm from './_components/onboarding-form/onboarding-form';
import OnboardingStripeStatusDialog from './_components/onboarding-stripe-status-dialog';
import StripeOnboardingInfo from './_components/stripe-onboarding-info';

const ContentLayout = async ({ children }: { children: ReactNode }) => {
  const user = await getUserWithNull();
  const isTrainerAccount = user ? await checkIsTrainerAccount(user.id) : false;
  const trainerDetails = isTrainerAccount && user && (await getTrainerDetailsById(user.id));
  const isOnboarded = trainerDetails ? trainerDetails.is_onboarded : true;

  return (
    <div className="min-h-screen-responsive flex flex-col">
      <div className="ml-auto mr-auto flex w-full max-w-screen-2xl flex-col px-5">
        {isOnboarded && <DesktopNavbar />}
        <main className="flex grow lg:pt-10">
          {isOnboarded ? (
            children
          ) : (
            <section className="mx-auto my-5 flex w-[500px] max-w-full flex-col gap-10">
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
    </div>
  );
};

export default ContentLayout;
