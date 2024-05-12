'use client';

import { useState } from 'react';
import { CircularProgress, MenuItem } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import AppInput from '@/components/app-input/app-input';
import actionChangeLanguage from '@/utils/action-change-language';
import { Locale, LOCALES_FULL_NAMES } from '@/utils/constants';
import notify from '@/utils/notify';

const LanguageSelect = ({ className, currentLocale }: { className?: string; currentLocale: Locale }) => {
  const [isRedirecting, setIsRedirecting] = useState(false);
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();

  const localeChangeMutation = useMutation({
    mutationFn: (locale: Locale) => actionChangeLanguage(locale),
    onMutate: () => setIsRedirecting(true),
    onSuccess: (locale: Locale) => router.replace(`/${locale}${pathname}`),
    onError: () => {
      setIsRedirecting(false);
      notify.error(t('SETTINGS_ACCOUNT_ERROR_LANGUAGE_CHANGE'));
    },
  });

  return (
    <AppInput
      select
      className={className}
      value={currentLocale}
      SelectProps={{
        MenuProps: {
          classes: { paper: 'bg-shark bg-none rounded-xl' },
        },
        endAdornment: isRedirecting && <CircularProgress className="absolute right-10" size={20} />,
      }}
      onChange={(event) => localeChangeMutation.mutate(event.target.value as Locale)}
    >
      {LOCALES_FULL_NAMES.map(([locale, localeName]) => (
        <MenuItem key={locale} color="inherit" value={locale}>
          {localeName}
        </MenuItem>
      ))}
    </AppInput>
  );
};

export default LanguageSelect;
