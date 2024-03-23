import { twMerge } from 'tailwind-merge';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container = ({ children, className }: ContainerProps) => (
  <section className={twMerge('flex justify-center px-5', className)}>{children}</section>
);

Container.Content = ({ children, className }: ContainerProps) => (
  <div className={twMerge('flex max-w-screen-xl grow', className)}>{children}</div>
);

export { Container };
