'use client';

import { Button } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { usePathname, useRouter } from 'next/navigation';
import actionChangeLanguage from '@/utils/action-change-language';
import { Locale, LOCALES_FULL_NAMES } from '@/utils/constants';

const FooterLanguageLinks = () => {
  const pathname = usePathname();
  const router = useRouter();
  const localeChangeMutation = useMutation({
    mutationFn: (locale: Locale) => actionChangeLanguage(locale),
    onSuccess: (locale: Locale) => {
      router.replace(`/${locale}${pathname}`);
      router.refresh();
    },
  });

  return (
    <div className="flex flex-wrap justify-center gap-5 text-xs md:justify-start">
      {LOCALES_FULL_NAMES.map(([locale, name]) => (
        <Button
          key={locale}
          disableRipple
          classes={{ root: 'p-0 text-xs normal-case font-normal min-w-0 text-white tracking-normal' }}
          onClick={() => localeChangeMutation.mutate(locale)}
        >
          {name}
        </Button>
      ))}
    </div>
  );
};
export default FooterLanguageLinks;
