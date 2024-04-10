import dayjs from 'dayjs';
import { ReportType, reportTypeToLabel } from '@/app/[locale]/(content)/payments/utils';
import Constants, { DATE_FORMAT } from '@/utils/constants';
import MailTemplate from './mail-template';

interface ReportReadyProps {
  downloadUrl: string;
  reportType: ReportType;
  startDateTimestamp?: number;
  endDateTimestamp: number;
}

const ReportReady = ({ downloadUrl, reportType, startDateTimestamp, endDateTimestamp }: ReportReadyProps) => (
  <MailTemplate title={`Twój raport "${reportTypeToLabel[reportType]}" jest już gotowy!`}>
    <MailTemplate.CallToAction href={downloadUrl}>Pobierz raport</MailTemplate.CallToAction>
    <MailTemplate.LineBreak />
    Cześć!
    <MailTemplate.LineBreak />
    Twój raport <strong>{reportTypeToLabel[reportType]}</strong>{' '}
    <strong>
      ({startDateTimestamp && `${dayjs.unix(startDateTimestamp).format(DATE_FORMAT)} -`}
      {dayjs.unix(endDateTimestamp).format(DATE_FORMAT)})
    </strong>{' '}
    jest już gotowy do pobrania. Możesz pobrać go klikając w przycisk powyżej.
    <MailTemplate.LineBreak />
    Pozdrawiamy,
    <br />
    Zespół {Constants.APP_NAME}
  </MailTemplate>
);

export default ReportReady;
