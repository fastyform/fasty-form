'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import StyledMuiTextInput from '@/components/styled-mui-text-input';

export const Login = () => {
  const supabase = createClientComponentClient();
  const router = useRouter();

  const handleLogin = async () => {
    await supabase.auth.signInWithPassword({ email: 'cratun.dev@gmail.com', password: 'fastform' });
    router.push('profile');
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="flex flex-col gap-4">
        <StyledMuiTextInput label="Login" />
        <StyledMuiTextInput label="Password" />
        <button type="button" onClick={handleLogin}>
          Log in
        </button>
      </div>
    </main>
  );
};
export default Login;
