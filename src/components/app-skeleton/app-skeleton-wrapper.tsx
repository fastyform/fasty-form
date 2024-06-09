import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

const AppSkeletonWrapper = ({ children, className }: { children?: ReactNode; className?: string }) => (
  <div className={twMerge('w-fit animate-pulse rounded-xl bg-shark', className)}>{children}</div>
);

export default AppSkeletonWrapper;
