import { Route } from 'next';
import Link from 'next/link';

const getHrefFormatted = (shouldNavigateBack?: boolean) => (href: Route) =>
  (shouldNavigateBack ? `${href}?should-navigate-back=true` : href) as Route;

const AuthFooter = ({ shouldNavigateBack }: { shouldNavigateBack?: boolean }) => {
  const getHref = getHrefFormatted(shouldNavigateBack);

  return (
    <div className="flex justify-center gap-5 pt-10 text-sm text-white">
      <Link href={getHref('/terms-of-service')}>Regulamin</Link>
      <Link href={getHref('/privacy-policy')}>Polityka prywatności</Link>
      <Link href={getHref('/contact')}>Kontakt</Link>
    </div>
  );
};

export default AuthFooter;
