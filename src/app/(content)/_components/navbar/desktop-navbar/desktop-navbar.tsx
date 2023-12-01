import AppLogo from '@/components/app-logo';
import checkIsTrainerAccount from '@/utils/check-is-trainer-account';
import getUserWithNull from '@/utils/get-user-with-null';
import DesktopNavbarLink from './desktop-navbar-link';

const DesktopNavbar = async () => {
  const user = await getUserWithNull();
  const isTrainerAccount = user ? await checkIsTrainerAccount(user.id) : false;

  return (
    <header className="z-50 mt-10 hidden h-[86px] w-full max-w-screen-2xl items-center justify-between rounded-full border border-gray-600 bg-[#1E2226] px-10 lg:flex">
      <AppLogo />
      <div className="flex h-full items-center gap-10">
        <DesktopNavbarLink href="/submissions" icon="submissions">
          Zgłoszenia
        </DesktopNavbarLink>
        <DesktopNavbarLink href="/settings/payments" icon="settings">
          Ustawienia
        </DesktopNavbarLink>
        {isTrainerAccount && user && (
          <DesktopNavbarLink href={`/trainers/${user.id}`} icon="profile">
            Profil
          </DesktopNavbarLink>
        )}
      </div>
    </header>
  );
};

export default DesktopNavbar;
