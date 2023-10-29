import { ReactNode } from 'react';
import LayoutHeader from './_components/layout-header';

const ContentLayout = ({ children }: { children: ReactNode }) => (
  <div className="flex h-full flex-col">
    <LayoutHeader />
    <main className="flex grow">{children}</main>
    <footer>
      <p>Footer</p>
    </footer>
  </div>
);

export default ContentLayout;
