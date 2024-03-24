import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

interface Props {
  className?: string;
}

const FOOTER_LINKS = [
  ['/terms-of-service', 'Regulamin'],
  ['/privacy-policy', 'Polityka prywatności'],
  ['/contact', 'Kontakt'],
  ['/cookies', 'Ciasteczka'],
  ['/ambassador-program', 'Program Ambasadorski'],
] as const;

const AuthFooter = ({ className }: Props) => (
  <div className={twMerge('flex flex-wrap justify-center gap-5 text-sm text-white', className)}>
    {FOOTER_LINKS.map(([href, label]) => (
      <Link key={href} href={href}>
        {label}
      </Link>
    ))}
  </div>
);

export default AuthFooter;
