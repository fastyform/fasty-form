import { ReactNode } from 'react';

interface ContentLayoutContainerProps {
  children: ReactNode;
}

const ContentLayoutContainer = ({ children }: ContentLayoutContainerProps) => (
  <main className="z-0 grow overflow-auto">
    <div className="mx-auto flex w-full max-w-screen-2xl flex-col p-5 lg:pb-12 lg:pt-11">{children}</div>
  </main>
);

export default ContentLayoutContainer;
