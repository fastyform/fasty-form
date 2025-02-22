import { ReactNode } from 'react';
import Image, { ImageProps } from 'next/image';
import { twMerge } from 'tailwind-merge';
import AppLogo from '@/components/app-logo';
import AuthFooter from './auth-footer';

const SplitPageWithImage = ({
  children,
  imageProps: { className, ...imageProps },
}: {
  children: ReactNode;
  imageProps: ImageProps;
}) => (
  <main className="min-h-screen-responsive relative m-auto grid p-5 pt-10 lg:grid-cols-2 lg:place-items-center lg:p-0">
    <div className="relative flex h-full w-full max-w-md grow flex-col justify-self-center lg:py-5">
      <div className="my-auto flex flex-col gap-10">
        <AppLogo linkContainerClassName="self-center" />
        {children}
      </div>
      <AuthFooter className="pt-10" />
    </div>
    <div className="absolute right-0 top-0 hidden h-full w-1/2 lg:block">
      <Image fill className={twMerge('object-cover', className)} {...imageProps} />
    </div>
  </main>
);

export default SplitPageWithImage;
