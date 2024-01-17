'use client';

import Link from 'next/link';
import ErrorIcon from '@/assets/error-icon';
import AppButton from '@/components/app-button';

const ErrorPage = ({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) => (
  <div className="bg-custom-radial min-h-screen-responsive flex items-center justify-center p-5 text-white">
    <div className="flex flex-col items-center gap-8 text-center">
      <ErrorIcon className="h-72 w-72" />
      <div className="flex flex-col items-center gap-2">
        <h2 className="mb-2 text-4xl font-bold">Wystąpił nieoczekiwany błąd</h2>
        <p className="text-2xl">Kod błędu: {error.digest}</p>
      </div>
      <div className="flex flex-wrap gap-5">
        <AppButton onClick={reset}>Odśwież</AppButton>
        <AppButton classes={{ root: 'bg-shark text-white' }} component={Link} href="/">
          Strona główna
        </AppButton>
      </div>
    </div>
  </div>
);

export default ErrorPage;
