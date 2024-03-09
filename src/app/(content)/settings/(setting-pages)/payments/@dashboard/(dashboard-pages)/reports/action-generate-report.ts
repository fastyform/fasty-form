'use server';

import { revalidatePath } from 'next/cache';
import { ReportType } from '@/app/(content)/settings/(setting-pages)/payments/utils';
import getStripe from '@/app/(stripe)/stripe/_utils/get-stripe';

interface Payload {
  interval_start: number;
  interval_end: number;
  report_type: ReportType;
  stripeAccountId: string;
}

const actionGenerateReport = async (payload: Payload) => {
  const { interval_start, interval_end, report_type, stripeAccountId } = payload;
  const stripe = getStripe();

  await stripe.reporting.reportRuns.create({
    report_type,
    parameters: { interval_start, interval_end, connected_account: stripeAccountId },
  });

  revalidatePath('/settings/payments/reports');
};

export default actionGenerateReport;
