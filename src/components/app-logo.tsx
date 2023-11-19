import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

const AppLogo = ({ className }: { className?: string }) => (
  <Image
    alt="FastForm logo"
    className={twMerge('place-self-center self-center object-contain', className)}
    height={43}
    src="/logo.png"
    width={120}
  />
);

export default AppLogo;
