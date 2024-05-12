'use client';

import { useMutation } from '@tanstack/react-query';
import { usePathname, useRouter } from 'next/navigation';
import AppButton from '@/components/app-button';
import actionChangeLanguage from '@/utils/action-change-language';
import { Locale, LOCALES_FULL_NAMES } from '@/utils/constants';

const FooterLanguageLinks = () => {
  const pathname = usePathname();
  const router = useRouter();
  const localeChangeMutation = useMutation({
    mutationFn: (locale: Locale) => actionChangeLanguage(locale),
    onSuccess: (locale: Locale) => router.replace(`/${locale}${pathname}`),
  });

  return (
    <div className="flex flex-wrap justify-center gap-5 text-xs md:justify-start">
      {LOCALES_FULL_NAMES.map(([locale, name]) => (
        <AppButton
          key={locale}
          disableRipple
          classes={{ text: 'text-xs font-normal min-w-0', root: 'p-0' }}
          variant="text"
          onClick={() => localeChangeMutation.mutate(locale)}
        >
          {name}
        </AppButton>
      ))}
    </div>
  );
};
export default FooterLanguageLinks;
