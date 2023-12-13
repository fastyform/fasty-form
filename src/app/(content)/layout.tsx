import { ReactNode } from 'react';
import Link from 'next/link';
import ErrorIcon from '@/assets/error-icon';
import AppButton from '@/components/app-button';
import checkIsTrainerAccount from '@/utils/check-is-trainer-account';
import getTrainerDetailsById from '@/utils/get-trainer-details-by-id';
import getUserWithNull from '@/utils/get-user-with-null';
import DesktopNavbar from './_components/navbar/desktop-navbar/desktop-navbar';
import OnboardingForm from './_components/onboarding-form/onboarding-form';

const ContentLayout = async ({ children }: { children: ReactNode }) => {
  const user = await getUserWithNull();
  const isTrainerAccount = user ? await checkIsTrainerAccount(user.id) : false;
  const trainerDetails = isTrainerAccount && user && (await getTrainerDetailsById(user.id));
  const isOnboardedStripe = trainerDetails ? trainerDetails.is_onboarded_stripe : true;
  const isOnboarded = trainerDetails ? trainerDetails.is_onboarded : true;

  return (
    <div className="min-h-screen-responsive flex flex-col">
      <div className="ml-auto mr-auto flex w-full max-w-screen-2xl flex-col px-5">
        <DesktopNavbar />
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
      {!isOnboardedStripe && (
        <Link
          className="sticky bottom-0 right-0 mt-auto flex w-full items-start gap-2.5 border border-gray-600 bg-[#1E2226] p-5 text-sm text-white shadow-xl"
          href="/settings/payments"
        >
          <ErrorIcon className="h-auto w-10 shrink-0 grow-0 basis-10" />
          <div className="flex flex-wrap items-center gap-2.5">
            <span>Wprowadź swoje dane płatności, aby aktywować konto.</span>
            <AppButton classes={{ root: 'py-2.5 text-sm' }}>Przejdź do ustawień płatności</AppButton>
          </div>
        </Link>
      )}
    </div>
  );
};

export default ContentLayout;
