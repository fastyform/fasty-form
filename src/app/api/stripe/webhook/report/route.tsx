import { render } from '@react-email/render';
import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { ReportType, reportTypeToLabel } from '@/app/[locale]/(content)/payments/utils';
import getUserAsAdminById from '@/app/[locale]/(content)/submissions/_utils/get-user-as-admin-by-id';
import ReportReady from '@/emails/report-ready';
import { sendMail } from '@/utils/sendgrid';
import getStripe from '@/utils/stripe/get-stripe';
import { getSupabaseServerClient } from '@/utils/supabase/client';

const secret = process.env.STRIPE_WEBHOOK_INVOICE_SECRET!;

export const POST = async (request: NextRequest) => {
  const stripe = getStripe();
  const signature = headers().get('stripe-signature');
  const supabase = getSupabaseServerClient(process.env.SUPABASE_SERVICE_ROLE_KEY!);

  if (!signature) throw new Error();

  let event;

  try {
    const body = await request.text();
    event = stripe.webhooks.constructEvent(body, signature, secret);
  } catch (error: any) {
    return NextResponse.json(
      {
        message: `Webhook Error: ${error.message}`,
        ok: false,
      },
      { status: 400 },
    );
  }
  if (event.type === 'reporting.report_run.succeeded') {
    const {
      data: { object },
    } = event;

    const reportType = object.report_type as ReportType;

    const { data, error } = await supabase
      .from('trainers_details')
      .select('user_id')
      .eq('stripe_account_id', object.parameters.connected_account as string)
      .single();

    if (error) {
      return NextResponse.json(
        {
          message: `Supabase Error: ${error.message}`,
          ok: false,
        },
        { status: 400 },
      );
    }

    const user = await getUserAsAdminById(data.user_id);

    const reportFileLink = await stripe.fileLinks.create({
      file: object.result?.id as string,
    });

    if (!reportFileLink.url) {
      return NextResponse.json(
        {
          message: `Report file link missing`,
          ok: false,
        },
        { status: 500 },
      );
    }

    await sendMail({
      to: user.email as string,
      subject: `Twój raport - "${reportTypeToLabel[reportType]}" jest gotowy!`,
      html: render(
        <ReportReady
          downloadUrl={reportFileLink.url}
          endDateTimestamp={object.parameters.interval_end as number}
          reportType={reportType}
          startDateTimestamp={object.parameters.interval_start}
        />,
      ),
    });
  }

  return NextResponse.json({ result: event, ok: true });
};
