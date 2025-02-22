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

const NewRequirementsSent = ({ trainerName, submissionId, t }: Props) => (
  <MailTemplate title={t('MAIL_TEMPLATE_NEW_REQUIREMENTS_SENT_TITLE')}>
    <MailTemplate.CallToAction href={`${Constants.ORIGIN_URL}/submissions/${submissionId}`}>
      {t('MAIL_TEMPLATE_NEW_REQUIREMENTS_SENT_CTA')}
    </MailTemplate.CallToAction>
    <MailTemplate.LineBreak />
    {t('MAIL_TEMPLATE_NEW_REQUIREMENTS_SENT_HEADLINE', { trainerName })}
    <MailTemplate.LineBreak />
    {t.rich('MAIL_TEMPLATE_NEW_REQUIREMENTS_SENT_CONTENT_1')}
    <MailTemplate.LineBreak />
    <strong>
      {t.rich('MAIL_TEMPLATE_NEW_REQUIREMENTS_SENT_CONTENT_2', {
        SubmissionLink: (chunks: ReactNode) => (
          <Link href={`${Constants.ORIGIN_URL}/submissions/${submissionId}`}>{chunks}</Link>
        ),
      })}
    </strong>
    <br />
    {(['1', '2', '3', '4'] as const).map((index) => (
      <Fragment key={index}>
        <br />
        {index}. {t.rich(`MAIL_TEMPLATE_NEW_REQUIREMENTS_SENT_CONTENT_3_${index}`)}
      </Fragment>
    ))}
    <MailTemplate.LineBreak />
    {t('MAIL_TEMPLATE_NEW_REQUIREMENTS_SENT_CONTENT_4')}
    <MailTemplate.LineBreak />
    {t.rich('MAIL_TEMPLATE_NEW_REQUIREMENTS_SENT_CONTENT_5')}
    <MailTemplate.LineBreak />
    {t.rich('MAIL_TEMPLATE_NEW_REQUIREMENTS_SENT_CONTENT_6')}
    <MailTemplate.Greetings t={t} />
  </MailTemplate>
);

export default NewRequirementsSent;
