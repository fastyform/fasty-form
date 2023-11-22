import Link, { LinkProps } from 'next/link';
import { twMerge } from 'tailwind-merge';

const AppButtonLink = ({ className, ...props }: LinkProps<any>) => (
  <Link
    className={twMerge(
      'flex items-center justify-center rounded-full bg-yellow-400 px-[30px] py-[18px] text-base font-bold normal-case tracking-normal text-[#0D1116] transition-opacity hover:opacity-80',
      className,
    )}
    {...props}
  />
);

export default AppButtonLink;
