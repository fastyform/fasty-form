'use client';

import { useEffect } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { RealtimePostgresInsertPayload } from '@supabase/supabase-js';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import AppButton from '@/components/app-button';
import { Database } from '@/utils/supabase/supabase';
import { SearchParams } from '@/utils/types';

const getSubmissionRequirementsLink = (id: string) => `/submissions/${id}/requirements`;

const SuccessPaymentPage = ({ searchParams }: { searchParams: SearchParams }) => {
  const t = useTranslations();
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
  const router = useRouter();
  const stripeSessionId = searchParams.stripe_session_id;

  if (!stripeSessionId) router.push('/submissions');

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push('/submissions');
    }, 30000);

    return () => clearTimeout(timeout);
  }, [router]);

  useEffect(() => {
    if (!stripeSessionId) return;
    const getNewSubmissionId = async () => {
      const { data } = await supabase
        .from('submissions')
        .select('id')
        .eq('stripe_session_id', stripeSessionId)
        .single();

      if (data && data.id) {
        router.push(getSubmissionRequirementsLink(data.id));
      }
    };
    getNewSubmissionId();
  }, [stripeSessionId, router, supabase]);

  useEffect(() => {
    const handleInserts = (
      payload: RealtimePostgresInsertPayload<Database['public']['Tables']['submissions']['Row']>,
    ) => {
      if (payload.new.stripe_session_id === stripeSessionId) {
        router.push(getSubmissionRequirementsLink(payload.new.id));
      }
    };

    const channel = supabase
      .channel('submissions')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'submissions', filter: `stripe_session_id=eq.${stripeSessionId}` },
        handleInserts,
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [stripeSessionId, router, supabase]);

  return (
    <div className="bg-custom-radial min-h-screen-responsive flex items-center justify-center p-5 text-white">
      <div className="flex flex-col items-center gap-5">
        <Image alt="" className="h-[90px] w-[90px]" height={90} src="/success.svg" width={90} />
        <div className="flex flex-col gap-2.5">
          <h2 className="text-center text-base font-bold md:text-xl lg:text-2xl xl:text-3xl">
            {t('PAYMENT_SUCCESS_TITLE')}
          </h2>
          <p className="text-center text-sm lg:text-base">{t('PAYMENT_SUCCESS_DESCRIPTION')}</p>
        </div>
        <div className="flex flex-wrap gap-5">
          <AppButton component={Link} href="/submissions">
            {t('PAYMENT_SUCCESS_BUTTON')}
          </AppButton>
        </div>
      </div>
    </div>
  );
};

export default SuccessPaymentPage;
