import { twMerge } from 'tailwind-merge';

interface PublicContainerProps {
  children: React.ReactNode;
  className?: string;
}

const PublicContainer = ({ children, className }: PublicContainerProps) => (
  <section className={twMerge('flex justify-center px-5', className)}>{children}</section>
);

PublicContainer.Content = ({ children, className }: PublicContainerProps) => (
  <div className={twMerge('flex max-w-screen-xl grow', className)}>{children}</div>
);

export default PublicContainer;
