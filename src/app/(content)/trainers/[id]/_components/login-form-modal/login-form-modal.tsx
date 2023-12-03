'use client';

import { useEffect, useRef } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import LoginForm from '@/app/(auth)/login/_components/login-form';
import AppDialog from '@/components/app-dialog';

const LoginFormModal = ({ trainerId }: { trainerId: string }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const loginParam = searchParams.get('login');
  const isUserLoggedIn = useRef(false);

  useEffect(() => {
    const getUserFromSession = async () => {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      );
      const { data: session, error } = await supabase.auth.getSession();

      if (error) throw new Error();
      if (session.session) isUserLoggedIn.current = true;
    };

    getUserFromSession();
  }, []);
  if (isUserLoggedIn.current) return;

  return (
    <AppDialog key={loginParam} open={!!loginParam} onClose={() => router.replace(`/trainers/${trainerId}`)}>
      <div className="flex w-full flex-col gap-10 justify-self-center">
        <h1 className="text-2xl font-bold text-white">Zaloguj się</h1>
        <div className="flex flex-col gap-4">
          <LoginForm />
          <Link className="w-fit self-center text-white transition-opacity hover:opacity-80" href="/register/client">
            Nie masz konta? <span className="font-bold text-yellow-400"> Zarejestruj się</span>
          </Link>
        </div>
      </div>
    </AppDialog>
  );
};

export default LoginFormModal;
