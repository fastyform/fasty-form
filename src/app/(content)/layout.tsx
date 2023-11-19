import { ReactNode } from 'react';
import DesktopNavbar from './_components/navbar/desktop-navbar/desktop-navbar';

const ContentLayout = ({ children }: { children: ReactNode }) => (
  <div className="ml-auto mr-auto flex h-full max-w-screen-2xl flex-col px-5">
    <DesktopNavbar />
    <main className="flex grow lg:pt-10 ">{children}</main>
  </div>
);

export default ContentLayout;
