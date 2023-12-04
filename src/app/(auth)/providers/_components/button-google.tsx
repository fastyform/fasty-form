'use client';

import { ReactNode, useEffect, useState } from 'react';
import { Route } from 'next';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { QUERY_PARAM_ERRORS, QueryParamError } from '@/app/(auth)/_utils';
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
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const errorParam = searchParams.get('error');

  useEffect(() => {
    if (!errorParam) return;
    replace(pathname as Route);

    if (errorParam in QUERY_PARAM_ERRORS) {
      notify.error(QUERY_PARAM_ERRORS[errorParam as QueryParamError], {
        toastId: 'google-auth-error',
      });
    }
  }, [errorParam, replace, pathname]);

  const handleAuthAction = async () => {
    setIsLoading(true);
    const response = await authCallback();
    const { isSuccess = false, message = '' } = response || {};

    if (message && !isSuccess) {
      notify.error(message);
    }
    // TODO: While redirecting button should be disabled
    setIsLoading(false);
  };

  return (
    <AppButton
      loading={isLoading}
      startIcon={isLoading ? undefined : <Image alt="google" height={19} src="/google.svg" width={19} />}
      classes={{
        root: 'bg-[#1E2226] font-normal text-white py-[18px] text-base rounded-full tracking-normal normal-case transition-opacity hover:opacity-80 border border-gray-600 border-solid',
      }}
      onClick={handleAuthAction}
    >
      {children} z&nbsp;<span className="font-bold">Google</span>
    </AppButton>
  );
};

export default ButtonGoogle;
