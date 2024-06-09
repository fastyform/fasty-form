import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

const AppSkeletonButton = ({ children, className }: { className?: string; children?: ReactNode }) => (
  <div
    className={twMerge(
      'w-full animate-pulse select-none rounded-full bg-yellow-400 py-[18px] text-center text-base font-bold text-yellow-400 lg:text-base',
      className,
    )}
  >
    {children}
  </div>
);

export default AppSkeletonButton;
