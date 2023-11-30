import { ReactNode } from 'react';
import Link from 'next/link';
import ErrorIcon from '@/assets/error-icon';
import AppButton from '@/components/app-button';
import getUserWithNull from '@/utils/get-user-with-null';
import DesktopNavbar from './_components/navbar/desktop-navbar/desktop-navbar';
import getTrainerDetailsById from './trainers/[id]/_utils/get-trainer-details-by-id';

const ContentLayout = async ({ children }: { children: ReactNode }) => {
  const user = await getUserWithNull();
  const isOnboardedStripe = user ? (await getTrainerDetailsById(user.id)).is_onboarded_stripe : true;

  return (
    <div className="ml-auto mr-auto flex min-h-screen max-w-screen-2xl flex-col px-5">
      <DesktopNavbar />
      <main className="flex grow lg:pt-10">{children}</main>
      {!isOnboardedStripe && (
        <Link
          className="fixed bottom-0 right-0 flex w-full items-start gap-2.5 border border-gray-600 bg-[#1E2226] p-5 text-sm text-white shadow-xl"
          href="/settings/payments"
        >
          <ErrorIcon className="h-auto w-10 shrink-0 grow-0 basis-10" />
          <div className="flex flex-wrap items-center gap-2.5">
            <span>Uzupełnij dane płatności, aby Twoje konto było aktywne.</span>
            <AppButton classes={{ root: 'py-2.5 text-sm' }}>Przejdź do ustawień płatności</AppButton>
          </div>
        </Link>
      )}
    </div>
  );
};

export default ContentLayout;
