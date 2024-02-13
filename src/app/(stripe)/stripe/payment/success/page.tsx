'use client';

import { useEffect } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { RealtimePostgresInsertPayload } from '@supabase/supabase-js';
import { Route } from 'next';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import AppButtonLink from '@/components/app-button-link';
import { Database } from '@/utils/supabase/supabase';

const getSubmissionRequirementsLink = (id: string) => `/submissions/${id}/requirements` as Route;

const SuccessPaymentPage = () => {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
  const searchParam = useSearchParams();
  const router = useRouter();
  const stripeSessionId = searchParam.get('stripe_session_id');

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
        <Image alt="Ikonka sukcesu" className="h-[90px] w-[90px]" height={90} src="/success.svg" width={90} />
        <div className="flex flex-col gap-2.5">
          <h2 className="text-center text-base font-bold md:text-xl lg:text-2xl xl:text-3xl">
            Płatność zakończona pomyślnie
          </h2>
          <p className="text-center text-sm lg:text-base">
            Nastąpi przekierowanie. Jeżeli to się nie wydarzy kliknij w przycisk poniżej.
          </p>
        </div>
        <div className="flex flex-wrap gap-5">
          <AppButtonLink className="py-2.5 text-sm" href="/submissions">
            Twoje zgłoszenia
          </AppButtonLink>
        </div>
      </div>
    </div>
  );
};

export default SuccessPaymentPage;
