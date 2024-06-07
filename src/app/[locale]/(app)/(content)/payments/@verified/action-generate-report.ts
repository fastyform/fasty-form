'use server';

import { ReportType } from '@/app/[locale]/(app)/(content)/payments/utils';
import getStripe from '@/utils/stripe/get-stripe';

interface Payload {
  interval_start: number | undefined;
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
};

export default actionGenerateReport;
