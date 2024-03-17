import { AnchorHTMLAttributes, ReactNode } from 'react';
import Link, { LinkProps } from 'next/link';
import { SearchParam } from '@/utils/types';

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> &
  LinkProps & {
    children?: ReactNode;
    redirectUrlParam: SearchParam;
  };

const AuthLink = (props: Props) => {
  const { href, redirectUrlParam, ...rest } = props;
  const redirectUrl = typeof redirectUrlParam === 'string' ? `?redirectUrl=${redirectUrlParam}` : '';

  return (
    <Link
      className="w-fit self-center text-white transition-opacity hover:opacity-80"
      href={`${href}${redirectUrl}`}
      {...rest}
    />
  );
};

export default AuthLink;
