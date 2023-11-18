import { ReactNode } from 'react';
import MobileNavbarLink from '@/app/(content)/_components/navbar/mobile-navbar/mobile-navbar-link';
import AppLogo from '@/components/app-logo';
import getUserRoleFromSession from '@/utils/get-user-role-from-session';

const SubmissionLayout = async ({ children }: { children: ReactNode }) => {
  const isTrainerAccount = (await getUserRoleFromSession()) === 'trainer';

  return (
    <section className="my-5 flex w-full flex-col gap-10">
      <div className="align-center flex w-full justify-between lg:hidden">
        <AppLogo />
        <div className="flex gap-5">
          <MobileNavbarLink aria-label="Ustawienia" href="/settings" icon="settings" />
          {isTrainerAccount && <MobileNavbarLink aria-label="Profil" href="/profile" icon="profile" />}
        </div>
      </div>
      {children}
    </section>
  );
};

export default SubmissionLayout;
