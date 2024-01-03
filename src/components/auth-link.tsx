import { Route } from 'next';
import Link, { LinkProps } from 'next/link';
import { SearchParam } from '@/utils/types';

interface Props extends LinkProps<any> {
  redirectUrlParam: SearchParam;
}

const AuthLink = (props: Props) => {
  const { href, redirectUrlParam, ...rest } = props;
  const redirectUrl = typeof redirectUrlParam === 'string' ? `?redirectUrl=${redirectUrlParam}` : '';

  return (
    <Link
      className="w-fit self-center text-white transition-opacity hover:opacity-80"
      href={`${href}${redirectUrl}` as Route}
      {...rest}
    />
  );
};

export default AuthLink;
