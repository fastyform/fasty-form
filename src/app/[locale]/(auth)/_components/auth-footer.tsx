import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { twMerge } from 'tailwind-merge';

interface Props {
  className?: string;
}

const FOOTER_LINKS = [
  ['/terms-of-service', 'TOS'],
  ['/privacy-policy', 'PRIVACY_POLICY'],
  ['/contact', 'CONTACT'],
  ['/cookies', 'COOKIES'],
  ['/ambassador-program', 'AMBASSADOR'],
  ['/', 'HOME_PAGE'],
] as const;

const AuthFooter = ({ className }: Props) => {
  const t = useTranslations();

  return (
    <div className={twMerge('flex flex-wrap justify-center gap-5 text-sm text-white', className)}>
      {FOOTER_LINKS.map(([href, labelKey]) => (
        <Link key={href} href={href}>
          {t(`COMMON_${labelKey}`)}
        </Link>
      ))}
    </div>
  );
};

export default AuthFooter;
