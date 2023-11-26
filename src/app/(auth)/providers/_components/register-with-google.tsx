import { useEffect, useState } from 'react';
import { Id, toast } from 'react-toastify';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import actionRegisterGoogle from '@/app/(auth)/providers/_actions/action-register-google';
import { REGISTER_ERRORS } from '@/enums';
import notify from '@/utils/notify';
import { Database } from '@/utils/supabase/supabase';
import ProviderButton from './provider-button';

interface Props {
  userRole: Database['public']['Enums']['role'];
}

const RegisterWithGoogle = ({ userRole }: Props) => {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const errorParam = searchParams.get('error');

  useEffect(() => {
    if (!errorParam) return;
    let toastId: Id | undefined;

    if (errorParam in REGISTER_ERRORS) {
      toastId = notify.error(REGISTER_ERRORS[errorParam as keyof typeof REGISTER_ERRORS].text);
    }

    return () => {
      if (toastId) toast.dismiss(toastId);
    };
  }, [errorParam]);

  const handleRegisterClientGoogle = async () => {
    setIsLoading(true);
    const response = await actionRegisterGoogle(userRole);
    const { isSuccess = false, message = '' } = response || {};

    if (message && !isSuccess) {
      notify.error(message);
    }
    // TODO: While redirecting button should be disabled
    setIsLoading(false);
  };

  return (
    <ProviderButton
      icon={<Image alt="google" height={19} src="/google.svg" width={19} />}
      loading={isLoading}
      onClick={handleRegisterClientGoogle}
    >
      Zarejestruj się z &nbsp;<span className="font-bold">Google</span>
    </ProviderButton>
  );
};

export default RegisterWithGoogle;
