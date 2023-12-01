import MobileNavbarLink from '@/app/(content)/_components/navbar/mobile-navbar/mobile-navbar-link';
import AppLogo from '@/components/app-logo';
import checkIsTrainerAccount from '@/utils/check-is-trainer-account';
import getUserFromSession from '@/utils/get-user-from-session';
import SettingsMenu from './_components/settings-menu';

const SettingsPage = async () => {
  const user = await getUserFromSession();
  const isTrainerAccount = await checkIsTrainerAccount(user.id);

  return (
    <>
      <div className="align-center relative flex w-full justify-center lg:hidden">
        <MobileNavbarLink
          aria-label="Zgłoszenia"
          className="absolute left-0 top-1/2 -translate-y-1/2"
          href="/submissions"
          icon="back"
        />
        <AppLogo />
      </div>
      <div className="flex lg:gap-10 xl:gap-20 2xl:gap-40">
        <div className="w-full lg:max-w-[350px]">
          <h1 className="text-2xl text-white">Ustawienia</h1>
          <SettingsMenu isTrainerAccount={isTrainerAccount} />
        </div>
      </div>
    </>
  );
};

export default SettingsPage;
