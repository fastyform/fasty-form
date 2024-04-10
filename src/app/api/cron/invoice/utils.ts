import fs from 'fs';
import path from 'path';
import fontkit from '@pdf-lib/fontkit';
import dayjs, { Dayjs } from 'dayjs';
import { PDFDocument, PDFFont } from 'pdf-lib';
import Stripe from 'stripe';
import { groszToPLN } from '@/utils/stripe';

export type InvoiceData = {
  invoice_number: string;
  invoice_date: string;
  invoice_period: string;
  recipient: string;
  transaction_count: string;
  transaction_total: string;
  net_value: string;
  vat_value: string;
  gross_value: string;
};

interface InvoiceDataParams {
  account: Stripe.Account;
  balanceTransactions: Stripe.Charge[];
  previousMonthDate: Dayjs;
}

const currency = 'PLN';
const createReadableAmountFormat = (amountInGrosz: number) =>
  `${groszToPLN(amountInGrosz).toFixed(2)} ${currency}`.replace('.', ',');

export const getInvoiceData = ({
  account,
  balanceTransactions,
  previousMonthDate,
}: InvoiceDataParams): Omit<InvoiceData, 'invoice_number'> => {
  const accountIdField = `Identyfikator konta: ${account.id}`;

  const recipient = (
    account.business_type === 'individual'
      ? [
          account.business_profile?.name,
          [account.individual?.address?.line1, account.individual?.address?.line2].filter(Boolean).join(' '),
          [account.individual?.address?.city, account.individual?.address?.postal_code].filter(Boolean).join(' '),
          accountIdField,
        ]
      : [
          account?.company?.name,
          [account.company?.address?.line1, account.company?.address?.line2].filter(Boolean).join(' '),
          [account.company?.address?.city, account.company?.address?.postal_code].filter(Boolean).join(' '),
          `NIP: ${account.metadata?.nip}`,
          accountIdField,
        ]
  )
    .filter(Boolean)
    .join('\n');

  const roundUp = (value: number) => Math.round(value * 100) / 100;
  const gross_value = balanceTransactions.reduce((acc, curr) => acc + (curr.application_fee_amount || 0), 0);
  const net_value = roundUp(gross_value / 1.23);
  const vat_value = gross_value - net_value;

  return {
    invoice_date: dayjs().format('DD/MM/YYYY'),
    invoice_period: previousMonthDate.format('MM/YYYY'),
    recipient,
    transaction_count: balanceTransactions.length.toString(),
    transaction_total: createReadableAmountFormat(balanceTransactions.reduce((acc, curr) => acc + curr.amount, 0)),
    net_value: createReadableAmountFormat(net_value),
    vat_value: createReadableAmountFormat(vat_value),
    gross_value: createReadableAmountFormat(gross_value),
  };
};

export const generateInvoice = async (invoiceData: InvoiceData) => {
  // Load the PDF with the template fields
  const formPdfBytes = fs.readFileSync(path.join(process.cwd(), 'public/invoice/invoice-ff-form.pdf'));
  const pdfDoc = await PDFDocument.load(formPdfBytes);

  // Register fontkit instance with PDFDocument
  pdfDoc.registerFontkit(fontkit);

  const readFontFile = (weight: string) =>
    fs.readFileSync(path.join(process.cwd(), `public/invoice/roboto-font/${weight}.ttf`));

  const robotoBlackFont = await pdfDoc.embedFont(readFontFile('black'));
  const robotoRegularFont = await pdfDoc.embedFont(readFontFile('regular'));
  const robotoBoldFont = await pdfDoc.embedFont(readFontFile('bold'));

  const form = pdfDoc.getForm();

  const fieldAppearanceData: [keyof InvoiceData, PDFFont][] = [
    ['invoice_number', robotoBlackFont],
    ['invoice_date', robotoRegularFont],
    ['invoice_period', robotoRegularFont],
    ['recipient', robotoRegularFont],
    ['transaction_count', robotoRegularFont],
    ['transaction_total', robotoRegularFont],
    ['net_value', robotoRegularFont],
    ['vat_value', robotoRegularFont],
    ['gross_value', robotoBoldFont],
  ];

  fieldAppearanceData.forEach(([name, font]) => {
    const field = form.getField(name);
    // @ts-ignore
    field.setText(invoiceData[name]);
    // @ts-ignore
    field.updateAppearances(font);
  });

  // Flatten the form to make the fields no longer editable
  form.flatten();

  const filledPdfBytes = await pdfDoc.save();

  return filledPdfBytes;
};
