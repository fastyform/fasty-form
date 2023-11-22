import AppLogo from '@/components/app-logo';
import checkIsTrainerAccount from '@/utils/check-is-trainer-account';
import getUserFromSession from '@/utils/get-user-from-session';
import DesktopNavbarLink from './desktop-navbar-link';

const DesktopNavbar = async () => {
  const { id: userId } = await getUserFromSession();
  const isTrainerAccount = await checkIsTrainerAccount(userId);

  return (
    <header className="z-50 mt-10 hidden h-[86px] w-full max-w-screen-2xl items-center justify-between rounded-full border border-gray-600 bg-[#1E2226] px-10 lg:flex">
      <AppLogo />
      <div className="flex h-full items-center gap-10">
        <DesktopNavbarLink href="/submissions" icon="submissions">
          Zgłoszenia
        </DesktopNavbarLink>
        <DesktopNavbarLink href="/settings/support" icon="settings">
          Ustawienia
        </DesktopNavbarLink>
        {isTrainerAccount && (
          <DesktopNavbarLink href={`/trainers/${userId}`} icon="profile">
            Profil
          </DesktopNavbarLink>
        )}
      </div>
    </header>
  );
};

export default DesktopNavbar;
