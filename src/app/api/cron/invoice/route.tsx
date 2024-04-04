import { Readable } from 'stream';
import { render } from '@react-email/render';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import getStripe from '@/app/(stripe)/stripe/_utils/get-stripe';
import FeeInvoiceSent from '@/emails/fee-invoice-sent';
import Constants from '@/utils/constants';
import { sendMail } from '@/utils/sendgrid';
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

  const getAllBalanceTransactions = async (
    accountId: string,
    startingAfter?: string,
  ): Promise<Stripe.BalanceTransaction[]> => {
    const transactions = await stripe.balanceTransactions.list(
      {
        limit: 100,
        type: 'charge',
        created: { gte: startOfPreviousMonthTimestamp, lte: endOfPreviousMonthTimestamp },
        starting_after: startingAfter,
      },
      {
        stripeAccount: accountId,
      },
    );

    if (transactions.has_more) {
      const nextTransactions = await getAllBalanceTransactions(
        accountId,
        transactions.data[transactions.data.length - 1].id,
      );

      return [...transactions.data, ...nextTransactions];
    }

    return transactions.data;
  };

  const accountsInvoiceDataPromises = accounts.map(async (account) => {
    const balanceTransactions = await getAllBalanceTransactions(account.id);

    if (!balanceTransactions.length) {
      return null;
    }

    const invoiceData = getInvoiceData({ account, balanceTransactions, previousMonthDate });

    return { invoiceData, account: { id: account.id, email: account.email } };
  });

  const accountsInvoicesData = (await Promise.all(accountsInvoiceDataPromises)).filter(Boolean).slice(0, 1);
  const preparedAccountsInvoicesData = accountsInvoicesData.map(({ invoiceData, account }, index) => ({
    invoiceData: {
      ...invoiceData,
      invoice_number: `ff/${String(index + 1).padStart(4, '0')}/${dayjs().format('MM/YYYY')}`,
    },
    account,
  }));

  const invoiceSendingErrors: { accountId: string; type: string; message: string }[] = [];

  let invoicesSent = 0;

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
        await sendMail({
          to: account.email as string,
          subject: `Nowa faktura od ${Constants.APP_NAME}`,
          html: render(
            <FeeInvoiceSent invoiceNumber={invoiceData.invoice_number} invoicePeriod={invoiceData.invoice_period} />,
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
