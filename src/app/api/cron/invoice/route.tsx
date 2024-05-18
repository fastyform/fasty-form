import { Readable } from 'stream';
import { render } from '@react-email/render';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { NextRequest, NextResponse } from 'next/server';
import { getTranslations } from 'next-intl/server';
import Stripe from 'stripe';
import FeeInvoiceSent from '@/emails/fee-invoice-sent';
import Constants, { DEFAULT_LOCALE } from '@/utils/constants';
import { sendMail } from '@/utils/sendgrid';
import getStripe from '@/utils/stripe/get-stripe';
import { getSupabaseServerClient } from '@/utils/supabase/client';
import { getGoogleDriveClient, getGoogleDriveMonthFolderId, savePdfToGoogleDrive } from './google-drive-utils';
import { generateInvoice, getInvoiceData } from './utils';

dayjs.extend(utc);

export const GET = async (request: NextRequest) => {
  if (request.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const stripe = getStripe();

  const getAllConnectedAccounts = async (startingAfter?: string): Promise<Stripe.Account[]> => {
    const accounts = await stripe.accounts.list({ limit: 100, starting_after: startingAfter });

    if (accounts.has_more) {
      const nextAccounts = await getAllConnectedAccounts(accounts.data[accounts.data.length - 1].id);

      return [...accounts.data, ...nextAccounts];
    }

    return accounts.data;
  };

  const accounts = await getAllConnectedAccounts();

  const now = dayjs().utc();
  const previousMonthDate = now.subtract(1, 'month');

  const startOfPreviousMonthTimestamp = previousMonthDate.startOf('month').unix();
  const endOfPreviousMonthTimestamp = previousMonthDate.endOf('month').unix();

  const drive = await getGoogleDriveClient();
  const monthFolderId = await getGoogleDriveMonthFolderId(drive);

  const getAllChargesFromAccount = async (accountId: string, startingAfter?: string): Promise<Stripe.Charge[]> => {
    const transactions = await stripe.charges.list(
      {
        limit: 100,
        created: { gte: startOfPreviousMonthTimestamp, lte: endOfPreviousMonthTimestamp },
        starting_after: startingAfter,
      },
      {
        stripeAccount: accountId,
      },
    );

    if (transactions.has_more) {
      const nextTransactions = await getAllChargesFromAccount(
        accountId,
        transactions.data[transactions.data.length - 1].id,
      );

      return [...transactions.data, ...nextTransactions];
    }

    return transactions.data;
  };

  const accountsInvoiceDataPromises = accounts.map(async (account) => {
    const balanceTransactions = (await getAllChargesFromAccount(account.id)).filter(
      ({ status }) => status === 'succeeded',
    );

    if (!balanceTransactions.length) {
      return null;
    }

    const invoiceData = getInvoiceData({ account, balanceTransactions, previousMonthDate });

    return { invoiceData, account: { id: account.id, email: account.email } };
  });
  const accountsInvoicesData = (await Promise.all(accountsInvoiceDataPromises)).filter(Boolean);
  const preparedAccountsInvoicesData = accountsInvoicesData.map(({ invoiceData, account }, index) => ({
    invoiceData: {
      ...invoiceData,
      invoice_number: `ff/${String(index + 1).padStart(4, '0')}/${dayjs().format('MM/YYYY')}`,
    },
    account,
  }));

  const invoiceSendingErrors: { accountId: string; type: string; message: string }[] = [];

  let invoicesSent = 0;

  const supabase = getSupabaseServerClient(process.env.SUPABASE_SERVICE_ROLE_KEY!);
  const sendInvoicesPromises = preparedAccountsInvoicesData.map(async ({ invoiceData, account }) => {
    try {
      const invoicePdfBytes = await generateInvoice(invoiceData);

      const bufferStream = new Readable();
      const buffer = Buffer.from(invoicePdfBytes);
      bufferStream.push(buffer); // Convert Uint8Array to Buffer and push to the stream
      bufferStream.push(null); // Indicate the end of the stream

      try {
        await savePdfToGoogleDrive({
          fileName: `${invoiceData.invoice_number}.pdf`,
          body: bufferStream,
          drive,
          monthFolderId,
        });
      } catch (error: any) {
        invoiceSendingErrors.push({ accountId: account.id, type: 'google-drive', message: error?.message });
      }

      try {
        const trainerDetailsResponse = await supabase
          .from('trainers_details')
          .select('user_data (locale)')
          .eq('stripe_account_id', account.id)
          .single();

        if (trainerDetailsResponse.error) {
          throw new Error(trainerDetailsResponse.error.message);
        }

        const locale = trainerDetailsResponse.data?.user_data?.locale || DEFAULT_LOCALE;

        const t = await getTranslations({ locale });
        await sendMail({
          to: account.email as string,
          subject: t('MAIL_TEMPLATE_INVOICE_SUBJECT', { appName: Constants.APP_NAME }),
          html: render(
            <FeeInvoiceSent
              invoiceNumber={invoiceData.invoice_number}
              invoicePeriod={invoiceData.invoice_period}
              t={t}
            />,
          ),
          shouldThrow: true,
          attachments: [
            {
              content: buffer.toString('base64'),
              filename: `${invoiceData.invoice_number}.pdf`,
              type: 'application/pdf',
              disposition: 'attachment',
            },
          ],
        });

        invoicesSent += 1;
      } catch (error: any) {
        invoiceSendingErrors.push({ accountId: account.id, type: 'send-grid', message: error?.message });
      }
    } catch (error: any) {
      invoiceSendingErrors.push({ accountId: account.id, type: 'generate-invoice', message: error?.message });
    }
  });

  await Promise.all(sendInvoicesPromises);

  await sendMail({
    to: Constants.SUPPORT_MAIL,
    subject: `Faktury ${dayjs().format()}`,
    html: `<pre>${JSON.stringify({ invoicesSent, invoiceSendingErrors }, null, 2)}</pre>`,
  });

  return NextResponse.json({ message: 'success', invoicesSent, invoiceSendingErrors });
};
