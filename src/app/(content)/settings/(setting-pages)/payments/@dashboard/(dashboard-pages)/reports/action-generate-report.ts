'use server';

import { revalidatePath } from 'next/cache';
import { ReportType } from '@/app/(content)/settings/(setting-pages)/payments/utils';
import getStripe from '@/app/(stripe)/stripe/_utils/get-stripe';
import getUserFromSession from '@/utils/get-user-from-session';
import { getSupabaseServerClient } from '@/utils/supabase/client';

interface Payload {
  interval_start: number | undefined;
  interval_end: number;
  report_type: ReportType;
  stripeAccountId: string;
}

const actionGenerateReport = async (payload: Payload) => {
  const { interval_start, interval_end, report_type, stripeAccountId } = payload;
  const stripe = getStripe();
  const supabase = getSupabaseServerClient();

  const [user, reportRunResponse] = await Promise.all([
    getUserFromSession(),
    stripe.reporting.reportRuns.create({
      report_type,
      parameters: { interval_start, interval_end, connected_account: stripeAccountId },
    }),
  ]);

  const { error } = await supabase
    .from('trainers_details')
    .update({ stripe_recent_report_id: reportRunResponse.id })
    .eq('user_id', user.id);

  if (error) {
    throw new Error('Failed to update recent report id');
  }

  revalidatePath('/settings/payments/reports');
};

export default actionGenerateReport;
