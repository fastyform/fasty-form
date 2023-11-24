import { ReactNode } from 'react';

const AppSkeletonWrapper = ({ children }: { children: ReactNode }) => (
  <div className="w-fit animate-pulse rounded-xl bg-[#1E2226]">{children}</div>
);

export default AppSkeletonWrapper;
