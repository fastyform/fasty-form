import { twMerge } from 'tailwind-merge';

const PublicNavbarPlaceholder = ({ className }: { className?: string }) => (
  <div className={twMerge('h-[--public-navbar-height]', className)} />
);

export default PublicNavbarPlaceholder;
