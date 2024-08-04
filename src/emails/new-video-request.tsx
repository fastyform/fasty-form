import { Fragment, ReactNode } from 'react';
import { Link } from '@react-email/components';
import Constants from '@/utils/constants';
import { IntlShape } from '@/utils/types';
import MailTemplate from './mail-template';

interface Props {
  trainerName: string;
  submissionId: string;
  t: IntlShape;
}

const NewVideoRequest = ({ trainerName, submissionId, t }: Props) => (
  <MailTemplate title={t('MAIL_TEMPLATE_NEW_VIDEO_REQUEST_TITLE')}>
    <MailTemplate.CallToAction href={`${Constants.ORIGIN_URL}/submissions/${submissionId}/requirements`}>
      {t('MAIL_TEMPLATE_NEW_VIDEO_REQUEST_CTA')}
    </MailTemplate.CallToAction>
    <MailTemplate.LineBreak />
    {t('MAIL_TEMPLATE_NEW_VIDEO_REQUEST_CONTENT_1')}
    <MailTemplate.LineBreak />
    {t.rich('MAIL_TEMPLATE_NEW_VIDEO_REQUEST_CONTENT_2', { trainerName })}
    <MailTemplate.LineBreak />
    <strong>
      {t.rich('MAIL_TEMPLATE_NEW_VIDEO_REQUEST_CONTENT_3', {
        SubmissionLink: (chunks: ReactNode) => (
          <Link href={`${Constants.ORIGIN_URL}/submissions/${submissionId}/requirements`}>{chunks}</Link>
        ),
      })}
      <MailTemplate.LineBreak />
    </strong>
    {(['1', '2', '3', '4'] as const).map((index) => (
      <Fragment key={index}>
        <br />
        {index}. {t.rich(`MAIL_TEMPLATE_NEW_VIDEO_REQUEST_CONTENT_3_${index}`)}
      </Fragment>
    ))}
    <MailTemplate.LineBreak />
    {t.rich('MAIL_TEMPLATE_NEW_VIDEO_REQUEST_CONTENT_4')}
    <MailTemplate.Greetings t={t} />
  </MailTemplate>
);

export default NewVideoRequest;
