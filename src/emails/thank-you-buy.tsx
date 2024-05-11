import { Fragment } from 'react';
import { Link } from '@react-email/components';
import Constants from '@/utils/constants';
import { IntlShape } from '@/utils/types';
import MailTemplate from './mail-template';

interface ThankYouBuyProps {
  submissionId: string;
  trainerProfileName: string;
  trainerProfileSlug: string;
  t: IntlShape;
}

const ThankYouBuy = ({ submissionId, trainerProfileName, trainerProfileSlug, t }: ThankYouBuyProps) => (
  <MailTemplate title={t('MAIL_TEMPLATE_THANK_YOU_BUY_TITLE')}>
    <MailTemplate.CallToAction href={`${Constants.ORIGIN_URL}/submissions/${submissionId}/requirements`}>
      {t('MAIL_TEMPLATE_THANK_YOU_BUY_CTA')}
    </MailTemplate.CallToAction>
    <MailTemplate.Intro t={t} />
    {t.rich('MAIL_TEMPLATE_THANK_YOU_BUY_CONTENT_1', {
      TrainerLink: () => (
        <Link href={`${Constants.ORIGIN_URL}/trainers/${trainerProfileSlug}`}>{trainerProfileName}</Link>
      ),
    })}
    <MailTemplate.LineBreak />
    {t('MAIL_TEMPLATE_THANK_YOU_BUY_CONTENT_2')}
    <MailTemplate.LineBreak />
    {t.rich('MAIL_TEMPLATE_THANK_YOU_BUY_CONTENT_3')}
    <MailTemplate.LineBreak />
    {t.rich('MAIL_TEMPLATE_THANK_YOU_BUY_CONTENT_4', {
      SubmissionLink: (chunks) => (
        <Link href={`${Constants.ORIGIN_URL}/submissions/${submissionId}/requirements`}>{chunks}</Link>
      ),
    })}
    {(['1', '2', '3', '4', '5'] as const).map((index) => (
      <Fragment key={index}>
        <br />
        {index}. {t(`MAIL_TEMPLATE_THANK_YOU_BUY_CONTENT_5_${index}`)}
      </Fragment>
    ))}
    <MailTemplate.LineBreak />
    {t.rich('MAIL_TEMPLATE_THANK_YOU_BUY_CONTENT_6')}
    <MailTemplate.LineBreak />
    {t.rich('MAIL_TEMPLATE_THANK_YOU_BUY_CONTENT_7')}
    <MailTemplate.Greetings t={t} />
  </MailTemplate>
);

export default ThankYouBuy;
