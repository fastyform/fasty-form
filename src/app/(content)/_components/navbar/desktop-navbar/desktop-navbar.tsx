import AppLogo from '@/components/app-logo';
import getUserRoleFromSession from '@/utils/get-user-role-from-session';
import DesktopNavbarLink from './desktop-navbar-link';

const DesktopNavbar = async () => {
  const isTrainerAccount = (await getUserRoleFromSession()) === 'trainer';

  return (
    <header className="mt-10 hidden h-[86px] w-full max-w-screen-2xl items-center justify-between rounded-full border border-gray-600 bg-[#1E2226] px-10 lg:flex">
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
