import { ReactNode } from 'react';
import Link from 'next/link';
import DesktopNavbar from './_components/navbar/desktop-navbar/desktop-navbar';

const ContentLayout = ({ children, modal }: { children: ReactNode; modal: ReactNode }) => (
  <div className="ml-auto mr-auto flex h-full max-w-screen-2xl flex-col px-5">
    <DesktopNavbar />
    <main className="flex grow lg:pt-10 ">
      {children} {modal}
    </main>
    <Link key="7" className="bg-yellow-400" href="/edit-profile/7">
      Open modal
    </Link>
  </div>
);

export default ContentLayout;
