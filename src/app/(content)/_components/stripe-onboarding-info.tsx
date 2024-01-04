'use client';

import { useEffect } from 'react';
import { CircularProgress } from '@mui/material';
import { createBrowserClient } from '@supabase/ssr';
import { RealtimePostgresUpdatePayload } from '@supabase/supabase-js';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import actionRevalidateRootLayout from '@/app/(content)/_actions/action-revalidate-root-layout';
import ErrorIcon from '@/assets/error-icon';
import AppButton from '@/components/app-button';
import createQueryString from '@/utils/create-query-string';
import { Database, Tables } from '@/utils/supabase/supabase';

const paymentInformationTitles = {
  unverified: ' Wprowadź swoje dane płatności, aby aktywować konto.',
  pending_verification: ' Twoje konto jest w trakcie weryfikacji. Poinformujemy Cię o zmianie statusu.',
};

const StripeOnboardingInfo = ({
  trainerDetails,
  userId,
}: {
  trainerDetails: Omit<Tables<'trainers_details'>, 'created_at' | 'user_id'>;
  userId: string;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
  const stripeOnboardingStatusParam = searchParams.get('stripe_onboarding_status');
  if (trainerDetails.stripe_onboarding_status === 'verified') throw new Error();

  useEffect(() => {
    if (stripeOnboardingStatusParam === 'verified') return;

    const handleStripeStatusUpdate = async (
      payload: RealtimePostgresUpdatePayload<Database['public']['Tables']['trainers_details']['Row']>,
    ) => {
      if (payload.new.stripe_onboarding_status === 'verified') {
        await actionRevalidateRootLayout();
        router.replace(`?${createQueryString('stripe_onboarding_status', 'verified', searchParams)}`);
      }
    };

    const channel = supabase
      .channel('trainers_details')
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'trainers_details', filter: `user_id=eq.${userId}` },
        handleStripeStatusUpdate,
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [router, searchParams, stripeOnboardingStatusParam, supabase, userId]);

  if (stripeOnboardingStatusParam === 'verified') return;

  return (
    <Link
      className="sticky bottom-0 right-0 mt-auto flex w-full items-center gap-2.5 border border-gray-600 bg-[#1E2226] p-5 text-sm text-white shadow-xl"
      href="/settings/payments"
    >
      {trainerDetails.stripe_onboarding_status === 'pending_verification' ? (
        <CircularProgress classes={{ root: 'text-yellow-400' }} size={26} />
      ) : (
        <ErrorIcon className="h-auto w-10 shrink-0 grow-0 basis-10" />
      )}
      <div className="flex flex-wrap items-center gap-2.5">
        <span>{paymentInformationTitles[trainerDetails.stripe_onboarding_status]}</span>
        <AppButton classes={{ root: 'py-2.5 text-sm' }}>Przejdź do ustawień płatności</AppButton>
      </div>
    </Link>
  );
};

export default StripeOnboardingInfo;
