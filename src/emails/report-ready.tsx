import dayjs from 'dayjs';
import { ReportType, reportTypeToLabel } from '@/app/[locale]/(content)/payments/utils';
import { DATE_FORMAT } from '@/utils/constants';
import { IntlShape } from '@/utils/types';
import MailTemplate from './mail-template';

interface ReportReadyProps {
  downloadUrl: string;
  reportType: ReportType;
  startDateTimestamp?: number;
  endDateTimestamp: number;
  t: IntlShape;
}

const ReportReady = ({ downloadUrl, reportType, startDateTimestamp, endDateTimestamp, t }: ReportReadyProps) => {
  const reportName = `(${startDateTimestamp && `${dayjs.unix(startDateTimestamp).format(DATE_FORMAT)}`} - ${dayjs.unix(endDateTimestamp).format(DATE_FORMAT)})`;

  return (
    <MailTemplate title={t('MAIL_TEMPLATE_REPORT_READY_SUBJECT', { report: t(reportTypeToLabel[reportType]) })}>
      <MailTemplate.CallToAction href={downloadUrl}>
        {t('MAIL_TEMPLATE_REPORT_READY_DOWNLOAD')}
      </MailTemplate.CallToAction>
      <MailTemplate.Intro t={t} />
      {t.rich('MAIL_TEMPLATE_REPORT_READY_CONTENT', { reportType: t(reportTypeToLabel[reportType]), reportName })}
      <MailTemplate.Greetings t={t} />
    </MailTemplate>
  );
};

export default ReportReady;
