'use client';

import { useEffect } from 'react';
import { CircularProgress } from '@mui/material';
import { createBrowserClient } from '@supabase/ssr';
import { RealtimePostgresUpdatePayload } from '@supabase/supabase-js';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import actionRevalidateRootLayout from '@/app/[locale]/(app)/(content)/_actions/action-revalidate-root-layout';
import ErrorIcon from '@/assets/error-icon';
import AppButton from '@/components/app-button';
import createQueryString from '@/utils/create-query-string';
import { TrainerDetails } from '@/utils/get-trainer-details-by-id';
import { Database } from '@/utils/supabase/supabase';

const StripeOnboardingInfo = ({ trainerDetails, userId }: { trainerDetails: TrainerDetails; userId: string }) => {
  const t = useTranslations();
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
        router.replace(
          `?${createQueryString([{ name: 'stripe_onboarding_status', value: 'verified', action: 'add' }], searchParams)}`,
        );
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
      className="flex items-center gap-2.5 border-t border-gray-600 bg-shark p-5 text-sm text-white shadow-xl"
      href="/payments"
    >
      {trainerDetails.stripe_onboarding_status === 'pending_verification' ? (
        <CircularProgress classes={{ root: 'text-yellow-400 min-w-[26px]' }} size={26} />
      ) : (
        <ErrorIcon className="h-auto w-10 shrink-0 grow-0 basis-10" />
      )}
      <div className="flex flex-wrap items-center gap-2.5">
        <span>{t(`PAYMENTS_STRIPE_ONBOARDING_INFO_CONTENT_${trainerDetails.stripe_onboarding_status}`)}</span>
        {trainerDetails.stripe_onboarding_status === 'unverified' && (
          <AppButton>{t('PAYMENTS_STRIPE_ONBOARDING_INFO_CONTENT_BUTTON')}</AppButton>
        )}
      </div>
    </Link>
  );
};

export default StripeOnboardingInfo;
