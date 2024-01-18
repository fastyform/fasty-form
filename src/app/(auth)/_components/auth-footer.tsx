import { Route } from 'next';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

interface Props {
  shouldNavigateBack?: boolean;
  className?: string;
}

const AuthFooter = ({ shouldNavigateBack, className }: Props) => {
  const getHrefFormatted = (href: Route) => (shouldNavigateBack ? `${href}?should-navigate-back=true` : href) as Route;

  return (
    <div className={twMerge('flex flex-wrap justify-center gap-5 text-sm text-white', className)}>
      <Link href={getHrefFormatted('/terms-of-service')}>Regulamin</Link>
      <Link href={getHrefFormatted('/privacy-policy')}>Polityka prywatności</Link>
      <Link href={getHrefFormatted('/contact')}>Kontakt</Link>{' '}
      <Link href={getHrefFormatted('/cookies')}>Ciasteczka</Link>
    </div>
  );
};

export default AuthFooter;
