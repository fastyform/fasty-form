import { Fragment } from 'react';
import Constants from '@/utils/constants';
import { IntlShape } from '@/utils/types';
import MailTemplate from './mail-template';

interface OnboardingReminderProps {
  t: IntlShape;
}

const OnboardingReminder = ({ t }: OnboardingReminderProps) => (
  <MailTemplate title={t.rich('MAIL_TEMPLATE_ONBOARDING_REMINDER_TITLE')}>
    <MailTemplate.CallToAction href={`${Constants.ORIGIN_URL}/submissions`}>
      {t('MAIL_TEMPLATE_ONBOARDING_REMINDER_CTA')}
    </MailTemplate.CallToAction>
    <MailTemplate.Intro t={t} />
    {t.rich('MAIL_TEMPLATE_ONBOARDING_REMINDER_CONTENT_1')}
    <MailTemplate.LineBreak />
    <strong>{t.rich('MAIL_TEMPLATE_ONBOARDING_REMINDER_CONTENT_2')}</strong>
    {(['1', '2', '3'] as const).map((index) => (
      <Fragment key={index}>
        <br />
        {index}. {t.rich(`MAIL_TEMPLATE_ONBOARDING_REMINDER_CONTENT_3_${index}`)}
      </Fragment>
    ))}
    <MailTemplate.LineBreak />
    <strong>{t('MAIL_TEMPLATE_ONBOARDING_REMINDER_CONTENT_4')}</strong>
    {(['1', '2'] as const).map((index) => (
      <Fragment key={index}>
        <br />
        {index}. {t.rich(`MAIL_TEMPLATE_ONBOARDING_REMINDER_CONTENT_5_${index}`)}
      </Fragment>
    ))}
    <MailTemplate.LineBreak />
    {t.rich('MAIL_TEMPLATE_ONBOARDING_REMINDER_CONTENT_6')}
    <MailTemplate.LineBreak />
    {t('MAIL_TEMPLATE_ONBOARDING_REMINDER_CONTENT_7')}
    <MailTemplate.Greetings t={t} />
  </MailTemplate>
);

export default OnboardingReminder;
