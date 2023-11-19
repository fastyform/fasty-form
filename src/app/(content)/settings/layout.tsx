import MobileNavbarLink from '@/app/(content)/_components/navbar/mobile-navbar/mobile-navbar-link';
import AppLogo from '@/components/app-logo';

const SettingsLayout = ({ children }: { children: React.ReactNode }) => (
  <section className="my-5 flex w-full flex-col gap-10">
    <div className="align-center relative flex w-full justify-center lg:hidden">
      <MobileNavbarLink
        aria-label="Zgłoszenia"
        className="absolute left-0 top-1/2 -translate-y-1/2"
        href="/submissions"
        icon="back"
      />
      <AppLogo />
    </div>
    {children}
  </section>
);

export default SettingsLayout;
