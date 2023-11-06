import Image from 'next/image';
import NavbarLink from './navbar-link';

const Navbar = () => (
  <header className=" fixed left-1/2 top-10 z-10 flex h-[86px] w-full max-w-screen-2xl -translate-x-1/2 transform items-center justify-between rounded-full border border-gray-600 bg-[#1E2226] px-10">
    <Image alt="FastForm logo" className="self-center object-contain" height={43} src="/logo.png" width={120} />
    <div className="flex h-full items-center gap-10">
      <NavbarLink href="/orders" icon="submissions">
        Zgłoszenia
      </NavbarLink>
      <NavbarLink href="/settings" icon="settings">
        Ustawienia
      </NavbarLink>
    </div>
  </header>
);

export default Navbar;
