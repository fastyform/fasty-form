'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

export const Login = () => {
  const supabase = createClientComponentClient();
  const router = useRouter();

  const handleLogin = async () => {
    await supabase.auth.signInWithPassword({ email: 'cratun.dev@gmail.com', password: 'fastform' });
    router.push('profile');
  };

  return (
    <div>
      <button type="button" onClick={handleLogin}>
        Log in
      </button>
    </div>
  );
};
export default Login;
