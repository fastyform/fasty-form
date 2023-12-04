import { ReactNode } from 'react';

const AppSkeletonButton = ({ children }: { children: ReactNode }) => (
  <div className="w-full max-w-sm animate-pulse select-none rounded-full bg-yellow-400 py-[18px] text-center text-base font-bold text-yellow-400 lg:text-base">
    {children}
  </div>
);

export default AppSkeletonButton;
