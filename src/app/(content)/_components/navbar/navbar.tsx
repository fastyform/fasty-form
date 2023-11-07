import AppLogo from '@/components/app-logo';
import NavbarLink from './navbar-link';

const Navbar = () => {
  // TODO CONNECT WITH AUTH SERVICE TO CHECK ACCOUNT TYPE
  const isTrainerAccount = true;

  return (
    <header className=" invisible fixed left-1/2 top-10 z-10 flex h-[86px] w-full max-w-screen-2xl -translate-x-1/2 transform items-center justify-between rounded-full border border-gray-600 bg-[#1E2226] px-10 lg:visible">
      <AppLogo />
      <div className="flex h-full items-center gap-10">
        <NavbarLink href="/submissions" icon="submissions">
          Zgłoszenia
        </NavbarLink>
        <NavbarLink href="/settings" icon="settings">
          Ustawienia
        </NavbarLink>
        {isTrainerAccount && (
          <NavbarLink href="/profile" icon="profile">
            Profil
          </NavbarLink>
        )}
      </div>
    </header>
  );
};

export default Navbar;
