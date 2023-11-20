import { ReactNode, Suspense } from 'react';
import MobileNavbarLink from '@/app/(content)/_components/navbar/mobile-navbar/mobile-navbar-link';
import EditButtonDesktop from './_components/edit-button-desktop';
import EditButtonMobile from './_components/edit-button-mobile';

const TrainerPageLayout = async ({ children, params }: { children: ReactNode; params: { id: string } }) => (
  <section className="relative flex h-screen w-full flex-col justify-between py-5 lg:h-auto">
    <div className="fixed left-0 top-0 z-30 h-20 w-full bg-gradient-to-b from-[#0D1116] to-transparent" />
    <Suspense>
      <EditButtonDesktop trainerId={params.id} />
    </Suspense>
    <div className="relative z-30 flex justify-between lg:hidden">
      <MobileNavbarLink aria-label="Zgłoszenia" href="/submissions" icon="back" />
      <Suspense>
        <EditButtonMobile trainerId={params.id} />
      </Suspense>
    </div>
    {children}
  </section>
);

export default TrainerPageLayout;
