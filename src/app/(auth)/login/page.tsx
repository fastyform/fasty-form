'use client';

import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormHelperText } from '@mui/material';
import { createBrowserClient } from '@supabase/ssr';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import AppInputForm from '@/components/app-input/app-input-form';

const formSchema = z.object({
  email: z
    .string({
      required_error: 'Proszę wprowadzić email.',
    })
    .email({ message: 'Proszę wprowadzić poprawny adres email.' }),
  password: z.string({ required_error: 'Proszę wprowadzić hasło.' }).min(1, 'Proszę wprowadzić hasło.'),
});

type FormValues = z.infer<typeof formSchema>;

const LoginPage = () => {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
  const router = useRouter();
  const [isInvalidCredentialsError, setIsInvalidCredentialsError] = useState(false);
  const { handleSubmit, control } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: '', password: '' },
  });

  const handleLogin: SubmitHandler<FormValues> = async (data) => {
    try {
      const res = await supabase.auth.signInWithPassword({ email: data.email, password: data.password });
      if (res.error) throw new Error(res.error.message);
      router.push('/orders');
    } catch {
      setIsInvalidCredentialsError(true);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <form className="flex w-96 flex-col gap-4" onSubmit={handleSubmit(handleLogin)}>
        <AppInputForm<FormValues> control={control} fieldName="email" label="Email" />
        <AppInputForm<FormValues> control={control} fieldName="password" label="Hasło" type="password" />
        {isInvalidCredentialsError && <FormHelperText error>Nieprawidłowe dane logowania</FormHelperText>}
        <button type="submit">Log in</button>
      </form>
    </main>
  );
};

export default LoginPage;
