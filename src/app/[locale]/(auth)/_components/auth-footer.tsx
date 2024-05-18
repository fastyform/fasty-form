import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { twMerge } from 'tailwind-merge';
import FooterLanguageLinks from './footer-language-links';

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
    <footer className={twMerge('flex flex-col gap-10  text-white', className)}>
      <div className="flex flex-wrap justify-center gap-5 text-sm">
        {FOOTER_LINKS.map(([href, labelKey]) => (
          <Link key={href} href={href}>
            {t(`COMMON_${labelKey}`)}
          </Link>
        ))}
      </div>
      <FooterLanguageLinks />
    </footer>
  );
};

export default AuthFooter;
