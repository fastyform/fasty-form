'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import AppButton from '@/components/app-button';

const SignOutButton = () => {
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <AppButton type="button" onClick={handleSignOut}>
      Wyloguj się
    </AppButton>
  );
};

export default SignOutButton;
