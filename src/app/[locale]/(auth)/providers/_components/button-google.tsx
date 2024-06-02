'use client';

import { ReactNode, useEffect, useState } from 'react';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { QUERY_PARAM_ERRORS, QueryParamError } from '@/app/[locale]/(auth)/utils';
import AppButton from '@/components/app-button';
import notify from '@/utils/notify';

interface Props {
  children: ReactNode;
  authCallback: () => Promise<
    | {
        message: string;
        isSuccess: boolean;
      }
    | undefined
  >;
}

const ButtonGoogle = ({ children, authCallback }: Props) => {
  const t = useTranslations();
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const errorParam = searchParams.get('error');

  useEffect(() => {
    if (!errorParam) return;
    replace(pathname);

    if (QUERY_PARAM_ERRORS.includes(errorParam)) {
      notify.error(t(`QUERY_PARAM_ERROR_${errorParam as QueryParamError}`), {
        toastId: 'google-auth-error',
      });
    }
  }, [errorParam, replace, pathname, t]);

  const handleAuthAction = async () => {
    setIsLoading(true);
    const response = await authCallback();
    const { isSuccess = false, message = '' } = response || {};

    if (message && !isSuccess) {
      notify.error(message);
      setIsLoading(false);
    }
  };

  return (
    <AppButton
      color="secondary"
      loading={isLoading}
      size="large"
      startIcon={isLoading ? undefined : <Image alt="google" height={19} src="/google.svg" width={19} />}
      onClick={handleAuthAction}
    >
      {children} {t('OAUTH_WITH_PROVIDER')}&nbsp;<span className="font-bold">Google</span>
    </AppButton>
  );
};

export default ButtonGoogle;
