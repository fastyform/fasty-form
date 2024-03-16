import { ReactNode } from 'react';
import SettingsMenu from '@/app/(content)/settings/_components/settings-menu';
import MobileNavbarLink from '@/components/app-navbar/mobile-navbar/mobile-navbar-link';
import checkIsTrainerAccount from '@/utils/check-is-trainer-account';
import getUserFromSession from '@/utils/get-user-from-session';

const SettingPagesLayout = async ({ children }: { children: ReactNode }) => {
  const user = await getUserFromSession();
  const isTrainerAccount = await checkIsTrainerAccount(user.id);

  return (
    <div className="flex lg:gap-10 xl:gap-20 2xl:gap-40">
      <div className="hidden w-full lg:block lg:max-w-[350px]">
        <h1 className="text-2xl text-white">Ustawienia</h1>
        <SettingsMenu isTrainerAccount={isTrainerAccount} />
      </div>
      <div className="flex grow flex-col gap-5">
        <MobileNavbarLink aria-label="Ustawienia" className="lg:hidden" href="/settings" icon="back" />
        {children}
      </div>
    </div>
  );
};

export default SettingPagesLayout;
