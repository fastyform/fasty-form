import AppLogo from '@/components/app-logo';
import DesktopNavbarLink from './desktop-navbar-link';

const DesktopNavbar = () => {
  // TODO CONNECT WITH AUTH SERVICE TO CHECK ACCOUNT TYPE
  const isTrainerAccount = true;

  return (
    <header className=" fixed left-1/2 top-10 z-10 flex hidden h-[86px] w-full max-w-screen-2xl -translate-x-1/2 transform items-center justify-between rounded-full border border-gray-600 bg-[#1E2226] px-10 lg:visible">
      <AppLogo />
      <div className="flex h-full items-center gap-10">
        <DesktopNavbarLink href="/submissions" icon="submissions">
          Zgłoszenia
        </DesktopNavbarLink>
        <DesktopNavbarLink href="/settings" icon="settings">
          Ustawienia
        </DesktopNavbarLink>
        {isTrainerAccount && (
          <DesktopNavbarLink href="/profile" icon="profile">
            Profil
          </DesktopNavbarLink>
        )}
      </div>
    </header>
  );
};

export default DesktopNavbar;
