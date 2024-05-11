import Constants from '@/utils/constants';
import { IntlShape } from '@/utils/types';
import MailTemplate from './mail-template';

const WelcomeMailClient = ({ t }: { t: IntlShape }) => (
  <MailTemplate title={t.rich('MAIL_TEMPLATE_WELCOME_CLIENT_TITLE')}>
    <MailTemplate.CallToAction href={`${Constants.ORIGIN_URL}/submissions`}>
      {t('MAIL_TEMPLATE_WELCOME_CLIENT_CTA')}
    </MailTemplate.CallToAction>
    <MailTemplate.LineBreak />
    {t('MAIL_TEMPLATE_WELCOME_CLIENT_CONTENT_1')}
    <MailTemplate.LineBreak />
    {t.rich('MAIL_TEMPLATE_WELCOME_CLIENT_CONTENT_2')}
    <MailTemplate.LineBreak />
    {t('MAIL_TEMPLATE_WELCOME_CLIENT_CONTENT_3')}
    <MailTemplate.Greetings t={t} />
  </MailTemplate>
);

export default WelcomeMailClient;
