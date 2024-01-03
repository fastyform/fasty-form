import { Route } from 'next';
import Link from 'next/link';

const AuthFooter = ({ shouldNavigateBack }: { shouldNavigateBack?: boolean }) => {
  const getHrefFormatted = (href: Route) => (shouldNavigateBack ? `${href}?should-navigate-back=true` : href) as Route;

  return (
    <div className="flex flex-wrap justify-center gap-5 pt-10 text-sm text-white">
      <Link href={getHrefFormatted('/terms-of-service')}>Regulamin</Link>
      <Link href={getHrefFormatted('/privacy-policy')}>Polityka prywatności</Link>
      <Link href={getHrefFormatted('/contact')}>Kontakt</Link>{' '}
      <Link href={getHrefFormatted('/cookies')}>Ciateczka</Link>
    </div>
  );
};

export default AuthFooter;
