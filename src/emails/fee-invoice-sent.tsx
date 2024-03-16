import Constants from '@/utils/constants';
import MailTemplate from './mail-template';

interface FeeInvoiceSentProps {
  invoiceNumber: string;
  invoicePeriod: string;
}

const FeeInvoiceSent = ({ invoiceNumber, invoicePeriod }: FeeInvoiceSentProps) => (
  <MailTemplate title={`Nowa faktura od ${Constants.APP_NAME}`}>
    <MailTemplate.LineBreak />
    Cześć!
    <MailTemplate.LineBreak />
    Piszemy, aby poinformować, że faktura {Constants.APP_NAME} ({invoiceNumber}) za okres{' '}
    <strong>{invoicePeriod}</strong> jest załączona do tej wiadomości jako plik PDF. Zaległe saldo należne za tę fakturę
    wynosi 0,00 PLN.
    <MailTemplate.LineBreak />
    Pozdrawiamy,
    <br />
    Zespół {Constants.APP_NAME}
  </MailTemplate>
);

export default FeeInvoiceSent;
