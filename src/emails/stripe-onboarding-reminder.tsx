import { Fragment } from 'react';
import Constants from '@/utils/constants';
import { IntlShape } from '@/utils/types';
import MailTemplate from './mail-template';

interface StripeOnboardingReminderProps {
  t: IntlShape;
}

const StripeOnboardingReminder = ({ t }: StripeOnboardingReminderProps) => (
  <MailTemplate title={t.rich('MAIL_TEMPLATE_STRIPE_ONBOARDING_REMINDER_TITLE')}>
    <MailTemplate.CallToAction href={`${Constants.ORIGIN_URL}/payments`}>Aktywuj płatności</MailTemplate.CallToAction>
    <MailTemplate.Intro t={t} />
    {t.rich('MAIL_TEMPLATE_STRIPE_ONBOARDING_REMINDER_CONTENT_1')}
    <MailTemplate.LineBreak />
    <strong>{t('MAIL_TEMPLATE_STRIPE_ONBOARDING_REMINDER_CONTENT_2')}</strong>
    <br />
    {(['1', '2', '3'] as const).map((index) => (
      <Fragment key={index}>
        <br />
        {index}. {t.rich(`MAIL_TEMPLATE_STRIPE_ONBOARDING_REMINDER_CONTENT_3_${index}`)}
      </Fragment>
    ))}
    <MailTemplate.LineBreak />
    <strong>{t('MAIL_TEMPLATE_STRIPE_ONBOARDING_REMINDER_CONTENT_4')}</strong>
    <MailTemplate.LineBreak />
    {t.rich('MAIL_TEMPLATE_STRIPE_ONBOARDING_REMINDER_CONTENT_5')}
    <MailTemplate.LineBreak />
    {t('MAIL_TEMPLATE_STRIPE_ONBOARDING_REMINDER_CONTENT_6')}
    <MailTemplate.Greetings t={t} />
  </MailTemplate>
);

export default StripeOnboardingReminder;
