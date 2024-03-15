import { ReactNode } from 'react';
import { ClassNameValue, twMerge } from 'tailwind-merge';
import AppLogo from '@/components/app-logo';

const DesktopNavbar = async ({
  className,
  innerContainerClassName,
  children,
}: {
  className?: ClassNameValue;
  innerContainerClassName?: ClassNameValue;
  children: ReactNode;
}) => (
  <header
    className={twMerge(
      'z-50 hidden h-[68px] w-full items-center justify-center border-b border-gray-600 bg-shark px-10 lg:flex',
      className,
    )}
  >
    <div className={twMerge('flex w-full max-w-screen-2xl items-center justify-between', innerContainerClassName)}>
      <AppLogo className="w-[100px]" />
      <div className="flex h-full items-center">{children}</div>
    </div>
  </header>
);

export default DesktopNavbar;
