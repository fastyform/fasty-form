import { IntlShape } from '@/utils/types';
import MailTemplate from './mail-template';

interface FeeInvoiceSentProps {
  invoiceNumber: string;
  invoicePeriod: string;
  t: IntlShape;
}

const FeeInvoiceSent = ({ invoiceNumber, invoicePeriod, t }: FeeInvoiceSentProps) => (
  <MailTemplate title={t('MAIL_TEMPLATE_INVOICE_TITLE')}>
    <MailTemplate.Intro t={t} />
    {t.rich('MAIL_TEMPLATE_INVOICE_CONTENT', { invoiceNumber, invoicePeriod })}
    <MailTemplate.Greetings t={t} />
    <MailTemplate.LineBreak />
  </MailTemplate>
);

export default FeeInvoiceSent;
