import { ReactNode } from 'react';

const AppSkeletonWrapper = ({ children }: { children: ReactNode }) => (
  <div className="w-fit animate-pulse rounded-xl bg-shark">{children}</div>
);

export default AppSkeletonWrapper;
