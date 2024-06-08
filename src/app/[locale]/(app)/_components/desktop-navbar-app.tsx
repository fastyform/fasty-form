import AppLogo from '@/components/app-logo';
import NavbarContent from './navbar-content';

const DesktopNavbarApp = async () => (
  <header className="hidden h-[68px] w-full items-center justify-center border-b border-gray-600 bg-shark lg:flex">
    <div className="flex w-full max-w-screen-2xl items-center justify-between lg:px-5">
      <AppLogo className="w-[100px]" />
      <div className="flex h-full items-center px-5">
        <NavbarContent />
      </div>
    </div>
  </header>
);

export default DesktopNavbarApp;
